import { getTranslations } from "next-intl/server";
import { Check, Globe2 } from "lucide-react";

// Khối "làm cho người Việt": chủ dùng tiếng Việt, khách đặt lịch bằng tiếng địa phương
export async function HomeLanguage() {
  const h = await getTranslations("home2");
  const points = ["lang1", "lang2", "lang3", "lang4"] as const;

  return (
    <section className="sg-section bg-[#FBF7F7]">
      <div className="sg-container grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="sg-kicker">{h("langEyebrow")}</p>
          <h2 className="sg-h2 mt-4">{h("langTitle")}</h2>
          <p className="sg-lead mt-5">{h("langLead")}</p>
          <ul className="mt-9 grid gap-x-8 gap-y-5 border-t border-line pt-8 sm:grid-cols-2">
            {points.map((k) => (
              <li key={k} className="flex items-start gap-3 text-[15px] font-medium leading-relaxed text-ink/85">
                <Check className="mt-1 size-4 shrink-0 text-brand-700" strokeWidth={3} aria-hidden />
                {h(k)}
              </li>
            ))}
          </ul>
        </div>

        {/* Minh hoạ: cùng một lịch hẹn, hai ngôn ngữ (giao diện vẽ, không phải ảnh) */}
        <div className="lg:col-span-6" aria-hidden>
          <div className="rounded-[28px] bg-brand-700 p-5 sm:p-10">
            <div className="rounded-2xl bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Salora · Tiếng Việt</span>
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold text-brand-700">VI</span>
              </div>
              <p className="mt-4 text-base font-semibold text-ink">Lịch hẹn mới</p>
              <div className="mt-3 space-y-2.5 text-sm">
                <Row label="Khách" value="Lenka Nováková" />
                <Row label="Dịch vụ" value="Gel nails · 60 phút" />
                <Row label="Thợ" value="Mai · 14:30" />
              </div>
              <div className="mt-5 flex gap-2">
                <span className="flex-1 rounded-full bg-brand-700 py-2.5 text-center text-sm font-semibold text-white">Duyệt</span>
                <span className="flex-1 rounded-full border border-line py-2.5 text-center text-sm font-semibold text-ink">Đổi giờ</span>
              </div>
            </div>

            <div className="my-4 flex items-center gap-3 px-2 text-white/70">
              <span className="h-px flex-1 bg-white/20" />
              <Globe2 className="size-5" />
              <span className="h-px flex-1 bg-white/20" />
            </div>

            <div className="rounded-2xl bg-white p-5 sm:ml-12 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Rezervace · Čeština</span>
                <span className="rounded-full bg-[#FBF7F7] px-2.5 py-0.5 text-[11px] font-semibold text-ink/70">CS</span>
              </div>
              <p className="mt-4 text-base font-semibold text-ink">Vaše rezervace je potvrzena</p>
              <p className="mt-1.5 text-sm text-muted">Gelové nehty · úterý 14:30 · Mai</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line pb-2.5 last:border-0 last:pb-0">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
