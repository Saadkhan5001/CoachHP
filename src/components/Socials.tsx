import { Instagram } from "lucide-react";
import { BRAND } from "@/lib/data";

export function SocialIcons({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "footer";
  className?: string;
}) {
  const light =
    "h-9 w-9 border border-black/15 text-black/70 hover:border-accent hover:text-accent";
  const footer = "h-9 w-9 border border-white/15 text-white/70 hover:border-accent hover:text-accent";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <a
        href={BRAND.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Coach P Factory on Instagram (${BRAND.instagramHandle})`}
        className={`flex items-center justify-center rounded-[3px] transition-colors ${
          variant === "light" ? light : footer
        }`}
      >
        <Instagram className="h-4 w-4" />
      </a>
    </div>
  );
}
