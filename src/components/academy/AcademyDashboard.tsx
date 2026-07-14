"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Play, Radio, TrendingUp, Dumbbell } from "lucide-react";
import { DASHBOARD } from "@/lib/academy-data";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function Panel({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-white/10 bg-dark-card2 p-5 ${className}`}>
      {title && <p className="stamp mb-4 text-white/40">{title}</p>}
      {children}
    </div>
  );
}

export function AcademyDashboard() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const d = DASHBOARD;

  return (
    <div
      ref={ref}
      className="mx-auto w-full max-w-[1080px] border border-white/10 bg-[#0e0f11] p-3 shadow-2xl sm:p-4"
      role="img"
      aria-label="Coach P Factory Academy — concept dashboard preview (demonstration only)"
    >
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border border-white/10 bg-dark-card2 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center border border-accent text-[11px] font-extrabold text-accent">
            CP
          </span>
          <div className="leading-tight">
            <p className="text-[13px] font-bold text-white">{d.program}</p>
            <p className="stamp text-white/40">
              {d.phase} · Week {d.week}/{d.totalWeeks}
            </p>
          </div>
        </div>
        <span className="stamp border border-white/15 px-2.5 py-1 text-white/50">
          Platform Preview
        </span>
      </div>

      {/* Week progress */}
      <div className="mt-3 border border-white/10 bg-dark-card2 px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="stamp text-white/50">Program Progress</p>
          <p className="text-[12px] font-semibold text-white/70">
            Week {d.week} of {d.totalWeeks}
          </p>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden bg-white/10">
          <div
            className="h-full bg-accent transition-[width] duration-1000 ease-out"
            style={{ width: inView ? `${(d.week / d.totalWeeks) * 100}%` : "0%" }}
          />
        </div>
      </div>

      {/* Live banner */}
      <div className="mt-3 flex items-center gap-3 border border-accent/40 bg-accent/[0.06] px-4 py-3">
        <Radio className="h-4 w-4 shrink-0 text-accent" />
        <p className="text-[13px] text-white/80">
          <span className="font-semibold text-white">{d.live.title}</span>
          <span className="text-white/50"> · {d.live.when}</span>
        </p>
      </div>

      {/* Main grid */}
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {/* Today's session */}
        <Panel className="md:col-span-2" title="Today's Session">
          <div className="flex items-baseline justify-between">
            <h4 className="text-[1.15rem] font-bold text-white">{d.today.title}</h4>
            <span className="stamp text-white/40">{d.today.est}</span>
          </div>
          <ul className="mt-4 divide-y divide-white/[0.06]">
            {d.today.exercises.map((ex) => (
              <li key={ex.name} className="flex items-center gap-3 py-2.5">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center ${
                    ex.done ? "bg-accent text-ink" : "border border-white/20 text-transparent"
                  }`}
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span
                  className={`flex-1 text-[0.95rem] ${
                    ex.done ? "text-white/40 line-through" : "text-white/85"
                  }`}
                >
                  {ex.name}
                </span>
                <span className="stamp text-white/45">{ex.scheme}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Coach message */}
        <Panel title="Coach Message">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center border border-accent text-[11px] font-extrabold text-accent">
              CP
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-bold text-white">{d.coachMessage.from}</p>
              <p className="stamp text-accent">Your Coach</p>
            </div>
          </div>
          <p className="mt-4 text-[0.92rem] leading-relaxed text-white/70">
            &ldquo;{d.coachMessage.text}&rdquo;
          </p>
        </Panel>

        {/* Video lesson */}
        <Panel title="Technique Lesson">
          <div className="relative flex aspect-video items-center justify-center overflow-hidden border border-white/10 bg-[#15171a]">
            <div className="factory-grid absolute inset-0 opacity-40" aria-hidden="true" />
            <span className="relative grid h-12 w-12 place-items-center rounded-full bg-accent text-ink">
              <Play className="h-5 w-5 translate-x-[1px] fill-ink" />
            </span>
            <span className="stamp absolute left-2 top-2 bg-black/60 px-2 py-1 text-white/70">
              {d.lesson.tag}
            </span>
            <span className="stamp absolute bottom-2 right-2 bg-black/60 px-2 py-1 text-white/70">
              {d.lesson.length}
            </span>
          </div>
          <p className="mt-3 text-[0.95rem] font-semibold text-white">{d.lesson.title}</p>
        </Panel>

        {/* Consistency */}
        <Panel title="Weekly Consistency">
          <div className="flex h-[92px] items-end gap-2">
            {d.consistency.map((c, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-full w-full items-end">
                  <div
                    className={`w-full transition-[height] duration-700 ease-out ${
                      c.v > 0 ? "bg-accent" : "bg-white/10"
                    }`}
                    style={{
                      height: inView ? `${Math.max(c.v, 6)}%` : "6%",
                      transitionDelay: `${i * 60}ms`,
                    }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-white/35">{c.d}</span>
              </div>
            ))}
          </div>
        </Panel>

        {/* Benchmark */}
        <Panel title="Strength Benchmark">
          <div className="flex items-center gap-2 text-accent">
            <Dumbbell className="h-4 w-4" />
            <span className="stamp text-white/50">{d.benchmark.lift}</span>
          </div>
          <p className="mt-3 text-[1.9rem] font-extrabold leading-none tracking-[-0.03em] text-white">
            {d.benchmark.value}
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-[0.85rem] font-semibold text-accent">
            <TrendingUp className="h-4 w-4" />
            {d.benchmark.delta}
          </p>
        </Panel>
      </div>
    </div>
  );
}
