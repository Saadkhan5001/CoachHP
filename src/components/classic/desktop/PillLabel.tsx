type Props = {
  children: React.ReactNode;
  theme?: "dark" | "light";
  className?: string;
};

export function PillLabel({ children, theme = "dark", className = "" }: Props) {
  const styles =
    theme === "dark"
      ? "bg-white/[0.06] border-white/10 text-white/80"
      : "bg-black/[0.05] border-black/[0.06] text-black/70";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-1.5 text-[0.8rem] font-medium backdrop-blur-sm ${styles} ${className}`}
    >
      {children}
    </span>
  );
}
