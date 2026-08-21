# ADR-0013: Materialize Character Images During Ingestion

- Status: Superseded
- Date: 2026-08-10
- Approval date: 2026-08-11
- Decision owners: Project owner and project maintainers
- Related requirements: FR-FE-001, FR-FE-003, NFR-001, NFR-005, AC-001, AC-003
- Related decisions: ADR-0001, ADR-0003, ADR-0004, ADR-0006, ADR-0007, ADR-0008, ADR-0009, ADR-0010, ADR-0011, ADR-0012
- Controlled gate: DG-004; resolved by project-owner approval of this decision on 2026-08-11
- Owning task: TASK-016
- Supersedes: ADR-0004
- Superseded by: ADR-0014

[ADR-0014](../0014-persist-and-deliver-character-image-urls-directly.md) superseded this record on 2026-08-11. The body below remains historical evidence of the accepted materialization decision and TASK-016; ADR-0014 is the current character-image authority.

## Context

Character cards and details must display character images, but the requirements do not decide who owns the bytes, what `imageUrl` means, or where the browser obtains the representation. That ambiguity affects the importer, PostgreSQL migrations, Redis search projections, GraphQL, the browser request boundary, cache lifetime, security, deployment, recovery, and content-use risk. DG-004 therefore blocks every artifact that would give the image location a runtime meaning.

The accepted architecture constrains the choice:

- ADR-0001 keeps the browser behind project-owned boundaries and rejects a direct dependency on the external character API.
- ADR-0003 defines PostgreSQL and versioned migrations as the relational authority and anticipates a non-null character image URL.
- ADR-0004 historically made PostgreSQL authoritative at runtime, limited public-API access to explicit ingestion, and said the browser communicates only through GraphQL. This record carries forward its unaffected constraints while superseding that incompatible whole record.
- ADR-0006 keeps GraphQL as the only product-data API and requires non-null `imageUrl` projections.
- ADR-0007 caches only a finite-lived `CharacterSummary`, including its current image URL.
- ADR-0008 owns explicit, idempotent synchronization and preserves application-owned favorite and comment state.
- ADR-0009 requires meaningful alternative text, stable image geometry, and a layout-safe failure state.
- ADR-0010 and ADR-0011 require deterministic network-free automated fixtures and reserve Chromium for the smallest request/loading proof.
- ADR-0012 governs the later migration lifecycle; this decision defines schema semantics but creates no migration.

Three complete delivery boundaries were researched under one rubric: copying and retaining validated bytes during ingestion; fetching, validating, and process-caching bytes through an application route at runtime; and a direct browser exception for the upstream avatar host. The research also compared PostgreSQL `bytea` with a separately configured durable filesystem or object store inside the ingestion-owned option.

A redirects-disabled probe at 2026-08-11 02:56Z observed that the fixed 15-character baseline returned 15 decodable 300-by-300 images totaling 467,507 bytes. IDs 2 and 5 contained PNG bytes despite `.jpeg` locators and `image/jpeg` response metadata. These are dated observations, not guarantees of future availability, format, dimensions, content, permanence, acceptable use, or permission.

The upstream About page says that data and images are used without an ownership claim and belong to their respective owners. The API software's BSD license is not an image-content license. No primary source reviewed for this decision grants copying, backup, public display, redistribution, proxying, or hotlink permission.

The repository remains documentation-only. It has no application manifest, migration, importer, decoder, asset bytes, asset route, Redis mapping, browser request, executable product test, or runtime proof. This Accepted ADR resolves DG-004 and supersedes ADR-0004 as architecture direction only. It does not authorize content use or prove implementation.

## Decision drivers

- Display the correct image for the correct character in both list and detail projections.
- Preserve PostgreSQL as runtime authority and GraphQL as the only character-data API.
- Keep normal runtime independent of the external character API after a successful import.
- Make byte, media, URL, path, lock, and character-to-image identities deterministic across Windows and POSIX.
- Publish bytes and the current character association atomically while preserving favorites and comments.
- Bound redirects, destinations, encoded bytes, decoded pixels, concurrency, failures, retries, cleanup, and cache behavior.
- Keep the browser on the document origin and prevent an arbitrary proxy or caller-selected destination.
- Define reimport, A-to-B-to-A reactivation, collision, ambiguous commit, retention, purge, withdrawal, and reversal behavior before implementation.
- Use proportionate storage and operational machinery for the fixed 15-character baseline.
- Separate architectural approval, content-rights disposition, implementation authorization, and downstream runtime evidence.

## Considered options

| Option | Complete flow | Benefits | Costs and hard gates | Outcome |
|---|---|---|---|---|
| Ingestion-owned copy in PostgreSQL | TASK-005 fetches and fully validates exact bytes; PostgreSQL owns bytes and a current association; Redis and GraphQL carry a root-relative content path; a fixed project asset route serves PostgreSQL bytes | Atomic publication, upstream-independent runtime, stable same-origin URLs, deterministic integrity, multi-instance visibility, one backup boundary | Additive schema, decoder, lock and recovery mechanics, database-backed image reads, indefinite retained-version growth, manual purge/withdrawal, rights disposition, whole-record ADR-0004 supersession | Selected |
| Runtime application delivery | PostgreSQL retains a canonical source reference; a project route fetches, validates, and process-caches bytes on cold requests | No durable image bytes, easier storage reversal, first-party browser destination | Cold-cache upstream dependence, SSRF and redirect controls, dual-format full decoding, queue/single-flight behavior, per-process cache duplication, rights disposition, ADR-0004 supersession | Rejected; retained as dissent |
| Direct upstream asset exception | GraphQL returns the upstream locator and native browser images contact the upstream host | Smallest implementation and cleanup surface | Direct third-party contact, upstream/CORS/offline dependence, no body validation, no no-redirect control, CSP path checks do not survive redirects, ADR-0001/ADR-0004 conflict, content/hotlink uncertainty | Rejected |

The common normalized evaluation is:

| Criterion | Maximum | Ingestion-owned copy | Runtime application delivery | Direct upstream exception |
|---|---:|---:|---:|---:|
| Requirements traceability | 20 | 19 | 19 | 17 |
| Architectural fit and consistency | 20 | 18 | 13 | 8 |
| Options and trade-offs | 15 | 13 | 12 | 12 |
| Feasibility and proportionality | 15 | 14 | 10 | 14 |
| Quality attributes | 10 | 9 | 8 | 4 |
| Verifiability | 10 | 10 | 9 | 7 |
| Evolution and reversibility | 10 | 8 | 8 | 9 |
| **Total** | **100** | **91** | **79** | **71** |

The numerical scores do not erase hard gates. Runtime application delivery remains credible if durable database growth becomes unacceptable and bounded decoder/cache behavior is proven. Direct delivery remains the simplest surface, but it cannot advance without resolving its accepted-ADR, redirect, privacy, availability, byte-validation, and content-use conflicts.

## Decision

Select ingestion-owned materialization with PostgreSQL `bytea` and a same-origin, content-addressed, asset-only route.

TASK-005 will acquire and completely validate the fixed character-image set during an explicit import while holding a database-and-schema-scoped PostgreSQL session advisory lock. One PostgreSQL transaction will publish exact untransformed bytes, immutable identity and provenance metadata, lifecycle state, and each character's current application-owned root-relative image URL. Redis will cache only that current URL as part of ADR-0007's finite `CharacterSummary`. GraphQL will return the same URL for list and detail. The document origin will forward only the fixed asset prefix to TASK-006's API handler, which reads current or retained historical bytes from PostgreSQL. Normal runtime will make no upstream request.

### Ownership and stage contract

| Stage | Owner, value, destination, and lifetime |
|---|---|
| Upstream character payload | The external API owns the `image` locator. It is an ingestion input only and never a browser destination. |
| Acquisition | TASK-005 accepts one canonical same-character avatar target, fetches without credentials or redirects, and holds bytes only in bounded importer memory until the complete batch validates. |
| Validation | TASK-005 derives media type from bytes, fully decodes one static JPEG or PNG, verifies exact dimensions and limits, and computes SHA-256 over the exact encoded bytes. It does not transcode. |
| PostgreSQL asset | PostgreSQL durably owns exact `bytea`, digest, detected type, length, dimensions, canonical provenance, immutable public path, lifecycle state, and timestamps. |
| PostgreSQL character | `characters.image_url`, `image_sha256`, and constant `image_asset_state` point through an enforced composite association to that character's one current asset. |
| Redis | Redis stores only the current root-relative URL in the finite search projection. It never stores or controls image-byte lifetime. |
| GraphQL | TASK-006 exposes the same non-null root-relative URL in summary and detail projections. It does not expose a caller-selected asset target. |
| Browser | The browser resolves the root-relative value against the document origin. List and detail use character-name alternative text and fixed geometry. |
| Document-origin ingress | A trusted fixed ingress forwards only `/assets/characters/v1/` to a configured internal API listener without redirect or request/response transformation. |
| Asset handler | TASK-006 performs an exact character/digest/path lookup, verifies stored integrity, and serves current or retained retired bytes. It is not product REST and is never a forward proxy. |

### Acquisition and validation boundary

For character ID `n`, the only permitted source is the exact URL:

```text
https://rickandmortyapi.com/api/character/avatar/<n>.jpeg
```

`n` is the positive PostgreSQL integer ID written as canonical unsigned decimal ASCII without a leading zero. The path ID must equal the owning character ID. The scheme is exact lowercase `https`, the host is exact lowercase `rickandmortyapi.com`, the effective port is 443, and credentials, an explicit non-default port, query, and fragment are forbidden. Redirects are disabled and every 3xx response fails. DNS resolution must reject loopback, private, link-local, multicast, and metadata destinations before connection and after resolution. No request forwards caller cookies, authorization, referrer, or arbitrary headers.

The importer uses at most four concurrent acquisitions, a finite overall request/validation deadline, and at most two total attempts for explicitly classified transient transport failures. TASK-005 will select the exact timeout within that boundary and prove it with deterministic transport fixtures. Each response has an independent streaming encoded-body cap of 1,048,576 bytes regardless of `Content-Length`.

Magic bytes select only the JPEG or PNG validator. Acceptance requires one completely decoded static representation, exact 300-by-300 dimensions, one 90,000-pixel image, no animation or second image, no malformed structure, no trailing payload, and no warning that the selected decoder classifies as unsafe. A decoded 8-bit RGBA representation is bounded to 360,000 bytes and discarded after validation. The exact encoded bytes are stored without transformation. Suffix and response label are diagnostic metadata only; a fully valid PNG at the canonical `.jpeg` source locator is stored and served as `image/png` with a `.png` application path.

Any acquisition or validation failure publishes nothing. Automated acceptance tests use fixed local transports and version-controlled fixtures, never the live public API.

### Asset byte and path identity

Asset identity version 1 is:

1. Take the exact untransformed accepted encoded byte sequence.
2. Compute SHA-256 and encode it as 64 lowercase hexadecimal ASCII characters.
3. Map detected `image/png` to extension `png` and detected `image/jpeg` to extension `jpeg`.
4. Form `/assets/characters/v1/<canonical-id>/<digest>.<extension>` with literal U+002F separators.

No step trims, case-folds, percent-decodes, Unicode-normalizes, converts a reverse solidus, resolves a dot segment, uses a native path join, or applies an operating-system path normalization. The value is a logical URL path, not a filesystem path, so Windows and POSIX produce identical output.

The normative association fixtures are complete static 300-by-300, 8-bit RGB, non-interlaced PNGs. They contain only CRC-valid `IHDR`, `IDAT`, and `IEND`, expand to one 270,300-byte filter-zero raster, and contain no trailing bytes. Whitespace is removed from each base64 block before decoding.

Red `(255,0,0)`:

- Base64 ASCII length: 916
- Base64 ASCII SHA-256: `2c619359965144e9a8ed132b5c93141252c8c45450b646f4a4ceb26cd7157d3c`
- Encoded byte length: 685
- Encoded byte SHA-256: `47edf7151445aebb30cff867a385d92f9e4243e1f5a3ba771e1c83f3fbf6835a`

```text
iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAIAAAD2HxkiAAACdElEQVR42u3TMQ0AAAjAsPk3DRq4
eJpUwZI1BTySAEwIJgRMCCYETAgmBEwIJgRMCCYETAgmBEwIJgRMCCYETAgmBEwIJgRMCCYETAgm
BEwIJgRMCCYETAgmBEwIJgRMCCYETAgmBEwIJgRMCCYETAgmBEwIJgRMCCYETAgmBEwIJgRMCCYE
TAgmBEwIJgRMCCYETAgmBEwIJgRMCCYEE0oAJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYE
EwImBBMCJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQT
AiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYEE4IJAROCCQETggkBE4IJAROC
CQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJ
AROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQEJwIRg
QsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELAhGBC
wIRgQsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELA
hGBCwIRgQsCEYEJAAjAhmBAwIZgQMCGYEDAhmBAwIZgQMCGYEDAhmBAwIZgQMCGYEDAhmBAwIZgQ
MCGYEDAhmBAwIZgQMCGYEDAhmBAwIZgQMCGYEDAhmBAwIZgQOFoBP0TzwHxI0wAAAABJRU5ErkJg
gg==
```

Blue `(0,0,255)`:

- Base64 ASCII length: 916
- Base64 ASCII SHA-256: `a07bbbb85e351b111aeed03f7ec0b190b7e2674be0912248cd0e26a69bfda977`
- Encoded byte length: 685
- Encoded byte SHA-256: `9862bf8bfee4c740b16828322794567ad0f0da206cd467460361cb979d638659`

```text
iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAIAAAD2HxkiAAACdElEQVR42u3TMQ0AAAjAsPk3DRq4
eJpUwZJVA7ySAEwIJgRMCCYETAgmBEwIJgRMCCYETAgmBEwIJgRMCCYETAgmBEwIJgRMCCYETAgm
BEwIJgRMCCYETAgmBEwIJgRMCCYETAgmBEwIJgRMCCYETAgmBEwIJgRMCCYETAgmBEwIJgRMCCYE
TAgmBEwIJgRMCCYETAgmBEwIJgRMCCYEE0oAJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYE
EwImBBMCJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQT
AiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYEEwImBBMCJgQTAiYEE4IJAROCCQETggkBE4IJAROC
CQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJ
AROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQETggkBE4IJAROCCQEJwIRg
QsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELAhGBC
wIRgQsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELAhGBCwIRgQsCEYELA
hGBCwIRgQsCEYEJAAjAhmBAwIZgQMCGYEDAhmBAwIZgQMCGYEDAhmBAwIZgQMCGYEDAhmBAwIZgQ
MCGYEDAhmBAwIZgQMCGYEDAhmBAwIZgQMCGYEDAhmBAwIZgQOFl3TETztLRbFQAAAABJRU5ErkJg
gg==
```

Expected public paths are:

- Character 1/red: `/assets/characters/v1/1/47edf7151445aebb30cff867a385d92f9e4243e1f5a3ba771e1c83f3fbf6835a.png`
- Character 1/blue: `/assets/characters/v1/1/9862bf8bfee4c740b16828322794567ad0f0da206cd467460361cb979d638659.png`
- Character 2/blue: `/assets/characters/v1/2/9862bf8bfee4c740b16828322794567ad0f0da206cd467460361cb979d638659.png`

The earlier truncated base64 inputs preserved in the TASK-016 ExecPlan are discovery history and are not normative fixtures. A mapping-only swap of character 1 and character 2 digest/URL members must fail even if the same member set remains present.

### Import lock identity and lifecycle

Use the exact ASCII version literal `rick-and-morty-explorer:character-image-import:v1`. This decision has never been implemented and no stored or external consumer has observed the rejected algorithm, so this corrected contract is the first publishable `v1`; changing the literal would create compatibility signaling without a compatible predecessor.

On one dedicated PostgreSQL physical session:

1. Read the effective `server_encoding` and `client_encoding`. Both must be exactly `UTF8`; otherwise fail with `CHARACTER_IMPORT_LOCK_IDENTITY_ENCODING_UNSUPPORTED` before key derivation, lock acquisition, fetch, or mutation.
2. Read the database identity as `pg_catalog.convert_to(pg_catalog.current_database()::text, 'UTF8')` and require the driver to return that `bytea` as raw bytes.
3. Treat the trusted configured schema as an identifier value, never SQL text. Reject an ill-formed ECMAScript string, including an unpaired surrogate, then encode it once as UTF-8 without an added byte-order mark and bind those raw bytes as `$1::bytea` to this fixed query:

   ```sql
   SELECT pg_catalog.convert_to(n.nspname::text, 'UTF8') AS schema_bytes
   FROM pg_catalog.pg_namespace AS n
   WHERE pg_catalog.convert_to(n.nspname::text, 'UTF8') = $1::bytea;
   ```

4. Require exactly one row, receive `schema_bytes` as raw bytes, and require it to equal the bound bytes byte-for-byte. A missing, multiple, or non-equal result, or a driver path that cannot preserve raw parameter and result bytes, fails before derivation, lock, fetch, or mutation.
5. Do not decode either catalog `bytea`, Unicode-normalize, compare through a locale or collation, trim, case-fold, quote or unquote, percent-decode, add a byte-order mark, or replace malformed input. Catalog bytes are authoritative after PostgreSQL identifier parsing, folding, and length handling. An actual U+FEFF stored in an identifier is data; an encoder-added BOM is forbidden.
6. Define `LP(bytes)` as four unsigned big-endian length bytes followed by the exact bytes. Form `LP(UTF8(version)) || LP(databaseBytes) || LP(schemaBytes)` and compute SHA-256.
7. Interpret digest bytes zero through seven as the unsigned big-endian value `u`. Use `u` when it is below `9223372036854775808`; otherwise subtract `18446744073709551616` to obtain the signed value.
8. Bind that exact signed decimal or 64-bit integer as PostgreSQL `bigint` to `pg_try_advisory_lock(bigint)`. It must never pass through an IEEE-754 JavaScript `number`.

The accepted identifier domain includes any otherwise valid exact PostgreSQL catalog spelling, including composed, decomposed, whitespace-bearing, and case-sensitive quoted identifiers. The fixed UTF8 preflight intentionally excludes `SQL_ASCII` and every other server or client encoding rather than claim unproved cross-encoding identity.

Required vectors are:

| Database | Schema | Schema UTF-8 hex | SHA-256 | Signed key |
|---|---|---|---|---:|
| `rick_and_morty` | `public` | `7075626c6963` | `8f47e6f1cf9c0048455287476f7289aebad577bc19a72682b5d0354495959fda` | `-8122269476694785976` |
| `rick_and_morty` | `task_005_a` | `7461736b5f3030355f61` | `6f2685208897d6a37140019ffb11d84bc5585952715791df2e7ecde6cb464a99` | `8009235362102105763` |
| `RickMorty` | `CaseSensitive` | `4361736553656e736974697665` | `3ae306f86a59381d6bd10c91e902eae1dc15c7664fdd602f1dfcea3af57232a8` | `4243242937919027229` |
| `rick_and_morty` | `café` (`caf` + U+00E9) | `636166c3a9` | `47de37414adc54140f3a6f17ec07d04ec219811a29d0d85cfb3eb166190b2c2c` | `5178637375091004436` |
| `rick_and_morty` | `café` (`cafe` + U+0301) | `63616665cc81` | `84156cbf63f0e8ce37d4484744613cdc93a29755fb98eff1140794855b8426c1` | `-8929111116920854322` |
| `RickMorty` | `casesensitive` | `6361736573656e736974697665` | `b1be0f23e01fcb73f9fd490c74f54f8f2282f1167dc8be754efe2cecb042b9d1` | `-5639053036662830221` |

Node 24.18.0 and Python 3.12.10 independently reproduce all six payloads, digests, and keys. Repeating the exact composed tuple reproduces the same result; the composed/decomposed pair and the case pair remain distinct.

Poll immediately and then at non-overlapping 100-millisecond monotonic intervals under one 5,000-millisecond acquisition deadline. Timeout returns `CHARACTER_IMPORT_LOCK_TIMEOUT` without fetch or mutation. The lock is non-reentrant. Hold it across acquisition and validation, the same-session `READ COMMITTED` publication transaction, post-commit Redis invalidation, and final unlock. Do not open the publication transaction during network acquisition.

Four-byte length framing is injective over accepted byte tuples. SHA-256 is not mathematically injective, and its first-64-bit advisory projection is explicitly not injective. The same exact database/schema tuple deterministically obtains the same key, serializes, and reads state only after acquisition. Distinct fixture identities have distinct keys and must be able to overlap; different full digests can rarely share one projected key and then serialize unnecessarily but safely. A full SHA-256 collision has the same safe false-serialization effect rather than permitting unsafe concurrency. PostgreSQL advisory locks are database-local. Every importer entry point uses the same private lock factory because advisory locking is cooperative.

### Relational association

All objects live in the configured PostgreSQL schema. After DG-005 resolves, TASK-004 will express this contract through Sequelize migrations and the build-first lifecycle carried forward from ADR-0012 by its accepted successor. The schema identifier is always safely quoted by the migration boundary; it is never interpolated from untrusted text.

The relevant `characters` columns are:

```text
image_url         text NOT NULL
image_sha256      text NOT NULL CHECK lowercase 64-hex
image_asset_state text NOT NULL DEFAULT 'current' CHECK exactly 'current'
```

`character_image_assets` contains:

```text
character_id integer NOT NULL
sha256       text NOT NULL
image_url    text NOT NULL
source_url   text NOT NULL
media_type   text NOT NULL
byte_length integer NOT NULL
bytes         bytea NOT NULL
pixel_width   smallint NOT NULL
pixel_height  smallint NOT NULL
state         text NOT NULL
acquired_at   timestamptz NOT NULL
retired_at    timestamptz NULL
```

The exact relational constraints are:

- `pk_character_image_assets PRIMARY KEY (character_id, sha256)`.
- `uq_character_image_assets_url UNIQUE (image_url) NOT DEFERRABLE`.
- `uq_character_image_assets_fk_target UNIQUE (character_id, sha256, image_url, state) NOT DEFERRABLE`. This is the exact referenced uniqueness object; the partial index is not used as a foreign-key target.
- `uq_character_image_assets_one_current UNIQUE (character_id) WHERE state = 'current'` as a non-deferrable partial unique index.
- Positive character ID; lowercase 64-hex digest; detected type in `image/jpeg` or `image/png`; byte length from 1 through 1,048,576 and equal to `octet_length(bytes)`; exact 300-by-300 dimensions.
- Lifecycle check: current requires `retired_at IS NULL`; retired requires a non-null `retired_at`; no other state exists.
- Source check: `source_url` equals the canonical same-character upstream URL.
- Public-path check: `image_url` equals the version-1 character/digest path with `.jpeg` only for `image/jpeg` and `.png` only for `image/png`.
- `fk_character_image_asset_character FOREIGN KEY (character_id) REFERENCES characters(id) MATCH FULL ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED`.
- `fk_character_current_image FOREIGN KEY (id, image_sha256, image_url, image_asset_state) REFERENCES character_image_assets(character_id, sha256, image_url, state) MATCH FULL ON UPDATE NO ACTION ON DELETE NO ACTION DEFERRABLE INITIALLY DEFERRED`.

The migration creates `characters` with its image association columns, creates `character_image_assets` with its non-deferrable target uniqueness and deferred asset-to-character FK, creates the partial current index, and then adds the deferred character-to-asset FK. The partial index permits at most one current asset. The character's constant-state composite FK requires at least one exact current asset and prevents a current asset from being associated with the wrong character.

ADR-0003 remains accepted: its non-null image URL becomes the current application-owned root-relative URL, and the asset table is additive. Existing favorite and comment relationships remain unchanged.

### Import publication and reimport

After lock acquisition, capture an ordered pre-run snapshot of all importer-owned character fields, current pointers, and image rows for the fixed 15 IDs. Exclude favorites and comments. Fetch and completely validate every target before opening one publication transaction. Deterministically construct the expected post-run state and use one `transaction_timestamp()` value for all lifecycle changes.

Exactly one branch applies per character:

| Branch | Required comparison | Publication result |
|---|---|---|
| Same current digest | Exact bytes and every immutable identity and metadata field match the current row | Verify and leave the image row, state, `acquired_at`, and lifecycle timestamps unchanged; source-owned character attributes may update |
| Unseen digest | No `(character_id, digest)` row exists | Insert the new row temporarily retired, retire the previous current row, promote the new row, clear its `retired_at`, and update the character pointer |
| Existing retired digest | Exact bytes and every immutable identity and metadata field match the retired row | Retire the previous current row, reactivate the existing row, preserve its original `acquired_at`, clear its `retired_at`, and update the pointer |
| Digest or immutable-metadata mismatch | A row with the same digest differs in bytes, source, public path, type, length, dimensions, or another immutable field | Return `CHARACTER_IMPORT_ASSET_COLLISION_OR_CORRUPTION` and roll back the complete batch |

Only `state` and `retired_at` are mutable asset fields. First import inserts each current asset and its matching character under deferred cyclic constraints. A changed import inserts or reactivates the target as described. After all 15 records and source-owned character updates are staged, force both cyclic constraints with `SET CONSTRAINTS ... IMMEDIATE`, then commit. Any failure restores the exact pre-run importer-owned state and timestamps. No importer branch writes `is_favorite`, deletes comments, or changes comment bodies.

For asset A acquired at `tA`, unseen B acquired at `tB`, and A reactivated at `tC`, the final state is:

| Row | `acquired_at` | `state` | `retired_at` |
|---|---|---|---|
| A | `tA` | `current` | NULL |
| B | `tB` | `retired` | `tC` |

The character points to A. A's earlier retirement timestamp is cleared because `retired_at` describes current lifecycle state, not event history. Swapping character 1 and character 2 digest/URL pointer members fails `fk_character_current_image`; the route also rejects the swapped ID/digest/path lookup.

### Commit recovery, Redis invalidation, and session cleanup

A pre-commit session loss rolls back the transaction, releases the server-side session lock, discards the client connection, and permits only a new explicit invocation from lock acquisition.

After connection loss near commit, automatic replay is forbidden. Reconnect, reacquire the same lock, and compare ordered importer-owned character fields, current pointers, and every image row and byte for IDs 1 through 15 in one locked read-only snapshot. Exclude favorites and comments.

| Comparison | Typed outcome | Redis action | Retry meaning |
|---|---|---|---|
| Exact expected post-run state | `CHARACTER_IMPORT_COMMIT_CONFIRMED_AFTER_RECONNECT` with `committed:true` | Run bounded invalidation | `retryable:false` |
| Exact pre-run state | `CHARACTER_IMPORT_NOT_COMMITTED` with nonzero result | Do not invalidate | `retryable:false`; a later attempt is a new operator-authorized invocation |
| Neither exact state | `CHARACTER_IMPORT_STATE_DIVERGED` with nonzero result | Run bounded invalidation so stale cache cannot hide divergence | Block future import pending reviewed recovery; no replay |

Every known committed publication runs the entire iterative Redis `SCAN`/`UNLINK` invalidation attempt under one 5,000-millisecond monotonic deadline. Each Redis operation receives `min(250 milliseconds, remaining time)`. Redis failure never rolls back PostgreSQL; stale search URLs remain bounded by ADR-0007's 300-second default TTL.

After invalidation, call `pg_advisory_unlock(key)` exactly once on the same dedicated session. Return the physical connection to the pool only when unlock returns `true`, the session remains healthy, and pool handoff succeeds. A false result, exception, detected session loss, or failed handoff destroys or evicts the physical connection. Server-side session loss releases its lock but does not make the client handle reusable.

Known commit results are exact, operator-visible, non-retryable successes:

- `CHARACTER_IMPORT_COMMITTED`
- `CHARACTER_IMPORT_COMMITTED_WITH_CACHE_WARNING`
- `CHARACTER_IMPORT_COMMITTED_WITH_SESSION_DISCARD_WARNING`
- `CHARACTER_IMPORT_COMMITTED_WITH_CACHE_AND_SESSION_WARNINGS`

### Asset request and HTTP contract

The raw request target is exact `/assets/characters/v1/`, followed by a positive canonical decimal ID whose first byte is 1 through 9 and remaining bytes are digits, one slash, exactly 64 lowercase hexadecimal digest bytes, and exactly `.png` or `.jpeg`. The ID is at most 2,147,483,647. A query delimiter, including a trailing empty query, percent encoding, decoded alias, repeated slash, reverse solidus, dot segment, uppercase digest or extension, fragment, or prefix rewrite is invalid.

Processing order is:

1. Validate the raw target.
2. Validate the method.
3. Strictly parse combined `If-Match` and `If-None-Match` fields using RFC 9110 entity-tag/list grammar; `*` cannot be mixed with tags.
4. Perform the exact asset lookup and verify stored path, type, length, media signature, and recomputed SHA-256.
5. Evaluate `If-Match` using strong comparison, then `If-None-Match` using weak comparison.
6. Resolve the response before considering Range. Range and If-Range are ignored after every earlier result, including 304 and 412.

The status contract is:

| Condition | Status and result |
|---|---|
| Valid GET or HEAD, existing integral representation, preconditions pass | 200 |
| Valid weak `If-None-Match` match or `*` with an existing representation | 304 |
| Invalid reserved-prefix path, any query delimiter, or malformed entity-tag field | 400 |
| Canonical path with a method other than GET or HEAD | 405 with `Allow: GET, HEAD` |
| Missing, association-mismatched, or explicitly purged representation | 404 |
| `If-Match` fails strong comparison | 412 |
| Stored path, type, length, media signature, or digest is inconsistent | 500 without representation bytes |

Weak `If-None-Match` comparison removes only the `W/` weakness marker and compares the opaque tag case-sensitively. A weak tag cannot satisfy `If-Match`. No `Last-Modified` is emitted; `If-Modified-Since` and `If-Unmodified-Since` are ignored, including invalid dates, because the route has no modification-date validator.

Ranges are deliberately unsupported because every representation is at most 1 MiB. Every `Range` and `If-Range`, including malformed, unknown-unit, multipart, and unsatisfiable values, is ignored. The route emits `Accept-Ranges: none`, returns the earlier precondition result or a complete 200, and never emits 206, 416, or `Content-Range`.

A successful 200 includes:

```text
Content-Type: image/png | image/jpeg
Content-Length: <exact encoded byte count>
ETag: "sha256-<lowercase digest>"
Cache-Control: public, max-age=300, immutable
Accept-Ranges: none
Content-Disposition: inline
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
```

GET sends the exact stored bytes. HEAD sends the same representation headers and exact GET `Content-Length` with no body. A 304 has no body, `Content-Type`, `Content-Length`, or `Content-Disposition`; it includes ETag, Cache-Control, Accept-Ranges, nosniff, and Referrer-Policy. Every 400, 404, 405, 412, and 500 is bodyless with `Content-Length: 0`, `Cache-Control: no-store`, nosniff, and no-referrer. The route emits no `Set-Cookie`, authentication challenge, CORS allowance, or cookie/authorization-dependent representation and no `Vary` based on those inputs. HEAD never sends a body for any status.

### Document-origin ingress and browser boundary

GraphQL returns only the root-relative asset path. The browser resolves it against the document origin and uses `referrerpolicy="no-referrer"`; page policy uses `img-src 'self'` and `connect-src 'self'`.

When web and API are separate processes, the trusted document-origin ingress forwards only the exact `/assets/characters/v1/` prefix to a fixed configured internal project API listener. It preserves the method and raw path/query bytes, including the prefix, without redirect, decoding/re-encoding, path rewrite, external target, caller-selected destination, or a destination derived from `Host`, `Forwarded`, `X-Forwarded-*`, query, or path data. It also preserves the response bytes, content length, media type, strong ETag, cache fields, and security headers without transformation.

Chromium must later observe a final image request origin equal to the document origin, no redirect, and the identical API raw target while public-network access is blocked. Multiple API instances read the same PostgreSQL bytes without sticky sessions or writable local volumes. If a deployment cannot provide this exact ingress, this decision is blocked for that deployment and must be reconsidered; it must not silently fall back to an external origin, direct upstream browser request, runtime fetch, or Host-derived URL.

The asset route ignores Cookie and Authorization. If origin-wide credentials are later introduced, deployment must scope them away from the prefix where practical. Unavoidable ambient credential exposure is a reversal trigger.

### Retention, purge, and withdrawal

Normal import never automatically deletes a content-addressed row. Redis TTL controls only the current search projection. A replaced asset becomes retired but remains publicly retrievable at its immutable URL until an explicitly authorized purge. PostgreSQL table, TOAST, WAL, and backup volume therefore grow with unique versions.

A retired-only purge requires an owner-authorized exact `(character_id, sha256)` set, reason, and one backup disposition: authorized restorable retention, or verified no-retention/destruction/expiry handling when rights prohibit retention. If backup handling cannot meet that disposition, stop before mutation. Under the import lock, one transaction locks every target and requires it to exist, be retired, and match no character pointer. Delete only the exact state-qualified set, verify the count, force deferred constraints, and commit. A current row cannot pass this operation. No Redis invalidation occurs because the current URL does not change. Failure rolls back. Ambiguous completion compares exact all-absent, exact all-present, or mixed state and never replays.

A current-content withdrawal is a separate operation. It requires an owner-authorized exact current set, reason, backup disposition, and one completely validated authorized replacement per target. Without a replacement, stop for a requirements and ADR amendment rather than delete or null the required current image. Under the lock, one transaction inserts or reactivates the replacement, retires the old row, promotes the replacement, updates the character pointer, deletes the explicitly withdrawn old row, forces constraints, and commits before bounded Redis invalidation and session cleanup. Failure restores the original current pointer and bytes. Ambiguous completion compares expected replacement-current/old-absent, exact pre-run, or mixed state and never replays.

Successful uncached or expired requests for a purged or withdrawn path return 404/no-store, and the browser retains the normal alternative text and fixed fallback geometry. A previously cached fresh 200 cannot be revoked before its 300-second freshness interval expires. A replacement under rights disposition C changes source and identity assumptions and requires comparable decision review before implementation.

### Content-rights and implementation-authorization gate

Acceptance of this ADR is not a license, content permission, or implementation authorization. Before any image-specific migration, acquisition, persistence, backup, cache, route, GraphQL mapping, browser request, display, or fallback work begins in TASK-004, TASK-005, TASK-006, TASK-007, TASK-010, TASK-011, or TASK-012, the project owner must separately record exactly one disposition:

- A: documented authorization covering the intended acquisition, storage, backup, public display, and redistribution;
- B: an explicit acknowledged-risk instruction to proceed without documented permission, which remains a risk acceptance and is not a license; or
- C: a reviewed amendment selecting authorized replacement content.

Disposition C changes source and identity assumptions and reopens comparable decision review before implementation. A generic approval of this ADR does not satisfy this gate unless the owner separately and explicitly records one of A, B, or C.

### Accepted-ADR lifecycle

The project owner accepted this record on 2026-08-11. The resulting lifecycle is:

- ADR-0013 is Accepted and declares whole-record supersession of ADR-0004.
- ADR-0004 is Superseded and has a reciprocal `Superseded by: ADR-0013` link.
- ADR-0001 remains accepted because the browser uses only project-controlled origins and normal runtime never contacts the external character API.
- ADR-0003 remains accepted with its non-null image URL narrowed to the current application-owned path and an additive asset relation.
- ADR-0006 remains accepted because GraphQL stays the only product-data API and the fixed byte route accepts no product query or caller destination.
- ADR-0007 and ADR-0008 remain accepted because Redis stores only finite current summary URLs and explicit ingestion alone accesses the upstream.

This successor carries forward ADR-0004's unaffected PostgreSQL authority, finite Redis projection fallback, source-owned imported attributes, application-owned favorites/comments, interaction preservation, and ingestion-only upstream access. It replaces only the literal browser-GraphQL-only clause with GraphQL for product data plus this one exact first-party asset route. ADR-0004 remains intact as historical rationale.

ADR-0012 remains Accepted and is neither reinterpreted nor superseded by this record. Independent review exposed the same NFC namespace alias in its accepted migration-lock identity. DG-005 therefore remains a separate pending project-owner decision before TASK-004 may begin: project maintainers must compare exact catalog bytes with a deliberately restrictive namespace domain and propose a reciprocal successor ADR using a new migration-lock version literal. Historical DG-002 resolution and TASK-002 completion remain intact, no successor ADR number is reserved here, and TASK-004 must not implement ADR-0012's NFC-based `rick-and-morty-explorer:migrations:v1` lock.

### Downstream ownership

| Task | Future proof or artifact ownership after the separate rights disposition |
|---|---|
| TASK-004 | After DG-005 is owner-resolved, migration, image columns and table, indexes, checks, cyclic FKs, rollback, and real-PostgreSQL feasibility without implementing ADR-0012's rejected NFC lock identity |
| TASK-005 | Acquisition, decoder, lock, all-15 publication, four branches, A-to-B-to-A, collision, recovery, integrity scan, purge, and withdrawal orchestration |
| TASK-006 | GraphQL `imageUrl`, exact asset lookup, raw target, GET/HEAD, conditionals, statuses, headers, and invariant response behavior |
| TASK-007 | Redis summary URL compatibility, 300-second TTL, bounded SCAN/UNLINK invalidation, and warning evidence |
| TASK-010 | List-card same-origin request and upstream-disabled Chromium trace |
| TASK-011 | Detail-image association and same-origin request trace |
| TASK-012 | Meaningful alternative text, fixed geometry, failure fallback, and responsive evidence |
| TASK-014 | ERD agreement, clean-clone ingress/configuration/import documentation, and reproducible delivery instructions |

No dependency edge changes. The implementation plan synchronizes these governing details without starting any downstream task.

## Consequences

### Positive

- List and detail use one current database-enforced character/image association.
- Normal runtime works with the external character API unavailable.
- Byte publication and character-pointer publication share one transaction and rollback boundary.
- Content-addressed paths prevent byte mutation at a successful URL.
- Exact bytes and detected media type resolve misleading upstream suffix/header metadata.
- PostgreSQL gives every API instance the same bytes without writable or sticky local volumes.
- Deterministic importer, database, Redis, route, and Chromium fixtures need no live upstream call.
- The browser remains first-party and the asset handler cannot become an arbitrary proxy.

### Negative

- The initial schema gains image columns, an asset table, non-deferrable uniqueness, two deferred cyclic FKs, checks, and a partial index.
- TASK-005 needs bounded full JPEG/PNG decoding, cooperative session locking, recovery comparison, integrity scanning, and operator-facing lifecycle commands.
- Image GETs consume PostgreSQL pool, TOAST, I/O, and hashing capacity.
- Retired bytes grow PostgreSQL, WAL, backups, and restore volume until explicit purge.
- Purge, withdrawal, backup disposition, and ambiguous recovery require owner/operator work.
- Fresh browser responses cannot be revoked immediately.
- Every deployment needs exact document-origin ingress.
- Acceptance of this decision produced whole-record ADR-0004 supersession.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Image content is copied or displayed without adequate authority | Require the separate A/B/C owner disposition before every image-specific downstream artifact; preserve that risk acceptance is not a license. |
| Hostile or changed upstream content exhausts resources | Use an exact target, reject redirects/private destinations, stream-cap encoded bytes, fully decode only static JPEG/PNG, bound pixels and concurrent jobs, and fail the whole import before publication. |
| A digest collision or corrupt existing row aliases different content | Compare exact bytes and every immutable metadata field on every same-digest branch and fail the complete batch closed. |
| Two importers race, or distinct namespaces contend on one 64-bit projection | Use the versioned exact-catalog-byte session key, prove same-schema serialization and distinct-vector overlap, treat a projected collision as safe false serialization, and require every entry point to use one lock factory. |
| Commit outcome is ambiguous | Prohibit replay; reacquire the lock and compare exact expected, pre-run, or divergent state before any new explicit invocation. |
| Redis or advisory unlock fails after commit | Bound the complete invalidation attempt, preserve the committed database result, expose typed warnings, destroy a suspect physical connection, and never replay. |
| Retired versions grow database, WAL, and backups | Measure exact bytes and route load, expose retained-version counts, require authorized purge, and reconsider above ten versions for one character or 64 MiB total exact image bytes. |
| Asset reads harm product queries | Measure pool, query, TOAST, hashing, and response latency in TASK-006; migrate behind the stable path to a proven shared durable store if pressure becomes material. |
| A purge or withdrawal is believed to revoke cached bytes | Document the 300-second fresh-cache limit, keep successful paths immutable, and use no-store only for subsequent failures. |
| Ingress rewrites identity or response metadata | Require byte-preserving raw-target and response preservation and prove it with Chromium plus API observation in every deployment shape. |
| Same-origin cookies expose unnecessary credentials | Keep the route invariant and unauthenticated, scope future cookies away from the prefix where practical, and reconsider if ambient credentials are unavoidable. |
| Upstream begins requiring new formats or dimensions | Fail validation and reopen the decision before changing the accepted media, path, or resource contract. |

Reconsider or supersede this decision if rights are incompatible; exact same-origin ingress is unavailable; bounded full decoding cannot be proven; ambient credential exposure is unavoidable; a character exceeds ten retained versions or total exact image bytes exceed 64 MiB; database, pool, TOAST, WAL, backup, restore, or route pressure becomes material; format, dimension, CDN, region, or revocation requirements change; a simpler shared durable store is proven; or the project owner later directs reversal of the ADR-0004 supersession.

## Validation

The initial TASK-016 research contract, two corrective analysis cycles, exact vector repair, third `DRAFT READY` synthesis, and initial fresh IR-A passed before the proposal was drafted. The first fresh IR-B then returned `REVISE` after proving that NFC aliases distinct composed/decomposed PostgreSQL namespace identities; every non-lock invariant passed. Targeted exact-byte research, primary Node/Python reproduction, renewed `DRAFT READY` analysis, and a new fresh material-change IR-A `PASS` authorized correction cycle 1.

Complete fresh final IR-B then reviewed the entire corrected ADR, every IMG invariant, and the exact integrated diff and returned `PASS` with no Blocker, Major, or Minor finding. The project owner's conditional approval became effective on that result. Acceptance remains architecture direction rather than implementation or rights evidence.

Downstream proof is assigned as follows:

| Task | Required evidence |
|---|---|
| TASK-004 | Only after DG-005 is owner-resolved, apply and roll back the exact objects from an empty isolated PostgreSQL schema; force both deferred FKs; prove current uniqueness, wrong-character rejection, and schema integration through the accepted successor migration boundary. |
| TASK-005 | Use deterministic transports and real PostgreSQL integration to prove raw catalog `bytea`, encoding and malformed-input rejection, exact bound lookup, `bigint` binding, all six lock vectors, same-schema serialization, distinct-key overlap, safe false serialization, target rejection, redirects, hostile DNS, timeout/retry, size, complete JPEG/PNG decoding, misleading metadata, malformed/trailing/animated/wrong-dimension input, all four import branches, A-to-B-to-A, collision, rollback, session loss, ambiguous commit, integrity, purge, and withdrawal. |
| TASK-006 | Prove exact GraphQL current URLs, ID/digest/path association, stored integrity checks, GET/HEAD, 200/304/400/404/405/412/500, entity tags, ignored ranges, headers, no-body behavior, invariant authentication response, and no arbitrary proxy or product REST surface. |
| TASK-007 | Prove summary URL schema, 300-second TTL, namespace isolation, one-deadline SCAN/UNLINK invalidation, Redis failure, and typed post-commit warnings. |
| TASK-010 and TASK-011 | With public-network access blocked, prove list and detail request only the document-origin path, observe no redirect, preserve the API raw target, and reject mapping-only swaps. |
| TASK-012 | Prove meaningful alternative text, fixed geometry, and layout-safe fallback at 375, 768, and 1280 pixels. |
| TASK-014 | Compare the ERD with the migrated asset relation and prove clean-clone configuration, migration, import, ingress, and run documentation. |

The automated suite must not call the live public API. Exact libraries, decoder versions, commands, transport header limits, framework wiring, and performance values are later evidence unless changing them would weaken this contract.

The cumulative decision invariants are:

| Invariant | Required result |
|---|---|
| IMG-INV-01 coverage | Authorities, three candidates, rubric, output contract, documentation effects, and TASK-014 proof remain complete. |
| IMG-INV-02 honesty | The historical NFC failure, dated observations, quarantined inputs, normative repaired vectors, non-injective hash projection, unknown rights, and missing implementation remain explicit. |
| IMG-INV-03 authority | After owner approval, ADR-0013 is Accepted, ADR-0004 Superseded, DG-004 Resolved, TASK-016 closes through its documentation gate, and TASK-003 remains Pending. |
| IMG-INV-04 ownership | Stage flow, exact composite association, two-character fixtures, A-to-B-to-A, and mapping-only swap rejection remain intact. |
| IMG-INV-05 failure | Acquisition, database, commit, cleanup, HTTP, ingress, purge, withdrawal, and UI failure outcomes remain deterministic. |
| IMG-INV-06 security | Exact provenance, no redirects, destination and resource limits, raw target, no proxy, invariant response, and trusted ingress remain enforced. |
| IMG-INV-07 materialized lifecycle | Exact catalog-byte identity, rejection boundary, collision-honest concurrency, atomic publication, reimport, retention, cleanup, purge, withdrawal, and recovery remain complete. |
| IMG-INV-08 application delivery | Not triggered; rejected-option cold-cache, decoder, cache, rights, and lifecycle evidence remains preserved in the ExecPlan. |
| IMG-INV-09 direct delivery | Not triggered; rejected-option redirect, body-validation, privacy, rights, and accepted-ADR evidence remains preserved in the ExecPlan. |
| IMG-INV-10 rights | No permission is inferred; the separate all-image-work A/B/C gate remains mandatory. |
| IMG-INV-11 downstream | TASK-004/005/006/007/010/011/012/014 own every future image artifact without dependency drift; DG-005 separately blocks TASK-004 migration work until an ADR-0012 successor is approved. |
| IMG-INV-12 derived identity | Six exact-byte lock vectors plus base64, image bytes, digest, media, path, association, platform, and swap vectors reproduce exactly. |

## Evaluation

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 19 | 20 | Defines the image delivery needed by list/detail and usable failure while preserving that implementation and acceptance remain downstream. |
| Architectural fit and consistency | 18 | 20 | Preserves PostgreSQL, ingestion-only upstream access, GraphQL product data, Redis projection caching, and first-party browser contact; it records governed ADR-0004 supersession. |
| Options and trade-offs | 13 | 15 | Compares all three gate-required boundaries and the durable-storage subvariant with meaningful dissent and reversal. |
| Feasibility and proportionality | 14 | 15 | PostgreSQL bytes are credible at the dated 0.446-MiB baseline, with executable constraints and lifecycle; full decoder and operator mechanics are real costs. |
| Quality attributes | 9 | 10 | Improves runtime availability, integrity, privacy, determinism, and multi-instance consistency while accepting storage growth and database route load. |
| Verifiability | 10 | 10 | Every identity, association, transaction, concurrency, HTTP, ingress, lifecycle, and failure rule has a deterministic proof owner. |
| Evolution and reversibility | 8 | 10 | Stable paths, retained versions, explicit purge/withdrawal, and storage cutover support reversal, but schema, backup, and public-cache consequences remain. |
| **Total** | **91** | **100** | |

**Recommendation:** Accept. The 91/100 evaluation, complete independent final-review `PASS`, and project-owner approval support this accepted direction. Acceptance resolves DG-004 but is not content permission or implementation evidence.

Relative-selection confidence is 0.89. Renewed semantic-readiness confidence is 0.94. Owner approval is complete; implementation authorization remains 0.00 until the separate rights disposition and downstream task prerequisites are satisfied.

## References

- [Requirements specification](../../REQUIREMENTS.md)
- [ADR index](../README.md)
- [ADR-0001: Modular monolith workspace](./0001-use-a-modular-monolith-workspace.md)
- [ADR-0003: PostgreSQL relational persistence](../0003-use-postgresql-for-relational-persistence.md)
- [ADR-0004: Database runtime source of truth](./0004-use-the-database-as-the-runtime-source-of-truth.md)
- [ADR-0006: Use-case-oriented GraphQL contract](../0006-define-a-use-case-oriented-graphql-contract.md)
- [ADR-0007: Cache-aside character searches](../0007-use-cache-aside-for-character-searches.md)
- [ADR-0008: Deterministic bootstrap and synchronization](../0008-use-deterministic-bootstrap-and-idempotent-sync.md)
- [ADR-0009: Frontend state ownership](../0009-keep-frontend-state-close-to-its-owner.md)
- [ADR-0010: Targeted automated testing](./0010-use-a-targeted-automated-testing-strategy.md)
- [ADR-0011: TypeScript test harness](./0011-define-the-typescript-test-harness.md)
- [ADR-0012: Build-first migration lifecycle](./0012-use-a-build-first-programmatic-migration-lifecycle.md)
- [Implementation plan](../../IMPLEMENTATION_PLAN.md)
- [Target system diagram](../../SYSTEM_DIAGRAM.md)
- [TASK-016 ExecPlan](../../plans/completed/TASK-016-character-image-delivery-decision.md)
- [Gherkin specification index](../../specs/README.md)
- [PostgreSQL 18 `CREATE TABLE`](https://www.postgresql.org/docs/18/sql-createtable.html)
- [PostgreSQL constraint timing](https://www.postgresql.org/docs/current/sql-set-constraints.html)
- [PostgreSQL advisory locks](https://www.postgresql.org/docs/current/explicit-locking.html#ADVISORY-LOCKS)
- [PostgreSQL advisory-lock functions](https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS)
- [PostgreSQL character-set support](https://www.postgresql.org/docs/current/multibyte.html)
- [PostgreSQL server encoding](https://www.postgresql.org/docs/current/runtime-config-preset.html)
- [PostgreSQL client encoding](https://www.postgresql.org/docs/current/runtime-config-client.html)
- [PostgreSQL system information functions](https://www.postgresql.org/docs/current/functions-info.html)
- [PostgreSQL `pg_namespace`](https://www.postgresql.org/docs/current/catalog-pg-namespace.html)
- [PostgreSQL binary-string conversion functions](https://www.postgresql.org/docs/current/functions-binarystring.html)
- [PostgreSQL binary data](https://www.postgresql.org/docs/current/datatype-binary.html)
- [PostgreSQL TOAST](https://www.postgresql.org/docs/current/storage-toast.html)
- [PostgreSQL backup and point-in-time recovery](https://www.postgresql.org/docs/current/continuous-archiving.html)
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)
- [RFC 9111: HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111.html)
- [RFC 8246: Immutable Responses](https://www.rfc-editor.org/rfc/rfc8246.html)
- [WHATWG URL Standard](https://url.spec.whatwg.org/)
- [WHATWG HTML URL resolution](https://html.spec.whatwg.org/multipage/urls-and-fetching.html#resolving-urls)
- [WHATWG MIME Sniffing](https://mimesniff.spec.whatwg.org/)
- [Unicode Normalization Forms, UAX 15 revision 57](https://www.unicode.org/reports/tr15/)
- [NIST FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final)
- [OWASP SSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)
- [Rick and Morty API documentation](https://rickandmortyapi.com/documentation/)
- [Rick and Morty API About](https://rickandmortyapi.com/about)
