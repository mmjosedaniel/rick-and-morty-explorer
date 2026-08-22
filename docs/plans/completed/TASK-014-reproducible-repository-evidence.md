# Deliver TASK-014 Reproducible Repository Evidence

- Status: Complete; public delivery, clean-clone validation, review, and active-location documentation gate passed
- Task: [TASK-014](../../IMPLEMENTATION_PLAN.md#task-014---deliver-reproducible-repository-evidence)
- Plan and workflow ID: `TASK-014-20260822-01`
- Created: 2026-08-22
- Last updated: 2026-08-22
- Planning baseline: clean `main` at `2e126b3265905309f974bdadf373ed2e74cdf360`
- Governing convention: [PLANS.md](../../../PLANS.md)

This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.

Creating and registering this plan did not authorize TASK-014 execution. The project owner's separate 2026-08-22 request authorized this exact plan and workflow ID; a later exact authorization permitted only the six-path commit and branch push recorded below. TASK-014 is now `Complete`. No authorization was given for a materially revised plan, new dependency, pull request, merge, deployment, or additional stage, commit, push, or publication action.

## Progress

- [x] (2026-08-22 17:06Z) Read TASK-014, DEL-001 through DEL-003, NFR-006, AC-012, SPEC-015 through SPEC-017, HS-018, ADR-0003/0006/0008/0014/0015/0016, historical Superseded ADR-0012, AUTH-001, the documentation lifecycle, and the worker-first implementation workflow.
- [x] (2026-08-22 17:06Z) Confirmed TASK-013 is `Complete`, TASK-014 and TASK-015 are `Pending`, every decision gate is `Resolved`, and AUTH-001 remains `Authorized` for the unchanged personal, educational, non-commercial direct-URL boundary.
- [x] (2026-08-22 17:06Z) Reconciled a clean `main` worktree at `2e126b3265905309f974bdadf373ed2e74cdf360`; anonymous `ls-remote` readback of the configured public repository returned the same `main` SHA.
- [x] (2026-08-22 17:06Z) Completed planning reuse audit `TASK-014-REUSE-20260822-01`: the 139-path implementation/test/configuration/README projection is `D90C47825B9F16C9307401AA1BD9705A5EAA18FA9E634ABCFE862BC3C5E67237`, the accepted 138-path implementation/test/configuration projection remains `024F1415C4ADA8AD56233C77500434D0218AE5CC188522FB2E70770027704B3D`, and no tracked ERD artifact exists.
- [x] (2026-08-22) Selected the smallest complete delivery surface: extend the existing root README and add one migration-derived `docs/ERD.md`; add no product/test/configuration code, dependency, helper, generator, test project, component, function, or abstraction.
- [x] (2026-08-22) Registered the proportional planning decision as DPL-DEC-054 and linked this active ExecPlan while preserving TASK-014 as `Pending`.
- [x] (2026-08-22) Passed planning documentation validation for 84 Markdown files and 123 scenarios, ADR validation for 18 ADRs and 38 requirements with only the established NFR-006 warning, exact fingerprint reproduction, link/readback checks, and `git diff --check`.
- [x] (2026-08-22 17:36Z) Received separate project-owner authorization for exact workflow `TASK-014-20260822-01`; confirmed TASK-013 `Complete`, TASK-014/TASK-015 `Pending` before activation, all decision gates `Resolved`, AUTH-001 unchanged, and a clean unstaged/untracked worktree on `codex/execplan-014` at `89d2977896987313b28febbd56800e404a4020c7`.
- [x] (2026-08-22 17:36Z) Reproduced the 139-path delivery projection at `D90C47825B9F16C9307401AA1BD9705A5EAA18FA9E634ABCFE862BC3C5E67237`; reconciled the historical 138-path accepted identity `024F1415C4ADA8AD56233C77500434D0218AE5CC188522FB2E70770027704B3D` to the current Windows materialization identity `2D138DA10B0DF73FC894A6BA246E847B0925F49BE2CA22C41D894F8E4AA84524` with no logical Git diff across the projection.
- [x] (2026-08-22 17:36Z) Rechecked the public baseline anonymously: `refs/heads/main` resolves to `2e126b3265905309f974bdadf373ed2e74cdf360`; this remains activation evidence only.
- [x] (2026-08-22 17:36Z) Accepted the persistent `test_worker` binding preflight: runtime commands, schema inventory, four GraphQL operations, avatar behavior, public/clean-clone owners, and validation owners are `EXISTING_AND_COVERED`; the ERD is `MISSING` declarative setup; README consolidation and the GraphiQL correction are `PARTIAL`; no characterization or product Red is required.
- [x] (2026-08-22 17:36Z) Transitioned TASK-014 to `In progress` and recorded activation identities without changing product, test, configuration, dependency, or deliverable bytes.
- [x] (2026-08-22 17:56Z) Completed Milestone 1: two terminally compliant exact-path leases produced and corrected the README/ERD candidate; affected validation froze 140 paths at `827F378CBE2D603ED70FA532A67EAC1C79FF0012DCB147B662BF38CCB1D2FF6B`; fresh S1 review returned `PASS` with zero findings.
- [x] (2026-08-22 18:23Z) Passed the owner-controlled public-candidate checkpoint: separately authorized commit `62aa3fa7c794e17a52218c0b3fcb4f01e331af9c` was pushed to `refs/heads/codex/execplan-014`, and anonymous HTTPS readback resolved that exact SHA. No pull request was opened.
- [x] (2026-08-22 18:58Z) Completed the Milestone 2 clean-clone command ledger, four GraphQL operations with mutation readback, fresh-schema ERD comparison, quality/closure packet, exact runtime cleanup, and validated temporary-clone removal on public SHA `62aa3fa7c794e17a52218c0b3fcb4f01e331af9c`.
- [x] (2026-08-22 19:04Z) Accepted Milestone 2 after the fresh integrated independent reviewer returned closure-permitting `PASS WITH FOLLOW-UPS`: zero Blocker, zero Major, and one coordinator-owned living-plan-currentness Minor dispositioned in this closure update.
- [x] (2026-08-22 19:12Z) Added the dated [TASK-014 acceptance review](../../reviews/2026-08-22-task-014-acceptance-review.md), recorded the review's sole resolved follow-up, and synchronized pre-gate current-state, plan, ADR-implementation, review-index, and chronology owners without changing public candidate bytes.
- [x] (2026-08-22 19:14Z) Passed the active-location task-closure documentation gate for 86 Markdown files/123 scenarios, ADR validation for 18 ADRs/38 requirements with only the established NFR-006 warning, and diff checking; marked TASK-014 and AC-012 `Complete` while keeping TASK-015 `Pending`.
- [x] (2026-08-22 19:17Z) Archived this plan at its stable completed path, repaired every inbound/internal link, confirmed the active path absent/completed path present, and passed completed-location documentation validation for 86 Markdown files/123 scenarios, ADR validation for 18 ADRs/38 requirements with only the established NFR-006 warning, and diff checking.

## Surprises & Discoveries

- Observation: The repository already contains the complete implemented application and an exact-lock command surface. The root README already documents the toolchain, environment, immutable install, Compose, migration, import, development, test, build, compiled start, and the four GraphQL operations. TASK-014 needs consolidation and executable completion, not another guide or command owner.
  Evidence: `README.md`, `.env.example`, `package.json`, `package-lock.json`, and `compose.yaml`.

- Observation: No tracked ERD artifact exists, but the accepted migration and its real PostgreSQL inventory test already define every entity, column, constraint, relationship, and index required to derive one without a generator.
  Evidence: the ERD filename scan returns zero paths; `apps/api/src/infrastructure/database/migrations/20260814000000-create-relational-schema.ts`, `apps/api/src/infrastructure/database/migrations/files/storage.ts`, and `apps/api/src/infrastructure/database/migration-lifecycle.integration.test.ts` own the schema and fresh-database inventory.

- Observation: A repository-rendered Mermaid diagram is sufficient. It can express `characters`, `comments`, and `sequelize_migration_history`, including the single character-to-comments relationship, while adjacent prose records defaults, checks, indexes, and the deliberate absence of an image relation.
  Evidence: DEL-002 and SPEC-016 require an ERD, not a generated binary, hosted diagram service, or new tooling dependency.

- Observation: The current README says GraphiQL is available when enabled by development composition, but the executable production/development server passes `enableGraphiql: false`. The injectable handler option exists for tests, not as a documented runtime switch.
  Evidence: `apps/api/src/server.ts`, `apps/api/src/transport/graphql/graphql-handler.ts`, and `apps/api/src/transport/graphql/graphql-summary.application.test.ts`. TASK-014 must correct the documentation to the executable server truth; it must not add runtime behavior.

- Observation: The existing browser boundary already proves the complete avatar-delivery contract: exact official URL, fixed CSP source, anonymous CORS, no referrer, no credentials, no public JSON request, layout-safe one-way fallback, and no application-owned image bytes. Documentation can link and summarize that established boundary without a new component or test.
  Evidence: `apps/web/server.ts`, `apps/web/src/character-card.tsx`, `apps/web/src/character-detail-route.tsx`, and `tests/smoke/walking-skeleton.smoke.test.ts`.

- Observation: Anonymous Git readback currently resolves public `main` to the same planning baseline. That is planning evidence only. The future README/ERD candidate must itself be present in an anonymously accessible commit before clean-clone acceptance can pass.
  Evidence: local `git rev-parse HEAD` and anonymous `git ls-remote https://github.com/mmjosedaniel/rick-and-morty-explorer.git refs/heads/main` both returned `2e126b3265905309f974bdadf373ed2e74cdf360` on 2026-08-22.

- Observation: The historical accepted 138-path aggregate does not reproduce from the current Windows materialized worktree even though the 139-path aggregate does. The current materialized 138-path aggregate is `2D138DA10B0DF73FC894A6BA246E847B0925F49BE2CA22C41D894F8E4AA84524`; 129 projected worktree blobs differ byte-for-byte from their index blobs under `core.autocrlf=true`, while Git reports no logical diff from the accepted TASK-013 candidate across all 138 paths.
  Evidence: exact projection recomputation, worktree/index blob comparison, `git diff a7819f85c3eb0318b1488ab47beababf31f5b09e..HEAD -- <138-path projection>`, and clean `git status --short`. The reuse classification and command/evidence mappings remain valid, but subsequent local candidate checks use the refreshed materialization identity.

- Observation: The first documentation candidate exposed a command-ledger duplication: running focused unit, integration, application, and smoke commands before `npm test` would repeat every constituent scope, and `npm run build` appeared twice. The sole allowed same-contract correction removed those duplicate executions while retaining one aggregate test, one lifecycle run, and one production build/start sequence.
  Evidence: attempt-2 receipt `6526f919edb8c15ac229a84999ba678d4b4113a4446cf034c918476321367e63`; the final README has one executable build, one aggregate test, one lifecycle command, and zero focused constituent test commands.

- Observation: A fresh anonymous Windows checkout materializes the committed README and ERD consistently as CRLF, so its per-file and 140-path byte hashes differ from the mixed/LF Milestone 1 worktree hashes while the Git blobs and logical content are exact. The public clone identity is 140 paths at `6C9AAD2D5AD7A93742DCD0365A9914E3AC1F6F6A1DA42239625314FF66D96424`, README `3DC3FE2EE06C18741E465D469D3C6E451EE95C285DFA244FCE6972DF8F5D79DD`, ERD `07342854D128F05441477EFB52AE2140AFA99AFEE4795F0B9B3229E0AAD6835A`, and unchanged implementation/test/configuration `2D138DA10B0DF73FC894A6BA246E847B0925F49BE2CA22C41D894F8E4AA84524`.
  Evidence: clean detached checkout, clean `git status --short`, Git blobs `5866e476cbaa459a0e2baa5cff2110eaa4cbacd3` and `cf899ccd1c1cf797ecb2ed762115984bb70d2be4`, EOL-insensitive zero diffs, exact aggregate recomputation, and a fresh S1-equivalent public-candidate re-review `PASS` with zero findings.

- Observation: The planned non-default `POSTGRES_SCHEMA=task_014_20260822_01` substitution was not an admitted first migration target because that schema did not yet exist; the first read-only status command stopped safely with `MIGRATION_NAMESPACE_BIND_FAILED`. The README's literal `public` schema is isolated inside the newly created TASK-014-owned Compose volume and is the supported clean-clone path.
  Evidence: the failed status returned before mutation; after restoring the documented literal `public`, status reported the one migration pending, `migrate:up` applied it, applied status and `migrate:validate-emitted` passed, and teardown removed the exact volume. The command-ledger substitution is corrected below without changing the public candidate.

- Observation: The first aggregate test attempt inherited a Redis search key created by the earlier manual `SearchCharacters` example and correctly failed its empty-namespace precondition; its own cleanup removed that exact key. The authorized full-scope retry then encountered a transient Windows `EPERM` rename in a self-removed Vitest cache directory, with no task process holding the clone. A final risk-recorded aggregate rerun passed every scope.
  Evidence: the first failure named only `character-app:task-014-20260822-01:characters:search:v1:...`; exact prefix scan was empty afterward. The second failure was limited to temporary path `C:\Users\mmjos\AppData\Local\Temp\dgq5dnF6m6p8ea1qNvPMl`, which no longer existed, and an elevated read-only process scan found no orphaned TASK-014 process. The final aggregate passed unit 182/182, integration 77/77, application 37/37, and smoke 1/1.

- Observation: Immutable installation remains reproducible but npm audit metadata reports one moderate and one high transitive advisory, plus established deprecation/install-script warnings. TASK-014 does not authorize a dependency change.
  Evidence: `npm ci` exited zero with 640 packages on the exact lockfile and reported two vulnerabilities; all lint, type, build, test, smoke, and lifecycle gates subsequently passed.

## Decision Log

- Decision: Extend `README.md` as the single delivery and API guide and add exactly one `docs/ERD.md` artifact.
  Rationale: DEL-003 permits README or wiki documentation, and the existing README already owns every operational topic and GraphQL document. A second setup guide, API reference site, wiki copy, or documentation hierarchy would duplicate current ownership. DEL-002 is the sole missing artifact and merits one focused document linked from the README.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Render the ERD as checked-in Mermaid plus concise schema notes derived directly from the accepted migration and existing catalog inventory test.
  Rationale: Mermaid is natively reviewable in the repository, requires no dependency or generated binary, and keeps changes diffable. The existing migration/test boundary already supplies the authoritative schema facts, so an ERD generator or ORM-model abstraction has no present need.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Add no component, production function, repository helper, dependency, test project, fixture lifecycle, command wrapper, API-doc product, or abstraction.
  Rationale: Existing modules and root scripts already implement every runtime contract. TASK-014 delivers and verifies evidence; it does not add behavior. The clean-clone procedure can use existing PowerShell, Git, npm, Docker, and repository commands without checking in another executable owner.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Use one S1 standard-profile documentation milestone, one owner-controlled public-candidate checkpoint, and one S2 clean-clone closure milestone.
  Rationale: README and ERD form one coherent reviewer-facing deliverable. Anonymous public availability is an external-state barrier rather than an implementation milestone. The clean-clone join exercises Git, package installation, public import, PostgreSQL, Redis, GraphQL, browser, and cleanup, so it merits integrated S2 review without inventing a separate milestone per command.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Treat the README and ERD gaps as declarative evidence/setup work under ADR-0016, not as a manufactured product Red.
  Rationale: Runtime behavior already exists and is covered. A persistent `test_worker` must still bind the evidence classifications before the documentation write. `MISSING` is expected only for the ERD artifact and `PARTIAL` for the delivery guide; `CONFLICTING` or unresolved `UNKNOWN` stops dependent writes.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Correct the GraphiQL statement to say that the checked-in API server exposes JSON GraphQL at `/graphql` and keeps GraphiQL disabled.
  Rationale: Documentation must match executable composition. Adding a development toggle would be an unrequested runtime/configuration feature and would violate KISS and YAGNI.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Maintain a command ledger for every reviewer-facing README command and GraphQL example.
  Rationale: HS-018 requires executable guidance, while several existing examples contain environment-specific values or migration targets. The ledger must record the exact command, prerequisite state, literal or documented substitution, outcome, and cleanup instead of claiming that a placeholder was run verbatim or rerunning complete scopes without cause.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Stop after the accepted local candidate until public bytes are available under a recorded anonymous commit identity.
  Rationale: Plan execution is not commit/push/publication authority. DEL-001 cannot pass from a dirty worktree, local-only commit, authenticated session, or stated intent.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Preserve `024F1415C4ADA8AD56233C77500434D0218AE5CC188522FB2E70770027704B3D` as the historical accepted TASK-013 aggregate and use `2D138DA10B0DF73FC894A6BA246E847B0925F49BE2CA22C41D894F8E4AA84524` as TASK-014's refreshed current Windows materialization baseline.
  Rationale: The activation barrier explicitly requires refreshing the reuse audit when relevant materialized bytes drift. The accepted Git tree has no logical implementation/test/configuration diff, all preflight contracts remain covered, and changing product bytes merely to reproduce a platform-specific materialization hash would be outside scope.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Use the single attempt-2 documentation correction to remove duplicate full-scope validation commands before freezing Milestone 1.
  Rationale: Milestone 2 must execute the README ledger without rerunning constituent suites merely to duplicate `npm test`. Correcting the guide was within the unchanged contract and exact two-path scope; adding orchestration or accepting duplicated evidence would violate the plan's KISS and evidence-reuse rules.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Treat clean-clone CRLF hashes as the public execution identity while retaining the earlier Milestone 1 hashes as historical local materialization evidence.
  Rationale: The public SHA and Git blobs are exact, the implementation aggregate is unchanged, and EOL-insensitive comparisons prove identical document content. Adding `.gitattributes` or changing public bytes solely to force one platform hash would exceed TASK-014 scope. A fresh public-candidate reviewer accepted this reconciliation with `PASS` and no findings.
  Date/Author: 2026-08-22 / primary coordinator.

- Decision: Execute migrations in the documented `public` schema inside the unique TASK-014 Compose volume and correct only the ledger's stale non-default-schema substitution.
  Rationale: Existing migration admission binds an already existing schema; the documented `public` target is supported and isolated because the entire database volume belongs only to this run. No README, migration, runtime behavior, or schema contract changes, and exact volume teardown supplies cleanup.
  Date/Author: 2026-08-22 / primary coordinator.

This task makes no new architectural choice, so a Decision Review Contract is not applicable. DPL-DEC-054 records reversible delivery-document choices inside accepted ADR-0003, ADR-0006, ADR-0008, ADR-0014, ADR-0015, and ADR-0016.

## Outcomes & Retrospective

TASK-014 is `Complete` under owner-authorized workflow `TASK-014-20260822-01`. The activation barrier, binding documentation-only preflight, guarded Milestone 1 candidate, affected validation, fresh S1 `PASS`, exact public checkpoint, Milestone 2 anonymous clean-clone runtime/quality/cleanup packet, fresh integrated `PASS WITH FOLLOW-UPS`, resolved documentation Minor, active-location documentation gate, archival, link repair, and completed-location gate all pass. Public ref `refs/heads/codex/execplan-014` resolves anonymously to `62aa3fa7c794e17a52218c0b3fcb4f01e331af9c`; its public Windows materialization is `6C9AAD2D5AD7A93742DCD0365A9914E3AC1F6F6A1DA42239625314FF66D96424` with unchanged implementation/test/configuration aggregate `2D138DA10B0DF73FC894A6BA246E847B0925F49BE2CA22C41D894F8E4AA84524`. DEL-001 through DEL-003, SPEC-015 through SPEC-017, HS-018, and AC-012 pass. Exact runtime resources and the validated temporary clone are absent. TASK-015 remains `Pending`; TASK-014 has no remaining work.

## Purpose / Big Picture

TASK-014 turns the implemented repository into a reproducible public deliverable. A reviewer starting without local repository state should be able to access the source anonymously, clone one recorded commit, understand the relational schema, configure the supported local environment, install exact dependencies, initialize PostgreSQL, import the deterministic 15-character baseline, run the API and web application, execute all four GraphQL use cases, build and test the repository, and understand the official third-party avatar boundary.

The observable result is documentation plus public and runtime evidence, not new application behavior. Completion makes DEL-001, DEL-002, DEL-003, SPEC-015 through SPEC-017, HS-018, and AC-012 pass. TASK-015 remains the separate final acceptance and repository-baseline review.

## Context and Orientation

Read the [documentation map](../../../README.md#documentation-map) first, then use these owners:

- [TASK-014](../../IMPLEMENTATION_PLAN.md#task-014---deliver-reproducible-repository-evidence) owns scope, dependencies, status, validation intent, and closure.
- [DEL-001 through DEL-003 and AC-012](../../REQUIREMENTS.md#7-required-deliverables) own the required delivery outcomes.
- [SPEC-015 through SPEC-017 and HS-018](../../specs/README.md#codex-rule-routing) own derived source, ERD, run/API, and clean-clone evidence rules.
- [ADR-0003](../../adrs/0003-use-postgresql-for-relational-persistence.md) owns the relational persistence direction.
- [ADR-0006](../../adrs/0006-define-a-use-case-oriented-graphql-contract.md) owns the four GraphQL use cases.
- [ADR-0008](../../adrs/0008-use-deterministic-bootstrap-and-idempotent-sync.md) owns explicit deterministic import.
- [ADR-0014](../../adrs/0014-persist-and-deliver-character-image-urls-directly.md) and AUTH-001 own the exact direct avatar URL and rights boundary.
- [ADR-0015](../../adrs/0015-use-a-build-first-migration-lifecycle-with-exact-catalog-byte-lock-identity.md) is the current migration-lifecycle authority; [ADR-0012](../../adrs/superseded/0012-use-a-build-first-programmatic-migration-lifecycle.md) is historical Superseded context only.
- [ADR-0016](../../adrs/0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md), the [worker-first workflow](../../../.codex/execplan-implementation-workflow.md), and the [write-lease guard](../../../.codex/write-lease-guard.md) own execution mechanics.

Repository evidence to reuse:

- `README.md` is the existing setup, migration, import, run, build, test, and GraphQL guide.
- `.env.example`, `.node-version`, `package.json`, `package-lock.json`, `compose.yaml`, and `.github/workflows/ci.yml` define the supported toolchain and commands.
- `apps/api/src/infrastructure/database/migrations/20260814000000-create-relational-schema.ts` defines `characters`, `comments`, their constraint, relationship, and index.
- `apps/api/src/infrastructure/database/migrations/files/storage.ts` defines `sequelize_migration_history`.
- `apps/api/src/infrastructure/database/migration-lifecycle.integration.test.ts` owns the exact fresh-schema table, column, default, identity, constraint, foreign-key, index, and migration-history inventory.
- `apps/api/src/transport/graphql/schema.ts` and `apps/web/src/data/characters.graphql` define the four existing GraphQL use cases.
- `apps/api/src/server.ts` owns the runtime GraphiQL-disabled composition.
- `apps/web/server.ts`, `apps/web/src/character-card.tsx`, `apps/web/src/character-detail-route.tsx`, and `tests/smoke/walking-skeleton.smoke.test.ts` own avatar CSP, request privacy, exact URL, and fallback evidence.
- `scripts/run-smoke.ts` and `scripts/verify-smoke-lifecycle.ts` already own isolated browser process and cleanup behavior.

## Scope and Non-Goals

### Accepted reuse audit

| Required capability | Current owner and disposition | Minimal TASK-014 action |
|---|---|---|
| Public source and meaningful history | Existing Git history and configured public GitHub repository; current anonymous `main` readback matches local baseline | Record the exact accepted public candidate SHA and prove anonymous clone/read access; do not create a second repository |
| Prerequisites, configuration, install, infrastructure, migration, import, dev, test, build, start | Existing README, `.env.example`, root scripts, Compose, and CI; `PARTIAL` only because the end-to-end path is not consolidated and fully replayed | Extend the existing README in place and validate every retained command |
| Four GraphQL use cases | Existing schema, web operation documents, integration tests, and README examples | Retain the existing operations, add executable transport/variables guidance, and replay each one |
| ERD | Accepted migration plus exact catalog inventory exist; tracked diagram is `MISSING` | Add one `docs/ERD.md` with Mermaid and concise exact-schema notes |
| Avatar delivery and failure boundary | Existing ADR, CSP/server, components, and Chromium smoke are `EXISTING_AND_COVERED` | Document the exact third-party dependency, privacy/cache/outage/fallback/rights boundary and link its authorities |
| Clean-clone validation | Existing package, migration, test, smoke, lifecycle, and cleanup owners are `EXISTING_AND_COVERED` | Run them from one anonymous clean clone; add no wrapper or test project |
| GraphiQL | Runtime server disables it; README statement is documentation drift | Correct README; do not add a runtime toggle |

### In scope

- Extend `README.md` as the one reviewer-facing delivery and GraphQL usage guide.
- Add `docs/ERD.md` as a text-native migration-derived ERD.
- Bind every documented command and GraphQL example to executable evidence in a command ledger.
- Verify anonymous public source access and meaningful committed history for the accepted candidate.
- Validate the complete documented path from a clean anonymous clone against isolated local PostgreSQL and Redis.
- Compare the ERD one-to-one with the existing fresh-migration inventory contract.
- Record exact public commit, environment, candidate, external-state, READY/CLEANUP, and review identities.
- Update authoritative current-state and acceptance documentation only after evidence passes.

### Out of scope

- Any application, test, generated TypeScript, migration, schema, GraphQL, Redis, CI, Compose, configuration, or package change.
- A new component, production function, helper script, command wrapper, abstraction, repository, service, route, operation, migration, fixture, test project, documentation generator, ERD generator, Swagger/OpenAPI product, wiki copy, or hosted documentation site.
- React/frontend visual work or the frontend-visual implementation profile.
- A formatter, coverage product, scheduled job, telemetry, deployment configuration, or optional agent-flow metrics without a documented present need.
- Changing the avatar provider, host, URL mapping, delivery mechanism, application ownership of image bytes, project scope, or AUTH-001 disposition.
- Commit, push, pull request, publication, or deployment without separate exact owner authority.
- TASK-015 final acceptance beyond keeping it `Pending` and unblocked after TASK-014 closure.

## Plan of Work

### Activation barrier

1. Receive a separate project-owner request authorizing the exact registered plan under `TASK-014-20260822-01`. If the requested scope, dependency, public target, avatar boundary, or acceptance contract materially differs, keep TASK-014 `Pending` and revise/review the plan before execution.
2. Read this plan completely and confirm TASK-013 remains `Complete`, TASK-014 remains `Pending`, TASK-015 remains `Pending`, all applicable decision gates remain `Resolved`, and no AUTH-001 reopen trigger has occurred.
3. Inspect and reconcile the worktree without reverting, absorbing, staging, or overwriting unrelated user changes. Record branch, HEAD, index state, and every pre-existing modification.
4. Recompute the 139-path planning projection and require exact aggregate `D90C47825B9F16C9307401AA1BD9705A5EAA18FA9E634ABCFE862BC3C5E67237`. Separately recompute the historical accepted 138-path implementation/test/configuration projection. Activation found platform-materialization drift from historical `024F1415C4ADA8AD56233C77500434D0218AE5CC188522FB2E70770027704B3D`, refreshed the current Windows identity to `2D138DA10B0DF73FC894A6BA246E847B0925F49BE2CA22C41D894F8E4AA84524`, and confirmed no logical Git diff across the projection. Subsequent local unchanged-scope checks require the refreshed identity; a clean-clone candidate must record its own environment-specific materialization identity.
5. Recheck the configured public remote and anonymous `main` identity. This readback establishes the activation baseline only; it does not satisfy the later accepted-candidate checkpoint.
6. Have one persistent `test_worker` perform a binding read-only preflight. It must use ADR-0016's exact classifications: `EXISTING_AND_COVERED`, `EXISTING_BUT_UNCOVERED`, `MISSING`, `REGRESSION`, `PARTIAL`, `CONFLICTING`, or `UNKNOWN`.
7. Require preflight to classify runtime setup/commands, schema inventory, all four GraphQL operations, avatar boundary, public Git evidence, and clean-clone/test owners individually. Expected results are runtime contracts `EXISTING_AND_COVERED`, ERD artifact `MISSING`, and README delivery consolidation/execution detail `PARTIAL`; they must be verified, not assumed. `CONFLICTING` or unresolved `UNKNOWN` stops dependent writes.
8. Confirm no production Red is required. If preflight identifies `EXISTING_BUT_UNCOVERED`, characterize only the uncovered contract with existing test ownership. If it identifies a runtime `MISSING`, `REGRESSION`, or behavior-changing need, stop: this documentation-only plan does not authorize product/test implementation.
9. Update TASK-014 to `In progress`, record activation and exact identities in the execution log, run documentation validation, and only then create the Milestone 1 assignment packet.

### Milestone 1: Complete the delivery guide and migration-derived ERD

Risk tier: `S1`, standard profile. The planned writes are two reversible Markdown documents and do not change rendered application UI, production behavior, schema, dependencies, or a critical boundary.

Before any write, the coordinator creates a complete Milestone Assignment Packet v2 with:

- workflow `TASK-014-20260822-01`, TASK-014, one coherent cycle, attempt 1, and a fresh `code_worker` setup owner;
- exact authority anchors for DEL-001/002/003, NFR-006, AC-012, SPEC-015/016/017, HS-018, ADR-0003/0006/0008/0014/0015/0016, historical ADR-0012, and AUTH-001;
- the accepted preflight classifications and frozen acceptance contract;
- allowed write paths `README.md` and `docs/ERD.md`, with every other repository path outside the assignment;
- the exact baseline aggregate, per-path hashes, commands, working directory, Node/npm environment, no-runtime side-effect declaration, evidence-return contract, attempt budget, and stop conditions;
- prohibition on commits, staging, network publication, package installation, product/test/configuration edits, generated output, and automatic formatting outside the two paths.

Start a fresh automatic setup lease after the packet is complete and before authorizing the worker. Use exact allowed files and insert the returned digest into the packet:

    $lease = python -B .codex\leases\lease_guard.py start `
      --workflow-id TASK-014-20260822-01 `
      --task-id TASK-014 `
      --cycle-id TASK-014-20260822-01-cycle-01 `
      --lease-id TASK-014-20260822-01-cycle-01-setup-01 `
      --phase setup `
      --attempt 1 `
      --owner <code-worker-agent-id> `
      --agent-type code_worker `
      --allow-file README.md `
      --allow-file docs/ERD.md | ConvertFrom-Json
    $leaseDigest = $lease.contract_digest

The setup assignment must make only these changes:

1. Keep `README.md` as the single setup/API owner. Add a short clean-clone path and links to the public repository and ERD without duplicating requirements or ADR prose.
2. Present the existing supported sequence in prerequisite order: clone, toolchain check, immutable install, optional browser install when smoke is run, environment configuration, Compose validation/start/status, migration build/status/up/validation, deterministic import, development start, production build/start, lint/type/test/build/smoke commands, and exact teardown.
3. For every command, state the working directory, prerequisites, relevant side effect, success signal, and cleanup where ambiguity exists. Do not claim a placeholder, destructive rollback, or environment-specific value was executed literally.
4. Keep exactly the existing four GraphQL use cases: character list/search, character detail, set favorite, and add comment. Supply their variables and a concrete JSON POST transport using built-in PowerShell `Invoke-RestMethod` or an equivalently ubiquitous client already available to the reviewer. Do not add a repository helper or API dependency.
5. Correct the GraphiQL drift: the checked-in server accepts JSON GraphQL at `POST /graphql` and keeps GraphiQL disabled. Do not document a nonexistent environment toggle.
6. Document the direct-avatar boundary: exact validated official `https://rickandmortyapi.com/api/character/avatar/<positive-id>.jpeg` value, no application-owned bytes/proxy/redistribution, anonymous cross-origin/no-referrer request, fixed CSP path, browser/intermediary caching outside application control, provider availability and policy dependency, one-way layout-safe `Image unavailable` fallback without alternate source or retry, and AUTH-001's personal educational non-commercial rights scope and reopen conditions. Link to ADR-0014/AUTH-001 instead of duplicating their normative text.
7. Add `docs/ERD.md` with one Mermaid `erDiagram` for `characters`, `comments`, and `sequelize_migration_history`. Show `characters ||--o{ comments`, every persisted column and primary/foreign key, and no relationship for `image_url`. Adjacent notes must record the comments body length check, `ON UPDATE RESTRICT`, `ON DELETE RESTRICT`, `comments_character_id_idx`, defaults/identity details that Mermaid cannot express precisely, migration-history purpose, schema source paths, and the absence of image bytes/metadata/lifecycle tables.
8. Do not change any source, test, generated output, manifest, lockfile, workflow, environment sample, Compose file, ADR, requirement meaning, task edge, or acceptance status.

After the worker stops, terminally close the exact lease and require a fresh `closed-compliant` receipt. The coordinator, not the worker summary, must inspect the receipt, actual two-path diff, English-only prose, links, command accuracy, ERD accuracy, and evidence. A no-diff handoff or any unleased path change does not pass.

Validate the milestone without infrastructure:

- recompute the unchanged 138-path implementation/test/configuration aggregate;
- compute the 140-path delivery candidate over that projection plus `README.md` and `docs/ERD.md`;
- inventory every README fenced command and each of the four GraphQL examples into the command ledger;
- map every command to an existing script/executable owner and every ERD fact to the migration/storage/inventory owner;
- run documentation validation, ADR validation, targeted link/GraphiQL/ERD/forbidden-scope scans, and `git diff --check`;
- freeze the candidate aggregate, two document hashes, command ledger, preflight, lease receipt, and diff for one fresh S1 `milestone_reviewer`.

`PASS` accepts Milestone 1. `PASS WITH FOLLOW-UPS` requires explicit disposition of every item. `REVISE`, `BLOCKED`, or escalation stops advancement. Allow at most one same-contract documentation correction by the same role as attempt 2 under a new lease. Stop after the same decisive failure twice, two no-diff write handoffs, an exhausted correction budget, a required third write path, a new dependency/tool, a runtime behavior change, or any binding-field change.

### Owner-controlled public-candidate checkpoint

Milestone 1 acceptance does not make local bytes public. Stop until one of these occurs:

- the project owner supplies an anonymously accessible commit containing the exact accepted candidate; or
- the project owner separately authorizes the exact commit/push/pull-request/publication actions and target needed to make that candidate public.

Record the full public commit SHA, repository URL, branch/ref, parent/history context, publication actor/action, and accepted candidate aggregate. Anonymous `git ls-remote` must resolve the recorded ref to that SHA. An anonymous clean clone of that SHA must contain the exact `README.md`, `docs/ERD.md`, and unchanged implementation/test/configuration hashes. Authenticated browser access, a local branch, an unpushed commit, a patch, or a different remote candidate does not pass DEL-001. If public bytes differ, freeze the mismatch and return to review or owner direction; do not silently validate a different candidate.

### Milestone 2: Validate one anonymous clean clone and close TASK-014

Risk tier: `S2`, standard closure profile. The milestone joins public Git, package installation, the one documented live Rick and Morty import, PostgreSQL, Redis, GraphQL, web/API processes, Chromium, migration lifecycle, and exact cleanup. It changes no rendered UI and does not use the frontend-visual profile.

1. Create one uniquely named temporary clone directory, resolve it under the operating-system temporary directory, anonymously clone the recorded public SHA, detach at that SHA, and confirm a clean worktree. Record Git, Node 24.18.0, npm 11.16.0, Docker client/server, Linux-container, OS, and architecture identities.
2. Confirm the clone's accepted 140-path candidate and two delivery-document hashes exactly match Milestone 1. If they differ, stop without reusing local evidence.
3. Build the README command ledger before execution. Execute each retained reviewer-facing command once in dependency-safe order. For a documented placeholder, record the exact valid substitution. For an intentionally destructive migration example, run it only inside the task-owned schema and restore the forward state. If no valid positive state exists, correct the documentation or record the existing automated contract evidence; never fabricate a pass.
4. Use only the existing root scripts and process owners. Do not add a helper to simplify the validation transcript. Validate and start only the existing `rick-and-morty-dev` Compose project, using environment-only host-port overrides if documented ports are unavailable.
5. Run the immutable install and documented initialization path. The explicit `npm run import:characters` is the one authorized live public Rick and Morty request boundary for this clean-clone proof; ordinary tests and browser smoke must continue using deterministic fixtures and must make no public character JSON request.
6. Start the documented API/web mode under exact task-owned foreground process identities, execute all four GraphQL examples with their documented variables, verify response semantics and persistence/readback, exercise the documented browser route, and stop only those exact process identities. Repeat for compiled start only if the README presents it as a separate required reviewer path and no accepted existing command evidence covers it.
7. Compare `docs/ERD.md` one-to-one with the existing `inspectMigratedSchema` contract executed by the root integration suite against its freshly migrated isolated namespace. Confirm all three tables, every column/type/nullability/default/identity, primary keys, comment check, foreign key and RESTRICT actions, indexes, and migration-history row; confirm only `characters.image_url` stores image information and no image relation or byte/lifecycle table exists. Do not add an inspection function or generator.
8. Run the closure packet once on the unchanged clone candidate:

       npm run infra:config
       npm run infra:up
       npm run infra:ps
       npm run lint
       npm run typecheck
       npm run build
       npm run validate:tailwind
       npm test
       npm run test:smoke:lifecycle
       python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
       python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
       git diff --check

   Do not rerun constituent unit, integration, application, or browser scopes merely to duplicate `npm test`. Repeat a complete scope only for recorded risk, drift, failed prerequisite, or evidence invalidation.
9. Reconcile the exact smoke/lifecycle READY and CLEANUP identities. Confirm no task-owned PostgreSQL schema, Redis namespace/key, API/web listener, child process, unexpected Playwright artifact, or live public Rick and Morty request remains.
10. Always confirm the Compose target is exactly `rick-and-morty-dev`, then run `npm run infra:down` after success or failure and verify its containers, volumes, and network are absent. Do not use broad schema deletion, Redis `FLUSHDB`, process-name termination, or unrelated volume/process cleanup.
11. Remove the temporary clone only after its resolved absolute path is proven to be the uniquely created task directory under the operating-system temporary directory and all evidence has been copied into the living plan/execution record. Do not delete a workspace, repository root, or unresolved variable target.
12. Freeze the public SHA, candidate, command ledger, runtime/environment identities, GraphQL results, ERD matrix, aggregate test results, cleanup, and documentation validation for one fresh integrated `independent_reviewer` against DEL-001/002/003, NFR-006, AC-012, SPEC-015/016/017, HS-018, ADR-0003/0006/0008/0014/0015/0016, historical ADR-0012, and AUTH-001.

`PASS` may proceed to coordinator-owned documentation closure. `PASS WITH FOLLOW-UPS` requires explicit disposition of every item. `REVISE`, `BLOCKED`, or escalation stops advancement. A documentation-only correction may use one exact-path attempt-2 lease and focused re-review; product/test/configuration drift, a changed public candidate, a required dependency, or a new acceptance contract requires owner triage and invalidates dependent evidence.

### Coordinator-owned documentation closure

Only after Milestones 1 and 2 and the public-candidate checkpoint pass:

1. Update this plan's living sections with the exact commands, results, public SHA, fingerprints, command ledger, ERD comparison, GraphQL responses, review, cleanup, surprises, decisions, and retrospective.
2. Add the dated TASK-014 acceptance review and link it from `docs/reviews/README.md`.
3. Update `README.md` current status, readiness, and DEL-001/002/003 evidence without rewriting the already accepted delivery guide or claiming an unperformed external action.
4. Mark AC-012 complete in `docs/REQUIREMENTS.md` only when all three deliverables pass together.
5. Update TASK-014 and traceability/current-state owners in `docs/IMPLEMENTATION_PLAN.md`, `docs/specs/README.md`, `docs/SYSTEM_DIAGRAM.md`, the plan index, and the execution log. Update the ADR index only if its current implementation-status annotation is materially affected; do not change ADR meaning or status.
6. Keep TASK-015 `Pending`. Do not perform its final acceptance review inside TASK-014.
7. Pass the active-location task-closure documentation gate, then mark TASK-014 `Complete`.
8. Move this plan to `docs/plans/completed/` only after TASK-014 is `Complete`; validate exact source/destination paths, repair all inbound and internal links, and rerun documentation/ADR/diff validation from the completed location.
9. Report documentation impact explicitly, including the public candidate that contains the reviewer-facing README/ERD deliverables and any later local-only closure bookkeeping that has not separately been published.

## Concrete Steps

Run commands from the repository root in PowerShell unless a step explicitly operates inside the anonymous temporary clone.

Activation and authority readback:

    git status --short --branch
    git rev-parse HEAD
    git remote -v
    git ls-remote https://github.com/mmjosedaniel/rick-and-morty-explorer.git refs/heads/main
    rg -n "^\| TASK-(013|014|015)" docs/IMPLEMENTATION_PLAN.md
    rg -n "^\| DG-|AUTH-001" docs/IMPLEMENTATION_PLAN.md

Planning/candidate aggregate. Before `docs/ERD.md` exists this returns 139 paths and the planning aggregate; after the accepted document write it returns 140 paths and the candidate aggregate:

    $paths = @(
      @(git ls-files -- '.env.example' '.gitattributes' '.gitignore' '.node-version' '.github/workflows' 'compose.yaml' 'eslint.config.mjs' 'package.json' 'package-lock.json' 'playwright.config.ts' 'tsconfig.base.json' 'tsconfig.tools.json' 'vitest.config.ts' 'apps' 'packages' 'scripts' 'tests' 'README.md')
      if (Test-Path -LiteralPath 'docs/ERD.md') { 'docs/ERD.md' }
    ) | Sort-Object -Unique
    $entries = foreach ($path in $paths) { "$path`t$((Get-FileHash -Algorithm SHA256 -LiteralPath $path).Hash)" }
    $payload = [string]::Join("`n", $entries)
    "PATH_COUNT=$($paths.Count)"
    "AGGREGATE=$([Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($payload))))"

Unchanged implementation/test/configuration candidate:

    $implementationPaths = @(git ls-files -- '.env.example' '.gitattributes' '.gitignore' '.node-version' '.github/workflows' 'compose.yaml' 'eslint.config.mjs' 'package.json' 'package-lock.json' 'playwright.config.ts' 'tsconfig.base.json' 'tsconfig.tools.json' 'vitest.config.ts' 'apps' 'packages' 'scripts' 'tests') | Sort-Object -Unique
    $implementationEntries = foreach ($path in $implementationPaths) { "$path`t$((Get-FileHash -Algorithm SHA256 -LiteralPath $path).Hash)" }
    $implementationPayload = [string]::Join("`n", $implementationEntries)
    [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($implementationPayload)))

Milestone 1 validation:

    python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
    python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
    rg -n "GraphiQL|Invoke-RestMethod|characters\(|character\(|setCharacterFavorite|addCharacterComment|rickandmortyapi.com/api/character/avatar|Image unavailable|AUTH-001" README.md docs/ERD.md
    rg -n "characters|comments|sequelize_migration_history|comments_character_id_fkey|comments_character_id_idx|image_url" docs/ERD.md apps/api/src/infrastructure/database/migrations apps/api/src/infrastructure/database/migration-lifecycle.integration.test.ts
    git diff --check
    git status --short

Public candidate and clean-clone readback after the owner-controlled checkpoint:

    git ls-remote https://github.com/mmjosedaniel/rick-and-morty-explorer.git <recorded-public-ref>
    git clone --no-checkout https://github.com/mmjosedaniel/rick-and-morty-explorer.git <validated-task-temporary-directory>
    git -C <validated-task-temporary-directory> checkout --detach <recorded-full-public-sha>
    git -C <validated-task-temporary-directory> status --short
    git -C <validated-task-temporary-directory> log --oneline --decorate -n 20

The command ledger must include the exact README commands and GraphQL POSTs after Milestone 1, so this plan does not duplicate a potentially stale second command list. At closure, copy the ledger's executed command, working directory, prerequisite, result, candidate, external identity, and cleanup columns into `Artifacts and Notes`.

## Validation and Acceptance

TASK-014 may close only when all of the following are true:

| Contract | Required reproducible evidence |
|---|---|
| DEL-001 / SPEC-015 | Anonymous `ls-remote` and clean clone resolve the recorded full public SHA; the clone contains the complete accepted implementation plus README/ERD candidate; committed history is meaningful; no local/authenticated-only evidence is substituted |
| DEL-002 / SPEC-016 | `docs/ERD.md` shows all three fresh-schema tables, columns, keys, constraint, relationship, and index; it matches the existing real PostgreSQL inventory one-to-one; `image_url` is a character attribute and no image relation/bytes/lifecycle owner exists |
| DEL-003 / SPEC-017 | One README explains prerequisites, configuration, install, infrastructure, migration, import, development, production build/start, validation, cleanup, and all four GraphQL use cases with executable transport and variables |
| Avatar boundary | README accurately documents the third-party provider, exact URL shape, CSP, anonymous CORS/no-referrer request, cache/privacy/outage/fallback behavior, no application-owned bytes or retry, and AUTH-001 rights scope/reopen boundary |
| Command truth | Every retained reviewer-facing command and GraphQL example has one ledger disposition with exact prerequisites, substitutions, outcome, and cleanup; GraphiQL is not claimed available by the checked-in server |
| Clean clone / HS-018 | One anonymous clean clone completes install, initialization, four GraphQL operations, documented run path, lint, strict typecheck, build/GraphQL drift, Tailwind, root aggregate, lifecycle, docs/ADR validation, ERD comparison, and diff checking on one frozen candidate |
| Isolation and cleanup | READY/CLEANUP identities match; exact task-owned schemas, Redis keys/namespaces, listeners, child processes, Playwright artifacts, temporary clone, and the `rick-and-morty-dev` Compose project are absent after execution; no broad cleanup is used |
| NFR-006 | The accepted public commit and its parent/history evidence contain the complete source and delivery artifacts; documentation distinguishes public committed facts from local-only or unauthorized actions |
| Review and closure | Fresh S1 milestone review and fresh integrated independent review are closure-permitting; all follow-ups are dispositioned; authoritative documentation is synchronized; TASK-015 remains `Pending`; active and completed plan-location validators pass |
| Scope | The accepted 138-path implementation/test/configuration aggregate remains exact; no application/test/configuration/dependency/architecture behavior or extra documentation owner was added |

Do not declare AC-012 from partial success. DEL-001, DEL-002, and DEL-003 must all pass together on the same public candidate.

## Idempotence and Recovery

- Documentation validation, ADR validation, hashing, `git diff --check`, Git readback, and anonymous cloning are repeatable. Record network failures as blocked external evidence; do not treat cached authenticated access as anonymous proof.
- `docs/ERD.md` is manually derived once from stable existing migration/catalog owners. If the migration, storage table, or inventory test drifts, invalidate the ERD matrix and return to the reuse audit; do not add a generator automatically.
- The setup lease permits exactly two Markdown paths. Close it terminally even after failure. Never reuse a lease ID or digest, and never interpret guard compliance as semantic acceptance.
- Migration/import commands are idempotent only within their documented contracts. Run destructive rollback examples only against the exact task-owned schema, restore forward state, and preserve the primary failure if cleanup also fails.
- Use the existing run-isolated smoke/lifecycle owners. Do not kill by process name, flush Redis, delete broad schemas, remove unrelated Docker resources, or probe the live public API from ordinary tests.
- Always run exact Compose teardown after success or failure. Verify the project label before `infra:down`; environment-only free host ports are acceptable when recorded and the README contract allows them.
- If a public candidate changes after clean-clone evidence, recompute both aggregates and delivery hashes. README/ERD-only drift requires affected validation and fresh review; product/test/configuration drift invalidates the entire closure packet and stops this plan for owner triage.
- If a command is wrong, correct the documentation within one exact-path attempt-2 lease and rerun only invalidated evidence. Do not add an adapter or helper merely to preserve an inaccurate command.
- Before temporary clone removal, resolve the exact absolute path and prove it is the uniquely created TASK-014 directory under the operating-system temporary root. Never delete an unresolved variable, workspace root, repository root, home directory, or broad parent.
- Do not move this plan while TASK-014 is `Pending` or `In progress`. On closure, verify the destination is absent, move only this stable filename, repair every inbound/internal link, and validate again.

## Artifacts and Notes

Planning evidence:

- Worktree: clean `main` at `2e126b3265905309f974bdadf373ed2e74cdf360` before planning writes.
- Public baseline: anonymous public `main` resolved to the same full SHA on 2026-08-22. This is not accepted-candidate publication evidence.
- Historical accepted implementation/test/configuration projection: 138 paths at `024F1415C4ADA8AD56233C77500434D0218AE5CC188522FB2E70770027704B3D` on the TASK-013 evidence environment.
- Refreshed TASK-014 Windows materialization projection: the same 138 logical paths at `2D138DA10B0DF73FC894A6BA246E847B0925F49BE2CA22C41D894F8E4AA84524` under `core.autocrlf=true`, with no logical Git diff from the accepted TASK-013 candidate.
- Delivery reuse projection: the same projection plus `README.md`, 139 paths at `D90C47825B9F16C9307401AA1BD9705A5EAA18FA9E634ABCFE862BC3C5E67237`.
- Hash contract: sort repository-relative paths ordinally; hash each materialized file with uppercase SHA-256; create `<path><TAB><hash>` lines joined with LF and no final LF; hash the UTF-8 manifest.
- ERD inventory: zero tracked path names matched ERD/entity-relationship naming before plan creation.
- Planning validation intentionally does not run product tests, install dependencies, start Docker, contact the public character API, create a clone, or change delivery artifacts. Those actions belong to separately authorized execution.

Execution evidence checklist:

- [x] Activation identity and binding preflight classifications.
- [x] Full setup/correction packets, lease digests/receipts, actual diff, and S1 review verdict.
- [x] Accepted local 140-path candidate plus README/ERD hashes.
- [x] Public repository/ref/full SHA and anonymous candidate readback.
- [x] Clean-clone path, executed toolchain/environment identities, and command results.
- [x] Four GraphQL request/response summaries and mutation readback.
- [x] Source-to-ERD comparison matrix and fresh runtime comparison.
- [x] Aggregate test counts, smoke/lifecycle identities, clean-clone documentation/ADR results, and diff result.
- [x] Exact runtime cleanup and temporary clone removal.
- [x] Integrated verdict, closure follow-up dispositions, documentation impact, and authoritative task/acceptance state.
- [x] Completed-plan move, link repair, and completed-location validation.

### Accepted Milestone 1 evidence

- Attempt-1 lease `TASK-014-20260822-01-cycle-01-setup-02`, contract digest `319677974b004a60b990fb66c272e9a8b7971a25b9201f8d5221725b6f5a7c42`, closed compliant with receipt `d4cc6e75ebe12d699cb2a4218d19370132ccff3809e11982f4fd6c8086eb2c02`; it modified `README.md`, created `docs/ERD.md`, and recorded no unleased, forbidden, index, HEAD, or control change. Immediate pinned status reported no post-close drift.
- The unused setup-01 lease ID was rejected before creation because its proposed owner spelling was invalid; it returned no contract digest and was never reused.
- Same-contract attempt-2 lease `TASK-014-20260822-01-cycle-01-setup-03`, contract digest `fd501e4bd47b3c40647855e0eb69d7f30f1e68fc1e3e7c8a1eb75607e33f9f2f`, closed compliant with receipt `6526f919edb8c15ac229a84999ba678d4b4113a4446cf034c918476321367e63`; it modified only `README.md`, preserved the ERD hash, and recorded no unleased, forbidden, index, HEAD, or control change. Immediate pinned status reported no post-close drift. The correction budget is exhausted.
- Final local candidate: 140 paths at `827F378CBE2D603ED70FA532A67EAC1C79FF0012DCB147B662BF38CCB1D2FF6B`; `README.md` at `DA3EBECB9080F4FE07650758A30A020929B9EDBE7DFC6296F8E16CF7676D33B5`; `docs/ERD.md` at `C6C30E2AB4096CE90CE1E5757576076184367A5D574AB137F0F6E51811EA822C`; unchanged 138-path implementation/test/configuration aggregate `2D138DA10B0DF73FC894A6BA246E847B0925F49BE2CA22C41D894F8E4AA84524`.
- Affected validation: documentation 85 Markdown files/123 scenarios `PASS`; ADR 18 ADRs/38 requirements `PASS` with only the established NFR-006 warning; `git diff --check` `PASS`; 19 PowerShell blocks with zero parse errors; 17 documented `npm run` scripts with zero missing root owners; one ERD path; 20/20 ERD column rows; one build, one aggregate test, one lifecycle command, zero focused test duplicates, and four `Invoke-RestMethod` operations.
- Fresh S1 milestone review: `PASS`, zero Blocker, zero Major, zero Minor. The reviewer independently reproduced the candidate/document hashes and unchanged implementation aggregate, inspected the actual diff and owners, accepted the receipts and static evidence, and reserved public/network/Docker/test evidence for Milestone 2.

### Frozen command ledger

The rows below are the complete execution contract for the README's executable commands. Milestone 2 must record the selected public SHA, free ports, exact outputs, process identities, and cleanup against this ledger without adding a helper.

| ID | Command or block | Working directory and prerequisite | Literal or recorded substitution | Expected result | Side effect and cleanup |
|---|---|---|---|---|---|
| CL-01 | `git --version`; `node --version`; `npm --version`; `docker version`; `docker info --format '{{.OSType}}'` | Unique TASK-014 temporary parent; tools and Docker Desktop available | None | Record Git, Node 24.18.0, npm 11.16.0, Docker client/server, and `linux` | Read-only; none |
| CL-02 | `git clone https://github.com/mmjosedaniel/rick-and-morty-explorer.git`; `Set-Location rick-and-morty-explorer` | Unique TASK-014 temporary parent; owner-supplied anonymous public candidate | Exact public URL; detach/read back the separately recorded full SHA after clone | Anonymous clone succeeds and current directory is the clean candidate checkout | Creates only the child clone; remove it only after absolute-path proof and cleanup |
| CL-03 | `npm ci` | Clone root; exact Node/npm and lockfile | None | Exit zero with immutable dependency graph | Creates `node_modules`; temporary-clone removal cleans it |
| CL-04 | `npm run browser:install` | Clone root after install; Chromium required for aggregate/lifecycle evidence | None | Pinned Chromium is available | May populate the Playwright browser cache; it is an intentional prerequisite, while unexpected repository artifacts must be absent at cleanup |
| CL-05 | README environment blocks | Current PowerShell session | Record free loopback ports; keep documented `POSTGRES_SCHEMA=public` inside the unique task-owned PostgreSQL volume and use `REDIS_NAMESPACE=character-app:task-014-20260822-01` | Process environment contains valid exact values | Process-local state only; discard with the task shell; CL-18 removes the isolated database volume |
| CL-06 | `npm run infra:config`; `npm run infra:up`; `npm run infra:ps` | Clone root; environment and Linux Docker ready | Recorded free ports only | Exact `rick-and-morty-dev` model validates and PostgreSQL/Redis are healthy | Creates only that project's containers, network, and volumes; CL-18 removes them |
| CL-07 | `npm run migrate:build`; `npm run migrate:status`; `npm run migrate:up`; `npm run migrate:status`; `npm run migrate:validate-emitted` | Clone root; healthy PostgreSQL and isolated documented schema | CL-05 `public` schema in the task-owned volume | Authenticated artifact; empty then applied isolated schema; isolated emitted lifecycle passes | Applies the isolated schema; emitted validation removes its namespace; CL-18 removes the volume |
| CL-08 | `npm run import:characters` | Clone root; migrated isolated schema and internet access | IDs 1 through 15 are fixed | Exit zero with deterministic 15-character baseline | Sole live public character-JSON request; writes isolated schema/cache namespace; CL-18 cleans state |
| CL-09 | `npm run dev:apps`, then `Ctrl+C` | Clone root; initialized infrastructure | Documented ports | API 3000/web 5173 and `/` plus `/characters/1` are addressable | Exact foreground API/web owners; stop and verify their listeners/children |
| CL-10 | `npm run dev`, then `Ctrl+C` | Clone root; retained initialized volumes | Documented ports | Idempotent exact-project start plus API/web | Exact foreground owners; stop and verify before the next mode |
| CL-11 | `npm run build`; `npm start`, then `Ctrl+C` | Clone root; installed dependencies and initialized services | Documented ports | Build exits zero; API 3000/web 4173 run | Creates ignored build output and foreground owners; stop processes, then temporary-clone removal cleans output |
| CL-12 | `npm run lint`; `npm run typecheck`; `npm run validate:tailwind` | Clone root after CL-11 build | None | Each command exits zero | No persistent external state |
| CL-13 | `npm test`; `npm run test:smoke:lifecycle` | Clone root; browser, healthy services, and CL-11 build | Existing task-owned test namespaces/ports | Aggregate executes unit/integration/application/smoke once; lifecycle reports exact READY/CLEANUP once | Test-owned ephemeral schemas, Redis keys, processes, and artifacts self-clean; reconcile exact identities |
| CL-14 | `SearchCharacters` `Invoke-RestMethod` block | PowerShell with documented API running and imported task schema | Literal filter values | Parsed response contains the matching deterministic character list | Read-only GraphQL; later process/infra cleanup |
| CL-15 | `SetCharacterFavorite` `Invoke-RestMethod` block | Same | Character ID `1`, `true` | Response is ID 1 with `isFavorite: true` | Writes task schema; CL-17 reads back and CL-18 removes state |
| CL-16 | `AddCharacterComment` `Invoke-RestMethod` block | Same | Character ID `1`, body `Documented API example` | Response contains the new comment ID/body | Writes task schema; CL-17 reads back and CL-18 removes state |
| CL-17 | `CharacterDetail` `Invoke-RestMethod` block, executed after CL-15/CL-16 | Same | ID `1`, limit `20`, offset `0` | Exact detail returns `isFavorite: true` and the added comment, proving mutation readback | Read-only GraphQL; later process/infra cleanup |
| CL-18 | `npm run infra:ps`; `npm run infra:down`; `npm run infra:ps` | Clone root after foreground owner cleanup and exact project-label verification | Exact project is fixed by root scripts | Expected project is identified, teardown succeeds, final service list is empty | Irreversibly removes only `rick-and-morty-dev` containers/network/volumes |
| CL-19 | `python .agents/skills/verify-repository/scripts/validate_docs.py --repo .` | Clone root with Python | None | Documentation validation passes | Read-only |

### ERD source comparison

| ERD fact | Migration/storage owner | Existing inventory evidence | Candidate evidence |
|---|---|---|---|
| Exact three tables | Relational migration creates `characters` and `comments`; storage creates `sequelize_migration_history` | Fresh inventory expects exactly those three tables at lines 496-499 | Mermaid contains exactly those three entities at lines 7-36 |
| All 20 columns, types, nullability, defaults, and identity | Migration lines 11-40; storage lines 14-18 | Inventory lines 524-536 | Twenty column rows and all-`NOT NULL` statement at lines 41-64 |
| Three primary keys, comment check, and foreign key | Migration lines 24 and 35-40; storage line 18 | Inventory lines 561-578 | Exact names and semantics at lines 45 and 57-66 |
| `comments_character_id_idx` B-tree | Migration lines 45-46 | Inventory lines 588-595 | Line 66 |
| Character-to-comments cardinality and `RESTRICT` actions | Migration lines 38-40 | Foreign-key readback lines 575-578 | Mermaid line 7 and prose line 66 |
| Migration-history purpose | Storage records migration ID, authenticated source hash, and applied time | Inventory lines 534-536 and history-row readback | Lines 62-68 |
| Image boundary and deliberate absence | `image_url` is one `characters.text` column; exact migration/storage table set has no image table | Inventory lines 496-536 prove the exact three-table/column set | Lines 53 and 70 record the attribute and absence of any image relation/byte/proxy/cache/lifecycle table |

Public-candidate checkpoint status: `PASS`.

- Repository: `https://github.com/mmjosedaniel/rick-and-morty-explorer.git`.
- Public ref: `refs/heads/codex/execplan-014`.
- Full SHA: `62aa3fa7c794e17a52218c0b3fcb4f01e331af9c`.
- Parent: `89d2977896987313b28febbd56800e404a4020c7`; its history contains merged TASK-013 and the previously accepted application baseline.
- Provenance: the project owner explicitly authorized staging only the six current TASK-014 files, one commit with message `docs: add reproducible repository evidence`, and one push to the current branch. The coordinator verified the index contained exactly those six paths, created the commit, pushed the branch, opened no pull request, and reproduced the full SHA with anonymous `git ls-remote` over HTTPS.
- Candidate relationship: the commit contains 140-path delivery candidate `827F378C...2FF6B`, README `DA3EBECB...D33B5`, ERD `C6C30E2A...EA822C`, and unchanged implementation/test/configuration projection `2D138DA1...84524` on the Windows materialization baseline. A fresh anonymous clone must reproduce its own environment-specific implementation aggregate plus the exact README/ERD bytes before evidence can advance.

### Milestone 2 clean-clone evidence

- Clone: anonymous HTTPS checkout detached at exact public SHA `62aa3fa7c794e17a52218c0b3fcb4f01e331af9c` under `C:\Users\mmjos\AppData\Local\Temp\TASK-014-9bca7ef8c9d8481489666240677af0d6`; worktree remained clean after all commands.
- Environment: Git `2.53.0.windows.1`; Node `24.18.0`; npm `11.16.0`; Windows `10.0.26200` x64; Docker client/server `29.7.2`, Docker Desktop `4.86.0`, Linux `amd64`; PostgreSQL `18.6-alpine`; Redis `8.8.1-alpine`.
- Public clone identities: 140 paths `6C9AAD2D5AD7A93742DCD0365A9914E3AC1F6F6A1DA42239625314FF66D96424`; README `3DC3FE2EE06C18741E465D469D3C6E451EE95C285DFA244FCE6972DF8F5D79DD`; ERD `07342854D128F05441477EFB52AE2140AFA99AFEE4795F0B9B3229E0AAD6835A`; unchanged 138-path implementation/test/configuration `2D138DA10B0DF73FC894A6BA246E847B0925F49BE2CA22C41D894F8E4AA84524`.
- Migration artifact: build ID `206c246684c3a877d259f37b5d10b11f1f3fe91967b21c9cd55b7708da79a9a5`; manifest SHA-256 `a44771369812e06981962d0e05acb224242528e914194bdebade58fea1ec8a18`; empty status, first up, applied status, no-op up, default down, and reapply validation passed.
- GraphQL results: `SearchCharacters` returned only ID `1`, Rick Sanchez, the official avatar URL, and Human; `SetCharacterFavorite` returned ID `1` with `true`; `AddCharacterComment` returned ID `1` with body `Documented API example`; the final `CharacterDetail` returned the full character, `isFavorite: true`, and that comment. All four requests were JSON `POST /graphql`, status `200`, with zero GraphQL errors.
- ERD comparison: the passing integration suite exercised `inspectMigratedSchema` against fresh isolated namespaces and matched exactly three tables, 20 columns with type/nullability/default/identity, five named constraints, `RESTRICT` actions, four indexes including the B-tree character-ID index, and the authenticated history row. The static ERD matrix maps these one-to-one and confirms no image table.
- Validation: immutable install and Chromium prerequisite passed; infrastructure config/up/health passed; import was the sole live public character-JSON request; both development modes and production mode served liveness plus list/detail routes; lint, strict typecheck, build/GraphQL drift, and Tailwind passed; final aggregate passed unit 182/182, integration 77/77, application 37/37, and browser smoke 1/1; lifecycle passed 7/7; documentation passed 85 files/123 scenarios; ADR validation passed 18 ADRs/38 requirements with only the established NFR-006 warning; 19 PowerShell blocks parsed with zero errors; 17 README `npm run` owners had zero gaps; four executable GraphQL examples, 20 ERD columns, candidate fingerprint, and `git diff --check` passed.
- Cleanup: smoke READY/CLEANUP identity `a7b9e0721a2de358` matched in the passing aggregate; each lifecycle case reported its exact cleanup identity. Before Compose teardown only the isolated `public` schema remained and no `character-app:*` Redis key remained. Exact project labels were `rick-and-morty-dev`; `npm run infra:down` removed its two containers, two volumes, and network. Final project/container/volume/network scans were empty; ports 3000, 4173, 4174, 5173, 55432, and 56400 had zero listeners; no Playwright report artifact remained; the task shell exited. The clone resolved as the unique direct TASK-014 child of the OS temporary root, was clean at the exact public SHA, and was removed; post-removal existence is false.

Executed command-ledger disposition:

| IDs | Executed result, external identity, and cleanup |
|---|---|
| CL-01 through CL-04 | Exact tool identities recorded; anonymous clone/detach clean; `npm ci` installed 640 packages from the lockfile; pinned Chromium was available. npm audit metadata reported one moderate and one high transitive advisory, with no dependency change authorized. |
| CL-05 through CL-08 | Free ports 3000/4173/5173/55432/56400 were recorded; the isolated Compose project was healthy; documented `public` migration lifecycle and deterministic IDs 1-15 import passed. The rejected non-existent-schema diagnostic was read-only; only the import contacted public character JSON. |
| CL-09 through CL-12 | `dev:apps`, combined `dev`, build, compiled start, lint, typecheck, and Tailwind passed. Development and production list/detail routes plus API liveness returned `200`; every foreground owner was stopped and its listeners were absent before the next mode. |
| CL-13 | Final aggregate counts and lifecycle 7/7 passed. One full retry followed manual-key evidence invalidation and one followed a self-cleared transient Windows cache `EPERM`; no constituent suite was run separately for duplication. All test-owned schemas, keys, processes, and artifacts self-cleaned. |
| CL-14 through CL-17 | The four exact PowerShell POST blocks passed once with the literal variables; the final detail operation proved favorite/comment persistence. Exact task namespace cleanup and later Compose-volume teardown removed their state. |
| CL-18 and CL-19 | Exact project label verified; pre/post `infra:ps`, `infra:down --volumes`, documentation/ADR validation, candidate/ledger/ERD reconciliation, clean Git status, and diff check passed. All Docker and listener scans are empty; the clean exact-SHA temporary clone was removed after path proof. Only fresh integrated review remains. |

## Interfaces and Dependencies

No new code interface or package dependency is planned.

The existing external/runtime interfaces remain:

- Git over anonymous HTTPS for public source readback and clone.
- Node.js `24.18.0`, npm `11.16.0`, and the exact checked-in lockfile.
- Docker Desktop with Linux containers and the existing `rick-and-morty-dev` Compose project.
- PostgreSQL 18.6 through the existing migration/import/application boundaries.
- Redis 8.8.1 through the existing finite namespaced cache boundary.
- JSON GraphQL POST at `http://127.0.0.1:3000/graphql`; checked-in server GraphiQL remains disabled.
- Web development and compiled server commands already declared in `package.json` and README.
- Official Rick and Morty avatar URLs and the one explicit deterministic import boundary governed by ADR-0014 and AUTH-001.

## Revision Note

2026-08-22: Created and registered the planning-only TASK-014 ExecPlan after a clean-worktree, authority, public-baseline, schema, API, avatar, command, and test-owner reuse audit. Selected one README extension and one Mermaid ERD as the smallest complete change. Documentation/ADR validation, exact fingerprint reproduction, link/readback checks, and diff checking pass. TASK-014 and AC-012 remained pending; no delivery artifact, code, dependency, test, runtime behavior, task activation, commit, push, pull request, publication, or deployment was performed.

2026-08-22: The project owner separately authorized exact workflow `TASK-014-20260822-01`. The coordinator passed the activation barrier, refreshed the platform-specific 138-path materialization identity without changing logical implementation/test/configuration content, accepted the binding documentation-only preflight, transitioned TASK-014 to `In progress`, and recorded the exact local/public baselines. No deliverable, product, test, configuration, dependency, runtime behavior, acceptance result, commit, push, pull request, publication, or deployment changed during activation.

2026-08-22: Completed and accepted Milestone 1 on local candidate `827F378CBE2D603ED70FA532A67EAC1C79FF0012DCB147B662BF38CCB1D2FF6B`. Two exact-path leases closed compliant; the sole same-contract correction removed duplicate build/test execution; implementation/test/configuration bytes remained unchanged; affected validation passed; and fresh S1 review returned `PASS` with zero findings. Execution stops at the owner-controlled public-candidate checkpoint. No staging, commit, push, pull request, publication, deployment, public-candidate claim, runtime evidence, DEL-001/002/003 acceptance, AC-012 result, or task completion occurred.

2026-08-22: The project owner separately authorized staging only the six TASK-014 paths, one exact commit, and one push to `origin/codex/execplan-014`, with no pull request. Commit `62aa3fa7c794e17a52218c0b3fcb4f01e331af9c` was created with the authorized message, pushed, and reproduced anonymously at the exact public ref. The public checkpoint passes and Milestone 2 may begin; no deliverable acceptance, AC-012 result, runtime evidence, task completion, merge, pull request, or deployment is yet claimed.

2026-08-22: Completed Milestone 2 command execution, exact runtime cleanup, and validated temporary-clone removal on the anonymous detached public clone. Clean-clone hashes were refreshed for CRLF materialization with fresh public-candidate review `PASS`; the documented schema path, migrations, sole live import, both development modes, production mode, four JSON GraphQL operations, mutation readback, quality/test/lifecycle packet, ERD comparison, and documentation/ADR/diff gates passed. The aggregate required two fully recorded retries: one after manual Redis-key evidence invalidation and one after a self-cleared transient Windows cache `EPERM`; the final complete scope is green. The exact Compose project, all task listeners/artifacts, and the clone are absent. Fresh integrated review returned closure-permitting `PASS WITH FOLLOW-UPS`, zero Blocker/Major and one living-plan-currentness Minor; the coordinator accepts that follow-up and corrects the stale checklist/outcome markers in this closure update. Only coordinator-owned documentation closure remains; TASK-014 stays `In progress`, TASK-015 stays `Pending`, and no additional staging, commit, push, pull request, publication, or deployment is authorized or claimed.

2026-08-22: Passed the active-location task-closure documentation gate for 86 Markdown files/123 scenarios, ADR validation for 18 ADRs/38 requirements with only the established NFR-006 warning, and diff checking. Synchronized README delivery/readiness status, AC-012, TASK-014, SPEC/HS routing, the ADR implementation annotation, review/plan indexes, chronology, and this living record; the system diagram is not materially affected because no module or data flow changed. TASK-014 and AC-012 are `Complete`, TASK-015 remains `Pending`, and only the required completed-plan move/link validation remains. These closure records are local-only after public commit `62aa3fa7...af9c`; no additional stage, commit, push, pull request, publication, merge, or deployment is authorized or claimed.

2026-08-22: Moved this stable plan to `docs/plans/completed/` only after TASK-014 became `Complete`, repaired every inbound and internal link, and passed the completed-location gate for 86 Markdown files/123 scenarios, ADR validation for 18 ADRs/38 requirements with only the established NFR-006 warning, and diff checking. The active path is absent and completed path present. TASK-014 has no remaining work; TASK-015 remains `Pending`. The public evidence remains exact commit `62aa3fa7...af9c`; this archival bookkeeping is local-only and no additional stage, commit, push, pull request, publication, merge, or deployment occurred.
