'use client';

import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import Magnetic from '@/components/ui/Magnetic';
import { openEstimator } from '@/components/ui/CostEstimatorModal';
import HeroCodeBackground from './HeroCodeBackground';

// Kinetic Physics Springs
const STARK_EASE = [0.04, 0.95, 0.12, 1.02] as const;
const LASER_EASE = [0.16, 1, 0.3, 1] as const;
const SHIFT_EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { t } = useLanguage();

  // ── Mobile Kinetic Typewriter Engine (High Speed) ──
  const line1Full = t.hero.line1; // "Дизайн,"
  const line2Prefix = t.hero.line2; // "который не"
  const line2Target = t.hero.line3; // "показывает"
  const line3Full = t.hero.line4; // "а продаёт."

  const [mLine1, setMLine1] = useState('');
  const [mLine2, setMLine2] = useState('');
  const [mLaser, setMLaser] = useState(false);
  const [mLine3, setMLine3] = useState('');
  const [mReady, setMReady] = useState(false);

  useEffect(() => {
    setMLine1('');
    setMLine2('');
    setMLaser(false);
    setMLine3('');
    setMReady(false);

    let isMounted = true;

    const runTypewriter = async () => {
      // Short initial pause
      await new Promise((r) => setTimeout(r, 100));
      if (!isMounted) return;

      // Phase 1: Rapid Type Line 1 ("Дизайн,")
      for (let i = 1; i <= line1Full.length; i++) {
        if (!isMounted) return;
        setMLine1(line1Full.slice(0, i));
        await new Promise((r) => setTimeout(r, 35));
      }

      await new Promise((r) => setTimeout(r, 60));
      if (!isMounted) return;

      // Phase 2: Rapid Type Line 2 ("который не показывает,")
      const line2Full = `${line2Prefix} ${line2Target},`;
      for (let i = 1; i <= line2Full.length; i++) {
        if (!isMounted) return;
        setMLine2(line2Full.slice(0, i));
        await new Promise((r) => setTimeout(r, 18));
      }

      await new Promise((r) => setTimeout(r, 50));
      if (!isMounted) return;

      // Phase 3: Laser Strikethrough across "показывает"
      setMLaser(true);

      await new Promise((r) => setTimeout(r, 90));
      if (!isMounted) return;

      // Phase 4: Rapid Type Line 3 ("а продаёт.")
      for (let i = 1; i <= line3Full.length; i++) {
        if (!isMounted) return;
        setMLine3(line3Full.slice(0, i));
        await new Promise((r) => setTimeout(r, 24));
      }

      // Phase 5: Smoothly trigger reveal of Subtitle + CTA
      await new Promise((r) => setTimeout(r, 70));
      if (isMounted) setMReady(true);
    };

    runTypewriter();

    return () => {
      isMounted = false;
    };
  }, [line1Full, line2Prefix, line2Target, line3Full]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-4 pb-4 pt-16 md:min-h-svh md:px-10 md:pb-12 md:pt-32"
    >
      {/* 1. Deep Obsidian Atmosphere & Grid */}
      <HeroCodeBackground />

      {/* ── DESKTOP TOP HUD (Only on Desktop) ── */}
      <m.div
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: STARK_EASE, delay: 0.1 }}
        className="relative z-10 hidden items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-muted md:flex"
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
          <span className="text-fg font-semibold">VALENCE // PRODUCTION</span>
        </div>
        <span className="text-[11px] text-muted/75 tracking-[0.25em]">
          NEXT.JS • HIGH-LOAD • AUTOMATION
        </span>
      </m.div>

      {/* ── 2. MOBILE COMPOSITION: Clean, Bold, Minimalist Layout ── */}
      <div className="relative z-10 flex flex-1 flex-col justify-center -translate-y-2 pt-2 pb-6 md:hidden sm:-translate-y-4">
        <div className="flex flex-col">
          {/* ── Exact Original Headline ── */}
          {/* Line 1: "Дизайн," */}
          <div className="flex items-baseline whitespace-nowrap overflow-hidden font-display text-[clamp(2.55rem,11.5vw,3.5rem)] font-black leading-[0.94] tracking-tight text-fg">
            <span>{mLine1}</span>
            {mLine1.length < line1Full.length && (
              <span className="ml-1 inline-block h-[0.78em] w-1.5 bg-accent animate-pulse" />
            )}
          </div>

          {/* Line 2: "который не показывает," with laser strike */}
          <div className="relative mt-2 font-display text-[clamp(1.35rem,5.8vw,1.85rem)] font-light leading-tight text-fg/90">
            {mLine2.includes(line2Target) ? (
              <>
                <span>{line2Prefix} </span>
                <span className="relative inline-block px-1">
                  <span className="relative z-10">{line2Target}</span>
                  {/* Laser Bar */}
                  {mLaser && (
                    <m.span
                      aria-hidden
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.25, ease: LASER_EASE }}
                      style={{ originX: 0 }}
                      className="absolute left-0 top-[52%] z-20 h-[0.14em] w-full rounded-full bg-gradient-to-r from-accent via-white to-accent shadow-[0_0_14px_rgba(255,77,0,0.95)]"
                    />
                  )}
                </span>
                <span>,</span>
              </>
            ) : (
              <span>{mLine2}</span>
            )}
          </div>

          {/* Line 3: "а продаёт." */}
          <div className="mt-2 flex items-baseline whitespace-nowrap font-display text-[clamp(2.55rem,11.5vw,3.5rem)] font-black leading-[0.94] tracking-tight text-accent drop-shadow-[0_0_35px_rgba(255,77,0,0.4)]">
            <span>{mLine3}</span>
            {mLine1.length === line1Full.length &&
              mLine3.length < line3Full.length && (
                <span className="ml-1 inline-block h-[0.78em] w-1.5 bg-accent animate-pulse" />
              )}
          </div>

          {/* ── Air below headline + Subtitle & CTA (Crisp & Snappy Entrance) ── */}
          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{
              opacity: mReady ? 1 : 0,
              y: mReady ? 0 : 14,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="mt-7 flex flex-col gap-4.5 sm:mt-8"
          >
            <p className="text-[13px] leading-relaxed text-muted/90 sm:text-[14px]">
              {t.hero.sub}
            </p>

            <button
              type="button"
              onClick={openEstimator}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-accent py-3.5 text-center font-semibold text-bg shadow-[0_4px_25px_rgba(255,77,0,0.35)] transition-all duration-300 hover:shadow-[0_6px_30px_rgba(255,77,0,0.5)] active:scale-95 sm:py-4"
            >
              <span>{t.hero.btnDiscuss}</span>
              <span className="font-bold">→</span>
            </button>

            {/* Mobile Scroll Indicator */}
            <div className="mt-3 flex flex-col items-center gap-1.5" aria-hidden>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted/70">
                {t.hero.scroll}
              </span>
              <span className="block h-7 w-px overflow-hidden bg-line">
                <span className="scroll-hint-bar block h-1/2 w-px bg-accent" />
              </span>
            </div>
          </m.div>
        </div>
      </div>

      {/* ── 3. DESKTOP HEADLINE: Cinematic Tony Stark Mark V Assembly ── */}
      <h1 className="relative z-10 hidden flex-1 flex-col justify-center py-10 font-display leading-[1.01] tracking-tight md:flex">
        {/* Line 1: Fly-in snap from top-left */}
        <span className="block overflow-visible pb-[0.04em]">
          <m.span
            className="block will-change-transform text-[clamp(4.5rem,10.8vw,10.8rem)] font-extrabold text-fg"
            initial={{ y: -60, x: -20, rotate: -2, opacity: 0, scale: 0.94 }}
            animate={{ y: 0, x: 0, rotate: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: STARK_EASE, delay: 0.08 }}
          >
            {t.hero.line1}
          </m.span>
        </span>

        {/* Line 2: Snap from center with Strikethrough Laser */}
        <span className="block overflow-visible pb-[0.04em]">
          <m.span
            className="mt-2 block pl-[6vw] text-[clamp(2.2rem,4.8vw,4.8rem)] font-light text-fg will-change-transform"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: STARK_EASE, delay: 0.2 }}
          >
            {t.hero.line2}{' '}
            <span className="relative inline-block px-1">
              <span className="relative z-10">{t.hero.line3}</span>

              {/* Kinetic Orange Laser Strikethrough Bar */}
              <m.span
                aria-hidden
                className="absolute left-0 top-[52%] z-20 h-[0.11em] w-full rounded-full bg-gradient-to-r from-accent via-white to-accent shadow-[0_0_12px_rgba(255,77,0,0.9)] will-change-transform"
                style={{ originX: 0 }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  duration: 0.35,
                  ease: LASER_EASE,
                  delay: 0.62,
                }}
              />
            </span>
            ,
          </m.span>
        </span>

        {/* Line 3: Blasting Accent Punch */}
        <span className="block overflow-visible pb-[0.04em]">
          <m.span
            className="block pl-[10vw] text-[clamp(4.5rem,10.8vw,10.8rem)] font-extrabold will-change-transform"
            initial={{ y: 60, x: 20, rotate: 1.5, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, x: 0, rotate: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: STARK_EASE, delay: 0.32 }}
          >
            <span className="text-accent drop-shadow-[0_0_35px_rgba(255,77,0,0.3)]">
              {t.hero.line4}
            </span>
          </m.span>
        </span>
      </h1>

      {/* ── 4. DESKTOP BOTTOM ROW: Subtitle / Scroll Indicator / CTA ── */}
      <div className="relative z-10 hidden items-end gap-8 md:grid md:grid-cols-12">
        {/* Subtitle */}
        <div className="flex flex-col gap-5 md:col-span-5">
          <m.p
            initial={{ y: 20, opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
            className="text-balance text-sm leading-relaxed text-muted md:text-base md:leading-relaxed"
          >
            {t.hero.sub}
          </m.p>
        </div>

        {/* Desktop Scroll Indicator */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col items-center gap-3 md:col-span-2"
          aria-hidden
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            {t.hero.scroll}
          </span>
          <span className="block h-14 w-px overflow-hidden bg-line">
            <span className="scroll-hint-bar block h-1/2 w-px bg-accent" />
          </span>
        </m.div>

        {/* Action Button */}
        <div className="flex w-full md:col-span-5 md:justify-end">
          <Magnetic>
            <m.button
              type="button"
              onClick={openEstimator}
              data-cursor="hover"
              initial={{ scale: 0.94, opacity: 0, filter: 'blur(6px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
              className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-accent px-9 py-4 text-center font-semibold text-bg transition-all duration-300 ease-out hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(255,77,0,0.45)] active:scale-[0.97]"
            >
              <span>{t.hero.btnDiscuss}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-bold">
                →
              </span>
            </m.button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
