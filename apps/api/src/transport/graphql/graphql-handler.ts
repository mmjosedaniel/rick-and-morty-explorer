import { getOperationAST } from "graphql";
import { createSchema, createYoga, type Plugin } from "graphql-yoga";

import type { CharacterReadService } from "../../application/characters/character-read-service.js";
import type { CharacterInteractionService } from "../../application/characters/character-interaction-service.js";
import type { RequestLogMetadata } from "../http/request-log-middleware.js";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./schema.js";

export interface GraphqlContext {
  readonly characterReadService: CharacterReadService;
  readonly characterInteractionService: CharacterInteractionService;
  readonly reportUnexpectedError: (error: unknown) => void;
}

interface GraphqlHandlerOptions extends GraphqlContext {
  readonly enableGraphiql: boolean;
}

interface GraphqlServerContext {
  readonly requestLogMetadata?: RequestLogMetadata;
}

const requestLogPlugin: Plugin<
  GraphqlContext & GraphqlServerContext,
  GraphqlServerContext,
  GraphqlContext
> = {
  onParse({ context }) {
    return ({ result }) => {
      if (result instanceof Error) {
        return;
      }

      const selectedOperation = getOperationAST(
        result,
        context.params.operationName,
      );
      if (context.requestLogMetadata !== undefined) {
        context.requestLogMetadata.operationName =
          selectedOperation?.name?.value ?? null;
      }
    };
  },
  onExecutionResult({ context, result }) {
    if (
      context.requestLogMetadata !== undefined &&
      result !== undefined &&
      !Array.isArray(result) &&
      "errors" in result &&
      Array.isArray(result.errors)
    ) {
      context.requestLogMetadata.errorCount = result.errors.length;
    }
  },
};

const browserOrigins = new Set([
  "http://127.0.0.1:5173",
  "http://127.0.0.1:4173",
]);

export function createGraphqlHandler({
  characterReadService,
  characterInteractionService,
  enableGraphiql,
  reportUnexpectedError,
}: GraphqlHandlerOptions) {
  return createYoga<GraphqlServerContext, GraphqlContext>({
    schema: createSchema<GraphqlContext>({ typeDefs, resolvers }),
    context: {
      characterReadService,
      characterInteractionService,
      reportUnexpectedError,
    },
    logging: false,
    graphqlEndpoint: "/graphql",
    graphiql: enableGraphiql,
    cors: (request) => {
      const origin = request.headers.get("origin");

      return origin !== null && browserOrigins.has(origin)
        ? { origin, credentials: false }
        : false;
    },
    plugins: [requestLogPlugin],
  });
}
