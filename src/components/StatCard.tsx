import { CountUp } from "./CountUp";

type Props = {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
};

export function StatCard({ value, suffix = "", label, className = "" }: Props) {
  return (
    <div
      className={`border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-sm ${className}`}
    >
      <CountUp
        value={value}
        suffix={suffix}
        className="block text-[2.4rem] font-extrabold leading-none tracking-[-0.03em] text-white"
        suffixClassName="text-accent"
      />
      <span className="mt-2 block text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white/55">
        {label}
      </span>
    </div>
  );
}
