# K Fleet

[English](README.md) | [简体中文](README.zh-CN.md)

K Fleet is optimized specifically for Astra. Results with other models are not
guaranteed.

K Fleet provides six engineering methods and a user-triggered setup skill. The main
agent selects methods and owns the integrated result, guided by reminders in the
project's root `AGENTS.md`. External memory is optional; users and projects choose
the integration that fits their needs.

## Why K Fleet

K Fleet aims to make engineering judgment explicit throughout a task: understand
the real goal, choose a suitable approach, deliver usable behavior, and correct
mistakes using evidence. Generating plausible code is only part of that work.
An implementation can follow the wrong assumption, leave cooperating components
disconnected, or pass tests that miss the user's actual requirement.

The skills package reusable decision criteria for those problems: when to clarify
a requirement, when a design needs more thought, what evidence supports delivery,
and when to stop or change course. Keeping those methods in project-installed files
makes them inspectable and maintainable across tasks. Guidance is loaded as needed;
a small, understood fix can proceed directly without a full engineering ceremony.

For example, a request to add notifications may leave the delivery channel unclear.
Clarify it if that choice changes successful use, define who owns sending and retry
behavior, then implement and verify the relevant path. A passing test of the send
function does not establish that the application invokes it. If work repeatedly
misses that connection, investigate whether the method needs revision as well as
fixing the code. Each action should resolve a real uncertainty or delivery gap.

## Core ideas

Four complementary foundations guide the design. They operate at different levels
and do not imply a fixed workflow, skill count, or agent count.

| Foundation | How it guides work |
| --- | --- |
| **First principles** | Separate the goal, established facts, constraints, and assumptions. Derive the needed capabilities and check that they jointly serve the intended scenario, using relevant engineering knowledge and evidence. |
| **Methodology** | Choose an explicit method for the task and its conditions. Reuse sufficient requirements and design; select only the methods needed for the next decision. Following a method alone does not prove correctness. |
| **Control theory** | Compare observable results with the intended behavior, correct deviations, and define when to stop or change strategy. Useful evidence and corrective action form the feedback loop; repeated attempts alone do not guarantee convergence. |
| **Double-loop learning** | Distinguish fixing an implementation from revising the assumptions, methods, or evaluation criteria that produced it. Propose such revisions when evidence warrants them, within existing authorization and maintenance boundaries. |

These ideas shape ownership and continuity as well as individual decisions. The main
agent retains responsibility for integration and completion across methods, carrying
authorized work through relevant checks and corrections. Optional memory integrations
supply scoped context and experience; current instructions and repository sources remain authoritative.
Learning does not grant permission to change user goals or silently rewrite skills.

The intended value is better decisions and completed outcomes with proportionate
effort. That value must be demonstrated in actual work; installing the package,
following its steps, or shortening its instructions is not proof of improvement.

## Skills

| Skill | Responsibility |
| --- | --- |
| `kf-setup` | On explicit request, initialize or refresh root `AGENTS.md` reminders |
| `kf-define-requirements` | Intended behavior, scope, and acceptance criteria |
| `kf-design-codebase` | Resolve open responsibility, interface, or structural decisions with proportionate complexity |
| `kf-implement` | Complete integrated changes, disciplined reuse, and evidence-based design corrections |
| `kf-write-tests` | Meaningful automated checks and regression protection |
| `kf-verify` | Functionality, related defects, regressions, and runtime problems |
| `kf-evolve-skills` | Assess or improve guidance on request, or address observed capability gaps and assess changes in use |

Each skill is self-contained. One agent can use several methods, skip unnecessary
steps, write tests first, or revisit a decision when evidence changes. Codebase
design favors the simplest structure that meets current needs.

When work exposes a reusable capability gap, `kf-evolve-skills` checks existing
guidance, uses `find-skills` for discovery and `skill-creator` for authoring when
available, then assesses the guidance in actual work. It includes a fallback when
those helpers are absent. Authorized additions default to project scope; a failed
experiment can be revised or undone. Installation alone is not proof of improvement.

The optional [`kf_reviewer`](.codex/agents/kf-reviewer.toml) supplies an independent,
read-only review. Installation includes its configuration; invoking it is optional.
It reports findings while the coordinating agent retains correction and completion.
Skills do not require a separate agent each.

## Installation

Requires Node.js 20+. No external memory service is required.

From the target repository:

```sh
npx --yes k-fleet@latest install
```

Or install from this GitHub source:

```sh
npx --yes github:KeterVM/k-fleet install
```

The CLI installs the seven K Fleet skills under `.agents/skills/`,
records `skills-lock.json`, copies the reviewer into `.codex/agents/`, and
registers the project. Installation does not run setup or edit `AGENTS.md`.

**After installation, restart Codex and manually run setup once in each project:**

```text
/kf-setup
```

Setup writes an idempotent block in the target's `AGENTS.md`, preserving existing
guidance. Setup is never selected automatically; ordinary tasks use the methods
directly.

## Optional memory

Use K Fleet with the current conversation and repository sources alone, or add a
memory integration chosen for your project. Supermemory, a graph-based memory system,
and other backends are independent choices; K Fleet does not provide adapters or
require a particular storage or retrieval model.

## Usage

Describe the task normally or invoke a named skill. Authorization carries across
methods; analysis-only and review-only requests remain read-only. The agent
checks the requested behavior and reports actual results and remaining gaps.

The CLI defaults to the current project and also accepts explicit paths or
`--all` for registered projects:

```sh
npx k-fleet@latest install /absolute/path/to/api /absolute/path/to/web
npx k-fleet@latest update --all
npx k-fleet@latest status --all
npx k-fleet@latest list
```

With Bun, use `bunx k-fleet@latest update` (or add `--all` for all registered
projects). Specify `@latest` to avoid reusing a cached older CLI.

`register` and `unregister` maintain `~/.k-fleet/projects.json`. Installation
preserves existing current skills; updates refresh them. When retired
`kf-orchestrate-work`, `kf-design`, `kf-investigate`, or `skillopt-sleep` entries are present,
installation also refreshes the catalog, then removes those directories and lock
entries after replacements install successfully. Restart Codex after updates and
manually run `/kf-setup` to refresh old project reminders when needed.

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
