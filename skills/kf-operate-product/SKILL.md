---
name: kf-operate-product
description: Establish or improve live product operation, or diagnose and recover a running service using actual reliability and user-impact evidence.
---

# Operate product

Keep an operating product usable and recoverable, or resolve a concrete operational
problem. Use for requested operational readiness, reliability improvements, or live
incidents. A local code defect does not automatically require an operations exercise.

## Select supporting guidance

- For service objectives, monitoring, capacity, cost, or support responsibilities,
  read [Service operation](references/service-operation.md).
- For incidents, recovery, or lessons from a failure, read
  [Incident and recovery](references/incident-and-recovery.md).

## Scope and authority

Identify the service, project, environment, affected users, and task authority.
Use current configuration, operational records, and scoped runtime observations.
Treat recalled context as evidence to check, not permission for production actions.
Diagnostic access does not authorize changing resources, restoring data, sending
messages, or modifying alerting and access controls.

Carry established authority through the work without repeated approval gates. If a
necessary action lacks authority, prepare a bounded proposal with the observed impact
and expected effect, then request the missing decision. Continue independent safe
diagnosis. Do not expand an incident response into unrelated infrastructure redesign.

Determine missing facts directly where possible. Ask when missing intent or policy
changes service obligations, acceptable loss, cost, or affected users. Do not invent
uptime targets, recovery limits, budgets, or permission to discard data. Handle
operational data within its authorized scope and avoid exposing credentials or
unnecessary personal data in logs and reports.

## Operate from useful evidence

Connect the important user outcome to signals that distinguish healthy, degraded,
and incomplete work. Reuse established objectives, telemetry, runbooks, and ownership.
Add instrumentation only where it closes a material detection or diagnosis gap;
a dashboard count is not evidence of operational readiness.

For a live problem, establish current impact and recent relevant changes, preserve
useful evidence, and choose a bounded diagnostic or mitigation action. Favor recovery
over exhaustive causal analysis when users are affected, while respecting data
integrity and authorization. A plausible explanation is not yet an established cause.

Observe the effect of each consequential action. Avoid conflicting interventions,
unbounded retries, or changes whose outcomes cannot be distinguished. If evidence
contradicts the hypothesis or the action worsens impact, stop or change strategy.
Use existing escalation and incident ownership when local authority or tools are
insufficient.

## Restore and improve

Verify the affected user path and relevant data or dependency state before claiming
recovery. Separate restored availability, residual backlog or data damage, and root
cause correction. Report actual changes, evidence, remaining impact, and the owner
of unresolved work. A temporary mitigation needs an explicit follow-up or removal
condition; do not silently treat it as the final design.

For readiness or reliability work, demonstrate the requested operational capability
through applicable observations or authorized checks. State untested recovery paths.
Stop at the task's bounded completion or a dependency requiring access or a decision;
ongoing monitoring needs an authorized mechanism, duration or stopping condition,
and owner. Do not imply continued observation after the task ends.

Return code defects to implementation, release transitions to `kf-release-product`,
and questions about product benefit to `kf-evaluate-product` as needed. Repeated
operational friction may justify a method-improvement proposal; it does not authorize
rewriting core skills or user goals.
