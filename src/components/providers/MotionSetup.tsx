'use client';

import {
  LazyMotion,
  MotionConfig,
  MotionGlobalConfig,
  domAnimation,
} from 'framer-motion';

// ?np=1 — все анимации мгновенно в финальном состоянии (скриншоты, автотесты)
if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('np')) {
  MotionGlobalConfig.skipAnimations = true;
}

/** LazyMotion (лёгкий бандл, компоненты `m.`) + prefers-reduced-motion */
export default function MotionSetup({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
