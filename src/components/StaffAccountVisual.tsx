import { Check, Clock, LogIn, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";

// Minh hoạ tài khoản nhân viên bằng giao diện (không dùng ảnh chụp):
// chọn vai trò, lịch hôm nay của thợ và thu nhập cá nhân
export async function StaffAccountVisual() {
  const t = await getTranslations("featuresV2.staffDemo");
  const items = [
    { time: "09:30", name: t("item1"), status: t("item1Status"), state: "done" },
    { time: "11:00", name: t("item2"), status: t("item2Status"), state: "now" },
    { time: "14:00", name: t("item3"), status: t("item3Status"), state: "next" },
  ] as const;

  return (
    <div className="sg-gradient-soft overflow-hidden rounded-2xl border border-violet-100 p-4 shadow-sg-lg sm:rounded-3xl sm:p-8 lg:p-10">
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-5 md:grid-cols-[1.15fr_1fr] md:gap-8">
        {/* Lịch hôm nay của nhân viên */}
        <div className="min-w-0 rounded-2xl border border-line bg-white p-4 shadow-sg-md sm:p-6">
          <div className="flex items-center gap-3">
            <span className="sg-icon-tile size-11 rounded-full text-base font-bold" aria-hidden>
              L
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-ink">{t("hello")}</p>
              <p className="text-sm text-muted">{t("today")}</p>
            </div>
            <span className="ml-auto flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <LogIn className="size-3.5" aria-hidden />
              {t("role3")}
            </span>
          </div>
          <ul className="mt-5 space-y-2.5">
            {items.map((it) => (
              <li
                key={it.time}
                className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 ${
                  it.state === "now" ? "border-violet-200 bg-violet-50/70" : "border-line bg-white"
                }`}
              >
                <span className="w-11 shrink-0 text-sm font-bold tabular-nums text-ink">{it.time}</span>
                <span className="min-w-0 flex-1 truncate font-medium text-ink">{it.name}</span>
                <span
                  className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    it.state === "done"
                      ? "bg-emerald-50 text-emerald-700"
                      : it.state === "now"
                        ? "bg-violet-100 text-violet-700"
                        : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {it.state === "done" ? (
                    <Check className="size-3.5" aria-hidden />
                  ) : it.state === "now" ? (
                    <Sparkles className="size-3.5" aria-hidden />
                  ) : (
                    <Clock className="size-3.5" aria-hidden />
                  )}
                  {it.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 space-y-4">
          {/* Vai trò */}
          <div className="flex rounded-full border border-line bg-white p-1 shadow-sg-sm">
            {[t("role1"), t("role2"), t("role3")].map((r, i) => (
              <span
                key={r}
                className={`min-w-0 flex-1 truncate rounded-full px-2 py-2 text-center text-sm font-semibold ${
                  i === 2 ? "btn-primary !rounded-full !py-2 !text-sm" : "text-muted"
                }`}
              >
                {r}
              </span>
            ))}
          </div>
          {/* Thu nhập cá nhân */}
          <div className="sg-hero-card rounded-2xl p-5 shadow-sg-md sm:p-6">
            <p className="text-sm font-medium text-white/90">
              {t("revenue")} · {t("month")}
            </p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight tabular-nums sm:text-4xl">48 600 Kč</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/20 px-3 py-2.5">
                <p className="text-xs font-medium text-white/90">{t("commission")}</p>
                <p className="text-lg font-bold tabular-nums">19 440 Kč</p>
              </div>
              <div className="rounded-xl bg-white/20 px-3 py-2.5">
                <p className="text-xs font-medium text-white/90">{t("tips")}</p>
                <p className="text-lg font-bold tabular-nums">2 350 Kč</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
