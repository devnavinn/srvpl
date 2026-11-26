import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Minus, Plus } from 'lucide-react'
import { Reveal } from '@/components/home/shared'
import { onLinkClick } from '@/lib/router'
import { cn } from '@/lib/utils'
import { contactDetails, faqs, nextSteps } from './data'
import { ContactForm } from './form'

const EASE = [0.22, 1, 0.36, 1] as const

function Kicker({ children, className }: { children: string; className?: string }) {
  return <p className={cn('text-xs font-medium tracking-[0.2em] uppercase', className)}>{children}</p>
}

export function ContactIntro() {
  const details = [
    { label: 'Email', value: contactDetails.email, href: `mailto:${contactDetails.email}` },
    { label: 'Phone', value: contactDetails.phone, href: `tel:${contactDetails.phone.replace(/[^\d+]/g, '')}` },
    { label: 'Location', value: contactDetails.location },
  ]
  return (
    <section id="contact-form" className="bg-white px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-[1312px] gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
        <Reveal>
          <Kicker className="text-brand">Start a conversation</Kicker>
          <h2 className="mt-5 text-4xl leading-[1.25] font-medium tracking-tight text-ink sm:text-[44px]">
            Big ambitions.
            <br />
            Let’s talk.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-snug text-ink/60">
            Whether you’re entering a new market or ready to scale, we’d love to hear what you have in mind.
          </p>

          <dl className="mt-14 space-y-10">
            {details.map((d) => (
              <div key={d.label}>
                <dt className="text-xs font-medium tracking-[0.2em] text-ink/70 uppercase">{d.label}</dt>
                <dd className="mt-3 max-w-md text-sm leading-snug text-ink">
                  {d.href ? (
                    <a href={d.href} className="hover:text-brand">
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-14 text-[15px] text-ink/60">Looking for your next role?</p>
          <a href="/#careers" onClick={onLinkClick} className="mt-1.5 inline-flex items-center gap-1 text-[15px] text-brand hover:underline">
            Explore careers at SRVPL <ArrowUpRight className="size-4" />
          </a>
        </Reveal>

        <Reveal delay={0.1} className="w-full lg:w-[650px]">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}

export function NextSteps() {
  return (
    <section className="bg-[#111821] px-4 py-20 text-white sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-[1312px] gap-12 lg:grid-cols-[1fr_auto]">
        <Reveal>
          <h2 className="text-3xl leading-snug font-medium tracking-tight sm:text-[34px]">
            Good conversations.
            <br />
            Clear next steps.
          </h2>
        </Reveal>
        <ol className="grid gap-10 sm:grid-cols-3 sm:gap-8 lg:w-[820px]">
          {nextSteps.map((s, i) => (
            <Reveal key={s.title} delay={0.1 * i}>
              <li>
                <p className="text-xs font-medium tracking-[0.2em] text-brand-light">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-5 max-w-[200px] text-xl leading-snug font-medium">{s.title}</h3>
                <p className="mt-6 max-w-[220px] text-sm leading-snug text-white/65">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-[1312px] gap-12 lg:grid-cols-[1fr_760px]">
        <Reveal>
          <Kicker className="text-brand">A little more clarity</Kicker>
          <h2 className="mt-5 text-4xl leading-[1.25] font-medium tracking-tight text-ink sm:text-[44px]">
            Before we
            <br />
            get started.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="border-t border-ink/10">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <li key={f.q} className="border-b border-ink/10">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg text-ink"
                  >
                    {f.q}
                    {isOpen ? <Minus className="size-4 shrink-0 text-brand" /> : <Plus className="size-4 shrink-0 text-brand" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[640px] pb-10 text-sm leading-relaxed text-ink/60">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
