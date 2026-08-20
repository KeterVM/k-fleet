---
name: kf-test-driven-change
description: Drive an already-scoped feature or bug fix through behavior-focused Red-Green-Refactor cycles. Use when the user requests TDD, test-first development, or red-green-refactor, or when repository guidance requires test-first work. Combine with the applicable feature or bug workflow. Do not use for verification-only requests, retrospective test coverage, investigation, or non-code changes.
---

# Test-Driven Change

Apply test-driven development as a composable implementation method. The active
feature or bug workflow owns the target behavior, scope, compatibility, and
authorization; this skill owns test-first sequencing and evidence.

## Entry gate

Before changing production behavior:

1. State the smallest observable behavior to add or correct, its acceptance source,
   and relevant constraints. Separate verified facts from assumptions.
   When the primary workflow follows an accepted design, derive this target from
   its revalidated acceptance evidence and constraints; do not use TDD to replace
   or silently redesign that contract.
2. Inspect applicable guidance, existing tests, public interfaces, and actual test
   commands. Run the narrow useful baseline and distinguish pre-existing failures.
3. Choose the most stable seam that can demonstrate the behavior. Infer it from
   repository evidence; ask the user only when the choice would create or
   materially change a public contract.
4. Split the change into vertical slices that each deliver one observable behavior.
   Do not write every imagined test before learning from the first cycle.

## Red-Green-Refactor cycle

For each slice:

1. **Red:** Write one focused behavior test using an expectation derived from the
   request, specification, or an independent worked example.
2. Run the focused test before editing production behavior. Confirm that it fails
   because the intended behavior is missing or defective. A syntax error, broken
   fixture, missing dependency, or unrelated failure is not valid Red evidence.
3. If the test passes immediately, stop and determine whether the behavior already
   exists, the assertion is insensitive, or the requested contract is different.
4. **Green:** Implement only the production change needed for the focused test to
   pass. Do not anticipate later slices or add speculative abstractions.
5. Run the focused test and inspect the complete result. Do not weaken the
   assertion, suppress an error, or change the expected behavior merely to obtain
   Green.
6. **Refactor:** Improve the new code and test while keeping the focused checks
   green. Route a larger behavior-preserving restructuring through
   `kf-refactor-code` instead of hiding it inside the cycle.
7. Repeat with the next smallest behavior slice, then run proportionate broader
   validation after all slices are green.

## Test quality

- Test through a stable observable boundary whenever practical. Avoid assertions
  coupled only to private structure, call order, or incidental implementation.
- Keep expected values independent from the production algorithm; a test that
  recomputes the result the same way can pass by construction.
- Prefer real in-process collaborators. Use test doubles at unstable or
  uncontrollable boundaries when they make the behavior deterministic, and keep
  their contracts faithful to the real boundary.
- If no credible automated seam exists, establish behavior-preservation evidence
  before any preparatory refactor. Do not claim TDD when Red cannot be observed;
  report the limitation and the strongest available feedback loop.

## Feedback and completion

Treat every Red or Green result as feedback about both the code and the current
model of the problem. If repeated evidence contradicts the acceptance behavior,
test seam, or design, pause the cycle and return to the primary workflow or
`kf-design-change` instead of forcing the current test to pass. Do not silently
turn one difficult cycle into permanent repository guidance. When independent or
repeated evidence instead indicates a defect in the reusable method, routing, or
guidance, hand the signal to `kf-learn-from-evidence` for separate evaluation.

Report the behavior slices, focused Red and Green commands and outcomes,
refactoring performed, broader checks, pre-existing or unrun failures, and residual
risk. TDD is complete only when each implemented behavior has credible Red evidence
for the intended reason, Green evidence, and proportionate final validation.
