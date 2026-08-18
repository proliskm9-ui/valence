'use client';

import { ReactLenis } from 'lenis/react';
import { useReducedMotion } from 'framer-motion';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <ReactLenis root options={{ duration: 1.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
