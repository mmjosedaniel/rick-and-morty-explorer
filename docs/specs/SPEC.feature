# Status: Specified, not executed.
# Authority: Derived from docs/REQUIREMENTS.md and accepted ADRs.
# This file is intent only; it is not implementation or acceptance evidence.

@SPEC @planned
Feature: Rick and Morty character application behavior
  The application provides a responsive character browser backed by the
  project GraphQL API, PostgreSQL persistence, and Redis search caching.
  Scenarios describe observable success paths without selecting tooling
  controlled by pending decision gates.

  @SPEC-001 @repository_baseline @mandatory @FR-FE-001 @AC-001 @ADR-0006 @ADR-0009 @DG-004
  Rule: Visitors can browse character cards

    @minimum_assessment
    Scenario: Display the available characters as cards
      Given the application contains an initialized character baseline
      When a visitor opens the character list
      Then one card is displayed for each returned character
      And every card shows the character name
      And every card shows the character image
      And every card shows the character species

  @SPEC-002 @repository_baseline @mandatory @FR-FE-002 @AC-002 @ADR-0009
  Rule: Visitors can sort the visible character list

    @minimum_assessment
    Scenario Outline: Sort characters alphabetically in either direction
      Given the visible characters are "Beth Smith", "Morty Smith", and "Rick Sanchez"
      When the visitor selects the "<direction>" name sort
      Then the visible character names appear as "<orderedNames>"

      Examples:
        | direction | orderedNames                          |
        | A-Z       | Beth Smith, Morty Smith, Rick Sanchez |
        | Z-A       | Rick Sanchez, Morty Smith, Beth Smith |

  @SPEC-003 @repository_baseline @mandatory @FR-FE-003 @AC-003 @ADR-0006 @ADR-0009 @DG-004
  Rule: Visitors can open an addressable character detail

    @minimum_assessment
    Scenario: Open character details from a card
      Given character 1 is available in the character list
      When the visitor selects the card for character 1
      Then the application displays the detail view for character 1
      And the detail shows the character image

    Scenario: Give a selected character detail an addressable location
      Given character 1 is available in the character list
      When the visitor selects the card for character 1
      Then the browser location identifies character 1
      And the detail shows the character name
      And the detail shows the character image
      And the detail shows the character species
      And the detail shows the character status
      And the detail shows the character gender
      And the detail shows the character origin name

    Scenario: Show a non-empty character type
      Given character 1 has a non-empty character type
      When the visitor opens the detail for character 1
      Then the detail shows the character type

    Scenario: Omit an empty character type row
      Given character 1 has an empty character type
      When the visitor opens the detail for character 1
      Then the detail does not show an empty character type row

    Scenario: Open a character detail directly
      Given character 1 exists
      When the visitor directly opens the location for character 1
      Then the application displays the detail view for character 1

  @SPEC-004 @repository_baseline @mandatory @FR-FE-004 @AC-004 @ADR-0004 @ADR-0005 @ADR-0006 @ADR-0009
  Rule: Visitors can manage favorite state

    @minimum_assessment
    Scenario: Mark a character as a favorite from the detail view
      Given character 1 is not a favorite
      And the visitor is viewing character 1
      When the visitor marks character 1 as a favorite
      Then the detail view shows character 1 as a favorite

    Scenario: Preserve favorite state after reload
      Given character 1 was marked as a favorite
      When the visitor reloads the detail for character 1
      Then the favorite state remains visible after the detail is reloaded

  @SPEC-005 @repository_baseline @mandatory @FR-FE-005 @AC-005 @ADR-0003 @ADR-0005 @ADR-0006 @ADR-0009
  Rule: Visitors can add comments

    @minimum_assessment
    Scenario: Add a valid comment to a character
      Given the visitor is viewing character 1
      When the visitor adds the comment "Great scientist"
      Then the detail view shows the comment "Great scientist"

    Scenario: Preserve a comment after reload
      Given character 1 has the comment "Great scientist"
      When the visitor reloads the detail for character 1
      Then the comment remains visible after the detail is reloaded

    Scenario: Show the newest comments first
      Given character 1 has the comment "First comment"
      And character 1 later receives the comment "Second comment"
      When the visitor opens the comments for character 1
      Then "Second comment" appears before "First comment"

  @SPEC-006 @repository_baseline @adopted_optional @OR-003 @FR-BE-002 @ADR-0006 @ADR-0009
  Rule: Visitors can filter from the character list

    Scenario Outline: Apply an adopted interface filter
      Given the character list contains records with different <field> values
      When the visitor filters the list by <field> using "<value>"
      Then the browser location represents the selected <field> filter
      And the project GraphQL API receives the corresponding <field> filter
      And every visible result satisfies the selected <field> filter

      Examples:
        | field   | value  |
        | status  | Alive  |
        | species | Human  |
        | gender  | Female |

    Scenario: Restore list filters and sorting through browser navigation
      Given the visitor selected a sort direction and interface filters
      When the visitor reloads the list or navigates back to it
      Then the browser location restores the selected list state
      And the displayed results match that restored state

  @SPEC-007 @repository_baseline @mandatory @NFR-002 @NFR-005 @AC-006 @ADR-0009
  Rule: The interface remains usable across supported layouts and states

    @minimum_assessment
    Scenario Outline: Present a usable responsive layout
      Given the viewport width is <width> pixels
      When the visitor uses the character list and detail views
      Then cards, controls, images, and text remain readable and operable
      And the layout uses responsive Flexbox and Grid behavior
      And no required content is lost outside the viewport

      Examples:
        | width |
        | 375   |
        | 768   |
        | 1280  |

    Scenario Outline: Present explicit data states
      Given the character request is in the "<state>" state
      When the visitor views the character area
      Then the interface displays a clear "<outcome>" presentation

      Examples:
        | state   | outcome |
        | loading | loading |
        | empty   | empty   |
        | error   | error   |

    @DG-004
    Scenario: Preserve the layout when a character image fails
      Given a character image cannot be loaded
      When the character card or detail is rendered
      Then meaningful alternative text identifies the character
      And a layout-safe fallback preserves the interface structure

  @SPEC-008 @repository_baseline @mandatory @FR-BE-001 @AC-007 @ADR-0004 @ADR-0006 @DG-004
  Rule: The Express application exposes the project GraphQL use cases

    @minimum_assessment
    Scenario: Serve a GraphQL operation through the Express HTTP boundary
      Given the API application is running
      When a client sends a valid character-search GraphQL operation through its configured Express HTTP boundary
      Then Express serves the operation through GraphQL
      And the client receives a GraphQL response containing the character-search result

    Scenario: Query character summaries
      Given the initialized characters exist in PostgreSQL
      When a GraphQL client requests characters without a filter
      Then the API returns a list of character summaries
      And every summary contains only the character ID, name, image URL, and species

    Scenario: Query one character detail
      Given character 1 exists in PostgreSQL
      When a GraphQL client requests character 1
      Then the API returns character 1 with descriptive fields, origin, favorite state, and bounded comments

    Scenario: Change favorite state through GraphQL
      Given character 1 exists in PostgreSQL
      When a GraphQL client sets the favorite state of character 1
      Then the API returns the updated character detail
      And a later detail request returns the updated favorite state

    Scenario: Add a comment through GraphQL
      Given character 1 exists in PostgreSQL
      When a GraphQL client adds a valid comment to character 1
      Then the API returns the created comment
      And a later detail request includes the created comment

  @SPEC-009 @repository_baseline @mandatory @FR-BE-002 @AC-008 @ADR-0003 @ADR-0006
  Rule: The GraphQL API supports every required character filter

    Background:
      Given PostgreSQL contains these characters:
        | id | name               | status | species      | gender | origin                        |
        | 1  | Rick Sanchez       | Alive  | Human        | Male   | Earth (C-137)                 |
        | 2  | Morty Smith        | Alive  | Human        | Male   | unknown                       |
        | 3  | Summer Smith       | Alive  | Human        | Female | Earth (Replacement Dimension) |
        | 4  | Krombopulos Michael | Dead   | Gromflomite | Male   | Gromflom Prime                |

    @minimum_assessment
    Scenario Outline: Filter characters by one supported field
      When a GraphQL client searches with <field> equal to "<value>"
      Then the returned character IDs are "<ids>"

      Examples:
        | field   | value  | ids     |
        | status  | Alive  | 1, 2, 3 |
        | species | Human  | 1, 2, 3 |
        | gender  | Female | 3       |
        | name    | Morty  | 2       |
        | origin  | Earth  | 1, 3    |

    Scenario: Combine supplied filters with AND semantics
      When a GraphQL client searches for status "Alive", species "Human", and gender "Female"
      Then the returned character IDs are "3"

    Scenario: Return an empty list for a valid search without matches
      When a GraphQL client searches with a valid filter that matches no character
      Then the characters query returns an empty list
      And the response contains no GraphQL error

  @SPEC-010 @repository_baseline @mandatory @FR-BE-003 @FR-BE-004 @NFR-003 @AC-009 @ADR-0003 @ADR-0008 @ADR-0012 @DG-002 @DG-004
  Rule: PostgreSQL is created through migrations and initialized

    @minimum_assessment
    Scenario: Create and initialize an empty application database with 15 API characters
      Given an empty PostgreSQL database
      And the accepted ADR-0012 migration lifecycle has been implemented and is available
      When Sequelize migrations and database initialization are run
      Then the application schema is created through Sequelize migrations
      And exactly 15 distinct characters obtained from the public Rick and Morty API are stored

    Scenario: Use the deterministic accepted baseline
      Given an empty PostgreSQL database
      And the accepted ADR-0012 migration lifecycle has been implemented and is available
      When the version-controlled migrations and explicit character import are run
      Then exactly the upstream character IDs 1 through 15 are stored
      And their source-owned fields come from validated public Rick and Morty API payloads

  @SPEC-011 @repository_baseline @mandatory @FR-BE-001 @FR-BE-003 @FR-BE-004 @ADR-0004 @ADR-0008
  Rule: PostgreSQL is the runtime source of truth

    Scenario: Use initialized data while the public API is unavailable
      Given the required characters were imported successfully
      And the public Rick and Morty API is unavailable
      When clients list, view, favorite, or comment on stored characters
      Then the project GraphQL API serves those use cases from PostgreSQL

  @SPEC-012 @repository_baseline @mandatory @FR-BE-005 @NFR-003 @AC-010 @ADR-0004 @ADR-0007
  Rule: Redis caches character searches

    @minimum_assessment
    Scenario: Cache and reuse a repeated character search
      Given Redis has no entry for a character search
      When the character search is requested for the first time
      Then PostgreSQL provides the result
      And Redis stores the search result
      When the same character search is requested again
      Then Redis provides the result without repeating the PostgreSQL search

    Scenario: Bound and reuse an equivalent cached search
      Given Redis has no entry for a character search
      When the character search is requested for the first time
      Then Redis stores the character-summary result with a finite TTL
      When an equivalent character search is requested again
      Then Redis provides the result without repeating the PostgreSQL search

  @SPEC-013 @repository_baseline @mandatory @FR-BE-006 @AC-011 @ADR-0006
  Rule: Request middleware emits useful operational metadata

    @minimum_assessment
    Scenario: Log relevant information for one completed GraphQL request
      Given the API receives a GraphQL request
      When the request completes
      Then standard output contains a request record with its method, path, status, and duration

    Scenario: Log the accepted bounded structured metadata
      Given the API receives a GraphQL request
      When the request completes
      Then standard output contains one structured request record
      And the record includes a request ID, method, path, safely available operation name, status, duration, and error count

  @SPEC-014 @repository_baseline @mandatory @NFR-001 @NFR-003 @ADR-0001 @ADR-0002 @ADR-0003 @ADR-0006 @ADR-0007 @ADR-0009
  Rule: The delivered applications use the prescribed technology baseline

    @minimum_assessment
    Scenario: Use the required frontend technologies
      Given the frontend application has been implemented
      When its authoritative manifests, source, and production build are inspected
      Then it uses React major version 18, GraphQL, React Router DOM, and Tailwind CSS

    @minimum_assessment
    Scenario: Use the required backend technologies
      Given the backend application has been implemented
      When its authoritative manifests, source, configuration, and integration behavior are inspected
      Then it uses Express, GraphQL, Sequelize, PostgreSQL, and Redis

  @SPEC-015 @repository_baseline @mandatory @DEL-001 @NFR-006 @AC-012 @ADR-0001
  Rule: Reviewers can access the source repository

    @minimum_assessment
    Scenario: Deliver the source with meaningful Git evidence
      Given the project is ready for delivery
      When a reviewer opens the documented public repository
      Then the complete source is accessible
      And the Git history demonstrates appropriate version-control usage

  @SPEC-016 @repository_baseline @mandatory @DEL-002 @AC-012 @ADR-0003 @ADR-0008 @ADR-0012 @DG-002
  Rule: Reviewers can understand the implemented data model

    @minimum_assessment
    Scenario: Deliver an ERD derived from migration state
      Given the application migrations have been implemented
      When a reviewer compares the entity-relationship diagram with a freshly migrated database
      Then the ERD describes the implemented tables, keys, constraints, and relationships

  @SPEC-017 @repository_baseline @mandatory @DEL-003 @AC-012 @ADR-0001 @ADR-0006 @ADR-0008
  Rule: Reviewers can run and use the application from documentation

    @minimum_assessment
    Scenario: Follow the documented setup and API workflow
      Given the project is ready for delivery
      When a reviewer follows the documented prerequisites, configuration, installation, infrastructure, migration, import, development, test, build, and GraphQL usage instructions
      Then every documented command maps to an authoritative executable repository command
      And the reviewer can run the application and exercise all four GraphQL use cases
