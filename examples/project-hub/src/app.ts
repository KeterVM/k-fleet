import { Hono, type Context } from 'hono';
import { secureHeaders } from 'hono/secure-headers';
import { createHash, randomBytes } from 'node:crypto';
import { openDatabase } from './db';
import { ApiError, body, email, fail, identifier, page, status, string } from './http';

type User = { id: string; email: string; displayName: string };
type Project = { id: string; name: string; description: string; ownerId: string; createdAt: number; deletedAt: number | null };
type Task = { id: string; projectId: string; title: string; description: string; creatorId: string; assigneeId: string | null; status: 'todo' | 'doing' | 'done'; version: number; createdAt: number; deletedAt: number | null };
type Env = { Variables: { user: User; tokenHash: string; requestId: string } };
export type RequestRecord = { requestId: string; method: string; route: string; status: number; durationMs: number };
export type AppOptions = { dbPath: string; now?: () => number; logger?: (record: RequestRecord) => void };
const hash = (value: string) => createHash('sha256').update(value).digest('hex');
const id = () => crypto.randomUUID();

export function createApp({ dbPath, now = Date.now, logger = () => {} }: AppOptions) {
  const { db, get, all, run } = openDatabase(dbPath);
  const app = new Hono<Env>();
  const accounts = new Map<string, { count: number; reset: number }>();
  let globalAttempts = { count: 0, reset: 0 };
  const windowMs = 15 * 60 * 1000;
  function attempt(account: string) {
    const time = now();
    if (time >= globalAttempts.reset) globalAttempts = { count: 0, reset: time + windowMs };
    for (const [key, value] of accounts) if (time >= value.reset) accounts.delete(key);
    if (globalAttempts.count >= 100) fail(429, 'RATE_LIMITED', 'Login attempt limit reached; retry later');
    globalAttempts.count++;
    const key = hash(account);
    const entry = accounts.get(key) ?? { count: 0, reset: time + windowMs };
    if (entry.count >= 5) fail(429, 'RATE_LIMITED', 'Login attempt limit reached; retry later');
    entry.count++; accounts.set(key, entry);
  }
  function session(userId: string) {
    const token = randomBytes(32).toString('base64url');
    run('INSERT INTO sessions VALUES (?,?,?)', hash(token), userId, now() + 86400000);
    return token;
  }
  function user(userId: string) { return get<User>('SELECT id,email,displayName FROM users WHERE id=?', userId)!; }
  function project(c: Context<Env>) {
    const projectId = identifier(c.req.param('projectId'));
    const result = get<Project>(`SELECT p.* FROM projects p JOIN members m ON m.projectId=p.id
      WHERE p.id=? AND m.userId=? AND p.deletedAt IS NULL`, projectId, c.get('user').id);
    if (!result) fail(404, 'NOT_FOUND', 'Project not found');
    return result;
  }
  function owner(c: Context<Env>, p: Project) {
    if (p.ownerId !== c.get('user').id) fail(403, 'FORBIDDEN', 'Project owner permission required');
  }
  function task(c: Context<Env>, p: Project) {
    const result = get<Task>('SELECT * FROM tasks WHERE id=? AND projectId=? AND deletedAt IS NULL', identifier(c.req.param('taskId')), p.id);
    if (!result) fail(404, 'NOT_FOUND', 'Task not found');
    return result;
  }
  function assignee(value: unknown, projectId: string) {
    if (value === null) return null;
    const userId = identifier(value);
    if (!get('SELECT 1 FROM members WHERE projectId=? AND userId=?', projectId, userId)) fail(400, 'INVALID_ASSIGNEE', 'Assignee must be a current project member');
    return userId;
  }
  function activity(p: string, actor: string, action: string, targetType: string, targetId: string) {
    run('INSERT INTO activity VALUES (?,?,?,?,?,?,?)', id(), p, actor, action, targetType, targetId, now());
  }
  function notify(t: Task, actor: string, assigned: boolean, changedStatus: boolean) {
    const recipients = new Set<string>();
    if ((assigned || changedStatus) && t.assigneeId) recipients.add(t.assigneeId);
    if (changedStatus) recipients.add(t.creatorId);
    recipients.delete(actor);
    for (const recipient of recipients) {
      if (get('SELECT 1 FROM members WHERE projectId=? AND userId=?', t.projectId, recipient)) {
        run('INSERT INTO notifications VALUES (?,?,?,?,?,?,?,NULL)', id(), t.projectId, t.id, recipient, actor,
          changedStatus ? 'task.status_changed' : 'task.assigned', now());
      }
    }
  }
  function collection(c: Context<Env>, sql: string, args: (string | number)[] = []) {
    const pagination = page(c);
    const total = get<{ total: number }>(`SELECT COUNT(*) AS total FROM (${sql})`, ...args)!.total;
    return c.json({ data: all(`${sql} LIMIT ? OFFSET ?`, ...args, pagination.limit, pagination.offset), page: { ...pagination, total } });
  }

  app.use('*', async (c, next) => {
    const incoming = c.req.header('X-Request-Id');
    const requestId = incoming && /^[A-Za-z0-9_-]{1,64}$/.test(incoming) ? incoming : id();
    c.set('requestId', requestId); c.header('X-Request-Id', requestId);
    const start = performance.now();
    await next();
    c.header('X-Request-Id', requestId);
    try { logger({ requestId, method: c.req.method, route: c.req.routePath || 'unmatched', status: c.res.status, durationMs: Math.max(0, performance.now() - start) }); } catch { /* Logging must not change request outcomes. */ }
  });
  app.use('*', secureHeaders());
  app.use('*', async (c, next) => { c.header('Cache-Control', 'no-store'); await next(); });
  app.onError((error, c) => {
    const known = error instanceof ApiError;
    return c.json({ error: { code: known ? error.code : 'INTERNAL_ERROR', message: known ? error.message : 'Internal server error', requestId: c.get('requestId') } }, known ? error.status : 500);
  });
  app.notFound(c => c.json({ error: { code: 'NOT_FOUND', message: 'Route not found', requestId: c.get('requestId') } }, 404));
  app.get('/health', c => c.json({ data: { status: 'ok' } }));
  app.post('/auth/register', async c => {
    const input = await body(c, ['email', 'displayName', 'password']);
    const address = email(input.email);
    const displayName = string(input.displayName, 'displayName', 80, 1);
    const password = string(input.password, 'password', 128, 12, false);
    const passwordHash = await Bun.password.hash(password, { algorithm: 'argon2id', memoryCost: 19456, timeCost: 2 });
    const result = db.transaction(() => {
      if (get('SELECT 1 FROM users WHERE email=?', address)) fail(409, 'ACCOUNT_EXISTS', 'Account already exists');
      const userId = id(); run('INSERT INTO users VALUES (?,?,?,?)', userId, address, displayName, passwordHash);
      return { user: user(userId), token: session(userId) };
    }).immediate();
    return c.json({ data: result }, 201);
  });
  app.post('/auth/login', async c => {
    const input = await body(c, ['email', 'password']);
    const address = email(input.email); const password = string(input.password, 'password', 128, 12, false);
    attempt(address);
    const account = get<User & { passwordHash: string }>('SELECT * FROM users WHERE email=?', address);
    if (!account || !(await Bun.password.verify(password, account.passwordHash))) fail(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    return c.json({ data: { user: user(account.id), token: session(account.id) } });
  });
  app.use('*', async (c, next) => {
    const authorization = c.req.header('Authorization') ?? '';
    const match = /^Bearer ([A-Za-z0-9_-]{43})$/i.exec(authorization);
    if (!match) fail(401, 'UNAUTHORIZED', 'Valid bearer token required');
    const tokenHash = hash(match[1]);
    const identity = get<User>(`SELECT u.id,u.email,u.displayName FROM sessions s JOIN users u ON u.id=s.userId
      WHERE s.tokenHash=? AND s.expiresAt>?`, tokenHash, now());
    if (!identity) fail(401, 'UNAUTHORIZED', 'Valid bearer token required');
    c.set('user', identity); c.set('tokenHash', tokenHash); await next();
  });
  app.get('/auth/me', c => c.json({ data: c.get('user') }));
  app.post('/auth/logout', async c => { if (c.req.raw.body !== null) await body(c, []); run('DELETE FROM sessions WHERE tokenHash=?', c.get('tokenHash')); return c.json({ data: { revoked: true } }); });

  app.post('/projects', async c => {
    const input = await body(c, ['name', 'description']);
    const name = string(input.name, 'name', 120, 1);
    const description = input.description === undefined ? '' : string(input.description, 'description', 4000, 0, false);
    const projectId = id(); const actor = c.get('user').id;
    const result = db.transaction(() => {
      run('INSERT INTO projects VALUES (?,?,?,?,?,NULL)', projectId, name, description, actor, now());
      run('INSERT INTO members VALUES (?,?)', projectId, actor);
      activity(projectId, actor, 'project.created', 'project', projectId);
      return get<Project>('SELECT * FROM projects WHERE id=?', projectId);
    }).immediate();
    return c.json({ data: result }, 201);
  });
  app.get('/projects', c => collection(c, `SELECT p.* FROM projects p JOIN members m ON m.projectId=p.id
    WHERE m.userId=? AND p.deletedAt IS NULL ORDER BY p.createdAt,p.id`, [c.get('user').id]));
  app.get('/projects/:projectId', c => c.json({ data: project(c) }));
  app.patch('/projects/:projectId', async c => {
    const input = await body(c, ['name', 'description']);
    if (input.name !== undefined) string(input.name, 'name', 120, 1);
    if (input.description !== undefined) string(input.description, 'description', 4000, 0, false);
    const result = db.transaction(() => {
      const p = project(c); owner(c, p);
      const name = input.name === undefined ? p.name : (input.name as string).trim();
      const description = input.description === undefined ? p.description : input.description as string;
      if (name !== p.name || description !== p.description) {
        run('UPDATE projects SET name=?,description=? WHERE id=?', name, description, p.id);
        activity(p.id, c.get('user').id, 'project.updated', 'project', p.id);
      }
      return { ...p, name, description };
    }).immediate();
    return c.json({ data: result });
  });
  app.delete('/projects/:projectId', async c => {
    if (c.req.raw.body !== null) await body(c, []);
    db.transaction(() => {
      const p = project(c); owner(c, p);
      run('UPDATE projects SET deletedAt=? WHERE id=?', now(), p.id);
      activity(p.id, c.get('user').id, 'project.deleted', 'project', p.id);
    }).immediate();
    return c.json({ data: { deleted: true } });
  });
  app.get('/projects/:projectId/members', c => {
    const p = project(c);
    return collection(c, `SELECT u.id,u.email,u.displayName,CASE WHEN u.id=? THEN 'owner' ELSE 'member' END AS role
      FROM members m JOIN users u ON u.id=m.userId WHERE m.projectId=? ORDER BY u.id`, [p.ownerId, p.id]);
  });
  app.post('/projects/:projectId/members', async c => {
    const input = await body(c, ['userId']); const userId = identifier(input.userId);
    const result = db.transaction(() => {
      const p = project(c); owner(c, p);
      if (!get('SELECT 1 FROM users WHERE id=?', userId)) fail(404, 'NOT_FOUND', 'User not found');
      if (get('SELECT 1 FROM members WHERE projectId=? AND userId=?', p.id, userId)) fail(409, 'ALREADY_MEMBER', 'User is already a member');
      run('INSERT INTO members VALUES (?,?)', p.id, userId);
      activity(p.id, c.get('user').id, 'member.added', 'user', userId);
      return { ...user(userId), role: 'member' };
    }).immediate();
    return c.json({ data: result }, 201);
  });
  app.delete('/projects/:projectId/members/:userId', async c => {
    if (c.req.raw.body !== null) await body(c, []);
    db.transaction(() => {
      const p = project(c); owner(c, p); const userId = identifier(c.req.param('userId'));
      if (userId === p.ownerId) fail(409, 'OWNER_REQUIRED', 'Cannot remove the owner');
      if (!get('SELECT 1 FROM members WHERE projectId=? AND userId=?', p.id, userId)) fail(404, 'NOT_FOUND', 'Member not found');
      run('UPDATE tasks SET assigneeId=NULL,version=version+1 WHERE projectId=? AND assigneeId=? AND deletedAt IS NULL', p.id, userId);
      run('DELETE FROM members WHERE projectId=? AND userId=?', p.id, userId);
      activity(p.id, c.get('user').id, 'member.removed', 'user', userId);
    }).immediate();
    return c.json({ data: { removed: true } });
  });

  app.post('/projects/:projectId/tasks', async c => {
    const input = await body(c, ['title', 'description', 'assigneeId']);
    const title = string(input.title, 'title', 200, 1);
    const description = input.description === undefined ? '' : string(input.description, 'description', 4000, 0, false);
    const result = db.transaction(() => {
      const p = project(c); const actor = c.get('user').id;
      const assigneeId = input.assigneeId === undefined ? null : assignee(input.assigneeId, p.id);
      const taskId = id();
      run("INSERT INTO tasks VALUES (?,?,?,?,?,?,'todo',1,?,NULL)", taskId, p.id, title, description, actor, assigneeId, now());
      const t = get<Task>('SELECT * FROM tasks WHERE id=?', taskId)!;
      activity(p.id, actor, 'task.created', 'task', taskId); notify(t, actor, assigneeId !== null, false);
      return t;
    }).immediate();
    return c.json({ data: result }, 201);
  });
  app.get('/projects/:projectId/tasks', c => {
    const p = project(c); const clauses = ['projectId=?', 'deletedAt IS NULL']; const args: string[] = [p.id];
    for (const key of ['status', 'assigneeId']) if ((c.req.queries(key)?.length ?? 0) > 1) fail(400, 'INVALID_INPUT', 'Duplicate filter');
    if (c.req.query('status') !== undefined) { clauses.push('status=?'); args.push(status(c.req.query('status'))); }
    const filter = c.req.query('assigneeId');
    if (filter !== undefined) {
      if (filter === 'null') clauses.push('assigneeId IS NULL');
      else { clauses.push('assigneeId=?'); args.push(identifier(filter)); }
    }
    return collection(c, `SELECT * FROM tasks WHERE ${clauses.join(' AND ')} ORDER BY createdAt,id`, args);
  });
  app.get('/projects/:projectId/tasks/:taskId', c => c.json({ data: task(c, project(c)) }));
  app.patch('/projects/:projectId/tasks/:taskId', async c => {
    const input = await body(c, ['title', 'description', 'assigneeId', 'status', 'expectedVersion']);
    if (!Number.isSafeInteger(input.expectedVersion) || (input.expectedVersion as number) < 1) fail(400, 'INVALID_INPUT', 'expectedVersion must be a positive integer');
    if (input.title !== undefined) string(input.title, 'title', 200, 1);
    if (input.description !== undefined) string(input.description, 'description', 4000, 0, false);
    if (input.status !== undefined) status(input.status);
    const result = db.transaction(() => {
      const p = project(c); const t = task(c, p); const actor = c.get('user').id;
      if (t.version !== input.expectedVersion) fail(409, 'VERSION_CONFLICT', 'Task version is stale');
      const next = { ...t,
        title: input.title === undefined ? t.title : (input.title as string).trim(),
        description: input.description === undefined ? t.description : input.description as string,
        assigneeId: input.assigneeId === undefined ? t.assigneeId : assignee(input.assigneeId, p.id),
        status: input.status === undefined ? t.status : status(input.status),
      };
      const changedStatus = next.status !== t.status;
      if (changedStatus && !({ todo: ['doing'], doing: ['todo', 'done'], done: ['doing'] }[t.status] as string[]).includes(next.status)) fail(409, 'INVALID_TRANSITION', 'Invalid task status transition');
      if (next.title === t.title && next.description === t.description && next.assigneeId === t.assigneeId && !changedStatus) return t;
      next.version++;
      run('UPDATE tasks SET title=?,description=?,assigneeId=?,status=?,version=? WHERE id=?', next.title, next.description, next.assigneeId, next.status, next.version, t.id);
      activity(p.id, actor, 'task.updated', 'task', t.id); notify(next, actor, next.assigneeId !== t.assigneeId, changedStatus);
      return next;
    }).immediate();
    return c.json({ data: result });
  });
  app.delete('/projects/:projectId/tasks/:taskId', async c => {
    if (c.req.raw.body !== null) await body(c, []);
    db.transaction(() => {
      const p = project(c); const t = task(c, p); const actor = c.get('user').id;
      if (actor !== t.creatorId && actor !== p.ownerId) fail(403, 'FORBIDDEN', 'Task creator or project owner permission required');
      run('UPDATE tasks SET deletedAt=? WHERE id=?', now(), t.id);
      activity(p.id, actor, 'task.deleted', 'task', t.id);
    }).immediate();
    return c.json({ data: { deleted: true } });
  });
  app.get('/projects/:projectId/activity', c => {
    const p = project(c);
    return collection(c, 'SELECT * FROM activity WHERE projectId=? ORDER BY timestamp,id', [p.id]);
  });
  const visibleNotifications = `FROM notifications n JOIN projects p ON p.id=n.projectId
    JOIN members m ON m.projectId=p.id AND m.userId=n.userId
    WHERE n.userId=? AND p.deletedAt IS NULL`;
  app.get('/notifications', c => {
    const unread = c.req.query('unread');
    if (unread !== undefined && (unread !== 'true' || c.req.queries('unread')!.length !== 1)) fail(400, 'INVALID_INPUT', 'unread must be true');
    return collection(c, `SELECT n.* ${visibleNotifications}${unread ? ' AND n.readAt IS NULL' : ''} ORDER BY n.timestamp,n.id`, [c.get('user').id]);
  });
  app.patch('/notifications/:notificationId/read', async c => {
    // Empty requests are allowed; supplied JSON still receives strict validation.
    if (c.req.raw.body !== null) await body(c, []);
    const result = db.transaction(() => {
      const notificationId = identifier(c.req.param('notificationId'));
      const notification = get<{ id: string; readAt: number | null }>(`SELECT n.* ${visibleNotifications} AND n.id=?`, c.get('user').id, notificationId);
      if (!notification) fail(404, 'NOT_FOUND', 'Notification not found');
      if (notification.readAt === null) run('UPDATE notifications SET readAt=? WHERE id=?', now(), notificationId);
      return get('SELECT * FROM notifications WHERE id=?', notificationId);
    }).immediate();
    return c.json({ data: result });
  });
  let closed = false;
  return { app, close() { if (!closed) { db.close(); accounts.clear(); closed = true; } } };
}
