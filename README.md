# K Fleet

K Fleet is a portable Codex workflow package: one orchestrator coordinates five
engineering methods, using Supermemory for scoped project context. Describe the
outcome normally; the agent selects the methods needed and owns the integrated
result.

## Skills

| Skill | Responsibility |
| --- | --- |
| `kf-orchestrate-work` | Scope, method selection, delegation, integration, and completion |
| `kf-define-requirements` | Intended behavior, scope, and acceptance criteria |
| `kf-design-codebase` | Directories, module contracts, dependencies, and consistency |
| `kf-implement` | Implementation under project code style and disciplined reuse |
| `kf-write-tests` | Meaningful automated checks and regression protection |
| `kf-verify` | Functionality, related defects, regressions, and runtime problems |

Each skill is self-contained. One agent can use several methods, skip unnecessary
steps, write tests first, or revisit a decision when evidence changes. Codebase
design favors the simplest structure that meets current needs.

The optional [`kf_reviewer`](.codex/agents/kf-reviewer.toml) supplies an independent,
read-only review. Installation includes its configuration; invoking it is optional.
It reports findings while the coordinating agent retains correction and completion.
Skills do not require a separate agent each.

## Installation

Requires Node.js 20+ and the official
[Supermemory Codex integration](https://supermemory.ai/docs/integrations/codex).
Install and configure that integration at user scope first:

```sh
npx codex-supermemory@latest install
npx codex-supermemory status
```

Hosted and [local Supermemory](https://supermemory.ai/docs/self-hosting/overview)
are supported. For a local backend, keep `SUPERMEMORY_DATA_DIR` fixed, configure
its API key and URL in `~/.codex/supermemory.json`, and set
`SUPERMEMORY_ISOLATE_WORKTREES=true` in the environment that starts Codex.
K Fleet requires connected, correctly scoped automatic recall and capture;
optional MCP transport is not required. Current instructions and repository files
override memory, which never grants permission or crosses project/worktree scope.

From the target repository:

```sh
npx --yes k-fleet install
```

Or install from this GitHub source:

```sh
npx --yes github:KeterVM/k-fleet install
```

The CLI installs the six skills and `skillopt-sleep` under `.agents/skills/`,
records `skills-lock.json`, copies the reviewer into `.codex/agents/`, and
registers the project. It prepares a shared SkillOpt checkout and merges its
configuration, backing up existing settings.

Restart Codex, then run:

```text
/kf-orchestrate-work setup
```

Setup checks Supermemory before writing an idempotent block in the target's
`AGENTS.md`, preserving existing guidance. If the required runtime is unavailable,
it stops without writing. It does not install or configure the memory backend.

## Usage

Describe the task normally or invoke a named skill. Authorization carries across
methods; analysis-only and review-only requests remain read-only. The agent
checks the requested behavior and reports actual results and remaining gaps.

The CLI defaults to the current project and also accepts explicit paths or
`--all` for registered projects:

```sh
npx k-fleet install /absolute/path/to/api /absolute/path/to/web
npx k-fleet update --all
npx k-fleet status --all
npx k-fleet list
```

`register` and `unregister` maintain `~/.k-fleet/projects.json`. Installation
preserves existing current skills; updates refresh them and the shared SkillOpt
checkout. When retired `kf-design` or `kf-investigate` entries are present,
installation also refreshes the catalog, then removes those directories and lock
entries after replacements install successfully. Restart Codex after updates.

[SkillOpt-Sleep](https://github.com/microsoft/SkillOpt/blob/main/docs/sleep/README.md)
can optimize an explicitly selected **non-`kf-*`** skill. From its target project:

```sh
npx k-fleet configure --target-skill-path .agents/skills/my-skill/SKILL.md
npx k-fleet sleep dry-run -- --backend mock
```

The path must identify an existing non-K-Fleet skill inside each selected project.
Memory evolution and automatic adoption stay disabled; candidates require gated,
versioned, reversible review. K Fleet skills and references are excluded.
The CLI supports `status`, `harvest`, `dry-run`, `run`, and `unschedule`;
`adopt` and `schedule` are blocked because upstream does not preserve the
validated target boundary. Supermemory owns the complete memory lifecycle.

## Maintenance

Source lives in `skills/`, the reviewer in `.codex/agents/`, and the
zero-dependency CLI in `scripts/kf-projects.mjs`. See the
[maintainer guide](AGENTS.md), [method composition](docs/workflow-methods.md), and
[skill-authoring guidance](docs/skill-authoring.md) for contributor details.

This repository does not maintain test suites, evaluation corpora, or example
projects. Skill-quality claims must describe actual observed decisions and
outcomes; mechanical checks and historical results do not establish effectiveness
for changed instructions.

Licensed under [Apache-2.0](LICENSE). See [NOTICE](NOTICE).
