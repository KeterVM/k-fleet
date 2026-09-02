# Setup

Use this route only when the installed skill is explicitly invoked as
`/kf-orchestrate-work setup`. It initializes K Fleet's compact bootstrap in the
target repository without taking ownership of that repository's other guidance.

## Scope and authority

1. Resolve the target repository root from the active worktree. If there is no
   repository, use the current working directory. Do not target another directory
   unless the user explicitly names it.
2. Inspect the root `AGENTS.md` and any applicable ancestor or nested instruction
   files needed to understand scope. Edit only the target root `AGENTS.md`.
3. Setup may run before Supermemory is configured. That exception authorizes only
   the bootstrap edit and read-only runtime checks; it does not authorize other
   substantive exploration, repository mutation, dependency installation, or
   global configuration changes.

## Managed bootstrap

Manage exactly one block delimited by `<!-- k-fleet:start -->` and
`<!-- k-fleet:end -->`:

```md
<!-- k-fleet:start -->
## K Fleet

Use `kf-orchestrate-work` for substantive repository work. Current user
instructions and scoped repository files override recalled memory. Keep memory
isolated to the active repository and worktree.

Require the configured orchestrator and memory runtime before substantive work.
If either is unavailable or its scope cannot be verified, stop and report the
missing runtime.
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

## Runtime check and completion

After the file edit, use the already-installed integration's status facility to
check that Supermemory is available and scoped to this repository/worktree. Do not
run an installer, download a package, or change user-global configuration merely
to make the check pass.

Read the resulting root `AGENTS.md` and verify that it has one complete managed
block and that unrelated guidance remains intact. Report whether setup created,
updated, or left the file unchanged, plus one of these runtime states:

- ready: the orchestrator and scoped memory runtime are available;
- bootstrap-only: `AGENTS.md` is initialized, but the memory runtime is missing or
  its scope could not be verified, so substantive work remains blocked.

Setup completes after this report. Do not enter another workflow route unless the
user makes a separate substantive request and the normal bootstrap succeeds.
