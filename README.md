# K Fleet

K Fleet is a small, reusable collection of Codex workflow skills. It acts as a
lightweight personal engineering harness: repository evidence supplies the local
context, while the skills supply consistent ways to maintain that context, add test
coverage, delegate specialist questions, implement, debug, investigate, refactor,
verify, and learn from evidence.

K Fleet is intentionally not a generic prompt library, a framework-specific
ruleset, an agent orchestration framework, a replacement for project
documentation, or a large catalog of technology-specific skills.

## Core skills

| Intent | Skill | Boundary |
| --- | --- | --- |
| Add tests for existing behavior | `kf-add-test-coverage` | Makes a test-only change for retrospective or characterization coverage; a discovered product mismatch is reported with a recommended owner and is not handed off without correction authority. |
| Obtain bounded specialist evidence | `kf-delegate-specialist` | Selects and briefs a read-only specialist sub-agent, then returns advisory evidence to the owning workflow; it does not transfer scope, writes, integration, or verification. |
| Initialize or maintain repository context | `kf-maintain-context` | Creates missing `AGENTS.md` guidance when useful and authorized, then keeps the effective instruction chain scoped, compact, discoverable, and verified. |
| Design a code change before implementation | `kf-design-change` | Produces an evidence-based implementation contract without modifying production code; combined requests hand authorized implementation to its execution owner. |
| Add or modify behavior | `kf-implement-feature` | Handles capabilities, not known defects, behavior-preserving refactors, investigations, or verification-only requests. |
| Correct a known defect | `kf-fix-bug` | Diagnoses and implements a root-cause fix; feedback that revises the current task stays in that task's workflow. |
| Drive a feature or fix test-first | `kf-test-driven-change` | Composes with the feature or bug workflow to enforce vertical Red-Green-Refactor sequencing and evidence; the primary workflow retains product scope and production structure. |
| Explain unclear behavior | `kf-investigate-issue` | Owns diagnosis rather than product mutation; separately authorized correction is handed to its execution owner, and temporary instrumentation requires explicit authority. |
| Improve structure without changing behavior | `kf-refactor-code` | Preserves externally observable behavior by default. |
| Validate existing changes | `kf-verify-change` | Owns a distinct review, readiness, or independent-verification phase without modifying the reviewed artifact; execution workflows retain their own routine validation. |
| Evaluate evidence for durable learning | `kf-learn-from-evidence` | Detects and assesses signals that a method, route, or guidance should change, then emits an authorization-gated persistence contract without editing the durable artifact. |

Primary skills are split by workflow and user intent, not by frontend, backend,
database, language, or framework. `kf-delegate-specialist`,
`kf-test-driven-change`, and `kf-learn-from-evidence` are composable method skills:
the primary workflow owns the current result, delegation obtains bounded expert
evidence, TDD owns its test-first loop, and learning evaluates whether evidence
justifies changing the reusable controller. Tests provide feedback about behavior;
they do not define production architecture. An explicit specialist request still
routes by its substantive design, investigation, verification, or execution
intent; delegation does not become the primary workflow. Technology-specific
behavior should come from the target repository's code, `AGENTS.md`,
documentation, canonical examples, and purpose-built specialists when their
evidence is needed.

All skill names use the compact `kf-` namespace to distinguish K Fleet skills from
similarly named global or third-party skills.

## Harness flow

K Fleet uses one primary workflow for the requested result and composes method
skills only when their discipline is relevant:

```text
request
-> primary workflow
-> optional specialist evidence
-> optional test-driven method
-> internal feedback and result evidence
-> optional independent verification
-> authorized correction owner when a finding exists
-> original verification or coverage owner for fresh closeout when correction began there
-> optional evidence-based learning
-> authorized persistence owner
-> persisted-artifact verification
```

This is a routing contract, not a requirement to invoke every skill. Each active
workflow performs its own proportionate validation. Independent verification runs
only when requested or required by applicable guidance; when correction is also
authorized, `kf-verify-change` owns the fresh verdict before and after the
applicable execution workflow mutates the artifact. Investigation similarly
reports its diagnosis before handing an authorized correction to its execution
owner. Durable behavioral rules that still need a decision go through
`kf-learn-from-evidence`, which produces a persistence contract but never edits the
durable artifact. Direct already-decided policy and authorized learning contracts
go to `kf-maintain-context`, the sole Context writer, for placement and
effective-context verification.

Verification does not repair its own findings. When the user authorizes both
verification and repair, `kf-verify-change` reports the first verdict, the
applicable execution skill performs correction, and verification runs again
against the original target. The loop stops on readiness, an evidence-backed
blocker, a repeated unresolved failure, or an authorization boundary.

An implementation-ready design hands feature, bug, or refactor work a compact
contract: target state, accepted decisions, constraints and non-goals, acceptance
evidence, unresolved assumptions, and affected boundaries. Execution and
verification revalidate material repository facts rather than treating the design
as immutable or as authorization to implement.

Specialist delegation is read-only and evidence-seeking by default. It is used
when the user asks for expert assistance or a concrete domain question would
materially reduce risk. The specialist does not own the task, authorize changes,
or replace the parent's integration and verification responsibilities.

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
Initialize or maintain this repository's effective Codex context.
Design the durable-storage migration, but do not implement it.
Ask a PostgreSQL specialist to review the migration's locking risks, then use that evidence in the design.
Implement invoice export.
Implement invoice export with TDD and show each Red-Green cycle.
Add missing tests for the already-implemented invoice totals without changing production behavior.
Fix the reconnect bug.
Investigate why reconnect sometimes happens twice.
Refactor this service without changing behavior.
Verify these changes.
I rewrote the code you generated; evaluate automatically whether the evidence justifies a durable lesson.
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
- **Controlled learning:** decide reusable lessons from evidence, then let the
  authorized artifact owner persist and verify them in the narrowest location.
- **Progressive disclosure:** keep global and repository-root guidance small; load
  detailed facts from their canonical documents or narrowest applicable scope.

K Fleet should evolve through real use: observe repeated mistakes, correct the
current result, and let `kf-learn-from-evidence` automatically evaluate whether the
pattern justifies a durable proposal. It does not write the result: the authorized
artifact owner applies and verifies it, with `kf-maintain-context` owning Context
destinations.

## Example project

[`examples/fleet-ledger`](examples/fleet-ledger) is a dependency-free Node.js
project with K Fleet skills installed project-locally through `bunx skills`. Its
`SCENARIOS.md` maps realistic prompts to concrete changes and evidence, while
`TEST_REPORT.md` records the initial validation results.

The same example also includes a second full exercise in
`MAINTENANCE_SCENARIOS.md`, which adds maintenance scheduling and reruns the
original six workflows with results in `MAINTENANCE_TEST_REPORT.md`. Dedicated
exercises preserve the historical guidance-maintenance exercise in
`GUIDANCE_MAINTENANCE_SCENARIO.md`; `CONTEXT_MAINTENANCE_SCENARIO.md` covers
current initialization, discovery, precedence, size, and verification behavior;
and `DESIGN_CHANGE_SCENARIO.md` covers implementation-
ready design in `DESIGN_CHANGE_SCENARIO.md`. `TDD_SCENARIO.md` exercises the
composable test-driven method, and `TEST_COVERAGE_SCENARIO.md` exercises
retrospective test-only ownership. Their corresponding `*_TEST_REPORT.md` files
record installation, routing, and validation results.

The machine-readable cases under [`evals`](evals) cover primary routing, method
composition, specialist delegation, correction and re-verification, design
handoff, learning gates, context-maintenance delegation boundaries, and the full
design-to-Context closure sequence. Eval-corpus lint checks only syntax, referenced
skills, expected coverage, structured observations, and evidence freshness; it
does not execute prompts or prove routing behavior by itself. Independent, blind,
read-only evaluators receive anonymous prompts and a neutral rubric without
semantic IDs, modes, or expected answers. Their frozen raw rationale and stopping
results are hashed before a separate judge maps hidden invariants, while
deterministic scoring binds the complete result to source, corpus, blind-input,
evaluation-tooling, raw-observation, result, and protocol hashes.
Current source-hashed full-loop evidence is recorded in
[`evals/CLOSURE_EVAL_REPORT.md`](evals/CLOSURE_EVAL_REPORT.md); the current
source-hashed trigger-boundary evidence is recorded in
[`evals/TRIGGER_BOUNDARY_EVAL_REPORT.md`](evals/TRIGGER_BOUNDARY_EVAL_REPORT.md).
An isolated [`evals/bounded-quality`](evals/bounded-quality) experiment evaluates
whether a sole writing expert plus read-only quality roles improves real artifacts
beyond a stronger single-owner contract. The candidate remains outside the core
skill catalog until its correctness, authority, and anti-slop promotion gates are
demonstrated.

## Releases

The latest tagged stable release is `v1.4.0`; `main` may contain unreleased
evidence-backed improvements. See [CHANGELOG.md](CHANGELOG.md) for the release
history. K Fleet evolves from evidence gathered in real use rather than by
expanding the skill catalog speculatively.

## Contributing and security

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the focused
development workflow and pull request expectations. Report vulnerabilities using
the private process in [SECURITY.md](SECURITY.md), not a public issue.

Dependency-free checks are split by responsibility:

```sh
node scripts/validate-repository-structure.mjs
node scripts/validate-eval-corpus.mjs
cd examples/fleet-ledger && npm test
```

The first command validates packaging and documentation, the second lints the eval
specification, scores current structured observations, and checks all behavioral-
evidence hashes, and the fixture test exercises the example application. None
substitutes for an independent behavioral run of the harness prompts.

## License

K Fleet is licensed under the [Apache License 2.0](LICENSE). See [NOTICE](NOTICE)
for attribution information.
