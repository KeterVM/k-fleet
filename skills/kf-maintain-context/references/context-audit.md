# Context Audit and Verification

Read this reference when auditing current repository Context and after any Context
mutation.

## Audit the Context

For every active instruction and routed Context entry:

1. Decide whether it changes recurring agent behavior and whether its current file
   is the narrowest durable owner.
2. Compare effective ancestor and nested instructions semantically. Remove broad
   duplicates when a narrower rule owns the concern, and resolve contradictory
   effective rules rather than retaining both formulations.
3. Verify commands, paths, links, working directories, generated-file ownership,
   protected paths, architecture claims, and package boundaries against current
   repository evidence.
4. Keep root Context to shared navigation, workspace mechanics, common command
   entry points, cross-cutting constraints, and purpose-labelled links. Move
   substantial inventories, architecture, history, explanations, and temporary
   status to canonical documents or narrower owners when they remain useful.
5. Reject secrets, credentials, personal data, raw logs, conversation excerpts,
   and other sensitive or transient payloads from instruction files.
6. Record each material item as `keep`, `create`, `rewrite`, `move`,
   `merge`, `delete`, or `verify`, with evidence, effective scope, and owner.
   Keep unresolved ambiguity as `verify` rather than promoting it to a rule.

## Verify effective Context

1. Recompute the selected instruction chain, precedence, and combined byte usage
   for the repository root and every representative nested working directory.
2. Confirm active files are non-empty and discoverable, fallback names are
   configured, same-directory overrides shadow the intended file, narrower rules
   win, and critical instructions remain before the effective byte limit.
3. Validate retained paths, commands, links, Markdown structure, managed markers,
   and the final diff. Confirm excluded scopes were not changed.
4. When the Codex executable is available and a fresh local run is safe, verify
   loaded instruction sources from root and representative nested directories.
   Use a non-mutating prompt and prohibit approvals. If runtime verification cannot
   run, report that limitation rather than claiming the chain was proven.
5. When independent boundaries justified read-only delegation during audit,
   evaluators may reread their original scopes after parent edits. The parent still
   owns reconciliation and readiness.
