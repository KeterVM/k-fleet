# Engineering method

Use this shared method to select the engineering work a design, implementation,
structural change, or verification actually needs. The active route still owns its
procedure, authority, and stopping condition. This method is a decision guide, not
a substitute for domain knowledge or a mandatory report template.

## Establish the task contract

Translate the request into observable user or consumer behavior, operating
conditions, constraints, and non-goals. Consult current product documents, scoped
project instructions, affected code, and representative implementations. Distinguish
established facts from assumptions and unresolved product choices. Recheck applicable
instructions before the first write and against the integrated result at completion.

Follow the scenario beyond its entry point: what must remain true during use,
failure, interruption, and termination? Distinguish required support from adjacent
features: without it, would the requested scenario fail under its established
conditions? Investigate necessary technical dependencies even when the user did not
name their components. Do not silently narrow the result because a required
component is missing or belongs to another layer. Association alone does not justify
new product scope; resolve material ambiguity in intended behavior with the user.

## Select the engineering dimensions

Use the scenario and repository evidence to decide which concerns need deeper work.
These are prompts for detecting relevant risks, not a list of features to add:

| Signal in the task or code | Resolve before committing to the approach |
| --- | --- |
| User interaction or changed workflow | End-to-end behavior, loading/empty/error states, accessibility or recovery needs that affect successful use |
| New responsibilities, repeated logic, or cross-module changes | Ownership, dependency direction, public boundaries, cohesion, and fit with local conventions |
| Mutable or persisted data, asynchronous events, retries | Source of truth, state transitions, consistency, concurrency, duplicate work, cancellation, and resource ownership |
| External service, platform API, or new runtime capability | Actual target versions, contracts, permissions, configuration, registration, initialization, and failure semantics |
| Untrusted input, protected operations, or sensitive data | Validation at trust boundaries, authorization, data exposure, and relevant abuse paths |
| Long-running work, constrained resources, or explicit load targets | Lifecycle, background/suspension behavior, resource budgets, backpressure, recovery, and actionable failure signals |
| Changed public contracts, schemas, dependencies, or deployment assumptions | Existing consumers, compatibility, migration order, rollout and rollback constraints, and removal impact |

A dimension may reveal another necessary dependency; follow that chain until the
required behavior has a credible implementation and validation path. Do not select
an architecture or stop exploration based only on the first file or visible UI.
Avoid speculative scale, infrastructure, or generic hardening without a relevant
requirement or demonstrated risk. A local edit may need only one decisive constraint.

When domain details determine correctness, read the relevant project documentation,
available specialized skill, or authoritative technical source for the actual target.
Inspect installed versions and configuration rather than assuming a familiar recipe.
For example, discovering a need for background operation is only the start: determine
which platform mechanism applies, what must be configured, and what runtime evidence
can establish that it works. An existing wrapper is not proof of native integration.

Use [investigation](investigation.md) for unresolved technical behavior and
[design](design.md) for consequential ownership or compatibility decisions. Continue
the authorized task across those routes; technical investigation is not a reason to
ask the user to supply ordinary implementation details. Keep product and external
authority decisions with the user.

## Resolve ownership and conventions

Identify the owning module and public boundary before creating files, APIs, or
abstractions. Keep cohesive feature code together where the repository follows that
pattern; preserve intentional layers or platform boundaries where it does not.
A suffix such as service, model, or helper is not itself a reason to put
feature-specific code in a global directory. Extract shared code when actual
consumers or an established boundary justify it.

If similar files are scattered, resolve ownership from current guidance and
dependencies rather than copying the nearest accidental location. Limit necessary
restructuring to the affected responsibilities. Carry local naming, formatting,
error-handling, and dependency conventions through the implementation. Existing
formatters and linters help enforce syntax and style; inspect architectural fit
directly. Do not impose one directory layout on every project.

## Carry decisions into delivery

For each material concern, connect the required behavior, supporting capability,
code or configuration owner, and evidence that can detect failure. Reuse an existing
design or plan; keep brief working notes when cross-layer work could otherwise be
lost. Do not require a document or a fixed number of alternatives for every change.

Resolve the consequential uncertainties before expensive or hard-to-reverse work.
Compare alternatives when they offer real tradeoffs, using observed constraints.
Implement the smallest coherent vertical slice through the necessary layers, then
reassess remaining dependencies and risks using what was learned. A placeholder,
disconnected helper, or undocumented follow-up does not complete required support.
Use the active implementation or bug-fix route for edits and [testing](testing.md)
to choose meaningful evidence rather than testing every layer mechanically.

## Verify the integrated outcome

Check both the user scenario and the properties selected above. Exercise supporting
transitions that could invalidate the result, including relevant failure and cleanup
paths. Confirm components reach real entry points, configuration, and consumers;
creating their files is not integration. Check all changed files together for
misplaced ownership, reversed dependencies, duplicate state, and lost obligations.

Match evidence to the claim: a unit test may establish a calculation, a contract
test may establish adapter behavior, and a target-runtime check may be necessary
for a platform lifecycle claim. Passing compilation or existing tests establishes
only what those checks cover. Distinguish simulation from device or deployed-runtime
evidence, report missing validation and blockers, and leave no necessary support
silently deferred. Revisit the task contract if new evidence invalidates an assumption;
do not treat checklist completion as proof of a complete result.
