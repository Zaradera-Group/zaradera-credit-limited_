'use client'

import { motion } from 'motion/react'
import { useAudience } from '@/components/audience-provider'
import { Cta } from '@/components/cta'
import { GlobalConnectionVisual } from '@/components/global-connection-visual'
import { Reveal } from '@/components/motion'

export function FinalCta() {
  const { goToLoans } = useAudience()
  return (
    <section className="zar-dark relative overflow-hidden bg-navy-deep py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <GlobalConnectionVisual showLabels={false} className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-transparent to-navy-deep" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow text-orange">Get started</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-xl mt-5 font-display font-bold text-balance text-white">
            Wherever you are, Zaradera moves with you.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-pretty text-white/70">
            Choose the path that fits your journey. Access our loan platform in Nigeria, or reach
            our diaspora desk from anywhere in the world.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <motion.div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Cta onClick={goToLoans}>Access Loans in Nigeria</Cta>
            <Cta href="/diaspora" variant="outline">
              I&apos;m in the Diaspora
            </Cta>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
