# K Fleet Real-Project Pilot Report

Date: 2026-08-20

## Result

`kf-verify-change` was applied read-only to an existing, uncommitted guidance
change in the separate `things` monorepo. The target contained root, API, and
mobile `AGENTS.md` edits on `chore/maintain-agent-guidance`.

Readiness: **ready**. No actionable finding was identified, and the pilot made no
change to the target repository.

The run composed verification with AGENTS-specific audit criteria without
blurring ownership:

- `kf-verify-change` established scope, selected evidence, classified the result,
  and retained correction as a separate workflow;
- the AGENTS audit method checked inheritance, monorepo placement, duplication,
  factual accuracy, and context cost;
- code-review criteria limited reported findings to concrete defects introduced
  by the reviewed diff.

## Change verified

The guidance change:

- moved a repository-wide framework-CLI rule into the Expo mobile boundary;
- replaced duplicated root documentation ownership text with a pointer to the
  canonical README section;
- consolidated three API structure rules around the established
  `apps/api/src/modules/thing` example while preserving explicit divergence
  conditions.

The resulting hierarchy remains coherent: root guidance owns shared workspace and
documentation rules, while API and mobile guidance own application-specific
conventions.

## Evidence

- The repository contains exactly the three reviewed guidance files: root, API,
  and mobile.
- The root README explicitly assigns onboarding, product, architecture, and
  additional technical documentation to the locations referenced by the revised
  root rule.
- Every retained root and member command exists in the corresponding package
  scripts, and the root scripts delegate through Turborepo as described.
- `apps/api/src/modules/thing` contains the controller, service, and schema
  artifacts used by the revised API rule. The implementation confirms named
  Elysia composition, request-independent service calls, direct Drizzle access,
  singular domain identifiers, and plural HTTP and SQL collection boundaries.
- The mobile member uses Expo Router and Expo-managed configuration. Current Expo
  documentation confirms `create-expo-app` for initialization and the Expo CLI
  upgrade workflow, including dependency repair and diagnosis.
- All referenced repository paths exist.
- `git diff --check`: pass.
- A final target status check showed only the same three pre-existing modified
  `AGENTS.md` files; verification produced no artifact.

Expo references checked:

- <https://docs.expo.dev/get-started/create-a-project/>
- <https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/>

## Limits and residual risk

- The pilot verified an existing working-tree diff, not a committed change or pull
  request with declared acceptance criteria. Intent was inferred from the diff and
  surrounding repository evidence.
- Runtime lint, type-check, test, and build suites were not run because the target
  changed Markdown guidance only and those tasks do not validate root-owned
  guidance. Command existence and ownership were verified statically instead.
- The repository has no dedicated AGENTS or Markdown validator, so prose quality
  and semantic consistency were checked by inspection plus targeted evidence
  queries rather than a deterministic project command.

## Harness conclusion

The pilot found no reason to change a K Fleet workflow. It supports the current
separation between intent workflows and composable methods: verification can use
a domain-specific audit method while remaining read-only and retaining exclusive
ownership of the readiness verdict.
