import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Eyebrow, Reveal } from '@/components/home/shared'
import { onLinkClick } from '@/lib/router'
import { cn } from '@/lib/utils'
import { articlePath, type Article } from './data'

/** Photo, mono meta line ("ESSAY · 6 MIN READ · OCT 2026") and headline, linking to the article. */
export function ArticleCard({ post, className }: { post: Article; className?: string }) {
  return (
    <a href={articlePath(post)} onClick={onLinkClick} className={cn('group block', className)}>
      <div className="overflow-hidden rounded-md">
        <img
          src={post.thumb}
          alt=""
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="mt-5 font-mono text-[11px] tracking-wider text-ink/60 uppercase">
        {post.kind} · {post.read} · {post.date}
      </p>
      <h3 className="mt-3 max-w-[260px] text-lg leading-snug font-medium text-ink underline-offset-4 group-hover:underline">
        {post.headline}
      </h3>
    </a>
  )
}

/**
 * Section heading plus a horizontal row of article cards that bleeds off the right edge
 * while the first card lines up with the page container.
 */
export function ArticleRail({
  id,
  eyebrow,
  title,
  action,
  posts,
  trackRef,
  className,
}: {
  id?: string
  eyebrow: string
  title: string
  action?: ReactNode
  posts: Article[]
  trackRef?: React.Ref<HTMLDivElement>
  className?: string
}) {
  const gutter = 'max(1rem, calc((100vw - 1312px) / 2 + 1.5rem))'
  return (
    <section id={id} className={cn('bg-white', className)}>
      <div className="mx-auto flex max-w-[1312px] flex-col gap-6 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <Reveal>
          <Eyebrow className="text-ink">{eyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-ink/85 sm:text-[40px]">{title}</h2>
        </Reveal>
        {action}
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pr-4 sm:pr-6"
        style={{ paddingLeft: gutter, scrollPaddingLeft: gutter }}
      >
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="w-[80vw] max-w-[408px] shrink-0 snap-start"
          >
            <ArticleCard post={post} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
