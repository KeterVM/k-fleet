---
name: kf-maintain-context
description: Initialize, audit, or maintain the effective repository context Codex receives through AGENTS.md, overrides, configured fallback instruction files, and routed canonical documents. Use to create missing guidance, reduce stale or duplicated context, correct scope or precedence, and verify representative working directories. Do not invent policy, persist an unproven lesson, implement features, or fix product bugs.
---

# Maintain Context

Keep repository context accurate, compact, discoverable, and correctly scoped.
Treat `AGENTS.md` as the usual project entry point, not the only Context artifact.
The parent workflow owns scope, every write, cross-boundary decisions,
integration, and final verification.

## Authority and target

1. Resolve the user-named files, subtree, repository, workspace, or Codex profile.
   A request about one member does not authorize sibling, workspace-wide, or
   user-global edits. Inspect applicable ancestors when needed to compute effective
   Context, but keep them read-only unless included in the edit scope.
2. Distinguish the requested mode:
   - audit or review: report findings without editing;
   - initialize, create, fix, update, or explicitly authorized maintenance: apply
     the smallest coherent Context change;
   - periodic or unattended work: remain audit-only unless the saved request
     explicitly authorizes edits.
3. Identify representative working directories whose effective Context must hold.
   Use verified workspace configuration and actual ownership, not folder names, to
   distinguish a monolith from independent monorepo members.

## Delegation gate

Compose `kf-delegate-subtask` without broadening scope when current policy permits
and at least two non-overlapping Context boundaries can be audited with less
coordination cost than direct work. Prefer the optional read-only
`kf_context_auditor` companion agent when available; otherwise use an explorer or
reviewer role.

- Keep ordinary monolith maintenance with the parent. Size or unfamiliarity alone
  does not justify delegation.
- In a repository-wide monorepo audit, the parent owns root and cross-member
  Context; evaluators may inspect separate members or subtrees.
- Give each sub-agent one explicit boundary and require inherited instructions,
  local instructions, evidence-backed candidates, conflicts, and unknowns.
- Sub-agents do not edit. The parent resolves duplicates and conflicts, performs
  every write, integrates results, and owns final verification.

## Load the relevant procedure

- To initialize Context or determine what a working directory actually receives,
  read [instruction discovery](references/discovery-chain.md).
- To audit current Context or verify any Context mutation, read
  [Context audit and verification](references/context-audit.md).
- To place direct already-decided policy or a contract from
  `kf-learn-from-evidence`, read
  [persistence contracts](references/persistence-contract.md).

Read only the procedures required by the current mode. A combined audit and update
normally needs discovery before editing and audit verification afterward.

## Apply within authority

- Apply the smallest coherent set that fixes effective Context, including a
  missing instruction entry when creation is authorized.
- Prefer deletion, consolidation, relocation, or a purposeful link over duplicated
  summaries. Do not create supporting documents solely to make an instruction file
  shorter.
- Preserve managed learned-rule markers. Do not remove or materially weaken a
  learned rule unless current user direction supersedes it or the user confirms the
  change; move it only into another managed learned-rule section.
- Do not modify user-level Codex settings, global guidance, or global skills unless
  the user explicitly includes that scope.
- Do not change production behavior while maintaining Context. Route discovered
  implementation defects to the applicable execution workflow.

Success means every representative directory receives sufficient, evidence-backed
Context through the intended discovery chain; missing entry points are created when
authorized and useful; precedence and size limits are respected; always-loaded
instructions stay compact; and no work escapes the authorized scope.
