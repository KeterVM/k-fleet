---
name: kf-implement
description: Implement an understood software change as complete, maintainable code, including integration and relevant self-checks. Use when the intended behavior is settled enough to write code, including fixes, refactors, renames, and replacements.
---

# Implement

Turn an understood request into working behavior through its real entry points,
with code a maintainer can follow. Reuse an existing brief or design when it
answers the open questions; a bounded edit with settled behavior goes straight to
code and needs no extra reading.

## Method

These are the decisions to settle, in their usual order; skip any the request
already answers. One ordering is fixed: meet the contract and put each rule with
its owner before minimizing the diff, because a smaller diff cannot repair an
unmet obligation or a misplaced rule.

1. **Ground the change.** Name the observable outcome and the evidence that will
   show it works. Separate facts (code, config, data, docs, the user) from
   assumptions, and investigate technical unknowns that could invalidate the
   change. Read the applicable project instructions, then the affected paths,
   nearby code, configuration, and tests. Follow intentional project conventions;
   a known defect is not a convention.

2. **Classify each open point.**

   | Kind | Test | Action |
   | --- | --- | --- |
   | Product intent | Plausible readings change the target, scope, behavior, data meaning, or a compatibility obligation, and established decisions do not settle it | Ask, then continue work that holds under every answer; keep the guessed reading out of code and tests |
   | Ownership or contract | The choice decides which module owns a rule or state, or changes what other modules call or rely on | Decide it from a traced change and state it; when it reshapes cross-module contracts, revisit the design |
   | General-purpose mechanism | The change adds or reworks parsing, validation, retries, caching, scheduling, or similar | Check the standard library, framework, installed dependencies, then maintained mainstream libraries; keep custom code for a concrete reason |
   | Rename or replacement | A name, field, class, or entry point is superseded | Migrate every in-scope consumer and remove the old path; keep a bridge only for a named consumer or data that cannot move now |
   | Routine choice | Every option meets the same contracts at comparable cost | Choose and move on; mention it when a reviewer would ask |

   Judge by consequence, not size: a one-word field rename read by a separately
   released client is a compatibility question; a 400-line extraction with stable
   callers is routine.

3. **Build through the real entry points.** Put each rule and piece of state with
   its owner, reusing existing code where it fits. Choose the form, name, and
   location from that responsibility, in project vocabulary. Complete callers,
   wiring, configuration, failure handling, and cleanup, and keep authorization,
   transaction, concurrency, resource-lifetime, and compatibility guarantees
   intact. Update usage documentation when the change alters how the code is used
   or operated. Keep the diff on the requested behavior and its necessary support.

4. **Check the result.** Run the relevant tests and configured format, lint, and
   type checks; exercise real boundaries for wiring and dependency claims, since
   mocks and a build can pass while integration fails. Reuse results whose version,
   environment, and scope still apply. Add tests where they protect meaningful
   behavior; dedicated test-writing and verification methods are optional. Read the
   final diff against the contract: names match
   behavior, callers respect boundaries, no rule is mixed into an unrelated owner
   or scattered across modules, and searches for superseded names come back clean.
   Fix what the change caused and recheck only what that fix touches.

5. **Finish** when required checks pass, material obligations have evidence, and no
   issue caused by the change remains. Report the change, decisive results, and
   limits in the conversation, with no fixed report format; name blockers and
   unverified obligations as such. Speculative improvements and stylistic polish
   wait for a request rather than delaying an adequate change.

   When a check fails, separate a code defect from an environment or access
   problem before changing code. When repeated exceptions, mappings, or fragile
   coordination show up, revisit the ownership or design decision that produced
   them. When the user overrides a choice you classified as routine, re-run step 2
   for related points.

## Examples (illustrative)

**Looks like a small swap, is a migration.** "Replace `LegacyMailer` with the new
`NotificationClient`." Making `LegacyMailer` forward to the new client changes one
file and passes every test, but leaves two owners for sending mail. Move the six
callers to `NotificationClient` and delete `LegacyMailer`. If a separately deployed
worker still imports it, that worker is a named consumer: keep a bridge for it
alone, state the removal condition, and report the migration as unfinished.

**Looks like it needs a decision, is routine.** "Add a `--json` flag to the
`report` command." Output format and naming look like questions for the user, but
the command already builds a typed result and the CLI framework handles flags.
Serialize that result with the standard library, keep its field names, add a test
on the flag, and state the choice.

## Supporting references

Read a reference only for the decision that is stuck:

- A new or extended component, unclear ownership, naming, placement, or an
  extraction (steps 2–3): [Structure and naming](references/structure-and-naming.md).
- A general-purpose mechanism or a new dependency (step 2):
  [Libraries and dependencies](references/libraries-and-dependencies.md).
- A rename, replacement, wrapper, alias, or compatibility bridge (steps 2–4):
  [Migrations and compatibility](references/migrations-and-compatibility.md).
- Material dependencies, failed attempts, blockers, or review feedback (steps 4–5):
  [Execution and feedback](references/execution-and-feedback.md).

## Boundaries

- Work within the current repository/worktree, project instructions, and existing
  authorization; read-only requests stay read-only. Pause only work that depends on
  missing evidence, capabilities, or user intent, and continue the rest.
- Current instructions and repository sources outrank recalled or inferred context,
  which grants no permission. Within higher-priority constraints, explicit user
  instructions override this skill; when one of its rules stops work, quote the
  rule and separate it from your interpretation.
- A stated assumption, a default option, or existing code leaves product intent
  open; dependent code and tests wait for the answer.
- Clarifying intent is a request for information, not an approval gate: once
  answered, finish the authorized work.
- Report only what you observed; passing checks alone do not establish
  maintainability or production readiness.
