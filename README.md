# K Fleet

[English](README.md) | [简体中文](README.zh-CN.md)

Use K Fleet with Astra. Results can be different with other models.

K Fleet has six engineering methods and one setup skill.
A skill is a file with instructions for an artificial intelligence (AI) agent.
The main agent selects the necessary methods and is responsible for the complete task.
The project root `AGENTS.md` file has reminders for the main agent.

You can use K Fleet with or without external memory.

## Why K Fleet

An AI agent can write code when the requirements are not clear.
It can also make parts that do not operate together.
Tests can give successful results when a feature does not operate correctly.

K Fleet gives the agent methods for these problems:

- Make unclear requirements clear.
- Prepare a design for complex changes.
- Do tests to make sure that the feature operates correctly.
- If the same errors occur again, examine the work method.

These methods give the agent instructions that you do not have to give again for each task.
They also help the agent identify when the task is complete.
For a simple change, use only the necessary methods.

## Core ideas

Four ideas are the basis of K Fleet.
They apply to different parts of engineering work.
They do not set the number of skills or agents.

| Idea | How to use the idea |
| --- | --- |
| **First principles** | Identify the necessary result, facts, limits, and assumptions. Make sure that the design includes all necessary functions and that these functions operate together. Use applicable engineering knowledge and test results. |
| **Methodology** | Select a method that is applicable to the task. Use available requirements and designs when they are sufficient. The result can be incorrect after the agent completes the procedure. |
| **Control theory** | Compare actual results with the necessary results. Correct the differences. Identify when to stop or change the method. The same procedure can cause the same error again. |
| **Double-loop learning** | Find the cause of the error in the code, assumptions, method, or assessment criteria. Use facts and test results before you change the method. Obey the limits of the task approval. |

The main agent connects the changed parts and completes the approved checks and corrections.
Use current project instructions and source files if other context gives different information.
A change to a method does not give permission to change user requirements or skills.

Use decisions and results from actual tasks to examine skill quality.

## Skills

| Skill | Task |
| --- | --- |
| `kf-setup` | Add or replace root `AGENTS.md` reminders only when the user tells the agent to do setup. |
| `kf-define-requirements` | Make the intended behavior, scope, and acceptance criteria clear. |
| `kf-design-codebase` | Prepare a design for code responsibilities, interfaces, and structure. Use only the complexity necessary for the task. |
| `kf-implement` | Make complete code changes with clear responsibilities, names, placement, and dependencies. Reuse suitable code and correct design problems exposed during implementation. |
| `kf-write-tests` | Write useful automated tests and regression tests. |
| `kf-verify` | Examine functionality, defects, regressions, runtime problems, and affected code structure. |
| `kf-evolve-skills` | Examine skill instructions at the user's request or when a task identifies a method problem. Examine changes in actual work. |

Each skill has all the instructions and files necessary for its method.
One agent can use more than one method.
The agent can use only the necessary methods or write tests before the code.
New facts can make a different decision necessary.
Use the simplest code structure that can do the necessary work.

If a method is not sufficient for a task, `kf-evolve-skills` first examines the available skill instructions.
It can use these helper skills:

- [`find-skills`](https://github.com/vercel-labs/skills/tree/main/skills/find-skills) comes from Vercel's `vercel-labs/skills` repository. It finds other skills.
- [`skill-creator`](https://github.com/openai/skills/tree/main/skills/.system/skill-creator) comes from OpenAI's `openai/skills` repository. It helps write skills.

These two helper skills are optional.
It then examines the instructions in actual work.

The default location for new skills is the current project.
The agent can add, correct, or remove skills as permitted by the task.

The optional [`kf_reviewer`](.codex/agents/kf-reviewer.toml) agent examines the code independently.
This agent has read-only access.
Installation includes its configuration.
The reviewer gives its results to the main agent.
The main agent is responsible for corrections and the complete task.

## Installation

Use Node.js version 20 or a subsequent version.
An external memory service is not necessary.

From the target repository, run this command:

```sh
npx --yes k-fleet@latest install
```

To install from GitHub, run this alternative command:

```sh
npx --yes github:KeterVM/k-fleet install
```

The command-line interface (CLI) does these tasks:

- It installs the seven skills in `.agents/skills/`.
- It records the skills in `skills-lock.json`.
- It copies the reviewer configuration to `.codex/agents/`.
- It registers the project.

Installation does not start setup or change `AGENTS.md`.
The CLI downloads skills from this GitHub repository's default branch.
The CLI version does not fix the skill revision.

After installation, close Codex.
Then start Codex again.
In each project, run this command one time:

```text
/kf-setup
```

Setup adds or replaces its section in the project root `AGENTS.md` file.
It keeps other project instructions.
Setup does not add duplicate sections when you run it again.
Setup starts only when you tell the agent to do setup.
Other tasks use the method skills directly.

## Other skills and plugins

K Fleet does not limit your choice of other skills or plugins.
Select them for your project.

We recommend clear goals and the necessary context for Astra.
Let it analyze the task and select its methods.
We do not recommend skills or plugins that automatically produce many specifications (specs) or architecture decision records (ADRs).
This recommendation applies when these documents restrict how the agent works.
Write documents when the task needs them, and record useful information.

We recommend memory plugins such as graph memory or [Supermemory](https://github.com/supermemoryai/codex-supermemory).
They help the agent keep and find context across tasks.
Memory plugins are optional.

## Operation

Give the agent a task or the name of a skill.
The agent keeps the same permission limits when it changes methods.
Analysis-only and review-only tasks stay read-only.
The agent gives you actual results and identifies remaining checks.

The CLI uses the current project unless you give other paths or `--all`.
The `--all` option applies to registered projects.

```sh
npx k-fleet@latest install /absolute/path/to/api /absolute/path/to/web
npx k-fleet@latest update --all
npx k-fleet@latest status --all
npx k-fleet@latest list
```

For Bun, use `bunx k-fleet@latest update`.
To update all registered projects, add `--all`.
Use `@latest` to prevent use of a cached older CLI version.

The `register` and `unregister` commands change the records in `~/.k-fleet/projects.json`.
Installation keeps installed skills from the current catalog.
Updates replace these skills with their current versions.

Installation also replaces these retired skills if it finds them:

- `kf-orchestrate-work`
- `kf-design`
- `kf-investigate`
- `skillopt-sleep`

If it finds a retired skill, installation first installs or updates all seven current skills.
It then removes the retired skill directories and their lock entries.
If the replacement installation is not successful, it does not remove the retired skills.

After an update, close Codex.
Then start Codex again.
If an update to the project reminders is necessary, run `/kf-setup` manually.

## Maintenance

The `skills/` directory has the skill source files.
The `.codex/agents/` directory has the reviewer configuration.
The `scripts/kf-projects.mjs` file has the CLI code.
The CLI has no external package dependencies.

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
