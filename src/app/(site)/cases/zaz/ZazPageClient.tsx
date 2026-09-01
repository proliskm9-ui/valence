'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import ZazCaseShowcase from '@/components/cases/ZazCaseShowcase';
import CaseOpenLink from '@/components/cases/CaseOpenLink';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { TRANSLATIONS } from '@/lib/i18n';
import { EASE_OUT_EXPO } from '@/lib/site';

const LIVE_BASE = 'https://zazretro.web.app/';

function fadeUp(delay = 0) {
  return {
    initial: { y: 28, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: EASE_OUT_EXPO, delay },
  };
}

/**
 * У ZazCaseShowcase нет собственного скролл-скраба (в отличие от Mesti) —
 * это статичный, атмосферный макбук-мокап. Поэтому здесь ему просто отдаётся
 * весь экран без pinned-обёртки.
 */
export default function ZazPageClient() {
  const { t, lang } = useLanguage();
  const shotLang = lang === 'ru' ? 'ru' : 'en';
  const liveUrl = `${LIVE_BASE}?lang=${shotLang}`;
  const cs = t.caseStudies.zaz;
  const zaz = lang === 'ka' ? TRANSLATIONS.en.cases : t.cases;

  return (
    <>
      <div className="bg-bg px-5 pb-10 pt-32 md:px-10 md:pt-40">
        <div className="relative z-20 flex items-center justify-between gap-4">
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

        <div className="relative z-0 mt-10 h-[70vh] md:h-[78vh]">
          <div className="flex h-full items-stretch justify-center px-5 md:px-10">
            <ZazCaseShowcase titleTag="h1" />
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
          <CaseOpenLink href={liveUrl} label={zaz.openSite} />
        </m.div>
      </section>

      <section className="border-t border-line px-5 py-16 md:px-10 md:py-24">
        <m.div {...fadeUp()}>
          <Link
            href="/cases"
            data-cursor="view"
            className="group flex items-center justify-between gap-6"
          >
            <h3 className="font-display text-3xl font-extrabold tracking-tight transition-colors group-hover:text-accent md:text-5xl">
              {t.caseStudies.allCasesCta}
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
