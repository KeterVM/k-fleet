---
name: kf-define-requirements
description: Clarify underspecified software features into concrete behavior, scope, and acceptance criteria before consequential design choices.
---

# Define requirements

Make the intended outcome, scope, constraints, and acceptance conditions usable for
the next engineering decision. Reuse an adequate brief; clear, bounded changes need
no requirements exercise or formal document. Preserve user goals and explicit
choices without inventing product commitments.

## Select supporting guidance

Read only for unresolved questions; leave routine design and implementation choices
to those methods.

- For unclear outcomes, actors, workflows, or scope, read
  [Outcomes and scope](references/outcomes-and-scope.md).
- For assumptions, conflicting inputs, feasibility gaps, or missing user intent,
  read [Uncertainty and decisions](references/uncertainty-and-decisions.md).
- For acceptance conditions, missing failure behavior, or inconsistent obligations,
  read [Acceptance and consistency](references/acceptance-and-consistency.md).

## Runtime and authority

Before substantive work, establish canonical repository/worktree scope, project
instructions, authorization, and the stopping condition. External memory is optional
unless the task or project explicitly requires it. Use current conversation and
repository sources when memory is absent or unavailable; report material gaps and
pause only work that depends on missing evidence or a required memory operation.

Current instructions and scoped sources override memory; recalled inferences grant
no permission. Use only context with appropriate project/worktree scope. The user
or project chooses any memory integration, which owns its recall, storage, and
retrieval. Use its supported interfaces within authorization; do not invent a
replacement backend or adapter. Skill or policy edits require authorized,
versioned, reversible source maintenance.

The main agent owns routing, authority, integration, and completion. Carry existing
authorization across methods; read-only work stays read-only. Within higher-priority
constraints, explicit user instructions override skill guidance. If a skill rule
halts work, link and quote it, distinguishing the rule from your interpretation.
Continue independent authorized work whose prerequisites are met. Report only
observed evidence, including capture and execution.

## Resolve consequential uncertainty

Separate the desired outcome, accepted choices, source facts, and assumptions.
Distinguish a suggested mechanism from the goal while preserving explicit technical
constraints. Existing implementation explains current behavior, not necessarily
what the user wants.

Inspect relevant behavior, domain contracts, permissions, and entry points, including
alternate paths that affect the same obligation. Reuse current evidence; investigate
accessible technical facts directly and keep unavailable facts unknown.

Judge the resulting obligations by these criteria:

- They serve the intended outcome or an established constraint.
- Actors, behavior, terms, and limits avoid consequential differences in interpretation.
- Scenarios fit together without contradictions or missing steps needed for use.
- Material feasibility premises have evidence or explicit uncertainty and consequences.
- Acceptance conditions distinguish success from failure without an unjustified solution.

Use focused questions when missing intent or a material choice changes the result;
resolve routine details from evidence and established preferences. Do not proceed on
an undecided premise that could invalidate dependent work or treat silence as agreement.

## Carry understanding forward

Finish clarification when behavior, boundaries, and acceptance conditions support
the next action without an unresolved question that could invalidate it. Deferred
details may remain if they do not block that action; explain their limits and what
would require resolution.

Carry forward obligations, decisive reasons, and remaining uncertainty in the
conversation or existing brief. Create a durable artifact only when requested or
needed for delivery; no fixed question count, story format, or comprehensive
specification is required.

Continue authorized design or implementation without a new approval checkpoint.
Respect analysis-only requests and step-by-step discussion. When goals, facts, or
assumptions change, explain and update affected obligations and downstream decisions;
preserve settled work that remains valid.
