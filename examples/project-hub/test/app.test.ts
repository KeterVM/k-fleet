import { afterEach, describe, expect, test } from 'bun:test';
import { Database } from 'bun:sqlite';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createApp, type RequestRecord } from '../src/app';

const cleanups: (() => void)[] = [];
afterEach(() => { for (const cleanup of cleanups.splice(0).reverse()) cleanup(); });
function fixture(persist = false) {
  const dir = mkdtempSync(join(tmpdir(), 'project-hub-'));
  const dbPath = persist ? join(dir, 'test.sqlite') : ':memory:';
  let time = 1700000000000;
  const logs: RequestRecord[] = [];
  const instance = createApp({ dbPath, now: () => time, logger: record => logs.push(record) });
  cleanups.push(() => rmSync(dir, { recursive: true, force: true }), instance.close);
  const request = async (method: string, path: string, token?: string, value?: unknown, extra: Record<string, string> = {}) => {
    const response = await instance.app.request(path, { method, headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(value !== undefined ? { 'Content-Type': 'application/json' } : {}), ...extra }, ...(value !== undefined ? { body: JSON.stringify(value) } : {}) });
    return { status: response.status, json: await response.json() as any, response };
  };
  let serial = 0;
  const register = async () => {
    const result = await request('POST', '/auth/register', undefined, { email: `user${++serial}@example.com`, displayName: `User ${serial}`, password: 'correct-password' });
    expect(result.status).toBe(201); return result.json.data as { user: { id: string; email: string }; token: string };
  };
  return { ...instance, dbPath, logs, request, register, advance: (ms: number) => time += ms };
}
async function team(f: ReturnType<typeof fixture>) {
  const owner = await f.register(); const member = await f.register(); const outsider = await f.register();
  const p = (await f.request('POST', '/projects', owner.token, { name: ' Team ' })).json.data;
  expect((await f.request('POST', `/projects/${p.id}/members`, owner.token, { userId: member.user.id })).status).toBe(201);
  return { owner, member, outsider, p, base: `/projects/${p.id}` };
}

describe('authentication and request boundary', () => {
  test('normalizes identity, hashes credentials, persists sessions, revokes only one session and expires', async () => {
    const f = fixture(true); const account = await f.register();
    expect((await f.request('POST', '/auth/register', undefined, { email: ' USER1@EXAMPLE.COM ', displayName: 'Dup', password: 'correct-password' })).status).toBe(409);
    const login = await f.request('POST', '/auth/login', undefined, { email: ' USER1@EXAMPLE.COM ', password: 'correct-password' });
    expect(login.status).toBe(200); expect(Object.keys(login.json.data.user).sort()).toEqual(['displayName', 'email', 'id']);
    const raw = new Database(f.dbPath);
    const stored = raw.query('SELECT * FROM users').get() as any;
    expect(stored.passwordHash.startsWith('$argon2id$')).toBe(true);
    expect(JSON.stringify(raw.query('SELECT * FROM sessions').all())).not.toContain(account.token); raw.close();
    expect((await f.request('POST', '/auth/logout', account.token)).status).toBe(200);
    expect((await f.request('GET', '/auth/me', account.token)).status).toBe(401);
    expect((await f.request('GET', '/auth/me', login.json.data.token)).status).toBe(200);
    f.advance(86400000);
    expect((await f.request('GET', '/auth/me', login.json.data.token)).status).toBe(401);
  });
  test('bounds attempts per normalized account and resets after fifteen minutes', async () => {
    const f = fixture(); await f.register();
    for (let i = 0; i < 5; i++) expect((await f.request('POST', '/auth/login', undefined, { email: ' USER1@EXAMPLE.COM ', password: 'wrong-password' })).status).toBe(401);
    expect((await f.request('POST', '/auth/login', undefined, { email: 'user1@example.com', password: 'correct-password' })).status).toBe(429);
    f.advance(900000);
    expect((await f.request('POST', '/auth/login', undefined, { email: 'user1@example.com', password: 'correct-password' })).status).toBe(200);
  });
  test('validates JSON, bounds, identifiers and unknown fields with safe errors and request logs', async () => {
    const f = fixture(); const { token } = await f.register();
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'X-Request-Id': 'safe_ID-1' };
    for (const [payload, expected] of [['{', 400], [JSON.stringify({ name: 'x'.repeat(66000) }), 413]] as const) {
      const response = await f.app.request('/projects', { method: 'POST', headers, body: payload });
      expect(response.status).toBe(expected); expect(response.headers.get('X-Request-Id')).toBe('safe_ID-1');
      expect((await response.json() as any).error.requestId).toBe('safe_ID-1');
      expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
    }
    expect((await f.request('POST', '/projects', token, { name: ' ', ownerId: 'forged' })).status).toBe(400);
    expect((await f.request('POST', '/projects', token, { name: 'x'.repeat(121) })).status).toBe(400);
    expect((await f.request('GET', '/projects/not-an-id', token)).status).toBe(400);
    expect((await f.request('GET', '/missing?password=secret', token)).status).toBe(404);
    const response = await f.request('GET', '/health', undefined, undefined, { 'X-Request-Id': 'bad value' });
    expect(response.response.headers.get('X-Request-Id')).not.toBe('bad value');
    expect(JSON.stringify(f.logs)).not.toContain('secret'); expect(JSON.stringify(f.logs)).not.toContain(token);
  });
});

describe('projects, tasks and event consistency', () => {
  test('enforces membership, ownership and project-task binding', async () => {
    const f = fixture(); const { owner, member, outsider, base } = await team(f);
    const t = (await f.request('POST', `${base}/tasks`, owner.token, { title: 'work' })).json.data;
    expect((await f.request('GET', base, outsider.token)).status).toBe(404);
    expect((await f.request('PATCH', base, member.token, { name: 'unauthorized' })).status).toBe(403);
    expect((await f.request('POST', `${base}/members`, member.token, { userId: outsider.user.id })).status).toBe(403);
    expect((await f.request('DELETE', `${base}/tasks/${t.id}`, member.token)).status).toBe(403);
    expect((await f.request('POST', `${base}/tasks`, member.token, { title: 'invalid', assigneeId: outsider.user.id })).status).toBe(400);
    const other = (await f.request('POST', '/projects', member.token, { name: 'other' })).json.data;
    expect((await f.request('PATCH', `/projects/${other.id}/tasks/${t.id}`, member.token, { expectedVersion: 1, title: 'cross-project' })).status).toBe(404);
    expect((await f.request('GET', '/projects', outsider.token)).json.page.total).toBe(0);
    expect((await f.request('DELETE', `${base}/members/${owner.user.id}`, owner.token)).status).toBe(409);
  });
  test('transitions, stale replay, no-op patches and deduplicated notifications', async () => {
    const f = fixture(); const { owner, member, outsider, base } = await team(f);
    await f.request('POST', `${base}/members`, owner.token, { userId: outsider.user.id });
    const t = (await f.request('POST', `${base}/tasks`, owner.token, { title: 'task', assigneeId: member.user.id })).json.data;
    const path = `${base}/tasks/${t.id}`;
    expect(t.version).toBe(1); expect(t.status).toBe('todo');
    expect((await f.request('GET', '/notifications', member.token)).json.page.total).toBe(1);
    const before = (await f.request('GET', `${base}/activity`, owner.token)).json.page.total;
    expect((await f.request('PATCH', path, member.token, { expectedVersion: 1, status: 'done' })).status).toBe(409);
    expect((await f.request('PATCH', path, member.token, { expectedVersion: 1, title: ' task ' })).json.data.version).toBe(1);
    expect((await f.request('GET', `${base}/activity`, owner.token)).json.page.total).toBe(before);
    const update = { expectedVersion: 1, status: 'doing', assigneeId: owner.user.id };
    expect((await f.request('PATCH', path, outsider.token, update)).json.data.version).toBe(2);
    expect((await f.request('GET', '/notifications', owner.token)).json.page.total).toBe(1);
    expect((await f.request('PATCH', path, outsider.token, update)).status).toBe(409);
    expect((await f.request('GET', '/notifications', owner.token)).json.page.total).toBe(1);
    expect((await f.request('GET', `${base}/activity`, owner.token)).json.page.total).toBe(before + 1);
    expect((await f.request('PATCH', path, member.token, { expectedVersion: 2, status: 'done' })).json.data.version).toBe(3);
    expect((await f.request('PATCH', path, member.token, { expectedVersion: 3, status: 'todo' })).status).toBe(409);
    expect((await f.request('PATCH', path, member.token, { expectedVersion: 3, status: 'doing' })).json.data.version).toBe(4);
    expect((await f.request('PATCH', path, member.token, { expectedVersion: 4, status: 'todo' })).json.data.version).toBe(5);
  });
  test('membership removal unassigns all active tasks once and removes notification visibility', async () => {
    const f = fixture(); const { owner, member, base } = await team(f);
    const tasks = [];
    for (let i = 0; i < 2; i++) tasks.push((await f.request('POST', `${base}/tasks`, owner.token, { title: `task ${i}`, assigneeId: member.user.id })).json.data);
    const notification = (await f.request('GET', '/notifications', member.token)).json.data[0];
    expect((await f.request('PATCH', `/notifications/${notification.id}/read`, owner.token)).status).toBe(404);
    expect((await f.request('PATCH', `/notifications/${notification.id}/read`, member.token)).status).toBe(200);
    expect((await f.request('PATCH', `/notifications/${notification.id}/read`, member.token)).status).toBe(200);
    expect((await f.request('GET', '/notifications?unread=true', member.token)).json.page.total).toBe(1);
    const before = (await f.request('GET', `${base}/activity`, owner.token)).json.page.total;
    expect((await f.request('DELETE', `${base}/members/${member.user.id}`, owner.token)).status).toBe(200);
    for (const t of tasks) {
      const current = (await f.request('GET', `${base}/tasks/${t.id}`, owner.token)).json.data;
      expect(current.assigneeId).toBeNull(); expect(current.version).toBe(2);
    }
    expect((await f.request('GET', `${base}/activity`, owner.token)).json.page.total).toBe(before + 1);
    expect((await f.request('GET', '/notifications', member.token)).json.page.total).toBe(0);
    expect((await f.request('PATCH', `/notifications/${notification.id}/read`, member.token)).status).toBe(404);
    expect((await f.request('GET', `${base}/activity`, member.token)).status).toBe(404);
  });
  test('soft deletion hides project, tasks, history and notifications', async () => {
    const f = fixture(); const { owner, member, base } = await team(f);
    const t = (await f.request('POST', `${base}/tasks`, member.token, { title: 'own task', assigneeId: owner.user.id })).json.data;
    expect((await f.request('DELETE', `${base}/tasks/${t.id}`, member.token)).status).toBe(200);
    expect((await f.request('GET', `${base}/tasks/${t.id}`, owner.token)).status).toBe(404);
    const notification = (await f.request('GET', '/notifications', owner.token)).json.data[0];
    expect((await f.request('DELETE', base, owner.token)).status).toBe(200);
    for (const path of [base, `${base}/tasks`, `${base}/activity`, `${base}/members`]) expect((await f.request('GET', path, owner.token)).status).toBe(404);
    expect((await f.request('GET', '/projects', owner.token)).json.page.total).toBe(0);
    expect((await f.request('GET', '/notifications', owner.token)).json.page.total).toBe(0);
    expect((await f.request('PATCH', `/notifications/${notification.id}/read`, owner.token)).status).toBe(404);
  });
  test('collections paginate and filter deterministically, rejecting malformed pages', async () => {
    const f = fixture(); const { owner, member, base } = await team(f);
    for (let i = 0; i < 3; i++) await f.request('POST', `${base}/tasks`, owner.token, { title: `Task ${i}`, assigneeId: i ? member.user.id : null });
    const first = (await f.request('GET', `${base}/tasks?limit=1&offset=0`, owner.token)).json;
    const second = (await f.request('GET', `${base}/tasks?limit=1&offset=1`, owner.token)).json;
    expect(first.page).toEqual({ limit: 1, offset: 0, total: 3 }); expect(first.data[0].id).not.toBe(second.data[0].id);
    expect((await f.request('GET', `${base}/tasks?limit=1&offset=0`, owner.token)).json).toEqual(first);
    expect((await f.request('GET', `${base}/tasks?status=todo&assigneeId=${member.user.id}`, owner.token)).json.page.total).toBe(2);
    expect((await f.request('GET', `${base}/tasks?assigneeId=null`, owner.token)).json.page.total).toBe(1);
    for (const query of ['limit=0', 'limit=101', 'offset=-1', 'offset=1.1', 'limit=1&limit=2', 'status=bad', 'assigneeId=invalid']) expect((await f.request('GET', `${base}/tasks?${query}`, owner.token)).status).toBe(400);
  });
  test('database failures roll back mutations, activity and notifications together', async () => {
    const f = fixture(true); const { owner, member, base } = await team(f);
    const raw = new Database(f.dbPath);
    const t = (await f.request('POST', `${base}/tasks`, owner.token, { title: 'before' })).json.data;
    const before = (await f.request('GET', `${base}/activity`, owner.token)).json.page.total;
    raw.exec("CREATE TRIGGER fail_notification BEFORE INSERT ON notifications BEGIN SELECT RAISE(ABORT, 'sensitive SQL detail'); END");
    const failed = await f.request('PATCH', `${base}/tasks/${t.id}`, owner.token, { expectedVersion: 1, title: 'after', assigneeId: member.user.id });
    expect(failed.status).toBe(500); expect(JSON.stringify(failed.json)).not.toContain('sensitive SQL');
    const current = (await f.request('GET', `${base}/tasks/${t.id}`, owner.token)).json.data;
    expect(current.title).toBe('before'); expect(current.assigneeId).toBeNull(); expect(current.version).toBe(1);
    expect((await f.request('GET', `${base}/activity`, owner.token)).json.page.total).toBe(before);
    expect((await f.request('GET', '/notifications', member.token)).json.page.total).toBe(0);
    raw.exec('DROP TRIGGER fail_notification');
    raw.exec("CREATE TRIGGER fail_activity BEFORE INSERT ON activity BEGIN SELECT RAISE(ABORT, 'broken'); END");
    expect((await f.request('DELETE', `${base}/members/${member.user.id}`, owner.token)).status).toBe(500);
    expect((await f.request('GET', base, member.token)).status).toBe(200);
    raw.close();
  });
  test('durable data and bearer sessions survive close/reopen', async () => {
    const f = fixture(true); const { owner, member, base } = await team(f);
    await f.request('POST', `${base}/tasks`, owner.token, { title: 'Persisted', assigneeId: member.user.id });
    f.close();
    const reopened = createApp({ dbPath: f.dbPath, now: () => 1700000000000 }); cleanups.push(reopened.close);
    const res = await reopened.app.request(`${base}/tasks`, { headers: { Authorization: `Bearer ${owner.token}` } });
    expect(res.status).toBe(200); expect((await res.json() as any).data[0].title).toBe('Persisted');
    const notifications = await reopened.app.request('/notifications', { headers: { Authorization: `Bearer ${member.token}` } });
    expect((await notifications.json() as any).page.total).toBe(1);
  });
});
