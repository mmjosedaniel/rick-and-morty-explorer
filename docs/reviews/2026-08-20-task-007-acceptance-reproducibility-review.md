# TASK-007 Acceptance Reproducibility Review — 2026-08-20

- Review status: Complete — `REVISE`
- Review scope: Post-closure reproducibility of TASK-007's authoritative unit gate, current runtime-ownership wording, and availability of fresh real-infrastructure verification
- Reviewed candidate: clean commit `62ddf56` on branch `codex/execplan-007-bounded-redis-cache-aside`; product source corresponds to the previously reviewed 19-path candidate
- Prior record: [TASK-007 acceptance review](./2026-08-20-task-007-acceptance-review.md), preserved as point-in-time historical evidence
- Owning evidence: completed [TASK-007 ExecPlan](../plans/completed/TASK-007-bounded-redis-cache-aside.md), later completed after the correction required by this review, reopened for a separate hosted-CI correction, and completed again after merged hosted verification

## Verdict

`REVISE`. TASK-007's Redis product behavior remains implemented, and the focused cache/invalidation scope passes, but the task cannot retain an unqualified reproducible closure claim. A fresh cold aggregate unit run fails two TASK-007 tests at Vitest's five-second per-test limit. The prior acceptance review also overstates PostgreSQL as list-only. Complete correction, closure validation, and a fresh re-review are required before TASK-007 returns to `Complete`.

## Findings

### Major — authoritative aggregate unit gate is not reproducible

Fresh root `npm run test:unit` failed two first-in-file Redis tests and completed at 137/139:

- `redis-character-search-cache.unit.test.ts` timed out at 5,575 ms;
- `redis-character-search-invalidation.unit.test.ts` timed out at 5,648 ms.

Both files dynamically import `redis-character-search-cache.js` from inside the timed test body. That production module has a top-level `@redis/client` import. The unchanged focused two-file command passed 12/12 in 354 ms, showing that product assertions pass while cold aggregate loading inside the test deadline is unstable.

Smallest action: replace the Red-era dynamic owner-factory loaders with file-scope static imports, remove only unused loader scaffolding, preserve all assertions and the five-second timeout, then require the first post-correction cold aggregate command to pass 139/139.

### Minor — historical runtime-ownership wording is inaccurate

The prior acceptance review says PostgreSQL and Redis are acquired only by list demand and that detail/comment paths are independent of both. `createLazyCharacterReadServiceOwner` invokes its shared initializer from list, detail, and comments; production initialization acquires PostgreSQL there. Redis remains unconnected until list cache operations use it.

Smallest action: preserve the historical review and state the corrected boundary in the post-remediation re-review: PostgreSQL initializes on the first character read, Redis connects only on list-cache demand, health remains independent, and detail/comments bypass cache data.

## Acceptance summary

| Area | Result |
|---|---|
| Canonical keys, exact summary codec, cache-aside behavior | Pass from focused and historical exact-candidate evidence |
| Bounded Redis operations and scoped invalidation | Pass from source, focused, and historical exact-candidate real-Redis evidence |
| FR-BE-005, SPEC-012, HS-013, AC-010 behavior | Implemented; no product regression observed |
| Build and typecheck | Pass from the reviewed candidate evidence |
| Application, Chromium smoke, and lifecycle | Pass from the reviewed candidate evidence |
| Fresh PostgreSQL/Redis verification | Blocked at review time because the preserved Docker Compose containers were stopped |
| Reliable aggregate unit closure gate | Fail — cold run 137/139; focused run 12/12 |
| TASK-007 closure | Revise; task returned to `In progress` |

Minimum-assessment product readiness remains 5/12 because AC-010 behavior is implemented. Repository task closure is nevertheless incomplete until its required verification is reproducible.

## Verification evidence

Executed by the primary coordinator on the clean reviewed commit:

- `npm run test:unit`: exit 1; 24 files passed, two files failed; 137/139 tests passed; both failures were five-second timeouts in the cited first tests.
- Focused two-file API-unit command: exit 0; two files/12 tests passed in 354 ms.
- Static inspection: both dynamic loaders execute inside the first timed tests; production module imports `@redis/client` at module scope.
- Runtime inspection: list, detail, and comments share PostgreSQL initialization; Redis commands remain cache-list-only.
- Git status was clean before the reproducibility review.

The original reviewer also reported one failed 137/139 aggregate run followed by an unchanged passing 139/139 rerun. The primary reproduction confirms that result is not a one-off transcript error.

## Documentation impact

TASK-007 returns to `In progress`, its ExecPlan returns to the active-plan directory, this review becomes the current review, and current-status owners must no longer claim reproducible task closure. The original `PASS` review remains unchanged as historical evidence. Product acceptance wording may continue to report AC-010 behavior at 5/12, but it must distinguish that result from incomplete task closure. A new dated re-review will own the final post-correction verdict.
