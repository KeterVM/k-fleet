---
name: kf-delegate-subtask
description: Delegate a bounded subtask to a Codex sub-agent when independent review, difficult reasoning, parallel read-only exploration, specialist evidence, or a clear isolated implementation slice would materially improve correctness, speed, context isolation, or model cost. Select a reviewer, verifier, reasoner, explorer, worker, or specialist role; match model strength and reasoning effort to the work; isolate write ownership; and return evidence to the owning workflow. Do not create agent trees for routine local work, parallelize overlapping writes, transfer scope or final authority, or treat sub-agent output as verified fact.
---

# Delegate Subtask

Use sub-agents as bounded collaborators rather than treating every sub-agent as a
specialist. The substantive workflow remains the outcome owner; this method owns
the delegation gate, role and model choice, task contract, supervision, and
handoff.

## Entry gate

Resolve the request's substantive intent before delegating. Verification still
belongs to `kf-verify-change`, design to `kf-design-change`, investigation to
`kf-investigate-issue`, and mutation to the applicable execution workflow. An
explicit request for a sub-agent changes the execution method, not the primary
owner.

Delegate only when sub-agents are available, current instructions permit them,
the subtask has a crisp boundary and stopping condition, and at least one of these
benefits materially exceeds handoff and integration cost:

- fresh actor-level independence for review or verification;
- difficult reasoning, adversarial challenge, or high-impact edge-case analysis;
- parallel read-only exploration across proven non-overlapping boundaries;
- domain-specific specialist evidence;
- context isolation for a self-contained investigation; or
- a clear, deterministic implementation slice that a cost-efficient worker can
  own without shared-write ambiguity.

Do not delegate merely because a task is large, unfamiliar, slow, or because a
sub-agent mechanism exists. Keep routine local work with the parent when direct
execution is cheaper, the task depends on one tightly ordered reasoning chain, or
the boundary cannot be described without duplicating the whole task. Use the
minimum number of agents needed and avoid recursive delegation unless a verified
need is not already covered by the current decomposition.

If the required mechanism, model override, tool, or agent capacity is unavailable,
report the limitation. Inherit the available configuration when doing so remains
safe, or keep the work with the parent; never claim that a requested independent
or specialist assessment occurred when it did not.

## Select role and capability

Choose the role from the subtask, not from a generic expert label:

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

Select the strongest suitable currently available model for quality-first work
and use high or `xhigh` reasoning when the risk and complexity justify it.
Select a balanced model and medium reasoning for mixed exploration or moderate
implementation. Select a cost-efficient model with low or medium reasoning for
clear, repetitive, easily checked work. Current Codex examples are the frontier
Sol tier for demanding reviewers and reasoners, Terra for balanced workers and
scans, and Luna for narrow repeatable work; treat these as runtime mappings, not
portable permanent identifiers. Prefer an applicable configured custom agent when
its description, instructions, tools, and model match the role.

When an explicit model override is supported, pass only the minimum task context
needed by that sub-agent instead of inheriting the entire conversation by default.
Do not use a cheaper model for a hard review merely to reduce cost, or a frontier
model for mechanical work that has stable checks and low consequence.

## Protect write ownership

Read-heavy independent work is the default form of parallelism. Parallelize only
questions whose answers do not depend on one another and whose scopes do not
overlap.

Use one writer for each mutable artifact or coherent implementation slice. A
worker contract must name exact allowed paths or another equally precise ownership
boundary, allowed commands, forbidden shared artifacts, and required checks. The
parent and other workers must not edit that owned scope concurrently. Package
metadata, lockfiles, schemas, generated indexes, public interfaces, and other
shared integration surfaces default to the parent or one explicitly named writer.

If safe exclusive ownership cannot be guaranteed, keep the mutation with the
parent and delegate only read-only evidence. Do not ask multiple agents to produce
competing edits to the same state and choose a winner afterward.

## Delegation contract

Give each sub-agent a compact contract containing:

- role, exact objective, and why the subtask matters to the owning workflow;
- allowed repository, artifact, source, path, and command scope;
- read-only or bounded-write authority, including exact ownership for writes;
- relevant verified facts and the minimum raw context needed to work;
- explicit exclusions, unresolved assumptions, and unavailable environments;
- required evidence and checks;
- expected return shape: outcome, evidence, changed paths when applicable, risks,
  unknowns, confidence, and recommended next action; and
- a stopping condition.

Do not ask a sub-agent to decide product scope, expand authorization, hide
uncertainty, or make the parent workflow's final user-facing completion claim.

## Supervise, integrate, and verify

Spawn with a bounded task name, wait for the result, and use focused follow-up only
when missing evidence can realistically be recovered. Stop repeated attempts that
return the same blocker. Treat every result as evidence, not authority: inspect
scope compliance, facts versus inference, checks, changed paths, and material
unknowns before relying on it.

The parent owns decomposition, authorization, integration, conflict resolution,
shared writes, and the final result. Reconcile conflicting results against direct
evidence rather than majority vote.

After a non-trivial delegated write is integrated and all writers have stopped,
use a fresh read-only reviewer or verifier when actor-level independence would
materially improve confidence or applicable guidance requires it. Give that agent
the original target and current integrated artifact, not the worker's conclusion
as an expected answer. Route findings to the owning execution workflow and obtain
a fresh assessment after correction; do not let the writer certify its own work
as independently verified.

## Return to the owner

Return a compact handoff containing:

- role, selected capability tier, and any unavailable requested override;
- delegated objective and authority boundary;
- outcome, supporting evidence, checks, and changed paths;
- conflicts, assumptions, confidence, and residual uncertainty;
- integration or correction still owned by the parent; and
- any independent assessment still required.

When repeated evidence shows that the delegation gate, role selection, capability
mapping, or write-isolation contract is systematically wrong, pass that signal to
`kf-learn-from-evidence`. Do not turn a single unavailable model or weak result
into a durable rule.
