'use client';

import { m } from 'framer-motion';
import { useRevealPhase } from '@/components/providers/LoadProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { SITE, EASE_OUT_EXPO } from '@/lib/site';

export default function Header() {
  const phase = useRevealPhase();
  const { t } = useLanguage();

  const NAV = [
    { href: '#services', label: t.nav.services },
    { href: '#work', label: t.nav.work },
    { href: '#process', label: t.nav.process },
    { href: '#contact', label: t.nav.contact },
  ];

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
      className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between bg-gradient-to-b from-bg via-bg/70 to-transparent px-5 md:h-20 md:px-10"
    >
      <a
        href="#top"
        data-cursor="hover"
        className="font-display text-lg font-bold tracking-tight"
      >
        {SITE.name}
        <span className="text-accent">·</span>
      </a>

      <div className="flex items-center gap-6">
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
      </div>
    </m.header>
  );
}
