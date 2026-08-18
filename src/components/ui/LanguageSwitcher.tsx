'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { Language } from '@/lib/i18n';
import { m, AnimatePresence } from 'framer-motion';

const LANGUAGES: { id: Language; label: string; flag: string }[] = [
  { id: 'ru', label: 'RU', flag: '🇷🇺' },
  { id: 'en', label: 'EN', flag: '🇬🇧' },
  { id: 'ka', label: 'GE', flag: '🇬🇪' },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="relative flex items-center rounded-full border border-line bg-bg2/80 p-1 backdrop-blur-md">
      {LANGUAGES.map((l) => {
        const isActive = lang === l.id;
        return (
          <button
            key={l.id}
            type="button"
            data-cursor="hover"
            onClick={() => setLang(l.id)}
            className={`relative flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono font-medium uppercase tracking-wider transition-colors duration-300 ${
              isActive ? 'text-bg' : 'text-muted hover:text-fg'
            }`}
          >
            {isActive && (
              <m.div
                layoutId="activeLangIndicator"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 text-xs">{l.flag}</span>
            <span className="relative z-10">{l.label}</span>
          </button>
        );
      })}
    </div>
  );
}
