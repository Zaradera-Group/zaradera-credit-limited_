import { NextRequest, NextResponse } from 'next/server'
import { contactMethods, enquiryCategories, loanProducts, loanTenures, supportedCurrencies } from '@/lib/site.config'
import { queueEnquiry, sendEnquiryEmail } from '@/lib/enquiry-delivery'

export const runtime = 'nodejs'

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
    whatsapp: text(body.whatsapp, 40),
    country: text(body.country, 80), category: text(body.category, 80),
    contactMethod: text(body.contactMethod, 20), message: text(body.message, 3000),
    loanProduct: text(body.loanProduct, 80), tenure: text(body.tenure, 40),
    currency: text(body.currency, 8), amount: text(body.amount, 30),
  }
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  const numericAmount = data.amount.replace(/,/g, '')
  if (!data.name || !validEmail || !data.country || !data.message || data.message.length < 10 ||
      !enquiryCategories.includes(data.category as never) || !contactMethods.includes(data.contactMethod as never) || body.consent !== 'yes') {
    return NextResponse.json({ error: 'Please check the required fields and try again.' }, { status: 400 })
  }
  if ((data.loanProduct && !loanProducts.includes(data.loanProduct as never)) ||
      (data.tenure && !loanTenures.includes(data.tenure as never)) ||
      (data.currency && !supportedCurrencies.includes(data.currency as never)) ||
      (data.amount && !data.currency) ||
      (data.amount && (!/^\d+(\.\d{1,2})?$/.test(numericAmount) || Number(numericAmount) <= 0))) {
    return NextResponse.json({ error: 'Please check the financing details and try again.' }, { status: 400 })
  }

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
