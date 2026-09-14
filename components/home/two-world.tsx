'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useAudience } from '@/components/audience-provider'
import { GlobalConnectionVisual } from '@/components/global-connection-visual'
import { Reveal } from '@/components/motion'

export function TwoWorld() {
  const { goToLoans, setAudience } = useAudience()
  const [active, setActive] = useState<'nigeria' | 'diaspora' | null>(null)

  return (
    <section id="nigeria" className="zar-dark scroll-mt-20 bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8 lg:pt-32">
        <Reveal>
          <p className="eyebrow text-orange">02 Two Worlds</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-xl mt-4 max-w-3xl font-display font-bold text-balance">
            Two journeys. One trusted financial partner.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-4 px-4 pb-24 sm:px-6 lg:flex-row lg:px-8 lg:pb-32">
        {/* NIGERIA PANEL */}
        <motion.button
          type="button"
          onClick={goToLoans}
          onMouseEnter={() => setActive('nigeria')}
          onMouseLeave={() => setActive(null)}
          animate={{ flexGrow: active === 'diaspora' ? 0.75 : active === 'nigeria' ? 1.35 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group relative h-[440px] min-h-[440px] flex-none overflow-hidden rounded-3xl text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:h-[420px] sm:min-h-[420px] lg:h-[560px] lg:min-h-[560px] lg:flex-1"
        >
          <Image
            src="/images/nigeria-lifestyle-v2.png"
            alt="A professional standing above the Lagos skyline at dusk"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
          <div className="absolute left-6 top-6">
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
              Nigeria
            </span>
          </div>
          <div className="absolute inset-x-6 bottom-6">
            <div className="zar-line mb-4 w-12 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
            <h3 className="display-lg font-display font-bold">Finance what matters today.</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              Access Zaradera&apos;s lending solution, designed around clear and responsible terms
              for customers based in Nigeria.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 font-semibold text-orange">
              Access Loan Platform
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </motion.button>

        {/* DIASPORA PANEL */}
        <motion.a
          href="/diaspora"
          onClick={() => setAudience('international')}
          onMouseEnter={() => setActive('diaspora')}
          onMouseLeave={() => setActive(null)}
          animate={{ flexGrow: active === 'nigeria' ? 0.75 : active === 'diaspora' ? 1.35 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group relative flex h-[480px] min-h-[480px] flex-none flex-col justify-end overflow-hidden rounded-3xl bg-navy text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:h-[420px] sm:min-h-[420px] lg:h-[560px] lg:min-h-[560px] lg:flex-1"
        >
          <div className="absolute inset-0 opacity-80 transition-opacity duration-700 group-hover:opacity-100">
            <GlobalConnectionVisual showLabels={false} className="h-full w-full" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
          <div className="absolute left-6 top-6">
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
              Diaspora
            </span>
          </div>
          <div className="relative z-10 p-6 pb-8 sm:pb-6">
            <div className="zar-line mb-4 w-12 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
            <h3 className="display-lg font-display font-bold">
              Stay financially connected, wherever you are.
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              Enquiry and financial-service support for individuals and businesses outside Nigeria,
              routed straight to our team.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 font-semibold text-orange">
              Explore Diaspora Services
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </motion.a>
      </div>
    </section>
  )
}
