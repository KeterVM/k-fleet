---
name: kf-maintain-guidance
description: Audit and maintain existing repository-level Codex guidance, especially AGENTS.md. Use when the user asks to clean up, deduplicate, reorganize, update, or remove stale project guidance, including after architecture or tooling changes. Use kf-setup-project when guidance is missing or substantially incomplete. Do not use for ordinary feature implementation or bug fixing.
---

# Maintain Guidance

Keep repository guidance small, accurate, actionable, and scoped to the work that
needs it.

## Workflow

1. Resolve the repository root and inspect every applicable `AGENTS.md`, nested
   guidance, `AGENTS.override.md`, project documentation, configuration, and
   canonical examples before judging existing instructions.
2. Map the effective hierarchy. Root rules apply repository-wide; nested rules
   should exist only for materially different subtree needs.
3. Verify factual guidance against current paths, commands, tooling, architecture,
   and repeated code evidence. Treat explicit learned rules as user intent rather
   than facts that code drift can silently supersede.
4. Classify material guidance as keep, rewrite, move, merge, delete, or verify.
   Look for contradictions, semantic duplicates, stale facts, vague or obvious
   advice, excessive detail, misplaced scope, and rules better represented by
   focused documentation or canonical examples.
5. Match the requested authority. For review-only requests, report findings without
   editing. When maintenance is authorized, apply the smallest coherent cleanup:
   merge duplicates, correct inaccuracies, move mis-scoped rules, and remove
   ordinary guidance whose obsolescence or redundancy is supported by evidence.
6. Preserve explicit learned intent. Do not remove or materially weaken a learned
   rule unless current user direction clearly supersedes it or the user confirms the
   change. Preserve any markers that identify managed learned-rule sections.
7. Validate referenced paths and commands, inspect the effective guidance after
   inheritance, and review the final diff for lost intent or unrelated changes.
8. Report what was kept, rewritten, moved, merged, deleted, or left for
   confirmation, along with any remaining uncertainty.

## Constraints

- Do not replace guidance files wholesale when targeted edits can preserve intent.
- Keep root guidance limited to repository-wide context; prefer the narrowest
  applicable nested scope for specialized rules.
- Keep `AGENTS.md` a map and constraint set, not a complete project manual or a
  history of past corrections.
- Do not add new guidance merely because maintenance was requested. Every retained
  or added instruction needs current evidence and future decision value.
- Do not modify user-level Codex configuration or global skills.

Success means the effective guidance is smaller or clearer where possible, remains
faithful to explicit user intent, and helps a fresh session make correct decisions.
