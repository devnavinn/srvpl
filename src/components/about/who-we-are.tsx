import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Eyebrow, Reveal } from '@/components/home/shared'
import { missionVision } from './data'

export function ReadMore({ href = '#' }: { href?: string }) {
  return (
    <a href={href} className="group inline-flex items-center gap-3 border border-ink/15 py-1 pr-1 pl-4 text-[15px] text-ink">
      Read More
      <span className="grid size-8 place-items-center bg-ink/10 transition-colors group-hover:bg-ink group-hover:text-white">
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </a>
  )
}

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="relative overflow-hidden bg-white px-4 pt-20 pb-24 sm:px-6 sm:pt-28">
      <div className="bg-grid-light pointer-events-none absolute top-0 left-0 h-72 w-80 [mask-image:radial-gradient(circle_at_top_left,black,transparent_70%)]" />
      <div className="bg-grid-light pointer-events-none absolute top-0 right-0 h-72 w-80 [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-[1312px]">
        <div className="grid gap-4 border-b border-ink/15 pb-12 lg:grid-cols-[392px_1fr] lg:gap-x-0">
          <Reveal>
            <Eyebrow className="text-ink">Who we are</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl leading-[1.3] font-medium tracking-tight text-ink sm:text-[40px]">
              SRVPL sits at the intersection of three disciplines: Market Entry, Commerce Operations, and Technology.
            </h2>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-[392px_1fr]">
          <Reveal delay={0.1} className="mt-12 max-w-[590px] lg:col-start-2">
            <p className="text-base leading-snug text-ink/70">
              We simplify brand launches and drive growth through compliance, distribution, commerce, and connected
              technology.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-8">
          {missionVision.map((m, i) => (
            <Reveal key={m.tag} delay={i * 0.12} className="grid gap-6 sm:grid-cols-[292px_1fr] sm:gap-8">
              <div className="group overflow-hidden rounded-2xl bg-neutral-200">
                <motion.img
                  initial={{ scale: 1.15 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  src={m.src}
                  alt=""
                  className="aspect-[292/265] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <p className="flex items-center gap-2 text-[15px] text-ink">
                  <span className="size-2 bg-brand" aria-hidden />
                  {m.tag}
                </p>
                <h3 className="mt-3 max-w-[260px] text-2xl leading-tight font-medium tracking-tight text-ink">{m.title}</h3>
                <p className="mt-6 max-w-[300px] text-sm leading-snug text-ink/70">{m.body}</p>
                <div className="mt-8 sm:mt-auto">
                  <ReadMore />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
