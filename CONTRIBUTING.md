# Contributing to K Fleet

Thanks for helping improve K Fleet. Contributions should keep the single
orchestrator small, portable, and organized through conditionally loaded routes
rather than additional catalog entries.

## Before opening a change

- Search existing issues and pull requests for related work.
- Open an issue before proposing another public skill or a material control-plane
  change.
- Keep project-specific facts in the example or target project, not in reusable
  skill instructions.

## Development workflow

1. Fork the repository and create a focused branch.
2. Make the smallest complete change.
3. Run `node scripts/validate-repository-structure.mjs` and
   `node scripts/validate-orchestrator-evals.mjs`.
4. Run `npm test` from `examples/fleet-ledger` when behavior or examples change.
5. When the orchestrator, references, reviewer, or corpus changes, obtain fresh
   independent blind observations before publishing a behavioral claim. Bind the
   claim to the exact skill tree, corpus, tooling, raw observations, and judgments.
6. Keep candidate and result material labelled unexecuted until its run completes;
   do not reuse scores from `evals/archive/v1/` for the current architecture.
7. Update the README when runtime prerequisites, routing, memory, evolution,
   progressive-disclosure boundaries, or demonstrated behavior changes.
8. Open a pull request using the repository template.

Pull requests should explain the user intent being served, why the change belongs
in reusable guidance, and what validation was performed.

By contributing, you agree that your contributions are licensed under the
[Apache License 2.0](LICENSE).
