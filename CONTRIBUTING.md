# Contributing to K Fleet

Thanks for helping improve K Fleet. Contributions should keep the collection
small, portable, and organized by workflow intent rather than technology.

## Before opening a change

- Search existing issues and pull requests for related work.
- Open an issue before proposing a new core skill or a material scope change.
- Keep project-specific facts in the example or target project, not in reusable
  skill instructions.

## Development workflow

1. Fork the repository and create a focused branch.
2. Make the smallest complete change.
3. Run `node scripts/validate-repository-structure.mjs` and
   `node scripts/validate-eval-corpus.mjs`.
4. When Skill entry points, references, companion-agent contracts, or harness
   cases change, generate blind inputs with
   `node scripts/prepare-eval-input.mjs`, obtain independent read-only observations,
   and score `evals/current-results.json` with
   `node scripts/score-eval-results.mjs evals/current-results.json`.
5. Run `npm test` from `examples/fleet-ledger` when behavior or examples change.
6. Update the README and scenario reports when routing, progressive-disclosure
   boundaries, companion agents, or demonstrated behavior change.
7. Open a pull request using the repository template.

Pull requests should explain the user intent being served, why the change belongs
in reusable guidance, and what validation was performed.

By contributing, you agree that your contributions are licensed under the
[Apache License 2.0](LICENSE).
