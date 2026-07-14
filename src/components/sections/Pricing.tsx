import { Globe, Users, Factory, Check } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { PrimaryButton } from "../PrimaryButton";
import { Reveal } from "../Reveal";
import { COACHING_OPTIONS } from "@/lib/data";

const ICONS = { globe: Globe, users: Users, factory: Factory };

export function Pricing() {
  return (
    <section
      id="options"
      data-nav-theme="dark"
      className="relative z-[3] overflow-hidden bg-ink py-20 sm:py-32"
    >
      <div
        className="absolute inset-0 bg-cover bg-left"
        style={{ backgroundImage: "url(/images/coach-p/coaching-bg.jpg)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-ink/82" aria-hidden="true" />
      <div className="factory-grid absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="relative">
        <SectionHeading
          label="Coaching Options"
          subtitle="Choose how you want to train. Every option is built around your goals — pricing is shared on enquiry so the plan fits the person."
        >
          Train With <span className="text-accent">Coach P</span>
        </SectionHeading>

        <div className="mx-auto mt-14 grid max-w-content items-stretch gap-3 px-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-6">
          {COACHING_OPTIONS.map((plan, i) => {
            const Icon = ICONS[plan.icon];
            const featured = plan.featured;
            return (
              <Reveal key={plan.key} delay={0.05 * i} className="h-full">
                <div
                  className={`relative flex h-full flex-col border ${
                    featured
                      ? "border-accent/60 bg-dark-card"
                      : "border-white/10 bg-dark-card2"
                  }`}
                >
                  {featured && (
                    <span className="stamp absolute right-4 top-0 z-10 -translate-y-1/2 bg-accent px-3 py-1.5 text-ink">
                      Most Hands-On
                    </span>
                  )}
                  {plan.status && (
                    <span className="stamp absolute right-4 top-0 z-10 -translate-y-1/2 border border-white/20 bg-ink px-3 py-1.5 text-white/70">
                      {plan.status}
                    </span>
                  )}

                  <div className="border-b border-white/10 p-6">
                    <span className="flex h-11 w-11 items-center justify-center border border-white/10 text-accent">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-4 text-[1.25rem] font-bold uppercase tracking-[-0.01em] text-white">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-white/55">{plan.body}</p>
                    <div className="mt-5 flex items-baseline gap-2">
                      <span className="text-[1.05rem] font-bold text-white">{plan.pricing}</span>
                      <span className="stamp text-white/40">{plan.mode}</span>
                    </div>
                  </div>

                  <ul className="flex-1 space-y-3 p-6">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-center gap-3">
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center ${
                            f.highlight ? "bg-accent text-ink" : "border border-white/15 text-white/60"
                          }`}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span
                          className={`text-[0.92rem] ${
                            f.highlight ? "font-semibold text-accent" : "text-white/75"
                          }`}
                        >
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-6 pt-0">
                    <PrimaryButton
                      href={plan.ctaHref}
                      variant={featured ? "solid" : "outline"}
                      className="w-full justify-center"
                    >
                      {plan.cta}
                    </PrimaryButton>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
