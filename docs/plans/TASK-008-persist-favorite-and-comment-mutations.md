# Persist favorite and comment mutations


This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.

This plan decomposes [TASK-008](../IMPLEMENTATION_PLAN.md#task-008---persist-favorite-and-comment-mutations). It was created at the project owner's request on 2026-08-21, but TASK-008 remains `Pending`. Creating and registering this plan does not authorize implementation, change acceptance status, or prove that mutation behavior exists. Execution starts only after separate project-owner authorization and an evidence-linked canonical transition to `In progress`.


## Progress


- [x] (2026-08-21 15:26Z) Read the documentation map, repository policy, ExecPlan convention, worker-first workflow, exact TASK-008 record, mapped requirements, accepted ADRs, routed SPEC/HS rules, current GraphQL/read/runtime composition, PostgreSQL migration and Sequelize boundaries, test projects, and root commands.
- [x] (2026-08-21 15:26Z) Applied the project owner's KISS/YAGNI instruction: planned one coherent backend mutation milestone and one closure milestone, with no new dependency, migration, framework, service process, cache behavior, or UI scope.
- [x] (2026-08-21 15:26Z) Registered this active plan and its navigation/chronology links without changing TASK-008 from `Pending` or editing application, test, generated, manifest, lockfile, migration, or runtime behavior.
- [x] (2026-08-21 15:31Z) Passed focused planning validation: documentation validation checked 71 Markdown files and all stable IDs/scenarios; ADR validation checked 18 ADRs and 38 mapped requirements with only the established unrelated NFR-006 warning; and `git diff --check` passed with line-ending warnings only.
- [ ] Receive separate project-owner authorization, record TASK-008 as `In progress`, publish the workflow identity and first complete Milestone Assignment Packet v2, and start no writer before that transition passes documentation validation.
- [ ] Complete Milestone 1 through preflight, one coherent Red, separate Green with optional local Refactor, affected-scope validation, test-relevance audit, and fresh S2 review.
- [ ] Complete Milestone 2 through the cumulative relevance audit, one authoritative integrated validation packet, fresh integrated acceptance review, and the primary-owned task-closure documentation gate.


## Surprises & Discoveries


- Observation: The accepted migration and Sequelize model boundary already contain `characters.is_favorite`, the `comments` table, its character foreign key, the 1-through-1,000-character database check, timestamps, and the comment lookup index.
  Evidence: [the relational migration](../../apps/api/src/infrastructure/database/migrations/20260814000000-create-relational-schema.ts) and [the Sequelize persistence adapter](../../apps/api/src/infrastructure/database/sequelize-persistence.ts). TASK-008 should not add or rewrite a migration unless preflight proves a concrete mismatch and the coordinator explicitly rescopes the work.
- Observation: TASK-006 already exposes `isFavorite` and bounded newest-first comments through the detail query. Mutation acceptance can therefore use that query for readback instead of creating another read model, comment order implementation, or pagination contract.
  Evidence: [character-read-service.ts](../../apps/api/src/application/characters/character-read-service.ts), [sequelize-character-read-repository.ts](../../apps/api/src/infrastructure/database/sequelize-character-read-repository.ts), and [graphql-character-detail.integration.test.ts](../../apps/api/src/transport/graphql/graphql-character-detail.integration.test.ts).
- Observation: The version-controlled schema is deliberately query-only today, and the existing schema application test asserts that `mutationType` is null. That assertion is a current boundary to replace with the exact two ADR-0006 mutations during Red, not historical evidence to preserve unchanged.
  Evidence: [schema.ts](../../apps/api/src/transport/graphql/schema.ts) and [graphql-summary.application.test.ts](../../apps/api/src/transport/graphql/graphql-summary.application.test.ts).
- Observation: Redis contains only the character-search summary projection. Favorite and comment state is absent from that projection, so these mutations require neither search-cache invalidation nor a Redis dependency.
  Evidence: [character-search-cache.ts](../../apps/api/src/application/characters/character-search-cache.ts), [ADR-0006](../adrs/0006-define-a-use-case-oriented-graphql-contract.md), and TASK-008 validation in the [canonical implementation plan](../IMPLEMENTATION_PLAN.md#task-008---persist-favorite-and-comment-mutations).
- Observation: ADR-0005 accepts a local single-user demonstration model but explicitly blocks anonymous public deployment until authentication, abuse controls, request-body limits, restricted CORS, rate limiting, and retention receive a new decision.
  Evidence: [ADR-0005](../adrs/0005-use-single-user-persistence-for-character-interactions.md) and [HS-005](../specs/HARD_SPEC.feature). TASK-008 must preserve that guard rather than implement a partial authentication system.


## Decision Log


- Decision: Use one coherent production milestone for both `setCharacterFavorite` and `addCharacterComment`, then one closure milestone.
  Rationale: Both operations are fixed by ADR-0006, use the same positive-ID/error mapping, application interaction service, Sequelize/PostgreSQL lifecycle, GraphQL context, and real-persistence boundary. Splitting them would repeat schema, composition, generated-type, runtime, integration, and review work without isolating a different architecture or risk owner. The Red must still make each operation's distinct behavior observable.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Add a narrow character-interaction application port and PostgreSQL adapter while reusing the existing read service and detail/comment queries.
  Rationale: A second read model, a generic command bus, a mutation framework, or a broad rename of the accepted TASK-006 read boundary would add indirection without a present requirement. The write adapter can use parameterized Sequelize queries and return only the existing domain projections required by the two mutations.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Freeze the existing migration, Sequelize model declaration, Redis implementation, manifests, lockfile, web application, and frontend GraphQL operations during the production milestone unless preflight reports a binding contradiction.
  Rationale: The required relational shape and dependencies already exist. TASK-011 owns the detail/favorite/comment UI and explicit post-mutation detail refetch.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Route Milestone 1 as `S2` with the standard nonvisual test-worker/code-worker profile and fresh independent review.
  Rationale: The change accepts untrusted comment text and persists application-owned state through a real database, but it does not introduce irreversible migration work, cross-system deletion, public deployment, authentication, or concurrency control. Any such trigger stops the milestone and requires coordinator rescoping and stronger review.
  Date/Author: 2026-08-21 / Codex primary coordinator.


## Outcomes & Retrospective


Planning is complete; implementation has not started. The repository still has no GraphQL `Mutation` type or mutation runtime evidence, TASK-008 remains `Pending`, AC-004 and AC-005 remain unchecked, and minimum-assessment readiness remains 7/12. Update this section after each accepted milestone and replace this planning-only statement at task closure with exact implementation, validation, review, documentation, and residual-risk results.


## Purpose / Big Picture


TASK-008 adds the backend write half of character interactions. A GraphQL client will be able to set one character's global single-user favorite value and add one trimmed, bounded plain-text comment. PostgreSQL will remain authoritative across API process restarts, and the accepted TASK-006 detail query will show the resulting favorite state and comments.

The observable GraphQL operations are exactly the ADR-0006 contract:

    mutation SetCharacterFavorite($id: ID!, $isFavorite: Boolean!) {
      setCharacterFavorite(id: $id, isFavorite: $isFavorite) {
        id
        isFavorite
      }
    }

    mutation AddCharacterComment($characterId: ID!, $body: String!) {
      addCharacterComment(characterId: $characterId, body: $body) {
        id
        body
      }
    }

This task does not add the browser detail page or controls. TASK-011 will consume these mutations, explicitly refetch the affected detail query, and provide the user-visible evidence needed before AC-004 or AC-005 can pass completely.


## Context and Orientation


[ADR-0003](../adrs/0003-use-postgresql-for-relational-persistence.md) owns the relational shape. Character IDs are stable positive upstream integers. `characters.is_favorite` is one global Boolean. `comments` uses an internal generated ID, a restrictive character foreign key, a plain-text body whose trimmed Unicode character count is 1 through 1,000, and timestamps. The current migration already implements this shape.

[ADR-0005](../adrs/0005-use-single-user-persistence-for-character-interactions.md) owns the interaction model. There are no users, credentials, sessions, ownership rows, or per-user favorites. A repeated deterministic character import must preserve favorite and comment state. Public anonymous deployment remains blocked by HS-005; local portfolio behavior is the only current target.

[ADR-0006](../adrs/0006-define-a-use-case-oriented-graphql-contract.md) owns the exact mutation names, arguments, return types, positive base-10 identifier validation, expected `BAD_USER_INPUT` and `NOT_FOUND` errors, redacted `INTERNAL_SERVER_ERROR`, thin resolvers, and service/repository dependency direction. Comment validation trims once, counts Unicode code points rather than UTF-16 code units or bytes, rejects lengths outside 1 through 1,000 before persistence, and stores/returns the validated string without interpreting markup.

[ADR-0014](../adrs/0014-persist-and-deliver-character-image-urls-directly.md) keeps imported character fields source-owned and favorite/comment fields application-owned. TASK-008 neither changes nor fetches image URLs, image bytes, provider data, or browser media behavior. [ADR-0016](../adrs/0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md) governs preflight, Red, Green, review, relevance, and closure evidence.

The existing API layers are:

- [schema.ts](../../apps/api/src/transport/graphql/schema.ts), [generated resolver types](../../apps/api/src/transport/graphql/generated/resolver-types.ts), [resolvers.ts](../../apps/api/src/transport/graphql/resolvers.ts), and [graphql-handler.ts](../../apps/api/src/transport/graphql/graphql-handler.ts) for the GraphQL transport;
- [character-read-service.ts](../../apps/api/src/application/characters/character-read-service.ts) for accepted query coordination;
- [sequelize-character-read-repository.ts](../../apps/api/src/infrastructure/database/sequelize-character-read-repository.ts) for accepted PostgreSQL reads;
- [runtime-composition.ts](../../apps/api/src/runtime-composition.ts), [app.ts](../../apps/api/src/app.ts), and [server.ts](../../apps/api/src/server.ts) for demand-lazy process ownership and injection;
- [vitest.config.ts](../../vitest.config.ts) for the existing `api-unit`, `api-application`, and serialized `api-persistence-integration` projects.

Real PostgreSQL evidence must use the existing run-owned namespace lifecycle. It is externally mutable and is not reusable unless the command, candidate fingerprint, PostgreSQL service identity, port, exact database/schema identity, and empty cleanup readback all remain pinned.


## Scope and Non-Goals


In scope:

- the exact `setCharacterFavorite(id: ID!, isFavorite: Boolean!): CharacterDetail!` and `addCharacterComment(characterId: ID!, body: String!): Comment!` schema fields;
- generated backend resolver types refreshed only through the existing GraphQL code-generation command;
- thin resolver validation and stable error mapping for malformed IDs, valid missing characters, invalid comment bodies, and unexpected failures;
- one focused application interaction service and one focused Sequelize/PostgreSQL interaction repository, composed with the existing read service over the same process-owned PostgreSQL lifecycle;
- setting favorite state to both `true` and `false`, returning the updated detail, and reading the persisted value after a fresh API composition;
- trimming and validating 1 through 1,000 Unicode code points, preserving markup-like input as inert string data, returning the created comment, and reading it through the existing bounded detail query after a fresh API composition;
- proof that invalid input writes nothing, request logs contain no comment body, mutation failures do not masquerade as durable state, and neither mutation reads, writes, or invalidates Redis search keys;
- affected unit, application, real-PostgreSQL integration, generated-schema, build, closure, review, and documentation evidence.

Out of scope:

- any React route, detail view, favorite control, comment form, optimistic update, generated frontend operation, client-cache mutation helper, or detail refetch; TASK-011 owns those artifacts;
- checking AC-004 or AC-005 before TASK-011 supplies user-visible end-to-end evidence;
- a migration, model redesign, new table, new index, soft delete, comment edit/delete, comment author, timestamp field in GraphQL, total count, or new pagination/order behavior;
- user accounts, authentication, authorization, sessions, per-user favorites, moderation, rate limiting, retention automation, CAPTCHA, or public deployment approval;
- Redis invalidation, mutation caching, search projection changes, cache keys, Pub/Sub, events, queues, background jobs, scheduled synchronization, or upstream API access;
- REST endpoints, Swagger, subscriptions, a command bus, generic repository framework, ORM abstraction, transaction wrapper without a demonstrated multi-statement invariant, or a new test project;
- a dependency, manifest, lockfile, Compose, environment, CI, CSP, image, or browser-harness change.

If preflight finds that the accepted migration is insufficient, the current single-user model cannot meet a required invariant, or correct behavior needs concurrency control or a public-security decision, stop. Do not silently broaden this task.


## Plan of Work


After owner authorization and canonical activation, use workflow ID `TASK-008-20260821-01`. Use the standard nonvisual profile: one persistent `test_worker` owns read-only preflight and the coherent test-side Red; one separate `code_worker` owns Green and an optional behavior-preserving local Refactor; and one fresh `independent_reviewer` owns the S2 milestone review. The primary coordinator alone accepts evidence, publishes write leases, updates authority/status documents, and closes the task.

The default execution budget is one preflight, one coherent Red, one Green, at most one same-contract correction per role, and one review-correction loop. Stop after the same decisive failure twice, two no-diff write handoffs, an invalid Red, changed binding fields, lease violation, unexpected path, external-state residue, or exhausted budget. There is one active write lease at a time. No implementation or test write runs in parallel in this worktree.


### Milestone 1: Complete the backend interaction mutation boundary


Observable acceptance contract: GraphQL publishes exactly the two approved mutation fields. Positive IDs reach the interaction service; malformed, zero, negative, fractional, or unsafe IDs return `BAD_USER_INPUT` before a service call. Favorite writes return the updated `CharacterDetail` and persist both Boolean states. Comment writes trim once, accept exactly 1 through 1,000 Unicode code points, persist and return the validated plain text, and reject empty, whitespace-only, and 1,001-code-point inputs without a write. A positive missing character returns `NOT_FOUND` for either mutation. Unexpected failures are reported internally and returned only as redacted `INTERNAL_SERVER_ERROR`. A newly composed API reads both durable results through the existing detail query. Redis search methods remain untouched.

Preflight must inspect the current schema assertion, resolver validation/error helpers, read service/repository, migration/model boundary, runtime ownership, request logging, generated types, and relevant unit/application/integration tests, then classify each intended scenario using ADR-0016. Current planning evidence suggests `MISSING` for the mutations and `EXISTING_AND_COVERED` for the relational shape and readback, but the test worker's fresh classification is authoritative.

The proposed minimum test write surface is:

- create `apps/api/src/application/characters/character-interaction-service.unit.test.ts`;
- create `apps/api/src/transport/graphql/graphql-character-mutations.integration.test.ts`;
- update [graphql-summary.application.test.ts](../../apps/api/src/transport/graphql/graphql-summary.application.test.ts) only to replace the obsolete query-only schema expectation with the exact mutation schema;
- update [runtime-composition.unit.test.ts](../../apps/api/src/runtime-composition.unit.test.ts) only if preflight proves it is the smallest boundary for same-owner PostgreSQL initialization, close-once behavior, and zero Redis mutation demand.

The proposed minimum Green surface is:

- create `apps/api/src/application/characters/character-interaction-service.ts` with a narrow service/repository port and a specific comment-validation error;
- create `apps/api/src/infrastructure/database/sequelize-character-interaction-repository.ts` with parameterized favorite update and comment insert operations that return `null` for a valid missing character;
- update [schema.ts](../../apps/api/src/transport/graphql/schema.ts), [generated resolver types](../../apps/api/src/transport/graphql/generated/resolver-types.ts), [resolvers.ts](../../apps/api/src/transport/graphql/resolvers.ts), and [graphql-handler.ts](../../apps/api/src/transport/graphql/graphql-handler.ts);
- extend [app.ts](../../apps/api/src/app.ts), [runtime-composition.ts](../../apps/api/src/runtime-composition.ts), and [server.ts](../../apps/api/src/server.ts) so reads and interactions share one demand-lazy Sequelize lifecycle while Redis remains list-search-demand-only.

The migration, Sequelize model declarations, read service/repository, Redis implementation, importer, manifests, lockfile, web application, smoke harness, CI, and documentation remain frozen during Red and Green. A complete guarded packet may narrow the proposed paths; it may not broaden them without a new coordinator preflight and rationale.

Focused Red and Green command after the new test paths exist:

    npm exec -- vitest run --config vitest.config.ts --project api-unit --project api-application --project api-persistence-integration apps/api/src/application/characters/character-interaction-service.unit.test.ts apps/api/src/runtime-composition.unit.test.ts apps/api/src/transport/graphql/graphql-summary.application.test.ts apps/api/src/transport/graphql/graphql-character-mutations.integration.test.ts

Green must refresh generated backend types through the existing command, never by hand:

    npm run graphql:generate --workspace @rick-and-morty/api

Milestone join, once after focused Green and any local Refactor:

    npm run graphql:check --workspace @rick-and-morty/api
    npm run test:unit --workspace @rick-and-morty/api
    npm run test:application --workspace @rick-and-morty/api
    npm run test:integration
    npm run typecheck
    npm run build --workspace @rick-and-morty/api

Expected evidence IDs are `T008-M1-PREFLIGHT`, `T008-M1-RED`, `T008-M1-GREEN`, `T008-M1-POSTGRES`, `T008-M1-JOIN`, `T008-M1-RELEVANCE`, and `T008-M1-REVIEW`. The fresh independent reviewer must return a closure-permitting verdict before Milestone 2. The milestone accepts only backend mutation behavior; it does not complete the UI or AC-004/AC-005.


### Milestone 2: Cumulative evidence and task closure


First perform the ADR-0016 cumulative test-relevance audit over every TASK-008 source, test, fixture, generated artifact, and changed shared boundary. Remove or justify obsolete mocks, helpers, snapshots, focused/skipped tests, duplicated read-order/pagination checks, and test-only branches. Do not create another production TDD slice unless this audit exposes a concrete behavior defect; a defect requires a fresh classification and bounded regression cycle.

Then run one authoritative closure packet on a stable candidate. Reuse a result only when its command, working directory, relevant-tree fingerprint, Node/npm identity, PostgreSQL/Redis service identity, environment, and external namespace state are unchanged. Otherwise run it once with the existing run-owned PostgreSQL/Redis isolation:

    npm run typecheck
    npm run build
    npm run validate:tailwind
    npm run test:unit
    npm run test:integration
    npm run test:application
    npm run test:smoke
    npm run test:smoke:lifecycle
    python -B .agents/skills/verify-repository/scripts/validate_docs.py --repo .
    python -B .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
    git diff --check

The smoke and lifecycle commands are closure regressions for shared API schema/process behavior, not new mutation UI evidence. They run only once at closure unless their candidate or external-state identity changes. Record exact test counts, run-owned database/schema and Redis prefix, cleanup readback, ports, generated drift result, candidate fingerprint, and any invalid attempt separately.

After the closure packet, obtain one fresh integrated S2 acceptance review. If it passes, the primary updates current-state documentation in dependency order, records the review, changes TASK-008 to `Complete`, preserves AC-004 and AC-005 as unchecked until TASK-011, updates the implementation/specification/system/readme owners, appends chronology, moves this plan to `docs/plans/completed/`, repairs inbound links, and runs the documentation/ADR/diff validators again. No commit, push, pull request, publication, public deployment, or TASK-011 activation is inferred.


## Concrete Steps


Run all commands from:

    C:\Users\mmjos\Desktop\workbeanch\rick-and-morty-test

1. Before execution, confirm the branch, HEAD, worktree status, Node/npm versions, Docker availability, PostgreSQL/Redis ports, and that TASK-008 is still `Pending`. Receive explicit owner authorization, append the activation chronology, change only the canonical task/plan status owners to `In progress`, validate documentation, then start preflight.
2. Publish the complete Milestone 1 preflight packet with exact authority anchors, read scope, hashes, commands, environment, stop conditions, budget, and expected handoff. Accept one classification before any write lease.
3. Give the test owner one exact Red lease. Accept Red only when the focused command fails for the intended absent mutation contract and every pre-existing assertion remains meaningful. Freeze the accepted tests and record hashes.
4. Give a separate implementation owner one exact Green lease. Generate resolver types with the repository command, run the focused scope, then run the milestone join once. Use unique PostgreSQL state and prove exact cleanup.
5. Complete the affected relevance audit and fresh S2 review. Correct only a confirmed finding through the bounded workflow; do not add speculative cleanup.
6. Run Milestone 2's cumulative relevance and authoritative closure packet on one stable candidate, obtain fresh integrated review, and perform the primary-owned documentation gate.

If local infrastructure is needed, Docker Desktop's Linux engine must be running before `npm run infra:up`. Use the repository's documented `.env.example` loopback profile. Do not create ad hoc PostgreSQL schemas or Redis keys outside the existing run-owned test lifecycles.


## Validation and Acceptance


TASK-008 is ready for closure only when all of the following are backed by exact repository/runtime evidence:

- schema introspection and generated-type drift prove exactly the two approved mutation fields and no unrelated API surface;
- favorite `true` and `false` writes return updated detail and survive a fresh API/Sequelize composition;
- valid comments are trimmed, measured by Unicode code point count, stored exactly as plain text, returned as `Comment`, and visible through the existing detail query after a fresh composition;
- empty, whitespace-only, and 1,001-code-point comments return `BAD_USER_INPUT` and leave PostgreSQL unchanged; 1- and 1,000-code-point boundaries pass;
- invalid IDs never invoke the application service, and valid missing IDs return `NOT_FOUND` for both mutations;
- injected unexpected failures reach the diagnostic sink while GraphQL returns only `INTERNAL_SERVER_ERROR` without stack, SQL, Redis, secret, path, or comment content;
- the all-Express request record remains one bounded metadata record and contains no GraphQL body, variables, or comment text;
- both writes use PostgreSQL through Sequelize, survive process restart, preserve imported source-owned fields, and require no runtime public Rick and Morty API call;
- mutation execution performs no Redis read, write, unlink, connection demand, or search-cache invalidation;
- no migration, dependency, generic framework, user/auth model, UI, pagination, scheduler, or unrelated refactor enters the candidate;
- focused, affected, full repository, cleanup, generated, documentation, and independent-review gates pass on the same authenticated candidate.

TASK-008 completion proves the backend portions of SPEC-004, SPEC-005, SPEC-008, HS-005, HS-009, and HS-015. It reuses rather than reclaims TASK-006's comment ordering/pagination evidence. AC-004 and AC-005 remain incomplete until TASK-011 proves the detail-view interactions end to end.


## Idempotence and Recovery


Favorite assignment is naturally idempotent when the same Boolean is set repeatedly. Adding a comment is intentionally not idempotent; tests must use fresh isolated PostgreSQL namespaces and must not retry a failed stateful command unless a new packet explicitly invalidates the prior attempt and proves cleanup.

The real-PostgreSQL tests must use the existing namespace helper, migrate from an empty owned namespace, close HTTP and Sequelize resources in `finally`, and delete only their exact database/schema. After each stateful run, record exact absence of owned PostgreSQL state and absence of listeners started by the test. Redis should remain untouched; if a test creates a Redis key, connects a new Redis client, or requires broad cleanup, stop as unexpected scope.

GraphQL generation is repeatable. Run the generator only after the schema changes, review the generated diff, and use `graphql:check` thereafter. Never edit generated resolver types by hand.

Preserve unrelated user changes in a dirty worktree. On a failed Red, Green, build, review, or closure command, retain the first decisive output, stop at the packet's retry boundary, and diagnose before another stateful run. Do not use destructive Git commands, broad database cleanup, `infra:down --volumes`, or forced process exit as recovery shortcuts.


## Artifacts and Notes


Planning baseline:

- date/time: `2026-08-21 15:26Z`;
- branch: `main`;
- HEAD: `20660ca567264ac57e9d7e2691a4ea8bbd41e18a`;
- worktree before registration: clean;
- authoritative task state: `TASK-008 Pending`;
- implementation/runtime evidence created by this plan registration: none.

During execution, preserve concise evidence receipts in this section or link to their authoritative review/log owner. Each receipt must record the candidate fingerprint, exact command and directory, environment and external-state identity, exit result, test count, cleanup readback, write lease/digest, touched and unexpected paths, reused evidence with identity justification, and reviewer verdict. Failed or superseded attempts remain historical evidence and must not be rewritten as passing.


## Interfaces and Dependencies


The intended application boundary is deliberately small:

    interface CharacterInteractionRepository {
      setFavorite(id: number, isFavorite: boolean): Promise<CharacterDetail | null>;
      addComment(characterId: number, body: string): Promise<CharacterComment | null>;
    }

    interface CharacterInteractionService {
      setFavorite(id: number, isFavorite: boolean): Promise<CharacterDetail | null>;
      addComment(characterId: number, body: string): Promise<CharacterComment | null>;
    }

`CharacterDetail` and `CharacterComment` are the existing TASK-006 application projections. The service owns comment trimming and Unicode code-point validation. The repository owns parameterized Sequelize/PostgreSQL writes and strict result decoding. A missing character is represented as `null` at this boundary; resolvers translate it to `NOT_FOUND`. A specific application validation error is translated to `BAD_USER_INPUT`; all other failures pass through the existing redacted unexpected-error path.

The PostgreSQL comment insert should distinguish a missing character without parsing driver-specific foreign-key text. Prefer one parameterized `INSERT ... SELECT ... WHERE EXISTS ... RETURNING` statement unless preflight proves that another existing repository convention is simpler and equally deterministic. The favorite update should use one parameterized `UPDATE ... RETURNING` statement that projects the existing `CharacterDetail` fields. Do not add a transaction wrapper when one statement already provides the required atomic boundary.

Runtime composition must retain one process-owned Sequelize lifecycle shared by read and interaction services. A mutation may initialize PostgreSQL, but it must not initialize or call Redis. Shutdown closes the shared PostgreSQL resource once. No new runtime dependency is expected; the current exact npm packages are sufficient.


Revision note (2026-08-21): Created the initial lean TASK-008 ExecPlan, registered planning without activation, and deliberately limited execution to one backend mutation milestone plus one closure milestone. No implementation, test, dependency, migration, generated artifact, runtime state, acceptance status, or deployment changed.
