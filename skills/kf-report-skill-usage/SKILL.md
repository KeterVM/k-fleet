---
name: kf-report-skill-usage
description: Generate a portable, agent-oriented K Fleet feedback packet after work reaches a terminal state in a target repository. Use when the user asks to capture how K Fleet skills were actually selected, composed, handed off, and verified so the packet can be given to K Fleet maintainers. Do not use for an ordinary task summary, ongoing implementation, current-project correction, or directly changing any skill.
---

# Report Skill Usage

Export evidence about a completed or stopped K Fleet run for later analysis in the
K Fleet source repository. This reporting workflow sits outside the task's primary,
method, correction, verification, and learning loops.

Before producing the packet, read
[the feedback packet contract](references/feedback-packet.md). Preserve its logical
field names and evidence rules; the serialization may be JSON, YAML, Markdown, or
another clearly delimited text format that an agent can consume reliably.

## Workflow

1. Identify the task or task range the user wants reported and its terminal state.
   Do not resume, correct, verify, or otherwise extend the reported work. If the
   boundary is ambiguous, use the narrowest completed work visible in the current
   task and state that assumption.
2. Establish the evidence boundary from the visible conversation, reported task
   artifacts, K Fleet installation metadata, and directly relevant repository
   guidance. Do not search unrelated project content merely to make the packet look
   complete.
3. Record provenance when available. Prefer `skills-lock.json` source and hashes,
   then accessible installed `SKILL.md` hashes or repository revision. Mark missing
   provenance as `unknown`; never invent a version from the current K Fleet release.
4. Reconstruct the ordered skill trace. Distinguish:
   - skills observed as selected or loaded;
   - workflow phases explicitly handed off or re-entered;
   - installed skills that were only available;
   - candidate skills inferred from behavior but not proven to have run.
   Do not report availability, matching output, or expected routing as invocation
   evidence.
5. For every observed phase, capture why it was selected, its role, the evidence
   it produced, its effect on the result, and any friction or user correction.
   Separate direct observations from interpretation and assign calibrated
   confidence.
6. Identify possible suite-level signals such as false-positive or false-negative
   routing, boundary overlap, missing or unnecessary handoffs, premature stopping,
   excessive process, missing evidence, unclear instructions, or version drift.
   Include counterevidence. A signal is a maintainer review input, not a durable
   lesson or authority to modify K Fleet.
7. Remove or generalize secrets, credentials, personal data, proprietary
   identifiers, raw logs, large code excerpts, and unrelated project detail. Keep
   only the smallest evidence needed to explain the observed skill behavior.
8. Emit one self-contained feedback packet following the contract. Return it
   inline by default. Write exactly one report artifact only when the user requests
   a file or supplies a destination. Do not send or submit it anywhere; the user
   transfers it to the K Fleet maintainer.

## Constraints

- Remain read-only except for an explicitly requested report artifact.
- Do not change production code, tests, documentation, project context, installed
  skills, K Fleet sources, or the reported task result.
- Do not invoke a task workflow, `kf-learn-from-evidence`, or a persistence owner
  from this reporting workflow.
- Do not claim access to hidden system telemetry or a complete invocation log.
  Report context compression, missing turns, unavailable artifacts, and uncertain
  attribution explicitly.
- Do not recommend exact skill wording when the evidence supports only a symptom.
- Keep the packet self-contained and optimized for another agent, not for narrative
  polish.

Reporting is complete when the packet identifies its evidence boundary and
provenance, distinguishes observed usage from inference and availability, records
material effects and uncertainty, contains only sanitized evidence, and can be
handed to a K Fleet maintainer without relying on the original conversation.
