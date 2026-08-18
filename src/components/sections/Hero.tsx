'use client';

import { m } from 'framer-motion';
import { useRevealPhase } from '@/components/providers/LoadProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';
import Magnetic from '@/components/ui/Magnetic';
import { EASE_OUT_EXPO } from '@/lib/site';

const mask = (delay: number) => ({
  hidden: { y: '110%', transition: { duration: 0 } },
  visible: {
    y: '0%',
    transition: { duration: 0.95, ease: EASE_OUT_EXPO, delay },
  },
});

const fade = (delay: number) => ({
  hidden: { y: 24, opacity: 0, transition: { duration: 0 } },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO, delay },
  },
});

function MaskedLine({
  phase,
  delay,
  children,
}: {
  phase: 'hidden' | 'visible';
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <span className="block overflow-y-clip pb-[0.08em]">
      <m.span
        className="block will-change-transform"
        initial={false}
        animate={phase}
        variants={mask(delay)}
      >
        {children}
      </m.span>
    </span>
  );
}

export default function Hero() {
  const phase = useRevealPhase();
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col px-5 pb-8 pt-24 md:px-10 md:pb-10 md:pt-32"
    >
      {/* верхняя мета-строка */}
      <m.div
        initial={false}
        animate={phase}
        variants={fade(1.15)}
        className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-muted"
      >
        <span>{t.hero.metaLeft}</span>
        <span className="hidden md:block">{t.hero.metaRight}</span>
      </m.div>

      {/* заголовок */}
      <h1 className="flex flex-1 flex-col justify-center py-10 font-display leading-[1.02] tracking-tight">
        <MaskedLine phase={phase} delay={0.12}>
          <span className="text-[clamp(2.8rem,9.5vw,10.5rem)] font-extrabold">
            {t.hero.line1}
          </span>
        </MaskedLine>

        <MaskedLine phase={phase} delay={0.25}>
          <span className="mt-1 block pl-[7vw] text-[clamp(1.4rem,4.2vw,4.6rem)] font-extralight md:mt-3">
            {t.hero.line2}{' '}
            <span className="relative inline-block">
              {t.hero.line3}
              <m.span
                aria-hidden
                className="absolute -left-[2%] top-[55%] h-[0.07em] w-[104%] -rotate-[1.5deg] bg-muted will-change-transform"
                style={{ originX: 0 }}
                initial={false}
                animate={phase}
                variants={{
                  hidden: { scaleX: 0, transition: { duration: 0 } },
                  visible: {
                    scaleX: 1,
                    transition: { duration: 0.5, ease: EASE_OUT_EXPO, delay: 1.2 },
                  },
                }}
              />
            </span>
            ,
          </span>
        </MaskedLine>

        <MaskedLine phase={phase} delay={0.38}>
          <span className="block pl-[3vw] text-[clamp(2.8rem,9.5vw,10.5rem)] font-extrabold md:pl-[10vw]">
            <span className="text-accent">{t.hero.line4}</span>
          </span>
        </MaskedLine>
      </h1>

      {/* нижняя строка: подзаголовок / скролл / CTA */}
      <div className="grid items-end gap-8 md:grid-cols-12">
        <m.p
          initial={false}
          animate={phase}
          variants={fade(1.3)}
          className="max-w-md text-[15px] leading-relaxed text-muted md:col-span-5 md:text-lg"
        >
          {t.hero.sub}
        </m.p>

        <m.div
          initial={false}
          animate={phase}
          variants={fade(1.45)}
          className="hidden flex-col items-center gap-3 md:col-span-2 md:flex"
          aria-hidden
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            {t.hero.scroll}
          </span>
          <span className="block h-14 w-px overflow-hidden bg-line">
            <span className="scroll-hint-bar block h-1/2 w-px bg-accent" />
          </span>
        </m.div>

        <m.div
          initial={false}
          animate={phase}
          variants={fade(1.4)}
          className="flex md:col-span-5 md:justify-end"
        >
          <Magnetic>
            <a
              href="#contact"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-medium text-bg transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.97]"
            >
              {t.hero.btnDiscuss}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
        </m.div>
      </div>
    </section>
  );
}
