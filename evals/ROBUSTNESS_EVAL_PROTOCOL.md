# Routing Robustness and Catalog Ablation Protocol

This protocol extends K Fleet's source-hashed decision evals without replacing or
silently invalidating the current 56-case evidence. It targets the gaps that the
canonical corpus does not claim to cover: natural short requests, Chinese prompts,
routine feature/bug/refactor balance, catalog-description cost, and cross-model
stability.

The files in this protocol are candidate evaluation inputs, not behavioral
results. Passing their deterministic validators does not prove that a model routed
the prompts correctly.

## Tracks

### Naturalistic routing

`robustness-routing.jsonl` contains 24 anonymous-ready English and Chinese prompts.
It deliberately emphasizes the common implementation owners:

- six feature cases;
- six bug cases;
- six behavior-preserving refactor cases; and
- two each for investigation, design, and retrospective coverage.

The suite mixes terse, messy, and mixed-intent requests. It excludes canonical
skill names from prompts and caps explicit authority language so the evaluator
cannot succeed merely by mirroring policy vocabulary.

Run:

```sh
node scripts/validate-robustness-evals.mjs
node scripts/prepare-robustness-input.mjs > /tmp/kf-robustness-input.json
```

Give a blind evaluator only the generated rubric and anonymous prompts. Preserve
raw selections, phase order, stopping result, rationale, contamination state,
model, reasoning configuration, and the generated source, corpus, and blind-input
hashes before judging against the hidden expectations.

### Catalog-description ablation

`catalog-description-candidate.json` contains shorter discovery descriptions for
the eleven core skills. It remains `candidate-not-promoted`; the canonical
`SKILL.md` files retain their currently evaluated descriptions.

Create two isolated skill trees from the same source:

```sh
tmpdir="$(mktemp -d)"
node scripts/materialize-catalog-ablation.mjs \
  --variant current \
  --output "$tmpdir/arm-a"
node scripts/materialize-catalog-ablation.mjs \
  --variant candidate \
  --output "$tmpdir/arm-b"
```

Install one tree per clean evaluator environment. Do not expose the other variant,
the sibling maintainer manifest, the candidate label, expected answers, prior
reports, or maintainer hypotheses. Run the identical canonical and robustness
blind inputs against both variants.

Promote candidate descriptions only when they:

- reduce total always-loaded core description characters by at least 30%;
- introduce no material primary, composition, sequence, authority, or stopping
  regression on the canonical corpus;
- pass every high-risk repeated boundary already required by the canonical scorer;
  and
- show no meaningful degradation on the naturalistic multilingual suite across
  the model matrix below.

If a single description regresses, revise that description rather than weakening
an expected result or promoting the remainder as a universal catalog rewrite.

### Cross-model matrix

Use at least three currently available capability tiers when the runtime exposes
them: a strong quality-first model, the normal default model, and a faster or more
economical model. Record exact model identifiers and reasoning configurations;
do not encode transient model names into portable skill sources.

For each catalog variant and model tier:

1. run every robustness prompt once in a fresh blind environment;
2. repeat high-risk composition and mixed-intent cases at least three times;
3. keep execution read-only and discard contaminated runs completely; and
4. use a post-hoc judge different from the evaluator model when available.

Report exact counts instead of calling a small sample statistically reliable.
Separate disagreements caused by routing, method composition, owner return,
authority, stopping, prompt ambiguity, or unavailable runtime capability.

## Artifact evidence remains separate

Routing success is not implementation-quality evidence. Exercise production work
in isolated repositories for at least TypeScript, Python, and one compiled
language before making a cross-language quality claim. Include a cross-module bug,
a migration or compatibility change, a behavior-preserving refactor, an absent
test seam, and generated or lock-file side effects. Record diff scope, focused and
broad checks, retries, elapsed time, token or usage cost when available, and
residual risk.

Do not merge those execution results into `current-results.json`; that file remains
the canonical decision-level evidence for `harness-routing.jsonl`.

## Reporting boundary

A robustness report must bind the canonical skill source, robustness corpus,
blind input, catalog variant, catalog manifest, evaluation tooling, raw
observations, judgments, and repository base hashes. State which tracks were not
run. Never describe a linted corpus, materialized fixture, or unexecuted candidate
as a passed behavioral evaluation.
