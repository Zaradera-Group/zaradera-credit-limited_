'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { siteConfig } from '@/lib/site.config'
import { useAudience } from '@/components/audience-provider'
import { Wordmark } from '@/components/wordmark'
import { Cta } from '@/components/cta'
import { cn } from '@/lib/utils'

export function SiteNav({ overlayHero = true }: { overlayHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [routerOpen, setRouterOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const pathname = usePathname()
  const { setAudience, goToLoans } = useAudience()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setRouterOpen(false)
    setAboutOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const solid = scrolled || menuOpen || !overlayHero

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[70] transition-all duration-500',
        solid
          ? 'border-b border-border/60 bg-background/80 text-foreground backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent text-white',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-18 sm:px-6 lg:px-8">
        <Wordmark showSub onClick={() => setMenuOpen(false)} />

        <ul className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => item.href === '/about' ? (
            <li key={item.href} className="relative" onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
              <button type="button" onClick={() => setAboutOpen(value => !value)} aria-expanded={aboutOpen} aria-haspopup="menu" className={cn('group relative flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors', solid ? 'text-foreground/80 hover:text-foreground' : 'text-white/85 hover:text-white')}>
                About <ChevronDown className={cn('size-3.5 transition-transform', aboutOpen && 'rotate-180')} aria-hidden />
                <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-orange transition-transform duration-300 group-hover:scale-x-100" />
              </button>
              <AnimatePresence>{aboutOpen && <motion.div role="menu" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}} transition={{duration:.18}} className="absolute left-0 top-[calc(100%+0.5rem)] w-56 rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-xl before:absolute before:-top-2 before:left-0 before:h-2 before:w-full before:content-['']">
                <Link role="menuitem" href="/about" className="block rounded-xl px-4 py-3 text-sm font-semibold hover:bg-muted">About Zaradera<span className="mt-1 block text-xs font-normal text-muted-foreground">Our purpose and approach</span></Link>
                <Link role="menuitem" href="/about/team" className="block rounded-xl px-4 py-3 text-sm font-semibold hover:bg-muted">Our Team<span className="mt-1 block text-xs font-normal text-muted-foreground">Meet our leadership</span></Link>
              </motion.div>}</AnimatePresence>
            </li>
          ) : (
            <li key={item.href}><Link href={item.href} className={cn('group relative rounded-full px-3 py-2 text-sm font-medium transition-colors', solid ? 'text-foreground/80 hover:text-foreground' : 'text-white/85 hover:text-white')}>{item.label}<span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-orange transition-transform duration-300 group-hover:scale-x-100" /></Link></li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Get Started routing menu */}
          <div
            className="relative hidden lg:block"
            onMouseLeave={() => setRouterOpen(false)}
          >
            <button
              type="button"
              onClick={() => setRouterOpen((v) => !v)}
              onMouseEnter={() => setRouterOpen(true)}
              aria-expanded={routerOpen}
              aria-haspopup="menu"
              className={cn(
                'inline-flex min-h-10 items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors',
                'bg-orange text-white hover:bg-[color-mix(in_oklab,var(--orange)_88%,black)]',
              )}
            >
              Get Started
              <ChevronDown
                className={cn('size-4 transition-transform', routerOpen && 'rotate-180')}
                aria-hidden
              />
            </button>
            <AnimatePresence>
              {routerOpen && (
                <motion.div
                  role="menu"
                  onMouseEnter={() => setRouterOpen(true)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-[calc(100%+0.5rem)] w-72 rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-xl before:absolute before:-top-2 before:left-0 before:h-2 before:w-full before:content-['']"
                >
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Where can we help you?
                  </p>
                  <button
                    role="menuitem"
                    type="button"
                    onClick={goToLoans}
                    className="flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-muted"
                  >
                    <span className="mt-0.5 flex size-8 items-center justify-center rounded-lg bg-orange/10 text-sm font-bold text-orange">
                      NG
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">Nigeria</span>
                      <span className="block text-xs text-muted-foreground">
                        Access our lending platform
                      </span>
                    </span>
                  </button>
                  <Link
                    role="menuitem"
                    href="/diaspora"
                    onClick={() => setAudience('international')}
                    className="flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-muted"
                  >
                    <span className="mt-0.5 flex size-8 items-center justify-center rounded-lg bg-navy/10 text-sm font-bold text-navy">
                      Int
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">Outside Nigeria</span>
                      <span className="block text-xs text-muted-foreground">
                        Speak with Zaradera
                      </span>
                    </span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-full transition-colors lg:hidden',
              solid ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10',
            )}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border bg-background text-foreground lg:hidden"
          >
            <div className="mx-auto max-h-[calc(100dvh-4rem)] max-w-7xl touch-pan-y overflow-y-auto overscroll-contain px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4 [-webkit-overflow-scrolling:touch] sm:px-6 sm:pt-6">
              <ul className="flex flex-col">
                {siteConfig.nav.flatMap((item) => item.href === '/about' ? [{ label: 'About Zaradera', href: '/about' }, { label: 'Our Team', href: '/about/team' }] : [item]).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block min-h-12 border-b border-border/60 py-3.5 font-display text-xl font-semibold active:text-orange"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <Cta onClick={() => { setMenuOpen(false); goToLoans() }} className="w-full">
                  I&apos;m in Nigeria. Access Loans
                </Cta>
                <Cta
                  href="/diaspora"
                  variant="outline"
                  className="w-full"
                  onClick={() => { setAudience('international'); setMenuOpen(false) }}
                >
                  I&apos;m Outside Nigeria
                </Cta>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
