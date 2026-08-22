# Requirements Specification

## Document role

This document normalizes the supplied [technical assessment](./FULL_STACK_TECHNICAL_ASSESSMENT.md) into stable requirement, deliverable, and acceptance IDs. It owns those IDs and their normalized wording; it does not select architecture or prove implementation. Use the repository [documentation map](../README.md#documentation-map), the [ADR index](./adrs/README.md), and the [implementation plan](./IMPLEMENTATION_PLAN.md) for downstream navigation.

If this specification conflicts with the source assessment, treat the mismatch as a documentation defect and reconcile it explicitly rather than silently changing the source classification.

## 1. Purpose

Define the requirements for a full stack application that allows users to search, view, and manage characters obtained from the public Rick and Morty API. The solution must include a web interface, an application GraphQL API, relational persistence, and search-result caching.

## 2. Scope

The solution includes:

- A responsive frontend application for listing, sorting, and viewing characters.
- A detail view with favorite management, plus the ability to add comments to characters.
- A backend API for searching and filtering characters.
- A relational database whose schema is managed through migrations and that is initialized with the required character data.
- A caching mechanism for searches.
- Technical and execution documentation.

Requirements marked as optional preserve the source assessment's classification and are not part of its minimum acceptance criteria. An accepted ADR or repository policy may adopt an optional requirement as a stricter repository delivery commitment. Such adoption does not relabel the source requirement and must be reported separately from minimum-assessment readiness. Current dispositions are recorded in the [ADR index](./adrs/README.md#optional-scope-decisions).

Requirements, ADRs, plans, examples, mocks, and stubs describe intent. They are not evidence that behavior has been implemented or that an acceptance criterion passes.

## 3. Frontend functional requirements

### FR-FE-001 - Character list

The system must display characters exposed by the application GraphQL API as cards. Each card must include:

- Name.
- Image.
- Species.

### FR-FE-002 - Sorting

Users must be able to sort characters alphabetically by name in both directions:

- Ascending: A-Z.
- Descending: Z-A.

### FR-FE-003 - Character details

When a card is selected, the system must display the character's details, including the character image.

### FR-FE-004 - Favorites

Users must be able to mark a character as a favorite from the detail view.

### FR-FE-005 - Comments

Users must be able to add comments to characters.

## 4. Backend functional requirements

### FR-BE-001 - Search API

The backend must expose a GraphQL API built with Express to support character searches.

### FR-BE-002 - Filters

The API must allow characters to be filtered by:

- Status.
- Species.
- Gender.
- Name.
- Origin.

### FR-BE-003 - Relational persistence

The API must connect to a relational database through Sequelize. The database structure must be configured through migrations and may use MySQL or PostgreSQL.

### FR-BE-004 - Initial data

The database must be initialized with 15 characters obtained from the public Rick and Morty API.

### FR-BE-005 - Search caching

The backend must use Redis to cache search results.

### FR-BE-006 - Request logging

The backend must include middleware that prints relevant information about each request to the console.

## 5. Technical and non-functional requirements

### NFR-001 - Frontend technologies

The frontend must be developed with:

- React 18.
- GraphQL.
- React Router DOM.
- Tailwind CSS.

### NFR-002 - Responsive design

The interface must adapt to different screen sizes and use CSS Flexbox and CSS Grid appropriately.

### NFR-003 - Backend technologies

The backend must use:

- Express.
- GraphQL.
- Sequelize.
- A MySQL or PostgreSQL database.
- Redis.

### NFR-004 - Code quality

The solution must provide structured, readable code with relevant comments.

### NFR-005 - Usability

The interface must provide a clear visual presentation and an appropriate user experience.

### NFR-006 - Version control

The project must demonstrate appropriate use of Git.

## 6. Optional requirements

This section preserves the optional classification from the source assessment. Accepted or deferred repository dispositions are maintained in the [ADR index](./adrs/README.md#optional-scope-decisions).

### OR-001 - TypeScript

Use TypeScript for frontend and/or backend development.

### OR-002 - Soft deletion

Implement soft deletion for characters.

### OR-003 - Interface filters

Allow users to search from the frontend by status, species, and gender.

### OR-004 - Frontend tests

Implement unit tests for at least three components or layouts.

### OR-005 - Scheduled updates

Create a scheduled job that runs every 12 hours to update the characters stored in the database.

### OR-006 - Query timing

Implement a method decorator that prints query execution times to the console.

### OR-007 - Backend tests

Implement unit tests for the character search query.

### OR-008 - Design patterns

Apply software design patterns to the solution.

### OR-009 - API documentation

Include Swagger documentation for consuming the API.

## 7. Required deliverables

### DEL-001 - Public source repository

Project source code must be delivered in a public GitHub repository.

### DEL-002 - Entity-relationship diagram

An entity-relationship diagram must describe the database.

### DEL-003 - Run and API usage documentation

Documentation must explain how to run the application and use the API; it may be included in the repository README or wiki.

## 8. Minimum acceptance criteria

These observable criteria summarize the minimum assessment outcomes. They do not replace or relax the mandatory functional, technical, non-functional, or delivery requirements above.

- [x] AC-001: The application lists characters as cards containing their name, image, and species.
- [x] AC-002: The list can be sorted by name from A-Z and Z-A.
- [x] AC-003: Selecting a card displays the character's details and image.
- [x] AC-004: A character can be marked as a favorite from the detail view.
- [x] AC-005: Comments can be added to a character.
- [x] AC-006: The interface is responsive and uses Flexbox and Grid.
- [x] AC-007: The backend exposes a GraphQL API through Express.
- [x] AC-008: The API filters characters by status, species, gender, name, and origin.
- [x] AC-009: A MySQL or PostgreSQL application schema is created through Sequelize migrations and initialized with 15 characters obtained from the public Rick and Morty API.
- [x] AC-010: Search results use Redis caching.
- [x] AC-011: Middleware writes relevant information about each request to the console.
- [ ] AC-012: DEL-001, DEL-002, and DEL-003 are delivered: the source code is available in a public GitHub repository together with an entity-relationship diagram and documentation explaining how to run the application and use the API. A post-closure independent review found DEL-003 incomplete and ADR-0006's development-only explorer composition missing; corrective workflow `TASK-014-20260822-02` is active.

## 9. Reference resources

- [Public API documentation](https://rickandmortyapi.com/documentation/)
- [Reference interface design](https://www.figma.com/file/SNp4G8hic6esedoQBH06fb/Playground?node-id=373-9599&t=xOfkHBsoghBLGQxP-0)
- [ORM documentation](https://sequelize.org/)

## 10. Source document

This specification was derived from [Full Stack Development Technical Assessment](./FULL_STACK_TECHNICAL_ASSESSMENT.md).
