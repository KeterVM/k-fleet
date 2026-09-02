# Fleet Ledger

Fleet Ledger is a dependency-free example project used to exercise the single
K Fleet orchestrator across its conditional routes. It stores vehicles and trips
in memory, produces simple distance reports, and calculates distance-based
maintenance schedules.

## Commands

```sh
npm test
```

Install or refresh this example's project-scoped K Fleet skills from the repository
sources:

```sh
bunx skills add ../../skills --agent codex --skill kf-orchestrate-work --yes
bunx skills list --agent codex
```

The fixture also mirrors K Fleet's optional read-only reviewer under
`.codex/agents/`. It is maintained from the repository's canonical source rather
than by `bunx skills`.

The project requires Node.js 20 or newer and has no install step or external
dependencies.

`archive/v1/` preserves historical scenarios and reports from the retired
multi-skill architecture. New orchestration behavior is specified by the
repository-level `evals/orchestrator-routing.jsonl` corpus and requires fresh blind
runs before new quality claims are made.
