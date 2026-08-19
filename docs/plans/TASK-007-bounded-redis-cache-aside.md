# Implement bounded Redis cache-aside searches


This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.

This plan decomposes [TASK-007](../IMPLEMENTATION_PLAN.md#task-007---add-bounded-redis-cache-aside-search-behavior). Creating and registering it does not start implementation, change the canonical task from `Pending`, or prove Redis behavior. A separate project-owner execution authorization and an evidence-linked `In progress` transition are required before any worker preflight or product/test write.


## Progress


- [x] (2026-08-19 00:36Z) Read the documentation map, repository policy, ExecPlan convention, worker-first workflow, write-lease guard, exact TASK-007 record, mapped requirements, accepted ADRs, routed SPEC-012/HS-013 rules, current manifests, Compose/configuration, search service, Redis absence, runtime composition, and TASK-005 post-commit invalidation seam.
- [x] (2026-08-19 00:36Z) Registered this active plan without changing TASK-007 from `Pending` or adding application, test, manifest, lockfile, configuration, or runtime behavior.
- [x] (2026-08-19 00:36Z) Applied the project owner's KISS/YAGNI instruction: retained three coherent product milestones, reused the existing Vitest and Compose boundaries, and routed the only concrete non-blocking enhancement found during planning to [DPL-DEC-046](../IMPLEMENTATION_PLAN.md#technical-debt-and-future-implementations).
- [x] (2026-08-19 00:45Z) Passed focused planning validation: documentation validation checked 60 Markdown files and all stable IDs/scenarios; ADR validation checked 17 ADRs with only the established unrelated NFR-006 warning; heading structure and `git diff --check` passed; and scope inspection found only this plan plus its three navigation/decision/register owners.
- [ ] Obtain separate project-owner execution authorization, create or confirm the task branch, append the activation record, and move TASK-007 to `In progress` before implementation workflow preflight.
- [ ] Complete Milestone 1: canonical key, exact summary codec, and injected cache-aside service behavior.
- [ ] Complete Milestone 2: bounded real-Redis adapter, configuration, lifecycle, and production search wiring.
- [ ] Complete Milestone 3: scoped post-import SCAN/UNLINK invalidation and committed-data failure behavior.
- [ ] Complete integrated validation, acceptance review, documentation reconciliation, plan retirement, and task closure.


## Surprises & Discoveries


- Observation: Local Redis infrastructure already exists as `redis:8.8.1-alpine` in [compose.yaml](../../compose.yaml), but the API manifest and lockfile contain no Redis client.
  Evidence: [apps/api/package.json](../../apps/api/package.json), [package-lock.json](../../package-lock.json), and [compose.yaml](../../compose.yaml).
- Observation: TASK-005 already created and tested the exact post-commit invalidation seam. TASK-007 needs to replace only the no-op production adapter; it does not need to redesign import transactions or publication.
  Evidence: [character-import-cli.ts](../../apps/api/src/infrastructure/characters/character-import-cli.ts) and its application and PostgreSQL integration tests.
- Observation: The existing `api-persistence-integration` Vitest project already serializes real-infrastructure tests, so a second Redis-specific Vitest project would add configuration without improving isolation.
  Evidence: [vitest.config.ts](../../vitest.config.ts).
- Observation: ADR-0007 mentions rate-limiting or deduplicating repeated Redis infrastructure warnings, but no requirement, acceptance criterion, current incident, or measured log-volume threshold requires stateful suppression for MVP.
  Evidence: [ADR-0007 risks and mitigations](../adrs/0007-use-cache-aside-for-character-searches.md#risks-and-mitigations) and [DPL-DEC-046](../IMPLEMENTATION_PLAN.md#technical-debt-and-future-implementations).


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


## Outcomes & Retrospective


Execution has not started. The current outcome is a registered, implementation-ready plan that preserves TASK-007 as `Pending` and keeps non-blocking warning-suppression machinery outside MVP. At each accepted milestone, record achieved SPEC-012/HS-013 coverage, observed cost, retained or removed tests, review result, and the next exact barrier. At closure, compare the three planned cycles and dependency surface with what implementation actually required.


## Purpose / Big Picture


TASK-007 makes repeated equivalent character searches reuse a finite, validated Redis copy while PostgreSQL remains authoritative. A reviewer will be able to observe a first search reaching PostgreSQL and populating Redis, a second equivalent search avoiding PostgreSQL, correct reuse of an empty result, finite TTL and namespace isolation, bounded fail-open behavior during Redis failures, and scoped cache eviction after a committed character import.

The work satisfies mandatory [FR-BE-005](../REQUIREMENTS.md#fr-be-005---search-caching), the Redis portion of [NFR-003](../REQUIREMENTS.md#nfr-003---backend-technologies), and [AC-010](../REQUIREMENTS.md#8-minimum-acceptance-criteria). It also implements the repository-adopted optional [OR-008](../REQUIREMENTS.md#or-008---design-patterns) only through the already accepted cache-aside/service boundaries. This plan is intent, not evidence that any of those outcomes pass.


## Context and Orientation


[ADR-0007](../adrs/0007-use-cache-aside-for-character-searches.md) owns the cache-aside semantics. Search filters are normalized by visiting `status`, `species`, `gender`, `name`, then `origin`; each present value uses JavaScript `trim().toLowerCase()`, and blank values are omitted. `JSON.stringify` serializes that insertion-ordered object, including `{}` for no effective filter; SHA-256 hashes its UTF-8 bytes and maps them to `<namespace>:characters:search:v1:<sha256>`. No locale-sensitive case conversion or Unicode normalization is added. Valid hits may bypass PostgreSQL. Missing, malformed, timed-out, or failed Redis reads fall back to PostgreSQL. Successful PostgreSQL results, including an empty list, are written with a finite TTL. Cache write failure cannot discard the database result.

[ADR-0006](../adrs/0006-define-a-use-case-oriented-graphql-contract.md) owns filter semantics and the exact `CharacterSummary` projection: `id`, `name`, `imageUrl`, and `species` only. [ADR-0014](../adrs/0014-persist-and-deliver-character-image-urls-directly.md#persistence-graphql-and-redis-meaning) requires the cached `imageUrl` to remain the exact stored absolute avatar URL and prohibits image bytes or lifecycle metadata. [ADR-0016](../adrs/0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md) owns preflight classification and the milestone-slice TDD workflow.

TASK-005 and TASK-006 are complete. The current read service trims and drops blank filters, then calls the Sequelize repository directly. No Redis client, key builder, codec, cache adapter, runtime configuration, or cache test exists. The import CLI already calls an injected invalidation request only after a successful commit, catches its rejection, emits a fixed safe warning, keeps the command successful, and closes PostgreSQL.

The root Compose project already starts PostgreSQL and Redis on loopback. Real Redis evidence must use a unique per-run namespace and remove only that namespace's keys. Redis evidence is externally mutable and therefore non-reusable unless the exact container identity, namespace, and state are pinned.

The routed derived rules are [SPEC-012](../specs/SPEC.feature) and [HS-013](../specs/HARD_SPEC.feature). They remain non-executable documentation; ordinary Vitest tests provide implementation evidence.


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

If execution finds another attractive implementation that is not required by TASK-007, its authorities, or a blocking correctness/security condition, stop scope expansion. Record a concrete entry in the canonical [Technical debt and future implementations](../IMPLEMENTATION_PLAN.md#technical-debt-and-future-implementations) register with this ExecPlan as its source, present impact, safe-deferral rationale, and falsifiable exit criterion. Do not add speculative ideas merely to populate the register.


## Plan of Work


Implementation uses workflow ID `TASK-007-20260818-01` after owner authorization and canonical activation. Each milestone gets one persistent `test_worker` for read-only preflight and test ownership, one separate persistent `code_worker` for Green, one active write lease at a time, and a fresh risk-routed reviewer. Retire both workers at the milestone barrier.

For every milestone, the default budget is one preflight, one coherent Red or passing characterization, one Green with optional same-turn Refactor, at most one same-contract correction per role, and one review correction loop. The test worker may use at most three turns: preflight, Red/evidence, and one correction. The code worker may use at most two turns: Green and one correction. Stop after the same decisive failure twice, two no-diff write handoffs, any changed binding field, an invalid Red, a lease violation, external-state contamination, or an exhausted budget. Do not silently convert a milestone into more than one TDD cycle.

No write assignment is parallel-safe in this worktree. Read-only inspection may run concurrently when scopes are independent. TASK-008 or other implementation may proceed only in a separate worktree with an explicit merge order; after integration, repeat only checks invalidated by overlapping API manifest, lockfile, service, configuration, runtime, or import paths.


### Milestone 1: Canonical key, exact summary codec, and cache-aside service


Observable acceptance contract: the fixed `status`, `species`, `gender`, `name`, `origin` traversal, `trim().toLowerCase()` values, blank omission, `{}` empty object, `JSON.stringify` bytes, and SHA-256 digest make equivalent effective filters map to one versioned key and distinct filters map to distinct keys. Only an exact array of `CharacterSummary` values can be decoded. A valid hit bypasses the repository; a miss or malformed entry reaches the repository and replaces the entry; an empty array remains a hit; and read/write/codec rejection emits only the applicable fixed safe warning while preserving the correct PostgreSQL result. Detail and comment calls remain unchanged and never use the cache.

Preflight target: [character-read-service.ts](../../apps/api/src/application/characters/character-read-service.ts), [character-filter.unit.test.ts](../../apps/api/src/application/characters/character-filter.unit.test.ts), and all search-service tests. The test worker must return one ADR-0016 classification for canonicalization, codec, hit, miss, empty, malformed, and injected failure scenarios. Current inspection suggests `PARTIAL` only for existing trim/blank normalization and `MISSING` for cache behavior, but that observation is not the authoritative preflight result.

Test ownership is limited to [character-filter.unit.test.ts](../../apps/api/src/application/characters/character-filter.unit.test.ts) and the new `apps/api/src/application/characters/character-search-cache.unit.test.ts`. Green ownership is limited to [character-read-service.ts](../../apps/api/src/application/characters/character-read-service.ts) and the new `apps/api/src/application/characters/character-search-cache.ts`. GraphQL, Sequelize, runtime, manifest, lockfile, configuration, import, and infrastructure paths are frozen.

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

Preflight target: API and root manifests, lockfile, [compose.yaml](../../compose.yaml), [.env.example](../../.env.example), [config.ts](../../apps/api/src/config.ts), [runtime-composition.ts](../../apps/api/src/runtime-composition.ts), [server.ts](../../apps/api/src/server.ts), existing runtime/config tests, and any Redis path created after this plan. Search absence alone is not a `MISSING` classification; the test worker must also confirm the available Compose and test boundaries.

Test ownership is limited to [config.unit.test.ts](../../apps/api/src/config.unit.test.ts), [runtime-composition.unit.test.ts](../../apps/api/src/runtime-composition.unit.test.ts), and new narrowly scoped tests under `apps/api/src/infrastructure/redis/`. Green ownership is limited to `apps/api/package.json`, `package-lock.json`, [.env.example](../../.env.example), [config.ts](../../apps/api/src/config.ts), [runtime-composition.ts](../../apps/api/src/runtime-composition.ts), [server.ts](../../apps/api/src/server.ts), and new Redis infrastructure source under `apps/api/src/infrastructure/redis/`. The accepted Milestone 1 tests are frozen; GraphQL schema/resolvers, Sequelize, migration, import, web, Compose, and workflow paths are frozen.

Risk is `S2` because this joins process lifecycle, a network boundary, configuration, and externally mutable real Redis. Escalate to `S3` for a retry/reconnect loop, unbounded queue, command continuing past an accepted abort in a way that can violate behavior, process crash from an unhandled client error, credential/detail leakage, shared test namespace, broad cleanup, eager readiness coupling, or any custom identity change from Milestone 1.

Focused unit command after the new paths exist:

    npm exec -- vitest run --config vitest.config.ts --project api-unit apps/api/src/config.unit.test.ts apps/api/src/runtime-composition.unit.test.ts apps/api/src/infrastructure/redis/redis-character-search-cache.unit.test.ts

Focused real-Redis command after `npm run infra:up`:

    npm exec -- vitest run --config vitest.config.ts --project api-persistence-integration apps/api/src/infrastructure/redis/redis-character-search-cache.integration.test.ts

Milestone join:

    npm run test:unit --workspace @rick-and-morty/api
    npm run test:integration --workspace @rick-and-morty/api
    npm run test:application --workspace @rick-and-morty/api
    npm run typecheck
    npm run build --workspace @rick-and-morty/api
    npm run test:smoke
    npm run test:smoke:lifecycle

Real Redis evidence is `Non-reusable` unless its exact container, port, unique namespace, and cleanup state remain pinned. Expected evidence IDs are `T007-M2-PREFLIGHT`, `T007-M2-RED`, `T007-M2-GREEN`, `T007-M2-REDIS`, `T007-M2-JOIN`, `T007-M2-RELEVANCE`, and `T007-M2-REVIEW`. A fresh `independent_reviewer` reviews ordinary S2 behavior; any listed S3 trigger routes to a `critical_reviewer`. Acceptance yields the real-Redis request-path portions of SPEC-012 and HS-013.


### Milestone 3: Scoped post-import invalidation


Observable acceptance contract: after and only after a successful import commit, the production invalidator iterates `<namespace>:characters:search:v1:*` with SCAN, sends non-empty batches to UNLINK, bounds every Redis operation, and never calls KEYS or crosses another namespace. Import, validation, or transaction failure does not invalidate. Redis invalidation failure emits the existing fixed safe warning, keeps the committed PostgreSQL refresh successful, and leaves stale data bounded by the finite TTL.

Preflight target: [character-import-cli.ts](../../apps/api/src/infrastructure/characters/character-import-cli.ts), its existing application and PostgreSQL integration tests, the accepted Milestone 2 Redis adapter, and existing invalidation tests. The already passing TASK-005 post-commit ordering and rejection behavior must be classified `EXISTING_AND_COVERED` if still fresh; do not manufacture another Red for it. Only the missing production SCAN/UNLINK adapter, real Redis isolation, and actual CLI wiring may enter the new Red.

Test ownership is limited to new focused invalidation unit/integration tests under `apps/api/src/infrastructure/redis/` and, only when preflight proves a specific uncovered production join, the existing character-import CLI application test. Green ownership is limited to the accepted Redis adapter/factory and [character-import-cli.ts](../../apps/api/src/infrastructure/characters/character-import-cli.ts). Import service/repository, upstream client, migration, GraphQL, web, manifests, lockfile, Compose, and accepted Milestone 1 tests are frozen.

Risk is `S3` because post-commit cross-system recovery and scoped destructive key removal must preserve committed data and namespace integrity. Escalate for KEYS, FLUSHDB, DEL/UNLINK outside the exact prefix, invalidation before commit, rollback/failure coupling, swallowed close failure, stale values without finite TTL, cursor retry that can loop without a bound, or any PostgreSQL transaction change.

Focused command after the new paths exist:

    npm exec -- vitest run --config vitest.config.ts --project api-unit --project api-application --project api-persistence-integration apps/api/src/infrastructure/redis/redis-character-search-invalidation.unit.test.ts apps/api/src/infrastructure/redis/redis-character-search-invalidation.integration.test.ts apps/api/src/infrastructure/characters/character-import-cli.application.test.ts

Milestone join:

    npm run test:unit --workspace @rick-and-morty/api
    npm run test:application --workspace @rick-and-morty/api
    npm run test:integration --workspace @rick-and-morty/api
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
