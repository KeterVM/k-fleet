import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const project = resolve(import.meta.dir, '../../examples/project-hub')
const directory = await mkdtemp(join(tmpdir(), 'project-hub-http-'))
// Reserve an OS-chosen loopback port, then pass it to the actual server entrypoint.
const reservation = Bun.serve({ hostname: '127.0.0.1', port: 0, fetch: () => new Response('reserved') })
const port = reservation.port
reservation.stop(true)
const server = Bun.spawn(['bun', 'run', 'start'], {
  cwd: project,
  env: { ...process.env, HOST: '127.0.0.1', PORT: String(port), DB_PATH: join(directory, 'http.sqlite') },
  stdout: 'pipe', stderr: 'pipe',
})
const stdout = new Response(server.stdout).text()
const stderr = new Response(server.stderr).text()
let failure: unknown
try {
  let response: Response | undefined
  for (let attempt = 0; attempt < 80; attempt++) {
    if (server.exitCode !== null) throw new Error(`server exited early: ${server.exitCode}`)
    try { response = await fetch(`http://127.0.0.1:${port}/health`); break } catch { await Bun.sleep(100) }
  }
  assert.ok(response, 'server did not become reachable')
  assert.equal(response.status, 200)
  assert.ok(response.headers.get('X-Request-Id'))
  const unauthorized = await fetch(`http://127.0.0.1:${port}/projects`)
  assert.equal(unauthorized.status, 401)
  assert.equal(unauthorized.headers.get('X-Content-Type-Options'), 'nosniff')
} catch (error) { failure = error }
finally {
  server.kill('SIGTERM')
  const exit = await Promise.race([server.exited, Bun.sleep(3000).then(() => 'timeout')])
  if (exit === 'timeout') {
    server.kill('SIGKILL')
    await server.exited
    failure ??= new Error('server did not terminate within three seconds')
  }
  const output = { stdout: await stdout, stderr: await stderr }
  console.log(JSON.stringify({ passed: !failure, port, exit, ...output }, null, 2))
  await rm(directory, { recursive: true, force: true })
}
if (failure) throw failure
