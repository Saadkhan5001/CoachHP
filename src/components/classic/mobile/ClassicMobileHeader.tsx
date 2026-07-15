"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/classic-data";

/**
 * Fixed mobile header for /classic-mobile-v2. Matches the reference
 * recording: a constant-size glass pill that never resizes or moves during
 * scroll (no scroll listeners at all). Menu is an accessible dropdown:
 * closes on link tap, Escape, or backdrop tap; focus returns to the toggle.
 */
export function ClassicMobileHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="v2-header">
      <div className="v2-header-bar">
        <a href="#top" aria-label="Coach P — back to top" className="flex items-center" onClick={() => setOpen(false)}>
          <Image
            src="/images/CoachP-logo.png"
            alt=""
            width={700}
            height={360}
            priority
            className="h-11 w-auto object-contain"
          />
        </a>
        <button
          ref={toggleRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="v2-menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <>
          {/* Backdrop: blocks background interaction while open; tap closes. */}
          <div
            className="fixed inset-0 z-[-1]"
            style={{ pointerEvents: "auto" }}
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <nav id="v2-menu" ref={panelRef} className="v2-menu-panel" aria-label="Main navigation">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3.5 text-[1rem] font-medium text-white/85 active:bg-white/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-full bg-[#c01d18] px-5 py-3.5 text-center text-[0.98rem] font-medium text-white"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}
