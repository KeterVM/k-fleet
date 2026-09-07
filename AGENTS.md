# K Fleet Repository Guide

## Purpose

K Fleet is the source repository for a portable Codex orchestration package.

Keep the package small, inspectable, language-independent, and based on observable
workflow behavior rather than framework-specific instructions.

## Repository map

- `README.md` documents the architecture, runtime prerequisites, installation,
  operation, evolution contract, and validation commands.
- `skills/` contains `kf-orchestrate-work`, `kf-define-requirements`,
  `kf-design-codebase`, `kf-implement`, `kf-write-tests`, and `kf-verify`. Each skill owns its instructions and references;
  the orchestrator owns setup and task coordination.
- `.codex/agents/kf-reviewer.toml` defines the companion reviewer.
- `scripts/kf-projects.mjs` implements the zero-dependency `k-fleet` npm CLI exposed
  by `package.json`.
- `docs/` records skill-authoring guidance and workflow composition.
- `.github/`, `CONTRIBUTING.md`, and `SECURITY.md` define contribution and
  vulnerability-reporting workflows.

## Architecture responsibilities

- `kf-orchestrate-work` owns task routing, authority, delegation, integration,
  terminal evidence, and final task state. Requirements, codebase design,
  implementation, test writing, and verification skills own their respective methods.
- Backend ownership, source authority, isolation, and evolution boundaries are
  recorded in [Learned Rules](#learned-rules). Supermemory supplies evidence and
  never expands permission; do not call backend REST APIs to emulate integration
  capabilities.
- SkillOpt-Sleep performs offline trajectory mining, bounded edits, replay, and
  held-out gates for an explicitly named non-`kf-*` skill with memory evolution disabled.
  SkillOpt must not modify K Fleet skills or their references. Normal
  task execution records evidence without rewriting the live skill.

## Conventions

- Adding a public entry point or changing the installation contract or backend
  responsibilities requires an explicit design decision. Claims of improved
  behavior require observations that support them. Routine edits within those contracts do not require a new policy decision.
- Prefix the skill directory and frontmatter name with `kf-`; keep directory and
  frontmatter names identical.
- Use only supported `name` and `description` frontmatter unless a verified need
  requires optional metadata.
- Keep the description discriminating enough to select the orchestrator for
  substantive repository work without turning unrelated conversation into a task.
- Put bootstrap, routing, authority, stopping, and reference-selection rules in
  `SKILL.md`. Put substantial route procedures and backend-specific contracts in
  purpose-labelled references, linked at the relevant decision point.
- Setup must preserve unrelated guidance and must not install or globally configure
  the memory backend itself. Recover missing workflow invariants inside the
  orchestrator or its references.
- Supermemory derives scope from canonical repository and worktree identity;
  recalled inferences remain unapproved evidence.
- Keep detailed target-project facts in that project's guidance or source documents,
  not in the portable K Fleet skill.
- Add dependencies, build tooling, generated files, or scripts only to solve a
  concrete problem; explain the benefit and maintenance cost.

## Maintenance checks

Keep frontmatter, directory/name agreement, internal reference routing, links,
README accuracy, and installation behavior consistent with the current catalog.
Review only the affected surfaces and report what was actually checked. Syntax,
file structure, and packaging checks do not establish that a skill makes good
engineering decisions.

Do not recreate repository test suites, validation scripts, evaluation corpora,
example projects, or test CI without an explicit user request. Assess skill quality
through actual task decisions and outcomes when relevant, stating the observed
scope and limitations. Do not transfer historical scores to changed instructions.
The test-writing and verification skills describe work in target projects; their
presence does not require this repository to maintain a test harness.

<!-- self-reflect:start -->

## Learned Rules

- Commit and push authorized repository changes directly to `main` by default;
  create a feature branch only when the user explicitly requests one.
- Keep K Fleet's source-repository `AGENTS.md` as a complete maintainer contract.
  Retain the repository map, architecture invariants, conventions, and validation
  contract; never replace this guide with the installation bootstrap.
  Apply the minimal managed bootstrap only to repositories that install K Fleet,
  through the explicit idempotent setup route and only after its scoped
  Supermemory runtime check passes. Otherwise setup must stop without writing and
  direct the user to install or configure the integration. The bootstrap must point
  to `kf-orchestrate-work`, state source-over-memory and project/worktree isolation,
  and stop substantive work when the required runtime is missing.
- Keep six public skills: `kf-orchestrate-work`, `kf-define-requirements`,
  `kf-design-codebase`, `kf-implement`, `kf-write-tests`, and `kf-verify`. Each skill must be self-contained: its required
  instructions and file references stay inside its own directory. The orchestrator
  selects methods by skill name; do not link into another skill's files to complete
  a method. Context maintenance, delegation, feedback, and learning remain conditional
  responsibilities. Select methods as needed, including test-first work and returning
  to an affected decision; never require every method for every task. Do not create
  one agent per skill or retain old routing shims. See
  [Workflow method composition](docs/workflow-methods.md) for the selection contract.
- Use Supermemory as the context and experience backend and SkillOpt-Sleep as the
  offline optimizer only for explicitly selected non-`kf-*` skills. Never target
  K Fleet skills or their references, including through aliases or old staging.
  Preserve current repository sources as the conflict
  authority, enforce project/worktree isolation, and gate every adopted evolution
  so it is versioned and reversible. Supermemory owns the complete memory lifecycle;
  do not recreate its operations as K Fleet skills or adapters.
- Keep `kf_reviewer` optional, read-only, model-neutral, and advisory. It must not
  fix its findings or claim readiness independently of the orchestrator, which
  retains correction, integration, conflict resolution, and completion.
- Judge instruction changes by the decisions and outcomes they are intended to
  improve. Keep claims tied to actual observations; do not treat formatting or
  scripted checks as evidence of skill effectiveness.

### Foundational engineering principles

Use four complementary intellectual foundations to guide engineering decisions.
They operate at different levels, not as four equivalent formal theories:

- **First principles:** distinguish the real goal, established facts, constraints,
  and unverified assumptions. Derive necessary capabilities from those premises;
  check that their composition is sufficient for the intended scenario. Challenge
  assumptions without discarding relevant evidence or established engineering knowledge.
- **Methodology:** select an explicit method suited to the task and its conditions.
  Methods must guide reasoning and delivery; following their steps does not by itself
  establish correctness or compliance with repository policy.
- **Control theory:** compare observable outcomes with the intended result, use
  evidence to correct deviations, and define when to stop or change strategy.
  Feedback requires useful measurements and corrective actions; repeated attempts
  alone do not establish a working control loop or guarantee convergence.
- **Double-loop learning:** distinguish correcting an implementation from revising
  the assumptions, methods, or evaluation criteria that produced it. Repeated or
  otherwise sufficient evidence may justify a proposed revision; one failure does
  not automatically justify another rule. Apply existing authority and evolution
  gates before adoption; learning never grants permission to change user goals.

For material decisions, be able to answer these questions using proportionate
working evidence, without requiring a fixed report for every task:

1. Which premises are established facts, and which remain assumptions?
2. Why does this method fit the task, and under what conditions does it apply?
3. What evidence could reveal an error, and when should execution stop or change?
4. Does the evidence call for correcting the implementation, or is it sufficient
   to propose revising the method or its assumptions?

Treat these principles as a design framework whose value must be demonstrated in
observable decisions and outcomes. They do not prescribe a skill or agent count;
the public-entry-point contract is an explicit design choice, not a consequence
of these four foundations.

### Skill authoring reference

When creating or materially revising skills, consult the applicable guidance in
[Skill authoring guidance](docs/skill-authoring.md), distilled from the user-supplied
“Rethinking skills and prompts for GPT-6 Astra”. Keep discovery concise, disclose
detail progressively, and favor decision criteria over rigid itineraries. Preserve
real constraints and authorized completion while removing redundant reads, tests,
and approval stops. Model-specific claims require evidence; they do not automatically
apply to other models or justify weakening user rules.

<!-- self-reflect:end -->
