---
name: kf-research-skills
description: Research evidence and applicable methods for creating, assessing, or materially revising skills in the K Fleet source repository. A repository maintenance capability, not a consumer workflow skill.
---

# Research K Fleet skills

Support a concrete skill-maintenance decision with traceable evidence, applicable
engineering methods, and explicit uncertainty. Use when a proposed change depends
on unsettled engineering or agent-behavior premises. Reuse adequate research;
routine wording fixes need no new investigation.

This skill belongs to this source repository's `.agents/skills/`. Keep it outside
the public `skills/` catalog, CLI installation list, and consumer setup reminders.
Research supplies evidence, not authorization to edit skills or change user goals.
An assessment-only request stays read-only; continue an already authorized revision
without a new approval gate when its premises are sufficiently established.

## Frame the decision

Identify the decision or operation that guidance should improve, the available task
observations, and the uncertainty that could change the proposed response. Inspect
the affected skill and applicable maintainer guidance before assuming guidance is
missing. Distinguish a method gap from an implementation defect, missing context,
unavailable tools, or failure to apply existing instructions.

Keep two questions distinct: what makes the engineering method sound, and how to
express it so an agent selects and applies it appropriately. Prompt-writing advice
alone does not establish sound requirements, design, implementation, or verification.

## Gather evidence that bears on the choice

Choose sources by the claim being assessed:

- Use current repository sources and actual task artifacts for existing behavior,
  constraints, failures, and historical decisions. Missing history stays unknown;
  do not reconstruct a past research process from final instructions alone.
- Use original engineering work and authoritative technical documentation for
  methods and operational contracts. Inspect assumptions, tradeoffs, and relevant
  counterexamples before transferring a principle into portable instructions.
- Use version-matched official model and runtime documentation for capabilities,
  skill discovery, loading, and instruction behavior. Practitioner reports can
  motivate a hypothesis; they do not establish a model guarantee.

Reuse sources already checked when their version, scope, and claim still apply.
Investigate material unknowns with focused source checks or authorized observations.
Search snippets and recalled summaries are leads; inspect the supporting passage
before attributing a claim. Keep external queries free of private project content.
Record source location, relevant version or check date, supported claim, and material
limits where they affect the decision. Distinguish source claims, local observations,
inferences, and user choices; seek contrary evidence when a conclusion depends on a
disputed premise. Do not impose a source count or exhaustive literature survey.

## Turn findings into a bounded recommendation

Explain which instruction should be retained, removed, or revised, why the evidence
supports that choice, and when the proposed guidance applies. A finding may justify
no change. Prefer decision criteria over a fixed itinerary unless ordering protects
a concrete invariant. Preserve scope, authority, runtime isolation, and completion
requirements; a stronger model does not make those constraints obsolete.

Separate the engineering rationale from the skill's wording and resource placement.
Use available skill-authoring guidance for an authorized implementation; do not copy
source material wholesale or create a new public skill merely to hold research.
Keep decisive sources and limitations with the relevant existing maintenance document
or task record. Create a separate research document only when its reuse warrants it.

Stop researching when the evidence supports the next decision and remaining unknowns
cannot invalidate it. If a material premise cannot be resolved, state its consequence
and continue only independent work. Report the recommendation, decisive evidence,
uncertainty, and what actual-use observation would challenge the proposed guidance.
Assess that use when available and authorized; otherwise label effectiveness unproven.
Do not manufacture example projects, test suites, or evaluation infrastructure to
claim a closed feedback loop. Report findings in the context of the original request.
