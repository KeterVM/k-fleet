# Delegation Contract

Read this reference before any delegated write, multi-agent decomposition, or
fresh post-integration review.

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

If safe exclusive ownership cannot be guaranteed, keep mutation with the parent
and delegate only read-only evidence. Do not ask multiple agents to produce
competing edits to the same state and choose a winner afterward.

## Contract fields

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

## Supervise and close out

After a non-trivial delegated write is integrated and every writer has stopped,
use a fresh read-only reviewer or verifier when actor-level independence would
materially improve confidence or applicable guidance requires it. Give that agent
the original target and current integrated artifact, not the writer's conclusion
as an expected answer.

The handoff back to the owner must identify the role and selected capability,
delegated objective and authority boundary, outcome and supporting evidence,
checks and changed paths, conflicts and assumptions, confidence and residual
uncertainty, and any integration, correction, or independent assessment still
required.
