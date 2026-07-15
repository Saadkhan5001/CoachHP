import { Globe, Users, Check, Zap } from "lucide-react";
import { ClassicMobileSectionHeading } from "../ClassicMobileSectionHeading";
import { ClassicMobileReveal } from "../ClassicMobileReveal";
import { PRICING } from "@/lib/classic-data";

const PLAN_ICON = { globe: Globe, users: Users };

/**
 * Mobile Pricing, per the reference recording: dark background image +
 * overlay behind everything; heading → white Online Training card →
 * black In-Person card ("Most Effective" badge). Both cards full-width in
 * normal flow at natural height — the final viewport (In-Person card over
 * the background) is the held surface for the Pricing→FAQ stack.
 *
 * IMPORTANT: this section is the sticky "held" element of a stack scene —
 * it must never gain `overflow: hidden` / `clip` / `transform` (an
 * overflow'd sticky ancestor silently kills the hold; proven in the
 * previous /classic implementation). The background layers below are
 * plain `background-image` fills, which cannot overflow, so no clipping
 * is needed.
 */
export function MobilePricing() {
  return (
    <section id="pricing" data-nav-theme="dark" className="relative bg-[#0f0f0f] pb-20" style={{ paddingTop: "72px" }}>
      <div
        className="absolute inset-0 bg-cover bg-left"
        style={{ backgroundImage: "url(/images/classic/pricing-bg.jpg)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#0b0d0e]/75" aria-hidden="true" />

      <div className="relative">
        <ClassicMobileSectionHeading
          label="Pricing"
          subtitle="Whether you prefer online coaching or in-person sessions, each option offers personalized support to help you reach your goals."
        >
          Choose <span className="cm-accent-text">Your Plan</span>
        </ClassicMobileSectionHeading>

        <div className="mt-9 flex flex-col gap-4 px-5">
          {PRICING.map((plan, planIndex) => {
            const Icon = PLAN_ICON[plan.icon];
            const featured = plan.featured;
            return (
              <ClassicMobileReveal key={plan.name} delay={planIndex * 70}>
                <div className={`relative rounded-3xl p-2.5 ${featured ? "bg-black" : "bg-white"}`}>
                  {featured && (
                    <span className="absolute -top-3 right-5 z-10 flex items-center gap-1.5 rounded-full bg-[#c01d18] px-3 py-1.5 text-[0.78rem] font-semibold text-white">
                      <Zap className="h-3.5 w-3.5 fill-white" />
                      Most Effective
                    </span>
                  )}

                  <div className={`rounded-[20px] p-6 ${featured ? "bg-[#1c1c1c] text-white" : "bg-[#f4f4f4] text-black"}`}>
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-5 w-5" strokeWidth={1.9} />
                      <h3 className="text-[1.25rem] font-semibold">{plan.name}</h3>
                    </div>
                    <p className={`mt-3 text-[0.92rem] leading-relaxed ${featured ? "text-white/60" : "text-black/55"}`}>
                      {plan.body}
                    </p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-[2.3rem] font-semibold leading-none">{plan.price}</span>
                      <span className={`text-[0.95rem] ${featured ? "text-white/55" : "text-black/50"}`}>{plan.period}</span>
                    </div>
                    <a
                      href="#contact"
                      className="mt-5 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#c01d18] px-5 text-[0.95rem] font-medium text-white active:bg-[#a91814]"
                    >
                      Get Started
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0f0f0f] text-white">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                          <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </a>
                  </div>

                  <ul className="space-y-3.5 px-4 py-5">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-center gap-3">
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
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
                            f.highlight ? "font-medium text-[#c01d18]" : featured ? "text-white/85" : "text-black/75"
                          }`}
                        >
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ClassicMobileReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
