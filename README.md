# K Fleet

K Fleet is one portable Codex orchestration skill. It keeps a single entry point
in the skill catalog, retrieves project context through Supermemory, discloses
workflow procedures only when they are needed, and turns verified task experience
into validation-gated SkillOpt evolution.

The repository previously shipped eleven separately routed workflow skills. That
architecture was removed in the orchestration cutover: design, implementation,
debugging, investigation, refactoring, testing, verification, delegation, memory,
feedback, and evolution now live behind `kf-orchestrate-work` as conditional
references.

## Architecture

```text
AGENTS.md bootstrap via `/kf-orchestrate-work setup`
        |
        v
kf-orchestrate-work
        |-- Supermemory recall and terminal episodes
        |-- one selected workflow reference
        |-- optional bounded sub-agents
        |-- integrated validation and closure
        `-- SkillOpt-Sleep candidate -> held-out gate -> adoption/rollback
```

The control plane has four boundaries:

- **Orchestrator:** owns routing, authority, integration, validation, and task
  completion.
- **Supermemory:** owns scoped recall, automatic capture, explicit memory operations,
  versioning, forgetting, and inference review. Memory is evidence, not permission.
- **Workflow references:** provide the selected method without adding more
  always-visible skill descriptions.
- **SkillOpt-Sleep:** performs offline trajectory-driven optimization. A candidate
  becomes active only through the configured held-out gate and reversible adoption.

Current user instructions and current scoped repository files remain authoritative
when recalled memory conflicts with them. Project and worktree isolation is required.
Substantial work stops when the orchestrator or Supermemory integration is unavailable.

## Repository map

- `skills/kf-orchestrate-work/SKILL.md` is the only installable K Fleet entry point.
- `skills/kf-orchestrate-work/references/` contains setup plus conditional
  workflow, delegation, feedback, and evolution contracts. The shared Supermemory
  boundary stays in the entry point instead of a backend procedure reference.
- `.codex/agents/kf-reviewer.toml` defines the optional read-only `kf_reviewer`. It supplies
  evidence but never owns mutation or readiness.
- `examples/fleet-ledger/` forward-tests the installed package on a runnable fixture.
- `evals/orchestrator-routing.jsonl` defines the current routing and control-plane
  corpus. Reports from the retired multi-skill architecture are historical evidence,
  not current behavior claims.
- `evals/v2-release-forward-results.json` and its report preserve the bounded blind
  smoke evidence for the exact v2 release sources they name.
- `evals/test-value-forward-results.json` and its report contain the current paired,
  source-bound blind observations for risk-driven TDD selection and skipping.
- `scripts/validate-repository-structure.mjs` checks packaging, installed copies,
  links, placeholders, and the companion agent.
- `scripts/validate-orchestrator-evals.mjs` lints the current orchestration corpus;
  it does not claim that prompts were executed.
- `scripts/validate-v2-forward-results.mjs` protects the historical release bindings
  and rejects current targeted observations whose skill or corpus hashes are stale.

## Runtime prerequisites

### Supermemory

Install the official Codex integration once at user scope. It owns prompt-time
recall, incremental capture, terminal flush, project scoping, and every explicit
memory operation; K Fleet does not install a second memory client or ship fallback
memory skills:

```sh
npx codex-supermemory@latest install
npx codex-supermemory status
```

For a local backend:

```sh
export SUPERMEMORY_DATA_DIR="$HOME/.supermemory"
npx supermemory local
export SUPERMEMORY_ISOLATE_WORKTREES=true
```

Put the API key printed by the local server and
`"baseUrl": "http://127.0.0.1:6767"` in `~/.codex/supermemory.json`, or provide
the equivalent documented environment variables before starting Codex. Pin
`SUPERMEMORY_DATA_DIR`; otherwise starting the server from another directory creates
a separate store. Keep the server and model local when repository data must not
leave the machine. The hosted backend is also supported when its data and access
policy are acceptable.

K Fleet requires the integration's scoped automatic recall and capture, not its MCP
transport. Hosted MCP tools or future local explicit-operation surfaces remain
Supermemory features. If an explicitly requested memory operation is unavailable,
K Fleet reports that missing capability instead of bypassing the integration with
direct REST calls.

References:

- [Supermemory local](https://supermemory.ai/docs/self-hosting/overview)
- [Supermemory Codex integration](https://supermemory.ai/docs/integrations/codex)
- [Memory operations and versioning](https://supermemory.ai/docs/recall/memory-operations)

### SkillOpt-Sleep

Skill evolution is an offline cycle, not an inference-time rewrite. With a source
checkout, point the runner at that checkout; the project-scoped Codex skill is
installed separately in the installation flow below:

```sh
export SKILLOPT_SLEEP_REPO=/absolute/path/to/SkillOpt
bash "$SKILLOPT_SLEEP_REPO/plugins/run-sleep.sh" status --project "$(pwd)"
```

The runner can execute directly from the checkout; a separate package install is
optional. In `~/.skillopt-sleep/config.json`, set `"evolve_memory": false`, set
`"target_skill_path"` to the target project's installed
`.agents/skills/kf-orchestrate-work/SKILL.md`, enable `"gate_no_regression": true`,
and set `"transcript_source": "codex"`. SkillOpt must optimize only the named skill;
Supermemory retains the complete memory lifecycle. Scope harvesting to that project
and review or redact harvested material before sending it to any remote model.
Automatic adoption is appropriate only when the target, gate, rollback artifact,
and protected invariants are preconfigured; otherwise keep adoption review-driven.

References:

- [Microsoft SkillOpt](https://github.com/microsoft/SkillOpt)
- [SkillOpt-Sleep](https://github.com/microsoft/SkillOpt/blob/main/docs/sleep/README.md)

## Installation

Install the orchestration and offline-evolution skills from the target repository:

```sh
bunx skills add KeterVM/k-fleet \
  --agent codex \
  --skill kf-orchestrate-work \
  --yes

bunx skills add \
  https://github.com/microsoft/SkillOpt/tree/main/plugins/codex/skills \
  --agent codex \
  --skill skillopt-sleep \
  --yes
```

Both skills are installed under `.agents/skills/` and recorded in
`skills-lock.json`. Keep the SkillOpt URL scoped to `plugins/codex/skills`;
installing from the repository root can select a same-named integration for a
different agent.

The optional reviewer is a project-scoped Codex agent and is installed separately:

```sh
mkdir -p .codex/agents
curl -fsSL \
  https://raw.githubusercontent.com/KeterVM/k-fleet/main/.codex/agents/kf-reviewer.toml \
  -o .codex/agents/kf-reviewer.toml
```

Restart Codex after installing skills, hooks, or agents so the new session discovers
them.

Then run this from the target repository root:

```text
/kf-orchestrate-work setup
```

Setup creates or updates one marked K Fleet block in the root `AGENTS.md`. It is
idempotent, preserves existing project rules and managed learning blocks, and
first verifies that Supermemory is installed, connected, and scoped to that
repository/worktree. If the runtime is unavailable, setup makes no project changes,
directs the user to install or configure the official integration, and stops until
Codex is restarted and setup is rerun. It never installs the memory backend or
changes global configuration implicitly.

## Operation

The user describes the outcome normally. K Fleet performs this loop:

1. Resolve repository, worktree, working directory, authority, and stopping state.
2. Retrieve focused project context from Supermemory.
3. Select and load only the required workflow references.
4. Establish proportional engineering reasoning before mutation: a decisive
   constraint for local edits, or a compact responsibility, flow, tradeoff, failure,
   and test contract for cross-boundary changes.
5. Execute directly or delegate bounded evidence/work with non-overlapping writes.
6. Validate the integrated artifact with evidence proportionate to the changed
   contract. Choose TDD when test-first feedback materially reduces uncertainty or
   regression risk at a stable behavior seam, and skip it when cheaper evidence is
   sufficient. Add tests only for meaningful behavior or regression risk; do not
   manufacture low-value tests for unconditional presentation or mechanical field
   wiring. Then report a terminal state.
7. Report a compact, sanitized terminal outcome for Supermemory's automatic capture
   and later evolution.

Explicit post-work feedback reporting is also routed through the orchestrator; it
is no longer a separate skill. Context maintenance and learning are runtime
responsibilities rather than catalog entries.

## Evolution contract

SkillOpt may propose bounded edits to the orchestrator or one named reference.
Promotion must preserve these protected invariants:

- user authority is never expanded by memory, delegation, or benchmark output;
- memory never crosses the resolved repository/worktree scope;
- current scoped sources win over stale or inferred memory;
- inferred memories do not create policy;
- overlapping writes are not delegated;
- verification examines the integrated artifact;
- accepted changes are versioned and reversible;
- failed or missing gate results block adoption.

The current eval corpus tests these boundaries through observable routing, methods,
stopping, and memory/evolution behavior. Fresh blind runs are required before making
new behavioral quality claims about the cutover architecture.

## Validation

Run:

```sh
node scripts/validate-repository-structure.mjs
node scripts/validate-orchestrator-evals.mjs
node scripts/validate-v2-forward-results.mjs
cd examples/fleet-ledger && npm test
```

The structure and corpus validators are deterministic lint. The v2 forward-results
validator protects the recorded release hashes and authenticates the current paired
test-value observations against current hashes; it does not re-execute Codex or
substitute for broader behavioral evaluation with the installed Codex, Supermemory,
and SkillOpt runtimes.

## Design principles

- One catalog entry; progressive disclosure below it.
- Runtime state and evidence belong in memory, not always-loaded instructions.
- Repository files remain the inspectable source for current code and policy.
- Methods are selected by intent, not technology stack.
- Smallest complete means minimal structure with explicit ownership and preserved
  invariants, not the fewest files or shortest patch.
- Automation may be aggressive; promotion remains gated and reversible.
- Historical reports stay historical instead of being relabelled as evidence for a
  materially different architecture.

## License

K Fleet is licensed under Apache-2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
