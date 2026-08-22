---
name: kf-maintain-guidance
description: Audit and maintain established repository guidance, especially AGENTS.md, within the user-requested files, subtree, or repository scope. Use for one-time or periodic audits that remove duplication and stale facts, move detail to narrower owners, and preserve explicit learned intent. Supports monoliths and monorepos, using read-only sub-agents only when independent boundaries make delegation worthwhile. Do not decide or persist a new durable lesson, create missing guidance, implement features, or fix bugs.
---

# Maintain Guidance

Make established guidance smaller, clearer, and correctly scoped without expanding
the user's maintenance request. The parent workflow owns scope, cross-boundary
decisions, all edits, integration, and final verification.

## Scope and topology gate

1. Resolve the requested files, subtree, repository, or workspace. Default to the
   user-named target; a request concerning one member does not authorize sibling or
   workspace-wide maintenance. Inspect the whole repository only when the user asks
   for repository-wide maintenance or the named rule cannot be evaluated without
   its applicable ancestors.
2. Discover guidance inheritance from the target outward: applicable root files,
   overrides, nested files, and canonical documents that own referenced claims.
   Exclude dependencies, generated output, caches, and unrelated worktrees unless
   the requested guidance explicitly governs them.
3. Determine topology from verified workspace configuration and actual ownership,
   not folder names:
   - treat a monolith as one default maintenance unit, splitting only at genuinely
     independent guidance boundaries;
   - in a monorepo, distinguish workspace-wide guidance from member-local guidance
     and preserve member ownership.
4. State the effective scope, excluded siblings or subtrees, topology assumptions,
   authorization, and audit-only or edit mode before applying changes.
   For periodic or unattended runs, remain audit-only unless the saved request
   explicitly authorizes edits, and report only material findings so unchanged
   runs stay quiet.

## Delegation gate

Delegation is an optional runtime mechanism, not a K Fleet workflow dependency.
Use available sub-agents only when current policy permits and at least two
independent guidance boundaries can be audited in parallel with less coordination
cost than direct work.

- Keep ordinary monolith maintenance with the parent. For a large monolith,
  partition only by independently owned modules, never by assigning different
  analytical passes over the same files.
- For repository-wide monorepo maintenance, the parent audits root and
  cross-member guidance; assign non-overlapping member or subtree audits to
  read-only sub-agents.
- Give each sub-agent one explicit scope and require: applicable inherited rules,
  local rules, `keep | rewrite | move | merge | delete | verify` candidates,
  evidence, conflicts outside its boundary, and unknowns.
- Sub-agents do not edit. The parent merges candidate ledgers, resolves semantic
  duplicates and cross-boundary conflicts, and performs every write.
- Do not spawn when scopes overlap, the task is smaller than the handoff overhead,
  or delegation would broaden the user's requested scope.

## Audit

For every in-scope instruction:

1. Decide whether it changes recurring agent behavior and whether its current file
   is the narrowest durable owner.
2. Compare ancestor and nested guidance semantically, not only as exact text.
   Remove an ancestor version when a narrower rule fully owns the concern; nested
   guidance must not repeat inherited rules. Resolve contradictory effective rules
   rather than retaining both formulations.
3. Calibrate mandates to evidence, strongest first:
   - current explicit user direction or a protected learned rule;
   - an accepted decision or documented invariant;
   - repeated independent implementation or configuration evidence;
   - a current-status statement or single example.
4. Allow only the first three to support mandatory structural conventions. Treat a
   single example as a discoverable pattern, not an absolute architecture rule.
5. Trace commands through root proxies, task runners, and member scripts. Verify
   invocation location, task ownership, generated-file ownership, protected paths,
   links, and working directories against current evidence.
6. Reject secrets, credentials, personal data, raw logs, conversation excerpts,
   and other sensitive or transient payloads from always-loaded guidance. Report
   exposed sensitive data without reproducing it, and do not move it into another
   guidance file as a cleanup shortcut.
7. Record each material item as `keep`, `rewrite`, `move`, `merge`, `delete`, or
   `verify`, with its evidence and owner. Keep unresolved ambiguity as `verify`
   rather than promoting it to a rule.

Keep root guidance to shared navigation, workspace mechanics, common command entry
points, cross-cutting constraints, and purpose-labelled links. Move substantial
architecture, inventories, history, explanations, and temporary status to their
canonical documents or narrower owners when retaining them prevents a concrete
failure.

## Apply within authority

- For audit-only requests, report the merged findings without editing.
- When edits are authorized, apply the smallest coherent set within the established
  scope. Prefer deletion, consolidation, or relocation over duplicated summaries.
- Preserve managed learned-rule markers. Do not remove or materially weaken a
  learned rule unless current user direction supersedes it or the user confirms the
  change; move it only into another managed learned-rule section.
- Do not create supporting files solely to shorten guidance, replace guidance with
  a generic template, or modify user-level Codex settings and global skills.
- Evidence that may justify a new durable rule or a change to this method is a
  learning signal for `kf-learn-from-evidence`; maintenance does not decide that
  lesson during cleanup or act merely as the writer for its narrow persistence.

## Regression

1. Reread the edited root guidance combined with every in-scope nested file.
2. Confirm every candidate was resolved or remains explicitly `verify`, no generic
   ancestor duplicate or unsupported mandate remains, and excluded scopes were not
   changed.
3. Validate retained paths, commands, links, Markdown structure, and the final diff.
4. When delegation was useful during audit, sub-agents may independently reread
   their original boundaries after parent edits, still without writing. The parent
   reconciles their reports and owns the readiness result.

Success means the requested effective guidance is demonstrably smaller or clearer,
each remaining mandate has proportionate evidence, monolith or monorepo ownership
is preserved, and no work escaped the authorized scope.
