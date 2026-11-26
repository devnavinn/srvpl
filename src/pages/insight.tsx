import { ArticleBody, ArticleHero, KeepReading } from '@/components/insights/article'
import { CallToAction, Footer } from '@/components/home/insights'

export function InsightPage() {
  return (
    <>
      <ArticleHero />
      <ArticleBody />
      <KeepReading />
      <CallToAction />
      <Footer />
    </>
  )
}
