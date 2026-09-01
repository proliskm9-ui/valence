'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Stats from '@/components/sections/Stats';
import Footer from '@/components/layout/Footer';
import Magnetic from '@/components/ui/Magnetic';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { EASE_OUT_EXPO } from '@/lib/site';

function fadeUp(delay = 0) {
  return {
    initial: { y: 28, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: EASE_OUT_EXPO, delay },
  };
}

export default function AboutPageClient() {
  const { t } = useLanguage();
  const a = t.about;

  const VALUES = [
    { n: '01', title: a.v1Title, desc: a.v1Desc },
    { n: '02', title: a.v2Title, desc: a.v2Desc },
    { n: '03', title: a.v3Title, desc: a.v3Desc },
    { n: '04', title: a.v4Title, desc: a.v4Desc },
  ];

  return (
    <>
      <div className="px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
        <SectionHeading as="h1" index={a.headingIndex} label={a.headingLabel} title={a.headingTitle} />
        <m.p
          {...fadeUp(0.1)}
          className="mt-8 max-w-xl text-[17px] leading-relaxed text-muted md:mt-10 md:text-xl"
        >
          {a.lead}
        </m.p>
      </div>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <m.p
          {...fadeUp()}
          className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted"
        >
          {a.valuesTitle}
        </m.p>

        <ul className="mt-10 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 md:mt-14 md:gap-10 md:pt-14">
          {VALUES.map((v, i) => (
            <m.li key={v.n} {...fadeUp(i * 0.08)} className="flex flex-col gap-3">
              <span className="font-mono text-xs text-accent">{v.n}</span>
              <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                {v.title}
              </h3>
              <p className="max-w-md text-[15px] leading-relaxed text-muted md:text-base">
                {v.desc}
              </p>
            </m.li>
          ))}
        </ul>
      </section>

      <Stats />

      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <m.h2
            {...fadeUp()}
            className="font-display text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight md:col-span-7"
          >
            {a.diffTitle}
          </m.h2>
          <m.p
            {...fadeUp(0.12)}
            className="max-w-md text-[15px] leading-relaxed text-muted md:col-span-5 md:text-base"
          >
            {a.diffBody}
          </m.p>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-32">
        <m.h2
          {...fadeUp()}
          className="font-display text-[clamp(2.25rem,7vw,6rem)] font-extrabold leading-[1.02] tracking-tight"
        >
          {a.ctaTitle}
        </m.h2>
        <m.div {...fadeUp(0.15)} className="mt-8 flex flex-col gap-6 md:mt-12 md:max-w-sm">
          <p className="text-[15px] leading-relaxed text-muted">{a.ctaSub}</p>
          <Magnetic className="w-fit">
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
      </section>

      <Footer />
    </>
  );
}
