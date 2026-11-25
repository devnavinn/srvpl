import { AboutHero } from '@/components/about/hero'
import { WhoWeAre } from '@/components/about/who-we-are'
import { Philosophy } from '@/components/about/philosophy'
import { GlobalPresence } from '@/components/about/presence'
import { CoreValues } from '@/components/about/values'
import { Leadership } from '@/components/about/leadership'
import { Timeline } from '@/components/about/timeline'
import { WhyUs } from '@/components/about/why-us'
import { CallToAction, Footer } from '@/components/home/insights'

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <Philosophy />
      <GlobalPresence />
      <CoreValues />
      <Leadership />
      <Timeline />
      <WhyUs />
      <CallToAction />
      <Footer />
    </>
  )
}
