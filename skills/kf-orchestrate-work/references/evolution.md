# Evolution contract

SkillOpt-Sleep optimizes explicitly selected non-K-Fleet skills offline. Supermemory captures bounded
terminal episodes from normal task outcomes; the hot path does not rewrite skills.

The evolution cycle is:

```text
harvest -> redact/review -> mine -> replay -> bounded edit
        -> held-out gate -> stage -> adopt -> post-adoption verification
```

## Required boundaries

- Scope transcript harvesting and recalled episodes to the active project. Treat
  harvested prompts and evidence logs as sensitive.
- Set SkillOpt-Sleep's `evolve_memory` to `false`. Supermemory owns memory
  consolidation. SkillOpt must never modify any `kf-*` skill, its references, or
  a renamed or symlinked copy that still identifies itself as a K Fleet skill.
  K Fleet skills are maintained through authorized source changes and package updates.
- Exclude secrets, raw tool arguments and outputs, unrelated repositories, and
  unsupported inferred memories from training material.
- Require an explicitly selected, existing non-`kf-*` skill in the active project.
  No target means no optimization; do not fall back to discovery or all skills.
  Check the canonical path and declared skill name before any optimization or adoption.
  Reject a K Fleet target even when its benchmark and adoption gates pass.
  Disable multi-skill fan-out and automatic adoption. Legacy staging and scheduled
  runs must not bypass the selected target. If the runtime cannot enforce this
  boundary, stop the affected action without writing.
  Do not let a generated candidate change user authority, external-action policy,
  memory isolation, provenance requirements, or the validation gate.
- Use held-out tasks that test observable routing, actions, stopping, memory scope,
  and tool outcomes rather than wording. Enable a no-regression gate for protected
  invariants.
- A rejected candidate remains evidence, not active guidance. An accepted candidate
  is versioned and must be reversible to its exact predecessor.
- Adoption requires the configured gate to pass, protected invariants to hold,
  and every actual write destination to match the selected non-K-Fleet target.
  Record the candidate, baseline, scores, and rollback target. Keep the candidate
  staged when the runtime cannot bind adoption to that validated target.

Supermemory owns episode capture and supplies scoped prior experience. SkillOpt owns
candidate optimization and evaluation. The orchestrator owns runtime selection and
post-adoption verification. None of these components may treat a benchmark gain as
permission to broaden repository or user policy.
