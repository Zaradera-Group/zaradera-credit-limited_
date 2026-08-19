import type { Metadata } from 'next'
import { PageShell } from '@/components/page-shell'
import { InnerHero } from '@/components/inner-hero'
import { FaqList } from '@/components/faq-list'
export const metadata:Metadata={title:'Frequently Asked Questions',description:'Answers to common questions about Zaradera services, diaspora enquiries, privacy, and security.'}
export default function FaqPage(){return <PageShell heroTone="dark"><InnerHero eyebrow="Frequently asked questions" title="Useful answers, in plain language." description="Explore common questions about our services and how to find the right next step."/><div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><FaqList/></div></PageShell>}
