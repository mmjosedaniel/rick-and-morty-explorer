import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import type { CharacterReadService } from "./application/characters/character-read-service.js";
import { createGraphqlHandler } from "./transport/graphql/graphql-handler.js";
import {
  createRequestLogMiddleware,
  getRequestLogMetadata,
  type RequestLoggingDependencies,
} from "./transport/http/request-log-middleware.js";

interface AppOptions {
  readonly characterReadService: CharacterReadService;
  readonly enableGraphiql?: boolean;
  readonly requestLogging?: RequestLoggingDependencies;
}

export function createApp(options?: AppOptions) {
  const app = express();

  if (options?.requestLogging !== undefined) {
    app.use(createRequestLogMiddleware(options.requestLogging));
  }

  app.get("/healthz", (_request, response) => {
    response.status(200).json({ status: "ok" });
  });

  if (options !== undefined) {
    const graphqlHandler = createGraphqlHandler({
      characterReadService: options.characterReadService,
      enableGraphiql: options.enableGraphiql ?? false,
    });

    app.use(
      "/graphql",
      (_request: Request, response: Response, next: NextFunction) => {
        response.type("application/json");
        next();
      },
      (request: Request, response: Response) => {
        const requestLogMetadata = getRequestLogMetadata(response);

        return graphqlHandler.handle(
          request,
          response,
          requestLogMetadata === undefined ? {} : { requestLogMetadata },
        );
      },
    );
  }

  return app;
}
