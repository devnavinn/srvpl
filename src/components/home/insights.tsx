import { useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { ArrowButton, Eyebrow, Reveal } from './shared'
import { author, insights } from './data'
import { onLinkClick } from '@/lib/router'
import { article } from '@/components/insights/data'

export function Insights() {
  const track = useRef<HTMLDivElement>(null)
  const scrollBy = () => track.current?.scrollBy({ left: 452, behavior: 'smooth' })

  return (
    <section id="insights" className="bg-white py-24 sm:py-32">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-6 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <Reveal>
          <Eyebrow className="text-ink">Insights</Eyebrow>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-ink/85 sm:text-[40px]">Latest Industry Insights</h2>
        </Reveal>
        <button
          onClick={scrollBy}
          className="group flex items-center gap-3 self-start border border-ink/15 py-1 pr-1 pl-4 text-[15px] text-ink sm:self-auto"
        >
          See all articles
          <span className="grid size-8 place-items-center bg-ink/10 transition-colors group-hover:bg-ink group-hover:text-white">
            <ArrowRight className="size-4" />
          </span>
        </button>
      </div>

      <div
        ref={track}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pr-4 sm:pr-6"
        // Align the first card with the heading's container, while letting cards bleed off the right edge
        style={{ paddingLeft: 'max(1rem, calc((100vw - 1312px) / 2 + 1.5rem))', scrollPaddingLeft: 'max(1rem, calc((100vw - 1312px) / 2 + 1.5rem))' }}
      >
        {insights.map((post, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group w-[85vw] max-w-[428px] shrink-0 snap-start"
          >
            <a href={article.slug} onClick={onLinkClick}>
              <div className="overflow-hidden">
                <img
                  src={post.src}
                  alt=""
                  className="aspect-[428/259] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm">
                <span className="border border-ink/10 bg-ink/[0.03] px-2 py-0.5 text-xs uppercase">{post.tag}</span>
                <span className="text-ink/60 uppercase">{post.date}</span>
              </div>
              <h3 className="mt-4 text-xl leading-snug font-medium text-ink/90 underline-offset-4 group-hover:underline sm:text-2xl">
                {post.title}
              </h3>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid size-8 place-items-center bg-ink text-xs font-semibold text-white">JS</span>
                <div className="text-sm leading-tight">
                  <p className="font-medium text-ink">{author.name}</p>
                  <p className="text-xs text-ink/60">{author.role}</p>
                </div>
              </div>
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-neutral-200/70 px-4 py-24 text-center sm:py-28">
      <div className="bg-grid-light pointer-events-none absolute top-0 left-0 h-56 w-64 [mask-image:radial-gradient(circle_at_top_left,black,transparent_70%)]" />
      <div className="bg-grid-light pointer-events-none absolute right-0 bottom-0 h-44 w-64 [mask-image:radial-gradient(circle_at_bottom_right,black,transparent_70%)]" />
      <Reveal className="relative">
        <h2 className="text-3xl font-medium tracking-tight text-ink/85 sm:text-[40px]">Ready to Grow Your Business in India?</h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm text-ink/55">
          Whether you&apos;re entering the Indian market or expanding your existing operations, SRVPL provides the
          expertise, infrastructure, and execution needed to accelerate growth.
        </p>
        <ArrowButton variant="light" className="mt-6">
          Let&apos;s Build Together
        </ArrowButton>
      </Reveal>
    </section>
  )
}

const footerCols = [
  {
    title: 'Menu',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Services', href: '/solutions' },
      { label: 'Industries', href: '/industries' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'Facebook', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'X.com', href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-black px-4 py-20 text-white sm:px-6">
      <div className="mx-auto grid max-w-[1312px] gap-14 lg:grid-cols-[1fr_auto]">
        <Reveal>
          <h2 className="text-4xl leading-[1.05] font-medium tracking-tighter uppercase sm:text-[56px]">
            Let&apos;s build up
            <br />
            smarter growth?
          </h2>
          <ArrowButton variant="light" className="mt-8">
            Let&apos;s Build Together
          </ArrowButton>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-16 gap-y-10 text-[15px] sm:grid-cols-3">
          <div>
            <p className="uppercase">Location</p>
            <p className="mt-3 text-white/70">Kolkata, West Bengal, India.</p>
          </div>
          <div>
            <p className="uppercase">Phone</p>
            <a href="tel:+15551234567" className="mt-3 block text-white/70 hover:text-white">+1 (555) 123-4567</a>
          </div>
          <div>
            <p className="uppercase">Email</p>
            <a href="mailto:hello@informix.com" className="mt-3 block text-white/70 hover:text-white">hello@informix.com</a>
          </div>
          {footerCols.map((c) => (
            <div key={c.title}>
              <p className="uppercase">{c.title}</p>
              <ul className="mt-4 space-y-4 text-white/70">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} onClick={onLinkClick} className="transition-colors hover:text-white">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
