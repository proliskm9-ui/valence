'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { EASE_OUT_EXPO } from '@/lib/site';

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { t } = useLanguage();

  const SERVICES = [
    {
      title: t.services.s1Title,
      desc: t.services.s1Desc,
      meta: t.services.s1Meta,
    },
    {
      title: t.services.s2Title,
      desc: t.services.s2Desc,
      meta: t.services.s2Meta,
    },
    {
      title: t.services.s3Title,
      desc: t.services.s3Desc,
      meta: t.services.s3Meta,
    },
    {
      title: t.services.s4Title,
      desc: t.services.s4Desc,
      meta: t.services.s4Meta,
    },
  ];

  return (
    <section id="services" className="px-5 py-24 md:px-10 md:py-40">
      <SectionHeading index={t.services.headingIndex} label={t.services.headingLabel} title={t.services.headingTitle} />

      <ul className="mt-12 border-t border-line md:mt-20">
        {SERVICES.map((s, i) => (
          <m.li
            key={s.title}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.06 }}
            className="border-b border-line"
          >
            <div
              data-cursor="hover"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 py-7 transition-opacity duration-300 md:grid-cols-[6rem_1fr_minmax(0,26rem)_auto] md:items-center md:gap-x-8 md:py-10"
              style={{
                opacity: hovered !== null && hovered !== i ? 0.35 : 1,
                transition: 'opacity .3s',
              }}
            >
              <span className="font-mono text-xs text-muted md:text-sm">
                0{i + 1}
              </span>
              <h3 className="font-display text-2xl font-bold tracking-tight md:text-4xl">
                {s.title}
              </h3>
              <p className="col-span-2 mt-2 text-[15px] leading-relaxed text-muted md:col-span-1 md:mt-0 md:text-base">
                {s.desc}
              </p>
              <div className="hidden justify-end gap-2 md:flex">
                {s.meta.map((mItem) => (
                  <span
                    key={mItem}
                    className="rounded-full border border-line bg-bg2 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
                  >
                    {mItem}
                  </span>
                ))}
              </div>
            </div>
          </m.li>
        ))}
      </ul>
    </section>
  );
}
