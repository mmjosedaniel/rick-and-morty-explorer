# Correct TASK-014 Delivery Evidence and Development Explorer

- Task: [TASK-014](../IMPLEMENTATION_PLAN.md#task-014---deliver-reproducible-repository-evidence)
- Plan and workflow ID: `TASK-014-20260822-02`
- Status: Active; owner-authorized corrective execution
- Historical predecessor: [TASK-014-20260822-01](./completed/TASK-014-reproducible-repository-evidence.md)
- Trigger review: [2026-08-22 TASK-014 independent revision review](../reviews/2026-08-22-task-014-independent-revision-review.md)

This living ExecPlan follows [PLANS.md](../../PLANS.md), the [worker-first implementation workflow](../../.codex/execplan-implementation-workflow.md), and the [automatic write-lease guard](../../.codex/write-lease-guard.md). The project owner explicitly selected finding 1's implementation route after the post-closure review found the accepted ADR-0006 development-explorer commitment missing. That authorization permits the bounded corrective implementation and dependent documentation/evidence work described here. It does not authorize staging, commit, push, pull request, publication, merge, deployment, a new dependency, or unrelated behavior.

## Purpose / Big Picture

Restore TASK-014's delivery contract without replacing its historical evidence. The corrected repository must expose Yoga's existing GraphiQL explorer only through the supported development startup, keep it fail-closed for direct built startup, `npm start`, tests, smoke, and production-marked execution, and correct three README statements identified by independent review: the third-party avatar privacy/redirect boundary, the development-versus-production GraphQL interface, and the requirement that migrations advance an already admitted PostgreSQL schema.

The existing JSON `POST /graphql` contract, schema, operations, dependencies, persistence, browser behavior, ERD, and public runtime evidence are reused wherever their evidence identities remain valid. The new source/test bytes invalidate the old full candidate and require a new public checkpoint before DEL-001, DEL-003, SPEC-017, HS-018, AC-012, or TASK-014 can close again.

## Progress

- [x] (2026-08-22) Authenticated clean local commit `50c12f4` containing the earlier local-only closure bookkeeping; public `origin/codex/execplan-014` remains `62aa3fa7c794e17a52218c0b3fcb4f01e331af9c`.
- [x] (2026-08-22) Independently reproduced the supplied review's three findings and preserved its `REVISE` result as a new dated historical record instead of rewriting the earlier acceptance review.
- [x] (2026-08-22) Owner selected implementation route 1. Reopened TASK-014 and AC-012, registered workflow `TASK-014-20260822-02`, and kept TASK-015 `Pending`.
- [x] (2026-08-22) Reuse inspection classified existing opt-in Yoga rendering and default-disabled application behavior `EXISTING_AND_COVERED`; supported development-startup composition is `MISSING`.
- [x] (2026-08-22) Persistent `test_worker` classified the supported development composition `MISSING`; guarded Red added the one-file pure-selector contract and failed solely because `shouldEnableGraphiql` is absent while the 20 existing tests pass.
- [x] (2026-08-22) `code_worker` Green and documentation correction accepted under a closed compliant lease; selector, server wiring, and README are the only worker-owned changes.
- [x] (2026-08-22) Local focused/affected unit and application tests, strict typecheck, lint, API build/GraphQL drift, documentation/ADR validation, targeted scans, development-process probe, cleanup, and diff check pass.
- [x] (2026-08-22) Fresh S2 milestone review returned `PASS` with no Blocker, Major, Minor, or follow-up and explicitly limited acceptance to the local milestone.
- [ ] Owner supplies or separately authorizes publication of the exact corrected candidate.
- [ ] Anonymous clean-clone validation, integrated independent re-review, documentation gate, and closure pass.

## Surprises & Discoveries

- Observation: The explorer UI is already implemented by GraphQL Yoga and already covered when the explicit `enableGraphiql` option is true; only the supported development process fails to select that option.
  Evidence: `app.ts`, `graphql-handler.ts`, and `graphql-summary.application.test.ts`.
- Observation: Root development startup reaches the API through the workspace `dev` npm lifecycle, while compiled startup uses workspace `start` and smoke directly launches the built server. A pure selector over these existing lifecycle identities can fail closed without a package-script or environment-file change.
  Evidence: root and API `package.json`, smoke orchestration, and read-only reuse result `PARTIAL`.
- Observation: The earlier public README and ERD/runtime packet remains valid evidence for DEL-001 and DEL-002, but the README omission and accepted-ADR conflict invalidate DEL-003 and the conjunctive AC-012 result.
  Evidence: the trigger review and exact public commit `62aa3fa7...af9c`.

## Decision Log

- Decision: Implement the already accepted ADR-0006/DPL-DEC-040 development-explorer commitment; do not amend or supersede ADR-0006.
  Rationale: The owner explicitly selected implementation route 1, Yoga and the opt-in application seam already exist, and the missing work is a small composition gap.
- Decision: Use an exact, fail-closed development selector: enable only for API npm lifecycle `dev`, disable when the lifecycle is absent or differs, and apply an overriding `NODE_ENV=production` veto.
  Rationale: This matches the supported command graph, preserves direct/compiled/test/smoke defaults, requires no new dependency or config artifact, and avoids the unsafe `NODE_ENV !== "production"` pattern.
- Decision: Preserve the archived predecessor plan and original acceptance review as point-in-time evidence.
  Rationale: Repository preservation policy forbids rewriting historical closure. This plan and the new revision review own the correction chronology.
- Decision: Treat the product slice as S2 and the README correction as part of the same integrated milestone.
  Rationale: Accidental explorer exposure outside development is security-sensitive; documentation and behavior must describe the same boundary on one candidate.

## Outcomes & Retrospective

Pending. At each stop, record exact paths, hashes, lease receipts, Red/Green commands, review result, public identity, cleanup, and any invalidated evidence here.

## Context and Orientation

`apps/api/src/server.ts` owns the executable API composition. `apps/api/src/config.ts` owns pure runtime parsing, and `apps/api/src/config.unit.test.ts` belongs to the existing API unit project. `apps/api/src/app.ts` and `apps/api/src/transport/graphql/graphql-handler.ts` already pass the explicit boolean into Yoga; they are frozen. `apps/api/src/transport/graphql/graphql-summary.application.test.ts` already proves HTTP rendering is enabled only when explicitly requested and remains frozen characterization evidence.

`README.md` is the single setup/API guide. `docs/ERD.md` remains byte-frozen. ADR-0006 owns the development-only explorer commitment; ADR-0014 owns the complete direct-avatar privacy and redirect boundary; ADR-0015 owns the admitted-schema migration lifecycle; ADR-0016 owns the Red-Green workflow. DEL-001 through DEL-003, AC-012, SPEC-015 through SPEC-017, and HS-018 remain the delivery acceptance join.

## Plan of Work

### Milestone 1: Development-only explorer and corrected delivery guide

Use the standard S2 profile. The persistent `test_worker` first performs one binding preflight using ADR-0016's exact classifications, then may edit only `apps/api/src/config.unit.test.ts`. The coherent Red proves the selector enables only the supported API `dev` lifecycle, fails closed for absent/direct, `start`, test/smoke/other lifecycle identities, and applies a production veto even when lifecycle is `dev`.

After the primary accepts Red and closes the test lease, one `code_worker` may edit only:

- `apps/api/src/config.ts`
- `apps/api/src/server.ts`
- `README.md`

Green adds the minimum pure selector and wires its boolean into the existing `createApp` option. It does not change `app.ts`, the GraphQL handler/schema/resolvers, routes, CORS, dependencies, package scripts, `.env.example`, persistence, smoke, or frontend code. README must state that the supported development command exposes GraphiQL on loopback `/graphql`, while compiled/production mode keeps it disabled and JSON POST remains supported in both modes. It must add the exact visitor-metadata and native-redirect/CSP limitation from ADR-0014 and change migration wording from creating a schema to advancing an existing admitted schema.

The worker may run only the packet's focused and affected gates. After each worker stops, terminally close the lease, require a fresh closed-compliant receipt, inspect the actual diff, and independently reproduce decisive evidence. Worker summaries alone do not accept a barrier.

Allow at most one same-contract correction per owner with a fresh exact-path lease. Stop for owner direction on any new dependency, package/lock/environment/config path, GraphQL handler/schema/route change, frontend change, migration behavior change, additional test file, production-exposure ambiguity, third implementation path, repeated decisive failure, or exhausted correction budget.

### Milestone 2: Local join, publication checkpoint, and closure

Freeze the corrected candidate, individual changed-file hashes, and a relevant-tree fingerprint. Run the focused unit Red/Green boundary, existing GraphiQL application characterization, full API unit and application scopes, root lint, typecheck, API/root build as proportionate, documentation validation, ADR validation, targeted forbidden-scope/privacy/redirect/migration/explorer scans, and `git diff --check`. Obtain one fresh S2 milestone reviewer verdict. `PASS WITH FOLLOW-UPS` requires explicit disposition of every item; `REVISE`, `BLOCKED`, or escalation stops.

Then stop at the owner-controlled public-candidate checkpoint. Do not stage, commit, push, open a pull request, or publish without separate exact authority. Report the candidate and document hashes.

After an anonymously accessible exact candidate is available, use one uniquely named temporary directory under the operating-system temporary root, clone anonymously, detach at the full SHA, prove a clean exact candidate, and execute the corrected README ledger and authoritative closure packet. Reuse earlier runtime evidence only where command, relevant-tree fingerprint, environment, and mutable external-state identity still qualify. Always constrain infrastructure to Compose project `rick-and-morty-dev`, verify exact cleanup, and remove only the resolved unique temporary clone. Obtain one fresh integrated `independent_reviewer` verdict against the trigger findings and all original TASK-014 authorities. Only then may the primary synchronize closure documentation, recheck AC-012, mark TASK-014 `Complete`, and archive this plan.

## Concrete Steps

From repository root `C:\Users\mmjos\Desktop\workbeanch\rick-and-morty-test`:

1. Validate activation documentation with `python -B .agents/skills/verify-repository/scripts/validate_docs.py --repo .`, `python -B .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .`, and `git diff --check`.
2. Create and verify a test-worker lease limited to `apps/api/src/config.unit.test.ts`; run the focused unit command and require the intended selector-contract failure.
3. Close and accept Red, then create and verify a code-worker lease limited to `apps/api/src/config.ts`, `apps/api/src/server.ts`, and `README.md`.
4. Run `npm run test:unit --workspace @rick-and-morty/api -- src/config.unit.test.ts` and `npm run test:application --workspace @rick-and-morty/api -- src/transport/graphql/graphql-summary.application.test.ts`.
5. Run the affected API unit/application scopes, `npm run typecheck`, `npm run lint`, `npm run build --workspace @rick-and-morty/api`, documentation/ADR validation, targeted scans, and `git diff --check`.
6. Freeze hashes, obtain fresh milestone review, and stop for publication authority.

## Validation and Acceptance

Milestone 1 is acceptable only when all of the following are true:

- the new unit contract failed before Green for the missing selector and passes after Green with its bytes frozen;
- the supported API workspace `dev` lifecycle enables the existing Yoga explorer only on the existing loopback GraphQL endpoint;
- absent/direct, `start`, test/smoke/other lifecycles, and any `NODE_ENV=production` execution keep it disabled;
- JSON GraphQL `POST /graphql`, the four operations, schema, persistence, and existing production startup remain unchanged;
- README accurately documents dev/prod explorer behavior, avatar visitor metadata, native redirect/CSP limits, and admitted-schema migration behavior;
- no dependency, manifest, lockfile, environment file, ERD, migration, frontend, schema, route, helper, or unrelated path changes;
- focused/affected tests, typecheck, lint, build, documentation/ADR validation, scans, and diff check pass;
- a fresh S2 milestone review passes.

TASK-014 closure additionally requires an exact anonymously accessible public candidate, clean-clone reproduction, corrected command ledger, complete closure packet, exact cleanup, fresh integrated independent `PASS`, synchronized status/traceability owners, and the task-closure documentation gate. DEL-001, DEL-003, SPEC-017, HS-018, AC-012, and TASK-014 remain not passed until that join.

## Idempotence and Recovery

All local validation commands are repeatable when their prerequisites and external-state identities are unchanged. Test and Green writes are sequential and guarded by exact-path leases. If a lease reports drift or a worker touches an unlisted path, stop the worker, close the lease, preserve the receipt, and reconcile without reverting unrelated user changes. Do not use broad process termination, Redis flushes, schema deletion, Docker cleanup, or unresolved-path removal. The predecessor plan and original review remain immutable historical evidence even if this correction fails or pauses.

## Interfaces and Dependencies

The only new interface is a pure exported selector in `apps/api/src/config.ts` accepting a read-only environment record and returning a boolean. It has no side effects and uses only existing process metadata. `server.ts` supplies `process.env` and forwards the result to the existing `enableGraphiql` option. No dependency, new service, API operation, route, data model, migration, command wrapper, configuration file, or generated artifact is introduced.

## Artifacts and Notes

Activation baseline:

- local HEAD: `50c12f4` (`docs: close TASK-014 documentation gate`);
- public branch before correction: `62aa3fa7c794e17a52218c0b3fcb4f01e331af9c`;
- initial worktree: clean;
- existing focused GraphiQL characterization: 5/5 passing;
- preflight: opt-in rendering `EXISTING_AND_COVERED`, default/production-disabled application behavior `EXISTING_AND_COVERED`, supported development composition `MISSING`.

Milestone packets, lease digests/receipts, hashes, exact command results, reviews, publication provenance, runtime identities, and cleanup evidence will be appended here as they are accepted.

Accepted Red evidence:

- preflight `TASK-014-CORR-M1-PREFLIGHT-01` reproduced relevant fingerprint `E19E4EFD0F862FD7AEC16485ADB266B475E9FFD2575157A02DA7B49C19E573F4` and baseline config unit 20/20;
- Red lease `TASK-014-20260822-02-cycle-01-red-04`, contract digest `bc9e5c1c...ff90c`, closed compliant with fresh receipt `62b2c768...1a4a7` and no post-close drift;
- only `apps/api/src/config.unit.test.ts` changed, SHA-256 `E2AB1AD956F565E62AA4BB62B3D95B87A5D20C465203636477EEAB40209663AF`;
- focused Red exited 1 at 20 passed/1 failed solely on `expected undefined to be type of 'function'` for missing export `shouldEnableGraphiql`;
- post-Red relevant fingerprint is `8C25C0F94037CD412260A3B7D1D37FBA14FAFDCBED452BC8C45025BBC7804879`; existing 5/5 HTTP GraphiQL characterization remains frozen.

Accepted Green and local-join evidence:

- Green lease `TASK-014-20260822-02-cycle-01-green-01`, contract digest `088ee08a...24a5e`, closed compliant with fresh receipt `2af122fe...559ab` and no post-close drift; only `config.ts`, `server.ts`, and `README.md` changed under that lease;
- Green reproduced Red at 20 passed/1 intended missing-export failure, then passed focused config 21/21 and existing GraphiQL application characterization 5/5; API unit passed 144/144 and API application passed 13/13;
- root strict typecheck and lint passed; API build and GraphQL generated-output drift passed; documentation validation passed 88 Markdown files/123 scenarios; ADR validation passed 18 ADRs/38 requirements with only the established NFR-006 warning; targeted scans and `git diff --check` passed;
- post-Green eight-path fingerprint is `6C9A8EB53ADED25B02FFABD4CCA95365AB43E95735DAA3C62DB741DA5462AF26`; `config.ts` is `78A3127AEE3D9A25C6D5F82569D33FFB22FA3BE82FDDFC10FFEAF3E1ACB1798B`, `server.ts` is `E5C1335A07B39135BA101E42B10582950A881D1C41F21169A1C3CAB1E7AA23F8`, README is `14B2875565B3DC8C7DBCEF07A145080BB8102316FD7156BD1CB5B7EAB9929ED7`, and the frozen Red remains `E2AB1AD956F565E62AA4BB62B3D95B87A5D20C465203636477EEAB40209663AF`;
- direct supported-development probe on task-owned port `3414` returned HTTP 200 `text/html` containing GraphiQL and a JSON POST introspection response with `__typename: Query`; after the PTY watcher did not terminally exit on control input, the coordinator read back and validated the exact four-process npm/tsx/server tree, terminated only those PIDs, confirmed the listener absent, and observed the owning execution session exit. No process, listener, Docker, PostgreSQL, Redis, browser, or network residue remains.
- fresh independent S2 milestone review reproduced the reviewed 250-path snapshot `748D768C46B1D2A5B881C0CAD3B81977C6E649BC995E258D94ADF61026F0BA24`, eight-path seam `6C9A8EB5...62AF26`, frozen Red, focused config 21/21, GraphiQL application 5/5, documentation/ADR validation, prohibited-scope/history checks, and diff hygiene; verdict `PASS` with no finding;
- stable publication checkpoint projection is 138 implementation/test/configuration paths at `883D5E95CE12FA5E83DD4A478A6FDCD8ACF6D6E1D1229A9FD129CA52978772F9` and those paths plus README/ERD at 140-path candidate `FF0E46A93FE9735DCBD4E9ABBD1FCAF6F2902C38CFF18F6E088D0ABAD78F30AB`; README is `14B2875565B3DC8C7DBCEF07A145080BB8102316FD7156BD1CB5B7EAB9929ED7` and unchanged ERD is `C6C30E2AB4096CE90CE1E5757576076184367A5D574AB137F0F6E51811EA822C`.

The local milestone is accepted and stopped at the owner-controlled publication checkpoint. Corrected bytes are not public. The coordinator has not staged, committed, pushed, opened a pull request, published, merged, or deployed them; DEL-003, SPEC-017, HS-018, AC-012, and TASK-014 remain open.
