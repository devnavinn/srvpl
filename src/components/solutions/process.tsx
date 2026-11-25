import { motion } from 'motion/react'
import { Eyebrow, Reveal } from '@/components/home/shared'
import { processSteps } from './data'

const gridLines =
  'bg-[linear-gradient(to_right,rgb(91_123_224/0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgb(91_123_224/0.14)_1px,transparent_1px)] bg-[size:40px_40px]'

export function Process() {
  return (
    <section className="relative overflow-hidden bg-[#19191b] px-4 py-24 text-white sm:px-6 sm:py-28">
      <div className={`pointer-events-none absolute top-0 left-0 h-72 w-80 ${gridLines} [mask-image:radial-gradient(circle_at_top_left,black,transparent_70%)]`} />
      <div className={`pointer-events-none absolute top-0 right-0 h-72 w-80 ${gridLines} [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]`} />

      <div className="relative mx-auto max-w-[1312px]">
        <Reveal className="text-center">
          <Eyebrow className="justify-center text-white">Our Process</Eyebrow>
          <h2 className="mt-3 text-3xl leading-[1.3] font-medium tracking-tight sm:text-[40px]">
            Our Strategic Work
            <br />
            Process
          </h2>
        </Reveal>

        <div className="relative mt-16 sm:mt-20">
          {/* Connector that draws across the four steps as the row comes into view. */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[37px] right-[12%] left-[37px] hidden h-px origin-left bg-gradient-to-r from-brand-light/70 via-white/20 to-transparent lg:block"
          />

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: 0.15 + i * 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative"
                >
                  <div className="relative inline-grid size-[74px] place-items-center rounded-2xl bg-white text-ink transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
                    <Icon className="size-9" strokeWidth={1.5} />
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.18, type: 'spring', stiffness: 400, damping: 18 }}
                      className="absolute -top-3.5 -right-3.5 grid size-8 place-items-center rounded-full bg-[#2c4aa6] text-sm ring-4 ring-[#19191b]"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </motion.span>
                  </div>
                  <h3 className="mt-11 text-[22px] font-medium tracking-tight">{s.title}</h3>
                  <p className="mt-4 max-w-[240px] text-[15px] leading-snug text-white/70">{s.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
