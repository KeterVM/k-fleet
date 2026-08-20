---
name: kf-design-change
description: Design an implementation-ready code change without modifying production code. Use when the user asks for a technical design, architecture or migration plan, implementation plan, or comparison of approaches before coding. Do not use for investigation-only explanations, authorized implementation, defect correction, behavior-preserving refactors, or verification of existing changes.
---

# Design Change

Produce an evidence-based design that another engineer or agent can implement
without rediscovering its material decisions. Default to read-only analysis; create
or update a design document only when the user requests or authorizes that write.

## Workflow

1. Define the observable target state, acceptance evidence, scope, non-goals, and
   compatibility or authorization constraints. Separate verified facts,
   assumptions, and unresolved questions.
2. Inspect applicable repository guidance, documentation, relevant code paths,
   analogous implementations, tests, configuration, and history before proposing
   a structure.
3. Trace the affected boundaries and invariants. Include interfaces, data,
   security, operations, rollout, or migration concerns only when the change
   actually reaches them.
4. Derive viable approaches from the target and constraints. When materially
   different options exist, compare their correctness, complexity, compatibility,
   failure modes, and reversibility rather than presenting cosmetic alternatives.
5. Recommend the smallest complete design supported by repository evidence. State
   why it is preferable, what evidence could invalidate it, and which decision
   still requires user input.
6. Convert the design into implementation-ready increments. Identify affected
   components or files, interface and data changes, ordering dependencies,
   acceptance checks, and proportionate rollback or recovery steps.
7. Challenge the proposal against counterevidence, edge conditions, migration
   states, and unintended behavior. Remove speculative abstractions and unrelated
   cleanup.
8. Report the current and target states, recommended design, alternatives and
   tradeoffs, implementation sequence, validation strategy, unresolved decisions,
   and residual risk.
9. If verified evidence indicates a recurring defect in the reusable design method,
   routing, or guidance rather than this design alone, hand the signal to
   `kf-learn-from-evidence`; do not revise guidance within this workflow.

## Implementation handoff

When implementation is expected to follow, end with a compact contract containing:

- target state;
- accepted decisions;
- constraints and non-goals;
- observable acceptance evidence;
- unresolved assumptions or decisions; and
- affected boundaries.

This contract preserves decisions without turning the design into immutable
instructions. The execution workflow must revalidate material repository facts and
return here when drift or an unresolved decision would change the architecture.

## Constraints

- Do not edit production code, start implementation, or treat a plan request as
  authorization to mutate the repository. A requested design document is the only
  default write.
- Do not invent repository facts, requirements, scale assumptions, or future
  extensibility. Label unknowns and state how they can be resolved.
- Route unexplained current behavior to `kf-investigate-issue`. Route an authorized
  implementation to the applicable feature, bug, or refactor workflow.
- Keep planning proportional. A small reversible change needs less ceremony than
  a compatibility-sensitive, destructive, or cross-boundary migration.
- Do not claim implementation readiness while a decision that materially changes
  the design remains unresolved.
- A design does not authorize implementation and is not evidence that repository
  facts will remain unchanged.

The design is complete when its decisions, sequence, evidence, and remaining
uncertainty are explicit enough for implementation to proceed without repeating
the architectural investigation.
