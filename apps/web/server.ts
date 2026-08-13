import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const host = "127.0.0.1";
const port = 4173;
const webRoot = resolve(fileURLToPath(new URL("../dist/", import.meta.url)));

const contentTypes: Readonly<Record<string, string>> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

async function resolveRequestPath(pathname: string): Promise<string> {
  const requestedPath = resolve(webRoot, `.${pathname}`);
  const isInsideWebRoot =
    requestedPath === webRoot || requestedPath.startsWith(`${webRoot}${sep}`);

  if (isInsideWebRoot) {
    try {
      if ((await stat(requestedPath)).isFile()) {
        return requestedPath;
      }
    } catch {
      // Browser routes fall back to the application entry point.
    }
  }

  return resolve(webRoot, "index.html");
}

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url ?? "/", `http://${host}:${port}`).pathname;
  const filePath = await resolveRequestPath(pathname);
  const contentType = contentTypes[extname(filePath)] ?? "application/octet-stream";

  response.writeHead(200, { "Content-Type": contentType });
  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Web server listening at http://${host}:${port}`);
});
