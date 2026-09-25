# Service operation

## Define what healthy means

Choose indicators that reflect the promised user outcome. Requests accepted may
hide failed background work; availability alone may hide excessive latency or stale
data. Identify the population, measurement window, and relevant exclusions. Derive
objectives and recovery needs from established commitments or user decisions, not
generic industry numbers.

Use existing telemetry to determine whether these indicators can be measured.
Validate a signal's meaning before building decisions around it. Track consequential
failure context across boundaries without logging secrets or excessive personal
data. Distinguish missing telemetry from a healthy service.

## Make signals actionable

Connect an alert to user impact, a responsible owner, and an action or diagnostic
path. Account for delay, noise, deduplication, and relevant dependencies. Avoid making
every low-level metric page someone. Changes to alert thresholds or routing must
preserve agreed coverage and remain within authority.

Use observed workload and bottlenecks to assess capacity and operating cost. Explain
uncertainty in forecasts and the tradeoff between performance, reliability, and
spending. Do not provision resources or incur new charges simply because a forecast
suggests growth.

## Establish continuity

Identify recovery-critical data, dependencies, credentials, and operational ownership.
Use authorized, isolated recovery exercises when needed to establish that backups
and procedures work; do not infer recoverability from a successful backup job alone.
Check the restored data and user path, and record recovery-time and data-loss limits
against the applicable service needs.

Keep concise operating instructions for actions another owner must perform, including
where evidence is found and when escalation is needed. Connect support reports to
operational diagnosis or product evaluation without collecting unrelated user data.
For an authorized retirement, account for remaining consumers, data retention or
export commitments, dependency removal, and notification authority before shutting
down resources. Retirement is a product decision, not a response to low usage alone.
