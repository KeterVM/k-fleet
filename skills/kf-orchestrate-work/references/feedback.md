# Feedback route

Use only when the user explicitly requests a portable K Fleet usage report after
the underlying work has reached a terminal state.

Return a self-contained, sanitized packet containing:

- task and terminal state;
- orchestrator version or source hash when available;
- route and methods actually observed, distinguished from inferred selection;
- memory reads and writes by class and scope without sensitive content;
- material decisions, effects, checks, corrections, and unresolved uncertainty;
- evidence suitable for a later SkillOpt or maintainer review.

Do not resume the completed task, manufacture hidden invocation evidence, modify the
target project unless one report file is explicitly requested, trigger adoption, or
submit data externally. Missing provenance stays explicitly unknown.
