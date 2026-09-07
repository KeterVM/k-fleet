---
name: kf-implement
description: Implement understood software changes using established code boundaries, project code style, and disciplined reuse, then validate the integrated behavior.
---

# Implement

Translate an understood change into working, readable code. Reuse accepted design
and existing boundaries. A routine edit does not need a separate design exercise;
if ownership, interfaces, or consistency guarantees are materially unresolved,
settle that decision before encoding an accidental contract. Continue independent
work without adding a routine approval checkpoint.

## Establish the local coding contract

Read applicable project instructions before the first write. Inspect nearby code,
formatter and linter configuration, language settings, and relevant tests. Follow
the project's intentional naming, file layout, imports, types, error handling,
and asynchronous conventions. Prefer configured tooling over personal style;
when sources conflict, follow authoritative project guidance and state material
ambiguity. Do not copy a demonstrated defect just to match adjacent code.

Keep the diff focused. Avoid formatting unrelated files or introducing a dependency
for behavior already supported by the project. Use comments to explain constraints
or non-obvious decisions; keep names and control flow clear enough to explain the
ordinary operation without narrating each line.

## Apply DRY to knowledge and rules

Before adding logic, look for its existing owner and supported reuse points.
Keep one authoritative implementation of a business rule when callers must agree
and changes should propagate together. Call the owner rather than copying its
logic or reaching through its interface to manipulate internal state.

Similar syntax alone does not justify shared code. Keep independent concepts
separate when they have different reasons to change; do not create a flag-heavy
helper to combine them. Distinguish repeated business decisions from intentional
validation at different trust boundaries. When extracting shared behavior, check
that its contract fits the actual callers and preserves their error semantics.

Choose the simplest implementation that satisfies current obligations. Avoid
speculative extension points, generic frameworks, and configuration for imagined
requirements. Prefer explicit, cohesive operations over clever indirection.

## Preserve the design while coding

Implement through the intended interfaces and real entry points. Keep business
rules with their owner, and preserve dependency direction, transaction scope,
authorization, concurrency guarantees, and resource cleanup. Do not bypass an
invariant or split an atomic operation to make a local function easier to write.

When implementation evidence contradicts a design premise, revisit the affected
decision and make the resulting change clear. Resolve routine details locally;
seek user input only when the correction changes a material product obligation
or exceeds existing authorization.

## Validate behavior and inspect the diff

Use the project's relevant checks and tests for changed behavior and failure paths.
Run configured formatting, linting, or type checks as appropriate; do not invent
new tooling or low-value tests for a routine reversible edit.

Inspect the final diff for duplicated rules, inconsistent conventions, accidental
public contracts, boundary bypasses, and unnecessary abstraction. Re-check the
applicable project contract before declaring completion. Correct demonstrated
problems within scope and report decisive evidence and remaining limitations.
Passing tests establishes tested behavior, not maintainability or production
readiness by itself.
