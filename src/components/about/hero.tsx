import { PageHero } from '@/components/shared/page-hero'

export function AboutHero() {
  return (
    <PageHero
      label="About Us"
      next="who-we-are"
      lines={[
        { text: 'We Launch', className: 'text-brand' },
        { text: 'Brands Into New', className: 'text-white' },
        { text: 'Markets.', className: 'text-brand' },
      ]}
      intro="SRVPL is the launchpad that takes international brands from first shipment to market leader — across India and the Middle East."
    />
  )
}
