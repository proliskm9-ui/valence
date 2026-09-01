'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { Language } from '@/lib/i18n';

const LANGUAGES: { id: Language; label: string }[] = [
  { id: 'ru', label: 'RU' },
  { id: 'en', label: 'EN' },
  { id: 'ka', label: 'GE' },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center rounded-full border border-line/60 bg-bg2/80 p-0.5 backdrop-blur-md md:p-1">
      {LANGUAGES.map((l) => {
        const isActive = lang === l.id;
        return (
          <button
            key={l.id}
            type="button"
            data-cursor="hover"
            onClick={() => setLang(l.id)}
            className={`rounded-full px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider transition-colors duration-200 md:px-2.5 md:py-1 md:text-[11px] ${
              isActive ? 'bg-accent font-bold text-bg' : 'text-muted hover:text-text'
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
