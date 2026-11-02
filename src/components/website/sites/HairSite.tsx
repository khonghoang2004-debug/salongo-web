import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoNav, DemoPhone } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { fontHair, site, type SiteProps } from "./shared";

// Mẫu 2 — Verra: hair studio hiện đại. Cream / espresso / than chì, điểm nhấn đồng, bố cục lệch, số thứ tự lớn.
const g = fontHair.className;
const soft = "text-[#5E5149]";
const brassText = "text-[#7A5C34]"; // đồng đậm cho chữ nhỏ trên nền cream (tương phản ≥ 4.5:1)
const btn =
  "inline-flex min-h-12 items-center justify-center gap-2 bg-[#3B2A22] px-6 text-[14px] font-medium uppercase tracking-[0.12em] text-[#F3EDE4] transition-colors hover:bg-[#2B2B2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2A22]";
const btnLight =
  "inline-flex min-h-12 items-center justify-center gap-2 border border-[#CDB58A] px-6 text-[14px] font-medium uppercase tracking-[0.12em] text-[#F3EDE4] transition-colors hover:bg-[#CDB58A] hover:text-[#2B2B2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F3EDE4]";

export function HairSite(props: SiteProps) {
  const { t, page } = props;
  const s = site(props);
  const { l } = s;

  const Num = ({ n, label, light }: { n: string; label: string; light?: boolean }) => (
    <p className={`${g} flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.16em] ${light ? "text-[#CDB58A]" : brassText}`}>
      <span>{n}</span>
      <span className={`h-px w-10 ${light ? "bg-[#CDB58A]" : "bg-[#B49A6A]"}`} aria-hidden />
      <span>{label}</span>
    </p>
  );

  const PageHead = ({ n, title, lead }: { n: string; title: string; lead: string }) => (
    <section className="mx-auto grid max-w-[1240px] gap-6 px-5 pb-12 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <Num n={n} label={t.name} />
        <h1 className={`${g} mt-5 text-[2.75rem] font-bold uppercase leading-[1.04] tracking-[-0.03em] sm:text-[4rem] lg:text-[5.5rem]`}>{title}</h1>
      </div>
      <p className={`max-w-md text-[17px] leading-relaxed lg:col-span-5 lg:pb-3 ${soft}`}>{lead}</p>
    </section>
  );

  let body: React.ReactNode;
  if (page === "") {
    body = (
      <>
        <section className="grid lg:min-h-[640px] lg:grid-cols-2">
          <div className="aspect-[5/4] w-full overflow-hidden bg-[#D9CCBA] sm:aspect-[16/11] lg:aspect-auto lg:max-h-none">{s.art(t.home.hero, "", true)}</div>
          <div className="flex flex-col justify-center bg-[#3B2A22] px-5 py-12 text-[#F3EDE4] sm:px-10 lg:px-14">
            <Num n="01" label={l(t.home.kicker)} light />
            <h1 className={`${g} mt-6 text-[2.625rem] font-bold uppercase leading-[1.04] tracking-[-0.03em] sm:text-[3.75rem] xl:text-[4.5rem]`}>{l(t.home.title)}</h1>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[#E4D9CB]">{l(t.home.lead)}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={s.href("dat-lich")} className={`${btnLight} !bg-[#CDB58A] !text-[#2B2B2B] hover:!bg-[#E1CDA6]`}>
                {l(t.bookLabel)}
              </Link>
              <Link href={s.href("dich-vu")} className={btnLight}>
                {l(t.nav["dich-vu"])}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <Num n="02" label={l(t.nav["dich-vu"])} />
            <h2 className={`${g} mt-5 text-[2.25rem] font-bold uppercase leading-none tracking-[-0.02em] sm:text-5xl`}>{l(t.home.intro.title)}</h2>
            <p className={`mt-5 text-[17px] leading-relaxed ${soft}`}>{l(t.home.intro.text)}</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="border-t-2 border-[#2B2B2B]">
              {s.featured.map((it, i) => (
                <li key={i} className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-[#D6CABB] py-5">
                  <span className={`${g} text-xl font-medium`}>{l(it.name)}</span>
                  <span className={`${g} text-xl font-medium`}>{s.price(it.price, it.from)}</span>
                  <span className={`text-sm ${soft}`}>{s.dur(it.min)}</span>
                </li>
              ))}
            </ul>
            <Link href={s.href("dich-vu")} className={`${g} mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] underline-offset-4 hover:underline`}>
              {l(UI.allServices)}
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>

        <section className="bg-[#2B2B2B] text-[#F3EDE4]">
          <ul className="mx-auto grid max-w-[1240px] gap-px bg-[#4A4440] sm:grid-cols-3">
            {t.home.highlights.map((h, i) => (
              <li key={i} className="bg-[#2B2B2B] px-5 py-10 sm:px-8">
                <p className={`${g} text-5xl font-bold text-[#CDB58A]`}>0{i + 1}</p>
                <h3 className={`${g} mt-4 text-lg font-medium uppercase tracking-[0.06em]`}>{l(h.title)}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#D4CBBF]">{l(h.text)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Num n="03" label={l(t.nav["bo-suu-tap"])} />
              <h2 className={`${g} mt-5 text-[2.25rem] font-bold uppercase leading-none sm:text-5xl`}>{l(t.gallery.title)}</h2>
            </div>
            <Link href={s.href("bo-suu-tap")} className={`${g} inline-flex min-h-11 items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] hover:underline`}>
              {l(UI.viewGallery)}
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-12">
            <div className="col-span-2 aspect-[16/10] overflow-hidden bg-[#D9CCBA] lg:col-span-7 lg:aspect-auto lg:h-[460px]">{s.art(t.gallery.items[1])}</div>
            <div className="aspect-[3/4] overflow-hidden bg-[#D9CCBA] lg:col-span-5 lg:aspect-auto lg:h-[460px]">{s.art(t.gallery.items[2])}</div>
            <div className="aspect-[3/4] overflow-hidden bg-[#D9CCBA] lg:hidden">{s.art(t.gallery.items[3])}</div>
          </div>
        </section>

        <Closing {...props} />
      </>
    );
  } else if (page === "dich-vu") {
    body = (
      <>
        <PageHead n="02" title={l(t.services.title)} lead={l(t.services.lead)} />
        <section className="mx-auto max-w-[1240px] px-5 pb-16 sm:px-8">
          {t.services.groups.map((grp, gi) => (
            <div key={gi} className="grid gap-4 border-t-2 border-[#2B2B2B] py-8 lg:grid-cols-12">
              <h2 className={`${g} text-2xl font-bold uppercase lg:col-span-4`}>
                <span className={`mr-3 ${brassText}`}>0{gi + 1}</span>
                {l(grp.name)}
              </h2>
              <ul className="lg:col-span-8">
                {grp.items.map((it, i) => (
                  <li key={i} className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-[#D6CABB] py-4 last:border-0">
                    <span className={`${g} text-lg font-medium`}>{l(it.name)}</span>
                    <span className={`${g} text-lg font-medium`}>{s.price(it.price, it.from)}</span>
                    <span className={`text-sm ${soft}`}>
                      {it.desc ? `${l(it.desc)} · ` : ""}
                      {s.dur(it.min)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className={`border-t border-[#D6CABB] pt-6 text-[15px] ${soft}`}>{l(t.services.note)}</p>
        </section>
        <Closing {...props} />
      </>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <PageHead n="04" title={l(t.about.title)} lead={l(t.about.lead)} />
        <section className="mx-auto max-w-[1240px] px-5 pb-16 sm:px-8">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {t.about.team.map((m, i) => (
              <li key={m.name} className={i === 1 ? "lg:mt-16" : ""}>
                <div className="aspect-[4/5] overflow-hidden bg-[#D9CCBA]">{s.art(m.visual)}</div>
                <div className="mt-4 flex items-baseline justify-between gap-3 border-b-2 border-[#2B2B2B] pb-3">
                  <h2 className={`${g} text-3xl font-bold uppercase`}>{m.name}</h2>
                  <p className={`text-right text-sm font-medium uppercase tracking-[0.08em] ${brassText}`}>{l(m.role)}</p>
                </div>
                <p className={`mt-3 text-[15px] ${soft}`}>{l(m.bio)}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-[#3B2A22] text-[#F3EDE4]">
          <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12">
            <p className={`${g} text-2xl font-medium leading-snug lg:col-span-6 lg:text-3xl`}>{l(t.about.story[0])}</p>
            <ul className="grid gap-6 lg:col-span-5 lg:col-start-8">
              {t.about.values.map((v, i) => (
                <li key={i} className="border-t border-[#6B564A] pt-4">
                  <h3 className={`${g} font-bold uppercase tracking-[0.08em] text-[#CDB58A]`}>{l(v.title)}</h3>
                  <p className="mt-1 text-[15px] text-[#E4D9CB]">{l(v.text)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Closing {...props} />
      </>
    );
  } else if (page === "bo-suu-tap") {
    body = (
      <>
        <PageHead n="03" title={l(t.gallery.title)} lead={l(t.gallery.lead)} />
        <section className="mx-auto max-w-[1240px] px-5 pb-16 sm:px-8">
          <DemoLightbox
            motif={t.motif}
            {...s.gallery}
            gridClass="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-6"
            tileClass="bg-[#D9CCBA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B2A22]"
            shapes={[
              "col-span-2 aspect-[16/10] lg:col-span-4 lg:row-span-2 lg:aspect-auto pb-8",
              "aspect-[3/4] lg:col-span-2 lg:aspect-[4/3] pb-8",
              "aspect-[3/4] lg:col-span-2 lg:aspect-[4/3] pb-8",
              "aspect-[3/4] lg:col-span-2 lg:aspect-[3/4] pb-8",
              "aspect-[3/4] lg:col-span-2 lg:aspect-[3/4] pb-8",
              "col-span-2 aspect-[16/10] lg:col-span-2 lg:aspect-[3/4] pb-8",
            ]}
          />
        </section>
        <Closing {...props} />
      </>
    );
  } else {
    body = (
      <>
        <PageHead n="05" title={l(t.contact.title)} lead={l(t.contact.lead)} />
        <section className="mx-auto grid max-w-[1240px] gap-8 px-5 pb-20 sm:px-8 lg:grid-cols-12">
          <div className="border-t-2 border-[#2B2B2B] bg-[#FBF8F3] p-5 sm:p-8 lg:col-span-8">
            <DemoBookingForm
              {...s.form}
              staff={t.about.team.map((m) => m.name)}
              c={{
                field: "mt-2 block min-h-12 w-full border-0 border-b-2 border-[#BBA990] bg-transparent px-1 py-3 text-[16px] outline-none focus:border-[#3B2A22]",
                label: `${g} text-[13px] font-medium uppercase tracking-[0.12em]`,
                chip: "min-h-11 border border-[#BBA990] px-4 text-sm transition-colors hover:border-[#3B2A22] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B2A22]",
                chipOn: "!border-[#3B2A22] bg-[#3B2A22] text-[#F3EDE4]",
                submit: btn,
                notice: "bg-[#E9E0D2] p-6",
              }}
            />
          </div>
          <aside className="lg:col-span-4">
            <Info {...props} />
          </aside>
        </section>
      </>
    );
  }

  return (
    <div className="bg-[#F3EDE4] text-[#2B2B2B]">
      <DemoNav
        brand={
          <Link href={s.href("")} className="flex min-h-11 items-baseline gap-2">
            <span className={`${g} text-[1.625rem] font-bold uppercase tracking-[0.08em]`}>Verra</span>
            <span className={`hidden text-[11px] uppercase tracking-[0.2em] sm:inline ${brassText}`}>hair studio</span>
          </Link>
        }
        items={s.nav}
        cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
        menuLabel={l(UI.menu)}
        closeLabel={l(UI.close)}
        c={{
          header: "border-b border-[#D6CABB] bg-[#F3EDE4]",
          inner: "h-16 max-w-[1240px] px-5 sm:px-8",
          link: `${g} px-3 py-2 text-[13px] font-medium uppercase tracking-[0.12em] text-[#4A403A] hover:text-[#2B2B2B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B2A22]`,
          active: "!text-[#2B2B2B] shadow-[inset_0_-2px_0_#B49A6A]",
          cta: `${btn} !min-h-11 !px-4 !text-[12px]`,
          burger: "border border-[#BBA990] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B2A22]",
          panel: "border-t border-[#D6CABB] bg-[#F3EDE4]",
          panelLink: `${g} flex min-h-12 items-center border-b border-[#E2D8CA] px-5 text-lg font-bold uppercase`,
        }}
      />
      <main>{body}</main>
      <footer className="bg-[#2B2B2B] text-[#E4D9CB]">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className={`${g} text-5xl font-bold uppercase tracking-[0.04em] text-[#F3EDE4]`}>Verra</p>
            <p className="mt-2 text-sm text-[#CDB58A]">{l(t.tagline)}</p>
          </div>
          <div className="space-y-2 text-[15px] md:col-span-4">
            <p>{t.contact.address}</p>
            {t.contact.hours.map((h, i) => (
              <p key={i}>
                {l(h.days)} · {h.time}
              </p>
            ))}
          </div>
          <nav aria-label="Footer" className="flex flex-col items-start md:col-span-3">
            {s.nav.map((n) => (
              <Link key={n.href} href={n.href} className={`${g} inline-flex min-h-10 items-center text-sm uppercase tracking-[0.1em] hover:text-white`}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="border-t border-[#4A4440] px-5 py-5 text-center text-[13px] text-[#BDB2A5]">{l(UI.disclaimer)}</p>
      </footer>
    </div>
  );
}

function Closing(props: SiteProps) {
  const s = site(props);
  const { t } = props;
  return (
    <section className="border-t border-[#D6CABB]">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-5 py-14 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className={`${g} text-[2rem] font-bold uppercase leading-none sm:text-5xl`}>{s.l(t.home.closing.title)}</h2>
          <p className={`mt-3 text-[17px] ${soft}`}>{s.l(t.home.closing.text)}</p>
        </div>
        <Link href={s.href("dat-lich")} className={`${btn} self-start lg:self-auto`}>
          {s.l(t.bookLabel)}
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

function Info(props: SiteProps) {
  const { t } = props;
  const s = site(props);
  return (
    <div className="space-y-6 bg-[#3B2A22] p-6 text-[#F3EDE4] sm:p-8">
      <div>
        <p className={`${g} flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-[#CDB58A]`}>
          <MapPin className="size-4" aria-hidden />
          {s.l(UI.address)}
        </p>
        <p className="mt-2 text-[15px]">{t.contact.address}</p>
      </div>
      <div>
        <p className={`${g} flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-[#CDB58A]`}>
          <Clock className="size-4" aria-hidden />
          {s.l(UI.hours)}
        </p>
        {t.contact.hours.map((h, i) => (
          <p key={i} className="mt-2 text-[15px]">
            {s.l(h.days)} · {h.time}
          </p>
        ))}
      </div>
      <div className="border-t border-[#6B564A] pt-5 text-[15px]">
        <DemoPhone phone={t.contact.phone} note={s.l(UI.form.callDemo)} className="font-medium" />
        <p className="mt-1 text-[#E4D9CB]">{t.contact.email}</p>
      </div>
    </div>
  );
}
