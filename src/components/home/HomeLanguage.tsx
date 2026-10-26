import { getTranslations } from "next-intl/server";
import { Check, Globe2 } from "lucide-react";

// Khối "làm cho người Việt": chủ dùng tiếng Việt, khách đặt lịch bằng tiếng địa phương
export async function HomeLanguage() {
  const h = await getTranslations("home2");
  const points = ["lang1", "lang2", "lang3", "lang4"] as const;

  return (
    <section className="sg-section bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="sg-kicker">{h("langEyebrow")}</p>
          <h2 className="sg-h2 mt-4">{h("langTitle")}</h2>
          <p className="sg-lead mt-4">{h("langLead")}</p>
          <ul className="mt-8 space-y-4">
            {points.map((k) => (
              <li key={k} className="flex items-start gap-3 text-[15px] font-medium text-ink/85 sm:text-base">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white" aria-hidden>
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {h(k)}
              </li>
            ))}
          </ul>
        </div>

        {/* Minh hoạ: cùng một lịch hẹn, hai ngôn ngữ (giao diện vẽ, không phải ảnh) */}
        <div className="relative mx-auto w-full max-w-[520px]" aria-hidden>
          <div className="rounded-[28px] border border-line bg-sand p-5 sm:p-8">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sg-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">SalonGo · Tiếng Việt</span>
                <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700">VI</span>
              </div>
              <p className="mt-4 text-base font-bold text-ink">Lịch hẹn mới</p>
              <div className="mt-3 space-y-2.5 text-sm">
                <Row label="Khách" value="Lenka Nováková" />
                <Row label="Dịch vụ" value="Gel nails · 60 phút" />
                <Row label="Thợ" value="Mai · 14:30" />
              </div>
              <div className="mt-5 flex gap-2">
                <span className="flex-1 rounded-lg bg-brand-700 py-2 text-center text-sm font-semibold text-white">Duyệt</span>
                <span className="flex-1 rounded-lg border border-line py-2 text-center text-sm font-semibold text-ink">Đổi giờ</span>
              </div>
            </div>

            <div className="mx-auto my-4 flex size-10 items-center justify-center rounded-full border border-line bg-white text-brand-700 shadow-sg-sm">
              <Globe2 className="size-5" />
            </div>

            <div className="rounded-2xl border border-line bg-white p-5 shadow-sg-md sm:ml-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Rezervace · Čeština</span>
                <span className="rounded-md bg-sand px-2 py-0.5 text-[11px] font-semibold text-ink/70">CS</span>
              </div>
              <p className="mt-4 text-base font-bold text-ink">Vaše rezervace je potvrzena</p>
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
