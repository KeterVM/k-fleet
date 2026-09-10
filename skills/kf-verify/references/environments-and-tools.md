# Environments and tools

## Identify the surface being verified

Establish what is delivered and how it is used: an application, service, command,
library, job, document, or instruction package. A repository can contain several
such surfaces. Use applicable project guidance, manifests, run scripts, configuration,
and actual entry points to identify the affected ones; reuse sufficient context
rather than conducting a complete inventory.

Determine which runtime, configuration, data, dependencies, and access are relevant
to the claim. When packaging or installation is affected, exercise the consumable
artifact or supported installation path as appropriate; success against source
files alone may miss missing exports, assets, or runtime dependencies.

## Select a way to act and observe

Prefer configured project commands and available tools that can exercise the
relevant boundary and inspect its result. A browser, simulator, API client, shell,
or test runner serves a different observation need; availability alone is not a
reason to select it. Establish that the chosen tool reaches the intended version,
target environment, and identity before relying on its result.

Use these examples only for the affected behavior, not as a checklist for every
project of that type:

| Affected surface | Suitable execution and observations |
| --- | --- |
| Web interface | Use a browser or browser tests for user interaction and rendered state; inspect requests and persisted effects when the flow depends on them. A screenshot alone does not establish interaction correctness. |
| Backend service | Use the supported API or protocol against an appropriate test environment; observe responses and relevant authorization, persistence, transaction, or failure effects across real boundaries. |
| CLI | Invoke the command through its public entry point; inspect exit status, standard output, error output, and relevant filesystem or process effects. |
| Mobile or desktop application | Use application tests, a simulator, emulator, or device suited to the claim; inspect interaction, lifecycle, permissions, or platform integration where affected. Identify behavior the chosen environment cannot reproduce. |
| Library or SDK | Exercise the public interface from a representative caller or package consumer; check exported behavior, compatibility, and error contracts where changed. |
| Data or background job | Run representative inputs through the relevant execution path; inspect output data, completion state, and affected retry, restart, or partial-failure behavior. |
| Documentation or skill | Check instructions, references, and structure; when claiming usability or behavioral improvement, use observations from an authorized real task. Structural checks alone do not establish effectiveness. |

Choose at the level of the changed behavior. A pure calculation in a Web project
may need only focused tests; a browser flow that crosses a service boundary may
need both UI and service observations. Use complementary tools when one observation
cannot establish the whole outcome, without repeating equivalent checks.

## Work within the available environment

Use existing supported verification workflows where sufficient. Confirm the target
and side effects before running state-changing checks; a test label does not make
an environment disposable. Keep verification within the task's access and mutation
limits. Examples above do not require new infrastructure, dependencies, or test
harnesses, and do not grant authority to provision them.

When a tool or runtime is unavailable, consider whether another permitted method
can establish the same claim. If it establishes only part, preserve that evidence
and identify the remaining obligation and capability needed to check it. A mock,
static inspection, or successful build can support a narrower conclusion without
proving unavailable runtime behavior. Continue independent checks that remain useful.
