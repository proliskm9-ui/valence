'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { EASE_OUT_EXPO } from '@/lib/site';

export default function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const { t } = useLanguage();

  const STEPS = [
    {
      n: '01',
      t: t.process.step1Title,
      d: t.process.step1Desc,
    },
    {
      n: '02',
      t: t.process.step2Title,
      d: t.process.step2Desc,
    },
    {
      n: '03',
      t: t.process.step3Title,
      d: t.process.step3Desc,
    },
    {
      n: '04',
      t: t.process.step4Title,
      d: t.process.step4Desc,
    },
  ];

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 70%', 'end 55%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <SectionHeading index={t.process.headingIndex} label={t.process.headingLabel} title={t.process.headingTitle} />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted md:mt-10">
              {t.process.headingDesc}
            </p>
          </div>
        </div>

        <div className="relative md:col-span-7">
          {/* линия прогресса */}
          <div className="absolute bottom-0 left-[7px] top-0 hidden w-px bg-line md:block">
            <m.div
              className="h-full w-px origin-top bg-accent"
              style={{ scaleY: lineScale }}
            />
          </div>

          <ol ref={listRef} className="flex flex-col gap-14 md:gap-20 md:pl-10">
            {STEPS.map((s) => (
              <m.li
                key={s.n}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                className="relative flex flex-col gap-3"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-accent">{s.n}</span>
                  <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                    {s.t}
                  </h3>
                </div>
                <p className="max-w-xl text-[15px] leading-relaxed text-muted md:text-base">
                  {s.d}
                </p>
              </m.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
