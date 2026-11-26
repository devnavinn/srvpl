import { ArticleBody, ArticleHero, KeepReading } from '@/components/insights/article'
import { articles, findArticle } from '@/components/insights/data'
import { CallToAction, Footer } from '@/components/home/insights'
import { usePath } from '@/lib/router'

/** /insights/<slug>: a single article (App only routes here for known slugs). */
export function InsightPage() {
  const article = findArticle(usePath()) ?? articles[0]
  return (
    <>
      <ArticleHero article={article} />
      <ArticleBody key={article.slug} article={article} />
      <KeepReading current={article} />
      <CallToAction />
      <Footer />
    </>
  )
}
