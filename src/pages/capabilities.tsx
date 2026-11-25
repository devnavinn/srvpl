import { PageHero } from '@/components/shared/page-hero'
import { CapabilityPanels } from '@/components/capabilities/panels'
import { CallToAction, Footer } from '@/components/home/insights'

export function CapabilitiesPage() {
  return (
    <>
      <PageHero
        label="Capabilities"
        next="capabilities-list"
        lines={[
          { text: 'Operational Capabilities,', className: 'text-brand' },
          { text: 'Launch-Tested.', className: 'text-white lg:pl-[28%] lg:whitespace-nowrap' },
        ]}
        intro={
          <>
            This is how the launchpad actually runs — the functions powering every brand that takes off with us.
          </>
        }
      />
      <CapabilityPanels />
      <CallToAction />
      <Footer />
    </>
  )
}
