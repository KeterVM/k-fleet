# Fleet Ledger

<!-- k-fleet:start -->
## K Fleet

Use `kf-orchestrate-work` for substantive repository work. Current user
instructions and scoped repository files override recalled memory. Keep memory
isolated to the active repository and worktree.

Require the configured orchestrator and Supermemory integration before substantive
work. If either is unavailable or the memory scope cannot be verified, stop and
report the missing runtime.
<!-- k-fleet:end -->

## Project context

- Node.js 20+, no external dependencies.
- `src/fleet-ledger.js` owns domain records and the in-memory ledger.
- `src/reporting.js` contains pure reporting calculations.
- `src/maintenance.js` owns maintenance plans and due-service calculations.
- `src/validation.js` contains shared boundary validation.
- `test/*.test.js` uses the Node.js built-in test runner.

Keep records as immutable plain objects. Validate external input at factory or
public method boundaries. Use `TypeError` for invalid types or ranges and `Error`
for conflicts.

Run `npm test` and inspect changed files before completion.
