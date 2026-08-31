# Readiness Evidence Checklist

Use this checklist for high-risk or indeterminate verification and for a requested
repair-and-reverification loop. It supplements, rather than replaces, the
verification target and selected checks.

- Does the change solve the requested task?
- Does it follow repeated repository patterns?
- Does it preserve unrelated behavior?
- Did it introduce unnecessary abstractions or dependencies?
- Does it touch unrelated code or formatting?
- Is a simpler complete implementation available?
- Were the relevant checks actually run?
- Is every failure classification supported by evidence?
- Are correction and verification still owned by separate workflows?
- When repair was requested, was the corrected artifact re-verified against the
  original target?

Record critical checks that could not run, any artifact produced by verification,
assumptions that affect the verdict, and residual risk. Do not convert missing
evidence into a **ready** result.
