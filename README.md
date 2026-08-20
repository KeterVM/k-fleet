# K Fleet

K Fleet is a small, reusable collection of Codex workflow skills. It acts as a
lightweight personal engineering harness: repository evidence supplies the local
context, while the skills supply consistent ways to set up and maintain guidance,
implement, debug, investigate, refactor, verify, and learn from corrections.

K Fleet is intentionally not a generic prompt library, a framework-specific
ruleset, an agent orchestration framework, a replacement for project
documentation, or a large catalog of technology-specific skills.

## Core skills

| Intent | Skill | Boundary |
| --- | --- | --- |
| Initialize repository guidance | `kf-setup-project` | Creates the smallest verified routing and constraint layer; it does not summarize every project or maintain established guidance. |
| Maintain existing repository guidance | `kf-maintain-guidance` | Reduces always-loaded context by deleting, consolidating, or relocating guidance while protecting explicit learned intent. |
| Design a code change before implementation | `kf-design-change` | Produces an evidence-based, implementation-ready technical design; it does not modify production code unless implementation is separately requested and routed. |
| Add or modify behavior | `kf-implement-feature` | Handles capabilities, not known defects, behavior-preserving refactors, investigations, or verification-only requests. |
| Correct a known defect | `kf-fix-bug` | Diagnoses and implements a root-cause fix; feedback that revises the current task stays in that task's workflow. |
| Explain unclear behavior | `kf-investigate-issue` | Reports evidence and likely causes; it does not modify code unless requested or needed for safe instrumentation. |
| Improve structure without changing behavior | `kf-refactor-code` | Preserves externally observable behavior by default. |
| Validate existing changes | `kf-verify-change` | Reviews and runs appropriate checks; it is not the primary implementation workflow. |
| Extract durable lessons from manual corrections | `kf-learn-from-correction` | Suggests carefully scoped guidance; it does not turn every edit into a rule. |
| Apply a specialist domain perspective | `kf-delegate-specialist` | Delegates bounded analysis, research, independent review, or authorized execution while the parent retains verification and authority. |

Skills are split by workflow and user intent, not by frontend, backend, database,
language, or framework. Technology-specific behavior should come from the target
repository's code, `AGENTS.md`, documentation, and canonical examples.

All skill names use the compact `kf-` namespace to distinguish K Fleet skills from
similarly named global or third-party skills.

## Installation

### Project-local with `bunx skills`

From a target repository, install all K Fleet skills for Codex with:

```sh
bunx skills add KeterVM/k-fleet \
  --agent codex \
  --skill '*' \
  --yes
```

This creates project-scoped copies under `.agents/skills/` and records their source
in `skills-lock.json`. Review an installation with:

```sh
bunx skills list --agent codex
```

This resolves the public repository on GitHub, so no local K Fleet clone is
required. Re-run the command to refresh the installed copies.

### Global manual installation

The active Codex installation on this system discovers global skills under:

```text
~/.codex/skills/<skill-name>/SKILL.md
```

Copy a skill directory into that location:

```sh
cp -R skills/kf-implement-feature ~/.codex/skills/kf-implement-feature
```

Repeat that operation for each skill you want to install. Before copying, check
whether the destination already exists; do not overwrite an existing skill without
reviewing and merging it intentionally.

For a clone that should stay updateable, symbolic links are an optional
platform-native alternative:

```sh
ln -s /absolute/path/to/k-fleet/skills/kf-implement-feature \
  ~/.codex/skills/kf-implement-feature
```

Use an absolute source path, create only links whose destinations do not already
exist, and restart Codex after changing installed skills so a new session can
discover them. K Fleet includes no custom installer because `bunx skills`, direct
copies, or auditable symbolic links are sufficient.

The repository does not modify the user's global `AGENTS.md`. Stable preferences
such as focused diffs and verification may live there, but project commands,
framework choices, schema paths, package layout, canonical source files, and local
architecture decisions belong in each repository.

## Usage

Codex can route to these skills from intent; naming a skill explicitly is optional.
For example:

```text
Initialize this project for Codex.
Clean up and update this repository's existing AGENTS.md guidance.
Design the durable-storage migration, but do not implement it.
Implement invoice export.
Fix the reconnect bug.
Investigate why reconnect sometimes happens twice.
Refactor this service without changing behavior.
Verify these changes.
I rewrote the code you generated. Analyze what I changed and improve future behavior.
Ask a transport-regulations researcher to verify how these current rules affect our maintenance reports.
```

## Philosophy

K Fleet is grounded in four complementary ideas:

- **First-principles reasoning** determines the task's objective, verified facts,
  and constraints.
- **Methodology** determines how each class of task should be performed.
- **Control theory** connects those methods into a closed feedback loop that can
  detect deviations and correct its course.
- **Double-loop learning** determines when evidence justifies changing the methods
  or guidance themselves, rather than only correcting the current result.

K Fleet follows a compact context hierarchy:

```text
global preferences
-> task workflow skill
-> project AGENTS.md
-> project documentation
-> actual code
```

Its working principles are:

- **Codebase-first:** inspect relevant code and analogous implementations before
  choosing a design.
- **Minimal diffs:** make the smallest complete change and avoid speculative
  cleanup, abstractions, dependencies, and unrelated formatting.
- **Evidence over assumptions:** infer strong conventions from repeated examples,
  not a single file.
- **Verification:** inspect changed code, run the smallest meaningful checks, fix
  caused failures, and review the final diff.
- **Controlled learning:** persist only reusable, evidence-backed lessons in the
  narrowest appropriate location.
- **Progressive disclosure:** keep global and repository-root guidance small; load
  detailed facts from their canonical documents or narrowest applicable scope.
- **Focused delegation:** isolate separable specialist work so it can use an
  appropriate domain method and evidence base while authority, integration, and
  final verification remain with the parent agent.

K Fleet should evolve through real use: observe repeated mistakes, correct them,
use `kf-learn-from-correction` to evaluate the pattern, and update global or project
guidance only when the evidence supports it.

## Example project

[`examples/fleet-ledger`](examples/fleet-ledger) is a dependency-free Node.js
project with K Fleet skills installed project-locally through `bunx skills`. Its
`SCENARIOS.md` maps realistic prompts to concrete changes and evidence, while
`TEST_REPORT.md` records the initial validation results.

The same example also includes a second full exercise in
`MAINTENANCE_SCENARIOS.md`, which adds maintenance scheduling and reruns the
original seven workflows with results in `MAINTENANCE_TEST_REPORT.md`. Dedicated
exercises cover bounded delegation in `SPECIALIST_SCENARIO.md`, accumulated
guidance maintenance in `GUIDANCE_MAINTENANCE_SCENARIO.md`, and implementation-
ready design in `DESIGN_CHANGE_SCENARIO.md`; their corresponding `*_TEST_REPORT.md`
files record installation, routing, and validation results.

## Contributing and security

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the focused
development workflow and pull request expectations. Report vulnerabilities using
the private process in [SECURITY.md](SECURITY.md), not a public issue.

Repository validation is available without installing dependencies:

```sh
node scripts/validate-skills.mjs
cd examples/fleet-ledger && npm test
```

## License

K Fleet is licensed under the [Apache License 2.0](LICENSE). See [NOTICE](NOTICE)
for attribution information.
