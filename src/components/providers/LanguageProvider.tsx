'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof TRANSLATIONS['ru'];
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ru',
  setLang: () => {},
  t: TRANSLATIONS.ru,
});

const STORAGE_KEY = 'valence:lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('ru');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && (saved === 'ru' || saved === 'en' || saved === 'ka')) {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    document.documentElement.lang = newLang;
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: t as typeof TRANSLATIONS['ru'] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
