import { CountUp } from "../CountUp";

type Props = {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
};

export function StatCard({ value, suffix = "", label, className = "" }: Props) {
  return (
    <div
      className={`h-[108px] rounded-2xl border border-white/[0.08] bg-[rgba(28,28,28,0.55)] p-4 backdrop-blur-[14px] md:h-[121px] md:p-6 ${className}`}
    >
      <CountUp
        value={value}
        suffix={suffix}
        suffixClassName="text-[#c01d18]"
        className="block text-[34px] md:text-[43px] font-semibold leading-[0.95] tracking-[-0.035em] text-[#f4f4f2]"
      />
      <span className="mt-[6px] block whitespace-nowrap text-[12px] md:mt-[7px] md:text-[15px] font-normal leading-[1.15] text-white/[0.94]">
        {label}
      </span>
    </div>
  );
}
