# Replace Character-Image Materialization with a Proportional URL Boundary


This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.


## Purpose / Big Picture


[TASK-017](../../IMPLEMENTATION_PLAN.md#task-017---select-the-proportional-character-image-url-successor) reconsiders the accepted character-image delivery direction after the project owner challenged whether [ADR-0013](../../adrs/superseded/0013-materialize-character-images-during-ingestion.md) is proportional to the supplied assessment. The source contract requires character images to appear and requires 15 characters to be imported, while the official upstream `Character` resource supplies an `image` URL and neither source document requires application-owned image bytes, offline image availability, immutable asset history, or a custom image-serving protocol.

The observable outcome is achieved: after complete independent review, the project owner approved [ADR-0014](../../adrs/0014-persist-and-deliver-character-image-urls-directly.md)'s direct-URL boundary. ADR-0014 is Accepted, ADR-0001 and ADR-0013 are preserved as Superseded history, ADR-0004 remains Superseded in the direct chronology, and [DG-006](../../IMPLEMENTATION_PLAN.md#dg-006---character-image-url-successor-boundary) is Resolved. After TASK-017 closed, the project owner recorded [AUTH-001](../../IMPLEMENTATION_PLAN.md#auth-001---character-image-content-rights-authorization) as `Authorized` under disposition A for this personal, educational, non-commercial direct-URL use. Authorization does not prove implementation. [TASK-003](../../IMPLEMENTATION_PLAN.md#task-003---establish-the-operational-walking-skeleton) remains separately Pending and did not start through this plan.


## Progress


- [x] (2026-08-11 14:33Z) Captured baseline HEAD `8f07538f3fa1405c4216ef988fcb502873d14747`, the existing unstaged TASK-016 documentation packet, passing documentation validation for 37 Markdown files/41 requirement IDs/16 tasks/17 SPEC rules/20 HS rules/111 scenarios, passing ADR validation for 13 ADRs/38 requirements with the known NFR-006 warning, passing `git diff --check`, and negative application-manifest/source evidence.
- [x] (2026-08-11 14:33Z) Registered TASK-017 `In progress`, pending DG-006, this active ExecPlan, its living Decision Review Contract, and the owner-directed hold on image-specific implementation without starting TASK-003 or allocating a successor ADR number.
- [x] (2026-08-11 14:38Z) Re-ran the registration gate after an initial successor-ID correction; ADR validation and `git diff --check` passed, but a later full documentation rerun proved that two parseable literal references to the still-unallocated successor remained.
- [x] (2026-08-11 14:51Z) Removed both remaining premature successor-ID literals and confirmed documentation validation passes for 38 Markdown files/41 requirement IDs/17 tasks/17 SPEC rules/20 HS rules/111 scenarios without allocating an ADR.
- [x] (2026-08-11 14:49Z) Obtained three durable, symmetric technology-research reports under the registered contract; all were read-only and left TASK-003 pending.
  - [x] (2026-08-11 14:49Z) `DIRECT-UPSTREAM-URL`: 86/100 (`Accept`), confidence 0.84, with no candidate hard-gate failure and explicit CORS, redirect, availability, byte-integrity, cache, privacy, observability, and rights limits.
  - [x] (2026-08-11 14:49Z) `RUNTIME-IMAGE-PROXY`: 80/100 (`Accept with explicit follow-ups and residual risks`), confidence 0.84, with a complete fixed-target SSRF, decoding, resource-bound, transient-cache, failure, and same-origin contract.
  - [x] (2026-08-11 14:48Z) `MATERIALIZED-BYTES`: 70/100 (`Revise`), confidence 0.93, with hard gate 4 failed because the exact ADR-0013 lock, history, recovery, retention, HTTP, ingress, and operator surface is not tied to a source or demonstrated project need.
- [x] (2026-08-11 15:02Z) Passed the research synchronization barrier. The decision analyst found the reports comparable without score normalization, ranked direct URL 86, runtime proxy 80, and retained materialization 70, selected `DIRECT-UPSTREAM-URL` as the draft basis with 0.88 recommendation confidence, reran every hard gate and URL invariant, and returned `DRAFT READY` for fresh IR-A only.
- [x] (2026-08-11 15:16Z) Received fresh IR-A `REVISE` with no Blocker or semantic research defect. Applied its one permitted outline-only correction by adding the analyst-owned decide-now/prove-later mapping and staged documentation impact to the durable decision-analysis result; no accepted target document, authority state, ADR number, implementation artifact, or TASK-003 state changed.
- [x] (2026-08-11 15:18Z) Passed the triggered fresh pre-draft independent contract checkpoint after the same reviewer verified the authorized correction. URL-INV-01 through URL-INV-12 pass, both validators and `git diff --check` pass, and no Blocker, Major, or Minor remains.
- [x] (2026-08-11 15:22Z) Confirmed ADR-0013 was the highest allocated record, allocated ADR-0014, drafted the exact reviewed direct-URL decision as `Proposed`, and integrated only proposal/current-review documentation. ADR-0001 and ADR-0013 remain Accepted, ADR-0004 remains Superseded, DG-006 remains Pending, TASK-017 remains In progress, accepted-target derived documents remain unchanged, and TASK-003 remains Pending.
- [x] (2026-08-11 15:29Z) Completed primary proposal-stage reconciliation: ADR-0014 carries the full reviewed direct contract and ADR-0001 preservation surface, all twelve URL invariants pass at primary inspection, documentation validation passes for 39 Markdown files/41 requirement IDs/17 tasks/17 SPEC rules/20 HS rules/111 scenarios, ADR validation passes for 14 ADRs/38 requirements with the known NFR-006 warning, UTF-8 decoding and `git diff --check` pass, and negative implementation/focused-test searches are empty.
- [x] (2026-08-11 15:43Z) Fresh final IR-B, performed by a reviewer distinct from IR-A, returned `PASS` on frozen ADR-0014 SHA-256 `32A88BE0884093B961653BA9D6565F3E4A0F7FE8F9ABAEFE0F38890A2FD4B346` with no Blocker, Major, or Minor. All twelve URL invariants, the 86/80/70 matrix, exact ID-to-URL mappings and hostile variants, authority states, validators, UTF-8/whitespace, and negative implementation evidence pass. Post-verdict reconciliation found no remediation and changed only current review/status records.
- [x] (2026-08-11 15:47Z) Primary post-verdict validation passed the documentation validator (39 Markdown files, 41 requirement IDs, 17 tasks, 17 `SPEC` rules, 20 `HS` rules, and 111 scenarios), the ADR validator (14 ADRs and 38 mapped requirements, with only the known `NFR-006` delivery-constraint warning), `git diff --check`, lifecycle and task-state reconciliation, negative implementation/focused-test/cache scans, and the frozen ADR-0014 identity recheck. Exact project-owner approval is the only remaining decision action.
- [x] (2026-08-11 15:57Z) The project owner requested explicit documentation of why the latest successor changes were made and which facts support moving away from ADR-0013. Expanded ADR-0014's Context with a classified fact/evidence/implication matrix, an explicit statement that ADR-0013 remains Accepted rather than discarded, and the preservation and review reasons for TASK-017, DG-006, and the successor lifecycle. The selected semantics, 86/80/70 matrix, recommendation, rights gate, and TASK-003 boundary are unchanged, but the artifact identity changed, so the prior final IR-B `PASS` is point-in-time evidence only.
- [x] (2026-08-11 15:59Z) A separate read-only repository rationale audit independently confirmed the same classification and lifecycle conclusion: ADR-0013 is technically feasible and remains `Accepted`; the source-first proportionality result supports prospective `Superseded`, not `Rejected` or deletion; and direct delivery knowingly exchanges control over availability, privacy, integrity, observability, and revocation for a smaller boundary. No file was changed by the auditor.
- [x] (2026-08-11 16:13Z) Fresh final IR-B returned `REVISE` on revised ADR-0014 SHA-256 `C6390690DDA22C4C5A3FC36BE2CF453CC75F1919459CDB709DF45C08B42E1C28`, with no Blocker or Major and one Minor evidence-owner attribution defect. Corrected the new matrix and this plan's orientation so ADR-0003 owns anticipation of the URL field, ADR-0013 owns the planned `image_url text NOT NULL` column, and ADR-0006 owns non-null GraphQL projections. The correction changes the artifact identity and therefore returns the complete packet to fresh IR-B; no decision semantic, score, status, implementation artifact, or TASK-003 state changed.
- [x] (2026-08-11 16:22Z) Complete fresh correction-cycle IR-B returned `PASS` on corrected ADR-0014 SHA-256 `23E9E36939B3B76CDAFAEFF6C49F622769733C8E187D00922AC310373A987CE1` and pre-reconciliation ExecPlan SHA-256 `C2CCF238C49951A187B31B653E50BF624A1DB00FCD3C4743ADAC9C0140D6F781`, with all ten hard gates and URL-INV-01 through URL-INV-12 passing and no Blocker, Major, or Minor. The reviewer independently reproduced the 86/80/70 matrix, exact and hostile URL vectors, status and graph state, source facts, validators, encoding/whitespace, and negative implementation scope. Post-verdict reconciliation changes only current review/status records and leaves the exact reviewed ADR unchanged.
- [x] (2026-08-11 16:24Z) Completed primary post-verdict reconciliation without changing the reviewed ADR: root status, ADR index, DG-006/TASK-017 status, plan index, invariant/current-result summaries, and append-only chronology now identify exact project-owner approval as the sole remaining action. Both repository validators, `git diff --check`, strict UTF-8/no-BOM/trailing-whitespace, source immutability, documentation-only scope, negative implementation/focused-test/Python-cache searches, lifecycle checks, and the ADR-0014 identity recheck pass.
- [x] (2026-08-11 16:45Z) Recorded the project owner's explicit approval of exact fresh-final-IR-B-`PASS` ADR-0014 SHA-256 `23E9E36939B3B76CDAFAEFF6C49F622769733C8E187D00922AC310373A987CE1`; acceptance does not select rights disposition A/B/C, authorize image implementation, or start TASK-003.
- [x] (2026-08-11 16:50Z) Synchronized every current authority and derived document, preserved this plan under `docs/plans/completed/`, and passed both repository validators, `git diff --check`, strict encoding/whitespace, source-preservation, documentation-only, negative implementation, link, lifecycle, status, and reviewed 21-edge graph checks.
- [x] (2026-08-11 17:03Z) Fresh independent closure review returned `REVISE`: one Major for two stale current-state clauses in this completed plan, one Minor for an uninterpolated `<id>` token in ordinary HS-012 Gherkin, and one Minor for ambiguous implementation wording in DG-004. Every other lifecycle, invariant, graph, validator, preservation, and negative-scope check passed.
- [x] (2026-08-11 17:03Z) Applied only the three bounded documentation corrections, recorded the review cycle, and returned the complete changed packet to the same independent reviewer without changing ADR-0014 semantics, score, rights, task graph, implementation state, or TASK-003.
- [x] (2026-08-11 17:16Z) Complete fresh correction-cycle closure review returned `PASS` on accepted ADR-0014 SHA-256 `D1452915451381EAB62A11319F36FCE2EF4C372FEA01065E1995FF0060983787`, this pre-reconciliation completed ExecPlan SHA-256 `4D221B8464CC58C2068387B8FC2ED32DAA393C49782530A2FD72497B37740F35`, and raw tracked-diff SHA-256 `729FC607697BF8F5BE280EB0BF0AD47B6C00B8403B818A5442B87B049D13F86C`, with no Blocker, Major, or Minor. All ten hard gates, URL-INV-01 through URL-INV-12, score arithmetic, URL vectors, lifecycle, 21-edge graph, validators, encoding/whitespace, links, source preservation, and negative implementation scope passed. Post-verdict reconciliation changes only this living review record and append-only chronology.
- [x] (2026-08-11) Recorded the post-closure project-owner authorization as AUTH-001 disposition A for the personal, educational, non-commercial direct-URL scope. This satisfies ADR-0014's separate authorization prerequisite without changing TASK-017 closure, the accepted boundary, the task graph, implementation evidence, or TASK-003 status.


## Surprises & Discoveries


- Observation: The official upstream character payload distinguishes `image` from `url`; `image` is the 300-by-300 avatar URL, while `url` identifies the character API resource.
  Evidence: The official Character schema and `GET https://rickandmortyapi.com/api/character/1` return `image: https://rickandmortyapi.com/api/character/avatar/1.jpeg` and a separate character-resource `url`.
- Observation: The source assessment requires images to be displayed and 15 characters to initialize the relational database, but does not require image-byte ownership, same-origin image delivery, offline images, content hashes, retained versions, or an asset route.
  Evidence: `docs/FULL_STACK_TECHNICAL_ASSESSMENT.md` frontend lines 14 and 16 plus backend lines 32 through 34; `docs/REQUIREMENTS.md` FR-FE-001, FR-FE-003, FR-BE-003, FR-BE-004, AC-001, AC-003, and AC-009.
- Observation: URL-only is schema-compatible with the pre-existing accepted relational and GraphQL contracts, but direct browser loading conflicts with ADR-0001's no-direct-external-character-API validation clause and ADR-0013's current same-origin decision.
  Evidence: ADR-0003 defines `characters.image_url`; ADR-0006 defines non-null summary/detail `imageUrl`; ADR-0001 line 77 and ADR-0013 require different browser boundaries.
- Observation: The prior decision's byte volume is small, but its implementation surface is not.
  Evidence: ADR-0013 owns `bytea`, an asset table, cyclic constraints, decoding, identity locks, history, purge/withdrawal, an HTTP asset protocol, ingress behavior, cache effects, and downstream proof across TASK-004/005/006/007/010/011/012/014.
- Observation: The documentation validator rejected every literal mention of a specific successor ID before collision checking and allocation, including explanatory prose and a search-pattern example.
  Evidence: The first correction removed the asserted allocation but left two parseable literals; the research-barrier rerun exposed them, so collision checking now lists the ADR directory without predicting any identifier.
- Observation: The formal materialization report found PostgreSQL capacity technically feasible but rejected the exact ADR-0013 system as disproportionate.
  Evidence: Its source-first score is 70/100 with feasibility/proportionality at 4/15; hard gate 4 fails because the full byte, decoder, cyclic-schema, lock, history, recovery, asset-protocol, ingress, purge, withdrawal, and operations obligations are induced by discretionary owner values rather than required behavior.
- Observation: The direct candidate is the only formal report in the unconditional `Accept` band, but it deliberately trades away application control over availability, redirects, exact bytes, cache freshness, revocation, and centralized image telemetry.
  Evidence: Its source-first score is 86/100. The contract uses exact `Character.image`/ID binding, the existing database and GraphQL fields, anonymous CORS, `no-referrer`, a narrow `img-src`, deterministic fallback tests, and no image-byte subsystem; native `<img>` redirect handling and upstream behavior remain explicit residual risks.
- Observation: Avoiding durable bytes through a same-origin runtime proxy does not make delivery simple.
  Evidence: The proxy report scores 80/100 and still requires a connection-bound DNS allowlist, redirect refusal, bounded acquisition and full image validation, concurrency and cancellation, a fixed asset-only route, transient per-process caching, HTTP behavior, metrics, and downstream deployment proof.
- Observation: The canonical dependency graph already routes TASK-005 and TASK-006 through TASK-017, but their detailed task records still correctly describe the currently Accepted ADR-0013 direction until a successor is approved.
  Evidence: The analyst found no graph change is needed; proposal integration must not rewrite current accepted task semantics, while post-approval synchronization must replace the detailed TASK-016/DG-004/ADR-0013 clauses with TASK-017/DG-006/the accepted successor.
- Observation: Missing image-content permission is separable from the architecture choice.
  Evidence: The analyst found the unknown rights posture sufficiently bounded by an exact owner-controlled pre-implementation A/B/C gate, so it does not block a Proposed ADR or force owner direction during synthesis.
- Observation: Fresh IR-A found the selected semantics complete but the durable analyst result did not repeat two outputs required by its own contract.
  Evidence: The decide-now/prove-later allocation and documentation-impact staging existed elsewhere in this ExecPlan, but not under `Decision-analysis result`; IR-A therefore returned `REVISE` and authorized one bounded outline-only insertion without reopening research. IR-A also confirmed that accepted-target specifications, UI guidance, and the system diagram must remain unchanged until owner approval changes the boundary.
- Observation: Collision checking after fresh IR-A confirmed ADR-0013 as the highest allocated record, so ADR-0014 was the next free sequential identifier.
  Evidence: `rg --files docs/adrs` listed ADR-0001 through ADR-0013 and no ADR-0014 before proposal creation. The new record remains Proposed and creates no reciprocal supersession or accepted-target rewrite before approval.
- Observation: The owner's word “discarded” could incorrectly imply that ADR-0013 is invalid, deleted, or no longer authoritative.
  Evidence: ADR-0013 remains `Accepted`, DG-004 remains historically `Resolved`, and reciprocal supersession is forbidden until exact ADR-0014 approval. The successor rationale is proportionality despite technical feasibility, and a superseded record remains preserved history.
- Observation: The first fresh final review of the expanded rationale found one evidence-owner attribution defect without finding a defect in the proposed decision.
  Evidence: ADR-0003 anticipates an image URL but does not specify its nullability; ADR-0013 owns the planned `image_url text NOT NULL` column, and ADR-0006 independently owns non-null GraphQL `imageUrl` projections. The new evidence matrix and current orientation now state those ownership boundaries exactly.


## Decision Log


- Decision: Create a new successor decision task instead of reopening completed TASK-016 or rewriting accepted ADR-0013.
  Rationale: Repository preservation policy requires accepted ADRs and completed task chronology to remain historical; reversal requires a new Proposed ADR and reciprocal supersession only after approval.
  Date/Author: 2026-08-11 / Codex primary coordinator.
- Decision: Register DG-006 as an owner-directed implementation hold while the successor is evaluated.
  Rationale: ADR-0013 remains formally Accepted until a successor is approved, but the owner has directed that its proportionality be reconsidered before any image-specific artifact is implemented.
  Date/Author: 2026-08-11 / Project owner and Codex reconciliation.
- Decision: Compare direct URL, runtime proxy, and retained materialized bytes under one source-first rubric.
  Rationale: These are the three credible end-to-end boundaries; architectural fit must account for lifecycle repair without using discretionary prior ADR constraints circularly to defeat the simplest source-compliant option.
  Date/Author: 2026-08-11 / Codex primary coordinator.
- Decision: Treat the owner's instruction to make the recommended changes as authorization to prepare and review the successor, not as approval of unseen final ADR wording.
  Rationale: The repository requires approval of the exact reviewed artifact before status, supersession, gate, or task closure changes.
  Date/Author: 2026-08-11 / Codex primary coordinator.
- Decision: Use `DIRECT-UPSTREAM-URL` as the only pre-draft candidate and preserve the 86/80/70 source-first matrix without normalization.
  Rationale: The reports are comparable; direct is the smallest complete boundary, the proxy creates a substantial security-sensitive runtime subsystem, and exact materialization fails hard gate 4. Requirements traceability and proportionality measure distinct concerns, so the reported deductions are not double counting.
  Date/Author: 2026-08-11 / Decision analyst; pending fresh IR-A and project-owner approval.
- Decision: Fix anonymous CORS plus no-referrer semantics in the proposed direct contract rather than leaving credential behavior to implementation.
  Rationale: This omits cross-origin credentials and referrer data while honestly accepting `Origin` disclosure and failure if the upstream stops permitting CORS; switching to credential-including no-CORS would be a semantic change.
  Date/Author: 2026-08-11 / Decision analyst; pending fresh IR-A and project-owner approval.
- Decision: Route the direct proposal through whole-record supersession of ADR-0001 and ADR-0013 while leaving ADR-0004 as Superseded history.
  Rationale: Native upstream avatar requests falsify ADR-0001's literal browser validation and reverse ADR-0013's materialization boundary. The successor must carry forward every unaffected modular-monolith and database-authority rule rather than silently weakening or rewriting accepted history.
  Date/Author: 2026-08-11 / Decision analyst; pending fresh IR-A and project-owner approval.
- Decision: Add an explicit classified rationale to ADR-0014 and treat that owner-requested edit as invalidating the prior frozen final-review identity.
  Rationale: The rationale must distinguish source and upstream facts, repository evidence, dated observations, decision analysis, rights evidence, and owner trade-offs; it must also correct the inaccurate implication that ADR-0013 is already discarded. Because approval applies to an exact independently reviewed artifact, a complete fresh IR-B is required even though the selected semantics and score did not change.
  Date/Author: 2026-08-11 / Project owner request and Codex primary coordinator.
- Decision: Apply the final reviewer's narrow evidence-owner correction and invalidate that review identity before returning the entire packet to IR-B.
  Rationale: Accurate authority attribution is required even when the underlying conclusion remains supported. ADR-0003, ADR-0013, and ADR-0006 own different parts of the relational and GraphQL contract, and approval must apply only to the corrected exact artifact.
  Date/Author: 2026-08-11 / Fresh final IR-B and Codex primary coordinator.
- Decision: Accept exact ADR-0014 and apply its prospective lifecycle without choosing a rights disposition.
  Rationale: Complete fresh final IR-B passed the exact artifact with no finding, and the project owner explicitly approved it. Acceptance resolves DG-006 and supersedes ADR-0001 and ADR-0013 while preserving their history, but A/B/C remains an independent pre-implementation authorization boundary.
  Date/Author: 2026-08-11 / Project owner and Codex primary coordinator.
- Decision: Apply the independent closure review's three bounded documentation corrections without reopening the accepted decision.
  Rationale: The findings concern living-plan authority wording, literal Gherkin placeholder semantics, and evidence-honest future-work wording. Correcting them restores URL-INV-04 and URL-INV-06 closure precision without changing ADR-0014's approved direct boundary, 86/80/70 matrix, rights posture, or downstream ownership.
  Date/Author: 2026-08-11 / Fresh independent closure reviewer and Codex primary coordinator.


## Outcomes & Retrospective


The research and decision-analysis barriers are complete. The analyst returned `DRAFT READY` for a direct-upstream-URL proposal at 86/100 and 0.88 recommendation confidence, with proxy 80 and retained materialization 70 as dissent/rejected alternatives. At that checkpoint, readiness extended only to fresh IR-A and did not authorize ADR allocation, proposal creation, approval, supersession, gate resolution, or implementation. ADR-0013 remained Accepted, ADR-0001 remained Accepted, ADR-0004 remained Superseded history, DG-004 remained historically Resolved, DG-006 remained Pending, and TASK-017 remained In progress.

Fresh IR-A returned `REVISE` solely because the durable analyst result omitted its required mapped decide-now/prove-later table and staged documentation-impact disposition. The supported outline correction was returned to the same checkpoint; it did not change the candidate, score, semantics, lifecycle, accepted target, or owner boundary.

The same reviewer rechecked the correction and returned `PASS` with all twelve URL invariants passing and no remaining finding. That verdict authorized collision-safe allocation and drafting of the reviewed successor as `Proposed`; it did not authorize acceptance, supersession, gate resolution, task closure, rights disposition, implementation, or TASK-003.

ADR-0014 was then allocated and integrated as the exact Proposed direct-URL successor at 86/100. Proposal-stage current-status records identified it without changing the accepted target expressed by the system diagram, specifications, or UI guidance. Fresh final IR-B and post-verdict reconciliation passed on that frozen artifact; exact owner approval remained. No reciprocal supersession, gate resolution, task closure, rights disposition, implementation, or TASK-003 start occurred.

Fresh final IR-B returned `PASS` on that exact frozen ADR-0014 with no finding, and primary post-verdict reconciliation found the artifact, score, recommendation, lifecycle, documentation impact, and next action aligned. At that checkpoint, exact project-owner approval was the sole remaining TASK-017 decision milestone. ADR-0014 remained Proposed; ADR-0001 and ADR-0013 remained Accepted; ADR-0004 remained Superseded; DG-006 remained Pending; TASK-017 remained In progress; rights disposition A/B/C remained unresolved; TASK-003 remained Pending; and no implementation existed.

The project owner then requested a more explicit account of the latest changes and the facts behind replacing ADR-0013. ADR-0014 now states that ADR-0013 is technically feasible and remains Accepted, classifies the source, upstream, repository, feasibility, delivery-surface, comparative-analysis, rights, and owner-value evidence, and explains why a preserved successor workflow was required. This explanatory expansion changes the reviewed artifact identity. The earlier final IR-B `PASS` remains valid historical evidence for SHA-256 `32A88BE0884093B961653BA9D6565F3E4A0F7FE8F9ABAEFE0F38890A2FD4B346`, but the current proposal is not approval-ready until a fresh final reviewer reruns the complete invariant packet and the primary reconciles that verdict. All authority, rights, implementation, and TASK-003 states remain unchanged.

The first fresh final review of the expanded rationale returned `REVISE` on SHA-256 `C6390690DDA22C4C5A3FC36BE2CF453CC75F1919459CDB709DF45C08B42E1C28` solely because the new matrix attributed relational nullability to ADR-0003. The reviewer found no Blocker, Major, decision-semantic defect, score defect, lifecycle defect, or invariant failure. The corrected text now assigns URL-field anticipation to ADR-0003, the planned non-null column to ADR-0013, and non-null GraphQL projections to ADR-0006. Because that correction creates another exact identity, the complete corrected packet remains unpresentable until fresh IR-B passes.

Complete fresh IR-B then returned `PASS` on corrected ADR-0014 SHA-256 `23E9E36939B3B76CDAFAEFF6C49F622769733C8E187D00922AC310373A987CE1`, with all hard gates and URL invariants passing and no finding. Primary reconciliation leaves that exact ADR unchanged and updates only living review/status records. Exact project-owner approval is now the sole remaining TASK-017 decision milestone; no accepted status, supersession, gate, rights, implementation, or TASK-003 state changes until that approval.

The project owner then approved that exact reviewed artifact. ADR-0014 is Accepted; ADR-0001 and ADR-0013 are preserved as Superseded by ADR-0014; ADR-0004 remains Superseded by ADR-0013 in the historical chain; and DG-006 is Resolved. The synchronized current target stores only the exact validated `Character.image` URL and uses it directly in native browser image requests. Acceptance did not select rights disposition A/B/C, authorize implementation, provide runtime evidence, or start TASK-003.

Fresh independent closure review returned `REVISE` on the integrated accepted packet because two nondated current-state clauses still described ADR-0013/ADR-0001 as Accepted, HS-012 used an uninterpolated `<id>` token in an ordinary Scenario, and DG-004 used wording that could imply current implementation. The bounded corrections now state the exact current lifecycle, derive the byte-exact avatar URL directly from the requested ID, and refer only to future image-delivery work. All accepted semantics and authority outcomes remain unchanged; complete fresh correction-cycle review is required before final handoff.

Complete fresh correction-cycle closure review then returned `PASS` with no Blocker, Major, or Minor. The reviewer independently confirmed that ADR-0014 still differs from the exact approved proposal only by authorized acceptance, lifecycle, closure-validation, and completed-plan-link changes; all hard gates and URL invariants pass; and the repository remains documentation-only. TASK-017 is therefore fully closed. Rights disposition A/B/C, DG-005, DG-003, and all implementation/runtime proof remain unresolved; TASK-003 and TASK-004 remain Pending and unstarted.

Documentation impact at registration: add TASK-017, DG-006, this active ExecPlan and index entry, current-status wording, dependency routing, and append-only execution chronology. Preserve the completed TASK-016 ExecPlan and ADR-0013 unchanged as historical evidence. No requirement wording, optional-scope classification, ADR status, implementation evidence, or TASK-003 state changes.

Documentation impact at approval and closure: accept ADR-0014; add reciprocal Superseded metadata and lifecycle notices to ADR-0001 and ADR-0013 without rewriting their substantive bodies; preserve ADR-0004's direct historical successor; resolve DG-006; synchronize the ADR index, root status, implementation plan, system diagram, specifications, UI guidance, plan index, and append-only chronology; and preserve this completed ExecPlan. The assessment, requirements, optional-scope classification, canonical task edges, TASK-016 history, rights disposition, implementation state, and TASK-003 status remain unchanged.

Post-closure authorization impact: AUTH-001 now records disposition A as `Authorized` for the exact accepted direct-URL boundary in a personal, educational, non-commercial portfolio. This later authorization does not rewrite the pre-approval or closure snapshots above, change ADR-0014, add a task edge, prove runtime behavior, or start TASK-003.


## Context and Orientation


The root `README.md` is the documentation entry point and current-state owner. The supplied assessment in `docs/FULL_STACK_TECHNICAL_ASSESSMENT.md` and normalized `docs/REQUIREMENTS.md` own source scope. They require cards and details to display character images and require relational initialization with 15 public-API characters, but they do not select image storage or delivery.

`docs/adrs/0003-use-postgresql-for-relational-persistence.md` anticipates an image URL in the character model. `docs/adrs/superseded/0013-materialize-character-images-during-ingestion.md` defines the planned non-null `characters.image_url` column, while `docs/adrs/0006-define-a-use-case-oriented-graphql-contract.md` exposes non-null `CharacterSummary.imageUrl` and `CharacterDetail.imageUrl` projections. `docs/adrs/0007-use-cache-aside-for-character-searches.md` permits the current URL in the finite Redis summary projection. `docs/adrs/0008-use-deterministic-bootstrap-and-idempotent-sync.md` owns deterministic import of upstream IDs 1 through 15. `docs/adrs/0009-keep-frontend-state-close-to-its-owner.md` owns meaningful alternative text, stable image geometry, and layout-safe failure.

At TASK-017 registration, ADR-0013 was the current Accepted image direction: it materialized exact image bytes in PostgreSQL and selected a same-origin content-addressed path, while ADR-0001 prohibited a direct external character API dependency. That pre-successor baseline created the conflict this plan reviewed. After exact project-owner approval, ADR-0014 became the current Accepted authority, ADR-0001 and ADR-0013 became Superseded, and every unaffected workspace and product-data constraint was carried forward without rewriting their history.

The official API defines `Character.image` as a URL to the character avatar and separately defines `Character.url` as the character resource endpoint. This plan uses `upstream image URL` only for the former value.


## Scope and Non-Goals


In scope:

- compare direct browser use of the validated upstream `Character.image` URL, a fixed-target runtime application proxy, and the current ingestion-owned PostgreSQL byte materialization;
- decide URL/byte ownership, import validation, PostgreSQL shape, GraphQL and Redis meaning, browser destination, CSP/referrer/credential behavior, availability, fallback, testing, rights risk, lifecycle compatibility, and downstream task effects;
- prepare one collision-safe Proposed successor ADR only after the research, analysis, and triggered pre-draft review barriers pass;
- identify exact lifecycle treatment for ADR-0013, ADR-0001, and the unaffected constraints inherited from ADR-0004; and
- stop for project-owner approval of the exact reviewed proposal.

Out of scope:

- editing the source assessment or requirements;
- modifying the substantive historical body of accepted ADR-0013, ADR-0001, or completed TASK-016 evidence;
- accepting or superseding any ADR before exact owner approval;
- resolving DG-006 or closing TASK-017 before approval and documentation closure;
- deciding that image-content display or hotlink permission exists without authoritative evidence;
- adding application source, migrations, manifests, dependencies, tests, image files, decoders, routes, CSP configuration, or runtime behavior; and
- starting TASK-003, TASK-004, or any downstream implementation task.


## Plan of Work


Milestone 1 registers the authoritative task, gate, active plan, contract, dependency hold, current status, and chronology. It records the existing dirty working tree rather than treating prior TASK-016 changes as new successor work. The milestone passes when both validators, `git diff --check`, plan links, unique ID checks, and negative implementation checks pass.

Milestone 2 gives one read-only `technology_researcher` each the same contract and one candidate. Every report must use primary official sources, distinguish source requirements from discretionary quality attributes, quantify implementation surface, cover the exact end-to-end flow and failure boundary, and return the required output contract. No report selects architecture.

Milestone 3 waits for all reports, then gives the complete durable set and this contract to `decision_analyst`. The analyst must audit comparability, prevent circular architectural-fit scoring, normalize the matrix, map every hard gate and invariant, choose decide-now versus prove-later semantics, return a ranked recommendation and ADR outline, and emit exactly `DRAFT READY`, `RETURN FOR RESEARCH`, or `OWNER DIRECTION`.

Milestone 4 performs a fresh independent pre-draft checkpoint because the owner challenge is materially contradictory to an accepted ADR and the options intentionally trade KISS against privacy, availability, integrity, and rights. One supported outline correction is allowed. Any material new subsystem or unresolved Major returns to research or owner direction.

Milestone 5 begins only after `DRAFT READY` and checkpoint `PASS`. The primary checks that ADR-0013 is still the highest number and allocates the next free number only then. It drafts a Proposed ADR with the exact reviewed semantics and integrates only proposal/current-review documentation. Existing accepted statuses, DG-006, TASK-017, and implementation state remain unchanged.

Milestone 6 gives a different fresh `independent_reviewer` the complete artifact and exact diff. The reviewer reruns the complete invariant packet and returns `PASS`, `PASS WITH FOLLOW-UPS`, `REVISE`, or `BLOCKED`. The primary applies at most two bounded final-artifact correction cycles, performs post-verdict reconciliation, and stops for owner approval. Acceptance, reciprocal supersession, gate resolution, task closure, and completed-plan movement occur only after that approval.


## Decision Review Contract


### Authority, artifact, and approval boundary


- Owning task: TASK-017, `Complete` after approval, authority synchronization, validation, and independent closure review.
- Controlled gate: DG-006, `Resolved` by accepted ADR-0014.
- Target artifact: accepted ADR-0014, allocated after the completed fresh IR-A and collision check and approved by the project owner only after complete fresh final IR-B `PASS`.
- Historical authorities: ADR-0013 and ADR-0001 are Superseded by ADR-0014; ADR-0004 remains Superseded by ADR-0013; TASK-016 remains Complete; DG-004 remains historically Resolved.
- Approval boundary: the project owner approved the exact reviewed successor and authorized reciprocal supersession, DG-006 resolution, and TASK-017 closure. Only the project owner may separately select rights disposition A, B, or C.
- Forbidden scope: requirements changes, implementation, rights inference, premature ADR allocation, accepted-record semantic rewrite, TASK-003 start, or unreviewed authority-state changes.


### Common criteria and scoring


Each candidate uses the ADR portfolio's 100-point rubric:

| Criterion | Maximum | Required interpretation |
|---|---:|---|
| Requirements traceability | 20 | Satisfy FR-FE-001, FR-FE-003, NFR-001, NFR-005, AC-001, and AC-003 without promoting unrequested behavior to source scope. |
| Architectural fit and consistency | 20 | State exact preservation/supersession work; do not award circular fit merely because a candidate repeats the challenged ADR. |
| Options and trade-offs | 15 | Cover the complete acquisition/import, persistence, GraphQL/Redis, browser, failure, rights, and reversal flow. |
| Feasibility and proportionality | 15 | Count schema, code, dependencies, infrastructure, operations, tests, and documentation—not only stored byte volume. |
| Quality attributes | 10 | Compare availability, privacy, integrity, security, usability, observability, and operability against explicit project needs. |
| Verifiability | 10 | Define deterministic tests without treating live upstream behavior as stable acceptance evidence. |
| Evolution and reversibility | 10 | Cover URL/content changes, scale, provider failure, future self-hosting, and migration cost. |

Every report must state raw score, recommendation band, confidence, hard-gate failures, and which quality attributes are owner value choices rather than source requirements.


### Evidence classes and required report output


Evidence priority is: source assessment and normalized requirements; official upstream/API, browser, HTTP, CSP, and database documentation; accepted repository authorities; reproducible read-only observations labeled with time; and clearly labeled inference. Prior TASK-016 reports and the two pre-contract reassessments are discovery history only and cannot replace the formal reports.

Each technology report must contain: assignment and scope; repository constraints; primary-source findings; criteria matrix; exact end-to-end flow; benefits; costs and failure modes; security/privacy/rights analysis; unknowns; downstream task and documentation effects; score; confidence; recommendation; and explicit no-write/no-implementation status.

The decision analyst must return: comparability audit; normalized matrix; hard-gate and invariant coverage; ranked recommendation; decide-now/prove-later table; mapped ADR outline; dissent; lifecycle plan for ADR-0013/ADR-0001/ADR-0004; documentation impact; confidence; and exactly one readiness result.


### Hard gates


1. The proposal must satisfy required list/detail image display without claiming that byte ownership, offline availability, same-origin delivery, immutability, or image history is source-mandatory.
2. It must distinguish upstream `Character.image` from `Character.url` and define the exact value persisted as `characters.image_url`.
3. URL-only or proxy candidates must define accepted scheme/host/path/character association, browser destination, referrer/credential/CSP behavior, upstream failure, and layout-safe fallback without inventing upstream guarantees.
4. Materialization must justify every byte, decoder, schema, route, lifecycle, and operational obligation against a concrete need rather than small byte volume alone.
5. Every candidate must separate public display/hotlink risk from copying, backup, retention, and redistribution risk; no reviewed source may be presented as a content license.
6. The lifecycle plan must preserve accepted/completed history and explicitly reconcile every reversed ADR-0013 and ADR-0001 clause while carrying forward unaffected ADR-0004 constraints.
7. Automated acceptance evidence must be network-independent; dated live probes may inform risk but cannot prove future availability, media, redirect, ownership, or content.
8. The proposal must map downstream task changes without implementation or dependency drift outside the authorized successor task.
9. The score and recommendation must follow the portfolio rubric; any hidden high-impact assumption prohibits acceptance readiness.
10. Before owner approval, the successor remains Proposed, DG-006 Pending, TASK-017 In progress, ADR-0013/ADR-0001 Accepted, TASK-016 Complete, and TASK-003 Pending.


### Decide now versus prove later


Decide now: persisted value and ownership; browser destination; import URL/byte validation boundary; whether an application asset route exists; GraphQL/Redis URL meaning; source failure/fallback policy; privacy and content-risk posture; ADR lifecycle; downstream artifact ownership; and reversal triggers.

Prove later: exact React component implementation, migration syntax, importer and GraphQL wiring, Redis serialization, browser interception, CSP deployment syntax, visual fallback rendering, performance, and real environment behavior. Downstream proof may validate defined semantics but must not choose them.


### Cumulative invariant packet


The `Final IR-B PASS` entries below now apply to corrected ADR-0014 SHA-256 `23E9E36939B3B76CDAFAEFF6C49F622769733C8E187D00922AC310373A987CE1`. After one bounded correction to evidence-owner attribution, complete fresh IR-B reran and passed URL-INV-01 through URL-INV-12, the decision contract, source facts, score arithmetic, lifecycle, graph, validators, and negative scope without finding. The earlier frozen identities and verdicts remain point-in-time chronology only.


| ID | Trigger or fixture | Expected result | Evidence / actual result | Responsible reviewer |
|---|---|---|---|---|
| URL-INV-01-COVERAGE | Every report, outline, and final artifact | All contract outputs and three complete candidates are present. | Final IR-B PASS: three candidates, matrix, selected contract, dissent, lifecycle, downstream map, rights gate, ADR outline, and exact ADR-0014 artifact are complete. | Analyst, IR-A, IR-B |
| URL-INV-02-SOURCE | Assessment and requirement mapping | Mandatory, optional, and discretionary architecture are separated exactly. | Final IR-B PASS: mandatory display/import scope remains distinct from discretionary delivery, privacy, and byte-ownership choices. | Analyst, IR-A, IR-B |
| URL-INV-03-UPSTREAM-FIELD | Official character 1 payload plus schema | `image` is the avatar URL; `url` is not used as the image. | Final IR-B PASS: only byte-exact expected `Character.image` is accepted; `Character.url` substitution is prohibited. | Researchers, IR-A, IR-B |
| URL-INV-04-AUTHORITY | ADR/task/gate status matrix | No historical rewrite or premature approval, supersession, closure, implementation, or TASK-003 start. | Final pre-approval IR-B PASS snapshot: ADR-0014 Proposed; ADR-0001/0013 Accepted; ADR-0004 Superseded; DG-006 Pending; TASK-017 In progress; TASK-016 Complete; TASK-003 Pending; no implementation exists. | Primary, IR-A, IR-B |
| URL-INV-05-PROPORTIONALITY | Full artifact/task surface per candidate | Complexity is scored by total delivery surface and justified needs, not byte count alone. | Final IR-B PASS: independent arithmetic and semantic review confirmed the complete source-first 86/80/70 matrix and materialization hard-gate-4 failure. | Analyst, IR-A, IR-B |
| URL-INV-06-DIRECT-BOUNDARY | Valid URL, wrong host, wrong character, redirect, outage | The direct candidate defines validation, privacy, redirect limitation, deterministic tests, and fallback honestly. | Final IR-B PASS: exact mappings for IDs 1 through 15, 13 hostile/alias variants, and a mapping-swap test confirm binding; browser/privacy/redirect/fallback semantics are complete. | Direct researcher, IR-A, IR-B |
| URL-INV-07-PROXY-BOUNDARY | Valid URL, hostile target, redirect, timeout, invalid body | The proxy candidate defines fixed-target security, resource bounds, cache/failure behavior, and no arbitrary proxy. | Final IR-B PASS: the rejected proxy remains fully specified with fixed-target SSRF, zero-redirect, decoding, resource, cache, and failure semantics. | Proxy researcher, IR-A, IR-B |
| URL-INV-08-MATERIALIZATION | Same, changed, corrupt, and unavailable bytes | The byte candidate justifies storage, association, recovery, retention, route, and reversal obligations. | Final IR-B PASS as rejected-candidate evidence: materialized semantics are complete and correctly fail hard gate 4 for unjustified induced scope. | Materialization researcher, IR-A, IR-B |
| URL-INV-09-RIGHTS | Official About ownership statement | Display/hotlink and copy/backup/redistribution risks remain distinct and unresolved without permission. | Final IR-B PASS: direct display/cache and durable-copy risks remain separate; A/B/C remains unresolved owner evidence and approval is not permission. | All researchers, analyst, IR-A, IR-B |
| URL-INV-10-DOWNSTREAM | TASK-004/005/006/007/010/011/012/014 mapping | Every future artifact has one owner and no implementation is claimed. | Final IR-B PASS: all eight tasks own a bounded future artifact, the graph is preserved, and no implementation is claimed. | Analyst, IR-A, IR-B |
| URL-INV-11-LIFECYCLE | ADR-0001, ADR-0004, ADR-0013 and successor metadata | The successor route is reciprocal, preserves unaffected decisions, and leaves history intact. | Final pre-approval IR-B PASS snapshot: prospective ADR-0001/0013 whole-record supersession preserves unaffected rules and TASK-016 history; reciprocal metadata waits for approval; ADR-0004 remains historical. | Analyst, IR-A, IR-B |
| URL-INV-12-EVIDENCE | Live and deterministic evidence inventory | Dated observations are not promoted to future guarantees or implementation proof. | Final IR-B PASS: live observations are dated and non-guaranteeing; downstream proof remains network-independent. | Primary, IR-A, IR-B |

Post-approval closure reconciliation: ADR-0014 is Accepted; ADR-0001 and ADR-0013 are Superseded; ADR-0004 remains Superseded history; DG-006 is Resolved; TASK-017 and TASK-016 are Complete; TASK-003 remains Pending; and no implementation exists. AUTH-001 was later recorded as `Authorized` under disposition A. The pre-approval cells above remain immutable review snapshots rather than current status.


### Risk trigger, corrections, escalation, and stopping


The decision is risk-triggered because it reverses an accepted cross-cutting boundary, candidates materially conflict on privacy/availability versus KISS, and a direct browser request changes third-party contact. Fresh IR-A is mandatory before drafting, and a distinct fresh IR-B is mandatory after the complete artifact.

IR-A permits one supported outline correction. Final review permits at most two bounded artifact correction cycles. A correction that adds a new normative subsystem invalidates the prior checkpoint and re-enters research/analysis/review. Exhaustion, unresolved rights/value preference, a material blocker, or inability to reconcile accepted history returns to owner direction. The primary stops at the exact owner-approval checkpoint even if every automated and independent review passes.


## Concrete Steps


All commands run from `C:\Users\mmjos\Desktop\workbeanch\rick-and-morty-test`.

Baseline and structural validation:

    git status --short
    python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
    python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
    git diff --check

Collision checks before drafting only:

    rg --files docs/adrs
    rg -n "DG-006|TASK-017" README.md docs

Negative implementation and scope checks:

    rg --files | rg "(^|/)(apps|packages|migrations?|tests?)/|package.json|lock|\\.(ts|tsx|js|jsx|png|jpe?g)$"
    rg -n "\\.(only|skip)\\(" . --glob "!docs/**"

The expected completed result is documentation-only changes, no app/test/migration/image/dependency artifact, no focused or skipped executable test, ADR-0014 Accepted, ADR-0013 and ADR-0001 Superseded, ADR-0004 preserved as Superseded history, DG-006 Resolved, TASK-017 Complete, rights disposition A/B/C unresolved, and TASK-003 Pending.


## Validation and Acceptance


Milestone validation requires both repository validators, `git diff --check`, strict UTF-8/no BOM, trailing-whitespace checks, valid links, unique stable IDs, accurate plan status, unchanged requirement wording, preserved historical artifacts, and negative implementation/focused-test/Python-cache checks.

Decision validation requires complete research, analyst `DRAFT READY`, triggered IR-A `PASS`, a collision-safe Proposed ADR, fresh IR-B `PASS` or fully reconciled `PASS WITH FOLLOW-UPS`, complete rerun of URL-INV-01 through URL-INV-12, and a post-verdict match among artifact text, score, recommendation, statuses, documentation impact, and the next action.

No Red-Green-Refactor cycle applies because TASK-017 changes decision documentation only. Application tests do not exist and must not be invented. Downstream production tasks remain responsible for TDD after approval.

Acceptance is owner controlled. Before approval, successful validation proved only that the proposal was ready to review. After the explicit approval, the primary accepted the successor, added reciprocal supersession metadata, resolved DG-006, synchronized current authorities, closed TASK-017 through the documentation gate, and moved this plan to `docs/plans/completed/`. Those lifecycle actions do not select rights disposition A/B/C or prove implementation.


## Idempotence and Recovery


Read-only research and validators are safe to repeat. Apply documentation edits additively with `apply_patch`, inspect the dirty tree before every change, and never reset or discard the existing TASK-016 packet. Preserve ADR-0013, ADR-0001, ADR-0004, the completed TASK-016 plan, and execution chronology. If drafting fails, leave the successor Proposed and TASK-017 In progress; resume from this plan. If review rejects the proposal, record the verdict and return to the specified barrier rather than changing status or implementing a candidate.


## Artifacts and Notes


Authoritative initial artifact set:

- `docs/FULL_STACK_TECHNICAL_ASSESSMENT.md` and `docs/REQUIREMENTS.md` for source scope;
- `docs/adrs/README.md` and ADR-0001, ADR-0003, ADR-0004, ADR-0006 through ADR-0010, and ADR-0013 for current architecture;
- `docs/IMPLEMENTATION_PLAN.md` for TASK-017, DG-006, and dependency routing;
- this ExecPlan for workflow evidence;
- `docs/execution/decision-and-progress-log.md` for append-only chronology; and
- the official Rick and Morty Character schema, character 1 response, and About page for upstream field and ownership evidence.

Pre-contract read-only reassessments reached contradictory recommendations while agreeing on the facts. One rescored ADR-0013 at 72/100 and recommended URL-only; another retained the historical 71/100 direct score because of availability/privacy/redirect risks and current ADR conflicts. They are discovery inputs, not formal reports. The contract explicitly requires source-first non-circular normalization.

### Formal technology-research barrier

All three formal reports were completed read-only against the same registered contract. They distinguish source requirements from discretionary quality choices, use the official upstream schema and About page, count complete implementation and operating surface, preserve current authority states, and treat live probes only as dated observations.

| Candidate | Requirements | Fit | Trade-offs | Proportionality | Quality | Verifiability | Evolution | Total / band | Confidence | Hard-gate result |
|---|---:|---:|---:|---:|---:|---:|---:|---|---:|---|
| `DIRECT-UPSTREAM-URL` | 20 | 16 | 13 | 15 | 6 | 8 | 8 | 86 / `Accept` | 0.84 | No candidate failure; rights remains unresolved authorization. |
| `RUNTIME-IMAGE-PROXY` | 18 | 16 | 13 | 9 | 7 | 9 | 8 | 80 / `Accept with explicit follow-ups and residual risks` | 0.84 | Pass at contract level; SSRF/decoder/deployment and rights proof remain downstream gates. |
| `MATERIALIZED-BYTES` | 15 | 15 | 13 | 4 | 8 | 9 | 6 | 70 / `Revise` | 0.93 | Fails hard gate 4 and URL-INV-08 selection-readiness for disproportionate induced surface. |

#### `DIRECT-UPSTREAM-URL` durable report

- Exact flow: TASK-005 requires payload ID equality and exact byte-for-byte `Character.image` value `https://rickandmortyapi.com/api/character/avatar/{canonical-id}.jpeg` for IDs 1 through 15, rejects every alternate scheme, host, port, credential, path, character association, query, fragment, encoding, or noncanonical decimal, validates the complete batch before publication, and persists only that absolute URL in existing `characters.image_url`.
- Runtime meaning: PostgreSQL owns the character-to-locator association; GraphQL summary/detail and the finite Redis summary projection carry the same absolute URL; the browser loads it natively. There is no image table, byte fetch, decoder, hash, proxy, route, ingress rule, durable/application byte cache, retention, purge, withdrawal, or image-specific import lock.
- Browser contract: use `crossorigin="anonymous"` so the cross-origin request has credentials mode `same-origin`, `referrerpolicy="no-referrer"`, meaningful `alt`, fixed square geometry, no automatic retry loop, a DOM/CSS fallback requiring no alternate image source, and an enforcing path-qualified `img-src` for the exact HTTPS avatar host. `connect-src` does not permit upstream character-data calls.
- Honest limits: anonymous CORS still sends `Origin` and exposes client network/agent/timing and avatar selection to the provider; CORS continuity is not guaranteed; native `<img>` follows redirects; CSP cannot enforce its path after a redirect; application code cannot validate the final URL, bytes, media, dimensions, or correct content; provider HTTP caching controls freshness and revocation; mandatory image display can fail during uncached upstream/CORS outages while the layout remains usable.
- Dated evidence: a redirects-disabled HEAD observation at 2026-08-11 14:44:32Z saw 200, wildcard CORS, and `Cache-Control: public, max-age=7776000, immutable` for avatar 1. Those current properties are not guarantees; the long freshness policy is itself a stale/wrong-content risk.
- Rights: direct delivery avoids application-owned durable copies, backups, version history, and a redistribution route, but public display, hotlinking, and ordinary browser/intermediary caching remain. Before implementation the owner must record authorization, explicit acknowledged-risk direction that is not a license, or authorized replacement content that re-enters review.
- Lifecycle: a selected successor must supersede ADR-0013 and the conflicting whole ADR-0001 only after owner approval, carry forward all unaffected modular-monolith rules and ADR-0004 product-data/Redis/import/interaction constraints, and narrow browser upstream access to the exact avatar `<img>` exception. ADR-0004 remains Superseded history.
- Downstream proof: TASK-004 keeps only `characters.image_url`; TASK-005 proves strict mapping and transactional import; TASK-006 returns the exact stored URL and has no asset route; TASK-007 caches the absolute summary URL; TASK-010/011 prove anonymous/no-referrer/CSP behavior with intercepted network; TASK-012 proves fallback; TASK-014 documents dependency, CSP/CORS/cache/rights behavior, and an ERD with no image relation.

#### `RUNTIME-IMAGE-PROXY` durable report

- Exact flow: persist the same strictly validated upstream `Character.image` URL, but GraphQL/Redis expose `/assets/characters/proxy/v1/{id}/{source-token}`. The handler validates the raw route, rebinds ID/token to the current PostgreSQL row, revalidates the stored URL, and never accepts a caller-provided URL, host, path, headers, proxy, or redirect destination.
- Security and resource contract: require HTTPS and the exact host/path/ID, validate all A/AAAA answers as globally reachable and bind the chosen address to the TLS connection, preserve host verification, ignore ambient proxies, send no credentials, follow zero redirects, accept only status 200, cap headers at 16 KiB and encoded body at 1 MiB, enforce a five-second total deadline, four active acquisitions, a 32-entry/one-second queue, one per-token flight, cancellation, and a bounded full static JPEG/PNG 300-by-300 decode before committing a response.
- Runtime/cache contract: a process-local non-durable LRU may hold 32 entries/16 MiB for 300 seconds with no stale-on-error or negative cache. It is not authority, disappears on restart, duplicates across instances, and cannot protect cold/expired requests from upstream outage. The fixed route emits detected media, exact length/body ETag, private five-minute revalidation, `nosniff`, no CORS opt-in, no Set-Cookie, and deterministic 400/404/405/500/502/503/504 outcomes.
- Benefits and costs: it preserves first-party browser privacy and avoids durable byte/schema/backup/purge growth, but a safe proxy introduces substantial SSRF, decoder, concurrency, HTTP, cache, monitoring, egress, and shutdown behavior for a display-only requirement. It also transiently copies/caches/retransmits content, so rights remain unresolved.
- Lifecycle: it can keep ADR-0001 Accepted, supersede ADR-0013 after approval, preserve ADR-0004 history, carry forward unaffected product-data constraints, and reverse only ingestion-only upstream access for a fixed runtime image fetch. TASK-006 owns most of the induced implementation and proof.

#### `MATERIALIZED-BYTES` durable report

- Exact flow: retain ADR-0013's ingestion-time fixed-target fetch and full decode, PostgreSQL `bytea` plus version/provenance rows and cyclic association, database/schema-scoped session advisory lock, atomic current-version publication, same-origin content-addressed route, integrity checking, Redis/GraphQL root-relative URL, conditional HTTP behavior, ingress, ambiguous-commit recovery, retained versions, purge, withdrawal, and full deterministic fixture matrix.
- Feasibility: PostgreSQL supports `bytea`, TOAST, WAL/backup, deferred constraints, partial indexes, and advisory locks, and the recorded baseline byte volume is small. This establishes technical feasibility, not proportionality.
- Gate failure: offline-after-import images, first-party-only browser contact, exact byte integrity/history, and shared multi-instance storage are not source requirements or demonstrated deployment needs. Hard gate 4 fails because the exact cyclic schema, decoder, catalog-derived import lock, A-to-B-to-A history, ambiguous recovery, indefinite retention, purge/withdrawal, complete HTTP precondition protocol, ingress, and operator/backup surface is induced by those discretionary values.
- Rights and reversal: this candidate has the widest unlicensed footprint because it copies, stores, backs up, retains, and publicly redistributes the images. Reversal after implementation would require migrations, byte/backup disposition, route/ingress retirement, importer/decoder removal, cache/test/ERD repair, and handling published paths. Retaining the exact already-Accepted ADR would also make a duplicate TASK-017 successor unjustified.

Shared primary sources are the official [Character schema](https://rickandmortyapi.com/documentation/#character-schema), [character 1 representation](https://rickandmortyapi.com/api/character/1), and [About ownership statement](https://rickandmortyapi.com/about); WHATWG HTML, Fetch, URL, and MIME standards; CSP Level 3 and Referrer Policy; RFC 9110/9111/8246; IANA address registries and Node 24 DNS/HTTP/AbortSignal documentation for the proxy; and PostgreSQL binary, TOAST, WAL, backup, constraints, and advisory-lock documentation for materialization. The reports make no implementation claim.

### Decision-analysis result

The fresh contract-complete analyst returned `DRAFT READY` for fresh IR-A only. It found the three reports substantively comparable, retained their 86/80/70 scores, found no hidden decision-semantic assumption, and recommended `DIRECT-UPSTREAM-URL` with 0.88 recommendation confidence and 0.90 synthesis-readiness confidence.

The selected outline contract is:

1. TASK-005 requires the requested and payload character IDs to match and requires decoded `Character.image` to equal exactly `https://rickandmortyapi.com/api/character/avatar/{canonical-decimal-id}.jpeg` for the fixed IDs 1 through 15. It never substitutes `Character.url`, validates the whole batch before publication, transactionally upserts source-owned fields, preserves favorite/comment state, leaves the last committed set intact on failure, and requests Redis invalidation only after commit.
2. The exact absolute upstream URL is the only image-specific persisted value in existing non-null `characters.image_url`. PostgreSQL owns the character-to-locator association; it owns no image bytes or byte lifecycle.
3. GraphQL summary/detail and the finite Redis summary projection return the same exact absolute URL. There is no image table, hash, decoder, proxy/asset route, service-worker byte cache, durable image cache, history, retention, purge, withdrawal, special image lock, or image-serving protocol.
4. React uses native `<img>` with `crossorigin="anonymous"`, `referrerpolicy="no-referrer"`, meaningful name-based alternative text, fixed square geometry, no automatic retry loop, and a DOM/CSS layout-safe fallback needing no alternate image source. An enforcing path-qualified `img-src` allows the exact HTTPS avatar host; `connect-src` does not allow browser character-data calls.
5. The decision accepts and documents that anonymous CORS omits cross-origin credentials but sends `Origin` and requires provider CORS; the provider sees client/network/timing/avatar metadata; native redirects cannot be disabled; CSP cannot constrain the path after redirect; final bytes, media, dimensions, association, availability, freshness, and revocation remain provider-controlled; and any load/CORS/CSP/decode failure transitions once to fallback.
6. Before any image-specific implementation, the owner must record exactly one direct-specific rights disposition: A, documented display/hotlink/cache authorization; B, explicit acknowledged-risk instruction that is not a license or ownership claim; or C, authorized replacement content followed by renewed decision review because host, mapping, CSP, and cache assumptions change.

The lifecycle outline whole-record supersedes ADR-0001 and ADR-0013 only after exact approval. It carries forward ADR-0001's workspace, modular-monolith, one-process API, package boundary, root-command, Compose, infrastructure, isolation, and no-microservice rules. It retires ADR-0013's byte acquisition/storage/association/lock/history/route/HTTP/ingress/retention/recovery decisions while carrying forward PostgreSQL product-data authority, Redis-as-optimization, deterministic ingestion, interaction preservation, the GraphQL product-data boundary, and focused module ownership. ADR-0004 remains `Superseded by ADR-0013` historical evidence and is referenced only for carried-forward rationale. ADR-0003 and ADR-0006 through ADR-0010 remain Accepted.

Downstream ownership is exact: TASK-004 keeps only the existing URL column/model; TASK-005 owns strict URL/ID import; TASK-006 returns the exact URL and exposes no image route; TASK-007 caches the same finite summary URL; TASK-010 and TASK-011 own list/detail browser behavior; TASK-012 owns fallback/responsive proof; and TASK-014 owns dependency, CSP/CORS/cache/rights documentation plus an ERD with no image relation. The canonical graph already joins TASK-005/006 through TASK-017 and needs no further edge change.

The proposed ADR must use the repository section order: Context; Decision drivers; Considered options with the exact matrix and hard-gate overlay; Decision with stage contract, explicit absences, rights gate, lifecycle, downstream ownership, and reversal triggers; Consequences; Risks and mitigations; Validation with network-independent fixtures; Evaluation; and References. Proxy remains the first reversal candidate if direct visitor disclosure becomes unacceptable. Materialization may re-enter only after a measured first-party/offline availability or exact-byte requirement and renewed proportionality analysis.

| Analyst contract output | Mapped ADR section | Durable allocation |
|---|---|---|
| Decide now | Decision and Risks and mitigations | Fix the persisted value and ownership, exact import URL/ID validation, browser destination, absence of an application image route and byte lifecycle, GraphQL/Redis URL meaning, CORS/referrer/CSP behavior, upstream failure and fallback, privacy and content-risk posture, ADR lifecycle, downstream ownership, and reversal triggers exactly as selected in items 1 through 6 and the lifecycle/downstream paragraphs above. |
| Prove later | Validation | TASK-004/005/006/007/010/011/012/014 must prove migration/model syntax, importer and GraphQL wiring, Redis serialization, intercepted browser requests, enforcing deployment CSP, visual fallback, performance, and real-environment behavior. Downstream proof may validate these selected semantics but must not choose or silently change them. |
| Documentation impact | Proposal integration now; post-approval synchronization later | At the Proposed stage, add only the successor proposal and current-review records while ADR-0001 and ADR-0013 remain Accepted, ADR-0004 remains Superseded, DG-006 remains Pending, TASK-017 remains In progress, and derived accepted-target documents remain unchanged. Only after exact owner approval may the portfolio, implementation plan, system diagram, specifications, UI guidance, plan index, root status, and append-only chronology be synchronized to the accepted successor. |

`DRAFT READY`, fresh IR-A `PASS`, and corrected fresh final IR-B `PASS` all applied to the exact proposal subsequently approved by the project owner. ADR-0014 is Accepted, ADR-0001 and ADR-0013 are Superseded, DG-006 is Resolved, and TASK-017 is Complete after documentation closure. Review and approval did not resolve rights disposition A/B/C, authorize TASK-003, or prove image implementation.


## Interfaces and Dependencies


This decision task adds no runtime dependency. It defines a future contract for `characters.image_url`, GraphQL `imageUrl`, the Redis summary projection, importer validation, browser `<img>` behavior, CSP/referrer/credential policy, failure fallback, and the absence of an application image route. Exact libraries, migration syntax, component code, deployment configuration, and tests remain downstream.

No package, decoder, object store, CDN, proxy framework, image-transformer, URL-signing service, or asset server is accepted merely because a candidate discusses it. The successor must choose the smallest complete boundary and state measurable reversal triggers.


## Revision Note


2026-08-11: Created TASK-017's active successor-decision ExecPlan, living Decision Review Contract, three-candidate research barrier, source-first proportionality rule, URL invariant packet, risk-triggered pre-draft and final-review checkpoints, exact owner-approval stop, and negative implementation/TASK-003 boundary. Replaced every premature literal successor-ID reference found by the documentation validator with allocation-neutral wording and directory listing. No successor ADR number or implementation artifact was created, and no accepted ADR status changed.

2026-08-11: Completed and durably summarized the formal symmetric technology-research barrier. Direct URL scored 86/100, runtime proxy 80/100, and exact retained materialization 70/100; materialization failed hard gate 4. All reports preserved source/architecture distinctions, unresolved rights, current authority states, negative implementation evidence, and TASK-003's pending state. No option is selected until decision analysis and fresh pre-draft review pass.

2026-08-11: Completed contract-complete decision analysis with `DRAFT READY` for fresh IR-A. The analyst retained the 86/80/70 matrix, selected direct upstream URL as the only draft candidate, fixed strict ID/URL plus anonymous-CORS/no-referrer/CSP/fallback semantics, defined an exact direct-specific A/B/C rights gate, mapped whole-record ADR-0001/0013 lifecycle and ADR-0004 preservation, assigned all downstream artifacts, reran URL-INV-01 through URL-INV-12, and found no further research blocker. No ADR number, proposal, approval, status change, implementation artifact, or TASK-003 start occurred.

2026-08-11: Fresh IR-A returned `REVISE` with one Major completeness finding and no Blocker, Minor, or semantic research defect: the durable analyst result omitted its contract-required decide-now/prove-later table and documentation-impact disposition. Added only the permitted mapped outline table, recorded the checkpoint state, and preserved every preapproval authority and accepted-target document. The same reviewer must recheck this correction before ADR allocation or drafting.

2026-08-11: The same fresh IR-A reviewer verified the bounded correction and returned `PASS` with URL-INV-01 through URL-INV-12 passing and no Blocker, Major, or Minor. Both documentation validators and `git diff --check` pass. Collision-safe Proposed ADR allocation is now permitted; every acceptance and implementation boundary remains unchanged.

2026-08-11: Collision checking confirmed ADR-0013 as the highest allocated record. Allocated ADR-0014 and integrated the reviewed direct-URL contract as `Proposed`, added only proposal/current-review references to the ADR index, root status, implementation plan, plan index, and append-only chronology, and left the accepted system diagram/specification/UI target unchanged. ADR-0001 and ADR-0013 remain Accepted, ADR-0004 Superseded, DG-006 Pending, TASK-017 In progress, rights unresolved, TASK-003 Pending, and no implementation exists. Fresh final IR-B is required before owner presentation.

2026-08-11: Fresh final IR-B by a reviewer distinct from IR-A returned `PASS` on frozen ADR-0014 SHA-256 `32A88BE0884093B961653BA9D6565F3E4A0F7FE8F9ABAEFE0F38890A2FD4B346`, with all URL invariants passing and no Blocker, Major, or Minor. The reviewer reproduced the exact 1-through-15 mapping plus hostile variants, 86/80/70 matrix, lifecycle, validators, encoding/whitespace, and negative scope. Primary post-verdict reconciliation changed only review/status records and found no remediation. The exact owner-approval stop is now active; all preapproval states and TASK-003's pending state remain unchanged.

2026-08-11: The project owner requested explicit documentation of the reasons for the latest changes and the facts behind moving away from ADR-0013. Expanded ADR-0014 with a classified evidence matrix and preservation rationale that says ADR-0013 remains technically feasible and Accepted until approval, while the proposed supersession is based on source-first proportionality. The selected direct contract, scores, recommendation, rights boundary, graph, and authority states did not change. Because the exact artifact identity changed, the prior final IR-B `PASS` is retained only as point-in-time evidence and fresh final IR-B is required before owner presentation. TASK-003 remains Pending and no implementation exists.

2026-08-11: Fresh final IR-B returned `REVISE` on the expanded rationale with one Minor authority-attribution defect and no Blocker, Major, semantic, score, lifecycle, or invariant defect. Corrected the new evidence matrix and current plan orientation to distinguish ADR-0003's anticipated URL field, ADR-0013's planned non-null relational column, and ADR-0006's non-null GraphQL projections. The correction changes the artifact identity, so complete fresh IR-B remains required before owner presentation; every architecture, status, rights, implementation, and TASK-003 boundary remains unchanged.

2026-08-11: Complete fresh correction-cycle IR-B returned `PASS` on ADR-0014 SHA-256 `23E9E36939B3B76CDAFAEFF6C49F622769733C8E187D00922AC310373A987CE1` with all hard gates and URL invariants passing and no Blocker, Major, or Minor. Primary post-verdict reconciliation changes only current review/status records and leaves the reviewed ADR unchanged. Exact project-owner approval is now the sole remaining decision action; ADR-0014 remains Proposed, ADR-0001/0013 remain Accepted, DG-006 remains Pending, TASK-017 remains In progress, rights remain unresolved, TASK-003 remains Pending, and no implementation exists.

2026-08-11: Completed primary post-verdict reconciliation and validation. The documentation and ADR validators, `git diff --check`, UTF-8/no-BOM/trailing-whitespace, source immutability, documentation-only scope, negative implementation/focused-test/Python-cache, lifecycle/status, and exact reviewed-ADR identity checks pass. No decision status or implementation state changed; the plan stops at exact project-owner approval.

2026-08-11: The project owner explicitly approved exact fresh-final-IR-B-`PASS` ADR-0014 SHA-256 `23E9E36939B3B76CDAFAEFF6C49F622769733C8E187D00922AC310373A987CE1`. Began the authorized mechanical lifecycle transition: ADR-0014 Accepted, ADR-0001 and ADR-0013 Superseded with history preserved, ADR-0004 chronology retained, DG-006 Resolved, current and derived documentation synchronized, and TASK-017 prepared for closure. Rights disposition A/B/C remains unresolved, TASK-003 remains Pending, and no implementation exists.

2026-08-11: Completed the primary task-closure gate, moved this ExecPlan to `docs/plans/completed/`, repaired inbound links, and recorded TASK-017 Complete. Both repository validators, `git diff --check`, strict UTF-8/no-BOM/trailing-whitespace, assessment/requirements preservation, documentation-only scope, negative implementation/focused-test/Python-cache, lifecycle/status, and the reviewed 21-edge successor graph checks pass. Fresh independent closure review remains before final handoff.

2026-08-11: Fresh independent closure review returned `REVISE` with one Major stale-current-state finding in this plan and two Minor precision/evidence-wording findings in HS-012 and DG-004. Applied only those bounded corrections, preserved every dated preapproval checkpoint, and returned the complete packet for fresh correction-cycle review. ADR-0014 remains Accepted with unchanged semantics and score; rights A/B/C remains unresolved; TASK-003/TASK-004 remain Pending; no implementation exists.

2026-08-11: Complete fresh correction-cycle closure review returned `PASS` with no Blocker, Major, or Minor. The reviewer passed all ten hard gates, URL-INV-01 through URL-INV-12, the 86/80/70 arithmetic, canonical and hostile URL vectors, lifecycle and reciprocal supersession, the 21-edge graph, validators, encoding/whitespace, links, preservation, and negative implementation scope. Final reconciliation records only this verdict and the append-only chronology; ADR-0014's accepted semantics remain unchanged, rights A/B/C remains unresolved, TASK-003/TASK-004 remain Pending, and no implementation exists.

2026-08-11: Recorded AUTH-001 as `Authorized` under disposition A after the project owner explicitly confirmed authorization for personal, educational, non-commercial display through the exact ADR-0014 direct URLs and ordinary browser/intermediary caching. This post-closure authorization changes no ADR lifecycle, task graph, implementation evidence, or TASK-003 status.
