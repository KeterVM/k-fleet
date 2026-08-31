---
name: kf-delegate-subtask
description: Delegate a bounded Codex sub-agent role for independent review, difficult reasoning, parallel read-only exploration, specialist evidence, or an isolated implementation slice. Use only when the benefit exceeds handoff cost. Select capability proportionately, isolate writes, and return evidence to the owning workflow. Do not delegate routine local work, overlap writes, transfer scope or final authority, or treat sub-agent output as verified fact.
---

# Delegate Subtask

Use sub-agents as bounded collaborators. The substantive workflow remains the
outcome owner; this method owns the delegation gate, execution contract,
supervision, and handoff.

## Entry gate

Resolve the request's substantive intent before delegating. Verification still
belongs to `kf-verify-change`, design to `kf-design-change`, investigation to
`kf-investigate-issue`, and mutation to the applicable execution workflow. An
explicit request for a sub-agent changes the execution method, not the primary
owner.

Delegate only when sub-agents are available, current instructions permit them,
the subtask has a crisp boundary and stopping condition, and at least one benefit
materially exceeds handoff and integration cost:

- fresh actor-level independence for review or verification;
- difficult reasoning, adversarial challenge, or high-impact edge-case analysis;
- parallel read-only exploration across proven non-overlapping boundaries;
- domain-specific specialist evidence;
- context isolation for a self-contained investigation; or
- a deterministic implementation slice with exact write ownership and objective
  checks.

Do not delegate merely because a task is large, unfamiliar, slow, or because a
sub-agent mechanism exists. Keep routine local work with the parent when direct
execution is cheaper, the task depends on one tightly ordered reasoning chain, or
the boundary cannot be described without duplicating the whole task. Use the
minimum number of agents and avoid recursive delegation unless a verified need is
not already covered.

If the required mechanism, configured agent, model override, tool, or capacity is
unavailable, report the limitation. Inherit the available configuration when that
remains safe, or keep the work with the parent; never claim that a requested
independent or specialist assessment occurred when it did not.

## Choose the execution shape

Use the built-in `explorer` for ordinary read-heavy repository mapping and the
built-in `worker` for a stable bounded implementation slice. Prefer an applicable
configured custom agent when its description, instructions, tools, sandbox, and
model match the role. K Fleet's optional `kf_reviewer` and
`kf_context_auditor` companion agents provide fresh read-only review and Context
audit profiles without becoming workflow owners.

Read [role and capability selection](references/role-selection.md) before choosing
a quality tier, model override, reasoner, specialist, or custom agent. Read the
[delegation contract](references/delegation-contract.md) before any delegated
write, multi-agent decomposition, or fresh post-integration review.

For a simple read-only delegation, still provide:

- role and exact objective;
- allowed artifact, repository, and command scope;
- read-only authority and explicit exclusions;
- verified facts and minimum necessary context;
- required evidence and return shape; and
- a stopping condition.

Do not ask a sub-agent to decide product scope, expand authorization, hide
uncertainty, or make the parent workflow's final completion claim.

## Integrate evidence

Spawn with a bounded task name, wait for the result, and use focused follow-up only
when missing evidence can realistically be recovered. Stop repeated attempts that
return the same blocker. Treat every result as evidence, not authority: inspect
scope compliance, facts versus inference, checks, changed paths, and material
unknowns before relying on it.

The parent owns decomposition, authorization, integration, conflict resolution,
shared writes, and the final result. Reconcile conflicting results against direct
evidence rather than majority vote. Route findings to the applicable execution
workflow and obtain fresh assessment after correction; do not let a writer certify
its own work as independently verified.

Return the delegated role and capability, objective and authority boundary,
outcome and evidence, checks and changed paths, confidence and residual
uncertainty, and the integration, correction, or verification still owned by the
parent.

When repeated evidence shows that the delegation gate, capability mapping, or
write-isolation contract is systematically wrong, pass that signal to
`kf-learn-from-evidence`. Do not turn one unavailable model or weak result into a
durable rule.
