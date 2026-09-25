---
name: kf-design-codebase
description: Resolve open responsibility, interface, or structural decisions for an understood code change, keeping complexity proportional to current needs.
---

# Design codebase

Resolve how an understood change fits the codebase through implementable decisions
about responsibility, contracts, dependencies, and placement. Reuse adequate design;
a bounded edit within sound boundaries needs no design exercise. Accepted architecture,
technology, and deployment choices remain inputs unless evidence warrants revisiting
an affected premise. Leave line-level choices to implementation.

## Select supporting guidance

Read only where decisions remain open:

- For domain modeling, responsibility splits, interfaces, or placement, read
  [Boundaries and contracts](references/boundaries-and-contracts.md).
- For cross-module flows, consistency, failure propagation, or runtime diagnosis,
  read [Interactions and operation](references/interactions-and-operation.md).
- For competing designs, uncertain or challenged premises, costly changes, or
  consequential handoffs, read [Tradeoffs and evidence](references/tradeoffs-and-evidence.md).

## Scope and authority

Before substantive work, establish canonical repository/worktree scope, project
instructions, authorization, and the stopping condition. Ground decisions in current
conversation and repository evidence. Report material gaps and pause only work
that depends on missing evidence or capabilities.

Current instructions and repository sources are authoritative; contextual inferences
grant no permission. Use context only within its authorized project/worktree scope.
Skill or policy edits require authorized, versioned, reversible source maintenance.

Carry existing authorization across methods; read-only work stays read-only. Within
higher-priority constraints, explicit user instructions override skill guidance. If a skill rule
halts work, link and quote it, distinguishing the rule from your interpretation.
Continue independent authorized work whose prerequisites are met. Report only
observed evidence and execution results.

## Choose a sufficient design

Ground choices in requested behavior and constraints, separating facts and accepted
choices from assumptions. Trace affected entry points, rules, state, and dependencies
to the outcome; reuse sufficient evidence rather than surveying the repository.
Identify existing capabilities and the change needed.

For general-purpose capabilities in the affected design, default to mainstream,
maintained ecosystem libraries and frameworks and their supported conventions.
Research suitable options before committing the design, or reuse adequate current
selection evidence. Compare affected custom implementations even when they have no
reported problems; retaining or adding one requires a concrete reason. Read
[Tradeoffs and evidence](references/tradeoffs-and-evidence.md) for this choice.

First establish which designs satisfy the requested outcome, responsibility
boundaries, and required constraints; compare change and maintenance costs among
those designs. Fewer edits cannot compensate for unmet obligations or misplaced
ownership. When structure is the subject of the request, assess existing boundaries
as candidates rather than treating their preservation as an accepted constraint.

Judge the affected design by these criteria:

- The parts jointly deliver important success and failure scenarios.
- Rules and state have clear owners; interfaces avoid hidden caller coordination.
- Boundaries keep implementation knowledge local rather than scattering one rule.
- Domain terms, component roles, paths, and allowed dependencies express the same
  ownership model; implementation need not invent a conflicting one.
- Structure earns its integration and maintenance cost through current needs.
- Decisions and assumptions can guide implementation and be challenged by observable
  evidence; a directory tree or architecture label alone is insufficient.

Make consequential quality goals concrete through relevant load, failure, access, or
maintenance conditions and acceptable outcomes. Use established requirements and
measurements, not invented targets or an exhaustive quality checklist. Investigate
answerable technical questions; ask for missing intent only when it changes the choice.
When plausible interpretations change the target, scope, behavior, data meaning, or
compatibility obligation and established decisions do not settle the difference,
ask and wait before committing dependent design or code. Existing code establishes
facts, not the user's choice between those outcomes. Continue only work independent
of that answer; a declared assumption does not resolve missing intent.

Resolve assumptions that could invalidate dependent work before committing to it.
Keep material decisions and blockers visible, without turning a local design into
an unrelated system redesign.

## Carry decisions into implementation

Stop designing when ownership, contracts, placement, and critical failure behavior
are clear enough to implement. Bound deferred choices so they do not threaten the
approach, and state what would require resolution.

Carry forward decisive reasons, tradeoffs, affected paths, material assumptions, and
checks for important contracts. Include compatibility during migration when needed.
Use the conversation or an existing artifact unless a durable record helps delivery;
do not prescribe every function or require a fixed report.

Continue authorized implementation without a new approval gate; respect design-only
requests. Revisit only decisions invalidated by changed goals, new evidence, or
reasoning errors, explaining the basis. An approved design or successful prototype
does not establish completed integration.
