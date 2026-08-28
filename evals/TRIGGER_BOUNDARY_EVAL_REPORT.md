# K Fleet Trigger Boundary Eval Report

Date: 2026-08-28

Repository base: `4c477fe616ec8e3bf8498760814008678873d9fc` with the
working-tree Skill, corpus, and evaluation-tooling changes described below.

Skill source SHA-256: `9b1ba8f26023df757fdf9e17e76192e778a5c69134a829b240099fa208d4ef1b`

Eval corpus SHA-256: `3f0f3a7f0bc18a373fcdf5629fee03c5656bb0f2fe61f74b7a0b58e5027df8d0`

Blind input SHA-256: `da12aface73fcaa2d56b7dd9adc6d8090c04f6ff10abf9f039076881613a6a42`

Eval tooling SHA-256: `6750e95e095c4279e43dc69294a7615646d747a88c2960515635d828d1e3c5a7`

Raw observation SHA-256: `b58c26e4a099b83965bd1f1e0d91e904f377e932c1be9561360db91c56e76c1e`

Results SHA-256: `6e7b04270c80c36395199b9fa1cc9a928e0d5a7b9b529a676da6751b85129ab2`

Eval protocol version: `2`

Evaluator mode: independent, blind, read-only

## Scope

Two fresh sub-agent evaluators partitioned all 51 anonymous prompts and froze raw
routing, stopping, and rationale under a neutral field rubric. A third evaluator
repeated eight highest-risk transitions, and a separate read-only judge scored
hidden invariants without modifying the raw observations. All evaluators reported
no contamination or mutations. Their separate runs and judgments are recorded in
`current-results.json`.

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
- `verify-feature-reverify`;
- `verify-refactor-reverify`;
- `verify-design-decision-boundary`;
- `investigate-feature-verify`;
- `investigate-refactor-verify`;
- `coverage-feature-correction-reentry`;
- `verify-correction-blocked`;
- `learning-context-owner-resume`;
- `direct-authorized-policy`; and
- `learning-context-owner-unavailable`.

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
| Verification finds missing behavior | Pass | `kf-verify-change → kf-implement-feature → kf-verify-change` | Feature owns mutation and verification publishes a fresh verdict against the original target and accepted addition. |
| Verification finds structural debt | Pass | `kf-verify-change → kf-refactor-code → kf-verify-change` | Refactor owns behavior-preserving mutation and verification checks unaffected behavior again. |
| Investigation finds a new expectation | Pass | `kf-investigate-issue → kf-implement-feature → kf-verify-change` | Diagnosis precedes mutation, feature owns the addition, and verification closes against the accepted target. |
| Coverage discovers new behavior | Pass | `kf-add-test-coverage → kf-implement-feature → kf-add-test-coverage` | Coverage remains test-only and returns for a fresh result after feature completion. |
| Context owner resumes | Pass | `kf-learn-from-evidence → kf-maintain-context → kf-learn-from-evidence` | Learning preserves the exact contract, Context maintenance writes and verifies, and Learning closes the persistence contract. |
| Pure bounded specialist evidence | Pass | parent task + `kf-delegate-specialist` | No substantive K Fleet primary is invented; the parent validates and returns only the bounded evidence result. |
| Specialist unavailable or contradicted | Pass | substantive primary + conditional `kf-delegate-specialist` | The primary reports the unavailable or conflicting evidence, never fabricates expertise, and stops indeterminate when the gap blocks a defensible result. |

## Evidence limits

This was a decision-level routing and method-boundary evaluation, not an
implementation fixture. It demonstrates ownership and stopping decisions for TDD,
coverage correction, and delegation, but does not execute real cross-workflow
mutations or measure production diff complexity. Repository structure checks,
eval-corpus lint, and Fleet Ledger tests remain separate evidence.
