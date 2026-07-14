type Props = {
  children: React.ReactNode;
  theme?: "dark" | "light";
  className?: string;
  dot?: boolean;
};

export function PillLabel({ children, theme = "dark", className = "", dot = true }: Props) {
  const styles =
    theme === "dark"
      ? "border-white/15 text-white/70"
      : "border-black/15 text-black/60";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-[3px] border px-3 py-1.5 text-[0.68rem] font-semibold uppercase leading-none tracking-[0.2em] ${styles} ${className}`}
    >
      {dot && <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-accent" />}
      {children}
    </span>
  );
}
