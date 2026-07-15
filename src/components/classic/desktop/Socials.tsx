import { Instagram, Facebook } from "lucide-react";
import { CLASSIC_BRAND } from "@/lib/classic-data";

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const LINKS: { key: "x" | "instagram" | "facebook"; href: string; label: string }[] = [
  { key: "x", href: "#contact", label: "X" },
  { key: "instagram", href: CLASSIC_BRAND.instagram, label: "Instagram" },
  { key: "facebook", href: "#contact", label: "Facebook" },
];
const ICONS = { x: XIcon, instagram: Instagram, facebook: Facebook } as const;

export function SocialIcons({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "footer";
  className?: string;
}) {
  const wrap =
    variant === "light"
      ? "h-9 w-9 border border-black/10 text-black/80 hover:bg-black hover:text-white"
      : "text-white/70 hover:text-white";
  const size = variant === "light" ? "h-4 w-4" : "h-5 w-5";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {LINKS.map(({ key, href, label }) => {
        const Icon = ICONS[key];
        const external = href.startsWith("http");
        return (
          <a
            key={key}
            href={href}
            aria-label={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={
              variant === "light"
                ? `flex items-center justify-center rounded-full transition-colors ${wrap}`
                : `transition-colors ${wrap}`
            }
          >
            <Icon className={size} />
          </a>
        );
      })}
    </div>
  );
}
