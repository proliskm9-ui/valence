'use client';

import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Magnetic from '@/components/ui/Magnetic';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { rateLimitReason, submitLead } from '@/lib/leads';
import { SITE, EASE_OUT_EXPO } from '@/lib/site';

type Status = 'idle' | 'loading' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'contact' | 'message', string>>;

const inputCls =
  'w-full border-b border-line bg-transparent py-4 text-lg outline-none transition-colors placeholder:text-muted/40 focus:border-accent';



function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
        {label}
        {error && <span className="normal-case tracking-normal text-[#ff6b6b] font-medium">{error}</span>}
      </span>
      {children}
    </label>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [errorText, setErrorText] = useState('');
  const { t } = useLanguage();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading') return; // Защита от повторных кликов

    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get('company')) {
      setStatus('success');
      return;
    }

    const name = (data.get('name') as string)?.trim() || '';
    const contact = (data.get('contact') as string)?.trim() || '';
    const message = (data.get('message') as string)?.trim() || '';
    const customBudget = (data.get('custom_budget') as string)?.trim();
    const budgetRadio = (data.get('budget') as string) || '';
    const budget = customBudget || budgetRadio || 'Не указан';

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = 'укажите имя';
    if (!contact) nextErrors.contact = 'укажите контакты';
    if (!message) nextErrors.message = 'опишите задачу';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setStatus('loading');
    setErrorText('');

    const res = await submitLead({ name, contact, message, budget });
    if (res.ok) {
      setStatus('success');
      form.reset();
    } else {
      setStatus('error');
      setErrorText(rateLimitReason(res.reason));
    }
  };

  return (
    <section id="contact" className="px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <SectionHeading index={t.contact.headingIndex} label={t.contact.headingLabel} title={t.contact.headingTitle} />
          <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-muted md:text-base">
            {t.contact.subtitle}
          </p>

          <div className="mt-12 flex flex-col gap-3 font-mono text-sm">
            <a
              href={`mailto:${SITE.email}`}
              data-cursor="hover"
              className="w-fit text-fg transition-colors hover:text-accent"
            >
              {SITE.email}
            </a>
            <a
              href={SITE.telegram}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="w-fit text-muted transition-colors hover:text-fg"
            >
              telegram →
            </a>
          </div>
        </div>

        <div className="md:col-span-7">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <m.div
                key="success"
                initial={{ y: 32, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                className="flex min-h-[24rem] flex-col justify-center"
              >
                <svg viewBox="0 0 52 52" className="h-14 w-14" aria-hidden>
                  <m.circle
                    cx="26"
                    cy="26"
                    r="24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                  <m.path
                    d="M15 27l8 8 15-17"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, ease: 'easeOut', delay: 0.45 }}
                  />
                </svg>
                <h3 className="mt-8 font-display text-3xl font-extrabold tracking-tight md:text-5xl">
                  {t.contact.successTitle}
                </h3>
                <p className="mt-4 max-w-sm leading-relaxed text-muted">
                  {t.contact.successSub}
                </p>
                <button
                  type="button"
                  data-cursor="hover"
                  onClick={() => setStatus('idle')}
                  className="mt-8 w-fit font-mono text-[11px] uppercase tracking-[0.22em] text-muted underline-offset-4 transition-colors hover:text-fg"
                >
                  {t.contact.btnAgain}
                </button>
              </m.div>
            ) : (
              <m.form
                key="form"
                onSubmit={onSubmit}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="flex flex-col gap-8"
                noValidate
              >
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />

                <Field label={t.contact.nameLabel} error={errors.name}>
                  <input
                    type="text"
                    name="name"
                    maxLength={100}
                    placeholder={t.contact.namePlaceholder}
                    className={`${inputCls} ${errors.name ? 'border-[#ff6b6b]' : ''}`}
                    onChange={() => setErrors((e) => ({ ...e, name: undefined }))}
                  />
                </Field>

                <Field label={t.contact.contactLabel} error={errors.contact}>
                  <input
                    type="text"
                    name="contact"
                    maxLength={150}
                    placeholder={t.contact.contactPlaceholder}
                    className={`${inputCls} ${errors.contact ? 'border-[#ff6b6b]' : ''}`}
                    onChange={() => setErrors((e) => ({ ...e, contact: undefined }))}
                  />
                </Field>

                <Field label={t.contact.messageLabel} error={errors.message}>
                  <textarea
                    name="message"
                    rows={3}
                    maxLength={1500}
                    placeholder={t.contact.messagePlaceholder}
                    className={`${inputCls} resize-none ${errors.message ? 'border-[#ff6b6b]' : ''}`}
                    onChange={() => setErrors((e) => ({ ...e, message: undefined }))}
                  />
                </Field>

                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-muted mb-3">
                    {t.contact.budgetLabel}
                  </span>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {t.contact.budgets.map((b) => (
                      <label key={b} className="group cursor-pointer">
                        <input type="radio" name="budget" value={b} className="peer sr-only" />
                        <span className="block rounded-full border border-line bg-bg2/50 px-4 py-2 font-mono text-xs text-muted transition-all peer-checked:border-accent peer-checked:bg-accent peer-checked:text-bg group-hover:border-fg/40">
                          {b}
                        </span>
                      </label>
                    ))}
                  </div>
                  <input
                    type="text"
                    name="custom_budget"
                    maxLength={100}
                    placeholder="или впишите свой бюджет (например: 150 000 ₽)"
                    className={inputCls}
                  />
                </div>

                {status === 'error' && (
                  <p className="font-mono text-xs text-[#ff6b6b]">{errorText}</p>
                )}

                <div className="pt-4">
                  <Magnetic>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      data-cursor="hover"
                      className="group relative inline-flex items-center gap-3 rounded-full bg-accent px-9 py-5 text-base font-medium text-bg transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.97] disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg border-t-transparent" />
                          <span>{t.contact.sending}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.contact.btnSend}</span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </>
                      )}
                    </button>
                  </Magnetic>
                </div>
              </m.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
