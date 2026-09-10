'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { siteConfig } from '@/lib/site.config'

export type Audience = 'nigeria' | 'international'

type AudienceState = {
  /** The visitor's chosen journey, or null if not yet chosen. */
  audience: Audience | null
  /** A soft hint derived from privacy-conscious geolocation. Never forces a redirect. */
  detected: Audience | null
  setAudience: (a: Audience) => void
  clearAudience: () => void
  /** Cinematic transition to the external Nigerian loan platform. */
  goToLoans: () => void
}

const STORAGE_KEY = 'zaradera:audience'

const AudienceContext = createContext<AudienceState | null>(null)

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudienceState] = useState<Audience | null>(null)
  const [detected, setDetected] = useState<Audience | null>(null)
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'nigeria' || saved === 'international') setAudienceState(saved)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    let active = true
    const controller = new AbortController()
    fetch('/api/geo', { signal: controller.signal, cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { audience?: Audience } | null) => {
        if (active && data?.audience) setDetected(data.audience)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
      })
    return () => {
      active = false
      controller.abort()
    }
  }, [])

  const setAudience = useCallback((a: Audience) => {
    setAudienceState(a)
    try {
      localStorage.setItem(STORAGE_KEY, a)
    } catch {
      /* ignore */
    }
  }, [])

  const clearAudience = useCallback(() => {
    setAudienceState(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  const goToLoans = useCallback(() => {
    setAudience('nigeria')
    const url = siteConfig.loanAppUrl
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || url.startsWith('#')) {
      if (!url.startsWith('#')) window.history.pushState({ zaraderaLoanReturn: true }, '', window.location.href)
      window.location.assign(url)
      return
    }
    setRedirecting(true)
    window.setTimeout(() => {
      // Keep a Zaradera entry immediately behind the external platform. This
      // remains available even when the lending platform performs redirects.
      window.history.pushState({ zaraderaLoanReturn: true }, '', window.location.href)
      window.location.assign(url)
    }, 1450)
  }, [setAudience])

  return (
    <AudienceContext.Provider
      value={{ audience, detected, setAudience, clearAudience, goToLoans }}
    >
      {children}
      <AnimatePresence>
        {redirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-navy-deep px-6 text-white"
          >
            <motion.div
              aria-hidden
              className="absolute size-72 rounded-full bg-orange/15 blur-3xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.8, 0.35], scale: [0.5, 1.25, 1.6] }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
            />
            <div className="relative flex w-full max-w-md flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.75, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex size-24 items-center justify-center rounded-full bg-white p-2 shadow-[0_18px_70px_rgba(242,76,33,.24)] ring-1 ring-white/20"
              >
                <Image
                  src="/images/zaradera-logo.png"
                  alt="Zaradera Credit Limited"
                  width={96}
                  height={96}
                  priority
                  className="size-full object-contain"
                />
              </motion.div>
              <motion.p
                className="mt-7 text-xs font-semibold uppercase tracking-[0.28em] text-orange"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.45 }}
              >
                Nigeria experience
              </motion.p>
              <motion.p
                className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.5 }}
              >
                Opening Zaradera Loans
              </motion.p>
              <motion.div className="mt-7 h-0.5 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-orange to-orange-soft"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.15, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
              <motion.p
                className="mt-4 text-sm text-white/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
              >
                Securely connecting you to the lending platform
              </motion.p>
              <a href={siteConfig.loanAppUrl} className="mt-4 text-xs text-white/45 underline decoration-white/25 underline-offset-4 hover:text-white">
                Continue manually if the page does not open
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AudienceContext.Provider>
  )
}

export function useAudience() {
  const ctx = useContext(AudienceContext)
  if (!ctx) throw new Error('useAudience must be used within AudienceProvider')
  return ctx
}
