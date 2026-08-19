'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { Cta } from '@/components/cta'

type Prefs = { essential: true; analytics: boolean; marketing: boolean }
const KEY = 'zaradera:cookie-consent'

export function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [managing, setManaging] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        const t = setTimeout(() => setOpen(true), 900)
        return () => clearTimeout(t)
      }
    } catch {
      /* ignore */
    }
  }, [])

  const save = (prefs: Prefs) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...prefs, at: Date.now() }))
    } catch {
      /* ignore */
    }
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie preferences"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-2xl rounded-2xl border border-white/10 bg-navy p-5 text-white shadow-2xl sm:inset-x-4 sm:bottom-4 sm:p-6"
        >
          <div className="zar-line mb-4 w-16" />
          <p className="font-display text-lg font-semibold">Your privacy, your choice.</p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            We use essential cookies to make this site work. With your permission we may also use
            analytics to understand how the site is used. Read our{' '}
            <Link href="/cookies" className="text-orange underline underline-offset-4">
              Cookie Policy
            </Link>
            .
          </p>

          {managing && (
            <div className="mt-4 space-y-3 rounded-xl bg-white/5 p-4 text-sm">
              <label className="flex items-start justify-between gap-4">
                <span>
                  <span className="font-medium">Essential</span>
                  <span className="block text-white/50">Required for the site to function.</span>
                </span>
                <input type="checkbox" checked disabled className="mt-1 size-4 accent-orange" />
              </label>
              <label className="flex items-start justify-between gap-4">
                <span>
                  <span className="font-medium">Analytics</span>
                  <span className="block text-white/50">Anonymous usage insights.</span>
                </span>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1 size-4 accent-orange"
                />
              </label>
              <label className="flex items-start justify-between gap-4">
                <span>
                  <span className="font-medium">Marketing</span>
                  <span className="block text-white/50">Not currently used.</span>
                </span>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-1 size-4 accent-orange"
                />
              </label>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Cta
              withArrow={false}
              onClick={() => save({ essential: true, analytics: true, marketing: true })}
            >
              Accept All
            </Cta>
            {managing ? (
              <Cta
                withArrow={false}
                variant="outline"
                className="border-white/25 text-white"
                onClick={() => save({ essential: true, analytics, marketing })}
              >
                Save Preferences
              </Cta>
            ) : (
              <Cta
                withArrow={false}
                variant="outline"
                className="border-white/25 text-white"
                onClick={() => save({ essential: true, analytics: false, marketing: false })}
              >
                Reject Non-Essential
              </Cta>
            )}
            {!managing && (
              <button
                type="button"
                onClick={() => setManaging(true)}
                className="text-sm font-medium text-white/70 underline underline-offset-4 hover:text-white"
              >
                Manage Preferences
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
