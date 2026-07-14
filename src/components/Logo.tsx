export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Coach P Factory">
      <span
        aria-hidden="true"
        className="grid h-7 w-7 shrink-0 place-items-center border border-accent text-accent"
        style={{ fontWeight: 800, fontSize: "12px", letterSpacing: "-0.02em" }}
      >
        CP
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-extrabold uppercase leading-none tracking-[-0.01em]">
          Coach&nbsp;P
        </span>
        <span
          className="mt-[3px] text-[9px] font-semibold uppercase leading-none text-accent"
          style={{ letterSpacing: "0.34em" }}
        >
          Factory
        </span>
      </span>
    </span>
  );
}
