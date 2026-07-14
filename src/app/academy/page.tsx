import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { PillLabel } from "@/components/PillLabel";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { AcademyDashboard } from "@/components/academy/AcademyDashboard";
import { ProgramTrackCard } from "@/components/academy/ProgramTrackCard";
import { AcademyFaqList } from "@/components/academy/AcademyFaqList";
import {
  ACADEMY,
  PROGRAM_TRACKS,
  SAMPLE_WEEK,
  WHO_ITS_FOR,
  ENROLLMENT_STEPS,
} from "@/lib/academy-data";
import { BRAND } from "@/lib/data";

export const metadata: Metadata = {
  title: "Academy — Coach P Factory | Online Coaching (Concept Preview)",
  description:
    "A concept preview of the Coach P Factory Academy — structured program tracks, an exercise library, video form review and accountability. Coming soon.",
};

export default function AcademyPage() {
  return (
    <>
      <Motion />
      <Header />
      <main className="relative bg-ink">
        {/* Hero */}
        <section
          data-nav-theme="dark"
          className="relative overflow-hidden border-b border-white/10 bg-ink px-5 pb-20 pt-32 sm:pt-40 lg:px-6"
        >
          <div className="factory-grid absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative mx-auto max-w-content">
            <Reveal>
              <Link
                href="/"
                className="stamp inline-flex items-center gap-2 text-white/50 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Coach P Factory
              </Link>
            </Reveal>
            <div className="mt-6 max-w-3xl">
              <Reveal delay={0.05}>
                <PillLabel theme="dark">{ACADEMY.status}</PillLabel>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="h-hero display mt-6 text-[#f4f2ee]">
                  Coach P Factory <span className="text-accent">Academy</span>
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">
                  {ACADEMY.value}
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <PrimaryButton size="lg" variant="solid" href={BRAND.instagram}>
                    Join the Waitlist
                  </PrimaryButton>
                  <PrimaryButton size="lg" variant="outline" href="#tracks" showArrow={false}>
                    See the Tracks
                  </PrimaryButton>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="stamp mt-8 text-white/30">
                  Concept preview · Dashboard, programs &amp; data are demonstration only
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section data-nav-theme="dark" className="px-5 py-24 sm:py-28 lg:px-6">
          <div className="mx-auto max-w-content">
            <SectionHeading
              label="Who It's For"
              subtitle="The Academy scales Coach P's system to more athletes — wherever you're starting from."
            >
              Built for Anyone Ready to <span className="text-accent">Work</span>
            </SectionHeading>
            <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {WHO_ITS_FOR.map((w, i) => (
                <Reveal key={w.title} delay={0.05 * i}>
                  <div className="flex h-full flex-col border border-white/10 bg-dark-card2 p-6">
                    <span className="stamp text-accent">0{i + 1}</span>
                    <h3 className="mt-4 text-[1.15rem] font-bold uppercase tracking-[-0.01em] text-white">
                      {w.title}
                    </h3>
                    <p className="mt-3 text-[0.9rem] leading-relaxed text-white/55">{w.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Program tracks */}
        <section
          id="tracks"
          data-nav-theme="dark"
          className="scroll-mt-24 border-y border-white/10 bg-dark-card2/30 px-5 py-24 sm:py-28 lg:px-6"
        >
          <div className="mx-auto max-w-content">
            <SectionHeading
              label="Program Tracks"
              subtitle="Five tracks, one standard. Each is a structured path built around Coach P's verified experience — pick the one that fits your level and goal."
            >
              Choose Your <span className="text-accent">Track</span>
            </SectionHeading>
            <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PROGRAM_TRACKS.map((t, i) => (
                <Reveal key={t.code} delay={0.05 * (i % 3)}>
                  <ProgramTrackCard track={t} />
                </Reveal>
              ))}
              <Reveal delay={0.1}>
                <div className="flex h-full flex-col justify-center border border-dashed border-white/15 bg-transparent p-6 text-center">
                  <p className="text-[0.95rem] font-semibold text-white/70">More tracks in development</p>
                  <p className="mt-2 text-[0.85rem] text-white/40">
                    Tracks reflect Coach P&rsquo;s verified specialties. Others are added as the Factory grows.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Platform / dashboard preview */}
        <section data-nav-theme="dark" className="px-5 py-24 sm:py-28 lg:px-6">
          <div className="mx-auto max-w-content">
            <SectionHeading
              label="The Platform"
              subtitle="One place for your program, your coaching and your progress. Here's how a training day would look inside the Academy."
            >
              Inside the <span className="text-accent">Dashboard</span>
            </SectionHeading>
            <Reveal delay={0.1} className="mt-14">
              <AcademyDashboard />
            </Reveal>
          </div>
        </section>

        {/* Sample training week */}
        <section
          data-nav-theme="dark"
          className="border-y border-white/10 bg-dark-card2/30 px-5 py-24 sm:py-28 lg:px-6"
        >
          <div className="mx-auto max-w-content">
            <SectionHeading
              label="Sample Week"
              subtitle="A demonstration training split from the Strength Lab track — structured, progressive, with built-in recovery."
            >
              A Week in the <span className="text-accent">Factory</span>
            </SectionHeading>
            <div className="mt-14 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {SAMPLE_WEEK.map((day, i) => (
                <Reveal key={day.day} delay={0.03 * i}>
                  <div
                    className={`flex h-full flex-col justify-between border p-5 ${
                      day.rest
                        ? "border-white/[0.07] bg-transparent"
                        : "border-white/10 bg-dark-card2"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="stamp text-white/40">{day.day}</span>
                      <span
                        className={`stamp px-2 py-0.5 ${
                          day.rest ? "text-white/30" : "bg-accent/15 text-accent"
                        }`}
                      >
                        {day.tag}
                      </span>
                    </div>
                    <p
                      className={`mt-6 text-[1.02rem] font-bold leading-tight ${
                        day.rest ? "text-white/45" : "text-white"
                      }`}
                    >
                      {day.focus}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Enrollment */}
        <section data-nav-theme="dark" className="px-5 py-24 sm:py-28 lg:px-6">
          <div className="mx-auto max-w-content">
            <SectionHeading
              label="How It Works"
              subtitle="When the Academy opens, getting started would be simple. This is the intended flow."
            >
              From Waitlist to <span className="text-accent">Work</span>
            </SectionHeading>
            <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ENROLLMENT_STEPS.map((s, i) => (
                <Reveal key={s.number} delay={0.05 * i}>
                  <div className="flex h-full flex-col border border-white/10 bg-dark-card2 p-6">
                    <span className="text-[2.4rem] font-extrabold leading-none tracking-[-0.04em] text-white/12">
                      {s.number}
                    </span>
                    <h3 className="mt-4 text-[1.1rem] font-bold uppercase tracking-[-0.01em] text-white">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-white/55">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          data-nav-theme="dark"
          className="border-t border-white/10 bg-dark-card2/30 px-5 py-24 sm:py-28 lg:px-6"
        >
          <div className="mx-auto max-w-content">
            <SectionHeading
              label="Academy FAQ"
              subtitle="What the Coach P Factory Academy is — and what it isn't (yet)."
            >
              Questions, <span className="text-accent">Answered</span>
            </SectionHeading>
            <div className="mt-14">
              <AcademyFaqList />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          data-nav-theme="dark"
          className="relative overflow-hidden px-5 py-28 text-center sm:py-36 lg:px-6"
        >
          <div className="factory-grid absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <Reveal>
              <PillLabel theme="dark" className="mx-auto">
                {ACADEMY.status}
              </PillLabel>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="h-section display mx-auto mt-6 text-white">
                Get in Early. <span className="text-accent">Stay Up.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-5 max-w-md text-[1rem] leading-relaxed text-white/70">
                The Academy is coming. Follow the work and be first to know when the
                doors open.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <PrimaryButton size="lg" variant="solid" href={BRAND.instagram}>
                  Follow @coachp_factory
                </PrimaryButton>
                <PrimaryButton size="lg" variant="outline" href="/" showArrow={false}>
                  Back to the Factory
                </PrimaryButton>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <ul className="mx-auto mt-10 flex max-w-md flex-wrap items-center justify-center gap-x-5 gap-y-2">
                {["Concept preview", "No accounts", "No payments", "Demo data only"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5 text-[0.78rem] text-white/35">
                    <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
