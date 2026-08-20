---
name: kf-fix-bug
description: Diagnose and correct a known defect, including a root-cause change and regression validation. Use when the user reports existing behavior that violates an expected contract. Do not use merely to undo or revise Codex's changes from the current task in response to feedback; continue the active task instead. Use kf-investigate-issue when the request is only to understand an unclear symptom or cause.
---

# Fix Bug

Correct the root cause with the smallest safe change while preserving unaffected
behavior.

## Workflow

1. Identify the reported symptom, expected behavior, scope, and available evidence.
2. Reproduce the defect when practical, or establish the strongest observable
   proxy when the original environment is unavailable.
3. Trace the relevant execution and data paths. Compare nearby working paths and
   analogous implementations.
4. Form and test hypotheses until the evidence distinguishes root cause from
   downstream symptoms.
5. When the user or repository requires TDD, combine this workflow with
   `kf-test-driven-change`; this skill retains ownership of the symptom, root cause,
   and correction scope. Require the regression test to demonstrate valid Red
   before the production fix.
6. Add or update focused regression coverage when practical and proportionate.
7. Implement the smallest root-cause fix that follows repository conventions.
8. Run targeted validation, then broader checks only when risk or repository
   practice justifies them.
9. Inspect failures and the final diff. Fix failures caused by the change; disclose
   unrelated or unrun checks.

## Constraints

- Do not begin with a refactor unless it is necessary to make the correction safe.
- Treat feedback that asks Codex to undo or revise its current-task changes as a
  continuation of that task, not as a newly discovered product defect.
- Do not suppress exceptions, weaken assertions, disable checks, or patch output
  merely to hide the symptom.
- Avoid unrelated cleanup, dependency additions, and behavior changes.
- If reproduction is impossible, state the evidence, diagnosis, confidence, and
  residual uncertainty rather than claiming certainty.

Unlike `kf-investigate-issue`, this skill includes implementing and validating the
correction.
