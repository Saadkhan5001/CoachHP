import { PrimaryButton } from "../PrimaryButton";
import { Reveal } from "../Reveal";

export function Hero() {
  return (
    <section
      id="top"
      data-nav-theme="dark"
      className="relative z-[1] min-h-[100svh] w-full overflow-hidden bg-ink"
    >
      {/* Photographic background */}
      <div
        className="absolute inset-0 bg-cover bg-[position:60%_center] bg-no-repeat md:bg-center"
        style={{ backgroundImage: "url(/images/coach-p/hero.jpg)" }}
        aria-hidden="true"
      />
      {/* Legibility gradients */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(9,9,10,0.9) 0%, rgba(9,9,10,0.62) 38%, rgba(9,9,10,0.15) 70%, rgba(9,9,10,0.05) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,10,0.35) 0%, rgba(9,9,10,0) 30%, rgba(9,9,10,0) 60%, rgba(9,9,10,0.85) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="factory-grid absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[100svh] w-[min(calc(100%-40px),1160px)] flex-col justify-center pt-28 pb-12 md:pt-32">
        <div className="max-w-[720px]">
          <Reveal delay={0.05}>
            <span className="stamp inline-flex items-center gap-2 text-white/70">
              <span aria-hidden className="h-1.5 w-1.5 bg-accent" />
              Strength · Conditioning · Agility
            </span>
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className="h-hero display mt-6 text-[#f4f2ee]">
              Built in
              <br />
              the <span className="text-accent">Factory.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[520px] text-[15px] leading-relaxed text-white/80 sm:text-[16px]">
              Performance coaching built on two decades of experience, technique
              and consistent work — for athletes and individuals ready to train
              with purpose. No shortcuts. Just the work.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryButton size="lg" variant="solid" href="#contact">
                Enter the Factory
              </PrimaryButton>
              <PrimaryButton size="lg" variant="outline" href="#coaching" showArrow={false}>
                Explore Coaching
              </PrimaryButton>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-3">
              <div className="border border-white/12 bg-white/[0.03] px-5 py-3 backdrop-blur-sm">
                <span className="block text-[1.5rem] font-extrabold leading-none tracking-[-0.03em] text-white">
                  20<span className="text-accent">+</span>
                </span>
                <span className="mt-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.14em] text-white/55">
                  Years Experience
                </span>
              </div>
              <div className="border border-white/12 bg-white/[0.03] px-5 py-3 backdrop-blur-sm">
                <span className="block text-[1.5rem] font-extrabold leading-none tracking-[-0.03em] text-white">
                  Coach<span className="text-accent"> +</span> Competitor
                </span>
                <span className="mt-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.14em] text-white/55">
                  From the work to the stage
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
