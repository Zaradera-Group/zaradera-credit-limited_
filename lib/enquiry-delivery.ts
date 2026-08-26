import 'server-only'

import { createCipheriv, createDecipheriv, randomBytes, randomUUID } from 'node:crypto'
import postgres from 'postgres'

export type EnquiryEmail = { subject: string; text: string; replyTo: string }

function database() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is not configured')
  return postgres(url, { max: 2, prepare: false })
}

function encryptionKey() {
  const configured = process.env.ENQUIRY_QUEUE_KEY
  if (!configured) throw new Error('ENQUIRY_QUEUE_KEY is not configured')
  const key = /^[a-f\d]{64}$/i.test(configured)
    ? Buffer.from(configured, 'hex')
    : Buffer.from(configured, 'base64')
  if (key.length !== 32) throw new Error('ENQUIRY_QUEUE_KEY must decode to exactly 32 bytes')
  return key
}

function encrypt(payload: EnquiryEmail) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', encryptionKey(), iv)
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload), 'utf8'), cipher.final()])
  return [iv, cipher.getAuthTag(), encrypted].map((part) => part.toString('base64')).join('.')
}

function decrypt(value: string): EnquiryEmail {
  const [iv, tag, encrypted] = value.split('.').map((part) => Buffer.from(part, 'base64'))
  const decipher = createDecipheriv('aes-256-gcm', encryptionKey(), iv)
  decipher.setAuthTag(tag)
  return JSON.parse(Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8'))
}

export async function sendEnquiryEmail(email: EnquiryEmail) {
  const apiKey = process.env.RESEND_API_KEY
  const destination = process.env.COMPANY_EMAIL
  const from = process.env.ENQUIRY_FROM_EMAIL
  if (!apiKey || !destination || !from) throw new Error('Email delivery is not configured')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [destination], reply_to: email.replyTo, subject: email.subject, text: email.text }),
  })
  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(`Resend rejected the message (${response.status}): ${detail.slice(0, 300)}`)
  }
}

export async function queueEnquiry(email: EnquiryEmail, reason: unknown) {
  const sql = database()
  try {
    await sql`
      insert into enquiry_email_queue
        (id, encrypted_payload, status, attempts, next_attempt_at, last_error)
      values
        (${randomUUID()}, ${encrypt(email)}, 'pending', 1, now() + interval '5 minutes', ${String(reason).slice(0, 500)})
    `
  } finally {
    await sql.end()
  }
}

const retryMinutes = [5, 30, 120, 720, 1440, 1440, 1440, 1440, 1440, 1440]

export async function retryQueuedEnquiries() {
  const sql = database()
  let delivered = 0
  let failed = 0
  try {
    const jobs = await sql<{ id: string; encrypted_payload: string; attempts: number }[]>`
      update enquiry_email_queue
      set status = 'processing', updated_at = now()
      where id in (
        select id from enquiry_email_queue
        where status = 'pending' and next_attempt_at <= now()
        order by next_attempt_at asc
        limit 10
        for update skip locked
      )
      returning id, encrypted_payload, attempts
    `

    for (const job of jobs) {
      try {
        await sendEnquiryEmail(decrypt(job.encrypted_payload))
        await sql`update enquiry_email_queue set status = 'sent', sent_at = now(), updated_at = now(), last_error = null where id = ${job.id}`
        delivered++
      } catch (error) {
        const attempts = job.attempts + 1
        const terminal = attempts >= 10
        const minutes = retryMinutes[Math.min(attempts - 1, retryMinutes.length - 1)]
        await sql`
          update enquiry_email_queue
          set status = ${terminal ? 'failed' : 'pending'}, attempts = ${attempts},
              next_attempt_at = now() + (${minutes} * interval '1 minute'),
              last_error = ${String(error).slice(0, 500)}, updated_at = now()
          where id = ${job.id}
        `
        failed++
      }
    }
    return { processed: jobs.length, delivered, failed }
  } finally {
    await sql.end()
  }
}
