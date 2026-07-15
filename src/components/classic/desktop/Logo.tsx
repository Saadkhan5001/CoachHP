import Image from "next/image";
import { forwardRef } from "react";

export const Logo = forwardRef<HTMLImageElement, { className?: string }>(function Logo(
  { className = "" },
  ref
) {
  return (
    <span className={`inline-flex items-center ${className}`} aria-label="Coach P Factory">
      <Image
        ref={ref}
        src="/images/CoachP-logo.png"
        alt=""
        width={700}
        height={360}
        priority
        className="h-16 w-auto object-contain sm:h-20"
      />
    </span>
  );
});