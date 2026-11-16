'use client'

import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { useI18n } from '@/i18n/I18nProvider'
import { cn } from '@/lib/utils'
import {
  contactReasons,
  contactSchema,
  fieldErrors,
  MESSAGE_MAX,
  type ContactErrorCode,
  type ContactField,
} from '@/lib/validation/contact'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Values = { name: string; email: string; reason: string; message: string; company: string }

const empty: Values = { name: '', email: '', reason: '', message: '', company: '' }

const inputClass =
  'w-full rounded-xl border bg-surface px-4 py-3 text-[0.95rem] text-text placeholder:text-subtle transition-[border-color,box-shadow] outline-none focus:border-accent focus:ring-4 focus:ring-accent/15'

export function ContactForm() {
  const id = useId()
  const { dict, locale, profile } = useI18n()
  const t = dict.contact.form
  const [values, setValues] = useState<Values>(empty)
  const [errors, setErrors] = useState<Partial<Record<ContactField, ContactErrorCode>>>({})
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverMessage, setServerMessage] = useState('')
  /** When the visitor first typed; sent with the message so the server can reject instant bot submissions. */
  const [startedAt, setStartedAt] = useState<number | null>(null)

  // The timing check belongs to the server, so local validation passes any timestamp.
  const validate = (v: Values) => {
    const result = contactSchema.safeParse({ ...v, startedAt: 1 })
    return result.success ? {} : fieldErrors(result.error)
  }

  function update(field: keyof Values, value: string) {
    if (startedAt === null) setStartedAt(Date.now())
    const next = { ...values, [field]: value }
    setValues(next)
    if (field !== 'company' && touched[field]) setErrors(validate(next))
  }

  function blur(field: ContactField) {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validate(values))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const found = validate(values)
    setTouched({ name: true, email: true, reason: true, message: true })
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`${id}-${Object.keys(found)[0]}`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, startedAt: startedAt ?? Date.now(), locale }),
      })
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
        fields?: typeof errors
      }
      if (res.ok && data.ok) {
        setStatus('sent')
        setValues(empty)
        setTouched({})
        return
      }
      if (data.fields) setErrors(data.fields)
      setServerMessage(
        data.error === 'rate_limited'
          ? t.errors.rateLimited
          : data.error === 'not_configured'
            ? t.errors.notConfigured
            : data.error === 'invalid'
              ? t.errors.invalid
              : t.errors.failed
      )
      setStatus('error')
    } catch {
      setServerMessage(t.errors.offline)
      setStatus('error')
    }
  }

  const field = (name: ContactField) => ({
    id: `${id}-${name}`,
    name,
    'aria-invalid': !!errors[name] && !!touched[name],
    'aria-describedby': errors[name] && touched[name] ? `${id}-${name}-error` : undefined,
    onBlur: () => blur(name),
  })

  const errorText = (name: ContactField) =>
    errors[name] && touched[name] ? (
      <p
        id={`${id}-${name}-error`}
        className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400"
      >
        <AlertCircle className="size-3.5 shrink-0" aria-hidden /> {t.errors[errors[name]]}
      </p>
    ) : null

  const borderFor = (name: ContactField) =>
    errors[name] && touched[name] ? 'border-red-500/70' : 'border-border hover:border-border-strong'

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <motion.div
            key="sent"
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-112 flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
              className="grid size-16 place-items-center rounded-full bg-accent-2-soft text-accent-2"
            >
              <CheckCircle2 className="size-8" aria-hidden />
            </motion.span>
            <h3 className="mt-5 text-xl font-semibold text-text">{t.sentTitle}</h3>
            <p className="mt-2 max-w-sm text-muted">{t.sentBody}</p>
            <button
              type="button"
              onClick={() => {
                setStatus('idle')
                setStartedAt(null)
              }}
              className="mt-6 text-sm font-medium text-accent hover:underline"
            >
              {t.sendAnother}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-name`} className="mb-1.5 block text-sm font-medium text-text">
                  {t.name}
                </label>
                <input
                  {...field('name')}
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => update('name', e.target.value)}
                  className={cn(inputClass, borderFor('name'))}
                  placeholder={t.namePlaceholder}
                />
                {errorText('name')}
              </div>
              <div>
                <label htmlFor={`${id}-email`} className="mb-1.5 block text-sm font-medium text-text">
                  {t.email}
                </label>
                <input
                  {...field('email')}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={values.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={cn(inputClass, borderFor('email'))}
                  placeholder={t.emailPlaceholder}
                />
                {errorText('email')}
              </div>
            </div>

            <fieldset>
              <legend className="mb-2 text-sm font-medium text-text">{t.reason}</legend>
              <div
                className="flex flex-wrap gap-2"
                role="radiogroup"
                aria-describedby={errors.reason && touched.reason ? `${id}-reason-error` : undefined}
              >
                {contactReasons.map((r) => {
                  const selected = values.reason === r
                  return (
                    <label
                      key={r}
                      className={cn(
                        'cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors has-focus-visible:ring-4 has-focus-visible:ring-accent/20',
                        selected
                          ? 'border-accent bg-accent-soft text-accent'
                          : 'border-border text-muted hover:border-border-strong hover:text-text'
                      )}
                    >
                      <input
                        type="radio"
                        name="reason"
                        id={r === contactReasons[0] ? `${id}-reason` : undefined}
                        value={r}
                        checked={selected}
                        onChange={() => {
                          setTouched((t) => ({ ...t, reason: true }))
                          update('reason', r)
                        }}
                        className="sr-only"
                      />
                      {t.reasons[r]}
                    </label>
                  )
                })}
              </div>
              {errorText('reason')}
            </fieldset>

            <div>
              <div className="mb-1.5 flex items-baseline justify-between">
                <label htmlFor={`${id}-message`} className="text-sm font-medium text-text">
                  {t.message}
                </label>
                <span
                  className={cn(
                    'font-mono text-xs',
                    values.message.length > MESSAGE_MAX ? 'text-red-600 dark:text-red-400' : 'text-subtle'
                  )}
                  aria-live="polite"
                >
                  {values.message.length}/{MESSAGE_MAX}
                </span>
              </div>
              <textarea
                {...field('message')}
                rows={6}
                value={values.message}
                onChange={(e) => update('message', e.target.value)}
                className={cn(inputClass, 'resize-y', borderFor('message'))}
                placeholder={t.messagePlaceholder}
              />
              {errorText('message')}
            </div>

            {/* Honeypot: hidden from people and screen readers; bots tend to fill it in. */}
            <div aria-hidden className="absolute -start-[9999px] h-px w-px overflow-hidden">
              <label htmlFor={`${id}-company`}>{t.honeypot}</label>
              <input
                id={`${id}-company`}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.company}
                onChange={(e) => update('company', e.target.value)}
              />
            </div>

            <AnimatePresence>
              {status === 'error' ? (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="flex gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                    <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
                    <span>
                      {serverMessage} {t.emailDirectly}{' '}
                      <a href={`mailto:${profile.email}`} dir="ltr" className="font-medium underline">
                        {profile.email}
                      </a>
                      .
                    </span>
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <p className="text-xs text-subtle">{t.privacy}</p>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group/button inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-accent-contrast shadow-card transition-[background-color,transform] hover:bg-accent-hover active:scale-[0.98] disabled:opacity-70"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden /> {t.sending}
                  </>
                ) : (
                  <>
                    {t.send}
                    <Send
                      className="size-4 transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover/button:-translate-x-0.5"
                      aria-hidden
                    />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
