---
name: kf-codify-practices
description: Create or refine a project's own skills and guidance for its recurring procedures, styles, and constraints. Use only when the user explicitly asks to codify a project practice or improve a project skill.
---

# Codify practices

Turn a practice this project repeats into guidance agents follow: a project skill for
a recurring multi-step task, a line in the project's guidance for a rule that always
applies, or a script for steps that never vary. The result must describe how this
project does the work, as its current code shows, so agents stop relearning or
guessing it. Reuse the project's existing skills and guidance when they already
cover the practice.

## Method

These are the decisions to settle, in their usual order; skip any the request
already answers. Two orderings are fixed. Derive the conventions from the project's
current code and records before drafting any guidance, because guidance written from
memory or general best practice describes how projects usually work, not how this
one does. Then propose and let the user confirm before writing any file, because
the user knows which of several existing styles is meant to last.

1. **Name the practice and its task kind.** State the recurring task the guidance
   should serve ("add an endpoint", "add a table") and what agents get wrong or
   relearn without it, from the request, corrections in the conversation, review
   comments, and fix-up commits. Inspect the project's existing skills and guidance
   first; when the practice is covered, decide whether it needs refining instead.

2. **Gather the conventions.** Read several current instances of the task, not one,
   plus the helpers, configuration, lint rules, tests, docs, and history that shape
   them. Record each convention with where it comes from. When instances disagree,
   look for a decision that settles it (a review comment, a migration commit, a lint
   rule, the most recent deliberate change); when nothing does, keep it as a question
   for the user rather than picking one.

3. **Decide where each piece belongs.**

   | Kind | Test | Action |
   | --- | --- | --- |
   | Always-applicable rule | One sentence states it and it holds for every task ("use pnpm", "timestamps are UTC") | Propose a line in the project's root guidance, or a lint rule when it can be checked |
   | Recurring procedure | A recognizable task kind with several steps and project-specific choices | Propose a project skill whose examples point at real project files, ending with a check for the steps agents have missed |
   | Mechanical steps | The steps produce the same result every time | Point the skill at an existing script or generator; propose one only when the need is shown, with its maintenance cost |
   | Covered by a general method | A K Fleet or other installed skill already explains the method | Write only the project-specific part and refer to the general skill by name |
   | Not settled or not a practice gap | Instances conflict with nothing deciding it, it happened once, or the problem is a defect, missing tool, or missing access | Ask the user or report it; codify nothing yet |

   For a refinement, compare the existing skill with current code: replace rules the
   code has moved away from, remove generic text that does not change a project
   decision, and sharpen a description that does not say when to use it. Rules the
   agent did not follow often need a clearer place or trigger, not more words.

4. **Propose, then wait.** This turn writes no files. Present the plan: each piece
   and where it goes (the skill's path, name, and trigger; guidance lines;
   scripts), the conventions with their sources, what is cut from an existing
   skill, and the open questions. Put a new skill in the directory the project's
   agents already load project skills from, under a name outside the `kf-` prefix.
   Close the proposal by saying the guidance stays unproven until it is used, and
   what the next such task should show if it helps, so the user can judge it then.

5. **Write the confirmed change.** Use `skill-creator` when it is available;
   otherwise follow [Writing project skills](references/writing-project-skills.md).
   Apply the user's answers without another confirmation round, and inspect the
   written files against the agreed plan.

6. **Finish** with the paths written, what each covers, the questions resolved or
   still open, and the status: unproven until an agent uses it on a real task, with
   what to observe then (for example, a step agents used to miss now done without a
   reminder). When later use shows a rule misleads agents, revise or remove it,
   keeping the user's own edits.

## Examples (illustrative)

**Looks like a skill, is one line.** "Make a skill for how we log." Every log call
uses `log.with(ctx)` and never `console.log`; there are no further steps or choices.
Propose a line in the root guidance and a lint rule banning `console.log`, and
explain why a skill would add little.

**Looks like one line, is a skill.** "Add a note that feature flags go through
`flags.ts`." Adding a flag also means an owner and expiry date, a default in every
environment file, and an entry in the admin flag list, and two recent flags missed
the environment defaults. Propose a project skill for adding a flag, citing an
existing flag as its example.

## Supporting references

- Writing or restructuring a project skill without `skill-creator`, or refining one
  that agents misuse (steps 3 and 5):
  [Writing project skills](references/writing-project-skills.md).

## Boundaries

- Act only on the user's explicit request, within the current repository/worktree
  and its instructions. Recalled context and conventions from other projects are
  leads to check against this one.
- Current instructions and repository sources outrank recalled or inferred context,
  which grants no permission. Within higher-priority constraints, explicit user
  instructions override this skill; when one of its rules stops work, quote the rule
  and separate it from your interpretation.
- Write only the project's own skills and guidance. Installed third-party and K
  Fleet skills stay unchanged, since updates overwrite them; put project-specific
  additions in the project's skill or guidance and refer to the installed skill by
  name. Preserve unrelated skills and the user's edits.
- Codifying a practice does not complete other work in the same request; carry that
  work through or report it.
- Report only what you observed: writing a skill shows it exists, and only later
  use shows whether it helps.
