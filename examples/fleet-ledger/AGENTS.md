# Fleet Ledger Repository Guide

## Repository map

- `src/fleet-ledger.js` owns domain records and the in-memory vehicle/trip ledger.
- `src/reporting.js` contains calculations over ledger records.
- `src/maintenance.js` contains maintenance plans and due-service calculations.
- `src/validation.js` contains shared boundary validation.
- `test/*.test.js` uses the Node.js built-in test runner.
- `.agents/skills/` contains project-scoped K Fleet skills installed for Codex.
- `skills-lock.json` records the local K Fleet source for those installations.
- `SCENARIOS.md` records the seven K Fleet behavioral exercises.
- `TEST_REPORT.md` records the initial seven-skill exercise results.
- `MAINTENANCE_SCENARIOS.md` records the second seven-skill exercise.
- `MAINTENANCE_TEST_REPORT.md` records its verified results.
- `SPECIALIST_SCENARIO.md` tests bounded specialist-delegation routing.
- `SPECIALIST_TEST_REPORT.md` records the eighth skill's validation results.

## Development commands

- Run all tests: `npm test`
- Run one test file: `node --test test/<name>.test.js`
- Refresh local skills: `bunx skills add ../../skills --agent codex --skill '*' --yes`
- List local skills: `bunx skills list --agent codex`

## Architecture and conventions

- Keep domain records as plain immutable objects returned from factory functions.
- Validate external input at factory or public method boundaries.
- Throw `TypeError` for invalid value types or ranges and `Error` for conflicts.
- Keep reporting calculations as pure functions.
- Add focused regression coverage for corrected defects.

## Canonical examples

- Follow `createVehicle` in `src/fleet-ledger.js` for record validation.
- Follow `summarizeDistance` in `src/reporting.js` for pure reporting functions.
- Follow `createMaintenancePlan` in `src/maintenance.js` for maintenance records.
- Follow `test/fleet-ledger.test.js` for behavior and error assertions.

## Validation

Run `npm test` and inspect changed files before completion.
