import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";

/** 404: lời xin lỗi ngắn + lối đi nhanh tới các trang hay tìm nhất (phần mềm, Kasa, Web Studio, liên hệ). */
export default function NotFound() {
  const t = useTranslations("pages2.notFound");
  const s = useTranslations("site");
  const links = [
    ["/tinh-nang", "product.features"],
    ["/kasa", "product.kasa"],
    ["/website", "studio.templates"],
    ["/lien-he", "resources.contact"],
  ] as const;
  return (
    <PageShell cta={false}>
      <section className="relative overflow-hidden bg-white py-16 sm:py-28">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(55%_60%_at_20%_0%,#F8E9ED_0%,rgba(255,255,255,0)_70%)]"
          aria-hidden
        />
        <div className="x-wrap relative">
          <p className="x-eyebrow tabular-nums">404</p>
          <h1 className="x-display mt-4 max-w-[40rem] text-ink">{t("title")}</h1>
          <p className="x-lead mt-5 max-w-[34rem]">{t("desc")}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="x-btn-primary">{t("home")}</Link>
            <Link href="/bang-gia" className="x-btn-light">{t("pricing")}</Link>
          </div>
          <ul className="mt-14 grid gap-3 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {links.map(([href, key]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-[18px] bg-porcelain p-5 ring-1 ring-black/[0.05] transition-colors hover:bg-white hover:ring-brand-700/30"
                >
                  <span className="flex items-center justify-between gap-3 text-[1.0625rem] font-semibold text-ink">
                    {s(`menu.${key}.title` as never)}
                    <ArrowRight className="size-4 shrink-0 text-brand-700 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                  <span className="mt-1 text-[14.5px] leading-snug text-muted">{s(`menu.${key}.desc` as never)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
