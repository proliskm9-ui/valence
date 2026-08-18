'use client';

import { useRef, useState, useEffect } from 'react';
import { m, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Обёртка: содержимое притягивается к курсору.
 * На тач-устройствах и при reduced motion — обычный div.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);
  const x = useSpring(0, { stiffness: 180, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 180, damping: 16, mass: 0.4 });

  useEffect(() => {
    setFine(window.matchMedia('(pointer: fine)').matches);
  }, []);

  if (reduced || !fine) return <div className={className}>{children}</div>;

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </m.div>
  );
}
