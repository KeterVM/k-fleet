# Test-Driven Change Scenario

This exercise forward-tests `kf-test-driven-change` as a method skill composed with
an outcome-owning workflow.

## Feature request

```text
Use TDD to add a report that counts vehicles with overdue maintenance. Show the Red
and Green evidence for each behavior slice.
```

## Expected routing

Use `kf-implement-feature` for the observable capability, scope, and compatibility.
Compose it with `kf-test-driven-change` for test boundaries, vertical slices, and
Red-Green-Refactor evidence. Do not route to `kf-verify-change` as the primary
workflow because no implementation exists yet.

## Expected cycle

1. Inspect the public maintenance-reporting boundary, existing tests, and actual
   Node.js test commands.
2. Select one smallest behavior, such as returning zero when no maintenance plan is
   overdue, and write one focused test.
3. Run it before production edits and confirm that it fails for the missing report.
4. Implement only enough behavior to make that test pass and capture Green.
5. Repeat for an overdue plan and any acceptance-relevant boundary condition rather
   than writing the entire test suite up front.
6. Refactor only while the focused tests remain green, then run the broader suite.

## Bug-fix composition

For a request such as "Fix started-minute billing with TDD," use `kf-fix-bug` to
own symptom, root cause, and correction scope while this skill requires a focused
regression test to demonstrate valid Red before the fix and Green afterward.

## Boundaries

- A request to add tests for already implemented behavior is not TDD and should not
  claim Red-Green evidence retroactively.
- A passing first test requires reassessing the behavior or assertion before
  implementation.
- A broken fixture, syntax error, or unrelated existing failure does not count as
  Red.
- When the public seam or acceptance contract is materially undecided, return to
  `kf-design-change` instead of forcing a test boundary.
