# Implementation judgment

Use for new or substantially changed components, unclear names or placement, and
nontrivial choices about reuse, interfaces, integration, or restructuring. Apply the
role, authority, and completion rules in SKILL.md within the assigned change.

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

## Research mainstream libraries and frameworks before implementation

Establish what each feature's general-purpose capabilities must do and check what
the project already provides. Research mainstream, maintained libraries and frameworks
before implementation, including alternatives to affected custom mechanisms that
already work without reported maintenance problems. Reuse adequate current selection
evidence where applicable. Verify plausible candidates against their official
documentation, source repository, and package metadata for the relevant version;
remembered APIs, search snippets, and popularity alone do not establish suitability.

Compare candidates against the actual requirements and project constraints: behavior
and edge cases, runtime compatibility, maintenance and security status, licensing,
and integration or operational cost where material. Default to adopting a suitable
mainstream solution and its supported conventions over retaining or reimplementing
its mechanism. Readability, reliability, and maintainability gains
can justify a new dependency even when existing code could implement the behavior;
show what becomes easier to understand or change. Assess concrete costs rather than
treating the addition of a dependency as a disadvantage by itself.
Keep project-specific policy and glue
with the project rather than forcing business rules into a library's model.

Reuse adequate current evidence and stop when it supports a choice; do not require
a fixed number of libraries, a separate report, or fresh web research for every edit.
If multiple viable libraries remain uncertain after focused research, summarize
their relevant differences, remaining uncertainty, and your recommendation, then
ask the user to choose before adoption or dependent implementation. A clearly
supported choice within existing authorization needs no extra approval.
For a material choice, briefly record the selected library and version, supporting
sources, and decisive tradeoff in the task or an existing project artifact. Custom
implementation, whether retained or new, needs a concrete reason, such as an unmet
contract, incompatible constraints, or disproportionate adoption cost. Working code,
the absence of reported problems, and fewer dependencies alone are not reasons.
Keep comparisons within the affected scope; this preference does not authorize an
unrelated framework migration or repository-wide replacement. If research is unavailable, state
the evidence gap rather than claiming no suitable library exists.

Respect dependency policies and existing authorization. When adopting a library,
complete the manifest, lockfile, configuration, and real integration checks relevant
to its use. Use a focused probe only for unresolved compatibility or behavior that
could change the choice; installation alone does not establish fit.

## Establish the responsibility before its representation

For the affected behavior, identify the domain concept or technical capability, the
rules and state it owns, and the callers it serves. Inspect the existing owner and
its consumers before creating a parallel one. Different operations on one invariant
may belong together; unrelated rules do not become one responsibility because a
screen, command, or request invokes them together.

Choose a class, function, value type, or module according to that responsibility and
the language/framework contract. A class can own state, lifetime, invariants, or an
implementation of a required interface; an independent calculation may fit a function.
Do not create classes, interfaces, or forwarding layers merely to resemble an
architecture. Check whether the abstraction hides relevant knowledge or instead
makes callers coordinate more objects, sequencing, or shared state.

## Make names describe the contract

Reuse established domain terms for the same concept and distinguish genuinely
different concepts. Identify whether a component represents a domain value, operation,
coordinator, or external adapter before naming it. Check its name against its public
operations, inputs, results, and effects from a caller's perspective; technical roles
such as storage or transport should be apparent where they affect correct use.

Names such as Manager, Handler, Service, or Data need a specific meaning in the
project; neither these suffixes nor longer names establish a clear responsibility.
If a component is difficult to name without listing unrelated jobs, recheck its
ownership before polishing the spelling. Preserve meaningful language and framework
conventions rather than imposing a suffix ban or one universal naming scheme. Keep
class, file, and directory names semantically consistent without requiring identical
spelling. Account for compatibility when changing public names.

Include only distinctions useful in the current context. A project with one storage
implementation can use OrderRepository without repeating Postgres in every class
name; add the technology qualifier when callers or composition need to distinguish
implementations. Directory context may already supply that distinction. Do not create
an interface and implementation pair solely to justify separate names.

## Place code with its owner

Extend an existing file only when the new behavior belongs to its responsibility.
Otherwise use an appropriate existing module or a focused new file, and keep the
entry point responsible for composition. Determine what the affected parent directory
groups: a domain, feature, technical layer, or framework-discovered artifact. New
siblings should follow an explainable organizing rule; nested feature and layer
groupings can be coherent. Follow required discovery paths and preserve an existing
layout where it fits ownership, rather than copying an accidental nearby placement.

Keep private implementation near its owner. Put shared code under a concrete owner
when consumers share a stable responsibility, not just similar syntax or access to
the same API. Do not promote feature-specific code to a global directory merely
because a second caller appears. For example, adding persistence to a UI
flow should call the persistence owner rather than embed storage implementation in
the screen. Do not move unrelated responsibilities into a generic utils or helpers
file, or leave a nominally extracted module dependent on its caller's internals.

Extract the affected responsibility with an explicit interface and update callers,
imports, exports, and discovery or packaging configuration as needed. Preserve
invariants, state ownership, and dependency direction; avoid circular imports or
duplicated state introduced by extraction. A small coherent script or module may
remain one file. Split for independent responsibilities, not arbitrary size limits,
and keep unrelated legacy cleanup outside the change.

For a new or changed boundary, trace a plausible change grounded in the task, such
as replacing a storage adapter or changing a business rule. Identify which owners,
contracts, and callers should change and compare that expectation with actual imports
and knowledge of internals. An adapter replacement that requires unrelated business
edits, or one policy copied across several modules, calls for reconsidering the
boundary. Separate representations with necessary mapping can still be appropriate.
Fix the affected cause, not just the directory tree. A clear local decision needs no
new design document; make consequential ownership or dependency changes explicit.

## Preserve contracts while making the behavior usable

Implement through real entry points and intended interfaces. Keep rules with their
owner and preserve dependency direction and affected authorization, transaction,
concurrency, resource lifetime, and compatibility guarantees. Do not bypass an invariant or split an atomic operation to simplify a local function.
Complete affected callers, wiring, configuration, failure handling, and cleanup.
Update usage documentation when the change alters how the code is used or operated.
Complete renames and replacements as described below, preserving established
compatibility obligations.

Repeated exceptions, mapping, or fragile coordination can reveal a poor fit.
Investigate the cause and revise the affected decision when warranted; necessary
adapters and special cases remain valid.

## Complete the migration instead of hiding the old contract

For a rename or replacement, establish what the task changes: the wire format, an
internal concept, a public contract, or the implementation behind a stable interface.
Trace affected definitions and consumers, including serialization, imports, exports,
construction or dependency registration, and relevant tests or generated sources.
Update the in-scope dependency chain to the intended model, regenerate through project
tooling where needed, and remove superseded paths once their consumers have migrated.
Do not create work beyond the authorized scope or claim out-of-scope consumers were
migrated.

If a field is being renamed from status to statusNum, changing only the JSON property
mapping while leaving the superseded internal name and callers is not completion of
that rename. If only the wire contract changes and status remains an intentional
domain concept, mapping at that boundary can be correct; establish that distinction
from the task and model rather than assuming it to save edits. Check value semantics
and types as well as spelling. A serialization naming convention is not itself a
compatibility defect.

When replacing a class, migrate affected callers to the intended owner instead of
retaining the old class solely to forward to the new one. Refactoring the internals
of an intentionally stable facade is different: retain it when its contract and
responsibility remain part of the design. An extra wrapper, alias, fallback, or
dual-read path needs a concrete obligation, such as independently deployed consumers,
persisted data, or a required public API. Existing code or fewer changed files alone
does not establish that obligation.

For necessary transitional compatibility, identify the protected consumer or data,
why it cannot move in the current change, and the removal condition and remaining
migration owner. Keep the bridge at the relevant boundary; report unfinished migration
explicitly. A permanent adapter needs an ongoing responsibility, not a fictional
removal date. Resolve consequential unknown compatibility requirements before breaking
them, using available evidence first; do not invent compatibility requirements to
avoid an authorized migration.

Before declaring the migration complete, search the affected scope for old names,
registrations, and paths and account for remaining uses. Check the intended entry
points actually reach the new implementation and relevant contracts still hold.
Passing tests through an old forwarding shell does not demonstrate that its callers
were migrated.

## Keep the change explainable

Use interfaces that make required inputs, effects, and failures clear. Comments should
supply intent, constraints, or other information the code cannot communicate; do not
narrate obvious operations.
Keep the diff focused on the requested behavior and necessary supporting changes.
For structural work, include the ownership and dependency changes needed to resolve
the requested problem. If delivery is staged, keep each increment's ownership clear
and track remaining obligations; moving fewer files is not evidence of completion.
Make substantial restructuring distinguishable from behavior changes when that
helps review, without imposing commits or approval gates. Avoid unrelated formatting
or cleanup; do not defer a defect introduced by the change as future polish.
