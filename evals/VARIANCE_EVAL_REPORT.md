# K Fleet Variance Eval Report

Date: 2026-08-20

## Result

Three independent evaluators each assessed the same four high-risk prompts. They
received only the prompts and current `skills/*/SKILL.md` files, could not read
expected answers or earlier reports, and performed no repository mutation.

| Boundary | Independent agreement |
| --- | --- |
| Verification, repair, and re-verification | 3/3 |
| Material design drift | 3/3 |
| One-off environmental learning signal | 3/3 |
| Monorepo read-only delegation | 3/3 |

Across 12 observations, primary routing, method composition, phase ordering,
mutation ownership, stopping conditions, and persistence authority were consistent.
No observed variance justifies changing a skill or routing rule.

## Stable decisions

### Verification and repair

All evaluators selected:

```text
kf-verify-change
-> kf-fix-bug when the contract violation is demonstrated
-> fresh kf-verify-change against the original target
```

Each kept verification non-mutating, assigned the fix to the bug workflow, rejected
reuse of the first verdict, and stopped on readiness, an evidence-backed blocker,
a repeated unresolved failure, or a broader authority requirement. None composed
TDD without an explicit user or repository requirement.

### Material design drift

All evaluators began with `kf-implement-feature`, extracted and revalidated the
accepted contract, and returned to `kf-design-change` before production edits when
the changed persistence boundary materially affected architecture. Implementation
could resume only after the design decision was resolved and accepted.

### One-off learning signal

All evaluators selected `kf-learn-from-evidence` because evaluation was explicitly
requested, classified one database outage as insufficient evidence, and denied
guidance persistence. They treated multiple symptoms from the same outage as one
event rather than independent recurrence.

### Monorepo delegation

All evaluators selected `kf-maintain-guidance`, preserved audit-only mode, retained
root and cross-member analysis with the parent, and limited sub-agents to
non-overlapping read-only member audits. The parent retained scope, conflict
resolution, integration, every potential write, and readiness.

## Acceptable conditional variation

The runs differed only in how they described evidence-dependent fallback branches:

- unresolved billing acceptance may return to `kf-design-change`, while an unclear
  failure cause may first require `kf-investigate-issue`;
- the prompt strongly indicated material architecture drift, but evaluators still
  required repository evidence before treating that implication as fact;
- proven independent monorepo boundaries make delegation eligible, while actual
  use still depends on coordination cost being lower than direct parent work.

These differences preserve intended discretion and do not change ownership,
authority, or the successful path.

## Limits

- This eval samples three independent runs, not a statistical reliability claim
  across models, versions, or temperatures.
- Prompts were repeated exactly; paraphrase robustness and adversarially ambiguous
  mixed-intent requests require separate cases.
- The run evaluated decisions without executing product artifacts; execution
  evidence remains in `ARTIFACT_EVAL_REPORT.md`.
