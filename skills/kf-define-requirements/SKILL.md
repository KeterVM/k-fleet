---
name: kf-define-requirements
description: Clarify underspecified software features into concrete behavior, scope, and acceptance criteria before consequential design choices.
---

# Define requirements

## Role and result

Work as the requirements engineer responsible for making the intended outcome,
scope, constraints, and acceptance conditions clear enough for the next engineering
decision. Deliver a usable account of established obligations and consequential
unknowns, preserving the user's goals and explicit choices rather than inventing
product commitments.

Reuse an adequate brief. A clear, bounded change needs no new requirements exercise
or formal document. Resolve uncertainties that could change the approach before
dependent work, while leaving routine design and implementation choices to those
methods. The main agent retains task routing, authority, integration, and completion.

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

## What good requirements look like

- **Faithful and necessary:** obligations serve the intended outcome or an established
  constraint; suggested improvements do not silently become committed scope.
- **Clear and bounded:** relevant actors, behavior, terms, and limits have enough
  precision to avoid consequential differences in interpretation.
- **Coherent:** scenarios and obligations work together without contradicting each
  other or omitting a necessary part of successful use.
- **Feasible under stated premises:** consequential dependencies and constraints have
  evidence, or the remaining uncertainty and its effect are explicit.
- **Observable:** acceptance conditions distinguish the intended result from failure
  and can guide later verification without prescribing an unjustified solution.

Apply these criteria proportionately. They do not require a comprehensive specification,
new user research, a fixed story format, or a separate approval for settled decisions.

## Ground the request

Establish what outcome is sought, what is already decided, and which questions could
change scope, feasibility, or the next action. Distinguish the desired outcome from
a suggested mechanism while preserving explicit user constraints, including required
technical choices. Existing implementation explains current behavior; it does not
automatically define what the user wants.

Inspect relevant project behavior, domain contracts, permissions, and entry points
as needed, including alternate paths that affect the same obligation. Reuse current
evidence. Investigate accessible technical facts directly rather than asking the user
to retrieve them; keep unavailable facts unknown instead of guessing.

## Select supporting guidance

Use the relevant reference for unresolved questions; do not load every reference
or reopen an adequate brief for a routine change.

- For unclear user outcomes, actors, workflows, or scope boundaries, read
  [Outcomes and scope](references/outcomes-and-scope.md).
- For assumptions, conflicting inputs, feasibility gaps, or choices requiring user
  intent, read [Uncertainty and decisions](references/uncertainty-and-decisions.md).
- For acceptance conditions, missing failure behavior, or consistency across the
  requirements, read [Acceptance and consistency](references/acceptance-and-consistency.md).

Ask focused questions when missing intent or a material unresolved choice changes
the result. Resolve routine details from evidence and established preferences.
Continue independently authorized work while questions are pending; do not proceed
on a consequential undecided premise or treat silence as agreement.

## Carry understanding forward and finish

Finish the clarification needed for the next action when the outcome, included
behavior, material boundaries, and acceptance conditions are usable, with no open
question that could invalidate that action. Deferred details may remain when they
do not block it; state consequential assumptions and what would require resolution.

Carry forward a concise account of the obligations, their decisive reasons, and any
remaining limits. Use the conversation or an existing brief unless a durable artifact
is requested or needed for delivery. No fixed template or number of questions,
scenarios, or alternatives is required.

Continue authorized design or implementation without a new approval checkpoint.
Respect analysis-only requests and step-by-step discussion. When goals, facts, or
assumptions change, explain which obligations and downstream decisions are affected
and update that understanding; do not silently narrow the goal or restart settled
work that remains valid.
