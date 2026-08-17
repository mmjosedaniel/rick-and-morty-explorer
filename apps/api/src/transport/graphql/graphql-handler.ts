import { createSchema, createYoga } from "graphql-yoga";

import type { CharacterReadService } from "../../application/characters/character-read-service.js";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./schema.js";

export interface GraphqlContext {
  readonly characterReadService: CharacterReadService;
}

interface GraphqlHandlerOptions extends GraphqlContext {
  readonly enableGraphiql: boolean;
}

export function createGraphqlHandler({
  characterReadService,
  enableGraphiql,
}: GraphqlHandlerOptions) {
  return createYoga<{}, GraphqlContext>({
    schema: createSchema<GraphqlContext>({ typeDefs, resolvers }),
    context: { characterReadService },
    graphqlEndpoint: "/graphql",
    graphiql: enableGraphiql,
  });
}
