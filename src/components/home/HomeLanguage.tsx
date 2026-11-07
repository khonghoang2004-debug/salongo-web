import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import { PhoneShot } from "../ui/AppShot";

// Khối "làm cho người Việt": chủ và thợ dùng tiếng Việt, khách đặt lịch bằng tiếng của họ
export async function HomeLanguage() {
  const h = await getTranslations("home2");
  const points = ["lang1", "lang2", "lang3", "lang4"] as const;

  return (
    <section className="sg-section bg-nude">
      <div className="sg-container grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className="lg:col-span-6">
          <p className="sg-kicker">{h("langEyebrow")}</p>
          <h2 className="sg-h2 mt-4">{h("langTitle")}</h2>
          <p className="sg-lead mt-5">{h("langLead")}</p>
          <ul data-stagger className="mt-7 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {points.map((k) => (
              <li key={k} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/85">
                <Check className="mt-1 size-4 shrink-0 text-brand-700" strokeWidth={2.5} aria-hidden />
                {h(k)}
              </li>
            ))}
          </ul>
        </div>

        {/* Ảnh chụp thật: app của salon bằng tiếng Việt, trang đặt lịch của khách bằng tiếng Séc */}
        <div data-reveal="scale" className="lg:col-span-6">
          <div className="mx-auto grid max-w-[520px] grid-cols-2 gap-4 sm:gap-6">
            {([
              ["/images/app/m-lich-online.webp", "langShotApp", "VI"],
              ["/images/app/m-dat-lich-dich-vu.webp", "langShotBook", "CS"],
            ] as const).map(([src, label, code], i) => (
              <figure key={src} className={i ? "mt-10" : ""} style={{ "--d": `${200 + i * 200}ms` } as CSSProperties}>
                <div className="relative">
                  <div className={`${i ? "sg-arch-nude !bg-white" : "sg-arch"} absolute inset-x-0 bottom-0 top-[10%]`} aria-hidden />
                  <PhoneShot src={src} alt={h(label)} className="relative mx-auto w-[82%] -translate-y-[3%]" />
                </div>
                <figcaption className="mt-4 flex items-center justify-center gap-2 text-center text-[13px] font-medium text-ink/75 sm:text-sm">
                  <span className="rounded-full border border-line bg-white px-2 py-0.5 text-[11px] font-semibold text-ink">{code}</span>
                  {h(label)}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
