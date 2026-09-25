---
name: kf-design-experience
description: Resolve user journeys, interactions, and interface design when how people will complete a product task is unsettled or needs improvement.
---

# Design experience

Make the intended user outcome achievable through a coherent interaction and
appropriate presentation. Use for new or materially changed experiences, observed
usability problems, or requested design work. Reuse established patterns for routine
edits; do not redesign an interface merely because implementation touches it.

## Select supporting guidance

- For journeys, information organization, interaction, or missing states, read
  [Flows and states](references/flows-and-states.md).
- For design fidelity, prototypes, or usability evidence, read
  [Prototype and evaluate](references/prototype-and-evaluate.md).

## Scope and authority

Preserve established requirements, brand constraints, supported devices, and access
needs. Ask when missing intent changes the audience, goal, behavior, or scope; wait
before committing dependent design and continue independent work. Resolve accessible
facts from current project evidence. Existing screens show current behavior, not
necessarily the desired product decision.

Use authorized project material and tools. Design work does not itself authorize
publishing prototypes, contacting users, buying assets, or changing a live service.
Carry existing authorization into implementation when it is part of the task;
do not add routine approval stops between design and delivery.

Own the user-facing experience. Code responsibility and interface contracts belong
to `kf-design-codebase`; validate uncertain product value through
`kf-discover-product` when needed. Available visual-design or platform-specific
skills can support execution but are not required dependencies of this method.

## Choose an experience that supports the task

Identify the user, trigger, starting context, intended outcome, and how completion
will be recognized. Trace the whole relevant journey, including entry, prerequisite
information, decisions, feedback, and recovery. Address the interaction that blocks
the outcome before polishing isolated screens.

Choose navigation, grouping, terminology, and controls that reflect the user's
tasks and information needs. Make consequential choices and their effects clear.
Use concrete content to expose layout and comprehension problems. Align typography,
spacing, color, and visual hierarchy with the product's character and task priority;
reuse a suitable design system rather than inventing competing conventions.

Account for relevant loading, empty, error, permission, success, and recovery states.
Consider keyboard and assistive-technology use, focus, contrast, readable content,
and responsive behavior where they affect the experience. Determine applicable
accessibility targets from the project and current standards; do not claim compliance
from a mockup, one automated scan, or visual inspection alone.

Use the lowest fidelity that can resolve the material uncertainty. A sketch may
resolve organization; a working interaction may be necessary to assess focus,
latency, or recovery. Do not require polished assets before a structural decision,
or present a static image as evidence of functional behavior.

## Carry the design into delivery

Provide enough flow, content, state, and interaction detail for the next action,
using the project's existing format. Explain material tradeoffs and unresolved
questions without prescribing a fixed number of screens or alternatives.

Check representative tasks against the design and, when available and authorized,
observe representative users. Distinguish designer inspection, actual usability
observations, and implementation checks. Revise the affected decision when evidence
exposes a problem; a visually finished screen does not prove a usable journey.

Stop when the requested design decisions are supported or a material dependency is
unavailable. State what remains untested. For an implementation task, continue through
integration and relevant checks rather than ending at a design handoff.
