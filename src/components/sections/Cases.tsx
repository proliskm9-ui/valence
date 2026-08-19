'use client';

import { useEffect, useRef, useState } from 'react';
import { m, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import MestiCaseShowcase from '@/components/cases/MestiCaseShowcase';
import ZazCaseShowcase from '@/components/cases/ZazCaseShowcase';
import { useLanguage } from '@/components/providers/LanguageProvider';

interface ExtraCase {
  id: string;
  title: string;
  tag: string;
  year: string;
  result: string;
  url?: string;
}

const FEATURED_IDS = new Set(['01', '02']);
const HIDDEN_IDS = new Set(['03', '04', '05', '06']);

const DEFAULT_EXTRAS: ExtraCase[] = [
  {
    id: 'case-villa-palma',
    title: 'Villa Palma Suite 4★',
    tag: 'бутик-отель · сочи / адлер',
    year: '2026',
    result: 'официальный сайт 4★',
    url: 'https://palmasochihotel.web.app/',
  },
];

export default function Cases() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const [extraCases, setExtraCases] = useState<ExtraCase[]>(DEFAULT_EXTRAS);
  const pin = !reduced;

  useEffect(() => {
    const readExtras = () => {
      try {
        const stored = localStorage.getItem('valence_crm_store');
        if (!stored) {
          setExtraCases(DEFAULT_EXTRAS);
          return;
        }
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed.cases)) {
          setExtraCases(DEFAULT_EXTRAS);
          return;
        }
        const extras = (parsed.cases as ExtraCase[]).filter(
          (c) => !FEATURED_IDS.has(c.id) && !HIDDEN_IDS.has(c.id),
        );
        setExtraCases(extras.length ? extras : DEFAULT_EXTRAS);
      } catch {
        setExtraCases(DEFAULT_EXTRAS);
      }
    };

    readExtras();
    window.addEventListener('storage', readExtras);
    window.addEventListener('valence_crm_update', readExtras);
    return () => {
      window.removeEventListener('storage', readExtras);
      window.removeEventListener('valence_crm_update', readExtras);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  const mestiProgress = useTransform(scrollYProgress, [0, 0.38], [0, 1]);
  const x = useTransform(scrollYProgress, [0.38, 0.92], [0, -dist]);
  const zazProgress = useTransform(scrollYProgress, (p) => {
    const start = 0.56;
    const end = 0.9;
    if (p <= start) return 0;
    if (p >= end) return 1;
    const t = (p - start) / (end - start);
    return t * t * (3 - 2 * t);
  });
  const [hint, setHint] = useState<string>(t.cases.mestiScrollHint);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (!pin) return;
    if (p < 0.38) setHint(t.cases.mestiScrollHint);
    else if (p < 0.9) setHint(t.cases.zazScrollHint);
    else setHint(t.cases.scrollHint);
  });

  useEffect(() => {
    if (!pin) {
      setDist(0);
      return;
    }
    const measure = () => {
      if (!trackRef.current) return;
      setDist(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 40));
    };
    measure();
    const imgs = trackRef.current?.querySelectorAll('img') ?? [];
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', measure);
    });
    const id = window.setTimeout(measure, 200);
    window.addEventListener('resize', measure);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('resize', measure);
      imgs.forEach((img) => img.removeEventListener('load', measure));
    };
  }, [extraCases.length, pin]);

  return (
    <section id="work">
      <div
        ref={wrapRef}
        className="relative"
        style={{ height: pin ? '460vh' : 'auto' }}
      >
        <div
          className={
            pin
              ? 'sticky top-0 flex h-dvh flex-col overflow-hidden bg-bg pt-16 md:pt-6 lg:pt-8'
              : 'bg-bg px-5 py-20 md:px-10 md:py-40'
          }
        >
          <div
            className={
              pin
                ? 'relative z-20 shrink-0 border-b border-line/30 bg-bg px-5 pb-3 md:px-10 md:pb-4 lg:pb-5'
                : 'relative z-20 px-5 md:px-10'
            }
          >
            <div className="flex items-end justify-between gap-4">
              <SectionHeading
                pinned={pin}
                compact
                index={t.cases.headingIndex}
                label={t.cases.headingLabel}
                title={t.cases.headingTitle}
              />
              <p className="max-w-[42%] shrink-0 pb-0.5 text-right font-mono text-[9px] uppercase leading-snug tracking-[0.16em] text-muted md:max-w-[min(38vw,28rem)] md:pb-1 md:text-[11px] md:tracking-[0.25em]">
                {pin ? hint : t.cases.scrollHint}
              </p>
            </div>
          </div>

          <div className={pin ? 'relative z-0 min-h-0 flex-1 overflow-hidden' : 'relative z-0 mt-10'}>
            <m.div
              ref={trackRef}
              style={pin ? { x } : undefined}
              className={
                pin
                  ? 'absolute inset-x-0 top-0 flex h-full w-max items-stretch gap-10 px-5 pt-3 will-change-transform md:gap-16 md:px-10 md:pt-4'
                  : 'flex w-full flex-col gap-16 px-5 md:px-10'
              }
            >
              <MestiCaseShowcase progress={pin ? mestiProgress : undefined} openLabel={t.cases.openCase} />
              <ZazCaseShowcase progress={pin ? zazProgress : undefined} openLabel={t.cases.openCase} />
              {extraCases.map((c) => (
                <a
                  key={c.id}
                  href={c.url || '#contact'}
                  target={c.url ? '_blank' : undefined}
                  rel={c.url ? 'noopener noreferrer' : undefined}
                  data-cursor="view"
                  className="flex w-[min(72vw,420px)] shrink-0 flex-col justify-center border-l border-line pl-6 md:w-[min(34vw,420px)] md:pl-10"
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
                </a>
              ))}
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
