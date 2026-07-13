export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <g stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9v6" />
          <path d="M6 6v12" />
          <path d="M18 6v12" />
          <path d="M21 9v6" />
          <path d="M6 12h12" />
        </g>
      </svg>
      <span className="text-[1.15rem] font-semibold tracking-tight">Curtis</span>
    </span>
  );
}
