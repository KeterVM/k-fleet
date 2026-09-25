# K Fleet

[English](README.md) | [简体中文](README.zh-CN.md)

K Fleet provides Codex skills for product discovery, experience design, software
delivery, release, operation, and evaluation. Each skill contains focused instructions
and supporting references. Use the methods that fit the task.

The CLI installs and updates these files across projects. Optional project reminders
are managed by an explicit `kf-setup` request. External memory is not required.

## Why K Fleet

Working code alone does not establish a useful product. Requirements can be unclear,
users can struggle to finish a task, and successful tests can miss integration or
release problems. K Fleet provides methods for examining these decisions and the
evidence needed to complete the work.

K Fleet gives the agent methods for these problems:

- Make unclear requirements clear.
- Investigate product value and design how users complete their tasks.
- Prepare a design for complex changes.
- Do tests to make sure that the feature operates correctly.
- Release the product, support its operation, and assess actual user outcomes.
- If the same errors occur again, examine the work method.

For a simple change, use only the necessary methods. Following a skill's instructions
does not by itself prove that the result is correct or valuable.

## Core ideas

Four ideas are the basis of K Fleet.
They apply to different parts of engineering work.

| Idea | How to use the idea |
| --- | --- |
| **First principles** | Identify the necessary result, facts, limits, and assumptions. Make sure that the design includes all necessary functions and that these functions operate together. Use applicable engineering knowledge and test results. |
| **Methodology** | Select a method that is applicable to the task. Use available requirements and designs when they are sufficient. The result can be incorrect after the agent completes the procedure. |
| **Control theory** | Compare actual results with the necessary results. Correct the differences. Identify when to stop or change the method. The same procedure can cause the same error again. |
| **Double-loop learning** | Find the cause of the error in the code, assumptions, method, or assessment criteria. Use facts and test results before you change the method. Obey the limits of the task approval. |

Use current project instructions and source files if other context gives different information.
A change to a method does not give permission to change user requirements or skills.

Use decisions and results from actual tasks to examine skill quality.

## Skills

| Skill | Task |
| --- | --- |
| `kf-setup` | Add or replace root `AGENTS.md` reminders only when the user tells the agent to do setup. |
| `kf-discover-product` | Investigate uncertain user problems, alternatives, and product value before committing to a solution. |
| `kf-define-requirements` | Make the intended behavior, scope, and acceptance criteria clear. |
| `kf-design-experience` | Design user journeys, interactions, content, and presentation; distinguish inspection from observed usability. |
| `kf-design-codebase` | Design or assess code responsibilities, interfaces, structure, and mainstream library or framework choices. |
| `kf-implement` | Make complete code changes with clear responsibilities, names, placement, and dependencies. Reuse suitable code and correct design problems exposed during implementation. |
| `kf-write-tests` | Write useful automated tests and regression tests. |
| `kf-verify` | Verify delivery or review scoped code for defects, structural problems, and supported ecosystem reuse opportunities. |
| `kf-release-product` | Prepare or execute authorized delivery, including migration, recovery, and checks in the intended environment or channel. |
| `kf-operate-product` | Establish live operation, diagnose incidents, and verify recovery using service and user-impact evidence. |
| `kf-evaluate-product` | Assess whether the product delivers its intended benefit using trustworthy measurements and user feedback. |
| `kf-evolve-skills` | Examine skill instructions at the user's request or when a task identifies a method problem. Examine changes in actual work. |

Each skill has all the instructions and files necessary for its method.
Use only the necessary methods; tests can come before code.
New facts can make a different decision necessary.
Choose code structure that satisfies the required behavior and responsibility boundaries.

For general-purpose capabilities, default to suitable mainstream libraries and frameworks.
Design, implementation, and review compare affected custom mechanisms even when they
work without reported problems; retaining or adding them needs a concrete reason.
Reuse current selection evidence and resolve routine technical choices directly.
Reviews distinguish defects, supported improvements, and unverified leads; findings
do not authorize unrelated migrations. Test writing applies this policy to tooling.

Product discovery asks which problem is worth solving; requirements define the
agreed behavior. Experience design addresses how people use the product; codebase
design addresses how the code is organized. Verification, successful release, and
evidence of product value are different outcomes. Select these methods as needed.

Release and operation reuse existing authorization. A preparation or assessment
request does not itself permit production changes, publication, or user contact.
No particular design, analytics, or hosting tool is required. Use specialist skills
for tasks such as security assessment or platform-specific execution when needed.

The optional [`kf_reviewer`](.codex/agents/kf-reviewer.toml) agent examines the code independently.
This agent has read-only access.
Installation includes its configuration.
Its output is advisory findings and supporting evidence.

## Installation

Use Node.js 20 or later, with `npm` and `npx` available, plus Git and network access
to npm and GitHub. The CLI invokes `npx skills add` to install skill files; these
requirements also apply when starting K Fleet with Bun.

From the target repository, run this command:

```sh
npx --yes k-fleet@latest install
```

With Bun, the equivalent command is:

```sh
bunx k-fleet@latest install
```

To use the current GitHub source instead of the published npm CLI:

```sh
npx --yes github:KeterVM/k-fleet install
```

The command-line interface (CLI) does these tasks:

- It installs the public skills in `.agents/skills/`.
- It records the skills in `skills-lock.json`.
- It copies the reviewer configuration to `.codex/agents/`.
- It registers the project.

Installation does not start setup or change `AGENTS.md`.
The CLI version determines which skill names it requests. Skill contents come from
this repository's default branch, so pinning the CLI version does not pin the skills.
The reviewer configuration comes from the CLI package.

Codex [detects skill changes automatically](https://learn.chatgpt.com/docs/build-skills#create-a-skill).
If installed skills do not appear, restart Codex. To initialize project reminders,
explicitly request `kf-setup` in Codex; in the CLI or IDE, you can
[mention the skill](https://learn.chatgpt.com/docs/build-skills#how-chatgpt-and-codex-use-skills):

```text
$kf-setup
```

Setup adds or replaces its section in the project root `AGENTS.md` file.
It keeps other project instructions.
Setup does not add duplicate sections when you run it again.
Setup runs only when explicitly requested. It is not a prerequisite for using the
other skills and can be run again to refresh the managed reminders.

## Optional extensions

Use other skills and plugins when the project needs them. `kf-evolve-skills` checks
available guidance before proposing an addition or revision. When available, it can
use [`find-skills`](https://github.com/vercel-labs/skills/tree/main/skills/find-skills)
for discovery and [`skill-creator`](https://github.com/openai/skills/tree/main/skills/.system/skill-creator)
for authoring; neither is installed or required by K Fleet. Authorized additions
default to project scope, and effectiveness must be assessed through actual use.

External memory is optional and chosen by the project. K Fleet does not install,
configure, or operate memory integrations. Documents and other supporting tools
should serve a concrete task need.

## Operation

Give the agent a task or the name of a skill.
The agent keeps the same permission limits when it changes methods.
Analysis-only and review-only tasks stay read-only.
The agent gives you actual results and identifies remaining checks.

The CLI uses the current project unless you give other paths or `--all`.
The `--all` option applies to registered projects.

```sh
npx --yes k-fleet@latest install /absolute/path/to/api /absolute/path/to/web
npx --yes k-fleet@latest update --all
npx --yes k-fleet@latest status --all
npx --yes k-fleet@latest list
```

With Bun:

```sh
bunx k-fleet@latest update --all
```

| Command | Behavior |
| --- | --- |
| `install` | Add missing catalog skills, preserve existing current entries, copy the reviewer configuration, and register the project. |
| `update` | Refresh all skills in the running CLI's catalog, including missing entries, and refresh the reviewer configuration. |
| `status` | Check for expected files. This does not compare installed contents or versions with the source. |
| `list` | List registered projects. |
| `register` / `unregister` | Add or remove project paths in `~/.k-fleet/projects.json`; these commands do not install or delete skills. |

`--all` selects registered projects; it does not scan the filesystem. Explicit paths
and `--all` cannot be combined. Installation and update preserve unrelated skills.
Recognized retired entries are removed after their replacements install successfully;
see the [CLI source](scripts/kf-projects.mjs) for the migration list.

To refresh project reminders after an update, explicitly request `kf-setup`.

### If new skills are missing

[`@latest`](https://docs.npmjs.com/cli/v11/commands/npm-dist-tag) names npm's published
distribution tag. It does not mean the latest GitHub commit or guarantee that a
package runner bypasses its cache; [Bun also caches packages](https://bun.sh/docs/pm/bunx).
Check what npm currently publishes:

```sh
npm view k-fleet dist-tags --json
```

An older CLI may update existing skills without requesting newly added names. Use
an explicit published version as `k-fleet@<version>`, or obtain the current CLI from
GitHub and update registered projects:

```sh
npx --yes github:KeterVM/k-fleet update --all
```

A GitHub Release does not publish to npm. If files are present but Codex has not
detected them, restart Codex; refreshing discovery cannot fix missing files.

## Maintenance

The `skills/` directory has the skill source files.
The `.codex/agents/` directory has the reviewer configuration.
The `scripts/kf-projects.mjs` file has the CLI code.
The CLI has no declared npm dependencies; installation delegates to the external
`skills` CLI through `npx`.

For maintenance instructions, refer to these documents:

- [Maintainer guide](AGENTS.md)
- [Method composition](docs/workflow-methods.md)
- [Skill-authoring guidance](docs/skill-authoring.md)
- [Changelog](CHANGELOG.md)
- [GitHub releases](https://github.com/KeterVM/k-fleet/releases)

This repository has no test suites, evaluation corpora, or example projects.
Use decisions and results from actual tasks in reports about skill quality.
File checks and results from earlier versions are not sufficient to find if changed instructions give better results.

K Fleet has an [Apache-2.0](LICENSE) license.
Refer to [NOTICE](NOTICE).
