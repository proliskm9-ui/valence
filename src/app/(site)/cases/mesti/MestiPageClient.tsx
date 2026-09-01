'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { m, useReducedMotion, useScroll } from 'framer-motion';
import MestiCaseShowcase from '@/components/cases/MestiCaseShowcase';
import CaseOpenLink from '@/components/cases/CaseOpenLink';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { EASE_OUT_EXPO } from '@/lib/site';

const LIVE_URL = 'https://mestidelivery.com/';

function fadeUp(delay = 0) {
  return {
    initial: { y: 28, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: EASE_OUT_EXPO, delay },
  };
}

/**
 * Тот же покадровый showcase, что и в общей ленте на главной, но здесь у него
 * весь экран — без соседства со вторым кейсом. Скролл-прогресс считается
 * заново на своей высоте, а не как подотрезок общей 380vh-ленты.
 */
export default function MestiPageClient() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const pin = !reduced;
  const { t } = useLanguage();
  const cs = t.caseStudies.mesti;

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  return (
    <>
      <div ref={wrapRef} className="relative" style={{ height: pin ? '230vh' : 'auto' }}>
        <div
          className={
            pin
              ? 'sticky top-0 flex h-dvh flex-col overflow-hidden bg-bg pt-16 md:pt-20'
              : 'bg-bg px-5 pb-10 pt-32 md:px-10 md:pt-40'
          }
        >
          <div
            className={
              pin
                ? 'relative z-20 flex shrink-0 items-center justify-between gap-4 border-b border-line/30 bg-bg px-5 py-2.5 md:px-10 md:py-3'
                : 'relative z-20 flex items-center justify-between gap-4'
            }
          >
            <Link
              href="/cases"
              data-cursor="hover"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-fg md:text-[11px] md:tracking-[0.25em]"
            >
              ← {t.caseStudies.allCasesLabel}
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted md:text-[11px] md:tracking-[0.25em]">
              {cs.eyebrow}
            </p>
          </div>

          <div
            className={
              pin
                ? 'relative z-0 min-h-0 flex-1 overflow-hidden'
                : 'relative z-0 mt-10 h-[70vh] md:h-[78vh]'
            }
          >
            <div className="flex h-full items-stretch justify-center px-5 md:px-10">
              <MestiCaseShowcase
                progress={pin ? scrollYProgress : undefined}
                openLabel={t.cases.openCase}
                titleTag="h1"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <m.p
          {...fadeUp()}
          className="max-w-2xl text-[17px] leading-relaxed text-muted md:text-xl"
        >
          {cs.intro}
        </m.p>

        <div className="mt-14 grid gap-10 border-t border-line pt-14 md:mt-20 md:grid-cols-3 md:gap-10 md:pt-20">
          <m.div {...fadeUp(0)}>
            <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">
              {cs.problemTitle}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted md:text-base">
              {cs.problemBody}
            </p>
          </m.div>
          <m.div {...fadeUp(0.08)}>
            <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">
              {cs.solutionTitle}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted md:text-base">
              {cs.solutionBody}
            </p>
          </m.div>
          <m.div {...fadeUp(0.16)}>
            <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">
              {cs.resultTitle}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted md:text-base">
              {cs.resultBody}
            </p>
          </m.div>
        </div>

        <m.div {...fadeUp(0.22)} className="mt-14 flex flex-wrap items-center gap-4 md:mt-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            {cs.stackLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {cs.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-line bg-bg2 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
              >
                {item}
              </span>
            ))}
          </div>
          <CaseOpenLink href={LIVE_URL} label={t.cases.openSite} />
        </m.div>
      </section>

      <section className="border-t border-line px-5 py-16 md:px-10 md:py-24">
        <m.div {...fadeUp()}>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            {t.caseStudies.nextCaseLabel}
          </p>
          <Link
            href="/cases/zaz"
            data-cursor="view"
            className="group mt-4 flex items-center justify-between gap-6"
          >
            <h3 className="font-display text-4xl font-extrabold tracking-tight transition-colors group-hover:text-accent md:text-6xl">
              RETRO ZAZ
            </h3>
            <span className="shrink-0 text-3xl transition-transform group-hover:translate-x-2 md:text-5xl">
              →
            </span>
          </Link>
        </m.div>
      </section>

      <Footer />
    </>
  );
}
