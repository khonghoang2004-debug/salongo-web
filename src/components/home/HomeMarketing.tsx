import { getTranslations } from "next-intl/server";
import { ArrowRight, Cake, Check, Eye, Languages, MailCheck, Megaphone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PhoneShot } from "../ui/AppShot";

const A = "/images/app/";

// 10 mẫu email theo dịp trong app (lib/marketing/campaign-templates.ts), đúng thứ tự trong trình soạn
const TEMPLATES = [
  ["✨", "tplSale"],
  ["💅", "tplNewService"],
  ["🎄", "tplChristmas"],
  ["🥂", "tplNewYear"],
  ["🌹", "tplValentine"],
  ["💐", "tplWomensDay"],
  ["🐣", "tplEaster"],
  ["🌸", "tplMothersDay"],
  ["🏖️", "tplSummer"],
  ["🛍️", "tplBlackFriday"],
] as const;

const POINTS = [
  { i: 1, Icon: Megaphone },
  { i: 2, Icon: Languages },
  { i: 3, Icon: Eye },
  { i: 4, Icon: MailCheck },
  { i: 5, Icon: Cake },
] as const;

// Email marketing ngay trong app: khối nổi bật trên trang chủ, ảnh chụp thật từ trình soạn
export async function HomeMarketing() {
  const h = await getTranslations("home2");

  return (
    <section id="marketing" className="sg-section scroll-mt-24 pt-0 sm:pt-0 lg:pt-0">
      <div className="sg-container">
        <div className="overflow-hidden rounded-[24px] bg-brand-700 text-white sm:rounded-[32px]">
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-12">
            <div data-reveal className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ring-1 ring-white/25">
                <Megaphone className="size-3.5" aria-hidden />
                {h("mkEyebrow")}
              </span>
              <h2 className="mt-4 font-display text-[1.875rem] font-semibold leading-[1.1] tracking-[-0.03em] text-balance sm:text-[2.375rem] lg:text-[2.75rem]">
                {h("mkTitle")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-[1.0625rem]">{h("mkLead")}</p>

              <ul data-stagger className="mt-6 space-y-3.5">
                {POINTS.map(({ i, Icon }) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-white/90">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/15" aria-hidden>
                      <Icon className="size-4" />
                    </span>
                    <span>
                      <strong className="font-semibold text-white">{h(`mk${i}Title`)}</strong> {h(`mk${i}Text`)}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/tinh-nang#marketing"
                className="sg-arrow mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
              >
                {h("mkCta")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>

            <div data-reveal="scale" className="min-w-0 lg:col-span-7">
              {/* PC: trình soạn email; điện thoại: 2 email xem trước, cuộn ngang */}
              <div className="sg-browser max-sm:hidden">
                <div className="sg-browser-bar">
                  <span className="sg-browser-dot" />
                  <span className="sg-browser-dot" />
                  <span className="sg-browser-dot" />
                  <span className="ml-2 truncate text-xs font-medium text-muted">{h("mkShotPc")}</span>
                </div>
                <img src={A + "marketing-giang-sinh.webp"} alt={h("mkShotPc")} width={1600} height={1165} loading="lazy" className="block h-auto w-full" />
              </div>
              <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:hidden">
                {([
                  ["m-marketing-giang-sinh.webp", "tplChristmas"],
                  ["m-marketing-8-3.webp", "tplWomensDay"],
                  ["m-marketing-soan.webp", "mkShotCompose"],
                ] as const).map(([src, label]) => (
                  <figure key={src} className="w-[62vw] max-w-[240px] shrink-0 snap-center">
                    <PhoneShot src={A + src} alt={h(label)} />
                    <figcaption className="mt-2.5 text-center text-xs font-semibold text-white/85">{h(label)}</figcaption>
                  </figure>
                ))}
              </div>

              {/* 10 mẫu theo dịp */}
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{h("mkTemplates")}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {TEMPLATES.map(([emoji, key]) => (
                  <li key={key} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-medium text-white ring-1 ring-white/20">
                    <span aria-hidden>{emoji}</span>
                    {h(key)}
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 text-sm text-white/75">
                <Check className="mt-0.5 size-4 shrink-0" aria-hidden />
                {h("mkNote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
