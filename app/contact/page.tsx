import type { Metadata } from 'next'
import { Mail, Phone } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { InnerHero } from '@/components/inner-hero'
import { EnquiryForm } from '@/components/enquiry-form'
import { siteConfig } from '@/lib/site.config'
export const metadata: Metadata={title:'Contact',description:'Contact Zaradera Credit Limited for general, business, partnership, and diaspora enquiries.'}
export default function ContactPage(){return <PageShell heroTone="dark"><InnerHero eyebrow="Contact" title="A clear conversation starts here." description="Whether you have a question, a partnership idea, or need help finding the right route, our team is ready to listen."/><section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[.7fr_1.3fr] lg:px-8 lg:py-28"><aside><h2 className="text-2xl font-bold">Contact details</h2><div className="mt-7 space-y-5"><a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-orange"><Mail className="size-5"/>{siteConfig.email}</a><a href={`tel:${siteConfig.phone.replace(/\s/g,'')}`} className="flex items-center gap-3 text-muted-foreground hover:text-orange"><Phone className="size-5"/>{siteConfig.phone}</a></div><p className="mt-8 text-sm leading-relaxed text-muted-foreground">For your security, never send passwords, PINs, card details, or identity-document numbers through this form.</p></aside><EnquiryForm/></section></PageShell>}
