'use client';

import SectionHeading from '@/components/ui/SectionHeading';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { SITE } from '@/lib/site';

export default function PrivacyPageClient() {
  const { t } = useLanguage();
  const p = t.privacyPage;

  const sections = [
    { title: p.s1Title, body: p.s1Body },
    { title: p.s2Title, body: p.s2Body },
    { title: p.s3Title, body: p.s3Body },
    { title: p.s4Title, body: p.s4Body },
  ];

  return (
    <>
      <div className="px-5 pb-32 pt-32 md:px-10 md:pt-40">
        <SectionHeading as="h1" index={p.headingIndex} label={p.headingLabel} title={p.headingTitle} />
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          {p.updated}
        </p>
        <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted md:text-base">
          {p.intro}
        </p>

        <div className="mt-16 flex max-w-2xl flex-col gap-12 md:mt-20">
          {sections.map((s) => (
            <div key={s.title} className="border-t border-line pt-8">
              <h2 className="font-display text-xl font-extrabold tracking-tight md:text-2xl">
                {s.title}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted md:text-base">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20">
          <a
            href={`mailto:${SITE.email}`}
            data-cursor="hover"
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-9 py-5 text-lg font-medium text-bg transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.97]"
          >
            {p.contactCta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
