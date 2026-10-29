import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import { DemoNote, PhoneShot } from "../ui/AppShot";

// Khối "làm cho người Việt": chủ dùng tiếng Việt, khách đặt lịch bằng tiếng địa phương
export async function HomeLanguage() {
  const h = await getTranslations("home2");
  const points = ["lang1", "lang2", "lang3", "lang4"] as const;

  return (
    <section className="sg-section bg-[#FBF7F7]">
      <div className="sg-container grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className="lg:col-span-6">
          <p className="sg-kicker">{h("langEyebrow")}</p>
          <h2 className="sg-h2 mt-4">{h("langTitle")}</h2>
          <p className="sg-lead mt-5">{h("langLead")}</p>
          <ul data-stagger className="mt-9 grid gap-x-8 gap-y-5 border-t border-line pt-8 sm:grid-cols-2">
            {points.map((k) => (
              <li key={k} className="flex items-start gap-3 text-[15px] font-medium leading-relaxed text-ink/85">
                <Check className="mt-1 size-4 shrink-0 text-brand-700" strokeWidth={3} aria-hidden />
                {h(k)}
              </li>
            ))}
          </ul>
        </div>

        {/* Ảnh chụp thật: app của salon bằng tiếng Việt, trang đặt lịch của khách bằng tiếng Séc */}
        <div data-reveal="scale" className="lg:col-span-6">
          <div className="rounded-[28px] bg-brand-700 px-5 pb-6 pt-7 sm:px-10 sm:pb-8 sm:pt-9">
            <div className="grid grid-cols-2 gap-4 sm:gap-8">
              {([
                ["/images/app/m-lich-online.webp", "langShotApp", "VI"],
                ["/images/app/m-dat-lich-dich-vu.webp", "langShotBook", "CS"],
              ] as const).map(([src, label, code], i) => (
                <figure key={src} data-reveal={i ? "right" : undefined} style={{ "--d": `${250 + i * 250}ms` } as CSSProperties}>
                  <PhoneShot src={src} alt={h(label)} />
                  <figcaption className="mt-3 flex items-center justify-center gap-2 text-center text-xs font-semibold text-white/85 sm:text-sm">
                    <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px]">{code}</span>
                    {h(label)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <DemoNote text={h("demoNote")} className="mt-3 justify-center" />
        </div>
      </div>
    </section>
  );
}
