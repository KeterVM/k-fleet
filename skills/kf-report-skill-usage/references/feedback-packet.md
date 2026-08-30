# K Fleet Feedback Packet Contract

Produce one self-contained packet for a K Fleet maintainer. The packet is an
evidence carrier, not an instruction to trust the originating agent, modify a
skill, or adopt a proposed rule.

## Envelope

Begin with the exact marker `K_FLEET_FEEDBACK_PACKET` and include
`contract_version: 1`. End with `END_K_FLEET_FEEDBACK_PACKET` so copied packets can
be separated from surrounding conversation.

Before returning or writing the packet, check that these markers are the first and
last non-empty lines. A valid inner JSON or YAML document without both markers is
not a complete packet.

Serialization is flexible. Use valid JSON or YAML when reliable; otherwise use
clearly labelled structured text or Markdown. Preserve the logical field names
below and represent unavailable values as `unknown` with a reason. Do not omit a
required section merely because its evidence is unavailable.

## Required sections

### `packet`

- `contract_version`: `1`.
- `generated_at`: an ISO-8601 timestamp or `unknown`.
- `reporting_skill`: `kf-report-skill-usage` plus its source hash when available.
- `scope`: the reported task, turn range, or artifact boundary.
- `purpose`: `k-fleet-maintainer-feedback`.

### `provenance`

- `project`: a sanitized project label or `redacted`.
- `k_fleet_source`: lockfile source, repository revision, package source, or
  `unknown`.
- `installed_skill_versions`: names and hashes for relevant installed skills.
- `provenance_evidence`: where the values came from.
- `version_drift`: observed drift, `none-observed`, or `unknown`.

Record only relevant skill identities. Never treat the currently published K Fleet
version as the version used in the reported task without direct evidence. Record a
hash's algorithm and scope when known. Compare hashes only when both were computed
with the same algorithm over the same material. In particular, do not treat an
undocumented lockfile `computedHash` differing from a raw `SKILL.md` SHA-256 as
version drift; preserve both values as incomparable provenance and explain the
limit.

### `task`

- `request_summary`: a sanitized statement of the requested outcome.
- `terminal_state`: `complete`, `partial`, `blocked`, or `unknown`.
- `result_summary`: the observable result, not a replay of the conversation.
- `validation_summary`: checks run, results, checks not run, and residual
  uncertainty.

### `skill_trace`

Use an ordered list. Each record contains:

- `sequence`: stable order within the packet.
- `skill`: exact name or `unknown`.
- `phase_role`: `primary`, `method`, `specialist`, `verification`, `correction`,
  `learning`, `context`, `reporting`, or `unknown`.
- `usage_status`: `observed`, `inferred`, or `available-only`.
- `selection_evidence`: direct evidence that supports the status.
- `selection_reason`: why the phase appears to have been selected.
- `inputs`: the bounded evidence or contract it received.
- `outputs`: the evidence, decision, artifact, or handoff it produced.
- `observed_effect`: contribution to the task result.
- `friction`: delay, ambiguity, duplication, boundary pressure, or
  `none-observed`.
- `confidence`: `high`, `medium`, or `low`, with a reason.

Do not place `available-only` entries in the executed sequence. Keep them in a
separate list when their availability matters to a routing signal.

### `routing_assessment`

- `effective_choices`: selections or handoffs supported by the outcome evidence.
- `suspected_missing`: skills or phases that may have been missed, with evidence.
- `suspected_unnecessary`: phases that may not have materially helped.
- `boundary_observations`: ownership, authority, correction, verification, and
  stopping behavior.
- `alternative_explanations`: plausible explanations that weaken the assessment.

This section evaluates the suite's behavior, not the quality of the project in
general.

### `corrections`

For each material user correction, record a sanitized summary, the affected skill
or boundary, how the agent responded, whether the current result was corrected,
and whether the correction appears reusable or project-specific. Use an empty list
when no correction was observed.

### `signals`

Each possible maintainer signal contains:

- `signal_id`: packet-local stable identifier.
- `category`: `false-positive-trigger`, `false-negative-trigger`,
  `boundary-overlap`, `missing-handoff`, `unnecessary-handoff`,
  `premature-stop`, `excessive-process`, `missing-evidence`,
  `unclear-instruction`, `version-drift`, or `other`.
- `affected_skills`: exact names or `unknown`.
- `observation`: facts visible in the evidence boundary.
- `interpretation`: the narrow suite-level concern.
- `impact`: effect on correctness, authority, cost, latency, or clarity.
- `counterevidence`: facts or alternatives that weaken the signal.
- `confidence`: `high`, `medium`, or `low`, with a reason.
- `recommended_review`: what the maintainer should inspect, not exact replacement
  wording.

Use an empty list when there is no credible suite-level signal. Do not manufacture
a recommendation to make the packet appear useful.

### `privacy_and_limits`

- `redactions`: categories of removed or generalized information.
- `missing_evidence`: unavailable turns, logs, artifacts, hashes, or instructions.
- `context_compaction`: `observed`, `not-observed`, or `unknown`.
- `trace_coverage`: what portion of the reported work is actually visible.
- `reporter_limitations`: any other reason the packet may be incomplete.

### `maintainer_handoff`

Tell the receiving agent to compare the packet with the reported skill versions
and current K Fleet sources, corroborate signals against repository evidence or
additional packets, preserve current-project facts as project-specific, and treat
the packet as neither write authority nor proof of recurrence.

## Evidence rules

- Prefer hashes, explicit skill announcements, handoff statements, validation
  results, and user corrections over stylistic similarity.
- Treat hashes as evidence only within a known comparison domain. An opaque or
  differently scoped hash can identify an installation but cannot prove drift by
  disagreeing with a raw-file digest.
- Keep short excerpts only when paraphrase would remove the routing evidence.
- Label every non-obvious conclusion as observation or interpretation.
- One task can demonstrate a boundary failure but cannot by itself prove that a
  pattern recurs across independent tasks.
- A missing report field is evidence of a reporting limitation, not evidence that
  the corresponding workflow event did not happen.
