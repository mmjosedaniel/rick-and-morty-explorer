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
- [ ] Await separate project-owner authorization before changing TASK-005 to In progress, opening any write lease, or beginning a TDD milestone.
- [ ] Complete Milestone 1 preflight and, only if warranted, the frozen Red-Green-Refactor cycle for deterministic batch retrieval and validation.
- [ ] Complete Milestone 2 preflight and, only if warranted, the frozen Red-Green-Refactor cycle for transactional source-owned persistence and interaction preservation.
- [ ] Complete Milestone 3 preflight and, only if warranted, the frozen Red-Green-Refactor cycle for the explicit CLI and post-commit invalidation request.
- [ ] Run integrated validation, test-relevance review, risk-routed independent review, documentation closure, and the TASK-005 completion reconciliation.


## Surprises & Discoveries


- Observation: The existing migration and Sequelize model already expose every source-owned character column needed for this task, including image_url. The current runtime repository is SELECT-only, so import persistence needs a focused write boundary rather than a migration or a broad read-repository rewrite.
  Evidence: apps/api/src/infrastructure/database/migrations/20260814000000-create-relational-schema.ts, apps/api/src/infrastructure/database/sequelize-persistence.ts, and apps/api/src/infrastructure/database/sequelize-character-read-repository.ts.

- Observation: Native Node fetch is available under the documented Node 24.18.0 target. No HTTP client, SDK, queue, scheduler, or generic retry framework is needed for the fixed 15-request operation.
  Evidence: root package.json engine range and the current dependency manifests.

- Observation: The canonical graph and task table require TASK-005 before TASK-007, while one nearby prose sentence previously implied that TASK-007 could start immediately. The graph and table were preserved and the prose was corrected.
  Evidence: docs/IMPLEMENTATION_PLAN.md, Canonical task graph and Task status and dependency index.

- Observation: A repeated integration-test bootstrap pattern is not, by itself, a justified shared test-infrastructure abstraction. It remains local unless a later requirement, recurring defect, or fourth demonstrated consumer establishes present value.
  Evidence: current import-related source absence and the repository KISS/YAGNI policy.


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


## Outcomes & Retrospective


Registration outcome: the repository now has a task-scoped, MVP-only execution path for TASK-005 and a discoverable active-plan entry. No implementation has started, no acceptance criterion has advanced, and the next action is owner authorization followed by read-only preflight for Milestone 1.


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

TASK-004 and TASK-017 are Complete; DG-006 is Resolved; AUTH-001 is Authorized only for the existing personal, educational, non-commercial direct-URL boundary. DG-003 applies to later frontend data access and is not a TASK-005 dependency. A separate owner authorization remains required before any implementation workflow begins.

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


Execution begins only after the owner authorizes TASK-005 and the primary updates the authoritative task state, execution record, plan index, and this Progress section before any test or production writer starts. The primary then keeps one persistent test_worker and one persistent code_worker for a milestone at a time. Every write turn receives a fresh Milestone Assignment Packet v2 and a fresh terminal write lease; the test and implementation writers never write concurrently.

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
| root and API package manifests | Future explicit import scripts | No new dependency unless preflight proves a required gap. |
| README import guidance | Real prerequisites and command usage after implementation | Do not document the command as available before runtime evidence. |
| docs/IMPLEMENTATION_PLAN.md | Canonical task link, corrected dependency prose, and technical-debt register | Does not alter TASK-005 state, dependencies, gate status, or scope. |

No assignment packet, lease receipt, test output, external request, database namespace, cache state, or implementation evidence exists at registration. Future concise handoffs belong in Progress and should cite their exact evidence identity rather than copy whole command transcripts.


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
