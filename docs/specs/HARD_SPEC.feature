# Status: Specified, not executed.
# Authority: Derived from accepted ADRs, adopted optional commitments, and active decision gates.
# This file is intent only; it is not implementation, security certification, or acceptance evidence.

@HARD_SPEC @planned
Feature: Non-negotiable application and delivery constraints
  The implementation must preserve explicit scope, data ownership, failure,
  isolation, validation, and evidence boundaries. Human-controlled decisions
  must not proceed until their governing decision gates are resolved.

  @HS-001 @repository_baseline @DG-001 @NFR-004 @OR-001 @OR-004 @OR-007 @ADR-0018 @ADR-0016
  Rule: Test-harness work must follow accepted ADR-0018

    Scenario Outline: Keep controlled work inside the accepted harness boundary
      Given DG-001 has status "Resolved"
      And ADR-0018 has status "Accepted"
      When a change proposes <controlledWork>
      Then the change must use <acceptedBoundary>
      And the artifact must be added only by its owning TASK after every other controlling gate is resolved
      And no selected command, dependency, configuration, test, or browser binary is claimed as implemented without repository evidence

      Examples:
        | controlledWork                                         | acceptedBoundary                                                      |
        | a test-runner dependency or configuration              | Vitest projects with explicit Node or jsdom environments               |
        | an executable check for a derived scenario             | an ordinary test mapped to stable traceability IDs                      |
        | the first executable application test                  | a task-registered application project with separate strict type-checking |
        | the walking-skeleton real-browser smoke                | one Chromium-only Playwright project with two owned processes           |
        | the first production milestone-slice Red-Green-Refactor cycle | the minimum coherent registered scope with independent test and implementation ownership |

  @HS-002 @repository_baseline @DG-002 @DG-005 @FR-BE-003 @FR-BE-004 @DEL-002 @AC-009 @AC-012 @ADR-0015
  Rule: Migration-lifecycle work must follow accepted ADR-0015

    Scenario Outline: Keep controlled work inside the accepted migration boundary
      Given DG-002 has status "Resolved"
      And DG-005 has status "Resolved"
      And accepted ADR-0015 supersedes ADR-0012 without reusing or reinterpreting the prohibited migrations:v1 lock identity
      When a change proposes <controlledWork>
      Then the change must use <acceptedBoundary>
      And the artifact must be added only by its owning TASK after every other controlling gate is resolved
      And no runner, migration, migrated database, test result, or ERD is claimed as implemented without repository evidence

      Examples:
        | controlledWork                               | acceptedBoundary |
        | a migration runner or configuration          | private programmatic Umzug 3 on stable Sequelize 6 |
        | the first migration                          | strict TypeScript source mapped to authenticated immutable emitted ESM |
        | a root migration command                     | the ADR-0015 factory and command facade over one selected build |
        | the PostgreSQL namespace migration lock      | the accepted ADR-0015 catalog-bound migrations:v2 identity instead of ADR-0012's NFC-based migrations:v1 identity |
        | a database-backed migration test harness     | ADR-0018 isolation invoking the ADR-0015 boundary in TASK-004 |
        | an ERD                                       | migrated-state evidence produced only after TASK-004 implementation |

  @HS-003 @repository_baseline @human_decision @DG-003 @FR-FE-001 @FR-FE-002 @FR-FE-003 @FR-FE-004 @FR-FE-005 @OR-003
  Rule: An agent must not select the frontend GraphQL client while DG-003 is pending

    Scenario Outline: Prevent work controlled by the pending frontend data gate
      Given DG-003 has status "Pending"
      When a change proposes <controlledWork>
      Then the change must not proceed
      And no GraphQL client, query-cache library, generation tool, or client error policy is selected implicitly
      And work may continue only after a project-owner-approved ADR resolves DG-003

      Examples:
        | controlledWork                                       |
        | a frontend GraphQL client dependency or provider     |
        | generated frontend operation artifacts               |
        | a frontend data-access test coupled to a client      |
        | a frontend query, mutation, hook, or cache configuration |

  @HS-004 @deferred_optional @OR-002 @OR-005 @OR-006 @OR-009 @ADR-0002 @ADR-0003 @ADR-0006 @ADR-0008
  Rule: Deferred optional capabilities remain outside the delivery baseline

    Scenario Outline: Prevent silent adoption of deferred optional scope
      Given <requirement> has repository disposition "Deferred"
      When a change proposes <capability>
      Then the capability is not treated as current delivery scope
      And the governing authority must be changed with project-owner approval before implementation

      Examples:
        | requirement | capability                              |
        | OR-002      | character soft deletion                 |
        | OR-005      | a recurring 12-hour synchronization job |
        | OR-006      | an experimental query-timing decorator  |
        | OR-009      | Swagger documentation                   |

  @HS-005 @repository_baseline @human_decision @ADR-0005
  Rule: Anonymous public mutations require a new security and ownership decision

    Scenario: Block public deployment of the initial single-user write surface
      Given favorites and comments use the accepted single-user demo model
      When a deployment would expose anonymous mutations to public traffic
      Then deployment remains blocked until a new or superseding ADR is accepted
      And that decision defines authentication or abuse controls, a request-body limit, restricted CORS, mutation rate limiting, and durable comment retention

    Scenario: Preserve the explicit single-user interaction model
      Given user identity and authentication are outside the current scope
      When favorite state and comments are persisted
      Then each character has one global favorite value
      And comments have no user owner
      And no user, credential, session, or authorization table is introduced

  @HS-006 @repository_baseline @adopted_optional @OR-001 @ADR-0002 @ADR-0014 @DG-001
  Rule: Application and test source use strict TypeScript

    Scenario: Type-check every implemented workspace without emitting files
      Given the web, API, shared, and test source exists
      And DG-001 has been resolved with authoritative command boundaries
      When the documented strict type-check scope runs
      Then all application and test source passes strict TypeScript checks

    Scenario: Derive backend resolver types from the version-controlled GraphQL schema
      Given a version-controlled GraphQL schema is implemented
      When the documented generation and drift-check scopes run
      Then backend resolver types are generated from that schema
      And the generated output matches the schema
      And generated artifacts have not been edited by hand

    Scenario: Keep language and asynchronous control flow within the accepted baseline
      When application and test source is inspected
      Then it uses stable ECMAScript modules and documented runtime targets
      And it does not use "var"
      And asynchronous flows prefer async and await
      And independent asynchronous work uses an explicit concurrency primitive
      And experimental decorators are not enabled solely for query timing

    Scenario: Validate runtime inputs before use
      When environment configuration, GraphQL input, or public API payloads enter the application
      Then each value is validated at runtime before use
      And static TypeScript assertions are not treated as runtime validation

  @HS-007 @repository_baseline @adopted_optional @OR-008 @ADR-0006 @ADR-0007 @ADR-0014
  Rule: The modular monolith preserves ownership boundaries

    Scenario: Keep browser and server dependencies separated
      When workspace dependencies are inspected
      Then the browser imports no Sequelize model or server-only type
      And the browser has no direct PostgreSQL, Redis, or upstream character JSON API dependency
      And only native image elements may contact the exact governed upstream avatar URLs
      And the shared package contains contract-level artifacts rather than backend domain models

    Scenario: Keep GraphQL transport thin
      When API module dependencies are inspected
      Then resolvers validate and map transport input
      And application services coordinate use cases and caching
      And persistence adapters own Sequelize access
      And resolvers do not query Sequelize directly

    Scenario: Keep the API in one deployable process
      When the application runtime topology is inspected
      Then transport, application, and persistence modules communicate in process
      And no microservice, event bus, or other cross-process application boundary exists without a superseding ADR

  @HS-008 @repository_baseline @mandatory @FR-BE-001 @ADR-0006 @ADR-0014
  Rule: GraphQL exposes only the approved use-case contract

    Scenario: Separate list and detail projections
      When the version-controlled GraphQL schema is inspected
      Then CharacterSummary exposes only id, name, imageUrl, and species
      And CharacterDetail exposes the approved detail, favorite, and bounded-comment fields
      And both imageUrl fields return the exact stored absolute URL for that character
      And persistence-only fields are not exposed automatically

    Scenario Outline: Reject an invalid character identifier
      Given a character-targeting GraphQL operation
      When the operation receives the ID "<id>"
      Then the response uses the GraphQL error code "BAD_USER_INPUT"
      And no application service is called with that identifier

      Examples:
        | id  |
        | abc |
        | 0   |
        | -1  |
        | 1.5 |

    Scenario Outline: Report a valid missing character consistently
      Given positive integer character ID 999 does not exist
      When a client invokes the <operation> for character 999
      Then the response uses the GraphQL error code "NOT_FOUND"

      Examples:
        | operation              |
        | character detail query |
        | favorite mutation      |
        | comment mutation       |

    Scenario: Hide infrastructure details from an unexpected failure
      Given a resolver or service encounters an unexpected failure
      When the GraphQL response is returned
      Then the response uses the GraphQL error code "INTERNAL_SERVER_ERROR"
      And the response contains no stack trace, SQL detail, Redis detail, secret, or internal path

  @HS-009 @repository_baseline @mandatory @FR-FE-005 @FR-BE-001 @ADR-0005 @ADR-0006
  Rule: Comment input and reads remain bounded and safe

    Scenario Outline: Reject an invalid comment body
      Given character 1 exists
      When a client submits <invalidBody> for character 1
      Then the response uses the GraphQL error code "BAD_USER_INPUT"
      And no comment is persisted

      Examples:
        | invalidBody                      |
        | an empty body                    |
        | a whitespace-only body           |
        | 1,001 Unicode characters         |

    Scenario: Accept the documented comment bounds after trimming
      Given character 1 exists
      When a client submits a comment containing from 1 through 1,000 Unicode characters after trimming
      Then the comment is persisted for character 1
      And the returned body contains the validated plain text

    Scenario: Render markup-like comment content as text
      Given character 1 has the comment "<script>alert('unsafe')</script>"
      When the comment is displayed
      Then the complete value is visible as plain text
      And no executable element is created from the comment body

    Scenario Outline: Reject invalid comment pagination
      Given character 1 exists
      When comments are requested with <arguments>
      Then the response uses the GraphQL error code "BAD_USER_INPUT"

      Examples:
        | arguments             |
        | limit 0 and offset 0  |
        | limit 51 and offset 0 |
        | limit 20 and offset -1 |

    Scenario: Bound and order valid comment reads
      Given character 1 has more than 50 comments
      When comments are requested without pagination arguments
      Then at most 20 comments are returned newest first
      When comments are requested with limit 50 and a non-negative offset
      Then no more than 50 comments are returned newest first

  @HS-010 @repository_baseline @mandatory @FR-BE-002 @AC-008 @ADR-0003 @ADR-0006
  Rule: Character filters have deterministic and injection-safe semantics

    Scenario Outline: Normalize filters according to their field semantics
      Given stored characters have distinguishable values for <field>
      When equivalent searches vary only in accepted case or surrounding whitespace
      Then the searches return equivalent results using <matchingRule>

      Examples:
        | field   | matchingRule                               |
        | status  | case-insensitive exact matching            |
        | gender  | case-insensitive exact matching            |
        | name    | case-insensitive literal substring matching |
        | species | case-insensitive literal substring matching |
        | origin  | case-insensitive literal substring matching |

    Scenario: Treat blank filters as absent
      When a character search contains blank or whitespace-only filter values
      Then those values are removed from the effective filter

    Scenario: Combine multiple filters with AND
      Given stored characters match different subsets of supplied filters
      When a search supplies more than one effective filter
      Then every returned character satisfies every supplied filter

    Scenario Outline: Treat SQL metacharacters as literal input
      When a character search contains "<value>"
      Then the value does not change the SQL query structure
      And Sequelize uses safely bound values

      Examples:
        | value |
        | %     |
        | _     |
        | '     |
        | %_'   |

  @HS-011 @repository_baseline @mandatory @FR-BE-003 @NFR-003 @AC-009 @ADR-0003 @ADR-0014 @ADR-0015 @DG-002 @DG-005 @DG-006 @AUTH-001
  Rule: Relational persistence enforces the accepted model

    Scenario: Apply schema migrations without external network access
      Given the accepted ADR-0015 migration lifecycle has been implemented
      And DG-005 was resolved before TASK-004 began
      And an empty PostgreSQL database is available
      And external network access is disabled
      When all version-controlled migrations are applied
      Then the migration workflow completes without calling the public Rick and Morty API

    Scenario: Enforce character-comment relationships
      Given the application schema has been migrated
      When a comment references an existing character
      Then PostgreSQL accepts the relationship
      But a comment referencing a missing character is rejected

    Scenario: Store searchable character data in explicit columns
      When the migrated character table is inspected
      Then status, species, gender, name, origin name, and origin URL use explicit columns
      And image_url is a non-null text column containing the exact validated absolute Character.image URL
      And the required search data is not hidden in one opaque payload

    Scenario: Exclude an application-owned image subsystem from the relational model
      When the migrated schema and Sequelize models are inspected
      Then no image relation, image bytes, media metadata, digest, history, lifecycle state, acquisition lock, or image-serving table exists

  @HS-012 @repository_baseline @mandatory @FR-BE-004 @AC-009 @ADR-0008 @ADR-0014 @DG-006 @AUTH-001
  Rule: Character ingestion is deterministic, atomic, and idempotent

    Scenario: Repeating the baseline import does not duplicate data
      Given upstream character IDs 1 through 15 were imported successfully
      When the same import completes again
      Then exactly 15 distinct baseline characters remain
      And no duplicate related records are created

    Scenario: A refresh preserves application-owned state
      Given an imported character has a favorite value and stored comments
      When the character is imported again with changed source-owned fields
      Then the source-owned character fields are updated
      But the favorite value and comments remain unchanged

    Scenario: Bind each imported avatar URL to the requested and payload character identity
      Given the importer requested a canonical character ID from 1 through 15
      And the response payload ID equals that requested ID
      When the payload is validated before publication
      Then Character.image equals the byte-exact concatenation of "https://rickandmortyapi.com/api/character/avatar/", that canonical requested ID, and ".jpeg"
      And the importer never substitutes Character.url
      And the stored image_url equals that exact Character.image value

    Scenario: Reject a non-canonical or mismatched avatar destination atomically
      Given any baseline payload has a missing image value, a mismatched payload or path ID, or a URL with a different scheme, host, host case, credential, port, path, query, fragment, encoding, backslash, or Unicode-confusable host
      When the baseline import validates the complete response
      Then the import exits with a non-zero result before publication
      And the previously committed dataset remains unchanged
      And no partial replacement dataset is visible

    Scenario Outline: Roll back an incomplete import
      Given a previously committed character dataset
      And a <failure> occurs during the next import
      When the import command exits
      Then it returns a non-zero status
      And the previously committed dataset remains unchanged
      And no partial replacement dataset is visible
      And search-cache invalidation is not requested

      Examples:
        | failure             |
        | fetch failure       |
        | validation failure  |
        | persistence failure |

    Scenario: Request cache invalidation only after commit
      Given an import has valid source data
      When its PostgreSQL transaction commits
      Then best-effort search-cache invalidation is requested after the commit
      But invalidation is not requested before the commit

    Scenario: Bound an unavailable public API during import
      Given the public Rick and Morty API is unavailable
      When the explicit character import runs
      Then upstream calls use bounded timeouts and limited retries
      And the command exits with a clear non-zero result
      And no partial dataset is committed

  @HS-013 @repository_baseline @mandatory @FR-BE-005 @AC-010 @ADR-0007 @ADR-0014
  Rule: Cache-aside behavior remains bounded, isolated, and non-authoritative

    Scenario: Use the accepted default cache bounds
      Given no cache namespace, TTL, or request-path Redis timeout override is configured
      When cache-aside configuration is loaded
      Then the namespace is "character-app:local"
      And the search TTL is 300 seconds
      And the request-path Redis operation bound is 250 milliseconds

    Scenario: Equivalent filters use one canonical cache entry
      When searches differ only by filter order, accepted case normalization, whitespace, or absent values
      Then they use the same versioned SHA-256 search key

    Scenario: Distinct effective filters use distinct cache entries
      When two searches have different effective filter values
      Then they do not use the same cache key

    Scenario: Cache and reuse an empty result
      Given PostgreSQL returns an empty list for a valid search
      When the same search runs again before the finite TTL expires
      Then the empty list is treated as a Redis hit
      And PostgreSQL is not queried again for that search

    Scenario: Cache only the stable summary projection
      When a character search result is serialized for Redis
      Then the cached value conforms to CharacterSummary
      And its imageUrl equals the exact absolute URL stored for that character
      And it contains no favorite value, comment, or detail-only field
      And it contains no image bytes or image-lifecycle metadata

    Scenario: Do not invalidate searches after interaction mutations
      Given the cached summary projection contains no favorite or comment data
      When a favorite or comment mutation commits
      Then character search keys are not invalidated

    Scenario: Recover from a malformed cached value
      Given Redis contains an invalid search projection
      When the matching search executes
      Then the invalid value is ignored
      And best-effort unlink is attempted
      And the correct result is loaded from PostgreSQL

    Scenario Outline: Fail open when Redis cannot serve a search
      Given PostgreSQL is available
      And Redis experiences a <failure>
      When a character search executes
      Then the correct PostgreSQL result is returned
      And a safe warning is logged
      And the request does not wait beyond the configured Redis operation bound

      Examples:
        | failure             |
        | read error          |
        | write error         |
        | serialization error |
        | operation timeout   |
        | connection outage   |

    Scenario: Keep test and environment namespaces isolated
      Given two environments or test runs use different configured Redis namespaces
      When either one reads or evicts search keys
      Then it cannot read or evict keys owned by the other namespace

    Scenario: Invalidate search keys without blocking Redis
      Given a character import has committed
      When search-cache invalidation runs
      Then it iterates only the configured search namespace with SCAN
      And it removes matching keys with UNLINK
      And it never uses KEYS or crosses the configured namespace

    Scenario: Preserve committed data when invalidation fails
      Given a character import transaction has committed
      And Redis invalidation fails
      Then the PostgreSQL update remains committed
      And a safe warning is logged
      And stale search data cannot outlive its finite TTL

    Scenario: Do not promote Redis to an unbounded authority
      Given no valid cached search value exists
      And PostgreSQL is unavailable
      When a client requests a character search
      Then the request fails clearly
      And Redis does not fabricate or serve an invalid unbounded result

  @HS-014 @repository_baseline @mandatory @FR-BE-006 @AC-011 @ADR-0006
  Rule: Request observability does not leak sensitive or unbounded content

    Scenario Outline: Emit exactly one bounded record for every completed Express request
      Given the API receives <request>
      When the request completes
      Then standard output contains exactly one bounded structured request record
      And the record contains a request ID, method, path, status, duration, and error count
      And GraphQL operation metadata is included only when it is safely available

      Examples:
        | request                      |
        | a GET request to /healthz    |
        | a successful GraphQL request |
        | a failing GraphQL request    |

    Scenario: Exclude unsafe data from request logs
      When request middleware records an Express request
      Then the record excludes the full request body
      And the record excludes comment text, secrets, authorization data, and stack traces

    Scenario: Log an unexpected failure without exposing it to the client
      Given an unexpected API failure
      When the request completes
      Then the structured request record reports its error count
      And server-side diagnostics retain the original failure
      But the client response contains no infrastructure detail

  @HS-015 @repository_baseline @FR-FE-002 @FR-FE-004 @FR-FE-005 @NFR-005 @ADR-0005 @ADR-0009 @DG-003
  Rule: Frontend state remains with its designated owner

    @mandatory
    Scenario Outline: Keep each mandatory state category with one owner
      When frontend state ownership is inspected
      Then <state> is owned by <owner>
      And no competing authoritative copy exists in browser storage or a global client store

      Examples:
        | state                                | owner                         |
        | sorting                              | the browser URL               |
        | character, favorite, and comment data | the GraphQL query cache and API |
        | an unsubmitted isolated comment body | the owning component          |

    @adopted_optional @OR-003
    Scenario: Keep adopted interface filters in the browser URL
      When frontend state ownership is inspected
      Then status, species, and gender interface filters are owned by the browser URL
      And no competing authoritative copy exists in browser storage or a global client store

    Scenario: Refetch affected detail data after a successful mutation
      Given the frontend client selected after DG-003 is implemented
      When a favorite or comment mutation succeeds
      Then the affected character-detail query is explicitly refetched
      And the UI does not depend on implicit normalized entity identity

    Scenario Outline: Do not present a failed mutation as durable state
      Given the visitor is viewing a character detail
      When the <mutation> fails
      Then the interface displays a clear interaction error
      And the failed change is not presented as persisted state

      Examples:
        | mutation          |
        | favorite mutation |
        | comment mutation  |

    Scenario: Do not add Zustand without a qualifying state slice
      Given no client-only state crosses routes or a meaningful component boundary
      When frontend dependencies and stores are inspected
      Then Zustand is absent
      And no global store duplicates URL-owned or server-owned data

    Scenario: Constrain a qualifying future Zustand store
      Given a concrete state slice is cross-cutting, client-only, unsuitable for the URL, and costly to keep local
      When Zustand is introduced under ADR-0009
      Then the store uses strict types, explicit actions, narrow selectors, and focused tests
      And it contains no characters, GraphQL results, favorites, comments, URL filters, sorting, or isolated form drafts
      And persistence middleware is absent without a separate documented need

  @HS-016 @repository_baseline @FR-FE-002 @NFR-002 @NFR-005 @AC-002 @AC-006 @ADR-0009
  Rule: Frontend navigation and presentation remain deterministic

    Scenario: Expose the accepted list and detail routes
      When the React Router configuration is inspected
      Then the character list is addressable at "/"
      And character details are addressable at "/characters/:id"

    Scenario: Present a clear not-found state for a missing detail
      Given a positive integer character ID does not exist
      When the visitor directly opens that character detail route
      Then the interface displays a clear not-found state
      And it does not substitute a different character

    Scenario: Use a stable character-name ordering
      Given two characters have names that compare equally without case
      When either supported alphabetical direction is applied
      Then comparison is locale-aware and case-insensitive
      And character ID provides a deterministic tiebreaker

    @mandatory
    Scenario: Recover from an unsupported sort value
      Given the browser location contains an unsupported sort value
      When the list state is normalized
      Then the unsupported value is replaced by the TASK-010 default recorded in the execution log

    @adopted_optional @OR-003
    Scenario: Recover from an unsupported interface-filter value
      Given the browser location contains an unsupported status, species, or gender value
      When the list state is normalized
      Then the unsupported value is replaced by the TASK-010 filter behavior recorded in the execution log

    Scenario Outline: Keep error handling layout-safe
      Given the viewport width is <width> pixels
      And a list, detail, API, or image error occurs
      When the interface renders the error state
      Then required navigation and recovery controls remain readable and operable
      And no required content is clipped or hidden outside the viewport

      Examples:
        | width |
        | 375   |
        | 768   |
        | 1280  |

  @HS-017 @repository_baseline @adopted_optional @OR-004 @OR-007 @ADR-0014 @ADR-0016 @DG-001
  Rule: The automated test portfolio covers the selected risks

    Scenario: Drive each production milestone slice through one test-first cycle
      Given DG-001 has been resolved and the relevant test boundary exists
      And the test owner has classified each intended scenario as EXISTING_AND_COVERED, EXISTING_BUT_UNCOVERED, MISSING, REGRESSION, PARTIAL, CONFLICTING, or UNKNOWN
      When a coherent milestone slice changes production behavior
      Then its minimum coherent test set fails first for one intended shared reason during Red
      And the coordinator freezes the accepted test boundary before the implementation owner starts
      And the implementation owner reuses a fresh accepted Red unless evidence is missing or stale, the worktree or contract drifted, or external state can change the result
      And the implementation owner adds the smallest complete production change required for Green
      And the focused scope remains green after any Refactor
      And focused scope reaches Green for every coherent slice
      And the milestone records one affected-suite and relevant type-check or build join
      And the milestone records one risk-proportional independent semantic review
      And the handoff records the exact Red, Green, affected-scope, and milestone commands and outcomes

    Scenario: Avoid artificial cycles and unrelated behavior batches
      Given preflight finds covered, uncovered, partial, missing, regressed, conflicting, or uncertain behavior
      When the milestone slice is formed
      Then EXISTING_AND_COVERED records passing test and implementation evidence without a new cycle
      And EXISTING_BUT_UNCOVERED adds passing characterization evidence without Green or a production edit
      And only a coordinator-confirmed explicit gap of PARTIAL may enter the cycle
      And CONFLICTING and UNKNOWN stop dependent work for reconciliation or bounded investigation
      And unrelated goals, contracts, boundaries, or change surfaces remain separate slices
      And no next slice begins before the current slice is Green

    Scenario: Meet the adopted frontend test commitment
      Given the frontend test scope selected after DG-001 exists
      When the frontend suite runs
      Then at least three distinct frontend components or layouts have meaningful automated coverage
      And that coverage includes card rendering, A-Z and Z-A sorting, and detail loading, error, and interaction behavior

    Scenario: Meet the adopted backend unit-test commitment
      Given the backend unit-test scope selected after DG-001 exists
      When the backend unit suite runs
      Then the character-search query or service is covered with repository and cache test doubles
      And normalization, filtering, cache hit, cache miss, and returned results are observable

    Scenario: Exercise the real infrastructure boundaries deterministically
      Given isolated migrated PostgreSQL and real namespaced Redis are available
      When the integration suites run
      Then every required filter and at least one combined filter are covered
      And migrations and the idempotent 15-character import are covered from an empty database
      And Redis hit, miss, empty result, TTL, serialization, invalidation, and connection wiring are covered
      And no test calls the live public Rick and Morty API

    Scenario: Isolate concurrent integration runs
      Given two integration runs execute concurrently
      When each run creates its database and cache state
      Then each uses a unique test database or schema and Redis key prefix
      And teardown removes only state owned by that run

    Scenario: Reject test shortcuts that change the contract
      When repository tests and production branches are inspected
      Then no test is skipped or focused
      And no test is weakened or deleted merely to make implementation pass
      And production behavior does not branch on the test environment

    Scenario: Audit affected test relevance before completing a milestone
      Given an implementation milestone is otherwise complete
      When the milestone test-relevance audit runs
      Then affected tests remain traceable to current requirements, ADRs, contracts, or confirmed regressions
      And affected fixtures, mocks, helpers, snapshots, skipped tests, and focused tests are removed or have an explicit current consumer
      And the affected test scopes and relevant strict type-check or build boundary pass after justified maintenance

    Scenario: Audit complete test relevance at task closure
      Given an implementation plan and its owning task are otherwise complete
      When the closure test-relevance audit runs
      Then suite-wide tests and support artifacts remain traceable to current requirements, ADRs, contracts, or confirmed regressions
      And residual fixtures, mocks, helpers, snapshots, skipped tests, and focused tests are removed or have an explicit current consumer
      And the complete authoritative test scopes pass at closure
      And a repeated complete scope identifies the risk, drift, failed prerequisite, or evidence invalidation that required it

  @HS-018 @repository_baseline @mandatory @DEL-001 @DEL-002 @DEL-003 @NFR-006 @AC-012 @ADR-0003 @ADR-0006 @ADR-0008 @ADR-0014 @ADR-0015
  Rule: Delivery claims require reproducible evidence

    Scenario: Do not infer implementation from planning artifacts
      Given a requirement, ADR, plan, mock, stub, SPEC scenario, or HARD_SPEC scenario exists
      When repository progress or acceptance is reported
      Then that artifact alone is not treated as implementation or passing evidence

    Scenario: Verify public repository delivery independently
      Given a Git remote is configured
      When DEL-001 is evaluated
      Then anonymous public accessibility is verified separately
      And committed application source and meaningful Git history are inspected

    Scenario: Keep the ERD aligned with executable migrations
      Given DG-002 is resolved and migrations exist
      When DEL-002 is evaluated
      Then the ERD matches a freshly migrated PostgreSQL schema
      And it claims no unimplemented table, key, constraint, or relationship
      And it shows only characters.image_url for image persistence and no image relation or byte store

    Scenario: Keep documented commands authoritative and reproducible
      Given run and GraphQL usage documentation exists
      When DEL-003 is evaluated from a clean clone
      Then every documented command maps to an executable repository command
      And the instructions cover prerequisites, non-secret configuration, installation, infrastructure, migration, import, development, test, build, and all four GraphQL use cases
      And the instructions describe the third-party avatar URL, CSP, CORS, referrer, privacy, cache, outage, fallback, and rights boundaries when image delivery exists

  @HS-019 @repository_baseline @mandatory @NFR-004 @ADR-0002 @ADR-0006 @ADR-0014 @ADR-0016
  Rule: Mandatory code quality remains structured and reviewable

    @minimum_assessment
    Scenario: Keep application source structured and readable
      Given application source has been implemented
      When its structure and identifiers are reviewed
      Then the code is organized into coherent responsibilities
      And identifiers communicate intent without relying on hidden conventions

    Scenario: Keep source organized around clear ownership
      Given application source has been implemented
      When its structure and dependencies are reviewed
      Then modules have clear web, API, contract, application-service, and persistence ownership
      And identifiers communicate intent without relying on hidden conventions
      And generated or test scaffolding has an explicit current consumer

    @minimum_assessment
    Scenario: Use comments for relevant non-obvious context
      When application and test source is reviewed
      Then comments explain relevant non-obvious constraints or decisions
      And comments do not restate self-explanatory code or preserve obsolete behavior

  @HS-020 @repository_baseline @human_decision @DG-006 @AUTH-001 @FR-FE-001 @FR-FE-003 @NFR-001 @NFR-005 @AC-001 @AC-003 @ADR-0003 @ADR-0006 @ADR-0007 @ADR-0008 @ADR-0009 @ADR-0014
  Rule: Character-image delivery must follow accepted ADR-0014

    Scenario: Keep controlled work inside the accepted direct-URL boundary
      Given DG-006 has status "Resolved"
      And ADR-0014 has status "Accepted"
      And AUTH-001 has status "Authorized"
      And AUTH-001 is limited to this personal, educational, non-commercial portfolio using the exact ADR-0014 direct URLs and ordinary browser and intermediary caching
      When a change proposes image-specific persistence, import, GraphQL, Redis, browser, CSP, fallback, test, or documentation work
      Then it must preserve the exact requested-ID, payload-ID, and Character.image URL binding
      And PostgreSQL, GraphQL, and finite Redis projections must use the same exact absolute URL
      And no image relation, image bytes, decoder, durable image cache, proxy route, asset route, image lock, retention, purge, or withdrawal artifact may be added
      And image-specific work may begin only in its owning downstream task after that task's remaining prerequisites
      And provider or content-source, host or URL mapping, project or commercial scope, provider terms or authorization, objection or takedown status, delivery mechanism or redistribution, or disposition changes must reopen AUTH-001 before dependent image work
      And any proposed departure from ADR-0014's accepted direct-URL technical semantics must remain prohibited until the applicable ADR is approved and synchronized
      And no behavior may be claimed without evidence from its owning downstream task

    Scenario: Constrain direct browser avatar requests
      Given a downstream task is authorized to implement the accepted image boundary
      When a list or detail image is rendered
      Then its native image source is the exact GraphQL imageUrl
      And the request uses anonymous CORS and a no-referrer policy without credentials, authorization, tracking parameters, JavaScript byte fetching, or an application retry loop
      And an enforcing path-qualified img-src permits only the reviewed avatar path while connect-src prohibits upstream character JSON requests
      And one accessible fixed-square DOM and CSS fallback replaces a failed image without another image source
      And the implementation documents that redirects, final bytes, provider availability, browser caching, and visitor metadata disclosure remain outside application control
