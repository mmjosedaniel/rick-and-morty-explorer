# ADR-0001: Use a Modular Monolith Workspace

- Status: Accepted
- Date: 2026-08-09
- Decision owners: Project maintainers
- Related requirements: NFR-001, NFR-003, NFR-004, OR-008, AC-007, AC-012
- Supersedes: None
- Superseded by: None

## Context

The deliverable must contain a React frontend, an Express and GraphQL backend, shared API contracts, and local PostgreSQL and Redis dependencies. It must remain easy to review and run as one public repository. The assessment does not require independent service scaling or distributed deployment.

## Decision drivers

- One documented setup and validation workflow.
- Clear frontend, backend, and shared-contract boundaries.
- Low operational overhead for a time-bounded assessment.
- Enough structure to demonstrate maintainable code without framework ceremony.

## Considered options

| Option | Benefits | Costs and risks | Outcome |
|---|---|---|---|
| Workspace modular monolith with `apps/web`, `apps/api`, and a narrowly scoped `packages/shared` | Clear ownership, one repository, reusable generated contract types, simple root scripts | Requires workspace configuration and boundary discipline | Selected |
| One unstructured application package | Lowest initial setup cost | Couples browser and server code, obscures ownership, and becomes harder to test independently | Rejected |
| Separate repositories or microservices | Independent deployment and ownership | Adds networking, orchestration, duplicated configuration, and review overhead with no requirement benefit | Rejected |

## Decision

The system will use a workspace monorepo organized around a modular monolith:

```text
apps/
  api/
  web/
packages/
  shared/
```

The API remains one deployable process. Its modules may separate GraphQL transport, application services, and persistence adapters, but they communicate in-process. The shared package is limited to stable cross-boundary artifacts such as generated GraphQL types or validation-neutral constants; it must not become a dumping ground for backend domain models.

Root-level scripts will provide the documented install, development, build, test, migration, and character-import entry points. A root `compose.yaml` will run PostgreSQL and Redis for local development and integration tests, while the web and API applications run through workspace scripts. An `.env.example` will document non-secret configuration.

Integration tests will use a PostgreSQL database or schema and a Redis key prefix containing a unique test-run identifier. Test setup applies migrations, and teardown removes only that run's database objects and cache keys. PostgreSQL and Redis remain infrastructure dependencies of the API rather than separate application services.

## Consequences

### Positive

- A reviewer can clone and operate one repository.
- Web and API applications retain clear ownership and independent build/test boundaries.
- Cross-contract drift can be detected without duplicating handwritten types.
- The architecture remains proportional to the required feature set.

### Negative

- Workspace tooling adds initial configuration.
- Shared-package imports can create accidental coupling if not constrained.
- A future need for independent service deployment would require a new decision.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Backend models leak into the frontend | Share only contract-level artifacts and enforce dependency direction in lint/build rules. |
| Root scripts hide application-specific failures | Keep equivalent app-level scripts and make root scripts delegate transparently. |
| Architecture grows into unnecessary layers | Add a layer only when it owns a real boundary, such as GraphQL transport, application behavior, or persistence. |
| Parallel tests modify one another's data | Use a dedicated test database and unique Redis prefix per test run, followed by scoped cleanup. |

## Validation

- The web and API applications can be built and tested independently.
- A single documented root workflow starts all required local components.
- The documented Compose workflow starts healthy PostgreSQL and Redis services without embedded secrets.
- Two isolated test runs do not share database rows or Redis keys.
- The browser application has no direct database, Redis, or external character API dependency.
- No microservice, event bus, or cross-process application boundary exists without a superseding ADR.

## Evaluation

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 19 | 20 | Directly supports the single-repository deliverable and both application tiers. |
| Architectural fit and consistency | 19 | 20 | Provides boundaries used by the remaining ADRs. |
| Options and trade-offs | 14 | 15 | Includes credible simpler and more distributed alternatives. |
| Feasibility and proportionality | 14 | 15 | Adds modest setup while avoiding operational complexity. |
| Quality attributes | 9 | 10 | Improves maintainability, reviewability, and testability. |
| Verifiability | 8 | 10 | Build and dependency-boundary checks are measurable. |
| Evolution and reversibility | 9 | 10 | Modules can be separated later if a real scaling need appears. |
| **Total** | **92** | **100** | |

**Recommendation:** Accept.

## References

- [Requirements specification](../REQUIREMENTS.md)
- [Technical assessment](../FULL_STACK_TECHNICAL_ASSESSMENT.md)
- [ADR index](./README.md)
