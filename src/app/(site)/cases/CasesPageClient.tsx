'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { EASE_OUT_EXPO } from '@/lib/site';
import { TRANSLATIONS } from '@/lib/i18n';
import { readExtraCases, type ExtraCase } from '@/lib/cases';

const MESTI_POSTER = '/cases/mesti-hero/poster.webp?v=wm7';
const MESTI_LIVE = 'https://mestidelivery.com/';
const ZAZ_LIVE = 'https://zazretro.web.app/';
const ZAZ_HERO = {
  ru: '/cases/zaz-shots/hero.png?v=13',
  en: '/cases/zaz-shots/en/hero.png?v=8',
};

function fadeUp(delay = 0) {
  return {
    initial: { y: 24, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: EASE_OUT_EXPO, delay },
  };
}

export default function CasesPageClient() {
  const { t, lang } = useLanguage();
  const [extras, setExtras] = useState<ExtraCase[]>([]);

  useEffect(() => {
    const read = () => setExtras(readExtraCases());
    read();
    window.addEventListener('storage', read);
    window.addEventListener('valence_crm_update', read);
    return () => {
      window.removeEventListener('storage', read);
      window.removeEventListener('valence_crm_update', read);
    };
  }, []);

  const shotLang = lang === 'ru' ? 'ru' : 'en';
  const zazShot = ZAZ_HERO[shotLang];
  const zazLiveUrl = `${ZAZ_LIVE}?lang=${shotLang}`;
  const zaz = lang === 'ka' ? TRANSLATIONS.en.cases : t.cases;

  return (
    <>
      <div className="px-5 pb-32 pt-32 md:px-10 md:pt-40">
        <SectionHeading
          as="h1"
          index={t.casesPage.headingIndex}
          label={t.casesPage.headingLabel}
          title={t.casesPage.headingTitle}
        />
        <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted md:text-base">
          {t.casesPage.subtitle}
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 md:mt-20 md:gap-10">
          <m.div
            {...fadeUp(0)}
            className="group relative overflow-hidden rounded-2xl border border-line bg-bg2/40 transition-colors hover:border-accent"
          >
            <Link
              href="/cases/mesti"
              data-cursor="view"
              aria-label="MestiDelivery"
              className="absolute inset-0 z-10"
            />
            <div className="aspect-[4/3] overflow-hidden bg-[#120c08]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MESTI_POSTER}
                alt="MestiDelivery"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                01 / {t.cases.mestiDeliveryTag}
              </p>
              <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                MestiDelivery
              </h3>
              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  {t.cases.mestiDeliveryResult}
                </span>
                <a
                  href={MESTI_LIVE}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="relative z-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
                >
                  {t.cases.openSite} ↗
                </a>
              </div>
            </div>
          </m.div>

          <m.div
            {...fadeUp(0.08)}
            className="group relative overflow-hidden rounded-2xl border border-line bg-bg2/40 transition-colors hover:border-accent"
          >
            <Link
              href="/cases/zaz"
              data-cursor="view"
              aria-label="RETRO ZAZ"
              className="absolute inset-0 z-10"
            />
            <div className="aspect-[4/3] overflow-hidden bg-[#0e1c2a]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={zazShot}
                alt="RETRO ZAZ"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                02 / {zaz.retroZazTag}
              </p>
              <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                RETRO ZAZ
              </h3>
              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  {zaz.retroZazResult}
                </span>
                <a
                  href={zazLiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="relative z-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
                >
                  {zaz.openSite} ↗
                </a>
              </div>
            </div>
          </m.div>

          {extras.map((c, i) => (
            <m.a
              key={c.id}
              {...fadeUp(0.08 * (i + 2))}
              href={c.url || '/contact'}
              target={c.url ? '_blank' : undefined}
              rel={c.url ? 'noopener noreferrer' : undefined}
              data-cursor={c.url ? 'view' : undefined}
              className="flex flex-col justify-center rounded-2xl border border-line bg-bg2/40 p-6 transition-colors hover:border-accent md:p-8"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                {c.tag} — {c.year}
              </p>
              <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                {c.title}
              </h3>
              <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                {c.result}
              </span>
            </m.a>
          ))}
        </div>

        <div className="mt-20 md:mt-28">
          <Link
            href="/contact"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-9 py-5 text-lg font-medium text-bg transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.97]"
          >
            {t.cta.btn}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
