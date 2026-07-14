import Link from "next/link";
import { ListChecks, Library, Video, LineChart, Radio, Users, ArrowUpRight } from "lucide-react";
import { PillLabel } from "../PillLabel";
import { Reveal } from "../Reveal";
import { AcademyDashboard } from "./AcademyDashboard";
import { ACADEMY, ACADEMY_FEATURES } from "@/lib/academy-data";

const FEATURE_ICON = {
  program: ListChecks,
  library: Library,
  video: Video,
  chart: LineChart,
  live: Radio,
  community: Users,
} as const;

export function AcademyPreview() {
  return (
    <div id="academy-preview" className="mx-auto max-w-content px-5 pt-24 sm:pt-32 lg:px-6">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Reveal>
          <PillLabel theme="dark">{ACADEMY.status}</PillLabel>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="h-section mt-5 text-white">
            The Factory, <span className="text-accent">Online</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-white/60">
            {ACADEMY.value}
          </p>
        </Reveal>
      </div>

      {/* Dashboard preview */}
      <Reveal delay={0.1} className="mt-12">
        <AcademyDashboard />
      </Reveal>

      {/* Feature chips */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ACADEMY_FEATURES.slice(0, 6).map((f, i) => {
          const Icon = FEATURE_ICON[f.icon as keyof typeof FEATURE_ICON] ?? ListChecks;
          return (
            <Reveal key={f.title} delay={0.04 * i}>
              <div className="flex h-full items-start gap-4 border border-white/10 bg-dark-card2 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 text-accent">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="text-[1rem] font-bold text-white">{f.title}</h3>
                  <p className="mt-1 text-[0.85rem] leading-relaxed text-white/55">{f.body}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-col items-center gap-4 border border-white/10 bg-gradient-to-r from-accent/[0.08] to-transparent p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="text-[1.3rem] font-extrabold uppercase tracking-[-0.01em] text-white">
              Be first through the doors
            </h3>
            <p className="mt-1.5 text-[0.9rem] text-white/60">
              See the full concept — program tracks, sample training week and the platform experience.
            </p>
          </div>
          <Link
            href="/academy"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-[4px] bg-accent px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.06em] text-ink transition-colors duration-300 hover:bg-accent-deep hover:text-white"
          >
            Explore the Academy
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
