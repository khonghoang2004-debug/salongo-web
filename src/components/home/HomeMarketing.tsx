import { getTranslations } from "next-intl/server";
import { ArrowRight, Cake, Eye, Languages, MailCheck, Megaphone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PhoneShot } from "../ui/AppShot";
import { VideoModalButton } from "../video/VideoModalButton";
import { videoById } from "@/lib/videos";

const A = "/images/app/";

// 10 mẫu email theo dịp trong app (lib/marketing/campaign-templates.ts), đúng thứ tự trong trình soạn
const TEMPLATES = ["tplSale", "tplNewService", "tplChristmas", "tplNewYear", "tplValentine", "tplWomensDay", "tplEaster", "tplMothersDay", "tplSummer", "tplBlackFriday"] as const;

const POINTS = [
  { i: 1, Icon: Megaphone },
  { i: 2, Icon: Languages },
  { i: 3, Icon: Eye },
  { i: 4, Icon: MailCheck },
  { i: 5, Icon: Cake },
] as const;

// Email marketing + ưu đãi sinh nhật ngay trong app: ảnh chụp thật từ trình soạn
export async function HomeMarketing() {
  const h = await getTranslations("home2");
  const v = await getTranslations("videos");

  return (
    <section id="marketing" className="sg-section scroll-mt-24">
      <div className="sg-container grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div data-reveal className="lg:col-span-5">
          <p className="sg-kicker">{h("mkEyebrow")}</p>
          <h2 className="sg-h2 mt-4">{h("mkTitle")}</h2>
          <p className="sg-lead mt-5">{h("mkLead")}</p>

          <ul data-stagger className="mt-7 space-y-3">
            {POINTS.map(({ i, Icon }) => (
              <li key={i} className="flex items-center gap-3.5 text-[15px] leading-snug text-ink">
                <span className="sg-icon-tile size-9" aria-hidden>
                  <Icon className="size-[18px]" />
                </span>
                <span className="font-medium">{h(`mk${i}Title`)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <VideoModalButton
              video={videoById("marketing")}
              title={v("items.marketing.title")}
              label={v("watch")}
              playLabel={v("play")}
              closeLabel={v("close")}
              note={v("note")}
            />
            <Link href="/tinh-nang#marketing" className="sg-arrow inline-flex min-h-12 items-center gap-1.5 px-2 text-[15px] font-semibold text-brand-700 hover:text-brand-800">
              {h("mkCta")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div data-reveal="scale" className="min-w-0 lg:col-span-7">
          <div className="rounded-[28px] bg-nude p-4 sm:p-8 lg:p-10">
            {/* PC: trình soạn email; điện thoại: các email xem trước, cuộn ngang */}
            <div className="sg-browser max-sm:hidden">
              <div className="sg-browser-bar">
                <span className="sg-browser-dot" />
                <span className="sg-browser-dot" />
                <span className="sg-browser-dot" />
                <span className="ml-2 truncate text-xs font-medium text-muted">{h("mkShotPc")}</span>
              </div>
              <img src={A + "marketing-giang-sinh-v2.webp"} alt={h("mkShotPc")} width={1600} height={1165} loading="lazy" decoding="async" className="block h-auto w-full" />
            </div>
            <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 sm:hidden">
              {([
                ["m-marketing-giang-sinh.webp", "tplChristmas"],
                ["m-sinh-nhat.webp", "mkShotBirthday"],
                ["m-marketing-soan.webp", "mkShotCompose"],
              ] as const).map(([src, label]) => (
                <figure key={src} className="w-[62vw] max-w-[240px] shrink-0 snap-center">
                  <PhoneShot src={A + src} alt={h(label)} />
                  <figcaption className="mt-2.5 text-center text-[13px] font-medium text-ink/75">{h(label)}</figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-6 text-sm font-medium text-ink/70">{h("mkTemplates")}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {TEMPLATES.map((key) => (
                <li key={key} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink/85">
                  {h(key)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
