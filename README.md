# Rick and Morty Full Stack Assessment

## Repository status

This repository has completed the owner-authorized TASK-003, TASK-004, and TASK-006 implementation tasks after establishing the initial requirements and architecture foundation. It contains the assessment contract; accepted architecture decisions including ADR-0011 for the TypeScript test harness, [ADR-0014](./docs/adrs/0014-persist-and-deliver-character-image-urls-directly.md) for persisting each exact validated official avatar URL and loading it directly, [ADR-0015](./docs/adrs/0015-use-a-build-first-migration-lifecycle-with-exact-catalog-byte-lock-identity.md) as the current build-first migration lifecycle with a restricted lower-case ASCII, exact catalog-bound v2 identity for one fixed local/CI PostgreSQL profile, and [ADR-0016](./docs/adrs/0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md) for milestone-slice TDD with separate test and implementation ownership; a target system module diagram; a graph-oriented implementation plan; completed task-scoped ExecPlans including [TASK-004](./docs/plans/completed/TASK-004-relational-persistence-from-migrations.md), [TASK-006](./docs/plans/completed/TASK-006-graphql-reads-filters-and-request-logging.md), and [TASK-018](./docs/plans/completed/TASK-018-postgresql-migration-lock-identity-decision.md); seven project-scoped Codex agent definitions; derived Gherkin specifications; UI specifications; execution records; and repository-specific workflow guidance. Fresh independent review returned `PASS` with no Blocker, Major, or Minor across all twenty hard gates and LOCK-INV-01 through LOCK-INV-21 on exact Proposed ADR-0015 SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1`; the project owner explicitly approved those bytes on 2026-08-14. ADR-0015 and ADR-0016 are `Accepted`, ADR-0010 and ADR-0012 are preserved as `Superseded` history, DG-005 is `Resolved`, and TASK-018 is `Complete`. The project owner separately authorized TASK-004 execution on 2026-08-14. The historical [TASK-004 acceptance review](./docs/reviews/2026-08-16-task-004-acceptance-review.md) returned `REVISE` because the artifact omitted two inherited TypeScript configuration inputs. One bounded TDD correction authenticated all three compiler configurations, and a second bounded cycle made emitted bytes independent of LF/CRLF checkout materialization while preserving exact output hashing. The final 20-input/24-file artifact passes unit 55/55, PostgreSQL 18.6 integration 67/67, application 2/2, and root build locally. Independent clean-checkout controller run `af1a90f61c5b8f9d` at commit `646e8cd5e4c3b5bc6f2b6e4446f8cddd6be21d46` passes all 35 checks and reproduces the exact same build and manifest identity. Corrected hosted GitHub Actions run `31947144452`, job `95164854442`, passes every step on exact commit `c59618e54e6b5a96072dfcb2111b52253fb869fd`. The fresh [TASK-004 acceptance re-review](./docs/reviews/2026-08-16-task-004-acceptance-re-review.md) returns `PASS` with no Blocker, Major, or Minor, and the task-closure documentation gate passes. ADR-0014 remains `Accepted`; ADR-0001, ADR-0004, and ADR-0013 also remain preserved `Superseded` history. DG-001, DG-002, DG-004, DG-005, and DG-006 are resolved; TASK-001, TASK-002, TASK-003, TASK-004, TASK-006, TASK-016, TASK-017, and TASK-018 are `Complete`; and [AUTH-001](./docs/IMPLEMENTATION_PLAN.md#auth-001---character-image-content-rights-authorization) is `Authorized` only for this personal, educational, non-commercial portfolio under ADR-0014's exact direct-URL boundary and ordinary browser/intermediary caching.

TASK-003, TASK-004, and TASK-006 are `Complete` after their task-specific implementation, verification, independent-review, and documentation-closure gates. The repository contains a strict npm/TypeScript workspace, a React 18/BrowserRouter/Tailwind shell, Express liveness and query-only GraphQL boundaries, unit, PostgreSQL integration, application, and Chromium smoke projects, root build/start/development and migration navigation, an isolated PostgreSQL/Redis Compose definition, and the owner-authorized GitHub Actions workflow. TASK-004 supplies relational persistence and migrations but not the TASK-005 character import. TASK-006 supplies character list/detail reads, all five filters, bounded newest-first comment pagination, stable redacted query errors with separate server diagnostics, exact stored image-URL projection, demand-lazy PostgreSQL composition, and one bounded metadata record for every completed Express request. Favorite/comment mutations remain owned by TASK-008. AC-007, AC-008, and AC-011 now pass; the imported 15-character baseline, Redis behavior, product UI, final ERD, complete delivery, and the other acceptance criteria remain pending, so minimum-assessment readiness is still `Fail` at 3/12.

An accepted ADR records approved implementation direction only. Requirements, ADRs, plans, examples, mocks, and stubs must not be treated as implementation or acceptance evidence.

## Documentation map

This README is the single documentation entry point and current-state summary for both maintainers and Codex. It routes readers to the authoritative owner of each kind of information; it does not replace those documents.

| Artifact | Authoritative for | Not authoritative for |
|---|---|---|
| [Repository guidelines](./AGENTS.md) | Codex operating policy, language, evidence rules, documentation lifecycle and preservation, KISS, YAGNI, and clean-code rules, TypeScript conventions, and TDD workflow | Product scope, architectural choices, or implementation status |
| [Technical assessment](./docs/FULL_STACK_TECHNICAL_ASSESSMENT.md) | Original assessment scope and mandatory-versus-optional classification | Repository-specific decisions or implementation evidence |
| [Requirements specification](./docs/REQUIREMENTS.md) | Normalized functional, non-functional, optional, deliverable, and acceptance IDs | Architectural choices or implementation status |
| [ADR index](./docs/adrs/README.md) and individual ADRs | Portfolio status, optional-scope disposition, architecture coverage, and accepted decision detail | Implementation or acceptance status |
| [System module diagram](./docs/SYSTEM_DIAGRAM.md) | Derived high-level target modules and principal data flows | New architecture, resolution of pending gates, implementation status, or acceptance evidence |
| [Implementation plan](./docs/IMPLEMENTATION_PLAN.md) | Stable `TASK-*` work items, canonical task and gate status, the dependency graph, AI-assistant execution rules, validation intent, and non-architectural `AUTH-*` authorization status | New product scope, unapproved architectural choices, implementation or runtime evidence, or acceptance status |
| [ExecPlan convention](./PLANS.md) and [plan index](./docs/plans/README.md) | Required living-document format, active task-scoped plans, and preserved completed plans | Canonical task dependencies, architectural approval, gate status, implementation status, or acceptance evidence |
| [Gherkin specifications](./docs/specs/README.md), [SPEC](./docs/specs/SPEC.feature), and [HARD_SPEC](./docs/specs/HARD_SPEC.feature) | Derived behavioral examples, non-negotiable constraints, failure modes, and human decision guards | Source scope, architectural approval, implementation status, or passing evidence |
| [UI design documentation](./docs/ui/README.md) and [visual foundations](./docs/ui/visual-foundations.md) | Detailed specification and navigation for the UI choices recorded in the execution log, including field visibility and visual foundations | Product scope, architectural approval, decision status or rationale, implementation status, or acceptance evidence |
| [Proposed Storybook pilot workflow](./docs/ui/storybook-workflow.md) | Implementation guidance for the reversible pilot currently recorded by DPL-DEC-013; DPL-DEC-007 is preserved as Superseded history | Product scope, architectural approval, task definitions, gate resolution, implementation status, or acceptance evidence |
| [Execution records](./docs/execution/README.md) and [decision and progress log](./docs/execution/decision-and-progress-log.md) | Stable navigation, reversible decision status and rationale, and chronological evidence links | Current repository status, product scope, architecture approval, gate resolution, detailed design specification, or acceptance status |
| [Review records](./docs/reviews/README.md) | Point-in-time evidence-based assessments, readiness matrices, gaps, and verification commands | Product scope, architectural approval, or permanent current status |
| This README | Documentation routing, current repository phase, and current delivery-status summary | Requirement or architecture definition |
| Source, manifests, migrations, tests, runtime observations, and Git history | Actual implementation and verification evidence | Requirement intent or approval of architectural changes |
| Repository skills: [govern ADRs](./.agents/skills/govern-adrs/SKILL.md), [plan implementation](./.agents/skills/plan-implementation/SKILL.md), [review acceptance](./.agents/skills/review-acceptance/SKILL.md), and [verify repository](./.agents/skills/verify-repository/SKILL.md) | Repeatable ADR, planning, acceptance, and verification procedures, loaded progressively when the task matches | Product scope, architectural approval, or passing evidence |
| [Project-scoped Codex guide](./.codex/README.md) | Codex discovery and trust, reusable read-only and write-capable roles, model policy, decision and implementation routing, review checkpoints, permission boundaries, and optional hook activation | Product scope, task ownership, architectural approval, implementation status, or acceptance evidence |
| [Worker-first ExecPlan implementation workflow](./.codex/execplan-implementation-workflow.md) | Compact `Milestone Assignment Packet v2`, preflight classification, persistent separate test and implementation contexts, coherent milestone-slice TDD, sequential write leases, evidence reuse, bounded recovery, and risk-routed review | Task readiness, product scope, architecture approval, or passing implementation evidence |
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

The current evidence-based [TASK-006 acceptance review](./docs/reviews/2026-08-17-task-006-acceptance-review.md) records:

| View | Current result |
|---|---|
| Minimum assessment | Fail: 3 of 12 acceptance criteria pass. TASK-006 proves AC-007, AC-008, and AC-011; imported data, mutations, Redis, product UI, responsive behavior, final ERD, and complete delivery remain incomplete. |
| Repository baseline | Fail: TASK-006's adopted OR-001, OR-007, and OR-008 contribution passes, but the minimum assessment and the remaining adopted product commitments are incomplete. |

[DG-003](./docs/IMPLEMENTATION_PLAN.md#dg-003---frontend-graphql-client-and-query-cache) is the only pending architectural decision gate and applies to later frontend data-access work. TASK-004 and TASK-006 are `Complete`; TASK-006's four behavior milestones, integrated closure validation, fresh independent `PASS`, and documentation gate are recorded in its [completed ExecPlan](./docs/plans/completed/TASK-006-graphql-reads-filters-and-request-logging.md). TASK-005 remains `Pending`. The owner-approved allocation keeps bounded detail/comment reads in TASK-006 and mutations in TASK-008. This evidence changes exactly AC-007, AC-008, and AC-011 to `Pass`; it does not advance the other nine criteria or full NFR-003, which still depends on Redis and later backend work.

## Delivery status

| Required deliverable | Current evidence |
|---|---|
| [DEL-001](./docs/REQUIREMENTS.md#del-001---public-source-repository) - Public source repository | Partially demonstrated: anonymous read access to the configured [GitHub repository](https://github.com/mmjosedaniel/rick-and-morty-explorer) and committed TASK-003 skeleton source on public `main` through [merged PR #8](https://github.com/mmjosedaniel/rick-and-morty-explorer/pull/8) were verified on 2026-08-14. Complete application delivery remains pending through TASK-014, so the deliverable and AC-012 do not pass. |
| [DEL-002](./docs/REQUIREMENTS.md#del-002---entity-relationship-diagram) - Entity-relationship diagram | Not yet available. TASK-004 supplies an executable migration and exact migrated-schema inventory, but TASK-014 owns derivation and comparison of the delivered ERD; DEL-002 and AC-012 do not yet pass. |
| [DEL-003](./docs/REQUIREMENTS.md#del-003---run-and-api-usage-documentation) - Run and API usage documentation | Partially demonstrated: operational, migration, and GraphQL list/detail/filter/pagination/error/logging guidance now exists. The TASK-005 character-import workflow and the complete end-to-end application guide remain pending, so DEL-003 and AC-012 do not yet pass. |

This status section must be updated and supplemented with links to reproducible prerequisites, configuration, installation, infrastructure, migration, character-import, development, test, build, and GraphQL usage instructions as the corresponding executable artifacts are added.

## Repository operation and migration workflow

The repository currently targets Node.js `24.18.0` and npm `11.16.0`. Install the immutable dependency graph and Chromium with:

```text
npm ci
npm run browser:install
```

The local defaults are recorded in [`.env.example`](./.env.example). The API accepts only loopback `API_HOST=127.0.0.1` and a decimal `API_PORT` from 1 through 65535; its defaults are `127.0.0.1:3000`. PostgreSQL and Redis also have local-only defaults. Do not commit real secrets.

With Docker Compose available, the complete development entry starts healthy PostgreSQL and Redis before the foreground web and API processes:

```text
npm run dev
```

If another local service already owns a default infrastructure port, set explicit free loopback ports in the same PowerShell session before running the development and infrastructure commands. For example, the verified Windows run preserved an existing PostgreSQL 18.1 service on `5432` and used:

```powershell
$env:POSTGRES_PORT = '55432'
$env:REDIS_PORT = '56379'
npm run dev
```

The development web URL is `http://127.0.0.1:5173`; API liveness is `http://127.0.0.1:3000/healthz`. Infrastructure remains under the named `rick-and-morty-dev` project after the foreground applications stop. Inspect or remove only that project with:

```text
npm run infra:ps
npm run infra:down
```

For compiled application processes, run `npm run build` followed by `npm start`. This starts the built web server on `127.0.0.1:4173` and the API on `127.0.0.1:3000`; both remain foreground-owned. `GET /healthz` is liveness-only and remains independent of PostgreSQL and Redis. `POST /graphql` is the query API described below; its first character read initializes the PostgreSQL boundary on demand.

The migration CLI accepts only the loopback PostgreSQL profile recorded in [`.env.example`](./.env.example). Export those `POSTGRES_*` values in the current shell, start the scoped infrastructure, and use the root commands below. Every lifecycle command builds and authenticates one immutable native-ESM artifact before operating; `down` is selector-free by default, one step is explicit, and larger rollbacks require acknowledgement.

```text
npm run migrate:build
npm run migrate:status
npm run migrate:up
npm run migrate:down
npm run migrate:down -- --step 1
npm run migrate:down -- --keep-through <migration-id>
npm run migrate:down -- --step <count> --confirm-multiple
npm run migrate:validate-emitted
```

`npm run migrate:validate-emitted` owns a temporary namespace and proves empty status, first apply, applied status, no-op apply, default down, and reapply without deleting the authenticated publication. `npm run verify:task-004` is the destructive task-level verification controller: it performs an immutable install, owns isolated PostgreSQL/Redis ports and a scoped Compose project, runs the 34 leaf checks without re-running their aggregate `npm test` alias, and tears down its owned infrastructure. Historical clean-checkout evidence remains a 35/35 record for the controller version executed at that commit.

### GraphQL read API

Send JSON GraphQL requests to `POST http://127.0.0.1:3000/graphql`. The process and `/healthz` can start without database readiness, but the first character query requires valid `POSTGRES_*` configuration and a schema already applied through the migration workflow. TASK-005 has not yet supplied the deterministic 15-character import, so a newly migrated database has no product rows unless test fixtures or a later importer populate it. GraphiQL is available only when explicitly enabled by the development composition; it is disabled by default, in tests, and in production.

Search characters with any subset of the five optional filters:

```graphql
query SearchCharacters($filter: CharacterFilter) {
  characters(filter: $filter) {
    id
    name
    imageUrl
    species
  }
}
```

```json
{
  "filter": {
    "status": "alive",
    "species": "human",
    "gender": "male",
    "name": "rick",
    "origin": "earth"
  }
}
```

Blank filter values are omitted and supplied filters combine with `AND`. `status` and `gender` use case-insensitive exact matching; `name`, `species`, and `origin` use case-insensitive literal substring matching, including literal `%` and `_`. The API promises no default list order.

Read one character and a bounded comment page with:

```graphql
query CharacterDetail($id: ID!, $limit: Int, $offset: Int) {
  character(id: $id) {
    id
    name
    imageUrl
    species
    status
    gender
    type
    origin {
      name
      url
    }
    isFavorite
    comments(limit: $limit, offset: $offset) {
      id
      body
    }
  }
}
```

Character IDs must be positive base-10 safe integers. Comment pagination defaults to `limit: 20` and `offset: 0`; limits must be 1 through 50 and offsets must be non-negative. Comments are returned newest first by stored creation time and then descending comment ID. The exact stored `image_url` is projected as `imageUrl`; the API does not fetch upstream character JSON, proxy image bytes, or transform the URL.

Invalid input returns `BAD_USER_INPUT`, a valid missing character returns `NOT_FOUND`, and unexpected failures return redacted `INTERNAL_SERVER_ERROR`. Original unexpected failures are written only to the server diagnostic sink. Every completed Express response writes one bounded JSON record to standard output with `requestId`, `method`, query-free `path`, `status`, `durationMs`, `errorCount`, and a bounded `operationName` or `null`; request bodies, GraphQL variables/documents, credentials, comments, stacks, SQL, and diagnostics are excluded. The schema is query-only: TASK-008 owns future favorite/comment mutations.

Authoritative verification commands are:

```text
npm run typecheck
npm run build
npm run test:unit
npm run test:integration
npm run test:application
npm run test:smoke
npm test
npm run validate:tailwind
npm run test:smoke:lifecycle
```

Build before the aggregate test command: inherited TASK-004 CLI integration tests execute the compiled `apps/api/dist` migration artifact. Root `npm test` then runs unit, PostgreSQL integration, application, and Chromium smoke in canonical order. Integration tests require the closed local PostgreSQL profile; the smoke owns only ports 4173/4174 and remains independent of PostgreSQL and Redis.

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
| Plan implementation or resolve gates | [Repository guidelines](./AGENTS.md) -> [technical assessment](./docs/FULL_STACK_TECHNICAL_ASSESSMENT.md) -> [requirements](./docs/REQUIREMENTS.md) -> [architecture coverage](./docs/adrs/README.md#architecture-coverage) -> relevant accepted ADRs -> [derived system module view](./docs/SYSTEM_DIAGRAM.md) -> [implementation plan](./docs/IMPLEMENTATION_PLAN.md) -> owning [plan index](./docs/plans/README.md) entry when one exists | Use [plan implementation](./.agents/skills/plan-implementation/SKILL.md) and maintain a required ExecPlan under [PLANS.md](./PLANS.md). |
| Implement behavior or fix a bug | [Repository guidelines](./AGENTS.md) -> [current status](#repository-status) -> exact requirement/AC IDs -> optional disposition -> relevant accepted ADRs -> exact [TASK](./docs/IMPLEMENTATION_PLAN.md#implementation-work-sequence) and gates -> only mapped [SPEC/HS rules](./docs/specs/README.md#codex-rule-routing) -> applicable [UI design documents](./docs/ui/README.md) and reversible decisions -> repository evidence | Preflight current behavior, then complete one coherent milestone-slice Red-Green-Refactor cycle with separate test and implementation ownership. Use the [worker-first workflow](./.codex/execplan-implementation-workflow.md) and [write-lease guard](./.codex/write-lease-guard.md) only for an owner-authorized active ExecPlan whose task is `In progress`; use optional [flow metrics](./.codex/agent-flow-metrics.md) only when a documented present question justifies their overhead. Validate the affected boundary at the milestone and the complete authoritative gates at task closure. |
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
| Codex role, orchestration, hook, write-lease, or flow-metrics policy | Owning `.codex` agent, workflow, hook, lease, or metrics artifact | Root operating policy and documentation map, ExecPlan convention when execution contracts change, active plans only when their task-local semantics change, and the execution log; run documentation and configuration validation |
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
