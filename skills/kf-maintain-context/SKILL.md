---
name: kf-maintain-context
description: Initialize, audit, and maintain the effective repository context Codex receives through AGENTS.md, AGENTS.override.md, configured fallback instruction files, and their routed canonical documents. Use to create missing project guidance, reduce stale or duplicated always-loaded context, correct scope or precedence, and verify what representative working directories actually load. Do not invent new team policy, persist an unproven durable lesson, implement features, or fix product bugs.
---

# Maintain Context

Keep repository context accurate, compact, discoverable, and correctly scoped.
Treat `AGENTS.md` as the usual project entry point, not as the only context
artifact. The parent workflow owns scope, every write, cross-boundary decisions,
integration, and final verification.

## Authority and target

1. Resolve the user-named files, subtree, repository, workspace, or Codex profile.
   A request about one member does not authorize sibling, workspace-wide, or
   user-global edits. Inspect applicable ancestors when needed to compute effective
   context, but keep them read-only unless they are in the authorized edit scope.
2. Distinguish the requested mode:
   - audit or review: report findings without editing;
   - initialize, create, fix, update, or explicitly authorized maintenance: apply
     the smallest coherent context change;
   - periodic or unattended work: remain audit-only unless the saved request
     explicitly authorizes edits.
3. Identify representative working directories whose effective context must hold.
   Use verified workspace configuration and actual ownership, not folder names, to
   distinguish a monolith from independent monorepo members.

## Delegation gate

Delegation is optional and must not broaden the maintenance scope. Use read-only
sub-agents only when current policy permits and at least two non-overlapping,
independently owned context boundaries can be audited with less coordination cost
than direct work.

- Keep ordinary monolith maintenance with the parent. Size or unfamiliarity alone
  does not justify delegation.
- In a repository-wide monorepo audit, the parent owns root and cross-member
  context; evaluators may inspect separate members or subtrees.
- Give each evaluator one explicit boundary and require inherited instructions,
  local instructions, evidence-backed candidates, conflicts outside its boundary,
  and unknowns.
- Evaluators do not edit. The parent resolves duplicates and conflicts, performs
  every write, integrates the result, and owns final verification.
- Do not delegate overlapping scopes or work smaller than the handoff overhead.

## Build the effective instruction chain

For each representative working directory, model Codex discovery before judging
content:

1. Account for the active Codex home (`CODEX_HOME` when set, otherwise the default)
   and its first non-empty `AGENTS.override.md` or `AGENTS.md`. Treat this as
   inherited context; do not modify global guidance without explicit global scope.
2. Resolve the project root, then walk from it to the working directory. In each
   directory, select at most one existing instruction file in this order:
   `AGENTS.override.md`, `AGENTS.md`, then configured
   `project_doc_fallback_filenames` in their configured order. If the selected file
   is empty or whitespace-only, record that it contributes no instructions but
   still suppresses lower-precedence candidates in that directory.
3. Combine selected project files from root to leaf. Later, narrower instructions
   take precedence over earlier broad instructions. Record ignored, shadowed, and
   empty candidates rather than treating them as active context.
4. Read the effective `project_doc_max_bytes` value, using Codex's current default
   only when no override is configured. Measure the combined project instruction
   chain separately from user-level guidance and identify content that can be
   truncated before claiming that a project rule is active.
5. Separate always-loaded instructions from routed context. Canonical documents,
   skills, examples, and source files linked by an instruction file are available
   on demand; they are not part of the startup instruction chain merely because
   they exist.

If runtime behavior or configuration semantics are uncertain, verify them against
the installed Codex version or current official documentation instead of relying
on a remembered default.

Read only the configuration keys required for discovery and size decisions. Use a
targeted query or parser and redact values that are not needed; do not print or
copy an entire user-level configuration file because it may contain credentials or
unrelated sensitive settings.

## Decide whether to initialize

When no usable project instruction entry exists, determine whether evidence-backed
repository context would prevent recurring navigation, command, scope, safety, or
verification failures.

- When creation is authorized and useful, create the narrowest conventional entry,
  normally a root `AGENTS.md`. Add nested files only for genuinely different
  subtree rules.
- Do not create an empty file, generic template, directory-by-directory mirror, or
  `AGENTS.override.md` merely because no file exists. Overrides are for intentional
  replacement at that scope, not the default bootstrap mechanism.
- Derive instructions from explicit user direction, accepted decisions, current
  configuration, repeated implementation evidence, and verified commands. Do not
  infer team policy from a single example or temporary state.
- Context maintenance owns discoverability and placement of verified facts,
  commands, ownership boundaries, and already-authorized policy. A candidate rule
  that changes future agent behavior belongs to `kf-learn-from-evidence` unless the
  user has already explicitly decided and authorized that exact rule and scope.
  Context maintenance does not turn repository patterns or cleanup observations
  into new policy.
- An ownership map is a fact; a mandate to notify owners, stay within their area,
  or obtain approval is policy. Record the former without inferring the latter.
- Treat a direct user mandate as an already-decided policy within its authorized
  scope even when the user cites one example; do not silently overrule it. Treat a
  request to infer, recommend, or decide whether a pattern should become permanent
  as a learning candidate whose evidence must be evaluated first.

## Audit the context

For every active instruction and routed context entry:

1. Decide whether it changes recurring agent behavior and whether its current file
   is the narrowest durable owner.
2. Compare effective ancestor and nested instructions semantically. Remove broad
   duplicates when a narrower rule owns the concern, and resolve contradictory
   effective rules rather than retaining both formulations.
3. Verify commands, paths, links, working directories, generated-file ownership,
   protected paths, architecture claims, and package boundaries against current
   repository evidence.
4. Keep root context to shared navigation, workspace mechanics, common command
   entry points, cross-cutting constraints, and purpose-labelled links. Move
   substantial inventories, architecture, history, explanations, and temporary
   status to canonical documents or narrower owners when they remain useful.
5. Reject secrets, credentials, personal data, raw logs, conversation excerpts,
   and other sensitive or transient payloads from instruction files.
6. Record each material item as `keep`, `create`, `rewrite`, `move`, `merge`,
   `delete`, or `verify`, with its evidence, effective scope, and owner. Keep
   unresolved ambiguity as `verify` rather than promoting it to a rule.

## Apply within authority

- Apply the smallest coherent set that fixes the effective context, including a
  missing instruction entry when creation is authorized.
- Prefer deletion, consolidation, relocation, or a purposeful link over duplicated
  summaries. Do not create supporting documents solely to make an instruction file
  shorter.
- Preserve managed learned-rule markers. Do not remove or materially weaken a
  learned rule unless current user direction supersedes it or the user confirms the
  change; move it only into another managed learned-rule section.
- Do not modify user-level Codex settings, global guidance, or global skills unless
  the user explicitly includes that scope.
- Do not change production behavior while maintaining context. Route discovered
  implementation defects to the applicable execution workflow.

## Verify effective context

1. Recompute the selected instruction chain, precedence, and combined byte usage
   for the repository root and every representative nested working directory.
2. Confirm active files are non-empty and discoverable, fallback names are actually
   configured, same-directory overrides shadow the intended file, narrower rules
   win, and critical instructions remain before the effective byte limit.
3. Validate retained paths, commands, links, Markdown structure, managed markers,
   and the final diff. Confirm excluded scopes were not changed.
4. When the Codex executable is available and a fresh local run is safe, verify the
   loaded instruction sources from the root and representative nested directories.
   Use a non-mutating prompt and prohibit approvals. If runtime verification cannot
   run, report that limitation rather than claiming the effective chain was proven.
5. When independent boundaries justified read-only delegation during audit,
   evaluators may reread their original scopes after parent edits. The parent still
   owns reconciliation and readiness.

Success means every representative directory receives sufficient, evidence-backed
context through the intended discovery chain; missing entry points are created when
authorized and useful; precedence and size limits are respected; always-loaded
instructions stay compact; and no work escapes the authorized scope.
