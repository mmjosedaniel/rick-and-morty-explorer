import express from "express";

export function createApp() {
  const app = express();

  app.get("/healthz", (_request, response) => {
    response.status(200).json({ status: "ok" });
  });

  return app;
}
