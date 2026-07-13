import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Transformations } from "@/components/sections/Transformations";
import { Reviews } from "@/components/sections/Reviews";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
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
    </>
  );
}
