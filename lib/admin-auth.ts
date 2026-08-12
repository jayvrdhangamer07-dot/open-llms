import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'photo_admin_session'
const SESSION_TTL = 60 * 60 * 24 * 7

function signature(value: string) {
  return createHmac('sha256', process.env.ADMIN_PASSWORD || 'missing').update(value).digest('hex')
}

export function createSession() {
  const payload = `${Date.now() + SESSION_TTL * 1000}`
  return `${payload}.${signature(payload)}`
}

export function isValidSession(value?: string) {
  if (!value) return false
  const [expires, received] = value.split('.')
  if (!expires || !received || Number(expires) < Date.now()) return false
  const expected = signature(expires)
  return received.length === expected.length && timingSafeEqual(Buffer.from(received), Buffer.from(expected))
}

export async function isAdmin() {
  const store = await cookies()
  return isValidSession(store.get(COOKIE_NAME)?.value)
}

export { COOKIE_NAME, SESSION_TTL }
