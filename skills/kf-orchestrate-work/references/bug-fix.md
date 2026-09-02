# Bug-fix route

Use this route when current behavior is already known to violate an established
contract or expectation.

1. Reproduce the failure or identify the strongest existing evidence. Trace the
   failing path far enough to state a root-cause hypothesis before mutation.
2. Distinguish the cause from symptoms, environment failures, and unrelated debt.
3. Add or identify regression evidence that fails for the demonstrated defect and
   protects unaffected behavior.
4. Apply the narrowest root-cause correction. Avoid adjacent cleanup and do not
   change the accepted contract merely to make the check pass.
5. Re-run the reproduction, focused regression check, proportionate broader suite,
   and final diff inspection.

If the behavior is unclear, enter investigation first. If evidence shows the
requested expectation is new rather than established, return to implementation.
