import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoNav, DemoPhone } from "../templates/DemoUI";
import { PillNav } from "../templates/PillNav";
import { UI } from "../templates/common";
import { site, type SiteProps } from "../sites/shared";
import type { ServiceGroup } from "../templates/types";
import { KIT_FONTS } from "./fonts";
import { KitTabs } from "./KitTabs";
import { KIT_SPECS } from "./specs";
import type { KitLayout, KitTheme } from "./types";

// Bộ dựng website mẫu từ khối. Mỗi mẫu (specs.ts) chọn theme + kiểu từng khối, nên bố cục giữa các mẫu khác nhau thật.
// Màu đi qua biến CSS (--bg, --ink, --accent…); chữ trên nền màu dùng cặp onAccent / onDark đã chọn đủ tương phản.

function cls(th: KitTheme) {
  const r = { none: "", sm: "rounded-md", lg: "rounded-2xl", xl: "rounded-[32px]", arch: "rounded-t-[999px]" }[th.radius];
  const rc = { none: "", sm: "rounded-md", lg: "rounded-2xl", xl: "rounded-[28px]", arch: "rounded-[24px]" }[th.radius];
  const rb = { pill: "rounded-full", square: "", soft: "rounded-xl" }[th.btn];
  const weight = th.weight === "light" ? "font-light" : th.weight === "bold" ? "font-bold" : "font-normal";
  const D = `${KIT_FONTS[th.display]} ${weight} ${th.caps ? "uppercase tracking-[0.06em]" : "tracking-[-0.025em]"}`;
  const base = `inline-flex min-h-12 items-center justify-center gap-2 px-7 text-[15px] font-semibold transition-[filter,background-color,color] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] ${rb} ${th.caps ? "uppercase tracking-[0.12em] text-[13px]" : ""}`;
  return {
    r,
    rc,
    rb,
    D,
    h1: th.caps ? "text-[2.25rem] leading-[1.08] sm:text-5xl lg:text-[4rem]" : "text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[5rem]",
    h2: th.caps ? "text-[1.75rem] leading-tight sm:text-4xl" : "text-[2.25rem] leading-[1.05] sm:text-5xl",
    btnA: `${base} bg-[var(--accent)] text-[var(--onAccent)] hover:brightness-95`,
    btnD: `${base} bg-[var(--dark)] text-[var(--onDark)] hover:brightness-110`,
    btnI: `${base} bg-[var(--onAccent)] text-[var(--accent)] hover:opacity-90`,
    btnL: `${base} bg-white/95 text-[#151515] hover:bg-white`,
    btnO: `${base} border border-current hover:bg-[var(--ink)] hover:text-[var(--bg)]`,
    btnOL: `${base} border border-white/70 text-white hover:bg-white hover:text-[#151515]`,
    muted: "text-[var(--muted)]",
    label: "text-[12px] font-semibold uppercase tracking-[0.2em]",
  };
}

/** Nhấn hai từ cuối: in nghiêng (theme.italic) hoặc màu nhấn */
function Em({ text, th, onDark = false }: { text: string; th: KitTheme; onDark?: boolean }) {
  const w = text.split(" ");
  if (w.length < 4) return <>{text}</>;
  const tail = w.slice(-2).join(" ");
  return (
    <>
      {w.slice(0, -2).join(" ")}{" "}
      <span className={th.italic ? "italic" : onDark ? "" : "text-[var(--accent-ink)]"}>{tail}</span>
    </>
  );
}

export function KitSite(props: SiteProps) {
  const { t, page } = props;
  const spec = KIT_SPECS[t.slug];
  const th = spec.theme;
  const L: KitLayout = spec.layout;
  const k = cls(th);
  const s = site(props);
  const { l } = s;
  const vars = { ...Object.fromEntries(Object.entries(th.c).map(([n, v]) => [`--${n}`, v])), "--accent-ink": spec.accentInk ?? th.c.accent } as CSSProperties;
  const pillPad = L.nav === "pill" ? "pt-24 sm:pt-28" : "";
  const imgs = t.gallery.items;
  // tên cỡ khổng lồ luôn vừa một dòng: co theo số ký tự, tối đa `max` rem
  const giant = (max: number): CSSProperties => ({ fontSize: `min(${max}rem, calc((100vw - 2rem) / ${(t.name.length * (th.caps ? 0.62 : 0.52)).toFixed(2)}))` });
  const img = (i: number, extra = "", pr = false) => s.art(imgs[i % imgs.length], extra, pr);

  /* ---------- đầu trang ---------- */
  const ctas = (light: boolean, center = false) => (
    <div className={`mt-8 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
      <Link href={s.href("dat-lich")} className={light ? k.btnL : k.btnA}>
        {l(t.bookLabel)}
        <ArrowUpRight className="size-4" aria-hidden />
      </Link>
      <Link href={s.href("dich-vu")} className={light ? k.btnOL : k.btnO}>
        {l(t.nav["dich-vu"])}
      </Link>
    </div>
  );
  const H1 = ({ dark = false, center = false, size }: { dark?: boolean; center?: boolean; size?: string }) => (
    <h1 className={`${k.D} ${size ?? k.h1} ${center ? "mx-auto max-w-4xl" : "max-w-3xl"}`}>
      <Em text={l(t.home.title)} th={th} onDark={dark} />
    </h1>
  );
  const Kicker = ({ light = false }: { light?: boolean }) => <p className={`${k.label} ${light ? "text-white/85" : "text-[var(--accent-ink)]"}`}>{l(t.home.kicker)}</p>;

  function Hero() {
    const hero = s.art(t.home.hero, "", true);
    switch (L.hero) {
      case "full":
      case "card":
      case "quote":
        return (
          <section className="relative isolate flex min-h-[86vh] overflow-hidden bg-[var(--dark)] sm:min-h-[720px]">
            <div className="absolute inset-0 -z-10">{hero}</div>
            {L.hero === "card" ? (
              <div className="mx-auto flex w-full max-w-[1240px] items-end px-4 pb-6 pt-28 sm:px-8 sm:pb-10">
                <div className={`w-full max-w-xl bg-[var(--surface)] p-6 text-[var(--ink)] shadow-[0_20px_50px_rgba(0,0,0,0.2)] sm:p-10 ${k.rc}`}>
                  <Kicker />
                  <div className="mt-4">
                    <H1 size={th.caps ? "text-[2rem] leading-tight sm:text-5xl" : "text-[2.5rem] leading-[1.03] sm:text-6xl"} />
                  </div>
                  <p className={`mt-4 text-[17px] ${k.muted}`}>{l(t.home.lead)}</p>
                  {ctas(false)}
                </div>
              </div>
            ) : L.hero === "quote" ? (
              <>
                <div className="absolute inset-0 -z-10 bg-black/45" aria-hidden />
                <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-5 pt-24 text-center text-white">
                  <Kicker light />
                  <h1 className={`${k.D} mt-5 text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-[4.5rem]`}>“{l(t.home.title)}”</h1>
                  <p className="mt-5 max-w-xl text-lg text-white/90">{l(t.home.lead)}</p>
                  {ctas(true, true)}
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/25 to-black/10" aria-hidden />
                <div className="mx-auto flex w-full max-w-[1240px] flex-col justify-end px-5 pb-12 pt-28 text-white sm:px-8 sm:pb-16">
                  <Kicker light />
                  <div className="mt-4">
                    <H1 dark />
                  </div>
                  <p className="mt-5 max-w-lg text-lg text-white/90">{l(t.home.lead)}</p>
                  {ctas(true)}
                </div>
              </>
            )}
          </section>
        );
      case "split":
        return (
          <section className={`grid lg:min-h-[680px] lg:grid-cols-2 ${pillPad ? "lg:pt-0" : ""}`}>
            <div className={`flex flex-col justify-center bg-[var(--tint)] px-5 py-14 sm:px-10 lg:px-16 ${L.flip ? "lg:order-2" : ""} ${pillPad}`}>
              <Kicker />
              <div className="mt-5">
                <H1 size={th.caps ? undefined : "text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem]"} />
              </div>
              <p className={`mt-5 max-w-md text-lg ${k.muted}`}>{l(t.home.lead)}</p>
              {ctas(false)}
            </div>
            <div className="aspect-[4/5] max-h-[80vh] w-full overflow-hidden bg-[var(--line)] sm:aspect-[16/11] lg:aspect-auto lg:max-h-none">{hero}</div>
          </section>
        );
      case "center":
        return (
          <section className={`px-5 pb-4 pt-14 text-center sm:pt-20 ${pillPad}`}>
            <Kicker />
            <div className="mt-5">
              <H1 center />
            </div>
            <p className={`mx-auto mt-5 max-w-xl text-lg ${k.muted}`}>{l(t.home.lead)}</p>
            {ctas(false, true)}
            <div className={`mx-auto mt-12 aspect-[4/3] max-w-[1160px] overflow-hidden bg-[var(--line)] sm:aspect-[21/9] ${th.radius === "arch" ? "rounded-t-[300px]" : k.r}`}>{hero}</div>
          </section>
        );
      case "giant":
        return (
          <section className={`overflow-hidden px-4 pt-8 sm:px-8 ${pillPad}`}>
            <p className={`${k.D} select-none whitespace-nowrap text-center leading-[0.85]`} style={giant(13.5)} aria-hidden>
              {t.name}
            </p>
            <div className="mx-auto mt-8 grid max-w-[1240px] gap-6 pb-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5">
                <Kicker />
                <h1 className={`${k.D} mt-4 text-[2rem] leading-tight sm:text-4xl`}>
                  <Em text={l(t.home.title)} th={th} />
                </h1>
                <p className={`mt-4 text-lg ${k.muted}`}>{l(t.home.lead)}</p>
                {ctas(false)}
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
                <div className={`aspect-[3/4] overflow-hidden bg-[var(--line)] ${k.r}`}>{hero}</div>
                <div className={`mt-10 aspect-[3/4] overflow-hidden bg-[var(--line)] ${k.r}`}>{img(0)}</div>
              </div>
            </div>
          </section>
        );
      case "collage":
        return (
          <section className={`mx-auto grid max-w-[1240px] items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:py-16 ${pillPad}`}>
            <div className="lg:col-span-5">
              <Kicker />
              <div className="mt-5">
                <H1 size={th.caps ? undefined : "text-[2.75rem] leading-[1.02] sm:text-6xl"} />
              </div>
              <p className={`mt-5 max-w-md text-lg ${k.muted}`}>{l(t.home.lead)}</p>
              {ctas(false)}
            </div>
            <div className="grid grid-cols-5 grid-rows-2 gap-3 sm:gap-4 lg:col-span-7">
              <div className={`col-span-3 row-span-2 aspect-[3/4] overflow-hidden bg-[var(--line)] ${k.r}`}>{hero}</div>
              <div className={`col-span-2 overflow-hidden bg-[var(--line)] ${k.rc}`}>{img(0)}</div>
              <div className={`col-span-2 overflow-hidden bg-[var(--line)] ${k.rc}`}>{img(1)}</div>
            </div>
          </section>
        );
      case "minimal":
      default:
        return (
          <section className="bg-[var(--dark)] text-[var(--onDark)]">
            <div className={`mx-auto grid max-w-[1240px] items-end gap-10 px-5 pb-12 pt-16 sm:px-8 md:grid-cols-12 lg:pb-20 lg:pt-24 ${pillPad}`}>
              <div className="md:col-span-7">
                <Kicker light />
                <div className="mt-5">
                  <H1 dark />
                </div>
                <p className="mt-5 max-w-md text-lg opacity-85">{l(t.home.lead)}</p>
                {ctas(true)}
              </div>
              <div className={`aspect-[3/4] overflow-hidden bg-black/20 md:col-span-4 md:col-start-9 ${k.r}`}>{hero}</div>
            </div>
          </section>
        );
    }
  }

  /* ---------- bảng giá ---------- */
  function Services({ groups, compact = false }: { groups: ServiceGroup[]; compact?: boolean }) {
    const price = (n: number, from?: boolean) => s.price(n, from);
    const row = (it: ServiceGroup["items"][number], i: number) => (
      <li key={i} className="flex items-baseline gap-3 border-b border-[var(--line)] py-4 last:border-0">
        <span className="min-w-0 flex-1">
          <span className={`block text-[17px] font-medium`}>{l(it.name)}</span>
          <span className={`text-sm ${k.muted}`}>
            {it.desc ? `${l(it.desc)} · ` : ""}
            {s.dur(it.min)}
          </span>
        </span>
        <span className="whitespace-nowrap text-[16px] font-semibold tabular-nums">{price(it.price, it.from)}</span>
      </li>
    );
    switch (L.services) {
      case "cards": {
        let n = 0;
        return (
          <div className="space-y-10">
            {groups.map((g, gi) => (
              <div key={gi}>
                <h3 className={`${k.D} text-2xl`}>{l(g.name)}</h3>
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                  {g.items.map((it, i) => {
                    const im = n++;
                    return (
                      <li key={i}>
                        <div className={`aspect-[4/5] overflow-hidden bg-[var(--line)] ${k.rc}`}>{img(im + 1)}</div>
                        <p className="mt-3 font-medium leading-snug">{l(it.name)}</p>
                        <p className={`text-sm ${k.muted}`}>
                          {s.dur(it.min)} · <span className="font-semibold text-[var(--ink)]">{price(it.price, it.from)}</span>
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        );
      }
      case "accordion":
        return (
          <div className={`divide-y divide-[var(--line)] border-y border-[var(--line)]`}>
            {groups.map((g, gi) => (
              <details key={gi} open={gi === 0} className="group">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                  <span className={`${k.D} text-2xl sm:text-3xl`}>{l(g.name)}</span>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-xl transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden>
                    +
                  </span>
                </summary>
                <ul className="pb-4">{g.items.map(row)}</ul>
              </details>
            ))}
          </div>
        );
      case "tabs":
        return (
          <KitTabs
            tabs={groups.map((g) => ({ label: l(g.name), panel: <ul className={`bg-[var(--surface)] px-5 py-1 sm:px-8 ${k.rc}`}>{g.items.map(row)}</ul> }))}
            c={{
              list: "flex flex-wrap gap-2",
              tab: `min-h-11 border border-[var(--line)] px-5 text-[15px] font-medium hover:border-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ink)] ${k.rb}`,
              tabOn: "!border-[var(--accent)] !bg-[var(--accent)] text-[var(--onAccent)]",
            }}
          />
        );
      case "numbered": {
        let n = 0;
        return (
          <div className="space-y-12">
            {groups.map((g, gi) => (
              <div key={gi}>
                <h3 className={`${k.label} text-[var(--accent-ink)]`}>{l(g.name)}</h3>
                <ul className="mt-2">
                  {g.items.map((it, i) => (
                    <li key={i} className="grid grid-cols-[48px_1fr_auto] items-baseline gap-x-4 border-b border-[var(--line)] py-5 sm:grid-cols-[72px_1fr_auto]">
                      <span className={`${k.D} text-2xl text-[var(--accent-ink)] sm:text-3xl`}>{String(++n).padStart(2, "0")}</span>
                      <span>
                        <span className={`${k.D} block text-xl sm:text-2xl`}>{l(it.name)}</span>
                        <span className={`text-sm ${k.muted}`}>
                          {it.desc ? `${l(it.desc)} · ` : ""}
                          {s.dur(it.min)}
                        </span>
                      </span>
                      <span className="whitespace-nowrap text-lg font-semibold">{price(it.price, it.from)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      }
      case "list":
      default:
        return (
          <div className={`grid gap-x-14 gap-y-10 ${compact ? "md:grid-cols-2" : "md:grid-cols-2"}`}>
            {groups.map((g, gi) => (
              <div key={gi}>
                <h3 className={`${k.D} text-2xl`}>{l(g.name)}</h3>
                <ul className="mt-2">{g.items.map(row)}</ul>
              </div>
            ))}
          </div>
        );
    }
  }

  /* ---------- bộ sưu tập ---------- */
  const tile = `bg-[var(--line)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] ${k.rc}`;
  function Gallery({ count }: { count?: number }) {
    const g = { ...s.gallery, items: count ? s.gallery.items.slice(0, count) : s.gallery.items };
    const map = {
      masonry: { grid: "columns-2 gap-3 sm:gap-5 md:columns-3 [&>li]:mb-6 [&>li]:break-inside-avoid", shapes: ["aspect-[3/4] pb-7", "aspect-square pb-7", "aspect-[4/5] pb-7"] },
      grid: { grid: "grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3", shapes: ["aspect-square pb-7"] },
      strip: { grid: "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8", shapes: ["aspect-[3/4] w-[72%] shrink-0 snap-start pb-7 sm:w-[40%] lg:w-[28%]"] },
      mosaic: {
        grid: "grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4",
        shapes: ["col-span-2 aspect-square pb-7 lg:row-span-2 lg:aspect-auto", "aspect-square pb-7", "aspect-square pb-7", "aspect-square pb-7", "aspect-square pb-7", "col-span-2 aspect-[2/1] pb-7 lg:col-span-4 lg:aspect-[3/1]"],
      },
    }[L.gallery];
    return <DemoLightbox motif={t.motif} {...g} gridClass={`${map.grid} [&_p]:text-sm`} tileClass={tile} shapes={map.shapes} />;
  }

  /* ---------- đội ngũ ---------- */
  function Team() {
    const team = t.about.team;
    if (L.team === "circles")
      return (
        <ul className="grid gap-10 sm:grid-cols-3">
          {team.map((m) => (
            <li key={m.name} className="text-center">
              <div className="mx-auto size-44 overflow-hidden rounded-full bg-[var(--line)] sm:size-52">{s.art(m.visual)}</div>
              <h3 className={`${k.D} mt-5 text-2xl`}>{m.name}</h3>
              <p className={`${k.label} mt-1 text-[var(--accent-ink)]`}>{l(m.role)}</p>
              <p className={`mt-2 ${k.muted}`}>{l(m.bio)}</p>
            </li>
          ))}
        </ul>
      );
    if (L.team === "rows")
      return (
        <div className="space-y-14">
          {team.map((m, i) => (
            <article key={m.name} className="grid items-center gap-6 md:grid-cols-2 md:gap-14">
              <div className={`aspect-[4/3] overflow-hidden bg-[var(--line)] ${k.r} ${i % 2 ? "md:order-2" : ""}`}>{s.art(m.visual)}</div>
              <div>
                <p className={`${k.label} text-[var(--accent-ink)]`}>{l(m.role)}</p>
                <h3 className={`${k.D} mt-2 text-4xl`}>{m.name}</h3>
                <p className={`mt-3 text-lg ${k.muted}`}>{l(m.bio)}</p>
              </div>
            </article>
          ))}
        </div>
      );
    return (
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m) => (
          <li key={m.name}>
            <div className={`aspect-[3/4] overflow-hidden bg-[var(--line)] ${k.r}`}>{s.art(m.visual)}</div>
            <h3 className={`${k.D} mt-4 text-2xl`}>{m.name}</h3>
            <p className={`text-sm font-medium text-[var(--accent-ink)]`}>{l(m.role)}</p>
            <p className={`mt-1 ${k.muted}`}>{l(m.bio)}</p>
          </li>
        ))}
      </ul>
    );
  }

  /* ---------- khối trang chủ ---------- */
  const wrap = "mx-auto max-w-[1240px] px-5 sm:px-8";
  const SectionTitle = ({ children, link }: { children: React.ReactNode; link?: { href: string; label: string } }) => (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <h2 className={`${k.D} ${k.h2}`}>{children}</h2>
      {link && (
        <Link href={link.href} className="inline-flex min-h-11 items-center gap-2 border-b border-current text-[15px] font-medium hover:text-[var(--accent-ink)]">
          {link.label}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  );

  const Visit = () => (
    <div className={`grid overflow-hidden bg-[var(--surface)] md:grid-cols-2 ${k.rc}`}>
      <div className="relative min-h-[260px] bg-[var(--line)]">
        <div className="absolute inset-0">{img(4)}</div>
      </div>
      <div className="space-y-4 p-7 text-[16px] sm:p-10">
        <h2 className={`${k.D} text-3xl`}>{l(UI.contact)}</h2>
        <p className="flex gap-3">
          <MapPin className="mt-1 size-4 shrink-0 text-[var(--accent-ink)]" aria-hidden />
          {t.contact.address}
        </p>
        {t.contact.hours.map((h, i) => (
          <p key={i} className="flex gap-3">
            <Clock className="mt-1 size-4 shrink-0 text-[var(--accent-ink)]" aria-hidden />
            {l(h.days)} · {h.time}
          </p>
        ))}
        <p className="flex gap-3">
          <Phone className="mt-1 size-4 shrink-0 text-[var(--accent-ink)]" aria-hidden />
          <DemoPhone phone={t.contact.phone} note={l(UI.form.callDemo)} className="!gap-0 [&>svg]:hidden" />
        </p>
        <Link href={s.href("dat-lich")} className={`${k.btnA} mt-2`}>
          {l(t.bookLabel)}
        </Link>
      </div>
    </div>
  );

  const block = (b: KitLayout["home"][number], i: number) => {
    switch (b) {
      case "intro":
        return (
          <section key={i} className={`${wrap} py-16 lg:py-24`}>
            <div className="grid gap-10 lg:grid-cols-12">
              <p className={`${k.D} text-[1.875rem] leading-snug sm:text-[2.5rem] lg:col-span-7`}>{l(t.home.intro.text)}</p>
              <ol className="lg:col-span-4 lg:col-start-9">
                {t.home.highlights.map((h, j) => (
                  <li key={j} className="grid grid-cols-[44px_1fr] border-t border-[var(--line)] py-5">
                    <span className={`${k.D} text-xl text-[var(--accent-ink)]`}>0{j + 1}</span>
                    <span>
                      <span className="block font-semibold">{l(h.title)}</span>
                      <span className={k.muted}>{l(h.text)}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        );
      case "services":
        return (
          <section key={i} className="bg-[var(--tint)] py-16 lg:py-24">
            <div className={wrap}>
              <SectionTitle link={{ href: s.href("dich-vu"), label: l(UI.allServices) }}>{l(t.services.title)}</SectionTitle>
              <Services groups={t.services.groups.slice(0, L.services === "cards" ? 1 : 2).map((g) => ({ ...g, items: g.items.slice(0, L.services === "cards" ? 4 : 3) }))} compact />
            </div>
          </section>
        );
      case "gallery":
        return (
          <section key={i} className={`${wrap} py-16 lg:py-24`}>
            <SectionTitle link={{ href: s.href("bo-suu-tap"), label: l(UI.viewGallery) }}>{l(t.gallery.title)}</SectionTitle>
            <Gallery count={6} />
          </section>
        );
      case "team":
        return (
          <section key={i} className={`${wrap} py-16 lg:py-24`}>
            <SectionTitle link={{ href: s.href("gioi-thieu"), label: l(t.nav["gioi-thieu"]) }}>{l(t.about.title)}</SectionTitle>
            <Team />
          </section>
        );
      case "steps":
        return (
          <section key={i} className="bg-[var(--dark)] py-16 text-[var(--onDark)] lg:py-20">
            <div className={wrap}>
              <h2 className={`${k.D} ${k.h2}`}>{l(t.home.intro.title)}</h2>
              <ol className="mt-10 grid gap-4 sm:grid-cols-3">
                {t.home.highlights.map((h, j) => (
                  <li key={j} className={`border border-white/15 p-6 ${k.rc}`}>
                    <span className={`${k.D} text-4xl opacity-70`}>{j + 1}</span>
                    <h3 className="mt-4 text-lg font-semibold">{l(h.title)}</h3>
                    <p className="mt-1 opacity-80">{l(h.text)}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        );
      case "quote":
        return (
          <section key={i} className="relative isolate overflow-hidden bg-[var(--dark)] py-20 text-center text-[var(--onDark)] lg:py-28">
            <div className="absolute inset-0 -z-10 opacity-35">{img(2)}</div>
            <div className="mx-auto max-w-3xl px-5">
              <p className={`${k.D} text-[1.875rem] leading-snug sm:text-[2.75rem] ${th.italic ? "italic" : ""}`}>“{l(t.home.intro.title)}”</p>
              <p className="mx-auto mt-5 max-w-xl opacity-85">{l(t.about.story[0])}</p>
            </div>
          </section>
        );
      case "visit":
        return (
          <section key={i} className={`${wrap} py-16`}>
            <Visit />
          </section>
        );
      case "cta":
      default:
        return (
          <section key={i} className={`${wrap} pb-16`}>
            <div className={`flex flex-col items-start gap-6 bg-[var(--accent)] px-7 py-12 text-[var(--onAccent)] sm:flex-row sm:items-center sm:justify-between sm:px-12 ${k.rc}`}>
              <div>
                <h2 className={`${k.D} text-3xl sm:text-5xl`}>{l(t.home.closing.title)}</h2>
                <p className="mt-2 text-lg opacity-90">{l(t.home.closing.text)}</p>
              </div>
              <Link href={s.href("dat-lich")} className={k.btnI}>
                {l(t.bookLabel)}
              </Link>
            </div>
          </section>
        );
    }
  };

  /* ---------- đầu trang con ---------- */
  const Head = ({ title, lead }: { title: string; lead: string }) => {
    if (L.head === "image")
      return (
        <section className="relative isolate overflow-hidden bg-[var(--dark)] text-white">
          <div className="absolute inset-0 -z-10">{img(3)}</div>
          <div className="absolute inset-0 -z-10 bg-black/50" aria-hidden />
          <div className={`${wrap} pb-14 pt-28 sm:pb-20 sm:pt-36`}>
            <p className={`${k.label} text-white/80`}>{t.name}</p>
            <h1 className={`${k.D} mt-3 ${k.h1}`}>{title}</h1>
            <p className="mt-4 max-w-xl text-lg text-white/90">{lead}</p>
          </div>
        </section>
      );
    if (L.head === "band")
      return (
        <section className="bg-[var(--dark)] text-[var(--onDark)]">
          <div className={`${wrap} pb-14 pt-14 sm:pb-20 sm:pt-20 ${pillPad}`}>
            <p className={`${k.label} opacity-75`}>{t.name}</p>
            <h1 className={`${k.D} mt-3 ${k.h1}`}>{title}</h1>
            <p className="mt-4 max-w-xl text-lg opacity-85">{lead}</p>
          </div>
        </section>
      );
    return (
      <section className={`${wrap} pb-10 pt-14 sm:pt-20 ${pillPad}`}>
        <p className={`${k.label} text-[var(--accent-ink)]`}>{t.name}</p>
        <h1 className={`${k.D} mt-3 ${k.h1}`}>{title}</h1>
        <p className={`mt-4 max-w-xl text-lg ${k.muted}`}>{lead}</p>
        <div className="mt-10 h-px bg-[var(--line)]" />
      </section>
    );
  };

  let body: React.ReactNode;
  if (page === "") {
    body = (
      <>
        <Hero />
        {L.home.map(block)}
      </>
    );
  } else if (page === "dich-vu") {
    body = (
      <>
        <Head title={l(t.services.title)} lead={l(t.services.lead)} />
        <section className={`${wrap} py-12 lg:py-16`}>
          <Services groups={t.services.groups} />
          <p className={`mt-8 text-sm ${k.muted}`}>{l(t.services.note)}</p>
        </section>
        {block("cta", 99)}
      </>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <Head title={l(t.about.title)} lead={l(t.about.lead)} />
        <section className={`${wrap} py-12`}>
          <p className={`${k.D} max-w-3xl text-[1.75rem] leading-snug sm:text-4xl`}>{l(t.about.story[0])}</p>
        </section>
        <section className={`${wrap} pb-16`}>
          <Team />
        </section>
        <section className="bg-[var(--tint)]">
          <ul className={`${wrap} grid gap-8 py-14 sm:grid-cols-3`}>
            {t.about.values.slice(0, 3).map((v, i) => (
              <li key={i} className="border-t border-[var(--ink)]/20 pt-5">
                <h3 className={`${k.D} text-2xl`}>{l(v.title)}</h3>
                <p className={`mt-1 ${k.muted}`}>{l(v.text)}</p>
              </li>
            ))}
          </ul>
        </section>
        {block("cta", 99)}
      </>
    );
  } else if (page === "bo-suu-tap") {
    body = (
      <>
        <Head title={l(t.gallery.title)} lead={l(t.gallery.lead)} />
        <section className={`${wrap} py-12`}>
          <Gallery />
        </section>
        {block("cta", 99)}
      </>
    );
  } else {
    body = (
      <>
        <Head title={l(t.contact.title)} lead={l(t.contact.lead)} />
        <section className={`${wrap} grid gap-8 py-12 lg:grid-cols-12`}>
          <div className={`bg-[var(--surface)] p-6 sm:p-9 lg:col-span-7 ${k.rc}`}>
            <DemoBookingForm
              {...s.form}
              staff={t.about.team.map((m) => m.name)}
              c={{
                field: `mt-2 block min-h-12 w-full border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-[16px] outline-none focus:border-[var(--ink)] ${th.btn === "square" ? "" : "rounded-xl"}`,
                label: "text-sm font-semibold",
                chip: `min-h-11 border border-[var(--line)] bg-[var(--bg)] px-4 text-sm font-medium hover:border-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ink)] ${k.rb}`,
                chipOn: "!border-[var(--accent)] !bg-[var(--accent)] text-[var(--onAccent)]",
                submit: k.btnA,
                notice: `bg-[var(--tint)] p-6 ${k.rc}`,
              }}
            />
          </div>
          <div className="lg:col-span-5">
            <Visit />
          </div>
        </section>
      </>
    );
  }

  /* ---------- khung ---------- */
  const brand = (
    <Link href={s.href("")} className={`${k.D} flex min-h-11 items-center text-[1.5rem] sm:text-[1.75rem] ${th.caps ? "!text-[1.125rem] sm:!text-[1.25rem] !tracking-[0.3em]" : ""}`}>
      {t.name}
    </Link>
  );
  const navLink = `inline-flex min-h-11 items-center px-3 text-[14px] font-medium ${th.caps ? "uppercase tracking-[0.16em] text-[12px]" : ""} focus-visible:outline focus-visible:outline-2 focus-visible:outline-current ${k.rb}`;

  return (
    <div style={vars} className={`bg-[var(--bg)] text-[var(--ink)] ${KIT_FONTS[th.body]}`}>
      {L.nav === "pill" ? (
        <PillNav
          brand={t.name}
          brandClass={`${k.D} text-xl`}
          items={s.nav}
          cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
          menuLabel={l(UI.menu)}
          closeLabel={l(UI.close)}
          c={{
            bar: "bg-[var(--surface)] text-[var(--ink)] shadow-[0_6px_24px_rgba(0,0,0,0.12)] backdrop-blur",
            link: `${navLink} inline-flex min-h-11 items-center hover:bg-[var(--tint)]`,
            active: "!bg-[var(--ink)] !text-[var(--bg)]",
            cta: `${k.btnA} !min-h-11 !px-5 !text-[13px]`,
            panel: "bg-[var(--surface)] text-[var(--ink)]",
          }}
        />
      ) : (
        <DemoNav
          brand={brand}
          items={s.nav}
          cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
          menuLabel={l(UI.menu)}
          closeLabel={l(UI.close)}
          c={{
            header: L.nav === "dark" ? "bg-[var(--dark)] text-[var(--onDark)] border-b border-white/10" : "bg-[var(--bg)]/95 backdrop-blur border-b border-[var(--line)]",
            inner: "h-[70px] max-w-[1240px] px-5 sm:px-8",
            link: `${navLink} opacity-80 hover:opacity-100`,
            active: "!opacity-100 underline underline-offset-8 decoration-[var(--accent)] decoration-2",
            cta: `${L.nav === "dark" && th.c.accent === th.c.dark ? k.btnL : k.btnA} !min-h-11 !px-5 !text-[13px]`,
            burger: `border border-current/30 ${k.rb} focus-visible:outline focus-visible:outline-2 focus-visible:outline-current`,
            panel: L.nav === "dark" ? "bg-[var(--dark)] border-t border-white/10" : "bg-[var(--bg)] border-t border-[var(--line)]",
            panelLink: `${k.D} flex min-h-12 items-center px-5 text-xl`,
          }}
        />
      )}
      <main>{body}</main>
      {L.footer === "big" ? (
        <footer className="overflow-hidden bg-[var(--dark)] text-[var(--onDark)]">
          <div className={`${wrap} grid gap-6 pt-14 text-[15px] opacity-90 sm:grid-cols-3`}>
            <p>{t.contact.address}</p>
            <p>{t.contact.hours.map((h) => `${l(h.days)} · ${h.time}`).join(" / ")}</p>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-4">
              {s.nav.map((n) => (
                <Link key={n.href} href={n.href} className="inline-flex min-h-11 items-center hover:underline">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className={`${k.D} select-none whitespace-nowrap px-4 pt-6 text-center leading-[0.9]`} style={giant(11)} aria-hidden>
            {t.name}
          </p>
          <p className="border-t border-white/10 px-5 py-5 text-center text-[13px] opacity-75">{l(UI.disclaimer)}</p>
        </footer>
      ) : (
        <footer className={L.footer === "dark" ? "bg-[var(--dark)] text-[var(--onDark)]" : "border-t border-[var(--line)] bg-[var(--tint)]"}>
          <div className={`${wrap} grid gap-8 py-12 md:grid-cols-3`}>
            <div>
              <p className={`${k.D} text-3xl`}>{t.name}</p>
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
                <Link key={n.href} href={n.href} className="inline-flex min-h-11 items-center text-[15px] font-medium hover:underline">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className={`border-t px-5 py-5 text-center text-[13px] opacity-75 ${L.footer === "dark" ? "border-white/10" : "border-[var(--line)]"}`}>{l(UI.disclaimer)}</p>
        </footer>
      )}
    </div>
  );
}
