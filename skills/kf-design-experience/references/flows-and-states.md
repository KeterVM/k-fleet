# Flows and states

## Connect the journey

Start from an important task in its real context: what the user knows, what data or
permission they have, and how they arrive. Trace the decisions and effects through
the recognizable outcome. Include cross-device, offline, or human handoffs only
where the actual journey requires them. A collection of screens can still leave
the user unable to finish.

Group information around tasks and familiar domain concepts. Choose navigation and
labels that let people predict what happens next. Prefer recognition over requiring
users to remember information from another step. Preserve established useful
conventions and identify where a proposed simplification hides a necessary choice.

## Design consequential states

Choose states through actual behavior, not a universal screen checklist. Clarify:

- What is shown before usable data exists or while work is pending.
- How validation explains the problem and preserves recoverable user input.
- What happens after partial success, permission loss, a retry, or interruption.
- Which actions are reversible, and how consequential irreversible choices are
  understood before commitment.
- How completion is distinguished from accepted, queued, or incomplete work.

Make feedback perceivable through the relevant interaction modes. Do not use color
alone to communicate meaning. Plan logical focus movement, accessible names and
errors, and keyboard paths for interactive controls. Check long content, localization,
zoom, and narrow layouts where supported use makes them consequential.

Resolve user-visible obligations before encoding them as component details. Record
necessary states, content, transitions, and behavior together so implementation does
not have to invent a different experience. Match loading and success language to the
actual system contract, especially for asynchronous or partially completed work.
