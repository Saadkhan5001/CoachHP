"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** The outgoing section — scrolls fully, then holds at its final viewport. */
  held: React.ReactNode;
  /** The incoming panel — rises a full viewport over the held section. */
  riser: React.ReactNode;
  id?: string;
};

/**
 * Stack scene for /classic-mobile — the reference template's own
 * mechanism, confirmed frame-by-frame from the physical-phone recording:
 * the REAL outgoing section is `position: sticky` with a negative `top`
 * of exactly -(sectionHeight - viewportHeight). It therefore scrolls
 * completely normally (sticky cannot engage until its bottom edge reaches
 * the viewport bottom, i.e. after every card/CTA has been seen), then
 * freezes at its true final viewport while the incoming panel — its next
 * sibling, higher z-index — rises a full viewport over it in plain
 * document flow.
 *
 * The ONLY JavaScript here is a ResizeObserver writing the held section's
 * measured height into the `--held-h` CSS custom property when LAYOUT
 * changes (mount, image load, font swap, orientation) — never on scroll.
 * The offset itself is computed by the CSS engine
 * (`top: min(0px, calc(100svh - var(--held-h)))` in mobile-v2.css), so
 * viewport resolution — including address-bar show/hide, via `svh` —
 * stays fully browser-native. Nothing on this route reads scroll
 * position or writes styles during scrolling.
 *
 * Without JS the `--held-h` fallback keeps sticky disengaged and both
 * sections read in plain flow. Under prefers-reduced-motion the CSS
 * disables the sticky hold entirely.
 *
 * Neither this wrapper nor the two child wrappers may ever gain
 * overflow, transform, filter or contain rules — any of those silently
 * kills sticky (the root cause of a previous /classic failure).
 */
export function ClassicMobileStackScene({ held, riser, id }: Props) {
  const heldRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = heldRef.current;
    if (!el) return;
    const write = () => {
      el.style.setProperty("--held-h", `${el.offsetHeight}px`);
    };
    write();
    const ro = new ResizeObserver(write);
    ro.observe(el);
    window.addEventListener("orientationchange", write);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", write);
    };
  }, []);

  return (
    <div className="cm-stack" id={id}>
      <div className="cm-stack-held" ref={heldRef}>
        {held}
      </div>
      <div className="cm-stack-riser">{riser}</div>
    </div>
  );
}
