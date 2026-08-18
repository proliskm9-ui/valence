'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, m, useInView, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { EASE_OUT_EXPO } from '@/lib/site';

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span
      ref={ref}
      className="whitespace-nowrap font-display text-[clamp(2.6rem,7vw,6rem)] font-extrabold leading-none tracking-tight tabular-nums"
    >
      {display}
      <span className="text-[0.45em] text-accent">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const { t } = useLanguage();

  const STATS = [
    { value: 27, suffix: '', label: t.stats.s1 },
    { value: 6, suffix: '', label: t.stats.s2 },
    { value: 14, suffix: t.stats.s3Suffix, label: t.stats.s3 },
    { value: 40, suffix: '+', label: t.stats.s4 },
  ];

  return (
    <section id="stats" className="border-y border-line">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <m.div
            key={s.label}
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.08 }}
            className={`flex flex-col gap-4 px-6 py-12 md:px-10 md:py-16 ${
              i > 0 ? 'border-line md:border-l' : ''
            } ${i % 2 ? 'border-l border-line md:border-l' : ''} ${
              i > 1 ? 'border-t border-line md:border-t-0' : ''
            }`}
          >
            <Counter value={s.value} suffix={s.suffix} />
            <span className="max-w-[16rem] text-sm leading-snug text-muted">
              {s.label}
            </span>
          </m.div>
        ))}
      </div>
    </section>
  );
}
