# K Fleet Trigger Boundary Eval Report

Date: 2026-08-27

Repository base: `251d6bd54357d73a7c9a92bdb7e373be4b6e21e0` with the
working-tree skill changes described below.

Skill source SHA-256: `9cc8336a873269749de51fcd8bdd6c07c72d9d46fa053b69532445cf8fdcda72`

Evaluator mode: independent, blind, read-only

## Scope

Three fresh sub-agent evaluators each received an isolated copy of the current eleven
Skill sources and raw prompts without harness expectations. They were instructed
not to inspect repository guidance, eval reports, Git history, or other agents.
All evaluators reported no contamination or mutations.

The run exercised these trigger and authority boundaries:

- `investigation-instrumentation-no-correction`;
- `coverage-mismatch-no-correction`;
- `design-then-implement`;
- `current-task-correction-no-learning`;
- `tdd-red-does-not-own-architecture`;
- `tdd-no-credible-seam`;
- `tdd-valid-production-abstraction`; and
- `tdd-test-conflicts-with-accepted-design`;
- `delegate-explicit-specialist`;
- `coverage-authorized-correction-reentry`; and
- `coverage-correction-blocked`.

Adjacent delegation cases also exercised a pure bounded-evidence request owned by
the parent task, unavailable specialist degradation, and conflicting specialist
evidence.

## Fresh results

| Case | Result | Selected sequence | Authority and stopping result |
| --- | --- | --- | --- |
| Investigation with optional instrumentation but no correction | Pass | `kf-investigate-issue` | Temporary diagnostics remain conditional and removable; no product correction is performed. |
| Retrospective coverage that exposes a product mismatch | Pass | `kf-add-test-coverage` | The mismatch is reported with `kf-fix-bug` as recommended owner; production code and correction workflows remain untouched. |
| Design first, then authorized implementation and internal validation | Pass | `kf-design-change → kf-implement-feature` | Design emits the contract; implementation owns mutation and validates its observable output without invoking independent verification. |
| Current-task result correction | Pass | `kf-implement-feature` | Feedback remains in the active feature workflow; Learning and bug routing are not invoked. |
| First Red prefers a private helper and new repository interface | Pass | `kf-implement-feature + kf-test-driven-change` | Red uses the existing billing-service boundary or a test-side harness; the test does not authorize a public API, directory, interface, or abstraction. |
| Known bug has no credible automated seam | Pass | `kf-fix-bug + kf-test-driven-change` at the seam gate | The evaluator rejects a test-only dependency-injection layer, reports that TDD cannot be demonstrated, and uses the strongest available feedback loop without claiming false Red evidence. |
| Accepted design and repeated repository evidence require an adapter | Pass | `kf-implement-feature + kf-test-driven-change` | The adapter remains valid because non-test evidence requires it; the guardrail does not become a blanket ban on abstractions. |
| First Red conflicts with the accepted production boundary | Pass | `kf-implement-feature + kf-test-driven-change` | The invalid test is replaced with one observing the accepted service boundary, or the TDD loop stops if no credible seam exists; production is not reshaped to satisfy the test. |
| Explicit specialist review of an existing migration plan | Pass | `kf-verify-change → kf-delegate-specialist → kf-verify-change` | Verification owns the artifact verdict and reconciles advisory specialist evidence; delegation remains a read-only method. |
| Authorized correction discovered during retrospective coverage | Pass | `kf-add-test-coverage → kf-fix-bug → kf-add-test-coverage` | Coverage owns test-only changes, the bug workflow owns production correction, and coverage reruns its original focused and broader checks before a fresh completion. |
| Authorized correction is blocked | Pass | `kf-add-test-coverage → kf-fix-bug` | No repair or fresh coverage success is claimed; the original coverage request stops incomplete without broader authority. |
| Pure bounded specialist evidence | Pass | parent task + `kf-delegate-specialist` | No substantive K Fleet primary is invented; the parent validates and returns only the bounded evidence result. |
| Specialist unavailable or contradicted | Pass | substantive primary + conditional `kf-delegate-specialist` | The primary reports the unavailable or conflicting evidence, never fabricates expertise, and stops indeterminate when the gap blocks a defensible result. |

## Evidence limits

This was a decision-level routing and method-boundary evaluation, not an
implementation fixture. It demonstrates ownership and stopping decisions for TDD,
coverage correction, and delegation, but does not execute real cross-workflow
mutations or measure production diff complexity. Repository structure checks,
eval-corpus lint, and Fleet Ledger tests remain separate evidence.
