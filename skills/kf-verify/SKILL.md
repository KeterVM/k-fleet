---
name: kf-verify
description: Verify that delivered software implements the requested functionality and identify relevant defects, regressions, and integration or runtime problems.
---

# Verify

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
Normal task execution does not rewrite live skills or policy. K Fleet skills and
references are excluded from SkillOpt; optimization of explicitly selected
non-kf-* skills keeps memory evolution disabled and adoption versioned, reversible,
and gated. Report actual evidence without claiming unobserved capture or execution.

## Method

Determine whether the requested behavior is implemented and whether the delivery
has other material problems. Start from the original request, accepted scope,
project instructions, and current artifacts, not only the implementer's summary
or tests. Evidence quality supports this work; collecting check results alone is
not a substitute for checking the feature.

## Establish what must work

Map the important requirements to observable behavior and actual entry points.
Identify missing behavior, incomplete wiring, or assumptions that narrowed the
request. Reuse adequate acceptance criteria; resolve consequential ambiguities
instead of silently choosing the implementation as the specification.

Inspect the affected callers, dependencies, permissions, and state to select
plausible failure and regression scenarios. Keep the scope proportional to the
change. Include relevant code and integration risks without turning every feature
verification into a repository-wide audit or unrelated architecture redesign.

## Exercise the delivered behavior

Choose the evidence needed for each material obligation: existing automated tests,
additional tests, real application interaction, targeted code inspection, or a
runtime probe. Use actual entry points for behavior whose wiring or integration
matters. Type checks and mocked tests cannot by themselves prove that a user flow
or real dependency works.

Check normal use and relevant boundary or failure conditions, such as denied
access, invalid input, retries, partial failure, or changed state. Verify the
result and required side effects, including what must not happen on failure.
Exercise related existing behavior where the change could cause regressions.

Inspect for material problems that successful scenarios may miss: unreachable
paths, bypassed invariants, resource lifetime issues, incompatible contracts, or
unbounded work. Confirm a concrete trigger and impact before reporting a defect;
separate structural tradeoffs and unresolved risks from demonstrated failures.

## Fill meaningful evidence gaps

Reuse current evidence when its source version, environment, and tested scope
still apply. Avoid rerunning an unchanged check merely to produce another result.
When durable regression protection or a missing behavior check warrants new tests,
write them using the project's conventions; use kf-write-tests when available.
This workflow remains usable without that skill: derive expectations from the
contract, keep relevant boundaries real, and run the resulting tests.

Use disposable local state and permitted environments. Respect read-only reviews;
in that mode propose persistent tests or use non-mutating probes. Verify access
does not authorize production mutations, external messages, or deployment.
Distinguish environment blockers from product failures and state what remains
unverified when an appropriate environment is unavailable.

## Report problems and verify corrections

For each confirmed problem, record the trigger or reproduction, expected versus
actual behavior, relevant location, and impact. Keep enough evidence for correction
without treating speculative concerns as defects. In verification-only work,
report findings without modifying product code; when correction is already
authorized, continue through the fix and targeted regression checks.

After a correction, recheck the failing scenario and affected neighboring behavior.
Revisit earlier results when changed code or environment invalidates them. Clearly
distinguish passed, failed, and unverified obligations in the final assessment.
Tie the conclusion to the actual version and scope checked; do not infer complete
delivery from a green suite that omits required behavior, or production readiness
from local checks. Supply the assessment to the coordinating agent when delegated;
do not claim authority over the whole task's completion.
