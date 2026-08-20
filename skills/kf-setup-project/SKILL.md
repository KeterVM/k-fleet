---
name: kf-setup-project
description: Initialize or maintain repository-level Codex guidance, especially AGENTS.md. Use when entering a repository, bootstrapping or auditing its guidance, or revisiting context after material architectural change. Do not use for ordinary feature implementation or bug fixing.
---

# Setup Project

Build a concise, evidence-backed map that helps a fresh Codex session work safely
in the repository.

## Workflow

1. Resolve the repository root and inspect existing `AGENTS.md`, nested guidance,
   `AGENTS.override.md`, `.codex/`, README, contributing, architecture, testing,
   and project-skill documentation before editing.
2. Map major applications, services, packages, source areas, shared libraries,
   data/schema, tests, infrastructure, scripts, generated code, and docs. Record
   only areas that materially help navigation.
3. Identify the canonical documentation locations and record them in repository
   guidance, including where architecture, API, development, and test documentation
   live when present and where new project documentation should go. If documentation
   lives at the repository root or is split across locations, state that explicitly
   instead of assuming a `docs/` directory.
4. Detect actual tooling from repository configuration: package manager, runtime,
   workspace and build systems, formatting, linting, type checking, tests,
   migrations, containers, and CI. Never invent commands.
5. Inspect two or three representative implementations when practical. Compare
   organization, boundaries, validation, error handling, data access, UI/state,
   configuration, background work, and tests.
6. Identify real canonical examples future agents can imitate. Prefer file
   references over lengthy restatements of the code.
7. Separate repository facts, strong repeated conventions, and weak observations.
   Do not promote weak observations into requirements.
8. Place context at the narrowest durable layer: project maps and verified
   constraints in repository `AGENTS.md`, detailed project knowledge in README or
   docs, reusable procedures in skills, and cross-project personal preferences in
   user-level guidance. Link to another layer when useful instead of duplicating it.
9. Create or update repository guidance with only useful sections, such as map,
   commands, architecture, conventions, examples, validation, and doc links.
10. Validate every referenced path and command, remove speculation and duplicated
   global guidance, check for contradictions, and inspect the final diff.

## Fleet baseline contract

Repository guidance created by setup is the shared contract for every downstream
K Fleet workflow, but the Fleet-wide portion must remain limited to harness and
context organization. It may establish:

- the canonical location and scope of root or nested `AGENTS.md` files;
- the destination for onboarding and detailed project documentation;
- the generated location and refresh method for project-local K Fleet skills when
  they are installed;
- links to verified project commands, boundaries, examples, and protected areas
  that were discovered from repository evidence.

Do not use the Fleet contract to prescribe source, test, schema, configuration,
module, architecture, or generated-code layouts. Record those as descriptive
project facts only when they exist, and turn them into constraints only when
repeated evidence, project documentation, or an explicit maintainer decision
supports that interpretation.

Preserve an established documentation layout. When none exists, record a minimal
default destination without creating empty structure: keep onboarding in the root
README and place future substantial project documentation under `docs/` unless the
maintainer chooses another location.

## Progressive project documentation

Keep `AGENTS.md` concise by moving substantial, evidence-backed project knowledge
into focused documentation and linking it from repository guidance. Create only
the documents the project actually needs; possible examples include architecture,
database, API, operations, testing, or conventions, but their names and boundaries
must follow the project rather than a fixed Fleet template.

For every referenced document:

- give `AGENTS.md` a short link and one-line description of when to read it;
- keep navigation and enforceable constraints in `AGENTS.md`, with explanations,
  diagrams, schemas, and detailed decisions in the referenced document;
- avoid duplicating the same rule or knowledge in both places;
- preserve and improve an existing canonical document instead of creating a
  competing one;
- create the file only when verified content is available and materially useful;
- validate the link and ensure a fresh agent can discover the document.

Do not generate a fixed set such as `architecture.md`, `database.md`, and
`conventions.md` for every repository. An `AGENTS.md` that is becoming difficult to
scan is a signal to extract cohesive detail, not to split content mechanically.

## Monorepos and multi-project repositories

Use this branch only when workspace configuration, build tooling, repository
documentation, or clear package boundaries show that the repository contains
multiple projects. Do not infer a monorepo from directory names alone.

- Discover the actual workspace root, members, ownership boundaries, shared areas,
  and package relationships from repository evidence.
- Keep the root `AGENTS.md` focused on shared navigation, shared constraints, and
  links to project-specific guidance.
- Add nested `AGENTS.md` only where a subtree has materially different commands,
  architecture, tooling, conventions, or operational boundaries. Packages that
  inherit the root contract need no local file.
- Make nested guidance additive: state only scoped differences and rely on inherited
  root guidance rather than copying it.
- Record root and project-specific commands with their required working directory
  or workspace selector only when they are verified.
- Place shared and project-specific documentation according to actual ownership and
  existing conventions, then link each document from the narrowest useful guidance
  scope.
- Map cross-project dependencies or coordination rules only when they materially
  affect changes; keep substantial explanations in project documentation.
- Skip empty, generated, vendored, or convention-identical members unless they need
  a navigation warning or a distinct constraint.
- Validate nested instruction scope, inherited-rule compatibility, links, and
  commands from the locations where future agents will use them.

Do not prescribe workspace tools, root folders, package naming, documentation
layout, or one `AGENTS.md` per member. Every recorded boundary must come from the
repository or an explicit maintainer decision.

## Empty or near-empty repositories

When a repository does not yet contain enough implementation or configuration to
infer project conventions, create only lightweight guidance:

- state that the project is greenfield or not yet initialized;
- preserve any known purpose, existing instructions, and documentation decision;
- record the root README for onboarding and the chosen destination for future
  detailed documentation;
- record project-local K Fleet skill locations only when they are installed;
- note that setup should be rerun after the stack, scaffold, or first representative
  implementation exists.

Skip architecture, source/test/schema locations, coding conventions, canonical
examples, development commands, validation commands, nested guidance, and a
  project definition of done when no evidence supports them. Do not create source or
  test trees, dependencies, build tooling, scripts, sample code, speculative
  content, or empty documentation directories merely to complete setup.

## Editing rules

- Never replace an existing `AGENTS.md` wholesale. Preserve intentional content
  and make targeted, evidence-backed additions.
- Prefer one root `AGENTS.md`. Add nested guidance only when a subtree has
  materially different architecture, tooling, commands, conventions, or workflows.
- Keep `AGENTS.md` a map and constraint set, not a complete project manual.
- Prefer concise positive guidance that names the existing pattern to follow and
  its canonical example. Add prohibitions only for a concrete recurring risk, and
  state the preferred behavior or the condition that permits an exception.
- Add a project rule only when repeated code, configuration, documentation, or an
  explicit maintainer correction supports it. Do not turn generic best practices,
  a single implementation, or speculative preferences into repository policy.
- Do not create or invent a documentation directory merely for uniformity. Record
  the repository's verified documentation layout and its intended destination for
  new documents.
- For a very young repository, follow the empty-repository branch rather than
  filling speculative sections with guesses.
- Do not modify user-level Codex configuration or global skills.

Success means a fresh session and every downstream K Fleet skill can locate code,
choose examples, place documentation, run verified commands, and preserve the
shared project contract without loading a giant prompt.
