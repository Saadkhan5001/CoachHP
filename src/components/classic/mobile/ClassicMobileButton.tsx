type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/** Red pill CTA with white label and dark arrow circle (Coach P accessibility pattern). */
export function ClassicMobileButton({ href, children, className = "" }: Props) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-[46px] items-center justify-between gap-3 rounded-full bg-[#c01d18] py-2 pl-6 pr-2 text-[0.98rem] font-medium text-white transition-colors active:bg-[#a91814] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c01d18] ${className}`}
    >
      {children}
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0f0f0f] text-white">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
