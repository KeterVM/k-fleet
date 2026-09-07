import { Database, type SQLQueryBindings } from 'bun:sqlite';

export function openDatabase(path: string) {
  const db = new Database(path, { create: true, strict: true });
  db.exec(`PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, displayName TEXT NOT NULL, passwordHash TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (
      tokenHash TEXT PRIMARY KEY, userId TEXT NOT NULL REFERENCES users(id), expiresAt INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, ownerId TEXT NOT NULL REFERENCES users(id),
      createdAt INTEGER NOT NULL, deletedAt INTEGER
    );
    CREATE TABLE IF NOT EXISTS members (
      projectId TEXT NOT NULL REFERENCES projects(id), userId TEXT NOT NULL REFERENCES users(id),
      PRIMARY KEY(projectId,userId)
    );
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY, projectId TEXT NOT NULL REFERENCES projects(id), title TEXT NOT NULL, description TEXT NOT NULL,
      creatorId TEXT NOT NULL REFERENCES users(id), assigneeId TEXT REFERENCES users(id),
      status TEXT NOT NULL CHECK(status IN ('todo','doing','done')), version INTEGER NOT NULL,
      createdAt INTEGER NOT NULL, deletedAt INTEGER
    );
    CREATE TABLE IF NOT EXISTS activity (
      id TEXT PRIMARY KEY, projectId TEXT NOT NULL REFERENCES projects(id), actorId TEXT NOT NULL REFERENCES users(id),
      action TEXT NOT NULL, targetType TEXT NOT NULL, targetId TEXT NOT NULL, timestamp INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY, projectId TEXT NOT NULL REFERENCES projects(id), taskId TEXT NOT NULL REFERENCES tasks(id),
      userId TEXT NOT NULL REFERENCES users(id), actorId TEXT NOT NULL REFERENCES users(id),
      action TEXT NOT NULL, timestamp INTEGER NOT NULL, readAt INTEGER
    );
    CREATE INDEX IF NOT EXISTS tasks_project ON tasks(projectId,createdAt,id);
    CREATE INDEX IF NOT EXISTS activity_project ON activity(projectId,timestamp,id);
    CREATE INDEX IF NOT EXISTS notifications_user ON notifications(userId,timestamp,id);
  `);
  return {
    db,
    get<T>(sql: string, ...args: SQLQueryBindings[]) { return db.query(sql).get(...args) as T | null; },
    all<T>(sql: string, ...args: SQLQueryBindings[]) { return db.query(sql).all(...args) as T[]; },
    run(sql: string, ...args: SQLQueryBindings[]) { return db.query(sql).run(...args); },
  };
}
