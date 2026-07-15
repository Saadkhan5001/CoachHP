/**
 * Non-interactive "final frame" of the About section, shown only while
 * `ClassicMobileTransitionStage` is pinned on mobile (see About.tsx).
 * Reproduces the section's light background + a decorative fragment of the
 * bio card's bottom edge (CTA pill + social row) — never real DOM cloned
 * from the live section, no functional links/buttons. Always rendered
 * inside an `aria-hidden`/`inert` ancestor.
 */
export function ClassicAboutTerminalView() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-light-bg">
      <div className="absolute inset-x-5 bottom-10 rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:inset-x-8">
        <div className="h-2.5 w-28 rounded-full bg-black/10" />
        <div className="mt-6 flex items-center justify-between">
          <span className="inline-flex h-[42px] min-w-[150px] items-center justify-between gap-3 rounded-full bg-[#c01d18] px-5 text-[0.95rem] font-medium text-white">
            Get in Touch
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0f0f0f]" />
          </span>
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-9 w-9 rounded-full bg-black/[0.04]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
