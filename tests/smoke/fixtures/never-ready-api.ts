import { createServer } from "node:http";

const exitAfterGraphqlMode = "exit-after-graphql-response";
const fixtureMode = process.env["TASK010_SMOKE_API_FIXTURE_MODE"];

if (fixtureMode === exitAfterGraphqlMode) {
  const host = process.env["API_HOST"] ?? "127.0.0.1";
  const port = Number(process.env["API_PORT"] ?? "4174");
  const ownedOrigin = "http://127.0.0.1:4173";
  const characters = Array.from({ length: 15 }, (_unused, index) => {
    const id = index + 1;
    return {
      id: String(id),
      name: `TASK-010 Character ${String(id).padStart(2, "0")}`,
      imageUrl: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
      species: id % 2 === 0 ? "Alien" : "Human",
    };
  });
  let exitScheduled = false;

  const server = createServer((request, response) => {
    response.setHeader("connection", "close");
    response.setHeader("access-control-allow-origin", ownedOrigin);

    if (request.method === "OPTIONS") {
      response.writeHead(204, {
        "access-control-allow-headers": "content-type",
        "access-control-allow-methods": "POST, OPTIONS",
      });
      response.end();
      return;
    }

    if (request.method === "GET" && request.url === "/healthz") {
      response.writeHead(200, { "content-type": "application/json" });
      response.end('{"status":"ok"}');
      return;
    }

    if (request.method === "POST" && request.url === "/graphql") {
      response.writeHead(200, { "content-type": "application/json" });
      response.once("finish", () => {
        if (exitScheduled) {
          return;
        }

        exitScheduled = true;
        console.error(
          "TASK_010_INTENTIONAL_POST_READINESS_API_EXIT code=23",
        );
        process.exitCode = 23;
        server.close();
      });
      response.end(JSON.stringify({ data: { characters } }));
      return;
    }

    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  });

  server.listen(port, host, () => {
    console.log(
      `Post-readiness API exit fixture listening at http://${host}:${port}.`,
    );
  });
} else {
  console.log("Never-ready API fixture is waiting without binding a socket.");

  setInterval(() => {}, 60_000);
}
