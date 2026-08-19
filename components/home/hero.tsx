'use client'

import { motion } from 'motion/react'
import { GlobalConnectionVisual } from '@/components/global-connection-visual'
import { useAudience } from '@/components/audience-provider'
import { Cta } from '@/components/cta'
import { TextReveal } from '@/components/motion'

export function Hero() {
  const { setAudience, goToLoans } = useAudience()

  return (
    <section className="zar-dark relative flex min-h-[100svh] items-center overflow-hidden bg-navy pt-16">
      {/* Signature network background */}
      <div className="absolute inset-0 translate-x-[12%] opacity-55 sm:translate-x-[8%] sm:opacity-70 lg:translate-x-[18%] lg:opacity-90">
        <GlobalConnectionVisual showLabels className="h-full w-full" />
      </div>
      {/* legibility gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/35 lg:via-navy/75 lg:to-navy/15" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pb-28 pt-20 sm:px-6 sm:pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8">
        <div className="max-w-3xl">
          <h1 className="display-hero max-w-[12ch] font-display font-extrabold text-white text-balance">
            <TextReveal text="Your financial possibilities" />{' '}
            <span className="relative">
              <TextReveal text="shouldn't stop at borders." delay={0.15} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-7 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            Whether you&apos;re building your future in Nigeria or connecting from abroad, Zaradera
            creates simpler pathways to financial opportunity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Cta onClick={goToLoans} withArrow ariaLabel="I'm in Nigeria — access Zaradera loans">
              I&apos;m in Nigeria
            </Cta>
            <Cta
              href="/diaspora"
              variant="outline"
              className="border-white/25 text-white"
              onClick={() => setAudience('international')}
              ariaLabel="I'm abroad — explore diaspora services"
            >
              I&apos;m Abroad
            </Cta>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 text-sm text-white/50"
          >
            Choose the experience designed for you.
          </motion.p>
        </div>

        <div className="hidden lg:block" aria-hidden />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="pointer-events-none absolute inset-x-0 bottom-5 hidden justify-center sm:flex"
      >
        <span className="flex flex-col items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-orange/80">
          Scroll to explore
          <span className="relative h-9 w-5 rounded-full border border-orange/60">
            <motion.span
              className="absolute left-1/2 top-1 size-1 -translate-x-1/2 rounded-full bg-orange"
              animate={{ y: [0, 17, 0], opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </span>
      </motion.div>
    </section>
  )
}
