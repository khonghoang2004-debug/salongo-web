import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PhoneShot } from "../ui/AppShot";

const A = "/images/app/";
const POINTS = [1, 2, 3, 4] as const;

// Hai tính năng chủ salon hay bỏ sót: đa chi nhánh (PC + điện thoại) và tài khoản nhân viên (chỉ điện thoại,
// vì thợ đi làm chỉ mang điện thoại). Ảnh chụp thật từ app.
export async function HomeHighlights() {
  const h = await getTranslations("home2");

  return (
    <>
      {/* Đa chi nhánh */}
      <section id="da-chi-nhanh" className="sg-section scroll-mt-24 bg-[#FBF7F7]">
        <div className="sg-container grid items-center gap-7 lg:grid-cols-12 lg:gap-14">
          <div data-reveal className="lg:col-span-5">
            <p className="sg-kicker">{h("hlBranchEyebrow")}</p>
            <h2 className="sg-h2 mt-4">{h("hlBranchTitle")}</h2>
            <p className="sg-lead mt-5">{h("hlBranchLead")}</p>
            <Points h={h} prefix="hlBranch" />
            <Link href="/tinh-nang#da-chi-nhanh" className="btn-secondary sg-arrow mt-6 px-6 py-3 text-sm lg:mt-9">
              {h("featureMore")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <div data-reveal="scale" className="relative lg:col-span-7">
            <div className="sg-browser max-sm:hidden lg:mr-24">
              <div className="sg-browser-bar">
                <span className="sg-browser-dot" />
                <span className="sg-browser-dot" />
                <span className="sg-browser-dot" />
                <span className="ml-2 truncate text-xs font-medium text-muted">{h("hlBranchShotPc")}</span>
              </div>
              <img src={A + "chi-nhanh-chon.webp"} alt={h("hlBranchShotPc")} width={933} height={800} loading="lazy" className="block h-auto w-full" />
            </div>
            <div className="mx-auto max-w-[280px] sm:absolute sm:-bottom-6 sm:right-0 sm:w-[210px] sm:max-w-none lg:w-[230px]">
              <PhoneShot src={A + "m-chi-nhanh-menu.webp"} alt={h("hlBranchShotPhone")} />
            </div>
          </div>
        </div>
      </section>

      {/* Tài khoản nhân viên: chỉ giao diện điện thoại */}
      <section id="tai-khoan-nhan-vien" className="sg-section scroll-mt-24">
        <div className="sg-container grid items-center gap-7 lg:grid-cols-12 lg:gap-14">
          <div data-reveal className="min-w-0 lg:order-2 lg:col-span-5">
            <p className="sg-kicker">{h("hlStaffEyebrow")}</p>
            <h2 className="sg-h2 mt-4">{h("hlStaffTitle")}</h2>
            <p className="sg-lead mt-5">{h("hlStaffLead")}</p>
            <Points h={h} prefix="hlStaff" />
            <Link href="/tinh-nang#nhan-vien" className="btn-secondary sg-arrow mt-6 px-6 py-3 text-sm lg:mt-9">
              {h("featureMore")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <div data-reveal="scale" className="min-w-0 lg:order-1 lg:col-span-7">
            <div className="rounded-[28px] bg-brand-700 px-4 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-9">
              {/* Điện thoại nhỏ: cuộn ngang qua 3 màn; từ sm: 3 máy cạnh nhau */}
              <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
                {([
                  ["m-nv-ngay-mai.webp", "hlStaffShot1"],
                  ["m-nv-hom-nay.webp", "hlStaffShot2"],
                  ["m-nv-menu.webp", "hlStaffShot3"],
                ] as const).map(([src, label], i) => (
                  <figure key={src} className="w-[62vw] max-w-[240px] shrink-0 snap-center sm:w-auto sm:max-w-none" style={{ "--d": `${150 + i * 150}ms` } as CSSProperties}>
                    <PhoneShot src={A + src} alt={h(label)} />
                    <figcaption className="mt-3 text-center text-xs font-semibold text-white/85 sm:text-sm">{h(label)}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

type T = Awaited<ReturnType<typeof getTranslations<"home2">>>;

function Points({ h, prefix }: { h: T; prefix: "hlBranch" | "hlStaff" }) {
  return (
    <ul data-stagger className="mt-6 space-y-3 border-t border-line pt-5 lg:mt-8 lg:pt-7">
      {POINTS.map((i) => (
        <li key={i} className="flex items-start gap-3 text-[15px] font-medium leading-relaxed text-ink/85">
          <Check className="mt-1 size-4 shrink-0 text-brand-700" strokeWidth={3} aria-hidden />
          {h(`${prefix}${i}` as Parameters<T>[0])}
        </li>
      ))}
    </ul>
  );
}
