# Workflow method composition

K Fleet's six method skills are complementary capabilities, not a mandatory
sequence. The main agent selects only what the task needs; each method remains
usable on its own. This maintainer note explains the installed selection contract;
root reminders are written by the user-triggered `kf-setup`. Setup is not a task
phase and is never invoked automatically. Installation only prompts the user to
run it once; a later explicit setup request can refresh the same managed block.

| Need | Capability | Result to carry forward |
| --- | --- | --- |
| Material uncertainty about intended behavior | `kf-define-requirements` | Scope, observable acceptance criteria, unresolved assumptions |
| Unresolved fit, responsibility, or complexity within the codebase | `kf-design-codebase` | A justified design with clear contracts, ownership, and placement |
| An understood code change | `kf-implement` | Complete integrated behavior, warranted design corrections, and relevant checks |
| Missing automated protection | `kf-write-tests` | Discriminating tests and their actual execution results |
| Determine whether delivery satisfies the request and has related problems | `kf-verify` | Verified behavior, reproducible findings, and unverified obligations |
| Requested skill assessment or improvement, or a reusable capability gap exposed by work | `kf-evolve-skills` | Evidence-backed assessment; for authorized changes, actual-use observations or an explicit unproven status |

Reuse sufficient inputs and evidence rather than recreating them at every step.
A small understood fix can proceed directly to implementation and focused
verification. Test-first work can write a failing behavior test before code exists.
A verification-only request does not authorize product-code correction. Respect
analysis-only requests even when a later capability could continue the work.

Missing intent can surface in any method, including a small fix or refactor. When
plausible interpretations change the target, scope, behavior, data meaning, or
compatibility obligations, resolve the difference from established decisions or ask
the user before dependent edits. Stating an assumption and proceeding does not resolve
it. Continue independent work while waiting, then resume authorized delivery without
another approval gate. Routine implementation choices within settled goals remain
the agent's responsibility.

Understood behavior does not imply settled code organization. Implementation owns
local choices about responsibility, interfaces, representation, names, and paths,
including when no design method was selected. Design resolves consequential ownership
or contract decisions and carries their rationale forward. Verification checks the
resulting names, placement, and actual dependencies when those components or boundaries
change. These are complementary responsibilities, not a mandatory three-stage route.

Return to the affected decision when evidence changes it: a verification failure
may require an implementation fix, a revised module contract, or clarification of
intended behavior. Revisit only what the new evidence invalidates, then verify the
correction and affected behavior. Do not restart every capability or add routine
approval gates between them.

Overlap is intentional: implementation owns its self-checks, test writing owns the
quality of automated checks, and verification assesses delivery against the goal.
They can share applicable test results without treating the implementer's report
as the sole source of truth. The coordinating agent owns task scope, routing,
engineering decisions, integration, and final completion. Method selection does
not transfer responsibility for whether the overall solution makes sense. User
corrections and implementation friction can expose a decision to revisit before
verification; investigate the cause and keep corrections within the task's scope.

Capability improvement closes a separate feedback loop: observed gap, diagnosis,
existing-skill inspection, discovery or creation, actual use, and retention or
correction. It can help the current task or a later authorized task; it is not a
mandatory final phase. Missing tools, access, or product decisions should be
resolved at their own source. Search or installation success alone does not prove
that the new guidance improves the work.

## Optional memory

Engineering methods use the current task and repository evidence independently of
external memory. Users or projects choose whether to add Supermemory, a graph-based
integration, another backend, or none. Memory can carry context and experience across
tasks; its absence does not prevent current-task feedback or authorized skill revision.

Public skills and managed reminders contain engineering guidance and general source,
scope, and authority rules. Memory-provider setup, checks, and operations remain
outside those instructions.
