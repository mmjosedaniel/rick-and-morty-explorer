# Implement bounded Redis cache-aside searches


This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.

This plan decomposes [TASK-007](../../IMPLEMENTATION_PLAN.md#task-007---add-bounded-redis-cache-aside-search-behavior). The project owner authorized execution on 2026-08-19. After three product milestones and two later reproducibility corrections, TASK-007 completed on merged `main` commit `4663a66c17d39b9aa6da2db6f2bf169691edb587`: exact hosted run `32396138822` and fresh integrated re-review pass, and this plan is preserved as completed execution evidence.


## Progress


- [x] (2026-08-19 00:36Z) Read the documentation map, repository policy, ExecPlan convention, worker-first workflow, write-lease guard, exact TASK-007 record, mapped requirements, accepted ADRs, routed SPEC-012/HS-013 rules, current manifests, Compose/configuration, search service, Redis absence, runtime composition, and TASK-005 post-commit invalidation seam.
- [x] (2026-08-19 00:36Z) Registered this active plan without changing TASK-007 from `Pending` or adding application, test, manifest, lockfile, configuration, or runtime behavior.
- [x] (2026-08-19 00:36Z) Applied the project owner's KISS/YAGNI instruction: retained three coherent product milestones, reused the existing Vitest and Compose boundaries, and routed the only concrete non-blocking enhancement found during planning to [DPL-DEC-046](../../IMPLEMENTATION_PLAN.md#technical-debt-and-future-implementations).
- [x] (2026-08-19 00:45Z) Passed focused planning validation: documentation validation checked 60 Markdown files and all stable IDs/scenarios; ADR validation checked 17 ADRs with only the established unrelated NFR-006 warning; heading structure and `git diff --check` passed; and scope inspection found only this plan plus its three navigation/decision/register owners.
- [x] (2026-08-19 01:28Z) Received the project owner's explicit TASK-007 execution authorization; confirmed the already-selected branch `codex/execplan-007-bounded-redis-cache-aside` at HEAD `35a051e088bc4738f6142e8c6c819cf25c56e59e` with a clean single worktree; preserved that branch per the owner's latest instruction; and synchronized the evidence-linked canonical `In progress` activation before any worker preflight or write lease.
- [x] (2026-08-19 02:10Z) Accepted Milestone 1 after `PARTIAL` preflight, corrected coherent Red, separate Green, reviewer-directed regression Red/Green correction, focused 14/14, root typecheck, API build, API unit 110/110, and bounded S3 confirmation `PASS` with no Blocker, Major, or Minor.
- [x] (2026-08-19 03:12Z) Accepted Milestone 2 `PARTIAL` preflight and coherent Red under a compliant four-test-file lease: all seven pre-existing assertions passed, 23 new unit assertions and two discovered real-Redis tests failed only for the absent configuration, production composition, and Redis adapter modules, and the exact run namespace contained no keys. Paused at the owner's request before Green; no Redis dependency or production Milestone 2 path has changed.
- [x] (2026-08-19 15:29Z) Accepted Milestone 2 after separate Green and test-contract correction leases, focused unit 30/30, real-Redis 2/2, root typecheck, API build, API unit 133/133, API application 11/11, authoritative root integration 73/73, Chromium smoke 1/1, lifecycle 6/6, exact-namespace cleanup, and independent S2 `PASS` with no Blocker, Major, or Minor.
- [x] (2026-08-19 15:29Z) Accepted Milestone 3 `PARTIAL` preflight: existing application and PostgreSQL tests already cover post-commit-only ordering, safe invalidation rejection, successful command completion, and preserved committed data; the isolated missing Red is production bounded SCAN/UNLINK behavior, namespace isolation, invalidator lifecycle, and actual CLI composition.
- [x] (2026-08-19 15:29Z) Accepted Milestone 3 coherent Red under a compliant three-test-file lease: the exact focus discovered 10 tests, retained all four existing CLI scenarios as passing, and failed six new scenarios only because the Redis invalidation owner and production import composition boundary are absent; root typecheck passed and the unique Redis namespace scanned empty.
- [x] (2026-08-19 15:42Z) Joined the separate Milestone 3 Green and local Refactor under a compliant two-source-file lease: exact focus and required post-Refactor rerun passed 10/10 against the pinned Redis identity, root typecheck and API build passed, the Green namespace scanned empty, and all frozen tests retained their accepted blobs. Paused at the owner's request before milestone joins or critical review; Green is a review candidate, not yet milestone acceptance.
- [x] (2026-08-20 03:26Z) Completed the resumed Milestone 3 joins: unchanged API unit passed 25 files/137 tests after one transient fixed-timeout run, API application passed 4 files/12 tests, and the warmed authoritative root integration suite passed 11 files/74 tests after both inherited migration timeout leaves passed alone. All three join namespaces scanned empty. Fresh S3 critical review remains the milestone acceptance barrier.
- [x] (2026-08-20 03:38Z) Withheld Milestone 3 after fresh S3 critical review returned `REVISE` with two Major findings: a real Redis probe proved that a valid nested namespace key is deleted by the outer prefix invalidator, and an injected client produced 1,001 distinct nonzero cursors without an internal stop. The single review-correction TDD loop is required; TASK-007 and AC-010 remain pending.
- [x] (2026-08-20 03:43Z) Accepted review-correction preflight as `REGRESSION`: only the two invalidation test files need correction Red, while Green is limited to the Redis adapter. The correction preserves key/config/CLI contracts, requires an exact lowercase 64-hex suffix ownership predicate, and caps traversal at 1,000 successful SCAN pages before a safe failure.
- [x] (2026-08-20 03:52Z) Accepted the review-correction Red under a compliant two-test-file lease: the exact focus passed three inherited scenarios and failed exactly three regression scenarios for nested-namespace ownership, real-Redis preservation, and rejection before SCAN 1,001; root typecheck passed and the run namespace scanned empty.
- [x] (2026-08-20 03:58Z) Joined the separate one-source-file correction Green under a compliant lease. Exact focus passed 6/6, root typecheck and the valid API workspace build passed, API unit passed 138/138, API application passed 12/12, and the authoritative root integration suite passed 74/74 under a fresh zero-residue namespace. Bounded S3 correction confirmation remains the Milestone 3 acceptance barrier.
- [x] (2026-08-20 04:07Z) Accepted Milestone 3 after bounded S3 correction confirmation returned `PASS` with no Blocker, Major, or Minor. Independent unit and real-Redis probes confirmed exact canonical ownership, valid nested-namespace preservation, malformed-key exclusion, terminal/nonterminal page-1,000 behavior, repeated-cursor rejection, timeout abort/destruction, safe post-commit failure isolation, exact cleanup, and the accepted finite-TTL residuals.
- [x] (2026-08-20 04:12Z) Completed the cumulative ADR-0016 relevance audit. Every TASK-007 test remains mapped to a distinct key/codec/service, configuration, production ownership, real-Redis, outage, invalidation, post-commit, timeout, or cleanup contract; no focused, skipped, pending-test marker, snapshot, placeholder, live-network, abandoned-detail, or confidence-free duplicate test exists, so no test was removed or revised.
- [x] (2026-08-20 04:20Z) Passed the authoritative closure packet on 19-path implementation fingerprint `85383E794DCC80E2A6AA358D2891D1A196D26A5052C43CD74178A768D3C0A7C1`: root typecheck, build, unit 139/139, PostgreSQL/Redis integration 74/74, application 13/13, Chromium smoke 1/1, Tailwind validation, smoke lifecycle 6/6, documentation validation, and diff checking. Exact Redis namespaces, PostgreSQL test databases, ports 4173/4174, HEAD, and empty index have zero unexpected residue. Fresh integrated acceptance review remains before authoritative closure.
- [x] (2026-08-20 04:45Z) Completed integrated validation, fresh independent acceptance review, authoritative documentation reconciliation, plan retirement, and task closure. The reviewer returned `PASS` with no Blocker, Major, or Minor; SPEC-012, HS-013, AC-010, and NFR-003 pass; current readiness is 5/12.
- [x] (2026-08-20 09:15Z) Reproduced a later independent `REVISE` verdict on clean commit `62ddf56`: fresh root `npm run test:unit` failed exactly two Redis unit files at the five-second per-test timeout (137/139), while the unchanged focused two-file scope passed 12/12 in 354 ms. Confirmed the historical acceptance review also overstates PostgreSQL as list-only. Moved this plan back to active and returned TASK-007 to `In progress` under the owner's explicit correction authorization; product behavior and AC-010 remain implemented.
- [x] (2026-08-20 09:54Z) Completed Milestone 5 test correction under compliant lease `TASK-007-20260820-02-M5-evidence-01` with terminal receipt `1a4a591e`: independent preflight classified the defect `REGRESSION`; only the two Redis unit tests changed from timed dynamic factory imports to file-scope static named imports; focused validation passed 12/12 in 340 ms; the first post-correction cold root unit run passed 26 files/139 tests in 11.70 seconds; and root typecheck passed. A separately observed TASK-004 aggregate failure passed its exact focused test unchanged and did not recur in the decisive cold run. Fresh S1 milestone review remains the acceptance barrier.
- [x] (2026-08-20 09:59Z) Accepted Milestone 5 after fresh S1 review returned `PASS` with no Blocker, Major, or Minor. The reviewer independently confirmed the two-test-only diff, unchanged production/configuration/timeout/assertion/test-count boundaries, focused 12/12 in 350 ms, the cold 139/139 and typecheck evidence, the unrelated TASK-004 disposition, and the corrected PostgreSQL-versus-Redis demand wording required in the fresh re-review.
- [x] (2026-08-20 10:04Z) Passed the complete post-correction closure packet on healthy PostgreSQL 55432 and Redis 56400: root typecheck and build; unit 139/139; PostgreSQL/Redis integration 74/74; application 13/13; Chromium smoke 1/1; Tailwind validation; smoke lifecycle 6/6; documentation and ADR validation; and `git diff --check`. Exact Redis namespace `character-app:test:t007-m5-closure-20260820` and pattern `character-app:test:t007-m5-closure-20260820:characters:search:v1:*` scanned empty on healthy container `de49530cc584` using `redis:8.8.1-alpine` image digest `sha256:8096655e4377`; every `task_004_<16-hex>` PostgreSQL test database also scanned empty; ports 4173/4174, index, and HEAD have no unexpected residue or drift. Fresh integrated re-review remains before authoritative closure.
- [x] (2026-08-20 10:18Z) Completed fresh integrated re-review and authoritative documentation reconciliation. The reviewer returned `PASS` with no Blocker, Major, or Minor, independently passed the focused scope 12/12, confirmed exact scope/assertion/configuration preservation and closure identities, and approved TASK-007 completion. Added the corrected PostgreSQL-versus-Redis demand wording, preserved both prior reviews, restored every current-status owner to `Complete`, kept readiness at 5/12, returned this plan to the completed archive, repaired lifecycle links, and passed final documentation readback across 63 Markdown files and all stable IDs/scenarios. After all residue checks, stopped the exact `rick-and-morty-dev` PostgreSQL and Redis containers cleanly while preserving their volumes.
- [x] (2026-08-20 11:28Z) Reopened TASK-007 after hosted GitHub Actions run `32391250007` failed on pushed commit `0e56e1f0a372b168082824f2e136b19f1a802dc7`. Unit 139/139 passed, but the integration gate failed exactly the two Redis configuration-dependent scenarios at 72/74 because the CI job exported `REDIS_PORT` without `REDIS_NAMESPACE`. Static inspection confirmed both integration tests deliberately require an explicit namespace and the workflow contract test does not cover it. Product behavior, AC-010, and 5/12 readiness remain implemented; closure is withheld for Milestone 6.
- [x] (2026-08-20 12:08Z) Accepted independent Milestone 6 preflight classification `REGRESSION`. The supplied workflow, workflow-test, and frozen integration blobs match; the workflow contains zero exact namespace entries, both strict Redis scenarios reject its absence, and the existing workflow contract covers infrastructure order but not environment inheritance. The smallest relevant Red is one exact unique entry plus validate-job `env:`-to-`steps:` position assertion in the existing workflow-contract test; no authority or YAML-expression conflict exists.
- [x] (2026-08-20 12:13Z) Accepted Milestone 6 Red under compliant lease `TASK-007-20260820-03-M6-red-01`, receipt `205c1a80e0ae7d3cf5c07d03bfafb4640aa178b222732a9818046f0637582c1d`. Only the existing workflow-contract test changed, to blob `790c14f8906bec746ab7721ef172525c62b40416`; focused evidence passed the unchanged TASK-004 contract and failed only the new TASK-007 scenario with `TASK_007_CI_REDIS_NAMESPACE_INVALID cases=redis-namespace-job-scope`. The workflow and both Redis integration tests remain frozen.
- [x] (2026-08-20 12:18Z) Accepted Milestone 6 Green under compliant lease `TASK-007-20260820-03-M6-green-01`, receipt `5e5c0bab14720d24d87c386f8d5ed1bbfefdad1a02e1b00e645af34fde8b0132`. Only `.github/workflows/ci.yml` changed, to blob `11cbaf9b7884756baabe5bb591fb86a76fcab3fc`, adding the exact run-isolated namespace inside `jobs.validate.env`; focused validation passed one file/two tests, the Red and both integration test blobs remained frozen, and no Refactor occurred.
- [x] (2026-08-20 12:27Z) Passed local Milestone 6 validation. Root typecheck passed; the exact two-file real-Redis focus passed two files/three tests against namespace `character-app:test:t007-m6-local-20260820` on healthy Redis `de49530cc584` (`redis:8.8.1-alpine`, image `sha256:8096655e4377`) at port 56400 and PostgreSQL `8e002c0318ad` at port 55432. Exact pattern `character-app:test:t007-m6-local-20260820:characters:search:v1:*` scanned empty, `git diff --check` passed, and both task-started containers stopped cleanly with volumes preserved. Fresh S1 review remains before the local candidate is accepted.
- [x] (2026-08-20 12:34Z) Accepted the local Milestone 6 candidate after fresh S1 review returned `PASS` with no Blocker, Major, or Minor. The reviewer independently reproduced focused workflow validation at one file/two tests, confirmed exact YAML expression syntax, validate-job inheritance, grammar/length/run-attempt isolation, unchanged workflow boundaries, frozen strict integration tests, compliant leases, KISS/YAGNI scope, and truthful `In progress` status. An authorized commit/push, exact hosted pass, and fresh integrated re-review remain before closure.
- [x] (2026-08-20 12:16Z) Completed Milestone 6 hosted verification on merged `main` commit `4663a66c17d39b9aa6da2db6f2bf169691edb587`, PR #15, tree `a3943579fc71474f0675340d142c0c73bba3a193`. GitHub Actions run `32396138822`, job `96513285732`, resolved namespace `character-app:test:ci-32396138822-1` and passed typecheck, build, Tailwind, infrastructure health, unit 140/140, integration 74/74, application 13/13, Chromium 1/1, lifecycle 6/6, unconditional container/volume/network teardown, and job completion.
- [x] (2026-08-20 12:28Z) Completed fresh integrated task re-review and the primary-owned documentation gate. The reviewer returned `PASS` with no Blocker, Major, or Minor after confirming exact merged identity, correction-only executable scope, frozen strict integration tests, TDD/lease compliance, hosted counts and teardown, unchanged product evidence, and truthful 5/12 readiness. The primary reconciled all current-status owners, added a new hosted-CI acceptance re-review, preserved earlier dated reviews, moved this plan to the completed archive, passed documentation validation across 65 Markdown files and all stable IDs/scenarios, passed ADR validation across 17 ADRs and 38 requirements with only the established NFR-006 warning, and passed `git diff --check`.


## Surprises & Discoveries


- Observation: Local Redis infrastructure already exists as `redis:8.8.1-alpine` in [compose.yaml](../../../compose.yaml), but the API manifest and lockfile contain no Redis client.
  Evidence: [apps/api/package.json](../../../apps/api/package.json), [package-lock.json](../../../package-lock.json), and [compose.yaml](../../../compose.yaml).
- Observation: TASK-005 already created and tested the exact post-commit invalidation seam. TASK-007 needs to replace only the no-op production adapter; it does not need to redesign import transactions or publication.
  Evidence: [character-import-cli.ts](../../../apps/api/src/infrastructure/characters/character-import-cli.ts) and its application and PostgreSQL integration tests.
- Observation: The existing `api-persistence-integration` Vitest project already serializes real-infrastructure tests, so a second Redis-specific Vitest project would add configuration without improving isolation.
  Evidence: [vitest.config.ts](../../../vitest.config.ts).
- Observation: ADR-0007 mentions rate-limiting or deduplicating repeated Redis infrastructure warnings, but no requirement, acceptance criterion, current incident, or measured log-volume threshold requires stateful suppression for MVP.
  Evidence: [ADR-0007 risks and mitigations](../../adrs/0007-use-cache-aside-for-character-searches.md#risks-and-mitigations) and [DPL-DEC-046](../../IMPLEMENTATION_PLAN.md#technical-debt-and-future-implementations).
- Observation: The owner's latest instruction designates the existing `codex/execplan-007-bounded-redis-cache-aside` branch as the execution branch, even though the earlier pasted brief proposed `codex/task-007-redis-cache-aside`.
  Evidence: `git status --short --branch`, `git worktree list --porcelain`, and the owner's 2026-08-19 branch instruction. No branch creation or switch was performed.
- Observation: The first Milestone 1 Red guard start was rejected before contract publication because an over-broad forbidden directory endpoint was not guard-verifiable; the replacement projection used exact files and started normally under a new lease ID.
  Evidence: `TASK-007-20260818-01-M1-red-01` returned exit 2 with no started contract; `TASK-007-20260818-01-M1-red-02` started with digest `ecd5db9d6bbf23a0835cd7b6ee69a3ee4cef2047f2c643f3085d45f1c7e1acea` and later closed compliant.
- Observation: The first Milestone 1 API-unit join passed all TASK-007 tests but exposed two inherited fixed-timeout failures and one missing TASK-004 emitted sandbox path before the planned API build. Root typecheck and API build passed, and the unchanged source/test tree then passed all 108 API unit tests.
  Evidence: first `npm run test:unit --workspace @rick-and-morty/api` result 105/108; subsequent `npm run typecheck`, `npm run build --workspace @rick-and-morty/api`, and exact unit rerun results 0, 0, and 108/108. The first run is retained as invalid build-order/load evidence, not a product pass or technical-debt item.
- Observation: Fresh S3 review independently passed the canonical key identity but proved that sparse arrays and array/object `toJSON` hooks can make the initial encoder emit bytes that its decoder rejects, and that the default `console.warn` sink appends a second line feed to already terminated diagnostics.
  Evidence: `T007-M1-REVIEW` returned `REVISE` with one Major codec-closure finding and one Minor exact-warning finding after focused 12/12, independent digest recomputation, and runtime adversarial probes.
- Observation: The review-correction Green passed its focused runtime boundary, but root typecheck then exposed one test-local annotation that still declared the deliberately omitted default warning sink as required. Both worker correction budgets were exhausted, so the primary applied one exceptional mechanical `required` to `optional` type edit without changing assertions or runtime behavior.
  Evidence: `apps/api/src/application/characters/character-search-cache.unit.test.ts` local `CreateCharacterReadService` type; post-edit focused 14/14 and root typecheck passed. This is the only exceptional direct implementation-scope edit in Milestone 1.
- Observation: The first post-correction API-unit join passed all 14 TASK-007 tests and 109/110 overall but hit an inherited Windows `%TEMP%` atomic-rename `EPERM` in one TASK-004 migration artifact test. The unchanged immediate rerun passed 23 files/110 tests.
  Evidence: first `npm run test:unit --workspace @rick-and-morty/api` failed only at `migration-artifact-contract.unit.test.ts` rename under `%TEMP%`; exact unchanged rerun exited 0. The failed run is external-filesystem evidence, not a product pass or debt item.
- Observation: The default PostgreSQL host port 5432 could not be bound on this Windows host, while the same task-started Compose project became healthy after explicit alternate ports were applied.
  Evidence: the first `npm run infra:up` started Redis but failed the PostgreSQL bind; the reconciled project is healthy with PostgreSQL on `127.0.0.1:55432` and Redis container `de49530cc5846207ccbffea524f4e71b9bc484fd4edd819d599c8e45e6834c54` (`redis:8.8.1-alpine`) on `127.0.0.1:56400`.
- Observation: Docker Desktop was not running when execution resumed, but the preserved Compose volumes and exact alternate-port profile remained available after the daemon restarted.
  Evidence: Docker server 29.7.2 resumed the same Redis container identity and both PostgreSQL and Redis became healthy on ports 55432 and 56400 without recreating or deleting their volumes.
- Observation: Milestone 2 Green passed its focused behavior, but root typecheck exposed one missing type-only import in the frozen runtime-composition test.
  Evidence: `TS2552` named the already-exported `LazyCharacterReadServiceOwner`; a fresh test-owned correction lease added only that import, preserved every assertion, and then passed focused 30/30 and root typecheck.
- Observation: The planned workspace-scoped integration command changes `process.cwd()` to `apps/api`, which makes nine inherited migration CLI tests look for root scripts in the wrong directory.
  Evidence: the TASK-007 Redis integration file and eight other files passed under the workspace invocation, direct root migration build passed, unchanged warm focused migration tests passed 14/14, and the authoritative root `npm run test:integration` passed all 10 files/73 tests. The failed workspace runs are retained as invalid working-directory evidence, not product failures.
- Observation: The TASK-005 import boundary already proves every commit-order and invalidation-failure consequence required by Milestone 3, but the production `main` function still supplies an empty deferred-invalidation callback.
  Evidence: the existing CLI application scope passes four tests, its PostgreSQL integration test reads committed refresh data after rejected invalidation, and `character-import-cli.ts` contains the only missing production-composition join. The Milestone 3 Red therefore needs one behavioral CLI-composition scenario in addition to new Redis unit/integration tests, not another transaction-order test.
- Observation: The first resumed API-unit join timed out one accepted Milestone 2 Redis test and one new invalidation test at the fixed five-second limit under full-project load, while every other assertion passed.
  Evidence: the first unchanged run passed 135/137; the immediate isolated unchanged rerun passed all 25 files/137 tests in 11.03 seconds. No repository or external-state change occurred between runs, so the first result is retained as transient fixed-timeout load evidence.
- Observation: Two complete root integration attempts passed every TASK-007 and other integration boundary but moved inherited fixed-timeout failures between migration CLI and emitted-migration tests.
  Evidence: the first attempt passed 10 files/72 of 74 tests and timed out two migration CLI child commands; that unchanged file then passed 13/13 alone. The second attempt passed 10 files/73 of 74 tests and exceeded the emitted validator's 25-second limit by about 0.75 seconds; that unchanged file then passed 1/1 in 6.28 seconds. One final warmed complete run passed all 11 files/74 tests. These failed attempts are retained as load evidence, not product passes or defects.
- Observation: Prefix-based ownership is insufficient even when configured namespaces use the accepted restricted grammar.
  Evidence: the reviewer used outer namespace `character-app:test:t007-m3-review-7c31d8` and valid nested namespace `character-app:test:t007-m3-review-7c31d8:characters:search:v1:foreign`; the nested namespace's legitimate search key matched the outer `MATCH` and `startsWith` checks and was deleted by Redis 8.8.1. The current unit/integration fixtures use a non-colliding `:isolated:` segment and therefore missed this path.
- Observation: Per-command timeouts and repeated-cursor detection do not make the complete invalidation traversal finite when every returned nonzero cursor is distinct.
  Evidence: an injected reviewer probe completed 1,001 fast distinct SCAN pages and stopped only when the probe itself threw. The current `visitedCursors` set prevents cycles but has no total page bound, so both runtime and memory can grow without an internal limit.
- Observation: The correction worker packet named the nonexistent workspace `@character-search/api`, so that exact selector failed before compilation even though focused behavior and root typecheck passed.
  Evidence: the repository manifest names the workspace `@rick-and-morty/api`; the coordinator ran `npm run build --workspace @rick-and-morty/api` against the unchanged correction source and it passed. The invalid selector is retained as packet-command evidence, not a product failure.
- Observation: The first root `npm test` and first lifecycle invocation were contaminated by the filesystem/process sandbox denying termination of owned Playwright child processes; the browser assertion itself had reached the healthy applications, but the leftover listeners then invalidated later lifecycle cases.
  Evidence: the lifecycle verifier reported `Access denied` while terminating only its owned PIDs and ports 4173/4174 remained occupied. The coordinator identified and terminated only the exact Node listeners, proved both ports empty, reran lifecycle with child-process permission at 6/6, and repeated the complete root `npm test` successfully at unit 139/139, integration 74/74, application 13/13, and smoke 1/1. The first commands are retained as invalid permission-contaminated evidence, not product failures.
- Observation: The dynamic imports retained from the Milestone 2/3 Red phase place the production Redis module and top-level `@redis/client` load inside each first test's five-second timeout. Under a cold aggregate unit run, both files exceed that timeout even though the unchanged focused scope is fast.
  Evidence: on clean commit `62ddf56`, root `npm run test:unit` failed only the first cache and invalidation tests at 5,575 ms and 5,648 ms (137/139); the focused two-file command immediately passed 12/12 in 354 ms with 79 ms import time. The imports are at `redis-character-search-cache.unit.test.ts:66-72` and `redis-character-search-invalidation.unit.test.ts:61-69`.
- Observation: PostgreSQL and Redis do not have the same demand boundary.
  Evidence: `createLazyCharacterReadServiceOwner` calls the shared initializer from `list`, `detail`, and `comments`, and `createProductionCharacterReadServiceOwner` acquires PostgreSQL inside that initializer. The Redis client stays unconnected until list cache operations call it. Historical acceptance-review line 22 incorrectly described both resources as list-only.
- Observation: A pre-correction aggregate rerun can expose unrelated suite-order interference after the two Redis timeout tests change scheduling.
  Evidence: the independent preflight's cold aggregate passed both Redis files but failed `task-004-verification-defaults.unit.test.ts`; that exact TASK-004 test then passed 1/1 unchanged, and the first post-correction cold aggregate passed all 139 tests. The correction therefore remains limited to the confirmed Redis dynamic-load regression rather than broadening into TASK-004.
- Observation: The project owner merged the accepted local Milestone 6 candidate while TASK-007 was still intentionally `In progress` pending hosted proof and integrated re-review.
  Evidence: PR #15 produced merge commit `4663a66c17d39b9aa6da2db6f2bf169691edb587`; its main-branch run `32396138822` then supplied the required hosted pass, and a fresh integrated reviewer returned `PASS`. The merge did not erase the remaining gates; it created the exact immutable candidate on which they were completed before this documentation closure.


## Decision Log


- Decision: Keep TASK-007 to three product milestones: pure cache contract, real Redis read-path wiring, and post-import invalidation.
  Rationale: These are the three independently observable boundaries already required by ADR-0007. Splitting individual scenarios into micro-milestones would repeat handoffs; combining import invalidation with request-path caching would obscure two distinct failure contracts.
  Date/Author: 2026-08-18 / Codex primary coordinator.
- Decision: Use one exact direct dependency, `@redis/client@6.2.0`, rather than a cache framework, object mapper, Redis Stack aggregate, pool, or second client package.
  Rationale: TASK-007 needs only base GET, expiring SET, SCAN, and UNLINK commands. The official Node Redis package map identifies `@redis/client` as the base client, and version 6.2.0 is the current exact package observed during planning. Real Redis tests remain the compatibility authority for the repository's pinned server.
  Date/Author: 2026-08-18 / Codex primary coordinator.
- Decision: Keep Redis at the current fixed loopback boundary and add only `REDIS_NAMESPACE`, `REDIS_SEARCH_TTL_SECONDS`, and `REDIS_OPERATION_TIMEOUT_MS` beside the existing `REDIS_PORT`.
  Rationale: ADR-0007 requires those three values and defaults. The namespace accepts one or more lower-case ASCII segments separated by single colons; every segment begins with an alphanumeric character, continues only with alphanumerics, hyphens, or underscores, and the complete value is at most 128 bytes. This excludes SCAN metacharacters by construction. TTL accepts decimal integers from 1 through 86400 seconds; timeout accepts decimal integers from 1 through 5000 milliseconds; and `REDIS_PORT` accepts decimal integers from 1 through 65535. Host selection, credentials, TLS, cluster, Sentinel, database-number, pool, and URL parsing are not required by the local/CI profile.
  Date/Author: 2026-08-18 / Codex primary coordinator.
- Decision: Reuse the existing API unit, application, and serialized integration projects and the existing Compose Redis service.
  Rationale: The current harness already provides the required deterministic and real-infrastructure boundaries. A new runner, Gherkin binding, Docker service, or test project would duplicate existing infrastructure.
  Date/Author: 2026-08-18 / Codex primary coordinator.
- Decision: Emit fixed safe warning codes for cache failures but defer stateful warning rate-limiting/deduplication as Low-priority DPL-DEC-046.
  Rationale: Safe warnings and fail-open behavior are required now. The exact stderr diagnostics are `CHARACTER_SEARCH_CACHE_CONFIG_INVALID\n`, `CHARACTER_SEARCH_CACHE_CLIENT_ERROR\n`, `CHARACTER_SEARCH_CACHE_READ_FAILED\n`, `CHARACTER_SEARCH_CACHE_VALUE_INVALID\n`, and `CHARACTER_SEARCH_CACHE_WRITE_FAILED\n`; import invalidation retains `CHARACTER_IMPORT_INVALIDATION_FAILED\n`. They contain no raw exception detail. Mutable suppression windows, counters, clocks, and summary messages have no present product or operational threshold, so adding them would be speculative.
  Date/Author: 2026-08-18 / Codex primary coordinator.
- Decision: Activate TASK-007 from the owner's explicit implementation directive and retain the already-checked-out branch.
  Rationale: TASK-005 and TASK-006 are `Complete`, DG-006 is `Resolved`, AUTH-001 remains `Authorized` within the exact cached-URL boundary, the directive authorizes the complete active ExecPlan, and the latest branch instruction says the branch is already created and selected. Activation changes task execution state only.
  Date/Author: 2026-08-19 / Codex primary coordinator.
- Decision: Pause execution after accepting Milestone 2 Red and closing its lease; resume with a fresh Green lease rather than leaving a writer or lease active.
  Rationale: The project owner requested a safe pause. The coherent Red is complete and isolated, its exact namespace has zero residue, and no production or dependency mutation has begun, making this the first clean handoff barrier after the request.
  Date/Author: 2026-08-19 / Codex primary coordinator.
- Decision: Use the root `npm run test:integration` command for Milestone 2 and Milestone 3 integration joins.
  Rationale: Integration tests invoke repository-root migration scripts through `process.cwd()`. The workspace-scoped npm invocation relocates that directory to `apps/api` and is therefore not an authoritative whole-integration command; the root invocation preserves the documented repository boundary and passes the complete suite.
  Date/Author: 2026-08-19 / Codex primary coordinator.
- Decision: Pause after terminally closing the Milestone 3 Green lease and recording its candidate evidence, before milestone joins or S3 review.
  Rationale: The project owner requested another safe pause. The coherent Red and Green are complete, both leases are closed compliant, the exact Redis namespaces contain no residue, and no reviewer or writer remains active, so this is a clean handoff barrier without implying milestone acceptance.
  Date/Author: 2026-08-19 / Codex primary coordinator.
- Decision: Repair the Milestone 3 review findings without changing namespace grammar or the accepted key format: invalidation owns only keys whose suffix after the configured search prefix is exactly one lowercase 64-hex SHA-256 digest, and it processes at most 1,000 successful SCAN pages before rejecting prior to a 1,001st command.
  Rationale: Exact digest-shape validation distinguishes canonical keys from every nested-namespace key while preserving ADR-0007 bytes and M1/M2 behavior. A deterministic module-local page cap makes traversal and cursor-memory use finite, permits approximately 100,000 COUNT-hinted scan positions, adds no configuration, and degrades to the already accepted safe invalidation warning plus finite-TTL staleness.
  Date/Author: 2026-08-20 / Codex primary coordinator.
- Decision: Reopen TASK-007 for one test-only deterministic-loading correction and preserve both the original `PASS` review and the later `REVISE` review as point-in-time evidence.
  Rationale: The current aggregate failure is reproducible and invalidates task closure, but it does not show a Redis product-behavior defect. File-scope static imports remove Red-era deferred module loading from the timed test bodies without changing production code, assertions, timeout policy, or test count. Historical review records must not be rewritten; a new re-review will own the post-correction verdict.
  Date/Author: 2026-08-20 / Codex primary coordinator.
- Decision: Keep the real-Redis tests strict and add one run-isolated Redis namespace to the CI job rather than allowing an implicit shared test namespace.
  Rationale: Hosted run `32391250007` proves the CI environment contract is incomplete, while the integration tests correctly prevent ambiguous ownership and cleanup. `character-app:test:ci-${{ github.run_id }}-${{ github.run_attempt }}` conforms to the accepted namespace grammar, identifies each mutable hosted run, and requires no production, Compose, dependency, or test-timeout change.
  Date/Author: 2026-08-20 / Codex primary coordinator.
- Decision: Accept merged `main` run `32396138822` as the authoritative Milestone 6 hosted identity and close TASK-007 after fresh integrated `PASS` plus the documentation gate.
  Rationale: The run checked out exact merge SHA `4663a66c17d39b9aa6da2db6f2bf169691edb587`, resolved the intended run-attempt namespace, passed every workflow step including integration 74/74 and unconditional teardown, and directly resolves the sole remaining hosted reproducibility finding without changing product source. The earlier failed run remains historical evidence for `0e56e1f` only.
  Date/Author: 2026-08-20 / Codex primary coordinator.


## Outcomes & Retrospective


TASK-007 is `Complete`. All three product milestones and their Redis behavior remain implemented; SPEC-012, HS-013, AC-010, the Redis portion of NFR-003, and the adopted OR-008 contribution pass; and minimum-assessment readiness remains `Fail` at 5/12. Local deterministic-loading and PostgreSQL/Redis closure evidence remains valid for its recorded identities. The final run-isolated workflow correction is merged through PR #15, exact hosted `main` run `32396138822` passes every gate and teardown step, and fresh integrated re-review returns `PASS` with no finding. Earlier acceptance and reproducibility reviews remain preserved point-in-time evidence.

The smallest complete design was sufficient: one exact dependency, one application cache port and codec, one Redis adapter/owner, existing runtime and import composition, and existing Vitest/Compose boundaries. The two review corrections strengthened payload containment and invalidation ownership/traversal without expanding product scope. Residual weakly consistent SCAN and already-transmitted idempotent UNLINK behavior are bounded by exact ownership and finite TTL. Warning deduplication remains Low-priority DPL-DEC-046 until measured need exists.


## Purpose / Big Picture


TASK-007 makes repeated equivalent character searches reuse a finite, validated Redis copy while PostgreSQL remains authoritative. A reviewer will be able to observe a first search reaching PostgreSQL and populating Redis, a second equivalent search avoiding PostgreSQL, correct reuse of an empty result, finite TTL and namespace isolation, bounded fail-open behavior during Redis failures, and scoped cache eviction after a committed character import.

The implemented behavior satisfies mandatory [FR-BE-005](../../REQUIREMENTS.md#fr-be-005---search-caching), the Redis portion of [NFR-003](../../REQUIREMENTS.md#nfr-003---backend-technologies), and [AC-010](../../REQUIREMENTS.md#8-minimum-acceptance-criteria). It also implements the repository-adopted optional [OR-008](../../REQUIREMENTS.md#or-008---design-patterns) only through the already accepted cache-aside/service boundaries. Merged hosted evidence now proves the strict real-Redis boundary under a unique run-attempt namespace without changing product behavior.


## Context and Orientation


[ADR-0007](../../adrs/0007-use-cache-aside-for-character-searches.md) owns the cache-aside semantics. Search filters are normalized by visiting `status`, `species`, `gender`, `name`, then `origin`; each present value uses JavaScript `trim().toLowerCase()`, and blank values are omitted. `JSON.stringify` serializes that insertion-ordered object, including `{}` for no effective filter; SHA-256 hashes its UTF-8 bytes and maps them to `<namespace>:characters:search:v1:<sha256>`. No locale-sensitive case conversion or Unicode normalization is added. Valid hits may bypass PostgreSQL. Missing, malformed, timed-out, or failed Redis reads fall back to PostgreSQL. Successful PostgreSQL results, including an empty list, are written with a finite TTL. Cache write failure cannot discard the database result.

[ADR-0006](../../adrs/0006-define-a-use-case-oriented-graphql-contract.md) owns filter semantics and the exact `CharacterSummary` projection: `id`, `name`, `imageUrl`, and `species` only. [ADR-0014](../../adrs/0014-persist-and-deliver-character-image-urls-directly.md#persistence-graphql-and-redis-meaning) requires the cached `imageUrl` to remain the exact stored absolute avatar URL and prohibits image bytes or lifecycle metadata. [ADR-0016](../../adrs/0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md) owns preflight classification and the milestone-slice TDD workflow.

TASK-005 and TASK-006 are complete. TASK-007 now wraps list searches with the accepted canonical key and exact summary codec, a bounded demand-lazy Redis adapter, and PostgreSQL-authoritative fail-open behavior. Detail and comment reads remain direct. The import CLI composes the scoped Redis invalidator only after a successful commit, isolates rejection behind a fixed safe warning, and closes every acquired owner.

The root Compose project already starts PostgreSQL and Redis on loopback. Real Redis evidence must use a unique per-run namespace and remove only that namespace's keys. Redis evidence is externally mutable and therefore non-reusable unless the exact container identity, namespace, and state are pinned.

The routed derived rules are [SPEC-012](../../specs/SPEC.feature) and [HS-013](../../specs/HARD_SPEC.feature). They remain non-executable documentation; ordinary Vitest tests provide implementation evidence.


## Scope and Non-Goals


In scope:

- one canonical filter/key function using the accepted case, whitespace, absent-value, field-order, UTF-8 JSON, SHA-256, namespace, and `v1` rules;
- exact runtime validation and serialization of arrays containing only `CharacterSummary` fields and the governed absolute `imageUrl`;
- cache-aside service behavior for hit, miss, empty hit, malformed entry, read failure, write failure, serialization failure, connection outage, and timeout;
- defaults of `character-app:local`, 300 seconds, and 250 milliseconds, with the exact namespace and numeric override domains recorded in the Decision Log; an invalid Redis override is reported safely and disables only caching for that composition while PostgreSQL search remains available;
- one process-owned, lazily connected base Redis client with an error listener, no unbounded offline queue or reconnect loop, and bounded connect/command behavior;
- production read-path wiring that preserves `/healthz` as process liveness rather than Redis readiness;
- post-import iterative SCAN/UNLINK eviction of only `<namespace>:characters:search:v1:*` after a successful commit;
- isolated unit, application, and real-Redis integration evidence, plus affected documentation and acceptance review.

Out of scope:

- caching GraphQL responses, character details, favorites, comments, mutations, image bytes, or provider image responses;
- invalidating search keys after favorite or comment mutations;
- changing the GraphQL schema, Sequelize migration/model, PostgreSQL query contract, import transaction, upstream fetch policy, or image URL grammar;
- client-side caching, RESP3 cache tracking, RedisJSON, Redis Search, Lua, transactions, Pub/Sub, Streams, distributed locks, leader election, scheduled imports, multi-instance revision authorities, stale-while-revalidate, background refresh, cache warming, compression, encryption, or a generic cache framework;
- Redis Cluster, Sentinel, TLS, authentication, non-loopback hosts, connection pools, readiness endpoints, dashboards, metrics, tracing, alerting, or deployment scaling;
- Gherkin execution bindings or a new Vitest project;
- stateful warning suppression. DPL-DEC-046 preserves that possible post-MVP implementation without making it part of TASK-007;
- TASK-008 mutations, frontend TASK-010 behavior, TASK-013 portfolio cleanup, or final TASK-014/TASK-015 delivery.

If execution finds another attractive implementation that is not required by TASK-007, its authorities, or a blocking correctness/security condition, stop scope expansion. Record a concrete entry in the canonical [Technical debt and future implementations](../../IMPLEMENTATION_PLAN.md#technical-debt-and-future-implementations) register with this ExecPlan as its source, present impact, safe-deferral rationale, and falsifiable exit criterion. Do not add speculative ideas merely to populate the register.


## Plan of Work


Implementation uses workflow ID `TASK-007-20260818-01` after owner authorization and canonical activation. Each milestone gets one persistent `test_worker` for read-only preflight and test ownership, one separate persistent `code_worker` for Green, one active write lease at a time, and a fresh risk-routed reviewer. Retire both workers at the milestone barrier.

For every milestone, the default budget is one preflight, one coherent Red or passing characterization, one Green with optional same-turn Refactor, at most one same-contract correction per role, and one review correction loop. The test worker may use at most three turns: preflight, Red/evidence, and one correction. The code worker may use at most two turns: Green and one correction. Stop after the same decisive failure twice, two no-diff write handoffs, any changed binding field, an invalid Red, a lease violation, external-state contamination, or an exhausted budget. Do not silently convert a milestone into more than one TDD cycle.

No write assignment is parallel-safe in this worktree. Read-only inspection may run concurrently when scopes are independent. TASK-008 or other implementation may proceed only in a separate worktree with an explicit merge order; after integration, repeat only checks invalidated by overlapping API manifest, lockfile, service, configuration, runtime, or import paths.


### Milestone 1: Canonical key, exact summary codec, and cache-aside service


Observable acceptance contract: the fixed `status`, `species`, `gender`, `name`, `origin` traversal, `trim().toLowerCase()` values, blank omission, `{}` empty object, `JSON.stringify` bytes, and SHA-256 digest make equivalent effective filters map to one versioned key and distinct filters map to distinct keys. Only an exact array of `CharacterSummary` values can be decoded. A valid hit bypasses the repository; a miss or malformed entry reaches the repository and replaces the entry; an empty array remains a hit; and read/write/codec rejection emits only the applicable fixed safe warning while preserving the correct PostgreSQL result. Detail and comment calls remain unchanged and never use the cache.

Preflight target: [character-read-service.ts](../../../apps/api/src/application/characters/character-read-service.ts), [character-filter.unit.test.ts](../../../apps/api/src/application/characters/character-filter.unit.test.ts), and all search-service tests. The test worker must return one ADR-0016 classification for canonicalization, codec, hit, miss, empty, malformed, and injected failure scenarios. Current inspection suggests `PARTIAL` only for existing trim/blank normalization and `MISSING` for cache behavior, but that observation is not the authoritative preflight result.

Test ownership is limited to [character-filter.unit.test.ts](../../../apps/api/src/application/characters/character-filter.unit.test.ts) and the new `apps/api/src/application/characters/character-search-cache.unit.test.ts`. Green ownership is limited to [character-read-service.ts](../../../apps/api/src/application/characters/character-read-service.ts) and the new `apps/api/src/application/characters/character-search-cache.ts`. GraphQL, Sequelize, runtime, manifest, lockfile, configuration, import, and infrastructure paths are frozen.

Risk is `S3` because the milestone defines custom canonical serialized bytes, a SHA-256 key identity, and strict cache payload validation. Escalate immediately for a possible collision, locale/environment-dependent key, extra cached field, transformed `imageUrl`, fabricated cache data, swallowed PostgreSQL error, unsafe warning content, or change outside the summary search boundary.

Focused Red and Green command:

    npm exec -- vitest run --config vitest.config.ts --project api-unit apps/api/src/application/characters/character-filter.unit.test.ts apps/api/src/application/characters/character-search-cache.unit.test.ts

Milestone join:

    npm run test:unit --workspace @rick-and-morty/api
    npm run typecheck
    npm run build --workspace @rick-and-morty/api

Expected reusable evidence IDs are `T007-M1-PREFLIGHT`, `T007-M1-RED`, `T007-M1-GREEN`, `T007-M1-JOIN`, `T007-M1-RELEVANCE`, and `T007-M1-REVIEW`. A fresh `critical_reviewer` must return a closure-permitting verdict before Milestone 2. Acceptance yields the pure key, payload, and service portions of SPEC-012 and HS-013, not real Redis, TTL, timeout, wiring, or invalidation evidence.


### Milestone 2: Bounded real-Redis adapter and production search wiring


Observable acceptance contract: strict configuration loads the accepted defaults and valid overrides; an invalid Redis override emits `CHARACTER_SEARCH_CACHE_CONFIG_INVALID\n` and disables only the cache for that composition. A single process-owned base client connects lazily to loopback, registers a safe error listener, disables offline queuing and automatic reconnect, bounds connection and each request-path command, and closes without making `/healthz` depend on Redis. Against real Redis, miss/write/hit, empty hit, finite TTL, malformed-value unlink, exact summary URL, namespace isolation, connection outage, and controlled timeout all behave as required. Production list searches use this adapter; detail and comment reads do not use cache data.

The one permitted dependency addition is:

    npm install --workspace @rick-and-morty/api --save-exact @redis/client@6.2.0

This command becomes authorized only inside the accepted Milestone 2 Green lease. Do not hand-edit `package-lock.json` or add another Redis/cache package.

Preflight target: API and root manifests, lockfile, [compose.yaml](../../../compose.yaml), [.env.example](../../../.env.example), [config.ts](../../../apps/api/src/config.ts), [runtime-composition.ts](../../../apps/api/src/runtime-composition.ts), [server.ts](../../../apps/api/src/server.ts), existing runtime/config tests, and any Redis path created after this plan. Search absence alone is not a `MISSING` classification; the test worker must also confirm the available Compose and test boundaries.

Test ownership is limited to [config.unit.test.ts](../../../apps/api/src/config.unit.test.ts), [runtime-composition.unit.test.ts](../../../apps/api/src/runtime-composition.unit.test.ts), and new narrowly scoped tests under `apps/api/src/infrastructure/redis/`. Green ownership is limited to `apps/api/package.json`, `package-lock.json`, [.env.example](../../../.env.example), [config.ts](../../../apps/api/src/config.ts), [runtime-composition.ts](../../../apps/api/src/runtime-composition.ts), [server.ts](../../../apps/api/src/server.ts), and new Redis infrastructure source under `apps/api/src/infrastructure/redis/`. The accepted Milestone 1 tests are frozen; GraphQL schema/resolvers, Sequelize, migration, import, web, Compose, and workflow paths are frozen.

Risk is `S2` because this joins process lifecycle, a network boundary, configuration, and externally mutable real Redis. Escalate to `S3` for a retry/reconnect loop, unbounded queue, command continuing past an accepted abort in a way that can violate behavior, process crash from an unhandled client error, credential/detail leakage, shared test namespace, broad cleanup, eager readiness coupling, or any custom identity change from Milestone 1.

Focused unit command after the new paths exist:

    npm exec -- vitest run --config vitest.config.ts --project api-unit apps/api/src/config.unit.test.ts apps/api/src/runtime-composition.unit.test.ts apps/api/src/infrastructure/redis/redis-character-search-cache.unit.test.ts

Focused real-Redis command after `npm run infra:up`:

    npm exec -- vitest run --config vitest.config.ts --project api-persistence-integration apps/api/src/infrastructure/redis/redis-character-search-cache.integration.test.ts

Milestone join:

    npm run test:unit --workspace @rick-and-morty/api
    npm run test:integration
    npm run test:application --workspace @rick-and-morty/api
    npm run typecheck
    npm run build --workspace @rick-and-morty/api
    npm run test:smoke
    npm run test:smoke:lifecycle

Real Redis evidence is `Non-reusable` unless its exact container, port, unique namespace, and cleanup state remain pinned. Expected evidence IDs are `T007-M2-PREFLIGHT`, `T007-M2-RED`, `T007-M2-GREEN`, `T007-M2-REDIS`, `T007-M2-JOIN`, `T007-M2-RELEVANCE`, and `T007-M2-REVIEW`. A fresh `independent_reviewer` reviews ordinary S2 behavior; any listed S3 trigger routes to a `critical_reviewer`. Acceptance yields the real-Redis request-path portions of SPEC-012 and HS-013.


### Milestone 3: Scoped post-import invalidation


Observable acceptance contract: after and only after a successful import commit, the production invalidator iterates `<namespace>:characters:search:v1:*` with SCAN, sends non-empty batches to UNLINK, bounds every Redis operation, and never calls KEYS or crosses another namespace. Import, validation, or transaction failure does not invalidate. Redis invalidation failure emits the existing fixed safe warning, keeps the committed PostgreSQL refresh successful, and leaves stale data bounded by the finite TTL.

Preflight target: [character-import-cli.ts](../../../apps/api/src/infrastructure/characters/character-import-cli.ts), its existing application and PostgreSQL integration tests, the accepted Milestone 2 Redis adapter, and existing invalidation tests. The already passing TASK-005 post-commit ordering and rejection behavior must be classified `EXISTING_AND_COVERED` if still fresh; do not manufacture another Red for it. Only the missing production SCAN/UNLINK adapter, real Redis isolation, and actual CLI wiring may enter the new Red.

Test ownership is limited to new focused invalidation unit/integration tests under `apps/api/src/infrastructure/redis/` and, only when preflight proves a specific uncovered production join, the existing character-import CLI application test. Green ownership is limited to the accepted Redis adapter/factory and [character-import-cli.ts](../../../apps/api/src/infrastructure/characters/character-import-cli.ts). Import service/repository, upstream client, migration, GraphQL, web, manifests, lockfile, Compose, and accepted Milestone 1 tests are frozen.

Risk is `S3` because post-commit cross-system recovery and scoped destructive key removal must preserve committed data and namespace integrity. Escalate for KEYS, FLUSHDB, DEL/UNLINK outside the exact prefix, invalidation before commit, rollback/failure coupling, swallowed close failure, stale values without finite TTL, cursor retry that can loop without a bound, or any PostgreSQL transaction change.

Focused command after the new paths exist:

    npm exec -- vitest run --config vitest.config.ts --project api-unit --project api-application --project api-persistence-integration apps/api/src/infrastructure/redis/redis-character-search-invalidation.unit.test.ts apps/api/src/infrastructure/redis/redis-character-search-invalidation.integration.test.ts apps/api/src/infrastructure/characters/character-import-cli.application.test.ts

Milestone join:

    npm run test:unit --workspace @rick-and-morty/api
    npm run test:application --workspace @rick-and-morty/api
    npm run test:integration
    npm run typecheck
    npm run build --workspace @rick-and-morty/api

Expected evidence IDs are `T007-M3-PREFLIGHT`, `T007-M3-RED`, `T007-M3-GREEN`, `T007-M3-REDIS`, `T007-M3-JOIN`, `T007-M3-RELEVANCE`, and `T007-M3-REVIEW`. A fresh `critical_reviewer` must return a closure-permitting verdict before integrated closure. Acceptance yields the import-invalidation and committed-data failure portions of HS-013.


### Milestone 4: Integrated validation, acceptance, and closure


No new production behavior begins here. First run the cumulative ADR-0016 relevance audit over every TASK-007 test, fixture, fake, helper, timeout, namespace generator, and cleanup path. Remove or revise only tests that are duplicated without added confidence, assert an abandoned implementation detail, or no longer map to TASK-007. A newly discovered behavior gap returns to a new preflight-classified milestone; documentation closure cannot hide it.

Run the closure packet once from the repository root after build and healthy owned infrastructure:

    npm run typecheck
    npm run build
    npm test
    npm run validate:tailwind
    npm run test:smoke:lifecycle
    python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
    git diff --check
    git rev-parse HEAD
    git status --short

Run the ADR validator only if implementation or closure changes ADR text, architecture coverage, optional disposition, or gate semantics:

    python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .

Use the acceptance-review workflow to create a dated TASK-007 review. A fresh integrated `independent_reviewer` concentrates on cross-milestone behavior, exact keys and payloads, timeout/offline/reconnect behavior, lifecycle, PostgreSQL authority, import ordering, namespace cleanup, test relevance, KISS/YAGNI compliance, DPL-DEC-046 deferral, and documentation closure. Route any remaining identity, recovery, destructive-scope, or unresolved Blocker/Major trigger to `critical_reviewer`.

Only a closure-permitting verdict and every authoritative command allow the primary coordinator to mark TASK-007 `Complete`, mark AC-010 passing, synchronize the Redis portion of NFR-003 and current readiness, update Redis configuration/operation guidance, system status, SPEC/HS execution status, implementation-plan evidence, execution chronology, review index, and plan index, and move this stable plan to `docs/plans/completed/`. No worker or reviewer performs those authoritative state changes.


### Milestone 5: Post-closure unit reproducibility correction and re-review


Milestone 5 uses correction workflow ID `TASK-007-20260820-02` and milestone ID `TASK-007-20260820-02-M5`; earlier workflow and lease identities remain immutable historical evidence.

Observable acceptance contract: a cold root `npm run test:unit` must pass all 139 tests without increasing Vitest's five-second timeout, weakening assertions, serializing the complete suite, or changing production behavior. The two Redis unit files load their already-existing production factories deterministically outside timed test bodies. The acceptance-review correction must state that PostgreSQL initializes on the first character read while the Redis connection remains list-cache-demand-lazy; historical review text remains unchanged.

Preflight target: `apps/api/src/infrastructure/redis/redis-character-search-cache.unit.test.ts`, `apps/api/src/infrastructure/redis/redis-character-search-invalidation.unit.test.ts`, `apps/api/src/infrastructure/redis/redis-character-search-cache.ts`, `apps/api/src/runtime-composition.ts`, root `test:unit`, and the preserved aggregate/focused transcripts. The test worker returns exactly one ADR-0016 classification. The coordinator's present evidence suggests `REGRESSION`: the authoritative aggregate command fails 137/139 while the focused 12/12 behavior passes, but the worker must independently confirm the boundary before any write.

This is a test-only reliability correction, not a production behavior change. One persistent `test_worker` owns the two unit-test files under a guarded `evidence` assignment after preflight acceptance. The existing failing aggregate command is the regression proof; no new assertion or production Green is required. The worker may replace only the dynamic factory loads with file-scope static imports and remove now-unused local loader types/helpers. All production source, manifests, configuration, integration/application/browser tests, timeout configuration, and historical reviews are frozen. No `code_worker` is needed unless preflight discovers a production defect, which would change the contract and stop this milestone for coordinator triage.

Risk is `S1`: the correction touches test loading only, but it controls an authoritative closure gate. Escalate for any production edit, assertion/test-count change, timeout increase, test serialization, mock/reset behavior change, focused failure, aggregate failure, or evidence that static import does not isolate the cold-load cost.

Focused and milestone commands:

    npm exec -- vitest run --config vitest.config.ts --project api-unit apps/api/src/infrastructure/redis/redis-character-search-cache.unit.test.ts apps/api/src/infrastructure/redis/redis-character-search-invalidation.unit.test.ts
    npm run test:unit
    npm run typecheck

The focused command must pass 12/12. The milestone command must pass 26 files/139 tests from a fresh process on its first post-correction invocation. Root typecheck must pass. A fresh `milestone_reviewer` reviews import placement, unchanged assertions/test count, no timeout/config/source drift, and the runtime-ownership wording disposition.

After milestone acceptance, restart only the preserved `rick-and-morty-dev` Compose project, pin fresh PostgreSQL/Redis identities and unique TASK-007 namespaces, and rerun the complete Milestone 4 closure packet because the prior closure result is contradicted and the relevant test fingerprint changes. Exact-prefix cleanup, database cleanup, ports, documentation/ADR validators, and `git diff --check` must pass. A fresh `independent_reviewer` creates a new dated re-review; only `PASS` permits final reconciliation and moving this plan back to `docs/plans/completed/`.

Budget: one read-only preflight, one guarded test-only evidence write, no production Green, at most one same-contract test correction, one milestone review, one closure run, and one integrated re-review. Stop after one repeated aggregate failure, any unexpected path, any assertion/test-count change, any timeout/config change, or any reviewer Blocker/Major.


### Milestone 6: Hosted CI Redis namespace correction


Milestone 6 uses workflow ID `TASK-007-20260820-03` and milestone ID `TASK-007-20260820-03-M6`. Earlier workflow, lease, review, and closure identities remain immutable historical evidence.

Observable acceptance contract: the GitHub Actions `validate` job supplies one explicit run-isolated `REDIS_NAMESPACE` that conforms to the accepted grammar and is inherited by `npm test`. The existing real-Redis cache and invalidation tests remain strict: they must continue rejecting an absent namespace instead of silently sharing `character-app:local`. A corrected hosted run on the exact pushed candidate must pass the full workflow, including integration 74/74 and unconditional infrastructure teardown.

Preflight targets are `.github/workflows/ci.yml`, `apps/api/src/infrastructure/database/task-004-ci-workflow.unit.test.ts`, the two frozen Redis integration tests, hosted run `32391250007`, and the current branch/HEAD. The expected classification is `REGRESSION`: TASK-007 added namespace-dependent real-Redis tests after the earlier workflow contract was established, but the CI job environment was not extended with their required identity. The test worker must independently confirm the classification before any write.

One persistent `test_worker` owns the minimum workflow-contract Red in `apps/api/src/infrastructure/database/task-004-ci-workflow.unit.test.ts`. It must assert exactly one job-scoped `REDIS_NAMESPACE: "character-app:test:ci-${{ github.run_id }}-${{ github.run_attempt }}"` entry and preserve all existing step uniqueness/order checks. After accepted Red, one separate `code_worker` owns minimum Green in `.github/workflows/ci.yml`. The Redis integration tests, production source, manifests, lockfile, Compose file, ports, timeouts, and every other workflow step are frozen.

Risk is `S1`: the correction is one hosted test-environment identity, but it controls the authoritative CI closure gate. Escalate for any integration-test fallback, production/config parser change, dependency or Compose change, workflow permission/event/step change, non-run-isolated namespace, test weakening, unexpected path, or inability to prove exact hosted identity.

Focused and milestone commands:

    npm run test:unit --workspace @rick-and-morty/api -- --run src/infrastructure/database/task-004-ci-workflow.unit.test.ts
    npm run typecheck
    npm run test:integration -- --run apps/api/src/infrastructure/redis/redis-character-search-cache.integration.test.ts apps/api/src/infrastructure/redis/redis-character-search-invalidation.integration.test.ts

The focused Red must fail only because the workflow lacks the exact namespace entry; Green must pass the same unit test. Local milestone validation must run the two real-Redis files against one fresh explicit namespace and leave that exact prefix empty. A fresh `milestone_reviewer` checks YAML expression validity, grammar/length, run isolation, inherited environment scope, unchanged strict tests, and unchanged workflow boundaries.

At the local-only Milestone 6 barrier, PASS produced only a hosted candidate. Because no commit or push was authorized by this plan or the correction request, TASK-007 closure was withheld until the project owner committed and merged the candidate and an exact hosted GitHub Actions run passed. That external evidence now exists, and the later progress, evidence, and revision records preserve the fresh integrated re-review and coordinator documentation reconciliation that returned the task to `Complete` and this plan to `docs/plans/completed/`.

Budget: one preflight, one Red, one setup/Green, one correction per role, one local focused/milestone validation, one S1 review, one hosted run, and one integrated re-review. Stop after a repeated identical failure, a second hosted failure on the same candidate, any unexpected path, or any reviewer Blocker/Major.


## Concrete Steps


Run commands from the repository root in PowerShell.

Planning/registration checks:

    python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
    git diff --check
    git status --short

Before implementation, the primary coordinator must verify:

    git status --short --branch
    npm ls @redis/client --all
    npm run infra:ps

The expected pre-implementation dependency result is no installed direct `@redis/client` dependency. TASK-007 remains `Pending` until separate authorization and activation are recorded.

For local integration, use the existing loopback profile, choosing explicit free ports in the same PowerShell session when defaults are occupied:

    $env:POSTGRES_USER = 'rick_and_morty'
    $env:POSTGRES_PASSWORD = 'local-development-only'
    $env:POSTGRES_DB = 'rick_and_morty'
    $env:POSTGRES_SCHEMA = 'public'
    $env:POSTGRES_PORT = '5432'
    $env:POSTGRES_MIGRATION_LOCK_TIMEOUT_MS = '5000'
    $env:REDIS_PORT = '6379'
    $env:REDIS_NAMESPACE = 'character-app:test:<unique-run-id>'
    $env:REDIS_SEARCH_TTL_SECONDS = '300'
    $env:REDIS_OPERATION_TIMEOUT_MS = '250'
    npm run infra:up
    npm run infra:ps

Never run `infra:down` unless this execution started the exact `rick-and-morty-dev` project, no peer task uses it, and every owned PostgreSQL and Redis namespace has already been checked. Never use FLUSHDB, FLUSHALL, KEYS, a wildcard shell deletion, or another environment's namespace for cleanup.

At every milestone, the decisive Red must exit nonzero only for the accepted missing/regressed contract; Green must pass the same focused command. Record exact command, exit code, test count, intended failure or pass, relevant-tree fingerprint, environment identity, lease ID/digest/terminal receipt, and cleanup outcome in `Progress` and `Artifacts and Notes`.


## Validation and Acceptance


TASK-007 can close only when evidence proves:

- every intended scenario has an ADR-0016 preflight classification and no existing behavior received a fabricated Red;
- each missing/regressed/confirmed-partial slice has one accepted coherent Red, matching Green, frozen tests, compliant terminal leases, primary diff inspection, affected-test relevance audit, milestone join, and risk-routed review;
- equivalent case, whitespace, field order, and absent values share one deterministic versioned key, while distinct effective filters do not;
- cached bytes decode only to exact `CharacterSummary[]` values with the exact governed absolute `imageUrl` and no favorite, comment, detail, image-byte, or lifecycle field;
- miss, hit, empty hit, malformed recovery, TTL, namespace isolation, read/write/serialization failures, timeout, connection outage, and PostgreSQL-unavailable behavior match ADR-0007;
- the request path waits no longer than the configured Redis bound, does not retain an unbounded offline queue, and does not loop on reconnection;
- process liveness stays independent of PostgreSQL and Redis readiness, and owned resources close without hanging;
- successful import uses iterative SCAN/UNLINK after commit only, never KEYS, and cannot read or remove another namespace;
- invalidation rejection keeps the PostgreSQL refresh committed, emits no raw error/credential/stack, and leaves stale entries bounded by TTL;
- real Redis tests name a unique run namespace, verify exact scoped cleanup, and leave no run-owned key or process residue;
- no migration, GraphQL schema, detail/comment/mutation behavior, frontend, image bytes, generic cache framework, scheduler, metrics stack, or DPL-DEC-046 warning suppressor entered the diff;
- SPEC-012 and HS-013 map to passing ordinary automated checks and reproducible real-Redis/controlled-failure evidence;
- the complete repository packet and fresh integrated review pass; and
- the task-closure documentation gate reconciles every affected owner before canonical `Complete` or readiness claims.


## Idempotence and Recovery


Canonical key generation and codec tests are deterministic and safe to repeat. Cache writes are replacements with a finite TTL. Search reads are side-effect free except best-effort removal of one malformed exact key. Invalidation is safe to rerun because it scans and unlinks only the configured versioned namespace; missing keys are not errors.

Every integration run creates a unique Redis namespace. Cleanup uses only that exact prefix and verifies no owned keys remain. If cleanup fails, preserve the namespace and failure evidence, stop acceptance, and authorize only an exact-prefix recovery after confirming it cannot affect another run. Do not recover with FLUSHDB, FLUSHALL, KEYS, broad deletion, or infrastructure teardown.

If Redis is unavailable, the read path falls back to PostgreSQL; do not mutate configuration or extend timeouts merely to make a failing test pass. If PostgreSQL is unavailable and no valid hit exists, preserve the clear failure. If a command abort, close, or connection failure leaves client state ambiguous, destroy only the task-owned client, record the state, and start a fresh isolated test run.

An unexpected path, concurrent write, stale fingerprint, invalid Red, guard violation, dependency resolution change, or reviewer finding stops writers. Terminally close the current lease, preserve user and peer work, inspect the actual tree and receipt, and issue a fresh packet only when binding fields remain unchanged. Never use `git reset --hard`, `git checkout --`, broad deletion, a redefined lease, or concurrent Red/Green writers.

If a separate worktree implements TASK-008 or another API task, merge at a named barrier. Re-run preflight for any overlapping service/config/runtime/import path and repeat only invalidated evidence. Do not revert or overwrite peer work.


## Artifacts and Notes


Planning baseline:

- Branch/HEAD at plan creation: `main` at the then-current `origin/main`; clean worktree before these documentation edits.
- Current Redis server: `redis:8.8.1-alpine` in the existing Compose project.
- Current client state: no direct Redis client in `apps/api/package.json` or `package-lock.json`.
- Current seam: `requestDeferredInvalidation` is an intentional no-op called only through the already tested post-commit command boundary.
- Research routing: `R0` for repository-local scope and implementation-boundary inspection; one bounded current-package check used official Node Redis/Redis sources, with no option comparison or architecture change.
- Primary package evidence accessed 2026-08-18: [Node Redis package map and SCAN guidance](https://github.com/redis/node-redis), [Node Redis production usage](https://redis.io/docs/latest/develop/clients/nodejs/produsage/), and [`@redis/client` 6.2.0 package record](https://www.npmjs.com/package/@redis/client/v/6.2.0).
- Plan-registration validation: `validate_docs.py` passed 60 Markdown files, 41 requirement IDs, 1 authorization, 18 tasks, 17 SPEC rules, 20 HS rules, and 123 scenarios; `validate_adrs.py` passed 17 ADRs and 38 requirements with only the pre-existing NFR-006 mapping warning; `git diff --check` exited zero with working-copy line-ending warnings only; and every plan heading has the required two blank lines.

Activation baseline:

- Authorization date: 2026-08-19.
- Branch: `codex/execplan-007-bounded-redis-cache-aside`; retained exactly as already checked out per the owner's latest instruction.
- HEAD before activation edits: `35a051e088bc4738f6142e8c6c819cf25c56e59e`.
- Initial tree: clean, with one registered worktree and no peer TASK-007 branch selected.
- Dependency check: `npm ls @redis/client --all` confirmed no installed direct Redis client.
- Canonical TASK-007 state after merged hosted verification, fresh integrated re-review, and documentation reconciliation: `Complete`; earlier reopenings remain historical evidence.
- Infrastructure observation: the restricted `npm run infra:ps` attempt could not access the Docker API, so activation claims no running Compose ownership and real-Redis evidence remains non-reusable until a run-owned environment is established.

Milestone 1 candidate evidence:

- `T007-M1-PREFLIGHT`: `PARTIAL`; existing fixed traversal, trim, blank omission, and direct detail/comment behavior remain covered; lowercase canonicalization and all key/codec/cache behavior were the explicit missing gap.
- `T007-M1-RED`: corrected Red lease `TASK-007-20260818-01-M1-red-03` closed compliant at receipt `b5f16b477923b0278c4e08e131292260401710ce51680fd48b028c9536576404`; exact focus discovered 12 tests and failed 10 solely for the missing contract while two existing behaviors passed. Frozen test blob IDs are `885a11b6ba3e33d4cd68125c34203147dc89798c` and `f2738f4903c204c50984c721d4b156bcadb73880`.
- `T007-M1-GREEN`: lease `TASK-007-20260818-01-M1-green-01` closed compliant at receipt `fd549eeb7aeaa154467394989ef2f560b8601b4cd4f856a1f700f82225b4b6c6`; the same exact focus passed 12/12 with frozen tests unchanged. Source blob IDs are `6cd5f09e583c26ced4b18a34d6473639d451ba88` and `b24f2d9b67dc0eea6937e7ab1a8f084abf6bb9be`.
- `T007-M1-JOIN`: root typecheck and API build passed; the build-refreshed API unit project passed 23 files/108 tests. The pre-build unit attempt's inherited 105/108 result is not reused as passing evidence.
- `T007-M1-RELEVANCE`: the 12 focused tests map to key identity, exact codec, hit/miss/empty/malformed/fail-open behavior, and PostgreSQL error preservation; existing detail/comment tests remain the unchanged no-cache evidence. Fresh S3 review is pending.
- `T007-M1-REVIEW`: fresh critical review returned `REVISE`. Canonical key bytes/digests, optional injection, PostgreSQL authority, detail/comment isolation, scope, leases, and current tests passed. One Major proved sparse arrays and array/object `toJSON` hooks can violate encoder/decoder closure and stable-summary field containment; one Minor proved the default `console.warn` sink emits `\n\n`. The single review-correction loop must add adversarial regression evidence before changing either source path, then obtain bounded S3 confirmation.
- `T007-M1-REVIEW-RED`: lease `TASK-007-20260818-01-M1-review-red-01` closed compliant at receipt `745b9109789cc8d8b028bcd41e34f7283c1334352d1e1820aac0020e385fa985`; exact focus discovered 14 tests, the 12 original tests passed, and two new tests failed only on sparse/`toJSON` closure and `\n\n` default output.
- `T007-M1-REVIEW-GREEN`: lease `TASK-007-20260818-01-M1-review-green-01` closed compliant at receipt `db6b4927d2b881c9d09c18d6243e387f9bab34a83c316a50a99c13627817fe7f`; exact focus passed 14/14 with the review test frozen at lease closure. The primary then exceptionally corrected only that test's stale local factory type from required to optional after root typecheck proved the mismatch; no assertion or runtime byte changed. Final blob IDs are filter test `885a11b6ba3e33d4cd68125c34203147dc89798c`, cache test `2f8f389ab33f93417e6e882eab77526a3a99fef8`, read service `1f0d956b32297a3246e9f1ee4051e36d3f1697e0`, and cache module `ec210481fbc4ab1e78ffaf43dc129fb8750c0268`.
- Corrected join: focused 14/14, root typecheck, API build, and build-refreshed API unit 23 files/110 tests pass. One prior 109/110 run failed only on an inherited `%TEMP%` rename `EPERM` and is not passing evidence. Bounded S3 confirmation is pending.
- `T007-M1-REVIEW` bounded confirmation: the same critical reviewer returned `PASS` with no Blocker, Major, or Minor. It independently executed focused 14/14, adversarial compiled-code and exact-stderr probes, verified both correction receipts and all four final blob IDs, passed documentation validation and `git diff --check`, and reused the matching root typecheck, API build, and API unit 110/110 evidence. Milestone 1 is accepted; external Redis evidence remains non-reusable and pending.

Milestone 2 evidence:

- `T007-M2-PREFLIGHT`: `PARTIAL`; the accepted Milestone 1 service/key/codec, generic lazy owner, health/detail/comment boundaries, Compose Redis service, and serialized persistence integration project exist. Redis configuration/default validation, safe invalid-config disable, the base client and adapter, bounded operations, TTL/outage/timeout behavior, production list wiring, aggregate close, and real-Redis cache scenarios are the explicit missing gap.
- `T007-M2-RED`: lease `TASK-007-20260818-01-M2-red-01` closed compliant at receipt `cc38c91b1c13731785b687b1ae48588eff4f46675be786a6b0131d4ad580c1a8`. The focused unit command discovered 30 tests: all seven pre-existing assertions passed and 23 new assertions failed only because `loadRedisRuntimeConfig`, `createProductionCharacterReadServiceOwner`, and the Redis adapter module are absent. The focused persistence command discovered two tests and both failed only for the absent adapter module. Frozen test blobs are config `57c7f4d80d458edf54ffd657c155706702a05387`, runtime composition `be01b9da54f7ef912f7e5bf76d897bfa6b61efaf`, Redis unit `a45755e6b1976feda38b0d8be7895b982535bcf5`, and Redis integration `85cc1762dc8d383de75b6263995e6166bf90b593`.
- `T007-M2-GREEN`: lease `TASK-007-20260818-01-M2-green-01` closed compliant at receipt `9fd9f9584e1994af7ca64b74151938a3aa37b877d5594cbd6aa0b2d5e52ac995`; exact `@redis/client@6.2.0`, strict configuration, the bounded demand-lazy adapter, list-only production composition, and aggregate close made the focused unit scope pass 30/30 and real Redis pass 2/2. The Green namespace `character-app:test:t007-m2-green-9c4e71` scanned empty. Root typecheck then found only a missing type-only import in the frozen runtime test, so no production workaround was made.
- `T007-M2-RED-CORRECTION-01`: lease `TASK-007-20260818-01-M2-red-02` closed compliant at receipt `cbcb0fdbe0da54528f3c38fcd529a4957e50e9f5202e33c81f0f2c6540ea1db5`; it added only the missing `LazyCharacterReadServiceOwner` type import, preserved all assertions and the other three frozen test blobs, and passed focused 30/30 plus root typecheck.
- `T007-M2-JOIN`: API unit passed 24 files/133 tests, API application 4 files/11 tests, authoritative root integration 10 files/73 tests, API build and root typecheck passed, Chromium smoke passed 1/1, lifecycle passed 6/6, and `npm ls @redis/client --all` proved the direct exact dependency. The failed workspace integration attempts are invalid working-directory evidence because npm changed `process.cwd()` to `apps/api`; the TASK-007 Redis file passed there, direct root migration build passed, and unchanged warm migration focus passed 14/14. All accepted and attempted TASK-007 namespaces, including `character-app:test:t007-m2-join-6b410e` and `character-app:test:t007-m2-root-6b410f`, scanned empty.
- `T007-M2-REVIEW`: a fresh independent reviewer returned `PASS` with no Blocker, Major, or Minor after inspecting scope, leases, exact dependency/configuration, installed-client abort and destruction semantics, timeout integrity, diagnostics, production composition, M1 identities, KISS/YAGNI, and matching validation evidence. Milestone 2 is accepted; post-import invalidation and full AC-010 remain pending.

Milestone 3 preflight evidence:

- `T007-M3-PREFLIGHT`: `PARTIAL`; passing CLI application 4/4 plus existing PostgreSQL coverage prove invalidation runs only after successful import commit, rejection emits only `CHARACTER_IMPORT_INVALIDATION_FAILED\n`, command success is retained, and committed refresh data remains visible. Finite stale-data lifetime is accepted from Milestone 2 TTL evidence. Missing behavior is limited to iterative bounded SCAN of `<namespace>:characters:search:v1:*`, non-empty UNLINK batches, non-progressing-cursor termination, namespace isolation, process lifecycle, and production CLI composition. Proposed Red ownership is the two new Redis invalidation test files plus the existing CLI application test; the CLI source, PostgreSQL integration test, accepted Redis source/tests, config, and all prior TASK-007 tests remain frozen during Red.
- `T007-M3-RED`: lease `TASK-007-20260818-01-M3-red-01` closed compliant at receipt `be41ec43d5898eb74e230521c830494b98bab4573786cf61915af2cc20247c64`, changing only the three authorized test paths. The exact combined focus discovered three files/10 tests: four inherited CLI scenarios passed and six new scenarios failed only on absent exports `createRedisCharacterSearchInvalidationOwner` and `runCharacterImportProductionCommand`. Root typecheck passed. Final test blobs are Redis unit `5000dbf87e3c94086acfc21f69ccf3064fd447f5`, Redis integration `e7696ab15c60ddba1386e3b4be5367155a8b1941`, and CLI application `ce46a19656c2017bfc5b5f79df9576e83a143e90`. Redis container `de49530cc5846207ccbffea524f4e71b9bc484fd4edd819d599c8e45e6834c54`, image `redis:8.8.1-alpine`, port 56400, and namespace `character-app:test:t007-m3-red-1a62f0` were verified; exact-prefix cleanup scanned empty.
- `T007-M3-GREEN`: lease `TASK-007-20260818-01-M3-green-01` closed compliant at receipt `0b5e1eb9fd4a797544e850ae22b3bfb162f240a51e43c05aa9526bf3babc8b87`, changing only the accepted Redis adapter and import CLI. Exact focus passed three files/10 tests against Redis namespace `character-app:test:t007-m3-green-2b73c1`; root typecheck and API build passed; a behavior-preserving extraction of production import initialization then required and passed the same 10/10 focus. Final source blobs are Redis adapter `5f98cc5c568eec90e748a228963035825eef7899` and import CLI `202343d468c25f1c42840e11143beda096c038c7`; all three frozen Red blobs match. Exact-prefix SCAN found zero residue, `git diff --check` passed, and no `KEYS`, `FLUSHDB`, or `FLUSHALL` call exists. Milestone joins and S3 critical review remain pending.
- `T007-M3-JOIN`: resumed API unit passed 25 files/137 tests on the unchanged rerun, API application passed 4 files/12 tests, and the authoritative warmed root integration command passed 11 files/74 tests with namespace `character-app:test:t007-m3-join-4d91b4`. Root typecheck and API build are reused from the exact Green source/test blobs. Earlier complete integration namespaces `character-app:test:t007-m3-join-4d91b2` and `character-app:test:t007-m3-join-4d91b3` correspond to non-passing inherited migration-timeout attempts; the isolated unchanged migration CLI and emitted-validation leaves subsequently passed 13/13 and 1/1. Exact-prefix SCAN proved all three join namespaces empty. Fresh S3 review is next.
- `T007-M3-REVIEW`: fresh critical reviewer returned `REVISE`, with no Blocker, two Major, and no Minor. A real Redis probe proved cross-namespace deletion for a valid nested namespace and cleaned its exact review prefix to zero. An injected distinct-cursor probe reached 1,001 pages without an internal stop. The reviewer separately passed forbidden-command inspection, non-empty UNLINK behavior, cyclic cursor rejection, per-operation abort/destruction, safe CLI failure/closure semantics, lease/blob identity, exact dependency, focused 10/10, diff checking, and the supplied joins. Milestone acceptance is withheld pending one review-correction loop.
- `T007-M3-REVIEW-PREFLIGHT`: `REGRESSION`; the correction Red is limited to the existing invalidation unit and real-Redis integration tests, and future Green is limited to the Redis adapter. Existing placeholder suffixes must become distinct canonical lowercase 64-hex digests without weakening assertions. New unit/real-Redis scenarios must preserve a legitimate nested-namespace key, and unit evidence must reject before issuing a 1,001st distinct-cursor SCAN. CLI, configuration, key builder, manifests, lockfile, namespace grammar, TTL, and accepted M1/M2 tests are frozen.
- `T007-M3-REVIEW-RED`: lease `TASK-007-20260818-01-M3-review-red-01` closed compliant at receipt `148d2f29be3fbb759c0cf7db12ef84715ef5f4980e3d08ae642d3e7e242bf572`, changing only the two authorized invalidation tests. Exact focus discovered two files/6 tests: the inherited repeated-cursor and two timeout scenarios passed, while three new regression scenarios failed only because the outer invalidator included/deleted a valid nested namespace key and issued SCAN 1,001. Root typecheck passed; namespace `character-app:test:t007-m3-review-red-6e5a31` scanned empty. Frozen correction test blobs are unit `41ec109ab45492435c3c2e40e8ec2118559f4377` and integration `3780c81e8f5bec09d8d105a7476a3a98ba3d8afb`.
- `T007-M3-REVIEW-GREEN`: lease `TASK-007-20260818-01-M3-review-green-01` closed compliant at receipt `5696a31f7ce4d7f5daac9f2c50b891bd002ad8cec0859138b925cb9f0416362e`, changing only the Redis adapter to blob `d57712e34ccf73906fc887c68488d62578c5e418` while both correction tests remained frozen. Exact focus passed 6/6, root typecheck passed, and the worker's mistyped `@character-search/api` selector failed before compilation; the coordinator's manifest-correct `npm run build --workspace @rick-and-morty/api` passed unchanged source. Worker namespace `character-app:test:t007-m3-review-green-6e5a32` and coordinator focus namespace `character-app:test:t007-m3-review-join-6e5a33` both scanned empty. No Refactor occurred.
- `T007-M3-REVIEW-JOIN`: corrected API unit passed 25 files/138 tests, API application passed 4 files/12 tests, and authoritative root integration passed 11 files/74 tests under namespace `character-app:test:t007-m3-review-join-6e5a34`. The exact namespace scanned empty. Root typecheck and API build match the correction source/test tree; HEAD remains `35a051e088bc4738f6142e8c6c819cf25c56e59e`, the index is empty, `git diff --check` passes with line-ending warnings only, and bounded critical confirmation is next.
- `T007-M3-REVIEW-CONFIRM`: the same critical reviewer returned bounded `PASS` with no Blocker, Major, or Minor. Focused correction passed 6/6 under namespace `character-app:test:t007-m3-confirm-6e5a35`; independent real-Redis and injected-client probes proved outer canonical deletion, valid nested canonical preservation, malformed-key exclusion, page-1,000 terminal success and nonterminal pre-1,001 rejection, repeated-cursor rejection, timeout abort/destruction, safe CLI/closure behavior, exact blobs/receipts/scope, and zero residue. The server may execute an already-transmitted owned-key UNLINK and SCAN may miss concurrent mutations; both are accepted idempotent/best-effort residuals bounded by exact ownership and finite TTL. Milestone 3 is accepted.
- `T007-M4-RELEVANCE`: inspection of the TASK-007 key/codec, service, config, runtime-composition, Redis unit/integration, invalidation unit/integration, and import-CLI application scopes found no `.skip`, `.only`, pending-test marker, snapshot, placeholder, live-network fixture, abandoned implementation assertion, or duplicate without added confidence. Deterministic fakes cover controlled timeout/error/lifecycle paths; real Redis covers hit/miss/empty/TTL/malformed/outage/isolation/invalidation; exact cleanup helpers defend prefix ownership and aggregate operation plus cleanup failures. No test change was necessary.
- `T007-M4-CLOSURE`: exact 19-path implementation fingerprint `85383E794DCC80E2A6AA358D2891D1A196D26A5052C43CD74178A768D3C0A7C1` passed `npm run typecheck`, `npm run build`, and the permission-corrected complete `npm test`: 26 unit files/139 tests, 11 integration files/74 tests, five application files/13 tests, and Chromium smoke 1/1. `npm run validate:tailwind`, permission-corrected lifecycle 6/6, documentation validation, and `git diff --check` also pass. The first smoke/lifecycle attempts are non-passing sandbox-permission evidence; exact owned listeners were removed before the complete rerun. Redis namespaces `character-app:test:t007-closure-8f5c20`, `character-app:test:t007-lifecycle-8f5c21`, `character-app:test:t007-lifecycle-8f5c22`, and `character-app:test:t007-closure-8f5c23` scan empty; PostgreSQL has zero `task_004_*` databases; ports 4173/4174 are empty; HEAD remains `35a051e088bc4738f6142e8c6c819cf25c56e59e` and the index is empty.
- `T007-M4-REVIEW`: a fresh independent reviewer recomputed the 19-path fingerprint, passed focused seven-file/54-test evidence, inspected scope, dependency, frozen blobs, marker/relevance state, and cross-milestone behavior, and returned `PASS` with no Blocker, Major, or Minor. FR-BE-005, SPEC-012, HS-013, AC-010, the Redis portion of NFR-003, and TASK-007's OR-008 contribution pass.
- `T007-M4-DOCS`: authoritative requirements, implementation status, operation guidance, system/specification/ADR annotations, execution chronology, review and plan indexes, and this living plan were reconciled. The plan was moved intact to `docs/plans/completed/`; documentation and ADR validators plus `git diff --check` form the final gate evidence.
- `T007-M4-TEARDOWN`: final exact-prefix SCAN for `character-app:test:t007-*`, PostgreSQL `task_004_*` catalog inspection, and ports 4173/4174 readback were empty. With every peer role terminal, the exact `rick-and-morty-dev` PostgreSQL and Redis containers stopped cleanly; their containers, network, and volumes remain preserved for later work.
- `T007-M5-REVIEW-REVISE`: later independent review returned `REVISE` with one Major aggregate-unit reproducibility finding and one Minor historical runtime-ownership wording finding. The primary independently reproduced root `npm run test:unit` at 137/139 on clean commit `62ddf56`; both first Redis tests exceeded five seconds, while unchanged focused evidence passed 12/12 in 354 ms. Fresh real-infrastructure review was blocked because the preserved Compose containers were stopped. The original acceptance review remains historical evidence.
- `T007-M6-PREFLIGHT`: `REGRESSION`; hosted run `32391250007` passed unit 139/139 but failed integration 72/74 because `jobs.validate.env` omitted the explicit namespace required by both frozen Redis integration scenarios. The existing workflow contract was the smallest relevant Red boundary; an exact unique entry plus validate-job position check was necessary to prove inherited scope.
- `T007-M6-RED`: lease `TASK-007-20260820-03-M6-red-01` closed compliant at receipt `205c1a80e0ae7d3cf5c07d03bfafb4640aa178b222732a9818046f0637582c1d`, changing only the workflow-contract test to blob `790c14f8906bec746ab7721ef172525c62b40416`. Focused evidence passed the inherited TASK-004 scenario and failed the new TASK-007 scenario only on `TASK_007_CI_REDIS_NAMESPACE_INVALID cases=redis-namespace-job-scope`; the workflow and both integration tests remained frozen.
- `T007-M6-GREEN`: lease `TASK-007-20260820-03-M6-green-01` closed compliant at receipt `5e5c0bab14720d24d87c386f8d5ed1bbfefdad1a02e1b00e645af34fde8b0132`, changing only `.github/workflows/ci.yml` to blob `11cbaf9b7884756baabe5bb591fb86a76fcab3fc`. It added one exact `jobs.validate.env` entry and made the focused contract pass one file/two tests with frozen Red and integration blobs; no Refactor occurred.
- `T007-M6-JOIN`: root typecheck passed and the exact two-file real-Redis focus passed two files/three tests against namespace `character-app:test:t007-m6-local-20260820`, Redis container `de49530cc584` on port 56400, and PostgreSQL container `8e002c0318ad` on port 55432. Exact-prefix SCAN and `git diff --check` passed; the task-started containers stopped cleanly with their volumes preserved. At this recorded barrier, fresh S1 review and hosted candidate evidence were still pending; both subsequently passed below.
- `T007-M6-REVIEW`: fresh S1 review returned `PASS` with no Blocker, Major, or Minor. The reviewer independently reproduced focused workflow validation at one file/two tests and confirmed exact expression syntax, validate-job scope, grammar/length/isolation, unchanged workflow boundaries, test relevance, strict integration-test preservation, compliant leases, proportional evidence, and truthful hosted-risk status. This accepted the local candidate; the subsequent `T007-M6-HOSTED` and `T007-M6-INTEGRATED-REVIEW` records close the then-pending external gates.
- `T007-M6-HOSTED`: PR #15 merged correction head `13cad84334004ea7eeb76c11597d66e9cce2f48f` to `main` as `4663a66c17d39b9aa6da2db6f2bf169691edb587`, tree `a3943579fc71474f0675340d142c0c73bba3a193`. Hosted run `32396138822`, job `96513285732`, resolved namespace `character-app:test:ci-32396138822-1` and passed unit 140/140, integration 74/74, application 13/13, Chromium 1/1, lifecycle 6/6, and unconditional teardown of both containers, volumes, and network.
- `T007-M6-INTEGRATED-REVIEW`: fresh task-scope re-review returned `PASS` with no Blocker, Major, or Minor after exact merged-tree, executable-scope, namespace, frozen-test, lease, hosted-run, product-evidence, closure-eligibility, and readiness checks. TASK-007 is eligible for and receives authoritative closure through the primary-owned documentation gate.
- External state at pause: after all owned namespaces scanned empty, `docker compose -p rick-and-morty-dev stop` stopped PostgreSQL `postgres:18.6-alpine` and Redis `redis:8.8.1-alpine` with exit code 0. `ps --all` shows both containers exited normally; their containers, network, and volumes were preserved for resume.

Retain only concise accepted evidence here during execution: assignment IDs, lease IDs and receipt digests, focused Red/Green outcomes, milestone joins, reviewer verdicts, external-state identities, cleanup results, and final candidate fingerprint. Do not copy full packets, transcripts, ignored lease state, or normative ADR prose.


## Interfaces and Dependencies


The implementation is expected to establish these narrow interfaces; exact TypeScript names may change during Green only when the observable contract and path scope remain unchanged:

- `buildCharacterSearchCacheKey(namespace, normalizedFilter) -> string`: fixed-order stable UTF-8 JSON plus SHA-256 and the `characters:search:v1` prefix;
- `encodeCharacterSummaries(value) -> string` and `decodeCharacterSummaries(raw) -> readonly CharacterSummary[] | null`: exact field validation, including the governed URL, with no coercion or extra fields;
- `CharacterSearchCache.read(filter)`, `CharacterSearchCache.write(filter, summaries)`, and malformed-key unlink behavior at the application/infrastructure boundary;
- `CharacterSearchInvalidator.invalidateAll()` for iterative scoped SCAN/UNLINK only;
- `RedisRuntimeConfig` loaded from `REDIS_PORT`, `REDIS_NAMESPACE`, `REDIS_SEARCH_TTL_SECONDS`, and `REDIS_OPERATION_TIMEOUT_MS`, with fixed host `127.0.0.1` and the exact validation domains in the Decision Log;
- one injected stderr warning sink that receives only the six stable codes in the Decision Log rather than raw Redis errors;
- one process-owned lazy `@redis/client@6.2.0` connection for API search operations and one short-lived owned connection in the separate import CLI process;
- the existing `CharacterReadRepository` remains the PostgreSQL authority and the existing import invalidation request remains the post-commit join.

No shared-package type, public GraphQL field, REST route, migration, database column, or browser interface is added.


## Revision Note


2026-08-18: Created and registered the initial TASK-007 ExecPlan. It preserves the canonical `Pending` state, defines three bounded milestone-slice cycles, chooses the single base Redis client dependency and existing harness/Compose boundaries, explicitly excludes unrelated cache/platform capabilities, and links the non-blocking warning-deduplication idea to Low-priority DPL-DEC-046 instead of widening MVP.

2026-08-19: Activated the owner-authorized ExecPlan after confirming TASK-005 and TASK-006 completion, DG-006 resolution, AUTH-001 continuity, the clean current branch and worktree, and absence of an installed Redis client. The coordinator retained the already-selected branch per the owner's latest instruction and synchronized task status, current status, plan navigation, chronology, and all living sections without adding Redis behavior or acceptance evidence.

2026-08-20: Completed three milestone-slice implementations, two reviewer-directed correction cycles, full integrated validation, fresh independent `PASS`, exact cleanup, and authoritative documentation reconciliation. Marked TASK-007, SPEC-012, HS-013, AC-010, and NFR-003 passing; advanced readiness to 5/12; retained DPL-DEC-046 as Low; and moved this plan intact to the completed-plan archive.

2026-08-20: Reopened TASK-007 after a later independent review and primary reproduction proved the cold aggregate unit gate fails 137/139 because two Red-era dynamic imports remain inside timed test bodies. Preserved the original review and product acceptance evidence, moved this plan back to active, added bounded Milestone 5 with test-only ownership and no production Green, and withheld task closure pending fresh complete validation and re-review.

2026-08-20: Completed Milestone 5 under independent `REGRESSION` preflight and one compliant two-test evidence lease. Replaced only timed dynamic imports with file-scope static named imports, passed focused 12/12, two cold aggregate runs at 139/139, root typecheck/build, integration 74/74, application 13/13, Chromium 1/1, lifecycle 6/6, exact cleanup, fresh S1 review, and fresh integrated `PASS`. Corrected current PostgreSQL-versus-Redis ownership wording while preserving historical records, restored TASK-007 to `Complete`, kept readiness at 5/12, and returned the plan to the completed archive.

2026-08-20: Reopened TASK-007 after pushed commit `0e56e1f` failed hosted pull-request run `32391250007` at integration 72/74. The CI job exported only `REDIS_PORT`; both strict real-Redis tests rejected the absent explicit namespace. Added bounded Milestone 6 for one run-isolated workflow environment entry and its existing workflow-contract test, preserving product behavior and withholding closure until a corrected hosted run passes.

2026-08-20: Completed Milestone 6 after PR #15 merged the bounded correction to `main` at `4663a66c17d39b9aa6da2db6f2bf169691edb587`. Exact hosted run `32396138822` passed the full workflow with unit 140/140, integration 74/74, application 13/13, Chromium 1/1, lifecycle 6/6, and unconditional infrastructure teardown. Fresh integrated re-review returned `PASS` with no finding; authoritative documentation reconciliation restored TASK-007 to `Complete`, kept readiness at 5/12, preserved every earlier review, and returned this plan to the completed archive.
