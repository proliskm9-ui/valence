'use client';

export default function HeroCodeBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/* 1. Precision Minimal Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_40%,#000_60%,transparent_100%)]" />

      {/* 2. Fine Laser Horizon Line */}
      <div className="absolute top-[52%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
    </div>
  );
}
