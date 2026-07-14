import type { Metadata } from "next";
import "./classic.css";
import { Header } from "@/components/classic/Header";
import { Motion } from "@/components/Motion";
import { Hero } from "@/components/classic/sections/Hero";
import { About } from "@/components/classic/sections/About";
import { Services } from "@/components/classic/sections/Services";
import { Process } from "@/components/classic/sections/Process";
import { Transformations } from "@/components/classic/sections/Transformations";
import { Reviews } from "@/components/classic/sections/Reviews";
import { Pricing } from "@/components/classic/sections/Pricing";
import { Faq } from "@/components/classic/sections/Faq";
import { FinalCta } from "@/components/classic/sections/FinalCta";

export const metadata: Metadata = {
  title: "Coach P — Personal Training",
  description:
    "A concept personal-training landing page for Coach P, featuring structured coaching, strength development and measurable progress.",
  robots: { index: false, follow: false },
};

export default function ClassicPage() {
  return (
    <div className="classic-site">
      <Motion />
      <Header />
      <main className="relative">
        <Hero />
        <About />

        {/* Dark block — rises over the light About panel (pinned reveal) */}
        <section
          id="services-panel"
          data-nav-theme="dark"
          data-rise
          className="panel-reveal rounded-panel-top relative z-[3] bg-dark-bg pb-4"
        >
          <Services />
          <Process />
          <Transformations />
          <Reviews />
        </section>

        {/* Pricing — stays pinned while FAQ rises over it */}
        <Pricing />

        <Faq />
        <FinalCta />
      </main>
    </div>
  );
}
