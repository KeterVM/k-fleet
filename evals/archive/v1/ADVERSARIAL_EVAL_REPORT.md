# K Fleet Adversarial Eval Report

> Historical report: its learning-owned persistence conclusion was superseded by
> the current Learning-decision and Context-persistence ownership boundary.

Date: 2026-08-20

## Method

Three independent evaluators received 12 prompts containing mixed intent,
misleading labels, requests to hide evidence, retrospective work called TDD,
overbroad persistence claims, and unsafe delegation instructions. They read only
the current skill files, did not receive expected answers, and made no repository
changes.

## Initial result

Nine prompts preserved the intended route and authority boundary. Three responses
exposed two root issues:

1. Two independently worded retrospective test-only prompts had no exact primary
   owner. TDD excluded them, verification could not edit tests, and feature work
   owned product behavior rather than coverage of behavior that already existed.
2. One mixed durable-rule and feature response unnecessarily inserted
   `kf-maintain-guidance` as the writer after learning, creating duplicate ownership
   with `kf-learn-from-evidence`.

Other adversarial prompts correctly rejected blind snapshot acceptance, hidden
verification failures, YAML support disguised as a refactor, fabricated TDD,
implementation-ready design without repository evidence, current-task feedback
misrouted as a new bug, sub-agent edits, correlated failures treated as recurrence,
and behavior changes labelled as refactors.

## Independent adjudication

All three evaluators independently concluded that retrospective test-only work is
a common mutation with a distinct responsibility and should receive a dedicated
primary skill rather than broaden TDD, verification, feature, bug, or refactor
ownership.

All three also concluded that `kf-learn-from-evidence` owns a narrow guidance write
when the user has authorized its destination and scope. `kf-maintain-guidance`
should participate only in separately requested broad cleanup, consolidation,
relocation, or rewriting of established guidance.

## Changes

- Added `kf-add-test-coverage` as the tenth primary workflow.
- Clarified that `kf-maintain-guidance` does not decide or act merely as writer for
  a new durable lesson.
- Clarified that `kf-learn-from-evidence` owns narrow authorized persistence and
  routes only broader established-guidance maintenance separately.
- Added machine-readable routing cases for retrospective coverage and a durable
  rule followed by feature implementation.

## Post-change evidence

Three independent reruns of both failed boundaries produced 6/6 agreement:

- test-only coverage routed to `kf-add-test-coverage`, with no TDD, verification,
  maintenance, or production mutation;
- durable rule plus endpoint routed to
  `kf-learn-from-evidence -> kf-implement-feature`, with maintenance excluded from
  the narrow write.

An isolated artifact exercise then added two public-boundary coverage tests. They
passed immediately as expected, the full fixture reached 17/17 passing tests, and
the diff contained only the test file.

## Limits

- The prompt set is adversarial but finite and English-only.
- Mixed requests with more than two independently authorized deliverables may
  require additional sequencing evidence.
- The new coverage skill has one artifact exercise; broader frameworks, snapshot
  suites, integration fixtures, and absent test seams remain future evidence.
