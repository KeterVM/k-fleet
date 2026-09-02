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
AGENTS.md bootstrap
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
- **Supermemory:** supplies scoped source documents, facts, inferences, preferences,
  and terminal task episodes. Memory is evidence, not permission.
- **Workflow references:** provide the selected method without adding more
  always-visible skill descriptions.
- **SkillOpt-Sleep:** performs offline trajectory-driven optimization. A candidate
  becomes active only through the configured held-out gate and reversible adoption.

Current user instructions and current scoped repository files remain authoritative
when recalled memory conflicts with them. Project and worktree isolation is required.
Substantial work stops when the orchestrator or memory runtime is unavailable.

## Repository map

- `skills/kf-orchestrate-work/SKILL.md` is the only installable K Fleet entry point.
- `skills/kf-orchestrate-work/references/` contains conditional workflow, memory,
  delegation, feedback, and evolution contracts.
- `.codex/agents/kf-reviewer.toml` defines the optional read-only `kf_reviewer`. It supplies
  evidence but never owns mutation or readiness.
- `examples/fleet-ledger/` forward-tests the installed package on a runnable fixture.
- `evals/orchestrator-routing.jsonl` defines the current routing and control-plane
  corpus. Reports from the retired multi-skill architecture are historical evidence,
  not current behavior claims.
- `scripts/validate-repository-structure.mjs` checks packaging, installed copies,
  links, placeholders, and the companion agent.
- `scripts/validate-orchestrator-evals.mjs` lints the current orchestration corpus;
  it does not claim that prompts were executed.

## Runtime prerequisites

### Supermemory

Use the official Codex integration, which provides automatic prompt-time recall,
incremental capture, terminal flush, explicit memory operations, project scoping,
and support for a local Supermemory server:

```sh
npx codex-supermemory@latest install
npx codex-supermemory status
```

For a local backend:

```sh
npx supermemory local
export SUPERMEMORY_API_URL=http://localhost:6767
export SUPERMEMORY_ISOLATE_WORKTREES=true
```

Use the API key printed by the local server. Keep the server and model local when
repository data must not leave the machine. The hosted backend is also supported
when its data and access policy are acceptable.

References:

- [Supermemory local](https://supermemory.ai/docs/self-hosting/overview)
- [Supermemory Codex integration](https://supermemory.ai/docs/integrations/codex)
- [Memory operations and versioning](https://supermemory.ai/docs/recall/memory-operations)

### SkillOpt-Sleep

Skill evolution is an offline cycle, not an inference-time rewrite:

```sh
pip install skillopt
skillopt-sleep dry-run --project "$(pwd)" --source codex
skillopt-sleep run --project "$(pwd)" --source codex
skillopt-sleep status
```

Configure the live installed `kf-orchestrate-work` skill as the target, enable a
no-regression gate for protected invariants, and scope harvesting to the current
project. Review or redact harvested material before sending it to any remote model.
Automatic adoption is appropriate only when the target, gate, rollback artifact,
and protected invariants are preconfigured; otherwise keep adoption review-driven.

References:

- [Microsoft SkillOpt](https://github.com/microsoft/SkillOpt)
- [SkillOpt-Sleep](https://github.com/microsoft/SkillOpt/blob/main/docs/sleep/README.md)

## Installation

Install the single orchestration skill from a target repository:

```sh
bunx skills add KeterVM/k-fleet \
  --agent codex \
  --skill kf-orchestrate-work \
  --yes
```

The optional reviewer is a project-scoped Codex agent and is installed separately:

```sh
mkdir -p .codex/agents
curl -fsSL \
  https://raw.githubusercontent.com/KeterVM/k-fleet/main/.codex/agents/kf-reviewer.toml \
  -o .codex/agents/kf-reviewer.toml
```

Add a compact bootstrap to the target repository's `AGENTS.md`:

```md
Use `kf-orchestrate-work` for substantive repository work. Current user
instructions and scoped repository files override recalled memory. Keep memory
isolated to the active repository and worktree. Stop substantive work if the
orchestrator or configured memory backend is unavailable.
```

Restart Codex after installing skills, hooks, or agents so the new session discovers
them.

## Operation

The user describes the outcome normally. K Fleet performs this loop:

1. Resolve repository, worktree, working directory, authority, and stopping state.
2. Retrieve focused project context from Supermemory.
3. Select and load only the required workflow references.
4. Execute directly or delegate bounded evidence/work with non-overlapping writes.
5. Validate the integrated artifact and report a terminal state.
6. Save a compact, sanitized terminal episode for later retrieval and evolution.

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
cd examples/fleet-ledger && npm test
```

The structure and corpus validators are deterministic lint. They do not substitute
for forward behavioral evaluation with the installed Codex, Supermemory, and
SkillOpt runtimes.

## Design principles

- One catalog entry; progressive disclosure below it.
- Runtime state and evidence belong in memory, not always-loaded instructions.
- Repository files remain the inspectable source for current code and policy.
- Methods are selected by intent, not technology stack.
- Automation may be aggressive; promotion remains gated and reversible.
- Historical reports stay historical instead of being relabelled as evidence for a
  materially different architecture.

## License

K Fleet is licensed under Apache-2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
