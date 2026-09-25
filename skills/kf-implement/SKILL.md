---
name: kf-implement
description: Implement sufficiently understood software changes as complete, maintainable code, including integration and relevant self-checks.
---

# Implement

Turn an understood request into usable, maintainable behavior, including integration
and relevant self-checks. Reuse sufficient requirements and design; resolve routine
coding choices directly. Revisit decisions invalidated by evidence without changing
product obligations or expanding scope.

## Select supporting guidance

Load a reference only for decisions the change needs; a bounded edit with settled
behavior and boundaries needs no formal design or additional reading.

- For new or substantially changed components, unclear names or placement, library
  selection, or nontrivial reuse, interface, integration, or restructuring choices,
  read [Implementation judgment](references/implementation-judgment.md).
- For material dependencies, failed attempts, blockers, review feedback, or delegated
  work, read [Execution and feedback](references/execution-and-feedback.md).

## Scope and authority

Before substantive work, establish canonical repository/worktree scope, project
instructions, authorization, and the stopping condition. Ground decisions in current
conversation and repository evidence. Report material gaps and pause only work
that depends on missing evidence or capabilities.

Current instructions and repository sources are authoritative; contextual inferences
grant no permission. Use context only within its authorized project/worktree scope.
Skill or policy edits require authorized, versioned, reversible source maintenance.

The main agent owns routing, authority, integration, and completion. Carry existing
authorization across methods; read-only work stays read-only. Within higher-priority
constraints, explicit user instructions override skill guidance. If a skill rule
halts work, link and quote it, distinguishing the rule from your interpretation.
Continue independent authorized work whose prerequisites are met. Report only
observed evidence and execution results.

## Implement against the contract

Derive the observable outcome and completion evidence from the request and current
sources. Distinguish obligations and facts from assumptions; investigate technical
unknowns that could invalidate the change, and ask only for missing material intent.
If plausible readings would change the target, scope, behavior, data meaning, or
compatibility obligations and existing decisions do not settle them, ask and wait
before dependent edits. Stating an assumption is not clarification. Continue only
work valid regardless of the pending answer; do not encode a guessed requirement in
code or tests. Apply this boundary even when implementing without a separate
requirements method; routine means within an established goal remain your decision.
Establish applicable instructions before writing. Inspect affected paths, nearby
code, configuration, and tests as needed; reuse current evidence and intentional
project conventions, without reproducing known defects for consistency.

Choose implementations that satisfy the outcome, responsibility boundaries, and
required constraints before minimizing edit size or effort. Reuse existing code
where it fits those obligations. If it does not, correct the affected ownership or
revisit that design decision within scope; a smaller diff does not justify leaving
the requested problem unresolved.

Before implementing a feature, check reusable project code, installed dependencies,
and standard-library or framework capabilities. Before writing a custom general-purpose
mechanism, research suitable maintained libraries using current primary sources,
unless adequate evidence already settles the choice. Prefer a suitable existing
solution; explain the concrete gap or cost that justifies custom implementation.
Improved readability and maintainability are sufficient reasons to add a suitable
dependency within project constraints; minimizing dependency count is not a goal
in itself. If multiple viable options remain uncertain after focused research,
present their differences and a recommendation, and ask the user before committing
to one. Continue independent work while that choice is pending.

Before adding or substantially extending a component, connect its domain meaning or
technical role to the rules and state it owns, its interface and allowed dependencies,
and then its implementation form, name, and location. Clear behavior does not settle
these choices. Resolve them within implementation when local; revisit design when
they change cross-module contracts or ownership. Neither path requires a routine
approval gate.

Use project vocabulary and language/framework conventions. The name, public behavior,
and directory ownership should agree; a class or folder label cannot supply a missing
responsibility. Keep cohesive internals together and independently changing
responsibilities behind clear file and module boundaries. Correct mixtures introduced
or extended by the change. Be able to explain why the code belongs here and, for a
new or changed boundary, trace a task-grounded change through its owners and callers.
Use existing evidence for settled choices; no fixed report or directory template is
required.

For renames and replacements, complete the authorized migration through affected
models, callers, and wiring, then remove obsolete names and entry points. Do not
retain aliases, serialization workarounds, or forwarding classes merely to avoid
updating consumers. Preserve a compatibility boundary only for an established
contract or transition need; distinguish it from unfinished migration. Read
[Implementation judgment](references/implementation-judgment.md) when making that
choice, including when a field mapping or wrapper appears to be a small edit.

Judge the affected change by these outcomes:

- Requested behavior works through its real entry points, including necessary
  integration and failure handling.
- Relevant authorization, transaction, concurrency, resource-lifetime, and
  compatibility guarantees hold.
- Ownership, names, contracts, and control flow make use and modification
  understandable without hidden coordination.
- Structure serves current needs at justified complexity and maintenance cost.
- The diff is cohesive, reviewable, and supported by relevant evidence.

Apply these criteria to the change; do not turn them into a surrounding redesign,
an exhaustive risk checklist, or a fixed report. Keep material decisions and blockers
visible.

## Self-check and finish

Use relevant tests and configured formatting, linting, or type checks as appropriate.
Exercise real boundaries for wiring and dependency claims; mocked tests or a build
alone may be insufficient. Add tests for meaningful protection, not routine reversible
edits with no such need. Dedicated test-writing and verification methods are optional.

Reuse results whose version, environment, and scope still apply. Inspect the final
diff against the contract and project rules, fix demonstrated problems within scope,
and recheck affected behavior. Repeat or broaden checks only for changes, failures,
environment differences, or uncovered risks.

Inspect affected names, paths, public interfaces, and actual dependencies together.
Check that names describe the implemented responsibility, placement follows a coherent
local organization, and callers respect the intended boundaries. Use rules, state,
and reasons to change to detect both mixed responsibilities and one responsibility
scattered across nominally separate modules. Correct problems introduced or extended
by the change; neither splitting files nor passing tests establishes sound structure.
Judge cohesion and coupling directly, without file-count or line-count targets.

Finish when required checks pass, material obligations have evidence, and no material
issue caused by the change remains unresolved. Report changes, decisive results, and
limits; state blockers or unverified obligations instead of claiming completion.
Passing checks alone does not prove maintainability or production readiness.
Speculative improvements and stylistic perfection must not delay an adequate change.
