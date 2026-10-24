import { useTranslations } from "next-intl";
import { PageShell } from "@/components/PageShell";
import { NotFoundActions } from "@/components/NotFoundActions";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <PageShell>
      <section className="sg-page-hero sg-section-glow">
        <div className="relative z-10 mx-auto max-w-xl text-center">
          <p className="sg-gradient-text text-6xl font-extrabold tracking-tight sm:text-7xl">404</p>
          <h1 className="sg-h2 mt-4">{t("title")}</h1>
          <p className="sg-lead mt-3">{t("desc")}</p>
          <NotFoundActions backHome={t("backHome")} goBack={t("goBack")} />
        </div>
      </section>
    </PageShell>
  );
}
