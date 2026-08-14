# Create TASK-004 Relational Persistence from Migrations


This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.


## Purpose / Big Picture


TASK-004 will make the repository's accepted relational model reproducible from an empty PostgreSQL namespace. After the task is complete, a contributor can build one authenticated immutable native-ESM migration artifact, apply it through the private Sequelize 6 and Umzug 3 boundary, inspect status, perform bounded rollback and reapply, and use the same boundary to prepare isolated integration namespaces. A reviewer will be able to observe the accepted `characters` and `comments` schema, its keys and relationship, transactionally consistent checksummed history, deterministic command behavior, and safe same-namespace serialization without any call to the public Rick and Morty API.

This plan is intent, not implementation evidence. The current repository has healthy PostgreSQL infrastructure but no Sequelize, Umzug, PostgreSQL driver, migration command, migration source, integration project, model, migrated schema, or ERD. [DG-005](../IMPLEMENTATION_PLAN.md#dg-005---postgresql-migration-lock-namespace-identity) is `Resolved` by accepted ADR-0015, but TASK-004 remains `Pending` because it still requires separate project-owner execution authorization before any controlled artifact is added. Registering or synchronizing this plan does not cross that boundary.


## Progress


- [x] (2026-08-13 02:43Z) Read the documentation map, TASK-004 authority, mapped requirements, relevant accepted ADRs, routed SPEC/HS rules, current workspace and CI evidence, ExecPlan convention, worker-first workflow, and write-lease contract; the working tree was clean at `fa3a1f61a0f76b5e2c137973ad009a9a3604c232`.
- [x] (2026-08-13 02:43Z) Created and registered this active ExecPlan while preserving TASK-004 and DG-005 as `Pending`, adding the omitted ADR-0008 trace to the canonical task record, and adding no implementation artifact or reversible execution decision.
- [x] (2026-08-13 02:55Z) Reconciled pre-verdict execution reviews by making the absent artifact-builder boundary the executable PostgreSQL Red, keeping runtime parsing and sealed `.gitignore` maintenance out of Setup, moving artifact hardening after the happy-path vertical, replacing the failure-masking command list with a tested owned verification controller, and preserving SPEC-010 as partial through TASK-005. Documentation validation passed for 46 Markdown files, 41 requirement IDs, 1 authorization, 17 tasks, 17 SPEC rules, 20 HS rules, and 119 scenarios; ADR validation passed for 14 ADRs and 38 mapped requirements with only the known NFR-006 warning; `git diff --check` passed.
- [x] (2026-08-13 02:57Z) Obtained fresh independent registration review `PASS` with no Blocker, Major, or Minor on substantive ExecPlan SHA-256 `65BD4AE5956A26D7A63A7DA8ECB31ECA014099C1DAEAB93BDDF77CD07715DE2A`; the reviewer confirmed the gate, scope, worker-first, TDD, evidence-honesty, documentation, formatting, and negative-artifact boundaries.
- [x] (2026-08-13 03:46Z) The project owner supplied the missing separate decision-task identity by authorizing [TASK-018](./completed/TASK-018-postgresql-migration-lock-identity-decision.md); TASK-004 remains `Pending` with unchanged dependencies and no controlled implementation artifact.
- [x] (2026-08-13 06:10Z) TASK-018 allocated [Proposed ADR-0015](../adrs/0015-use-a-build-first-migration-lifecycle-with-exact-catalog-byte-lock-identity.md) after research, renewed analysis, fresh IR-A `PASS`, and ADR collision checking. Proposal status changes no TASK-004 prerequisite, dependency, status, or implementation boundary; complete final review and exact owner approval remain pending.
- [x] (2026-08-13 07:02Z) Complete fresh final IR-B returned `PASS` with no finding on exact ADR-0015 SHA-256 `E40390F66B6C0B21D3BF9C17739D3AD9D105ECE4D08A36BEF955AA777F53B741`. Exact project-owner approval remains the sole DG-005 decision action; TASK-004 is still `Pending`, its dependencies and milestones are unchanged, and no implementation or execution authorization exists.
- [x] (2026-08-13 14:21Z) A post-PASS application-domain review made that historical hash non-authorizing because persistent system schemas were admitted. TASK-018 completed symmetric 91/84/77 re-entry, renewed `DRAFT READY` analysis, a bounded IR-A correction, and distinct complete IR-A `PASS`, then primary-revised Proposed ADR-0015. TASK-004 remains `Pending` with unchanged dependencies, milestones, and implementation state.
- [x] (2026-08-13 14:45Z) TASK-018 validated corrected Proposed ADR-0015 after closing one pre-freeze artifact-local ADR-0014 carry-forward omission. Both validators, exact vectors, hygiene, preservation, authority, dependency, and negative implementation checks pass; TASK-004 remains `Pending` and unchanged.
- [x] (2026-08-13 15:16Z) TASK-018 complete fresh final IR-B returned `PASS` with no Blocker, Major, or Minor on corrected Proposed ADR-0015 SHA-256 `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3`. The review authorizes owner presentation only; TASK-004 remains `Pending`, unstarted, and unchanged.
- [x] (2026-08-13) A later source audit made that PASS/hash non-authorizing because non-UTF8 conversion lookup and template-database admission remained unresolved. The project owner authorized one named third bounded TASK-018 correction with renewed research, analysis, IR-A, primary revision, and one fresh IR-B; TASK-004 remains `Pending`, unstarted, and unchanged.
- [x] (2026-08-13 17:05Z) TASK-018 completed three comparable third-correction reports and renewed `DRAFT READY` analysis at 91/84/77. The selected pre-IR-A contract retains exact catalog bytes, requires an immediate exact-UTF8/non-template/connectable database preflight, and leaves all runtime proof to TASK-004 after approval and separate execution authorization. TASK-004 remains `Pending`, unstarted, and unchanged.
- [x] (2026-08-13 17:35Z) TASK-018 reconciled one trace-only IR-A correction, obtained complete fresh IR-A `PASS`, and primary-revised Proposed ADR-0015 with the exact three-field database preflight, identical five-field binds, diagnostics, fixtures, risks, and pinned PostgreSQL sources. Integrated validation and fresh IR-B remain; TASK-004 stays `Pending`, unstarted, and unchanged.
- [x] (2026-08-13 17:51Z) TASK-018 passed the complete third-correction integrated barrier and froze Proposed ADR-0015 SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69` for one different fresh IR-B. TASK-004 remains `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies.
- [x] (2026-08-13 18:15Z) One different complete fresh IR-B returned `PASS` with no Blocker, Major, or Minor on byte-identical Proposed ADR-0015 SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69`. Exact project-owner approval remains; TASK-004 stays `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies.
- [x] (2026-08-13) A later startup-path review made that PASS/hash historical and non-authorizing because SQL preflight cannot control connection-startup conversion/search-path state or first-query decoding. The owner selected a practical startup-controlled migration connection and authorized one named fourth bounded TASK-018 correction with renewed research, analysis, IR-A, primary revision, validation, and one fresh IR-B. TASK-004 remains `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies.
- [x] (2026-08-13) TASK-018 completed three comparable fourth-correction reports at `READY FOR RE-ANALYSIS`. The practical startup-guarded UTF8-only path retains the complete proposal at 91 without repair credit; zero-conversion and multi-encoding add disproportionate control-plane or conversion-catalog surface. TASK-004 remains `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies.
- [x] (2026-08-13) TASK-018 completed renewed fourth-correction `DRAFT READY` analysis. The pre-IR-A synthesis retains exact catalog bytes and the complete proposal at 91/100, requires a closed target descriptor and one private pure-JavaScript startup-guarded UTF8 session, suppresses Sequelize's extra version-bootstrap connection, permits no untrusted conversion, and retains the database preflight only as forward validation. TASK-004 remains `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies.
- [x] (2026-08-13) TASK-018 reconciled the supported source-trace-only IR-A correction, obtained distinct complete fresh IR-A `PASS`, and primary-revised Proposed ADR-0015 with the closed target/private session/startup guard, exact five-field preflight, interfaces, diagnostics, fixtures, risks, and pinned sources. Integrated validation and one different fresh IR-B remain; TASK-004 stays `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies.
- [x] (2026-08-13) TASK-018 passed a read-only pre-freeze semantic/trace audit and the complete fourth-correction integrated barrier, freezing Proposed ADR-0015 SHA-256 `6AD00C9533849CFAA5C793B23B3DEF5C633AAB2D4FE3D577CCA5C2B0D9DF90B6` for one different fresh IR-B. TASK-004 stays `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies.
- [x] (2026-08-13) One different complete fresh IR-B returned `PASS` with no Blocker, Major, or Minor on byte-identical Proposed ADR-0015 SHA-256 `6AD00C9533849CFAA5C793B23B3DEF5C633AAB2D4FE3D577CCA5C2B0D9DF90B6`. The exact proposal is ready for owner approval; TASK-004 remains `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies.
- [x] (2026-08-13) TASK-018 reopened the proposal under explicit owner authorization after pinned-driver review made the fourth-correction PASS/hash historical and non-authorizing by exposing live `PGREPLICATION`, `PGSSLNEGOTIATION`, and `PGAPPNAME` fallbacks. One named fifth environment-closure correction is in progress. TASK-004 remains `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies.
- [x] (2026-08-13) TASK-018 completed three comparable fifth-correction reports and renewed `DRAFT READY` analysis at 91/83/76. The selected pre-IR-A contract retains the stock private Sequelize/pure-JavaScript `pg` boundary, closes the pinned environment through exact factory values and local rejection, and leaves all runtime proof to TASK-004 after approval and separate execution authorization. TASK-004 remains `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies.
- [x] (2026-08-13) Fifth-correction IR-A returned `REVISE` only for stale cumulative invariant evidence, then complete fresh re-review returned `PASS` with no finding on corrected ExecPlan SHA-256 `C7A2DABB1DC1BF99E8D202B7BCD11D9FAB16316D349713AE311C3201D2BCA838`. TASK-018 primary-revised Proposed ADR-0015 with the selected pinned environment guard and passed integrated validation on exact ADR SHA-256 `215E31D6E78DBFA0879D916DDDAD75BA0E4E63943FC9B458DDDEE0DAA11C576C`. Fresh final IR-B remains; TASK-004 stays `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies.
- [x] (2026-08-13) Fifth final IR-B returned `REVISE` on exact ADR SHA-256 `215E31D6E78DBFA0879D916DDDAD75BA0E4E63943FC9B458DDDEE0DAA11C576C` after reproducing the pinned TLS `servername` overwrite and finding trace defects. The owner authorized TASK-018's primary to apply the named TLS/SNI and trace fixes directly without the agent workflow. TASK-004 remains `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies.
- [x] (2026-08-13) TASK-018 completed the owner-authorized direct correction and integrated primary validation on exact Proposed ADR-0015 SHA-256 `9B90D8BF366E83E038F53AFA5D520B28786F9C768B765B8FA45EC34D4A4C1528`. The correction narrows verified TLS to a validated DNS host equal to the trusted DNS name or an IP-literal host with the explicit trusted DNS name, retains all runtime proof here, and changes no TASK-004 state, dependency, milestone, or implementation scope.
- [x] (2026-08-14) The project owner replaced that broad remote/TLS proposal with the proportional `RESTRICTED-ASCII-DOMAIN` profile and authorized a direct documentation-only correction from exact ADR SHA-256 `9B90D8BF366E83E038F53AFA5D520B28786F9C768B765B8FA45EC34D4A4C1528`. TASK-004 now anticipates the exact portfolio versions, loopback/no-TLS connection, opaque target handle, eight-field startup identity, text catalog binding, and destructive deadline semantics without selecting or implementing them. TASK-004 remains `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies.
- [x] (2026-08-14) TASK-018 passed the restricted-profile primary integrated barrier and froze exact Proposed ADR-0015 SHA-256 `B38F26ED48A99CFB0D4FA99A1973637B4C9ED66AC6122598FB093A13AA3B4EC9` for fresh independent exact-artifact review. TASK-004 remains `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies; no dependency or migration artifact was added.
- [x] (2026-08-14) Fresh independent review returned `REVISE` on exact restricted-profile SHA-256 `B38F26ED48A99CFB0D4FA99A1973637B4C9ED66AC6122598FB093A13AA3B4EC9` for incomplete startup-encoding evidence, the stale PostgreSQL 18.4 security-minor pin, and asymmetric current option scores. The owner authorized TASK-018 to repair those findings directly. TASK-004 remains `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies.
- [x] (2026-08-14) TASK-018 completed the PostgreSQL 18.6/startup/comparison correction, passed the full primary integrated barrier, and froze exact corrected Proposed ADR-0015 SHA-256 `E649A26C334C16BC0B3800ECCB07C2F315F176EC0896C60D72E843765355B3E6` for fresh independent exact-artifact review. TASK-004 remains `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies; no package, image, migration, test, or implementation was changed.
- [x] (2026-08-14) TASK-018 reconciled fresh independent `REVISE` on SHA-256 `E649A26C334C16BC0B3800ECCB07C2F315F176EC0896C60D72E843765355B3E6`, recorded the owner's direct repair authorization, removed the residual current numerical comparison, and stated the startup sequence precisely. TASK-004 remains `Pending`, unstarted, and unchanged.
- [x] (2026-08-14) TASK-018 completed the precision correction, passed the full primary integrated barrier, and froze exact corrected Proposed ADR-0015 SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1` for fresh independent exact-artifact review. No TASK-004 package, image, migration, test, status, dependency, milestone, or implementation changed.
- [x] (2026-08-14) Fresh independent review returned `PASS` with no finding on exact ADR-0015 proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1`, and the project owner explicitly approved those bytes. Reciprocal synchronization accepted ADR-0015, superseded ADR-0012, resolved DG-005, and completed TASK-018 without changing TASK-004 dependencies, starting this task, or reusing the historical v1 literal.
- [ ] Obtain separate project-owner execution authorization, change TASK-004 canonically from `Pending` to `In progress`, synchronize current-status navigation, and append a `Started` progress entry before opening any worker lease.
- [x] (2026-08-14) Re-read exact accepted ADR-0015 and synchronized this waiting plan to consume its compatibility, provenance, startup, identity, deadline, ownership, diagnostics, and recovery contract without reopening those decisions.
- [x] (2026-08-14) Reconciled the project owner's confirmation that the project will remain a personal, educational, non-commercial portfolio. This plan and its pre-start authority barrier consume [AUTH-001](../IMPLEMENTATION_PLAN.md#auth-001---character-image-content-rights-authorization) only within its exact ADR-0014 direct-URL and ordinary-caching scope; TASK-004 remains `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies.
- [ ] Record the required reversible execution decisions only after re-listing current `DPL-DEC-*` IDs and before adding dependent artifacts.
- [ ] Complete the bounded setup and every serial Red-Green-Refactor cycle through the worker-first workflow, recording assignment identity, terminal lease receipt, decisive commands, and primary-coordinator acceptance.
- [ ] Pass the focused, integrated, Windows, continuous-integration, clean-checkout, negative-scope, test-relevance, documentation, and fresh independent-review barriers.
- [ ] Complete the task-closure documentation gate, change TASK-004 to `Complete` only from accepted evidence, preserve partial acceptance honestly, and move this plan to `docs/plans/completed/` with repaired links.


## Surprises & Discoveries


- Observation: TASK-002 and TASK-003 are complete and DG-005 is resolved, but TASK-004 still cannot start without separate project-owner execution authorization.
  Evidence: `docs/IMPLEMENTATION_PLAN.md` lists TASK-004 as `Pending` with exactly TASK-002 and TASK-003 as dependencies; acceptance of ADR-0015 resolved the architectural join but did not supply execution authority.

- Observation: the canonical TASK-004 governing-decision list omitted ADR-0008 even though ADR-0012 and the gate require schema migrations to stay separate from deterministic character import and all external network access.
  Evidence: ADR-0012's Context and Decision prohibit import and public-API coupling; HS-011 requires network-disabled migration execution. Registration corrects only that traceability omission.

- Observation: TASK-004 registration exposed that DG-005 required a separate task-scoped ExecPlan but had no task owner; completed TASK-018 resolved that governance input.
  Evidence: [TASK-018's completed decision plan](./completed/TASK-018-postgresql-migration-lock-identity-decision.md) preserves DG-005 research, review, exact approval, and closure. TASK-004 did not absorb that work, and its dependency list is unchanged.

- Observation: TASK-018's earlier proposal reviews remain point-in-time history, while the final exact review and owner approval are current authority evidence.
  Evidence: Restricted-profile SHA-256 `B38F26ED48A99CFB0D4FA99A1973637B4C9ED66AC6122598FB093A13AA3B4EC9` and startup/version/common-baseline SHA-256 `E649A26C334C16BC0B3800ECCB07C2F315F176EC0896C60D72E843765355B3E6` received `REVISE`. Precision-corrected proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1` received fresh independent `PASS` and explicit owner approval. ADR-0015 is Accepted, ADR-0012 is Superseded, DG-005 is Resolved, TASK-018 is Complete, TASK-004 remains Pending with exact dependencies, and implementation remains absent.

- Observation: the current GitHub Actions job runs `npm test` before starting PostgreSQL. Once TASK-004 activates `test:integration`, root `test` must include integration between unit and application scopes and therefore needs healthy PostgreSQL first.
  Evidence: `.github/workflows/ci.yml` currently runs tests before `infra:up`; ADR-0011 fixes canonical order as unit, integration, application, smoke.

- Observation: ADR-0014 calls `characters.image_url` an existing field as architectural shorthand, while current repository evidence confirms that no schema exists.
  Evidence: README current status and the DG-005 gate state. This plan treats `image_url text NOT NULL` as an accepted future schema contract, never as existing implementation.

- Observation: accepted decisions fix the semantic schema but leave reversible DDL details such as remaining identifier spellings, precise SQL types and nullability, timestamp/default expressions, comment-key generation, and foreign-key actions to TASK-004.
  Evidence: ADR-0003 and ADR-0005 define the entities and invariants without a complete SQL declaration. These details must be recorded before the first schema Red; any choice that changes accepted semantics stops for authority reconciliation instead of being hidden in a migration.


## Decision Log


- Decision: Register TASK-004 now, but keep both the task and plan in a waiting state until DG-005 is authoritatively resolved and execution is separately authorized.
  Rationale: planning documentation may continue while a gate is pending, but DG-005 explicitly prohibits starting the task or adding runner, configuration, migration, database-backed test, command, schema, or ERD artifacts.
  Date/Author: 2026-08-12 / Codex primary coordinator.

- Decision: Do not create a Decision Review Contract inside this ExecPlan.
  Rationale: this is TASK-004's implementation plan. It does not compare lock-identity options, draft a successor ADR, or resolve DG-005. The separately owned [completed TASK-018 plan](./completed/TASK-018-postgresql-migration-lock-identity-decision.md) preserves that contract and project-owner approval boundary.
  Date/Author: 2026-08-12 / Codex primary coordinator.

- Decision: Treat SPEC-010, AC-009, DEL-002, and AC-012 as contribution boundaries rather than TASK-004 completion claims.
  Rationale: TASK-004 owns the migrated schema and lifecycle; TASK-005 owns the 15-character import, TASK-014 owns the delivered ERD and clean-checkout comparison, and TASK-015 owns final acceptance closure.
  Date/Author: 2026-08-12 / Codex primary coordinator.

- Decision: Use the repository's worker-first implementation workflow after, and only after, the task becomes owner-authorized and `In progress`.
  Rationale: the workflow preserves one writer and one Red-Green-Refactor cycle at a time, while the primary coordinator retains integration, evidence acceptance, status transitions, and closure.
  Date/Author: 2026-08-12 / Codex primary coordinator.

- Decision: Make the first implemented behavioral boundary a real-PostgreSQL integration cycle and use isolated fixture migrations for rollback breadth rather than fragmenting the production schema solely to manufacture rollback steps.
  Rationale: ADR-0012 requires the first behavior through real PostgreSQL integration TDD. Fixture migrations can prove multi-step lifecycle behavior without distorting the production migration sequence; the exact production sequence remains a reversible execution choice recorded before implementation.
  Date/Author: 2026-08-12 / Codex primary coordinator.

- Decision: Produce executable migrated-state evidence for the future ERD, but do not create or claim the final ERD in TASK-004.
  Rationale: ADR-0012 and the canonical graph defer derivation and reviewer comparison of DEL-002 to TASK-014.
  Date/Author: 2026-08-12 / Codex primary coordinator.

- Decision: Treat the missing artifact-builder/migration boundary after owned PostgreSQL allocation as the first migration Red, and include the minimum authenticated artifact happy path in that same vertical.
  Rationale: no artifact can exist before the Red without violating ADR-0010, but deferring all artifact proof would let Green add behavior not required by the frozen contract. The normalized report makes the minimum build identity, manifest/mapping, emitted load, and relational schema jointly observable; later cycles add negative hardening one behavior at a time.
  Date/Author: 2026-08-12 / Codex primary coordinator.

- Decision: Make a tested task-owned verification controller, rather than a shell command list, the integrated evidence interface.
  Rationale: PowerShell native-command failures can otherwise be masked by a later success, and the current root infrastructure scripts own the developer Compose project. The controller is required to own unique resources, capture one artifact, stop dependent work, preserve the primary failure, and clean in `finally`.
  Date/Author: 2026-08-12 / Codex primary coordinator.

- Decision: Consume canonical AUTH-001 only within its recorded personal, educational, non-commercial portfolio and exact ADR-0014 direct-URL/ordinary-caching scope.
  Rationale: the [implementation plan](../IMPLEMENTATION_PLAN.md#auth-001---character-image-content-rights-authorization) owns authorization scope and reopen conditions. TASK-004 may implement its image-URL schema contribution only while that boundary remains unchanged; this plan cannot broaden authorization, and a current reopen trigger pauses the affected image-specific work for owner review.
  Date/Author: 2026-08-14 / Codex primary coordinator.


## Outcomes & Retrospective


Plan registration is complete, but execution has not started. The useful current result is a restartable, dependency-ordered implementation route with a hard gate barrier, explicit ownership boundaries, serial TDD slices, and honest downstream acceptance limits. No runtime behavior, migration interface, schema, test result, ERD, or acceptance criterion exists because of this plan.

DG-005 is now resolved through accepted ADR-0015, and this plan has been synchronized to consume that exact authority. TASK-004 remains `Pending`; no execution authorization, worker lease, package, image update, migration, integration test, or runtime evidence was created by the decision closure.

AUTH-001 remains `Authorized` only within the project owner's confirmed personal, educational, non-commercial portfolio and exact ADR-0014 direct-URL/ordinary-caching scope. This plan consumes that boundary without expanding it; the clarification changes no TASK-004 status, dependency, implementation artifact, runtime evidence, or acceptance result.

At every major milestone, append the observed outcome here, including what passed, what remains, and any unexpected cost or authority conflict. At final closure, summarize the implemented interfaces, Red-Green-Refactor evidence, runtime and CI results, residual limitations, downstream handoff to TASK-005/TASK-006/TASK-014, and the explicit documentation impact.


## Context and Orientation


The root [README](../../README.md#documentation-map) is the repository entry point and current-status owner. [Requirements](../REQUIREMENTS.md) own scope wording, the [ADR portfolio](../adrs/README.md) and individual ADRs own accepted architecture, [the implementation plan](../IMPLEMENTATION_PLAN.md) owns TASK-004, its dependencies, gate joins, and definition of done, and [the execution log](../execution/decision-and-progress-log.md) owns reversible decisions and evidence chronology. The [SPEC/HS index](../specs/README.md#codex-rule-routing) routes derived examples to ordinary automated checks; the feature files are not executable tests or evidence.

TASK-004 directly maps:

- FR-BE-003: relational persistence through Sequelize and migrations.
- NFR-003: the Sequelize and PostgreSQL part of the backend technology contract.
- DEL-002, AC-009, and AC-012: migrated-state foundations only, not complete delivery or acceptance.
- OR-001 and NFR-004 as adopted/cross-cutting strict-TypeScript and code-quality commitments.
- SPEC-010's schema-creation portion; TASK-005 retains initialization with 15 characters.
- HS-002, which requires the current accepted ADR-0015 migration boundary and prohibits ADR-0012's v1 identity.
- HS-011, which fixes the relational model, network-free execution, comment foreign key, explicit searchable columns, `image_url`, and absence of an image subsystem.
- HS-017's applicable TDD, real-infrastructure, isolation, negative-test, and relevance-audit rules.
- SPEC-016 and HS-018 only as downstream guardrails for a later ERD and honest delivery claims.

The accepted decisions governing execution are:

- [ADR-0002](../adrs/0002-use-typescript-across-the-stack.md): strict TypeScript, native ESM, independent no-emit checking, runtime validation, and production-build proof.
- [ADR-0003](../adrs/0003-use-postgresql-for-relational-persistence.md): PostgreSQL, migration-only schema creation, the `characters` and `comments` model, explicit searchable columns, required keys, and `comments.character_id` index.
- [ADR-0005](../adrs/0005-use-single-user-persistence-for-character-interactions.md): one global `is_favorite`, one-to-many comments, no user/auth ownership, and local single-reviewer semantics.
- [ADR-0008](../adrs/0008-use-deterministic-bootstrap-and-idempotent-sync.md): explicit importer ownership and strict separation between schema migration and character ingestion.
- [ADR-0010](../adrs/0010-use-a-targeted-automated-testing-strategy.md): one observable Red-Green-Refactor cycle at a time against the smallest relevant boundary.
- [ADR-0011](../adrs/0011-define-the-typescript-test-harness.md): the first root integration scope, unique run namespaces, real external PostgreSQL, serial execution within a run, run-owned cleanup, canonical test order, and separate primary/cleanup failures.
- [ADR-0012](../adrs/0012-use-a-build-first-programmatic-migration-lifecycle.md): Superseded historical build-first lifecycle. Its NFC-based `migrations:v1` lock identity must not be implemented, reused, or reinterpreted; accepted ADR-0015 carries forward only its unaffected clauses.
- [ADR-0014](../adrs/0014-persist-and-deliver-character-image-urls-directly.md): current workspace and isolation rules plus the sole image field `characters.image_url text NOT NULL`; no image relation, bytes, metadata, history, lock, proxy, or asset subsystem.
- [ADR-0015](../adrs/0015-use-a-build-first-migration-lifecycle-with-exact-catalog-byte-lock-identity.md): current accepted whole-record migration lifecycle, exact compatibility profile, restricted identifier domain, opaque target, startup/text-catalog identity, v2 lock semantics, deadline destruction, and database-local collision behavior.

TASK-004 must consume accepted ADR-0015's exact compatibility matrix rather than choose versions; admit only lower-case ASCII database, schema, and user identifiers matching `^[a-z]{1}[a-z0-9_]{0,62}$`; reject the reserved database/schema domains and every nonempty `PG*` environment variable before connection creation; and use only loopback `127.0.0.1` with TLS disabled. It must accept only a frozen, property-free handle issued by the validated configuration loader or ADR-0011 allocator and recognized through module-private `WeakMap` state. The private session must prove the exact forwarded `options=-c client_encoding=UTF8 -c search_path=pg_catalog`, the separately serializer-appended direct `client_encoding=UTF8` pair, PostgreSQL's application of both controls after authentication but before `search_path` and client-encoding initialization, `ReadyForQuery`, and every Sequelize SQL statement, `databaseVersion='18.6.0'`, and the eight-field startup identity including `server_version_num=180006`; bind database/schema through two-field `text` observations before and after the lock; derive v2 from the verified ASCII values; and destroy the physical session on an expired or late lock attempt. Advisory-lock collision tests must distinguish same-database false serialization from cross-database non-contention. These are current architecture inputs but remain unimplemented until separate TASK-004 execution authorization and TDD.

[AUTH-001](../IMPLEMENTATION_PLAN.md#auth-001---character-image-content-rights-authorization) is already `Authorized` for the image-specific schema boundary within the recorded personal, educational, non-commercial portfolio and exact direct-URL scope. That authorization neither starts TASK-004 nor proves the column exists; its current reopen conditions remain owned by the implementation plan.

Current repository evidence includes an npm workspace, strict TypeScript, API/web builds, unit/application/smoke scopes, an existing PostgreSQL 18.4 Compose service, `.env.example` PostgreSQL defaults, and a successful GitHub Actions foundation. Accepted ADR-0015 fixes PostgreSQL 18.6 for TASK-004, but the decision-only acceptance did not change the running image; TASK-004 will replace and verify the Compose pin only after separate execution authorization. The repository does not include `sequelize`, `umzug`, `pg`, `test:integration`, a migration build, a migration runner, database models/adapters, a migrated database, or an ERD. The current root `test` order is unit, application, smoke because integration is deliberately inactive.

In this plan, an immutable migration artifact is a content-addressed emitted-ESM publication authenticated under [ADR-0015](../adrs/0015-use-a-build-first-migration-lifecycle-with-exact-catalog-byte-lock-identity.md), which carries forward the unaffected ADR-0012 manifest contract. A namespace is the exact PostgreSQL database/schema pair used by one migration target. Migration history is the schema-local `sequelize_migration_history` relation whose ordered rows and normalized source checksums must be an exact prefix of the selected artifact. ADR-0015 owns the current lock identity and connection boundary.


## Scope and Non-Goals


TASK-004 includes:

- the successor-fixed compatibility profile: Node.js `24.18.0`, npm `11.16.0`, TypeScript `6.0.3`, PostgreSQL `18.6` / `postgres:18.6-alpine`, Sequelize `6.37.7`, Umzug `3.8.3`, `pg` `8.22.0`, and `pg-hstore` `2.3.4`, with transitive lockfile pins for `pg-protocol` `1.15.0` and `pgpass` `1.0.5`;
- the strict-TypeScript build generator, manifest creation and verification, private resolver, migration definition/context, checksummed storage, accepted ADR-0015 lock implementation, migrator factory, command facade, and structured diagnostics;
- version-controlled Sequelize migration source and an immutable native-ESM publication under the roots carried forward by ADR-0015;
- Sequelize models/adapters aligned with the migrated schema, without allowing model synchronization to own schema creation;
- the first real-PostgreSQL integration project, one root lifecycle wrapper, unique database/schema allocation, run-owned cleanup, and canonical root `test` registration;
- root and API-workspace migration build, up, status, down, and emitted-validation interfaces;
- the accepted `characters` and `comments` schema, keys, constraint, foreign key, and lookup index;
- transactionally atomic schema/history behavior, status, no-op, bounded rollback/reapply, drift detection, interruption/failure recovery, and lock/concurrency behavior;
- Windows and CI native emitted-runtime evidence, network-disabled execution, current-working-directory independence, and clean-checkout reproducibility; and
- migration/setup documentation and schema inventory evidence that TASK-014 can later use to derive and compare the ERD.

TASK-004 does not include:

- TASK-018's DG-005 research, Decision Review Contract, successor ADR drafting/number allocation, project-owner approval, or gate resolution;
- reselecting dependency versions, Unicode identifier support, arbitrary/remote hosts, TLS, or a different lock-timeout default inside TASK-004;
- reuse or reinterpretation of `rick-and-morty-explorer:migrations:v1`, or implementation of any lock contract other than accepted ADR-0015;
- the 15-character importer, seed data, live or mocked upstream network behavior, scheduled refresh, or any public Rick and Morty API call;
- GraphQL, Redis/cache behavior, frontend code, browser product flow, API readiness, or a migration HTTP/GraphQL endpoint;
- implicit migration at API startup, TypeScript-source execution, Sequelize CLI, Umzug default resolver/storage/FileLocker, `sequelize.sync()`, or model synchronization;
- nontransactional DDL such as `CREATE INDEX CONCURRENTLY` under the initial lifecycle;
- users, authentication, sessions, per-user favorites, comment ownership, soft deletion, locations/episodes normalization, specialized text-search indexes, Swagger, or query-timing decorators;
- image bytes, image tables/relations, media metadata, image history/lifecycle, image locks, decoders, proxies, asset routes, or caches;
- the final ERD artifact or a claim that DEL-002/AC-012 passes; and
- a claim that full SPEC-010 or AC-009 passes before TASK-005 imports exactly 15 characters.


## Plan of Work


### Worker-first assignments and barriers


After the task is `In progress`, follow the [worker-first implementation workflow](../../.codex/execplan-implementation-workflow.md) and [write-lease guard](../../.codex/write-lease-guard.md). The primary coordinator creates one self-contained `Worker Assignment Packet v1`, starts one exact-path lease, spawns one role-matched writer, closes the lease terminally, inspects the receipt and actual diff, reruns decisive checks, and accepts or rejects the barrier. No second writer runs concurrently. Every correction stops for primary triage and uses a fresh packet and lease; nobody redefines or reopens an active lease.

Anticipated assignments are listed below. Before each actual spawn, replace a path family with the smallest exact owned set and freeze every accepted test and unrelated path.

| Slice | Responsible writer | Anticipated owned path family | Advance condition |
|---|---|---|---|
| Dependency and compiler setup | `code_worker`, Setup | Exact selected manifests, sole lockfile, migration TypeScript configuration, non-secret environment configuration | Exact direct-dependency report, immutable install, strict typecheck/build, no migration behavior, and compliant terminal receipt |
| First integration registration | `test_worker`, Red | One PostgreSQL lifecycle test plus exact root/API test registry and script paths | Real PostgreSQL Red fails only for the missing lifecycle behavior; prior scopes remain green; test/registration paths are frozen |
| Integration lifecycle | `code_worker`, Green/optional Refactor | Test-only/root lifecycle implementation and exact configuration paths, never the frozen Red | Focused Red reproduced, focused integration Green, run-owned cleanup and unique namespace observed, frozen hashes exact |
| Each migration behavior | `test_worker`, Red, then `code_worker`, Green/optional Refactor | One focused test first; then the minimum migration builder/runtime/schema path set | One intended failure, same-command pass, same-command post-Refactor pass, primary inspection and acceptance |
| Declarative CI/command/documentation setup | `code_worker`, Setup only where no production behavior changes | Exact workflow, script/configuration, or command documentation paths | Structural validation plus the observable command/runtime check; no behavior smuggled into Setup |
| Integrated evidence | Primary coordinator | No delegated write ownership | Primary runs and reconciles exact hashes, scope, failures, cleanup, and current task truth |
| Final review | Fresh `independent_reviewer`, read-only | None | Exact integrated candidate receives `PASS`; findings return to primary triage, never directly to an unleased writer |

### Milestone 0: Register the plan without starting TASK-004


At registration, create this active plan, index it, link it from TASK-004, repair the ADR-0008 trace, append a `Planned` chronology row, and update root current status only to acknowledge the plan. Run documentation, ADR, and diff checks. This milestone succeeded while TASK-004 and DG-005 were both `Pending` and searches found no migration implementation artifact; later TASK-018 resolution changed only the gate state and did not start TASK-004.

### Milestone 1: Consume the resolved external gate and start deliberately


Do no migration implementation in this milestone. Completed [TASK-018](./completed/TASK-018-postgresql-migration-lock-identity-decision.md) preserves its Decision Review Contract, bounded DG-005 option comparison, repository checkpoints, collision-safe ADR allocation, exact project-owner approval, reciprocal lifecycle metadata, and DG-005 resolution. TASK-004 consumes only accepted ADR-0015.

Then re-read the successor against every milestone below, including its exact portfolio versions, restricted identifier domain, opaque-handle issuance, pre-connection guard, startup identity, text catalog binding, deadline/destruction behavior, and database-local collision semantics. If the accepted text differs from these anticipated inputs, update this living plan before execution. Obtain a separate owner directive to execute TASK-004. Change the canonical task state to `In progress`, synchronize README and the plan index, and append a distinct `Started` entry. Only that evidence permits the first worker lease.

### Milestone 2: Record reversible choices and add behavior-free prerequisites


Re-list `DPL-DEC-*` IDs and record, without changing accepted architecture, the integration project name and lifecycle command; database-versus-schema isolation allocation strategy within the accepted restricted domain; non-secret `POSTGRES_*` connection inputs; exact production migration sequence; and exact remaining DDL names, types, nullability, defaults, timestamps, key generation, and foreign-key actions. Install and verify the accepted exact compatibility profile and its transitive lockfile pins; do not reselect versions, Unicode/TLS support, or the `5000 ms` lock-timeout default here. If any runtime evidence requires a compatibility change or would alter accepted semantics, stop for the successor's compatibility review and, where its guarantees change, a successor ADR.

Use a Setup lease for only the dependency and compiler/configuration subset needed to make the first Red executable. The setup may add exact packages, strict migration build configuration, declarative non-secret environment examples, and replace the historical Compose image with exact `postgres:18.6-alpine`, but it may not edit `.gitignore` or add runtime environment parsing, a runner, resolver, storage, lock, migration, schema, database-backed test, integration registration, or migration command. Before database behavior evidence, verify the official image identity, the running `180006` server, and that 18.6 is still the latest PostgreSQL 18 minor; a later minor follows the accepted compatibility-review rule. Verify that the existing `dist/`, `build/`, and `*.tsbuildinfo` rules cover generated outputs. If runtime evidence later demonstrates a genuinely missing ignore rule, stop and route that exact maintenance as a recorded exceptional coordinator edit between leases under the write-lease contract. Record clean install, direct-dependency, typecheck, build, image/version, and negative-scope evidence. Runtime configuration parsing is production behavior and must be driven later by a focused test after the first real-PostgreSQL migration cycle.

### Milestone 3: Activate real PostgreSQL and drive the first vertical migration


Activate `test:integration` only when the first real test is added. First drive the root integration lifecycle wrapper against real PostgreSQL: Red observes the missing run-scoped namespace lifecycle; Green creates only the unique configured database/schema, invokes a caller-provided body, and cleans only its owned state in `finally`, preserving primary and cleanup failures separately. Prove two wrapper runs do not share state. Freeze the accepted test and lifecycle before migration behavior begins.

Next add the canonical empty-namespace Red required by TASK-004. It first reaches an owned empty PostgreSQL namespace and receives the opaque target handle issued by the ADR-0011 allocator, then dynamically invokes the future artifact-builder and `prepareMigratedNamespace({ target, buildRoot })` boundary needed to produce one normalized migration-contract report. That single observable contract covers the happy-path artifact build ID, selected content-addressed build root, authenticated manifest/mapping and native emitted module; the accepted tables, explicit character fields, primary keys, `comments.character_id` B-tree index and foreign key; valid and orphan-comment outcomes; global favorite storage; timestamps; `image_url text NOT NULL`; and absence of users/auth, soft deletion, an image subsystem, normalized locations/episodes, and synchronization-owned metadata. Red must fail at the stable runtime signal for the missing artifact-builder/migration boundary after namespace allocation; it cannot pretend that a selected artifact already exists or add a placeholder production boundary. Green creates the minimum valid authenticated build and migration vertical that makes the same frozen command pass: artifact build, private loopback/no-TLS session, exact eight-field preflight, explicit `READ COMMITTED` transaction, two-field pre-lock bind, the accepted v2 lock, two-field post-lock rebind, fresh history read, repository-owned resolver/storage, Sequelize migration execution, and the accepted production schema/history in the same transaction. Refactor only after the identical focused command is green.

After that cycle is accepted, drive Sequelize model and adapter definitions through their own focused Red before adding them. Their test compares model metadata and real-query behavior with the already migrated schema without calling `sequelize.sync()`; migrations remain the sole schema authority. Drive runtime database-command configuration parsing later through separate focused unit cycles before the command facade consumes environment input.

### Milestone 4: Harden and fully authenticate the immutable emitted artifact


After Milestone 3 has proved the minimum happy-path artifact inside the real PostgreSQL vertical, drive each remaining ADR-0012 artifact hardening behavior through focused unit/native-runtime cycles. Prove the normative Windows-separator, CRLF-to-LF, mapping-projection, and build-ID vector; lone-CR normalization; rejection of BOM/invalid UTF-8 and every prohibited path class; canonical migration IDs/order; complete input/output allowlists; exact one-to-one source/output mapping; and a changed authored input producing a new build ID.

Then prove process-unique staging cleanup, atomic publication to the content-addressed build root, immutable reuse by concurrent builders, and rejection of incomplete/conflicting publications. Runtime preflight must reconstruct and authenticate mappings, build ID, directory name, complete file list, roles, and checksums before database access. Separate focused cases cover runner, resolver, storage, lock, command, migration, source-map, manifest, mapping-only, missing-file, and extra-file tampering. Native emitted loading and source-map diagnostics must work from repository root, API workspace, and another current working directory. No command executes TypeScript source or deletes a published build.

### Milestone 5: Prove history, status, drift, and bounded rollback


Drive `status` on an absent history table first: it reports all selected migrations pending and mutates nothing. Drive a successful second `up` no-op. Then add one failure at a time for malformed/duplicate IDs, inserted-before-history migrations, unknown/non-prefix history, missing applied manifest entries, normalized source-checksum changes, emitted mismatches, and missing/extra outputs; each must fail before migration code or schema mutation. Mandatory asynchronous `up` and `down` exports are runtime-validated before execution.

Use isolated fixture migrations to prove rollback without distorting the production migration sequence. Cover empty-history no-op; default one-step including the single-applied case; valid `--step`; rejection of zero, negative, non-decimal, too-large, combined, unknown-target, non-applied-target, and unacknowledged multi-step selectors; `--keep-through` for first, intermediate, and latest applied IDs; acknowledged bounded multi-step rollback; and rollback/reapply. Every invalid selector returns `MIGRATION_ROLLBACK_BOUNDS` before executing a migration.

### Milestone 6: Prove transaction atomicity, failures, and recovery


For each failure case, capture schema/history before the command, inject one failure, and assert the complete pre-command state afterward. Cover forward, rollback, metadata-write, metadata-delete, interruption, transaction-incompatible DDL, and cleanup failures. A cleanup failure must not replace the primary failure. Verify that every QueryInterface and history operation uses the command transaction and that the lock is released by transaction/session cleanup.

Prove connection ownership separately: the factory constructs, holds, terminates, and closes only its private guarded Sequelize instance and single physical session, while the ADR-0011 wrapper owns only its allocated database/schema cleanup. No ownership flag, configured instance, pool, client, borrowed session, structural clone, proxy, JSON object, or object carrying an `authorized` field is accepted. For the default `5000 ms` deadline and the configurable `1..60000 ms` range, prove fixed `100 ms` polling and `query_timeout = ceil(remaining time)` on every lock query. A suspended query, elapsed deadline, or late `true` must destroy the physical connection, retire it from the pool, attempt no SQL rollback, and map to `MIGRATION_LOCK_TIMEOUT` / result two; other failures map to one and success/status/no-op to zero. Diagnostics are structured, stable, and credential-free. Simulate an ambiguous commit outcome without automatic retry; reconnect through a new private guarded session and run locked read-only status before any reviewed recovery choice.

### Milestone 7: Prove successor lock semantics and concurrency


Use only ADR-0015's opaque target, loopback/no-TLS startup, session ownership, v2 literal, restricted identifiers, framing, five positive vectors, and negative uppercase/Unicode fixtures. Prove the 63-character boundary and 64-character rejection for database/schema/user, truncated-user defense, exact `current_user`, PostgreSQL 18.6/`180006`, exact encoding/identifier limit, reserved-name rejection, every nonempty `PG*` rejection, fixed factory fields, suppression of Sequelize's extra version-bootstrap connection, exactly one physical factory-owned session, the eight ordered OIDs/values, and both exact two-field text binds before proving identical key derivation at every supported entry point. Decode the raw StartupMessage and prove exact ordered forwarding of `options=-c client_encoding=UTF8 -c search_path=pg_catalog` plus the serializer-appended direct `client_encoding=UTF8`; distinguish the `getStartupConf()` and serializer responsibilities; and prove PostgreSQL applies both controls after authentication but before `search_path` and client-encoding initialization, `ReadyForQuery`, and every Sequelize SQL statement. Forged handles must fail before Sequelize construction. Two real callers on the same namespace must both perform artifact preflight, then serialize through the accepted lock so the waiter reads history after the winner commits and completes as a no-op. Distinct schemas inside one database must remain safe even under a forced 64-bit collision; equal keys in distinct databases must not contend because advisory locks are database-local. Two ordinary disjoint namespaces using the same immutable build must overlap observably. Prove bounded timeout, destructive timeout recovery, lock visibility/release, and consistent redacted diagnostics.

Run two complete integration invocations concurrently with different run IDs. They build once, share the same immutable artifact, allocate disjoint PostgreSQL state, and clean only their own namespaces. Failure or cancellation in one run must not delete the other's schema or artifact. The lifecycle reports primary and cleanup failures separately.

### Milestone 8: Expose commands and preserve every negative boundary


Implement and prove the API workspace and root command interfaces described below. Root up/status/down first obtains one verified immutable artifact from root build, captures that exact path, and delegates transparently. `prepareMigratedNamespace` receives the ADR-0011 allocator's trusted target and selected build; the migration factory constructs and closes its private guarded Sequelize/session boundary. Emitted validation builds once and consumes the same native artifact across all database cases. Delivery remains an explicit one-shot step before API startup, not an implicit application behavior.

Drive a task-owned verification controller through focused lifecycle tests before using it as closure evidence. Its normal, injected-primary-failure, and injected-cleanup-failure cases must prove that it allocates one sanitized run ID, unique Compose project, free loopback ports, and unique PostgreSQL namespace; captures one authenticated build root; exercises the API-workspace `--artifact` interfaces with that exact root and the root facade separately; stops dependent work at the first failure; always performs only its scoped teardown in `finally`; reports cleanup failure separately; returns the primary nonzero result; and records final commit/tree state. The controller must not call the current hard-coded `rick-and-morty-dev` infrastructure scripts for its owned verification project.

Run with external network disabled and reject any public Rick and Morty API, import/seed, Redis, GraphQL, HTTP migration surface, startup migration, `sequelize.sync()`, or model synchronization coupling. Prove no skipped/focused test and no production test-environment branch. Update root `test` to unit, integration, application, smoke and make missing/empty registered integration projects fail. Update CI so PostgreSQL is healthy before root tests and scoped teardown remains unconditional; then obtain Windows and GitHub-hosted Ubuntu evidence for the same emitted artifact, lifecycle, and integration commands.

### Milestone 9: Verify, document, review, and close honestly


From a committed snapshot, verify an isolated checkout with immutable install, infrastructure health, typecheck, artifact build, status/up/no-op/down/reapply, emitted validation, every test scope, root test order, application build/smoke, documentation validators, and clean working tree. If commit/push authorization is absent, record the clean-checkout/CI join as open rather than claiming it.

Complete the ADR-0010 relevance audit across affected tests, helpers, fixtures, snapshots, skipped/focused markers, and registered projects. Update root migration/setup guidance and current status, TASK-004 authoritative state, the plan index, execution chronology, specification routing/current-state prose, and the system diagram's stale “no runner or migration exists” statement. Do not rewrite accepted ADR history. Preserve the feature-level `Specified, not executed` state and record SPEC-010 only as partially evidenced until TASK-005 implements the 15-character initialization; preserve AC-009 as partial and DEL-002/AC-012 as pending.

Obtain one fresh read-only independent review of the exact integrated candidate. Reconcile any finding through fresh bounded assignments and re-run the complete closure packet. Only the primary coordinator may mark TASK-004 `Complete`, record the documentation impact, finish this retrospective, and move the stable plan filename to `docs/plans/completed/` after every task and documentation gate passes.


## Concrete Steps


All commands run from the repository root unless another working directory is stated. These registration commands exist now:

```powershell
git status --short
python -B .agents/skills/verify-repository/scripts/validate_docs.py --repo .
python -B .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
git diff --check
```

Historical registration result: the tree contained only the authorized documentation changes; both validators passed with only the already-known nonblocking warning; diff checking passed; and TASK-004 and DG-005 remained `Pending` at registration.

Before task start, re-establish the authority barrier:

```powershell
rg -n "DG-005|TASK-004|AUTH-001" docs/IMPLEMENTATION_PLAN.md README.md docs/plans/README.md
rg -n "^# ADR-|^- Status:|^- Supersedes:|^- Superseded by:" docs/adrs docs/adrs/superseded
rg -n "DPL-DEC-[0-9]{3}" docs/execution/decision-and-progress-log.md
git status --short
```

Expected result: DG-005 is `Resolved` by an accepted reciprocal successor; AUTH-001 is still `Authorized` only within the exact personal, educational, non-commercial portfolio and ADR-0014 direct-URL/ordinary-caching boundary, or affected image-specific work remains paused for owner review; no ADR or DPL ID collision exists; the successor—not this plan—owns the new lock contract; and the working tree is understood before the coordinator changes TASK-004 to `In progress`.

The following interfaces do not exist at plan registration. They are anticipated authoritative commands that TASK-004 must create under the exact later DPL records; update this plan before the first Red if the recorded names differ:

```powershell
npm run test:integration -- --project api-persistence-integration <test-file> -t "<case>"
npm run migration:build --workspace @rick-and-morty/api
npm run migration:status --workspace @rick-and-morty/api -- --artifact <build-root>
npm run migration:up --workspace @rick-and-morty/api -- --artifact <build-root>
npm run migration:down --workspace @rick-and-morty/api -- --artifact <build-root>
npm run migrate:build
npm run migrate:status
npm run migrate:up
npm run migrate:down -- --step 1
npm run migrate:validate-emitted
```

For each production behavior, use this exact evidence pattern with one selected focused command:

```text
Red:      run the focused command; require nonzero for the intended missing behavior.
Green:    run the identical focused command; require zero after the minimum production change.
Refactor: run the identical focused command again, then `npm run typecheck`; require zero.
```

The integration-lifecycle and first real-PostgreSQL migration cycles are expected to use these future focused interfaces:

```powershell
npm run test:integration -- --project api-persistence-integration apps/api/src/infrastructure/database/postgres-lifecycle.integration.test.ts -t "isolates and cleans an owned PostgreSQL namespace"
npm run test:integration -- --project api-persistence-integration apps/api/src/infrastructure/database/migration-lifecycle.integration.test.ts -t "migrates an empty namespace to the accepted relational contract"
```

The lifecycle Red must reach PostgreSQL and fail for missing run-scoped lifecycle behavior. The migration Red must then reach an owned namespace and fail specifically because the artifact-builder/migration boundary is absent. An unrelated TypeScript/compiler, test-selection, PostgreSQL connection, namespace-allocation, or cleanup failure is a false Red and must be rejected; absence of the not-yet-created artifact builder is the intended migration Red. Each Green and post-Refactor run uses its identical focused command.

After all slices exist, the integrated local packet is one future interface whose final name must be fixed in the earlier DPL record:

```powershell
npm run verify:task-004
```

The controller must perform and report, in dependency order, immutable install and direct-dependency inspection; Chromium-only installation; unique Compose configuration/start/health; strict typecheck; one migration build whose returned absolute build root is captured; API-workspace status/up/status/no-op/down/up with that exact `--artifact`; root facade and emitted validation; unit, integration, application, smoke, ordered root test, builds, Tailwind and smoke-lifecycle checks; documentation and ADR validators; `git diff --check`; `git rev-parse HEAD`; and final `git status --short`. It must stop dependent checks after the first failure while continuing independent diagnostics, run scoped teardown from `finally`, preserve the primary failure separately from cleanup failure, and return the primary code. Its own failure-injection tests must pass before this command is accepted as evidence.

Use a generated unique Compose project, free explicit loopback ports, and unique PostgreSQL namespace so an unrelated local service is never terminated. Do not delegate verification ownership to the hard-coded development Compose project or rely on a plain PowerShell list whose final successful command could mask an earlier native-process failure.

For the final isolated checkout, create a verified temporary directory outside the source tree, clone the exact committed snapshot with local-object shortcuts disabled, run the same packet, and prove the clone stays clean at the same commit. Resolve and inspect the absolute temporary target before any cleanup. Never use a repository root, home directory, unresolved variable, or broad recursive deletion target.


## Validation and Acceptance


Registration has no production TDD cycle because it changes only planning/navigation documents. Its replacement evidence is validator success, plan-index/task-link consistency, a clean negative-scope search, the current scope-bound AUTH-001 join, and unchanged `Pending` states.

Implementation acceptance requires recorded assignment identity, worker role, terminal compliant lease result, exact Red/Green/post-Refactor command and outcome, primary-coordinator diff inspection, and primary acceptance for every behavior slice. A worker summary, passing guard, plan checkbox, or CI configuration is insufficient by itself.

The following matrix is cumulative:

| Contract | Required observable evidence | Authority boundary |
|---|---|---|
| Empty namespace | One selected emitted artifact creates the accepted schema/history from empty PostgreSQL; second up no-ops | FR-BE-003, NFR-003, TASK-004, ADR-0003, ADR-0012 successor, HS-011 |
| Schema | Explicit character search columns, global favorite, comment PK/FK/index, valid relationship acceptance, orphan rejection, non-null text image URL, aligned models | ADR-0003, ADR-0005, ADR-0014, AUTH-001, HS-011 |
| Negative schema | No users/auth, soft deletion, normalized location/episode, image subsystem, opaque payload, sync-owned schema, or specialized unmeasured index | ADR-0003, ADR-0005, ADR-0014, HS-011 |
| Artifact integrity | Exact normative vector and all path/byte/mapping/allowlist/publication/tampering/native-ESM cases pass before database access | ADR-0002 and unaffected ADR-0012 artifact clauses |
| History and rollback | Exact-prefix checksummed history, read-only status, bounded selectors, rollback/reapply, drift rejection before mutation | Unaffected ADR-0012 lifecycle clauses |
| Atomic failure | Forward, rollback, history, interruption, incompatible-DDL, cleanup, and ambiguous-commit cases preserve the defined pre-command state/recovery boundary | ADR-0012 successor and ADR-0010 |
| Application namespace | Only private-`WeakMap` handles from the validated loader/ADR-0011 allocator pass; clones, proxies, JSON, empty/uppercase/Unicode/hyphen/64-character names, reserved databases/schemas, incompatible startup identity, and every nonempty `PG*` fail before mutation, with pre/post database/schema text observations exact | ADR-0015, ADR-0003, ADR-0011 |
| Lock/concurrency | Five v2 vectors pass in both reference runtimes; same namespace serializes after fresh read; forced same-database schema collision remains safe; equal keys in distinct databases do not contend; hung/late acquisition destroys and retires the session at deadline; ordinary disjoint namespaces overlap | ADR-0015, ADR-0011 |
| Interfaces | Workspace/root build, up, status, down, preparation, emitted validation and result codes work from documented CWDs on Windows and CI | ADR-0011 and ADR-0012 successor |
| Forbidden coupling | Network-disabled run finds no import/seed/upstream API, Redis, GraphQL, HTTP/startup migration, TS-source execution, CLI/default storage, sync, or published-build deletion | ADR-0008, ADR-0012 successor, HS-002, HS-011 |
| Test portfolio | Root integration is real, nonempty, isolated, and ordered unit -> integration -> application -> smoke; no skipped/focused/weakened/residual test artifact | ADR-0010, ADR-0011, HS-017 |
| Documentation truth | Commands and current status match runtime; system/spec wording no longer claims absence; no ADR history is rewritten; partial acceptance remains explicit | HS-018 and task-closure gate |

TASK-004 is done only when all of these are true:

- DG-005 was resolved before any controlled artifact was added, and the implementation matches ADR-0015 rather than ADR-0012's prohibited NFC `v1` identity.
- AUTH-001 remained `Authorized` within the exact personal, educational, non-commercial portfolio and ADR-0014 direct-URL/ordinary-caching boundary throughout affected image-schema work; any reopen trigger was reconciled before that work resumed.
- Forward migration from empty PostgreSQL plus documented rollback, no-op, drift, failure, recovery, lock, concurrency, artifact, command, and cleanup behavior passes against real isolated PostgreSQL with no external API call.
- Strict no-emit and native emitted-ESM evidence passes under exact locked dependencies on Windows and GitHub-hosted CI.
- A committed clean checkout reproduces install, infrastructure, migrations, tests, build, and documentation checks without unowned residue.
- The relevance and negative-scope audits pass and every generated/runtime artifact has an explicit owner or ignore rule.
- A fresh independent integrated review returns `PASS` with no unresolved finding.
- The documentation-impact review and validators pass, TASK-004 alone becomes `Complete`, and the plan is preserved under `completed/`.
- AC-009 remains incomplete pending TASK-005, DEL-002 and AC-012 remain incomplete pending TASK-014/15, SPEC-010 remains only partially evidenced, and acceptance remains 0/12 unless separate completed evidence changes another criterion.


## Idempotence and Recovery


Plan registration and validation are safe to repeat. Do not rewrite or delete historical ADRs, completed plans, review records, or progress rows; append new chronology and update current authority owners in place.

Migration build is idempotent only by the accepted content-addressed contract: identical authenticated inputs may reuse an exactly verified immutable publication; commands never replace or delete it. Up/status/down must implement their accepted no-op and bounded semantics. Failed mutating commands leave schema and history at the pre-command state; ambiguous commit never retries automatically. Integration cleanup removes only the run's exact database/schema and reports cleanup failure separately.

DG-005 is resolved, but absence of separate TASK-004 execution authorization still requires stopping before implementation. If accepted ADR-0015 later conflicts with this plan, update the authority first, then this living plan, then obtain fresh review where required. Never infer a lock contract from the old `v1` vectors.

If an AUTH-001 reopen trigger is observed, stop affected image-schema writes, update the implementation plan's canonical authorization record first, and resume only after the project owner records a current disposition and the ordinary task, plan, and specification synchronization is complete.

For worker execution, one coordinator-owned lease exists at a time. Unexpected paths, baseline drift, guard failure, false Red, frozen-test change, or semantic concern stops writes. Preserve the worker diff and receipt for inspection; do not reset, revert, or overwrite user/peer work. Reconcile the last accepted barrier, issue a fresh packet/lease, and resume only from the primary coordinator's explicit acceptance.

For local/CI infrastructure, use unique project names, run IDs, and loopback ports; inspect ownership before teardown. Teardown is always scoped and idempotent. Do not stop or remove an unrelated PostgreSQL process, schema, container, volume, network, or published build.


## Artifacts and Notes


Registration baseline:

```text
HEAD: fa3a1f61a0f76b5e2c137973ad009a9a3604c232
TASK-004: Pending
DG-005: Resolved
Present: PostgreSQL/Redis Compose, strict TypeScript, unit/application/smoke harness
Absent: Sequelize, Umzug, pg, integration scope, migration runtime/source/commands, models, migrated schema, ERD
```

Keep later evidence concise in this section:

- accepted ADR-0015 path, approved artifact digest or commit, and authoritative synchronization evidence;
- task-start authorization and exact start baseline;
- DPL IDs for exact dependency/configuration/DDL choices;
- each cycle ID, Red lease/receipt, frozen-test hash, Green lease/receipt, exact commands, and primary acceptance;
- one selected immutable artifact path/build ID and manifest digest used by integrated validation;
- run IDs, PostgreSQL namespaces, lock diagnostics, cleanup results, and relevant failure excerpts without credentials;
- Windows, GitHub Actions, and clean-checkout commit/run evidence;
- final review verdict and documentation validator summaries.

Link to historical ADR-0012 and current [ADR-0015](../adrs/0015-use-a-build-first-migration-lifecycle-with-exact-catalog-byte-lock-identity.md) for normative path, byte, manifest, transaction, rollback, and concurrency details instead of duplicating their full contracts here. Link to the [completed TASK-002 decision plan](./completed/TASK-002-sequelize-migration-lifecycle-decision.md) for historical research/review, and to the execution log for chronology.


## Interfaces and Dependencies


The completed task must establish these exact architectural interfaces under accepted ADR-0015:

- Authored migration root: `apps/api/src/infrastructure/database/migrations/`.
- Immutable publication root: `apps/api/dist/infrastructure/database/migrations/builds/<build-id>/`.
- Repository-owned mandatory asynchronous `MigrationDefinition.up` and `.down` receiving QueryInterface, exact schema, and command transaction context.
- `createMigrator({ target, buildRoot, manifestPath, logger, lockTimeout })` receiving only a frozen property-free target handle recognized by module-private `WeakMap` state and constructing one private loopback/no-TLS Sequelize/session boundary.
- Schema-local `sequelize_migration_history` with unique `migration_id`, normalized `source_sha256`, UTC `applied_at`, and exact-prefix semantics.
- `prepareMigratedNamespace({ target, buildRoot })` for ADR-0011's allocator-owned namespace wrapper; it never accepts or borrows Sequelize, pool, client, stream, or socket objects.
- API workspace `migration:build`, `migration:up --artifact`, `migration:status --artifact`, and bounded `migration:down --artifact` interfaces.
- Root `migrate:build`, `migrate:up`, `migrate:status`, `migrate:down`, and `migrate:validate-emitted` interfaces.
- Root `verify:task-004` controller with unique infrastructure ownership, one captured artifact, primary-versus-cleanup failure preservation, and final Git-state evidence.
- Root `test:integration` lifecycle interface and a unique Node-environment migration/persistence project; root `test` order becomes unit, integration, application, smoke.
- Explicit one-shot delivery migration before application startup; no HTTP/GraphQL or implicit startup surface.

Dependencies are fixed by accepted [ADR-0015](../adrs/0015-use-a-build-first-migration-lifecycle-with-exact-catalog-byte-lock-identity.md) rather than selected here: Node.js `24.18.0`, npm `11.16.0`, TypeScript `6.0.3`, PostgreSQL `18.6` / `postgres:18.6-alpine`, Sequelize `6.37.7`, Umzug `3.8.3`, `pg` `8.22.0`, and `pg-hstore` `2.3.4`, with `pg-protocol` `1.15.0` and `pgpass` `1.0.5` pinned transitively in the sole root lockfile. Do not use ranges, Sequelize 7 alpha/CLI, or substitute packages. Before implementation and delivery evidence, confirm that 18.6 remains the latest PostgreSQL 18 minor; a later minor requires explicit source/runtime compatibility review and replaces the implementation pin when guarantees reproduce. Any guarantee-changing or unreproducible version change requires a successor ADR. Reuse native ESM, Vitest `4.1.10`, and the GitHub Actions route.

Accepted ADR-0015 owns the restricted identifier domain, opaque target issuance, exact profile and pre-connection guard, migration-lock version literal, text catalog-bound identity, framing, vectors, signed PostgreSQL binding, database-local collision semantics, timeout/destruction contract, rebind limits, lock lifetime, least-privilege proof, and session/connection ownership. This plan consumes those values and intentionally does not reopen them.


## Revision Note


- 2026-08-12 / Codex primary coordinator: Created and registered the TASK-004 implementation ExecPlan against the completed TASK-002/TASK-003 foundation. The plan keeps TASK-004 `Pending`, treats DG-005 as a separately owned approval prerequisite, adds no Decision Review Contract or implementation artifact, repairs the ADR-0008 task trace, defines worker-first serial TDD and verification milestones, and preserves TASK-005/TASK-014/TASK-015 ownership of import, ERD, and final acceptance.
- 2026-08-12 / Codex primary coordinator: Reconciled pre-verdict executability review by excluding runtime parsing and sealed `.gitignore` maintenance from Setup, defining a reachable missing-builder PostgreSQL Red with minimum happy-path artifact evidence, reserving later artifact cases for hardening, moving integration tests outside the authored migration root, replacing a failure-masking PowerShell list with a tested uniquely owned verification controller, and preserving SPEC-010's partial state through TASK-005. Updated the living decisions, milestones, commands, validation, interfaces, progress, and recovery implications together.
- 2026-08-12 / Codex primary coordinator: Recorded the fresh independent registration `PASS` after the reviewer found no remaining Blocker, Major, or Minor. This verdict confirms plan readiness only; TASK-004 and DG-005 remain `Pending`, implementation remains absent, and a separate execution directive is still required after gate resolution.
- 2026-08-13 / Codex primary coordinator: Linked the newly owner-authorized TASK-018 decision plan as the separate DG-005 owner and resolved only this plan's missing task-identity input. TASK-004 remains `Pending`, its dependencies and implementation milestones are unchanged, and no migration artifact or execution authorization was added.
- 2026-08-13 / Codex primary coordinator: Synchronized the allocation of Proposed ADR-0015 after TASK-018 research, renewed analysis, fresh IR-A `PASS`, and collision checking. This update records evaluated exact catalog-byte/v2 direction only: ADR-0012 remains `Accepted`, DG-005 and TASK-004 remain `Pending`, TASK-004 dependencies and milestones are unchanged, complete final review and exact owner approval remain required, and no migration artifact or execution authorization was added.
- 2026-08-13 / Codex primary coordinator: Recorded complete fresh final IR-B `PASS` on exact ADR-0015 after one bounded documentation correction cycle. Exact owner approval remains the sole DG-005 decision action; ADR-0012 remains `Accepted`, DG-005 and TASK-004 remain `Pending`, TASK-004 dependencies and milestones are unchanged, and no migration artifact or execution authorization was added.
- 2026-08-13 / Codex primary coordinator: Preserved the prior PASS/hash as historical after the application-domain review, then synchronized TASK-018's symmetric 91/84/77 re-entry, renewed `DRAFT READY`, bounded IR-A correction, distinct complete IR-A `PASS`, and primary Proposed-ADR revision. Added only anticipated downstream proof for provenance, system-schema exclusion, privileged/least-privilege paths, and name-visible rebind limits. Integrated validation, fresh final IR-B, exact owner approval, and separate execution authorization remain required; TASK-004 status, dependencies, milestones, and implementation remain unchanged.
- 2026-08-13 / Codex primary coordinator: Recorded corrected Proposed ADR-0015 integrated validation after the pre-freeze ADR-0014 carry-forward sentence was added. Complete fresh final IR-B, exact owner approval, and separate execution authorization remain required; TASK-004 status, dependencies, milestones, and implementation remain unchanged.
- 2026-08-13 / Codex primary coordinator: Recorded complete fresh final IR-B `PASS` with no finding on corrected Proposed ADR-0015 SHA-256 `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3`. Exact owner approval and separate execution authorization remain required; TASK-004 status, dependencies, milestones, and implementation remain unchanged.
- 2026-08-13 / Codex primary coordinator: Preserved the second final PASS/hash as historical after source review exposed non-UTF8 default-conversion lookup and template-database admission. Recorded the project owner's authorization for one named third bounded TASK-018 correction and added only anticipated downstream encoding/database-class proof. TASK-004 status, dependencies, milestones, execution authorization, and implementation remain unchanged.
- 2026-08-13 / Codex primary coordinator: Synchronized three comparable third-correction reports and renewed `DRAFT READY` analysis selecting exact catalog bytes with an immediate UTF8/non-template/connectable database preflight. Fresh IR-A still gates ADR revision; no migration artifact, dependency, status, milestone, execution authorization, or implementation changed.
- 2026-08-13 / Codex primary coordinator: Synchronized the trace-only IR-A correction, complete fresh IR-A `PASS`, and primary third-correction revision of Proposed ADR-0015. Added only the already anticipated downstream UTF8/database-class/raw-result fixtures; integrated validation, fresh IR-B, exact owner approval, and separate TASK-004 execution authorization remain. TASK-004 status, dependencies, milestones, and implementation are unchanged.
- 2026-08-13 / Codex primary coordinator: Recorded the complete third-correction integrated barrier and frozen Proposed ADR-0015 SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69`. One different fresh IR-B, exact owner approval, and separate TASK-004 execution authorization remain; TASK-004 status, dependencies, milestones, and implementation are unchanged.
- 2026-08-13 / Codex primary coordinator: Recorded one different complete fresh IR-B `PASS` with no finding on byte-identical Proposed ADR-0015 SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69`. Exact owner approval and separate TASK-004 execution authorization remain; TASK-004 status, dependencies, milestones, and implementation are unchanged.
- 2026-08-13 / Codex primary coordinator: Preserved the third final PASS/hash as historical and non-authorizing after startup-path review proved that SQL preflight cannot govern connection-startup conversion/search-path state or first-query decoding. Recorded the owner's practical startup-controlled direction and one named fourth bounded TASK-018 correction. TASK-004 stays Pending and unstarted with exactly TASK-002/TASK-003 dependencies; no implementation, dependency, milestone, or execution authorization changed.
- 2026-08-13 / Codex primary coordinator: Synchronized three complete fourth-correction startup-control reports at `READY FOR RE-ANALYSIS`. They retain the practical startup-guarded UTF8-only direction and leave exact semantics to renewed analysis; no TASK-004 dependency, status, milestone, execution authorization, or implementation changed.
- 2026-08-13 / Codex primary coordinator: Synchronized complete fourth-correction `DRAFT READY` analysis selecting exact catalog bytes plus one closed-target, private pure-JavaScript startup-guarded UTF8 session with no untrusted conversion, suppressed version-bootstrap connection, and forward-only five-field preflight. Fresh IR-A still gates ADR revision; no TASK-004 dependency, status, milestone, execution authorization, or implementation changed.
- 2026-08-13 / Codex primary coordinator: Synchronized the supported source-trace-only IR-A correction, distinct complete fresh IR-A `PASS`, and primary fourth-correction revision of Proposed ADR-0015. Replaced only the anticipated configured/borrowed connection boundary with the closed target/private guarded session and added its downstream startup/protocol/ownership proof. Integrated validation, one different fresh IR-B, exact owner approval, and separate TASK-004 execution authorization remain; TASK-004 status, dependencies, milestones, and implementation are unchanged.
- 2026-08-13 / Codex primary coordinator: Recorded the read-only pre-freeze audit `PASS` after correcting the last stale ownership-flag wording, then recorded the complete integrated barrier and frozen Proposed ADR-0015 SHA-256 `6AD00C9533849CFAA5C793B23B3DEF5C633AAB2D4FE3D577CCA5C2B0D9DF90B6`. One different fresh IR-B, exact owner approval, and separate TASK-004 execution authorization remain; TASK-004 status, dependencies, milestones, and implementation are unchanged.
- 2026-08-13 / Codex primary coordinator: Recorded one different complete fresh IR-B `PASS` with no Blocker, Major, or Minor on byte-identical Proposed ADR-0015 SHA-256 `6AD00C9533849CFAA5C793B23B3DEF5C633AAB2D4FE3D577CCA5C2B0D9DF90B6`. Exact owner approval and separate TASK-004 execution authorization remain; TASK-004 status, dependencies, milestones, and implementation are unchanged.
- 2026-08-13 / Codex primary coordinator: Preserved the fourth-correction PASS/hash as historical after pinned-driver review exposed incomplete ambient fallback closure, then recorded the owner's authorization for one named fifth environment-closure correction. TASK-004 remains `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies; no implementation or execution authorization was added.
- 2026-08-13 / Codex primary coordinator: Synchronized three comparable fifth-correction reports and renewed `DRAFT READY` analysis selecting the stock pinned environment guard at 91 over the sanitized subprocess at 83 and closure-bound adapter at 76. Added only anticipated downstream proof for exact environment disposition, startup/TLS/session capture, pgpass non-entry, zero connection work on rejection, two-check behavior, source drift, and the unchanged one-session lifecycle. Fresh IR-A still gates ADR revision; TASK-004 status, dependencies, milestones, and implementation remain unchanged.
- 2026-08-13 / Codex primary coordinator: Recorded fifth-correction IR-A `REVISE`, the one supported cumulative-invariant evidence correction, complete fresh IR-A re-review `PASS` on ExecPlan `C7A2DABB1DC1BF99E8D202B7BCD11D9FAB16316D349713AE311C3201D2BCA838`, primary Proposed-ADR revision, and integrated validation of exact ADR SHA-256 `215E31D6E78DBFA0879D916DDDAD75BA0E4E63943FC9B458DDDEE0DAA11C576C`. The update adds only anticipated downstream proof for the exact stock guard; fresh final IR-B remains. TASK-004 status, dependencies, milestones, execution authorization, and implementation are unchanged.
- 2026-08-13 / Codex primary coordinator: Recorded fifth final IR-B `REVISE` on exact ADR SHA-256 `215E31D6E78DBFA0879D916DDDAD75BA0E4E63943FC9B458DDDEE0DAA11C576C` and the owner's direct no-agent authorization for the named TLS/SNI and trace repair. Added only anticipated downstream proof for DNS-equal and IP-host TLS positives, local mismatch rejection, and captured effective `tls.connect` options. TASK-004 status, dependencies, milestones, execution authorization, and implementation remain unchanged.
- 2026-08-13 / Codex primary coordinator: Recorded the completed direct correction and integrated primary validation of exact Proposed ADR-0015 SHA-256 `9B90D8BF366E83E038F53AFA5D520B28786F9C768B765B8FA45EC34D4A4C1528`. The downstream proof now explicitly covers validated DNS-host/equal-name and IP-host/distinct-name positives; DNS mismatch, socket-path, bracketed-IP, and unsupported-relation local negatives; captured effective `tls.connect` options; and locked-source drift. The required exact-artifact review, owner approval, and separate TASK-004 execution authorization remain; TASK-004 status, dependencies, milestones, and implementation are unchanged.
- 2026-08-14 / Codex primary coordinator: Synchronized the project-owner-selected `RESTRICTED-ASCII-DOMAIN` proposal from historical base SHA-256 `9B90D8BF366E83E038F53AFA5D520B28786F9C768B765B8FA45EC34D4A4C1528`. TASK-004 now consumes, without redeciding, the exact compatibility profile, lower-case ASCII domain, loopback/no-TLS guard, opaque private-`WeakMap` handle, eight-field startup identity, text catalog binding, five v2 vectors, deadline-triggered session destruction, and database-local collision behavior. Primary integrated validation passed and exact Proposed ADR-0015 SHA-256 `B38F26ED48A99CFB0D4FA99A1973637B4C9ED66AC6122598FB093A13AA3B4EC9` is frozen; independent review, owner acceptance, and separate TASK-004 execution authorization remain. TASK-004 status, dependencies, and implementation are unchanged.
- 2026-08-14 / Codex primary coordinator: Recorded fresh independent `REVISE` on restricted-profile SHA-256 `B38F26ED48A99CFB0D4FA99A1973637B4C9ED66AC6122598FB093A13AA3B4EC9` and the owner's direct correction authorization. Anticipated TASK-004 proof now distinguishes `getStartupConf()` options forwarding from the serializer-appended UTF8 pair, captures exact packet/order and pre-SQL effect, targets PostgreSQL 18.6/`postgres:18.6-alpine`/`180006`/`databaseVersion='18.6.0'`, and verifies the current-minor rule. TASK-004 remains `Pending`, unstarted, and unchanged with exactly TASK-002 and TASK-003 as dependencies; no image, package, migration, test, or implementation was changed.
- 2026-08-14 / Codex primary coordinator: Recorded the complete startup/version/comparison primary integrated barrier and exact corrected Proposed ADR-0015 SHA-256 `E649A26C334C16BC0B3800ECCB07C2F315F176EC0896C60D72E843765355B3E6`. Fresh independent review, explicit owner approval, and separate TASK-004 execution authorization remain. TASK-004 status, dependencies, milestones, and implementation are unchanged.
- 2026-08-14 / Codex primary coordinator: Recorded fresh independent `REVISE` on exact SHA-256 `E649A26C334C16BC0B3800ECCB07C2F315F176EC0896C60D72E843765355B3E6`, the owner's direct repair authorization, and the resulting precision-corrected Proposed ADR-0015 SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1`. Fresh independent review, explicit owner approval, and separate TASK-004 execution authorization remain. TASK-004 status, dependencies, milestones, and implementation are unchanged.
- 2026-08-14 / Codex primary coordinator: Reconciled fresh independent exact-artifact `PASS` with no finding on ADR-0015 proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1` and the project owner's explicit approval of those bytes. Accepted ADR-0015 now governs this plan, ADR-0012 is Superseded, DG-005 is Resolved, and TASK-018 is Complete. TASK-004 remains `Pending`, unstarted, and dependent only on TASK-002/TASK-003 because separate execution authorization is still required; no package, image, migration, test, or implementation changed.
- 2026-08-14 / Codex primary coordinator: Synchronized the project owner's non-commercial portfolio clarification by making this plan consume canonical AUTH-001 only within the exact ADR-0014 direct-URL and ordinary-caching scope and by linking the implementation plan's reopen conditions. Updated Progress, Decision Log, Outcomes, the affected current context, the pre-start authority-barrier command, validation/acceptance, and recovery handling together. TASK-004 remains `Pending`, unstarted, and dependent only on TASK-002/TASK-003; no task edge, ADR status, implementation artifact, runtime evidence, or acceptance result changed.
