# Fleet Ledger

Use `kf-orchestrate-work` for substantive repository work. Current user
instructions and files in this repository override recalled memory; isolate memory
to this repository and worktree. Stop substantive work if the orchestrator or
configured memory backend is unavailable.

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
