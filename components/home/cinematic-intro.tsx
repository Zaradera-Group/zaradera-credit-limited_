'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const SESSION_KEY = 'zaradera:intro-seen'

/**
 * Elegant page-load sequence: a point of orange light, a fine line sweep,
 * then the wordmark reveal. ~1.8s max. Shown once per session and disabled
 * for prefers-reduced-motion.
 */
export function CinematicIntro() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(false)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      /* ignore */
    }
    if (seen || reduce) return
    setShow(true)
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setShow(false)
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        /* ignore */
      }
    }, 2300)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [reduce])

  useEffect(() => {
    if (!show) document.body.style.overflow = ''
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-navy-deep"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="relative flex flex-col items-center">
            <motion.span
              className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/20 blur-2xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.9, 0.25], scale: [0.4, 1.8, 2.4] }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.72, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex size-24 items-center justify-center rounded-full bg-white/95 p-2 shadow-[0_0_50px_rgba(242,76,33,.18)] sm:size-28"
            >
              <Image src="/images/zaradera-logo.png" alt="" width={112} height={112} priority className="size-full object-contain" />
            </motion.div>
            <motion.div
              className="mb-5 mt-6 h-px bg-gradient-to-r from-transparent via-orange to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.p
              className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              ZARADERA
            </motion.p>
            <motion.p
              className="mt-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              Credit Limited
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
