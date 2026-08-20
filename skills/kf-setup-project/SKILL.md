---
name: kf-setup-project
description: Create or complete missing repository-level Codex guidance, especially AGENTS.md, using verified project evidence and the narrowest useful scope. Use for new or substantially incomplete guidance. Use kf-maintain-guidance to reduce, reorganize, or update established guidance. Do not use merely because work begins in a repository, or for ordinary feature implementation or bug fixing.
---

# Setup Project

Create the smallest evidence-backed map that lets a fresh Codex session navigate,
act, and validate safely.

## Workflow

1. Resolve the requested setup scope and repository root. Inspect existing
   guidance, core documentation, workspace configuration, and task commands before
   editing.
2. Identify only the boundaries, canonical destinations, commands, and constraints
   that materially change future decisions. Never invent commands or layouts.
3. Separate weak observations from established conventions supported by repeated
   code, accepted decisions, or explicit maintainer direction. Treat a current
   status section or one implementation as an example rather than a mandate.
4. Put each fact at its narrowest durable owner: root guidance for shared routing
   and constraints, nested guidance for subtree differences, documentation for
   substantial knowledge, and skills for reusable procedures.
5. Create or complete guidance with short, purpose-labelled links instead of
   reproducing the linked content.
6. Validate inheritance, links, and commands from the scopes where agents will use
   them, then review the diff for speculation and unnecessary always-loaded text.

## Root retention test

Before adding an instruction to the root `AGENTS.md`, require all of the following:

- it changes agent behavior or a recurring technical decision;
- it applies across most unrelated work in the repository;
- the root is its narrowest correct scope; and
- linking to an existing canonical source would not be sufficient.

Being accurate, useful somewhere, or repository-wide in subject matter is not
enough. A root guide is a routing layer and shared guardrail, not an onboarding
summary, project inventory, architecture digest, product specification, or status
report.

Root guidance may identify workspace mechanics, common command entry points,
shared protected boundaries, generated guidance or skill metadata, and when to
read canonical documents. Keep explanations, schemas, inventories, accepted
decision detail, temporary implementation status, and examples in their owning
documents or narrower guidance.

## Monorepos

- Default to the current directory or user-named subtree. Setup at the workspace
  root updates shared root guidance only unless the user requests broader setup.
- Use workspace configuration and actual project boundaries as evidence; do not
  infer a monorepo or member layout from folder names alone.
- Do not summarize every member in root guidance. Identify how members and their
  nearest guidance are discovered, then place member commands, architecture,
  conventions, and examples with that member.
- Add a nested `AGENTS.md` only when a subtree has material differences. Make it
  additive and do not copy inherited root rules.
- Compare ancestor and nested guidance semantically. When a more specific nested
  rule covers a concern that matters only there, omit the generic root version.
- A nested guide may retain member commands, security invariants, generated-file
  rules, naming boundaries, and canonical patterns that repeatedly guide work in
  that subtree. Put explanations and broad architecture descriptions in member
  documentation.
- Record cross-member coordination only when it changes how work must be performed;
  put substantial explanation in canonical documentation.

## Sparse repositories

When evidence is insufficient, create only lightweight routing: known purpose,
existing instructions, established documentation destination, and installed local
skill location when relevant. Do not invent architecture, commands, conventions,
examples, source trees, dependencies, or empty documentation. Recommend revisiting
setup after representative implementation exists.

## Editing constraints

- Preserve intentional existing content and make targeted changes; use
  `kf-maintain-guidance` when established guidance needs cleanup or relocation.
- Prefer concise positive directions and canonical links. Add prohibitions only for
  a concrete recurring risk and name the safe alternative or exception.
- Describe an established implementation as the preferred current pattern, not as
  an exhaustive ban on alternative designs. Make a design absolute only when
  explicit maintainer intent or a concrete safety or compatibility boundary
  requires it.
- Trace workspace commands through root scripts, task runners, and member scripts.
  State the verified invocation location separately from task ownership; a root
  proxy does not make a task root-owned, and a member-owned task may still have a
  root command.
- Omit temporary statements about missing infrastructure, tests, or features.
  When the absence changes current work, express the durable action or authorization
  boundary instead of recording "not implemented yet" status.
- Do not create one nested file per member, a standard document set, or a new
  layout merely for uniformity.
- Do not modify user-level Codex configuration or global skills.

Success means a fresh session can find the right scope, evidence, commands, and
validation without loading details unrelated to its task.
