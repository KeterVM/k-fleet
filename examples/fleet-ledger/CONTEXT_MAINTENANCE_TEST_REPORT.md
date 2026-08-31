# Context Maintenance Forward-Test Report

Date: 2026-08-25

Empty-candidate discovery revalidated: 2026-08-31

Two independent evaluators exercised `kf-maintain-context` against fresh fixtures
under `/private/tmp`. They did not modify K Fleet, did not receive expected answers,
and removed their fixtures after evaluation.

## Scenarios exercised

- Authorized initialization created one evidence-backed root `AGENTS.md`, retained
  verified commands and ownership facts, avoided unnecessary nested files, and
  left global Codex guidance unchanged.
- A nested audit modeled root instructions, an empty higher-precedence override,
  configured fallback files, a 320-byte project instruction limit, shadowing, and
  truncation. Audit-only mode made no writes and runtime limitations were explicit.
- Policy-boundary cases separated verified repository facts from a request to infer
  permanent policy from one example, while respecting a direct user policy decision
  in its authorized scope.
- Monorepo evaluation delegated two proven non-overlapping members read-only while
  the parent retained root scope, conflicts, every write, integration, and
  readiness. A monolith case correctly stayed with the parent.
- Configuration inspection used only the discovery and size keys required for the
  decision and did not output unrelated sensitive values.

## Findings and corrections

The original runtime check found that installed Codex selected the first existing
candidate: an empty override contributed no instructions but still suppressed a
lower-precedence `AGENTS.md`. A fresh isolated control on 2026-08-31 reproduced
that behavior on Codex `0.151.0-alpha.7.2`: the lower-file marker loaded without
the override and did not load with an empty override. Current official guidance
instead describes empty files as skipped. The earlier universal claim is therefore
superseded; the skill now records this as version-dependent and requires an
isolated check before claiming which same-directory file is active.

The first pass also found ambiguity between ownership facts and owner-notification
policy, between a direct user mandate and a request to infer policy, and between the
project byte budget and user-level guidance. The skill now distinguishes these
cases and requires targeted, redacted configuration reads. Fresh isolated rechecks
found no remaining material ambiguity in the corrected decisions.

## Result

The evaluated initialization, discovery, precedence, truncation, authority,
learning-boundary, sensitive-configuration, and delegation paths are ready within
their recorded boundaries. Runtime loading was proven for initialization and for
the installed version's empty-override behavior; that result is not treated as a
portable rule. Other cases that could not start a nested Codex run were reported
as static checks rather than runtime proof.
