---
name: kf-implement
description: Deliver understood software changes through existing capabilities, test design decisions against implementation evidence, and validate the complete integrated behavior.
---

# Implement

## Runtime and authority

For substantive work, establish the canonical repository/worktree, applicable
project instructions, user scope, and stopping condition. Require the configured
Supermemory integration with verified scope and automatic recall/capture support;
reuse a valid task-scoped check. Direct integration is sufficient without optional
MCP transport. If unavailable or unscoped, stop and report the missing capability.

Current instructions and scoped sources override memory. Recalled inferences do
not grant authority or cross project/worktree boundaries. Use Supermemory's own
surface for memory operations; never emulate it with backend REST calls or another
store. Preserve read-only requests and existing authorization across methods.
Normal task execution does not rewrite live skills or policy. Instruction changes
require authorized, versioned, reversible source maintenance. Report actual
evidence without claiming unobserved capture or execution.

Within higher-priority constraints, explicit user instructions override skill
guidance. Preserve actual scope and authorization limits. If a skill rule causes
you to pause or leave work unfinished, link to its file, quote the rule, and
distinguish its requirement from your interpretation. Continue independent
authorized work only where its prerequisites are met.

## Method

Own the integrated result of the change. Understand its relevant entry points,
rules, state, and expected outcome; reuse accepted design and existing capabilities.
Settle materially unresolved ownership or interface decisions before encoding an
accidental contract. A routine edit needs no separate design exercise or approval
checkpoint. Prioritize evidence for assumptions that could invalidate dependent
work, while continuing independent authorized work.

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

## Build on existing capabilities

Before adding logic, look for its existing owner and supported reuse points.
Keep one authoritative implementation of a business rule when callers must agree
and changes should propagate together. Call the owner rather than copying its
logic or reaching through its interface to manipulate internal state.

Similar syntax alone does not justify shared code. Keep independent concepts
separate when they have different reasons to change; do not create a flag-heavy
helper to combine them. Distinguish repeated business decisions from intentional
validation at different trust boundaries. When extracting shared behavior, check
that its contract fits the actual callers and preserves their error semantics.

Require a present purpose for added abstractions, dependencies, state, or
configuration. Prefer explicit, cohesive operations with less overall coordination;
local brevity does not justify making callers manage more of the implementation.

## Test the design against implementation

Implement through the intended interfaces and real entry points. Keep business
rules with their owner, and preserve dependency direction, transaction scope,
authorization, concurrency guarantees, and resource cleanup. Do not bypass an
invariant or split an atomic operation to make a local function easier to write.

Accumulating exceptions, repeated mapping, or fragile coordination can reveal a
poor fit. Investigate their cause before adding another workaround; revise the
affected decision when the evidence warrants it. These are signals to reason about,
not blanket prohibitions on necessary adapters or special cases.

When the user corrects a result, identify the underlying behavior or responsibility
at issue and check related effects within scope. A local patch is sufficient when
it resolves that cause. Resolve routine technical details and make consequential
design changes clear; ask only when a correction changes a material product
obligation or exceeds existing authorization.

## Complete the change

Follow the behavior through its real callers and dependencies. Finish the wiring,
failure handling, and resource cleanup required for usable behavior. When replacing
an existing path, update affected consumers and remove code or configuration made
obsolete by this change. Preserve actual compatibility obligations; do not leave
parallel paths by accident or use cleanup to justify unrelated refactoring.

## Validate behavior and inspect the diff

Use the project's relevant checks and tests for changed behavior and failure paths.
Run configured formatting, linting, or type checks as appropriate; do not invent
new tooling or low-value tests for a routine reversible edit.

Reuse check results whose source version, environment, and scope still apply.
Broaden or repeat checks only when new changes, failures, environment changes,
or uncovered risks warrant it.

Inspect the integrated change for duplicated responsibility, extra caller burden,
inconsistent conventions, accidental public contracts, and boundary bypasses.
Re-check the applicable project contract before declaring completion. Correct
demonstrated problems within scope and report decisive evidence and limitations.
Passing tests establishes tested behavior, not maintainability or production
readiness by itself.

Finish when required checks pass, material delivery obligations have evidence,
and no material issue remains unresolved. Report blockers and unverified
obligations rather than claiming completion.
