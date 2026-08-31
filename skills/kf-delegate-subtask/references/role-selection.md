# Role and Capability Selection

Read this reference when delegation needs a quality tier, model override,
reasoner, specialist, or configured custom agent. Routine use of the built-in
`explorer` or `worker` does not require it.

## Select the role

Choose the role from the bounded question, not from a generic expert label:

- **Reviewer or verifier:** read-only, fresh context, quality-first. Use for
  correctness, security, merge readiness, counterexample search, and independent
  post-change assessment.
- **Reasoner:** normally read-only and quality-first. Use for ambiguous design,
  difficult diagnosis, algorithms, migrations, concurrency, or cross-boundary
  tradeoffs.
- **Explorer:** read-only and usually balanced or efficient. Use for repository
  mapping, test discovery, log inspection, or independent evidence collection.
- **Worker:** bounded write authority and usually efficient or balanced. Use only
  for a stable, well-specified slice with exact ownership and objective checks.
- **Specialist:** domain-specific and read-only by default. Choose capability from
  the question's risk and difficulty rather than assuming every specialist needs
  the strongest model.

## Match capability to consequence

Select the strongest suitable currently available model for quality-first work
and use high or `xhigh` reasoning when risk and complexity justify it. Select a
balanced model and medium reasoning for mixed exploration or moderate
implementation. Select a cost-efficient model with low or medium reasoning for
clear, repetitive, easily checked work.

Current Codex examples are the frontier Sol tier for demanding reviewers and
reasoners, Terra for balanced workers and scans, and Luna for narrow repeatable
work. Treat these as runtime mappings, not portable permanent identifiers. Prefer
an applicable configured custom agent when its instructions, tools, sandbox, and
model match the role.

When an explicit model override is supported, pass only the minimum task context
needed by that sub-agent instead of inheriting the whole conversation by default.
Do not use a cheaper model for a hard review merely to reduce cost, or a frontier
model for mechanical work with stable checks and low consequence.
