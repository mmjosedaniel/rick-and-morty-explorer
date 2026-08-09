# ADR-0002: Use TypeScript Across the Stack

- Status: Accepted
- Date: 2026-08-09
- Decision owners: Project maintainers
- Related requirements: OR-001, OR-006, NFR-004
- Supersedes: None
- Superseded by: None

## Context

TypeScript is optional in the assessment, but the application crosses several contracts: GraphQL inputs and results, React component properties, environment configuration, Sequelize models, and external API mapping. Mixing languages would weaken those contracts and increase review effort.

## Decision drivers

- Detect contract drift before runtime.
- Keep frontend and backend development conventions consistent.
- Improve refactoring safety without adding a separate runtime.
- Use stable modern ECMAScript features for readable and explicit asynchronous control flow.
- Avoid experimental language features that do not serve mandatory behavior.

## Considered options

| Option | Benefits | Costs and risks | Outcome |
|---|---|---|---|
| Strict TypeScript with modern ECMAScript conventions in web, API, and shared packages | Consistent types, safer refactoring, stronger GraphQL and model boundaries, and readable asynchronous flows | Build configuration, runtime-target alignment, and occasional library-type friction | Selected |
| JavaScript with JSDoc | Minimal compilation setup and gradual typing | Weaker enforcement and duplicated annotations across contracts | Rejected |
| TypeScript in only one application | Smaller migration surface | Creates inconsistent tooling and loses end-to-end contract value | Rejected |

## Decision

All application and test source code will use TypeScript with strict compiler checks. Each workspace may have an environment-specific configuration that extends a common base. GraphQL resolver and client-operation types will be generated from the version-controlled schema rather than maintained as duplicate handwritten interfaces. Generated artifacts will not be edited by hand.

Source code will use modern, stable ECMAScript features supported by the documented Node.js and browser targets. Asynchronous workflows will prefer `async`/`await` over nested callbacks or unnecessary `.then()` chains. Independent operations will use an explicit concurrency primitive such as `Promise.all` or `Promise.allSettled` instead of being serialized by consecutive `await` expressions. ECMAScript modules, `const`, destructuring, optional chaining, and nullish coalescing will be used when they improve clarity.

The optional method-decorator feature is not adopted by this decision. Experimental decorators will not be enabled solely to measure execution time; ordinary middleware or explicit wrappers are preferred unless a later ADR justifies decorators.

## Consequences

### Positive

- GraphQL, persistence, and UI contracts fail earlier when they diverge.
- Refactoring across applications is safer.
- Tests and production code use the same language and tooling model.
- Asynchronous behavior is expressed with readable control flow and explicit concurrency.

### Negative

- Compilation and type generation add setup time.
- External API payloads still require runtime validation because static types cannot validate network data.
- Strict settings may require explicit adapters around loosely typed libraries.
- Runtime and browser targets must remain aligned with the selected language features.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Generated GraphQL types become stale | Generate or check them as part of the build or continuous-integration workflow. |
| Type assertions hide unsafe input | Validate environment variables, GraphQL input, and external payloads at runtime. |
| Shared types couple persistence to the UI | Generate types from the GraphQL contract, not from Sequelize models. |
| Consecutive `await` expressions accidentally serialize independent work | Use an explicit Promise concurrency primitive and test order-independent behavior where concurrency matters. |
| Modern syntax exceeds a supported runtime | Document Node.js and browser targets and verify them through the production build. |

## Validation

- Web, API, and test sources use TypeScript.
- The strict type-check command succeeds without emitting files.
- The production build succeeds for the documented Node.js and browser targets.
- Multi-step asynchronous flows use `async`/`await`, while independent operations use an explicit concurrency primitive rather than accidental serialization.
- Static checks reject `var` and unhandled or floating promises. Code review rejects callback-based control flow when a supported Promise API provides a clearer equivalent.
- No frontend module imports a Sequelize model or server-only type.
- External data and environment variables pass runtime validation before use.

## Evaluation

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 17 | 20 | Adopts an optional requirement and strongly supports code quality. |
| Architectural fit and consistency | 18 | 20 | Reinforces the workspace and contract boundaries. |
| Options and trade-offs | 13 | 15 | Compares full, partial, and annotation-based typing. |
| Feasibility and proportionality | 13 | 15 | Adds manageable setup for broad safety benefits. |
| Quality attributes | 9 | 10 | Improves maintainability and correctness. |
| Verifiability | 8 | 10 | Compiler and dependency checks are deterministic. |
| Evolution and reversibility | 9 | 10 | TypeScript remains JavaScript-compatible and can be adopted incrementally. |
| **Total** | **87** | **100** | |

**Recommendation:** Accept.

## References

- [Requirements specification](../REQUIREMENTS.md)
- [Technical assessment](../FULL_STACK_TECHNICAL_ASSESSMENT.md)
- [Repository guidelines](../../AGENTS.md)
- [ADR-0001](./0001-use-a-modular-monolith-workspace.md)
- [ADR index](./README.md)
