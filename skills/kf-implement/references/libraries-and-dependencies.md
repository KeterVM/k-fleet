# Libraries and dependencies

Use when the change adds or substantially reworks a general-purpose mechanism, or
adds a dependency. The authority and completion rules in SKILL.md still apply.

## Find what already provides the mechanism

Establish what the capability must do and what the project already provides: the
standard library, the framework, and installed dependencies. Then research
maintained mainstream libraries and frameworks before implementing or reworking the
mechanism, including alternatives to affected custom code. Reuse adequate current
selection evidence. Verify plausible candidates against their official
documentation, source repository, and package metadata for the relevant version;
remembered APIs, search snippets, and popularity do not establish suitability.

## Compare against the requirements

Compare candidates on the actual requirements and project constraints: behavior and
edge cases, runtime compatibility, maintenance and security status, licensing, and
integration or operational cost where material. Prefer a suitable mainstream
solution and its supported conventions over retaining or reimplementing its
mechanism. Readability, reliability, and maintainability gains can justify a new
dependency even when existing code could implement the behavior; show what becomes
easier to understand or change, and assess concrete costs rather than counting a
dependency as a cost in itself. Keep project-specific policy and glue in the
project rather than forcing business rules into a library's model.

## Decide and record

Stop when the evidence supports a choice; no fixed number of candidates, separate
report, or fresh web research for every edit is needed. Choose between viable
libraries yourself from the requirements and evidence; several viable options do
not by themselves call for the user. Ask only when missing intent, material cost
commitments, compatibility obligations, or authority prevent a sound choice, and
present the differences and your recommendation with the question. A supported
choice within existing authorization needs no extra approval. For a material
choice, record the library and version, sources, and decisive tradeoff in the task
or an existing project artifact.

Custom implementation, retained or new, needs a concrete reason: an unmet
contract, incompatible constraints, or disproportionate adoption cost. Working
code, the absence of reported problems, and fewer dependencies are not reasons.
Keep comparisons within the affected scope; this preference does not authorize an
unrelated framework migration or repository-wide replacement. When research is
unavailable, state the evidence gap rather than claiming no suitable library
exists.

## Adopt it fully

Respect dependency policies and existing authorization. Complete the manifest,
lockfile, configuration, and real integration checks the use requires. Use a
focused probe only for compatibility or behavior that could still change the
choice; installation alone does not establish fit.
