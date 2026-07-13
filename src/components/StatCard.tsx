import { CountUp } from "./CountUp";

type Props = {
  value: number;
  suffix?: string;
  label: string;
  variant?: "glass-dark" | "glass-light";
  className?: string;
};

export function StatCard({
  value,
  suffix = "",
  label,
  variant = "glass-dark",
  className = "",
}: Props) {
  const box =
    variant === "glass-dark"
      ? "bg-[rgba(100,115,111,0.53)] border-white/[0.08] text-white"
      : "bg-[rgba(100,115,111,0.53)] border-white/[0.08] text-white";
  return (
    <div
      className={`h-[121px] rounded-2xl border ${box} p-6 backdrop-blur-[14px] ${className}`}
    >
      <CountUp
        value={value}
        suffix={suffix}
        className="block text-[43px] font-semibold leading-[0.95] tracking-[-0.035em] text-[#f4f4f2]"
      />
      <span className="mt-[7px] block whitespace-nowrap text-[15px] font-normal leading-[1.15] text-white/[0.94]">{label}</span>
    </div>
  );
}
