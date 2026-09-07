---
name: kf-implement
description: Implement software changes from an understood goal or design, translating responsibilities into code boundaries and validating behavior and change impact.
---

# Implement

Deliver working behavior with a structure whose responsibilities and dependencies
can be explained. Reuse accepted requirements and design, and inspect the relevant
code and project conventions before choosing where the change belongs. Resolve
missing decisions that materially affect correctness or scope; proceed with
independently understood work without adding a routine approval checkpoint.

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

## Preserve invariants across boundaries

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

## Complete and inspect the integrated result

Implement coherent slices through real entry points. Use checks that establish
the requested behavior and relevant failure semantics, including cross-boundary
invariants when the change depends on them. Select validation by risk; routine
reversible edits do not require a new test suite.

After behavior passes, inspect the resulting responsibility ownership and
dependency flow. Check whether implementation shortcuts undermined the intended
boundaries. Correct demonstrated problems within the authorized scope; avoid
unrelated restructuring. If evidence invalidates the design, revisit the affected
decision rather than silently weakening the requirement.

Report what works, the evidence that supports it, and material structural tradeoffs
or unverified obligations. Passing tests supports the tested behavior; it does not
by itself establish maintainability. Do not claim improved change cost without
observing a representative change, or production readiness from local checks.
