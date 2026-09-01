'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { m, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import MestiCaseShowcase from '@/components/cases/MestiCaseShowcase';
import ZazCaseShowcase from '@/components/cases/ZazCaseShowcase';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { readExtraCases, type ExtraCase } from '@/lib/cases';

export default function Cases() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const [extraCases, setExtraCases] = useState<ExtraCase[]>([]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const pin = !reduced && isDesktop;

  useEffect(() => {
    const readExtras = () => setExtraCases(readExtraCases());
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

  const mestiProgress = useTransform(scrollYProgress, [0, 0.45], [0, 1]);
  const x = useTransform(scrollYProgress, [0.45, 1], [0, -dist]);
  const [hint, setHint] = useState<string>(t.cases.mestiScrollHint);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (!pin) return;
    setHint(p < 0.45 ? t.cases.mestiScrollHint : t.cases.zazScrollHint);
  });

  useEffect(() => {
    setHint(t.cases.mestiScrollHint);
  }, [t.cases.mestiScrollHint, t.cases.zazScrollHint]);

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
    <section id="work" className="relative">
      <div
        ref={wrapRef}
        className="relative"
        style={{ height: pin ? '380vh' : 'auto' }}
      >
        <div
          className={
            pin
              ? 'sticky top-0 flex h-dvh flex-col overflow-hidden bg-bg pt-16 md:pt-20'
              : 'bg-bg px-5 py-16 md:px-10 md:py-36'
          }
        >
          <div
            className={
              pin
                ? 'relative z-20 flex shrink-0 items-center justify-between gap-4 border-b border-line/30 bg-bg px-5 py-2.5 md:px-10 md:py-3'
                : 'relative z-20 mb-8'
            }
          >
            {pin ? (
              <>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted md:text-[11px] md:tracking-[0.25em]">
                  {t.cases.headingIndex} / {t.cases.headingLabel}
                </p>
                <p className="max-w-[55%] text-right font-mono text-[9px] uppercase leading-snug tracking-[0.16em] text-muted md:max-w-[min(40vw,28rem)] md:text-[11px] md:tracking-[0.25em]">
                  {hint}
                </p>
              </>
            ) : (
              <div className="flex items-end justify-between gap-4">
                <SectionHeading
                  index={t.cases.headingIndex}
                  label={t.cases.headingLabel}
                  title={t.cases.headingTitle}
                />
              </div>
            )}
          </div>

          <div className={pin ? 'relative z-0 min-h-0 flex-1 overflow-hidden' : 'relative z-0'}>
            <m.div
              ref={trackRef}
              style={pin ? { x } : undefined}
              className={
                pin
                  ? 'absolute inset-0 flex h-full w-max items-stretch gap-10 px-5 will-change-transform md:gap-14 md:px-10'
                  : 'flex w-full flex-col gap-14 md:gap-20'
              }
            >
              <MestiCaseShowcase
                progress={pin ? mestiProgress : undefined}
                openLabel={t.cases.openCase}
                readCaseHref="/cases/mesti"
                readCaseLabel={t.casesPage.readCase}
              />
              <ZazCaseShowcase readCaseHref="/cases/zaz" readCaseLabel={t.casesPage.readCase} />
              {extraCases.map((c) => (
                <a
                  key={c.id}
                  href={c.url || '#contact'}
                  target={c.url ? '_blank' : undefined}
                  rel={c.url ? 'noopener noreferrer' : undefined}
                  data-cursor="view"
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line/30 bg-bg2/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 md:w-[min(88vw,78rem)]"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-muted">
                    <span>{c.tag || 'CASE STUDY'}</span>
                    <span className="text-accent">→</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-text md:text-3xl">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{c.result}</p>
                </a>
              ))}
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
