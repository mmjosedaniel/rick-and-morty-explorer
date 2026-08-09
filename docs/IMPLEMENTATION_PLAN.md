# Implementation Plan

## Current planning state

The repository is still in its requirements and architecture phase. This initial plan records architectural decision gates only; it does not claim that an application scaffold, dependencies, commands, migrations, tests, or runtime behavior exist.

Mandatory requirements and deliverables remain defined in the [requirements specification](./REQUIREMENTS.md). Optional requirements retain the source assessment's classification, and their repository dispositions remain authoritative in the [ADR index](./adrs/README.md#optional-scope-decisions).

Use the repository [documentation map](../README.md#documentation-map) for authority and task routing. This plan owns sequencing and gates only; it cannot create scope or approve an unresolved architectural choice.

## Decision-gate policy

A decision gate records an unresolved, consequential choice whose implementation would be costly to reverse. A pending gate does not reserve an ADR number or imply that an option has been selected.

Resolve each gate as follows:

1. Create a new ADR with the next unused ID and status `Proposed` when the dependent implementation milestone becomes imminent.
2. Evaluate credible alternatives, consequences, risks, reversal triggers, and measurable validation under the repository's ADR rubric.
3. Obtain project-owner approval and change the ADR to `Accepted` before adding the artifacts blocked by the gate.
4. Link the accepted ADR from this plan, change the gate to `Resolved`, and retain the record as planning history.

An accepted ADR records implementation direction only. Resolving a gate is not evidence that the selected tooling or behavior has been implemented.

## Active decision gates

| Gate | Status | Required decision | Must be resolved before | Governing context |
|---|---|---|---|---|
| DG-001 | Pending | Define the TypeScript test-harness strategy, including whether one or multiple runners are used, the browser-like DOM environment, workspace configuration model, and unit-versus-integration command boundaries. | Adding a test-runner dependency or configuration, writing the first application test, or beginning the first production-behavior Red-Green-Refactor cycle. | NFR-004; OR-001, OR-004, OR-007 (adopted optional); ADR-0001, ADR-0002, ADR-0010 |
| DG-002 | Pending | Define the executable Sequelize migration lifecycle, including the runner, TypeScript source execution versus compiled-artifact execution, local and test invocation, rollback behavior, and concurrent-execution behavior. | Adding a migration runner or configuration, writing the first migration, exposing a root migration command, bootstrapping persistence tests, or deriving the ERD from migration state. | FR-BE-003, FR-BE-004, NFR-003, DEL-002, AC-009, AC-012; OR-001 (adopted optional); ADR-0001, ADR-0002, ADR-0003, ADR-0008, ADR-0010 |
| DG-003 | Pending | Select the frontend GraphQL client and query-cache implementation, including operation type generation, error handling, cache behavior, explicit post-mutation refetching, and its test boundary. | Adding the client dependency or provider, generating client operation artifacts, writing the first frontend data-access test that depends on the selected client or cache, or writing frontend query, mutation, hook, or cache configuration code. | FR-FE-001, FR-FE-002, FR-FE-003, FR-FE-004, FR-FE-005, NFR-001, OR-003 (adopted optional), AC-001, AC-002, AC-003, AC-004, AC-005; ADR-0002, ADR-0006, ADR-0009, ADR-0010 |

## Gate sequence and parallelism

1. Resolve DG-001 at repository-foundation time because every production behavior must begin with an executable failing test under ADR-0010.
2. DG-002 may be evaluated in parallel with DG-001, but database-backed persistence artifacts and integration tests that depend on the migration lifecycle cannot begin until DG-001 and DG-002 are both resolved.
3. Resolve DG-003 after the project-owned GraphQL operations are stable and before frontend data-access implementation. It does not block backend schema, service, repository, or static frontend layout work.

Neutral requirements and architecture documentation may continue while a gate is pending. Declarative workspace or infrastructure work may proceed only when it does not select or depend on an option controlled by a pending gate.

## Universal task-closure gate

Every future implementation work item inherits the repository [task-closure documentation gate](../README.md#task-closure-documentation-gate). Its definition of done must identify affected documentation or record a concrete `Documentation impact: None` reason, update and link authorized documentation changes, and run the relevant documentation validation before the item can be marked complete. This universal closure gate is separate from the architectural decision gates in this plan and never resolves one of them implicitly.

## Gate definitions of done

### DG-001 - TypeScript test harness

- The accepted ADR compares at least three credible runner strategies and explains the selected ESM and strict-TypeScript integration.
- It defines the browser-like DOM environment for React tests and the process boundary for PostgreSQL and Redis integration tests.
- It defines distinct, reproducible unit, integration, application, and root test scopes without claiming the commands already exist.
- Its validation can prove that frontend, backend, migration, and Redis tests execute through the documented boundaries required by ADR-0010.

### DG-002 - Sequelize migration lifecycle

- The accepted ADR compares at least three credible migration-runner and artifact-lifecycle strategies without reconsidering mandatory Sequelize or the accepted strict-TypeScript source direction.
- It defines how the same version-controlled migrations run in local setup and isolated integration tests.
- It states forward, rollback, failure, and concurrent-execution behavior without making migrations depend on the public character API.
- Its validation can prove migration from an empty PostgreSQL database and alignment between migration state and the required ERD.

### DG-003 - Frontend GraphQL client and query cache

- The accepted ADR compares at least three credible client and query-cache strategies.
- It preserves ADR-0009 ownership: URL parameters own navigation state, the GraphQL client owns server data, and component state owns transient controls.
- It does not require normalized entity identity and defines explicit detail refetching after favorite and comment mutations.
- It defines how generated operation types, GraphQL errors, request mocking, and cache behavior are validated without duplicating server-owned state.

## Dormant architectural triggers

The following conditions are outside the current delivery baseline and are not active gates. Promote the applicable item to a decision gate before expanding scope:

- Public anonymous mutation traffic or user identity requires the security, ownership, abuse-control, and retention decision required by ADR-0005.
- A scheduled or multi-instance import requires the worker coordination and cache-invalidation decision required by ADR-0007 and ADR-0008.
- Soft deletion requires a superseding persistence decision because ADR-0003 defers it and it would affect default scopes, imports, and cache invalidation.
- Pagination or material dataset growth requires revisiting the deferred indexing and query-plan decision in ADR-0003, server-side ordering and the GraphQL contract in ADR-0006, the cached projection and key policy in ADR-0007, and frontend URL state in ADR-0009.

## References

- [Documentation map and current status](../README.md)
- [Repository guidelines](../AGENTS.md)
- [Technical assessment](./FULL_STACK_TECHNICAL_ASSESSMENT.md)
- [Requirements specification](./REQUIREMENTS.md)
- [ADR index](./adrs/README.md)
