# K Fleet Repository Guide

## Purpose

K Fleet is the source repository for portable product and engineering skills for
Codex and Claude Code.
Keep the package small, inspectable, language-independent, and based on observable
workflow behavior rather than framework-specific instructions.

## Repository map

- `README.md`: architecture, prerequisites, installation, operation, maintenance.
- `skills/`: the public catalog (setup, product discovery, requirements, experience
  design, codebase design, implementation, test writing, verification, release,
  operation, product evaluation, practice codification). Each skill owns its
  instructions and references.
- `.codex/agents/kf-reviewer.toml` and `.claude/agents/kf-reviewer.md`: the companion
  reviewer for each agent; keep their instructions identical.
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
  (`policy.allow_implicit_invocation: false` in its `agents/openai.yaml` for Codex,
  `disable-model-invocation: true` in its frontmatter for Claude Code). It only
  reports, never writes, a missing `@AGENTS.md` import in `CLAUDE.md`. It
  preserves unrelated guidance; reminders stay concise and keep method selection,
  source authority, and project/worktree isolation, while procedures live in the
  skills. CLI installation only installs files and reminds the user to request
  `kf-setup`; it never invokes setup or edits root instructions.
- **This file is not the bootstrap.** Keep it as the complete maintainer contract;
  the minimal managed bootstrap goes only to repositories that install K Fleet.
  Reminders preserve explicit project requirements and pause only work that
  depends on missing evidence or capabilities.
- **Method ownership.** Product and engineering skills own their methods. Product
  evaluation assesses user or business outcomes; practice codification captures a
  project's own recurring procedures as project skills or guidance. Release and operation carry existing authority without granting
  new production or external-action rights. Select methods as needed (including
  test-first work and returning to an affected decision); never require every
  method for every task.
- **Spec handoff.** Requirements owns the spec: for a new project or feature, work
  likely to span sessions or methods, or on request, it writes one file (default
  `docs/specs/<feature>.md`) recording decisions with their source and
  dependencies. Design, implementation, and verification read it when given its
  path and keep it current. It stops at the spec: no tickets, trackers, backends,
  or hooks, and bounded changes need none.
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
- **Practice codification.** `kf-codify-practices` creates or refines a consumer
  project's own skills and guidance for its recurring procedures and constraints,
  only on explicit request (the same two invocation settings as setup). It derives
  conventions from the project's current code, proposes before writing, and leaves
  installed K Fleet and third-party skills unchanged; it neither searches for nor
  installs third-party skills. `skill-creator` is used when available, with a
  self-contained fallback, never bundled or required. Written guidance stays
  unproven until actual use; ordinary work never silently rewrites skills.
- **Reviewer.** `kf_reviewer` (Codex) and `kf-reviewer` (Claude Code, read-only tools)
  stay optional, read-only, model-neutral, and
  advisory: it reports findings and evidence, never fixes them or declares
  overall readiness.

## Skill conventions

- Prefix directory and frontmatter `name` with `kf-` and keep them identical.
- Use only `name` and `description` frontmatter unless a verified need requires more;
  user-triggered skills add `disable-model-invocation: true` (Codex ignores it).
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
- Use `kf-skills-creator` to create, restyle, trim, or rephrase a kf-* skill.
- Keep both out of the public catalog, CLI installation list, and setup reminders.
- Follow [skill authoring guidance](docs/skill-authoring.md), which records its
  sources and their check dates: concise discovery,
  progressive disclosure, decision criteria over itineraries, short varied
  examples and positive instructions for the hardest boundaries. Preserve real
  constraints and authorized completion while removing redundant reads, tests,
  and approval stops. Model-specific claims need evidence on that model and never
  justify weakening user rules.
