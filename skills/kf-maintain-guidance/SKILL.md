---
name: kf-maintain-guidance
description: Audit and reduce established repository guidance, especially AGENTS.md, by removing duplication and stale facts, relocating detail to documentation or narrower scopes, and preserving explicit learned intent. Use for guidance cleanup, reorganization, or updates after project changes. Use kf-setup-project when guidance is missing or substantially incomplete. Do not use for ordinary feature implementation or bug fixing.
---

# Maintain Guidance

Reduce the always-loaded instruction set while preserving the information that
materially improves future decisions.

## Workflow

1. Resolve the repository root and inspect applicable root, override, and nested
   guidance together with the documents and configuration that own referenced
   facts.
2. Map inheritance and major repository boundaries before judging scope. A root
   rule reaches every subtree; a nested rule should contain only differences that
   matter within that subtree.
3. Verify commands, paths, architecture claims, and other factual guidance against
   current evidence. Treat managed learned rules as explicit user intent, not as
   facts that implementation drift can silently replace.
4. Apply the retention test below to every material instruction. Classify it as
   keep, rewrite, move, merge, delete, or verify.
5. Match the user's authority. For an audit, report only material findings. When
   edits are authorized, perform the coherent reduction instead of merely
   rewording the existing sections.
6. Re-read the effective inherited guidance, validate retained links and commands,
   and review the diff for lost intent, duplicated destinations, and unrelated
   changes.

## Retention test

Keep an instruction in an `AGENTS.md` only when all of these are true:

- it changes how an agent should act, choose, validate, or avoid harm;
- it is needed often enough to justify being loaded for every task in that scope;
- that file is the narrowest scope that owns it; and
- a short link to a canonical document would not provide equally safe routing.

Repository-wide truth alone does not justify root placement. In a monorepo, the
root should usually contain only navigation, workspace mechanics, shared commands,
cross-cutting constraints, and pointers that tell agents when to load deeper
documentation or nested guidance.

Move or remove content such as member inventories, member-specific commands or
architecture, detailed product requirements, explanations of accepted decisions,
historical context, and temporary statements about what does not exist yet. Keep
an exceptional root-level detail only when omitting it creates a concrete
cross-repository failure mode that a link cannot prevent.

## Editing constraints

- Preserve targeted content and managed learned-rule markers; do not replace a
  guidance file wholesale merely to impose a preferred template.
- Do not remove or materially weaken learned intent unless current user direction
  clearly supersedes it or the user confirms the change. Move such rules only into
  another managed learned-rule section.
- Prefer relocation or deletion over polished duplication. Do not summarize every
  linked document in the root file.
- Do not create nested guidance or supporting documents solely to make the root
  shorter; create them only where the content has a real owner and future reader.
- Do not modify user-level Codex configuration or global skills.

Success means the effective guidance has less always-loaded context, preserves
explicit intent and necessary safeguards, and routes a fresh session to details
only when the task needs them.
