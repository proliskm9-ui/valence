'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type LoadState = {
  /** Прелоадер завершён — можно запускать входные анимации */
  done: boolean;
  finish: () => void;
};

const LoadContext = createContext<LoadState>({ done: true, finish: () => {} });

export function LoadProvider({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);
  const value = useMemo(() => ({ done, finish }), [done, finish]);
  return <LoadContext.Provider value={value}>{children}</LoadContext.Provider>;
}

export const useLoaded = () => useContext(LoadContext);

/**
 * Фаза входной анимации с быстрым LCP:
 * - SSR и первый рендер — 'visible' (контент виден сразу, до JS);
 * - после маунта, пока прелоадер закрывает экран — 'hidden' (мгновенно);
 * - когда прелоадер закончил — 'visible' (анимация входа).
 * Скрытые состояния должны задавать transition { duration: 0 }.
 */
export function useRevealPhase(): 'hidden' | 'visible' {
  const { done } = useLoaded();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return done ? 'visible' : mounted ? 'hidden' : 'visible';
}
