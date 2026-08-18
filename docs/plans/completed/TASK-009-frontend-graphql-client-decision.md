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
- [x] (2026-08-18 22:28Z) `IR-A-009-01` completed the fresh pre-draft checkpoint and returned `REVISE`: urql's automatic typename-driven mutation reexecution invalidated GQLC-HG-03/GQLC-HG-08 and the 92-point recommendation; error/media precedence, the artifact-local outline, and cumulative invariant evidence also required correction. Drafting remained blocked.
- [x] (2026-08-18 22:33Z) `TR-009-02` returned `RESEARCH COMPLETE` for the named gap. It confirmed that unmodified urql default caching fails the automatic-refetch and media-aware error hard gates, found no proportionate lower-cost suppression mechanism, and re-ranked TanStack Query plus a small project-owned typed GraphQL executor at 93 over native fetch plus owned cache at 85, Apollo at 73, and default urql at 61 with hard-gate failure.
- [x] (2026-08-18 22:40Z) `DA-009-02` reconciled the corrected ranking, retained TanStack Query plus an owned executor at 93 over native at 85, Apollo at 73, and default urql at 61 with hard-gate override, supplied the final exact-one/error/automatic-refetch/proportionality corrections, and returned exactly `DRAFT READY`.
- [x] (2026-08-18 22:52Z) Fresh checkpoint `IR-A-009-02` passed every hard gate, score, recommendation, authority, and forbidden-path audit but returned `REVISE` for two Minor documentation defects: stale 92/89 routing prose and missing artifact-local TanStack automatic-default/QueryClient provenance. The single permitted pre-draft correction was applied for complete re-review.
- [x] (2026-08-18 22:55Z) Complete IR-A-009-02 re-review returned `PASS` with no Blocker, Major, or Minor on exact reviewed plan SHA-256 `54D985E406948E5155922847EC280C3DFC7018C34C72FF226707E6ABC42CE199`; every hard gate, invariant, score, outline, authority, and forbidden-path check passed.
- [x] (2026-08-18 22:57Z) The single `research_drafter` returned `DRAFT COMPLETE`; the primary reconciled its complete nine-section draft against the frozen outline and corrected only three local reference labels/paths without changing any decision semantic.
- [x] (2026-08-18 23:03Z) Immediate collision checks confirmed ADR-0016 as the prior highest record and no `ADR-0017` reference; the primary wrote and registered [Proposed ADR-0017](../../adrs/0017-use-tanstack-query-with-a-project-owned-typed-graphql-executor.md) without changing DG-003 from `Pending` or TASK-009 from `In progress`.
- [x] (2026-08-18 23:10Z) A different fresh `independent_reviewer` returned final `PASS` with no Blocker, Major, or Minor on exact Proposed ADR-0017 SHA-256 `2A691BB6C2A025F264B9ABE70E93F45801B932404C4005090D0EB71808267158` and the complete seven-document candidate.
- [x] (2026-08-18 23:14Z) Completed post-verdict reconciliation and validation: ADR validation passed 17 records and 38 requirements with only the established NFR-006 warning; documentation validation passed 59 Markdown files, 41 requirement IDs, 1 authorization, 18 tasks, 17 SPEC rules, 20 HS rules, and 123 scenarios; `git diff --check`, exact seven-document scope, forbidden-path inspection, and byte-identical ADR hash passed.
- [x] (2026-08-18 23:27Z) The project owner explicitly approved ADR-0017. The primary authenticated approved proposal SHA-256 `2A691BB6C2A025F264B9ABE70E93F45801B932404C4005090D0EB71808267158`, marked the ADR `Accepted`, and resolved DG-003 without authorizing frontend implementation.
- [x] (2026-08-18 23:34Z) The task-closure documentation gate and post-move revalidation passed; TASK-009 is `Complete`, this plan is retired under `docs/plans/completed/`, and the final candidate remains documentation-only.


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
- `IR-A-009-01` found that urql's default `cacheExchange` derives typenames from mutation `data` and automatically reexecutes cached operations associated with those typenames. Partial mutation data accompanied by GraphQL errors can therefore cause implicit reexecution before the application classifies the mutation as failed, while successful mutations can cause broad typename-driven reexecution in addition to the required exact-ID refetch.
- The first error-precedence rule overlapped for malformed non-success responses and did not authenticate the response media type. The corrected contract must distinguish credible GraphQL responses from intermediary or ordinary HTTP bodies before classifying GraphQL, HTTP, or decode/protocol failure.
- The review also found that the claimed ADR outline was not artifact-local and that the cumulative invariant cells still described pre-research state. Both are required checkpoint evidence, not formatting-only cleanup.
- `DA-009-02` confirmed that retry, focus, reconnect, broad invalidation, and mutation-result cache writes are correctness controls on the exact-one convergence path, not implementation-time tuning. Tuning remains deferred only for unrelated ordinary queries.
- The rejected urql behavior remains primary-source research evidence. Downstream implementation must not install a rejected dependency merely to reproduce the negative control; selected-strategy tests prove the required zero-failure-refetch and exact-one-success behavior directly.
- The owned executor may retain bounded response evidence long enough to classify it, but it must not log or expose unbounded raw bodies, comment content, or infrastructure details. Abort during response reading remains abort; malformed content after a response remains decode/protocol failure with available response metadata.


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
- Decision: Invalidate `DA-009-01` as drafting authorization and return to bounded R2 research.
  Rationale: `IR-A-009-01` proved that the selected urql strategy omitted automatic mutation-driven reexecution behavior and its suppression, routing, test, and recurring costs. A hard-gate failure overrides the recorded 92-point score; this is a decision-semantic gap rather than an outline-only correction.
  Date/Author: 2026-08-18 / Primary coordinator after IR-A-009-01.
- Decision: Use the contract's second-researcher allowance for only the named automatic-invalidation and response-media gap.
  Rationale: The original all-candidate report is complete outside this newly evidenced gap, and its researcher is no longer available for the permitted clarification. The bounded follow-up must not repeat candidate discovery and must re-score all candidates only where the new evidence changes symmetric correctness, error, test, and proportionality treatment.
  Date/Author: 2026-08-18 / Primary coordinator.
- Decision: Replace the invalidated comparison with the TR-009-02 matrix and provisionally recommend TanStack Query plus a small project-owned typed GraphQL executor.
  Rationale: Default urql cannot prevent implicit mutation-driven reexecution or enforce the media-aware error taxonomy without a separate mutation route and owned transport, eliminating the proportionality advantage that supplied its original lead. TanStack Query has explicit callback-driven mutation orchestration, deterministic exact keys, and no typename invalidation; the owned executor keeps status, media, decoding, GraphQL errors, and partial data observable at one boundary.
  Date/Author: 2026-08-18 / Primary coordinator after TR-009-02.
- Decision: Require renewed decision analysis before declaring a new synthesis result.
  Rationale: The recommendation changed from urql 92 to TanStack Query 93, default urql now fails three hard gates, and the decide-now transport and refetch mechanics materially changed. The prior analyst result cannot be reused across that revision.
  Date/Author: 2026-08-18 / Primary coordinator.
- Decision: Accept DA-009-02 `DRAFT READY` and freeze TanStack Query plus one small browser-fetch-based typed GraphQL executor as the corrected recommendation.
  Rationale: Hard-gate override excludes default urql first. Native and TanStack both own the executor and mutation coordinator, while native additionally owns cache storage, React observation, request deduplication, lifecycle, isolation, and refetch coordination. TanStack's QueryClient/provider cost is therefore proportionately lower than recreating that complete cache boundary, and the 93/85 separation remains supported without double counting.
  Date/Author: 2026-08-18 / Primary coordinator after DA-009-02.
- Decision: Make exact-one interference controls and bounded transport evidence part of the decide-now contract.
  Rationale: Retries, focus/reconnect refetch, broad invalidation, mutation-result cache writes, or unsafe raw-body retention could violate convergence correctness or error privacy. Exact library options and helper names remain downstream, but their observable prohibitions cannot be deferred.
  Date/Author: 2026-08-18 / Primary coordinator after DA-009-02.
- Decision: Apply the single supported IR-A-009-02 pre-draft correction and require complete re-review.
  Rationale: Both findings are Minor and localized: replace two obsolete current-routing references to the historical 92/89 ranking, and add official TanStack Important Defaults and QueryClient provenance for exact-one retry/refetch/cancellation controls. They change no candidate, score, recommendation, hard gate, invariant expectation, or authority state.
  Date/Author: 2026-08-18 / Primary coordinator after IR-A-009-02.
- Decision: Accept IR-A-009-02 `PASS` as the pre-draft checkpoint and invoke exactly one research drafter.
  Rationale: Complete re-review found no Blocker, Major, or Minor and passed all hard gates, invariants, scores, outline/provenance, authority states, validators, and forbidden-path checks on the exact corrected contract. Repository policy now permits one read-only non-authoritative transformation and no competing draft.
  Date/Author: 2026-08-18 / Primary coordinator after IR-A-009-02 complete re-review.
- Decision: Accept the single drafter output as non-authoritative transformation input and reconcile it into the primary-authored proposal.
  Rationale: The draft preserved the complete frozen contract, score, consequences, risks, validation, evaluation, and provenance. It invented no decision semantic. The primary corrected only the ADR-0006 and ADR-0009 link labels/filenames and the hard-specification path before authoritative writing.
  Date/Author: 2026-08-18 / Primary coordinator after `DRAFT COMPLETE`.
- Decision: Accept the fresh final independent `PASS` and stop at the project-owner approval boundary after validation.
  Rationale: The reviewer returned no Blocker, Major, or Minor on exact Proposed ADR-0017 SHA-256 `2A691BB6C2A025F264B9ABE70E93F45801B932404C4005090D0EB71808267158`, reproduced both score calculations, passed every hard gate and invariant, and confirmed the complete seven-document scope with no implementation-controlled path. This permits owner handoff only; it does not accept the ADR, resolve DG-003, complete TASK-009, or authorize implementation.
  Date/Author: 2026-08-18 / Primary coordinator after final independent review.
- Decision: Record the project owner's approval of exact ADR-0017 proposal SHA-256 `2A691BB6C2A025F264B9ABE70E93F45801B932404C4005090D0EB71808267158` and resolve DG-003.
  Rationale: The approval satisfies the only owner-controlled decision boundary. Acceptance establishes implementation direction but does not install TanStack Query, generate frontend operations, prove behavior, or authorize TASK-010. TASK-009 remains `In progress` only until its documentation-closure gate passes.
  Date/Author: 2026-08-18 / Project owner approval; primary coordinator reconciliation.


## Outcomes & Retrospective


The corrected R2 synthesis, pre-draft checkpoint, single non-authoritative draft, primary-authored proposal, fresh final independent review, proposal-preparation validation, project-owner approval, and task-closure documentation gate are complete. The owner approved exact proposal SHA-256 `2A691BB6C2A025F264B9ABE70E93F45801B932404C4005090D0EB71808267158`; [ADR-0017](../../adrs/0017-use-tanstack-query-with-a-project-owned-typed-graphql-executor.md) is `Accepted`, DG-003 is `Resolved`, and TASK-009 is `Complete`. TanStack Query plus a small project-owned browser-fetch-based typed GraphQL executor ranks 93/100 and is the accepted implementation direction; native fetch plus owned cache remains the credible 85-point baseline; default urql is excluded by hard-gate failure. No application, test, manifest, lockfile, generated artifact, GraphQL operation, client configuration, or `.codex` implementation-workflow file changed, and TASK-010 remains separately unauthorized.


## Purpose / Big Picture


TASK-009 produced an evidence-backed ADR that recommends the simplest sufficient frontend GraphQL client and query-cache strategy for the repository. The reviewed proposal compared the frozen candidates symmetrically, passed every hard gate, defined measurable generated typing, error, refetch, cache, and testing semantics, received a fresh independent `PASS`, and was explicitly approved by the project owner.

This task was decision work only. It did not implement the client, install dependencies, generate operations, or add frontend data-access tests. Exact owner approval accepted ADR-0017 and resolved DG-003; frontend implementation still requires separate authorization in its owning task.


## Context and Orientation


The root `README.md` is the documentation entry point. `docs/REQUIREMENTS.md` owns FR-FE-001 through FR-FE-005, NFR-001, AC-001 through AC-005, and the source-optional OR-003 classification. `docs/adrs/README.md` records OR-003 as adopted under ADR-0009. `docs/IMPLEMENTATION_PLAN.md` owns DG-003 and TASK-009. `docs/specs/SPEC.feature` supplies the routed frontend outcomes; HS-003 preserves the historical pending-gate guard, and HS-015 preserves state ownership and explicit post-mutation detail refetching under accepted ADR-0017.

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
- `GQLC-HG-03 — Mutation convergence`: mutation failure, including partial `data` plus `errors`, causes no explicit or implicit success refetch and presents no failed change as durable. Only an inspected error-free mutation success starts exactly one awaited network execution for the complete exact target-ID character-detail key. Mutation and convergence requests have retries disabled; focus, reconnect, broad invalidation, or another automatic refetch must not add a request to this path. Mutation-returned data is not written into the detail cache as a durable manual update; only the network detail result establishes convergence. Refetch success is converged success; refetch failure is persisted-but-not-refreshed, not rollback or a durable optimistic copy.
- `GQLC-HG-04 — Generated types`: operation document, result, and variable types are generated from the project-owned version-controlled schema and generated artifacts are not hand-edited.
- `GQLC-HG-05 — Error taxonomy`: the owned browser-fetch-based executor sends GraphQL-over-HTTP-compatible request and response media headers and retains bounded status, media, body-decoding, GraphQL-error, and partial-data evidence without logging or exposing unbounded raw bodies, comment content, or infrastructure details. Abort at any request or response-read phase remains abort. A non-abort rejection before a response is network failure. `application/graphql-response+json` is interpreted as GraphQL independently of status, while successful legacy `application/json` is permitted only from the configured GraphQL endpoint. A valid non-empty `errors` array, including partial `data` plus `errors`, is a GraphQL-operation failure that preserves stable `extensions.code` and status metadata. Unreadable, malformed, or invalid expected data after a successful response is decode/protocol failure with available metadata. A non-success response that is not a credibly valid GraphQL error response is HTTP failure. Success requires a successful status, valid expected data, and no GraphQL errors.
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
- the media-aware precedence and observable distinction among GraphQL, HTTP, network, abort, and decode/protocol failures;
- the future favorite/comment mutation contract: no explicit or implicit success refetch after mutation failure; exactly one awaited network execution for the complete exact target-ID detail key after inspected error-free mutation success; retries and focus/reconnect/broad-invalidation interference disabled for that path; no mutation-result manual cache write; and distinct converged-success versus persisted-but-not-refreshed outcomes without normalized-identity dependence or a durable copy;
- the failed-mutation rule: do not present unpersisted state as durable;
- the browser-fetch-based injected request boundary, compatible request/response media behavior, bounded non-sensitive classification evidence, and cache/refetch test responsibilities; and
- the dependency, provider/configuration, generated-artifact, build, maintenance, and reversibility classes implied by the strategy.

Downstream implementation may prove or tune later without reopening DG-003:

- exact package versions selected against then-current compatibility evidence;
- exact filenames, hook names, component composition, query-key helper names, endpoint-configuration names, and test counts;
- measured bundle output, build time, and test runtime;
- stale-time, garbage-collection, deduplication, retry, and focus/reconnect policies outside the fixed mutation-convergence path;
- URL parameter names and default sort direction owned by TASK-010;
- TASK-008's eventual mutation document field selections and generated artifacts, provided they satisfy the fixed refetch contract;
- pagination or normalized-cache policies if future scope introduces a demonstrated need; and
- application abstractions not required by the first TASK-010/TASK-011 slice.


### Cumulative invariant packet


| ID | Trigger or fixture | Expected result | Evidence or current result | Responsible reviewer |
|---|---|---|---|---|
| GQLC-INV-01 | Complete candidate matrix | All four frozen candidates receive symmetric treatment under the same five drivers and hard gates. | IR-A-009-02 complete re-review `PASS` on corrected 85/61/93/73 matrix and hard-gate-first ranking. | Primary synthesis; pre-draft and final independent reviewers. |
| GQLC-INV-02 | Any numeric or measurable claim | Claim has a reproducible primary source or measurement; otherwise it is `Unknown` and receives no unsupported credit. | IR-A-009-02 `PASS`; primary-source provenance is complete and unsupported bundle/install/build/test/runtime measurements remain `Unknown` with no credit. | Primary synthesis; pre-draft and final independent reviewers. |
| GQLC-INV-03 | State-owner table | URL, query-cache, and component ownership match ADR-0009 and HS-015; Zustand and browser storage duplicate none of them. | IR-A-009-02 `PASS`; unchanged by correction. | Pre-draft and final independent reviewers. |
| GQLC-INV-04 | Favorite or comment mutation outcome | Failure, including partial-data GraphQL failure, causes no automatic or explicit success refetch. Only inspected error-free success starts exactly one awaited network execution for the complete exact target-ID detail key; retries and automatic-refetch interference are disabled, mutation data is not manually copied into cache, detail success converges, and detail failure reports persisted-but-not-refreshed without rollback or a durable copy. | IR-A-009-02 `PASS`. | Pre-draft and final independent reviewers. |
| GQLC-INV-05 | GraphQL envelope, media type, HTTP status, abort, network rejection, malformed response, or sensitive body | The media-aware precedence yields one distinguishable category; GraphQL errors preserve `extensions.code` and status metadata; partial data is not mutation success; bounded classification evidence never becomes an unbounded or sensitive diagnostic. | IR-A-009-02 `PASS`. | Pre-draft and final independent reviewers. |
| GQLC-INV-06 | Frontend type generation | Operation document, result, and variable types derive from `apps/api/src/transport/graphql/schema.ts`; no handwritten duplicate or generated mutation artifact appears in this task. | IR-A-009-02 `PASS`; no generated frontend artifact exists. | Pre-draft and final independent reviewers. |
| GQLC-INV-07 | Vitest/jsdom request and cache tests | Controlled responses prove GraphQL errors, transport failures, media-type/status precedence, malformed successful and non-success responses, cache reuse/isolation, partial-data mutation failure with zero refetch, success with exactly one awaited target detail request and zero retry/focus/reconnect/list/other-detail requests, no mutation-result manual cache write, and refetch-failure outcome without live external services. | IR-A-009-02 `PASS`; rejected urql remains research evidence and is not a downstream test dependency. | Pre-draft and final independent reviewers. |
| GQLC-INV-08 | Proportionality comparison | Baseline and every larger candidate cover files, tests, tooling/docs, recurring burden, TASK-010/TASK-011 friction, and removal cost. | IR-A-009-02 `PASS`; 93 versus 85 remains supportable after complete native-baseline charging. | Primary synthesis; pre-draft and final independent reviewers. |
| GQLC-INV-09 | Proposed ADR structure | All required ADR sections, mandatory/optional distinction, risks, mitigations, validation, scores, residual risks, reversal triggers, and primary-source provenance are artifact-local and traceable. | Final independent `PASS`; accepted ADR-0017 preserves the complete reviewed nine-section structure and separate 93-point ADR-quality evaluation. | Primary coordinator; pre-draft and final independent reviewers. |
| GQLC-INV-10 | Authority-state readback | Before approval, ADR-0017 is `Proposed`, DG-003 is `Pending`, and TASK-009 is `In progress`; after exact owner approval and closure, ADR-0017 is `Accepted`, DG-003 is `Resolved`, and TASK-009 is `Complete`. TASK-010/TASK-011 remain `Pending`; no implementation is claimed. | Satisfied: approval, acceptance, resolution, and closure states are exact. | Primary coordinator; pre-draft and final independent reviewers. |
| GQLC-INV-11 | Complete Git diff | Every path is an authorized documentation artifact; source, tests, manifests, lockfile, generated artifacts, and `.codex` implementation workflow have zero diff. | Final closure inspection passed with exactly eleven authorized documentation paths, including new ADR-0017, the completed-plan move, and required authority/navigation updates. | Primary coordinator; pre-draft and final independent reviewers. |
| GQLC-INV-12 | Owner handoff | The exact requested action is approval or rejection of the reviewed Proposed ADR only; implementation is separately unauthorized. | Satisfied: the project owner approved the authenticated proposal; no implementation authorization was inferred. | Primary coordinator. |


### Routing, corrections, escalation, and stops


- First assignment: one read-only `technology_researcher`, `TR-009-01`, covers all candidates and evidence dimensions.
- Follow-up allowance: one bounded clarification to `TR-009-01` may repair an omission without expanding scope.
- Second researcher trigger: only a named material evidence gap remains after the first report or its allowed clarification. The second assignment covers only that gap and must not duplicate candidate collection.
- Analyst trigger: reports conflict, three or more candidates remain materially close, or decide-now versus prove-later semantics remain unresolved. Otherwise the primary owns synthesis.
- R3 escalation trigger: concrete security, irreversible-data, concurrency, recovery, identity, serialization, cross-platform equivalence, or similarly critical evidence emerges. Stop and explain the trigger and cost before using any R3 role or maximum reasoning.
- Pre-draft checkpoint: because the correction introduced decision-critical transport and exact-one convergence mechanics outside the first reviewed contract, one fresh `independent_reviewer` must pass the complete corrected contract, evidence, matrix, error precedence, mutation convergence, and outline before drafting. The single supported correction allowance was consumed by IR-A-009-02; any remaining failure returns to research, analysis, or owner direction.
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
4. Because the correction introduced decision-critical transport and exact-one convergence mechanics outside IR-A-009-01's reviewed contract, send the complete corrected contract, evidence, matrix, frozen semantics, and outline to one fresh pre-draft `independent_reviewer`; the single supported correction is now consumed and complete passing re-review is required.
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


Verification mode is now task `closure`. Exact owner approval made ADR-0017 `Accepted` and DG-003 `Resolved`; TASK-009 may become `Complete` only after the documentation-impact review, validators, final scope checks, and plan retirement pass.

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

- `docs/plans/completed/TASK-009-frontend-graphql-client-decision.md`;
- `docs/plans/README.md`;
- `docs/adrs/0017-use-tanstack-query-with-a-project-owned-typed-graphql-executor.md`;
- `docs/adrs/README.md`;
- proposal, acceptance, and closure TASK-009/DG-003 current-state wording in `docs/IMPLEMENTATION_PLAN.md`;
- proposal, acceptance, and closure current-status/navigation wording in `README.md` only where materially affected;
- accepted frontend-client target architecture in `docs/SYSTEM_DIAGRAM.md`;
- accepted-boundary routing in `docs/specs/README.md` and `docs/ui/storybook-workflow.md`; and
- append-only research chronology in `docs/execution/decision-and-progress-log.md`.

`docs/specs/SPEC.feature` and `docs/specs/HARD_SPEC.feature` remain unchanged because their behavior and conditional pending-gate guard already match accepted ADR-0017. Acceptance required only navigation/routing updates, not a rewrite of stable SPEC/HS semantics.

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

Every candidate initially passed GQLC-HG-01 through GQLC-HG-09 only with the common mandatory contracts then frozen in this plan. The report covered GQLC-INV-01 through GQLC-INV-08 and GQLC-INV-10 through GQLC-INV-12; GQLC-INV-09 remained for the primary-authored Proposed ADR. This point-in-time 92/89 result was later invalidated by IR-A-009-01 and replaced by TR-009-02 and DA-009-02; it remains historical research chronology rather than current recommendation.

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

### IR-A-009-01 pre-draft checkpoint


The fresh read-only checkpoint returned `REVISE` on 2026-08-18 and did not authorize drafting. Its exact review target matched plan SHA-256 `05BA145CE7B45D09EB2C89279000D02391A71D3B27BB97DF8C949C7F352173E7`. Structural validators and the documentation-only forbidden-path audit passed, but semantic review failed GQLC-HG-03, GQLC-HG-05, and GQLC-HG-08.

The controlling findings are:

- urql's default cache collects mutation-response typenames from `data` and automatically reexecutes matching cached queries. Because partial `data` can coexist with GraphQL errors, implicit mutation-driven reexecution can precede the application's failure classification; an error-free mutation can also cause broader typename reexecution in addition to the required exact-ID detail request. The original comparison omitted the necessary suppression or bypass mechanism and its implementation, testing, review, and recurring costs.
- the original precedence overlapped for malformed non-success responses. The correction must retain status and media type, recognize credible GraphQL responses independently of status, preserve GraphQL codes and partial-data failure semantics, classify malformed successful responses as decode/protocol failures, and classify non-success responses without a credible GraphQL error response as HTTP failures.
- the plan asserted a mapped ADR outline without preserving it artifact-locally, and several cumulative invariant evidence cells still described initial pre-research state.

Primary sources used by the checkpoint, accessed 2026-08-18:

- [urql default cache source](https://github.com/urql-graphql/urql/blob/main/packages/core/src/exchanges/cache.ts#L30-L46) for typename collection and automatic query reexecution after mutation results;
- [urql operation-result construction](https://github.com/urql-graphql/urql/blob/main/packages/core/src/utils/result.ts) for partial `data` with GraphQL errors;
- [GraphQL over HTTP response rules](https://graphql.github.io/graphql-over-http/draft/#sec-Response) for media-aware response interpretation; and
- [urql fetch source](https://github.com/urql-graphql/urql/blob/main/packages/core/src/internal/fetchSource.ts#L163-L218) for current response parsing and error behavior.

R2 remains the correct research tier. The named gap now activates a bounded second researcher because the original researcher is no longer available for clarification. A corrected score must replace, not patch around, the invalidated 92/89 recommendation before renewed analysis and a complete fresh pre-draft checkpoint.

### TR-009-02 named-gap correction


The bounded second researcher returned `RESEARCH COMPLETE` on 2026-08-18. It used the corrected GQLC-HG-03 and GQLC-HG-05 semantics, did not repeat discovery, found no R3 trigger, and changed the recommendation from urql to TanStack Query plus a small project-owned typed GraphQL executor.

The decisive technical result is that an unmodified urql default cache fails the contract. `requestPolicy: network-only` does not disable the mutation-response invalidation branch, generated selection formatting supplies `__typename`, and `additionalTypenames` is additive rather than suppressive. A response-side exchange cannot reliably prevent `cacheExchange` from seeing the mutation result on the backward path. The smallest credible urql remediation routes mutations around `cacheExchange` through a separate cache-less client or owned executor and also owns media-aware transport classification. That is feasible, but it changes the candidate from one low-surface GraphQL client into an urql query client plus a second mutation/error route with additional ordering and regression obligations.

The corrected matrix is:

| Candidate | Correctness / ownership (30) | Repository fit (25) | Proportional cost (20) | Error/cache clarity (15) | Evolution (10) | Total | Hard-gate result |
|---|---:|---:|---:|---:|---:|---:|---|
| Native `fetch` plus smallest owned keyed cache | 27 | 21 | 14 | 15 | 8 | **85** | Pass when the central executor/cache implements the frozen contracts. |
| urql default document cache without Graphcache | 20 | 21 | 7 | 6 | 7 | **61** | Fail GQLC-HG-03, GQLC-HG-05, and GQLC-HG-08 as the default proposition; only conditional after adding a separate mutation route and owned transport. |
| TanStack Query plus a small project-owned typed GraphQL executor | 29 | 24 | 16 | 15 | 9 | **93** | Pass with explicit retry/automatic-refetch controls and centralized exact target refetch. |
| Identity-independent Apollo | 25 | 22 | 9 | 10 | 7 | **73** | Conditional on non-normalizing/no-cache mutation behavior plus a custom media-aware link; higher unrelated capability and configuration burden. |

The hard-gate reconciliation is:

| Gate | Native | urql default | TanStack plus owned executor | Apollo | Corrected disposition |
|---|---|---|---|---|---|
| GQLC-HG-01 | Pass | Pass | Pass | Pass | State ownership remains strategy-independent. |
| GQLC-HG-02 | Pass | Pass | Pass | Conditional | Apollo must not depend on normalized identity; no selected strategy may duplicate server state. |
| GQLC-HG-03 | Pass | Fail | Pass | Conditional | TanStack mutation behavior is explicitly orchestrated; broad invalidation remains prohibited. |
| GQLC-HG-04 | Pass | Pass | Pass | Pass | Future generated documents/results/variables remain client-neutral and schema-derived. |
| GQLC-HG-05 | Pass | Fail | Pass | Conditional | The owned executor retains raw status/media/decode/GraphQL detail; urql built-in parsing does not enforce the taxonomy. |
| GQLC-HG-06 | Pass | Pass | Pass | Pass | All can use an injected boundary and isolated jsdom clients; exact tests remain downstream implementation proof. |
| GQLC-HG-07 | Pass | Pass | Pass | Pass | Decision-level compatibility remains feasible; exact versions are prove-later. |
| GQLC-HG-08 | Pass | Fail | Pass | Conditional | The default urql score omitted the second mutation/error route needed for correctness. |
| GQLC-HG-09 | Pass | Pass | Pass | Pass | No proposal, approval, gate, task, dependency, or implementation state changes in research. |

TanStack Query is provisionally selected because its cache identity is an explicit deterministic key, mutation completion is callback-driven rather than typename-driven, and one small owned executor can preserve the complete GraphQL-over-HTTP evidence needed by the repository taxonomy. The coordinator must not use broad `invalidateQueries` semantics for mutation convergence: automatic focus/reconnect/refetch and retry behavior must be explicitly controlled where the exact-one contract applies, and only the exact target-detail key may be executed after inspected error-free mutation success. `graphql-request` is not selected now because the decision needs raw status, media, body-decoding, partial-data, and error evidence; a later implementation may use it only if then-current primary/runtime evidence proves that exact boundary without weakening the contract.

Future validation fixtures required by the corrected decision are:

- retained research evidence for the rejected urql behavior; downstream implementation must not install urql merely to reproduce that negative control;
- partial-data mutation failure producing zero requests and error-free favorite/comment success producing exactly one awaited target-ID detail network request, with retry, focus/reconnect, same-typename list, and other-detail request counts remaining zero;
- no mutation-result `setQueryData`-style or other manual durable cache update before the detail network result;
- persisted mutation plus failed exact detail request producing the distinct persisted-but-not-refreshed outcome without rollback or a durable manual copy;
- abort before response versus network rejection;
- `application/graphql-response+json` with GraphQL errors on non-success status, configured-endpoint successful legacy `application/json`, malformed successful response, malformed or non-credible non-success response, text bodies, invalid expected data, and partial `data` plus `errors`;
- cache reuse and complete-variable/key isolation with a fresh QueryClient and injected executor per test; and
- zero live upstream character API or live external GraphQL service in frontend tests.

Primary sources, accessed 2026-08-18:

- [urql default cache source](https://raw.githubusercontent.com/urql-graphql/urql/main/packages/core/src/exchanges/cache.ts) for typename injection, mutation-response collection, cache clearing, and automatic `network-only` reexecution;
- [urql fetch source](https://raw.githubusercontent.com/urql-graphql/urql/main/packages/core/src/internal/fetchSource.ts) for response retention, parsing, abort, and collapsed parsing-error behavior;
- [urql result source](https://raw.githubusercontent.com/urql-graphql/urql/main/packages/core/src/utils/result.ts) for retained partial data, response, and `CombinedError` construction;
- [GraphQL over HTTP draft](https://graphql.github.io/graphql-over-http/draft/) for status/media authenticity and partial-data error semantics;
- [TanStack Query invalidation guide](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation) for deterministic exact matching and background-refetch behavior that broad invalidation would trigger;
- [TanStack Query mutation reference](https://tanstack.com/query/latest/docs/framework/react/reference/useMutation) for awaited success callbacks and explicit mutation retry behavior;
- [TanStack Query important defaults](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults) for stale-query mount, focus, and reconnect refetch plus default query retry behavior that the convergence path must suppress; and
- [TanStack Query QueryClient reference](https://tanstack.com/query/latest/docs/reference/QueryClient) for exact awaited refetch, active-query selection, and in-flight cancellation behavior used to make one-target execution falsifiable.

Bundle size, installed transitive dependency count, build duration, test duration, and runtime performance remain `Unknown` and receive no score credit. Exact package versions, output filenames, and mutation documents remain downstream proof.

### Corrected artifact-local ADR outline and provenance


This outline is the only permitted input shape for the single later drafter. Renewed analysis and the complete fresh pre-draft checkpoint may correct it before drafting; the drafter must not invent new decision semantics.

| Required ADR section | Frozen content | Repository and primary-source provenance |
|---|---|---|
| `Context` | Mandatory React/GraphQL frontend scope, adopted-optional filters, current query-only project schema, absent frontend client/codegen/cache, DG-003 approval boundary, and why mutation behavior is decided before TASK-008 artifacts exist. | FR-FE-001 through FR-FE-005, NFR-001, OR-003, AC-001 through AC-005; DG-003/TASK-009; current manifests/schema/Codegen/Vitest evidence. |
| `Decision drivers` | State ownership, identity-independent correctness, explicit one-target convergence, schema-derived types, media-aware errors, isolated tests, repository fit, proportional cost, and reversibility. | ADR-0002, ADR-0006, ADR-0009, ADR-0011, ADR-0016; HS-003, HS-015; GQLC-HG-01 through GQLC-HG-09. |
| `Considered options` | All four frozen candidates, corrected five-driver matrix, hard-gate override, proportionality against the native baseline, urql automatic invalidation behavior, and why graphql-request is not selected without raw-boundary proof. | TR-009-01 as historical baseline; IR-A-009-01; TR-009-02 source map and corrected matrix above. |
| `Decision` | TanStack Query owns cached server state; a small project-owned browser-fetch-based typed GraphQL executor owns compatible request/response media, bounded non-sensitive classification evidence, and the full error taxonomy; generated client-neutral documents/results/variables derive from the checked-in schema; URL/cache/component owners remain separate. Mutation failure causes no refetch. Error-free success starts exactly one awaited network request for the complete exact target-detail key with retry and focus/reconnect/broad-invalidation interference disabled. Mutation-result manual cache writes, normalized-identity correctness, durable manual copies, Zustand, and browser server-state persistence are prohibited. | Corrected GQLC-HG-01 through GQLC-HG-07; corrected decide-now semantics; ADR-0009/HS-015; GraphQL-over-HTTP draft; TanStack Important Defaults, mutation, invalidation, and QueryClient sources; DA-009-02. |
| `Consequences` | Explicit query keys and transport evidence improve determinism; every successful mutation pays one additional detail network request and partial `data` plus `errors` is treated as failure rather than converged success. Costs include QueryClient/provider, owned executor/coordinator maintenance, constrained convergence-path automatic-refetch behavior, and focused fixtures. Generated documents remain portable and removal is bounded while QueryClient access stays centralized. | TR-009-02 proportionality result; DA-009-02 native/TanStack comparison; prove-later disposition. |
| `Risks and mitigations` | Query-key drift, retry/focus/reconnect exact-one interference, runtime result-validation growth, bounded raw-body/error evidence leaking comments or infrastructure, GraphQL-over-HTTP draft evolution, QueryClient API spread, and future pagination/offline/subscription/normalized needs. Mitigate through centralized keys/executor/coordinator, non-sensitive error exposure, isolated tests, build-time generation checks, and explicit reversal triggers: incompatible current versions; unprovable exact-one behavior; executor/coordinator growth beyond the frozen role; presentation-layer QueryClient spread; disproportionate measured cost versus native; or demonstrated scope that changes the cache problem. Same-target concurrent mutations stop for bounded reconciliation if later scope cannot preserve the per-mutation invariant. | GQLC-INV-02 through GQLC-INV-08; TanStack invalidation/mutation sources; GraphQL-over-HTTP draft; ADR-0002 generation authority; DA-009-02 residual risks and triggers. |
| `Validation` | Complete controlled-response/media/status matrix; abort during request/read versus network/decode; partial-data failure with zero requests; error-free success with exactly one awaited target detail request and zero retry/focus/reconnect/list/other-detail requests; no mutation-result manual cache update; persisted-but-not-refreshed outcome; cache reuse/key isolation; generated-type drift check; fresh QueryClient/executor per test; no live external service; and a proportionality readback covering dependencies, files, configuration, generated artifacts, tests, build effects, and maintenance. Rejected urql remains research evidence and is not installed for downstream testing. | GQLC-INV-04 through GQLC-INV-08; TR-009-02 fixture set; DA-009-02 corrections; TanStack Important Defaults and QueryClient sources; ADR-0011/ADR-0016 test boundary. |
| `Evaluation` | Corrected five-driver candidate ranking plus the separate seven-criterion ADR quality score; unsupported measurements remain `Unknown`; recommendation follows hard gates before numeric totals. | TR-009-02 matrix; `docs/adrs/README.md` rubric; `govern-adrs` proportionality gate. |
| `References` | Exact repository authorities and current official sources, each used for one falsifiable claim; identify GraphQL-over-HTTP as a draft and preserve IR-A-009-01/TR-009-02/DA-009-02 provenance. | Requirement, gate, task, ADR, SPEC/HS links plus the primary-source map above. |

### DA-009-02 renewed synthesis


The renewed analyst verified exact plan SHA-256 `8F65AE5E03958CAA19AC2D38B33B3051DD6E25F9E77C5E31DCB9A78315829D92`, retained the corrected 93/85/73/61 ranking, found no material double counting or evidence gap, reconciled all nine hard gates and twelve invariants, and returned exactly `DRAFT READY` on 2026-08-18.

Hard-gate override excludes default urql before numeric selection. TanStack Query and native fetch both require the project-owned typed executor and centralized mutation coordinator; the native baseline additionally owns cache storage, React observation/subscription, request deduplication, lifecycle, isolation, and refetch coordination. TanStack adds QueryClient/provider integration but avoids recreating that cache machinery, supporting its two-point proportionality advantage and eight-point total lead over native. The recommendation remains reversible only while query keys, executor calls, and mutation coordination stay centralized rather than spreading direct QueryClient use across presentation components.

The final corrected selected contract is the Decision Review Contract above. Retry, focus/reconnect refetch, broad invalidation, and mutation-result manual cache updates are forbidden on the exact-one convergence path and are not downstream tuning. The owned executor must send compatible GraphQL media headers, retain only bounded non-sensitive response evidence, distinguish abort during any request/read phase, and preserve available metadata for failures without exposing raw comments or infrastructure details. Concurrent same-target mutation ordering is not selected here; any later demonstrated conflict with the per-mutation invariant stops for bounded design reconciliation rather than inventing a hidden concurrency protocol.

R2 remains correct. No owner direction or additional research is required. Because the recommendation and decision-critical mechanics changed after IR-A-009-01, one completely fresh pre-draft independent checkpoint must pass the reconciled bytes before the single drafter.

### IR-A-009-02 complete pre-draft re-review


The fresh checkpoint first returned `REVISE` with no Blocker or Major and two Minor documentation findings. The primary consumed the single permitted correction by replacing two obsolete current-routing references to the historical 92/89 ranking and adding artifact-local TanStack Important Defaults and QueryClient provenance. Complete re-review then returned `PASS` with no Blocker, Major, or Minor on exact reviewed plan SHA-256 `54D985E406948E5155922847EC280C3DFC7018C34C72FF226707E6ABC42CE199`.

The reviewer independently reproduced 85 for native, 61 plus hard-gate exclusion for default urql, 93 for TanStack plus the owned executor, and conditional 73 for Apollo. GQLC-HG-01 through GQLC-HG-09 and GQLC-INV-01 through GQLC-INV-12 passed for this stage. Both validators, `git diff --check`, exact five-document branch scope, current two-document working scope, authority readback, and every forbidden implementation-path check passed. This result authorizes exactly one read-only research drafter transformation and nothing else.

### RD-009-01 non-authoritative draft


The only research drafter returned `DRAFT COMPLETE` on 2026-08-18. Its nine sections map one-to-one to the artifact-local outline and preserve the corrected candidate matrix, hard-gate override, TanStack/owned-executor contract, consequences, risks, explicit reversal triggers, exact future fixtures, separate ADR-quality score, Proposed status, pending gate/task states, and official-source references.

The primary reconciliation found no semantic addition or omission. Three local references were corrected for authoritative writing: ADR-0006 is `0006-define-a-use-case-oriented-graphql-contract.md`, ADR-0009 is `0009-keep-frontend-state-close-to-its-owner.md`, and the hard specification is `docs/specs/HARD_SPEC.feature`. The drafter neither wrote a file nor allocated an ADR ID.


## Interfaces and Dependencies


The decision must establish a future client-facing contract for the project-owned `/graphql` schema, generated TypeScript operation documents/results/variables, one minimal request transport boundary, query-cache keys or document identity, GraphQL-versus-transport errors, explicit detail refetch after successful mutations, and deterministic Vitest/jsdom tests of request, cache, and refetch behavior.

The chosen strategy may imply future npm dependencies and provider/configuration artifacts, but this task records only their classes and costs. It does not install them. TASK-010 will own the first list/filter browser-to-GraphQL implementation after TASK-009 is complete and separately authorized. TASK-011 will own detail/favorite/comment UI after TASK-008 and TASK-010, using TASK-008's future mutation schema while preserving this decision's fixed explicit-refetch contract.


## Revision Note


- 2026-08-18: Created the owner-authorized TASK-009 decision ExecPlan and froze its R2 Decision Review Contract before comparative research. Registered TASK-009 as `In progress` while preserving DG-003 as `Pending`, the proposal as unallocated, and all implementation-controlled paths as forbidden.
- 2026-08-18: Removed the premature provisional ADR stable-ID reference after the registration validator rejected it, then recorded the passing corrected registration barrier. This changed no candidate, criterion, hard gate, authority state, or implementation boundary.
- 2026-08-18: Preserved the complete TR-009-01 evidence summary, declined a second researcher because no material gap remained, and activated the conditional analyst route because the leading candidates were separated by only three points. No candidate, hard gate, authority state, or implementation artifact changed.
- 2026-08-18: Recorded DA-009-01 `DRAFT READY`, the analyst-normalized score matrix, error precedence, three-way mutation convergence, and the close-ranking pre-draft checkpoint required before the single drafter. No ADR was allocated, no authority state changed, and no implementation artifact was authorized.
- 2026-08-18: Recorded IR-A-009-01 `REVISE`, invalidated the point-in-time `DRAFT READY` as drafting authorization, froze corrected automatic-refetch and media-aware error semantics, refreshed the cumulative invariant evidence cells, and reopened only the named R2 evidence gap. TASK-009 remains `In progress`, DG-003 remains `Pending`, and no controlled implementation artifact changed.
- 2026-08-18: Recorded TR-009-02 `RESEARCH COMPLETE`, replaced the invalidated score with the corrected 85/61/93/73 matrix, provisionally selected TanStack Query plus a small project-owned typed GraphQL executor, added the complete future fixture set and artifact-local ADR outline/provenance map, and required renewed analyst reconciliation. No authority state or controlled implementation artifact changed.
- 2026-08-18: Recorded DA-009-02 `DRAFT READY`, retained TanStack Query plus an owned executor at 93, froze exact-one retry/automatic-refetch/manual-cache-write controls, added media/privacy and reversal semantics, completed the outline and invariant corrections, and required a completely fresh pre-draft checkpoint on the reconciled bytes. No authority state or controlled implementation artifact changed.
- 2026-08-18: Recorded IR-A-009-02 `REVISE` with no Blocker or Major, consumed the single supported pre-draft correction to replace two obsolete routing statements and add official TanStack automatic-default/QueryClient provenance, and required complete re-review. The correction changed no candidate, score, recommendation, hard gate, authority state, or implementation boundary.
- 2026-08-18: Recorded IR-A-009-02 complete re-review `PASS` with no finding on exact reviewed plan SHA-256 `54D985E406948E5155922847EC280C3DFC7018C34C72FF226707E6ABC42CE199`. Every hard gate, invariant, score, outline/provenance, validator, authority, and forbidden-path check passed, authorizing exactly one read-only non-authoritative draft and no ADR write, approval, gate resolution, task completion, dependency, or implementation.
- 2026-08-18: Recorded the single RD-009-01 `DRAFT COMPLETE` result and primary reconciliation. The draft preserved the frozen contract; the primary corrected three local reference labels/paths only. No ADR number was allocated, no authority state changed, and no implementation artifact was authorized.
- 2026-08-18: Reconfirmed ADR-0016 as the prior highest record immediately before authoritative writing, allocated collision-safe ADR-0017, and registered the 93-point TanStack Query plus owned-executor recommendation as `Proposed`. DG-003 remains `Pending`, TASK-009 remains `In progress`, final independent review and owner approval remain outstanding, and no implementation artifact changed.
- 2026-08-18: Recorded the fresh final independent `PASS` with no Blocker, Major, or Minor on exact Proposed ADR-0017 SHA-256 `2A691BB6C2A025F264B9ABE70E93F45801B932404C4005090D0EB71808267158` and the complete seven-document candidate. The reviewed ADR remains byte-identical and `Proposed`; DG-003 remains `Pending`, TASK-009 remains `In progress`, and explicit project-owner approval or rejection is the sole remaining decision action.
- 2026-08-18: Completed byte-preserving post-verdict reconciliation and proposal-preparation validation. Both documentation validators, `git diff --check`, exact seven-document scope, forbidden implementation-path inspection, and the frozen ADR hash pass; the sole established NFR-006 metadata warning remains unrelated. ADR-0017 stays `Proposed`, DG-003 stays `Pending`, TASK-009 stays `In progress`, and no implementation is authorized.
- 2026-08-18: Recorded explicit project-owner approval of exact independently reviewed ADR-0017 proposal SHA-256 `2A691BB6C2A025F264B9ABE70E93F45801B932404C4005090D0EB71808267158`, marked the ADR `Accepted`, and resolved DG-003. TASK-009 remains `In progress` only for documentation closure; TASK-010 remains pending separate execution authorization, and no implementation artifact changed.
- 2026-08-18: Passed the task-closure documentation gate, marked TASK-009 `Complete`, retired this plan to `docs/plans/completed/`, synchronized every affected authority and navigation owner, and preserved the no-implementation boundary. TASK-010 remains pending separate execution authorization.
