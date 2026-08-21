# Persist favorite and comment mutations


This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.

This completed plan decomposes [TASK-008](../../IMPLEMENTATION_PLAN.md#task-008---persist-favorite-and-comment-mutations). The project owner authorized workflow `TASK-008-20260821-01` on 2026-08-21. Implementation, corrected closure evidence, fresh integrated acceptance, authoritative documentation reconciliation, and the task-closure documentation gate pass; the canonical task is `Complete` and this plan is preserved in the completed archive.


## Progress


- [x] (2026-08-21 15:26Z) Read the documentation map, repository policy, ExecPlan convention, worker-first workflow, exact TASK-008 record, mapped requirements, accepted ADRs, routed SPEC/HS rules, current GraphQL/read/runtime composition, PostgreSQL migration and Sequelize boundaries, test projects, and root commands.
- [x] (2026-08-21 15:26Z) Applied the project owner's KISS/YAGNI instruction: planned one coherent backend mutation milestone and one closure milestone, with no new dependency, migration, framework, service process, cache behavior, or UI scope.
- [x] (2026-08-21 15:26Z) Registered this active plan and its navigation/chronology links without changing TASK-008 from `Pending` or editing application, test, generated, manifest, lockfile, migration, or runtime behavior.
- [x] (2026-08-21 15:31Z) Passed focused planning validation: documentation validation checked 71 Markdown files and all stable IDs/scenarios; ADR validation checked 18 ADRs and 38 mapped requirements with only the established unrelated NFR-006 warning; and `git diff --check` passed with line-ending warnings only.
- [x] (2026-08-21 16:12Z) Received explicit project-owner authorization and transitioned TASK-008 to `In progress` under workflow `TASK-008-20260821-01` in the canonical implementation plan, active-plan index, this living plan, and the execution chronology; activation validation remains the next barrier before preflight.
- [x] (2026-08-21 16:14Z) Validated the activation transition: documentation validation passed 71 Markdown files and 123 scenarios, and `git diff --check` passed with line-ending warnings only. No writer started before this barrier.
- [x] (2026-08-21 16:20Z) Published `TASK-008-M1-PREFLIGHT-01` to the persistent test worker and accepted `T008-M1-PREFLIGHT`: mutation behavior and mutation-first Redis isolation are `MISSING`; the relational shape, TASK-006 detail/comment reads, and bounded request-log redaction are `EXISTING_AND_COVERED`. The safe focused preflight passed 8/8 tests with no repository or external-state change.
- [x] (2026-08-21 16:35Z) Accepted and froze corrected `T008-M1-RED`: attempt-1 and correction leases closed compliant, the final four-file contract failed 6/13 only for the absent mutation boundary while seven unaffected tests passed, exact PostgreSQL cleanup passed, Redis remained untouched, and the correction added exact source-field preservation plus missing-character no-write assertions.
- [x] (2026-08-21 17:15Z) Completed Green and the affected-boundary join: both code leases closed compliant, generation/drift passed, corrected focus passed 13/13, exact persistence evidence passed, API unit passed 142/142, API application passed 13/13, corrected root integration passed 76/76, root typecheck passed, and API build passed with exact PostgreSQL/Redis cleanup.
- [x] (2026-08-21 16:47Z) Received project-owner authorization to continue with one exceptional one-file test-contract evidence cycle, followed by the existing code-worker attempt-2 correction and the normal workflow.
- [x] (2026-08-21 16:51Z) Completed owner-authorized support cycle `TASK-008-M1-TYPE-CONTRACT`: one compliant evidence lease changed only the two mock declarations to the service's existing nullable method types, root typecheck passed, behavioral assertions remained unchanged, and the corrected mutation test was re-frozen at SHA-256 `406B79610AF75EEFB0B438CED4075EDEC4265C7D771240AEB2F6008C9E4B5272`.
- [x] (2026-08-21 16:56Z) Accepted corrected focused Green and exact PostgreSQL evidence: code attempt 2 changed only Promise semantics and closed compliant, the frozen focus passed 13/13, and the bounded evidence run named then proved cleanup of database/schema `task_004_b7b7272f272328c5` while the exact Redis namespace remained empty.
- [ ] (2026-08-21 17:00Z) Milestone join attempt 1 stopped at 9/12 integration files and 73/76 tests passing: two Redis tests used an invalid coordinator environment because `REDIS_PORT` was omitted, and TASK-006's detail integration test exposed an obsolete query-only assertion requiring `mutationType` to be null. PostgreSQL and Redis residue are empty; no later join command ran. Owner direction is required because another test edit exceeds the consumed test-role correction budget.
- [x] (2026-08-21 17:04Z) Received project-owner authorization for one exceptional single-file correction to remove the obsolete query-only TASK-006 introspection assertion, rerun the affected integration join with `REDIS_PORT=56400`, and continue the normal TASK-008 workflow.
- [x] (2026-08-21 17:07Z) Accepted the stale-schema correction: the compliant lease removed only five obsolete introspection lines, the TASK-006 detail test passed 1/1, exact database/schema `task_004_52b2db8ea7a174e3` was deleted, Redis remained empty, and all four frozen TASK-008 hashes remained exact.
- [x] (2026-08-21 17:55Z) Completed Milestone 1 through accepted preflight, coherent mutation Red, separate Green, affected validation, exact persistence/cleanup evidence, cumulative relevance, two causal review-correction slices, and closure-permitting fresh S2 confirmation.
- [x] (2026-08-21 17:17Z) Accepted `T008-M1-RELEVANCE` on implementation/test candidate `A13A27E457686B63FE5DF40DF9A1E61E5FF66A8BED7D2D826691D72C170B8FFF`: every changed test has one current contract owner, the stale query-only assertion is removed, no focused, skipped, or deferred test or test-only production branch exists, TASK-006 pagination/order evidence is not duplicated, and no excluded path or artifact entered the candidate.
- [x] (2026-08-21 17:25Z) Fresh S2 review returned `REVISE` with two Majors: the resolver silently hid an unavailable TASK-006 comment service as an empty list, and cache-owner construction failure no longer closed PostgreSQL immediately. Both findings completed separate regression Red/Green slices within the single permitted review-correction loop.
- [x] (2026-08-21 17:31Z) Accepted review-correction slice A Red: the persistent test worker completed a compliant one-file lease, the new unavailable-comments regression failed causally while two prior mutation scenarios passed, exact PostgreSQL/Redis cleanup passed, and the corrected mutation test is frozen at SHA-256 `2DCC2DC4DF57CCC11A324EEBB8363D3C342FEC865868D59508A37880224B85F7` for resolver Green.
- [x] (2026-08-21 17:34Z) Accepted review-correction slice A Green: the separate code worker restored only the prior unavailable-comment-service internal-error branch, the lease closed compliant, the exact mutation integration focus passed 3/3, and database/schema `task_004_90d2360b1e998fb0` plus the Redis prefix were absent after cleanup.
- [x] (2026-08-21 17:36Z) Accepted review-correction slice B Red: a compliant runtime-test lease added one mock-only regression, and the exact unit focus failed only because PostgreSQL had zero immediate close calls after cache-owner construction failed while all four prior runtime tests passed. The runtime test is frozen at SHA-256 `DCE60EB9A81755824C7E3F4D71C998825B8BB8B5CF390780FCF1FC91CDD04F42`.
- [x] (2026-08-21 17:39Z) Accepted review-correction slice B Green: the runtime-only lease closed compliant, a local close-once promise restores immediate cache-construction-failure cleanup without double-close, the exact runtime focus passed 5/5, and the mock-only command contacted no external state.
- [x] (2026-08-21 17:48Z) Accepted refreshed `T008-M1-JOIN` and `T008-M1-RELEVANCE`: GraphQL drift, API unit 143/143, API application 13/13, root integration 77/77, root typecheck, and API build passed; exact PostgreSQL and Redis cleanup passed; the 14-path implementation/test candidate is frozen at SHA-256 `15EA14DDF10F2FE65467A62DDAAD3A0A8B4334A0EDB2E65C95B25BCBA0FD87E2` for same-reviewer confirmation.
- [x] (2026-08-21 17:55Z) Accepted `T008-M1-REVIEW` as `PASS`: the same fresh reviewer independently reproduced candidate `15EA14D...`, confirmed both Majors resolved, authenticated all four correction receipts and refreshed evidence identities, and reported no Blocker, Major, or Minor. Milestone 2 may begin.
- [ ] (2026-08-21 18:00Z) Authoritative closure attempt 1 stopped after root typecheck passed and root build found the repository-owned web GraphQL output stale against the accepted backend schema; no later closure command ran. The result is historical and invalidated by the required generated-artifact synchronization.
- [x] (2026-08-21 18:06Z) Accepted mechanical setup `T008-M2-WEB-GENERATED-SYNC`: one compliant lease changed only `apps/web/src/data/generated/graphql.ts`, adding only generated `Mutation` and exact argument types, with no frontend operation or UI behavior. Web build passed, all frozen inputs remained exact, and the expanded 15-path candidate is SHA-256 `5B2A4E2757DB1E0DD7CAD69CCDA211399EAFCDE76CEA981901058FE4319A20D2`.
- [x] (2026-08-21 18:20Z) Closure restart passed typecheck, build, Tailwind, unit 174/174, integration 77/77, application 25/25, smoke 1/1, lifecycle 7/7, and exact external cleanup, then stopped after two identical documentation-validator failures until owner direction.
- [x] (2026-08-21 18:28Z) Received owner authorization, replaced only the known lowercase deferred-selector evidence wording, and accepted the complete authoritative closure packet: documentation validation passed 71 Markdown files and 123 scenarios, ADR validation passed 18 ADRs and 38 requirements with only the established NFR-006 warning, and `git diff --check` passed with line-ending notices only. Fresh integrated S2 review is next.
- [ ] (2026-08-21 18:39Z) Fresh integrated S2 review returned `REVISE` with one Major: cache-owner construction failure closes PostgreSQL but leaves the resolved initialization reusable, so a later request reaches the already-closed repository. Closure and documentation reconciliation are withheld; the single review-correction budget is already consumed, so owner direction is required before a focused regression Red, separate Green, refreshed evidence, and re-review.
- [x] (2026-08-21 18:43Z) Received project-owner authorization for one narrow integrated-review correction loop: persistent-test-worker terminal-lifecycle regression Red, separate-code-worker Green, refreshed invalidated evidence, and fresh integrated confirmation. No migration, dependency, transaction, authentication, concurrency architecture, TASK-011, or acceptance boundary changes.
- [x] (2026-08-21 18:48Z) Accepted and froze `T008-M2-TERMINAL-LIFECYCLE-RED`: one compliant test-worker lease extended only the existing cache-construction failure test, and the exact unit focus failed 1/5 because a later detail call reached the closed repository and returned `QUERY_AFTER_CLOSE` instead of `CHARACTER_RUNTIME_CLOSED`; the original failure, immediate close, no retry, and later exactly-once shutdown remained passing.
- [x] (2026-08-21 18:51Z) Accepted `T008-M2-TERMINAL-LIFECYCLE-GREEN`: one compliant runtime-only code-worker lease marks the owner terminal before close-once cleanup, the frozen focus passed 5/5, root typecheck passed, all frozen paths remained exact, and no external state was contacted. Refreshed candidate/relevance and invalidated closure evidence remain pending.
- [x] (2026-08-21 18:54Z) Accepted refreshed cumulative relevance and froze corrected 15-path candidate SHA-256 `58A8808786F45D5195FE441FD48D89E1AC0DBA644A37DA75DDCFF41DEDB9413B`; only the authorized runtime source/test hashes changed from the prior candidate, and the negative scope/test audit remains clean. Restart the invalidated closure packet once on this identity.
- [x] (2026-08-21 19:54Z) Accepted the refreshed authoritative closure packet on corrected candidate `58A8808786F45D5195FE441FD48D89E1AC0DBA644A37DA75DDCFF41DEDB9413B`: typecheck, build and both GraphQL drift checks, Tailwind validation, unit 174/174, isolated integration 77/77, application 25/25, Chromium smoke 1/1, Windows lifecycle 7/7, documentation/ADR validation, and diff checking passed. Exact database, schema, Redis-prefix, and port readbacks are empty. Fresh integrated confirmation is next.
- [x] (2026-08-21 20:02Z) Accepted fresh integrated correction confirmation as closure-permitting `PASS`: the independent reviewer reproduced candidate `58A88087...`, authenticated both terminal-lifecycle receipts, independently proved no post-close repository query, matched the refreshed closure/environment/cleanup identities, and found no Blocker, Major, or Minor. Authoritative documentation reconciliation is staged for its gate.
- [x] (2026-08-21 20:12Z) Completed Milestone 2 and TASK-008: the primary reconciled implementation, system, specification, README, review, plan-index, and chronology owners; the active-location documentation gate passed 72 Markdown files/123 scenarios, ADR validation passed 18/38 with only the established NFR-006 warning, and diff checking passed. The canonical task is `Complete`; AC-004/AC-005 and TASK-011 remain unchanged; this plan moved to the completed archive with inbound links repaired.
- [x] (2026-08-21 20:16Z) Validated the completed archive state: documentation validation again passed 72 Markdown files and 123 scenarios, ADR validation passed 18 ADRs and 38 mappings with only the established NFR-006 warning, `git diff --check` passed with line-ending notices only, no active TASK-008 plan link remains, and all 15 accepted product/generated/test per-file hashes remain exact.


## Surprises & Discoveries


- Observation: The accepted migration and Sequelize model boundary already contain `characters.is_favorite`, the `comments` table, its character foreign key, the 1-through-1,000-character database check, timestamps, and the comment lookup index.
  Evidence: [the relational migration](../../../apps/api/src/infrastructure/database/migrations/20260814000000-create-relational-schema.ts) and [the Sequelize persistence adapter](../../../apps/api/src/infrastructure/database/sequelize-persistence.ts). TASK-008 should not add or rewrite a migration unless preflight proves a concrete mismatch and the coordinator explicitly rescopes the work.
- Observation: TASK-006 already exposes `isFavorite` and bounded newest-first comments through the detail query. Mutation acceptance can therefore use that query for readback instead of creating another read model, comment order implementation, or pagination contract.
  Evidence: [character-read-service.ts](../../../apps/api/src/application/characters/character-read-service.ts), [sequelize-character-read-repository.ts](../../../apps/api/src/infrastructure/database/sequelize-character-read-repository.ts), and [graphql-character-detail.integration.test.ts](../../../apps/api/src/transport/graphql/graphql-character-detail.integration.test.ts).
- Observation: The version-controlled schema is deliberately query-only today, and the existing schema application test asserts that `mutationType` is null. That assertion is a current boundary to replace with the exact two ADR-0006 mutations during Red, not historical evidence to preserve unchanged.
  Evidence: [schema.ts](../../../apps/api/src/transport/graphql/schema.ts) and [graphql-summary.application.test.ts](../../../apps/api/src/transport/graphql/graphql-summary.application.test.ts).
- Observation: Redis contains only the character-search summary projection. Favorite and comment state is absent from that projection, so these mutations require neither search-cache invalidation nor a Redis dependency.
  Evidence: [character-search-cache.ts](../../../apps/api/src/application/characters/character-search-cache.ts), [ADR-0006](../../adrs/0006-define-a-use-case-oriented-graphql-contract.md), and TASK-008 validation in the [canonical implementation plan](../../IMPLEMENTATION_PLAN.md#task-008---persist-favorite-and-comment-mutations).
- Observation: ADR-0005 accepts a local single-user demonstration model but explicitly blocks anonymous public deployment until authentication, abuse controls, request-body limits, restricted CORS, rate limiting, and retention receive a new decision.
  Evidence: [ADR-0005](../../adrs/0005-use-single-user-persistence-for-character-interactions.md) and [HS-005](../../specs/HARD_SPEC.feature). TASK-008 must preserve that guard rather than implement a partial authentication system.
- Observation: The accepted runtime already owns PostgreSQL and Redis close-once behavior, but first read-service initialization creates the Redis cache owner when Redis configuration is present even if the first operation is detail-only.
  Evidence: [runtime-composition.ts](../../../apps/api/src/runtime-composition.ts) and [runtime-composition.unit.test.ts](../../../apps/api/src/runtime-composition.unit.test.ts). The accepted Red must prove mutation-first PostgreSQL demand without Redis owner creation or Redis operations; this remains inside the planned runtime-composition surface and adds no cache behavior.
- Observation: The first two Red guard-start attempts rejected explicit forbidden directory roots under the guard's `git check-ignore --no-index` observability rule; neither attempt created a lease contract, active pointer, worker turn, or repository change.
  Evidence: `TASK-008-M1-RED-01` rejected `.github`; `TASK-008-M1-RED-02` rejected `apps/api/src/infrastructure`; direct readback confirmed that neither lease directory exists. The replacement lease uses a new ID, exact allowed and forbidden files, no forbidden directory roots, and the guard's default rejection of every path outside the exact allowlist.
- Observation: The generated and production Green reached 12/13 focused tests, but the service's invalid-comment branch throws synchronously instead of returning the Promise rejection required by its declared async port.
  Evidence: the focused Green failed only `character-interaction-service.unit.test.ts:154`; making `addComment` asynchronous is the smallest same-contract production correction.
- Observation: A coordinator diagnostic `npm run typecheck` after the failed Green exposed two TypeScript errors in the frozen mutation integration test that Vitest transpilation did not detect during Red.
  Evidence: TypeScript rejects `mockResolvedValueOnce(null)` at lines 400-401 because each `vi.fn` inferred a non-null result from its initializer. Correcting the mock's explicit result type requires another test-worker edit after that role's one allowed correction was consumed.
- Observation: Explicitly binding each mutation mock to the existing `CharacterInteractionService` method signature resolves the TypeScript-only incompatibility without changing the accepted Red contract.
  Evidence: lease `TASK-008-M1-TYPE-CONTRACT-EVIDENCE-01` changed only the two `vi.fn` declarations, closed compliant at receipt `5a759baeca67bad0fc2d8a0acfe4935c2fcf1ada454621a01ac770d89515e869`, and root `npm run typecheck` passed.
- Observation: Vitest's successful-run console interception suppressed the mutation test's exact random PostgreSQL namespace even though the test asserted its deletion and the worker independently proved that no `task_004_%` database remained.
  Evidence: corrected focus passed 13/13 and cleanup passed, but the terminal receipt cannot name the transient database. A bounded no-write evidence run with console interception disabled is required before accepting `T008-M1-POSTGRES`; it does not invalidate the focused Green result.
- Observation: The full persistence-integration boundary contains a second obsolete query-only schema assertion outside the accepted four-test Red surface.
  Evidence: `graphql-character-detail.integration.test.ts:724` still expects `__schema.mutationType` to be null and failed after the exact approved Mutation type was added. The same file's TASK-006 detail/comment behavior and cleanup otherwise ran successfully; its current SHA-256 is `231A060386E4BB62A405A974BC846B7158B6EA202CED60477C0A95E3B0511D07`.
- Observation: TASK-007's real-Redis integration tests require `REDIS_PORT`, not only `REDIS_URL`.
  Evidence: the first milestone join omitted `REDIS_PORT` and both Redis tests stopped at `TASK_007_REDIS_TEST_CONFIG_INVALID` before exercising product behavior. This is an invalid environment attempt, not candidate evidence.
- Observation: The favorite mutation's test fixture omitted the comment-read method while selecting `comments`, and Green accommodated it by weakening the production `CharacterDetail.comments` fallback from a reported/redacted internal error to `[]`.
  Evidence: fresh S2 finding 1 cites `resolvers.ts:197-199` and mutation integration line 367. This is a confirmed `REGRESSION`, not required mutation behavior.
- Observation: Reworking runtime composition for mutation-first PostgreSQL access removed the prior immediate PostgreSQL close when `createCacheOwner` throws after PostgreSQL initialization.
  Evidence: fresh S2 finding 2 compares `runtime-composition.ts:155-162` with HEAD's guarded cache-owner construction. This is a distinct confirmed `REGRESSION` in the reused Sequelize lifecycle.
- Observation: The first refreshed PostgreSQL catalog command was shell-tokenized incorrectly, so `psql` ignored most of the query arguments and produced no admissible cleanup conclusion.
  Evidence: that command emitted only `extra command-line argument` warnings. The coordinator preserved it as a failed evidence attempt, reran the exact quoted read-only catalog query successfully, and accepted cleanup only from the corrected zero-row result. The exact Redis namespace scan independently returned zero keys.
- Observation: The backend schema is an input to both API and web code generation, even though TASK-008 adds no frontend mutation document or UI behavior.
  Evidence: root closure build attempt 1 passed typecheck, then web `graphql:check` reported only `apps/web/src/data/generated/graphql.ts` stale. Running the existing generator under a single-file lease added only generated `Mutation`, `MutationAddCharacterCommentArgs`, and `MutationSetCharacterFavoriteArgs`; the existing query operations did not change and web build passed.
- Observation: Documentation validation treats lowercase deferred-test selector names as placeholder text, including inside historical evidence that records negative search results.
  Evidence: the first validator attempt named only this ExecPlan and the execution log. Replacing uppercase marker labels did not remove older lowercase selector spellings, so the second attempt returned the same two-file error. A read-only case-insensitive search identified the remaining exact prose locations; no third attempt ran.
- Observation: Immediate PostgreSQL cleanup after cache-owner construction failure is insufficient when the runtime continues to reuse the resolved initialization promise.
  Evidence: fresh integrated review cites `runtime-composition.ts:163-173` and reproduced a first `CACHE_OWNER_CONSTRUCTION_FAILED`, one close, then a later repository call through the closed owner ending as `QUERY_AFTER_CLOSE`. The current regression at `runtime-composition.unit.test.ts:248` proves immediate exactly-once close and later shutdown only; it does not issue another read or mutation after the failure.


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
- Decision: Activate workflow `TASK-008-20260821-01` and transition TASK-008 to `In progress` on the project owner's explicit authorization.
  Rationale: TASK-006 is complete, every mapped gate is resolved, the active ExecPlan is registered, and the owner authorized implementation, evidence, review, documentation, and closure while preserving its stop conditions and excluded TASK-011 scope.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept `T008-M1-PREFLIGHT` as `MISSING` for the coherent mutation boundary and mutation-first Redis isolation, while reusing existing covered relational, readback, and request-log boundaries.
  Rationale: The worker cited the absent schema, service, repository, resolver, and mutation lifecycle paths; the coordinator reproduced relevant-tree SHA-256 `42F555EA6980B134AE30C08E38157B415822CEB25A0F188DFC89218DBED7C6FD`, confirmed all three proposed production artifacts are absent, and preserved the 8/8 passing preflight command without duplicate execution. No migration, dependency, transaction, authentication, or scope change is indicated.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Withhold final Red acceptance for one attempt-2 correction limited to the real-PostgreSQL mutation test.
  Rationale: Attempt 1 is a valid causal Red and its lease is compliant, but the favorite mutation response and fresh readback do not yet assert the exact source-owned character fields, and the positive-missing-character cases do not yet prove favorite/comment state remains unchanged. Those checks are explicit TASK-008 acceptance obligations, fit the same test path and observable contract, and require no new production or scope boundary.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept corrected `T008-M1-RED` and freeze all four test paths for Green.
  Rationale: Correction lease `TASK-008-M1-RED-CORRECTION-01` changed only the authorized mutation integration test and closed compliant. The exact focused command retained the same six causal failures and seven unaffected passes, the new assertions cover the named obligations, database `task_004_5b0ce36d37c2b6e0` was absent after cleanup, and the Redis prefix was empty. The test-role correction budget is now consumed.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Stop automatic continuation after Green attempt 1 and request project-owner direction before any correction lease.
  Rationale: The code-role same-contract correction remains available, but the milestone cannot pass typecheck without another frozen-test edit and the test-role correction budget is already consumed. The owner's explicit stop condition requires a decision when a correction budget is exhausted; no production or test writer remains active.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Resume through one owner-authorized support cycle `TASK-008-M1-TYPE-CONTRACT`, then use the code role's existing attempt-2 budget.
  Rationale: The owner explicitly said to proceed after receiving the exact blocker and proposed recovery. The support cycle changes only the two mock function type declarations in the existing mutation integration test, adds no behavior or scenario, and uses a distinct evidence-phase lease because the original test-role correction budget and attempt domain are exhausted.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept the type-contract support result and re-freeze the mutation integration test for code correction.
  Rationale: The compliant one-file receipt, exact diff, passing root typecheck, and unchanged assertions prove that the edit repairs test compilation only. The new frozen hash replaces `0F34C541...`; the other three frozen test hashes remain unchanged.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept focused Green behavior and the compliant code correction, while withholding the external-state receipt until the exact transient PostgreSQL identity is captured.
  Rationale: Code attempt 2 changed only `addComment` to be asynchronous, the generated drift check passed, and the exact frozen command passed 4/4 files and 13/13 tests with Redis empty and no database residue. The missing printed namespace is an evidence-observability gap, not a behavior failure; a bounded no-write rerun of the PostgreSQL-backed mutation test is proportional to the owner's exact-evidence instruction.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept `T008-M1-GREEN` and `T008-M1-POSTGRES` and proceed to the milestone join.
  Rationale: The bounded no-write evidence run passed both mutation tests, exposed exact database/schema `task_004_b7b7272f272328c5`, printed its cleanup line, and an independent catalog query proved that exact database absent. The exact Redis prefix also scanned empty. Candidate and frozen tests did not change.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Withhold `T008-M1-JOIN` and request project-owner direction before correcting the stale TASK-006 schema assertion.
  Rationale: The production candidate passed its focus, unit, and application boundaries. Integration attempt 1 has two invalid-environment failures that a corrected `REDIS_PORT=56400` rerun can address, plus one `CONFLICTING` obsolete test assertion that must be removed or updated without changing behavior. The persistent test worker has already consumed its ordinary correction and the owner-authorized type support cycle, so the owner's exhausted-budget stop condition applies. No writer or lease remains active.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Resolve the stale TASK-006 assertion through one owner-authorized test-only correction cycle `TASK-008-M1-STALE-SCHEMA-CONTRACT`.
  Rationale: The project owner explicitly instructed the coordinator to proceed. The correction removes only the obsolete query-only `mutationType` introspection field, type, and expectation from the existing detail integration test; the dedicated TASK-008 schema application test remains the single owner of the exact two-mutation assertion. This changes no product behavior, TASK-006 detail/comment evidence, task scope, or architecture.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept `TASK-008-M1-STALE-SCHEMA-EVIDENCE-01` and resume the interrupted milestone join at root integration.
  Rationale: The lease closed compliant, the exact authorized five-line removal is behavior-neutral for TASK-006, the focused PostgreSQL test and cleanup passed, and the frozen TASK-008 tests did not drift. GraphQL drift, API unit, and API application results remain reusable because their relevant source/test trees and environment identities are unchanged; only root integration must be rerun with corrected Redis configuration.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept `T008-M1-JOIN` and advance to the milestone relevance audit and fresh S2 review.
  Rationale: The corrected root integration command passed all 12 files and 76 tests with the required Redis port, the exact PostgreSQL and Redis cleanup readbacks are empty, and the previously withheld root typecheck and API build passed. The earlier GraphQL drift, API unit, and API application results remain valid because the only intervening change was the stale assertion removal in a persistence-integration test outside their relevant trees.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept `T008-M1-RELEVANCE` and freeze implementation/test candidate `A13A27E457686B63FE5DF40DF9A1E61E5FF66A8BED7D2D826691D72C170B8FFF` for fresh S2 review.
  Rationale: The 14-path aggregate covers the complete production, generated, and test change surface. The service unit test owns normalization and repository delegation; the summary application test owns the exact mutation schema; the mutation integration test owns GraphQL errors and real persistence; the runtime unit test owns PostgreSQL-on-demand and zero-Redis behavior; and the TASK-006 detail test only removes the superseded query-only claim. Searches found no focused, skipped, or deferred tests, test-only production branch, or duplicate comment ordering/pagination assertions. Manifests, lockfile, migrations, models, Redis, web/UI, smoke harness, and CI are unchanged.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept the fresh S2 `REVISE`, retract `T008-M1-RELEVANCE`, and use the single review-correction loop for two serial regression slices.
  Rationale: Both findings are concrete pre-existing behavior regressions in different boundaries, so ADR-0016 requires separate Red/Green causality rather than one accumulated Red. Slice A adds unavailable-comments reporting coverage and a complete mutation fixture before restoring the resolver branch. Slice B adds cache-construction failure cleanup coverage before restoring immediate exactly-once PostgreSQL close. The same persistent test worker and separate code worker retain ownership, leases remain serial, and no review finding expands TASK-008 scope.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept and freeze `T008-M1-REVIEW-COMMENTS-RED` for separate code-worker Green.
  Rationale: Lease `TASK-008-M1-REVIEW-COMMENTS-RED-01` changed only the mutation integration test and closed compliant. The valid favorite fixture now supplies the comment-read method it actually selects, while one separate regression expects the prior reported/redacted internal-error path. The exact command failed only that new scenario because current production returned `comments: []`; prior mocked and real-PostgreSQL mutation scenarios passed and cleanup was exact.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept `T008-M1-REVIEW-COMMENTS-GREEN` and advance serially to cache-cleanup regression Red.
  Rationale: The resolver-only compliant lease restored the exact prior internal-error branch without changing mutation handlers, page semantics, or other transport behavior. The frozen one-file focus passed 3/3 with exact external cleanup. S2 Major 1 is corrected; Major 2 remains open and no joined or review evidence is yet refreshed.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept and freeze `T008-M1-REVIEW-CACHE-CLEANUP-RED` for runtime-only Green.
  Rationale: Lease `TASK-008-M1-REVIEW-CACHE-CLEANUP-RED-01` changed only the runtime unit test and closed compliant. The new regression preserves the injected cache-owner failure, requires immediate PostgreSQL close, and proves later owner shutdown does not double-close. It failed solely at the immediate close assertion with zero calls; all existing cache and mutation-first runtime tests passed and no external state was contacted.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept `T008-M1-REVIEW-CACHE-CLEANUP-GREEN` and refresh the affected milestone join before review confirmation.
  Rationale: The runtime-only compliant lease added one owner-local PostgreSQL close-once promise, calls it immediately when cache-owner construction throws, and reuses it during shutdown. The frozen runtime focus passed 5/5, including existing mutation-first zero-Redis and cache ownership. Both S2 Majors are now corrected in focus; candidate-wide evidence and relevance remain stale until refreshed.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept refreshed `T008-M1-JOIN` and `T008-M1-RELEVANCE`, freeze candidate `15EA14DDF10F2FE65467A62DDAAD3A0A8B4334A0EDB2E65C95B25BCBA0FD87E2`, and return it to the same fresh S2 reviewer for confirmation.
  Rationale: All affected automated boundaries passed after the two regression fixes, exact PostgreSQL and Redis residue checks are empty, and the 14-path relevance audit found no focused, skipped, or deferred tests, unfinished-work marker, excluded path, or duplicate TASK-006 ordering/pagination evidence. The same reviewer must confirm the corrected findings before Milestone 1 can close.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept closure-permitting `T008-M1-REVIEW` and begin Milestone 2 on the unchanged implementation/test candidate.
  Rationale: The same fresh reviewer independently reproduced aggregate `15EA14D...`, matched the four corrected file hashes and all correction receipts, confirmed both prior Majors resolved, and found no Blocker, Major, or Minor across behavior, error handling, persistence, lifecycle, scope, TDD chronology, relevance, or cleanup evidence. The full repository closure packet and fresh integrated task review remain required.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Reject closure attempt 1 as incomplete, accept one mechanical web generated-schema synchronization, and restart the authoritative closure packet on expanded candidate `5B2A4E2757DB1E0DD7CAD69CCDA211399EAFCDE76CEA981901058FE4319A20D2`.
  Rationale: The root build failure is deterministic generated drift caused by the already accepted backend schema. The web generator reads that schema and emits schema types even without a frontend mutation document. Lease `TASK-008-M2-WEB-GENERATED-SYNC-SETUP-02` changed only its owned generated file and added no TASK-011 operation or UI behavior. Candidate drift invalidates the earlier typecheck and permits one complete closure restart under the ExecPlan's invalidation rule.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Stop closure after the second identical documentation-validator failure and request project-owner direction before removing the remaining lowercase selector spellings and running a third attempt.
  Rationale: Product, generated, runtime, smoke, lifecycle, and external-cleanup gates pass on candidate `5B2A4E27...`, but the owner explicitly retained control after repeated identical failures. The remaining correction is narrow and understood, yet automatic continuation would violate that stopping condition. No writer, lease, application listener, temporary database/schema, or Redis key remains active.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept the owner's authorization, complete the validator tail, and freeze `T008-M2-CLOSURE` for fresh integrated S2 acceptance review.
  Rationale: The authorized correction changed only historical evidence wording, removed every case-insensitive placeholder-token match from the two named Markdown files, and did not alter product/runtime bytes or invalidate their evidence. The third documentation attempt, ADR validator, and diff gate now pass. Candidate `5B2A4E27...`, environment identities, and zero-residue readbacks remain exact.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept the fresh integrated `REVISE`, withhold closure, and stop for project-owner direction because the review-correction budget is exhausted.
  Rationale: The reviewer independently authenticated candidate `5B2A4E27...`, all 11 compliant receipts, complete closure evidence, and zero residue, then demonstrated one uncovered shared-lifecycle regression. The smallest correction remains inside the existing runtime boundary: the persistent test worker adds one post-failure terminality regression, the separate code worker makes subsequent reads/mutations reject before repository access, affected and closure evidence refresh, and a fresh confirmation reviews the corrected candidate. No migration, dependency, transaction architecture, authentication, concurrency design, or TASK-011 scope is indicated, but the owner explicitly controls exhausted-budget continuation.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Use the owner's authorization for one integrated-review correction cycle `TASK-008-M2-TERMINAL-LIFECYCLE`.
  Rationale: The authorization covers exactly one regression Red in `runtime-composition.unit.test.ts`, one separate Green in `runtime-composition.ts`, proportional affected validation, invalidated closure refresh, and fresh integrated confirmation. The expected observable contract is terminal failure after cache-owner construction closes PostgreSQL: later reads or mutations reject before any repository call, and shutdown remains exactly-once. This does not authorize retry/reinitialization machinery or broader recovery architecture.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept and freeze `T008-M2-TERMINAL-LIFECYCLE-RED` for runtime-only Green.
  Rationale: Lease `TASK-008-M2-TERMINAL-LIFECYCLE-RED-01` changed only the authorized unit test and closed compliant. The first injected cache failure and immediate exactly-once PostgreSQL close still pass; the later detail request fails causally as `QUERY_AFTER_CLOSE`, and its repository mock records one call. All four other runtime tests pass, cache construction does not retry, and no external state was contacted.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept `T008-M2-TERMINAL-LIFECYCLE-GREEN` and refresh the invalidated closure candidate.
  Rationale: Lease `TASK-008-M2-TERMINAL-LIFECYCLE-GREEN-01` changed only `runtime-composition.ts`, setting the existing terminal flag before immediate close-once cleanup in the cache-owner construction catch. The frozen focus now passes 5/5, including no post-failure repository call, and root typecheck passes. No retry/reinitialization, new error, Refactor, or external-state behavior was added.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept refreshed cumulative relevance and freeze corrected candidate `58A8808786F45D5195FE441FD48D89E1AC0DBA644A37DA75DDCFF41DEDB9413B` for the invalidated closure rerun.
  Rationale: The exact 15-path manifest differs from `5B2A4E27...` only at the owner-authorized runtime test/source paths. Searches found no exclusive, skipped, or deferred selector or unfinished-work marker across API/web source, and the diff contains no retry machinery, unrelated path, UI operation, dependency, migration, model, Redis implementation, or duplicated TASK-006 ordering/pagination evidence.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept refreshed `T008-M2-CLOSURE` and submit corrected candidate `58A8808786F45D5195FE441FD48D89E1AC0DBA644A37DA75DDCFF41DEDB9413B` for integrated confirmation.
  Rationale: Every invalidated authoritative product, runtime, cleanup, documentation, ADR, and diff gate passed on the corrected candidate with the same authenticated Node/npm and PostgreSQL/Redis service identities. Fresh integration namespace `character-app:test:t008-closure-03`, smoke identity `008c105e03aa2026`, seven lifecycle identities, and ports 4173/4174 all read back clean. Task status and documentation reconciliation remain withheld until independent confirmation.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept integrated `PASS` and stage TASK-008 authority reconciliation without advancing AC-004, AC-005, or TASK-011.
  Rationale: The independent reviewer reproduced corrected candidate `58A88087...`, authenticated the two new compliant receipts and refreshed closure packet, directly observed `CACHE_OWNER_CONSTRUCTION_FAILED` followed by terminal `CHARACTER_RUNTIME_CLOSED` with zero post-close queries, and reported no finding. TASK-008's backend outcome is complete; only the documentation gate and subsequent plan archival remain.
  Date/Author: 2026-08-21 / Codex primary coordinator.
- Decision: Accept the task-closure documentation gate and archive this completed ExecPlan.
  Rationale: Every materially affected current-state and navigation owner is reconciled without changing requirement wording, ADR substance, task dependencies, AC-004/AC-005, or TASK-011. Documentation validation passed 72 Markdown files and 123 scenarios, ADR validation passed 18 ADRs and 38 mappings with only the established NFR-006 warning, and diff checking passed. The canonical task was already `Complete`, so PLANS.md now permits the move with repaired links and a final archive-state validation.
  Date/Author: 2026-08-21 / Codex primary coordinator.


## Outcomes & Retrospective


TASK-008 is complete. The exact ADR-0006 backend mutations, validation and redacted errors, PostgreSQL writes and TASK-006 readback, mutation-first zero-Redis behavior, shared lifecycle, terminal failure cleanup, TDD/lease chronology, cumulative relevance, complete authoritative closure, fresh integrated acceptance, and documentation gate all pass on corrected candidate `58A88087...`. KISS/YAGNI held: no migration, dependency, generic mutation framework, cache invalidation, frontend operation/UI, or unrelated refactor was added. AC-004 and AC-005 remain unchecked for TASK-011, minimum-assessment readiness remains 7/12, anonymous public deployment remains blocked by ADR-0005/HS-005, and no commit, push, PR, publication, or deployment occurred.


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


[ADR-0003](../../adrs/0003-use-postgresql-for-relational-persistence.md) owns the relational shape. Character IDs are stable positive upstream integers. `characters.is_favorite` is one global Boolean. `comments` uses an internal generated ID, a restrictive character foreign key, a plain-text body whose trimmed Unicode character count is 1 through 1,000, and timestamps. The current migration already implements this shape.

[ADR-0005](../../adrs/0005-use-single-user-persistence-for-character-interactions.md) owns the interaction model. There are no users, credentials, sessions, ownership rows, or per-user favorites. A repeated deterministic character import must preserve favorite and comment state. Public anonymous deployment remains blocked by HS-005; local portfolio behavior is the only current target.

[ADR-0006](../../adrs/0006-define-a-use-case-oriented-graphql-contract.md) owns the exact mutation names, arguments, return types, positive base-10 identifier validation, expected `BAD_USER_INPUT` and `NOT_FOUND` errors, redacted `INTERNAL_SERVER_ERROR`, thin resolvers, and service/repository dependency direction. Comment validation trims once, counts Unicode code points rather than UTF-16 code units or bytes, rejects lengths outside 1 through 1,000 before persistence, and stores/returns the validated string without interpreting markup.

[ADR-0014](../../adrs/0014-persist-and-deliver-character-image-urls-directly.md) keeps imported character fields source-owned and favorite/comment fields application-owned. TASK-008 neither changes nor fetches image URLs, image bytes, provider data, or browser media behavior. [ADR-0016](../../adrs/0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md) governs preflight, Red, Green, review, relevance, and closure evidence.

The existing API layers are:

- [schema.ts](../../../apps/api/src/transport/graphql/schema.ts), [generated resolver types](../../../apps/api/src/transport/graphql/generated/resolver-types.ts), [resolvers.ts](../../../apps/api/src/transport/graphql/resolvers.ts), and [graphql-handler.ts](../../../apps/api/src/transport/graphql/graphql-handler.ts) for the GraphQL transport;
- [character-read-service.ts](../../../apps/api/src/application/characters/character-read-service.ts) for accepted query coordination;
- [sequelize-character-read-repository.ts](../../../apps/api/src/infrastructure/database/sequelize-character-read-repository.ts) for accepted PostgreSQL reads;
- [runtime-composition.ts](../../../apps/api/src/runtime-composition.ts), [app.ts](../../../apps/api/src/app.ts), and [server.ts](../../../apps/api/src/server.ts) for demand-lazy process ownership and injection;
- [vitest.config.ts](../../../vitest.config.ts) for the existing `api-unit`, `api-application`, and serialized `api-persistence-integration` projects.

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
- update [graphql-summary.application.test.ts](../../../apps/api/src/transport/graphql/graphql-summary.application.test.ts) only to replace the obsolete query-only schema expectation with the exact mutation schema;
- update [runtime-composition.unit.test.ts](../../../apps/api/src/runtime-composition.unit.test.ts) only if preflight proves it is the smallest boundary for same-owner PostgreSQL initialization, close-once behavior, and zero Redis mutation demand.

The proposed minimum Green surface is:

- create `apps/api/src/application/characters/character-interaction-service.ts` with a narrow service/repository port and a specific comment-validation error;
- create `apps/api/src/infrastructure/database/sequelize-character-interaction-repository.ts` with parameterized favorite update and comment insert operations that return `null` for a valid missing character;
- update [schema.ts](../../../apps/api/src/transport/graphql/schema.ts), [generated resolver types](../../../apps/api/src/transport/graphql/generated/resolver-types.ts), [resolvers.ts](../../../apps/api/src/transport/graphql/resolvers.ts), and [graphql-handler.ts](../../../apps/api/src/transport/graphql/graphql-handler.ts);
- extend [app.ts](../../../apps/api/src/app.ts), [runtime-composition.ts](../../../apps/api/src/runtime-composition.ts), and [server.ts](../../../apps/api/src/server.ts) so reads and interactions share one demand-lazy Sequelize lifecycle while Redis remains list-search-demand-only.

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

Activation evidence:

- date/time: `2026-08-21 16:14Z`;
- workflow: `TASK-008-20260821-01`;
- branch and HEAD: `codex/execplan-008` at `e054774d27eb1742acca55866bfd523f16ddcda9`;
- worktree before activation: clean;
- authoritative task state after activation: `TASK-008 In progress`;
- validation: documentation validation passed 71 Markdown files and 123 scenarios; `git diff --check` exited 0 with line-ending warnings only;
- implementation/runtime/acceptance impact: none; AC-004 and AC-005 remain unchecked and TASK-011 remains pending.

`T008-M1-PREFLIGHT` receipt:

- assignment: `TASK-008-M1-PREFLIGHT-01`; persistent owner: `test_worker`; lease: none because the turn was read-only;
- candidate: relevant-tree SHA-256 `42F555EA6980B134AE30C08E38157B415822CEB25A0F188DFC89218DBED7C6FD`; environment SHA-256 `99D34C29082EEC3A84CD43C4E5A0DBECA18A1EC9810773B3EF2F865DE46F6DBB`;
- command: `npm exec -- vitest run --config vitest.config.ts --project api-unit --project api-application apps/api/src/runtime-composition.unit.test.ts apps/api/src/transport/graphql/graphql-summary.application.test.ts` from the repository root;
- result: exit 0; 2 files and 8 tests passed in 7.37 seconds; no PostgreSQL or Redis contact and no repository drift;
- classification: mutations and mutation-first Redis isolation `MISSING`; relational schema, accepted detail/comment readback, and request-log redaction `EXISTING_AND_COVERED`;
- accepted Red surface: create the interaction-service unit test and GraphQL mutation integration test; replace only the obsolete query-only schema assertion; update runtime-composition unit coverage for mutation-first PostgreSQL ownership and zero Redis demand; do not duplicate request-log, comment-order, or pagination coverage;
- touched/unexpected paths: none; documentation impact: none for the read-only preflight.

Invalid Red guard-start attempt:

- requested lease ID: `TASK-008-M1-RED-01`; no contract digest was issued;
- result: exit 2 before lease creation because ignored `.github` cannot be an explicit guard scope;
- readback: no lease directory or active pointer was created, no worker was started, and repository state did not change;
- recovery: the failed ID is retired; the replacement uses a new lease ID with the same semantic packet and omits only the redundant ignored-root projection.

Second invalid Red guard-start attempt:

- requested lease ID: `TASK-008-M1-RED-02`; no contract digest was issued;
- result: exit 2 before lease creation because `apps/api/src/infrastructure` failed the guard's explicit directory-root observability check;
- readback: neither failed lease directory exists, no active pointer or worker was created, and repository state did not change;
- recovery: the failed ID is retired; the replacement packet sets both directory-root lists to `None`, retains exact file-level allow/forbid paths, and relies on default rejection outside the four allowed files.

`T008-M1-RED` attempt-1 receipt:

- assignment/lease: `TASK-008-M1-RED-01` / `TASK-008-M1-RED-03`; contract digest `9790f09e...`; terminal receipt `9111b7148a04fd8be4422d304b422364bebce79643be0b7708acdcb5ec375d7c`;
- paths: two created and two modified test files, exactly matching the lease; no forbidden, unleased, index, HEAD, ignore-control, or post-close drift;
- command: the plan's four-file focused Vitest command with PostgreSQL `55432` and Redis namespace `character-app:test:t008-m1-red-03`;
- result: exit 1; 4 files failed; 6 failed and 7 passed tests in 10.06 seconds; failures were the absent service module, interaction runtime property, Mutation schema, and mutation execution;
- preserved evidence: three existing runtime tests and four unaffected GraphQL summary tests passed; invalid mutation attempts wrote no comment; TASK-006 detail readback remained executable;
- external identity: PostgreSQL database/schema `task_004_1f6d357d82bdc213` was removed and exact readback found it absent; the TASK-008 Redis prefix was empty;
- coordinator disposition: causal Red confirmed but not frozen pending one attempt-2 test-only correction for exact source-field preservation and missing-character no-write assertions.

Corrected `T008-M1-RED` receipt:

- assignment/lease: `TASK-008-M1-RED-CORRECTION-01`; contract digest `96c1abfd...`; terminal receipt `6b9f87357f1281ba39892e9bba1b94dcdfc80aeee5f9685c72af99e8c5bb3ec3`;
- path: only `graphql-character-mutations.integration.test.ts`, corrected SHA-256 `0F34C5411B1A6C311446246C7A9C2058B649831C461930F844CADFB2A16FBE05`; the other frozen test hashes remained `496D78EF...`, `C3D52AA9...`, and `D22D0196...`;
- command/result: the same four-file focused command exited 1 with 6 failed, 7 passed, 13 total tests in 3.02 seconds; failures remained the absent interaction service, runtime owner, Mutation schema, and mutation execution;
- added contract: exact seeded source-owned fields in both favorite responses and fresh detail readback, plus unchanged favorite/comment state after both positive missing-character mutations;
- external identity: fresh database/schema `task_004_5b0ce36d37c2b6e0` was absent after cleanup; Redis namespace `character-app:test:t008-m1-red-correction-01` was empty;
- coordinator disposition: Red accepted and the four test paths are frozen; the test-role correction budget is consumed.

`T008-M1-GREEN` attempt-1 receipt and stop:

- assignment/lease: `TASK-008-M1-GREEN-01`; contract digest `ef3b5a90...`; terminal receipt `cddd97f6cafd4277abe0ad99ae815dda73d13d5ca65c09e5480f0b51c56057e7`;
- paths: exactly nine allowed production/generated paths, with two created and seven modified; no frozen test, forbidden, unleased, index, HEAD, ignore-control, or post-close drift;
- generator: `npm run graphql:generate --workspace @rick-and-morty/api` exited 0 and changed only the allowed generated resolver file;
- focused result: exit 1; 3/4 files and 12/13 tests passed; the only failure is synchronous `InvalidCharacterCommentError` at service test line 154, requiring `addComment` to return a rejected Promise;
- cleanup: no `task_004_%` database remained and Redis namespace `character-app:test:t008-m1-green-01` was empty;
- diagnostic: `npm run typecheck` failed only at `graphql-character-mutations.integration.test.ts:400-401` because the two mocks inferred non-null results and reject `mockResolvedValueOnce(null)`;
- coordinator disposition: Green not accepted. No correction lease opened because the required test edit exceeds the consumed test-role correction budget; project-owner direction is required.

Owner-authorized recovery:

- authorization: project owner instructed the coordinator to proceed on 2026-08-21 after the exhausted-budget blocker was reported;
- support cycle: `TASK-008-M1-TYPE-CONTRACT`, one `test_worker` evidence assignment, one allowed file, and only explicit nullable mock result typing;
- validation: root `npm run typecheck` must pass without altering behavioral assertions; the next code-worker attempt-2 Green must run the full frozen focused command on a fresh PostgreSQL namespace;
- unchanged boundaries: no new product slice, dependency, migration, transaction, auth/security, Redis, UI, test project, acceptance claim, TASK-011 activation, publication, or deployment.

`T008-M1-TYPE-CONTRACT` support receipt:

- assignment/lease: `TASK-008-M1-TYPE-CONTRACT-EVIDENCE-01`; contract digest `4da7dc720368b9625a02c4ec7578209261494b8e9cabe12ae3e9413dc4f1588d`; terminal receipt `5a759baeca67bad0fc2d8a0acfe4935c2fcf1ada454621a01ac770d89515e869`;
- path: only `graphql-character-mutations.integration.test.ts`; no forbidden, unleased, index, HEAD, ignore-control, or post-close drift;
- change: the two mutation mocks are explicitly typed from `CharacterInteractionService["setFavorite"]` and `CharacterInteractionService["addComment"]`; test names, assertions, inputs, and expected results are unchanged;
- validation: root `npm run typecheck` exited 0 for tools, web, API, and shared packages; no PostgreSQL or Redis state was contacted;
- re-frozen hashes: service `496D78EFCCBE3C3363D5966DF955CBC1B7B024BE031773EC22A3CADB95B6F8F1`, mutation integration `406B79610AF75EEFB0B438CED4075EDEC4265C7D771240AEB2F6008C9E4B5272`, summary `C3D52AA97B019A22D7B66AC071BC2898DCBB74D5616AD529DE2DD4C9B595C256`, and runtime `D22D019623A5B11E37C72E450813E0395D664CB1A3EB7EFA3CA4DD5C54B807D1`;
- coordinator disposition: support evidence accepted; the code role's existing attempt-2 correction may proceed against this exact frozen contract.

Corrected `T008-M1-GREEN` receipt:

- assignment/lease: `TASK-008-M1-GREEN-CORRECTION-01`; contract digest `7170f25655994f689829594e8ab0ff79e257c634c2028142f8974e6d0a043efe`; terminal receipt `e2215735e4c68b6862a4203227eb316c4383ab4d90304268102587c76f7d826c`;
- path: only `character-interaction-service.ts`; no forbidden, unleased, index, HEAD, ignore-control, or post-close drift; SHA-256 changed from `1BA35CCE...` to `30D0A169286C66983252DCF67C0E64DA75E687AE076856E5D5172C9874A66E7C`;
- change: `addComment` is asynchronous so invalid input rejects through the declared Promise contract; validation, repository calls, interfaces, schema, resolver behavior, and frozen tests are unchanged;
- generated drift: `npm run graphql:check --workspace @rick-and-morty/api` exited 0;
- focused result: the exact four-file Green command exited 0 with 4/4 files and 13/13 tests passing in 3.10 seconds under PostgreSQL port `55432` and Redis namespace `character-app:test:t008-m1-green-correction-01`;
- cleanup: the integration test's exact deletion assertion passed, independent readback found no `task_004_%` databases, the exact Redis namespace was empty, and mutation-first runtime coverage observed zero Redis-owner demand;
- coordinator disposition: focused Green behavior accepted. `T008-M1-POSTGRES` remains pending only because successful Vitest console interception suppressed the exact transient database name; capture it through one bounded no-write evidence run before the milestone join.

`T008-M1-POSTGRES` exact-state receipt:

- command: the mutation integration file under the existing `api-persistence-integration` project with `--disableConsoleIntercept`, PostgreSQL port `55432`, and Redis namespace `character-app:test:t008-m1-postgres-evidence-01`;
- result: exit 0; 1/1 file and 2/2 tests passed in 2.49 seconds without repository change;
- exact PostgreSQL state: database/schema `task_004_b7b7272f272328c5` was printed at creation and cleanup; a subsequent catalog query against container `8303659b...` returned zero rows for that exact name;
- exact Redis state: SCAN against container `9cce41f8...` returned no keys for `character-app:test:t008-m1-postgres-evidence-01:*`;
- disposition: `T008-M1-GREEN` and `T008-M1-POSTGRES` accepted on the unchanged candidate; the milestone join may proceed once.

`T008-M1-JOIN` attempt-1 stop receipt:

- passed before integration: GraphQL generated drift exit 0; API unit 26/26 files and 142/142 tests in 12.27 seconds; API application 4/4 files and 13/13 tests in 726 ms;
- integration command: root `npm run test:integration` with PostgreSQL port `55432`, Redis namespace `character-app:test:t008-m1-join-01`, and an invalid omission of required `REDIS_PORT=56400`;
- integration result: exit 1 after 146.19 seconds; 9/12 files and 73/76 tests passed. The two TASK-007 Redis tests stopped at configuration validation, and the TASK-006 detail test failed only because line 724 expected `mutationType` to remain null;
- external cleanup: the detail test printed exact database/schema `task_004_614aacfd3cb312c2` and its cleanup line; subsequent catalog readback found no `task_004_%` databases, and exact Redis prefix `character-app:test:t008-m1-join-01:*` scanned empty;
- commands not run: milestone-join root typecheck and API build were correctly withheld after the decisive failure;
- disposition: invalid environment evidence is non-reusable; `T008-M1-JOIN` is not accepted. No writer or lease is active. Project-owner direction is required before one additional test-only correction can remove the obsolete query-only assertion and the integration command can be rerun once with `REDIS_PORT=56400`.

Owner-authorized join recovery:

- authorization: project owner instructed the coordinator to proceed on 2026-08-21 after receiving the exact exhausted-budget blocker and bounded correction proposal;
- cycle: `TASK-008-M1-STALE-SCHEMA-CONTRACT`, one persistent `test_worker` assignment, one allowed existing test file, and no behavioral assertion beyond removing the superseded query-only schema claim;
- validation: the corrected detail integration test must pass with exact PostgreSQL cleanup, then the primary may rerun the interrupted root integration join once with both `REDIS_PORT=56400` and a fresh exact namespace before completing typecheck and API build;
- unchanged boundaries: no production, generated, dependency, migration, transaction, auth/security, Redis implementation, UI, acceptance, TASK-011, commit, push, pull request, publication, or deployment change is authorized.

`TASK-008-M1-STALE-SCHEMA-EVIDENCE-01` receipt:

- lease: contract digest `4f3b346af1c7fe530f6ef1a904a562054ea4efaa1d2d440e742b4a2e91754501`; compliant terminal receipt `24542e678f8b5e59cafbc2e17f1cce0d4fbe5f4ed5458ca83d1a8e4affbbdc10`;
- path/diff: only `graphql-character-detail.integration.test.ts`, five deletions removing the `__schema.mutationType` response type, selection, and null expectation; SHA-256 changed from `231A0603...` to `5777659D715163C90641E22DA9E514A877133FB236DB69032BA8152E70CA0482`;
- validation: the one-file PostgreSQL integration command with console interception disabled exited 0 with 1/1 test passing in 2.33 seconds;
- exact cleanup: database/schema `task_004_52b2db8ea7a174e3` printed its cleanup line and independent catalog readback returned no row; exact Redis namespace `character-app:test:t008-m1-stale-schema-evidence-01:*` scanned empty;
- immutability: the four frozen TASK-008 hashes remained exact; no unexpected path, index, HEAD, ignore-control, or post-close drift;
- disposition: correction accepted. Reuse the unchanged GraphQL drift, API unit 142/142, and API application 13/13 join evidence; rerun root integration once with `REDIS_PORT=56400`, then run the previously withheld root typecheck and API build.

Accepted `T008-M1-JOIN` receipt:

- reused unchanged relevant-tree evidence: GraphQL generated drift exited 0; API unit passed 26/26 files and 142/142 tests in 12.27 seconds; API application passed 4/4 files and 13/13 tests in 726 ms;
- corrected root integration: `npm run test:integration` with PostgreSQL port `55432`, Redis host `127.0.0.1`, Redis port `56400`, and namespace `character-app:test:t008-m1-join-02` exited 0 with 12/12 files and 76/76 tests passing in 144.63 seconds;
- remaining join commands: root `npm run typecheck` exited 0 for tools, web, API, and shared packages; `npm run build --workspace @rick-and-morty/api` exited 0 and included a passing generated-type drift check;
- cleanup: post-run catalog readback found no `task_004_%` database and Redis SCAN found no key under `character-app:test:t008-m1-join-02:*`; containers, images, host ports, Node/npm, branch, HEAD, and empty index matched the recorded milestone environment;
- disposition: `T008-M1-JOIN` accepted. No full repository closure packet was run; proceed to `T008-M1-RELEVANCE` and fresh S2 milestone review.

`T008-M1-RELEVANCE` receipt:

- candidate: SHA-256 `A13A27E457686B63FE5DF40DF9A1E61E5FF66A8BED7D2D826691D72C170B8FFF` over the sorted path/hash manifest for all 14 changed production, generated, and test files;
- current test ownership: service unit for trim/code-point/repository behavior; summary application for exact schema; mutation integration for ID/error/persistence/readback; runtime unit for one PostgreSQL owner and zero Redis; TASK-006 detail integration only for its retained detail/comment contract;
- negative audit: no exclusive, skipped, or deferred test selector, unfinished-work marker, snapshot, obsolete helper, test-only production branch, duplicate TASK-006 newest-first/pagination assertion, focused project, new test project, dependency, migration, model, Redis implementation, web/UI, smoke, CI, or unrelated refactor;
- generated and status audit: generated resolver types match the schema, the index is empty, HEAD remains `e054774d...`, and all changed paths are within the active ExecPlan plus the owner-authorized stale-test correction;
- disposition: relevance audit accepted; candidate frozen for fresh independent S2 milestone review.

`T008-M1-REVIEW` attempt-1 receipt:

- reviewer: fresh read-only `independent_reviewer`; candidate authenticated exactly as `A13A27E457686B63FE5DF40DF9A1E61E5FF66A8BED7D2D826691D72C170B8FFF`; branch, HEAD, empty index, six compliant terminal receipts, and all accepted command/external-state evidence matched;
- verdict: `REVISE`; no Blocker or Minor; two Majors;
- Major 1: `resolvers.ts:197-199` returns `[]` for an unavailable comment service instead of preserving TASK-006's internal report plus redacted `INTERNAL_SERVER_ERROR`; the incomplete mutation fixture at line 367 enabled the weakening;
- Major 2: `runtime-composition.ts:155-162` no longer closes the initialized PostgreSQL owner immediately when cache-owner construction throws, weakening the reused lifecycle;
- passing review areas: exact schema/types, ID and GraphQL error mapping, persistence, comment validation/plain text, SQL parameterization, fresh readback, mutation-first zero Redis, scope exclusions, leases, TDD chronology, and external cleanup;
- disposition: not closure-permitting; Milestone 1 withheld and prior relevance acceptance retracted. Use the one review-correction loop as regression slice A (`TASK-008-M1-REVIEW-COMMENTS`) then slice B (`TASK-008-M1-REVIEW-CACHE-CLEANUP`), refresh affected evidence, and return to the same reviewer for confirmation.

`T008-M1-REVIEW-COMMENTS-RED` receipt:

- assignment/lease: `TASK-008-M1-REVIEW-COMMENTS-RED-01`; contract digest `74f13b8e2bb8c8ddc3448703e2b574f1833a880ebcbe5369c32a8a61f1131070`; compliant terminal receipt `99e33c8f6db10f00f64271a849bccb4882c94af1219ab1df697b44958451a819`;
- path/hash: only `graphql-character-mutations.integration.test.ts`, from `406B7961...` to frozen `2DCC2DC4DF57CCC11A324EEBB8363D3C342FEC865868D59508A37880224B85F7`; no unexpected, forbidden, unleased, index, HEAD, ignore-control, or post-close drift;
- contract: the valid mutation fixture now supplies `comments`; one new regression composes a missing comment service and requires null mutation data, `INTERNAL_SERVER_ERROR`, one unavailable-service diagnostic, no empty success, and redacted client output;
- Red: exact one-file persistence command exited 1 with 1 failed and 2 passed tests in 2.51 seconds; the new regression alone failed because production returned a successful favorite payload with `comments: []` and zero diagnostic calls;
- cleanup: database/schema `task_004_fed81e88440c741c` printed its cleanup line and was independently absent; Redis namespace `character-app:test:t008-m1-review-comments-red-01:*` contained zero keys;
- disposition: valid causal `REGRESSION` Red accepted and frozen. Green may change only `resolvers.ts` to restore the prior unavailable-service internal-error path.

`T008-M1-REVIEW-COMMENTS-GREEN` receipt:

- assignment/lease: `TASK-008-M1-REVIEW-COMMENTS-GREEN-01`; contract digest `55f2c1809076fe59f3e8a00deeb6c5c77b877abc5b2e9874b801779b0b232e99`; compliant terminal receipt `31bfbc34375a7d8d74afe9c4a5afe6f52b448dc6b8f09a6e6fcd123108e83d58`;
- path/change: only `resolvers.ts`, restoring the prior `internalError(new Error("CHARACTER_COMMENT_SERVICE_UNAVAILABLE"), reportUnexpectedError)` branch; resolver SHA-256 changed from `B51BD919...` to `84ACE35CD9C6A0AC1D3CA1BD2943948E3E11E07EA73C93A5077EE2B506BA679B`;
- Green: exact one-file mutation integration command exited 0 with 1/1 file and 3/3 tests passing in 2.62 seconds;
- cleanup: database/schema `task_004_90d2360b1e998fb0` was independently absent and Redis namespace `character-app:test:t008-m1-review-comments-green-01:*` contained zero keys;
- immutability/disposition: all frozen test hashes remained exact and no unexpected path or Refactor occurred. S2 Major 1 corrected; proceed to the separate cache-cleanup regression slice.

`T008-M1-REVIEW-CACHE-CLEANUP-RED` receipt:

- assignment/lease: `TASK-008-M1-REVIEW-CACHE-CLEANUP-RED-01`; contract digest `1e577f0501df1f51b3b7c1b9f3812085efa57aa4d6dba09f90e198c7d65a438a`; compliant terminal receipt `8503c078ca9ff2bcbbbabf8699768545fdcd79e7f7adeb566354cb2b2f7d7881`;
- path/hash: only `runtime-composition.unit.test.ts`, from `D22D0196...` to frozen `DCE60EB9A81755824C7E3F4D71C998825B8BB8B5CF390780FCF1FC91CDD04F42`; no unexpected, forbidden, unleased, index, HEAD, ignore-control, or post-close drift;
- contract: valid Redis configuration, successful PostgreSQL initialization, injected cache-owner construction failure, preserved rejection, immediate one-time PostgreSQL close, and no second close on later owner shutdown;
- Red: exact runtime unit focus exited 1 with 1 failed and 4 passed tests in 625 ms; the new regression alone found zero immediate close calls, while explicit later shutdown closed once;
- external state/disposition: mock-only; no PostgreSQL/Redis process or port contact. Valid causal `REGRESSION` Red accepted and frozen; Green may change only `runtime-composition.ts` to restore immediate exactly-once cleanup without weakening mutation-first zero-Redis behavior.

`T008-M1-REVIEW-CACHE-CLEANUP-GREEN` receipt:

- assignment/lease: `TASK-008-M1-REVIEW-CACHE-CLEANUP-GREEN-01`; contract digest `3318427cdcc8ca8208e1850ebcf7c3ebcc0e0e09074ff1252cbc926c9e431408`; compliant terminal receipt `c13bf32218e0d55d81c3c2019462604e843e19060d4310180fd29325a16b32f9`;
- path/change: only `runtime-composition.ts`, adding an owner-local PostgreSQL close-once promise, using it on cache-owner construction failure, and reusing it during shutdown; source SHA-256 changed from `3FD317CB...` to `A13CF75CDAACCFE23E4720B02C2311B473F00F6DFBB6D6F671418ABF906C7270`;
- Green: exact runtime unit focus exited 0 with 1/1 file and 5/5 tests passing in 632 ms;
- immutability/external state: all frozen test hashes remained exact; no unexpected path, Refactor, PostgreSQL, Redis, or port contact;
- disposition: both S2 Majors corrected in focus. Refresh GraphQL drift, API unit/application/integration, typecheck, API build, external cleanup, candidate fingerprint, and relevance audit before reviewer confirmation.

`T008-M1-REVIEW-JOIN-01` and refreshed `T008-M1-RELEVANCE`:

- candidate: SHA-256 `15EA14DDF10F2FE65467A62DDAAD3A0A8B4334A0EDB2E65C95B25BCBA0FD87E2` over the sorted path/hash manifest for all 14 production, generated, and test paths; branch `codex/execplan-008`, HEAD `e054774d27eb1742acca55866bfd523f16ddcda9`;
- commands from repository root: GraphQL drift exited 0; API unit exited 0 with 26/26 files and 143/143 tests in 12.14 seconds; API application exited 0 with 4/4 files and 13/13 tests in 750 ms; root integration exited 0 with 12/12 files and 77/77 tests in 140.60 seconds; root typecheck exited 0; API build exited 0 and repeated GraphQL drift;
- environment: Node `24.18.0`, npm `11.16.0`, PostgreSQL container `8303659b8373618cfbbe970b65989e7e5bd7642a030f63cfebd8aeaf0b2b072d` on `55432`, Redis container `9cce41f8a1a9f41e815aad62bc73a93797105f8cea9d49b8c78ab0526063d162` on `56400`, exact Redis namespace `character-app:test:t008-m1-review-join-01`;
- cleanup: corrected quoted PostgreSQL catalog query returned zero `task_004_%` databases and Redis SCAN returned zero keys for `character-app:test:t008-m1-review-join-01:*`; the earlier malformed catalog invocation emitted argument warnings and is rejected as cleanup evidence;
- relevance: no exclusive, skipped, or deferred test selector or unfinished-work marker exists under `apps/api/src`; all changed product/test paths are inside the authorized 14-path surface, no dependency/migration/model/Redis/web/UI/smoke/CI/test-project artifact entered the candidate, and TASK-006 pagination/newest-first evidence was not duplicated;
- disposition: refreshed join and relevance accepted; return the unchanged candidate to the same fresh S2 reviewer for confirmation. Milestone 1 remains open until a closure-permitting verdict.

`T008-M1-REVIEW` confirmation:

- reviewer: same fresh read-only `independent_reviewer` used for the initial S2 review; no file was edited and no stateful command was repeated;
- authentication: independently reproduced 14-path aggregate `15EA14DDF10F2FE65467A62DDAAD3A0A8B4334A0EDB2E65C95B25BCBA0FD87E2`, all four corrected file hashes, branch/HEAD, empty index, absent lease pointer, four compliant correction receipts, refreshed command identities, and exact external cleanup;
- findings: prior unavailable-comment-service Major resolved; prior cache-owner-construction cleanup Major resolved; no Blocker, Major, or Minor remains;
- scope: exact ADR-0006 mutations, ID/error mapping, persistence, validation/plain text, parameterized SQL, fresh readback, shared lifecycle, mutation-first zero Redis, KISS/YAGNI, TASK-006 reuse, workflow chronology, relevance, and TASK-011 exclusions all pass;
- disposition: `PASS`, closure-permitting. Accept Milestone 1 and begin Milestone 2; do not infer TASK-008, AC-004, AC-005, or TASK-011 completion.

`T008-M2-CLOSURE-01` failed prerequisite and `T008-M2-WEB-GENERATED-SYNC`:

- closure attempt 1: root `npm run typecheck` exited 0; root `npm run build` then exited 1 at web `graphql:check`, reporting only `src/data/generated/graphql.ts` stale. No API build, Tailwind validation, test suite, smoke/lifecycle, documentation/ADR validator, or diff gate ran;
- failed guard start: lease ID `TASK-008-M2-WEB-GENERATED-SYNC-SETUP-01` was never issued because explicit forbidden root `apps/api` was rejected as unverifiable; no contract digest, active pointer, worker write, or repository change resulted, and that ID was not reused;
- accepted lease: `TASK-008-M2-WEB-GENERATED-SYNC-SETUP-02`, phase `setup`, attempt 1, code worker, contract digest `bd87edb7620e9d8ceb78db9d1622e57702e1ae49d53759a0c57a354600c2b1fb`, compliant terminal receipt `dd27bac35734370883c80f313986a3badcbf96dda8478f75f7a207640eee8fc5`;
- path/change: only `apps/web/src/data/generated/graphql.ts`, SHA-256 `1F64286E55FD139F17861DAD1DA8D2F1C7E0072DA0A3EE19AD63AAEFF5821E66` to `356FBBA8512C8A5B9B0AFE3F9374FCB6386859E0D22F3BE118060A4E5C4189FF`; generator added only `Mutation` and its exact two argument types, with no generated operation or UI/client behavior;
- focused validation: web GraphQL generation exited 0; web build exited 0, including generated drift, 204 transformed Vite modules in 990 ms, and server TypeScript compilation; frozen codegen/query/schema inputs and the 14-path Milestone 1 aggregate remained exact; no external state was contacted;
- candidate: expanded 15-path production/generated/test aggregate SHA-256 `5B2A4E2757DB1E0DD7CAD69CCDA211399EAFCDE76CEA981901058FE4319A20D2`;
- disposition: accept generated synchronization, invalidate every closure-attempt-1 result, and restart the complete authoritative packet once on the expanded candidate.

`T008-M2-CLOSURE-02` partial closure receipt and owner stop:

- candidate/environment: 15-path aggregate `5B2A4E2757DB1E0DD7CAD69CCDA211399EAFCDE76CEA981901058FE4319A20D2`, Node `24.18.0`, npm `11.16.0`, PostgreSQL container `8303659b...` image `432b3b82...` on `55432`, Redis container `9cce41f8...` image `8096655e...` on `56400`;
- root checks: typecheck exited 0; build exited 0 for web and API with both generated drift checks and 204 web modules; Tailwind validation exited 0; unit exited 0 with 32/32 files and 174/174 tests in 17.26 seconds; integration exited 0 with 12/12 files and 77/77 tests in 132.12 seconds; application exited 0 with 6/6 files and 25/25 tests in 1.76 seconds;
- integration state: namespace `character-app:test:t008-closure-02`; corrected catalog and Redis readbacks returned zero `task_004_%` databases and zero exact keys;
- smoke invalid environment: run ID `t008closure02` was rejected before fixture setup as invalid; exact schema/key and ports read back empty, so no candidate evidence was claimed from it;
- smoke pass: valid run ID `008c105e02aa2026`, schema `t010_smoke_008c105e02aa2026`, namespace `character-app:test:t010-smoke-008c105e02aa2026`, PostgreSQL `55432`, Redis `56400`; Chromium passed 1/1 in 3.4 seconds, cleanup lines printed, and independent schema/key/port readbacks were empty;
- lifecycle: default-sandbox attempt passed 5/7 then failed only forced cancellation/interruption because Windows process termination returned access denied; both named PIDs subsequently exited and exact schemas, keys, and ports were empty. Required elevated rerun passed 7/7 with fresh run-owned identities;
- final cleanup: zero `task_004_%` databases, zero `t010_smoke_%` schemas, zero TASK-008/smoke Redis keys, and zero listeners on 4173/4174. One final database query used a mistyped container ID, was rejected, and contributes no evidence; its corrected query returned zero rows;
- documentation tail: attempt 1 checked 71 Markdown files and 123 scenarios but failed only the ExecPlan and execution log for placeholder text. A partial prose correction removed uppercase labels; attempt 2 returned the same two-file error because lowercase deferred-test selector spellings remained. The case-insensitive read-only search identified every remaining occurrence;
- not run: a third documentation validator attempt, ADR validator, `git diff --check`, fresh integrated acceptance review, and closure documentation reconciliation;
- disposition: product/runtime evidence passes and remains reusable while candidate/external identities stay exact, but closure is stopped at the explicit repeated-identical-failure owner boundary. No commit, push, PR, publication, deployment, TASK-011 activation, or task/AC completion is claimed.

`T008-M2-CLOSURE` validator-tail completion:

- owner boundary: the project owner explicitly authorized continuation after the two identical documentation failures;
- correction: replaced only remaining lowercase deferred-selector spellings in historical relevance prose; no product, generated, test, configuration, dependency, migration, runtime, requirement, ADR, task, or acceptance semantics changed;
- documentation attempt 3: exited 0 for 71 Markdown files, 41 requirement IDs, one authorization, 18 tasks, 17 SPEC rules, 20 HS rules, and 123 scenarios;
- ADR validation: exited 0 for 18 ADRs and 38 requirements with only the established NFR-006 unmapped-delivery-constraint warning;
- diff gate: `git diff --check` exited 0 with line-ending notices only;
- evidence reuse: candidate `5B2A4E27...`, Node/npm, container/image/port identities, exact namespaces, and zero-residue state did not change during documentation-only correction, so all preceding product/runtime results remain valid;
- disposition: complete authoritative closure packet accepted and frozen for a fresh integrated S2 acceptance review. TASK-008, AC-004, AC-005, TASK-011, commit, push, PR, publication, and deployment remain unclaimed.

`T008-M2-INTEGRATED-REVIEW-01`:

- reviewer: fresh read-only `independent_reviewer`, distinct from the Milestone 1 reviewer;
- authentication: independently reproduced 15-path aggregate `5B2A4E2757DB1E0DD7CAD69CCDA211399EAFCDE76CEA981901058FE4319A20D2`, branch/HEAD/empty index, all 11 compliant terminal receipts, Node/npm and PostgreSQL/Redis container-image-port identities, full closure command record, and zero temporary database/schema/key/port residue;
- passing areas: task authority and backend-only boundary, exact ADR-0006 schema/types, favorite/comment validation and persistence, errors/readback/SQL binding, mutation-first zero Redis, KISS/YAGNI, TASK-011 exclusions, TDD/lease chronology, generated web schema-only synchronization, invalid-attempt dispositions, cleanup, and documentation-validator recovery;
- Major: `runtime-composition.ts:163-173` closes PostgreSQL after cache-owner construction failure but leaves the resolved initialization reusable while `closing` is false. A later detail read or mutation reaches the closed repository. Existing `runtime-composition.unit.test.ts:248` does not exercise a post-failure operation;
- reproduction: first error `CACHE_OWNER_CONSTRUCTION_FAILED`, closed owner true, one query after close, second error `QUERY_AFTER_CLOSE`;
- findings: no Blocker, one Major, no Minor; verdict `REVISE`;
- disposition: closure and authority reconciliation withheld. The already-consumed review-correction budget requires project-owner direction before one focused regression Red, separate Green, refreshed evidence, and integrated confirmation. No task, AC, TASK-011, commit, push, PR, publication, or deployment state changes.

`T008-M2-TERMINAL-LIFECYCLE-RED`:

- assignment: persistent `test_worker`, lease `TASK-008-M2-TERMINAL-LIFECYCLE-RED-01`, phase `red`, attempt 1, contract digest `499eb3349057f5fb550d498d3d516cee34ec161f3cd79c4a0abb48ea8c3949f6`, compliant receipt `39c2f3b2cb54cfa9758b7266dfd89a42095dc07a5c4ec82dccb1f05f86221305`;
- path/hash: only `apps/api/src/runtime-composition.unit.test.ts`, SHA-256 `DCE60EB9A81755824C7E3F4D71C998825B8BB8B5CF390780FCF1FC91CDD04F42` to `8C493519E8DE3F5D46F56FACDD20488D09B3F95FF8AA67280F7C4ECD65C5CF11`;
- contract: preserve the original `CACHE_OWNER_CONSTRUCTION_FAILED`, immediate PostgreSQL close, no cache-owner retry, and later exactly-once shutdown; require a later detail request to reject `CHARACTER_RUNTIME_CLOSED` before invoking a repository mock that would throw `QUERY_AFTER_CLOSE`;
- Red: exact runtime unit focus exited 1 with one failed and four passed tests in 645 ms. The post-failure detail request received `QUERY_AFTER_CLOSE`, and `findDetail` was called once with ID 2; every preserved assertion passed;
- frozen/external: runtime source remained `A13CF75C...`, mutation test and generated web file remained exact, the index stayed empty, and the mock-only command contacted no PostgreSQL, Redis, network, port, or process;
- disposition: causal regression Red accepted and frozen. Authorize a separate code-worker Green limited to `runtime-composition.ts`.

`T008-M2-TERMINAL-LIFECYCLE-GREEN`:

- assignment: separate `code_worker`, lease `TASK-008-M2-TERMINAL-LIFECYCLE-GREEN-01`, phase `green`, attempt 1, contract digest `ab79317d8d512739fddd7c78e5e1991868fb3fd258ce882c0803e294d7526f6a`, compliant receipt `d3ae7e48c680eb456a3bff3b57514b4e4068ad7a9b001f1e06d419e5e3381a6e`;
- path/hash: only `apps/api/src/runtime-composition.ts`, SHA-256 `A13CF75CDAACCFE23E4720B02C2311B473F00F6DFBB6D6F671418ABF906C7270` to `5D9A6F3A2D513C073B49F44CF946C5C0DAF722AD792AD043DC331B4B802C5303`;
- behavior: cache-owner construction failure now sets the existing terminal flag before immediate close-once PostgreSQL cleanup. Later reads and mutations therefore reject `CHARACTER_RUNTIME_CLOSED` before repository access; the original sentinel, no retry, and later exactly-once shutdown remain intact;
- Green: frozen runtime unit focus exited 0 with 1/1 file and 5/5 tests in 606 ms; root typecheck exited 0 for tools, web, API, and shared; runtime-only diff check passed with a line-ending notice;
- frozen/external: runtime test remained exact at `8C493519...`, mutation test and generated web types remained exact, no unexpected path or Refactor occurred, and the mock/compiler checks contacted no external state;
- disposition: Green accepted. Recompute the 15-path candidate, repeat cumulative relevance, rerun the invalidated closure packet, and obtain fresh integrated confirmation before any authority/status reconciliation.

Refreshed correction candidate and relevance:

- candidate: SHA-256 `58A8808786F45D5195FE441FD48D89E1AC0DBA644A37DA75DDCFF41DEDB9413B` over the same sorted 15-path product/generated/test manifest;
- changed from prior candidate: runtime source `5D9A6F3A...` and runtime test `8C493519...` only; the other 13 path hashes remain exact;
- relevance: no exclusive, skipped, or deferred test selector or unfinished-work marker exists under API/web source; no test-only production branch, retry/reinitialization architecture, excluded artifact, frontend operation, dependency, migration, model, Redis implementation, smoke harness change, new test project, or duplicate TASK-006 pagination/newest-first evidence entered the correction;
- disposition: cumulative relevance accepted. Rerun the invalidated authoritative closure packet once using the same authenticated PostgreSQL/Redis services and fresh run-owned namespaces.

`T008-M2-CLOSURE-03` refreshed authoritative closure receipt:

- candidate/environment: corrected 15-path SHA-256 `58A8808786F45D5195FE441FD48D89E1AC0DBA644A37DA75DDCFF41DEDB9413B`; branch `codex/execplan-008`; HEAD `e054774d27eb1742acca55866bfd523f16ddcda9`; Node `24.18.0`; npm `11.16.0`;
- external services: PostgreSQL container `8303659b8373618cfbbe970b65989e7e5bd7642a030f63cfebd8aeaf0b2b072d`, image `sha256:432b3b824c0769275ec9b0947736ef8b376d6997bcaa9de29818f613819c2feb`, host port `55432`; Redis container `9cce41f8a1a9f41e815aad62bc73a93797105f8cea9d49b8c78ab0526063d162`, image `sha256:8096655e437712b07503796fb64d81359256cfcff0ab29d95a7da72863786efb`, host port `56400`;
- product gates: root typecheck and build exited 0; both GraphQL generated-output checks passed; web Vite transformed 204 modules; Tailwind output validation passed; unit passed 32/32 files and 174/174 tests; application passed 6/6 files and 25/25 tests;
- integration: namespace `character-app:test:t008-closure-03` passed 12/12 files and 77/77 tests; corrected PostgreSQL catalog readback returned zero `task_004_%` databases and exact Redis SCAN returned zero namespace keys;
- browser smoke: run ID `008c105e03aa2026`, schema `t010_smoke_008c105e03aa2026`, and Redis namespace `character-app:test:t010-smoke-008c105e03aa2026` passed Chromium 1/1; exact post-run schema and key scans were empty and ports 4173/4174 had zero listeners;
- lifecycle: the elevated Windows process-lifecycle command passed 7/7 for run IDs `021895e56bbc2fcc`, `79408090f64f1a71`, `997e6b38d77126f7`, `cbec345dc0dcc47f`, `9691bc4f2ba8f66f`, `507890be5d616760`, and `b5e2fa9c8d59535d`;
- final cleanup: zero `task_004_%` databases, zero `t010_smoke_%` schemas, zero closure or smoke Redis keys, and zero listeners on ports 4173/4174;
- repository/documentation: documentation validation passed 71 Markdown files and 123 scenarios; ADR validation passed 18 ADRs and 38 requirements with only the established NFR-006 warning; `git diff --check` passed with line-ending notices only;
- disposition: refreshed closure accepted for independent integrated confirmation. No task/AC completion, TASK-011 activation, commit, push, PR, publication, or deployment is inferred.

`T008-M2-INTEGRATED-REVIEW` correction-confirmation receipt:

- verdict: `PASS`, closure-permitting, with no Blocker, Major, or Minor;
- authentication: independently reproduced corrected candidate `58A8808786F45D5195FE441FD48D89E1AC0DBA644A37DA75DDCFF41DEDB9413B`, runtime test/source hashes `8C493519...` and `5D9A6F3A...`, compliant Red/Green receipts `39c2f3b2...` and `d3ae7e48...`, branch/HEAD, empty index, Node/npm, exact PostgreSQL/Redis container-image-port identities, refreshed closure counts, and zero external residue;
- direct confirmation: first failure `CACHE_OWNER_CONSTRUCTION_FAILED`, PostgreSQL closed, zero query-after-close calls, and later operation rejected `CHARACTER_RUNTIME_CLOSED` while shutdown remained exactly-once;
- scope: exact ADR-0006 mutations, persistence/readback, validation/errors, lifecycle, zero-Redis mutation demand, KISS/YAGNI, generated schema-only web synchronization, cumulative relevance, TDD/lease chronology, TASK-011 exclusion, and AC-004/AC-005 preservation all pass;
- disposition: authorize the primary-owned task-status/documentation reconciliation and gate. Do not infer TASK-011 activation, acceptance-criterion completion, commit, push, PR, publication, or deployment.

`T008-M2-DOCUMENTATION-CLOSURE` receipt:

- impact: updated README status and GraphQL mutation examples, canonical TASK-008 status/evidence, system/specification execution state, dated acceptance review and index, plan index, append-only chronology, and this completed archive; `docs/REQUIREMENTS.md` and ADR decision bytes remain unchanged because AC-004/AC-005 and TASK-011 remain pending;
- active-location gate: documentation validation passed 72 Markdown files and 123 scenarios, ADR validation passed 18 ADRs and 38 requirements with only the established NFR-006 warning, and `git diff --check` passed with line-ending notices only;
- lifecycle: after that gate passed and TASK-008 was `Complete`, this plan moved to `docs/plans/completed/` with all inbound and relative links repaired per PLANS.md;
- archive readback: the same three validators pass again, no active TASK-008 plan link remains, and the accepted 15 product/generated/test per-file SHA-256 values are unchanged;
- disposition: task-closure documentation gate passed and TASK-008 is genuinely complete. Readiness remains 7/12; TASK-011, commit, push, PR, publication, and deployment remain outside this closure.

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

Revision note (2026-08-21): Recorded the project owner's explicit authorization, activated workflow `TASK-008-20260821-01`, and transitioned the canonical task and active-plan owners to `In progress`. No application, test, generated, dependency, migration, runtime, acceptance, TASK-011, publication, or deployment state changed.

Revision note (2026-08-21): Recorded the owner's exceptional authorization to recover from the consumed test-correction budget through one one-file type-contract evidence cycle and then the existing code-worker attempt-2 correction. Scope, architecture, dependencies, migrations, acceptance, TASK-011, and deployment boundaries remain unchanged.

Revision note (2026-08-21): Recorded both S2 regression Red/Green corrections, refreshed the affected milestone evidence, rejected one malformed catalog invocation, accepted exact cleanup from the corrected query, and froze candidate `15EA14D...` for same-reviewer confirmation. TASK-008 remains `In progress`; closure, TASK-011, commit, push, pull request, publication, and deployment remain unclaimed.

Revision note (2026-08-21): Accepted closure-permitting S2 `PASS` after independent reproduction of candidate `15EA14D...`, resolution of both prior Majors, and zero remaining findings. Milestone 1 is complete; Milestone 2 closure evidence, integrated review, documentation reconciliation, and task status remain pending.

Revision note (2026-08-21): Preserved incomplete closure attempt 1, synchronized only the repository-owned web generated schema types under compliant receipt `dd27bac...`, confirmed no frontend mutation operation or UI scope, expanded the candidate to `5B2A4E27...`, and authorized one complete closure restart because candidate drift invalidated the failed attempt.

Revision note (2026-08-21): Recorded the restarted product/runtime closure passes, invalid smoke identity, sandbox-limited lifecycle attempt, elevated 7/7 lifecycle pass, exact zero-residue evidence, and two identical documentation-validator failures. Execution is stopped for owner direction before the known narrow prose correction and third validator attempt.

Revision note (2026-08-21): Recorded owner authorization, validator-safe historical wording, passing documentation/ADR/diff tail, and acceptance of the complete closure packet for fresh integrated review. Product/runtime candidate `5B2A4E27...` and exact external-state identities remain unchanged.

Revision note (2026-08-21): Recorded fresh integrated `REVISE` with one post-cache-construction closed-owner reuse Major, authenticated passing evidence, and the exhausted correction-budget stop. TASK-008 remains `In progress` pending project-owner direction.

Revision note (2026-08-21): Recorded owner authorization for one narrow integrated-review terminal-lifecycle Red/Green correction, refreshed evidence, and fresh confirmation. No other scope or budget was reopened.

Revision note (2026-08-21): Accepted the causal terminal-lifecycle Red under compliant receipt `39c2f3b2...` and froze runtime test SHA-256 `8C493519...` for separate runtime-only Green.

Revision note (2026-08-21): Accepted runtime-only terminal-lifecycle Green under compliant receipt `d3ae7e48...`; focused 5/5 and root typecheck pass, while candidate-wide closure and review evidence remain invalidated pending refresh.

Revision note (2026-08-21): Froze corrected 15-path candidate `58A88087...` after clean cumulative relevance; the invalidated authoritative closure packet and fresh integrated confirmation remain pending.

Revision note (2026-08-21): Accepted refreshed authoritative closure on corrected candidate `58A88087...`: all product, runtime, isolated persistence, browser, lifecycle, cleanup, documentation, ADR, and diff gates pass. TASK-008 remains `In progress` pending integrated confirmation and the primary-owned documentation gate.

Revision note (2026-08-21): Accepted fresh integrated `PASS` with no finding on corrected candidate `58A88087...` and staged the complete backend-only authority reconciliation. AC-004/AC-005 and TASK-011 remain unchanged; the plan stays active only until the documentation gate validates and permits archival.

Revision note (2026-08-21): Passed the primary-owned task-closure documentation gate, marked Milestone 2 and TASK-008 complete, reconciled all affected authorities without advancing AC-004/AC-005 or TASK-011, and moved this plan to the completed archive with repaired relative and inbound links. Final archive-state validation remains the last readback.

Revision note (2026-08-21): Passed final completed-archive validation, confirmed all links and accepted product/test hashes remain exact, and closed TASK-008 with readiness unchanged at 7/12. No further work remains in this ExecPlan.
