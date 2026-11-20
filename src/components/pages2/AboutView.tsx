import { getTranslations, getLocale } from "next-intl/server";
import { OPERATOR } from "@/lib/legal";
import { getLegalPack } from "@/content/legal";
import { PageHead } from "./PageHead";

export async function AboutView() {
  const t = await getTranslations("pages2.about");
  const locale = await getLocale();
  const { ui } = getLegalPack(locale);
  return (
    <>
      <PageHead title={t("title")} lead={t("lead")} />
      <section className="bg-white pb-20">
        <div className="x-wrap grid gap-12 lg:grid-cols-12 [&>*]:min-w-0">
          <h2 className="x-h3 text-ink lg:col-span-4">{t("whyTitle")}</h2>
          <ol className="space-y-6 lg:col-span-8">
            {(["why1", "why2", "why3"] as const).map((k) => (
              <li key={k} className="border-t border-line pt-6 text-[1.2rem] leading-relaxed tracking-[-0.01em] text-ink">{t(k)}</li>
            ))}
          </ol>
        </div>
      </section>
      <section className="bg-porcelain py-20 lg:py-28">
        <div className="x-wrap grid gap-12 lg:grid-cols-12 [&>*]:min-w-0">
          <h2 className="x-h3 text-ink lg:col-span-4">{t("promiseTitle")}</h2>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
            {(["promise1", "promise2", "promise3", "promise4"] as const).map((k) => (
              <li key={k} className="border-t border-ink/15 pt-5 text-[1.0625rem] leading-relaxed text-ink/85">{t(k)}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="x-wrap text-[15px] text-ink/75">
          <p className="text-muted">{t("who")}</p>
          <p className="mt-2">
            {OPERATOR.name}
            {OPERATOR.ico ? `, ${ui.ico} ${OPERATOR.ico}` : ""}
            {OPERATOR.address ? `, ${OPERATOR.address}` : ""}
          </p>
        </div>
      </section>
    </>
  );
}
