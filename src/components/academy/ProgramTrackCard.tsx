import { Check } from "lucide-react";
import type { ProgramTrack } from "@/lib/academy-data";

export function ProgramTrackCard({ track }: { track: ProgramTrack }) {
  return (
    <article className="group flex h-full flex-col border border-white/10 bg-dark-card2 p-6 transition-colors duration-300 hover:border-accent/50">
      <div className="flex items-center justify-between">
        <span className="stamp text-white/35">{track.code}</span>
        <span className="h-2 w-2 bg-white/15 transition-colors duration-300 group-hover:bg-accent" />
      </div>
      <h3 className="mt-4 text-[1.35rem] font-extrabold uppercase leading-none tracking-[-0.02em] text-white">
        {track.name}
      </h3>
      <p className="stamp mt-2 text-accent">{track.focus}</p>
      <p className="mt-4 text-[0.92rem] leading-relaxed text-white/60">{track.body}</p>
      <ul className="mt-5 space-y-2 border-t border-white/[0.07] pt-4">
        {track.points.map((p) => (
          <li key={p} className="flex items-center gap-2.5 text-[0.88rem] text-white/70">
            <Check className="h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2.5} />
            {p}
          </li>
        ))}
      </ul>
    </article>
  );
}
