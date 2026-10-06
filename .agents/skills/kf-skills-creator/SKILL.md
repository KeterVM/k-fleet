---
name: kf-skills-creator
description: Create a new K Fleet skill or restyle an existing kf-* skill in the K Fleet source repository to the decisions-plus-examples template, with consistency checks and an old-versus-new behavior comparison. Use when the maintainer asks to add, rewrite, restyle, port, or review the structure of a kf-* skill. A repository maintenance capability, not a consumer workflow skill.
---

# K Fleet skills creator

Turn a skill request into a kf-* skill whose method changes the decisions agents
otherwise get wrong, taught through a compact method, a core judgment table, and
short contrasting examples. Use it for new skills and for restyling existing ones.
For a premise you cannot settle from the repository (how a method should work, how
a model treats an instruction), use `kf-research-skills` first.

This skill lives in the source repository's `.agents/skills/`. It stays out of the
public `skills/` catalog, the CLI installation list, and setup reminders.
[Skill authoring guidance](../../../docs/skill-authoring.md) and the repository
`AGENTS.md` are the authoritative rules; this skill applies them.

## Method

These are the decisions to settle, in their usual order; skip any the request
already answers. One ordering is fixed: for a restyle, inventory the old skill's
rules before writing the new text, because lost rules are invisible afterwards.

1. **Decide whether a skill change is the right response.** Name the decision or
   operation the skill should improve and the evidence that agents get it wrong.

   | Situation | Test | Action |
   | --- | --- | --- |
   | New public skill | Distinct selection value: no existing skill's description or references cover the trigger | Ask the maintainer; a new public entry point is an explicit design decision |
   | Capability inside an existing skill's scope | An existing skill's method or reference already owns the topic | Revise that skill or reference instead |
   | Restyle of an existing skill | Same responsibilities, new structure | Proceed under the current request |
   | Project-specific fact or one incident | Not reusable across projects, or seen once | Leave the skill alone; record it in the task or project guidance |

2. **Find the core judgment.** Identify the one or two decisions the skill exists
   for (for `kf-define-requirements`: ask, investigate, or decide). Express them as
   a *kind | test | action* table when the skill has a real classification; write
   prose criteria when a table would be invented.

3. **Inventory before rewriting (restyle).** List every rule in the old SKILL.md
   and references, then mark where each one lands: kept in the body, moved to a
   reference, merged, or removed with a reason. Read
   [Restyle and consistency](references/restyle-and-consistency.md) for the
   inventory format and the checks.

4. **Draft to the template.** Follow [Template](references/template.md): purpose
   and when to skip, the method as decisions with one named fixed ordering if any,
   the core table, two short contrasting examples, references routed by the stuck
   decision, and a Boundaries section of real limits. State behavior positively and
   give the reason; keep prohibitions for demonstrated failures or policy.

5. **Check the draft against itself and the repository.** Every example follows the
   skill's own rules; each fact lives in one place; links resolve inside the skill
   directory; frontmatter name matches the directory; integration surfaces (README
   catalog, setup reminder, workflow-methods, CLI list) match the change. The
   checklist is in [Restyle and consistency](references/restyle-and-consistency.md).

6. **Compare behavior when the change could alter decisions.** Run a small
   old-versus-new comparison with a rubric written before the runs, following
   [Behavior comparison](references/behavior-comparison.md). Skip it for wording
   fixes that change no decision, and say so.

7. **Report and hand off.** Report what changed, the inventory outcome, check
   results, comparison results with their limits, and what remains unproven.
   Commit and push to `main` when the maintainer has authorized it.

   When a comparison shows the new version making a worse decision, revise the part
   of the skill that produced it and rerun that probe. When both versions fail the
   same way, treat it as a possible method gap: report it, and add a rule only when
   the failure repeats across runs or models.

## Examples (illustrative)

**Looks like a new skill, is a revision.** "Add a kf-migrate-data skill for schema
migrations." `kf-release-product` already owns compatibility and data changes in its
readiness-and-migration reference. Propose extending that reference; if the
maintainer still wants a separate public skill, that is their design decision.

**Looks like wording polish, changes decisions.** "Make kf-implement less
negative: replace 'ask and wait before dependent edits' with 'state your assumption
and proceed.'" The new wording changes when agents stop to ask. Treat it as a
behavior change: keep the rule's intent, rephrase positively ("ask, then continue
independent work"), and run the comparison on an ambiguous request.

## Supporting references

- Inventory, self-consistency, duplication, and integration checks (steps 3 and 5):
  [Restyle and consistency](references/restyle-and-consistency.md).
- Section-by-section structure and a filled skeleton (step 4):
  [Template](references/template.md).
- Probe design, rubric, model choice, and how to read results (step 6):
  [Behavior comparison](references/behavior-comparison.md).

## Boundaries

- Work in the K Fleet source repository; keep this skill and its outputs out of
  consumer installation.
- Adding, removing, or renaming a public skill, or changing the installation
  contract, needs the maintainer's explicit decision.
- Keep each public skill self-contained: links stay inside its directory, and other
  skills are referred to by name.
- Claims that a skill improves behavior need observed runs; text review and
  mechanical checks support structure only.
