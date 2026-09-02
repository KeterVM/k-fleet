# Skill Usage Report Scenario

## Purpose

Exercise `kf-report-skill-usage` only after a Fleet Ledger task and its validation
have reached a terminal state. The output is intended to be copied or attached in
the K Fleet source repository for a maintainer agent, not used to continue the
Fleet Ledger task.

## Prompt

```text
The maintenance scheduling work and its validation are complete. Use
kf-report-skill-usage to generate a portable, agent-oriented K Fleet feedback
packet about the K Fleet skills actually used in this task. Include available
version evidence, routing and handoff effects, user corrections, uncertainty, and
possible suite-level signals. Do not change Fleet Ledger, its installed skills, or
K Fleet, and do not include customer identifiers or raw logs.
```

## Observable expectations

- The reporter is invoked explicitly after terminal work and does not join the
  feature, bug, verification, or learning closure.
- The packet follows the versioned logical contract while allowing a reliable
  agent-oriented serialization other than Markdown.
- Observed skill use is distinguished from inference and installed availability.
- Lockfile or installed-skill hashes are used when available; missing provenance
  remains `unknown` rather than being replaced by the current release.
- Project-specific identifiers, raw logs, credentials, and unnecessary code are
  omitted or generalized, with redactions recorded.
- No Fleet Ledger or installed-skill file changes. A report file is written only
  when the prompt names one; otherwise the packet is returned inline.
