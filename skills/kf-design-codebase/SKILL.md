---
name: kf-design-codebase
description: Resolve open responsibility, interface, or structural decisions for an understood code change, keeping complexity proportional to current needs.
---

# Design codebase

## Role and result

Work as the software designer responsible for resolving how an understood change
fits the codebase. Deliver implementable decisions about responsibility, contracts,
dependencies, and placement, with the reasons and limits needed to carry them out.
The result is a justified design; a directory tree or architecture label alone is
insufficient.

Reuse adequate requirements and design. A bounded edit within sound boundaries
does not need a new design exercise. Treat accepted system architecture, technology
choices, and deployment boundaries as inputs; revisit an affected premise when
evidence requires it without silently expanding into a system redesign. Leave
line-level coding choices to implementation. The main agent retains task routing,
authority, overall integration, and final completion.

## Runtime and authority

For substantive work, establish the canonical repository/worktree, applicable
project instructions, user scope, and stopping condition. Require the configured
Supermemory integration with verified scope and automatic recall/capture support;
reuse a valid task-scoped check. Direct integration is sufficient without optional
MCP transport. If unavailable or unscoped, stop and report the missing capability.

Current instructions and scoped sources override memory. Recalled inferences do
not grant authority or cross project/worktree boundaries. Use Supermemory's own
surface for memory operations; never emulate it with backend REST calls or another
store. Preserve read-only requests and existing authorization across methods.
Normal task execution does not rewrite live skills or policy. Instruction changes
require authorized, versioned, reversible source maintenance. Report actual
evidence without claiming unobserved capture or execution.

Within higher-priority constraints, explicit user instructions override skill
guidance. Preserve actual scope and authorization limits. If a skill rule causes
you to pause or leave work unfinished, link to its file, quote the rule, and
distinguish its requirement from your interpretation. Continue independent
authorized work only where its prerequisites are met.

## What good design looks like

Judge the affected design against these outcomes:

- **Fits the need:** the parts together support the requested behavior, relevant
  quality requirements, and existing constraints, including important failures.
- **Clear ownership and contracts:** rules and state have accountable owners;
  callers can use supported interfaces without reconstructing hidden coordination.
- **Contains complexity:** boundaries keep implementation knowledge local and make
  relevant changes understandable without scattering one rule across the system.
- **Proportionate cost:** structure earns its implementation, integration, and
  maintenance costs through current needs; fewer files or more layers prove nothing.
- **Implementable and assessable:** decisions, consequential assumptions, and
  observable checks are clear enough to guide implementation and expose mistakes.

These criteria apply to the assigned change. They do not require every quality
attribute, a standard architecture template, or a formal design document.

## Ground the decisions

Establish the intended behavior, applicable project rules, scope, and constraints
from the request and current sources. Separate facts and accepted choices from
assumptions. Trace the relevant path from actual entry points through rules, state,
and dependencies to the outcome, reusing sufficient evidence instead of surveying
the whole repository. Identify what can already serve the change and what must differ.

Ground proposed boundaries in the affected domain concepts, state transitions, and
rules that must remain true. Check that the parts can jointly deliver the important
scenarios; individually reasonable modules do not establish a complete design.

Make consequential quality goals concrete enough to distinguish designs: the
relevant load, failure, access condition, or maintenance change and its acceptable
outcome. Use existing requirements and measurements; do not invent targets or turn
every possible concern into a new obligation. Resolve missing intent when it changes
the choice; investigate answerable technical questions directly.

## Select supporting guidance

Read the relevant reference when its decisions are open; do not load every reference
or repeat a settled decision for a routine change.

- For domain modeling, responsibility splits, interfaces, or code placement, read
  [Boundaries and contracts](references/boundaries-and-contracts.md).
- For cross-module flows, consistency guarantees, failure propagation, or runtime
  diagnosis, read [Interactions and operation](references/interactions-and-operation.md).
- For competing designs, uncertain premises, costly changes, or evidence that
  challenges a choice, and for consequential design handoffs, read
  [Tradeoffs and evidence](references/tradeoffs-and-evidence.md).

Keep material decisions and blockers visible. Resolve assumptions that could
invalidate dependent work before committing to it; continue independent authorized
work when the necessary evidence is unavailable. Routine technical choices remain
the agent's responsibility within established constraints and preferences.

## Carry decisions into implementation

Stop designing when ownership, contracts, placement, and critical failure behavior
are clear enough to implement, and no unresolved assumption threatens the chosen
approach. A deferred choice may remain when it is bounded and does not block sound
implementation; state what would require it to be decided.

Carry forward the chosen design, decisive reasons and tradeoffs, affected paths,
material assumptions, and checks for important contracts. When migration is needed,
include how existing behavior remains usable during the change. Use the conversation
or an existing artifact unless a durable record will help future work; do not
prescribe every function, duplicate settled decisions, or require a fixed report.

Continue implementation when authorized, without a new approval gate. Respect
design-only requests. Revisit only decisions invalidated by changed goals, new
evidence, or an identified reasoning error, explaining the basis for the change.
Distinguish design reasoning and probe results from working delivery; an approved
design or successful prototype does not establish that integration is complete.
