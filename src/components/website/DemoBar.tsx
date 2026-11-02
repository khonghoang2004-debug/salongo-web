import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/metadata";
import { ChooseTemplateButton } from "./WebsiteContact";

// Thanh điều khiển SalonGo phía trên website mẫu: không dính (không che giao diện mẫu khi cuộn trên mobile)
export async function DemoBar({ name, type }: { name: string; type: string }) {
  const t = await getTranslations("webOffer");
  return (
    <div data-demobar className="relative z-50 border-b border-white/10 bg-[#2A1219] text-white">
      <div className="mx-auto flex min-h-14 max-w-[1280px] items-center gap-2 px-3 py-2 sm:gap-3 sm:px-6">
        <Link
          href="/website"
          aria-label={t("backToLibrary")}
          className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:px-3"
        >
          <ArrowLeft className="size-4" aria-hidden />
          <span className="hidden min-[400px]:inline" aria-hidden>
            {t("backToLibrary")}
          </span>
        </Link>
        <div className="flex min-w-0 flex-1 items-center justify-center gap-2 text-center">
          <img src={siteConfig.logo} alt="" width={20} height={20} className="hidden size-5 rounded sm:block" />
          <span className="shrink-0 rounded-full border border-white/25 px-2.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.08em]">
            {t("demoBadge")}
          </span>
          <span className="hidden truncate text-sm text-white/75 md:inline">
            {name} · {type}
          </span>
        </div>
        <ChooseTemplateButton
          template={name}
          className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-white px-4 text-sm font-semibold text-[#2A1219] transition-colors hover:bg-[#F7E3E9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {t("choose")}
        </ChooseTemplateButton>
      </div>
    </div>
  );
}
