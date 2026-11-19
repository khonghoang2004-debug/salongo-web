import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { renewLink } from "@/lib/app-links";

/** Gia hạn trên web: khối mận đậm duy nhất của trang, 4 bước ngắn và nút Gia hạn. */
export async function RenewPanel() {
  const t = await getTranslations("pricing2.renew");
  const locale = await getLocale();
  const steps = ["s1", "s2", "s3", "s4"] as const;
  return (
    <section id="gia-han" className="scroll-mt-20 bg-white pb-[clamp(4.5rem,3rem+6vw,8.5rem)]" aria-labelledby="renew-title">
      <div className="x-wrap">
        <div className="x-panel grid gap-10 bg-plum p-7 text-white sm:p-10 lg:grid-cols-12 lg:gap-8 lg:p-14 [&>*]:min-w-0">
          <div className="lg:col-span-5">
            <h2 id="renew-title" className="x-h2">{t("title")}</h2>
            <p className="mt-5 max-w-[26rem] text-[1.0625rem] leading-relaxed text-white/75">{t("lead")}</p>
            <a href={renewLink(locale)} className="x-btn-onDark mt-9">
              {t("cta")}
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="border-t border-white/15">
              {steps.map((k, i) => (
                <li key={k} className="flex gap-5 border-b border-white/15 py-5">
                  <span className="w-6 shrink-0 text-[15px] font-medium tabular-nums text-white/50" aria-hidden>
                    {i + 1}
                  </span>
                  <span className="text-[1.0625rem] leading-snug text-white">{t(k)}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-[14.5px] leading-relaxed text-white/60">{t("note")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
