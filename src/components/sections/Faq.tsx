"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { FAQS } from "@/lib/data";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      data-nav-theme="light"
      data-rise
      className="panel-reveal rounded-panel-top relative z-[4] bg-light-bg pb-20 pt-14 text-dark-bg sm:pb-28 sm:pt-20"
    >
      <SectionHeading label="FAQ" theme="light" subtitle="Straight answers on how coaching with Coach P works — in person, online, and inside the Factory Academy.">
        Frequently Asked Questions
      </SectionHeading>

      <div className="mx-auto mt-10 max-w-[920px] space-y-3 px-5 sm:mt-12">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={Math.min(i * 0.04, 0.2)}>
              <div className="overflow-hidden border border-black/10 bg-white">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-8"
                >
                  <span className="text-[1.02rem] font-medium text-black sm:text-[1.1rem]">
                    {item.q}
                  </span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-black/70 transition-transform duration-300 ${
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
                      className={`px-6 pb-6 text-[0.96rem] leading-relaxed text-black/55 transition-opacity duration-300 sm:px-8 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
