# Resolve the PostgreSQL Migration-Lock Namespace Identity

This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.


## Progress


- [x] (2026-08-13 03:46Z) Read the documentation map, source assessment, requirements, ADR portfolio, system diagram, implementation plan, ExecPlan convention, project-scoped decision workflow, relevant accepted ADRs, routed migration guards, TASK-004 waiting plan, and execution-record boundary.
- [x] (2026-08-13 03:46Z) Confirmed a clean working tree at `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`, verified that repository-wide task IDs end at TASK-017, and allocated collision-safe TASK-018 without reserving an ADR number.
- [x] (2026-08-13 03:46Z) Registered and started TASK-018 under the project owner's explicit decision-only authorization, created this living Decision Review Contract, and preserved TASK-004 as `Pending` with unchanged dependencies.
- [x] (2026-08-13 03:46Z) Passed the registration barrier: documentation validation covered 47 Markdown files, 41 requirement IDs, 1 authorization, 18 tasks, 17 SPEC rules, 20 HS rules, and 119 scenarios; ADR validation covered 14 ADRs and 38 requirements with only the known NFR-006 warning; `git diff --check` passed; TASK-004 retained only `TASK-002, TASK-003` dependencies; and no undefined successor ADR was referenced.
- [x] (2026-08-13 04:05Z) Completed three comparable read-only option reports through separate `technology_researcher` instances, preserved their primary-source evidence below, and retained all repository authority and implementation boundaries.
- [x] (2026-08-13 04:18Z) Completed the research synchronization barrier; the read-only `decision_analyst` normalized the candidates to 91/84/77, recommended `EXACT-CATALOG-BYTES`, and returned exactly `DRAFT READY`.
- [x] (2026-08-13 04:34Z) Received fresh IR-A `REVISE` on plan SHA-256 `3858C82E9D1299E33343BBD752F40C8E26BEB06774EA5F3D70082ABC9321D2B3`, then applied its sole supported outline correction: make temporary-schema exclusion executable in the controlling bind query and replace invalid `pg_catalog.bigint` spelling with `pg_catalog.int8`.
- [x] (2026-08-13 04:46Z) Complete IR-A re-review of corrected plan SHA-256 `ABAE666DB244D7D722BF9597E6280349B280F9BE9DB8A6D265399649A3C95AF9` returned `REVISE`: the predicate still admits the current session's temporary TOAST namespace. The permitted outline correction is exhausted, so the workflow returned to targeted research and normalized analysis without allocating an ADR.
- [x] (2026-08-13 04:54Z) Targeted read-only PostgreSQL namespace research returned `READY FOR RE-ANALYSIS` with a source-grounded byte-prefix predicate that matches PostgreSQL's complete internal all-temporary classifier for current/other main and TOAST namespaces.
- [x] (2026-08-13 05:06Z) Renewed complete decision analysis of plan SHA-256 `8F33D60C46E2FF192BE73491D61BC3782E8E47BD3EBBDF20EC465FEB8E778995` returned `RETURN FOR RESEARCH`: five unqualified equality operators leave the proposed query dependent on ambient `search_path`, and the OID report has not yet been normalized against the same complete namespace classifier.
- [x] (2026-08-13 05:16Z) Completed two separate read-only re-entry reports. Exact bytes returned `READY FOR RE-ANALYSIS` with local byte-prefix rejection plus a fully qualified three-equality bind query; OID returned `READY FOR RE-ANALYSIS` with a fully qualified five-equality query, complete four-class temporary rejection, and an unchanged normalized score of 77/100.
- [x] (2026-08-13 05:28Z) Complete renewed decision analysis of plan SHA-256 `5FD81AC8D0A3C8A095FC686B2DCA42D32AFA6BFFC0F8ED9DC658499EB07993FC` returned `DRAFT READY`, retained `EXACT-CATALOG-BYTES` at 91/100 over ASCII 84 and OID 77, and passed every hard gate and invariant at synthesis/contract level.
- [x] (2026-08-13 05:51Z) New fresh IR-A reviewed frozen plan SHA-256 `82FD1065DD5746F11F80289F2F99F2125989B6BBB54AC65F7F670AC163151A6F` and returned `REVISE`: the final contract is sound, but two stale historical labels still called defective `IR-A-OC-01` authoritative, and the bottom revision note omitted material re-entry chronology.
- [x] (2026-08-13 05:51Z) Applied the smallest documentation-only reconciliation: explicitly made every pre-final SQL block point-in-time and noncontrolling, named the final exact-byte re-entry query/result contract as the sole controlling contract, and appended the required revision chronology. No decision semantic, score, query, vector, authority, dependency, or implementation state changed.
- [x] (2026-08-13 06:10Z) A distinct new fresh IR-A audited complete frozen plan SHA-256 `38980760DD9733BE51104E98DE4C602A39CB252A0AEF55C5C27878582BEE03A6`, confirmed both prior findings closed, returned `PASS` with no Blocker/Major/Minor, and passed all twelve hard gates and LOCK-INV-01 through LOCK-INV-13 at contract/checkpoint level.
- [x] (2026-08-13 06:10Z) Rechecked every ADR filename and stable ID after IR-A, confirmed ADR-0014 as the prior highest record and `0015` unused, then allocated and primary-authored ADR-0015 as the whole-record `Proposed` successor with proposal-stage navigation synchronized.
- [x] (2026-08-13 06:23Z) Passed the integrated proposal barrier: documentation validation covered 48 Markdown files and all stable IDs/scenarios; ADR validation covered 15 records with only the established NFR-006 warning; `git diff --check` passed; ADR-0012 had no diff; Node.js and Python reproduced all eight v2 vectors; and negative non-document searches found no migration-lock, runner, migration path, Sequelize, Umzug, or `pg` dependency artifact.
- [x] (2026-08-13 06:45Z) Fresh final IR-B cycle 1 audited frozen ADR-0015 SHA-256 `E40390F66B6C0B21D3BF9C17739D3AD9D105ECE4D08A36BEF955AA777F53B741` and ExecPlan `39CBAA5D65C6D7CB0C8533166C8430E3D4D800C8663FFE96FF60EE6CCF3D49D7`, found no ADR semantic defect, and returned `REVISE` for one authoritative status contradiction and one missing TASK-004 revision note.
- [x] (2026-08-13 06:45Z) Applied final-artifact correction cycle 1 within the two-cycle limit: made DG-005 state distinguish existing Proposed ADR-0015 from the absence of an accepted successor and appended the required TASK-004 revision note. ADR-0015 remained byte-for-byte unchanged; no authority, dependency, task status, or implementation changed.
- [x] (2026-08-13 07:02Z) Complete fresh correction-cycle IR-B re-reviewed the entire corrected ten-file state and exact diff, not only the two corrections, and returned `PASS` with no Blocker, Major, or Minor on byte-identical ADR-0015 SHA-256 `E40390F66B6C0B21D3BF9C17739D3AD9D105ECE4D08A36BEF955AA777F53B741` and pre-reconciliation ExecPlan `9E2CC276035847FF8206B36EBFFB35ABAC250A49E67B18D69CA6A0FC6ED73CF1`.
- [x] (2026-08-13 07:06Z) Completed the primary post-verdict reconciliation barrier without changing ADR-0015: reviewer verdict `PASS`, zero findings, all twelve hard gates, LOCK-INV-01 through LOCK-INV-13, the 91/84/77 matrix, exact-byte recommendation, Proposed status, unchanged authority/task graph, documentation-only impact, and exact owner-approval next action align. Both validators, `git diff --check`, strict encoding/whitespace, Node/Python vectors, ADR-0012 immutability, ID uniqueness, and negative scope checks pass.
- [x] (2026-08-13 13:24Z) Reopened the decision contract under explicit project-owner authorization after a post-PASS coherence review and primary-source audit found that the proposal equated any persistent `pg_namespace` row with an application schema, explicitly admitted `pg_catalog`, and left the system-schema domain as a hidden high-impact assumption. The prior PASS and hash remain point-in-time history but are no longer approval-authorizing.
- [x] (2026-08-13 13:41Z) Completed symmetric read-only application-domain re-entry for exact catalog bytes, restricted ASCII, and catalog OIDs against frozen contract SHA-256 `DE9EC65462D4E40B283258D2FD8ED3B2C996BE3D0D24D48BB63F7F64D06106CE`. All three returned `READY FOR RE-ANALYSIS`, applied the same provenance/system-schema guard, preserved v2/v1 boundaries, and scored 91/84/77 respectively.
- [x] (2026-08-13 13:53Z) Renewed complete `decision_analyst` synthesis returned exactly `DRAFT READY`: the three candidates are comparable at 91/84/77, `EXACT-CATALOG-BYTES` remains selected without receiving score credit for repairing the shared domain defect, the normative bind remains the fully qualified two-buffer query, and privilege checks remain downstream defense-in-depth proof rather than identity or provenance.
- [x] (2026-08-13 14:11Z) Fresh complete IR-A over frozen ExecPlan SHA-256 `83344882E1B6CF7214434A8E56CF708D55AF25FF75530DD9413CD61E8A8DF323` returned `REVISE` with no Blocker, two Major completeness/evidence findings, and one Minor validator finding. All findings fit one bounded documentation-only contract/outline correction and require neither new research nor owner direction.
- [x] (2026-08-13 14:11Z) Applied the bounded IR-A correction: completed the renewed whole-record outline, separated proposal-stage from acceptance-only specification changes, made all fourteen invariant evidence cells current, enumerated stale derived status owners, and replaced the validator-hostile bare ASCII regex with equivalent prose. No decision semantic, score, authority, dependency, task status, or implementation state changed.
- [x] (2026-08-13 14:21Z) A distinct complete fresh IR-A re-review verified corrected frozen ExecPlan SHA-256 `347724CC2B12F32DC48918B1397CB2704196183B4ED8894D0B9AC6616A437F27`, confirmed all three prior findings closed, returned `PASS` with no Blocker/Major/Minor, and passed all thirteen hard gates and LOCK-INV-01 through LOCK-INV-14 at contract/checkpoint level. This authorizes only primary revision of the existing Proposed ADR and proposal-stage synchronization.
- [x] (2026-08-13 14:33Z) Primary-revised ADR-0015 and every materially affected proposal-stage current-status/navigation owner under the distinct renewed IR-A `PASS`. The integrated documentation remains proposal-only: ADR-0012 and ADR-0014 are unchanged and `Accepted`; ADR-0015 remains `Proposed`; DG-005 and TASK-004 remain `Pending`; TASK-018 remains `In progress`; TASK-004 dependencies remain unchanged; no implementation exists; and acceptance-only SPEC/HS authority was not edited.
- [x] (2026-08-13 14:38Z) Passed proportional integrated validation of initial corrected proposal SHA-256 `8FFFB0887C2572C8AF39D89B012F9D5422123B72798568C0011DDE25E521B306`: both validators, `git diff --check`, strict hygiene, two-runtime vectors, ADR-0012 preservation, structured dependency absence, and authority/state/dependency/negative-scope checks passed. A subsequent pre-freeze semantic audit found one artifact-local whole-record omission, so this hash and validation remain diagnostic history and are not final-review-authorizing.
- [x] (2026-08-13 14:41Z) Reconciled the read-only pre-freeze semantic audit's `REVISE`: ADR-0015 linked ADR-0014 but did not substantively carry forward its sole `characters.image_url text NOT NULL` image-field/no-image-subsystem constraint. Added one linked Context paragraph with that exact current constraint. No migration-lock semantic, option score, authority, task/dependency state, acceptance-only specification, or implementation changed.
- [x] (2026-08-13 14:45Z) Revalidated revised ADR-0015 SHA-256 `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3`: both validators, `git diff --check`, strict hygiene, Node/Python vectors, structured dependency absence, ADR-0012 preservation, and corrected authority/state/dependency/negative-scope checks pass. A separate trace audit is still reading the latest state, so this is not yet the final-review freeze.
- [x] (2026-08-13 14:51Z) Reconciled the read-only trace audit's sole proposal-stage finding: current derived owners now state that revised-hash validation passed and fresh final IR-B remains; append-only chronology records the provisional-hash invalidation, ADR-0014 Context carry-forward, and revised-hash validation. The audit found every other status, dependency, OR-001, SPEC/HS, and no-implementation boundary coherent.
- [x] (2026-08-13 14:53Z) Passed the complete post-trace integrated barrier and froze corrected ADR-0015 SHA-256 `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3`: both validators, `git diff --check`, strict ten-file hygiene, all eight vectors in Node.js 24.18.0 and Python 3.12.10, structured dependency absence, ADR-0012 and acceptance-only SPEC/HS preservation, exact authority/task/dependency state, and negative runtime-v2 scope pass. The exact post-append ExecPlan hash is supplied externally to IR-B to avoid self-reference.
- [x] (2026-08-13 15:16Z) Complete fresh final IR-B verified frozen ADR SHA-256 `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3`, pre-reconciliation ExecPlan SHA-256 `96B3077158B3FC25BC3031752B8E5DE4F79BD730941D12A966F5EB2B96A7B69B`, and HEAD `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`; returned `PASS` with no Blocker, Major, or Minor; and passed all thirteen hard gates and LOCK-INV-01 through LOCK-INV-14.
- [x] (2026-08-13 15:19Z) Completed byte-preserving post-verdict reconciliation: current status/navigation and append-only chronology record fresh final IR-B `PASS`; documentation and ADR validators, `git diff --check`, strict ten-file hygiene, Node/Python vectors, structured dependency absence, protected-authority preservation, exact status/dependency checks, and negative runtime-v2 scope pass. Reviewed ADR SHA-256 remains `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3`.
- [x] (2026-08-13) Reopened the exact proposal after a later source audit found that PostgreSQL can resolve a default encoding conversion through `activeSearchPath` for non-UTF8-to-UTF8 conversion and that the database bind admits template databases. The prior final PASS and ADR hash remain historical but are no longer approval-authorizing.
- [x] (2026-08-13) Recorded the project owner's explicit authorization for one named third bounded correction covering supported encoding or controlled conversion lookup, template/connectability database classification, exact failure ordering, fixtures, trace, and one complete fresh final review. This authorization creates no new two-cycle budget and changes no accepted authority, task dependency, gate status, or implementation boundary.
- [x] (2026-08-13 16:51Z) Three separate read-only `technology_researcher` reports verified frozen contract SHA-256 `DCAB480B064D999520BFAB3F0B6CFE93F7E08879A7B60D888D0E158E562683A9`, returned `READY FOR RE-ANALYSIS`, retained 91/84/77 without repair credit, and independently preferred a separate UTF8-only preflight over transaction-local conversion control. The reports expose one SQL_ASCII disagreement for analyst normalization rather than hiding it.
- [x] (2026-08-13 17:05Z) Complete renewed `decision_analyst` synthesis verified the integrated research packet SHA-256 `CE2754C00979AD7422607BCF01B7844CA2D7B23A9F27D29CCF334766979D256F`, returned exactly `DRAFT READY`, retained the normalized 91/84/77 ranking without repair credit, selected `EXACT-CATALOG-BYTES` with a UTF8-only application-database preflight, and passed all fourteen hard gates and LOCK-INV-01 through LOCK-INV-15 at synthesis/contract level.
- [x] (2026-08-13 17:11Z) Passed the pre-IR-A contract barrier: documentation and ADR validators, `git diff --check`, exact ten-file scope, protected ADR-0012/ADR-0014/SPEC/HS preservation, HEAD reconciliation, TASK-004 dependency/status checks, and negative non-document diff checks pass. ADR-0015 remains byte-identical at historical non-authorizing SHA-256 `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3`; the post-append ExecPlan hash is supplied externally to avoid self-reference.
- [x] (2026-08-13 17:30Z) Fresh complete third-correction IR-A verified frozen ExecPlan SHA-256 `71C5E568DB5DD8AA935ECD8C5ACC59C91B7CCFDB1FCF1B701992A3D76C011FA0`, historical ADR hash, and HEAD, then returned `REVISE` with no Blocker or Minor and one Major artifact-local evidence finding: the decisive PostgreSQL source files and template documentation were not cited durably in the third reports or mapped ADR References outline. Every semantic check, all fourteen hard gates, and LOCK-INV-02 through LOCK-INV-15 passed.
- [x] (2026-08-13 17:30Z) Applied the IR-A-supported trace-only correction inside the named remediation: explicitly incorporated a pinned common PostgreSQL primary-source set into Reports A/B/C and required those exact sources in the whole-record ADR References. No option, score, SQL, result contract, diagnostic, fixture, authority, status, dependency, specification, or implementation changed; a complete fresh re-review remains mandatory before any ADR edit.
- [x] (2026-08-13 17:35Z) Complete fresh IR-A re-review verified corrected ExecPlan SHA-256 `0EF102A03E23DF90189C422801F447D165B99FBBFC370675CDAB5302FC214B83`, confirmed the prior Major closed, returned `PASS` with no Blocker/Major/Minor, and passed all fourteen hard gates and LOCK-INV-01 through LOCK-INV-15. This authorizes only primary revision of existing Proposed ADR-0015 and proposal-stage synchronization.
- [x] (2026-08-13 17:43Z) Primary-revised existing Proposed ADR-0015 and every materially affected proposal-stage owner under complete fresh IR-A `PASS`. The ADR now fixes the exact UTF8/class preflight, identical five-field binds, template/connectability rules, result metadata, diagnostic precedence, fixtures, risks, reversal triggers, and pinned sources while preserving v2 identity, 91/84/77, whole-record ADR-0012/ADR-0014 carry-forward, all authority/task/dependency states, acceptance-only SPEC/HS authority, and implementation absence.
- [x] (2026-08-13 17:51Z) Passed the complete integrated validation barrier and froze corrected Proposed ADR-0015 SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69`: both validators, `git diff --check`, strict ten-file UTF8/no-BOM/final-LF hygiene, all eight v2 vectors in Node.js 24.18.0 and Python, exact documentation-only scope, protected accepted/specification authority, structured dependency absence, exact authority/task/dependency states, and negative runtime-v2 scope pass. The exact post-append ExecPlan hash is supplied externally to IR-B to avoid self-reference.
- [x] (2026-08-13 18:15Z) One different complete fresh IR-B verified frozen ADR SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69`, frozen ExecPlan SHA-256 `BD62B5E7D18305E80FD6ABFE5DDE418CA02F5DD4913BC92CE3C69A95413C1246`, and HEAD `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`; returned `PASS` with no Blocker, Major, or Minor; and passed all fourteen hard gates and LOCK-INV-01 through LOCK-INV-15. Byte-preserving reconciliation leaves the reviewed ADR exact and ready for project-owner approval.
- [x] (2026-08-13 18:24Z) Completed byte-preserving post-verdict reconciliation and the final validation barrier. Current owners and chronology record fresh final IR-B `PASS`; both validators, `git diff --check`, exact ten-path scope, strict hygiene, Node/Python vectors, structured dependency absence, protected-authority preservation, exact states/dependencies, and negative runtime-v2 scope pass. Reviewed ADR SHA-256 remains `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69`.
- [x] (2026-08-13) Reopened the exact proposal after a later PostgreSQL startup-path review proved that the SQL preflight cannot govern encoding conversion or search-path resolution that occurs while the connection is established or while the first query message is decoded. The prior final PASS and ADR hash remain historical but are no longer approval-authorizing.
- [x] (2026-08-13) Recorded the project owner's explicit direction to use the practical startup-controlled connection approach for this personal portfolio and authorization for one named fourth bounded correction: comparable startup-control research, renewed analysis, fresh IR-A, primary proposal revision, integrated validation, and one different complete fresh IR-B. This changes no accepted authority, task dependency, gate status, or implementation boundary.
- [x] (2026-08-13) Passed the fourth-correction reopening barrier: current status/navigation and append-only chronology now make the third PASS/hash historical; documentation and ADR validators and `git diff --check` pass; ADR-0015 remains byte-identical at historical SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69`; accepted authority, states, TASK-004 dependencies, v1 meaning, and implementation remain unchanged.
- [x] (2026-08-13) Three separate read-only fourth-correction reports returned `READY FOR RE-ANALYSIS` against frozen contract SHA-256 `379662AAE5BC8E383061A422146829839317B5530F308390348B23D00F2435A2`. The practical UTF8-only startup guard retains the complete proposal at 91, provisioned zero-conversion scores 73 and lacks a current attestation control plane, and multi-encoding scores 79 with unnecessary LATIN1/catalog trust surface; all preserve the 91/84/77 identity ranking without repair credit.
- [x] (2026-08-13) Complete renewed `decision_analyst` synthesis verified integrated research-packet SHA-256 `5ED676289C700E2FAABC2E5996B7D04419F1A137929A05B41A0A014062D0640E`, returned exactly `DRAFT READY`, retained exact catalog bytes and the complete proposal at 91/100, selected `STARTUP-GUARDED-UTF8-ONLY`, and passed all fifteen hard gates and LOCK-INV-01 through LOCK-INV-16 at synthesis/contract level.
- [x] (2026-08-13) Passed the fourth-correction pre-IR-A barrier after primary synthesis and proposal-stage status synchronization. Both validators, `git diff --check`, exact ten-path documentation-only scope, strict UTF8/no-BOM/final-LF/no-trailing-whitespace hygiene, protected accepted ADR and acceptance-only SPEC/HS preservation, exact lifecycle/task/dependency state, and negative implementation/dependency diff checks pass. ADR-0015 remains byte-identical at historical non-authorizing SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69`; the exact post-append ExecPlan hash is supplied externally to fresh IR-A.
- [x] (2026-08-13) Fresh complete fourth-correction IR-A verified frozen ExecPlan SHA-256 `C0E521EED50F4920B6051FE5B5E3B2049AA4C44A74507C2AD1C24EEE45A804D4`, historical ADR hash, and HEAD, then returned `REVISE` with no Blocker or Minor and one Major artifact-local source-trace finding: Reports A/B/C did not durably cite the Sequelize abstract connection manager that proves the separate pre-pool version-bootstrap connection.
- [x] (2026-08-13) Applied the one supported IR-A trace/outline correction: added the pinned Sequelize 6.37.7 abstract connection-manager source to the common report source set and mapped it specifically to the direct bootstrap `_connect`, later pool acquisition, and required downstream suppression proof. No option, score, interface, SQL, invariant, authority, state, dependency, specification, or implementation semantic changed.
- [x] (2026-08-13) Distinct complete fresh IR-A re-review verified corrected frozen ExecPlan SHA-256 `FD27155965B4FAEA3001C9277CD81EAB025CE2FA124AED9D0E0B61C90F3E6AB8`, historical ADR hash, and HEAD; confirmed the sole source-trace Major closed; returned `PASS` with no Blocker, Major, or Minor; and passed all fifteen hard gates and LOCK-INV-01 through LOCK-INV-16 at contract level.
- [x] (2026-08-13) Primary-revised existing Proposed ADR-0015 and every materially affected proposal-stage owner under complete fresh IR-A `PASS`. The ADR now carries the closed target, private pure-JavaScript one-session startup guard, no-untrusted-conversion invariant, five-field forward preflight, interface replacement, diagnostics, fixtures, risks, reversal triggers, and pinned sources while preserving every unaffected whole-record rule and all owner-controlled states.
- [x] (2026-08-13) A read-only pre-freeze semantic/trace audit returned `PASS` after the primary corrected the last stale whole-record and TASK-004 ownership wording. The audit confirmed the complete selected startup/session contract, proposal-stage status consistency, accepted/specification preservation, unchanged TASK-004 dependencies, and no implementation.
- [x] (2026-08-13) Passed the complete fourth-correction integrated barrier and froze corrected Proposed ADR-0015 SHA-256 `6AD00C9533849CFAA5C793B23B3DEF5C633AAB2D4FE3D577CCA5C2B0D9DF90B6`: both validators, `git diff --check`, strict ten-path hygiene, all eight v2 vectors in Node.js 24.18.0 and Python 3.12.10, exact documentation-only scope, protected accepted/specification authority, structured dependency absence, exact lifecycle/task/dependency states, and negative runtime-v2 scope pass. The exact post-append ExecPlan hash is supplied externally to IR-B to avoid self-reference.
- [x] (2026-08-13) One different complete fresh IR-B verified frozen ADR-0015 SHA-256 `6AD00C9533849CFAA5C793B23B3DEF5C633AAB2D4FE3D577CCA5C2B0D9DF90B6`, frozen ExecPlan SHA-256 `DF1413C902939DC68E4E2251F5F596C474DA1B3138FE6E5196E5A4E04EBA9AFC`, and HEAD `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`; returned `PASS` with no Blocker, Major, or Minor; passed all fifteen hard gates and LOCK-INV-01 through LOCK-INV-16; and confirmed every reviewed byte unchanged. The primary reconciled that exact ADR hash without changing it and stops for project-owner approval.
- [x] (2026-08-13) Reopened the exact proposal after the latest source-grounded coherence review returned `REVISE` on ADR-0015 SHA-256 `6AD00C9533849CFAA5C793B23B3DEF5C633AAB2D4FE3D577CCA5C2B0D9DF90B6`. The review proved that `pg@8.22.0` still reads `PGREPLICATION`, `PGSSLNEGOTIATION`, and `PGAPPNAME` when Sequelize 6.37.7 does not supply an exact overriding value, so the ADR's claim that every other fallback was precluded and that replication was disabled was false. It also found two derived review-state sentences stale. The prior PASS/hash remain historical but are no longer approval-authorizing.
- [x] (2026-08-13) Recorded the project owner's explicit authorization to repair the latest blocking and documentation findings, using the practical portfolio direction and documenting only genuinely non-blocking residual work as technical debt. This named fifth bounded correction changes no accepted authority, gate/task state, TASK-004 dependency, v1 meaning, or implementation boundary.
- [x] (2026-08-13) Completed three comparable read-only fifth-correction reports for the pinned in-process environment guard, a sanitized migration subprocess, and a closure-bound low-level `pg` adapter. All returned `READY FOR RE-ANALYSIS` at 91/83/76 without hard-gate repair credit, corrected the active client-encoding spelling to `PGCLIENT_ENCODING`, and preserved every authority, state, dependency, v1, and no-implementation boundary.
- [x] (2026-08-13) Complete renewed `decision_analyst` synthesis against the fifth-correction contract and durable reports returned exactly `DRAFT READY`. It selected `PINNED-ENVIRONMENT-GUARD` at 91 over the sanitized subprocess at 83 and the closure-bound adapter at 76, froze the exact closed configuration, prohibited-environment, credential, TLS, two-check, diagnostic, proof, trust, and reversal semantics below, and passed all sixteen hard gates and LOCK-INV-01 through LOCK-INV-17 at synthesis level without repair credit.
- [x] (2026-08-13) Passed the fifth-correction pre-IR-A contract barrier: both repository validators, `git diff --check`, exact ten-path documentation-only scope, protected ADR-0012/ADR-0014 and acceptance-only SPEC/HS preservation, exact lifecycle/task/dependency states, and negative non-document diff checks pass. ADR-0015 remains byte-identical at historical non-authorizing SHA-256 `6AD00C9533849CFAA5C793B23B3DEF5C633AAB2D4FE3D577CCA5C2B0D9DF90B6`; the post-append ExecPlan identity is supplied externally to avoid self-reference.
- [x] (2026-08-13) Fresh complete fifth-correction IR-A verified frozen ExecPlan SHA-256 `A455ECBD8B67705369F359EE07FCC5558D432201D5664500CB73A44BCDDA0A1F`, historical ADR hash, and HEAD; returned `REVISE` with no Blocker or Minor and one Major artifact-local completeness finding: the live validation clause and cumulative evidence cells had not advanced from LOCK-INV-16/fourth-correction evidence to all seventeen fifth-correction invariants. Every decision semantic, all sixteen hard gates, and the authority, status, dependency, protected-file, and no-implementation boundaries otherwise passed.
- [x] (2026-08-13) Applied the one supported fifth-correction IR-A outline repair: changed the live validation range to LOCK-INV-17 and refreshed all seventeen evidence cells to distinguish historical cycles from current fifth research, synthesis, initial checkpoint, and remaining fresh re-review. No option, score, factory value, environment rule, SQL, result contract, interface, diagnostic, fixture, reversal trigger, authority, state, dependency, specification, or implementation changed.
- [x] (2026-08-13) Complete fresh fifth-correction IR-A re-review verified corrected frozen ExecPlan SHA-256 `C7A2DABB1DC1BF99E8D202B7BCD11D9FAB16316D349713AE311C3201D2BCA838`, confirmed the sole prior Major closed, returned `PASS` with no Blocker/Major/Minor, and passed all sixteen hard gates and LOCK-INV-01 through LOCK-INV-17 at contract/checkpoint level. This authorized only primary revision and proposal-stage synchronization.
- [x] (2026-08-13) Primary-revised existing Proposed ADR-0015 and every materially affected proposal-stage owner under complete fresh IR-A `PASS`. The ADR now adds the 91/83/76 environment comparison, exact stock pinned guard, closed TLS and credential provider, complete environment disposition, two-check/trusted-process boundary, diagnostics, fixtures, risks, reversal triggers, validation history, and pinned sources while preserving every unaffected whole-record rule and all owner-controlled states.
- [x] (2026-08-13) Passed the complete fifth-correction integrated validation barrier and froze Proposed ADR-0015 SHA-256 `215E31D6E78DBFA0879D916DDDAD75BA0E4E63943FC9B458DDDEE0DAA11C576C` for final IR-B. Both validators, `git diff --check`, strict ten-path UTF-8/no-BOM/final-LF/no-trailing-whitespace hygiene, Node.js 24.18.0 and Python 3.12.10 reproduction of all eight v2 vectors, protected ADR-0012/ADR-0014 and acceptance-only SPEC/HS preservation, exact documentation-only scope, structured dependency absence, lifecycle/task/dependency/v1 checks, and negative runtime-v2 scope pass. The post-append ExecPlan identity is supplied externally to avoid self-reference.
- [x] (2026-08-13) One different complete fresh final IR-B reviewed exact ADR SHA-256 `215E31D6E78DBFA0879D916DDDAD75BA0E4E63943FC9B458DDDEE0DAA11C576C`, ExecPlan SHA-256 `96F46445259495919F7BC4A1FDF788B8093B4D8E0FA606A440B8F06FEE8D78AE`, and HEAD `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`; returned `REVISE` after reproducing the pinned TLS `servername` overwrite, finding contradictory current-stage routing, and identifying two living-plan chronology defects. The review changed no repository state.
- [x] (2026-08-13) Recorded the project owner's explicit authorization for the primary thread to apply the named TLS/SNI and trace corrections directly without the agent workflow. The fifth hash and checkpoint are non-authorizing; ADR-0015 remains `Proposed`, ADR-0012/ADR-0014 remain `Accepted`, DG-005/TASK-004 remain `Pending`, TASK-018 remains `In progress`, dependencies remain unchanged, and implementation remains absent.
- [x] (2026-08-13) Completed the direct primary TLS/SNI and trace correction and passed the full integrated validation barrier on exact Proposed ADR-0015 SHA-256 `9B90D8BF366E83E038F53AFA5D520B28786F9C768B765B8FA45EC34D4A4C1528`. Both validators, `git diff --check`, strict ten-path hygiene, Node.js 24.18.0 and Python 3.12.10 vectors, TLS relation fixtures, protected files, exact scope, lifecycle/dependencies, dependency absence, and negative runtime scope pass. The post-append ExecPlan identity is supplied externally to avoid self-reference. This direct work does not itself satisfy the independent-review boundary.
- [x] (2026-08-14) Recorded the project owner's direct, no-worker authorization to replace the broad proposal profile with `RESTRICTED-ASCII-DOMAIN` under the supplied exact-version, opaque-provenance, local-transport, eight-field-preflight, text-bind, destructive-deadline, database-local-collision, trace, and validation plan. Historical SHA-256 `9B90D8BF366E83E038F53AFA5D520B28786F9C768B765B8FA45EC34D4A4C1528` is non-authorizing; all lifecycle/task/dependency/no-implementation boundaries remain unchanged.
- [x] (2026-08-14) Completed restricted-profile ADR/plan/navigation synchronization and the full primary integrated barrier; froze exact Proposed ADR-0015 SHA-256 `B38F26ED48A99CFB0D4FA99A1973637B4C9ED66AC6122598FB093A13AA3B4EC9` for fresh complete independent review. All twenty current hard gates and LOCK-INV-01 through LOCK-INV-21 reconcile at primary contract level; both validators, `git diff --check`, strict ten-path hygiene, Node.js 24.18.0 and Python 3.12.10 five-vector/framing/domain checks, protected files, exact scope, lifecycle/dependencies, structured dependency absence, and negative runtime scope pass. No acceptance or implementation state changed.
- [x] (2026-08-14) Reconciled the fresh independent exact-artifact review of Proposed ADR-0015 SHA-256 `B38F26ED48A99CFB0D4FA99A1973637B4C9ED66AC6122598FB093A13AA3B4EC9` as `REVISE`. The review identified an incompletely evidenced startup-encoding route, a stale PostgreSQL 18.4 security-minor pin, and an asymmetric current `88/92/77` comparison. Mechanical validation passed, but the hard gates correctly prevented owner presentation.
- [x] (2026-08-14) Recorded the project owner's explicit authorization to repair those three findings directly. Pinned-source reconciliation confirmed that `Client.getStartupConf()` forwards `options` but not `client_encoding`, while `pg-protocol@1.15.0` independently appends direct `client_encoding=UTF8`; the correction makes both routes explicit, adopts PostgreSQL 18.6, and retires unsupported current cross-option numbers in favor of one common-baseline qualitative comparison.
- [x] (2026-08-14) Completed proposal/plan/navigation synchronization and the full primary integrated barrier; froze exact corrected Proposed ADR-0015 SHA-256 `E649A26C334C16BC0B3800ECCB07C2F315F176EC0896C60D72E843765355B3E6`. All twenty hard gates and LOCK-INV-01 through LOCK-INV-21 reconcile at primary contract level; both validators, `git diff --check`, strict ten-path hygiene, exact Node.js 24.18.0 and Python 3.12.10 five-vector/framing/domain checks, protected files, exact scope, lifecycle/dependencies, structured dependency absence, and negative runtime scope pass. No acceptance or implementation state changed.
- [x] (2026-08-14) Reconciled the fresh independent exact-artifact review of corrected Proposed ADR-0015 SHA-256 `E649A26C334C16BC0B3800ECCB07C2F315F176EC0896C60D72E843765355B3E6` as `REVISE`. The otherwise acceptable artifact retained two approval-blocking Minor documentation defects: this plan still called historical `92/88/77` the current matrix, and the ADR abbreviated the proven startup sequence as “before initialization.”
- [x] (2026-08-14) Recorded the project owner's direct repair authorization and corrected both findings. The living comparison is now qualitative only, and the startup controls are stated as taking effect after authentication but before `search_path` and client-encoding initialization, `ReadyForQuery`, and every Sequelize SQL statement.
- [x] (2026-08-14) Completed proposal/plan/navigation synchronization and the full primary integrated barrier; froze exact corrected Proposed ADR-0015 SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1`. All twenty hard gates and LOCK-INV-01 through LOCK-INV-21 reconcile at primary contract level; both validators, `git diff --check`, strict ten-path hygiene, exact Node.js 24.18.0 and Python 3.12.10 five-vector/framing/domain checks, protected files, exact scope, lifecycle/dependencies, structured dependency absence, and negative runtime scope pass. No acceptance or implementation state changed.
- [x] (2026-08-14) Fresh complete independent review returned `PASS` with no Blocker, Major, or Minor on exact corrected Proposed ADR-0015 SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1`; all twenty hard gates and LOCK-INV-01 through LOCK-INV-21 passed, and the reviewer reported byte-identical terminal rehash plus passing validators, hygiene, diff, scope, lifecycle, dependency, no-implementation, and two-runtime vector checks.
- [x] (2026-08-14) The project owner explicitly approved the exact reviewed proposal. Reconciled ADR-0015 as `Accepted`, ADR-0012 as reciprocally `Superseded`, DG-005 as `Resolved`, and TASK-018 as `Complete`; synchronized acceptance-only specifications and current authorities; preserved TASK-004 as `Pending`, unstarted, and dependent only on TASK-002/TASK-003; completed documentation closure; and moved this plan to `docs/plans/completed/`.


## Surprises & Discoveries


- Observation: DG-005 already requires a separately researched ExecPlan, but the roadmap previously had no dedicated task owner for it.
  Evidence: `docs/IMPLEMENTATION_PLAN.md` defines the gate and `docs/plans/TASK-004-relational-persistence-from-migrations.md` records the missing task identity as an unresolved governance input.

- Observation: ADR-0012's NFC step is not injective over valid distinct PostgreSQL identifiers.
  Evidence: accepted TASK-016 history records that composed `café` and decomposed `café` remain distinct catalog identifiers but collapse to the same NFC-derived advisory key.

- Observation: the gate text names two mandatory namespace-domain choices, while the ADR governance rubric requires the selected option plus at least two credible alternatives.
  Evidence: DG-005 requires exact catalog bytes versus a deliberately restrictive admissible domain; `.agents/skills/govern-adrs/SKILL.md` requires at least two alternatives in addition to the selected option. This plan adds catalog OID identity as a third bounded candidate without changing gate scope.

- Observation: the current session exposes workspace-write permissions and repository state but no reliable command that reports the primary thread's exact model and reasoning setting.
  Evidence: the project policy requests confirmation rather than inference. The plan records the observable permission/tree facts and does not claim an unobservable primary runtime setting; spawned custom roles use their repository-defined role policies.

- Observation: all three candidates can satisfy the no-alias and same-namespace safety gates, but they purchase that result with materially different identity semantics.
  Evidence: exact catalog bytes preserve every exactly representable current name; the ASCII candidate excludes valid PostgreSQL names through a new repository policy; and the OID pair follows current catalog objects but loses stable name-to-key behavior across logical reconstruction.

- Observation: exact catalog bytes and the restrictive ASCII domain both depend on a future driver boundary returning raw `bytea` values without lossy rewriting.
  Evidence: official node-postgres documentation guarantees unchanged `Buffer` parameters but does not explicitly guarantee the future Sequelize/node-postgres result parser shape. Both reports therefore make raw-result proof a TASK-004 obligation rather than current evidence.

- Observation: the common `migrations:v2` vectors were independently reproduced in Node.js 24.18.0 and Python 3.12.10.
  Evidence: both runtimes produced the same SHA-256 digests and signed 64-bit values for ASCII, case-distinct, composed/decomposed Unicode, and framing-boundary fixtures. This is deterministic calculation evidence only, not PostgreSQL or migration implementation evidence.

- Observation: only the OID report explicitly rejected temporary schemas, although persistent migration history makes temporary namespaces invalid for every candidate.
  Evidence: the analyst reconciled this as a bounded selected-contract clarification grounded in PostgreSQL's current/other temporary-schema predicates. The exact-byte outline now rejects temporary namespaces before history access without changing its identity source or serialization.

- Observation: the restrictive ASCII report's raw score underpriced the operational policy and transition cost of excluding valid PostgreSQL names.
  Evidence: normalized analysis reduced it from 88 to 84 while preserving its technical viability; the OID option normalized from 80 to 77 because runtime-assigned identity and reconstruction churn weaken verifiability and reversibility.

- Observation: PostgreSQL's SQL alias `bigint` is not the name of a type in the `pg_catalog` namespace.
  Evidence: fresh IR-A reconciled PostgreSQL 18.1 catalog/source evidence and found `pg_catalog.int8`, not `pg_catalog.bigint`. The controlling lock SQL now uses `CAST($1 AS pg_catalog.int8)`.

- Observation: stating that temporary namespaces are rejected is insufficient unless the controlling fixed query or local admission contract enforces that fact.
  Evidence: the first IR-A found that the initial exact-byte report query lacked executable temporary rejection and proposed the point-in-time `IR-A-OC-01` helper projection below. Later review proved that proposal defective; it is historical evidence only and does not control successor drafting.

- Observation: `pg_my_temp_schema()` identifies only the current session's main temporary namespace, while `pg_is_other_temp_schema(oid)` deliberately excludes the current session's main and TOAST temporary namespaces.
  Evidence: complete IR-A re-review reconciled PostgreSQL 18 namespace source and proved that the current session's `pg_toast_temp_<backend>` namespace makes both predicates false. The first correction therefore did not establish connection-independent persistent-schema admission.

- Observation: PostgreSQL's complete internal all-temporary classifier is name-based, not a union of its two public SQL helper functions.
  Evidence: REL_18_STABLE and current source classify any namespace whose catalog name begins with the exact C-byte prefix `pg_temp_` or `pg_toast_temp_`; supported PostgreSQL DDL reserves all `pg_` schema names. The targeted report expresses those same constants as raw UTF-8 `bytea` prefix comparisons.

- Observation: schema-qualified functions and casts do not make an SQL expression independent of `search_path` when its operators remain unqualified.
  Evidence: renewed analysis reconciled PostgreSQL 18 operator-resolution, schema-search-path, and operator-invocation documentation. An exact-signature operator earlier in an explicitly ordered path can shadow a built-in, while `OPERATOR(pg_catalog.=)` is the supported qualification syntax. A shadowing `bytea = bytea` operator could make the full-name predicates true and the temporary-prefix predicates false.

- Observation: targeted repair of the recommended option exposed a comparability gap in the OID report.
  Evidence: the durable OID candidate still uses the incomplete public-helper temporary classifier and unqualified types/operators. It must receive the same complete, search-path-independent catalog-admission treatment before renewed synthesis can treat all three reports as symmetric.

- Observation: local exact-byte temporary-prefix rejection is smaller and more diagnostic than the repaired server-side predicate for the name-derived option.
  Evidence: the exact-option researcher compared full operator qualification, controlled `search_path`, and local rejection. Local rejection mirrors PostgreSQL's classifier, maps a reserved temporary-form input directly to `MIGRATION_NAMESPACE_INVALID`, and reduces the fixed bind SQL from five qualified equality operators to three without changing the admitted persistent domain.

- Observation: `AND`, `OR`, and `NOT` are PostgreSQL grammar boolean expressions rather than search-path-resolved operators.
  Evidence: REL_18_STABLE grammar constructs `BoolExpr` nodes for them. Search-path independence therefore requires qualification of catalog functions, relations, types, casts, and actual equality operators, but no artificial qualification mechanism for these keywords.

- Observation: complete OID normalization repairs comparability without improving the candidate's architectural desirability.
  Evidence: exact input bytes now bind the catalog safely before identity derives from retained OIDs, but OID reuse, logical-reconstruction churn, runtime-dependent vectors, redundant database identity, and weaker diagnostics remain. The normalized score stays 77/100.

- Observation: persistence is not sufficient evidence that a PostgreSQL namespace is an application schema.
  Evidence: ADR-0015 rejects only the two temporary prefixes, its fixed query matches any exact current `pg_namespace` row, and its validation expressly admits `pg_catalog`; PostgreSQL also supplies persistent `pg_toast` and `information_schema`. AC-009 and ADR-0003 require an application schema, while the local official-image `POSTGRES_USER` is privileged enough that permission failure cannot be the normative guard.

- Observation: the accepted harness does not establish a repository-wide ASCII schema-name policy.
  Evidence: ADR-0011 specifies a sanitized run ID and a unique database or schema, but the integration harness and TASK-004 namespace allocator do not exist and no accepted authority fixes an ASCII database/schema grammar. System-schema exclusion is orthogonal to Unicode encoding because `information_schema` is ASCII.

- Observation: byte-equal post-lock rebinding proves only name-visible continuity at the second observation.
  Evidence: the contract intentionally reuses identity after exact-name drop/recreate and advisory locks are cooperative; the rebind cannot prove object continuity or prevent privileged uncoordinated DDL after the second bind.

- Observation: effective privilege booleans do not belong in the common normative namespace bind.
  Evidence: `CONNECT`, `USAGE`, `CREATE`, ownership, or ACL state does not prove application provenance; superusers can satisfy permission checks for system schemas; and including mutable privilege/session-role state would couple name-derived identity and rebinding to an operational concern. The selected contract therefore keeps the fully qualified two-buffer query and assigns least-privilege topology, positive and negative permission behavior, and current-Compose limitations to TASK-004 proof.

- Observation: a technically complete renewed decision delta is not sufficient when its durable ADR outline and invariant evidence remain stale.
  Evidence: fresh IR-A found that the first renewed synthesis omitted ADR-0014 trace, the artifact-vector fixture/version distinction, OR-001's adopted-optional DG-005 routing, and the proposal-versus-acceptance documentation boundary. It also found that several invariant cells still described the historical final PASS as current and that the bare ASCII regex failed the documentation validator.

- Observation: listing a related ADR in metadata does not by itself carry forward that decision's substantive downstream constraint.
  Evidence: the pre-freeze semantic audit found that initial corrected ADR SHA-256 `8FFFB0887C2572C8AF39D89B012F9D5422123B72798568C0011DDE25E521B306` named ADR-0014 but omitted its sole-image-field/no-image-subsystem rule from the whole-record Context/Decision. One linked Context paragraph closes the artifact-local omission before final IR-B.

- Observation: a passing integrated barrier must be synchronized immediately into every current-status owner and append-only chronology before artifact freezing.
  Evidence: the trace audit found no semantic/status contradiction but identified current navigation that still said validation was pending and a missing chronology entry for the provisional-hash invalidation, ADR-0014 Context correction, and revised-hash revalidation. Proposal-stage reconciliation closes those trace-only gaps without changing the ADR.

- Observation: fully qualifying the SQL call to `pg_catalog.convert_to` does not qualify the default conversion procedure that PostgreSQL may select internally.
  Evidence: PostgreSQL REL_18_4 calls `FindDefaultConversionProc` for nonempty source text when the database encoding differs from UTF8 and neither side is SQL_ASCII; that lookup traverses `activeSearchPath`. The equal-encoding UTF8 fast path avoids the lookup, while SQL_ASCII does not provide a sound exact-UTF8 identifier contract.

- Observation: exact current-database name binding and positive tuple provenance do not prove that the connected database is an admissible application database.
  Evidence: `template1` is normally connectable, arbitrary databases can be marked `datistemplate`, and `datistemplate`/`datallowconn` are mutable. The current two-buffer query checks neither flag and does not reject exact built-in `template0`/`template1`, so template databases can pass when trusted configuration designates them.

- Observation: all three renewed candidates prefer the same UTF8-only repair, but their controlled-conversion alternatives do not yet agree on SQL_ASCII.
  Evidence: exact bytes and OID reject SQL_ASCII because it is not a sound exact-UTF8 identifier boundary; restricted ASCII conditionally admits it for ASCII-only target names because PostgreSQL takes a special validation path. The analyst must normalize this disagreement and may not infer comparability from equal scores alone.

- Observation: one separate database preflight followed by identical five-field pre-lock and post-lock binds is smaller than carrying controlled conversion state through the transaction.
  Evidence: the analyst normalized SQL_ASCII to unsupported for the selected exact-byte contract, selected exact `UTF8`, false `datistemplate`, and true `datallowconn` assertions before the first `convert_to`, then required the same encoding/class evidence in both namespace observations. PostgreSQL therefore takes the equal-encoding fast path and cannot consult a default conversion through `activeSearchPath` in the selected contract.

- Observation: an SQL preflight cannot retroactively control PostgreSQL connection startup or decoding of the first SQL message.
  Evidence: PostgreSQL REL_18_4 processes startup options and database/role settings, initializes `search_path` and client encoding, and converts incoming query strings before executing the preflight. Current node-postgres startup serialization fixes `client_encoding=UTF8` while accepting an `options` startup parameter. The fourth correction must therefore own and verify trusted startup configuration instead of admitting an arbitrary already-open connection.

- Observation: the proportional startup invariant is no untrusted conversion, not zero conversion.
  Evidence: exact factory-owned startup `options=-c search_path=pg_catalog` constrains default-conversion lookup before query decoding, and the audited pure-JavaScript node-postgres serializer appends direct `client_encoding=UTF8` after generic startup fields. A correctly routed UTF8 database selects no conversion; a misdirected convertible database may use only a trusted `pg_catalog` built-in before forward preflight rejects it. Proving zero conversion would require a fresh database-specific pre-socket attestation control plane that this repository does not have.

- Observation: a private Sequelize pool of size one does not by itself guarantee one physical migration connection.
  Evidence: Sequelize 6.37.7 opens a separate direct version-bootstrap connection when its database version remains unknown before acquiring from the pool. The selected contract must suppress that path, permit only stock initialization/type work on the single guarded connection before the repository preflight, and leave exact locked-version API syntax and runtime proof to TASK-004.

- Observation: exact high-level target fields do not close low-level driver environment fallbacks that Sequelize never forwards.
  Evidence: pinned `pg@8.22.0` reads `PGREPLICATION`, `PGSSLNEGOTIATION`, and `PGAPPNAME` when their corresponding low-level values are absent. Sequelize 6.37.7 forwards `application_name` but not replication or SSL-negotiation fields. Ambient replication can change the startup packet/session mode before any SQL, so the fourth-correction claim that explicit descriptor fields precluded every other fallback was false.

- Observation: the pinned pure-JavaScript client-encoding environment spelling is `PGCLIENT_ENCODING`, not `PGCLIENTENCODING`.
  Evidence: `pg@8.22.0` `connection-parameters.js` reads `PGCLIENT_ENCODING`; the fifth-correction reports and final ADR retain `PGCLIENTENCODING` only as an upgrade-drift rejection fixture. This material discovery changed the selected guard and belongs in this living section.

- Observation: a truthy factory-owned password provider is required to keep the conditional `pgpass` branch unreachable.
  Evidence: pinned Client code enters `pgpass@1.0.5` only when the resolved password is null; the provider function closes over validated non-empty credential material, reads no environment/file/network state, and prevents `PGPASSFILE`, `PGPASS_NO_DEESCAPE`, `APPDATA`, and `HOME` from becoming credential inputs. This material discovery changed the selected factory contract and belongs in this living section.

- Observation: a factory-owned TLS `servername` does not necessarily survive the pinned node-postgres transport.
  Evidence: `pg@8.22.0` `connection.js` copies the supplied TLS object and then overwrites `options.servername` with every non-IP `host`; `stream.js` sends those effective options to `tls.connect`. A verified DNS host/name mismatch was therefore admitted by the fifth proposal but could not satisfy exact TLS identity. The direct correction requires a validated DNS host to equal the trusted DNS name exactly or an IP-literal host to carry the explicit trusted DNS name, and rejects every other relation before Sequelize construction.

- Observation: Windows PowerShell native-argument quoting and CRLF-sensitive assertions can produce validation-command false failures without an artifact defect.
  Evidence: two `node -e` attempts lost JavaScript string quotes at the native-process boundary, and one authority assertion initially required LF-only line endings in unchanged accepted ADRs. Piping the exact JavaScript through standard input and making the status assertion newline-neutral passed on the same bytes; the independent Python vector suite and every repository validator also passed.


- Observation: the broad exact-name/TLS profile is disproportionate to the repository's actual controlled local/CI deployment target.
  Evidence: the current repository exposes PostgreSQL only on loopback and still provisions historical `postgres:18.4-alpine`, has no remote migration deployment requirement, and the project owner explicitly selected the restrictive portfolio profile. TASK-004 must update that implementation pin to the currently selected compatible minor only after ADR approval and separate execution authorization. Historical numerical matrices remain research chronology; the current option comparison must use one symmetric qualitative baseline.

- Observation: `pg@8.22.0` and its pinned serializer split ownership of the StartupMessage fields relevant to encoding.
  Evidence: `Client.getStartupConf()` forwards exact `options` but does not add `client_encoding`; `pg-protocol@1.15.0` then appends the direct `client_encoding=UTF8` pair while serializing the StartupMessage. The current contract therefore supplies the same UTF8 value in factory-owned `options` and proves the serializer-appended pair separately. PostgreSQL receives both before authentication and applies startup GUCs after authentication but before `ReadyForQuery` and every Sequelize SQL statement; the admitted database/user values are restricted ASCII at the earlier authentication boundary.

- Observation: PostgreSQL 18.4 ceased to be an acceptable current implementation target when PostgreSQL 18.6 shipped as the latest PostgreSQL 18 security minor.
  Evidence: the official 18.6 announcement records fixes for 28 vulnerabilities and more than 110 bugs, the PostgreSQL project recommends the latest minor, and the official-image registry publishes `postgres:18.6-alpine`. The current profile is therefore 18.6/`180006`/`databaseVersion='18.6.0'`; the unchanged 18.4 Compose file is existing repository evidence and a future TASK-004 update, not proof of the selected proposal.

- Observation: a cross-option score is not credible when candidates are charged for different shared connection controls.
  Evidence: startup, opaque provenance, loopback/no-TLS transport, preflight, transaction, deadline, destruction, diagnostics, and recovery are common hard-gate repairs. The current comparison applies those controls identically and varies only identifier domain and identity material. ADR-0015 retains its own 92/100 whole-record evaluation, which is a different rubric use and not a claimed `88/92/77` option ranking.

- Observation: PostgreSQL can truncate startup database and user names before application SQL, so post-connect equality alone cannot enforce the configured identity domain.
  Evidence: REL_18_4 `backend_startup.c` truncates database and user fields to `NAMEDATALEN - 1`, and PostgreSQL's default maximum identifier length is 63 bytes. The current contract therefore rejects nonmatching and 64-byte values before opening a connection and verifies `current_user` plus `max_identifier_length` in the eight-field preflight.

- Observation: JavaScript structural typing cannot prove target provenance, but exact private object identity can.
  Evidence: clones, JSON, proxies, and lookalikes can reproduce public fields or brands. A private `WeakMap` keyed by a property-free frozen handle distinguishes only objects emitted by the two private issuer paths and makes every copied or wrapped object fail membership before Sequelize.

- Observation: node-postgres client query timeout is notification, not server-query cancellation.
  Evidence: pinned `pg@8.22.0` calls the query callback on timeout while an active server query may continue; ending a client with an active query destroys its stream. The current contract couples per-query remaining-time limits with mandatory physical socket destruction/pool removal, no SQL rollback, and result 2 on expiry or late success.

- Observation: PostgreSQL advisory locks with one bigint key are database-local.
  Evidence: `pg_locks` exposes the database OID for advisory locks and states that identical advisory identifiers in different databases are independent. The current contract limits collision-induced false serialization to distinct schemas within one database and requires cross-database non-contention proof.


## Decision Log


- Decision: Allocate TASK-018 as the dedicated DG-005 decision owner and start it immediately under the owner's decision-only authorization.
  Rationale: TASK-018 is the next collision-free task ID, and a task-scoped plan is required before the separately authorized decision workflow can execute.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Preserve TASK-004's existing dependencies and status; represent TASK-018 as a separate decision task whose eventual owner-approved ADR remains an additional approval join.
  Rationale: the owner expressly prohibited changing TASK-004 dependencies or starting migration work, and the canonical gate already defines DG-005 as a non-edge approval join.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Research exact catalog UTF-8 bytes, a deliberately restrictive portable ASCII namespace domain, and PostgreSQL catalog OIDs as three complete candidates.
  Rationale: this preserves the two choices explicitly required by DG-005 and supplies the second credible alternative required by ADR governance without revisiting the migration runner or expanding product scope.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Require both fresh IR-A and fresh IR-B.
  Rationale: namespace identity, canonical bytes, signed key derivation, transaction-level concurrency, connection ownership, failure, recovery, and cross-platform behavior independently trigger the repository's highest-risk decision checkpoints.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Advance `EXACT-CATALOG-BYTES` as the sole pre-draft recommendation, subject to fresh IR-A.
  Rationale: normalized analysis scored it 91/100 and found that it eliminates the NFC alias while preserving every exact persistent PostgreSQL name and logical name-to-key portability, without imposing the ASCII option's unrequired naming policy or the OID option's reconstruction-dependent identity.
  Date/Author: 2026-08-13 / Codex primary coordinator, recording the read-only decision analyst result.

- Decision: Historical and superseded: accept the then-supported outline correction `IR-A-OC-01` without reopening research or analysis.
  Rationale: at that point, the correction appeared to make selected temporary-schema rejection and signed PostgreSQL binding executable without a new identity source, serialization, lock mode, ownership model, recovery subsystem, candidate, or score change. Complete re-review later invalidated its namespace predicate; this entry preserves chronology and has no current authority.
  Date/Author: 2026-08-13 / Codex primary coordinator, reconciling fresh IR-A.

- Decision: Re-enter targeted research and normalized analysis after the corrected IR-A checkpoint remained `REVISE`.
  Rationale: the one supported outline correction is exhausted and the incomplete temporary-namespace classifier affects a decide-now catalog-admission rule. Repository policy prohibits silently appending a second outline correction; a source-grounded four-class predicate must return through research, analysis, and a new complete independent checkpoint.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Submit the source-grounded all-temporary byte-prefix candidate to renewed decision analysis without changing the selected identity, score, or drafting authority.
  Rationale: the targeted researcher found that the predicate mirrors PostgreSQL's internal `isAnyTempNamespace` byte semantics, rejects all four required temporary classes, preserves ordinary persistent schemas, and changes only the incomplete catalog-admission mechanic. A renewed analyst and new independent checkpoint must confirm that conclusion.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Accept the renewed analyst's `RETURN FOR RESEARCH` and reopen only operator resolution, exhaustive failure mapping, and symmetric OID catalog admission.
  Rationale: ambient operator lookup can invalidate fail-closed temporary rejection, leaving hard gates 2 and 11 and LOCK-INV-01/04/11/12 open. The 91/84/77 ranking remains provisional, but no namespace query is draft-authorizing until research chooses a source-grounded search-path-independent mechanism and applies the same standard to the OID candidate.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Submit local exact-prefix rejection with a fully qualified exact-byte bind query, plus the fully normalized OID report, to a new complete decision analysis.
  Rationale: both independent reports returned `READY FOR RE-ANALYSIS`, remove ambient operator lookup, use the same complete four-class temporary boundary, preserve common lifecycle and diagnostics, and leave option scores at 91 and 77 respectively. Analyst synthesis remains required before any checkpoint or ADR collision check.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Advance the fully qualified `EXACT-CATALOG-BYTES` contract to a new fresh IR-A checkpoint.
  Rationale: complete renewed analysis returned `DRAFT READY`, found all three candidates comparable, retained the normalized 91/84/77 ranking, closed every hard gate and invariant at the synthesis level, and found no decision semantic that TASK-004 would have to invent. ADR allocation remains prohibited until the independent checkpoint passes.
  Date/Author: 2026-08-13 / Codex primary coordinator, recording the read-only decision analyst result.

- Decision: Reconcile stale historical authority labels and the ExecPlan revision note, then obtain another complete fresh IR-A checkpoint.
  Rationale: fresh IR-A found the final contract technically sound but returned `REVISE` because two earlier sentences still described known-defective `IR-A-OC-01` as authoritative and the mandatory revision note did not summarize material re-entry. The smallest repair changes documentation authority labeling and chronology only; it does not change the selected contract or reopen research/analysis.
  Date/Author: 2026-08-13 / Codex primary coordinator, reconciling fresh IR-A.

- Decision: Authorize the post-checkpoint ADR collision check and primary Proposed successor drafting.
  Rationale: a distinct fresh IR-A returned `PASS` on the complete reconciled plan with no finding, confirmed the final contract as the sole authority, reproduced vectors, and passed every gate and invariant. This authorizes only collision checking and proposal drafting; it does not approve the decision, supersede ADR-0012, resolve DG-005, close TASK-018, change TASK-004, or authorize implementation.
  Date/Author: 2026-08-13 / Codex primary coordinator, reconciling fresh IR-A.

- Decision: Reconcile complete fresh final IR-B `PASS` and freeze exact ADR-0015 for project-owner consideration.
  Rationale: the correction-cycle reviewer closed both prior findings, found no new finding, passed every hard gate and invariant, and verified the exact proposal, complete diff, vectors, sources, lifecycle, authority matrix, negative scope, and validators. This permits only proposal presentation; it does not accept ADR-0015, supersede ADR-0012, resolve DG-005, close TASK-018, change TASK-004, or authorize implementation.
  Date/Author: 2026-08-13 / Codex primary coordinator, reconciling fresh final IR-B.

- Decision: Treat the post-PASS application-schema-domain finding as an owner-authorized material correction and re-enter research, synthesis, and fresh IR-A before changing ADR-0015.
  Rationale: namespace admission is explicitly decide-now, the current proposal admits system namespaces, and hard gate 11 prohibits approval readiness when a high-impact assumption is hidden. The prior PASS remains historical evidence, the already-used final-artifact correction count remains one, and this owner-authorized correction is the second and final bounded artifact correction cycle without resetting that count.
  Date/Author: 2026-08-13 / Project owner authorization, reconciled by Codex primary coordinator.

- Decision: Keep exact catalog bytes as a candidate, not a predetermined result, and require every candidate to separate identifier encoding from application-schema authorization.
  Rationale: rejecting exact lower-case `pg_` and exact `information_schema` excludes system/reserved namespaces without forcing an unrelated ASCII-only naming policy; all candidates still require symmetric analysis of positive application-schema provenance, permissions as defense in depth, score impact, and downstream proof.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Advance the renewed authorized-application-domain `EXACT-CATALOG-BYTES` contract at 91/100 to a new fresh IR-A checkpoint.
  Rationale: complete renewed analysis returned `DRAFT READY`, found the reports comparable, normalized privilege-query asymmetry without inventing implementation, retained the exact fully qualified three-equality/two-buffer bind, fixed the positive-provenance and system-schema boundaries, made rebind limitations precise, and passed all thirteen hard gates and fourteen invariants at synthesis/contract level. The repair receives no scoring credit, and ADR revision remains prohibited until IR-A passes.
  Date/Author: 2026-08-13 / Codex primary coordinator, recording the read-only decision analyst result.

- Decision: Reconcile the first renewed IR-A `REVISE` as one bounded documentation-only contract/outline correction, then repeat the complete checkpoint.
  Rationale: IR-A found no semantic or research defect and passed hard gates 1 through 10, 12, and 13. Its two Major findings concern artifact-local whole-record completeness and stale invariant evidence; its Minor concerns validator-safe rendering of a historical candidate grammar. The correction stays inside the owner-authorized second/final artifact-correction cycle, changes no option or score, and cannot authorize ADR revision until a new frozen complete IR-A passes.
  Date/Author: 2026-08-13 / Codex primary coordinator, reconciling fresh IR-A.

- Decision: Authorize primary revision of the existing Proposed ADR-0015 and proposal-stage synchronization only.
  Rationale: a distinct complete IR-A re-review returned `PASS` with no finding on the corrected frozen contract, confirmed all prior findings closed, and passed every hard gate and invariant at checkpoint level. ADR-0015 must remain Proposed and still requires integrated validation and a complete fresh IR-B before owner presentation.
  Date/Author: 2026-08-13 / Codex primary coordinator, reconciling fresh IR-A re-review.

- Decision: Provisionally freeze the validated corrected Proposed ADR-0015 for pre-freeze semantic audit before complete fresh final IR-B.
  Rationale: proportional repository/document/calculation/authority checks passed, but an auxiliary read-only audit remained useful before consuming the mandatory final checkpoint. That audit returned `REVISE` on SHA-256 `8FFFB0887C2572C8AF39D89B012F9D5422123B72798568C0011DDE25E521B306` because the whole-record text linked ADR-0014 without restating its current TASK-004 image constraint, so the provisional identity is non-authorizing.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Apply the pre-freeze audit's single artifact-local ADR-0014 carry-forward correction and repeat integrated validation before final IR-B.
  Rationale: the missing sentence was explicitly required by the IR-A-approved whole-record outline. Adding it changes no migration-lock semantics, score, lifecycle, status, dependency, implementation boundary, or acceptance-only specification authority, and therefore remains inside the already authorized primary revision rather than consuming another final-review correction cycle.
  Date/Author: 2026-08-13 / Codex primary coordinator, reconciling the read-only pre-freeze audit.

- Decision: Reconcile the trace audit before freezing the complete final-review packet.
  Rationale: the audit found one trace-only defect: several derived owners still described integrated validation as pending, and the append-only execution log omitted the provisional-hash invalidation, ADR-0014 Context correction, and revised-hash revalidation. Synchronizing current status and chronology changes no ADR byte or decision semantic and makes the exact integrated state reviewable.
  Date/Author: 2026-08-13 / Codex primary coordinator, reconciling the read-only trace audit.

- Decision: Freeze corrected ADR-0015 and the complete post-trace integrated packet for fresh final IR-B.
  Rationale: every required pre-final checkpoint and complete integrated check passes after the artifact-local and trace-only corrections. The frozen ADR identity is exact, all fourteen invariants have current pre-IR-B evidence, and no owner-controlled state or implementation boundary changed. The reviewer receives the post-append ExecPlan hash externally because a document cannot contain its own stable byte hash.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Reconcile complete fresh final IR-B `PASS` and present only exact Proposed ADR-0015 for project-owner approval.
  Rationale: the independent reviewer verified both frozen hashes and complete ten-file state, found no Blocker/Major/Minor, passed every hard gate and invariant, independently reproduced validators/vectors/sources/state/negative scope, and explicitly authorized only byte-preserving post-verdict reconciliation plus owner presentation. The verdict does not authorize acceptance, reciprocal supersession, DG-005 resolution, TASK-018 closure, TASK-004 start, dependency changes, or implementation.
  Date/Author: 2026-08-13 / Codex primary coordinator, reconciling complete fresh final IR-B.

- Decision: Reopen the proposal for one owner-authorized third bounded correction and invalidate the second PASS/hash as approval authority.
  Rationale: the project owner explicitly directed implementation of the proposed encoding and application-database-class remedies after the normal two-cycle allowance was exhausted. The named correction includes comparable research, renewed analysis, fresh IR-A, primary revision, integrated validation, and exactly one fresh final review; it does not imply another general correction budget.
  Date/Author: 2026-08-13 / Project owner authorization, reconciled by Codex primary coordinator.

- Decision: Compare UTF8-only preflight with transaction-local controlled `search_path` symmetrically rather than predetermine the encoding repair.
  Rationale: both can close the internal default-conversion lookup under different preconditions. The first is smaller and fail-closed but excludes non-UTF8 databases; the second preserves more encodings but introduces mutable transaction state and qualification/restore constraints. The analyst must select exact ordering, result shape, diagnostics, and fixtures before ADR revision.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Advance all three third-correction reports to renewed decision analysis without treating their matching UTF8 recommendations as synthesis.
  Rationale: all reports returned `READY FOR RE-ANALYSIS` and retained 91/84/77, but their preflight query shapes, diagnostic labels, post-lock encoding observations, and SQL_ASCII treatment require one normalized selected contract. ADR-0015 remains byte-identical and non-authorizing until the analyst and fresh IR-A pass.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Advance the third-correction `EXACT-CATALOG-BYTES` plus UTF8-only application-database contract to one fresh complete IR-A before editing ADR-0015.
  Rationale: the read-only decision analyst returned exactly `DRAFT READY`, normalized SQL_ASCII to unsupported, retained 91/84/77 without repair credit, fixed one immediate three-field database preflight and identical five-field pre/post namespace observations, made database-class/encoding result validation and diagnostics exhaustive, and passed all fourteen hard gates and fifteen invariants at synthesis/contract level. Controlled transaction-local conversion remains a reversal path only if a present non-UTF8 requirement emerges.
  Date/Author: 2026-08-13 / Codex primary coordinator, recording the read-only decision analyst result.

- Decision: Reconcile third-correction IR-A `REVISE` as one trace-only primary-source correction and repeat the complete checkpoint before editing ADR-0015.
  Rationale: IR-A independently confirmed the selected UTF8/database-class semantics, all fourteen hard gates, and LOCK-INV-02 through LOCK-INV-15, but found that the decisive PostgreSQL source files and template documentation were asserted without durable artifact-local citations. Explicitly incorporating the exact common source set into all three reports and the mapped ADR References is inside the authorized trace remediation, adds no mechanic, and requires neither new research nor owner direction.
  Date/Author: 2026-08-13 / Codex primary coordinator, reconciling fresh IR-A.

- Decision: Authorize primary revision of existing Proposed ADR-0015 and proposal-stage synchronization under the corrected third-correction contract.
  Rationale: complete fresh IR-A re-review verified the corrected frozen hash, closed the sole prior source-trace finding, found no Blocker/Major/Minor, and passed all fourteen hard gates and fifteen invariants. The authorization is limited to the reviewed UTF8/database-class correction and whole-record synchronization; integrated validation and one different complete fresh IR-B remain mandatory before owner presentation.
  Date/Author: 2026-08-13 / Codex primary coordinator, reconciling fresh IR-A re-review.

- Decision: Primary-revise existing Proposed ADR-0015 under the third-correction IR-A `PASS` and synchronize proposal-stage owners only.
  Rationale: the revision implements exactly the reviewed UTF8 preflight, database-class/name checks, five-field observations, result validation, diagnostics, fixtures, risks, and source trace while preserving the selected identity, option scores, v1 prohibition, whole-record carry-forward, owner-controlled lifecycle, task graph, and no-implementation boundary. Integrated validation and one different complete fresh IR-B remain mandatory.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Present byte-identical Proposed ADR-0015 SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69` for exact project-owner approval.
  Rationale: one different complete fresh IR-B independently verified the frozen ADR, ExecPlan and HEAD, returned `PASS` with no Blocker/Major/Minor, and passed all fourteen hard gates, fifteen invariants, primary-source checks, validators, vectors, authority/dependency states, and negative implementation scope. This reconciliation changes no ADR byte or owner-controlled lifecycle state.
  Date/Author: 2026-08-13 / Codex primary coordinator, reconciling fresh final IR-B.

- Decision: Reopen the proposal for one owner-authorized fourth bounded correction and invalidate the third PASS/hash as approval authority.
  Rationale: a later source-grounded review proved that the three-field SQL preflight runs after connection-startup encoding/search-path work and after the first query text can already be converted. The project owner selected the practical startup-controlled connection direction for the personal-portfolio context and authorized the necessary correction workflow. The named correction includes comparable research, renewed analysis, fresh IR-A, primary revision, integrated validation, and exactly one different fresh final review; it creates no general correction budget.
  Date/Author: 2026-08-13 / Project owner direction and authorization, reconciled by Codex primary coordinator.

- Decision: Research a dedicated startup-guarded migration connection as the owner-selected value direction without treating its exact mechanics as pre-approved.
  Rationale: the practical direction can fix `client_encoding` and `search_path` before any SQL while retaining the current post-connect database/schema checks. Comparable reports must still establish PostgreSQL and driver precedence, decide whether the invariant forbids every conversion or only untrusted conversion, define which ambient/URL/borrowed inputs are rejected, and compare stronger provisioning-only and broader multi-encoding alternatives before the analyst may return `DRAFT READY`.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Advance all three fourth-correction startup-control reports to renewed decision analysis without treating the owner's value direction or the researchers' matching recommendation as synthesis.
  Rationale: all reports returned `READY FOR RE-ANALYSIS`, independently establish the pre-first-SQL startup boundary, and expose distinct trust/proportionality costs. The analyst must normalize the exact five-field preflight, private Sequelize/pure-JavaScript session boundary, no-untrusted-conversion invariant, diagnostic precedence, interface carry-forward, score treatment, and all fifteen gates/sixteen invariants before IR-A or ADR revision.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Advance `STARTUP-GUARDED-UTF8-ONLY` with unchanged `EXACT-CATALOG-BYTES` identity to one fresh complete IR-A before editing ADR-0015.
  Rationale: the read-only decision analyst returned exactly `DRAFT READY`, normalized the startup alternatives to 91/73/79 without changing the identity comparison of 91/84/77, froze the no-untrusted-conversion invariant, closed target/factory/session eligibility, required suppression of Sequelize's version-bootstrap connection, fixed the five-field startup/database preflight and diagnostic precedence, and passed all fifteen hard gates and sixteen invariants at synthesis/contract level. Runtime proof remains TASK-004; ADR revision remains prohibited until fresh IR-A passes.
  Date/Author: 2026-08-13 / Codex primary coordinator, recording the read-only decision analyst result.

- Decision: Reconcile fourth-correction IR-A `REVISE` as the one allowed source-trace correction, then repeat the complete checkpoint before editing ADR-0015.
  Rationale: IR-A independently passed every decision semantic, all hard gates except evidence-completeness gate 11, and every invariant except the same source-trace-dependent coverage/ownership/portability/startup cells. Adding the exact Sequelize 6.37.7 abstract connection-manager source to Reports A/B/C proves the already selected separate version-bootstrap connection and suppression obligation without changing the mechanism. A distinct complete re-review remains mandatory.
  Date/Author: 2026-08-13 / Codex primary coordinator, reconciling fresh IR-A.

- Decision: Authorize and complete primary revision of existing Proposed ADR-0015 after distinct fourth-correction IR-A `PASS`.
  Rationale: complete re-review of corrected frozen ExecPlan `FD27155965B4FAEA3001C9277CD81EAB025CE2FA124AED9D0E0B61C90F3E6AB8` confirmed the source-trace defect closed, found no Blocker/Major/Minor, and passed all fifteen hard gates and sixteen invariants. Primary revision is limited to the reviewed startup-control correction and proposal-stage synchronization; integrated validation and one different complete fresh IR-B remain mandatory.
  Date/Author: 2026-08-13 / Codex primary coordinator, recording the read-only IR-A re-review and primary revision.

- Decision: Freeze corrected Proposed ADR-0015 for the sole fourth-correction final IR-B after pre-freeze audit and integrated validation.
  Rationale: the read-only audit found and the primary corrected only stale whole-record/ownership trace wording, then passed the complete documentation, ADR, diff, hygiene, two-runtime vector, protected-authority, dependency, state, and negative-implementation barrier. Exact ADR SHA-256 `6AD00C9533849CFAA5C793B23B3DEF5C633AAB2D4FE3D577CCA5C2B0D9DF90B6` is now immutable for review. A Blocker or Major from the one remaining final IR-B returns to owner direction; no general correction budget exists.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Present exact fourth-correction Proposed ADR-0015 for project-owner approval after final IR-B `PASS`.
  Rationale: one different complete fresh IR-B independently verified frozen ADR SHA-256 `6AD00C9533849CFAA5C793B23B3DEF5C633AAB2D4FE3D577CCA5C2B0D9DF90B6`, frozen ExecPlan SHA-256 `DF1413C902939DC68E4E2251F5F596C474DA1B3138FE6E5196E5A4E04EBA9AFC`, and HEAD; found no Blocker, Major, or Minor; passed all fifteen hard gates and sixteen invariants; repeated the full validation barrier; and confirmed the bytes unchanged. Post-verdict reconciliation does not change the ADR, accept it, resolve DG-005, close TASK-018, start TASK-004, change dependencies, or authorize implementation. Explicit owner approval is the sole current decision action.
  Date/Author: 2026-08-13 / Codex primary coordinator, reconciling final IR-B.

- Decision: Reopen the proposal for one owner-authorized fifth bounded correction and invalidate the fourth PASS/hash as approval authority.
  Rationale: the latest source-grounded review proved that `PGREPLICATION`, `PGSSLNEGOTIATION`, and `PGAPPNAME` remain live at the pinned node-postgres boundary when Sequelize supplies no exact override, contradicting the closed-factory and disabled-replication claims before any SQL can run. The project owner explicitly authorized the necessary blocking and documentation repairs and retained the practical portfolio direction. The named correction covers complete pinned-driver environment closure, affected diagnostics/fixtures/reversal triggers, the stale validation/system-diagram state, comparable research, renewed analysis, fresh IR-A, primary revision, integrated validation, and one different fresh final review; it creates no general correction budget.
  Date/Author: 2026-08-13 / Project owner authorization, reconciled by Codex primary coordinator.

- Decision: Advance all three fifth-correction environment-closure reports to renewed decision analysis without treating their scores or matching preference as synthesis.
  Rationale: the pinned in-process guard, sanitized subprocess, and closure-bound low-level adapter all returned `READY FOR RE-ANALYSIS` under the same sixteen-gate/seventeen-invariant contract. They score 91/83/76 without repair credit and expose distinct same-process-mutation, child-process/IPC, and custom-adapter maintenance costs. The analyst must normalize the exact environment inventory, factory-owned values, password-file bypass, TLS/replication/application-name treatment, process trust boundary, fixtures, and whole-record outline before IR-A or ADR revision.
  Date/Author: 2026-08-13 / Codex primary coordinator.

- Decision: Advance `PINNED-ENVIRONMENT-GUARD` to one complete fresh IR-A before editing ADR-0015.
  Rationale: the read-only decision analyst returned exactly `DRAFT READY`, normalized the fifth-correction alternatives to 91/83/76 without repair credit, fixed the complete trusted target and TLS union, exact stock Sequelize/pure-JavaScript `pg` factory values, credential-provider and pgpass exclusion, prohibited environment set, two-check boundary, trusted-process premise, stable diagnostics, downstream proof, reversal triggers, and whole-record ADR outline, and passed all sixteen hard gates and seventeen invariants at synthesis level. The subprocess remains the explicit reversal if adversarial same-process mutation enters scope; the adapter remains disproportionate. ADR revision remains prohibited until fresh IR-A passes.
  Date/Author: 2026-08-13 / Codex primary coordinator, recording the read-only decision analyst result.

- Decision: Reconcile fifth-correction IR-A `REVISE` as the one supported artifact-local invariant-evidence correction, then repeat the complete checkpoint before editing ADR-0015.
  Rationale: IR-A found no semantic, research, authority, dependency, or implementation defect and passed every hard gate at semantic level. Its sole Major is that the live validation clause stopped at LOCK-INV-16 and all cumulative evidence cells still described the fourth cycle. Advancing the clause to LOCK-INV-17 and refreshing every cell with the current fifth-cycle evidence changes no decision mechanic. A complete fresh re-review remains mandatory.
  Date/Author: 2026-08-13 / Codex primary coordinator, reconciling fresh IR-A.

- Decision: Authorize and complete primary revision of existing Proposed ADR-0015 after complete fifth-correction IR-A re-review `PASS`.
  Rationale: complete re-review of corrected frozen ExecPlan `C7A2DABB1DC1BF99E8D202B7BCD11D9FAB16316D349713AE311C3201D2BCA838` confirmed the sole cumulative-evidence Major closed, found no Blocker/Major/Minor, and passed all sixteen hard gates and seventeen invariants. Primary revision is limited to the reviewed pinned environment guard and proposal-stage synchronization; integrated validation and one different complete fresh IR-B remain mandatory.
  Date/Author: 2026-08-13 / Codex primary coordinator, recording fresh IR-A re-review and primary revision.

- Decision: Freeze the fifth-correction proposal for one different complete fresh final IR-B after the integrated barrier passed.
  Rationale: exact ADR SHA-256 `215E31D6E78DBFA0879D916DDDAD75BA0E4E63943FC9B458DDDEE0DAA11C576C` passed both repository validators, diff and strict-byte hygiene, independent Node/Python vector suites, protected-authority, exact scope/state/dependency/v1, structured-dependency, and negative-runtime checks. This creates an IR-B target only; it does not approve the ADR or change any lifecycle, gate, task, dependency, specification, or implementation state.
  Date/Author: 2026-08-13 / Codex primary coordinator, recording integrated validation.

- Decision: Reconcile the fifth final IR-B as `REVISE` and invalidate exact ADR SHA-256 `215E31D6E78DBFA0879D916DDDAD75BA0E4E63943FC9B458DDDEE0DAA11C576C` as an approval target.
  Rationale: the reviewer reproduced the pinned `connection.js` non-IP-host overwrite of TLS `servername`, mapped it through `stream.js` to `tls.connect`, and showed that an admitted DNS host/name mismatch violates hard gates 11 and 16 plus LOCK-INV-01 and LOCK-INV-17. The review also found contradictory current-stage routing and two living-plan chronology defects. Stable hashes at the start and end ruled out concurrent repository writes as the cause.
  Date/Author: 2026-08-13 / Codex primary coordinator, reconciling complete fresh final IR-B.

- Decision: Apply the named correction directly in the primary thread, without the agent workflow, and preserve the independent-review boundary as unsatisfied.
  Rationale: the project owner explicitly authorized direct repair of the immediately preceding TLS/SNI and trace findings. The smallest complete TLS rule admits verified TLS only when a validated DNS `host` equals `servername` exactly or when an IP-literal `host` carries the explicit trusted DNS `servername`; every unsupported relation rejects locally with `MIGRATION_STARTUP_CONFIG_INVALID` before Sequelize, Client, socket, TLS, or SQL. The direct edit also synchronizes current fifth-review history, routing, chronology, and living discoveries. This owner direction authorizes the edits but does not accept ADR-0015, resolve DG-005, close TASK-018, start TASK-004, or create implementation evidence.
  Date/Author: 2026-08-13 / Project owner direction, reconciled by Codex primary coordinator.

- Decision: Select `RESTRICTED-ASCII-DOMAIN` and replace the broad connection profile with the supplied exact controlled portfolio profile through a direct documentation-only revision.
  Rationale: the project owner explicitly selected the restrictive profile after finding the broad Unicode/TLS/driver surface disproportionate to local/CI needs. The supplied plan fixes versions, pre-connection identifiers, opaque `WeakMap` provenance, loopback/TLS-disabled transport, blanket `PG*` rejection, the eight-field preflight, two text binds, five vectors, destructive query deadlines, and database-local collision semantics. This materially invalidates historical SHA-256 `9B90D8BF366E83E038F53AFA5D520B28786F9C768B765B8FA45EC34D4A4C1528`; it authorizes only direct proposal/plan/navigation edits and primary validation, not independent review, acceptance, gate resolution, task closure, TASK-004 start, or implementation.
  Date/Author: 2026-08-14 / Project owner direction, reconciled by Codex primary coordinator.

- Decision: Freeze exact restricted-profile Proposed ADR-0015 for fresh independent exact-artifact review after the primary integrated barrier passed.
  Rationale: exact SHA-256 `B38F26ED48A99CFB0D4FA99A1973637B4C9ED66AC6122598FB093A13AA3B4EC9` reconciled all twenty current hard gates and LOCK-INV-01 through LOCK-INV-21 at primary contract level and passed both repository validators, `git diff --check`, strict ten-path UTF-8/LF hygiene, Node.js 24.18.0 and Python 3.12.10 five-vector/framing/domain checks, protected ADR/SPEC preservation, exact documentation-only scope, lifecycle and dependency checks, structured dependency absence, and negative runtime-v2/migration scope. The hash is an independent-review target only; it does not approve the ADR, resolve DG-005, close TASK-018, start TASK-004, change dependencies, or create implementation evidence.
  Date/Author: 2026-08-14 / Codex primary coordinator, recording integrated validation.

- Decision: Reconcile the independent review of restricted-profile SHA-256 `B38F26ED48A99CFB0D4FA99A1973637B4C9ED66AC6122598FB093A13AA3B4EC9` as `REVISE` and retire it as an approval target.
  Rationale: the exact review showed that the proposal did not make the split startup-encoding mechanism falsifiable, pinned an obsolete PostgreSQL 18.4 security minor, and presented current identity scores derived from unequal shared assumptions. Passing hashes, vectors, hygiene, and validators cannot override those semantic hard-gate failures.
  Date/Author: 2026-08-14 / Codex primary coordinator, reconciling independent review.

- Decision: Repair the three authorized findings with redundant same-value startup controls, PostgreSQL 18.6, and a symmetric qualitative identity comparison.
  Rationale: exact factory `options="-c client_encoding=UTF8 -c search_path=pg_catalog"` is forwarded by `getStartupConf()`, and pinned `pg-protocol` separately appends direct `client_encoding=UTF8`; TASK-004 must prove the ordered packet and pre-SQL effect. PostgreSQL 18.6 is the current security minor and fixes the profile at `postgres:18.6-alpine`, `databaseVersion='18.6.0'`, and `server_version_num=180006`. All candidates now share the same connection/control baseline, so only their identity-domain/material differences are compared. This direct correction does not accept the ADR or authorize implementation.
  Date/Author: 2026-08-14 / Project owner direction, reconciled by Codex primary coordinator.

- Decision: Freeze the corrected PostgreSQL 18.6 proposal for fresh independent exact-artifact review after the new primary integrated barrier passed.
  Rationale: exact Proposed ADR-0015 SHA-256 `E649A26C334C16BC0B3800ECCB07C2F315F176EC0896C60D72E843765355B3E6` closes the three authorized findings at contract level and passes all twenty hard gates, LOCK-INV-01 through LOCK-INV-21, both repository validators, `git diff --check`, strict ten-path hygiene, exact two-runtime vectors, protected-file preservation, exact scope, lifecycle/dependency checks, structured dependency absence, and negative runtime-v2/migration scope. The hash is a review target only and changes no authority or implementation state.
  Date/Author: 2026-08-14 / Codex primary coordinator, recording integrated validation.

- Decision: Treat the exact review of SHA-256 `E649A26C334C16BC0B3800ECCB07C2F315F176EC0896C60D72E843765355B3E6` as `REVISE` and apply the owner's two named precision corrections directly.
  Rationale: the numerical statement in this living contract contradicted its required qualitative comparison, and “before initialization” did not identify the proven PostgreSQL protocol boundary precisely enough. Removing the current numerical ranking and spelling out the after-authentication/before-GUC-initialization/`ReadyForQuery`/SQL sequence repairs documentation claims only; it changes no selected architecture, score, task state, dependency, or implementation.
  Date/Author: 2026-08-14 / Project owner direction, reconciled by Codex primary coordinator.

- Decision: Freeze the precision-corrected proposal for fresh independent exact-artifact review after the complete primary integrated barrier passed.
  Rationale: exact Proposed ADR-0015 SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1` removes both residual defects and passes all twenty hard gates, LOCK-INV-01 through LOCK-INV-21, both repository validators, `git diff --check`, strict ten-path hygiene, exact two-runtime vectors, protected-file preservation, exact scope, lifecycle/dependency checks, structured dependency absence, and negative runtime-v2/migration scope. The hash is a review target only and changes no authority or implementation state.
  Date/Author: 2026-08-14 / Codex primary coordinator, recording integrated validation.

- Decision: Accept exact reviewed ADR-0015 and complete the reciprocal lifecycle transition without starting TASK-004.
  Rationale: fresh independent exact-artifact review returned `PASS` with no Blocker, Major, or Minor across all twenty hard gates and LOCK-INV-01 through LOCK-INV-21 on exact proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1`, and the project owner explicitly approved those bytes. Acceptance makes ADR-0015 the current whole-record migration-lifecycle authority, supersedes ADR-0012, resolves DG-005, and completes TASK-018. It is not migration implementation evidence and provides no TASK-004 execution authorization.
  Date/Author: 2026-08-14 / Project owner approval, reconciled by Codex primary coordinator.


## Outcomes & Retrospective


TASK-018 is complete. The owner-selected `RESTRICTED-ASCII-DOMAIN` contract for controlled local/CI PostgreSQL passed primary validation and fresh independent exact-artifact review on proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1`; the review reported no Blocker, Major, or Minor and passed all twenty hard gates and LOCK-INV-01 through LOCK-INV-21. The project owner explicitly approved those exact bytes on 2026-08-14. ADR-0015 is `Accepted`, ADR-0012 is `Superseded`, DG-005 is `Resolved`, and this plan is preserved as completed evidence. TASK-004 remains `Pending` with exactly TASK-002 and TASK-003 as dependencies because separate execution authorization has not been given. No migration implementation or runtime proof exists.

Complete fresh correction-cycle IR-B historically returned `PASS` with no finding on ADR-0015 SHA-256 `E40390F66B6C0B21D3BF9C17739D3AD9D105ECE4D08A36BEF955AA777F53B741`. Initial corrected SHA-256 `8FFFB0887C2572C8AF39D89B012F9D5422123B72798568C0011DDE25E521B306` remained non-authorizing after its pre-freeze whole-record omission, second corrected SHA-256 `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3` became non-authorizing after the encoding/database-class findings, third corrected SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69` became non-authorizing after the startup-path finding, fourth corrected SHA-256 `6AD00C9533849CFAA5C793B23B3DEF5C633AAB2D4FE3D577CCA5C2B0D9DF90B6` became non-authorizing after the ambient-fallback finding, fifth corrected SHA-256 `215E31D6E78DBFA0879D916DDDAD75BA0E4E63943FC9B458DDDEE0DAA11C576C` received final `REVISE`, and direct TLS/SNI SHA-256 `9B90D8BF366E83E038F53AFA5D520B28786F9C768B765B8FA45EC34D4A4C1528` became historical when the owner selected the restricted profile. All remain preserved point-in-time evidence.


## Purpose / Big Picture


TASK-018 replaced ADR-0012's non-injective NFC migration-lock identity with an exact, versioned, restricted-ASCII, catalog-bound PostgreSQL database/schema identity for the controlled local/CI portfolio. A reviewer can inspect the preserved three-candidate history, the owner-selected addendum, deterministic identity vectors, the exact independent `PASS`, and accepted whole-record ADR-0015. The accepted decision defines semantics that TASK-004 may later prove through real PostgreSQL integration TDD, but it creates no migration runner, migration, dependency, database-backed test, schema, or ERD.

Success was achieved when exact reviewed proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1` received explicit project-owner approval and the reciprocal lifecycle/documentation closure passed. It means ADR-0015 is accepted, ADR-0012 is superseded, DG-005 is resolved, and TASK-018 is complete. It does not start TASK-004, which still requires separate execution authorization.


## Context and Orientation


The root `README.md` is the documentation entry point and current-state owner. `docs/FULL_STACK_TECHNICAL_ASSESSMENT.md` and `docs/REQUIREMENTS.md` require Sequelize migrations over PostgreSQL, deterministic initialization, and delivery evidence; they do not choose a migration lock identity. `docs/adrs/README.md` owns portfolio state and scoring. `docs/IMPLEMENTATION_PLAN.md` owns DG-005, task identities, dependencies, and status. `docs/SYSTEM_DIAGRAM.md` remains a derived target view.

Now-Superseded ADR-0012 historically defined the build-first programmatic Umzug 3 and Sequelize 6 lifecycle, immutable emitted ESM artifacts, checksummed history, whole-command transactions, bounded rollback, lock-before-history ordering, and transaction-level advisory locking. Its lock payload used the literal `rick-and-morty-explorer:migrations:v1` plus NFC-normalized database and schema strings. TASK-016 review proved that NFC aliases valid distinct composed and decomposed PostgreSQL names. Accepted ADR-0015 carries forward the unaffected lifecycle and replaces that identity with the owner-approved v2 contract. DG-005 is resolved; TASK-004 remains unstarted pending separate execution authorization.

Accepted ADR-0002 preserves strict TypeScript, native ESM, runtime validation, and explicit concurrency. ADR-0003 selects PostgreSQL and migration-only application-schema evolution. ADR-0008 keeps network import outside migrations. ADR-0010 requires real-boundary TDD for later behavior. ADR-0011 owns isolated PostgreSQL namespaces and cleanup. ADR-0014 owns the current image-URL persistence constraint that TASK-004 must preserve. HS-002 requires future migration work to use ADR-0012 plus the accepted DG-005 successor; SPEC-010 and HS-011 keep all migration and schema behavior unimplemented until TASK-004.

In this plan, a namespace is the exact admitted current PostgreSQL database plus target schema used by one migration command. An advisory key is the signed 64-bit value supplied to PostgreSQL's transaction-level advisory-lock function. Because PostgreSQL advisory locks are database-local, a false serialization is a safe availability loss only when two distinct schema payloads inside one database project to the same 64-bit key and wait unnecessarily. Equal keys in different databases never contend, and a collision is never permission for the same schema to run concurrently.


## Scope and Non-Goals


In scope:

- compare three complete namespace identity contracts under identical criteria;
- distinguish an existing persistent namespace from an authorized non-template, connectable application database and application schema, and define fail-closed database/schema exclusions shared by every candidate;
- select the exact compatibility profile, restricted 63-byte ASCII database/schema/user domain, opaque issuer provenance, authoritative text catalog binding, UTF8/PostgreSQL/user/identifier/class preflight, exact bytes, length framing, v2 literal, digest projection, signed `bigint` binding, and database-local collision semantics;
- select a loopback-only TLS-disabled startup contract with fixed client encoding, `search_path`, application name, timeout, binary and database version, blanket `PG*` rejection, pgpass non-entry, and exclusion of arbitrary remote, URL, native, caller, configured, or borrowed sessions;
- define same-schema serialization, disjoint same-database overlap, cross-database non-contention, transaction/session ownership, per-query bounded deadline, physical destruction, release, interruption, ambiguous-outcome recovery, diagnostics, and downstream proof;
- carry forward every unaffected ADR-0012 clause and prepare reciprocal whole-record successor metadata; and
- integrate one collision-safe `Proposed` ADR only after research, analysis, and fresh IR-A pass, then stop after fresh final review and reconciliation.

Out of scope:

- changing the assessment, requirements, optional-scope disposition, DG-002 history, or TASK-002 closure;
- editing accepted ADR-0012 before owner approval or describing it as already superseded;
- reusing or reinterpreting `rick-and-morty-explorer:migrations:v1`;
- changing TASK-004's dependencies, status, ExecPlan implementation scope, or execution authorization;
- adding or changing dependencies, manifests, lockfiles, application or test source, migration configuration, migrations, database-backed tests, commands, models, schemas, data, or ERDs;
- accepting the successor, resolving DG-005, closing TASK-018, or starting TASK-004 without later explicit owner approval; and
- revisiting the build-first Umzug/Sequelize lifecycle except where the new lock identity must replace a conflicting ADR-0012 clause.


## Plan of Work


Milestone 1 registers TASK-018, this active ExecPlan and contract, the unchanged TASK-004 dependency boundary, current status, specification routing, and chronology. It passes when task/plan IDs are unique, both documentation validators and `git diff --check` pass, and negative implementation checks remain clean.

Milestone 2 assigns one read-only `technology_researcher` to each candidate. Every researcher receives this same contract and must use repository authorities plus current primary PostgreSQL, Node.js, and driver documentation. Reports must distinguish official guarantees, repository constraints, reproducible calculations, and inference; define a complete end-to-end contract; score the same rubric; preserve the forbidden scope; and make no repository write.

Milestone 3 waits for all durable reports, then gives the complete set and this contract to `decision_analyst`. The analyst audits comparability, normalizes scores, maps every hard gate and invariant, separates decide-now from prove-later work, ranks the options, supplies dissent and a mapped ADR outline, and returns exactly `DRAFT READY`, `RETURN FOR RESEARCH`, or `OWNER DIRECTION`.

Milestone 4 gives a fresh `independent_reviewer` the complete pre-draft packet. Because all identity/concurrency risk triggers apply, only a complete checkpoint `PASS` permits drafting. One supported outline correction is allowed; a new normative mechanic re-enters research and analysis.

Milestone 5 begins only after `DRAFT READY` and fresh IR-A `PASS`. The primary rechecks every ADR file and stable ID, allocates the next unused four-digit number, drafts the reciprocal successor as `Proposed`, and synchronizes proposal/current-review documentation without changing accepted authority, DG-005, TASK-018, or TASK-004 state.

Milestone 6 gives a different fresh `independent_reviewer` the exact complete artifact, diff, reports, contract, and invariant packet. The primary applies at most two supported bounded correction cycles, reruns complete review after each material revision, performs the post-verdict reconciliation barrier, and stops for project-owner approval. Approval and closure are explicitly outside the current authorization endpoint.

The historical owner-authorized fourth correction re-entered Milestones 2 through 6 only for trusted connection startup, client-encoding and `search_path` precedence before the first SQL, the permitted conversion invariant, dedicated/borrowed session eligibility, the affected preflight/ownership/diagnostic/fixture contract, and affected trace. Its completed review evidence is preserved but is not current authority.

The historical owner-authorized fifth correction re-entered Milestones 2 through 6 only for complete pinned-driver environment-fallback closure before physical connection construction, exact factory-owned values where Sequelize forwards them, rejection of unforwarded ambient startup/session controls, affected diagnostics/fixtures/reversal triggers, and stale review-state text. Its final IR-B returned `REVISE`, so its exact hash and checkpoint are non-authorizing.

The owner-authorized portfolio correction followed the supplied plan directly without workers. It replaced the prior broad selected profile with restricted ASCII, exact versions, opaque `WeakMap` provenance, loopback/TLS-disabled transport, blanket `PG*` rejection, eight-field preflight, text binds, five vectors, destructive deadline enforcement, and database-local collision semantics. Exact proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1` then passed fresh independent review and received explicit owner approval. Reconciliation accepted ADR-0015, superseded ADR-0012, resolved DG-005, and closed TASK-018 without starting TASK-004, changing its dependencies, or implementing migrations.


## Decision Review Contract


### Authority, artifact, and approval boundary


- Owning task: TASK-018, `Complete`.
- Controlled gate: DG-005, `Resolved`.
- Approved artifact: accepted ADR-0015, reviewed as exact Proposed SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1`. Fresh independent review returned `PASS` with no finding across all twenty gates and twenty-one invariants, and the project owner explicitly approved those bytes on 2026-08-14. Earlier hashes and verdicts remain historical and non-authorizing.
- Historical authorities: ADR-0012 is `Superseded`; DG-002 remains historically `Resolved`; TASK-002 and TASK-003 remain `Complete`; TASK-004 remains `Pending` with exactly its current dependencies.
- Approval boundary: crossed only for ADR-0015 acceptance, reciprocal ADR-0012 supersession, DG-005 resolution, and TASK-018 closure. TASK-004 still requires separate project-owner execution authorization.
- Forbidden scope: any implementation artifact, `migrations:v1` semantic reuse, premature ADR allocation, accepted-record rewrite, gate resolution, task closure, TASK-004 dependency/status change, or migration work.


### Candidates


| Candidate | Required complete shape |
|---|---|
| `EXACT-CATALOG-BYTES` | Admit only an authorized non-template, connectable application database and authorized persistent application schema; compare UTF8-only preflight with transaction-local controlled conversion lookup; reject system/reserved targets; bind the configured database/schema to exactly one current PostgreSQL catalog identity; obtain exact bytes without Unicode normalization or case folding; frame them with the new literal; and project the digest to a signed 64-bit advisory key. |
| `RESTRICTED-ASCII-DOMAIN` | Admit only an authorized non-template, connectable application database and authorized persistent application schema within an explicit portable ASCII database/schema grammar; compare the same encoding controls; independently reject invalid database/schema classes before history access or mutation; bind accepted configured names to exact catalog identities; and derive the key from accepted exact bytes under the new literal. |
| `CATALOG-OID-PAIR` | Admit only an authorized non-template, connectable application database and authorized persistent application schema; compare the same encoding controls needed for exact-name catalog binding; reject invalid database/schema classes; bind the current database and schema to PostgreSQL catalog object identifiers; and derive or directly bind a transaction advisory identity while defining recreation, dump/restore, cross-cluster, diagnostic, and test-fixture consequences. |

NFC reuse is a known-invalid control, not a fourth credible candidate. A report may use it only to demonstrate the defect and must not score it as selectable.

The current owner-selected outcome is `RESTRICTED-ASCII-DOMAIN` for controlled local/CI PostgreSQL. `EXACT-CATALOG-BYTES` and `CATALOG-OID-PAIR` remain preserved alternatives and reversal evidence, not selected semantics. The current comparison is qualitative under the identical PostgreSQL 18.6, local/no-TLS, opaque-provenance, startup, preflight, transaction, deadline, destruction, diagnostic, and recovery baseline: restricted ASCII best matches the present naming need with the smallest proof surface; exact catalog bytes preserve broader names at greater unused proof cost; and catalog OIDs add recreation/reuse behavior without a present rename-stability need. No current numerical cross-option ranking exists. The ADR's separate 92/100 whole-record evaluation is not a candidate score. Earlier 91/84/77, 92/88/77, startup-control, environment-closure, and TLS/SNI matrices remain historical evidence only.

The fourth correction preserves the 91/84/77 identity comparison but assigns three new comparable reports to these startup-control alternatives:

| Startup-control candidate | Required complete shape |
|---|---|
| `STARTUP-GUARDED-UTF8-ONLY` | Owner-selected practical direction. A private migration-connection factory constructs a dedicated pure-JavaScript node-postgres/Sequelize session from trusted target components, fixes `client_encoding=UTF8` and `search_path=pg_catalog` in startup state before any SQL, rejects ambient/URL/caller startup overrides and arbitrary already-open sessions, then verifies effective startup state plus UTF8/non-template/connectable database state before binding, locking, history, or DDL. It must state whether a trusted built-in conversion during misdirected startup is permitted before fail-closed rejection. |
| `PROVISIONED-UTF8-ZERO-CONVERSION` | Require an out-of-band trusted UTF8 database guarantee before connection so client and server encodings match from startup and no conversion lookup or execution is possible; define how misrouting and drift are detected without relying on a too-late SQL preflight and price the provisioning/control-plane burden. |
| `STARTUP-GUARDED-MULTI-ENCODING` | Fix startup `search_path=pg_catalog`, admit an explicit supported non-UTF8 database set, and allow only PostgreSQL built-in conversions selected from the trusted catalog; define conversion allowlisting, encoding pairs, driver behavior, failure modes, and the larger validation/operational surface. |

SQL-only preflight on an arbitrary already-open or caller-configured connection is a known-invalid control, not a fourth startup candidate. The selected report may preserve the existing post-connect preflight only as forward validation; it must not claim retroactive control of startup or first-message conversion.

The fifth correction compares these complete environment-closure alternatives while preserving the selected identity and startup-control direction:

| Environment-closure candidate | Required complete shape |
|---|---|
| `PINNED-ENVIRONMENT-GUARD` | Keep the private Sequelize/pure-JavaScript `pg` factory. Derive the complete ambient-fallback inventory from the exact locked `pg` patch; provide exact nonempty factory values for every safely forwarded field; reject every nonempty ambient variable that can still influence physical connection, TLS negotiation, startup packet, or session mode before Sequelize construction and again at the physical-acquisition boundary where feasible; map rejection locally; and make dependency-source drift a reversal trigger. |
| `SANITIZED-MIGRATION-SUBPROCESS` | Run migration connection creation in a dedicated child process with a minimal allowlisted environment and exact target handoff; define secret transfer, lifecycle, diagnostics, Windows/CI behavior, and cleanup while pricing the extra process/protocol/operational surface. |
| `LOW-LEVEL-PG-CONNECTION-ADAPTER` | Introduce a pinned low-level adapter or driver wrapper that supplies every startup/session field directly before Sequelize use; define how this preserves build-first Umzug/Sequelize ownership and raw result behavior while pricing custom integration, dependency-direction, and maintenance costs. |

Merely asserting `replication: false`, checking only a named subset such as `PGOPTIONS` plus the non-read `PGCLIENTENCODING` spelling, or relying on SQL preflight is a known-invalid environment control and must not be scored as selectable.

### Current restricted portfolio-profile addendum

This addendum supersedes conflicting broad-profile clauses in this living contract while preserving their chronology. The current proposal must decide all of the following now:

- exact versions Node.js 24.18.0, npm 11.16.0, TypeScript 6.0.3, PostgreSQL 18.6/`postgres:18.6-alpine`, Sequelize 6.37.7, Umzug 3.8.3, `pg` 8.22.0, and `pg-hstore` 2.3.4, with transitive `pg-protocol` 1.15.0 and `pgpass` 1.0.5, plus a latest-PostgreSQL-18-minor check before implementation or delivery evidence;
- database, schema, and user grammar `^[a-z]{1}[a-z0-9_]{0,62}$`, pre-connection 63-byte enforcement, built-in template and system-schema rejection, exact local `127.0.0.1` transport, disabled TLS, valid port, non-empty credential, and `POSTGRES_*` configuration;
- one property-free frozen `TrustedMigrationTarget` whose state is held only in a private `WeakMap`, with private issuance limited to the validated configuration loader and ADR-0011 allocator and no public raw-tuple factory;
- blanket rejection of every non-empty effective environment name beginning `PG` before Sequelize construction and immediately before acquisition; exact unquoted startup `options=-c client_encoding=UTF8 -c search_path=pg_catalog`; the separately serializer-appended direct `client_encoding=UTF8` pair; fixed application name, timeout, binary mode, and `databaseVersion='18.6.0'`; pgpass non-entry; one physical session; and the trusted-process limitation;
- exact eight-field preflight values and OIDs, exact pre/post two-field `text` binding with no `convert_to` or `bytea`, verified ASCII-to-UTF8 v2 framing, five positive vectors, and upper-case/Unicode negative fixtures;
- default 5000 ms lock timeout, integer range 1 through 60000 ms, fixed 100 ms polling, per-query ceiling-of-remaining `query_timeout`, physical connection/socket destruction and pool removal on expiry or late success, no SQL rollback on that path, and result 2; and
- database-local advisory-lock semantics: only distinct schemas within one database can suffer collision-induced false serialization, while different databases never contend even for equal keys.


### Common criteria and scoring


Each candidate uses the portfolio's 100-point rubric:

| Criterion | Maximum | Required interpretation |
|---|---:|---|
| Requirements traceability | 20 | Preserve FR-BE-003, FR-BE-004, NFR-003, DEL-002, AC-009, AC-012, and OR-001's adopted repository effect without claiming implementation. |
| Architectural fit and consistency | 20 | Preserve every unaffected ADR-0012, ADR-0002, ADR-0003, ADR-0008, ADR-0010, ADR-0011, and current ADR-0014 constraint; use reciprocal lifecycle; admit only an authorized application database/schema pair; do not reward the legacy NFC contract. |
| Options and trade-offs | 15 | Cover database class, identity domain, catalog binding, supported encoding or controlled conversion lookup, bytes/framing, key projection, concurrency, ownership, diagnostics, failure, recovery, and reversal end to end. |
| Feasibility and proportionality | 15 | Count SQL, transaction state, connection-startup configuration and GUC precedence, driver/pool, client/server conversion, validation, database-provisioning, test-vector, cross-platform, operational, and documentation surface for the small assessment. Shared hard-gate repair earns no score credit. |
| Quality attributes | 10 | Compare correctness, isolation, portability, diagnosability, availability, operability, and safe failure. |
| Verifiability | 10 | Supply deterministic vectors and real-PostgreSQL proof obligations without presenting downstream proof as current evidence. |
| Evolution and reversibility | 10 | Cover identifier-policy changes, database/schema recreation, dump/restore, driver/runtime changes, hash collision, and migration to a later identity version. |

Every report must state the raw score, recommendation band, confidence, hard-gate failures, residual risks, strongest dissent, reversal triggers, and no-write/no-implementation status.


### Evidence classes and required outputs


Evidence priority is: repository source assessment and requirements; accepted repository authorities; current official PostgreSQL documentation and source where needed; current official Node.js and `node-postgres` documentation for byte and `bigint` behavior; reproducible read-only calculations or isolated catalog observations; and clearly labeled inference. Prior TASK-016 lock research is discovery history and may be cross-checked, but it cannot replace the formal symmetric reports.

Each fourth-correction researcher report must contain: assignment/scope; repository constraints; pinned PostgreSQL startup/query-decoding and node-postgres startup-serialization sources; exact startup parameter provenance and precedence; the chosen invariant (`no conversion` or `no untrusted conversion`); dedicated factory/session eligibility; ambient environment, URL, caller `options`, role/database settings, pure-JavaScript versus native driver, pooled/borrowed connection, and misrouting treatment; exact post-connect preflight, result shape, ordering, and binding effects; accepted and rejected UTF8/LATIN1/SQL_ASCII and template/connectability fixtures; first simple-query and extended-protocol message behavior; diagnostics and ownership/release/failure/recovery; downstream TASK-004 locked-version proof; normalized impact on the existing identity candidates and scores; benefits; costs; residual risks; reversal triggers; confidence; recommendation; and explicit no-write status.

Each fifth-correction report must additionally use the exact `pg@8.22.0` connection-parameter and startup-message sources plus Sequelize 6.37.7's PostgreSQL forwarding boundary; inventory every relevant `PG*` fallback and state whether an exact trusted field overrides it, Sequelize forwards that field, or local rejection/isolation is required; define the earliest deterministic rejection point; cover mutation/race assumptions honestly; specify startup-packet, TLS-negotiation, replication/session-mode, application-name, connection-timeout, no-socket/no-SQL, Windows/CI, and dependency-upgrade fixtures; score the common rubric without repair credit; and preserve no-write/no-implementation status. The direct TLS correction additionally pins `pg@8.22.0` `connection.js` and `stream.js`, traces the effective options into `tls.connect`, and requires DNS-equal, IP-host/distinct-name, mismatch-rejection, and transport-capture fixtures.

The current restricted-profile correction must additionally distinguish `Client.getStartupConf()` from `pg-protocol@1.15.0` serialization; prove exact factory-owned `options`, the separately appended direct encoding pair, their packet order, and PostgreSQL's application of both controls after authentication but before `search_path` and client-encoding initialization, `ReadyForQuery`, and every Sequelize SQL statement; use PostgreSQL REL_18_6 source and official security/versioning evidence; verify `postgres:18.6-alpine`; use `180006` and `databaseVersion='18.6.0'`; and compare all three identity candidates under one identical connection/control baseline without a current cross-option numerical ranking.

The analyst must return: comparability audit; normalized matrix; hard-gate and invariant coverage; ranked recommendation; decide-now/prove-later table; selected exact semantics; strongest dissent; reciprocal ADR-0012 lifecycle outline; validation map; documentation impact; confidence; and exactly one readiness result.


### Hard gates


1. No preprocessing may alias two admitted distinct PostgreSQL database/schema identities. A restrictive option must reject out-of-domain actual identifiers before migration history access or schema mutation; it must never normalize them into an admitted value.
2. Configured identifiers must bind to exactly one actual current database and schema catalog identity. Missing, multiple, lossy, truncated, rewritten, or unequal bindings fail closed before lock-protected history access or mutation.
3. The successor must use an exact new migration-lock literal and must not reuse or reinterpret `rick-and-morty-explorer:migrations:v1`. Reports evaluate the common candidate literal `rick-and-morty-explorer:migrations:v2` unless evidence requires an explicit revision before drafting.
4. The decision must define exact bytes, encoding, four-byte unsigned big-endian length framing, SHA-256 input, first-eight-byte projection, two's-complement signed 64-bit conversion, and PostgreSQL `bigint` binding without JavaScript `number` precision loss.
5. The contract must state honestly that a 64-bit projection is not injective. A projected collision may cause safe false serialization and diagnosable availability loss, never same-namespace concurrency.
6. Every operation preserves ADR-0012's artifact-preflight then explicit PostgreSQL `READ COMMITTED` transaction, bounded `pg_try_advisory_xact_lock(bigint)` polling, lock-before-history, fresh post-lock history read, complete-command transaction, and transaction-end release order unless a researched candidate proves a necessary successor change.
7. The same actual namespace always derives the same key across supported entry points and Windows/CI runtimes; two callers serialize and the waiter observes the winner's commit. Distinct test namespaces must be able to overlap except for an explicitly observed 64-bit false serialization.
8. The proposal must define dedicated connection/transaction ownership, borrowed versus owned Sequelize cleanup, timeout, cancellation, interruption, connection loss, ambiguous commit, redacted diagnostics, and non-retry recovery consistently with carried-forward ADR-0012.
9. Deterministic fixtures must include the three ADR-0012 ASCII pairs, case-distinct names, composed/decomposed Unicode names for candidates that admit them, out-of-domain rejection for restrictive candidates, framing-boundary distinctions, and signed positive/negative key results.
10. Runtime proof belongs to TASK-004. The proposal may specify SQL, driver, and tests, but no plan, report, validator, or ADR may claim that a lock, runner, migration, schema, or integration test exists.
11. The score and recommendation must follow the ADR rubric. Contradiction of a mandatory requirement, missing measurable validation, hidden high-impact assumption, or conflict with active accepted architecture prohibits acceptance readiness.
12. Before owner approval, the successor remains `Proposed`, ADR-0012 remains `Accepted`, DG-005 remains `Pending`, TASK-018 remains `In progress`, TASK-004 remains `Pending` with unchanged dependencies, and no migration implementation exists.
13. Only an authorized persistent application schema may be admitted. Before SQL and on both returned catalog-byte observations, reject every exact schema name whose UTF-8 bytes begin with lower-case `pg_` and reject exact `information_schema`; no system/reserved or temporary namespace may reach locking, history access, or migration DDL. The selected contract must define positive application-schema provenance and treat role privileges as defense in depth rather than the only guard.
14. Only an authorized application database may be admitted. The selected contract must reject exact `template0` and `template1` locally; require exact UTF8, PostgreSQL 18.6 (`server_version_num=180006`), configured `current_user`, identifier limit 63, `datistemplate=false`, and `datallowconn=true` in the eight-field preflight; use no `convert_to`; bind exact configured and returned database/schema values through identical two-field `text` observations; and define exact row/field/type assertions, ordering, diagnostics, and no-mutation fixtures. Positive provenance does not replace these checks.
15. Trusted startup state must govern `client_encoding` and `search_path` before any frontend SQL message is decoded or executed. The selected contract must distinguish the exact `options` forwarded by `Client.getStartupConf()` from the direct `client_encoding` pair appended by the pinned serializer; require same-value UTF8 controls plus `search_path=pg_catalog`; state that the packet is transmitted before authentication but PostgreSQL applies these startup GUCs after authentication and before `ReadyForQuery` and every Sequelize SQL statement; constrain the earlier database/user authentication fields to admitted ASCII; reject or structurally exclude ambient/URL/caller overrides and arbitrary already-open sessions; distinguish pure-JavaScript from native driver behavior; and retain fail-closed post-connect validation before lock, history, or DDL. SQL preflight cannot be credited with retroactive startup protection; exact locked-version runtime proof belongs to TASK-004.
16. The exact locked driver boundary must close every ambient fallback and transport path that can change destination, authentication source, TLS/session mode, startup packet, application name, binary mode, or connection timeout. The current profile must fix TCP host `127.0.0.1`, `ssl=false`, port/database/user/credential, exact `options="-c client_encoding=UTF8 -c search_path=pg_catalog"`, the serializer-appended direct `client_encoding=UTF8`, application name, 10-second connection timeout, binary false, and `databaseVersion='18.6.0'`; reject every non-empty effective environment key beginning `PG` at both checks; preserve pgpass non-entry; prohibit remote, DNS, socket, TLS, native, URL, caller, and borrowed paths; define stable diagnostics and no-Client/no-socket/no-SQL fixtures; and make new or changed fallback, serializer, or transport behavior an upgrade reversal trigger.
17. The compatibility profile must be exact and decided here: Node.js 24.18.0, npm 11.16.0, TypeScript 6.0.3, PostgreSQL 18.6/`postgres:18.6-alpine`, Sequelize 6.37.7, Umzug 3.8.3, `pg` 8.22.0, and `pg-hstore` 2.3.4, with lockfile resolutions `pg-protocol` 1.15.0 and `pgpass` 1.0.5. TASK-004 may prove but not choose these versions. Before implementation and delivery evidence, confirm that 18.6 remains the latest PostgreSQL 18 minor; a later minor requires documented compatibility review and must replace the implementation pin when the guarantees reproduce. Every other upgrade requires compatibility review, and any guarantee-changing or unreproducible change requires a successor ADR.
18. `TrustedMigrationTarget` provenance must be runtime-opaque and non-forgeable by ordinary caller values. A property-free frozen handle backed only by private `WeakMap` membership is required; only the validated configuration loader and ADR-0011 allocator may issue it; no public constructor or raw-tuple factory exists; and clones, spreads, proxies, JSON, structural lookalikes, brands, and `authorized` fields must fail before Sequelize or physical connection work.
19. The lock deadline must bound suspended queries and late successes, not merely iterations between valid false results. Default 5000 ms, range 1 through 60000 ms, fixed 100 ms polling, and per-query `query_timeout = ceil(remaining monotonic time)` are decided values. Expiry before/during/after a query, client query timeout at the deadline, or late `true` must destroy the physical connection/socket, remove it from the pool, issue no SQL rollback, and return `MIGRATION_LOCK_TIMEOUT`/2; runtime proof belongs to TASK-004.
20. Startup identity must fail before lock/history/DDL unless database, schema, and user match `^[a-z]{1}[a-z0-9_]{0,62}$`, the database/user cannot enter PostgreSQL startup truncation, the eight preflight fields/OIDs and exact values match, and both text binds return exact configured names. Upper-case, Unicode, hyphenated, empty, and 64-byte values are negative fixtures. Collision claims must respect database-local advisory locks: same-database schema collisions may false-serialize; different databases never contend.


### Decide now versus prove later


Decide now: the exact direct/transitive compatibility profile and PostgreSQL current-minor rule; restricted database/schema/user grammar and 63-byte pre-connection limit; private `WeakMap` provenance and two issuers; template, connectability, system, and reserved exclusions; exact loopback/TLS-disabled transport and `POSTGRES_*` configuration; blanket two-point `PG*` rejection and trusted-process premise; exact forwarded `options`, serializer-appended encoding pair, startup timing, and database-version bootstrap suppression; the eight-field preflight SQL/OIDs/values; two-field pre/post `text` binding; v2-only ASCII-to-UTF8 framing, digest and signed binding; five vectors and negative fixtures; same-schema, disjoint-schema, and cross-database advisory-lock semantics; the statement-time limit of rebind; exact deadline/range/poll/query-timeout/destruction behavior; transaction/session ownership; interruption/ambiguous-outcome behavior; stable diagnostic precedence; reciprocal ADR lifecycle; downstream proof ownership; and reversal triggers.

Prove later in TASK-004: exact module/function names and private module placement; exact lockfile graph and PostgreSQL current-minor compatibility check; implementation syntax; opaque-handle forgery failures; blanket environment rejection before Client/socket/SQL; pgpass non-entry; byte-decoded loopback StartupMessage showing forwarded `options` and the separately serializer-appended direct encoding pair in exact order; PostgreSQL application of both controls after authentication but before `search_path` and client-encoding initialization, `ReadyForQuery`, and every Sequelize SQL statement; ParameterStatus, application name, timeout, binary and session mode; eight-field and text-bind parser behavior; 63/64-byte and current-user fixtures; per-query timeout, suspended query, late success, physical socket destruction, pool removal and no-SQL-rollback evidence; real same-schema serialization, disjoint-schema overlap, and cross-database non-contention; Windows and CI behavior; cleanup; integration command wiring; and every migration/schema outcome. Downstream work may prove selected semantics but must not choose versions or invent broader names, transport, TLS, encoding, or timeout behavior.


### Cumulative invariant packet


| ID | Trigger or fixture | Expected result | Evidence / actual result | Responsible reviewer |
|---|---|---|---|---|
| LOCK-INV-01-COVERAGE | Historical reports, current addendum, outline, and final ADR | Three candidates, the selected restricted profile, all current gates, and whole-record clauses are present without making historical broad profiles normative. | Historical revisions `B38F26ED48A99CFB0D4FA99A1973637B4C9ED66AC6122598FB093A13AA3B4EC9` and `E649A26C334C16BC0B3800ECCB07C2F315F176EC0896C60D72E843765355B3E6` received `REVISE`. Exact corrected proposal `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1` selects restricted ASCII through a qualitative common-baseline comparison, retains the ADR's separate 92/100 whole-record evaluation, states the exact startup sequence, and received fresh independent `PASS` plus explicit owner approval. | Primary, required reviewer |
| LOCK-INV-02-AUTHORITY | ADR/task/gate/status matrix and TASK-004 graph | No premature acceptance, supersession, gate resolution, closure, dependency change, implementation, or TASK-004 start. | The exact reviewed proposal received explicit owner approval before ADR-0015 became `Accepted`, ADR-0012 became `Superseded`, TASK-018 became `Complete`, and DG-005 became `Resolved`. TASK-004 remains `Pending`, dependencies remain unchanged, and implementation remains absent. | Primary, required reviewer |
| LOCK-INV-03-INJECTIVITY | Admitted ASCII plus upper-case, Unicode, hyphen, empty, and 63/64-byte fixtures | Every admitted tuple has exact framed bytes; every out-of-domain value rejects rather than aliases or truncates. | Current contract fixes `^[a-z]{1}[a-z0-9_]{0,62}$`, five positive vectors, explicit negative fixtures, and no normalization. Node.js 24.18.0 and Python 3.12.10 calculations passed; runtime proof remains TASK-004. | Primary, required reviewer |
| LOCK-INV-04-CATALOG-BINDING | Configured/current database and existing/missing schema fixtures | Exactly one exact configured/current catalog tuple is bound as `text` before history access and exactly reobserved after lock. | Current contract uses one eight-field preflight and identical two-field OID-25 text binds with no `convert_to` or `bytea`; runtime parser proof remains TASK-004. | Primary, required reviewer |
| LOCK-INV-05-FRAMING | Ambiguous concatenation and boundary fixtures | U32BE framing distinguishes tuples and includes the exact 37-byte v2 literal. | Current contract retains the literal and suffix vectors, reduces positives to five admitted tuples, and makes every v1 reinterpretation prohibited. | Primary, required reviewer |
| LOCK-INV-06-SIGNED-KEY | Positive and high-bit SHA-256 projections | Exact signed 64-bit decimal values reach PostgreSQL without JavaScript precision loss. | Current vectors cover both branches and require JavaScript `bigint` plus canonical decimal `pg_catalog.int8`; real PostgreSQL proof remains TASK-004. | Primary, required reviewer |
| LOCK-INV-07-SAME-NAMESPACE | Two callers and one admitted schema | One transaction holds the lock; the waiter reads history only after the winner commits. | Current contract preserves artifact-preflight/READ-COMMITTED/bind/lock/rebind/fresh-history ordering and one private session; runtime proof remains TASK-004. | Primary, required reviewer |
| LOCK-INV-08-DISJOINT | Two schemas in one database and equal keys in two databases | Disjoint same-database schemas overlap unless their keys collide; different databases never contend. | Current contract corrects false-serialization scope to PostgreSQL's database-local advisory locks and requires both overlap and cross-database non-contention fixtures. | Primary, required reviewer |
| LOCK-INV-09-OWNERSHIP | Opaque handle, private factory, and prohibited borrowed/configured paths | Only exact `WeakMap` membership reaches one factory-owned physical session; ADR-0011 owns namespace allocation/removal. | Current contract replaces structural provenance with a property-free frozen handle, two private issuers, maximum-one/minimum-zero pool, fixed version bootstrap suppression, and one owned session. | Primary, required reviewer |
| LOCK-INV-10-FAILURE | Deadline, suspended query, late true, cancellation, loss, incompatible preflight, and ambiguous commit | Stable outcomes, early no-mutation rejection, forced destruction on timeout, no automatic ambiguous retry, and redacted diagnostics. | Current contract adds per-query remaining time, mandatory socket/pool destruction, no SQL rollback, result 2, and explicit diagnostic precedence; runtime proof remains TASK-004. | Primary, required reviewer |
| LOCK-INV-11-PORTABILITY | Exact Node/driver versions, Windows/CI, ASCII domain, and rejected Unicode | Admitted bytes and results are identical across supported entry points; unsupported values fail before connection or lock work. | Current contract fixes every relevant version and one-byte ASCII/UTF8 semantics; exact Node/Python vectors passed the primary barrier, while Windows/CI database runtime proof remains TASK-004 work. | Primary, required reviewer |
| LOCK-INV-12-LIFECYCLE | ADR-0012 and successor metadata | Reciprocal whole-record supersession is prospective until exact approval and every unaffected clause is carried forward. | Exact approval occurred only after fresh `PASS`; ADR-0015/ADR-0012 now carry reciprocal Accepted/Superseded metadata, acceptance-only SPEC/HS routing is synchronized, and ADR-0014 remains unchanged and Accepted. | Primary, required reviewer |
| LOCK-INV-13-EVIDENCE | Repository tree, ADR claims, dependency graph, and negative searches | Documentation is not presented as implementation or passing runtime evidence. | Current work is limited to the registered Markdown scope and retains all runtime/dependency/migration proof as TASK-004 work after approval and separate authorization. | Primary, required reviewer |
| LOCK-INV-14-APPLICATION-DOMAIN | `public`, admitted custom/run-scoped schemas, `pg_catalog`, `pg_toast`, `information_schema`, and temporary `pg_*` fixtures | Admitted application schemas remain exact; every reserved/system value fails before connection and again on returned text. | Current grammar and local/returned `pg_` plus `information_schema` checks specify this boundary; runtime fixtures remain TASK-004. | Primary, required reviewer |
| LOCK-INV-15-APPLICATION-DATABASE | UTF8/non-UTF8, version, user, identifier limit, templates, connectability, and ordinary database fixtures | Only exact UTF8/PostgreSQL-18.6/configured-user/limit-63/non-template/connectable state reaches namespace binding. | Current eight-field order, OIDs, primitive types, `180006`, values, and diagnostics specify the boundary; runtime fixtures remain TASK-004. | Primary, required reviewer |
| LOCK-INV-16-STARTUP-STATE | Loopback/remote, plain/TLS, startup fields, URL/caller/native/borrowed paths, and version bootstrap | Only the exact local private pure-JavaScript session is admitted and its startup state is verified before lock/history/DDL. | Current contract distinguishes forwarded same-value UTF8/search-path `options` from the serializer-appended direct UTF8 pair and fixes their application after authentication but before `search_path` and client-encoding initialization, `ReadyForQuery`, and every Sequelize SQL statement, together with host, TLS false, `databaseVersion='18.6.0'`, one session, and prohibited paths; runtime packet/order capture remains TASK-004. | Primary, required reviewer |
| LOCK-INV-17-ENVIRONMENT-CLOSURE | Every non-empty effective `PG*` key, password-file path, and ordinary drift between checks | Every such key rejects before physical acquisition; credential provider bypasses pgpass; no values are logged; upgrade drift blocks compatibility. | Current blanket guard replaces the partial inventory while retaining two checks and trusted-process limits; runtime no-Client/socket/SQL and pgpass proof remains TASK-004. | Primary, required reviewer |
| LOCK-INV-18-COMPATIBILITY-PROFILE | Manifest, package-lock, image, and source/runtime audit | All ten direct/transitive runtime identities equal the decided versions; TASK-004 makes no version choice. | Current ADR enumerates Node/npm/TypeScript/PostgreSQL 18.6/Sequelize/Umzug/pg/pg-hstore/pg-protocol/pgpass, verifies the official 18.6 image target, and requires a latest-PostgreSQL-18-minor check plus upgrade review/successor behavior. | Primary, required reviewer |
| LOCK-INV-19-OPAQUE-PROVENANCE | Real handle, raw tuple, clone, spread, proxy, JSON, brand, and `authorized` fixtures | Only the two private issuer outputs are `WeakMap` members; every forgery fails before Sequelize. | Current ADR fixes property-free frozen handles, private records, two issuers, and exact runtime membership; executable proof remains TASK-004. | Primary, required reviewer |
| LOCK-INV-20-DEADLINE-DESTRUCTION | False polling, hung query, query-timeout callback, boundary arrival, late true, and destroy failure | Deadline is monotonic and bounded; each query uses remaining time; every expiry destroys/removes the physical session, performs no SQL rollback, and returns 2. | Current ADR fixes 5000 ms, 1..60000 ms, 100 ms, ceiling-of-remaining timeout, precedence, destruction, pool removal, and secondary cleanup semantics; executable proof remains TASK-004. | Primary, required reviewer |
| LOCK-INV-21-STARTUP-IDENTITY | 63/64-byte database/schema/user, wrong current user/version/encoding/limit/class, two text binds, and same/cross-database concurrency | Startup truncation is unreachable; all eight fields and both text observations match; collision claims remain database-local. | Current ADR supplies exact grammar, SQL, OIDs, primitive values including `180006`, diagnostics, v2 inputs, and concurrency claims; primary integrated consistency passed and later TASK-004 runtime proof remains. | Primary, required reviewer |

The owner-selected portfolio correction reopened the complete packet through LOCK-INV-21 because it changed the selected option and several shared mechanics. All earlier PASS evidence remains historical and non-authorizing. Primary integrated validation passed on exact ADR SHA-256 `B38F26ED48A99CFB0D4FA99A1973637B4C9ED66AC6122598FB093A13AA3B4EC9`, but the subsequent exact review returned `REVISE`. The startup/version/comparison repair passed a new complete integrated barrier and froze exact corrected SHA-256 `E649A26C334C16BC0B3800ECCB07C2F315F176EC0896C60D72E843765355B3E6`, but its subsequent exact review returned `REVISE` for two residual documentation defects. The precision repair passed another complete integrated barrier and froze exact corrected proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1`; fresh independent exact-artifact review returned `PASS` with no finding and the project owner explicitly approved those bytes. Runtime portions remain downstream TASK-004 proof obligations rather than current implementation evidence.


### Risk trigger, corrections, escalation, and stopping


The decision defines custom identity, canonical serialization, signed digest projection, concurrency, exact compatibility, opaque provenance, startup/environment/local transport control, bounded connection destruction, recovery, and cross-platform semantics. The repository policy still requires an independent review of a materially revised exact final artifact before owner presentation.

Prior review/correction cycles remain preserved history. On 2026-08-14 the project owner explicitly selected the `RESTRICTED-ASCII-DOMAIN` portfolio profile and authorized the primary to apply the supplied documentation plan directly without workers. The owner later authorized direct repair of the review findings concerning the split startup-encoding route, obsolete PostgreSQL 18.4 minor, and asymmetric current option numbers. That authority covers the exact PostgreSQL 18.6 profile, same-value startup controls, common-baseline comparison, trace, and validation changes recorded in this addendum. It does not waive the independent exact-artifact review boundary or authorize acceptance, gate resolution, task closure, TASK-004 start, dependencies, or migration implementation. Any mechanic outside those supplied findings returns `OWNER DIRECTION`.

The direct-edit workflow stopped at the exact review boundary as required. Fresh independent review then returned `PASS`, and separate explicit project-owner approval authorized the lifecycle reconciliation. That reconciliation accepts ADR-0015, supersedes ADR-0012, resolves DG-005, and closes TASK-018; it does not start TASK-004 or authorize migration implementation.


## Concrete Steps


All commands run from `C:\Users\mmjos\Desktop\workbeanch\rick-and-morty-test`.

Baseline, collision, and structural checks:

    git status --short --branch
    git rev-parse HEAD
    rg -o --no-filename "TASK-[0-9]{3}" . --glob "!node_modules/**" --glob "!.git/**" | Sort-Object -Unique
    rg --files docs/adrs
    python -B .agents/skills/verify-repository/scripts/validate_docs.py --repo .
    python -B .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
    git diff --check

Proposal identity and negative-scope checks:

    Get-FileHash -Algorithm SHA256 docs/adrs/<allocated-successor>.md
    git diff -- docs/adrs docs/IMPLEMENTATION_PLAN.md docs/plans README.md docs/SYSTEM_DIAGRAM.md docs/specs docs/execution
    rg -n "rick-and-morty-explorer:migrations:v1" README.md docs .codex .agents
    rg -n "TASK-004" docs/IMPLEMENTATION_PLAN.md docs/plans/TASK-004-relational-persistence-from-migrations.md
    rg -n "\.(only|skip)\(" . --glob "!docs/**" --glob "!node_modules/**"
    git status --short

ADR-0015 was allocated only after the required checkpoint and collision check. It remains non-executable architecture text. The completed current-authority result is: ADR-0015 `Accepted`; ADR-0012 `Superseded`; DG-005 `Resolved`; TASK-018 `Complete`; TASK-004 `Pending` with unchanged dependencies; and no migration implementation artifact.


## Validation and Acceptance


Registration validation requires unique TASK-018 ownership, valid navigation, unchanged TASK-004 dependencies, an unallocated ADR sequence, passing documentation and ADR validators, `git diff --check`, and documentation-only scope.

Decision validation requires preserved historical reports, the current owner-selected addendum, one reciprocal `Proposed` ADR with every required section, complete rerun of LOCK-INV-01 through LOCK-INV-21 after every material change, five deterministic key vectors plus 37-byte/framing/signed-branch reproduction in Node.js 24.18.0 and Python 3.12.10, restricted-domain negatives, and a match among the 92 score, recommendation, artifact status, accepted-ADR status, task/gate states, TASK-004 graph, documentation impact, and next action. Integrated primary validation may prove internal consistency but cannot replace the required fresh independent exact-artifact verdict.

No Red-Green-Refactor cycle applies because TASK-018 changes decision documentation only. No production behavior, executable test, dependency, configuration, or migration is authorized. TASK-004 owns later real-PostgreSQL TDD after separate ADR approval and separate execution authorization.

The proposal-readiness boundary passed before architecture acceptance. Fresh independent review returned `PASS` on exact proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1`, and the project owner then explicitly approved those bytes. The primary reconciled `Accepted`, reciprocal supersession, DG-005 resolution, TASK-018 closure, and plan movement only after that approval. TASK-004 remains outside this boundary and unstarted.


## Idempotence and Recovery


Read-only research, calculations, catalog observations in isolated disposable namespaces, and validators are safe to repeat. The primary is the sole decision-artifact writer. Researchers, analyst, and reviewers remain read-only and must not revert or modify the shared working tree.

Apply documentation edits additively with `apply_patch`, inspect the tree before each write, preserve accepted ADR-0012 and completed historical evidence, and append chronology rather than rewriting it. If research or review fails, retain the exact reports and verdict, update this living plan, and resume from the named barrier. If an unexpected repository change appears, freeze writes, identify its owner, and reconcile before continuing. Never recover with reset, checkout, bulk deletion, task-edge rewriting, or semantic reuse of the legacy literal.


## Artifacts and Notes


Registration baseline:

- Repository HEAD: `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`.
- Working tree: clean before TASK-018 registration.
- Task collision result: TASK-001 through TASK-017 exist; TASK-018 was free and is now allocated.
- ADR collision result: after research, renewed analysis, and fresh IR-A `PASS`, a fresh scan confirmed ADR-0014 as the prior highest record and `0015` unused; ADR-0015 is now allocated as `Proposed`.
- Controlled implementation evidence: no Sequelize, Umzug, PostgreSQL driver, integration project, migration runner, migration, migrated schema, or ERD exists.

The three formal option reports follow. Decision analysis, IR-A, proposal hashes, final IR-B, correction history, and reconciliation will be appended after them without replacing the living contract.


### Shared formal-research evidence


Three separate read-only `technology_researcher` instances completed the reports at 2026-08-13 04:05Z. Each read the same repository authorities and Decision Review Contract, evaluated only its assigned candidate, made no repository write, allocated no ADR, selected no architecture, changed no status or dependency, and claimed no migration, lock, schema, or integration behavior.

The shared repository constraints were FR-BE-003, FR-BE-004, NFR-003, DEL-002, AC-009, AC-012, repository-adopted OR-001, ADR-0002, ADR-0003, ADR-0008, ADR-0010, ADR-0011, accepted ADR-0012, DG-005, HS-002, the TASK-004 waiting plan, and this complete contract. The shared current-state observation remained documentation-only: no Sequelize, Umzug, PostgreSQL driver, integration project, migration runner, migration, migrated schema, or ERD exists.

The common primary sources were:

- PostgreSQL identifier and catalog behavior: [Lexical Structure](https://www.postgresql.org/docs/current/sql-syntax-lexical.html), [pg_database](https://www.postgresql.org/docs/current/catalog-pg-database.html), [pg_namespace](https://www.postgresql.org/docs/current/catalog-pg-namespace.html), and [System Information Functions](https://www.postgresql.org/docs/current/functions-info.html).
- PostgreSQL exact bytes and numeric types: [Binary String Functions](https://www.postgresql.org/docs/current/functions-binarystring.html), [Binary Data Types](https://www.postgresql.org/docs/current/datatype-binary.html), [Object Identifier Types](https://www.postgresql.org/docs/current/datatype-oid.html), and [Numeric Types](https://www.postgresql.org/docs/current/datatype-numeric.html).
- PostgreSQL lock and visibility behavior: [Advisory Lock Functions](https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS), [Advisory Locks](https://www.postgresql.org/docs/current/explicit-locking.html#ADVISORY-LOCKS), [Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html), and [pg_locks](https://www.postgresql.org/docs/current/view-pg-locks.html).
- Node.js byte and digest behavior: [Buffer](https://nodejs.org/docs/latest-v24.x/api/buffer.html) and [Crypto](https://nodejs.org/docs/latest-v24.x/api/crypto.html#class-hash).
- node-postgres parameter, transaction, and connection behavior: [Queries](https://node-postgres.com/features/queries), [Types](https://node-postgres.com/features/types), [Transactions](https://node-postgres.com/features/transactions), and [Pooling](https://node-postgres.com/features/pooling).


### Formal option report: EXACT-CATALOG-BYTES


Assignment and scope: evaluate the current PostgreSQL database and schema names as exact server-produced UTF-8 bytes under the literal `rick-and-morty-explorer:migrations:v2`. The report did not compare or select the final architecture.

Identifier domain and catalog binding:

- Admit only primitive, non-empty JavaScript strings that are well-formed Unicode scalar sequences, contain no U+0000, encode to UTF-8 without replacement, fit unsigned four-byte framing, and bind byte-for-byte to exactly one current database/schema catalog tuple.
- Apply no normalization, case folding, trimming, quoting or unquoting, escape interpretation, percent decoding, search-path resolution, or truncation. Configuration values are raw identifier values rather than SQL identifier tokens.
- Reject malformed strings, missing or multiple rows, near matches, unsupported conversion, non-`Buffer` results, or any pre-lock/post-lock catalog drift before history access.
- On the dedicated transaction connection, bind locally validated UTF-8 `Buffer` values to this fixed query and require exactly one row, two `Buffer` results, valid UTF-8, and exact equality with the inputs:

      SELECT
        pg_catalog.convert_to(
          d.datname::pg_catalog.text,
          'UTF8'
        ) AS database_name_bytes,
        pg_catalog.convert_to(
          n.nspname::pg_catalog.text,
          'UTF8'
        ) AS schema_name_bytes
      FROM pg_catalog.pg_database AS d
      CROSS JOIN pg_catalog.pg_namespace AS n
      WHERE d.datname = pg_catalog.current_database()
        AND pg_catalog.convert_to(
              d.datname::pg_catalog.text,
              'UTF8'
            ) = CAST($1 AS pg_catalog.bytea)
        AND pg_catalog.convert_to(
              n.nspname::pg_catalog.text,
              'UTF8'
            ) = CAST($2 AS pg_catalog.bytea);

- Hash the equal server-returned buffers, not a rewritten configuration value. Run the same query again after lock acquisition and require byte equality with the pre-lock result before the first history read.
- Rename changes the name-derived key. Drop/recreate with the same exact names reuses it. Logical restore under the same names preserves it. Equal names in different clusters derive equal values but cannot coordinate across clusters.

Exact byte and key contract:

    LP(x) = uint32be(byteLength(x)) || x

    payload =
      LP(UTF8("rick-and-morty-explorer:migrations:v2"))
      || LP(databaseCatalogUtf8Bytes)
      || LP(schemaCatalogUtf8Bytes)

    digest = SHA-256(payload)
    unsigned = first 8 digest bytes as unsigned big-endian bigint
    signed = unsigned < 2^63 ? unsigned : unsigned - 2^64

The literal is exactly 37 bytes. SHA-256 receives the framed `Buffer`; all 64-bit operations use JavaScript `bigint`, never `number`. Bind `signed.toString(10)` as a decimal string to `pg_try_advisory_xact_lock(CAST($1 AS pg_catalog.bigint))`. The projection is not injective: a collision between different namespaces may cause safe false serialization and availability loss, never same-namespace concurrency.

Concurrency, ownership, failure, and recovery:

1. Complete immutable artifact preflight without history access.
2. Validate and encode both configured strings.
3. Obtain one dedicated connection and begin explicit `READ COMMITTED`.
4. Bind the exact catalog tuple and derive the key.
5. Poll transaction-level try-lock calls sequentially against a bounded monotonic deadline on that same connection.
6. Rebind the tuple after acquisition; then perform the first fresh history read.
7. Keep status, the complete selected migration batch, DDL, history bootstrap/writes, commit or rollback, and lock lifetime in the same transaction.

The factory closes only a Sequelize instance or connection it created or was explicitly told to own; borrowed resources remain caller-owned. A damaged connection must not return as healthy, and primary and cleanup failures remain distinct. Timeout rolls back and returns the stable contention result. Cancellation or interruption attempts rollback and invalidates an unusable connection. Session end releases the transaction lock after connection loss. A near-commit loss is ambiguous and must never auto-retry; recovery reconnects and runs the same artifact-preflight, bind, lock, and read-only status sequence before reviewed action. Diagnostics use stable codes, escaped exact identifiers, byte lengths, literal version, signed decimal key, elapsed wait, and cleanup outcome while excluding credentials and raw connection configuration.

Deterministic vectors reproduced in Node.js 24.18.0 and independently in Python 3.12.10:

| Database | Schema | SHA-256 | Signed key |
|---|---|---|---:|
| `rick_and_morty` | `public` | `5e6b487e7bee9566d532743c03ce9f32620feae465b2c7e04fad2d88dc058e49` | `6803611370155578726` |
| `rick_and_morty` | `task_004_a` | `6a644eaea472bf65b14be9d0a5fed984db47bd3620633b446476e75c5d6f6d94` | `7666338977681686373` |
| `RickMorty` | `CaseSensitive` | `cd8f75e281af0c94291e77c401ce35ac32836587fcb343a513d7dd1336d5edb4` | `-3634556758565909356` |
| `rickmorty` | `CaseSensitive` | `931cd888e822926752cc8baf09497eeac15546e76b1b42c7bc6d3b7e33413597` | `-7846158368264514969` |
| `rick_and_morty` | composed `café` | `3f6b1a56d6b82ef3cc6893c41f7952477ccfd1630a84287f263b7d5882afb3e6` | `4569775207169404659` |
| `rick_and_morty` | decomposed `café` | `e0925486a3fbad768e34c0ca9a6a35bf5b874ad76ff73c386f63152a7e2fa5e3` | `-2264654725360407178` |
| `ab` | `c` | `b8e06f7ec921e2e0d23fc57ad0662d1b5b5d2b214c2450e58dab457d76cee9e9` | `-5124973785616620832` |
| `a` | `bc` | `38254f49a1e3e20be904178358adde1e4aa6393e76df357cd93632207170d268` | `4045727017929531915` |

The two Unicode schema byte sequences are respectively `636166c3a9` and `63616665cc81`. The framing suffixes for `("ab","c")` and `("a","bc")` are `0000000261620000000163` and `0000000161000000026263`. Empty strings, U+0000, lone surrogates, case or normalization near matches, missing schemas, and non-`Buffer` results are rejection fixtures.

TASK-004 proof obligations: exact `bytea` result shape and parameter equality under locked Sequelize/node-postgres patches; every ASCII, case, Unicode, invalid, missing, framing, positive, and negative fixture; exact decimal `bigint` arrival; post-lock rebind; two-caller serialization and winner-commit visibility; disjoint overlap; Windows/CI agreement; owned/borrowed cleanup; timeout, cancellation, interruption, loss, ambiguity, recovery; and forbidden-coupling checks.

Score and recommendation:

| Criterion | Score / maximum |
|---|---:|
| Requirements traceability | 20 / 20 |
| Architectural fit and consistency | 19 / 20 |
| Options and trade-offs | 14 / 15 |
| Feasibility and proportionality | 12 / 15 |
| Quality attributes | 9 / 10 |
| Verifiability | 9 / 10 |
| Evolution and reversibility | 8 / 10 |
| **Total** | **91 / 100** |

Individual band: `Accept`. Confidence: 0.86, high-moderate. Benefits are exact preservation of valid names, no normalization/collation/quoting alias, stable logical name identity, cross-runtime determinism, and no new service or persistent metadata. Costs and residual risks are duplicate catalog binding, Unicode validation, future raw-driver proof, cooperative-lock bypass, name reuse semantics, rename re-keying, mixed-version prohibition, and projected false serialization. Strongest dissent: the restrictive ASCII option has a smaller Unicode and operator proof surface for this assessment. Reversal triggers include any admitted alias, failure to prove byte or `bigint` fidelity, platform disagreement, unreliable rebind, unacceptable name reuse, material collision cost, a demonstrated restrictive organization policy, or incompatible driver/runtime change.

Hard-gate disposition: all twelve pass at contract/research level; gates 7, 8, and 10 retain explicit TASK-004 runtime proof. LOCK-INV-01 through LOCK-INV-13 are covered by the complete report without changing current authority. Researcher writes and implementation: none.


### Formal option report: RESTRICTED-ASCII-DOMAIN


Assignment and scope: evaluate a deliberately restrictive portable ASCII database/schema policy under the same `migrations:v2` literal without selecting the final architecture.

Identifier domain:

    database := one lowercase ASCII letter, then zero to 62 lowercase ASCII letters, digits, or underscores
    schema   := the same grammar, excluding the pg_ prefix

Length is 1 through 63 ASCII bytes. Database/schema names begin with a lowercase ASCII letter; later bytes are lowercase ASCII letters, decimal digits, or underscore. Schema names beginning with `pg_` are rejected. Unicode, uppercase, dollar sign, hyphen, space, quote, escape, separator, BOM, control characters, trimming, case folding, normalization, unquoting, search-path resolution, alias expansion, and truncation are forbidden. This admits `rick_and_morty`, `public`, `task_004_a`, and sanitized run-scoped names while deliberately excluding some valid PostgreSQL identifiers.

Catalog binding:

- Validate the grammar before key derivation, history access, or mutation; require exact UTF-8 server and client encodings; encode the accepted values once as ASCII/UTF-8 `Buffer` values.
- Use fixed SQL with the two buffers as `bytea` values. Require exactly one row, two raw buffers, exact equality with configuration, returned grammar conformance, and an identical post-lock rebind:

      SELECT
        pg_catalog.convert_to(d.datname::text, 'UTF8') AS database_bytes,
        pg_catalog.convert_to(n.nspname::text, 'UTF8') AS schema_bytes
      FROM pg_catalog.pg_database AS d
      CROSS JOIN pg_catalog.pg_namespace AS n
      WHERE pg_catalog.convert_to(d.datname::text, 'UTF8')
              = pg_catalog.convert_to(pg_catalog.current_database()::text, 'UTF8')
        AND pg_catalog.convert_to(d.datname::text, 'UTF8') = $1::bytea
        AND pg_catalog.convert_to(n.nspname::text, 'UTF8') = $2::bytea;

- Reject a 64-byte input before lookup; it must never bind to a silently truncated 63-byte catalog name. Missing, multiple, rewritten, unequal, non-buffer, or unsupported-encoding results fail closed.

The byte/key algorithm, signed decimal binding, 64-bit collision meaning, transaction sequence, ownership, timeout, interruption, connection-loss, ambiguous-commit recovery, redaction, and cooperative-lock limitation are identical to the exact-byte report after the grammar has accepted the two catalog buffers. The maximum payload is 175 bytes. The same artifact-preflight, explicit `READ COMMITTED`, bind, bounded try-lock, rebind, fresh-history-read, complete-command transaction, and transaction-end release order applies.

Deterministic accepted vectors, independently reproduced in Node and Python:

| Database | Schema | Result | SHA-256 | Signed key |
|---|---|---|---|---:|
| `rick_and_morty` | `public` | Accepted | `5e6b487e7bee9566d532743c03ce9f32620feae465b2c7e04fad2d88dc058e49` | `6803611370155578726` |
| `rick_and_morty` | `task_004_a` | Accepted | `6a644eaea472bf65b14be9d0a5fed984db47bd3620633b446476e75c5d6f6d94` | `7666338977681686373` |
| `rick_and_morty` | `task_004_b` | Accepted | `b2147a2b71e1d85ed06e2b601af075745dc37a3eaa23f026cb86f131c89e5f24` | `-5614728508411357090` |
| `a` | `bc` | Accepted | `38254f49a1e3e20be904178358adde1e4aa6393e76df357cd93632207170d268` | `4045727017929531915` |
| `ab` | `c` | Accepted | `b8e06f7ec921e2e0d23fc57ad0662d1b5b5d2b214c2450e58dab457d76cee9e9` | `-5124973785616620832` |

Required rejections include `RickMorty`, `CaseSensitive`, `PUBLIC`, quoted-token strings, composed and decomposed `café`, names beginning with underscore, names containing hyphen/dollar/space, `pg_catalog` as a schema, empty input, 64-byte input, trailing space, case near matches, and missing catalog rows. Rejection occurs without deriving a key.

TASK-004 proof obligations: grammar boundaries and every rejection; raw catalog buffer equality; UTF-8 checks; absence of rewriting or truncation; independent vectors; exact decimal `bigint`; same-namespace serialization; disjoint overlap; timeout/cancellation/interruption/loss/ambiguity; owned/borrowed cleanup; diagnostics; common-factory use by every supported entry point; Windows/CI agreement; and forbidden-coupling checks.

Score and recommendation:

| Criterion | Score / maximum |
|---|---:|
| Requirements traceability | 19 / 20 |
| Architectural fit and consistency | 18 / 20 |
| Options and trade-offs | 13 / 15 |
| Feasibility and proportionality | 14 / 15 |
| Quality attributes | 8 / 10 |
| Verifiability | 9 / 10 |
| Evolution and reversibility | 7 / 10 |
| **Total** | **88 / 100** |

Individual band: `Accept`, conditional on explicit adoption of the naming policy. Confidence: 0.88, high. Benefits are a one-byte-per-code-point domain, no Unicode-version concern, early portable failures, protection from case/quote/truncation aliases, and a small validation surface. Costs and residual risks are exclusion of valid PostgreSQL names, a new repository-wide operational naming policy not required by the source, difficult adoption for any out-of-domain deployment, future versioned transition when loosening the grammar, duplicate binding, cooperative locks, and projected false serialization. Strongest dissent: exact catalog bytes distinguish the excluded names safely without imposing unrequested policy. Reversal triggers include an actual out-of-domain environment, a Unicode/mixed-case/hyphenated requirement, equally simple exact-byte proof, excessive policy spread, driver failure, catalog-rebind failure, or changed PostgreSQL identifier semantics.

Hard-gate disposition: all twelve pass at contract/research level, with out-of-domain cases rejected rather than aliased and runtime proof explicitly deferred. LOCK-INV-01 through LOCK-INV-13 are covered without changing authority. Researcher writes and implementation: none.


### Formal option report: CATALOG-OID-PAIR


Assignment and scope: evaluate identity derived from the current PostgreSQL database OID and namespace OID under the same `migrations:v2` literal without selecting the final architecture.

Identifier and catalog contract:

- Require raw configured database/schema strings, reject U+0000 and unpaired surrogates, and perform no normalization, folding, trimming, quoting reinterpretation, or truncation.
- Encode each value as UTF-8 lowercase hex text and bind it to fixed catalog queries on the dedicated transaction connection.
- Database lookup:

      SELECT
        d.oid::text AS database_oid,
        pg_catalog.encode(
          pg_catalog.convert_to(d.datname::text, 'UTF8'),
          'hex'
        ) AS database_name_utf8_hex
      FROM pg_catalog.pg_database AS d
      WHERE d.datname = pg_catalog.current_database()
        AND pg_catalog.convert_to(d.datname::text, 'UTF8')
            = pg_catalog.decode($1::text, 'hex');

- Namespace lookup:

      SELECT
        n.oid::text AS namespace_oid,
        pg_catalog.encode(
          pg_catalog.convert_to(n.nspname::text, 'UTF8'),
          'hex'
        ) AS namespace_name_utf8_hex,
        (
          n.oid = pg_catalog.pg_my_temp_schema()
          OR pg_catalog.pg_is_other_temp_schema(n.oid)
        ) AS is_temporary
      FROM pg_catalog.pg_namespace AS n
      WHERE pg_catalog.convert_to(n.nspname::text, 'UTF8')
            = pg_catalog.decode($1::text, 'hex');

- Require exactly one row per query, exact returned hex equality, a non-temporary namespace, and canonical decimal OIDs in the range 1 through 4294967295 parsed only with `BigInt`. Rebind after lock acquisition and require the same OIDs and names before history.
- A rename keeps the current object OID and therefore the key after configuration is updated. Drop/recreate denotes a new object and ordinarily a new key. Logical dump/restore recomputes OIDs; full physical copying preserves catalog files but not a portable cross-cluster lock. OID wrap/reuse means the pair is not a permanent historical identifier.

Byte/key contract:

    databaseOidBytes = U32BE(databaseOid)
    namespaceOidBytes = U32BE(namespaceOid)

    payload =
      LP(UTF8("rick-and-morty-explorer:migrations:v2"))
      || LP(databaseOidBytes)
      || LP(namespaceOidBytes)

    digest = SHA-256(payload)
    signed = first 8 digest bytes interpreted as signed two's-complement bigint

Each OID contributes exactly four bytes. Bind the canonical signed decimal string to `pg_try_advisory_xact_lock($1::bigint)`; never use JavaScript `number`. Direct two-integer advisory locking was rejected inside this candidate because it would omit the common version literal and digest contract. A projection collision retains the same safe-false-serialization meaning.

The artifact-preflight, explicit `READ COMMITTED`, dedicated connection, pre-lock catalog binding, bounded sequential polling, post-lock identical rebind, fresh history read, complete-command transaction, owned/borrowed cleanup, timeout, cancellation, interruption, connection loss, ambiguous no-retry recovery, and redacted diagnostic contract are carried forward. Diagnostics also include decimal database/namespace OIDs. A namespace change during polling returns a stable nonzero result rather than silently re-keying.

Synthetic deterministic vectors reproduced in Node and Python:

| Database OID | Namespace OID | SHA-256 | Signed key |
|---:|---:|---|---:|
| 1 | 1 | `1e962179c1ee8ec371e1202ff4d889cd5fc6602a9000748b95a891f7dfb23ee6` | `2203985874472832707` |
| 16384 | 16385 | `083f7685f49694dc79b812ee8769b29f7e4f97931508cd8fa001b5ab71aa8c98` | `594323993542431964` |
| 4294967295 | 2147483648 | `68e3e5230638f9b590d48512d9511ee1961e7d2bbf7ab52bd65811c34441e6b7` | `7558136538248837557` |
| 1 | 23 | `a5c6d0974afeb3dffacb30638800a544abbfcfe6945977c9c31cdbdb20edb41c` | `-6501279663845887009` |
| 12 | 3 | `05306fde6d1c89ee3242e5aad2f5d66ee1239b775bdaa15ad34f11a522fa116f` | `373921770175760878` |

The last two pairs prove framing and both signed branches. Name fixtures for the three ADR-0012 pairs, case distinctions, composed/decomposed Unicode, missing names, temporary schemas, rename, and recreation must derive assertions from runtime-assigned OIDs; fixed name-to-key values are not portable across fresh clusters or logical restore.

TASK-004 proof obligations: exact lookup and decimal parsing; name/OID rebind; temporary rejection; observed rename/recreation and logical-reconstruction semantics; fixed synthetic vectors; exact driver binding; same-object serialization; disjoint overlap; timeout/cancellation/interruption/loss/ambiguity; owned/borrowed cleanup; Windows/CI agreement; and forbidden coupling.

Score and recommendation:

| Criterion | Score / maximum |
|---|---:|
| Requirements traceability | 20 / 20 |
| Architectural fit and consistency | 17 / 20 |
| Options and trade-offs | 13 / 15 |
| Feasibility and proportionality | 11 / 15 |
| Quality attributes | 7 / 10 |
| Verifiability | 7 / 10 |
| Evolution and reversibility | 5 / 10 |
| **Total** | **80 / 100** |

Individual band: `Accept with explicit follow-ups and residual risks`; do not prefer it without a demonstrated need for rename-stable object identity. Confidence: 0.86 on current semantics, medium on operational desirability. Benefits are Unicode-safe current-object identity, compact fixed-width inputs, rename continuity, and catalog correlation. Costs and residual risks are redundant database identity inside a database-local lock space, nonportable and reusable OIDs, key changes after reconstruction, runtime-dependent name vectors, additional lookups, weaker incident correlation, cooperative locking, and projected collisions. Strongest dissent: exact catalog bytes retain correctness with stable logical name-to-key behavior and fewer operational surprises. Reversal triggers include restore continuity requirements, confusing OID churn, unprovable recreation behavior, PostgreSQL OID changes, cross-cluster requirements, platform disagreement, or a need for stable name-based conformance vectors.

Hard-gate disposition: all twelve pass at contract/research level, with the required name fixtures divided honestly from synthetic fixed-key fixtures and runtime proof deferred. LOCK-INV-01 through LOCK-INV-13 are covered without changing current authority. Researcher writes and implementation: none.


### Formal decision analysis


A read-only `decision_analyst` completed the synthesis at 2026-08-13 04:18Z. It independently reproduced all reported exact-name and synthetic-OID digest/key vectors in Node.js, audited the three reports against the same authorities and rubric, made no repository write, and returned exactly `DRAFT READY`. This verdict means proposal-drafting readiness only.

Comparability audit:

- All three reports use the same contract, seven criteria, evidence priority, `migrations:v2` literal, concurrency/ownership/failure model, downstream boundary, and no-write status.
- Each supplies an end-to-end identity domain, fixed catalog binding, serialization, signed projection, fixtures, TASK-004 proof obligations, costs, dissent, reversal triggers, confidence, and recommendation.
- PostgreSQL, Node.js, and node-postgres primary sources support the catalog, byte conversion, advisory-lock, transaction, numeric, outbound parameter, and dedicated-connection claims.
- Raw `bytea` result parsing through the future locked Sequelize/node-postgres path is not proven by current documentation and remains an explicit TASK-004 obligation.
- The ASCII option's added UTF-8 server/client restriction and repository-wide name policy count as costs. OID reconstruction behavior remains clearly labeled inference. No report presents real PostgreSQL behavior as current evidence.
- Rejecting current-session and other-session temporary namespaces is a bounded cross-report clarification required by persistent migration history; it does not change the selected exact-name identity or serialization.

Normalized matrix:

| Criterion | Maximum | Exact catalog bytes | Restricted ASCII | Catalog OID pair |
|---|---:|---:|---:|---:|
| Requirements traceability | 20 | 20 | 18 | 19 |
| Architectural fit and consistency | 20 | 19 | 17 | 16 |
| Options and trade-offs | 15 | 14 | 13 | 13 |
| Feasibility and proportionality | 15 | 12 | 13 | 10 |
| Quality attributes | 10 | 9 | 8 | 7 |
| Verifiability | 10 | 9 | 9 | 7 |
| Evolution and reversibility | 10 | 8 | 6 | 5 |
| **Total** | **100** | **91** | **84** | **77** |
| **Band** |  | **Accept** | **Accept with explicit follow-ups and residual risks** | **Accept with explicit follow-ups and residual risks** |

Ranking and rationale:

1. `EXACT-CATALOG-BYTES` preserves all exact persistent PostgreSQL names, stable logical name-to-key behavior, portability, and proportionality without an unrelated naming policy.
2. `RESTRICTED-ASCII-DOMAIN` is technically safe but still needs catalog/driver/concurrency proof and excludes valid names without a present requirement; later domain expansion needs a versioned transition.
3. `CATALOG-OID-PAIR` is technically viable but adds runtime-assigned fixtures, reconstruction churn, weaker incident correlation, and rename-stable object semantics for which no present need exists.

Selected exact semantics for the primary-authored outline:

- Admit primitive, non-empty, well-formed Unicode-scalar database/schema strings; reject U+0000, unpaired surrogates, failed encoding, missing or multiple catalog tuples, non-`Buffer` results, byte inequality, catalog drift, and current-session or other-session temporary namespaces.
- Treat configuration as raw identifier values, never SQL tokens. Perform no trimming, Unicode normalization, folding, unquoting, escape interpretation, search-path resolution, percent decoding, aliasing, or truncation.
- On one dedicated transaction connection, bind locally encoded UTF-8 buffers to the current database and one persistent schema through fixed `pg_catalog` SQL using `convert_to(..., 'UTF8')`; require one row, exact returned-buffer equality, and `is_temporary = false`.
- Hash the equal server-returned buffers. Repeat the identical catalog bind after lock acquisition and require byte equality with the first binding before history.
- Name bytes, not OIDs, define identity. Rename changes the key; exact-name drop/recreate reuses it; logical reconstruction under unchanged names preserves it; separate clusters never coordinate.
- Define `LP(x)` as four-byte unsigned big-endian byte length followed by `x`, then:

      payload =
        LP(UTF8("rick-and-morty-explorer:migrations:v2"))
        || LP(databaseCatalogUtf8Bytes)
        || LP(schemaCatalogUtf8Bytes)

      digest = SHA-256(payload)
      unsigned = first 8 digest bytes as unsigned big-endian bigint
      signed = unsigned < 2^63 ? unsigned : unsigned - 2^64

- The literal is exactly 37 UTF-8 bytes. Use JavaScript `bigint` only and bind `signed.toString(10)` through an explicit PostgreSQL `bigint` cast; never use JavaScript `number`.
- State that the 64-bit projection is not injective. A different-namespace collision safely serializes and may reduce availability; it cannot allow concurrent execution against one namespace.
- Preserve immutable-artifact preflight, explicit `READ COMMITTED`, pre-lock catalog bind, bounded sequential `pg_try_advisory_xact_lock(bigint)` polling, post-lock rebind, fresh history read, complete-command transaction, and transaction/session-end release.
- Preserve one-factory/every-entry-point cooperation, explicit owned/borrowed cleanup, damaged-connection invalidation, primary-versus-cleanup failure separation, timeout rollback, interruption cleanup, connection-loss behavior, and ambiguous-commit no-retry recovery through locked read-only status.
- Preserve result mapping: success/status/no-op `0`, lock contention `2`, and all other primary failures `1`.
- Define stable diagnostic codes `MIGRATION_NAMESPACE_INVALID`, `MIGRATION_NAMESPACE_BIND_FAILED`, `MIGRATION_NAMESPACE_CHANGED`, `MIGRATION_LOCK_TIMEOUT`, `MIGRATION_LOCK_INTERRUPTED`, `MIGRATION_CONNECTION_LOST`, `MIGRATION_COMMIT_AMBIGUOUS`, plus secondary `MIGRATION_CLEANUP_FAILED`. Include escaped identifiers, byte lengths, `v2`, signed decimal key, elapsed wait, and cleanup result; exclude secrets and raw connection configuration.
- Prohibit mixed `v1`/`v2` execution against one namespace. The historical `migrations:v1` value is neither reused nor reinterpreted.

Hard-gate result:

| Hard gate | Analyst disposition |
|---:|---|
| 1 | Pass: selected identity performs no rewriting and framed admitted tuples differ before projection. |
| 2 | Pass contractually: exact one-tuple persistent-catalog bind and post-lock equality; runtime fidelity deferred. |
| 3 | Pass: exact new `migrations:v2`; `v1` remains historical and prohibited. |
| 4 | Pass: UTF-8 buffers, uint32-BE LP, SHA-256, first-eight projection, two's-complement, `bigint`, decimal binding. |
| 5 | Pass: projected collision is disclosed safe false serialization. |
| 6 | Pass: all ADR-0012 ordering and transaction clauses are preserved. |
| 7 | Contract complete; two-caller and disjoint runtime proof remains TASK-004. |
| 8 | Contract complete; ownership and failure runtime proof remains TASK-004. |
| 9 | Pass: ASCII, case, Unicode, rejection, framing, and signed-branch fixtures exist. |
| 10 | Pass: calculation and documentation only. |
| 11 | Pass: normalized score 91 with measurable validation and no hidden conflict. |
| 12 | Pass: current authority/status/dependency/implementation state is unchanged. |

Invariant audit:

| Invariant set | Analyst result |
|---|---|
| LOCK-INV-01/02 | Complete research/analysis/outline packet; no ADR allocation or authority change. |
| LOCK-INV-03/04 | Exact non-normalized admitted bytes, persistent one-row catalog bind, and post-lock rebind. |
| LOCK-INV-05/06 | Exact 37-byte literal, LP framing, reproduced positive/negative digests, and decimal `bigint`. |
| LOCK-INV-07/08 | Same/disjoint semantics fixed; real concurrency remains TASK-004. |
| LOCK-INV-09/10 | Dedicated transaction, ownership, failure, cleanup, ambiguity, and recovery semantics fixed. |
| LOCK-INV-11 | Platform-independent algorithm fixed; driver and Windows/CI proof remains TASK-004. |
| LOCK-INV-12 | Prospective whole-record successor outline; ADR-0012 remains Accepted. |
| LOCK-INV-13 | Documentation/calculation only; no migration behavior claimed. |

Decide now versus prove later:

| Decide in the successor | Prove or select reversibly in downstream work |
|---|---|
| Admitted/rejected domain and temporary-schema rejection | Locked Sequelize/node-postgres patches and raw `bytea` result shape |
| Fixed exact catalog query/equality/rebind | Exact decimal `bigint` arrival |
| `migrations:v2`, LP, digest, and signed conversion | Two-caller serialization and winner-commit visibility |
| Rename/recreation/restore/cluster identity meaning | Disjoint overlap and actual lock visibility/release |
| Lock order, isolation, same/disjoint and collision meaning | Owned/borrowed cleanup, cancellation, loss, ambiguity, and recovery behavior |
| Ownership, timeout, interruption, ambiguity, result and diagnostic contracts | Windows/CI and every-entry-point equivalence |
| Whole-record lifecycle, downstream ownership, and reversal triggers | Default timeout, polling interval, module names, implementation syntax, and all migration/schema outcomes |

Strongest dissent: the ASCII option has a smaller validation function and avoids Unicode-version concerns. The analyst rejected it because exact UTF-8 catalog bytes already distinguish case and composed/decomposed names, while ASCII does not eliminate catalog lookup, byte transport, signed binding, locking, cleanup, or concurrency proof and adds an unsupported operational policy.

Residual risks are future raw-driver incompatibility, cooperative-lock bypass, projected false serialization, rename re-keying, exact-name reuse, external privileged DDL, ambiguous commit, topology disclosure through poorly controlled diagnostics, and prohibited mixed-version execution. Reversal triggers are an admitted alias or byte discrepancy, failed raw-byte or `bigint` proof, platform disagreement, unreliable rebind, a demonstrated object-identity requirement, unacceptable name reuse, material collision cost, a documented restrictive naming policy, or incompatible PostgreSQL/driver/runtime behavior.

Prospective whole-record ADR outline:

1. Keep the successor `Proposed`, state that supersession becomes effective only upon project-owner acceptance, leave DG-005 Pending, and do not edit ADR-0012.
2. Record the NFC collision, current authority matrix, absence of implementation, and whole-record lifecycle need.
3. Preserve stable Sequelize 6/private Umzug 3, strict TypeScript, emitted native ESM, roots, canonical paths, normalization/hashing, artifact schema/build-ID/vector/mappings/allowlists, immutable staging/publication/preflight, resolver/context/factory, checksummed exact-prefix history, lifecycle order, commands, bounded rollback, complete transaction, nontransactional-DDL prohibition, interfaces, results, ownership, recovery, and forbidden coupling.
4. Replace only the NFC `migrations:v1` identity clauses and vectors with the exact `v2` contract above.
5. Carry forward TASK-004 implementation proof and TASK-014 ERD ownership.

Validation map: current Node/Python calculation evidence; fresh IR-A before allocation/drafting; proposal documentation/ADR validators, diff and negative searches, hashes, and vector reproduction; TASK-004 real PostgreSQL/driver/concurrency/ownership/failure/platform proof; fresh IR-B over the exact final proposal and all thirteen invariants. No validation is implementation evidence.

Proposal-stage documentation impact: allocate one collision-safe Proposed ADR after IR-A; update the ADR index, TASK-018 plan/index, implementation-plan DG-005 navigation, system diagram, root current status, specification routing, TASK-004 waiting references, and append-only execution chronology. ADR-0012, DG-005, TASK-018, TASK-004, and TASK-004 dependencies remain unchanged. Acceptance-stage lifecycle updates remain outside current authority.

Analyst confidence: 0.91, high, for the recommendation/semantics and 0.72, moderate, for downstream driver/runtime feasibility. Readiness: `DRAFT READY`. No owner direction is needed before drafting; later approval or rejection of the exact reviewed proposal remains owner-controlled.


### Historical IR-A checkpoint and superseded outline correction


Fresh read-only IR-A reviewed plan SHA-256 `3858C82E9D1299E33343BBD752F40C8E26BEB06774EA5F3D70082ABC9321D2B3` at repository HEAD `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`. It independently reproduced every selected Node.js/Python vector, confirmed the 91/84/77 arithmetic, found no Blocker or Minor, and returned `REVISE` for one Major:

- The selected semantics required temporary-schema rejection, but the earlier exact-byte query did not project or filter PostgreSQL's temporary-schema predicates.
- The historical report's lock example used `pg_catalog.bigint`, but PostgreSQL's catalog type name is `pg_catalog.int8`; bare `bigint` is parser syntax.

IR-A passed hard gates 1, 3, 5 through 10, and 12; gates 2, 4, and 11 required the bounded SQL correction. It passed LOCK-INV-02/03/05/07/08/09/10/11/13; LOCK-INV-01/04/06/12 required the same correction. It confirmed: ADR-0012 remained Accepted and unchanged; DG-005 and TASK-004 remained Pending; TASK-018 remained In progress; TASK-004 retained exactly TASK-002/TASK-003 dependencies and no TASK-018 edge; no successor ADR or migration artifact existed; and every legacy-literal reference was historical or prohibitive. Reviewer confidence was 0.97 on the finding and 0.92 overall. The reviewer made no write.

At that point in the review chronology, the following `IR-A-OC-01` block was proposed as the sole SQL/binding outline. It is preserved only as point-in-time correction evidence. Complete re-review proved it defective, and neither this block nor any earlier SQL/result block controls successor drafting. The sole controlling contract is the final `Targeted research re-entry: search-path-independent exact-byte binding` query/result contract together with the final `Complete renewed decision analysis: DRAFT READY` synthesis below.

Validate the two configured values locally under the selected Unicode-scalar/no-U+0000/no-rewriting rules and bind their exact UTF-8 `Buffer` values as `$1` and `$2`. On the dedicated transaction connection, before lock acquisition and again after acquisition, execute this exact fixed query:

~~~sql
SELECT
  pg_catalog.convert_to(
    d.datname::pg_catalog.text,
    'UTF8'
  ) AS database_name_bytes,
  pg_catalog.convert_to(
    n.nspname::pg_catalog.text,
    'UTF8'
  ) AS schema_name_bytes,
  (
    n.oid = pg_catalog.pg_my_temp_schema()
    OR pg_catalog.pg_is_other_temp_schema(n.oid)
  ) AS is_temporary
FROM pg_catalog.pg_database AS d
CROSS JOIN pg_catalog.pg_namespace AS n
WHERE d.datname = pg_catalog.current_database()
  AND pg_catalog.convert_to(
        d.datname::pg_catalog.text,
        'UTF8'
      ) = CAST($1 AS pg_catalog.bytea)
  AND pg_catalog.convert_to(
        n.nspname::pg_catalog.text,
        'UTF8'
      ) = CAST($2 AS pg_catalog.bytea);
~~~

The result contract is exact: no `LIMIT`; require exactly one row; require both byte columns to be raw `Buffer` values; require each to equal its bound configured buffer; require successful UTF-8 conversion; require `is_temporary === false` as a real boolean; and, after locking, require the returned buffers to equal the retained pre-lock buffers. Zero/multiple rows, a non-buffer, a non-boolean flag, temporary namespace, conversion error, input inequality, or pre/post drift returns the applicable stable namespace error before history access or mutation.

Poll this exact lock statement sequentially on the same connection with the signed decimal string as `$1`:

~~~sql
SELECT pg_catalog.pg_try_advisory_xact_lock(
  CAST($1 AS pg_catalog.int8)
) AS acquired;
~~~

Require one row and an exact boolean `acquired` result. The value originates from JavaScript `bigint.toString(10)` and never passes through `number`. A false result continues bounded polling; malformed/non-boolean output is a primary failure rather than lock contention.

This correction implements already-selected persistent-schema rejection and PostgreSQL signed-64-bit binding. It changes no identity domain beyond the analyst-reviewed temporary-schema clarification, no `migrations:v2` bytes, vector, projection, score, option ranking, concurrency order, ownership, failure/recovery model, lifecycle, or downstream proof boundary. Full IR-A re-review is required before collision checking or drafting.

Complete IR-A re-review returned `REVISE` rather than `PASS`. PostgreSQL maintains separate current-session main and TOAST temporary namespace OIDs. `pg_my_temp_schema()` covers only the main namespace, and `pg_is_other_temp_schema(oid)` excludes both namespaces owned by the calling session. The current session's `pg_toast_temp_<backend>` namespace therefore produces `is_temporary = false` in IR-A-OC-01. Hard gates 2 and 11 and LOCK-INV-01/04/11/12 remain open; every other gate, invariant, vector, score, carry-forward item, authority state, dependency, and negative implementation check passed.

IR-A re-review confidence was 0.99 on the defect and 0.97 overall. Documentation and ADR validation and `git diff --check` passed; Node/Python vectors still agreed; ADR-0012 remained unchanged and Accepted; no successor ADR was allocated; DG-005/TASK-004 remained Pending; TASK-018 remained In progress; TASK-004 retained exactly TASK-002/TASK-003 dependencies; and no migration artifact existed. The reviewer made no write.

IR-A-OC-01 is retained as point-in-time correction evidence but is not draft-authorizing. Because the permitted outline correction was exhausted, no second local correction may control successor drafting. Targeted research must define a source-grounded predicate for current main temporary, current temporary TOAST, other-session main temporary, and other-session temporary TOAST namespaces, then renewed analysis and a new complete independent checkpoint must pass before collision checking.


### Targeted research re-entry: complete temporary-namespace classification


A new read-only `technology_researcher` examined only the temporary-namespace defect and returned `READY FOR RE-ANALYSIS` at 2026-08-13 04:54Z. The researcher made no write, performed no runtime or migration work, and changed no authority.

Primary-source facts:

- PostgreSQL documents `pg_my_temp_schema()` as the current session's main temporary-schema OID or zero before initialization; `pg_is_other_temp_schema(oid)` reports another session's temporary schema.
- REL_18_STABLE keeps separate `myTempNamespace` and `myTempToastNamespace` values. Its public function union omits the caller's TOAST namespace by design.
- PostgreSQL's complete internal `isAnyTempNamespace` function compares the first 8 C bytes with `pg_temp_` or the first 14 C bytes with `pg_toast_temp_`. It includes current/other and main/TOAST namespaces.
- Temporary initialization creates both prefixes with the same backend-number suffix. Current PostgreSQL source retains the classifier.
- Supported `CREATE SCHEMA` and schema rename reserve the `pg_` prefix. PostgreSQL itself therefore treats any catalog namespace with either exact prefix as temporary; rejecting a prefix match cannot exclude a supported ordinary user schema.
- `convert_to`, `decode`, bytea `substr`, and bytea equality give explicit byte semantics without collation, pattern matching, or Unicode normalization.

The targeted report's exact candidate query is:

~~~sql
SELECT
  pg_catalog.convert_to(
    d.datname::pg_catalog.text,
    'UTF8'
  ) AS database_name_bytes,
  pg_catalog.convert_to(
    n.nspname::pg_catalog.text,
    'UTF8'
  ) AS schema_name_bytes
FROM pg_catalog.pg_database AS d
CROSS JOIN pg_catalog.pg_namespace AS n
WHERE d.datname = pg_catalog.current_database()
  AND pg_catalog.convert_to(
        d.datname::pg_catalog.text,
        'UTF8'
      ) = CAST($1 AS pg_catalog.bytea)
  AND pg_catalog.convert_to(
        n.nspname::pg_catalog.text,
        'UTF8'
      ) = CAST($2 AS pg_catalog.bytea)
  AND NOT (
    pg_catalog.substr(
      pg_catalog.convert_to(
        n.nspname::pg_catalog.text,
        'UTF8'
      ),
      1,
      8
    ) = pg_catalog.decode('70675f74656d705f', 'hex')
    OR
    pg_catalog.substr(
      pg_catalog.convert_to(
        n.nspname::pg_catalog.text,
        'UTF8'
      ),
      1,
      14
    ) = pg_catalog.decode(
      '70675f746f6173745f74656d705f',
      'hex'
    )
  );
~~~

The constants decode exactly to the ASCII/UTF-8 bytes for `pg_temp_` and `pg_toast_temp_`. This query performs no normalization, folding, pattern matching, collation comparison, driver-side prefix construction, search-path resolution, or identifier-token interpretation.

Proposed result contract for renewed analysis:

- Run this identical query before and after lock acquisition with the locally validated exact database/schema UTF-8 buffers as `$1`/`$2`. Use no `LIMIT`.
- Pre-lock, require exactly one row and two raw buffers exactly equal to the inputs; zero/multiple rows map to `MIGRATION_NAMESPACE_BIND_FAILED`.
- All four temporary namespace classes yield zero rows before history access or mutation.
- Post-lock, require exactly one row and exact equality with both inputs and the retained pre-lock buffers; zero/multiple rows or drift map to `MIGRATION_NAMESPACE_CHANGED`.
- Conversion errors, non-buffer results, and input inequality remain primary failures.
- The `pg_temp` configuration alias is never resolved; it has no exact catalog row and fails closed.
- Retain only the independently verified `pg_try_advisory_xact_lock(CAST($1 AS pg_catalog.int8))` lock statement with one exact boolean result and a decimal string produced from JavaScript `bigint`; no namespace-query or result-shape clause from `IR-A-OC-01` survives.

Required TASK-004 PostgreSQL fixtures:

| Target observed from session A | Expected rows | Required distinction |
|---|---:|---|
| Ordinary persistent target before A initializes temp state | 1 | `pg_my_temp_schema()` may be zero |
| A current `pg_temp_<A>` | 0 | Current main |
| A current `pg_toast_temp_<A>` | 0 | Current TOAST; reproduces the prior defect |
| B `pg_temp_<B>` while B remains connected | 0 | Other main |
| B `pg_toast_temp_<B>` while B remains connected | 0 | Other TOAST |
| `pg_catalog` | 1 | Reserved but persistent |
| `public`, when present | 1 | Ordinary persistent |
| Run-scoped custom persistent schema | 1 | Ordinary isolated target |

TASK-004 must also prove raw bytea results, absence of any history access or mutation for rejected targets, identical pre/post behavior, two-session ownership and cleanup, Windows/CI agreement, locked PostgreSQL behavior, and continued admission of persistent case-distinct and composed/decomposed names. These are future obligations, not current evidence.

The report recommends retaining `EXACT-CATALOG-BYTES` at 91/100. The identity source, `migrations:v2` literal, payload, vectors, ranking, concurrency order, ownership, recovery, and lifecycle do not change. The only new mechanic is the complete source-mirrored admission predicate. Confidence is 0.96 on PostgreSQL 18/current semantics and 0.82 on future driver execution.

Residual risk: the prefixes are PostgreSQL implementation behavior rather than SQL-standard semantics, so every major PostgreSQL upgrade must revalidate them. An unsupported direct catalog modification could create a persistent-looking object under a reserved prefix, but supported PostgreSQL DDL forbids it and PostgreSQL's own classifier would call it temporary. No local PostgreSQL runtime execution is claimed; that proof remains TASK-004.

Source set:

- [PostgreSQL 18 system-information functions](https://www.postgresql.org/docs/18/functions-info.html).
- [REL_18_STABLE namespace classification](https://github.com/postgres/postgres/blob/REL_18_STABLE/src/backend/catalog/namespace.c#L3442-L3508).
- [REL_18_STABLE temporary initialization](https://github.com/postgres/postgres/blob/REL_18_STABLE/src/backend/catalog/namespace.c#L4179-L4226).
- [Current namespace source](https://github.com/postgres/postgres/blob/master/src/backend/catalog/namespace.c#L3538-L3571).
- [PostgreSQL 18 CREATE SCHEMA](https://www.postgresql.org/docs/18/sql-createschema.html).
- [PostgreSQL 18 pg_namespace](https://www.postgresql.org/docs/18/catalog-pg-namespace.html).
- [PostgreSQL 18 binary-string functions](https://www.postgresql.org/docs/18/functions-binarystring.html).

The query and result contract in this targeted report are preserved as point-in-time research evidence only. Renewed analysis below found that the unqualified equality operators invalidate its claim of search-path independence, so this block does not authorize checkpoint review or successor drafting.


### Renewed decision analysis: operator-resolution return


The read-only `decision_analyst` reviewed the complete plan at SHA-256 `8F33D60C46E2FF192BE73491D61BC3782E8E47BD3EBBDF20EC465FEB8E778995` and returned exactly `RETURN FOR RESEARCH` at 2026-08-13 05:06Z. The analyst made no write, allocated no ADR, and changed no task, gate, dependency, lifecycle, or implementation state.

The temporary-prefix research is source-grounded as far as PostgreSQL's four-class namespace classifier is concerned. It covers current-session and other-session main and TOAST temporary namespaces, admits ordinary persistent schemas, does not expand the `pg_temp` alias, and preserves the exact-byte identity, `migrations:v2` framing, vectors, and operational model. It is not yet a complete SQL contract because its five `=` invocations are unqualified.

PostgreSQL resolves unqualified operators through `search_path`. Explicitly placing `pg_catalog` later permits an exact-signature user-defined operator earlier in the path to win, and PostgreSQL defines `OPERATOR(pg_catalog.=)` as the qualification form. A shadowing `bytea = bytea` operator can return true for configured full-name comparisons and false for both prefix comparisons, admitting a temporary namespace. Consequently, the targeted query's statement that it performs no search-path resolution is false and decision-critical.

The analyst also found that the durable `CATALOG-OID-PAIR` report remains asymmetric: it retains the defective public-helper temporary classifier and unqualified types/operators. The all-temp research is applicable across candidates, but the primary cannot silently synthesize a revised OID contract. Comparable research must normalize that candidate under the same complete, search-path-independent catalog-admission standard.

The normalized design-level matrix remains provisionally justified:

| Criterion | Max | Exact catalog bytes | Restricted ASCII | Catalog OID pair |
|---|---:|---:|---:|---:|
| Requirements traceability | 20 | 20 | 18 | 19 |
| Architectural fit and consistency | 20 | 19 | 17 | 16 |
| Options and trade-offs | 15 | 14 | 13 | 13 |
| Feasibility and proportionality | 15 | 12 | 13 | 10 |
| Quality attributes | 10 | 9 | 8 | 7 |
| Verifiability | 10 | 9 | 9 | 7 |
| Evolution and reversibility | 10 | 8 | 6 | 5 |
| **Total** | **100** | **91** | **84** | **77** |

`EXACT-CATALOG-BYTES` remains ranked first, but its acceptance band is suspended. The identity itself remains supported: primitive non-empty well-formed Unicode-scalar inputs; rejection of U+0000, lone surrogates, and encoding failure; exact catalog UTF-8 buffers; no normalization, trimming, folding, unquoting, alias expansion, token interpretation, or truncation; all-four-temp rejection; pre-lock and post-lock exact binding; name-based rename/recreation/reconstruction semantics; exact `migrations:v2` length framing; SHA-256 and signed-first-eight-byte projection; JavaScript `bigint` and decimal-string `pg_catalog.int8` binding; and every unaffected ADR-0012 ordering, transaction, connection, failure, recovery, diagnostic, and result clause. Mixed `v1`/`v2` execution remains prohibited, and the historical literal remains defect evidence only.

The lock statement remains source-grounded:

~~~sql
SELECT pg_catalog.pg_try_advisory_xact_lock(
  CAST($1 AS pg_catalog.int8)
) AS acquired;
~~~

It requires exactly one row and an exact boolean, with the parameter produced by `signed.toString(10)` and never converted through JavaScript `number`. No namespace query is currently suitable for ADR text.

The next research packet must choose and fully specify one search-path-independent namespace mechanism, such as qualifying every equality operator, using an explicitly controlled safe path, or performing local prefix rejection over exact returned bytes. It must also make diagnostic mapping exhaustive: local input failure maps to `MIGRATION_NAMESPACE_INVALID`; pre-lock binding or result-shape failure maps to `MIGRATION_NAMESPACE_BIND_FAILED`; post-lock binding, result-shape, or byte drift maps to `MIGRATION_NAMESPACE_CHANGED`; and malformed lock-result shape has an explicit stable diagnostic rather than being conflated with contention.

Hard-gate result: gates 1 and 3 through 10 and 12 pass at the decision-contract level. Gate 2 remains open because operator shadowing can admit a temporary namespace. Gate 11 remains open because ambient operator resolution is a hidden high-impact assumption and candidate evidence is asymmetric.

Invariant result: LOCK-INV-02/03/05/06/07/08/09/10/13 pass contractually at this stage. LOCK-INV-01 is open because exact and OID query contracts are not both complete. LOCK-INV-04 is open because temporary rejection is not search-path-independent. LOCK-INV-11 is open because behavior can depend on ambient operator lookup. LOCK-INV-12 is open because the replacement SQL is not draft-ready.

The strongest dissent remains `RESTRICTED-ASCII-DOMAIN`: it avoids Unicode-version exposure and can use a smaller local validator, but it introduces an unrequired repository-wide naming policy and still does not remove catalog, driver, locking, connection, cleanup, or concurrency proof. `CATALOG-OID-PAIR` remains third because rename-stable runtime identity brings reconstruction churn and weaker diagnostics without a demonstrated requirement.

Decide-now work remains exact catalog admission and operator resolution, exhaustive diagnostics, admitted/rejected domain, pre/post binding, `migrations:v2` framing and signed projection, rename/recreation/reconstruction/cluster meaning, and the carried-forward lifecycle contract. TASK-004 continues to own real driver byte shape, exact `int8` arrival, the four temporary fixtures, persistent admissions, same/disjoint concurrency, cleanup, cancellation, loss, ambiguity, Windows/CI behavior, migration runner, schema, history, and ERD evidence.

Required re-entry sequence:

1. Produce exact source-grounded search-path-independent namespace SQL and exhaustive result mappings.
2. Normalize the OID candidate under the same complete temporary-classification and operator-resolution standard.
3. Rerun complete normalized analysis, all twelve hard gates, and LOCK-INV-01 through LOCK-INV-13.
4. Obtain a new complete independent contract checkpoint.
5. Only after a checkpoint `PASS`, perform the ADR collision check and let the primary draft the whole-record proposal.

Source set added by the analyst:

- [PostgreSQL 18 operator type resolution](https://www.postgresql.org/docs/18/typeconv-oper.html).
- [PostgreSQL 18 schema search-path rules](https://www.postgresql.org/docs/18/ddl-schemas.html).
- [PostgreSQL 18 qualified operator invocation](https://www.postgresql.org/docs/18/sql-expressions.html#SQL-SYNTAX-OPERATOR-INVOCATIONS).

Confidence: 0.99 in the operator-resolution defect, 0.97 in the `RETURN FOR RESEARCH` readiness result, 0.92 that exact bytes remains the best identity after repair, and 0.72 in downstream driver/runtime feasibility pending TASK-004 evidence.

Authority after analysis: ADR-0012 remains unchanged and `Accepted`; no successor ADR is allocated; DG-005 and TASK-004 remain `Pending`; TASK-018 remains `In progress`; TASK-004 still depends exactly on TASK-002 and TASK-003; no migration, driver, schema, history, or ERD artifact exists; and legacy-literal references remain historical or prohibitive.


### Targeted research re-entry: search-path-independent exact-byte binding


A separate read-only `technology_researcher` compared three repairs for `EXACT-CATALOG-BYTES` and returned exactly `READY FOR RE-ANALYSIS` at 2026-08-13 05:16Z. The researcher made no repository write or authority change.

Primary-source findings:

- Unqualified PostgreSQL operators are selected from those visible in `search_path`; `OPERATOR(schema.operator)` is the supported qualification syntax.
- REL_18_STABLE provides exact built-in `name = name` and `bytea = bytea` operators in `pg_catalog`.
- PostgreSQL grammar parses `AND`, `OR`, and `NOT` directly as boolean-expression nodes; they are not `pg_operator` entries and cannot be shadowed through `search_path`.
- PostgreSQL's internal classifier uses exact byte prefixes `pg_temp_` and `pg_toast_temp_` for every current/other main/TOAST temporary namespace, while supported user schema creation rejects the reserved `pg_` prefix.
- `convert_to(text, name)` returns exact `bytea`; node-postgres preserves outbound `Buffer` parameters; `Buffer.equals` and `subarray` provide exact local byte comparison.
- node-postgres requires returned-row cardinality to be checked with `result.rows.length`, not inferred from `rowCount`.

Mechanism comparison:

| Mechanism | Result |
|---|---|
| Qualify all five equality operators in the prior server-prefix query | Correct and self-contained, but retains two `substr`, two `decode`, and two prefix comparisons and reports temporary/missing names identically. |
| Set or control `search_path` | Rejected because it adds mutable connection/transaction state and prepared-statement assumptions. |
| Reject exact temporary prefixes locally, then use a fully qualified three-equality bind query | Recommended: smallest fixed SQL, precise local-invalid diagnostic, same supported persistent domain, no ambient state. |

Controlling local-validation contract for renewed analysis:

- Require primitive, non-empty, well-formed Unicode-scalar database/schema strings.
- Reject U+0000, lone surrogates, UTF-8 encoding failure, framing overflow, trimming/folding/normalization/quoting reinterpretation, and any other rewriting.
- Encode exactly once as UTF-8 buffers.
- Reject the configured schema as `MIGRATION_NAMESPACE_INVALID` if its bytes start exactly with `70675f74656d705f` (`pg_temp_`) or `70675f746f6173745f74656d705f` (`pg_toast_temp_`). The byte test is `length >= prefix.length` followed by exact equality of `subarray(0, prefix.length)` with the constant buffer.

The controlling exact-byte bind candidate is:

~~~sql
SELECT
  pg_catalog.convert_to(
    CAST(d.datname AS pg_catalog.text),
    CAST('UTF8' AS pg_catalog.name)
  ) AS database_name_bytes,
  pg_catalog.convert_to(
    CAST(n.nspname AS pg_catalog.text),
    CAST('UTF8' AS pg_catalog.name)
  ) AS schema_name_bytes
FROM pg_catalog.pg_database AS d
CROSS JOIN pg_catalog.pg_namespace AS n
WHERE (
  d.datname
    OPERATOR(pg_catalog.=)
  pg_catalog.current_database()
)
AND (
  pg_catalog.convert_to(
    CAST(d.datname AS pg_catalog.text),
    CAST('UTF8' AS pg_catalog.name)
  )
    OPERATOR(pg_catalog.=)
  CAST($1 AS pg_catalog.bytea)
)
AND (
  pg_catalog.convert_to(
    CAST(n.nspname AS pg_catalog.text),
    CAST('UTF8' AS pg_catalog.name)
  )
    OPERATOR(pg_catalog.=)
  CAST($2 AS pg_catalog.bytea)
);
~~~

This fixed statement interpolates no identifier or configured value; qualifies every relation, function, type, cast target, and search-path-visible equality operator; uses no `LIMIT`, collation, pattern comparison, alias expansion, token interpretation, or truncation; and runs byte-for-byte identically with the same two buffer parameters before and after lock acquisition. The `pg_temp` alias has no exact catalog row and fails closed.

Pre-lock result contract:

1. Inspect `result.rows.length` and require exactly one row.
2. Require exactly the two selected values and require both to satisfy `Buffer.isBuffer`.
3. Require each buffer to equal its configured input exactly.
4. Recheck the returned schema bytes against both temporary prefixes.
5. Retain immutable copies of both returned buffers and hash those server-returned bytes.

Post-lock, run the identical statement and require every pre-lock check plus equality with both retained buffers. Do not derive a different key after locking and do not access history before the second bind passes.

The unchanged lock statement is:

~~~sql
SELECT pg_catalog.pg_try_advisory_xact_lock(
  CAST($1 AS pg_catalog.int8)
) AS acquired;
~~~

Bind `signedBigInt.toString(10)` without a JavaScript `number`. Require exactly one row and `typeof acquired === "boolean"`: true acquires, false alone continues bounded polling, and any malformed container/row/value is a primary failure rather than contention.

Exhaustive diagnostic map:

| Stage | Stable diagnostic | Result |
|---|---|---:|
| Local input/UTF-8/framing/temporary-prefix rejection | `MIGRATION_NAMESPACE_INVALID` | 1 |
| Pre-lock query or result failure, wrong cardinality/shape/type/bytes, or returned temp prefix | `MIGRATION_NAMESPACE_BIND_FAILED` | 1 |
| Post-lock equivalent failure or drift from retained buffers | `MIGRATION_NAMESPACE_CHANGED` | 1 |
| Lock SQL/cast failure not classified as interruption/loss | `MIGRATION_LOCK_QUERY_FAILED` | 1 |
| Lock result other than exactly one boolean row | `MIGRATION_LOCK_RESULT_INVALID` | 1 |
| Strict false values until monotonic deadline | `MIGRATION_LOCK_TIMEOUT` | 2 |
| Recognized interruption/cancellation | `MIGRATION_LOCK_INTERRUPTED` | 1 |
| Recognized connection loss | `MIGRATION_CONNECTION_LOST` | 1 |
| Near-commit ambiguity | `MIGRATION_COMMIT_AMBIGUOUS`, with no automatic retry | 1 |
| Cleanup failure | Secondary `MIGRATION_CLEANUP_FAILED`, preserving the primary result | Nonzero |

Interruption and connection-loss categories take precedence over phase categories. Only a deadline reached after valid exact-false lock results returns 2.

The report retains the exact option at 91/100. It changes no admitted persistent identity, `migrations:v2` literal or 37-byte length, framing, digest, signed projection, vector, rename/recreation/reconstruction meaning, transaction order, ownership, recovery, lifecycle, or downstream proof boundary. At its bounded slice, hard gates 2 and 11 and LOCK-INV-04/11/12 are repaired; portfolio-wide LOCK-INV-01 awaits synthesis with the separately normalized OID report.

Residual risks remain: PostgreSQL's temp prefixes require major-version revalidation; future locked Sequelize/node-postgres raw `bytea` results remain unproved; unsupported direct catalog modification is outside supported DDL; cooperative bypass, projected false serialization, rename re-keying, exact-name reuse, and ambiguous commit remain. TASK-004 owns all real PostgreSQL/driver/search-path/temp-fixture/concurrency/platform/cleanup evidence.

Confidence: 0.98 in PostgreSQL 18 grammar/operator/prefix semantics and 0.82 in the future driver boundary.

Source set:

- [PostgreSQL 18 operator resolution](https://www.postgresql.org/docs/18/typeconv-oper.html).
- [PostgreSQL 18 schemas and search path](https://www.postgresql.org/docs/18/ddl-schemas.html).
- [REL_18_STABLE built-in operators](https://raw.githubusercontent.com/postgres/postgres/REL_18_STABLE/src/include/catalog/pg_operator.dat).
- [REL_18_STABLE parser grammar](https://raw.githubusercontent.com/postgres/postgres/REL_18_STABLE/src/backend/parser/gram.y).
- [REL_18_STABLE namespace classifier](https://raw.githubusercontent.com/postgres/postgres/REL_18_STABLE/src/backend/catalog/namespace.c).
- [PostgreSQL 18 binary-string functions](https://www.postgresql.org/docs/18/functions-binarystring.html).
- [node-postgres queries](https://node-postgres.com/features/queries) and [result contract](https://node-postgres.com/apis/result).
- [Node.js 24 Buffer](https://nodejs.org/download/release/latest-v24.x/docs/api/buffer.html).


### Targeted research re-entry: normalized OID catalog admission


A different read-only `technology_researcher` normalized the complete `CATALOG-OID-PAIR` candidate and returned exactly `READY FOR RE-ANALYSIS` at 2026-08-13 05:16Z. The researcher made no repository write or authority change.

The candidate admits only the same primitive, non-empty, well-formed Unicode-scalar inputs; rejects U+0000, lone surrogates, encoding failure, and all rewriting; uses the exact input buffers solely for catalog admission; and derives identity only from the retained database and namespace OIDs. Case-distinct and normalization-distinct names bind safely to distinct catalog rows when both exist, while a later rename can bind changed bytes to the same retained OID.

The normalized search-path-independent query is:

~~~sql
SELECT
  CAST(d.oid AS pg_catalog.text) AS database_oid_decimal,
  CAST(n.oid AS pg_catalog.text) AS namespace_oid_decimal,
  pg_catalog.convert_to(
    CAST(d.datname AS pg_catalog.text),
    CAST('UTF8' AS pg_catalog.name)
  ) AS database_name_bytes,
  pg_catalog.convert_to(
    CAST(n.nspname AS pg_catalog.text),
    CAST('UTF8' AS pg_catalog.name)
  ) AS schema_name_bytes
FROM pg_catalog.pg_database AS d
CROSS JOIN pg_catalog.pg_namespace AS n
WHERE d.datname
        OPERATOR(pg_catalog.=)
        pg_catalog.current_database()
  AND pg_catalog.convert_to(
        CAST(d.datname AS pg_catalog.text),
        CAST('UTF8' AS pg_catalog.name)
      )
        OPERATOR(pg_catalog.=)
        CAST($1 AS pg_catalog.bytea)
  AND pg_catalog.convert_to(
        CAST(n.nspname AS pg_catalog.text),
        CAST('UTF8' AS pg_catalog.name)
      )
        OPERATOR(pg_catalog.=)
        CAST($2 AS pg_catalog.bytea)
  AND NOT (
    pg_catalog.substr(
      pg_catalog.convert_to(
        CAST(n.nspname AS pg_catalog.text),
        CAST('UTF8' AS pg_catalog.name)
      ),
      CAST(1 AS pg_catalog.int4),
      CAST(8 AS pg_catalog.int4)
    )
      OPERATOR(pg_catalog.=)
      pg_catalog.decode(
        CAST('70675f74656d705f' AS pg_catalog.text),
        CAST('hex' AS pg_catalog.text)
      )
    OR
    pg_catalog.substr(
      pg_catalog.convert_to(
        CAST(n.nspname AS pg_catalog.text),
        CAST('UTF8' AS pg_catalog.name)
      ),
      CAST(1 AS pg_catalog.int4),
      CAST(14 AS pg_catalog.int4)
    )
      OPERATOR(pg_catalog.=)
      pg_catalog.decode(
        CAST('70675f746f6173745f74656d705f' AS pg_catalog.text),
        CAST('hex' AS pg_catalog.text)
      )
  );
~~~

The pre-lock contract requires exactly one row; canonical primitive decimal OID strings consisting of a first digit from 1 through 9 followed by at most nine digits from 0 through 9; `BigInt` parsing and exact range/round-trip within 1 through 4294967295; raw name buffers equal to inputs; and immutable retention of both OIDs and names. Zero/multiple rows, SQL/conversion failure, malformed fields, invalid OIDs, non-buffer values, byte inequality, or a temporary target fails before history. Post-lock, the identical query must return the same valid OIDs and exact input/retained buffers; otherwise it returns `MIGRATION_NAMESPACE_CHANGED` before history access.

Identity remains:

~~~text
databaseOidBytes  = U32BE(databaseOid)
namespaceOidBytes = U32BE(namespaceOid)

payload =
  LP(UTF8("rick-and-morty-explorer:migrations:v2"))
  || LP(databaseOidBytes)
  || LP(namespaceOidBytes)

digest   = SHA-256(payload)
unsigned = first 8 digest bytes as unsigned big-endian bigint
signed   = unsigned < 2^63 ? unsigned : unsigned - 2^64
~~~

The literal is 37 bytes, the payload is 57 bytes, each OID contributes four unsigned big-endian bytes, and no signed value passes through JavaScript `number`. The five existing synthetic vectors remain unchanged. The exact lock query/result and exhaustive diagnostics match the exact-byte candidate, except deterministic OID framing failure maps to `MIGRATION_NAMESPACE_BIND_FAILED`.

Semantics remain materially different from exact names: a rename retains the OID/key after configuration changes; a rename during polling fails the old-byte rebind; drop/recreate normally obtains a new OID/key; wrap/reuse prevents permanent identity; logical reconstruction normally changes OIDs/keys; specialized physical/upgrade flows may preserve them; and separate clusters never coordinate. Including the database OID is redundant inside PostgreSQL's database-local advisory-lock space but retains the candidate's explicit object-pair framing.

The normalized OID score remains exactly 77/100: requirements 19/20, architectural fit 16/20, options/trade-offs 13/15, feasibility 10/15, quality attributes 7/10, verifiability 7/10, and evolution/reversibility 5/10. Correctness repair closes comparability but does not improve runtime-assigned/reusable identity, reconstruction churn, portable fixtures, diagnostics, or reversibility. All twelve gates pass at research-contract level, with gates 7, 8, and 10 retaining TASK-004 runtime proof.

The candidate remains third and `Accept with explicit follow-ups and residual risks`. Benefits are safe exact admission, compact identity, rename continuity, direct OID correlation, and complete search-path-independent temp rejection. Costs are runtime assignment/reuse, logical-restore churn, unstable name-to-key vectors, redundant database identity, extra parsing/comparison, weaker operations, unproved driver result shape, cooperative locking, and projected collisions. No repository requirement demonstrates a need for rename-stable object identity.

Confidence: 0.96 in PostgreSQL 18 catalog/admission semantics, 0.92 in the normalized contract and score, and 0.72 in downstream driver/runtime feasibility.

Source set:

- [PostgreSQL 18 OID types](https://www.postgresql.org/docs/18/datatype-oid.html).
- [PostgreSQL 18 pg_database](https://www.postgresql.org/docs/18/catalog-pg-database.html) and [pg_namespace](https://www.postgresql.org/docs/18/catalog-pg-namespace.html).
- [PostgreSQL 18 operator resolution](https://www.postgresql.org/docs/18/typeconv-oper.html) and [qualified invocation](https://www.postgresql.org/docs/18/sql-expressions.html#SQL-SYNTAX-OPERATOR-INVOCATIONS).
- [REL_18_STABLE namespace classifier](https://github.com/postgres/postgres/blob/REL_18_STABLE/src/backend/catalog/namespace.c#L3475-L3508) and [temporary initialization](https://github.com/postgres/postgres/blob/REL_18_STABLE/src/backend/catalog/namespace.c#L4179-L4226).
- [REL_18_STABLE schema rename](https://github.com/postgres/postgres/blob/REL_18_STABLE/src/backend/commands/schemacmds.c#L227-L281), [database rename](https://github.com/postgres/postgres/blob/REL_18_STABLE/src/backend/commands/dbcommands.c#L1775-L1865), and [OID allocation](https://github.com/postgres/postgres/blob/REL_18_STABLE/src/backend/catalog/catalog.c#L402-L508).
- [PostgreSQL 18 pg_dump](https://www.postgresql.org/docs/18/app-pgdump.html) and [CREATE DATABASE](https://www.postgresql.org/docs/18/sql-createdatabase.html).
- [node-postgres queries](https://node-postgres.com/features/queries) and [transactions](https://node-postgres.com/features/transactions).
- [Node.js 24 Buffer](https://nodejs.org/download/release/v24.18.0/docs/api/buffer.html) and [Crypto](https://nodejs.org/download/release/v24.18.0/docs/api/crypto.html).

The two re-entry reports together repair the research-level search-path and comparability defects identified by the renewed analyst. They do not themselves select architecture or authorize checkpoint review; complete synthesis must rerun all scores, gates, and invariants first.


### Complete renewed decision analysis: DRAFT READY


The read-only `decision_analyst` audited the complete ExecPlan at SHA-256 `5FD81AC8D0A3C8A095FC686B2DCA42D32AFA6BFFC0F8ED9DC658499EB07993FC` and returned exactly `DRAFT READY` at 2026-08-13 05:28Z. The analyst reconciled every original report, both IR-A `REVISE` rounds, all-temporary research, the prior `RETURN FOR RESEARCH`, and both final re-entry reports. The analyst made no write, allocation, approval, dependency, state, or implementation change.

Comparability result:

- Every candidate uses the same requirements, 100-point rubric, exact `migrations:v2` literal, length framing, SHA-256 signed projection, lifecycle, ownership/failure model, proof boundary, and no-write constraint.
- Exact bytes and OID now have complete search-path-independent catalog contracts. The restricted-ASCII candidate uses the same qualified three-equality catalog mechanic after its stricter local grammar; this is candidate-neutral correctness normalization and awards no score.
- Local exact prefix checks and PostgreSQL's classifier are equivalent for supported temporary schemas because both compare the exact ASCII/UTF-8 bytes for `pg_temp_` and `pg_toast_temp_`. The four current/other main/TOAST classes reject; `pg_temp` alias expansion never occurs; `pg_catalog`, `public`, and exact custom persistent schemas remain admitted by the identity layer.
- Relations, functions, types, casts, and actual equality operators are qualified. `AND`, `OR`, and `NOT` remain non-shadowable grammar nodes.
- Driver result shapes, PostgreSQL arrival, concurrency, cleanup, and platform behavior remain explicit TASK-004 proof rather than present evidence.

Normalized matrix and ranking:

| Criterion | Maximum | Exact catalog bytes | Restricted ASCII | Catalog OID pair |
|---|---:|---:|---:|---:|
| Requirements traceability | 20 | 20 | 18 | 19 |
| Architectural fit and consistency | 20 | 19 | 17 | 16 |
| Options and trade-offs | 15 | 14 | 13 | 13 |
| Feasibility and proportionality | 15 | 12 | 13 | 10 |
| Quality attributes | 10 | 9 | 8 | 7 |
| Verifiability | 10 | 9 | 9 | 7 |
| Evolution and reversibility | 10 | 8 | 6 | 5 |
| **Total** | **100** | **91** | **84** | **77** |

`EXACT-CATALOG-BYTES` is the sole recommendation. It preserves every supported exact persistent name and logical name-to-key behavior without the ASCII candidate's unrelated naming policy or the OID candidate's runtime-assigned/reusable identity, logical-reconstruction churn, and unsupported rename-stability objective.

The controlling selected contract for the checkpoint is the final exact-byte re-entry report above:

- primitive, non-empty, well-formed Unicode-scalar database/schema inputs;
- no rewriting or identifier interpretation;
- local exact rejection of `pg_temp_` and `pg_toast_temp_` byte prefixes as `MIGRATION_NAMESPACE_INVALID`;
- one fixed, fully qualified, parameterized three-equality query run identically before and after locking;
- exactly one row, exactly two selected raw buffers, exact input equality, returned-prefix recheck, immutable retained copies, and identity derived from returned bytes;
- exact 37-byte `migrations:v2`, U32BE length-prefix framing, SHA-256, first-eight-byte unsigned projection, two's-complement signed conversion, JavaScript `bigint`, and decimal `pg_catalog.int8` binding;
- name-based identity: rename changes the key, exact-name recreation reuses it, unchanged exact names survive logical reconstruction, and clusters do not coordinate;
- exact boolean lock results, monotonic bounded polling, malformed results as primary failure, and contention alone as result 2;
- exhaustive namespace/lock/interruption/loss/ambiguity/cleanup diagnostics and preservation of every unaffected ADR-0012 result category;
- safe false serialization for a projected collision and prohibition of mixed `v1`/`v2` execution.

Hard-gate result:

| Gate | Synthesis disposition |
|---:|---|
| 1 | Pass: no rewriting; admitted framed tuples are distinct before projection. |
| 2 | Pass: exact one-row current catalog binding, exact buffers, no `LIMIT`, fail-closed pre/post checks. |
| 3 | Pass: exact new `migrations:v2`; no `v1` reuse or reinterpretation. |
| 4 | Pass: exact UTF-8/framing/digest/signed projection and decimal `pg_catalog.int8`. |
| 5 | Pass: projected collision is safe false serialization. |
| 6 | Pass: every ADR-0012 ordering, transaction, history, and release clause is retained. |
| 7 | Contract pass; real same/disjoint concurrency and platform behavior remain TASK-004. |
| 8 | Contract pass; real ownership, timeout, interruption, loss, ambiguity, redaction, and recovery remain TASK-004. |
| 9 | Pass: ASCII, case, Unicode, temporary, framing, and signed fixtures are present. |
| 10 | Pass: no runtime/implementation evidence is claimed. |
| 11 | Pass: rubric, assumptions, validation, and accepted-architecture consistency are explicit. |
| 12 | Pass: all authority/lifecycle/dependency/implementation states remain unchanged. |

Invariant result: LOCK-INV-01 through LOCK-INV-13 each pass at synthesis/contract level. Fresh independent checkpoint remains mandatory; real driver/PostgreSQL/concurrency/ownership/failure/platform behavior remains TASK-004 evidence.

Decide-now items are the admitted/rejected domain, exact temp-prefix rule, fully qualified catalog/lock SQL, row/result contracts, retained buffers and drift behavior, v2 bytes/framing/projection, rename/recreation/reconstruction/cluster meaning, lifecycle order, ownership/failure semantics, stable diagnostics/results, bounded timeout semantics, whole-record lifecycle, and downstream ownership. TASK-004 must later prove driver buffers, `int8` arrival, all temporary/persistent fixtures, rename/recreation, same/disjoint callers, winner visibility, cleanup/loss/ambiguity, Windows/CI behavior, measured timeout/polling, migration runner, history, schema, and delivery wiring. TASK-014 remains the ERD proof owner.

Strongest dissent: restricted ASCII has a smaller validator and no Unicode-version exposure. It remains second because exact catalog bytes already distinguish the excluded valid names, while ASCII still requires catalog/driver/lock/ownership/concurrency proof and introduces an unsupported repository-wide policy.

Residual risks are future driver byte/int8 behavior, PostgreSQL major-version prefix changes, cooperative-lock bypass, projected false serialization, rename re-keying, exact-name key reuse, privileged external DDL, ambiguous commit, diagnostic topology exposure, and noncooperating mixed-version execution. Reversal triggers include any admitted alias, local/server classifier divergence, failed driver/platform proof, unreliable rebind, demonstrated rename-stable identity need, unacceptable name reuse, material collision cost, an owner-adopted restrictive naming policy, or incompatible PostgreSQL/runtime behavior.

Required whole-record Proposed successor outline:

1. Metadata: collision-safe number allocated only after IR-A, status `Proposed`, prospective successor to ADR-0012, no lifecycle effect before explicit project-owner approval.
2. Context: NFC alias defect, DG-005/TASK-018 authority, no implementation, and whole-record replacement requirement.
3. Decision drivers: mapped requirements, accepted decisions, gates/invariants, identity, portability, failure, lifecycle, and evidence constraints.
4. Considered options: exact bytes, restrictive ASCII, OID pair, normalized 91/84/77 matrix, strongest dissent, and rejected NFC control.
5. Decision: restate every unaffected ADR-0012 clause, including tool/runtime direction; authored/emitted roots and native ESM; canonical paths; normalization, hashing, manifest, build identity and vectors; immutable publication/preflight; resolver/storage/context/factory; checksummed exact-prefix history; command/rollback/transaction rules; replace only the lock identity with the exact selected SQL/v2/result/diagnostic contract; interfaces, ownership, failure/recovery; forbidden coupling; TASK-004 proof and TASK-014 ERD ownership.
6. Consequences: exact-name behavior, Unicode/case preservation, rename/name-reuse behavior, duplicated binding, and operational costs.
7. Risks and mitigations: residual risks, redaction, upgrade checks, collisions, cooperation, mixed-version prohibition, and reversal triggers.
8. Validation: present calculations/reviews versus explicitly future TASK-004/TASK-014 evidence.
9. Evaluation: full rubric, ranking, recommendation band, confidence, dissent, and alternative disposition.
10. References: repository authorities and primary PostgreSQL/Node/node-postgres sources.

Proposal-stage documentation impact after IR-A `PASS` and collision checking: create the new Proposed ADR; update the ADR index/architecture coverage, this ExecPlan and index, implementation-plan DG-005 navigation, system diagram, README current status, specification routing, TASK-004 waiting references, and append-only execution chronology. Acceptance-stage lifecycle/status changes remain outside current authority.

Confidence: 0.96 in PostgreSQL/search-path/temp semantics, 0.93 in synthesis readiness and recommendation, and 0.72 in future driver/runtime feasibility.

Authority after synthesis: ADR-0012 remains unchanged and `Accepted`; no successor ADR is allocated; DG-005 and TASK-004 remain `Pending`; TASK-018 remains `In progress`; TASK-004 still depends exactly on TASK-002 and TASK-003; no migration implementation exists; and every legacy-literal reference remains historical or prohibitive.


### Fresh IR-A authority-label checkpoint


A new read-only `independent_reviewer` audited frozen plan SHA-256 `82FD1065DD5746F11F80289F2F99F2125989B6BBB54AC65F7F670AC163151A6F` and returned exactly `REVISE` at 2026-08-13 05:51Z. The reviewer independently reconciled PostgreSQL/Node/node-postgres primary sources, reproduced all eight exact-name vectors in Node.js 24.18.0 and Python 3.12.10, confirmed the 91/84/77 matrix, ran repository validators and negative implementation checks, and made no write.

The reviewer found no Blocker and confirmed that the final selected contract is technically sound: local exact temporary-prefix rejection matches PostgreSQL's supported four-class classifier; the final query and all actual equality operators are search-path-independent; pre/post raw-buffer and retained-buffer checks are complete; `pg_catalog.int8`, exact boolean lock results, diagnostics, result precedence, whole-record carry-forward, proof ownership, authority states, dependency graph, and no-v1-reuse boundary are correct.

The `REVISE` result contained one Major and one Minor:

- Major M1: two earlier sentences still described known-defective `IR-A-OC-01` as authoritative even though later evidence explicitly invalidated it. That left hard gates 2/11 and LOCK-INV-01/04/11 open through documentation ambiguity, not through a defect in the final query.
- Minor m1: the mandatory bottom `Revision Note` recorded only plan creation and omitted the temporary-classifier, operator-resolution, OID-normalization, diagnostic, and renewed-synthesis changes.

The smallest remediation is applied in this revision: the earlier observation and section now label `IR-A-OC-01` as historical, defective, superseded, and noncontrolling; they point explicitly to the final exact-byte re-entry query/result contract and renewed synthesis as the sole controlling contract; and the bottom revision chronology is complete. The historical SQL is retained without rewriting. No selected input domain, query, diagnostic, v2 byte, vector, score, ranking, lifecycle clause, authority, dependency, or proof boundary changed. A complete new fresh checkpoint is required over the resulting hash before collision checking.

Reviewer validation evidence: documentation validation passed for 47 Markdown files, 41 requirements, 1 authorization, 18 tasks, 17 SPEC rules, 20 HS rules, and 119 scenarios; ADR validation passed for 14 ADRs and 38 mapped requirements with only the established NFR-006 warning; `git diff --check` passed with line-ending notices only; negative searches found no migration/Sequelize/Umzug/`pg` implementation artifact. Confidence was 0.98 in Major M1 and 0.96 overall.

Authority after review and remediation remains unchanged: ADR-0012 is `Accepted`; no successor is allocated; DG-005/TASK-004 are `Pending`; TASK-018 is `In progress`; TASK-004 depends exactly on TASK-002/TASK-003; no implementation exists; and the legacy literal remains historical/prohibitive only.


### Complete fresh IR-A checkpoint: PASS


A distinct new read-only `independent_reviewer` audited the complete reconciled ExecPlan at frozen SHA-256 `38980760DD9733BE51104E98DE4C602A39CB252A0AEF55C5C27878582BEE03A6` and repository HEAD `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`, then returned exactly `PASS` at 2026-08-13 06:10Z. It found no Blocker, Major, or Minor and made no write.

The reviewer confirmed:

- prior Major M1 is closed because the historical section, the immediate defect evidence, and the non-draft-authorizing statement make every pre-final SQL/result block noncontrolling, while only the final exact-byte re-entry query/result contract and renewed synthesis control;
- prior Minor m1 is closed because the bottom revision chronology now records creation, temporary-classifier re-entry, operator-resolution research, OID normalization, diagnostic completion, renewed synthesis, and authority-label remediation;
- the 91/84/77 arithmetic and symmetric option comparison are sound, with `EXACT-CATALOG-BYTES` the sole supported recommendation;
- PostgreSQL operator qualification, exact temporary prefixes, local/server supported-domain equivalence, `pg_catalog.int8`, raw-buffer result contract, identical pre/post binding, exact boolean lock result, bounded polling, diagnostics, ownership/recovery, and proof boundaries are complete;
- the whole-record outline carries forward every unaffected ADR-0012 category and replaces only the defective lock identity;
- all twelve hard gates and LOCK-INV-01 through LOCK-INV-13 pass at contract/checkpoint level, with real PostgreSQL/driver/concurrency/cleanup/platform evidence honestly deferred to TASK-004 and ERD evidence to TASK-014;
- ADR-0012 remains unchanged and `Accepted`; no successor exists; DG-005/TASK-004 remain `Pending`; TASK-018 remains `In progress`; TASK-004 depends exactly on TASK-002/TASK-003; no migration implementation or dependency exists; and v1 remains historical/prohibitive only.

The reviewer independently reproduced all eight exact-name vectors in Node.js 24.18.0 and Python 3.12.10, including the 37-byte literal, composed/decomposed bytes, framing boundaries, and positive/negative signed branches. Documentation validation passed for 47 Markdown files, 41 requirements, 1 authorization, 18 tasks, 17 SPEC rules, 20 HS rules, and 119 scenarios. ADR validation passed for 14 ADRs and 38 mapped requirements with only the established NFR-006 warning. `git diff --check`, conflict/whitespace checks, and negative implementation/dependency searches passed. Confidence was 0.99 that M1/m1 are closed and 0.97 overall.

This append is post-verdict reconciliation evidence only and does not alter the reviewed decision contract. The checkpoint authorizes the primary to perform the fresh ADR collision check and, if collision-free, draft the whole-record successor as `Proposed`. It grants no acceptance, supersession, gate resolution, task closure, dependency change, implementation, or TASK-004 start authority.


### Primary Proposed ADR-0015 allocation and draft


After the fresh IR-A `PASS`, the primary enumerated every ADR path, confirmed ADR-0014 as the prior highest allocated record, found no ADR-0015 file or stable reference outside the plan's unreserved candidate history, and allocated [ADR-0015](../../adrs/0015-use-a-build-first-migration-lifecycle-with-exact-catalog-byte-lock-identity.md) as `Proposed`.

The primary-authored record is a standalone whole-record successor. It restates ADR-0012's unaffected build-first programmatic Umzug lifecycle, native emitted ESM artifact contract, canonical paths/source normalization, authenticated build identity, immutable publication/preflight, resolver/storage/context/factory, checksummed prefix history, command/rollback/transaction semantics, ownership/recovery/interfaces, forbidden coupling, TASK-004 proof, and TASK-014 ERD ownership. It replaces only the NFC/v1 lock clauses with the final exact catalog-byte admission/bind/rebind, new v2 framing, signed projection, eight vectors, exact `pg_catalog.int8` lock SQL, and exhaustive diagnostics. Every historical defective query remains only in this ExecPlan and does not appear as proposal authority.

Proposal-stage navigation now links ADR-0015 from the ADR index, DG-005/TASK-018/TASK-004 records, plan/spec indexes, system diagram, root current status, and execution chronology. ADR-0012 was not edited; the proposed supersession is expressly inactive. DG-005/TASK-004 remain `Pending`, TASK-018 remains `In progress`, TASK-004 dependencies remain exactly TASK-002/TASK-003, and no implementation/dependency/migration/schema/history/ERD artifact was added.

At this proposal-allocation checkpoint, complete fresh final IR-B over the exact integrated proposal and diff remained mandatory before the owner checkpoint.

Integrated pre-IR-B evidence:

- ADR-0015 SHA-256: `E40390F66B6C0B21D3BF9C17739D3AD9D105ECE4D08A36BEF955AA777F53B741`.
- Documentation validator: 48 Markdown files, 41 requirement IDs, 1 authorization, 18 tasks, 17 SPEC rules, 20 HS rules, and 119 scenarios; pass.
- ADR validator: 15 ADRs and 38 mapped requirements; pass with only the established NFR-006 delivery-constraint warning.
- `git diff --check`: pass with line-ending notices only.
- ADR-0012 diff: empty.
- Node.js 24.18.0 and Python 3.12.10: exact agreement on the 37-byte literal, eight payload lengths, eight SHA-256 values, and eight signed keys. Python required ASCII-escaped console output for the decomposed combining mark because the Windows default console is CP1252; calculation output was unchanged.
- Negative source/path/dependency searches outside documentation: no v1 literal, advisory-lock call, migration history/manifest, migration-like path, Sequelize, Umzug, or `pg` declaration.


### Fresh final IR-B cycle 1: REVISE and reconciliation


A fresh read-only `independent_reviewer`, distinct from all researchers, analysts, and IR-A reviewers, audited frozen ADR-0015 SHA-256 `E40390F66B6C0B21D3BF9C17739D3AD9D105ECE4D08A36BEF955AA777F53B741`, frozen ExecPlan SHA-256 `39CBAA5D65C6D7CB0C8533166C8430E3D4D800C8663FFE96FF60EE6CCF3D49D7`, repository HEAD `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`, and the complete ten-file proposal-stage state. IR-B returned exactly `REVISE` at 2026-08-13 06:45Z and made no write.

IR-B found no Blocker and no semantic defect in ADR-0015. It passed ADR form, prospective lifecycle, whole-record ADR-0012 carry-forward, exact-byte admission/binding/rebind, v2 framing and vectors, signed `pg_catalog.int8` lock mechanics, diagnostics/results, ownership/recovery, 91/84/77 option comparison, downstream proof ownership, primary-source audit, and all gates/invariants except current-state authority synchronization.

The two findings were:

- Major `IRB-MAJ-01`: the authoritative DG-005 detail at `docs/IMPLEMENTATION_PLAN.md` still said that no successor number existed even though the same authority and repository contained Proposed ADR-0015. This left hard gate 12 and LOCK-INV-02 open through one current-state contradiction.
- Minor `IRB-MIN-01`: TASK-004's material synchronization with Proposed ADR-0015 appeared in Progress and Surprises but lacked the bottom revision note required by `PLANS.md`.

Final-artifact correction cycle 1 applied both smallest remediations without changing the ADR:

1. DG-005 now states that Proposed ADR-0015 exists while no accepted successor, migration runner, migration, migrated database, or ERD exists.
2. TASK-004's revision chronology now records Proposed ADR-0015 synchronization and explicitly preserves ADR-0012, DG-005/TASK-004 state, dependencies, milestones, implementation absence, and later approval/execution boundaries.

These are documentation-state and chronology corrections only. ADR-0015 remains exactly `E40390F66B6C0B21D3BF9C17739D3AD9D105ECE4D08A36BEF955AA777F53B741`; its selected semantics, score, query, vectors, lifecycle, risks, proof boundary, and approval candidate are unchanged. Full same-reviewer re-review of the entire corrected state is mandatory; a patch-only review is insufficient.

IR-B cycle-1 evidence: both validators passed; `git diff --check` passed; ADR-0012 diff was empty; Node/Python vectors matched; hashes matched; no implementation/dependency/disabled-test artifact existed; DG-005/TASK-004 were Pending, TASK-018 In progress, and TASK-004 dependencies exactly TASK-002/TASK-003. Reviewer confidence was 0.99 in both findings and 0.97 overall.


### Complete fresh final IR-B correction-cycle re-review: PASS


The same read-only final reviewer performed the correction-cycle re-review required by the bounded protocol over the entire corrected ten-file state and complete diff, not only the two corrections. The reviewer verified ADR-0015 SHA-256 `E40390F66B6C0B21D3BF9C17739D3AD9D105ECE4D08A36BEF955AA777F53B741`, pre-reconciliation ExecPlan SHA-256 `9E2CC276035847FF8206B36EBFFB35ABAC250A49E67B18D69CA6A0FC6ED73CF1`, and repository HEAD `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`, then returned exactly `PASS` with no Blocker, Major, or Minor and no write.

Both earlier findings are closed in context: DG-005 now distinguishes the existing Proposed record from an accepted successor, and TASK-004's bottom revision chronology records its proposal-stage synchronization. The reviewer passed the whole-record ADR-0012 carry-forward, exact catalog-byte domain and two-prefix rejection, fully qualified three-equality pre/post bind, raw-buffer contract, v2 framing, signed `pg_catalog.int8` binding, diagnostics, ordering, concurrency semantics, ownership/recovery, 91/84/77 comparison, strongest dissent, reversal triggers, downstream proof boundary, prospective lifecycle, and all twelve hard gates and thirteen invariants.

Independent evidence included agreement across Node.js 24.18.0 and Python 3.12.10 on the 37-byte literal and all eight vectors; passing documentation and ADR validators; passing `git diff --check`; an empty ADR-0012 diff; unique sequential TASK-018/ADR-0015 IDs; and empty conflict, disabled/focused-test, migration-path, implementation-symbol, direct-dependency, and v1-outside-documentation searches. Only the established nonblocking NFR-006 ADR-mapping warning and Git line-ending notices remained.

The reviewer retained real PostgreSQL/Sequelize/node-postgres byte transport, exact `int8` arrival, hostile `search_path`, all temporary classes, same/disjoint concurrency, interruption/cleanup/loss, Windows/CI, and mixed-version exclusion as TASK-004 evidence. Finite projection collision, rename/recreation semantics, and PostgreSQL-major prefix revalidation remain disclosed residual risks, not open proposal semantics. Reviewer confidence was 0.98.

Primary post-verdict reconciliation leaves the reviewed ADR byte-for-byte unchanged and aligns the `PASS`, zero open findings, twelve hard gates, thirteen invariants, 91/84/77 matrix, exact-byte recommendation, Proposed status, unchanged authority/task graph, documentation-only impact, and next action. Exact project-owner approval is now the sole remaining decision action; no acceptance, supersession, gate resolution, task closure, dependency change, implementation, or TASK-004 start occurred.


### Post-PASS application-domain re-entry


A later independent coherence review identified that the exact-byte contract admitted every persistent `pg_namespace` row except the two temporary prefixes and even required `pg_catalog` as a positive admission fixture. Primary-source reconciliation confirmed that persistence does not establish the AC-009/ADR-0003 application-schema boundary: lower-case `pg_*` names are reserved for system purposes, and `information_schema` is an automatically supplied system schema whose initial database owner has broad control. The repository's official-image local role is a superuser, so permission failure cannot substitute for a normative guard.

The project owner explicitly authorized the recommended corrections on 2026-08-13. The old ADR hash and PASS remain historical evidence, but the proposal is not approval-ready. The contract now requires all candidates to reject exact lower-case `pg_` and exact `information_schema` before SQL and on both returned-byte observations, define positive application-schema provenance, retain permissions as defense in depth, clarify rebind limits and the TypeScript fixture, and receive a fresh score. This is the second and final bounded artifact correction cycle; it re-enters symmetric targeted research, `decision_analyst`, fresh IR-A, primary revision, and fresh complete IR-B without altering any accepted authority, task edge, implementation state, or legacy-v1 meaning.


### Symmetric application-domain research re-entry


Three new read-only `technology_researcher` instances independently evaluated the original candidates against frozen Decision Review Contract SHA-256 `DE9EC65462D4E40B283258D2FD8ED3B2C996BE3D0D24D48BB63F7F64D06106CE`. Each report returned exactly `READY FOR RE-ANALYSIS`, made no repository write, preserved the common `rick-and-morty-explorer:migrations:v2` candidate literal, left v1 historical/prohibitive, and kept all authority/task/implementation states unchanged.

The reports independently converged on these primary-source facts:

- AC-009 and ADR-0003 require an application schema; `pg_namespace` persistence, ownership, ACLs, or privilege success do not express application intent.
- PostgreSQL reserves exact lower-case `pg_` schema names for system purposes; `pg_catalog` is the system catalog; `information_schema` exists automatically and its initial database owner has all privileges. The normative application-domain guard must therefore work even for a superuser.
- The official PostgreSQL image creates `POSTGRES_USER` with superuser power, so the repository's local Compose path cannot use permission failure as proof of a safe target.
- ADR-0011 defines a sanitized run ID plus an owned unique database or schema, not a repository-wide ASCII namespace grammar.
- PostgreSQL exact identifiers can preserve quoted case and Unicode. Exact encoding and application authorization are separate dimensions.
- Advisory locks remain cooperative. A second exact-name observation is not object-continuity proof and cannot prevent privileged uncoordinated DDL after that observation.
- Exact raw `bytea`, boolean/decimal result shapes, role topology, concurrency, cleanup, Windows, and CI remain TASK-004 proof rather than current evidence.

Shared primary sources were [PostgreSQL schemas](https://www.postgresql.org/docs/18/ddl-schemas.html), [lexical structure](https://www.postgresql.org/docs/18/sql-syntax-lexical.html), [`information_schema`](https://www.postgresql.org/docs/18/infoschema-schema.html), [`pg_namespace`](https://www.postgresql.org/docs/18/catalog-pg-namespace.html), [privileges](https://www.postgresql.org/docs/18/ddl-priv.html), [system-information functions](https://www.postgresql.org/docs/18/functions-info.html), [binary-string functions](https://www.postgresql.org/docs/18/functions-binarystring.html), [advisory locks](https://www.postgresql.org/docs/18/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS), [transaction isolation](https://www.postgresql.org/docs/18/transaction-iso.html), [Node.js 24 Buffer](https://nodejs.org/download/release/v24.18.0/docs/api/buffer.html), [Node.js 24 Crypto](https://nodejs.org/download/release/v24.18.0/docs/api/crypto.html), [node-postgres query parameters](https://node-postgres.com/features/queries), [transactions](https://node-postgres.com/features/transactions), [results](https://node-postgres.com/apis/result), and the [Docker Official Image description](https://github.com/docker-library/docs/blob/master/postgres/README.md).

The common corrected application-domain contract is:

1. Positive provenance is an immutable exact database/schema target from either trusted deployment/application migration configuration or the exact output of the ADR-0011 owned run-scoped allocator. A bare string, ambient `search_path`, current schema, catalog discovery, persistence, ownership, ACL, privilege result, or self-asserted caller flag is insufficient. `public` is valid only when one of those sources designates the exact pair.
2. Validate primitive non-empty Unicode-scalar strings, reject U+0000/lone surrogates/encoding or framing failure, perform no rewrite, and encode once.
3. Before namespace SQL, reject schema bytes beginning with exact lower-case `pg_` (`70675f`) and bytes exactly equal to `information_schema` (`696e666f726d6174696f6e5f736368656d61`). This covers `pg_catalog`, `pg_toast`, every main/TOAST temporary class, and future lower-case `pg_*` names without making case-insensitive claims.
4. Repeat the full domain predicate on the returned schema buffer in both catalog observations. Local/provenance rejection occurs before lock, history, or DDL; a returned-domain violation fails the corresponding bind phase.
5. Role permissions are defense in depth, not provenance. Prefer a dedicated non-superuser migration role with database `CONNECT`, target-schema `USAGE`/`CREATE` or controlled ownership, and only required object powers. Provisioning authority may be separate. The privileged local path must still prove the normative guard.
6. Rebind proves only the exact visible names and applicable checked fields at the second statement snapshot. For name identity, rename/disappearance is visible, exact-name drop/recreate can pass and reuse the key, object/owner/ACL continuity is not established, later external DDL is not prevented, and only cooperating executors honor the advisory lock.

#### Re-entry report: `EXACT-CATALOG-BYTES`

The exact-byte report retained the existing fully qualified three-equality catalog query and two-buffer result contract. It adds the common positive provenance and local `pg_`/`information_schema` predicate, repeats the predicate on both returned schema buffers, and derives the unchanged v2 payload only from immutable returned copies. It keeps `MIGRATION_NAMESPACE_INVALID` for local/provenance failure, `MIGRATION_NAMESPACE_BIND_FAILED` for pre-lock returned-domain/shape/cardinality/byte failure, and `MIGRATION_NAMESPACE_CHANGED` for any post-lock failure, without switching keys after acquisition.

Exact bytes continue to admit positively authorized `public`, run-scoped/custom, case-distinct, `PG_App`, composed `caf\u00E9`, and decomposed `cafe\u0301` names when exact catalog rows exist. `PG_App` and `Information_Schema` are not caught by the exact lower-case system predicate but remain subject to provenance, exact binding, and permissions. The report rejected missing/forged provenance, `pg_`, `pg_catalog`, `pg_toast`, `pg_temp`, every current/other main/TOAST temporary name, representative `pg_app`, and exact `information_schema` before key derivation. It retained all eight existing v2 key vectors because the accepted payloads and algorithm do not change.

The report recommended that TASK-004 prove the guard even through the privileged Compose role plus a separate least-privilege migration path, raw two-field buffers, returned-domain injection, hostile `search_path`, no SQL/history/DDL on local rejection, rename/disappearance, exact-name recreation, same/disjoint concurrency, signed `int8`, collision, timeout/loss/ambiguity/cleanup, Windows/CI, and mixed-version exclusion. It scored the candidate 20/20, 19/20, 14/15, 12/15, 9/10, 9/10, and 8/10: **91/100, Accept**, confidence 0.90 overall. The strongest dissent remained restricted ASCII's smaller admitted set; the report found that it removes none of the provenance, catalog, role, driver, lock, ownership, or concurrency proof and imposes an unrequired policy.

All thirteen hard gates and all fourteen invariants passed at research-contract level; runtime portions remain assigned to TASK-004. The report returned `READY FOR RE-ANALYSIS`.

#### Re-entry report: `RESTRICTED-ASCII-DOMAIN`

The ASCII report defined an exact byte grammar consisting of one lower-case ASCII letter followed by zero to 62 lower-case ASCII letters, digits, or underscores for both configured database and schema. It separately rejects exact lower-case `pg_` and exact `information_schema`, because `information_schema` otherwise satisfies the grammar, and applies the common provenance rule. It deliberately rejects uppercase, non-ASCII, leading underscore, dollar, hyphen, space, quoting, slash/backslash, and longer names without rewriting them.

The report proposed a fully qualified five-field bind returning exact database/schema buffers plus effective `CONNECT`, `USAGE`, and `CREATE` booleans. It treats those booleans as required defense-in-depth evidence but never as provenance; result/domain/permission drift is rechecked after locking. It retained the common ADR-0012 transaction/ownership/failure sequence and v2 framing. Its positive vectors were `rick_and_morty/public`, `task_004_a`, `task_004_b`, and the `ab/c` versus `a/bc` framing pair; case and Unicode legacy pairs become explicit no-key rejections. It recommended distinct unauthorized and permission-denied diagnostics plus the common bind/change failures.

TASK-004 proof includes every 1/63-byte edge, unprovenanced grammar-valid names, all system schemas, exact five-field raw results, privilege changes, restricted-role and privileged-role cases, qualified-query behavior, exact v2 keys, same/disjoint concurrency, failure/recovery/cleanup, platform parity, and no rejected history/DDL. The report scored 18/20, 17/20, 13/15, 13/15, 8/10, 9/10, and 6/10: **84/100, Accept with explicit follow-ups and residual risks**, confidence 0.90 overall. Its strongest dissent favored exact bytes because the same application guard works without an owner-adopted naming policy.

All thirteen hard gates and all fourteen invariants passed at research-contract level; runtime portions remain TASK-004 proof. The report returned `READY FOR RE-ANALYSIS`.

#### Re-entry report: `CATALOG-OID-PAIR`

The OID report applied the same provenance and exact system-domain checks before name binding. Its fully qualified six-field query returns canonical decimal database/namespace OIDs, exact database/schema buffers, and effective schema `USAGE`/`CREATE` booleans. Pre/post validation parses OIDs only through `BigInt`, bounds them to `1..4294967295`, rechecks returned system-domain bytes, requires exact names and privileges, and retains the same OIDs before deriving identity.

The unchanged candidate payload frames U32BE database and namespace OIDs under v2 before SHA-256 and signed 64-bit projection. Rename retains the key after configuration changes; rename during polling fails old-name rebind; drop/recreate ordinarily changes the OID/key; OID wrap can reuse identity; logical dump/restore ordinarily reconstructs different OIDs; and including database OID remains redundant inside database-local advisory-lock space. The second bind still cannot prevent later privileged DDL.

Its five synthetic OID key vectors remain unchanged. Name fixtures classify positively proven `public`, custom/run-scoped, case, and Unicode names; reject every lower-case `pg_*`, all temporary classes, exact `information_schema`, missing provenance, and permission-negative targets; and distinguish exact case without promising portable name-to-key vectors. TASK-004 must prove OID/name/privilege result shapes and drift, least privilege, reconstruction/rename/recreation, driver behavior, concurrency, failures, cleanup, and platforms.

The report scored 19/20, 16/20, 13/15, 10/15, 7/10, 7/10, and 5/10: **77/100, Accept with explicit follow-ups and residual risks**, confidence 0.93 in the corrected contract. The guard closes the shared application-domain gap but does not repair runtime assignment/reuse, reconstruction churn, portable-vector absence, redundant database identity, or weaker diagnostics. Its strongest dissent favored exact bytes. All hard gates and invariants passed at research-contract level; runtime portions remain TASK-004 proof. It returned `READY FOR RE-ANALYSIS`.

The raw re-entry matrix remains:

| Criterion | Maximum | Exact catalog bytes | Restricted ASCII | Catalog OID pair |
|---|---:|---:|---:|---:|
| Requirements traceability | 20 | 20 | 18 | 19 |
| Architectural fit and consistency | 20 | 19 | 17 | 16 |
| Options and trade-offs | 15 | 14 | 13 | 13 |
| Feasibility and proportionality | 15 | 12 | 13 | 10 |
| Quality attributes | 10 | 9 | 8 | 7 |
| Verifiability | 10 | 9 | 9 | 7 |
| Evolution and reversibility | 10 | 8 | 6 | 5 |
| **Total** | **100** | **91** | **84** | **77** |

### Renewed application-domain decision analysis: `DRAFT READY`

The renewed `decision_analyst` found all three reports comparable and retained the normalized 91/84/77 matrix. `EXACT-CATALOG-BYTES` remains selected at **91/100, Accept**. Repairing the common application-domain hard gate receives no additional score credit; exact bytes remains first because it preserves valid exact PostgreSQL names while requiring the same provenance, catalog, role, driver, transaction, ownership, and concurrency proof as the restrictive ASCII option. OID identity remains technically viable but disproportionate without a present requirement for rename-stable catalog-object identity.

The analyst normalized the common contract as follows:

1. Positive provenance is closed to an immutable exact database/schema tuple supplied either by trusted application/deployment migration-target configuration or by the exact owned result of the ADR-0011 run-scoped allocator. Bare strings, ambient database/schema state, `search_path`, catalog existence, persistence, ownership, ACLs, privilege results, or a self-asserted authorization flag are insufficient. `public` is admitted only when one of the two trusted sources designates the exact tuple.
2. Preserve exact Unicode-scalar input, encode once, perform no rewriting, and reject exact lower-case `pg_` schema-byte prefixes plus exact lower-case `information_schema` before namespace SQL and on both returned catalog observations.
3. Retain the selected fully qualified three-equality query and exactly two raw returned buffers. Do not add privilege booleans to the normative bind: capabilities are mutable operational state, not provenance or identity, and superuser success cannot classify an application schema.
4. Assign a dedicated non-superuser migration role, database/schema privileges, object ownership behavior, privileged-path negative fixtures, and ACL drift to TASK-004 operational proof. The normative local/provenance/domain guard applies independently of role power.
5. Describe the second bind only as detection of name-visible drift between the two statement snapshots. It cannot establish object, OID, owner, or ACL continuity; exact-name drop/recreate can pass and reuse the key; later privileged noncooperating DDL remains possible.
6. Preserve the exact v2 literal, all eight current exact-byte vectors, ADR-0012 carry-forward, transaction ownership, cleanup, failure, recovery, result semantics, and the prohibition on reusing or reinterpreting v1.

The normalized diagnostic/result precedence is: unknown commit as `MIGRATION_COMMIT_AMBIGUOUS` with result 1 and no retry; recognized connection loss or interruption overrides phase-local failures; local input, provenance, or domain failure as `MIGRATION_NAMESPACE_INVALID` with result 1; pre-lock bind failure as `MIGRATION_NAMESPACE_BIND_FAILED` with result 1; post-lock bind or name-visible drift as `MIGRATION_NAMESPACE_CHANGED` with result 1; lock SQL/cast failure as `MIGRATION_LOCK_QUERY_FAILED` with result 1; malformed lock result as `MIGRATION_LOCK_RESULT_INVALID` with result 1; exact false until deadline as `MIGRATION_LOCK_TIMEOUT` with result 2; cleanup remains secondary while preserving the primary result; and success, status, or no-op returns 0.

All thirteen hard gates and LOCK-INV-01 through LOCK-INV-14 pass at renewed synthesis/contract level. This is not drafting authority by itself: fresh complete IR-A must pass the frozen integrated contract before the primary thread revises ADR-0015. Confidence is 0.94 in recommendation and synthesis readiness, 0.97 in PostgreSQL application-domain semantics, and 0.72 in future driver/runtime feasibility pending TASK-004 proof.

### Renewed whole-record ADR outline and documentation disposition

The corrected Proposed ADR-0015 must be one self-contained whole-record successor, not an application-domain amendment. Primary drafting after fresh IR-A must apply this complete outline:

1. **Metadata and lifecycle:** retain `Proposed`; add accepted ADR-0014 to `Related decisions`; retain ADR-0012 as the accepted current authority and prospective whole-record predecessor; keep reciprocal supersession ineffective until later exact owner approval; keep DG-005 `Pending`, TASK-018 `In progress`, and TASK-004 `Pending` with unchanged dependencies.
2. **Context and drivers:** preserve the NFC alias finding and every unaffected ADR-0012 lifecycle driver; add the finding that catalog persistence does not prove application authorization; require positive target provenance, exact lower-case system-domain exclusion, search-path-independent binding, least privilege as a separate operational layer, and statement-time/name-visible rebind precision. ADR-0014 remains the current constraint for TASK-004's sole `characters.image_url text NOT NULL` image field and prohibition on an image-byte, metadata, history, lock, proxy, or asset subsystem.
3. **Comparable options and evaluation:** retain exact catalog bytes, restricted ASCII, and OID pair at 91/84/77 under the same application-domain guard; state that repairing a shared hard-gate defect earns no score; explain that privilege-result fields prove capability rather than provenance and therefore do not advantage another candidate; retain the strongest ASCII dissent and OID reversal trigger.
4. **Complete carried-forward lifecycle:** restate ADR-0012's strict TypeScript/native-ESM build, immutable artifact, canonical mapping and checksums, programmatic Umzug/Sequelize boundary, history-prefix validation, explicit READ COMMITTED complete-command transaction, lock-before-history sequence, rollback/status/up semantics, owned/borrowed connection cleanup, interruption/loss/ambiguity recovery, command/factory boundaries, network-free migrations, and ERD deferral. The artifact vector's TypeScript `5.9.3` and `node24` strings are serialization fixtures only; they do not select TASK-004 versions. Current repository evidence locks TypeScript `6.0.3`, and TASK-004 must select and record exact compatible runtime/dependency patches later.
5. **Authorized application target:** accept only an immutable exact database/schema tuple from trusted application/deployment migration-target configuration or the exact owned output of the ADR-0011 run-scoped allocator. Reject bare strings, ambient/current schema state, `search_path`, catalog discovery/existence/persistence, owner/ACL/privilege state, and caller-supplied authorization assertions as provenance. `public` is admitted only when a trusted source designates that exact tuple.
6. **Exact byte domain and binding:** retain Unicode-scalar inputs and no rewriting; encode once; reject exact lower-case `pg_` schema-byte prefix and exact lower-case `information_schema` before namespace SQL and on both returned schema buffers; retain the fully qualified three-equality query returning exactly two raw buffers; retain exact one-row/shape/type/equality checks before and after the lock; never switch keys after acquisition.
7. **Identity, diagnostics, and limitations:** retain exact `rick-and-morty-explorer:migrations:v2`, length framing, SHA-256, signed 64-bit `bigint`/decimal `pg_catalog.int8`, all eight vectors, collision semantics, and the absolute prohibition on v1 reuse/reinterpretation or mixed execution. State the normalized diagnostic/result precedence. Limit rebind to name-visible drift between statement snapshots; it does not prove object/OID/owner/ACL/privilege continuity, exact-name recreation can pass and reuse identity, later privileged DDL remains possible, and advisory locking is cooperative.
8. **Permissions and downstream proof:** keep privilege/owner/ACL booleans out of the identity bind. Require TASK-004 to prove the normative guard even through the privileged official-image Compose path and separately prove a dedicated non-superuser migration role with exact database/schema and owned-object capabilities. Provisioning authority may remain separate.
9. **Consequences, risks, reversal, and validation:** distinguish identity safety, application-target authorization, and operational least privilege; add missing/forged provenance, system-schema, superuser, ACL drift, and exact-name recreation risks; retain driver, concurrency, collision, ownership, cleanup, platform, and PostgreSQL-version risks. Replace positive `pg_catalog` validation with authorized application positives and negative lower-case `pg_*`, exact `information_schema`, missing/forged provenance, both returned observations, no-history/no-DDL, privileged-path, least-privilege, and rebind-limit fixtures. Keep every runtime statement explicitly unproved until TASK-004.
10. **Recommendation and references:** retain 91/100 and `Accept` as an evidence-based recommendation, never approval. Preserve prior PASS/hash as point-in-time non-authorizing history and require corrected-artifact validation plus fresh final IR-B before owner presentation. Add ADR-0014, PostgreSQL `information_schema`, roles/privileges/system-information functions, and official PostgreSQL image initialization behavior to the existing primary sources.

Proposal-stage synchronization after fresh IR-A and primary ADR revision must update current review/navigation only: `README.md`; `docs/adrs/README.md`; DG-005, TASK-018, TASK-004 routing and OR-001 coverage in `docs/IMPLEMENTATION_PLAN.md`; `docs/SYSTEM_DIAGRAM.md`; `docs/plans/README.md`; the TASK-004 waiting plan; `docs/specs/README.md`; this ExecPlan; and append-only execution chronology. These owners must say that the old hash/PASS is historical, the corrected proposal remains Proposed, and fresh final IR-B precedes owner consideration. OR-001 must appear as **adopted optional** in DG-005 and the requirement-to-task coverage: TASK-002/TASK-018 own the migration decision foundation, TASK-004 and mapped production tasks own implementation, and TASK-013/TASK-015 own portfolio/delivery closure.

While ADR-0015 remains Proposed, do not change feature-level authority in `docs/specs/SPEC.feature` or `docs/specs/HARD_SPEC.feature`. Only after a later exact owner approval may lifecycle reconciliation update SPEC-010, SPEC-016, HS-002, HS-011, and HS-018 to the accepted ADR-0015/current-successor boundary while retaining ADR-0012 only where historical carry-forward is intentional.

Current stale approval-readiness claims that primary proposal synchronization must correct are in root README current status; ADR index current-status and lifecycle prose; DG-005/TASK-018/TASK-004 status and chronology in the implementation plan; system diagram migration notes; plan index; TASK-004 progress/discovery/revision notes; specification routing index; ADR-0015 validation/evaluation; and the current invariant evidence above. Historical chronology entries remain intact and must be labeled rather than deleted.


### Initial corrected integrated evidence and pre-freeze revision


The primary revised the existing Proposed ADR-0015 and every proposal-stage owner enumerated above, then provisionally froze initial corrected ADR SHA-256 `8FFFB0887C2572C8AF39D89B012F9D5422123B72798568C0011DDE25E521B306`. The revision preserved exact v2 serialization and the 91/84/77 comparison while adding the renewed authorized-application-domain contract, rebind limits, ADR-0014/OR-001 trace, and fixture clarification.

Integrated validation at 2026-08-13 14:38Z produced:

- `python .agents/skills/verify-repository/scripts/validate_docs.py --repo .`: PASS for 48 Markdown files, 41 requirement IDs, 1 authorization, 18 tasks, 17 SPEC rules, 20 HS rules, and 119 scenarios;
- `python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .`: PASS for 15 ADRs and 38 requirements, with only the established nonblocking NFR-006 delivery-constraint warning;
- `git diff --check`: PASS, with only Git's informational LF-to-CRLF working-copy warnings;
- strict byte checks: all ten changed/new files decode as UTF-8, have no BOM, and end in LF;
- Node.js 24.18.0 and Python 3.12.10: all eight exact v2 SHA-256 digests and signed keys reproduced;
- preservation and authority checks: ADR-0012 has no diff; ADR-0015 is Proposed; ADR-0012 and ADR-0014 remain Accepted; DG-005 and TASK-004 remain Pending; TASK-018 remains In progress; TASK-004 depends only on TASK-002 and TASK-003; and acceptance-only SPEC/HS files remain unchanged; and
- negative scope checks: the working tree is documentation-only; structured manifest/lock parsing finds no Sequelize, Umzug, or `pg` dependency; no non-documentation v2 implementation exists; and no migration runner, migration, schema, history, database-backed migration test, or ERD is claimed.

A first auxiliary text search for dependency names matched the substring `pg` inside lockfile integrity hashes and failed by design. It made no write and was replaced by the passing structured JSON-key inspection above; integrity-string substrings are not dependencies.

A subsequent read-only pre-freeze semantic audit returned `REVISE` on that provisional ADR hash because ADR-0014 appeared in metadata and references but its current TASK-004 sole-image-field/no-image-subsystem rule was not stated in the artifact-local whole-record Context or Decision. The primary added one linked Context paragraph carrying forward the exact constraint. The provisional hash and its passing mechanical validation remain diagnostic history; the revised ADR requires a new complete integrated barrier before final IR-B.

Revalidation at 2026-08-13 14:45Z froze revised ADR SHA-256 `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3` and again passed both validators with the same counts/warning, `git diff --check`, strict ten-file hygiene, all eight vectors in Node.js 24.18.0 and Python 3.12.10, structured manifest/lock dependency absence, ADR-0012 immutability, documentation-only scope, exact Proposed/Pending/In-progress authority states, unchanged TASK-004 dependencies, and negative runtime-v2 scope. One combined authority-check invocation mis-bound positional `Select-String` arguments and wrote nothing; the exact rerun with explicit `-Path` and `-Pattern` passed. At that checkpoint, a separate read-only trace audit remained the last auxiliary pre-freeze check before the mandatory final reviewer could receive the exact plan hash.

The read-only trace audit concluded at 2026-08-13 14:51Z with one proposal-stage trace finding and no semantic/status contradiction. The primary updated current navigation to say revised-hash validation passed, appended the missing execution chronology, and preserved every owner-controlled state. The complete post-trace integrated barrier then passed at 2026-08-13 14:53Z with the same validator counts and NFR-006 warning, `git diff --check`, strict hygiene, both runtime vector suites, structured dependency absence, immutable-authority checks, exact state/dependency checks, and negative implementation scope. Corrected ADR SHA-256 remains `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3`; the post-append plan hash is supplied externally to fresh IR-B.


### Complete fresh final IR-B: PASS


A new read-only `independent_reviewer`, distinct from all renewed researchers, analyst, IR-A reviewers, and pre-freeze auditors, verified exact ADR SHA-256 `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3`, pre-reconciliation ExecPlan SHA-256 `96B3077158B3FC25BC3031752B8E5DE4F79BD730941D12A966F5EB2B96A7B69B`, and HEAD `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`. The reviewer read the complete contract/reports/synthesis/checkpoints/ADR/diff/authority owners, made no write, and returned `PASS` with no Blocker, Major, or Minor.

IR-B passed all thirteen hard gates and LOCK-INV-01 through LOCK-INV-14; whole-record ADR-0012 and ADR-0014 carry-forward; the 91/84/77 comparison; positive provenance, exact system-domain exclusion, qualified catalog binding, privilege separation, and rebind limits; exact v2/v1 boundary; fixture/current-toolchain distinction; OR-001 and proposal-versus-acceptance routing; primary sources; both validators; `git diff --check`; strict ten-file hygiene; Node/Python vectors; immutable accepted/specification authority; exact task/gate/dependency states; and negative implementation/dependency scope.

Residual PostgreSQL/driver byte and `int8` arrival, provenance/forgery, privileged/least-privilege, hostile-`search_path`, pre/post domain, rename/recreation/later-DDL, concurrency/collision, timeout/loss/ambiguity/cleanup, diagnostics, Windows/CI, migration/schema/history, and ERD proof remain TASK-004/TASK-014 obligations. The verdict authorizes only byte-preserving primary reconciliation and presentation of the exact Proposed ADR for owner approval.


### Historical second-correction post-verdict reconciliation barrier


The primary left reviewed ADR-0015 byte-identical and synchronized only current review/status navigation, the TASK-004 waiting plan, this living plan, and append-only execution chronology. Documentation validation again passed for 48 Markdown files, 41 requirement IDs, 1 authorization, 18 tasks, 17 SPEC rules, 20 HS rules, and 119 scenarios. ADR validation again passed for 15 ADRs and 38 requirements with only the established NFR-006 warning. `git diff --check`, strict ten-file UTF-8/no-BOM/final-LF hygiene, all eight vectors in Node.js 24.18.0 and Python 3.12.10, structured dependency absence, ADR-0012/ADR-0014/SPEC/HARD_SPEC preservation, Proposed/Pending/In-progress state, TASK-004 dependency preservation, documentation-only scope, and negative runtime-v2 checks all passed.

Reviewed ADR SHA-256 remains `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3`. ADR-0015 is `Proposed`; ADR-0012 and ADR-0014 are `Accepted`; DG-005 and TASK-004 are `Pending`; TASK-018 is `In progress`; TASK-004 depends only on TASK-002/TASK-003 and is unstarted; no implementation exists. Exact project-owner approval is the sole remaining action at this authorization boundary.


### Third owner-authorized correction re-entry


The preceding approval-readiness statement is preserved historical evidence and no longer controls. Subsequent PostgreSQL 18.4 source review established that the qualified `pg_catalog.convert_to` call can still reach `FindDefaultConversionProc` through `activeSearchPath` for non-UTF8-to-UTF8 conversion, and database-domain review established that the two-buffer bind admits connectable template databases and ignores mutable `datistemplate`/`datallowconn` state.

On 2026-08-13 the project owner explicitly authorized one named third bounded correction for those two defects and their exact ordering, diagnostics, fixtures, and trace, followed by one fresh final review. Comparable research, renewed `DRAFT READY`, a trace-only IR-A correction, complete fresh IR-A `PASS`, and primary revision are complete; integrated validation and fresh IR-B remain. ADR-0015 remains `Proposed`; ADR-0012 and ADR-0014 remain `Accepted`; DG-005 and TASK-004 remain `Pending`; TASK-018 remains `In progress`; TASK-004 depends only on TASK-002/TASK-003 and is unstarted; no implementation exists. Exact historical ADR SHA-256 `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3` is non-authorizing, and no replacement owner-approval target exists until the revised artifact passes the remaining barrier.


### Third-correction comparable research reports


Three separate read-only `technology_researcher` instances verified the same frozen Decision Review Contract SHA-256 `DCAB480B064D999520BFAB3F0B6CFE93F7E08879A7B60D888D0E158E562683A9`, current historical ADR SHA-256 `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3`, and unchanged repository authority. Each read the applicable requirements and accepted ADRs plus PostgreSQL 18.4, Node.js 24.18.0, and node-postgres primary sources; made no write; preserved v2-only identity, TASK-004 dependencies/status, and the no-implementation boundary; evaluated all fourteen hard gates and LOCK-INV-01 through LOCK-INV-15; and returned `READY FOR RE-ANALYSIS`.

Reports A, B, and C each explicitly incorporate this common pinned primary-source set as evidence for the third-correction premises and must be read with it:

- PostgreSQL REL_18_4 [`mbutils.c`](https://raw.githubusercontent.com/postgres/postgres/REL_18_4/src/backend/utils/mb/mbutils.c) establishes that `pg_do_encoding_conversion` returns before default-conversion lookup when source and destination encodings are equal and otherwise can call `FindDefaultConversionProc`.
- PostgreSQL REL_18_4 [`namespace.c`](https://raw.githubusercontent.com/postgres/postgres/REL_18_4/src/backend/catalog/namespace.c) establishes that `FindDefaultConversionProc` searches `activeSearchPath` for a matching default conversion.
- PostgreSQL 18 [`pg_database`](https://www.postgresql.org/docs/18/catalog-pg-database.html) documents `encoding`, `datistemplate`, and `datallowconn` as the current catalog fields used by the selected preflight and both binds.
- PostgreSQL 18 [Template Databases](https://www.postgresql.org/docs/18/manage-ag-templatedbs.html) documents `template1` as the default source for new databases, `template0` as a pristine template, normal connection behavior, and the ability to create additional template databases.
- PostgreSQL 18 [Character Set Support](https://www.postgresql.org/docs/18/multibyte.html) documents the server-encoding domain and SQL_ASCII's no-conversion/ignorance semantics that make it unsuitable for the selected exact-UTF8 contract.

Common source-grounded result:

- PostgreSQL 18.4's `convert_to` uses the current database encoding as source. UTF8-to-UTF8 returns through the equal-encoding fast path before default-conversion lookup. For an ordinary non-UTF8 source, `FindDefaultConversionProc` traverses `activeSearchPath`; qualifying the SQL function does not qualify that internal lookup.
- A transaction-local `search_path` containing only `pg_catalog` can constrain that lookup, but introduces mutable GUC state, savepoint and prepared-statement considerations, schema-qualification obligations, conversion-catalog dependence, and a larger driver/runtime proof surface.
- `pg_database.datistemplate` and `datallowconn` are mutable. `template1` is normally connectable and arbitrary templates are permitted. Exact current-database name binding plus trusted tuple provenance therefore does not establish current application-database class.
- Every candidate locally rejects exact lower-case UTF8 database buffers for `template0` and `template1`, repeats that predicate on both returned database buffers, and requires exact primitive booleans `datistemplate === false` and `datallowconn === true` at the pre-lock and post-lock observations.
- Positive provenance remains necessary and separate. It can come only from trusted application/deployment migration-target configuration that designates the exact tuple or the exact owned ADR-0011 allocator output. Current catalog state, privileges, ownership, ACLs, a connection string by itself, or caller-supplied authorization flags do not suffice.
- PostgreSQL cannot expose immutable database lineage through these fields. A former template renamed and changed to `datistemplate=false` is catalog-indistinguishable from an ordinary database; closed provenance and provisioning controls own that residual boundary.
- All reports prefer a separate UTF8-only preflight because no repository authority requires non-UTF8 application databases. That repair removes the internal conversion lookup instead of controlling it and leaves transaction `search_path` untouched. Controlled conversion remains the reversal option if a present non-UTF8 requirement appears.

The reports intentionally expose one issue for analyst normalization. Exact bytes and OID reject SQL_ASCII in both branches because SQL_ASCII is not a sound exact-UTF8 identifier contract. Restricted ASCII considers SQL_ASCII technically admissible under controlled conversion for its ASCII-only names because PostgreSQL takes a special validation path. This disagreement prevents the primary from treating the reports as already synthesized even though all recommend UTF8-only operation.

#### Report A: `EXACT-CATALOG-BYTES`

The exact-byte report retained the candidate's normalized score at 91/100: requirements 20/20, architectural fit 19/20, options/trade-offs 14/15, feasibility 12/15, quality 9/10, verifiability 9/10, and evolution 8/10. Correctness repairs receive no score credit. The report advances exact bytes conditionally, with confidence 0.88, and keeps restricted ASCII as strongest identity-policy dissent and controlled conversion as strongest encoding dissent.

Selected candidate subpath: after artifact and local provenance/domain preflight, start the dedicated explicit `READ COMMITTED` transaction and immediately run one unnamed raw-result statement before any `convert_to`, lock, history read, savepoint, or DDL:

```sql
SELECT
  CAST(
    pg_catalog.pg_encoding_to_char(d.encoding)
    AS pg_catalog.text
  ) AS server_encoding,
  d.datistemplate AS database_is_template,
  d.datallowconn AS database_allows_connections
FROM pg_catalog.pg_database AS d
WHERE d.datname
  OPERATOR(pg_catalog.=)
  pg_catalog.current_database();
```

Require raw array mode, unnamed execution, command `SELECT`, exactly one row of length three, and exactly these ordered fields/types: `server_encoding`/text OID 25, `database_is_template`/bool OID 16, and `database_allows_connections`/bool OID 16. Require primitive string `UTF8`, exact boolean `false`, and exact boolean `true`, checking class before encoding for stable precedence. LATIN1 and SQL_ASCII reject before any conversion, lock, history, or DDL.

Both identical catalog binds then return five ordered fields: exact database `bytea`, exact schema `bytea`, server encoding text, template boolean, and allow-connections boolean. Require OIDs 17, 17, 25, 16, and 16; exact one-row shape; raw buffers equal to configured and retained values; local and returned database/schema predicates; UTF8; false/true class; and identical post-lock observations. The retained pre-lock buffers alone feed unchanged exact v2 framing and signed key derivation. No key switch is allowed.

The exact report retains all eight existing portable v2 vectors, Unicode/case distinctions, name-visible rebind limits, dedicated connection/transaction ownership, bounded sequential try-lock polling, fresh post-lock history, complete-command transaction, transaction-end release, ambiguity recovery, and every unaffected ADR-0012/ADR-0014 clause. Reversal triggers include a demonstrated non-UTF8 requirement, inability to guarantee UTF8 for application/run-scoped databases, raw-buffer or signed-int8 failure, provenance failure, platform disagreement, or unacceptable name-reuse/collision behavior.

#### Report B: `RESTRICTED-ASCII-DOMAIN`

The ASCII report retained 84/100: requirements 18/20, architectural fit 17/20, options/trade-offs 13/15, feasibility 13/15, quality 8/10, verifiability 9/10, and evolution 6/10. It remains technically viable only after an explicit owner-adopted lower-case ASCII naming policy; the current repository has none. Confidence is 0.86 overall. Exact bytes remain the strongest dissent because they preserve all valid PostgreSQL names while needing the same database, catalog, driver, lock, ownership, and concurrency guards.

The option admits only database/schema names of one through 63 bytes, beginning with a lower-case ASCII letter and continuing with lower-case ASCII letters, digits, or underscore. Every uppercase, Unicode, hyphenated, quoted, whitespace, control, leading-underscore, empty, and 64-byte value rejects rather than rewrites. Exact `template0`/`template1` database names and lower-case `pg_`/exact `information_schema` schemas reject independently.

Its preferred UTF8-only branch uses the same immediate database preflight and requires exactly one current-database row, exact false/true class flags, and exact UTF8 before any conversion. Its identical pre/post catalog bind returns five fields and reapplies the ASCII, template, connectability, system-schema, exact-buffer, encoding, and retained-observation assertions. The unchanged v2 payload produces portable ASCII vectors and rejects Unicode/case inputs without deriving a key.

The report's controlled alternative uses transaction-local `set_config('search_path','pg_catalog',true)` plus exact `current_setting` assertions before affected binds and prohibits later path mutation. It regards UTF8, LATIN1, and conditionally SQL_ASCII as possible for ASCII-only identifiers. Savepoint rollback, connection-startup encoding, GUC restoration, pool leakage, and hostile conversions remain additional TASK-004 proof. The analyst must normalize SQL_ASCII against the other reports before choosing any controlled path.

#### Report C: `CATALOG-OID-PAIR`

The OID report retained 77/100: requirements 19/20, architectural fit 16/20, options/trade-offs 13/15, feasibility 10/15, quality 7/10, verifiability 7/10, and evolution 5/10. It remains technically viable but third-ranked. Confidence is 0.92 in the preferred contract and 0.70 in future driver feasibility. Exact bytes are the strongest dissent because they keep portable logical name-to-key behavior, deterministic name vectors, and clearer diagnostics without a demonstrated need for rename-stable catalog-object identity.

The preferred UTF8-only preflight returns encoding decimal, encoding name, and supported boolean; the report also accepts normalization to the common three-field class/encoding preflight if analysis selects it. The pre/post OID bind returns database OID decimal, namespace OID decimal, both exact name buffers, encoding evidence, template boolean, and allow-connections boolean. OIDs must be canonical nonzero decimal strings parsed only with `BigInt`, range 1 through 4294967295, and round-trip exactly. The retained OID pair feeds unchanged v2 U32BE OID framing and five synthetic vectors.

The OID option retains rename-stable identity for the same catalog objects but normally rekeys on drop/recreate or logical reconstruction; OIDs are reusable, database OID is redundant in the database-local lock space, portable name-to-key vectors are impossible, and separate clusters do not coordinate. Its controlled alternative admits supported non-SQL_ASCII encodings only when one trusted `pg_catalog` default conversion is visible, and retains conversion OID/encoding evidence at both observations. SQL_ASCII rejects.

#### Common downstream proof and failure boundary

TASK-004 must prove exact raw result containers, ordered fields/type OIDs, outbound and inbound buffers, primitive booleans, canonical decimal `int8`, UTF8 positive behavior, LATIN1/SQL_ASCII early rejection for the selected contract, hostile conversion nonexecution, exact built-in and arbitrary/renamed template rejection, already-connected `datallowconn=false`, flag/encoding/name drift between binds, ordinary and ADR-0011 application databases, explicit-provenance-only `postgres`, every schema-system fixture, no lock/history/DDL on pre-lock rejection, no history/DDL and rollback after post-lock rejection, same/disjoint concurrency, false collision, timeout/interruption/loss/ambiguity, owned/borrowed cleanup, least privilege, Windows/CI, mixed-version exclusion, and all carried-forward artifact/migration/history/ADR-0014 obligations.

The reports use slightly different candidate-local diagnostic names. Required normalized categories are: local provenance/domain invalid; database preflight result invalid; database class invalid; encoding unsupported or encoding control invalid; pre-lock bind invalid; post-lock observed target changed; existing lock query/result/timeout/interruption/loss/ambiguity; and secondary cleanup. Every local, preflight, and pre-bind failure occurs before advisory lock, history, or DDL. A post-lock validation failure holds only the transaction lock briefly, reads no history, performs no DDL, and rolls back. Decision analysis must choose exact labels and precedence before fresh IR-A.


### Third-correction renewed decision analysis: `DRAFT READY`


The read-only `decision_analyst` audited the complete integrated research packet at SHA-256 `CE2754C00979AD7422607BCF01B7844CA2D7B23A9F27D29CCF334766979D256F` and the historical, non-authorizing ADR-0015 at SHA-256 `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3`. The analyst reconciled the three frozen third-correction reports against the same repository authorities and primary sources, made no repository write or lifecycle change, and returned exactly `DRAFT READY`.

The candidates are comparable. Each uses the same closed database/schema provenance, application-database and application-schema admission, dedicated connection and explicit transaction, pre/post target observation, bounded sequential transaction-level lock polling, v2-only boundary, failure/recovery model, and downstream proof obligations. Their scores remain unchanged because closing a shared correctness defect earns no quality credit:

| Rank | Candidate | Requirements | Architecture | Options | Feasibility | Quality | Verifiability | Evolution | Total | Analyst disposition |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | `EXACT-CATALOG-BYTES` | 20 | 19 | 14 | 12 | 9 | 9 | 8 | 91 | Select with UTF8-only database preflight. |
| 2 | `RESTRICTED-ASCII-DOMAIN` | 18 | 17 | 13 | 13 | 8 | 9 | 6 | 84 | Viable only after an unadopted naming policy; do not select. |
| 3 | `CATALOG-OID-PAIR` | 19 | 16 | 13 | 10 | 7 | 7 | 5 | 77 | Viable but reconstruction-dependent and less portable; do not select. |

The selected contract retains exact catalog-returned UTF8 bytes as the identity source. It supports only application databases whose current server encoding is exactly `UTF8`; LATIN1, SQL_ASCII, and every other encoding fail closed before any conversion, advisory lock, migration-history access, savepoint, or DDL. SQL_ASCII is not a conditional exception. A transaction-local controlled `search_path` is not selected because no current requirement needs non-UTF8 application databases and that alternative adds mutable GUC, savepoint, prepared-statement, pool-restoration, conversion-catalog, and qualification proof without improving the selected identity semantics.

The normative order is:

1. Validate the immutable built migration artifact and all carried-forward ADR-0012 artifact checks.
2. Obtain and validate one immutable, positively authorized exact database/schema tuple from trusted application/deployment migration-target configuration or the exact owned ADR-0011 allocator output.
3. Validate both values as primitive, nonempty, well-formed Unicode scalar strings; reject U+0000, lone surrogates, UTF8 encoding failure, and framing overflow; never normalize, fold case, rewrite, tokenize, or interpret them as SQL.
4. Encode each value exactly once as UTF8 bytes.
5. Reject exact database bytes `template0` and `template1` locally.
6. Reject a schema whose exact bytes start with lower-case `pg_` or equal lower-case `information_schema` locally.
7. Acquire one dedicated physical connection and begin an explicit `READ COMMITTED` transaction owned by the migration command.
8. Immediately execute the database preflight below before any `convert_to`, advisory lock, history operation, savepoint, or DDL.
9. Execute the pre-lock catalog bind, retain its exact returned buffers and metadata, and derive the v2 key only from the retained database/schema buffers.
10. Poll the transaction-level try-lock sequentially with the carried-forward bounded deadline, cancellation, and connection-ownership rules.
11. After a successful lock and before history access, repeat the identical catalog bind and compare the complete result with the configured and retained observations. Never derive or switch to a new key.
12. Only then read fresh migration history and execute the complete migration command in the same transaction.
13. Commit on success or roll back on failure; transaction end releases the lock, and connection release follows the carried-forward owned/borrowed cleanup contract.

The immediate database preflight is one unnamed raw-result statement with array rows:

```sql
SELECT
  CAST(
    pg_catalog.pg_encoding_to_char(d.encoding)
    AS pg_catalog.text
  ) AS server_encoding,
  d.datistemplate AS database_is_template,
  d.datallowconn AS database_allows_connections
FROM pg_catalog.pg_database AS d
WHERE d.datname
  OPERATOR(pg_catalog.=)
  pg_catalog.current_database();
```

Require command `SELECT`, ordered fields `server_encoding`, `database_is_template`, and `database_allows_connections` with PostgreSQL type OIDs 25, 16, and 16, exactly one array row of length three, a primitive string, and primitive booleans. After validating container, command, metadata, cardinality, row length, and primitive types, apply stable value precedence: `database_is_template` must be exactly `false`, `database_allows_connections` must be exactly `true`, and `server_encoding` must be exactly `UTF8`. This statement contains no `convert_to`; a valid UTF8 result establishes that both later conversions take PostgreSQL's same-encoding fast path rather than resolving a default conversion through `activeSearchPath`.

The identical pre-lock and post-lock bind is one unnamed raw-result statement with array rows:

```sql
SELECT
  pg_catalog.convert_to(
    CAST(d.datname AS pg_catalog.text),
    CAST('UTF8' AS pg_catalog.name)
  ) AS database_name_bytes,
  pg_catalog.convert_to(
    CAST(n.nspname AS pg_catalog.text),
    CAST('UTF8' AS pg_catalog.name)
  ) AS schema_name_bytes,
  CAST(
    pg_catalog.pg_encoding_to_char(d.encoding)
    AS pg_catalog.text
  ) AS server_encoding,
  d.datistemplate AS database_is_template,
  d.datallowconn AS database_allows_connections
FROM pg_catalog.pg_database AS d
CROSS JOIN pg_catalog.pg_namespace AS n
WHERE (
  d.datname
    OPERATOR(pg_catalog.=)
  pg_catalog.current_database()
)
AND (
  pg_catalog.convert_to(
    CAST(d.datname AS pg_catalog.text),
    CAST('UTF8' AS pg_catalog.name)
  )
    OPERATOR(pg_catalog.=)
  CAST($1 AS pg_catalog.bytea)
)
AND (
  pg_catalog.convert_to(
    CAST(n.nspname AS pg_catalog.text),
    CAST('UTF8' AS pg_catalog.name)
  )
    OPERATOR(pg_catalog.=)
  CAST($2 AS pg_catalog.bytea)
);
```

Require command `SELECT`, ordered fields `database_name_bytes`, `schema_name_bytes`, `server_encoding`, `database_is_template`, and `database_allows_connections` with type OIDs 17, 17, 25, 16, and 16, exactly one array row of length five, raw `Buffer` values for both byte fields, a primitive string, and primitive booleans. Require the database buffer to equal the configured database bytes, the schema buffer to equal the configured schema bytes, the database name to be neither exact `template0` nor exact `template1`, the schema to satisfy the local application-schema predicate, the class values to be exactly false/true, and the encoding to be exactly `UTF8`. Retain immutable copies of the complete pre-lock result. The post-lock statement repeats every check and additionally requires complete equality with the retained result. Any post-lock SQL, shape, type, cardinality, byte, domain, class, encoding, or retained-observation failure is an observed target change; it cannot select another key.

Identity remains otherwise byte-for-byte unchanged: frame the exact 37-byte ASCII literal `rick-and-morty-explorer:migrations:v2`, retained database bytes, and retained schema bytes as independent unsigned 32-bit big-endian length plus payload segments; hash with SHA-256; interpret the first eight digest bytes as signed two's-complement big-endian 64-bit; render canonical decimal; and bind it through `CAST($1 AS pg_catalog.int8)`. All eight existing v2 vectors remain authoritative calculation fixtures. The literal `rick-and-morty-explorer:migrations:v1` remains prohibited, historical, and neither reusable nor reinterpretable.

Normalized diagnostics and process exits are:

| Condition | Diagnostic | Exit |
|---|---|---:|
| Local primitive/provenance/framing/template-name/schema-domain rejection | `MIGRATION_NAMESPACE_INVALID` | 1 |
| Database-preflight SQL, result container, command, metadata, cardinality, row, or primitive-type failure | `MIGRATION_DATABASE_PREFLIGHT_FAILED` | 1 |
| Structurally valid preflight or pre-lock bind reports template or non-connectable class | `MIGRATION_DATABASE_CLASS_INVALID` | 1 |
| Structurally valid preflight or pre-lock bind reports an encoding other than exact `UTF8` | `MIGRATION_DATABASE_ENCODING_UNSUPPORTED` | 1 |
| Other pre-lock catalog SQL/result/binding failure | `MIGRATION_NAMESPACE_BIND_FAILED` | 1 |
| Any target-observation failure after lock acquisition | `MIGRATION_NAMESPACE_CHANGED` | 1 |
| Advisory-lock SQL failure | `MIGRATION_LOCK_QUERY_FAILED` | 1 |
| Malformed lock result | `MIGRATION_LOCK_RESULT_INVALID` | 1 |
| Structurally valid false results until the deadline | `MIGRATION_LOCK_TIMEOUT` | 2 |
| Cancellation or interruption | `MIGRATION_LOCK_INTERRUPTED` | 1 |
| Connection loss | `MIGRATION_CONNECTION_LOST` | 1 |
| Unknown transaction outcome after commit starts | `MIGRATION_COMMIT_AMBIGUOUS`; never retry automatically | 1 |
| Secondary cleanup failure | `MIGRATION_CLEANUP_FAILED`; preserve the primary diagnostic, or exit 1 when cleanup is the only failure | 1 |
| Successful status, apply, revert, or no-op | Existing success/status output | 0 |

Failure precedence is: commit ambiguity after commit begins; connection loss or interruption over phase-local failures; local validation; structurally valid pre-lock database class before encoding and then other bind failure; after lock, every target-observation failure as `MIGRATION_NAMESPACE_CHANGED`; timeout only for structurally valid false lock results; cleanup as secondary unless it is the only failure. Diagnostics expose phase, bounded timing, and redacted identifiers only; they never print credentials, connection URLs, raw migration SQL, lock digests, or namespace bytes.

All fourteen hard gates pass at synthesis level: the selected contract fixes exact admitted domains; injective framing over admitted tuples; cross-platform byte/key semantics; explicit transaction-level lock mode; lock-before-history order; same/disjoint namespace concurrency; release ownership; timeout/interruption/loss/ambiguity behavior; v2-only compatibility; documented alternatives and scores; source-grounded database encoding/class behavior; hidden-assumption disclosure; application-schema provenance/domain; and application-database encoding/class. LOCK-INV-01 through LOCK-INV-15 likewise pass at synthesis/contract level. Fresh independent review remains mandatory, and no contract-level pass is runtime evidence.

Decide now in ADR-0015: closed provenance; exact database/schema input and UTF8 byte domains; local template/system-schema rejects; exact preflight and bind SQL/result contracts; UTF8-only database support; pre/post observation and no-key-switch rule; unchanged v2 framing/key/vectors and absolute v1 prohibition; transaction/lock/history/command order; diagnostics and precedence; ownership/release/recovery; limits of name-visible rebinding; complete ADR-0012 and ADR-0014 carry-forward; alternatives, scores, dissent, consequences, risks, reversal triggers, and downstream proof.

Prove later only in separately authorized TASK-004 through Red-Green-Refactor integration evidence: raw result containers and type OIDs through the chosen driver/Sequelize boundary; Buffer parameter/result fidelity; primitive booleans and canonical signed `int8`; UTF8 positive behavior; LATIN1 and SQL_ASCII rejection before conversion/lock/history/DDL; hostile conversion nonexecution; built-in, arbitrary, and renamed template rejection; already-connected `datallowconn=false`; encoding/class/name drift between observations; exact application-target provenance; all application/system-schema fixtures; same/disjoint concurrency; false-collision safety; timeout/interruption/loss/ambiguity; transaction/session cleanup; least privilege; Windows/CI behavior; mixed-version exclusion; immutable artifacts; migration history; rollback; and every carried-forward ADR-0012/ADR-0014 obligation. This decision work creates no test or implementation evidence.

The whole-record Proposed ADR must preserve its current metadata, Context, ADR-0012 replacement boundary, ADR-0014 image constraint, options, 91/84/77 matrix, existing v2 vectors, transaction/ownership/recovery rules, consequences, risks, reversal path, validation, documentation impact, and owner-controlled lifecycle. It must replace the current two-field database/schema bind and non-UTF8 implications with the exact three-field preflight, identical five-field pre/post binds, UTF8-only support, database-class/name assertions, normalized diagnostics, fixtures, and limitations above. Its References must cite the exact REL_18_4 `mbutils.c` and `namespace.c` files plus PostgreSQL 18 `pg_database`, Template Databases, and Character Set Support sources incorporated by Reports A/B/C above. Proposal-stage synchronization is limited to ADR-0015, root current-status navigation, ADR index, DG-005/TASK-018/TASK-004 routing, system diagram, plan index, TASK-004 waiting plan, specification navigation, this ExecPlan, and append-only execution chronology. `SPEC-010`, `SPEC-016`, `HS-002`, `HS-011`, and `HS-018` remain acceptance-only follow-ups and must not change while ADR-0015 is `Proposed`.

Strongest dissent: restricted ASCII reduces identifier/parser surface but would invent a repository-wide naming policy and reject valid PostgreSQL application names without a present requirement. Strongest encoding dissent: transaction-local controlled conversion could support selected non-UTF8 encodings but increases mutable runtime state and proof surface. Reopen this decision if a real non-UTF8 application-database requirement appears, application/run-scoped databases cannot be guaranteed UTF8, the driver cannot preserve raw buffers or exact signed `int8`, closed provenance cannot be enforced, independent runtimes disagree, or exact-name recreation/collision semantics become unacceptable. Analyst confidence is 0.97 in PostgreSQL encoding/class semantics, 0.95 in the recommendation, 0.94 in the SQL/result/diagnostic contract, and 0.72 in future driver/runtime feasibility pending TASK-004 proof.


### Fourth owner-authorized startup-control correction re-entry


The preceding third-correction approval-readiness statement is preserved historical evidence and no longer controls. PostgreSQL REL_18_4 source review established that startup options, search-path initialization, client-encoding conversion selection, and decoding of the first simple or extended query message all precede execution of the proposal's SQL preflight. Exact ADR-0015 SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69` and its final IR-B `PASS` are therefore historical and non-authorizing.

On 2026-08-13 the project owner selected the practical startup-controlled connection direction for this personal portfolio and explicitly authorized one named fourth bounded correction with comparable research, renewed analysis, fresh IR-A, primary revision, integrated validation, and one different fresh IR-B. ADR-0015 remains `Proposed`; ADR-0012 and ADR-0014 remain `Accepted`; DG-005 and TASK-004 remain `Pending`; TASK-018 remains `In progress`; TASK-004 still depends only on TASK-002/TASK-003 and is unstarted; no implementation exists.


### Fourth-correction comparable startup-control reports


Three separate read-only `technology_researcher` instances verified frozen Decision Review Contract SHA-256 `379662AAE5BC8E383061A422146829839317B5530F308390348B23D00F2435A2`, historical ADR-0015 SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69`, and HEAD `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`. Each read the mapped repository authorities and current primary PostgreSQL/node-postgres evidence, made no write, preserved the exact v2 identity and 91/84/77 identity ranking without repair credit, evaluated all fifteen hard gates and LOCK-INV-01 through LOCK-INV-16, and returned `READY FOR RE-ANALYSIS`.

Reports A, B, and C incorporate this pinned primary-source set:

- PostgreSQL REL_18_4 [`backend_startup.c`](https://raw.githubusercontent.com/postgres/postgres/REL_18_4/src/backend/tcop/backend_startup.c) and [`postinit.c`](https://raw.githubusercontent.com/postgres/postgres/REL_18_4/src/backend/utils/init/postinit.c) establish startup-packet parsing, startup/database/role setting order, `InitializeSearchPath()` before `InitializeClientEncoding()`, and the pre-query boundary.
- PostgreSQL REL_18_4 [`guc.c`](https://raw.githubusercontent.com/postgres/postgres/REL_18_4/src/backend/utils/misc/guc.c) and [`guc.h`](https://raw.githubusercontent.com/postgres/postgres/REL_18_4/src/include/utils/guc.h) establish source priority and later-value replacement at equal startup-client priority.
- PostgreSQL REL_18_4 [`mbutils.c`](https://raw.githubusercontent.com/postgres/postgres/REL_18_4/src/backend/utils/mb/mbutils.c) and [`namespace.c`](https://raw.githubusercontent.com/postgres/postgres/REL_18_4/src/backend/catalog/namespace.c) establish client/server conversion initialization, default-conversion lookup through `activeSearchPath`, the equal-encoding path, and omission of the current temporary namespace from conversion lookup.
- PostgreSQL REL_18_4 [`postgres.c`](https://raw.githubusercontent.com/postgres/postgres/REL_18_4/src/backend/tcop/postgres.c) and [`pqformat.c`](https://raw.githubusercontent.com/postgres/postgres/REL_18_4/src/backend/libpq/pqformat.c), plus PostgreSQL 18 [protocol flow](https://www.postgresql.org/docs/18/protocol-flow.html) and [message formats](https://www.postgresql.org/docs/18/protocol-message-formats.html), establish that simple Query and extended Parse strings and text Bind values can be converted before their SQL executes, while binary Bind values use the binary receiver.
- node-postgres `pg@8.22.0` [`client.js`](https://raw.githubusercontent.com/brianc/node-postgres/pg%408.22.0/packages/pg/lib/client.js), [`connection-parameters.js`](https://raw.githubusercontent.com/brianc/node-postgres/pg%408.22.0/packages/pg/lib/connection-parameters.js), and [`serializer.ts`](https://raw.githubusercontent.com/brianc/node-postgres/pg%408.22.0/packages/pg-protocol/src/serializer.ts) establish forwarded startup `options`, connection-string/environment precedence, pure-JavaScript protocol encoding, Buffer binary binding, and the serializer's final direct `client_encoding=UTF8` field.
- Sequelize 6.37.7 PostgreSQL [`connection-manager.js`](https://raw.githubusercontent.com/sequelize/sequelize/v6.37.7/src/dialects/postgres/connection-manager.js), abstract [`connection-manager.js`](https://raw.githubusercontent.com/sequelize/sequelize/v6.37.7/src/dialects/abstract/connection-manager.js), and the [connection-pool contract](https://sequelize.org/docs/v6/other-topics/connection-pool/) establish that a private Sequelize instance is pooled and can issue its own setup/type/version SQL after startup but before the repository preflight. The abstract manager specifically opens a direct `_connect` when `databaseVersion === 0`, closes it after version detection, and only then acquires through the pool; the selected max-one-session contract must therefore suppress that bootstrap path and TASK-004 must prove the exact locked-version mechanism.

Common source-grounded result:

- Startup `options` and generic startup GUC fields use client startup priority and outrank database/role defaults. At equal priority, later generic fields win. The locked pure-JavaScript node-postgres serializer appends direct `client_encoding=UTF8` after forwarded `options`, so its UTF8 value wins a conflicting encoding inside `options`.
- Exact factory-owned startup `options=-c search_path=pg_catalog` initializes the conversion lookup path before client encoding. `FindDefaultConversionProc` searches that effective path and skips the current temporary namespace. A hostile explicit path with a user schema before `pg_catalog` would be unsafe, so the path must be exact and caller-independent rather than relying on implicit catalog placement.
- A SQL preflight cannot establish the safety condition needed to decode itself. It remains necessary only as forward validation before namespace bind, advisory lock, migration history, savepoint, or DDL.
- The accurate practical invariant is **no untrusted conversion**, not zero conversion. A correctly routed UTF8 server needs no conversion procedure. A misdirected LATIN1 server can select and execute only the trusted built-in conversion from `pg_catalog` before the first SQL rejects the server encoding. SQL_ASCII supplies no sound exact UTF8 identifier boundary and rejects.
- Connection URLs, URL query parameters, caller `options`, ambient fallback, custom low-level connections/streams, native/libpq mode, arbitrary configured Sequelize instances, caller pools, already-open clients, and borrowed sessions cannot establish the audited startup path and must be rejected or structurally unreachable.
- The future selected boundary must construct a factory-private Sequelize 6 instance with the exact pure-JavaScript `pg` dialect module, native mode disabled, no replication, a private one-connection pool, one acquired session, and mandatory transaction termination and instance close. ADR-0011 retains database/schema allocation and cleanup; it supplies trusted target components rather than a borrowed Sequelize instance.
- Stock Sequelize may issue setup/type/version SQL before the repository preflight. That SQL is protected by the trusted startup state. The contract requires the custom preflight before application namespace binding, lock, history, savepoint, or DDL, not literally as the first SQL emitted by stock Sequelize. TASK-004 must suppress any extra version-probe connection or prove that every internally created physical connection uses the identical startup guard.

#### Report A: `STARTUP-GUARDED-UTF8-ONLY`

Report A recommends the owner-selected practical candidate and returns the complete proposal at unchanged 91/100: requirements 20/20, architectural fit 19/20, options 14/15, feasibility 12/15, quality 9/10, verifiability 9/10, and evolution 8/10. The startup correction earns no score credit. Confidence is 0.96 in PostgreSQL semantics, 0.94 in the contract, and 0.78 in future Sequelize/node-postgres feasibility pending locked-version proof. The strongest dissent is provisioned UTF8 zero-conversion if zero conversion becomes mandatory.

Only a closed trusted target descriptor is admitted. The factory validates explicit nonempty host, port, database, user, credential/TLS, database/schema provenance, and exact identifiers; it does not accept a URI or generic driver configuration bag. It fixes `options=-c search_path=pg_catalog`, locks the pure-JavaScript serializer that appends `client_encoding=UTF8`, and owns the private max-one Sequelize pool and physical session from startup through transaction end and close. Ambient `PGOPTIONS`/`PGCLIENTENCODING` may also be rejected explicitly for diagnostic clarity even though exact trusted values structurally prevent fallback.

Immediately after acquisition and explicit `BEGIN`, and before namespace binding, lock, history, savepoint, or DDL, the selected forward preflight must return exactly five ordered raw-array fields: `startup_client_encoding`/text OID 25, `startup_search_path`/text OID 25, `server_encoding`/text OID 25, `database_is_template`/bool OID 16, and `database_allows_connections`/bool OID 16. Require command `SELECT`, exact metadata, exactly one row of length five, primitive strings/booleans, exact `UTF8`, exact `pg_catalog`, exact `UTF8`, exact false, and exact true. After structural validation, startup-state mismatch precedes database-class invalid, which precedes unsupported server encoding, which precedes namespace binding. The analyst must freeze the exact SQL spelling and field names before IR-A.

Existing identical pre-lock and post-lock five-field catalog binds, exact raw buffers, database/schema domain guards, retained-observation equality, v2 framing/vectors, signed key, transaction/lock/history order, diagnostics, timeout/loss/ambiguity, and every unaffected ADR-0012/ADR-0014 clause remain. New stable categories are `MIGRATION_STARTUP_CONFIG_INVALID`, `MIGRATION_STARTUP_FAILED`, and `MIGRATION_STARTUP_STATE_INVALID`; existing preflight/class/encoding/bind/lock/cleanup results remain after them.

TASK-004 must prove exact startup-packet fields/order; hostile role/database defaults overridden; URL, environment fallback, caller options, custom connection, native driver, arbitrary pool/borrowed session rejection; no unguarded Sequelize probe connection; UTF8 success; LATIN1/other misroute using at most a trusted catalog conversion before no-mutation rejection; hostile user-schema conversions never selected; SQL_ASCII rejection; simple Query, extended Parse, text Bind and Buffer binary Bind behavior; exact preflight/bind shapes; all class/domain/drift cases; ownership/cleanup; Windows/CI; and all existing v2/artifact/history/concurrency obligations.

All fifteen hard gates pass at research-contract level. LOCK-INV-09 closes by replacing arbitrary borrowing with factory ownership; LOCK-INV-15 admits only UTF8 after forward validation while permitting trusted built-in startup conversion on misroute; LOCK-INV-16 closes through exact startup provenance, path/encoding values, pure-JavaScript-only routing, override exclusion, protocol coverage, and arbitrary-session rejection. Runtime cells remain TASK-004 obligations.

#### Report B: `PROVISIONED-UTF8-ZERO-CONVERSION`

Report B scores 73/100: requirements 20/20, architectural fit 16/20, options 14/15, feasibility 5/15, quality 8/10, verifiability 5/10, and evolution 5/10. It rejects this candidate for the current portfolio with confidence 0.90 in the recommendation. The strongest dissent is a deployment that already supplies database-specific cryptographic attestation and authenticated endpoint binding.

Zero conversion is credible only if a separate trusted control plane, before socket creation, issues a fresh nonreplayable attestation binding environment/audience, immutable provider/cluster resource ID, exact logical database and name, creation/restore generation, UTF8, endpoint/TLS identity, validity interval, provisioning revision, and application/schema provenance, and the socket authenticates that same logical resource. A static manifest, Docker environment/init script, Compose service name, TLS hostname, or later SQL proves intent or endpoint only; it cannot fail closed against routing, staleness, restore, or drift.

The current repository has no such attestor, signing authority, resource identity, freshness protocol, or channel binding. Official Docker UTF8 initialization runs only for a new data directory and cannot attest an existing volume or the logical target reached by the later socket. Adding Docker-socket/control-plane privilege and provider-specific evidence is disproportionate.

The candidate otherwise needs the same fresh pure-JavaScript client, exact startup catalog path, URL/environment/native/borrowed exclusions, ParameterStatus observation, forward UTF8/class preflight, both catalog binds, and no-mutation failures. Generic pool reuse is unsafe because checking or resetting a reused client with SQL is already too late under a zero-conversion invariant.

Hard gate 15 conditionally fails in the present repository because the pre-socket exact-target guarantee does not exist, and hard gate 11 therefore blocks acceptance readiness for this candidate. LOCK-INV-16 likewise conditionally fails. It becomes credible only after an explicit later adoption of an external database-specific attestation boundary.

#### Report C: `STARTUP-GUARDED-MULTI-ENCODING`

Report C scores 79/100: requirements 20/20, architectural fit 16/20, options 14/15, feasibility 9/15, quality 7/10, verifiability 7/10, and evolution 6/10. It is technically viable only as UTF8 plus LATIN1 under an explicit trusted-cluster/`pg_catalog` premise and is not recommended without a present non-UTF8 requirement. Confidence is 0.96 in PostgreSQL semantics, 0.84 in conditional LATIN1 feasibility, and 0.67 in future locked integration.

For LATIN1, exact startup `search_path=pg_catalog` can restrict selection to the two built-in UTF8/LATIN1 default conversions. A forward preflight can attest current `pg_conversion` and `pg_proc` names, namespaces, directions, default flags, signatures, languages, and locked procedure metadata, with observed OIDs only as consistency checks. It cannot retroactively authenticate the already cached procedure; a superuser-replaced or compromised catalog with matching metadata remains inside the explicit trusted-cluster premise.

SQL_ASCII is unsupported. It permits arbitrary identifier bytes, while node-postgres represents JavaScript strings/query text as UTF8; invalid-UTF8 catalog bytes cannot be represented, selected, or framed under the complete exact-name contract. Restricting SQL_ASCII to valid UTF8 or ASCII identifiers would create a different restrictive domain.

This candidate requires the same private factory and protocol fixtures plus a six-field forward result carrying effective client encoding, path, server encoding, class/connectability, and exact conversion-allowlist status; both later binds must retain the exact admitted encoding. It adds conversion catalog/procedure fixtures, representability failures, trusted-cluster assumptions, version coupling, diagnostics, and operational proof with no present requirement benefit. Hard gate 15 passes only under that disclosed trust premise; otherwise the inability to authenticate the cached conversion before first SQL is fatal. The strongest dissent and recommended alternative is UTF8-only.

#### Common report disposition

All reports preserve exact v2 identity/vectors, positive application-target provenance, application database/schema guards, template/connectability checks, fully qualified catalog binding, finite-collision semantics, dedicated transaction-level lock, fresh post-lock history, failure/recovery behavior, prospective ADR lifecycle, TASK-004 graph/status, and implementation absence. They agree that startup control replaces only the configured/borrowed connection assumption and the too-late encoding/search-path claim. They expose their distinct trust roots and do not treat matching recommendations as synthesis.

The analyst must normalize: exact selected startup SQL/field names; whether forward preflight follows connection acquisition or explicit `BEGIN`; exact accepted Sequelize internal pre-preflight SQL boundary; trusted target descriptor fields; direct pure-JavaScript driver/version language; ambient rejection versus structural exclusion; startup diagnostic labels/precedence; complete interface/ownership replacement; exact 15-gate and 16-invariant disposition; impact on 91/84/77 without repair credit; and whole-record ADR-0012/ADR-0014 carry-forward.


### Fourth-correction renewed decision analysis: `DRAFT READY`


The read-only `decision_analyst` verified the complete integrated research packet at SHA-256 `5ED676289C700E2FAABC2E5996B7D04419F1A137929A05B41A0A014062D0640E`, historical non-authorizing ADR-0015 at SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69`, and repository HEAD `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`. The analyst reconciled the three reports against the complete Decision Review Contract, repository authorities, and pinned PostgreSQL, node-postgres, and Sequelize sources; made no write or lifecycle change; and returned exactly `DRAFT READY`.

The startup-control alternatives normalize to 91/100 for `STARTUP-GUARDED-UTF8-ONLY`, 73/100 for `PROVISIONED-UTF8-ZERO-CONVERSION`, and 79/100 for `STARTUP-GUARDED-MULTI-ENCODING`. This separate comparison does not modify the identity matrix: exact catalog bytes remain 91, restricted ASCII remains 84, and catalog OID pair remains 77. No shared startup repair earns score credit. The selected complete proposal remains `EXACT-CATALOG-BYTES` plus `STARTUP-GUARDED-UTF8-ONLY` at 91/100.

Provisioned zero conversion has the strongest isolated invariant but fails proportionality and present feasibility because the repository has no fresh database-specific pre-socket attestation, immutable provider-resource identity, freshness protocol, or socket channel binding. Multi-encoding can conditionally add LATIN1 only by trusting and version-locking catalog conversion metadata that cannot be authenticated retroactively after PostgreSQL caches the procedure; SQL_ASCII remains unsupported. No present requirement needs non-UTF8 operation. The owner-selected UTF8-only path therefore supplies the smallest complete trusted boundary.

#### Selected trusted target and connection ownership

Only a closed `TrustedMigrationTarget` descriptor is admissible. It carries positive provenance from trusted application/deployment migration configuration or the exact owned ADR-0011 allocator output; explicit nonempty host, port, database, schema, user, credential material, and a closed TLS policy; and exact primitive database/schema identifiers. It is not a generic driver configuration bag and cannot be self-authorized by a caller.

URI or connection strings and query parameters; caller `options`, `client_encoding`, `dialectOptions`, dialect modules, hooks, pools, streams, sockets, clients, Sequelize instances, custom low-level connections, native/libpq mode, replication, and borrowed/already-open sessions are rejected or structurally unrepresentable. Required fields are explicit and validated so node-postgres cannot fall back to ambient connection values. Nonempty ambient `PGOPTIONS` or `PGCLIENTENCODING` is rejected for deterministic diagnostics; every other libpq fallback path must remain unreachable through explicit configuration.

The migration factory alone constructs a private Sequelize 6 instance with the exact imported pure-JavaScript `pg` dialect module, native mode disabled, replication disabled, `pool.max=1`, and `pool.min=0`. It suppresses Sequelize's separate version-bootstrap connection, acquires exactly one physical migration session, never exposes or lends it, holds it through transaction termination, and always releases/destroys the session as appropriate and closes the private Sequelize instance. Pool size alone is insufficient: TASK-004 must prove the exact locked-version suppression mechanism and that no second physical connection opens.

ADR-0011 continues to own database/schema allocation, primary-versus-cleanup failure preservation, and namespace removal. It supplies the trusted target components rather than a borrowed ORM or connection. The migration factory owns only every Sequelize/session/transaction resource it creates. All root, CLI, integration, validation, and delivery entry points use the same target descriptor and factory.

The successor interfaces are conceptually:

```text
createMigrator({
  target: TrustedMigrationTarget,
  buildRoot,
  manifestPath,
  logger,
  lockTimeout
})
```

and:

```text
prepareMigratedNamespace({ target, buildRoot })
```

They replace the planned arbitrary configured-Sequelize/ownership-flag and `prepareMigratedNamespace({ sequelize, schema, buildRoot })` boundaries. Exact TypeScript names and shapes remain TASK-004 implementation detail, but downstream code may not reintroduce a caller-owned or borrowed connection.

#### Startup invariant and allowed pre-preflight boundary

Before opening the socket, the factory owns exact startup `options=-c search_path=pg_catalog`. At the audited pure-JavaScript `pg@8.22.0` boundary, the serializer appends direct `client_encoding=UTF8` after forwarded startup fields, so the later equal-priority value wins any conflict inside `options`; client startup priority outranks database/role defaults. No caller fragment participates in either value.

The selected invariant is **no untrusted conversion**, not zero conversion. A correctly routed UTF8 server requires no conversion procedure. A misdirected convertible server may select and execute only a trusted built-in found through exact `pg_catalog` during startup or guarded stock SQL, after which forward preflight rejects the non-UTF8 server before namespace binding, lock, history, savepoint, or DDL. SQL_ASCII or an unsupported/unconvertible target fails during startup or preflight. A writable user or temporary schema conversion must never be visible or selected. A compromised cluster/catalog, proxy that rewrites startup fields, or dependency tampering remains outside this client-only guarantee and is an explicit trust/reversal boundary.

After protected startup and before the repository preflight, stock Sequelize 6.37.7 may execute only its own connection initialization on that same guarded physical session: standard-string, message, timezone, type/OID, and version-related setup. No caller hook, authentication probe, model query, application namespace bind, migration-history access, advisory lock, savepoint, or DDL is permitted. The separate version-bootstrap connection is not part of this allowance and must be suppressed.

The complete selected order is: local artifact/target/domain/configuration validation; factory construction and guarded connection acquisition; allowed stock guarded initialization; explicit `BEGIN` at `READ COMMITTED`; the exact forward preflight below; unchanged pre-lock five-field namespace bind; v2 key derivation; bounded transaction advisory-lock polling; identical post-lock bind plus retained-observation equality; fresh history read; migration/status/rollback command; and transaction end before resource close. Every unaffected ADR-0012 transaction, lock, history, timeout, interruption, loss, ambiguity, non-retry, and recovery rule remains.

#### Exact five-field forward preflight

Immediately after `BEGIN` and before namespace binding, lock, history, savepoint, or DDL, execute this one unnamed raw-array statement:

```sql
SELECT
  CAST(
    pg_catalog.current_setting(
      CAST('client_encoding' AS pg_catalog.text)
    )
    AS pg_catalog.text
  ) AS startup_client_encoding,
  CAST(
    pg_catalog.current_setting(
      CAST('search_path' AS pg_catalog.text)
    )
    AS pg_catalog.text
  ) AS startup_search_path,
  CAST(
    pg_catalog.pg_encoding_to_char(d.encoding)
    AS pg_catalog.text
  ) AS server_encoding,
  d.datistemplate AS database_is_template,
  d.datallowconn AS database_allows_connections
FROM pg_catalog.pg_database AS d
WHERE d.datname
  OPERATOR(pg_catalog.=)
  pg_catalog.current_database();
```

Require command `SELECT`; exactly five ordered fields named `startup_client_encoding`, `startup_search_path`, `server_encoding`, `database_is_template`, and `database_allows_connections`; respective PostgreSQL type OIDs `25,25,25,16,16`; exactly one array row of length five; no extra data; primitive string, string, string, boolean, boolean values; and exact values `UTF8`, `pg_catalog`, `UTF8`, `false`, `true`. Validate container, command, metadata, cardinality, row shape, and primitive types before semantic values. For a structurally valid result, startup-state mismatch precedes database-class invalid, which precedes unsupported server encoding.

The current identical five-field pre-lock and post-lock catalog-bind statement remains byte-for-byte the selected SQL, including fully qualified catalog relations/functions/types/casts/operators. Each result remains ordered OIDs `17,17,25,16,16` with two raw `Buffer` values, one primitive string, and two primitive booleans. Existing configured/returned/retained byte equality, database/schema name/domain/class checks, exact v2 derivation, and post-lock mapping to `MIGRATION_NAMESPACE_CHANGED` remain unchanged. The preflight is forward validation and must never be described as retroactive startup proof.

#### Diagnostics, fixtures, and downstream proof

Add stable results `MIGRATION_STARTUP_CONFIG_INVALID` for an invalid closed descriptor or prohibited override/driver/session route; `MIGRATION_STARTUP_FAILED` for connection, startup, acquisition, or allowed internal initialization failure; and `MIGRATION_STARTUP_STATE_INVALID` for a structurally valid preflight whose effective client encoding or search path differs from the exact contract. Retain `MIGRATION_DATABASE_PREFLIGHT_FAILED`, `MIGRATION_DATABASE_CLASS_INVALID`, `MIGRATION_DATABASE_ENCODING_UNSUPPORTED`, and every existing namespace, lock, timeout, interruption, loss, ambiguity, cleanup, and success category.

Overall result precedence is: unknown outcome after commit initiation; otherwise recognized interruption or connection loss; local artifact/namespace/startup-configuration rejection; startup/connection failure; preflight structural failure; startup-state mismatch; database-class invalid; unsupported server encoding; pre-lock namespace bind failure; after locking any target-observation failure; lock query/result/timeout; and secondary cleanup that preserves the primary result. Diagnostics redact credentials, URLs, raw options, complete target configuration, raw identifier bytes, digests, and SQL.

TASK-004 must prove the exact startup packet fields and ordering; hostile role/database defaults; environment, URI, caller-option, native, custom-connection, pool, Sequelize, and borrowed-session exclusion; nonempty `PGOPTIONS`/`PGCLIENTENCODING` handling; version-bootstrap suppression and exactly one physical session; allowed guarded stock SQL; UTF8 no-conversion success; LATIN1/other misroute using at most trusted catalog conversion before no-mutation rejection; hostile user-schema conversion nonselection; SQL_ASCII rejection; simple Query, Parse, text Bind, and binary `Buffer` Bind behavior; exact preflight and both bind containers/OIDs/types; every existing application-domain/database-class/identity/concurrency/failure/cleanup fixture; Windows/CI behavior; and all carried-forward artifact, history, rollback, ADR-0011, and ADR-0014 obligations. This is a future TDD/evidence contract, not present implementation evidence.

#### Complete gate, invariant, outline, and documentation disposition

All fifteen hard gates and LOCK-INV-01 through LOCK-INV-16 pass at renewed synthesis/contract level. Fresh IR-A must still falsify the exact integrated packet before any ADR edit. Runtime portions remain explicit TASK-004 proof rather than current evidence.

The corrected ADR must remain one self-contained whole-record Proposed successor. Its metadata and Context preserve ADR-0012 as accepted until exact later owner approval, ADR-0014's sole `characters.image_url text NOT NULL` and no-image-subsystem constraint, all historical correction hashes as non-authorizing chronology, DG-005/TASK-018/TASK-004 states, unchanged TASK-004 dependencies, adopted-optional OR-001 trace, fixture-only TypeScript 5.9.3 versus current repository TypeScript 6.0.3 distinction, and implementation absence. Decision drivers add pre-first-SQL startup protection, no-untrusted-conversion truthfulness, closed session eligibility, version-bootstrap suppression, and guarded stock-SQL boundaries.

Considered Options retain the lifecycle table and identity 91/84/77 matrix, replace the obsolete SQL-only encoding comparison with the distinct startup 91/73/79 comparison, and preserve strongest dissent. Decision carries every unaffected build/artifact/manifest/history/transaction/lock/diagnostic/recovery clause forward while applying only the trusted target/factory/startup/interface/preflight changes above. Consequences, risks, reversal triggers, validation, evaluation, and References must cover the proportional private-session cost, source/version coupling, trusted catalog/proxy boundary, suppressed bootstrap path, future locked proof, and pinned REL_18_4 startup/GUC/conversion/query sources, `pg@8.22.0` startup sources, and Sequelize 6.37.7 PostgreSQL/abstract connection managers.

Proposal-stage synchronization after fresh IR-A and primary ADR revision is limited to ADR-0015, root current-status navigation, ADR index, DG-005/TASK-018/TASK-004 and OR-001 routing, system diagram, plan index, TASK-004 waiting plan, specification navigation, this ExecPlan, and append-only execution chronology. `SPEC-010`, `SPEC-016`, `HS-002`, `HS-011`, and `HS-018` remain acceptance-only and must not change while ADR-0015 is `Proposed`.

Strongest dissent: choose provisioned zero conversion only if the owner later requires zero conversion and supplies fresh authenticated database-specific pre-socket attestation bound to the socket endpoint. Reopen if node-postgres changes startup-field order/direct UTF8 behavior; Sequelize cannot suppress the extra bootstrap connection or route all connections through the guard; stock initialization changes startup state or accesses application data; native/libpq becomes mandatory; a real non-UTF8 requirement emerges; a trusted attestation control plane becomes available; or locked runtime tests contradict raw-result, protocol, `Buffer`, `bigint`, or cleanup assumptions. Analyst confidence is 0.96 in PostgreSQL semantics, 0.94 in contract completeness, 0.78 in future locked Sequelize/node-postgres feasibility, and 0.92 in synthesis readiness.


### Fresh fourth-correction IR-A: `REVISE` and supported source-trace correction


A fresh read-only `independent_reviewer` verified frozen ExecPlan SHA-256 `C0E521EED50F4920B6051FE5B5E3B2049AA4C44A74507C2AD1C24EEE45A804D4`, historical non-authorizing ADR-0015 SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69`, and HEAD `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`. The reviewer made no write and returned `REVISE` with no Blocker or Minor and one Major artifact-local evidence finding.

Every selected mechanic, option comparison, score, SQL/result contract, interface, diagnostic, fixture, lifecycle boundary, proposal-versus-acceptance disposition, authority state, dependency, and no-implementation check passed. Hard gates 1 through 10 and 12 through 15 passed; gate 11 and LOCK-INV-01/09/11/16 remained open only because the common source set inherited by Reports A/B/C cited Sequelize's PostgreSQL connection manager and pool contract but not the abstract connection manager that implements the already described direct version-bootstrap `_connect` before pool acquisition.

The one supported IR-A correction is applied above: the exact pinned Sequelize 6.37.7 abstract connection-manager source now participates in the common report evidence and is mapped specifically to direct version detection, subsequent pool acquisition, and the downstream obligation to suppress the extra physical connection. This is an artifact-local source-trace repair only. It changes no selected option, score, factory/session mechanic, suppression obligation, SQL, result type, interface, diagnostic, fixture, authority, lifecycle, dependency, specification, or implementation boundary. A distinct complete fresh IR-A re-review of the entire corrected packet is mandatory before ADR-0015 may be edited.

### Distinct fourth-correction IR-A re-review: `PASS`

A different fresh read-only `independent_reviewer` verified corrected frozen ExecPlan SHA-256 `FD27155965B4FAEA3001C9277CD81EAB025CE2FA124AED9D0E0B61C90F3E6AB8`, historical non-authorizing ADR-0015 SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69`, and HEAD `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`. It reviewed the complete ten-path state and exact diff, made no write, confirmed the prior sole Major closed, and returned `PASS` with no Blocker, Major, or Minor.

All fifteen hard gates and LOCK-INV-01 through LOCK-INV-16 passed at contract/checkpoint level. The reviewer independently confirmed the 91/73/79 startup comparison and unchanged 91/84/77 identity comparison; closed target/private one-session ownership; version-bootstrap suppression; exact startup and five-field forward preflight; unchanged five-field binds and v2 identity; diagnostic, fixture, whole-record, authority, dependency, protected-specification, and no-implementation boundaries; both validators; strict hygiene; and two-runtime vector reproduction. This authorizes only primary revision of existing Proposed ADR-0015 and proposal-stage synchronization. Integrated validation and one different complete fresh IR-B remain mandatory before owner presentation.


### Fifth-correction common pinned fallback inventory


All three fifth-correction reports used the same frozen contract, historical non-authorizing ADR, repository authorities, common rubric, and pinned source boundary. At `pg@8.22.0`, a truthy explicit value precedes a direct environment fallback; SSL mode and connection timeout have separate environment paths. The complete relevant source-derived inventory is:

| Environment input | Pinned pure-JavaScript effect | Common disposition question |
|---|---|---|
| `PGUSER`, `PGDATABASE`, `PGHOST`, `PGPORT` | Authentication/database or socket destination | Exact nonempty trusted target fields can preclude fallback only through the verified Sequelize forwarding path. `USER`/`USERNAME` defaults are likewise unreachable only when user is exact and nonempty. |
| `PGPASSWORD` | Authentication secret | A null/omitted result can reach `pgpass`; the selected contract must bypass password-file discovery with a truthy factory-owned password provider and prohibit caller credential callbacks. |
| `PGOPTIONS` | Startup `options` | Exact nonempty factory `-c search_path=pg_catalog` precludes fallback; explicit rejection may remain for deterministic diagnostics. |
| `PGSSLMODE` | TLS enablement/verification behavior | An exact closed `ssl` value, including exact false, precludes fallback. |
| `PGSSLNEGOTIATION` | Traditional SSLRequest versus direct TLS | Sequelize 6.37.7 does not forward it, so an in-process stock-client option must reject nonempty ambient input. |
| `PGCLIENT_ENCODING` | `client_encoding` fallback | This underscore spelling is the actual pinned read. Exact factory `UTF8` precludes it, and the serializer independently appends final direct UTF8. |
| `PGCLIENTENCODING` | No read in pinned pure-JavaScript `pg@8.22.0` | It cannot count as current closure evidence; retain it as an upgrade-drift/rejection fixture. |
| `PGREPLICATION` | Adds a PostgreSQL startup `replication` field and can change session mode | Sequelize 6.37.7 does not forward the corresponding low-level field, so the stock-client option must reject nonempty ambient input. Sequelize's top-level replication setting controls pools only. |
| `PGAPPNAME` | Startup `application_name` | Sequelize can forward an exact nonempty factory-owned application name; otherwise the ambient value remains live. |
| `PGCONNECT_TIMEOUT` | Connection-parameter timeout when `connectionTimeoutMillis` is absent | Fix an exact positive factory value and retain hostile-input/upgrade-drift proof. |
| `PGBINARY` | Populates `ConnectionParameters.binary` | Inert in the audited pure-JavaScript Client path because the Client uses the original config's binary field; freeze exact false and retain a drift fixture. |

If the resulting password is null, pinned Client code invokes `pgpass@1.0.5`, which can read `PGPASSFILE`, `APPDATA` or `HOME`, `PGPASS_NO_DEESCAPE`, and `PGPASSWORD` presence. A truthy factory-owned password provider takes the Client's function branch and bypasses `pgpass` even when passwordless/certificate authentication intentionally returns undefined; rejecting broad operating-system home variables is unnecessary.

Sequelize 6.37.7 forwards base user/password/host/database/port and selected dialect options including application name, SSL, client encoding, binary, keepalive, statement/query/lock/idle-transaction timeouts, connection timeout, options, and stream. It does not forward the low-level node-postgres replication or SSL-negotiation fields. Its separate unknown-version bootstrap connection remains prohibited and must be suppressed independently of pool size.

Common primary sources are pinned `pg@8.22.0` `connection-parameters.js`, `defaults.js`, `client.js`, and `pg-protocol` `serializer.ts`; `pgpass@1.0.5` helper behavior; Sequelize 6.37.7 PostgreSQL and abstract connection managers; Node.js 24.18.0 process/child-process documentation and source for the subprocess candidate; and all PostgreSQL REL_18_4 sources already frozen for startup, GUC, conversion, namespace, and protocol behavior.


### Fifth-correction Report A: `PINNED-ENVIRONMENT-GUARD`


Assignment: preserve the selected private stock Sequelize/pure-JavaScript `pg` architecture and close the exact pinned ambient surface without a subprocess or custom dialect adapter. The read-only researcher verified the fifth-correction contract, historical ADR hash, and HEAD; made no write; and returned `READY FOR RE-ANALYSIS`.

The candidate requires exact nonempty user, database, host and valid port; a truthy factory-owned password provider; exact closed TLS; exact client encoding `UTF8`; exact options `-c search_path=pg_catalog`; an exact nonempty factory-owned application name; an exact positive `connectionTimeoutMillis`; native mode and Sequelize replication disabled; private pool maximum one/minimum zero; no caller connection configuration; and the existing version-bootstrap suppression. It rejects nonempty `PGREPLICATION` and `PGSSLNEGOTIATION` before Sequelize construction and rechecks at the latest stock-factory boundary before acquisition. `PGAPPNAME` is closed by the exact application name and may also reject for diagnostic clarity. It corrects every active `PGCLIENTENCODING` claim to `PGCLIENT_ENCODING` and treats the former spelling only as an upgrade-safe fixture.

This option never clears or mutates `process.env`. It explicitly trusts that repository/dependency code does not maliciously mutate relevant environment values during one migration-factory lifecycle. The initial and pre-acquisition checks detect ordinary drift before a socket; an adversarial same-process mutation in the remaining check-to-constructor interval is outside the proportional portfolio threat model and is a reversal trigger. If that threat becomes in scope, subprocess isolation is preferred.

Required TASK-004 proof includes each inventory variable alone and in combinations; empty/nonempty and truthy/falsy precedence; destination capture; password-provider bypass of `PGPASSWORD` and every pgpass path; exact options/TLS/client-encoding/application-name/connection-timeout behavior; separate and combined `PGREPLICATION`/`PGSSLNEGOTIATION` rejection with zero real Client construction, socket, TLS, or SQL; exact startup field order with no replication field; hostile mutation between the two checks; Windows case behavior; inert pinned `PGBINARY`; and a locked-source contract test that fails on any new environment read or forwarding change. Failures remain `MIGRATION_STARTUP_CONFIG_INVALID` with names/reasons but no values or target secrets.

| Criterion | Score |
|---|---:|
| Requirements traceability | 20/20 |
| Architectural fit and consistency | 19/20 |
| Options and trade-offs | 14/15 |
| Feasibility and proportionality | 12/15 |
| Quality attributes | 9/10 |
| Verifiability | 9/10 |
| Evolution and reversibility | 8/10 |
| **Total** | **91/100 — Accept after required review** |

Benefits are the smallest change surface, unchanged stock ORM/driver behavior, no new dependency/process/protocol, stable diagnostics, and direct fit for the personal portfolio. Costs are locked-source inventory maintenance, new exact factory values and fixtures, and the trusted-process environment-immutability premise. Confidence is 0.94 in source inventory and 0.88 in proportional suitability. Strongest dissent favors the subprocess if same-process mutation becomes adversarial or repeated new fallbacks make a finite guard disproportionate.


### Fifth-correction Report B: `SANITIZED-MIGRATION-SUBPROCESS`


Assignment: isolate migration connection creation in one emitted Node child per command with a minimal allowlisted environment. The read-only researcher verified the common contract and pinned Node/driver/ORM sources; made no write; and returned `READY FOR RE-ANALYSIS`.

The candidate forks an absolute emitted child entry with exact `process.execPath`, empty `execArgv`, no shell or executable search, `detached=false`, `windowsHide=true`, advanced IPC serialization, ignored standard streams, and an explicit null-prototype environment. Supported POSIX CI emits no application environment; Windows permits only one validated canonical `SystemRoot`. It owns a `NODE_V8_COVERAGE` tombstone because Node may otherwise propagate coverage and rejects parent permission-model execution unless a later exact child permission policy is decided. Node-added IPC variables are expected and child-audited. No `PG*`, TLS, path, locale, profile/home, temp, or `NODE_OPTIONS` value is inherited.

After the child reports ready, one private versioned IPC request transfers only the validated trusted target, operation, and artifact inputs. Credentials never enter environment, argv, files, stdout, stderr, or diagnostics, although IPC and JavaScript heap copies cannot be reliably zeroized and remain a disclosed residual risk. The child self-audits before factory construction, uses the unchanged private pure-JavaScript Sequelize boundary, suppresses the extra bootstrap connection, fixes exact startup values, acquires exactly one session, executes the complete command, closes it, and exits. No ORM/session/transaction crosses IPC; ADR-0011 still owns only namespace allocation/removal.

The lifecycle adds explicit ready, accepted/pre-socket, connected, transaction-active, commit-ready, commit-authorized, and terminal phases. A two-step commit handshake classifies child loss before authorization as interruption/loss and after authorization as `MIGRATION_COMMIT_AMBIGUOUS`; it never retries automatically. Parent cancellation is cooperative first, forced only after a bounded grace period; parent/IPC loss before commit authorization requires rollback/close/exit. TASK-004 must prove Windows/POSIX environments, hostile parent mutation, zero socket/SQL on invalid input, exact startup/TLS/no-replication behavior, one session, suppressed bootstrap, cancellation/parent-death/commit-loss recovery, emitted ESM parity, and locked Node/ORM/driver source behavior.

| Criterion | Score |
|---|---:|
| Requirements traceability | 20/20 |
| Architectural fit and consistency | 17/20 |
| Options and trade-offs | 12/15 |
| Feasibility and proportionality | 10/15 |
| Quality attributes | 8/10 |
| Verifiability | 9/10 |
| Evolution and reversibility | 7/10 |
| **Total** | **83/100 — Accept with explicit follow-ups** |

Benefits are race-resistant separation from parent ambient state and a general boundary for future fallbacks. Costs are new process/IPC/commit-handshake machinery, startup latency, credential copies, Windows abrupt-termination behavior, permission/coverage coupling, and larger operational/debugging surface. Confidence is 0.88. Strongest dissent is that this is disproportionate when a finite pinned guard closes the current threat under the repository's trusted-process premise.


### Fifth-correction Report C: `LOW-LEVEL-PG-CONNECTION-ADAPTER`


Assignment: evaluate direct control of every low-level `pg` startup/session field while retaining the build-first Umzug/Sequelize boundary. The read-only researcher reviewed the contract and pinned sources, made no write, and returned `READY FOR RE-ANALYSIS`.

A directly pre-connected `pg.Client` is not selectable because Sequelize 6.37.7 exposes no supported adoption API; injecting it through transaction/connection-manager internals would weaken ownership, QueryInterface, Umzug, and upgrade guarantees. The viable shape is instead a repository-owned closure-bound `dialectModule` that exports the pinned real module/types and replaces only Client with a narrow wrapper. Sequelize still constructs and pools the client; synchronously before the real Client constructor, the wrapper verifies Sequelize-created values against captured trusted values and rebuilds an exact low-level config. It does not override query, events, parsing, or results.

The wrapper can set exact low-level `replication="false"` and `sslnegotiation`, exact application name, client encoding, options, TLS, destination, credential provider, binary policy, connection timeout, remaining timeouts/keepalive/channel-binding dispositions, and reject every ambient/caller escape immediately before the real constructor. It performs no `process.env` mutation. Same-isolate JavaScript cannot interleave between its synchronous final check and real constructor, but native preload/dependency tampering remains outside the trust boundary. TASK-004 must prove the wrapper/module shape, stock raw arrays/OIDs/Buffers, startup duplicates/order, TLS/replication, every environment variable and falsy edge, zero real Client/socket/SQL on rejection, one session, suppressed bootstrap, existing SQL/identity/concurrency behavior, Windows/CI, and source drift.

| Criterion | Score |
|---|---:|
| Requirements traceability | 20/20 |
| Architectural fit and consistency | 14/20 |
| Options and trade-offs | 14/15 |
| Feasibility and proportionality | 8/15 |
| Quality attributes | 8/10 |
| Verifiability | 7/10 |
| Evolution and reversibility | 5/10 |
| **Total** | **76/100 — Accept with explicit follow-ups** |

Benefits are exact construction at the last synchronous boundary and stronger in-process closure. Costs are a repository-owned driver-shaped module, Sequelize module-shape coupling, larger TLS/startup proof, and custom maintenance. Confidence is 0.94 in pinned driver behavior, 0.78 in the contract, and 0.70 in future locked Sequelize integration. Strongest dissent favors the stock pinned guard as equally sufficient for the present trusted-process threat model with materially less code; subprocess isolation is stronger if the threat model expands.


### Fifth-correction research readiness


All three reports use the same 100-point rubric, no hard-gate repair credit, exact identity/startup semantics, source inventory, authority matrix, and downstream proof boundary. They normalize to `PINNED-ENVIRONMENT-GUARD` 91, `SANITIZED-MIGRATION-SUBPROCESS` 83, and `LOW-LEVEL-PG-CONNECTION-ADAPTER` 76. No report returned a research or owner-direction blocker. The reports preserve identity 91/84/77 and startup-control 91/73/79 as distinct earlier comparisons; v2 bytes, SQL, result shapes, transactions, locking, lifecycle, and accepted authority remain unchanged.

The analyst was required to determine whether the trusted-process premise is explicit and proportionate; freeze exact application name, timeout, TLS/credential-provider and rejection semantics; normalize which inert or overridden variables reject versus remain proof-only; decide whether one or two in-process checks are sufficient; reconcile password-file behavior; map all sixteen hard gates and seventeen invariants; and return exactly `DRAFT READY`, `RETURN FOR RESEARCH`, or `OWNER DIRECTION` before any ADR edit. The complete synthesis below returned exactly `DRAFT READY`.


### Fifth-correction renewed decision analysis: `DRAFT READY`


The read-only `decision_analyst` verified the integrated fifth-correction packet at ExecPlan SHA-256 `75F75D5BA5453B553FDEFF04A7E4F2C308DD66F99CE1A00DA2C595E65C3AECCB`, historical non-authorizing ADR-0015 SHA-256 `6AD00C9533849CFAA5C793B23B3DEF5C633AAB2D4FE3D577CCA5C2B0D9DF90B6`, and repository HEAD `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`. It reconciled the three comparable reports against the complete Decision Review Contract and pinned sources, made no repository write or lifecycle change, and returned exactly `DRAFT READY`.

The normalized comparison is:

| Rank | Candidate | Requirements | Architecture | Options | Feasibility | Quality | Verifiability | Evolution | Total |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | `PINNED-ENVIRONMENT-GUARD` | 20 | 19 | 14 | 12 | 9 | 9 | 8 | **91** |
| 2 | `SANITIZED-MIGRATION-SUBPROCESS` | 20 | 17 | 12 | 10 | 8 | 9 | 7 | **83** |
| 3 | `LOW-LEVEL-PG-CONNECTION-ADAPTER` | 20 | 14 | 14 | 8 | 8 | 7 | 5 | **76** |

No option receives score credit for repairing hard gate 16. This comparison is separate from the unchanged exact-identity 91/84/77 and fourth-correction startup-control 91/73/79 matrices. The analyst selects `PINNED-ENVIRONMENT-GUARD` as the smallest complete repair for the present personal-portfolio threat model. The subprocess offers stronger process isolation but adds IPC, credential-copy, cancellation, Windows, and ambiguous-commit machinery. The custom adapter adds driver-shaped maintenance and unsupported-integration risk without a present need.

The selected contract admits only one immutable, positively authorized `TrustedMigrationTarget` with exact nonempty host, valid port, database, schema, user, validated nonempty credential, and one closed TLS policy. URIs and generic driver/configuration bags reject. TLS is exactly disabled with `ssl=false`, or verified TLS with a factory-owned object containing `rejectUnauthorized=true`, a nonempty trusted CA, and the exact trusted DNS `servername`. For verified TLS, the host must be either an IP literal for which Node.js `net.isIP(host) !== 0`, with the explicit trusted DNS `servername` preserved, or the same validated DNS name as `servername` under exact primitive-string equality. DNS/name mismatch, a socket path, bracketed IP spelling, or any other unsupported host/name relation rejects locally with `MIGRATION_STARTUP_CONFIG_INVALID` before Sequelize construction. Caller TLS fragments, permissive verification, direct-TLS negotiation, client-certificate expansion, streams, sockets, connection objects, pools, hooks, dialect modules, native/libpq, Sequelize replication, borrowed sessions, and already-open connections are structurally unavailable.

The factory constructs one private Sequelize 6.37.7 instance with exact pure-JavaScript `pg@8.22.0`, pool `{ max: 1, min: 0 }`, a nonzero pinned `databaseVersion` disposition that suppresses the separate version-bootstrap connection, and exactly one owned physical session through transaction termination, release or destruction, and Sequelize close. Factory-owned connection values are exactly:

- `options = "-c search_path=pg_catalog"`;
- `client_encoding = "UTF8"`;
- `application_name = "rick-and-morty-explorer:migrations"`;
- `connectionTimeoutMillis = 10_000`;
- `binary = false`; and
- a truthy factory-owned password-provider function that closes over the already validated nonempty credential, performs no environment, file, or network read, and never returns null or undefined.

That provider makes ambient `PGPASSWORD` and the `pgpass` branch -- including `PGPASSFILE`, `PGPASS_NO_DEESCAPE`, `APPDATA`, and `HOME` -- unreachable. Exact factory values demonstrably preclude `PGUSER`, `PGDATABASE`, `PGHOST`, `PGPORT`, `PGPASSWORD`, `PGSSLMODE`, and `PGCONNECT_TIMEOUT`. The guard rejects any nonempty `PGREPLICATION`, `PGSSLNEGOTIATION`, `PGOPTIONS`, `PGCLIENT_ENCODING`, `PGCLIENTENCODING`, `PGAPPNAME`, or `PGBINARY`. `PGCLIENT_ENCODING` is the actual pinned pure-JavaScript read; `PGCLIENTENCODING` is not read by `pg@8.22.0` but remains a drift-safe rejection and fixture.

The guard checks prohibited variables once before Sequelize construction and again synchronously at the latest factory-controlled point before acquisition. It never mutates `process.env`. Windows matching is case-insensitive; POSIX matching follows exact environment-key semantics. The explicit trust premise is that repository and dependency code in the same process does not adversarially mutate relevant environment state after the final check. The two checks cover ordinary drift; hostile same-process check-to-constructor mutation is outside the current threat model and triggers reconsideration of the sanitized subprocess.

After guarded acquisition, stock Sequelize may issue only its same-session connection initialization, type, timezone, and version work. The factory then begins explicit `READ COMMITTED` and executes exactly this unnamed raw-array preflight:

```sql
SELECT
  CAST(pg_catalog.current_setting(CAST('client_encoding' AS pg_catalog.text)) AS pg_catalog.text) AS startup_client_encoding,
  CAST(pg_catalog.current_setting(CAST('search_path' AS pg_catalog.text)) AS pg_catalog.text) AS startup_search_path,
  CAST(pg_catalog.pg_encoding_to_char(d.encoding) AS pg_catalog.text) AS server_encoding,
  d.datistemplate AS database_is_template,
  d.datallowconn AS database_allows_connections
FROM pg_catalog.pg_database AS d
WHERE d.datname OPERATOR(pg_catalog.=) pg_catalog.current_database();
```

The result must have ordered OIDs `25,25,25,16,16`, exactly one five-value row, primitive values, and exact values `UTF8`, `pg_catalog`, `UTF8`, `false`, `true`. Both existing fully qualified five-field pre/post catalog binds remain byte-for-byte identical; database and schema bind parameters remain raw buffers; ordered OIDs remain `17,17,25,16,16`; the post-lock observation must equal the retained pre-lock record; and the existing v2 key must not switch after lock acquisition.

The public boundary remains:

```text
createMigrator({ target, buildRoot, manifestPath, logger, lockTimeout })
prepareMigratedNamespace({ target, buildRoot })
```

ADR-0011 continues to own namespace allocation and removal. The migration factory owns every connection resource. Prohibited environment or invalid closed configuration maps to `MIGRATION_STARTUP_CONFIG_INVALID`, exit 1, before real Client construction, socket, TLS, or SQL. Diagnostics name variables and stable reasons but never values or secrets. Precedence remains: commit ambiguity; interruption or loss; local artifact, namespace, or startup configuration; startup failure; preflight structure; startup state; database class; encoding; pre-lock bind; post-lock target change; lock query, result, timeout, interruption, loss, or ambiguity; secondary cleanup.

TASK-004 must prove the locked dependency patches and forwarding/serializer inventory; every relevant variable alone and in combinations; empty/nonempty and truthy/falsy behavior; Windows and CI casing; destination and effective `tls.connect` option capture; DNS-host/equal-name and IP-host/distinct-name positives; DNS mismatch, socket-path, bracketed-IP, and unsupported-relation local negatives; exact packet/ParameterStatus/application name/timeout/session mode; no replication field; pgpass non-entry; zero Client/socket/TLS/SQL on rejection; mutation between checks; version-bootstrap suppression; exactly one owned physical session; raw arrays, field OIDs, buffers, bigint, both binds, v2 vectors, concurrency, ambiguity, cleanup, and all carried-forward migration outcomes. A source-lock fixture must fail when pinned `pg`, Sequelize, serializer, pgpass, environment-fallback, host-classification, `servername` overwrite, or TLS forwarding behavior changes.

At the historical fifth-correction synthesis checkpoint, all sixteen hard gates and LOCK-INV-01 through LOCK-INV-17 were reported as passing at synthesis/contract level. The later final IR-B invalidated that conclusion for hard gates 11 and 16 plus LOCK-INV-01 and LOCK-INV-17. The ADR must decide every selected value, exclusion, rejection boundary, trust premise, SQL/result contract, interface, ownership rule, diagnostic, source-drift trigger, and lifecycle boundary now; locked runtime evidence remains TASK-004 work only after acceptance and separate execution authorization.

Strongest dissent favors the subprocess because it eliminates the same-process mutation premise. Reopen if that adversarial threat enters scope; the extra Sequelize connection cannot be suppressed; a locked dependency adds or changes environment reads, forwarding, serialization, pgpass, or initialization behavior; native/direct-TLS/client-certificate support becomes mandatory; the password-provider premise fails; stock initialization exceeds its boundary; or locked runtime tests contradict the contract. Confidence is 0.96 in pinned PostgreSQL/driver semantics, 0.94 in contract completeness, 0.90 in proportional selection, and 0.78 in future locked integration.

The historical fifth-correction whole-record ADR revision outline required preserved metadata and Proposed lifecycle; complete Context and decision drivers; the unchanged identity and startup matrices plus the new 91/83/76 environment matrix; the exact selected connection guard, preflight, catalog binds, v2 serialization, lock, history, failure, recovery, interface, ownership, and validation contracts; ADR-0012 lifecycle carry-forward; ADR-0014's image constraint; consequences, risks, reversal triggers, evaluation, and pinned references. Proposal-stage synchronization was limited to ADR-0015, root current status, ADR index, implementation-plan routing, system diagram, plan index, TASK-004 waiting plan, specification navigation, this ExecPlan, and append-only chronology. SPEC-010/016 and HS-002/011/018 remain acceptance-only; accepted ADRs, lifecycle states, dependencies, and implementation remain unchanged. Its IR-A requirement was satisfied before the fifth ADR revision; the later direct owner authorization now controls only the named TLS/SNI and trace repair.

### Direct TLS/SNI correction evidence

The complete fifth final IR-B independently reproduced the decisive pinned transport behavior. In [`pg@8.22.0` `connection.js`](https://github.com/brianc/node-postgres/blob/pg%408.22.0/packages/pg/lib/connection.js#L87-L109), `upgradeToSSL` copies the supplied SSL object and then assigns `options.servername = host` whenever `net.isIP(host) === 0`. [`stream.js`](https://github.com/brianc/node-postgres/blob/pg%408.22.0/packages/pg/lib/stream.js#L24-L26) passes those effective options to `tls.connect`. A DNS `host` different from the configured trusted DNS `servername` therefore cannot satisfy the fifth proposal's exact forwarding claim.

The owner-authorized direct correction keeps the selected stock Sequelize/pure-JavaScript `pg` architecture and narrows verified-TLS admission. A verified target is valid only when `net.isIP(host) !== 0` and the factory supplies an explicit trusted DNS `servername`, or when `host` is a validated DNS name and `host === servername` as exact primitive strings. Every other verified-TLS relation, including a DNS mismatch, socket path, or bracketed IP spelling that fails `net.isIP`, returns `MIGRATION_STARTUP_CONFIG_INVALID` before Sequelize, Client, socket, TLS, or SQL. TASK-004 must capture the effective `tls.connect` options for DNS-equal and IP-host/distinct-name positives and prove the negative cases remain local. This repair changes no option score, identity byte, startup GUC, transaction, task/gate state, dependency, specification, or implementation boundary.


## Interfaces and Dependencies


This task establishes documentation contracts only: one `TASK-*` record in `docs/IMPLEMENTATION_PLAN.md`; this active ExecPlan and its index entry; preserved role-bounded research reports, decision analysis, and historical independent-review checkpoints; one collision-safe Proposed ADR; the owner-selected direct restricted-profile revision; reciprocal-but-prospective ADR lifecycle metadata; updated ADR index/architecture coverage and derived gate/navigation documents; deterministic vector descriptions; and append-only execution chronology. The restricted-profile edit and integrated checks are primary-thread evidence, not an independent checkpoint.

The future implementation boundary remains ADR-0012's private build-first programmatic Umzug 3 lifecycle, as modified only by an owner-accepted DG-005 successor. The current proposal fixes Node.js 24.18.0, npm 11.16.0, TypeScript 6.0.3, PostgreSQL 18.6/`postgres:18.6-alpine`, Sequelize 6.37.7, Umzug 3.8.3, `pg` 8.22.0, and `pg-hstore` 2.3.4, with transitive `pg-protocol` 1.15.0 and `pgpass` 1.0.5, but those packages remain researched interfaces rather than current dependencies or implementation evidence.


## Revision Note


2026-08-13: Created and started the active TASK-018 decision ExecPlan after a collision check, added its living Decision Review Contract and thirteen-invariant packet, preserved TASK-004 dependencies and status, left ADR numbering unallocated, and authorized only read-only research, analysis, independent review, primary Proposed-ADR drafting, and the exact owner-approval stopping point.

2026-08-13: Re-entered research and analysis after independent review found incomplete current-session temporary-TOAST rejection, replaced the public-helper predicate with PostgreSQL's complete two-prefix classifier, and retained every failed correction as non-authorizing historical evidence.

2026-08-13: Re-entered operator-resolution and symmetric OID research after renewed analysis found ambient `search_path` exposure, selected local exact-prefix rejection plus a fully qualified three-equality exact-byte query, normalized the fully qualified OID contract, made namespace/lock diagnostics exhaustive, and obtained complete renewed `DRAFT READY` synthesis at 91/84/77.

2026-08-13: Reconciled fresh IR-A `REVISE` by removing stale authority labels from defective `IR-A-OC-01`, naming only the final exact-byte re-entry query/result contract and renewed synthesis as controlling, and completing this revision chronology. The reconciliation changed no decision semantic or repository authority and requires another complete fresh checkpoint before ADR allocation.

2026-08-13: Recorded a distinct fresh IR-A `PASS` on frozen plan `38980760DD9733BE51104E98DE4C602A39CB252A0AEF55C5C27878582BEE03A6`, with no finding and all gates/invariants passed at contract level. This reconciliation authorizes only the fresh ADR collision check and primary Proposed drafting; all owner-controlled and implementation states remain unchanged.

2026-08-13: Confirmed ADR-0014 as the prior highest record, allocated ADR-0015 only after the required collision check, drafted it as the primary whole-record `Proposed` successor, and synchronized proposal-stage navigation without changing ADR-0012, DG-005, TASK-018, TASK-004, TASK-004 dependencies, or implementation state. At that proposal checkpoint, fresh final IR-B was still required.

2026-08-13: Reconciled fresh final IR-B cycle-1 `REVISE` by correcting the DG-005 sentence that denied the allocated proposal and adding TASK-004's required Proposed-ADR synchronization revision note. ADR-0015 remained byte-for-byte unchanged; at that correction checkpoint, complete final re-review was still mandatory.

2026-08-13: Recorded complete fresh correction-cycle IR-B `PASS` with no finding on exact ADR-0015 `E40390F66B6C0B21D3BF9C17739D3AD9D105ECE4D08A36BEF955AA777F53B741`, reconciled every hard gate and LOCK invariant, synchronized current review/status records, and passed both validators, `git diff --check`, strict hygiene, vectors, preservation, uniqueness, and negative-scope checks without changing the ADR, accepted authority, gate/task states, dependencies, or implementation. Exact project-owner approval is the only remaining decision action.

2026-08-13: Reopened the Decision Review Contract under explicit project-owner correction authorization after a post-PASS review found that persistence had been mistaken for application-schema authorization. Added hard gate 13 and LOCK-INV-14, reopened the affected gates/invariants, preserved the prior PASS/hash as non-authorizing history, and required symmetric system-schema-domain research, renewed analysis, fresh IR-A, primary revision, and fresh IR-B as the second and final bounded artifact correction cycle.

2026-08-13: Recorded symmetric application-domain re-entry and complete renewed `DRAFT READY` analysis. Retained exact catalog bytes at 91/100 without score credit for the hard-gate repair; closed provenance to two trusted sources; rejected exact lower-case `pg_` and exact `information_schema` before SQL and on both returned observations; retained the fully qualified two-buffer bind; assigned least privilege to downstream operational proof; and required fresh IR-A before any ADR edit.

2026-08-13: Reconciled renewed IR-A `REVISE` on frozen plan `83344882E1B6CF7214434A8E56CF708D55AF25FF75530DD9413CD61E8A8DF323` as one bounded documentation-only correction. Added the complete whole-record outline, ADR-0014 and OR-001 trace, fixture/version clarification, proposal-versus-acceptance specification boundary, current evidence for all fourteen invariants, stale-owner inventory, and validator-safe ASCII grammar prose. No decision semantic, score, authority, dependency, status, or implementation changed; a complete new fresh IR-A remains mandatory before ADR revision.

2026-08-13: Recorded distinct complete renewed IR-A `PASS` with no finding on frozen plan `347724CC2B12F32DC48918B1397CB2704196183B4ED8894D0B9AC6616A437F27`. All three prior findings, thirteen hard gates, fourteen invariants, validators, vectors, authority matrix, and negative implementation scope passed at checkpoint level. This authorizes only primary revision of Proposed ADR-0015 and proposal-stage synchronization; fresh complete IR-B remains mandatory.

2026-08-13: Primary-revised the whole-record Proposed ADR-0015 and synchronized only the proposal-stage current-status/navigation owners enumerated by the renewed contract. The revision adds closed application-target provenance, exact lower-case `pg_` and exact `information_schema` exclusion before SQL and on both returned observations, precise name-visible rebind limitations, least-privilege separation, ADR-0014 and adopted-optional OR-001 trace, fixture/version clarification, and corrected validation fixtures while preserving exact v2 identity, the 91/84/77 comparison, ADR-0012 carry-forward, all lifecycle/task/dependency states, and implementation absence. Integrated validation and complete fresh IR-B remain mandatory.

2026-08-13: Initial integrated validation passed on ADR-0015 SHA-256 `8FFFB0887C2572C8AF39D89B012F9D5422123B72798568C0011DDE25E521B306`, but a read-only pre-freeze semantic audit found that the artifact linked ADR-0014 without carrying forward its current TASK-004 sole-image-field/no-image-subsystem constraint. Preserved that hash and validation as non-authorizing history, added one linked Context paragraph with the missing constraint, and required a complete new integrated barrier before final IR-B. No migration-lock semantic, score, authority, status, dependency, specification authority, or implementation changed.

2026-08-13: Revalidated revised ADR-0015 SHA-256 `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3`. Both validators, `git diff --check`, strict hygiene, two-runtime vectors, structured dependency absence, ADR-0012 preservation, authority/state/dependency checks, and negative implementation scope passed. At that checkpoint a separate trace audit was still reading the latest integrated state, so final-review freezing remained pending.

2026-08-13: Reconciled the read-only trace audit's sole proposal-stage finding by updating current status owners from validation-pending to validation-passed/fresh-final-review-pending and appending the provisional-hash invalidation, ADR-0014 Context correction, and revised-hash validation chronology. The audit found no other semantic, status, dependency, OR-001, SPEC/HS, or implementation contradiction. A final integrated rerun and exact packet hash now precede fresh IR-B.

2026-08-13: Passed the complete post-trace integrated barrier and froze corrected ADR-0015 SHA-256 `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3` for complete fresh IR-B. Both validators, `git diff --check`, strict hygiene, Node/Python vectors, structured dependency absence, ADR-0012 and acceptance-only SPEC/HS preservation, authority/state/dependency checks, and negative implementation scope pass. The post-append ExecPlan identity is supplied externally so this living document does not make a self-referential hash claim.

2026-08-13: Recorded complete fresh final IR-B `PASS` with no finding on exact ADR-0015 `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3` and pre-reconciliation ExecPlan `96B3077158B3FC25BC3031752B8E5DE4F79BD730941D12A966F5EB2B96A7B69B`. All thirteen hard gates, fourteen invariants, whole-record carry-forward, 91/84/77 matrix, primary sources, validators, vectors, hygiene, authority states, dependency graph, specification boundary, and negative implementation scope passed. Primary reconciliation leaves the reviewed ADR byte-identical and stops for exact project-owner approval.

2026-08-13: Completed byte-preserving post-verdict reconciliation and the final validation barrier. Current status owners and chronology now record fresh final IR-B `PASS`; both validators, `git diff --check`, strict hygiene, Node/Python vectors, structured dependency absence, protected-authority preservation, exact states/dependencies, and negative implementation scope pass. ADR-0015 remains Proposed at reviewed SHA-256 `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3`; exact owner approval is the only remaining decision action.

2026-08-13: Reopened the exact proposal under explicit owner authorization for one named third bounded correction after source review found non-UTF8 default-conversion lookup through `activeSearchPath` and template-database admission. Added hard gate 14 and LOCK-INV-15, reopened affected invariant evidence, made the prior PASS/hash non-authorizing, synchronized current proposal-stage owners, and required three comparable reports, renewed analysis, fresh IR-A, primary revision, integrated validation, and one fresh IR-B. No accepted authority, gate/task status, TASK-004 dependency, v1 meaning, or implementation changed.

2026-08-13: Recorded three complete third-correction `technology_researcher` reports against frozen contract `DCAB480B064D999520BFAB3F0B6CFE93F7E08879A7B60D888D0E158E562683A9`. Exact bytes, restricted ASCII, and OID returned `READY FOR RE-ANALYSIS`, retained 91/84/77 without repair credit, preferred a separate UTF8-only preflight, and applied the same local/returned template-name plus both-bind class controls. Preserved their SQL_ASCII and candidate-local query/diagnostic differences for analyst normalization; ADR-0015 remains byte-identical and no authority, state, dependency, or implementation changed.

2026-08-13: Recorded complete third-correction `decision_analyst` synthesis on integrated research packet `CE2754C00979AD7422607BCF01B7844CA2D7B23A9F27D29CCF334766979D256F`. The analyst returned exactly `DRAFT READY`, retained 91/84/77 without repair credit, selected exact catalog bytes with an immediate exact-UTF8/non-template/connectable three-field preflight and identical five-field pre/post binds, normalized diagnostics and SQL_ASCII rejection, and passed all fourteen hard gates and fifteen invariants at synthesis level. Synchronized proposal-stage current-status owners; ADR-0015 remains byte-identical and fresh complete IR-A remains mandatory before any ADR edit.

2026-08-13: Passed the complete pre-IR-A contract barrier after durable synthesis and proposal-stage status synchronization. Both validators, `git diff --check`, exact documentation-only scope, protected accepted/specification authority, TASK-004 dependency/status preservation, and negative non-document diff checks pass; historical ADR-0015 remains byte-identical and non-authorizing. The exact post-append ExecPlan hash is supplied externally to fresh IR-A.

2026-08-13: Reconciled fresh third-correction IR-A `REVISE` on frozen plan `71C5E568DB5DD8AA935ECD8C5ACC59C91B7CCFDB1FCF1B701992A3D76C011FA0`. The review found no semantic defect, passed all fourteen hard gates and LOCK-INV-02 through LOCK-INV-15, and identified one Major missing artifact-local source trace. Explicitly incorporated pinned REL_18_4 conversion/search-path source and PostgreSQL 18 database/template/encoding documentation into Reports A/B/C and the mapped ADR References outline. No decision, score, SQL, authority, dependency, status, specification, or implementation changed; a complete fresh re-review remains mandatory before ADR revision.

2026-08-13: Recorded complete fresh IR-A re-review `PASS` with no finding on corrected frozen plan `0EF102A03E23DF90189C422801F447D165B99FBBFC370675CDAB5302FC214B83`. The reviewer confirmed the source-trace Major closed, all fourteen hard gates and fifteen invariants passed, validators/vectors/protected authority remained clean, and only primary revision of existing Proposed ADR-0015 plus proposal-stage synchronization is authorized. Integrated validation and one different complete fresh IR-B remain mandatory.

2026-08-13: Primary-revised existing Proposed ADR-0015 and synchronized every materially affected proposal-stage owner under complete fresh IR-A `PASS`. Added the exact conversion-free UTF8/class preflight, identical five-field binds, template/connectability checks, raw result metadata, diagnostic precedence, fixtures, consequences, risks, reversal triggers, validation obligations, and pinned PostgreSQL sources while preserving v2 bytes/vectors, 91/84/77, whole-record ADR-0012/ADR-0014 carry-forward, all lifecycle/task/dependency/specification states, and implementation absence. Integrated validation and one different fresh IR-B remain mandatory.

2026-08-13: Passed the complete third-correction integrated validation barrier and froze corrected Proposed ADR-0015 SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69`. Both validators, `git diff --check`, strict ten-file UTF8/no-BOM/final-LF hygiene, all eight v2 vectors in Node.js 24.18.0 and Python, exact documentation-only scope, protected accepted/specification authority, structured dependency absence, exact authority/task/dependency states, and negative runtime-v2 scope pass. One different complete fresh IR-B remains; no lifecycle, gate, task, dependency, specification, or implementation state changed.

2026-08-13: Recorded one different complete fresh final IR-B `PASS` with no Blocker, Major, or Minor on exact ADR-0015 SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69`, frozen ExecPlan SHA-256 `BD62B5E7D18305E80FD6ABFE5DDE418CA02F5DD4913BC92CE3C69A95413C1246`, and HEAD `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`. All fourteen hard gates, fifteen invariants, whole-record carry-forward, 91/84/77 comparison, PostgreSQL primary sources, validators, hygiene, Node/Python vectors, authority/task/dependency states, protected specification boundary, and negative implementation scope passed. Byte-preserving reconciliation leaves ADR-0015 Proposed and exact; project-owner approval is the sole remaining decision action.

2026-08-13: Completed byte-preserving post-verdict reconciliation and the final barrier without changing ADR-0015. Current status/navigation and append-only chronology now record the fresh final `PASS`; both validators, `git diff --check`, exact ten-path scope, strict hygiene, all eight vectors in Node/Python, structured dependency absence, protected accepted/specification authority, exact lifecycle/task/dependency states, and negative runtime-v2 scope pass. ADR-0015 remains Proposed at reviewed SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69`; exact owner approval is the only remaining decision action.

2026-08-13: Reopened the exact proposal under explicit owner authorization for one named fourth bounded correction after startup-path review proved that SQL preflight cannot control connection-startup conversion/search-path work or first-query decoding. Recorded the owner's practical startup-controlled value direction, added hard gate 15 and LOCK-INV-16, made the prior PASS/hash non-authorizing, and required three comparable startup-control reports, renewed analysis, fresh IR-A, primary revision, integrated validation, and one different fresh IR-B. No accepted authority, gate/task status, TASK-004 dependency, v1 meaning, or implementation changed.

2026-08-13: Passed the fourth-correction reopening barrier while keeping ADR-0015 byte-identical at historical SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69`. Synchronized all current status/navigation owners and append-only chronology, passed both validators and `git diff --check`, and froze the revised Decision Review Contract for three comparable startup-control researchers. All owner-controlled states, TASK-004 dependencies, v1 meaning, and implementation absence remain unchanged.

2026-08-13: Recorded three complete fourth-correction `technology_researcher` reports against frozen contract `379662AAE5BC8E383061A422146829839317B5530F308390348B23D00F2435A2`. Startup-guarded UTF8-only, provisioned UTF8 zero-conversion, and startup-guarded multi-encoding all returned `READY FOR RE-ANALYSIS`; their complete proposal/startup scores are 91, 73, and 79 respectively, while the identity ranking remains 91/84/77 without repair credit. The reports converge on a private pure-JavaScript startup-controlled session and expose the alternative trust/control-plane costs for analyst normalization. ADR-0015 remains byte-identical and no authority, state, dependency, v1 meaning, or implementation changed.

2026-08-13: Recorded complete fourth-correction `decision_analyst` synthesis on integrated research packet `5ED676289C700E2FAABC2E5996B7D04419F1A137929A05B41A0A014062D0640E`. The analyst returned exactly `DRAFT READY`, selected startup-guarded UTF8-only at 91 over provisioned zero-conversion 73 and multi-encoding 79, retained exact catalog bytes and identity 91/84/77 without repair credit, froze the closed target/private pure-JavaScript session/no-untrusted-conversion/five-field preflight contract, required suppression of Sequelize's extra version-bootstrap connection, and passed all fifteen hard gates and sixteen invariants at synthesis level. ADR-0015 remains byte-identical; fresh complete IR-A is mandatory before any ADR edit.

2026-08-13: Passed the complete fourth-correction pre-IR-A barrier after durable primary synthesis and current-status synchronization. Both validators, `git diff --check`, exact ten-path documentation-only scope, strict hygiene, protected ADR-0012/ADR-0014 and acceptance-only SPEC/HS preservation, exact authority/task/dependency state, and negative implementation/dependency diff checks pass. Historical ADR-0015 remains byte-identical and non-authorizing; the exact post-append ExecPlan hash is supplied externally so the living document does not make a self-referential hash claim.

2026-08-13: Reconciled fresh fourth-correction IR-A `REVISE` on frozen ExecPlan `C0E521EED50F4920B6051FE5B5E3B2049AA4C44A74507C2AD1C24EEE45A804D4` as the one allowed source-trace correction. Added the pinned Sequelize 6.37.7 abstract connection-manager source to Reports A/B/C and mapped it to the separate direct version-bootstrap connection, later pool acquisition, and required downstream suppression proof. No decision semantic, option, score, SQL, interface, authority, state, dependency, specification, or implementation changed; a distinct complete fresh IR-A re-review remains mandatory before ADR revision.

2026-08-13: Recorded distinct complete fresh fourth-correction IR-A re-review `PASS` with no finding on corrected frozen ExecPlan `FD27155965B4FAEA3001C9277CD81EAB025CE2FA124AED9D0E0B61C90F3E6AB8`. The reviewer confirmed the prior source-trace Major closed, all fifteen hard gates and sixteen invariants passed, validators/vectors/protected authority remained clean, and only primary revision of existing Proposed ADR-0015 plus proposal-stage synchronization is authorized. Integrated validation and one different complete fresh IR-B remain mandatory.

2026-08-13: Primary-revised existing Proposed ADR-0015 and every materially affected proposal-stage owner under complete fresh IR-A `PASS`. Added the closed trusted target, private pure-JavaScript maximum-one-session factory, exact startup guard, no-untrusted-conversion invariant, allowed stock initialization boundary, five-field forward preflight, replacement interfaces, diagnostics, fixtures, consequences, risks, reversal triggers, validation obligations, and pinned PostgreSQL/node-postgres/Sequelize sources while preserving v2 bytes/vectors, both score matrices, whole-record ADR-0012/ADR-0014 carry-forward, all lifecycle/task/dependency/specification states, and implementation absence. Integrated validation and one different fresh IR-B remain mandatory.

2026-08-13: Passed a read-only pre-freeze semantic/trace audit after correcting its last stale whole-record and TASK-004 ownership wording, then passed the complete fourth-correction integrated barrier and froze corrected Proposed ADR-0015 SHA-256 `6AD00C9533849CFAA5C793B23B3DEF5C633AAB2D4FE3D577CCA5C2B0D9DF90B6`. Both validators, `git diff --check`, strict ten-path hygiene, eight v2 vectors in Node.js 24.18.0 and Python 3.12.10, protected accepted/specification authority, exact lifecycle/task/dependency states, structured dependency absence, and negative runtime-v2 scope pass. One different complete fresh IR-B remains; the exact post-append ExecPlan hash is supplied externally to avoid self-reference.

2026-08-13: Reconciled one different complete fresh final IR-B `PASS` with no Blocker, Major, or Minor on frozen Proposed ADR-0015 SHA-256 `6AD00C9533849CFAA5C793B23B3DEF5C633AAB2D4FE3D577CCA5C2B0D9DF90B6`, frozen ExecPlan SHA-256 `DF1413C902939DC68E4E2251F5F596C474DA1B3138FE6E5196E5A4E04EBA9AFC`, and HEAD `aad14cc27e22078bb48ddc5e8373e5c1e195f2ba`. The reviewer passed all fifteen hard gates and LOCK-INV-01 through LOCK-INV-16, repeated validators/diff/hygiene/two-runtime vectors/protected-state/dependency/no-implementation checks, and confirmed every reviewed byte unchanged. The primary preserved the exact ADR hash and stops for project-owner approval; ADR-0015 remains Proposed, ADR-0012/ADR-0014 remain Accepted, DG-005/TASK-004 remain Pending, TASK-018 remains In progress, dependencies remain exact, and no implementation exists.

2026-08-13: Reopened the exact proposal under explicit owner authorization for one named fifth bounded correction after the latest pinned-driver review found live `PGREPLICATION`, `PGSSLNEGOTIATION`, and `PGAPPNAME` fallbacks and two stale review-state sentences. Added hard gate 16 and LOCK-INV-17, made the fourth PASS/hash historical and non-authorizing, synchronized current proposal-stage owners, and required comparable environment-closure research, renewed analysis, fresh IR-A, primary revision, integrated validation, and one fresh IR-B. No accepted authority, gate/task status, TASK-004 dependency, v1 meaning, or implementation changed.

2026-08-13: Recorded three complete fifth-correction read-only reports under one source-derived fallback inventory. The pinned environment guard, sanitized subprocess, and closure-bound low-level adapter returned `READY FOR RE-ANALYSIS` at 91/83/76 without repair credit; corrected the active spelling to `PGCLIENT_ENCODING`; exposed conditional pgpass fallback; and preserved exact identity/startup/SQL/lifecycle semantics, owner-controlled states, TASK-004 dependencies, v1 history, and implementation absence. Renewed decision analysis remains mandatory before IR-A or ADR revision.

2026-08-13: Recorded complete fifth-correction `decision_analyst` synthesis on integrated research packet `75F75D5BA5453B553FDEFF04A7E4F2C308DD66F99CE1A00DA2C595E65C3AECCB`. The analyst returned exactly `DRAFT READY`, selected the stock pinned environment guard at 91 over the sanitized subprocess at 83 and closure-bound adapter at 76 without repair credit, froze the complete closed target/TLS/credential/environment/two-check/trust/diagnostic/proof/reversal contract, preserved every prior identity/startup/SQL/lifecycle semantic, and passed all sixteen hard gates and seventeen invariants at synthesis level. ADR-0015 remains byte-identical and non-authorizing; complete fresh IR-A is mandatory before any ADR edit.

2026-08-13: Passed the complete fifth-correction pre-IR-A barrier after durable synthesis and current-status synchronization. Both validators, `git diff --check`, exact ten-path documentation-only scope, protected accepted ADR and acceptance-only specification authority, exact lifecycle/task/dependency states, and negative non-document diff checks pass. Historical ADR-0015 remains byte-identical and non-authorizing; the exact post-append ExecPlan hash is supplied externally to fresh IR-A.

2026-08-13: Reconciled fresh fifth-correction IR-A `REVISE` on frozen ExecPlan `A455ECBD8B67705369F359EE07FCC5558D432201D5664500CB73A44BCDDA0A1F` as the one supported artifact-local outline correction. The review found no decision semantic or research defect and passed all sixteen hard gates, but the live validation clause stopped at LOCK-INV-16 and all seventeen evidence cells still described prior-cycle results. Advanced the validation range to LOCK-INV-17 and refreshed every evidence cell with current fifth research, synthesis, initial checkpoint, and remaining re-review state. No option, score, factory value, environment rule, SQL, interface, authority, state, dependency, specification, or implementation changed; complete fresh IR-A re-review remains mandatory before ADR revision.

2026-08-13: Recorded complete fresh fifth-correction IR-A re-review `PASS` with no finding on corrected frozen ExecPlan `C7A2DABB1DC1BF99E8D202B7BCD11D9FAB16316D349713AE311C3201D2BCA838`. The reviewer confirmed the sole Major closed, all sixteen hard gates and seventeen invariants passed, validators/vectors/protected authority remained clean, and only primary revision of existing Proposed ADR-0015 plus proposal-stage synchronization is authorized. Integrated validation and one different complete fresh IR-B remain mandatory.

2026-08-13: Primary-revised existing Proposed ADR-0015 and every materially affected proposal-stage owner under complete fresh IR-A `PASS`. Added the 91/83/76 environment comparison; exact stock Sequelize/pure-JavaScript `pg` guard; closed target, TLS, credential, startup, application-name, timeout, and binary values; seven-variable two-check rejection; actual `PGCLIENT_ENCODING`; pgpass non-entry; trusted-process limit; diagnostics; fixtures; consequences; risks; reversal triggers; validation obligations; and pinned sources while preserving v2 bytes/vectors, both prior matrices, whole-record ADR-0012/ADR-0014 carry-forward, all lifecycle/task/dependency/specification states, v1 history, and implementation absence. Integrated validation and one different fresh IR-B remain mandatory.

2026-08-13: Passed the complete fifth-correction integrated barrier and froze Proposed ADR-0015 SHA-256 `215E31D6E78DBFA0879D916DDDAD75BA0E4E63943FC9B458DDDEE0DAA11C576C` for one different complete fresh final IR-B. Both validators, `git diff --check`, strict ten-path UTF-8/no-BOM/final-LF/no-trailing-whitespace hygiene, Node.js 24.18.0 and Python 3.12.10 eight-vector/framing/Unicode/signed-branch reproduction, exact documentation-only scope, protected ADR-0012/ADR-0014 and acceptance-only SPEC/HS preservation, structured dependency absence, exact authority/task/dependency/v1 checks, and negative runtime-v2 scope pass. Two initial Node native-argument invocations and one LF-only state assertion failed only because of local PowerShell quoting/newline assumptions; exact stdin and newline-neutral reruns passed without changing repository bytes. The post-append ExecPlan hash is supplied externally to avoid self-reference; no lifecycle, gate, task, dependency, specification, or implementation state changed.

2026-08-13: Reconciled complete fifth final IR-B `REVISE` on exact ADR SHA-256 `215E31D6E78DBFA0879D916DDDAD75BA0E4E63943FC9B458DDDEE0DAA11C576C` and ExecPlan SHA-256 `96F46445259495919F7BC4A1FDF788B8093B4D8E0FA606A440B8F06FEE8D78AE`. The review reproduced the pinned non-IP-host TLS `servername` overwrite, found contradictory current-stage routing, identified a late historical backfill and missing living discoveries, and verified stable start/end hashes, so concurrency did not cause the findings. The reviewed hash became historical and non-authorizing; no repository state changed during that review.

2026-08-13: Applied the project owner's explicit direct no-agent authorization for the named TLS/SNI and trace repairs. Narrowed verified TLS to a validated DNS host equal to the trusted DNS `servername` or an IP-literal host with the explicit trusted DNS name; rejected every unsupported relation locally; pinned `connection.js`, `stream.js`, and Node `net.isIP`; added effective-transport fixtures; synchronized current routing; and repaired the living discovery/invariant record without changing any accepted authority, lifecycle, gate, task, dependency, specification, v1, or implementation state.

2026-08-13: Passed the complete direct-correction integrated barrier and froze corrected Proposed ADR-0015 SHA-256 `9B90D8BF366E83E038F53AFA5D520B28786F9C768B765B8FA45EC34D4A4C1528`. Both validators, `git diff --check`, strict ten-path UTF-8/no-BOM/final-LF/no-trailing-whitespace hygiene, exact scope, protected ADR/SPEC preservation, Node.js 24.18.0 and Python 3.12.10 eight-vector/framing/Unicode/signed-branch reproduction, DNS/IP TLS relation fixtures, structured dependency absence, exact lifecycle/task/dependency checks, and negative runtime-v2 scope pass. The post-append ExecPlan identity is supplied externally to avoid self-reference. The required independent exact-artifact review remains; ADR-0015 stays Proposed, DG-005/TASK-004 stay Pending, TASK-018 stays In progress, and no implementation exists.

2026-08-14: Recorded the project owner's proportional `RESTRICTED-ASCII-DOMAIN` selection and direct no-worker documentation plan from historical ADR SHA-256 `9B90D8BF366E83E038F53AFA5D520B28786F9C768B765B8FA45EC34D4A4C1528`. Replaced conflicting current broad-profile clauses with the exact version matrix, lower-case ASCII application domain, loopback/TLS-disabled connection, blanket nonempty-`PG*` guard, opaque private-`WeakMap` target, eight-field startup identity, exact text binds, five vectors, destructive deadline behavior, and database-local collision statement; synchronized TASK-004 and all proposal-stage navigation owners. No accepted authority, gate/task state, dependency, protected specification, v1 meaning, or implementation changed.

2026-08-14: Passed the complete restricted-profile primary integrated barrier and froze exact Proposed ADR-0015 SHA-256 `B38F26ED48A99CFB0D4FA99A1973637B4C9ED66AC6122598FB093A13AA3B4EC9` for fresh independent exact-artifact review. All twenty current hard gates and LOCK-INV-01 through LOCK-INV-21 reconcile at primary contract level; both validators, `git diff --check`, strict ten-path UTF-8/no-BOM/LF/final-LF/no-trailing-whitespace hygiene, exact five-vector/framing/domain reproduction in Node.js 24.18.0 and Python 3.12.10, protected ADR-0012/ADR-0014 and SPEC/HS zero diff, exact documentation-only scope, structured dependency absence, lifecycle/task/dependency checks, and negative runtime-v2/migration scope pass. The post-append ExecPlan hash is supplied externally to avoid self-reference. ADR-0015 stays Proposed, ADR-0012/ADR-0014 stay Accepted, DG-005/TASK-004 stay Pending, TASK-018 stays In progress, and implementation remains absent.

2026-08-14: Reconciled the fresh independent exact-artifact review of restricted-profile ADR SHA-256 `B38F26ED48A99CFB0D4FA99A1973637B4C9ED66AC6122598FB093A13AA3B4EC9` as `REVISE`. `Client.getStartupConf()` did not substantiate the proposal's encoding claim by itself, PostgreSQL 18.4 was no longer the current security minor, and current `88/92/77` option scores were not derived from fully symmetric assumptions. The mechanically valid hash became historical and non-authorizing; no repository state changed during the review.

2026-08-14: Recorded the project owner's authorization to repair those findings directly and reconciled the exact pinned route: `pg@8.22.0` forwards factory-owned `options`, `pg-protocol@1.15.0` separately appends direct `client_encoding=UTF8`, and PostgreSQL applies startup GUCs after authentication but before `ReadyForQuery` and any Sequelize SQL. Updated the current contract to same-value UTF8 controls, PostgreSQL 18.6/`180006`/`databaseVersion='18.6.0'`, a latest-minor compatibility check, and a symmetric qualitative identity comparison. Integrated validation and fresh independent review remain mandatory; no accepted authority, gate/task state, dependency, protected specification, v1 meaning, or implementation changed.

2026-08-14: Passed the complete startup/version/comparison primary integrated barrier and froze exact corrected Proposed ADR-0015 SHA-256 `E649A26C334C16BC0B3800ECCB07C2F315F176EC0896C60D72E843765355B3E6` for fresh independent exact-artifact review. All twenty hard gates and LOCK-INV-01 through LOCK-INV-21 reconcile at primary contract level; both validators, `git diff --check`, strict ten-path UTF-8/no-BOM/LF/final-LF/no-trailing-whitespace hygiene, exact Node.js 24.18.0 and Python 3.12.10 five-vector/framing/domain reproduction, protected ADR-0012/ADR-0014 and SPEC/HS zero diff, exact documentation-only scope, structured dependency absence, lifecycle/task/dependency checks, and negative runtime-v2/migration scope pass. ADR-0015 stays Proposed, ADR-0012/ADR-0014 stay Accepted, DG-005/TASK-004 stay Pending, TASK-018 stays In progress, and implementation remains absent.

2026-08-14: Reconciled the fresh independent exact-artifact review of corrected ADR SHA-256 `E649A26C334C16BC0B3800ECCB07C2F315F176EC0896C60D72E843765355B3E6` as `REVISE`. The review found two approval-blocking Minor documentation defects: the Decision Review Contract retained one current `92/88/77` matrix statement after the ADR retired numerical candidate rankings, and one ADR validation bullet used the ambiguous phrase “before initialization” for a sequence proven only after authentication and before startup-GUC initialization, `ReadyForQuery`, and SQL. The review changed no repository state.

2026-08-14: Recorded the project owner's direct repair authorization, removed the residual current numerical ranking, and made the startup sequence exact. Passed the complete precision-correction primary integrated barrier and froze exact corrected Proposed ADR-0015 SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1` for fresh independent exact-artifact review. All twenty hard gates and LOCK-INV-01 through LOCK-INV-21 reconcile at primary contract level; both validators, `git diff --check`, strict ten-path UTF-8/no-BOM/LF/final-LF/no-trailing-whitespace hygiene, exact Node.js 24.18.0 and Python 3.12.10 five-vector/framing/domain reproduction, protected ADR-0012/ADR-0014 and SPEC/HS zero diff, exact documentation-only scope, structured dependency absence, lifecycle/task/dependency checks, and negative runtime-v2/migration scope pass. ADR-0015 stays Proposed, ADR-0012/ADR-0014 stay Accepted, DG-005/TASK-004 stay Pending, TASK-018 stays In progress, and implementation remains absent.

2026-08-14: Reconciled fresh independent exact-artifact `PASS` with no Blocker, Major, or Minor on exact proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1`; the reviewer passed all twenty hard gates and LOCK-INV-01 through LOCK-INV-21 and reported successful mechanical, two-runtime, lifecycle, dependency, scope, no-implementation, and terminal-rehash checks. The project owner explicitly approved those exact bytes. Acceptance reconciliation made ADR-0015 `Accepted`, ADR-0012 `Superseded`, DG-005 `Resolved`, and TASK-018 `Complete`; updated acceptance-only specification authority; preserved ADR-0014; kept TASK-004 `Pending`, unstarted, and dependent only on TASK-002/TASK-003; and added no migration implementation or dependency.

2026-08-14: Passed the task-closure documentation gate and moved this ExecPlan to `docs/plans/completed/`. Both repository validators, `git diff --check`, strict 13-file UTF-8/LF hygiene, Node.js 24.18.0 and Python 3.12.10 five-vector/framing/domain reproduction, reciprocal lifecycle/status/dependency checks, protected ADR-0014 preservation, and structured dependency/implementation absence pass. Accepted ADR-0015 has post-reconciliation SHA-256 `7964FB625B20B9072E3D583C775C7410F36F762622A62005366D309156BE0CCF`; the exact reviewed and owner-approved proposal remains SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1`. TASK-004 remains `Pending` and unstarted pending separate execution authorization.
