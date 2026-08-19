import type { Metadata } from 'next'
import Image from 'next/image'
import { PageShell } from '@/components/page-shell'
import { InnerHero } from '@/components/inner-hero'
import { Cta } from '@/components/cta'
import { solutions } from '@/lib/site.config'

export const metadata: Metadata = { title: 'Solutions', description: 'Explore Zaradera personal, business, diaspora, and advisory financial solutions.' }
export default function SolutionsPage(){return <PageShell heroTone="dark"><InnerHero eyebrow="Our solutions" title="Financial support shaped around real lives and ambitions." description="Four focused pathways, connected by clear communication, responsible thinking, and human support."/><section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]"><div className="relative min-h-[28rem] overflow-hidden rounded-2xl lg:sticky lg:top-24"><Image src="/images/solutions-detail.png" alt="Zaradera financial solutions" fill className="object-cover" sizes="45vw"/></div><div className="space-y-5">{solutions.map((s,i)=><article id={s.id} key={s.id} className="rounded-2xl border bg-white p-7 sm:p-9"><span className="text-sm font-bold text-orange">0{i+1}</span><h2 className="mt-4 text-2xl font-bold">{s.title}</h2><p className="mt-3 font-medium">{s.summary}</p><p className="mt-3 leading-relaxed text-muted-foreground">{s.detail}</p><div className="mt-6"><Cta href={s.id==='diaspora'?'/diaspora#enquire':'/contact'} variant="outline">Start a conversation</Cta></div></article>)}</div></div></section></PageShell>}
