"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ACADEMY_FAQ } from "@/lib/academy-data";

export function AcademyFaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-[820px] space-y-3">
      {ACADEMY_FAQ.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="overflow-hidden border border-white/10 bg-dark-card2">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-[1rem] font-semibold text-white sm:text-[1.08rem]">
                {item.q}
              </span>
              <Plus
                className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-500 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p
                  className={`px-6 pb-6 text-[0.95rem] leading-relaxed text-white/60 transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
