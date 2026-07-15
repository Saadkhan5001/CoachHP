"use client";

import { useEffect, useState } from "react";

type Marker = { label: string; top: number; color: string };

const TARGETS: { id: string; label: string; color: string }[] = [
  { id: "about", label: "ABOUT CONTENT END", color: "#22c55e" },
  { id: "about-services-transition", label: "ABOUT → SERVICES STAGE", color: "#3b82f6" },
  { id: "services-panel", label: "SERVICES PANEL TOP", color: "#a855f7" },
  { id: "pricing", label: "PRICING CONTENT END", color: "#22c55e" },
  { id: "pricing-faq-transition", label: "PRICING → FAQ STAGE", color: "#3b82f6" },
  { id: "faq", label: "FAQ PANEL TOP", color: "#a855f7" },
];

/**
 * Dev-only visual debug aid for the mobile transition geometry — opt-in via
 * `/classic?debugStack=1`. Draws thin fixed-position outlines + labels at
 * each transition's key boundaries so the actual rendered geometry can be
 * inspected live while scrolling, without altering layout (all overlay
 * elements are `position: fixed`, `pointer-events: none`, zero-size
 * contribution to any real element). Never rendered unless the query param
 * is present — completely absent from the default production experience.
 */
export function ClassicStackDebugOverlay() {
  const [enabled, setEnabled] = useState(false);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [stageName, setStageName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEnabled(params.get("debugStack") === "1");
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const update = () => {
      const next: Marker[] = [];
      for (const t of TARGETS) {
        const el = document.getElementById(t.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // For content-end markers, show the section's bottom edge; for
        // stage/panel markers, show the top edge.
        const top = t.label.includes("CONTENT END") ? rect.bottom : rect.top;
        next.push({ label: t.label, top, color: t.color });
      }
      setMarkers(next);
      setScrollY(window.scrollY);

      const pin = document.querySelector(".classic-mobile-transition-pin");
      const pinStuck = pin && Math.abs(pin.getBoundingClientRect().top) < 2;
      setStageName(pinStuck ? "PINNED" : "");
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }} aria-hidden="true">
      {markers.map((m, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: m.top,
            borderTop: `1px dashed ${m.color}`,
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 4,
              top: 2,
              fontSize: 10,
              fontFamily: "monospace",
              background: m.color,
              color: "#fff",
              padding: "1px 4px",
              borderRadius: 3,
              whiteSpace: "nowrap",
            }}
          >
            {m.label}
          </span>
        </div>
      ))}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: "50%",
          borderTop: "2px solid #f43f5e",
          right: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            right: 4,
            top: 2,
            fontSize: 10,
            fontFamily: "monospace",
            background: "#f43f5e",
            color: "#fff",
            padding: "1px 4px",
            borderRadius: 3,
          }}
        >
          VIEWPORT MID
        </span>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 8,
          left: 8,
          fontSize: 11,
          fontFamily: "monospace",
          background: "rgba(0,0,0,0.8)",
          color: "#fff",
          padding: "6px 10px",
          borderRadius: 6,
        }}
      >
        scrollY: {Math.round(scrollY)} {stageName && `— ${stageName}`}
      </div>
    </div>
  );
}
