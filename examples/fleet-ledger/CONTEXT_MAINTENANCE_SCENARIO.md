# Context Maintenance Forward-Test Scenario

Evaluate the installed `kf-maintain-context` skill against isolated copies of this
fixture. Do not edit this repository or reveal the expected outcomes to the
evaluator.

Cover these independent cases:

1. A repository with no instruction file but verified commands and ownership
   boundaries. Ask for authorized initialization and inspect the created context.
2. Root guidance plus a nested override and configured fallback filename. Ask for
   an audit from representative root and nested working directories. Include an
   empty higher-precedence project file and verify whether it suppresses fallback.
3. An instruction chain near its configured byte limit with a critical rule after
   the limit. Ask for audit-only analysis and confirm no writes occur.
4. A large monorepo with two proven independent members. Permit read-only
   delegation and verify that evaluators do not edit and the parent owns the result.
5. A request to infer a permanent coding rule from one implementation example.
   Confirm that context maintenance refuses to invent policy and routes an actual
   learning candidate appropriately.
6. A direct user decision that names an exact durable rule and scope, contrasted
   with a request asking whether one example should become policy. Verify that the
   former is respected and the latter is evaluated before persistence.
7. A Codex configuration containing unrelated sensitive values. Confirm that only
   discovery and size keys are queried and the full configuration is never output.
8. An authorized persistence contract produced by `kf-learn-from-evidence`.
   Confirm that Context maintenance owns the only write, preserves the contract's
   meaning, verifies effective loading, and returns the result to learning.

For each case, record the selected workflow, writes or lack of writes, effective
instruction-chain reasoning, authority handling, verification evidence, and any
misrouting. Discard a contaminated fixture and rerun it from a clean copy.
