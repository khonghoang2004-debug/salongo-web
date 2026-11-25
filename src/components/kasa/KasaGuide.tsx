import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, Check, Download, Printer, KeyRound, Mail, MonitorSmartphone, Phone, ShoppingBag, WifiOff } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AppleIcon, WindowsIcon } from "@/components/site/BrandIcons";
import { SectionHead } from "@/components/landing/SectionHead";
import { CONTACT_PHONE } from "@/lib/contact";
import { kasaBankReady, kasaCardReady, kasaPrice } from "@/lib/kasa";

/*
 * Trang /kasa, phần giải thích cho khách chưa hiểu Kasa (owner 2026-11-25: "nhiều khách không hiểu"):
 * mục lục nhảy nhanh → Kasa là gì → Kasa hay SalonGo → Cách mua 3 bước → Hướng dẫn cài 5 bước có hình minh hoạ.
 * Hình minh hoạ vẽ bằng HTML/CSS (không phải ảnh chụp), có ghi chú "hình minh hoạ" dưới tiêu đề.
 */

export async function KasaAnchorNav() {
  const t = await getTranslations("kasa.nav");
  const items = [
    ["#kasa-la-gi", t("what")],
    ["#so-sanh", t("compare")],
    ["#cach-mua", t("buy")],
    ["#huong-dan", t("guide")],
  ] as const;
  return (
    <nav aria-label={t("label")} className="sticky top-14 z-30 border-y border-line bg-white/90 backdrop-blur-sm sm:top-16 xl:top-[72px]">
      <ul className="x-wrap flex gap-2 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map(([href, label]) => (
          <li key={href} className="shrink-0">
            <a href={href} className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full border border-line px-4 text-[14.5px] font-medium text-ink/80 transition-colors hover:border-ink/40 hover:text-ink">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export async function KasaWhat() {
  const t = await getTranslations("kasa.what");
  const locale = await getLocale();
  const cards = [
    { k: "c1", icon: ShoppingBag },
    { k: "c2", icon: WifiOff },
    { k: "c3", icon: MonitorSmartphone },
  ] as const;
  return (
    <section id="kasa-la-gi" className="x-section scroll-mt-32 bg-white" aria-labelledby="kasa-what-title">
      <div className="x-wrap">
        <SectionHead id="kasa-what-title" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} className="max-w-[46rem]" />
        <ul data-stagger className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14 lg:gap-5">
          {cards.map(({ k, icon: Icon }) => (
            <li key={k} className="rounded-[22px] bg-porcelain p-6 ring-1 ring-black/[0.05] sm:p-7">
              <span className="grid size-11 place-items-center rounded-xl bg-white text-brand-700 ring-1 ring-black/[0.06]">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-[1.2rem] font-semibold tracking-[-0.015em] text-ink">{t(`${k}t`)}</h3>
              <p className="mt-2 text-[1.0313rem] leading-relaxed text-ink/70">{t(`${k}d`, { price: kasaPrice(locale) })}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export async function KasaPick() {
  const t = await getTranslations("kasa.pick");
  const col = (dark: boolean, tag: string, title: string, items: string[], cta?: React.ReactNode) => (
    <article className={`flex flex-col rounded-[24px] p-6 sm:p-8 ${dark ? "bg-plum text-white" : "bg-blush/60 text-ink"}`}>
      <p className={`text-[13px] font-medium uppercase tracking-[0.12em] ${dark ? "text-[#f1c9d3]" : "text-brand-700"}`}>{tag}</p>
      <h3 className="mt-3 text-[1.75rem] font-medium leading-tight tracking-[-0.02em] [font-family:var(--font-serif)]">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((s) => (
          <li key={s} className={`flex gap-3 text-[1.0313rem] leading-relaxed ${dark ? "text-white/85" : "text-ink/80"}`}>
            <Check className={`mt-1 size-4 shrink-0 ${dark ? "text-[#9BD3B4]" : "text-[#2F5E47]"}`} strokeWidth={2.5} aria-hidden />
            {s}
          </li>
        ))}
      </ul>
      {cta}
    </article>
  );
  return (
    <section id="so-sanh" className="x-section scroll-mt-32 bg-white !pb-0" aria-labelledby="kasa-pick-title">
      <div className="x-wrap">
        <SectionHead id="kasa-pick-title" eyebrow={t("eyebrow")} title={t("title")} className="max-w-[46rem]" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-14 lg:gap-5">
          {col(false, `Kasa · ${t("kasaTag")}`, t("kasaTitle"), [t("k1"), t("k2"), t("k3")])}
          {col(
            true,
            `SalonGo · ${t("goTag")}`,
            t("goTitle"),
            [t("g1"), t("g2"), t("g3")],
            <Link href="/" className="x-btn-onDark mt-7 self-start">
              {t("goCta")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>,
          )}
        </div>
      </div>
    </section>
  );
}

export async function KasaBuySteps() {
  const t = await getTranslations("kasa.buySteps");
  const h = await getTranslations("kasa.hero");
  const online = kasaCardReady() || kasaBankReady();
  const steps = [
    { icon: ShoppingBag, title: t("s1t"), desc: online ? t("s1dOnline") : t("s1dContact") },
    { icon: Mail, title: t("s2t"), desc: t("s2d") },
    { icon: Download, title: t("s3t"), desc: t("s3d") },
  ];
  return (
    <section id="cach-mua" className="x-section scroll-mt-32 bg-porcelain" aria-labelledby="kasa-buy-title">
      <div className="x-wrap grid gap-10 lg:grid-cols-12 [&>*]:min-w-0">
        <div className="lg:col-span-4">
          <SectionHead id="kasa-buy-title" eyebrow={t("eyebrow")} title={t("title")} />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
            <Link href="/kasa/thanh-toan" className="x-btn-primary !min-h-[52px] !px-7 text-base">
              {online ? h("buy") : h("buyContact")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/kasa/download" className="x-btn-light !min-h-[52px] !px-7 text-base">
              <Download className="size-4" aria-hidden />
              {h("download")}
            </Link>
          </div>
        </div>
        <ol className="grid gap-4 lg:col-span-8">
          {steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 rounded-[22px] bg-white p-5 ring-1 ring-black/[0.05] sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:p-7">
              <span className="grid size-12 place-items-center rounded-full bg-brand-700 text-[1.25rem] font-semibold text-white tabular-nums sm:size-14" aria-hidden>
                {i + 1}
              </span>
              <div>
                <h3 className="flex items-center gap-2 text-[1.15rem] font-semibold tracking-[-0.015em] text-ink">
                  <s.icon className="size-4 text-brand-700" aria-hidden />
                  {s.title}
                </h3>
                <p className="mt-1.5 text-[1.0313rem] leading-relaxed text-ink/70">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Hình minh hoạ cho từng bước cài (HTML/CSS, giữ tỉ lệ trên mọi cỡ màn hình) ---------- */

function Win({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[12px] bg-white shadow-[0_18px_40px_-24px_rgba(42,15,23,0.45)] ring-1 ring-black/[0.08]">
      <div className="flex h-7 items-center gap-1.5 border-b border-black/[0.06] bg-[#FCFAFA] px-3">
        <span className="size-2.5 rounded-full bg-[#E9E1E3]" />
        <span className="size-2.5 rounded-full bg-[#E9E1E3]" />
        <span className="size-2.5 rounded-full bg-[#E9E1E3]" />
        <span className="ml-2 truncate text-[11.5px] font-medium text-ink/50">{title}</span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

const KasaIcon = ({ className = "" }: { className?: string }) => (
  <span className={`grid place-items-center rounded-[22%] bg-gradient-to-br from-brand-600 to-brand-800 font-semibold text-white shadow-sm ${className}`}>K</span>
);

function Art({ step, m }: { step: number; m: (k: string) => string }) {
  if (step === 1)
    return (
      <Win title="salongo.eu/kasa/download">
        <ul className="grid gap-2">
          {[
            [<WindowsIcon key="w" className="size-4" />, m("win"), ".exe"],
            [<AppleIcon key="a" className="size-4" />, m("mac"), ".dmg"],
            [<AppleIcon key="i" className="size-4 opacity-60" />, m("macIntel"), ".dmg"],
          ].map(([icon, label, ext], i) => (
            <li key={i} className={`flex items-center gap-3 rounded-[10px] border px-3 py-2.5 text-[13.5px] ${i === 0 ? "border-brand-700 bg-[#F8EEF1]" : "border-line"}`}>
              {icon}
              <span className="flex-1 font-medium text-ink">{label}</span>
              <span className="text-ink/45">{ext}</span>
              <Download className={`size-3.5 ${i === 0 ? "text-brand-700" : "text-ink/30"}`} />
            </li>
          ))}
        </ul>
      </Win>
    );
  if (step === 2)
    return (
      <div className="grid grid-cols-2 gap-3">
        <Win title="Windows">
          <div className="flex flex-col items-center gap-3 py-1">
            <KasaIcon className="size-11 text-lg" />
            <span className="h-1.5 w-full overflow-hidden rounded-full bg-line"><span className="block h-full w-2/3 rounded-full bg-brand-700" /></span>
            <span className="rounded-[8px] bg-brand-700 px-3 py-1.5 text-[12.5px] font-medium text-white">{m("install")}</span>
          </div>
        </Win>
        <Win title="Mac">
          <div className="flex items-center justify-between gap-2 py-3">
            <KasaIcon className="size-11 text-lg" />
            <ArrowRight className="size-4 shrink-0 text-brand-700" />
            <span className="flex flex-col items-center gap-1">
              <span className="grid size-11 place-items-center rounded-[10px] border-2 border-dashed border-brand-700/50 bg-[#F8EEF1] text-[10px] font-semibold text-brand-700">A</span>
              <span className="text-[11px] text-ink/60">{m("apps")}</span>
            </span>
          </div>
        </Win>
      </div>
    );
  if (step === 3)
    return (
      <Win title="SalonGo Kasa">
        <div className="flex flex-col items-center py-1">
          <KasaIcon className="size-10" />
          <p className="mt-3 flex items-center gap-1.5 self-start text-[12.5px] font-medium text-ink/60"><KeyRound className="size-3.5" />{m("key")}</p>
          <p className="mt-1.5 w-full truncate rounded-[8px] border border-brand-700 bg-white px-3 py-2 font-mono text-[12.5px] tracking-wide text-ink ring-2 ring-brand-700/15">KASA-7Q4M-2KXD-91PL-H8RT</p>
          <span className="mt-3 w-full rounded-[8px] bg-brand-700 py-2 text-center text-[13px] font-medium text-white">{m("activate")}</span>
        </div>
      </Win>
    );
  if (step === 4)
    return (
      <Win title="SalonGo Kasa">
        <div className="flex flex-col items-center py-1">
          <p className="text-[13px] font-medium text-ink/70">{m("pin")}</p>
          <div className="mt-3 flex gap-2.5">
            {[1, 1, 1, 0].map((on, i) => (
              <span key={i} className={`size-3 rounded-full ${on ? "bg-brand-700" : "border-2 border-ink/20"}`} />
            ))}
          </div>
          <div className="mt-4 grid w-[78%] grid-cols-3 gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <span key={n} className="grid h-8 place-items-center rounded-[8px] bg-porcelain text-[13px] font-medium text-ink">{n}</span>
            ))}
          </div>
        </div>
      </Win>
    );
  return (
    <Win title="SalonGo Kasa">
      <p className="text-[12.5px] font-semibold text-ink">{m("sale")}</p>
      <ul className="mt-2 divide-y divide-line text-[12.5px]">
        <li className="flex justify-between py-1.5"><span className="text-ink/80">{m("s1")}</span><span className="tabular-nums">650,00</span></li>
        <li className="flex justify-between py-1.5"><span className="text-ink/80">{m("s2")}</span><span className="tabular-nums">350,00</span></li>
        <li className="flex justify-between py-1.5 font-semibold"><span>{m("total")}</span><span className="tabular-nums">1 000,00 Kč</span></li>
      </ul>
      <span className="mt-3 flex items-center justify-center gap-1.5 rounded-[8px] bg-brand-700 py-2 text-[13px] font-medium text-white">
        <Printer className="size-3.5" aria-hidden />
        {m("pay")}
      </span>
    </Win>
  );
}

export async function KasaInstallGuide({ compact = false }: { compact?: boolean } = {}) {
  const t = await getTranslations("kasa.guide");
  const m = (k: string) => t(`m.${k}` as never);
  const steps = [1, 2, 3, 4, 5];
  return (
    <section id="huong-dan" className={`scroll-mt-32 bg-white ${compact ? "py-12" : "x-section"}`} aria-labelledby="kasa-guide-title">
      <div className="x-wrap">
        <SectionHead id="kasa-guide-title" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} className="max-w-[46rem]" />
        <p className="mt-3 text-[14px] text-muted">{t("note")}</p>
        <ol className="mt-10 grid gap-5 lg:mt-14">
          {steps.map((n) => (
            <li key={n} className="grid gap-5 rounded-[24px] bg-porcelain p-5 ring-1 ring-black/[0.05] sm:p-8 md:grid-cols-2 md:items-center md:gap-10">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-700">
                  {t("step")} <span className="tabular-nums">{n}</span> / 5
                </p>
                <h3 className="mt-2 text-[1.45rem] font-medium leading-tight tracking-[-0.02em] text-ink [font-family:var(--font-serif)] sm:text-[1.7rem]">{t(`s${n}t`)}</h3>
                <p className="mt-3 text-[1.0313rem] leading-relaxed text-ink/75">{t(`s${n}d`)}</p>
                {n === 1 && (
                  <Link href="/kasa/download" className="x-link mt-4">
                    {t("dlCta")}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                )}
              </div>
              <div aria-hidden className="mx-auto w-full max-w-[400px]">
                <Art step={n} m={m} />
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-col gap-5 rounded-[24px] bg-plum p-6 text-white sm:p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[1.25rem] font-semibold tracking-[-0.015em]">{t("help")}</p>
            <p className="mt-1.5 max-w-[36rem] text-[1.0313rem] leading-relaxed text-white/70">{t("helpD")}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="x-btn-onDark tabular-nums">
              <Phone className="size-4" aria-hidden />
              {CONTACT_PHONE}
            </a>
            <Link href="/lien-he" className="x-btn-ghostDark">{t("helpCta")}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
