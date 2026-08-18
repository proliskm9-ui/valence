import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-[#0a0a0b] px-6 text-[#f4f4f2] overflow-hidden">
      {/* Background grid pattern matching site */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Glow blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04] blur-[120px]"
        style={{ backgroundColor: 'var(--accent, #d7ff3e)' }}
      />

      {/* Big 404 backdrop */}
      <span
        aria-hidden
        className="absolute font-display text-[clamp(12rem,35vw,30rem)] font-extrabold leading-none select-none pointer-events-none"
        style={{ color: 'rgba(255,255,255,0.025)', letterSpacing: '-0.06em' }}
      >
        404
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-xl">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--accent,#d7ff3e)]">
          ошибка · 404
        </span>

        <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[1.05] tracking-tight">
          Страница<br />
          <span className="text-[color:var(--accent,#d7ff3e)]">не найдена</span>
        </h1>

        <p className="max-w-sm text-[15px] leading-relaxed text-muted">
          Кажется, эта страница переехала или была удалена. Вернитесь на главную и попробуйте снова.
        </p>

        <div className="mt-2 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-medium text-bg transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.97]"
          >
            На главную
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/#contact"
            className="font-mono text-[13px] text-muted hover:text-[#f4f4f2] transition-colors"
          >
            Связаться с нами
          </Link>
        </div>
      </div>
    </div>
  );
}
