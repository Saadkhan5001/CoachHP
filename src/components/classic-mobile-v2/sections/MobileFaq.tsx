"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ClassicMobileSectionHeading } from "../ClassicMobileSectionHeading";
import { ClassicMobileReveal } from "../ClassicMobileReveal";
import { FAQS } from "@/lib/classic-data";

/**
 * Mobile FAQ, per the reference recording: white panel, heading, full-width
 * accordion rows with the first item open by default. This section is the
 * "riser" of the Pricing→FAQ stack scene, so its rounded top edge comes
 * from the page-level wrapper styling (v2-panel-top).
 */
export function MobileFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      data-nav-theme="light"
      className="v2-panel-top relative bg-[#f9f9f9] pb-16 text-[#0f0f0f]"
      style={{ paddingTop: "64px" }}
    >
      <ClassicMobileSectionHeading
        label="FAQ"
        theme="light"
        subtitle="Find answers to the most common questions about training with me and how my programs work."
      >
        Frequently Asked Questions
      </ClassicMobileSectionHeading>

      <div className="mt-8 flex flex-col gap-3 px-5">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <ClassicMobileReveal key={item.q} delay={Math.min(i * 40, 160)}>
              <div className="rounded-3xl bg-white">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex min-h-[64px] w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-[1rem] font-medium text-black">{item.q}</span>
                  <Plus
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45 text-[#c01d18]" : "text-black/70"
                    }`}
                  />
                </button>
                <div className={`v2-acc-body ${isOpen ? "v2-open" : ""}`}>
                  <div className="v2-acc-inner">
                    <p className={`px-5 pb-5 text-[0.94rem] leading-relaxed text-black/55 ${isOpen ? "" : "invisible"}`}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </ClassicMobileReveal>
          );
        })}
      </div>
    </section>
  );
}
