# ADR-0017: Use TanStack Query with a Project-Owned Typed GraphQL Executor

- Status: Accepted
- Date: 2026-08-18
- Decision owners: Project owner and project maintainers; the project owner approved the exact independently reviewed proposal on 2026-08-18
- Related requirements: FR-FE-001, FR-FE-002, FR-FE-003, FR-FE-004, FR-FE-005, NFR-001, OR-003, AC-001, AC-002, AC-003, AC-004, AC-005
- Related decisions: ADR-0002, ADR-0006, ADR-0009, ADR-0011, ADR-0016, ADR-0018
- Related gate and task: DG-003, TASK-009
- Supersedes: None
- Superseded by: None

## Context

DG-003 required a frontend GraphQL client and query-cache decision before browser list, detail, favorite, and comment data access could proceed. TASK-009 prepared this ADR, and the project owner approved exact independently reviewed proposal SHA-256 `2A691BB6C2A025F264B9ABE70E93F45801B932404C4005090D0EB71808267158` on 2026-08-18. This accepted record resolves DG-003 and permits TASK-009 documentation closure; it does not implement the frontend client, install a dependency, generate an operation artifact, or prove runtime behavior.

The mandatory frontend scope is FR-FE-001 through FR-FE-005, NFR-001, and AC-001 through AC-005. OR-003 is source-optional scope that ADR-0009 has adopted as a repository delivery commitment. This ADR neither changes that classification nor claims that any browser behavior is implemented.

The checked-in GraphQL schema is currently query-only. Favorite and comment mutations remain TASK-008 work, but their client-side success and failure convergence contract must be fixed before later artifacts can introduce normalized-identity-dependent behavior or ambiguous refetches. The web workspace currently has no GraphQL client, query cache, frontend operation generation, request-mocking, or global-state dependency.

ADR-0009 assigns URL state to navigation and filters, server-returned data to the query cache, and isolated transient drafts to component state. ADR-0002 requires strict TypeScript and schema-derived client operation types. ADR-0006 owns the project GraphQL contract and stable GraphQL error codes. ADR-0018 and ADR-0016 own the current Vitest/jsdom and milestone-slice TDD boundaries; ADR-0011 is Superseded history.

## Decision drivers

- Preserve ADR-0009 state ownership: URL parameters own navigation, sorting, status, species, and gender filters; the query cache owns server-returned character, favorite, and comment data; component state owns isolated drafts.
- Avoid normalized entity identity, implicit entity keys, durable manual copies, browser persistence of server state, Zustand, and competing server-state stores.
- Make favorite and comment convergence observable: failure, including partial `data` plus `errors`, causes no refetch; inspected error-free success causes exactly one awaited network execution for the complete exact target-detail key.
- Generate client-neutral operation documents, result types, and variable types from the checked-in project schema instead of maintaining handwritten duplicates or client-specific generated hooks.
- Preserve distinct GraphQL, HTTP, network, abort, and decode/protocol failures with stable GraphQL `extensions.code`, response metadata, and bounded non-sensitive classification evidence.
- Fit React 18, strict TypeScript, Vite, the npm workspace, and current Vitest/jsdom scopes without a server change or live external service in frontend tests.
- Keep implementation and recurring maintenance proportionate to the first TASK-010 and TASK-011 slices while retaining a credible native baseline and a reversible boundary.
- Keep unsupported bundle, dependency-count, build-duration, test-duration, and runtime-performance claims `Unknown`.

## Considered options

| Option | Correctness / ownership (30) | Repository fit (25) | Proportional cost (20) | Error/cache clarity (15) | Evolution (10) | Total | Outcome |
|---|---:|---:|---:|---:|---:|---:|---|
| Native `fetch` plus the smallest application-owned keyed query cache | 27 | 21 | 14 | 15 | 8 | 85 | Credible baseline; passes only if the project owns the full executor, cache, React observation, request coordination, lifecycle, and test boundary. |
| urql with its default document cache and without Graphcache | 20 | 21 | 7 | 6 | 7 | 61 | Excluded by hard-gate failure. |
| TanStack Query plus a small project-owned typed GraphQL executor | 29 | 24 | 16 | 15 | 9 | 93 | Selected. |
| Apollo Client configured independently of normalized identity | 25 | 22 | 9 | 10 | 7 | 73 | Conditional; not selected. |

Hard gates override numeric totals. The selected option passes the state-ownership, identity-independence, mutation-convergence, generated-type, media-aware error-taxonomy, testability, repository-fit, proportionality, and authority-boundary gates.

Native `fetch` remains viable but requires the project to create and maintain keyed cache storage, React observation and subscription, request deduplication, lifecycle behavior, isolation, and refetch coordination. TanStack Query adds QueryClient and provider integration but avoids recreating that broader cache boundary.

Default urql is excluded. Its default `cacheExchange` derives typenames from mutation data and can automatically reexecute cached operations. That behavior can occur for partial mutation data accompanied by GraphQL errors and can broadly reexecute same-typename operations after successful mutation data. Preventing it requires a separate cache-less mutation route or owned executor and a separate media-aware transport classification boundary, removing the proportionality advantage of the default proposition. Graphcache is not selected.

Apollo is not selected because its capability and configuration surface exceed the immediate need. It remains conditional on avoiding normalized-identity-dependent correctness, cache behavior that conflicts with exact-one convergence, and a custom media-aware transport boundary.

`graphql-request` is not selected. It may be reconsidered only when then-current primary and runtime evidence proves that it preserves the required raw status, media, decoding, partial-data, and GraphQL-error boundary without weakening this decision's contract or adding disproportionate surface.

## Decision

Use TanStack Query for cached frontend server data and one small project-owned, browser-fetch-based typed GraphQL executor as the request boundary.

State ownership remains:

| State category | Owner |
|---|---|
| Navigation, sorting, status, species, and gender filters | URL parameters |
| Server-returned character, favorite, and comment data | TanStack Query cache |
| Isolated form and comment drafts | Component state |

The executor sends GraphQL-over-HTTP-compatible request and response media headers. It retains only bounded, non-sensitive evidence required to classify a response and never logs or exposes unbounded raw bodies, comment content, or infrastructure details.

The executor classifies results in this precedence:

1. Abort during request execution or response reading remains an abort.
2. A non-abort rejection before a response is a network failure.
3. `application/graphql-response+json` is interpreted as GraphQL independently of HTTP status. Successful legacy `application/json` is accepted only from the configured GraphQL endpoint.
4. A valid non-empty `errors` array, including partial `data` plus `errors`, is a GraphQL-operation failure. Available HTTP status metadata and stable `extensions.code` values are preserved.
5. Unreadable, malformed, or invalid expected data after a successful response is a decode/protocol failure with available metadata.
6. A non-success response that is not a credibly valid GraphQL error response is an HTTP failure.
7. Success requires a successful HTTP status, valid expected data, and no GraphQL errors.

Future operation documents, result types, and variable types derive from `apps/api/src/transport/graphql/schema.ts` and remain client-neutral. Generated artifacts are never manually edited. This ADR does not authorize generation configuration, generated files, client-specific hooks, or mutation artifacts.

For the future favorite and comment convergence path:

- Mutation failure, including partial `data` plus `errors`, causes no explicit or implicit success refetch.
- Only inspected error-free mutation success starts exactly one awaited network execution for the complete exact target-detail key.
- Retries for the mutation and convergence request are disabled.
- Focus, reconnect, broad invalidation, and any other automatic refetch must not add a request on that exact-one path.
- Mutation-returned data is not manually written into the detail cache as a durable update.
- The network detail result alone establishes convergence.
- Detail-refetch success is converged success.
- Detail-refetch failure after persisted mutation is a distinct persisted-but-not-refreshed outcome. It is neither rollback nor a durable optimistic or manual copy.

Same-target custom mutation concurrency ordering is not selected. If later scope demonstrates that the per-mutation invariant cannot be preserved without such a protocol, dependent work stops for bounded reassessment.

## Consequences

### Positive

- Server data has an explicit cache owner with deterministic complete query keys and isolated test clients.
- The owned executor preserves the response evidence required for the GraphQL, HTTP, network, abort, and decode taxonomy.
- The exact-one convergence rule is observable and testable without normalized cache identity.
- Generated GraphQL artifacts remain portable because they are schema-derived and client-neutral.
- Centralized query keys, executor calls, and mutation coordination bound replacement or removal work.

### Negative

- The selected approach adds QueryClient/provider integration and project-owned executor and mutation-coordination maintenance.
- Every successful favorite or comment mutation incurs one additional awaited target-detail network execution.
- The exact-one path constrains retry, focus, reconnect, and broad-invalidation behavior that may remain useful for ordinary queries.
- Partial `data` plus `errors` is treated as a failed mutation outcome, not converged UI success.
- Controlled test fixtures are required for media, status, error, cache, and refetch behavior.
- Exact installed versions, output size, build effects, test duration, and runtime performance remain unmeasured and therefore `Unknown`.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Query-key drift makes a refetch too broad, incomplete, or non-deterministic | Centralize complete query-key construction and the mutation coordinator; test exact target-detail execution and key isolation. |
| Retry, focus, reconnect, or broad invalidation adds an unintended request | Disable those mechanisms on the exact-one convergence path and prove zero extra requests with controlled tests. |
| Mutation data is manually copied into cache before detail convergence | Prohibit mutation-result durable cache writes; use only the inspected network detail result to establish convergence. |
| Bounded classification evidence becomes a sensitive or unbounded raw-body exposure | Retain and expose only bounded non-sensitive evidence; never expose comment content or infrastructure detail. |
| Runtime result validation grows beyond the executor's narrow role | Keep the executor limited to request/media/response classification and typed result handling; reassess material expansion. |
| The GraphQL-over-HTTP specification changes while it remains a draft | Recheck current primary-source guidance during implementation and reassess if a change invalidates the media/status contract. |
| QueryClient APIs spread through presentation code and increase replacement cost | Keep executor calls, keys, and mutation coordination centralized at the data boundary. |
| Future pagination, offline support, subscriptions, or normalized-cache needs change the cache problem | Reassess through a bounded decision rather than extending this decision implicitly. |
| Measured dependency, build, or maintenance cost becomes disproportionate to the native baseline | Compare observed costs with the native 85-point baseline before expanding the selected boundary. |
| Later same-target concurrent mutations require custom ordering | Stop for bounded design reassessment; do not invent a hidden concurrency protocol. |

Reversal is triggered by incompatible then-current versions, inability to prove exact-one convergence, executor or coordinator growth beyond this ADR's role, presentation-layer QueryClient spread, disproportionate measured cost against the native baseline, demonstrated scope that changes the cache problem, or final GraphQL-over-HTTP semantics that materially invalidate the selected taxonomy.

## Validation

Future implementation must provide automated evidence for all of the following:

- Generated operation documents, result types, and variable types derive from the checked-in schema; no generated artifact is hand-edited.
- Each test receives a fresh QueryClient and injected executor or equivalent controlled request boundary.
- No frontend test uses a live upstream character API or live external GraphQL service.
- Cache reuse and complete-variable/key isolation are observable.
- Abort before or during response reading is distinct from a non-abort network rejection.
- `application/graphql-response+json` GraphQL errors on a non-success status are classified as GraphQL failures.
- Successful legacy `application/json` is accepted only at the configured GraphQL endpoint.
- Malformed successful responses, malformed or non-credible non-success responses, text bodies, and invalid expected data produce the required decode/protocol or HTTP category.
- Partial `data` plus `errors` preserves GraphQL failure information and causes zero convergence requests.
- Error-free favorite or comment success produces exactly one awaited target-detail network execution, while retry, focus, reconnect, same-typename list, and other-detail request counts remain zero.
- No mutation-result `setQueryData`-style or other durable manual cache update occurs before the detail network result.
- A persisted mutation followed by failed exact detail refetch presents persisted-but-not-refreshed without rollback or durable manual state.
- The rejected urql behavior remains research evidence; downstream implementation does not install urql merely to reproduce the negative control.
- The first implementation plan records a proportionality readback covering dependencies, files, configuration, generated artifacts, tests, build effects, and maintenance.

## Evaluation

### Candidate comparison

The hard-gate-first candidate matrix ranks TanStack Query plus the owned executor at 93/100, native `fetch` plus owned cache at 85/100, identity-independent Apollo at 73/100 conditional on further constraints, and default urql at 61/100 but excluded for hard-gate failure. Unsupported measured claims receive no score credit.

### ADR quality evaluation

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 19 | 20 | Maps all required frontend, quality, acceptance, and adopted-optional scope identifiers; implementation evidence remains intentionally absent. |
| Architectural fit and consistency | 19 | 20 | Preserves ADR-0002, ADR-0006, ADR-0009, the harness boundary now carried by ADR-0018, and ADR-0016. |
| Options and trade-offs | 15 | 15 | Compares every frozen candidate, records hard-gate exclusion, and preserves rejected-option rationale. |
| Feasibility and proportionality | 13 | 15 | Uses compatible existing boundaries and a credible native baseline; package versions and measured costs remain prove-later. |
| Quality attributes | 9 | 10 | Defines correctness, privacy-bounded diagnostics, determinism, and maintainability controls. |
| Verifiability | 10 | 10 | Defines controlled media/status/error, cache, and exact-one convergence evidence. |
| Evolution and reversibility | 8 | 10 | Centralization and explicit reversal triggers support replacement, while implementation remains required. |
| **Total** | **93** | **100** | |

**Recommendation:** Accept.

The project owner approved exact independently reviewed proposal SHA-256 `2A691BB6C2A025F264B9ABE70E93F45801B932404C4005090D0EB71808267158` on 2026-08-18. This record is Accepted and resolves DG-003. Acceptance authorizes TASK-009 documentation closure only; TASK-010 or other owning work still requires separate execution authorization before dependency installation or frontend implementation, and no runtime behavior is claimed.

## References

- [Repository guidelines](../../AGENTS.md)
- [Requirements](../REQUIREMENTS.md)
- [Implementation plan](../IMPLEMENTATION_PLAN.md)
- [Completed TASK-009 decision ExecPlan](../plans/completed/TASK-009-frontend-graphql-client-decision.md)
- [ADR index and evaluation rubric](./README.md)
- [ADR-0002: Use TypeScript across the stack](./0002-use-typescript-across-the-stack.md)
- [ADR-0006: Define a use-case-oriented GraphQL contract](./0006-define-a-use-case-oriented-graphql-contract.md)
- [ADR-0009: Keep frontend state close to its owner](./0009-keep-frontend-state-close-to-its-owner.md)
- [ADR-0011: Superseded TypeScript test harness](./superseded/0011-define-the-typescript-test-harness.md)
- [ADR-0018: Current TypeScript test harness with repository-owned smoke orchestration](./0018-define-the-typescript-test-harness-with-repository-owned-smoke-orchestration.md)
- [ADR-0016: Use milestone-slice TDD with independent test and implementation ownership](./0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md)
- [Feature specification](../specs/SPEC.feature)
- [Hard specification](../specs/HARD_SPEC.feature)
- [GraphQL-over-HTTP draft](https://graphql.github.io/graphql-over-http/draft/)
- [urql default cache source](https://raw.githubusercontent.com/urql-graphql/urql/main/packages/core/src/exchanges/cache.ts)
- [urql fetch source](https://raw.githubusercontent.com/urql-graphql/urql/main/packages/core/src/internal/fetchSource.ts)
- [urql result source](https://raw.githubusercontent.com/urql-graphql/urql/main/packages/core/src/utils/result.ts)
- [TanStack Query invalidation guide](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation)
- [TanStack Query mutation reference](https://tanstack.com/query/latest/docs/framework/react/reference/useMutation)
- [TanStack Query important defaults](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults)
- [TanStack Query QueryClient reference](https://tanstack.com/query/latest/docs/reference/QueryClient)
