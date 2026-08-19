'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { type MotionValue, useMotionValue, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { CaseCtaOverlay } from '@/components/cases/CaseOpenLink';
import { MacChrome, PhoneChrome } from '@/components/cases/DeviceChrome';
import { useCaseCta } from '@/components/cases/useCaseCta';
import type { Language } from '@/lib/i18n';
import './mesti-hero-overlay.css';

const MESTI_LANGS: { code: Language; name: string; flag: string }[] = [
  { code: 'ru', name: 'RU', flag: '/cases/mesti-ui/RU.png' },
  { code: 'ka', name: 'KA', flag: '/cases/mesti-ui/GE.png' },
  { code: 'en', name: 'EN', flag: '/cases/mesti-ui/US.png' },
];

const FRAME_COUNT = 240;
const POSTER = '/cases/mesti-hero/poster.webp';
const LIVE_URL = 'https://mestidelivery.com/';
const FADE = 0.07;
const DESKTOP = { w: 1440, h: 900 };
const PHONE = { w: 390, h: 844 };

const CHAPTERS = [
  { from: 0.12, to: 0.34, side: 'right' as const, num: '01', title: 'mestiCh1Title' as const, desc: 'mestiCh1Desc' as const },
  { from: 0.36, to: 0.58, side: 'left' as const, num: '02', title: 'mestiCh2Title' as const, desc: 'mestiCh2Desc' as const },
  { from: 0.6, to: 0.8, side: 'right' as const, num: '03', title: 'mestiCh3Title' as const, desc: 'mestiCh3Desc' as const },
  { from: 0.83, to: 1, side: 'left' as const, num: '04', title: 'mestiCh4Title' as const, desc: 'mestiCh4Desc' as const },
];

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function chapterVis(p: number, from: number, to: number) {
  if (p < from - FADE || p > to + FADE) return 0;
  if (p >= from && p <= to) return 1;
  if (p < from) return clamp01((p - (from - FADE)) / FADE);
  return clamp01((to + FADE - p) / FADE);
}

function frameSrc(dir: 'desktop' | 'mobile', index: number) {
  return `/cases/mesti-hero/${dir}/frame_${String(index + 1).padStart(4, '0')}.webp`;
}

type Props = {
  progress?: MotionValue<number>;
  openLabel: string;
};

export default function MestiCaseShowcase({ progress, openLabel }: Props) {
  const { t, lang } = useLanguage();
  const currentLang = MESTI_LANGS.find((item) => item.code === lang) ?? MESTI_LANGS[0];
  const reduced = useReducedMotion();
  const screenRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([null, null, null, null]);

  const [view, setView] = useState<'desktop' | 'mobile'>('desktop');
  const isPhone = view === 'mobile';
  const [inRange, setInRange] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const isPhoneRef = useRef(false);
  const reducedRef = useRef(!!reduced);
  isPhoneRef.current = isPhone;
  reducedRef.current = !!reduced;

  const frames = useRef<(HTMLImageElement | null)[]>([]);
  const ready = useRef<Uint8Array>(new Uint8Array(FRAME_COUNT));
  const maxReady = useRef(0);
  const lastDrawn = useRef(-1);
  const rafId = useRef(0);
  const progressRef = useRef(0);
  const wmTmp = useRef<HTMLCanvasElement | null>(null);
  const wmMask = useRef<HTMLCanvasElement | null>(null);

  const fallbackProgress = useMotionValue(0);
  const source = progress ?? fallbackProgress;
  const cta = useCaseCta(progress);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setView(mq.matches ? 'mobile' : 'desktop');
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const stampOutWatermark = (ctx: CanvasRenderingContext2D, cw: number, ch: number) => {
    const sw = Math.max(40, Math.round(cw * 0.055));
    const sh = Math.max(48, Math.round(ch * 0.085));
    const destX = cw - sw;
    const destY = ch - sh;
    const srcX = Math.max(0, destX - sw - Math.round(cw * 0.02));
    const srcY = destY;

    if (!wmTmp.current) wmTmp.current = document.createElement('canvas');
    if (!wmMask.current) wmMask.current = document.createElement('canvas');
    const tmp = wmTmp.current;
    const mask = wmMask.current;
    if (tmp.width !== sw || tmp.height !== sh) {
      tmp.width = sw;
      tmp.height = sh;
      mask.width = sw;
      mask.height = sh;
    }
    const tctx = tmp.getContext('2d');
    const mctx = mask.getContext('2d');
    if (!tctx || !mctx) return;

    tctx.clearRect(0, 0, sw, sh);
    tctx.filter = 'blur(3px)';
    tctx.drawImage(ctx.canvas, srcX, srcY, sw, sh, 0, 0, sw, sh);
    tctx.filter = 'none';

    mctx.clearRect(0, 0, sw, sh);
    const g = mctx.createRadialGradient(
      sw * 0.72,
      sh * 0.72,
      sw * 0.08,
      sw * 0.72,
      sh * 0.72,
      Math.max(sw, sh) * 0.55,
    );
    g.addColorStop(0, 'rgba(0,0,0,1)');
    g.addColorStop(0.55, 'rgba(0,0,0,0.85)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    mctx.fillStyle = g;
    mctx.fillRect(0, 0, sw, sh);

    tctx.globalCompositeOperation = 'destination-in';
    tctx.drawImage(mask, 0, 0);
    tctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(tmp, destX, destY);
  };

  const drawFrame = (idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let realIdx = idx;
    while (realIdx >= 0 && !frames.current[realIdx]) realIdx--;
    if (realIdx < 0 || realIdx === lastDrawn.current) return;

    const img = frames.current[realIdx]!;
    if (!img.naturalWidth) return;

    lastDrawn.current = realIdx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (canvas.width - w) / 2, 0, w, h);
    stampOutWatermark(ctx, canvas.width, canvas.height);
    if (posterRef.current && realIdx >= 0) posterRef.current.style.opacity = '0';
  };

  const applyProgress = (p: number) => {
    const value = clamp01(p);
    progressRef.current = value;
    drawFrame(Math.round(value * (FRAME_COUNT - 1)));

    if (centerRef.current) {
      const cv = clamp01((0.14 - value) / 0.14);
      centerRef.current.style.opacity = String(cv);
      centerRef.current.style.transform = `translateY(${(1 - cv) * -60}px)`;
    }

    if (hintRef.current) {
      hintRef.current.style.opacity = String(clamp01((0.12 - value) / 0.12));
    }

    CHAPTERS.forEach((ch, i) => {
      const el = chapterRefs.current[i];
      if (!el) return;
      const v = reducedRef.current ? 0 : chapterVis(value, ch.from, ch.to);
      el.style.opacity = String(v);
      const dx = (1 - v) * (ch.side === 'right' ? 80 : -80);
      el.style.transform = `translateY(-50%) translateX(${dx}px)`;

      const inner = el.querySelector<HTMLElement>('.sh-mask-inner');
      if (inner) inner.style.transform = `translateY(${(1 - v) * 110}%)`;

      const kicker = el.querySelector<HTMLElement>('.sh-ch-kicker');
      if (kicker) kicker.style.opacity = String(v);

      const desc = el.querySelector<HTMLElement>('.sh-ch-desc');
      if (desc) desc.style.opacity = String(clamp01((v - 0.15) / 0.85));
    });

    if (fillRef.current) fillRef.current.style.height = `${(value * 100).toFixed(1)}%`;
    if (dotRef.current) dotRef.current.style.top = `${(value * 100).toFixed(1)}%`;
  };

  const queueProgress = (p: number) => {
    progressRef.current = p;
    if (rafId.current) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = 0;
      applyProgress(progressRef.current);
    });
  };

  useMotionValueEvent(source, 'change', (p) => {
    if (!reduced) queueProgress(p);
  });

  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInRange(true);
      },
      { rootMargin: '800px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const screen = screenRef.current;
    const canvas = canvasRef.current;
    if (!screen || !canvas) return;

    const resize = () => {
      const layoutW = Math.max(1, screen.clientWidth);
      const layoutH = Math.max(1, screen.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(layoutW * dpr));
      canvas.height = Math.max(1, Math.round(layoutH * dpr));
      lastDrawn.current = -1;
      applyProgress(progressRef.current);

      const overlay = overlayRef.current;
      if (overlay) {
        const phone = isPhoneRef.current;
        const design = phone ? PHONE : DESKTOP;
        overlay.style.width = `${design.w}px`;
        overlay.style.height = `${design.h}px`;
        const scale = Math.min(layoutW / design.w, layoutH / design.h);
        const x = (layoutW - design.w * scale) / 2;
        const y = (layoutH - design.h * scale) / 2;
        overlay.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(screen);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPhone, reduced]);

  useEffect(() => {
    if (!inRange || reduced) return;

    const dir = isPhone ? 'mobile' : 'desktop';
    const arr: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    frames.current = arr;
    ready.current = new Uint8Array(FRAME_COUNT);
    maxReady.current = 0;
    lastDrawn.current = -1;
    setLoaded(0);

    let cancelled = false;
    const onLoaded = (i: number) => {
      if (cancelled) return;
      ready.current[i] = 1;
      while (maxReady.current < FRAME_COUNT && ready.current[maxReady.current]) maxReady.current++;
      setLoaded(maxReady.current / FRAME_COUNT);
      if (i <= Math.round(progressRef.current * (FRAME_COUNT - 1))) {
        lastDrawn.current = -1;
        applyProgress(progressRef.current);
      }
    };

    const loadBatch = async (start: number, end: number, conc: number) => {
      for (let s = start; s < end && !cancelled; s += conc) {
        await Promise.all(
          Array.from({ length: Math.min(conc, end - s) }, (_, k) => {
            const idx = s + k;
            return new Promise<void>((res) => {
              const img = new Image();
              img.onload = () => {
                onLoaded(idx);
                res();
              };
              img.onerror = () => res();
              img.src = frameSrc(dir, idx);
              arr[idx] = img;
            });
          }),
        );
      }
    };

    (async () => {
      await loadBatch(0, Math.min(16, FRAME_COUNT), 16);
      await loadBatch(16, FRAME_COUNT, 8);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inRange, isPhone, reduced]);

  useEffect(() => {
    applyProgress(reduced ? 0 : source.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, reduced]);

  const loadPct = Math.round(loaded * 100);
  const title2Raw = t.cases.mestiHero2;
  const outlineLines = isPhone ? title2Raw.split('\n') : [title2Raw.replace(/\n/g, ' ')];
  const title4 = t.cases.mestiCh4Title.split('\n');

  const screen = (
    <div ref={screenRef} className="mcs-screen">
      <img ref={posterRef} src={POSTER} alt="" className="mcs-poster" />
      <canvas ref={canvasRef} className="mcs-canvas" />
      <div ref={overlayRef} className={`mcs-overlay${isPhone ? ' is-phone' : ''}`}>
        <div className="sh-scrim" />
        <div className="sh-vignette" />
        <div className="sh-glow" />
        <div className="sh-grain" />

        <header className="hd" aria-hidden>
          <div className="hd-inner">
            <div className="hd-logo">
              <span className="hd-logo-text">
                <span className="solid">Mesti</span>
                <span className="logo-delivery">Delivery</span>
              </span>
            </div>
            <nav className="hd-nav">
              <span className="hd-link">
                {t.cases.mestiNavRestaurants}
                <i />
              </span>
              <span className="hd-link">
                {t.cases.mestiNavPartner}
                <i />
              </span>
              <span className="hd-link">
                {t.cases.mestiNavSupport}
                <i />
              </span>
            </nav>
            <div className="hd-actions">
              <span className="hd-divider" />
              <div className="hd-lang">
                <span className="hd-lang-btn">
                  <img src={currentLang.flag} alt="" className="hd-lang-flag" />
                  <span>{currentLang.name}</span>
                  <svg className="hd-chev" width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path
                      d="M1 1l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <span className="hd-cta">{t.cases.mestiRegister}</span>
              <span className="hd-burger" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </div>
        </header>

        <div ref={centerRef} className="sh-center">
          <div className="sh-center-body">
            <span className="sh-eyebrow">MestiDelivery · Mestia</span>
            <h1 className="sh-title">
              <span className="sh-title-solid">{t.cases.mestiHero1}</span>
              <span className="sh-title-outline">
                {outlineLines.map((line) => (
                  <span key={line} className="sh-title-outline-line">
                    {line}
                  </span>
                ))}
              </span>
            </h1>
            <p className="sh-subtitle">{t.cases.mestiHeroSub}</p>
            <span className="sh-cta">
              <span>{t.cases.mestiCta}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>

        <div ref={hintRef} className="sh-hint">
          <span>{t.cases.mestiHint}</span>
          <span className="sh-hint-line" />
        </div>

        {CHAPTERS.map((ch, i) => (
          <aside
            key={ch.num}
            ref={(el) => {
              chapterRefs.current[i] = el;
            }}
            className={`sh-chapter sh-chapter--${ch.side}${ch.num === '04' ? ' sh-chapter--final' : ''}`}
            style={{ opacity: 0 }}
          >
            <div className="sh-ch-kicker" style={{ opacity: 0 }}>
              <span className="sh-ch-kick-line" />
              <span className="sh-ch-kick-num">{ch.num}</span>
              <span className="sh-ch-kick-sep">/ 04</span>
            </div>
            <h2 className="sh-ch-title">
              <span className="sh-mask">
                <span className="sh-mask-inner" style={{ transform: 'translateY(110%)' }}>
                  {ch.num === '04'
                    ? title4.map((line) => (
                        <span key={line} className="sh-final-line">
                          {line}
                        </span>
                      ))
                    : t.cases[ch.title]}
                </span>
              </span>
            </h2>
            <p className="sh-ch-desc" style={{ opacity: 0 }}>
              {t.cases[ch.desc]}
            </p>
            {ch.num === '04' && (
              <span className="sh-cta sh-cta--final">
                <span>{t.cases.mestiCta}</span>
              </span>
            )}
          </aside>
        ))}

        <div className="sh-rail" aria-hidden>
          <div className="sh-rail-track">
            <div ref={fillRef} className="sh-rail-fill" />
            <div ref={dotRef} className="sh-rail-dot" />
          </div>
        </div>

        {!reduced && loaded < 1 && (
          <div className="sh-loader" aria-hidden>
            <div className="sh-loader-track">
              <div className="sh-loader-fill" style={{ width: `${Math.max(loadPct, 1)}%` }} />
            </div>
            <span className="sh-loader-label">{loadPct}%</span>
          </div>
        )}
      </div>
    </div>
  );

  const slide = (
    <article className="mcs-slide" onMouseEnter={cta.onEnter} onMouseLeave={cta.onLeave}>
      <div className="mcs-head">
        <p className="mcs-head-tag">01 / {t.cases.mestiDeliveryTag}</p>
        <h3 className="mcs-head-title">MestiDelivery</h3>
      </div>

      <div className="mcs-stage">
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
        <div className="case-stage-legend case-stage-legend--dark">
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
        {t.cases.mestiDeliveryResult}
      </p>
    </article>
  );

  return slide;
}
