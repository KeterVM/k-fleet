---
name: kf-design-codebase
description: Design a codebase's directory organization, module responsibilities, interfaces, and internal dependencies for an understood change, keeping complexity proportional to current needs.
---

# Design codebase

Translate understood behavior into a structure with explicit ownership and
contracts. Reuse adequate existing design, and inspect the relevant
code and project conventions before choosing where the change belongs. Resolve
missing decisions that materially affect correctness or scope; proceed with
independently understood work without adding a routine approval checkpoint.

Treat accepted system architecture, technology choices, and deployment boundaries
as inputs. Revisit an affected premise when evidence requires it, without silently
expanding internal code design into a system redesign. Leave coding style and
line-level implementation choices to implementation under the project contract.

## Turn responsibilities into code boundaries

Before a substantive change, identify which responsibility owns each business rule
and state transition, what callers need from it, and which dependencies it needs.
Use these answers to choose code boundaries. A route group, section comment, or
separate file alone does not establish a business module if callers still reach
through it to manipulate its internal state or duplicate its rules.

Separate responsibilities when they have distinct rules, consumers, or reasons to
change. Keep tightly related behavior together when splitting it would require
exposing internals or coordinating fragments of one invariant. Follow useful local
patterns, but inspect whether they preserve these properties for the new change.
Do not require a service/repository stack, interface for every function, or a
particular file count. For a small bounded edit, reuse sound existing boundaries.

Keep transport parsing and response mapping from becoming the owner of unrelated
business rules. Make the supported entry points and dependency direction clear
enough that another caller can use the behavior without bypassing its invariants.
Extract boundaries when justified by actual responsibilities, not hypothetical
future platforms or consumers.

## Map responsibilities to directories

Inspect the existing source layout, module entry points, tests, build rules, and
framework discovery conventions. Choose locations that make ownership and related
changes easy to find. Group by business capability, technical responsibility, or
a combination according to the actual change patterns and project constraints;
do not impose one layout on every codebase.

Keep module internals together and make the supported import boundary clear.
Give shared code a concrete responsibility and owner instead of using a generic
shared or utils directory as a destination for anything reused. Place tests and
supporting files consistently with the project and the behavior they validate.
Directory nesting should convey useful ownership, not merely mirror call layers.

For new or changed layout, show only the relevant paths and explain what belongs
there. A directory tree supports the design but does not replace the contracts.
For existing code, account for affected imports, public exports, tests, and tooling
before proposing moves. Preserve a sound layout for a local change; avoid unrelated
repository reorganization and empty directories for hypothetical features.

## Keep the design proportional

Start with the simplest structure that satisfies current behavior and invariants.
For each proposed layer, interface, package, or extension mechanism, identify the
present responsibility or constraint it serves and the indirection it adds. If a
direct implementation preserves the required boundaries with less coordination,
prefer it. Do not make future flexibility a sufficient reason on its own.

Small projects can use few modules and concrete dependencies. Split when there is
a meaningful ownership boundary, not to satisfy a template; avoid collapsing
unrelated rules merely to reduce file count. Stop elaborating when ownership,
contracts, placement, and critical failure behavior are clear enough to implement.

## Preserve invariants across boundaries

Define supported entry points, inputs, results, and failure semantics at affected
boundaries. Distinguish contracts callers need from implementation details they
should not depend on. Make dependency direction intentional and avoid cyclic
ownership. Introduce abstractions for actual boundaries or consumers, not merely
because a future replacement is imaginable.

For operations that span responsibilities, identify who coordinates the operation
and owns commit, rollback, and required side effects. Distinguish effects that must
succeed together from effects allowed to complete later. Do not lose atomicity by
giving every extracted module an independent commit, or introduce asynchronous
infrastructure without a requirement that justifies it.

Place authorization, validation, and concurrency decisions where the protected
operation cannot bypass them. Avoid duplicating a business decision across callers;
distinguish useful boundary validation from multiple competing implementations of
the same rule. Make failures and resource ownership explicit where dependencies
can fail or must be closed.

## Use likely changes to challenge the structure

Choose a plausible variation grounded in the requested behavior or existing
project: changing a business rule, adding a caller, or replacing an external
dependency. Trace which responsibilities would need to change and why. This is a
design check, not permission to implement the variation.

If the trace requires unrelated edits, knowledge of another module's internals,
or repeated changes to the same rule, reconsider the boundary before expanding
the implementation. Some changes legitimately cross modules; judge the reasons
and contracts rather than minimizing the number of touched files. Keep the check
brief for straightforward work and record consequential tradeoffs where useful.

## Carry decisions into implementation

Leave enough context to implement the chosen directory placement, ownership,
interfaces, dependency direction, consistency guarantees, and material tradeoffs. Use the conversation
or an existing artifact unless a durable document is needed. Identify observable
checks for important contracts; do not prescribe every function in advance.

Continue implementation when authorized, without a new approval gate. Respect
design-only requests. Revisit affected decisions if implementation evidence
invalidates them rather than preserving a diagram at the expense of correctness.
Do not claim reduced modification cost from a design probe alone.
