'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, m, useInView, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';

function Counter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(decimals > 0 ? parseFloat(v.toFixed(decimals)) : Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, decimals, reduced]);

  return (
    <span
      ref={ref}
      className="whitespace-nowrap font-display text-[clamp(2.4rem,6vw,3.6rem)] font-black leading-none tracking-tight tabular-nums text-fg"
    >
      {decimals > 0 ? display.toFixed(decimals) : display}
      <span className="ml-1 text-[0.48em] font-extrabold text-accent">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const { lang } = useLanguage();

  return (
    <section id="stats" className="relative border-y border-white/8 bg-[#08080a] px-5 py-20 md:px-10 md:py-32">
      {/* Background Soft Accent Ambient */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[600px] rounded-full bg-accent/[0.03] blur-[140px]" />

      <div className="mx-auto max-w-6xl">
        {/* ── Section Header ── */}
        <div className="mb-12 flex flex-col items-start text-left sm:mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
            04 // {lang === 'en' ? 'METRICS' : lang === 'ka' ? 'მაჩვენებლები' : 'МЕТРИКИ И СТЕК'}
          </span>
          <h2 className="mt-2.5 font-display text-[clamp(1.65rem,4.5vw,2.4rem)] font-extrabold tracking-tight text-fg">
            <span>{lang === 'en' ? 'Engineering ' : lang === 'ka' ? 'ინჟინერია ' : 'Инженерия, '}</span>
            <span className="text-accent">
              {lang === 'en' ? 'that drives profit' : lang === 'ka' ? 'რომელიც მოგებას ზრდის' : 'которая приносит прибыль'}
            </span>
          </h2>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {/* Card 1: 100% Custom Architecture */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d10] p-6 transition-all duration-300 hover:border-accent/40 hover:bg-[#0f0f14]"
          >
            <div>
              <div className="flex items-center justify-between">
                <Counter value={100} suffix="%" />
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[9px] font-bold tracking-wider text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  0% TEMPLATES
                </span>
              </div>

              <h3 className="mt-5 font-display text-base font-bold tracking-tight text-fg group-hover:text-accent transition-colors duration-300">
                {lang === 'en' ? 'Pure Custom Code' : lang === 'ka' ? 'სუფთა კოდი' : 'Кастомный код'}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted/80">
                {lang === 'en'
                  ? 'Zero WordPress or generic builders. High-performance Next.js 15 & React 19.'
                  : lang === 'ka'
                  ? 'WordPress-ის გარეშე. სუფთა Next.js 15 და React 19 არქიტექტურა.'
                  : 'Без WordPress и шаблонных конструкторов. Чистая архитектура на Next.js 15.'}
              </p>
            </div>

            {/* Micro-Widget: Tech Stack Pills */}
            <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/8 pt-4">
              {['NEXT.JS', 'REACT', 'TAILWIND'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] font-semibold text-muted/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          </m.div>

          {/* Card 2: 3.2x Conversion Growth */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d10] p-6 transition-all duration-300 hover:border-accent/40 hover:bg-[#0f0f14]"
          >
            <div>
              <div className="flex items-center justify-between">
                <Counter value={3.2} suffix="x" decimals={1} />
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-accent">
                  ROI +220%
                </span>
              </div>

              <h3 className="mt-5 font-display text-base font-bold tracking-tight text-fg group-hover:text-accent transition-colors duration-300">
                {lang === 'en' ? 'Conversion Growth' : lang === 'ka' ? 'კონვერსიის ზრდა' : 'Рост конверсии'}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted/80">
                {lang === 'en'
                  ? 'Through deep customer journey analytics and 0.4s sub-second loading speed.'
                  : lang === 'ka'
                  ? 'მომხმარებლის ქცევის ანალიზით და მყისიერი ჩატვირთვის სიჩქარით.'
                  : 'За счёт анализа поведения клиентов и сверхбыстрой загрузки страниц.'}
              </p>
            </div>

            {/* Micro-Widget: Mini Sparkline Graph */}
            <div className="mt-6 border-t border-white/8 pt-4">
              <div className="flex items-end justify-between gap-1.5 h-7 px-1">
                {[
                  { h: '30%', label: '1x' },
                  { h: '50%', label: '1.6x' },
                  { h: '75%', label: '2.4x' },
                  { h: '100%', label: '3.2x', active: true },
                ].map((bar, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1 h-full justify-end">
                    <div
                      style={{ height: bar.h }}
                      className={`w-full rounded-sm transition-all duration-300 ${
                        bar.active
                          ? 'bg-accent shadow-[0_0_10px_rgba(255,77,0,0.6)]'
                          : 'bg-white/15 group-hover:bg-white/25'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </m.div>

          {/* Card 3: 24/7 CRM & Telegram Sync */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.19 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d10] p-6 transition-all duration-300 hover:border-accent/40 hover:bg-[#0f0f14]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="whitespace-nowrap font-display text-[clamp(2.4rem,6vw,3.6rem)] font-black leading-none tracking-tight text-fg">
                  24<span className="text-[0.55em] font-extrabold text-accent">/7</span>
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-1 font-mono text-[9px] font-bold tracking-wider text-sky-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                  REALTIME
                </span>
              </div>

              <h3 className="mt-5 font-display text-base font-bold tracking-tight text-fg group-hover:text-accent transition-colors duration-300">
                {lang === 'en' ? 'Instant Delivery' : lang === 'ka' ? 'მყისიერი შეტყობინება' : 'Синхронизация 24/7'}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted/80">
                {lang === 'en'
                  ? 'Direct lead alerts to Telegram and bi-directional CRM integration.'
                  : lang === 'ka'
                  ? 'შეტყობინებები პირდაპირ Telegram-ში და ავტომატური ინტეგრაცია CRM-თან.'
                  : 'Мгновенная доставка заявок в Telegram и автоматическая запись в вашу CRM.'}
              </p>
            </div>

            {/* Micro-Widget: Mini Telegram Lead Bubble */}
            <div className="mt-6 border-t border-white/8 pt-4">
              <div className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.02] px-2.5 py-1.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-[10px] text-accent font-bold">
                    ⚡
                  </span>
                  <span className="font-mono text-[10px] font-semibold text-fg">Новый лид</span>
                </div>
                <span className="font-mono text-[9px] text-muted">&lt; 1 сек</span>
              </div>
            </div>
          </m.div>

          {/* Card 4: 14 Days Fast Launch Sprint */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.26 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d10] p-6 transition-all duration-300 hover:border-accent/40 hover:bg-[#0f0f14]"
          >
            <div>
              <div className="flex items-center justify-between">
                <Counter value={14} suffix=" дн" />
                <span className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-muted">
                  SPRINT
                </span>
              </div>

              <h3 className="mt-5 font-display text-base font-bold tracking-tight text-fg group-hover:text-accent transition-colors duration-300">
                {lang === 'en' ? 'Launch Sprint' : lang === 'ka' ? 'გაშვების ვადა' : 'Срок запуска'}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted/80">
                {lang === 'en'
                  ? 'Fast time-to-market with milestones fixed and guaranteed by contract.'
                  : lang === 'ka'
                  ? 'სწრაფი გაშვება ხელშეკრულებით დაცული ეტაპებით და გარანტიით.'
                  : 'Поэтапный контроль разработки и фиксация дедлайнов в договоре.'}
              </p>
            </div>

            {/* Micro-Widget: Sprint Timeline Step Bar */}
            <div className="mt-6 border-t border-white/8 pt-4">
              <div className="flex items-center justify-between font-mono text-[9px] font-semibold text-muted">
                <span className="text-accent font-bold">Бриф</span>
                <span>→</span>
                <span>UI/UX</span>
                <span>→</span>
                <span className="text-emerald-400 font-bold">Релиз ✓</span>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
