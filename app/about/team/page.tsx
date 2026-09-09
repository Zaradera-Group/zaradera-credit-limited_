import type { Metadata } from 'next'
import { PageShell } from '@/components/page-shell'
import { InnerHero } from '@/components/inner-hero'
import { TeamSwiper } from '@/components/team-swiper'

export const metadata: Metadata = { title: 'Our Team', description: 'Meet the people guiding Zaradera Credit Limited and its commitment to responsible finance.' }
export default function TeamPage() { return <PageShell heroTone="dark"><InnerHero eyebrow="Our team" title="People building clearer financial pathways." description="Our work is led by people who value sound judgment, responsible relationships, and straightforward communication." /><div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><TeamSwiper /></div></PageShell> }
