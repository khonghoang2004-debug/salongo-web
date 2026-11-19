import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  const t = useTranslations("pages2.notFound");
  return (
    <PageShell cta={false}>
      <section className="bg-white py-24 sm:py-32">
        <div className="x-wrap">
          <p className="text-[15px] font-medium tabular-nums text-brand-700">404</p>
          <h1 className="x-display mt-4 max-w-[40rem] text-ink">{t("title")}</h1>
          <p className="x-lead mt-5 max-w-[34rem]">{t("desc")}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="x-btn-primary">{t("home")}</Link>
            <Link href="/bang-gia" className="x-btn-light">{t("pricing")}</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
