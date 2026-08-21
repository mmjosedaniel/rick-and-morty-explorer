# Resolve TASK-002 by Selecting the Sequelize Migration Lifecycle

This ExecPlan is a living document. Maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` as work proceeds. This document must be maintained in accordance with `PLANS.md`.

## Purpose / Big Picture

This plan records how `TASK-002 - Resolve the Sequelize migration-lifecycle gate` was completed through an evidence-based, project-owner-approved architecture decision that resolved `DG-002`. A contributor executing `TASK-004` can use the accepted decision to implement one unambiguous migration boundary: the selected runner, the TypeScript source and emitted-artifact policy, the local and isolated-test invocations, the metadata and ordering rules, forward and rollback semantics, failure recovery, and PostgreSQL concurrency control.

The observable result of `TASK-002` is an accepted ADR and synchronized decision documentation, not an installed runner or a migrated database. A reviewer must be able to follow the decision from the ADR index and canonical implementation plan, inspect the exact future command and integration interfaces, and run the repository documentation validators. No manifest, dependency, migration configuration, migration file, executable migration command, database-backed harness, ERD, application source, or runtime behavior belongs to this task.

## Progress

- [x] (2026-08-10 22:08Z) Read the repository policy, documentation map, source assessment, normalized requirements, optional-scope dispositions, ExecPlan convention, canonical task graph, TASK-002, DG-002, ADR-0001, ADR-0002, ADR-0003, ADR-0008, ADR-0010, ADR-0011, target module view, specification routing, HS-002, HS-011, HS-018, SPEC-010, and SPEC-016.
- [x] (2026-08-10 22:08Z) Confirmed from the tracked tree that no application manifest, Sequelize configuration, migration artifact, migration command, executable product test, ERD, or application scaffold exists.
- [x] (2026-08-10 22:08Z) Reconciled the current TASK-002 traceability with accepted ADR-0011 and the current graph state without starting TASK-002 or resolving DG-002.
- [x] (2026-08-10 22:08Z) Added and registered this task-scoped ExecPlan as ready to execute while preserving TASK-002 and DG-002 as `Pending`.
- [x] (2026-08-10 22:24Z) Passed the ADR and documentation validators, whitespace and negative-artifact checks, corrected the independent review's research-restartability finding, and received a final `PASS` with no remaining material findings.
- [x] (2026-08-10 22:35Z) Started TASK-002 by updating its authoritative state to `In progress`, synchronizing current-status navigation, and appending an evidence-linked start record while leaving DG-002 and TASK-003 `Pending`.
- [x] (2026-08-10 22:35Z) Reconfirmed that ADR-0011 is still the highest allocated record and that TASK-016 remains unstarted, making sequence number `0012` the collision-safe next candidate without reserving or creating it prematurely.
- [x] (2026-08-10 22:38Z) Passed the Milestone 1 documentation validator and whitespace check after replacing premature future-ADR tokens with the non-reserving phrase `sequence number 0012`; the validator checked 34 Markdown files and 111 scenarios.
- [x] (2026-08-10 22:42Z) Completed the source-executed programmatic Umzug report and preserved its dated summary in the Durable Research Record; advanced it conditionally with `tsx` limited to local/test source execution and native emitted ESM reserved for delivery validation.
- [x] (2026-08-10 22:45Z) Completed the build-first programmatic Umzug report and preserved its dated summary in the Durable Research Record; advanced it conditionally with custom storage, clean-build manifest verification, one whole-command transaction, and a namespace-derived PostgreSQL advisory lock.
- [x] (2026-08-10 22:42Z) Completed the compiled-artifact Sequelize CLI report and preserved its dated summary in the Durable Research Record; retained it as a credible but conditional Sequelize 6 comparator rather than substituting a repository-owned runner.
- [x] (2026-08-10 22:51Z) Completed the decision-analysis comparability audit and preserved the normalized matrix, qualitative weighting method, ordered ranking, build-first Umzug recommendation, medium-high confidence, dissent, residual gaps, reversal triggers, and ADR outline in the Durable Research Record.
- [x] (2026-08-10 23:16Z) Passed the complete research set through decision analysis, drafted and scored proposed ADR-0012 at 91/100, validated it, and completed the bounded independent-review loop; the final verdict remains `REVISE`, so this milestone stops for project-owner direction rather than advancing to approval.
- [x] (2026-08-10 23:03Z) Completed independent review pass 1 with `REVISE`: four major findings required lock-before-history `READ COMMITTED` ordering, exact bounded rollback semantics, concurrency-safe immutable build boundaries, and reproducible advisory-key derivation; one minor finding required current-state and documentation-impact repair.
- [x] (2026-08-10 23:09Z) Applied correction cycle 1 and revalidated it, then completed independent review pass 2 with `REVISE`: the pass-1 findings were resolved, but full content addressing still omitted runner/resolver/storage/lock/command inputs and emitted files; two minor findings required selected-option and restart-state synchronization.
- [x] (2026-08-10 23:09Z) Applied correction cycle 2 by defining a byte-exact full-input build ID and exact published-file allowlist, adding runner-change and runtime-tamper validation, correcting the option cost, and synchronizing Progress and Outcomes.
- [x] (2026-08-10 23:16Z) Revalidated correction cycle 2 and completed final independent re-review with `REVISE`: the separate authenticated input and output lists do not authenticate the canonical migration-ID-to-source-and-emitted-file mapping. The permitted two correction cycles are exhausted, so no further proposal edit or approval transition is authorized without project-owner direction.
- [x] (2026-08-10 23:33Z) Received project-owner direction to recheck the prior findings and apply supported corrections; local inspection and a second read-only independent audit confirmed the mapping-authentication gap, the hard-gate recommendation conflict, and the missing ADR criteria matrix. This direction authorizes one extraordinary narrow correction and re-review, not ADR approval.
- [x] (2026-08-10 23:35Z) Applied the owner-authorized correction: the build ID now frames and authenticates the exact canonical-ID/source/emitted mapping, runtime preflight reconstructs and compares it before database access, TASK-004 owns mapping-only tamper evidence, the ADR contains the common criteria matrix, and the current recommendation is `Revise` while independent re-review is pending.
- [x] (2026-08-10 23:43Z) Revalidated the first owner-authorized correction and completed independent re-review with `REVISE`: the three assigned corrections hold, but path and source normalization remained undefined for a claimed byte-exact cross-platform ID; one minor wording issue confused proposed selection with approval or implementation.
- [x] (2026-08-10 23:45Z) Defined an ASCII root-relative path grammar, exact UTF-8/BOM/line-ending source normalization, exact output-byte hashing, case-collision and escape rejection, and a normative Windows-separator/CRLF/mapping digest vector; clarified that TASK-002 proposes a selection without approving or implementing the runner.
- [x] (2026-08-10 23:51Z) Revalidated the canonicalization correction: Node.js and .NET independently reproduced both fixture checksums and build ID `e825ac106c1bb8f5af041646699c4e2398b832a55dca90c54155db4195bf37a5`; both repository validators and whitespace checks pass; negative searches find no controlled artifact or focused/skipped test. The documentation validator's first run interpreted an adjacent-bracket regex as a reference link, so the same path grammar is now expressed as unambiguous prose.
- [x] (2026-08-10 23:55Z) Completed independent re-review with `PASS WITH FOLLOW-UPS`: no Blocker or Major finding remains, the hard gate is cleared, and restoring the 91/100 `Accept` recommendation for owner presentation is supported. Integrated its one minor follow-up by rejecting a literal reverse solidus inside a POSIX directory-entry component so it cannot alias a nested slash path.
- [x] (2026-08-10 23:55Z) Restored `Accept` as the proposed recommendation and synchronized the root current state, ADR index, ExecPlan, and execution chronology while leaving ADR-0012 `Proposed`, DG-002 `Pending`, TASK-002 `In progress`, and TASK-003 and TASK-004 `Pending` for the explicit approval checkpoint.
- [x] (2026-08-10 23:57Z) Completed final validation of the exact pre-approval diff and a final read-only audit with `PASS` and no actionable finding. Both validators, tracked and untracked whitespace checks, all four normative digests, controlled-state searches, and negative artifact/test searches pass; this exact proposal is ready for explicit project-owner approval.
- [x] (2026-08-11 01:28Z) Received explicit project-owner approval of the exact final-`PASS` ADR-0012 proposal. The owner's stated condition was satisfied in the workflow sense: every pre-approval milestone and proposal review was complete, and approval was the only remaining controlled decision step before mechanical acceptance synchronization and closure checks.
- [x] (2026-08-11 01:32Z) Accepted ADR-0012, resolved DG-002, marked TASK-002 `Complete`, synchronized every affected authority and navigation document, and preserved this plan under `docs/plans/completed/` without changing TASK-003 or TASK-004.
- [x] (2026-08-11 01:32Z) Completed the documentation relevance audit, negative artifact and disabled-test checks, ADR and documentation validators, whitespace check, final diff review, and retrospective handoff. No product Red-Green-Refactor cycle applied because TASK-002 changed decision documentation only.
- [x] (2026-08-11 01:44Z) Completed a fresh read-only final evidence checkpoint on the exact closed state with `PASS` and no Blocker, Major, or Minor finding. The reviewer confirmed approval validity, authority synchronization, historical evidence, moved-plan links, negative artifacts, unchanged task edges, and TASK-003/TASK-004 `Pending` states.

## Surprises & Discoveries

- Observation: `TASK-002`, not `DG-002`, is the executable roadmap node. DG-002 is the controlled architecture state that an accepted TASK-002 ADR may resolve.
  Evidence: `docs/IMPLEMENTATION_PLAN.md` gives TASK-002 its own outcome, artifacts, approval join, validation, documentation impact, and definition of done.
- Observation: The repository remains documentation-only, so even a small in-tree runner spike would cross the pending-gate guard before the owner-approved decision exists.
  Evidence: The tracked tree contains no manifest, Sequelize configuration, migration, test, or application source, and HS-002 prohibits each controlled artifact while DG-002 is pending.
- Observation: ADR-0011 now directly constrains TASK-002 even though it was accepted after the original TASK-002 mapping was written.
  Evidence: ADR-0011 reserves migrated-state integration activation for TASK-004 after DG-002, requires each run to receive an isolated PostgreSQL namespace, and requires tests to invoke the interface selected by DG-002 rather than inventing one in TASK-003.
- Observation: Current Sequelize documentation presents a materially different support posture for its CLI across release lines.
  Evidence: The current Sequelize v7 CLI page labels v7 as alpha, says its CLI is not ready for Sequelize 7, and directs migration users toward Umzug or another tool; the v6 migration documentation describes the stable JavaScript CLI, `SequelizeMeta`, explicit `up` and `down`, and per-migration transaction examples.
- Observation: A programmatic Umzug option does not make source/build parity, atomic failure behavior, or concurrent execution automatic.
  Evidence: Current Umzug documentation supports TypeScript entrypoints, lexicographically sorted globs, Sequelize-backed metadata, and programmatic `up`/`down`, but its default migration identity includes the file extension, built-in Sequelize storage records metadata separately from migration code, and its optional `FileLocker` is filesystem-scoped rather than a database-wide serialization mechanism.
- Observation: A dual `.ts` and emitted `.js` lifecycle can treat one logical migration as two different migrations unless the decision defines an artifact-neutral identity.
  Evidence: Current Umzug resolution and storage use the discovered filename as the default migration name, so a source filename ending in `.ts` and its emitted counterpart ending in `.js` are distinct by default.
- Observation: “Use a transaction” is not a complete failure policy.
  Evidence: Sequelize does not enable transactions by default; Umzug logs successful execution after calling a migration; PostgreSQL supports transactional DDL broadly but also has operations, such as concurrent index creation, that cannot execute inside a transaction block. The ADR must define schema-plus-metadata atomicity or a precise recovery model.
- Observation: A whole-run migration lock and a per-migration transaction have different lifetimes.
  Evidence: PostgreSQL session-level advisory locks remain until release or session end, while transaction-level advisory locks end with one transaction. If migrations use one transaction apiece, a transaction-scoped lock alone cannot serialize the complete pending batch.
- Observation: The old TASK-002 prerequisite prose said it could run in parallel with TASK-001, but TASK-001 is already complete.
  Evidence: The canonical status index marks TASK-001 `Complete`; TASK-002 is currently independent and may proceed alongside the still-pending TASK-003 and TASK-016 nodes before joining TASK-003 at TASK-004.
- Observation: No ADR-number collision exists at the TASK-002 start boundary.
  Evidence: The ADR directory still ends at accepted ADR-0011, TASK-016 remains `Pending` with no active ExecPlan or proposed ADR, and the tracked tree was clean before TASK-002 status changed.
- Observation: The documentation validator treats a future `ADR-NNNN` token as a stable reference even when prose labels it as only a candidate.
  Evidence: The first Milestone 1 run failed on two undefined future-ADR tokens; describing the unallocated value as `sequence number 0012` preserved the coordination fact and made the same validator pass.
- Observation: The stable Sequelize CLI remains a credible comparison option only by freezing a materially older lifecycle boundary.
  Evidence: Official Sequelize documentation keeps Sequelize 6 current and the CLI 6 line published, but says the Sequelize 7 CLI is not ready; current CLI source still delegates to Umzug 2, resolves roots from the process working directory, and stores extension-bearing names without checksums.
- Observation: Current Umzug's built-in SequelizeStorage and FileLocker cannot satisfy the repository's metadata and concurrency criteria.
  Evidence: Umzug 3.8.3 calls migration code before a separate storage operation, SequelizeStorage uses model synchronization and accepts no transaction for its writes, and FileLocker is filesystem-scoped. A custom storage inside the command transaction and a PostgreSQL advisory lock are necessary candidate components rather than optional hardening.
- Observation: Source-executed Umzug cannot honestly claim one physical runtime across development and delivery.
  Evidence: Local and integration setup would transform `.ts` through `tsx`, while delivery must execute emitted `.js` through native Node. Extension-neutral IDs and a source/emitted integrity manifest can preserve one logical sequence, but TASK-004 must prove both execution paths independently.
- Observation: Emitted bytes should prove build integrity without becoming the durable meaning of an applied migration.
  Evidence: TypeScript or compiler-option upgrades can change emitted JavaScript without changing the authored migration. The decision analysis therefore separates the normalized source checksum used for applied-history drift from the emitted checksum used to reject stale or mismatched build output.
- Observation: A database lock does not protect a shared mutable build directory.
  Evidence: Independent review showed that deleting or replacing one common `dist` migration root before every command could race before PostgreSQL locking, including across intentionally disjoint schemas. ADR-0012 now publishes content-addressed immutable build roots and makes integration orchestration build once before parallel namespace work.
- Observation: Lock acquisition alone does not guarantee a fresh post-wait history view under every isolation level.
  Evidence: A waiter can retain an old snapshot under `REPEATABLE READ`. ADR-0012 now requires artifact preflight, an explicit `READ COMMITTED` transaction, advisory-lock acquisition before any history read, and a fresh post-lock read before operation computation.
- Observation: Content-addressing only migration modules does not make the migration runtime immutable.
  Evidence: Independent review pass 2 showed that a runner or storage fix could otherwise reuse the same build ID and leave changed executable output outside runtime preflight. The artifact schema now includes every authored build/runtime input in the ID and every published runtime file in an exact checksum allowlist.
- Observation: Authenticating the input set and output set separately does not authenticate the association between one canonical migration ID and its source and emitted files.
  Evidence: Final independent re-review found that a mapping-only manifest mutation can preserve every currently hashed path and checksum while changing the identity/history association. The smallest supported remediation is to include each sorted canonical mapping tuple in the build-ID digest and runtime comparison and to validate mapping-only tampering before database access.
- Observation: A numeric rubric score cannot remain the current recommendation when an acceptance hard gate is open.
  Evidence: The ADR portfolio method prohibits an acceptance recommendation when measurable validation is missing or a high-impact assumption is hidden. The historical final `REVISE` therefore overrode ADR-0012's 91/100 score until the mapping correction receives a passing independent review.
- Observation: A durable comparison matrix in the ExecPlan does not satisfy a milestone that requires the proposed ADR itself to show the common criteria matrix.
  Evidence: Milestone 3 names the ADR as the required owner of the displayed matrix. The original ADR contained only an option-summary table; the corrected ADR now carries a condensed criterion-by-candidate matrix while this plan retains the full research record.
- Observation: A byte-exact digest cannot depend on an undefined meaning of "normalized" across Windows and continuous integration.
  Evidence: Independent re-review confirmed the mapping correction but showed that path separators, path validity and case behavior, UTF-8 BOM handling, invalid encoding, and CR-only line endings still admitted divergent conforming implementations. ADR-0012 now defines each canonical byte rule and a fixed vector that covers Windows separators, CRLF source, one mapping tuple, and the expected digest.
- Observation: The documentation validator can interpret adjacent bracketed regular-expression character classes as a Markdown reference even inside inline code.
  Evidence: The first canonicalization validation failed with undefined reference `a-z0-9-`; replacing the adjacent character classes with equivalent exact prose made the same 35-document, 111-scenario validation pass without weakening the path grammar.

## Decision Log

- Decision: Scope this ExecPlan to TASK-002 and treat an owner-approved resolution of DG-002 as its outcome.
  Rationale: The implementation plan owns TASK-002 as the ready decision node. Planning only against DG-002 would omit task status, approval, evidence, documentation impact, and closure responsibilities.
  Date/Author: 2026-08-10 / Codex
- Decision: Do not approve, install, or prototype a migration runner in this ExecPlan; selecting one proposed recommendation for owner review is required.
  Rationale: HS-002 forbids runner, configuration, migration, command, database-backed harness, and ERD artifacts while DG-002 remains pending. A plan may compare options and select a proposal, but it cannot approve architecture or count that proposal as implementation evidence.
  Date/Author: 2026-08-10 / Codex
- Decision: Require symmetric evaluation of three initial strategy shapes: programmatic Umzug executing TypeScript source through an explicit loader; programmatic Umzug executing build-first emitted ESM artifacts; and the Sequelize CLI executing compatible compiled JavaScript artifacts.
  Rationale: These strategies expose the principal source-versus-build and programmatic-versus-framework-CLI trade-offs named by DG-002. If current primary evidence makes one non-credible for the repository's eventual Sequelize release line, replace it before the research barrier with a typed custom QueryInterface runner and record the substitution; do not retain a straw-man option merely to reach three.
  Date/Author: 2026-08-10 / Codex
- Decision: Treat migration identity, metadata atomicity, and database-backed serialization as first-class comparison criteria rather than Umzug or CLI defaults.
  Rationale: A source/build extension change can alter default migration identity, built-in metadata updates may not share the migration transaction, and neither an ordinary metadata table nor a filesystem lock alone prevents two hosts from applying the same pending DDL.
  Date/Author: 2026-08-10 / Codex
- Decision: Require the ADR to distinguish one whole-command concurrency boundary from each migration's transaction boundary.
  Rationale: PostgreSQL session-level and transaction-level advisory locks have different release behavior. The selected design must state its lock scope, key, wait or fail-fast policy, timeout, diagnostics, and release behavior without assuming that a short transaction lock protects the full batch.
  Date/Author: 2026-08-10 / Codex
- Decision: Make local setup, isolated integration setup, and emitted-runtime validation consume the same logical migration sequence even if their physical file extensions differ.
  Rationale: ADR-0011 requires migrated-state tests to invoke the DG-002 interface, while ADR-0003 requires version-controlled migrations to be the schema source of truth. Different logical identities or discovery order would create undetectable environment drift.
  Date/Author: 2026-08-10 / Codex
- Decision: Keep upstream character import, seed content, `sequelize.sync`, model-derived schema mutation, ERD authoring, application boot behavior, and actual package/version installation outside TASK-002.
  Rationale: ADR-0008 separates migration from import, ADR-0003 makes migrations authoritative, TASK-004 owns the first runner and schema migration, TASK-005 owns deterministic import, and an ERD must describe implemented migrated state rather than the decision alone.
  Date/Author: 2026-08-10 / Codex
- Decision: Reuse the repository's read-only technology-researcher, decision-analyst, and independent-reviewer roles when the execution environment supports them, while keeping the primary thread as coordinator, sole writer, approval handler, and closure owner.
  Rationale: Independent option research can proceed in parallel against identical criteria, but agent reports neither approve an ADR nor transfer the universal task-closure responsibility.
  Date/Author: 2026-08-10 / Codex
- Decision: Preserve every completed research report's decision-critical summary and the normalized comparison matrix inside this ExecPlan at each stopping point.
  Rationale: Agent transcripts are supporting inputs rather than durable repository artifacts. Copying source/version/date, criteria findings, uncertainties, substitutions, and disposition into Artifacts and Notes lets a new contributor resume from this plan alone before the proposed ADR exists.
  Date/Author: 2026-08-10 / Codex after independent review
- Decision: Treat sequence number `0012` as the next candidate ID for TASK-002 while deferring file creation until the research and analysis barrier is complete.
  Rationale: ADR-0011 remains the highest allocated record and TASK-016 has not started, so this preserves sequential allocation without prematurely turning a pending gate into an ADR artifact.
  Date/Author: 2026-08-10 / Codex
- Decision: Retain the compiled-artifact Sequelize CLI as the third comparator rather than replacing it with a repository-owned QueryInterface runner.
  Rationale: Sequelize 6 and sequelize-cli 6.6.5 remain a supported current pairing, so the option is credible enough to expose programmatic-versus-framework-CLI trade-offs. Its v6 pin, ESM constraints, extension-bearing identity, non-atomic metadata, and required repository wrapper remain explicit disadvantages rather than grounds for a straw-man exclusion.
  Date/Author: 2026-08-10 / Codex
- Decision: Advance build-first programmatic Umzug to decision analysis only with its safety boundary included in the candidate.
  Rationale: Emitted ESM gives local, integration, and delivery runtime parity, but vanilla Umzug defaults do not satisfy extension-neutral identity, drift detection, atomic schema-plus-metadata updates, mandatory rollback, or cross-process serialization. Excluding custom storage, manifest verification, whole-command transaction, and database locking would compare an unsafe partial lifecycle rather than a credible strategy.
  Date/Author: 2026-08-10 / Codex
- Decision: Advance source-executed programmatic Umzug with both source and emitted paths treated as mandatory lifecycle evidence.
  Rationale: `tsx` can shorten local and integration feedback, but it transforms without type checking and does not prove native delivery execution. The candidate remains credible only when strict no-emit checking, extension-neutral identity, integrity manifest, transactional custom storage, PostgreSQL lock, and native emitted validation are non-optional parts of its contract.
  Date/Author: 2026-08-10 / Codex
- Decision: Draft the proposed gate-resolution ADR around build-first programmatic Umzug, subject to project-owner approval.
  Rationale: It uses one clean emitted ESM runtime in local, integration, validation, and delivery contexts while retaining strict TypeScript authoring and independent no-emit checks. It avoids the source candidate's dual physical runtime and the CLI candidate's legacy loader, non-atomic metadata, metadata synchronization exception, CWD sensitivity, and child-process lock wrapper.
  Date/Author: 2026-08-10 / Codex after decision analysis
- Decision: Make the proposal's safe baseline read-only for `status`, bounded for rollback, transactional for the complete mutating command, and closed to transaction-incompatible DDL.
  Rationale: Read-only status supports recovery without hidden mutation; last-by-default plus explicit bounded step/target avoids unsafe bulk rollback; one command transaction can join DDL, metadata, and lock lifetime; and the small initial schema has no evidenced need for a non-atomic operation. Source checksum will own logical applied identity, emitted checksum will own clean-build integrity, and TASK-004 will select a documented bounded lock-timeout default.
  Date/Author: 2026-08-10 / Codex after decision analysis
- Decision: Publish immutable content-addressed migration builds and pass one selected build root into every execution boundary.
  Rationale: Database advisory locks serialize schema work but cannot prevent one build from deleting files used by another caller. Private staging plus immutable publication lets concurrent builders converge safely, lets ADR-0011 build once for parallel namespaces, and gives delivery an explicit packaged artifact.
  Date/Author: 2026-08-10 / Codex after independent review pass 1
- Decision: Define rollback through default one-step, bounded `--step`, and retained-prefix `--keep-through` semantics.
  Rationale: The proposal must not inherit Umzug's inclusive `to` behavior implicitly. Default one-step may empty a single-entry history; multi-step requires `--confirm-multiple` and cannot empty a multi-entry history; keep-through names the migration that remains applied; invalid selectors fail before migration code with `MIGRATION_ROLLBACK_BOUNDS`.
  Date/Author: 2026-08-10 / Codex after independent review pass 1
- Decision: Fix transaction isolation, lock ordering, and advisory-key bytes in the proposed contract.
  Rationale: Explicit `READ COMMITTED` plus lock-before-history makes a waiter see the winner's commit. Length-prefixed UTF-8 NFC serialization, a versioned literal, big-endian digest extraction, signed conversion, and test vectors ensure every entry point derives the same PostgreSQL key.
  Date/Author: 2026-08-10 / Codex after independent review pass 1
- Decision: Content-address the complete published migration runtime, not only the migration set.
  Rationale: Runner, resolver, storage, lock, command, build-generator, compiler configuration, or dependency-lock changes can alter behavior independently of migration source. Including every authored input in a byte-exact build ID and allowlisting every published file makes immutable reuse and preflight falsifiable.
  Date/Author: 2026-08-10 / Codex after independent review pass 2
- Decision: Stop after final re-review and request project-owner direction instead of applying a third correction cycle or presenting ADR-0012 for approval.
  Rationale: The repository workflow and this ExecPlan bound independent-review remediation to two supported correction cycles. Final re-review still found one major integrity gap: the authenticated input and output lists do not bind each canonical migration ID to its source and emitted file. The proposed ADR must remain unaccepted and DG-002 must remain pending until the owner authorizes an extraordinary narrow correction, requests another revision, or rejects the proposal.
  Date/Author: 2026-08-10 / Codex after final independent re-review
- Decision: Treat the project owner's recheck-and-correct instruction as authorization for one extraordinary narrow correction and independent re-review, but not as approval of ADR-0012.
  Rationale: A second independent audit confirmed all three findings. The supported correction binds the exact mapping tuple into the build ID and runtime reconstruction, adds mapping-only tamper validation, places the required common matrix in the ADR, and applies the portfolio hard-gate override until review passes. DG-002 and every implementation task remain unchanged while this correction is evaluated.
  Date/Author: 2026-08-10 / Codex after project-owner direction
- Decision: Make build-ID canonicalization an explicit ADR contract with a normative vector instead of leaving filesystem and text normalization to TASK-004.
  Rationale: Byte-exact identity must be reproducible before implementation. Portable ASCII relative paths with slash separators, root-containment and case-collision checks, exact UTF-8/LF source normalization, exact output-byte hashing, framed mapping tuples, and a fixed digest vector remove the cross-platform assumption while leaving runtime proof to TASK-004.
  Date/Author: 2026-08-10 / Codex after owner-authorized independent re-review
- Decision: Restore the proposed `Accept` recommendation after independent re-review cleared the portfolio hard gate, and integrate its minor POSIX path-alias follow-up before owner presentation.
  Rationale: The reviewer independently reproduced the source, output, build, and mutated-mapping digests; confirmed the original three corrections and cross-platform canonicalization; found no Blocker or Major issue; and explicitly supported restoring the 91/100 recommendation. Rejecting a literal reverse solidus within a POSIX directory-entry component removes the only remaining portability ambiguity without changing the selected lifecycle.
  Date/Author: 2026-08-10 / Codex after independent `PASS WITH FOLLOW-UPS`
- Decision: Accept the exact reviewed ADR-0012 recommendation and resolve DG-002.
  Rationale: The project owner explicitly approved on the condition that the decision work was complete and only approval remained. Every pre-approval milestone was complete: the final integrated proposal had a 91/100 `Accept` recommendation, a fresh independent `PASS` with no actionable finding, passing validators and digest checks, and no controlled implementation artifact. Only post-approval status synchronization and closure checks remained. Approval establishes implementation direction only; TASK-004 still owns the runner and migration evidence.
  Date/Author: 2026-08-10 / Project owner

## Outcomes & Retrospective

TASK-002 is `Complete`. [ADR-0012](../../adrs/superseded/0012-use-a-build-first-programmatic-migration-lifecycle.md) is `Accepted`, and DG-002 is `Resolved`. The research barrier and decision analysis selected build-first programmatic Umzug with a score of 91 and medium-high confidence. After the bounded review loop ended in `REVISE`, owner-authorized correction added mapping authentication and the in-ADR criteria matrix; later review added explicit cross-platform canonicalization, a normative Windows/CRLF/mapping digest vector, and the POSIX reverse-solidus alias guard. A final independent audit of the exact integrated proposal returned `PASS` with no actionable finding, and the project owner explicitly approved it. The relevance audit, both repository validators, and whitespace checks pass; a fresh read-only review of the exact closed state also returned `PASS` with no Blocker, Major, or Minor finding. TASK-003 and TASK-004 remain `Pending`, and no migration dependency, runner, configuration, executable command, migration, harness, ERD, or application behavior exists.

Documentation impact: Accepted ADR-0012; resolved DG-002; completed TASK-002; synchronized the ADR index, implementation plan, target system diagram, HS-002, HS-011, HS-018, SPEC-010, SPEC-016, specification routing, root status, plan index, execution chronology, and this completed ExecPlan. Requirements and optional-scope dispositions are unchanged. TASK-003, TASK-004, and TASK-016 remain `Pending`, and no migration implementation evidence was added.

## Context and Orientation

The repository is currently a documentation and architecture portfolio with no application scaffold. Start from `README.md`, which owns current-state navigation. `docs/REQUIREMENTS.md` normalizes the assessment scope: FR-BE-003 mandates Sequelize migrations over the selected relational database, FR-BE-004 requires initialization with 15 public-API characters, NFR-003 fixes the backend stack including Sequelize and PostgreSQL or MySQL, DEL-002 requires an ERD, and AC-009 and AC-012 require migrated schema, initialized data, and delivery artifacts. OR-001 is source-optional but repository-adopted by ADR-0002, so migration and runner source must be strict TypeScript even though the original assessment did not mandate that language.

`docs/IMPLEMENTATION_PLAN.md` is authoritative for task and gate state. DG-002 is resolved by accepted ADR-0012, and TASK-002 is `Complete`. TASK-004 depends on both TASK-002 and TASK-003 and owns implementation of the selected runner, the first schema migrations, empty-database evidence, and the first migrated-state integration activation; those artifacts do not exist yet.

The accepted architecture narrows the decision. ADR-0001 requires transparent root-to-workspace commands and isolated integration namespaces. ADR-0002 requires strict ESM TypeScript and an independent no-emit type check. ADR-0003 selects PostgreSQL, prohibits `sequelize.sync` as schema authority, requires version-controlled empty-database migrations, and makes the eventual ERD match implemented migration state. ADR-0008 forbids public-API access during migrations and assigns ingestion to a later explicit importer. ADR-0010 requires real PostgreSQL integration evidence for migration behavior. ADR-0011 requires migrated-state tests to call the interface selected here, gives each run a unique PostgreSQL database or schema, and defers activation of that integration scope to TASK-004.

`docs/specs/HARD_SPEC.feature` owns the accepted ADR-0012 invariant in HS-002. HS-011, SPEC-010, SPEC-016, and the ERD clause in HS-018 describe later observable outcomes; they remain specified but unexecuted after this decision and cannot be marked passing by an accepted ADR. `docs/SYSTEM_DIAGRAM.md` shows the accepted build-first programmatic Umzug boundary as target architecture and explicitly says that it is not implemented. Historical TASK-001 plans, dated reviews, and earlier execution-log entries are point-in-time evidence and must not be rewritten when current state changes.

## Scope and Non-Goals

TASK-002 includes:

- primary-source research and comparable reports for at least three credible runner/artifact strategies;
- one owner-approved accepted ADR that selects a runner and lifecycle, records alternatives, and carries the repository score;
- precise future contracts for migration discovery, stable identity, ordering, metadata storage, `up`, `down`, pending/status reporting, source/build execution, local and test invocation, transactions, failure, recovery, concurrency, and diagnostics;
- an isolated-test handoff compatible with ADR-0011 and a future empty-PostgreSQL validation contract for TASK-004;
- approved-decision synchronization across the ADR index, implementation plan, system diagram, specification guidance, execution chronology, root status, plan index, and this living document; and
- documentation validation, negative artifact checks, and the universal closure gate.

TASK-002 does not include:

- installing Sequelize, Umzug, a TypeScript loader, the Sequelize CLI, PostgreSQL tooling, or any other dependency;
- creating or changing manifests, lockfiles, TypeScript build configuration, migration directories, runner source, migrations, models, fixtures, database containers, or root commands;
- connecting to PostgreSQL, running a migration, creating an ERD, importing the 15 characters, or calling the public Rick and Morty API;
- selecting the domain schema, GraphQL shape, Redis behavior, image-delivery strategy, frontend client, package manager, exact dependency versions, or deployment provider;
- marking any SPEC or HS example executable or passing; or
- starting TASK-003, TASK-004, TASK-005, or TASK-016 or changing their dependencies.

## Agent Collaboration Topology

When the repository's project-scoped agents are available, the primary coordinator should create one read-only `technology_researcher` instance for each credible strategy and give every instance the same repository inputs, comparison criteria, evidence standard, output template, and stopping condition. The initial assignments are source-executed programmatic Umzug, build-first programmatic Umzug, and compiled-artifact Sequelize CLI. Wait for all reports before synthesis. If one candidate is replaced as non-credible, document the evidence and give the replacement researcher the identical criteria.

As each researcher finishes, the primary coordinator must copy its decision-critical output into the Durable Research Record in Artifacts and Notes before marking the corresponding Progress item complete. Preserve the candidate, research date, upstream release or documentation version, primary-source URLs, criterion-level findings, unsupported or inferred claims, unknowns, substitution rationale when applicable, and preliminary disposition. Raw agent transcripts may remain session-local, but no fact needed to reconstruct the comparison may exist only in a transcript.

Pass the complete report set to `decision_analyst`. It must audit whether the reports are truly comparable, identify unsupported assumptions, construct the criteria matrix, rank the strategies, and return a recommendation plus an ADR outline. The primary thread reconciles conflicts and drafts the proposed ADR. Only then should `independent_reviewer` inspect the proposal and actual repository diff against TASK-002, DG-002, mapped requirements, accepted ADRs, SPEC/HS rules, and current evidence.

Before ADR drafting, append the decision analyst's normalized matrix, weighting or ranking method, gaps returned for more research, final ranking, recommendation, confidence, and dissenting evidence to the same Durable Research Record. Update Progress with the exact report and matrix completion times. This in-plan record is the restart point until the proposed ADR becomes the durable decision artifact.

The review loop is bounded to two supported correction cycles. A reviewer may return `PASS`, `PASS WITH FOLLOW-UPS`, `REVISE`, or `BLOCKED`; it cannot accept the ADR or resolve DG-002. If two correction cycles do not remove a blocker, stop and ask the project owner for direction. The primary thread remains the only writer and owns approval handling, authoritative synchronization, validation, and final closure.

## Plan of Work

### Milestone 1: Start the task and establish a collision-safe research baseline

At the Milestone 1 start, re-read the current documentation map and task authorities because TASK-003 or TASK-016 may have advanced since this plan was authored. Inspect the working tree and current ADR directory before editing. Before the start transition, confirm that TASK-002 is `Pending`, DG-002 is `Pending`, and no controlled artifact already exists; after the recorded start transition, a restart must instead confirm TASK-002 is `In progress` while DG-002 remains `Pending`. If the baseline changes, reconcile the authoritative owner before continuing this plan.

When decision execution actually begins, update TASK-002 to `In progress` in `docs/IMPLEMENTATION_PLAN.md` while leaving DG-002 `Pending`, then append an evidence-linked start entry to `docs/execution/decision-and-progress-log.md`. Do not change TASK-004 or imply that persistence implementation has begun.

Re-list `docs/adrs/` immediately before allocation. ADR-0011 is the highest allocated record at plan-authoring time, so sequence number `0012` is expected but not reserved. Coordinate with TASK-016 before creating a file. If another record claimed that number, use the next unused sequential number and update all new references consistently; never overwrite or renumber existing history.

Reconfirm current primary documentation for Sequelize, its CLI, Umzug, Node.js TypeScript execution, TypeScript ESM emit, and PostgreSQL transactions and advisory locks. Record exact versions or documentation release lines in each research report. Do not infer current behavior from tutorials, generated snippets, or a candidate's defaults.

### Milestone 2: Compare complete runner and artifact lifecycles

Evaluate the three initial strategy shapes against an identical rubric:

1. Programmatic Umzug loads strict TypeScript migration source through an explicitly selected source executor in local and test contexts. The report must state what executes in delivery/runtime validation and whether a build artifact also exists.
2. Programmatic Umzug loads emitted ESM JavaScript from a build-first migration artifact in local, test, and delivery contexts. TypeScript remains the authored source and is independently type-checked.
3. The supported Sequelize CLI release line loads compiled JavaScript migrations through its CLI configuration and metadata conventions while TypeScript remains the authored source.

For every strategy, report:

- compatibility with accepted Sequelize, PostgreSQL, ESM, strict TypeScript, Node.js, and workspace boundaries;
- direct and transitive tooling surface, version posture, maintenance burden, and Windows/CI behavior;
- exact authored-source root, emitted-artifact root, resolver base, file pattern, ordering, and protection against process-current-directory drift;
- a canonical migration identifier that is stable across `.ts` and `.js`, rejects duplicates, and does not reinterpret an applied migration after a build-layout change;
- metadata storage name, database/schema placement, uniqueness, history inspection, applied-file mutation policy, and any checksum or drift-detection choice;
- the typed migration contract and whether both `up` and `down` are mandatory and validated before execution;
- forward execution, no-pending behavior, last/step/target rollback semantics, unsafe bulk rollback guardrails, and failed-rollback recovery;
- per-migration versus per-command transactions, schema-plus-metadata atomicity, handling of PostgreSQL operations that cannot run inside a transaction block, and the state left by an interrupted process;
- whole-run concurrency behavior for the same database/schema, independent behavior for disjoint test namespaces, advisory-lock scope and key derivation, timeout or fail-fast semantics, cleanup, and operator diagnostics;
- exact future local, integration-setup, status, rollback, and emitted-runtime validation boundaries, including exit codes and which caller owns connection cleanup;
- parity between local and isolated tests, with no live public API or model synchronization involved;
- empty-database, repeat-up, rollback-and-reapply, injected-failure, metadata-drift, emitted-artifact, and two-run concurrency validation plans; and
- feasibility, proportionality, reversibility, residual risks, and the smallest TASK-004 implementation surface.

Do not treat successful schema DDL and successful metadata recording as the same event unless the candidate proves they share an atomic boundary. Do not treat Umzug `FileLocker`, a process-local mutex, or a unique metadata row as equivalent to cross-process database serialization. Do not assume that migration file ordering is numeric when the candidate's resolver sorts lexicographically. Do not assume that native Node TypeScript execution performs type checking or honors `tsconfig.json`.

After the research barrier, have `decision_analyst` normalize the evidence and identify any criteria that one report omitted. Return incomplete reports to their researchers instead of filling gaps with coordinator memory. The matrix must distinguish confirmed upstream behavior, repository-derived constraints, reasoned inference, and behavior that TASK-004 must prove at runtime.

At every stopping point during this milestone, update Progress and the Durable Research Record below. A report is not complete for planning purposes until its durable summary is present. The research barrier is not complete until all candidate summaries and the normalized matrix can be understood without access to agent transcripts or conversation history.

### Milestone 3: Draft, score, validate, and review the proposed ADR

Create the next unused ADR as `Proposed`. The title should describe the selected lifecycle, not merely name a package. Add it to `docs/adrs/README.md` as proposed without changing DG-002 or TASK-002 to complete and without altering optional-scope dispositions.

The ADR must summarize all candidate strategies, show the common criteria matrix, explain the recommendation, and score the proposal with the repository's 100-point rubric. A score of 85 through 100 supports `Accept`; 75 through 84 supports `Accept with explicit follow-ups and residual risks`; 60 through 74 requires revision while proposed; below 60 requires rejection. A high numeric score cannot override a mandatory requirement conflict, hidden high-impact assumption, missing measurable validation, or conflict with an accepted ADR.

Make the selected lifecycle self-contained. At minimum, the ADR must define:

- the runner library or repository-owned runner, its supported Sequelize release-line assumption, and why its public API is stable enough for TASK-004;
- the strict-TypeScript authoring contract, ESM module semantics, source and emitted paths, loader or build step, source-map/error behavior, and which artifact each local, test, and delivery command executes;
- canonical extension-neutral migration identity, deterministic discovery and ordering, duplicate and stale-build detection, and the rule for modifying an already-applied migration;
- one metadata-store contract, including table/schema ownership, transaction participation, drift observation, and recovery when metadata and schema disagree;
- typed `up` and `down` contracts, mandatory validation, query-interface/transaction context, and the policy for transaction-incompatible PostgreSQL operations;
- one forward policy, one explicit rollback policy, stop-on-first-failure behavior, exit and log semantics, partial-batch state, interrupted-process recovery, and failed-rollback recovery;
- a database-backed whole-command concurrency contract with key scope, connection ownership, wait/fail-fast behavior, bounded timeout, diagnostics, and guaranteed release, plus how disjoint test namespaces avoid blocking one another;
- future command-boundary names for local up, pending/status, bounded down, integration setup, and emitted-runtime validation, clearly labelled as planned interfaces until TASK-004 creates them;
- the callable interface that ADR-0011's migrated-state setup will invoke, its input PostgreSQL namespace, and cleanup ownership without activating the integration project in TASK-002;
- the TASK-004 validation matrix for empty database, idempotent second up, rollback/reapply, injected failure, duplicate/drift rejection, emitted runtime, two callers on one namespace, and two callers on disjoint namespaces;
- confirmation that migrations cannot call the public Rick and Morty API, import records, depend on API boot, call `sequelize.sync`, or derive the ERD before migrated state exists; and
- explicit follow-ups, operational limitations, rejected alternatives, and conditions that would require a superseding ADR.

The decision must say whether migrations are an explicit one-shot operation or can be invoked during another process lifecycle; it may not leave accidental API-startup migration as an implementation default. It must also say whether the selected metadata implementation can participate in the same transaction as schema changes. If not, describe the accepted consistency gap and exact detection/recovery procedure rather than claiming atomicity.

Run both repository validators and the whitespace check against the proposed state. Then give the proposed ADR and actual diff to `independent_reviewer`. Correct supported findings within scope and rerun validation after every correction. Stop after two unsuccessful review cycles and seek owner direction.

### Milestone 4: Obtain explicit project-owner approval

Present the project owner with the exact ADR path, selected strategy, rejected alternatives, supported Sequelize/tool release posture, source-versus-emitted policy, planned command boundaries, transaction and metadata model, rollback and failure semantics, whole-run lock behavior, isolated-test handoff, score, follow-ups, and residual risks. Ask for approval of that exact recommendation.

If the owner requests revision or rejects the recommendation, keep the ADR `Proposed`, TASK-002 `In progress`, and DG-002 `Pending`. Record the feedback in this plan's Decision Log and Progress, revise only supported sections, rerun the validators and review as warranted, and present the revised recommendation. Do not add implementation artifacts while approval is pending.

### Milestone 5: Resolve DG-002 and close TASK-002 after approval

Only after explicit owner approval, set the ADR to `Accepted` with the approval date and owner. Update `docs/adrs/README.md` so its index, portfolio narrative, architecture coverage, and references reflect the accepted lifecycle without changing requirement classifications.

Update the DG-002 row and definition-of-done section in `docs/IMPLEMENTATION_PLAN.md` to `Resolved` with a link to the accepted ADR. Mark TASK-002 `Complete` only when every TASK-002 definition-of-done condition and the universal documentation gate passes. Preserve task dependencies and leave TASK-004 `Pending` until separate execution evidence says otherwise.

Replace the generic DG-002 runner placeholder in `docs/SYSTEM_DIAGRAM.md` with the accepted boundary and keep it explicit that the module is target architecture rather than a running service. Update `docs/specs/README.md` to distinguish an accepted migration decision from executable migrated-state tests. Review HS-002 and convert its pending-gate prohibition into the accepted-decision invariant while preserving the stable ID; review HS-011, SPEC-010, SPEC-016, and HS-018 for affected routing or wording, but do not mark them executed or passing.

Append approval and completion chronology to `docs/execution/decision-and-progress-log.md`. Update the root README current status and this plan index to reflect accepted direction without claiming a runner exists. When TASK-002 is canonically complete and closure has passed, move this file to `docs/plans/completed/` with the same filename, preserve every living section and revision note, and repair all inbound links.

### Milestone 6: Audit relevance, validate documentation, and hand off

Perform the ADR-0010 test-relevance audit. Because TASK-002 is decision-only, the expected result is no added, changed, skipped, focused, weakened, or removed executable test and no fixture, migration helper, database harness, or Gherkin binding. If controlled implementation artifacts appear, stop closure and assign them to the correct downstream task rather than rationalizing them as decision evidence.

Run the ADR validator, documentation validator, `git diff --check`, authority-state searches, and negative artifact searches below. Inspect the final diff for English-only prose, stable IDs, valid links, unchanged task edges, unchanged requirement classifications, explicit owner approval, and honest evidence language. Update all living sections and the revision note at the stopping point.

## Concrete Steps

Run every command from the repository root, `C:\Users\mmjos\Desktop\workbeanch\rick-and-morty-test`, in PowerShell.

Before starting TASK-002, establish the current state:

    git status --short
    rg -n "TASK-002|DG-002|ADR-0011|HS-002|HS-011|SPEC-010|SPEC-016|HS-018" README.md docs/IMPLEMENTATION_PLAN.md docs/adrs docs/specs docs/execution docs/plans
    Get-ChildItem docs/adrs -File | Sort-Object Name | Select-Object -ExpandProperty Name
    rg --files -g "package.json" -g "pnpm-workspace.yaml" -g "*lock*" -g "*migration*" -g "*sequelize*" -g "*.ts" -g "*.tsx" -g "!docs/**"

At authoring time the final search produces no application manifest, lockfile, runner configuration, migration, Sequelize source, or executable TypeScript product code. Inspect any future result rather than deleting it; a newly valid artifact may belong to another task.

After drafting the proposed ADR and index entry, run:

    python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
    python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
    git diff --check

Both Python validators must exit 0 with no validation errors. `git diff --check` must exit 0 with no whitespace-error location; Windows line-ending conversion notices may be recorded as non-error diagnostics.

Before requesting approval, inspect the controlled decision and diff:

    rg -n "Status: Proposed|Recommendation:|Umzug|sequelize-cli|TypeScript|compiled|migration identity|SequelizeMeta|transaction|rollback|failure|advisory lock|concurr|empty database|public.*API" docs/adrs/<actual-adr-file>.md
    rg -n "DG-002.*Pending|TASK-002.*In progress|TASK-004.*Pending" docs/IMPLEMENTATION_PLAN.md
    git diff -- docs/adrs docs/IMPLEMENTATION_PLAN.md docs/SYSTEM_DIAGRAM.md docs/specs docs/execution README.md docs/plans

Replace `<actual-adr-file>` with the allocated filename. The pre-approval diff must leave DG-002 pending and TASK-004 pending and must contain no implementation artifact.

After approval and authoritative synchronization, run:

    rg -n "DG-002.*Resolved|TASK-002.*Complete|TASK-004.*Pending" docs/IMPLEMENTATION_PLAN.md
    rg -n "Status: Accepted|FR-BE-003|FR-BE-004|NFR-003|DEL-002|AC-009|AC-012|OR-001" docs/adrs/<actual-adr-file>.md
    rg -n "Specified, not executed|not.*implemented|no.*runner|no.*migration" README.md docs/specs/README.md docs/plans/completed/TASK-002-sequelize-migration-lifecycle-decision.md
    rg -n "\.only\(|\.skip\(|test\.only|test\.skip|describe\.only|describe\.skip" --glob "*.ts" --glob "*.tsx" .
    rg --files -g "package.json" -g "pnpm-workspace.yaml" -g "*lock*" -g "*migration*" -g "*sequelize*" -g "*.ts" -g "*.tsx" -g "!docs/**"
    python .agents/skills/govern-adrs/scripts/validate_adrs.py --repo .
    python .agents/skills/verify-repository/scripts/validate_docs.py --repo .
    git diff --check
    git status --short

The skipped/focused-test search is expected to have no matches and may exit 1. The artifact search is also expected to have no matches in the TASK-002 diff; if another authorized task has added an artifact, inspect its ownership and exclude it from TASK-002 evidence instead of claiming a clean global tree. Validators and `git diff --check` must exit 0.

## Validation and Acceptance

TASK-002 passes only when all of the following are observable together:

- The next unused ADR is explicitly accepted by the project owner, compares at least three credible runner/artifact lifecycle strategies against the same evidence-backed criteria, carries the repository score and recommendation, and makes one clear selection.
- The accepted ADR defines the runner, supported release posture, strict-TypeScript/ESM authoring boundary, source-versus-emitted execution policy, stable logical migration identity, deterministic discovery/order, metadata storage and drift policy, and planned local/test/delivery interfaces.
- Forward, no-op, rollback, partial failure, interruption, failed rollback, metadata mismatch, and recovery behavior are unambiguous. Transactional and nontransactional PostgreSQL operations have an explicit policy.
- Concurrent execution against one namespace has a database-backed whole-command serialization contract with bounded behavior and diagnostics, while disjoint ADR-0011 test namespaces can proceed independently.
- TASK-004 can implement falsifiable empty-database, second-up, down/up, injected-failure, emitted-runtime, same-namespace concurrency, and disjoint-namespace concurrency checks without inventing unresolved semantics.
- The decision preserves version-controlled Sequelize migrations as schema authority, forbids public-API calls and `sequelize.sync`, separates import, and defers the ERD until migrated state exists.
- The ADR index, canonical DG-002 and TASK-002 records, system diagram, specification guidance, root status, plan index, execution chronology, and this living plan agree while TASK-004 remains pending and no runner is described as implemented.
- The relevance audit finds no TASK-002 implementation or executable-test artifact, and the ADR validator, documentation validator, and `git diff --check` pass exactly as described in Concrete Steps.

No Red-Green-Refactor cycle applies to TASK-002 because it changes architectural and planning documentation only and must not add production behavior. Owner approval, the ADR rubric, documentation validators, authority-state checks, and negative artifact searches are its executable evidence. TASK-004 will own the first failing migration integration test and the minimal runner and migration implementation that makes it pass.

## Idempotence and Recovery

All discovery and validation commands are safe to repeat. Documentation edits must be additive or in-place and preserve historical records. Correct validator failures only at the reported path, anchor, ID, metadata, or authority mismatch, then rerun the same check.

Always re-list ADR files before creating the proposed record. If TASK-016 or another task claims the expected number, allocate the next unused sequential number, repair only the new links, and record the collision in Surprises & Discoveries and Decision Log. Never rename, overwrite, or delete an existing ADR to recover a preferred number.

If work pauses before owner approval, leave the ADR `Proposed`, TASK-002 `In progress`, DG-002 `Pending`, and TASK-004 `Pending`. Record the exact research, review, validation, and approval state in Progress. If the owner rejects the proposal, preserve it according to the ADR lifecycle and record the next action without implementing a fallback silently.

If authority synchronization is partially applied after approval, use `git diff`, the acceptance list, and the execution chronology to repair forward. Do not use `git reset --hard`, rewrite the historical TASK-001 plan or dated reviews, delete an accepted record, or reuse its number. Reversing an accepted lifecycle requires a later superseding ADR.

If a candidate cannot make schema and metadata changes atomic, the research and ADR must surface the gap and recovery path. Do not conceal it with a broad retry instruction: repeated DDL after a partial failure can itself be destructive. If concurrency validation exposes a lock leak, ambiguous timeout, or cross-schema collision, keep the gate pending until the contract is corrected.

## Artifacts and Notes

At plan-authoring time, the relevant tracked-tree baseline is:

    Highest allocated ADR: docs/adrs/superseded/0011-define-the-typescript-test-harness.md
    TASK-002 status: Pending
    DG-002 status: Pending
    TASK-004 status: Pending
    Application manifests: none
    Sequelize or migration configuration: none
    Migration source or emitted artifacts: none
    Executable product tests: none
    ERD: none
    Application scaffold: none

Reconfirm these primary sources immediately before ADR drafting because tool support and release posture can change:

- [Sequelize v7 CLI documentation](https://sequelize.org/docs/v7/cli/) for the current warning, migration/undo surface, and programmatic Umzug direction.
- [Sequelize v6 migration documentation](https://sequelize.org/docs/v6/other-topics/migrations/) for the stable CLI lifecycle, `SequelizeMeta`, `up`/`down`, and explicit transaction examples.
- [Sequelize transaction documentation](https://sequelize.org/docs/v6/other-topics/transactions/) for managed and unmanaged transaction behavior and the fact that transactions are not automatic.
- [Umzug repository documentation](https://github.com/sequelize/umzug) and current source for TypeScript loading, migration resolution and identity, sequential execution, Sequelize storage, errors, CLI behavior, and `FileLocker` limits.
- [PostgreSQL transaction documentation](https://www.postgresql.org/docs/current/tutorial-transactions.html), [CREATE INDEX documentation](https://www.postgresql.org/docs/current/sql-createindex.html), [explicit-locking documentation](https://www.postgresql.org/docs/current/explicit-locking.html), and [advisory-lock functions](https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS) for atomicity limitations and session-versus-transaction lock semantics.
- [Node.js TypeScript documentation](https://nodejs.org/api/typescript.html) and the [TypeScript module reference](https://www.typescriptlang.org/docs/handbook/modules/reference) for native source-execution limits, ESM format rules, and emitted import behavior.

Summarize decision-critical facts inside the ADR so it remains understandable if an external page moves. Cite only primary project documentation for technology behavior. Mark inferences as inferences and reserve runtime claims for TASK-004 evidence.

### Durable Research Record

This subsection was intentionally empty at plan creation and is filled during TASK-002 execution. It is the durable restart boundary between ephemeral research sessions and the proposed ADR. Do not mark a researcher or analysis step complete in Progress until the corresponding entry is present here.

For each candidate, append a summary with this structure:

    Candidate: <strategy name>
    Research completed: <YYYY-MM-DD HH:MMZ>
    Upstream release/documentation posture: <versions or dated documentation lines>
    Primary sources: <direct URLs>
    Criterion results: <concise findings for every common criterion>
    Repository fit: <confirmed constraints and reasoned inferences, labelled separately>
    Unknowns and runtime proofs: <what remains for the ADR or TASK-004>
    Substitution or exclusion rationale: <if applicable>
    Preliminary disposition and confidence: <advance/reject plus confidence>

#### Compiled-artifact Sequelize CLI

- **Candidate:** Supported Sequelize 6 CLI executing clean-build ESM JavaScript migrations authored in strict TypeScript.
- **Research completed:** 2026-08-10 22:42Z.
- **Upstream release/documentation posture:** Sequelize 6 remains the current stable line with undetermined end of life, and sequelize-cli 6.6.5 is the latest published and released v6 CLI. Sequelize 7 and its CLI remain alpha; official v7 documentation says its CLI is not ready and directs CLI users to remain on v6 or use Umzug or another migration tool. The published 6.6.5 release metadata and the current source package version are inconsistent, so TASK-004 must verify the exact locked package rather than infer it from a branch.
- **Primary sources:** [Sequelize releases](https://sequelize.org/releases/), [v7 CLI posture](https://sequelize.org/docs/v7/cli/), [v6 migrations](https://sequelize.org/docs/v6/other-topics/migrations/), [v6 transactions](https://sequelize.org/docs/v6/other-topics/transactions/), [sequelize-cli 6.6.5 release](https://github.com/sequelize/cli/releases/tag/v6.6.5), [current CLI migrator](https://raw.githubusercontent.com/sequelize/cli/main/src/core/migrator.js), [CLI path resolution](https://raw.githubusercontent.com/sequelize/cli/main/src/helpers/path-helper.js), [CLI migration types](https://raw.githubusercontent.com/sequelize/cli/main/types.d.ts), [Umzug 2 execution](https://raw.githubusercontent.com/sequelize/umzug/v2.3.0/src/index.js), [Umzug 2 loading and identity](https://raw.githubusercontent.com/sequelize/umzug/v2.3.0/src/migration.js), [Umzug 2 SequelizeStorage](https://raw.githubusercontent.com/sequelize/umzug/v2.3.0/src/storages/SequelizeStorage.js), [Node.js CommonJS and ESM interoperability](https://nodejs.org/api/modules.html), [TypeScript module reference](https://www.typescriptlang.org/docs/handbook/modules/reference), [PostgreSQL transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html), [CREATE INDEX](https://www.postgresql.org/docs/current/sql-createindex.html), [explicit locking](https://www.postgresql.org/docs/current/explicit-locking.html), and [advisory-lock functions](https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS).
- **Criterion results:** The option fits only an explicit Sequelize 6 release posture. Strict TypeScript can author mandatory `up` and `down` modules, but clean emitted `.js` execution as ESM depends on a sufficiently recent Node target, no top-level await, and runtime proof because the CLI excludes `.mjs` and its Umzug 2 loader uses synchronous `require()`. Roots and relative options are process-working-directory-sensitive; discovery is broad, order is lexicographic, and native identity is the extension-bearing emitted basename. `SequelizeMeta` gives a configurable table/schema and unique name history but no checksum, authored/emitted mapping, or applied-file mutation detection. Umzug 2 calls migration code and records or deletes metadata afterward, so schema and metadata are not an atomic unit. The CLI supplies forward, status, no-pending, last, named, target, and bulk undo primitives, but the repository must expose only bounded rollback and must preflight both methods before mutation. Transactions remain explicit per migration; there is no command transaction, and transaction-incompatible PostgreSQL operations require a declared policy. No database-backed whole-command serialization exists. A root-owned wrapper would have to hold a namespace-derived session advisory lock on a dedicated connection across the CLI process with bounded acquisition, diagnostics, `finally` release, and disjoint-schema independence. Clean build, absolute emitted root, duplicate/stale/checksum checks, wrapper exit/cleanup semantics, and local/test/delivery parity are all repository-owned. No migration may call the public API, import data, start the API, or use model synchronization as application-schema authority; the CLI's internal metadata-table synchronization requires an explicit narrow policy. TASK-004 can test empty up, second-up no-op, bounded down/up, injected schema and metadata failures, failed rollback, stale and altered artifacts, emitted ESM loading, wrong working directory, same-namespace contention, disjoint concurrency, interruption, and cleanup. The option is feasible and familiar but less proportional than its visible commands suggest because the safety wrapper is material.
- **Repository fit:** Confirmed constraints are PostgreSQL, version-controlled Sequelize migrations, strict TypeScript and ESM source, network-free schema changes, a separate importer, isolated test namespaces, real PostgreSQL evidence, and an ERD deferred until migrated state exists. Reasoned inference: a recent Node target, explicit Sequelize 6 pin, clean emitted root, checksum preflight, and namespace-derived advisory lock could satisfy the repository contract; none is yet accepted or implemented.
- **Unknowns and runtime proofs:** Exact Node and dependency versions; authored and emitted roots; metadata schema; checksum format; lock key and timeout; Windows and continuous-integration interruption behavior; ESM graph compatibility; clean-build enforcement; metadata-write and metadata-delete failure recovery; same-namespace and disjoint-namespace concurrency; process exit and connection cleanup; and whether the accepted `sequelize.sync()` prohibition permits the CLI's internal metadata-table synchronization.
- **Substitution or exclusion rationale:** Retain the candidate because Sequelize 6 and sequelize-cli 6.6.5 remain a current supported pairing. Exclude it and commission the typed repository-owned QueryInterface replacement only if the project selects Sequelize 7, requires `.mjs`, forbids all metadata `.sync()` use, or judges the necessary wrapper disproportionate.
- **Preliminary disposition and confidence:** Advance as a conditional comparator but do not preliminarily select it; medium-high confidence.

#### Build-first programmatic Umzug

- **Candidate:** Programmatic Umzug executing clean-build emitted ESM JavaScript in local, isolated-test, and delivery contexts, with strict TypeScript as authored source and an independent no-emit check.
- **Research completed:** 2026-08-10 22:45Z coordinator receipt; the researcher recorded the 2026-08-10 completion date but could not expose its exact internal completion minute.
- **Upstream release/documentation posture:** Sequelize 6 remains the current stable line and npm reports 6.37.8; Sequelize 7 remains alpha and its CLI documentation directs migration users toward Umzug. Umzug 3.8.3 is the current release from 2026-05-01, requires Node 12 or newer, and includes the preceding Windows ESM/current-working-directory fix. Current Node documentation lists v26.7.0 as Current and v24.19.0 as the latest LTS. PostgreSQL current documentation is version 18.
- **Primary sources:** [Sequelize releases](https://sequelize.org/releases/), [v7 CLI posture](https://sequelize.org/docs/v7/cli/), [v6 migrations](https://sequelize.org/docs/v6/other-topics/migrations/), [v6 transactions](https://sequelize.org/docs/v6/other-topics/transactions/), [Umzug 3.8.3 release](https://github.com/sequelize/umzug/releases/tag/v3.8.3), [Umzug documentation](https://github.com/sequelize/umzug#readme), [Umzug package manifest](https://raw.githubusercontent.com/sequelize/umzug/v3.8.3/package.json), [resolver and execution source](https://raw.githubusercontent.com/sequelize/umzug/v3.8.3/src/umzug.ts), [Umzug types](https://raw.githubusercontent.com/sequelize/umzug/v3.8.3/src/types.ts), [storage contract](https://raw.githubusercontent.com/sequelize/umzug/v3.8.3/src/storage/contract.ts), [SequelizeStorage](https://raw.githubusercontent.com/sequelize/umzug/v3.8.3/src/storage/sequelize.ts), [Node.js releases](https://nodejs.org/en/about/previous-releases), [Node.js TypeScript execution](https://nodejs.org/api/typescript.html), [Node.js ESM](https://nodejs.org/api/esm.html), [TypeScript module reference](https://www.typescriptlang.org/docs/handbook/modules/reference.html), [TypeScript module option](https://www.typescriptlang.org/tsconfig/module.html), [PostgreSQL transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html), [CREATE INDEX](https://www.postgresql.org/docs/current/sql-createindex.html), [explicit locking](https://www.postgresql.org/docs/current/explicit-locking.html#ADVISORY-LOCKS), [advisory-lock functions](https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS), and [pg_locks](https://www.postgresql.org/docs/current/view-pg-locks.html).
- **Criterion results:** Programmatic Umzug fits Sequelize, PostgreSQL, strict TypeScript, ESM, and the modular workspace without inheriting the v7 CLI limitation; exact versions remain downstream evidence. It adds Umzug and five direct runtime dependencies but no TypeScript source loader. The candidate authors migrations under `apps/api/src/infrastructure/database/migrations`, clean-builds `*.js` into the corresponding `dist` root, derives discovery from the emitted runner's `import.meta.url`, and sorts one fixed-width lower-case timestamp-ID directory lexicographically without process-working-directory dependence. A custom resolver strips the physical extension; a clean-build manifest records one-to-one source and emitted SHA-256 values, rejects malformed or duplicate IDs, stale artifacts, unknown/non-prefix history, and changed applied migrations before database access. Built-in SequelizeStorage is rejected because it uses model synchronization, has no checksum, and does not join the migration transaction. A schema-qualified custom storage records the canonical name, source and emitted checksums, and application time through the same transaction used by migrations. Repository-owned types and runtime preflight require both `up` and `down`. Forward applies all pending migrations; an empty set is a successful diagnosed no-op. Down defaults to the last migration, permits only explicitly bounded step or target rollback, and does not expose unrestricted `to: 0`, arbitrary rerun, or out-of-order selection. One PostgreSQL transaction encloses the complete up, down, or status command, every migration query, metadata-table creation and write, and one transaction-level advisory lock. This makes failure or interruption roll back the selected batch and metadata together; ambiguous commit loss requires reconnecting and running locked status. The initial lifecycle prohibits transaction-incompatible operations such as `CREATE INDEX CONCURRENTLY`; adding them requires a superseding decision and a non-atomic recovery design. A deterministic signed 64-bit key derived from the canonical schema namespace uses bounded `pg_try_advisory_xact_lock` polling and reports a stable lock-timeout error; transaction completion guarantees release, and different schema keys allow disjoint integration runs. Root/workspace local up, status, bounded down, ADR-0011 integration setup, emitted-artifact validation, and delivery one-shot execution all delegate to one factory and run native emitted ESM with source maps. The factory closes only connections it creates, while the integration wrapper owns namespace lifecycle. Success and no-op return zero; usage, artifact, drift, connection, lock, migration, rollback, metadata, and cleanup failures return nonzero without public API access, API-startup migration, import, Redis, or model synchronization. TASK-004 must prove empty, repeat, bounded rollback/reapply, injected migration/metadata/interruption failure, drift and stale-build rejection, native ESM across working directories and Windows, same-namespace serialization, disjoint overlap, timeout diagnostics, exit propagation, connection release, and scoped cleanup. The design is proportionate only if these explicit custom boundaries remain small and focused.
- **Repository fit:** Confirmed constraints are strict TypeScript/ESM, PostgreSQL, Sequelize migrations as schema authority, transparent commands, network-free schema work, separate import, isolated namespaces, real PostgreSQL evidence, and ERD deferral. Reasoned candidate details are the exact source/dist roots, timestamp ID grammar, manifest and checksum shape, custom storage table, whole-command transaction, lock derivation, command names, and error contract; they are neither accepted nor implemented.
- **Unknowns and runtime proofs:** Final Node, TypeScript, Sequelize, package-manager, and PostgreSQL versions; ESM/CommonJS package interoperability; Windows paths and source maps; deterministic checksums across compiler upgrades; custom-storage atomicity; connection and interruption cleanup; same/disjoint concurrency; lock-timeout diagnostics; transaction duration; and detection of manual schema mutation or deletion of the last metadata row.
- **Substitution or exclusion rationale:** Retain this candidate. Exclude built-in SequelizeStorage and FileLocker from its credible contract because they do not satisfy the no-sync, checksum, atomicity, or database-wide serialization criteria.
- **Preliminary disposition and confidence:** Advance conditionally to normalized analysis with 0.84 medium-high confidence. Reverse if emitted ESM fails on the selected runtime, custom storage cannot share the transaction, advisory locking leaks or is bypassed, immediate nontransactional DDL is required, or manifest maintenance proves disproportionate.

#### Source-executed programmatic Umzug

- **Candidate:** Programmatic Umzug with strict TypeScript migrations executed through `tsx` in local and isolated-test setup, plus native emitted ESM JavaScript in delivery and emitted-runtime validation.
- **Research completed:** 2026-08-10 22:42Z.
- **Upstream release/documentation posture:** Sequelize 6 remains current and Sequelize 7 alpha; the v7 CLI is explicitly not ready and suggests Umzug. Umzug 3.8.3 is the current latest release and has its strongest documented Sequelize fit on v6. `tsx` 4.23.1 is the latest 2026-07-13 release, requires Node 18 or newer, and uses esbuild. The researcher observed Node 24.18 LTS and Node 26.5 Current and PostgreSQL current documentation version 18; exact repository targets remain unselected.
- **Primary sources:** [Sequelize releases](https://sequelize.org/releases/), [v7 CLI posture](https://sequelize.org/docs/v7/cli/), [Sequelize transactions](https://sequelize.org/docs/v6/other-topics/transactions/), [Umzug documentation](https://github.com/sequelize/umzug), [Umzug releases](https://www.npmjs.com/package/umzug?activeTab=versions), [Umzug resolver and execution source](https://raw.githubusercontent.com/sequelize/umzug/main/src/umzug.ts), [Umzug types](https://raw.githubusercontent.com/sequelize/umzug/main/src/types.ts), [SequelizeStorage](https://raw.githubusercontent.com/sequelize/umzug/main/src/storage/sequelize.ts), [FileLocker](https://raw.githubusercontent.com/sequelize/umzug/main/src/file-locker.ts), [tsx releases](https://github.com/privatenumber/tsx/releases), [tsx developer API](https://tsx.is/dev-api/), [Node.js TypeScript execution](https://nodejs.org/api/typescript.html), [Node.js releases](https://nodejs.org/en/about/previous-releases), [TypeScript module reference](https://www.typescriptlang.org/docs/handbook/modules/reference), [relative-import rewriting](https://www.typescriptlang.org/tsconfig/#rewriteRelativeImportExtensions), [PostgreSQL transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html), [CREATE INDEX](https://www.postgresql.org/docs/current/sql-createindex.html), [explicit locking](https://www.postgresql.org/docs/current/explicit-locking.html), [advisory-lock functions](https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS), and [lock timeout](https://www.postgresql.org/docs/current/runtime-config-client.html#GUC-LOCK-TIMEOUT).
- **Criterion results:** The option fits PostgreSQL, Sequelize, strict ESM TypeScript, and the modular workspace with strongest current evidence on Sequelize 6. It adds Umzug and development-only `tsx`/esbuild; `node --import=tsx` avoids shell-specific launchers, but Windows, dynamic import, diagnostics, and cleanup remain proofs. Authored `*.migration.ts` and emitted `*.migration.js` roots are derived from each runner's `import.meta.url`, never the process working directory. A fixed 14-digit timestamp plus kebab-case logical ID sorts by ASCII code-point order and strips the physical suffix; discovery preflight rejects malformed, duplicate, inserted-before-history, unknown, and non-prefix states. Normalized source SHA-256 and a clean-build manifest pairing source and emitted hashes reject modified applied source, missing or extra build output, and stale delivery artifacts. Built-in resolution, optional `down`, SequelizeStorage, and FileLocker are excluded. A schema-local custom history table records canonical ID, source checksum, and application time through the same whole-command managed transaction as migration DDL; status treats a missing table as empty without mutation. Repository-owned types and runtime validation require asynchronous `up` and `down` with QueryInterface, schema, and transaction context before execution starts. Up applies all pending migrations or succeeds with an empty applied list. Public down reverts exactly the last migration; multi-step, arbitrary list, target, and all rollback are rejected for the initial lifecycle. Stop-on-first-failure rolls back schema and metadata; ambiguous commit loss forbids automatic retry until locked status inspects history. One transaction covers the entire command, giving metadata atomicity and a transaction-level lock lifetime while intentionally prohibiting `CREATE INDEX CONCURRENTLY` and other nontransactional operations until a superseding policy. Before discovery or mutation, bounded polling of `pg_try_advisory_xact_lock` obtains a signed 64-bit key derived from a fixed application namespace plus normalized database/schema identity; same namespace serializes, disjoint schemas normally do not, timeout diagnostics omit credentials, and transaction or session end releases the lock. Planned local and integration commands use `node --enable-source-maps --import=tsx` over the source runner; the ADR-0011 wrapper passes its allocated namespace and owns namespace cleanup. A clean API build emits the runner, migrations, source maps, and integrity manifest; delivery and emitted validation use native Node on the `dist` command and never load TypeScript or `tsx`. Success, no-op, and status return zero; validation, execution, and cleanup failure return one; lock timeout returns two. Migration is an explicit one-shot boundary with no public API request, importer, Redis, GraphQL, API startup hook, seed behavior, or model synchronization. TASK-004 must prove empty up, second no-op, one-step down/up, module and identity rejection, source/emitted drift, injected up/down/metadata/interruption failure, timeout, same-namespace serialization, disjoint concurrency, native emitted execution, source maps, exits, connection cleanup, and scoped teardown. The surface remains bounded but is larger than defaults because it owns the resolver, preflight, storage, manifest, lock, command, and both runtime-path tests.
- **Repository fit:** Confirmed constraints are Sequelize migrations on PostgreSQL, strict ESM TypeScript, transparent root/workspace invocation, network-free migrations, separate import, isolated namespaces, real PostgreSQL integration evidence, and deferred ERD. Reasoned candidate details are the physical paths, `tsx` executor, history table, one-command transaction, one-step rollback, 30-second lock deadline, hash manifest, and exit partition; none is accepted or implemented.
- **Unknowns and runtime proofs:** Exact Node, TypeScript, Sequelize, PostgreSQL image, package manager, and build layout; Umzug compatibility with selected patches; Windows and continuous-integration `tsx` and ESM behavior; native emitted loading and source maps; clean-build integrity; QueryInterface transaction propagation; storage bootstrap and rollback; interruption and ambiguous commit recovery; advisory lock acquisition, timeout, release, diagnostics, and same/disjoint concurrency; and whether any initial DDL needs a transaction-incompatible operation.
- **Substitution or exclusion rationale:** Retain the candidate. Exclude Umzug's default resolver, built-in storage, optional rollback, filename identity, and FileLocker because they do not meet the extension-neutral identity, mandatory-down, checksum, atomicity, or database-serialization contract.
- **Preliminary disposition and confidence:** Advance to normalized comparison with 0.78 medium-high confidence. Confidence falls if Sequelize 7 is chosen without support, metadata cannot share the command transaction, Windows/CI source execution is unreliable, native emitted execution diverges, or nontransactional DDL becomes necessary.

After every candidate summary is present, replace the placeholders in this matrix and add rows if the decision analyst identifies another material criterion:

| Criterion | Source-executed programmatic Umzug | Build-first programmatic Umzug | Compiled-artifact Sequelize CLI or recorded replacement | Evidence class or unresolved gap |
|---|---|---|---|---|
| Accepted architecture and release-line fit | Fits PostgreSQL, Sequelize 6, strict TypeScript/ESM, and Umzug 3, but adds a source runtime unused in delivery. | Same fit with one native emitted runtime for every context. | Credible only on Sequelize 6; the v7 CLI is not ready and the v6 lifecycle is less aligned with the repository-owned typed boundary. | Repository/release facts confirmed; exact patches remain TASK-004 proof. |
| TypeScript source, ESM, and emitted-artifact honesty | `tsx` locally/tests and native emitted ESM in delivery create two execution modes that both require proof. | Strict source plus no-emit check; clean emitted ESM runs locally, in tests, and in delivery. | Emitted `.js` depends on the CLI's synchronous Umzug 2 `require()` path, recent Node interoperability, and no top-level await; `.mjs` is excluded. | Loader behavior confirmed upstream; parity is runtime proof. |
| Stable identity, discovery, order, and drift detection | Module-relative roots, fixed timestamp/kebab ID, extension-neutral resolver, source checksum, and source/emitted manifest; rejects malformed, duplicate, stale, unknown, non-prefix, and changed source. | Same controls with the clean emitted root as the only execution root and a one-to-one source/output manifest. | Native identity includes the emitted extension; discovery is broad and CWD-sensitive; every safe identity, stale, duplicate, and checksum control needs a wrapper. | Candidate design; Windows/filesystem behavior remains TASK-004 proof. |
| Metadata and transaction consistency | Custom schema-local history with canonical ID, source checksum, and applied time in the whole-command transaction; missing-table status is read-only empty. | Same custom storage, with source checksum as logical identity and emitted checksum as build evidence; status is read-only and non-mutating. | Name-only SequelizeMeta uses model synchronization and logs after migration code, so schema and metadata are not atomic through the supported CLI lifecycle. | Upstream defaults confirmed; custom atomicity remains runtime proof. |
| Forward, rollback, failure, and recovery semantics | All pending or diagnosed no-op; last-only down; whole-batch rollback; locked status after ambiguous commit; nontransactional DDL prohibited. | All pending or no-op; last-by-default plus explicitly bounded step/target down; same atomic failure/recovery posture; nontransactional DDL prohibited. | Broad CLI primitives require suppression; per-migration authored transactions permit partial batches and metadata ambiguity. | Policy is proposed; failure paths remain TASK-004 proof. |
| Same-namespace serialization and disjoint-run concurrency | Namespace-derived signed 64-bit transaction advisory lock, bounded polling, transaction-end release, disjoint schema keys. | Same lock shares the whole-command transaction naturally. | No database command lock; a dedicated wrapper connection must hold a session lock across a child process, adding interruption and cleanup risk. | PostgreSQL lock lifetime confirmed; derivation, timeout, diagnostics, and concurrency remain runtime proof. |
| Local, test, and delivery invocation parity | One factory but transformed source locally/tests and native output in delivery; ADR-0011 supplies namespace and owns cleanup. | Root/workspace, ADR-0011 setup, emitted validation, and delivery use one factory and native emitted ESM. | Emitted execution is possible but adds CWD/config resolution and wrapper/child exit and connection ownership. | Interfaces are proposed; invocation and cleanup remain runtime proof. |
| Dependency surface, proportionality, and maintainability | Umzug plus development-only `tsx`/esbuild and custom resolver, storage, manifest, lock, and commands; fast feedback but two runtimes. | Umzug plus the same focused safety boundary but no TypeScript loader and only one runtime. | Familiar commands conceal Umzug 2 plus checksum, lock-holder, command filter, process wrapper, and ESM adapter; highest effective complexity. | Dependency posture is upstream fact; proportionality is qualitative judgment. |
| Validation feasibility and residual risk | Must validate transformed source and native output, including Windows divergence. | Concentrates validation on one emitted runtime; clean build, custom storage, lock, and Windows still need proof. | Widest proof surface: child process, loader interoperability, CWD, non-atomic history, metadata sync, session-lock interruption, and cleanup. | All behavioral outcomes belong to TASK-004. |
| Boundary, ownership, and forbidden coupling | Private factory/context/storage/lock/commands; factory closes only owned connections; no public API, import, API startup, Redis, GraphQL, or synchronization. | Same, with clean build feeding the sole execution artifact and harness owning namespace lifecycle. | Wrapper must enforce every prohibition and define a metadata-synchronization exception to retain built-in storage. | Prohibitions are repository facts; enforcement remains runtime proof. |

#### Decision analysis

- **Comparability audit:** Complete. Every candidate addresses the full common rubric. The analysis corrected stale non-decision-bearing Node observations, reconciled `main` citations with Umzug 3.8.3, retained the CLI release/source-version inconsistency as a TASK-004 locking risk, and surfaced real policy differences in rollback breadth, status mutation, and checksum roles. No material report was returned for more research.
- **Ranking method:** Apply the ADR rubric's hard acceptance gates first, then use qualitative dominance under the rubric maxima: requirements traceability 20, architectural fit 20, feasibility/proportionality 15, quality attributes 10, verifiability 10, and evolution/reversibility 10. Treat the 15-point options/trade-offs row as ADR-document quality shared by the comparison rather than as a technology score. Prefer dominance in the two 20-point areas, then break close results with the lower-weight areas; do not invent numerical precision before runtime proof.
- **Ordered result:** (1) build-first programmatic Umzug, (2) source-executed programmatic Umzug, (3) compiled-artifact Sequelize 6 CLI.
- **Recommendation and confidence:** Propose build-first programmatic Umzug executing clean-build native ESM in local, isolated integration, emitted validation, and delivery contexts. Confidence is medium-high: upstream behavior and repository fit are strong, but TASK-004 must prove emitted loading, custom-storage atomicity, failure recovery, Windows/current-working-directory behavior, and advisory-lock concurrency.
- **Dissenting evidence:** Source execution gives faster Red feedback and may become preferable if measured build latency is material and both source/emitted paths prove reliable. The CLI offers familiar commands but becomes preferable only if its exact lock proves ESM and the owner accepts its metadata synchronization, per-migration atomicity, and wrapper complexity. Build-first still owns meaningful custom resolver, preflight, manifest, storage, transaction, lock, and command code.
- **Assumptions and residual risks:** TASK-003 selects a supported stable Node target; TASK-004 uses stable Sequelize 6; initial migrations require no transaction-incompatible DDL; every entry point uses the same private factory; clean-build latency remains proportionate; custom storage can share the command transaction. Long transactions, advisory-key hash collision, ambiguous commit outcome, compiler-induced emitted changes, manual schema mutation, missing latest history, metadata bootstrap, and non-mutating status all remain explicit risks.
- **Reversal triggers:** Emitted ESM fails on the selected Node/Windows/continuous-integration target; build/manifest maintenance is disproportionate; storage cannot share the transaction; same-namespace overlap or lock leakage occurs; disjoint namespaces cannot overlap; required DDL is nontransactional; build latency materially harms TDD and source execution proves equal reliability; Sequelize 7 becomes required without compatible behavior; or a later CLI supplies typed ESM, atomic checksummed storage, and database locking with materially less surface.
- **Returned research gaps:** None material. Exact versions, runtime behavior, filesystem behavior, checksum determinism, failure injection, locking, exits, and cleanup are TASK-004 proofs. The ADR must explicitly choose read-only status, checksum authority, rollback bounds, lock-timeout policy, and nontransactional-DDL posture.
- **Proposed ADR outline:** `Context` states DG-002, requirement and adopted-option scope, docs-only evidence, and consequential lifecycle questions. `Decision drivers` captures accepted ADR compatibility, native ESM, deterministic identity, atomic history, bounded recovery, isolated concurrency, transparent commands, and measurable validation. `Considered options` preserves this matrix, weighting method, ranking, and dissent. `Decision` selects Umzug 3 with stable Sequelize 6; clean emitted ESM everywhere; strict source/no-emit; module-relative roots; timestamp/kebab IDs; source-logical and emitted-build checksums; mandatory runtime-validated `up`/`down`; custom schema-local storage; read-only status; all-pending/no-op up; bounded down; one mutating-command transaction; namespace advisory lock; prohibited nontransactional DDL; explicit failures, exits, and ownership; and no public API, import, Redis, GraphQL, API-startup migration, or synchronization. `Consequences` records parity and atomicity benefits plus build latency, custom code, long transactions, manifest maintenance, and no online DDL. `Risks and mitigations` records residuals and reversal triggers. `Validation` assigns every runtime proof to TASK-004 and distinguishes documentation validation from implementation. `Evaluation` scores the exact draft under all seven repository rows. `References` uses exact repository authorities and pinned primary sources.
- **Owner-controlled proposal choices:** Recommend last-by-default plus explicitly bounded step/target rollback; strictly read-only status; categorical initial prohibition of transaction-incompatible DDL; source checksum as durable applied identity and emitted checksum as clean-build evidence; bounded configurable lock timeout whose exact default TASK-004 records; and stable Sequelize 6 while v7 remains alpha. These choices remain unapproved until the project owner accepts the exact proposed ADR.

## Interfaces and Dependencies

ADR-0012 defines the following future interfaces; TASK-002 created none of them:

- one migrator factory or CLI construction boundary and the configured Sequelize instance, QueryInterface, connection, database/schema, logger, and migration-root inputs it owns;
- one typed migration module contract with required `up` and `down` operations and explicit transaction/context parameters;
- one stable migration-name format independent of authored or emitted extension, one deterministic ordering rule, and validation for duplicate or altered entries;
- one database metadata-store contract and its atomicity or recovery relationship with schema DDL;
- one whole-command lock contract and its key derivation, connection lifetime, timeout, failure result, logging, and release guarantees;
- planned operation boundaries for apply pending migrations, inspect status, perform bounded rollback, prepare an isolated integration namespace, and validate emitted execution;
- the root-to-workspace command ownership, intended caller, prerequisites, artifact root, exit behavior, and cleanup owner for each operation;
- the ADR-0011 handoff through which migrated-state tests pass a unique PostgreSQL database or schema and call the same logical migration sequence used locally;
- the separation from API process startup, public Rick and Morty API access, record import, Redis, GraphQL, frontend behavior, model synchronization, and ERD generation; and
- the evidence TASK-004 must produce before any planned interface can be called implemented.

The optional multi-agent workflow depends only on the stable role contracts in `.codex/README.md`; those roles are development workflow, not product dependencies. Actual package names, versions, manifests, scripts, runner source, migrations, database fixtures, and integration tests belong to TASK-004 or another explicit downstream owner after DG-002 is resolved.

## Revision Note

2026-08-10: Created the initial TASK-002 ExecPlan after confirming that TASK-002 is the executable work item and DG-002 is its controlled outcome. The plan introduces no runner or migration, preserves the owner-approval checkpoint, incorporates accepted ADR-0011's migrated-state handoff, and makes source/build identity, metadata atomicity, rollback, failure recovery, and PostgreSQL concurrency explicit decision criteria.

2026-08-10: Corrected independent review by adding an in-plan Durable Research Record for every candidate summary and the normalized decision matrix. This makes the research barrier restartable without agent transcripts or conversation history while leaving TASK-002 and DG-002 pending and adding no implementation artifact.

2026-08-10: Revalidated the corrected plan and received independent-review `PASS` with no remaining material findings. Documentation and ADR validation pass, the tracked diff has no whitespace-error location, and negative searches find no controlled implementation artifact.

2026-08-10: Started TASK-002, synchronized its `In progress` state and execution chronology, and reconfirmed sequence number `0012` as the collision-safe next candidate while TASK-016 and TASK-003 remain unstarted. DG-002 remains pending, and no controlled implementation artifact was added.

2026-08-10: Recorded the Milestone 1 validator discovery and corrected the unallocated ADR wording so the plan coordinates sequence number `0012` without creating an undefined stable-ID reference. Documentation validation and `git diff --check` then passed.

2026-08-10: Preserved the completed compiled-artifact Sequelize CLI research. The candidate remains a credible Sequelize 6 comparator, but its release-line ceiling, ESM loader conditions, extension-bearing identity, non-atomic metadata, absent database lock, and required safety wrapper materially weaken its fit.

2026-08-10: Preserved the completed build-first programmatic Umzug research. The candidate advances conditionally because emitted ESM provides one native runtime across local, integration, and delivery, while custom storage, artifact-manifest checks, a whole-command transaction, and PostgreSQL advisory locking remain required parts of the compared lifecycle.

2026-08-10: Preserved the completed source-executed programmatic Umzug research. It remains a credible fast-feedback option only when local/test transformation and native emitted delivery are both mandatory evidence paths with one extension-neutral identity and integrity contract.

2026-08-10: Completed decision analysis with no material research gaps. Build-first programmatic Umzug ranked first because it concentrates all execution on one native emitted ESM boundary and permits custom metadata, transaction, and lock behavior without the source candidate's dual runtime or the CLI candidate's non-atomic legacy lifecycle. The recommendation remains proposed until owner approval.

2026-08-10: Allocated ADR-0012 after rechecking the sequence and drafted it as `Proposed` with the build-first programmatic Umzug lifecycle, a 91/100 `Accept` recommendation, explicit future interfaces, and TASK-004 validation. DG-002 remains pending and no implementation artifact was added.

2026-08-10: Applied independent-review correction cycle 1 after a `REVISE` verdict. ADR-0012 now fixes `READ COMMITTED` lock-before-history ordering, exact rollback selectors and bounds, immutable content-addressed build publication and operation ownership, and byte-exact advisory-key derivation with test vectors; the living current-state and documentation-impact text is synchronized.

2026-08-10: Applied the second and final independent-review correction cycle after pass 2 confirmed the earlier fixes but found incomplete artifact identity. The build ID now includes every authored runtime and build input, the manifest allowlists and hashes every published file, runner changes create new build IDs, and runtime tampering fails before database access.

2026-08-10: Final independent re-review returned `REVISE` because the content ID does not authenticate the canonical migration mapping even though it authenticates the complete input and output sets. The bounded two-cycle loop is exhausted. ADR-0012 remains `Proposed`, DG-002 remains `Pending`, TASK-002 remains `In progress`, and owner direction is required before a narrow mapping-integrity correction or any approval request.

2026-08-10: The project owner directed a second verification and supported correction. Local inspection and a separate read-only audit confirmed the mapping-authentication gap, hard-gate recommendation conflict, and missing in-ADR criteria matrix. One extraordinary narrow correction now frames and authenticates the canonical mapping, reconstructs it during preflight, adds mapping-only tamper validation, restores the ADR matrix, and marks the recommendation `Revise` pending independent re-review. This direction is not ADR approval; DG-002 and downstream task states remain unchanged.

2026-08-10: Independent re-review confirmed the three assigned corrections but returned `REVISE` because the byte-exact build ID still depended on undefined cross-platform path and source normalization; it also found wording that confused proposed selection with approval. The supported follow-up defines the canonical path and byte grammar, adds a normative Windows-separator/CRLF/mapping digest vector, expands TASK-004 validation, and clarifies that the plan proposes but does not approve or implement a runner. The hard gate remains active pending another independent review.

2026-08-10: Independent re-review of the canonicalization correction returned `PASS WITH FOLLOW-UPS`, independently reproduced every normative digest, found no Blocker or Major issue, cleared the hard gate, and supported restoring the 91/100 `Accept` recommendation for owner presentation. The one minor portability follow-up now rejects a literal reverse solidus within a POSIX directory-entry component. ADR-0012 remains `Proposed`, DG-002 remains `Pending`, TASK-002 remains `In progress`, and explicit project-owner approval is the next controlled step.

2026-08-10: Final read-only audit of the exact integrated pre-approval proposal returned `PASS` with no actionable finding. It confirmed the POSIX alias closure, independently reproduced all four normative digests, passed both repository validators and whitespace checks, found no controlled implementation artifact or disabled test, and verified that ADR-0012, DG-002, TASK-002, TASK-003, and TASK-004 remain in their correct pre-approval states.

2026-08-10: The project owner explicitly approved the exact final-`PASS` ADR-0012 proposal on the condition that the decision work was complete and only approval remained. Every pre-approval milestone was complete, so approval was the only remaining controlled decision step; mechanical acceptance synchronization and closure checks followed. ADR-0012 is now `Accepted`, DG-002 is `Resolved`, and TASK-002 remains `In progress` only while the relevance and documentation-closure gates run. TASK-003 and TASK-004 remain `Pending`, and no migration implementation artifact was added.

2026-08-10: Completed TASK-002 after the relevance audit, negative implementation/test searches, ADR and documentation validators, whitespace check, state reconciliation, navigation repair, and final diff review passed. The plan moved to `docs/plans/completed/` with its stable filename and history. TASK-003 and TASK-004 remain `Pending`; no migration runner, configuration, command, migration, harness, migrated database, ERD, product test, or application behavior was added.

2026-08-10: A fresh independent final evidence checkpoint reviewed the exact closed TASK-002 state and returned `PASS` with no Blocker, Major, or Minor finding. It confirmed the owner-approval interpretation, accepted/resolved/complete authority states, preserved historical chronology, repaired plan links, unchanged graph edges, negative implementation evidence, and TASK-003/TASK-004 `Pending` states.
