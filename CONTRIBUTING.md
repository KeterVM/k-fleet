# Contributing to K Fleet

Thanks for helping improve K Fleet. Keep the seven skills small, portable, and
self-contained. Each skill owns its required file references; the main agent
selects focused methods by name. Add more catalog entries only for an explicitly
agreed capability boundary.

## Before opening a change

- Search existing issues and pull requests for related work.
- Open an issue before proposing another public skill or a material control-plane
  change.
- Keep project-specific facts in the target project, not in reusable
  skill instructions.

## Development workflow

1. Fork the repository and create a focused branch.
2. Make the smallest complete change.
3. Inspect changed skill descriptions, references, installation behavior, and
   documentation for consistency.
4. Explain the decisions or outcomes the guidance is intended to improve. Report
   actual observations and limitations without presenting mechanical checks as
   proof of effectiveness.
5. Keep user authority, current-source priority, project/worktree isolation, and maintenance boundaries
   intact. Do not add test suites, evaluation infrastructure, or examples unless
   explicitly requested.
6. Open a pull request using the repository template.

Pull requests should explain the user intent being served, why the change belongs
in reusable guidance, and what validation was performed.

## Release maintenance

Update `package.json` and add a dated version entry to [CHANGELOG.md](CHANGELOG.md).
Keep the English and Chinese READMEs consistent with the current skills and CLI.
Keep earlier changelog entries as release history, not current usage instructions.

Check affected file links, skill names, references, and setup invocation policy.
For CLI or package changes, check syntax and inspect `npm pack --dry-run` output.
Include both READMEs, the changelog, the CLI, and the reviewer configuration in the package.
Public skills are downloaded separately from GitHub; the repository's maintenance skill is not installed for users.

Commit the release changes, tag that commit as `v<version>`, and push the commit and tag.
Create the GitHub Release from that tag with changes, update instructions, and actual validation results.
GitHub Release creation does not publish the npm package. npm publication is a separate release action.

By contributing, you agree that your contributions are licensed under the
[Apache License 2.0](LICENSE).
