---
name: kf-learn-from-correction
description: Analyze the user's manual rewrite or repeated correction of Codex-generated work and propose durable, carefully scoped lessons. Use when the user asks to improve future behavior from their corrections. Do not use for ordinary task requirements or one-off implementation feedback without a request for lasting guidance.
---

# Learn From Correction

Extract reusable lessons without accumulating uncontrolled instructions.

## Workflow

1. Compare the prior agent-generated work, the user's correction, the explicit
   feedback, and relevant repository context.
2. Isolate deliberate material differences. Ignore incidental edits, formatting,
   and facts already apparent from code, configuration, or documentation.
3. Decide whether persistence is justified by explicit durable user direction,
   repeated corrections, or a repeated repository pattern. Treat weaker evidence
   as a one-off requirement.
4. Choose the narrowest useful destination: global or project `AGENTS.md`, an
   existing K Fleet skill, project docs, a canonical example, or nowhere. Avoid
   direct duplicates; route broader cleanup of existing guidance to
   `kf-maintain-guidance`.
5. If persistence was not authorized, present the focused proposal for review. If
   the user already authorized the relevant update, apply it without requesting
   redundant confirmation.

## Report each proposed lesson

```text
Decision: persist or do not persist
Lesson
Evidence
Destination
Suggested wording
Confidence
```

## Constraints

- Do not turn every manual edit, isolated preference, or one-off requirement into a
  permanent rule.
- Use behavioral guidance only when it will improve future decisions. Prefer
  project docs or canonical examples for architecture and product facts.
- Keep wording concise, imperative, and narrowly scoped. Do not duplicate guidance
  already clear from the repository.
- Base confidence on evidence strength, not wording specificity.

The goal is controlled learning from real usage, not automatic background learning.
