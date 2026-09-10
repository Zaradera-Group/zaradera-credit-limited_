import type { Metadata } from 'next'
import Image from 'next/image'
import { Globe2, MessageSquare, ShieldCheck } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { InnerHero } from '@/components/inner-hero'
import { EnquiryForm } from '@/components/enquiry-form'
import { Reveal } from '@/components/motion'

export const metadata: Metadata = { title: 'Diaspora Services', description: 'Start a private conversation with Zaradera about financial opportunities and support connected to Nigeria.' }

export default function DiasporaPage() {
  return <PageShell heroTone="dark">
    <InnerHero eyebrow="Diaspora services" title="Home stays within reach, wherever life takes you." description="A direct, considered route for individuals and businesses outside Nigeria exploring financial opportunities." />
    <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
      <Reveal className="relative min-h-96 overflow-hidden rounded-2xl"><Image src="/images/diaspora-lifestyle.png" alt="A professional connecting with Nigeria from abroad" fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" /></Reveal>
      <div className="flex flex-col justify-center"><p className="eyebrow text-orange">Finance across borders</p><h2 className="display-lg mt-4 font-bold">A conversation before a financial decision.</h2><p className="mt-6 leading-relaxed text-muted-foreground">Tell us what you are considering. Our team will review your enquiry, clarify what may be possible, and outline an appropriate next step.</p>
        <div className="mt-8 space-y-5">{[[Globe2,'Global perspective','Support designed for conversations that cross borders.'],[MessageSquare,'One clear point of contact','We reach out to continue the conversation.'],[ShieldCheck,'Data privacy','We protect your data in accordance with applicable GDPR requirements.']].map(([Icon,t,b]) => <div className="flex gap-4" key={String(t)}><Icon className="mt-1 size-5 shrink-0 text-orange"/><div><h3 className="font-bold">{String(t)}</h3><p className="mt-1 text-sm text-muted-foreground">{String(b)}</p></div></div>)}</div>
      </div>
    </section>
    <section id="enquire" className="bg-muted py-20 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.75fr_1.25fr] lg:px-8"><div><p className="eyebrow text-orange">Start here</p><h2 className="display-lg mt-4 font-bold">Tell us what you are working towards.</h2><p className="mt-5 leading-relaxed text-muted-foreground">This form is an enquiry, not an application or offer of credit. Please do not include any personal details, bank information, passwords, IDs, or identity-document numbers.</p></div><EnquiryForm showLoanDetails /></div></section>
  </PageShell>
}
