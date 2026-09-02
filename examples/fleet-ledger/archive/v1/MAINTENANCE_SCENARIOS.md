# Maintenance Feature Skill Scenarios

This second forward-test uses the six original project-installed K Fleet skills to add
distance-based maintenance scheduling to Fleet Ledger.

## `kf-implement-feature`

**Prompt:** Add distance-based maintenance plans and due-service reporting.

**Exercise:** Add immutable maintenance plans, status calculation, overdue listing,
input validation, focused tests, and the relevant repository-map entries without
changing the existing fleet or reporting APIs.

**Evidence:** `src/maintenance.js` and `test/maintenance.test.js` were the only new
code files. The initial targeted suite passed 4 of 4 tests.

## `kf-fix-bug`

**Prompt:** Fix maintenance so service is due at the exact scheduled odometer.

**Exercise:** Add a regression at 30,000 km for a plan whose next service is 30,000
km. The strict greater-than comparison reproduced `due: false` instead of `true`.
Change only the root comparison to greater-than-or-equal and rerun the focused
suite.

**Evidence:** The regression failed before the fix and the 5-test maintenance suite
passed afterward.

## `kf-investigate-issue`

**Prompt:** Find out why an odometer entry keyed as ` van-1 ` is rejected.

**Facts:** A maintenance plan created with ` van-1 ` stores the normalized ID
`van-1`. An odometer object keyed by `van-1` succeeds, while one keyed by
` van-1 ` fails with `current odometer must be a non-negative number`.

**Finding:** Object keys are looked up literally after the plan ID has been
normalized. The whitespace-padded key returns `undefined`, which numeric validation
rejects. Confidence is high because both cases were executed through the same code
path. No product code was changed. The next action is to require normalized
odometer keys or introduce an explicitly requested normalized input adapter.

## `kf-refactor-code`

**Prompt:** Remove duplicated ID normalization without changing behavior.

**Exercise:** Establish a passing 14-test baseline, move `normalizeId` into the
existing shared validation module, reuse it from fleet and maintenance modules,
and rerun all tests.

**Evidence:** The same 14 tests passed before and after. Public APIs, returned data,
error types, and error messages were preserved.

## `kf-learn-from-evidence`

**Prompt:** I changed equal-overdue maintenance results to sort by vehicle ID.

**Prior behavior:** Equal-overdue results retained input order, producing
`['van-b', 'van-a']`.

**User behavior:** Equal-overdue results use normalized vehicle ID as a secondary
sort key, producing `['van-a', 'van-b']`.

**Automatic signal:** The explicit behavior rewrite and failing regression trigger
evidence assessment without a separate learning request.

**Observed pattern:** Give maintenance output a deterministic secondary order when
the primary overdue distance is equal.

**Why it appears reusable:** Stable output prevents caller input order from
changing reports and was demonstrated by a failing behavioral test.

**Recommended destination:** The project regression in `test/maintenance.test.js`,
not global guidance or a K Fleet skill.

**Suggested wording:** “Sort due maintenance by overdue distance descending, then
normalized vehicle ID ascending.”

**Decision:** Keep the project regression without creating a global or K Fleet
rule. Confidence is medium because the behavior is explicit and verified, but it
remains one project-domain event.

## `kf-verify-change`

**Prompt:** Verify the maintenance feature and all installed K Fleet skills.

**Exercise:** Run the complete example suite; validate source and installed skill
copies; compare installed skills with their sources; and check frontmatter, local
links, placeholders, documentation, and the final file inventory.

**Evidence:** See `MAINTENANCE_TEST_REPORT.md`.
