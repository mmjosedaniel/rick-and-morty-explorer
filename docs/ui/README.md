# UI Design Documentation

- Status: UI field visibility and visual foundations defined; non-blocking Storybook pilot proposed
- Last upstream verification: 2026-08-09
- Documentation entry point: [repository documentation map](../../README.md#documentation-map)
- Field-visibility decision: [DPL-DEC-005](../execution/decision-and-progress-log.md#decision-log)
- Visual foundation: [Color and typography](./visual-foundations.md)
- Proposed component-workshop pilot: [Storybook workflow](./storybook-workflow.md)

## Document role

This directory owns the current UI data-needs mapping, design annotations, and future mockup navigation. It does not define product scope, approve architecture, prove implementation, or establish acceptance evidence.

The [requirements specification](../REQUIREMENTS.md) owns UI scope. Accepted ADRs own the data and state boundaries. The [implementation plan](../IMPLEMENTATION_PLAN.md) owns the frontend task sequence, and the [Gherkin specification index](../specs/README.md) routes observable behavior. A mockup or field mapping remains design intent until source, tests, and runtime evidence demonstrate the behavior.

## Runtime data path

The public Rick and Morty REST API is an ingestion source, not a browser dependency:

```text
Rick and Morty REST API
  -> explicit import of character IDs 1 through 15
  -> PostgreSQL
  -> project GraphQL API
  -> React UI
```

The browser must communicate only with the project GraphQL API. PostgreSQL is authoritative at runtime, and the public API is accessed only by the explicit ingestion flow defined by [ADR-0004](../adrs/0004-use-the-database-as-the-runtime-source-of-truth.md) and [ADR-0008](../adrs/0008-use-deterministic-bootstrap-and-idempotent-sync.md).

The [target system module diagram](../SYSTEM_DIAGRAM.md#module-view) shows this path in the complete modular context. It represents character-image delivery as a neutral boundary because DG-004 may preserve this browser boundary or explicitly supersede the affected portion through an owner-approved ADR.

## Official API field audit

The official character schema exposes the following fields. The application persists only the source-owned subset required by the accepted database and GraphQL contracts.

| Upstream field | Official shape | Current application disposition | UI relevance |
|---|---|---|---|
| `id` | Integer | Persist as the stable character primary key and expose as GraphQL `ID` | Required for list keys, detail routing, queries, and mutations; it does not need a visible label |
| `name` | String | Persist and expose on summary and detail types | Mandatory visible card text; selected detail heading, sorting input, and image alternative text |
| `status` | String: `Alive`, `Dead`, or `unknown` | Persist, expose on detail, and accept as a filter | Selected repository-baseline detail value and adopted status-filter input |
| `species` | String | Persist and expose on summary and detail types | Mandatory visible card value; selected repository-baseline detail value and adopted species-filter input |
| `type` | String | Persist and expose on detail | Show on detail only when non-empty; omit the complete field row when empty |
| `gender` | String: `Female`, `Male`, `Genderless`, or `unknown` | Persist, expose on detail, and accept as a filter | Selected repository-baseline detail value and adopted gender-filter input |
| `origin.name` | String | Persist and expose as `origin.name` on detail | Selected repository-baseline detail value and supported backend origin-filter data |
| `origin.url` | URL string, which can be empty when the origin is unknown | Persist and expose as `origin.url` on detail | Do not show in the current UI |
| `image` | URL string; official images are 300 by 300 pixels | Validate the source reference and expose an `imageUrl` on summary and detail types; DG-004 owns the persisted value and delivery mechanism | Required card/detail image with meaningful alternative text and a layout-safe failure state |
| `location` | Object containing name and URL | Do not persist or expose | Not required by the current UI or project GraphQL contract |
| `episode` | Array of episode URLs | Do not persist or expose | Not required by the current UI or project GraphQL contract |
| `url` | Character endpoint URL | Do not persist or expose | Redundant because the application owns routing and GraphQL identity |
| `created` | Timestamp string | Do not persist or expose | Not required by the current UI |

The official REST documentation describes field types but does not publish a JSON Schema or OpenAPI contract that marks character properties as required or nullable. Live character responses use empty strings and the literal `unknown` for several unavailable values rather than `null`, so the ingestion adapter must validate the complete payload instead of relying only on this descriptive table.

For the fixed IDs 1 through 15, the live bulk response was also checked on 2026-08-09. Thirteen characters have an empty `type`, six have an unknown origin with an empty origin URL, four have `status: "unknown"`, and character 13 has `gender: "unknown"`. These are normal baseline values, not exceptional transport failures. Representative design and test fixtures should cover them when relevant to the active task; the empty-type behavior is explicitly selected below.

The upstream collection response also contains an `info` pagination object. It is not a character field and is not required by the current UI because the accepted baseline imports the fixed IDs 1 through 15 and the project GraphQL list is currently unpaginated.

## UI field visibility decision

[DPL-DEC-005](../execution/decision-and-progress-log.md#decision-log) resolves the assessment's broad requirement to show character details without expanding the accepted GraphQL contract. The current UI shows every descriptive field needed by the list and detail experiences, while keeping transport identifiers, upstream-only metadata, and unavailable comment metadata non-visible.

### Scope classification

| Scope view | Visible fields and controls |
|---|---|
| Minimum assessment | Cards show name, image, and species; the list provides A-Z and Z-A sorting; detail shows the character image and a favorite control; detail provides comment-body entry and displays the successfully added comment body |
| Accepted repository refinement | Detail also shows name, species, status, gender, origin name, and character type when non-empty; comments are displayed newest-first; technical and upstream-only fields remain non-visible |
| Adopted optional repository commitment | The list provides status, species, and gender filter controls under OR-003 |

The second and third rows are repository-baseline commitments or decisions. They do not reclassify those details as mandatory source-assessment wording.

### Character list

The list uses the project-owned `CharacterSummary` projection rather than the complete upstream payload.

| GraphQL field | Visible | UI use | Related scope |
|---|---|---|---|
| `id` | No | Stable React key and `/characters/:id` navigation target | FR-FE-001, FR-FE-003, SPEC-001, SPEC-003 |
| `name` | Yes | Card title and client-side alphabetical sort value | FR-FE-001, FR-FE-002, AC-001, AC-002 |
| `imageUrl` | Yes | Square character image; `name` supplies meaningful alternative text | FR-FE-001, NFR-002, AC-001, AC-006 |
| `species` | Yes | Card metadata | FR-FE-001, AC-001 |

Favorite state and comments are intentionally absent from `CharacterSummary`. Cards show only name, image, and species. A visible ID, favorite badge, comment count, status, gender, type, origin, location, or episode data is outside the current list design. Adding one requires scope review and, when it changes `CharacterSummary`, a superseding GraphQL contract decision.

### List controls

| UI value | Owner or GraphQL input | Required behavior |
|---|---|---|
| Sort direction | Browser URL; not an upstream or GraphQL field | Select A-Z or Z-A and sort the returned summaries client-side |
| Status filter | `CharacterFilter.status` | Send the selected status to the project GraphQL API and preserve it in the URL |
| Species filter | `CharacterFilter.species` | Send the selected species to the project GraphQL API and preserve it in the URL |
| Gender filter | `CharacterFilter.gender` | Send the selected gender to the project GraphQL API and preserve it in the URL |

The backend also supports name and origin filters, but they are not adopted frontend controls under OR-003. The project-owned origin filter operates on imported `origin.name` data because the upstream REST API does not provide an origin filter. The upstream API supports a type filter, but the project GraphQL contract and current requirements do not. A mockup must not add name, origin, or type controls without first checking whether that changes the approved UI scope.

The default sort direction, URL parameter names, invalid-value recovery, and the source of selectable species values remain reversible TASK-010 UI decisions. Record the accepted choices in the [decision and progress log](../execution/decision-and-progress-log.md) before dependent implementation begins.

### Character detail

| GraphQL field | Visible | UI use | Data owner |
|---|---|---|---|
| `id` | No | Direct-route query and mutation target | Imported character identity |
| `name` | Yes | Primary detail heading and image alternative text | Imported character data |
| `imageUrl` | Yes | Character portrait with a layout-safe fallback | Imported character data |
| `species` | Yes | Descriptive metadata | Imported character data |
| `status` | Yes | Descriptive metadata | Imported character data |
| `gender` | Yes | Descriptive metadata | Imported character data |
| `type` | Yes when non-empty | Descriptive metadata; omit the entire field row when the value is empty | Imported character data |
| `origin.name` | Yes | Descriptive metadata; `unknown` is a valid upstream value | Imported character data |
| `origin.url` | No | No current presentation use; the UI must not use it to query or navigate to the upstream API | Imported character data |
| `isFavorite` | Yes | Current favorite state and toggle presentation | Application-owned PostgreSQL state |
| `comments[].id` | No | Stable rendered-list key | Application-owned PostgreSQL state |
| `comments[].body` | Yes | Plain-text comment content | Application-owned PostgreSQL state |

The visible descriptive detail set is therefore name, image, species, status, gender, origin name, and a non-empty character type. Favorite state is presented as an interactive control. Comments present only their body text; their IDs remain technical keys.

Comments are newest-first. The detail query defaults to 20 comments and accepts a maximum limit of 50. The current contract does not expose a comment author, timestamp, total count, or character-level comment count, so mockups must not present those values as available data.

### Mutations and transient UI state

| Interaction | Required input | Returned data | UI-owned transient state |
|---|---|---|---|
| Set favorite | `id`, `isFavorite` | Updated `CharacterDetail` | Pending and interaction-error presentation |
| Add comment | `characterId`, `body` | Created `Comment` | Unsubmitted body, validation feedback, pending state, and interaction-error presentation |

After either mutation succeeds, the frontend explicitly refetches the affected character detail. Failed changes must not be presented as persisted state. Comment bodies contain 1 to 1,000 Unicode characters after trimming and are rendered as escaped plain text.

The visible detail controls are a favorite toggle reflecting `isFavorite`, a comment-body input, and a comment submission action. The comments area displays newest-first body text only; comment IDs are non-visible keys.

## Data-driven design constraints

- `type` can be an empty string. The UI omits the complete type row in that case instead of displaying an empty value or fallback copy.
- `unknown` is a valid value for status, gender, and origin name. It must not be treated as a transport failure.
- `species` is open text rather than a documented closed enumeration. A species control must not encode a supposedly exhaustive enum without an explicit data source.
- `origin.url` can be empty. The UI must not depend on it or create an upstream API hyperlink from it.
- Character images are nominally square, but the UI must preserve its layout when an image request fails.
- GraphQL transports the positive integer character identity through the `ID` scalar. The UI should treat it as an opaque route and operation identifier.
- Favorite and comment fields never come from the public API and must not be added to the ingestion mapping.

## Architecture follow-up

The upstream payload supplies an avatar URL, the accepted persistence model includes an image URL field, and the GraphQL contract exposes `imageUrl`. Those decisions do not determine whether the stored and returned value remains the upstream URL or becomes an application-owned location. A direct `<img>` request to an upstream URL would contact the public API host from the browser, while ADR-0004 states that the browser communicates only with the project GraphQL API and that the public API is accessed only by ingestion. The accepted decisions do not currently say whether avatars are copied during import, proxied by the application, or allowed as a narrowly scoped external asset request.

This field audit does not select an option. Resolve [DG-004](../IMPLEMENTATION_PLAN.md#dg-004---character-image-delivery-boundary) through [TASK-016](../IMPLEMENTATION_PLAN.md#task-016---resolve-the-character-image-delivery-gate) before TASK-005 imports image locations, TASK-006 maps runtime `imageUrl` values, or TASK-010 implements image loading. Mockups may define the required square image and failure presentation without assuming its runtime delivery mechanism.

## Open UI decisions

The field audit leaves these presentation choices open:

1. Choose the status, species, and gender control types and the source of species options.
2. Select the default sort direction, URL parameter names, and invalid-value recovery behavior.
3. Decide whether the initial 20 comments need a visible pagination or load-more control.

These are design or reversible execution decisions, not reasons to expose additional upstream fields.

## Planned mockup coverage

No repository mockups exist yet. When added, `docs/ui/mockups/` should cover at least:

- character list at 375, 768, and 1280 pixels;
- character detail at 375, 768, and 1280 pixels;
- loading, empty, request-error, not-found, and image-error states;
- empty `type`, unknown origin, favorite off/on/pending/error, and comment empty/populated/pending/error variants.

Each artifact must record its status, viewport, source frame, related requirement and task IDs, and applicable ADR or `DPL-DEC-*` reference. Mockups remain design intent and must be kept separate from future reproducible implementation screenshots.

If the non-blocking [Storybook pilot](./storybook-workflow.md) is activated and retained during TASK-010, its stories become the preferred editable previews for the isolated component states they cover. `docs/ui/mockups/` retains only reviewed design references or exported snapshots that need repository discussion; a static export must link back to its story when one exists and must not become a second source of component behavior. The pilot is not part of the current TASK-010 through TASK-012 definitions of done.

## References

- [Official Rick and Morty API character schema](https://rickandmortyapi.com/documentation/#character-schema)
- [Official live response for the fixed character IDs 1 through 15](https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10,11,12,13,14,15)
- [Official live response for character 1](https://rickandmortyapi.com/api/character/1)
- [Official live response for character 2](https://rickandmortyapi.com/api/character/2)
- [Requirements specification](../REQUIREMENTS.md)
- [Target system module diagram](../SYSTEM_DIAGRAM.md)
- [ADR-0003: Use PostgreSQL for Relational Persistence](../adrs/0003-use-postgresql-for-relational-persistence.md)
- [ADR-0004: Use the Database as the Runtime Source of Truth](../adrs/0004-use-the-database-as-the-runtime-source-of-truth.md)
- [ADR-0005: Use Single-User Persistence for Character Interactions](../adrs/0005-use-single-user-persistence-for-character-interactions.md)
- [ADR-0006: Define a Use-Case-Oriented GraphQL Contract](../adrs/0006-define-a-use-case-oriented-graphql-contract.md)
- [ADR-0008: Use Deterministic Bootstrap and Idempotent Synchronization](../adrs/0008-use-deterministic-bootstrap-and-idempotent-sync.md)
- [ADR-0009: Keep Frontend State Close to Its Owner](../adrs/0009-keep-frontend-state-close-to-its-owner.md)
- [DPL-DEC-005: Define current UI field visibility](../execution/decision-and-progress-log.md#decision-log)
- [DPL-DEC-007: Evaluate a development-only Storybook component-workshop pilot](../execution/decision-and-progress-log.md#decision-log)
- [TASK-010 through TASK-012](../IMPLEMENTATION_PLAN.md#task-010---deliver-the-character-list-sorting-and-adopted-interface-filters)
- [UI specification routing](../specs/README.md#codex-rule-routing)
- [Proposed Storybook pilot workflow](./storybook-workflow.md)
