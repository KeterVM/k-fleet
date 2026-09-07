import { createApp } from './app';
const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be 1–65535');
const instance = createApp({ dbPath: process.env.DB_PATH ?? 'project-hub.sqlite', logger: record => console.log(JSON.stringify(record)) });
const server = Bun.serve({ hostname: process.env.HOST ?? '127.0.0.1', port, fetch: instance.app.fetch, maxRequestBodySize: Number.MAX_SAFE_INTEGER });
console.log(`Project Hub listening on ${server.url}`);
let stopping = false;
async function stop() {
  if (stopping) return;
  stopping = true;
  await server.stop(); instance.close();
}
process.once('SIGINT', stop);
process.once('SIGTERM', stop);
