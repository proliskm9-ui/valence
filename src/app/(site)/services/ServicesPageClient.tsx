'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
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

export default function ServicesPageClient() {
  const { t } = useLanguage();
  const s = t.services;
  const sp = t.servicesPage;

  const SERVICES = [
    { n: '01', title: s.s1Title, desc: s.s1Desc, meta: s.s1Meta, forWhom: sp.s1For, includes: sp.s1Includes, timeline: sp.s1Timeline },
    { n: '02', title: s.s2Title, desc: s.s2Desc, meta: s.s2Meta, forWhom: sp.s2For, includes: sp.s2Includes, timeline: sp.s2Timeline },
    { n: '03', title: s.s3Title, desc: s.s3Desc, meta: s.s3Meta, forWhom: sp.s3For, includes: sp.s3Includes, timeline: sp.s3Timeline },
    { n: '04', title: s.s4Title, desc: s.s4Desc, meta: s.s4Meta, forWhom: sp.s4For, includes: sp.s4Includes, timeline: sp.s4Timeline },
  ];

  return (
    <>
      <div className="px-5 pb-16 pt-32 md:px-10 md:pb-20 md:pt-40">
        <SectionHeading as="h1" index={s.headingIndex} label={s.headingLabel} title={s.headingTitle} />
        <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-muted md:mt-10 md:text-base">
          {sp.intro}
        </p>
      </div>

      <div className="border-t border-line">
        {SERVICES.map((item, i) => (
          <m.section
            key={item.n}
            {...fadeUp(i * 0.05)}
            className="border-b border-line px-5 py-14 md:px-10 md:py-20"
          >
            <div className="grid gap-8 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-5">
                <span className="font-mono text-xs text-accent">{item.n}</span>
                <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-5xl">
                  {item.title}
                </h2>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted md:text-base">
                  {item.desc}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.meta.map((mItem) => (
                    <span
                      key={mItem}
                      className="rounded-full border border-line bg-bg2 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
                    >
                      {mItem}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-8 md:col-span-6 md:col-start-7 md:grid-cols-2 md:gap-6">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                    {sp.forLabel}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed md:text-base">{item.forWhom}</p>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                    {sp.includesLabel}
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {item.includes.map((line) => (
                      <li key={line} className="flex gap-2 text-[15px] leading-relaxed md:text-base">
                        <span className="text-accent">·</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-2">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                    {sp.timelineLabel}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed md:text-base">{item.timeline}</p>
                </div>
              </div>
            </div>
          </m.section>
        ))}
      </div>

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
