import { afterEach, describe, expect, test } from 'bun:test'
import { Database } from 'bun:sqlite'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

// The environment override permits replay against the preserved initial snapshot.
const source = process.env.PROJECT_HUB_APP ?? new URL('../../examples/project-hub/src/app.ts', import.meta.url).href
const { createApp } = await import(source)
const cleanups: (() => void)[] = []
const password = 'Example-passphrase-42!'
let sequence = 0

afterEach(() => {
  for (const cleanup of cleanups.splice(0).reverse()) cleanup()
})

function fixture() {
  const directory = mkdtempSync(join(tmpdir(), 'project-hub-eval-'))
  const dbPath = join(directory, 'evaluation.sqlite')
  let time = Date.UTC(2026, 8, 8)
  const logs: unknown[] = []
  const instances: { app: any; close: () => void }[] = []
  const open = () => {
    const instance = createApp({ dbPath, now: () => time, logger: (record: unknown) => logs.push(record) })
    instances.push(instance)
    return instance
  }
  let service = open()
  cleanups.push(() => {
    for (const instance of instances) instance.close()
    rmSync(directory, { recursive: true, force: true })
  })
  return {
    dbPath,
    logs,
    get app() { return service.app },
    advance(ms: number) { time += ms },
    reopen() {
      instances.pop()!.close()
      service = open()
    },
  }
}

async function request(f: ReturnType<typeof fixture>, path: string, options: {
  method?: string; token?: string; body?: unknown; raw?: string; headers?: Record<string, string>
} = {}) {
  const headers: Record<string, string> = { ...options.headers }
  if (options.token) headers.Authorization = `Bearer ${options.token}`
  if (options.body !== undefined || options.raw !== undefined) headers['Content-Type'] = 'application/json'
  const response = await f.app.request(path, {
    method: options.method ?? 'GET', headers,
    body: options.raw ?? (options.body === undefined ? undefined : JSON.stringify(options.body)),
  })
  const text = await response.text()
  let body: any
  try { body = text ? JSON.parse(text) : undefined } catch { body = text }
  return { status: response.status, body, response }
}

function status(result: Awaited<ReturnType<typeof request>>, expected: number) {
  expect(result.status, JSON.stringify(result.body)).toBe(expected)
  return result.body?.data
}

async function user(f: ReturnType<typeof fixture>, label = 'user') {
  const email = `${label}-${++sequence}@example.test`
  const result = await request(f, '/auth/register', {
    method: 'POST', body: { email, displayName: label, password },
  })
  expect([200, 201], JSON.stringify(result.body)).toContain(result.status)
  expect(result.body.data.token).toBeString()
  return { ...result.body.data.user, token: result.body.data.token, email }
}

async function project(f: ReturnType<typeof fixture>, owner: any, name = 'Evaluation project') {
  return status(await request(f, '/projects', { method: 'POST', token: owner.token, body: { name } }), 201)
}

async function addMember(f: ReturnType<typeof fixture>, p: any, owner: any, member: any) {
  const result = await request(f, `/projects/${p.id}/members`, {
    method: 'POST', token: owner.token, body: { userId: member.id },
  })
  expect([200, 201, 204], JSON.stringify(result.body)).toContain(result.status)
}

async function task(f: ReturnType<typeof fixture>, p: any, creator: any, assignee?: any) {
  return status(await request(f, `/projects/${p.id}/tasks`, {
    method: 'POST', token: creator.token,
    body: { title: 'Verify a real workflow', ...(assignee ? { assigneeId: assignee.id } : {}) },
  }), 201)
}

async function list(f: ReturnType<typeof fixture>, path: string, actor: any) {
  const result = await request(f, path, { token: actor.token })
  status(result, 200)
  expect(result.body.data).toBeArray()
  expect(result.body.page).toBeObject()
  return result.body
}

describe('independent Project Hub acceptance', () => {
  test('identity normalization, session revocation and expiration are enforced', async () => {
    const f = fixture()
    const alice = await user(f, 'alice')
    status(await request(f, '/auth/login', { method: 'POST', body: { email: alice.email, password: 'wrong-password-42' } }), 401)
    const login = status(await request(f, '/auth/login', {
      method: 'POST', body: { email: ` ${alice.email.toUpperCase()} `, password },
    }), 200)
    expect(login.user.id).toBe(alice.id)
    const duplicate = await request(f, '/auth/register', {
      method: 'POST', body: { email: alice.email.toUpperCase(), displayName: 'duplicate', password },
    })
    status(duplicate, 409)
    const me = status(await request(f, '/auth/me', { token: alice.token }), 200)
    expect(me.id).toBe(alice.id)
    expect(JSON.stringify(me)).not.toMatch(/password|tokenHash|passwordHash/i)
    status(await request(f, '/auth/me', { token: 'forged-token', headers: { 'X-User-Id': alice.id } }), 401)
    const logout = await request(f, '/auth/logout', { method: 'POST', token: alice.token })
    expect([200, 204]).toContain(logout.status)
    status(await request(f, '/auth/me', { token: alice.token }), 401)
    status(await request(f, '/auth/me', { token: login.token }), 200)
    f.advance(24 * 60 * 60 * 1000 + 1)
    status(await request(f, '/auth/me', { token: login.token }), 401)
  }, 15000)

  test('project ownership and nested task identity do not permit cross-project access', async () => {
    const f = fixture()
    const owner = await user(f, 'owner'), member = await user(f, 'member'), outsider = await user(f, 'outsider')
    const p = await project(f, owner), other = await project(f, owner, 'Other')
    await addMember(f, p, owner, member)
    const t = await task(f, p, member)
    expect((await list(f, '/projects', outsider)).data).toHaveLength(0)
    status(await request(f, `/projects/${p.id}`, { token: outsider.token }), 404)
    status(await request(f, `/projects/${p.id}`, { method: 'PATCH', token: member.token, body: { name: 'Hijack' } }), 403)
    const ownerRemoval = await request(f, `/projects/${p.id}/members/${owner.id}`, { method: 'DELETE', token: owner.token })
    expect([400, 403, 409, 422]).toContain(ownerRemoval.status)
    status(await request(f, `/projects/${other.id}/tasks/${t.id}`, { token: owner.token }), 404)
    status(await request(f, `/projects/${other.id}/tasks/${t.id}`, {
      method: 'PATCH', token: owner.token, body: { title: 'Wrong project', expectedVersion: t.version },
    }), 404)
    const badAssignee = await request(f, `/projects/${p.id}/tasks`, {
      method: 'POST', token: owner.token, body: { title: 'Invalid assignment', assigneeId: outsider.id },
    })
    expect([400, 403, 404, 409, 422]).toContain(badAssignee.status)
    expect((await list(f, `/projects/${p.id}/tasks`, owner)).data).toHaveLength(1)
  }, 15000)

  test('task transitions, stale retries and no-op updates preserve exact side effects', async () => {
    const f = fixture()
    const owner = await user(f, 'owner'), member = await user(f, 'member')
    const p = await project(f, owner)
    await addMember(f, p, owner, member)
    const t = await task(f, p, owner, member)
    const path = `/projects/${p.id}/tasks/${t.id}`
    const beforeActivity = (await list(f, `/projects/${p.id}/activity`, owner)).page.total
    const beforeNotices = (await list(f, '/notifications', member)).page.total
    expect(beforeNotices).toBe(1)
    status(await request(f, path, { method: 'PATCH', token: owner.token, body: { status: 'done', expectedVersion: 1 } }), 409)
    const changed = status(await request(f, path, { method: 'PATCH', token: owner.token, body: { status: 'doing', expectedVersion: 1 } }), 200)
    expect(changed.version).toBe(2)
    status(await request(f, path, { method: 'PATCH', token: owner.token, body: { status: 'doing', expectedVersion: 1 } }), 409)
    const noop = status(await request(f, path, { method: 'PATCH', token: owner.token, body: { status: 'doing', expectedVersion: 2 } }), 200)
    expect(noop.version).toBe(2)
    expect((await list(f, `/projects/${p.id}/activity`, owner)).page.total).toBe(beforeActivity + 1)
    expect((await list(f, '/notifications', member)).page.total).toBe(beforeNotices + 1)
    expect((await list(f, '/notifications', owner)).page.total).toBe(0)
  }, 15000)

  test('membership removal unassigns tasks and removes notification visibility', async () => {
    const f = fixture()
    const owner = await user(f, 'owner'), member = await user(f, 'member')
    const p = await project(f, owner)
    await addMember(f, p, owner, member)
    const t = await task(f, p, owner, member)
    const notices = await list(f, '/notifications', member)
    const noticeId = notices.data[0].id
    status(await request(f, `/notifications/${noticeId}/read`, { method: 'PATCH', token: owner.token }), 404)
    const read = await request(f, `/notifications/${noticeId}/read`, { method: 'PATCH', token: member.token })
    expect([200, 204]).toContain(read.status)
    const again = await request(f, `/notifications/${noticeId}/read`, { method: 'PATCH', token: member.token })
    expect([200, 204]).toContain(again.status)
    expect((await list(f, '/notifications?unread=true', member)).data).toHaveLength(0)
    const before = (await list(f, `/projects/${p.id}/activity`, owner)).page.total
    const removed = await request(f, `/projects/${p.id}/members/${member.id}`, { method: 'DELETE', token: owner.token })
    expect([200, 204]).toContain(removed.status)
    const updated = status(await request(f, `/projects/${p.id}/tasks/${t.id}`, { token: owner.token }), 200)
    expect(updated.assigneeId).toBeNull()
    expect(updated.version).toBe(t.version + 1)
    expect((await list(f, `/projects/${p.id}/activity`, owner)).page.total).toBe(before + 1)
    expect((await list(f, '/notifications', member)).data).toHaveLength(0)
    status(await request(f, `/notifications/${noticeId}/read`, { method: 'PATCH', token: member.token }), 404)
    status(await request(f, `/projects/${p.id}/activity`, { token: member.token }), 404)
  }, 15000)

  test('notification persistence failure rolls back the domain operation and activity', async () => {
    const f = fixture()
    const owner = await user(f, 'owner'), member = await user(f, 'member')
    const p = await project(f, owner)
    await addMember(f, p, owner, member)
    const t = await task(f, p, owner)
    const before = (await list(f, `/projects/${p.id}/activity`, owner)).page.total
    const db = new Database(f.dbPath)
    try {
      db.exec(`CREATE TRIGGER evaluation_notification_failure BEFORE INSERT ON notifications
        BEGIN SELECT RAISE(ABORT, 'independent failure injection'); END;`)
      const failed = await request(f, `/projects/${p.id}/tasks/${t.id}`, {
        method: 'PATCH', token: owner.token, body: { assigneeId: member.id, expectedVersion: 1 },
      })
      status(failed, 500)
      expect(JSON.stringify(failed.body)).not.toContain('independent failure injection')
      const unchanged = status(await request(f, `/projects/${p.id}/tasks/${t.id}`, { token: owner.token }), 200)
      expect(unchanged.assigneeId).toBeNull()
      expect(unchanged.version).toBe(1)
      expect((await list(f, `/projects/${p.id}/activity`, owner)).page.total).toBe(before)
      expect((await list(f, '/notifications', member)).data).toHaveLength(0)
      db.exec('DROP TRIGGER evaluation_notification_failure')
      status(await request(f, `/projects/${p.id}/tasks/${t.id}`, {
        method: 'PATCH', token: owner.token, body: { assigneeId: member.id, expectedVersion: 1 },
      }), 200)
    } finally { db.close() }
  }, 15000)

  test('SQLite state survives reopen and sessions do not authenticate another app', async () => {
    const f = fixture(), other = fixture()
    const owner = await user(f, 'owner'), member = await user(f, 'member')
    const p = await project(f, owner)
    await addMember(f, p, owner, member)
    const t = await task(f, p, owner, member)
    f.reopen()
    expect(status(await request(f, `/projects/${p.id}/tasks/${t.id}`, { token: owner.token }), 200).title).toBe(t.title)
    expect((await list(f, `/projects/${p.id}/activity`, owner)).page.total).toBe(3)
    expect((await list(f, '/notifications', member)).page.total).toBe(1)
    status(await request(other, '/auth/me', { token: owner.token }), 401)
    const deleted = await request(f, `/projects/${p.id}`, { method: 'DELETE', token: owner.token })
    expect([200, 204]).toContain(deleted.status)
    status(await request(f, `/projects/${p.id}/tasks/${t.id}`, { token: member.token }), 404)
    status(await request(f, `/projects/${p.id}/activity`, { token: owner.token }), 404)
    expect((await list(f, '/notifications', member)).data).toHaveLength(0)
    expect((await list(f, '/projects', owner)).data).toHaveLength(0)
  }, 15000)

  test('malformed requests get bounded, correlated errors without secret logging', async () => {
    const f = fixture()
    const owner = await user(f, 'owner')
    const requests = [
      request(f, '/missing?password=private-query-value', { token: owner.token, headers: { 'X-Request-Id': 'eval-request-42' } }),
      request(f, '/projects', { method: 'POST', token: owner.token, raw: '{broken' }),
      request(f, '/projects', { method: 'POST', token: owner.token, body: { name: 'Okay', ownerId: 'forged' } }),
      request(f, '/projects?limit=-1', { token: owner.token }),
      request(f, '/projects?offset=1.5', { token: owner.token }),
      request(f, '/projects', { method: 'POST', token: owner.token, body: { name: 'Large', description: 'x'.repeat(66000) } }),
      request(f, '/projects', { headers: { 'X-Request-Id': 'invalid request id' } }),
    ]
    const results = await Promise.all(requests)
    expect(results[0].status).toBe(404)
    expect(results[0].response.headers.get('X-Request-Id')).toBe('eval-request-42')
    expect(results[5].status).toBe(413)
    for (const result of results) {
      expect(result.status).toBeGreaterThanOrEqual(400)
      expect(result.status).toBeLessThan(500)
      const id = result.response.headers.get('X-Request-Id')
      expect(id).toMatch(/^[A-Za-z0-9_-]{1,64}$/)
      expect(result.body.error.requestId).toBe(id)
      expect(result.body.error.code).toBeString()
      expect(result.response.headers.get('X-Content-Type-Options')).toBe('nosniff')
    }
    const serialized = JSON.stringify(f.logs)
    expect(f.logs.length).toBeGreaterThan(0)
    for (const secret of [password, owner.token, 'private-query-value']) expect(serialized).not.toContain(secret)
  }, 15000)

  test('task filters and pagination remain project-scoped and deterministic', async () => {
    const f = fixture()
    const owner = await user(f, 'owner'), member = await user(f, 'member')
    const p = await project(f, owner)
    await addMember(f, p, owner, member)
    const a = await task(f, p, owner, member), b = await task(f, p, owner)
    await task(f, p, owner)
    status(await request(f, `/projects/${p.id}/tasks/${a.id}`, {
      method: 'PATCH', token: owner.token, body: { status: 'doing', expectedVersion: 1 },
    }), 200)
    const filtered = await list(f, `/projects/${p.id}/tasks?status=doing&assigneeId=${member.id}`, owner)
    expect(filtered.page.total).toBe(1)
    expect(filtered.data[0].id).toBe(a.id)
    const first = await list(f, `/projects/${p.id}/tasks?limit=1&offset=0`, owner)
    const second = await list(f, `/projects/${p.id}/tasks?limit=1&offset=1`, owner)
    expect(first.page).toEqual({ limit: 1, offset: 0, total: 3 })
    expect(first.data[0].id).not.toBe(second.data[0].id)
    expect((await list(f, `/projects/${p.id}/tasks?limit=1&offset=0`, owner)).data).toEqual(first.data)
    status(await request(f, `/projects/${p.id}/tasks/${b.id}`, { method: 'DELETE', token: member.token }), 403)
    expect((await list(f, `/projects/${p.id}/tasks`, owner)).page.total).toBe(3)
  }, 15000)

  test('combined assignment and status changes deduplicate recipients and exclude the actor', async () => {
    const f = fixture()
    const owner = await user(f, 'owner'), creator = await user(f, 'creator'), assignee = await user(f, 'assignee')
    const p = await project(f, owner)
    await addMember(f, p, owner, creator)
    await addMember(f, p, owner, assignee)
    const t = await task(f, p, creator, creator)
    expect((await list(f, '/notifications', creator)).page.total).toBe(0)
    status(await request(f, `/projects/${p.id}/tasks/${t.id}`, {
      method: 'PATCH', token: owner.token,
      body: { assigneeId: assignee.id, status: 'doing', expectedVersion: 1 },
    }), 200)
    expect((await list(f, '/notifications', creator)).page.total).toBe(1)
    expect((await list(f, '/notifications', assignee)).page.total).toBe(1)
    expect((await list(f, '/notifications', owner)).page.total).toBe(0)
    status(await request(f, `/projects/${p.id}/tasks/${t.id}`, {
      method: 'PATCH', token: assignee.token, body: { status: 'done', expectedVersion: 2 },
    }), 200)
    expect((await list(f, '/notifications', creator)).page.total).toBe(2)
    expect((await list(f, '/notifications', assignee)).page.total).toBe(1)
  }, 15000)

  test('same-version concurrent edits commit exactly one result', async () => {
    const f = fixture()
    const owner = await user(f, 'owner')
    const p = await project(f, owner), t = await task(f, p, owner)
    const before = (await list(f, `/projects/${p.id}/activity`, owner)).page.total
    const results = await Promise.all(['First writer', 'Second writer'].map(title =>
      request(f, `/projects/${p.id}/tasks/${t.id}`, {
        method: 'PATCH', token: owner.token, body: { title, expectedVersion: 1 },
      })))
    expect(results.map(r => r.status).sort()).toEqual([200, 409])
    const current = status(await request(f, `/projects/${p.id}/tasks/${t.id}`, { token: owner.token }), 200)
    expect(current.version).toBe(2)
    expect((await list(f, `/projects/${p.id}/activity`, owner)).page.total).toBe(before + 1)
  }, 15000)
})
