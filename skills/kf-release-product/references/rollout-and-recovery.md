# Rollout and recovery

## Choose how exposure changes

Use the project's distribution contract. A service may support a staged rollout;
a package, app-store submission, or downloadable client may propagate on a different
schedule and remain installed after a newer version exists. Do not assume every
product has traffic splitting or an instantaneous rollback.

Choose useful release signals before increasing exposure: the critical user path,
relevant failures and latency, dependency behavior, and data integrity. Compare with
a suitable baseline or control when available; low traffic, unrelated incidents,
or delayed effects can make the result inconclusive. Choose observation periods
from the failure modes and workload, not an arbitrary wait.

Expand only while required evidence supports it. Record enough artifact and target
identity to resume safely after interruption. Before retrying a timed-out publication
or deployment, check whether it succeeded remotely or remains in progress.

## Recover according to actual state

Identify the action that reduces harm: halt expansion, disable a feature, restore a
compatible version, or apply a forward correction. Evaluate its data compatibility,
affected users, and authority before acting. Do not roll back code into a schema it
cannot read or assume that removing an artifact removes installed copies.

After mitigation, check the important user outcome and relevant integrity signals.
Distinguish recovered service from fully repaired data or a resolved root cause.
Escalate a missing decision with the observed impact and proposed bounded action;
continue independent diagnosis without further exposing users to the failed version.

## Close the delivery gap

Check the artifact as recipients obtain it, where relevant: installability, version,
upgrade compatibility, and basic use. For a live service, verify availability in the
intended environment. Prepare accurate release and migration notes; send messages
only when authorized. Record pending distribution or monitoring responsibilities
with their owner rather than reporting an unobserved final outcome.
