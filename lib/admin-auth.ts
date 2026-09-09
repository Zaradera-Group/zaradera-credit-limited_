import 'server-only'
import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const COOKIE = 'zaradera_admin'
function signature(value: string) { const secret = process.env.ADMIN_SESSION_SECRET; if (!secret) return ''; return createHmac('sha256', secret).update(value).digest('hex') }
export function verifyPassword(password: string) { const configured = process.env.ADMIN_PASSWORD_SCRYPT; if (!configured) return false; const [salt, expected] = configured.split(':'); if (!salt || !expected) return false; const actual = scryptSync(password, salt, 64); const target = Buffer.from(expected, 'hex'); return target.length === actual.length && timingSafeEqual(target, actual) }
export async function createAdminSession() { const value = `${Date.now() + 1000 * 60 * 60 * 8}`; (await cookies()).set(COOKIE, `${value}.${signature(value)}`, { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 8 }) }
export async function isAdmin() { const raw = (await cookies()).get(COOKIE)?.value; if (!raw) return false; const [expiry, sig] = raw.split('.'); const valid = sig && signature(expiry); return Boolean(valid && Number(expiry) > Date.now() && timingSafeEqual(Buffer.from(sig), Buffer.from(valid))) }
export async function requireAdmin() { if (!(await isAdmin())) redirect('/admin/login') }
export async function clearAdminSession() { (await cookies()).delete(COOKIE) }
