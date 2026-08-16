# ADR-0012: Use a Build-First Programmatic Migration Lifecycle

- Status: Superseded
- Date: 2026-08-10
- Approval date: 2026-08-10
- Decision owners: Project owner and project maintainers
- Related requirements: FR-BE-003, FR-BE-004, NFR-003, DEL-002, AC-009, AC-012, OR-001
- Related decisions: ADR-0001, ADR-0002, ADR-0003, ADR-0008, ADR-0010, ADR-0011, ADR-0014, ADR-0015
- Controlled gate: DG-002; resolved by project-owner approval of this decision on 2026-08-10
- Supersedes: None
- Superseded by: ADR-0015

> Lifecycle notice: ADR-0015 superseded this whole record on 2026-08-14 after fresh independent review returned `PASS` on exact proposal SHA-256 `8B7B9EC9508DF01E57EA067344896814CD0B0B1B3D8083B889C7ED44AA5432B1` and the project owner explicitly approved those bytes. This body remains preserved as historical evidence. Its `migrations:v1` identity must not be implemented, reused, or reinterpreted; accepted ADR-0015 is the current migration-lifecycle authority.

## Context

The backend must use Sequelize migrations to create a PostgreSQL application schema, and the repository has adopted strict TypeScript and ECMAScript modules as delivery commitments. The same logical migration sequence must support local setup, the isolated PostgreSQL namespaces required by ADR-0011, rollback and recovery, and later delivery execution. Migrations must remain deterministic and network-free, while the explicit importer owned by ADR-0008 initializes the required 15 characters after schema creation.

The repository is still documentation-only. It contains no application manifest, dependency, migration configuration, migration source, migration command, database-backed harness, or migrated database. DG-002 previously blocked those artifacts until an accepted decision defined the runner, source and emitted artifact lifecycle, stable identity, metadata behavior, transaction boundary, rollback, recovery, and concurrent execution. This accepted decision defines future interfaces for TASK-004; it is not evidence that any interface or behavior exists.

Three complete strategy shapes were researched against one rubric: programmatic Umzug executing TypeScript source locally and in tests while validating emitted JavaScript for delivery; programmatic Umzug executing clean emitted ESM JavaScript in every context; and the Sequelize 6 CLI executing compiled JavaScript behind a repository wrapper. Current primary sources keep Sequelize 6 on its stable current line, keep Sequelize 7 and its CLI in alpha, and direct v7 migration users toward Umzug or another migration tool. Umzug 3 provides the programmatic resolution, storage, context, forward, status, and rollback hooks needed here, but its defaults do not provide this repository's identity, checksum, mandatory rollback, atomic metadata, or database-locking contract.

## Decision drivers

- Satisfy FR-BE-003, NFR-003, and AC-009 with version-controlled Sequelize migrations over PostgreSQL.
- Preserve FR-BE-004 and ADR-0008 separation: schema migration cannot call the public Rick and Morty API or import records.
- Preserve ADR-0001 root-to-workspace transparency and ADR-0011 run-scoped PostgreSQL isolation and cleanup ownership.
- Preserve ADR-0002 strict TypeScript, ESM, independent no-emit checking, and native-runtime honesty.
- Make one logical migration identity stable across authored `.ts` and emitted `.js` artifacts.
- Reject duplicate, malformed, inserted-before-history, stale, missing, extra, unknown, non-prefix, and changed-applied migration states before schema mutation.
- Make schema changes and migration-history changes one atomic PostgreSQL unit for the initial lifecycle.
- Require typed and runtime-validated forward and rollback operations.
- Define bounded forward, no-op, status, rollback, failure, interruption, and ambiguous-commit behavior.
- Serialize a complete command for one database/schema while allowing disjoint ADR-0011 namespaces to proceed independently.
- Use the same native emitted ESM runtime locally, in integration setup, in emitted-artifact validation, and in delivery.
- Keep TASK-004's implementation and validation surface proportional and reversible.

## Considered options

| Option | Benefits | Costs and risks | Outcome |
|---|---|---|---|
| Programmatic Umzug 3 executing one immutable emitted ESM publication in local, integration-test, validation, and delivery contexts | One native runtime and reusable content-addressed artifact; direct control of typed context, custom storage, identity, transaction, locking, status, rollback, logging, and connection ownership; no TypeScript runtime loader | Requires explicit build/publication before execution plus a repository-owned resolver, full-artifact manifest verifier, storage, lock wrapper, and command facade | Selected |
| Programmatic Umzug 3 executing TypeScript source through `tsx` locally and in tests, with native emitted ESM for validation and delivery | Faster local and integration feedback; retains programmatic lifecycle control | Adds `tsx` and esbuild, creates two physical runtimes, and requires both source-transform and emitted-runtime proof on Windows and continuous integration | Rejected initially; reconsider if measured build latency harms TDD and both paths prove equally reliable |
| Sequelize 6 CLI executing compiled JavaScript behind a repository wrapper | Familiar migrate, status, and undo commands; current supported Sequelize 6 pairing | Uses Umzug 2 and CWD-sensitive discovery; native identity includes the extension; metadata is name-only and recorded separately through model synchronization; whole-command locking needs a session-holding child-process wrapper; v7 CLI is not ready | Rejected |

The common criteria matrix used for the decision was:

| Common criterion | Build-first programmatic Umzug | Source-executed programmatic Umzug | Compiled-artifact Sequelize CLI |
|---|---|---|---|
| Accepted architecture and release fit | Fits stable Sequelize 6, Umzug 3, PostgreSQL, strict TypeScript, and ESM with one native emitted runtime. | Fits the same release lines but adds a source runtime that delivery does not use. | Credible only on Sequelize 6; the v7 CLI is not ready and the v6 CLI retains an older Umzug 2 boundary. |
| TypeScript, ESM, and runtime honesty | Independently checks strict source, then runs only clean emitted ESM in every context. | Transforms source through `tsx` locally and in tests, then uses native emitted ESM in delivery; both physical runtimes require proof. | Runs emitted JavaScript through a synchronous legacy loader with ESM restrictions and current-working-directory-sensitive configuration. |
| Identity, discovery, and artifact integrity | Uses manifest-only discovery, extension-neutral IDs, immutable content-addressed builds, exact file allowlists, and digest-bound source-to-output mappings. | Needs the same logical controls across separate source and emitted execution paths. | Native identity includes the emitted extension and supplies no checksum or source/output mapping; a wrapper must add every drift control. |
| Metadata and transaction consistency | Uses schema-local checksummed history in the same complete-command transaction as DDL. | Can use the same custom storage and transaction contract. | `SequelizeMeta` is name-only, model-synchronized, and updated separately from migration code, so the supported lifecycle is not schema-plus-history atomic. |
| Forward, rollback, failure, and recovery | Applies all pending migrations or no-ops, exposes bounded rollback, fails atomically, and uses locked status after an ambiguous commit. | Can provide the same semantics, but both runtimes must prove them. | Broad CLI rollback primitives and per-migration transactions require suppression and still allow partial-batch or metadata ambiguity. |
| Same-namespace and disjoint concurrency | A namespace-derived PostgreSQL transaction advisory lock serializes one namespace while distinct schemas receive distinct keys. | Can use the same database lock. | Supplies no database command lock; a repository wrapper must hold a session lock across a child process and own interruption cleanup. |
| Invocation, ownership, and forbidden coupling | Root, workspace, ADR-0011 setup, validation, and delivery consume one immutable build through one factory with explicit cleanup ownership and no import or API coupling. | Shares the factory but splits source-transformed and emitted invocation evidence. | Adds wrapper, child-process, CWD, exit, and connection ownership while the wrapper must enforce every forbidden coupling. |
| Proportionality and verifiability | Requires meaningful custom resolver, manifest, storage, lock, and command code, but concentrates behavioral proof on one runtime. | Offers faster feedback at the cost of another dependency and a second mandatory runtime proof path. | Familiar commands conceal the largest effective safety wrapper and widest proof surface. |

The build-first option dominates the other strategies in architectural fit, proportionality, quality attributes, and verifiability. The source-executed option has a legitimate feedback-speed advantage but adds a second executor without removing any identity, storage, transaction, or lock work. The CLI's visible simplicity disappears once the repository supplies the wrappers needed for safe identity, drift, recovery, concurrency, ESM, and cleanup, and its supported metadata lifecycle cannot make schema and history atomic.

## Decision

Under this accepted decision, TASK-004 will implement a private programmatic migration boundary using the current compatible Umzug 3 line with the stable Sequelize 6 line. TASK-004 will lock and prove exact compatible package patches together with the repository's Node.js, TypeScript, PostgreSQL, and package-manager targets. Sequelize 7 alpha and the Sequelize CLI are outside this lifecycle unless a later ADR supersedes this decision.

All migration modules will be authored in strict TypeScript and independently checked by the repository no-emit type-check boundary. No command will execute TypeScript source. A migration build will publish an immutable native ESM artifact and source maps, then all local, integration-test, validation, and delivery operations will execute one explicitly selected published artifact through the selected native Node.js runtime with source maps enabled.

The planned authored root is `apps/api/src/infrastructure/database/migrations/`; the planned publication root is `apps/api/dist/infrastructure/database/migrations/builds/`. Each immutable build root beneath it will contain the emitted runner, a `files/` directory, source maps, and `migration-manifest.json`. Resolution will be anchored to the selected build root and the emitted runner's `import.meta.url`, never `process.cwd()`. A canonical migration ID must match `[0-9]{14}-[a-z0-9]+(?:-[a-z0-9]+)*`; source filenames add `.ts`, and emitted migration filenames use the identical stem plus `.js`. The ASCII extension-neutral stem is ordered by simple code-point comparison, which is also its UTF-8 byte order. Runtime discovery will use the selected generated manifest rather than an unbounded working-directory glob.

Every manifest path will use one platform-independent canonical grammar. The builder walks the declared repository or private staging root and obtains actual directory-entry components; it does not hash a caller-supplied path alias. On Windows, U+005C reverse solidus (`\`) and U+002F slash (`/`) delimit builder-observed path components. On POSIX, only slash is a delimiter and any literal reverse solidus returned inside a directory-entry component is rejected rather than converted. The builder joins validated components with slash and requires the result to be a non-empty relative path. Each segment may contain only ASCII letters, digits, periods, underscores, and hyphens, and its final character cannot be a period. It rejects the NUL code point, non-ASCII characters, an initial or final slash, repeated separators, drive-letter prefixes, UNC/device or other absolute forms, empty segments, `.` or `..` segments, and a case-insensitive Windows device basename before the first period (`CON`, `PRN`, `AUX`, `NUL`, `COM1` through `COM9`, or `LPT1` through `LPT9`). It performs no percent decoding, Unicode normalization, or dot-segment resolution. Every traversed entry must be an ordinary file or directory, not a symlink or reparse point, and its resolved path must remain below the declared root. ASCII case is preserved exactly and never folded; paths must be unique both byte-for-byte and after ASCII lowercase comparison within each rooted allowlist so an artifact cannot contain a Windows-only case collision. Canonical paths are sorted by their raw UTF-8 bytes. Only builder-observed Windows separators undergo conversion; every path stored in the manifest must already be canonical, and runtime preflight rejects rather than rewrites a reverse solidus or any other non-canonical form. It applies the same lexical grammar and collision checks to every stored input, output, and mapping path without asking the host filesystem to normalize case.

For every authored input, source-byte normalization is exact: read the raw bytes; reject the UTF-8 BOM (`EF BB BF`) and invalid UTF-8; decode without replacement; replace each CRLF pair and each remaining CR with one LF; re-encode as UTF-8; and hash those bytes. No Unicode normalization, case folding, trimming, other whitespace change, or terminal-newline insertion or removal occurs; every other decoded Unicode scalar value remains in the same sequence. Published-output checksums instead hash each exact staged file byte-for-byte with no text decoding or line-ending normalization. All SHA-256 values are 64 lowercase hexadecimal ASCII characters. A manifest `role` begins with a lowercase ASCII letter and otherwise contains only lowercase ASCII letters, digits, and hyphens; emitted migration modules use the exact role `migration`.

The artifact-manifest schema version is the UTF-8 literal `rick-and-morty-explorer:migration-artifact:v1`. Its `inputs` allowlist will contain the normalized repository-relative path and normalized UTF-8/LF SHA-256 for every authored input that can change the published runtime: the build generator, command, runner, resolver, storage, lock, context and error modules, every migration module, the migration TypeScript configuration, and the relevant package/dependency-lock description. Its toolchain fields will contain the exact TypeScript compiler and Node.js target versions. Paths are sorted by UTF-8 byte order and must be unique.

After compilation and before publication, the build ID will be the lowercase hexadecimal SHA-256 of this exact length-prefixed byte sequence:

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

`LP` has the same four-byte unsigned big-endian length plus UTF-8 bytes definition used by the advisory-key algorithm. Each decimal count is its canonical base-10 ASCII form with no leading zero, except the value zero itself. Section tags and counts make each list boundary explicit. The relevant compiler configuration and dependency-lock description are ordinary allowlisted inputs, so changing either changes the build ID. A runner, resolver, storage, lock, command, build-generator, migration-source, emitted-file, or canonical source/output association change must therefore produce a different build ID.

The build will compile into a process-unique staging directory. The manifest's `files` allowlist will contain the normalized build-relative path, role, and SHA-256 of every published file except the manifest itself, including the emitted command, runner, resolver, storage, lock, context/error modules, migration modules, and source maps. Paths are sorted by UTF-8 byte order and unique. The staging root must contain exactly `migration-manifest.json` plus those allowlisted files; missing, extra, or changed files fail verification. The manifest maps each canonical migration ID to its normalized source path/checksum and emitted migration path/checksum for applied-history validation. Every mapping path and checksum must be a byte-for-byte reference to its corresponding input or output allowlist entry. The builder derives this mapping rather than accepting arbitrary associations: it selects every grammar-matching `.ts` input below the authored migration root and every `migration`-role `.js` output, matches their identical extension-neutral stems, and requires an exact one-to-one set with no unmatched, duplicate, or multiply mapped entry.

The following normative conformance vector fixes canonicalization, mapping projection, framing, and digest behavior. The toolchain strings are serialization fixtures only; they do not select TASK-004 package or runtime versions.

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

With one input, one output, and one mapping tuple `(canonical migration ID, canonical input path, source SHA-256, canonical output path, output SHA-256)`, the exact `LP` sequence above must produce build ID `e825ac106c1bb8f5af041646699c4e2398b832a55dca90c54155db4195bf37a5`. Changing only that tuple's ID to `20260810120000-create-comment` produces digest `1b9470376a7b0878b9679efd3707f9d2696415b5e50ebefbe76a21262d34aaf5` and also violates the identical-stem projection, so preflight must reject it before database access.

After full verification, the builder publishes by renaming the staging directory to `builds/<build-id>/`. A published build root is immutable. Concurrent builders for the same ID must either publish once or recompute the build ID and verify the existing manifest and complete file allowlist before reuse; they must never replace or delete it. The builder owns cleanup only for its private staging directory. It fails on malformed or duplicate IDs, incomplete input coverage, mismatched source/output sets, a non-canonical mapping projection, unexpected published files, a conflicting publication, or an incomplete staging root.

Runtime preflight will independently reconstruct the canonical mapping from the manifest's migration-source input paths and `migration`-role output paths, require exact equality with the sorted manifest mapping, recompute the build ID from the complete input, output, and mapping descriptions, require it to equal both the manifest value and selected directory name, and verify the exact published-file allowlist and every checksum before database access. A mapping-only change, including a swapped canonical ID, source association, or emitted association, fails the reconstruction check or changes the recomputed ID. Manifest tampering with an input, output path, role, mapping field, or checksum changes the recomputed ID; runner or migration output tampering fails its file checksum; changing both output and manifest still produces an ID that does not match the immutable directory name. The normalized migration-source checksum is the durable meaning of an applied migration; emitted checksums prove that the selected build output matches its manifest but do not turn compiler output into the migration's logical identity. An applied source migration must never be edited; a correction uses a new migration.

The repository will not use Umzug's default resolver, built-in `SequelizeStorage`, optional rollback contract, filename identity, command-line interface, or `FileLocker`. A repository-owned resolver will load only manifest-listed emitted modules, assign the canonical extension-neutral ID, and validate every module before any database mutation. Each module must export a value satisfying a repository-owned `MigrationDefinition` with mandatory asynchronous `up` and `down` operations. Both operations receive one context containing the configured Sequelize `QueryInterface`, canonical schema, and the command's PostgreSQL transaction.

The planned `createMigrator` factory will receive a configured Sequelize instance, canonical database and schema identity, absolute immutable build root, manifest path, structured logger, bounded lock timeout, and explicit connection-ownership flag. It will derive the QueryInterface and own artifact validation, transaction creation, migration resolution, storage binding, locking, and result mapping. It will close only a Sequelize connection it created or was explicitly told to own. It will never build, replace, or delete an artifact. ADR-0011's integration wrapper will own creation and removal of the run-scoped PostgreSQL database or schema and will preserve a primary migration failure while reporting any later cleanup failure separately.

Migration history will live in a schema-qualified `sequelize_migration_history` table created through explicit QueryInterface or SQL operations, never `sequelize.sync()`, model synchronization, or application model state. Its minimum contract is a unique primary-key `migration_id`, the normalized `source_sha256`, and `applied_at` in UTC. History must be an exact prefix of the manifest order. An unknown applied ID, non-prefix history, missing applied manifest entry, or source-checksum mismatch fails closed with a drift result before migration code runs. Arbitrary privileged schema mutation or deletion of the final history row cannot be proven generically from this history and remains an operational limitation.

Every operation will first validate its immutable artifact without accessing migration history. It will then begin an explicit PostgreSQL `READ COMMITTED` transaction, acquire the namespace advisory lock before the first history read, read history after acquisition, and only then compute the operation. The explicit isolation level ensures that lock-poll statements cannot freeze a pre-wait history snapshot and that the post-lock read observes the prior lock holder's committed result.

`up` will apply every pending migration in deterministic order after that fresh history read. An empty pending set is a successful, logged no-op. `status` will use the same `READ COMMITTED`, lock-before-history sequence, report ordered applied and pending IDs plus checksum agreement, and treat an absent history table as empty without creating it or mutating the schema.

`down` against empty history is a successful, logged no-op. With no selector it otherwise reverts exactly the last applied migration and may therefore reach an empty history when only one migration is applied. `down --step <count>` accepts a positive decimal integer. A count greater than one requires the exact boolean acknowledgement `--confirm-multiple`; when more than one migration is applied, an explicit count must be smaller than the applied count so it cannot empty a multi-entry history. `down --keep-through <migration-id>` means that the named applied migration remains applied and every later migration is reverted; keeping the latest migration is a successful no-op, keeping the first leaves the first applied, and keeping an intermediate migration leaves the exact prefix through it. Step and keep-through selectors are mutually exclusive. A missing, malformed, unknown, or non-applied target, a step outside these bounds, or a missing acknowledgement fails before migration code with `MIGRATION_ROLLBACK_BOUNDS`. The public facade will not expose rollback-to-zero or rollback-all selectors, arbitrary migration lists, out-of-order execution, or rerun modes.

Every mutating `up` or `down` command will use one PostgreSQL transaction for the complete selected batch, migration-history bootstrap and writes, and advisory-lock lifetime. Every QueryInterface operation and custom-storage operation must receive that same transaction. Execution stops on the first failure. A failed forward command leaves none of that command's pending migrations or history rows applied; a failed rollback leaves that command's schema and history unchanged. The initial lifecycle prohibits `CREATE INDEX CONCURRENTLY` and every other operation that cannot execute inside its transaction. A demonstrated need for nontransactional DDL requires a superseding ADR with an explicit non-atomic recovery model.

Before reading or mutating history, each command will obtain a PostgreSQL transaction-level advisory lock through bounded polling of `pg_try_advisory_xact_lock(bigint)`. The versioned namespace literal is the UTF-8 string `rick-and-morty-explorer:migrations:v1`. The database and schema inputs are the exact actual identifier strings used by the configured connection and factory after Unicode NFC normalization; they are not trimmed, case-folded, quoted, or unquoted.

Key derivation uses this canonical algorithm, where `LP` is a four-byte unsigned big-endian byte length followed by the UTF-8 bytes:

```text
payload = LP("rick-and-morty-explorer:migrations:v1")
       || LP(NFC(databaseName))
       || LP(NFC(schemaName))
digest = SHA-256(payload)
unsigned = first 8 digest bytes interpreted as unsigned big-endian 64-bit
signed = unsigned < 2^63 ? unsigned : unsigned - 2^64
```

The signed decimal value is passed to PostgreSQL as `bigint`. Required test vectors are:

| Database | Schema | Signed advisory key |
|---|---|---:|
| `rick_and_morty` | `public` | `-7317150795320584587` |
| `rick_and_morty` | `task_004_a` | `6475279315146276182` |
| `RickMorty` | `CaseSensitive` | `2228155221670076993` |

The lock timeout is bounded and configurable; TASK-004 will select and document the default through an executable configuration boundary. Timeout returns a stable, nonzero lock-contention result and logs the operation, exact database and schema identifiers, derived key, elapsed wait, and outcome without credentials. Transaction or session end guarantees lock release. The same namespace therefore serializes and performs a fresh history read after waiting, while different schema identities receive different keys and can proceed concurrently. Every supported entry point must use this factory because advisory locking is cooperative.

Failure and recovery behavior is explicit. Validation, drift, connection, migration, rollback, metadata, and cleanup failures return nonzero and retain structured diagnostics. A lock timeout has a distinct nonzero result. Normal success, read-only status, and an up/down no-op return zero. Interruption before commit rolls back the transaction and releases its lock through transaction or session end. If the connection is lost near commit and the outcome is ambiguous, the command must not retry automatically: the operator or caller reconnects and runs locked read-only `status`, then compares history, manifest, and schema evidence before choosing a reviewed recovery. A transient failed rollback can be retried only when status shows the original applied state; a rollback logic defect cannot be repaired by silently changing the applied migration source.

The exact planned operation boundaries are:

| Interface | Caller and prerequisite | Artifact behavior | Database and connection ownership | Exit/result behavior |
|---|---|---|---|---|
| API workspace `migration:build` | Contributor, root orchestration, continuous integration, or delivery build; strict no-emit check and compiler configuration available | Creates or reuses one immutable content-addressed build; returns its absolute build root and manifest; owns only staging cleanup | No database access | Zero with artifact reference on verified success; one on source, compiler, staging, publication, or verification failure |
| API workspace `migration:up --artifact <build-root>` | Root orchestration, delivery, or operator; verified published artifact and configured PostgreSQL namespace | Consumes only the selected artifact; never builds or deletes it | Factory follows its explicit connection-ownership flag | Zero for applied or no-op; two for lock timeout; one for all other failures |
| API workspace `migration:status --artifact <build-root>` | Contributor, automation, or recovery operator; same artifact and namespace inputs | Consumes only the selected artifact | Same connection rule; no schema or history mutation | Zero with ordered status; two for lock timeout; one for artifact, drift, connection, or query failure |
| API workspace `migration:down --artifact <build-root> [--step <count> | --keep-through <id>] [--confirm-multiple]` | Explicit operator or bounded test; same prerequisites | Consumes only the selected artifact | Same connection rule | Zero for reverted or no-op; two for lock timeout; one including `MIGRATION_ROLLBACK_BOUNDS` for all other failures |
| Root `migrate:build`, `migrate:up`, `migrate:status`, and `migrate:down` | Contributor or automation from any working directory | `migrate:build` delegates directly; each other root operation first obtains an immutable artifact from `migrate:build`, captures its returned root, then delegates with that exact root | Root forwards configuration and propagates workspace ownership/results | Transparent propagation of zero, one, or two |
| `prepareMigratedNamespace({ sequelize, schema, buildRoot })` | ADR-0011 lifecycle wrapper after one shared build and namespace allocation | Consumes the caller-supplied immutable artifact; parallel namespaces share it without rebuilding | Wrapper owns namespace; factory does not close the borrowed Sequelize instance | Typed success/no-op or typed failure; wrapper maps and preserves primary versus cleanup failures |
| Root `migrate:validate-emitted` | TASK-004 verification after one build and isolated namespace allocation | Consumes the exact selected artifact through native Node; never rebuilds during parallel database cases | Verification wrapper owns namespace and connection cleanup | Nonzero for any artifact, runtime, migration, drift, lock, cleanup, or assertion failure |
| Delivery migration step | Delivery automation after packaging one selected immutable build root | Consumes the packaged artifact; never compiles or mutates package contents | Delivery command owns and closes its configured connection | Same zero, one, and two process results as workspace up |

For concurrent integration runs, the ADR-0011 orchestration builds exactly once before it starts the run-scoped database cases and passes the same immutable build root to every case. Migration operations never remove published builds. Artifact-retention cleanup belongs to later build or workspace housekeeping only after it proves that no running command or packaged delivery references the target; it is not a migration-command side effect. Delivery will invoke the emitted one-shot command before application startup as an explicit operation; migrations will never run implicitly as part of API startup and will not be exposed through HTTP or GraphQL.

Migration modules and the runner will not call the public Rick and Morty API, import or seed records, depend on Redis, GraphQL, API process startup, or model synchronization. The ERD remains deferred until TASK-004 has executable migrated state and TASK-014 can compare the diagram with a freshly migrated database.

## Consequences

### Positive

- Local, isolated-test, validation, and delivery operations exercise one native emitted ESM runtime.
- Strict source checking and runtime execution remain separate, honest evidence boundaries.
- Canonical IDs and source checksums remain stable across `.ts` and `.js` extensions and compiler output changes.
- Clean-build and emitted checksums reject stale or altered runtime artifacts.
- One PostgreSQL transaction can make the complete selected batch, history, and lock lifetime atomic.
- Database-backed namespace locking serializes competing callers while preserving disjoint integration concurrency.
- The private factory gives ADR-0011 one callable interface without coupling tests to a CLI process.
- Umzug remains replaceable behind repository-owned migration modules, metadata IDs, and command contracts.

### Negative

- Root contributor operations pay a verified build-or-reuse cost before execution, while concurrent integration cases and delivery consume one prebuilt immutable artifact.
- The repository must own a resolver, manifest generator and verifier, custom storage, transaction wrapper, lock provider, command facade, diagnostics, and focused integration tests.
- A whole-command transaction can hold locks and delay vacuum work longer than per-migration transactions.
- Transaction-incompatible PostgreSQL operations are unavailable in the initial lifecycle.
- Compiler and build changes require manifest-integrity care even when the logical source checksum remains stable.
- Metadata and checksums cannot prove that a privileged operator did not mutate schema manually or delete the last history row.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Emitted ESM or Umzug interoperability fails on the selected Node.js, Sequelize, Windows, or continuous-integration target | TASK-004 locks exact compatible versions and proves native emitted loading, source maps, multiple working directories, Windows behavior, and delivery parity before claiming the interface exists. |
| A stale, partial, tampered, or concurrent build executes the wrong runtime | Canonicalize paths and source bytes through exact cross-platform rules and a fixed conformance vector; include every authored runtime/build input, published output, and canonical source/output mapping tuple in the build ID; reconstruct the one-to-one mapping; allowlist and hash every published runtime file; build in a private staging directory; publish an immutable content-addressed root; reuse only an identical fully verified publication; and reject mapping, extra-file, missing-file, or checksum drift before database access. |
| An applied migration is edited | Store and compare its normalized source checksum, fail closed, and require a new corrective migration. |
| Schema changes and migration history diverge | Bind every migration and custom-storage operation to the same complete-command transaction and inject metadata-write/delete failures in TASK-004. |
| Two processes apply the same pending migration | Acquire the namespace-derived PostgreSQL transaction advisory lock before reading history and verify same-namespace serialization with two real callers. |
| The lock blocks an unrelated integration run | Include normalized database/schema identity in the key and prove that two disjoint schemas overlap without waiting. |
| A lock hash collision serializes unrelated namespaces | Use a documented versioned SHA-256-to-signed-64-bit derivation, log the derived key, and treat collision as a low-probability diagnostic and reversal trigger. |
| A process is interrupted or loses its connection | Rely on transaction/session cleanup for rollback and lock release, close owned connections in `finally`, and verify interruption and timeout paths. |
| Commit outcome is ambiguous | Prohibit automatic retry and require locked read-only status plus schema evidence before a reviewed recovery decision. |
| Long transactions become operationally harmful | Keep the initial migration set small, measure TASK-004 execution, and supersede this decision before adopting nontransactional or online DDL. |
| Build latency harms Red feedback | Measure the clean migration build in TASK-004; reconsider source-executed Umzug only if latency is material and both physical runtimes prove reliable. |
| Manual schema or last-history mutation escapes checksum checks | Document the limitation, restrict database privileges operationally, and require fresh-schema comparison and ERD verification for delivery evidence. |

This decision must be superseded if the selected stable runtime cannot execute emitted Umzug migrations reliably, custom storage cannot share one transaction with DDL, lock acquisition or cleanup is bypassed or leaks, disjoint namespaces cannot run concurrently, required initial DDL is transaction-incompatible, build and manifest maintenance proves disproportionate, Sequelize 7 becomes mandatory without compatible behavior, or a supported alternative supplies typed ESM, atomic checksummed storage, and database-backed command locking with materially less repository code.

## Validation

Before approval, the ADR validator, documentation validator, whitespace check, digest checks, state searches, and final independent audit passed while DG-002 remained `Pending`, TASK-002 remained `In progress`, TASK-004 remained `Pending`, and no manifest, dependency, runner, command, migration, harness, ERD, or application source was added.

TASK-004 will implement the first behavior through real PostgreSQL integration TDD and must provide reproducible evidence for all of the following before any planned interface is described as implemented:

- strict no-emit checking and a clean emitted ESM build under the exact locked runtime and dependency versions;
- deterministic full-input build IDs; exact agreement with the normative Windows-separator, CRLF-source, mapping-projection, and digest conformance vector on Windows and continuous integration; lone-CR-to-LF normalization; rejection of BOM, invalid UTF-8, absolute, escaping, dot-segment, symlink/reparse, non-ASCII, Windows-device, terminal-period, malformed-separator, POSIX-literal-reverse-solidus, and case-colliding paths; private staging cleanup; concurrent same-source build publication/reuse; immutable published artifacts; and one-build/many-namespace orchestration without deletion or replacement races;
- exact manifest allowlists for every authored runtime/build input and every published file; exact one-to-one reconstruction and build-ID authentication of every canonical migration ID, source path/checksum, and emitted path/checksum; a runner-source change producing a new build ID; and runner, resolver, storage, lock, command, migration, source-map, manifest, mapping-only, missing-file, and extra-file tampering failing before database access;
- native emitted runner and migration loading with source-map diagnostics from the repository root, API workspace, another working directory, Windows, and continuous integration;
- exact source/emitted roots, manifest coverage, canonical filename grammar, deterministic ordering, and extension-neutral identity;
- malformed and duplicate IDs, inserted-before-history migrations, unknown and non-prefix history, missing and extra output, stale emitted output, changed applied source, and emitted-checksum mismatch rejection before mutation;
- mandatory typed and runtime-validated `up` and `down` exports before any migration executes;
- migration from an empty isolated PostgreSQL namespace, a successful second-up no-op, and non-mutating status with an absent history table;
- default one-step rollback including the single-applied migration case; rejection of zero, negative, non-decimal, too-large, mutually combined, unknown-target, and unacknowledged multi-step selectors; `--keep-through` behavior for the first, intermediate, and latest applied IDs; acknowledged bounded multi-step rollback; and rollback/reapply;
- atomic history bootstrap, log, and unlog behavior under the same command transaction as DDL;
- injected forward, rollback, metadata-write, metadata-delete, interruption, and cleanup failures with unchanged pre-command schema/history state;
- rejection and rollback of a transaction-incompatible operation;
- ambiguous-commit recovery through reconnect plus locked read-only status without automatic retry;
- the three advisory-key test vectors, case-sensitive identifier handling, and identical derivation across every supported entry point;
- two callers on one namespace using the exact sequence artifact preflight, explicit `READ COMMITTED` transaction, lock polling, acquisition, fresh history read, execution, and commit, so the waiter observes the winner's commit and no-ops;
- an observable overlap between callers on two disjoint schemas using the same immutable artifact;
- bounded lock timeout, lock visibility and release, stable redacted diagnostics, exit-result mapping, and connection ownership cleanup;
- ADR-0011 integration setup and namespace cleanup preserving primary and cleanup failures separately; and
- network-disabled execution with no public Rick and Morty API call, import, seed, Redis, GraphQL, HTTP migration surface, API-startup migration, `sequelize.sync()`, or model synchronization.

TASK-014 will derive and validate the ERD only after TASK-004 has implemented and proven migrated state. Documentation validation or ADR acceptance alone does not satisfy AC-009, DEL-002, or AC-012.

## Evaluation

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 20 | 20 | Directly maps the mandatory Sequelize/PostgreSQL migration, initial-data separation, ERD, and delivery outcomes while preserving OR-001's source-optional classification and adopted repository effect. |
| Architectural fit and consistency | 19 | 20 | Preserves the modular workspace, strict ESM TypeScript, migration authority, network-free import separation, real PostgreSQL testing, and isolated harness boundary; exact runtime patches remain downstream evidence. |
| Options and trade-offs | 15 | 15 | Compares three complete credible lifecycle strategies under one matrix and retains the strongest dissent and reversal conditions. |
| Feasibility and proportionality | 12 | 15 | The small schema makes a build-first transactional batch feasible, but the custom resolver, manifest, storage, locking, commands, and integration proof are meaningful costs. |
| Quality attributes | 9 | 10 | Improves reproducibility, atomicity, isolation, diagnosability, and drift detection while accepting longer transactions and cooperative locking. |
| Verifiability | 9 | 10 | Defines falsifiable empty, no-op, rollback, failure, drift, emitted-runtime, concurrency, exit, cleanup, and forbidden-coupling checks; runtime evidence remains TASK-004 work. |
| Evolution and reversibility | 7 | 10 | Repository-owned IDs and module contracts isolate Umzug, but the custom history/checksum format and prohibition on nontransactional DDL carry future migration cost. |
| **Total** | **91** | **100** | |

**Recommendation:** Accept. The score of 91 supports acceptance, independent re-review cleared the hard gate after verifying the canonical path/source rules and conformance vector, corrected mapping authentication, common criteria matrix, and integrated POSIX path-alias follow-up, and the project owner approved the exact reviewed proposal on 2026-08-10. Acceptance resolves DG-002 but is not implementation evidence.

## References

- [Requirements specification](../../REQUIREMENTS.md)
- [ADR index](../README.md)
- [ADR-0001: Modular monolith workspace](./0001-use-a-modular-monolith-workspace.md)
- [ADR-0002: TypeScript across the stack](../0002-use-typescript-across-the-stack.md)
- [ADR-0003: PostgreSQL relational persistence](../0003-use-postgresql-for-relational-persistence.md)
- [ADR-0008: Deterministic bootstrap and import](../0008-use-deterministic-bootstrap-and-idempotent-sync.md)
- [ADR-0010: Targeted automated testing strategy](./0010-use-a-targeted-automated-testing-strategy.md)
- [ADR-0011: TypeScript test harness](../0011-define-the-typescript-test-harness.md)
- [ADR-0015: Accepted whole-record successor](../0015-use-a-build-first-migration-lifecycle-with-exact-catalog-byte-lock-identity.md)
- [Implementation plan](../../IMPLEMENTATION_PLAN.md)
- [Gherkin specification index](../../specs/README.md)
- [Completed TASK-002 ExecPlan](../../plans/completed/TASK-002-sequelize-migration-lifecycle-decision.md)
- [Sequelize release policy](https://sequelize.org/releases/)
- [Sequelize v7 CLI posture](https://sequelize.org/docs/v7/cli/)
- [Sequelize v6 migrations](https://sequelize.org/docs/v6/other-topics/migrations/)
- [Sequelize v6 transactions](https://sequelize.org/docs/v6/other-topics/transactions/)
- [Umzug 3.8.3 release](https://github.com/sequelize/umzug/releases/tag/v3.8.3)
- [Umzug 3.8.3 resolver and execution source](https://raw.githubusercontent.com/sequelize/umzug/v3.8.3/src/umzug.ts)
- [Umzug 3.8.3 types](https://raw.githubusercontent.com/sequelize/umzug/v3.8.3/src/types.ts)
- [Umzug 3.8.3 storage contract](https://raw.githubusercontent.com/sequelize/umzug/v3.8.3/src/storage/contract.ts)
- [Umzug 3.8.3 SequelizeStorage](https://raw.githubusercontent.com/sequelize/umzug/v3.8.3/src/storage/sequelize.ts)
- [Node.js ESM](https://nodejs.org/api/esm.html)
- [Node.js TypeScript execution](https://nodejs.org/api/typescript.html)
- [TypeScript module reference](https://www.typescriptlang.org/docs/handbook/modules/reference.html)
- [PostgreSQL transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)
- [PostgreSQL CREATE INDEX](https://www.postgresql.org/docs/current/sql-createindex.html)
- [PostgreSQL explicit and advisory locking](https://www.postgresql.org/docs/current/explicit-locking.html#ADVISORY-LOCKS)
- [PostgreSQL advisory-lock functions](https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS)
