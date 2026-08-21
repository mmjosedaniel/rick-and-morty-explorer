# Establish the TASK-003 Operational Walking Skeleton


This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.


## Purpose / Big Picture


TASK-003 is the first executable node in the canonical implementation graph. It turns the documentation-only repository into the smallest operational modular-monolith workspace that a contributor can install, type-check, build, test, and start through documented root commands. A reviewer must be able to see a minimal React 18 shell in Chromium, request `GET /healthz` from the Express process and receive HTTP 200 with exactly `{ "status": "ok" }`, and observe healthy PostgreSQL and Redis containers that remain independent of application liveness.

This plan is intent, not runtime evidence. At plan registration the repository has no package manifest, lockfile, application source, test runner, browser binary, Compose definition, or executable application command. Creating this plan does not start TASK-003, satisfy NFR-001 or NFR-003, make AC-007 or AC-012 pass, or prove any product behavior. When the task eventually completes, it will establish an operational foundation only; the first browser-to-GraphQL product slice remains TASK-010.


## Progress


- [x] (2026-08-11 20:54Z) Read the documentation map, TASK-003 authority, mapped requirements, current accepted ADRs, routed HS rules, active gates, plan convention, and current repository tree; `git status --short` was empty and no executable workspace artifact existed.
- [x] (2026-08-11 20:54Z) Created and registered this task-scoped ExecPlan while preserving TASK-003 as `Pending`, adding accepted ADR-0011 to the canonical governing-decision list, and recording plan creation without starting implementation.
- [x] (2026-08-11 21:26Z) Validated the final post-review registration reconciliation: documentation validation passed for 42 Markdown files, 41 requirement IDs, 1 authorization, 17 tasks, 17 SPEC rules, 20 HS rules, and 119 scenarios; ADR validation passed for 14 ADRs and 38 mapped requirements with only the known NFR-006 warning; `git diff --check` and the cached check passed with line-ending notices only; changed paths remain README/documentation only; trailing-whitespace and executable-workspace/Python-cache discovery returned no paths.
- [x] (2026-08-11 21:24Z) Obtained fresh independent final review `PASS` on the corrected complete registration tree, including reviewed plan SHA-256 `4AEEE0B1F0FED6EAA65CF6B36CF90D585F896B3BB52CAB69182F12827D7C5156`; two provisional Majors plus later smoke-scope and closure-wording findings were corrected before the verdict, and no Blocker, Major, or Minor remains. TASK-003 stayed `Pending` and unstarted.
- [x] (2026-08-12 00:29Z) Revised the still-unstarted plan to adopt DPL-DEC-014's worker-first implementation topology, including serial write leases, task-local path ownership, handoff barriers, correction limits, and fresh integrated review; the prior hash-specific review remains historical evidence, and fresh review of this revision is pending.
- [x] (2026-08-12 00:53Z) Obtained complete fresh correction-cycle review `PASS` for the worker-flow revision at reviewed plan SHA-256 `43BD0E3DA5853BC8DC29FFA18490ED601F591F1AFE2134271DBE20FC89C1C5E3` and complete raw working-tree patch SHA-256 `91F10449A0B4F4D5C42AF5E568B88C3085779CDAA93437A1371DCCCC8C75E3`; the initial review's sole Major about `PASS WITH FOLLOW-UPS` routing was corrected and no finding remains.
- [x] (2026-08-12 05:15Z) Revised the still-unstarted worker assignments to require coordinator-owned automatic lease baselines and terminal compliant receipts; prior reviewed hashes remain historical evidence, and fresh review of this guard revision is pending.
- [x] (2026-08-12 06:30Z) Obtained complete fresh independent review `PASS` for the automatic-lease revision at reviewed 15-path packet SHA-256 `5879C3C8A59C98375CACC9568FD350A55F854A800A114875139D4B600A5628A0`; all 25 isolated Windows self-tests passed and no Blocker, Major, or Minor remains. TASK-003 stayed `Pending` and unstarted, and this plan returned to ready-to-execute.
- [x] (2026-08-12 12:00Z) Revised the still-unstarted assignment contract under DPL-DEC-017 to require one minimum-but-extensible `Worker Assignment Packet v1` for every writer spawn. Prior reviewed hashes remain historical evidence; fresh complete review of this packet revision is pending.
- [x] (2026-08-12 12:29Z) Obtained complete fresh correction-cycle review `PASS` for the assignment-packet revision at reviewed 12-path packet SHA-256 `FE9711A5743AD995792EF8447BEACC1AFC0F261D3EAC997D42B1065A6D49EA22` and plan SHA-256 `26C1AF7883DBFCF89D4A998B1E068CF2D076A71425846D420C464E6315DEAAD1`. The initial review's sole Minor metrics-schema mismatch was corrected; no finding remains, TASK-003 stayed `Pending` and unstarted, and this plan returned to ready-to-execute.
- [x] (2026-08-12 14:11Z) Corrected the later current-state review findings: Green and Refactor corrections now require fresh attempt-2 packets and guarded leases, Refactor has an explicit semantic acceptance barrier, the guard enforces attempts 1/2 plus the exact worker/phase matrix, and correction lineage is no longer attributed to the guard contract. The prior hashes and verdict remain historical; this correction revision requires complete fresh review before the plan is ready again.
- [x] (2026-08-12 14:25Z) Corrected a transverse control-flow review: rejected Setup and Red now enter explicit fresh attempt-2 leases, delegated evidence separates terminal guard compliance from coordinator semantic acceptance, and final-review corrections stop rather than issue attempt 3 when the assignment budget is exhausted or its identity changes. The plan remains under complete fresh review.
- [x] (2026-08-12 14:30Z) Corrected the fresh review's remaining Setup-diagram omission by requiring the coordinator to spawn `code_worker` under the new attempt-2 packet and lease before checking its terminal receipt. The reviewed hash remains historical and another complete fresh review is required.
- [x] (2026-08-12 14:33Z) Normalized every remaining assignment edge so Red correction, initial Green, delegated evidence, and final-review correction explicitly build the packet, start the guarded lease, and spawn the responsible worker before work or closure. Complete fresh review remains pending.
- [x] (2026-08-12 14:37Z) Removed the last unsafe re-entry: a material concern with an accepted or frozen test after Green now requires rejected-Green reconciliation, current-cycle termination, and a fresh cycle ID before behavior selection and a new attempt-1 Red assignment. The current correction remains under fresh review.
- [x] (2026-08-12 14:41Z) Strengthened the guard's grouped assignment-identity self-test to prove rejection both before `start` creates state and when a digest-valid stored contract is reloaded with an invalid attempt. Native Windows PowerShell still passes all 26 isolated groups; fresh current-state review remains pending.
- [x] (2026-08-12 14:42Z) Hardened post-Green triage so an exhausted production correction stops and a fresh cycle begins only after rejected Green state is accepted with no old-cycle write pending. This closes attempt-3 and implicit-reconciliation paths before fresh review.
- [x] (2026-08-12 14:56Z) Replaced the compressed assignment graph after complete packet and edge review: every phase now exposes packet draft, guard start/digest, worker execution, terminal receipt, and semantic acceptance; corrections require prior reconciliation; each slice receives a fresh cycle ID; and final review enforces its global two-cycle limit. Fresh review of this revision is pending.
- [x] (2026-08-12 15:09Z) Reconciled the parallel review of the expanded graph: the integral reviewer returned point-in-time `PASS`, but the more specific graph and coherence audits found Setup identity ordering, Green terminal-close ordering, an overpermissive guard mini-flow, and two identity/packet wording ambiguities. Corrected all five issues; the resulting current state requires a new complete review.
- [x] (2026-08-12 15:44Z) Reconciled fresh review of 14-path packet `3882498D1260793122052BACA71EF28843FF395C8FC81E0F3410F9B5A4AC88B6` as `REVISE`. Replaced the one-time Setup branch with a reusable next-work selector, added a role-matched evidence queue with bounded delegated correction, and required the complete closure-validation packet to be refreshed after every accepted final-review correction. TASK-003 remains `Pending` and unstarted; the corrected workflow still requires complete fresh review.
- [x] (2026-08-12 15:44Z) Reconciled review of corrected packet `146BD7AC38E0533E1ED55A9A3109B56C22BC81494206DCBBC42DBE9F6FA01D0B` as `REVISE`: accepted review corrections lacked durable evidence before refreshed closure, and the generic attempt-2 path was incompatible with already accepted Red and Green. The workflow now drains correction evidence to refreshed closure without resetting the global count and routes behavioral or test-contract findings through a fresh behavior cycle. Fresh complete review is still required.
- [x] (2026-08-12 15:57Z) Reconciled focused review of packet `53A02582FBE9490D8E5CE4A80E111614808B0588DB16DF90B58BB6180D7A30ED`: the otherwise-correct fresh behavior remediation did not explicitly carry its evidence return target or durable old/new-cycle lineage through the graph. The fresh-cycle entry and evidence queue now pin both. Fresh complete review remains required.
- [x] (2026-08-12 16:09Z) Reconciled complete review of packet `C173B64DAAA48EA138D17DA92769EA2470E6B812D05BA7C0EA9B025962507FCD` as `REVISE`. A material-test replacement inside reviewer remediation could overwrite its refreshed-closure target and lineage, Green lacked an explicit blocked/conflict exit, and an Evidence-phase correction record could enter a recursive evidence lease. The graph and evidence policy now close all three routes; fresh complete review remains required.
- [x] (2026-08-12 16:28Z) Applied the owner-directed DPL-DEC-018 simplification: retained the minimum context packet, blocking path lease, serial Red then Green with optional same-turn Refactor, coordinator evidence ownership, and one fresh final review; replaced the exhaustive correction and evidence state machine with one stop-and-triage boundary. TASK-003 remains `Pending` and unstarted, and this revision requires fresh review.
- [x] (2026-08-12 16:42Z) Reconciled fresh review of simplified packet `F402ED8554F6362AD5E7FC9E19F504866E76C5AAF16988503CD064D7807A9AA4` as `REVISE` for one stale closure sentence that returned every finding directly to a worker. The active closure rule now returns findings to primary-coordinator triage and permits a later fix only through the ordinary fresh-packet and fresh-lease loop; final fresh review is pending.
- [x] (2026-08-12 16:49Z) Obtained complete fresh correction-cycle review `PASS` for simplified packet `1B4FBEA61C2CE047579B4B7BD35A2C1D627DCC7945930090B9A6979B88464280`; the prior review's sole Major is corrected and no Blocker, Major, or Minor remains. TASK-003 stayed `Pending` and unstarted, and this plan is ready for a separate execution instruction.
- [x] (2026-08-12 18:48Z) Started TASK-003 after the project owner's attached directive explicitly supplied the separate execution authorization. Updated the canonical task to `In progress`, synchronized the root status and plan index, recorded this authorization and the clean pre-start evidence in the execution log, and preserved the no-implementation claim at this barrier.
- [x] (2026-08-12 18:51Z) Validated the complete task-start documentation transition: `validate_docs.py` passed for 45 Markdown files, 41 requirement IDs, 1 authorization, 17 tasks, 17 SPEC rules, 20 HS rules, and 119 scenarios; `git diff --check` passed with line-ending notices only; Git listed exactly the five coordinator-owned documentation paths.
- [x] (2026-08-12 19:04Z) Reconfirmed the supported tool intersection from current primary documentation and registry metadata, then allocated DPL-DEC-020 through DPL-DEC-023 before adding any dependent artifact. The records fix the exact npm/lockfile, Node/browser targets, tool and dependency versions, workspaces, ports, hosts, environment rules, Compose identity, production-start mode, foreground orchestration, lifecycle command/triggers, direct-dependency report, and Tailwind output command.
- [x] (2026-08-12 19:08Z) Replaced every Milestone 1 command placeholder, validated DPL-DEC-020 through DPL-DEC-023 with both documentation validators and `git diff --check`, then exceptionally added only `.artifacts/` to the existing `.gitignore`. This coordinator-owned control path will contain Playwright reports, traces, screenshots, and task-owned verification output and is now frozen before all worker baselines; existing rules already cover dependencies, builds, coverage, logs, and PID files.
- [x] (2026-08-12 19:19Z) Accepted the behavior-free workspace bootstrap from guarded Setup lease `TASK-003-bootstrap-01-setup-06`, contract digest `5eaecf920433567d9408f5b44b26c496a8636a513125ef030ce67777c7200dd3`, and fresh receipt `a923707e702a1155884f5e675aac09a3e184117ceedb8196932d0ec25ea19484`. `npm install`, `npm ci`, the exact direct-dependency report, empty strict-config `typecheck`, and `git diff --check` passed; the primary repeated the dependency report, `typecheck`, lockfile-v3 inspection, file inventory, and diff check. No source, test, runner registry, application behavior, second lockfile, or unexpected path exists.
- [x] (2026-08-13 01:40Z) Resolved the ADR-0011 Windows-and-continuous-integration evidence boundary. Windows and disposable-Ubuntu lifecycle matrices passed 6/6 with port reuse, and GitHub Actions run `31658342722`, job `94317643800`, passed the unchanged lifecycle command on Ubuntu 24.04 at corrective commit `4b721063f56b66aaca22e73267b451bde6e2d084`.
- [x] (2026-08-12 19:25Z) Accepted the semantic-shell Red from lease `TASK-003-web-shell-01-red-01`, contract digest `18c880daea73fe0f43caa79926d686f29e7e2ef2cda7aab920cc26c814c95bea`, and fresh receipt `84bac5656059e396493deaf69ad1bf9e30e95b7856c4ef567ac6ac65bca70149`. Package-local `npm run test:unit` exited 1 after loading the unique `web-unit` jsdom project because Vite could not resolve `./shell` from the one heading test. The primary reproduced the exact failure, rejected focused/skipped-test tokens, and froze all five test/registration paths at recorded SHA-256 values before Green.
- [x] (2026-08-12 19:40Z) Accepted both the behavior-free harness correction and the semantic-shell Green after primary revalidation. Setup lease `TASK-003-harness-types-01-setup-01`, digest `44c4c600a192ab7c949cf3c73ea448d75c226e2d0c94fd9000fc8fdc3a213d91`, receipt `e2c4d86584ef90cee3932f808c238c506f2157453ad9cc0894dc60b40f19ec15`, added only the already-allowed Node type consumer and corrected strict config placement/library support. It closed compliant with zero drift. Primary readback then proved the exact direct report, lockfile resolution, strict `typecheck`, package-local/root unit Green, unchanged Shell/test/setup hashes, and `git diff --check`. Semantic Green lease `TASK-003-web-shell-01-green-01` is therefore accepted with no Refactor: the only production file is the minimal presentation-only `Shell`.
- [x] (2026-08-12 19:46Z) Accepted the routed-composition dependency Setup from lease `TASK-003-router-dependency-01-setup-01`, digest `fa9fba529e4957fecfe0f95fd5ff702bcaccf2d146306417d0633a5833f9f934`, receipt `74958abd21d7eccc7481694c5eefced08a180ef891781df42afe41383625f31d`. Exact `react-router-dom@7.18.2` is the sole web-manifest/direct-report delta and exact lock resolution; immutable install, strict typecheck, existing unit test, and diff check stayed green. No routing behavior or application test exists yet.
- [x] (2026-08-12 19:49Z) Accepted the routed-composition Red from lease `TASK-003-web-route-01-red-01`, digest `1e99ba344ade1b3dbfe72f833cc64753f063593eef1d83526a9684125c837a97`, receipt `da111b7d62c9d3985951e9c22071726588a29ca1947eb2a56bd8bf0bfd20442f`. The distinct `web-application` project and current root `unit -> application` command are real, the existing unit remains green, and package-local `test:application` exits 1 only because Vite cannot resolve `./app` from the root-route test. The four Red-owned paths are frozen at recorded hashes before Green.
- [x] (2026-08-12 19:52Z) Accepted routed-composition Green from lease `TASK-003-web-route-01-green-01`, digest `83cfb6d1c65a21228d1e755ec1095763d0b62b6fffa9e71608abea26d23da3bf`, receipt `427bdc3e54e82be8bdb6b55deb57c1aae486120b2384384af6e2cfc044ea7bee`. It reproduced Red, created only `apps/web/src/app.tsx`, and passed package/root application, root unit, root `test` in observed `unit -> application` order, and strict `typecheck`; all frozen hashes matched. Primary inspection confirmed BrowserRouter ownership at `App`, one exact `/` route, and reuse of presentation-only `Shell`. No Refactor was needed.
- [x] (2026-08-12 19:59Z) Accepted API-port-default Red on corrected attempt 2. Lease `TASK-003-api-port-default-01-red-02`, digest `5df923f2ec861c3322235136efc75c27d4931bb7317df67393444f97a7b1bb74`, receipt `9b4379b3467fff2ffd7c96dae4f2a421e58deae57b1bf4265776204765c89402`, changed only the relative import to ESM-valid `./config.js`. Root/focused unit runs fail only on the absent config module while web unit passes; strict checking fails only with TS2307 for that same missing module. The corrected test and four registration/config paths are frozen at recorded hashes before Green; attempt 1 remains preserved as rejected history.
- [x] (2026-08-12 21:20Z) Reconciled the completed runtime-configuration and HTTP-liveness cycles from their guarded evidence. The default, valid override, decimal syntax, inclusive range, host default, and host allowlist rules passed unit 7/7; the minimal Express factory passed direct loopback HTTP application testing 2/2 with status 200 and exact body `{"status":"ok"}`. Strict typecheck, ordered registered scopes, frozen hashes, direct-dependency checks, and diff checks passed; the rejected diagnostic and ambient-type attempts remain preserved in the evidence record.
- [x] (2026-08-12 21:20Z) Accepted the portable native-smoke Red from lease `TASK-003-native-smoke-portable-red-01-red-01`, digest `6c0c97694e0f7eae155da916a875d63851daa718a4688fe51fbb6ad8f010475d`, and receipt `0a522ee5ec9723e17735e00e5f1563cd41497ca6298da91b13f055a1d79d73f8`. Unit 7/7, application 2/2, strict typecheck, Chromium launch, both port probes, frozen paths, and diff check passed; focused and root smoke failed only because the web workspace lacked `start:smoke` and the test body did not execute.
- [x] (2026-08-12 21:20Z) Rejected native-smoke Green attempt 1 after lease `TASK-003-native-smoke-portable-red-01-green-01` closed violated at contract digest `bc312150185001f4a1eedc70a636f59df01084914cd5733c54a6930368ada186` and receipt `b92b1a496e792d5a518ef52925515b73dc6183aee0846bb6cf23b6b11697f861`. Its ten leased implementation paths built independently and kept unit 7/7, application 2/2, strict typecheck, frozen hashes, and diff check green, but Chromium timed out on the heading, the command failed to terminate, listeners remained on 4173/PID 37028 and 4174/PID 19440, and compilation created unexpected unignored `apps/web/dist-server/server.js`. The coordinator terminated only those recorded PIDs, proved both ports bindable, inspected the retained trace, and found that the static server returned fallback HTML for the JavaScript asset because a trailing `webRoot` separator made the containment prefix contain two separators. The Green is not accepted; `dist-server/` is now an ignored build-output control, and a fresh guarded production correction must retain the frozen smoke contract.
- [x] (2026-08-12 21:29Z) Accepted native-smoke Green attempt 2 from lease `TASK-003-native-smoke-portable-red-01-green-02`, digest `f5cd39c990743fe1b1b37d5ca79a544c3c8943b0cbb9f674aec7168e92fe021d`, and compliant receipt `a7d3773c891b89b7b2c054c0229b5962718d8db6661261a4baa527beabb3f21a`. The sole source delta normalizes `webRoot` in `apps/web/server.ts`. In the worker sandbox, builds, typecheck, unit 7/7, application 2/2, and the Chromium assertions passed, but Playwright could not complete its Windows `taskkill` teardown; the worker interrupted only its owned session and proved both ports free. The primary reran focused smoke outside that restricted process sandbox: it exited 0 with 1/1 in 10.2 seconds. Root `test` then exited 0 in visible `unit 7/7 -> application 2/2 -> smoke 1/1` order, strict typecheck passed, frozen hashes stayed exact, `git diff --check` passed, and ports 4173/4174 rebound. No Refactor was needed.
- [x] (2026-08-12 21:33Z) Reconciled Tailwind-dependency Setup attempt 1 as an environment stop with zero repository delta. Lease `TASK-003-tailwind-dependencies-01-setup-01c`, digest `7ef4b53436f15060ecc479e751b12303a81f2c3d383659a210a622adb5a358ba`, closed compliant at receipt `61ed6c2bb676386335eeb9d7881e91804953403ad0fba2c707bafdcddd1e2cad`. The exact `tsx@4.23.12` install produced no output under restricted network access and was interrupted after the tool boundary; readback proved all three requested entries absent, direct dependencies unchanged, frozen hashes exact, and diff check green. Attempt 2 may use the normal approved registry-network path for the same fixed allowlist only.
- [x] (2026-08-12 21:39Z) Accepted Tailwind-dependency Setup attempt 2 from lease `TASK-003-tailwind-dependencies-01-setup-02`, digest `d3eeea8ebe6c12e92f43be20f78090d585b12e8325e33b5dcae005df9db43b49`, and compliant receipt `f1b07b7f0536b18aa78067715502852921c1bcc5b87081d3bd925a0d0c01830d`. Only root `tsx@4.23.12`, web `tailwindcss@4.3.3` and `@tailwindcss/vite@4.3.3`, and their sole lockfile resolution were added through the approved registry route. `npm install`, `npm ci`, exact direct report, typecheck, unit 7/7, application 2/2, frozen hashes, lockfile uniqueness, and diff check passed. Primary root `test` then passed unit 7/7 -> application 2/2 -> smoke 1/1, and both ports rebound. The npm pending-build-script warning for transitive `esbuild@0.28.2` was not suppressed or converted into unapproved policy; the current Vite smoke build passes.
- [x] (2026-08-12 21:42Z) Rejected Tailwind-output Setup attempt 1 before editing because the coordinator packet supplied stale shell/application-test hashes instead of the authoritative hashes already recorded later in this ExecPlan. Lease `TASK-003-tailwind-output-01-setup-01`, digest `02b23f6a3da19d4f7625ae931566515717e46913a907f107857cbfdd443dcb1a`, closed compliant with zero changes at receipt `016b3a19111683068acdc9278d7eac0f4cd0e0e5cbeffaf51c2f7281765ea0d8`. Current readback matches the durable evidence: shell test `99DD8851...F682`, application test `D644AAE3...D40`; Playwright, smoke, server, and lockfile hashes are stable. A corrected attempt-2 packet is required.
- [x] (2026-08-12 21:47Z) Accepted declarative Tailwind-output Setup attempt 2 from lease `TASK-003-tailwind-output-01-setup-02`, digest `66efbaf4cfd7e8d3ca3fed91f0d0a095b82f6735cb37b68341579ba0e00c5b9e`, and compliant receipt `27823b6e9e4bad0c85a90eb77f45de1ec258487810e2966f35cb71a17458176a`. Exactly seven leased endpoints register the Tailwind Vite plugin, import one CSS entry, consume `text-3xl`, and expose a strict Node/tsx validator. Web build emitted referenced `assets/index-DTXwErQW.css` at 4,364 bytes; manifest, HTML, CSS token, and current shell consumer checks passed with exact validator output. Typecheck, unit 7/7, application 2/2, direct report, frozen hashes, ignore checks, and diff check passed. Primary root `test` passed unit 7/7 -> application 2/2 -> smoke 1/1 and both ports rebound. This proves toolchain consumption only, not visual layout, responsiveness, NFR-002, NFR-005, SPEC-014, or an acceptance criterion.
- [x] (2026-08-12 21:51Z) Accepted the independent Compose configuration from lease `TASK-003-compose-infrastructure-01-setup-01`, digest `ccfee2e4cfea548b24f19394282893c5b06afafe7e3d0d6fb88d578b719d1297`, and compliant receipt `61f90c20e9409dc5631f6b436ec77831e4461b85ee5c5f8be363554fa0ff06c4`. Only `compose.yaml` was created: exact PostgreSQL 18.4 and Redis 8.8.1 Alpine services, loopback ports, local non-secret defaults, health checks, and named volumes; no application service, build, fixed project, schema, migration, or client exists. Static contract checks, typecheck, unit 7/7, application 2/2, direct report, frozen hashes, and diff check passed. `docker compose ... config` exits 1 solely because Docker/alternate engines are absent. No container, network, or volume was created; syntax resolution, health, `ps`, and scoped teardown remain an external runtime blocker and are not claimed.
- [x] (2026-08-12 22:00Z) Accepted root operational Setup from lease `TASK-003-root-operations-01-setup-01`, digest `3d2490b1b7d5107b9fa5aa74f632e27060551adba88067e37439c466b517be94`, and compliant receipt `c8eae72d745c6bd6a8eca7882bb7a28df6c1385979b8206863afadce1cf2b0bc`. Only root/web/API manifests and the sole lockfile changed: exact `concurrently@10.0.4` plus root build/start/browser/infra/dev and workspace dev commands. Install, `npm ci`, exact direct report, typecheck, unit 7/7, application 2/2, root build, Tailwind validation, frozen hashes, lockfile uniqueness, and diff check passed. Root `dev` stops at missing Docker before app startup. Primary runtime then observed root production start in Chromium and direct HTTP (visible exact heading; API 200/exact body), web dev on 5173 in Chromium, and API dev on 3000 over HTTP; only owned sessions were interrupted and ports 3000/4173/5173 rebound. Root `test` still passed unit 7/7 -> application 2/2 -> smoke 1/1 and ports 4173/4174 rebound. Explicit `infra:down` removes the named `rick-and-morty-dev` project and volumes; foreground app exit does not implicitly tear down detached infrastructure.
- [x] (2026-08-12 22:06Z) Accepted the six-case smoke-lifecycle Red from lease `TASK-003-smoke-lifecycle-01-red-01`, digest `fccdb904840f10e2fc955fedeadd4e2528684cf875ade3667e20a4e70f6c4e5a`, and compliant receipt `b5485b53817474150935ee0714584a40f564bbaecde7f376a8aa5500bbcffed9`. Exactly five test-side endpoints register the lifecycle command, preserve the normal smoke defaults, add the sole `never-ready` mode and pending non-listening fixture, and intentionally include the absent controller in strict checking. Primary repetition proved `test:smoke:lifecycle` exits 1 only with `ERR_MODULE_NOT_FOUND` for `scripts/verify-smoke-lifecycle.ts` and `typecheck` exits 1 only with TS6053 for the same file. The unchanged normal smoke passed 1/1 in Chromium, both ports rebound, and the five test/config paths are frozen at their recorded SHA-256 values for Green.
- [x] (2026-08-12 22:12Z) Rejected smoke-lifecycle Green attempt 1 before editing because five coordinator-supplied ancillary hashes were stale. Lease `TASK-003-smoke-lifecycle-01-green-01`, digest `baa00f4865a60ee65297fa4d0b855d741f3c2971ff3a6f6f0e2a89617ad6ec64`, closed compliant with zero changes at receipt `b3b80232c32bc8dce44528c307925eeb7d962c42228030d15ccd0790883032fb`. The five accepted-Red hashes and ports matched; the primary reread every ancillary hash and issued a corrected attempt-2 packet without changing objective or scope.
- [x] (2026-08-12 22:20Z) Rejected smoke-lifecycle Green attempt 2 after bounded runtime triage. Lease `TASK-003-smoke-lifecycle-01-green-02`, digest `d78dcbb78a772a439765f2e74845f682d86eb474dd1004e7458fac7b5c84dad5`, closed compliant at receipt `62c589f170a9ef3bf4de98e0a342349b753ef9353805e0ad8c32a1bb9653b92a`, creating only controller SHA-256 `405C97E4...30BE`. The worker reproduced the accepted Red; its first run exposed Windows `spawn EINVAL` before any child and it corrected only the controller to invoke `npm_execpath` through `process.execPath`. The second run passed normal completion, then exceeded 90 seconds during startup conflict because `waitForResult` rejected on timeout without terminating its recorded child tree. The worker interrupted only owned session 43520; no listener remained, both ports rebound, every frozen hash matched, and diff check passed. Green is not accepted. Coordinator triage classifies guaranteed timeout termination as a new bounded supervision defect and requires a fresh behavior cycle rather than an attempt 3.
- [x] (2026-08-12 22:25Z) Rejected timeout-supervision Red attempt 1 because its required case sequence was narrower than the reproduced defect. Lease `TASK-003-smoke-lifecycle-timeout-supervision-01-red-01`, digest `629ad28f7051cf6781f61768f8e529d49f812ed6e8b30b91754acf0de4eba7dc`, closed compliant with zero changes at receipt `f7e49592777abda7b48f6fbd4fa3e2b6809e31c89b9239c8074bf2311dc61b52`. Source inspection confirmed `waitForResult` rejects without terminating or awaiting its recorded child. The owned lifecycle run instead timed out normal completion at 45 seconds, reported non-reusable ports, cascaded occupied-port failures to the other cases, and remained active at the 100-second outer bound. The worker interrupted only session 68483, proved no remaining repository process and both ports reusable, and retained every frozen hash. This proves the general supervision defect but not attempt 1's required normal-pass-then-conflict sequence; a no-edit attempt 2 corrects only that acceptance criterion.
- [x] (2026-08-12 22:27Z) Rejected timeout-supervision Red attempt 2 before commands because the correction packet referred to attempt 1 instead of repeating every mandatory Packet v1 field. Lease `TASK-003-smoke-lifecycle-timeout-supervision-01-red-02`, digest `4fc31c43096dc2d064e7be06ac44df27081e6c04204adf3e863766fbf38319c7`, closed compliant with zero changes at receipt `977cf57acc62cd2c4467be74e03fb082e8103f7e6581202e33a4df4e2a9d55bd`. The cycle budget is exhausted by coordinator packet defects without changing the implementation or accepted original Red. A successor no-edit behavior cycle may carry the reconciled general supervision criterion under a complete self-contained packet.
- [x] (2026-08-12 22:32Z) Accepted the successor timeout-supervision Red from lease `TASK-003-smoke-lifecycle-timeout-supervision-02-red-01`, digest `d0016e96e556de68668342cd0babe1b6f668cf2dbf810231a766b7bae7c4dd16`, and compliant receipt `a734460375a0c371b377f3912a44a5ce1b26e2c3149ab2a3ac7b389b30c9826d`. The no-edit worker proved the source invariant and runtime failure independent of case order: `waitForResult` rejects at 45 seconds without terminating or awaiting its recorded child; owned session 56625 then reported child PID 40924 timed out, both ports non-reusable, subsequent `EADDRINUSE` failures, and `0/6`, and remained active until the 100-second outer bound. The worker interrupted only that session, proved zero remaining repository descendants and bindable 4173/4174, and retained unit 7/7, application 2/2, every frozen hash, zero delta, and a green diff check. The controller is frozen at `405C97E4...30BE` as the failing production input for the fresh Green.
- [x] (2026-08-12 22:47Z) Accepted timeout-supervision Green from lease `TASK-003-smoke-lifecycle-timeout-supervision-02-green-01`, digest `31a46174d46d39134812768bba9da4191341726af98ab2c3b76769dff7d1e80f`, and compliant receipt `1457c0f489abd44da335545bc6d6e312897983d686e8d2753e08fe042ef54b28`. Only `scripts/verify-smoke-lifecycle.ts` changed, to bound generic waits, recorded-tree termination, child-close waiting, pipe diagnostics, and the final ownership boundary for every started smoke. The worker reproduced Red in session 89965, then its final Green session passed all six named cases and `6/6`; typecheck, unit 7/7, application 2/2, ordered root test with smoke 1/1, twelve frozen hashes, ports, and diff check passed. Primary inspection accepted controller SHA-256 `676FC4E5...9124`; independent primary execution then passed normal completion, startup conflict, assertion failure, readiness timeout, forced cancellation, forced interruption, and `6/6`, and ports 4173/4174 rebound. No Refactor beyond the required controller-local cleanup correction was needed. This establishes the Windows matrix only; CI evidence remains open.
- [x] (2026-08-12 22:57Z) Completed every locally available integrated verification after a fresh `npm ci`: exact direct dependencies, Chromium-only install, strict typecheck, unit 7/7, application 2/2, root and independent web/API builds, Tailwind output, ordered root test with smoke 1/1, independent compiled starts with HTTP 200/exact liveness body, final lifecycle 6/6, and reusable application/smoke ports all passed. Documentation and ADR validators plus diff check passed. All five infrastructure/root-dev commands exit 1 before creating resources only because no Docker-compatible CLI exists; an unrelated local `postgres` PID 6588 already owns 5432 and was not touched.
- [x] (2026-08-12 22:57Z) Completed the ADR-0010 relevance and negative-scope audit. Every registered Vitest project has a real test; the shell unit, routed application, configuration, direct HTTP, native smoke, Tailwind validator, lifecycle controller, jsdom setup, and never-ready fixture each have an explicit current consumer. Searches found no empty integration project or command, migrations, GraphQL/client/cache/Sequelize/Umzug/Redis source or dependency, upstream runtime call, mock, snapshot, focused/skipped test, or JavaScript source. One root lockfile exists. Current acceptance remains 0/12 because TASK-003 implements foundations only.
- [x] Complete and record separate React shell and BrowserRouter-owned application-composition Red-Green-Refactor cycles through the package-local web unit and application boundaries.
- [x] Complete and record the runtime-configuration and Express `GET /healthz` Red-Green-Refactor cycles through Node unit/application boundaries.
- [x] Complete and record the native build/start Chromium smoke Red-Green-Refactor cycle with two owned foreground processes, then validate Tailwind as declarative configuration through an automated production-build/output check that does not extend the smoke contract.
- [x] (2026-08-13 00:10Z) Verified isolated PostgreSQL and Redis Compose health and the complete root development entry after the owner authorized Docker Desktop installation. Docker Desktop 4.86.0, Engine 29.7.2, and Compose 5.3.1 became available with WSL 2. The unique `rick-and-morty-task003-20260812` project passed `config`, healthy `up --wait`, `ps`, direct `pg_isready`, direct Redis `PONG`, and scoped `down --volumes` using loopback ports 55432/56379. Root `npm run dev` then created `rick-and-morty-dev`, waited for both services, started web/API in foreground, returned web/API HTTP 200 with the expected heading source and exact liveness body, retained infrastructure after foreground interruption, and passed explicit scoped teardown. A final exact-script run passed `npm run infra:config`, `infra:up`, `infra:ps`, and `infra:down` in order. Both projects and their volumes were removed; ports 3000/5173/55432/56379 rebound. The unrelated native PostgreSQL 18.1 service remained healthy on 5432 and was not touched.
- [x] (2026-08-13 00:19Z) Accepted the project owner's separate authorization to configure GitHub Actions and perform the Git branch, stage, commit, push, and pull-request operations that the original directive withheld. Created `codex/task-003-github-actions` from `main` at `0e6c9562098f05dd76e265d026b92ffc0aff9198`; no change reached `main`. Re-listed DPL IDs, allocated DPL-DEC-024, checked current official GitHub/Playwright sources and immutable action SHAs, and selected one minimal Ubuntu 24.04 workflow without changing ADR-0011. Configuration inspection or a pushed workflow without a passing run remains non-evidence.
- [x] (2026-08-13 00:27Z) Accepted the GitHub Actions declarative Setup from guarded lease `TASK-003-github-actions-ci-01-setup-01`, contract digest `5f8b4433dcc80c4f1ddc88b39372be843057c967a40607f7a96aecb2b15fa3c3`, and compliant receipt `013b502fbcbdd37809ebeccf9340ba80313e930f88d8ba670b9a266ab50a6bdd`. Exactly `.github/workflows/ci.yml` was created with SHA-256 `82287FADE19BDF7EC2CDF0B3D89563F74A2609FB80E817AF2597B3BF0F35EE25`; it contains the DPL-DEC-024 triggers, least privilege, immutable official-action SHAs, bounded Ubuntu job, exact repository commands, isolated Compose ports, and unconditional scoped teardown. Static contract/order, frozen hashes, index/HEAD, and diff checks passed. This is configuration evidence only; CI remains open until the committed workflow runs successfully on GitHub.
- [x] (2026-08-13 00:36Z) Completed the pre-publication local barrier after a fresh immutable install. Exact direct dependencies, strict typecheck, root build, Tailwind output, ordered root test with unit 7/7, application 2/2, and Chromium smoke 1/1, the same lifecycle command at 6/6, Compose config and healthy up/ps, scoped down with volumes, both documentation validators, workflow hash, and `git diff --check` passed. The first restricted root-test attempt printed its passing Chromium case but could not complete Playwright teardown; the coordinator interrupted only that recorded session, confirmed no listeners, and repeated the full command with Windows process-tree permission for exit 0. Ports 3000/4173/4174/5173/55432/56379 then rebound, native PostgreSQL remained accepting on 5432, and no active lease or infrastructure resource remained. CI and clean-checkout evidence are still open.
- [x] (2026-08-13 01:40Z) Ran the supported Windows and continuous-integration smoke-lifecycle matrix, including normal completion, startup conflict, assertion failure, readiness timeout, forced cancellation, and forced interruption. Windows, disposable Ubuntu, and the GitHub-hosted job passed 6/6; local runs proved both ports reusable, and the hosted job proceeded through healthy Compose startup/inspection and unconditional teardown.
- [x] Perform the ADR-0010 test-relevance audit and documentation impact review against the integrated candidate.
- [x] (2026-08-13 00:48Z) Completed isolated clean-checkout verification from committed snapshot `e58374ad6c675b722194608a6d4630bba6f45c89` in separately owned `.artifacts/task003-clean-e58374a`. The clone began clean and versioned the workflow, lockfile, and application source. Fresh `npm ci`, Chromium installation, exact direct dependencies, strict typecheck, root/independent builds, Tailwind validation, documentation validators, root test at unit 7/7 -> application 2/2 -> smoke 1/1, lifecycle 6/6, production start with web/API HTTP 200 and exact liveness body, and root `npm run dev` with healthy PostgreSQL/Redis passed. Only the owned foreground sessions were interrupted; scoped `infra:down` removed containers, network, and volumes; the Compose project was empty; all six task ports rebound; and the clone remained clean at the same commit. The first restricted Chromium-install attempt produced no result and was interrupted before the successful identical command ran with cache access; it created no repository artifact or listener. The clean-checkout join passes; GitHub-hosted runtime remains the sole open execution join.
- [x] (2026-08-13 00:55Z) Opened draft [PR #8](https://github.com/mmjosedaniel/rick-and-morty-explorer/pull/8) after pushing `codex/task-003-github-actions`. GitHub Actions pull-request run `31655814237`, job `94309895142`, supplied the first Ubuntu Red: checkout, exact Node/npm, `npm ci`, Chromium/system dependencies, typecheck, build, Tailwind, and ordered root test all passed; lifecycle passed normal completion, startup conflict, assertion failure, and readiness timeout, then failed forced cancellation and forced interruption because ports 4173/4174 were not reusable. The runner subsequently reported orphan `sh`, npm, and Node trees before cleaning them. Compose validation/up/ps were skipped after the failure, while unconditional `infra:down` succeeded with no resource to remove. No-edit test-worker lease `TASK-003-posix-process-group-cleanup-01-red-01` then closed compliant at contract digest `0b20363d1af166880f1f789d3a2433058276363b5c83b6d99e40e117b549aef4` and receipt `3193a19f9c12d4ea1db87bd975390a55e59e99da1678c80b094c1516d74d7e94`, confirmed exact hashes and zero changes, and accepted the existing six-case command as the sufficient regression Red. This is a platform-specific defect signal, not CI evidence; a fresh Green may change only recorded-tree POSIX cleanup while preserving Windows behavior, bounded ownership, and the frozen six-case contract.
- [x] (2026-08-13 01:18Z) Rejected the first POSIX Green candidate after cross-platform review. Lease `TASK-003-posix-process-group-cleanup-01-green-01` closed path-compliant at contract digest `b785318f15d4ce45a88544605f88bc54068dc7f7f0e551bef9048ad483dd254c` and receipt `34eb19bb19937e0a31f7c99e563aacbfa668e57f658461b06716aafd6107dc81`, with only the lifecycle controller changed. Types, unit 7/7, application 2/2, Windows lifecycle 6/6, root smoke 1/1, port probes, frozen hashes, and diff checks passed. Primary validation then mounted a clean `HEAD` archive and only that controller into `mcr.microsoft.com/playwright:v1.61.1-noble`; fresh `npm ci` passed, but the unchanged lifecycle command again produced 4/6 with the same final two port-reuse failures. Docker `--rm` left no container or host listener. The candidate is not accepted or pushed. Playwright's configured web servers use their own detached POSIX groups, so outer-group escalation can preempt runner teardown and strand nested owned groups. A corrected Green must preserve all six cases, Windows semantics, exact time bounds, and ownership while proving both Windows and Ubuntu 6/6.
- [x] (2026-08-13 01:36Z) Accepted the corrected POSIX Green locally. Attempt-2 lease `TASK-003-posix-process-group-cleanup-01-green-02` closed compliant at contract digest `88aa5850109c6057ea1dabfbc5a589d54495f1946a5fda67ff46e818b1194012` and receipt `2c21621eea77683b91520c772a580e619754902de76c5603bbcf5bdaf6d0c890`, changing only the lifecycle controller. The outer POSIX group now receives `SIGINT`, allowing Playwright Test to await teardown of its separately detached web-server groups; the ineffective outer-group `SIGKILL` fallback was removed, and the Windows `taskkill` branch stayed unchanged. Final controller SHA-256 is `68D843521574766F603E4CD55249AD2E6733BEFDC49964618EB7C06D6CB00071`. Typecheck, unit 7/7, application 2/2, Windows lifecycle 6/6, ordered root test with Chromium smoke 1/1, frozen hashes, port probes, and diff checking passed. A disposable `mcr.microsoft.com/playwright:v1.61.1-noble` run from a clean `HEAD` archive plus that exact controller then passed fresh `npm ci`, typecheck, and the unchanged Ubuntu lifecycle matrix 6/6; Docker `--rm` left no container or host listener. GitHub-hosted confirmation remains required before closure.
- [x] (2026-08-13 01:40Z) Passed the final GitHub-hosted runtime join at corrective commit `4b721063f56b66aaca22e73267b451bde6e2d084`. GitHub Actions run `31658342722`, job `94317643800`, completed every Ubuntu 24.04 step successfully: exact Node/npm setup, immutable install, Chromium/system dependencies, typecheck, build, Tailwind, ordered root test, lifecycle, Compose configuration, healthy infrastructure startup/inspection, and unconditional teardown. TASK-003 now awaits only documentation validation and fresh independent closure review; acceptance remains 0/12.
- [x] (2026-08-12 23:11Z) Reconciled the fresh integrated independent review. The read-only reviewer inspected the complete candidate, all 46 terminal lease records, TDD chronology, source/configuration semantics, lifecycle controller, relevance boundaries, documentation, and preserved verification evidence; it independently reran typecheck, the exact direct-dependency report, both documentation validators, diff checking, negative searches, and the controller hash check. Verdict `PASS`: no Blocker, Major, or Minor and no correction required. The reviewer classified unavailable Docker runtime proof, the absent supplied CI route, and the uncommitted clean-checkout join as task-closure blockers rather than candidate defects. Post-review documentation and ADR validation plus `git diff --check` pass. TASK-003 remains `In progress`, the plan remains active, and acceptance remains 0/12.
- [x] (2026-08-13 01:56Z) Reconciled the complete fresh closure review. Its first exact-tree verdict was `REVISE` solely for the stale DEL-001 statement that no application source was committed. The primary corrected only that row to recognize the committed skeleton on the pushed branch/draft PR while retaining DEL-001 and AC-012 as failing. Both validators and diff checking passed; the second fresh review returned `PASS` with no Blocker, Major, or Minor and confirmed every implementation/runtime/documentation join.
- [x] (2026-08-13 01:56Z) Changed TASK-003 canonically to `Complete`, preserved acceptance at 0/12 and TASK-004's independent DG-005 blocker, synchronized the root status, implementation plan, plan index, and execution chronology, and preserved this plan under `docs/plans/completed/` with its stable filename and repaired inbound links.


## Surprises & Discoveries


- Observation: The repository is still documentation-only even though four decision tasks are complete. There is an existing root `.gitignore`, but no `package.json`, lockfile, `apps/`, `packages/`, TypeScript configuration, test configuration, `compose.yaml`, `.env.example`, or application/test source. Evidence: `git status --short`; `rg --files`; root [repository status](../../../README.md#repository-status).

- Observation: The canonical TASK-003 record omitted ADR-0011 even though that accepted ADR explicitly assigns TASK-003 the first unit, application, strict type-check, and Chromium smoke implementation. This registration corrects the governing-decision list without changing scope or status. Evidence: [TASK-003](../../IMPLEMENTATION_PLAN.md#task-003---establish-the-operational-walking-skeleton) and [ADR-0011](../../adrs/superseded/0011-define-the-typescript-test-harness.md#validation).

- Observation: ADR-0001 is preserved `Superseded` history, not current workspace authority. Accepted ADR-0014 carries forward its workspace, one-process API, contract-only shared package, root command, Compose, isolation, and no-microservice constraints. Evidence: [ADR-0014 whole-record lifecycle](../../adrs/0014-persist-and-deliver-character-image-urls-directly.md#whole-record-lifecycle-and-carried-forward-architecture).

- Observation: DG-005 blocks TASK-004 migration-lock work, not TASK-003. Nevertheless, it reinforces the negative boundary: this task must not create migrations, a migration runner, an integration-test registry, Sequelize behavior, migrated schemas, or an ERD. DG-003 likewise keeps every frontend GraphQL-client artifact outside this task. Evidence: [active decision gates](../../IMPLEMENTATION_PLAN.md#active-decision-gates) and the canonical task index.

- Observation: ADR-0011 requires normal completion, startup failure, assertion failure, timeout, cancellation, and interruption to release both owned ports on Windows and continuous integration, but it initially left continuous-integration provider selection absent. The project owner subsequently authorized GitHub Actions. The first hosted run supplied a useful POSIX Red; after the bounded correction, run `31658342722` passed the same lifecycle command and every infrastructure step on Ubuntu 24.04. Evidence: ADR-0011 Decision paragraphs for process cleanup and [Validation](../../adrs/superseded/0011-define-the-typescript-test-harness.md#validation), `.github/workflows/ci.yml`, failed run `31655814237`, and passing run `31658342722`.

- Observation: The first Ubuntu runner exposed a POSIX process-tree cleanup defect that Windows `taskkill /T` and the local Windows matrix could not reveal. Playwright launches each configured web server as its own detached POSIX process group. Sending `SIGTERM` to the outer npm group and escalating that group after a short grace can kill the runner before its asynchronous teardown removes the nested web-server groups. Merely replacing leader-state checks with outer-group liveness therefore remains insufficient. Evidence: GitHub Actions run `31655814237` and the primary's disposable Ubuntu validation both passed the first four lifecycle cases, failed the final two on non-reusable ports, and left no accepted Green; Playwright's installed web-server/process-launcher source confirms detached group creation and asynchronous signal cleanup.

- Observation: ADR-0011 does not define executable cancellation and interruption triggers, and an arbitrary hard machine or runner termination cannot guarantee child cleanup. Before lifecycle code is added, a reversible execution decision must define bounded supported triggers and observable results. If that choice changes the accepted process-ownership semantics, execution must stop for the ADR lifecycle instead of hiding the change in a helper script.

- Observation: The TASK-003 shell, liveness route, and smoke have no product `SPEC-*` rule. They are ordinary task-local tests traceable to TASK-003 and HS-001, HS-006, HS-007, HS-017, and HS-019; they do not make the Gherkin files executable or satisfy SPEC-008, SPEC-014, SPEC-017, AC-007, AC-012, or another acceptance criterion. Evidence: [specification routing](../../specs/README.md#codex-rule-routing) and DPL-DEC-012 in the [decision log](../../execution/decision-and-progress-log.md#decision-log).

- Observation: The initial draft put BrowserRouter ownership and a consumed Tailwind entry into the Green for a smoke Red that observed only process startup, shell visibility, and liveness. Fresh independent review correctly found that those edits were not required by that failure and therefore violated ADR-0010's third law. A first correction gave Tailwind a separate computed-style assertion, but final-state review then found that ADR-0011 limits the TASK-003 smoke to only the visible shell and exact `/healthz` response. The current plan gives routed composition its own jsdom application cycle and treats Tailwind integration as declarative configuration proven by automated production-build output, without adding a browser assertion.

- Observation: A worker's reported path list and `git status` cannot detect that an already-dirty file changed again. The repository now provides a coordinator-owned endpoint-state guard that hashes the tracked and untracked non-ignored baseline, pins Git control state, and requires terminal closure before a handoff barrier. This proves net repository endpoint state only; it neither observes transient edits restored byte-for-byte nor attributes a concurrent writer whose result stays wholly within allowed paths.

- Observation: Current primary sources and registry metadata have a supported common intersection at Node.js 24.18.0 LTS, npm 11.16.0, TypeScript 6.0.3, Vite 8.1.5, Vitest 4.1.10, and Playwright Test 1.61.1. React Router 7.18.2 supports the required React 18.3.1 boundary, while Tailwind 4.3.3 requires Chrome 111, Safari 16.4, and Firefox 128 as the explicit browser floor. Evidence: DPL-DEC-020 and the linked primary-source chronology in the global execution log.

- Observation: The Windows host has Node.js `v24.18.0`, npm `11.16.0`, and Corepack `0.35.0`, but no `docker` command. The repository and attached directive also supply no continuous-integration execution route. Neither absence prevents application and test work from advancing, but Docker runtime proof and the accepted CI half of lifecycle evidence cannot be claimed unless those external capabilities become available. Evidence: native version/command discovery and DPL-DEC-020 through DPL-DEC-022.

- Observation: Playwright explicitly ignores configured graceful `SIGINT` and `SIGTERM` shutdown on Windows. The lifecycle contract therefore uses an outer controller that owns and forcefully terminates only the exact recorded child tree, reports cancellation/interruption as forceful on Windows, and proves port rebinding; it does not reinterpret ADR-0011 as graceful signal evidence. Evidence: [Playwright web-server documentation](https://playwright.dev/docs/test-webserver) and DPL-DEC-022.

- Observation: The behavior-free bootstrap's empty `tsconfig.tools.json` passed before any tool file existed. Once the Red registered `vitest.config.ts`, strict checking exposed real current consumers for DPL-DEC-023's already-allowed `@types/node` and disposable-symbol declaration library, plus an inline-project placement that Vitest runs but TypeScript rejects. The Green worker could not correct those frozen test-side paths and correctly escalated after the focused behavior was green. This is a harness Setup defect, not evidence to weaken `skipLibCheck`, alter the heading test, or expand product behavior.

- Observation: The first native-smoke Green built valid browser assets but served fallback HTML for every asset request. `fileURLToPath(new URL("../dist/", import.meta.url))` retained a trailing Windows separator, and the containment check appended another separator before `startsWith`; valid descendants therefore failed the check. The retained Playwright network trace shows status 200 and `text/html` for `/assets/index-CRnxDZGW.js`, which explains the blank screenshot and missing heading without changing the accepted smoke test.

- Observation: Playwright 1.61.1 uses Windows `taskkill /pid <owned-pid> /T /F` for web-server teardown and awaits the launched shell's close event. The restricted worker sandbox prevented that subprocess action: the corrected Chromium assertions printed without failure, but teardown did not finish. The same unchanged smoke command run with the required process permission exited 0 twice, including through root `test`, and released both ports. This is an execution-permission distinction, not evidence for weakening cleanup checks or changing the smoke contract.

- Observation: Final infrastructure probing found an unrelated local `postgres` process listening on host port 5432. It was neither started nor terminated by TASK-003. The Compose mapping is intentionally configurable through `POSTGRES_PORT`, and the no-unknown-owner rule means a future Docker verification must choose a free explicit host port rather than kill or attach to that process.

- Observation: The owner authorized Docker Desktop installation after the initial final review. Docker Desktop 4.86.0 installed through `winget`; Engine 29.7.2 and Compose 5.3.1 started on the existing WSL 2 boundary. The first image pull failed before creating resources because the current terminal had not inherited Docker's credential-helper path; adding the installed Docker binary directory only to that command process corrected the environment without changing repository files or user Docker configuration. Both Compose lifecycles then passed on alternate loopback ports and cleaned up exactly their named projects.


## Decision Log


- Decision: Register the ExecPlan without starting TASK-003.
  Rationale: A living plan is explicitly requested and the task is dependency-ready, but plan creation is not implementation evidence and does not itself authorize a task-state transition.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Treat ADR-0014 as the current workspace authority and cite ADR-0001 only as preserved historical provenance.
  Rationale: ADR-0014 supersedes ADR-0001 as a whole record while explicitly carrying forward the modular-monolith constraints TASK-003 must implement.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Do not create a Decision Review Contract for this plan.
  Rationale: TASK-003 implements accepted architecture and does not compare consequential architecture options, prepare an ADR, or resolve a decision gate. Its unselected package, runtime, port, and orchestration details are reversible execution choices that must be recorded in the global DPL before dependent artifacts. A discovered architecture conflict still stops work and enters the ADR workflow.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Activate only the unit, non-browser application, and Chromium smoke scopes during TASK-003; keep `test:integration` absent.
  Rationale: ADR-0011 assigns those three scopes to TASK-003 and assigns first integration activation to TASK-004. An inactive scope is neither skipped nor reported as passing.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Use separate Red-Green-Refactor cycles for the semantic React shell, BrowserRouter-owned application composition, runtime configuration, Express HTTP liveness, and built-process smoke wiring.
  Rationale: The separation keeps every Red diagnostic and Green implementation small, prevents declarative bootstrap from becoming untested production behavior, and supplies the exact evidence required by ADR-0010 and the TASK-003 validation contract.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Validate the consumed Tailwind foundation through a dedicated production-build/output command, not through an assertion in the authoritative smoke.
  Rationale: ADR-0010 permits declarative configuration to use automated build/runtime outcomes instead of an artificial unit test, while ADR-0011 fixes the TASK-003 smoke assertions to only the visible shell and exact liveness response. The build check proves toolchain consumption without making a CSS layout or responsive claim.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Keep `packages/shared` structurally present but do not invent dummy exports, backend models, or an empty registered test project merely to populate it.
  Rationale: ADR-0014 restricts the shared package to stable cross-boundary contracts. TASK-003 may add a real operational contract only if a Red cycle demonstrates a current consumer; otherwise package metadata and boundary configuration are sufficient for this milestone.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Make the documented root development workflow start web, API, PostgreSQL, and Redis, while keeping the authoritative TASK-003 smoke independent of infrastructure.
  Rationale: ADR-0014 carries forward the requirement for one root workflow that starts all required local components, whereas ADR-0011 explicitly limits the smoke to two application processes with no database or cache readiness dependency.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Verify the exact DPL-recorded direct-dependency allowlist, then check known gate-blocked families in every workspace manifest and through a broad source/test token search.
  Rationale: An import-pattern-only search can miss an unanticipated client/cache package, forbidden direct dependency, side-effect import, dynamic import, or require call. The allowlist plus broad checks favor reviewable false positives over a false pass across DG-003 and the TASK-003 migration/cache boundaries.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Treat valid Windows and continuous-integration lifecycle evidence as a closure join under current ADR-0011, replaceable only by a completed, accepted, and fully synchronized authority reconciliation.
  Rationale: The accepted ADR simultaneously requires both environments and keeps provider selection out of scope. The ExecPlan cannot manufacture evidence, treat authorization to begin reconciliation as completion, or amend that authority.
  Date/Author: 2026-08-11 / Codex primary thread.

- Decision: Execute implementation through the DPL-DEC-014 worker-first topology, with sequential path leases for `test_worker` and `code_worker` and fresh read-only integrated review.
  Rationale: Bounded workers can own detailed edits and command output without crowding the primary context, while the primary retains task state, DPL decisions, Red acceptance, integration, authority reconciliation, and closure. Same-cycle writers remain serial, accepted test paths stay frozen during Green and Refactor, and decision artifacts remain primary-written under DPL-DEC-011.
  Date/Author: 2026-08-12 / Codex primary thread.

- Decision: Enforce every TASK-003 worker lease with the coordinator-owned automatic write-lease guard before accepting its Setup, Red, or Green handoff.
  Rationale: An immutable dirty-worktree baseline and fresh terminal compliant receipt make the existing path lease falsifiable without adding another agent, hook, workflow engine, or product dependency. Any ambiguous, tampered, forbidden, unleased, or scan-unstable result freezes advancement; the guard never attributes or reverts repository work.
  Date/Author: 2026-08-12 / Codex primary thread.

- Decision: Instantiate the canonical `Worker Assignment Packet v1` for every TASK-003 writer spawn.
  Rationale: A common minimum contract makes identity, authority, objective, commands, path scope, evidence, and stopping conditions reviewable without turning the packet into a context cap. The coordinator may append relevant context and workers may inspect additional repository files, while the automatic guard remains the hard write boundary and any binding assignment change requires a new packet and lease.
  Date/Author: 2026-08-12 / Codex primary thread. See DPL-DEC-017.

- Decision: Keep implementation orchestration on the small normal path defined by DPL-DEC-018.
  Rationale: The packet and lease already protect context and writes. Serial Red, Green with optional same-turn Refactor, primary-owned evidence, and one final review preserve the useful controls without encoding every possible failure, correction, or evidence update as workflow state.
  Date/Author: 2026-08-12 / Codex primary thread. See DPL-DEC-018.

- Decision: Treat the project owner's 2026-08-12 attached implementation directive as the separate authorization to start and execute TASK-003.
  Rationale: The directive explicitly grants TASK-003 execution authority while withholding commit, push, pull-request, CI-provider selection, and scope-expansion authority. The clean worktree, completed TASK-001, resolved DG-001, accepted ADR-0011, absent executable workspace, and absent active lease satisfy the documented start barrier.
  Date/Author: 2026-08-12 / Codex primary thread.

- Decision: Apply DPL-DEC-020 through DPL-DEC-023 as the reversible execution interface for this task.
  Rationale: Current primary evidence fixes one supported, reproducible path before its manifests and helpers exist: npm workspaces with an npm lockfile; Node.js 24 LTS and strict TypeScript native ESM; Vite plus a compiled Node static entry; fixed loopback endpoints; local-only Compose; foreground app orchestration; an exact dependency allowlist; and deterministic direct-dependency, Tailwind-output, and lifecycle commands. These choices add no downstream product behavior or unresolved-gate artifact.
  Date/Author: 2026-08-12 / Codex primary thread.

- Decision: Apply DPL-DEC-024 as the owner-authorized GitHub Actions execution route for ADR-0011's existing CI evidence join.
  Rationale: The original directive withheld provider-selection and publication authority; the owner has now explicitly supplied GitHub Actions, Git, and pull-request authority. A stable Ubuntu 24.04 hosted runner exercises the exact lifecycle command on a non-Windows platform while also providing Docker Compose for the existing infrastructure commands. Read-only token permissions, immutable official-action SHAs, disabled credential persistence/cache, exact Node/npm, Chromium-only installation, bounded execution, and unconditional named-project teardown keep the route minimal and reversible. This decision supplies a route but cannot count as CI or clean-checkout evidence until the committed workflow actually runs successfully.
  Date/Author: 2026-08-13 / Codex primary thread.

- Decision: Define cancellation and interruption at the lifecycle-controller boundary, not as graceful Windows Playwright signals.
  Rationale: The controller can deterministically terminate only its recorded smoke child tree and prove both ports bindable. Cancellation occurs after both owned URLs are ready; interruption occurs while the repository-owned API readiness fixture is pending. On Windows both use forced owned-tree termination and are reported honestly as such. The same command still needs independent CI runtime evidence before task closure.
  Date/Author: 2026-08-12 / Codex primary thread. See DPL-DEC-022.

- Decision: Add `.artifacts/` to the existing ignore controls as the sole pre-lease Milestone 2 coordinator edit.
  Rationale: Playwright must retain task-owned reports, traces, and screenshots without making generated runtime evidence part of the source diff. Existing ignore rules already cover `node_modules`, nested `dist`, coverage, logs, and PID files. The ExecPlan explicitly assigns ignore controls to the primary and freezes them during workers, so this exceptional direct edit is both necessary and narrower than delegating a worker that would immediately invalidate its own guard baseline.
  Date/Author: 2026-08-12 / Codex primary thread.

- Decision: Treat `dist-server/` as generated build output and route the rejected native-smoke Green through one fresh guarded production correction.
  Rationale: The first web-server compilation proved that the generic `dist/` rule does not match the sibling `dist-server/` name. Adding the exact output directory to the coordinator-owned ignore controls reconciles the guard violation without accepting the failed behavior. The frozen smoke test and Playwright configuration remain unchanged; the correction may normalize only the static server's resolved root and must prove smoke success plus deterministic port release.
  Date/Author: 2026-08-12 / Codex primary thread.

- Decision: Route the post-Green strict-typecheck failure through a distinct behavior-free Setup correction, then reassess the already-terminal semantic Green without changing its production file or heading test.
  Rationale: The Green assignment preserved every frozen path and reached its focused behavioral result, but its required broader check found defects in the separately owned harness configuration and missing already-recorded type dependency. A Setup correction may add the current DPL-DEC-023 consumer and make the existing registered configuration type-correct; it may not touch `shell.tsx`, the heading test, setup behavior, or any product source. Semantic Green is accepted only after the correction is independently compliant and the primary reruns package/root unit plus strict typecheck.
  Date/Author: 2026-08-12 / Codex primary thread.


## Outcomes & Retrospective


Plan registration, its hash-specific independent reviews, and every later worker-flow verdict remain point-in-time history. DPL-DEC-018 deliberately replaced the over-specified exception state machine with a compact normal path while retaining the packet, blocking lease, serial TDD ownership, coordinator evidence acceptance, and fresh final review. Exact correction-cycle packet `1B4FBEA61C2CE047579B4B7BD35A2C1D627DCC7945930090B9A6979B88464280` passed complete fresh review with no finding. The project owner supplied the separate execution authorization on 2026-08-12, and TASK-003 then became `In progress`. At that start barrier, no dependency, command, application process, infrastructure container, product test, browser binary, or acceptance evidence had been created.

At each major milestone, append the observed result here: what became runnable, the exact Red/Green/Refactor evidence, any change in cost or scope, the state of the lifecycle evidence boundary, and what remains before closure. At completion, compare the clean-checkout and reviewer observations with the purpose above and record any lesson that must constrain TASK-004.

Runtime configuration and the HTTP liveness boundary are complete at their intended task-local scopes. The first native Green was rejected after a fallback-HTML asset defect, leaked listeners, and incomplete ignore coverage. Attempt 2 normalized the static root in one line and is now accepted: focused Chromium smoke and ordered root `test` pass when Playwright has the Windows process-tree permission its own teardown requires, and both ports are reusable afterward. This establishes only the native happy path. Tailwind output, Compose health, the six-case lifecycle matrix, clean-checkout evidence, and the CI half of lifecycle evidence remain open; TASK-003 stays `In progress`.

The Tailwind foundation is now also consumed and structurally proven through the production build: one generated stylesheet is non-empty, referenced, and contains the current shell's `text-3xl` utility. This adds no browser-style or product-acceptance claim. Native wiring and declarative web foundation are complete; Compose runtime health, root development, the six-case lifecycle matrix, clean-checkout evidence, and the CI evidence join remain open.

The root Compose artifact now also exists and statically matches the recorded two-service boundary, but this host has no Docker-compatible engine. Configuration resolution and healthy runtime remain explicitly unproved; the implementation can advance to root command orchestration and Windows lifecycle evidence without treating the absent infrastructure runtime as green.

Root build, production start, independent development entries, browser install, and scoped infrastructure navigation now exist. Production and workspace development processes were observed through their public loopback interfaces and released their ports after the coordinator interrupted only their owned sessions. The single root `dev` path is structurally complete and fails before application startup only because Docker is externally absent; no substitute runtime claim is made.

The smoke-lifecycle contract now has an accepted Red while the native happy path remains green. Its command and strict compiler fail only on the deliberately absent controller, and the test-only environment hooks do not change the default Chromium assertion or API start command. The next serial Green may create only the controller that owns the six bounded cases and proves port rebinding after each one; Windows success will still leave the separate continuous-integration evidence join open.

The first controller candidate proved normal completion but is rejected: its observation timeout did not itself terminate the recorded smoke tree, so the startup-conflict case could outlive the claimed bound. The candidate remains isolated to one controller file, all processes and ports were reconciled, and a fresh no-edit regression Red will own the specific supervision defect before any correction. No lifecycle-matrix Green is claimed.

The successor supervision Red is now accepted without changing the original six-case contract. It establishes that the controller must treat timeout as an owned cleanup transition: terminate only its recorded child tree, await closure within a second bound, preserve captured primary diagnostics, and separately report cleanup or port-rebind failure. The next Green may edit only the controller and must first reproduce this Red.

The Windows smoke-lifecycle matrix is now green end to end. Every normal, failure, timeout, cancellation, and interruption case terminates or awaits only its recorded process tree and proves both ports reusable; primary and worker runs each observed all six PASS lines. This satisfies the local Windows half of ADR-0011, but it is not continuous-integration evidence and therefore cannot close TASK-003 by itself.

The integrated candidate now passes every locally available repository, build, test, process, and documentation gate after immutable installation. The remaining gaps are evidence joins, not hidden passes: Docker runtime is unavailable; no supplied CI route can run the lifecycle command; and current HEAD `0e6c9562098f05dd76e265d026b92ffc0aff9198` contains none of the untracked implementation, so a clean checkout cannot verify it without the separately withheld commit authority. TASK-003 therefore remains `In progress`, its plan remains active, and all 12 product acceptance criteria remain failing.

Fresh integrated independent review returned `PASS` with no Blocker, Major, or Minor and no requested correction. It confirmed that the implementation is the smallest coherent TASK-003 foundation, that the serial TDD and lease chronology are credible, and that documentation reports the current truth. Candidate quality is accepted, but task closure is not: Docker runtime health, the same-command CI lifecycle run, and a committed clean-checkout snapshot remain external evidence joins. No commit, CI-provider selection, downstream task start, or acceptance claim follows from this verdict.

The post-review Docker join is now resolved with real runtime evidence. Both the unique verification project and the documented root-development project produced healthy PostgreSQL/Redis services, direct readiness responses, public web/API responses, deterministic foreground interruption, scoped volume teardown, empty project readback, and reusable ports without disturbing native PostgreSQL. TASK-003 still remains `In progress` because the same-command CI run and committed clean-checkout snapshot are independently unresolved; the earlier independent verdict remains valid candidate-quality evidence but is not retroactively described as having reviewed this later environment run.

The owner-authorized GitHub Actions route is now configured through one guarded declarative Setup. The workflow mirrors the repository's authoritative commands on a bounded Ubuntu 24.04 job, uses read-only token permissions and immutable official-action SHAs, disables persisted credentials and automatic package-manager caching, isolates Compose host ports, and always invokes the named-project teardown. Static inspection cannot substitute for a GitHub-hosted run, so CI and clean-checkout evidence remain open until the candidate is committed, pushed, and observed.

The complete pre-publication barrier is green on the current Windows working tree. The only non-passing command was the expected restricted-sandbox Playwright teardown attempt; its assertion completed, only its recorded session was interrupted, no listener remained, and the identical root command then passed outside that process sandbox. The lifecycle controller independently passed all six cases, Compose resources were healthy and fully removed, documentation remained consistent, and every task-owned port rebound. This strengthens local evidence but does not close either external join.

The committed clean-checkout join now passes from isolated clone `e58374a`. No untracked file, warm repository dependency directory, global application package, or primary-checkout build output was required: immutable install, Chromium, exact dependencies, types, builds, Tailwind, ordered tests, lifecycle, production start, root development, HTTP observations, Compose health, teardown, and port reuse all succeeded. The clone stayed clean at the recorded commit. GitHub-hosted execution is now the only open runtime join, so TASK-003 remains `In progress` until that workflow produces a passing result and closure documentation is independently reviewed.

The first GitHub-hosted run and the primary's disposable-container rerun are useful Red evidence rather than closure passes. Ubuntu confirmed the workflow through root smoke, then demonstrated that Playwright's detached web-server groups can outlive forced termination of the outer npm group. Four lifecycle cases passed; forced cancellation and interruption left both ports occupied. The first correction replaced leader-state checks with outer-group liveness, passed Windows, and still reproduced the same Ubuntu 4/6 Red, so it was rejected before publication. The accepted local correction keeps the existing cases and bounds frozen, sends `SIGINT` to the recorded outer group so Playwright performs its owned teardown, preserves the Windows path, and passes both Windows and disposable-Ubuntu matrices 6/6. GitHub-hosted confirmation remains the final runtime join.

GitHub-hosted confirmation now passes at commit `4b721063f56b66aaca22e73267b451bde6e2d084`. Run `31658342722`, job `94317643800`, executed the exact bounded Ubuntu 24.04 workflow from immutable install through lifecycle 6/6, healthy Compose infrastructure, and unconditional teardown. Together with Windows, Docker, isolated committed-checkout, direct HTTP, production-start, root-development, relevance-audit, and local validation evidence, this satisfies every implementation and runtime definition-of-done item without satisfying a product acceptance criterion. Final documentation validation and independent closure review remain before the primary may mark TASK-003 `Complete` and move this plan.

TASK-003 is now `Complete`. The final closure review required one narrow delivery-status correction, then returned a fresh corrected `PASS` with no finding. The completed foundation is intentionally smaller than the product: its strict workspace, accessible shell, liveness process, automated scopes, cross-platform lifecycle supervision, healthy independent infrastructure, root workflows, clean-checkout reproducibility, and GitHub Actions route give TASK-004 and later work a trustworthy execution base, but they do not implement GraphQL, persistence, caching, imported data, product UI, images, or any acceptance criterion. The principal lesson for TASK-004 is to preserve the same evidence discipline at real boundaries: keep accepted tests frozen through Green, reject platform-specific partial Greens, and require the external environment named by accepted architecture to pass before closure. Acceptance remains 0/12, and TASK-004 remains `Pending` until the separate DG-005 successor is owner-approved.


## Context and Orientation


The root [documentation map](../../../README.md#documentation-map) is the entry point. [REQUIREMENTS.md](../../REQUIREMENTS.md) owns the source-normalized scope. The [ADR index](../../adrs/README.md) and accepted ADRs own architecture. [IMPLEMENTATION_PLAN.md](../../IMPLEMENTATION_PLAN.md) owns task status, dependencies, gates, and the TASK-003 definition of done. [HARD_SPEC.feature](../../specs/HARD_SPEC.feature) is derived intent only. The global [decision and progress log](../../execution/decision-and-progress-log.md) owns reversible `DPL-DEC-*` choices and chronology. This plan decomposes TASK-003 only.

The direct scope mappings are:

| ID | TASK-003 contribution | What TASK-003 must not claim |
|---|---|---|
| [NFR-001](../../REQUIREMENTS.md#nfr-001---frontend-technologies) | Establish a consumed React 18, React Router DOM, and Tailwind shell foundation. Keep frontend GraphQL client work gate-blocked. | Completion of the product frontend, GraphQL data access, responsive UI, or SPEC-014. |
| [NFR-003](../../REQUIREMENTS.md#nfr-003---backend-technologies) | Establish the Express process and independently healthy PostgreSQL/Redis local infrastructure. | GraphQL product behavior, Sequelize persistence, Redis application use, or readiness coupling. |
| [NFR-004](../../REQUIREMENTS.md#nfr-004---code-quality) | Create small, intention-revealing web/API boundaries and keep comments limited to non-obvious constraints. | Final code-quality acceptance for later product modules. |
| [OR-001](../../REQUIREMENTS.md#or-001---typescript) | Implement the adopted optional strict TypeScript/ESM baseline for all application and test source. | Reclassifying TypeScript as source-mandatory. |
| [OR-008](../../REQUIREMENTS.md#or-008---design-patterns) | Demonstrate the accepted workspace and app/server ownership boundaries without speculative abstraction. | Claiming that every later application, repository, cache, or transport pattern exists. |
| AC-007 | Provide an Express-process and liveness foundation only. | `GET /healthz` is not GraphQL and cannot make AC-007 pass. |
| AC-012 | Provide honest install/build/test/start navigation for the artifacts created here. | DEL-002, complete DEL-003, or AC-012; migrations, ERD, import, and GraphQL usage remain absent. |

TASK-001 and TASK-003 are complete, and DG-001 is resolved through accepted ADR-0011. TASK-003 closed under the separate project-owner execution authorization recorded on 2026-08-12. TASK-004 is its direct successor but remains `Pending` for the separate DG-005 migration-lock successor approval. AUTH-001 is `Authorized`, DG-006 is resolved, and ADR-0014 is accepted; none transfers image-specific work into this task.

The effective accepted decisions are:

- [ADR-0002](../../adrs/0002-use-typescript-across-the-stack.md): strict TypeScript, ESM, documented Node.js/browser targets, runtime input validation, separate no-emit type checking, and production-build proof.
- [ADR-0006](../../adrs/0006-define-a-use-case-oriented-graphql-contract.md): GraphQL remains the sole product API. The operational liveness exception must not become a parallel REST product surface.
- [ADR-0010](../../adrs/superseded/0010-use-a-targeted-automated-testing-strategy.md): one observable Red-Green-Refactor cycle at a time, exact handoff evidence, deterministic tests, and a completion test-relevance audit.
- [ADR-0011](../../adrs/superseded/0011-define-the-typescript-test-harness.md): Vitest projects with explicit Node/jsdom environments, a separate strict `typecheck`, one Chromium/one-worker Playwright smoke with two owned processes, incremental scope activation, no TASK-003 integration scope, and lifecycle cleanup evidence.
- [ADR-0014](../../adrs/0014-persist-and-deliver-character-image-urls-directly.md): current carried-forward workspace, shared-package, root-command, Compose, one-process API, isolation, and no-microservice rules. Its image semantics are outside TASK-003.

The directly applicable derived rules are HS-001, HS-006, HS-007, HS-017, and HS-019. SPEC-014 through SPEC-017 and HS-018 remain downstream delivery guardrails; TASK-003 contributes foundations but does not execute or satisfy them. DPL-DEC-012 keeps both feature files non-executable.


## Scope and Non-Goals


TASK-003 includes the smallest complete foundation for:

- one workspace with root/package manifests, exactly one selected lockfile, documented runtime targets, strict shared and environment-specific TypeScript configurations, and `apps/web`, `apps/api`, and `packages/shared` ownership;
- a minimal accessible React 18 shell mounted through a real browser entry, with React Router DOM and Tailwind used by a current shell consumer rather than installed unused;
- an Express application factory separated from the listening process and an operational `GET /healthz` route returning HTTP 200 and exactly `{ "status": "ok" }`;
- runtime validation for the environment values the web/API processes actually consume;
- ADR-0011 unit, application, and smoke scopes, separate root `typecheck`, deterministic single-run commands, and a root `test` that runs the currently registered scopes in canonical `unit -> application -> smoke` order;
- one Chromium/one-worker smoke with two foreground, non-detaching owned server entries, `reuseExistingServer: false`, bounded waits and assertions, visible server logs, failure screenshots/traces, and explicit port-release evidence;
- root Compose ownership of healthy PostgreSQL and Redis with non-secret example configuration, unique execution identity, scoped teardown, and no application dependency on either service yet;
- authoritative root install, type-check, test, build, development, production-start, browser-install, infrastructure, and smoke-lifecycle navigation for only the artifacts that exist by task closure.

The following remain outside TASK-003:

- a frontend GraphQL client, provider, cache, operation, generated type, hook, query, mutation, error integration, or browser-to-GraphQL request while DG-003 remains pending;
- a GraphQL schema, resolver, product route, application service, repository, Sequelize model, migration, migration runner, migrated test state, Redis client, cache behavior, importer, seed command, ERD, or live public-API request;
- `test:integration`, a placeholder integration project, a skipped future scope, or a claim that an inactive scope passes;
- character data, cards, sorting, search, details, favorites, comments, images, CSP, fallback, Storybook, broad end-to-end coverage, executable Gherkin bindings, numeric coverage gates, or deferred optional features;
- making the React application call `/healthz`; the smoke observes web and API independently;
- coupling `/healthz` to GraphQL, PostgreSQL, Redis, readiness, product data, or an upstream service;
- selecting a continuous-integration provider without the accepted authority change ADR-0011 requires;
- changing an ADR, gate, authorization, task dependency, requirement scope, or acceptance result from this ExecPlan.


## Plan of Work


### Worker-first assignments and barriers


When execution is separately authorized, follow the [worker-first ExecPlan implementation workflow](../../../.codex/execplan-implementation-workflow.md), its canonical [Worker Assignment Packet v1](../../../.codex/execplan-implementation-workflow.md#worker-assignment-packet-v1), and the [automatic write-lease guard](../../../.codex/write-lease-guard.md). The primary issues one bounded assignment at a time, opens the guard before spawning, and terminally closes the same lease after the handoff. It accepts a barrier only after inspecting the receipt, actual diff, commands, and outcome. The anticipated ownership below controls execution unless current evidence requires a narrower scope:

| Slice | Writer and mode | Owned path family | Barrier before continuing |
|---|---|---|---|
| Task start, reversible DPL choices, authority state, evidence, and ignore controls | Primary coordinator | This ExecPlan and the exact authority or control documents affected | During execution TASK-003 is `In progress`; choices and exceptional primary edits are recorded and validated before worker baselines. |
| Each independent declarative setup objective | `code_worker` in `setup` | Only the approved manifest, configuration, infrastructure, or registration paths | Terminal lease is compliant; the primary accepts `SETUP VERIFIED`, the actual diff, and every assigned structural, build, or runtime result. |
| Each web, API, and smoke Red | `test_worker` in `red` | Only the current behavior slice's tests, fixtures, setup, and necessary registration paths | Terminal lease is compliant; the primary accepts the intended nonzero Red and freezes the accepted test-owned paths. |
| Each Green and optional Refactor | `code_worker` in `green` | Only the current cycle's production and explicitly required non-test configuration paths | Green reproduces the accepted Red before editing and passes it afterward. Any same-turn Refactor adds no behavior. The primary accepts the terminal receipt, complete diff, results, and unchanged frozen tests. |
| Milestone and task closure | Primary coordinator, then fresh `independent_reviewer` | Primary-owned evidence and authority documents; reviewer remains read-only | Complete validation, test-relevance audit, and documentation checks precede review; only the primary reconciles and closes. |

Only one write-capable lease may be active in this worktree, and the test and code workers never write concurrently. Create the workflow ID before the first assignment, one cycle ID per setup objective or behavior slice, and a new packet and lease for each worker turn. The packet is a minimum context floor: the coordinator may append relevant context and the worker may inspect additional readable files, but neither may expand a binding objective, authority, command, dependency, result, or write scope. The worker never invokes the guard or edits its runtime records.

Any noncompliant lease, rejected handoff, wrong Red, changed test contract, blocked dependency, authority or scope change, ambiguous concurrent state, or review finding stops writes for primary triage. Any authorized follow-up re-enters the ordinary loop only after reconciliation and with a fresh packet, baseline, lease ID, digest, and worker turn; a materially changed objective is a new assignment. The primary records accepted evidence directly and requests one fresh independent review of each candidate final state. The ExecPlan does not encode a separate branch for every exception.


### Milestone 0: Register the plan without starting implementation


Add this active plan, register it in `docs/plans/README.md`, link it from TASK-003, add the missing ADR-0011 governing reference, note the active plan in the root current-status summary, and append one `Planned` chronology row. Keep TASK-003 `Pending`, the application-absence statement true, and every gate state unchanged. Validate the documentation-only diff and obtain an independent review before treating registration as complete.


### Milestone 1: Start the task and fix reversible execution interfaces before artifacts


When the project owner separately directs execution, re-read the exact current state and confirm TASK-001 remains complete, DG-001 remains resolved, ADR-0011 remains accepted, and no concurrent change has claimed TASK-003. Change TASK-003 to `In progress` in the canonical task owner, synchronize the root status and plan index, and append a distinct `Started` record before implementation claims.

Use current primary documentation to find a supported common Node.js version for React 18, the stable Vitest line, Playwright, the selected package manager, TypeScript, the selected web build tool, and Express. Record the evidence date and exact versions. Allocate the next unused `DPL-DEC-*` ID or IDs only after re-listing the log. Record the package manager and lockfile, package/workspace names, Node.js and browser targets, web build and production-start mode, web/API development and smoke ports, host/origin rules, environment keys and defaults, Compose project/service identity, root foreground process orchestration, the proposed lifecycle command name, bounded cancellation/interruption triggers, the exact direct-dependency allowlist by workspace and current consumer, an exact all-workspace direct-dependency report command, and an exact Tailwind production-build/output validation command. These records must exist before their dependent manifest, configuration, dependency, or helper.

Do not use a DPL entry to amend ADR-0011. Before task closure, either identify an already available continuous-integration execution route that can run the same lifecycle command without selecting a provider here, or complete the accepted owner/ADR workflow and synchronize every affected authority before applying a changed evidence contract. Authorization or initiation of that workflow is not reconciliation and cannot close the task. If no supported Node/Vitest/Playwright intersection exists, if foreground descendants cannot be cleaned on Windows, or if the required lifecycle semantics cannot be tested without changing ADR-0011, stop and invoke its reversal path.


### Milestone 2: Bootstrap only the configuration needed to produce the first Red


Before opening the first worker lease, the primary exceptionally updates the existing `.gitignore` in place for the exact dependency, build, coverage, Playwright, and runtime outputs recorded in Milestone 1. Record the reason and validation because ignore controls are intentionally frozen during every worker baseline. Then open the setup lease and add the selected root workspace manifest, one lockfile, runtime-version pin, strict common TypeScript base, web/API environment configurations, package manifests, and the minimum build/test configuration required to execute a package-local web unit test. Add a non-secret `.env.example` only after its names and values are recorded. Any later ignore-control need closes the current lease and returns to the primary; a worker never changes `.gitignore`.

Establish a root Vitest registry using the accepted current `projects` model. Register `web-unit` only when its first executable test is added, with explicit jsdom, a web-owned React Testing Library setup, DOM matchers, a unique name, non-overlapping includes, and deterministic single-run defaults. Add root `typecheck` separately from runner transforms. Do not register an empty API, shared, integration, or future product project. At the end of this milestone, configuration is sufficient for the next test to fail for the intended missing-shell reason; no untested production shell or liveness behavior exists.


### Milestone 3: Drive the semantic shell and routed application through separate Red-Green-Refactor cycles


During Red, add the smallest package-local jsdom test that renders the shell and queries an accessible level-one `Rick and Morty Explorer` heading. Run only the web workspace `test:unit` and capture the nonzero result caused by the missing shell module or missing heading. Do not add production code before that observation.

During Green, add only the React component necessary to expose that semantic shell and pass the focused test. Use React 18-compatible component APIs and keep the component independent of `/healthz`, GraphQL, product data, and external network access. During Refactor, make only clarity/ownership improvements while the same test stays green, then run root `test:unit` and record both commands and outputs.

After that cycle is green, begin a distinct routed-composition cycle. Red adds one `web-application` jsdom test that renders the actual application composition at `/` and expects the shell through a BrowserRouter-owned route; it must fail because that composition or root route does not yet exist. Green adds only the BrowserRouter/route composition required by that test and reuses the already-tested shell. Refactor keeps routing at the application edge and leaves the shell presentation-only. Register `web-application` and root `test:application` only with this distinct test; root `test` now runs unit then application, while smoke remains absent until Milestone 5. This is not a duplicate heading test added to fill a project: it proves the separate router ownership and root-route behavior required by NFR-001.


### Milestone 4: Drive runtime configuration and HTTP liveness through Red-Green-Refactor


For each consumed runtime value whose invalid form could make ownership ambiguous, run one complete cycle at a time, beginning with the API port. Add only the smallest Node unit test for that one value, observe its intended failure, implement a focused parser with explicit diagnostics, and refactor while the unit scope stays green before adding another case. Never accumulate multiple failing configuration cases. Register an `api-unit` project only when the first real test exists.

Then add one `api-application` test that exercises the public Express composition over HTTP with an ephemeral owned server and Node's native `fetch`, unless the recorded tool decision justifies an equally small adapter. The test must close its owned server in a `finally` boundary and report cleanup failure without hiding the primary assertion failure. Red must be a missing composition, HTTP 404, wrong status, or wrong body—not a dependency-install accident. Green adds the minimum Express application factory and `GET /healthz` behavior needed to return HTTP 200 and exactly the JSON object `{ "status": "ok" }`. The route must require no PostgreSQL, Redis, GraphQL, public API, or domain state. Refactor to keep application construction separate from the listening entry and run the focused application project again.

Add `api-application` to the already-real root application scope only when the HTTP test exists. Update root `test` to execute every currently registered scope in order without mentioning an inactive integration scope. At this milestone, semantic component, routed web composition, and HTTP composition evidence exists, but native production start, Tailwind delivery, and real-browser wiring remain intentionally unproven.


### Milestone 5: Drive native process wiring through Chromium, then validate declarative Tailwind output


Add one Playwright smoke test and its configuration before completing the runnable entries. Configure Chromium only, one worker, `reuseExistingServer: false`, two foreground non-detaching `webServer` entries, the recorded free smoke ports, bounded startup and assertion timeouts, named visible server output, non-interactive reporting, and a dedicated ignored output directory retaining screenshots and traces on failure. The test independently asserts the visible shell and exact API status/body; the page must not request `/healthz`.

Run root `test:smoke` for Red and record the intended startup or assertion failure caused by the missing native web/API wiring. Green adds only the web HTML/mount that renders the already-tested routed application, API listen entry, independent web/API production build/start scripts, and root foreground orchestration required for that smoke to pass. No Tailwind setup, GraphQL, or product route is smuggled into this Green. During Refactor, keep process ownership explicit and commands non-detaching, then rerun independent builds, `test:smoke`, and root `test`.

After native smoke wiring is green, add the recorded Tailwind package/build integration, stylesheet import, and one stable utility token used by the shell as declarative configuration. Do not add a browser assertion or alter the authoritative smoke's visible-shell and liveness contract. ADR-0010 does not require an artificial Red for declarative configuration, but its observable outcome must be automated: run the independent web production build and the exact Milestone 1 Tailwind-output validation command, which must locate the emitted stylesheet through the build manifest or HTML, prove that it is non-empty and referenced, and prove that the configured utility rule was emitted from the current shell consumer. This evidence establishes toolchain consumption only; it does not prove CSS layout, responsiveness, final visual design, NFR-002, NFR-005, or SPEC-014.

At the end, root `test` runs registered `unit -> application -> smoke` scopes and propagates setup, process, assertion, artifact, and cleanup failures. There is still no `test:integration` script, registry entry, skipped project, or migration interface.


### Milestone 6: Add independent local infrastructure and lifecycle conformance


Add root `compose.yaml` with PostgreSQL and Redis services, pinned or bounded versions selected in Milestone 1, explicit health checks, non-secret example values, and no application service containers. Use a unique Compose project name for every verification and prove `config`, startup with health wait, `ps`, and scoped teardown. Application tests, `/healthz`, and the browser smoke must still pass while PostgreSQL and Redis are absent.

Complete the single documented root development workflow required by ADR-0014's carried-forward workspace contract. That workflow must start healthy PostgreSQL and Redis through root Compose and start the web and API through transparent workspace scripts while preserving the selected ownership and failure propagation. Keep separate scoped infrastructure commands available for diagnosis and teardown, and keep the narrower Playwright smoke independent of PostgreSQL and Redis. Record whether root development teardown retains or removes local infrastructure and make repeated invocation safe.

After the lifecycle triggers and evidence route are valid, implement the smallest cross-platform lifecycle verification interface around the exact Playwright smoke. Exercise one case at a time: normal completion, occupied-port/startup failure, assertion failure, readiness timeout, the recorded cancellation trigger, and the recorded interruption trigger. Each case must assert its expected exit category and diagnostics, then prove both owned ports can be rebound with a repository-owned Node helper. Never kill a process merely because it occupies a configured port; fail instead. Never claim graceful Windows SIGTERM or SIGINT handling that Playwright does not provide. Preserve the primary failure and report cleanup failure separately.

Capture Windows observations and the same command's continuous-integration observations. If continuous-integration evidence is unavailable, leave this milestone and TASK-003 incomplete; do not substitute configuration inspection, a local second run, or a future promise.


### Milestone 7: Prove a clean checkout and close the task honestly


From a separately owned clean checkout or worktree, install exactly from the committed lockfile, install Chromium only, run strict no-emit type checking, every registered unit/application/smoke scope, root `test`, independent web and API builds, production starts, the root development workflow, direct HTTP observation, browser smoke, infrastructure health, and the lifecycle matrix. Ensure the documented commands match the actual manifest and do not rely on untracked files, global packages, secrets, or a warm dependency cache.

Perform the ADR-0010 test-relevance audit. Inspect every affected test and suite-wide fixture, mock, helper, output, snapshot, empty project, skipped/focused test, and lifecycle failure fixture. Retain only artifacts with an explicit current consumer and TASK/ADR/HS traceability. Record any consolidation or removal and rerun affected scopes plus root `test`.

Update the root current-status and command navigation, canonical TASK-003 evidence/status, plan index, execution chronology including exact Red/Green/Refactor commands, and every materially affected documentation owner. Do not mark product Gherkin scenarios or acceptance criteria as passing. Run the documentation gate, request an independent closure review, and change TASK-003 to `Complete` only after every definition-of-done item and the CI lifecycle evidence join required by the then-current accepted authority passes. If that authority has been reconciled instead, update this plan and the canonical task contract to the accepted synchronized outcome before applying it. Then move this plan to `docs/plans/completed/` without changing its stable filename.


## Concrete Steps


Run all commands from the repository root unless a different working directory is shown. DPL-DEC-020 through DPL-DEC-023 fix the following executable interface before its dependent artifacts are created. A command becomes runnable only after the owning setup or behavior milestone adds its manifest and source; recording it here is not a passing-result claim.

The registration checks that are authoritative now are:

```powershell
python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
git diff --check
git status --short
```

Expected at registration: both validators exit zero; the ADR validator may retain only the already-known NFR-006 warning; `git diff --check` exits zero; `git status --short` lists only the intended README and documentation registration paths; and no application artifact exists.

Exercise the created root interface in this order:

```text
npm ci
npm ls --depth=0 --workspaces --include-workspace-root
npm exec playwright install chromium
npm run typecheck
npm run test:unit
npm run test:application
npm run test:smoke
npm run test
npm run build
npm run validate:tailwind
npm run test:smoke:lifecycle
```

Expected: the lockfile install is immutable; the direct-dependency report exactly matches the DPL-recorded per-workspace allowlist and identifies each current consumer; only Chromium is installed; type checking emits nothing; every command is non-interactive and returns nonzero for its owned failures; root `test` runs unit, application, and smoke in that order; there is no `test:integration`; both application builds succeed independently; the Tailwind command proves an emitted, referenced stylesheet and current shell utility without a smoke assertion; and the lifecycle command exercises the defined matrix rather than merely rerunning the happy path.

Use these focused TDD commands:

```text
# Working directory: apps/web
npm run test:unit
npm run test:application

# Working directory: apps/api
npm run test:unit
npm run test:application

# Working directory: repository root
npm run test:unit
npm run test:application
npm run test:smoke
npm run test
```

For each cycle, each worker returns the exact command, nonzero Red diagnostic, Green pass, post-Refactor result when applicable, changed paths, lease ID, and contract digest in its concise handoff. The primary terminally closes the pinned lease, inspects the receipt, actual diff, command evidence, and frozen paths, then records accepted evidence directly in `Progress` and `Artifacts and Notes`. Only the primary updates authoritative status and task chronology. Do not preserve the placeholder once a command becomes authoritative.

Exercise independent infrastructure with this task-owned project name:

```powershell
docker compose -p rick-and-morty-task003-20260812 config
docker compose -p rick-and-morty-task003-20260812 up -d --wait
docker compose -p rick-and-morty-task003-20260812 ps
docker compose -p rick-and-morty-task003-20260812 down --volumes
```

Expected: configuration resolves without embedded secrets; PostgreSQL and Redis alone become healthy; no web/API container or application readiness dependency appears; and teardown removes only the named project's containers, network, and volumes.

After `npm run build`, start the API through `npm run start --workspace @rick-and-morty/api` and observe `http://127.0.0.1:3000/healthz`, recording the HTTP status and raw response text. Start the built web through `npm run start --workspace @rick-and-morty/web` and observe `http://127.0.0.1:4173/` through Playwright Chromium, not jsdom. The smoke uses `http://127.0.0.1:4173/` and `http://127.0.0.1:4174/healthz`; it overrides only `API_PORT` for its owned API process.

Run negative-scope and test-relevance searches against implementation paths after they exist:

```powershell
rg -n '"test:integration"|"migrate:[^"]*"' package.json apps packages tests
rg -ni -g package.json '"[^"]*(apollo|urql|graphql|sequelize|umzug|ioredis|redis)[^"]*"\s*:' package.json apps packages
rg -ni 'apollo|urql|graphql|sequelize|umzug|ioredis|redis' apps packages tests
rg -n 'rickandmortyapi\.com' apps packages tests
rg -n '/healthz' apps/web
rg -n '\.(only|skip)\(|describe\.(only|skip)|it\.(only|skip)|test\.(only|skip)' apps packages tests
rg --files apps packages tests | rg '(^|[\\/])(migrations?|seeders?)([\\/]|$)|\.(js|jsx|cjs|mjs)$'
```

Expected: the exact dependency report has no package outside the DPL-recorded TASK-003 allowlist, so an unanticipated client/cache family fails even when its name is not known in advance. In addition, no integration or migration script, migration/seed path, direct Apollo/urql/GraphQL/Sequelize/Umzug/Redis-client manifest entry, matching source/test token, or live-upstream reference is introduced. The broad token search deliberately covers static, side-effect, dynamic, and require-style imports and may require manual classification of an explanatory string. The Redis service in `compose.yaml` is the intentional infrastructure exception and is outside the manifest/source checks. `/healthz` has no web consumer; no focused or skipped test exists; and application/test source is TypeScript. If an exact token occurs in an intentional negative test or explanatory fixture, record the path and consumer instead of weakening the search.

Final documentation and diff checks remain:

```powershell
python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
git diff --check
git status --short
```


## Validation and Acceptance


Registration passes only when this plan is active and linked, TASK-003 remains `Pending`, ADR-0011 is listed as governing, the documentation-only diff validates, and an independent reviewer finds no material scope, authority, traceability, or restartability defect. No product command or TDD cycle applies to plan registration because no production behavior changes. Each material agent, worker-topology, assignment-packet, or guard revision requires its own fresh plan hash, agent-schema and permission checks, guard self-test, documentation validation, exact-diff review, and independent verdict before the plan index may again call the plan ready to execute.

Execution must collect the following observable evidence before TASK-003 can close:

| Boundary | Required Red | Required Green | Required post-Refactor proof |
|---|---|---|---|
| Web shell | Package-local `test:unit` exits nonzero because the shell module or accessible heading does not exist. | The same command passes after the minimum semantic React shell exists. | The focused command and root `test:unit` pass after ownership/clarity cleanup. |
| Routed web composition | `web-application` exits nonzero because the BrowserRouter-owned root composition or `/` route does not exist. | The focused application test passes after the root route renders the existing shell. | Package-local and root `test:application` pass with routing retained at the application edge. |
| Runtime configuration | Node unit scope exits nonzero for the first missing or invalid consumed-value rule. | The focused rule passes with explicit validation and diagnostics. | API unit and strict `typecheck` remain green. |
| HTTP liveness | `api-application` exits nonzero for missing composition, 404, wrong status, or wrong body. | It passes with HTTP 200 and exactly `{ "status": "ok" }`. | The app/server split remains clear; focused application, root application, and strict type-check pass. |
| Native browser smoke | `test:smoke` exits nonzero for the recorded missing startup or shell/liveness assertion. | Chromium observes the visible shell and exact API response through two owned processes. | Independent builds, smoke, root `test`, and port-release happy path pass. |

Every Red must fail for the intended reason before its production edit. A dependency-resolution, unrelated type error, stale process, occupied port, or previous failing test is not acceptable Red evidence. `test_worker` returns the test diff and Red result to the primary, which first obtains a compliant terminal lease receipt and then accepts or rejects that barrier. `code_worker` reproduces the accepted Red, adds only enough production behavior for the current failure, and may perform a small same-turn Refactor only after Green while frozen tests remain unchanged and validation is repeated. The coordinator records accepted evidence directly. A missing or noncompliant receipt keeps the barrier unaccepted even when the focused command succeeds. Exact transcripts replace the generic expectations in the table as execution proceeds.

Tailwind is not an additional TDD row or smoke assertion. It is declarative configuration whose automated production-build/output command must prove that the web build emits and references a non-empty stylesheet containing the exact utility generated for the current shell consumer. That structural evidence must pass alongside the independent web build and cannot be reported as CSS layout, responsive, browser-style, or product acceptance evidence.

The implemented harness passes only when:

- Vitest uses the stable line and current `projects` model recorded at execution; project names are unique, environments are explicit, includes do not overlap, shared settings are extended explicitly, and missing/empty registered scopes fail;
- `web-unit` and `web-application` use jsdom and web-owned React Testing Library/DOM setup; API projects explicitly use Node;
- root `typecheck` delegates strict `tsc --noEmit` across all implemented application and test configurations and is independent of runner transforms;
- package-local `test:unit` can reproduce one focused Red without PostgreSQL, Redis, app processes, or a browser;
- root `test` runs all and only registered unit, application, and smoke scopes in order, while `test:integration` is absent rather than skipped or passing;
- the Chromium smoke uses one worker, two foreground non-detaching servers, `reuseExistingServer: false`, bounded startup/assertion timeouts, visible named logs, non-interactive output, and retained failure screenshots/traces;
- the web page never calls `/healthz`, and the smoke needs no GraphQL, character data, PostgreSQL, Redis, image, or live public network;
- normal completion and each defined startup, assertion, timeout, cancellation, and interruption case return the expected status/diagnostics and leave both owned ports bindable on Windows and continuous integration.

The operational workspace passes only when a separately owned clean checkout can perform the immutable install, reproduce the exact per-workspace direct-dependency allowlist, install Chromium only, run strict type-check, registered tests, independent builds, root build, production starts, and the root development workflow through documented commands. The shell is observable in real Chromium. The API returns the exact liveness contract over HTTP. PostgreSQL and Redis report healthy under a uniquely named Compose project and can be removed with scoped teardown. The apps remain operational without those containers.

Under current ADR-0011, the task remains incomplete if the continuous-integration half lacks runtime evidence. It also remains incomplete if cancellation/interruption semantics are undefined, any process or port leaks, an inactive integration scope is present, an unresolved gate's artifact appears, a required Red was not observed, or a command depends on an untracked/global artifact.

Before closure, perform the ADR-0010 relevance audit and record a disposition for the shell unit test, routed application test, configuration tests, liveness application test, native smoke assertions, Tailwind build-output validator, lifecycle cases, fixtures, and helpers. Search the complete suite for residual mocks, fixtures, snapshots, empty projects, focused/skipped tests, test-only production branches, and unconsumed output. Run affected scopes and root `test` after any maintenance.

Documentation closure must update every materially affected owner, state the documentation impact explicitly, preserve dated history, pass both validators and `git diff --check`, and receive fresh read-only review of the complete tests, implementation, evidence, documentation, and exact diff. Reviewer findings stop closure and return to primary-coordinator triage. After reconciliation, any authorized implementation fix re-enters the ordinary workflow under the appropriate owner with a fresh packet, baseline, and lease; evidence and authority updates remain primary-owned. Only the primary performs post-review reconciliation and may change TASK-003 to `Complete`; AC-001 through AC-012 and product SPEC scenarios remain unpassed unless later owning tasks provide evidence.


## Idempotence and Recovery


Plan registration is additive and safe to validate repeatedly. Do not start the task merely to repair this plan. Preserve historical log rows and completed plans; append or supersede according to their governing workflow.

Package installation must be repeatable from exactly one lockfile. Never mix package managers or hand-edit the lockfile. Build, type-check, unit, application, and smoke commands must be safe to rerun. Keep generated build, coverage, Playwright, and runtime outputs in dedicated ignored paths so a failed run cannot overwrite source evidence.

Use one unique Compose project name per verification. Teardown only that explicit name. Never run broad Docker prune operations, remove unrelated volumes, or reuse a generic project whose ownership is uncertain. PostgreSQL/Redis failure does not justify changing `/healthz` or tests because those services are intentionally independent here.

The smoke must never attach to an existing server. If a configured port is occupied, report the owner-neutral conflict and fail; do not terminate the occupying process. Lifecycle cleanup may terminate only process identifiers or groups created and recorded by the current owned run. Confirm port bindability after cleanup, and preserve the primary failure while reporting any cleanup failure separately.

If work stops during Red, leave the exact failing command and intended diagnostic in `Progress` and resume from that test. If Green is complete but Refactor is not, keep the same scope green before editing. Do not skip, weaken, delete, or condition a test to recover. Do not use `git reset --hard`, broad checkout, recursive workspace deletion, or another task's files as recovery.

If a worker stops, the guard finds an unexpected or forbidden path, or Git/control state becomes ambiguous, terminally close the lease with its honest result when the pinned CLI can do so, freeze further writes, and inspect the shared working tree without automatically reverting it. A missing `started` result or irrecoverable active state has no force-recovery command and requires separately authorized coordinator recovery recorded here before another baseline. Resume only after identifying the source, re-establishing the last accepted setup, Red, Green, or Refactor barrier, and opening a new lease against the reconciled baseline. Never recover by redefining or rebasing the prior contract, overlapping the test and code workers, letting the code worker change a test, or treating a new test contract as part of the prior cycle.

Perform clean-checkout work only in a separately resolved path owned for TASK-003. Verify the absolute path before any cleanup; prefer removing only known generated outputs or retiring the disposable checkout through the repository's safe worktree workflow. Lack of commit authorization or a clean source snapshot keeps clean-checkout evidence pending rather than authorizing a destructive substitute.

If exact supported tool versions no longer overlap, Windows process trees leak, the defined cancellation/interruption triggers cannot represent ADR-0011 honestly, or the CI evidence route remains absent, stop at the last green milestone. Record the evidence and invoke the accepted ADR's reversal/authority workflow. Do not introduce a hidden platform branch, background daemon, detached process, provider selection, or false pass.


## Artifacts and Notes


Initial baseline on 2026-08-11:

```text
git status --short
# no output

Executable workspace artifacts
# package.json, lockfile, apps/, packages/, TypeScript/Vitest/Playwright config,
# compose.yaml, .env.example, application/test source, and authoritative Node commands absent
```

Plan-registration verification on 2026-08-11:

```text
validate_docs.py: pass; 42 Markdown files, 41 requirement IDs, 1 authorization,
                  17 tasks, 17 SPEC rules, 20 HS rules, 119 scenarios
validate_adrs.py: pass; 14 ADRs, 38 mapped requirements; known NFR-006 warning only
git diff --check: pass; line-ending notices only
changed scope: README.md plus docs/IMPLEMENTATION_PLAN.md, docs/execution/, and docs/plans/
executable artifact search: no package, lockfile, app/package tree, TypeScript/test,
                            Compose, or example-environment artifact found
```

Independent final evidence checkpoint on 2026-08-11:

```text
reviewed plan SHA-256: 4AEEE0B1F0FED6EAA65CF6B36CF90D585F896B3BB52CAB69182F12827D7C5156
verdict: PASS
open findings: none
correction history: two provisional Majors plus later smoke-scope and closure-wording
                    findings corrected before the final verdict
authority state: TASK-003 Pending/unstarted; gate and acceptance states unchanged
implementation evidence: none
post-review reconciliation: validators, diff/cached checks, whitespace, scope, task
                            state, and negative artifact searches repeated and passed
```

TASK-003 start checkpoint on 2026-08-12:

```text
authorization: the project owner's attached directive explicitly authorizes TASK-003 execution
withheld authority: commit, push, pull request, CI-provider selection, and scope expansion
repository: main at 0e6c9562098f05dd76e265d026b92ffc0aff9198; clean index and worktree
prerequisite: TASK-001 Complete; DG-001 Resolved; ADR-0011 Accepted
executable artifacts: no manifest, lockfile, apps/, packages/, tests/, Compose, or environment example
worker state: no active write-lease pointer; no worker spawned before the task-state transition
authority state: TASK-003 In progress; downstream tasks and unrelated gates unchanged
implementation evidence: none at the start barrier
validation: documentation validator exit 0; git diff check exit 0; five intended documentation paths modified
```

Milestone 1 reversible-interface checkpoint on 2026-08-12:

```text
DPL allocation after full re-list: DPL-DEC-020 through DPL-DEC-023
runtime/package manager: Node.js 24.18.0 LTS; npm 11.16.0; package-lock.json; npm ci
compiler/build/test: TypeScript 6.0.3; Vite 8.1.5; Vitest 4.1.10; Playwright 1.61.1
application baseline: React/React DOM 18.3.1; React Router DOM 7.18.2; Express 5.2.1
browser targets: Chrome 111; Edge 111; Firefox 128; Safari 16.4
workspaces: rick-and-morty-explorer; @rick-and-morty/web; @rick-and-morty/api;
            @rick-and-morty/shared
loopback endpoints: web dev 5173; API default 3000; built web/smoke 4173;
                    smoke API 4174; PostgreSQL 5432; Redis 6379
application environment: API_HOST=127.0.0.1; API_PORT=3000 by default
Compose: postgres:18.4-alpine; redis:8.8.1-alpine; services postgres/redis;
         dev project rick-and-morty-dev; verification project rick-and-morty-task003-20260812
immutable install: npm ci
direct dependency report: npm ls --depth=0 --workspaces --include-workspace-root
Tailwind output proof: npm run validate:tailwind
lifecycle matrix: npm run test:smoke:lifecycle
Windows lifecycle semantics: force only the recorded child tree; do not claim graceful signals
CI evidence route: none supplied; no provider selected or configuration created
host discovery: docker command absent; runtime infrastructure evidence remains pending
implementation evidence at decision barrier: none
```

Primary sources checked on 2026-08-12 are linked from the DPL-DEC-020 through DPL-DEC-023 chronology row. Exact registry metadata came from read-only `npm view <package> version engines peerDependencies --json` queries. The allowlist is exhaustive by direct workspace ownership: six root development packages, three web production packages, ten web development packages, one API production package, one API development package, and no third-party shared-package dependency. Every later direct addition requires a new pre-installation DPL decision and a current TASK-003 consumer.

Behavior-free bootstrap Setup evidence on 2026-08-12:

```text
workflow: TASK-003-20260812-01
cycle: TASK-003-bootstrap-01
accepted lease: TASK-003-bootstrap-01-setup-06; setup attempt 1; code_worker
contract digest: 5eaecf920433567d9408f5b44b26c496a8636a513125ef030ce67777c7200dd3
terminal result: closed-compliant; fresh close; already_closed false
receipt digest: a923707e702a1155884f5e675aac09a3e184117ceedb8196932d0ec25ea19484
post-close status: closed-compliant; post_close_drift false
allowed changes: twelve created files; forbidden 0; unleased 0; modified 0; deleted 0
worker validation: npm install 0; npm ci 0; direct dependency report 0; typecheck 0;
                   git status 0; git diff --check 0
primary readback: exact manifests/configs/defaults match; lockfileVersion 3; direct report 0;
                  typecheck 0; file inventory contains package/config only; diff check 0
installed direct subset: root typescript 6.0.3 and vitest 4.1.10; web React/DOM
                         18.3.1, Vite 8.1.5, jsdom 30.0.1, React Testing Library
                         16.3.2, DOM 10.4.1, jest-dom 7.0.1, and React type packages
behavior/test evidence: none; Vitest registry and first Red intentionally absent
```

Before the accepted start, unused lease IDs `TASK-003-bootstrap-01-setup-01` through `-05` were each rejected by guard input validation because a proposed forbid scope was special or ignored (`.git`, `.agents`, `.codex`, missing ignored source paths, or `docs`). Each rejection returned no contract digest and `active=False`; no worker was spawned and no ID was reused. The successful packet kept those paths semantically frozen, used exact allow-file projection plus tracked forbidden files, and relied on the guard's default rejection of every other non-ignored endpoint change.

Semantic-shell accepted Red evidence on 2026-08-12:

```text
cycle: TASK-003-web-shell-01
lease: TASK-003-web-shell-01-red-01; red attempt 1; test_worker
contract digest: 18c880daea73fe0f43caa79926d686f29e7e2ef2cda7aab920cc26c814c95bea
receipt digest: 84bac5656059e396493deaf69ad1bf9e30e95b7856c4ef567ac6ac65bca70149
terminal/status: closed-compliant; fresh; post_close_drift false
changes: created vitest.config.ts, apps/web/src/test/setup.ts, and
         apps/web/src/shell.unit.test.tsx; modified two leased tsconfig files;
         forbidden 0; unleased 0
focused Red command: cd apps/web; npm run test:unit
decisive result: exit 1; web-unit loaded; Vite failed to resolve local ./shell from
                 src/shell.unit.test.tsx; one test file failed before test execution
reproduction: primary reran the same command and observed the same missing-module diagnostic
focused/skipped search: no matching token
```

Frozen SHA-256 values for the remainder of `TASK-003-web-shell-01`:

```text
vitest.config.ts A79158FC0494C6BDF8B2E1EA9AD24D763DE0DC9C73E21C35014C93D4DCB6A2CB
tsconfig.tools.json 2319F4173DFB061A023E40E80380AA56796914360D71D4B466E4E0681BAC47A6
apps/web/tsconfig.json 6E217C4B3A65360C44B6B9603C4EBB3BA97C79770090BAC01C6F60FA8A3083F1
apps/web/src/test/setup.ts F6DACD0C48CAA5C15C870A23F157A9801EEA0C792F9C6E4D9A29374FA10B3E39
apps/web/src/shell.unit.test.tsx 99DD8851C4193FB9C5B6D481E47A7D1EDA4D357C179AE94D4593116EC112F682
```

Semantic-shell terminal Green escalation on 2026-08-12:

```text
lease: TASK-003-web-shell-01-green-01; green attempt 1; code_worker
contract digest: 49d528f40e68715e6d4eb7360f10a30ef9c830d1eaf9b306b7740e9a83bac20c
receipt digest: 87ebafbfcd92c8fa634470b8c2e5dd785be3fb1003766e546736344e8a518d20
terminal/status: closed-compliant; fresh; post_close_drift false
changes: created only apps/web/src/shell.tsx; forbidden 0; unleased 0
pre-edit reproduction: package-local test:unit exit 1; accepted unresolved ./shell
focused result: package-local test:unit exit 0; 1 file / 1 test passed
root unit result: exit 0; 1 file / 1 test passed
frozen barrier: all five SHA-256 values matched exactly
strict typecheck: exit 1 in test-tool declarations/config before web/API/shared checking;
                  missing @types/node, missing Symbol.asyncDispose library support,
                  and inline-project passWithNoTests type placement
worker outcome: ESCALATE; no Refactor; semantic Green not yet accepted
primary reproduction: root unit exit 0; root typecheck reproduced the same three causes
```

The correction is a new Setup objective, not a test or production rewrite. Its scope may include only root manifest/lockfile, the root tool TypeScript config, the web TypeScript config if the current imported declarations require the same disposable-symbol library, and the root Vitest registry. `apps/web/src/shell.tsx`, the heading test, and web setup are frozen. DPL-DEC-023 already records `@types/node@24.13.3` for Node/tool types; no new direct dependency decision is needed.

Harness correction and final semantic-shell Green acceptance on 2026-08-12:

```text
setup cycle/lease: TASK-003-harness-types-01 /
                   TASK-003-harness-types-01-setup-01; code_worker; attempt 1
setup contract: 44c4c600a192ab7c949cf3c73ea448d75c226e2d0c94fd9000fc8fdc3a213d91
setup receipt: e2c4d86584ef90cee3932f808c238c506f2157453ad9cc0894dc60b40f19ec15
setup terminal/status: closed-compliant; fresh; post_close_drift false
setup changes: five allowed modifications; forbidden 0; unleased 0
dependency delta: root @types/node@24.13.3 only; exact manifest and lockfile resolution
worker setup validation: npm install 0; npm ci 0; direct report 0; typecheck 0;
                         package/root unit 0; source/test hashes unchanged; diff check 0
primary validation: direct report 0; typecheck 0; package unit 1/1; root unit 1/1;
                    exact lock resolution; Shell/test/setup hashes unchanged; diff check 0
accepted Green implementation: apps/web/src/shell.tsx
Green/Refactor status: minimum Green accepted; no Refactor needed or performed
```

Routed-composition dependency Setup evidence on 2026-08-12:

```text
cycle/lease: TASK-003-router-dependency-01 /
             TASK-003-router-dependency-01-setup-01; code_worker; attempt 1
contract digest: fa9fba529e4957fecfe0f95fd5ff702bcaccf2d146306417d0633a5833f9f934
receipt digest: 74958abd21d7eccc7481694c5eefced08a180ef891781df42afe41383625f31d
terminal/status: closed-compliant; fresh; post_close_drift false
changes: apps/web/package.json and package-lock.json modified; forbidden/unleased 0
direct delta/readback: react-router-dom 7.18.2; exact manifest, workspace lock, and
                       resolved package version
worker validation: npm install 0; npm ci 0; direct report 0; typecheck 0;
                   package/root unit 0; diff check 0
primary repetition: direct report 0; typecheck 0; root unit 1/1; exact readback 0
routing behavior evidence: none; application Red is next
```

Routed-composition accepted Red evidence on 2026-08-12:

```text
cycle/lease: TASK-003-web-route-01 / TASK-003-web-route-01-red-01;
             test_worker; attempt 1
contract digest: 1e99ba344ade1b3dbfe72f833cc64753f063593eef1d83526a9684125c837a97
receipt digest: da111b7d62c9d3985951e9c22071726588a29ca1947eb2a56bd8bf0bfd20442f
terminal/status: closed-compliant; fresh; post_close_drift false
changes: created apps/web/src/app.application.test.tsx; modified root/web scripts and
         Vitest registry; forbidden/unleased 0
unit baseline/recheck: root then package unit exit 0; 1 file / 1 test
focused Red: cd apps/web; npm run test:application; exit 1
decisive result: web-application loaded and Vite failed to resolve ./app from the
                 root-history application test
```

Frozen SHA-256 values for the remainder of `TASK-003-web-route-01`:

```text
vitest.config.ts D658C1A761E2C0942B8547F36CAEE9296BFA9453964872501DA1BD7C05945CA8
package.json 0B6343A28D22F2EA65C95F9DBAD348E69F9DDDD9C663FE733594D3DD0B7EFE10
apps/web/package.json 0D34D876AB58FD0251FD9A46F9BEC6319BAFB6EDE96CF7CCD6097A5CDC9F36F1
apps/web/src/app.application.test.tsx D644AAE3C15B88C0C0355865AE4295DD9BC4B461C52D02326110202733DD2D40
```

Routed-composition accepted Green evidence on 2026-08-12:

```text
lease: TASK-003-web-route-01-green-01; code_worker; attempt 1
contract digest: 83cfb6d1c65a21228d1e755ec1095763d0b62b6fffa9e71608abea26d23da3bf
receipt digest: 427bdc3e54e82be8bdb6b55deb57c1aae486120b2384384af6e2cfc044ea7bee
terminal/status: closed-compliant; fresh; post_close_drift false
change: created only apps/web/src/app.tsx; forbidden/unleased 0
pre-edit reproduction: package application exit 1; accepted unresolved ./app
worker Green: package/root application 1/1; root unit 1/1; root test 0 with unit then
              application; typecheck 0; all four frozen hashes exact; diff check 0
primary repetition: root application 1/1; root test 0 with unit then application;
                    typecheck 0; frozen hashes exact
semantic inspection: App owns BrowserRouter, Routes, and one `/` Route that reuses Shell
Refactor: none needed or performed
```

API-port-default Red attempt-1 rejection on 2026-08-12:

```text
cycle/lease: TASK-003-api-port-default-01 /
             TASK-003-api-port-default-01-red-01; test_worker; attempt 1
contract digest: 3eecfda23e18329bf82fe116526f1d78797c18ede7caeb5caaccc961c46deb10
receipt digest: d01b1938b2ff0c5d59d4b892a204172f3d826b1f3b604b916aacb4d345c47152
terminal/status: closed-compliant; fresh; post_close_drift false
changes: created one API unit test and modified four registration/config paths;
         forbidden/unleased 0
Vitest observation: root/focused exit 1 on missing ./config; web unit 1/1 passed
primary strict check: exit 1; TS2834 requires an explicit relative runtime suffix under NodeNext
semantic disposition: RED REJECTED; production absent; no frozen test barrier
correction: attempt 2 changes only `./config` to `./config.js`, then repeats root/focused Red
```

API-port-default accepted Red attempt 2 on 2026-08-12:

```text
lease: TASK-003-api-port-default-01-red-02; test_worker; attempt 2
contract digest: 5df923f2ec861c3322235136efc75c27d4931bb7317df67393444f97a7b1bb74
receipt digest: 9b4379b3467fff2ffd7c96dae4f2a421e58deae57b1bf4265776204765c89402
terminal/status: closed-compliant; fresh; post_close_drift false
change: modified only apps/api/src/config.unit.test.ts import suffix; forbidden/unleased 0
root/focused Red: exit 1 on absent ./config.js; web unit 1/1 passes
strict Red: exit 1 only TS2307 for absent ./config.js
semantic disposition: RED CONFIRMED
```

Frozen SHA-256 values for the Green of `TASK-003-api-port-default-01`:

```text
vitest.config.ts 9D11674728A48D0ABCDE7F8ABCDB8E55DC05AE0A5E9AA7838B11AE4B80714EAE
package.json F5AF0975EBD013D9E033200F162E559F950DE4DE611649B96214B8EA06BE6711
apps/api/package.json 260C785BE99DF7707B3ADA5C81CFF53A8A0ED61CEAC9BA368A7F1EB13D21B880
apps/api/tsconfig.json DEEE2DE8C1C0A310C3E8C984C2AD2D4EFE96F3CA64B86958E77E60555F97E451
apps/api/src/config.unit.test.ts C2F79FEC910C3EECBD64E9907FC6DEBA433D66E658FE35D648FCA693D7720BDC
```

API-port-default accepted Green evidence on 2026-08-12:

```text
lease: TASK-003-api-port-default-01-green-01; code_worker; attempt 1
contract digest: b1c19fc112d16fe4720ab579e2d6fbed5ee7aacbf8e4fb24a3820e05e42e9f02
receipt digest: 8e7063c22a6655aea7fabef82d2c46d61a956e94141abc9733daee39525c33b2
terminal/status: closed-compliant; original receipt; post_close_drift false
change: created only apps/api/src/config.ts; forbidden/unleased 0
pre-edit reproduction: root/focused unit exit 1; accepted unresolved ./config.js
worker Green: focused API 1/1; root unit 2/2; application 1/1; root test 0 with
              unit then application; typecheck 0; frozen hashes exact; diff check 0
primary repetition: focused/root unit 2/2; application 1/1; root test order visible;
                    typecheck 0; config and frozen-test hashes exact; diff check 0
semantic inspection: parseApiPort accepts an optional string and implements only the
                     accepted undefined-to-3000 default rule
Refactor: none needed or performed
```

API-port-valid-override accepted Red evidence on 2026-08-12:

```text
cycle/lease: TASK-003-api-port-override-01 /
             TASK-003-api-port-override-01-red-01; test_worker; attempt 1
contract digest: 473889a5754c71131311a6b2edbb9a194b5cb85c01adbae030a3897deb8492f9
receipt digest: 2f8cba18411c4dc18981521bb7a0d6b920ec9e1d34e67bd92603a86e9fdb422c
terminal: closed-compliant; fresh
change: modified only apps/api/src/config.unit.test.ts; forbidden/unleased 0
focused Red: exit 1; expected 4174, received 3000; default case 1/1 passes
root Red: exit 1; only override case fails; web and default cases 2/2 pass
strict typecheck: exit 0
frozen production hash: 65E0A21E6E6A7D415546303BDD7C55E77967158718829F439ECB5ED4D0BBEC11
semantic disposition: RED CONFIRMED
```

Frozen SHA-256 value for the Green of `TASK-003-api-port-override-01`:

```text
apps/api/src/config.unit.test.ts A1D34E04EBE4BAA1966C25230ECAF603029215511951E4DB8B801903120AD1E9
```

API-port-valid-override accepted Green evidence on 2026-08-12:

```text
lease: TASK-003-api-port-override-01-green-01; code_worker; attempt 1
contract digest: 71d7331d7dda712bd250b33620f0f899153a3cf37b3d27d284f22b39ef0c4d36
receipt digest: 133b812b79927d4308a2c00f7a9f1194eeaa760893c07bc673167350b3565b09
terminal: closed-compliant; fresh
change: modified only apps/api/src/config.ts; forbidden/unleased 0
pre-edit reproduction: focused exit 1; expected 4174, received 3000
worker/primary Green: focused API 2/2; root unit 3/3; application 1/1;
                      ordered root test 0; typecheck 0; frozen test exact; diff check 0
semantic inspection: supplied strings are converted with Number while undefined retains 3000
production SHA-256: 1F6761C701600A5BAE7D07ABB034C1D716B314698715472A93765771052BEEA2
Refactor: none needed or performed
```

API-port-decimal-syntax accepted Red evidence on 2026-08-12:

```text
cycle/lease: TASK-003-api-port-syntax-01 /
             TASK-003-api-port-syntax-01-red-01; test_worker; attempt 1
contract digest: a1024bfab04e4d4c8864aa422808c4f000162573825e906ee2d1e38108172b30
receipt digest: c0d4563742b2626731be7a5b8b9369466bb4ced3c9610eaae3defa354c973203
terminal: closed-compliant; fresh
change: modified only apps/api/src/config.unit.test.ts; forbidden/unleased 0
baseline: focused API 2/2 passes
focused/root Red: exit 1 only because parseApiPort("3000.5") does not throw;
                  prior API and web cases 3/3 pass
strict typecheck: exit 0
frozen production hash: 1F6761C701600A5BAE7D07ABB034C1D716B314698715472A93765771052BEEA2
semantic disposition: RED CONFIRMED
```

Frozen SHA-256 value for the Green of `TASK-003-api-port-syntax-01`:

```text
apps/api/src/config.unit.test.ts 0C3DAFBF2A153E4C29088FD8EBFCE4A37A925768AE1773B5107B7C3EA6CEF0B0
```

API-port-decimal-syntax accepted Green evidence on 2026-08-12:

```text
lease: TASK-003-api-port-syntax-01-green-01; code_worker; attempt 1
contract digest: be0deb5d1bdfd9e0ee271d08776f9b9538f399f226a3ca12569b9e31c6d3ac92
receipt digest: 20f0cddd805753d006487701fb40ba9da142b7f07465bde80dede39fdcdc0e1b
terminal: closed-compliant; fresh
change: modified only apps/api/src/config.ts; forbidden/unleased 0
pre-edit reproduction: focused exit 1 because 3000.5 did not throw
worker/primary Green: focused API 3/3; root unit 4/4; application 1/1;
                      ordered root test 0; typecheck 0; frozen test exact; diff check 0
semantic inspection: supplied values must match ASCII decimal digits before conversion;
                     bounds remain absent
production SHA-256: 1B1882489BE26C66569619CDAC54DA7B3B8C94FAD63DEF1ACEE74F264CC5E9D8
Refactor: none needed or performed
```

API-port-range accepted Red evidence on 2026-08-12:

```text
cycle/lease: TASK-003-api-port-range-01 / TASK-003-api-port-range-01-red-01
role/attempt: test_worker / 1
contract digest: bb326c8266ec3a0b1e4676b1cc27d88eacbb638c5d426cbcc9c50f38f0f4b423
receipt digest: ba6861183352c67c6dba0d40a16f400408b820ec91811b7ec1f768277130f69c
terminal: closed-compliant; fresh
change: modified only config.unit.test.ts; forbidden/unleased 0
baseline: API 3/3; focused/root Red exit 1 because 0 and 65536 do not throw;
          all four prior API/web cases pass; typecheck 0; production hash exact
frozen test SHA-256: 4AA8B24BED05AFCE23166C13AAF929B0129DF74045FC2C9AD37544A3342F526A
semantic disposition: RED CONFIRMED
```

API-port-range accepted Green evidence on 2026-08-12:

```text
lease: TASK-003-api-port-range-01-green-01; code_worker; attempt 1
contract digest: 5e84ce8fcd010e4d25874ef94110625c813773d0917261b70cce91d26a798163
receipt digest: 0b91b6f1c381537ea2b386eab60ec3fd3f1dff174813835368b22f36402a3ac8
terminal: closed-compliant; fresh
change: modified only config.ts; forbidden/unleased 0
pre-edit reproduction: focused exit 1 only on range rule
worker/primary Green: API 4/4; root unit 5/5; application 1/1; ordered root
                      test 0; typecheck 0; frozen test exact; diff check 0
semantic inspection: one numeric conversion followed by inclusive 1..65535 check
production SHA-256: 5D5DD9BF92C709F50B4C8D59583270AB153B03F74B30E591340F446139241565
Refactor: none needed or performed
```

API-host-default Red attempt-1 rejection on 2026-08-12:

```text
lease: TASK-003-api-host-default-01-red-01; test_worker; attempt 1
contract digest: 7b3385f7597561443027ef5c1e4783300c0ca283f01e8d2bdeae4c6a70a3316b
receipt digest: f07836df71cbfef286a9ecc4010e256ebb316ffa9ad20b07026e1298e26a737b
terminal: closed-compliant; fresh; only config.unit.test.ts modified
runtime: intended TypeError because parseApiHost is absent; prior tests pass
strict check: intended missing-export boundary, but TS2724 rather than packet-required TS2305
semantic disposition: RED REJECTED because the decisive-result contract named one exact code
correction: attempt 2 changes no test and accepts TS2724 as the exact TypeScript 6 diagnostic
```

API-host-default accepted Red attempt 2 on 2026-08-12:

```text
lease: TASK-003-api-host-default-01-red-02; test_worker; attempt 2
contract digest: a1e53a6bca6f73412183d41a2c6650fc320ea8afa81f0abc0a8c816968760718
receipt digest: 1d400b41a6556e0231dbab8ae74ee27b4faab04e3989efb9be824dd096219abf
terminal: closed-compliant; fresh; endpoint changes 0
focused/root Red: only default-host test fails with parseApiHost TypeError;
                  five prior API/web tests pass
strict Red: exit 1 only TS2724 absent exported parseApiHost
frozen test SHA-256: A593AFB100B023D3B0EA69F2ED25860DE3E4C1A33CAD992BC15911FEFF0D0C02
semantic disposition: RED CONFIRMED
```

API-host-default accepted Green evidence on 2026-08-12:

```text
lease: TASK-003-api-host-default-01-green-01; code_worker; attempt 1
contract digest: 7dd2ec94af87ffaa453caf27e4e60b96b46653cd07a24837a223238b3a388a39
receipt digest: d828227ad3d07e164420b9cb567249926d9a2f34cb17916733239c554e59b4d8
terminal: closed-compliant; fresh; only config.ts modified
pre-edit reproduction: host runtime Red and strict TS2724
worker/primary Green: API 5/5; root unit 6/6; application 1/1; ordered root
                      test 0; typecheck 0; frozen test exact; diff check 0
semantic inspection: missing host returns exact loopback; defined-host policy remains absent
production SHA-256: B96EDF5B26567ECA1E64A810C4B8F72A2AB67695B314D54AD0B47F68CA24194B
Refactor: none needed or performed
```

API-host-defined-allowlist accepted Red evidence on 2026-08-12:

```text
lease: TASK-003-api-host-allowlist-01-red-01; test_worker; attempt 1
contract digest: 838f8f17448779ea058664bc1b7fe6561d7db1d0e9913fac1a9be6f609fbaa3f
receipt digest: f9a2b74074bf1bcd45d3fb519e28b9dbc960870ada4cb216aec39ca0b653794e
terminal: closed-compliant; fresh; only config.unit.test.ts modified
baseline: API 5/5; focused/root Red exit 1 only because 0.0.0.0 does not throw;
          explicit 127.0.0.1 and six prior API/web assertions pass; typecheck 0
frozen production: B96EDF5B26567ECA1E64A810C4B8F72A2AB67695B314D54AD0B47F68CA24194B
frozen test: 4D6F6BDDB8EAFF7C01F6BF4CC284FCD4818658AE4F89350B4EF5117244515B18
semantic disposition: RED CONFIRMED
```

API-host-defined-allowlist accepted Green evidence on 2026-08-12:

```text
lease: TASK-003-api-host-allowlist-01-green-01; code_worker; attempt 1
contract digest: ff514b558a3e4800a89222f3ec4adadddc3efe7ef0d2a5a2e78d865e543e28fd
receipt digest: 17407ddcbdb88d614d5d6b64dfe43a8829d73fdc33a16f5d7c24e0cd91aa722c
terminal: closed-compliant; fresh; only config.ts modified
pre-edit reproduction: invalid host no-throw Red; explicit loopback passes
worker/primary Green: API 6/6; root unit 7/7; application 1/1; ordered root
                      test 0; typecheck 0; frozen test exact; diff check 0
semantic inspection: undefined and exact loopback accepted; every other defined value
                     throws the exact stable diagnostic
production SHA-256: 58CA53966EC1B3A1CE350EA20DA6EF3DB3C7B2AC5AEEE8B7F8D2540D216C783F
Refactor: none needed or performed
```

Express dependency Setup evidence on 2026-08-12:

```text
lease: TASK-003-express-dependency-01-setup-01; code_worker; attempt 1
contract digest: 628a7e5fa31bc97198ac2ceaf9c6950a66be9285f80a8be2f501ae0ac4e89082
receipt digest: d95d775bc60c3ee8d55c7f86c9d1106cd681a0a6353a20fe5cc9941ae8c67b77
terminal: closed-compliant; fresh
changes: only apps/api/package.json and package-lock.json; forbidden/unleased 0
exact direct delta: express@5.2.1 production; @types/express@5.0.6 development
validation: install 0 after restricted-network retry; npm ci 0; direct report exact;
            unit 7/7; application 1/1; typecheck 0; sole lockfile; diff check 0
behavior: none; no HTTP source, test, registry, or script introduced
```

HTTP-liveness Red attempt-1 rejection on 2026-08-12:

```text
lease: TASK-003-api-healthz-01-red-01; test_worker; attempt 1
contract digest: 63615386ce9dccd764b91b108a9336964b43d08e604b74e233fc823f2df22c3c
receipt digest: dfab7a11efd11aa44f523c7c97d69a7cd12f859c4164de7fc6f070df972cd2b5
terminal: closed-compliant; fresh
changes: created app.application.test.ts and modified only API/root scripts and
         Vitest registry; forbidden/unleased 0
runtime: focused/root application exit 1 on absent ./app.js; web application and
         root unit 7/7 pass; no listener created
strict check: intended TS2307 plus unintended TS2591 for node:events because API
              tsconfig does not explicitly include installed Node ambient types
semantic disposition: RED REJECTED; test/registration retained but not frozen
correction: behavior-free API TypeScript Setup, then no-edit Red attempt 2
```

API Node ambient-type Setup evidence on 2026-08-12:

```text
lease: TASK-003-api-node-types-01-setup-01; code_worker; attempt 1
contract digest: 2ef67499a2d5bfce2aba625a98b61c49c890868f3a52d545983b10eaa38bbea4
receipt digest: 32d940a8788673b9971d7c5bea1f16a6b2ed73e5360cf0c9e125773a97dbd665
terminal: closed-compliant; fresh; only apps/api/tsconfig.json modified
change: explicit types ["node"] consumes existing root @types/node@24.13.3
before: strict check TS2591 node:events plus TS2307 absent app
after: application/runtime and strict check fail only for absent app; unit 7/7;
       web application 1/1; direct dependencies unchanged; diff check 0
behavior: none
```

HTTP-liveness accepted Red attempt 2 on 2026-08-12:

```text
lease: TASK-003-api-healthz-01-red-02; test_worker; attempt 2
contract digest: bcdd27571ad310620b3487da7618546e1bf3c018cf59d955bff95d28fd4559ce
receipt digest: b08bd1dcc8ba081f2a5745476431fd1f767f2d535f80f73852f2599de356171a
terminal: closed-compliant; fresh; endpoint changes 0
focused/root application: exit 1 only unresolved ./app.js; web application 1/1;
                          unit 7/7; no listener created
strict Red: exit 1 only TS2307 absent ./app.js
frozen test: 8BB2B93C427CF6BE09E9348C7E6EBD410AC3B38F5868F6DF95E057B04EDD03A7
frozen API manifest: 343199233EF28C4B2A6AF9CB07BA99418ABD301484C5F8A0C7AB4520B84DCFCC
frozen root manifest: 76073011F1186BBA117B05B71D7F7DFE379779005C70F065800A3A904922E721
frozen Vitest registry: B55F7D74330DCB8DAF7759FD1539866AF402F569C8A545F3522F76157DC8AEFB
semantic disposition: RED CONFIRMED
```

HTTP-liveness accepted Green evidence on 2026-08-12:

```text
lease: TASK-003-api-healthz-01-green-01; code_worker; attempt 1
contract digest: dd0dd2beec12ba105533a19ab43ee10e66381033f1c31ad155888ce389535e40
receipt digest: 75784a643aa7f4b72a3e0f4d9692348bda9bf22d10c7f6431680a0da8fca9f90
terminal: closed-compliant; fresh; created only apps/api/src/app.ts
pre-edit reproduction: focused/strict missing-app Red
worker/primary Green: direct HTTP API application 1/1; root application 2/2;
                      unit 7/7; ordered root test 0; typecheck 0; direct report and
                      all frozen hashes exact; diff check 0
HTTP evidence: status 200; content type application/json; exact body {"status":"ok"};
               owned ephemeral listener closed in finally
semantic inspection: createApp constructs without listening and owns only GET /healthz;
                     no database, Redis, GraphQL, domain, readiness, or CORS behavior
production SHA-256: 54B44831684B02D20A4700B4886FCB76EFA8569D71830CB40F3C216A79ECD04D
Refactor: none needed; application/listener separation already explicit
```

Native-smoke dependency Setup evidence on 2026-08-12:

```text
lease: TASK-003-native-smoke-dependencies-01-setup-01; code_worker; attempt 1
contract digest: 7058a0ffe0cf1ee5bb3b77acd83f8a741f3129174bd97145e6a2c62db9faa0a2
receipt digest: 2a44f374d90ecdbbb5ccc24df96052ab897650713c56e5e4c68e07c688f0d4bf
terminal: closed-compliant; fresh
changes: only root/web manifests and sole lockfile; forbidden/unleased 0
exact direct delta: root @playwright/test@1.61.1; web @vitejs/plugin-react@6.0.5
browser: Playwright 1.61.1; Chromium 149.0.7827.55 revision 1228 installed only;
         executable readback true in standard user cache, no repository artifact
validation: npm ci 0; direct report exact; unit 7/7; application 2/2; ordered
            current root test 0; typecheck 0; diff check 0
behavior/configuration: none
```

Native-smoke Red attempt-1 rejection on 2026-08-12:

```text
lease: TASK-003-native-smoke-01-red-01; test_worker; attempt 1
contract digest: 3c552718453363b8900d95f7ca067f367e40c88838ab4ade2470af24a3dcac28
receipt digest: 17c630583a00e419cf1580361143087b4d3281d448260f24cabc08a679582f91
terminal: closed-compliant; fresh
changes: Playwright config/test created; root manifest/tools tsconfig modified;
         forbidden/unleased 0
baseline: unit 7/7, application 2/2, typecheck 0; Chromium launch 0; both ports bindable
post-edit: unit/application green; typecheck exit 1 on Playwright DOM declaration names;
           smoke intentionally not run; both ports remain bindable
additional primary finding: webServer commands use Windows-only npm.cmd spelling rather
                            than the required cross-platform npm command
semantic disposition: RED REJECTED; test/registration not frozen
correction: behavior-free tools-lib Setup, then attempt 2 changes only command spelling
            and proves the intended absent-native-startup Red
```

Playwright DOM-declaration Setup evidence on 2026-08-12:

```text
lease: TASK-003-playwright-dom-types-01-setup-01; code_worker; attempt 1
contract digest: 27180b17e2eb9fe173012ac736791b0fd6ed8b07e0b853f7b78ac92787ab2efc
receipt digest: 5f95f77e15114889cb1f99ac24ac831f566282702005e2e22439b8aaf95c76f4
terminal: closed-compliant; fresh; only tsconfig.tools.json modified
change: DOM library added for registered Playwright declarations
before: strict check exit 1 only on Playwright missing DOM names
after: strict check 0; unit 7/7; application 2/2; direct report unchanged;
       Playwright config/test/root-manifest hashes exact; diff check 0
behavior: none; smoke deliberately not run before Red correction
```

Native-smoke Red attempt-2 packet rejection on 2026-08-12:

```text
lease: TASK-003-native-smoke-01-red-02; test_worker; attempt 2
contract digest: b462130faf24f58bfc30be2ae601fd3567a71632ae8389cda14d75617057c872
receipt digest: a9f9bd8da5d937c75ca72a783370d8fb6134c668147ade0953e328dcf6821ec8
terminal: closed-compliant; fresh; endpoint changes 0
rejection: semantic packet omitted Allowed directory roots and Forbidden directory
           roots instead of explicitly setting each to None
commands/edits: none beyond read-only packet/hash/status inspection
disposition: assignment invalid; lease not reused or redefined; a new cycle carries
             the portable-command correction and intended startup Red
```

Native-smoke accepted Red evidence on 2026-08-12:

```text
cycle/lease: TASK-003-native-smoke-portable-red-01 /
             TASK-003-native-smoke-portable-red-01-red-01; test_worker; attempt 1
contract digest: 6c0c97694e0f7eae155da916a875d63851daa718a4688fe51fbb6ad8f010475d
receipt digest: 0a522ee5ec9723e17735e00e5f1563cd41497ca6298da91b13f055a1d79d73f8
terminal: closed-compliant; fresh; only playwright.config.ts modified
change: both webServer commands now use cross-platform npm spelling
pre/post boundary: Playwright 1.61.1 and Chromium 149.0.7827.55 available;
                   ports 4173/4174 bindable before and after; no listener leak
focused/root Red: exit 1 only missing web workspace start:smoke, webServer exit 1;
                  smoke test body does not execute
unaffected checks: typecheck 0; unit 7/7; application 2/2; root test visibly reaches
                   smoke only after unit/application pass; frozen hashes exact
frozen config: 5F094B83404122A9F51F5143DA7303AC300D0B1C5FBF266BF3F9429BA63A193A
frozen test: C755737BB8CDE28FD062BE32C9870025A5F721DF2F3EC3FC746F097DFD780D3F
frozen tools/root: 011617888BDA6A55F9FEC049750335CC00239246A591FCD9791CA6FB01C279BB /
                   6E98485AE1CF9C095E7F918C6E74B2293E2635E40AEAC0B55627A974EE3FC25E
semantic disposition: RED CONFIRMED
```

Native-smoke rejected Green attempt-1 evidence on 2026-08-12:

```text
lease: TASK-003-native-smoke-portable-red-01-green-01; code_worker; attempt 1
contract digest: bc312150185001f4a1eedc70a636f59df01084914cd5733c54a6930368ada186
receipt digest: b92b1a496e792d5a518ef52925515b73dc6183aee0846bb6cf23b6b11697f861
terminal: closed-violated; frozen hashes exact; diff check 0
leased changes: web/API native build and start entries across ten allowed paths
unexpected path: apps/web/dist-server/server.js, generated and initially unignored
unaffected checks: independent web/API builds 0; typecheck 0; unit 7/7; application 2/2
smoke result: heading assertion timed out after 5 seconds; API assertion not reached;
              command did not terminate inside the 30-second execution boundary
leaked listeners: 127.0.0.1:4173 PID 37028; 127.0.0.1:4174 PID 19440
cleanup: coordinator task-killed only PIDs 37028 and 19440; both ports then bindable
retained trace: document request returned index.html; JavaScript asset request also returned
                status 200 with text/html because the containment prefix doubled the final
                Windows separator and rejected every valid child asset path
control correction: added exact dist-server/ ignore rule between leases
semantic disposition: GREEN REJECTED; smoke test/config remain frozen; no Refactor accepted
```

Native-smoke accepted Green attempt-2 evidence on 2026-08-12:

```text
lease: TASK-003-native-smoke-portable-red-01-green-02; code_worker; attempt 2
contract digest: f5cd39c990743fe1b1b37d5ca79a544c3c8943b0cbb9f674aec7168e92fe021d
receipt digest: a7d3773c891b89b7b2c054c0229b5962718d8db6661261a4baa527beabb3f21a
terminal: closed-compliant; fresh; only apps/web/server.ts modified
change: resolve(fileURLToPath(...)) normalizes webRoot before descendant containment
worker checks: web/API build 0; typecheck 0; unit 7/7; application 2/2;
               frozen hashes exact; pre/post ports bindable
restricted-worker smoke: sole Chromium test printed without assertion failure or failure
                         artifact, then Playwright teardown lacked Windows taskkill permission;
                         worker interrupted only owned session 72350 and ports rebound
primary permitted smoke: exit 0; 1/1 passed in 7.0 seconds, command 10.2 seconds
primary root test: exit 0 in unit 7/7 -> application 2/2 -> smoke 1/1 order
primary final: typecheck 0; frozen hashes exact; diff check 0; ports 4173/4174 bindable
production SHA-256: 9DFAB9F93F45B552AB60226B0911D6D3E0E1496332A3DF1DF9B5057838E3826C
Refactor: none needed or performed
semantic disposition: GREEN CONFIRMED; native happy path only
```

Tailwind-output accepted declarative Setup evidence on 2026-08-12:

```text
lease: TASK-003-tailwind-output-01-setup-02; code_worker; attempt 2
contract digest: 66efbaf4cfd7e8d3ca3fed91f0d0a095b82f6735cb37b68341579ba0e00c5b9e
receipt digest: 27823b6e9e4bad0c85a90eb77f45de1ec258487810e2966f35cb71a17458176a
terminal: closed-compliant; seven leased endpoints; forbidden/unleased 0
configuration: Tailwind Vite plugin; one @import stylesheet; browser-entry import;
               shell exact className="text-3xl"; strict Node/tsx output validator
web build: exit 0; assets/index-DTXwErQW.css; 4,364 bytes
structural proof: manifest declares CSS; built HTML references it; CSS contains .text-3xl;
                  current shell source consumes exact token
validator: exit 0; "Tailwind output verified: assets/index-DTXwErQW.css is referenced,
           non-empty, and contains .text-3xl consumed by the shell."
worker: typecheck 0; unit 7/7; application 2/2; direct report/frozen/ignore/diff green
primary: root test 0 in unit 7/7 -> application 2/2 -> smoke 1/1 order;
         ports 4173/4174 bindable; diff check 0
claim boundary: toolchain consumption only; no visual/responsive/SPEC/AC claim
semantic disposition: SETUP VERIFIED
```

Compose configuration Setup evidence on 2026-08-12:

```text
lease: TASK-003-compose-infrastructure-01-setup-01; code_worker; attempt 1
contract digest: ccfee2e4cfea548b24f19394282893c5b06afafe7e3d0d6fb88d578b719d1297
receipt digest: 61f90c20e9409dc5631f6b436ec77831e4461b85ee5c5f8be363554fa0ff06c4
terminal: closed-compliant; created only compose.yaml
compose SHA-256: D4525A509700E3EFA1F3E2413E8558B30E6A106135226BD806D3199C9BA9A1CC
structure: exactly postgres:18.4-alpine and redis:8.8.1-alpine; loopback-only
           configurable 5432/6379; pg_isready/redis-cli health checks; two volumes;
           local defaults match .env.example; no app/build/project/migration/schema
docker config: exit 1 only CommandNotFoundException; Docker/Podman/nerdctl absent
unaffected checks: typecheck 0; unit 7/7; application 2/2; direct/frozen/diff green
runtime disposition: NOT RUN; no resources created; config/health/ps/down remain blocked
semantic disposition: CONFIG CREATED / RUNTIME BLOCKED
```

Root operational Setup and runtime evidence on 2026-08-12:

```text
lease: TASK-003-root-operations-01-setup-01; code_worker; attempt 1
contract digest: 3d2490b1b7d5107b9fa5aa74f632e27060551adba88067e37439c466b517be94
receipt digest: c8eae72d745c6bd6a8eca7882bb7a28df6c1385979b8206863afadce1cf2b0bc
terminal: closed-compliant; only root/web/API manifests and lockfile changed
dependency: exact root concurrently@10.0.4; no other direct delta
commands: root build/start/browser:install/infra:config/up/ps/down/dev:apps/dev;
          web dev 127.0.0.1:5173 strict; API dev tsx watch on 127.0.0.1:3000
worker: npm install/ci/report/typecheck/unit 7/7/application 2/2/build/Tailwind/diff 0;
        infra:config and dev exit 1 only missing docker, apps never start, ports free
root start: web 4173 + API 3000 foreground; Chromium exact heading visible;
            HTTP 200 and exact {"status":"ok"}; owned interruption; ports rebound
web dev: Chromium exact heading visible at 5173; owned interruption; port rebound
API dev: HTTP 200 and exact {"status":"ok"} at 3000; owned interruption; port rebound
root test: exit 0 in unit 7/7 -> application 2/2 -> smoke 1/1 order;
           ports 4173/4174 rebound; typecheck/Tailwind/diff green
infrastructure lifecycle: detached services retained after app exit; explicit infra:down
                          removes named rick-and-morty-dev project and volumes
runtime boundary: root dev cannot pass until Docker is externally available
semantic disposition: SETUP AND APP PROCESS INTERFACES VERIFIED
```

Final locally available integrated verification on 2026-08-12:

```text
immutable install: npm ci exit 0; 244 packages; 0 vulnerabilities
direct report: exact DPL-DEC-023 allowlist; one package-lock.json
browser: playwright install chromium exit 0; no repository browser artifact
compiler/tests: typecheck 0; unit 7/7; application 2/2;
                root test 0 in unit -> application -> smoke 1/1 order
builds: root 0; independent web 0; independent API 0
Tailwind: validator 0; referenced non-empty index-DTXwErQW.css contains .text-3xl
compiled starts: web HTTP 200 at 4173; API HTTP 200 at 3000 with exact
                 {"status":"ok"}; only owned sessions stopped; ports rebound
lifecycle: final post-ci Windows run 0; six named PASS lines; 6/6; ports rebound
negative/relevance: no integration/migration/gate-blocked dependency or source,
                    upstream call, mock/snapshot, focused/skipped test, empty project,
                    or JavaScript source; every test/fixture/helper has a current consumer
documentation: 45 Markdown/41 requirements/1 authorization/17 tasks/17 SPEC/
               20 HS/119 scenarios pass; 14 ADR/38 requirements pass with known NFR-006 warning
diff: git diff --check 0; expected source/config/docs only; no stage/commit/push/PR
Docker: config/up/ps/down/root dev each exit 1 before resources because docker is absent
external listener: unrelated postgres PID 6588 owns 5432; not touched
CI: no supplied route found; same-command runtime evidence unavailable
clean checkout: HEAD 0e6c956 contains no TASK-003 executable artifact; commit withheld
acceptance: AC-001 through AC-012 remain Fail; TASK-003 foundation is not product evidence
semantic disposition: LOCALLY VERIFIED / TASK CLOSURE BLOCKED BY EXTERNAL JOINS
```

Post-review Docker and root-development verification on 2026-08-13 UTC:

```text
native PostgreSQL: 18.1; automatic service running; 127.0.0.1:5432 accepting;
                   preserved without stop, reconfiguration, or attachment
Docker: Desktop 4.86.0; Engine 29.7.2; Compose 5.3.1; WSL default version 2
verification ports: POSTGRES_PORT=55432; REDIS_PORT=56379; both initially free
unique Compose project: config 0; up --wait 0; both services healthy;
                        pg_isready accepting; Redis PONG; ps exact;
                        down --volumes 0; empty project afterward
exact root scripts: infra:config 0; infra:up 0; infra:ps 0; infra:down 0
root dev: npm run dev started healthy rick-and-morty-dev infrastructure, then
          foreground Vite 8.1.5 on 5173 and API on 3000
HTTP: web 200 with Rick and Morty Explorer source; API 200 with exact
      {"status":"ok"} and application/json content type
ownership: foreground session interrupted exactly; detached services remained healthy;
           explicit infra-equivalent down --volumes removed only named resources
cleanup: both temporary projects empty; their networks and volumes removed;
         ports 3000/5173/55432/56379 bindable; native 5432 still accepting
repository delta: documentation evidence only; no source/configuration change
remaining joins: supplied same-command CI runtime; committed clean-checkout snapshot
semantic disposition: DOCKER/ROOT-DEV JOIN PASS / TASK CLOSURE STILL IN PROGRESS
```

Worker-flow revision evidence checkpoint on 2026-08-12:

```text
initial verdict: REVISE; one Major for missing PASS WITH FOLLOW-UPS routing
correction: Mermaid, prose, registry policy, and copy-paste prompt now disposition
            every follow-up and re-review any DoD/gate/validation/documentation conflict
reviewed plan SHA-256: 43BD0E3DA5853BC8DC29FFA18490ED601F591F1AFE2134271DBE20FC89C1C5E3
reviewed raw working-tree patch SHA-256: 91F10449A0B4F4D5C42AF5E568B88C3085779CDAA93437A1371DCCCC8C75E3
correction-cycle verdict: PASS; no Blocker, Major, or Minor
validation: five agent TOMLs, documentation and ADR validators, diff/whitespace,
            verdict routing, stale wording, pending state, and negative artifacts passed
authority state: TASK-003 Pending/unstarted; no architecture or gate change
implementation evidence: none
```

Automatic write-lease guard revision evidence checkpoint on 2026-08-12:

```text
reviewed 15-path packet SHA-256: 5879C3C8A59C98375CACC9568FD350A55F854A800A114875139D4B600A5628A0
lease_guard.py SHA-256: 04B83DEBC4DCE4CF8C662925DAE5688CFDD581DC7E11981D11528F100BA6C3BA
verdict: PASS; no Blocker, Major, or Minor
Windows PowerShell guard self-test: pass; 25/25 isolated temporary-repository checks
validation: documentation and ADR validators, five agent TOMLs, hook JSON, Python AST,
            CLI help, diff/whitespace, exact path set, and packet identity passed
authority state: TASK-003 Pending/unstarted; plan ready for separate execution instruction
implementation evidence: workflow tooling only; no product or acceptance evidence
```

Worker Assignment Packet v1 revision evidence checkpoint on 2026-08-12:

```text
initial reviewed 12-path packet SHA-256: 96580D8359257BD9A71DB68CE544714AB39D2907EB42C08AE5F81C2A13CFE783
initial verdict: REVISE; one Minor metrics-schema projection mismatch
correction: spawned agent maps to agent_id and packet role maps to agent_type;
            lease owner and correction lineage remain in packet/guard/handoff/ExecPlan
final reviewed 12-path packet SHA-256: FE9711A5743AD995792EF8447BEACC1AFC0F261D3EAC997D42B1065A6D49EA22
reviewed plan SHA-256: 26C1AF7883DBFCF89D4A998B1E068CF2D076A71425846D420C464E6315DEAAD1
correction-cycle verdict: PASS; no Blocker, Major, or Minor
validation: documentation and ADR validators, five agent TOMLs, hook JSON, metrics
            schema and self-test, Windows guard 25/25, diff, exact path set, and hashes passed
authority state: TASK-003 Pending/unstarted; plan ready for separate execution instruction
implementation evidence: workflow tooling only; no product or acceptance evidence
```

The later current-state audit clarified that the historical line above grouped two different projections: lease owner is stored in the guard contract, while correction lineage has always remained only in the packet, handoff, ExecPlan evidence, and reviewer checks. The historical hashes and verdict are preserved; the current workflow wording now states the boundary exactly.

Current-state correction checkpoint on 2026-08-12:

```text
pre-correction current 12-path packet SHA-256: BCC76388B327067DA5DE4DCA65168693BB8569C1B83B41829E8B60060294D342
pre-correction current plan SHA-256: 7E84B4A173AC186EBB7784CA898C1F1C0E39AF94B1CE87E5F0A363538F1164A8
fresh current-state verdict: REVISE
findings: Green correction bypassed a fresh attempt-2 lease;
          Refactor lacked a coordinator semantic acceptance barrier;
          correction lineage was incorrectly attributed to the guard contract;
          guard start accepted invalid attempts and worker/phase combinations
guard Red: native Windows self-test exited 3 because attempt 0 returned the old
           positive-integer error instead of the new exact-domain result
guard Green: native Windows self-test passed 26/26 isolated checks
current correction review: pending
authority state: TASK-003 Pending/unstarted; plan not ready for execution
implementation evidence: workflow tooling only; no product or acceptance evidence
```

Transverse correction checkpoint on 2026-08-12:

```text
reviewed 13-path packet SHA-256: 63AC77142BB6D289A2E1669D1C7D9425C3EF6B3960946F8B6B0006B31C9CBB93
reviewed plan SHA-256: E0BE102299EDF26E6DDCC5B6AEEA25C4778D635E2846AE943B5862B9DE9E50EA
reviewed guard SHA-256: BF5B547E8E2C850692E10122994748ADA716C6FD14DF6AC1ADD732684CE3C6CA
transverse verdict: REVISE
findings: Setup and Red correction routes did not locally require fresh attempt-2 state;
          final-review REVISE lacked a per-assignment exhaustion decision;
          delegated evidence combined mechanical and semantic acceptance
post-flow-fix pre-evidence packet SHA-256: A5D5C30CF28F7D162635957FCE911DEFAE14F695DBB3C4BB2BD603384A75156D
post-flow-fix workflow SHA-256: FAB398411A3618D8DDA63493F65CF85787B5E2717B34F6067A64F92B70E97C49
current correction review: pending
authority state: TASK-003 Pending/unstarted; plan not ready for execution
implementation evidence: workflow tooling only; no product or acceptance evidence
```

The fresh review of the documented post-flow-fix packet `20730F61A38F6064ADF8813E5AFFD1D69CDE031BF590A3E987FB265E53C2A26F` found one remaining diagram omission before a final verdict: the attempt-2 Setup node created the packet and lease but did not explicitly spawn `code_worker` before the receipt check. The node now includes that spawn; the reviewed packet remains point-in-time `REVISE` evidence and the corrected current state requires another complete fresh review.

The next fresh audit of packet `33EBA111702C10665A0D5752928B849F5A0B4CFEB9AD7C4D4ACA635A90628C3F` found the same explicit-spawn omission in the attempt-2 Red and final-review correction nodes. A systematic assignment-edge scan also identified the equivalent ambiguity in initial Green and delegated evidence. All four nodes now state the complete packet, guarded lease, and worker-spawn sequence. That reviewed packet is preserved as point-in-time `REVISE` evidence; the normalized current state requires another complete fresh review.

The adversarial scan of normalized packet `7456C6839E9258D5FDDA70C39FCD4F3129A8058A84D97F2C9B4958E8B290952D` found one remaining unsafe re-entry: a test-contract concern after Green returned directly to the initial test assignment in the existing cycle. The workflow now distinguishes an unchanged-test production defect, which uses the bounded Green correction, from an authorized material test correction, which reconciles rejected Green state, ends the old cycle, creates a fresh cycle ID, and returns to behavior selection. The reviewed packet remains point-in-time `REVISE` evidence and the corrected current state requires complete fresh review.

Complete packet and 67-edge review of packet `BBD03CF68AE430A7342C79212BD475A1B610D4A03A6D23903A37BCC03CA784E9` returned `REVISE`. It found that Green, Refactor, and final-review correction nodes omitted local prior-state reconciliation; Setup, Green, and Refactor semantic gates were weaker than their prose; normal next-slice routing did not create a fresh cycle ID; the global final-review correction limit was absent from the graph; compressed Setup, Green, and delegated-evidence nodes skipped explicit worker execution; and material-test reclassification did not require an accepted old-cycle state. The current graph and matching packet, prompt, worker, reviewer, guard-guide, and task-plan contracts close those six findings. The BBD03C packet remains point-in-time review evidence; the current revision requires complete fresh review.

Parallel review of expanded packet `7C55B4AFAB1F865B7DC6BDD2AEDF4AE46944E4A825594CE4CA5013D8D9E52648`, plan `3DE31513D8FF430C911BB4D56D76FA1A401DC373B9069AF1A5886CC7DBB727D4`, guard `40C7D5343A11D536742F2F10840B282AD1A79E2E504CB5D581BE83AD9698DC41`, and workflow `A3FC55301BAEB57C65DBAD71D3BA41018C41B9990AB628CC094A7E3B03C3912B` produced an integral point-in-time `PASS`, but the authoritative combined disposition remains `REVISE`: the edge audit found Setup could precede workflow/setup-cycle identity, Green conflict prose could classify before terminal close, and the guard mini-flow routed every violation to correction; the coherence audit found ambiguous packet/lease correction wording and impossible literal `same assignment identity` wording. The current revision fixes those five findings and requires another complete review.

Fresh review of 14-path packet `3882498D1260793122052BACA71EF28843FF395C8FC81E0F3410F9B5A4AC88B6` returned `REVISE`. The graph could schedule only one Setup objective, final-review correction returned directly to the reviewer without refreshing full closure validation, and delegated evidence could process only one producer record without a deterministic bounded correction route. The current selector, evidence queue, and post-correction validation loop close those findings. The reviewed hash remains point-in-time evidence; the corrected state remains review-pending until complete fresh review passes.

Review of corrected packet `146BD7AC38E0533E1ED55A9A3109B56C22BC81494206DCBBC42DBE9F6FA01D0B`, workflow `8E13F4C9F1ED996DFCE1CBA56EEF446C74E6DDE39C7FC2650FD06EE2F491936A`, plan `F501BB96BADD85C9144FAEE93C3E08E44DA78062CE27FC24FB3A03847E266CFE`, and unchanged guard `40C7D5343A11D536742F2F10840B282AD1A79E2E504CB5D581BE83AD9698DC41` returned `REVISE`. The accepted final-review correction path did not durably record its new packet, receipt, handoff, and acceptance before refreshed closure. A coherence audit also proved that an already accepted Red or Green cannot legally use generic attempt 2 because its test is frozen and integrated Green no longer reproduces Red. The current graph queues correction evidence with a direct refreshed-closure return target and routes behavioral or accepted-test findings through a new attempt-1 behavior cycle while preserving the global review count. This reviewed packet remains historical; the corrected state still requires complete fresh review.

Focused review of packet `53A02582FBE9490D8E5CE4A80E111614808B0588DB16DF90B58BB6180D7A30ED`, workflow `FEAB306EEB561721D5B46AAA6569357F7FE7AEEAC54D645C35794E9ECFEAEAF1`, plan `9A473D3CD4D3BD48C30B6260FAA98791C882864460B617F2F76C60E06F3BB26B`, DPL `766666BDFFC8CBD0F3C93D4F2FFA452EE0048234A31FF4D2E3CEDDD7BF9CB614`, and unchanged guard returned a provisional integral `PASS` but specific graph/coherence review identified one remaining deterministic-evidence defect: a reviewer-directed fresh behavior cycle did not explicitly carry its `refreshed closure` return target or a durable record connecting the finding and replaced cycle to the fresh cycle and consumed global count. The current graph now sets both before Red and requires the lineage record in that cycle's evidence queue. The reviewed packet remains point-in-time evidence; the corrected state requires complete fresh review.

Complete review of packet `C173B64DAAA48EA138D17DA92769EA2470E6B812D05BA7C0EA9B025962507FCD`, workflow `5980DD5769797C70923D8F85DC220546E86844639E4212A1991E142297F5FA24`, plan `09E0EF114BB1C33B07265FE35D82718F408B571814A1ED9DF0BD9973465911C1`, DPL `251D0C35A00CEA2ABFEE021DDC3046083CF4F54A320BDEA5BDF7A8331DB09D05`, and unchanged guard returned `REVISE`. Within reviewer-directed fresh behavior remediation, a later material-test replacement could route through the ordinary cycle creator and overwrite its refreshed-closure target and lineage; the Green semantic gate omitted an explicit unsupported/blocked exit; and an attempt-2 correction whose phase was already Evidence could send its mandatory record through another Evidence lease. The current graph parameterizes material-test replacement, permits it at most once for the same finding/objective/authority while preserving count/target and extending lineage, adds the Green stop edge, and classifies evidence metadata, correction records, and remediation lineage as coordinator-only queue items. The reviewed packet remains historical; fresh complete review of the current state is required.

Expected owned artifact families after execution, subject to the exact Milestone 1 DPL records, are:

- root: `package.json`, the selected workspace metadata and single lockfile, runtime pin, `tsconfig.base.json`, root TypeScript/test configuration, `vitest.config.ts`, `playwright.config.ts`, `compose.yaml`, `.env.example`, and targeted additions to `.gitignore`;
- web: `apps/web/package.json`, build and strict TypeScript configuration, `index.html`, a minimal `src/main.tsx`, semantic shell component, BrowserRouter-owned application composition, Tailwind entry, jsdom setup, one focused shell unit test, and one distinct routed application test;
- API: `apps/api/package.json`, no-emit/build configuration, runtime configuration parser, `src/app.ts`, `src/server.ts`, focused configuration tests, and one public `/healthz` application test;
- shared: `packages/shared/package.json` and boundary configuration, plus source only when a stable operational contract has a real consumer;
- smoke: one owned Playwright test under a clearly named `tests/smoke/` boundary and one clearly consumed lifecycle/port helper only after its triggers are recorded;
- documentation: this living plan, plan index, canonical TASK-003 record, root current status and command navigation, execution DPL/progress records, and only other owners materially changed by actual implementation.

Append short evidence here as work proceeds. At minimum retain: tool/version compatibility sources and date; allocated DPL IDs; each assignment identity; lease ID, digest, and terminal result; accepted Red, Green, and post-Refactor commands and decisive output; changed paths; project registry listing; clean-install/build/test transcripts; direct HTTP status/body; Playwright report paths; lifecycle and port-rebind results; Compose health/teardown output; negative-scope and relevance-search results; documentation validators; diff checks; and independent-review verdicts. Keep secrets, ignored guard runtime records, full dependency logs, browser binaries, and disposable generated output out of this document and Git.


## Interfaces and Dependencies


The completed TASK-003 public operational interfaces must be:

- web shell: a real React 18 browser entry with an accessible level-one `Rick and Morty Explorer` heading, BrowserRouter ownership at the application edge, and a consumed Tailwind stylesheet; it performs no data or liveness request;
- API composition: an exported Express application factory that can be exercised without binding a fixed port;
- API process: a separate entry that validates consumed environment input, listens on the recorded host/port, reports actionable startup failure without secrets, and remains foreground-owned;
- liveness: `GET /healthz` returns HTTP 200 and JSON `{ "status": "ok" }` with no readiness, database, Redis, GraphQL, domain, image, or upstream dependency;
- root development: one documented workflow starts the web and API through transparent workspace scripts and PostgreSQL/Redis through root Compose, while separate scoped infrastructure commands retain diagnostic and teardown control;
- package-local web `test:unit` and `test:application`; package-local API `test:unit` only when configuration behavior exists; package-local API `test:application`; root `typecheck`, `test:unit`, `test:application`, `test:smoke`, `test`, `build`, `dev`, independent workspace `build`/production `start`, Tailwind build-output validation, Chromium install, scoped infrastructure, and the recorded smoke-lifecycle command;
- root `test` at this milestone: registered unit, then application, then smoke. There is no `test:integration` interface until TASK-004 owns it.

The accepted dependency categories are:

- React 18, React DOM, React Router DOM, and Tailwind CSS for the consumed web shell;
- Express for the API and liveness composition;
- TypeScript with strict ESM configurations for all application and test source;
- the stable Vitest line available at execution, jsdom, React Testing Library, and DOM matchers for non-browser tests;
- Playwright Test with Chromium only for the real-browser smoke;
- PostgreSQL and Redis official container images selected and documented for independent local infrastructure;
- one package manager, web build tool, root foreground process orchestrator, and exact supported versions selected from current primary evidence and recorded through DPL before use. Every direct dependency must also appear in the DPL-recorded workspace allowlist with a current TASK-003 consumer.

Do not add GraphQL client/server tooling, Sequelize, Redis clients, a migration tool, public-API adapter, image tooling, Storybook, Cucumber, another test runner, broad browser dependencies, or an embedded database/cache. A new direct dependency needs a current TASK-003 consumer, must appear in the recorded per-workspace allowlist before installation, and must remain within the accepted boundaries.

Before TASK-003 closure, the owner/authority join for ADR-0011 must be explicit: either the same repository lifecycle command has run successfully in an already supplied continuous-integration environment, or the accepted authority has been fully reconciled through its owner/ADR workflow and every affected current owner, task contract, validation rule, and this living plan has been synchronized to that completed outcome. Authorization or initiation of a reconciliation workflow is not sufficient. A local simulation, a CI configuration file without a run, an agent's prediction, or a proposed-but-unaccepted ADR is not runtime or reconciliation evidence.


## Revision Note


- 2026-08-11 / Codex primary thread: Created the initial active TASK-003 ExecPlan from the clean documentation-only baseline. Registration added ADR-0011 to the task's effective authority, preserved TASK-003 as `Pending`, kept integration/GraphQL/migration/image work out of scope, and recorded the unresolved Windows/continuous-integration cleanup evidence join as a truthful closure boundary. Later notes below record review-driven refinement of the initial TDD decomposition.
- 2026-08-11 / Codex primary thread: Recorded the passing registration validators, narrowed negative implementation searches so the intentional Compose Redis service is not mistaken for a Redis client, and made ADR-0014's carried-forward single root development workflow explicit while preserving the smoke's infrastructure independence.
- 2026-08-11 / Codex primary thread: Corrected a fresh independent review Major by removing BrowserRouter and Tailwind work from the native-smoke Green. Routed composition received a distinct jsdom application cycle; the first Tailwind correction attempted a separate Chromium computed-style cycle, which the later final-state correction below replaces.
- 2026-08-11 / Codex primary thread: Corrected a second fresh-review Major by requiring an exact DPL-recorded direct-dependency allowlist and report, then splitting known forbidden-family verification into an all-workspace manifest check and a broad source/test token search. This closes the prior false-pass path for unanticipated client/cache packages and direct, side-effect, dynamic, or require-style GraphQL, Sequelize, Umzug, or Redis-client additions.
- 2026-08-11 / Codex primary thread: Corrected final-state review findings by removing Tailwind assertions from the ADR-0011 smoke and requiring a dedicated automated production-build/output validation for the declarative Tailwind integration. Also closed a false task-completion path by requiring any alternative to current CI runtime evidence to be a completed, accepted, and fully synchronized authority reconciliation rather than mere authorization to begin that workflow.
- 2026-08-11 / Codex primary thread: Recorded fresh independent final `PASS` for the corrected complete registration tree at reviewed plan SHA-256 `4AEEE0B1F0FED6EAA65CF6B36CF90D585F896B3BB52CAB69182F12827D7C5156`, after two provisional Majors plus later smoke-scope and closure-wording findings were corrected and with no open Blocker, Major, or Minor. This evidence-only reconciliation leaves TASK-003 `Pending` and creates no implementation claim.
- 2026-08-12 / Codex primary thread: Materially revised the still-unstarted plan to adopt DPL-DEC-014 and the project-scoped `test_worker`/`code_worker` contracts. Added task-local serial leases, path families, Red acceptance and frozen-test barriers, bounded correction and re-entry, evidence ownership, and fresh integrated review requirements. The prior reviewed hash remains historical; this revision requires a new hash and verdict before the plan is again marked ready to execute.
- 2026-08-12 / Codex primary thread: Recorded complete fresh correction-cycle `PASS` for reviewed plan SHA-256 `43BD0E3DA5853BC8DC29FFA18490ED601F591F1AFE2134271DBE20FC89C1C5E3` and raw working-tree patch SHA-256 `91F10449A0B4F4D5C42AF5E568B88C3085779CDAA93437A1371DCCCC8C75E3`. The initial review's only Major was corrected by defining deterministic `PASS WITH FOLLOW-UPS` disposition and re-review semantics; no finding remains. This reconciliation returns the plan to ready-to-execute without starting TASK-003 or creating implementation evidence.
- 2026-08-12 / Codex primary thread: Materially revised the still-unstarted worker contract to require automatic coordinator-owned baseline capture, pinned contract digests, one active lease per worktree, and terminal compliant receipts before every handoff barrier. This enforcement revision changes no product scope, task state, gate, accepted architecture, or implementation evidence; the prior reviewed hashes remain historical, and complete fresh review is required before the plan is again ready to execute.
- 2026-08-12 / Codex primary thread: Recorded complete fresh independent `PASS` for the automatic-lease revision at reviewed 15-path packet SHA-256 `5879C3C8A59C98375CACC9568FD350A55F854A800A114875139D4B600A5628A0`, with 25/25 isolated Windows guard checks and no open finding. This bounded evidence reconciliation returns the plan to ready-to-execute while preserving TASK-003 as `Pending` and unstarted.
- 2026-08-12 / Codex primary thread: Materially revised the still-unstarted assignment contract under DPL-DEC-017 to require the canonical minimum-but-extensible `Worker Assignment Packet v1`, exact packet-to-guard projection matching, full handoff identity, and fresh review. The primary made this bounded workflow bootstrap edit directly because the worker contract itself was changing while TASK-003 remains `Pending` and the worker agents correctly require an `In progress` task before writing. The changed policy and plan paths, structural validation, guard regression check, and independent verdict are recorded in the execution log; prior review hashes remain historical, and this revision is not ready until the fresh review is reconciled.
- 2026-08-12 / Codex primary thread: Recorded complete fresh correction-cycle `PASS` for the assignment-packet revision at reviewed 12-path packet SHA-256 `FE9711A5743AD995792EF8447BEACC1AFC0F261D3EAC997D42B1065A6D49EA22` and plan SHA-256 `26C1AF7883DBFCF89D4A998B1E068CF2D076A71425846D420C464E6315DEAAD1`. The initial review's only Minor was corrected by aligning packet identity with the metrics CLI projection; no finding remains. This evidence reconciliation returns the plan to ready-to-execute while TASK-003 remains `Pending` and unstarted.
- 2026-08-12 / Codex primary thread: A fresh review of the later current tree returned `REVISE` because the Mermaid could reuse a terminal Green lease and could advance from Refactor on guard compliance without semantic acceptance. A supplemental contract audit also found that correction lineage was attributed to a guard schema that did not store it and that the guard accepted invalid attempt and role/phase identities. Corrected all four defects, preserved the earlier hashes and verdicts as point-in-time history, and moved the plan back to review-pending. The primary made this bounded edit directly because it changes the worker-assignment control itself while TASK-003 remains `Pending`; no product behavior or acceptance evidence was added.
- 2026-08-12 / Codex primary thread: Corrected the subsequent transverse control-flow review findings. Setup and Red now have explicit attempt-2 correction nodes and operational instructions; delegated evidence has separate terminal-compliance and coordinator-acceptance barriers; and final-review findings may enter attempt 2 only with unchanged assignment identity and unused budget, otherwise the flow stops for reclassification. This remains a workflow-policy edit with no TASK-003 start or product evidence, and the complete current state still requires fresh review.
- 2026-08-12 / Codex primary thread: Corrected the fresh review's remaining Setup-diagram omission by making the attempt-2 node explicitly build the packet, start its guarded lease, and spawn `code_worker` before terminal closure. The reviewed packet hash is preserved as point-in-time `REVISE` evidence; no task, product, gate, or acceptance state changed.
- 2026-08-12 / Codex primary thread: Normalized the remaining assignment edges after fresh review found that attempt-2 Red and final-review corrections did not explicitly spawn their responsible workers. Initial Green and delegated evidence received the same explicit packet, guarded-lease, and spawn wording so no diagram edge can authorize work or closure without a worker launch. The change remains workflow-only and awaits complete fresh review.
- 2026-08-12 / Codex primary thread: Removed the normalized flow's final direct frozen-test re-entry. A material test concern discovered after Green now ends the current cycle only after rejected-Green reconciliation, then obtains a fresh cycle ID and new attempt-1 Red assignment; an unchanged-test production defect remains a bounded Green correction. This preserves TDD and lease identity without changing TASK-003 or product state.
- 2026-08-12 / Codex primary thread: Added a hostile stored-contract fixture to the existing assignment-identity self-test group. It recomputes the tamper-evident digest after changing a valid contract to attempt 3, proving that loaded-contract semantic validation, not only digest validation or `start` input validation, fails closed. Native Windows PowerShell retains a 26/26 result.
- 2026-08-12 / Codex primary thread: Hardened the new post-Green fresh-cycle route so an unchanged-test production defect cannot bypass an exhausted correction budget and a material test correction cannot begin a new cycle while any old-cycle write remains necessary or unresolved. This is conservative workflow control and changes no product state.
- 2026-08-12 / Codex primary thread: Replaced the compressed Mermaid after complete packet and 67-edge review. Assignment phases now expose draft, guard/digest, worker action, terminal closure, and distinct semantic acceptance; every correction begins from terminal coordinator-reconciled state; every slice gets a fresh cycle ID; and final review carries both local and global correction limits. Mirrored the barriers in the prompt, worker and reviewer contracts, guard guide, and task-local assignment table. The revision remains workflow-only and under complete fresh review.
- 2026-08-12 / Codex primary thread: Reconciled the expanded packet's parallel reviews conservatively. Added workflow and dedicated setup-cycle identity before Setup, moved Green conflict classification after terminal closure, made the guard violation mini-flow check correction eligibility and budget, clarified that every packet/lease authorizes one attempt, and replaced impossible literal “same identity” wording with the stable workflow/task/cycle/phase/role/objective/authority subset. The integral `PASS` remains point-in-time evidence, but the combined verdict is `REVISE` until this corrected state receives fresh complete review.
- 2026-08-12 / Codex primary thread: Reconciled fresh graph and coherence review of packet `3882498D1260793122052BACA71EF28843FF395C8FC81E0F3410F9B5A4AC88B6`. Replaced the one-time Setup decision with a reusable Setup/behavior/closure selector, made accepted Setup and behavior work drain every role-matched evidence record before selecting more work, added a bounded delegated-evidence correction route, and rerouted every accepted final-review correction through refreshed closure validation before complete re-review. The primary made this bounded workflow-contract correction directly because TASK-003 is still `Pending` and the writer contracts themselves are changing; no product behavior or acceptance evidence was added, and the corrected state remains under fresh review.
- 2026-08-12 / Codex primary thread: Reconciled review of packet `146BD7AC38E0533E1ED55A9A3109B56C22BC81494206DCBBC42DBE9F6FA01D0B`. Added an explicit evidence return target so every accepted final-review correction records its packet, receipt, handoff, results, and correction history before refreshed closure without resetting the global count. Excluded already accepted Red and Green from generic attempt 2; a reviewer behavioral or test-contract finding now starts a fresh behavior cycle from a reconciled accepted state, while only compatible Setup, Refactor, or Evidence assignments retain the attempt-2 route. This workflow-only correction leaves TASK-003 `Pending` and unstarted and still requires complete fresh review.
- 2026-08-12 / Codex primary thread: Reconciled focused review of packet `53A02582FBE9490D8E5CE4A80E111614808B0588DB16DF90B58BB6180D7A30ED`. The reviewer-directed fresh behavior entry now explicitly increments the global count, binds the finding and replaced cycle to a fresh cycle, sets `refreshed closure` as that cycle's evidence return target, and requires a durable lineage record with reason and accepted results. This removes implicit queue-target state while preserving the one-correction metric distinction, TASK-003 `Pending` state, and absence of product evidence.
- 2026-08-12 / Codex primary thread: Reconciled complete review of packet `C173B64DAAA48EA138D17DA92769EA2470E6B812D05BA7C0EA9B025962507FCD`. A material-test replacement nested inside reviewer remediation now preserves the initialized global count and refreshed-closure target, extends finding/intermediate/successor lineage, and is limited to one replacement with unchanged objective and authority. Green now stops explicitly for blocked or unsupported scope/dependency/path/authority results. Evidence metadata, receipts, correction records, and remediation lineage are coordinator-only, so an Evidence-phase correction cannot create evidence of evidence. TASK-003 remains `Pending` and unstarted; the corrected workflow remains under complete fresh review.
- 2026-08-12 / Codex primary thread: Applied DPL-DEC-018 after the project owner judged the exception state machine disproportionate. The active plan now uses one compact normal loop: minimum packet, guarded lease, Red, Green with optional same-turn Refactor, primary-recorded evidence, complete checks, and one fresh final review. Every exception stops for coordinator triage instead of selecting a specialized graph branch. The prior rows, hashes, and verdicts remain point-in-time history; TASK-003 is still `Pending` and the simplified revision awaits fresh review.
- 2026-08-12 / Codex primary thread: Reconciled the simplified packet's first fresh review at `F402ED8554F6362AD5E7FC9E19F504866E76C5AAF16988503CD064D7807A9AA4`. Its sole Major identified a stale task-local sentence that bypassed coordinator triage after final review. The corrected closure rule stops first, keeps evidence and authority primary-owned, and routes only an authorized implementation fix through the ordinary fresh assignment loop. The reviewed hash remains historical and the corrected state requires final fresh review.
- 2026-08-12 / Codex primary thread: Recorded complete fresh correction-cycle `PASS` for simplified packet `1B4FBEA61C2CE047579B4B7BD35A2C1D627DCC7945930090B9A6979B88464280`. The reviewer reproduced all supplied component hashes and found no Blocker, Major, or Minor after the coordinator-triage correction. This post-verdict reconciliation returns the plan to ready-to-execute while preserving TASK-003 as `Pending` and unstarted and adding no product or acceptance evidence.
- 2026-08-12 / Codex primary thread: Started TASK-003 after the project owner's attached directive supplied the required separate execution authorization. Updated the canonical task, root current status, plan index, living sections, and progress chronology after confirming a clean worktree, no executable workspace artifacts, no active lease, completed TASK-001, resolved DG-001, and accepted ADR-0011. This start transition adds no product or acceptance evidence and grants no commit, push, pull-request, CI-provider-selection, or scope-expansion authority.
