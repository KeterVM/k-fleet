# Project Hub API: implementation exercise

Build a runnable local project-management API using Hono, TypeScript, and Bun.
Use SQLite for durable storage. This is an engineering example, not a production
deployment. There are two business modules, projects and tasks; authentication,
middleware, operation history, and in-app notifications support them.

The implementer receives this brief as the design input. Architecture and code are
the implementer's responsibility. Do not read the repository's evaluation material
or modify this brief. Keep all implementation files inside this example directory.

## Users and authentication

- Public endpoints: `GET /health`, `POST /auth/register`, `POST /auth/login`.
- Registration accepts email, display name, and password; login accepts email and
  password. Normalize email identity. Reject duplicate accounts and invalid input.
  Passwords are 12–128 characters and must be stored with a suitable password hash.
- Successful registration or login returns `{ data: { user, token } }`. Use random
  opaque bearer tokens, store only their hashes, expire sessions after 24 hours,
  and reject expired or revoked tokens. User responses never include credential data.
- `GET /auth/me` returns the authenticated user; `POST /auth/logout` revokes only
  the presented session. Neither client-supplied user IDs nor role fields establish
  identity or privileges. Implement a bounded, documented login-attempt limiter.

## Projects module

- `POST /projects`: create a project with `name` and optional `description`; the
  authenticated creator is its owner and first member.
- `GET /projects`: list only projects the caller currently belongs to.
- `GET`, `PATCH`, and `DELETE /projects/:projectId`: read, edit, or soft-delete a
  project. Only the owner edits or deletes projects. Deleted projects and their
  tasks are unavailable through normal API routes.
- `GET /projects/:projectId/members`: list members and their `owner`/`member` roles.
- `POST /projects/:projectId/members` with `{ userId }` and
  `DELETE /projects/:projectId/members/:userId`: owner-only membership changes.
  Added users must exist. The owner cannot be removed. Removing a member unassigns
  their active tasks and increments affected task versions as part of that operation.
- Nonmembers receive 404 for project-scoped resources; authenticated members who
  lack permission for an operation receive 403.

## Tasks module

- `POST` and `GET /projects/:projectId/tasks`: create and list project tasks.
- `GET`, `PATCH`, and `DELETE /projects/:projectId/tasks/:taskId`: read, edit, or
  delete a task. All current project members can create and edit tasks; only the
  task creator or project owner can delete them.
- Task fields: `title`, optional `description`, nullable `assigneeId`, and `status`
  (`todo`, `doing`, `done`). New tasks start at `todo` with version 1. Assignees must
  be current members of the same project. Project IDs and task IDs cannot be mixed
  to bypass authorization.
- PATCH accepts mutable fields plus required `expectedVersion`. Stale writes return
  409 without side effects. Status transitions are `todo -> doing`, `doing -> todo`,
  `doing -> done`, and `done -> doing`; other transitions return 409. A no-op patch
  does not increment version or produce history/notifications.
- Task lists support status and assignee filtering. Collection endpoints use
  validated `limit` (1–100, default 20) and `offset` (nonnegative, default 0), with
  deterministic ordering and `{ data: [...], page: { limit, offset, total } }`.

## Operation history and notifications

- `GET /projects/:projectId/activity`: current members can read append-only activity
  containing event ID, actor ID, action, target type/ID, and timestamp. Record each
  successful state-changing project or task operation once; record a membership
  removal as one operation even if it unassigns several tasks. Failed operations,
  reads, authentication, and no-op updates do not produce activity.
- Create an in-app notification for the new assignee when a task is initially
  assigned or reassigned. On a status change notify its assignee and creator,
  excluding the actor and deduplicating recipients within the operation. No external
  email, push provider, message broker, or realtime channel is required.
- `GET /notifications` lists the caller's notifications, with optional `unread=true`.
  `PATCH /notifications/:notificationId/read` marks their visible notification read;
  repeated calls are harmless. A caller cannot inspect or mark another user's item.
- Activity and notification visibility follows current project membership. A removed
  member must not receive project information through summaries or read endpoints.
  Soft-deleting a project hides its history and notifications from normal routes.
- Persist domain mutations, activity, and notification creation atomically. Partial
  failure must not leave a successful mutation with missing required records, or
  records describing a mutation that rolled back. Replaying a stale task PATCH must
  not generate duplicate activity or notifications.

## HTTP and runtime behavior

- Use middleware for authentication, request IDs, request logging, and consistent
  errors. Apply appropriate response security headers. Do not log credentials,
  authorization headers, request bodies, or sensitive query values.
- Every response includes `X-Request-Id`, including errors. Accept a caller's request
  ID only when it is 1–64 ASCII letters, digits, underscores, or hyphens; otherwise
  generate one. Error bodies are `{ error: { code, message, requestId } }` and never
  expose stacks, SQL, or credentials. Use meaningful HTTP status codes.
- Validate input types, bounds, required fields, enums, and unknown write fields.
  Names/titles are trimmed and nonempty, at most 120/200 characters respectively;
  descriptions are at most 4000 characters; display names are 1–80 characters.
  Reject malformed JSON and write bodies over 64 KiB cleanly. Unknown routes and
  malformed identifiers must not become accidental 500 errors.
- Export `createApp({ dbPath, now?, logger? })` from `src/app.ts`, returning
  `{ app, close }`, so integration tests use Hono's request API without opening a
  port. `now` returns epoch milliseconds; `logger` receives a structured request
  record. Each app instance owns its database and rate-limit state. Imports do not
  start a server. Provide a separate runnable server entrypoint, configurable host,
  port and database path, and graceful database closure.
- Provide `bun install`, `bun run start`, `bun test`, and `bun run typecheck` support.
  Pin direct dependency versions and commit the generated lockfile. Ignore local
  database files and dependency output. Document setup, endpoint examples, module
  responsibilities, design choices, and material limitations in README.md.

## Delivery

Deliver complete behavior with meaningful automated tests, including authorization,
state transitions, rollback consistency, notifications, and persistence. Choose
internal structure and implementation techniques using normal engineering judgment.
Use proportionate checks and report actual outcomes. Do not deploy, publish, change
other examples, edit K Fleet skills, or commit on behalf of the parent agent.
