---
name: kf-setup
description: Initialize or refresh the K Fleet reminder block in a project's root AGENTS.md. Use only when the user explicitly asks to set up or refresh K Fleet.
disable-model-invocation: true
---

# Set up K Fleet

Write or refresh one managed reminder block in the target project's root
`AGENTS.md`. Run it only on an explicit user setup request; installation, missing
guidance, an ordinary coding task, or a newly opened project are not setup requests.

## Method

These are the decisions to settle, in order. One ordering is fixed: settle the
target, method availability, and marker state before writing anything, because a
block in the wrong file, a list naming missing methods, or a guessed marker repair
leaves the project with competing or misleading instructions.

1. **Resolve the target.** Use the active worktree's repository root, or the current
   directory when there is no repository; use another target only when the user names
   it. Read applicable guidance, including ancestor files, without writing to it. In
   K Fleet's own source repository, keep its maintainer contract and report that
   consumer setup does not apply.

2. **Check the methods.** Confirm that every method named in the block is available,
   through supported skill discovery or the installed skill directories; a skill
   that only the user can invoke may be absent from discovery while still installed.
   When any is missing, report which ones and that
   K Fleet needs installing or updating, and write nothing: the installer is the
   user's step.

3. **Classify the destination.**

   | State | Test | Action |
   | --- | --- | --- |
   | No root guide | No `AGENTS.md` and no case variant at the root | Create `AGENTS.md` with `# Repository Instructions` and the block |
   | No markers | `AGENTS.md` exists without k-fleet markers | Append the block after a blank line, keeping all existing content |
   | One well-formed pair | Exactly one start marker before exactly one end marker | Replace only that block, older reminders included; leave the file unchanged when it already matches |
   | Malformed markers | Duplicated, reversed, nested, or incomplete markers | Write nothing; report the marker positions and let the user choose the repair |
   | Ambiguous destination | A case variant such as `Agents.md`, or a symlink that makes the destination or ownership unclear, as one leading outside the target always does | Write nothing; report it and resolve it with the user rather than creating a competing file |

4. **Write the block** in [Managed block](#managed-block) exactly, with no added
   indentation. Keep every byte outside it, including project rules, explicit project
   requirements, and self-reflect blocks.

5. **Finish.** Inspect the resulting file for one complete block and intact
   surrounding guidance. Report the target, whether the file was created, updated, or
   unchanged, and the observed method availability. When a `CLAUDE.md`,
   `.claude/CLAUDE.md`, or `CLAUDE.local.md` exists in the target or above it and
   neither imports `AGENTS.md` (an `@AGENTS.md` line) nor links to it, tell the user
   that Claude Code then reads those files instead of `AGENTS.md`, and that adding
   `@AGENTS.md` to their `CLAUDE.md` loads the reminders; leave that file to them.
   Setup shows the reminders are in place, not that the skills are effective. Setup ends here; continue only with
   substantive work the user included separately in the same request.

## Managed block

Manage exactly one block between `<!-- k-fleet:start -->` and
`<!-- k-fleet:end -->`:

```md
<!-- k-fleet:start -->
## K Fleet

Select methods as needed:

- `kf-discover-product`: investigate uncertain user problems and product value.
- `kf-define-requirements`: clarify intended behavior and acceptance criteria.
- `kf-design-experience`: resolve user journeys, interactions, and presentation.
- `kf-design-codebase`: design or assess structure, responsibilities, and ecosystem reuse.
- `kf-implement`: deliver complete changes with relevant self-checks.
- `kf-write-tests`: add meaningful automated checks when needed.
- `kf-verify`: verify delivery or review code, including ecosystem reuse opportunities.
- `kf-release-product`: prepare or execute authorized delivery and release checks.
- `kf-operate-product`: establish operation or diagnose and recover live service.
- `kf-evaluate-product`: assess user or business outcomes and guide iteration.
- `kf-codify-practices`: on request, turn recurring project procedures and
  constraints into project skills or guidance.

Verify consequential premises using current sources, version-matched official docs,
or runtime evidence; reuse sufficient evidence. Distinguish facts, inferences,
preferences, and uncertainty. Investigate facts directly; ask for missing intent or
material choices. When challenged, recheck premises; revise for changed goals, new
evidence, or reasoning errors, and explain why.

Reuse sufficient design; tests can come first.
Carry authorization across methods; analysis-only and review-only work stays read-only.
Report actual outcomes and material unverified obligations.

Within higher-priority constraints, explicit user instructions override skills;
preserve scope and permission limits. If a skill rule halts work, link and quote it,
distinguishing the rule from your interpretation. Continue independent authorized
work whose prerequisites are met.

Current instructions and repository sources are authoritative; contextual inferences
grant no permission. Use context only within its authorized project/worktree scope.
Run `kf-setup` only on explicit user request.
<!-- k-fleet:end -->
```

## Examples (illustrative)

**Looks like a routine refresh, needs a stop.** "Refresh the K Fleet reminders."
The root `AGENTS.md` is a symlink to `../shared-guides/AGENTS.md`, outside the
repository, used by several projects. Writing through it would change all of them.
Report the link and its destination and ask where the reminders should live; write
nothing.

**Looks risky, is routine.** "Set up K Fleet." `AGENTS.md` has an older K Fleet
block with a shorter method list, and a project rule right after the end marker.
That is one well-formed pair: replace the block, keep the rule byte for byte, and
report the file as updated.

## Boundaries

- Run only on an explicit user request; another skill or the start of a new phase
  never invokes setup.
- Write only the target's root `AGENTS.md`. Global settings, ancestor files, nested
  instruction files, and installers stay untouched, and the rest of the guide keeps
  its content rather than being replaced by a template or inferred conventions.
- Current instructions and repository sources outrank recalled or inferred context,
  which grants no permission. Within higher-priority constraints, explicit user
  instructions override this skill; when one of its rules stops work, quote the rule
  and separate it from your interpretation, and continue independent authorized work.
- Report only what you observed.
