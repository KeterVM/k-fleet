## What changed

Describe the user intent and the smallest complete change that addresses it.

## Why it belongs in K Fleet

Explain why the behavior is reusable across projects and how its routing boundary
fits the single orchestrator without adding another catalog entry.

## Validation

- [ ] `node scripts/validate-repository-structure.mjs`
- [ ] `node scripts/validate-orchestrator-evals.mjs`
- [ ] `npm test` from `examples/fleet-ledger` when relevant
- [ ] README, examples, and current eval corpus are accurate
- [ ] No project-specific facts, placeholders, or unrelated changes were added
