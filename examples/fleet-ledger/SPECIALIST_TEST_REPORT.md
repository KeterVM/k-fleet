# Specialist Delegation Skill Test Report

Date: 2026-08-20

## Result

`kf-delegate-specialist` passed source and project-installed structural validation.
Its description and scenario now distinguish perspective, research, independent
review, and authorized execution while preserving ordinary workflow boundaries.

## Verification

```text
Skill quick validation:         pass
K Fleet repository validation: pass (8 source and 8 installed skills)
Installed/source mismatches:    0
Fleet Ledger tests:             pass (15 tests)
```

## Routing checks

| Request | Expected behavior |
| --- | --- |
| “Apply an instructional-design framework to this supplied onboarding draft.” | Use `kf-delegate-specialist` in perspective mode without external research. |
| “Research how the current transport regulations affect our reports.” | Use `kf-delegate-specialist` in research mode with authoritative, dated sources. |
| “Implement the approved emissions calculation.” | Use `kf-implement-feature`; do not delegate automatically. |
| “Investigate why the current calculation differs.” | Use `kf-investigate-issue` unless separable domain analysis materially improves the diagnosis and policy permits delegation. |
| “Independently challenge this market-sizing conclusion.” | Use `kf-delegate-specialist` in independent review mode without priming it with the preferred answer. |
| “Have a specialist update only the approved policy document.” | Use execution mode only when the user authorizes the change and the specialist has exclusive ownership. |

## Limits

This test validates installation, routing boundaries, mode selection, and the
handoff contract. It does not prove domain correctness or claim that a sub-agent has
different model capabilities, professional credentials, or broader permissions. No
sub-agent was spawned during this documentation test; actual delegation should occur
only when a user request or active workflow authorizes it and a bounded specialty
would add value.
