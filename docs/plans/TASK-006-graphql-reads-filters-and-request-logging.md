# Expose TASK-006 GraphQL Reads, Filters, and Request Logging


This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.


## Purpose / Big Picture


TASK-006 will turn the existing Express liveness process and migrated PostgreSQL model into the first project-owned product API. When the task is complete, a reviewer can send GraphQL list and owner-reconciled detail queries through Express, observe schema-derived resolver types and explicit PostgreSQL-backed projections, exercise all five required filters with deterministic literal semantics, receive stable redacted errors, and capture one bounded structured record for every completed Express request, including `/healthz` and GraphQL requests. The exact `image_url` already stored in PostgreSQL will be returned as `imageUrl`; no image bytes, asset route, proxy, or upstream character-data query will be introduced.

This plan is planning intent, not implementation evidence. At activation, `GET /healthz`, the TASK-004 migration/model foundation, and the unit, application, integration, and smoke harnesses exist. The API manifest contains no GraphQL runtime or server-side schema-code-generation dependency, `apps/api/src/app.ts` exposes only `/healthz`, `apps/api/src/server.ts` has no product composition, and no schema, generated resolver type, resolver, character read service, business repository, filter implementation, request logger, or product API test exists. The project owner authorized TASK-006 implementation on 2026-08-16, and the canonical task is now `In progress`; activation itself supplies no product behavior or acceptance evidence.


## Progress


- [x] (2026-08-16 18:39Z) Read the documentation map, exact TASK-006 record, mapped requirements, optional dispositions, accepted ADRs, routed SPEC/HS rules, current source and manifests, ExecPlan convention, milestone-slice TDD authority, worker-first workflow, and write-lease guard at clean HEAD `42d53699e9ceb5430576345d3fc3e81fe8a964aa`.
- [x] (2026-08-16 18:39Z) Confirmed that TASK-004 and TASK-017 are `Complete`, DG-006 is `Resolved`, AUTH-001 is `Authorized` within its recorded scope, TASK-005 is not a prerequisite, and TASK-006 is still `Pending` with no execution authorization or implementation evidence.
- [x] (2026-08-16 18:39Z) Created and registered this active ExecPlan, reconciled adopted optional traceability, surfaced the unresolved read-side comment allocation, and added no dependency, schema, route, test, application behavior, task-scope change, task start, gate change, or acceptance claim.
- [x] (2026-08-16 19:00Z) Ran registration validation after integrated correction: documentation validation passed for 54 Markdown files, 41 requirement IDs, 1 authorization, 18 tasks, 17 SPEC rules, 20 HS rules, and 121 scenarios; ADR validation passed for 16 ADRs and 38 requirements with only the established NFR-006 warning; `git diff --check` passed with line-ending conversion warnings only.
- [x] (2026-08-16 19:00Z) Dispositioned the first independent `REVISE`: removed the unapproved comment-read allocation and placeholder command/interfaces, assigned clean-environment proof to the first dependency/build boundary and again to the later production-startup boundary, made invalid comment pagination conditional on canonical ownership, routed Milestone 2 as one aggregate `PARTIAL` cycle, and documented the closed PostgreSQL prerequisite and ownership-safe cleanup.
- [x] (2026-08-16 19:04Z) Fresh independent final-state registration review returned `PASS` with no Blocker, Major, or Minor on plan SHA-256 `6847F6668139E7E2764F9BBBA7780A9E62A5E894B8C09A6816AD45625E6F9E8E`; only the owner reconciliation and separate execution authorization remain as intentional pre-execution joins.
- [x] (2026-08-16 21:15Z) Revised the registered plan at the project owner's direction to preserve the accepted agentic workflow while removing the standalone dependency milestone, localizing the comment-ownership stop, combining detail with its error contract, requiring server-side schema-derived resolver types, covering every Express request in logging, and adding an affected-test relevance check at each milestone join. No implementation or task state changed.
- [x] (2026-08-16 21:28Z) Synchronized the canonical TASK-006 contract, SPEC-013, HS-006, HS-014, specification routing, active-plan index, and append-only execution chronology. Documentation validation passed for 54 Markdown files and 123 scenarios; ADR validation passed for 16 ADRs and 38 mapped requirements with only the established NFR-006 warning; `git diff --check` passed with line-ending conversion warnings only.
- [x] (2026-08-16 21:35Z) Fresh independent review first identified two Minor traceability issues, then returned `PASS` with no Blocker, Major, or Minor after the canonical task folded setup into the summary slice and HS-014 evidence was split accurately between Milestones 3 and 4.
- [x] (2026-08-17 01:29Z) Received the project owner's explicit TASK-006 execution authorization; re-inspected clean branch `agent/task-006-graphql-reads` at HEAD `21f2b5c0dc0fb5f4b11e2bf80da8810c5cbbb8a2`, found no TASK-005 branch or peer worktree and no running task-owned Docker infrastructure, and landed the evidence-linked `In progress` activation across the canonical task, current status, plan index, chronology, and this living plan before any implementation worker or lease.
- [x] (2026-08-17 01:46Z) Re-listed all 39 existing `DPL-DEC-*` IDs immediately before allocating DPL-DEC-040, reconfirmed no TASK-005 branch or peer worktree, and recorded the official-documentation-backed Yoga/GraphQL, checked-in SDL, server resolver-type generation/drift, `/graphql`, and development-only GraphiQL boundary before Milestone 1 tests or source.
- [x] (2026-08-17 02:07Z) Routed Milestone 1 as coordinator-confirmed `PARTIAL`, reused the passing one-test `/healthz` evidence, accepted a guarded five-scenario GraphQL Red after one read-only packet correction, and closed Red lease `TASK-006-20260816-01-M1-red-02` compliant. Guarded Green lease `TASK-006-20260816-01-M1-green-01` then added only the exact five DPL-DEC-040 direct pins, checked-in schema and generated resolver types, thin handler/resolver/application interfaces, and `app.ts` injection seam; the frozen focused test passed 5/5 and `graphql:check` passed.
- [x] (2026-08-17 02:13Z) Completed a no-write compatibility audit at the strict-typecheck stop. Both API-only `--skipLibCheck` and `--strictBuiltinIteratorReturn false` probes removed the five `lru-cache` declaration errors while preserving the same five local Yoga/Express errors. TypeScript documents the former as skipping declaration-file checks while still checking source-referenced types and the latter as disabling a member of the strict family, so the smallest recommendation is an API-local declaration-check exception; it remains unadopted pending explicit owner authorization.
- [x] (2026-08-17 02:32Z) Received explicit owner authorization for DPL-DEC-041, the API-local `skipLibCheck: true` declaration-file exception, one same-contract Green correction, and a post-MVP debt record. Re-listed all 40 prior decision IDs before allocation and limited the correction to `apps/api/tsconfig.json`, `apps/api/src/app.ts`, and `apps/api/src/transport/graphql/graphql-handler.ts`; the accepted test, schema, generated types, manifests, lockfile, and observable contract remain frozen.
- [x] (2026-08-17 02:34Z) Validated the DPL-DEC-041 authority join before worker dispatch: documentation validation passed for 54 Markdown files, 41 requirement IDs, 1 authorization, 18 tasks, 17 SPEC rules, 20 HS rules, and 123 scenarios; ADR validation passed for 16 ADRs and 38 mapped requirements with only the established NFR-006 warning; all 41 DPL IDs are unique and ordered; and `git diff --check` passed with line-ending conversion warnings only.
- [ ] Complete the authorized Milestone 1 correction and mandatory join. The affected application join currently passes 6/6 and schema drift remains clean, but the correction must remove all local Yoga/Express errors and prove root typecheck/build before review, primary commit, clean-checkout proof, milestone acceptance, or downstream preflight.
- [ ] Complete Milestone 1 for the Express-hosted query schema, generated resolver types, summary projection, and preserved liveness contract through one preflight-classified slice.
- [ ] Complete Milestone 2 for the PostgreSQL-backed list and complete five-filter contract through one preflight-classified slice.
- [ ] Complete independent Milestone 3 for one bounded record on every completed Express request, including `/healthz` and GraphQL success/failure paths.
- [ ] Obtain project-owner reconciliation of the TASK-006/TASK-008 bounded-comment ownership ambiguity and update the canonical task/specification routing before Milestone 4, without blocking Milestones 1 through 3.
- [ ] Complete owner-reconciled Milestone 4 for the detail projection, identifier semantics, stable errors, and server/client diagnostic separation.
- [ ] Complete Milestone 5 closure: full semantic test-relevance audit, one authoritative closure packet, risk-routed integrated review, documentation-impact reconciliation, and the task-closure documentation gate.
- [ ] Only after every closure join passes, change TASK-006 to `Complete`, record any evidence-based readiness change without overstating full NFR-003 or overall product acceptance, move this stable plan to `docs/plans/completed/`, repair links, and append closure chronology.


## Surprises & Discoveries


- Observation: TASK-006 became owner-authorized and `In progress` through one coherent activation change, while its prerequisites and bounded authorization remain unchanged. Activation did not add a dependency, schema, route, test, or runtime claim.
  Evidence: `docs/IMPLEMENTATION_PLAN.md#task-status-and-dependency-index`, `docs/IMPLEMENTATION_PLAN.md#task-006---expose-graphql-reads-filters-and-request-logging-through-express`, and the 2026-08-16 activation row in `docs/execution/decision-and-progress-log.md`.
- Observation: The activation baseline has no separate TASK-005 branch or peer worktree, and the Docker engine is unavailable, so no running local Compose project is owned by TASK-005 or TASK-006. Milestone 2 infrastructure remains a future environment prerequisite and cannot reuse activation evidence.
  Evidence: `git worktree list --porcelain`, `git branch --all --list '*task-005*' '*task-006*'`, and `npm run infra:ps` on 2026-08-17 01:29Z.
- Observation: Current `graphql-yoga` 5.21.2 supports Node 24 and direct Express middleware but peers only GraphQL 15 or 16. Current GraphQL 17.0.2 is therefore incompatible with the selected adapter; GraphQL 16.14.2 is the latest compatible 16.x patch.
  Evidence: official Yoga Express/GraphiQL/Node documentation and read-only npm registry metadata checked on 2026-08-16, recorded in DPL-DEC-040.
- Observation: The official Codegen server preset adds module conventions and dependencies intended for larger modular schemas. This milestone needs one schema and one resolver-signature output, so the direct CLI plus TypeScript and TypeScript-resolvers plugins is the smaller complete boundary.
  Evidence: official GraphQL Code Generator server-preset, plugin, local-schema, ESM, and `--check` documentation checked on 2026-08-16, recorded in DPL-DEC-040.
- Observation: The focused GraphQL contract and deterministic schema drift pass, but the first strict join exposed a dependency compatibility gap that registry metadata alone did not reveal. `graphql-yoga` 5.21.2 declares `lru-cache ^10.0.0`, npm resolves 10.4.3, and that package's `Generator<..., void>` map-iterator declarations do not satisfy TypeScript 6's strict `MapIterator<...>` return contract. The same join also found local `Record<string, never>` Yoga generics and untyped Express middleware parameters that remain ordinary same-contract correction work.
  Evidence: `npm run typecheck` on 2026-08-17 02:03Z, `npm ls lru-cache --all`, and the installed `graphql-yoga` 5.21.2 and `lru-cache` 10.4.3 manifests. The application join passed 6/6 and `graphql:check` passed on the unchanged candidate tree.
- Observation: A command-line-only API compile with `--skipLibCheck` removes only the third-party declaration failures and still reports every local implicit-`any` and adapter-generic error. The same probe with `--strictBuiltinIteratorReturn false` also removes the dependency failures, but TypeScript classifies that option inside `strict`; disabling it would weaken source iterator checking. The installed `lru-cache` 11 declaration avoids the `Map` implementation conflict, but forcing it would cross Yoga's declared `^10.0.0` dependency range rather than repair the selected supported graph.
  Evidence: `npm exec -- tsc --noEmit --project apps/api/tsconfig.json --skipLibCheck`, the equivalent `--strictBuiltinIteratorReturn false` probe, the [TypeScript `skipLibCheck` reference](https://www.typescriptlang.org/tsconfig/skipLibCheck.html), the [strict iterator-return reference](https://www.typescriptlang.org/tsconfig/strictBuiltinIteratorReturn.html), and the installed Yoga/lru-cache manifests and declarations on 2026-08-17 02:13Z.
- Observation: The owner authorized the smallest API-local declaration-file exception and requested that its compatibility cost remain visible for possible post-MVP removal. DPL-DEC-041 therefore makes the exception explicit technical debt with a falsifiable exit: delete the flag and pass root typecheck, build, and affected TASK-006 tests on a supported dependency graph.
  Evidence: the owner's 2026-08-16 authorization, DPL-DEC-041, and `docs/IMPLEMENTATION_PLAN.md#deferred-post-mvp-engineering-follow-ups`.
- Observation: The automatic guard prevented two procedural defects from contaminating implementation evidence: the first Red packet stopped read-only on the invalid `NFR-BE-003` token before writing, and the corrected packet used authoritative `NFR-003`; every terminal Red/Green receipt was compliant with no unleased or forbidden path.
  Evidence: terminal leases `TASK-006-20260816-01-M1-red-01`, `TASK-006-20260816-01-M1-red-02`, and `TASK-006-20260816-01-M1-green-01`.
- Observation: TASK-005 may run in parallel but is not a TASK-006 prerequisite. Real PostgreSQL tests can create deterministic characters and, if owner-assigned, comments directly in a run-owned migrated namespace, so this plan must neither wait for the importer nor call the live public Rick and Morty API.
  Evidence: the TASK-006 prerequisite text in `docs/IMPLEMENTATION_PLAN.md`, `vitest.config.ts`, and `apps/api/src/infrastructure/database/postgres-lifecycle.ts`.
- Observation: the current liveness behavior is `EXISTING_AND_COVERED`; manufacturing a Red for it would violate ADR-0016. The product GraphQL boundary is absent, while the absence of image asset/proxy routes is existing but not directly covered.
  Evidence: `apps/api/src/app.ts`, `apps/api/src/app.application.test.ts`, and the absence of GraphQL packages or source in `apps/api/package.json` and `apps/api/src/`.
- Observation: At registration, FR-BE-006 and AC-011 required request middleware for each request while SPEC-013 supplied only a GraphQL example. Derived examples could not narrow mandatory scope, so this revision synchronized SPEC-013 and HS-014 around an Express-wide logger that proves at least `/healthz` plus GraphQL success and failure without changing liveness into readiness.
  Evidence: `docs/REQUIREMENTS.md`, revised SPEC-013 and HS-014, `docs/SYSTEM_DIAGRAM.md`, and the former GraphQL-only wording in this plan.
- Observation: ADR-0002 requires GraphQL resolver types, not only future frontend operation types, to be generated from the version-controlled schema. The former standalone dependency milestone omitted that accepted build contract.
  Evidence: ADR-0002 and `docs/SYSTEM_DIAGRAM.md`; the current API manifest has no GraphQL code-generation dependency or command.
- Observation: the task records split comment reads ambiguously. TASK-006 promises a detail query whose ADR-0006 projection includes bounded comments, while TASK-008 explicitly owns deterministic comment ordering and pagination. An ExecPlan cannot change either task's scope, so the conflict requires owner-controlled canonical reconciliation before the detail/error Red and task closure.
  Evidence: ADR-0006, SPEC-008, HS-008, HS-009, and the TASK-006/TASK-008 records in `docs/IMPLEMENTATION_PLAN.md`.
- Observation: ADR-0016 and the implementation roadmap stop only work dependent on `CONFLICTING` evidence. Summary, list/filter, and Express-wide logging do not allocate comment reads, so the unresolved detail join must not block their milestones.
  Evidence: ADR-0016's `CONFLICTING` route and `docs/IMPLEMENTATION_PLAN.md#roadmap-role-and-ai-assistant-execution-model`.
- Observation: publishing ADR-0006's complete schema before its mutation owner runs would expose unusable fields. TASK-006 therefore stages a query-only checked-in schema, and TASK-008 adds `Mutation` after its own Red. This is incremental implementation of one accepted contract, not a competing schema.
  Evidence: ADR-0006's schema and the canonical statement that TASK-006 owns queries while TASK-008 owns mutations.
- Observation: adding product database composition must not turn `/healthz` into readiness or make the TASK-003 smoke require PostgreSQL. Runtime composition must be lazy: API startup and `/healthz` do not authenticate PostgreSQL, apply migrations, import data, or query a store.
  Evidence: ADR-0011's smoke boundary, `docs/IMPLEMENTATION_PLAN.md#task-003---establish-the-operational-walking-skeleton`, and current `apps/api/src/server.ts`.
- Observation: TASK-006's local mapped-scope line omitted adopted OR-001, OR-007, and OR-008 even though the optional-disposition and requirement-coverage owners assign strict TypeScript, character-search unit coverage, and the selected use-case/service boundary to this work. Registration repairs that trace only; OR-003 and OR-004 remain frontend-owned.
  Evidence: `docs/adrs/README.md#optional-scope-decisions` and `docs/IMPLEMENTATION_PLAN.md#requirement-to-task-coverage`.
- Observation: the GraphQL runtime, schema, server-side type generation, Express handler, and summary projection share one first observable transport contract. Installing dependencies in a separate zero-yield milestone would create an extra clean-environment and review barrier without adding a requirement outcome; dependency/setup work belongs to the minimum Green for that transport slice.
  Evidence: the plan-implementation vertical-outcome rule, ADR-0016's coherent-slice definition, and the former Milestone 1 acceptance yield of no SPEC, HS, FR, or AC.
- Observation: Milestone 1 cannot combine a GraphQL Red with a separate passing-characterization write under one ADR-0016 assignment. The coherent route is coordinator-confirmed `PARTIAL`: reuse existing `/healthz` coverage, inspect image/proxy absence as negative scope, and Red only the missing GraphQL summary contract.
  Evidence: ADR-0016 and `.codex/execplan-implementation-workflow.md` require exactly one preflight classification and one `evidence` or `red` test phase per milestone packet.


## Decision Log


- Decision: Register the plan without starting TASK-006.
  Rationale: Plan creation is documentation evidence only. The worker-first flow activates only after separate owner authorization and canonical `In progress` state.
  Date/Author: 2026-08-16 / Codex primary coordinator.
- Decision: Treat TASK-006 as an implementation plan, not consequential decision work; omit a Decision Review Contract.
  Rationale: DG-006 is already resolved and AUTH-001 is already Authorized. The remaining package, route, record-shape, and any owner-assigned ordering choices are reversible execution decisions recorded in the global decision log, not a new ADR or gate.
  Date/Author: 2026-08-16 / Codex primary coordinator.
- Decision: Before owner reconciliation, freeze only the undisputed query subset: `characters`, `CharacterFilter`, and `CharacterSummary`. Milestones 1 through 3 may implement that subset and Express-wide logging after execution authorization. After the owner updates the canonical task/specification allocation, revise Milestone 4 to name the approved detail fields and types. TASK-006 never exposes `Mutation`, mutation names, or placeholder mutation resolvers.
  Rationale: TASK-008 owns mutations, while the current records disagree about the bounded-comment part of the detail read. Publishing unallocated detail fields or unusable mutation fields would be misleading implementation evidence and would weaken schema/runtime alignment.
  Date/Author: 2026-08-16 / Codex primary coordinator.
- Decision: Do not allocate bounded comment reads unilaterally in this ExecPlan. Require the project owner to reconcile the canonical TASK-006/TASK-008 records and routed specifications before Milestone 4 and task closure, while allowing unrelated summary, filter, and logging work to continue after execution authorization.
  Rationale: TASK-006's detail outcome and ADR-0006 support a read-side allocation, while TASK-008 explicitly owns ordering/pagination. `PLANS.md` prohibits an ExecPlan from changing task scope, and ADR-0016 stops only dependent `CONFLICTING` work.
  Date/Author: 2026-08-16 / Codex primary coordinator.
- Decision: Supersede the registration-era global comment barrier and standalone dependency milestone with four behavioral milestones plus closure.
  Rationale: the earlier barrier serialized independent work, and the separate setup milestone produced no requirement or acceptance yield. The revised milestones preserve every worker-first invariant while aligning recurring coordination cost with observable product outcomes.
  Date/Author: 2026-08-16 / Codex primary coordinator.
- Decision: Implement server-side GraphQL resolver type generation in Milestone 1 and defer frontend client-operation generation to TASK-009.
  Rationale: ADR-0002 requires both categories to derive from the version-controlled schema, but TASK-006 owns only the server schema and resolver boundary. Generated artifacts are never hand-edited, and a deterministic generation/drift check joins typecheck and build.
  Date/Author: 2026-08-16 / Codex primary coordinator.
- Decision: Interpret FR-BE-006 literally as one bounded record for every completed Express request, not only GraphQL requests.
  Rationale: mandatory requirement wording outranks SPEC-013's narrower example. `/healthz` proves the non-GraphQL case while retaining its existing response and liveness-only meaning; safely unavailable GraphQL metadata is recorded as the DPL-defined null/absent value.
  Date/Author: 2026-08-16 / Codex primary coordinator.
- Decision: Reuse the existing `api-unit`, `api-application`, and serial `api-persistence-integration` Vitest projects rather than create another runner project.
  Rationale: Their current include patterns and environments already own the needed unit, in-process Express, and real-PostgreSQL boundaries. New runner configuration would add no isolation or evidentiary value.
  Date/Author: 2026-08-16 / Codex primary coordinator.
- Decision: Route Milestone 1 as one coordinator-confirmed `PARTIAL` cycle and require clean-checkout or hosted evidence at Milestone 1's first manifest/dependency/build boundary and Milestone 2's later production-composition/startup boundary.
  Rationale: ADR-0016 requires clean-environment proof at the first milestone that changes each distinct boundary. Combining dependency setup with the transport Green removes a zero-yield milestone without pretending that later startup evidence can reuse an earlier tree after production composition changes.
  Date/Author: 2026-08-16 / Codex primary coordinator.
- Decision: Group reversible choices into milestone-local DPL records: GraphQL transport/schema/type generation before Milestone 1, request-record shape before Milestone 3, and any owner-assigned comment tie-breaker before Milestone 4.
  Rationale: these choices are needed before dependent tests but do not require one durable record per key, unit, or rounding detail. Grouped decisions preserve traceability without letting the decision log dominate a small portfolio feature.
  Date/Author: 2026-08-16 / Codex primary coordinator.
- Decision: Do not change the root README merely to register this plan.
  Rationale: TASK-006 remains `Pending`, the repository still has no GraphQL product API, and `docs/plans/README.md` is the navigation owner for active plans. Root status changes when authoritative state or implementation evidence changes.
  Date/Author: 2026-08-16 / Codex primary coordinator.
- Decision: Activate TASK-006 from the owner's 2026-08-16 directive and keep Milestone 4's comment-read conflict as the only owner-controlled behavior barrier.
  Rationale: TASK-004 and TASK-017 remain `Complete`, DG-006 remains `Resolved`, AUTH-001 remains `Authorized` within its exact direct-URL scope, and the directive explicitly authorizes Milestones 1 through 3 while withholding the Milestone 4 allocation decision. Activation changes task/execution state only and does not create implementation evidence.
  Date/Author: 2026-08-16 / Codex primary coordinator.
- Decision: Adopt the exact Milestone 1 GraphQL transport, schema, resolver-type generation, endpoint, and explorer boundary recorded in DPL-DEC-040.
  Rationale: Yoga is the smallest current official direct Express 5 integration, its peer range fixes GraphQL 16.14.2, a pluckable checked-in TypeScript SDL literal avoids a runtime copy/loader, and direct Codegen plugins generate one resolver-signature file with a documented dry-run drift check without adding modular-preset or watch machinery.
  Date/Author: 2026-08-16 / Codex primary coordinator.
- Decision: Stop Milestone 1 before the single permitted Green correction rather than silently relax strict compiler policy, force `lru-cache` across Yoga's declared major-version range, or replace the recorded GraphQL runtime.
  Rationale: each route changes a packet or DPL binding beyond the accepted Green even though the observable test contract is unchanged. The owner-authorized workflow requires an explicit compatibility disposition at a binding-field stop; local adapter generic fixes alone cannot make the mandatory strict join pass.
  Date/Author: 2026-08-16 / Codex primary coordinator.
- Decision: Adopt DPL-DEC-041's `skipLibCheck: true` only in `apps/api/tsconfig.json`, retain all strict source checks, and track removal as a non-MVP-blocking engineering follow-up.
  Rationale: the no-write probe proves that the exception skips the incompatible third-party declarations while continuing to reject every local source typing defect; generated resolver types are ordinary `.ts` and remain checked. This is narrower and lower runtime risk than disabling a strict-family source check, forcing an undeclared transitive major, or replacing the selected GraphQL runtime. The owner explicitly authorized the exception and requested a post-MVP debt record, so the canonical plan and DPL now preserve its objective retirement check.
  Date/Author: 2026-08-16 / Project owner and Codex primary coordinator.


## Outcomes & Retrospective


Milestone 1 has an uncommitted guarded candidate, not accepted milestone evidence. The coordinator accepted `PARTIAL`, reused unchanged `/healthz` coverage, confirmed the intended five-scenario Red, and received a compliant Green whose focused test passes 5/5 and whose generated resolver types pass the drift check; the affected application join passes 6/6. The mandatory strict typecheck stopped on both local Yoga/Express typing defects and Yoga's transitive `lru-cache` 10.4.3 declaration incompatibility with TypeScript 6. The owner has now authorized DPL-DEC-041's API-local declaration-file exception, one bounded same-contract Green correction, and explicit post-MVP debt tracking. The correction has not run, so no reviewer, commit, clean-checkout proof, milestone acceptance, AC advance, or full NFR-003 claim exists. TASK-006 remains `In progress`; Milestone 1 is incomplete, and Milestones 2 through 4 remain unstarted. The next action is the fresh guarded attempt-2 Green correction followed by the complete Milestone 1 join.


## Context and Orientation


The source requirements are FR-BE-001 (GraphQL through Express), FR-BE-002 (status, species, gender, name, and origin filters), FR-BE-006 (middleware logs each request), the TASK-006 portion of NFR-003, and AC-007, AC-008, and AC-011. OR-001, OR-007, and OR-008 remain source-optional but are adopted repository commitments: implementation and tests use strict TypeScript, the character-search service receives unit coverage, GraphQL resolver types derive from the version-controlled schema, and transport, application, and persistence responsibilities remain separate.

ADR-0002 controls strict TypeScript. ADR-0003 controls PostgreSQL, explicit searchable columns, and literal safe filters. ADR-0005 is relevant supporting authority if the owner assigns bounded/newest-first comment reads to TASK-006, but it is not added to the canonical governing list before that reconciliation. ADR-0006 owns the project GraphQL operations, projections, input semantics, stable error codes, thin resolvers, service/repository direction, logging metadata, and development documentation. ADR-0011 owns unit, application, integration, and smoke boundaries. ADR-0014 requires exact stored absolute `imageUrl` projection and forbids image bytes or a proxy/asset route. ADR-0016 owns preflight classification, coherent milestone-slice TDD, independent test and implementation ownership, evidence reuse, milestone validation, and review routing.

The undisputed routed executable targets are the query portions of SPEC-008, all of SPEC-009 and SPEC-013, the TASK-006 GraphQL-boundary contribution to HS-007, the query-applicable portions of HS-008, and all of HS-010 and HS-014. Any TASK-006 contribution to HS-009 depends on the owner-controlled comment-read reconciliation. The Gherkin files remain non-executable documentation. Tests cite stable IDs through names, rationale, or an owned mapping; no Cucumber layer is added.

TASK-004 already created the `characters` and `comments` tables and `createSequelizePersistenceAdapter({ sequelize, schema })`. Its migration files, authenticated-artifact lifecycle, lock identity, and schema authority are prerequisites, not TASK-006 edit targets. Runtime queries operate only against a namespace already migrated by the documented migration command or a run-owned integration fixture. The API must never call `sequelize.sync()` or apply migrations during startup.

Committed HEAD still has the activation-era Express-only API. The uncommitted Milestone 1 candidate adds exact DPL-DEC-040 manifest/lock entries, an injected conditional `/graphql` seam, a checked-in query schema, generated resolver types, thin resolvers/handler, and explicit application interfaces while preserving `createApp()` as health-only composition. That candidate passes focused and affected application behavior but is not accepted because strict typecheck fails. `apps/api/src/server.ts` still parses the loopback host/port and starts the health-only committed composition; production PostgreSQL composition remains Milestone 2. `vitest.config.ts` already registers `api-unit`, `api-application`, and serial `api-persistence-integration`; root `test:integration` is active. `withPostgresNamespace` plus `prepareMigratedNamespace` provides run-owned real-PostgreSQL setup and cleanup.

In this plan, a summary is exactly `{ id, name, imageUrl, species }`. The final detail projection must follow the owner-reconciled TASK-006/TASK-008 allocation before its test contract is frozen; ADR-0006 includes status, gender, character `type`, origin, global `isFavorite`, and bounded comments. A normalized filter has blank values removed; status/gender are case-insensitive exact values; name/species/origin are case-insensitive literal substrings; supplied filters combine with `AND`. A stable GraphQL error is identified by `extensions.code`, not by an invented HTTP status. A request record is one bounded single-line JSON object on standard output for every completed Express request, distinct from server-side error diagnostics; GraphQL-only metadata is null or absent according to the pre-implementation DPL contract when unavailable.

Direct successors are TASK-007 (Redis cache-aside), TASK-008 (mutations), and TASK-009 (frontend GraphQL-client decision). TASK-005 may execute concurrently only in a separate worktree or under an explicit merge order because both tasks can touch the API manifest and root lockfile. DG-003 does not govern backend GraphQL implementation and must not introduce a frontend client, generated operation, or query cache here.


## Scope and Non-Goals


In scope:

- one version-controlled, build-safe query schema served through one Express GraphQL HTTP boundary;
- generated server-side resolver types derived deterministically from that schema, plus a generation/drift check integrated with the build boundary;
- one development-only explorer backed by that same schema and unavailable outside the recorded development boundary;
- explicit summary read models, thin transport resolvers, application read services, and a Sequelize/PostgreSQL business repository, plus only the detail read surface later assigned by the project owner;
- deterministic database fixtures independent of TASK-005 and the live public API;
- all five filters, whitespace/case normalization, blank omission, combined `AND`, no-match empty list, and literal `%`, `_`, quote, and combined metacharacter behavior using safely bound values;
- positive base-10 ID validation, `BAD_USER_INPUT`, query-side `NOT_FOUND`, and redacted `INTERNAL_SERVER_ERROR` behavior;
- exact stored `imageUrl` projection without revalidation, rewriting, fetching, proxying, or byte ownership;
- one bounded structured request record per completed Express request, including `/healthz` and GraphQL success/failure paths, and separate server diagnostics for unexpected errors;
- lazy production composition that keeps process startup and `/healthz` independent of PostgreSQL readiness; and
- API contract/operation examples, setup prerequisites, status, traceability, review, and task-closure documentation after behavior exists.

Out of scope:

- the TASK-005 importer, live upstream character JSON calls, scheduled synchronization, or import cache invalidation;
- Redis dependencies, cache keys, cache-aside behavior, or Redis failure policy, all owned by TASK-007;
- `Mutation`, favorite/comment mutation resolvers, comment input validation, mutation persistence, or mutation-driven readback, all owned by TASK-008;
- frontend GraphQL client selection, generated frontend operation types, CORS for the future browser product path, query cache, UI, or product browser smoke, owned by TASK-009 and TASK-010;
- database migrations, DDL, migration artifact/lifecycle/lock changes, `sequelize.sync()`, API-startup migrations, or a second persistence schema;
- image validation/import, image bytes, decoding, an image table, alternate host, asset/proxy route, browser image behavior, CSP, fallback UI, or content-rights changes;
- a parallel REST product API, readiness endpoint, microservice, event bus, or cross-process application boundary;
- authentication, sessions, users, authorization, anonymous-public deployment controls, or a claim that the mutation surface is production-ready;
- server-side A-Z/Z-A character sorting or a promised default list order; ADR-0006 leaves sorting with the frontend baseline, so filter tests compare results without inventing API ordering;
- Swagger (deferred OR-009), executable Gherkin, Storybook, numeric coverage thresholds, broad browser end-to-end tests, or a new CI provider; and
- a claim that full NFR-003, AC-004/005/010/012, overall product acceptance, imported baseline, frontend behavior, or final delivery passes.

Deterministic bounded comment reads, their valid and invalid pagination behavior, ordering, and the HS-009 read contribution remain unallocated in this plan. They cannot enter TASK-006 scope, tests, interfaces, commands, or worker leases until the project owner updates the canonical TASK-006/TASK-008 records and specification routing. The primary must then revise Milestone 4 and its dependent acceptance text before detail execution proceeds. This unresolved branch does not block Milestones 1 through 3.


## Plan of Work


All implementation uses the accepted [worker-first workflow](../../.codex/execplan-implementation-workflow.md) and [write-lease guard](../../.codex/write-lease-guard.md) only after TASK-006 becomes `In progress`. Each milestone has one read-only preflight, one coherent `evidence` or Red assignment when applicable, one Green with optional same-turn behavior-preserving Refactor, at most one same-contract correction per role, and one review correction loop. `test_worker` and `code_worker` remain separate; Red and Green are sequential; every write turn has a fresh packet and terminal lease; the primary inspects the actual diff and evidence. Two identical decisive failures, two no-diff write handoffs, a binding-field change, stale evidence, a noncompliant lease, or an exhausted budget stops automatic continuation.

Before each milestone is accepted, audit the affected tests, fixtures, helpers, mocks, snapshots, skipped/focused markers, and duplicated assertions for current semantic relevance, then run the focused Green, affected suites, and relevant type/build boundary once. Full registered scopes run once at closure unless a named invalidation or critical risk requires repetition. Real PostgreSQL evidence is normally non-reusable unless its exact run-owned namespace and state remain pinned. TASK-005 and TASK-006 writers never share this worktree concurrently; use a separate worktree or explicit merge order and repeat only invalidated checks after integration.


### Activation and localized authority barriers


Execution begins only after an explicit owner directive. The evidence-linked start row, TASK-006 `In progress` state, and current navigation must land as one coherent documentation change; no intermediate edit order is treated as valid authority. The primary then re-reads the current tree and DPL index, confirms DG-006/AUTH-001 continuity, and inspects TASK-005 manifest/lockfile activity.

Before Milestone 1, one grouped DPL record selects exact pinned GraphQL runtime/Express adapter and server-side code-generation packages, one endpoint, the checked-in schema representation, generated resolver-type output and drift command, and the development-only explorer boundary using current official Node 24/Express 5 compatibility evidence. Before Milestone 3, one grouped DPL record fixes the bounded request-record contract. Comment ordering is recorded only if the owner later allocates that behavior to TASK-006. Any choice that adds a second API/server, changes accepted architecture, exposes mutations, or changes the image boundary stops for the authoritative decision workflow.

The TASK-006/TASK-008 comment-read conflict is a localized Milestone 4 barrier. It does not block Milestones 1 through 3. Closure still waits for the owner-controlled reconciliation because TASK-006 cannot truthfully complete its detail outcome while that allocation remains contradictory.


### Milestone 1: Typed Express GraphQL summary vertical


Observable contract: an in-process Express application configured with an injected character-read service serves one checked-in query schema and `characters` operation, returns only `id`, `name`, `imageUrl`, and `species`, preserves an empty list, exposes no persistence-only field or `Mutation`, keeps the exact `/healthz` response, and exposes the same schema through a development-only explorer that is absent outside the recorded development boundary. Resolver types are deterministically generated from the schema and never hand-edited.

Preflight inspects the manifests/lockfile, Node/npm pins, Express 5, API TypeScript/build configuration, `app.ts`, existing health test, official adapter/code-generation compatibility evidence, and candidate transport/test paths. Classification is coordinator-confirmed `PARTIAL` only when `/healthz` is `EXISTING_AND_COVERED` and the typed GraphQL summary contract is `MISSING`; any incompatible evidence returns `CONFLICTING` or `UNKNOWN`. The Red reaches Express over HTTP and fails for the absent query contract, never for a missing compiler package, invalid test discovery, or changed health response.

The `test_worker` owns only `apps/api/src/transport/graphql/graphql-summary.application.test.ts`. The `code_worker` Green owns the exact root/API manifest and lockfile changes, schema/code-generation configuration and generated resolver types, the smallest schema/resolver/HTTP-handler paths, summary application interfaces, and `app.ts` injection seam. It must not add Sequelize queries, production database composition, filters, detail, request logging, mutations, client-operation generation, CORS, or image routes.

Risk is S2. Escalate to S3 for custom GraphQL-over-HTTP protocol code, production explorer exposure, raw body/secret exposure, handwritten duplicate resolver types, schema/type drift, mutation/image fields, or resolver-to-Sequelize access. Budget is the common single-cycle budget above. Focused proof is the summary application test; the join adds the affected application scope, unchanged health test, deterministic schema-generation/drift check, `npm run typecheck`, and `npm run build`. Because this milestone first changes manifests, dependency resolution, generated build inputs, and the build boundary, it also requires explicitly authorized clean-checkout or hosted evidence for this exact tree. A fresh `independent_reviewer` reviews the boundary. Acceptance yield is ADR-0002 server-type evidence, the TASK-006 contribution to HS-006/HS-007, and partial SPEC-008/HS-008; no AC completes before real PostgreSQL composition.


### Milestone 2: PostgreSQL character search and all five filters


Observable contract: production composition and a real migrated PostgreSQL namespace serve `characters(filter)` through Express, an application service, and a Sequelize-owned repository. Deterministic fixtures prove all five matching rules, blank omission, combined `AND`, no-match empty lists, literal `%`, `_`, quote and combined metacharacters, and byte-for-byte stored `imageUrl` projection. Unit evidence proves normalization/service coordination for adopted OR-007; integration evidence proves bound PostgreSQL semantics and the full HTTP path.

Preflight targets Milestone 1's accepted contract, `createSequelizePersistenceAdapter`, PostgreSQL lifecycle helpers, model tests, API/server/config composition, and existing query tests. TASK-004 migration/model behavior is reused without a fabricated Red. The aggregate route is `PARTIAL` only when the transport and persistence foundations pass and the PostgreSQL-backed search gap is explicit; otherwise stop on `CONFLICTING` or `UNKNOWN`.

The `test_worker` owns `apps/api/src/application/characters/character-filter.unit.test.ts` and `apps/api/src/transport/graphql/graphql-filters.integration.test.ts`. The `code_worker` owns minimum service/filter changes, `apps/api/src/infrastructure/database/sequelize-character-read-repository.ts`, a small lazy runtime composition boundary, and necessary `app.ts`, `server.ts`, or config changes. A required change to `sequelize-persistence.ts` stops for justification and an explicit TASK-004 regression expansion before a lease.

Risk is S3 because untrusted GraphQL input reaches SQL and production composition must preserve liveness isolation. Critical triggers include raw interpolation, input entering SQL structure, shared cleanup, live upstream access, eager database authentication, startup migration/import, `sync()`, migration/artifact/lock changes, Redis, or a task-external route. Budget is the common single-cycle budget. The focused command runs the unit and real-PostgreSQL filter files; the join adds affected API unit/application/integration scopes, `npm run typecheck`, `npm run build`, smoke, and smoke lifecycle. This is the first production-composition/startup change, so it requires separately authorized clean-checkout or hosted evidence for its exact tree; Milestone 1 build evidence cannot substitute after production paths change. A fresh `critical_reviewer` reviews SQL safety, isolation, cleanup, startup, URL projection, and boundaries. Acceptance yield is SPEC-009/HS-010 plus list portions of SPEC-008/HS-008 and AC-007/AC-008 evidence candidates.


### Milestone 3: Bounded metadata for every Express request


Observable contract: every completed request handled by the Express application writes exactly one parseable, bounded, single-line JSON record to standard output. Tests cover `/healthz`, GraphQL success, and GraphQL failure. The record contains the DPL-defined request ID, method, path, status, duration, and error count; safely unavailable GraphQL operation metadata is represented by the recorded null/absent convention. It excludes bodies, variables, comment text, authorization data, cookies, secrets, stacks, SQL/Redis detail, internal paths, and diagnostic content. `/healthz` keeps its exact response and liveness-only meaning.

Preflight targets Express middleware order, the accepted GraphQL adapter hooks/result visibility, current console/stdout use, and existing health/GraphQL application tests. It classifies health response behavior as `EXISTING_AND_COVERED` and the all-Express logging contract as the explicit missing or partial gap. The Red must fail for an absent, duplicate, unbounded, or unsafe record, not because a route or test server is invalid. This milestone depends on Milestone 1 but not on PostgreSQL or the comment-read reconciliation.

The `test_worker` owns `apps/api/src/transport/http/request-log.application.test.ts`. The `code_worker` owns `apps/api/src/transport/http/request-log-middleware.ts` and only necessary handler/app wiring. It uses injected output, ID, and time boundaries for deterministic tests; it may not parse or retain arbitrary body content, add a logging dependency without a recorded present need, or change GraphQL behavior.

Risk is S3 because logging can leak sensitive or unbounded content. Critical triggers include any captured header/body/secret/stack, nondeterministic unbounded operation metadata, missing or duplicate records, changed health semantics, or diagnostic-to-client/stdout leakage. Budget is the common single-cycle budget. Focused proof is the request-log application test; the join adds affected application/integration scopes, `npm run typecheck`, and `npm run build`. A fresh `critical_reviewer` inspects serialized success/failure/non-GraphQL records and negative fixtures. Acceptance yield is SPEC-013, the all-request and unsafe-data-exclusion portions of HS-014, FR-BE-006, and an AC-011 evidence candidate.


### Milestone 4: Owner-reconciled detail projection and query errors


This is the only behavior milestone blocked by the comment-read conflict. TASK-006 owns a character-detail outcome, while TASK-008 explicitly owns deterministic comment ordering/pagination and the routed records disagree about bounded reads. Until the project owner updates the authoritative task and specification owners, preflight returns `CONFLICTING`; no detail test path, production path, command, or lease is authorized. Milestones 1 through 3 remain independent.

After reconciliation, revise this milestone's exact schema fields, paths, focused command, yield, and comment-specific validation before preflight. Its coherent contract must cover `character(id)`, the approved detail projection, positive base-10 ID validation, `BAD_USER_INPUT`, valid missing-ID `NOT_FOUND`, unexpected-failure `INTERNAL_SERVER_ERROR`, and server/client diagnostic separation. If TASK-006 receives comments, the same contract includes valid bounds/order plus invalid-pagination errors. If TASK-008 retains them, the staged TASK-006 schema must omit unavailable comment behavior without weakening the owner-approved final contract.

The future `test_worker` owns the reconciled detail/error application and necessary real-PostgreSQL tests; the `code_worker` owns only the corresponding schema/codegen update, resolver/service/repository detail path, and typed error mapping. Generated types remain code-generated and frozen tests remain unchanged during Green. Risk is at least S2 and becomes S3 for comment-sensitive data, pagination/order integrity, unsafe error projection, auto-exposure, image transformation, or any write path. Budget remains one coherent cycle under the common limits. The join includes the focused Green, affected API unit/application/integration scopes, schema drift check, `npm run typecheck`, and `npm run build`, followed by the risk-routed fresh reviewer. Acceptance yield is the owner-approved detail/query-error portion of SPEC-008/HS-008, the unexpected-failure diagnostic-separation scenario in HS-014, and conditional HS-009 evidence.


### Milestone 5: Integrated validation, documentation, and closure


No new production behavior begins here. Perform the cumulative ADR-0016 semantic relevance audit over every TASK-006 test, fixture, helper, mock, snapshot, skipped/focused marker, and duplicated assertion; this joins rather than replaces the affected-test audit already completed at each milestone. Any newly discovered behavior gap returns to a new preflight-classified slice.

Run one authoritative closure packet from the repository root: strict typecheck, root `npm test` once, production build, Tailwind validation, smoke lifecycle, documentation validation, ADR validation when affected mappings remain in the diff, `git diff --check`, and explicit status/HEAD evidence. Do not repeat the unit/integration/application/smoke leaves merely to restate `npm test`.

Use the acceptance-review workflow for a dated TASK-006 review. A fresh integrated `independent_reviewer` concentrates on cross-milestone behavior, schema/type drift, traceability, dependency direction, lazy startup, SQL safety, error/log redaction, image absence, downstream boundaries, test relevance, clean-environment evidence, and documentation closure; route any remaining critical trigger to `critical_reviewer`. Only a closure-permitting verdict allows the primary to update API usage documentation, current status and evidence, TASK-006 state, affected indexes/specifications, and chronology. Change the authoritative task to `Complete` and move this plan to `docs/plans/completed/` only in the same closure reconciliation after every join passes.


## Concrete Steps


Run all commands from the repository root in PowerShell unless a future Milestone Assignment Packet says otherwise. The commands below already exist except the selected immutable dependency-install command, schema-generation/drift command, and future focused test paths; those become authoritative only after the activation DPL record and owning milestone create them. Do not treat a placeholder package or script name as executable evidence.

Registration checks:

    python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
    python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
    git diff --check
    git status --short

Milestone 1 pinned dependency installation, authorized only inside its Green write lease:

    npm install --workspace @rick-and-morty/api --save-exact graphql@16.14.2 graphql-yoga@5.21.2
    npm install --workspace @rick-and-morty/api --save-dev --save-exact @graphql-codegen/cli@7.2.0 @graphql-codegen/typescript@6.1.0 @graphql-codegen/typescript-resolvers@6.1.0

Closed local PostgreSQL profile and available milestone/closure commands:

    $env:POSTGRES_USER = 'rick_and_morty'
    $env:POSTGRES_PASSWORD = 'local-development-only'
    $env:POSTGRES_DB = 'rick_and_morty'
    $env:POSTGRES_SCHEMA = 'public'
    $env:POSTGRES_PORT = '5432'
    $env:POSTGRES_MIGRATION_LOCK_TIMEOUT_MS = '5000'
    $env:REDIS_PORT = '6379'
    npm run infra:ps
    npm run infra:up
    npm run infra:ps
    npm run typecheck
    npm run build
    npm run test:unit
    npm run test:application
    npm run test:integration
    npm run test:smoke
    npm run test:smoke:lifecycle

TASK-006 focused commands after the named files exist:

    npm run test:application -- apps/api/src/transport/graphql/graphql-summary.application.test.ts
    npm exec -- vitest run --config vitest.config.ts --project api-unit --project api-persistence-integration apps/api/src/application/characters/character-filter.unit.test.ts apps/api/src/transport/graphql/graphql-filters.integration.test.ts
    npm run test:application -- apps/api/src/transport/http/request-log.application.test.ts

Milestone 1 also runs the DPL-recorded deterministic server-schema generation and drift check after those exact scripts exist. Milestone 4's detail/error focused command is intentionally absent until owner reconciliation defines its contract and the required living-plan revision records the real paths and command.

The values above reproduce the repository's closed loopback-only local profile from `.env.example`; use an explicit free loopback port in the same shell if `5432` is occupied. Before `infra:up`, inspect `npm run infra:ps` and active task ownership. Reuse an already healthy exact profile without claiming ownership, or start the named `rick-and-morty-dev` project for this task. Run `npm run infra:down` only if this execution started that exact project, no other task uses it, and its owned namespaces have already cleaned up. Never tear down peer-owned infrastructure. Redis starts only because the current scoped Compose profile owns both services; TASK-006 never connects to it.

The decisive Red and matching Green use the same focused command within each milestone. A Red exits nonzero only for the accepted missing/regressed contract. Green exits zero with the same selected tests. PostgreSQL commands must report the run-owned namespace and cleanup result without exposing credentials; a primary failure and cleanup failure remain distinguishable. The owner-reconciled detail command is intentionally absent until the required plan revision defines it.

Closure packet, once after all milestone evidence is integrated:

    npm run typecheck
    npm test
    npm run build
    npm run validate:tailwind
    npm run test:smoke:lifecycle
    python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
    python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
    git diff --check
    git rev-parse HEAD
    git status --short

Expected closure results are zero exits, no skipped/focused tests, no run-owned database or process residue, a task-scoped review verdict that permits closure, and documentation whose task status, plan lifecycle, current evidence, and acceptance statements agree. Root `npm test` includes unit, integration, application, and smoke in canonical order; do not run those four aggregate leaves again at closure unless evidence invalidation is recorded.

Use targeted negative inspection in addition to semantic review. Exact patterns may be refined when paths exist, but the executor must prove:

- no `type Mutation`, `setCharacterFavorite`, or `addCharacterComment` in the TASK-006 schema/runtime;
- no handwritten duplicate resolver-type surface, stale generated output, generated-file hand edit, frontend GraphQL client/cache/operation-generation artifact, Redis client/cache behavior, or live Rick and Morty character-data request;
- no `sequelize.sync()`, API-startup migration/import, mutation of migration lifecycle files, or alternate schema authority;
- no image table/bytes/decoder/asset/proxy route or transformation of stored `imageUrl`;
- no parallel REST product route beyond the preserved `/healthz` and the one recorded GraphQL boundary;
- exactly one bounded request record for representative `/healthz`, GraphQL success, and GraphQL failure requests, with no raw body, variables, authorization, cookie, secret, comment text, stack, SQL detail, Redis detail, internal path, or diagnostic content in stdout or the client error; and
- no changes to `.gitignore`, Git index, HEAD, branch, or unleased paths during a worker lease.


## Validation and Acceptance


TASK-006 is accepted only when repository evidence proves all of the following:

- preflight classifications exist for every intended scenario, with no manufactured Red for `/healthz`, TASK-004 migration/model behavior, or an already-absent image route;
- each missing/regressed/confirmed-partial milestone has one accepted coherent Red, frozen test boundary, matching Green, affected-test relevance audit, affected-suite/type/build join, terminal compliant leases, primary diff inspection, and risk-routed semantic review;
- one Express GraphQL endpoint serves a version-controlled query schema, server-side resolver types are generated deterministically from it without hand edits or drift, and no mutation or parallel REST product contract is advertised;
- `characters` and the owner-reconciled `character` surface use thin resolvers, application read services, and a Sequelize/PostgreSQL repository, and the production runtime remains one process;
- summaries and the owner-reconciled detail projection expose only approved fields and exact stored absolute `imageUrl` values;
- status/gender use case-insensitive exact matching; name/species/origin use case-insensitive literal substring matching; case/whitespace normalization, blank omission, combined `AND`, no-match, and metacharacter cases pass with bound values at real PostgreSQL;
- the owner-reconciled detail contract passes exactly the fields, bounds, errors, and downstream allocation recorded in the updated canonical tasks and this revised plan; if TASK-006 owns comment pagination, valid bounds and typed invalid-pagination `BAD_USER_INPUT` evidence are both mandatory;
- invalid IDs never reach the service, missing valid IDs use `NOT_FOUND`, unexpected failures use redacted `INTERNAL_SERVER_ERROR`, and original diagnostics remain server-side;
- every completed Express request emits exactly one bounded metadata record with the accepted fields and no unsafe content; executable evidence includes `/healthz`, GraphQL success, and GraphQL failure;
- API startup and `/healthz` pass without PostgreSQL readiness, migration, import, Redis, or external network access;
- TASK-003 health/smoke, TASK-004 persistence/migration regressions, strict TypeScript, native build, and run-owned cleanup remain passing;
- the first manifest/dependency/build boundary and the later production-startup boundary each have clean-checkout or hosted-platform evidence for their exact trees under explicit authorization;
- milestone-local and cumulative semantic relevance audits find no skipped, focused, duplicate-without-confidence, implementation-detail-only, abandoned, or unmapped tests;
- query portions of SPEC-008, SPEC-009, SPEC-013, applicable HS-006, HS-007, HS-008, HS-010, and HS-014 map to ordinary executable tests or deterministic build checks and passing authoritative commands; any HS-009 contribution appears only if the project owner canonically assigns it to TASK-006; and
- the final review and documentation gate pass before canonical `Complete` state or any readiness change is claimed.

The task may contribute evidence for AC-007, AC-008, and AC-011. Whether those criteria change readiness status is decided from the final acceptance review and current repository evidence, not from this plan. NFR-003 remains partial until Redis and the remaining backend tasks exist. Mutation scenarios in SPEC-008 and HS-008, full HS-009, AC-004/005, caching, import, frontend behavior, final delivery, and overall product acceptance remain outside this task.


## Idempotence and Recovery


Plan registration and documentation validation are safe to repeat. DPL IDs are never reserved in advance or reused; re-list the table immediately before allocation. Dependency installation uses the repository's exact-package and lockfile policy. If install, schema generation, drift checking, or build fails, preserve the manifest/lock/generated diff and command evidence, close the lease, and triage; never hand-edit generated lockfile or resolver-type output, widen version ranges, or accept stale generated types merely to continue.

Every integration test allocates and drops only its exact run-owned PostgreSQL namespace in `finally`. Never point tests at the development `public` schema, never use broad database deletion, and never run `infra:down` while another task owns infrastructure. A failed cleanup is separately reported and blocks evidence acceptance; recovery identifies and removes only the exact owned resource after coordinator authorization.

An unexpected path, concurrent change, stale fingerprint, guard violation, wrong Red, review finding, or command failure stops writers. Terminally close the active lease, preserve user/peer work, inspect the actual tree and receipt, and issue a fresh packet only if the original authority, objective, scope, and expected result remain unchanged. Never recover with `git reset --hard`, `git checkout --`, broad deletion, rebaseline of a live lease, a worker-invoked guard, or concurrent Red/Green.

Generated `node_modules/`, `dist/`, browser/test output, and lease records are ignored side effects and not write-lease evidence. Use current repository commands for ordinary rebuild/cleanup; do not add ignore rules during a worker lease. If a missing legitimate ignore rule is demonstrated, the primary makes and records an exceptional coordinator edit between leases after validating the exact path.

If TASK-005 changes `apps/api/package.json`, `package-lock.json`, shared runtime/configuration, or database read models in another worktree, merge at a named milestone barrier, re-run preflight for affected scenarios, update fingerprints, and repeat only invalidated checks. Do not overwrite or revert the other task. A still-unresolved comment allocation pauses only Milestone 4; if AUTH-001 reopens, pause only image-specific assertions and route its authoritative process while other work follows the current implementation-plan permissions.

The 2026-08-16 execution authorization permits primary-coordinator local commits and task-owned temporary clean-checkout worktrees for the explicitly required Milestone 1 and Milestone 2 exact-tree proofs. Push, pull request, hosted CI, deployment, and other external publication remain unauthorized. Preserve point-in-time commits, runs, failures, and reviews in chronology rather than rewriting them after a correction.


## Artifacts and Notes


Registration baseline:

- Branch: `agent/milestone-slice-tdd-workflow`.
- HEAD: `42d53699e9ceb5430576345d3fc3e81fe8a964aa`.
- Initial tree: clean.
- Canonical TASK-006 state: `Pending`.
- Completed prerequisites: TASK-004 and TASK-017.
- Gate/authorization: DG-006 `Resolved`; AUTH-001 `Authorized` only within its recorded personal, educational, non-commercial direct-URL scope.
- Existing harness: `api-unit`, `api-application`, `api-persistence-integration`, root Chromium smoke.
- Existing API behavior: exact `GET /healthz` only.
- Existing database behavior: migrated character/comment schema and Sequelize model mappings; no business read repository.
- Missing behavior: GraphQL runtime/schema/route, schema-derived resolver types, list/detail services, filters, stable product errors, Express-wide request records, runtime database composition, and product tests.

Activation baseline:

- Authorization date: 2026-08-16.
- Branch: `agent/task-006-graphql-reads`.
- HEAD before activation edits: `21f2b5c0dc0fb5f4b11e2bf80da8810c5cbbb8a2`.
- Initial tree: clean; no peer worktree or TASK-005 branch was present.
- Canonical TASK-006 state after the coherent activation change: `In progress`.
- Infrastructure observation: `npm run infra:ps` could not reach a Docker engine, so no TASK-006 infrastructure ownership was claimed and Milestone 2 PostgreSQL evidence remains non-reusable until a run-owned identity exists.

Milestone 1 stopping-point identity:

- Workflow/cycle: `TASK-006-20260816-01` / `TASK-006-M1-TYPED-SUMMARY`.
- Accepted Red lease: `TASK-006-20260816-01-M1-red-02`; exit 1 with five intended absent-`/graphql` failures.
- Green lease: `TASK-006-20260816-01-M1-green-01`; terminally compliant with the frozen test unchanged.
- Passing evidence: focused application 5/5, affected application 6/6 including unchanged health, and `graphql:check`.
- Blocking evidence: root `npm run typecheck` exit 1 on local Yoga/Express typings and transitive `lru-cache` 10.4.3 declarations under TypeScript 6.
- Compatibility probes: API `tsc` with `--skipLibCheck` and with `--strictBuiltinIteratorReturn false` each report only the same five correctable local errors; neither probe edits the repository.
- Authorized disposition: DPL-DEC-041 permits API-local `skipLibCheck: true`, freezes every other compiler/product/dependency boundary, and records deletion plus passing root typecheck/build/affected tests as the post-MVP debt exit.
- Tree state: candidate changes are uncommitted; no review, build, clean-checkout proof, or milestone acceptance exists.

During execution, retain only the concise identities needed to resume or validate work: workflow/milestone and terminal lease IDs, exact decisive commands/results, isolated PostgreSQL identity when applicable, milestone validation and reviewer verdict, clean-environment identity, and documentation-impact result. Detailed packets, routine hashes/fingerprints, secrets, full logs, generated guard state, and duplicated authority prose remain in their owning evidence rather than this living plan.

Expected production path families, subject to the accepted DPL naming record and preflight:

- `apps/api/src/application/characters/` for explicit read models, filter normalization, service, and repository port;
- `apps/api/src/infrastructure/database/sequelize-character-read-repository.ts` for PostgreSQL reads;
- `apps/api/src/transport/graphql/` for the checked-in schema, code-generation configuration/output, thin resolvers, and HTTP adapter;
- `apps/api/src/transport/http/request-log-middleware.ts` for bounded request metadata;
- a small API runtime composition module plus the existing `app.ts`, `server.ts`, and config boundary; and
- task-owned `.unit.test.ts`, `.application.test.ts`, and `.integration.test.ts` files selected by existing Vitest projects.


## Interfaces and Dependencies


DPL-DEC-040 pins runtime dependencies `graphql-yoga` 5.21.2 and `graphql` 16.14.2 and API development dependencies `@graphql-codegen/cli` 7.2.0, `@graphql-codegen/typescript` 6.1.0, and `@graphql-codegen/typescript-resolvers` 6.1.0. Yoga mounts directly on the existing Express 5 process at `/graphql` and uses `createSchema`; no separate Express adapter, JSON body parser, CORS middleware, or second server is added. One checked-in `apps/api/src/transport/graphql/schema.ts` `/* GraphQL */` SDL literal is the schema authority consumed by runtime and Codegen. API-local `graphql:generate` writes `apps/api/src/transport/graphql/generated/resolver-types.ts`; `graphql:check` uses Codegen `--check`, and the API build runs that drift check before TypeScript emit. Generated output is never hand-edited. Yoga's built-in GraphiQL is enabled only when an explicit development-composition boolean is true and is disabled by default, in tests, and in production. Frontend operation generation remains TASK-009; no client, cache, watch package, server preset, logging dependency, custom loader, or other schema framework is authorized.

DPL-DEC-041 adds `skipLibCheck: true` only to `apps/api/tsconfig.json` as a declaration-file compatibility exception. `strict: true` and every local-source check remain active; application source, tests, and generated resolver types remain checked `.ts`. The flag is explicit post-MVP technical debt, not a reason to force an unsupported transitive major: reassess after MVP or a supported compiler/Yoga dependency update, and remove it only when root typecheck, build, and affected TASK-006 tests pass without it.

The only schema target frozen before owner reconciliation is the undisputed query subset:

    type Query {
      characters(filter: CharacterFilter): [CharacterSummary!]!
    }

    input CharacterFilter {
      status: String
      species: String
      gender: String
      name: String
      origin: String
    }

`CharacterSummary` retains ADR-0006's exact fields and nullability. Generated resolver types derive from this schema and type only the transport boundary; application DTOs and persistence records remain explicit handwritten domain-facing types. ADR-0006 also targets `character`, `CharacterDetail`, `Origin`, and `Comment`, but this plan freezes no TASK-006 binding for those types until the owner reconciles the bounded-comment allocation and the primary revises this section. TASK-006 does not define `Mutation`; TASK-008 adds mutation behavior through its own test-first change.

The application boundary should remain no broader than:

    interface CharacterReadService {
      list(filter: CharacterFilterInput | undefined): Promise<readonly CharacterSummary[]>;
    }

    interface CharacterReadRepository {
      list(filter: NormalizedCharacterFilter): Promise<readonly CharacterSummaryRecord[]>;
    }

Transport input types remain distinct from normalized application types and persistence records. Resolvers validate/map and call the service; services normalize/coordinate; the repository alone owns Sequelize access. Summary DTOs explicitly select fields; no generic model serialization crosses the transport boundary. The post-reconciliation revision must add only the owner-approved detail method, input, DTO, persistence record, and projection.

Runtime composition reuses the DPL-DEC-025 closed PostgreSQL environment surface and loopback/no-TLS profile. It constructs a caller-owned Sequelize connection/pool lazily, selects the recorded schema, creates the read repository/service, injects them into the Express application, and closes only its owned runtime resource during controlled shutdown. It never calls `authenticate()`, `sync()`, migration code, importer code, or Redis as a prerequisite for process startup or `/healthz`.

The request-observability boundary wraps the Express application and accepts injected time, request-ID, and metadata-output boundaries for deterministic tests. Production writes one single-line JSON record for every completed Express request. `/healthz` and requests without safely available GraphQL metadata use the DPL-recorded null/absent convention; GraphQL success/failure adds only bounded operation/error metadata. Original unexpected errors stay in the separate server diagnostic boundary owned by the detail/error contract. The implementation does not invent domain-specific HTTP statuses.

The exact stored `characters.image_url` value is returned byte-for-byte as the GraphQL string. TASK-006 neither re-derives the official URL nor validates/fetches it. Integration fixtures use deterministic recorded absolute URLs and fail closed on any unexpected live external request.

No comment-read interface, bound, ordering rule, error contract, or downstream consumer is authorized here. The owner-controlled canonical reconciliation determines those owners before Milestone 4 can define or implement them; Milestones 1 through 3 do not depend on that allocation.


## Revision Note


2026-08-16 / Codex primary coordinator: Created and registered the initial TASK-006 implementation ExecPlan from the post-TASK-004 repository. The plan preserves `Pending` state, reconciles adopted-optional traceability, surfaces the TASK-006/TASK-008 bounded-comment ambiguity for owner-controlled canonical reconciliation before any behavior Red, stages only the undisputed query schema before that reconciliation, reuses the existing Vitest/PostgreSQL harness, protects liveness from database readiness, and defines bounded worker-first milestones with ADR-0016 preflight and risk routing. It requires clean-checkout or hosted evidence at both the first dependency/build boundary and the later production-startup boundary. No task scope, product code, dependency, executable test, task start, gate status, acceptance result, or external state changed.

2026-08-16 / Codex primary coordinator: Revised the registration candidate after independent review. The revision removed all authoritative TASK-006 assumptions about bounded-comment ownership, blocked every behavior Red on owner-controlled canonical reconciliation, required the post-decision plan rewrite to own valid and invalid pagination together when applicable, made Milestone 2 one executable aggregate `PARTIAL` route, moved clean-environment proof to the first setup boundary while retaining a later startup-boundary proof, and added exact local PostgreSQL prerequisites plus ownership-safe cleanup. Registration validation passed, and fresh independent final-state review returned `PASS` with no Blocker, Major, or Minor on substantive plan SHA-256 `6847F6668139E7E2764F9BBBA7780A9E62A5E894B8C09A6816AD45625E6F9E8E`.

2026-08-16 / Project owner and Codex primary coordinator: Materially revised the living plan for portfolio proportionality without weakening ADR-0016 or the worker-first workflow. The revision supersedes the former global comment barrier and zero-yield dependency milestone, permits summary/filter/logging work after execution authorization, requires schema-derived server resolver types, restores FR-BE-006 to every Express request, combines detail with its query-error boundary, adds an affected-test audit to every milestone, and retains separate clean-environment proof for the distinct build and production-startup boundaries. TASK-006 remains `Pending`; no task scope, comment ownership, package, source, executable test, runtime evidence, gate/authorization status, acceptance result, or external state changed.

2026-08-16 / Project owner and Codex primary coordinator: Activated the owner-authorized ExecPlan after re-inspecting the clean worktree, branch, HEAD, manifests, current Express liveness source and coverage, infrastructure visibility, and concurrent TASK-005 state. TASK-004 and TASK-017 remain `Complete`, DG-006 remains `Resolved`, and AUTH-001 remains `Authorized` only within its recorded portfolio/direct-URL boundary. The coherent activation change moves TASK-006 to `In progress`, synchronizes current status, navigation, chronology, and all living sections, and adds no GraphQL dependency, schema, route, test, production behavior, runtime evidence, acceptance result, or Milestone 4 allocation.

2026-08-16 / Codex primary coordinator: Completed the required pre-Milestone-1 compatibility review against current official Yoga, Apollo Server, GraphQL Code Generator, and npm registry metadata; re-listed DPL-DEC-001 through DPL-DEC-039 immediately before allocating DPL-DEC-040. The grouped decision pins direct Yoga/Express integration, compatible GraphQL 16, a checked-in TypeScript SDL literal, direct resolver-type plugins with dry-run drift checking, `/graphql`, and explicitly development-only GraphiQL. It rejects GraphQL 17 as outside Yoga's peer range and adds no dependency or implementation artifact before the guarded Green.

2026-08-16 / Project owner and Codex primary coordinator: After the guarded Milestone 1 candidate stopped at strict typecheck, the owner explicitly authorized DPL-DEC-041's API-local declaration-file exception, one bounded same-contract Green correction, and a post-MVP technical-debt record. The decision keeps `strict: true`, tests local/application/generated `.ts`, rejects an out-of-range transitive override and strict-family source weakening, limits the correction to three paths, and defines removal as deleting the flag while root typecheck, build, and affected TASK-006 tests pass. No correction, review, commit, clean-checkout proof, milestone acceptance, or downstream behavior evidence is claimed by this documentation change.
