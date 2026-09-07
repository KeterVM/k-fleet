# Candidate skill composition

These drafts describe complementary capabilities, not a mandatory sequence or an
installed routing contract. Select the capabilities needed by the current task;
each skill remains usable on its own. This note records the intended composition
for evaluation before any public packaging or orchestrator change.

| Need | Capability | Result to carry forward |
| --- | --- | --- |
| Material uncertainty about intended behavior | `kf-define-requirements` | Scope, observable acceptance criteria, unresolved assumptions |
| Unresolved internal ownership or organization | `kf-design-codebase` | Module contracts, dependency and transaction ownership, relevant paths |
| An understood code change | `kf-implement` | Integrated behavior and the implementer's checks |
| Missing automated protection | `kf-write-tests` | Discriminating tests and their actual execution results |
| Determine whether delivery satisfies the request and has related problems | `kf-verify` | Verified behavior, reproducible findings, and unverified obligations |

Reuse sufficient inputs and evidence rather than recreating them at every step.
A small understood fix can proceed directly to implementation and focused
verification. Test-first work can write a failing behavior test before code exists.
A verification-only request does not authorize product-code correction. Respect
analysis-only requests even when a later capability could continue the work.

Return to the affected decision when evidence changes it: a verification failure
may require an implementation fix, a revised module contract, or clarification of
intended behavior. Revisit only what the new evidence invalidates, then verify the
correction and affected behavior. Do not restart every capability or add routine
approval gates between them.

Overlap is intentional: implementation owns its self-checks, test writing owns the
quality of automated checks, and verification assesses delivery against the goal.
They can share applicable test results without treating the implementer's report
as the sole source of truth. The coordinating agent owns task scope, routing,
integration, and final completion; this note introduces no new public skill.
