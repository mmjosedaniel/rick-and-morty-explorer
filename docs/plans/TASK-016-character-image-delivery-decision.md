# Resolve TASK-016 by Selecting the Character-Image Delivery Boundary


This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.


## Purpose / Big Picture


Character cards and details must eventually show character images, but the repository has not decided who owns the image bytes or where the browser obtains them. `TASK-016` exists to resolve [DG-004](../IMPLEMENTATION_PLAN.md#dg-004---character-image-delivery-boundary) through an evidence-based, project-owner-approved ADR before import, GraphQL mapping, caching, or browser code gives `imageUrl` an irreversible meaning.

This plan makes that decision work restartable and falsifiable. It defines symmetric research for three complete delivery boundaries, a risk-triggered review contract, the exact owner-approval stop, and the documentation and negative-evidence checks needed to close the task. A reviewer can observe eventual success when one accepted ADR defines the complete upstream-to-browser image flow, DG-004 is `Resolved`, TASK-016 is `Complete`, every affected authority agrees, and the repository still contains no image-delivery implementation attributed to this decision task.

Creating and registering this ExecPlan does not start TASK-016, select a strategy, allocate an ADR number, resolve DG-004, or prove that images work. Until the explicit start milestone, TASK-016 and DG-004 remain `Pending`.


## Progress


- [x] (2026-08-11 02:10Z) Read the repository policy, documentation map, assessment, normalized requirements, optional-scope dispositions, ExecPlan convention, contract-first agent workflow, TASK-016, DG-004, relevant accepted ADRs, target module view, specification routing, HS-020, and the DG-004 paths in SPEC-001, SPEC-003, SPEC-007, SPEC-008, and SPEC-010.
- [x] (2026-08-11 02:10Z) Confirmed that TASK-016 and DG-004 are `Pending`, no active TASK-016 ExecPlan or later ADR exists, and the tracked tree contains no application manifest, source root, test configuration, migration, image asset, proxy route, or executable image-delivery behavior.
- [x] (2026-08-11 02:10Z) Created the living Decision Review Contract before formal option research and classified the decision for the repository's risk-triggered pre-draft checkpoint.
- [x] (2026-08-11 02:10Z) Added and registered this active ExecPlan as ready to execute while preserving TASK-016 and DG-004 as `Pending` and leaving sequence number `0013` unreserved.
- [x] (2026-08-11 02:35Z) Passed the plan-registration diff through the documentation and ADR validators, tracked and untracked whitespace checks, authority and negative-artifact searches, and corrected independent review. The first review returned `REVISE` for missing TASK-011 proof ownership and weak association/canonical-identity fixtures; after the supported correction and full revalidation, complete re-review returned `PASS` with no material finding.
- [ ] Start TASK-016 by updating its authoritative state to `In progress`, keeping DG-004 `Pending`, appending a `Started` execution record, and rechecking both the working tree and the next unused ADR sequence.
- [ ] Complete the `INGEST-COPY` report and preserve its dated, source-linked summary in the Durable Research Record.
- [ ] Complete the `APP-DELIVERY` report and preserve its dated, source-linked summary in the Durable Research Record.
- [ ] Complete the `DIRECT-ASSET-EXCEPTION` report and preserve its dated, source-linked summary in the Durable Research Record.
- [ ] Complete the decision-analysis barrier and preserve the normalized matrix, ranking, recommendation, confidence, dissent, evidence gaps, reversal triggers, and proposed ADR outline.
- [ ] Obtain `DRAFT READY` from the decision analyst and `PASS` from a fresh pre-draft contract reviewer; otherwise follow the contract's research or owner-direction stop.
- [ ] Recheck and allocate the next unused ADR number, draft and score the proposed ADR, validate it, and obtain a different fresh final reviewer result for the exact artifact and diff.
- [ ] Stop for explicit project-owner approval after post-verdict reconciliation; do not accept the ADR or resolve DG-004 from an agent verdict.
- [ ] After approval only, synchronize every affected authority, resolve DG-004, close TASK-016, move this plan to `docs/plans/completed/`, and pass the relevance and documentation-closure gates.


## Surprises & Discoveries


- Observation: A direct browser image request conflicts with ADR-0001's no-external-character-API browser dependency as well as ADR-0004's GraphQL-only and ingestion-only boundary, while the original DG-004 wording named only ADR-0004 and ADR-0006 for reconciliation.
  Evidence: `docs/adrs/0001-use-a-modular-monolith-workspace.md`, `docs/adrs/0004-use-the-database-as-the-runtime-source-of-truth.md`, and `docs/IMPLEMENTATION_PLAN.md` DG-004 validation wording.
- Observation: The ADR portfolio defines whole-record `Superseded` lifecycle and reciprocal links but no partial-supersession status. A scoped image exception therefore cannot leave contradictory accepted text active or invent a lifecycle label.
  Evidence: `docs/adrs/README.md` convention and status definitions. The future ADR must preserve a compatible interpretation or supersede through the documented lifecycle while carrying forward unaffected constraints.
- Observation: ADR-0003 already anticipates an image URL column, but DG-004 prohibits persistence behavior that assigns image-location semantics. TASK-004 does not depend on TASK-016, so a neutral column and a selected delivery meaning must not be conflated.
  Evidence: `docs/adrs/0003-use-postgresql-for-relational-persistence.md` and the canonical task graph in `docs/IMPLEMENTATION_PLAN.md`.
- Observation: The phrase “application-owned proxy or asset boundary” can hide two materially different lifecycles: runtime upstream fetching and serving bytes materialized during ingestion. The contract separates runtime application delivery from ingestion-owned copying and forbids an unreviewed hybrid.
  Evidence: DG-004's required decision and its ingestion, persistence, route, and browser triggers in `docs/IMPLEMENTATION_PLAN.md`.
- Observation: The public API documents image URLs but does not publish an availability or permanence commitment. Its About page does not claim ownership of the images, so the API software's BSD license must not be treated as an image-content license.
  Evidence: `https://rickandmortyapi.com/documentation/#character-schema` and `https://rickandmortyapi.com/about`; these are planning-baseline observations that formal research must refresh and qualify.
- Observation: ADR-0010 and ADR-0011 constrain deterministic image validation, and ADR-0012 becomes relevant if the selected strategy changes persisted schema, even though the original TASK-016 governing list ended at ADR-0009.
  Evidence: `docs/adrs/0010-use-a-targeted-automated-testing-strategy.md`, `docs/adrs/0011-define-the-typescript-test-harness.md`, and `docs/adrs/0012-use-a-build-first-programmatic-migration-lifecycle.md`.
- Observation: One direct-upstream planning probe was completed before this Decision Review Contract existed. It may inform the contract's evidence routes but cannot satisfy the formal symmetric research barrier.
  Evidence: The Durable Research Record labels the probe as non-creditable planning input and leaves all three candidate reports incomplete.
- Observation: The specification index's character-image row omitted both TASK-007's cached `imageUrl` behavior and TASK-011's SPEC-003 detail-image evidence, even though adjacent routing and the canonical task records assign those owners.
  Evidence: Initial independent plan review compared `docs/specs/README.md` character-image and detail rows with TASK-007 and TASK-011 in `docs/IMPLEMENTATION_PLAN.md`.
- Observation: A one-character happy-path example cannot detect a mapping-only swap that preserves the same set of characters and image locations, and a generic “cross-platform” assertion does not define reproducible identity normalization.
  Evidence: Initial independent plan review returned `REVISE` on IMG-INV-04 and IMG-INV-07; the contract now requires two-character association tampering and exact canonical identity vectors.


## Decision Log


- Decision: Keep TASK-016 and DG-004 `Pending` while creating and validating this plan.
  Rationale: An ExecPlan is planning intent, and the repository requires a separate authoritative start transition before decision research begins.
  Date/Author: 2026-08-10 / Codex.
- Decision: Use the risk-triggered contract path with a fresh independent checkpoint after decision analysis and before ADR drafting.
  Rationale: The candidates can introduce asset identity, cross-resource recovery, concurrency, SSRF and browser-policy controls, cross-platform key semantics, or scoped supersession of accepted architecture.
  Date/Author: 2026-08-10 / Codex.
- Decision: Compare exactly three complete boundary shapes: `INGEST-COPY`, `APP-DELIVERY`, and `DIRECT-ASSET-EXCEPTION`.
  Rationale: These preserve DG-004's required alternatives while preventing the application-owned option from silently blending runtime proxying with ingestion-time materialization.
  Date/Author: 2026-08-10 / Codex.
- Decision: Treat sequence number `0013` as the current collision-safe candidate without reserving it or creating an ADR until the research and pre-draft barriers pass.
  Rationale: ADR-0012 is currently the highest allocated record, but pending gates do not reserve numbers and another task may allocate the sequence first.
  Date/Author: 2026-08-10 / Codex.
- Decision: Require the future ADR to reconcile ADR-0001, ADR-0004, and ADR-0006 explicitly and to define reciprocal lifecycle metadata for any superseded accepted decision.
  Rationale: Direct and runtime-proxy strategies can contradict more than the one ADR named by the earlier gate wording; accepted records must not remain silently inconsistent.
  Date/Author: 2026-08-10 / Codex.
- Decision: Keep content rights, attribution, and upstream acceptable-use evidence visible as an owner-controlled risk rather than infer permission from the API software license.
  Rationale: Copying, proxying, and hotlinking have different content-handling consequences, and the available official About page does not grant image-content rights.
  Date/Author: 2026-08-10 / Codex.
- Decision: Use ADR-0010 and ADR-0011 as governing validation context and ADR-0012 as conditional migration context without enlarging TASK-016's direct mapped requirement scope.
  Rationale: Accepted decisions constrain how the selected semantics will later be proved, while routed SPEC rules expose downstream effects rather than new direct requirements for TASK-016.
  Date/Author: 2026-08-10 / Codex.
- Decision: Add TASK-011 to every downstream proof map and add TASK-007 and TASK-011 to the character-image specification-routing row.
  Rationale: TASK-011 owns FR-FE-003, AC-003, and SPEC-003 detail-image evidence, while TASK-007 owns the cached CharacterSummary `imageUrl`; omitting either could allow decision closure without the complete list/detail/cache proof chain.
  Date/Author: 2026-08-10 / Codex after independent plan review.
- Decision: Require mapping-only swap rejection and complete reproducible canonical identity rules whenever a selected strategy derives or validates URLs, keys, paths, byte identities, or character-to-image associations.
  Rationale: Set membership alone cannot detect two preserved image locations attached to the wrong characters, and an unspecified platform normalization cannot make identity or cleanup behavior falsifiable.
  Date/Author: 2026-08-10 / Codex after independent plan review.


## Outcomes & Retrospective


Plan registration is complete. The documentation and ADR validators, tracked and untracked whitespace checks, authority and negative-artifact searches, and corrected independent review pass. The first review found missing TASK-011 proof ownership and insufficient association/canonical-identity fixtures; the corrected plan now includes complete TASK-005/006/007/010/011/012 ownership, repaired specification routing, mapping-only swap rejection, and exact Windows/POSIX-equivalent identity vectors. Complete re-review returned `PASS` with no material finding.

TASK-016 has not started, no candidate has passed formal research, no recommendation or ADR exists, DG-004 remains `Pending`, and no image asset, location semantics, migration, route, cache mapping, browser request, test, dependency, or application behavior has been added. The next step is the explicit TASK-016 start transition described in Milestone 1.

Documentation impact at plan creation: add this active plan and its index entry; link it from TASK-016; reconcile current governance, supersession coverage, and stale parallelism wording in the implementation plan; repair the existing image-delivery routing to TASK-007 and TASK-011; update the root current-status summary; and append a `Planned` execution record. Requirements, optional-scope dispositions, the task graph, accepted ADR status, gate status, SPEC/HS rule text and execution state, and implementation evidence remain unchanged.


## Context and Orientation


The root [README](../../README.md) is the documentation entry point and current-state owner. The repository remains in requirements and architecture work: ADR-0011 and ADR-0012 are accepted, TASK-001 and TASK-002 are complete, TASK-003 and TASK-004 remain `Pending`, and no application scaffold exists. The [implementation plan](../IMPLEMENTATION_PLAN.md) owns the canonical task graph and says TASK-016 is dependency-ready but `Pending`; TASK-005 and TASK-006 depend on it, and DG-004 also blocks image loading in TASK-010.

TASK-016 directly maps [FR-FE-001](../REQUIREMENTS.md#fr-fe-001---character-list), [FR-FE-003](../REQUIREMENTS.md#fr-fe-003---character-details), [NFR-001](../REQUIREMENTS.md#nfr-001---frontend-technologies), [NFR-005](../REQUIREMENTS.md#nfr-005---usability), and [AC-001 and AC-003](../REQUIREMENTS.md#8-minimum-acceptance-criteria). Those rules require images on list cards and detail views and clear, usable presentation; they do not select image ownership or transport.

Accepted decisions narrow the choice:

- [ADR-0001](../adrs/0001-use-a-modular-monolith-workspace.md) defines the modular browser/API boundary and currently rejects a browser dependency on the external character API.
- [ADR-0003](../adrs/0003-use-postgresql-for-relational-persistence.md) makes migrations authoritative and anticipates a persisted image URL without defining whether it is upstream- or application-owned.
- [ADR-0004](../adrs/0004-use-the-database-as-the-runtime-source-of-truth.md) makes PostgreSQL the runtime character-data source, project GraphQL the browser data API, and the public API an explicit-ingestion dependency.
- [ADR-0006](../adrs/0006-define-a-use-case-oriented-graphql-contract.md) fixes non-null `imageUrl` fields in project-owned GraphQL projections and rejects a parallel product REST API.
- [ADR-0007](../adrs/0007-use-cache-aside-for-character-searches.md) caches only the CharacterSummary projection, including `imageUrl`, and invalidates it after import commits.
- [ADR-0008](../adrs/0008-use-deterministic-bootstrap-and-idempotent-sync.md) requires explicit, idempotent, transactional ingestion and best-effort post-commit cache invalidation. Materialized images therefore need defined publication, rollback, retry, and cleanup semantics.
- [ADR-0009](../adrs/0009-keep-frontend-state-close-to-its-owner.md) requires meaningful alternative text, stable image geometry, and a layout-safe failure state.
- [ADR-0010](../adrs/0010-use-a-targeted-automated-testing-strategy.md) requires deterministic fixtures and forbids live public-API dependence in automated tests.
- [ADR-0011](../adrs/0011-define-the-typescript-test-harness.md) assigns DOM semantics to jsdom, actual request/loading observation to the narrow Chromium boundary, and fail-closed network behavior to upstream adapter tests.
- [ADR-0012](../adrs/0012-use-a-build-first-programmatic-migration-lifecycle.md) governs any later schema migration required by the selected image contract; TASK-016 defines consequences but implements no migration.

The [specification index](../specs/README.md) routes TASK-016 to [HS-020](../specs/HARD_SPEC.feature) and the DG-004 paths in SPEC-001, SPEC-003, SPEC-007, SPEC-008, and SPEC-010 in [SPEC.feature](../specs/SPEC.feature). These derived rules cover card and detail images, layout-safe image failure, GraphQL `imageUrl`, and ingestion. Their additional requirement tags describe downstream effects and do not enlarge TASK-016's direct mapped scope.

In this plan, “image location” means the value stored or returned to identify where image bytes can be obtained. “Application-owned location” means a stable location whose public origin and route semantics are controlled by this project, not necessarily that PostgreSQL stores the bytes. “Materialization” means copying upstream bytes into project-controlled durable or cache storage. “Product data API” means the character query and mutation contract, which must remain GraphQL-only; a selected asset-only route cannot become an arbitrary forwarding or parallel REST endpoint.


## Scope and Non-Goals


TASK-016 includes:

- three comparable, primary-source-grounded reports for the gate-required delivery boundaries;
- one owner-approved ADR defining the complete upstream reference, acquisition, persistence, cache, GraphQL, byte-delivery, browser, failure, security, and cleanup contract;
- exact treatment of ADR-0001, ADR-0004, and ADR-0006, including preserved clauses and governed supersession where a selected boundary conflicts;
- a clear distinction between semantics decided now and runtime evidence owned by TASK-005, TASK-006, TASK-007, TASK-010, TASK-011, and TASK-012;
- content-rights, attribution, acceptable-use, privacy, security, availability, deployment, reversibility, and operational consequences at the level needed to choose responsibly;
- documentation synchronization and stable traceability after approval; and
- validators, relevance checks, negative artifact searches, and task-closure documentation evidence.

TASK-016 does not include:

- creating or changing manifests, lockfiles, dependencies, TypeScript configuration, environment files, application or test source, migrations, models, database columns, image assets, storage buckets, routes, GraphQL resolvers, Redis values, browser policies, fixtures, or commands;
- downloading, copying, transforming, persisting, caching, serving, or displaying character image bytes;
- calling the public character-data API as implementation behavior or treating a planning probe as an automated test;
- selecting DG-003's GraphQL client, adding a general product REST API, changing task dependencies, or assigning implementation work to a task not authorized by the canonical graph;
- changing mandatory-versus-optional source classification or adding an optional commitment;
- rewriting accepted ADRs, dated reviews, completed plans, or chronological records as though their historical state had always matched the new decision; or
- marking a SPEC/HS scenario executable or passing without downstream repository and runtime evidence.


## Decision Review Contract


### Authority, artifact, and approval boundary


- Owning task and gate: TASK-016 resolves DG-004.
- Current authority state: TASK-016 `Pending`; DG-004 `Pending`; ADR-0012 is the highest allocated ADR. Plan creation leaves those states unchanged.
- Proposed artifact: `docs/adrs/NNNN-define-character-image-delivery-boundary.md`, with working title “Define the Character-Image Delivery Boundary”; replace `NNNN` with the next collision-safe sequence only immediately before drafting. Sequence number `0013` is currently expected but not reserved.
- Direct mapped scope: FR-FE-001, FR-FE-003, NFR-001, NFR-005, AC-001, and AC-003.
- Governing decisions: ADR-0001, ADR-0003, ADR-0004, ADR-0006, ADR-0007, ADR-0008, ADR-0009, ADR-0010, ADR-0011, and conditionally ADR-0012.
- Derived decision guard and paths: HS-020 and DG-004 paths in SPEC-001, SPEC-003, SPEC-007, SPEC-008, and SPEC-010.
- Approval boundary: analyst `DRAFT READY` and reviewer `PASS` authorize only the next workflow step. Only explicit project-owner approval may accept the ADR or resolve DG-004.
- Forbidden scope: every implementation artifact and behavior listed in Scope and Non-Goals, any undeclared hybrid candidate, a general proxy, an undocumented product REST surface, live-upstream automated tests, silent accepted-ADR conflict, premature task/gate/ADR state changes, or dependency/scope changes made only inside this plan.

Before formal research, the executor must change TASK-016 to `In progress` in the authoritative implementation plan and append a `Started` record. DG-004 remains `Pending`. If the selected contract needs migration or route work not owned by the current graph, reconcile the canonical implementation plan through its governing workflow or return `OWNER DIRECTION`; this ExecPlan cannot silently create ownership.


### Risk posture and candidate shapes


Use the repository's risk-triggered path. Asset materialization can introduce identity, integrity, cross-resource recovery, cleanup, concurrency, and cross-platform key semantics. Runtime application delivery can introduce SSRF, redirect, open-proxy, resource-exhaustion, and cache semantics. A direct browser exception can contradict accepted browser/upstream boundaries and introduce third-party privacy, CSP, and availability consequences. Any closely ranked or contradictory result, deferred decision-semantic uncertainty, or decision-critical mechanics introduced during correction independently keeps the triggered checkpoint active.

Create three separate read-only technology-researcher reports with identical inputs, criteria, evidence standards, and output structure:

| Candidate | Required complete boundary |
|---|---|
| `INGEST-COPY` | The explicit TASK-005 importer acquires and validates image bytes, publishes them to durable application-owned asset storage, and persists or derives an application-owned location. Runtime browser delivery does not depend on the upstream host. |
| `APP-DELIVERY` | Persistence retains a validated upstream source reference while GraphQL returns a stable application-owned asset location. A bounded asset-only application handler fetches upstream bytes on a controlled server request or cache miss and may use a fully specified application cache. It is neither an arbitrary proxy nor ingestion-time copying. |
| `DIRECT-ASSET-EXCEPTION` | Persistence and GraphQL retain a validated upstream HTTPS image URL. Only browser image elements may request the exact allowed external asset destination; JavaScript and product-data requests remain project-GraphQL-only. |

A researcher may compare subvariants needed to make its assigned boundary credible, but its report must advance one complete contract. A hybrid that moves acquisition timing or byte ownership across candidate boundaries requires a contract amendment, comparable re-research, and a new analyst barrier.


### Common criteria, evidence classes, and report shape


Apply the ADR scoring rubric consistently: requirements traceability 20 points; architectural fit 20; options and trade-offs 15; feasibility and proportionality 15; quality attributes 10; verifiability 10; evolution and reversibility 10.

Every report must address:

1. Normal list/detail image behavior and meaningful alternative text with layout-safe failure.
2. End-to-end ownership of the upstream `image` reference, character-to-image association, PostgreSQL image field or key, cached summary `imageUrl`, GraphQL `imageUrl`, image bytes, public origin, and browser destination, including a mapping-only association swap that preserves member sets.
3. Compatibility with ADR-0001, ADR-0004, and ADR-0006, including exact preservation, specialization, or governed supersession.
4. Import idempotency, acquisition/publication ordering, reimport, partial failure, rollback, retry, concurrency, cleanup, and recovery.
5. Cache safety: stable versus request-derived URLs, origin ownership, Redis projection lifetime and invalidation, byte-cache lifetime, content versioning, and signed or expiring URL compatibility.
6. Security and privacy: scheme/host/port/path/query rules, redirect policy, SSRF/open-proxy prevention, path/key safety, content type and size validation, sniffing, CSP, referrer and credentials policy, third-party contact, and secret-safe diagnostics.
7. Availability and performance during upstream failure or external-network-disabled runtime, browser/application caching, resource limits, and concurrent access.
8. Local, CI, clean-clone, immutable-build, multi-instance, cross-platform, and deployment feasibility without silently selecting a vendor, including complete input, framing, encoding, normalization, algorithm/version, and expected-output rules for any derived URL, key, path, byte, or association identity.
9. Deterministic validation without live public-API calls in automated tests, including success and failure fixtures and the smallest justified Chromium observation.
10. Evolution and reversal cost: schema/data migration, URL cutover, stored bytes, cache transition, rollback, and orphan cleanup.
11. Primary evidence for content rights, attribution, redistribution, proxying, and hotlinking or a clearly labeled unresolved owner-controlled risk; the API software license must not be generalized to image content without evidence.

Permitted evidence classes are repository authorities and current-tree evidence; dated official upstream documentation and fixed-ID protocol observations; official browser, protocol, runtime, framework, database, storage, and security documentation; reproducible read-only probes or disposable out-of-tree experiments; and explicitly labeled inference or uncertainty. Decision-critical claims may not rely only on blogs, tutorials, agent memory, or inaccessible transcripts. Remote observations must state date, request shape, result, and that they are observations rather than upstream guarantees.

Each report must contain scope, repository constraints, primary sources with date/version, the full criterion-by-criterion assessment, benefits, costs, risks, unknowns, decide-now items, prove-later items, credible implementation boundary, preliminary score, confidence, reversal triggers, and a credibility verdict. No report may select the project architecture.


### Required ADR-local outputs


The proposed ADR itself, rather than only this plan or an agent transcript, must contain:

- authority and conflict map, exact scope, assumptions, and non-goals;
- all three end-to-end candidate flows and a common-criteria comparison matrix;
- one unambiguous selected boundary contract and reasoned rejection of alternatives;
- a stage table naming owner, stored value, bytes, caller, destination, lifetime, and transformation at every hop;
- normative examples for two fixed characters from upstream reference through persistence, Redis, GraphQL, and browser request, plus a mapping-only swap that preserves the same character and image-location member sets but must fail the selected association-integrity rule;
- whenever a URL, key, path, byte digest, or association determines identity, a complete versioned input inventory, unambiguous framing and encoding, normalization and comparison rules, algorithm where applicable, and exact expected outputs for logically equivalent Windows/POSIX fixtures and mapping-only tampering; if no platform-dependent or derived identity exists, an explicit explanation and falsifiable vector must prove that boundary;
- acquisition, publication, reimport, partial-failure, recovery, concurrency, cleanup, and reversal state models, with explicit no-change statements where a concern does not apply;
- browser and server request allow/deny matrices and an abuse/security boundary table;
- exact `imageUrl` semantics, public origin rules, cache/version behavior, fallback outcome, and deployment assumptions;
- persistence, migration, storage, route, cache, observability, privacy, content-rights/attribution, and operational consequences;
- exact preservation, specialization, or supersession relationship to ADR-0001, ADR-0004, and ADR-0006, including reciprocal lifecycle metadata required by ADR governance;
- a deterministic downstream proof map to TASK-005, TASK-006, TASK-007, TASK-010, TASK-011, and TASK-012 and an ownership disposition for any required migration or asset-route work;
- risks, mitigations, residual risks, reversal triggers, and migration/cutover path;
- full 100-point rubric, recommendation, confidence, dissenting evidence, primary references, evidence dates, and unresolved limitations; and
- an explicit statement that the ADR defines direction only and implements no application behavior.


### Hard gates, score invariants, and authority states


- Ambiguity about stored or returned `imageUrl`, character-to-image association, identity inputs or canonicalization, byte ownership, acquisition time, browser destination, cache lifetime, failure/recovery, security boundary, content-handling risk, or required ADR relationship blocks `DRAFT READY`.
- No candidate may create a runtime public character-data query, arbitrary forwarding endpoint, broad public-API browser exception, or undocumented product REST API.
- Automated tests must remain deterministic and independent of the live public API. Current remote behavior can inform a decision but cannot become a test prerequisite.
- An application route must be asset-only and derive or validate a bounded target; a direct exception must be exact and asset-only; a copy strategy must define durable publication, stable identity, replacement, and cleanup.
- A numeric score cannot override mandatory-scope conflict, an open accepted-ADR contradiction, missing measurable validation, a hidden high-impact assumption, or unsupported rights/acceptable-use claim.
- Recommendation labels must match the score: 85–100 `Accept`; 75–84 `Accept with explicit follow-ups and residual risks`; 60–74 `Revise` while proposed; below 60 `Reject`. Any open hard gate overrides the numeric label.
- Before owner approval, the ADR remains `Proposed`, DG-004 remains `Pending`, TASK-016 is `In progress`, and all downstream task states remain unchanged.
- After explicit approval, the ADR may become `Accepted` and DG-004 `Resolved`. TASK-016 becomes `Complete` only after authority synchronization, relevance checks, validators, negative artifact checks, and documentation closure.
- Analyst and reviewer outputs never perform an authority transition. If official evidence cannot support a required content-handling assertion, the analyst returns `OWNER DIRECTION` or carries the exact limitation to an explicit owner-controlled disposition rather than inventing permission.


### Decide now versus prove later


| Decide in TASK-016 | Prove in downstream implementation |
|---|---|
| Which complete boundary governs image delivery. | Source, schema, route, storage, and UI implementation through the TDD cycles owned by later tasks. |
| Exact meaning and owner of stored and returned image locations and bytes. | TASK-005 importer, idempotency, acquisition, publication, failure, retry, and cleanup evidence. |
| Allowed server/browser destinations, URL/key/association identity, framing and normalization, redirect and host policy, public origin, and accepted-ADR relationship. | TASK-006 GraphQL mapping, exact summary/detail `imageUrl`, association-integrity, and no-runtime-character-data-query evidence. |
| Acquisition timing, transaction/publication ordering, replacement, cache version, recovery, cleanup, and reversal semantics. | TASK-007 cached-summary compatibility, stale-value bounds, and invalidation evidence. |
| Security, privacy, rights/attribution disposition, failure outcomes, and measurable defaults or bounded configuration rules. | TASK-010 deterministic Chromium request trace, normal rendering, selected network boundary, CSP/referrer behavior, and upstream-disabled failure evidence. |
| Normal list and detail image visibility using the same selected boundary and association. | TASK-010 proves card-image behavior; TASK-011 proves FR-FE-003, AC-003, and SPEC-003 detail-image behavior. |
| Deterministic fixture contract and which observations require jsdom, PostgreSQL/Redis integration, or Chromium. | TASK-012 meaningful alt text, fallback, and 375/768/1280 layout evidence. |
| Which existing task owns every later artifact; canonical-plan reconciliation if no owner exists. | Exact commands and runtime measurements after their owning tasks create the executable boundaries. |

A downstream task may prove a defined semantic contract. It must not choose host policy, identity, recovery, cache ownership, content-handling posture, or ADR supersession on TASK-016's behalf.


### Cumulative invariant packet


`IR-A` is the fresh pre-draft contract reviewer. `IR-B` is a different fresh final-artifact reviewer. “Actual result” remains `Not run` until evidence is captured in this plan.

| ID | Trigger or fixture | Expected result | Evidence / actual result | Reviewer |
|---|---|---|---|---|
| `IMG-INV-01-COVERAGE` | Every synthesis and material revision | All authorities, candidates, criteria, ADR outputs, downstream owners, and documentation impacts are mapped with no missing candidate. | Analyst coverage matrix and exact artifact/diff checklist / Plan-registration contract definition passed corrected independent review; decision synthesis not run. | Analyst, then IR-B |
| `IMG-INV-02-HONESTY` | Every evidence-bearing claim | Primary or reproducible support; inference and unknowns labeled; no implementation, approval, or passing claim without evidence. | Citation ledger, dated probes, tree and negative-artifact checks / Not run. | IR-B |
| `IMG-INV-03-AUTHORITY` | Plan-only, active, pre-approval, and post-approval snapshots | Task, gate, ADR, score, recommendation, verdict, documentation impact, and next action agree with the current checkpoint. | Exact diff, owner-approval evidence, state searches, validators / Plan-only snapshot passed at 2026-08-11 02:35Z; later snapshots not run. | IR-B |
| `IMG-INV-04-OWNERSHIP` | Two fixed characters, one changed reimport, and a mapping-only swap that preserves both character and image-location member sets | Each character retains one unambiguous upstream-to-stored-to-cached-to-GraphQL-to-browser association; the valid vector passes, the swapped vector fails for the defined reason, and no product-data bypass exists. | ADR stage table and exact pass/swap-fail normative outputs / Not run. | IR-A and IR-B |
| `IMG-INV-05-FAILURE` | Valid image plus 404, timeout, hostile redirect, invalid type/size, and upstream-disabled fixtures | Normal delivery is possible; failures are bounded, deterministic, alt-preserving, and layout-safe without live-network tests. | ADR failure matrix and downstream proof map / Not run. | IR-A and IR-B |
| `IMG-INV-06-SECURITY` | Disallowed scheme/host/port/path/query, hostile redirect, oversized/non-image response, and arbitrary route input | No SSRF, open proxy, path traversal, unsafe content, secret leakage, broad browser exception, or third-party contact hidden from the decision. | Request/threat matrix and primary security evidence / Not run. | IR-A and IR-B |
| `IMG-INV-07-MATERIALIZED` | Copying or byte caching is selected | Complete versioned identity inputs, framing, encoding, normalization, and algorithm; collision-safe association; exact Windows/POSIX-equivalent key/path and expected-output vectors; bounded size/type; atomic publication ordering; idempotent replacement; defined concurrency, cleanup, and recovery. | Mapping-swap and cross-platform normative vectors, state model, independently reproduced probe, later TASK-005 evidence / Not run unless triggered. | IR-A and IR-B |
| `IMG-INV-08-APP-DELIVERY` | Application delivery is selected | Stable app-owned GraphQL URL; bounded target derivation, fetch, redirect, caching, and resource policy; route is neither arbitrary proxy nor product REST API. | Route/request contract and later API/browser evidence / Not run unless triggered. | IR-A and IR-B |
| `IMG-INV-09-DIRECT` | Direct browser exception is selected | Exact HTTPS asset exception and accepted-ADR relationship; public data endpoints remain forbidden; CSP/referrer/credentials, privacy, availability, and fallback are explicit. | Destination matrix, dated upstream evidence, later Chromium trace / Not run unless triggered. | IR-A and IR-B |
| `IMG-INV-10-RIGHTS` | Every candidate and recommendation | No unsupported content-license inference; copying, proxying, hotlinking, attribution, and acceptable-use implications are evidenced or explicitly assigned to owner direction. | Official terms/about evidence and limitation ledger / Not run. | Analyst, IR-A, and IR-B |
| `IMG-INV-11-DOWNSTREAM` | Proposed selection and every material revision | TASK-005/006/007/010/011/012 proof ownership is complete; list, detail, cache, migration, and route ownership are mapped, and any gap is reconciled canonically or stops at owner direction. | Task graph, specification routing, and ADR proof map / Not run. | IR-A and IR-B |
| `IMG-INV-12-DERIVED-IDENTITY` | Any URL, key, path, byte representation, or association determines or validates identity | The ADR inventories every identity input and defines versioned framing, encoding, normalization, comparison, and algorithm where applicable; exact Windows/POSIX-equivalent vectors produce the same expected identity, and a two-character mapping-only swap produces the exact rejection outcome. | Normative vectors plus independent reproduction from the prose contract / Not run when triggered. | IR-A and IR-B |

Re-run the full applicable packet after every material revision, not only the previously failing row. Adding decision-critical identity, caching, recovery, canonicalization, request, security, or ownership mechanics invalidates the prior contract checkpoint and requires the applicable analyst/reviewer barrier again.


### Research, correction, escalation, and stopping rules


1. Wait for all three durable reports before synthesis. A report is incomplete until its decision-critical summary exists in this plan.
2. The decision analyst audits comparability and every contract item, then returns exactly `DRAFT READY`, `RETURN FOR RESEARCH`, or `OWNER DIRECTION`.
3. `RETURN FOR RESEARCH` causes targeted work under the same criteria for every affected candidate. `OWNER DIRECTION` stops without filling in the owner's value choice.
4. After `DRAFT READY`, IR-A performs the triggered pre-draft contract checkpoint. Permit one supported outline correction. If the checkpoint still does not pass, return to research/analysis or owner direction; do not draft.
5. The primary thread rechecks ADR numbering and is the sole writer of the proposed ADR and coordinated repository diff.
6. A different fresh IR-B reviews the complete artifact, contract, evidence, applicable invariant packet, validators, and exact diff and returns `PASS`, `PASS WITH FOLLOW-UPS`, `REVISE`, or `BLOCKED`.
7. Allow at most two supported final-artifact correction cycles. Each cycle reviews the complete artifact and reruns every applicable invariant.
8. New decision-critical mechanics invalidate the pre-draft checkpoint. Amend the contract and rerun the applicable analyst/reviewer barrier without silently resetting the correction count.
9. After two unsuccessful cycles, freeze the proposal and request owner direction. An owner-authorized fix receives only the explicitly authorized review budget.
10. Before owner presentation, reconcile verdict, open findings, hard gates, score, recommendation, ADR status, TASK-016/DG-004 states, downstream states, documentation impact, and next action.
11. Stop for explicit approval. No agent result may accept the ADR, resolve DG-004, or close TASK-016.


## Plan of Work


### Milestone 1: Start TASK-016 and establish a collision-safe baseline


Immediately before starting, re-read the root current status, TASK-016, DG-004, ADR index, working tree, and routed rules. Confirm that plan creation did not change TASK-016 or DG-004 from `Pending`, and compare all current ADR filenames because sequence number `0013` is only an expectation. If another task or owner changed the state or graph, reconcile the authoritative owner before continuing.

Start decision work by changing TASK-016 to `In progress` in `docs/IMPLEMENTATION_PLAN.md`, leaving DG-004 `Pending`, synchronizing the root status if materially affected, and appending a `Started` entry to the execution log. Do not create the ADR yet. Record the timestamp and exact tree/numbering evidence in Progress and Artifacts and Notes.

Milestone 1 is complete when current authorities agree on `In progress`/`Pending`, the working tree is understood, no controlled implementation artifact exists, the documentation validator and whitespace check pass, and all three research assignments can cite the same frozen contract.


### Milestone 2: Produce three comparable end-to-end reports


Create one read-only technology researcher for each candidate in the Decision Review Contract. Give each the identical repository authority packet, eleven criteria, evidence classes, output shape, score rubric, and stop conditions. Researchers may inspect primary web sources and run safe read-only probes, but they must label observations and may not edit the repository or recommend architectural acceptance.

As each report finishes, copy its decision-critical evidence into the Durable Research Record: research time; upstream/framework/spec version or access date; primary links; criterion results; current observations; unsupported claims; unknowns; preliminary score; confidence; reversal triggers; and credibility verdict. Do not rely on the agent transcript as the durable record. A pre-contract planning probe may be cited only as a lead to refresh, never as formal candidate completion.

Milestone 2 is complete only when all three summaries are independently understandable and comparable, rights/acceptable-use limitations are explicit, and no candidate omits identity, failure/recovery, cache, security/privacy, deployment, deterministic proof, or reversal consequences.


### Milestone 3: Cross the analysis and pre-draft contract barriers


Give the complete durable reports and current contract to a read-only decision analyst. Require an authority audit, evidence-quality and asymmetry audit, normalized matrix, rubric score for each candidate, ordered ranking, recommendation, confidence, dissent, gaps, reversal triggers, and proposed ADR outline. Preserve all of that in the Durable Research Record before acting on its exact readiness result.

If the result is `RETURN FOR RESEARCH`, update Progress and the contract record, perform only the requested comparable research, and repeat analysis. If it is `OWNER DIRECTION`, stop and present the unresolved value or evidence choice. If it is `DRAFT READY`, apply the risk triggers and send the contract, reports, matrix, and proposed outline to fresh reviewer IR-A. Record every invariant result. One supported outline correction is permitted; a non-passing result after that returns to research/analysis or owner direction.

Milestone 3 is complete only with recorded `DRAFT READY`, an IR-A `PASS`, no open hard gate, and no decision-critical content living only in an agent transcript.


### Milestone 4: Draft, score, validate, and independently review the proposed ADR


Re-list `docs/adrs/` and allocate the next unused sequential number. The primary thread drafts the ADR using the approved outline and required ADR-local outputs, marks it `Proposed`, updates the ADR index only to represent the proposal accurately, and synchronizes any pre-approval current-status or execution chronology that changed. Do not resolve DG-004 or describe the selected path as approved or implemented.

Run both repository validators, `git diff --check`, authority-state searches, link/ID checks, and controlled-artifact/disabled-test searches. Re-run the complete applicable invariant packet. Then assign a different fresh IR-B to the exact proposed ADR, durable evidence, contract, validators, and repository diff. Apply at most two supported correction cycles under the contract. A material semantic addition reopens the pre-draft barrier.

Milestone 4 is complete only when the exact integrated proposal has a review verdict compatible with its score and recommendation, all hard gates are closed or explicitly stop at owner direction, validators pass, and post-verdict reconciliation identifies owner approval as the sole next controlled action.


### Milestone 5: Obtain explicit project-owner approval


Present the selected strategy, end-to-end ownership flow, alternatives, score, confidence, supersession effects, security/privacy and rights limitations, downstream proof map, residual risks, review verdict, and exact proposed ADR link. Ask for explicit approval, requested revision, rejection, or direction on any owner-controlled limitation.

Approval is not implied by silence, a score, analyst readiness, reviewer pass, or permission to continue research. If the owner requests a material change, update this contract and return to the applicable research/review checkpoint. Milestone 5 completes only with durable explicit approval of the exact reviewed proposal.


### Milestone 6: Resolve DG-004 and close TASK-016 after approval


After approval only, change the ADR to `Accepted`, update the ADR index, mark DG-004 `Resolved` with a link, and keep TASK-016 `In progress` while synchronizing affected documentation. Define reciprocal status or relationship metadata for any affected ADR rather than silently editing historical rationale. Replace pending image-boundary placeholders in the system diagram and current UI/specification guidance with links to the accepted owner, while leaving downstream SPEC/HS behavior specified but unexecuted.

Review and update the implementation plan, system diagram, specification index, HS-020, DG-004-routed SPEC wording, current UI/image guidance, root current status, and execution chronology according to actual decision impact. Do not rewrite dated reviews, completed plans, or older chronological entries. Mark TASK-016 `Complete` only after its definition of done, relevance audit, documentation-impact audit, validators, negative checks, final diff review, and plan retrospective pass. Then move this file to `docs/plans/completed/` with the same filename and repair every inbound link in the same change.

No production Red-Green-Refactor cycle applies to TASK-016 because it creates decision documentation only. The later production tasks named in the proof map must execute ADR-0010 cycles. Record that relevance result explicitly rather than inventing a test command.


## Concrete Steps


Run commands from `C:\Users\mmjos\Desktop\workbeanch\rick-and-morty-test` in PowerShell. These commands inspect or validate documentation; they do not implement the selected boundary.

Baseline and restart inspection:

    git status --short
    rg -n "TASK-016|DG-004" README.md docs PLANS.md .codex
    Get-ChildItem docs\adrs\*.md | Sort-Object Name | Select-Object -ExpandProperty Name
    git ls-files

Expected before start: TASK-016 and DG-004 are `Pending`; ADR-0012 is the highest allocated ADR; this active plan is registered; no application artifact exists. At any restart, the recorded Progress state may instead require TASK-016 `In progress`, but DG-004 must remain `Pending` until owner approval.

Validate the plan-registration or later decision-documentation diff:

    python .agents\skills\verify-repository\scripts\validate_docs.py --repo .
    python .agents\skills\govern-adrs\scripts\validate_adrs.py --repo .
    git diff --check
    Select-String -Path docs\plans\TASK-016-character-image-delivery-decision.md -Pattern '[ \t]+$'
    git status --short
    git diff -- README.md docs\IMPLEMENTATION_PLAN.md docs\plans docs\execution\decision-and-progress-log.md docs\adrs docs\SYSTEM_DIAGRAM.md docs\specs docs\ui

Expected: both validators exit zero; only documented pre-existing warnings may remain; `git diff --check` exits zero; `Select-String` prints no trailing-whitespace match for the untracked active plan; and the status plus diff contain only authorized decision documentation for the current milestone.

Check authority states before owner approval:

    rg -n "\| DG-004 \| Pending|\| TASK-016 \| (Pending|In progress)" docs\IMPLEMENTATION_PLAN.md
    rg -n "Status: Proposed|Status: Accepted" docs\adrs
    rg -n "TASK-005|TASK-006|TASK-007|TASK-010|TASK-011|TASK-012" docs\IMPLEMENTATION_PLAN.md docs\specs\README.md

Expected: the proposed ADR is not accepted, DG-004 remains `Pending`, TASK-016 is `In progress` only after the recorded start, and downstream task states and dependencies are unchanged.

Check for forbidden implementation and test artifacts. The exact expression may be extended if the repository gains legitimate artifacts before TASK-016 runs; record and review every difference rather than assuming an empty result:

    git ls-files | rg "(^|/)(package\.json|pnpm-lock\.yaml|yarn\.lock|package-lock\.json|tsconfig[^/]*\.json|vite\.config\.[^/]+|vitest\.config\.[^/]+|playwright\.config\.[^/]+|.*\.(ts|tsx|js|jsx|jpeg|jpg|png|webp|gif|avif))$"
    rg -n "(^|\W)(describe|it|test)\.(only|skip)|(^|\W)(fdescribe|fit|xdescribe|xit|xtest)\W" --glob "*.{ts,tsx,js,jsx}" .

Expected at plan creation and TASK-016 closure: no controlled application, image, migration, route, executable test, manifest, lockfile, or runner artifact was introduced by this task. If later owning tasks have legitimately added files, inspect `git diff` and attribution instead of requiring the whole repository to remain empty.

After explicit approval, verify accepted-state synchronization:

    rg -n "\| DG-004 \| Resolved|\| TASK-016 \| Complete" docs\IMPLEMENTATION_PLAN.md
    rg -n "Status: Accepted" docs\adrs
    rg -n "HS-020|SPEC-001|SPEC-003|SPEC-007|SPEC-008|SPEC-010" docs\specs
    rg -n "TASK-016-character-image-delivery-decision" README.md docs

Expected: the accepted ADR, resolved gate, complete task, affected guidance, execution chronology, root current status, completed-plan path, and inbound links agree. This state is invalid without explicit project-owner approval evidence.


## Validation and Acceptance


Plan-registration acceptance requires all of the following:

- this file is self-contained, active under `docs/plans/`, and registered as `Ready to execute` while authoritative TASK-016 and DG-004 remain `Pending`;
- TASK-016 links to the plan, its stale parallelism wording is current, and its governing/validation context includes ADR-0001 plus the accepted test and conditional migration decisions without changing direct mapped scope or dependencies;
- the root status and chronological log disclose the active plan and lack of implementation, with no ADR number reserved;
- the Decision Review Contract contains all required authority, criteria, evidence, ADR-output, hard-gate, decide/prove, invariant, review, correction, and owner-stop controls;
- the documentation and ADR validators and `git diff --check` pass; negative searches and diff inspection find no controlled implementation artifact; and
- a fresh read-only independent reviewer finds no material plan defect or every supported finding is corrected and revalidated.

TASK-016 completion acceptance later requires:

- three complete comparable reports and an in-plan durable research record;
- decision analyst `DRAFT READY` and fresh IR-A contract `PASS` for the exact outline;
- a complete proposed ADR with all required local outputs, score/recommendation consistency, full applicable invariant results, passing validators, and a different fresh IR-B final result compatible with owner presentation;
- explicit project-owner approval of the exact reviewed proposal;
- an accepted ADR, DG-004 `Resolved`, TASK-016 `Complete`, current reciprocal ADR relationships, synchronized system/spec/UI/current-status/log navigation, and unchanged canonical dependencies unless separately authorized;
- no claim that images, storage, routes, migrations, cache mappings, browser behavior, or tests are implemented by this task; and
- closure-time relevance, documentation-impact, negative artifact/test, validator, whitespace, link, and exact-diff evidence, followed by preserving this plan under `docs/plans/completed/`.

No TDD Red-Green-Refactor cycle applies because this task changes decision and planning documentation without production behavior. The replacement evidence is structural and semantic validation, authority-state checks, independent contract and final-artifact review, owner approval, and negative implementation/test searches. Downstream production tasks must record their own Red, Green, and post-Refactor commands.


## Idempotence and Recovery


Read-only inspection, source retrieval, validators, `rg`, and `git diff --check` are safe to repeat. Research may be repeated when dates, versions, upstream headers, terms, or repository authorities change; preserve the old summary as dated evidence and append the new result rather than silently replacing history.

Before every write, inspect `git status --short` and the exact target diff because TASK-003 or another owner may be active. The primary TASK-016 thread is the sole writer. Researchers, the decision analyst, and independent reviewers remain read-only. Never overwrite or revert another task's edits; reconcile overlapping authority changes in place.

If execution stops before drafting, resume from Progress, the current authority snapshot, the Durable Research Record, and the latest exact analyst or IR-A result. If an ADR number collision occurs, allocate the next unused sequence and update only current plan/progress references; sequence number `0013` was never reserved. If research produces a new candidate shape or decision-semantic mechanic, amend this contract and repeat comparable research and the applicable barrier.

If a validator fails, repair only the reported current-authority or link/ID defect, rerun the complete validator set, and record the result. Do not use `git reset --hard`, delete historical documentation, renumber accepted ADRs, or resolve a conflict by discarding unrelated changes.

If final review exhausts two correction cycles, freeze the proposal and request project-owner direction. If approval is withheld or the proposal is rejected, preserve the ADR as `Proposed` or apply the ADR workflow's rejected/superseded lifecycle, keep DG-004 `Pending`, record the owner outcome, and update this plan's remaining work. If post-approval closure fails, keep TASK-016 `In progress`, repair the closure defect, and do not move the plan until the authoritative task is `Complete`.


## Artifacts and Notes


### Plan-registration authority snapshot


- Root: `C:\Users\mmjos\Desktop\workbeanch\rick-and-morty-test`.
- Snapshot time: 2026-08-11 02:10Z.
- Branch/tree: `main`; clean before plan creation.
- Task/gate: TASK-016 `Pending`; DG-004 `Pending`; no prerequisites.
- ADR sequence: ADR-0012 highest allocated; sequence number `0013` currently next but unreserved.
- Direct scope: FR-FE-001, FR-FE-003, NFR-001, NFR-005, AC-001, AC-003.
- Routed rules: HS-020; DG-004 paths in SPEC-001, SPEC-003, SPEC-007, SPEC-008, SPEC-010.
- Controlled artifacts: no application manifests, source, tests, migrations, image files, storage or route configuration, GraphQL mapping, Redis behavior, or browser image implementation.


### Pre-contract planning evidence


A read-only direct-browser probe dated 2026-08-10 found a consistent current upstream avatar URL pattern for fixed IDs, current `image/jpeg` responses, and browser-policy considerations. It also found no official permanence/SLA promise and no image-content license grant on the API About page. Because this evidence predates the contract and lacks symmetric peer reports, it receives no research-barrier credit. The formal `DIRECT-ASSET-EXCEPTION` researcher must independently refresh, qualify, and preserve any claim used by the decision.

Initial primary leads, not accepted conclusions:

- `https://rickandmortyapi.com/documentation/#character-schema`
- `https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10,11,12,13,14,15`
- `https://rickandmortyapi.com/about`
- `https://html.spec.whatwg.org/multipage/images.html`
- `https://www.w3.org/TR/CSP3/#directive-img-src`
- `https://w3c.github.io/webappsec-referrer-policy/`
- `https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html`


### Plan-registration review record


- Initial result: `REVISE`. The reviewer found that TASK-011 detail-image proof was absent and that one-character identity examples could not detect association-only swaps or platform-divergent normalization.
- Supported correction: added TASK-007 and TASK-011 to specification/proof ownership; added two-character mapping-swap failure; required complete versioned identity inputs, framing, encoding, normalization, comparison, algorithm where applicable, and exact Windows/POSIX-equivalent expected outputs in the ADR and IMG-INV-04/07/12.
- Revalidation: documentation validator passed 36 Markdown files, 41 requirement IDs, 16 tasks, 17 SPEC rules, 20 HS rules, and 111 scenarios; ADR validator passed 12 ADRs with only the pre-existing NFR-006 warning; whitespace and controlled-artifact checks passed.
- Complete re-review: `PASS` with no material finding. TASK-016 and DG-004 remained `Pending`, sequence number `0013` remained unreserved, canonical dependencies were unchanged, and no implementation artifact existed.
- This review validates plan registration only. It is not the future IR-A pre-draft contract checkpoint or IR-B final-ADR evidence checkpoint, both of which remain mandatory after formal research.


### Durable Research Record


This section is the restart point for decision evidence. Replace `Not started` only after preserving enough source-linked detail to reconstruct the report without agent transcripts.

| Candidate | Formal report state | Research date/version | Primary evidence | Criterion findings and unknowns | Preliminary score / confidence / disposition |
|---|---|---|---|---|---|
| `INGEST-COPY` | Not started | Not recorded | Not recorded | Must cover durable storage, identity, publication/transaction boundary, reimport, cleanup, cross-platform/multi-instance behavior, byte validation, rights, and downstream ownership. | Not scored. |
| `APP-DELIVERY` | Not started | Not recorded | Not recorded | Must cover stable application URL, bounded runtime fetch and cache lifecycle, SSRF/redirect/resource controls, upstream failure, route ownership, no product REST surface, privacy, and rights. | Not scored. |
| `DIRECT-ASSET-EXCEPTION` | Not started | Not recorded | Not recorded | Must cover exact upstream URL semantics, CSP/referrer/credentials, third-party contact, upstream/cache failure, strict host/path validation, ADR conflict, deterministic interception, and rights/acceptable use. | Not scored; pre-contract probe gives no completion credit. |

Normalized matrix to complete after all reports:

| Criterion | Weight | `INGEST-COPY` | `APP-DELIVERY` | `DIRECT-ASSET-EXCEPTION` | Evidence gaps / dissent |
|---|---:|---|---|---|---|
| Requirements traceability | 20 | Not assessed | Not assessed | Not assessed | Not assessed |
| Architectural fit | 20 | Not assessed | Not assessed | Not assessed | Not assessed |
| Options and trade-offs | 15 | Not assessed | Not assessed | Not assessed | Not assessed |
| Feasibility and proportionality | 15 | Not assessed | Not assessed | Not assessed | Not assessed |
| Quality attributes | 10 | Not assessed | Not assessed | Not assessed | Not assessed |
| Verifiability | 10 | Not assessed | Not assessed | Not assessed | Not assessed |
| Evolution and reversibility | 10 | Not assessed | Not assessed | Not assessed | Not assessed |
| Total | 100 | Not scored | Not scored | Not scored | Hard gates override total |

Decision-analysis record:

- Report comparability audit: Not run.
- Contract coverage audit: Not run.
- Ordered ranking and scoring method: Not recorded.
- Recommendation and confidence: Not recorded.
- Dissent and unsupported assumptions: Not recorded.
- Required additional research: Not recorded.
- Reversal triggers: Not recorded.
- Proposed ADR outline: Not recorded.
- Exact readiness result: Not run; must be `DRAFT READY`, `RETURN FOR RESEARCH`, or `OWNER DIRECTION`.

Review checkpoint record:

- IR-A identity and freshness: Not assigned.
- IR-A contract result and invariant packet: Not run.
- Supported outline correction count: 0 of 1.
- Allocated ADR number and collision check: Not allocated.
- IR-B identity and freshness: Not assigned; must differ from IR-A.
- IR-B final result and invariant packet: Not run.
- Final-artifact correction count: 0 of 2.
- Post-verdict reconciliation: Not run.
- Project-owner decision: Not requested.


## Interfaces and Dependencies


This plan adds no runtime dependency. It depends on the repository's document contracts and validation tools:

- `README.md` for current status and documentation routing;
- `PLANS.md` for the living ExecPlan contract;
- `.codex/README.md` for researcher, analyst, risk-triggered checkpoint, fresh-review, bounded-correction, and owner-stop rules;
- `docs/REQUIREMENTS.md` for the six direct mapped IDs;
- `docs/adrs/README.md` and ADR-0001, ADR-0003, ADR-0004, ADR-0006 through ADR-0012 for accepted constraints and lifecycle;
- `docs/IMPLEMENTATION_PLAN.md` for DG-004, TASK-016, dependencies, state, and downstream ownership;
- `docs/specs/README.md`, HS-020, and DG-004 paths in SPEC-001, SPEC-003, SPEC-007, SPEC-008, and SPEC-010 for derived validation routing;
- `docs/SYSTEM_DIAGRAM.md` and `docs/ui/` for decision-derived boundary and browser guidance after approval;
- `docs/execution/decision-and-progress-log.md` for append-only chronology; and
- `.agents/skills/verify-repository/scripts/validate_docs.py` and `.agents/skills/govern-adrs/scripts/validate_adrs.py` for structural validation.

The completed ADR must define future interfaces without implementing them: importer image acquisition or reference validation; persisted image source/key/location and character-association semantics; application asset storage or asset-only route when selected; GraphQL `CharacterSummary.imageUrl` and detail `imageUrl`; Redis summary projection and invalidation/version behavior; TASK-010 card-image and TASK-011 detail-image proof; browser request, CSP/referrer/credentials and fallback boundary; deterministic fixture, mapping-swap, cross-platform identity, and Chromium interception contracts; observability, cleanup, recovery, and deployment configuration; and the explicit task owner for every later artifact.

No package, library, object store, CDN, image transformer, proxy framework, URL-signing mechanism, deployment vendor, or exact configuration value is accepted merely because a candidate report discusses it. The ADR must select only what DG-004 requires, keep KISS proportional to the assessment, and leave implementation versions and commands to their owning tasks unless a semantic choice cannot safely be deferred.


## Revision Note


2026-08-10: Created the active TASK-016 ExecPlan, its living Decision Review Contract, risk-triggered review path, cumulative image-delivery invariant packet, symmetric three-candidate research record, owner-approval boundary, and closure workflow. The plan also records current ADR/task drift and the non-creditable status of pre-contract exploratory evidence. TASK-016 and DG-004 remain `Pending`; no ADR number, strategy, implementation artifact, or product behavior was created.

2026-08-10: Applied the first independent plan review's two supported corrections. Added TASK-011 detail-image and TASK-007 cache ownership to the proof and specification-routing maps, and strengthened identity coverage with two-character association-swap rejection, complete versioned framing/encoding/normalization semantics, and exact Windows/POSIX-equivalent expected-output vectors. No strategy, ADR number, task/gate state, dependency, or implementation artifact changed.

2026-08-10: Recorded the corrected independent `PASS` and exact plan-registration validation evidence. This closes plan creation only; TASK-016 and DG-004 remain `Pending`, formal research has not started, and the future IR-A, IR-B, and project-owner checkpoints remain required.
