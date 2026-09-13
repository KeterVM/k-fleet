# Implementation judgment

Use for nontrivial implementation choices about reuse, abstractions, interfaces,
integration, or restructuring within the assigned change. Apply the role, authority,
and completion rules in SKILL.md.

## Choose implementation by fit and responsibility

First determine whether an approach meets the task's contracts and responsibility
boundaries. Among suitable approaches, weigh implementation and maintenance cost,
failure risk, and ease of correction. Prefer an established approach when it meets
those conditions; do not require alternative designs for an obvious local edit.
Investigate a consequential uncertain premise with focused inspection or a permitted
probe when the result could change the choice. Stop expanding research once the
remaining uncertainty does not affect a sound next decision or required evidence.

Find the existing owner before adding a business rule. Reuse its supported
interface when callers must agree, preserving their contracts and error semantics.
Keep independent concepts separate when they have different reasons to change;
similar syntax alone does not justify a shared helper. Validation at different
trust boundaries can be intentional rather than duplicated ownership.

Judge abstractions by what they let callers avoid knowing or coordinating. Add a
layer, dependency, state, or configuration only for a present responsibility or
constraint. Local brevity is insufficient if callers must manage hidden coupling.
Avoid speculative capabilities, while making focused improvements that keep the
affected code understandable and changeable. The smallest textual patch is not
automatically the simplest implementation.

## Research reuse before custom implementation

Establish what the capability must do and check what the project already provides.
For a general-purpose mechanism not adequately covered, search for maintained
libraries before building it. Verify plausible candidates against their official
documentation, source repository, and package metadata for the relevant version;
remembered APIs, search snippets, and popularity alone do not establish suitability.

Compare candidates against the actual requirements and project constraints: behavior
and edge cases, runtime compatibility, maintenance and security status, licensing,
and integration or operational cost where material. Prefer a suitable maintained
solution over reimplementing its mechanism. Keep project-specific policy and glue
with the project rather than forcing business rules into a library's model.

Reuse adequate current evidence and stop when it supports a choice; do not require
a fixed number of libraries, a separate report, or fresh web research for every edit.
For a material choice, briefly record the selected library and version, supporting
sources, and decisive tradeoff in the task or an existing project artifact. Custom
implementation needs a concrete reason, such as an unmet contract, incompatible
constraints, or disproportionate dependency cost. If research is unavailable, state
the evidence gap rather than claiming no suitable library exists.

Respect dependency policies and existing authorization. When adopting a library,
complete the manifest, lockfile, configuration, and real integration checks relevant
to its use. Use a focused probe only for unresolved compatibility or behavior that
could change the choice; installation alone does not establish fit.

## Place code with its owner

Extend an existing file only when the new behavior belongs to its responsibility.
Otherwise use an appropriate existing module or a focused new file, and keep the
entry point responsible for composition. For example, adding persistence to a UI
flow should call the persistence owner rather than embed storage implementation in
the screen. Do not move unrelated responsibilities into a generic utils or helpers
file, or leave a nominally extracted module dependent on its caller's internals.

Extract the affected responsibility with an explicit interface and update callers,
imports, exports, and discovery or packaging configuration as needed. Preserve
invariants, state ownership, and dependency direction; avoid circular imports or
duplicated state introduced by extraction. A small coherent script or module may
remain one file. Split for independent responsibilities, not arbitrary size limits,
and keep unrelated legacy cleanup outside the change.

## Preserve contracts while making the behavior usable

Implement through real entry points and intended interfaces. Keep rules with their
owner and preserve dependency direction and affected authorization, transaction,
concurrency, resource lifetime, and compatibility guarantees. Do not bypass an invariant or split an atomic operation to simplify a local function.
Complete affected callers, wiring, configuration, failure handling, and cleanup.
Update usage documentation when the change alters how the code is used or operated.
Remove paths made obsolete by this change while preserving compatibility obligations.

Repeated exceptions, mapping, or fragile coordination can reveal a poor fit.
Investigate the cause and revise the affected decision when warranted; necessary
adapters and special cases remain valid.

## Keep the change explainable

Use names that express domain meaning and interfaces that make required inputs,
effects, and failures clear. Comments should supply intent, constraints, or other
information the code cannot communicate; do not narrate obvious operations.
Keep the diff focused on the requested behavior and necessary supporting changes.
For structural work, include the ownership and dependency changes needed to resolve
the requested problem. If delivery is staged, keep each increment's ownership clear
and track remaining obligations; moving fewer files is not evidence of completion.
Make substantial restructuring distinguishable from behavior changes when that
helps review, without imposing commits or approval gates. Avoid unrelated formatting
or cleanup; do not defer a defect introduced by the change as future polish.
