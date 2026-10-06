# Structure and naming

Use for a new or extended component, unclear ownership, naming, or placement, or an
extraction. The authority and completion rules in SKILL.md still apply.

## Choose by fit, then cost

First establish which approaches meet the task's contracts and responsibility
boundaries; among those, weigh implementation and maintenance cost, failure risk,
and ease of correction. Prefer an established approach that meets them; an obvious
local edit needs no alternative designs. When an uncertain premise could change the
choice, settle it with focused inspection or a permitted probe, and stop researching
once the remaining uncertainty cannot change the next decision.

Find the existing owner before adding a business rule, and reuse its supported
interface when callers must agree, preserving their contracts and error semantics.
Keep concepts with different reasons to change separate; similar syntax alone does
not justify a shared helper. Validation at different trust boundaries can be
intentional rather than duplicated ownership.

Judge an abstraction by what it lets callers avoid knowing or coordinating. Add a
layer, dependency, state, or configuration for a present responsibility or
constraint. Local brevity that leaves callers managing hidden coupling is not
simple; neither is the smallest textual patch by default. Make focused improvements
that keep the affected code understandable, and leave speculative capabilities out.

## Establish the responsibility before its representation

Identify the domain concept or technical capability, the rules and state it owns,
and the callers it serves. Inspect the existing owner and its consumers before
creating a parallel one. Different operations on one invariant may belong together;
unrelated rules do not become one responsibility because one screen, command, or
request invokes them.

Choose a class, function, value type, or module from that responsibility and the
language or framework contract. A class can own state, lifetime, invariants, or an
implementation of a required interface; an independent calculation may fit a
function. Add classes, interfaces, or forwarding layers when they hide knowledge
callers would otherwise need, not to resemble an architecture.

## Make names describe the contract

Reuse established domain terms for the same concept and distinguish genuinely
different concepts. Decide whether a component is a domain value, operation,
coordinator, or external adapter before naming it, then check the name against its
public operations, inputs, results, and effects from a caller's view. Make technical
roles such as storage or transport visible where they affect correct use.

Names such as Manager, Handler, Service, or Data need a specific meaning in the
project; a suffix or a longer name does not establish a responsibility. When a
component is hard to name without listing unrelated jobs, recheck its ownership
before polishing the spelling. Keep meaningful language and framework conventions,
keep class, file, and directory names semantically consistent, and account for
compatibility when changing public names.

Include only distinctions useful in context. With one storage implementation,
`OrderRepository` needs no `Postgres` in every class name; add the qualifier when
callers or composition must tell implementations apart. Directory context may
already supply it. An interface-and-implementation pair needs a reason beyond
giving two names.

## Place code with its owner

Extend a file when the new behavior belongs to its responsibility; otherwise use a
fitting existing module or a focused new file, and keep the entry point responsible
for composition. Work out what the parent directory groups (a domain, feature,
technical layer, or framework-discovered artifact) and follow that rule for new
siblings. Follow required discovery paths, and preserve an existing layout where it
fits ownership rather than copying an accidental nearby placement.

Keep private implementation near its owner. Put shared code under a concrete owner
when consumers share a stable responsibility, not just similar syntax or the same
API; a second caller alone does not make feature code global. Adding persistence to
a UI flow, for example, calls the persistence owner rather than embedding storage in
the screen. Keep unrelated responsibilities out of generic utils or helpers files,
and keep an extracted module independent of its caller's internals.

When extracting, give the responsibility an explicit interface and update callers,
imports, exports, and discovery or packaging configuration. Preserve invariants,
state ownership, and dependency direction, without circular imports or duplicated
state. A small coherent script or module may stay one file: split for independent
responsibilities, not size limits, and leave unrelated legacy cleanup for its own
change.

## Trace a change through a new boundary

For a new or changed boundary, trace a plausible change grounded in the task, such
as replacing a storage adapter or changing a business rule. Predict which owners,
contracts, and callers should change and compare that with actual imports and
knowledge of internals. An adapter swap that needs unrelated business edits, or one
policy copied across modules, calls for reconsidering the boundary; separate
representations with necessary mapping can still be right. Fix the cause rather
than the directory tree. A clear local decision needs no design document; make
consequential ownership or dependency changes explicit.

## Check structure in the final diff

Inspect affected names, paths, public interfaces, and actual dependencies together.
Use rules, state, and reasons to change to detect both mixed responsibilities and
one responsibility scattered across nominally separate modules. Correct what the
change introduced or extended. Judge cohesion and coupling directly: split files and
passing tests do not establish them, and no file-count or line-count target applies.

## Keep the change explainable

Use interfaces that make required inputs, effects, and failures clear. Write
comments for intent, constraints, or other information the code cannot carry. Keep
the diff on the requested behavior and necessary support; for structural work,
include the ownership and dependency changes the problem needs. When delivery is
staged, keep each increment's ownership clear and track remaining obligations. Make
substantial restructuring distinguishable from behavior changes when that helps
review, without imposing commits or approval gates. Fix defects the change
introduced now rather than deferring them as polish, and leave unrelated formatting
alone.
