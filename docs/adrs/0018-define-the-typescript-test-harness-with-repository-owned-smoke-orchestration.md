# ADR-0018: Define the TypeScript Test Harness with Repository-Owned Smoke Orchestration

- Status: Accepted
- Date: 2026-08-20
- Approval date: 2026-08-20
- Decision owners: Project owner and project maintainers
- Related requirements: NFR-004, OR-001, OR-004, OR-007, AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008, AC-009, AC-010, AC-011, AC-012
- Related decisions: ADR-0001, ADR-0002, ADR-0010, ADR-0011, ADR-0014, ADR-0015, ADR-0016
- Controlled gate: DG-001; remains resolved by this accepted whole-record successor
- Owning task: TASK-010 (Complete)
- Supersedes: ADR-0011
- Superseded by: None

## Context

The repository has adopted strict TypeScript and frontend and backend automated tests as repository commitments even though OR-001, OR-004, and OR-007 remain optional in the source assessment. Now-Superseded ADR-0010 established targeted test strategy and Red-Green-Refactor history; accepted ADR-0016 now governs milestone-slice TDD and separate test and implementation ownership. ADR-0001 requires transparent workspace and root command boundaries, external PostgreSQL and Redis processes, and per-run database or schema and Redis-prefix isolation.

ADR-0011 selected Vitest projects for every non-browser scope, jsdom for React semantic-DOM tests, strict no-emit TypeScript as an independent boundary, external run-isolated infrastructure, and one one-worker Chromium Playwright smoke. TASK-003 implemented the initial harness. Later tasks incrementally added PostgreSQL, import, GraphQL, and Redis scopes while preserving the same command portfolio.

ADR-0011 also required Playwright's `webServer` plugin to own the web and API server processes and their process-group cleanup. It made unreliable Windows or continuous-integration cleanup an explicit reversal trigger. During TASK-010, three Playwright-owned smoke runs reached the intended missing-CSP assertion and exact PostgreSQL/Redis cleanup but the Playwright parent did not terminate naturally. Moving builds and direct Node server launchers beneath the same Playwright ownership did not remove the hang. The precise retained internal handle was not isolated and is not asserted as fact; installed Playwright 1.61.1 source and official documentation confirm that `webServer` uses shell-launched commands, awaits process closure, and cannot use configured graceful shutdown signals on Windows.

The project owner then explicitly approved one bounded alternative: preserve Playwright as the sole Chromium test runner but move fresh builds, exact fixture lifecycle, direct application children, readiness, Playwright invocation, and cleanup under one repository-owned TypeScript orchestrator using existing tooling. The corrected missing-CSP Red exited naturally, the Green smoke passed, and the permission-qualified local Windows lifecycle verifier passed normal completion, startup conflict, assertion failure, readiness timeout, forced cancellation, and forced interruption. Clean-checkout or hosted-platform proof for the new process boundary is still absent and remains a downstream TASK-010 Milestone 2 validation gate rather than ADR acceptance evidence.

This whole-record successor is necessary because execution record DPL-DEC-050 could authorize implementation but could not change accepted architecture. ADR-0011 is preserved as Superseded history. This record carries forward every unaffected harness rule and replaces only smoke process ownership.

## Decision drivers

- Preserve strict TypeScript as an independent no-emit compiler boundary for application and test source.
- Use ECMAScript modules without silently compiling production code to CommonJS.
- Keep Vitest as the single non-browser runner with unique named projects and explicit Node or jsdom environments.
- Keep jsdom evidence limited to semantic rendering and interaction rather than layout, navigation, image loading, or complete browser behavior.
- Exercise GraphQL, PostgreSQL, Redis, migrations, imports, native application startup, and browser behavior at their real boundaries with deterministic isolation.
- Keep PostgreSQL and Redis externally owned and clean only the exact database/schema and Redis prefix allocated to a run.
- Preserve the primary failure while separately reporting setup, process, artifact, or cleanup failure.
- Support fast focused Red feedback and one deterministic root full-suite boundary.
- Keep exactly one one-worker Chromium smoke and avoid broad end-to-end scope.
- Make normal, startup, assertion, timeout, cancellation, interruption, and cleanup behavior falsifiable on Windows and the supported clean or hosted platform.
- Prevent automated tests from calling the live public Rick and Morty API.
- Reject a new dependency, second suite, production test branch, broad process/data cleanup, forced process exit, or generic process abstraction without present evidence.
- Keep configuration, assertions, fixtures, lifecycle hooks, documentation, recurring operator work, and the next two plausible browser-feature extensions proportional to the assessment.
- Preserve ordinary-test traceability to requirements, ADRs, public contracts, SPEC, HS, and confirmed regression IDs without executable Gherkin bindings.

## Considered options

### Runner strategies carried forward

| Option | Benefits | Costs and risks | Outcome |
|---|---|---|---|
| Vitest projects for web, API, shared, application, and integration tests; jsdom for React; Playwright Test for the Chromium smoke | One ESM-first non-browser runner and assertion model; named Node and jsdom projects; direct Vite/React alignment; one real-browser boundary | Vitest's module runner differs from native Node.js; Playwright adds a browser binary | Selected and carried forward |
| Jest projects for non-browser tests plus Playwright for the smoke | Mature project and mocking model | ESM requires additional transform and VM-module compatibility work and duplicates Vite settings | Rejected and carried forward as rejected |
| Built-in Node.js test runner for server scopes, Vitest for React, and Playwright for the smoke | Native server loader fidelity | Adds a second non-browser dialect and constrains TypeScript syntax, imports, aliases, setup, and mocking | Rejected and carried forward as rejected |

### React DOM environments carried forward

| Option | Benefits | Costs and risks | Outcome |
|---|---|---|---|
| jsdom | Standards-oriented DOM subset, direct Vitest support, broad React Testing Library compatibility | No layout engine and incomplete navigation/browser APIs | Selected and carried forward |
| happy-dom | Fast Node-hosted DOM simulation | Missing APIs and no measured need that justifies lower compatibility confidence | Rejected unless future evidence changes the trade-off |
| Real browser for all React tests | Highest browser fidelity | Disproportionately slow feedback and browser/process cost | Rejected; browser scope stays narrow |

### Smoke process ownership

| Option | Implementation and test surface | Runtime and operator burden | Next-feature and removal cost | Outcome |
|---|---|---|---|---|
| Restore Playwright `webServer` ownership | Smallest nominal diff and no new dependency | Three TASK-010 runs completed exact data cleanup but did not terminate naturally on Windows; the ADR-0011 reversal trigger occurred | Every later browser extension re-enters the same observed failure; removal cost is low but the current contract is not reliable | Rejected |
| One existing-`tsx` repository orchestrator with direct Node application children; Playwright remains the sole Chromium runner | One bounded runner plus root script, tools inclusion, pure Playwright browser config, and exact fixture CLI; no new dependency or suite | Repository owns builds, readiness, failure composition, shutdown, and recovery; local Red, Green, and six-case Windows evidence pass | TASK-011 and TASK-012 may extend the same smoke without a new process model; removal is limited to the bounded harness paths | Selected |
| A generic shell or process supervisor around Playwright and the applications | Adds another lifecycle owner or nested shell boundary; a new product would add a dependency | Does not itself own exact fixture setup/data cleanup or failure composition and increases diagnostic ambiguity | Higher recurring configuration and removal cost without evidence of better cleanup | Rejected by proportionality |

The selected option is larger than the nominal Playwright baseline but is the smallest complete option that satisfies the observed Windows lifecycle. It reuses Node, `tsx`, Playwright, current build scripts, migration/import seams, PostgreSQL, Redis, and the existing lifecycle verifier. It adds no test kind, product behavior, external service, dependency, or general-purpose process framework.

## Decision

The repository will use the stable Vitest line pinned by implementation for all non-browser unit, component, application, GraphQL, PostgreSQL, Redis, migration, and import tests. The root Vitest registry owns unique project names, deterministic common defaults, selection, and reporting. API and shared workspaces own their Node-environment include patterns and package-local setup; infrastructure projects also use the Node environment explicitly. React unit and application projects explicitly use jsdom. Every project has non-overlapping ownership and deterministic single-run selection. Project settings are merged or extended deliberately rather than assumed to inherit. Runner transformation never satisfies strict type checking; root `typecheck` separately delegates strict `tsc --noEmit` to every implemented application and test configuration.

The web workspace owns jsdom setup, React Testing Library setup, DOM matchers, and web-specific deterministic fixtures. jsdom may prove semantic rendering, accessibility queries, loading and error states, forms, interactions, and routed composition that does not require real browser behavior. It must not prove CSS layout, responsive rendering, navigation, image loading, referrer/CORS behavior, or complete browser APIs. Those claims require the one Chromium smoke or a later explicitly accepted targeted browser check.

PostgreSQL and Redis remain external processes owned by local infrastructure or continuous integration, not embedded test services. Each integration project registers its exact prerequisites with the root lifecycle wrapper. Each real-infrastructure run allocates a sanitized run ID and only the unique PostgreSQL database or schema and Redis key prefix required by its registered projects. Migrated-state projects invoke the [accepted ADR-0015 migration interface](./0015-use-a-build-first-migration-lifecycle-with-exact-catalog-byte-lock-identity.md) rather than defining another one. The wrapper checks only the registered prerequisites, runs the selected Node-environment projects inside their namespaces, and performs idempotent run-scoped cleanup in a `finally` boundary. Cleanup must never use Redis `FLUSHDB`, remove another run's data, or hide the primary failure. Independent runs must be safe concurrently; one run remains serial unless finer-grained isolation is proved.

Automated import and upstream-adapter tests use deterministic version-controlled or task-local injected Rick and Morty payloads, including IDs 1 through 15 where applicable, validated through the production input boundary. Tests inject upstream access and fail closed on an unexpected live public Rick and Morty request. Automated network access is limited to documented loopback services owned by the test scope. Production behavior must not branch on a test environment.

Playwright Test remains one separate real-browser project using Chromium only, one worker, bounded startup and assertion timeouts, non-interactive reporting, named server output where available, screenshots and traces retained on test failure, and a dedicated output directory. It remains the browser assertion and artifact owner; it no longer owns the application servers through `webServer`.

Root `test:smoke` invokes one strict-TypeScript orchestrator through the existing `tsx`. For every run the orchestrator:

1. allocates or validates the exact run identity and all PostgreSQL, Redis, API, and browser-build variables;
2. performs fresh web and API builds, including the configured browser GraphQL endpoint;
3. invokes the task-owned exact fixture setup through an awaited Node child;
4. starts the built web and API entrypoints as direct, non-shell, non-detached Node children, or the explicitly registered never-ready fixture for lifecycle validation;
5. waits within a bounded deadline for the documented web URL and API `/healthz` URL;
6. invokes the Playwright CLI directly for the unchanged single Chromium project;
7. stops only its direct application children in reverse order; and
8. invokes exact fixture cleanup in all normal failure and success paths.

The application launchers must remain direct leaf children for the current normal-shutdown proof. Cross-platform equivalence means the same observable outcomes, not identical signals: Windows direct-child termination is abrupt and must not be described as graceful SIGTERM/SIGINT handling; supported POSIX execution may use its native process semantics. The orchestrator assigns a natural exit status rather than calling `process.exit()`.

The first setup, readiness, Playwright, or process failure remains primary. Every server-shutdown and exact-data-cleanup step is still attempted; cleanup failures are reported separately and force a nonzero result. The normal orchestrator must not scan for unrelated processes, attach to an existing server, reuse an occupied port, kill by image name, or clean data outside the exact run identity.

Forced cancellation or interruption can terminate the orchestrator before its `finally` work. The outer lifecycle verifier is therefore the recovery controller, not a second normal lifecycle owner. It records the smoke process and run identity, terminates only that exact owned process tree using the supported platform mechanism, independently invokes idempotent cleanup for the exact PostgreSQL schema and Redis prefix, and verifies both owned ports are reusable. A cleanup failure preserves the original failure and remains separately visible.

Test scopes activate incrementally with the canonical task graph. A task registers a project or behavior only when it creates the first executable test and every controlling gate is resolved. An inactive future scope is neither skipped nor reported as passing. Once a scope is registered as required, a missing or empty project is a failure. Broad browser end-to-end coverage remains outside this decision; later tasks may extend only the existing smoke's approved assertions and fixtures unless a successor decision changes scope.

The command contract remains:

| Interface | Runner and environment | Prerequisites and scope |
|---|---|---|
| Workspace and root `test:unit` | Registered Vitest Node/jsdom unit projects | No external infrastructure; package-focused Red feedback remains available |
| Root `test:integration` | Registered Vitest Node projects under exact lifecycle isolation | Only each project's declared PostgreSQL, Redis, migration, or import boundary |
| Root `test:application` | Registered Vitest Node/jsdom application projects | In-process public composition; real stores remain integration scope |
| Root `test:smoke` | Repository TypeScript orchestrator invoking the one-worker Chromium Playwright project | Chromium, fresh builds, free owned ports, and only the exact registered external state |
| Root `test` | Unit, integration, application, and smoke in canonical order | Union of active prerequisites; every registered scope must run and propagate failure |
| Root `typecheck` | TypeScript compiler with no emit | Independent strict checking for all implemented source and test configurations |

All authoritative commands are explicit single runs. They return nonzero for setup, readiness, missing/empty required project, assertion, process, artifact, or cleanup failure. Watch mode is a package-local aid and is not evidence. At each milestone, root `test` runs all currently registered required scopes in canonical order; future scopes are not silently skipped.

The `.feature` files remain specification and traceability documents, not executable Cucumber features. Ordinary tests reference applicable requirements, ADRs, public contracts, SPEC, HS, or confirmed regression IDs through names, rationale, or owned mappings. This decision does not adopt Cucumber, Storybook test status, broad browser end-to-end coverage, a numeric coverage gate, or a continuous-integration provider.

## Consequences

### Positive

- One ESM-first non-browser runner remains shared across the workspace.
- Named Node and jsdom projects preserve fast focused feedback and explicit evidence limits.
- Strict compilation, simulated DOM behavior, native application startup, real infrastructure, and real browser behavior remain separate evidence boundaries.
- One direct-child smoke owner makes setup, readiness, process failure, data cleanup, and recovery explicit and testable.
- PostgreSQL schema and Redis-prefix isolation support deterministic and concurrent runs without broad cleanup.
- Playwright remains limited to the single boundary requiring Chromium and retains its reporting artifacts.
- The next two planned browser feature tasks can extend the existing smoke without adding process owners or a second suite.

### Negative

- The repository owns more TypeScript lifecycle code and readiness logic than the Playwright `webServer` baseline.
- The smoke performs fresh application builds before each run.
- Normal shutdown and forced recovery need distinct owners and platform-aware behavior.
- The complete root test still requires external infrastructure and a browser and is slower than focused feedback.
- The current task-local fixture uses a deliberately narrow runtime module-loading boundary for existing API migration/import seams; signature drift can fail at smoke runtime even when tools typecheck passes.
- Clean or hosted non-Windows portability is not yet proved.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Vitest's module runner accepts behavior native Node rejects | Keep strict typecheck, production build/start, and Playwright process evidence independent. |
| jsdom diverges from Chromium | Restrict jsdom claims and use the one real-browser boundary for browser behavior. |
| Integration runs collide or remove shared data | Use exact run IDs, schemas, and Redis prefixes; prohibit cross-run deletion and `FLUSHDB`. |
| Setup or teardown is interrupted | Keep fixture cleanup idempotent and expose the exact run identity to the external recovery controller. |
| Cleanup hides the original failure | Preserve the primary failure, separately aggregate cleanup failures, and return nonzero for either. |
| An already-ready unowned service satisfies readiness | Preserve the occupied-port/no-attachment rule and add decisive coverage before TASK-010 Milestone 2 acceptance. |
| A direct application launcher later spawns descendants | Treat that as invalidating current cleanup evidence; add explicit tree ownership or supersede this process contract before relying on it. |
| Hosted or POSIX process behavior differs from local Windows | Require clean-checkout or hosted execution of the same lifecycle contract at the first milestone changing this boundary. |
| Tests reach the live public API | Use deterministic injected fixtures and fail-closed request interception. |
| Browser installation or custom orchestration becomes disproportionate | Keep one Chromium project and measure extension cost; invoke reversal triggers before adding variants. |
| Supported Node, Vitest, and Playwright versions cease to overlap | Select one common supported target or supersede this decision before an incompatible upgrade. |

Reconsider Playwright `webServer` ownership only when a supported Playwright version and configuration pass the unchanged lifecycle contract on Windows and a clean or hosted platform without manual interruption. Reconsider or supersede this decision if Vitest produces reproducible API false positives caused by module-runner divergence, required React behavior exceeds jsdom, project configuration becomes more complex than a split runner, or measured native-loader fidelity demonstrates a material benefit from the built-in Node.js test runner. Reconsider the repository orchestrator if hosted execution fails, direct launchers gain unmanaged descendants, exact external cleanup becomes unreliable, two subsequent browser features require additional process owners or lifecycle variants, or recurring runner/test/documentation/operator burden becomes disproportionate. A generic supervisor, new dependency, second browser suite, or broader cleanup requires separate project-owner approval and an accepted successor.

## Validation

Decision evidence already observed on the TASK-010 working tree:

- three Playwright-owned missing-CSP runs performed exact data cleanup but required manual interruption, satisfying ADR-0011's reversal trigger;
- the repository-orchestrated missing-CSP Red exited naturally with code 1 and exact cleanup;
- the corresponding Green exited naturally with one Chromium pass, 15 isolated records, no public request, exact cleanup, and reusable ports;
- strict tools, API, and web typechecks passed;
- the permission-qualified local Windows lifecycle verifier passed normal completion, startup conflict, assertion failure, readiness timeout, forced cancellation, and forced interruption with exact cleanup.

Required downstream proof before TASK-010 Milestone 2 acceptance:

- a ready but unowned listener cannot be accepted as an owned application server;
- the exact smoke and six-case lifecycle pass in a disposable clean checkout or supported hosted platform against the same relevant tree;
- every run records environment and external-service identities, preserves primary and cleanup diagnostics, removes only its exact schema and Redis prefix, and releases both ports;
- automated network guards observe no live public Rick and Morty JSON or avatar request;
- frozen smoke assertions, one project, one worker, failure artifacts, and dependency graph remain unchanged.

Portfolio validation requires the ADR validator, documentation validator, current/historical link readback, whole-record carry-forward audit, and `git diff --check`. Acceptance of this ADR is architecture direction, not implementation, hosted-platform, acceptance-criterion, or task-completion evidence.

## Evaluation

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 19 | 20 | Preserves strict TypeScript and adopted testing commitments plus validation support without changing source classification. |
| Architectural fit and consistency | 19 | 20 | Carries forward Vitest/jsdom/external-isolation boundaries and resolves the exact process-ownership contradiction through a successor. |
| Options and trade-offs | 15 | 15 | Retains the runner and DOM comparisons and compares three symmetric smoke-ownership alternatives with hard-gate evidence. |
| Feasibility and proportionality | 14 | 15 | Reuses every dependency and one suite; custom orchestration is bounded but remains recurring code and build cost. |
| Quality attributes | 9 | 10 | Improves determinism, diagnostics, exact recovery, and Windows reliability while retaining explicit portability risk. |
| Verifiability | 8 | 10 | Local Red, Green, and six-case lifecycle are measurable; ready-unowned and clean/hosted proof remain open downstream. |
| Evolution and reversibility | 8 | 10 | Direct ownership is removable and has explicit triggers, although process-specific fixture/runner code carries migration cost. |
| **Total** | **92** | **100** | |

**Recommendation:** Accept. The project owner approved the exact bounded repository-owned orchestrator on 2026-08-20 after the ADR-0011 reversal trigger occurred. R3 research, mandatory analysis, and fresh pre-draft critical review returned `DRAFT READY` and `PASS`. Acceptance keeps DG-001 `Resolved` and TASK-010 `In progress`; it does not waive the downstream clean/hosted evidence gate.

## References

- [Requirements specification](../REQUIREMENTS.md)
- [ADR index](./README.md)
- [ADR-0001: Modular monolith workspace](./superseded/0001-use-a-modular-monolith-workspace.md)
- [ADR-0002: TypeScript across the stack](./0002-use-typescript-across-the-stack.md)
- [ADR-0010: Targeted automated testing strategy](./superseded/0010-use-a-targeted-automated-testing-strategy.md)
- [ADR-0011: Superseded TypeScript test harness](./superseded/0011-define-the-typescript-test-harness.md)
- [ADR-0014: Direct character image URLs](./0014-persist-and-deliver-character-image-urls-directly.md)
- [ADR-0015: Build-first migration lifecycle](./0015-use-a-build-first-migration-lifecycle-with-exact-catalog-byte-lock-identity.md)
- [ADR-0016: Milestone-slice TDD](./0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md)
- [Implementation plan](../IMPLEMENTATION_PLAN.md)
- [TASK-010 ExecPlan and DRC-T010-01](../plans/completed/TASK-010-character-list-sorting-and-interface-filters.md)
- [Decision and progress log](../execution/decision-and-progress-log.md)
- [Gherkin specification index](../specs/README.md)
- [Playwright web-server configuration](https://playwright.dev/docs/test-webserver)
- [Node.js child processes](https://nodejs.org/docs/latest-v24.x/api/child_process.html)
- [PostgreSQL `DROP SCHEMA`](https://www.postgresql.org/docs/current/sql-dropschema.html)
- [Redis `SCAN`](https://redis.io/docs/latest/commands/scan/)
- [Redis `UNLINK`](https://redis.io/docs/latest/commands/unlink/)
