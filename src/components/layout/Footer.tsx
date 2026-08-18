'use client';

import { SITE } from '@/lib/site';
import { useLanguage } from '@/components/providers/LanguageProvider';

const SOCIALS = [
  { label: 'telegram', href: SITE.telegram },
  { label: 'instagram', href: '#' },
  { label: 'behance', href: '#' },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="footer" className="border-t border-line px-5 pt-16 md:px-10 md:pt-24">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            {t.nav.contact}
          </p>
          <a
            href={`mailto:${SITE.email}`}
            data-cursor="hover"
            className="mt-4 block w-fit font-display text-2xl font-semibold tracking-tight transition-colors hover:text-accent md:text-4xl"
          >
            {SITE.email}
          </a>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            socials
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href !== '#' ? '_blank' : undefined}
                  rel={s.href !== '#' ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    if (s.href === '#') {
                      e.preventDefault();
                    }
                  }}
                  data-cursor="hover"
                  className={`font-mono text-sm transition-colors ${
                    s.href === '#' ? 'text-muted/60 cursor-not-allowed' : 'text-muted hover:text-fg'
                  }`}
                >
                  {s.label} →
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 md:col-span-3 md:col-start-10 md:items-end">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            © {new Date().getFullYear()} {SITE.name}·
          </p>
          <p className="font-mono text-[11px] text-muted">{t.footer.rights}</p>
        </div>
      </div>

      {/* большой логотип, обрезанный нижней кромкой */}
      <div aria-hidden className="mt-10 overflow-hidden md:mt-16">
        <p className="translate-y-[22%] select-none text-center font-display text-[21vw] font-extrabold leading-[0.85] tracking-tight text-fg/[0.06]">
          {SITE.name}·
        </p>
      </div>
    </footer>
  );
}
