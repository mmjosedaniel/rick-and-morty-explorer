# ADR-0011: Define the TypeScript Test Harness

- Status: Superseded
- Date: 2026-08-10
- Approval date: 2026-08-10
- Decision owners: Project owner and project maintainers
- Related requirements: NFR-004, OR-001, OR-004, OR-007, AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008, AC-009, AC-010, AC-011, AC-012
- Related decisions: ADR-0001, ADR-0002, ADR-0010, ADR-0018
- Controlled gate: DG-001; resolved by this accepted decision
- Supersedes: None
- Superseded by: ADR-0018

> Lifecycle notice: ADR-0018 superseded this whole record on 2026-08-20 after ADR-0011's recorded Windows process-cleanup reversal trigger occurred during TASK-010. The project owner explicitly approved the bounded repository-owned smoke orchestrator, R3 research and pre-draft review passed, and ADR-0018 carries forward every unaffected test-harness rule while replacing only smoke-server process ownership. This body remains preserved as historical evidence.

## Context

The repository has adopted strict TypeScript and frontend and backend automated tests as repository commitments even though OR-001, OR-004, and OR-007 remain optional in the source assessment. ADR-0010 requires Red-Green-Refactor, fast unit and component feedback, real GraphQL, PostgreSQL, Redis, and migration integration coverage, deterministic external-data fixtures, and a plan-completion test-relevance audit. ADR-0001 requires transparent workspace and root command boundaries, external PostgreSQL and Redis processes, and per-run database or schema and Redis-prefix isolation.

No application manifest, test dependency, runner configuration, executable test, browser binary, application source, or implemented test command exists yet. DG-001 blocked those artifacts until an owner-approved decision defined the runner portfolio, React Document Object Model (DOM) environment, workspace configuration ownership, command scopes, integration lifecycle boundary, and one narrow real-browser smoke. This accepted ADR resolves that selection only. Its interfaces remain planned contracts for TASK-003 and later tasks, not implementation evidence.

The decision must preserve native-runtime honesty. A test transform does not replace strict `tsc --noEmit`, and a runner's ESM support does not prove that the production Node.js process builds or starts correctly. The unresolved DG-002 decision continues to own the Sequelize migration runner, source-versus-built artifact form, rollback behavior, and migration concurrency semantics.

Current official documentation supports three credible strategies. Vitest is ESM-first and provides distinct named projects and Node, jsdom, and happy-dom environments, but its default Vite module runner is not identical to native Node.js execution. Jest can support ESM through an ESM-emitting transformer, but its ESM path and Node.js VM-module dependency remain experimental. The built-in Node.js test runner offers native loader fidelity, but direct TypeScript execution supports only erasable syntax, ignores `tsconfig.json`, and would still require Vitest for React tests.

## Decision drivers

- Preserve strict TypeScript as an independent no-emit compiler boundary for application and test source.
- Use ECMAScript modules without silently compiling production code to CommonJS.
- Provide one named React DOM environment with explicit fidelity limitations.
- Keep backend and shared unit tests in a Node environment.
- Exercise GraphQL, PostgreSQL, Redis, migrations, and import behavior at real boundaries with deterministic run isolation.
- Delegate migration execution semantics to DG-002 while still defining how integration setup invokes the future accepted interface.
- Support fast package-level Red feedback and one deterministic root full-suite boundary.
- Start and observe the TASK-003 web and API processes through one narrow Chromium smoke without adopting broad end-to-end scope.
- Bound startup, assertion, timeout, cancellation, cleanup, and failure-artifact behavior on Windows and continuous integration.
- Prevent automated tests from calling the live public Rick and Morty API.
- Keep configuration, assertions, mocks, lifecycle hooks, and contributor knowledge proportional to the assessment.
- Preserve ordinary-test traceability to requirements, ADRs, contracts, SPEC, HS, and confirmed regression IDs without adding executable Gherkin bindings.
- Keep the decision reversible if runtime fidelity, compatibility, or process cleanup fails in implementation.

## Considered options

### Runner strategies

| Option | Benefits | Costs and risks | Outcome |
|---|---|---|---|
| Vitest projects for web, API, shared, application, and integration tests; jsdom for React; Playwright Test for the Chromium smoke | One ESM-first non-browser runner, assertion and mocking model; named Node and jsdom projects; fast targeting; direct Vite/React alignment; real infrastructure remains available through explicit lifecycle setup | The Vite module runner differs from native Node.js; project inheritance must be explicit; Playwright adds a browser binary | Selected |
| Jest projects for web, API, shared, application, and integration tests; jsdom for React; Playwright Test for the Chromium smoke | One mature non-browser assertion, mocking, lifecycle, and reporting model; named monorepo projects | ESM still requires the experimental VM-modules path and an ESM-emitting transform; `ts-jest`, Jest, TypeScript, Node.js, and jsdom compatibility must be maintained; future Vite settings may be duplicated | Rejected |
| Built-in Node.js test runner for API, shared, application, and infrastructure tests; Vitest for React; Playwright Test for the Chromium smoke | Native server loader and process-per-file isolation; no server-side transform when source stays within supported TypeScript syntax | Vitest remains necessary, so the repository gains a second non-browser dialect without removing a runner; native TypeScript constrains syntax, imports, aliases, setup, and mocking | Rejected |

### React DOM environments

| Option | Benefits | Costs and risks | Outcome |
|---|---|---|---|
| jsdom | Standards-oriented DOM subset, direct Vitest support, broad React Testing Library use, and explicitly documented missing layout and navigation behavior | Does not render layout or implement full navigation and browser APIs; can diverge from Chromium | Selected |
| happy-dom | Fast Node-hosted DOM simulation with React support | Official Vitest guidance notes missing APIs; the repository has no measured need that justifies choosing speed over compatibility clarity | Rejected initially; reconsider only with a concrete failing need and evidence |
| Real browser for all React tests | Highest browser fidelity | Slower Red feedback, more process and binary cost, and disproportionate breadth for component behavior | Rejected; real browser scope remains the narrow smoke and later targeted browser checks |

## Decision

The repository will use the stable Vitest line available when TASK-003 implements the harness, using the current `projects` model rather than the deprecated workspace configuration. Vitest will run all non-browser unit, component, application, GraphQL, PostgreSQL, Redis, migration, and import tests. Project configurations will use the `node` environment explicitly for API, shared, and infrastructure tests and `jsdom` explicitly for React component and routed-application tests.

The web workspace owns its jsdom setup, React Testing Library setup, DOM matchers, and web-specific deterministic fixtures. API and shared workspaces own their Node-environment include patterns and package-local setup. A root Vitest registry owns unique project names, deterministic common defaults, selection, and reporting. Shared settings must be merged or extended explicitly because root settings are not assumed to become project settings automatically. Runner transformation never satisfies strict type checking; the root `typecheck` interface separately delegates strict `tsc --noEmit` to every implemented application and test configuration.

jsdom is the selected React DOM. Tests may use it for semantic rendering, accessibility queries, loading and error states, form and interaction behavior, and routed composition that does not require browser layout. Tests must not use jsdom output as evidence of CSS layout, responsive rendering, navigation, image loading, or full browser API behavior. Those claims require the Chromium smoke or a later targeted browser check.

PostgreSQL and Redis remain external processes owned by local infrastructure or continuous integration, not embedded runner services. Each integration project will register its exact prerequisites with a root lifecycle wrapper. The wrapper will allocate one sanitized run ID and, only as required by the registered project, one unique PostgreSQL database or schema, one unique Redis key prefix, or both. A migrated-state project may be registered only after DG-002 is resolved and will invoke the interface selected by that accepted decision; no migration command, runner, or placeholder is required or invented before then. The wrapper will check the registered prerequisites, run the selected Node-environment projects within their namespaces, and perform idempotent run-scoped cleanup in a `finally` boundary. Cleanup must never use Redis `FLUSHDB`, must not remove another run's database objects or keys, and must preserve the primary failure while separately reporting cleanup failure. Separate integration runs must be safe to execute concurrently; execution within one run remains serial until tests demonstrate that finer-grained parallelism is isolated.

Automated import and upstream-adapter tests will use version-controlled Rick and Morty payload fixtures, including the required IDs 1 through 15 where applicable, validated through the same runtime schema as production input. Tests will inject the upstream adapter and fail closed on an unexpected request to the live public Rick and Morty API. Automated network access is limited to documented loopback services owned by the test scope. Production behavior must not branch on a test environment.

Playwright Test will own one separate real-browser project using Chromium only and one worker for the TASK-003 smoke. The authoritative smoke will set `reuseExistingServer` to false, start the web and API through two foreground, non-detaching `webServer` entries, wait for the documented web URL and API `/healthz` URL, render the visible React shell in Chromium, and verify the exact API liveness response. The React application will not call `/healthz`, and the smoke will not require GraphQL, domain data, PostgreSQL readiness, Redis readiness, or the public Rick and Morty API. TASK-010, not TASK-003, owns the later browser-to-GraphQL-to-PostgreSQL product smoke.

The Playwright boundary will use bounded startup and assertion timeouts, visible named server logs, non-interactive reporting, screenshots and traces retained on test failure, and a dedicated output directory. Startup failure occurs before a browser trace exists, so server output remains required evidence. Occupied ports fail the authoritative run rather than attaching to an unowned process. Playwright owns process-group cleanup, but the implementation must not claim graceful SIGTERM or SIGINT behavior on Windows because Playwright documents that those configured signals are ignored there. TASK-003 must verify normal completion, startup failure, assertion failure, timeout, cancellation, and interruption release both owned ports on Windows and continuous integration.

Test scopes activate incrementally with the canonical task graph. A task registers a scope or project in root configuration only when that task creates the first executable test for it and every controlling gate is resolved. An inactive future scope is neither skipped nor reported as passing; it is not yet part of the executable registry. Once registered as required, a missing or empty project is a failure. TASK-003 activates the unit, non-browser application, and smoke scopes for the web shell and API liveness behavior, but it does not create or invoke `test:integration`. TASK-004 activates the first integration scope only after TASK-002 has resolved DG-002, and TASK-005 through TASK-008 add their registered import, GraphQL, PostgreSQL, and Redis projects as their dependencies permit.

The planned command contract is:

| Interface | Intended caller and runner | Test kinds and environment | Prerequisites | Real browser | Activation and root `test` behavior |
|---|---|---|---|---|---|
| Workspace `test:unit` | Contributor; package-owned Vitest project | Web component/unit in jsdom; API/shared unit in Node | None | No | Added by the task that creates the workspace's first unit behavior; every registered unit project is included |
| Root `test:unit` | Contributor or automation; root Vitest project selection | All registered unit projects only | None | No | Activated by TASK-003 and expanded by later task-owned projects |
| Root `test:integration` | Contributor or automation; lifecycle wrapper plus registered Vitest Node projects | Registered GraphQL, PostgreSQL, Redis, migration, and import boundaries | Exact per-project external services and run namespace; migrated state only after DG-002 supplies its interface | No | Activated first by TASK-004, then expanded by TASK-005 through TASK-008 |
| Root `test:application` | Contributor or automation; registered Vitest application projects | Routed React composition in jsdom and Express public HTTP/application composition in Node; any scope needing real stores is integration instead | Runnable in-process composition and deterministic fixtures | No | Activated by TASK-003 and expanded by later public-boundary tasks |
| Root `test:smoke` | Contributor or automation; Playwright Test | Visible shell and exact `/healthz` liveness through two owned processes | Chromium binary, built or runnable web/API commands, free owned ports | Yes, Chromium only | Activated by TASK-003; later browser behavior remains limited to task-approved extensions |
| Root `test` | Automation and complete local verification | Registered scopes in canonical order: unit, integration, application, smoke | Union of currently registered project prerequisites | Registered smoke only | Activated by TASK-003; authoritative for all scopes registered at the current milestone and complete across all four scope types after their owning tasks activate them |
| Root `typecheck` | Contributor or automation; TypeScript compiler | Strict application and test source checking with no emit | Implemented TypeScript configurations | No | Separate; a future `verify` interface may compose it |

All non-watch commands will be explicit single runs and return nonzero for setup failure, a missing or empty registered required project, assertion failure, process failure, artifact failure, or cleanup failure. Watch mode is a package-local development aid and is not authoritative evidence. At every milestone, root `test` will execute all currently registered required scopes in canonical order and propagate every failure. Future scopes are not silently skipped; their owning tasks must register them before claiming those behaviors or completing their definitions of done.

The `.feature` files remain specification and traceability documents rather than executable Cucumber features. Ordinary tests will reference the applicable requirement, ADR, public contract, `SPEC-*`, `HS-*`, or confirmed regression ID through a clear test name, nearby rationale, or an owned traceability mapping. TASK-001 does not adopt Cucumber, Storybook testing, broad browser end-to-end coverage, a numeric coverage gate, or a continuous-integration provider.

## Consequences

### Positive

- One ESM-first non-browser runner and assertion/mocking model serves every workspace and real infrastructure boundary.
- Named projects preserve explicit Node and jsdom environments while supporting fast package-level Red feedback.
- Strict compiler validation, simulated DOM behavior, native application startup, and real browser behavior remain separate evidence boundaries.
- PostgreSQL and Redis isolation is explicit and compatible with concurrent runs.
- Playwright cost is limited to the one boundary that requires a real browser and two owned processes.
- Ordinary TypeScript tests remain directly traceable and easier to migrate than executable feature bindings.

### Negative

- Vitest's default module runner does not prove production-native Node.js behavior.
- jsdom cannot validate layout, responsive rendering, navigation, images, or complete browser APIs.
- Playwright adds a version-coupled Chromium binary for one smoke.
- Root and project configuration must be merged deliberately to avoid hidden drift.
- The complete root test requires infrastructure and a browser and is slower than package unit feedback.
- Run-scoped database, Redis, process, artifact, and stale-state cleanup requires explicit lifecycle code.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Vitest's module runner accepts behavior that the production Node.js process rejects | Keep strict type checking, production build, production start, and Playwright process checks independent; never treat a Vitest pass as native-runtime proof. |
| jsdom diverges from Chromium | Restrict jsdom claims to semantic DOM behavior and use Chromium or later targeted browser checks for layout, navigation, and browser APIs. |
| Root settings or project files drift | Use unique project names, non-overlapping includes, and explicit shared-setting merge or extension; validate project selection in TASK-003. |
| Integration runs collide or remove shared data | Use a unique run ID, database or schema, and Redis prefix; prohibit cross-schema dependencies and broad cache deletion; verify two concurrent runs. |
| Setup or teardown is interrupted | Use idempotent scoped cleanup, discoverable stale run IDs, and ephemeral continuous-integration infrastructure where available. |
| A cleanup failure hides the original failure | Preserve the primary failure and report cleanup failure separately while returning nonzero. |
| Web or API descendants survive on Windows or continuous integration | Use foreground non-detaching commands, do not reuse existing servers, bound every phase, and test port release after each success and failure path. |
| Tests reach the live public API | Use version-controlled adapter fixtures, runtime-schema validation, injected transport, and a fail-closed host or network guard. |
| Browser installation becomes disproportionate | Install Chromium only and keep broad end-to-end coverage deferred. |
| Supported Node.js versions cease to overlap | TASK-003 selects and verifies one common supported target; supersede this decision before an incompatible upgrade. |

Reversal is required when no supported Node.js version overlaps stable Vitest and Playwright, Vitest produces reproducible API false positives caused by module-runner divergence, required React behavior exceeds jsdom, Windows or continuous-integration process trees cannot be cleaned reliably, project configuration becomes more complex than a split runner, or measured native-loader fidelity demonstrates a material benefit from the built-in Node.js test runner.

## Validation

- Before approval, the ADR and documentation validators pass and the TASK-001 diff contains no manifest, dependency, lockfile, runner configuration, executable test, browser binary, or application source.
- TASK-003 implements strict root `typecheck` independently from every test transform and proves the chosen production Node.js build/start boundary.
- TASK-003 registers and runs its unit, application, and smoke projects through root `test` without creating `test:integration`, invoking a migration interface, or adding artifacts controlled by DG-002.
- TASK-004 activates the first integration project only after TASK-002 resolves DG-002; each later task registers its required integration project and exact PostgreSQL, Redis, or migrated-state prerequisites before claiming the corresponding behavior.
- Every Vitest project has a unique name, an explicit Node or jsdom environment, non-overlapping ownership, and deterministic single-run selection.
- A package-local unit command can reproduce one focused Red failure without PostgreSQL, Redis, application processes, or a browser.
- Two integration runs use disjoint PostgreSQL and Redis state, and teardown removes only state owned by each run.
- Each migrated-state integration project invokes but does not define the accepted DG-002 migration interface; other integration projects declare only their own required external boundaries.
- No automated test reaches the live public Rick and Morty API, and deterministic fixtures pass the production runtime validator.
- The Chromium smoke owns two foreground server processes, asserts only the visible shell and exact `/healthz` response, and requires no domain data.
- Normal completion, startup failure, assertion failure, timeout, cancellation, and interruption retain the available diagnostics, return the correct nonzero status, and release both owned ports on Windows and continuous integration.
- At each milestone, root `test` runs every registered required scope in canonical order, fails when a registered project is missing or empty, and does not report inactive future scopes as skipped or passing; after all owning tasks activate their projects, it runs unit, integration, application, and smoke and propagates setup, test, process, artifact, and cleanup failures.
- Tests remain traceable to current requirements, ADRs, public contracts, SPEC, HS, or confirmed regression IDs, and the completion audit finds no skipped, focused, weakened, or residual test scaffolding.
- Broad browser end-to-end coverage, executable Gherkin bindings, Storybook test status, numeric coverage gates, and continuous-integration provider selection remain absent unless a later accepted decision changes scope.

## Evaluation

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 19 | 20 | Defines executable support for adopted TypeScript and testing commitments and validation support for all acceptance criteria without reclassifying source scope. |
| Architectural fit and consistency | 19 | 20 | Preserves the modular workspace, strict ESM TypeScript, external infrastructure, TDD, and pending migration boundary. |
| Options and trade-offs | 15 | 15 | Compares three complete runner portfolios and three credible DOM shapes with explicit rejection reasons. |
| Feasibility and proportionality | 14 | 15 | Uses one non-browser runner plus one narrowly scoped browser runner; infrastructure lifecycle and browser installation remain real costs. |
| Quality attributes | 9 | 10 | Improves feedback speed, isolation, determinism, maintainability, and failure diagnostics while retaining known simulation limits. |
| Verifiability | 8 | 10 | Defines measurable commands, isolation, network, smoke, failure, and cleanup outcomes; Windows process cleanup remains unproven until TASK-003. |
| Evolution and reversibility | 8 | 10 | Ordinary TypeScript tests and separate projects are replaceable, with explicit triggers, though runner-specific mocks and setup would carry migration cost. |
| **Total** | **92** | **100** | |

**Recommendation:** Accept. The project owner approved this decision on 2026-08-10. Acceptance resolves DG-001 but is not evidence that the harness exists.

## References

- [Requirements specification](../../REQUIREMENTS.md)
- [ADR index](../README.md)
- [ADR-0001: Modular monolith workspace](./0001-use-a-modular-monolith-workspace.md)
- [ADR-0002: TypeScript across the stack](../0002-use-typescript-across-the-stack.md)
- [ADR-0010: Targeted automated testing strategy](./0010-use-a-targeted-automated-testing-strategy.md)
- [ADR-0018: Whole-record TypeScript test-harness successor](../0018-define-the-typescript-test-harness-with-repository-owned-smoke-orchestration.md)
- [Implementation plan](../../IMPLEMENTATION_PLAN.md)
- [Gherkin specification index](../../specs/README.md)
- [Completed TASK-001 ExecPlan](../../plans/completed/TASK-001-test-harness-decision.md)
- [Vitest features](https://vitest.dev/guide/features.html)
- [Vitest releases](https://main.vitest.dev/releases)
- [Vitest projects](https://vitest.dev/guide/projects.html)
- [Vitest environments](https://vitest.dev/guide/environment.html)
- [Vitest global setup](https://vitest.dev/config/globalsetup.html)
- [Vitest file parallelism](https://vitest.dev/config/fileparallelism.html)
- [Vitest 4.1 module-runner behavior](https://vitest.dev/blog/vitest-4-1.html#experimental-vitemodulerunner-false)
- [Vite TypeScript support](https://vite.dev/guide/features.html#typescript)
- [Jest ECMAScript modules](https://jestjs.io/docs/ecmascript-modules)
- [Node.js VM modules](https://nodejs.org/api/vm.html#class-vmmodule)
- [Node.js TypeScript support](https://nodejs.org/api/typescript.html)
- [jsdom project documentation](https://github.com/jsdom/jsdom#readme)
- [Happy DOM project documentation](https://github.com/capricorn86/happy-dom)
- [Playwright web-server configuration](https://playwright.dev/docs/test-webserver)
- [Playwright test configuration](https://playwright.dev/docs/test-configuration)
- [Playwright TypeScript](https://playwright.dev/docs/test-typescript)
- [Playwright browser installation](https://playwright.dev/docs/browsers)
- [PostgreSQL CREATE SCHEMA](https://www.postgresql.org/docs/current/sql-createschema.html)
- [PostgreSQL DROP SCHEMA](https://www.postgresql.org/docs/current/sql-dropschema.html)
- [Redis SCAN](https://redis.io/docs/latest/commands/scan/)
- [Redis UNLINK](https://redis.io/docs/latest/commands/unlink/)
- [Cucumber step definitions](https://cucumber.io/docs/cucumber/step-definitions/)
