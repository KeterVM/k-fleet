---
name: kf-maintain-guidance
description: Audit and reduce established repository guidance, especially AGENTS.md, by removing duplication and stale facts, relocating detail to documentation or narrower scopes, and preserving explicit learned intent. Use for guidance cleanup, reorganization, or updates after project changes. Use kf-setup-project when guidance is missing or substantially incomplete. Do not use for ordinary feature implementation or bug fixing.
---

# Maintain Guidance

Reduce always-loaded instructions while preserving the information that materially
improves future decisions.

## Required passes

Complete the scope, evidence, and operational passes before editing. Do not finish
until the regression pass succeeds.

### 1. Gather

Resolve the repository root and inspect every applicable root, override, and nested
guidance file. Map the effective inherited instructions for each major subtree and
inspect the documents, configuration, commands, and representative code that own
their claims.

### 2. Scope pass

Compare every root rule with nested guidance semantically, not only as exact text.
For each instruction, decide whether it changes behavior often enough to justify
being loaded for every task in that scope and whether the file is its narrowest
owner.

- Keep root guidance to shared navigation, workspace mechanics, common command
  entry points, cross-cutting constraints, and purposeful document links.
- When a nested rule fully covers a concern that matters only in that subtree,
  remove the generic ancestor version. Added local detail does not justify both.
- Nested guidance may retain member commands, security invariants, generated-file
  rules, naming boundaries, and proven local patterns. It must omit inherited root
  rules and substantial explanations that belong in member documentation.
- Move or remove inventories, product or architecture detail, history, and status
  summaries. Keep a detail only when a link cannot prevent a concrete failure.

Record every material candidate as keep, rewrite, move, merge, delete, or verify
before applying edits.

### 3. Evidence pass

Calibrate each rule to its strongest evidence:

1. current explicit user direction or a protected learned rule;
2. an explicitly accepted decision or documented invariant;
3. repeated independent implementation or configuration evidence;
4. a current-status statement or single example.

Only the first three can support a mandatory structural convention. A current
implementation section or one feature may provide a discoverable preferred example
but not a required file layout, composition pattern, or abstraction policy. Rewrite
catalogs of forbidden alternatives as the preferred pattern plus the concrete
condition for diverging. Put genuine ambiguity in `verify` instead of silently
promoting it.

### 4. Operational pass

- Trace commands through root proxies, task runners, and member scripts. State the
  invocation location separately from task ownership; avoid vague labels when a
  verified entry point exists.
- Delete temporary negative status when it changes no action. Otherwise express
  the durable safe action, validation target, or authorization boundary.
- Verify generated-file ownership, protected paths, links, and command working
  directories against current repository evidence.
- Split compound rules that mix independent decisions. Preserve the invariant, not
  every currently rejected alternative.

### 5. Apply within authority

For an audit-only request, report material findings without editing. When edits are
authorized, perform the complete coherent reduction rather than polishing the
existing sections. Prefer relocation or deletion over duplicated summaries.

### 6. Regression pass

Before reporting completion:

- reread the root guidance combined with each nested file;
- confirm every recorded candidate was resolved or remains explicitly `verify`;
- check that no generic ancestor duplicate or unsupported mandate remains;
- validate retained paths and commands; and
- inspect Markdown structure and the final diff for lost blank lines, broken lists,
  orphaned headings, lost intent, and unrelated changes.

## Protected intent

Preserve managed learned-rule markers and do not remove or materially weaken a
learned rule unless current user direction clearly supersedes it or the user
confirms the change. Move learned rules only into another managed learned-rule
section. Do not replace guidance wholesale merely to impose a template, create
supporting files solely to shorten guidance, or modify user-level Codex settings
and global skills.

Success means the effective guidance is demonstrably smaller or clearer, every
remaining mandate has proportionate evidence, and a fresh session loads details
only when its task needs them.
