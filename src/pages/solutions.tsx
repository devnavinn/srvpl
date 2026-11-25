import { PageHero } from '@/components/shared/page-hero'
import { SolutionSteps } from '@/components/solutions/steps'
import { Process } from '@/components/solutions/process'
import { Marketplace } from '@/components/solutions/marketplace'
import { WhyUs } from '@/components/about/why-us'
import { CallToAction, Footer } from '@/components/home/insights'

export function SolutionsPage() {
  return (
    <>
      <PageHero
        label="Solutions"
        next="solutions-steps"
        introPosition="top"
        lines={[
          { text: 'Solutions', className: 'text-brand' },
          { text: 'That Move Brands', className: 'text-white' },
          { text: 'Forward.', className: 'text-brand' },
        ]}
        intro="Whether you're entering a market, scaling a marketplace, or building a brand from scratch, our solutions are built around momentum — not service categories."
      />
      <SolutionSteps />
      <Process />
      <Marketplace />
      <div className="pt-24 sm:pt-28">
        <WhyUs />
      </div>
      <CallToAction />
      <Footer />
    </>
  )
}
