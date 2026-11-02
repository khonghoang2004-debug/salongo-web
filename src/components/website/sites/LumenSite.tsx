import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoNav, DemoPhone } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { fontLumen, fontLumenSans, site, type SiteProps } from "./shared";

// Mẫu 5 — Maison Lumen: hair couture kiểu tạp chí thời trang. Ngà / đen mực / đỏ rượu vang,
// serif tương phản cao cỡ lớn, đường kẻ mảnh, chú thích "Look 01", bảng giá 3 cấp thợ.
const serif = fontLumen.className;
const sans = fontLumenSans.className;
const soft = "text-[#4D4842]";
const wine = "text-[#6E1F2A]";
const label = `${sans} text-[11px] font-medium uppercase tracking-[0.28em]`;
const btn = `${sans} inline-flex min-h-12 items-center justify-center gap-2 bg-[#141414] px-7 text-[13px] font-medium uppercase tracking-[0.2em] text-[#F6F2EA] transition-colors hover:bg-[#6E1F2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]`;
const link = `${sans} inline-flex min-h-11 items-center gap-2 border-b border-[#141414] text-[13px] font-medium uppercase tracking-[0.2em] hover:text-[#6E1F2A] hover:border-[#6E1F2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#141414]`;

export function LumenSite(props: SiteProps) {
  const { t, page } = props;
  const s = site(props);
  const { l } = s;
  const tiers = (t.services.tiers ?? []).map(l);

  const Head = ({ title, lead }: { title: string; lead: string }) => (
    <section className="mx-auto max-w-[1280px] px-5 pt-10 sm:px-8 sm:pt-14">
      <div className="flex items-center justify-between border-b border-[#141414] pb-3">
        <p className={label}>{t.name}</p>
        <p className={`${label} ${wine}`}>{lead}</p>
      </div>
      <h1 className={`${serif} mt-6 pb-10 text-[3.25rem] font-light leading-[1] tracking-[-0.03em] sm:text-[5.5rem] lg:text-[7.5rem]`}>{title}</h1>
    </section>
  );

  const TierTable = ({ groups }: { groups: typeof t.services.groups }) => (
    <div>
      <div className={`hidden grid-cols-[1fr_repeat(3,120px)] gap-4 border-b border-[#141414] pb-3 md:grid ${label}`}>
        <span />
        {tiers.map((x) => (
          <span key={x} className="text-right">
            {x}
          </span>
        ))}
      </div>
      {groups.map((g, gi) => (
        <div key={gi} className="border-b border-[#CFC6B6] py-6 last:border-0">
          <h3 className={`${serif} text-2xl italic ${wine}`}>{l(g.name)}</h3>
          <ul className="mt-3">
            {g.items.map((it, i) => (
              <li key={i} className="grid gap-2 py-3 md:grid-cols-[1fr_repeat(3,120px)] md:items-baseline md:gap-4">
                <span>
                  <span className={`${serif} text-xl`}>{l(it.name)}</span>
                  <span className={`ml-2 text-sm ${soft}`}>{s.dur(it.min)}</span>
                </span>
                <span className="grid grid-cols-3 gap-2 md:contents">
                  {(it.tiers ?? [it.price]).map((p, k) => (
                    <span key={k} className="text-left md:text-right">
                      <span className={`block text-[11px] uppercase tracking-[0.14em] md:hidden ${soft}`}>{tiers[k]}</span>
                      <span className={`${sans} whitespace-nowrap text-[15px] font-medium`}>{s.price(p, it.from)}</span>
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  let body: React.ReactNode;
  if (page === "") {
    body = (
      <>
        <section className="mx-auto max-w-[1280px] px-5 pt-8 sm:px-8 sm:pt-12">
          <div className="flex items-center justify-between border-b border-[#141414] pb-3">
            <p className={label}>{l(t.home.kicker)}</p>
            <p className={`${label} hidden sm:block`}>{l(t.tagline)}</p>
          </div>
          <h1 className={`${serif} mt-6 max-w-[14ch] text-[3.25rem] font-light leading-[0.98] tracking-[-0.035em] sm:text-[6rem] lg:text-[8.5rem]`}>{l(t.home.title)}</h1>
        </section>
        <section className="mx-auto grid max-w-[1280px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <figure className="lg:col-span-7">
            <div className="aspect-[4/5] overflow-hidden bg-[#E6DED0] sm:aspect-[5/4] lg:aspect-[4/5]">{s.art(t.home.hero, "", true)}</div>
            <figcaption className={`mt-3 ${label} ${soft}`}>Look 01 — {l(t.home.hero.alt)}</figcaption>
          </figure>
          <div className="flex flex-col lg:col-span-5">
            <p className={`text-[19px] leading-relaxed first-letter:float-left first-letter:mr-3 first-letter:text-[4.5rem] first-letter:leading-[0.8] ${serif}`}>{l(t.home.intro.text)}</p>
            <p className={`mt-6 text-[17px] ${soft}`}>{l(t.home.lead)}</p>
            <ol className="mt-10 border-t border-[#141414]">
              {t.home.highlights.map((h, i) => (
                <li key={i} className="grid grid-cols-[48px_1fr] gap-3 border-b border-[#CFC6B6] py-5">
                  <span className={`${serif} text-2xl italic ${wine}`}>0{i + 1}</span>
                  <span>
                    <strong className={`${sans} font-medium`}>{l(h.title)}</strong>
                    <span className={`block text-[15px] ${soft}`}>{l(h.text)}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link href={s.href("dat-lich")} className={btn}>
                {l(t.bookLabel)}
              </Link>
              <Link href={s.href("dich-vu")} className={link}>
                {l(t.nav["dich-vu"])}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
        <section className="bg-[#141414] text-[#F6F2EA]">
          <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 lg:py-20">
            <div className="flex items-end justify-between gap-4 border-b border-[#F6F2EA]/30 pb-4">
              <h2 className={`${serif} text-4xl font-light italic sm:text-6xl`}>{l(t.gallery.title)}</h2>
              <Link href={s.href("bo-suu-tap")} className={`${link} !border-[#F6F2EA] hover:!text-[#E7B8BF]`}>
                {l(UI.viewGallery)}
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
              {t.gallery.items.slice(0, 3).map((g, i) => (
                <figure key={i} className={i === 2 ? "hidden lg:block" : ""}>
                  <div className="aspect-[3/4] overflow-hidden bg-[#2A2422]">{s.art(g)}</div>
                  <figcaption className={`mt-3 ${label} text-[#CFC6B6]`}>{l(g.alt)}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-12">
            <h2 className={`${serif} text-4xl font-light sm:text-6xl lg:col-span-4`}>{l(t.services.title)}</h2>
            <div className="lg:col-span-8">
              <TierTable groups={[{ name: t.services.groups[0].name, items: s.featured }]} />
              <Link href={s.href("dich-vu")} className={`${link} mt-6`}>
                {l(UI.allServices)}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
        <Closing {...props} />
      </>
    );
  } else if (page === "dich-vu") {
    body = (
      <>
        <Head title={l(t.services.title)} lead={l(t.services.lead)} />
        <section className="mx-auto max-w-[1280px] px-5 pb-12 sm:px-8">
          <TierTable groups={t.services.groups} />
          <p className={`mt-6 text-[15px] ${soft}`}>{l(t.services.note)}</p>
        </section>
        <Closing {...props} />
      </>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <Head title={l(t.about.title)} lead={l(t.about.lead)} />
        <section className="mx-auto max-w-[1280px] space-y-16 px-5 pb-16 sm:px-8">
          {t.about.team.map((m, i) => (
            <article key={m.name} className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
              <div className={`aspect-[4/5] overflow-hidden bg-[#E6DED0] md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>{s.art(m.visual)}</div>
              <div className={`md:col-span-6 ${i % 2 ? "md:col-start-1 md:row-start-1 md:text-right" : ""}`}>
                <p className={`${label} ${wine}`}>{l(m.role)}</p>
                <h2 className={`${serif} mt-3 text-6xl font-light italic sm:text-8xl`}>{m.name}</h2>
                <p className={`mt-4 text-[17px] ${soft}`}>{l(m.bio)}</p>
              </div>
            </article>
          ))}
        </section>
        <section className="border-t border-[#141414]">
          <ul className="mx-auto grid max-w-[1280px] gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8">
            {t.about.values.map((v, i) => (
              <li key={i}>
                <h3 className={`${serif} text-3xl italic`}>{l(v.title)}</h3>
                <p className={`mt-2 text-[15px] ${soft}`}>{l(v.text)}</p>
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
        <Head title={l(t.gallery.title)} lead={l(t.gallery.lead)} />
        <section className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-8">
          <DemoLightbox
            motif={t.motif}
            {...s.gallery}
            gridClass={`grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-3 [&_p]:text-[11px] [&_p]:uppercase [&_p]:tracking-[0.2em]`}
            tileClass="bg-[#E6DED0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]"
            shapes={["aspect-[3/4] pb-8", "aspect-[3/4] pb-8 lg:mt-16", "aspect-[3/4] pb-8"]}
          />
        </section>
        <Closing {...props} />
      </>
    );
  } else {
    body = (
      <>
        <Head title={l(t.contact.title)} lead={l(t.contact.lead)} />
        <section className="mx-auto grid max-w-[1280px] gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <DemoBookingForm
              {...s.form}
              staff={t.about.team.map((m) => m.name)}
              c={{
                field: "mt-2 block min-h-12 w-full border-0 border-b border-[#141414] bg-transparent px-0 py-3 text-[16px] outline-none focus:border-b-2 focus:border-[#6E1F2A]",
                label,
                chip: `${sans} min-h-11 border border-[#141414] px-4 text-sm transition-colors hover:bg-[#141414] hover:text-[#F6F2EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]`,
                chipOn: "bg-[#141414] text-[#F6F2EA]",
                submit: btn,
                notice: "border border-[#141414] p-6",
              }}
            />
          </div>
          <aside className={`space-y-6 border-t border-[#141414] pt-6 text-[15px] lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0`}>
            <div>
              <p className={label}>{l(UI.address)}</p>
              <p className="mt-2">{t.contact.address}</p>
            </div>
            <div>
              <p className={label}>{l(UI.hours)}</p>
              {t.contact.hours.map((h, i) => (
                <p key={i} className="mt-2">
                  {l(h.days)} · {h.time}
                </p>
              ))}
            </div>
            <div>
              <DemoPhone phone={t.contact.phone} note={l(UI.form.callDemo)} className="font-medium" />
              <p className={soft}>{t.contact.email}</p>
            </div>
          </aside>
        </section>
      </>
    );
  }

  return (
    <div className={`bg-[#F6F2EA] text-[#141414] ${sans}`}>
      <DemoNav
        brand={
          <Link href={s.href("")} className={`${serif} flex min-h-11 items-center text-[1.625rem] italic tracking-[-0.01em] sm:text-[1.875rem]`}>
            Maison Lumen
          </Link>
        }
        items={s.nav}
        cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
        menuLabel={l(UI.menu)}
        closeLabel={l(UI.close)}
        c={{
          header: "bg-[#F6F2EA]/95 backdrop-blur border-b border-[#D9D0C1]",
          inner: "h-[72px] max-w-[1280px] px-5 sm:px-8",
          link: `${sans} px-3 py-2 text-[12px] font-medium uppercase tracking-[0.22em] text-[#4D4842] hover:text-[#141414] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#141414]`,
          active: "!text-[#6E1F2A]",
          cta: `${btn} !min-h-11 !px-5 !text-[11px]`,
          burger: "border border-[#141414] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]",
          panel: "border-t border-[#D9D0C1] bg-[#F6F2EA]",
          panelLink: `${serif} flex min-h-14 items-center border-b border-[#E6DED0] px-5 text-3xl font-light italic`,
        }}
      />
      <main>{body}</main>
      <footer className="bg-[#141414] text-[#E6DED0]">
        <div className="mx-auto max-w-[1280px] px-5 pt-14 sm:px-8">
          <div className="grid gap-8 text-[15px] sm:grid-cols-3">
            <p>{t.contact.address}</p>
            <p>
              {t.contact.hours.map((h) => `${l(h.days)} · ${h.time}`).join(" / ")}
            </p>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-5">
              {s.nav.map((n) => (
                <Link key={n.href} href={n.href} className={`${label} inline-flex min-h-11 items-center hover:text-white`}>
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className={`${serif} mt-10 overflow-hidden whitespace-nowrap text-[17vw] font-light italic leading-[0.9] tracking-[-0.04em] text-[#F6F2EA] lg:text-[12rem]`} aria-hidden>
            Lumen
          </p>
        </div>
        <p className="border-t border-white/15 px-5 py-5 text-center text-[13px] text-[#BDB4A6]">{l(UI.disclaimer)}</p>
      </footer>
    </div>
  );
}

function Closing(props: SiteProps) {
  const s = site(props);
  const { t } = props;
  return (
    <section className="border-t border-[#141414]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
        <h2 className={`${serif} text-4xl font-light italic sm:text-6xl`}>{s.l(t.home.closing.title)}</h2>
        <Link href={s.href("dat-lich")} className={`${btn} self-start md:self-auto`}>
          {s.l(t.bookLabel)}
        </Link>
      </div>
    </section>
  );
}
