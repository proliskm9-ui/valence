'use client';

import Link from 'next/link';
import { AnimatePresence, m } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { TRANSLATIONS } from '@/lib/i18n';
import CaseOpenLink from '@/components/cases/CaseOpenLink';
import { MacBookProChrome } from '@/components/cases/DeviceChrome';
import { useCaseCta } from '@/components/cases/useCaseCta';

const LIVE_BASE = 'https://zazretro.web.app/';

/** RU shots stay at root; EN (and KA fallback) live under /en/. */
const SHOTS = {
  ru: {
    hero: '/cases/zaz-shots/hero.png?v=13',
    floatL: '/cases/zaz-shots/float-about.png?v=4',
    floatR: '/cases/zaz-shots/float-city.png?v=4',
  },
  en: {
    hero: '/cases/zaz-shots/en/hero.png?v=8',
    floatL: '/cases/zaz-shots/en/float-about.png?v=2',
    floatR: '/cases/zaz-shots/en/float-city.png?v=2',
  },
} as const;

type Props = {
  /** Задан только в общей ленте на главной — ведёт на отдельную страницу кейса. */
  readCaseHref?: string;
  readCaseLabel?: string;
  /** h1 — когда компонент это главный заголовок отдельной страницы кейса. */
  titleTag?: 'h1' | 'h3';
};

/** Pro 14 hero + two page peeks. Retro ZAZ site is RU/EN — KA uses EN screens. */
export default function ZazCaseShowcase({ readCaseHref, readCaseLabel, titleTag = 'h3' }: Props = {}) {
  const { t, lang } = useLanguage();
  const cta = useCaseCta();
  const shotLang = lang === 'ru' ? 'ru' : 'en';
  const shots = SHOTS[shotLang];
  const liveUrl = `${LIVE_BASE}?lang=${shotLang}`;
  const zaz = lang === 'ka' ? TRANSLATIONS.en.cases : t.cases;

  return (
    <article className={`mcs-slide${cta.visible ? ' is-cta' : ''}`}>
      <div className="mcs-head" onMouseEnter={cta.onHeadEnter} onMouseLeave={cta.onHeadLeave}>
        <div className="mcs-head-copy">
          <p className="mcs-head-tag text-accent font-mono text-[10.5px] uppercase font-bold tracking-[0.2em]">
            02 // {zaz.retroZazTag}
          </p>
          {(() => {
            const TitleTag = titleTag;
            return <TitleTag className="mcs-head-title">RETRO ZAZ</TitleTag>;
          })()}
        </div>
      </div>

      <div
        className="mcs-stage mcs-stage--zaz is-macbook"
        onMouseEnter={cta.onStageEnter}
        onMouseLeave={cta.onStageLeave}
      >
        <div className="zaz-atmos" aria-hidden>
          <div className="zaz-atmos-photo" />
          <div className="zaz-atmos-grade" />
          <div className="zaz-atmos-grain" />
        </div>

        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="case-hit"
          aria-label={t.cases.openCase}
        />

        <div className="mcs-device mcs-device--zaz">
          <div className="zaz-float zaz-float--left">
            <AnimatePresence mode="sync" initial={false}>
              <m.img
                key={`fl-${shotLang}`}
                src={shots.floatL}
                alt=""
                className="zaz-float-shot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>
          <div className="zaz-float zaz-float--right">
            <AnimatePresence mode="sync" initial={false}>
              <m.img
                key={`fr-${shotLang}`}
                src={shots.floatR}
                alt=""
                className="zaz-float-shot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>

          <div className="zaz-mac">
            <span className="zaz-mac-shadow" aria-hidden />
            <MacBookProChrome>
              <AnimatePresence mode="wait" initial={false}>
                <m.img
                  key={`hero-${shotLang}`}
                  src={shots.hero}
                  alt=""
                  className="mcs-shot mcs-shot--hero"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
            </MacBookProChrome>
          </div>
        </div>
      </div>

      <p className="mcs-note hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:block">
        {zaz.retroZazResult}
      </p>
    </article>
  );
}
