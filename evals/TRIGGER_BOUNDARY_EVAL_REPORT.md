# K Fleet Trigger Boundary Eval Report

Date: 2026-08-30

Repository base: `75eff05de514251121d9020b0be3edb75f532746`

Skill source SHA-256: `2027fbc26d821c0d75ee694a889c605db244a1afc69f7cdc4134e86c3a1d3926`

Eval corpus SHA-256: `0ecd71b80948ff435aae55ae59d8904f77dd148ce71f0382590857b2c0daa674`

Blind input SHA-256: `c0d0c34c8a938f70bcc711bf72fdcb844a12ad0ea4e4d07ba24b1718ef6c49ce`

Eval tooling SHA-256: `fe6645f5ab6246c42d6da016ecab16555cfa72e281f1c737dccb269e331b50a8`

Raw observation SHA-256: `35642d4b36d990d7905074de0e43519e412910d4f7d72291b50bc341ffe78f72`

Results SHA-256: `deffc7ef900e346c97d091b84e989772685fa83d4221da16884f32bbcd619363`

Eval protocol version: `2`

Evaluator mode: independent, blind, read-only

## Fresh evaluation

Two fresh `gpt-5.6-sol/high` blind evaluators produced 64 read-only observations across 54 cases. A separate `gpt-5.6-sol/xhigh` post-hoc judge passed all 179 invariants. Contaminated/superseded earlier runs were excluded; raw observations and judgments are preserved in `current-results.json`.

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
| `routine-work-no-delegation` | Routine work stays with the primary and does not incur unnecessary delegation. |
| `monorepo-read-only-delegation` | Monorepo evidence is delegated read-only with scope and ownership preserved. |

The broader corpus also confirms TDD, investigation, verification, correction re-entry, and unavailable/contradictory specialist stopping boundaries. This remains a decision-level routing evaluation, not evidence of production mutation or runtime integration.
