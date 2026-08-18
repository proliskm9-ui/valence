'use client';

import { useEffect, useRef, useState } from 'react';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { EASE_OUT_EXPO } from '@/lib/site';

function Placeholder({ id, text }: { id: string; text: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-bg2 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <span className="text-outline absolute -bottom-8 right-2 font-display text-[10rem] font-extrabold leading-none md:text-[13rem]">
        {id}
      </span>
      <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
        {text}
      </span>
      <div className="absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover:bg-accent/10" />
    </div>
  );
}

interface CaseItem {
  id: string;
  title: string;
  tag: string;
  year: string;
  result: string;
  url?: string;
  image?: string;
  aspectRatio?: string;
}

function CaseCard({
  c,
  index,
  wide,
  placeholderText,
}: {
  c: CaseItem;
  index: number;
  wide: boolean;
  placeholderText: string;
}) {
  const isMesti = c.id === '02' || c.title.toLowerCase().includes('mesti');
  const aspectStyle = c.aspectRatio || (isMesti ? 'aspect-[2/3]' : wide ? 'aspect-[16/10]' : 'aspect-[4/3]');
  const widthStyle = isMesti ? 'md:w-[24vw]' : wide ? 'md:w-[44vw]' : 'md:w-[34vw]';

  return (
    <m.article
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: (index % 2) * 0.08 }}
      className={`group shrink-0 ${widthStyle} w-full ${index % 2 ? 'md:translate-y-6' : ''}`}
      data-cursor="view"
    >
      <a
        href={c.url || '#contact'}
        target={c.url ? '_blank' : undefined}
        rel={c.url ? 'noopener noreferrer' : undefined}
        className="block"
        aria-label={`Кейс: ${c.title}`}
      >
        <div className={`relative overflow-hidden ${aspectStyle}`}>
          {c.image ? (
            <div className="absolute inset-0 overflow-hidden bg-bg2">
              <img
                src={c.image}
                alt={c.title}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
            </div>
          ) : (
            <Placeholder id={c.id} text={placeholderText} />
          )}
          <span className="absolute bottom-5 left-5 translate-y-3 rounded-full bg-accent px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-bg opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            {c.result}
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-4">
          <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
            {c.title}
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            {c.tag} — {c.year}
          </span>
        </div>
      </a>
    </m.article>
  );
}

export default function Cases() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const reduced = useReducedMotion();
  const { t } = useLanguage();

  const DEFAULT_CASES: CaseItem[] = [
    { id: '01', title: 'RETRO ZAZ', tag: t.cases.retroZazTag, year: '2026', result: t.cases.retroZazResult, url: 'https://zazretro.web.app/', image: '/cases-retro-zaz.png' },
    { id: '02', title: 'MestiDelivery', tag: t.cases.mestiDeliveryTag, year: '2026', result: t.cases.mestiDeliveryResult, url: 'https://mestidelivery.com/', image: '/cases-mesti-delivery.png', aspectRatio: 'aspect-[2/3]' },
    { id: 'case-villa-palma', title: 'Villa Palma Suite 4★', tag: 'бутик-отель · сочи / адлер', year: '2026', result: 'официальный сайт 4★', url: 'https://palmasochihotel.web.app/' },
  ];

  const [casesList, setCasesList] = useState<CaseItem[]>(DEFAULT_CASES);

  useEffect(() => {
    const updateCases = () => {
      try {
        const stored = localStorage.getItem('valence_crm_store');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.cases && Array.isArray(parsed.cases)) {
            const map = new Map<string, CaseItem>();
            DEFAULT_CASES.forEach((c) => map.set(c.id, c));
            const deletedIds = new Set(['03', '04', '05', '06']);
            parsed.cases.forEach((c: CaseItem) => {
              if (!deletedIds.has(c.id)) {
                map.set(c.id, c);
              }
            });
            setCasesList(Array.from(map.values()));
            return;
          }
        }
      } catch {}

      setCasesList(DEFAULT_CASES);
    };

    updateCases();

    window.addEventListener('storage', updateCases);
    window.addEventListener('valence_crm_update', updateCases);
    return () => {
      window.removeEventListener('storage', updateCases);
      window.removeEventListener('valence_crm_update', updateCases);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDist(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 40));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [casesList]);

  return (
    <section id="work">
      <div
        ref={wrapRef}
        className="relative hidden md:block"
        style={{ height: reduced ? 'auto' : '300vh' }}
      >
        <div
          className={
            reduced
              ? 'py-40'
              : 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden'
          }
        >
          <div className="flex items-end justify-between px-10">
            <SectionHeading index={t.cases.headingIndex} label={t.cases.headingLabel} title={t.cases.headingTitle} />
            <p className="hidden pb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted lg:block">
              {t.cases.scrollHint}
            </p>
          </div>
          <m.div
            ref={trackRef}
            style={reduced ? undefined : { x }}
            className={`mt-14 flex w-max gap-8 px-10 will-change-transform ${
              reduced ? 'flex-wrap' : ''
            }`}
          >
            {casesList.map((c, i) => (
              <CaseCard key={c.id} c={c} index={i} wide={i % 3 === 0} placeholderText={t.cases.imagePlaceholder} />
            ))}
          </m.div>
        </div>
      </div>

      <div className="px-6 py-24 md:hidden">
        <SectionHeading index={t.cases.headingIndex} label={t.cases.headingLabel} title={t.cases.headingTitle} />
        <div className="mt-12 flex flex-col gap-12">
          {casesList.map((c, i) => (
            <CaseCard key={c.id} c={c} index={i} wide={false} placeholderText={t.cases.imagePlaceholder} />
          ))}
        </div>
      </div>
    </section>
  );
}
