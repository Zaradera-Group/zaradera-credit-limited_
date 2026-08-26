'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useAudience } from '@/components/audience-provider'

export function WhereAreYou() {
  const { goToLoans, setAudience } = useAudience()
  const [hover, setHover] = useState<'nigeria' | 'international' | null>(null)

  return (
    <section className="zar-dark relative overflow-hidden bg-navy text-white">
      {/* atmosphere that shifts warm (Nigeria) / cool (International) on hover */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{
          background:
            hover === 'nigeria'
              ? 'radial-gradient(60% 80% at 25% 50%, rgba(242,76,33,0.22), transparent 70%)'
              : hover === 'international'
                ? 'radial-gradient(60% 80% at 75% 50%, rgba(80,110,255,0.20), transparent 70%)'
                : 'radial-gradient(60% 80% at 50% 50%, rgba(242,76,33,0.08), transparent 70%)',
        }}
        transition={{ duration: 0.6 }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <p className="eyebrow text-center text-orange">04 Choose Your Path</p>
        <h2 className="display-xl mt-4 text-center font-display font-bold text-balance">
          Where are you today?
        </h2>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onMouseEnter={() => setHover('nigeria')}
            onMouseLeave={() => setHover(null)}
            onClick={goToLoans}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-left transition-colors hover:border-orange/50 sm:p-10"
          >
            <p className="eyebrow text-white/50">In Nigeria</p>
            <h3 className="display-lg mt-3 font-display font-bold">I&apos;m in Nigeria</h3>
            <p className="mt-3 max-w-sm text-white/70">
              Take me to Zaradera&apos;s loan services.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 font-semibold text-orange">
              Access loan platform
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>

          <button
            type="button"
            onMouseEnter={() => setHover('international')}
            onMouseLeave={() => setHover(null)}
            onClick={() => {
              setAudience('international')
              window.location.href = '/diaspora'
            }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-left transition-colors hover:border-white/40 sm:p-10"
          >
            <p className="eyebrow text-white/50">Outside Nigeria</p>
            <h3 className="display-lg mt-3 font-display font-bold">I&apos;m outside Nigeria</h3>
            <p className="mt-3 max-w-sm text-white/70">
              I&apos;d like to connect with Zaradera.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 font-semibold text-white">
              Start a conversation
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
