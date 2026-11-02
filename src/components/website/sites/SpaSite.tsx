import { Clock, Leaf, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoNav, DemoPhone } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { fontSpa, site, type SiteProps } from "./shared";

// Mẫu 3 — Saluna: beauty & spa. Trắng ấm / sage / olive / màu đá, chữ serif mềm, khung vòm, bo tròn lớn, nhiều khoảng thở.
const serif = fontSpa.className;
const soft = "text-[#5C5B4F]";
const olive = "text-[#566043]";
const btn =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#566043] px-7 text-[15px] font-medium text-[#FAF7F1] transition-colors hover:bg-[#434B33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#566043]";
const btnGhost =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#B9B6A6] px-7 text-[15px] font-medium text-[#39392F] transition-colors hover:border-[#566043] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#566043]";

export function SpaSite(props: SiteProps) {
  const { t, page } = props;
  const s = site(props);
  const { l } = s;

  const PageHead = ({ title, lead }: { title: string; lead: string }) => (
    <section className="mx-auto max-w-2xl px-5 pb-12 pt-14 text-center sm:pt-20">
      <Leaf className="mx-auto size-5 text-[#7C8A62]" aria-hidden />
      <h1 className={`${serif} mt-5 text-[2.5rem] leading-[1.1] sm:text-[3.5rem]`}>{title}</h1>
      <p className={`mx-auto mt-5 max-w-lg text-[17px] leading-[1.75] ${soft}`}>{lead}</p>
    </section>
  );

  const Treatment = ({ it }: { it: (typeof s.featured)[number] }) => (
    <li className="flex flex-col rounded-[28px] bg-[#F1ECE1] p-6 sm:p-7">
      <h3 className={`${serif} text-[1.375rem] leading-snug`}>{l(it.name)}</h3>
      {it.desc && <p className={`mt-2 text-[15px] leading-relaxed ${soft}`}>{l(it.desc)}</p>}
      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <span className="rounded-full bg-[#FAF7F1] px-3 py-1 text-sm">{s.dur(it.min)}</span>
        <span className={`${serif} text-xl`}>{s.price(it.price, it.from)}</span>
      </div>
    </li>
  );

  let body: React.ReactNode;
  if (page === "") {
    body = (
      <>
        <section className="px-5 pt-14 text-center sm:pt-20">
          <p className={`text-sm tracking-[0.18em] ${olive}`}>{l(t.home.kicker)}</p>
          <h1 className={`${serif} mx-auto mt-5 max-w-3xl text-[2.75rem] leading-[1.08] sm:text-6xl lg:text-[4.25rem]`}>{l(t.home.title)}</h1>
          <p className={`mx-auto mt-6 max-w-xl text-[17px] leading-[1.75] ${soft}`}>{l(t.home.lead)}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href={s.href("dat-lich")} className={btn}>
              {l(t.bookLabel)}
            </Link>
            <Link href={s.href("dich-vu")} className={btnGhost}>
              {l(t.nav["dich-vu"])}
            </Link>
          </div>
        </section>
        <section className="mx-auto mt-14 grid max-w-[1160px] grid-cols-12 items-end gap-3 px-5 sm:gap-5 sm:px-8">
          <div className="col-span-3 hidden aspect-[3/4] overflow-hidden rounded-t-full bg-[#ECE5D8] sm:block">{s.art(t.gallery.items[1])}</div>
          <div className="col-span-12 aspect-[4/5] overflow-hidden rounded-t-full bg-[#ECE5D8] sm:col-span-6 sm:aspect-[5/6]">{s.art(t.home.hero, "", true)}</div>
          <div className="col-span-3 hidden aspect-[3/4] overflow-hidden rounded-t-full bg-[#ECE5D8] sm:block">{s.art(t.gallery.items[2])}</div>
        </section>

        <section className="mx-auto grid max-w-[1000px] items-center gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 lg:py-28">
          <div className="mx-auto aspect-square w-full max-w-[380px] overflow-hidden rounded-full bg-[#ECE5D8]">{s.art(t.about.team[0].visual)}</div>
          <div>
            <h2 className={`${serif} text-[2rem] leading-tight sm:text-[2.5rem]`}>{l(t.home.intro.title)}</h2>
            <p className={`mt-5 text-[17px] leading-[1.75] ${soft}`}>{l(t.home.intro.text)}</p>
            <ul className="mt-8 space-y-4">
              {t.home.highlights.map((h, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#A3AE92]" aria-hidden />
                  <span>
                    <strong className="font-medium">{l(h.title)}.</strong> <span className={soft}>{l(h.text)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[#F4F0E7] py-20">
          <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
            <h2 className={`${serif} text-center text-[2rem] sm:text-[2.5rem]`}>{l(t.nav["dich-vu"])}</h2>
            <ul className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-3">
              {s.featured.map((it, i) => (
                <Treatment key={i} it={it} />
              ))}
            </ul>
            <div className="mt-10 text-center">
              <Link href={s.href("dich-vu")} className={btnGhost}>
                {l(UI.allServices)}
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
        <PageHead title={l(t.services.title)} lead={l(t.services.lead)} />
        <nav aria-label={l(t.services.title)} className="mx-auto flex max-w-[1160px] flex-wrap justify-center gap-2 px-5">
          {t.services.groups.map((grp, gi) => (
            <a key={gi} href={`#nhom-${gi + 1}`} className="inline-flex min-h-11 items-center rounded-full border border-[#CFC6B8] px-5 text-[15px] hover:border-[#566043] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#566043]">
              {l(grp.name)}
            </a>
          ))}
        </nav>
        <section className="mx-auto max-w-[1160px] px-5 pb-12 sm:px-8">
          {t.services.groups.map((grp, gi) => (
            <div key={gi} id={`nhom-${gi + 1}`} className="scroll-mt-24 pt-14">
              <h2 className={`${serif} text-[1.75rem] italic ${olive}`}>{l(grp.name)}</h2>
              <ul className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                {grp.items.map((it, i) => (
                  <Treatment key={i} it={it} />
                ))}
              </ul>
            </div>
          ))}
          <p className={`mx-auto mt-12 max-w-xl text-center text-[15px] ${soft}`}>{l(t.services.note)}</p>
        </section>
        <Closing {...props} />
      </>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <PageHead title={l(t.about.title)} lead={l(t.about.lead)} />
        <section className="mx-auto grid max-w-[1000px] items-center gap-10 px-5 pb-16 sm:px-8 md:grid-cols-2">
          <div className="aspect-[4/5] overflow-hidden rounded-t-full bg-[#ECE5D8]">{s.art(t.gallery.items[5])}</div>
          <div className="space-y-5">
            {t.about.story.map((p, i) => (
              <p key={i} className={`text-[17px] leading-[1.8] ${i ? soft : ""}`}>
                {l(p)}
              </p>
            ))}
          </div>
        </section>
        <section className="bg-[#F4F0E7]">
          <div className="mx-auto max-w-[1000px] px-5 py-16 sm:px-8">
            <h2 className={`${serif} text-center text-[2rem]`}>{l(UI.team)}</h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
              {t.about.team.map((m) => (
                <li key={m.name} className="flex items-center gap-5">
                  <div className="size-28 shrink-0 overflow-hidden rounded-full bg-[#ECE5D8] sm:size-32">{s.art(m.visual)}</div>
                  <div>
                    <h3 className={`${serif} text-2xl`}>{m.name}</h3>
                    <p className={`text-sm ${olive}`}>{l(m.role)}</p>
                    <p className={`mt-1 text-[15px] ${soft}`}>{l(m.bio)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="mx-auto grid max-w-[1000px] gap-8 px-5 py-16 text-center sm:grid-cols-3 sm:px-8">
          {t.about.values.map((v, i) => (
            <div key={i}>
              <span className="mx-auto block size-2 rounded-full bg-[#A3AE92]" aria-hidden />
              <h3 className={`${serif} mt-4 text-2xl`}>{l(v.title)}</h3>
              <p className={`mt-2 text-[15px] ${soft}`}>{l(v.text)}</p>
            </div>
          ))}
        </section>
        <Closing {...props} />
      </>
    );
  } else if (page === "bo-suu-tap") {
    body = (
      <>
        <PageHead title={l(t.gallery.title)} lead={l(t.gallery.lead)} />
        <section className="mx-auto max-w-[1160px] px-5 pb-16 sm:px-8">
          <DemoLightbox
            motif={t.motif}
            {...s.gallery}
            gridClass="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3"
            tileClass="bg-[#ECE5D8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#566043]"
            shapes={["aspect-[3/4] [&>button]:rounded-t-full pb-8", "aspect-[3/4] [&>button]:rounded-[28px] pb-8", "aspect-[3/4] [&>button]:rounded-t-full pb-8"]}
          />
        </section>
        <Closing {...props} />
      </>
    );
  } else {
    body = (
      <>
        <PageHead title={l(t.contact.title)} lead={l(t.contact.lead)} />
        <section className="mx-auto grid max-w-[1100px] gap-8 px-5 pb-20 sm:px-8 lg:grid-cols-12">
          <div className="rounded-[32px] bg-[#F1ECE1] p-6 sm:p-9 lg:col-span-7">
            <DemoBookingForm
              {...s.form}
              c={{
                field: "mt-2 block min-h-12 w-full rounded-2xl border border-[#D8D0C0] bg-[#FAF7F1] px-4 py-3 text-[15px] outline-none focus:border-[#566043] focus:ring-2 focus:ring-[#DCE2D0]",
                label: "text-[15px] font-medium",
                chip: "min-h-11 rounded-full border border-[#D8D0C0] bg-[#FAF7F1] px-4 text-sm transition-colors hover:border-[#566043] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#566043]",
                chipOn: "!border-[#566043] !bg-[#566043] text-[#FAF7F1]",
                submit: btn,
                notice: "rounded-[24px] bg-[#E4E8DA] p-6",
              }}
            />
          </div>
          <aside className="space-y-6 lg:col-span-5">
            <div className="overflow-hidden rounded-t-full bg-[#ECE5D8] [aspect-ratio:5/4] lg:aspect-[4/5]">{s.art(t.gallery.items[3])}</div>
            <div className="space-y-4 text-[15px]">
              <p className="flex gap-3">
                <MapPin className={`mt-0.5 size-4 shrink-0 ${olive}`} aria-hidden />
                {t.contact.address}
              </p>
              <div className="flex gap-3">
                <Clock className={`mt-0.5 size-4 shrink-0 ${olive}`} aria-hidden />
                <dl>
                  {t.contact.hours.map((h, i) => (
                    <div key={i} className="flex gap-3">
                      <dt className="min-w-[110px]">{l(h.days)}</dt>
                      <dd>{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <DemoPhone phone={t.contact.phone} note={l(UI.form.callDemo)} className="font-medium" />
              <p className={soft}>{t.contact.email}</p>
            </div>
          </aside>
        </section>
      </>
    );
  }

  return (
    <div className="bg-[#FAF7F1] text-[#39392F]">
      <DemoNav
        brand={
          <Link href={s.href("")} className="flex min-h-11 items-center gap-2">
            <span className="size-6 rounded-t-full bg-[#A3AE92]" aria-hidden />
            <span className={`${serif} text-[1.625rem] italic`}>saluna</span>
          </Link>
        }
        items={s.nav}
        cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
        menuLabel={l(UI.menu)}
        closeLabel={l(UI.close)}
        c={{
          header: "bg-[#FAF7F1]/95 backdrop-blur border-b border-[#ECE6DA]",
          inner: "h-[72px] max-w-[1160px] px-5 sm:px-8",
          link: "rounded-full px-4 py-2 text-[15px] text-[#4E4D43] transition-colors hover:bg-[#F1ECE1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#566043]",
          active: "!bg-[#E9ECE0] !text-[#39392F]",
          cta: `${btn} !min-h-11 !px-5 text-sm`,
          burger: "rounded-full bg-[#F1ECE1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#566043]",
          panel: "border-t border-[#ECE6DA] bg-[#FAF7F1] px-2",
          panelLink: `${serif} flex min-h-12 items-center rounded-2xl px-4 text-xl`,
        }}
      />
      <main>{body}</main>
      <footer className="bg-[#EEE9DE]">
        <div className="mx-auto flex max-w-[1160px] flex-col items-center gap-6 px-5 py-14 text-center sm:px-8">
          <p className={`${serif} text-4xl italic`}>saluna</p>
          <p className={`text-sm ${soft}`}>
            {l(t.tagline)} · {t.contact.address}
          </p>
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5">
            {s.nav.map((n) => (
              <Link key={n.href} href={n.href} className="inline-flex min-h-11 items-center text-[15px] hover:underline">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className={`border-t border-[#DDD6C8] px-5 py-5 text-center text-[13px] ${soft}`}>{l(UI.disclaimer)}</p>
      </footer>
    </div>
  );
}

function Closing(props: SiteProps) {
  const s = site(props);
  const { t } = props;
  return (
    <section className="px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-[1000px] items-center gap-8 overflow-hidden rounded-[40px] bg-[#DDE2D1] md:grid-cols-2">
        <div className="px-7 pt-10 md:py-14 md:pl-12">
          <h2 className={`${serif} text-[2rem] leading-tight`}>{s.l(t.home.closing.title)}</h2>
          <p className={`mt-3 text-[17px] ${soft}`}>{s.l(t.home.closing.text)}</p>
          <Link href={s.href("dat-lich")} className={`${btn} mt-7`}>
            {s.l(t.bookLabel)}
          </Link>
        </div>
        <div className="h-56 md:h-full md:min-h-[320px]">{s.art(t.gallery.items[2])}</div>
      </div>
    </section>
  );
}
