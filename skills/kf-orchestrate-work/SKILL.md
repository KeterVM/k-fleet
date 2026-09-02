---
name: kf-orchestrate-work
description: Orchestrate substantive repository work through one K Fleet entry point, or initialize a target repository after installation when explicitly invoked with setup. Consume project-scoped context supplied by Supermemory, select only the required workflow procedure, execute within the user's authority, and close with verified evidence. Use for any non-trivial repository task; outside setup, stop if the required orchestrator or Supermemory runtime is unavailable.
---

# Orchestrate Work

Own the task from intent through verified closure. Keep detailed methods outside
the always-loaded entry point and read only the references selected below.

## Setup dispatch

When explicitly invoked as `/kf-orchestrate-work setup`, read and execute
[setup](references/setup.md), then stop. Setup is installation bootstrap, not a
substantive repository workflow, and is the only route allowed before the
configured Supermemory integration is ready.

## Bootstrap

1. Resolve the active repository root, worktree, working directory, user outcome,
   authority, and stopping condition.
2. Require the configured Supermemory integration. Verify its project/worktree
   scope and consume the focused context it supplies before substantial exploration
   or mutation. If the integration is unavailable or its scope cannot be verified,
   stop substantive work and report the failure. Do not implement a second memory
   client or call backend REST APIs as a fallback.
3. Treat current system and user instructions plus current scoped repository files
   as authoritative. Recalled memory is evidence; never let it silently override a
   current source, expand authority, or cross a repository/worktree boundary.
4. Classify the task and read only the required procedure:

   - design or implementation planning: [design](references/design.md)
   - new or changed behavior: [implementation](references/implementation.md)
   - known defect: [bug fix](references/bug-fix.md)
   - unclear behavior or diagnosis-only work: [investigation](references/investigation.md)
   - behavior-preserving structure: [refactor](references/refactor.md)
   - retrospective coverage or required TDD: [testing](references/testing.md)
   - review or readiness verdict: [verification](references/verification.md)
   - repository instruction or durable context maintenance: [context](references/context.md)
   - bounded sub-agent work: [delegation](references/delegation.md)
   - explicit post-work K Fleet report: [feedback](references/feedback.md)

   Read [evolution](references/evolution.md) when a reusable orchestration or skill
   change is proposed or a SkillOpt cycle is run.

## Control loop

- Keep one substantive route in control at a time. A method such as TDD or
  delegation assists that route; it does not take over its outcome or authority.
- Preserve explicit handoffs. Design may hand an accepted contract to execution;
  investigation reports its diagnosis before an authorized correction; independent
  verification reports before and after a separately owned correction.
- Use repository evidence and analogous implementations before inventing a local
  convention. Choose the smallest complete change and avoid unrelated cleanup.
- Check the current integrated artifact, not summaries from tools or sub-agents.
  Run focused validation and proportionate broader checks, then inspect the final
  diff before claiming completion.
- End with a compact terminal account of intent, scope, route and methods, decisive
  evidence, changed boundaries, checks, outcome, corrections, remaining uncertainty,
  and source revision so the Supermemory integration can capture the useful episode.
  Do not duplicate that capture through a K Fleet-owned memory client.
- Reusable learning enters the evolution pipeline as evidence. It does not directly
  edit this skill, repository policy, or memory marked as authoritative.

## Memory boundary

Supermemory owns recall, capture, explicit memory operations, versioning, forgetting,
and inference review. K Fleet consumes recalled context and produces useful terminal
evidence; it does not ship fallback memory skills or emulate missing Supermemory
capabilities. When a user explicitly requests a memory operation, use the configured
Supermemory integration's own surface. If that surface is unavailable, report the
missing capability instead of substituting another store.

## Authority and completion

The user owns product decisions and permission for external or materially broader
actions. K Fleet owns routing, bounded execution, integration, evidence quality,
and the final task state. Memory retrieval, delegation, and automatic evolution do
not broaden authorization.

Finish only when the requested outcome and applicable acceptance evidence are
satisfied, or when a concrete blocker or authority boundary is reported. Name
checks not run and residual uncertainty. Never claim successful orchestration,
memory use, independent review, or skill evolution when the corresponding runtime
or evidence was unavailable.
