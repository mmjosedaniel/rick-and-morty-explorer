# ADR-0015: Use a Build-First Migration Lifecycle with Restricted ASCII Catalog-Bound Lock Identity

- Status: Accepted
- Date: 2026-08-13
- Approval date: 2026-08-14
- Decision owners: Project owner and project maintainers
- Related requirements: FR-BE-003, FR-BE-004, NFR-003, DEL-002, AC-009, AC-012, OR-001
- Related decisions: ADR-0002, ADR-0003, ADR-0008, ADR-0010, ADR-0011, ADR-0012, ADR-0014
- Controlled gate: DG-005; resolved by fresh independent `PASS` on exact proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1` and explicit project-owner approval on 2026-08-14
- Owning task: TASK-018 (Complete)
- Supersedes: ADR-0012
- Superseded by: None

## Context

The backend must use Sequelize migrations to create a PostgreSQL application schema, and the repository has adopted strict TypeScript and ECMAScript modules as delivery commitments. The same logical migration sequence must support local setup, ADR-0011 isolated PostgreSQL namespaces, rollback and recovery, and later delivery execution. Migrations must remain deterministic and network-free, while ADR-0008's explicit importer initializes the required 15 characters only after schema creation.

Accepted ADR-0012 defines the build-first programmatic Umzug 3 lifecycle for that work. It also derives one PostgreSQL transaction advisory-lock key from NFC-normalized database and schema strings under the literal `rick-and-morty-explorer:migrations:v1`. TASK-016 review subsequently proved that two distinct valid PostgreSQL identifiers, composed `café` and decomposed `café`, retain different catalog bytes but collapse to the same normalized lock input. That is an admitted identity alias rather than the separately disclosed finite 64-bit projection collision: two distinct namespaces deterministically receive the same pre-hash payload.

ADR-0012 is preserved unchanged except for reciprocal lifecycle metadata and is now `Superseded`. No repository amendment mechanism permits replacing accepted clauses in place, so this accepted whole-record successor restates every unaffected ADR-0012 lifecycle rule and replaces its arbitrary configured/borrowed connection assumption and too-late SQL-only encoding control together with its migration-lock namespace admission, catalog binding, version literal, key derivation, vectors, and related diagnostics. ADR-0015 is now the current migration-lifecycle authority; ADR-0012 remains historical evidence only, and its `migrations:v1` identity must not be implemented, reused, or reinterpreted.

Accepted [ADR-0014](./0014-persist-and-deliver-character-image-urls-directly.md) independently remains the current image-persistence constraint for TASK-004: `characters.image_url text NOT NULL` is the sole image-specific relational field, and migration work must not introduce an image relation, byte field or store, media metadata, digest, history, advisory lock, proxy, asset route, durable asset cache, or image-lifecycle subsystem.

DG-005 and TASK-018 owned this decision. Exact-artifact review returned `PASS`, the project owner approved the reviewed proposal, DG-005 is `Resolved`, and TASK-018 is `Complete`. TASK-004 remains `Pending` with exactly TASK-002 and TASK-003 as dependencies because it still requires separate execution authorization; TASK-018 was an approval join, not a new dependency edge. The repository contains no Sequelize, Umzug, or PostgreSQL-driver dependency, migration configuration, migration source, migration command, database-backed migration test, migrated schema, history table, or ERD. Acceptance is not implementation or runtime evidence.

Three namespace-identity options were researched against one Decision Review Contract: exact PostgreSQL catalog UTF-8 bytes; a deliberately restrictive portable ASCII domain; and PostgreSQL database/namespace OIDs. Research, renewed analysis, two independent pre-draft correction cycles, and a distinct fresh checkpoint resolved temporary-namespace, catalog-type, operator-resolution, result-shape, diagnostic, and historical-authority defects before this record was allocated. The historical literal and its vectors remain defect evidence only; they are neither reused nor reinterpreted.

A later coherence review found a separate application-domain defect in the allocated proposal: persistence and exact catalog existence do not prove that a namespace is an authorized application migration target, yet the proposal admitted every persistent namespace and explicitly treated `pg_catalog` as positive validation. PostgreSQL also supplies persistent `pg_toast` and `information_schema`, and the official-image `POSTGRES_USER` used by local Compose is a superuser, so privilege success cannot classify application intent. The prior final-review PASS and ADR SHA-256 `E40390F66B6C0B21D3BF9C17739D3AD9D105ECE4D08A36BEF955AA777F53B741` remain point-in-time history but are not approval-authorizing. TASK-018 reopened all three options symmetrically, retained their 91/84/77 ranking under one corrected application-domain guard, received renewed `DRAFT READY` analysis, and passed a distinct complete IR-A before this revision.

A subsequent PostgreSQL 18.4 source audit found two further defects in that corrected proposal. First, qualifying the SQL call to `pg_catalog.convert_to` does not qualify the default conversion that PostgreSQL may resolve internally through `activeSearchPath` when the database encoding differs from UTF8. Second, exact current-database name binding and positive provenance do not reject a connectable template database or observe mutable `datistemplate` and `datallowconn` state. The second final-review PASS and exact ADR SHA-256 `A5F387FF0D307ACF820A44E28A8175418E6221F55922AE028C23598E6E135AF3` therefore remain historical and non-authorizing. Under one explicit owner-authorized third bounded correction, all three options were compared again, renewed analysis retained 91/84/77 and selected an immediate UTF8/non-template/connectable database preflight, and complete fresh IR-A passed before this revision. This repair receives no score credit and creates no implementation evidence.

A later startup-path review proved that the third correction still acted too late: PostgreSQL selects client/server conversion and decodes the first simple or extended query message before any SQL preflight can execute. Its final-review PASS and exact ADR SHA-256 `1C3CDDCE34FEC0777AE81845703ACAB2233767C10CFE44A2EDD01862FA695B69` remain historical and non-authorizing. For this personal portfolio, the project owner selected the practical startup-controlled connection direction and authorized one named fourth bounded correction. Three comparable startup-control reports scored startup-guarded UTF8-only 91, provisioned UTF8 zero-conversion 73, and startup-guarded multi-encoding 79. Renewed analysis returned `DRAFT READY`; one source-trace-only IR-A correction added the Sequelize abstract connection manager that proves its separate version-bootstrap connection; and a distinct complete fresh IR-A returned `PASS` before this revision. The selected invariant is no untrusted conversion, not zero conversion. The identity comparison remains 91/84/77, and repairing the startup hard gate receives no score credit.

A still later pinned-driver review proved that the fourth correction did not completely close ambient connection state. At `pg@8.22.0`, `PGREPLICATION` and `PGSSLNEGOTIATION` remain live because Sequelize 6.37.7 does not forward those low-level fields, `PGAPPNAME` remained live because the factory supplied no exact application name, the active client-encoding spelling is `PGCLIENT_ENCODING` rather than `PGCLIENTENCODING`, and a null password can enter `pgpass` file discovery. The fourth final-review PASS and exact ADR SHA-256 `6AD00C9533849CFAA5C793B23B3DEF5C633AAB2D4FE3D577CCA5C2B0D9DF90B6` are therefore historical and non-authorizing. The project owner retained the practical direction for this personal portfolio and authorized one named fifth bounded correction. Comparable reports scored a pinned in-process environment guard 91, a sanitized migration subprocess 83, and a closure-bound low-level adapter 76. Renewed analysis returned `DRAFT READY`; initial fresh IR-A required only a cumulative invariant-evidence correction; and complete fresh re-review returned `PASS` before this revision. Repairing the environment-closure hard gate receives no score credit.

The fifth final IR-B then returned `REVISE` on exact ADR SHA-256 `215E31D6E78DBFA0879D916DDDAD75BA0E4E63943FC9B458DDDEE0DAA11C576C`. Pinned `pg@8.22.0` copies the supplied TLS object but overwrites `servername` with a non-IP `host` before calling Node TLS, while the proposal allowed those values to differ and claimed that the factory-owned name remained exact. The same review also found current-stage routing and living-plan chronology defects. The project owner explicitly authorized the primary thread to apply those named corrections directly without the agent workflow. This material direct revision invalidates the fifth hash as an approval target, leaves all prior review evidence historical, and does not itself satisfy the repository's independent-review boundary or approve this proposal.

The direct TLS/SNI revision at SHA-256 `9B90D8BF366E83E038F53AFA5D520B28786F9C768B765B8FA45EC34D4A4C1528` was subsequently reconsidered for portfolio proportionality. The project owner selected `RESTRICTED-ASCII-DOMAIN` and authorized this documentation-only revision around one controlled local/CI PostgreSQL profile. The earlier Unicode, remote-TLS, conversion, and environment-fallback investigations remain preserved in [TASK-018](../plans/completed/TASK-018-postgresql-migration-lock-identity-decision.md) as historical evidence and reversal guidance; they are not the current normative support contract. This material change invalidated every earlier proposal hash and review as an approval target. Exact revised proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1` subsequently received independent `PASS` and explicit project-owner approval.

The independent exact-artifact review of that restricted revision returned `REVISE` on SHA-256 `B38F26ED48A99CFB0D4FA99A1973637B4C9ED66AC6122598FB093A13AA3B4EC9`. It correctly observed that `pg@8.22.0` `Client.getStartupConf()` forwards `options` but does not add `client_encoding`; a follow-up pinned-source audit also confirmed that `pg-protocol@1.15.0` appends the direct `client_encoding=UTF8` pair to the serialized StartupMessage. The actionable defect is therefore that the contract relied on that separate serializer behavior implicitly and supplied no same-value encoding control in `options`, not that the pinned pure-JavaScript packet omitted client encoding. The same review proved that PostgreSQL 18.4 was no longer the current PostgreSQL 18 minor after the 18.6 security release and that the current `88/92/77` identity comparison charged candidates for unequal shared transport/control assumptions. The project owner authorized correction of all three findings. This revision makes both startup paths explicit, updates the current profile to PostgreSQL 18.6, and replaces the unsupported current numerical option ranking with one symmetric qualitative comparison. The reviewed hash and every prior PASS remain historical and non-authorizing.

Fresh exact-artifact review of that correction returned `REVISE` on SHA-256 `E649A26C334C16BC0B3800ECCB07C2F315F176EC0896C60D72E843765355B3E6` for two residual documentation defects. TASK-018 still called `92/88/77` the current normalized matrix even though this ADR had retired current cross-option numbers, and one downstream validation bullet shortened the proven startup sequence to the ambiguous phrase “before initialization.” The project owner authorized both repairs. The resulting precision correction makes the living Decision Review Contract qualitative only and states the exact sequence consistently: PostgreSQL applies the startup controls after authentication but before `search_path` and client-encoding initialization, `ReadyForQuery`, and every Sequelize SQL statement. Exact corrected proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1` received a fresh independent `PASS` with no Blocker, Major, or Minor, and the project owner explicitly approved those bytes on 2026-08-14.

## Decision drivers

- Satisfy FR-BE-003, NFR-003, and AC-009 with version-controlled Sequelize migrations over PostgreSQL.
- Preserve FR-BE-004 and ADR-0008 separation: schema migration cannot call the public Rick and Morty API or import records.
- Preserve ADR-0011 run-scoped PostgreSQL isolation and cleanup ownership.
- Preserve ADR-0002 strict TypeScript, ESM, independent no-emit checking, and native-runtime honesty.
- Preserve one extension-neutral migration identity across authored `.ts` and emitted `.js` artifacts.
- Reject duplicate, malformed, inserted-before-history, stale, missing, extra, unknown, non-prefix, and changed-applied migration states before schema mutation.
- Make schema changes and migration-history changes one atomic PostgreSQL unit for the initial lifecycle.
- Require typed and runtime-validated forward and rollback operations.
- Define bounded forward, no-op, status, rollback, failure, interruption, and ambiguous-commit behavior.
- Serialize a complete command for one exact admitted PostgreSQL database/schema while permitting disjoint ADR-0011 namespaces to overlap.
- Adopt one explicit portfolio naming policy: database, schema, and user must match `^[a-z]{1}[a-z0-9_]{0,62}$`; rejected names fail rather than normalize or truncate into the admitted domain.
- Bind one positively authorized application target to exactly one current catalog database/schema pair before locking and rebind the exact returned text after acquisition before history access.
- Fix the current supported implementation profile to Node.js 24.18.0, npm 11.16.0, TypeScript 6.0.3, PostgreSQL 18.6, Sequelize 6.37.7, Umzug 3.8.3, `pg` 8.22.0, and `pg-hstore` 2.3.4, with `pg-protocol` 1.15.0 and `pgpass` 1.0.5 locked transitively.
- Limit migration connections to controlled local/CI PostgreSQL at exact host `127.0.0.1` with TLS disabled, a valid port, a non-empty credential, and repository-owned `POSTGRES_*` configuration.
- Reject every non-empty ambient environment entry whose effective name begins with `PG`, both before Sequelize construction and immediately before acquisition, without mutating `process.env`.
- Make `TrustedMigrationTarget` an opaque frozen handle whose state exists only in a module-private `WeakMap`; clones, proxies, JSON, structural lookalikes, and caller assertions must fail before Sequelize construction.
- Reject exact database names `template0` and `template1`, every schema beginning `pg_`, and exact `information_schema`, independently of caller privileges.
- Require one factory-private pure-JavaScript `pg` connection whose StartupMessage carries exact `options=-c client_encoding=UTF8 -c search_path=pg_catalog` and the serializer-appended direct `client_encoding=UTF8` pair, with fixed application name, timeout and binary mode, `databaseVersion='18.6.0'`, no TLS or replication, and exactly one physical session.
- Verify startup and target identity through one exact eight-field preflight before namespace binding, locking, history, savepoints, or DDL.
- Return database and schema catalog names as `text`, compare them exactly before and after lock acquisition, and encode only the verified admitted ASCII values for the v2 payload.
- Fix a monotonic default lock deadline of 5000 ms, a valid configurable range of 1 through 60000 ms, a 100 ms polling interval, and a per-query `query_timeout` equal to the ceiling of remaining time.
- Destroy and remove the physical connection on deadline expiry, including a suspended query or late `true`; issue no SQL rollback on that path and return `MIGRATION_LOCK_TIMEOUT` with result 2.
- State precisely that post-lock rebinding detects only name-visible drift between statement snapshots and does not prove object continuity.
- State precisely that advisory locks are database-local: only distinct schemas inside the same database can suffer false serialization from a 64-bit collision; different databases never contend on the lock even when their keys are equal.
- Use only the v2 literal, deterministic framing, reproducible positive and negative signed-key vectors, exhaustive diagnostics, and absolute non-reuse or reinterpretation of v1.
- Use the same native emitted ESM runtime locally, in integration setup, in emitted-artifact validation, and in delivery.
- Keep TASK-004's later implementation and validation surface proportional, falsifiable, and reversible.

## Considered options

The unaffected migration-runner comparison from ADR-0012 remains part of this whole-record decision:

| Lifecycle option | Benefits | Costs and risks | Outcome |
|---|---|---|---|
| Programmatic Umzug 3 executing one immutable emitted ESM publication in local, integration-test, validation, and delivery contexts | One native runtime and reusable content-addressed artifact; direct control of typed context, custom storage, identity, transaction, locking, status, rollback, logging, and connection ownership; no TypeScript runtime loader | Requires explicit build/publication plus a repository-owned resolver, full-artifact verifier, storage, lock wrapper, and command facade | Carried-forward selected lifecycle |
| Programmatic Umzug 3 executing TypeScript source through `tsx` locally and in tests, with native emitted ESM for validation and delivery | Faster local and integration feedback; retains programmatic lifecycle control | Adds `tsx` and esbuild, creates two physical runtimes, and requires proof of both paths on Windows and continuous integration | Rejected; reconsider only if measured build latency is material and both paths prove equally reliable |
| Sequelize 6 CLI executing compiled JavaScript behind a repository wrapper | Familiar migration/status/undo commands and a stable Sequelize 6 pairing | Uses an older Umzug boundary, CWD-sensitive discovery and extension-bearing identity; lacks this repository's atomic checksummed history and complete-command lock; requires a large session-holding wrapper | Rejected |

The current DG-005 comparison applies one identical baseline to every identity candidate: PostgreSQL 18.6 on `127.0.0.1` with TLS disabled; the same opaque provenance; the same StartupMessage controls, eight-field preflight, transaction, lock deadline, destruction, diagnostics, and recovery rules; and no credit for repairing a shared hard gate. Only the admitted identifier domain and identity material vary.

| Differential criterion | `EXACT-CATALOG-BYTES` | `RESTRICTED-ASCII-DOMAIN` | `CATALOG-OID-PAIR` |
|---|---|---|---|
| Present mapped need | Satisfies every mapped requirement, but no current requirement needs quoted, mixed-case, or Unicode migration identifiers | Satisfies every mapped requirement and matches the repository's current database, schema, and user names | Satisfies lock serialization, but no current requirement needs rename-stable catalog-object identity |
| Identity fidelity | Preserves every admitted UTF8 catalog name and distinguishes case and Unicode byte sequences | Preserves every admitted lower-case ASCII catalog name exactly and rejects every broader value without normalization | Identifies the current catalog objects rather than their names; OIDs are runtime-assigned and reusable |
| Validation and test surface | Requires byte-length, Unicode, conversion, and broader result fixtures even under the same local/no-TLS transport | Uses one-byte-per-character validation, exact text equality, five portable vectors, and explicit upper-case/Unicode rejection | Requires exact OID parsing and recreation/reuse fixtures and cannot provide portable configured-name-to-key vectors |
| Recreation and restore | Deterministic for the same exact names across reconstruction | Deterministic for the same admitted names across reconstruction | Normally changes after database/schema reconstruction and can be reused for later objects |
| Evolution trade-off | Broadest name compatibility now, with more proof and maintenance than the portfolio currently needs | Smallest present proof surface, but broadening the name domain requires a successor ADR and a new identity contract | Rename-stable during one object lifetime, but weaker human diagnostics and higher reconstruction/recovery cost |
| Current outcome | Rejected; first reversal candidate if broader PostgreSQL identifiers become a demonstrated need | Selected by the project owner as the smallest complete current boundary | Rejected; reconsider only after a demonstrated rename-stable object-identity requirement |

The former current `88/92/77` ranking is retired because its evidence did not hold transport and shared startup controls constant. Historical numerical matrices remain preserved in TASK-018 only as point-in-time evidence. The 100-point ADR evaluation below scores the selected whole record against the repository rubric; it is not a cross-option score and gives no credit merely for repairing a hard gate.

The strongest dissent favors exact catalog bytes because it preserves every valid PostgreSQL UTF8 name and avoids a future name-domain successor. It remains unselected because no current requirement needs quoted, mixed-case, or Unicode migration targets, while those identifiers add byte-length, conversion, and fixture surface even under the same local/no-TLS connection baseline. A demonstrated need for any excluded identifier returns to a successor ADR rather than weakening validation in place.

SQL_ASCII and every non-UTF8 server encoding are unsupported. Candidate-local privilege results remain excluded from identity and provenance: `CONNECT`, `USAGE`, `CREATE`, ownership, and ACL state describe mutable capability, not application authorization.

Reusing NFC or the historical migration-lock literal is not a viable control option. NFC is demonstrably non-injective over valid distinct PostgreSQL catalog identifiers, and using an old literal for changed semantics would permit incompatible cooperating executors to claim one identity version.

## Decision

This accepted whole-record successor directs TASK-004 to implement a private programmatic migration boundary using exactly Node.js `24.18.0`, npm `11.16.0`, TypeScript `6.0.3`, PostgreSQL `18.6` through `postgres:18.6-alpine`, Sequelize `6.37.7`, Umzug `3.8.3`, pure-JavaScript `pg` `8.22.0`, and `pg-hstore` `2.3.4`. The npm lockfile must also resolve `pg-protocol` exactly `1.15.0` and `pgpass` exactly `1.0.5`. TASK-004 consumes this compatibility profile and does not select versions. PostgreSQL's current-minor security policy is part of compatibility review: before implementation and delivery evidence, confirm that 18.6 remains the latest PostgreSQL 18 minor; a later minor must receive a documented source/runtime compatibility review and replace the implementation pin when the guarantees reproduce. Any other version change requires the same review, and a change that alters or cannot reproduce these guarantees requires a successor ADR before upgrade. Sequelize 7, the Sequelize CLI, native/libpq mode, and alternative PostgreSQL images are outside this profile.

All migration modules will be authored in strict TypeScript and independently checked by the repository no-emit type-check boundary. No command will execute TypeScript source. A migration build will publish an immutable native ESM artifact and source maps, then all local, integration-test, validation, and delivery operations will execute one explicitly selected published artifact through the selected native Node.js runtime with source maps enabled.

The planned authored root is `apps/api/src/infrastructure/database/migrations/`; the planned publication root is `apps/api/dist/infrastructure/database/migrations/builds/`. Each immutable build root beneath it will contain the emitted runner, a `files/` directory, source maps, and `migration-manifest.json`. Resolution will be anchored to the selected build root and the emitted runner's `import.meta.url`, never `process.cwd()`. A canonical migration ID must match `[0-9]{14}-[a-z0-9]+(?:-[a-z0-9]+)*`; source filenames add `.ts`, and emitted migration filenames use the identical stem plus `.js`. The ASCII extension-neutral stem is ordered by simple code-point comparison, which is also its UTF-8 byte order. Runtime discovery will use the selected generated manifest rather than an unbounded working-directory glob.

Every manifest path will use one platform-independent canonical grammar. The builder walks the declared repository or private staging root and obtains actual directory-entry components; it does not hash a caller-supplied path alias. On Windows, U+005C reverse solidus (`\`) and U+002F slash (`/`) delimit builder-observed path components. On POSIX, only slash is a delimiter and any literal reverse solidus returned inside a directory-entry component is rejected rather than converted. The builder joins validated components with slash and requires the result to be a non-empty relative path. Each segment may contain only ASCII letters, digits, periods, underscores, and hyphens, and its final character cannot be a period. It rejects U+0000, non-ASCII characters, an initial or final slash, repeated separators, drive-letter prefixes, UNC/device or other absolute forms, empty segments, `.` or `..` segments, and a case-insensitive Windows device basename before the first period (`CON`, `PRN`, `AUX`, `NUL`, `COM1` through `COM9`, or `LPT1` through `LPT9`). It performs no percent decoding, Unicode normalization, or dot-segment resolution. Every traversed entry must be an ordinary file or directory, not a symlink or reparse point, and its resolved path must remain below the declared root. ASCII case is preserved exactly and never folded; paths must be unique byte-for-byte and after ASCII lowercase comparison within each rooted allowlist. Canonical paths are sorted by raw UTF-8 bytes. Only builder-observed Windows separators are converted; every stored manifest path must already be canonical, and runtime preflight rejects rather than rewrites any reverse solidus or other non-canonical form. The same grammar and collision checks apply to every input, output, and mapping path without filesystem case normalization.

For every authored input, source-byte normalization is exact: read raw bytes; reject a UTF-8 BOM (`EF BB BF`) and invalid UTF-8; decode without replacement; replace each CRLF pair and each remaining CR with one LF; re-encode as UTF-8; and hash those bytes. No Unicode normalization, case folding, trimming, other whitespace change, or terminal-newline insertion or removal occurs. Published-output checksums hash each exact staged file byte-for-byte with no text decoding or line-ending normalization. Every SHA-256 is 64 lowercase hexadecimal ASCII characters. A manifest `role` begins with a lowercase ASCII letter and otherwise contains only lowercase ASCII letters, digits, and hyphens; emitted migration modules use the exact role `migration`.

The artifact-manifest schema version remains the UTF-8 literal `rick-and-morty-explorer:migration-artifact:v1`. Its `inputs` allowlist will contain the normalized repository-relative path and normalized UTF-8/LF SHA-256 for every authored input that can change the published runtime: build generator, command, runner, resolver, storage, lock, context/error modules, every migration, migration TypeScript configuration, and relevant package/dependency-lock description. Toolchain fields contain exact TypeScript compiler and Node.js target versions. Paths are UTF-8-byte sorted and unique.

After compilation and before publication, the build ID is the lowercase hexadecimal SHA-256 of this exact length-prefixed sequence:

```text
LP("rick-and-morty-explorer:migration-artifact:v1")
|| LP(exactTypeScriptVersion)
|| LP(exactNodeTarget)
|| LP("inputs") || LP(decimalInputCount)
|| for each input sorted by normalized repository-relative path:
     LP(path) || LP(lowercaseSourceSha256)
|| LP("outputs") || LP(decimalOutputCount)
|| for each staged output sorted by normalized build-relative path:
     LP(path) || LP(role) || LP(lowercaseOutputSha256)
|| LP("mappings") || LP(decimalMappingCount)
|| for each migration mapping sorted by canonical migration ID:
     LP(canonicalMigrationId)
     || LP(normalizedSourcePath) || LP(lowercaseSourceSha256)
     || LP(normalizedEmittedPath) || LP(lowercaseEmittedSha256)
```

For artifact identity, `LP` is a four-byte unsigned big-endian byte length plus the UTF-8 bytes. Each decimal count is canonical base-10 ASCII with no leading zero except zero itself. Section tags and counts make list boundaries explicit. Compiler configuration and the dependency-lock description are ordinary allowlisted inputs. A runner, resolver, storage, lock, command, generator, migration source, emitted file, or canonical association change must produce a different build ID.

The build compiles into a process-unique staging directory. The manifest `files` allowlist contains the normalized build-relative path, role, and exact-file SHA-256 of every published file except the manifest, including command, runner, resolver, storage, lock, context/error modules, migrations, and source maps. Paths are byte-sorted and unique. Staging contains exactly `migration-manifest.json` plus those files. The manifest maps each canonical migration ID to its normalized source path/checksum and emitted migration path/checksum. Each mapping reference must exactly match the corresponding input/output allowlist entry. The builder derives mappings by selecting every grammar-matching `.ts` input under the authored migration root and every `migration`-role `.js` output, matching identical extension-neutral stems, and requiring an exact one-to-one set.

The carried-forward normative artifact vector is:

| Vector component | Exact fixture value |
|---|---|
| Schema literal | `rick-and-morty-explorer:migration-artifact:v1` |
| `exactTypeScriptVersion` | `5.9.3` |
| `exactNodeTarget` | `node24` |
| Raw input path | `apps\api\src\infrastructure\database\migrations\20260810120000-create-character.ts` |
| Canonical input path | `apps/api/src/infrastructure/database/migrations/20260810120000-create-character.ts` |
| Raw source bytes, escapes shown | `export const migrationName: string = "create-character";\r\n` |
| Normalized source bytes, escapes shown | `export const migrationName: string = "create-character";\n` |
| Source SHA-256 | `50b2fc1f722c6a548997474cf1fe6bcd096211351835ed0e443c273e47ac0477` |
| Raw output path | `files\20260810120000-create-character.js` |
| Canonical output path | `files/20260810120000-create-character.js` |
| Output role | `migration` |
| Exact output bytes, escape shown | `export const migrationName = "create-character";\n` |
| Output SHA-256 | `c4dcdd6d42e18ec45edf64d7ca74ad6706b5d8db8767a71b62c17036a9447bdf` |
| Canonical migration ID | `20260810120000-create-character` |

The vector's TypeScript `5.9.3` and `node24` strings remain serialization fixtures only and do not override the exact compatibility profile selected above. TASK-004 must reproduce the vector and use the selected real toolchain strings in newly built manifests; it does not reselect the compiler, runtime, ORM, driver, or migration-runner patches.

With one input, one output, and one mapping tuple, the exact artifact `LP` sequence must produce build ID `e825ac106c1bb8f5af041646699c4e2398b832a55dca90c54155db4195bf37a5`. Changing only the tuple ID to `20260810120000-create-comment` produces `1b9470376a7b0878b9679efd3707f9d2696415b5e50ebefbe76a21262d34aaf5` and violates identical-stem projection, so preflight rejects it before database access.

After full verification, the builder publishes by renaming staging to `builds/<build-id>/`. A published build is immutable. Concurrent builders for the same ID either publish once or recompute the ID and verify the existing manifest and complete allowlist before reuse; they never replace or delete it. The builder owns only private-staging cleanup and fails on malformed/duplicate IDs, incomplete input coverage, mismatched source/output sets, non-canonical mappings, unexpected files, conflicting publication, or incomplete staging.

Runtime preflight independently reconstructs the canonical mapping from migration-source inputs and `migration`-role outputs, requires exact equality with the sorted manifest mapping, recomputes the build ID, matches manifest and directory name, and verifies the complete allowlist and checksums before database access. Mapping-only changes fail reconstruction or change the ID. Manifest path, role, mapping, or checksum tampering changes the ID; output tampering fails checksum; coordinated output/manifest tampering still mismatches the immutable directory name. The normalized migration-source checksum is the durable meaning of an applied migration; emitted checksums authenticate the selected build but do not replace logical source identity. An applied migration is never edited; correction uses a new migration.

The repository will not use Umzug's default resolver, built-in `SequelizeStorage`, optional rollback contract, filename identity, CLI, or `FileLocker`. A repository-owned resolver loads only manifest-listed emitted modules, assigns the canonical extension-neutral ID, and validates every module before database mutation. Each module satisfies a repository-owned `MigrationDefinition` with mandatory asynchronous `up` and `down`, both receiving a context with configured Sequelize `QueryInterface`, canonical schema, and the command transaction.

The planned `createMigrator` factory conceptually receives `{ target: TrustedMigrationTarget, buildRoot, manifestPath, logger, lockTimeoutMs }`. `TrustedMigrationTarget` is an opaque frozen handle, not a data descriptor. The repository-private target module creates a property-free handle and stores its validated `{ host, port, database, schema, user, credential }` record only in a module-private `WeakMap`; runtime authority is exact `WeakMap` membership and retrieval, not a public property, TypeScript shape, symbol, brand string, or caller assertion. No public constructor or issuer accepts a raw tuple. Only the validated application configuration loader and the exact ADR-0011 run-scoped allocator can invoke the private issuer. A clone, spread, structural lookalike, object containing `authorized`, proxy around a real handle, deserialized JSON value, or otherwise forged object is not the stored key and must fail with `MIGRATION_STARTUP_CONFIG_INVALID` before Sequelize construction.

The validated application loader reads only repository-owned `POSTGRES_*` inputs for database, schema, user, credential, port, and optional migration-lock timeout. It fixes the host to exact `127.0.0.1`; admits only an integer port from 1 through 65535 and a non-empty credential; defaults the lock timeout to 5000 ms and admits an explicit integer from 1 through 60000 ms; and applies the identifier rules below before issuing the handle. ADR-0011 may replace only the already validated database/schema values with its owned run-scoped allocation before private issuance. Neither entry point accepts a connection URL, arbitrary host, TLS material, generic driver options, a configured Sequelize instance, or an already-open resource.

The handle and factory make URL/query parameters, caller `options`, `client_encoding`, `dialectOptions`, TLS fragments, dialect replacement modules, hooks, replication, native/libpq mode, external pools, streams, sockets, clients, configured Sequelize instances, custom low-level connections, and borrowed sessions structurally unrepresentable or locally invalid. The only supported transport is TCP to `127.0.0.1` with exact `ssl=false`; DNS, Unix sockets, bracketed or alternate loopback spellings, remote hosts, TLS negotiation, certificates, direct TLS, and caller transports require a successor ADR.

Before constructing Sequelize and again synchronously at the latest factory-controlled point before physical acquisition, enumerate the process environment and reject with `MIGRATION_STARTUP_CONFIG_INVALID` when any non-empty entry has an effective name beginning with exact upper-case `PG`. Windows comparison is case-insensitive because environment names are case-insensitive there; POSIX comparison uses the actual key spelling. This blanket rule includes the pinned driver's actual `PGCLIENT_ENCODING` spelling plus `PGREPLICATION`, `PGSSLNEGOTIATION`, `PGOPTIONS`, `PGAPPNAME`, destination, credential, TLS, timeout, binary, and password-file variables without relying on a partial inventory. It does not match repository-owned `POSTGRES_*` variables. The guard logs the rejected name and reason but never its value and never mutates `process.env`.

The selected proportional premise is that repository and dependency code does not adversarially mutate `process.env` after the second check. The two checks detect ordinary drift; adversarial same-process check-to-constructor mutation requires subprocess isolation through a successor. Any new pinned environment read, serializer or forwarding change, password-file branch, timeout behavior, pool behavior, or physical-connection path fails compatibility review before an upgrade.

The factory alone constructs a private Sequelize `6.37.7` instance with exact pure-JavaScript `pg@8.22.0`, native mode disabled, no replication configuration, exact `ssl=false`, and a private pool with maximum one and minimum zero connections. It fixes `host="127.0.0.1"`, the validated port/database/user, `options="-c client_encoding=UTF8 -c search_path=pg_catalog"`, `client_encoding="UTF8"`, `application_name="rick-and-morty-explorer:migrations"`, `connectionTimeoutMillis=10_000`, `binary=false`, and Sequelize `databaseVersion="18.6.0"`. The exact unquoted `options` value is one StartupMessage field, not a shell command. It supplies a truthy factory-owned password-provider function that closes over the validated non-empty credential, performs no environment, file, or network read, and never returns null or undefined. That function keeps ambient password values and every `pgpass` path unreachable.

Exact nonzero `databaseVersion="18.6.0"` suppresses Sequelize's separate unknown-version bootstrap connection under the pinned patch; TASK-004 proves that fixed mechanism rather than selecting one. The factory acquires exactly one physical session, holds it through transaction termination, derives its QueryInterface, and always closes the private Sequelize instance and owned session except for the forced-destruction timeout path defined below. It owns artifact validation, transaction creation, catalog binding, migration resolution, storage binding, locking, result mapping, transaction termination, and connection cleanup, but never builds, replaces, or deletes an artifact. ADR-0011 continues to own run-scoped database/schema allocation and removal and preserves a primary migration failure while reporting later cleanup failure separately.

Migration history lives in schema-qualified `sequelize_migration_history`, created through explicit QueryInterface or SQL operations and never through `sequelize.sync()`, model synchronization, or application model state. Its minimum contract is unique primary-key `migration_id`, normalized `source_sha256`, and UTC `applied_at`. History is an exact manifest-order prefix. Unknown applied IDs, non-prefix history, missing applied entries, or checksum mismatch fail closed before migration code. Privileged manual schema mutation or deletion of the last history row remains an operational limitation.

Every operation follows this exact order: validate the immutable artifact without database-history access; validate exact `WeakMap` membership of the opaque handle and retrieve its private record; validate database, schema, user, port, credential, local-host, TLS-disabled, lock-timeout, and prohibited override/session paths; run the first blanket `PG*` environment check; construct the private pinned Sequelize boundary; run the second blanket `PG*` check at the latest factory-controlled point; acquire its one physical session; allow only the guarded stock Sequelize initialization described below; begin an explicit PostgreSQL `READ COMMITTED` transaction; immediately run the fixed eight-field preflight before namespace binding, advisory lock, history operation, savepoint, or DDL; bind and retain the exact current catalog database/schema text; encode only those returned admitted ASCII names; derive the v2 key; start the monotonic lock deadline; poll for the transaction advisory lock with the bounded query contract below; repeat the identical two-field catalog bind after acquisition and require exact equality with the configured and retained values; read fresh history only after that rebind; and then compute and execute the operation. It never derives or acquires a replacement key after locking. `READ COMMITTED` prevents lock polling from freezing a pre-wait history snapshot and lets the post-lock read observe the prior holder's commit.

`up` applies every pending migration deterministically after fresh history; an empty set is a logged success/no-op. `status` uses the same artifact, transaction, bind, lock, rebind, and history sequence, reports ordered applied/pending IDs and checksum agreement, and treats an absent history table as empty without creating or mutating it.

`down` against empty history is a logged success/no-op. With no selector it reverts exactly the last applied migration, including the single-applied case. `down --step <count>` accepts a positive decimal integer. A count greater than one requires exact boolean `--confirm-multiple`; when multiple migrations are applied, explicit count must be smaller than the applied count and cannot empty a multi-entry history. `down --keep-through <migration-id>` retains the named applied migration and reverts every later entry; keeping latest is no-op, first leaves first, and intermediate leaves the exact prefix. Selectors are mutually exclusive. Missing, malformed, unknown, non-applied, out-of-bounds, or unacknowledged selectors fail before migration code with `MIGRATION_ROLLBACK_BOUNDS`. The facade exposes no rollback-all/zero, arbitrary-list, out-of-order, or rerun mode.

Every mutating command uses one PostgreSQL transaction for the complete selected batch, history bootstrap/writes, and lock lifetime. Every QueryInterface and custom-storage operation receives that transaction. Execution stops on first failure. Failed forward leaves none of its pending migrations/history; failed rollback preserves pre-command schema/history. The initial lifecycle prohibits `CREATE INDEX CONCURRENTLY` and every transaction-incompatible operation. A demonstrated nontransactional-DDL need requires a superseding ADR with an explicit non-atomic recovery model.

Target admission is exact and positively authorized through the opaque handle. A bare environment, CLI, or caller string; ambient/current database or schema; `search_path`; catalog discovery or existence; ownership; ACLs; privilege success; a connection URL; a public factory over raw fields; or a caller-supplied `authorized` assertion is insufficient. `public` is admissible only when the validated loader or ADR-0011 allocator privately issued that exact tuple.

The private database, schema, and user values must each match the complete ASCII regular expression `^[a-z]{1}[a-z0-9_]{0,62}$`. Because every admitted character is one byte in ASCII and UTF8, each value is exactly 1 through 63 bytes. Reject locally before any connection: empty values; 64-byte or longer values; upper-case ASCII; non-ASCII or Unicode; hyphens; whitespace; quoting; escapes; percent encoding; trimming candidates; and every other nonmatching value. No normalization, case folding, rewriting, alias expansion, or truncation is performed. This pre-connection rule prevents PostgreSQL startup truncation of database and user names and prevents identifier truncation for schema names.

After the common grammar, reject exact database `template0` or `template1` and reject a schema beginning exact `pg_` or equal exact `information_schema`, all with `MIGRATION_NAMESPACE_INVALID`. The prefix rule covers `pg_catalog`, `pg_toast`, current and other temporary namespace forms, and future lower-case `pg_*` system schemas. The eight-field preflight independently requires the current database to be non-template/connectable and the effective current user to equal the configured admitted user.

For every physical connection, Sequelize forwards the exact `options=-c client_encoding=UTF8 -c search_path=pg_catalog` value to `pg@8.22.0`. `Client.getStartupConf()` includes that `options` field but not a direct `client_encoding` field; pinned `pg-protocol@1.15.0` then serializes `user`, `database`, `application_name`, `options`, and its final direct `client_encoding=UTF8` pair before the terminator. PostgreSQL receives both same-value encoding controls in the StartupMessage, processes the `options` settings and then the direct generic startup field at client priority, and applies the complete startup GUC set after authentication but before search-path/client-encoding initialization, `ReadyForQuery`, and any Sequelize SQL. Authentication is not claimed to run under the applied GUCs; the admitted database and user names are already restricted ASCII.

The factory also fixes `ssl=false`, the 10-second connection timeout, binary mode, credential provider, and `databaseVersion="18.6.0"`, with no replication field or caller fragment. Catalog-only startup `search_path` is effective before PostgreSQL selects any client/server conversion procedure, so a user-schema conversion lookup cannot precede frontend SQL under the pinned pure-JavaScript boundary. Every supported application database must still report exact UTF8 in the forward preflight. SQL_ASCII and every non-UTF8 target fail before namespace binding, lock, history, savepoint, or DDL. A compromised local cluster/catalog, proxy, adversarial post-check mutation, or dependency tampering is outside this client-only portfolio boundary and triggers reconsideration.

After protected startup reaches `ReadyForQuery` but before the repository preflight, stock Sequelize 6.37.7 may perform only its guarded initialization on the same session: standard-string, message, timezone, type/OID, and version-related work consistent with exact `databaseVersion="18.6.0"`. No caller hook, authentication probe, model or application query, namespace bind, migration-history access, advisory lock, savepoint, or DDL is allowed. A separate version-bootstrap connection is prohibited, not merely guarded.

Immediately after `BEGIN`, execute this unnamed statement with raw array rows. This is forward validation and never retroactive proof of how startup or earlier guarded stock initialization was decoded:

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
  CAST(
    pg_catalog.current_setting(
      CAST('server_version_num' AS pg_catalog.text)
    )
    AS pg_catalog.int4
  ) AS server_version_num,
  CAST(CURRENT_USER AS pg_catalog.text) AS current_user_name,
  CAST(
    pg_catalog.current_setting(
      CAST('max_identifier_length' AS pg_catalog.text)
    )
    AS pg_catalog.int4
  ) AS max_identifier_length,
  d.datistemplate AS database_is_template,
  d.datallowconn AS database_allows_connections
FROM pg_catalog.pg_database AS d
WHERE d.datname
  OPERATOR(pg_catalog.=)
  pg_catalog.current_database();
```

Require command `SELECT`; exactly these ordered fields and PostgreSQL type OIDs: `startup_client_encoding`/25, `startup_search_path`/25, `server_encoding`/25, `server_version_num`/23, `current_user_name`/25, `max_identifier_length`/23, `database_is_template`/16, and `database_allows_connections`/16. Require exactly one array row of length eight, with primitive values in exact order string/string/string/number/string/number/boolean/boolean and no extra result data. After container, command, metadata, cardinality, row-length, and primitive-type validation, require exact values `UTF8`, `pg_catalog`, `UTF8`, `180006`, the configured admitted user string, `63`, `false`, and `true`. Any mismatch fails before namespace binding, lock, history, savepoint, or DDL. The transaction does not mutate `search_path`.

Before locking and again after acquisition, execute this identical unnamed fixed statement with raw array rows, exact admitted database text as `$1`, and exact admitted schema text as `$2`:

```sql
SELECT
  CAST(d.datname AS pg_catalog.text) AS database_name,
  CAST(n.nspname AS pg_catalog.text) AS schema_name
FROM pg_catalog.pg_database AS d
CROSS JOIN pg_catalog.pg_namespace AS n
WHERE (
  CAST(d.datname AS pg_catalog.text)
    OPERATOR(pg_catalog.=)
  CAST(pg_catalog.current_database() AS pg_catalog.text)
)
AND (
  CAST(d.datname AS pg_catalog.text)
    OPERATOR(pg_catalog.=)
  CAST($1 AS pg_catalog.text)
)
AND (
  CAST(n.nspname AS pg_catalog.text)
    OPERATOR(pg_catalog.=)
  CAST($2 AS pg_catalog.text)
);
```

The statement interpolates no identifier/configured value, uses no `LIMIT`, and qualifies catalog relations, functions, types, casts, and every search-path-visible equality operator. It performs no conversion function, collation, pattern comparison, ownership check, ACL check, or privilege test.

For each bind result require command `SELECT`; exactly ordered fields `database_name`/25 and `schema_name`/25; exactly one array row of length two; two primitive strings; and no extra result data. For the pre-lock result, require both returned strings to match the configured strings exactly and to pass the complete local ASCII, template, and system-schema predicates again. Retain immutable primitive copies. Only UTF8 encodings of these verified ASCII catalog strings feed identity. Zero/multiple rows, SQL error, malformed result, metadata/type mismatch, string inequality, returned domain violation, or missing opaque provenance fails before history access.

After lock acquisition, run the identical statement with identical string parameters and repeat every shape, type, equality, domain, and provenance check. Require exact equality with both configured inputs and the retained pre-lock strings. Any post-lock SQL, shape, type, cardinality, string, domain, or retained-observation failure is `MIGRATION_NAMESPACE_CHANGED` and fails before history access. Exact-name drop/recreate can still pass and reuse identity; the observations do not establish immutable lineage or prevent privileged noncooperating changes after the second statement. Never derive or switch to a different key after acquisition.

The advisory identity uses only this new literal and exact framing:

```text
LP(x) = U32BE(byteLength(x)) || x

payload =
  LP(UTF8("rick-and-morty-explorer:migrations:v2"))
  || LP(UTF8(verifiedDatabaseCatalogAsciiText))
  || LP(UTF8(verifiedSchemaCatalogAsciiText))

digest   = SHA-256(payload)
unsigned = first 8 digest bytes as unsigned big-endian bigint
signed   = unsigned < 2^63 ? unsigned : unsigned - 2^64
```

The literal is exactly 37 UTF-8 bytes. UTF8 encoding is byte-for-byte ASCII for every admitted returned name. Use JavaScript `bigint` only and never pass the signed value through `number`. Names, not OIDs, define identity. Rename changes the key; exact-name drop/recreate reuses it; logical reconstruction with unchanged admitted names preserves it. PostgreSQL advisory locks are local to each database: equal keys in different databases never contend. Within one database, a finite 64-bit collision between distinct admitted schemas causes safe false serialization and diagnosable availability loss, never same-schema concurrency.

Required exact vectors are:

| Database | Schema | SHA-256 | Signed advisory key |
|---|---|---|---:|
| `rick_and_morty` | `public` | `5e6b487e7bee9566d532743c03ce9f32620feae465b2c7e04fad2d88dc058e49` | `6803611370155578726` |
| `rick_and_morty` | `task_004_a` | `6a644eaea472bf65b14be9d0a5fed984db47bd3620633b446476e75c5d6f6d94` | `7666338977681686373` |
| `rickmorty` | `case_sensitive` | `63d100ca735ad0f0f795c2018299aa60b0f3b5b4835cbe317887c4c1b5af08f3` | `7192530949406118128` |
| `ab` | `c` | `b8e06f7ec921e2e0d23fc57ad0662d1b5b5d2b214c2450e58dab457d76cee9e9` | `-5124973785616620832` |
| `a` | `bc` | `38254f49a1e3e20be904178358adde1e4aa6393e76df357cd93632207170d268` | `4045727017929531915` |

The five table rows are deterministic key vectors only for admitted, privately issued tuples; they do not grant provenance. Empty, 64-byte, upper-case, Unicode, hyphenated, malformed, template, system-schema, and forged-handle fixtures reject before connection or derivation. In particular, `RickMorty`/`CaseSensitive`, `rickmorty`/`CaseSensitive`, composed `café`, and decomposed `café` are negative fixtures, not vectors. The `ab`/`c` and `a`/`bc` payload suffixes are respectively `0000000261620000000163` and `0000000161000000026263`, proving tuple framing. Mixed execution of historical v1 and this v2 identity is prohibited across every cooperating entry point; v1 bytes, keys, names, or history are never reused or reinterpreted as v2.

Poll the transaction lock sequentially on the same dedicated connection:

```sql
SELECT pg_catalog.pg_try_advisory_xact_lock(
  CAST($1 AS pg_catalog.int8)
) AS acquired;
```

Bind `$1 = signed.toString(10)`. Require exactly one `acquired` field in exactly one row and `typeof acquired === "boolean"`. Any malformed container, command, metadata, cardinality, field, null, string, number, or other value is a primary failure and never contention.

The lock timeout defaults to exactly 5000 ms and accepts only an integer from 1 through 60000 ms. Start one monotonic deadline immediately before the first lock query. Before every poll, compute `remainingMs = deadline - monotonicNow`; if it is not positive, take the timeout path without issuing another query. Every lock query uses exact per-query `query_timeout = Math.ceil(remainingMs)`. After every query settles and before accepting even exact `true`, read the monotonic clock again. A result arriving at or after the deadline is late and takes the timeout path. Exact `false` before the deadline waits the fixed 100 ms polling interval, then reevaluates the same deadline; exact `true` before the deadline acquires.

`pg@8.22.0` client query timeout only notifies the caller and does not prove that PostgreSQL stopped the active query. Therefore deadline expiry, a client query-timeout callback at the deadline, a suspended query that reaches the deadline, and a late `true` all require the same forced path: destroy the exact physical `pg` connection and its socket, remove/invalidate that resource in the Sequelize pool, never release it for reuse, issue no SQL `ROLLBACK`, and close the private Sequelize boundary without further SQL. Server-side disconnect releases the transaction and advisory lock. Return `MIGRATION_LOCK_TIMEOUT` with result 2 even if destruction reports a secondary cleanup error. Same-schema callers within one database serialize and perform fresh history reads after waiting. Different schemas in that database overlap unless their 64-bit keys collide; different databases never contend because PostgreSQL advisory locks are database-local. Every supported entry point must use the factory because advisory locking is cooperative.

Stable namespace/lock diagnostics and results are:

| Condition | Diagnostic | Result |
|---|---|---:|
| Invalid or forged opaque target; invalid local host, port, credential, TLS-disabled, timeout, prohibited driver/session path; or non-empty ambient `PG*` entry | `MIGRATION_STARTUP_CONFIG_INVALID` | 1 |
| Connection startup, acquisition, or allowed stock Sequelize internal initialization failure | `MIGRATION_STARTUP_FAILED` | 1 |
| Invalid ASCII identifier, length, private provenance, framing, exact built-in-template name, or system-schema value | `MIGRATION_NAMESPACE_INVALID` | 1 |
| Database-preflight SQL, result container, command, metadata, cardinality, row, or primitive-type failure | `MIGRATION_DATABASE_PREFLIGHT_FAILED` | 1 |
| Structurally valid preflight reports an effective client encoding or search path other than exact `UTF8`/`pg_catalog` | `MIGRATION_STARTUP_STATE_INVALID` | 1 |
| Structurally valid preflight reports an encoding other than exact `UTF8` | `MIGRATION_DATABASE_ENCODING_UNSUPPORTED` | 1 |
| Structurally valid preflight reports `server_version_num` other than exact `180006` | `MIGRATION_DATABASE_VERSION_UNSUPPORTED` | 1 |
| Structurally valid preflight reports `current_user` unequal to the configured admitted user | `MIGRATION_DATABASE_USER_MISMATCH` | 1 |
| Structurally valid preflight reports `max_identifier_length` other than exact `63` | `MIGRATION_IDENTIFIER_LIMIT_UNSUPPORTED` | 1 |
| Structurally valid preflight reports template or non-connectable database class | `MIGRATION_DATABASE_CLASS_INVALID` | 1 |
| Other pre-lock catalog SQL, result, domain, or exact-text binding failure | `MIGRATION_NAMESPACE_BIND_FAILED` | 1 |
| Any post-lock target-observation failure or retained-result drift | `MIGRATION_NAMESPACE_CHANGED` | 1 |
| Lock SQL/cast failure not classified as interruption/loss | `MIGRATION_LOCK_QUERY_FAILED` | 1 |
| Lock result not exactly one boolean row | `MIGRATION_LOCK_RESULT_INVALID` | 1 |
| Monotonic deadline before/during/after a lock query, client query timeout at the deadline, suspended query, or late `true`; physical connection is destroyed and no SQL rollback is attempted | `MIGRATION_LOCK_TIMEOUT` | 2 |
| Recognized cancellation/interruption | `MIGRATION_LOCK_INTERRUPTED` | 1 |
| Recognized connection loss | `MIGRATION_CONNECTION_LOST` | 1 |
| Near-commit unknown outcome | `MIGRATION_COMMIT_AMBIGUOUS`; never retry automatically | 1 |
| Cleanup failure | Secondary `MIGRATION_CLEANUP_FAILED`; preserve the primary failure, or use it as the sole diagnostic | Preserve primary result; cleanup-only is 1 |
| Successful status, apply, revert, or no-op | Existing success/status diagnostic | 0 |

Unknown commit outcome after commit initiation takes precedence as `MIGRATION_COMMIT_AMBIGUOUS`, result one, and is never retried automatically. Otherwise recognized interruption or connection loss before the lock deadline takes precedence over phase-local diagnostics. Local artifact, opaque-target, namespace, timeout, and startup-configuration validation precede connection work; startup/acquisition/internal-initialization failure follows. Preflight structural failure precedes value diagnostics in this order: startup state, server encoding, server version, current user, identifier limit, and database class. Remaining pre-lock binding failures follow. After lock acquisition, every rebind failure maps to `MIGRATION_NAMESPACE_CHANGED`. A reached lock deadline takes precedence over a late result or client query-timeout callback and maps to `MIGRATION_LOCK_TIMEOUT`, result two, with mandatory physical destruction. Before the deadline, lock SQL/cast failure maps to `MIGRATION_LOCK_QUERY_FAILED` and malformed result maps to `MIGRATION_LOCK_RESULT_INVALID`. Cleanup failure is secondary and preserves the primary diagnostic/result; timeout remains result two even when destruction cleanup also fails. Normal success, read-only status, and up/down no-op return zero. Artifact, validation, drift, connection, migration, rollback, metadata, and all other primary failures return one with structured redacted diagnostics. Logs may include operation, safely escaped admitted identifiers, byte lengths, v2 label, signed decimal key after derivation, elapsed wait, phase, forced-destruction outcome, and cleanup outcome, but never credentials, connection URLs, raw startup options, the private target record, namespace bytes, lock digests, environment values, or migration SQL.

Interruption before commit rolls back the transaction and releases the lock through transaction/session end. If connection loss near commit makes the outcome ambiguous, do not retry automatically. Reconnect, run locked read-only `status`, compare history, manifest, and schema evidence, then choose reviewed recovery. A transient rollback failure may be retried only when status shows the original applied state; never repair rollback logic by silently changing applied source.

The exact planned operation boundaries remain:

| Interface | Caller and prerequisite | Artifact behavior | Database and connection ownership | Exit/result behavior |
|---|---|---|---|---|
| API workspace `migration:build` | Contributor, root orchestration, CI, or delivery build; strict no-emit check/compiler config available | Creates/reuses one immutable build; returns absolute build root/manifest; owns staging cleanup only | No database access | Zero with verified artifact; one on source/compiler/staging/publication/verification failure |
| API workspace `migration:up --artifact <build-root>` | Root, delivery, or operator; verified artifact and trusted target | Consumes only selected artifact; never builds/deletes it | Factory creates and closes one private guarded Sequelize/session boundary | Zero applied/no-op; two timeout; one all other failures |
| API workspace `migration:status --artifact <build-root>` | Contributor, automation, or recovery operator | Consumes selected artifact | Same private ownership rule; no schema/history mutation | Zero ordered status; two timeout; one other failure |
| API workspace `migration:down --artifact <build-root> [--step <count> | --keep-through <id>] [--confirm-multiple]` | Explicit operator or bounded test | Consumes selected artifact | Same private ownership rule | Zero reverted/no-op; two timeout; one including rollback-bounds failure |
| Root `migrate:build`, `migrate:up`, `migrate:status`, `migrate:down` | Contributor/automation from any CWD | Build delegates; other commands obtain one immutable artifact then delegate with that exact root | Root forwards the trusted descriptor and results, never an ORM/session object | Transparent zero/one/two propagation |
| `prepareMigratedNamespace({ target, buildRoot })` | ADR-0011 wrapper after shared build and namespace allocation | Consumes caller artifact; parallel namespaces share it | Wrapper owns namespace allocation/removal; factory owns/closes its private Sequelize/session | Typed success/no-op or failure; preserve primary/cleanup failures |
| Root `migrate:validate-emitted` | TASK-004 verification after one build and isolation allocation | Native Node consumes exact artifact; no rebuild in parallel cases | Factory owns each private guarded session; wrapper owns namespace cleanup | Nonzero on any artifact/runtime/migration/drift/lock/cleanup/assertion failure |
| Delivery migration step | Delivery automation after packaging selected build | Consumes packaged artifact; never compiles/mutates it | Factory constructs and closes the private guarded boundary from the delivery target descriptor | Same zero/one/two results as workspace up |

ADR-0011 concurrent integration orchestration builds exactly once before starting run-scoped database cases and passes the same immutable root to all cases. Migration operations never remove published builds. Later housekeeping may remove an artifact only after proving no running command or packaged delivery references it. Delivery invokes the emitted one-shot command explicitly before application startup. Migrations never run implicitly in API startup and are never exposed through HTTP or GraphQL.

Migration modules and runner never call the public Rick and Morty API, import/seed records, depend on Redis or GraphQL, depend on API startup, or use model synchronization. The ERD remains deferred until TASK-004 has executable migrated state and TASK-014 can compare the diagram with a freshly migrated database.

## Consequences

### Positive

- The small admitted grammar rejects truncation, normalization, quoting, case, and Unicode ambiguity before a connection exists.
- Runtime provenance is non-structural: only exact private `WeakMap` handles from the two authorized issuers can reach Sequelize.
- The exact compatibility profile removes version selection from TASK-004 and makes every driver/ORM assumption reviewable against a fixed lockfile.
- Exact loopback transport, disabled TLS, fixed startup fields, a non-null credential provider, and the blanket two-point `PG*` guard remove the remote/TLS/environment matrix from the supported portfolio.
- The eight-field preflight proves effective startup state, server identity, current role, identifier limit, and database class before namespace binding or lock work.
- Two exact `text` binds avoid conversion functions and raw `bytea` parsing while retaining pre/post catalog-name drift detection.
- A per-query remaining-time budget plus mandatory physical destruction bounds suspended queries and late lock results, not only successful polling loops.
- Database-local collision semantics avoid claiming cross-database contention that PostgreSQL cannot produce.
- Local, isolated-test, validation, and delivery operations exercise one native emitted ESM runtime.
- Strict source checking and runtime execution remain separate evidence boundaries.
- Canonical IDs/checksums remain stable across source/emitted extensions and compiler-output changes.
- Clean-build and emitted checksums reject stale or altered runtime artifacts.
- One PostgreSQL transaction makes the complete selected batch, history, and lock lifetime atomic.
- Database-backed locking serializes one schema while preserving disjoint same-database and all cross-database concurrency, subject to disclosed same-database false serialization.
- The private factory gives ADR-0011 one opaque target-handle interface without CLI, ORM, pool, or borrowed-session coupling.
- Repository-owned migration modules, metadata IDs, and command contracts keep Umzug replaceable.

### Negative

- Otherwise valid upper-case, quoted, hyphenated, Unicode, longer, non-local, and TLS PostgreSQL targets are deliberately unsupported.
- Every operation performs local handle/profile validation, two environment checks, one eight-field preflight, and duplicate two-field catalog binding around lock acquisition.
- Every operation creates and closes a private Sequelize boundary and depends on pinned pure-JavaScript node-postgres startup, timeout, socket-destruction, and Sequelize pool behavior.
- Every entry point must preserve the private issuer/`WeakMap` module boundary; exposing a raw tuple factory would invalidate provenance.
- The in-process guard assumes repository/dependency code does not adversarially mutate relevant environment state after the final check.
- Ordered field metadata/type OIDs, primitive values, exact decimal `int8`, per-query timeout, and pool invalidation require real locked-stack proof.
- `datistemplate` and `datallowconn` are mutable statement-time observations, not immutable database lineage; a former template renamed and changed to ordinary flags is distinguishable only through closed provenance and provisioning controls.
- PostgreSQL startup truncation, identifier length, system-schema, advisory-lock, and result semantics require compatibility review on every version change.
- Rename changes the lock key, while exact-name drop/recreate reuses it.
- Rebind observes exact names only at two statement snapshots; it does not prove object, owner, ACL, privilege, or uninterrupted namespace continuity, and later privileged DDL remains possible.
- Root contributor operations pay verified build/reuse cost; concurrent integration/delivery consume one prebuilt artifact.
- The repository owns resolver, manifest verifier/generator, storage, transaction/lock wrapper, command facade, diagnostics, and focused integration tests.
- Whole-command transactions can hold locks and delay vacuum longer than per-migration transactions.
- Transaction-incompatible DDL is unavailable initially.
- Compiler/build changes require manifest-integrity care even when logical source checksum is stable.
- Metadata/checksums cannot generically prove privileged manual schema mutation or last-history deletion.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| An excluded identifier is silently adapted into the admitted domain | Apply `^[a-z]{1}[a-z0-9_]{0,62}$` to database, schema, and user before connection; reject rather than trim, fold, normalize, quote, decode, or truncate; prove 63/64-byte, upper-case, Unicode, hyphen, and empty fixtures. |
| A forged or copied target reaches the driver | Store all target state only in a private `WeakMap`, expose no raw issuer, and require exact key membership before Sequelize; prove clone, spread, proxy, JSON, structural, and `authorized` objects fail with zero connection work. |
| Ambient driver state changes destination, credentials, TLS/session mode, startup fields, application name, binary behavior, or timeout | Fix every supported field and reject every non-empty environment entry whose effective name begins `PG` at both checks; prove zero Client/socket/SQL on rejection and log no values. |
| A null credential enters ambient password or password-file discovery | Require an already validated non-empty credential behind a truthy factory-owned provider that reads no environment, file, or network and never returns null or undefined; prove `PGPASSWORD` and every `pgpass` path are not consulted. |
| Same-process code mutates relevant environment state after the final check | Treat repository/dependency code as trusted for this portfolio, never mutate `process.env`, inject ordinary drift between the two checks, and reverse to the sanitized subprocess if adversarial same-process mutation becomes part of the threat model. |
| A dependency update changes a relied-on startup, parser, timeout, pool, or socket path | Lock every direct and named transitive version, perform source/runtime compatibility review before upgrade, and require a successor when guarantees change or cannot be reproduced. |
| Connection startup resolves or decodes through an untrusted path before SQL preflight | Use only the private local pure-JavaScript connection with exact same-value UTF8 in `options` and the serializer-appended pair plus startup `search_path=pg_catalog`; reject all `PG*`, URL, caller, native, borrowed, and remote paths; prove the exact packet and pre-SQL ordering without claiming application before authentication. |
| Sequelize opens a second ungoverned version-bootstrap connection | Fix `databaseVersion="18.6.0"`, use a private maximum-one/minimum-zero pool, hold exactly one session, and prove physical connection count under Sequelize 6.37.7. |
| Stock ORM initialization crosses the protected preflight boundary | Allow only enumerated guarded standard-string/message/timezone/type/OID/version work on the one session; prohibit hooks and application/namespace/history/lock/savepoint/DDL work and treat drift as a reversal trigger. |
| Database/user startup truncation or an incompatible server reaches work | Reject nonmatching or 64-byte inputs before opening a connection; require exact eight-field UTF8/pg_catalog/UTF8/180006/user/63/false/true preflight values. |
| A newer PostgreSQL 18 minor makes the reviewed server patch stale | Check the official PostgreSQL security/current-version record before implementation and delivery evidence; adopt a newer minor only after the documented source/runtime compatibility review, and require a successor if the guarantees change or cannot be reproduced. |
| A built-in, arbitrary, renamed, or non-connectable template database reaches migration work | Reject exact `template0`/`template1` locally; require `datistemplate=false` and `datallowconn=true` in the preflight; prove incompatible fixtures with no namespace bind, lock, history, or DDL. |
| Raw driver metadata or parsed values weaken fail-closed validation | Require unnamed raw array results with exact commands, ordered names/OIDs, cardinality, row lengths, primitive types, and diagnostic precedence; prove every malformed variant under locked patches. |
| A system or reserved schema reaches migration history | Reject exact `pg_` prefix and exact `information_schema` locally and on both returned text observations; prove privileged negatives with no history or DDL. |
| Privilege success is mistaken for application authorization | Keep role/ACL booleans out of provenance and identity; apply the normative domain guard even to the Compose superuser and prove a separate dedicated non-superuser migration path in TASK-004. |
| Ambient or role/database `search_path` changes startup conversion or later binding | Fix exact startup `search_path=pg_catalog` at client priority, reject `PGOPTIONS`/caller options, observe it in preflight, qualify relations/functions/types/casts/operators, and prove hostile defaults and shadowing fixtures. |
| Driver/ORM changes strings or loses signed precision | Require exact text equality, encode verified ASCII locally, use JavaScript `bigint` and canonical decimal `pg_catalog.int8`, and prove exact arrival under locked patches. |
| A suspended lock query outlives the command deadline | Give every poll the ceiling of remaining monotonic time as `query_timeout`; on expiry or late result destroy/remove the physical connection, issue no SQL rollback, and return result 2. |
| Emitted ESM or Umzug interoperability fails | Use the selected exact versions and prove native emitted loading, source maps, working directories, Windows, CI, and delivery parity before implementation claims. |
| Stale, partial, tampered, or concurrent build executes | Authenticate all inputs, outputs, mapping tuples, paths and toolchain fields; stage privately; publish immutable content-addressed roots; verify complete allowlists and reject drift before database access. |
| Applied migration is edited | Store/compare normalized source checksum, fail closed, and require a new corrective migration. |
| Schema and history diverge | Bind migration and storage operations to the same complete transaction and inject metadata failures in TASK-004. |
| Two processes apply the same pending migration | Bind/rebind exact namespace, acquire transaction lock before history, and prove two-caller winner visibility. |
| Lock blocks an unrelated namespace | Frame exact verified database/schema ASCII and prove overlap for two schemas in one database and for two databases. |
| A 64-bit projection collision serializes unrelated namespaces | Limit the claim to distinct schemas within one database, log the signed key, treat collision as safe false serialization and availability loss, and prove equal keys in different databases do not contend. |
| Rename, exact-name reuse, former-template lineage, flag drift, or external DDL surprises operators | Document name-based identity and statement-time observations: rename/disappearance/class drift can be observed, exact-name recreation or a former template with ordinary current flags can pass under closed provenance, and later privileged noncooperating DDL is not prevented; reconsider the identity/database-class boundary only after demonstrated need. |
| Process interruption or connection loss | Rely on transaction/session release, invalidate damaged connections, always close the factory-owned private Sequelize boundary, and verify timeout/interruption/loss paths. |
| Commit outcome is ambiguous | Prohibit automatic retry and require locked status plus history/manifest/schema evidence before reviewed recovery. |
| Long transactions are operationally harmful | Keep initial set small, measure TASK-004 execution, and supersede before nontransactional/online DDL. |
| Build latency harms Red feedback | Measure clean build; reconsider source-executed Umzug only if material and both runtimes prove reliable. |
| Manual schema/history mutation escapes checks | Restrict privileges operationally and require fresh-schema comparison and ERD verification. |
| Diagnostics expose topology or startup secrets | Safely escape identifiers; redact credentials, environment values, raw options, private target state, bytes, digest, and SQL; control log access and test diagnostic fields. |
| Cooperating executors use mixed identity versions | Prohibit mixed v1/v2 execution, expose the version in diagnostics, and update every supported entry point atomically in TASK-004. |

This decision must be superseded if upper-case, quoted, Unicode, hyphenated, longer-than-63-byte, non-UTF8, non-local, DNS, socket, TLS, client-certificate, native/libpq, caller-configured, or borrowed-session targets become required; opaque `WeakMap` provenance cannot remain closed; adversarial same-process environment mutation enters scope; the fixed compatibility profile changes a relied-on startup, serializer, parser, timeout, pool, socket-destruction, pgpass, or version-bootstrap behavior; the credential-provider non-entry premise fails; stock initialization accesses application data before preflight; an inadmissible database/schema or identifier alias is observed; ordered result metadata, text equality, primitive parsing, exact `int8`, forced destruction, or cleanup proof fails; supported platforms disagree; rebind, same-database serialization, cross-database non-contention, or bounded timeout cannot be proven; finite collision or exact-name reuse becomes unacceptable; rename-stable object identity becomes required; PostgreSQL changes its identifier, startup, catalog, or advisory-lock contract incompatibly; required DDL is transaction-incompatible; build/manifest maintenance becomes disproportionate; or another supported boundary supplies typed ESM, atomic checksummed storage, and database locking with materially less code.

## Validation

Before this proposal was allocated, TASK-018 completed three comparable primary-source reports, renewed analysis, temporary-classifier and operator-resolution re-entry, OID normalization, deterministic calculations, and independent pre-draft review. That point-in-time workflow and the later final-review PASS produced the historical ADR hash recorded in Context. The application-domain finding invalidated that hash as an approval target without erasing its chronology.

For the application-schema-domain correction, TASK-018 re-evaluated exact bytes, restricted ASCII, and catalog OIDs symmetrically under positive application-target provenance, exact lower-case `pg_` and exact `information_schema` exclusion, least-privilege separation, and precise rebind limitations. The reports returned `READY FOR RE-ANALYSIS` at 91/84/77; renewed analysis returned `DRAFT READY`; one bounded documentation-only IR-A correction completed whole-record traceability; and a distinct complete IR-A returned `PASS` with no finding on frozen ExecPlan SHA-256 `347724CC2B12F32DC48918B1397CB2704196183B4ED8894D0B9AC6616A437F27`. That revision later became historical when the encoding/database-class defects were found.

For the owner-authorized third correction, three fresh comparable reports evaluated UTF8-only preflight against transaction-local controlled conversion for exact bytes, restricted ASCII, and catalog OIDs; all returned `READY FOR RE-ANALYSIS` at unchanged 91/84/77. Renewed analysis returned `DRAFT READY` and selected exact catalog bytes with the three-field UTF8/class preflight and identical five-field binds. Fresh IR-A returned `REVISE` only because the decisive PostgreSQL source files were not cited durably; after the trace-only correction, complete re-review returned `PASS` with no Blocker, Major, or Minor on frozen ExecPlan SHA-256 `0EF102A03E23DF90189C422801F447D165B99FBBFC370675CDAB5302FC214B83`. That checkpoint authorized the now-historical third revision and has no current approval effect.

For the owner-authorized fourth correction, three fresh comparable reports evaluated startup-guarded UTF8-only, provisioned UTF8 zero-conversion, and startup-guarded multi-encoding against the same frozen contract. All returned `READY FOR RE-ANALYSIS`; renewed analysis returned `DRAFT READY` and selected the practical startup guard at 91 over 73 and 79 while preserving the exact-byte identity score of 91. Fresh IR-A returned `REVISE` only because the common source set omitted Sequelize's abstract connection manager; after that source-trace-only correction, a distinct complete re-review returned `PASS` with no Blocker, Major, or Minor on frozen ExecPlan SHA-256 `FD27155965B4FAEA3001C9277CD81EAB025CE2FA124AED9D0E0B61C90F3E6AB8`. Primary revision, integrated validation, and a different complete fresh final IR-B later passed, producing historical ADR hash `6AD00C9533849CFAA5C793B23B3DEF5C633AAB2D4FE3D577CCA5C2B0D9DF90B6`; the later environment-fallback finding made that PASS/hash non-authorizing.

For the owner-authorized fifth correction, three fresh comparable reports evaluated the pinned environment guard, sanitized migration subprocess, and closure-bound low-level adapter under one source-derived fallback inventory. All returned `READY FOR RE-ANALYSIS`; renewed analysis returned `DRAFT READY` and selected the stock guard at 91 over 83 and 76 without repair credit. Fresh IR-A returned `REVISE` only because the live validation clause and cumulative evidence cells stopped at the prior sixteen-invariant cycle; after that artifact-local outline correction, complete fresh re-review returned `PASS` with no Blocker, Major, or Minor on frozen ExecPlan SHA-256 `C7A2DABB1DC1BF99E8D202B7BCD11D9FAB16316D349713AE311C3201D2BCA838`. Primary revision and integrated validation produced exact ADR SHA-256 `215E31D6E78DBFA0879D916DDDAD75BA0E4E63943FC9B458DDDEE0DAA11C576C`, but the different complete fresh final IR-B returned `REVISE` after reproducing the pinned TLS `servername` overwrite and finding current-stage trace defects. The owner then authorized this direct primary-thread correction without the agent workflow. The prior hash and review are non-authorizing; direct validation is recorded in TASK-018, and the independent-review boundary remains unsatisfied. No migration implementation or dependency was added.

The direct TLS/SNI correction then produced historical SHA-256 `9B90D8BF366E83E038F53AFA5D520B28786F9C768B765B8FA45EC34D4A4C1528`. The project owner's later `RESTRICTED-ASCII-DOMAIN` direction materially changed the selected option, score, compatibility profile, provenance mechanism, preflight, catalog result type, vectors, timeout, and collision statement and produced historical restricted-profile SHA-256 `B38F26ED48A99CFB0D4FA99A1973637B4C9ED66AC6122598FB093A13AA3B4EC9`. Its exact review returned `REVISE` for startup-evidence clarity, the stale PostgreSQL minor, and asymmetric comparative scoring. The startup/version/common-baseline correction then produced historical SHA-256 `E649A26C334C16BC0B3800ECCB07C2F315F176EC0896C60D72E843765355B3E6`; its exact review returned `REVISE` solely for a residual current numerical-comparison statement in TASK-018 and ambiguous startup-timing wording in this ADR's validation obligations. Every earlier PASS and hash is therefore historical only. The precision correction keeps the living comparison qualitative and states the proven startup sequence exactly. Primary validation and fresh independent review passed on exact proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1`; explicit project-owner approval on 2026-08-14 made this record authoritative.

The integrated primary run used exact Node.js 24.18.0 and Python 3.12.10 to reproduce the five current v2 digests and signed keys, the 37-byte literal, framing suffixes, and positive/negative signed branches. Upper-case and Unicode fixtures rejected under the grammar and were not treated as vectors. These are calculation and contract checks only, not PostgreSQL or driver evidence; TASK-004 must repeat them in the locked implementation environment.

TASK-004 must follow ADR-0010 real-boundary TDD and provide reproducible evidence before any planned interface is called implemented, including all carried-forward ADR-0012 obligations:

- strict no-emit checking and a clean native emitted ESM build under exact locked versions;
- deterministic authenticated build IDs, exact artifact conformance vector, path/source normalization, mapping reconstruction, immutable publication/reuse, tamper/missing/extra rejection, and one-build/many-namespace operation on Windows and CI;
- native emitted loading/source maps from root, workspace, another CWD, validation, integration setup, and delivery;
- canonical migration IDs/order, complete inputs/outputs/mappings, mandatory runtime-validated `up/down`, checksummed exact-prefix history, and all malformed/drift states failing before mutation;
- empty-namespace migration, second-up no-op, absent-history non-mutating status, bounded rollback selectors, rollback/reapply, atomic bootstrap/log/unlog, injected migration/metadata/interruption/cleanup failures, and transaction-incompatible DDL rejection;
- exact direct and transitive package versions: Node 24.18.0, npm 11.16.0, TypeScript 6.0.3, PostgreSQL 18.6/`postgres:18.6-alpine`, Sequelize 6.37.7, Umzug 3.8.3, `pg` 8.22.0, `pg-hstore` 2.3.4, `pg-protocol` 1.15.0, and `pgpass` 1.0.5, plus a source/runtime compatibility fixture that blocks drift and a current-minor check before implementation/delivery evidence;
- a property-free frozen `TrustedMigrationTarget`, private `WeakMap` state, exactly two private issuer paths, and rejection of raw tuples, constructors, clones, spreads, structural lookalikes, `authorized` fields, proxies, and JSON before Sequelize with zero connection work;
- exact pre-connection database/schema/user grammar and 1-through-63-byte boundary, including positive length 63 and negative empty, length 64, upper-case, Unicode, hyphen, whitespace, template, `pg_*`, and `information_schema` fixtures; exact configured-user/current-user equality; and explicit proof that PostgreSQL database/user truncation cannot be reached;
- exact `127.0.0.1`, valid port, non-empty credential, `POSTGRES_*` loader, `ssl=false`, exact unquoted `options=-c client_encoding=UTF8 -c search_path=pg_catalog`, frontend `client_encoding=UTF8`, application name, 10-second connection timeout, binary false, `databaseVersion='18.6.0'`, no replication/native/URL/caller/session path, and truthy credential-provider behavior;
- blanket rejection at both checks of every non-empty effective environment name beginning `PG`, with names/reasons but no values, zero Client/socket/SQL, empty/non-empty cases, mutation between checks, Windows/POSIX semantics, and proof that ambient password and every `pgpass` path are not consulted;
- one factory-private pure-JavaScript Sequelize boundary; `getStartupConf()` forwarding exact `options` without falsely attributing a direct encoding field to it; the serializer-appended final `client_encoding=UTF8`; exact ordered StartupMessage/ParameterStatus/application name/timeout/session mode; PostgreSQL application of both startup controls after authentication but before `search_path` and client-encoding initialization, `ReadyForQuery`, and every Sequelize SQL statement; suppression of the separate version-bootstrap connection by the fixed database version; exactly one physical session; maximum-one/minimum-zero pool behavior; transaction termination, normal close, and forced pool removal/socket destruction;
- only the enumerated guarded stock Sequelize initialization before custom preflight, with no hook, application/model query, namespace bind, history access, lock, savepoint, or DDL;
- one unnamed raw eight-field preflight with exact SQL, ordered OIDs 25/25/25/23/25/23/16/16, primitive order string/string/string/number/string/number/boolean/boolean, exact `UTF8`/`pg_catalog`/`UTF8`/`180006`/configured-user/`63`/false/true values, malformed-result fixtures, and fixed diagnostic precedence;
- identical unnamed raw pre/post two-field binds with ordered OIDs 25/25, primitive strings, no `convert_to` or `bytea`, exact configured/retained equality, qualified text operators, exact decimal `pg_catalog.int8` arrival, exact boolean lock results, and malformed-result fixtures;
- local UTF8/PostgreSQL-18.6 positives; non-UTF8, wrong-version, wrong-user, wrong-identifier-limit, template, and non-connectable negatives before namespace binding, lock, history, savepoint, or DDL;
- rejection before connection and on both returned schema strings for `pg_catalog`, `pg_toast`, every temporary `pg_*` form, representative lower-case `pg_*`, and exact `information_schema`, with no history access or mutation;
- the same system-domain guard through the privileged official-image Compose role plus a separately proven dedicated non-superuser migration role with only required database/schema and owned-object capabilities; privilege checks remain outside identity/provenance;
- hostile `search_path` fixtures with shadow text/name equality operators, proving unchanged qualified-query behavior;
- identical pre/post catalog binding, complete retained-result drift detection, rename/disappearance and exact-name recreation behavior, the disclosed lack of immutable lineage or object/owner/ACL/privilege continuity, later external-DDL limitation, post-lock rollback with no history/DDL, and no key switch after locking;
- all five exact vectors in the locked runtime, 37-byte literal, framing suffixes, invalid-domain fixtures, deterministic key agreement at every entry point, absolute v1 non-reuse/non-reinterpretation, and injected 64-bit-collision safe serialization;
- two callers on one namespace following artifact preflight, `READ COMMITTED`, bind, poll, lock, rebind, fresh history, execution and commit so the waiter sees the winner and no-ops;
- observable overlap for disjoint schemas in one database, no contention between two databases even for equal keys, fixed 100 ms polling, default/range validation, per-query ceiling-of-remaining `query_timeout`, a suspended-query fixture, late-`true` fixture, observable physical-session destruction and pool removal, no SQL rollback on timeout, visibility/release, interruption/loss/ambiguity recovery, redacted diagnostics, and exact zero/one/two result mapping;
- ADR-0011 setup/cleanup preserving primary and cleanup failures; and
- network-disabled execution with no API import/seed, Redis, GraphQL, HTTP surface, startup migration, `sequelize.sync()`, or model synchronization.

TASK-014 derives and validates the ERD only after TASK-004 proves migrated state. ADR acceptance or documentation validation alone does not satisfy AC-009, DEL-002, or AC-012.

Fresh independent review returned `PASS` with no Blocker, Major, or Minor across all twenty hard gates and LOCK-INV-01 through LOCK-INV-21 on exact proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1`. The project owner explicitly approved those bytes on 2026-08-14. ADR-0012 is reciprocally `Superseded`, DG-005 is `Resolved`, and TASK-018 is `Complete`. TASK-004 remains `Pending`, unstarted, and dependent only on TASK-002 and TASK-003; accepting this ADR does not authorize TASK-004 execution.

## Evaluation

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 19 | 20 | Satisfies every mapped migration, separation, delivery, ERD, and adopted TypeScript commitment; the one-point cost records the deliberately narrower operational naming/connection domain. |
| Architectural fit and consistency | 19 | 20 | Preserves PostgreSQL, strict ESM TypeScript, migration/import separation, testing, ADR-0011 isolation, ADR-0014's image constraint, and the complete build-first lifecycle within the repository's actual local/CI topology. |
| Options and trade-offs | 14 | 15 | Compares restricted ASCII, exact catalog bytes, and OIDs under one identical local/startup/provenance/timeout baseline; varies only identity-relevant properties; preserves the strongest exact-name dissent and explicit successor triggers. |
| Feasibility and proportionality | 14 | 15 | One opaque target, loopback-only plain transport, blanket `PG*` guard, one eight-field preflight, two text binds, and a destructive deadline path are substantial but bounded and remove unsupported Unicode/TLS/remote matrices. |
| Quality attributes | 9 | 10 | Improves correctness, isolation, diagnosability, portability, timeout safety, and database-class safety while retaining cooperative locking and a finite projection. |
| Verifiability | 10 | 10 | Fixes every version, issuer, input, startup value, SQL field/OID, vector, timeout transition, destruction effect, collision domain, diagnostic, and downstream fixture. |
| Evolution and reversibility | 7 | 10 | The v2 literal and restrictive profile are explicit and successor-friendly, but broadening names, transport, encoding, or versions has deliberate compatibility and migration cost. |
| **Total** | **92** | **100** | |

**Recommendation:** Accept. Fresh independent exact-artifact review returned `PASS` and the project owner explicitly approved the reviewed proposal on 2026-08-14.

The score is 92/100. The owner-selected ASCII/local profile is proportional for this portfolio because it keeps v2 catalog-bound identity and the complete build-first lifecycle while removing unsupported Unicode, remote-TLS, arbitrary-host, and open driver-configuration scope. ADR-0015 is `Accepted`, ADR-0012 is `Superseded`, DG-005 is `Resolved`, and TASK-018 is `Complete`. No migration implementation exists; TASK-004 remains `Pending` and still requires separate execution authorization.

## References

- [Requirements specification](../REQUIREMENTS.md)
- [ADR index](./README.md)
- [ADR-0002: TypeScript across the stack](./0002-use-typescript-across-the-stack.md)
- [ADR-0003: PostgreSQL relational persistence](./0003-use-postgresql-for-relational-persistence.md)
- [ADR-0008: Deterministic bootstrap and import](./0008-use-deterministic-bootstrap-and-idempotent-sync.md)
- [ADR-0010: Targeted automated testing strategy](./0010-use-a-targeted-automated-testing-strategy.md)
- [ADR-0011: TypeScript test harness](./0011-define-the-typescript-test-harness.md)
- [ADR-0012: Superseded build-first migration lifecycle](./0012-use-a-build-first-programmatic-migration-lifecycle.md)
- [ADR-0014: Accepted direct image-URL persistence](./0014-persist-and-deliver-character-image-urls-directly.md)
- [Implementation plan](../IMPLEMENTATION_PLAN.md)
- [Gherkin specification index](../specs/README.md)
- [Completed TASK-018 decision ExecPlan](../plans/completed/TASK-018-postgresql-migration-lock-identity-decision.md)
- [TASK-004 completed ExecPlan](../plans/completed/TASK-004-relational-persistence-from-migrations.md)
- [PostgreSQL REL_18_6 backend startup source (`backend_startup.c`)](https://raw.githubusercontent.com/postgres/postgres/REL_18_6/src/backend/tcop/backend_startup.c)
- [PostgreSQL REL_18_6 session initialization and startup-option source (`postinit.c`)](https://raw.githubusercontent.com/postgres/postgres/REL_18_6/src/backend/utils/init/postinit.c)
- [PostgreSQL REL_18_6 GUC precedence source (`guc.c`)](https://raw.githubusercontent.com/postgres/postgres/REL_18_6/src/backend/utils/misc/guc.c)
- [PostgreSQL REL_18_6 GUC source definitions (`guc.h`)](https://raw.githubusercontent.com/postgres/postgres/REL_18_6/src/include/utils/guc.h)
- [PostgreSQL REL_18_6 encoding-conversion source (`mbutils.c`)](https://raw.githubusercontent.com/postgres/postgres/REL_18_6/src/backend/utils/mb/mbutils.c)
- [PostgreSQL REL_18_6 namespace/default-conversion lookup source (`namespace.c`)](https://raw.githubusercontent.com/postgres/postgres/REL_18_6/src/backend/catalog/namespace.c)
- [PostgreSQL REL_18_6 query-message source (`postgres.c`)](https://raw.githubusercontent.com/postgres/postgres/REL_18_6/src/backend/tcop/postgres.c)
- [PostgreSQL REL_18_6 protocol value source (`pqformat.c`)](https://raw.githubusercontent.com/postgres/postgres/REL_18_6/src/backend/libpq/pqformat.c)
- [PostgreSQL 18.6 security release announcement](https://www.postgresql.org/about/news/postgresql-186-1711-1615-1519-1424-and-19-beta-3-released-3365/)
- [PostgreSQL 18.6 release notes](https://www.postgresql.org/docs/release/18.6/)
- [PostgreSQL security release policy](https://www.postgresql.org/support/security/18/)
- [PostgreSQL versioning policy](https://www.postgresql.org/support/versioning/)
- [Docker Official Image PostgreSQL tags](https://raw.githubusercontent.com/docker-library/official-images/master/library/postgres)
- [PostgreSQL 18 protocol flow](https://www.postgresql.org/docs/18/protocol-flow.html)
- [PostgreSQL 18 protocol message formats](https://www.postgresql.org/docs/18/protocol-message-formats.html)
- [PostgreSQL 18 `pg_database` catalog](https://www.postgresql.org/docs/18/catalog-pg-database.html)
- [PostgreSQL 18 template databases](https://www.postgresql.org/docs/18/manage-ag-templatedbs.html)
- [PostgreSQL 18 character-set support](https://www.postgresql.org/docs/18/multibyte.html)
- [PostgreSQL 18 lexical structure and 63-byte identifier limit](https://www.postgresql.org/docs/18/sql-syntax-lexical.html)
- [Sequelize release policy](https://sequelize.org/releases/)
- [Sequelize v7 CLI posture](https://sequelize.org/docs/v7/cli/)
- [Sequelize v6 migrations](https://sequelize.org/docs/v6/other-topics/migrations/)
- [Sequelize v6 transactions](https://sequelize.org/docs/v6/other-topics/transactions/)
- [Umzug 3.8.3 release](https://github.com/sequelize/umzug/releases/tag/v3.8.3)
- [Umzug 3.8.3 resolver and execution source](https://raw.githubusercontent.com/sequelize/umzug/v3.8.3/src/umzug.ts)
- [Umzug 3.8.3 types](https://raw.githubusercontent.com/sequelize/umzug/v3.8.3/src/types.ts)
- [Umzug 3.8.3 storage contract](https://raw.githubusercontent.com/sequelize/umzug/v3.8.3/src/storage/contract.ts)
- [Node.js ESM](https://nodejs.org/api/esm.html)
- [Node.js Buffer](https://nodejs.org/download/release/v24.18.0/docs/api/buffer.html)
- [Node.js Crypto](https://nodejs.org/download/release/v24.18.0/docs/api/crypto.html)
- [TypeScript module reference](https://www.typescriptlang.org/docs/handbook/modules/reference.html)
- [node-postgres query parameters](https://node-postgres.com/features/queries)
- [node-postgres result contract](https://node-postgres.com/apis/result)
- [node-postgres transaction client ownership](https://node-postgres.com/features/transactions)
- [node-postgres `pg@8.22.0` client startup source](https://raw.githubusercontent.com/brianc/node-postgres/pg%408.22.0/packages/pg/lib/client.js)
- [node-postgres `pg@8.22.0` TLS connection source](https://raw.githubusercontent.com/brianc/node-postgres/pg%408.22.0/packages/pg/lib/connection.js)
- [node-postgres `pg@8.22.0` stream-to-Node-TLS source](https://raw.githubusercontent.com/brianc/node-postgres/pg%408.22.0/packages/pg/lib/stream.js)
- [node-postgres `pg@8.22.0` connection-parameter source](https://raw.githubusercontent.com/brianc/node-postgres/pg%408.22.0/packages/pg/lib/connection-parameters.js)
- [node-postgres `pg@8.22.0` environment-backed defaults](https://raw.githubusercontent.com/brianc/node-postgres/pg%408.22.0/packages/pg/lib/defaults.js)
- [node-postgres `pg@8.22.0` protocol serializer source](https://raw.githubusercontent.com/brianc/node-postgres/pg%408.22.0/packages/pg-protocol/src/serializer.ts)
- [`pgpass@1.0.5` environment and password-file helper](https://raw.githubusercontent.com/hoegaarden/pgpass/4230ed5e417ba6044ea7eb80b7c33db9ec301398/lib/helper.js)
- [Sequelize 6.37.7 PostgreSQL connection manager](https://raw.githubusercontent.com/sequelize/sequelize/v6.37.7/src/dialects/postgres/connection-manager.js)
- [Sequelize 6.37.7 abstract connection manager](https://raw.githubusercontent.com/sequelize/sequelize/v6.37.7/src/dialects/abstract/connection-manager.js)
- [Sequelize v6 connection-pool contract](https://sequelize.org/docs/v6/other-topics/connection-pool/)
- [Node.js 24.18.0 process environment](https://nodejs.org/download/release/v24.18.0/docs/api/process.html#processenv)
- [Node.js 24.18.0 child-process environment](https://nodejs.org/download/release/v24.18.0/docs/api/child_process.html)
- [Node.js 24.18.0 `net.isIP`](https://nodejs.org/download/release/v24.18.0/docs/api/net.html#netisipinput)
- [PostgreSQL 18 operator resolution](https://www.postgresql.org/docs/18/typeconv-oper.html)
- [PostgreSQL 18 schemas and search path](https://www.postgresql.org/docs/18/ddl-schemas.html)
- [PostgreSQL 18 information schema](https://www.postgresql.org/docs/18/infoschema-schema.html)
- [PostgreSQL 18 privileges](https://www.postgresql.org/docs/18/ddl-priv.html)
- [PostgreSQL 18 role attributes](https://www.postgresql.org/docs/18/role-attributes.html)
- [PostgreSQL 18 system-information functions](https://www.postgresql.org/docs/18/functions-info.html)
- [PostgreSQL 18 qualified operator syntax](https://www.postgresql.org/docs/18/sql-expressions.html#SQL-SYNTAX-OPERATOR-INVOCATIONS)
- [PostgreSQL 18 binary-string functions](https://www.postgresql.org/docs/18/functions-binarystring.html)
- [PostgreSQL 18 catalog pg_database](https://www.postgresql.org/docs/18/catalog-pg-database.html)
- [PostgreSQL 18 catalog pg_namespace](https://www.postgresql.org/docs/18/catalog-pg-namespace.html)
- [PostgreSQL 18 advisory-lock functions](https://www.postgresql.org/docs/18/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS)
- [PostgreSQL 18 explicit advisory locking](https://www.postgresql.org/docs/18/explicit-locking.html#ADVISORY-LOCKS)
- [PostgreSQL 18 `pg_locks` database-local advisory-lock scope](https://www.postgresql.org/docs/18/view-pg-locks.html)
- [PostgreSQL REL_18_STABLE namespace classifier](https://github.com/postgres/postgres/blob/REL_18_STABLE/src/backend/catalog/namespace.c#L3475-L3508)
- [PostgreSQL REL_18_STABLE temporary initialization](https://github.com/postgres/postgres/blob/REL_18_STABLE/src/backend/catalog/namespace.c#L4179-L4226)
- [Docker Official Image for PostgreSQL](https://github.com/docker-library/docs/blob/master/postgres/README.md)
