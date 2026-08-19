'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, LoaderCircle } from 'lucide-react'
import { enquiryCategories, contactMethods } from '@/lib/site.config'

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('sending')
    setMessage('')
    const form = event.currentTarget
    const payload = Object.fromEntries(new FormData(form))
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'We could not send your enquiry.')
      form.reset()
      setState('sent')
    } catch (error) {
      setState('error')
      setMessage(error instanceof Error ? error.message : 'Please try again shortly.')
    }
  }

  if (state === 'sent') return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-sm" role="status">
      <CheckCircle2 className="mx-auto size-10 text-orange" />
      <h2 className="mt-4 text-2xl font-bold">Thank you. We have your enquiry.</h2>
      <p className="mt-2 text-muted-foreground">A member of the Zaradera team will respond using your preferred contact method.</p>
      <button className="mt-6 text-sm font-semibold text-orange" onClick={() => setState('idle')}>Send another enquiry</button>
    </div>
  )

  const field = 'mt-2 min-h-12 w-full rounded-lg border border-input bg-white px-4 py-3 text-sm outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/15'
  return (
    <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-[0_24px_70px_-40px_rgba(6,2,67,.35)] sm:p-8">
      <div className={compact ? 'grid gap-5' : 'grid gap-5 sm:grid-cols-2'}>
        <label className="text-sm font-semibold">Full name<input className={field} name="name" autoComplete="name" required maxLength={100} /></label>
        <label className="text-sm font-semibold">Email address<input className={field} name="email" type="email" autoComplete="email" required maxLength={160} /></label>
        <label className="text-sm font-semibold">Phone / WhatsApp<input className={field} name="phone" autoComplete="tel" maxLength={40} /></label>
        <label className="text-sm font-semibold">Country of residence<input className={field} name="country" autoComplete="country-name" required maxLength={80} /></label>
        <label className="text-sm font-semibold">Enquiry type<select className={field} name="category" required defaultValue=""><option value="" disabled>Select one</option>{enquiryCategories.map(x => <option key={x}>{x}</option>)}</select></label>
        <label className="text-sm font-semibold">Preferred contact<select className={field} name="contactMethod" required defaultValue="Email">{contactMethods.map(x => <option key={x}>{x}</option>)}</select></label>
        <label className="text-sm font-semibold sm:col-span-2">How can we help?<textarea className={`${field} min-h-32 resize-y`} name="message" required minLength={10} maxLength={3000} /></label>
      </div>
      <label className="absolute -left-[10000px]" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="mt-5 flex items-start gap-3 text-sm text-muted-foreground"><input className="mt-1 size-4 accent-orange" type="checkbox" name="consent" value="yes" required /><span>I consent to Zaradera using these details to respond to my enquiry. See our <a className="text-orange underline" href="/privacy">Privacy Policy</a>.</span></label>
      {state === 'error' && <p className="mt-4 text-sm text-red-700" role="alert">{message}</p>}
      <button disabled={state === 'sending'} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange px-7 py-3 text-sm font-semibold text-white disabled:opacity-60">
        {state === 'sending' && <LoaderCircle className="size-4 animate-spin" />} {state === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  )
}
