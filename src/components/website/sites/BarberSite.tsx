import { Clock, MapPin, Scissors } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoNav, DemoPhone } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { fontBarber, site, type SiteProps } from "./shared";

// Mẫu 4 — Brass & Walnut: barbershop cao cấp. Than chì (không đen đặc) xen nền kem, gỗ óc chó, đồng trầm, chữ hẹp đậm.
const o = `${fontBarber.className} uppercase`;
const soft = "text-[#5A4E46]";
const bronze = "text-[#8A5A2B]"; // trên nền kem
const bronzeLight = "text-[#D9A86F]"; // trên nền than chì
const btn =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-[#A7743F] px-6 text-[15px] font-medium uppercase tracking-[0.1em] text-[#1F1B19] transition-colors hover:bg-[#C08B52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A86F]";
const btnOutline =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] border border-[#8C7A6B] px-6 text-[15px] font-medium uppercase tracking-[0.1em] text-[#F1E9DC] transition-colors hover:border-[#D9A86F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A86F]";
const btnDark =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-[4px] bg-[#2A2826] px-6 text-[15px] font-medium uppercase tracking-[0.1em] text-[#F1E9DC] transition-colors hover:bg-[#5C3F2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A2826]";

export function BarberSite(props: SiteProps) {
  const { t, page } = props;
  const s = site(props);
  const { l } = s;

  const PageHead = ({ title, lead }: { title: string; lead: string }) => (
    <section className="bg-[#2A2826] text-[#F1E9DC]">
      <div className="mx-auto max-w-[1200px] px-5 pb-12 pt-12 sm:px-8 sm:pt-16">
        <p className={`${o} flex items-center gap-2 text-sm tracking-[0.2em] ${bronzeLight}`}>
          <Scissors className="size-4" aria-hidden />
          {t.name}
        </p>
        <h1 className={`${o} mt-4 text-[3rem] font-semibold leading-[1.02] tracking-[0.01em] sm:text-7xl`}>{title}</h1>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[#D8CCBD]">{lead}</p>
      </div>
    </section>
  );

  const MenuRow = ({ it }: { it: (typeof s.featured)[number] }) => (
    <li className="py-4">
      <div className="flex items-baseline gap-3">
        <span className={`${o} text-xl font-medium tracking-[0.03em]`}>{l(it.name)}</span>
        <span className="mb-1.5 flex-1 border-b-2 border-dotted border-[#C7B59E]" aria-hidden />
        <span className={`${o} whitespace-nowrap text-xl font-medium normal-case`}>{s.price(it.price, it.from)}</span>
      </div>
      <p className={`mt-1 text-sm ${soft}`}>
        {it.desc ? `${l(it.desc)} · ` : ""}
        {s.dur(it.min)}
      </p>
    </li>
  );

  let body: React.ReactNode;
  if (page === "") {
    body = (
      <>
        <section className="bg-[#2A2826] text-[#F1E9DC]">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-12 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-7">
              <p className={`${o} text-sm tracking-[0.24em] ${bronzeLight}`}>{l(t.home.kicker)}</p>
              <h1 className={`${o} mt-5 text-[3.25rem] font-semibold leading-[1.02] sm:text-[5rem] lg:text-[6rem]`}>{l(t.home.title)}</h1>
              <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-[#D8CCBD]">{l(t.home.lead)}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={s.href("dat-lich")} className={btn}>
                  {l(t.bookLabel)}
                </Link>
                <Link href={s.href("dich-vu")} className={btnOutline}>
                  {l(t.nav["dich-vu"])}
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-[420px] pr-4 pt-4">
                <div className="absolute inset-0 left-4 top-0 border-2 border-[#A7743F]" aria-hidden />
                <div className="relative aspect-[4/5] overflow-hidden bg-[#3A3330]">{s.art(t.home.hero, "", true)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#5C3F2C] text-[#F1E9DC]">
          <ul className="mx-auto grid max-w-[1200px] divide-y divide-[#7A5A44] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
            {t.home.highlights.map((h, i) => (
              <li key={i} className="py-7 sm:px-6 sm:first:pl-0">
                <h3 className={`${o} text-lg font-medium tracking-[0.06em] text-[#F3D4AE]`}>{l(h.title)}</h3>
                <p className="mt-1 text-[15px] text-[#EADCCB]">{l(h.text)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <h2 className={`${o} text-4xl font-semibold leading-none sm:text-5xl`}>{l(t.home.intro.title)}</h2>
            <p className={`mt-5 text-[17px] leading-relaxed ${soft}`}>{l(t.home.intro.text)}</p>
            <Link href={s.href("gioi-thieu")} className={`${btnDark} mt-8`}>
              {l(t.nav["gioi-thieu"])}
            </Link>
          </div>
          <div className="rounded-[6px] border-2 border-[#2A2826] p-5 sm:p-8 lg:col-span-7">
            <p className={`${o} text-center text-sm tracking-[0.3em] ${bronze}`}>{l(t.nav["dich-vu"])}</p>
            <ul className="mt-2 divide-y divide-[#DDD0BE]">
              {s.featured.map((it, i) => (
                <MenuRow key={i} it={it} />
              ))}
            </ul>
            <Link href={s.href("dich-vu")} className={`${o} mt-4 inline-flex min-h-11 items-center text-sm tracking-[0.12em] underline underline-offset-4`}>
              {l(UI.allServices)}
            </Link>
          </div>
        </section>

        <section className="bg-[#2A2826] text-[#F1E9DC]">
          <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-20">
            <h2 className={`${o} text-4xl font-semibold sm:text-5xl`}>{l(t.about.title)}</h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-3">
              {t.about.team.map((m) => (
                <li key={m.name}>
                  <div className="aspect-[4/5] overflow-hidden bg-[#3A3330]">{s.art(m.visual)}</div>
                  <h3 className={`${o} mt-4 text-2xl font-medium`}>{m.name}</h3>
                  <p className={`text-sm ${bronzeLight}`}>{l(m.role)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Closing {...props} />
      </>
    );
  } else if (page === "dich-vu") {
    body = (
      <>
        <PageHead title={l(t.services.title)} lead={l(t.services.lead)} />
        <section className="mx-auto grid max-w-[1200px] gap-6 px-5 py-14 sm:px-8 lg:grid-cols-3">
          {t.services.groups.map((grp, gi) => (
            <div key={gi} className="rounded-[6px] border-2 border-[#2A2826] p-5 sm:p-7">
              <h2 className={`${o} border-b-2 border-[#2A2826] pb-3 text-3xl font-semibold`}>{l(grp.name)}</h2>
              <ul className="divide-y divide-[#DDD0BE]">
                {grp.items.map((it, i) => (
                  <MenuRow key={i} it={it} />
                ))}
              </ul>
            </div>
          ))}
        </section>
        <p className={`mx-auto max-w-[1200px] px-5 pb-6 text-[15px] sm:px-8 ${soft}`}>{l(t.services.note)}</p>
        <Closing {...props} />
      </>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <PageHead title={l(t.about.title)} lead={l(t.about.lead)} />
        <section className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8">
          <ul className="grid gap-10 md:grid-cols-3">
            {t.about.team.map((m) => (
              <li key={m.name}>
                <div className="relative pr-3 pt-3">
                  <div className="absolute inset-0 left-3 top-0 border-2 border-[#A7743F]" aria-hidden />
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#3A3330] md:aspect-[4/5]">{s.art(m.visual)}</div>
                </div>
                <h2 className={`${o} mt-5 text-3xl font-semibold`}>{m.name}</h2>
                <p className={`text-sm font-medium ${bronze}`}>{l(m.role)}</p>
                <p className={`mt-2 text-[15px] ${soft}`}>{l(m.bio)}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-[#5C3F2C] text-[#F1E9DC]">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-12">
            <p className="text-xl leading-relaxed lg:col-span-6">{l(t.about.story[0])}</p>
            <ul className="grid gap-5 sm:grid-cols-3 lg:col-span-6">
              {t.about.values.map((v, i) => (
                <li key={i}>
                  <h3 className={`${o} text-lg font-medium text-[#F3D4AE]`}>{l(v.title)}</h3>
                  <p className="mt-1 text-[15px] text-[#EADCCB]">{l(v.text)}</p>
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
        <PageHead title={l(t.gallery.title)} lead={l(t.gallery.lead)} />
        <section className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8">
          <DemoLightbox
            motif={t.motif}
            {...s.gallery}
            gridClass="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-3"
            tileClass="rounded-[4px] bg-[#3A3330] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A2826]"
            shapes={["aspect-square pb-8", "aspect-square pb-8", "aspect-square pb-8"]}
          />
        </section>
        <Closing {...props} />
      </>
    );
  } else {
    body = (
      <>
        <PageHead title={l(t.contact.title)} lead={l(t.contact.lead)} />
        <section className="mx-auto grid max-w-[1200px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-12">
          <div className="rounded-[6px] border-2 border-[#2A2826] bg-[#F7F1E7] p-5 sm:p-8 lg:col-span-8">
            <DemoBookingForm
              {...s.form}
              staff={t.about.team.map((m) => m.name)}
              c={{
                field: "mt-2 block min-h-12 w-full rounded-[4px] border-2 border-[#CDBDA8] bg-white px-4 py-3 text-[16px] outline-none focus:border-[#2A2826]",
                label: `${o} text-[15px] font-medium tracking-[0.08em]`,
                chip: `${o} min-h-11 rounded-[4px] border-2 border-[#CDBDA8] bg-white px-4 text-[15px] tracking-[0.04em] transition-colors hover:border-[#2A2826] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2A2826]`,
                chipOn: "!border-[#2A2826] !bg-[#2A2826] text-[#F1E9DC]",
                submit: btnDark,
                notice: "rounded-[6px] bg-[#EBDDC8] p-6",
              }}
            />
          </div>
          <aside className="space-y-5 rounded-[6px] bg-[#2A2826] p-6 text-[15px] text-[#F1E9DC] sm:p-8 lg:col-span-4">
            <p className={`${o} text-sm tracking-[0.2em] ${bronzeLight}`}>{l(UI.contact)}</p>
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#D9A86F]" aria-hidden />
              {t.contact.address}
            </p>
            <div className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-[#D9A86F]" aria-hidden />
              <div>
                {t.contact.hours.map((h, i) => (
                  <p key={i}>
                    {l(h.days)} · {h.time}
                  </p>
                ))}
              </div>
            </div>
            <div className="border-t border-[#4A423D] pt-4">
              <DemoPhone phone={t.contact.phone} note={l(UI.form.callDemo)} className="font-medium" />
              <p className="mt-1 text-[#D8CCBD]">{t.contact.email}</p>
            </div>
          </aside>
        </section>
      </>
    );
  }

  return (
    <div className="bg-[#F1E9DC] text-[#2A2826]">
      <DemoNav
        brand={
          <Link href={s.href("")} className="flex min-h-11 items-center gap-2.5 text-[#F1E9DC]">
            <span className={`${o} flex size-9 items-center justify-center border-2 border-[#A7743F] text-sm font-semibold text-[#D9A86F]`}>B&amp;W</span>
            <span className={`${o} text-lg font-semibold tracking-[0.12em] sm:text-xl`}>Brass &amp; Walnut</span>
          </Link>
        }
        items={s.nav}
        cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
        menuLabel={l(UI.menu)}
        closeLabel={l(UI.close)}
        c={{
          header: "border-b border-[#4A423D] bg-[#2A2826]",
          inner: "h-16 max-w-[1200px] px-5 sm:px-8",
          link: `${o} px-3 py-2 text-[15px] tracking-[0.1em] text-[#D8CCBD] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D9A86F]`,
          active: "!text-[#D9A86F]",
          cta: `${btn} !min-h-11 !px-4 !text-[13px]`,
          burger: "rounded-[4px] border border-[#6B5F57] text-[#F1E9DC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D9A86F]",
          panel: "border-t border-[#4A423D] bg-[#2A2826]",
          panelLink: `${o} flex min-h-12 items-center px-5 text-xl tracking-[0.08em] text-[#F1E9DC]`,
        }}
      />
      <main>{body}</main>
      <footer className="bg-[#2A2826] text-[#D8CCBD]">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-14 sm:px-8 md:grid-cols-3">
          <div>
            <p className={`${o} text-3xl font-semibold tracking-[0.08em] text-[#F1E9DC]`}>Brass &amp; Walnut</p>
            <p className={`mt-1 text-sm ${bronzeLight}`}>{l(t.tagline)}</p>
          </div>
          <div className="space-y-1 text-[15px]">
            <p>{t.contact.address}</p>
            {t.contact.hours.map((h, i) => (
              <p key={i}>
                {l(h.days)} · {h.time}
              </p>
            ))}
          </div>
          <nav aria-label="Footer" className="flex flex-col items-start">
            {s.nav.map((n) => (
              <Link key={n.href} href={n.href} className={`${o} inline-flex min-h-10 items-center text-[15px] tracking-[0.1em] hover:text-white`}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="border-t border-[#4A423D] px-5 py-5 text-center text-[13px] text-[#BFB3A5]">{l(UI.disclaimer)}</p>
      </footer>
    </div>
  );
}

function Closing(props: SiteProps) {
  const s = site(props);
  const { t } = props;
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
      <div className="flex flex-col items-start gap-6 border-y-2 border-[#2A2826] py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className={`${o} text-4xl font-semibold`}>{s.l(t.home.closing.title)}</h2>
          <p className={`mt-2 text-[17px] ${soft}`}>{s.l(t.home.closing.text)}</p>
        </div>
        <Link href={s.href("dat-lich")} className={btnDark}>
          {s.l(t.bookLabel)}
        </Link>
      </div>
    </section>
  );
}
