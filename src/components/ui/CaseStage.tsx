'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { EASE_OUT_EXPO } from '@/lib/site';

const CYCLE_MS = 7000;

type View = 'desktop' | 'mobile';

type StageTone = 'zaz' | 'mesti';

type Props = {
  title: string;
  pcSrc: string;
  mobileSrc: string;
  mobileSrc2?: string;
  tone: StageTone;
  startDelay?: number;
};

export default function CaseStage({
  title,
  pcSrc,
  mobileSrc,
  mobileSrc2,
  tone,
  startDelay = 0,
}: Props) {
  const reduced = useReducedMotion();
  const [view, setView] = useState<View>('desktop');
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  useEffect(() => {
    if (reduced) return;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        if (pausedRef.current) return;
        setView((v) => (v === 'desktop' ? 'mobile' : 'desktop'));
      }, CYCLE_MS);
    }, startDelay);
    return () => {
      window.clearTimeout(start);
      if (interval) window.clearInterval(interval);
    };
  }, [reduced, startDelay]);

  return (
    <div
      className={`case-stage case-stage--${tone}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        {view === 'desktop' ? (
          <m.div
            key="desktop"
            className="case-stage-scene case-stage-scene--desktop case-stage-scene--mac"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
          >
            <div className="mcs-mac">
              <div className="mcs-mac-lid">
                <div className="mcs-mac-bezel">
                  <div className="mcs-mac-notch" aria-hidden>
                    <span className="mcs-mac-cam" />
                  </div>
                  <div className="mcs-screen">
                    <img src={pcSrc} alt={`${title} — desktop`} loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
              <div className="mcs-mac-base" aria-hidden />
            </div>
          </m.div>
        ) : (
          <m.div
            key="mobile"
            className={`case-stage-scene case-stage-scene--mobile${mobileSrc2 ? ' case-stage-scene--dual' : ''}`}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
          >
            {mobileSrc2 ? (
              <div className="case-phone case-phone--back">
                <div className="case-phone-island" aria-hidden />
                <div className="case-phone-screen">
                  <img src={mobileSrc2} alt={`${title} — mobile`} loading="lazy" decoding="async" />
                </div>
              </div>
            ) : null}
            <div className="case-phone case-phone--front">
              <div className="case-phone-island" aria-hidden />
              <div className="case-phone-screen">
                <img src={mobileSrc} alt={`${title} — mobile`} loading="lazy" decoding="async" />
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <div className="case-stage-legend">
        <button
          type="button"
          className={view === 'desktop' ? 'is-on' : ''}
          onClick={() => setView('desktop')}
        >
          PC
        </button>
        <button
          type="button"
          className={view === 'mobile' ? 'is-on' : ''}
          onClick={() => setView('mobile')}
        >
          Mobile
        </button>
      </div>
    </div>
  );
}
