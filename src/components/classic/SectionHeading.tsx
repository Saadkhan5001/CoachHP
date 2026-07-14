import { PillLabel } from "./PillLabel";
import { Reveal } from "../Reveal";

type Props = {
  label: string;
  theme?: "dark" | "light";
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headingStyle?: React.CSSProperties;
  subtitleStyle?: React.CSSProperties;
};

export function SectionHeading({
  label,
  theme = "dark",
  subtitle,
  children,
  className = "",
  headingStyle,
  subtitleStyle,
}: Props) {
  const subColor = theme === "dark" ? "text-white/55" : "text-black/55";
  return (
    <div className={`mx-auto flex max-w-2xl flex-col items-center text-center ${className}`}>
      <Reveal>
        <PillLabel theme={theme}>{label}</PillLabel>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="h-section mt-5" style={headingStyle}>{children}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p className={`mt-4 max-w-md text-[0.98rem] leading-relaxed ${subColor}`} style={subtitleStyle}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
