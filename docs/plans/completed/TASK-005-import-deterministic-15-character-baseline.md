# Import TASK-005 Deterministic 15-Character Baseline


This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.


## Purpose / Big Picture


This is ExecPlan 005 for TASK-005, Import the deterministic 15-character baseline. After separate project-owner execution authorization, a reviewer will be able to migrate an empty PostgreSQL database, run one explicit character-import command, and observe exactly the upstream character IDs 1 through 15 stored with their validated source-owned fields and exact avatar URLs. Repeating the command will retain the same 15 baseline rows without resetting favorites, modifying comments, or creating duplicates.

The importer is the only planned route for upstream character JSON to enter the application database. It will fetch and validate the complete fixed batch before opening one publication transaction, then request best-effort search-cache invalidation only after the commit. Automated tests will use version-controlled payload fixtures and injected transport behavior; they must never contact the live public API.

This plan is planning intent, not implementation evidence. At registration, TASK-004, TASK-006, and TASK-017 are Complete, but TASK-005 is Pending. The repository contains the migrated character/comment schema and read-only database composition, but no importer, import command, upstream client, 15-record fixture, write repository, or import-specific automated test. Registering this plan does not authorize implementation, change TASK-005 to In progress, or advance AC-009.


## Progress


- [x] (2026-08-18 00:30Z) Read the documentation map, TASK-005 record, requirements, accepted ADRs, routed specifications, current source and manifests, ExecPlan convention, and worker-first implementation workflow at clean baseline HEAD 6c817a5c9b63c1b3cde83d98b0f6d104de855ddd.
- [x] (2026-08-18 00:30Z) Created and registered ExecPlan 005 while preserving TASK-005 as Pending; no production source, executable test, dependency, configuration, migration, external service, task state, gate state, or acceptance state changed.
- [x] (2026-08-18 00:30Z) Reconciled the implementation-plan prose so TASK-007 remains blocked by TASK-005, as already required by the canonical graph and dependency table.
- [x] (2026-08-18 00:30Z) Reused the canonical technical-debt register, aligned it with High/Mid/Low priorities and ExecPlan provenance, and found no new TASK-005 debt item.
- [x] (2026-08-18 00:30Z) Registration documentation validation passed for 56 Markdown files, 41 requirement IDs, 1 authorization, 18 tasks, 17 SPEC rules, 20 HS rules, and 123 scenarios; ADR validation passed for 16 ADRs and 38 requirements with the established NFR-006 warning; git diff --check passed.
- [x] (2026-08-18 00:32Z) Fresh independent registration review returned PASS with no Blocker, Major, or Minor after confirming the UTC chronology, task/gate traceability, KISS boundaries, technical-debt provenance, TASK-007 dependency correction, and Milestone 3 test-relevance gate.
- [x] (2026-08-18 01:29Z) Received the separate project-owner execution authorization, created branch `codex/task-005-deterministic-import`, preserved and validated the three registration changes, and committed that clean baseline as `4792c8da63894401dbbb7910f6397594f6c690df` before activation.
- [x] (2026-08-18 01:32Z) Validated the coordinator-owned TASK-005 `Pending` to `In progress` transition across the implementation plan, plan index, root current status, append-only execution log, and this living plan. Documentation validation passed for 56 Markdown files, 41 requirement IDs, 1 authorization, 18 tasks, 17 SPEC rules, 20 HS rules, and 123 scenarios; ADR validation passed for 16 ADRs and 38 requirements with the established NFR-006 warning; the 26-check lease-guard self-test and `git diff --check` passed.
- [x] (2026-08-18 01:45Z) Accepted Milestone 1 read-only preflight evidence `M1-PREFLIGHT-005-20260818-01` as `MISSING`. Static source, test, composition, persistence, configuration, and manifest inspection found no importer or upstream boundary under any alternate path. The minimum coherent Red owns only the two planned unit-test files with inline deterministic builders and the plan's exact focused command; no fixture directory is required.
- [x] (2026-08-18 02:12Z) Accepted and froze the corrected Milestone 1 Red. Initial lease `TASK-005-20260818-01-M1-red-02` closed compliant at receipt `54f214d8cc74fca1478233db9fa4b7e8eaad64835a409b2568ff24c500b98cd3`; attempt-2 lease `TASK-005-20260818-01-M1-red-03` closed compliant at receipt `3f0945089bcf129f3ce0ba7a711025cde73ab42b40cacc918912b4cc03580816`. The exact focused run discovered 38 tests and exited 1 solely because the two planned production modules are absent. Frozen test SHA-256 values are `5BC538BA224B376D66CBDB559EEB4BDED064A02690C38B18D4FB4562B2962EFE` and `BE93FA510433CD7C69896BA4A5BFD89F07BF0203C70CBCA56AF0E5CA79E7EC0D`; both contain zero CRLF pairs and no focused, skipped, placeholder, or snapshot state.
- [x] (2026-08-18 02:20Z) Accepted the Milestone 1 Green handoff. Lease `TASK-005-20260818-01-M1-green-01` closed compliant at receipt `7d660d10626af79060cc3a0179e28a1d097cb07e73b2bbafe90d6493e6f22506`, creating only `character-import-service.ts` and `rick-and-morty-character-client.ts`; both frozen test hashes remained exact. The focused command passed 2 files and 38 tests. No Refactor, dependency, configuration, live request, generated artifact, or external state was introduced.
- [x] (2026-08-18 02:22Z) Passed the Milestone 1 affected join: the API unit project passed 22 files and 97 tests, and root strict typecheck passed all tool, web, API, and shared projects. The test-relevance audit retains both new files because one owns the application complete-batch/publication boundary and the other owns the injected transport/timeout/retry boundary; inline builders remain local, and no duplicate, abandoned-detail, focused, skipped, placeholder, snapshot, or live-network test was found. Current four-path source/test fingerprint is `A79C18AA32CDFAF3F1CC2BF7A08B373D0B755E6685AEB963F73E2ECB1035D63B`.
- [x] (2026-08-18 02:40Z) Closed Milestone 1 review. Fresh S2 evidence `M1-REVIEW-005-20260818-01` returned `PASS WITH FOLLOW-UPS` with no Blocker or Major and one documentation-only Minor; the exact current-status correction passed both documentation validators and `git diff --check`, preserved aggregate fingerprint `A79C18AA32CDFAF3F1CC2BF7A08B373D0B755E6685AEB963F73E2ECB1035D63B`, and the same read-only reviewer returned bounded `PASS` with no remaining finding.
- [x] (2026-08-18 02:40Z) Completed and accepted Milestone 1 preflight and its frozen Red-Green-Refactor cycle for deterministic batch retrieval and validation. The persistent test owner, persistent implementation owner, and fresh reviewer are retired from subsequent milestones.
- [x] (2026-08-18 02:42Z) Accepted fresh Milestone 2 read-only preflight evidence `M2-PREFLIGHT-005-20260818-01` as `MISSING` on relevant-tree fingerprint `6B6220859AF54B44B9F28C60B217E5133A17710C20E50EEE720A5A5D0FC2FF4C`. Exhaustive source/test inspection found only the M1 publication port, model definitions, read-only repository, and migration-specific transactions. The minimum coherent Red owns exactly `sequelize-character-import-repository.integration.test.ts` with three real-PostgreSQL scenarios for exact/idempotent bound publication, source-field refresh with favorite/comment preservation, and trigger-induced rollback plus owned-database residue readback. Existing lifecycle and test-local Sequelize construction suffice; no shared helper is justified.
- [x] (2026-08-18 02:46Z) Reconciled the first Milestone 2 Red run. Lease `TASK-005-20260818-01-M2-red-02` closed compliant at receipt `c98677c23a093ba8648a35e6f7b77842dcee679d48eea9e0842d934dc4354119`, creating only the planned integration test at SHA-256 `647B0944A9720F62261E6863680A63FDD929ADC4980F7F3E13B2DD7EAA34D786`; semantic inspection accepted its single cohesive three-phase contract, but the focused run was invalid because the documented defaults reached the unrelated local PostgreSQL listener on port 5432 and failed authentication before namespace creation. The coordinator started owned Compose project `rick-and-morty-task005` with healthy PostgreSQL 18.6 on free port 55432 and Redis on 56379.
- [x] (2026-08-18 02:49Z) Accepted and froze Milestone 2 Red evidence `M2-RED-005-20260818-01`. Attempt-2 lease `TASK-005-20260818-01-M2-red-03` closed compliant with no file change at receipt `38ee76cf1d22ca5ff2a16bc50e5784df2f56001d534f8a2ef7300c6d0fc6f07b`; the focused run discovered one test and exited 1 solely on `SEQUELIZE_CHARACTER_IMPORT_REPOSITORY_MISSING` caused by the absent sibling module after migration of database/schema `task_004_eb19daa7f6275348`. No fetch occurred, residue was exactly `before=[] after=[]`, and frozen test SHA-256 remained `647B0944A9720F62261E6863680A63FDD929ADC4980F7F3E13B2DD7EAA34D786`. The test-role correction budget is exhausted.
- [x] (2026-08-18 02:52Z) Accepted the minimum Milestone 2 Green handoff. Lease `TASK-005-20260818-01-M2-green-01` closed compliant at receipt `06e438acfe4b84e723e5e500d2ac05ee826ab8f69d39c6bf0382e291d6e1d233`, creating only `sequelize-character-import-repository.ts` at SHA-256 `9A46262B1995CEA20E0F27D03DC4E3F6D85A3E7677F969B14E98AA9C8BA8D3F5`. The frozen test hash remained exact; focused Green passed one file/test. The repository uses one explicit transaction and one bound bulk source-only upsert, with no application-owned field, comment, migration, helper, dependency, or configuration change. No Refactor occurred.
- [x] (2026-08-18 02:56Z) Passed the Milestone 2 join after isolating one validation-contention failure. The exact focused command passed 1/1; a console-visible run passed 1/1 in database/schema `task_004_d706915f42f07b63` with residue `before=[] after=[]`; root strict typecheck passed. The first affected-suite run passed 69/70 but its root migration-build child hit the established 10-second test bound while typecheck ran concurrently. That exact isolated case then passed 1/1 in 5.03 seconds without a change, and the full persistence project rerun alone passed 8 files/70 tests in 129.87 seconds. Final catalog readback found zero `task_004_<16 hex>` databases. Relevance and marker audit retains the single cohesive integration test and found no duplicate, abandoned-detail, focused, skipped, placeholder, snapshot, or live-network state. The sorted two-path `path SHA-256` manifest fingerprint is `D9532D4A6F5585AA7B9FC606DE688522FF1F62F22B9FFBEA74C4CF312791EDBF`. Fresh S3 critical review remains before milestone acceptance.
- [x] (2026-08-18 02:57Z) Reconciled fresh S3 review evidence `M2-REVIEW-005-20260818-01` as `REVISE`. The reviewer reproduced the exact 16-path fingerprint `EDCB2EF3E10377E09089CFF4E2893F924CB5037E366927ED3EC150F578CFA7D6`, focused PostgreSQL 1/1, root typecheck, transaction/rollback/state-preservation behavior, binding integrity, cleanup, and lease evidence, but found one Major: conflict refreshes omit the DPL-DEC-026 `updated_at` advancement obligation and the accepted test does not assert it. One current-status Minor was corrected without claiming M2 acceptance. The single authorized review-correction loop is open; its behavioral/test-contract remediation must use a fresh Red/Green cycle and the same S3 reviewer must confirm the corrected evidence.
- [x] (2026-08-18 02:59Z) Accepted and froze the reviewer-directed Milestone 2 Red. Lease `TASK-005-20260818-01-M2-review-red-01` closed compliant at receipt `1142452e5067998b3e4d4e2c65080fda9bb6d98129fc71e90acde171d995e37d`, modifying only the existing integration test to pin all 15 pre-refresh `updated_at` values to a fixed old instant, preserve all 15 `created_at` values, and require refresh advancement. Worker database/schema `task_004_7438df4099f29748` and primary reproduction database/schema `task_004_66454c229f758822` each discovered one test, exited 1 solely on the new timestamp assertion, and returned `before=[] after=[]`; every earlier transaction, binding, ownership, rollback, and no-live-network check passed. Frozen test SHA-256 is `E91AF0A31FF1565D5F12833D39067D22EB26FB5EA93C2E8C45DE43FEF57A9221`; production remains `9A46262B1995CEA20E0F27D03DC4E3F6D85A3E7677F969B14E98AA9C8BA8D3F5`. The review-correction test budget is exhausted; Green may change only the existing repository conflict-update behavior.
- [x] (2026-08-18 03:03Z) Joined the reviewer-corrected Milestone 2 Green candidate for bounded S3 re-review. Lease `TASK-005-20260818-01-M2-review-green-01` closed compliant at receipt `cb11fbceaac33d4121c2d4c14400cde958770dd63bca4d74c3ebec04dba0e002`, adding only `"updated_at" = CURRENT_TIMESTAMP` to the existing conflict clause. Frozen test SHA-256 remained `E91AF0A31FF1565D5F12833D39067D22EB26FB5EA93C2E8C45DE43FEF57A9221`; corrected source SHA-256 is `F5A805191B8489F8A7EF5BE52B21BBC3253F931F9D8393B6A0BCFB36827B31F5`; their sorted two-path fingerprint is `1BA25299ABD393DD5134A17C9B3FCDB4B89B6456F1ED64A2E2D1934CE61636C0`. Worker focused Green passed 1/1, primary exact focused Green passed 1/1, console-visible namespace `task_004_fcb4f95a0b0d717c` passed 1/1 with `before=[] after=[]`, root strict typecheck passed, and the standalone persistence project passed 8 files/70 tests in 125.62 seconds. Final container catalog readback found zero `task_004_<16 hex>` databases. No Refactor occurred; marker/relevance audit remains clean. The review-correction loop is consumed and the same critical reviewer must return an accepting verdict before M2 acceptance.
- [x] (2026-08-18 03:07Z) Accepted Milestone 2 after bounded S3 re-review returned `PASS` with no Blocker, Major, or Minor. The same critical reviewer independently reproduced exact 16-path identity `87178CCC1534B1499283AEA2BACB3F640606C14FE5A0434F3A37944F62D769EB`, corrected two-path identity `1BA25299ABD393DD5134A17C9B3FCDB4B89B6456F1ED64A2E2D1934CE61636C0`, focused PostgreSQL 1/1 in namespace `task_004_4bca225c05c9e552` with `before=[] after=[]`, root typecheck, validators, markers, and both compliant correction receipts. The prior Major and Minor are closed. Milestone 2 roles are retired; the explicit command, runtime import, task closure, and AC-009 remain pending.
- [x] Complete Milestone 2 preflight and the frozen Red-Green-Refactor plus single reviewer-correction cycle for transactional source-owned persistence and interaction preservation.
- [x] (2026-08-18 03:17Z) Accepted fresh Milestone 3 read-only preflight evidence `M3-PREFLIGHT-005-20260818-01` as `MISSING`. Relevant source, test, build, manifest, CLI, and composition inspection plus a 3-file/39-test unit check found no explicit import command, invalidation requester, command test, or import runtime composition. One coherent Red will own `character-import-cli.application.test.ts` and `character-import-cli.integration.test.ts`: injected application cases prove zero-argument lifecycle, safe results, commit-before-invalidation ordering, fail-open invalidation, and resource closure; the real-PostgreSQL case proves the actual composed service/client/repository against a run-owned migrated namespace with injected upstream data and exact cleanup. The coordinator resolved invalidation ownership to CLI orchestration after `importBaseline()` returns, preserving accepted M1 files, and authorized only a focused `postgres-runtime.ts` extraction plus behavior-preserving `server.ts` consumption for a future Green because the second runtime consumer makes the current private duplication real.
- [x] (2026-08-18 03:25Z) Withheld the initial Milestone 3 Red and authorized the one same-contract test-role correction. Lease `TASK-005-20260818-01-M3-red-01` closed compliant at receipt `cafb36ffe18033d85b716e505781156ec8e7e770d8de3bbaa934cf90604a53e8`, creating only the two planned tests at SHA-256 `9C404C64DE3AAC9E9990D16A1517F6B54E30A8DE2CE8A3C21F927E6F44EB025A` and `732F1A222E22DF62B77DF46E5DD8F016AF2BA4C5FAFC5F33CFA82E1C6D7B7917`. Worker and primary focused runs each discovered both suites and exited 1 solely on the absent CLI module before namespace allocation; root typecheck passed. Semantic inspection found that the real-PostgreSQL case proves successful commit-before-invalidation and closure but does not yet prove the milestone's explicit failure boundary: a rejected post-commit invalidation request must leave the newly committed database update intact. Attempt 2 may change only the integration test to add that real-boundary assertion while preserving the objective, authorities, paths, command, diagnostics, and expected missing-module Red.
- [x] (2026-08-18 03:29Z) Accepted and froze corrected Milestone 3 Red evidence `M3-RED-005-20260818-02`. Attempt-2 lease `TASK-005-20260818-01-M3-red-03` closed compliant at receipt `e1dbb222937209badace92211198345fafbfbacce5c3f914b2c74605cc277102`, modifying only the integration test. It now retains the successful visible-commit case and adds a distinguishable refresh whose invalidation callback observes `Refreshed Character 1`, rejects, and then requires result 0, exact safe warning, persisted refreshed value, zero owned backends, and exact lifecycle cleanup. Worker and primary focused runs each found both suites and exited 1 solely on `TASK_005_CHARACTER_IMPORT_CLI_MISSING` before namespace allocation; primary root typecheck passed. Frozen SHA-256 values are `9C404C64DE3AAC9E9990D16A1517F6B54E30A8DE2CE8A3C21F927E6F44EB025A` and `148F618682CB22C9193754AF9FDAC3B19DB305A762EE2FEE32435C9F5FB4A646`, both LF-only. The test-role correction budget is exhausted; Green must preserve these exact bytes.
- [x] (2026-08-18 03:40Z) Joined the Milestone 3 Green candidate for fresh S2 review. Lease `TASK-005-20260818-01-M3-green-01` closed compliant at receipt `78b6576333f20b12a5096348893fa294be378c667a9aa5dfe67b8e7516474e36`, touching exactly the CLI, focused PostgreSQL helper, behavior-preserving server consumer, and two manifests. Frozen test hashes remained exact. Worker and primary focused PostgreSQL runs each passed 2 files/5 tests; primary root typecheck and API build passed; the compiled emitted CLI returned 1 with exact `CHARACTER_IMPORT_COMMAND_INVALID` for a deliberate extra argument; the affected application project passed 4 files/11 tests; the standalone persistence project passed 9 files/71 tests in 127.88 seconds; and final container catalog readback found zero owned databases. The initial worker typecheck/build exposed only a Sequelize overload mismatch at the accepted M2 port, resolved within the same Green by a narrow local adapter before all final gates passed. No Refactor, dependency, lockfile, Redis call, live upstream request, migration, server startup, or scheduler change occurred. Fresh S2 review remains before milestone acceptance.
- [x] (2026-08-18 03:51Z) Accepted Milestone 3 after fresh S2 review returned `PASS` with no Blocker, Major, or Minor. The reviewer independently reproduced the exact 18-path candidate identity `64878A1F90E598C3951A0532104F4762F7F422B0F0E4738C40C2C4ACA3B0EABF`, focused PostgreSQL 2 files/5 tests, empty owned-database catalog, emitted invalid-argument exit 1 and stable diagnostic, validators, diff integrity, frozen test hashes, TDD/lease separation, import-time isolation, commit-before-invalidation semantics, close ownership, server-equivalent PostgreSQL extraction, negative scope, and honest current status. Milestone 3 roles are retired. Full final validation, integrated acceptance review, documentation closure, task status, and AC-009 remain pending for Milestone 4.
- [x] Complete Milestone 3 preflight and the corrected frozen Red-Green-Refactor cycle for the explicit CLI and post-commit invalidation request.
- [x] (2026-08-18 03:58Z) Reached a safe project-owner-requested pause during Milestone 4. Final root typecheck and build passed. The ordered `npm test` run passed unit 23 files/98 tests, PostgreSQL integration 9 files/71 tests, and application 5 files/12 tests; Chromium started the built web/API processes and began its one walking-skeleton test, but the command did not return from the smoke phase and was interrupted for the requested pause before a final Playwright result was emitted. This is incomplete closure evidence, not a test pass or a product failure. After interruption, ports 4173/4174 had no listeners, the owned-database catalog was empty, the Git index remained empty, and dedicated Compose services remained healthy. Resume with a focused smoke/lifecycle diagnostic, then rerun the full authoritative gate only after that prerequisite is understood.
- [x] (2026-08-18 13:25Z) Resumed Milestone 4 and isolated the prior smoke teardown symptom to restricted Windows process control. The first unchanged `npm run test:smoke:lifecycle` run reported 0/6 only because the sandbox denied termination of its owned child PID and the occupied ports cascaded into later cases; afterward, no repository-owned Node process or listener remained. The unchanged gate rerun with child-process control passed all 6/6 lifecycle cases.
- [x] (2026-08-18 13:25Z) Restored the isolated external-state prerequisite after Docker Desktop had stopped. Project `rick-and-morty-task005` reused healthy PostgreSQL 18.6 at `127.0.0.1:55432`; Windows had newly excluded TCP range 56294-56393, so Redis could not rebind former port 56379 and was recreated within the same project at free port 56400. Both services were healthy before validation; TASK-005 made no Redis request.
- [x] (2026-08-18 13:25Z) Passed the fresh complete closure candidate gate: root typecheck, root build, and ordered `npm test` all exited 0; unit passed 23 files/98 tests, real-PostgreSQL integration passed 9 files/71 tests, application passed 5 files/12 tests, and Chromium smoke passed 1/1 in 7.9 seconds. Final checks found no listener on ports 4173/4174, no `task_004_<16 hex>` database, an empty Git index, and a clean `git diff --check`. Integrated independent review and documentation closure remain before TASK-005 and AC-009 completion.
- [x] (2026-08-18 13:44Z) Completed Milestone 4. Fresh independent integrated review reproduced exact 18-path fingerprint `B008819D8736BF92AF8870BB5A6CAB18BB55CAF3BE81C0D7F23E430DE0210780` and returned `PASS` with no Blocker, Major, or Minor. The primary marked TASK-005 and AC-009 complete, recorded SPEC-010 and HS-012 as passing plus the bounded SPEC-011 contribution, updated current readiness to 4/12, added and indexed the dated review, reconciled current architecture annotations, repaired completed-plan links, appended chronology, and moved this plan to completed history. Documentation validation passed for 57 Markdown files and 123 scenarios; ADR validation passed for 16 ADRs and 38 requirements with only the established NFR-006 warning; `git diff --check` passed. No product/test byte changed after review.
- [x] (2026-08-18 13:48Z) Completed final external-state cleanup. A last catalog query returned no owned `task_004_<16 hex>` database; `docker compose -p rick-and-morty-task005 down --volumes` removed only the task's PostgreSQL/Redis containers, data volumes, and network. Post-teardown project status was empty, and ports 4173, 4174, 55432, and 56400 had no listeners.


## Surprises & Discoveries


- Observation: The existing migration and Sequelize model already expose every source-owned character column needed for this task, including image_url. The current runtime repository is SELECT-only, so import persistence needs a focused write boundary rather than a migration or a broad read-repository rewrite.
  Evidence: apps/api/src/infrastructure/database/migrations/20260814000000-create-relational-schema.ts, apps/api/src/infrastructure/database/sequelize-persistence.ts, and apps/api/src/infrastructure/database/sequelize-character-read-repository.ts.

- Observation: Native Node fetch is available under the documented Node 24.18.0 target. No HTTP client, SDK, queue, scheduler, or generic retry framework is needed for the fixed 15-request operation.
  Evidence: root package.json engine range and the current dependency manifests.

- Observation: The canonical graph and task table require TASK-005 before TASK-007, while one nearby prose sentence previously implied that TASK-007 could start immediately. The graph and table were preserved and the prose was corrected.
  Evidence: docs/IMPLEMENTATION_PLAN.md, Canonical task graph and Task status and dependency index.

- Observation: A repeated integration-test bootstrap pattern is not, by itself, a justified shared test-infrastructure abstraction. It remains local unless a later requirement, recurring defect, or fourth demonstrated consumer establishes present value.
  Evidence: current import-related source absence and the repository KISS/YAGNI policy.

- Observation: Milestone 1's complete validation and injected-network contract can be expressed with local typed fixture builders in exactly two unit-test files; a separate fixture directory would add no present reuse or confidence.
  Evidence: read-only test-owner preflight `M1-PREFLIGHT-005-20260818-01` and the complete current API source/test inventory.

- Observation: Milestone 2 can reuse the accepted PostgreSQL namespace lifecycle and test-local Sequelize construction without extracting a shared connection helper; its absent write boundary can be proven by one cohesive integration-test file.
  Evidence: read-only test-owner preflight `M2-PREFLIGHT-005-20260818-01`, `postgres-lifecycle.ts`, `sequelize-persistence.integration.test.ts`, and exhaustive import/upsert/transaction searches.

- Observation: Host port 5432 remains owned by the unrelated local PostgreSQL process already recorded by TASK-003, so TASK-005's documented default credentials cannot authenticate there and must not be treated as repository test infrastructure.
  Evidence: the first Milestone 2 focused run failed authentication before namespace creation; dedicated Compose project `rick-and-morty-task005` is healthy on the previously free ports 55432 and 56379.

- Observation: Running root typecheck concurrently with the persistence project's root migration-build subprocess can consume that pre-existing test's fixed 10-second child bound; the same case passes in 5.03 seconds alone and the complete project passes when run without concurrent build/type work.
  Evidence: first affected run 69/70 with only the root build child timeout, isolated case 1/1, and standalone affected rerun 70/70 with no repository change.

- Observation: A source-field conflict refresh is an application write and therefore must advance `updated_at`; preserving application-owned interactions does not permit stale write metadata.
  Evidence: DPL-DEC-026, the accepted Sequelize timestamp mapping, and fresh critical review `M2-REVIEW-005-20260818-01` of the initial Milestone 2 candidate.

- Observation: The existing API server privately owns the closed PostgreSQL runtime configuration and Sequelize construction, while importing `server.ts` would start Express at module evaluation.
  Evidence: fresh read-only Milestone 3 preflight `M3-PREFLIGHT-005-20260818-01`, `server.ts`, `runtime-composition.ts`, and the absent import command/composition paths.

- Observation: Sequelize's public query and transaction overloads are wider than the deliberately narrow accepted M2 repository port even though the runtime operations are compatible.
  Evidence: the first Milestone 3 Green typecheck/build failed only at the composition assignment; a local adapter preserves the repository port, forwards bound values and the owned transaction, and passes the final focused, type, build, application, and persistence gates.

- Observation: The first task-closure `npm test` run reached the Chromium test after every Vitest scope passed but did not return from the smoke phase before the project owner requested a safe pause.
  Evidence: the run passed 98 unit, 71 persistence-integration, and 12 application tests; Playwright started healthy built web/API servers and displayed the sole test start without a terminal result. Coordinator interruption removed both listeners, and post-interruption PostgreSQL catalog readback was empty. Treat the smoke result and the aggregate root run as incomplete until a focused lifecycle diagnostic and fresh complete run finish.

- Observation: The apparent smoke hang reproduced only inside the restricted process-control boundary: Windows denied the lifecycle harness permission to terminate its own child, while the unchanged elevated harness passed every normal and adversarial cleanup case.
  Evidence: the restricted lifecycle run returned 0/6 with `Access denied` termination diagnostics and occupied-port cascades; the unchanged rerun with owned-child process control returned 6/6, and the subsequent authoritative root smoke returned 1/1 with both ports released.

- Observation: Docker Desktop restart changed Windows' dynamic excluded-port ranges, making the previously usable Redis host port 56379 unavailable without any repository or Compose change.
  Evidence: `netsh interface ipv4 show excludedportrange protocol=tcp` reported 56294-56393; the same isolated project recreated Redis successfully on free port 56400 and both services reported healthy. TASK-005 did not contact Redis.


## Decision Log


- Decision: Treat “ExecPlan 005” as the missing active plan for canonical TASK-005.
  Rationale: TASK-005 is the next unplanned ready-by-prerequisite M2 node, and its title is the deterministic 15-character baseline import.
  Date/Author: 2026-08-17 / Codex primary coordinator.

- Decision: Keep the importer as a separate explicit command after migrations, not as a seed migration, API-startup behavior, first-request behavior, or scheduler.
  Rationale: ADR-0008 selects this boundary, and using the migration lifecycle for networked data would expand the authenticated migration artifact without a requirement.
  Date/Author: 2026-08-17 / Codex primary coordinator.

- Decision: Use strict raw-string avatar validation and a minimal post-commit invalidation port; defer Redis implementation to TASK-007.
  Rationale: ADR-0014 requires byte-exact Character.image association, while ADR-0007 assigns the actual Redis cache-aside boundary to the later cache task.
  Date/Author: 2026-08-17 / Codex primary coordinator.

- Decision: Do not add a new TASK-005 technical-debt item at registration.
  Rationale: The deferred scheduler is already optional scope, the isolated integration setup does not yet justify an abstraction, and no non-blocking defect or present future-work obligation was discovered.
  Date/Author: 2026-08-17 / Codex primary coordinator.

- Decision: Activate TASK-005 under the owner's separate execution authorization and begin with Milestone 1 only after the five-owner status transition validates.
  Rationale: The user explicitly authorized complete ExecPlan 005 execution, TASK-004 and TASK-017 remain Complete, DG-006 remains Resolved, AUTH-001 remains Authorized within its unchanged boundary, and the transition validators passed without creating implementation evidence.
  Date/Author: 2026-08-18 / Codex primary coordinator.

- Decision: Accept Milestone 1 as `MISSING` and issue one two-file aggregate Red without a fixture directory.
  Rationale: The test owner corroborated source absence through complete application, infrastructure, composition, persistence, configuration, manifest, and test inspection. Both tests prove the same retrieval-and-complete-batch-validation outcome, while inline builders keep the Red deterministic and within the original path projection.
  Date/Author: 2026-08-18 / Codex primary coordinator.

- Decision: Withhold the first Milestone 1 Red and use the one permitted same-contract test-role correction.
  Rationale: The lease and intended missing-module failure were compliant, but ADR-0014 explicitly requires rejection fixtures for every hostile URL serialization and complete runtime validation of the source-owned projection, while a supplied AbortSignal alone does not prove a finite timeout. The correction keeps the objective, authorities, paths, command, risk, and expected failure unchanged.
  Date/Author: 2026-08-18 / Codex primary coordinator.

- Decision: Accept Milestone 2 as `MISSING` and issue one aggregate real-PostgreSQL Red in the planned integration-test path without a shared helper.
  Rationale: No equivalent import write repository or coverage exists. Exact first/repeated publication, application-owned-state preservation, and deterministic mid-publication rollback are one atomicity/ownership outcome; the existing run-owned namespace lifecycle supports them without changing accepted migration or runtime boundaries.
  Date/Author: 2026-08-18 / Codex primary coordinator.

- Decision: Reject the first Milestone 2 focused run as Red evidence and rerun the unchanged test through the owned Compose PostgreSQL port under the one permitted attempt-2 test turn.
  Rationale: Authentication failed against the unrelated listener before any write-capable test step, so no namespace or product failure was observed. An owned healthy PostgreSQL 18.6 container on port 55432 restores the packet's isolated external-state identity without changing the test contract, paths, or product scope.
  Date/Author: 2026-08-18 / Codex primary coordinator.

- Decision: Treat the first affected-suite root-build timeout as invalid concurrent validation and require one isolated case plus one standalone full-suite rerun before review.
  Rationale: The timed-out child passed in 5.03 seconds immediately without a source, test, database, or environment change, and the full 70-test project then passed alone. This preserves the existing 10-second test contract and avoids widening TASK-005 to unrelated timing configuration.
  Date/Author: 2026-08-18 / Codex primary coordinator.

- Decision: Reject the initial Milestone 2 candidate and consume the single review-correction loop through a fresh behavioral Red/Green cycle.
  Rationale: The S3 Major is a current-authority correctness gap: DPL-DEC-026 requires application writes to advance `updated_at`, while the conflict clause and accepted test omit that outcome. Reviewer-directed behavioral/test-contract remediation starts a fresh cycle rather than reusing the original cycle's exhausted test attempt; it remains limited to the existing M2 test and repository paths and preserves separate persistent test/code ownership.
  Date/Author: 2026-08-18 / Codex primary coordinator.

- Decision: Keep best-effort invalidation in Milestone 3 CLI orchestration after the accepted import service resolves, and permit one exact PostgreSQL runtime helper extraction with a behavior-preserving server consumer edit during Green.
  Rationale: The accepted repository promise resolves only after transaction commit, so the CLI can request invalidation strictly afterward without reopening accepted M1 source/tests. A second real runtime consumer makes the server's private closed configuration and Sequelize construction a present duplication; extracting only that boundary avoids importing the side-effectful server, a generic container, or a divergent second configuration parser.
  Date/Author: 2026-08-18 / Codex primary coordinator.

- Decision: Withhold the initial Milestone 3 Red and consume the one same-contract test-role correction for real persistence evidence after invalidation failure.
  Rationale: The application double proves control-flow order and fail-open reporting, while the initial PostgreSQL scenario proves only successful invalidation. The milestone contract specifically says an invalidation failure cannot undo a committed update, so the real boundary must observe persisted imported data after an injected rejection before the tests are frozen for Green.
  Date/Author: 2026-08-18 / Codex primary coordinator.

- Decision: Treat the restricted lifecycle result as invalid environment evidence and rerun the unchanged command with permission to control only its owned child processes; move the isolated Redis binding from 56379 to 56400 after proving the former port is OS-excluded.
  Rationale: Every reported lifecycle case derived from the same denied cleanup operation rather than an application assertion, and no repository-owned process remained afterward. The Windows exclusion made the old port impossible to bind, while the exact Compose project, image, service, and no-Redis-contact task boundary remain unchanged.
  Date/Author: 2026-08-18 / Codex primary coordinator.


## Outcomes & Retrospective


Registration outcome: the repository gained a task-scoped, MVP-only execution path for TASK-005 and a discoverable active-plan entry without starting implementation or advancing acceptance.

Activation outcome: the project owner separately authorized complete execution on 2026-08-18. The coordinator preserved and committed the registration baseline, changed TASK-005 to `In progress`, and retained AC-009 as pending.

Milestone 1 outcome: the deterministic upstream retrieval and complete-batch validation slice is accepted. Corrected aggregate Red, minimum two-file Green, affected API unit scope, root typecheck, frozen identities, lease receipts, no-live-network boundary, test-relevance audit, fresh S2 review, and bounded documentation confirmation all pass. The Milestone 1 test owner, implementation owner, and reviewer are retired.

Milestone 2 outcome: accepted. Fresh read-only preflight, corrected one-file real-PostgreSQL Red, minimum one-file Green, focused runtime evidence, root typecheck, standalone affected persistence project, exact identities, zero-residue readback, and test-relevance audit passed for the initial candidate. Fresh S3 review returned `REVISE` because conflict refreshes and their test omitted required `updated_at` advancement. The single reviewer-directed Red/Green loop added deterministic timestamp evidence and one conflict-clause assignment; focused and affected boundaries passed with unchanged creation/interaction state and zero residue. Bounded S3 re-review then returned `PASS` with no finding and closed the prior Major/Minor.

Milestone 3 outcome: accepted. The fresh read-only preflight, corrected aggregate Red, minimum five-path Green, proportional join, and fresh S2 review pass. The frozen application test covers explicit zero-argument command lifecycle, safe failure results, post-commit best-effort invalidation, closure, no import-time work, and exact scripts; the frozen real-PostgreSQL test covers actual composition, visible commit ordering, persisted refresh after invalidation rejection, pool closure, and owned-namespace cleanup. Focused and affected runtime gates, typecheck, API build, compiled entry, test-relevance audit, exact identities, and final zero-residue readbacks pass.

Milestone 4 outcome: accepted and closed. After the project-owner-requested safe pause, the focused lifecycle diagnostic proved the earlier symptom was restricted Windows child-process cleanup, and its unchanged rerun passed 6/6. Fresh root typecheck, build, unit 98/98, PostgreSQL integration 71/71, application 12/12, and Chromium smoke 1/1 pass in the restored isolated environment; final listeners and owned-database residue are zero. Fresh integrated review returned `PASS` with no Blocker, Major, or Minor on the exact candidate. The primary completed the documentation-impact gate, marked TASK-005 and AC-009 complete, advanced current readiness to 4/12, and retained Redis, mutations, frontend behavior, ERD, and final delivery for their existing owners. The exact isolated Compose project and volumes were removed after final zero-residue readback. No new technical debt was created.

Documentation impact: updated the requirement acceptance checklist, canonical task/dependency status, root current status and command example, SPEC execution notes, ADR/system-diagram current implementation annotations, plan/review indexes, dated acceptance review, and append-only execution chronology. The accepted ADR semantics, task dependencies, AUTH-001 scope, feature files, migrations, dependencies, lockfile, and product source/test candidate remain unchanged by closure.


## Context and Orientation


The following authorities define this plan. Their stated behavior is intent until repository or runtime evidence proves it.

| Authority | Relevance to TASK-005 |
|---|---|
| docs/FULL_STACK_TECHNICAL_ASSESSMENT.md | The assessment requires initializing the relational database with 15 characters from the public API. |
| docs/REQUIREMENTS.md | FR-BE-004 and AC-009 are the mandatory task outcome. DEL-003 will later need the import command documented, but TASK-005 does not complete overall delivery. |
| docs/IMPLEMENTATION_PLAN.md | Owns TASK-005 Pending status, dependencies on TASK-004 and TASK-017, resolved DG-006, and Authorized AUTH-001. |
| docs/adrs/0008-use-deterministic-bootstrap-and-idempotent-sync.md | Requires an explicit, idempotent, transactional import after migrations; it excludes migration network access and the optional scheduler. |
| docs/adrs/0007-use-cache-aside-for-character-searches.md | Requires only a best-effort invalidation request after successful import commit. Redis caching and its SCAN/UNLINK implementation remain TASK-007 work. |
| docs/adrs/0014-persist-and-deliver-character-image-urls-directly.md | Requires exact Character.image validation for requested IDs 1 through 15 and prohibits an image byte, proxy, asset, or URL-normalization subsystem. |
| docs/adrs/0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md | Requires read-only preflight plus sequential, separately owned Red-Green-Refactor slices for any missing or regressed behavior. |
| docs/specs/SPEC.feature and docs/specs/HARD_SPEC.feature | Route this task to SPEC-010, SPEC-011, and HS-012. |

TASK-004 and TASK-017 are Complete; DG-006 is Resolved; AUTH-001 is Authorized only for the existing personal, educational, non-commercial direct-URL boundary. DG-003 applies to later frontend data access and is not a TASK-005 dependency. The project owner supplied the separate TASK-005 execution authorization on 2026-08-18.

Source-owned fields are the imported character projection: id, name, status, species, character type, gender, origin name, origin URL, and image URL. Application-owned state is is_favorite and all comment rows. An import may update only the former. It must not reject permitted empty character type or origin URL strings, and it must not persist unrelated payload fields such as location, episodes, Character.url, or created timestamps.

For each requested canonical decimal ID n from 1 through 15, the accepted image value is exactly:

https://rickandmortyapi.com/api/character/avatar/n.jpeg

The payload ID must equal the requested ID. The importer reads Character.image and compares its decoded UTF-8 value byte for byte with that expected ASCII string. It never substitutes Character.url. Exact equality deliberately rejects alternative schemes, hosts, case, credentials, ports, paths, leading-zero IDs, query strings, fragments, encodings, backslashes, and Unicode-confusable hosts without adding a generalized URL parser.


## Scope and Non-Goals


In scope:

- a compiled, zero-argument explicit import command, planned as npm run import:characters after it is implemented;
- a small upstream adapter using native fetch with a finite timeout and finite retry count, injected in tests;
- one fixed batch for IDs 1 through 15, complete-batch validation before publication, and deterministic version-controlled success and hostile-input fixtures;
- a focused import service and transactional PostgreSQL repository that upserts only source-owned fields;
- idempotency, source-field refresh, favorites/comments preservation, failure rollback, non-zero command failure, and post-commit invalidation-request evidence;
- focused unit, application/CLI, and real isolated PostgreSQL integration tests; and
- import setup and usage documentation when the command exists.

Out of scope:

- migrations, migration artifacts, migration locks, schema changes, seed migrations, or a TASK-005 verification controller;
- an API-startup, first-request, scheduled, queue-based, multi-instance, or manually locked synchronization mechanism; OR-005 remains Deferred optional scope;
- Redis client configuration, cache keys, TTLs, SCAN/UNLINK behavior, or real Redis invalidation; those belong to TASK-007;
- GraphQL schema/resolvers, frontend data access, UI behavior, favorites/comments mutations, or deletion/synchronization of non-baseline rows;
- image bytes, decoder, proxy, asset route, storage, cache, lifecycle, or a generic URL-normalization framework; and
- new dependencies unless preflight proves native Node and existing packages cannot meet an already accepted contract.

No non-blocking scope addition found at registration qualifies as technical debt. If later execution discovers a genuine safe-to-defer item, record it only in docs/IMPLEMENTATION_PLAN.md under Technical debt and future implementations, with High/Mid/Low priority, this ExecPlan link, present impact, safe-deferral rationale, and falsifiable exit criterion. Mandatory behavior, security, correctness, or task-closure findings must not be deferred.


## Plan of Work


Execution was authorized on 2026-08-18 and begins only after the primary validates the authoritative task-state, execution-record, plan-index, root-status, and Progress reconciliation before any test or production writer starts. The primary then keeps one persistent test_worker and one persistent code_worker for a milestone at a time. Every write turn receives a fresh Milestone Assignment Packet v2 and a fresh terminal write lease; the test and implementation writers never write concurrently.

Each milestone has a read-only preflight. The classification may be EXISTING_AND_COVERED, EXISTING_BUT_UNCOVERED, MISSING, REGRESSION, PARTIAL, CONFLICTING, or UNKNOWN. Current source absence is evidence to investigate, not permission to assume MISSING. CONFLICTING or UNKNOWN stops dependent writes for coordinator reconciliation. An accepted test boundary freezes before Green.

### Milestone 1 — Validate the deterministic upstream batch


The observable contract is that the importer obtains only the fixed requested IDs 1 through 15, maps only the accepted source-owned projection, and rejects any malformed, missing, duplicate, mismatched, or hostile avatar record before a persistence call can occur. The adapter uses native fetch with one finite timeout and a small fixed retry bound; tests inject fetch behavior and use version-controlled fixtures, so no automated test makes a live upstream request.

The test_worker preflights the intended import-service and upstream-adapter boundaries. If a Red is needed, it owns the minimum unit tests for complete-batch success, exact requested/payload/avatar binding, Character.url non-substitution, permitted empty source fields, hostile raw image variants, missing/duplicate records, and bounded upstream failure. The code_worker then adds only the adapter, validation, and service coordination required for that frozen contract.

Initial intended paths are apps/api/src/application/characters/character-import-service.ts, apps/api/src/application/characters/character-import-service.unit.test.ts, apps/api/src/infrastructure/upstream/rick-and-morty-character-client.ts, its unit test, and a narrowly scoped fixture location. Any additional production, fixture, manifest, configuration, or generated path is a binding-field change and must stop the lease for coordinator approval.

This is S2 because untrusted upstream values become stored product data. The focused command, after the test paths exist, is expected to be:

npm exec -- vitest run --config vitest.config.ts --project api-unit apps/api/src/application/characters/character-import-service.unit.test.ts apps/api/src/infrastructure/upstream/rick-and-morty-character-client.unit.test.ts

The milestone join includes the affected API unit scope and root typecheck. Advance only after the primary verifies the accepted preflight route, terminal leases, frozen tests, focused Green, no-live-network boundary, test relevance, and a fresh independent S2 review.

### Milestone 2 — Publish source-owned fields transactionally


The observable contract is that one valid full batch is published in one real PostgreSQL transaction using source-only upserts. The first import leaves exactly IDs 1 through 15 in an empty migrated namespace. A repeat preserves 15 distinct baseline rows. A later source-field refresh updates those fields but leaves is_favorite and every comment unchanged. Fetch, validation, or persistence failure leaves the previously committed dataset unchanged and exposes no partial replacement.

The test_worker preflights a focused import repository against an existing migrated isolated namespace. If a Red is needed, it owns the real-PostgreSQL integration test and fixtures. The code_worker owns only the import repository and the minimum connection-composition extraction that a second runtime consumer demonstrably needs. It must use bound values and an explicit transaction, omit is_favorite from conflict updates, never write comments, and never reuse or modify the migration artifact, target, lock, runner, or read repository merely for convenience.

Initial intended paths are apps/api/src/infrastructure/database/sequelize-character-import-repository.ts, its integration test, and only an existing-server/new-CLI shared connection helper if direct duplication would otherwise be unavoidable. The existing postgres-lifecycle helper may create and remove the test-owned migrated namespace, but TASK-005 must not extend ADR-0015's lifecycle.

This is S3 because database atomicity and application-owned state preservation are integrity boundaries. The focused command, after the integration test exists, is expected to be:

npm exec -- vitest run --config vitest.config.ts --project api-persistence-integration apps/api/src/infrastructure/database/sequelize-character-import-repository.integration.test.ts

The milestone join includes root typecheck and the affected persistence-integration suite with recorded namespace cleanup. Advance only after the primary confirms test relevance and a fresh critical review accepts the transaction, rollback, preservation, bound-query, and residue evidence.

### Milestone 3 — Expose the explicit command and post-commit request


The observable contract is that the compiled import command connects through the existing closed PostgreSQL configuration, invokes the importer only when explicitly run, exits non-zero with a clear safe failure on failed import, and does not start Express, GraphQL, migrations, or a scheduler. It invokes an injected cache-invalidation request only after successful persistence commit. Because TASK-007 has not implemented Redis yet, the current command uses a documented no-op/deferred adapter; a later Redis-backed implementation satisfies the same small port. An invalidation failure is logged safely and cannot undo a committed database update.

The test_worker preflights the CLI composition and post-commit ordering boundary. If a Red is needed, it owns only the focused CLI/application tests and required test doubles. The code_worker owns the compiled CLI, its package scripts, and the smallest connection-factory extraction justified by the existing server plus new command. No command-parser dependency, environment-variable matrix, Redis dependency, scheduler, or general composition container is permitted.

Initial intended paths are apps/api/src/infrastructure/characters/character-import-cli.ts, its focused test, apps/api/package.json, root package.json, and a narrowly justified shared database-composition helper. The future API workspace script runs the emitted CLI; the future root import:characters script builds that workspace before invoking it. These planned commands are not present or executable at registration.

This is S2 because command exit behavior and commit/invalidation ordering cross process and persistence boundaries. Its preflight selects the final focused command after the test path is created; the minimum milestone validation includes the affected application or integration project, root typecheck, API build, and an isolated migrated command probe using injected upstream behavior. Before review, the primary audits the affected tests, fixtures, mocks, helpers, snapshots, skipped tests, and focused-test state for relevance. Advance only after a fresh independent S2 review accepts the actual diff, command output, commit ordering, test-relevance audit, and cleanup evidence.

### Milestone 4 — Close the task without widening it


After all accepted behavior milestones, the primary performs the task-level import evidence join. This includes a test-relevance audit, documentation updates for the real command and prerequisites, full authoritative validation once on the final relevant tree, an integrated independent review, and the root task-closure documentation gate. The canonical task may become Complete only when its definition of done and every documentation join pass.

No new feature belongs in this milestone. A setup or production gap discovered here returns to a newly scoped preflight rather than being patched under closure.

Read-only research about existing commands, source shape, and documentation may run in parallel. There are no safe parallel write branches inside this plan: M1 validation feeds M2 persistence; M3 composes both; Red and Green remain sequential in every milestone.

The default budget for each behavior milestone is one preflight, one Red or characterization turn, one Green turn, at most one same-contract correction per role, one review correction loop, one repeated identical decisive failure, and two no-diff write handoffs. A binding-field change, stale external evidence, exhausted budget, unexpected path, lease failure, or failed review stops writes and returns control to the primary.


## Concrete Steps


The current registration checks are:

1. From the repository root, run python -B .agents/skills/verify-repository/scripts/validate_docs.py --repo .
2. From the repository root, run python -B .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
3. From the repository root, run git diff --check.

After explicit TASK-005 authorization, execute the following order:

1. Reconfirm clean ownership boundaries and update the authoritative task state to In progress, this ExecPlan, the plan index, and the append-only execution log. Do not make source edits before that reconciliation.
2. Issue the Milestone 1 preflight packet. Its Red route, if required, precedes any source implementation. Record the classification, test paths, focused command, intended decisive result, relevant-tree fingerprint, and injected-network boundary.
3. Issue Milestone 2 only after Milestone 1 acceptance. Create a run-owned PostgreSQL namespace through the existing helper, apply the already accepted migration artifact, and record exact cleanup evidence. Do not run the import against a shared development database as test evidence.
4. Issue Milestone 3 only after Milestone 2 acceptance. The user-facing future sequence will be migrate the database with the existing migration workflow, then run npm run import:characters. This command does not exist yet and becomes authoritative only with its implementation evidence.
5. At closure, run the root typecheck, build, and complete authoritative test suite in an explicitly recorded isolated infrastructure environment; run documentation validation, the ADR validator if an ADR-sensitive owner changed, and git diff --check. Do not add a TASK-005 verification controller unless a current validation gap proves that the existing commands cannot establish the required outcome.

Expected success is a deterministic import command with a non-zero safe failure path and no change to application behavior outside its task boundary. Expected failure at any stage is an unchanged committed dataset, preserved application-owned interactions, recorded cleanup, and a stopped workflow rather than an automatic broad recovery.


## Validation and Acceptance


Registration validation proves only documentation integrity. It does not run a planned import command, contact the public API, start PostgreSQL, or establish implementation readiness.

| Scope | Required evidence after authorization |
|---|---|
| FR-BE-004 and SPEC-010 | An isolated migrated database receives exactly IDs 1 through 15 from deterministic valid fixtures through the explicit importer, with no migration network call. |
| AC-009 | TASK-004 schema evidence joins TASK-005 initialization evidence only after this task passes its acceptance and documentation gates. |
| SPEC-011 contribution | The importer proves that product data is committed to PostgreSQL before later runtime tasks use it; it does not claim all later read or mutation behavior. |
| HS-012 and ADR-0014 | Exact raw Character.image association, complete-batch validation, hostile-input rejection, atomic failure, repeatability, source/application ownership preservation, and post-commit-only invalidation request. |
| ADR-0008 | Explicit command, bounded upstream failure, no startup/migration/scheduler import, one transaction, clear non-zero failure, and repeatability. |
| Negative scope | Static/diff review confirms no new migration, Redis client, cache implementation, GraphQL/API route, scheduler, image byte/proxy/asset artifact, dependency, or live-network automated test. |

For each milestone, the primary records the preflight classification; actual accepted Red failure or passing characterization evidence; Green command and result; post-Refactor result only if Refactor occurred; changed and frozen paths; terminal lease receipts; affected-suite/type/build evidence; reviewer verdict; and evidence reuse only when the exact command, working directory, relevant-tree fingerprint, environment identity, and external-state identity match.

At task closure, use current repository commands rather than invented aliases: npm run typecheck, npm run build, and npm test, plus any still-required documented lifecycle or smoke command whose scope changed. PostgreSQL, Redis, browser, and external-network evidence are non-reusable unless the isolated namespace, container/project, port, fixture, and cleanup identities are recorded. The final independent reviewer must examine cross-milestone behavior, status, documentation, no-scope-expansion assertions, and unresolved findings before the primary may reconcile TASK-005.


## Idempotence and Recovery


The explicit import is designed to be safe to rerun. A successful rerun updates only source-owned fields for the 15 fixed IDs. It neither deletes rows nor synchronizes an unrequested wider dataset, so it cannot erase favorites or comments. A fetch or validation failure occurs before publication. A persistence failure rolls back the one transaction. A post-commit invalidation-request failure is logged and leaves the committed database authoritative; it is retried only by a later explicit import or the later TASK-007 cache behavior.

Every integration run uses an owned migrated PostgreSQL namespace and proves cleanup. If a test, command, or cleanup fails, preserve the failure evidence; reconcile the exact namespace and repository tree before a fresh assignment. Never repair by dropping a shared database, reversing peer edits, changing an active lease, restarting a task-wide Red-Green cycle, or adding a hidden retry/scheduler.

If a planned path must change, a dependency is missing, a cache implementation becomes necessary, the upstream URL grammar changes, direct-image authorization reopens, or the work needs multi-instance coordination, stop the affected branch. The primary must revise this plan, update the controlling authority or gate when required, and obtain any new owner direction before resuming.


## Artifacts and Notes


| Artifact | Intended result | Ownership boundary |
|---|---|---|
| apps/api/src/application/characters/character-import-service.ts | Fixed-batch validation and import orchestration | TASK-005 only; no GraphQL/UI behavior. |
| apps/api/src/infrastructure/upstream/ | Native-fetch adapter and deterministic fixtures/tests | No SDK, live test request, or URL parser framework. |
| apps/api/src/infrastructure/database/sequelize-character-import-repository.ts | One source-owned transactional upsert boundary | Does not modify migrations, migration artifacts, or read repository behavior. |
| apps/api/src/infrastructure/characters/character-import-cli.ts | Compiled explicit command | Does not start server, migrations, scheduler, or Redis client. |
| root and API package manifests | Explicit compiled import scripts | No new dependency or lockfile change. |
| README import guidance | Verified prerequisites and command usage | Documents only the implemented explicit command and deferred Redis boundary. |
| docs/IMPLEMENTATION_PLAN.md | Canonical completed status, evidence link, dependency readiness, and unchanged debt register | Does not alter task dependencies, gate status, or scope. |

No assignment packet, lease receipt, test output, external request, database namespace, cache state, or implementation evidence existed at registration. Progress and the append-only execution log now preserve the exact later evidence identities and bounded handoffs without copying whole command transcripts.


## Interfaces and Dependencies


The implementation must establish only the following focused contracts:

| Boundary | Required contract | Excluded expansion |
|---|---|---|
| Upstream adapter | Load fixed character records by requested ID using bounded native fetch; return the payload only to the importer. | Generic API client, pagination, discovery, scheduler, or live tests. |
| Import service | Validate all 15 records before one persistence publication call; call invalidation only after publication succeeds. | GraphQL resolver, cache-aside logic, or all-character synchronization. |
| Import repository | Publish source-owned fields transactionally with parameterized SQL/upsert semantics. | is_favorite/comment writes, migrations, locks, row deletion, or schema synchronization. |
| Invalidation requester | A minimal injected best-effort request invoked after commit; TASK-007 later supplies Redis behavior. | Redis connection, SCAN/UNLINK, key policy, TTL, or blocking cache failure. |
| CLI | A zero-argument compiled process that returns zero only for successful import and non-zero for safe failure. | HTTP server, REST/GraphQL endpoint, command framework, scheduler, or hidden startup import. |
| Direct image mapping | Persist only the exact validated Character.image value as image_url. | Character.url substitution, bytes, proxying, decoding, asset routes, or image lifecycle. |

The exact TypeScript names, test files, timeout/retry constants, and package-script implementation remain implementation details to be fixed by the authorized preflight and recorded as a reversible execution decision only if they affect dependent work. They must preserve the boundaries above and may not silently widen this task.


## Revision Note


2026-08-18 UTC / Codex primary coordinator: Registered ExecPlan 005 for pending TASK-005, reconciled the TASK-007 readiness prose with its unchanged graph/table dependency, and standardized the current technical-debt register around High/Mid/Low priority and source ExecPlan provenance. This is a documentation-only planning change: no task, gate, requirement, ADR, implementation, runtime, or acceptance state changed.

2026-08-18 UTC / Codex primary coordinator: Recorded the project owner's separate execution authorization, preserved the registration baseline in commit `4792c8da63894401dbbb7910f6397594f6c690df`, and activated TASK-005 without claiming implementation or AC-009 evidence. Milestone 1 may begin only after the transition validators pass.

2026-08-18 UTC / Codex primary coordinator: Accepted Milestone 1 preflight classification `MISSING` from the persistent test owner. The future Red is frozen to the two planned unit-test paths with inline deterministic builders and no live network, fixture directory, dependency, configuration, or production write.

2026-08-18 UTC / Codex primary coordinator: Withheld the first compliant-scope Milestone 1 Red after semantic inspection found incomplete hostile-URL, malformed-field, and actual-timeout evidence. Authorized the single attempt-2 test correction under the unchanged two-file contract before any Green.

2026-08-18 UTC / Codex primary coordinator: Accepted the corrected 38-scenario Milestone 1 Red and froze both test files at their recorded SHA-256 identities after fresh compliant attempt-2 receipt and semantic inspection. Documentation-barrier drift requires one exact focused Red reproduction before the Green lease.

2026-08-18 UTC / Codex primary coordinator: Joined the minimum two-file Milestone 1 Green candidate with focused 38/38, affected API unit 97/97, root typecheck, exact frozen-test identities, and a clean relevance/no-live-network audit. Fresh S2 independent review remains mandatory before acceptance.

2026-08-18 UTC / Codex primary coordinator: Fresh S2 review returned `PASS WITH FOLLOW-UPS` with one documentation-only Minor and no implementation, test, lease, scope, or validation finding. Corrected the exact current-status wording so it recognizes Milestone 1 source/test evidence without claiming runtime import, task completion, or AC-009.

2026-08-18 UTC / Codex primary coordinator: Accepted Milestone 1 after both documentation validators, `git diff --check`, exact four-path identities, and aggregate fingerprint passed unchanged, and the same read-only reviewer returned bounded `PASS` with no remaining finding. Retired all Milestone 1 roles; Milestone 2 requires fresh persistent test and implementation owners and S3 review.

2026-08-18 UTC / Codex primary coordinator: Accepted fresh Milestone 2 preflight as `MISSING`. Authorized a future one-file aggregate Red using the existing isolated PostgreSQL lifecycle and test-local Sequelize construction; no connection helper, migration change, or production write is justified before the frozen test boundary.

2026-08-18 UTC / Codex primary coordinator: Withheld Milestone 2 Red after the compliant one-file test could not authenticate to the unrelated PostgreSQL listener on default port 5432 and therefore created no namespace or decisive product failure. Started dedicated healthy Compose project `rick-and-morty-task005` on free ports 55432/56379 and reserved the single attempt-2 test turn for an unchanged focused rerun with exact cleanup readback.

2026-08-18 UTC / Codex primary coordinator: Accepted and froze the unchanged Milestone 2 integration Red after its attempt-2 run used the owned PostgreSQL 18.6 port, migrated a run-owned namespace, failed solely on the absent repository module, made no live upstream request, and returned exact zero-residue readback. The test-role correction budget is exhausted; Green may create only the sibling import repository against this frozen contract.

2026-08-18 UTC / Codex primary coordinator: Joined the minimum Milestone 2 Green candidate with one bound bulk source-only upsert inside one explicit transaction, focused 1/1, root typecheck, standalone affected persistence 70/70, exact frozen identities, captured run-owned namespace/cleanup, zero final database residue, and a clean test-relevance audit. Preserved one invalid concurrent-validation run and its isolated 1/1 diagnostic; fresh S3 critical review remains mandatory before acceptance.

2026-08-18 UTC / Codex primary coordinator: Reconciled fresh S3 critical review as `REVISE`. The exact candidate and runtime integrity checks reproduced, but conflict refreshes did not advance `updated_at` and the test discarded that timestamp. Corrected stale current-status prose and opened the one authorized reviewer-directed behavioral Red/Green cycle without changing task, milestone, authority, paths, or external dependencies.

2026-08-18 UTC / Codex primary coordinator: Accepted the reviewer-directed Red after its one-file lease closed compliant and both worker and primary focused runs failed solely on the fixed-instant `updated_at` advancement assertion with exact namespace cleanup. Froze the corrected integration test at SHA-256 `E91AF0A31FF1565D5F12833D39067D22EB26FB5EA93C2E8C45DE43FEF57A9221`; correction Green is restricted to the existing repository source.

2026-08-18 UTC / Codex primary coordinator: Joined the reviewer-corrected Green after its one-line conflict-clause change closed under a compliant lease and passed worker/primary focused evidence, a console-visible isolated namespace with exact cleanup, root typecheck, and the standalone 70-test persistence project. The correction loop is consumed; the same critical reviewer must accept the exact current candidate before Milestone 2 advances.

2026-08-18 UTC / Codex primary coordinator: Accepted Milestone 2 after the same critical reviewer returned bounded `PASS` with no Blocker, Major, or Minor on the exact corrected candidate and independently reproduced focused PostgreSQL behavior, cleanup, typecheck, validators, identities, and lease separation. Retired the Milestone 2 roles and advanced only to Milestone 3 preflight.

2026-08-18 UTC / Codex primary coordinator: Accepted Milestone 3 preflight as `MISSING` after source and passing 39-test boundary inspection. Reconciled CLI-owned post-service invalidation and the exact shared PostgreSQL helper/server paths before any Red; no source, test, manifest, build, database, network, or guard mutation occurred in preflight.

2026-08-18 UTC / Codex primary coordinator: Withheld the initial Milestone 3 Red after compliant two-file creation and exact missing-module reproduction. Its application seam proves fail-open orchestration, but its real-PostgreSQL case does not observe committed state after an injected invalidation rejection. Authorized the sole attempt-2 test correction in the existing integration-test path; no Green or frozen test identity exists yet.

2026-08-18 UTC / Codex primary coordinator: Accepted and froze the corrected Milestone 3 Red after the one-path correction lease closed compliant and worker/primary focused runs failed solely on the absent CLI module before external state. The real-boundary contract now distinguishes a committed refresh, observes it inside a rejecting invalidation callback, and verifies it remains after the safe non-fatal result and resource closure. Both test identities are frozen for Green; the test correction budget is exhausted.

2026-08-18 UTC / Codex primary coordinator: Joined the minimum Milestone 3 Green after its five-path lease closed compliant, frozen tests stayed byte-exact, and worker/primary focused PostgreSQL runs passed. Root typecheck, API build, compiled invalid-argument entry, full application 11/11, standalone persistence 71/71, relevance audit, and zero owned-database readback pass. Current-status and import-operation guidance now describe the candidate without claiming milestone, task, or AC-009 acceptance; fresh S2 review is next.

2026-08-18 UTC / Codex primary coordinator: Accepted Milestone 3 after a fresh independent S2 reviewer returned `PASS` with no finding on the exact 18-path candidate and independently reproduced its identity, focused PostgreSQL behavior, cleanup, compiled entry, validators, scope, and documentation honesty. Retired Milestone 3 roles and advanced only to task-level closure; TASK-005 and AC-009 remain pending until the final authoritative suite, integrated review, and documentation gate pass.

2026-08-18 UTC / Codex primary coordinator: Paused safely at the project owner's request during Milestone 4. Root typecheck/build and the unit, persistence, and application portions of `npm test` passed; the Chromium phase started but emitted no terminal result before coordinator interruption. Confirmed no listeners on 4173/4174, no owned PostgreSQL database, empty Git index, healthy dedicated Compose services, and preserved uncommitted work. The first resume action is a focused smoke/lifecycle diagnostic, not a completion claim.

2026-08-18 UTC / Codex primary coordinator: Resumed Milestone 4, proved the smoke symptom was a restricted Windows child-process-control boundary, and passed the unchanged lifecycle harness 6/6 with owned-child control. Restarted Docker Desktop and restored the exact isolated Compose project; PostgreSQL remained on 55432, while a new Windows excluded range required Redis host port 56400 instead of 56379. Fresh root typecheck, build, ordered unit 98/98, PostgreSQL integration 71/71, application 12/12, and Chromium 1/1 pass. Ports 4173/4174 and the owned-database catalog are empty; integrated review and documentation closure are next.

2026-08-18 UTC / Codex primary coordinator: Fresh integrated review independently reproduced exact 18-path fingerprint `B008819D8736BF92AF8870BB5A6CAB18BB55CAF3BE81C0D7F23E430DE0210780` and returned `PASS` with no Blocker, Major, or Minor. Completed the task-closure documentation reconciliation: TASK-005 and AC-009 are Complete/Pass, current readiness is 4/12, SPEC-010 and HS-012 pass, the TASK-005 SPEC-011 contribution passes while full mutations remain pending, current architecture annotations are accurate, the dated review is indexed, all inbound links target completed history, and no product/test byte or technical-debt record changed. Documentation and ADR validators plus diff integrity pass on completed history.

2026-08-18 UTC / Codex primary coordinator: After final empty owned-database readback, removed only Compose project `rick-and-morty-task005` and its PostgreSQL/Redis volumes and network. Post-teardown project status and listeners on 4173, 4174, 55432, and 56400 are empty.
