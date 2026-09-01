'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { m, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Footer from '@/components/layout/Footer';
import Magnetic from '@/components/ui/Magnetic';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { EASE_OUT_EXPO } from '@/lib/site';

function fadeUp(delay = 0) {
  return {
    initial: { y: 28, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, ease: EASE_OUT_EXPO, delay },
  };
}

export default function ProcessPageClient() {
  const listRef = useRef<HTMLOListElement>(null);
  const { t } = useLanguage();
  const p = t.process;
  const pp = t.processPage;

  const STEPS = [
    { n: '01', title: p.step1Title, detail: pp.step1Detail },
    { n: '02', title: p.step2Title, detail: pp.step2Detail },
    { n: '03', title: p.step3Title, detail: pp.step3Detail },
    { n: '04', title: p.step4Title, detail: pp.step4Detail },
  ];

  const FAQ = [
    { q: pp.faq1Q, a: pp.faq1A },
    { q: pp.faq2Q, a: pp.faq2A },
    { q: pp.faq3Q, a: pp.faq3A },
  ];

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 75%', 'end 60%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <div className="px-5 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40">
        <SectionHeading as="h1" index={p.headingIndex} label={p.headingLabel} title={p.headingTitle} />
        <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-muted md:mt-10 md:text-base">
          {pp.intro}
        </p>
      </div>

      <section className="px-5 pb-20 md:px-10 md:pb-32">
        <div className="relative md:pl-10">
          <div className="absolute bottom-0 left-[7px] top-0 hidden w-px bg-line md:block">
            <m.div className="h-full w-px origin-top bg-accent" style={{ scaleY: lineScale }} />
          </div>

          <ol ref={listRef} className="flex flex-col gap-16 md:gap-24">
            {STEPS.map((step) => (
              <m.li
                key={step.n}
                {...fadeUp()}
                className="relative flex flex-col gap-4 md:max-w-2xl"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-accent">{step.n}</span>
                  <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {step.title}
                  </h2>
                </div>
                <p className="max-w-xl text-[15px] leading-relaxed text-muted md:text-base">
                  {step.detail}
                </p>
              </m.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line px-5 py-16 md:px-10 md:py-24">
        <m.p {...fadeUp()} className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          {pp.faqTitle}
        </m.p>

        <div className="mt-10 flex max-w-2xl flex-col md:mt-14">
          {FAQ.map((item, i) => (
            <m.div
              key={item.q}
              {...fadeUp(i * 0.06)}
              className="border-b border-line py-8 first:border-t"
            >
              <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                {item.q}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted md:text-base">{item.a}</p>
            </m.div>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <m.h2
            {...fadeUp()}
            className="font-display text-[clamp(2rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight"
          >
            {t.cta.line1} {t.cta.line2}
          </m.h2>
          <m.div {...fadeUp(0.12)}>
            <Magnetic>
              <Link
                href="/contact"
                data-cursor="hover"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-9 py-5 text-lg font-medium text-bg transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.97]"
              >
                {t.cta.btn}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
          </m.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
