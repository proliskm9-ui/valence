'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { type MotionValue, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { CaseCtaOverlay } from '@/components/cases/CaseOpenLink';
import { MacChrome, PhoneChrome } from '@/components/cases/DeviceChrome';
import { useCaseCta } from '@/components/cases/useCaseCta';

const LIVE_URL = 'https://zazretro.web.app/';
const PREVIEW_BASE = '/cases/zaz-preview/embed.html';
const DESKTOP = { w: 1440, h: 900 };
const PHONE = { w: 390, h: 844 };
/** Wheel inside the device frame — lower = slower manual scroll. */
const WHEEL_GAIN = 0.18;

type View = 'desktop' | 'mobile';

type Props = {
  openLabel: string;
  progress?: MotionValue<number>;
};

function previewSrc(view: View) {
  return `${PREVIEW_BASE}?embed=1&view=${view}`;
}

export default function ZazCaseShowcase({ openLabel, progress }: Props) {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const scalerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const maxScrollRef = useRef(0);
  const progressRef = useRef(0);
  const appliedRef = useRef(0);
  const manualScrollRef = useRef(false);
  const manualTimerRef = useRef<number>(0);

  const [view, setView] = useState<View>('desktop');
  const [ready, setReady] = useState(false);
  const fallbackProgress = useMotionValue(0);
  const scrollSource = progress ?? fallbackProgress;
  const cta = useCaseCta(progress);
  const isPhone = view === 'mobile';

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setView(mq.matches ? 'mobile' : 'desktop');
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const measureMaxScroll = useCallback(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return 0;
    const root = doc.documentElement;
    const marker = doc.getElementById('embed-scroll-end');
    const viewport = root.clientHeight;
    let max = 0;

    if (marker) {
      max = marker.offsetTop + marker.offsetHeight - viewport;
    } else {
      max = root.scrollHeight - viewport;
    }

    maxScrollRef.current = Math.max(0, max);
    return maxScrollRef.current;
  }, []);

  const applyScrollRatio = useCallback(
    (ratio: number) => {
      const doc = iframeRef.current?.contentDocument;
      if (!doc) return;
      const max = maxScrollRef.current || measureMaxScroll();
      const next = Math.max(0, Math.min(max, ratio * max));
      doc.documentElement.scrollTop = next;
      appliedRef.current = ratio;
    },
    [measureMaxScroll],
  );

  useLayoutEffect(() => {
    const screen = screenRef.current;
    const scaler = scalerRef.current;
    if (!screen || !scaler) return;

    const design = isPhone ? PHONE : DESKTOP;
    const resize = () => {
      const layoutW = Math.max(1, screen.clientWidth);
      const layoutH = Math.max(1, screen.clientHeight);
      const scale = Math.min(layoutW / design.w, layoutH / design.h);
      const x = (layoutW - design.w * scale) / 2;
      const y = (layoutH - design.h * scale) / 2;
      scaler.style.width = `${design.w}px`;
      scaler.style.height = `${design.h}px`;
      scaler.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(screen);
    return () => ro.disconnect();
  }, [isPhone]);

  const handleIframeLoad = useCallback(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;
    doc.documentElement.classList.add('is-embed');
    measureMaxScroll();
    doc.documentElement.scrollTop = 0;
    appliedRef.current = 0;
    setReady(true);
    if (!reduced && progress && progressRef.current > 0.02) {
      applyScrollRatio(Math.min(progressRef.current, 0.06));
    }
  }, [applyScrollRatio, measureMaxScroll, progress, reduced]);

  useEffect(() => {
    setReady(false);
    maxScrollRef.current = 0;
    appliedRef.current = 0;
  }, [view]);

  useMotionValueEvent(scrollSource, 'change', (p) => {
    progressRef.current = p;
    if (reduced || !ready || manualScrollRef.current || !progress) return;
    applyScrollRatio(p);
  });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !ready) return;

    const onWheel = (e: WheelEvent) => {
      const doc = iframeRef.current?.contentDocument;
      if (!doc) return;

      e.preventDefault();
      e.stopPropagation();

      manualScrollRef.current = true;
      window.clearTimeout(manualTimerRef.current);
      manualTimerRef.current = window.setTimeout(() => {
        manualScrollRef.current = false;
      }, 900);

      const max = maxScrollRef.current || measureMaxScroll();
      const root = doc.documentElement;
      root.scrollTop = Math.max(0, Math.min(max, root.scrollTop + e.deltaY * WHEEL_GAIN));
    };

    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      stage.removeEventListener('wheel', onWheel);
      window.clearTimeout(manualTimerRef.current);
    };
  }, [measureMaxScroll, ready]);

  const screen = (
    <div ref={screenRef} className="mcs-screen zaz-screen">
      <div ref={scalerRef} className="zaz-iframe-scaler" data-view={view}>
        <iframe
          ref={iframeRef}
          key={view}
          src={previewSrc(view)}
          title="RETRO ZAZ"
          className="zaz-iframe"
          tabIndex={0}
          loading="eager"
          onLoad={handleIframeLoad}
        />
      </div>
    </div>
  );

  return (
    <article className="mcs-slide" onMouseEnter={cta.onEnter} onMouseLeave={cta.onLeave}>
      <div className="mcs-head">
        <p className="mcs-head-tag">02 / {t.cases.retroZazTag}</p>
        <h3 className="mcs-head-title">RETRO ZAZ</h3>
      </div>

      <div ref={stageRef} className="case-stage case-stage--zaz mt-3 md:mt-6">
        <a
          href={LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="case-hit"
          aria-label={t.cases.openCase}
        />
        <div className={`mcs-device ${isPhone ? 'mcs-device--phone' : 'mcs-device--mac'}`}>
          {isPhone ? <PhoneChrome>{screen}</PhoneChrome> : <MacChrome>{screen}</MacChrome>}
        </div>
        <div className="case-stage-legend">
          <button type="button" className={view === 'desktop' ? 'is-on' : ''} onClick={() => setView('desktop')}>
            PC
          </button>
          <button type="button" className={view === 'mobile' ? 'is-on' : ''} onClick={() => setView('mobile')}>
            Mobile
          </button>
        </div>
        <CaseCtaOverlay href={LIVE_URL} label={t.cases.openCase} visible={cta.visible} />
      </div>

      <p className="mcs-note mt-2 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:mt-4 md:block">
        {t.cases.retroZazResult}
      </p>
    </article>
  );
}
