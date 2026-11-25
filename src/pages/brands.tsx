import { PageHero } from '@/components/shared/page-hero'
import { BrandDistribution } from '@/components/brands/distribution'
import { OwnedBrands } from '@/components/brands/owned'
import { CallToAction, Footer } from '@/components/home/insights'

export function BrandsPage() {
  return (
    <>
      <PageHero
        label="Our Brands"
        next="brand-distribution"
        introPosition="top"
        lines={[
          { text: 'Brands Launched', className: 'text-brand' },
          { text: 'From Our Platform.', className: 'text-white' },
        ]}
        intro="A portfolio spanning international brands brought to India, owned labels built from the ground up, and exclusive partners — each launched with the same operating discipline."
      />
      <BrandDistribution />
      <OwnedBrands />
      <CallToAction />
      <Footer />
    </>
  )
}
