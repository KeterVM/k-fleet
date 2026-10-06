---
name: kf-design-experience
description: Decide user journeys, interactions, states, and presentation so people can complete a product task. Use when that experience is new, materially changed, observed to fail, or the subject of the request.
---

# Design experience

Make the intended user outcome achievable through a coherent journey, honest states,
and presentation that fits the product. Code ownership and contracts belong to
`kf-design-codebase`; uncertain product value belongs to `kf-discover-product`. A
routine edit that an established pattern already covers goes straight to
implementation with that pattern, even when the code around it changes.

## Method

These are the decisions to settle, in their usual order; skip any the request
already answers. One ordering is fixed: make the journey completable, including its
failure and recovery states, before refining presentation, because a polished screen
cannot rescue a task the user is unable to finish.

1. **Ground the task.** Name the user, the trigger, what they know and may access
   when they arrive, the intended outcome, and how they recognize completion. Collect
   the constraints already set: requirements, brand, supported devices, design
   system, and access needs. Existing screens show current behavior; the request may
   want something different. Answer factual questions (what a field feeds, which
   states the backend reports, which accessibility target applies) from the project
   yourself rather than asking.

2. **Trace the journey and classify each open point.** Follow entry points,
   prerequisite information, decisions, feedback, and recovery through to the
   outcome, and note which states the system can actually reach (pending, empty,
   partial, failed, permission lost, queued versus done).

   | Kind | Test | Action |
   | --- | --- | --- |
   | Established pattern | The design system or an existing flow already covers this task shape, and the request is not about it | Reuse it; change it only on evidence that it blocks the outcome |
   | Product intent | Plausible readings change the audience, goal, what users can do, or scope, and project evidence cannot settle it | Ask, then continue work that holds under every answer |
   | Consequential interaction | The choice decides whether users can finish, recover, understand an irreversible effect, or operate it with keyboard and assistive technology | Decide it here from the traced journey and the system's real behavior; specify its states and wording |
   | Uncertain usability | Candidate designs meet the obligations, and inspection cannot tell which people will complete | Gather evidence at the lowest fidelity that discriminates (step 4) |
   | Routine presentation | The choice concerns layout, placement, labels, or how options are formatted, and you can judge it from the user's task within the design system | Choose, state the choice, and move on |

   Judge by consequence, not visual size: a confirmation label that says "Done" while
   work is still queued is consequential; a new page that copies an existing pattern
   is routine. When the experience itself is the subject of the request, existing
   patterns are candidates, not settled inputs.

3. **Shape the interaction and presentation.** Choose navigation, grouping, terms,
   and controls that follow the user's task and let them predict what happens next.
   Use realistic content to expose layout and comprehension problems. Set hierarchy,
   typography, spacing, and color by task priority and the product's character,
   reusing the design system; visual-design or platform skills may help when
   available. Cover focus, keyboard paths, contrast, readable content, and
   responsive behavior wherever supported use reaches them.

4. **Get evidence that fits the question.** Use the cheapest form that represents the
   disputed behavior faithfully: a sketch for organization, working interaction for
   focus, latency, or recovery. Walk representative tasks through the design, and
   observe representative users when that is available and authorized. Label each
   result by kind:

   - *inspection*: your walkthrough, heuristic, or automated check;
   - *observation*: what real users did with a prototype or product;
   - *implementation check*: the delivered controls, states, and focus behavior on
     the target surface.

5. **Stop and hand off** when the requested design decisions are supported, or a
   material dependency is unavailable. Carry forward flows, content, states,
   interaction details, tradeoffs, and what remains untested, in the project's
   existing format and only as much as the next action needs. For an implementation
   task, continue through integration and the relevant checks.

   When observation or implementation contradicts the design (people miss the
   control, the backend reports a state the design lacks), revise the journey
   decision that produced it rather than polishing the screen. When the user
   overrides a choice you classified as routine or established, re-run step 2 for
   related points.

## Examples (illustrative)

**Looks like polish, is a consequential state.** "Make the order confirmation page
look nicer." Tracing the journey shows that payment capture is asynchronous: the
page says "Order confirmed" while capture can still fail, and nothing tells the
customer afterwards. Correct the page's wording and states first ("Order received,
payment processing"). Telling customers later about a failed capture reaches beyond
this page, so ask about it, and do the visual refresh meanwhile.

**Looks like open design, is an established pattern.** "Let people see archived
projects in the project list." Where the control goes and how it looks seem worth
exploring, but the list already filters by status with a chip row. Add "Archived"
to that row, write the empty-state text ("No archived projects"), and state the
choice; no prototype is needed.

## Supporting references

Read a reference only for the decision that is stuck:

- The journey, grouping, labels, or required states are unclear, or accessibility
  affects the flow (steps 2–3): [Flows and states](references/flows-and-states.md).
- Fidelity, a prototype, a usability session, or reading its results is in question
  (step 4): [Prototype and evaluate](references/prototype-and-evaluate.md).

## Boundaries

- Work within the current project, its instructions, and existing authorization.
  Publishing prototypes, contacting users, buying assets, and changing a live
  service each need their own authority.
- Existing screens and default options leave product intent open; leave the design
  that depends on it until the user answers.
- A design is not an approval gate: once dependent questions are answered, continue
  the authorized implementation.
- Report evidence by its kind. Accessibility conformance comes from the project's
  targets checked on the working interface; a mockup, a single automated scan, or
  visual inspection establishes only part of it.
