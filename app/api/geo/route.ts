import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

/**
 * Privacy-conscious soft geolocation.
 * Returns only a coarse audience hint ("nigeria" | "international") derived from
 * Vercel's edge country header. No IP is stored or returned. This NEVER forces a
 * redirect — it only lets the UI personalise the greeting.
 */
export async function GET() {
  const h = await headers()
  const country = (h.get('x-vercel-ip-country') || '').toUpperCase()

  // Unknown / local dev → no hint.
  if (!country) {
    return NextResponse.json({ audience: null }, { headers: { 'Cache-Control': 'no-store' } })
  }

  const audience = country === 'NG' ? 'nigeria' : 'international'
  return NextResponse.json(
    { audience },
    { headers: { 'Cache-Control': 'private, max-age=0, no-store' } },
  )
}
