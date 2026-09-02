# K Fleet Artifact Eval Report

Date: 2026-08-20

## Result

Three independent evaluators executed realistic tasks in separate temporary Git
copies of `examples/fleet-ledger`. Each evaluator received only its task, the
relevant K Fleet skill files, and the isolated project's guidance and artifacts.
They did not receive expected results or modify the K Fleet source repository.

| Exercise | Workflow evidence | Artifact result |
| --- | --- | --- |
| Feature with TDD | `kf-implement-feature` composed with `kf-test-driven-change`; three focused Red-Green slices | 18/18 tests pass; only reporting source and tests changed |
| Verify, repair, re-verify | `kf-verify-change -> kf-fix-bug -> kf-verify-change` | Initial 14/15 and not ready; one-line root fix; final 15/15 and ready |
| Material design drift | `kf-implement-feature -> kf-design-change` return gate | 15/15 baseline remains green; no file changed |

All three exercises passed parent-level artifact and test verification. No result
justifies changing a K Fleet skill or durable routing rule.

## Feature and TDD

The evaluator implemented a pure `exportTripSummaryCsv(trips)` reporting function.
The requested contract required an exact header, normalized grouping, summed
distance, sorted rows, an empty-list result, and `TypeError` for non-array input.

Evidence:

- focused reporting baseline: 4/4 pass;
- Red 1: missing public function failed the guarded non-array assertion;
- Green 1: non-array boundary passed;
- Red and Green 2: empty-list header behavior;
- Red and Green 3: normalized grouping, summing, and sorting;
- combined focused result: 3/3 new cases pass;
- final repository result: 18/18 pass;
- `git diff --check`: pass;
- changed artifacts: `src/reporting.js` and `test/reporting.test.js` only.

Parent inspection confirmed the implementation was a focused pure function,
preserved immutable inputs used by the test, and introduced no dependency or
unrelated refactor.

## Verification and repair loop

The isolated fixture deliberately used floor rounding for partial minutes while
retaining the existing 61-second regression.

Evidence:

- initial focused verification: 4/5 pass, with actual `1` versus expected `2`;
- initial readiness: **not ready**;
- correction owner: `kf-fix-bug`;
- production correction: `Math.floor` to `Math.ceil` in one line;
- corrected focused result: 5/5 pass;
- fresh full verification: 15/15 pass;
- boundary probe: 1 second → 1, 60 → 1, 61 → 2, 120 → 2;
- final readiness: **ready**;
- final diff: one production line and no unrelated artifact.

The verifier reported before correction, did not mutate while operating as the
verification workflow, and produced a new verdict from the corrected artifact.

## Design drift gate

The accepted design assumed that `FleetLedger` remained the persistence
orchestration boundary and instructed it to call a new storage adapter directly.
The isolated repository then adopted `src/persistence.js` as its canonical
repository boundary and explicitly prohibited direct adapter calls from
`FleetLedger`.

The evaluator extracted the accepted contract, verified the later repository
change and applicable guidance, classified the architecture assumption as
materially stale, and returned the task to `kf-design-change`. It made no edit,
left the worktree clean, and retained a 15/15 passing baseline.

## Limits

- The CSV request did not define escaping for commas, quotes, or line breaks, or
  malformed trip-record handling. The evaluator reported those unknowns and did
  not add speculative behavior; this run does not validate those cases.
- The repair fixture was a focused arithmetic regression, not a distributed or
  intermittent failure.
- The drift exercise validates stopping and return ownership, not the quality of a
  future replacement persistence design.
- Temporary execution copies are not repository fixtures. The committed report
  records outcomes; repeat runs should recreate isolated copies from the current
  example baseline.
