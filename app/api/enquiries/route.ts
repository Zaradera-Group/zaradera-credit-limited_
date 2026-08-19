import { NextRequest, NextResponse } from 'next/server'
import { contactMethods, enquiryCategories } from '@/lib/site.config'

const attempts = new Map<string, { count: number; reset: number }>()

function text(value: unknown, max: number) { return typeof value === 'string' ? value.trim().slice(0, max) : '' }

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const rate = attempts.get(ip)
  if (rate && rate.reset > now && rate.count >= 5) return NextResponse.json({ error: 'Too many enquiries. Please try again later.' }, { status: 429 })
  attempts.set(ip, !rate || rate.reset <= now ? { count: 1, reset: now + 15 * 60_000 } : { ...rate, count: rate.count + 1 })

  let body: Record<string, unknown>
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  if (text(body.website, 200)) return NextResponse.json({ ok: true })

  const data = {
    name: text(body.name, 100), email: text(body.email, 160), phone: text(body.phone, 40),
    country: text(body.country, 80), category: text(body.category, 80),
    contactMethod: text(body.contactMethod, 20), message: text(body.message, 3000),
  }
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  if (!data.name || !validEmail || !data.country || !data.message || data.message.length < 10 ||
      !enquiryCategories.includes(data.category as never) || !contactMethods.includes(data.contactMethod as never) || body.consent !== 'yes') {
    return NextResponse.json({ error: 'Please check the required fields and try again.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const destination = process.env.COMPANY_EMAIL
  const from = process.env.ENQUIRY_FROM_EMAIL
  if (!apiKey || !destination || !from) {
    console.warn('Enquiry email is not configured.')
    return NextResponse.json({ error: 'Enquiries are temporarily unavailable. Please email us directly.' }, { status: 503 })
  }
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [destination], reply_to: data.email, subject: `Website enquiry: ${data.category}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nCountry: ${data.country}\nPreferred contact: ${data.contactMethod}\n\n${data.message}` }),
  })
  if (!response.ok) return NextResponse.json({ error: 'We could not send your enquiry. Please email us directly.' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
