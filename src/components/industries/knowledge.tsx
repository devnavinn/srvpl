import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Eyebrow, Reveal } from '@/components/home/shared'
import { cn } from '@/lib/utils'
import { knowledge, knowledgeIcons } from './data'

const gridLines =
  'bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:40px_40px]'

export function IndustryKnowledge() {
  const [open, setOpen] = useState(0)

  return (
    <section className="relative overflow-hidden bg-[#19191b] px-4 py-24 text-white sm:px-6">
      <div className={`pointer-events-none absolute right-0 bottom-0 h-[420px] w-80 ${gridLines} [mask-image:radial-gradient(circle_at_bottom_right,black,transparent_75%)]`} />

      <div className="relative mx-auto grid max-w-[1312px] gap-14 lg:grid-cols-[1fr_612px] lg:gap-10">
        <Reveal>
          <Eyebrow className="text-white">Industry Knowledge</Eyebrow>
          <h2 className="mt-3 max-w-[420px] text-3xl leading-[1.15] font-medium tracking-tight sm:text-[40px]">
            Every Category Has Its Own Playbook.
          </h2>
          <div className="mt-12 max-w-[500px] space-y-6 text-sm leading-snug text-white/85">
            <p>
              A product&apos;s success depends on more than what it does. It depends on who it serves, how customers
              discover it, what drives their decisions and where it fits within the market.
            </p>
            <p>
              From category positioning and pricing to distribution and customer experience, we understand that every
              industry requires a different approach.
            </p>
          </div>

          <div className="mt-16 inline-grid grid-cols-6 overflow-hidden rounded-sm border border-white/15">
            {knowledgeIcons.map(({ label, icon: Icon }, i) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.07 }}
                title={label}
                className="group relative grid h-12 w-12 place-items-center border-r border-white/15 transition-colors last:border-r-0 hover:bg-white hover:text-ink sm:w-[81px]"
              >
                <Icon className="size-5 transition-transform group-hover:scale-110" strokeWidth={1.5} />
                <span className="pointer-events-none absolute -top-9 rounded bg-white px-2 py-1 text-xs whitespace-nowrap text-ink opacity-0 transition-opacity group-hover:opacity-100">
                  {label}
                </span>
              </motion.span>
            ))}
          </div>
        </Reveal>

        <div className="space-y-2">
          {knowledge.map((k, i) => {
            const isOpen = open === i
            return (
              <Reveal key={k.title} delay={i * 0.08}>
                <div
                  className={cn(
                    'rounded-md border transition-colors duration-300',
                    isOpen ? 'border-white/15 bg-white/[0.035]' : 'border-white/10 hover:border-white/25',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-3 p-5 text-left"
                  >
                    <span className="rounded-md bg-white/15 px-2.5 py-1 text-xl font-light">/{String(i + 1).padStart(2, '0')}/</span>
                    <span className="text-lg font-medium sm:text-xl">{k.title}</span>
                    {/* + collapses to − when open */}
                    <span className="relative ml-auto grid size-6 place-items-center" aria-hidden>
                      <span className="absolute h-[1.5px] w-5 bg-white" />
                      <motion.span
                        initial={false}
                        animate={{ scaleY: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute h-5 w-[1.5px] bg-white"
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          <p className="max-w-[480px] text-sm text-white/85">{k.body}</p>
                          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                            <ul className="space-y-1 text-sm text-white/85">
                              {k.points.map((p, j) => (
                                <motion.li
                                  key={p}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.15 + j * 0.06 }}
                                  className="flex items-center gap-2.5"
                                >
                                  <span className="size-1 rounded-full bg-white/80" /> {p}
                                </motion.li>
                              ))}
                            </ul>
                            {k.src && (
                              <motion.img
                                src={k.src}
                                alt=""
                                initial={{ opacity: 0, scale: 0.94 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="w-[211px] rounded-md"
                              />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
