import { useTranslations } from "next-intl";
import { PageShell } from "@/components/PageShell";
import { NotFoundActions } from "@/components/NotFoundActions";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <PageShell>
      <section className="pt-2 sm:pt-3">
        <div className="sg-panel px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-7xl font-semibold tracking-[-0.05em] text-brand-700 sm:text-8xl">404</p>
          <h1 className="sg-h2 mt-4">{t("title")}</h1>
          <p className="sg-lead mt-3">{t("desc")}</p>
          <NotFoundActions backHome={t("backHome")} goBack={t("goBack")} />
        </div>
        </div>
      </section>
    </PageShell>
  );
}
