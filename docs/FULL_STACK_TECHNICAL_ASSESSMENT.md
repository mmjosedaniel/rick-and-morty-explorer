# Full Stack Development Technical Assessment

## Objective

Evaluate the candidate's skills in developing full stack applications using frontend and backend technologies such as React 18, GraphQL, Express, relational databases, cache management, and unit testing.

## Description

The candidate will develop a full stack application that allows users to search for characters from the *Rick and Morty* series using the public Rick and Morty API. The application should include a user interface for viewing and managing characters, along with a backend that handles queries and caching.

## Frontend requirements

- Create a frontend application using React 18, GraphQL, and React Router DOM.
- List the characters from the API in cards showing their name, image, and species.
- Implement character sorting by name (A-Z and Z-A).
- Display each character's details when a card is selected, including the image and an option to mark the character as a favorite.
- Allow users to add comments to characters.
- Make the application responsive and use CSS Flexbox and CSS Grid appropriately.
- Use Tailwind CSS for styling.

### Optional frontend requirements

- Use TypeScript for project development.
- Implement soft deletion for characters.
- Implement search filters for status, species, and gender.
- Implement unit tests for at least three components or layouts.

## Backend requirements

- Create an API using Express and GraphQL to support character searches.
- Implement queries that allow characters to be filtered by status, species, gender, name, and origin.
- Connect the API to a relational database through Sequelize and configure it using migrations. MySQL or PostgreSQL may be used.
- Connect to Redis to cache search results.
- Initialize the relational database with 15 characters from the public API.
- Implement middleware that prints relevant information about each request to the console.

### Optional backend requirements

- Create a scheduled job that runs every 12 hours to update the characters in the database.
- Implement a method decorator that prints query execution times to the console.
- Implement unit tests for the character search query.
- Use TypeScript for project development.
- Apply software design patterns.

## Deliverables

- Project source code in a public GitHub repository.
- An entity-relationship diagram (ERD) for the database.
- Documentation explaining how to run the application and use the API. This may be included in the repository's README or wiki.
- Optionally, Swagger documentation describing how to consume the API.

## Evaluation criteria

- Compliance with the requirements.
- Appropriate use of the specified technologies.
- Code quality, including structure, readability, and comments.
- Visual appearance and usability of the application.
- Proper Git usage.

## Resources

- [Public character API documentation](https://rickandmortyapi.com/documentation/)
- [Reference interface design](https://www.figma.com/file/SNp4G8hic6esedoQBH06fb/Playground?node-id=373-9599&t=xOfkHBsoghBLGQxP-0)
- [ORM documentation](https://sequelize.org/)

## Repository navigation

This document preserves the supplied assessment contract. This editorial navigation section does not change its scope or optional classification. Start from the repository [documentation map](../README.md#documentation-map), and use the [requirements specification](./REQUIREMENTS.md) for stable requirement, deliverable, and acceptance IDs.
