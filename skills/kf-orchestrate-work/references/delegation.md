# Delegation method

Delegate only when the subtask has a crisp boundary and stopping condition and the
benefit exceeds handoff cost: independent review, difficult reasoning, parallel
read-only exploration, specialist evidence, or a deterministic isolated write.

- Use the minimum number of agents. Routine local work stays with the orchestrator.
- Give each agent an exact objective, allowed artifacts and commands, authority,
  exclusions, verified context, required evidence, and return shape.
- Prefer read-only roles for exploration, reasoning, and review. A writer receives
  exclusive ownership of exact files or one coherent slice; never overlap writes or
  split tightly coupled production and test changes across agents.
- The orchestrator retains product scope, authorization, integration, shared
  surfaces, conflict resolution, and final completion.
- Treat agent output as evidence. Inspect it against the current artifact and direct
  evidence; resolve disagreement by evidence rather than majority vote.
- A writer does not independently verify its own result. Start fresh review only
  after integrated writes stop.

If the requested agent, model, mechanism, or independence is unavailable, report
that limitation and never claim the delegation occurred.
