# Hono implementation observation plan

This is a one-run observation of an independent implementer receiving an explicit
software design brief. It does not measure unprompted requirements discovery or
prove a candidate skill's benefit. No implementation skill is supplied by the parent.
The host's existing instructions and tools remain part of the environment.

The implementer owns `examples/project-hub/` except its frozen BRIEF.md. It is
instructed not to read evaluation material. Evaluator-owned files live here; this
is an instruction boundary, not OS-enforced read isolation. Preserve the initial
implementation snapshot and evaluate it before returning findings for correction.

## Independent acceptance probes

- Authentication: normalization, wrong password, forged identity fields, random,
  expired and revoked sessions, app-instance isolation, persisted session behavior.
- Authorization: nonmember enumeration, member owner-only operations, a task ID
  under another project, removed assignee, notification access after membership loss.
- Domain behavior: task creation, legal/illegal state changes, stale version,
  no-op patch, member removal unassignment, delete authorization, filtered pagination.
- Atomicity: force a notification insert failure in SQLite and confirm task,
  version, activity, and notifications all remain unchanged; retry a committed
  task update and verify no additional event or notification.
- Lifecycle: close/reopen the same database and verify domain/history/notification
  persistence, isolate two independent app instances, real HTTP startup and shutdown.
- Middleware: request IDs and security headers on errors, malformed JSON, oversized
  bodies, invalid pagination and unknown properties, sanitized structured logging,
  documented login limiting without sharing state between app instances.

## Engineering assessment

Evaluate cohesive module ownership, dependency direction, transaction ownership,
trust-boundary enforcement, error translation, configuration and resource lifecycle,
meaningful test coverage, and README accuracy. Prefer concrete reachable failures
over style preferences. Record self-reported checks separately from independent
execution and review. Report baseline findings before fixes and final residual risks.

Potential skill guidance must come from observed decisions or omissions, with
alternative explanations retained. The detailed design already supplies many
requirements; do not attribute compliance with them to spontaneous reasoning.
