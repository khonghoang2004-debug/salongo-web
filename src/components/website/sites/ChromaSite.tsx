import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoNav, DemoPhone, SwatchPicker } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { fontChroma, fontChromaSans, site, type SiteProps } from "./shared";

// Mẫu 7 — Chroma: nail bar trẻ trung. Trắng ngà / cobalt / vàng bơ / san hô, Unbounded đậm,
// viền đen 2px + bóng đổ lệch (neo-brutalist), có ô chọn màu sơn tương tác.
const disp = fontChroma.className;
const sans = fontChromaSans.className;
const soft = "text-[#3D3D3D]";
const card = "rounded-[22px] border-2 border-[#121212] shadow-[4px_4px_0_#121212]";
const btn = `${disp} inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#121212] bg-[#2340D8] px-6 text-[14px] font-semibold text-white shadow-[3px_3px_0_#121212] transition-transform hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#121212]`;
const btnAlt = `${disp} inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#121212] bg-[#F6D86B] px-6 text-[14px] font-semibold text-[#121212] shadow-[3px_3px_0_#121212] transition-transform hover:-translate-y-0.5 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#121212]`;

const SWATCHES = [
  { hex: "#2340D8", vi: "Cobalt", cs: "Kobalt", en: "Cobalt", de: "Kobalt" },
  { hex: "#F6D86B", vi: "Vàng bơ", cs: "Máslová", en: "Butter", de: "Butter" },
  { hex: "#FF6B4A", vi: "San hô", cs: "Korálová", en: "Coral", de: "Koralle" },
  { hex: "#E9B8C9", vi: "Hồng sữa", cs: "Mléčná růžová", en: "Milky pink", de: "Milchrosa" },
  { hex: "#7C3AED", vi: "Tím nho", cs: "Fialová", en: "Grape", de: "Traube" },
  { hex: "#1F7A5A", vi: "Xanh rêu", cs: "Lahvově zelená", en: "Bottle green", de: "Flaschengrün" },
  { hex: "#B91C1C", vi: "Đỏ cherry", cs: "Třešňová", en: "Cherry", de: "Kirsche" },
  { hex: "#EDE6DA", vi: "Nude sữa", cs: "Nude", en: "Milky nude", de: "Milchnude" },
] as const;

export function ChromaSite(props: SiteProps) {
  const { t, page, locale } = props;
  const s = site(props);
  const { l } = s;
  const loc = (["vi", "cs", "en", "de"].includes(locale) ? locale : "en") as "vi" | "cs" | "en" | "de";

  const Head = ({ title, lead, bg = "bg-[#F6D86B]" }: { title: string; lead: string; bg?: string }) => (
    <section className="mx-auto max-w-[1240px] px-5 pt-8 sm:px-8 sm:pt-12">
      <div className={`${card} ${bg} px-6 py-10 sm:px-10 sm:py-14`}>
        <h1 className={`${disp} text-[2.5rem] font-bold uppercase leading-[1.02] tracking-[-0.03em] sm:text-7xl`}>{title}</h1>
        <p className={`mt-4 text-[17px] font-medium ${soft}`}>{lead}</p>
      </div>
    </section>
  );

  const Sticker = ({ it, tone }: { it: (typeof s.featured)[number]; tone: string }) => (
    <li className={`${card} ${tone} flex flex-col p-5`}>
      <span className={`${disp} text-lg font-semibold leading-snug`}>{l(it.name)}</span>
      {it.desc && <span className={`mt-1 text-sm ${soft}`}>{l(it.desc)}</span>}
      <span className="mt-auto flex items-center justify-between gap-2 pt-6">
        <span className="rounded-full border-2 border-[#121212] bg-white px-3 py-0.5 text-sm font-bold">{s.dur(it.min)}</span>
        <span className={`${disp} text-xl font-bold`}>{s.price(it.price, it.from)}</span>
      </span>
    </li>
  );
  const tones = ["bg-white", "bg-[#E6ECFF]", "bg-[#FFE3DA]", "bg-[#FFF4C7]"];

  let body: React.ReactNode;
  if (page === "") {
    body = (
      <>
        <section className="mx-auto grid max-w-[1240px] gap-8 px-5 pb-14 pt-8 sm:px-8 lg:grid-cols-12 lg:items-center lg:pb-20 lg:pt-12">
          <div className="lg:col-span-7">
            <p className="inline-flex rounded-full border-2 border-[#121212] bg-white px-4 py-1.5 text-sm font-bold">{l(t.home.kicker)}</p>
            <h1 className={`${disp} mt-6 text-[2.875rem] font-bold uppercase leading-[1.02] tracking-[-0.035em] sm:text-7xl lg:text-[5.25rem]`}>
              {l(t.home.title)
                .split(" ")
                .map((w, i) => (
                  <span key={i} className={i === 1 ? "mx-1 inline-block -rotate-2 rounded-xl bg-[#F6D86B] px-2" : i === 3 ? "inline-block text-[#2340D8]" : ""}>
                    {w}{" "}
                  </span>
                ))}
            </h1>
            <p className={`mt-6 text-lg font-medium ${soft}`}>{l(t.home.lead)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={s.href("dat-lich")} className={btn}>
                {l(t.bookLabel)}
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
              <Link href={s.href("dich-vu")} className={btnAlt}>
                {l(t.nav["dich-vu"])}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <SwatchPicker
              swatches={SWATCHES.map((w) => ({ hex: w.hex, name: w[loc] }))}
              label={l(t.home.intro.title)}
              c={{
                frame: `${card} bg-white p-5 sm:p-6`,
                swatch: "size-11 rounded-full border-2 border-[#121212] transition-transform hover:scale-105 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121212]",
                swatchOn: "ring-4 ring-[#121212] ring-offset-2",
                name: `${disp} mt-2 text-center text-lg font-semibold`,
              }}
            />
            <p className={`mt-3 text-center text-sm font-medium ${soft}`}>{l(t.home.intro.text)}</p>
          </div>
        </section>

        <section className="border-y-2 border-[#121212] bg-[#2340D8] text-white">
          <ul className="mx-auto grid max-w-[1240px] divide-y-2 divide-[#121212] sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0">
            {t.home.highlights.map((h, i) => (
              <li key={i} className="px-5 py-7 sm:px-8">
                <h3 className={`${disp} text-2xl font-bold uppercase text-[#F6D86B]`}>{l(h.title)}</h3>
                <p className="mt-1 font-medium">{l(h.text)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className={`${disp} text-4xl font-bold uppercase sm:text-5xl`}>{l(t.nav["dich-vu"])}</h2>
            <Link href={s.href("dich-vu")} className={btnAlt}>
              {l(UI.allServices)}
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {s.featured.map((it, i) => (
              <Sticker key={i} it={it} tone={tones[i % tones.length]} />
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 pb-14 sm:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {t.gallery.items.slice(0, 4).map((g, i) => (
              <div key={i} className={`${card} aspect-square overflow-hidden ${i % 2 ? "sm:translate-y-6" : ""}`}>
                {s.art(g)}
              </div>
            ))}
          </div>
        </section>
        <Closing {...props} />
      </>
    );
  } else if (page === "dich-vu") {
    body = (
      <>
        <Head title={l(t.services.title)} lead={l(t.services.lead)} />
        <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8">
          {t.services.groups.map((g, gi) => (
            <div key={gi} className="mb-12">
              <h2 className={`${disp} text-3xl font-bold uppercase`}>
                <span className="mr-3 inline-flex size-10 items-center justify-center rounded-full border-2 border-[#121212] bg-[#F6D86B] text-lg">{gi + 1}</span>
                {l(g.name)}
              </h2>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((it, i) => (
                  <Sticker key={i} it={it} tone={tones[(i + gi) % tones.length]} />
                ))}
              </ul>
            </div>
          ))}
          <p className={`font-medium ${soft}`}>{l(t.services.note)}</p>
        </section>
        <Closing {...props} />
      </>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <Head title={l(t.about.title)} lead={l(t.about.lead)} bg="bg-[#E6ECFF]" />
        <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8">
          <ul className="grid gap-6 sm:grid-cols-3">
            {t.about.team.map((m, i) => (
              <li key={m.name} className={`${card} overflow-hidden ${tones[(i + 1) % tones.length]}`}>
                <div className="aspect-[4/3] overflow-hidden border-b-2 border-[#121212] sm:aspect-square">{s.art(m.visual)}</div>
                <div className="p-5">
                  <h2 className={`${disp} text-2xl font-bold uppercase`}>{m.name}</h2>
                  <p className="mt-1 inline-flex rounded-full border-2 border-[#121212] bg-white px-3 py-0.5 text-sm font-bold">{l(m.role)}</p>
                  <p className={`mt-3 font-medium ${soft}`}>{l(m.bio)}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {t.about.values.map((v, i) => (
              <li key={i} className="border-t-2 border-[#121212] pt-4">
                <h3 className={`${disp} text-xl font-bold uppercase`}>{l(v.title)}</h3>
                <p className={`mt-1 font-medium ${soft}`}>{l(v.text)}</p>
              </li>
            ))}
          </ul>
        </section>
        <Closing {...props} />
      </>
    );
  } else if (page === "bo-suu-tap") {
    body = (
      <>
        <Head title={l(t.gallery.title)} lead={l(t.gallery.lead)} bg="bg-[#FFE3DA]" />
        <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8">
          <DemoLightbox
            motif={t.motif}
            {...s.gallery}
            gridClass="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3 [&_p]:font-bold"
            tileClass={`${card} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#121212]`}
            shapes={["aspect-square pb-8"]}
          />
        </section>
        <Closing {...props} />
      </>
    );
  } else {
    body = (
      <>
        <Head title={l(t.contact.title)} lead={l(t.contact.lead)} bg="bg-[#E6ECFF]" />
        <section className="mx-auto grid max-w-[1240px] gap-6 px-5 py-12 sm:px-8 lg:grid-cols-12">
          <div className={`${card} bg-white p-5 sm:p-8 lg:col-span-8`}>
            <DemoBookingForm
              {...s.form}
              staff={t.about.team.map((m) => m.name)}
              c={{
                field: "mt-2 block min-h-12 w-full rounded-2xl border-2 border-[#121212] bg-white px-4 py-3 text-[16px] font-medium outline-none focus:bg-[#FFF4C7]",
                label: `${disp} text-[13px] font-semibold uppercase`,
                chip: "min-h-11 rounded-full border-2 border-[#121212] bg-white px-4 text-sm font-bold transition-colors hover:bg-[#FFF4C7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121212]",
                chipOn: "!bg-[#2340D8] text-white",
                submit: btn,
                notice: `${card} bg-[#FFF4C7] p-6`,
              }}
            />
          </div>
          <aside className={`${card} space-y-4 bg-[#F6D86B] p-6 font-medium lg:col-span-4`}>
            <p className="flex gap-2">
              <MapPin className="mt-0.5 size-5 shrink-0" aria-hidden />
              {t.contact.address}
            </p>
            {t.contact.hours.map((h, i) => (
              <p key={i} className="flex gap-2">
                <Clock className="mt-0.5 size-5 shrink-0" aria-hidden />
                {l(h.days)} · {h.time}
              </p>
            ))}
            <DemoPhone phone={t.contact.phone} note={l(UI.form.callDemo)} className="font-bold" />
            <p>{t.contact.email}</p>
          </aside>
        </section>
      </>
    );
  }

  return (
    <div className={`bg-[#F4F1EA] text-[#121212] ${sans}`}>
      <DemoNav
        brand={
          <Link href={s.href("")} className={`${disp} flex min-h-11 items-center gap-2 text-2xl font-bold uppercase tracking-[-0.03em]`}>
            <span className="flex size-8 items-center justify-center rounded-full border-2 border-[#121212] bg-[#F6D86B]" aria-hidden>
              <span className="size-3 rounded-full bg-[#2340D8]" />
            </span>
            Chroma
          </Link>
        }
        items={s.nav}
        cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
        menuLabel={l(UI.menu)}
        closeLabel={l(UI.close)}
        c={{
          header: "border-b-2 border-[#121212] bg-[#F4F1EA]",
          inner: "h-[68px] max-w-[1240px] px-5 sm:px-8",
          link: `${disp} rounded-full border-2 border-transparent px-3.5 py-1.5 text-[13px] font-semibold hover:border-[#121212] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#121212]`,
          active: "!border-[#121212] bg-[#F6D86B]",
          cta: `${btn} !min-h-11 !px-4 !text-[13px]`,
          burger: "rounded-full border-2 border-[#121212] bg-[#F6D86B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#121212]",
          panel: "border-t-2 border-[#121212] bg-[#F4F1EA] px-3",
          panelLink: `${disp} flex min-h-12 items-center rounded-2xl px-3 text-xl font-bold uppercase`,
        }}
      />
      <main>{body}</main>
      <footer className="border-t-2 border-[#121212] bg-[#121212] text-white">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-12 sm:px-8 md:grid-cols-3">
          <p className={`${disp} text-5xl font-bold uppercase text-[#F6D86B]`}>Chroma</p>
          <div className="space-y-1 font-medium text-white/85">
            <p>{t.contact.address}</p>
            {t.contact.hours.map((h, i) => (
              <p key={i}>
                {l(h.days)} · {h.time}
              </p>
            ))}
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-2">
            {s.nav.map((n) => (
              <Link key={n.href} href={n.href} className="inline-flex min-h-11 items-center rounded-full border-2 border-white/30 px-4 text-sm font-bold hover:border-[#F6D86B]">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="border-t border-white/15 px-5 py-5 text-center text-[13px] text-white/70">{l(UI.disclaimer)}</p>
      </footer>
    </div>
  );
}

function Closing(props: SiteProps) {
  const s = site(props);
  const { t } = props;
  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-16 pt-6 sm:px-8">
      <div className={`${card} flex flex-col items-start gap-6 bg-[#FF6B4A] px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10`}>
        <div>
          <h2 className={`${disp} text-3xl font-bold uppercase sm:text-5xl`}>{s.l(t.home.closing.title)}</h2>
          <p className="mt-2 text-lg font-semibold">{s.l(t.home.closing.text)}</p>
        </div>
        <Link href={s.href("dat-lich")} className={btnAlt}>
          {s.l(t.bookLabel)}
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
