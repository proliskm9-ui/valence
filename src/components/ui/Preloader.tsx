'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { useLoaded } from '@/components/providers/LoadProvider';
import { SITE, EASE_OUT_EXPO } from '@/lib/site';

const SEEN_KEY = 'agency:preloaded';
const DURATION = 1000; // мс — быстро, не бесит

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function Preloader() {
  const { finish } = useLoaded();
  const reduced = useReducedMotion();
  const [pct, setPct] = useState(0);
  const [show, setShow] = useState(true);
  const raf = useRef(0);

  useEffect(() => {
    const seen = sessionStorage.getItem(SEEN_KEY);
    // ?np=1 — пропуск прелоадера для скриншотов и автотестов
    const skip = new URLSearchParams(window.location.search).has('np');
    if (seen || skip || reduced) {
      finish();
      setShow(false);
      return;
    }

    document.documentElement.style.overflow = 'hidden';
    const start = performance.now();
    const tick = (now: number) => {
      const p = easeOutExpo(Math.min(1, (now - start) / DURATION));
      setPct(Math.round(p * 100));
      if (p < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(SEEN_KEY, '1');
        finish();
        setShow(false);
      }
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      document.documentElement.style.overflow = '';
    };
  }, [finish, reduced]);

  useEffect(() => {
    if (!show) document.documentElement.style.overflow = '';
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <m.div
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-bg p-6 md:p-10"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          aria-hidden
        >
          <span className="font-display text-lg font-bold tracking-tight">
            {SITE.name}
            <span className="text-accent">·</span>
          </span>

          <div className="flex items-end justify-between">
            <div className="h-px w-full max-w-[38vw] bg-line">
              <div
                className="h-px origin-left bg-accent transition-transform duration-100"
                style={{ transform: `scaleX(${pct / 100})` }}
              />
            </div>
            <span className="font-display text-[clamp(3.5rem,10vw,8rem)] font-extralight leading-none tabular-nums">
              {pct}
            </span>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
