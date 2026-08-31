# Fleet Ledger Repository Guide

## Repository map

- `src/fleet-ledger.js` owns domain records and the in-memory vehicle/trip ledger.
- `src/reporting.js` contains calculations over ledger records.
- `src/maintenance.js` contains maintenance plans and due-service calculations.
- `src/validation.js` contains shared boundary validation.
- `test/*.test.js` uses the Node.js built-in test runner.
- `.agents/skills/` contains project-scoped K Fleet skills installed for Codex.
- `skills-lock.json` records the local K Fleet source for those installations.
- `SCENARIOS.md` records the six original K Fleet behavioral exercises.
- `TEST_REPORT.md` records the initial six-skill exercise results.
- `MAINTENANCE_SCENARIOS.md` records the second six-skill exercise.
- `MAINTENANCE_TEST_REPORT.md` records its verified results.
- `GUIDANCE_MAINTENANCE_SCENARIO.md` tests maintenance of accumulated guidance.
- `GUIDANCE_MAINTENANCE_TEST_REPORT.md` records the seventh skill's validation results.
- `CONTEXT_MAINTENANCE_SCENARIO.md` tests current context initialization and discovery.
- `CONTEXT_MAINTENANCE_TEST_REPORT.md` records its independent validation results.
- `DESIGN_CHANGE_SCENARIO.md` tests implementation-ready design routing.
- `DESIGN_CHANGE_TEST_REPORT.md` records the eighth skill's validation results.
- `TDD_SCENARIO.md` tests composable test-driven implementation routing.
- `TDD_TEST_REPORT.md` records the ninth skill's validation results.
- `TEST_COVERAGE_SCENARIO.md` tests retrospective test-only routing.
- `TEST_COVERAGE_TEST_REPORT.md` records the tenth skill's validation results.

## Documentation

Canonical fixture documentation lives in this directory; this example has no
separate `docs/` directory. Keep general usage in `README.md`, workflow exercises
in the matching `*_SCENARIOS.md` file, and verified results in the matching
`*_TEST_REPORT.md` file. Add new exercise documentation beside those files unless
the project deliberately adopts a dedicated documentation directory.

If architecture, data-model, or convention guidance grows beyond a concise map,
move the verified detail into a focused document under `docs/` and add a short,
purpose-labelled link here. Do not expand this file into a project manual or create
empty documentation files in advance.

## K Fleet baseline contract

- Keep verified project paths, commands, architecture, and constraints in this
  file.
- Keep detailed project knowledge in `README.md` and the scenario/report files;
  link to it here instead of duplicating it.
- Keep reusable procedures in `.agents/skills/`, not as long workflows here.
- Treat `.agents/skills/` as generated installation output; update source skills in
  `../../skills/` and refresh them with the documented `bunx skills` command.
- Treat `.codex/agents/` as mirrored companion-agent output; update canonical
  definitions in `../../.codex/agents/` and keep the fixture copies identical.
- Add a new rule only when repeated repository evidence or an explicit maintainer
  correction supports it.

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
