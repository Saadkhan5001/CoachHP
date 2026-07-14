"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_LINKS } from "@/lib/data";

const SHRINK_DISTANCE = 260; // px of scroll over which the nav collapses
const MAX_W_OPEN = 1160;
const MAX_W_COMPACT = 880;

function NavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

export function Header() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-theme]")
    );
    let ticking = false;

    const update = () => {
      ticking = false;
      const isMobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
      const y = isMobile ? 0 : window.scrollY;
      const p = Math.min(Math.max(y / SHRINK_DISTANCE, 0), 1);
      const bar = barRef.current;
      if (bar) {
        const w = MAX_W_OPEN + (MAX_W_COMPACT - MAX_W_OPEN) * p;
        bar.style.maxWidth = `${w}px`;
        bar.style.height = `${56 - 4 * p}px`;
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
    ? "bg-[rgba(30,30,32,0.82)] border-white/10"
    : "bg-[rgba(12,13,15,0.7)] border-white/10";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-4 sm:px-6 sm:pt-6">
      <div
        ref={barRef}
        className={`pointer-events-auto flex h-14 w-full items-center justify-between rounded-[8px] border py-2 pl-4 pr-2 sm:pl-5 backdrop-blur-xl transition-[background-color,border-color] duration-500 ${barBg}`}
        style={{ maxWidth: MAX_W_OPEN }}
      >
        <a href="#top" className="flex items-center text-white" aria-label="Coach P Factory — home">
          <Logo />
        </a>

        {/* Desktop links */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.08em] text-white/75 transition-colors hover:text-white"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex h-10 items-center rounded-[4px] bg-accent px-4 text-[12px] font-bold uppercase tracking-[0.06em] text-ink transition-colors duration-300 hover:bg-accent-deep hover:text-white sm:text-[13px]"
          >
            <span className="hidden sm:inline">Enter the Factory</span>
            <span className="sm:hidden">Enter</span>
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-white/15 text-white md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="pointer-events-auto absolute left-4 right-4 top-[68px] rounded-[10px] border border-white/10 bg-[rgba(11,12,14,0.95)] p-3 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-[6px] px-4 py-3 text-[14px] font-semibold uppercase tracking-[0.06em] text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-[6px] bg-accent px-4 py-3 text-center text-[13px] font-bold uppercase tracking-[0.06em] text-ink"
            >
              Enter the Factory
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
