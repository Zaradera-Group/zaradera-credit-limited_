import { NextRequest, NextResponse } from 'next/server'
import { retryQueuedEnquiries } from '@/lib/enquiry-delivery'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    return NextResponse.json(await retryQueuedEnquiries())
  } catch (error) {
    console.error('Enquiry retry worker failed', error)
    return NextResponse.json({ error: 'Retry worker failed' }, { status: 500 })
  }
}
