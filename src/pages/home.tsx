import { Hero } from '@/components/home/hero'
import { About } from '@/components/home/about'
import { Pillars } from '@/components/home/pillars'
import { Solutions } from '@/components/home/solutions'
import { Industries } from '@/components/home/industries'
import { CallToAction, Footer, Insights } from '@/components/home/insights'

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Pillars />
      <Solutions />
      <Industries />
      <Insights />
      <CallToAction />
      <Footer />
    </>
  )
}
