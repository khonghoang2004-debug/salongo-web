import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoNav, DemoPhone } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { fontAurel, fontAurelSans, site, type SiteProps } from "./shared";

// Mẫu 8 — Aurel: makeup & beauty boutique. Xanh lục bảo xen nền kem, viền vàng mảnh, monogram,
// bố cục đối xứng căn giữa, Fraunces mảnh + Montserrat in hoa giãn chữ.
const serif = fontAurel.className;
const sans = fontAurelSans.className;
const soft = "text-[#4A5A53]";
const goldLight = "text-[#D9BC85]"; // trên nền lục bảo
const goldDark = "text-[#7A5E2E]"; // trên nền kem
const label = `${sans} text-[11px] font-medium uppercase tracking-[0.32em]`;
const btnGold = `${sans} inline-flex min-h-12 items-center justify-center border border-[#D9BC85] px-8 text-[12px] font-semibold uppercase tracking-[0.24em] text-[#F5EFE4] transition-colors hover:bg-[#D9BC85] hover:text-[#1E3A32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9BC85]`;
const btnDark = `${sans} inline-flex min-h-12 items-center justify-center bg-[#1E3A32] px-8 text-[12px] font-semibold uppercase tracking-[0.24em] text-[#F5EFE4] transition-colors hover:bg-[#2A4A40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A32]`;

const Diamond = ({ className = "" }: { className?: string }) => <span aria-hidden className={`inline-block size-1.5 rotate-45 bg-[#B8955A] ${className}`} />;

export function AurelSite(props: SiteProps) {
  const { t, page } = props;
  const s = site(props);
  const { l } = s;

  const Monogram = ({ size = "size-16" }: { size?: string }) => (
    <span aria-hidden className={`${serif} mx-auto flex ${size} items-center justify-center rounded-full border border-[#B8955A] text-2xl italic ${goldLight}`}>
      A
    </span>
  );

  const Head = ({ title, lead }: { title: string; lead: string }) => (
    <section className="bg-[#1E3A32] px-5 pb-14 pt-14 text-center text-[#F5EFE4] sm:pt-20">
      <Monogram size="size-12" />
      <h1 className={`${serif} mx-auto mt-6 max-w-3xl text-[2.75rem] font-light leading-[1.08] sm:text-6xl`}>{title}</h1>
      <p className={`${label} mt-5 ${goldLight}`}>{lead}</p>
    </section>
  );

  const Divider = () => (
    <div className="flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-16 bg-[#B8955A]" />
      <Diamond />
      <span className="h-px w-16 bg-[#B8955A]" />
    </div>
  );

  const Services = ({ groups }: { groups: typeof t.services.groups }) => (
    <div className="grid gap-12 md:grid-cols-2 md:gap-16">
      {groups.map((g, gi) => (
        <div key={gi}>
          <h3 className={`${label} text-center ${goldDark}`}>{l(g.name)}</h3>
          <ul className="mt-5">
            {g.items.map((it, i) => (
              <li key={i} className="border-b border-[#D9CBB2] py-5 text-center last:border-0">
                <p className={`${serif} text-[1.5rem] font-light leading-snug`}>{l(it.name)}</p>
                <p className={`${sans} mt-2 text-[13px] uppercase tracking-[0.16em] ${soft}`}>
                  {it.desc ? `${l(it.desc)} · ` : ""}
                  {s.dur(it.min)} · <span className="font-semibold text-[#1E3A32]">{s.price(it.price, it.from)}</span>
                </p>
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
        <section className="bg-[#1E3A32] px-5 pb-0 pt-14 text-center text-[#F5EFE4] sm:pt-20">
          <Monogram />
          <p className={`${label} mt-6 ${goldLight}`}>{l(t.home.kicker)}</p>
          <h1 className={`${serif} mx-auto mt-5 max-w-4xl text-[2.875rem] font-light leading-[1.05] tracking-[-0.01em] sm:text-7xl lg:text-[5.25rem]`}>{l(t.home.title)}</h1>
          <p className="mx-auto mt-6 max-w-md text-[17px] text-[#DCE3DE]">{l(t.home.lead)}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href={s.href("dat-lich")} className={`${btnGold} !bg-[#D9BC85] !text-[#1E3A32] hover:!bg-[#E6CFA0]`}>
              {l(t.bookLabel)}
            </Link>
            <Link href={s.href("dich-vu")} className={btnGold}>
              {l(t.nav["dich-vu"])}
            </Link>
          </div>
          <div className="relative mx-auto mt-14 max-w-[520px] translate-y-16 p-3 sm:mt-16">
            <div className="absolute inset-0 rounded-t-full border border-[#B8955A]" aria-hidden />
            <div className="aspect-[4/5] overflow-hidden rounded-t-full bg-[#2A4A40]">{s.art(t.home.hero, "", true)}</div>
          </div>
        </section>
        <section className="px-5 pb-16 pt-28 text-center sm:pt-32">
          <Divider />
          <h2 className={`${serif} mx-auto mt-6 max-w-2xl text-[2.25rem] font-light leading-tight sm:text-5xl`}>{l(t.home.intro.title)}</h2>
          <p className={`mx-auto mt-4 max-w-md text-[17px] ${soft}`}>{l(t.home.intro.text)}</p>
          <ul className="mx-auto mt-12 grid max-w-[1000px] gap-10 sm:grid-cols-3">
            {t.home.highlights.map((h, i) => (
              <li key={i}>
                <Diamond />
                <h3 className={`${label} mt-4 text-[#1E3A32]`}>{l(h.title)}</h3>
                <p className={`mt-2 text-[15px] ${soft}`}>{l(h.text)}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="border-y border-[#D9CBB2] bg-[#EFE6D6]">
          <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
            <h2 className={`${serif} text-center text-4xl font-light italic sm:text-5xl`}>{l(t.nav["dich-vu"])}</h2>
            <div className="mt-10">
              <Services groups={[{ name: t.services.groups[0].name, items: s.featured }]} />
            </div>
            <div className="mt-10 text-center">
              <Link href={s.href("dich-vu")} className={btnDark}>
                {l(UI.allServices)}
              </Link>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
            {t.gallery.items.slice(0, 3).map((g, i) => (
              <figure key={i} className={`text-center ${i === 2 ? "hidden sm:block" : ""}`}>
                <div className="border border-[#B8955A] p-2">
                  <div className="aspect-[3/4] overflow-hidden bg-[#E7DCC8]">{s.art(g)}</div>
                </div>
                <figcaption className={`${label} mt-3 ${goldDark}`}>{l(g.alt)}</figcaption>
              </figure>
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
        <section className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
          <Services groups={t.services.groups} />
          <p className={`mt-10 text-center text-[15px] ${soft}`}>{l(t.services.note)}</p>
        </section>
        <Closing {...props} />
      </>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <Head title={l(t.about.title)} lead={l(t.about.lead)} />
        <section className="mx-auto max-w-[900px] px-5 py-16 text-center sm:px-8">
          <Divider />
          <p className={`${serif} mt-6 text-2xl font-light leading-relaxed sm:text-3xl`}>{l(t.about.story[0])}</p>
        </section>
        <section className="mx-auto grid max-w-[900px] gap-12 px-5 pb-16 sm:grid-cols-2 sm:px-8">
          {t.about.team.map((m) => (
            <article key={m.name} className="text-center">
              <div className="mx-auto max-w-[300px] border border-[#B8955A] p-2">
                <div className="aspect-[3/4] overflow-hidden rounded-t-full bg-[#E7DCC8]">{s.art(m.visual)}</div>
              </div>
              <h2 className={`${serif} mt-6 text-4xl font-light italic`}>{m.name}</h2>
              <p className={`${label} mt-2 ${goldDark}`}>{l(m.role)}</p>
              <p className={`mt-3 text-[15px] ${soft}`}>{l(m.bio)}</p>
            </article>
          ))}
        </section>
        <section className="bg-[#1E3A32] text-[#F5EFE4]">
          <ul className="mx-auto grid max-w-[1000px] gap-8 px-5 py-14 text-center sm:grid-cols-3 sm:px-8">
            {t.about.values.map((v, i) => (
              <li key={i}>
                <Diamond />
                <h3 className={`${serif} mt-3 text-2xl font-light italic`}>{l(v.title)}</h3>
                <p className="mt-1 text-[15px] text-[#DCE3DE]">{l(v.text)}</p>
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
        <section className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
          <DemoLightbox
            motif={t.motif}
            {...s.gallery}
            gridClass="grid grid-cols-2 gap-x-4 gap-y-8 text-center sm:gap-x-6 lg:grid-cols-3 [&_p]:uppercase [&_p]:tracking-[0.2em] [&_p]:text-[11px]"
            tileClass="border border-[#B8955A] bg-[#E7DCC8] p-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A32]"
            shapes={["aspect-[3/4] pb-8", "aspect-[3/4] pb-8 [&>button]:rounded-t-full", "aspect-[3/4] pb-8"]}
          />
        </section>
        <Closing {...props} />
      </>
    );
  } else {
    body = (
      <>
        <Head title={l(t.contact.title)} lead={l(t.contact.lead)} />
        <section className="mx-auto grid max-w-[1100px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12">
          <div className="border border-[#B8955A] p-2 lg:col-span-8">
            <div className="bg-[#FBF7F0] p-5 sm:p-8">
              <DemoBookingForm
                {...s.form}
                staff={t.about.team.map((m) => m.name)}
                c={{
                  field: "mt-2 block min-h-12 w-full border border-[#D9CBB2] bg-white px-4 py-3 text-[15px] outline-none focus:border-[#1E3A32]",
                  label: `${label} text-[#1E3A32]`,
                  chip: `${sans} min-h-11 border border-[#D9CBB2] bg-white px-4 text-[13px] font-medium uppercase tracking-[0.12em] transition-colors hover:border-[#1E3A32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1E3A32]`,
                  chipOn: "!border-[#1E3A32] !bg-[#1E3A32] text-[#F5EFE4]",
                  submit: btnDark,
                  notice: "border border-[#B8955A] bg-[#F5EFE4] p-6",
                }}
              />
            </div>
          </div>
          <aside className="space-y-6 text-center text-[15px] lg:col-span-4 lg:pt-6">
            <Monogram size="size-14" />
            <div>
              <p className={`${label} ${goldDark}`}>{l(UI.address)}</p>
              <p className="mt-2">{t.contact.address}</p>
            </div>
            <div>
              <p className={`${label} ${goldDark}`}>{l(UI.hours)}</p>
              {t.contact.hours.map((h, i) => (
                <p key={i} className="mt-2">
                  {l(h.days)} · {h.time}
                </p>
              ))}
            </div>
            <div className="flex flex-col items-center">
              <DemoPhone phone={t.contact.phone} note={l(UI.form.callDemo)} className="font-semibold" />
              <p className={soft}>{t.contact.email}</p>
            </div>
          </aside>
        </section>
      </>
    );
  }

  return (
    <div className={`bg-[#F5EFE4] text-[#1E3A32] ${sans}`}>
      <DemoNav
        brand={
          <Link href={s.href("")} className="flex min-h-11 items-center gap-3 text-[#F5EFE4]">
            <span aria-hidden className={`${serif} flex size-9 items-center justify-center rounded-full border border-[#B8955A] text-lg italic ${goldLight}`}>
              A
            </span>
            <span className={`${sans} text-[15px] font-medium uppercase tracking-[0.4em]`}>Aurel</span>
          </Link>
        }
        items={s.nav}
        cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
        menuLabel={l(UI.menu)}
        closeLabel={l(UI.close)}
        c={{
          header: "border-b border-[#2F5247] bg-[#1E3A32]",
          inner: "h-[72px] max-w-[1200px] px-5 sm:px-8",
          link: `${sans} px-3 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[#DCE3DE] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D9BC85]`,
          active: "!text-[#D9BC85]",
          cta: `${btnGold} !min-h-11 !px-5 !text-[11px]`,
          burger: "border border-[#B8955A] text-[#F5EFE4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9BC85]",
          panel: "border-t border-[#2F5247] bg-[#1E3A32]",
          panelLink: `${serif} flex min-h-12 items-center justify-center text-2xl font-light italic text-[#F5EFE4]`,
        }}
      />
      <main>{body}</main>
      <footer className="bg-[#1E3A32] text-[#DCE3DE]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 px-5 py-14 text-center sm:px-8">
          <Monogram />
          <p className={`${sans} text-xl font-medium uppercase tracking-[0.5em] text-[#F5EFE4]`}>Aurel</p>
          <p className="text-sm">
            {l(t.tagline)} · {t.contact.address}
          </p>
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5">
            {s.nav.map((n) => (
              <Link key={n.href} href={n.href} className={`${label} inline-flex min-h-11 items-center hover:text-white`}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="border-t border-white/15 px-5 py-5 text-center text-[13px] text-[#BFCBC5]">{l(UI.disclaimer)}</p>
      </footer>
    </div>
  );
}

function Closing(props: SiteProps) {
  const s = site(props);
  const { t } = props;
  return (
    <section className="px-5 pb-16 sm:px-8">
      <div className="mx-auto max-w-[900px] border border-[#B8955A] p-2">
        <div className="bg-[#1E3A32] px-6 py-14 text-center text-[#F5EFE4]">
          <h2 className={`${serif} text-[2.25rem] font-light italic leading-tight sm:text-5xl`}>{s.l(t.home.closing.title)}</h2>
          <p className="mt-3 text-[#DCE3DE]">{s.l(t.home.closing.text)}</p>
          <Link href={s.href("dat-lich")} className={`${btnGold} mt-8`}>
            {s.l(t.bookLabel)}
          </Link>
        </div>
      </div>
    </section>
  );
}
