import type { ReactNode } from 'react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'

/**
 * Standard page frame. `heroTone="dark"` lets the nav float transparently over
 * a dark hero; `heroTone="light"` renders a solid nav from the top.
 */
export function PageShell({
  children,
  heroTone = 'light',
}: {
  children: ReactNode
  heroTone?: 'dark' | 'light'
}) {
  return (
    <>
      <SiteNav overlayHero={heroTone === 'dark'} />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  )
}
