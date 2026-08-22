# Rick and Morty Full Stack Assessment

> **Project scope note:** This repository is a portfolio implementation of a [full-stack developer assessment](./docs/FULL_STACK_TECHNICAL_ASSESSMENT.md) found online. Its purpose is to demonstrate the requested full-stack boundaries with a faithful, practical implementation rather than to reproduce the complete public Rick and Morty catalog. Runtime on-demand ingestion was considered as a possible extension, but it was deliberately not adopted: the assessment requires [initializing the relational database with 15 characters](./docs/REQUIREMENTS.md#fr-be-004---initial-data), so this project imports a deterministic first-15 baseline and serves ordinary searches through its own GraphQL, PostgreSQL, and Redis boundaries. On-demand ingestion and full-catalog pagination remain possible future enhancements, not required or implemented behavior.

## Repository status

This repository has completed TASK-003 through TASK-013 after establishing the requirements and architecture foundation. TASK-014 is reopened as `In progress` under corrective workflow `TASK-014-20260822-02` after a post-closure independent review found its public guide incomplete and the accepted ADR-0006 development explorer unwired. It contains the assessment contract; accepted architecture decisions including [ADR-0018](./docs/adrs/0018-define-the-typescript-test-harness-with-repository-owned-smoke-orchestration.md), [ADR-0014](./docs/adrs/0014-persist-and-deliver-character-image-urls-directly.md), [ADR-0015](./docs/adrs/0015-use-a-build-first-migration-lifecycle-with-exact-catalog-byte-lock-identity.md), and [ADR-0016](./docs/adrs/0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md); the implemented application; a migration-derived [ERD](./docs/ERD.md); derived specifications; execution records; and repository workflow guidance. Superseded ADRs remain preserved as historical evidence, all decision gates are resolved, and [AUTH-001](./docs/IMPLEMENTATION_PLAN.md#auth-001---character-image-content-rights-authorization) remains `Authorized` only for this personal, educational, non-commercial portfolio under ADR-0014's exact direct-URL boundary and ordinary browser/intermediary caching.

TASK-003 through TASK-013 are `Complete`. TASK-007's canonical/versioned finite-lived Redis search caching, bounded fail-open operations, Redis list-cache-demand-lazy connection, and scoped post-import SCAN/UNLINK invalidation are implemented. PostgreSQL initializes on the first list, detail, or comment read or the first favorite/comment mutation; mutation-first initialization does not connect to Redis. Completed TASK-010 adds the typed React list route, exact cards, stable A-Z/Z-A sorting, URL-owned status/species/gender filters, browser states, and the first browser-to-GraphQL-to-PostgreSQL product path. Completed TASK-008 adds the exact backend favorite/comment mutations, validation, PostgreSQL persistence, and TASK-006 detail-query readback. Completed TASK-011 adds addressable detail, exact governed imagery, ID-only favorite updates, validated plain-text comments, exact target-detail refetching, truthful failure states, and real reload persistence. Completed TASK-012 adds the layout-safe accessible image fallback and proves the complete list/detail state and square-geometry matrix at 375, 768, and 1280 CSS pixels. Completed TASK-013 adds the exact-pinned typed lint command and CI step and closes the code/test relevance audit. TASK-014 is `In progress`; its prior public source and ERD evidence remain valid while DEL-003 and AC-012 await the corrected guide and development explorer. Minimum-assessment readiness is 11/12. TASK-015 remains `Pending` for the separate repository-baseline review.

An accepted ADR records approved implementation direction only. Requirements, ADRs, plans, examples, mocks, and stubs must not be treated as implementation or acceptance evidence.

TASK-009 is `Complete` after exact project-owner approval, DG-003 resolution, and its documentation gate; its [completed ExecPlan](./docs/plans/completed/TASK-009-frontend-graphql-client-decision.md) preserves the decision chronology. [Accepted ADR-0017](./docs/adrs/0017-use-tanstack-query-with-a-project-owned-typed-graphql-executor.md) selects TanStack Query with a project-owned typed GraphQL executor. TASK-008, TASK-010, TASK-011, and TASK-012 are also `Complete`. The current [TASK-012 documentation re-review](./docs/reviews/2026-08-22-task-012-documentation-re-review.md) records `PASS` after resolving two post-commit currentness findings; its predecessor [acceptance review](./docs/reviews/2026-08-22-task-012-acceptance-review.md) preserves the product/runtime assessment on unchanged candidate `D4E87CBED378F8C60A97714F46194D68E1515BB999968D00C49CE903A3FE3983`. Local Git history records TASK-012 merged into `main` through PR #21 at merge commit `7a3cab06257931424968d818cff7506c9b819a44`, including source-branch tip `e42835dd456b5fdb77221b53873e5ef04cd643ae` and implementation commit `312d462318e5d1be5ddcab41a4d3f3788806908d`.

TASK-014's historical workflow `TASK-014-20260822-01` published exact commit `62aa3fa7c794e17a52218c0b3fcb4f01e331af9c` and produced reusable clean-clone, API, ERD, quality, and cleanup evidence. The later [independent revision review](./docs/reviews/2026-08-22-task-014-independent-revision-review.md) supersedes its delivery/ADR-compatibility conclusion and activates [corrective workflow `TASK-014-20260822-02`](./docs/plans/TASK-014-delivery-correction.md). The correction is local only until separately published; no new commit, push, pull request, merge, or deployment is claimed.

## Documentation map

This README is the single documentation entry point and current-state summary for both maintainers and Codex. It routes readers to the authoritative owner of each kind of information; it does not replace those documents.

| Artifact | Authoritative for | Not authoritative for |
|---|---|---|
| [Repository guidelines](./AGENTS.md) | Codex operating policy, language, evidence rules, documentation lifecycle and preservation, KISS, YAGNI, and clean-code rules, TypeScript conventions, and TDD workflow | Product scope, architectural choices, or implementation status |
| [Technical assessment](./docs/FULL_STACK_TECHNICAL_ASSESSMENT.md) | Original assessment scope and mandatory-versus-optional classification | Repository-specific decisions or implementation evidence |
| [Requirements specification](./docs/REQUIREMENTS.md) | Normalized functional, non-functional, optional, deliverable, and acceptance IDs | Architectural choices or implementation status |
| [ADR index](./docs/adrs/README.md) and individual ADRs | Portfolio status, optional-scope disposition, architecture coverage, and accepted decision detail | Implementation or acceptance status |
| [System module diagram](./docs/SYSTEM_DIAGRAM.md) | Derived high-level target modules and principal data flows | New architecture, resolution of pending gates, implementation status, or acceptance evidence |
| [Implementation plan](./docs/IMPLEMENTATION_PLAN.md) | Stable `TASK-*` work items, canonical task and gate status, dependency graph, graph-bound readiness and authorization constraints, validation intent, and non-architectural `AUTH-*` authorization status | Agent-role or orchestration mechanics, new product scope, unapproved architectural choices, implementation or runtime evidence, or acceptance status |
| [ExecPlan convention](./PLANS.md) and [plan index](./docs/plans/README.md) | Required living-document format, active task-scoped plans, and preserved completed plans | Canonical task dependencies, architectural approval, gate status, implementation status, or acceptance evidence |
| [Gherkin specifications](./docs/specs/README.md), [SPEC](./docs/specs/SPEC.feature), and [HARD_SPEC](./docs/specs/HARD_SPEC.feature) | Derived behavioral examples, non-negotiable constraints, failure modes, and human decision guards | Source scope, architectural approval, implementation status, or passing evidence |
| [UI design documentation](./docs/ui/README.md) and [visual foundations](./docs/ui/visual-foundations.md) | Detailed specification and navigation for the UI choices recorded in the execution log, including field visibility and visual foundations | Product scope, architectural approval, decision status or rationale, implementation status, or acceptance evidence |
| [Proposed Storybook pilot workflow](./docs/ui/storybook-workflow.md) | Implementation guidance for the reversible pilot currently recorded by DPL-DEC-013; DPL-DEC-007 is preserved as Superseded history | Product scope, architectural approval, task definitions, gate resolution, implementation status, or acceptance evidence |
| [Execution records](./docs/execution/README.md) and [decision and progress log](./docs/execution/decision-and-progress-log.md) | Stable navigation, reversible decision status and rationale, and chronological evidence links | Current repository status, product scope, architecture approval, gate resolution, detailed design specification, or acceptance status |
| [Review records](./docs/reviews/README.md) | Point-in-time evidence-based assessments, readiness matrices, gaps, and verification commands | Product scope, architectural approval, or permanent current status |
| This README | Documentation routing, current repository phase, and current delivery-status summary | Requirement or architecture definition |
| Source, manifests, migrations, tests, runtime observations, and Git history | Actual implementation and verification evidence | Requirement intent or approval of architectural changes |
| Repository skills: [govern ADRs](./.agents/skills/govern-adrs/SKILL.md), [plan implementation](./.agents/skills/plan-implementation/SKILL.md), [review acceptance](./.agents/skills/review-acceptance/SKILL.md), [verify repository](./.agents/skills/verify-repository/SKILL.md), and [frontend quality](./.agents/skills/frontend-quality/SKILL.md) | Repeatable ADR, planning, acceptance, verification, and visible-frontend quality procedures, loaded progressively when the task matches | Product scope, architectural approval, or passing evidence |
| [Project-scoped Codex guide](./.codex/README.md), [research routing](./.codex/README.md#research-work), and [runtime concurrency guidance](./.codex/README.md#runtime-concurrency-capacity) | Codex discovery and trust, reusable read-only and write-capable roles, objective R0-R3 research routing, single non-authoritative drafting, standard and conditional frontend-visual implementation profiles, model policy, operator-managed concurrency interpretation, decision and implementation separation, review checkpoints, permission boundaries, and optional hook activation | Global operator settings, guaranteed runtime capacity, product scope, task ownership, architectural approval, implementation status, or acceptance evidence |
| [Worker-first ExecPlan implementation workflow](./.codex/execplan-implementation-workflow.md) | Compact `Milestone Assignment Packet v2`, preflight classification, persistent separate test and implementation contexts, coherent milestone-slice TDD, conditional frontend-visual Green routing, sequential write leases, evidence reuse, bounded recovery, and risk-routed review | Task readiness, product scope, architecture approval, or passing implementation evidence |
| [Automatic write-lease guard](./.codex/write-lease-guard.md) | Coordinator commands, immutable baseline and receipt contract, path-scope enforcement, failure recovery, and proof limitations for worker writes | Worker intent, product correctness, test validity, acceptance status, or operating-system isolation |
| [Agent-flow metrics](./.codex/agent-flow-metrics.md) | Event definitions, lifecycle instrumentation, aggregation commands, privacy boundary, and interpretation of corrections, false Reds, regressions, time, and tokens | Product quality, task readiness, implementation evidence, acceptance status, or a delivery gate |

### Codex reading hierarchy

Use this dependency chain to gather context, not as a single global precedence rule:

```text
repository policy
  -> source assessment
  -> normalized requirement IDs
  -> accepted decisions and optional disposition
  -> active gates and exact TASK ID
  -> exact SPEC/HS rules needed by that task
  -> repository/runtime evidence
  -> execution log and dated review
```

Authority remains domain-specific. For example, the assessment owns source classification, the requirements specification owns stable scope wording, an accepted ADR owns implementation direction, the implementation plan owns sequencing, and only repository/runtime evidence can prove behavior.

### Conflict rules

- Derived documents cannot weaken or silently expand mandatory assessment scope.
- Optional requirements retain their source classification; only the ADR index records their repository adoption or deferral.
- An individual accepted ADR owns decision detail, while the ADR index owns portfolio status and optional disposition.
- The implementation plan cannot introduce scope or select an option controlled by a pending decision gate.
- SPEC/HS selectors and examples cannot reclassify source scope or replace the requirement, ADR, or gate that they reference.
- Execution logs and dated reviews cannot resolve gates, approve architecture, or become a second current-status owner.
- Only repository or runtime evidence can establish that behavior exists or a criterion passes.
- If documents conflict, identify the authority domain above and reconcile the inconsistency instead of choosing silently.

## Scope interpretation

The source assessment's mandatory requirements and deliverables, together with the derived `AC-001` through `AC-012`, form the minimum-assessment baseline. Optional requirements keep their source classification. When an accepted ADR adopts one of them, it becomes an additional repository delivery commitment and is reported separately from minimum-assessment readiness.

The current adopted and deferred optional scope is authoritative in the [optional-scope disposition table](./docs/adrs/README.md#optional-scope-decisions).

## Readiness status

The current evidence-based [TASK-014 independent revision review](./docs/reviews/2026-08-22-task-014-independent-revision-review.md) records:

| View | Current result |
|---|---|
| Minimum assessment | Fail: AC-001 through AC-011 pass; DEL-003 is incomplete and AC-012 is reopened, so readiness is 11/12. |
| Repository baseline | Fail: TASK-014 correction and TASK-015 final repository-baseline review remain pending. |

[DG-003](./docs/IMPLEMENTATION_PLAN.md#dg-003---frontend-graphql-client-and-query-cache) is `Resolved` by [Accepted ADR-0017](./docs/adrs/0017-use-tanstack-query-with-a-project-owned-typed-graphql-executor.md) after fresh final independent `PASS` and explicit project-owner approval. TASK-004 through TASK-013 are `Complete`; TASK-014 is `In progress`. Completed migration/import evidence makes SPEC-010, HS-012, and AC-009 pass. TASK-007 product and hosted evidence makes SPEC-012, HS-013, AC-010, and the Redis portion of NFR-003 pass. TASK-008 and TASK-011 complete the backend and browser interaction evidence for AC-003 through AC-005. TASK-010 makes AC-001 and AC-002 pass; TASK-012 makes AC-006 pass; TASK-013 closes the adopted quality/test portfolio. TASK-014's public source and ERD keep SPEC-015, SPEC-016, DEL-001, and DEL-002 passed, while SPEC-017, HS-018, DEL-003, and AC-012 await the corrected public candidate. Exactly AC-001 through AC-011 pass at 11/12.

## Delivery status

| Required deliverable | Current evidence |
|---|---|
| [DEL-001](./docs/REQUIREMENTS.md#del-001---public-source-repository) - Public source repository | Pass: anonymous HTTPS readback and a fresh detached clone resolved exact full commit `62aa3fa7c794e17a52218c0b3fcb4f01e331af9c` on public branch `codex/execplan-014` and reproduced the accepted complete application candidate. |
| [DEL-002](./docs/REQUIREMENTS.md#del-002---entity-relationship-diagram) - Entity-relationship diagram | Pass: the public migration-derived [ERD](./docs/ERD.md) maps one-to-one to the fresh PostgreSQL schema/history inventory and deliberately contains no image relation or byte/lifecycle table. |
| [DEL-003](./docs/REQUIREMENTS.md#del-003---run-and-api-usage-documentation) - Run and API usage documentation | Fail pending correction: public commit `62aa3fa7...af9c` omits mandatory avatar visitor-metadata/redirect limits and does not provide the accepted development-only explorer composition. |

The instructions below began from public commit `62aa3fa7c794e17a52218c0b3fcb4f01e331af9c` and its reusable clean-clone evidence. Corrective changes remain local until an exact replacement candidate is separately authorized and published.

## Clean-clone setup, operation, and API usage

Run the commands in this section from PowerShell. The supported environment is Git, Node.js `24.18.0`, npm `11.16.0`, and Docker Desktop using Linux containers. Start Docker Desktop before cloning, choose a parent directory for the checkout, and verify the toolchain and Docker client/server:

```powershell
git --version
node --version
npm --version
docker version
docker info --format '{{.OSType}}'
```

The last command must print `linux`. A missing `dockerDesktopLinuxEngine` pipe or Docker API connection means Docker Desktop is not ready; stop and repair that prerequisite before infrastructure, migrations, imports, or applications.

### Clone and install

From the chosen parent directory, clone the configured public repository and enter its root:

```powershell
git clone https://github.com/mmjosedaniel/rick-and-morty-explorer.git
Set-Location rick-and-morty-explorer
```

Install exactly the dependency graph in `package-lock.json`:

```powershell
npm ci
```

The immutable install populates local `node_modules`. Install Playwright's Chromium only before the aggregate `npm test` or `npm run test:smoke:lifecycle` path on a machine that does not already have the pinned browser:

```powershell
npm run browser:install
```

### Configure the local environment

All remaining commands run from the repository root. Export the supported [`.env.example`](./.env.example) values in every new PowerShell session because the API and command-line tools read the current process environment:

```powershell
$env:API_HOST = '127.0.0.1'
$env:API_PORT = '3000'
$env:VITE_GRAPHQL_ENDPOINT = 'http://127.0.0.1:3000/graphql'
$env:POSTGRES_USER = 'rick_and_morty'
$env:POSTGRES_PASSWORD = 'local-development-only'
$env:POSTGRES_DB = 'rick_and_morty'
$env:POSTGRES_SCHEMA = 'public'
$env:POSTGRES_PORT = '5432'
$env:POSTGRES_MIGRATION_LOCK_TIMEOUT_MS = '5000'
$env:REDIS_PORT = '6379'
$env:REDIS_NAMESPACE = 'character-app:local'
$env:REDIS_SEARCH_TTL_SECONDS = '300'
$env:REDIS_OPERATION_TIMEOUT_MS = '250'
```

These values are loopback-only local defaults. If ports `5432` or `6379` are already occupied, substitute unused loopback ports before the first infrastructure command, for example:

```powershell
$env:POSTGRES_PORT = '55432'
$env:REDIS_PORT = '56400'
```

### Start infrastructure, migrate, and import

Validate the resolved Compose model, create the named `rick-and-morty-dev` containers/network/volumes, and confirm both services are healthy:

```powershell
npm run infra:config
npm run infra:up
npm run infra:ps
```

`infra:config` must render without an error; `infra:up` must complete; `infra:ps` must show PostgreSQL and Redis healthy. Do not continue if any signal is absent. The created volumes retain local PostgreSQL and Redis data until the exact teardown command below.

Build and authenticate the migration artifact, inspect the pre-apply state, apply the schema, confirm its applied state, and exercise the isolated emitted-artifact lifecycle validation:

```powershell
npm run migrate:build
npm run migrate:status
npm run migrate:up
npm run migrate:status
npm run migrate:validate-emitted
```

The migration commands accept only the configured loopback PostgreSQL profile and an existing admitted `POSTGRES_SCHEMA`. `migrate:up` advances that configured schema but does not create an absent schema; `migrate:status` is read-only; `migrate:validate-emitted` owns and removes its temporary namespace while preserving the authenticated artifact. The resulting application schema is documented in the migration-derived [entity-relationship diagram](./docs/ERD.md).

Import the deterministic character IDs 1 through 15 after migration succeeds:

```powershell
npm run import:characters
```

This is the one live public Rick and Morty character-JSON request boundary in the setup. It requires internet access, validates the complete upstream batch and exact avatar mapping, then transactionally inserts or refreshes source-owned fields without resetting favorites or comments. A successful command exits zero; failures return a non-zero safe diagnostic.

### Run the applications

Start the development API and Vite web application as foreground processes after infrastructure, migration, and import:

```powershell
npm run dev:apps
```

Open `http://127.0.0.1:5173/`; the detail route is `/characters/<positive-character-id>`, and API liveness is `http://127.0.0.1:3000/healthz`. Press `Ctrl+C` to stop both foreground processes. On later runs with the environment exported and initialized volumes retained, this combined command starts infrastructure and then the development applications:

```powershell
npm run dev
```

For the compiled mode, build first and then start both built servers in the foreground:

```powershell
npm run build
npm start
```

The built web server listens on `http://127.0.0.1:4173` and the API uses `http://127.0.0.1:3000`. Press `Ctrl+C` to stop them.

### Verify the repository

With dependencies installed and the configured healthy infrastructure available, reuse the production build completed above and run the remaining static gates before tests:

```powershell
npm run lint
npm run typecheck
npm run validate:tailwind
```

The aggregate test command runs unit, PostgreSQL/Redis integration, application, and Chromium smoke scopes once in canonical order. Focused scripts remain discoverable in `package.json` for diagnosis, but they are not additional clean-clone execution steps:

```powershell
npm test
npm run test:smoke:lifecycle
```

The production build completed above must precede the aggregate tests because inherited migration CLI integration checks execute the compiled `apps/api/dist` artifact. Integration and smoke use task-owned schemas, Redis namespaces, processes, and ports; lifecycle validation reports its own readiness and cleanup result.

### GraphQL JSON API

The checked-in server accepts JSON GraphQL at `POST http://127.0.0.1:3000/graphql` in every supported mode. The supported development startup (`npm run dev:apps` or `npm run dev`) also exposes GraphiQL at the same loopback `/graphql` URL. Direct or compiled `npm start`, production-marked execution, tests, smoke, and other npm lifecycles keep GraphiQL disabled. The following four PowerShell examples require a running API, an applied schema, and the imported baseline. Each command constructs JSON with documented variables and prints the parsed response in both development and compiled modes.

Character list/search (omit any unused filter entries; supplied filters combine with `AND`):

```powershell
$graphqlEndpoint = 'http://127.0.0.1:3000/graphql'
$request = @{
  operationName = 'SearchCharacters'
  query = 'query SearchCharacters($filter: CharacterFilter) { characters(filter: $filter) { id name imageUrl species } }'
  variables = @{ filter = @{ status = 'alive'; species = 'human'; gender = 'male'; name = 'rick'; origin = 'earth' } }
}
Invoke-RestMethod -Method Post -Uri $graphqlEndpoint -ContentType 'application/json' -Body ($request | ConvertTo-Json -Depth 10)
```

Character detail with a bounded comment page:

```powershell
$graphqlEndpoint = 'http://127.0.0.1:3000/graphql'
$request = @{
  operationName = 'CharacterDetail'
  query = 'query CharacterDetail($id: ID!, $limit: Int, $offset: Int) { character(id: $id) { id name imageUrl species status gender type origin { name url } isFavorite comments(limit: $limit, offset: $offset) { id body } } }'
  variables = @{ id = '1'; limit = 20; offset = 0 }
}
Invoke-RestMethod -Method Post -Uri $graphqlEndpoint -ContentType 'application/json' -Body ($request | ConvertTo-Json -Depth 10)
```

Set favorite and read the persisted value from the mutation response:

```powershell
$graphqlEndpoint = 'http://127.0.0.1:3000/graphql'
$request = @{
  operationName = 'SetCharacterFavorite'
  query = 'mutation SetCharacterFavorite($id: ID!, $isFavorite: Boolean!) { setCharacterFavorite(id: $id, isFavorite: $isFavorite) { id isFavorite } }'
  variables = @{ id = '1'; isFavorite = $true }
}
Invoke-RestMethod -Method Post -Uri $graphqlEndpoint -ContentType 'application/json' -Body ($request | ConvertTo-Json -Depth 10)
```

Add one validated plain-text comment:

```powershell
$graphqlEndpoint = 'http://127.0.0.1:3000/graphql'
$request = @{
  operationName = 'AddCharacterComment'
  query = 'mutation AddCharacterComment($characterId: ID!, $body: String!) { addCharacterComment(characterId: $characterId, body: $body) { id body } }'
  variables = @{ characterId = '1'; body = 'Documented API example' }
}
Invoke-RestMethod -Method Post -Uri $graphqlEndpoint -ContentType 'application/json' -Body ($request | ConvertTo-Json -Depth 10)
```

Character IDs must be positive base-10 safe integers. Comment pagination defaults to `limit: 20` and `offset: 0`; limits are 1 through 50 and offsets are non-negative. Comments are newest first by stored creation time and then descending comment ID. Comment bodies are trimmed, stored as plain text, and must contain 1 through 1,000 Unicode code points. Invalid input returns `BAD_USER_INPUT`, a valid missing character returns `NOT_FOUND`, and unexpected failures return redacted `INTERNAL_SERVER_ERROR`.

### Third-party avatar boundary

The importer accepts only each character's validated official `https://rickandmortyapi.com/api/character/avatar/<id>.jpeg` URL, and the application persists and projects that URL as the character's `image_url`/`imageUrl` text attribute. The application owns no image bytes, proxy, image relation, or image lifecycle. The browser requests the official URL directly with anonymous cross-origin mode and `Referrer-Policy: no-referrer`; anonymous CORS still sends `Origin`, and the provider can observe the visitor's IP/network address, browser and fetch metadata, request timing, selected avatar, and request frequency. The web server's fixed CSP permits only `'self'` and `https://rickandmortyapi.com/api/character/avatar/` for images. Browser and intermediary caching is outside application control.

Avatar delivery therefore depends on the provider's availability, terms, authorization, and path policy. Native browser image loading follows redirects without application interception. The browser still enforces the redirected destination's scheme, host, and port against CSP, but the admitted CSP path restriction does not survive a redirect; the application cannot inspect the final URL, status, media type, or bytes, and final availability and bytes remain provider-owned. A failed image switches once to the layout-safe `Image unavailable` fallback; it uses no alternate source and performs no application retry. [AUTH-001](./docs/IMPLEMENTATION_PLAN.md#auth-001---character-image-content-rights-authorization) authorizes this exact direct-URL and ordinary browser/intermediary-caching boundary only for the personal, educational, non-commercial portfolio. A change to the provider/content source, host/path/character mapping, project or commercial scope, provider terms/authorization/objection/takedown status, delivery or redistribution mechanism, or recorded disposition reopens AUTH-001 before dependent image work.

### Exact teardown

Stop any foreground application command with `Ctrl+C`, verify that the target is the named `rick-and-morty-dev` project, then remove only its containers, network, and volumes:

```powershell
npm run infra:ps
npm run infra:down
npm run infra:ps
```

`infra:down` irreversibly removes this project's local PostgreSQL and Redis volume data. The final `infra:ps` must show no project services. Do not substitute broad Docker, schema, Redis, or process cleanup commands.

## Codex quick start

1. Read the root [repository guidelines](./AGENTS.md) and use this documentation map to locate authority; do not read the whole repository by default.
2. When the work belongs to the delivery graph, identify the exact `TASK-*`, confirm its state and prerequisites in the [implementation plan](./docs/IMPLEMENTATION_PLAN.md#implementation-work-sequence), and inspect every active gate whose trigger covers the intended artifact. For repository-policy-only work, name the authoritative workflow owner and state why no `TASK-*` applies.
3. Read only the mapped requirements, optional disposition, accepted ADRs, routed `SPEC-*`/`HS-*` rules, design records, and repository evidence needed for that task.
4. Choose one workflow from the table below. Reusable repository skills live under `.agents/skills`; custom roles and their activation boundaries are indexed in the [project-scoped Codex guide](./.codex/README.md#start-here).
5. Run proportional authoritative checks and complete the [task-closure documentation gate](#task-closure-documentation-gate) before handoff.

A useful task prompt supplies the minimum binding context without copying repository policy:

```text
Goal: <observable outcome>
TASK: <TASK-* or explain why no task applies>
Constraints: <scope, gates, allowed side effects, and relevant paths>
Done when: <falsifiable checks and documentation impact>
```

## Codex task routing

| Task | Required reading order | Repository workflow |
|---|---|---|
| Interpret or change scope | [Repository guidelines](./AGENTS.md) -> [technical assessment](./docs/FULL_STACK_TECHNICAL_ASSESSMENT.md) -> [requirements specification](./docs/REQUIREMENTS.md) -> [optional-scope dispositions](./docs/adrs/README.md#optional-scope-decisions) -> relevant accepted ADRs -> [active decision gates](./docs/IMPLEMENTATION_PLAN.md#active-decision-gates) | Preserve source classification, stable IDs, adopted commitments, and unresolved constraints. |
| Review or change architecture | [Repository guidelines](./AGENTS.md) -> [technical assessment](./docs/FULL_STACK_TECHNICAL_ASSESSMENT.md) -> [requirements](./docs/REQUIREMENTS.md) -> [ADR index](./docs/adrs/README.md) -> relevant ADRs -> [derived system module view](./docs/SYSTEM_DIAGRAM.md) -> [active decision gates](./docs/IMPLEMENTATION_PLAN.md#active-decision-gates) | Use [govern ADRs](./.agents/skills/govern-adrs/SKILL.md). |
| Research a bounded repository question | [Repository guidelines](./AGENTS.md) -> this documentation map -> exact authority owners for the question -> current repository/runtime evidence -> [research routing](./.codex/README.md#research-work) | Classify R0-R3 objectively, use the Research Assignment Capsule only when an agent is needed, keep policy-only research outside the product task graph, and enter decision or implementation workflows only when their separate activation conditions apply. |
| Plan implementation or resolve gates | [Repository guidelines](./AGENTS.md) -> [technical assessment](./docs/FULL_STACK_TECHNICAL_ASSESSMENT.md) -> [requirements](./docs/REQUIREMENTS.md) -> [architecture coverage](./docs/adrs/README.md#architecture-coverage) -> relevant accepted ADRs -> [derived system module view](./docs/SYSTEM_DIAGRAM.md) -> [implementation plan](./docs/IMPLEMENTATION_PLAN.md) -> owning [plan index](./docs/plans/README.md) entry when one exists | Use [plan implementation](./.agents/skills/plan-implementation/SKILL.md) and maintain a required ExecPlan under [PLANS.md](./PLANS.md). |
| Implement behavior or fix a bug | [Repository guidelines](./AGENTS.md) -> [current status](#repository-status) -> exact requirement/AC IDs -> optional disposition -> relevant accepted ADRs -> exact [TASK](./docs/IMPLEMENTATION_PLAN.md#implementation-work-sequence) and gates -> only mapped [SPEC/HS rules](./docs/specs/README.md#codex-rule-routing) -> applicable [UI design documents](./docs/ui/README.md) and reversible decisions -> repository evidence | Preflight current behavior, then complete one coherent milestone-slice Red-Green-Refactor cycle with separate test and implementation ownership. Use the [worker-first workflow](./.codex/execplan-implementation-workflow.md) and [write-lease guard](./.codex/write-lease-guard.md) only for an owner-authorized active ExecPlan whose task is `In progress`. Keep `standard` for every ordinary milestone; use [frontend quality](./.agents/skills/frontend-quality/SKILL.md) and the conditional `frontend-visual` profile only when the coherent contract materially changes rendered UI. Use optional [flow metrics](./.codex/agent-flow-metrics.md) only when a documented present question justifies their overhead. Validate the affected boundary at the milestone and the complete authoritative gates at task closure. |
| Review acceptance or readiness | [Repository guidelines](./AGENTS.md) -> [current status](#repository-status) -> [technical assessment](./docs/FULL_STACK_TECHNICAL_ASSESSMENT.md) -> [requirements and ACs](./docs/REQUIREMENTS.md) -> [optional dispositions](./docs/adrs/README.md#optional-scope-decisions) -> relevant ADRs -> [active gates/tasks](./docs/IMPLEMENTATION_PLAN.md) -> implementation/runtime evidence -> [prior reviews](./docs/reviews/README.md) | Use [review acceptance](./.agents/skills/review-acceptance/SKILL.md). |
| Record execution progress | [Repository guidelines](./AGENTS.md) -> authoritative changed artifact -> exact [TASK](./docs/IMPLEMENTATION_PLAN.md#implementation-work-sequence) -> [execution-record boundary](./docs/execution/README.md#authority-boundary) | Update the authority owner first, then append an evidence-linked chronological record. |
| Review or change the Codex workflow | [Repository guidelines](./AGENTS.md) -> [project-scoped Codex guide](./.codex/README.md) -> affected [implementation workflow](./.codex/execplan-implementation-workflow.md), [lease guard](./.codex/write-lease-guard.md), [metrics policy](./.codex/agent-flow-metrics.md), agent TOML, or skill -> execution record when a durable workflow decision changes | Keep root guidance concise, update the owning artifact instead of duplicating it, apply YAGNI to process machinery, and use [verify repository](./.agents/skills/verify-repository/SKILL.md) plus the [Codex workflow validation matrix](./.codex/README.md#validation). |
| Verify a worker barrier, milestone, task, or release | [Repository guidelines](./AGENTS.md) -> [current status](#repository-status) -> exact task and affected requirements -> authoritative manifests and automation -> affected documentation -> [prior reviews](./docs/reviews/README.md) | Use [verify repository](./.agents/skills/verify-repository/SKILL.md) in `focused`, `milestone`, or `closure` mode and reuse still-fresh evidence. |

For implementation, follow the exact authorities in the routing row above and then the linked worker-first workflow only when its activation conditions apply. Finish every path with proportional verification and the task-closure documentation gate. A workflow skill defines how Codex performs a task; it does not override the authority map or substitute for implementation evidence.

## Documentation change impact

| Change | Canonical edit | Review or update when affected |
|---|---|---|
| Documentation supersession, retirement, consolidation, move, rename, or deletion | Existing authoritative document and its successor or current owner | Apply the [documentation-preservation policy](./AGENTS.md#documentation-preservation); preserve point-in-time evidence and stable IDs, repair map/index entries and inbound links, record the rationale and successor when applicable, and run documentation validation |
| Source clarification approved by the project owner | Technical assessment | Requirements, ADR portfolio, implementation plan, and this map |
| Requirement, deliverable, or acceptance interpretation | Requirements specification | ADR metadata and index, optional disposition, and implementation plan |
| ADR creation, status change, or supersession | Individual ADR | ADR index, architecture coverage, system module diagram, optional disposition, and related decision gate; run the ADR validator |
| Authorization creation, status, scope, or reopen-condition change | Stable `AUTH-*` record in the implementation plan | Root current status, the owning accepted ADR's authorization note, affected task authorization joins and SPEC/HS guards, and the execution log; run documentation validation |
| Decision-gate or task change | Implementation plan and, for a resolved gate, the new ADR | ADR index, system module diagram when a module boundary changes, mapped SPEC/HS rules, execution log, and dependent work items |
| ExecPlan creation, progress, completion, supersession, or retirement | Active task-scoped ExecPlan and ExecPlan index | Canonical task, gate, ADR, requirement, specification, current-status, and execution-record owners only when their authoritative state materially changes |
| Codex role, skill, orchestration, hook, write-lease, or flow-metrics policy | Owning `.codex` agent, `.agents/skills` procedure, workflow, hook, lease, or metrics artifact | Root operating policy and documentation map, ExecPlan convention when execution contracts change, active plans only when their task-local semantics change, and the execution log; run documentation and configuration validation |
| Derived behavioral example or hard constraint | Requirements/ADR/plan owner first when semantics change; otherwise the exact SPEC/HS rule | Specification index routing, mapped tasks, and execution log; never promote derived wording to authority |
| UI field mapping, design annotation, or mockup | UI design documentation | Governing requirement, ADR, or plan owner first when semantics change; mapped SPEC/HS rules and execution log when affected |
| Implementation behavior | Tests, source, and configuration | Task mappings, relevant SPEC/HS rules, setup/API/ERD documentation, execution log, and current delivery status |
| Reversible execution decision or progress evidence | Execution log | Governing task and authority owner; current status only when repository evidence materially changes it |
| Verification or readiness result | Repository and runtime evidence | Dated review record and current delivery status when the result changes current readiness |

Reviewing a document does not require changing it. Update only when the new information materially affects the document's authority domain, and link to the owner instead of duplicating normative prose.

### Task-closure documentation gate

Every completed repository task must include a documentation-impact review before handoff:

1. Compare the completed scope, changed paths, selected decisions, and new evidence with the change-impact table above.
2. For a write-authorized task, update every materially affected authoritative document and add or repair navigation links when the change creates a new dependency, owner, artifact, command, or evidence location.
3. For a read-only task, do not modify files; report the documentation changes that would be required if the findings are acted upon.
4. Preserve stable requirement, deliverable, acceptance, ADR, authorization, decision-gate, task, SPEC, HS, and DPL decision IDs. Do not convert plans or documentation into implementation evidence.
5. Run `python .agents/skills/verify-repository/scripts/validate_docs.py --repo .` to validate local paths, anchors, stable IDs, readiness tags, and static Gherkin structure. Run the ADR validator when ADRs, architecture coverage, optional disposition, or decision gates are affected.
6. End the handoff with one explicit result: `Documentation impact: Updated ...`, `Documentation impact: None - ...`, or `Documentation impact: Proposed ...; not written because the task was read-only`.

A task is not complete until this gate has been performed and the relevant documentation checks pass. `None` is valid only with a concrete reason; unrelated documents must not be edited merely to produce a change.

The agent responsible for the task owns this gate because it has the full implementation and evidence context. It may delegate an independent documentation review when a change spans multiple authority domains, changes requirement or ADR semantics, or prepares a milestone or release, but delegation does not transfer closure responsibility.
