# Readiness and migration

## Identify what will run or be installed

Tie the intended version to the build, source revision, configuration, and relevant
verification evidence. Check that the target will receive that artifact rather than
an old local build or a mutable tag pointing elsewhere. Follow the project's existing
build and artifact provenance practices; a new pipeline is not a prerequisite.

Inspect environment differences that can invalidate prior checks, such as required
configuration, external endpoints, permissions, or incompatible dependency versions.
Use safe presence and behavior checks without printing secret values. If the release
changes supported clients or integration contracts, identify the affected consumers
and their upgrade path.

## Preserve a workable data transition

For schema or data changes, identify readers and writers active during the rollout,
including older instances, delayed jobs, and clients. Determine whether versions can
coexist and how partially completed migration is detected. Separate reversible code
changes from data transformations that lose information or cannot be undone.

Use staged compatibility changes when the required coexistence justifies them;
record the protected consumers and condition for removing temporary compatibility.
Determine ordering, retry safety, and completion evidence from the actual migration.
Do not rerun an uncertain migration until its state and duplicate effects are known.

When recovery depends on a backup, establish that the relevant data is included and
that restoration is usable within the service's recovery needs. Account for writes
after the backup and how they would be retained or reconciled. A backup existing
does not by itself establish a safe rollback. Do not restore over live data or run
destructive compatibility steps without applicable authority.

Carry unresolved compatibility or recoverability limits into the release decision.
If the requested safety condition cannot be met, report the specific conflict and
available alternatives rather than silently weakening the requirement.
