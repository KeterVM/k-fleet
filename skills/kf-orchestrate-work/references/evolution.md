# Evolution contract

SkillOpt-Sleep is K Fleet's offline evolution engine. Supermemory captures bounded
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
  consolidation; SkillOpt may optimize only the explicitly named orchestrator skill
  or reference target.
- Exclude secrets, raw tool arguments and outputs, unrelated repositories, and
  unsupported inferred memories from training material.
- Optimize the live `kf-orchestrate-work` skill or one named reference at a time.
  Do not let a generated candidate change user authority, external-action policy,
  memory isolation, provenance requirements, or the validation gate.
- Use held-out tasks that test observable routing, actions, stopping, memory scope,
  and tool outcomes rather than wording. Enable a no-regression gate for protected
  invariants.
- A rejected candidate remains evidence, not active guidance. An accepted candidate
  is versioned and must be reversible to its exact predecessor.
- Automatic adoption is permitted only when the configured gate passes, protected
  invariants do not regress, the target and write scope are preconfigured, and the
  adoption mechanism records the candidate, baseline, scores, and rollback target.
  Otherwise stage for review.

Supermemory owns episode capture and supplies scoped prior experience. SkillOpt owns
candidate optimization and evaluation. The orchestrator owns runtime selection and
post-adoption verification. None of these components may treat a benchmark gain as
permission to broaden repository or user policy.
