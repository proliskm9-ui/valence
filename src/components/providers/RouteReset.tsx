'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';

/**
 * Многостраничник живёт в одном layout — Lenis и обычный scroll не сбрасываются
 * сами при клиентской навигации между страницами. Без этого переход, например,
 * с середины длинной /cases на короткую /contact оставляет пользователя
 * в пустоте посреди экрана.
 */
export default function RouteReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}
