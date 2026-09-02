# K Fleet Skill Scenarios

These exercises forward-test each K Fleet skill against one small project. They
test workflow decisions and concrete outcomes rather than matching skill wording.

## `kf-implement-feature`

**Prompt:** Add estimated fuel-cost reporting for a set of trips.

**Exercise:** Follow the existing pure `summarizeDistance` reporting pattern, add
`estimateFuelCost`, validate the new fuel-price boundary, and add focused tests.

**Evidence:** `test/reporting.test.js` covers the calculation and invalid input;
the targeted reporting suite passes.

## `kf-fix-bug`

**Prompt:** Fix duration billing so every started minute is counted.

**Exercise:** Add a 61-second regression case. It reproduced the defect with an
actual value of `1` and expected value of `2`. Change the root rounding operation
from floor to ceiling and rerun the focused suite.

**Evidence:** `test/fleet-ledger.test.js` retains the regression, and the focused
suite passes after the one-line root-cause fix.

## `kf-investigate-issue`

**Prompt:** Find out why adding a vehicle sometimes reports a duplicate.

**Facts:** Adding `van-2` after `van-1` succeeds. Adding ` van-1 ` is rejected as
`vehicle already exists: van-1`.

**Finding:** The behavior is input-dependent, not intermittent. `createVehicle`
trims identifiers before `FleetLedger` checks the map, so whitespace variants are
the same identifier. Confidence is high because direct reproduction matches the
executed path. No product code was changed. The next action is to clarify normalized
ID behavior at the caller boundary if users find it surprising.

## `kf-refactor-code`

**Prompt:** Remove duplicated positive-number validation without changing behavior.

**Exercise:** Establish an 8-test passing baseline, extract
`requirePositiveNumber` into `src/validation.js`, reuse it from domain and reporting
modules, update the repository map, and rerun the suite.

**Evidence:** The same 8 tests pass before and after; public functions, error types,
and messages remain unchanged.

## `kf-verify-change`

**Prompt:** Check the example project and run the right validation.

**Exercise:** Inspect all example files, run the complete project suite, validate
the six original K Fleet skills with Codex's installed validator, check skill directory and
frontmatter agreement, and scan documentation for broken local paths and
placeholders. Do not edit any artifact while verifying; classify and report any
failure, its evidence, and the workflow that should own correction.

**Evidence:** See `TEST_REPORT.md` for the checks, readiness result, and remaining
limits. Verification leaves correction to an execution workflow.

## `kf-learn-from-evidence`

**Prompt:** I changed the generated fuel-cost calculation to preserve intermediate precision.

**Prior agent version:**

```js
const liters = Math.round((distanceKm / efficiencyKmPerLiter) * 100) / 100;
return Math.round(liters * fuelPricePerLiter * 100) / 100;
```

**User version:**

```js
const liters = distanceKm / efficiencyKmPerLiter;
return Math.round(liters * fuelPricePerLiter * 100) / 100;
```

**Automatic signal:** The explicit rewrite plus its behavioral regression is
automatically evaluated after the current result is corrected; the user does not
need to invoke learning separately.

**Observed pattern:** Preserve precision through intermediate calculations and
round the final monetary result to cents.

**Why it appears reusable:** Premature rounding changes observable totals; the
17 km regression case produces `2.56` instead of `2.55` in the prior version.

**Recommended destination:** The project-level canonical regression in
`test/reporting.test.js`, not global guidance or a K Fleet skill.

**Suggested wording:** “Round only the final reported fuel cost; do not round
intermediate liters.”

**Decision:** Preserve the project regression, but do not create global or K Fleet
guidance. Confidence is medium because the correction is explicit and demonstrated,
but it remains one project-specific event.
