'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';

export default function Marquee() {
  const { t } = useLanguage();

  function Row() {
    return (
      <div className="flex shrink-0 items-center">
        {t.marquee.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center">
            <span
              className={`px-6 font-display text-2xl font-extralight lowercase md:px-10 md:text-4xl ${
                i % 2 ? 'text-outline' : 'text-muted'
              }`}
            >
              {item}
            </span>
            <span className="text-accent">·</span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-line py-4 md:py-6"
    >
      <div className="marquee-track flex w-max">
        <Row />
        <Row />
      </div>
    </div>
  );
}
