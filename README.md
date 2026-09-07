# K Fleet

K Fleet provides six portable Codex skills: one orchestrator and five focused
engineering methods. It retrieves scoped project context through Supermemory,
loads only the applicable method, and keeps validation and completion tied to the
requested outcome. SkillOpt evolution is limited to explicitly selected non-K-Fleet
skills and remains subject to its validation and target boundaries.

Each skill owns its required instructions and local references; no method depends
on another skill's internal files.

## Architecture

| Skill | Responsibility |
| --- | --- |
| `kf-orchestrate-work` | Coordinate scope, method selection, delegation, integration, and completion |
| `kf-define-requirements` | Clarify intended behavior, scope, and acceptance criteria |
| `kf-design-codebase` | Design directories, module contracts, dependencies, and consistency without overengineering |
| `kf-implement` | Implement understood changes under project code style and disciplined reuse |
| `kf-write-tests` | Write meaningful automated checks and regression protection |
| `kf-verify` | Verify functionality and identify related defects, regressions, and runtime problems |

```text
AGENTS.md bootstrap via `/kf-orchestrate-work setup`
        |
        v
kf-orchestrate-work
        |-- Supermemory recall and terminal episodes
        |-- requirements / codebase design / implementation / tests / verification
        |-- optional bounded sub-agents
        |-- integrated validation and closure
        `-- SkillOpt-Sleep non-kf candidate -> held-out gate -> staged review
```

The control plane has four boundaries:

- **Orchestrator:** owns routing, authority, integration, validation, and task
  completion.
- **Supermemory:** owns scoped recall, automatic capture, explicit memory operations,
  versioning, forgetting, and inference review. Memory is evidence, not permission.
- **Method skills:** own requirements, codebase design, implementation, test writing, and verification.
  Each has a concise discovery description and loads its own details only as needed.
  One agent can use several methods; there is no required agent per skill.
- **SkillOpt-Sleep:** performs offline trajectory-driven optimization for explicitly
  selected non-`kf-*` skills. K Fleet skills and references are excluded.

Current user instructions and current scoped repository files remain authoritative
when recalled memory conflicts with them. Project and worktree isolation is required.
Substantial work stops when the orchestrator or Supermemory integration is unavailable.

### Skills and agents

Skills provide reusable methods; agents execute work. A single agent can use
several skills as needed. The catalog does not require six agents, a separate
agent per method, or a fixed sequence through every method. Test writing can
precede implementation, and verification can return work to an affected decision.

The optional `kf_reviewer` role is defined in
[kf-reviewer.toml](.codex/agents/kf-reviewer.toml). Use it for a fresh, bounded,
read-only review when independent scrutiny is requested or warranted. It reports
concrete findings and uncertainty; it does not fix code or decide whether the
whole task is complete. The coordinating agent owns corrections, integration,
and the final outcome. Using `kf-verify` in the same agent is useful verification,
but does not constitute independent review.

The CLI copies this reviewer configuration into each target project's
`.codex/agents/` during installation and update. Having the configuration installed
does not require invoking it on every task. K Fleet ships one named reviewer role;
other bounded implementation or investigation work can use ordinary sub-agents.

## Repository map

- `skills/kf-orchestrate-work/SKILL.md` coordinates scope, method selection,
  integration, and final completion. Its local references cover runtime, setup,
  guidance maintenance, delegation, feedback, and evolution.
- `skills/kf-define-requirements/SKILL.md` clarifies intended behavior and scope.
- `skills/kf-design-codebase/SKILL.md` designs module contracts, directory structure,
  dependencies, and consistency with complexity proportional to current needs.
- `skills/kf-implement/SKILL.md` delivers changes under project code style and
  disciplined reuse, preserving the accepted design.
- `skills/kf-write-tests/SKILL.md` writes meaningful automated checks and regressions.
- `skills/kf-verify/SKILL.md` verifies implemented functionality and identifies
  related defects, regressions, and runtime problems. Using it alone does not
  establish independent review.
- Each method includes its own runtime constraints and complete method.
  Direct invocation preserves source authority, scope, and read-only boundaries.
- `docs/skill-authoring.md` records the user-supplied prompt-writing reference and
  how the four engineering foundations should shape maintained instructions.
- `.codex/agents/kf-reviewer.toml` defines the optional read-only `kf_reviewer`. It supplies
  evidence but never owns mutation or readiness.
- `scripts/kf-projects.mjs` implements the zero-dependency installation and
  multi-project CLI exposed by `package.json`.
- [Workflow method composition](docs/workflow-methods.md) explains how the five
  methods are selected and combined without a mandatory phase sequence.

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
optional. K Fleet disables skill evolution until a non-`kf-*` target is explicitly
configured. From the target project, run:

```sh
npx k-fleet configure --target-skill-path .agents/skills/my-skill/SKILL.md
```

The target must exist and declare a non-`kf-*` skill name. Relative targets are
resolved and checked separately in each selected project. Configuration disables
memory evolution, multi-skill fan-out, and automatic adoption, and enables the
no-regression gate. Old default K Fleet targets are cleared by `configure`,
`install`, and `update`. SkillOpt must optimize only the named non-K-Fleet skill;
Supermemory retains the complete memory lifecycle. Scope harvesting to that project
and review or redact harvested material before sending it to any remote model.
K Fleet skills and their references are excluded from SkillOpt optimization.
The CLI rejects `adopt` and `schedule`: the current upstream adoption uses staging
destinations independently of the supplied target, and scheduling drops the target
argument. Candidates remain staged for review. Direct upstream commands bypass
K Fleet's CLI checks and must not be used to circumvent these restrictions.

References:

- [Microsoft SkillOpt](https://github.com/microsoft/SkillOpt)
- [SkillOpt-Sleep](https://github.com/microsoft/SkillOpt/blob/main/docs/sleep/README.md)

## Installation

Run the published package directly from a target repository; cloning K Fleet is
not required:

```sh
npx --yes k-fleet install
```

The GitHub source remains available as an explicit alternative:

```sh
npx --yes github:KeterVM/k-fleet install
```

`install` defaults to the current directory. It downloads a shared SkillOpt checkout
to `~/.k-fleet/SkillOpt` when one is not configured, safely merges the shared
SkillOpt settings, installs all six K Fleet skills and `skillopt-sleep` under the
project's `.agents/skills/` through the `skills` CLI, records them in
`skills-lock.json`, installs `kf_reviewer`, and registers the project.

Pass several directories to install them together:

```sh
npx --yes k-fleet install \
  /absolute/path/to/project-a \
  /absolute/path/to/project-b

npx --yes k-fleet update --all
npx --yes k-fleet status --all
npx --yes k-fleet sleep dry-run --all -- --backend mock
```

The project registry is `~/.k-fleet/projects.json`. Existing SkillOpt settings are
preserved and the previous `~/.skillopt-sleep/config.json` is backed up.
The zero-dependency implementation is `scripts/kf-projects.mjs`.
Use `register`, `unregister`, and `list` to maintain the project set. `install` and
`update` operate on the current directory, explicit project paths, or `--all`.
`update` also fast-forwards the shared SkillOpt checkout. `sleep` supports `status`,
`harvest`, `dry-run`, `run`, and `unschedule`, with supported additional
SkillOpt arguments placed after `--`. `adopt` and `schedule` are blocked until
upstream can preserve the validated target boundary. Installation skips existing
skills; update refreshes them without creating K Fleet skill backups.
Updates request all six named K Fleet skills, refreshing existing entries and
adding missing methods. After replacements install successfully, the CLI removes
retired `kf-design` and `kf-investigate` directories from `.agents/skills/`. An install
that detects these retired entries also refreshes the current catalog before
removing them; otherwise existing current skills are preserved. Unrelated skills
are not removed. Stale lock entries for the retired names are pruned after removal.
Updates refresh SkillOpt-Sleep from its Codex-specific source path to avoid
ambiguity with the same-named skills for other platforms in the upstream repository.

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
3. Select only the needed method skills and their local references. Small understood
   changes can go directly to implementation and its own checks.
4. Resolve design decisions for new capabilities, responsibilities, state, public
   contracts, and platform obligations. Reuse accepted decisions when still valid.
   Distinguish the goal, facts, constraints, and assumptions; identify affected
   invariants and validation before materially risky changes.
   Explain consequential tradeoffs when useful; routine edits do not require an
   engineering report or a fixed number of alternatives.
5. Execute directly or delegate bounded evidence/work with non-overlapping writes.
6. Validate the integrated artifact with evidence proportionate to the changed
   contract. Choose TDD when test-first feedback materially reduces uncertainty or
   regression risk at a stable behavior seam, and skip it when cheaper evidence is
   sufficient. Add tests only for meaningful behavior or regression risk; do not
   manufacture low-value tests for unconditional presentation or mechanical field
   wiring. After relevant checks pass, expand or repeat them only for new changes,
   failures, or unresolved risk.
7. Report a compact, sanitized terminal outcome for Supermemory's automatic capture
   and later evolution.

Explicit post-work feedback reporting is also routed through the orchestrator; it
is no longer a separate skill. Context maintenance and learning are runtime
responsibilities rather than catalog entries.

Authorization follows the requested outcome across investigation, implementation,
and validation. Route transitions do not require renewed approval; analysis-only
and review-only requests remain read-only. Writers check their own changes, while
independent review is used when requested or justified by risk. Passing tests rebut
a review finding only when they exercise its trigger and invariant.

## Evolution contract

SkillOpt may propose bounded edits only to an explicitly selected non-`kf-*` skill.
K Fleet skills and their references must remain unchanged by SkillOpt, even when
gates pass. K Fleet changes use the normal authorized source maintenance workflow.
Promotion must preserve these protected invariants:

- user authority is never expanded by memory, delegation, or benchmark output;
- memory never crosses the resolved repository/worktree scope;
- current scoped sources win over stale or inferred memory;
- inferred memories do not create policy;
- overlapping writes are not delegated;
- verification examines the integrated artifact;
- accepted changes are versioned and reversible;
- failed or missing gate results block adoption.

## Maintenance

Keep the catalog, method routing, internal references, installer, and documentation
consistent. This repository does not ship test suites, evaluation corpora, or
example projects. Mechanical checks do not demonstrate skill effectiveness;
quality claims must describe actual observed decisions and outcomes and their
limits. See [AGENTS.md](AGENTS.md) for the maintainer contract.

## Design principles

- Six distinct, self-contained skills; progressive disclosure within each.
- First principles clarify premises, methodology guides execution, feedback corrects
  results, and double-loop learning can justify proposed method revisions. These
  foundations do not prescribe the number of skills or agents.
- Runtime state and evidence belong in memory, not always-loaded instructions.
- Repository files remain the inspectable source for current code and policy.
- Methods are selected by intent, not technology stack.
- Smallest complete means minimal structure with explicit ownership and preserved
  invariants, not the fewest files or shortest patch.
- Automation may be aggressive; promotion remains gated and reversible.
- Historical claims in the changelog describe earlier versions, not proof of
  effectiveness for the current methods.

## License

K Fleet is licensed under Apache-2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
