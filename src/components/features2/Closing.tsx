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
        <div data-cta className="relative overflow-hidden rounded-[28px] bg-plum px-6 py-14 text-white sm:px-12 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:px-16 lg:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_120%,rgba(241,201,211,0.2)_0%,rgba(42,15,23,0)_70%)]" aria-hidden />
          <div className="relative">
            <h2 id="closing-title" className="x-h2 max-w-[40rem] text-white">{title}</h2>
            <p className="x-lead mt-5 max-w-[34rem] !text-white/70">{lead}</p>
          </div>
          <div className="relative mt-9 flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center lg:mt-0 lg:flex-col lg:items-end">
            <a href={appLink(SIGNUP_URL, locale)} className="x-btn-onDark !min-h-[52px] !px-7 text-base">{cta}</a>
            <Link href={link.href} className="inline-flex min-h-11 items-center gap-1.5 font-medium text-white underline decoration-white/30 underline-offset-[5px] hover:decoration-white">
              {link.label}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
