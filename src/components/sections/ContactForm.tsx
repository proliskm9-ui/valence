'use client';

import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import Magnetic from '@/components/ui/Magnetic';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { rateLimitReason, submitLead } from '@/lib/leads';
import { SITE, EASE_OUT_EXPO } from '@/lib/site';

type Status = 'idle' | 'loading' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'contact' | 'message', string>>;

const inputCls =
  'w-full border-b border-white/15 bg-transparent py-3 text-base md:text-lg text-fg outline-none transition-colors placeholder:text-muted/30 focus:border-accent font-sans';

const PROJECT_TYPES = [
  'Лендинг',
  'Многостраничный сайт',
  'Интернет-магазин',
  'Веб-сервис / PWA',
  'Telegram-бот',
];

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
      <span className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        <span>{label}</span>
        {error && <span className="normal-case tracking-normal text-red-400 font-medium">{error}</span>}
      </span>
      {children}
    </label>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [errorText, setErrorText] = useState('');
  const [selectedType, setSelectedType] = useState<string>('Лендинг');
  const { lang } = useLanguage();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading') return;

    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get('company')) {
      setStatus('success');
      return;
    }

    const name = (data.get('name') as string)?.trim() || '';
    const contact = (data.get('contact') as string)?.trim() || '';
    const rawMessage = (data.get('message') as string)?.trim() || '';
    const budget = 'Прямая заявка с формы';

    const message = `[Тип проекта: ${selectedType}]\n${rawMessage}`.trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = 'Укажите ваше имя';
    if (!contact) nextErrors.contact = 'Укажите контакт для связи';

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
    <section id="contact" className="relative px-5 py-20 md:px-10 md:py-32">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute left-1/3 bottom-10 h-[400px] w-[600px] rounded-full bg-accent/[0.03] blur-[140px]" />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* ── Left Column: Clean Headline & Direct Contacts ── */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                <span>05 // {lang === 'en' ? 'CONTACT' : lang === 'ka' ? 'კონტაქტი' : 'КОНТАКТ'}</span>
              </div>

              <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight text-fg">
                <span>Есть проект?</span>
                <br />
                <span className="text-accent drop-shadow-[0_0_35px_rgba(255,77,0,0.35)]">
                  Запустим его.
                </span>
              </h2>

              <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-muted/90 sm:text-[14.5px]">
                {lang === 'en'
                  ? 'Describe your idea or select the project type. We will calculate the estimate and propose a strategy within 15 minutes.'
                  : lang === 'ka'
                  ? 'აღწერეთ თქვენი იდეა ან აირჩიეთ პროექტის ტიპი. მოგიმზადებთ შეთავაზებას 15 წუთში.'
                  : 'Опишите задачу или выберите тип проекта. Рассчитаем точную смету и предложим решение в течение 15 минут.'}
              </p>
            </div>

            {/* Clean Direct Channels (No bulky box) */}
            <div className="mt-8 flex flex-col gap-3 font-mono text-xs">
              <a
                href={SITE.telegram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="group flex items-center gap-2.5 text-muted transition-colors hover:text-fg"
              >
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="font-bold text-fg">TELEGRAM:</span>
                <span className="text-muted group-hover:text-accent transition-colors">@valencedigital →</span>
              </a>

              <a
                href={`mailto:${SITE.email}`}
                data-cursor="hover"
                className="group flex items-center gap-2.5 text-muted transition-colors hover:text-fg"
              >
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="font-bold text-fg">EMAIL:</span>
                <span className="text-muted group-hover:text-accent transition-colors">{SITE.email}</span>
              </a>
            </div>
          </div>

          {/* ── Right Column: Single-Choice Form ── */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <m.div
                  key="success"
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                  className="flex min-h-[22rem] flex-col justify-center rounded-3xl border border-accent/40 bg-[#0d0d10] p-8 text-left shadow-[0_0_30px_rgba(255,77,0,0.1)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent shadow-[0_0_15px_rgba(255,77,0,0.5)]">
                    <span className="font-mono text-lg font-bold">✓</span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-black tracking-tight text-fg md:text-3xl">
                    Заявка принята в работу!
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                    Мы уже анализируем ваш запрос. Наш ведущий специалист свяжется с вами в течение 15 минут со сметой и предложением.
                  </p>
                  <button
                    type="button"
                    data-cursor="hover"
                    onClick={() => setStatus('idle')}
                    className="mt-8 w-fit font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent transition-colors hover:text-fg"
                  >
                    ← Отправить ещё одну заявку
                  </button>
                </m.div>
              ) : (
                <m.form
                  key="form"
                  onSubmit={onSubmit}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                  className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-[#0d0d10] p-6 backdrop-blur-xl sm:p-8"
                  noValidate
                >
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />

                  {/* 01 // Single Selection Project Type Radio Pills */}
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-3">
                      01 // ТИП ПРОЕКТА
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_TYPES.map((type) => {
                        const active = selectedType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setSelectedType(type)}
                            className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] transition-all ${
                              active
                                ? 'border-accent bg-accent text-[#0a0a0b] font-bold shadow-[0_0_12px_rgba(255,77,0,0.4)]'
                                : 'border-white/12 bg-white/[0.03] text-muted hover:border-white/25 hover:text-fg'
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 02 & 03 // Inputs */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="02 // ВАШЕ ИМЯ" error={errors.name}>
                      <input
                        type="text"
                        name="name"
                        maxLength={100}
                        placeholder="Александр"
                        className={`${inputCls} ${errors.name ? 'border-red-400' : ''}`}
                        onChange={() => setErrors((e) => ({ ...e, name: undefined }))}
                      />
                    </Field>

                    <Field label="03 // TELEGRAM / WHATSAPP" error={errors.contact}>
                      <input
                        type="text"
                        name="contact"
                        maxLength={150}
                        placeholder="@username или +7..."
                        className={`${inputCls} ${errors.contact ? 'border-red-400' : ''}`}
                        onChange={() => setErrors((e) => ({ ...e, contact: undefined }))}
                      />
                    </Field>
                  </div>

                  {/* 04 // Task details */}
                  <Field label="04 // ОПИСАНИЕ ЗАДАЧИ">
                    <textarea
                      name="message"
                      rows={2}
                      maxLength={1500}
                      placeholder="Расскажите в 2 словах о проекте или прикрепите ссылку на референс..."
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  {status === 'error' && (
                    <p className="font-mono text-xs text-red-400">{errorText}</p>
                  )}

                  <div className="pt-2">
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        data-cursor="hover"
                        className="group relative flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-accent px-9 py-4 text-center font-display text-sm font-bold text-bg shadow-[0_0_25px_rgba(255,77,0,0.35)] transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(255,77,0,0.5)] active:scale-[0.97] disabled:opacity-60"
                      >
                        {status === 'loading' ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg border-t-transparent" />
                            <span>ОТПРАВЛЯЕМ...</span>
                          </>
                        ) : (
                          <>
                            <span>ОТПРАВИТЬ ЗАЯВКУ НА РАСЧЁТ</span>
                            <span className="transition-transform duration-300 group-hover:translate-x-1 font-bold">
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
      </div>
    </section>
  );
}
