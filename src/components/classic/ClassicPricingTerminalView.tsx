/**
 * Non-interactive "final frame" of the Pricing section, shown only while
 * `ClassicMobileTransitionStage` is pinned on mobile (see Pricing.tsx).
 * Reproduces the section's background + a decorative fragment of the
 * featured card's bottom edge — never real DOM cloned from the live
 * section, no functional links/buttons/list semantics. Always rendered
 * inside an `aria-hidden`/`inert` ancestor.
 */
export function ClassicPricingTerminalView() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-dark-bg">
      <div
        className="absolute inset-0 bg-cover bg-left"
        style={{ backgroundImage: "url(/images/classic/pricing-bg.jpg)" }}
      />
      <div className="absolute inset-0 bg-[#0b0d0e]/75" />

      <div className="absolute inset-x-5 bottom-10 rounded-[26px] bg-black/90 p-6 sm:inset-x-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c01d18] px-3 py-1.5 text-[0.78rem] font-semibold text-white">
          Most Effective
        </span>
        <div className="mt-5 space-y-3.5">
          {["In-person weekly sessions", "Tracking & accountability"].map((label) => (
            <span key={label} className="flex items-center gap-3 text-[0.95rem] text-white/70">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
