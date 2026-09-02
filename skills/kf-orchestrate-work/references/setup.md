# Setup

Use this route only when the installed skill is explicitly invoked as
`/kf-orchestrate-work setup`. It initializes K Fleet's compact bootstrap in the
target repository after its required Supermemory integration is ready, without
taking ownership of that repository's other guidance.

## Scope and authority

1. Resolve the target repository root from the active worktree. If there is no
   repository, use the current working directory. Do not target another directory
   unless the user explicitly names it.
2. Before any setup write, use the installed integration's status facility from
   the target root to verify that Supermemory is installed, connected, and scoped
   to this repository/worktree.
3. If Supermemory is absent, unavailable, or its scope cannot be verified, stop
   without modifying `AGENTS.md` or any other project file. Report the failed
   check, direct the user to install or configure the official Codex integration
   at <https://supermemory.ai/docs/integrations/codex>, then restart Codex and
   rerun `/kf-orchestrate-work setup`. Do not run an installer or change global
   configuration unless the user separately authorizes that work.
4. After the runtime check passes, inspect the root `AGENTS.md` and any applicable
   ancestor or nested instruction files needed to understand scope. Edit only the
   target root `AGENTS.md`.

## Managed bootstrap

Manage exactly one block delimited by `<!-- k-fleet:start -->` and
`<!-- k-fleet:end -->`:

```md
<!-- k-fleet:start -->
## K Fleet

Use `kf-orchestrate-work` for substantive repository work. Current user
instructions and scoped repository files override recalled memory. Keep memory
isolated to the active repository and worktree.

Require the configured orchestrator and Supermemory integration before substantive
work. If either is unavailable or the memory scope cannot be verified, stop and
report the missing runtime.
<!-- k-fleet:end -->
```

- If the root file does not exist, create it with `# Repository Instructions`, a
  blank line, and the managed block.
- If the file exists and has no K Fleet markers, append the managed block with a
  single blank-line boundary. Do not rewrite or reorder existing guidance.
- If it contains exactly one well-formed K Fleet marker pair, replace only that
  block so repeated setup is idempotent.
- If markers are duplicated, nested, or incomplete, stop before writing and
  report the ambiguity. Do not guess which content is owned.
- Preserve every unrelated byte as far as the required boundary permits,
  especially project-specific rules and any `self-reflect` managed block. Do not
  create nested `AGENTS.md` files or infer project conventions.

## Completion

Read the resulting root `AGENTS.md` and verify that it has one complete managed
block and that unrelated guidance remains intact. Report whether setup created,
updated, or left the file unchanged and confirm that the orchestrator and scoped
Supermemory integration are ready.

Setup completes after this report. Do not enter another workflow route unless the
user makes a separate substantive request and the normal bootstrap succeeds.
