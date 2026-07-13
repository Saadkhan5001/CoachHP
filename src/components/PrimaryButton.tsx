import { ArrowUpRight } from "lucide-react";

type Props = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  size?: "md" | "lg";
  onClick?: () => void;
};

export function PrimaryButton({
  children,
  href = "#contact",
  className = "",
  size = "md",
  onClick,
}: Props) {
  const pad = size === "lg" ? "pl-6 pr-2 py-2 text-[1.05rem]" : "pl-5 pr-1.5 py-1.5 text-[0.95rem]";
  const circle = size === "lg" ? "h-10 w-10" : "h-8 w-8";
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center gap-3 rounded-full bg-accent font-medium text-black transition-transform duration-300 ease-out hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${pad} ${className}`}
    >
      <span className="whitespace-nowrap">{children}</span>
      <span
        className={`flex ${circle} items-center justify-center rounded-full bg-black text-white transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
      >
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
      </span>
    </a>
  );
}
