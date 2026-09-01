'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { SITE } from '@/lib/site';
import { useLanguage } from '@/components/providers/LanguageProvider';

const SOCIALS = [
  { label: 'telegram', href: SITE.telegram },
  { label: 'whatsapp', href: 'https://wa.me/995599112233' },
];

export default function Footer() {
  const { lang, t } = useLanguage();

  const PAGES = [
    { href: '/#services', label: t.nav.services },
    { href: '/#cases', label: t.nav.work },
    { href: '/#process', label: t.nav.process },
    { href: '/#contact', label: t.nav.contact },
    { href: '/privacy', label: t.footer.privacyLabel },
  ];

  return (
    <footer id="footer" className="relative border-t border-white/8 bg-[#060608] px-5 pt-14 md:px-10 md:pt-20 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-12 md:gap-8">
          {/* ── Contact / Email Column ── */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{lang === 'en' ? 'DIRECT CONTACT' : lang === 'ka' ? 'კონტაქტი' : 'ПРЯМОЙ КОНТАКТ'}</span>
            </div>

            <a
              href={`mailto:${SITE.email}`}
              data-cursor="hover"
              className="mt-3 block w-fit font-display text-[clamp(1.3rem,5.5vw,2rem)] font-bold tracking-tight text-fg transition-colors hover:text-accent"
            >
              {SITE.email}
            </a>

            <p className="mt-2 text-xs leading-relaxed text-muted/75 max-w-xs">
              {lang === 'en'
                ? 'Engineering high-conversion digital experiences across CIS, Georgia and Europe.'
                : lang === 'ka'
                ? 'ვქმნით მაღალკონვერსიულ ციფრულ პროდუქტებს საქართველოში და ევროპაში.'
                : 'Разрабатываем высококонверсионные веб-сервисы и сайты для бизнеса по всему миру.'}
            </p>
          </div>

          {/* ── Navigation Links (Menu & Socials) ── */}
          <div className="grid grid-cols-2 gap-8 md:col-span-6 md:justify-items-end">
            {/* Menu */}
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                {t.nav.menu}
              </p>
              <ul className="mt-3 flex flex-col gap-2 font-mono text-xs">
                {PAGES.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      data-cursor="hover"
                      className="capitalize text-muted transition-colors hover:text-fg"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                {lang === 'en' ? 'SOCIALS' : 'СОЦСЕТИ'}
              </p>
              <ul className="mt-3 flex flex-col gap-2 font-mono text-xs">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="text-muted transition-colors hover:text-accent"
                    >
                      {s.label} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Smooth Kinetic Running Marquee: VALENCE ── */}
      <div aria-hidden className="mt-8 overflow-hidden md:mt-14 select-none pointer-events-none pb-3 md:pb-6">
        <m.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 20, repeat: Infinity }}
          className="flex w-max whitespace-nowrap"
        >
          <span className="font-display text-[clamp(4.2rem,17vw,13rem)] font-black tracking-tight text-fg/[0.08] pr-8 sm:pr-12">
            VALENCE · VALENCE · VALENCE · VALENCE · 
          </span>
          <span className="font-display text-[clamp(4.2rem,17vw,13rem)] font-black tracking-tight text-fg/[0.08] pr-8 sm:pr-12">
            VALENCE · VALENCE · VALENCE · VALENCE · 
          </span>
        </m.div>
      </div>
    </footer>
  );
}
