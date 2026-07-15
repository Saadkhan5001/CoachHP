"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  /** Stagger delay in ms, applied to the transition only. */
  delay?: number;
  className?: string;
};

/**
 * One-shot IntersectionObserver reveal for /classic-mobile interior
 * content. Hidden state lives in mobile-v2.css behind
 * `@media (scripting: enabled)` so no-JS visitors always see content.
 * Never wrap `.cm-stack` / `.cm-stack-held` / `.cm-stack-riser` in this —
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
      className={`cm-reveal ${shown ? "cm-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
