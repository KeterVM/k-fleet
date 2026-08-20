---
name: kf-add-test-coverage
description: Add or strengthen automated coverage for already-implemented intended behavior without changing production behavior. Use for retrospective tests, characterization coverage, or test-only regression protection when no product correction is requested. Do not claim TDD, fix defects, add new behavior, refactor production code, or perform verification-only review.
---

# Add Test Coverage

Protect already-existing intended behavior with a focused test-only change.

## Workflow

1. Establish the behavior to protect, its acceptance source, the test-only scope,
   and relevant compatibility constraints. Separate verified contracts from
   assumptions and current implementation details.
2. Inspect applicable guidance, existing tests, stable observable seams, canonical
   examples, and actual test commands. Run the narrow useful baseline and classify
   pre-existing failures before editing.
3. Derive expectations independently from the production algorithm. Prefer a
   specification, public contract, accepted example, or externally observable
   invariant over mirroring private implementation.
4. Add the smallest focused test and only the fixtures or test helpers it needs.
   Use stable public boundaries when practical and keep doubles faithful to real
   collaborators.
5. Run the focused test. An immediate pass is expected when protecting existing
   behavior; report it honestly and do not manufacture Red evidence or production
   edits merely to make the test fail first.
6. Run proportionate broader validation and inspect the final diff for production
   changes, weakened assertions, generated artifacts, unrelated formatting, and
   brittle coupling.
7. Classify a meaningful failure before proceeding:
   - correct an invalid expectation, fixture, or test helper within this workflow;
   - route a demonstrated existing-contract violation to `kf-fix-bug` without
     correcting production code here;
   - route a newly requested expectation to `kf-implement-feature`;
   - route an unclear cause or contract to `kf-investigate-issue`.
8. Report the behavior protected, acceptance source, tests added or changed,
   commands and results, coverage limits, discovered mismatches, and confirmation
   that production behavior was not modified.
9. If repeated evidence indicates a defect in this reusable method, routing, or
   guidance rather than the current tests alone, hand the signal to
   `kf-learn-from-evidence`.

## Constraints

- Do not modify production source, runtime configuration, schemas, dependencies,
  or generated product artifacts within this workflow.
- Do not claim TDD or Red-Green-Refactor for retrospective coverage. Use
  `kf-test-driven-change` only with a future feature or bug correction it actually
  drives test-first.
- Do not update snapshots or expected outputs merely to match the current result;
  establish the intended behavior independently first.
- Avoid tests coupled only to private structure, incidental call order, or a
  duplicate implementation of the production algorithm.
- Do not expand a focused request into broad coverage targets or opportunistic
  cleanup.
- If credible coverage requires a production seam or refactor, report the limit
  and route that separately rather than hiding production changes in a test-only
  diff.

This workflow is complete when the intended existing behavior has focused,
credible protection; relevant checks pass or are honestly classified; the diff is
test-only; and any product mismatch has a separate correction owner.
