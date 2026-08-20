# Specialist Delegation Skill Test Report

Date: 2026-08-20

## Result

`kf-delegate-specialist` passed source and project-installed structural validation.
Its description and scenario distinguish explicit specialist orchestration from
ordinary implementation, investigation, and verification.

## Verification

```text
K Fleet source skills:          8
Project-installed skills:       8
Skills recorded in lockfile:    8
New source skill validation:    pass
New installed skill validation: pass
Installed/source mismatches:    0
```

## Routing checks

| Request | Expected behavior |
| --- | --- |
| “Ask a transport-regulations specialist to review these supplied rules.” | Use `kf-delegate-specialist` in advisor mode. |
| “Implement the approved emissions calculation.” | Use `kf-implement-feature`; do not delegate automatically. |
| “Investigate why the current calculation differs.” | Use `kf-investigate-issue` unless specialist delegation is explicitly requested. |
| “Have an independent specialist verify this domain assumption.” | Use `kf-delegate-specialist` in verifier mode; the parent still validates integration. |

## Limits

This test validates installation, routing boundaries, and the handoff contract. It
does not claim that a sub-agent has different model capabilities, professional
credentials, or broader permissions. No sub-agent was spawned during this creation
test; actual delegation should occur only when a user request or active workflow
authorizes it and a bounded specialty would add value.
