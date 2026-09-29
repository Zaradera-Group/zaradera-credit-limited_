import type { Metadata } from 'next'
import Image from 'next/image'
import { PageShell } from '@/components/page-shell'
import { Reveal, Stagger, StaggerItem, TextReveal } from '@/components/motion'

const title = 'Zara Rumuogba Savings and Loans Cooperative Society Limited (RS 35853)'

export const metadata: Metadata = {
  title,
  description: 'Discover Zara Rumuogba Savings and Loans Cooperative Society Limited (RS 35853), a member-owned financial cooperative supporting individuals, families, and small businesses.',
}

export default function CooperativePage() {
  return (
    <PageShell heroTone="dark">
      <section className="zar-dark relative overflow-hidden bg-navy-deep pb-20 pt-32 sm:pb-24 sm:pt-40 lg:pb-28">
        <div aria-hidden className="absolute -left-48 top-16 size-[34rem] rounded-full bg-orange/15 blur-[120px]" />
        <div aria-hidden className="absolute -right-40 -top-24 size-[42rem] rounded-full bg-[#3a3593]/45 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow text-orange">Cooperative Society</p>
          </Reveal>
          <h1 className="display-xl mt-6 max-w-5xl font-bold text-balance text-white">
            <TextReveal text={title} />
          </h1>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream py-20 lg:py-28">
        <div aria-hidden className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(242,76,33,.07),transparent_68%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-16 lg:px-8">
          <Reveal y={38} className="relative">
            <div aria-hidden className="absolute -inset-4 rounded-[2.25rem] border border-navy/10" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-navy/10 bg-white shadow-[0_35px_90px_-50px_rgba(6,2,67,.55)]">
              <Image src="/images/cooperative-community.png" alt="Members of a Nigerian cooperative reviewing a savings plan together" fill priority className="object-cover" sizes="(min-width: 1024px) 46vw, 100vw" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="display-lg font-bold text-balance text-navy">{title}</h2>
              <div className="mt-7 h-px w-28 bg-gradient-to-r from-orange to-transparent" />
            </Reveal>
            <Stagger className="mt-8 space-y-6 text-base leading-8 text-muted-foreground sm:text-lg">
              <StaggerItem as="p">Zara Rumuogba Savings and Loans Cooperative Limited owned by shareholders of Zaradera Credit Limited is a progressive, member-owned financial cooperative committed to empowering individuals, families, and small businesses with reliable, accessible, and sustainable financial services. Established on the values of cooperation, integrity, and shared prosperity, we serve as a trusted financial partner for those seeking stability, growth, and long-term economic wellbeing.</StaggerItem>
              <StaggerItem as="p">As a cooperative, our strength lies in our people. Every member is both a stakeholder and a beneficiary, ensuring that our decisions, operations, and services are designed to meet the real needs of our community. Whether through structured savings plans, affordable loan products, or financial advisory support, we are dedicated to helping our members build stronger financial foundations and achieve their personal and business goals.</StaggerItem>
              <StaggerItem as="p">At Zara Rumuogba Savings and Loans Cooperative Limited, we combine modern financial practices with sound cooperative principles to deliver transparent, secure, and value-adding services. Our commitment to prudent financial management, innovation, and member satisfaction drives us to continually raise the bar in community-focused financial services.</StaggerItem>
            </Stagger>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
