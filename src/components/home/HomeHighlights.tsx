import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PhoneShot } from "../ui/AppShot";
import { DeviceSwitch } from "../ui/DeviceSwitch";
import { VideoModalButton } from "../video/VideoModalButton";
import { videoById } from "@/lib/videos";

const A = "/images/app/";
const POINTS = [1, 2, 3, 4] as const;

// Hai tính năng chủ salon hay bỏ sót: tài khoản nhân viên (chỉ điện thoại, vì thợ đi làm chỉ mang điện thoại)
// và đa chi nhánh (PC + điện thoại). Ảnh chụp thật từ app.
export async function HomeHighlights() {
  const h = await getTranslations("home2");
  const v = await getTranslations("videos");

  return (
    <>
      {/* Tài khoản nhân viên: mỗi điện thoại đứng trong một "đầu móng" đỏ đô */}
      <section id="tai-khoan-nhan-vien" className="sg-section scroll-mt-24">
        <div className="sg-container grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div data-reveal className="min-w-0 lg:col-span-5">
            <p className="sg-kicker">{h("hlStaffEyebrow")}</p>
            <h2 className="sg-h2 mt-4">{h("hlStaffTitle")}</h2>
            <p className="sg-lead mt-5">{h("hlStaffLead")}</p>
            <Points h={h} prefix="hlStaff" />
            <Link href="/tinh-nang#nhan-vien" className="btn-secondary sg-arrow mt-8 px-6 text-[15px]">
              {h("featureMore")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <div data-reveal="scale" className="min-w-0 lg:col-span-7">
            <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0">
              {([
                ["m-nv-hom-nay.webp", "hlStaffShot1"],
                ["m-nv-doanh-thu.webp", "hlStaffShot2"],
                ["m-quyen-doanh-thu.webp", "hlStaffShot3"],
              ] as const).map(([src, label], i) => (
                <figure key={src} className="w-[64vw] max-w-[250px] shrink-0 snap-center sm:w-auto sm:max-w-none" style={{ "--d": `${120 + i * 120}ms` } as CSSProperties}>
                  <div className={`relative ${i === 1 ? "sm:-translate-y-8" : ""}`}>
                    <div className="sg-arch absolute inset-x-0 bottom-0 top-[10%]" aria-hidden>
                      <span className="sg-arch-shine" />
                    </div>
                    <PhoneShot src={A + src} alt={h(label)} className="relative mx-auto w-[80%] translate-y-[-4%]" />
                  </div>
                  <figcaption className={`mt-4 text-center text-[13px] font-medium leading-snug text-ink/75 sm:text-sm ${i === 1 ? "sm:-translate-y-8" : ""}`}>{h(label)}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Đa chi nhánh */}
      <section id="da-chi-nhanh" className="sg-section scroll-mt-24 bg-nude">
        <div className="sg-container grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div data-reveal className="lg:col-span-5">
            <p className="sg-kicker">{h("hlBranchEyebrow")}</p>
            <h2 className="sg-h2 mt-4">{h("hlBranchTitle")}</h2>
            <p className="sg-lead mt-5">{h("hlBranchLead")}</p>
            <Points h={h} prefix="hlBranch" />
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <VideoModalButton
                video={videoById("branches")}
                title={v("items.branches.title")}
                label={v("watch")}
                playLabel={v("play")}
                closeLabel={v("close")}
                note={v("note")}
              />
              <Link href="/tinh-nang#da-chi-nhanh" className="sg-arrow inline-flex min-h-12 items-center gap-1.5 px-2 text-[15px] font-semibold text-brand-700 hover:text-brand-800">
                {h("featureMore")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>

          <div data-reveal="scale" className="lg:col-span-7">
            <DeviceSwitch
              phone={
                <div className="relative mx-auto max-w-[320px]">
                  <div className="sg-arch absolute inset-x-[6%] bottom-0 top-[8%]" aria-hidden />
                  <PhoneShot src={A + "m-chi-nhanh-menu.webp"} alt={h("hlBranchShotPhone")} className="relative mx-auto w-[74%]" />
                </div>
              }
              pc={<BranchBrowser label={h("hlBranchShotPc")} />}
              desktop={
                <div className="relative pb-6">
                  <div className="mr-20 lg:mr-28">
                    <BranchBrowser label={h("hlBranchShotPc")} />
                  </div>
                  <div className="absolute bottom-0 right-0 w-[200px] lg:w-[220px]">
                    <PhoneShot src={A + "m-chi-nhanh-menu.webp"} alt={h("hlBranchShotPhone")} />
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}

type T = Awaited<ReturnType<typeof getTranslations<"home2">>>;

function Points({ h, prefix }: { h: T; prefix: "hlBranch" | "hlStaff" }) {
  return (
    <ul data-stagger className="mt-7 space-y-3.5">
      {POINTS.map((i) => (
        <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/85">
          <Check className="mt-1 size-4 shrink-0 text-brand-700" strokeWidth={2.5} aria-hidden />
          {h(`${prefix}${i}` as Parameters<T>[0])}
        </li>
      ))}
    </ul>
  );
}

function BranchBrowser({ label }: { label: string }) {
  return (
    <div className="sg-browser">
      <div className="sg-browser-bar">
        <span className="sg-browser-dot" />
        <span className="sg-browser-dot" />
        <span className="sg-browser-dot" />
        <span className="ml-2 truncate text-xs font-medium text-muted">{label}</span>
      </div>
      <img src={A + "chi-nhanh-chon.webp"} alt={label} width={933} height={800} loading="lazy" decoding="async" className="block h-auto w-full" />
    </div>
  );
}
