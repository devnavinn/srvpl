import { PageHero } from '@/components/shared/page-hero'
import { Staircase } from '@/components/shared/staircase'
import { IndustryGrid } from '@/components/industries/grid'
import { IndustryKnowledge } from '@/components/industries/knowledge'
import { BrandPortfolio } from '@/components/industries/portfolio'
import { advantages } from '@/components/industries/data'
import { CallToAction, Footer } from '@/components/home/insights'

export function IndustriesPage() {
  return (
    <>
      <PageHero
        label="Industries"
        next="industry-grid"
        introPosition="below"
        lines={[
          { text: 'Category Depth.', className: 'text-brand' },
          { text: 'Market Understanding.', className: 'text-white lg:pl-[20%]' },
          { text: 'Growth In Action.', className: 'text-brand lg:pl-[51%] lg:whitespace-nowrap' },
        ]}
        intro="Every industry has its own consumers, competitive landscape and route to market. We bring together category understanding, commercial infrastructure and execution capabilities to help international brands enter, establish and grow across India and the Middle East."
      />
      <IndustryGrid />
      <IndustryKnowledge />
      <BrandPortfolio />
      <Staircase
        id="srvpl-advantage"
        eyebrow="The SRVPL Advantage"
        heading="Built Around Categories. Connected by Capabilities."
        body="We bring market understanding, commercial execution and operational infrastructure together under one platform — helping international brands navigate complexity, build a presence and grow with confidence."
        href="/capabilities"
        steps={advantages}
      />
      <CallToAction />
      <Footer />
    </>
  )
}
