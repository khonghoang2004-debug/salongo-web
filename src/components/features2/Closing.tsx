import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SIGNUP_URL, appLink } from "@/lib/app-links";

/** Lời mời dùng thử cuối trang: chữ trái, không khung, một đường kẻ mảnh phía trên. Dùng chung cho Tính năng / Giải pháp / Hướng dẫn. */
export function Closing({
  locale,
  title,
  lead,
  cta,
  link,
}: {
  locale: string;
  title: string;
  lead: string;
  cta: string;
  link: { href: string; label: string };
}) {
  return (
    <section className="bg-white pb-12 lg:pb-28" aria-labelledby="closing-title">
      <div className="x-wrap">
        <div data-cta className="x-panel bg-porcelain px-7 py-14 sm:px-12 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:px-16 lg:py-20">
          <div>
            <h2 id="closing-title" className="x-h2 max-w-[40rem] text-ink">{title}</h2>
            <p className="x-lead mt-5 max-w-[34rem]">{lead}</p>
          </div>
          <div className="mt-9 flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center lg:mt-0 lg:flex-col lg:items-end">
            <a href={appLink(SIGNUP_URL, locale)} className="x-btn-primary !min-h-[52px] !px-7 text-base">{cta}</a>
            <Link href={link.href} className="x-link min-h-11">
              {link.label}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
