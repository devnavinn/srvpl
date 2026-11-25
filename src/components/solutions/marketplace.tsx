import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { Eyebrow, Reveal } from '@/components/home/shared'
import { ReadMore } from '@/components/about/who-we-are'
import { channels } from './data'

export function Marketplace() {
  const [open, setOpen] = useState(0)

  return (
    <section id="marketplace" className="bg-white px-4 py-24 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-[1312px]">
        <div className="grid gap-4 border-b border-ink/15 pb-12 lg:grid-cols-[392px_1fr] lg:gap-x-0">
          <Reveal>
            <Eyebrow className="text-ink">Marketplace</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-[540px] text-3xl leading-[1.3] font-medium tracking-tight text-ink sm:text-[40px]">
              Seamless Commerce Across Every Channel
            </h2>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-[392px_1fr]">
          <Reveal delay={0.1} className="mt-12 mb-4 max-w-[670px] lg:col-start-2">
            <p className="text-base leading-snug text-ink/70">
              From rapid delivery to direct sales and unified operations, we build connected commerce experiences that
              help brands reach more customers and grow faster.
            </p>
          </Reveal>
        </div>

        <ul>
          {channels.map((c, i) => {
            const isOpen = open === i
            const Icon = c.icon
            return (
              <li key={c.title} className="border-b border-ink/15 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group grid w-full grid-cols-[1fr_auto] items-start gap-6 py-8 text-left lg:grid-cols-[392px_1fr_auto]"
                >
                  <span className="relative flex gap-6 pl-7">
                    <motion.span
                      className="absolute top-0 left-0 w-1 bg-brand"
                      initial={false}
                      animate={{ height: isOpen ? '100%' : '0%' }}
                      transition={{ duration: 0.4 }}
                    />
                    <span className="pt-1 text-ink/70">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="block text-[22px] tracking-tight text-ink">{c.title}</span>
                      <span className="mt-1 block text-ink/45">Management</span>
                    </span>
                  </span>
                  <AnimatePresence initial={false}>
                    {!isOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hidden max-w-[670px] pt-1 text-[15px] leading-snug text-ink/70 lg:block"
                      >
                        {c.summary}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="col-start-2 grid size-11 place-items-center rounded-full bg-neutral-200 text-ink transition-colors group-hover:bg-ink group-hover:text-white lg:col-start-3"
                  >
                    <Plus className="size-5" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-10 pb-12 lg:grid-cols-[392px_418px_1fr] lg:gap-0">
                        <div className="lg:pl-[70px]">
                          <p className="text-[22px] font-medium text-ink">Services:</p>
                          <ul className="mt-6 space-y-3">
                            {c.services.map((s, k) => (
                              <motion.li
                                key={s}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 + k * 0.06 }}
                                className="flex items-center gap-6 text-ink/70"
                              >
                                <span className="size-2 rounded-full bg-brand" /> {s}
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <motion.div
                          initial={{ scale: 0.96, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.5 }}
                          className="grid aspect-[418/276] place-items-center overflow-hidden rounded-[28px] bg-[#e8f4ff]"
                        >
                          {c.image ? (
                            <img src={c.image} alt="" className="size-full object-cover" />
                          ) : (
                            <Icon className="size-28 text-ink/70" strokeWidth={0.9} />
                          )}
                        </motion.div>

                        <div className="flex flex-col lg:pl-14">
                          <p className="flex items-center gap-2 text-[15px] text-ink">
                            <span className="size-2 bg-brand" aria-hidden />
                            {c.tag}
                          </p>
                          <h3 className="mt-3 max-w-[280px] text-2xl leading-tight font-medium tracking-tight text-ink">
                            {c.headline}
                          </h3>
                          <p className="mt-8 max-w-[360px] text-sm leading-snug text-ink/70">{c.body}</p>
                          <div className="mt-8 lg:mt-auto">
                            <ReadMore />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
