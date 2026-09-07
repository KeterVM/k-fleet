# Project Hub API

A local project-management API built with Hono, TypeScript, Bun and SQLite. No
external services are needed. Tested with Bun 1.4.0.

```sh
bun install
bun run start
# In another terminal:
curl http://127.0.0.1:3000/health
bun test
bun run typecheck
```

`HOST` defaults to `127.0.0.1`, `PORT` to `3000`, and `DB_PATH` to
`project-hub.sqlite`. The database's parent directory must already exist.
For example: `HOST=127.0.0.1 PORT=3100 DB_PATH=/tmp/hub.sqlite bun run start`.
SIGINT and SIGTERM stop accepting requests, finish in-flight requests, and close
SQLite. Importing `src/app.ts` never starts a server.

## Example workflow

Register two users; retain their returned `data.token` and `data.user.id` values.

```sh
curl -s http://127.0.0.1:3000/auth/register -H 'Content-Type: application/json' \
  -d '{"email":"owner@example.com","displayName":"Owner","password":"a-long-password"}'
curl -s http://127.0.0.1:3000/auth/register -H 'Content-Type: application/json' \
  -d '{"email":"member@example.com","displayName":"Member","password":"a-long-password"}'

TOKEN='<owner token>'
curl -s http://127.0.0.1:3000/projects -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' -d '{"name":"Release","description":"Launch work"}'
PROJECT='<project id>'
MEMBER='<member user id>'
curl -s "http://127.0.0.1:3000/projects/$PROJECT/members" \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d "{\"userId\":\"$MEMBER\"}"
curl -s "http://127.0.0.1:3000/projects/$PROJECT/tasks" \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d "{\"title\":\"Ship API\",\"assigneeId\":\"$MEMBER\"}"
TASK='<task id>'
curl -s -X PATCH "http://127.0.0.1:3000/projects/$PROJECT/tasks/$TASK" \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"expectedVersion":1,"status":"doing"}'
curl -s "http://127.0.0.1:3000/projects/$PROJECT/activity?limit=20&offset=0" \
  -H "Authorization: Bearer $TOKEN"
```

## HTTP interface

All successful responses use `{ "data": ... }`; collection responses also contain
`page: { limit, offset, total }`. Every collection accepts `limit` (1–100, default
20) and `offset` (nonnegative integer, default 0). Ordering is ascending creation
or event timestamp, then ID; member lists order by user ID. IDs are lowercase UUIDs.
Times are epoch milliseconds. Empty descriptions default to `""`.

| Method and path | Behavior |
| --- | --- |
| `GET /health` | Public health response |
| `POST /auth/register` | Email, displayName, password; returns user and token (201) |
| `POST /auth/login` | Email and password; returns user and token |
| `GET /auth/me` | Current user |
| `POST /auth/logout` | Revoke presented session only |
| `POST /projects` | Name and optional description; creator becomes owner (201) |
| `GET /projects` | Current membership projects |
| `GET /projects/:projectId` | Project details |
| `PATCH /projects/:projectId` | Owner changes name/description |
| `DELETE /projects/:projectId` | Owner soft-deletes project |
| `GET /projects/:projectId/members` | Members with owner/member roles |
| `POST /projects/:projectId/members` | Owner adds existing userId (201) |
| `DELETE /projects/:projectId/members/:userId` | Owner removes member and unassigns active tasks |
| `POST /projects/:projectId/tasks` | Title, optional description/assigneeId (201) |
| `GET /projects/:projectId/tasks` | Filter by status and/or assigneeId; `assigneeId=null` selects unassigned |
| `GET /projects/:projectId/tasks/:taskId` | Task details |
| `PATCH /projects/:projectId/tasks/:taskId` | Required expectedVersion; optional title, description, assigneeId, status |
| `DELETE /projects/:projectId/tasks/:taskId` | Task creator or owner soft-deletes task |
| `GET /projects/:projectId/activity` | Current members' project activity |
| `GET /notifications` | Caller-visible notifications; optional `unread=true` |
| `PATCH /notifications/:notificationId/read` | Idempotent marking; empty body or `{}` |

Other write endpoints that take no fields accept no body or `{}`. All supplied
write bodies require JSON and reject unknown keys. Names and titles are trimmed;
description whitespace is preserved. Task creation always starts at todo/version 1;
`status` is only a PATCH field. The allowed transitions are todo→doing,
doing→todo/done, done→doing. A stale expectedVersion returns 409 even for an
otherwise empty patch. Equal normalized values cause no version/event changes.

Errors use `{ "error": { "code", "message", "requestId" } }`: invalid inputs 400,
authentication 401, member without required ownership 403, invisible/missing
resource 404, state conflict 409, body over 64 KiB 413, wrong content type 415,
login limit 429, unexpected database failure 500. Responses carry request IDs,
security headers, and `Cache-Control: no-store`. A supplied request ID must match
`[A-Za-z0-9_-]{1,64}`; otherwise a new UUID is generated. Logs contain only method,
route template, response status, request ID and duration, excluding bodies,
credentials, concrete resource paths and query values.

## Modules and consistency

- `src/app.ts` composes middleware, authentication, project/task routes and event
  operations. Access helpers query current membership and bind tasks to projects.
- `src/db.ts` owns schema creation and typed SQLite access. Foreign keys, WAL, and
  a five-second busy timeout are enabled. All domain writes use synchronous
  `BEGIN IMMEDIATE` transactions; authorization checks and optimistic versions
  execute inside those transactions. No asynchronous operation occurs inside a
  transaction. Domain changes, exactly one activity entry, and recipient-deduped
  notifications commit together.
- `src/http.ts` owns strict input validation, bounded streamed JSON consumption,
  error types, identifiers and pagination.
- `src/server.ts` owns environment configuration and server shutdown.
- `test/app.test.ts` exercises the exported app factory using Hono requests,
  temporary databases, an injected clock and SQLite failure triggers.

`createApp({ dbPath, now?, logger? })` returns `{ app, close }`. Call `close()` when
finished; it is idempotent. Each factory owns its database connection and login
limiter. `now` defaults to Date.now; `logger` defaults to a no-op. The server
entrypoint supplies a JSON console logger.

Emails are trimmed and lowercased. Argon2id password hashes use 19 MiB memory and
two iterations. Passwords preserve whitespace and must contain 12–128 characters.
Sessions use 32 cryptographically random bytes, stored only as SHA-256 digests,
and expire after 24 hours. User DTOs omit credential information.

The login limiter admits at most five attempts per normalized email and 100 total
attempts per instance per fifteen-minute window, including successful attempts.
The instance-wide limit bounds the account map to at most 100 entries per window;
expired entries are swept on login. Limits reset on application restart. This
simple local policy can temporarily block unrelated users once the global cap is
reached and is not a distributed abuse-defense system.

Membership removal increments each active assigned task's version and clears its
assignee, but emits one membership activity entry. Activity is append-only through
the API. Notification reads are recipient-only and join current membership and
active projects. Removing membership or deleting a project immediately hides the
corresponding notifications, including direct mark-read requests. Rejoining can
make historical items visible again. Deleted tasks retain historical notifications
while their project remains active. Notifications contain IDs, action and time,
not copied task titles. Status changes notify current-member creator and assignee,
except the actor; assignment changes notify the new assignee except the actor.

## Limits and validation

This is a local engineering example: there is no migration framework, email
verification, password reset, TLS termination, distributed limiter, notification
retention policy or automatic expired-session cleanup. SQLite operations are
synchronous and share the server event loop. Deployments would need explicit
operational policies; no deployment is included. The transport body ceiling is
set high so the application's streaming 64 KiB validator produces structured
413 responses instead of Bun's default transport rejection.

Direct dependencies are pinned; `bun.lock` records the install. Hono is the only
runtime package; Bun supplies SQLite, password hashing, test runner and HTTP
server. TypeScript and Bun types support static checks. No ORM or build step is
needed. Official references: [Hono middleware](https://hono.dev/docs/guides/middleware)
and [Bun with Hono](https://bun.com/guides/ecosystem/hono).

Run `bun test` for authorization, version/transition semantics, notification
visibility/deduplication, pagination, malformed input, rollback fault injection,
credential storage, session expiration/revocation, and restart persistence.
Run `bun run typecheck` for all source and tests.
