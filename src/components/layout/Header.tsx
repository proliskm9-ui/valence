'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { SITE, getWhatsAppUrl } from '@/lib/site';

export default function Header() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const whatsappUrl = getWhatsAppUrl(lang);

  const NAV = [
    { href: '/services', label: t.nav.services },
    { href: '/cases', label: t.nav.work },
    { href: '/process', label: t.nav.process },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* ── 1. DESKTOP HEADER (Fixed top, full width, original classic layout) ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 hidden h-20 items-center justify-between px-10 transition-all duration-300 md:flex ${
          scrolled
            ? 'border-b border-line/40 bg-bg/85 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl'
            : 'border-b border-transparent bg-gradient-to-b from-bg/90 via-bg/40 to-transparent backdrop-blur-sm'
        }`}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          data-cursor="hover"
          className="font-display text-lg font-bold tracking-tight text-fg transition-opacity hover:opacity-90"
        >
          {SITE.name}
          <span className="text-accent font-black">·</span>
        </Link>

        {/* Right-aligned Navigation Group + Language Switcher */}
        <div className="flex items-center gap-6 lg:gap-8">
          <nav aria-label="Основная навигация" className="flex items-center gap-6 lg:gap-8">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-cursor="hover"
                className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <LanguageSwitcher />
        </div>
      </header>

      {/* ── 2. MOBILE FLOATING PILL HEADER (Strictly contained, 100% visible) ── */}
      <header className="fixed top-3.5 left-3 right-3 z-50 flex h-12 max-w-[calc(100vw-1.5rem)] mx-auto items-center justify-between rounded-full border border-line/60 bg-[#0c0c10]/95 px-4 shadow-[0_8px_25px_rgba(0,0,0,0.75)] backdrop-blur-2xl md:hidden box-border">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 font-display text-sm font-bold tracking-tight text-fg"
          onClick={() => setOpen(false)}
        >
          {SITE.name}
          <span className="text-accent font-black">·</span>
        </Link>

        {/* Right Controls: Language Switcher + Premium Burger */}
        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />

          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-fg transition-all active:scale-90"
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg className="h-4 w-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-4 w-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ── 3. FULLSCREEN MOBILE MENU (Burger Drawer) ── */}
      {open ? (
        <nav
          aria-label={t.nav.work}
          className="fixed inset-0 z-40 flex flex-col justify-center gap-6 bg-bg/95 px-8 pt-16 backdrop-blur-3xl md:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-3xl font-extrabold tracking-tight text-fg"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-8 border-t border-line/20 pt-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366]/20 py-3.5 font-mono text-xs font-bold text-[#25D366]"
            >
              WhatsApp ({lang === 'ka' ? '+995 598 90 28 76' : '+7 995 317 35 44'})
            </a>
          </div>
        </nav>
      ) : null}
    </>
  );
}
