# ADR-0014: Persist and Deliver Character Image URLs Directly

- Status: Accepted
- Date: 2026-08-11
- Approval date: 2026-08-11
- Decision owners: Project owner and project maintainers
- Related requirements: FR-FE-001, FR-FE-003, NFR-001, NFR-003, NFR-004, NFR-005, OR-008, AC-001, AC-003, AC-007, AC-012
- Related decisions: ADR-0001, ADR-0003, ADR-0004, ADR-0006, ADR-0007, ADR-0008, ADR-0009, ADR-0010, ADR-0011, ADR-0012, ADR-0013
- Controlled gate: DG-006; resolved by project-owner approval of this decision on 2026-08-11
- Owning task: TASK-017
- Supersedes: ADR-0001 and ADR-0013
- Superseded by: None

## Context

Character cards and details must display character images, and the relational baseline must contain 15 characters from the public Rick and Morty API. The source assessment and normalized requirements do not require the application to copy image bytes, keep images available offline, retain image history, verify an exact image digest, serve a same-origin image route, or own an image-storage lifecycle.

The upstream `Character` representation already contains two distinct fields:

- `image` is the character avatar URL; and
- `url` is the character API resource URL.

The application imports character data into PostgreSQL rather than querying the public character API for product data during ordinary use. The unresolved question is therefore not whether a URL exists, but whether the application should persist that source-provided avatar locator and let the browser use it, proxy image bytes at runtime, or copy and retain image bytes during ingestion.

ADR-0013 selected ingestion-time byte materialization in PostgreSQL and a same-origin asset route. It was accepted architecture direction but was not implemented before this successor was approved. The project owner challenged that decision because its image table, decoder, acquisition lock, history, recovery, retained bytes, serving route, HTTP protocol, ingress, purge, withdrawal, backup, and operator obligations are not required by the supplied project contract.

Direct browser loading also contradicted ADR-0001's literal validation rule that the browser has no direct external character API dependency. The repository has no amendment lifecycle for accepted ADR clauses, so this direct-URL decision supersedes ADR-0001 and ADR-0013 as whole records while carrying forward every unaffected constraint. ADR-0004 remains Superseded history; this decision carries forward its still-applicable database, import, cache, and interaction rationale without rewriting that history.

The official API About page does not establish image-content ownership or permission. Public accessibility and the API software's BSD license are not evidence of permission to display, hotlink, cache, copy, back up, or redistribute the images. Architecture approval and content-use authorization remain separate.

A redirects-disabled HEAD observation of avatar 1 at 2026-08-11 14:44:32Z returned status 200, `Access-Control-Allow-Origin: *`, and `Cache-Control: public, max-age=7776000, immutable`. This is dated feasibility and risk evidence only. It does not guarantee future CORS, availability, redirects, media, bytes, cache behavior, ownership, or permission; the long freshness window can itself retain stale or wrong content.

The repository is still documentation-only. No application manifest, migration, importer, GraphQL resolver, Redis mapping, CSP header, browser image request, image bytes, asset route, executable product test, or runtime behavior exists.

### Why ADR-0013 was superseded rather than discarded

ADR-0013 has not been discarded. It is now `Superseded` by this accepted successor and remains intact with TASK-016 as historical evidence; it was not deleted, rejected, or rewritten. It is also technically coherent: PostgreSQL can store the observed byte volume, and ADR-0013 defines a complete integrity, recovery, and same-origin delivery contract. The reason for replacement is proportionality to the supplied project scope, not technical impossibility or a general rule that database byte storage is always wrong.

The replacement rationale rests on the following separately classified evidence and judgments:

| Classification | Recorded fact or evidence | Decision implication |
|---|---|---|
| Source requirement | The assessment and FR-FE-001, FR-FE-003, FR-BE-004, AC-001, AC-003, and AC-009 require image display and initialization with 15 public-API characters. They do not require application-owned image bytes, offline image availability, a same-origin image service, content digests, image history, retention, or withdrawal operations. | Byte ownership and its lifecycle are discretionary architecture, so they require a demonstrated need rather than being treated as baseline scope. |
| Upstream contract | The official Character schema defines `image` as the avatar URL and separately defines `url` as the character resource endpoint. The current character 1 representation follows that distinction. | The required image locator already exists in the imported character payload; the application need not invent or acquire another representation merely to populate `imageUrl`. |
| Existing repository contract | ADR-0003 anticipates a persisted character image URL in the relational model; superseded ADR-0013 defined the planned `characters.image_url text NOT NULL` column; and ADR-0006 exposes non-null summary and detail `imageUrl` fields. | Persisting the validated locator reuses the already planned relational and GraphQL shape instead of adding an image relation and byte-serving contract. |
| Repository evidence | No migration, importer, image table, stored byte, decoder, asset route, ingress rule, image test, or runtime image behavior has been implemented. | Reversal has no data migration, deployed-route retirement, or production cutover cost at this stage. |
| Dated feasibility observation | The 2026-08-11 TASK-016 probe found 15 decodable 300-by-300 images totaling 467,507 bytes. | The observation shows that PostgreSQL materialization is technically feasible for the fixed baseline; it does not establish that the additional lifecycle is required or proportionate. |
| Documented delivery surface | ADR-0013 requires an image table and columns, byte sniffing and full decoding, cyclic associations, a database/schema import lock, version history, ambiguous-commit recovery, integrity checks, an asset route and HTTP protocol, document-origin ingress, retention, purge, withdrawal, backup handling, and operator procedures. | The relevant cost is the whole schema, code, test, deployment, security, backup, and operating surface, not only the initial byte count. |
| Comparative decision analysis | Under one source-first rubric, direct URL scored 86 (`Accept`), runtime proxy scored 80 (`Accept with explicit follow-ups and residual risks`), and retained materialization scored 70 (`Revise`). Materialization failed hard gate 4 because its induced byte lifecycle was not tied to a source requirement or demonstrated deployment need. | Direct delivery is the current recommendation; the result is an evidence-backed proportionality judgment, not a claim that ADR-0013 never worked. |
| Content-rights evidence | The official About page states that the data and images are used without an ownership claim and belong to their respective owners; the API software's BSD license is not an image-content license. | Materialization creates the broadest durable-copy, backup, retention, and redistribution footprint. Direct delivery reduces that footprint but still leaves display, hotlink, and ordinary cache authorization unresolved under A/B/C. |
| Explicit owner value trade-off | Direct delivery gives the application less control over upstream availability, CORS, redirects, final bytes, freshness, revocation, visitor metadata disclosure, and centralized telemetry. | Simplicity is selected only with these limitations, deterministic fallback, and reversal triggers stated; they are not hidden or presented as upstream guarantees. |

The conclusion is cumulative: the required behavior can use the supplied locator and existing URL contracts; no implementation investment must be unwound; and ADR-0013's additional guarantees are valuable but unrequested and operationally expensive for the current assessment. A later measured requirement for first-party or offline availability, exact-byte integrity, media validation, historical identity, or controlled revocation can reintroduce materialization through a new review.

### Why the latest documentation changes were necessary

- Accepted ADR-0013 and completed TASK-016 could not be rewritten to reverse their decision, so TASK-017, DG-006, and this successor preserve that history.
- The owner challenge occurred before implementation, so DG-006 recorded a deliberate hold that prevented either the materialized design or the URL design from being implemented prematurely. Acceptance resolves DG-006; the separate rights disposition still prohibits image-specific implementation.
- Direct avatar loading conflicts with ADR-0001's literal no-direct-external-character-API validation rule. Whole-record supersession therefore applies while every unaffected workspace, modular-monolith, infrastructure, and isolation constraint is carried forward explicitly.
- ADR-0004 remains Superseded history. Its unaffected PostgreSQL authority, Redis fallback, import ownership, and interaction-preservation rationale is carried forward rather than silently restored or rewritten.
- Before approval, the system diagram, specifications, and UI guidance continued to describe the then-Accepted ADR-0013 target. Acceptance now synchronizes those derived documents to this decision without claiming implementation.
- Any change to the exact Proposed ADR after a final review changed the reviewed artifact identity. The owner-requested rationale expansion therefore required a fresh complete IR-B review, which passed before approval.

## Decision drivers

- Satisfy required list and detail image display without turning unrequested byte ownership or offline availability into project scope.
- Persist the exact official `Character.image` value and never confuse it with `Character.url`.
- Keep PostgreSQL authoritative for the character-to-image-locator association and keep Redis a finite-lived optimization.
- Reuse the existing non-null `characters.image_url` and GraphQL `imageUrl` contracts.
- Prefer the smallest complete implementation and operating surface for the fixed 15-character baseline.
- Fail character import closed when the source URL no longer matches the reviewed host, path, or character association.
- Bound browser credential and referrer disclosure and constrain image destinations with an enforcing CSP.
- State upstream availability, redirect, content, cache, privacy, observability, and revocation limits honestly.
- Preserve meaningful alternative text, fixed image geometry, and a layout-safe failure state.
- Keep automated acceptance evidence deterministic and independent of the live public API.
- Preserve accepted and completed history and separate ADR approval, content-rights disposition, implementation authorization, and runtime evidence.

## Considered options

All candidates were evaluated under the same source-first 100-point rubric. Architectural fit counted lifecycle repair, but an existing challenged decision did not receive circular credit merely for matching itself. Proportionality counted the complete schema, code, dependency, infrastructure, test, documentation, operations, and reversal surface.

| Option | Complete boundary | Score and band | Hard-gate result | Outcome |
|---|---|---|---|---|
| Direct upstream URL | Persist the exact validated `Character.image` URL; GraphQL and Redis return it; native browser images contact the constrained upstream avatar path | 86, Accept | Passes; direct-display rights remain a separate pre-implementation authorization | Selected |
| Fixed-target runtime proxy | Persist the validated URL; GraphQL returns a derived same-origin route; the API performs connection-bound destination checks, bounded fetch and full decode, response serving, and transient process caching | 80, Accept with explicit follow-ups and residual risks | Passes at decision level; SSRF, decoder, resource, HTTP, deployment, and rights proof remain substantial | Rejected; first reversal candidate if direct third-party contact becomes unacceptable |
| Ingestion-owned materialized bytes | Fetch and decode during import; store versioned bytes and associations in PostgreSQL; expose a content-addressed same-origin route with recovery, retention, purge, and withdrawal behavior | 70, Revise | Fails hard gate 4 because the induced byte lifecycle and serving subsystem lack a source requirement or demonstrated project need | Rejected as disproportionate for the current scope |

The criterion breakdown is:

| Criterion | Maximum | Direct URL | Runtime proxy | Materialized bytes |
|---|---:|---:|---:|---:|
| Requirements traceability | 20 | 20 | 18 | 15 |
| Architectural fit and consistency | 20 | 16 | 16 | 15 |
| Options and trade-offs | 15 | 13 | 13 | 13 |
| Feasibility and proportionality | 15 | 15 | 9 | 4 |
| Quality attributes | 10 | 6 | 7 | 8 |
| Verifiability | 10 | 8 | 9 | 9 |
| Evolution and reversibility | 10 | 8 | 8 | 6 |
| **Total** | **100** | **86** | **80** | **70** |

The direct option deliberately accepts less application control over image availability, final bytes, redirects, freshness, revocation, and centralized telemetry in exchange for eliminating an application-owned image subsystem that the project does not currently need.

## Decision

Select direct delivery of a strictly validated upstream `Character.image` URL.

The importer will persist only the exact avatar URL already present in each validated character payload. PostgreSQL owns the character-to-locator association, not the image bytes. GraphQL summary and detail projections and the finite Redis summary projection expose that same absolute URL. React uses it as a native image source. The API does not acquire, decode, store, proxy, cache, or serve image bytes.

This decision is `Accepted`. The project owner approved the exact fresh-final-IR-B-`PASS` proposal on 2026-08-11. ADR-0001 and ADR-0013 are now Superseded by this record, ADR-0004 remains Superseded by ADR-0013 as historical chronology, and DG-006 is Resolved. Acceptance did not choose a content-rights disposition, authorize image-specific implementation, or prove runtime behavior.

### Import and canonical URL contract

TASK-005 requests exactly upstream character IDs 1 through 15. For each requested positive integer `n`, the expected image URL is:

```text
https://rickandmortyapi.com/api/character/avatar/<n>.jpeg
```

`<n>` is the requested ID written as canonical unsigned decimal ASCII with no leading zero. Import validation must satisfy all of the following before any database publication:

1. The payload `id` equals the requested ID.
2. The importer reads `Character.image`; it never substitutes `Character.url`.
3. The UTF-8 encoding of the decoded JSON `image` string equals the expected ASCII URL byte for byte.
4. The value therefore has exact lowercase `https`, no credentials, exact lowercase host `rickandmortyapi.com`, no explicit port, exact path `/api/character/avatar/<n>.jpeg`, and no query or fragment.
5. The path ID equals both the requested ID and payload ID.
6. Alternate schemes, hosts, ports, credentials, case, leading-zero IDs, wrong-character paths, queries, fragments, percent-encoded aliases, backslashes, Unicode-confusable hosts, or any other serialization fail validation.

The importer validates the complete 15-record batch before opening its publication transaction. It transactionally upserts validated source-owned character fields including `image_url`, preserves application-owned favorites and comments, and leaves the last committed character set unchanged when any payload or URL fails. ADR-0007 cache invalidation is requested only after a successful commit.

This strict rule intentionally fails closed if the provider changes the avatar host or URL grammar. A legitimate provider change requires a reviewed contract update rather than silent destination widening.

### Persistence, GraphQL, and Redis meaning

The existing `characters.image_url text NOT NULL` is the only image-specific relational field. Its value is the exact validated absolute `Character.image` URL.

- PostgreSQL is authoritative for the current character-to-locator association.
- `CharacterSummary.imageUrl` and `CharacterDetail.imageUrl` return the exact stored absolute URL.
- Redis may cache that same URL only inside ADR-0007's finite `CharacterSummary` projection.
- Post-import eviction and the finite Redis TTL govern projection freshness; they do not control browser or provider image-cache freshness.
- No image asset table, bytes, media metadata, digest, current-asset constraint, lifecycle state, image history, advisory lock, decoder, acquisition queue, proxy route, asset route, durable image cache, service-worker image cache, retention rule, purge, withdrawal, or image-serving protocol is created.

GraphQL remains the only product-data API. The browser does not query the upstream character resource. It loads an image representation from the validated locator returned as product data by the project GraphQL API.

### Browser request boundary

The intended semantic output is:

```html
<img
  src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
  alt="Portrait of Rick Sanchez"
>
```

List and detail components must:

- use the exact GraphQL `imageUrl` without constructing a different destination;
- set `crossorigin="anonymous"`, so the CORS-enabled cross-origin request omits upstream cookies, HTTP authentication, and TLS client credentials;
- set `referrerpolicy="no-referrer"`, so it sends no `Referer` header;
- add no authorization, cookie, caller-selected URL, tracking parameter, JavaScript byte fetch, or application retry loop;
- provide meaningful character-name alternative text and fixed square geometry; and
- transition at most once on load failure to a DOM/CSS “Image unavailable” fallback with the same accessible character identity and preserved layout, without another image source.

Anonymous CORS still sends an `Origin` header. The provider also sees the visitor's network address, browser and fetch metadata, request timing, chosen avatar ID, and request frequency. Current wildcard CORS is a dated observation rather than a guarantee. If the provider stops authorizing CORS, the image fails into the normal fallback. The application must not silently switch to a credential-including no-CORS request to recover availability.

### Content Security Policy and redirect limits

The deployed document must send an enforcing CSP whose `img-src` permits the exact HTTPS avatar host and path prefix:

```text
img-src https://rickandmortyapi.com/api/character/avatar/
```

The complete deployment policy may separately allow same-origin UI assets, but it must not add another external character-image host without reviewed policy evolution. `connect-src` must not permit browser character-data calls to the upstream API. The fallback uses DOM and CSS, so it does not require `data:`, `blob:`, an alternate host, or an application asset route.

Native image fetching follows redirects and exposes no application redirect mode. CSP continues to constrain the redirected scheme, host, and port, but CSP path matching is not enforced after a redirect. The application therefore cannot guarantee the final path, inspect the final URL, validate status or media type in application code, verify exact bytes, or prove that the response still depicts the associated character. Rendered dimensions can be observed after a successful load, but they do not authenticate the bytes or character association. Those are accepted limitations of this proportional boundary.

### Cache, availability, and observability

The browser and intermediaries follow the provider's HTTP caching policy. The application adds no image-byte cache and cannot purge provider, browser, or intermediary copies. Cached availability is best effort only; there is no offline guarantee.

GraphQL may return a valid stored URL while the provider, network, CORS policy, CSP evaluation, redirect chain, or browser decoder prevents image display. The character card or detail remains usable through the fixed layout and accessible fallback, but the mandatory image itself is unavailable during that failure.

Image requests bypass Express and GraphQL, so API logs do not observe their success, failure, latency, or response bytes. Centralized image telemetry would be a separate capability requiring proportionality and privacy review. Multiple API instances need no image cache or coordination; every uncached browser contacts the provider independently.

### Content-rights authorization boundary

This decision does not treat public accessibility, the API software's BSD license, or ordinary browser behavior as image-content permission.

Direct delivery avoids application-owned durable bytes, database backups, retained image versions, and an application redistribution endpoint. It still causes public display, hotlink traffic, and ordinary browser or intermediary cache copies. Before any image-specific implementation, the project owner must record exactly one direct-specific disposition:

- **A — Documented authorization:** record authoritative permission covering the intended public display, hotlinking, and ordinary caching behavior.
- **B — Acknowledged-risk direction:** explicitly instruct the project to proceed with the known uncertainty; this is not a license, ownership claim, or legal conclusion.
- **C — Authorized replacement content:** select content with suitable authorization and re-enter decision review because the host, URL identity, character mapping, CSP, caching, and failure assumptions change.

Acceptance of this ADR did not itself select A, B, or C. At the acceptance checkpoint, DG-006 was resolved while the independent rights disposition remained unsatisfied. For the direct boundary selected here, only A or B permits image-specific implementation to proceed. Recording C selects replacement content but does not authorize implementation of this boundary: image-specific work remains prohibited until the replacement re-enters decision review, a successor is project-owner-approved, and affected task and specification mappings are synchronized.

Post-acceptance authorization status: on 2026-08-11 the project owner recorded [AUTH-001](../IMPLEMENTATION_PLAN.md#auth-001---character-image-content-rights-authorization) as `Authorized` under disposition A, confirming authorization for this personal, educational, non-commercial portfolio to display the official API's character images through the exact direct URLs and ordinary browser/intermediary caching. AUTH-001 satisfies this owner-controlled prerequisite within its recorded scope; it does not prove implementation, runtime behavior, legal analysis, or acceptance evidence.

Superseded authorization clarification (historical): a later 2026-08-11 clarification stated that AUTH-001 would remain `Authorized` without review or reopening for provider, project-scope, or provider-condition changes. That authorization-continuity statement is retained as chronology but is no longer current.

Current owner clarification (2026-08-14): the project owner confirmed that the project will remain a personal, educational, non-commercial portfolio. AUTH-001 therefore remains `Authorized` only within its recorded exact direct-URL and ordinary browser/intermediary caching scope. Any change to the provider or content source, host or URL mapping, project or commercial scope, provider conditions or authorization status, delivery mechanism or redistribution behavior, or disposition reopens AUTH-001 before dependent image work. The [implementation plan](../IMPLEMENTATION_PLAN.md#auth-001---character-image-content-rights-authorization) owns the complete current trigger list. This clarification supersedes only the prior authorization-continuity statement; it does not alter this accepted ADR's technical decision, and a technical departure still follows the normal ADR lifecycle.

### Whole-record lifecycle and carried-forward architecture

This decision supersedes ADR-0001 and ADR-0013 as whole records. Their bodies and completed TASK-016 evidence remain immutable history, and both records carry reciprocal `Superseded by: ADR-0014` metadata.

The following ADR-0001 decisions are carried forward unchanged:

- one workspace monorepo with `apps/web`, `apps/api`, and a narrowly scoped `packages/shared`;
- one API deployable process with in-process transport, application, and persistence modules;
- shared-package use limited to stable cross-boundary contract artifacts;
- documented root install, development, build, test, migration, and character-import commands;
- root Compose ownership of local PostgreSQL and Redis, workspace-run applications, and a non-secret `.env.example`;
- isolated PostgreSQL database or schema and Redis namespace per integration-test run with scoped cleanup;
- PostgreSQL and Redis as API infrastructure dependencies, not separate application services; and
- no microservice, event-bus, or cross-process application boundary without another superseding ADR.

ADR-0001's browser-validation rule is narrowed only as follows: the browser has no direct database or Redis dependency and no direct dependency on the upstream character JSON API, but native image elements may request only the exact validated avatar URLs governed by this decision.

The following ADR-0004 and ADR-0013 rationale is carried forward:

- PostgreSQL remains the runtime authority for product data and the current character-to-image-locator association.
- Redis remains a finite-lived optimization with PostgreSQL fallback.
- The explicit importer remains the only route for upstream character data to enter or refresh product data.
- Imported character attributes remain source-owned; favorites and comments remain application-owned and survive repeated imports.
- GraphQL remains the only product-data API, with focused application, transport, persistence, and presentation ownership.
- Deterministic network-independent tests, meaningful alternative text, stable geometry, and layout-safe failure remain mandatory.

ADR-0013's image-byte acquisition, decoding, storage, cyclic association, lock, history, recovery, asset route, HTTP protocol, ingress, retention, purge, withdrawal, and normal-runtime upstream prohibition are retired by this decision. ADR-0004 remains `Superseded by ADR-0013` as historical chronology rather than being rewritten.

### Downstream ownership

| Task | Future artifact and proof after the rights disposition and task prerequisites |
|---|---|
| TASK-004 | Keep only the existing non-null `characters.image_url` column and model field; add no image relation or byte field. |
| TASK-005 | Implement and prove exact requested-ID, payload-ID, and `Character.image` validation for IDs 1 through 15; prove full-batch failure, transactional publication, interaction preservation, repeatability, and post-commit cache invalidation. |
| TASK-006 | Return the exact stored absolute URL in summary and detail; expose no image asset or proxy route. |
| TASK-007 | Cache the exact absolute summary URL with schema validation, finite TTL, namespace isolation, PostgreSQL fallback, and post-import eviction behavior. |
| TASK-010 | Implement and prove direct list-image requests with anonymous CORS, no-referrer, exact destination, alternative text, and no upstream character-data request. |
| TASK-011 | Apply the same boundary to detail images. |
| TASK-012 | Prove fixed square geometry, one-way no-retry fallback, accessibility, and responsive layout at 375, 768, and 1280 CSS pixels. |
| TASK-014 | Document the third-party image dependency, strict URL contract, CSP/CORS/referrer/privacy/cache/outage behavior, rights disposition, setup, and an ERD with no image relation. |

### Decide now and prove later

| Decide in this ADR | Prove in downstream work |
|---|---|
| Persisted value and owner; strict URL and character binding; direct browser destination; no application image route or byte lifecycle; GraphQL and Redis meaning; CORS, credential, referrer, and CSP policy; upstream failure and fallback; privacy and rights posture; ADR lifecycle; task ownership; reversal triggers | Migration and model syntax; importer and GraphQL wiring; Redis serialization; browser interception; enforcing deployment CSP; fallback rendering; performance; and real-environment behavior. Downstream proof may validate the selected semantics but must not choose or silently change them. |

### Reversal triggers

Re-enter decision review if any of the following becomes a demonstrated need or constraint:

- direct visitor network or metadata disclosure is unacceptable;
- provider CORS, availability, rate, host, path, redirect, or caching behavior makes required display unreliable;
- documented rights prohibit public display or hotlinking;
- first-party or offline image availability, application-controlled revocation, centralized telemetry, exact-byte integrity, media validation, or historical image identity becomes required; or
- the provider no longer supplies the exact reviewed URL form.

A fixed-target runtime proxy is the first reversal candidate when first-party browser delivery or visitor privacy is required but durable byte ownership is not. Materialization may re-enter only after a measured offline, first-party availability, or exact-byte requirement justifies its full lifecycle and operating surface.

## Consequences

### Positive

- The design directly matches the upstream data shape and required image-display behavior.
- It reuses the existing PostgreSQL, GraphQL, and Redis URL fields.
- It adds no image schema, decoder, byte store, proxy, serving route, image lock, recovery flow, ingress rule, or operator lifecycle.
- PostgreSQL backups do not become an image-content archive.
- API instances do not carry image traffic, caches, or coordination state.
- The strict import contract prevents arbitrary or mismatched browser destinations from entering product data.
- The UI has deterministic accessible failure behavior even when the upstream representation is unavailable.
- A future proxy or authorized self-hosted source can preserve the GraphQL field type while changing the governed locator meaning.

### Negative

- Required images depend at view time on the visitor's network, the provider, DNS, TLS, CORS, redirects, browser decoding, and provider cache behavior.
- The provider receives visitor network and request metadata.
- This boundary does not validate or control final image bytes, media, dimensions, content correctness, freshness, or revocation.
- Native redirects cannot be disabled, and CSP path restrictions do not survive a redirect.
- Provider-controlled long-lived caches may retain stale or wrong content.
- Backend observability does not include direct image requests.
- Every uncached visitor consumes provider bandwidth, and no reviewed hotlink, rate, or service-level guarantee exists.
- Public display and hotlink rights remain unresolved until the owner records A or B for this direct boundary, or records C and completes approval of the required replacement-content successor.
- A provider URL-shape change fails the importer until reviewed policy evolution occurs.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| The importer accepts a character resource URL, arbitrary host, or wrong-character avatar | Compare the UTF-8 `Character.image` string byte for byte with the exact expected URL derived from the requested and payload ID; reject the entire batch before publication. |
| Cross-origin credentials or page referrer reach the provider | Require `crossorigin="anonymous"` and `referrerpolicy="no-referrer"`; add no custom request path or JavaScript fetch. |
| The provider sees visitor IP, `Origin`, agent metadata, timing, and avatar selection | Document the disclosure explicitly; use the runtime proxy reversal path if that exposure becomes unacceptable. |
| CORS or upstream availability fails | Render one deterministic accessible layout-safe fallback with no automatic retry loop; do not claim offline availability. |
| A redirect escapes the reviewed path | Use an enforcing path-qualified `img-src`, document that CSP still constrains redirect host but not redirected path, and reverse to a no-redirect proxy only if final-path control becomes required. |
| Wrong, stale, malformed, or changed bytes display | Treat byte control as outside this boundary; use browser failure handling and re-enter review if exact association or media validation becomes required. |
| Browser or intermediary cache copies cannot be revoked | Document provider-controlled cache behavior and use a new reviewed URL or delivery boundary when application-controlled revocation becomes a requirement. |
| Public access is mistaken for permission | Keep A/B/C as an explicit owner-controlled pre-implementation boundary, allow A or B to authorize this direct direction, require C to complete successor review before implementation, and record no legal or ownership inference. |
| ADR-0001 or ADR-0013 history is silently rewritten | Preserve both records and TASK-016 with reciprocal supersession metadata linking to this accepted decision. |
| A downstream task silently adds bytes, proxying, alternate hosts, or no-CORS behavior | Map exact task ownership, test explicit absences, and require a new decision before changing these semantics. |

## Validation

Approval and closure validation requires:

- ADR-0014 is `Accepted`; ADR-0001 and ADR-0013 are `Superseded`; ADR-0004 remains `Superseded`; DG-006 is `Resolved`; TASK-017 becomes `Complete` only after its documentation gate; and TASK-003 remains `Pending`.
- The documentation and ADR validators and `git diff --check` pass.
- No application source, manifest, dependency, migration, image, route, executable test, cache value, browser request, or runtime behavior is claimed as implemented.
- Fresh independent final review passed URL-INV-01 through URL-INV-12 against approved proposal SHA-256 `23E9E36939B3B76CDAFAEFF6C49F622769733C8E187D00922AC310373A987CE1` before approval.

Downstream automated evidence must remain network-independent and include:

- success fixtures for IDs 1 through 15 whose requested ID, payload ID, and exact `Character.image` match;
- rejection fixtures for `Character.url`, wrong ID, leading zero, scheme, host, case, credential, port, path, query, fragment, percent encoding, backslash, Unicode-confusable host, missing value, duplicate/missing record, and partial-batch failure;
- database proof that only the exact absolute URL is stored and favorites/comments survive repeat import;
- GraphQL and Redis proof that the exact URL is returned, finite cache semantics hold, and no asset/proxy route exists;
- browser-intercepted list and detail success with a local 300-by-300 fixture and explicit CORS response, while public network access is blocked;
- request inspection proving `Origin` is present, `Referer`, Cookie, and Authorization are absent, and no upstream character-data request occurs;
- deterministic missing-CORS, 404, timeout/network, invalid-body/decode, wrong-host redirect, and same-host redirected-path cases that reach or document the defined fallback and CSP limitation without live upstream dependence;
- accessibility and layout proof for meaningful replacement text, square geometry, one failure transition, no retry loop, and 375/768/1280-pixel layouts; and
- static or integration proof that no image table, byte field, decoder, proxy, asset route, service-worker byte cache, image lock, retention, purge, or withdrawal artifact was introduced.

The ADR-0001 behavior carried forward by this whole-record successor retains its existing downstream proof: the web and API build and test independently; one documented root workflow starts the required local components; Compose starts healthy PostgreSQL and Redis without embedded secrets; isolated test runs do not share database rows or Redis keys; the browser has no direct PostgreSQL or Redis access and no direct upstream character-data query; and no microservice, event bus, or cross-process application boundary appears without another superseding ADR. ADR-0014 narrows only the final browser dependency check to permit the exact governed native avatar requests.

A dated live smoke may inform deployment risk but cannot establish future CORS, availability, redirect, media, cache, content, ownership, permission, or acceptance behavior. Content-rights disposition A, B, or C is owner evidence and cannot be replaced by an automated test; C additionally requires an approved successor before image-specific implementation.

## Evaluation

| Criterion | Score | Maximum | Rationale |
|---|---:|---:|---|
| Requirements traceability | 20 | 20 | Uses the official image field to satisfy mandatory list/detail display without promoting byte ownership or offline availability into source scope. |
| Architectural fit and consistency | 16 | 20 | Reuses existing persistence and contract fields and carries forward product-data boundaries, but requires governed whole-record supersession of two accepted ADRs. |
| Options and trade-offs | 13 | 15 | Compares three complete boundaries and states direct delivery's availability, privacy, integrity, cache, rights, and reversal trade-offs. |
| Feasibility and proportionality | 15 | 15 | Adds only strict URL validation, existing-field mapping, browser attributes, CSP, fallback, tests, and documentation; it adds no image subsystem. |
| Quality attributes | 6 | 10 | Strong simplicity and operability, but weaker upstream-independent availability, privacy, byte integrity, observability, freshness, and revocation control. |
| Verifiability | 8 | 10 | URL binding, persistence, mapping, request policy, CSP, and fallback are deterministic; provider behavior and rights cannot be proven by product tests. |
| Evolution and reversibility | 8 | 10 | The string contract can later point to a proxy or authorized host, but provider URL changes require reviewed validation and CSP changes. |
| **Total** | **86** | **100** | |

**Recommendation:** Accept.

Recommendation confidence is 0.88. Complete fresh final independent review passed and the project owner approved the exact reviewed proposal on 2026-08-11. Acceptance does not resolve content rights or prove implementation.

## References

- [Technical assessment](../FULL_STACK_TECHNICAL_ASSESSMENT.md)
- [Requirements specification](../REQUIREMENTS.md)
- [Implementation plan and DG-006](../IMPLEMENTATION_PLAN.md#dg-006---character-image-url-successor-boundary)
- [Completed TASK-017 ExecPlan](../plans/completed/TASK-017-character-image-url-successor-decision.md)
- [ADR-0001: Use a modular monolith workspace](./superseded/0001-use-a-modular-monolith-workspace.md)
- [ADR-0003: Use PostgreSQL for relational persistence](./0003-use-postgresql-for-relational-persistence.md)
- [ADR-0004: Use the database as the runtime source of truth](./superseded/0004-use-the-database-as-the-runtime-source-of-truth.md)
- [ADR-0006: Define a use-case-oriented GraphQL contract](./0006-define-a-use-case-oriented-graphql-contract.md)
- [ADR-0007: Use cache-aside for character searches](./0007-use-cache-aside-for-character-searches.md)
- [ADR-0008: Use deterministic bootstrap and idempotent synchronization](./0008-use-deterministic-bootstrap-and-idempotent-sync.md)
- [ADR-0009: Keep frontend state close to its owner](./0009-keep-frontend-state-close-to-its-owner.md)
- [ADR-0010: Use a targeted automated testing strategy](./superseded/0010-use-a-targeted-automated-testing-strategy.md)
- [ADR-0011: Define the TypeScript test harness](./0011-define-the-typescript-test-harness.md)
- [ADR-0012: Use a build-first programmatic migration lifecycle](./superseded/0012-use-a-build-first-programmatic-migration-lifecycle.md)
- [ADR-0013: Materialize character images during ingestion](./superseded/0013-materialize-character-images-during-ingestion.md)
- [Rick and Morty API Character schema](https://rickandmortyapi.com/documentation/#character-schema)
- [Rick and Morty API character 1 representation](https://rickandmortyapi.com/api/character/1)
- [Rick and Morty API About](https://rickandmortyapi.com/about)
- [HTML Standard: CORS settings attributes](https://html.spec.whatwg.org/multipage/urls-and-fetching.html#cors-settings-attributes)
- [Fetch Standard](https://fetch.spec.whatwg.org/)
- [Referrer Policy](https://w3c.github.io/webappsec-referrer-policy/)
- [Content Security Policy Level 3](https://www.w3.org/TR/CSP3/)
- [RFC 9111: HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111.html)
