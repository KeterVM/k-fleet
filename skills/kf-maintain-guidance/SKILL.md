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
   matter within that subtree. Compare ancestor and descendant rules semantically,
   not only as exact text.
3. Verify commands, paths, architecture claims, and other factual guidance against
   current evidence. Distinguish accepted decisions from current-status notes and
   isolated examples. Treat managed learned rules as explicit user intent, not as
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

Nested guidance may be denser when member-specific commands, security invariants,
generated-file rules, naming boundaries, or canonical implementation patterns
repeatedly affect work in that subtree. It must still omit inherited root rules and
detail that belongs in member documentation.

When a specialized nested rule fully covers a concern that matters only in that
subtree, remove the generic ancestor version. Different wording or added local
detail does not make both copies valuable.

Move or remove member inventories, detailed product requirements, explanations of
accepted decisions, historical context, and temporary statements about what does
not exist yet. Keep an exceptional root-level detail only when omitting it creates
a concrete cross-repository failure mode that a link cannot prevent.

Treat an existing implementation pattern as a preferred example unless evidence
establishes it as a durable constraint. Rewrite catalogs of forbidden abstractions
or designs as the current preferred pattern plus the concrete condition that would
justify diverging. Do not require an explicit user request for an ordinary design
choice unless that authority boundary is itself explicit maintainer intent.

A single implementation or a document section labelled current status supports a
discoverable example, not a repository convention. Require an explicit accepted
decision, repeated independent examples, or maintainer direction before turning
its file layout or composition into a mandatory rule.

Trace commands through root proxies, task runners, and member scripts. Describe
where a command is invoked separately from which member owns the task; do not use
vague labels such as "member-level command" when a verified root entry point exists.

Delete temporary negative status when it does not change an action. When it does,
rewrite it as durable operational guidance, such as which validation is safe to
run or what authorization is required, rather than preserving "not implemented
yet" commentary.

## Editing constraints

- Preserve targeted content and managed learned-rule markers; do not replace a
  guidance file wholesale merely to impose a preferred template.
- Do not remove or materially weaken learned intent unless current user direction
  clearly supersedes it or the user confirms the change. Move such rules only into
  another managed learned-rule section.
- Prefer relocation or deletion over polished duplication. Do not summarize every
  linked document in the root file.
- Split or shorten compound rules that mix independent decisions; preserve the
  actual invariant rather than every currently rejected alternative.
- Do not create nested guidance or supporting documents solely to make the root
  shorter; create them only where the content has a real owner and future reader.
- Do not modify user-level Codex configuration or global skills.

Success means the effective guidance has less always-loaded context, preserves
explicit intent and necessary safeguards, and routes a fresh session to details
only when the task needs them.
