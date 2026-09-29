import { NextRequest, NextResponse } from 'next/server'
import { queueEnquiry, sendEnquiryEmail } from '@/lib/enquiry-delivery'
import { enquirySchema, validationMessage } from '@/lib/validation'

export const runtime = 'nodejs'

const attempts = new Map<string, { count: number; reset: number }>()

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const rate = attempts.get(ip)
  if (rate && rate.reset > now && rate.count >= 5) return NextResponse.json({ error: 'Too many enquiries. Please try again later.' }, { status: 429 })
  attempts.set(ip, !rate || rate.reset <= now ? { count: 1, reset: now + 15 * 60_000 } : { ...rate, count: rate.count + 1 })

  let body: unknown
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) }
  const parsed = enquirySchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: validationMessage(parsed.error) }, { status: 400 })
  if (parsed.data.website) return NextResponse.json({ ok: true })
  const data = parsed.data

  const email = {
    replyTo: data.email,
    subject: `Website enquiry: ${data.category}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nWhatsApp: ${data.whatsapp || 'Not provided'}\nCountry: ${data.country}\nPreferred contact: ${data.contactMethod}\n\nFinancing details\nLoan product: ${data.loanProduct || 'Not provided'}\nRequested amount: ${data.amount ? `${data.currency} ${data.amount}` : 'Not provided'}\nTenure: ${data.tenure || 'Not provided'}\n\nEnquiry\n${data.message}`,
  }
  try {
    await sendEnquiryEmail(email)
    return NextResponse.json({ ok: true, queued: false })
  } catch (deliveryError) {
    console.error('Immediate enquiry delivery failed; attempting to queue', deliveryError)
    try {
      await queueEnquiry(email, deliveryError)
      return NextResponse.json({ ok: true, queued: true }, { status: 202 })
    } catch (queueError) {
      console.error('Enquiry could not be delivered or queued', queueError)
      return NextResponse.json({ error: 'We could not safely save your enquiry. Please email or WhatsApp us directly.' }, { status: 503 })
    }
  }
}
