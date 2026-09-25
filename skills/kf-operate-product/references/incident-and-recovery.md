# Incident and recovery

## Establish impact and ownership

Determine which users and outcomes are affected, when the problem began, and whether
it is continuing. Check recent releases, configuration changes, workload shifts, and
dependencies as hypotheses. Preserve timestamps and enough evidence to distinguish
cause from coincidence. Use the existing incident owner and communication policy;
drafting an update does not authorize sending it.

## Choose a bounded intervention

Before a consequential action, state the expected observation, impact boundary,
reversibility, and condition for stopping. Prefer an established mitigation when its
premises hold. Do not repeatedly restart, scale, or retry work without checking the
effect and possible data consequences. Preserve diagnostic evidence before actions
that destroy it when doing so does not materially delay necessary recovery.

For queued work, writes, or data restoration, account for partial completion, duplicate
effects, and newer data. Determine the actual state before replaying or restoring.
If the action is irreversible or outside authority, make the exact recovery choice
reviewable and request the missing decision. Continue independent investigation.

## Confirm recovery and learn

Observe the user path and the relevant indicators after mitigation for a period
suited to the failure mode. Check delayed work or corrupted state where applicable.
Reduced errors can reflect reduced traffic rather than recovery; compare the
observation with workload and baseline conditions.

Report facts separately from causal hypotheses. Capture the timeline, impact,
effective and ineffective interventions, remaining damage, and unresolved questions
when useful for continuation. Fix the supported cause within the authorized task,
including relevant regression evidence; incident notes alone do not complete an
authorized correction.

Choose follow-up actions that address an evidenced failure in detection, recovery,
implementation, or assumptions. Assign the next action and an observable completion
condition. Do not mandate a new rule or architectural layer for every incident;
revise the method only when the evidence supports that broader change.
