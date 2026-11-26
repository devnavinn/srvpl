import { PageHero } from '@/components/shared/page-hero'
import { ApplySection, LifeAtSrvpl, WhyJoin } from '@/components/careers/sections'
import { Footer } from '@/components/home/insights'

export function CareersPage() {
  return (
    <>
      <PageHero
        label="Careers"
        next="why-join"
        lines={[
          { text: 'Help Brands', className: 'text-brand' },
          { text: 'Take Off.', className: 'text-white pl-[18%] sm:pl-[26%]' },
        ]}
        intro={
          <>
            SRVPL is a focused, high-ownership team powering market entry, commerce, marketing, and technology for a
            growing brand portfolio. If you want real ownership over real launches, this is that kind of team.
          </>
        }
      />
      <WhyJoin />
      <LifeAtSrvpl />
      <ApplySection />
      <Footer />
    </>
  )
}
