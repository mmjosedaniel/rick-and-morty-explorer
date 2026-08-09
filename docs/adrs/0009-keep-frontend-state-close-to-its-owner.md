# ADR-0009: Keep Frontend State Close to Its Owner

- Status: Accepted
- Date: 2026-08-09
- Decision owners: Project maintainers
- Related requirements: FR-FE-001, FR-FE-002, FR-FE-003, FR-FE-004, FR-FE-005, NFR-001, NFR-002, NFR-005, OR-003, AC-001, AC-002, AC-003, AC-004, AC-005, AC-006
- Supersedes: None
- Superseded by: None

## Context

The React application needs routable list and detail screens, sorting, remote GraphQL data, persisted interactions, and transient form state. The scope does not currently require complex cross-page workflows, offline synchronization, or a general-purpose global client-state framework. The project's portfolio goal makes it useful to identify an appropriate client-state tool for future shared UI state, but installing a tool without a concrete ownership problem would not demonstrate sound architectural judgment.

## Decision drivers

- Reloadable and shareable navigation state.
- A single owner for server data and mutation results.
- Minimal state synchronization code.
- A concrete threshold for adopting shared client-state infrastructure.
- Clear loading, empty, error, and responsive UI behavior.

## Considered options

| Option | Benefits | Costs and risks | Outcome |
|---|---|---|---|
| URL parameters, GraphQL client cache, and component-local state, with Zustand reserved for demonstrated shared client-only state | Explicit ownership, reloadable navigation, little initial infrastructure, and a defined growth path | Requires disciplined ownership checks before adding a store | Selected |
| Install Zustand at project initialization without a qualifying state slice | Demonstrates the library immediately | Creates an unused or artificial global owner and encourages duplicated state | Rejected |
| Put all state in a global Redux-style store | Centralized inspection and broad ecosystem | Duplicates GraphQL server state and adds reducers/actions for a small application | Rejected |
| Keep all state in components and browser storage | Minimal dependencies | Creates prop drilling, stale copies, and non-authoritative favorites/comments | Rejected |

## Decision

The web application will use React 18. React Router DOM will define a list route at `/` and an addressable detail route at `/characters/:id`.

State ownership will be divided as follows:

- URL search parameters own the selected A-Z or Z-A sort direction and the adopted optional status, species, and gender interface filters.
- The GraphQL query cache owns server-returned character, favorite, and comment data.
- Component-local state owns transient controls such as an unsubmitted comment body or an open panel.
- Zustand will own only genuinely cross-cutting, client-only UI state if and when a concrete feature requires it.
- PostgreSQL, accessed through GraphQL mutations, remains the durable owner of favorites and comments; browser storage is not authoritative.

Zustand will not be installed and no global store will be created merely to demonstrate a dependency. A state slice qualifies for Zustand only when all of these conditions hold:

1. It is consumed across routes or by components that have no sensible common owner.
2. It represents client-only UI or workflow state rather than server data.
3. It does not belong in a shareable URL.
4. Keeping it local would require material prop drilling, duplicated providers, or fragile synchronization.

An application-wide notification queue or a future cross-route workflow may qualify after the corresponding feature exists. Character records, GraphQL query results, favorites, comments, filters, sorting, and isolated form drafts do not qualify. If Zustand is adopted under these constraints, the store will use strict TypeScript types, explicit actions, narrow selectors, and focused tests. Persistence middleware will not be added without a separate documented persistence need.

Introducing Zustand within this boundary does not require another ADR. Moving URL-owned or server-owned state into Zustand, persisting the store, or adopting a broader global-state architecture requires this decision to be superseded.

The required list is sorted client-side because the baseline contains 15 unpaginated records. Sorting uses a case-insensitive locale-aware comparison with character ID as a stable tiebreaker. The adopted status, species, and gender filters will call the backend filter contract. After a favorite or comment mutation succeeds, the client explicitly refetches the affected character-detail query. This avoids requiring normalized entity identities or a competing manual copy of server data.

The UI will provide explicit loading, empty, and error states. Images will include meaningful alternative text and a layout-safe fallback. Tailwind CSS, Flexbox, and Grid will be used to make list and detail layouts responsive.

## Consequences

### Positive

- List state survives reloads and browser back/forward navigation.
- Server state has one client-side owner.
- The application avoids a redundant global state dependency.
- A lightweight, preselected path exists if real cross-cutting client state appears.
- The portfolio demonstrates deliberate tool selection rather than dependency accumulation.
- Direct detail links are testable and shareable.

### Negative

- Explicit post-mutation refetches add a small network request.
- URL parameter parsing and normalization need tests.
- Client-side sorting must be revisited if pagination is introduced.
- Zustand cannot be claimed as implemented experience unless a qualifying feature actually requires and uses it.
- Deciding whether future state crosses the adoption threshold requires architectural judgment.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Mutations leave the detail view stale | Refetch the affected character-detail query after each successful mutation. |
| Invalid URL parameters create inconsistent behavior | Parse against an allowlist and fall back to documented defaults. |
| Remote images fail or change dimensions | Provide alt text, fixed aspect-ratio containers, and a non-breaking fallback. |
| Filters and sort state diverge from displayed results | Derive query variables and sorting directly from normalized URL state. |
| Zustand is introduced only for portfolio visibility | Keep the dependency absent until a named state slice satisfies every adoption condition. |
| A Zustand store duplicates URL or GraphQL state | Prohibit navigation and server-owned data from entering the store and test the ownership boundary. |
| Shared client-only state grows without a clear owner | Adopt a small typed Zustand store once the documented threshold is met. |

## Validation

- Directly loading `/characters/:id` renders the requested character or a clear not-found state.
- The frontend dependency manifest uses React major version 18 and React Router DOM, and route tests exercise both list and detail routes.
- Sort direction survives reload and browser navigation.
- Status, species, and gender controls update normalized URL parameters and send the corresponding GraphQL filter variables.
- Filtered results remain correct after reload and browser back/forward navigation.
- A favorite or added comment remains visible after refetch and page reload.
- The implementation does not depend on normalized entity-cache behavior or implicit entity keys.
- The initial dependency graph contains no Zustand package unless a concrete qualifying state slice is documented.
- If Zustand is introduced, its state is consumed across routes or otherwise crosses a meaningful component boundary, and focused tests cover its actions and selectors.
- A Zustand store contains no character records, GraphQL results, favorites, comments, URL filters, sorting values, or isolated form drafts.
- Zustand persistence middleware is absent unless a new documented persistence requirement exists.
- Loading, empty, API-error, and image-error states do not break the layout.
- Card and detail layouts pass checks at 375-pixel mobile, 768-pixel tablet, and 1280-pixel desktop viewport widths.
- No global client-state framework other than the conditional, narrowly scoped Zustand adoption defined here is introduced without a superseding ADR.

## Evaluation

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 19 | 20 | Covers every required frontend interaction and responsive behavior. |
| Architectural fit and consistency | 18 | 20 | Preserves GraphQL and PostgreSQL ownership boundaries. |
| Options and trade-offs | 13 | 15 | Compares scoped ownership with global and local-only approaches. |
| Feasibility and proportionality | 14 | 15 | Avoids unnecessary state infrastructure for a small application. |
| Quality attributes | 9 | 10 | Improves usability, consistency, and maintainability. |
| Verifiability | 9 | 10 | Navigation, mutation, ownership, conditional Zustand adoption, and responsive checks are observable. |
| Evolution and reversibility | 8 | 10 | A lightweight growth path is explicit, while broader ownership changes require a superseding decision. |
| **Total** | **90** | **100** | |

**Recommendation:** Accept.

## References

- [Requirements specification](../REQUIREMENTS.md)
- [ADR-0005](./0005-use-single-user-persistence-for-character-interactions.md)
- [ADR-0006](./0006-define-a-use-case-oriented-graphql-contract.md)
- [ADR index](./README.md)
- [Zustand documentation](https://zustand.docs.pmnd.rs/)
