# K Fleet Trigger Boundary Eval Report

Date: 2026-08-31

Repository base: `d16d101698d8539b49de4ec45b1c5c5b34ca64ae`

Skill source SHA-256: `266adc0010adc8e7a1a11a9fcb0858f5b2c746eac9e4e7ea8872aaa6bba956da`

Eval corpus SHA-256: `5e5c2b6ab0ea91c7c31d7da668baf78b47c1eeb5766ac294f2e490ef1f1ad1c3`

Blind input SHA-256: `5bd38ec47179d109698bbb4bfb36c5f07d3f39d44c32815f500c2df8051493fa`

Eval tooling SHA-256: `1f3c1d5c9eefa82184df6940126ab6503299a7b3dfddb89ba0c94d509f6150b2`

Raw observation SHA-256: `22b95c0c6ac2e86bd72a45f244116135eb662c828c11f921b960d7bf2b25c5e8`

Results SHA-256: `cdbec6d0a95c6c1f36b3e8be7dad56a762928ce13807369a0938cb63f04c1010`

Eval protocol version: `2`

Evaluator mode: independent, blind, read-only

## Fresh evaluation

Two fresh `gpt-5.6-sol/xhigh` blind evaluators produced 68 read-only observations across 56 cases. A separate `gpt-5.6-sol/xhigh` post-hoc judge passed all 187 invariants. Contaminated and superseded diagnostic runs were excluded; raw observations and judgments are preserved in `current-results.json`.

The required trigger boundaries all pass:

| Case ID | Outcome |
| --- | --- |
| `investigation-instrumentation-no-correction` | Investigation may use scoped temporary instrumentation, but stops without product correction. |
| `coverage-mismatch-no-correction` | Coverage remains test-only and reports a mismatch to `kf-fix-bug`; it does not correct production. |
| `design-then-implement` | Design emits the implementation-ready contract; authorized implementation owns mutation and validation. |
| `current-task-correction-no-learning` | Current workflow corrects its own result; Learning is not invoked for ordinary task feedback. |
| `delegate-hard-review-quality-first` | Hard review delegates to a quality-first capable reviewer; parent retains integration and read-only ownership. |
| `delegate-efficient-worker-then-review` | Stable bounded work uses an efficient worker, followed by quality review before closeout. |
| `delegate-read-parallel-write-serial` | Read-only exploration may be parallel; writes are serialized under exclusive ownership. |
| `delegate-explicit-specialist` | Explicit specialist request composes bounded expertise; substantive primary retains the outcome. |
| `delegate-configured-kf-reviewer-evidence-only` | The configured reviewer remains a read-only evidence provider; verification retains the readiness verdict. |
| `delegate-configured-context-auditor-evidence-only` | The configured Context auditor remains read-only; Context maintenance reconciles evidence and owns the result. |
| `routine-work-no-delegation` | Routine work stays with the primary and does not incur unnecessary delegation. |
| `monorepo-read-only-delegation` | Monorepo evidence is delegated read-only with scope and ownership preserved. |

The broader corpus also confirms TDD, investigation, verification, correction re-entry, and unavailable/contradictory specialist stopping boundaries. This remains a decision-level routing evaluation, not evidence of production mutation or runtime integration.
