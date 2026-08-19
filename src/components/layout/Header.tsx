'use client';

import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { useRevealPhase } from '@/components/providers/LoadProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { SITE, EASE_OUT_EXPO } from '@/lib/site';

export default function Header() {
  const phase = useRevealPhase();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const NAV = [
    { href: '#services', label: t.nav.services },
    { href: '#work', label: t.nav.work },
    { href: '#process', label: t.nav.process },
    { href: '#contact', label: t.nav.contact },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <m.header
      initial={false}
      animate={phase}
      variants={{
        hidden: { y: -20, opacity: 0, transition: { duration: 0 } },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.9 },
        },
      }}
      className={`fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between px-5 md:h-20 md:px-10 ${
        open ? 'bg-bg' : 'bg-gradient-to-b from-bg via-bg/70 to-transparent'
      }`}
    >
      <a
        href="#top"
        data-cursor="hover"
        className="relative z-50 font-display text-lg font-bold tracking-tight"
        onClick={() => setOpen(false)}
      >
        {SITE.name}
        <span className="text-accent">·</span>
      </a>

      <div className="relative z-50 flex items-center gap-3 md:gap-6">
        <nav aria-label="Основная навигация" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-cursor="hover"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <LanguageSwitcher />

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-line md:hidden"
          aria-label={open ? t.nav.close : t.nav.menu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-px w-4 bg-fg transition-transform ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
          <span className={`h-px w-4 bg-fg transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-px w-4 bg-fg transition-transform ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open ? (
        <nav
          aria-label={t.nav.work}
          className="fixed inset-0 z-40 flex flex-col justify-center gap-7 bg-bg px-6 pt-16 md:hidden"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-display text-4xl font-extrabold tracking-tight"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
    </m.header>
  );
}
