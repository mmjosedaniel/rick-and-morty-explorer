import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import type { CharacterReadService } from "./application/characters/character-read-service.js";
import { createGraphqlHandler } from "./transport/graphql/graphql-handler.js";

interface AppOptions {
  readonly characterReadService: CharacterReadService;
  readonly enableGraphiql?: boolean;
}

export function createApp(options?: AppOptions) {
  const app = express();

  app.get("/healthz", (_request, response) => {
    response.status(200).json({ status: "ok" });
  });

  if (options !== undefined) {
    app.use(
      "/graphql",
      (_request: Request, response: Response, next: NextFunction) => {
        response.type("application/json");
        next();
      },
      createGraphqlHandler({
        characterReadService: options.characterReadService,
        enableGraphiql: options.enableGraphiql ?? false,
      }),
    );
  }

  return app;
}
