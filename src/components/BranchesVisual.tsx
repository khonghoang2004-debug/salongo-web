import { Check, ChevronDown, MapPin, Plus, Store } from "lucide-react";
import { getTranslations } from "next-intl/server";

const BRANCHES = [
  { key: "branch1", revenue: "16 820 Kč", pct: 100, appts: 24 },
  { key: "branch2", revenue: "12 940 Kč", pct: 77, appts: 19 },
  { key: "branch3", revenue: "8 690 Kč", pct: 52, appts: 14 },
] as const;

// Minh hoạ đa chi nhánh bằng giao diện (không dùng ảnh chụp):
// một tài khoản chủ, tổng quan từng chi nhánh và chuyển qua lại một chạm
export async function BranchesVisual({ compact = false }: { compact?: boolean }) {
  const t = await getTranslations("featuresV2.branchDemo");

  return (
    <div
      className={`overflow-hidden bg-brand-50 ${
        compact ? "p-3 sm:p-6" : "rounded-2xl border border-brand-100 p-4 shadow-sg-lg sm:rounded-3xl sm:p-8 lg:p-10"
      }`}
    >
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-start gap-4 md:grid-cols-[1.2fr_1fr] md:gap-6">
        {/* Tổng quan hôm nay của từng chi nhánh */}
        <div className="min-w-0 rounded-2xl border border-line bg-white p-4 shadow-sg-md sm:p-6">
          <p className="text-sm font-semibold text-ink">{t("overview")}</p>
          <ul className="mt-4 divide-y divide-line">
            {BRANCHES.map((b) => (
              <li key={b.key} className="py-3.5 first:pt-0 last:pb-0">
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="flex min-w-0 items-center gap-1.5 font-semibold text-ink">
                    <MapPin className="size-3.5 shrink-0 text-brand-700" aria-hidden />
                    <span className="truncate">{t(b.key)}</span>
                  </span>
                  <span className="shrink-0 font-semibold tabular-nums text-ink">{b.revenue}</span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-brand-50">
                    <span className="block h-full rounded-full bg-brand-700" style={{ width: `${b.pct}%` }} />
                  </span>
                  <span className="w-[84px] shrink-0 text-right text-xs text-muted">
                    {b.appts} {t("appts")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Chọn chi nhánh */}
        <div className="min-w-0 rounded-2xl border border-line bg-white p-2 shadow-sg-md">
          <div className="flex items-center justify-between gap-2 px-3 py-2.5">
            <span className="text-sm font-semibold text-ink">{t("switch")}</span>
            <ChevronDown className="size-4 text-muted" aria-hidden />
          </div>
          <ul className="space-y-1">
            {(["all", "branch1", "branch2", "branch3"] as const).map((k, i) => (
              <li
                key={k}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm ${
                  i === 0 ? "bg-brand-50 font-semibold text-brand-700" : "text-ink/80"
                }`}
              >
                {i === 0 ? (
                  <Store className="size-4 shrink-0" aria-hidden />
                ) : (
                  <MapPin className="size-4 shrink-0 text-muted" aria-hidden />
                )}
                <span className="min-w-0 flex-1 truncate">{t(k)}</span>
                {i === 0 && <Check className="size-4 shrink-0" aria-hidden />}
              </li>
            ))}
          </ul>
          <div className="mt-1 flex items-center gap-2.5 rounded-xl border border-dashed border-brand-200 px-3 py-2.5 text-sm font-semibold text-brand-700">
            <Plus className="size-4 shrink-0" aria-hidden />
            {t("add")}
          </div>
        </div>
      </div>
    </div>
  );
}
