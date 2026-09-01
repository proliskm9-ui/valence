type Props = {
  href: string;
  label: string;
  className?: string;
};

export default function CaseOpenLink({ href, label, className = '' }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="view"
      className={`inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-bg transition-transform duration-300 hover:scale-[1.04] active:scale-[0.97] md:px-5 md:py-2.5 md:text-[11px] md:tracking-[0.18em] ${className}`}
    >
      {label}
      <span aria-hidden className="text-[13px] leading-none">
        ↗
      </span>
    </a>
  );
}
