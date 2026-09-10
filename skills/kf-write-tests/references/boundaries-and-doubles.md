# Boundaries and doubles

## Select the boundary and project tools

Use unit tests for isolated rules, integration tests for cooperating components and
dependency semantics, and end-to-end tests when the complete user path is at risk.
Choose the narrowest scope that still exposes the failure. No fixed proportion of
these categories applies to every project or change.

Use the project's supported runner and tools at the actual consumption boundary.
For example, component or browser tests suit UI interaction; API and persistence
tests suit service contracts; process tests suit CLI output and exit behavior;
consumer tests suit library exports and compatibility. Platform behavior may require
an application runtime, simulator, or device. Select only the surfaces relevant to
the claim, and make unavailable runtime coverage explicit.

Exercise supported interfaces so tests protect callers while allowing internal
refactoring. Private helpers, internal call order, and incidental markup are poor
contracts unless the task establishes why they matter. Do not expose internals or
restructure unrelated product code merely to fit a preferred testing technique.

## Choose real dependencies or substitutes deliberately

Keep the subject and behavior being claimed real. A mocked database cannot establish
transaction semantics, and a mocked service response cannot establish its live protocol
compatibility. Prefer a suitable real implementation when it provides necessary
fidelity at acceptable cost in the permitted environment.

Use fakes, stubs, or mocks to control dependencies that are irrelevant to the claim,
costly to run, unavailable, or needed to induce a specific condition. A substitute
must preserve the contract details the test relies on. Reuse maintained project
doubles where adequate; a hand-built fake introduces behavior that can itself be wrong.
Use a focused real-boundary or contract check when substitute drift is a material risk.

Prefer observable state and results over verifying a script of internal calls.
Interaction assertions are useful when the interaction itself matters, such as a
forbidden write or a required bound on requests. Explain their limits when they are
the only feasible evidence; verifying an attempted call does not prove its external
effect. Never replace the behavior under test with a mock that supplies the answer.
