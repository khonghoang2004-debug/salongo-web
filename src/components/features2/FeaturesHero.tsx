import { ArrowDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SIGNUP_URL, appLink } from "@/lib/app-links";

export type IndexItem = { id: string; label: string };

/**
 * Đầu trang Tính năng / Giải pháp: H1 + một câu bên trái; bên phải là mục lục chữ lớn (điểm nhớ của trang):
 * mỗi dòng một tính năng, ngăn bằng đường kẻ mảnh, bấm là xuống đúng phần.
 */
export function FeaturesHero({
  locale,
  title,
  lead,
  cta,
  secondary,
  secondaryHref = "/bang-gia",
  indexLabel,
  items,
}: {
  locale: string;
  title: string;
  lead: string;
  cta: string;
  secondary: string;
  secondaryHref?: string;
  indexLabel: string;
  items: IndexItem[];
}) {
  return (
    <section className="bg-white pb-6 pt-10 sm:pt-10 lg:pb-12 lg:pt-14">
      <div className="x-wrap grid gap-12 lg:grid-cols-12 lg:gap-10 [&>*]:min-w-0">
        <div className="lg:col-span-6">
          <h1 className="x-display text-ink lg:!text-[clamp(3rem,1rem+3.4vw,4.4rem)]">{title}</h1>
          <p className="x-lead mt-6 max-w-[33rem]">{lead}</p>
          <div data-cta className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={appLink(SIGNUP_URL, locale)} className="x-btn-primary !min-h-[52px] !px-7 text-base">
              {cta}
            </a>
            <Link href={secondaryHref} className="x-btn-light !min-h-[52px] !px-7 text-base">
              {secondary}
            </Link>
          </div>
        </div>

        <nav aria-labelledby="page-index" className="lg:col-span-5 lg:col-start-8 lg:pt-3">
          <p id="page-index" className="text-[15px] text-muted">
            {indexLabel}
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-x-5 border-t border-line sm:gap-x-8 lg:grid-cols-1">
            {items.map((it) => (
              <li key={it.id} className="border-b border-line">
                <a
                  href={`#${it.id}`}
                  className="group flex min-h-[52px] items-center justify-between gap-4 py-2 text-[15px] font-medium leading-snug tracking-[-0.01em] text-ink transition-colors hover:text-brand-700 sm:text-[1.0625rem] lg:min-h-[56px] lg:text-[1.2rem]"
                >
                  {it.label}
                  <ArrowDown className="hidden size-4 shrink-0 text-ink/30 sm:block transition-colors group-hover:text-brand-700" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
