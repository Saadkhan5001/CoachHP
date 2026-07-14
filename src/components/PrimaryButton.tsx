import { ArrowUpRight } from "lucide-react";

type Props = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "light";
  showArrow?: boolean;
  onClick?: () => void;
};

const SIZES = {
  sm: "px-4 py-2.5 text-[12px]",
  md: "px-5 py-3 text-[13px]",
  lg: "px-6 py-3.5 text-[13px] sm:text-[14px]",
};

const VARIANTS = {
  solid: "bg-accent text-ink hover:bg-accent-deep hover:text-white",
  outline:
    "border border-white/25 text-white hover:border-accent hover:text-accent bg-transparent",
  light:
    "border border-black/15 text-ink hover:border-accent hover:text-accent bg-transparent",
};

export function PrimaryButton({
  children,
  href = "#contact",
  className = "",
  size = "md",
  variant = "solid",
  showArrow = true,
  onClick,
}: Props) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-2.5 rounded-[4px] font-semibold uppercase tracking-[0.06em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
    >
      <span className="whitespace-nowrap">{children}</span>
      {showArrow && (
        <ArrowUpRight
          className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.4}
        />
      )}
    </a>
  );
}
