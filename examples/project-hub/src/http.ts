import type { Context } from 'hono';
export class ApiError extends Error {
  constructor(public status: 400 | 401 | 403 | 404 | 409 | 413 | 415 | 429, public code: string, message: string) { super(message); }
}
export function fail(status: ApiError['status'], code: string, message: string): never { throw new ApiError(status, code, message); }
export function identifier(value: unknown): string {
  if (typeof value !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value)) fail(400, 'INVALID_ID', 'Invalid identifier');
  return value;
}
export function string(value: unknown, field: string, max: number, min = 0, trim = true): string {
  if (typeof value !== 'string') fail(400, 'INVALID_INPUT', `${field} must be a string`);
  const result = trim ? value.trim() : value;
  if (result.length < min || result.length > max) fail(400, 'INVALID_INPUT', `${field} has invalid length`);
  return result;
}
export function email(value: unknown) {
  const result = string(value, 'email', 254, 3).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result)) fail(400, 'INVALID_INPUT', 'Invalid email');
  return result;
}
export async function body(c: Context, allowed: string[]): Promise<Record<string, unknown>> {
  if (!/^application\/json(?:\s*;|$)/i.test(c.req.header('content-type') ?? '')) fail(415, 'JSON_REQUIRED', 'Use application/json');
  const reader = c.req.raw.body?.getReader();
  const chunks: Uint8Array[] = []; let size = 0;
  if (reader) {
    try {
      while (true) {
        const { done, value } = await reader.read(); if (done) break;
        size += value.length;
        if (size > 65536) { void reader.cancel(); fail(413, 'BODY_TOO_LARGE', 'Body exceeds 64 KiB'); }
        chunks.push(value);
      }
    } finally { reader.releaseLock(); }
  }
  let result: unknown;
  try { result = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { fail(400, 'INVALID_JSON', 'Malformed JSON'); }
  if (!result || typeof result !== 'object' || Array.isArray(result)) fail(400, 'INVALID_INPUT', 'Expected a JSON object');
  if (Object.keys(result).some(key => !allowed.includes(key))) fail(400, 'UNKNOWN_FIELD', 'Unknown write field');
  return result as Record<string, unknown>;
}
export function page(c: Context) {
  function number(key: string, fallback: number, max: number, min: number) {
    const values = c.req.queries(key);
    if (!values) return fallback;
    if (values.length !== 1 || !/^\d+$/.test(values[0])) fail(400, 'INVALID_PAGE', 'Invalid pagination');
    const value = Number(values[0]);
    if (!Number.isSafeInteger(value) || value < min || value > max) fail(400, 'INVALID_PAGE', 'Invalid pagination');
    return value;
  }
  return { limit: number('limit', 20, 100, 1), offset: number('offset', 0, Number.MAX_SAFE_INTEGER, 0) };
}
export function status(value: unknown): 'todo' | 'doing' | 'done' {
  if (value !== 'todo' && value !== 'doing' && value !== 'done') fail(400, 'INVALID_INPUT', 'Invalid status');
  return value;
}
