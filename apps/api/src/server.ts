import { createApp } from "./app.js";
import { parseApiHost, parseApiPort } from "./config.js";

const host = parseApiHost(process.env.API_HOST);
const port = parseApiPort(process.env.API_PORT);

createApp().listen(port, host, () => {
  console.log(`API server listening at http://${host}:${port}`);
});
