import { useRef, useState, type DragEvent, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, CheckCircle2, ChevronDown, CloudUpload, FileText, Loader2, X } from 'lucide-react'
import { Field, inputCls } from '@/components/contact/form'
import { cn } from '@/lib/utils'
import { departments, positions } from './data'

/** jlsmiths /api/careers endpoint; applications appear in the jlsmiths admin under Messages. */
const API_URL = import.meta.env.VITE_CAREERS_API_URL as string | undefined

const MAX_BYTES = 5 * 1024 * 1024
const ACCEPT = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Key = 'name' | 'email' | 'position' | 'department' | 'resume' | 'message' | 'consent'
type Errors = Partial<Record<Key, string>>

function checkResume(file: File) {
  if (file.size > MAX_BYTES) return 'Resumes must be 5 MB or smaller.'
  if (!/\.(pdf|docx?)$/i.test(file.name)) return 'Upload a PDF, DOC or DOCX file.'
  return null
}

export function ApplyForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [message, setMessage] = useState('')
  const [resume, setResume] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  const pickResume = (file: File | undefined) => {
    if (!file) return
    const problem = checkResume(file)
    setErrors((e) => ({ ...e, resume: problem ?? undefined }))
    setResume(problem ? null : file)
  }
  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    setDragging(false)
    pickResume(e.dataTransfer.files[0])
  }
  const clearResume = () => {
    setResume(null)
    if (fileInput.current) fileInput.current.value = ''
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const get = (k: string) => String(data.get(k) ?? '').trim()

    const found: Errors = {}
    if (!get('name')) found.name = 'Full name is required.'
    if (!get('email')) found.email = 'Email is required.'
    else if (!EMAIL_RE.test(get('email'))) found.email = 'Enter a valid email address.'
    if (!get('position')) found.position = 'Choose a position.'
    if (!get('department')) found.department = 'Choose a department.'
    if (!get('message')) found.message = 'Message is required.'
    if (data.get('consent') !== 'on') found.consent = 'Please agree so we can process your application.'
    setErrors(found)
    if (Object.keys(found).length) {
      setStatus('error')
      setMessage('Please check the highlighted fields.')
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }
    if (!API_URL) {
      setStatus('error')
      setMessage('Applications are not configured yet. Please email us your CV directly.')
      return
    }

    // The dropped file lives in state, so set it explicitly rather than relying on the input.
    data.delete('resume')
    if (resume) data.set('resume', resume)
    data.set('source', 'srvpl')

    setStatus('sending')
    try {
      const res = await fetch(API_URL, { method: 'POST', body: data })
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: Errors }
      if (!res.ok || !body.ok) {
        setErrors(body.errors ?? {})
        setStatus('error')
        setMessage(body.message ?? "Sorry, we couldn't send your application right now. Please try again.")
        return
      }
      form.reset()
      clearResume()
      setStatus('sent')
    } catch {
      setStatus('error')
      setMessage("Sorry, we couldn't reach our server. Please try again or email us your CV directly.")
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
            className="flex min-h-[520px] flex-col items-start justify-center"
            role="status"
          >
            <CheckCircle2 className="size-10 text-brand" strokeWidth={1.5} />
            <h3 className="mt-6 text-2xl font-medium tracking-tight text-ink">Thanks — your application is in.</h3>
            <p className="mt-3 max-w-md text-[15px] text-ink/60">
              Our team reviews every application. If your profile is a fit, we’ll be in touch about next steps.
            </p>
            <button onClick={() => setStatus('idle')} className="mt-8 text-sm text-brand underline-offset-4 hover:underline">
              Submit another application
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-2xl font-medium tracking-tight text-ink">Tell us about yourself</h3>
            <p className="mt-2 text-xs text-ink/55">Fields marked * are required.</p>

            <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
              <Field label="Full name" required error={errors.name}>
                <input name="name" autoComplete="name" placeholder="Your name" className={inputCls} aria-invalid={!!errors.name} />
              </Field>
              <Field label="Email" required error={errors.email}>
                <input name="email" type="email" autoComplete="email" placeholder="Your email" className={inputCls} aria-invalid={!!errors.email} />
              </Field>
              <Field label="Phone number">
                <input name="phone" type="tel" autoComplete="tel" placeholder="Include country code" className={inputCls} />
              </Field>
              <Field label="Location">
                <input name="location" autoComplete="address-level2" placeholder="City, country" className={inputCls} />
              </Field>
              <Field label="Position applied for" required error={errors.position}>
                <Select name="position" placeholder="Select position applied for" options={positions} invalid={!!errors.position} />
              </Field>
              <Field label="Department" required error={errors.department}>
                <Select name="department" placeholder="Select department" options={departments} invalid={!!errors.department} />
              </Field>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-ink/85">Upload resume</p>
              <input
                ref={fileInput}
                id="resume"
                name="resume"
                type="file"
                accept={ACCEPT}
                className="sr-only"
                onChange={(e) => pickResume(e.target.files?.[0])}
              />
              {resume ? (
                <div className="mt-3 flex items-center gap-3 rounded-sm border border-ink/10 bg-white px-4 py-3.5 text-sm text-ink">
                  <FileText className="size-5 shrink-0 text-brand" />
                  <span className="min-w-0 flex-1 truncate">{resume.name}</span>
                  <span className="shrink-0 text-xs text-ink/50">{(resume.size / 1024 / 1024).toFixed(1)} MB</span>
                  <button type="button" onClick={clearResume} aria-label="Remove resume" className="text-ink/50 hover:text-ink">
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="resume"
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragging(true)
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  className={cn(
                    'mt-3 flex cursor-pointer items-center justify-center gap-4 rounded-sm border border-dashed px-4 py-5 transition-colors',
                    dragging ? 'border-brand bg-brand/5' : 'border-ink/30 hover:border-ink/50',
                    errors.resume && 'border-red-400',
                  )}
                >
                  <CloudUpload className="size-7 text-ink/70" strokeWidth={1.5} />
                  <span>
                    <span className="block text-sm text-ink/80">Click to upload or drag and drop</span>
                    <span className="block text-xs text-ink/50">PDF, DOC, or DOCX (Max 5MB)</span>
                  </span>
                </label>
              )}
              {errors.resume && <p className="mt-1.5 text-xs text-red-600">{errors.resume}</p>}
            </div>

            <div className="mt-6">
              <Field label="Message" required error={errors.message} full>
                <textarea
                  name="message"
                  rows={4}
                  maxLength={3000}
                  placeholder="Tell us about your experience and what you’re looking for…"
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
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-sm bg-ink py-3.5 text-sm text-white disabled:opacity-70"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send Message
                  <span className="grid size-4 place-items-center rounded-full bg-white text-ink">
                    <ArrowRight className="size-3" strokeWidth={2.5} />
                  </span>
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function Select({ name, placeholder, options, invalid }: { name: string; placeholder: string; options: string[]; invalid: boolean }) {
  return (
    <div className="relative">
      <select name={name} defaultValue="" required aria-invalid={invalid} className={cn(inputCls, 'appearance-none pr-10 invalid:text-ink/45')}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink/60" />
    </div>
  )
}
