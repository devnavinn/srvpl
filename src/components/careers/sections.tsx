import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { CircleCheck, FileText, Mail, Users } from 'lucide-react'
import { Eyebrow, Reveal } from '@/components/home/shared'
import { ApplyForm } from './apply-form'
import { applySteps, lifeColumns, reasons } from './data'

const EASE = [0.22, 1, 0.36, 1] as const

export function WhyJoin() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section ref={ref} id="why-join" className="relative overflow-hidden bg-white py-12 sm:py-20">
      <div className="bg-grid-light pointer-events-none absolute top-0 right-0 h-72 w-96 [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_100%_100%,rgb(51_85_184/0.16),transparent_70%)]" />

      <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Photo bleeds off the left edge, like the mockup */}
        <Reveal y={40} className="pr-4 sm:pr-6 lg:pr-0">
          <div className="overflow-hidden rounded-r-md">
            <motion.img
              src="/careers/why-join.png"
              alt="Two SRVPL colleagues walking through the office"
              style={{ y: imgY, scale: 1.12 }}
              className="aspect-[756/486] w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="px-4 sm:px-6 lg:pr-[max(1.5rem,calc((100vw-1312px)/2+1.5rem))] lg:pl-0">
          <Reveal>
            <Eyebrow className="text-xs text-ink">Why choose us</Eyebrow>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-ink sm:text-[40px]">Why Join SRVPL?</h2>
          </Reveal>
          <ul className="mt-10 max-w-lg space-y-7">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={0.1 * i}>
                <li>
                  <p className="flex items-center gap-2.5 text-[17px] font-medium text-ink">
                    <CircleCheck className="size-5 shrink-0 text-brand" strokeWidth={1.75} />
                    {r.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-snug text-ink/65">{r.body}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function LifeAtSrvpl() {
  return (
    <section className="bg-[#232323] py-16 text-white sm:py-20">
      <Reveal className="text-center">
        <Eyebrow className="justify-center text-xs">Life at SRVPL</Eyebrow>
        <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-[40px]">Life at SRVPL</h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-2.5 sm:mt-12 lg:h-[466px] lg:grid-cols-4">
        {lifeColumns.map((col, c) => (
          <div key={c} className="grid min-h-0 gap-2.5" style={{ gridTemplateRows: `repeat(${col.length}, minmax(0, 1fr))` }}>
            {col.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: c * 0.1 + i * 0.12, ease: EASE }}
                className="group min-h-0 overflow-hidden"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="size-full min-h-[160px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

const stepIcons = [FileText, Users, Mail]

export function ApplySection() {
  return (
    <section id="apply" className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_55%_at_0%_50%,rgb(51_85_184/0.07),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-[1312px] items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
        <Reveal>
          <Eyebrow className="text-xs text-ink">Join us</Eyebrow>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-ink sm:text-[40px]">Apply to join us</h2>
          <p className="mt-6 max-w-md text-sm leading-snug text-ink/55">
            We’re always looking for talented individuals who share our passion for innovation and excellence. Take the
            next step in your career with Smith Retail Ventures.
          </p>
          <ol className="mt-10 space-y-7">
            {applySteps.map((s, i) => {
              const Icon = stepIcons[i]
              return (
                <li key={s.title} className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-ink text-white">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium text-ink">{s.title}</span>
                    <span className="mt-0.5 block text-[13px] text-ink/60">{s.body}</span>
                  </span>
                </li>
              )
            })}
          </ol>
        </Reveal>

        <Reveal delay={0.1} className="w-full lg:w-[700px]">
          <ApplyForm />
        </Reveal>
      </div>
    </section>
  )
}
