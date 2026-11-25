import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Eyebrow, Reveal } from '@/components/home/shared'
import { reasons } from './data'

function ReasonIcon({ kind }: { kind: 'check' | 'lens' }) {
  return (
    <span className="grid size-[58px] shrink-0 place-items-center rounded-lg bg-ink text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
      <svg viewBox="0 0 32 32" className="size-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden>
        {kind === 'check' ? (
          <>
            <path d="M16 3 29 16 16 29 3 16Z" />
            <path d="m10.5 16 4 4 7-8" strokeLinecap="round" />
          </>
        ) : (
          <>
            <rect x="5" y="5" width="22" height="22" rx="7" />
            <rect x="11" y="11" width="10" height="10" rx="3" />
            <path d="M16 5v3M16 24v3" strokeLinecap="round" />
          </>
        )}
      </svg>
    </span>
  )
}

export function WhyUs() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section className="bg-white px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="mx-auto grid max-w-[1312px] items-center gap-14 lg:grid-cols-[603px_1fr] lg:gap-20">
        <Reveal y={40}>
          <div ref={ref} className="overflow-hidden rounded-[28px]">
            <motion.img
              style={{ y, scale: 1.12 }}
              src="/about/why-us.png"
              alt="68,000+ total global users across the USA, India and the UAE"
              className="aspect-[603/553] w-full object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow className="text-ink">Why choose us</Eyebrow>
            <h2 className="mt-3 text-3xl leading-[1.3] font-medium tracking-tight text-ink sm:text-[40px]">
              What Makes SRVPL
              <br />
              Different
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-x-10 gap-y-14 sm:mt-24 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08} className="group">
                <div className="flex items-center gap-5">
                  <ReasonIcon kind={r.icon} />
                  <h3 className="max-w-[160px] text-[22px] leading-tight font-medium tracking-tight text-ink">{r.title}</h3>
                </div>
                <p className="mt-9 max-w-[270px] text-[15px] leading-snug text-ink/70">{r.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
