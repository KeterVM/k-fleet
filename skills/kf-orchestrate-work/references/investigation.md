# Investigation route

Use this route to explain unclear behavior without changing the product.

1. State the question, observed versus expected behavior, scope, and evidence that
   would distinguish plausible causes.
2. Inspect the execution path, configuration, data flow, logs, tests, and history
   relevant to the symptom. Prefer focused reproductions over broad speculation.
3. Separate confirmed facts, supported hypotheses, counterevidence, and unknowns.
4. Report the most likely cause with confidence and the next discriminating action.

Do not mutate production code. Temporary instrumentation also requires authority.
When correction is separately authorized, report the diagnosis first, then hand the
established contract violation to bug fix or the accepted behavior change to
implementation; use verification afterward when an independent verdict is required.
