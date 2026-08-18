'use client';

import { useEffect } from 'react';

export function LandingTracker() {
  useEffect(() => {
    try {
      // 1. Увеличиваем просмотры главной страницы
      const viewsRaw = localStorage.getItem('valence_landing_views');
      const currentViews = viewsRaw ? parseInt(viewsRaw, 10) + 1 : 1;
      localStorage.setItem('valence_landing_views', currentViews.toString());

      // 2. Уникальный посетитель (записывается ровно один раз на устройство/браузер)
      let visitorId = localStorage.getItem('valence_visitor_id');
      if (!visitorId) {
        visitorId = `uid_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;
        localStorage.setItem('valence_visitor_id', visitorId);

        const uniquesRaw = localStorage.getItem('valence_landing_uniques');
        const currentUniques = uniquesRaw ? parseInt(uniquesRaw, 10) + 1 : 1;
        localStorage.setItem('valence_landing_uniques', currentUniques.toString());
      }
    } catch {}
  }, []);

  return null;
}
