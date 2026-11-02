import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoNav, DemoPhone } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { fontChromaNew, site, type SiteProps } from "./shared";

// Mẫu Chroma (nail bar) — làm lại 02/11/2026 theo xu hướng hiện nay: lưới "bento" ảnh lớn bo tròn, nền kem ấm,
// màu mocha + vàng bơ, grotesk hiện đại chữ thường, nút viên thuốc. Bỏ kiểu neo-brutalist viền đen cũ.
const f = fontChromaNew.className;
const soft = "text-[#6B5D54]";
const tile = "overflow-hidden rounded-[28px]";
const btnDark = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#2A211C] px-6 text-[15px] font-semibold text-[#F5F0EA] transition-colors hover:bg-[#4A3A31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A211C]";
const btnLight = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/90 px-6 text-[15px] font-semibold text-[#2A211C] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const btnLine = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#2A211C]/20 px-6 text-[15px] font-semibold hover:border-[#2A211C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A211C]";

export function ChromaSite(props: SiteProps) {
  const { t, page } = props;
  const s = site(props);
  const { l } = s;

  const Head = ({ title, lead }: { title: string; lead: string }) => (
    <section className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6">
      <div className={`${tile} grid gap-4 bg-[#F3E3A1] p-6 sm:p-10 md:grid-cols-2 md:items-end`}>
        <h1 className="text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-7xl">{title.toLowerCase()}</h1>
        <p className={`text-[17px] md:justify-self-end md:text-right ${soft}`}>{lead}</p>
      </div>
    </section>
  );

  const PriceCard = ({ g }: { g: (typeof t.services.groups)[number] }) => (
    <div className={`${tile} bg-white p-6`}>
      <h3 className="text-2xl font-semibold tracking-[-0.03em]">{l(g.name).toLowerCase()}</h3>
      <ul className="mt-4">
        {g.items.map((it, i) => (
          <li key={i} className="flex items-baseline justify-between gap-4 border-t border-[#EFE7DE] py-3.5">
            <span>
              <span className="block font-medium">{l(it.name)}</span>
              <span className={`text-sm ${soft}`}>
                {it.desc ? `${l(it.desc)} · ` : ""}
                {s.dur(it.min)}
              </span>
            </span>
            <span className="whitespace-nowrap rounded-full bg-[#F5F0EA] px-3 py-1 text-[15px] font-semibold">{s.price(it.price, it.from)}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  let body: React.ReactNode;
  if (page === "") {
    body = (
      <>
        {/* Bento đầu trang: ảnh lớn + ô chữ vàng bơ + ô giá mocha + ảnh nhỏ */}
        <section className="mx-auto grid max-w-[1240px] gap-3 px-4 pt-4 sm:px-6 lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)_auto] lg:gap-4">
          <div className={`${tile} relative min-h-[420px] bg-[#D8C3B3] lg:col-span-7 lg:row-span-2 lg:min-h-[620px]`}>
            <div className="absolute inset-0">{s.art(t.home.hero, "", true)}</div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A211C]/70 via-[#2A211C]/10 to-transparent" aria-hidden />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9">
              <p className="inline-flex rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur">{l(t.home.kicker)}</p>
              <h1 className="mt-4 max-w-lg text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">{l(t.home.title).toLowerCase()}</h1>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Link href={s.href("dat-lich")} className={btnLight}>
                  {l(t.bookLabel)}
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
          <div className={`${tile} flex flex-col justify-between gap-6 bg-[#F3E3A1] p-7 lg:col-span-5`}>
            <p className="text-[1.75rem] font-semibold leading-tight tracking-[-0.03em]">{l(t.home.lead)}</p>
            <ul className="flex flex-wrap gap-2">
              {t.home.highlights.map((h, i) => (
                <li key={i} className="rounded-full bg-white/70 px-3.5 py-1.5 text-sm font-medium">
                  {l(h.title)} · <span className={soft}>{l(h.text)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:col-span-5 lg:gap-4">
            <Link href={s.href("dich-vu")} className={`${tile} group flex aspect-square flex-col justify-between bg-[#8E6A56] p-6 text-[#F5F0EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A211C]`}>
              <span className="text-sm font-medium opacity-85">{l(t.nav["dich-vu"])}</span>
              <span>
                <span className="block text-sm opacity-85">{l(s.featured[0].name)}</span>
                <span className="block text-4xl font-semibold tracking-[-0.03em]">{s.price(s.featured[0].price)}</span>
                <ArrowUpRight className="mt-2 size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
              </span>
            </Link>
            <div className={`${tile} aspect-square bg-[#D8C3B3]`}>{s.art(t.gallery.items[0])}</div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{l(t.gallery.title).toLowerCase()}</h2>
            <Link href={s.href("bo-suu-tap")} className={btnLine}>
              {l(UI.viewGallery)}
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {t.gallery.items.slice(1, 5).map((g, i) => (
              <li key={i}>
                <div className={`${tile} aspect-[3/4] bg-[#D8C3B3]`}>{s.art(g)}</div>
                <p className="mt-2 px-1 text-sm font-medium">{l(g.alt)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto grid max-w-[1240px] gap-4 px-4 pb-16 sm:px-6 lg:grid-cols-3">
          <div className={`${tile} flex flex-col justify-between bg-[#2A211C] p-7 text-[#F5F0EA]`}>
            <h2 className="text-4xl font-semibold tracking-[-0.04em]">{l(t.nav["dich-vu"]).toLowerCase()}</h2>
            <p className="mt-4 text-[#E2D6CC]">{l(t.services.lead)}</p>
            <Link href={s.href("dich-vu")} className={`${btnLight} mt-8 self-start`}>
              {l(UI.allServices)}
            </Link>
          </div>
          {t.services.groups.slice(0, 2).map((g, gi) => (
            <PriceCard key={gi} g={g} />
          ))}
        </section>
        <Closing {...props} />
      </>
    );
  } else if (page === "dich-vu") {
    body = (
      <>
        <Head title={l(t.services.title)} lead={l(t.services.lead)} />
        <section className="mx-auto grid max-w-[1240px] gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
          {t.services.groups.map((g, gi) => (
            <PriceCard key={gi} g={g} />
          ))}
        </section>
        <p className={`mx-auto max-w-[1240px] px-6 pb-4 ${soft}`}>{l(t.services.note)}</p>
        <Closing {...props} />
      </>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <Head title={l(t.about.title)} lead={l(t.about.lead)} />
        <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6">
          <ul className="grid gap-4 sm:grid-cols-3">
            {t.about.team.map((m) => (
              <li key={m.name} className={`${tile} bg-white`}>
                <div className="aspect-[4/5] bg-[#D8C3B3]">{s.art(m.visual)}</div>
                <div className="p-5">
                  <h2 className="text-2xl font-semibold tracking-[-0.03em]">{m.name}</h2>
                  <p className="text-sm font-medium text-[#8E6A56]">{l(m.role)}</p>
                  <p className={`mt-1 ${soft}`}>{l(m.bio)}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {t.about.values.map((v, i) => (
              <li key={i} className={`${tile} p-6 ${i === 1 ? "bg-[#F3E3A1]" : "bg-white"}`}>
                <h3 className="text-xl font-semibold">{l(v.title)}</h3>
                <p className={`mt-1 ${soft}`}>{l(v.text)}</p>
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
        <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6">
          <DemoLightbox
            motif={t.motif}
            {...s.gallery}
            gridClass="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 lg:grid-cols-3 [&_p]:font-medium"
            tileClass="rounded-[28px] bg-[#D8C3B3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2A211C]"
            shapes={["aspect-[3/4] pb-8", "aspect-[3/4] pb-8 lg:translate-y-8", "aspect-[3/4] pb-8"]}
          />
        </section>
        <Closing {...props} />
      </>
    );
  } else {
    body = (
      <>
        <Head title={l(t.contact.title)} lead={l(t.contact.lead)} />
        <section className="mx-auto grid max-w-[1240px] gap-4 px-4 py-10 sm:px-6 lg:grid-cols-12">
          <div className={`${tile} bg-white p-6 sm:p-9 lg:col-span-8`}>
            <DemoBookingForm
              {...s.form}
              staff={t.about.team.map((m) => m.name)}
              c={{
                field: "mt-2 block min-h-12 w-full rounded-2xl border border-[#E8DFD5] bg-[#FBF8F4] px-4 py-3 text-[16px] outline-none focus:border-[#2A211C]",
                label: "text-sm font-semibold",
                chip: "min-h-11 rounded-full border border-[#E8DFD5] bg-white px-4 text-sm font-medium hover:border-[#2A211C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2A211C]",
                chipOn: "!border-[#2A211C] !bg-[#2A211C] text-white",
                submit: btnDark,
                notice: "rounded-3xl bg-[#F3E3A1] p-6",
              }}
            />
          </div>
          <aside className={`${tile} space-y-4 bg-[#8E6A56] p-7 text-[#F5F0EA] lg:col-span-4`}>
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
            <DemoPhone phone={t.contact.phone} note={l(UI.form.callDemo)} className="font-semibold" />
            <p className="opacity-90">{t.contact.email}</p>
          </aside>
        </section>
      </>
    );
  }

  return (
    <div className={`bg-[#F5F0EA] text-[#2A211C] ${f}`}>
      <DemoNav
        brand={
          <Link href={s.href("")} className="flex min-h-11 items-center text-[1.75rem] font-bold tracking-[-0.05em]">
            chroma<span className="text-[#8E6A56]">.</span>
          </Link>
        }
        items={s.nav}
        cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
        menuLabel={l(UI.menu)}
        closeLabel={l(UI.close)}
        c={{
          header: "bg-[#F5F0EA]/90 backdrop-blur",
          inner: "h-[68px] max-w-[1240px] px-4 sm:px-6",
          link: "rounded-full px-4 py-2 text-[15px] font-medium hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2A211C]",
          active: "!bg-white",
          cta: `${btnDark} !min-h-11 !px-5 !text-sm`,
          burger: "rounded-full bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2A211C]",
          panel: "bg-[#F5F0EA] px-3 pb-3",
          panelLink: "flex min-h-12 items-center rounded-2xl px-4 text-xl font-semibold",
        }}
      />
      <main>{body}</main>
      <footer className="mx-auto max-w-[1240px] px-4 pb-4 sm:px-6">
        <div className={`${tile} grid gap-8 bg-[#2A211C] p-8 text-[#E2D6CC] md:grid-cols-3`}>
          <p className="text-5xl font-bold tracking-[-0.05em] text-[#F5F0EA]">chroma.</p>
          <div className="space-y-1 text-[15px]">
            <p>{t.contact.address}</p>
            {t.contact.hours.map((h, i) => (
              <p key={i}>
                {l(h.days)} · {h.time}
              </p>
            ))}
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-2">
            {s.nav.map((n) => (
              <Link key={n.href} href={n.href} className="inline-flex min-h-11 items-center rounded-full bg-white/10 px-4 text-sm font-medium hover:bg-white/20">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className={`px-2 py-5 text-center text-[13px] ${soft}`}>{l(UI.disclaimer)}</p>
      </footer>
    </div>
  );
}

function Closing(props: SiteProps) {
  const s = site(props);
  const { t } = props;
  return (
    <section className="mx-auto max-w-[1240px] px-4 pb-6 sm:px-6">
      <div className={`${tile} flex flex-col items-start gap-6 bg-[#F3E3A1] px-7 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10`}>
        <div>
          <h2 className="text-4xl font-semibold tracking-[-0.04em]">{s.l(t.home.closing.title).toLowerCase()}</h2>
          <p className={`mt-1 text-lg ${soft}`}>{s.l(t.home.closing.text)}</p>
        </div>
        <Link href={s.href("dat-lich")} className={btnDark}>
          {s.l(t.bookLabel)}
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
