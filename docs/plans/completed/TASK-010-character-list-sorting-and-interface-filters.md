# Deliver the TASK-010 Character List, Sorting, and Interface Filters

- Status: Complete; integrated acceptance and documentation gate passed on 2026-08-20
- Task: [TASK-010](../../IMPLEMENTATION_PLAN.md#task-010---deliver-the-character-list-sorting-and-adopted-interface-filters)
- Plan ID: `TASK-010-20260820-01`
- Created: 2026-08-20
- Last updated: 2026-08-20
- Governing convention: [PLANS.md](../../../PLANS.md)

This is a living ExecPlan. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` whenever work stops. The canonical task state remains in `docs/IMPLEMENTATION_PLAN.md`; this plan does not authorize execution, change dependencies, resolve a gate, or prove implementation.

## Progress

- [x] (2026-08-20) Read the TASK-010 requirements, accepted ADRs, routed specifications, UI authorities, manifests, test configuration, and current frontend source.
- [x] (2026-08-20) Completed reuse audit `TASK-010-REUSE-20260820-01` at baseline `40590b5d9ecf9fff5c78f67a0b511a4ba632e6b0` and bounded the visual component surface.
- [x] (2026-08-20) Recorded the reversible URL, control, default-sort, and visual-scope choices in [DPL-DEC-049](../../execution/decision-and-progress-log.md#decision-log).
- [x] (2026-08-20) Registered and linked this planning-only ExecPlan while preserving TASK-010 as `Pending`.
- [x] (2026-08-20) Passed documentation validation, ADR validation with only the established NFR-006 mapping warning, whitespace checks, task-state readback, and a final KISS/YAGNI scope audit.
- [x] (2026-08-20 20:54Z) Accepted the project owner's separate execution authorization, reconciled clean branch `codex/execplan-010` at HEAD `1370878ce0f11bd61aff6f7fb11179d0d4201381`, confirmed every frozen reuse-audit source hash, passed documentation and ADR validation plus all 26 lease-guard self-tests, and changed canonical TASK-010 to `In progress` before any implementation write.
- [x] (2026-08-20 21:32Z) Completed Milestone 1: corrected `MISSING` preflight; compliant setup, Red, and Green leases; generated-output identity; 27/27 initial focused Green after Refactor; one documented coordinator exception for an `exactOptionalPropertyTypes` join defect; first fresh S1 review returned `REVISE` with one Major malformed-error-envelope finding; the single review-correction loop classified `REGRESSION`, proved one failing test, reached Green under separate ownership, and passed the complete 28/28 focused scope, root typecheck, web build, generated drift check, and updated relevance audit. Fresh re-review returned `PASS WITH FOLLOW-UPS`; the primary resolved its one documentation-only Minor by recording the final fingerprint projection and accepted the milestone without claiming rendered or acceptance behavior.
- [x] (2026-08-20) Completed Milestone 2 preflight `TASK-010-M2-PREFLIGHT-01`: CORS, deterministic seed, PostgreSQL isolation, Redis isolation, and smoke lifecycle are `PARTIAL`; built-web CSP and browser endpoint ownership are `MISSING`. The primary accepted one coherent Red covering the explicit gaps through focused API/config tests plus the existing smoke and its minimum task-local runtime/lifecycle support.
- [ ] (2026-08-20) Milestone 2 Red attempt 1 wrote exactly the six leased test paths and independently proved the CORS, endpoint, deterministic seed, cleanup, and missing-CSP gaps, but is `RED INVALID` because the root Playwright process remained alive after its intended failure and completed teardown. One same-contract test-worker correction is authorized only for that post-failure shutdown defect.
- [ ] (2026-08-20) Milestone 2 Red attempt 2 isolated setup and cleanup into naturally terminating child processes and reproduced the same seeded, cleaned, missing-CSP result, but the Playwright parent/web-server boundary hung again. The test-worker budget and repeated-failure limit are exhausted; production Green remains blocked while the primary performs read-only coordinator triage.
- [ ] (2026-08-20) Read-only coordinator triage identified Playwright 1.61.1's Windows web-server teardown waiting on deeply nested `cmd -> npm -> workspace script -> npm -> node` process trees with high confidence. The primary authorized one exceptional direct test-harness edit, limited to `playwright.config.ts` and `tests/smoke/fixtures/task-010-runtime.ts`, to keep fresh builds in the existing fixture process and start each built server through one direct Node child; assertions, production, dependencies, and external cleanup remain frozen.
- [ ] (2026-08-20) Exceptional direct Red run `03e0955e4d4d2f06` again seeded 15, failed only on missing CSP, and cleaned exact state, but the Playwright parent stayed alive for an additional bounded 10-second poll after cleanup and required one interruption. The same hang has now survived both worker correction and coordinator exception; Milestone 2 is blocked at the repeated-failure boundary pending project-owner direction.
- [x] (2026-08-20) The project owner explicitly authorized the proposed dedicated smoke-process orchestrator. Milestone 2 resumed under a new bounded harness-expansion slice: one existing-tooling TypeScript runner may own fresh builds, exact fixture setup/cleanup, direct built API/web children, and the unchanged single Playwright command outside Playwright's `webServer` plugin. No product assertion, dependency, suite, or production behavior was added by this authorization.
- [x] (2026-08-20) Fresh read-only preflight `TASK-010-M2-HARNESS-PREFLIGHT-01` classified the repeated Windows process-ownership failure as `REGRESSION` and approved one guarded five-path harness correction. The API, web-config, browser assertions, and lifecycle verifier are frozen; a successful correction must terminate naturally at the unchanged missing-CSP Red, perform exact cleanup, and release ports 4173/4174.
- [x] (2026-08-20) Closed compliant harness lease `TASK-010-M2-HARNESS-RED-01` with receipt `40be4ec1d2c061e8a13d4d0a811839a1d39ee3703fe1acc5514a4613dcbd8968`. Strict tools typecheck passed, and the single provisioned run `8800f9d33af8e14b` exited naturally with code 1 in 11.95 seconds solely at the frozen missing-CSP assertion after the unchanged 15-record setup; exact cleanup completed and ports 4173/4174 were released. Milestone 2 Red is confirmed and frozen.
- [x] (2026-08-20) Closed compliant production lease `TASK-010-M2-GREEN-01` with receipt `26f1e4f56ca133245fa01b02ec607cff51bdf50307f25327a06f8b3c22b6616f`. Focused API/config Green passed 4/4, tools/API/web strict typechecks passed, and smoke run `8672163ce3773f30` exited naturally with one Chromium pass, 15 isolated records, no public request, exact cleanup, and released ports.
- [x] (2026-08-20) Completed Milestone 2 validation on relevant-tree fingerprint `E5C3F53FFA41C0A7432B42587F5C11B91687832BF557260378A775DAB4AC5FFF`: root typecheck, full build with both GraphQL drift checks, and all 15 application tests passed. The first lifecycle invocation passed 4/6 but the sandbox denied its exact Windows `taskkill` calls; after confirming both ports free, the same command reran with process-control permission and passed all 6/6 cases with exact cleanup for every run. Fresh independent S2 review remains required before milestone acceptance.
- [x] (2026-08-20) Fresh S2 review returned `REVISE`: runtime behavior, TDD, leases, CORS/CSP, exact cleanup, and local Windows lifecycle passed, but DPL-DEC-050 could not override ADR-0011 and the changed boundary lacked clean/hosted proof. The primary stopped Milestone 2 and activated `DRC-T010-01` at R3 because ADR-0011's own cleanup reversal trigger had occurred.
- [x] (2026-08-20) R3 process/recovery and whole-record traceability reports returned `RESEARCH COMPLETE`; the mandatory analyst returned `DRAFT READY` with candidate B and provisional 92/100; fresh pre-draft critical review passed after one contract-format correction completed invariants I1-I7. The primary authored whole-record successor ADR-0018, reciprocally superseded and relocated ADR-0011, repaired current and historical references, kept DG-001 `Resolved` and TASK-010 `In progress`, and passed ADR validation for 18 records plus documentation validation for 69 Markdown files. Fresh exact-artifact R3 final review remains required.
- [x] (2026-08-20) Final R3 exact-artifact review `T010-ADR-R3-FINAL-01` passed on correction cycle 2/2 with no finding. It authenticated accepted ADR-0018 SHA-256 `F2F31B119688ADD84C5946E9427BA8462C10D5E9A25D566AF2CEB1A9CE22D4F7`, preserved historical ADR-0011 SHA-256 `86707CE88118C5CBC3235B9FE85EA72F3503F36BB4E0275B85A3E54ABD48E5F9`, and passed invariants I1-I7. The architecture blocker is closed; this does not accept Milestone 2 or TASK-010.
- [x] (2026-08-20) The initial ready-unowned characterization and its first disposable Ubuntu proof completed on fingerprint `88B1A8A6FC5B261245676BC30A5A61B642360CB2E2B435E4BEA6C61B42517468`, but fresh S2 re-review returned `REVISE`: the HTTP-200 listener served only plain text, so later browser assertions—not readiness ownership—made the smoke nonzero. The reviewer proved that `waitForReadiness` could return before observing the owned web child's adjacent-turn `EADDRINUSE` exit. The primary retracts `EXISTING_BUT_UNCOVERED` and the prior “never attached” claim; that evidence is historical but not reusable for ADR-0018's ready-unowned invariant.
- [x] (2026-08-20) Corrected ownership regression Red/Green completed under separate compliant leases. Red lease `TASK-010-M2-OWNER-RED-01`, receipt `1ab5abe365596ee5c8a5a5a0b90d9c0ce727a1f3e3fde4b93a6d12044f7920f1`, changed only the startup-conflict fixture to serve the exact heading and CSP and then failed decisively because the smoke unexpectedly exited 0. Green lease `TASK-010-M2-OWNER-GREEN-01`, receipt `3fdd63d3c30f90a78ec6daeaeffcfcab097fa26e87508e7ab3ab6d8a20fa73d2`, changed only `waitForReadiness` to require one bounded owned-child liveness interval after HTTP readiness. Strict tools typecheck passed; the single permission-qualified Windows lifecycle run passed 6/6, rejected the convincing impostor, cleaned every exact schema/prefix, and released ports 4173/4174.
- [x] (2026-08-20) Corrected disposable Ubuntu validation passed against Milestone 2 fingerprint `6681BA50C8951B7CC5358542FD36E024DE90D34C8E149794340A98F20ABE82F6`. The authenticated read-only 218-file snapshot aggregate `41EE058FE22C75C957A3EBF246EA21FA7DCABE5365E9BB29DD5ADFF5D7385F08` was copied to native container storage. Exact Node 24.18.0/npm 11.16.0 immutable install, root typecheck, Chromium smoke `8fc19bb78e8d530c`, and corrected lifecycle 6/6 passed in Playwright Ubuntu image digest `5b8f294a...`; exact PostgreSQL/Redis residue was empty, ports were reusable, source bytes did not drift, and all disposable helpers were removed. Candidate 1 stopped before repository commands because the image lacked `xz`; candidate 2 used the authorized official gzip archive for the same exact Node version. Fresh S2 re-review remains required before milestone acceptance.
- [x] (2026-08-20) Fresh S2 re-review reproduced every corrected identity and closed the ready-unowned finding, but returned `REVISE` for a distinct lifecycle-finality Major: after readiness stability, Playwright is awaited without racing the owned server results and planned cleanup treats an already-exited child as success. The same review found a one-character Red receipt typo; the primary corrected the documentation-only identifier to terminal receipt `1ab5abe3...20f1`. The single ready-unowned review-correction loop is consumed, so automatic correction does not continue under that contract.
- [x] (2026-08-20) The distinct post-readiness process-failure contract completed its bounded finality Red/Green under the workflow's fresh-instance/rescope route. Red lease `TASK-010-M2-FINALITY-RED-01`, receipt `ba18e8338e6c4954468199e3b301f58fbe6d51a1239c0b528cff446467286872`, proved nested Chromium success plus an owned API's natural code-23 exit still produced smoke exit 0. Green lease `TASK-010-M2-FINALITY-GREEN-01`, receipt `735e11c1bb214a2b3a83648d73683fa2104bbe556f92d33c9e82c3bbb388329a`, changed only the runner to race Playwright with both owned app results through planned shutdown. Tools typecheck passed and one permission-qualified Windows lifecycle invocation passed 7/7 with exact cleanup and reusable ports.
- [x] (2026-08-20) Finality clean Ubuntu validation passed against fingerprint `9AC7E6D10100B9175F0763D89FBA39F0E3913F637796D6CDA66EEFDE535396CA` and authenticated source aggregate `0FFA24FED140B8C58DF04BD5972A2D9D3041F7A14B3D0E1B14169FF8829EA00F`. Immutable install, root typecheck, Chromium smoke `47d2b25151f7787f`, and all seven lifecycle cases passed once; the new case required Chromium 1/1, intentional API exit 23, the runner's owned-process diagnostic, and no cleanup substitution. PostgreSQL/Redis residue was empty, ports were reusable, source bytes did not drift, and every disposable helper was removed. Fresh S2 review remains required before Milestone 2 acceptance.
- [x] (2026-08-20) Fresh finality S2 review returned `PASS WITH FOLLOW-UPS` with no Blocker or Major, authenticated the current candidate and all four correction receipts, accepted the distinct finality rescope as legitimate, and required only the living-plan preflight/relevance/revision record. The primary added that record; documentation validation and `git diff --check` then passed. Milestone 2 is accepted at fingerprint `9AC7E6D10100B9175F0763D89FBA39F0E3913F637796D6CDA66EEFDE535396CA` without claiming rendered list behavior, Milestone 3, AC-001/AC-002, or TASK-010 completion.
- [x] Complete Milestone 2: isolated browser runtime and security-header boundary.
- [x] (2026-08-20) Refreshed frontend reuse audit `TASK-010-M3-REUSE-20260820-01` on 19-path fingerprint `F722EC12CD54A3CC5A774C33EC4C81602CBAE53AA7E4652008C314C5BF32692B` and accepted visual capsule `TASK-010-M3-CAPSULE-20260820-01`. The current tree preserves `EXTEND` for App/Shell/styles, `CREATE` only for the route, controls, and card, no `EXTRACT_LOCAL`, and no new reusable component or style owner. The capsule freezes populated/loading/empty/error-retry/successful-image states, Chromium 375x812 and 1280x800 interactions, exact visual authorities, one-smoke browser evidence, and all recorded non-goals before test preflight.
- [x] (2026-08-20) Milestone 3 preflight `TASK-010-M3-PREFLIGHT-01` classified the grouped visible root-list contract `MISSING`. Red lease `TASK-010-M3-RED-01` and its one test-only ambiguity correction `TASK-010-M3-RED-02` closed compliant at receipts `4cf5aa6851b0637b655addf75979db1c676ddf9657a6363b512794724a2c1b65` and `8fa073b88370b178d66d2250bcac8140d1287f3cd1c07f87c2c6e442a5c35d76`. The corrected focus failed only for two absent component owners and nine root scenarios seeing only the existing H1; smoke `0ca3ecd3610233ab` failed only at missing H2 `Characters` and cleaned exact state.
- [x] (2026-08-20) Frontend Green lease `TASK-010-M3-GREEN-01` closed compliant at receipt `1e29815d5e30140311b89b7d512eb0a67d86e20c32aeadc0e4b3cb6648dd8bd2`; focused 11/11, root typecheck, web build/drift, and Tailwind validation passed, while its single smoke reached 15 cards and exposed only a missing DOM text separator. Card-only correction lease `TASK-010-M3-GREEN-02` closed compliant at receipt `64c52c15975d48b376aa14b519f4e84eb2db2d90ad6c8f5411c971ce48674d50`; focused 11/11 and root typecheck passed, and smoke `7b8b53068301eae3` passed exact card text, GraphQL, 15 native 300x300 images, attributes, and Origin before stopping on a test-observability conflict: Playwright `Request.headers()` omitted browser-owned `sec-fetch-mode`.
- [x] (2026-08-20) Read-only avatar-header triage classified the remaining failure `CONFLICTING`; evidence lease `TASK-010-M3-AVATAR-HEADERS-EVIDENCE-01` closed compliant at receipt `813f9736e3ed5576fc304dd402f47e4942985e75fc41bd0138f0fc5e53b4f3be` after changing only `headers()` to `allHeaders()`. Tools typecheck passed, but smoke `c9bd2f61dc65a909` still could not observe `sec-fetch-mode`; it otherwise reached 15 cards/images, exact Origin, and clean teardown. The hypothesis stopped `UNKNOWN` with no retry or production edit.
- [x] (2026-08-20) Bounded R1 authority/observability research returned Option B with high confidence, and preflight `TASK-010-M3-AVATAR-CORS-PREFLIGHT-01` classified the governed native-image boundary `EXISTING_AND_COVERED`: ADR-0014 requires the native anonymous/no-referrer image boundary, successful CORS fixture, Origin, and absence of credentials, but not a particular Fetch Metadata header. Evidence lease `TASK-010-M3-AVATAR-CORS-EVIDENCE-01` closed compliant at receipt `7faebcd50c5768ce251aef241c96a1cfb8560d8e923a33b62a3cfc51d57ede10` after removing only that redundant assertion while retaining `allHeaders()` and every authoritative check. Tools typecheck passed; smoke `7ff089e8591ab6fa` passed Chromium 1/1 with exact 15 native images, CORS/privacy/network assertions, exact PostgreSQL/Redis cleanup, and reusable ports. Final smoke SHA-256 is `11CB4B47BCC3F68AE1E5E9DAFEAD0F09E0EDA957C9C1B1F5361C4B2215731034`.
- [x] (2026-08-20) Visual-evidence preflight `TASK-010-M3-VISUAL-EVIDENCE-PREFLIGHT-01` classified the named real-browser matrix `EXISTING_BUT_UNCOVERED`; evidence lease `TASK-010-M3-VISUAL-EVIDENCE-01` closed compliant at receipt `f421e37123fd1a0965a3d1e985308d1df79a429648c945a0c2fde97aea2c0182`, changing only the existing single smoke. Tools typecheck passed and run `e05f0650f7707070` passed Chromium 1/1 in 3.4 seconds on final smoke SHA-256 `D0933E4A27C55F91E2474C7E166645CE7EB1797BBABB842FF4F2026B7D729745`. The preserved real request passed exact 15-card/native-image/security/network checks; deterministic post-integration evidence passed 1280x800 and 375x812 hierarchy, no overflow, cyan focus-visible traversal, each filter and combined Apply, reload/Back/Forward, loading/empty/error, and same-key keyboard Retry. Three ignored supporting screenshots were inspected at the recorded output paths and hashes; exact schema/prefix cleanup passed and ports were reusable. Fresh S2 review remains required before Milestone 3 acceptance.
- [x] (2026-08-20) The exact Milestone 3 review candidate is authenticated by 25-path SHA-256 `735EEB384FA444A6799205144C50CE020A1221CC656AD0D55DE62DE3919C182A`. Reproduce it with the capsule's documented uppercase per-file SHA-256 plus tab/LF serialization over its ordered 19-path reuse projection, followed by `apps/web/src/character-card.tsx`, `apps/web/src/character-list-controls.tsx`, `apps/web/src/character-list-route.tsx`, `apps/web/src/character-card.unit.test.tsx`, `apps/web/src/character-list-controls.unit.test.tsx`, and `apps/web/src/character-list-route.application.test.tsx`. Documentation validation and `git diff --check` pass with line-ending warnings only.
- [x] (2026-08-20) Fresh S2 review reproduced fingerprint `735EEB38...`, hashes, receipts, focused 11/11, unit 31/31, typecheck, screenshots, and external browser evidence, but returned `REVISE`. The full web-application join failed 2/11 because the reused App test no longer supplies query context; application tests also reuse one module-level QueryClient contrary to ADR-0017's fresh-test-client rule. The reviewer separately found that default `sort=asc` is preserved/written instead of omitted from the canonical URL, and two follow-ups: add console/page-error inspection to the smoke and repair stale current-state claims in `docs/ui/README.md`. Milestone 3 remains unaccepted pending separate bounded correction slices, refreshed joins, and re-review.
- [x] (2026-08-20) Client-composition review correction preflight classified `REGRESSION`. Red lease `TASK-010-M3-REVIEW-CLIENT-RED-01` closed compliant at receipt `a600eca87097dc25088a3faf6e943f3c3ad07ebe1e3a16c594a5fd6df91d9beb`; 9/11 application tests passed and two failed only because App ignored the supplied client. Green lease `TASK-010-M3-REVIEW-CLIENT-GREEN-01` closed compliant at receipt `4fc663cf6863af8db9d3fc0cc7f16ea25f8517769247310c554f8e96f6ff19fc`, adding only the optional typed App client seam while retaining one stable production default. Focused and complete web-application runs passed 11/11 and root typecheck passed.
- [x] (2026-08-20) Canonical-URL review correction preflight classified `REGRESSION`. Red lease `TASK-010-M3-REVIEW-CANONICAL-RED-01` closed compliant at receipt `2116f1f0b426d693ad759e63fb2836b5417ba3020ea3b5ddb38629647d50a015`; 5/10 route scenarios passed and five failed only because default A-Z remained serialized. Green lease `TASK-010-M3-REVIEW-CANONICAL-GREEN-01` closed compliant at receipt `801e2aa7d5cb43ea3bceaeba11b6857ba88e96ea7b440cf01fe5c2f73c65d60c`, changing only the route to omit `sort` unless it is `desc`. Focused 10/10, complete application 12/12, root typecheck, web build/drift, and smoke `5c2a3410044a15df` passed. Ports 4173/4174 were released; listeners 55432/6379 are the same pre-existing PostgreSQL `8303659b8373` and Redis `41f06f5e02b6` containers, not smoke residue.
- [x] (2026-08-20) Console-evidence preflight classified `EXISTING_BUT_UNCOVERED`; lease `TASK-010-M3-REVIEW-CONSOLE-EVIDENCE-01` closed compliant at receipt `49b878aecea0d55f7bfeda833a68838ae78e91fc46b10e52da2f0b9a174c619e`, changing only the existing smoke. Tools typecheck and run `090ce9664e029272` passed Chromium 1/1 in 3.1 seconds with `pageErrors=0`, two deliberate GraphQL failures, two exact allowed Chromium 503 resource diagnostics, and `unexpectedConsoleErrors=0`; exact schema/prefix cleanup passed and ports 4173/4174 were released. Final corrected hashes are App `BF17304CD80BD6851BDD2D29F231098A8DB7FCFE85F80EE3AA3B12A220C31CB3`, route `84DBE9BE63D4D1B06B956D522E8E391E94417EB0F035BC4843CC66D6AB7B4584`, App test `8E57ECB1AFF63A012F8629860F92CF89D64CE1DA587A87F945EBE715BEA1E027`, route test `B1302CC40D80AC4F9ABA2321DD5507D258504C4E707420D67B660DC19FD44BDF`, and smoke `D54F3E2DEE134BB8C670A113C2B837BF950DC604CE5238B9A5C6246C74A49C82`. The primary repaired the two stale current-state claims in `docs/ui/README.md` at SHA-256 `2BA9C86FC8FDB6F8B4F95DEF48ABC58596666EAF30DEE57C59C9D0DCCB8FCDC3`. The corrected 25-path candidate fingerprint is `4076A45C5C1FF70EEE4F2F6F0893E895F528A8178C5BAB95B4524A48F86635CC`; documentation validation and scoped diff checking pass. Fresh S2 confirmation remains pending.
- [x] (2026-08-20) Fresh S2 correction confirmation independently reproduced fingerprint `4076A45C5C1FF70EEE4F2F6F0893E895F528A8178C5BAB95B4524A48F86635CC`, all five correction receipts, final source/test/doc hashes, application 12/12, typecheck, GraphQL drift, Tailwind validation, documentation validation, diff checking, and authenticated browser evidence. It closed all three Majors and both Minors and returned `PASS` with no finding. Milestone 3 is accepted without claiming Milestone 4, task closure, TASK-012 responsive closure, detail imagery, or image-failure behavior.
- [x] Complete Milestone 3: the bounded visible character-list experience.
- [x] (2026-08-20) Milestone 4 cumulative relevance audit `TASK-010-M4-RELEVANCE-AUDIT-01` returned `PASS` over 14 executable test, fixture, runner, and lifecycle paths. Every case maps to a TASK-010 behavior or changed shared boundary; fixtures are deterministic and run-owned; the single browser smoke preserves the real GraphQL/PostgreSQL plus exact local-avatar path; no live public character JSON, focused/skipped/pending-test marker, obsolete duplicate, or abandoned lifecycle case remains. The audit reproduced M3 fingerprint `4076A45C...` and found no remediation before the one-time closure packet.
- [x] (2026-08-20) The authoritative Milestone 4 closure packet passed on the frozen implementation candidate: root typecheck; root build with both GraphQL drift checks; Tailwind validation; unit 31 files/170 tests; provisioned PostgreSQL/Redis integration 11 files/74 tests; application 6 files/25 tests; Chromium smoke `937476adea51a78b` 1/1 with zero page errors and zero unexpected console errors; and the permission-qualified Windows lifecycle 7/7. Documentation validation passed after replacing two historical uses of a validator-reserved marker word with `pending-test`; ADR validation passed with only the established NFR-006 warning; `git diff --check` passed with line-ending warnings only. Exact readback found no `task_004_*` database, `t010_smoke_*` schema, or `character-app:test:t010-*` Redis key, and ports 4173/4174 were released. Fresh integrated S2 acceptance review is the remaining Milestone 4 barrier.
- [x] (2026-08-20) Fresh integrated S2 acceptance review authenticated 224-path candidate aggregate `9AD1FC659307220CEC4B0B0199206CB6BA40B5E95393F810095C9612657B5F8D`, returned `PASS WITH FOLLOW-UPS` with no Blocker, Major, or Minor, and confirmed AC-001/AC-002 plus the mapped requirement/SPEC/HS matrix. The one-moderate/one-high transitive advisory observation and pending `esbuild@0.28.2` install-script policy coverage remain separate non-blocking follow-ups requiring independent authority.
- [x] Complete Milestone 4: integrated validation, acceptance review, documentation reconciliation, and task closure.

## Surprises & Discoveries

- Observation: `apps/web` remains the TASK-003 walking skeleton: `App` routes `/` directly to `Shell`, `Shell` renders only the product heading, and the stylesheet contains only the Tailwind import.
  Evidence: `apps/web/src/app.tsx` blob `75066b2ccaac0d0cc101174d776c9c0772afb4a4`, `apps/web/src/shell.tsx` blob `f3a57b4840374ff9258731ad11bb618ef7cb7d14`, and `apps/web/src/styles.css` blob `f1d8c73cdcf9eaacb01fec99963ad78d591305ae` at the reuse-audit baseline.

- Observation: there is no existing character card, list route, filter control, frontend GraphQL operation, query cache, or design-system primitive to reuse. The existing `Shell` is the only presentational owner worth extending.
  Evidence: bounded inspection of `apps/web/src`, `apps/web/package.json`, `vitest.config.ts`, `playwright.config.ts`, and `tests/smoke` under reuse audit `TASK-010-REUSE-20260820-01`.

- Observation: the API already supplies the required PostgreSQL-backed `characters(filter)` GraphQL contract and exact `CharacterSummary` projection, but the browser client, explicit cross-origin browser boundary, built-web CSP, and product smoke fixture do not exist.
  Consequence: keep generated operations and transport work on the standard implementation route, and do not make the visual worker own API or test-infrastructure setup.

- Observation: the accepted image decision divides proof across tasks. TASK-010 owns a successful native list-avatar request with anonymous CORS and no referrer; TASK-012 owns the one-way failure fallback and full responsive/resilient closure.
  Consequence: this plan requires the successful image state and reserves square space, but explicitly forbids adding fallback sources, retry logic, or claiming AC-006.

- Observation: the existing narrow Playwright smoke proves only the TASK-003 heading and API liveness. The final TASK-010 smoke needs isolated PostgreSQL data and exact avatar interception without contacting upstream character JSON.
  Consequence: extend the one existing smoke path and add only task-owned fixture support; do not create a second browser suite or a generic environment orchestrator.

- Observation: Milestone 1 preflight confirmed every executor, decoder, operation, generated artifact, query owner, QueryClient, and provider behavior is absent, but its first proposed data-test filenames used `.unit.test.ts`, which the current `web-unit` project does not discover.
  Evidence: `TASK-010-M1-PREFLIGHT-01` returned `MISSING`; bounded correction `TASK-010-M1-PREFLIGHT-02` read `vitest.config.ts` and selected `apps/web/src/data/graphql-executor.unit.test.tsx` and `apps/web/src/data/characters-query.unit.test.tsx` without changing the harness.

- Observation: the first two Milestone 1 setup guard starts returned input errors because operator-level Git excludes made named forbidden roots unverifiable; neither start returned a digest or authorized a worker.
  Evidence: lease IDs `TASK-010-M1-SETUP-01` and `TASK-010-M1-SETUP-02` were never reused. Fresh exact-file allowlist lease `TASK-010-M1-SETUP-03` started and closed `closed-compliant` with no forbidden or unleased path.

- Observation: the focused Green and web build passed, but the first milestone root typecheck rejected explicit `AbortSignal | undefined` assignment to `RequestInit.signal` under `exactOptionalPropertyTypes`.
  Evidence: `npm run typecheck` reported TS2769 at `apps/web/src/data/graphql-executor.ts`; the worker's two-turn milestone budget was already consumed by setup and Green. The primary used the documented coordinator exception to change only `signal` to `signal ?? null`, after which the exact focused scope passed 27/27, root typecheck passed, and the web build plus generated drift check passed.

- Observation: the first fresh S1 reviewer found that a successful modern GraphQL response with valid `data` plus malformed non-empty `errors` could resolve as success because invalid error arrays collapsed into the same `null` result as absent errors.
  Evidence: review `TASK-010-M1-REVIEW-01` returned `REVISE` with one Major finding at `apps/web/src/data/graphql-executor.ts`; the primary accepted the finding and activated the plan's single review-correction loop without advancing Milestone 2.

- Observation: GraphQL Yoga's current default CORS behavior is broader than a simple missing header: it reflects both owned loopback origins and an unrecognized origin, and emits `Access-Control-Allow-Credentials: true` for all three.
  Evidence: corrected local probe in `TASK-010-M2-PREFLIGHT-01` returned `200` with reflected ACAO and credentials for `http://127.0.0.1:5173`, `http://127.0.0.1:4173`, and `https://evil.invalid`; the hostile-origin preflight returned `204`, reflected the hostile origin, and allowed `POST`.
  Consequence: Milestone 2 CORS is `PARTIAL`. Red must preserve the two owned origins while proving that the hostile origin receives no permission and no credential allowance.

- Observation: the existing import composition already fixes IDs 1 through 15, accepts an injected `fetch`, and publishes through the production persistence boundary; existing migration and Redis tests likewise expose safe isolated seams, but the current smoke owns none of their run identities or cleanup readback.
  Consequence: the task-local smoke fixture must orchestrate those seams, not duplicate import or migration behavior, and must validate the exact schema and Redis prefix before any cleanup.

- Observation: Red run `f2180f1152185c41` reached the intended missing-CSP assertion after the fixture migrated and imported 15 local payloads, and its global teardown read back an absent schema and empty Redis prefix; nevertheless, the parent `npm run test:smoke` process remained alive without output for more than 20 seconds.
  Evidence: the test worker interrupted the root process once under the bounded stop rule, confirmed ports 4173 and 4174 were free, and returned `RED INVALID`; lease `TASK-010-M2-RED-02` then closed compliant with receipt `add6a6b4869b5355a67e3dfab0229b2d97833e0193474f60d4a429d515bd8496`.
  Consequence: production Green remains blocked. The sole remaining test-worker turn may correct only the test-side post-failure shutdown behavior and must reproduce the same behavioral Red with natural command termination.

- Observation: Red correction run `698c67dbe72ddaff` moved setup and cleanup work into separate awaited child processes; both children exited naturally, the same missing-CSP assertion failed, and exact cleanup completed, yet the root Playwright command again remained alive after teardown.
  Evidence: lease `TASK-010-M2-RED-03` closed compliant with receipt `dd1990ea9b0196c4dbfa8125577c8b2b39949599f6e63fbc6ad4703290d9ad0d`; ports 4173 and 4174 were free after the bounded interruption.
  Consequence: the retained boundary is outside the fixture operation itself and is most plausibly Playwright's Windows web-server process ownership. The repeated-failure stop rule and test-worker turn budget are now active; only read-only coordinator triage may proceed until a safe exception or owner input is justified.

- Observation: replacing both nested `start:smoke` commands with direct fixture-owned built Node launchers did not make Playwright terminate after the frozen missing-CSP failure and exact cleanup.
  Evidence: exceptional run `03e0955e4d4d2f06` built both workspaces, started the direct built web/API entrypoints, used migration build `66b43bbbad10d1f37e7cded0bcfabc9a017ddd94cf38c89286ade2741611abce`, imported 15 local payloads, failed at the unchanged CSP assertion, logged exact cleanup, then produced no output for the initial 30-second command yield plus a further 10-second poll and required one interruption.
  Consequence: the direct-launcher hypothesis is falsified as a sufficient correction. No further retry, Green, or unplanned process-control mechanism is authorized without project-owner direction.

- Observation: changing the startup-conflict fixture to return plain-text HTTP `200` produced a passing lifecycle case but did not prove readiness ownership.
  Evidence: fresh S2 re-review found that the listener could not satisfy the frozen heading/CSP assertions, while `waitForReadiness` returned on HTTP success before definitively observing the owned child's exit. A convincing impostor serving the exact heading and CSP then made the smoke exit 0 and produced decisive Red `[FAIL] startup conflict: Startup-conflict smoke unexpectedly exited 0.`
  Consequence: the earlier `EXISTING_BUT_UNCOVERED` classification and “never attached” claim are retracted. The contract is `REGRESSION`; only the convincing-fixture Red and ownership-aware Green are reusable for this invariant.

- Observation: one existing 100 ms readiness poll interval is sufficient to close the observed adjacent-turn ownership race without OS-specific port-owner inspection.
  Evidence: corrected `waitForReadiness` checks the recorded child result immediately after HTTP readiness, races the same bounded interval against `childResult`, and rechecks before acceptance. The permission-qualified Windows lifecycle passed 6/6 for runs `a8fc764227612675`, `bb5582431de7c6f4`, `37526ec32901c188`, `2c1d0130729a9c60`, `6a7f103676fd34b3`, and `310e87d7a8e9ef1b`; the corrected Ubuntu lifecycle passed 6/6 for `09aaaa058cbe159c`, `e192fdec77130aaa`, `87ac1f89811a5f2f`, `f482ca32cbe83fbf`, `e1b7e1285746c3c8`, and `74c6bca1ee47c81d`.
  Consequence: retain the bounded existing-tooling solution. Do not add port introspection, another process supervisor, longer arbitrary waits, or a dependency.

- Observation: readiness ownership alone does not preserve authoritative process failure after the stability interval.
  Evidence: finality Red run `20462cb2dfca850a` completed the unchanged Chromium assertion, logged `TASK_010_INTENTIONAL_POST_READINESS_API_EXIT code=23`, and still made the outer smoke exit 0; the seventh lifecycle case was the only failure at 6/7. Green races the Playwright result with both owned app results until explicit planned shutdown. Windows run `1701094defdc8065` and Ubuntu run `d069aea833ee006f` then passed the frozen seventh case with the owned API diagnostic and no cleanup-failure substitution.
  Consequence: continue monitoring direct children after readiness and distinguish explicit planned shutdown from unexpected completion; do not infer success merely because Playwright passed or cleanup could await an already-exited child.

- Observation: a disposable Ubuntu verifier running directly on a Docker Desktop Windows bind mount made the otherwise passing smoke take 71.164 seconds, exceeding the lifecycle controller's intentional 45-second case bound and producing an invalid 0/6 environment result.
  Evidence: a bounded diagnostic reproduced the controller's exact detached POSIX launch, printed the intended Node/npm paths, completed smoke run `fa7f878cf52fcec3` successfully with exact cleanup, and measured `durationMs=71164`. Copying the same read-only source snapshot onto native container storage reduced the independent smoke to 705 ms and the same lifecycle matrix passed 6/6.
  Consequence: do not widen repository timeouts for host-volume performance. Authenticate the clean source snapshot, run on native disposable storage, and preserve the bind-mount result as invalid environment evidence rather than hiding it or treating it as a product defect.

- Observation: fresh npm 11.16.0 audit metadata reported two transitive advisories, one moderate and one high, during the disposable immutable install, whereas the earlier local installation reported zero at its execution time.
  Consequence: advisory-database output is time-varying and is not a Milestone 2 behavior failure. Preserve it as a closure follow-up for dependency/security triage; do not run `npm audit fix --force` or change the frozen dependency graph under TASK-010 without a validated in-scope finding and separate TDD/authority.

- Observation: the first Milestone 4 integration invocation omitted the task's provisioned PostgreSQL port and Redis namespace, so it addressed the wrong/default services and failed during prerequisite authentication/configuration rather than executing product assertions.
  Evidence: that invalid invocation reported PostgreSQL password authentication failures and `TASK_007_REDIS_TEST_CONFIG_INVALID`. The sole corrected invocation used PostgreSQL `127.0.0.1:55432` plus Redis `127.0.0.1:6379` namespace `character-app:test:t010-closure-caef67ef` and passed 11 files/74 tests. Exact post-run database, schema, Redis, and port readbacks were empty.
  Consequence: retain the first invocation as invalid setup chronology, not product evidence or a retry of a valid gate. The corrected provisioned run is the controlling integration result.

## Decision Log

- Decision: creating this ExecPlan is planning authorization only. TASK-010 remains `Pending` until the project owner separately authorizes implementation.
  Rationale: accepted ADR-0017 and satisfied prerequisites provide direction and readiness, not execution authority.
  Date: 2026-08-20.

- Decision: accept the project owner's 2026-08-20 execution directive as the separate TASK-010 authorization and activate the existing workflow ID `TASK-010-20260820-01` without changing any frozen scope, URL, reuse, dependency, or visual decision.
  Rationale: the directive explicitly authorizes start and completion on the existing branch; the prerequisite, gate, AUTH-001, source-hash, toolchain, validator, and clean-tree readbacks remain consistent with this plan.
  Date: 2026-08-20 / primary coordinator.

- Decision: use URL parameters `sort`, `status`, `species`, and `gender`. `sort=asc` is the A-Z default and is omitted from the canonical default URL; `sort=desc` selects Z-A. Status values are `alive`, `dead`, and `unknown`; gender values are `female`, `male`, `genderless`, and `unknown`. Unsupported sort, status, or gender values are removed. Species remains open text but is trimmed and lower-cased; a blank value is removed. Normalization replaces the current history entry before querying so malformed URLs do not create a Back/Forward loop. Sort uses one English `Intl.Collator` with case-insensitive base sensitivity and the positive numeric character ID as the tie-breaker.
  Rationale: this is the smallest reversible projection of SPEC-002, SPEC-006, HS-015, and HS-016 and avoids a second state store or fabricated species enumeration.
  Date: 2026-08-20.

- Decision: render one labeled form containing sort, status, species, and gender plus one `Apply filters` action. Status and gender are closed selects with an `Any` choice; species is a text input. Draft form values may remain component-local until submission, while the normalized URL is the sole owner of applied values and GraphQL variables.
  Rationale: one explicit submission boundary avoids debounce timers, request races, and a filter-state library while preserving reload and browser-navigation restoration.
  Date: 2026-08-20.

- Decision: the complete visible surface is the existing product title, one list heading, one filter/sort form, one query-state region, one result grid, and cards containing only name, image, and species. Loading is concise status text, empty is concise explanatory text, and request failure is concise text plus one `Retry` action.
  Rationale: these elements satisfy the task without inventing product complexity. They are recorded durably in DPL-DEC-049.
  Date: 2026-08-20.

- Decision: use one local GraphQL Code Generator configuration with checked-in client-neutral operation output and a project-owned typed fetch executor. Pin `@tanstack/react-query` 5.101.4 and reuse GraphQL 16.14.2 plus the repository's existing Codegen major line. Generate no hooks and add no GraphQL-client runtime.
  Rationale: this implements accepted ADR-0017 with the fewest runtime concepts and keeps operation generation reproducible. Registry metadata was read without installing packages on 2026-08-20.
  Date: 2026-08-20.

- Decision: the TASK-010 list query disables automatic retry, focus refetch, and reconnect refetch. The visible `Retry` action initiates the only failure recovery request. Its complete query key is `['characters', statusOrNull, speciesOrNull, genderOrNull]`; sort is excluded because it is a client-only transformation of the same server data.
  Rationale: this keeps request counts and the error state deterministic without adding custom timing, persistence, or invalidation policy.
  Date: 2026-08-20.

- Decision: self-host only Bangers 400 and Space Grotesk 400/500 through exact `@fontsource/bangers` 5.3.0 and `@fontsource/space-grotesk` 5.3.0 packages. Add no icon, animation, component, form, schema-validation, or CSS-in-JS dependency.
  Rationale: the two packages implement the existing visual authority without runtime font requests or a new design framework.
  Date: 2026-08-20.

- Decision: use three implementation milestones before closure. Only Milestone 3 materially changes rendered UI and therefore uses the conditional `frontend-visual` profile. Milestones 1 and 2 remain on the unchanged standard route.
  Rationale: generated operations, data access, caching, CORS, CSP, and test-fixture setup are nonvisual responsibilities and must not be routed to the specialized visual worker merely because they affect `apps/web`.
  Date: 2026-08-20.

- Decision: accept the corrected Milestone 1 `MISSING` preflight and run its planned declarative dependency/Codegen setup before Red.
  Rationale: the operation document, generated artifact, and installed/query-generation graph are compilation prerequisites; failing tests on their absence would manufacture a setup failure instead of proving the missing executor, decoder, query-cache, and provider behavior. The current Vitest projects can cover the coherent runtime Red without a harness change.
  Date: 2026-08-20 / primary coordinator.

- Decision: make one exceptional primary implementation correction in `apps/web/src/data/graphql-executor.ts` after Green rather than exceed the code worker's two-turn milestone budget or silently waive the failed typecheck join.
  Rationale: the defect was one strict-TypeScript boundary expression, `signal` explicitly receiving `undefined`; the accepted behavior contract, tests, dependencies, scope, and architecture remained unchanged. The exception changed only that expression and was validated by the frozen focused tests, root typecheck, web build, generated drift check, and diff inspection.
  Date: 2026-08-20 / primary coordinator.

- Decision: accept S1 review `TASK-010-M1-REVIEW-01` and route its malformed-error-envelope finding through one fresh review-correction test/implementation pair and fresh milestone re-review.
  Rationale: ADR-0017 requires success to contain no GraphQL errors and malformed successful envelopes to fail decode/protocol classification. The finding is an in-scope regression against the frozen executor contract; one regression test and a tri-state error-envelope fix are sufficient, while Milestone 2 remains blocked from starting.
  Date: 2026-08-20 / primary coordinator.

- Decision: accept `TASK-010-M2-PREFLIGHT-01` as `PARTIAL` and open one coherent Red for the missing CORS allowlist/anonymous restriction, built-web CSP, browser endpoint configuration, and run-owned product-smoke setup/cleanup gaps.
  Rationale: existing API, import, migration, Redis, and six-case process-lifecycle behavior are reusable and must not be retested as absent. The selected Red uses the current Vitest projects and the one existing Playwright smoke, adds no dependency or second product boundary, and can prove every missing observable without public network access or a production test branch.
  Date: 2026-08-20 / primary coordinator.

- Decision: reject Milestone 2 Red attempt 1 as a coherent Red while preserving its valid partial evidence, and authorize the one allowed attempt-2 test-worker correction for natural Playwright shutdown after the intended failure.
  Rationale: the behavioral failures and exact cleanup are relevant, but a command that requires manual interruption cannot be frozen as the milestone Red or reused for Green. The correction does not change product behavior, authorities, external identities, or the expected missing CORS/config/CSP contract.
  Date: 2026-08-20 / primary coordinator.

- Decision: stop the exhausted test-worker correction route after the same post-teardown hang repeated, retain production Green as blocked, and perform bounded read-only coordinator triage of Playwright/web-server process ownership before deciding whether the repository's exceptional-primary-edit path is safe.
  Rationale: both fixture children now terminate naturally and external cleanup passes, so another identical test-worker retry would violate the recorded budget without adding evidence. The project owner's directive permits a genuinely necessary documented coordinator exception, but only after the primary identifies a narrow corrective path that does not weaken tests, bypass cleanup, or broaden product scope.
  Date: 2026-08-20 / primary coordinator.

- Decision: use the repository's exceptional-primary-edit path for one two-file test-harness correction after read-only triage, then require the frozen smoke to reproduce the intended Red and terminate naturally before Green.
  Rationale: Playwright starts web-server plugins before global setup, so global setup cannot build direct server entrypoints first. The existing nested `start:smoke` commands leave Playwright's Windows force-kill path waiting for a deeply nested shell tree. Extending the existing task-local fixture with `web` and `api` launcher modes preserves fresh workspace builds, one smoke suite, production server entrypoints, exact cleanup, and no dependency while reducing each owned web-server tree to one direct Node launcher. The test worker's budget is exhausted, no assertion or product byte changes, and the project-owner directive permits a genuinely necessary documented coordinator exception.
  Paths: `playwright.config.ts`; `tests/smoke/fixtures/task-010-runtime.ts` only.
  Required validation: frozen API/config Reds unchanged; one frozen smoke run must seed exactly 15 through existing seams, fail on missing CSP, clean/read back exact state, free ports, and exit nonzero naturally. If the hang repeats, stop and request owner input.
  Date: 2026-08-20 / primary coordinator.

- Decision: stop TASK-010 implementation at the Milestone 2 repeated-failure boundary and request project-owner direction; do not open production Green or attempt another Playwright/process-control correction.
  Rationale: the frozen product Red is behaviorally correct and external cleanup passes, but natural command termination is a binding acceptance property. The same post-cleanup hang occurred in both worker attempts and after the sole documented coordinator exception, falsifying the narrow nested-npm correction. Further work would exceed the task's repeated-failure, worker-turn, and exception budgets or require a materially new harness/process-ownership decision.
  Date: 2026-08-20 / primary coordinator.

- Decision: accept the project owner's explicit `go ahead` as authority to replace Playwright's built-in web-server ownership with one dedicated task-local smoke orchestrator and resume Milestone 2 through a fresh test-worker preflight and guarded harness slice.
  Rationale: this is the exact material harness expansion presented at the blocker. The orchestrator may update only the root smoke script owner, tools TypeScript inclusion, Playwright config, existing TASK-010 runtime fixture, and one new `scripts/run-smoke.ts`. It must reuse Node, `tsx`, Playwright, existing build scripts, migration/import composition, and cleanup behavior; it may not add a dependency, second suite, product behavior, forced `process.exit`, broad cleanup, or live public traffic. A naturally terminating frozen behavioral Red is still required before production Green.
  Date: 2026-08-20 / project owner and primary coordinator.

- Decision: accept the fresh S2 ready-unowned Major, correct the behavior classification to `REGRESSION`, and consume the single Milestone 2 review-correction loop through a convincing-listener Red and a one-file readiness Green.
  Rationale: the earlier plain-text HTTP fixture could not satisfy the frozen browser contract and therefore could not distinguish readiness rejection from a later assertion failure. The convincing fixture made the unchanged smoke falsely exit 0, while the smallest complete Green preserves the existing deadline and poll interval and makes acceptance contingent on the owned child's continued life. Separate test and implementation owners, exact one-file leases, Windows lifecycle, and corrected clean Ubuntu evidence preserve ADR-0016 and ADR-0018 without adding a dependency or broadening product scope.
  Date: 2026-08-20 / primary coordinator.

- Decision: after the corrected candidate's fresh S2 review found a distinct post-readiness owned-child failure window, stop the consumed ready-unowned correction route and rescope that remaining ADR-0018 invariant into a fresh bounded Milestone 2 finality slice.
  Rationale: the named readiness regression is Green and independently closed; the new Major begins only after readiness and concerns authoritative process-failure propagation during Playwright. The worker-first workflow requires re-evaluation rather than silently extending an exhausted correction budget. A fresh test/implementation instance may add only a deterministic owned-child-after-readiness lifecycle contract and the minimum runner monitoring needed to preserve the earliest application or Playwright failure through planned shutdown. This changes no architecture, dependency, product behavior, browser assertion, suite, or task scope and remains covered by the project owner's active TASK-010 execution and dedicated-orchestrator authorization.
  Date: 2026-08-20 / primary coordinator.

- Decision: accept refreshed reuse audit `TASK-010-M3-REUSE-20260820-01` and frontend-visual capsule `TASK-010-M3-CAPSULE-20260820-01` before Milestone 3 test preflight.
  Rationale: current `apps/web/src` still contains only the root provider/router, one heading-only Shell, Tailwind import, and Milestone 1 data/config owners; it contains no route, controls, card, shared primitive, story, or alternate style owner. App now owns the accepted Query provider and therefore joins Shell/styles as a bounded `EXTEND`; the route, controls, and card remain the only justified `CREATE` artifacts. Exact states, copy, viewports, focus/navigation interactions, successful native image attributes, deterministic browser target, and prohibited scope are already authoritative and require no new visual choice.
  Date: 2026-08-20 / primary coordinator.

- Decision: after M3 Green reached the frozen avatar-header assertion, stop the consumed original test-correction route and rescope the installed-Playwright observability mismatch as a fresh one-file evidence assignment.
  Rationale: the native image already renders successfully at 300x300 with exact source, meaningful alternative text, `crossOrigin="anonymous"`, `referrerPolicy="no-referrer"`, and expected cross-origin `Origin`. Installed Playwright 1.61.1 types and runtime state that `Request.headers()` omits security-related headers and `Request.allHeaders()` returns the complete raw set. Changing only the test read to `await avatarRequest.allHeaders()` preserves and strengthens every frozen security assertion; production cannot and must not fabricate the browser-owned Fetch Metadata header. If the complete-header API still omits `sec-fetch-mode`, stop as `UNKNOWN` rather than weaken the contract.
  Date: 2026-08-20 / primary coordinator.

- Decision: reject Chromium CDP correlation and direct `Sec-Fetch-Mode` observation as a Milestone 3 acceptance mechanism; route the redundant assertion through a fresh authority-scoped test audit.
  Rationale: ADR-0014 requires native `crossorigin="anonymous"`, `referrerpolicy="no-referrer"`, exact image URL, successful locally fulfilled CORS-enabled 300x300 response, Origin, and no Referer/cookie/authorization/custom JavaScript fetch. It does not require the browser's Fetch Metadata spelling. The current trace proves the routed requests omit `sec-fetch-mode` from retained raw headers, while installed CDP definitions mark extra-info delivery experimental and not guaranteed for every request. Adding Chromium-only event correlation would increase race and maintenance burden without proving an authoritative requirement. Removing only the redundant assertion after fresh test-owner confirmation preserves every governed security observation and is not a product correction.
  Date: 2026-08-20 / primary coordinator.

- Decision: accept the corrected Milestone 4 closure packet as the sole authoritative integrated validation candidate and submit it for fresh S2 acceptance review without yet changing TASK-010 or AC status.
  Rationale: every planned build, static, unit, real-boundary, application, browser, lifecycle, documentation, ADR, diff, and cleanup gate now passes on the unchanged implementation/test identities. The first integration command lacked the documented external-service identity and is invalid setup evidence; the corrected provisioned command passed completely. The reviewer must still reconcile the two current transitive advisories and pending `esbuild@0.28.2` install-script policy coverage as explicit follow-ups rather than silently treating them as fixed or waived.
  Date: 2026-08-20 / primary coordinator.

### Decision Review Contract: ADR-0018 smoke-process ownership successor

- Contract identity and tier: `DRC-T010-01`, decision-oriented `R3`. Cross-platform process equivalence, interruption recovery, exact cleanup ownership, and the reversal of an accepted architecture clause trigger the tier.
- Task and gate: TASK-010 owns the present implementation evidence; DG-001 remains `Resolved` and may point to a whole-record successor without reopening or changing task dependencies. The target artifact is ADR-0018, a whole-record successor to ADR-0011 that carries forward every unaffected Vitest, jsdom, integration-isolation, scope-activation, command, and network rule while replacing only smoke setup/server/cleanup ownership.
- Approval boundary: the project owner explicitly approved the decision substance with `go ahead` after receiving the bounded orchestrator proposal. The successor may record that approval only if the exact final artifact preserves that scope, scores at least 85, receives fresh final `PASS` or fully dispositioned `PASS WITH FOLLOW-UPS`, and leaves no hard gate open. Any materially different process model, dependency, test scope, or optional commitment returns for owner direction.
- Frozen candidates: A, restore Playwright `webServer` and its process ownership; B, keep Playwright as the single Chromium test runner but place builds, exact fixture setup/cleanup, readiness, and direct Node server children under one existing-`tsx` orchestrator; C, add or reuse a generic shell/process supervisor around Playwright and the servers. Candidate A carries the observed repeated Windows hang; C fails proportionality if it adds a dependency, nested shell tree, or second lifecycle owner without stronger evidence.
- Common criteria and evidence: compliance with NFR-004 and adopted OR-001/OR-004/OR-007; strict TypeScript/ESM fidelity; single Chromium scope; natural success/failure exit; primary-failure preservation; exact PostgreSQL schema and Redis-prefix cleanup; owned-port release after normal, startup, assertion, timeout, cancellation, and interruption paths; no public Rick and Morty JSON/avatar request; Windows and clean/hosted portability; implementation/test/runtime/documentation burden; next-feature friction; and reversibility.
- Hard gates: no new dependency, runner, browser suite, product branch, public request, broad process/data cleanup, weakened assertion, or force-exit; one unambiguous process owner; exact cleanup always attempted and externally recoverable after forced tree termination; strict tools typecheck; the existing focused tests and smoke remain unchanged; all six local Windows lifecycle cases pass; clean-checkout or hosted-platform proof remains a downstream Milestone 2 acceptance gate rather than invented research evidence.
- Decide now: which component owns fresh builds, fixture setup/cleanup, server children, readiness, and Playwright invocation; how primary and cleanup failures compose; which prior ADR-0011 rules remain authoritative; reversal triggers. Prove later: supported hosted/clean environment execution for the already-defined process contract and Milestone 3 consumption of the browser endpoint.
- Required ADR sections: the repository-standard `Context`, `Decision drivers`, `Considered options`, `Decision`, `Consequences`, `Risks and mitigations`, `Validation`, `Evaluation`, and `References`, including explicit proportionality across changed files, test/runtime burden, tooling/docs, recurring operator work, next two plausible frontend/browser extensions, and removal cost.
- Cumulative invariant packet:

  | ID | Trigger or fixture | Expected result | Evidence or current actual result | Responsible reviewer |
  |---|---|---|---|---|
  | `T010-ADR-I1` | Compare every ADR-0011 Decision, risk, validation, command, scope-activation, and exclusion clause with the successor | Every unaffected rule is carried forward; only smoke process ownership changes | `T010-ADR-R3-TRACE-01` produced the matrix; final review `T010-ADR-R3-FINAL-01` passed the exact whole-record comparison | Pre-draft and final `critical_research_reviewer` |
  | `T010-ADR-I2` | Read the three Playwright-owned runs, valid orchestrator Red, Green, local lifecycle runs, and hosted evidence inventory | Invalid hangs, valid local proof, the permission-qualified rerun, and missing hosted proof remain distinct | Hung `f2180f1152185c41`, `698c67dbe72ddaff`, `03e0955e4d4d2f06`; valid Red `8800f9d33af8e14b`; Green `8672163ce3773f30`; local lifecycle 6/6; no hosted/clean run | Primary plus both critical reviewers |
  | `T010-ADR-I3` | Read final ADR metadata, ADR index, DG-001, TASK-010, and approval evidence | ADR-0011 is `Superseded`; ADR-0018 is `Accepted` only for the owner-approved bounded substance; DG-001 stays `Resolved`; TASK-010 stays `In progress` | Exact cycle-2 final review passed the accepted ADR, current authority mappings, `Resolved` gate, and `In progress` task state | Final `critical_research_reviewer` and primary reconciliation |
  | `T010-ADR-I4` | Normal, startup-conflict, assertion-failure, readiness-timeout, cancellation, and interruption fixtures | One orchestrator owns direct app children in normal execution; external verifier terminates only the recorded tree and performs exact recovery | `T010-ADR-R3-PROCESS-01`; corrected permission-qualified local Windows lifecycle 6/6; corrected disposable native-storage Ubuntu lifecycle 6/6 on source aggregate `41EE058F...` | Process researcher, both critical reviewers, downstream milestone reviewer |
  | `T010-ADR-I5` | A primary Playwright/startup failure combined with a cleanup failure | Original failure remains primary; cleanup failure is separate; result is nonzero; every cleanup step is attempted | Static runner/verifier inspection and current lifecycle results support the contract; combined hosted fault proof remains downstream | Pre-draft/final critical reviewers and downstream milestone reviewer |
  | `T010-ADR-I6` | Compare A/B/C across files, dependencies, suites, runtime, docs, operator burden, next two browser features, and removal | Reject dependency, second suite, generic supervisor, nested shell owner, or added abstraction without present evidence | Both research reports select existing-tooling B; A fails observed cleanup, C fails proportionality | Decision analyst and both critical reviewers |
  | `T010-ADR-I7` | Final supersession diff and inbound-link inventory | Reciprocal links, historical relocation, current-authority updates, repaired historical links, preserved chronology, and passing validators | Final cycle-2 review passed the exact supersession diff and authority readback; ADR and documentation validators pass | Final `critical_research_reviewer` and primary documentation gate |
- Research routing and budget: one `critical_researcher` owns the R3 cross-platform/process/recovery dimension; one `technology_researcher` owns whole-record carry-forward, proportionality, and traceability. After the synchronization barrier, one mandatory `decision_analyst` returns `DRAFT READY`, `RETURN FOR RESEARCH`, or `OWNER DIRECTION`; one fresh `critical_research_reviewer` performs the pre-draft contract checkpoint. The primary drafts and writes the sole authoritative artifact; one separate fresh `critical_research_reviewer` performs final exact-artifact review. One bounded researcher follow-up and two final-artifact correction cycles are the maximum.
- Research barrier: `T010-ADR-R3-PROCESS-01` returned `RESEARCH COMPLETE` with A failing observed natural Windows termination, B satisfying every current hard gate with hosted proof open, and C failing one-owner/proportionality gates. `T010-ADR-R3-TRACE-01` returned `RESEARCH COMPLETE` with the whole-record carry-forward matrix, B as the sole proportionate candidate, and the supersession/inbound-link inventory. Mandatory analyst `T010-ADR-R3-SYNTHESIS-01` returned `DRAFT READY`, candidate B, provisional score 92/100, no unresolved owner choice, and hosted/clean execution assigned to downstream Milestone 2 proof rather than architecture semantics.
- Final artifact barrier: cycle-1 review returned two Major carry-forward/current-mapping findings and one ADR-0015 trace Minor. The primary restored the unaffected project-ownership, integration-prerequisite, deterministic-selection, and reversal clauses; added ADR-0018 to both TASK-010 governing-decision lists; and linked ADR-0015. Cycle-2 review `T010-ADR-R3-FINAL-01` returned `PASS` with no finding on exact ADR-0018 SHA-256 `F2F31B119688ADD84C5946E9427BA8462C10D5E9A25D566AF2CEB1A9CE22D4F7`; I1-I7 pass, DG-001 remains `Resolved`, and TASK-010 remains `In progress`.
- Stops and forbidden changes: stop for contradictory mandatory requirements, inability to restate the whole record without changing unrelated semantics, a process owner not covered by exact cleanup, missing owner authority for changed substance, repeated evidence gaps, or review-budget exhaustion. Research and decision work may not edit production, tests, manifests, lockfiles, task dependencies, requirement classifications, optional dispositions, or claim hosted/acceptance evidence.

## Outcomes & Retrospective

Activation outcome as of 2026-08-20 20:54Z: TASK-010 is `In progress` under explicit project-owner authorization on the existing branch and workflow ID. The authoritative activation documents changed, but no product source, test, manifest, lockfile, dependency, runtime behavior, or acceptance result exists yet. Milestone 1 preflight is next.

Milestone 1 outcome: exact dependency pins, client-neutral generation, the narrow Characters operation, typed executor/decoder, complete query-key owner, isolated QueryClient factory, and one root provider are implemented. Corrected Red failed for the absent runtime boundary; initial Green and post-Refactor passed 27/27; the root typecheck and web build passed after the recorded coordinator exception. The first reviewer found one malformed-error-envelope Major; its regression Red failed exactly once, correction Green passed 22/22, and the cumulative focused scope passes 28/28 with root typecheck and web build. Fresh re-review closed the Major and returned `PASS WITH FOLLOW-UPS`; its final-evidence Minor is resolved below. No rendered list, CORS/CSP, PostgreSQL browser path, or TASK-010 acceptance is claimed before later milestones and integrated closure.

Milestone 2 outcome: the browser runtime now uses one configurable GraphQL endpoint, explicit anonymous loopback CORS, the accepted built-web CSP, deterministic run-owned PostgreSQL/Redis fixture state, and one repository-owned smoke orchestrator. Decisive review corrections reject a browser-compatible unowned listener and preserve an owned child failure after readiness. Final tools checks, Windows lifecycle 7/7, clean Ubuntu smoke 1/1 and lifecycle 7/7, exact residue cleanup, affected-test relevance, and fresh S2 review pass on fingerprint `9AC7E6D10100B9175F0763D89FBA39F0E3913F637796D6CDA66EEFDE535396CA`. This accepts only the isolated runtime/security/process foundation; rendered cards, list states, sorting, filters, URL navigation, SPEC-001/002/006, AC-001/AC-002, and TASK-010 closure remain pending.

Milestone 3 outcome: the root route now renders the accepted bounded character-list experience with exact card fields, deterministic A-Z/Z-A sorting, adopted status/species/gender filters, canonical URL ownership, reload and browser-history restoration, accessible loading/empty/error/Retry states, and successful native anonymous/no-referrer images. Review corrections established explicit QueryClient injection/fresh test clients, omission of default `sort=asc`, and real-browser console/page-error evidence. Fresh S2 confirmation passed fingerprint `4076A45C5C1FF70EEE4F2F6F0893E895F528A8178C5BAB95B4524A48F86635CC` with no finding; TASK-012 responsive/detail/image-failure scope remains excluded.

Milestone 4 outcome: the complete closure command matrix passes, exact external state is clean, and the cumulative relevance audit found no obsolete or irrelevant test. Fresh integrated S2 review returned `PASS WITH FOLLOW-UPS` with no finding; the primary reconciled TASK-010, AC-001, AC-002, 7/12 readiness, runtime/status/specification owners, the dated review, and the completed-plan archive, then reran the documentation gate. TASK-010 is complete without claiming TASK-012 scope or any commit, push, PR, publication, or deployment.

## Purpose / Big Picture

After TASK-010 is separately authorized and completed, visiting `/` in a real browser will show the 15 imported characters through the project GraphQL API. A user can read cards containing exactly name, image, and species; choose deterministic A-Z or Z-A ordering; apply status, species, and gender filters; reload or use Back/Forward without losing applied state; and distinguish loading, empty, and request-error outcomes.

The visible result remains deliberately small. It establishes the first browser-to-GraphQL-to-PostgreSQL product path without building detail navigation, mutations, a design system, a component workshop, or the responsive and image-failure work owned by later tasks.

## Context and Orientation

TASK-010 owns [FR-FE-001](../../REQUIREMENTS.md#fr-fe-001---character-list), [FR-FE-002](../../REQUIREMENTS.md#fr-fe-002---sorting), [NFR-001](../../REQUIREMENTS.md#nfr-001---frontend-technologies), [AC-001 and AC-002](../../REQUIREMENTS.md#8-minimum-acceptance-criteria). It also implements adopted optional [OR-003](../../REQUIREMENTS.md#or-003---interface-filters) and contributes adopted optional OR-004 tests without reclassifying either as source-mandatory.

The governing decisions are [ADR-0002](../../adrs/0002-use-typescript-across-the-stack.md), [ADR-0006](../../adrs/0006-define-a-use-case-oriented-graphql-contract.md), [ADR-0009](../../adrs/0009-keep-frontend-state-close-to-its-owner.md), [ADR-0014](../../adrs/0014-persist-and-deliver-character-image-urls-directly.md), [ADR-0016](../../adrs/0016-use-milestone-slice-tdd-with-independent-test-and-implementation-ownership.md), [ADR-0017](../../adrs/0017-use-tanstack-query-with-a-project-owned-typed-graphql-executor.md), and [ADR-0018](../../adrs/0018-define-the-typescript-test-harness-with-repository-owned-smoke-orchestration.md). The routed observable rules are [SPEC-001, SPEC-002, and SPEC-006](../../specs/SPEC.feature) plus the list/sort/filter portions of [HS-015, HS-016, and HS-017](../../specs/HARD_SPEC.feature).

The UI authorities are the [field-visibility decision](../../ui/README.md#ui-field-visibility-decision), [data-driven constraints](../../ui/README.md#data-driven-design-constraints), and [Interdimensional Dark visual foundation](../../ui/visual-foundations.md). DPL-DEC-049 owns the reversible TASK-010 choices that those authorities intentionally left open.

Existing implementation boundaries to reuse are:

- `apps/web/src/app.tsx` for root routing;
- `apps/web/src/shell.tsx` for the product frame and title;
- `apps/web/src/styles.css` for Tailwind and task-local tokens/styles;
- `apps/web/src/app.application.test.tsx` and `apps/web/src/shell.unit.test.tsx` for current route and shell characterization;
- `apps/web/server.ts` for built-web headers and history fallback;
- `apps/api/src/transport/graphql/schema.ts` as the single GraphQL schema source;
- `apps/api/src/app.ts` and `apps/api/src/transport/graphql/graphql-handler.ts` for the browser-to-GraphQL HTTP boundary;
- `playwright.config.ts` and `tests/smoke/walking-skeleton.smoke.test.ts` for the single existing narrow browser smoke.

Prerequisites TASK-005 and TASK-009 are complete. DG-001 through DG-004 and DG-006 are resolved through their accepted decisions, and AUTH-001 is Authorized for the bounded direct-avatar behavior. The project owner supplied the separate execution authorization on 2026-08-20, and canonical TASK-010 is now `In progress`.

## Scope and Non-Goals

### Required visible elements

| Element | Exact TASK-010 responsibility | Reuse disposition |
|---|---|---|
| Application frame | Preserve one product title and add one semantic main-content outlet. No global navigation is needed yet. | `EXTEND` `apps/web/src/shell.tsx` |
| Character list route | Own URL normalization, query-state selection, result ordering, and composition of the controls and result grid at `/`. | `CREATE` one route-local component |
| Filter and sort controls | One labeled form: A-Z/Z-A sort select, status select, species text input, gender select, and one `Apply filters` button. | `CREATE` one task-local component |
| Character card | Render only `name`, native `imageUrl`, and `species`; use `id` only as the React key. Set meaningful alt text, anonymous CORS, and no-referrer on the native image. | `CREATE` one task-local component |
| Query states | Render loading text, empty text, or request-error text plus one Retry action in the route. Do not create one component per state. | `REUSE_AS_IS` route semantics; keep inline |
| Visual styles | Apply the documented dark tokens, visible 2-pixel cyan focus, restrained borders/spacing, and self-hosted documented fonts. | `EXTEND` `apps/web/src/styles.css` |

No present duplication justifies `EXTRACT_LOCAL`. Do not create a shared component package, design-system directory, primitive layer, generic card variants, generic data-state framework, or generalized form abstraction. Refresh this audit immediately before Milestone 3; tree drift or a newly available reusable owner stops Green until the coordinator accepts a new disposition.

Required visible copy is equally bounded:

| Owner | Exact visible copy |
|---|---|
| Product title | `Rick and Morty Explorer` |
| List heading | `Characters` |
| Controls | Labels `Sort`, `Status`, `Species`, and `Gender`; options `A-Z`, `Z-A`, `Any status`, and `Any gender`; action `Apply filters` |
| Loading | `Loading characters...` |
| Empty | `No characters match these filters.` |
| Error | `Characters could not be loaded.` and action `Retry` |

Status/gender option labels use their source names (`Alive`, `Dead`, `Unknown`, `Female`, `Male`, and `Genderless`). Do not add a hero statement, introduction, helper paragraph, result count, promotional copy, or decorative slogan.

### Required state and viewport matrix

| State or interaction | Required evidence in TASK-010 | Explicit boundary |
|---|---|---|
| Populated list | Fifteen imported summaries render through GraphQL; every card has only the three approved visible fields. | No result count, pagination, badges, or detail link |
| Loading | A stable text status is exposed while the list query is pending. | No skeleton library or decorative loader |
| Empty | A stable empty result is distinguishable from loading and failure. | No illustration or invented call to action |
| Request error | A stable non-sensitive message and one Retry action preserve the current query key. | No error-detail panel or notification framework |
| Sort and filters | Apply each control alone and in combination; reload and Back/Forward restore URL-derived state. | No Zustand or duplicate applied-state copy |
| Successful image | Exact governed avatar URL loads in a native image with `alt=<name>`, `crossorigin=anonymous`, and `referrerpolicy=no-referrer`. | Failure fallback/retry belongs to TASK-012 |
| 375 px and 1280 px | Inspect the populated route, controls, focus, and required states for usable hierarchy and no immediate horizontal overflow. | Supporting milestone evidence only; AC-006 and full 375/768/1280 closure belong to TASK-012 |

### In scope

- a client-neutral generated `Characters` operation returning exactly `id`, `name`, `imageUrl`, and `species`;
- one project-owned typed GraphQL fetch executor with ADR-0017 media-aware success/error mapping;
- one stable character-list query key derived from normalized GraphQL variables and one fresh `QueryClient` per test/application owner;
- the root Query provider and configurable browser GraphQL endpoint, defaulting to the documented loopback API and overridden for smoke;
- the four DPL-DEC-049 URL parameters, normalization, stable locale-aware case-insensitive sort with ID tie-breaker, and API variable mapping;
- explicit anonymous browser CORS for the two repository-owned loopback web origins and an enforcing built-web CSP for the exact avatar path;
- deterministic isolated smoke data created through existing import/persistence behavior with injected local character payloads, a unique PostgreSQL schema and Redis namespace, and unconditional exact-scope cleanup;
- the bounded visible elements and states in the tables above;
- focused unit/application tests, one extended narrow browser smoke, accepted real-browser evidence, and task-closure documentation.

### Out of scope

- `/characters/:id` behavior, selectable cards, detail links, favorites, comments, or any mutation; these belong to TASK-011 and TASK-008;
- name, origin, or type filters; a filter reset button; result counts; pagination; infinite scroll; virtualized lists; saved filters; autocomplete; suggestions; or a hard-coded species catalog;
- visible IDs, status, gender, type, origin, location, episode, favorite badges, comment counts, or any card metadata beyond name, image, and species;
- image proxying, assets, JavaScript image fetching, retries, alternate sources, failure fallback, provider telemetry, or full image-resilience proof;
- AC-006 closure, full responsive proof, the 768-pixel matrix, detail layouts, or resilient image/error presentation owned by TASK-012;
- Storybook activation, static mockups, screenshot-golden tests, visual-regression services, a component library, a design system, theme switching, runtime Google Fonts, icons, illustrations, gradients, glass, glow, oversized hero copy, decorative badges, or motion;
- GraphQL subscriptions, mutations, normalized entity caching, optimistic updates, offline persistence, SSR, hydration, authentication, localization infrastructure, analytics, or observability additions;
- a second smoke suite, live upstream character-JSON traffic, or live avatar dependency in automated tests.

If execution uncovers an attractive idea outside these boundaries, do not implement it. Record it only when a present, evidenced problem meets the repository's technical-debt policy; otherwise leave it untracked under YAGNI.

## Plan of Work

The owner explicitly authorized TASK-010 and the primary coordinator changed the canonical task state to `In progress` at the 2026-08-20 20:54Z activation barrier. The implementation workflow ID remains `TASK-010-20260820-01` unless a material authority change requires a successor plan identity.

For each implementation milestone, the primary issues one complete Milestone Assignment Packet v2, captures a fresh relevant-tree fingerprint, and routes sequential leases. The default budget is one preflight, one coherent Red or passing characterization, one Green with optional same-turn Refactor, at most one same-contract correction per role, and one review correction loop. The test worker may use at most three turns; the applicable implementation worker may use at most two. Stop after the same decisive failure twice, two no-diff write handoffs, an invalid Red, changed authority or visual capsule, dependency drift, a lease violation, contaminated external state, or exhausted budget.

No writer is parallel-safe in this worktree. Independent read-only dependency, reuse, and environment inspection may run concurrently before a write barrier. Red and Green are always sequential, and Milestone 3 cannot start until Milestones 1 and 2 pass their joins.

### Milestone 1: Typed list-query transport and cache ownership

Observable acceptance contract: a generated, client-neutral `Characters` document accepts only status, species, and gender variables and returns only the four `CharacterSummary` fields. The project-owned fetch executor sends the document and variables to the configured `/graphql` endpoint and applies ADR-0017 precedence for abort, network, GraphQL, decode/protocol, and HTTP failure. A small operation-specific decoder verifies that `data.characters` is an array of values containing string `id`, `name`, `imageUrl`, and `species`; generated TypeScript alone is not treated as runtime validation. Preserve only bounded HTTP status and stable GraphQL codes, never raw response bodies or internal detail. TanStack Query owns server data under the exact complete key recorded above, disables automatic retry/focus/reconnect requests, gives every test a fresh `QueryClient`, and gives the root application exactly one client instance. Neither executor nor query owner calls the upstream character API.

Before Red, a standard-profile setup lease may update only the web manifest/lockfile, web Codegen configuration/scripts, operation source, and generated output with exact pinned dependencies. Declarative setup is validated through generation/check/build; it does not justify an artificial behavior test.

Preflight target: current web manifest, routing composition, all web tests, API schema/codegen source, accepted ADR-0017, and installed lockfile graph. The test worker returns one ADR-0016 classification for generation drift, request serialization, media/error mapping, normalized query keys, cache isolation, and root provider ownership. Current planning inspection suggests `MISSING`; preflight remains authoritative.

Test ownership is limited to focused web unit/application tests for the executor, query owner, and provider. Green ownership is limited to the web manifest/lockfile, one web Codegen configuration and operation, checked-in generated output, one project-owned executor, one task-local list-query owner, and root Query provider composition. API behavior, visible list components, CSS, browser security headers, smoke infrastructure, and unrelated packages are frozen.

Risk is `S1`: ordinary bounded application/client integration. Escalate for a hand-edited generated file, generated hook/client runtime, unstable or non-serializable key, shared QueryClient across tests, swallowed GraphQL error, secret/error-detail exposure, upstream JSON request, extra summary field, or dependency outside the recorded set.

Focused Red/Green command shape, finalized against actual test filenames during preflight:

    npm exec -- vitest run --config vitest.config.ts --project web-unit --project web-application <Milestone-1 test paths>

Milestone validation:

    npm run typecheck
    npm run build --workspace @rick-and-morty/web

The generated-output drift check must be an authoritative web build prerequisite, mirroring the established API approach without sharing generated server types. A fresh `milestone_reviewer` performs the S1 semantic review. Milestone yield is typed list data and cache ownership only; it does not prove a rendered list, CORS/CSP, PostgreSQL, or browser behavior.

### Milestone 2: Isolated browser runtime and security-header boundary

Observable acceptance contract: a browser at the repository-owned development or built-web loopback origin can make an anonymous GraphQL request to `/graphql`, while an unrecognized origin does not receive permission. The built web response emits the ADR-0014 path-qualified avatar CSP. The single smoke environment creates a unique test-owned PostgreSQL schema and `character-app:test:t010-smoke-<runId>` Redis namespace, applies the existing migration, publishes the deterministic 15-character batch through existing import/persistence behavior with injected local payloads, starts the API against those identities, and always removes only its own schema and exact Redis prefix. No public character JSON or avatar request occurs in this milestone.

Preflight target: `apps/api/src/app.ts`, GraphQL handler/application tests, `apps/web/server.ts`, `.env.example`, `playwright.config.ts`, current smoke and lifecycle tests, migration/import composition, and test-owned PostgreSQL helpers. The test worker classifies CORS, CSP, smoke endpoint configuration, deterministic seed, and cleanup independently. Existing API/import tests may be reused only when their full evidence identity matches; current inspection suggests explicit browser CORS, CSP, and product-smoke ownership are `MISSING`.

Test ownership is limited to focused API/web header tests, `playwright.config.ts`, the existing smoke test, and the minimum task-local smoke fixture/cleanup support. Green ownership is limited to API GraphQL CORS configuration, built-web CSP/header composition, browser endpoint configuration, and the minimum production seam required by a valid Red. The visual route, controls, cards, CSS presentation, unrelated API behavior, import policy, migrations, and public upstream client are frozen.

Risk is `S2` because the milestone crosses browser, web server, GraphQL HTTP, PostgreSQL, Redis, migration/import, and lifecycle boundaries. Escalate for wildcard credentials, an origin derived from untrusted request data, a broader `img-src`, schema/database or Redis cleanup without exact ownership, live upstream JSON, public avatar access, a production test branch, a second migration/import implementation, or lifecycle residue.

Focused commands are selected by the Red but must remain within existing projects and the one smoke boundary. Milestone validation includes:

    npm run typecheck
    npm run build
    npm run test:application
    npm run test:smoke
    npm run test:smoke:lifecycle

Record the unique schema, PostgreSQL container/port, Redis container/port/namespace, web/API ports, CSP value, allowed/disallowed origin results, network-denial evidence, exact-prefix empty readback, and cleanup result. A fresh `independent_reviewer` performs the S2 cross-boundary review. Milestone yield is a deterministic browser runtime foundation only; it does not prove cards, visual quality, sort, filters, or AC-001/AC-002.

### Milestone 3: Bounded visible character-list experience

Observable acceptance contract: `/` renders the exact visible surface defined above. Fifteen real imported summaries appear as cards containing only name, image, and species. The default is stable A-Z; Z-A reverses name order while ties remain deterministic by ID. Status, species, and gender each affect the URL, GraphQL variables, and visible results, and the combined state survives reload plus browser Back/Forward. Loading, empty, and request-error/retry states remain distinct. Exact avatar requests are native, anonymous, no-referrer requests permitted only by the accepted CSP and locally intercepted with deterministic CORS-enabled 300-by-300 fixtures.

Preflight target: every current web component/style/test/fixture path, Milestones 1 and 2 evidence, DPL-DEC-005, DPL-DEC-006, DPL-DEC-049, UI field constraints, and the accepted reuse audit refreshed against the current tree. The test worker classifies the grouped card/list/state/sort/filter/navigation contract. The slice contains multiple scenarios because they jointly define one root list experience; it must not be split into styling microcycles or expanded into later-task behavior.

Test ownership is limited to focused card/route unit and application tests plus the existing narrow smoke test. The frozen accepted Red must cover approved card fields and exclusions, stable both-direction sorting, each filter, combined variables/URL, normalization, reload, Back/Forward, loading, empty, error, retry, image attributes, and the final real path. Green ownership is limited to `apps/web/src/app.tsx`, `apps/web/src/shell.tsx`, `apps/web/src/styles.css`, the three accepted task-local component owners, and exact font imports. Data-access semantics, generated output, manifests/lockfile, API, servers, smoke fixture ownership, and tests are frozen.

Risk is `S2` because the first visible product slice integrates rendered state, URL navigation, a generated GraphQL client boundary, real PostgreSQL data, CSP-governed cross-origin images, and browser evidence. Escalate for a new visible field/control, changed URL decision, duplicated applied state, unstable sort, filter not reaching GraphQL, hidden error, missing keyboard focus, unavailable reuse owner, new component/dependency beyond the capsule, live public network access, fallback behavior, or responsive-closure claim.

Conditional frontend-visual capsule:

- Capsule identity: `TASK-010-M3-CAPSULE-20260820-01`; accepted on current Milestone 2 fingerprint `9AC7E6D10100B9175F0763D89FBA39F0E3913F637796D6CDA66EEFDE535396CA` and reuse projection `F722EC12CD54A3CC5A774C33EC4C81602CBAE53AA7E4652008C314C5BF32692B`.
- Implementation profile: `frontend-visual`.
- UI/design authorities: DPL-DEC-005, DPL-DEC-006, DPL-DEC-049, `docs/ui/README.md`, and `docs/ui/visual-foundations.md`.
- Reuse audit: refreshed `TASK-010-M3-REUSE-20260820-01` over the ordered 19-path component/route/style/data/test/dependency/authority projection. Dispositions are `EXTEND` for `apps/web/src/app.tsx`, `apps/web/src/shell.tsx`, and `apps/web/src/styles.css`; `REUSE_AS_IS` for the Milestone 1 config, executor, generated operation, query owner, Query provider semantics, and inline route-state pattern; `CREATE` only for one route, one controls component, and one card; no `EXTRACT_LOCAL`. Reproduce the projection with the same uppercase per-file SHA-256 plus tab/LF serialization used for milestone fingerprints over: `docs/ui/README.md`; `docs/ui/visual-foundations.md`; `apps/web/package.json`; `package-lock.json`; `apps/web/src/main.tsx`; `apps/web/src/app.tsx`; `apps/web/src/shell.tsx`; `apps/web/src/styles.css`; `apps/web/src/config.ts`; `apps/web/src/data/characters.graphql`; `apps/web/src/data/generated/graphql.ts`; `apps/web/src/data/graphql-executor.ts`; `apps/web/src/data/characters-query.ts`; `apps/web/src/app.application.test.tsx`; `apps/web/src/shell.unit.test.tsx`; `vitest.config.ts`; `playwright.config.ts`; `tests/smoke/walking-skeleton.smoke.test.ts`; `tests/smoke/fixtures/task-010-runtime.ts`.
- Required states: populated, loading, empty, request error with Retry, and successful image. Mutation pending and image failure are not applicable to this task.
- Viewports/interactions: Chromium at 375 by 812 and 1280 by 800; keyboard through every control and Retry; Apply, reload, Back, and Forward; inspect populated plus loading/empty/error without claiming TASK-012 closure.
- Browser evidence: the single TASK-010 product smoke against the exact Milestone 2 schema/container/build identities, with deterministic local avatar interception, screenshot only when it materially supports visual review, and network/console inspection for the governed GraphQL/avatar boundaries.
- Prohibited scope: every item in this plan's out-of-scope list, especially Storybook, mockups, extra card fields, detail navigation, reset/count/pagination controls, image fallback, theme switcher, gradient/glass/glow/badges/motion, or a new frontend dependency.

Focused Red/Green command shape, finalized to the accepted test paths:

    npm exec -- vitest run --config vitest.config.ts --project web-unit --project web-application <Milestone-3 test paths>

Milestone validation:

    npm run typecheck
    npm run build --workspace @rick-and-morty/web
    npm run validate:tailwind
    npm run test:smoke

The specialized `frontend_code_worker` performs Green and optional same-turn behavior-preserving Refactor only after the primary accepts the refreshed audit and complete capsule. A fresh `independent_reviewer` performs the S2 review, including the same accepted reuse dispositions and browser evidence. Milestone yield is SPEC-001, SPEC-002, SPEC-006 and the TASK-010 portions of HS-015 through HS-017, subject to integrated closure.

### Milestone 4: Integrated validation, acceptance, and closure

This is a standard evidence/documentation milestone and contains no frontend-visual marker. First perform a cumulative relevance audit: every test must map to TASK-010 behavior or a changed shared boundary, every fixture must be deterministic, no public network may be required, no focused/skipped/pending test or obsolete duplicate may remain, and the single smoke must still prove browser -> project GraphQL -> PostgreSQL plus exact locally intercepted avatar requests.

Run the complete authoritative closure packet once on the exact candidate:

    npm run typecheck
    npm run build
    npm run validate:tailwind
    npm run test:unit
    npm run test:integration
    npm run test:application
    npm run test:smoke
    npm run test:smoke:lifecycle
    python .agents/skills/verify-repository/scripts/validate_docs.py
    python .agents/skills/govern-adrs/scripts/validate_adrs.py
    git diff --check

Record exact Node/npm versions, candidate commit/tree or relevant-tree fingerprint, generated-output identity, PostgreSQL container/port/schema, Redis identity if the list path exercised it, web/API ports, Chromium version, avatar fixture digest, intercepted request list and headers, blocked upstream JSON evidence, counts, teardown result, and dirty-tree scope. External-state evidence is not reusable without all identities.

A fresh `independent_reviewer` performs the integrated S2 acceptance review against FR-FE-001, FR-FE-002, NFR-001, adopted OR-003/OR-004, AC-001, AC-002, SPEC-001, SPEC-002, SPEC-006, HS-015, HS-016, and HS-017. The primary alone reconciles the verdict, updates authoritative task/acceptance/current-status owners, writes or links the dated review, completes the documentation-impact table, moves this plan to `docs/plans/completed/`, repairs links, reruns documentation validation, and declares closure.

TASK-010 is done only when all of the following are true:

- the exact list/card/sort/filter/URL/state behavior passes focused and integrated tests;
- the final narrow browser smoke renders the deterministic imported 15 through project GraphQL and PostgreSQL with no upstream character-JSON dependency;
- exact avatars are locally intercepted and demonstrate anonymous CORS/no-referrer under the enforcing path-qualified CSP;
- the accepted reuse audit and visual capsule have no unresolved review finding;
- no out-of-scope component, field, interaction, dependency, or later-task claim was introduced;
- task-owned external state and processes are clean;
- the task-closure documentation gate passes and canonical TASK-010/AC states are truthful.

## Concrete Steps

All commands run from the repository root unless a command explicitly selects a workspace.

1. At the completed activation checkpoint, read back TASK-010, DPL-DEC-049, this plan, current authority states, and the working tree; accept the explicit execution authorization and update TASK-010 to `In progress` before starting a lease.
2. Refresh registry metadata before a manifest write. If a selected exact version or peer range drifted, stop for a planning decision rather than silently changing the dependency contract.
3. Execute Milestone 1 through the standard `test_worker` -> `code_worker` route, close every lease, accept evidence, and obtain its S1 review before advancing.
4. Execute Milestone 2 through the standard route against uniquely owned PostgreSQL/browser state, verify unconditional cleanup, and obtain its S2 review before advancing.
5. Refresh and accept the reuse audit and frontend-visual capsule. Execute Milestone 3 through `test_worker` -> `frontend_code_worker`, capture browser evidence at the two named viewports, close every lease, and obtain its S2 review.
6. Freeze the candidate, perform the relevance audit and one closure packet, request a fresh integrated S2 acceptance review, and correct only actionable in-scope findings through a new bounded cycle.
7. Reconcile documentation and status only after PASS. Preserve historical reviews and this living chronology; archive the plan only after the documentation gate passes.

## Validation and Acceptance

Focused milestone commands prove only their assigned contracts. A passing jsdom component test does not prove browser navigation, CSP, native image headers, responsive behavior, or PostgreSQL. A passing browser screenshot does not prove field exclusions, sort stability, URL normalization, query variables, or error taxonomy. The final acceptance claim therefore requires the combined test boundaries listed above.

The acceptance reviewer must explicitly report:

- card field inclusion and exclusion;
- default and reverse stable sort results;
- each adopted filter and combined filter variables/results;
- canonical URL, invalid-value recovery, reload, Back, and Forward;
- loading, empty, error, Retry, and successful-image states;
- keyboard focus and the two milestone viewports without promoting AC-006;
- generated-operation drift, typed executor errors, query-key/cache ownership, and fresh-client isolation;
- GraphQL CORS, built-web CSP, exact avatar URL/headers, upstream JSON denial, real PostgreSQL path, and cleanup;
- reuse dispositions, prohibited-scope audit, dependency audit, and documentation impact.

Do not accept TASK-010 using live public API availability, a static mockup, Storybook, a screenshot alone, an in-memory repository alone, a preexisting database, or reused external-service evidence without identity.

## Idempotence and Recovery

- URL parsing and normalization are pure and repeatable; applying the same values produces the same canonical URL and query key.
- Generated output is reproduced from checked-in schema/operation/config and rejected on drift; never hand-edit it.
- The task-owned smoke fixture uses one unique PostgreSQL schema and `character-app:test:t010-smoke-<runId>` Redis namespace per run, applies existing migrations/import behavior, and removes only that schema and exact namespace prefix in `finally`. It never drops the repository default database, deletes a broad Redis pattern, or acts on an unverified identity.
- Avatar interception is local and exact. A non-avatar request to the public Rick and Morty domain fails the smoke instead of falling through to the network.
- Browser assertions and artifacts are owned by Playwright; application children and their ports are owned by the ADR-0018 repository orchestrator, with the lifecycle verifier owning only exact forced recovery. Ports must be empty after success or failure.
- If an external prerequisite is unavailable, report `Blocked`; do not replace real-boundary acceptance with a unit test or live shared service.
- If a milestone changes a binding requirement, URL decision, reuse disposition, dependency, side effect, validation command, or visual capsule, close the lease and return to the primary for a replacement packet.
- Never reset or clean the user's worktree. Preserve unrelated changes and use exact path leases.

## Artifacts and Notes

Planning evidence `TASK-010-REUSE-20260820-01`:

- repository baseline: `40590b5d9ecf9fff5c78f67a0b511a4ba632e6b0`;
- `apps/web/src/app.tsx`: `75066b2ccaac0d0cc101174d776c9c0772afb4a4`;
- `apps/web/src/shell.tsx`: `f3a57b4840374ff9258731ad11bb618ef7cb7d14`;
- `apps/web/src/styles.css`: `f1d8c73cdcf9eaacb01fec99963ad78d591305ae`;
- `apps/web/package.json`: `bbe64dc132b3671342361c5d337c4dafbee89ec5`;
- `apps/web/server.ts`: `f22552bc3a95ad2a1406cd37d0963ac8cfaa3629`;
- `tests/smoke/walking-skeleton.smoke.test.ts`: `c4515eff758eb6cb72997fc6fabab3b4331667d5`;
- `playwright.config.ts`: `2fcfb118213d05bd728a7e667c8d24fb828ebed3`.

This evidence establishes only the planning-time absence/presence and reuse dispositions. It is stale for Green if any listed path changes.

Milestone 1 evidence before review:

- corrected preflight `TASK-010-M1-PREFLIGHT-02`: `MISSING`; exact Red paths use the existing `.unit.test.tsx` and `.application.test.tsx` projects;
- setup lease `TASK-010-M1-SETUP-03`: receipt `7657842efbae405fd1853b39bd4174b9354680e9c16048ceec16f67621a8ce2e`, exact five-path closure, generation/check/web build passed;
- generated output: 4,320 bytes, SHA-256 `692BCE11FB5A3F551A22CD82363FE449E0F41476A8DFDE0C13A086F058A84398`;
- Red lease `TASK-010-M1-RED-01`: receipt `e2f747500dfb0a40695621a47d777b1a1eb1050f12229098030c33cb3cad5710`, exact focused command exit 1 because the two runtime data modules and root provider were absent;
- Green lease `TASK-010-M1-GREEN-01`: receipt `fad5a1a0633399f4febe9b4d39fbb1440c6247498809fce0df8e504f31d92396`, focused Green and post-Refactor both 27/27;
- first root typecheck join: exit 1 with TS2769 for `RequestInit.signal` receiving explicit `undefined`; documented primary exception changed only that expression to `signal ?? null`;
- post-exception join: exact focused tests 27/27, `npm run typecheck` exit 0, `npm run build --workspace @rick-and-morty/web` exit 0 with generated drift check, and affected diff check exit 0;
- affected-test relevance: executor tests own request/media/error/decoder behavior, character-query tests own keys/options/execution/client isolation, the application test owns shell preservation and root-provider ownership; all three have current TASK-010/ADR-0017 consumers, use controlled local boundaries, and contain no focused, skipped, snapshot, public-network, obsolete fixture, or duplicate test.
- first S1 review `TASK-010-M1-REVIEW-01`: `REVISE`, one Major because malformed non-empty `errors` could collapse into the absent-error path and permit success;
- correction preflight: `REGRESSION`, executor SHA-256 `5EB2E8C15B41082AF3F840A414A343008258C3ED27CAD4F39B100B424714EEAE`, original executor-test SHA-256 `A80A312906E1F364814AF2E40F1953AFB598031A50D7DF9810350B79E63FF37E`;
- correction Red lease `TASK-010-M1-REVIEW-RED-01`: receipt `9f20edaeb54eccf7d4b8f14fdeb1a2aa538f93bf1fff45e775a6a2047d5a0041`, 21 existing tests passed and the one new malformed-success-envelope regression failed because the request resolved;
- correction Green lease `TASK-010-M1-REVIEW-GREEN-01`: receipt `0ef9fd62131b5eb6ffc7eb5529310c0e3b5883a455e296f59d98da66e5dc81d2`, frozen test SHA-256 `E1FF2521A102F307480C931C134CC339020D497D2CBC1A0F576B544EB5DB2B4D`, executor focused scope 22/22;
- post-correction M1 join: cumulative focused scope 28/28, root typecheck exit 0, web build and generated drift check exit 0; the new regression remains the only added correction test and no existing test or contract was weakened.
- final M1 relevant-tree fingerprint: `5E8C1931020D749559FA6E8AC487876EC2BE59A824A817E8296E31CA03F047B5`. Reproduce it by taking each ordered path below, computing its uppercase SHA-256 content digest, joining `path`, one tab, and digest records with LF and no final LF, UTF-8 encoding that joined string, and computing the uppercase SHA-256 of those bytes. Ordered paths: `apps/web/package.json`; `package-lock.json`; `apps/web/codegen.ts`; `apps/web/src/data/characters.graphql`; `apps/web/src/data/generated/graphql.ts`; `apps/web/src/data/graphql-executor.unit.test.tsx`; `apps/web/src/data/characters-query.unit.test.tsx`; `apps/web/src/app.application.test.tsx`; `apps/web/src/data/graphql-executor.ts`; `apps/web/src/data/characters-query.ts`; `apps/web/src/app.tsx`; `vitest.config.ts`.
- fresh S1 re-review `TASK-010-M1-REVIEW-02`: `PASS WITH FOLLOW-UPS`; the original Major is closed, the reviewer reproduced 28/28, and its only Minor requested the final fingerprint/path/method record added immediately above. The primary dispositions that item as resolved with no implementation-byte change and accepts Milestone 1.

Milestone 2 preflight evidence:

- `TASK-010-M2-PREFLIGHT-01` reproduced relevant-tree fingerprint `19b782e22245271cdecbd7c15efb34bf3ffcf6bc` over the ordered 18-path `git hash-object` projection recorded in its packet; the serialization is CRLF-separated projection lines with no trailing newline;
- CORS is `PARTIAL`: the corrected loopback probe returned reflected ACAO plus `Access-Control-Allow-Credentials: true` for both owned origins and `https://evil.invalid`; hostile-origin OPTIONS returned `204`, reflected the hostile origin, and allowed `POST`;
- built-web CSP and browser GraphQL endpoint ownership are `MISSING`;
- deterministic seed, PostgreSQL schema isolation/cleanup, Redis namespace isolation/cleanup, and the six-case smoke lifecycle are `PARTIAL` because their production or test seams exist but are not composed under one TASK-010 smoke identity;
- existing API application evidence passed 12/12 and confirms that current coverage contains no allowlist/denial CORS assertion; the initial top-level-await CORS probe is invalidated, while the corrected async probe is the controlling runtime observation;
- selected Red ownership: `apps/api/src/app.application.test.ts`, one discovered web-unit endpoint-config test, `playwright.config.ts`, `tests/smoke/walking-skeleton.smoke.test.ts`, one minimum `tests/smoke/fixtures` runtime owner, and `scripts/verify-smoke-lifecycle.ts` only where exact external cleanup proof requires it;
- PostgreSQL, Redis, Docker, and browser results remain non-reusable until Red or Green pins one run ID, container and port identities, exact schema and namespace, built artifact, browser version, public-network denial, and terminal cleanup readback.
- Red attempt 1 lease `TASK-010-M2-RED-02` closed compliant with receipt `add6a6b4869b5355a67e3dfab0229b2d97833e0193474f60d4a429d515bd8496` over exactly six test-owned paths. API Red exited 1 with 12 existing passes and the new anonymous CORS assertion failing on credential permission; web config Red exited 1 because `apps/web/src/config.ts` is absent.
- The first smoke run `6161b34aaa800131` is invalidated because the fixture omitted explicit default PostgreSQL credentials from the migration environment; the fixture-only correction preserved the contract and cleanup readback.
- Decisive behavioral smoke run `f2180f1152185c41` used PostgreSQL container `6bee867bcdec` on `55432`, Redis container `42469d04c6c8` on `6379`, schema `t010_smoke_f2180f1152185c41`, namespace `character-app:test:t010-smoke-f2180f1152185c41`, migration build `66b43bbbad10d1f37e7cded0bcfabc9a017ddd94cf38c89286ade2741611abce`, Playwright 1.61.1 Chromium, and built assets `index-CjCjvRhz.js` plus `index-C7DoZzt4.css`. It seeded exactly 15 injected payloads and failed only because the built response had no CSP; teardown logged exact Redis-empty and schema-absent readback and ports were free.
- That decisive run is not an accepted coherent Red because its root Playwright process required one bounded manual interruption more than 20 seconds after failure and teardown. Attempt 2 must reproduce the same missing-product failures and terminate naturally; no production Green may start before it does.
- Red correction lease `TASK-010-M2-RED-03` closed compliant with receipt `dd1990ea9b0196c4dbfa8125577c8b2b39949599f6e63fbc6ad4703290d9ad0d` after changing only the task-local fixture. Run `698c67dbe72ddaff` used the same pinned containers/ports, schema `t010_smoke_698c67dbe72ddaff`, namespace `character-app:test:t010-smoke-698c67dbe72ddaff`, and migration build `66b43bbbad10d1f37e7cded0bcfabc9a017ddd94cf38c89286ade2741611abce`; isolated setup and cleanup children each exited naturally, exact cleanup passed, and the missing-CSP assertion remained decisive.
- The Playwright parent still required one bounded interruption after correction, so attempt 2 is also not an accepted coherent Red. The same decisive hang has now occurred twice, the test-worker budget is exhausted, and production Green remains blocked pending the recorded read-only coordinator triage.
- Read-only triage identified the nested Windows web-server process tree as the most likely cause with approximately 85% confidence. The recorded primary exception changed only `playwright.config.ts` and `tests/smoke/fixtures/task-010-runtime.ts` to build and start direct built Node entrypoints; path SHA-256 values before the exceptional run were `8E6A8ED182BE4E6DAA98878B06E94FC10795CCA1B9FF5DC6D0097B85EE306633` and `F84F51648FBD46CD5F4992224E983DBD79D48D32E6DA2E504CAABF026AA851B8` respectively.
- Exceptional run `03e0955e4d4d2f06` reproduced the same migration build, deterministic 15, missing-CSP failure, and exact cleanup under direct server launchers, but the parent still failed to terminate after a further bounded 10-second poll. The primary interrupted once and activates the repeated-failure blocker; the direct-launcher hypothesis is not sufficient evidence for another retry or Green.
- Harness Red lease `TASK-010-M2-HARNESS-RED-01` closed compliant with receipt `40be4ec1d2c061e8a13d4d0a811839a1d39ee3703fe1acc5514a4613dcbd8968`. Strict tools typecheck passed. Run `8800f9d33af8e14b` used PostgreSQL container `8303659b8373` at `127.0.0.1:55432`, Redis container `41f06f5e02b6` at `127.0.0.1:6379`, schema `t010_smoke_8800f9d33af8e14b`, namespace `character-app:test:t010-smoke-8800f9d33af8e14b`, and migration build `66b43bbbad10d1f37e7cded0bcfabc9a017ddd94cf38c89286ade2741611abce`; it seeded 15 injected records, failed only at the unchanged missing-CSP assertion, exited 1 naturally in 11.95 seconds, logged exact cleanup, and released ports 4173/4174.
- Production Green lease `TASK-010-M2-GREEN-01` closed compliant with receipt `26f1e4f56ca133245fa01b02ec607cff51bdf50307f25327a06f8b3c22b6616f`. Focused API/config tests passed 4/4; tools/API/web strict typechecks passed. Run `8672163ce3773f30` used the same containers/ports with schema `t010_smoke_8672163ce3773f30` and namespace `character-app:test:t010-smoke-8672163ce3773f30`; it exited 0 naturally in 10.52 seconds with Chromium 1/1, exact 15-record readback, anonymous owned-origin GraphQL success, hostile-origin denial and no credential permission from the focused API evidence, enforcing built-web CSP `default-src 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' https://rickandmortyapi.com/api/character/avatar/; connect-src 'self' http://127.0.0.1:3000 http://127.0.0.1:4174`, no public Rick and Morty JSON/avatar request, exact cleanup, and released ports.
- Milestone join passed root `npm run typecheck`, full `npm run build` including both GraphQL drift checks, and `npm run test:application` at 15/15. The first lifecycle run passed 4/6 but Windows denied exact `taskkill` process-tree control; after both ports were confirmed free, the permission-qualified identical command passed 6/6 for runs `271adbaa75478f36`, `1b3145d376e066a9`, `2017ff9979a772c5`, `6d8dff9d3b29a5f3`, `8d93f7588cdc8370`, and `d8b8a779b4ba52ea`, with exact per-run cleanup and reusable ports.
- Initial ready-unowned lease `TASK-010-M2-READY-RED-02` closed compliant with receipt `4528c9ea260b85704c15491c948dd63e04eac4ec20d0166b097296cc51e06b18`, but its plain-text HTTP-200 result is invalid as ownership proof: the frozen browser heading/CSP assertions could make the smoke nonzero after readiness attached to the impostor. Fresh S2 review returned `REVISE` and required the decisive regression below.
- Corrected Red lease `TASK-010-M2-OWNER-RED-01` closed compliant with receipt `1ab5abe365596ee5c8a5a5a0b90d9c0ce727a1f3e3fde4b93a6d12044f7920f1`, changing only `scripts/verify-smoke-lifecycle.ts` to serve the exact heading and CSP. Tools typecheck passed; the one lifecycle invocation exited 1 with `[FAIL] startup conflict: Startup-conflict smoke unexpectedly exited 0.`, proving attachment to the convincing unowned listener. Exact cleanup logged for runs `666d5d7239ff82e3`, `40f5cf4cc6fb8f0c`, `f89550f4947dd78c`, `e18d9342c581779a`, `9112cb62b6f8d3db`, and `cb2feae2ff58eb66`; sandbox-denied forced-case process control is not reused as passing evidence.
- Corrected Green lease `TASK-010-M2-OWNER-GREEN-01` closed compliant with receipt `3fdd63d3c30f90a78ec6daeaeffcfcab097fa26e87508e7ab3ab6d8a20fa73d2`, changing only `scripts/run-smoke.ts`. Final SHA-256 values are `2B39847A82D90609C23F26F93326CE62B2C3AC96415C96CF31E0D7C152BB80A4` for the runner and `C5BD01EA6126FBBF864A090C2E94C083946E36583A4E215CBEF6CCF82E7A50F9` for the frozen verifier. Tools typecheck passed, and the single permission-qualified Windows lifecycle invocation exited 0 with 6/6, exact cleanup, and reusable ports for runs `a8fc764227612675`, `bb5582431de7c6f4`, `37526ec32901c188`, `2c1d0130729a9c60`, `6a7f103676fd34b3`, and `310e87d7a8e9ef1b`.
- Finality preflight `TASK-010-M2-FINALITY-PREFLIGHT-01` was a read-only `test_worker` handoff with no lease or change and classified the distinct post-readiness contract as `REGRESSION`. It reproduced then-current fingerprint `6681BA50C8951B7CC5358542FD36E024DE90D34C8E149794340A98F20ABE82F6` and frozen runner SHA-256 `2B39847A82D90609C23F26F93326CE62B2C3AC96415C96CF31E0D7C152BB80A4`; static inspection showed Playwright awaited without either owned app result and cleanup accepting already-exited children. The selected decisive Red froze the runner, changed only the lifecycle verifier and existing API lifecycle fixture, and required nested Chromium success plus natural API exit 23 to produce outer smoke exit 0, 6/7, exact cleanup, and reusable ports.
- Finality Red lease `TASK-010-M2-FINALITY-RED-01` closed compliant with receipt `ba18e8338e6c4954468199e3b301f58fbe6d51a1239c0b528cff446467286872`, changing only the lifecycle verifier and existing API lifecycle fixture. Tools typecheck passed; the one Windows lifecycle invocation exited 1 at 6/7 because post-readiness run `20462cb2dfca850a` reported nested Chromium `1 passed`, intentional natural API exit 23, and outer smoke exit 0. The other six cases passed; every exact schema/prefix was cleaned and ports remained reusable. Frozen runner SHA-256 was `2B39847A82D90609C23F26F93326CE62B2C3AC96415C96CF31E0D7C152BB80A4`.
- Finality Green lease `TASK-010-M2-FINALITY-GREEN-01` closed compliant with receipt `735e11c1bb214a2b3a83648d73683fa2104bbe556f92d33c9e82c3bbb388329a`, changing only `scripts/run-smoke.ts`. Final SHA-256 values are runner `6E7761491E39A9A516F9416D0E73022299453CB4DC530F253BB35EF7108C8FB8`, verifier `6E8A00AE39471C0077E3DFF81484C9FD48C6D00A2BC0274EED0EE67ED49C35D0`, and API lifecycle fixture `6EB52D4B938D2476991BCBAD07B3DF093839BD90CDE4D5CABD069BFDA4A3D143`. The first tools compiler check found one local generic annotation error, corrected within the same runner-only Green; the final compiler check exited 0. The single permission-qualified Windows lifecycle then passed 7/7 for runs `50dd201605b712df`, `52080638fd784f98`, `a6312a7fb3da7a05`, `b562dfdfe4e2e021`, `1701094defdc8065`, `aa32564f4b176774`, and `d265a3c295c5abda`, with exact cleanup and reusable ports.
- Current Milestone 2 relevant-tree fingerprint is `9AC7E6D10100B9175F0763D89FBA39F0E3913F637796D6CDA66EEFDE535396CA`. Reproduce it by taking each ordered path below, computing its uppercase SHA-256 content digest, joining `path`, one tab, and digest records with LF and no final LF, UTF-8 encoding that joined string, and computing the uppercase SHA-256 of those bytes. Ordered paths: `.env.example`; `apps/api/src/app.application.test.ts`; `apps/api/src/transport/graphql/graphql-handler.ts`; `apps/web/server.ts`; `apps/web/src/config.ts`; `apps/web/src/config.unit.test.tsx`; `package-lock.json`; `package.json`; `playwright.config.ts`; `scripts/run-smoke.ts`; `scripts/verify-smoke-lifecycle.ts`; `tests/smoke/fixtures/never-ready-api.ts`; `tests/smoke/fixtures/task-010-runtime.ts`; `tests/smoke/walking-skeleton.smoke.test.ts`; `tsconfig.tools.json`.
- Accepted ADR-0018 exact-artifact review `T010-ADR-R3-FINAL-01` passed on correction cycle 2/2 with no finding and authenticated ADR SHA-256 `F2F31B119688ADD84C5946E9427BA8462C10D5E9A25D566AF2CEB1A9CE22D4F7`. The disposable clean Ubuntu proof described below closes the changed-platform execution join; fresh S2 re-review remains the final Milestone 2 acceptance barrier.
- Corrected disposable clean Ubuntu proof used immutable image `mcr.microsoft.com/playwright:v1.61.1-noble@sha256:5b8f294aff9041b7191c34a4bab3ac270157a28774d4b0660e9743297b697e48`, exact Node 24.18.0 and npm 11.16.0 installed only inside the container, and the existing PostgreSQL `8303659b8373` plus Redis `41f06f5e02b6` containers through two container-local loopback TCP forwarders. The source snapshot contained the 218 sorted existing paths from `git ls-files --cached --others --exclude-standard`, copied exact working-tree bytes, and excluded `.git`, `node_modules`, every `dist`, ignored lease logs, and temporary diagnostics. Its pre/snapshot/post aggregate is `41EE058FE22C75C957A3EBF246EA21FA7DCABE5365E9BB29DD5ADFF5D7385F08`; the corrected Milestone 2 subprojection is `6681BA50C8951B7CC5358542FD36E024DE90D34C8E149794340A98F20ABE82F6`.
- The corrected clean command copied the read-only source snapshot to native container storage, asserted no dependency directory before install, ran immutable `npm ci`, root `npm run typecheck`, `npm run test:smoke`, and `npm run test:smoke:lifecycle` in that order exactly once. Smoke run `8fc19bb78e8d530c` passed Chromium 1/1 with exact 15 records, migration build `66b43bbbad10d1f37e7cded0bcfabc9a017ddd94cf38c89286ade2741611abce`, no public request, exact cleanup, and natural exit. Lifecycle runs `09aaaa058cbe159c`, `e192fdec77130aaa`, `87ac1f89811a5f2f`, `f482ca32cbe83fbf`, `e1b7e1285746c3c8`, and `74c6bca1ee47c81d` passed normal completion, convincing HTTP-ready startup conflict, assertion failure, readiness timeout, forced cancellation, and forced interruption 6/6. No verifier remained; PostgreSQL returned no `t010_smoke_%` schema; Redis returned no `character-app:test:t010-smoke-*` key; ports 4173/4174 were reusable; source bytes did not drift; and the exact snapshot/helpers were removed.
- The corrected refresh's first candidate is invalid setup evidence only: the immutable image lacked `xz`, so `.tar.xz` extraction stopped before Node installation or any repository command. Candidate 2 used the authorized official `.tar.gz` archive for the same Node 24.18.0 bytes and is the accepted corrected proof. The four earlier disposable candidates remain invalid diagnostic chronology for engine mismatch, an incorrect disposable PATH, unreachable loopback services, and slow Windows bind-mount execution; none is counted as product evidence or used to widen repository timeouts.
- Finality clean Ubuntu proof reused the authenticated gzip/native-storage method against 218-path pre/snapshot/post aggregate `0FFA24FED140B8C58DF04BD5972A2D9D3041F7A14B3D0E1B14169FF8829EA00F` and current Milestone 2 projection `9AC7E6D10100B9175F0763D89FBA39F0E3913F637796D6CDA66EEFDE535396CA`. Immutable `npm ci`, root typecheck, Chromium smoke `47d2b25151f7787f`, and lifecycle runs `ff1fe33747fd7b17`, `fbfadbc01273db35`, `ed4f4f3f7888ad6f`, `8b10b7af5a632ca8`, `d069aea833ee006f`, `ff0cf087b62e1fc9`, and `30e52e30c83d3bc8` exited 0 exactly once. The seventh case required nested Chromium success, intentional natural API exit 23, the runner's unexpected-after-readiness diagnostic, and no cleanup substitution. Exact PostgreSQL/Redis residue was empty, ports were reusable, no verifier/helper remained, source bytes did not drift, and exact temporary artifacts were removed.
- Milestone 2 affected-test relevance audit passed on the current candidate. The two API application cases map to the shared liveness/CORS boundary; the two web-config cases map to the documented default and smoke endpoint; the single Chromium smoke maps to CSP, deterministic 15-record anonymous GraphQL, and public-network denial; and the seven lifecycle cases map to normal completion, convincing startup conflict, assertion failure, readiness timeout, post-readiness owned-child failure, cancellation, and interruption under ADR-0018. Both fixtures are deterministic and run-owned. A focused marker scan found no focused, skipped, pending, or placeholder case in those test, verifier, or fixture paths; no duplicate browser suite or obsolete ready-unowned case remains.
- The final clean `npm ci` reported two current transitive advisories, one moderate and one high. This time-varying registry audit observation does not invalidate the immutable install or Milestone 2 behavior, but it remains an explicit dependency/security follow-up for task closure. No automatic audit fix, dependency change, or scope expansion was performed.
- Milestone 4 closure validation used Node 24.18.0, npm 11.16.0, Playwright 1.61.1, Chromium 149.0.7827.55, PostgreSQL container `8303659b8373` on port 55432, and Redis container `41f06f5e02b6` on port 6379. Before the two validator-wording corrections, the 224 sorted existing tracked/untracked nonignored paths had aggregate `CAEF67EFD5068055BE021876FCFBB6EB0BECF85462C962E68D122517407142E8`; implementation/test identities remained unchanged through closure documentation writes.
- The corrected provisioned integration run used Redis namespace `character-app:test:t010-closure-caef67ef` and passed 11 files/74 tests. The first unprovisioned invocation is invalid setup evidence only because it omitted PostgreSQL port 55432 and the required Redis namespace.
- Fresh closure smoke run `937476adea51a78b` used schema `t010_smoke_937476adea51a78b`, Redis namespace `character-app:test:t010-smoke-937476adea51a78b`, and migration build `66b43bbbad10d1f37e7cded0bcfabc9a017ddd94cf38c89286ade2741611abce`; Chromium passed 1/1 in 3.1 seconds with `pageErrors=0`, two deliberate GraphQL failures, two narrowly allowed 503 resource diagnostics, and `unexpectedConsoleErrors=0`.
- Closure lifecycle runs `b8ba71a93217251a`, `f38dc67b5dcc7b8e`, `682c326bf2ecfa19`, `d6ea2b3cbda52ccd`, `d7092239d684c255`, `46e7df1098373393`, and `c52755a488b8df53` passed normal completion, convincing startup conflict, assertion failure, readiness timeout, post-readiness owned API exit, forced cancellation, and forced interruption 7/7 with exact cleanup after each case. Final PostgreSQL database/schema, Redis-prefix, and app-port readbacks were empty.
- After authoritative status reconciliation, review creation, archival move, and link repair, documentation validation passed 70 Markdown files/123 scenarios, ADR validation passed 18 ADRs/38 requirements with only the established NFR-006 warning, and `git diff --check` passed with line-ending warnings only. Stable post-documentation projection `1194DB2E807826D7C64E7A1552A62B269FDC3ED87E04EBC97AF617F61AD49145` covers 223 sorted existing tracked/untracked nonignored paths using the documented uppercase SHA-256 tab/LF serialization while excluding only this self-referential completed plan and the self-referential chronology.

Expected implementation path families, subject to accepted preflight and exact leases:

- `apps/web/package.json`, `package-lock.json`, and one web Codegen config/script;
- `apps/web/src` operation/generated/data owners, existing app/shell/styles, and the three accepted task-local component owners;
- focused web unit/application tests;
- `apps/api/src/app.ts` and/or the existing GraphQL handler plus focused application tests for CORS;
- `apps/web/server.ts` for CSP;
- `.env.example`, `playwright.config.ts`, the existing smoke test, and minimum task-owned smoke fixtures;
- affected documentation and one dated acceptance review at closure.

This list is orientation, not a pre-authorized write lease. The actual packet must use exact paths and freeze every unassigned boundary.

## Interfaces and Dependencies

ADR-0017 proportionality readback:

| Dimension | Planned TASK-010 cost and boundary |
|---|---|
| Dependencies | Two data-boundary runtime packages (`@tanstack/react-query` and already-selected `graphql`), two self-hosted font packages required by DPL-DEC-006, and direct declarations for the already lock-resolved Codegen plugins; no full GraphQL client or validation library |
| Authored files | One Codegen config, one operation source, one executor/decoder owner, one key/query owner, one provider integration, and the three visual components accepted by the reuse audit |
| Configuration | One browser GraphQL endpoint with documented local/smoke values, one generate/check script pair, explicit anonymous loopback CORS, and one built-web CSP; no new state store or service configuration framework |
| Generated artifacts | One checked-in client-neutral output for the TASK-010 list operation; no hooks, mutation output, fragment masking, or server-type sharing |
| Tests | Focused existing Vitest projects plus the one existing Playwright smoke; no new runner, mock-server package, Storybook, snapshot suite, or visual-regression service |
| Build effects | Web build gains one deterministic generation-drift prerequisite and local font assets; record generated bytes, built asset sizes, and command duration during Milestone 1 and stop if they contradict this bounded projection |
| Maintenance | Query keys, executor classification, and list decoding remain centralized in two task-local data owners; presentation receives typed data and no direct QueryClient API |

Planned direct web runtime dependencies:

- `@tanstack/react-query` 5.101.4;
- `graphql` 16.14.2;
- `@fontsource/bangers` 5.3.0;
- `@fontsource/space-grotesk` 5.3.0.

Planned direct web development dependencies reuse the repository's existing Codegen toolchain and current lock-compatible plugins:

- `@graphql-codegen/cli` 7.2.0;
- `@graphql-codegen/typescript` 6.1.0;
- `@graphql-codegen/typescript-operations` 6.1.6;
- `@graphql-codegen/typed-document-node` 7.1.0;
- `@graphql-typed-document-node/core` 3.2.0.

Do not add Apollo Client, urql, Relay, graphql-request, Axios, Zustand, Redux, a router replacement, a form library, a schema-validation library, a component framework, an icon package, an animation library, Storybook, or a visual-regression service.

The generated operation interface is conceptually:

    query Characters($filter: CharacterFilter) {
      characters(filter: $filter) {
        id
        name
        imageUrl
        species
      }
    }

The project-owned executor accepts a typed document, exact variables, and a narrow operation decoder, then returns validated typed data or one stable ADR-0017 error category. The list query owner accepts normalized `{ status?, species?, gender? }` and keys it as `['characters', status ?? null, species ?? null, gender ?? null]`; sort never reaches GraphQL. The visible route consumes that query owner and sorts a copy of returned summaries without mutating cached data or directly accessing the QueryClient.

The browser endpoint defaults to `http://127.0.0.1:3000/graphql` for the documented local composition and is overridden to `http://127.0.0.1:4174/graphql` by the smoke build. Only `http://127.0.0.1:5173` and `http://127.0.0.1:4173` are accepted browser origins for anonymous GraphQL access in the current loopback-only deployment. Do not add credentials or infer an allowed origin from arbitrary request input.

## Revision Note

2026-08-20: created the first TASK-010 ExecPlan from the dependency-ready canonical task, recorded the remaining reversible UI choices, accepted a bounded reuse audit, separated two standard nonvisual milestones from one frontend-visual milestone, and excluded later-task or speculative visual work. TASK-010 remains `Pending`; implementation was not started.

2026-08-20: activated the existing ExecPlan after explicit project-owner authorization, clean-tree and authority reconciliation, exact frozen-source hash readback, documentation/ADR validation, and the 26-check lease-guard self-test. Canonical TASK-010 is `In progress`; no implementation artifact or acceptance result existed at activation.

2026-08-20: materially revised Milestone 2 after observed Playwright-owned Windows teardown failure, accepted successor ADR-0018, two independent process-ownership review findings, and the fresh finality rescope. The plan now preserves invalid and corrected evidence separately, records `TASK-010-M2-FINALITY-PREFLIGHT-01`, compliant finality Red/Green receipts, current fingerprint `9AC7E6D1...`, Windows and disposable-Ubuntu 7/7 lifecycle proof, and the affected-test relevance audit. TASK-010 remains `In progress`; Milestone 3 and AC-001/AC-002 remain unclaimed.

2026-08-20: completed Milestones 3 and 4 after bounded review corrections, cumulative relevance audit, the authoritative closure packet, and fresh integrated `PASS WITH FOLLOW-UPS` with no finding on candidate aggregate `9AD1FC65...`. AC-001 and AC-002 advance minimum-assessment readiness to 7/12; the plan moves intact to the completed archive after the primary-owned documentation gate.
