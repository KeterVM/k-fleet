# Test Coverage Scenario

This exercise forward-tests `kf-add-test-coverage` against a retrospective,
test-only request.

## Request

Add focused tests for the already-implemented `FleetLedger.getVehicle` behavior:
a padded vehicle ID resolves the stored immutable vehicle, and an unknown ID
returns `null`. Do not modify production behavior and do not call the work TDD.

## Expected routing

Use `kf-add-test-coverage`. Do not route to `kf-test-driven-change`, because the
behavior already exists and an immediate pass is expected. Do not route to
`kf-verify-change`, because this request authorizes adding tests rather than only
reviewing an existing artifact.

## Acceptance source

The request explicitly supplies the intended public behavior. Tests should use the
public `FleetLedger` boundary and should not reproduce the private map or lookup
algorithm.

## Expected evidence

- Run the focused ledger baseline before editing.
- Add only focused tests and necessary test fixtures.
- Report that the new tests pass on their first run without claiming Red evidence.
- Run the full suite and inspect the final diff.
- Leave production source and behavior unchanged.

If the focused tests instead demonstrate a product mismatch, stop test-only work
and route correction to `kf-fix-bug`; do not repair production code inside this
workflow.
