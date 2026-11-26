import { AppleIcon, WindowsIcon } from "@/components/site/BrandIcons";
import { DOWNLOAD_LINKS, IOS_APP_LIVE } from "@/lib/app-links";

type Labels = { mac: string; win: string; ios: string; label?: string };

/**
 * SalonGo app downloads as one compact row of pill buttons (Mac · Windows · App Store), for the top of pages
 * (hero, pricing) so nobody has to scroll to the footer to find them. Server component, plain links.
 * Mac / Windows go through /api/download/<os> (newest installer); App Store opens the listing.
 */
export function DownloadBadges({ labels, className = "", tone = "light", compact = false }: { labels: Labels; className?: string; tone?: "light" | "dark"; compact?: boolean }) {
  const size = compact ? "gap-1.5 px-2.5 text-[13px] min-[380px]:px-3 min-[380px]:text-[13.5px]" : "gap-2 px-3.5 text-[14px]";
  const pill =
    tone === "dark"
      ? `inline-flex min-h-[40px] items-center rounded-full border border-white/25 ${size} font-medium text-white transition-colors hover:border-white/60`
      : `inline-flex min-h-[40px] items-center rounded-full border border-line bg-white ${size} font-medium text-ink transition-colors hover:border-ink/40`;
  const ico = tone === "dark" ? "text-white" : "text-ink";
  return (
    <div className={`flex flex-wrap items-center ${compact ? "gap-1.5" : "gap-2"} ${className}`}>
      {labels.label ? <span className={`mr-1 text-[13.5px] ${tone === "dark" ? "text-white/70" : "text-muted"}`}>{labels.label}</span> : null}
      <a href={DOWNLOAD_LINKS.mac} className={pill} rel="nofollow">
        <AppleIcon className={`size-4 ${ico}`} />
        {labels.mac}
      </a>
      <a href={DOWNLOAD_LINKS.windows} className={pill} rel="nofollow">
        <WindowsIcon className={`size-[14px] ${ico}`} />
        {labels.win}
      </a>
      {IOS_APP_LIVE ? (
        <a href={DOWNLOAD_LINKS.ios} className={pill} target="_blank" rel="noopener noreferrer">
          <AppleIcon className={`size-4 ${ico}`} />
          {labels.ios}
        </a>
      ) : null}
    </div>
  );
}
