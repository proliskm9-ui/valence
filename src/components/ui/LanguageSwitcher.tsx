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
    <div className="flex items-center rounded-full border border-line bg-bg2/80 p-1 backdrop-blur-md">
      {LANGUAGES.map((l) => {
        const isActive = lang === l.id;
        return (
          <button
            key={l.id}
            type="button"
            data-cursor="hover"
            onClick={() => setLang(l.id)}
            className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider transition-colors duration-300 md:px-3 md:text-[11px] ${
              isActive ? 'bg-accent text-bg' : 'text-muted hover:text-fg'
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
