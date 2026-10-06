# K Fleet Repository Guide

## Purpose

K Fleet is the source repository for portable Codex product and engineering skills.
Keep the package small, inspectable, language-independent, and based on observable
workflow behavior rather than framework-specific instructions.

## Repository map

- `README.md`: architecture, prerequisites, installation, operation, maintenance.
- `skills/`: the public catalog (setup, product discovery, requirements, experience
  design, codebase design, implementation, test writing, verification, release,
  operation, product evaluation, skill improvement). Each skill owns its
  instructions and references.
- `.codex/agents/kf-reviewer.toml`: the companion reviewer.
- `.agents/skills/kf-research-skills/` and `.agents/skills/kf-skills-creator/`:
  maintenance skills for this repository only, outside the public catalog and
  consumer installation. `.claude/skills/` holds relative symlinks to them; edit
  the sources under `.agents/skills/`.
- `scripts/kf-projects.mjs`: the zero-dependency `k-fleet` npm CLI in `package.json`.
- `docs/`: [skill authoring guidance](docs/skill-authoring.md) and
  [workflow method composition](docs/workflow-methods.md).
- `.github/`, `CONTRIBUTING.md`, `SECURITY.md`: contribution and vulnerability reporting.

## Architecture boundaries

- **Setup.** `kf-setup` only initializes or refreshes root `AGENTS.md` reminders on
  explicit user request and stays user-triggered
  (`policy.allow_implicit_invocation: false` in its `agents/openai.yaml`). It
  preserves unrelated guidance; reminders stay concise and keep method selection,
  source authority, and project/worktree isolation, while procedures live in the
  skills. CLI installation only installs files and reminds the user to request
  `kf-setup`; it never invokes setup or edits root instructions.
- **This file is not the bootstrap.** Keep it as the complete maintainer contract;
  the minimal managed bootstrap goes only to repositories that install K Fleet.
  Reminders preserve explicit project requirements and pause only work that
  depends on missing evidence or capabilities.
- **Method ownership.** Product and engineering skills own their methods. Product
  evaluation assesses user or business outcomes; skill improvement assesses the
  agent's methods. Release and operation carry existing authority without granting
  new production or external-action rights. Select methods as needed (including
  test-first work and returning to an affected decision); never require every
  method for every task.
- **Self-contained skills.** Required instructions and file references stay inside
  the skill's own directory. Refer to other methods by skill name; never link into
  another skill's files.
- **External memory is optional.** Engineering methods work without it; users or
  projects choose an integration or none. Memory supplies evidence, never
  permission; recalled inferences stay unapproved; current sources stay
  authoritative; canonical repository/worktree identity and authorized scope are
  respected. K Fleet supplies no backends or adapters. Keep provider names,
  backend configuration, connectivity checks, hooks, and memory operations out of
  public skills and managed reminders, and never let setup install them.
- **Capability improvement** goes through `kf-evolve-skills`: diagnose the gap,
  inspect available guidance, and assess actual use before claiming improvement.
  Use `find-skills` and `skill-creator` when available, with a self-contained
  fallback; never bundle copies or require them for all work. Inspect candidate
  content and dependencies before installing, prefer project scope, and preserve
  unrelated skills. Do not create a skill for every failure or treat installation
  as closing the feedback loop. Ordinary implementation never silently rewrites
  core skills; changes stay scoped, versioned, and reversible.
- **Reviewer.** `kf_reviewer` stays optional, read-only, model-neutral, and
  advisory: it reports findings and evidence, never fixes them or declares
  overall readiness.

## Skill conventions

- Prefix directory and frontmatter `name` with `kf-` and keep them identical.
- Use only `name` and `description` frontmatter unless a verified need requires more.
- Keep descriptions discriminating.
- `SKILL.md` holds applicability, authority, stopping, and reference-selection
  rules; substantial procedures and task-specific contracts go in
  purpose-labelled references linked at the relevant decision point.
- Keep target-project facts in that project's guidance, not in portable skills.
- Add dependencies, build tooling, generated files, or scripts only for a concrete
  problem, and explain the benefit and maintenance cost.

## Changes and evidence

- Adding a public entry point or changing the installation contract or backend
  responsibilities requires an explicit design decision. Routine edits within
  those contracts do not.
- Judge instruction changes by the decisions and outcomes they should improve.
  Claims of better behavior need actual task observations with stated scope and
  limits; formatting, syntax, packaging, or scripted checks never establish skill
  effectiveness, and historical scores do not transfer to changed instructions.
- Maintenance checks: keep frontmatter, directory/name agreement, internal
  reference routing, links, README accuracy, and installation behavior consistent
  with the catalog. Review only affected surfaces and report what was checked.
- Do not recreate test suites, validation scripts, evaluation corpora, example
  projects, or test CI without an explicit request. The test-writing and
  verification skills describe target-project work, not a harness for this repo.
- Commit and push authorized changes directly to `main`; branch only on request.

## Engineering principles

Four complementary foundations, operating at different levels
(detail in [skill authoring guidance](docs/skill-authoring.md)):

- **First principles:** separate the real goal, facts, constraints, and
  assumptions; derive necessary capabilities and check that together they suffice.
- **Methodology:** choose an explicit method suited to the task; following steps
  does not by itself establish correctness or policy compliance.
- **Control theory:** compare observed outcomes with the intended result, correct
  from evidence, and define when to stop or change strategy.
- **Double-loop learning:** distinguish fixing an implementation from revising the
  assumptions, methods, or criteria behind it. One failure does not justify a new
  rule; learning never grants authority to change user goals.

Before consequential decisions, verify premises that could change the conclusion
using current source, version-matched docs, or runtime observation; separate
facts, inferences, and preferences. Investigate answerable questions; ask only for
missing intent or material choices. When challenged, recheck premises and explain
any revision. These principles are a framework whose value must show in actual
decisions; public capability boundaries remain explicit design choices.

## Skill authoring

- Use `kf-research-skills` when creating, assessing, or materially revising a
  skill depends on unsettled engineering or agent-behavior premises; reuse
  adequate evidence for routine changes.
- Use `kf-skills-creator` to create or restyle a kf-* skill.
- Keep both out of the public catalog, CLI installation list, and setup reminders.
- Follow [skill authoring guidance](docs/skill-authoring.md), which records its
  sources and their check dates: concise discovery,
  progressive disclosure, decision criteria over itineraries, short varied
  examples and positive instructions for the hardest boundaries. Preserve real
  constraints and authorized completion while removing redundant reads, tests,
  and approval stops. Model-specific claims need evidence on that model and never
  justify weakening user rules.
