import { ClassicMobileReveal } from "./ClassicMobileReveal";

type Props = {
  label: string;
  theme?: "dark" | "light";
  subtitle?: string;
  children: React.ReactNode;
};

export function ClassicMobileSectionHeading({ label, theme = "dark", subtitle, children }: Props) {
  const pill =
    theme === "dark"
      ? "border-white/10 bg-white/[0.06] text-white/70"
      : "border-black/10 bg-black/[0.04] text-black/60";
  const sub = theme === "dark" ? "text-white/55" : "text-black/55";
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-5 text-center">
      <ClassicMobileReveal>
        <span className={`inline-flex min-h-[30px] items-center rounded-full border px-4 text-[0.82rem] font-medium ${pill}`}>
          {label}
        </span>
      </ClassicMobileReveal>
      <ClassicMobileReveal delay={60}>
        <h2 className="v2-h-section mt-4">{children}</h2>
      </ClassicMobileReveal>
      {subtitle && (
        <ClassicMobileReveal delay={120}>
          <p className={`mt-4 text-[0.95rem] leading-relaxed ${sub}`}>{subtitle}</p>
        </ClassicMobileReveal>
      )}
    </div>
  );
}
