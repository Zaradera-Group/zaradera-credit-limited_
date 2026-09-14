import type { Metadata } from 'next'
import Image from 'next/image'
import { HandHeart, Landmark, UsersRound } from 'lucide-react'
import { PageShell } from '@/components/page-shell'
import { Reveal, Stagger, StaggerItem, TextReveal } from '@/components/motion'

const principles = [
  { icon: UsersRound, title: 'Cooperation', body: 'Every member is both a stakeholder and a beneficiary.' },
  { icon: Landmark, title: 'Integrity', body: 'Transparent, secure services grounded in prudent financial management.' },
  { icon: HandHeart, title: 'Shared prosperity', body: 'Financial foundations designed to support lasting personal and business growth.' },
]

export const metadata: Metadata = {
  title: 'Zara Rumuogba Savings and Loans Cooperative Society Limited',
  description: 'Discover Zara Rumuogba Savings and Loans Cooperative Society Limited (RS 35853), a member-owned financial cooperative supporting individuals, families, and small businesses.',
}

export default function CooperativePage() {
  return (
    <PageShell heroTone="dark">
      <section className="zar-dark relative min-h-[760px] overflow-hidden bg-navy-deep pb-16 pt-28 sm:pt-36 lg:flex lg:min-h-[850px] lg:items-center lg:py-32">
        <div aria-hidden className="absolute -left-48 top-16 size-[34rem] rounded-full bg-orange/15 blur-[120px]" />
        <div aria-hidden className="absolute -right-40 -top-24 size-[42rem] rounded-full bg-[#3a3593]/45 blur-[140px]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-16 lg:px-8">
          <div className="relative z-10">
            <Reveal><p className="eyebrow text-orange">Member-owned. Community-focused.</p></Reveal>
            <h1 className="display-xl mt-6 max-w-3xl font-bold text-balance text-white">
              <TextReveal text="Zara Rumuogba Savings and Loans Cooperative Society Limited" />
            </h1>
            <Reveal delay={0.28}>
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[.07] px-5 py-3 text-sm font-semibold tracking-[.12em] text-white/80 backdrop-blur-md">
                <span className="size-2 rounded-full bg-orange shadow-[0_0_18px_rgba(242,76,33,.8)]" />
                RS 35853
              </div>
            </Reveal>
            <Reveal delay={0.36}>
              <p className="mt-8 max-w-xl text-lg leading-8 text-white/65">A progressive financial cooperative built around reliable service, shared responsibility, and long-term economic wellbeing.</p>
            </Reveal>
          </div>

          <Reveal delay={0.18} y={38} className="relative">
            <div aria-hidden className="absolute -inset-5 rounded-[2.5rem] border border-white/10" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 shadow-[0_45px_100px_-45px_rgba(0,0,0,.8)]">
              <Image src="/images/cooperative-community.png" alt="Members of a Nigerian cooperative reviewing a savings plan together" fill priority className="object-cover" sizes="(min-width: 1024px) 54vw, 100vw" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep/45 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream py-20 lg:py-28">
        <div aria-hidden className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(242,76,33,.07),transparent_68%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.62fr_1.38fr] lg:gap-20 lg:px-8">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow text-orange">Our cooperative</p>
            <h2 className="display-lg mt-5 font-bold text-navy">Prosperity grows when people grow together.</h2>
            <div className="mt-8 h-px w-28 bg-gradient-to-r from-orange to-transparent" />
          </Reveal>
          <Stagger className="space-y-8 text-lg leading-8 text-muted-foreground">
            <StaggerItem as="p">Zara Rumuogba Savings and Loans Cooperative Limited owned by shareholders of Zaradera Credit Limited is a progressive, member-owned financial cooperative committed to empowering individuals, families, and small businesses with reliable, accessible, and sustainable financial services. Established on the values of cooperation, integrity, and shared prosperity, we serve as a trusted financial partner for those seeking stability, growth, and long-term economic wellbeing.</StaggerItem>
            <StaggerItem as="p">As a cooperative, our strength lies in our people. Every member is both a stakeholder and a beneficiary, ensuring that our decisions, operations, and services are designed to meet the real needs of our community. Whether through structured savings plans, affordable loan products, or financial advisory support, we are dedicated to helping our members build stronger financial foundations and achieve their personal and business goals.</StaggerItem>
            <StaggerItem as="p">At Zara Rumuogba Savings and Loans Cooperative Limited, we combine modern financial practices with sound cooperative principles to deliver transparent, secure, and value-adding services. Our commitment to prudent financial management, innovation, and member satisfaction drives us to continually raise the bar in community-focused financial services.</StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-orange">What guides us</p>
            <h2 className="display-lg mt-5 font-bold text-navy">Sound principles. Meaningful outcomes.</h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, body }, index) => (
              <StaggerItem key={title}>
                <article className="group relative h-full overflow-hidden rounded-3xl border bg-cream/45 p-8 transition duration-500 hover:-translate-y-2 hover:border-orange/30 hover:shadow-[0_30px_70px_-45px_rgba(6,2,67,.45)]">
                  <span aria-hidden className="absolute right-5 top-3 font-display text-7xl font-black text-navy/[.035]">0{index + 1}</span>
                  <div className="grid size-12 place-items-center rounded-2xl bg-navy text-white transition duration-500 group-hover:bg-orange"><Icon className="size-5" aria-hidden /></div>
                  <h3 className="mt-8 text-2xl font-bold text-navy">{title}</h3>
                  <p className="mt-4 leading-7 text-muted-foreground">{body}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </PageShell>
  )
}
