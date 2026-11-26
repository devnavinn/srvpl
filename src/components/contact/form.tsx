import { useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { interests } from './data'

/** jlsmiths /api/contact endpoint; messages appear in the jlsmiths admin under Messages. */
const API_URL = import.meta.env.VITE_CONTACT_API_URL as string | undefined

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'interest' | 'message' | 'consent', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(v: Record<string, string>, consent: boolean): Errors {
  const e: Errors = {}
  if (!v.name) e.name = 'Full name is required.'
  if (!v.email) e.email = 'Work email is required.'
  else if (!EMAIL_RE.test(v.email)) e.email = 'Enter a valid email address.'
  if (!v.interest) e.interest = "Choose what you're interested in."
  if (!v.message) e.message = 'Message is required.'
  if (!consent) e.consent = 'Please accept the privacy policy.'
  return e
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [message, setMessage] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const values = Object.fromEntries(
      ['name', 'email', 'phone', 'company', 'interest', 'message', 'website'].map((k) => [k, String(data.get(k) ?? '').trim()]),
    )
    const consent = data.get('consent') === 'on'

    const found = validate(values, consent)
    setErrors(found)
    if (Object.keys(found).length) {
      setStatus('error')
      setMessage('Please check the highlighted fields.')
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }
    if (!API_URL) {
      setStatus('error')
      setMessage('The contact form is not configured yet. Please email us directly.')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, consent, source: 'srvpl' }),
      })
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: Errors }
      if (!res.ok || !body.ok) {
        setErrors(body.errors ?? {})
        setStatus('error')
        setMessage(body.message ?? "Sorry, we couldn't send your message right now. Please try again.")
        return
      }
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
      setMessage("Sorry, we couldn't reach our server. Please try again or email us directly.")
    }
  }

  return (
    <div className="relative rounded-xl bg-[#f3f4f6] p-6 sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[480px] flex-col items-start justify-center"
            role="status"
          >
            <CheckCircle2 className="size-10 text-brand" strokeWidth={1.5} />
            <h3 className="mt-6 text-2xl font-medium tracking-tight text-ink">Thanks — your message is on its way.</h3>
            <p className="mt-3 max-w-md text-[15px] text-ink/60">
              Our team will review it and get back to you within two working days.
            </p>
            <button onClick={() => setStatus('idle')} className="mt-8 text-sm text-brand underline-offset-4 hover:underline">
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-2xl font-medium tracking-tight text-ink">Tell us about your project</h3>
            <p className="mt-2 text-xs text-ink/55">Fields marked * are required.</p>

            <div className="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2">
              <Field label="Full name" required error={errors.name}>
                <input name="name" autoComplete="name" placeholder="Your name" className={inputCls} aria-invalid={!!errors.name} />
              </Field>
              <Field label="Work email" required error={errors.email}>
                <input name="email" type="email" autoComplete="email" placeholder="you@company.com" className={inputCls} aria-invalid={!!errors.email} />
              </Field>
              <Field label="Phone number">
                <input name="phone" type="tel" autoComplete="tel" placeholder="Include country code" className={inputCls} />
              </Field>
              <Field label="Company">
                <input name="company" autoComplete="organization" placeholder="Your company" className={inputCls} />
              </Field>
              <Field label="I’m interested in" required error={errors.interest} full>
                <div className="relative">
                  <select name="interest" defaultValue="" className={cn(inputCls, 'appearance-none pr-10 invalid:text-ink/45')} required aria-invalid={!!errors.interest}>
                    <option value="" disabled>
                      Select a solution
                    </option>
                    {interests.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink/60" />
                </div>
              </Field>
              <Field label="Message" required error={errors.message} full>
                <textarea
                  name="message"
                  rows={4}
                  maxLength={3000}
                  placeholder="Tell us about your goals, challenges and timeline…"
                  className={cn(inputCls, 'resize-y py-4')}
                  aria-invalid={!!errors.message}
                />
              </Field>
            </div>

            {/* Honeypot: hidden from people, tempting to bots. */}
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px opacity-0" />

            <label className="mt-6 flex items-start gap-3 text-xs text-ink/60">
              <input name="consent" type="checkbox" className="mt-0.5 size-4 shrink-0 accent-brand" aria-invalid={!!errors.consent} />
              I agree to the processing of my personal data as described in the Privacy Policy.
            </label>
            {errors.consent && <p className="mt-2 text-xs text-red-600">{errors.consent}</p>}

            {status === 'error' && message && (
              <p role="alert" className="mt-6 text-sm text-red-600">
                {message}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-medium tracking-wide text-white uppercase disabled:opacity-70"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send message <ArrowUpRight className="size-4" />
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export const inputCls =
  'w-full rounded-sm border border-transparent bg-white px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/45 focus:border-brand/50 focus:ring-3 focus:ring-brand/15 aria-[invalid=true]:border-red-400'

export function Field({
  label,
  required,
  error,
  full,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  full?: boolean
  children: ReactNode
}) {
  return (
    <label className={cn('block', full && 'sm:col-span-2')}>
      <span className="text-sm font-medium text-ink/85">
        {label}
        {required && ' *'}
      </span>
      <span className="mt-3 block">{children}</span>
      {error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}
    </label>
  )
}
