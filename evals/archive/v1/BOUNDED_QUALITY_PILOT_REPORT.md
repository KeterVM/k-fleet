# Bounded Quality Execution Pilot

Date: 2026-08-29

Status: instruction-blind, non-promotional smoke test complete; candidate not
promoted.

## Question

Can a sole-writing implementation expert, supported by bounded read-only evidence
and lineage-independent verification, produce less structural slop or catch more
material risk than the current workflow or a stronger single-agent quality
contract?

The three arms were:

- **A:** current primary workflow;
- **B:** current primary workflow plus an explicit artifact-quality contract; and
- **C:** experimental bounded-quality actor topology.

The candidate borrows the useful separation of implementation, specification
review, and quality review from Superpowers' subagent-driven development, but
keeps one writer for a complete vertical slice. It also follows Codex's use of
isolated agent work while treating repository evidence, tests, and guardrails as
the basis for confidence rather than agent count.

References:

- <https://github.com/obra/superpowers/blob/main/skills/subagent-driven-development/SKILL.md>
- <https://openai.com/index/introducing-the-codex-app/>
- <https://openai.com/index/harness-engineering/>

## Harness correction

The first smoke run was invalidated. The copied Fleet Ledger fixture included
historical scenario and test reports that disclosed earlier solutions, including
the duration correction, validation refactor, and maintenance ordering rule. A
read-only C-arm scout detected the contamination; A and B did not report it.

The v1 runner then excluded all fixture Markdown except effective `AGENTS.md`
guidance and validated that no answer-bearing Markdown entered a prepared
workspace. All observations below came from freshly prepared workspaces after
that correction.

An independent harness review later found that the executor could still read the
source K Fleet checkout and sibling run metadata under the host's permissions.
The executor was explicitly instructed not to do so and reported compliance, but
instructions are not a security boundary. These runs are therefore
**instruction-blind smoke observations**, not strict-blind evaluation evidence.

The current v2 runner stages a self-contained task bundle, binds baseline and
protocol identities before scoring, and requires the orchestrator to expose only
the prepared workspace to the executor. Future runs must use that filesystem
boundary to claim strict blindness.

## Instruction-blind results

One fresh run per arm and scenario was completed. Every arm passed its hidden
behavior test and produced no unexpected file changes.

| Scenario | A | B | C | Observed distinction |
| --- | --- | --- | --- | --- |
| Feature: CSV summary | pass; 2 files | pass; 2 files | pass; 2 files | No artifact advantage. C corrected one self-authored test expectation before reaching green. |
| Bug: partial minute | pass; 1 file | pass; 1 file | pass; 1 file | No artifact advantage; all found the same one-line root correction. |
| Refactor: shared validation | pass; 2 files | pass; 2 files | pass; 2 files | C's critic exposed weak consumer-boundary evidence; the writer answered it with non-persistent probes and kept the minimal diff. Independent verification broadened the boundary check. |
| Test-only: tie ordering | pass; 1 file | pass; 1 file | pass; 0 files | A and B rewrote adequate coverage. C correctly proved the existing public test killed the target mutation and stopped without a duplicate edit. |

C's independent verifier returned `READY` in all four scenarios. Actor summaries
reported that scout and critic workers remained read-only and the implementation
expert was the sole writer; raw actor traces were not persisted, so those claims
are observations rather than independently replayable evidence.

## Interpretation

This run does not show that stronger instructions alone improve code: B tied A in
all four scenarios. It also does not justify a default agent tree: C tied B on the
simple feature and bug, incurred a correction round on the feature, and spawned
workers for a routine test-only no-op.

The useful C behavior was selective:

- the scout found evaluation contamination;
- the refactor critic found a real verification blind spot without forcing extra
  durable tests or structure; and
- the test-only executor avoided an unnecessary edit after proving existing
  coverage was mutation-sensitive.

The candidate entry gate was therefore tightened after the run. The primary
workflow must perform a cheap local preflight before spawning actors, and direct
one-line corrections, byte-equivalent helper reuse, already mutation-sensitive
coverage, and other routine local edits explicitly do not qualify.

## Decision

Keep the public K Fleet contract at eleven skills. Do not modify the production
feature, bug, refactor, test-coverage, delegation, or verification skills from
this single smoke run.

Retain the candidate and hardened v2 experiment harness under `evals/` for future
strict-blind evidence. Promotion still requires at least five fresh runs per arm and scenario,
an isolated reproduction in a realistic non-Fleet-Ledger project, blind
maintainability judgments, efficiency data, and satisfaction of every promotion
gate. In particular, a routine negative control must not create an agent tree.

## Evidence limitations and identities

The twelve v1 result files were produced in temporary storage and their raw actor
traces were not frozen in this repository. Their aggregate SHA-256 identity is
`275aa7ad111321d50c80d7433cbba0bf0d338e46c5b28bf151f16f326c7e7aa4`;
the ordered per-run result hashes are:

```text
feature-a  ca99cc93813b5b01414a9d4e3ee8fc450054b9ad2c0656c84f445e04ef554ca9
feature-b  960a559c0ffb001c26c6c1dc64c30cf94b839d27e13bd61d438cf75b83d44bdd
feature-c  e28f8c2a8950ef80726e3b3c4e20ccbb63a93ba1ad2670124c255a449d93f365
bug-a      98bfdd311af392cd8583dc3dab6cd274399a50a8c12c1410f307aaf1420d76a4
bug-b      6ab2d328ae7f200d117b138eede60ef978ba0fc1dfb7956998c48410d6a5b2b7
bug-c      13647d6e595b678b2f9cfe13ea10b6608baa731889f29278fd4dbfb9c12f7ab2
refactor-a b8bad47a4b1e7a67ce70e49e8e3da55a96a33c758e4b3fe7d49d22f1094efe09
refactor-b e3fdf0bbd224edd5a2c9d28b0140fd8b6a082e779aa6631b375bb4db80045dcf
refactor-c 7e7a3fa776b1e5e21d907f7b81c88bd152d3b96c583e4e823d62f7a4d6f4cfde
test-a     8381d886e51e9068e7cc48de53abdbb7fae16751199e131dd4dbf8882fe5a2ca
test-b     e6238c2918f043225ee45864ec21cebf17143ed9438154692f71e7404e316193
test-c     72adcf53a58ad1c047df487026d9666a4023db0248b23b454c54d7cf6af2213f
```

Because the files and traces are not persisted, these hashes identify the observed
outputs but do not make the run reproducible. No promotion claim may rely on this
pilot. Formal v2 runs must freeze task bundles, source revision, prepared and final
tree hashes, actor traces, lineage/write observations, hidden-test identities,
result files, and efficiency data before judging.

Current v2 harness identity:

- candidate skill SHA-256:
  `3c05010f7943081033222e1f345380c0ea1e8efcd849020547ea30920fa5cf87`
- quality cases SHA-256:
  `e4b57fbc1adbeae0237b8b53af100e602aa4511539f6f645e3cf93f466e4fc8b`
- artifact scenarios SHA-256:
  `18d7210147bdaefd786c1b7cea4ddf42b3ae25555c4b4fffce5ceaaa8f57dc22`
- quality contract SHA-256:
  `4d1fcaee712cfba870fdd1a373c54c8d0f35e740c09121e567c1553c587de031`
- experiment runner SHA-256:
  `cf5b6739e7463b3b6f4e61ecc854eb0104efb6bb176e425359887c3d67dda43e`
- fixture source revision:
  `0abe3fb92eb62df94b1a93c1a7e5eabeff2ca7d8`

The v2 sidecar additionally binds the prepared base tree, task bundle, primary
skill, candidate or quality protocol, scenario specification, hidden test, and
runner. Scoring refuses drift and records a result-evidence hash.

Run the static harness checks with:

```sh
node scripts/bounded-quality-experiment.mjs validate
node scripts/validate-repository-structure.mjs
node scripts/validate-eval-corpus.mjs
cd examples/fleet-ledger && npm test
```
