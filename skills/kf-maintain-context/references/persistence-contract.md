# Persistence Contracts

Read this reference only when placing direct already-decided policy or an
authorized contract from `kf-learn-from-evidence`.

Context maintenance is the only K Fleet workflow that writes effective Context:
`AGENTS.md`, `AGENTS.override.md`, configured fallback instruction files, and
canonical documents intentionally routed by those entry points.

- Accept either a direct user decision with exact rule and scope or an authorized
  contract from `kf-learn-from-evidence` containing lesson, evidence, intended
  behavior, destination and scope, conflicts, authority, and verification target.
- If the rule is still being inferred, recommended, or semantically decided,
  return it to learning. If exact destination or scope lacks authority, stop
  without writing and request that authority.
- Place the authorized rule in the narrowest effective owner. Reconcile duplicates,
  stronger instructions, discovery precedence, and byte limits without changing
  the lesson's meaning. Return a material semantic conflict to learning or the
  user rather than silently rewriting policy.
- After mutation, run effective-Context verification and return the actual change,
  loaded scope, evidence, limitations, and residual conflicts to the learning
  workflow when the change originated there.
