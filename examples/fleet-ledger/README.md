# Fleet Ledger

Fleet Ledger is a dependency-free example project used to exercise every K Fleet
workflow skill. It stores vehicles and trips in memory, produces simple distance
reports, and calculates distance-based maintenance schedules.

## Commands

```sh
npm test
```

Install or refresh this example's project-scoped K Fleet skills from the repository
sources:

```sh
bunx skills add ../../skills --agent codex --skill '*' --yes
bunx skills list --agent codex
```

The project requires Node.js 20 or newer and has no install step or external
dependencies.

See `SCENARIOS.md` and `TEST_REPORT.md` for the initial exercise. The maintenance
feature rerun is documented in `MAINTENANCE_SCENARIOS.md` and
`MAINTENANCE_TEST_REPORT.md`. `SPECIALIST_SCENARIO.md` exercises the bounded
specialist-delegation workflow, with validation in `SPECIALIST_TEST_REPORT.md`.
