---
name: kf-define-requirements
description: Clarify ambiguous software requests, including fixes and refactors, into agreed behavior, scope, and acceptance criteria before dependent changes.
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

## Scope and authority

Before substantive work, establish the repository/worktree scope, project
instructions, authorization, and stopping condition; read-only work stays read-only.
Pause only work that depends on missing evidence, capabilities, or user intent, and
continue independent authorized work. Report only observed evidence and results.

## Resolve consequential uncertainty

Separate the desired outcome, accepted choices, source facts, and assumptions.
Distinguish a suggested mechanism from the goal while preserving explicit technical
constraints. Existing implementation explains current behavior, not necessarily
what the user wants.

Inspect relevant behavior, domain contracts, permissions, and entry points, including
alternate paths that affect the same obligation. Reuse current evidence; investigate
accessible technical facts directly and keep unavailable facts unknown.

Before dependent edits, check whether the request admits plausible interpretations
that change the target, scope, observable behavior, data meaning, or compatibility
obligations. If current instructions and established decisions do not settle that
difference, ask the user a focused question and wait for the answer. Judge the
difference by its consequence, not by the request's length, the diff's size, or how
easily it rolls back. Several implementations of the same intended outcome are not
an ambiguity of intent.

Judge the resulting obligations by these criteria:

- They serve the intended outcome or an established constraint.
- Actors, behavior, terms, and limits avoid consequential differences in interpretation.
- Scenarios fit together without contradictions or missing steps needed for use.
- Material feasibility premises have evidence or explicit uncertainty and consequences.
- Acceptance conditions distinguish success from failure without an unjustified solution.

Ask early once the missing decision is identifiable; explain the concrete difference
between likely interpretations and recommend one when justified. Investigate facts
that can settle the ambiguity, but do not keep reading code to guess a user preference.
Resolve routine means within an established goal from evidence and preferences.
While waiting, continue only work valid under the unresolved interpretations; do not
modify dependent code or encode a guessed outcome in tests. Silence, a default option,
or an unanswered question does not settle the decision.

## Carry understanding forward

Finish clarification when behavior, boundaries, and acceptance conditions support
the next action without an unresolved question that could invalidate it. Deferred
details may remain if they do not block that action; explain their limits and what
would require resolution.

Carry forward obligations, decisive reasons, and remaining uncertainty in the
conversation or existing brief. Create a durable artifact only when requested or
needed for delivery; no fixed question count, story format, or comprehensive
specification is required.

Once the needed answers are established, continue authorized design or implementation
without a new approval checkpoint. Clarifying missing intent is not re-requesting
permission for settled work.
Respect analysis-only requests and step-by-step discussion. When goals, facts, or
assumptions change, explain and update affected obligations and downstream decisions;
preserve settled work that remains valid.
