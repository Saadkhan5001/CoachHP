"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  /** Stagger delay in ms, applied to the transition only. */
  delay?: number;
  className?: string;
};

/**
 * One-shot IntersectionObserver reveal for /classic-mobile-v2 interior
 * content. Hidden state lives in mobile-v2.css behind
 * `@media (scripting: enabled)` so no-JS visitors always see content.
 * Never wrap `.v2-stack` / `.v2-stack-held` / `.v2-stack-riser` in this —
 * a transformed ancestor silently breaks sticky positioning.
 */
export function ClassicMobileReveal({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`v2-reveal ${shown ? "v2-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
