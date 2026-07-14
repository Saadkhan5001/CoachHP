import { Globe, Users, Check, Zap } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../../Reveal";
import { PRICING } from "@/lib/classic-data";

const PLAN_ICON = { globe: Globe, users: Users };

export function Pricing() {
  return (
    <section
      id="pricing"
      data-nav-theme="dark"
      className="relative z-[3] overflow-hidden bg-dark-bg py-20 sm:py-32"
    >
      <div
        className="absolute inset-0 bg-cover bg-left"
        style={{ backgroundImage: "url(/images/classic/pricing-bg.jpg)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#0b0d0e]/75" aria-hidden="true" />

      <div className="relative">
        <SectionHeading label="Pricing" subtitle="Whether you prefer online coaching or in-person sessions, each option offers personalized support to help you reach your goals.">
          Choose <span className="text-[#c01d18]">Your Plan</span>
        </SectionHeading>

        <div className="mx-auto mt-14 grid max-w-[880px] items-start gap-5 px-5 sm:grid-cols-2 lg:px-6">
          {PRICING.map((plan) => {
            const Icon = PLAN_ICON[plan.icon];
            const featured = plan.featured;
            return (
              <Reveal key={plan.name} delay={featured ? 0.08 : 0}>
                <div
                  className={`relative rounded-[26px] p-2.5 ${
                    featured ? "bg-black lg:-translate-y-4" : "bg-white"
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3 right-5 z-10 flex items-center gap-1.5 rounded-full bg-[#c01d18] px-3 py-1.5 text-[0.78rem] font-semibold text-white">
                      <Zap className="h-3.5 w-3.5 fill-white" />
                      Most Effective
                    </span>
                  )}

                  {/* Header panel */}
                  <div
                    className={`rounded-[20px] p-6 ${
                      featured ? "bg-dark-card text-white" : "bg-[#f4f4f4] text-black"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-5 w-5" strokeWidth={1.9} />
                      <h3 className="text-[1.25rem] font-semibold">{plan.name}</h3>
                    </div>
                    <p
                      className={`mt-3 text-[0.92rem] leading-relaxed ${
                        featured ? "text-white/60" : "text-black/55"
                      }`}
                    >
                      {plan.body}
                    </p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-[2.4rem] font-semibold leading-none">
                        {plan.price}
                      </span>
                      <span
                        className={`text-[0.95rem] ${
                          featured ? "text-white/55" : "text-black/50"
                        }`}
                      >
                        {plan.period}
                      </span>
                    </div>
                    <a
                      href="#contact"
                      className="mt-5 flex w-full justify-center sm:w-fit items-center gap-2 rounded-full bg-[#c01d18] px-5 py-2 text-[0.92rem] font-medium text-white transition-[transform,background-color] hover:scale-[1.03] hover:bg-[#a91814]"
                    >
                      Get Started
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0f0f0f] text-white">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </a>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3.5 px-5 py-6">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-center gap-3">
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full ${
                            f.highlight
                              ? "bg-[#c01d18] text-white"
                              : featured
                                ? "bg-white/10 text-white/70"
                                : "bg-black/[0.06] text-black/60"
                          }`}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span
                          className={`text-[0.95rem] ${
                            f.highlight
                              ? "font-medium text-[#c01d18]"
                              : featured
                                ? "text-white/85"
                                : "text-black/75"
                          }`}
                        >
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
