---
name: kf-design-codebase
description: Design a codebase's directory organization, module responsibilities, interfaces, and internal dependencies for an understood change, keeping complexity proportional to current needs.
---

# Design codebase

Translate understood behavior into explicit ownership, contracts, and placement.
Inspect relevant code and project conventions; reuse adequate existing design.
Resolve decisions that materially affect correctness or scope while continuing
independently understood work. A bounded edit within sound boundaries does not
need a new design exercise.

Treat accepted system architecture, technology choices, and deployment boundaries
as inputs. Revisit an affected premise when evidence requires it, without silently
expanding internal code design into a system redesign. Leave coding style and
line-level implementation choices to implementation under the project contract.

## Turn responsibilities into code boundaries

Identify the owner of each affected business rule and state transition. Define
supported entry points, inputs, results, and failure semantics; keep internal
state behind these contracts. Route groups and separate files alone do not
establish boundaries if callers still manipulate internals or duplicate rules.

Separate responsibilities when they have distinct rules, consumers, or reasons to
change. Keep related behavior together when splitting would scatter one invariant
or expose internals. Make dependency direction explicit and avoid cyclic ownership.

Keep transport parsing and response mapping from becoming the owner of unrelated
business rules. Place authorization, validation, and concurrency decisions where
the protected operation cannot bypass them. Identify resource and cleanup owners.

For operations spanning modules, identify the coordinator and transaction owner.
Distinguish effects that must commit or roll back together from effects allowed
to complete later. Extracting modules must preserve these guarantees rather than
giving each fragment an independent commit.

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

Small projects can use few modules and concrete dependencies. Do not require a
layering template or file count, or collapse unrelated rules merely to reduce it.
Stop when ownership, contracts, placement, and critical failure behavior are clear
enough to implement.

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
interfaces, dependency direction, consistency guarantees, and material tradeoffs.
Use the conversation or an existing artifact unless a durable document is needed.
Identify observable checks for important contracts; do not prescribe every
function in advance.

Continue implementation when authorized, without a new approval gate. Respect
design-only requests. Revisit affected decisions if implementation evidence
invalidates them rather than preserving a diagram at the expense of correctness.
Do not claim reduced modification cost from a design probe alone.
