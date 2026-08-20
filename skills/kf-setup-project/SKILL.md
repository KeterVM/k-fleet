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
3. Detect actual tooling from repository configuration: package manager, runtime,
   workspace and build systems, formatting, linting, type checking, tests,
   migrations, containers, and CI. Never invent commands.
4. Inspect two or three representative implementations when practical. Compare
   organization, boundaries, validation, error handling, data access, UI/state,
   configuration, background work, and tests.
5. Identify real canonical examples future agents can imitate. Prefer file
   references over lengthy restatements of the code.
6. Separate repository facts, strong repeated conventions, and weak observations.
   Do not promote weak observations into requirements.
7. Create or update repository guidance with only useful sections, such as map,
   commands, architecture, conventions, examples, validation, and doc links.
8. Validate every referenced path and command, remove speculation and duplicated
   global guidance, check for contradictions, and inspect the final diff.

## Editing rules

- Never replace an existing `AGENTS.md` wholesale. Preserve intentional content
  and make targeted, evidence-backed additions.
- Prefer one root `AGENTS.md`. Add nested guidance only when a subtree has
  materially different architecture, tooling, commands, conventions, or workflows.
- Keep `AGENTS.md` a map and constraint set, not a complete project manual.
- For a very young repository, create a light guide rather than empty template
  sections.
- Do not modify user-level Codex configuration or global skills.

Success means a fresh session can locate code, choose examples, run verified
commands, and preserve architectural boundaries without loading a giant prompt.
