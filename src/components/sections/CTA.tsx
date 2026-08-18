'use client';

import { m } from 'framer-motion';
import Magnetic from '@/components/ui/Magnetic';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { EASE_OUT_EXPO } from '@/lib/site';

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section id="cta" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-48">
      <m.div
        className="overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <m.h2
          variants={{
            hidden: { y: '105%' },
            visible: { y: '0%', transition: { duration: 1, ease: EASE_OUT_EXPO } },
          }}
          className="font-display text-[clamp(3rem,12.5vw,13rem)] font-extrabold leading-[0.95] tracking-tight"
        >
          {t.cta.line1}
          <br />
          <span className="pl-[10vw]">{t.cta.line2}</span>
        </m.h2>
      </m.div>

      <m.div
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.25 }}
        className="relative z-10 mt-12 flex flex-col gap-6 md:absolute md:bottom-[18%] md:right-[8vw] md:mt-0 md:items-end"
      >
        <p className="max-w-xs text-[15px] leading-relaxed text-muted">
          {t.cta.sub}
        </p>
        <Magnetic>
          <a
            href="#contact"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-9 py-5 text-lg font-medium text-bg transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.97]"
          >
            {t.cta.btn}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Magnetic>
      </m.div>
    </section>
  );
}
