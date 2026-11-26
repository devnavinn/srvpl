import { ArrowRight } from 'lucide-react'
import { ArrowButton, Reveal } from './shared'
import { onLinkClick } from '@/lib/router'
import { articles } from '@/components/insights/data'
import { ArticleRail } from '@/components/insights/card'

export function Insights() {
  return (
    <ArticleRail
      id="insights"
      eyebrow="Insights"
      title="Latest Industry Insights"
      posts={articles}
      className="py-24 sm:py-32"
      action={
        <a
          href="/insights"
          onClick={onLinkClick}
          className="group flex items-center gap-3 self-start border border-ink/15 py-1 pr-1 pl-4 text-[15px] text-ink sm:self-auto"
        >
          See all articles
          <span className="grid size-8 place-items-center bg-ink/10 transition-colors group-hover:bg-ink group-hover:text-white">
            <ArrowRight className="size-4" />
          </span>
        </a>
      }
    />
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
