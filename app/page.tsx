import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { CinematicIntro } from '@/components/home/cinematic-intro'
import { Hero } from '@/components/home/hero'
import { IntroStatement } from '@/components/home/intro-statement'
import { TrustedBy } from '@/components/home/trusted-by'
import { trustedByHeading, trustedByLogos } from '@/lib/site.config'
import { TwoWorld } from '@/components/home/two-world'
import { ScrollStory } from '@/components/home/scroll-story'
import { SolutionsSection } from '@/components/home/solutions-section'
import { WhereAreYou } from '@/components/home/where-are-you'
import { TrustSection } from '@/components/home/trust-section'
import { DiasporaPreview } from '@/components/home/diaspora-preview'
import { FinalCta } from '@/components/final-cta'
import { ProductsPreview } from '@/components/home/products-preview'
import { LatestPosts } from '@/components/home/latest-posts'

export default function HomePage() {
  return (
    <>
      <CinematicIntro />
      <SiteNav overlayHero />
      <main id="main">
        <Hero />
        <TrustedBy heading={trustedByHeading} logos={trustedByLogos} />
        <IntroStatement />
        <TwoWorld />
        <ScrollStory />
        <WhereAreYou />
        <SolutionsSection />
        <ProductsPreview />
        <LatestPosts />
        <TrustSection />
        <DiasporaPreview />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
