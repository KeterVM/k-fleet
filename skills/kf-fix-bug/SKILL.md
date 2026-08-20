---
name: kf-fix-bug
description: Diagnose and correct a known defect, including a root-cause change and regression validation. Use when the user wants broken behavior fixed. Use kf-investigate-issue instead when the request is only to understand an unclear symptom or cause.
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
5. Implement the smallest root-cause fix that follows repository conventions.
6. Add or update focused regression coverage when practical and proportionate.
7. Run targeted validation, then broader checks only when risk or repository
   practice justifies them.
8. Inspect failures and the final diff. Fix failures caused by the change; disclose
   unrelated or unrun checks.

## Constraints

- Do not begin with a refactor unless it is necessary to make the correction safe.
- Do not suppress exceptions, weaken assertions, disable checks, or patch output
  merely to hide the symptom.
- Avoid unrelated cleanup, dependency additions, and behavior changes.
- If reproduction is impossible, state the evidence, diagnosis, confidence, and
  residual uncertainty rather than claiming certainty.

Unlike `kf-investigate-issue`, this skill includes implementing and validating the
correction.
