"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_LINKS } from "@/lib/classic-data";

const SHRINK_DISTANCE = 260; // px of scroll over which the nav collapses
const MAX_W_OPEN = 1120;
const MAX_W_COMPACT = 840;
const LOGO_BASE_MOBILE = 64; // px, matches Logo's h-16
const LOGO_BASE_DESKTOP = 80; // px, matches Logo's sm:h-20
const LOGO_SHRINK = 18; // px the logo shrinks by at full scroll (desktop/fine-pointer only)

export function Header() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".classic-site [data-nav-theme]")
    );
    let ticking = false;

    const update = () => {
      ticking = false;
      const p = Math.min(Math.max(window.scrollY / SHRINK_DISTANCE, 0), 1);
      const bar = barRef.current;
      if (bar) {
        const w = MAX_W_OPEN + (MAX_W_COMPACT - MAX_W_OPEN) * p;
        bar.style.maxWidth = `${w}px`;
        bar.style.height = `${56 - 4 * p}px`;
      }
      const logoImg = logoRef.current;
      if (logoImg) {
        const base = window.innerWidth >= 640 ? LOGO_BASE_DESKTOP : LOGO_BASE_MOBILE;
        logoImg.style.height = `${base - LOGO_SHRINK * p}px`;
      }
      const line = 56;
      let current: "dark" | "light" = "dark";
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) {
          current = (s.dataset.navTheme as "dark" | "light") ?? "dark";
          break;
        }
      }
      setTheme((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const isLight = theme === "light";
  const barBg = isLight
    ? "bg-[rgba(122,124,126,0.72)] border-white/15"
    : "bg-[rgba(80,94,90,0.58)] border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.08)]";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-4 sm:px-6 sm:pt-6">
      <div
        ref={barRef}
        className={`pointer-events-auto flex h-14 w-full items-center justify-between rounded-full border py-2 pl-5 pr-2 sm:pl-6 backdrop-blur-xl transition-[background-color,border-color] duration-500 ${barBg}`}
        style={{ maxWidth: MAX_W_OPEN }}
      >
        <a href="#top" className="flex items-center text-white" aria-label="Coach P — home">
          <Logo ref={logoRef} />
        </a>

        {/* Desktop links */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 -translate-y-px items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[16px] font-medium leading-none text-white/[0.94] transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden h-10 items-center justify-center rounded-full bg-[#c01d18] px-5 text-[15px] font-medium text-white transition-[transform,background-color] duration-300 hover:scale-[1.03] hover:bg-[#a91814] sm:inline-flex"
          >
            Get Started
          </a>
          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="pointer-events-auto absolute top-[68px] left-4 right-4 rounded-3xl border border-white/10 bg-[rgba(18,20,22,0.92)] p-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-[1rem] font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-[#c01d18] px-5 py-3 text-center text-[0.95rem] font-medium text-white"
            >
              Get Started
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
