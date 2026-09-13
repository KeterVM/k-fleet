---
name: kf-setup
description: Initialize or refresh K Fleet reminders in a project's root AGENTS.md only when the user explicitly requests setup.
---

# Set up K Fleet

Run only on an explicit user setup request. Installation, missing guidance, a
normal coding task, or a newly opened project must not trigger setup automatically.
This skill configures project reminders; the main agent coordinates ordinary work
directly using the method skills.

Within higher-priority constraints, explicit user instructions override skill
guidance. Preserve actual scope and authorization limits. If a skill rule causes
you to pause or leave work unfinished, link to its file, quote the rule, and
distinguish its requirement from your interpretation. Continue independent
authorized work only where its prerequisites are met.

## Resolve the target and runtime

Resolve the active worktree's repository root, or the current directory when no
repository exists. Use another target only when explicitly named. Inspect
applicable guidance without treating ancestor files as writable.

Before writing, use the installed Supermemory integration's status surface from
the target root to verify connectivity, canonical repository/worktree scope, and
automatic recall/capture. A direct integration is sufficient; optional MCP is not
a separate prerequisite. If unavailable or unscoped, make no project changes,
report the missing capability, and direct the user to configure the official Codex
integration before rerunning setup. Do not install the backend or change global
configuration as part of setup.

Check that the six method skills named below are available through supported skill
discovery. If a method is missing, report it and the need to install or update
K Fleet, without automatically invoking an installer or writing incomplete guidance.

Edit only the root `AGENTS.md` (the standard filename, including on case-sensitive
filesystems). If an existing case variant or symlink makes the destination or
ownership ambiguous, resolve that ambiguity before writing; do not create competing
instruction files or write through a link outside the target. When operating in
K Fleet's own source repository, preserve its complete maintainer contract and
report that consumer setup does not apply.

## Write the managed reminder

Manage exactly one block between `<!-- k-fleet:start -->` and
`<!-- k-fleet:end -->`:

```md
<!-- k-fleet:start -->
## K Fleet

The main agent owns scope, decisions, integration, and completion. Select methods
as needed, without a fixed sequence or one agent per skill:

- `kf-define-requirements`: clarify intended behavior and acceptance criteria.
- `kf-design-codebase`: resolve open responsibilities, interfaces, and structure.
- `kf-implement`: deliver complete changes with relevant self-checks.
- `kf-write-tests`: add meaningful automated checks when needed.
- `kf-verify`: assess delivery when requested or material evidence is missing.
- `kf-evolve-skills`: assess or improve guidance when requested, or address a
  reusable capability gap; judge changes through actual use.

Verify consequential premises using current sources, version-matched official docs,
or runtime evidence; reuse sufficient evidence. Distinguish facts, inferences,
preferences, and uncertainty. Investigate facts directly; ask for missing intent or
material choices. When challenged, recheck premises; revise for changed goals, new
evidence, or reasoning errors, and explain why.

Reuse sufficient design; tests can come first. Delegate only useful, authorized,
bounded work with non-overlapping writes; inspect results and retain responsibility.
Carry authorization across methods; analysis-only and review-only work stays read-only.
Report actual outcomes and material unverified obligations.

Within higher-priority constraints, explicit user instructions override skills;
preserve scope and permission limits. If a skill rule halts work, link and quote it,
distinguishing the rule from your interpretation. Continue independent authorized
work whose prerequisites are met.

Require connected, scoped Supermemory recall/capture before substantive work;
current instructions and repository sources override memory. Isolate memory to this
repository/worktree. Stop work requiring a missing runtime or method and report the
gap; do not invent fallbacks. Run `kf-setup` only on explicit user request.
<!-- k-fleet:end -->
```

If the file is absent, create it with `# Repository Instructions` and the block.
If no markers exist, append the block with a blank-line boundary, preserving all
existing content. If exactly one well-formed pair exists, replace only that block,
including a legacy reminder requiring kf-orchestrate-work. If the block already
matches, leave the file unchanged.

For duplicated, reversed, nested, or incomplete markers, stop before writing and
report the ambiguity. Preserve unrelated bytes, project rules, and self-reflect
blocks; do not infer new conventions, create nested instruction files, or replace
the whole guide with a template.

## Finish setup

Inspect the resulting root file for one complete block and preservation of
unrelated guidance. Report the target, whether it was created, updated, or
unchanged, and the observed runtime and method availability. Do not claim that
setup proves skill effectiveness.

Setup ends here unless the user separately included substantive work in the
request. Future tasks use the root reminders and selected methods directly;
never invoke setup automatically to begin another phase.
