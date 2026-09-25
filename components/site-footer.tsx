import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/lib/site.config'
import { Wordmark } from '@/components/wordmark'

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Products', href: '/products' },
      { label: 'Nigeria', href: '/#nigeria' },
      { label: 'Diaspora', href: '/diaspora' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Resources', href: '/insights' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="zar-dark bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="zar-line mb-12 w-full opacity-60" />
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr]">
          <div className="max-w-xs">
            <Wordmark className="text-white" showSub />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Accessible, responsible financial solutions for individuals and businesses in Nigeria
              and across international markets. Financial opportunity, connected.
            </p>
            <div className="mt-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
                Licensed by
              </h2>
              <Image
                src="/images/licensed-regulators-transparent.png"
                alt="Nigeria Data Protection Commission and FCCPC"
                width={1280}
                height={1226}
                className="-ml-20 -mt-10 h-auto w-full max-w-[17rem]"
              />
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                {col.title}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Connect
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {siteConfig.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-sm text-white/70 transition-colors hover:text-orange"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              {siteConfig.whatsapp.map((contact) => (
                <li key={contact.href}>
                  <a
                    href={contact.href}
                    className="text-sm text-white/70 transition-colors hover:text-orange"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${contact.label}: ${contact.number}`}
                  >
                    {contact.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-white/70 transition-colors hover:text-orange"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="max-w-md text-white/40">
            {/* Company registration, licensing and regulatory information to be supplied. */}
            Company registration and regulatory information available on request.
          </p>
        </div>
      </div>
    </footer>
  )
}
