'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, LoaderCircle, WalletCards } from 'lucide-react'
import { enquiryCategories, contactMethods, loanProducts, loanTenures, supportedCurrencies } from '@/lib/site.config'

export function EnquiryForm({ compact = false, showLoanDetails = false }: { compact?: boolean; showLoanDetails?: boolean }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'queued' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [amount, setAmount] = useState('')

  function formatAmount(value: string) {
    const cleaned = value.replace(/,/g, '').replace(/[^\d.]/g, '')
    const [whole = '', ...decimalParts] = cleaned.split('.')
    const integer = whole.replace(/^0+(?=\d)/, '')
    const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const hasDecimal = cleaned.includes('.')
    const decimal = decimalParts.join('').slice(0, 2)
    return hasDecimal ? `${grouped}.${decimal}` : grouped
  }

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
      setAmount('')
      setState(result.queued ? 'queued' : 'sent')
    } catch (error) {
      setState('error')
      setMessage(error instanceof Error ? error.message : 'Please try again shortly.')
    }
  }

  if (state === 'sent' || state === 'queued') return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-sm" role="status">
      <CheckCircle2 className="mx-auto size-10 text-orange" />
      <h2 className="mt-4 text-2xl font-bold">Thank you. We have your enquiry.</h2>
      <p className="mt-2 text-muted-foreground">{state === 'queued' ? 'Your enquiry is safely queued and will be delivered automatically when our email service is available.' : 'A member of the Zaradera team will respond using your preferred contact method.'}</p>
      <button className="mt-6 text-sm font-semibold text-orange" onClick={() => setState('idle')}>Send another enquiry</button>
    </div>
  )

  const field = 'mt-2 min-h-12 w-full rounded-lg border border-input bg-white px-4 py-3 text-sm outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/15'
  return (
    <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-[0_24px_70px_-40px_rgba(6,2,67,.35)] sm:p-8">
      <div className={compact ? 'grid gap-5' : 'grid gap-5 sm:grid-cols-2'}>
        <label className="text-sm font-semibold">Full name<input className={field} name="name" autoComplete="name" required maxLength={100} /></label>
        <label className="text-sm font-semibold">Email address<input className={field} name="email" type="email" autoComplete="email" required maxLength={160} /></label>
        <label className="text-sm font-semibold">Phone number<input className={field} name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} /></label>
        <label className="text-sm font-semibold">WhatsApp number <span className="font-normal text-muted-foreground">(optional)</span><input className={field} name="whatsapp" type="tel" inputMode="tel" autoComplete="off" maxLength={40} /></label>
        <label className="text-sm font-semibold">Country of residence<input className={field} name="country" autoComplete="country-name" required maxLength={80} /></label>
        <label className="text-sm font-semibold">Enquiry type<select className={field} name="category" required defaultValue=""><option value="" disabled>Select one</option>{enquiryCategories.map(x => <option key={x}>{x}</option>)}</select></label>
        <label className="text-sm font-semibold">Preferred contact<select className={field} name="contactMethod" required defaultValue="Email">{contactMethods.map(x => <option key={x}>{x}</option>)}</select></label>
        {showLoanDetails && <fieldset className="rounded-2xl border border-navy/10 bg-navy/[0.035] p-5 sm:col-span-2 sm:p-6">
          <legend className="sr-only">Financing details</legend>
          <div className="mb-5">
            <div className="inline-flex items-center gap-2 font-display text-lg font-bold text-navy"><WalletCards className="size-5 text-orange" aria-hidden="true" />Financing details</div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Share what you have in mind so our team can better understand your enquiry.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold">Loan product<select className={field} name="loanProduct" defaultValue=""><option value="">Select a product</option>{loanProducts.map(x => <option key={x}>{x}</option>)}</select></label>
            <label className="text-sm font-semibold">Tenor<select className={field} name="tenure" defaultValue=""><option value="">Select a tenor</option>{loanTenures.map(x => <option key={x}>{x}</option>)}</select></label>
            <label className="text-sm font-semibold sm:col-span-2">Requested amount<div className="mt-2 flex overflow-hidden rounded-lg border border-input bg-white transition focus-within:border-orange focus-within:ring-2 focus-within:ring-orange/15"><select name="currency" aria-label="Currency" defaultValue="USD" required={Boolean(amount)} className="min-h-12 border-r border-input bg-muted/50 px-3 text-sm font-semibold outline-none">{supportedCurrencies.map(x => <option key={x}>{x}</option>)}</select><input className="min-h-12 min-w-0 flex-1 px-4 py-3 text-sm outline-none" name="amount" type="text" inputMode="decimal" autoComplete="off" value={amount} onChange={(event) => setAmount(formatAmount(event.target.value))} maxLength={24} placeholder="Enter an amount" /></div></label>
          </div>
        </fieldset>}
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
