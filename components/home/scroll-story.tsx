'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'motion/react'
import { Cta } from '@/components/cta'

const frames = [
  { t: 'Life moves.' },
  { t: 'Opportunities move with it.' },
  { t: 'Home and abroad, connected by a single route.' },
  { t: "Your financial relationship shouldn't disappear because your location changed." },
  { t: 'Zaradera keeps you connected.' },
]

function Frame({
  progress,
  index,
  total,
  children,
}: {
  progress: MotionValue<number>
  index: number
  total: number
  children: React.ReactNode
}) {
  const seg = 1 / total
  const start = index * seg
  const opacity = useTransform(
    progress,
    [start, start + seg * 0.25, start + seg * 0.75, start + seg],
    [0, 1, 1, 0],
  )
  const y = useTransform(progress, [start, start + seg], [30, -30])
  return (
    <motion.p
      style={{ opacity, y }}
      className="display-lg absolute inset-x-0 mx-auto max-w-3xl px-6 text-center font-display font-bold text-white text-balance"
    >
      {children}
    </motion.p>
  )
}

export function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Node travels along the route as the story progresses.
  const nodeX = useTransform(scrollYProgress, [0, 1], ['12%', '88%'])
  const nodeY = useTransform(scrollYProgress, [0, 0.5, 1], ['70%', '30%', '55%'])
  const pathDraw = useTransform(scrollYProgress, [0.1, 0.85], [0, 1])
  const ctaOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1])

  if (reduce) {
    return (
      <section className="zar-dark bg-navy py-24 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="display-lg font-display font-bold text-balance">
            Your financial relationship shouldn&apos;t disappear because your location changed.
            Zaradera keeps you connected.
          </h2>
          <div className="mt-8 flex justify-center">
            <Cta href="/diaspora">Discover Diaspora Services</Cta>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="zar-dark relative h-[420vh] bg-navy">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden">
        {/* route visual */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full opacity-70"
          aria-hidden
        >
          <motion.path
            d="M 12 70 Q 50 10 88 55"
            fill="none"
            stroke="#f24c21"
            strokeWidth="0.3"
            strokeLinecap="round"
            style={{ pathLength: pathDraw }}
          />
        </svg>
        <motion.span
          aria-hidden
          className="absolute z-10 size-3 rounded-full bg-orange"
          style={{
            left: nodeX,
            top: nodeY,
            boxShadow: '0 0 30px 8px rgba(242,76,33,0.6)',
          }}
        />

        <div className="relative flex h-40 w-full items-center justify-center">
          {frames.map((f, i) => (
            <Frame key={i} progress={scrollYProgress} index={i} total={frames.length}>
              {f.t}
            </Frame>
          ))}
        </div>

        <motion.div style={{ opacity: ctaOpacity }} className="mt-10">
          <Cta href="/diaspora">Discover Diaspora Services</Cta>
        </motion.div>
      </div>
    </section>
  )
}
