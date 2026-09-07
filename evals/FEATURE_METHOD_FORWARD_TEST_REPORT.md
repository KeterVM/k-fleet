# Engineering method forward observations

Date: 2026-09-07.

The shared engineering reference selects relevant concerns before design or delivery:
user behavior, ownership, state and data, integration, trust boundaries, runtime
constraints, and compatibility. Existing routes retain procedure and authority.
The method points to target-specific evidence and deeper resources; it is not an
exhaustive engineering manual or a compulsory checklist for every edit.

Four bounded observations passed. This establishes behavior in the supplied small
fixtures, not a measured improvement, general success rate, full-corpus result, or
automatic adoption gate. Earlier exploratory examples on the original skill also
passed; they do not establish a before/after gain and are not reused as current
evidence. The historical Astra results and known failure remain unchanged.

## Exact bindings

- Base revision: `a1167cb3ae86fc00b451f704fff24cfad241b627`.
- Skill folder hash: `5a6a60dc7d5b72c027334d0dcc25147762ad09266fe63e6bdda726f8410ff811`.
- Reviewer SHA-256: `4e7d26b2a98289a23b0458606fbdfc1b243ffe67e0eebc7468aabb1f3fb696cb`.
- Judged corpus SHA-256: `b59226ea1a5d12121faa498eaec8b4551a8db931b9e3c68d7b4ecdb68c611913`.

The [result manifest](feature-method-forward-results.json) binds each case to its
artifact and evidence hashes. Artifacts retain initial and final product sources
and per-file hashes, with skill-copy hashes rather than duplicated skill text.
Evidence records retain actor prompts/final responses, independent check source
and output, or the design judgment against the actual artifact.

## Observations

| Case | Observed result | Evidence |
| --- | --- | --- |
| `implementation-module-conventions` | Invoice code followed the existing feature module and public entry convention. Totals, invalid values, and unchanged profile behavior passed independent checks. | [Artifact](feature-method-forward/structure-artifact.json), [checks](feature-method-forward/structure-evidence.json) |
| `implementation-supporting-lifecycle` | Actor connected ongoing execution support to call startup and cleanup. Background continuity, mute, hangup, failed connection, and concurrent starts passed. A direct connection without that support failed the background negative control. | [Artifact](feature-method-forward/calls-artifact.json), [checks](feature-method-forward/calls-evidence.json) |
| `implementation-bounded-presentation` | One view row changed; the existing layered layout remained. No speculative services, new files, or actor-authored tests were added. | [Artifact](feature-method-forward/presentation-artifact.json), [checks](feature-method-forward/presentation-evidence.json) |
| `design-cross-layer-sharing` | Proposed design addressed tenant/public access, durable expiry and revocation, adapter wiring, additive migrations, old clients, and mixed-version rollback. Only the design document was created. | [Artifact](feature-method-forward/sharing-artifact.json), [judgment](feature-method-forward/sharing-evidence.json) |

The implementation checks ran independently of actor-authored tests. The actor test
suites for invoices and calls were also rerun successfully. The presentation
evaluator's smoke check is external evidence, not a new test added to the product.
The sharing case is design reasoning evidence: proposed integration tests and
deployment rehearsals were not executed.

All actors had fresh conversations and separate disposable Git fixtures. They saw
the raw task, relevant files, current skill, and exact allowed writes, without the
user complaint, hidden expectations, prior results, or neighboring fixtures. Three
implementation cases were defined before dispatch; the additional design case was
defined before its own dispatch without altering those three expectations.

## Boundaries and limitations

Native collaboration inherited the parent model without an override; the tool did
not separately expose its precise model/build. A proposed separate network-enabled
Codex CLI run was rejected before process creation because its external model
destination was unverified. It was not retried and produced no scored observation.
The completed actors ran through the current conversation's native collaboration
surface without launching another model client.

Isolation used fresh conversations and instructed file boundaries, not an
OS-enforced prohibition on reads elsewhere. Final hashes confirm that protected
files survived unchanged; they do not prove every attempted access. Full actor
tool trajectories are not exported. Runtime status and test-first sequences in
actor final responses remain actor-reported; the claims scored here rely on the
separately inspected artifacts and recorded independent checks.

Each case ran once. Small fixtures with clear conventions cannot establish behavior
in a large or inconsistent codebase. The call adapter already supplies ongoing
execution: native service creation, platform permissions, real background limits,
and device behavior were not tested. The sharing design is not a security assessment
or proof that migration and rollout will work. A fresh static reviewer found no
actionable reference or routing issues, but did not assess runtime adherence.

## Rechecking

Run the repository structure, corpus, and forward-binding validators. To replay
an executable artifact, reconstruct its product files from `finalFiles` in a
disposable directory and run the `independentCheck.source` retained in its evidence
record, supplying the fixture name and parent directory. This rechecks code behavior;
it does not repeat the independent model decision. A new behavioral evaluation
requires fresh actors and the exact desired skill sources.
