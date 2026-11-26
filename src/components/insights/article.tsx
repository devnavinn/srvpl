import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import { Header } from '@/components/home/hero'
import { Reveal } from '@/components/home/shared'
import { onLinkClick } from '@/lib/router'
import { cn } from '@/lib/utils'
import { articles, type Article } from './data'
import { ArticleRail } from './card'

const EASE = [0.22, 1, 0.36, 1] as const

/** Plain dark hero for articles: breadcrumb row, two-line title, one-line standfirst. */
export function ArticleHero({ article }: { article: Article }) {
  return (
    <section className="relative bg-[#161616] px-4 text-white sm:px-6">
      <Header />
      <div className="relative z-10 mx-auto max-w-[1312px] pt-20 pb-16 sm:pt-16 sm:pb-20">
        <div className="flex items-center justify-between border-t border-white/15 pt-6 text-sm">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <a href="/insights" onClick={onLinkClick} className="hover:underline">
              Insights
            </a>{' '}
            / <span className="text-white/90">{article.category}</span>
          </motion.p>
          <a href="#article" className="hidden items-center gap-3 sm:flex">
            Scroll to discover
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
              <ArrowDown className="size-4" />
            </motion.span>
          </a>
        </div>

        <h1 className="mt-14 text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.15] font-semibold tracking-tight sm:mt-16">
          {article.title.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className={cn('block', i === 0 ? 'text-brand' : 'text-white')}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 + i * 0.15, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 max-w-xl text-[15px] leading-snug text-white/85"
        >
          {article.intro}
        </motion.p>
      </div>
    </section>
  )
}

/** Cover image over a faint grid, then a sticky contents list beside the article body. */
export function ArticleBody({ article }: { article: Article }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1])
  const sectionIds = useMemo(() => article.sections.map((s) => s.id), [article])
  const active = useActiveSection(sectionIds)

  return (
    <section ref={ref} id="article" className="relative overflow-hidden bg-white">
      <div className="bg-grid-light pointer-events-none absolute inset-x-0 top-0 h-[560px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="pointer-events-none absolute inset-0 top-[480px] bg-[radial-gradient(ellipse_45%_40%_at_85%_35%,rgb(51_85_184/0.28),transparent_70%),linear-gradient(to_bottom,rgb(51_85_184/0.06),transparent_80%)]" />

      <div className="relative mx-auto max-w-[1312px] px-4 pt-10 sm:px-6 sm:pt-11">
        <Reveal y={40}>
          <div className="overflow-hidden rounded-md">
            <motion.img
              src={article.image}
              alt=""
              style={{ scale: imgScale }}
              className="aspect-[4/3] w-full object-cover sm:aspect-[1312/500]"
            />
          </div>
        </Reveal>

        <div className="grid gap-12 pt-16 pb-24 lg:grid-cols-[270px_1fr] lg:gap-16 lg:pb-32">
          <nav aria-label="Contents" className="hidden lg:block">
            <ol className="sticky top-28">
              {article.sections.map((s, i) => (
                <li key={s.id} className="border-b border-ink/10">
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? 'true' : undefined}
                    className={cn(
                      'relative block py-5 pl-1 text-[13px] transition-colors',
                      active === s.id ? 'font-medium text-brand' : 'text-ink/70 hover:text-ink',
                    )}
                  >
                    {active === s.id && (
                      <motion.span
                        layoutId="toc-marker"
                        className="absolute inset-y-3 -left-3 w-0.5 bg-brand"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="max-w-[740px] space-y-14">
            {article.sections.map((s) => (
              <Reveal key={s.id}>
                <section id={s.id} className="scroll-mt-28">
                  <h2 className="text-[28px] leading-tight font-medium tracking-tight text-ink sm:text-[32px]">{s.title}</h2>
                  <div className="mt-4 space-y-6 text-[15px] leading-relaxed text-ink/60">
                    {s.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </article>
        </div>
      </div>
    </section>
  )
}

/** id of the last section whose heading has passed the upper third of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.35
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [ids])
  return active
}

export function KeepReading({ current }: { current: Article }) {
  const track = useRef<HTMLDivElement>(null)
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * 430, behavior: 'smooth' })

  return (
    <ArticleRail
      eyebrow="Keep reading"
      title="Keep Reading"
      posts={articles.filter((a) => a !== current)}
      trackRef={track}
      className="pt-8 pb-20 sm:pb-24"
      action={
        <div className="flex gap-2">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              onClick={() => scroll(d)}
              aria-label={d < 0 ? 'Previous articles' : 'Next articles'}
              className="grid size-10 place-items-center border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-white"
            >
              {d < 0 ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}
            </button>
          ))}
        </div>
      }
    />
  )
}
