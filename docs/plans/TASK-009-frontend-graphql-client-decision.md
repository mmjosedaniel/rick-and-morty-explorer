# Select the Frontend GraphQL Client and Query Cache

This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.


## Progress


- [x] (2026-08-18 20:47Z) Confirmed the owner-authorized decision-only scope on branch `codex/task-009-dg-003-frontend-graphql-decision`, clean HEAD `f6823f09af00533427853f4465d909b2ebd38a51`, and no pre-existing working-tree change.
- [x] (2026-08-18 20:47Z) Read the documentation map, repository policy, research routing, ExecPlan rules, ADR governance, exact DG-003 and TASK-009 records, mapped requirements and specifications, relevant accepted ADRs, and current frontend, GraphQL, manifest, generation, and Vitest boundaries.
- [x] (2026-08-18 20:47Z) Classified the work as `R2`, froze the owner-supplied four-candidate set without a discovery pass, and created this Decision Review Contract before comparative research.
- [x] (2026-08-18 20:47Z) Registered this active ExecPlan, moved TASK-009 to `In progress` under the explicit decision-only authorization, and recorded that DG-003 remains `Pending` with every implementation-controlled path still forbidden.
- [x] (2026-08-18 20:55Z) Passed the corrected registration barrier: ADR validation covered 16 records and 38 requirements with only the established NFR-006 warning; documentation validation covered 58 Markdown files, 41 requirement IDs, 1 authorization, 18 tasks, 17 SPEC rules, 20 HS rules, and 123 scenarios; and `git diff --check` passed.
- [x] (2026-08-18 20:59Z) `TR-009-01` returned `RESEARCH COMPLETE`, compared all four candidates through current official primary sources, found no hard-gate or R3 failure and no material evidence gap, and recommended urql default document caching at 92 over TanStack Query at 89, native fetch at 81, and constrained Apollo at 73.
- [x] (2026-08-18 21:08Z) `DA-009-01` normalized the close ranking to urql 92, TanStack Query 89, native fetch 81, and Apollo 73, froze error precedence and three-way mutation convergence, found no second-researcher or R3 trigger, and returned exactly `DRAFT READY`.
- [ ] Obtain one fresh `independent_reviewer` pre-draft contract checkpoint because the leading candidates remain materially close; permit drafting only after that checkpoint passes.
- [ ] After the pre-draft checkpoint passes, obtain exactly one provenance-mapped, non-authoritative ADR draft from one `research_drafter`.
- [ ] Reconfirm the next unused ADR number immediately before the primary writes the Proposed ADR, then register the proposal and research chronology without changing DG-003 from `Pending`.
- [ ] Send the exact Proposed ADR and complete diff to one fresh `independent_reviewer`; permit at most one bounded correction followed by complete re-review.
- [ ] Run the ADR validator, documentation validator, `git diff --check`, `git status --short`, and `git diff --name-only`; reconcile the final `PASS` and stop at the project-owner approval boundary.
- [ ] Await explicit project-owner approval. Acceptance, DG-003 resolution, TASK-009 completion, plan retirement, and frontend implementation are outside this authorization.


## Surprises & Discoveries


- The implemented GraphQL schema is query-only. `characters` and `character` exist in `apps/api/src/transport/graphql/schema.ts`; favorite and comment mutations remain TASK-008 work. The ADR must define their future client refetch contract without generating or implementing mutation artifacts.
- The web workspace has no GraphQL client, query-cache, operation-generation, request-mocking, or global-state dependency. Its executable web boundary currently contains only the TASK-003 React shell and jsdom tests.
- Backend resolver types are already generated from the project-owned TypeScript schema through GraphQL Code Generator. Frontend operation/result/variable generation can reuse the checked-in schema authority, but no frontend generation configuration or artifact is authorized while DG-003 is pending.
- The root Vitest registry already provides separate `web-unit` and `web-application` jsdom projects with React Testing Library. A proposed request boundary must fit those scopes and must not require live upstream character JSON or a live external GraphQL service in frontend tests.
- The current API returns stable GraphQL `extensions.code` values for expected and unexpected query failures, while ordinary HTTP or fetch failures remain a distinct transport boundary. The client decision must preserve that distinction.
- The documentation validator rejects even a clearly provisional `ADR-*` reference when that stable ID does not exist. The initial plan therefore describes the target as the next collision-safe four-digit ADR and will introduce its stable ID only after the required immediate pre-write collision check.
- `TR-009-01` found that all four candidates can satisfy the hard gates, so no hard disqualification narrows the set. urql and TanStack Query are separated by only three points; this is materially close enough to trigger the contract's conditional decision-analysis route even though the report is otherwise complete.
- Official urql documentation treats its default `cacheExchange` as document caching and Graphcache as a separate normalized-cache addition. That separation fits the gate without introducing Graphcache merely because it exists.
- `DA-009-01` found that a non-success HTTP status and a valid GraphQL error envelope can coexist. The ADR therefore needs explicit category precedence instead of treating HTTP status alone as the operation result.
- A successful mutation followed by a failed detail refetch is neither a mutation rollback nor converged UI success. It is a distinct persisted-but-not-refreshed outcome, so the client must expose the convergence failure without inventing rollback or a durable optimistic copy.
- The close 92/89 ranking remains after analyst normalization. Under `.codex/README.md`, that material closeness requires a fresh R2 pre-draft `independent_reviewer` checkpoint in addition to the later fresh final review of the exact Proposed ADR and diff.


## Decision Log


- Decision: Classify TASK-009/DG-003 research as `R2`.
  Rationale: The choice crosses frontend runtime, GraphQL typing, cache ownership, mutation behavior, and test boundaries; four viable candidates require symmetric comparison; and the output is an owner-controlled Proposed ADR. No security, irreversible data, concurrency, recovery, identity, serialization, cross-platform equivalence, or other `R3` trigger is present.
  Date/Author: 2026-08-18 / Primary coordinator.
- Decision: Skip the optional discovery pass and freeze the owner-supplied candidates.
  Rationale: Repository evidence and the user request already define four credible strategies, common criteria, hard constraints, and forbidden expansion. Discovery would add overhead without resolving a named uncertainty.
  Date/Author: 2026-08-18 / Primary coordinator.
- Decision: Assign one first researcher to evaluate every candidate against the same evidence dimensions.
  Rationale: The unresolved question is one symmetric cross-candidate comparison, not four independent candidate-specific questions. A second researcher is permitted only for a named material gap left by the first report.
  Date/Author: 2026-08-18 / Primary coordinator.
- Decision: Move TASK-009 to `In progress` while preserving DG-003 as `Pending`.
  Rationale: The owner explicitly authorized TASK-009 decision research and Proposed-ADR preparation. That authorization starts the decision task but does not approve an option, resolve the gate, or authorize implementation.
  Date/Author: 2026-08-18 / Primary coordinator.
- Decision: Do not use the optional second researcher.
  Rationale: `TR-009-01` covered every candidate, hard gate, score driver, proportionality dimension, and invariant input and named no material decision-critical evidence gap. Its remaining unknowns are deliberately assigned to implementation-time measurement and version verification.
  Date/Author: 2026-08-18 / Primary coordinator.
- Decision: Invoke one `decision_analyst` before declaring synthesis readiness.
  Rationale: The leading urql and TanStack Query strategies scored 92 and 89. That three-point separation makes them materially close under the recorded R2 analyst trigger even without source conflict or an unresolved evidence gap.
  Date/Author: 2026-08-18 / Primary coordinator.
- Decision: Retain urql at 92 over TanStack Query at 89 after analyst normalization.
  Rationale: The top two are equal on correctness, repository fit, error/cache clarity, and reversibility. The complete three-point difference belongs only to proportional recurring surface: urql supplies the repository's sole GraphQL transport, observation, and document cache in one layer, while TanStack Query still joins a general query client to a separate GraphQL transport and error boundary.
  Date/Author: 2026-08-18 / Primary coordinator after DA-009-01.
- Decision: Freeze error-category precedence and three-way mutation convergence before drafting.
  Rationale: These semantics are required for downstream correctness and can be stated without choosing adapter, hook, or component names. They close the only decision-semantic ambiguities found by analysis.
  Date/Author: 2026-08-18 / Primary coordinator after DA-009-01.
- Decision: Add the required fresh pre-draft contract checkpoint.
  Rationale: The normalized 92/89 ranking remains materially close, which triggers the R2 checkpoint in `.codex/README.md`. This checkpoint is separate from the later final review of the exact Proposed ADR and complete diff.
  Date/Author: 2026-08-18 / Primary coordinator.


## Outcomes & Retrospective


Decision research and analysis are complete at `DRAFT READY`, with urql/default document caching recommended at 92/100 and all decide-now semantics frozen. The triggered pre-draft checkpoint, single non-authoritative draft, primary-authored Proposed ADR, final independent review, validation, and owner approval remain outstanding. No application, test, manifest, lockfile, generated artifact, GraphQL operation, client configuration, or `.codex` implementation-workflow file has changed.


## Purpose / Big Picture


TASK-009 must produce an evidence-backed Proposed ADR that recommends the simplest sufficient frontend GraphQL client and query-cache strategy for the repository. A reviewer can observe success when the ADR compares the frozen candidates symmetrically, passes every hard gate, defines measurable generated typing, error, refetch, cache, and testing semantics, receives a fresh independent `PASS`, and remains explicitly awaiting project-owner approval.

This task is decision work only. It does not implement the client, install dependencies, generate operations, add frontend data-access tests, or resolve DG-003. If the project owner later accepts the exact proposal, a separate change may reconcile acceptance and gate closure. Frontend implementation still requires separate authorization in its owning task.


## Context and Orientation


The root `README.md` is the documentation entry point. `docs/REQUIREMENTS.md` owns FR-FE-001 through FR-FE-005, NFR-001, AC-001 through AC-005, and the source-optional OR-003 classification. `docs/adrs/README.md` records OR-003 as adopted under ADR-0009. `docs/IMPLEMENTATION_PLAN.md` owns DG-003 and TASK-009. `docs/specs/SPEC.feature` supplies the routed frontend outcomes, while HS-003 blocks client-controlled artifacts during the pending gate and HS-015 preserves state ownership and explicit post-mutation detail refetching.

ADR-0002 requires strict TypeScript and schema-derived client operation types. ADR-0006 owns the project GraphQL contract and stable GraphQL error codes. ADR-0009 assigns URL state, server data, and transient state to separate owners and explicitly rejects normalized-identity-dependent mutation correctness. ADR-0011 owns Vitest projects, jsdom, injected network boundaries, and the live-upstream prohibition. ADR-0016 governs future production TDD, but this documentation-only decision task changes no production behavior and therefore requires no artificial Red-Green cycle.

Repository evidence at plan creation is:

- `apps/web/package.json` contains React 18.3.1, React DOM 18.3.1, and React Router DOM 7.18.2, with no GraphQL or query-cache client.
- `apps/web/src/app.tsx` exposes only the root TASK-003 shell route.
- `vitest.config.ts` exposes web unit and application projects in jsdom and API scopes in Node.
- `apps/api/src/transport/graphql/schema.ts` defines implemented list and detail queries but no mutations.
- `apps/api/src/transport/graphql/codegen.ts` generates backend resolver types from that project-owned schema.
- `apps/api/src/transport/graphql/resolvers.ts` maps query errors to stable `BAD_USER_INPUT`, `NOT_FOUND`, or `INTERNAL_SERVER_ERROR` GraphQL codes and preserves separate server diagnostics.


## Scope and Non-Goals


The task includes one living ExecPlan, comparative primary-source research, primary synthesis, one non-authoritative drafting transformation, one primary-authored Proposed ADR, ADR/index and proposal-stage navigation updates, durable research chronology, deterministic validation, and one fresh final independent review with at most one correction cycle.

The source-mandatory frontend scope remains FR-FE-001 through FR-FE-005, NFR-001, and AC-001 through AC-005. OR-003 remains source-optional and adopted for this repository. The task may describe how TASK-010 and TASK-011 will use the selected boundary, but it cannot claim those behaviors exist.

The following are non-goals and forbidden changes while DG-003 is pending:

- application or test source;
- package manifests or `package-lock.json`;
- GraphQL client, transport, query-cache, provider, or state-store dependencies;
- frontend generation configuration or generated operation artifacts;
- client-dependent tests, queries, mutations, hooks, cache configuration, retry machinery, or provider wiring;
- backend TASK-008 mutation schema or implementation;
- URL parameter names, default sort direction, speculative pagination, normalized-cache policies, hook names, or application abstractions;
- any `.codex` implementation workflow, worker definition, lease, hook, or metrics file;
- ADR acceptance, DG-003 resolution, TASK-009 completion, or frontend implementation.


## Plan of Work


Milestone 1 establishes decision authority and a reproducible contract. The primary registers this ExecPlan, starts TASK-009 under the decision-only authorization, freezes candidates and criteria, records the current repository boundary, and proves that DG-003 and controlled implementation paths remain unchanged. Comparative research cannot start until this milestone exists.

Milestone 2 gathers and synchronizes evidence. `TR-009-01` evaluates all four candidates against the same criteria using current official primary sources and repository evidence. The primary checks source currency, symmetry, unsupported measurable claims, hard-gate coverage, and named unknowns. A second researcher is allowed only if this report leaves a material evidence gap that the primary can name precisely; collection must not be duplicated.

Milestone 3 freezes the conclusion. The primary synthesizes straightforward evidence. A `decision_analyst` is invoked only if reports conflict, candidates remain materially close, or decide-now versus prove-later semantics remain unresolved. The barrier returns exactly `DRAFT READY`, `RETURN FOR RESEARCH`, or `OWNER DIRECTION`. `DA-009-01` returned `DRAFT READY` but retained a materially close 92/89 ranking, so one fresh independent contract checkpoint must pass before one `research_drafter` may transform the frozen conclusion into one non-authoritative, provenance-mapped draft.

Milestone 4 creates and reviews the proposal. Immediately before writing, the primary checks every ADR filename and stable ID and allocates the next unused number. The primary reconciles the draft, writes the only authoritative Proposed ADR, registers it without implying approval, and appends research chronology. One fresh `independent_reviewer` receives the complete authoritative inputs, contract, exact Proposed ADR, and full diff. A `REVISE` result permits one bounded supported correction followed by complete re-review; a second failure stops for owner direction.

Milestone 5 validates and hands off. The primary applies the invariant packet, reconciles score, recommendation, Proposed status, TASK-009 `In progress`, DG-003 `Pending`, forbidden-scope absence, and reviewer verdict. It then runs the requested validators and Git checks and presents the exact owner approval requested. The plan remains active and the task remains incomplete until a later explicit approval and closure change.


## Decision Review Contract


### Authority, artifact, and approval boundary


- Research identity: `TASK-009-DG-003-R2`.
- Owning task: TASK-009, `In progress` only for decision research and proposal preparation.
- Controlled gate: DG-003, which must remain `Pending` throughout this authorization.
- Tier: `R2` because the decision is cross-boundary, has four viable candidates and several material evidence dimensions, and produces an owner-controlled ADR.
- Target artifact: the next collision-safe four-digit ADR after the current portfolio maximum, with status `Proposed`; no stable ADR ID is referenced or reserved before the required collision check.
- Approval boundary: only the project owner may accept the ADR, resolve DG-003, complete TASK-009, or authorize later implementation.
- Sole writer: the primary coordinator. Every researcher, analyst, drafter, and reviewer is read-only.
- Forbidden scope: every implementation, dependency, source, test, generated, manifest, lockfile, and `.codex` workflow path listed in `Scope and Non-Goals`.


### Frozen candidate set


1. Native `fetch`, generated typed documents, and the smallest credible application-owned keyed query cache.
2. `urql` with its default document cache, excluding Graphcache unless new evidence hard-disqualifies the default strategy.
3. TanStack Query with `graphql-request` or an equivalently small typed GraphQL transport.
4. Apollo Client configured so correctness does not depend on normalized entity identity.

No candidate may be added unless one frozen candidate is hard-disqualified and the primary records why at least three credible strategies otherwise cannot be compared. Candidate names do not imply that any dependency or package version is approved.


### Common criteria and scoring


The candidate comparison uses exactly five material decision drivers totaling 100 points. Hard-gate failure overrides the numeric result.

| Driver | Weight | Required comparison |
|---|---:|---|
| Contract correctness and state ownership | 30 | ADR-0009 ownership, document-keyed server data, explicit detail refetch, no normalized-identity dependency, and stable success/failure semantics. |
| Repository, runtime, generation, and test fit | 25 | React 18, strict TypeScript, Vite 8, Vitest/jsdom, project-owned schema, typed operations, injected or mockable request boundary, and no live upstream in frontend tests. |
| Proportional implementation and recurring cost | 20 | Changed-file surface, direct and transitive dependencies, provider/configuration/generated artifacts, build effects, test surface/runtime, documentation, maintenance, and operator/reviewer burden. |
| Error and cache behavior clarity | 15 | GraphQL-versus-transport errors, query-key/cache semantics, post-mutation refetch observability, cache isolation, and deterministic tests. |
| Evolution and reversibility | 10 | TASK-010/TASK-011 friction, removal or replacement cost, lock-in, and safe deferral of tuning that the gate need not decide. |
| **Total** | **100** | |

The Proposed ADR separately receives the repository's seven-criterion ADR quality evaluation from `docs/adrs/README.md`; that artifact-quality score does not replace the five-driver candidate ranking.


### Evidence classes and required outputs


Allowed evidence classes are current repository source/manifests/tests, accepted repository authorities, official project documentation, official release or migration notes, official package metadata, and reproducible local inspection. Technical internet research must use official primary sources. Every time-sensitive compatibility or maintenance claim needs a retrieval date. Bundle size, performance, test runtime, and dependency-count claims must be measured reproducibly or marked `Unknown`; no estimate receives score credit.

`TR-009-01` must return:

- a source map with current official URLs and access dates;
- a symmetric hard-gate table for all candidates;
- the five-driver 100-point matrix with evidence-linked reasons;
- repository/runtime fit and exact likely artifact/dependency classes, without editing them;
- cache and state ownership semantics;
- explicit favorite/comment success-refetch and failure behavior;
- GraphQL execution errors versus HTTP/network/parse failures;
- schema-derived operation/result/variable type generation;
- an injected or mockable request boundary and Vitest/jsdom cache/refetch tests;
- dependency, build, maintenance, next-feature, and reversibility costs;
- material unknowns and a precise second-researcher gap recommendation if needed; and
- exactly `RESEARCH COMPLETE`, `FOLLOW-UP REQUIRED`, or `BLOCKED`.

The Proposed ADR must use the `govern-adrs` order: `Context`, `Decision drivers`, `Considered options`, `Decision`, `Consequences`, `Risks and mitigations`, `Validation`, `Evaluation`, and `References`. It must distinguish mandatory and adopted-optional scope, include the proportionality comparison, make the selected contract falsifiable, record both the five-driver candidate ranking and repository ADR-quality score, and remain honest about absent implementation.


### Hard gates


- `GQLC-HG-01 — State ownership`: URL parameters own navigation, sorting, status, species, and gender filters; the query cache owns server-returned character/favorite/comment data; component state owns isolated drafts; no Zustand or other store duplicates URL or server state.
- `GQLC-HG-02 — Identity independence`: correctness must not require normalized entity identity, implicit entity keys, or manual competing server-data copies.
- `GQLC-HG-03 — Mutation convergence`: mutation failure issues no success refetch and presents no failed change as durable. After a successful future favorite or comment mutation, the client executes the exact target-ID character-detail operation with a network-only policy, awaits it, and exposes its outcome. Refetch success is converged success; refetch failure is a distinct persisted-but-not-refreshed convergence failure, not a fabricated rollback or durable optimistic copy.
- `GQLC-HG-04 — Generated types`: operation document, result, and variable types are generated from the project-owned version-controlled schema and generated artifacts are not hand-edited.
- `GQLC-HG-05 — Error taxonomy`: before any response, abort and network failure remain distinct. When a response exists, the boundary validates the GraphQL envelope first: any non-empty `errors`, including partial `data` plus `errors` or errors on a non-success HTTP status, is a GraphQL-operation failure that preserves stable `extensions.code` and retains HTTP status as metadata. An unreadable or malformed envelope is a decode/protocol failure; a non-success status without a valid GraphQL-error envelope is an HTTP failure; only a successful status with valid expected data and no GraphQL errors is operation success.
- `GQLC-HG-06 — Testability and network isolation`: request execution is injected or intercepted at one explicit boundary compatible with current Vitest/jsdom scopes; cache and refetch behavior is observable without a live upstream character API or live external GraphQL service.
- `GQLC-HG-07 — Current repository fit`: the strategy is compatible with the current React 18, strict TypeScript, Vite, Node/browser targets, GraphQL schema ownership, and npm workspace without requiring an unapproved state store or server change.
- `GQLC-HG-08 — Proportionality and honesty`: the record covers implementation/test/tooling/documentation/recurring burden, next-feature friction, and removal cost; unsupported measurements remain `Unknown`; DG-003 decides only what downstream correctness requires.
- `GQLC-HG-09 — Authority boundary`: the ADR remains `Proposed`, DG-003 remains `Pending`, TASK-009 remains `In progress`, and no controlled implementation artifact changes before explicit owner approval.


### Decide now versus prove later


DG-003 must decide now:

- the client/query-cache strategy and minimal transport boundary;
- which store owns each state category;
- the stable query-key or document-key principle needed to address list/detail data;
- schema-derived generated operation/result/variable types;
- the precedence and observable distinction among GraphQL, HTTP, network, abort, and decode/protocol failures;
- the future favorite/comment mutation contract: no success refetch after mutation failure; exact target-ID network-only detail reexecution after mutation success; and distinct converged-success versus persisted-but-not-refreshed outcomes, without normalized-identity dependence or a manual durable copy;
- the failed-mutation rule: do not present unpersisted state as durable;
- the injected or mockable request boundary and the cache/refetch test responsibilities; and
- the dependency, provider/configuration, generated-artifact, build, maintenance, and reversibility classes implied by the strategy.

Downstream implementation may prove or tune later without reopening DG-003:

- exact package versions selected against then-current compatibility evidence;
- exact filenames, hook names, component composition, query-key helper names, endpoint-configuration names, and test counts;
- measured bundle output, build time, and test runtime;
- stale-time, garbage-collection, deduplication, and retry values unless a present failing requirement makes one necessary;
- URL parameter names and default sort direction owned by TASK-010;
- TASK-008's eventual mutation document field selections and generated artifacts, provided they satisfy the fixed refetch contract;
- pagination or normalized-cache policies if future scope introduces a demonstrated need; and
- application abstractions not required by the first TASK-010/TASK-011 slice.


### Cumulative invariant packet


| ID | Trigger or fixture | Expected result | Evidence or current result | Responsible reviewer |
|---|---|---|---|---|
| GQLC-INV-01 | Complete candidate matrix | All four frozen candidates receive symmetric treatment under the same five drivers and hard gates. | Pending comparative research. | Primary synthesis; final independent reviewer. |
| GQLC-INV-02 | Any numeric or measurable claim | Claim has a reproducible primary source or measurement; otherwise it is `Unknown` and receives no unsupported credit. | Contract frozen; evidence pending. | Primary synthesis; final independent reviewer. |
| GQLC-INV-03 | State-owner table | URL, query-cache, and component ownership match ADR-0009 and HS-015; Zustand and browser storage duplicate none of them. | Required by GQLC-HG-01. | Primary synthesis; final independent reviewer. |
| GQLC-INV-04 | Favorite or comment mutation succeeds | The exact target-ID detail operation executes network-only and is awaited; refetch success converges, while refetch failure reports persisted-but-not-refreshed without rollback or a durable manual copy. | Frozen by DA-009-01 under GQLC-HG-02/03; future operation artifacts remain absent. | Pre-draft and final independent reviewers. |
| GQLC-INV-05 | GraphQL envelope, HTTP error, abort, network rejection, or malformed response | The frozen precedence yields one distinguishable category; GraphQL errors preserve `extensions.code`, partial data is not mutation success, and mutation failure issues no success refetch. | Frozen by DA-009-01 under GQLC-HG-03/05. | Pre-draft and final independent reviewers. |
| GQLC-INV-06 | Frontend type generation | Operation document, result, and variable types derive from `apps/api/src/transport/graphql/schema.ts`; no handwritten duplicate or generated mutation artifact appears in this task. | Current schema inspected; decision evidence pending. | Primary synthesis; final independent reviewer. |
| GQLC-INV-07 | Vitest/jsdom request and cache tests | Controlled responses prove GraphQL errors, transport failures, cache reuse/isolation, and explicit refetch call/order without live external services. | Current test projects inspected; future test design pending. | Primary synthesis; final independent reviewer. |
| GQLC-INV-08 | Proportionality comparison | Baseline and every larger candidate cover files, tests, tooling/docs, recurring burden, TASK-010/TASK-011 friction, and removal cost. | Pending comparative research. | Primary synthesis; final independent reviewer. |
| GQLC-INV-09 | Proposed ADR structure | All required ADR sections, mandatory/optional distinction, risks, mitigations, validation, scores, residual risks, and reversal triggers are artifact-local and traceable. | Pending draft. | Primary coordinator; final independent reviewer. |
| GQLC-INV-10 | Authority-state readback | ADR is `Proposed`; DG-003 is `Pending`; TASK-009 is `In progress`; TASK-010/TASK-011 remain `Pending`; no implementation is claimed. | Initial task/gate contract established. | Primary coordinator; final independent reviewer. |
| GQLC-INV-11 | Complete Git diff | Every path is an authorized documentation artifact; source, tests, manifests, lockfile, generated artifacts, and `.codex` implementation workflow have zero diff. | Initial tree clean; final evidence pending. | Primary coordinator; final independent reviewer. |
| GQLC-INV-12 | Owner handoff | The exact requested action is approval or rejection of the reviewed Proposed ADR only; implementation is separately unauthorized. | Pending final `PASS`. | Primary coordinator. |


### Routing, corrections, escalation, and stops


- First assignment: one read-only `technology_researcher`, `TR-009-01`, covers all candidates and evidence dimensions.
- Follow-up allowance: one bounded clarification to `TR-009-01` may repair an omission without expanding scope.
- Second researcher trigger: only a named material evidence gap remains after the first report or its allowed clarification. The second assignment covers only that gap and must not duplicate candidate collection.
- Analyst trigger: reports conflict, three or more candidates remain materially close, or decide-now versus prove-later semantics remain unresolved. Otherwise the primary owns synthesis.
- R3 escalation trigger: concrete security, irreversible-data, concurrency, recovery, identity, serialization, cross-platform equivalence, or similarly critical evidence emerges. Stop and explain the trigger and cost before using any R3 role or maximum reasoning.
- Pre-draft checkpoint: because the normalized leading candidates remain materially close, one fresh `independent_reviewer` must pass the complete contract, evidence, normalized matrix, error precedence, mutation convergence, and outline before drafting. One supported outline correction is permitted by repository policy; a second failure returns to research, analysis, or owner direction.
- Drafting: only after exact `DRAFT READY` and the triggered pre-draft checkpoint `PASS`, use exactly one `research_drafter` for one read-only, non-authoritative, provenance-mapped draft. No competing draft is permitted.
- Final review: one fresh `independent_reviewer` reviews the exact Proposed ADR, contract, authorities, evidence, and complete diff.
- Correction budget: at most one supported, in-scope correction followed by complete re-review. A material conclusion or scope change invalidates the synthesis and returns to the remaining research budget; a second unsuccessful final review stops for owner direction.
- Stop for `OWNER DIRECTION`, exhausted evidence budget, the same decisive gap twice, a hard-gate conflict with accepted authority, fewer than three credible candidates, or a newly triggered R3 condition.
- Success result: fresh final `PASS`, every hard gate and invariant reconciled, requested validators passing, exact documentation-only diff confirmed, and a precise project-owner approval request. Success does not itself accept or implement the decision.


## Concrete Steps


All commands run from `C:\Users\mmjos\Desktop\workbeanch\rick-and-morty-test`.

1. Maintain this plan, `docs/plans/README.md`, canonical TASK-009 state, and execution chronology through primary-only documentation edits.
2. Give `TR-009-01` a Research Assignment Capsule v1 projected from this contract. Wait for its complete report before deciding whether a named gap justifies more research.
3. Synthesize the evidence and record exactly `DRAFT READY`, `RETURN FOR RESEARCH`, or `OWNER DIRECTION` in this plan.
4. Because the normalized 92/89 ranking remains materially close, send the complete contract, evidence, normalized matrix, frozen semantics, and outline to one fresh pre-draft `independent_reviewer`; correct at most one supported outline defect and require a complete passing checkpoint.
5. After that checkpoint passes, invoke exactly one `research_drafter`, reconcile its non-authoritative output, and immediately before writing run collision checks such as `rg --files docs/adrs` and stable-ID searches.
6. Write the collision-safe Proposed ADR and proposal-stage index/navigation/chronology updates with `apply_patch`. Do not edit controlled implementation paths.
7. Send the exact artifact and `git diff` to a different fresh final `independent_reviewer`; apply at most one supported final-artifact correction and complete re-review.
8. Run:

       python -B .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
       python -B .agents/skills/verify-repository/scripts/validate_docs.py --repo .
       git diff --check
       git status --short
       git diff --name-only

9. Reconcile GQLC-HG-01 through GQLC-HG-09 and GQLC-INV-01 through GQLC-INV-12, then stop with the owner-review handoff.


## Validation and Acceptance


Verification mode is `closure` for the authorized proposal-preparation scope, not task closure. TASK-009 cannot complete while the ADR is Proposed and DG-003 is Pending.

This decision-only change introduces no production behavior, so ADR-0016 does not require an artificial preflight classification or Red-Green cycle. Structural and semantic evidence replaces TDD here: complete primary-source comparison, hard-gate and invariant reconciliation, required ADR section/order checks, deterministic documentation validators, exact diff inspection, negative forbidden-path checks, and fresh independent semantic review.

The authorized scope is ready for owner review only when:

- the recommended option is supported by the five-driver score and all hard gates;
- at least three credible strategies remain fully compared;
- the ADR-quality evaluation reaches a recommendation permitted by the portfolio rubric;
- decide-now semantics are complete and prove-later items cannot change correctness;
- the exact Proposed ADR and complete diff receive a fresh independent `PASS` after no more than one correction;
- both documentation validators and `git diff --check` pass;
- `git diff --name-only` contains only authorized documentation artifacts;
- negative inspection confirms zero application, test, manifest, lockfile, generated, client-operation, or `.codex` implementation-workflow change; and
- the final handoff asks only for explicit approval of the reviewed Proposed ADR.


## Idempotence and Recovery


Research, source reads, stable-ID searches, validators, and Git status/diff checks are safe to repeat. The plan is append-and-reconcile living documentation; update existing current statements rather than adding contradictory parallel truth.

If an agent returns incomplete evidence, preserve the report identity, name the exact gap, and use only the remaining follow-up or second-researcher budget. If the conclusion changes materially after drafting, do not patch around the old review: return to synthesis, refresh the contract items affected, and use the remaining review budget only after a new stable proposal exists.

If an unexpected working-tree path appears, stop writes, inspect ownership, and preserve it. Do not reset, delete, or overwrite user or peer work. No worker write lease applies because all research-side roles are read-only and the primary is the sole decision-artifact writer.


## Artifacts and Notes


Expected authorized documentation artifacts are:

- `docs/plans/TASK-009-frontend-graphql-client-decision.md`;
- `docs/plans/README.md`;
- the collision-safe Proposed ADR under `docs/adrs/`;
- `docs/adrs/README.md`;
- proposal-stage TASK-009/DG-003 current-state wording in `docs/IMPLEMENTATION_PLAN.md`;
- proposal-stage current-status/navigation wording in `README.md` only where materially affected; and
- append-only research chronology in `docs/execution/decision-and-progress-log.md`.

`docs/SYSTEM_DIAGRAM.md` and the routed SPEC/HS files remain unchanged unless proposal-stage traceability genuinely becomes inaccurate. A Proposed option does not replace their generic pending-gate boundary. Any no-change disposition will be recorded explicitly in the final documentation-impact review.

### TR-009-01 primary-source comparison


The first read-only researcher returned `RESEARCH COMPLETE` on 2026-08-18 and named no material gap requiring a second researcher. It recommended urql with default document caching, explicitly excluding Graphcache, and reported no R3 trigger.

| Candidate | Score | Hard-gate result | Decisive proportionality observation |
|---|---:|---|---|
| Native `fetch`, generated documents, and application-owned keyed cache | 81 | Pass with required executor, error taxonomy, cache, and refetch contracts | Avoids a client package but makes cache lifecycle, subscription, invalidation/refetch, isolation, and error behavior first-party application maintenance. |
| urql with default document cache | 92 | Pass without Graphcache | Adds one GraphQL client layer whose document/variables cache matches identity-independent ownership; still requires an explicit result/error adapter and exact detail reexecution after successful mutations. |
| TanStack Query with a small typed GraphQL transport | 89 | Pass | Offers explicit deterministic query keys and targeted refetch, but adds a general server-state provider plus a separate GraphQL transport/error join. |
| Apollo Client constrained away from identity-dependent correctness | 73 | Pass only with explicit anti-normalization safeguards and explicit refetch | Defaults to normalized caching and therefore adds configuration, regression-test, dependency, and review burden without present benefit. |

The report treated bundle size, installed transitive dependency count, build duration, test duration, and runtime performance as `Unknown`. It gave them no score credit. Current package versions observed in official package metadata remain implementation-time compatibility evidence rather than ADR pins.

Primary sources, all accessed 2026-08-18:

- [GraphQL response specification](https://spec.graphql.org/October2021/#sec-Response) for the `data`/`errors` execution envelope that remains distinct from transport and response-decoding failure.
- [GraphQL Code Generator client preset](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client) and [React compatibility guide](https://the-guild.dev/graphql/codegen/docs/guides/react-vue) for generated typed documents, results, variables, string document mode, and compatibility with the compared clients/transports.
- [urql architecture](https://urql.dev/docs/architecture/), [Graphcache overview](https://urql.dev/docs/graphcache/), and [official package metadata](https://www.npmjs.com/package/urql) for default document caching, separate opt-in normalized caching, fetch execution, published TypeScript declarations, and current package metadata.
- [TanStack Query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys), [invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation), [testing](https://tanstack.com/query/v4/docs/framework/react/guides/testing), and [official package metadata](https://www.npmjs.com/package/@tanstack/react-query) for deterministic keys, targeted refetch/invalidation, isolated clients, and current package metadata.
- [graphql-request project README](https://github.com/zeptonow/graphql-request) for `TypedDocumentNode` transport support; the exact future version and peer/runtime compatibility remain an implementation-time check.
- [Apollo cache overview](https://www.apollographql.com/docs/react/caching/overview), [cache configuration](https://www.apollographql.com/docs/react/v3/caching/cache-configuration), [refetching](https://www.apollographql.com/docs/deploy-preview/dd6cd25842a509e23df4869c/react/data/refetching), [GraphQL errors](https://www.apollographql.com/docs/react/api/errors/CombinedGraphQLErrors), [HTTP errors](https://www.apollographql.com/docs/deploy-preview/bd4351dc12913e9308f58b27/react/api/errors/ServerError), [Client 4 migration](https://www.apollographql.com/docs/deploy-preview/2909f86c30513675c8ef6618/react/migrating/apollo-client-4-migration), and [official package metadata](https://www.npmjs.com/package/%40apollo/client) for normalized defaults, type-level normalization controls, explicit refetch APIs, distinct error forms, test behavior, and current package metadata.

Every candidate passed GQLC-HG-01 through GQLC-HG-09 only with the common mandatory contracts already frozen in this plan. The report covered GQLC-INV-01 through GQLC-INV-08 and GQLC-INV-10 through GQLC-INV-12; GQLC-INV-09 remains for the primary-authored Proposed ADR. The close 92/89 ranking now proceeds to conditional decision analysis.

### DA-009-01 normalized synthesis


The triggered read-only analyst returned exactly `DRAFT READY` on 2026-08-18. It found no authority conflict, material research gap, owner-direction need, R3 trigger, or hard-gate override. It retained the totals but supplied the controlling per-driver normalization:

| Candidate | Correctness / ownership (30) | Repository fit (25) | Proportional cost (20) | Error/cache clarity (15) | Evolution (10) | Total |
|---|---:|---:|---:|---:|---:|---:|
| Native `fetch` plus owned cache | 27 | 21 | 15 | 10 | 8 | **81** |
| urql default document cache | 29 | 24 | 18 | 13 | 8 | **92** |
| TanStack Query plus small transport | 29 | 24 | 15 | 13 | 8 | **89** |
| Identity-independent Apollo | 27 | 23 | 9 | 9 | 5 | **73** |

The analyst made the three-point urql/TanStack difference auditable: both receive equal credit for correctness, present repository fit, error/cache clarity, and evolution. urql alone receives three more proportionality points because it supplies the repository's single GraphQL transport, observation layer, and document cache together; TanStack Query requires a separate typed GraphQL transport and its error join. Native fetch receives full dependency-simplicity credit but must own the smallest credible cache lifecycle, observation, deduplication, isolation, refetch, error, and test surface. Apollo remains credible under explicit identity-independent safeguards but pays for configuration and regression obligations around capabilities the current repository does not need.

`DA-009-01` also froze two semantic corrections now controlling GQLC-HG-03, GQLC-HG-05, GQLC-INV-04, and GQLC-INV-05:

- Error precedence validates a received GraphQL envelope before classifying an HTTP failure, preserves GraphQL codes even with a non-success status, treats partial data plus errors as operation failure, distinguishes decode/protocol failure from HTTP/network/abort failure, and permits success only for a successful status plus valid expected data without GraphQL errors.
- Mutation convergence has three outcomes: mutation failure with no success refetch; persisted mutation plus successful exact target-ID network-only detail refetch; and persisted mutation plus failed refetch, reported as a convergence failure without fabricated rollback, manual durable cache data, or a claim that the UI converged.

The analyst's Proposed ADR outline maps all required sections and references and defers only package versions, exact filenames/names, measurements, timing/retry tuning, TASK-008 mutation selections, TASK-010 URL choices, and future pagination or normalized-cache policy. Because the 92/89 result remains materially close, one fresh pre-draft `independent_reviewer` checkpoint is mandatory before the single drafter.

Exact package versions, package-lock deltas, generated file paths, build output, and test counts remain downstream proof rather than proposal-stage artifacts.


## Interfaces and Dependencies


The decision must establish a future client-facing contract for the project-owned `/graphql` schema, generated TypeScript operation documents/results/variables, one minimal request transport boundary, query-cache keys or document identity, GraphQL-versus-transport errors, explicit detail refetch after successful mutations, and deterministic Vitest/jsdom tests of request, cache, and refetch behavior.

The chosen strategy may imply future npm dependencies and provider/configuration artifacts, but this task records only their classes and costs. It does not install them. TASK-010 will own the first list/filter browser-to-GraphQL implementation after TASK-009 is complete and separately authorized. TASK-011 will own detail/favorite/comment UI after TASK-008 and TASK-010, using TASK-008's future mutation schema while preserving this decision's fixed explicit-refetch contract.


## Revision Note


- 2026-08-18: Created the owner-authorized TASK-009 decision ExecPlan and froze its R2 Decision Review Contract before comparative research. Registered TASK-009 as `In progress` while preserving DG-003 as `Pending`, the proposal as unallocated, and all implementation-controlled paths as forbidden.
- 2026-08-18: Removed the premature provisional ADR stable-ID reference after the registration validator rejected it, then recorded the passing corrected registration barrier. This changed no candidate, criterion, hard gate, authority state, or implementation boundary.
- 2026-08-18: Preserved the complete TR-009-01 evidence summary, declined a second researcher because no material gap remained, and activated the conditional analyst route because the leading candidates were separated by only three points. No candidate, hard gate, authority state, or implementation artifact changed.
- 2026-08-18: Recorded DA-009-01 `DRAFT READY`, the analyst-normalized score matrix, error precedence, three-way mutation convergence, and the close-ranking pre-draft checkpoint required before the single drafter. No ADR was allocated, no authority state changed, and no implementation artifact was authorized.
