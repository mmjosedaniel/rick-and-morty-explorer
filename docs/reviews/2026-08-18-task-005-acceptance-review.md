# TASK-005 Acceptance Review — 2026-08-18

- Review status: Complete — `PASS`
- Review scope: Exact TASK-005 implementation, three milestone-slice TDD cycles, cross-milestone behavior, closure validation, and pre-closure documentation impact
- Reviewed candidate: branch `codex/task-005-deterministic-import`, baseline HEAD `4792c8da63894401dbbb7910f6397594f6c690df`, empty index, and 18-path working-tree fingerprint `B008819D8736BF92AF8870BB5A6CAB18BB55CAF3BE81C0D7F23E430DE0210780`
- Owning evidence: [completed TASK-005 ExecPlan](../plans/completed/TASK-005-import-deterministic-15-character-baseline.md)

## Verdict

`PASS`. No Blocker, Major, or Minor remains. The candidate satisfies TASK-005's deterministic retrieval, validation, transactional publication, repeatability, rollback, application-owned-state preservation, timestamp, explicit-command, safe-diagnostic, resource-ownership, and post-commit invalidation contracts. FR-BE-004 and HS-012 pass. Existing TASK-004 migration evidence plus TASK-005 initialization evidence completes SPEC-010 and AC-009. TASK-005's PostgreSQL-authority/import contribution to SPEC-011 passes; full SPEC-011 remains incomplete because TASK-008 still owns favorite and comment mutations.

## Task-scoped review matrix

| Area | Result | Evidence |
|---|---|---|
| Scope, prerequisites, and authorization | Pass | TASK-004 and TASK-017 are complete, DG-006 is resolved, AUTH-001 remains authorized within its recorded scope, and the project owner separately authorized TASK-005. |
| Exact IDs and complete-batch validation | Pass | The import service fixes requested IDs 1 through 15, validates every payload before one publication call, and rejects incomplete, duplicate, out-of-range, or mismatched batches. |
| Exact image association | Pass | Requested ID, payload ID, and the byte-exact canonical `Character.image` URL must agree. Hostile scheme, host, credential, port, path, query, fragment, encoding, backslash, Unicode-confusable, missing, and `Character.url` substitution cases are rejected. |
| Bounded upstream behavior | Pass | The native-fetch adapter owns finite per-attempt timeouts and limited retries, including response-body reads under the abort timer, with stable typed failures and no live-network automated test. |
| Transaction, rollback, and repeatability | Pass | One bound source-only upsert runs inside one explicit Sequelize transaction. Real PostgreSQL evidence proves exactly 15 rows, repeatability, refresh, trigger-induced rollback, and no partial replacement. |
| Application-owned state and timestamps | Pass | Re-import refreshes source-owned fields and advances `updated_at` while preserving `is_favorite`, comments, and `created_at`. The earlier S3 timestamp finding was corrected through a fresh Red/Green cycle and bounded re-review. |
| Explicit command and diagnostics | Pass | The emitted zero-argument CLI composes the accepted client, service, and repository; rejects extra arguments; returns stable safe diagnostics; performs no import-time work; and closes every acquired Sequelize owner. |
| Post-commit invalidation | Pass | Invalidation is requested only after the repository promise resolves after commit. Rejection is fail-open, emits a safe warning, and cannot undo the committed refresh. The direct adapter intentionally remains a no-op until TASK-007. |
| Server regression and dependency direction | Pass | `server.ts` consumes the focused extracted PostgreSQL runtime without changing startup or lazy resource behavior. Application, adapter, persistence, and transport responsibilities remain explicit. |
| Prohibited scope | Pass | No Redis implementation or contact, scheduler, migration, lockfile, dependency, GraphQL mutation, startup import, live-network test, image bytes, proxy, asset route, or non-baseline deletion was introduced. |
| Worker-first TDD and relevance | Pass | Every behavior milestone has a `MISSING` preflight, accepted Red before Green, terminal compliant receipts, affected joins, and independent review. No active lease, skip, focus, placeholder, snapshot, abandoned scaffold, or duplicate-without-confidence test remains. |
| Runtime cleanup | Pass | Final checks found no `task_004_<16 hex>` database, no listener on ports 4173/4174, and no repository-owned smoke process. |

## Acceptance views

| View | Result | Rationale |
|---|---|---|
| Minimum assessment | **Fail overall — 4/12 pass** | AC-007, AC-008, AC-009, and AC-011 pass. The remaining criteria still depend on mutations, Redis, frontend behavior, responsive UI, the final ERD, or complete delivery. |
| Repository baseline | **Fail overall** | TASK-005's adopted architecture contribution passes, but remaining product behavior and adopted commitments are outside this task and incomplete. |
| SPEC-011 | **Partial overall; TASK-005 contribution passes** | Imported data is committed to PostgreSQL without runtime public-API dependency. Full list/view/favorite/comment behavior still includes TASK-008 mutation work. |
| NFR-003 | **Partial overall** | Sequelize/PostgreSQL import and runtime composition pass. Redis remains owned by TASK-007. |

## Verification evidence

Executed by the primary coordinator on the exact product/test bytes:

- `npm run typecheck` passed.
- `npm run build` passed.
- Ordered root `npm test` passed unit 23 files/98 tests, PostgreSQL integration 9 files/71 tests, application 5 files/12 tests, and Chromium smoke 1/1.
- `npm run test:smoke:lifecycle` passed all 6/6 normal and adversarial lifecycle cases when Windows permitted the harness to control its owned child processes.
- The isolated Compose project used PostgreSQL 18.6 at `127.0.0.1:55432` and Redis 8.8.1 at `127.0.0.1:56400`; TASK-005 did not contact Redis.
- Final PostgreSQL owned-database and ports 4173/4174 readbacks were empty.
- After closure, the exact `rick-and-morty-task005` Compose project, data volumes, and network were removed; project status and ports 4173, 4174, 55432, and 56400 were empty.
- Documentation validation, ADR validation with only the established NFR-006 warning, marker/prohibited-scope audit, and `git diff --check` passed.

Executed independently by the fresh integrated reviewer:

- The exact 18-path manifest was recomputed and matched fingerprint `B008819D8736BF92AF8870BB5A6CAB18BB55CAF3BE81C0D7F23E430DE0210780` on the stated branch, HEAD, and empty index.
- Root typecheck passed.
- Focused Milestone 1 unit evidence passed 2 files/38 tests.
- Focused Milestone 3 application evidence passed 1 file/4 tests.
- The compiled CLI extra-argument probe returned exit 1 with `CHARACTER_IMPORT_COMMAND_INVALID`.
- Documentation and ADR validators, marker/prohibited-scope audit, and `git diff --check` passed.
- The reviewer reused the immediate exact-tree build, PostgreSQL, browser, lifecycle, and cleanup evidence under the read-only mandate.

## Invalid-attempt disposition

- The first closure root run passed every Vitest scope and started the sole Chromium test, but the project owner requested a safe pause before Playwright emitted a terminal result. The coordinator interrupted it and confirmed zero owned server/database residue. That run remains incomplete evidence, neither a pass nor a product failure.
- The first resumed lifecycle run returned 0/6 because the restricted Windows boundary denied termination of the harness's owned child PID; the occupied ports then cascaded into later cases. No repository-owned Node process remained afterward. The unchanged command passed 6/6 with owned-child process-control permission, and the subsequent authoritative root smoke passed 1/1.
- Docker Desktop was stopped at resumption. After restart, Windows had newly excluded TCP range 56294-56393, so former Redis port 56379 could not bind. The same task-owned Compose project recreated Redis on free port 56400. This was an environment identity change, not a repository defect.

## Residual boundaries and debt

This is a TASK-005 pass, not complete product acceptance. TASK-007 owns Redis cache-aside and real invalidation, TASK-008 owns favorite/comment mutations, TASK-009 through TASK-012 own frontend behavior, TASK-014 owns the final ERD, and TASK-015 owns final delivery. The optional scheduler remains deferred. No new Critical, Medium, or Low technical debt was created by TASK-005.

No live public API request was made during validation, as required. Future operator execution still depends on provider reachability and the reviewed payload/URL contract.

## Documentation impact

Primary closure marks AC-009 and TASK-005 complete, updates current readiness to 4/12, records the precise SPEC-010/HS-012 pass and limited SPEC-011 contribution, registers this review, archives the completed ExecPlan with repaired inbound links, and updates the system/ADR current-state annotations without changing architecture. DEL-002, DEL-003 overall delivery, AC-010, AC-012, Redis, mutations, and browser/UI behavior remain pending. Documentation validation, ADR validation with only the established NFR-006 warning, and `git diff --check` pass after reconciliation.
