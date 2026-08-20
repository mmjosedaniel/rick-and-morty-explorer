# TASK-007 CI Reproducibility Review — 2026-08-20

- Review status: Complete — `REVISE`
- Review scope: Hosted GitHub Actions execution of TASK-007's strict real-Redis integration boundary
- Reviewed candidate: pushed commit `0e56e1f0a372b168082824f2e136b19f1a802dc7` on branch `codex/execplan-007-bounded-redis-cache-aside`
- Hosted evidence: pull-request CI run `32391250007`, completed `failure`
- Prior record: [TASK-007 acceptance re-review](./2026-08-20-task-007-acceptance-re-review.md), preserved as point-in-time local closure evidence
- Owning evidence: active [TASK-007 ExecPlan](../plans/TASK-007-bounded-redis-cache-aside.md), Milestone 6

## Verdict

`REVISE`. TASK-007's Redis product behavior and local closure evidence remain valid for their recorded identities, but pushed commit `0e56e1f` is not reproducibly closed. The hosted workflow supplies `REDIS_PORT` without the explicit namespace required by both real-Redis tests, so the integration gate fails at 72/74 before those two scenarios exercise Redis behavior.

## Finding

### Major — hosted CI omits the Redis test namespace

Run `32391250007` passed the corrected unit suite at 139/139. Its `Run test suite` environment contained `CI`, `POSTGRES_PORT`, and `REDIS_PORT`, but no `REDIS_NAMESPACE`. The real cache and invalidation tests then failed with `TASK_007_REDIS_TEST_CONFIG_INVALID` at `redis-character-search-cache.integration.test.ts:132` and `redis-character-search-invalidation.integration.test.ts:111`. The remaining nine integration files and 72 tests passed.

Repository inspection confirms `.github/workflows/ci.yml` defines only `REDIS_PORT` for Redis. The integration tests intentionally reject a missing namespace so mutable Redis ownership and exact-prefix cleanup cannot silently fall back to a shared local identity. The existing `task-004-ci-workflow.unit.test.ts` verifies infrastructure step ordering but does not yet protect the required TASK-007 environment entry.

Smallest action: add one job-scoped run-isolated value, `REDIS_NAMESPACE: "character-app:test:ci-${{ github.run_id }}-${{ github.run_attempt }}"`, extend the existing workflow-contract unit test, keep both integration tests strict, run the focused and real-Redis boundaries locally, and require a corrected hosted workflow pass on the exact pushed candidate.

## Remediation status

The local Milestone 6 candidate completes the bounded repository correction without changing product source or either strict integration test. Independent preflight classified the defect `REGRESSION`; separate compliant Red and Green leases changed only the existing workflow-contract test and `.github/workflows/ci.yml`. The exact job-scoped namespace is now covered by a unique validate-job position assertion. Focused workflow evidence passes 2/2, root typecheck passes, the two real-Redis files pass 3/3 under namespace `character-app:test:t007-m6-local-20260820`, the exact prefix scans empty, and fresh S1 review returns `PASS` with no finding.

This does not supersede the `REVISE` verdict because the corrected bytes are not yet committed or pushed and therefore have no hosted run identity. The remaining action is an authorized commit/push, one passing exact GitHub Actions run including integration 74/74 and teardown, then fresh integrated re-review and authoritative closure reconciliation.

## Acceptance summary

| Area | Result |
|---|---|
| Redis product implementation | Pass from unchanged production source and prior real-Redis evidence |
| Corrected aggregate unit loading | Pass in hosted run at 139/139 |
| Hosted PostgreSQL integration | Pass for the nine unaffected files |
| Hosted Redis cache/invalidation integration | Fail before behavior at missing environment identity |
| Hosted application, smoke, lifecycle, teardown | Not reached or not closure-eligible after the failed root test step |
| TASK-007 closure | Revise; task returned to `In progress` |

Minimum-assessment product readiness remains 5/12 because AC-010 behavior is implemented. Repository task closure is incomplete until a run-isolated CI namespace, full hosted pass, fresh re-review, and documentation reconciliation succeed.

## Documentation impact

TASK-007 returns to `In progress`, the ExecPlan returns to the active directory with Milestone 6, and this review becomes the current review. The original acceptance review, unit reproducibility review, and acceptance re-review remain historical evidence. Current-status owners must distinguish passing Redis behavior from failed hosted closure. No product requirement, ADR, dependency edge, or readiness count changes.
