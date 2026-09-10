# Tradeoffs and evidence

## Compare choices against the task

Start from an adequate existing design or the simplest direct approach that meets
the current obligations. Compare plausible alternatives only where the choice is
consequential; do not manufacture a fixed number of options for a settled decision.
Explain what the selected approach improves, what it costs, and why that tradeoff
fits the established priorities.

Assess the affected whole: callers, state ownership, dependencies, integration,
operation, and maintenance. For a proposed interface, layer, package, or extension
mechanism, identify the present responsibility or constraint it serves. Local
simplicity that transfers coordination to every caller can increase overall cost.
Prefer directness when it preserves the required boundaries with less coordination.

Do not trade away a required guarantee for convenience or invent priorities when
requirements conflict. Resolve the material product choice with the user if existing
intent does not settle it. Future flexibility alone does not justify speculative
mechanisms; neither file count nor a familiar pattern establishes simplicity.

## Spend evidence where it changes the decision

Check uncertain premises in current code, manifests, framework versions, and
configuration. When external knowledge matters, use version-matched official
documentation or inspect maintained projects with comparable constraints. Distinguish
framework requirements from recommendations and examples; popularity does not prove
fit. Identify the evidence used without making research a mandatory sequence.

For a consequential uncertainty, choose the smallest inquiry that can discriminate
between the options: a caller trace, contract example, targeted experiment, or
measurement. State what result would reject the assumption before investing in work
that depends on it. Limit a prototype to that question and report what it establishes;
do not treat it as proof of unrelated behavior or permission to expand the task.

Exercise the proposed design against relevant success and failure scenarios. When
maintainability is uncertain, trace a plausible change grounded in the task: which
owners, contracts, and callers must change, and why? Scattered edits to one rule or
unrelated knowledge required of callers can expose a weak boundary. This reasoning
helps compare designs; it does not measure future maintenance cost by itself.

## Account for the cost of changing course

Spend more effort on decisions that spread across consumers, commit persistent
state, or are costly to undo. A local choice with clear ownership may remain easy
to change; a public contract or data migration may not. Source control alone does
not make effects on deployed consumers or stored data reversible.

When replacing existing structure, account for compatibility and the transition,
including any period when old and new behavior coexist. Establish ordering and
recovery constraints where they affect correctness. Use an incremental change when
it reduces risk without leaving ambiguous ownership or indefinite parallel paths.
Do not bundle unrelated cleanup into the design.

Defer a choice only when doing so preserves a usable implementation path and avoids
costly commitment; identify the event or evidence that would make the choice necessary.

## Make decisions usable by the implementer

Distinguish required contracts and constraints from recommendations and choices left
to implementation. Explain consequential decisions in terms of the need they serve,
the cost accepted, and the evidence or assumption on which they depend. Carry forward
only enough context to avoid reconstructing the reasoning; use the existing task or
project artifact rather than requiring another document or approval round.

If implementation friction or review feedback challenges the design, inspect the
specific contract, constraint, or assumption it affects. Separate a misunderstood
handoff from an infeasible design or a local implementation defect. Clarify the first,
revise the affected design for the second, or correct the implementation for the third.
Explain material changes and their consequences to affected work. Neither a challenge
alone nor effort already spent is a reason to change or retain a decision.
