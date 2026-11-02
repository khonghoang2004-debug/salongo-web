import type { CSSProperties } from "react";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoNav, DemoPhone } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { fontAzure, fontCherry, fontLilac, fontMatcha, fontRose, fontSaffron, fontTropicana, site, type SiteProps } from "./shared";

// 7 mẫu nhiều màu dùng chung một bộ khung, mỗi mẫu một bảng màu (biến CSS), font, bo góc và bố cục đầu trang:
// "poster" (khối màu lớn, chữ khổng lồ), "split" (chia đôi màu / ảnh), "centered" (căn giữa, mềm).
// Màu chữ trên nền màu đã chọn để đạt tương phản ≥ 4.5:1 (onPrimary / onAccent / onBand).
type Theme = {
  layout: "poster" | "split" | "centered";
  font: string;
  upper: boolean;
  italic?: boolean;
  /** bo góc ảnh / thẻ / nút */
  r: { media: string; card: string; btn: string };
  c: { bg: string; surface: string; ink: string; muted: string; primary: string; onPrimary: string; accent: string; onAccent: string; band: string; onBand: string; line: string };
};

export const THEMES: Record<string, Theme> = {
  "tropicana-nails": {
    layout: "poster",
    font: fontTropicana.className,
    upper: false,
    r: { media: "rounded-[32px]", card: "rounded-[28px]", btn: "rounded-full" },
    c: { bg: "#FFF6EC", surface: "#FFFFFF", ink: "#1B1B1B", muted: "#4A4A4A", primary: "#FF5A5F", onPrimary: "#1B1B1B", accent: "#FFD23F", onAccent: "#1B1B1B", band: "#00A79D", onBand: "#0B1B1A", line: "#F2D9C4" },
  },
  "lilac-lash": {
    layout: "centered",
    font: fontLilac.className,
    upper: false,
    r: { media: "rounded-[40px]", card: "rounded-[28px]", btn: "rounded-full" },
    c: { bg: "#F6F2FF", surface: "#FFFFFF", ink: "#2A1B4A", muted: "#574C70", primary: "#6D4AFF", onPrimary: "#FFFFFF", accent: "#9FF0D0", onAccent: "#1F2B26", band: "#6D4AFF", onBand: "#FFFFFF", line: "#E2D9FB" },
  },
  "cherry-hair": {
    layout: "poster",
    font: fontCherry.className,
    upper: true,
    r: { media: "rounded-none", card: "rounded-none", btn: "rounded-none" },
    c: { bg: "#FFF3E4", surface: "#FFFFFF", ink: "#2B0F10", muted: "#5A3A35", primary: "#D7263D", onPrimary: "#FFFFFF", accent: "#F2A541", onAccent: "#2B0F10", band: "#D7263D", onBand: "#FFF3E4", line: "#F0D2B8" },
  },
  "matcha-spa": {
    layout: "centered",
    font: fontMatcha.className,
    upper: false,
    italic: true,
    r: { media: "rounded-t-full", card: "rounded-[24px]", btn: "rounded-full" },
    c: { bg: "#F3F5E9", surface: "#FFFFFF", ink: "#23301A", muted: "#4B5641", primary: "#4D7A26", onPrimary: "#FFFFFF", accent: "#D9663C", onAccent: "#1C1A14", band: "#4D7A26", onBand: "#FFFFFF", line: "#DCE3C8" },
  },
  "azure-barber": {
    layout: "split",
    font: fontAzure.className,
    upper: true,
    r: { media: "rounded-none", card: "rounded-md", btn: "rounded-md" },
    c: { bg: "#F2F6FB", surface: "#FFFFFF", ink: "#0B1F33", muted: "#3E5166", primary: "#0F4C81", onPrimary: "#FFFFFF", accent: "#C1121F", onAccent: "#FFFFFF", band: "#0F4C81", onBand: "#FFFFFF", line: "#D3E0EE" },
  },
  "rose-bridal": {
    layout: "centered",
    font: fontRose.className,
    upper: false,
    italic: true,
    r: { media: "rounded-[999px]", card: "rounded-[32px]", btn: "rounded-full" },
    c: { bg: "#FFF0F3", surface: "#FFFFFF", ink: "#3B0D1E", muted: "#6A3A4B", primary: "#C42E63", onPrimary: "#FFFFFF", accent: "#F7C59F", onAccent: "#3B0D1E", band: "#C42E63", onBand: "#FFFFFF", line: "#F6D2DC" },
  },
  "saffron-color": {
    layout: "split",
    font: fontSaffron.className,
    upper: false,
    r: { media: "rounded-[24px]", card: "rounded-[20px]", btn: "rounded-xl" },
    c: { bg: "#FFF8E6", surface: "#FFFFFF", ink: "#1F1033", muted: "#4B3D5E", primary: "#5B2A86", onPrimary: "#FFFFFF", accent: "#F4A300", onAccent: "#1F1033", band: "#F4A300", onBand: "#1F1033", line: "#F1E0B5" },
  },
};

export function ThemedSite(props: SiteProps) {
  const { t, page } = props;
  const th = THEMES[t.slug];
  const s = site(props);
  const { l } = s;
  const vars = Object.fromEntries(Object.entries(th.c).map(([k, v]) => [`--${k}`, v])) as CSSProperties;
  const d = `${th.font} font-semibold tracking-[-0.02em] ${th.upper ? "uppercase" : ""}`;
  const em = th.italic ? "italic font-normal" : "";
  const btn = `inline-flex min-h-12 items-center justify-center gap-2 px-7 text-[15px] font-semibold transition-[filter] hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] ${th.r.btn}`;
  const btnP = `${btn} bg-[var(--primary)] text-[var(--onPrimary)]`;
  const btnA = `${btn} bg-[var(--accent)] text-[var(--onAccent)]`;
  const btnO = `${btn} border-2 border-current`;
  const muted = "text-[var(--muted)]";

  const Head = ({ title, lead }: { title: string; lead: string }) => (
    <section className="bg-[var(--band)] text-[var(--onBand)]">
      <div className={`mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-20 ${th.layout === "centered" ? "text-center" : ""}`}>
        <p className="text-sm font-semibold opacity-85">{t.name}</p>
        <h1 className={`${d} ${em} mt-3 text-[2.75rem] leading-[1.04] sm:text-6xl lg:text-7xl`}>{title}</h1>
        <p className="mt-4 text-[17px] opacity-90">{lead}</p>
      </div>
    </section>
  );

  const Price = ({ it }: { it: (typeof s.featured)[number] }) => (
    <li className={`flex items-center justify-between gap-4 border border-[var(--line)] bg-[var(--surface)] px-5 py-4 ${th.r.card}`}>
      <span className="min-w-0">
        <span className={`${th.font} block text-lg font-semibold leading-snug ${th.italic ? "italic" : ""}`}>{l(it.name)}</span>
        <span className={`block text-sm ${muted}`}>
          {it.desc ? `${l(it.desc)} · ` : ""}
          {s.dur(it.min)}
        </span>
      </span>
      <span className={`shrink-0 whitespace-nowrap bg-[var(--accent)] px-3 py-1 text-[15px] font-bold text-[var(--onAccent)] ${th.r.btn === "rounded-none" ? "" : "rounded-full"}`}>{s.price(it.price, it.from)}</span>
    </li>
  );

  const Hero = () => {
    const title = <h1 className={`${d} ${em} text-[3rem] leading-[1.02] sm:text-7xl lg:text-[5.5rem]`}>{l(t.home.title)}</h1>;
    const ctas = (onColor: boolean) => (
      <div className={`mt-8 flex flex-wrap gap-3 ${th.layout === "centered" ? "justify-center" : ""}`}>
        <Link href={s.href("dat-lich")} className={onColor ? btnA : btnP}>
          {l(t.bookLabel)}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
        <Link href={s.href("dich-vu")} className={btnO}>
          {l(t.nav["dich-vu"])}
        </Link>
      </div>
    );
    if (th.layout === "poster")
      return (
        <section className="bg-[var(--primary)] text-[var(--onPrimary)]">
          <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-7">
              <p className="inline-flex bg-[var(--accent)] px-3 py-1 text-sm font-bold text-[var(--onAccent)]">{l(t.home.kicker)}</p>
              <div className="mt-6">{title}</div>
              <p className="mt-6 max-w-md text-lg font-medium">{l(t.home.lead)}</p>
              {ctas(true)}
            </div>
            <div className="lg:col-span-5">
              <div className={`mx-auto aspect-[4/5] max-w-[440px] rotate-2 overflow-hidden border-4 border-[var(--ink)] bg-[var(--surface)] ${th.r.media}`}>{s.art(t.home.hero, "", true)}</div>
            </div>
          </div>
        </section>
      );
    if (th.layout === "split")
      return (
        <section className="grid lg:min-h-[620px] lg:grid-cols-2">
          <div className="flex flex-col justify-center bg-[var(--primary)] px-5 py-14 text-[var(--onPrimary)] sm:px-10 lg:px-14">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] opacity-85">{l(t.home.kicker)}</p>
            <div className="mt-5">{title}</div>
            <p className="mt-6 max-w-md text-lg opacity-90">{l(t.home.lead)}</p>
            {ctas(true)}
          </div>
          <div className="aspect-[5/4] bg-[var(--accent)] p-5 sm:p-10 lg:aspect-auto">
            <div className={`size-full overflow-hidden ${th.r.media}`}>{s.art(t.home.hero, "", true)}</div>
          </div>
        </section>
      );
    return (
      <section className="px-5 pt-14 text-center sm:pt-20">
        <p className="inline-flex rounded-full bg-[var(--accent)] px-4 py-1.5 text-sm font-semibold text-[var(--onAccent)]">{l(t.home.kicker)}</p>
        <div className="mx-auto mt-6 max-w-4xl text-[var(--primary)]">{title}</div>
        <p className={`mx-auto mt-6 max-w-lg text-lg ${muted}`}>{l(t.home.lead)}</p>
        {ctas(false)}
        <div className={`mx-auto mt-12 aspect-[4/3] max-w-[880px] overflow-hidden bg-[var(--line)] sm:aspect-[16/9] ${th.r.media === "rounded-[999px]" ? "rounded-t-[999px]" : th.r.media}`}>{s.art(t.home.hero, "", true)}</div>
      </section>
    );
  };

  let body: React.ReactNode;
  if (page === "") {
    body = (
      <>
        <Hero />
        <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-20">
          <div className={`grid gap-10 ${th.layout === "centered" ? "text-center" : "lg:grid-cols-12"}`}>
            <div className={th.layout === "centered" ? "mx-auto max-w-2xl" : "lg:col-span-5"}>
              <h2 className={`${d} ${em} text-4xl leading-tight sm:text-5xl`}>{l(t.home.intro.title)}</h2>
              <p className={`mt-4 text-[17px] ${muted}`}>{l(t.home.intro.text)}</p>
            </div>
            <ul className={`grid gap-4 ${th.layout === "centered" ? "sm:grid-cols-3" : "lg:col-span-7 sm:grid-cols-3"}`}>
              {t.home.highlights.map((h, i) => (
                <li key={i} className={`p-6 ${th.r.card} ${i === 1 ? "bg-[var(--accent)] text-[var(--onAccent)]" : "bg-[var(--surface)]"} border border-[var(--line)]`}>
                  <span className={`${th.font} text-3xl font-bold`}>0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold">{l(h.title)}</h3>
                  <p className="mt-1 text-[15px] opacity-80">{l(h.text)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="bg-[var(--band)] text-[var(--onBand)]">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-4">
              <h2 className={`${d} ${em} text-4xl sm:text-5xl`}>{l(t.nav["dich-vu"])}</h2>
              <p className="mt-3 opacity-90">{l(t.services.lead)}</p>
              <Link href={s.href("dich-vu")} className={`${btnO} mt-6`}>
                {l(UI.allServices)}
              </Link>
            </div>
            <ul className="grid gap-3 text-[var(--ink)] lg:col-span-8">
              {s.featured.map((it, i) => (
                <Price key={i} it={it} />
              ))}
            </ul>
          </div>
        </section>
        <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {t.gallery.items.slice(0, 3).map((g, i) => (
              <div key={i} className={`aspect-[3/4] overflow-hidden bg-[var(--line)] ${th.r.media} ${i === 2 ? "hidden sm:block" : ""} ${th.layout === "poster" && i === 1 ? "-rotate-2" : ""}`}>
                {s.art(g)}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href={s.href("bo-suu-tap")} className={btnO}>
              {l(UI.viewGallery)}
            </Link>
          </div>
        </section>
        <Closing />
      </>
    );
  } else if (page === "dich-vu") {
    body = (
      <>
        <Head title={l(t.services.title)} lead={l(t.services.lead)} />
        <section className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8">
          {t.services.groups.map((g, gi) => (
            <div key={gi} className="mb-10">
              <h2 className={`${d} ${em} text-3xl text-[var(--primary)]`}>{l(g.name)}</h2>
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {g.items.map((it, i) => (
                  <Price key={i} it={it} />
                ))}
              </ul>
            </div>
          ))}
          <p className={muted}>{l(t.services.note)}</p>
        </section>
        <Closing />
      </>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <Head title={l(t.about.title)} lead={l(t.about.lead)} />
        <section className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.about.team.map((m, i) => (
              <li key={m.name} className={`overflow-hidden border border-[var(--line)] bg-[var(--surface)] ${th.r.card}`}>
                <div className={`aspect-[4/3] overflow-hidden ${i % 2 ? "bg-[var(--accent)]" : "bg-[var(--line)]"}`}>{s.art(m.visual)}</div>
                <div className="p-5">
                  <h2 className={`${d} ${em} text-2xl`}>{m.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-[var(--primary)]">{l(m.role)}</p>
                  <p className={`mt-2 text-[15px] ${muted}`}>{l(m.bio)}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className={`mt-12 max-w-2xl text-xl ${th.layout === "centered" ? "mx-auto text-center" : ""}`}>{l(t.about.story[0])}</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {t.about.values.map((v, i) => (
              <li key={i} className={`bg-[var(--band)] p-6 text-[var(--onBand)] ${th.r.card}`}>
                <h3 className={`${d} ${em} text-xl`}>{l(v.title)}</h3>
                <p className="mt-1 text-[15px] opacity-90">{l(v.text)}</p>
              </li>
            ))}
          </ul>
        </section>
        <Closing />
      </>
    );
  } else if (page === "bo-suu-tap") {
    body = (
      <>
        <Head title={l(t.gallery.title)} lead={l(t.gallery.lead)} />
        <section className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8">
          <DemoLightbox
            motif={t.motif}
            {...s.gallery}
            gridClass="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3"
            tileClass={`bg-[var(--line)] ${th.r.media === "rounded-[999px]" ? "rounded-[32px]" : th.r.media} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)]`}
            shapes={["aspect-[3/4] pb-8", "aspect-[3/4] pb-8", "aspect-[3/4] pb-8"]}
          />
        </section>
        <Closing />
      </>
    );
  } else {
    body = (
      <>
        <Head title={l(t.contact.title)} lead={l(t.contact.lead)} />
        <section className="mx-auto grid max-w-[1100px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-12">
          <div className={`border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-8 lg:col-span-8 ${th.r.card}`}>
            <DemoBookingForm
              {...s.form}
              staff={t.about.team.map((m) => m.name)}
              c={{
                field: `mt-2 block min-h-12 w-full border-2 border-[var(--line)] bg-white px-4 py-3 text-[16px] outline-none focus:border-[var(--primary)] ${th.r.btn === "rounded-full" ? "rounded-2xl" : th.r.btn}`,
                label: "text-sm font-semibold",
                chip: `min-h-11 border-2 border-[var(--line)] bg-white px-4 text-sm font-semibold transition-colors hover:border-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ink)] ${th.r.btn}`,
                chipOn: "!border-[var(--primary)] !bg-[var(--primary)] text-[var(--onPrimary)]",
                submit: btnP,
                notice: `bg-[var(--accent)] p-6 text-[var(--onAccent)] ${th.r.card}`,
              }}
            />
          </div>
          <aside className={`space-y-4 bg-[var(--band)] p-6 text-[15px] text-[var(--onBand)] lg:col-span-4 ${th.r.card}`}>
            <p className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              {t.contact.address}
            </p>
            {t.contact.hours.map((h, i) => (
              <p key={i} className="flex gap-2">
                <Clock className="mt-0.5 size-4 shrink-0" aria-hidden />
                {l(h.days)} · {h.time}
              </p>
            ))}
            <DemoPhone phone={t.contact.phone} note={l(UI.form.callDemo)} className="font-semibold" />
            <p className="opacity-90">{t.contact.email}</p>
          </aside>
        </section>
      </>
    );
  }

  function Closing() {
    return (
      <section className="px-5 pb-16 sm:px-8">
        <div className={`mx-auto flex max-w-[1200px] flex-col items-start gap-6 bg-[var(--accent)] px-6 py-12 text-[var(--onAccent)] sm:flex-row sm:items-center sm:justify-between sm:px-10 ${th.r.card}`}>
          <h2 className={`${d} ${em} text-3xl sm:text-5xl`}>{l(t.home.closing.title)}</h2>
          <Link href={s.href("dat-lich")} className={btnP}>
            {l(t.bookLabel)}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div style={vars} className="bg-[var(--bg)] text-[var(--ink)]">
      <DemoNav
        brand={
          <Link href={s.href("")} className={`${d} ${em} flex min-h-11 items-center gap-2 text-2xl`}>
            <span aria-hidden className={`size-4 bg-[var(--primary)] ${th.r.btn === "rounded-none" ? "" : "rounded-full"}`} />
            {t.name}
          </Link>
        }
        items={s.nav}
        cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
        menuLabel={l(UI.menu)}
        closeLabel={l(UI.close)}
        c={{
          header: "border-b border-[var(--line)] bg-[var(--bg)]",
          inner: "h-[68px] max-w-[1200px] px-5 sm:px-8",
          link: `px-3 py-2 text-[14px] font-semibold ${th.upper ? "uppercase tracking-[0.08em] text-[13px]" : ""} hover:text-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ink)] ${th.r.btn}`,
          active: "!bg-[var(--primary)] !text-[var(--onPrimary)]",
          cta: `${btnP} !min-h-11 !px-5 !text-[14px]`,
          burger: `border-2 border-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] ${th.r.btn}`,
          panel: "border-t border-[var(--line)] bg-[var(--bg)] px-2",
          panelLink: `${d} ${em} flex min-h-12 items-center px-4 text-xl ${th.r.btn}`,
        }}
      />
      <main>{body}</main>
      <footer className="bg-[var(--ink)] text-[var(--bg)]">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-12 sm:px-8 md:grid-cols-3">
          <div>
            <p className={`${d} ${em} text-4xl`}>{t.name}</p>
            <p className="mt-1 text-sm opacity-80">{l(t.tagline)}</p>
          </div>
          <div className="space-y-1 text-[15px] opacity-90">
            <p>{t.contact.address}</p>
            {t.contact.hours.map((h, i) => (
              <p key={i}>
                {l(h.days)} · {h.time}
              </p>
            ))}
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5">
            {s.nav.map((n) => (
              <Link key={n.href} href={n.href} className="inline-flex min-h-11 items-center text-[15px] font-semibold hover:underline">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="border-t border-white/15 px-5 py-5 text-center text-[13px] opacity-80">{l(UI.disclaimer)}</p>
      </footer>
    </div>
  );
}
