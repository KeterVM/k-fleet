# Progressive disclosure targeted forward observations

Status: incomplete. Release 2.1.1 authorized with one blocked observation. Four candidate observations and one original-source control completed; the module-placement implementation fixture was blocked by automatic approval review before writes. After receiving that limitation, the user explicitly instructed: “没事 可以都commit和 push 然后release”. The source-bound release waiver permits this release while retaining the blocked case as non-passing. This is not a completed behavioral gate or a general relaxation for future source versions.

## Exact bindings

Candidate skill: `f36755783ee5dac0b5560287d25e938b1873d87682abbd4598b61b9a1bd27a47`
Candidate corpus: `78d1fd2ed5a707a9a7a44d72eb51b3e1c9dd51cee6e63d83c3d81d470b55935e`
Reviewer: `4e7d26b2a98289a23b0458606fbdfc1b243ffe67e0eebc7468aabb1f3fb696cb`

Original-source control skill: `5a6a60dc7d5b72c027334d0dcc25147762ad09266fe63e6bdda726f8410ff811`
Original-source control corpus: `b59226ea1a5d12121faa498eaec8b4551a8db931b9e3c68d7b4ecdb68c611913`
Control reviewer: `4e7d26b2a98289a23b0458606fbdfc1b243ffe67e0eebc7468aabb1f3fb696cb`

The earlier feature-method, Astra, test-value, and release observations retain their historical bindings. They are not measurements of this candidate.

## Method and limits

The parent fixed corpus expectations before dispatch, created six disposable minimal JavaScript fixtures, and sent each native actor only its task and assigned fixture. Actors did not receive hidden expectations or parent conversation history. Candidate and control presentation tasks used equivalent prompts and identical product seeds; the control used the original skill. Sources and output files are recorded with hashes in per-case artifacts. Evidence records include actor prompts, final reports, independent checker source, check output where applicable, and parent judgments.

Isolation was instruction-scoped rather than an OS boundary. Before/after inventories show writes within each fixture and unchanged installed skill hashes; they cannot prove the absence of outside reads. Full tool trajectories and exact serving-model identities are not available in exported evidence. Reference reads and initial failing tests are actor-reported; runtime outcomes and fixture deltas were checked independently. Two final reports are normalized transcriptions and labeled as such. There was no full corpus replay, repeated sampling, timing measurement, token measurement, or general quality/efficiency claim.

## Observations

| Case | Outcome | Evidence |
| --- | --- | --- |
| implementation-module-conventions | Blocked | Blocked by automatic approval review twice before any file writes; this is missing execution evidence, not a behavioral pass. |
| implementation-supporting-lifecycle | Passed within stated scope | Acquired execution support, retained it across background transition, exposed mute, and cleaned up hang-up and connection failure; six actor-authored tests passed. |
| implementation-bounded-presentation | Passed within stated scope | Changed only the existing view; reported reading the entry and implementation reference, without design or engineering references. |
| design-cross-layer-sharing | Passed within stated scope | Design covers durable tokens, expiry and revocation, tenant boundaries, missing public adapter, compatibility and rollout/rollback dependencies. |
| verification-local-contract | Passed within stated scope | Reported the documented empty-input defect and no writes; reported verification and delegation references without engineering. |
| baseline-bounded-presentation | Passed within stated scope | Original-source control changed only the existing view; reported reading entry, implementation and engineering. |

Independent checks passed for background continuity, mute, hang-up, failed connection cleanup, and concurrent-start handling. A negative control loses audio in the background without an execution lease. All six actor-authored calls tests also passed on replay. This is simulator evidence, not native mobile or screen-lock verification.

Both presentation outputs retained the existing layered inventory and added no tests. The candidate reported reading the entry and implementation reference; the control additionally reported reading engineering. The local review reported verification and delegation references and independently reproduced the empty-input failure without changing files. The sharing design was inspected for durable state, expiry/revocation, tenant scope, anonymous routing, mobile compatibility, and additive migration/mixed-version rollback dependencies; runtime delivery remains unverified.

The invoice actor's first patch and one evidence-backed retry were denied by automatic approval review, which considered invoice tests unrelated to the authorized skill adjustment. No file changed and no tests ran in that fixture. This infrastructure block supplies no evidence for or against the candidate's module-placement behavior. Explicit user authorization for those disposable fixture writes is required to continue; it is not counted as a pass.

## Validation scope

Structure, corpus, installed-copy parity, and installed skill validation are separate deterministic checks. The forward-binding validator validates the exact release waiver and all evidence bindings; it reports four passing candidate observations and one blocked observation separately. A passing binding check does not mean the blocked behavioral observation passed.

The full integration command passed before release: five CLI tests, 22 fixture tests, structure validation, 42-case corpus lint, and forward-result bindings. Installed skill validation also passed. Disposable-copy negative controls rejected a missing waiver, stale source hash, a false passing status for the blocked case, a corrupt evidence hash, and an unwaived failure. These are validator checks, not additional blind behavioral observations.
