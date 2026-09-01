'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AnimatePresence,
  m,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import CaseOpenLink from '@/components/cases/CaseOpenLink';
import { MacBookAirChrome, PhoneAssetChrome } from '@/components/cases/DeviceChrome';
import { useCaseCta } from '@/components/cases/useCaseCta';
import type { Language } from '@/lib/i18n';
import './mesti-hero-overlay.css';

type CaseView = 'desktop' | 'mobile';
const MOBILE_MQ = '(max-width: 767px)';

const MESTI_LANGS: { code: Language; name: string; flag: string }[] = [
  { code: 'ru', name: 'RU', flag: '/cases/mesti-ui/RU.png' },
  { code: 'ka', name: 'KA', flag: '/cases/mesti-ui/GE.png' },
  { code: 'en', name: 'EN', flag: '/cases/mesti-ui/US.png' },
];

const FRAME_COUNT = 240;
const POSTER = '/cases/mesti-hero/poster.webp?v=wm7';
const LIVE_URL = 'https://mestidelivery.com/';
const SHOT_HOME = '/cases/mesti-shots/home.png?v=4';
const SHOT_MENU = '/cases/mesti-shots/menu.png?v=4';
const SHOT_RESTAURANTS = '/cases/mesti-shots/restaurants.png?v=4';
const FADE = 0.07;
const DESKTOP = { w: 1440, h: 900 };

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
  return `/cases/mesti-hero/${dir}/frame_${String(index + 1).padStart(4, '0')}.webp?v=wm7`;
}

type Props = {
  progress?: MotionValue<number>;
  openLabel: string;
  /** Заданы только в общей ленте на главной — ведут на отдельную страницу кейса. */
  readCaseHref?: string;
  readCaseLabel?: string;
  /** h1 — когда компонент это главный заголовок отдельной страницы кейса. */
  titleTag?: 'h1' | 'h3';
};

export default function MestiCaseShowcase({
  progress,
  openLabel,
  readCaseHref,
  readCaseLabel,
  titleTag = 'h3',
}: Props) {
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

  const [view, setView] = useState<CaseView>('desktop');
  const isPhone = view === 'mobile';
  const viewLocked = useRef(false);
  const [inRange, setInRange] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const reducedRef = useRef(!!reduced);
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

  // Default: PC MacBook screen on all viewports for consistent presentation
  useEffect(() => {
    if (!viewLocked.current) {
      setView('desktop');
    }
  }, []);

  const selectView = (next: CaseView) => {
    viewLocked.current = true;
    setView(next);
  };

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
    if (!el || isPhone) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInRange(true);
      },
      { rootMargin: '800px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isPhone]);

  useLayoutEffect(() => {
    if (isPhone) return;

    let ro: ResizeObserver | null = null;
    let raf = 0;
    let cancelled = false;

    const resize = () => {
      const screen = screenRef.current;
      const canvas = canvasRef.current;
      if (!screen || !canvas) return false;

      const layoutW = Math.max(1, screen.clientWidth);
      const layoutH = Math.max(1, screen.clientHeight);
      // Screen not laid out yet (AnimatePresence / flex chrome still settling)
      if (screen.clientWidth < 2 || screen.clientHeight < 2) return false;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(layoutW * dpr));
      canvas.height = Math.max(1, Math.round(layoutH * dpr));
      lastDrawn.current = -1;
      applyProgress(progressRef.current);

      const overlay = overlayRef.current;
      if (overlay) {
        overlay.style.width = `${DESKTOP.w}px`;
        overlay.style.height = `${DESKTOP.h}px`;
        /* Cover the MacBook screen slot — contain left letterbox bars top/bottom. */
        const scale = Math.max(layoutW / DESKTOP.w, layoutH / DESKTOP.h);
        const x = (layoutW - DESKTOP.w * scale) / 2;
        const y = (layoutH - DESKTOP.h * scale) / 2;
        overlay.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        overlay.classList.add('is-scaled');
      }
      return true;
    };

    const bind = () => {
      if (cancelled) return;
      if (!resize()) {
        raf = requestAnimationFrame(bind);
        return;
      }
      const screen = screenRef.current;
      if (!screen) return;
      ro = new ResizeObserver(() => {
        resize();
      });
      ro.observe(screen);
    };

    bind();

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      ro?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPhone, reduced]);

  useEffect(() => {
    if (!inRange || reduced || isPhone) return;

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
              img.src = frameSrc('desktop', idx);
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
  const outlineLines = [t.cases.mestiHero2.replace(/\n/g, ' ')];
  const title4 = t.cases.mestiCh4Title.split('\n');

  const liveScreen = (
    <div ref={screenRef} className="mcs-screen mcs-screen--live">
      <img ref={posterRef} src={POSTER} alt="" className="mcs-poster" />
      <canvas ref={canvasRef} className="mcs-canvas" />
      <div ref={overlayRef} className="mcs-overlay">
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
            {/* Это воссоздание чужого сайта внутри макета устройства, а не
                заголовок страницы Valence — намеренно не <h1>/<h2>. */}
            <p className="sh-title">
              <span className="sh-title-solid">{t.cases.mestiHero1}</span>
              <span className="sh-title-outline">
                {outlineLines.map((line) => (
                  <span key={line} className="sh-title-outline-line">
                    {line}
                  </span>
                ))}
              </span>
            </p>
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

  return (
    <article className={`mcs-slide${cta.visible ? ' is-cta' : ''}`}>
      <div
        className="mcs-head"
        onMouseEnter={cta.onHeadEnter}
        onMouseLeave={cta.onHeadLeave}
      >
        <div className="mcs-head-copy">
          <p className="mcs-head-tag text-accent font-mono text-[10.5px] uppercase font-bold tracking-[0.2em]">
            01 // {t.cases.mestiDeliveryTag}
          </p>
          {(() => {
            const TitleTag = titleTag;
            return <TitleTag className="mcs-head-title">MestiDelivery</TitleTag>;
          })()}
        </div>
      </div>

      <div
        className={`mcs-stage mcs-stage--mesti${isPhone ? ' is-phones' : ' is-macbook'}`}
        onMouseEnter={cta.onStageEnter}
        onMouseLeave={cta.onStageLeave}
      >
        <div className="mcs-stage-atmos" aria-hidden>
          <div className="mcs-stage-photo" />
          <div className="mcs-stage-grade" />
          <div className="mcs-stage-grain" />
        </div>
        <a
          href={LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="case-hit"
          aria-label={t.cases.openCase}
        />
        <div className={`mcs-device ${isPhone ? 'mcs-device--trio' : 'mcs-device--macbook'}`}>
          <AnimatePresence initial={false}>
            <m.div
              key={view}
              className="mcs-device-swap"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
              }
            >
              {isPhone ? (
                <div className="mcs-trio-row">
                  <PhoneAssetChrome className="mcs-trio mcs-trio--side mcs-trio--left">
                    <img src={SHOT_RESTAURANTS} alt="" className="mcs-shot" />
                  </PhoneAssetChrome>
                  <PhoneAssetChrome className="mcs-trio mcs-trio--hero">
                    <img src={SHOT_HOME} alt="" className="mcs-shot" />
                  </PhoneAssetChrome>
                  <PhoneAssetChrome className="mcs-trio mcs-trio--side mcs-trio--right">
                    <img src={SHOT_MENU} alt="" className="mcs-shot" />
                  </PhoneAssetChrome>
                </div>
              ) : (
                <MacBookAirChrome>{liveScreen}</MacBookAirChrome>
              )}
            </m.div>
          </AnimatePresence>
        </div>

        <div
          className="case-view-toggle"
          role="group"
          aria-label={lang === 'en' ? 'Device preview' : lang === 'ka' ? 'მოწყობილობის გადახედვა' : 'Превью устройства'}
        >
          <m.span
            className="case-view-toggle__pill"
            aria-hidden
            initial={false}
            animate={{ x: view === 'desktop' ? 0 : '100%' }}
            transition={
              reduced
                ? { duration: 0 }
                : { type: 'spring', stiffness: 480, damping: 38, mass: 0.7 }
            }
          />
          {(
            [
              {
                id: 'desktop' as const,
                label: 'PC',
                title: lang === 'en' ? 'Desktop' : lang === 'ka' ? 'დესკტოპი' : 'Компьютер',
              },
              {
                id: 'mobile' as const,
                label: 'Mob',
                title: lang === 'en' ? 'Mobile' : lang === 'ka' ? 'მობილური' : 'Мобильный',
              },
            ] as const
          ).map((opt) => {
            const on = view === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                className={`case-view-toggle__btn${on ? ' is-on' : ''}`}
                aria-pressed={on}
                title={opt.title}
                onClick={() => selectView(opt.id)}
              >
                <span className="case-view-toggle__label">
                  {opt.id === 'desktop' ? (
                    <svg className="case-view-toggle__icon" viewBox="0 0 24 24" aria-hidden>
                      <rect x="3" y="4" width="18" height="12" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
                      <path d="M8 20h8M12 16v4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg className="case-view-toggle__icon" viewBox="0 0 24 24" aria-hidden>
                      <rect x="7" y="2.5" width="10" height="19" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
                      <path d="M10.5 18.5h3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                  )}
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mcs-note hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:block">
        {t.cases.mestiDeliveryResult}
      </p>
    </article>
  );
}
