import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { PageHero } from '@/components/shared/page-hero'
import { ArrowButton, Reveal } from '@/components/home/shared'
import { onLinkClick } from '@/lib/router'
import { scrollToTarget } from '@/lib/smooth-scroll'
import { cn } from '@/lib/utils'
import { ArticleCard } from './card'
import { articlePath, articles, categories, type Article } from './data'

const PER_PAGE = 6
const EASE = [0.22, 1, 0.36, 1] as const
type Filter = 'All' | Article['category']

/** /insights: wave hero with category pills, featured article, paginated card grid. */
export function InsightsListing() {
  const [filter, setFilter] = useState<Filter>('All')
  const [page, setPage] = useState(1)

  const [featured, ...rest] = articles
  // "All" shows the featured story on its own; a category shows every match in the grid.
  const posts = filter === 'All' ? rest : articles.filter((a) => a.category === filter)
  const pages = Math.max(1, Math.ceil(posts.length / PER_PAGE))
  const visible = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const choose = (f: Filter) => {
    setFilter(f)
    setPage(1)
  }
  const goTo = (p: number) => {
    setPage(p)
    const grid = document.getElementById('articles')
    if (grid) scrollToTarget(grid)
  }

  return (
    <>
      <PageHero
        label="Insights"
        next="featured"
        introPosition="under-right"
        lines={[
          { text: 'What We’re Seeing Across', className: 'text-brand' },
          { text: 'Indian & Middle Eastern Commerce.', className: 'text-white lg:pl-[17%] lg:whitespace-nowrap' },
        ]}
        intro="Market-entry guidance, commerce trends, and consumer insights from inside the launches and operations of brands actually growing in India and the Middle East."
        bottom={<CategoryPills active={filter} onChange={choose} />}
      />

      {filter === 'All' && <Featured post={featured} />}

      <section id="articles" className="scroll-mt-8 bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1312px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filter}-${page}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {visible.length ? (
                <div className="grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                  {visible.map((post) => (
                    <ArticleCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <p className="py-16 text-center text-ink/60">
                  No articles in {filter} yet.{' '}
                  <button onClick={() => choose('All')} className="text-brand underline-offset-4 hover:underline">
                    See all insights
                  </button>
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          {pages > 1 && (
            <nav aria-label="Pagination" className="mt-14 flex justify-center gap-2 border-t border-ink/10 pt-8">
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => goTo(p)}
                  aria-current={p === page ? 'page' : undefined}
                  className={cn(
                    'grid size-10 place-items-center rounded-md text-sm transition-colors',
                    p === page ? 'bg-brand text-white' : 'text-ink/70 hover:bg-ink/5',
                  )}
                >
                  {p}
                </button>
              ))}
            </nav>
          )}
        </div>
      </section>
    </>
  )
}

function CategoryPills({ active, onChange }: { active: Filter; onChange: (f: Filter) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="relative z-10 mx-auto max-w-[1312px] pb-10"
    >
      <div role="tablist" aria-label="Filter by category" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {(['All', ...categories] as Filter[]).map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={active === c}
            onClick={() => onChange(c)}
            className={cn(
              'shrink-0 rounded-full border px-4 py-2.5 text-[13px] whitespace-nowrap transition-colors',
              active === c ? 'border-brand bg-brand text-white' : 'border-white/40 text-white/90 hover:border-white hover:bg-white/10',
            )}
          >
            {c}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

function Featured({ post }: { post: Article }) {
  return (
    <section id="featured" className="relative overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16">
      <div className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,black,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_95%_100%,rgb(51_85_184/0.22),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-[1312px] items-center gap-10 lg:grid-cols-[minmax(0,780px)_1fr] lg:gap-16">
        <Reveal y={40}>
          <a href={articlePath(post)} onClick={onLinkClick} className="group block overflow-hidden rounded-md">
            <img
              src={post.thumb}
              alt=""
              className="aspect-[780/505] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </a>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="font-mono text-[11px] tracking-wider text-brand uppercase">
            {post.category} · {post.kind} · {post.read}
          </p>
          <h2 className="mt-4 max-w-sm text-3xl leading-tight font-medium tracking-tight text-ink sm:text-[34px]">
            {post.headline}
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/60">{post.intro}</p>
          <ArrowButton href={articlePath(post)} className="mt-8">
            Read the {post.kind.toLowerCase()}
          </ArrowButton>
        </Reveal>
      </div>
    </section>
  )
}
