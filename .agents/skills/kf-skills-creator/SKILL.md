---
name: kf-skills-creator
description: Create a new K Fleet skill, or restyle, trim, or rephrase an existing kf-* skill in the K Fleet source repository, using the decisions-plus-examples template, consistency checks, and an old-versus-new behavior comparison. Use when the maintainer asks to add, rewrite, restyle, trim, rephrase, port, or review the structure of a kf-* skill. A repository maintenance capability, not a consumer workflow skill.
---

# K Fleet skills creator

Turn a skill request into a kf-* skill whose method changes the decisions agents
otherwise get wrong, taught through a compact method, a core judgment table, and
short contrasting examples. Use it for new skills, restyles, and edits that trim or
rephrase existing rules. For a premise you cannot settle from the repository (how a
method should work, how a model treats an instruction), use `kf-research-skills`
first.

This skill lives in the source repository's `.agents/skills/`. It stays out of the
public `skills/` catalog, the CLI installation list, and setup reminders.
[Skill authoring guidance](../../../docs/skill-authoring.md) and the repository
`AGENTS.md` are the authoritative rules; this skill applies them.

## Method

These are the decisions to settle, in their usual order; skip any the request
already answers. Two orderings are fixed, because what they protect is invisible
afterwards: inventory the old rules before writing new text (lost rules), and fix
the probes and rubric before drafting (a rubric written after the draft tends to
test what the draft already does well).

1. **Decide whether a skill change is the right response.** Name the decision or
   operation the skill should improve and the evidence that agents get it wrong.

   | Situation | Test | Action |
   | --- | --- | --- |
   | New public skill | Distinct selection value: no existing skill's description or references cover the trigger | Ask the maintainer; a new public entry point is an explicit design decision |
   | Capability inside an existing skill's scope | An existing skill's method or reference already owns the topic | Revise that skill or reference instead |
   | Restyle, trim, or rephrase | Same responsibilities, new structure or wording | Proceed under the current request |
   | Project-specific fact or one incident | Not reusable across projects, or seen once | Leave the skill alone; record it in the task or project guidance |

2. **Find the core judgment.** Identify the one or two decisions the skill exists
   for (for `kf-define-requirements`: ask, investigate, or decide). Express them as
   a *kind | test | action* table when the skill has a real classification; write
   prose criteria when a table would be invented.

3. **Inventory the rules you touch.** For a restyle, list every rule in the old
   SKILL.md and references; for a trim or rephrase, list the rules being removed or
   reworded. Mark where each lands: kept, moved to a reference, merged, or removed
   with a reason. Read [Restyle and consistency](references/restyle-and-consistency.md)
   for the format, what counts as covered elsewhere, and the history check.

4. **Fix the comparison before drafting** when the change could alter decisions:
   write the probes and rubric now, following
   [Behavior comparison](references/behavior-comparison.md). Skip it for wording
   fixes that change no decision, and say so.

5. **Draft to the template.** Follow [Template](references/template.md): purpose
   and when to skip, the method as decisions with any named fixed ordering, the core
   table, two short contrasting examples, references routed by observable events
   and the stuck decision, and a Boundaries section of real limits. State behavior
   positively and give the reason; keep prohibitions for demonstrated failures or
   policy.

6. **Check the draft against itself and the repository.** Every example follows the
   skill's own rules; each fact lives in one place; links resolve inside the skill
   directory; frontmatter name matches the directory; integration surfaces match the
   change, or are listed for a later sync when the maintainer has deferred them. The
   checklist is in [Restyle and consistency](references/restyle-and-consistency.md).

7. **Run the comparison** fixed in step 4 against the last release, each run in a
   clean context, with blind scoring.

8. **Report and hand off.** Report what changed, the inventory outcome, check
   results, comparison results with their limits, deferred integration surfaces, and
   what remains unproven. Put a short comparison summary in the commit message, since
   the scratch files are discarded. Commit and push to `main` when the maintainer has
   authorized it.

   When a comparison shows the new version making a worse decision, revise the part
   of the skill that produced it, rerun that probe, and add one fresh probe so the
   fix is not tuned to a single case. When both versions fail the same way, treat it
   as a possible method gap: report it, and add a rule only when the failure repeats
   across runs or models.

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

- Inventory, coverage and history checks, self-consistency, and integration
  surfaces (steps 3 and 6): [Restyle and consistency](references/restyle-and-consistency.md).
- Section-by-section structure and a filled skeleton (step 5):
  [Template](references/template.md).
- Probe design, rubric, blind scoring, and how to read and record results
  (steps 4 and 7): [Behavior comparison](references/behavior-comparison.md).

## Boundaries

- Work in the K Fleet source repository; keep this skill and its outputs out of
  consumer installation.
- Adding, removing, or renaming a public skill, or changing the installation
  contract, needs the maintainer's explicit decision.
- A rule the repository records as the maintainer's chosen policy changes only by
  their decision; an audit or restyle may propose the change and its reason.
- Keep each public skill self-contained: links stay inside its directory, and other
  skills are referred to by name.
- Claims that a skill improves behavior need observed runs; text review and
  mechanical checks support structure only.
