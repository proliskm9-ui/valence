'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { submitLead } from '@/lib/leads';

export function openEstimator() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open_estimator'));
  }
}

export default function CostEstimatorModal() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [projectType, setProjectType] = useState('Лендинг / Промо-сайт');
  const [niche, setNiche] = useState('Услуги и B2B');
  const [features, setFeatures] = useState<string[]>(['Индивидуальный 3D и кинематика', 'Интеграция с Telegram и CRM']);
  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState<'Telegram' | 'WhatsApp' | 'Звонок'>('Telegram');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStep(1);
      setError('');
    };
    window.addEventListener('open_estimator', handleOpen);
    return () => window.removeEventListener('open_estimator', handleOpen);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const PROJECT_TYPES = [
    { id: 'landing', label: 'Лендинг / Промо-сайт', desc: 'Высокая конверсия, 3D-кинематика' },
    { id: 'multi', label: 'Корпоративный сайт', desc: 'Многостраничная структура, разделы, SEO' },
    { id: 'shop', label: 'Интернет-магазин', desc: 'Каталог, корзина, онлайн-оплата' },
    { id: 'service', label: 'Веб-сервис / PWA', desc: 'Личные кабинеты, сложная логика' },
    { id: 'bot', label: 'Telegram-бот / ИИ', desc: 'Автоматизации, интеграции с CRM' },
  ];

  const NICHES = [
    'Услуги и B2B',
    'E-commerce и Ритейл',
    'Недвижимость и Строительство',
    'Рестораны и Доставка',
    'IT, Сервисы и Стартапы',
    'Другая сфера',
  ];

  const FEATURES_LIST = [
    'Индивидуальный 3D и кинематика',
    'Интеграция с Telegram и CRM',
    'Онлайн-оплата (карты, СБП, USDT)',
    'PWA-версия для смартфонов',
    'Срочный запуск (до 10 дней)',
  ];

  const toggleFeature = (feat: string) => {
    setFeatures((prev) => (prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) {
      setError('Пожалуйста, укажите контакт для связи');
      return;
    }

    setLoading(true);
    setError('');

    const message = `[КВИЗ-РАСЧЁТ СТОИМОСТИ]\nТип проекта: ${projectType}\nНиша: ${niche}\nОпции: ${features.join(', ')}\nКанал связи: ${contactMethod}`;

    const res = await submitLead({
      name: name.trim() || 'Клиент из Квиза',
      contact: `${contactMethod}: ${contact.trim()}`,
      message,
      budget: 'Запрос расчёта сметы',
    });

    setLoading(false);

    if (res.ok) {
      setStep(5); // Success step
    } else {
      setError(res.reason || 'Ошибка при отправке. Попробуйте еще раз.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-white/12 bg-[#0c0c10]/98 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(255,77,0,0.1)] sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted transition-colors hover:border-white/30 hover:text-fg"
              aria-label="Закрыть"
            >
              ✕
            </button>

            {/* Header / Progress Bar */}
            {step < 5 && (
              <div className="mb-6 pr-10">
                <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                  <span className="text-accent">РАСЧЁТ СТОИМОСТИ</span>
                  <span>Шаг {step} из 4</span>
                </div>

                {/* Progress Segments */}
                <div className="mt-2.5 flex gap-1.5">
                  {[1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        s <= step ? 'bg-accent shadow-[0_0_8px_rgba(255,77,0,0.6)]' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── STEP 1: Type of project ── */}
            {step === 1 && (
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-fg sm:text-2xl">
                  Какой тип проекта вам нужен?
                </h3>
                <p className="mt-1 text-xs text-muted">Выберите наиболее подходящий вариант</p>

                <div className="mt-5 flex flex-col gap-2.5">
                  {PROJECT_TYPES.map((pt) => (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => setProjectType(pt.label)}
                      className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                        projectType === pt.label
                          ? 'border-accent bg-accent/[0.08] shadow-[0_0_15px_rgba(255,77,0,0.15)]'
                          : 'border-white/8 bg-white/[0.02] hover:border-white/20'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-display text-sm font-bold text-fg">{pt.label}</span>
                        <span className="text-[11px] text-muted">{pt.desc}</span>
                      </div>
                      <div
                        className={`flex h-4.5 w-4.5 items-center justify-center rounded-full border ${
                          projectType === pt.label ? 'border-accent bg-accent text-[#0a0a0b]' : 'border-white/20'
                        }`}
                      >
                        {projectType === pt.label && <span className="h-2 w-2 rounded-full bg-[#0a0a0b]" />}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-display text-sm font-bold text-bg shadow-[0_0_25px_rgba(255,77,0,0.4)] transition-transform active:scale-95 sm:w-auto sm:px-7"
                  >
                    <span>Далее</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: Niche ── */}
            {step === 2 && (
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-fg sm:text-2xl">
                  Какая у вас ниша бизнеса?
                </h3>
                <p className="mt-1 text-xs text-muted">Это поможет предложить правильную структуру и функционал</p>

                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  {NICHES.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setNiche(n)}
                      className={`flex h-16 items-center justify-center rounded-xl border p-3 text-center text-xs font-semibold transition-all ${
                        niche === n
                          ? 'border-accent bg-accent/[0.08] text-fg shadow-[0_0_15px_rgba(255,77,0,0.15)] font-bold'
                          : 'border-white/8 bg-white/[0.02] text-muted hover:border-white/20 hover:text-fg'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-xl border border-white/10 px-5 py-3 text-xs font-semibold text-muted hover:text-fg"
                  >
                    ← Назад
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-display text-sm font-bold text-bg shadow-[0_0_25px_rgba(255,77,0,0.4)] transition-transform active:scale-95 sm:flex-initial sm:px-7"
                  >
                    <span>Далее</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Features ── */}
            {step === 3 && (
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-fg sm:text-2xl">
                  Что нужно внедрить в проект?
                </h3>
                <p className="mt-1 text-xs text-muted">Можно выбрать несколько опций</p>

                <div className="mt-5 flex flex-col gap-2.5">
                  {FEATURES_LIST.map((feat) => {
                    const isChecked = features.includes(feat);
                    return (
                      <button
                        key={feat}
                        type="button"
                        onClick={() => toggleFeature(feat)}
                        className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-xs font-semibold transition-all ${
                          isChecked
                            ? 'border-accent/80 bg-accent/[0.07] text-fg font-bold'
                            : 'border-white/8 bg-white/[0.02] text-muted hover:border-white/20 hover:text-fg'
                        }`}
                      >
                        <span>{feat}</span>
                        <div
                          className={`flex h-4.5 w-4.5 items-center justify-center rounded-md border text-[11px] ${
                            isChecked ? 'border-accent bg-accent text-[#0a0a0b] font-black' : 'border-white/20'
                          }`}
                        >
                          {isChecked && '✓'}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="rounded-xl border border-white/10 px-5 py-3 text-xs font-semibold text-muted hover:text-fg"
                  >
                    ← Назад
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-display text-sm font-bold text-bg shadow-[0_0_25px_rgba(255,77,0,0.4)] transition-transform active:scale-95 sm:flex-initial sm:px-7"
                  >
                    <span>Далее</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 4: Contacts ── */}
            {step === 4 && (
              <form onSubmit={handleSubmit}>
                <h3 className="font-display text-xl font-bold tracking-tight text-fg sm:text-2xl">
                  Куда отправить точный расчёт?
                </h3>
                <p className="mt-1 text-xs text-muted">
                  Подготовим предварительную смету и ответим в течение 15 минут
                </p>

                {/* Messenger Choice Pills */}
                <div className="mt-4 flex gap-2">
                  {(['Telegram', 'WhatsApp', 'Звонок'] as const).map((mth) => (
                    <button
                      key={mth}
                      type="button"
                      onClick={() => setContactMethod(mth)}
                      className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition-all ${
                        contactMethod === mth
                          ? 'border-accent bg-accent text-[#0a0a0b] shadow-[0_0_12px_rgba(255,77,0,0.4)]'
                          : 'border-white/10 bg-white/[0.03] text-muted hover:border-white/20'
                      }`}
                    >
                      {mth === 'Telegram' && '✈️'}
                      {mth === 'WhatsApp' && '💬'}
                      {mth === 'Звонок' && '📞'}
                      <span>{mth}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <div>
                    <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-muted">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Александр"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm text-fg placeholder:text-muted/40 focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-muted">
                      {contactMethod === 'Telegram'
                        ? 'Ник в Telegram или номер'
                        : contactMethod === 'WhatsApp'
                        ? 'Номер WhatsApp'
                        : 'Номер телефона'}
                    </label>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder={contactMethod === 'Telegram' ? '@username или +7...' : '+7 (999) 000-00-00'}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm text-fg placeholder:text-muted/40 focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="rounded-xl border border-white/10 px-5 py-3 text-xs font-semibold text-muted hover:text-fg"
                  >
                    ← Назад
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-display text-sm font-bold text-bg shadow-[0_0_25px_rgba(255,77,0,0.4)] transition-transform active:scale-95 disabled:opacity-50 sm:flex-initial sm:px-7"
                  >
                    {loading ? 'Отправка...' : 'Получить точный расчёт →'}
                  </button>
                </div>
              </form>
            )}

            {/* ── STEP 5: Success Screen ── */}
            {step === 5 && (
              <div className="flex flex-col items-center py-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent/15 text-3xl text-accent shadow-[0_0_25px_rgba(255,77,0,0.5)]">
                  ✓
                </div>

                <h3 className="mt-5 font-display text-2xl font-black tracking-tight text-fg">
                  Заявка на расчёт принята!
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  Мы уже анализируем параметры вашего проекта. Наш ведущий специалист напишет в{' '}
                  <strong className="text-fg">{contactMethod}</strong> в течение 15 минут со сметой и предложением.
                </p>

                <div className="mt-5 rounded-xl border border-white/8 bg-white/[0.02] p-3 font-mono text-xs text-muted">
                  ⚡ Ориентировочный срок реализации: <strong className="text-accent">от 7 до 14 дней</strong>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mt-6 w-full rounded-xl bg-accent py-3.5 font-display text-sm font-bold text-bg shadow-[0_0_25px_rgba(255,77,0,0.4)] transition-transform active:scale-95"
                >
                  Отлично, жду!
                </button>
              </div>
            )}
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
