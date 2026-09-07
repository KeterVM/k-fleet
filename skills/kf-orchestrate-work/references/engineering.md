# Engineering method

Read the relevant sections when a design checkpoint or review identifies unresolved
engineering risks. Reuse current guidance and evidence already in context; consult
additional sources when scope, facts, or unanswered questions require them. The
active route owns procedure and completion. This reference is not a mandatory
checklist or report template.

## Trace required support

Follow the user scenario through its established operating conditions, interruptions,
and termination. Without a proposed supporting capability, would that scenario
fail? Trace necessary dependencies even when the user has not named their components.
Do not silently narrow the result because required support is missing or belongs
to another layer. Association alone does not justify adjacent product features;
resolve material ambiguity in intended behavior with the user.

## Select the engineering dimensions

Use these signals to select questions that need deeper work, not features to add:

| Signal in the task or code | Questions to resolve |
| --- | --- |
| Changed user workflow | Successful use, relevant loading/empty/error states, accessibility and recovery |
| New responsibilities or cross-module changes | Ownership, dependency direction, public boundaries and cohesion |
| Mutable or persisted data, asynchronous events or retries | Source of truth, state transitions, consistency, concurrency, duplicate work and cancellation |
| External service or platform capability | Actual target versions, permissions, configuration, registration, initialization and failure contracts |
| Untrusted input, protected operations or sensitive data | Validation and authorization boundaries, exposure and relevant abuse paths |
| Long-running work or constrained resources | Background/suspension behavior, resource ownership, budgets, backpressure and recovery |
| Changed public contracts, schemas or deployment assumptions | Existing consumers, compatibility, migration order, rollout and rollback |

Follow dependencies revealed by these questions until required behavior has a
credible owner and validation path. Avoid speculative scale, infrastructure or
hardening without a relevant requirement or demonstrated risk.

Where domain details determine correctness, inspect the actual target configuration
and consult the appropriate project documentation, specialized skill or authoritative
technical source. A familiar wrapper is not proof of native integration. For example,
background operation requires identifying the applicable platform mechanism and
configuration, then establishing which runtime evidence can verify it. Use
[investigation](investigation.md) for unresolved technical behavior.

## Resolve ownership and conventions

Keep cohesive feature code together where the repository follows that pattern;
preserve intentional layers and platform boundaries where it does not. A suffix
such as service, model or helper does not justify placing feature-specific code in a
global directory. Extract shared code for actual consumers or an established boundary.

When similar files are scattered, resolve ownership from current guidance and
dependencies rather than copying an accidental location. Limit restructuring to
affected responsibilities and preserve local naming, error-handling and dependency
conventions. Formatters and linters do not establish architectural fit.

## Connect decisions to evidence

For each material concern, connect required behavior, supporting capability, owner
and evidence that can detect failure. Reuse an existing design or brief working
notes when cross-layer obligations could otherwise be lost.

Confirm that support reaches real entry points, configuration and consumers.
Exercise transitions that could invalidate the scenario, including relevant failure
and cleanup paths. Separate calculation or adapter evidence from target-runtime
evidence; simulation cannot establish device or deployed-runtime behavior. Report
unverified obligations explicitly rather than leaving necessary support as an
unreported follow-up.
