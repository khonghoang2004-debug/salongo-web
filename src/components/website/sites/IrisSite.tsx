import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoNav, DemoPhone } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { fontLumenSans, fontNova, site, type SiteProps } from "./shared";

// Mẫu Iris (mi & mày) — làm lại 02/11/2026 theo kiểu "quiet luxury" đang thịnh: ảnh tràn màn đầu, chữ serif nghiêng
// lớn trắng trên ảnh, nền trắng ấm / greige, đường kẻ mảnh, chữ nhỏ in hoa giãn rộng, một màu nhấn taupe hồng.
// Vẫn giữ ý từ Řasy Sokolská: bảng giá rõ ràng và hai chi nhánh. Bỏ nền hoạ tiết lá cũ.
const serif = `${fontNova.className}`;
const sans = fontLumenSans.className; // Inter Tight
const soft = "text-[#6B6560]";
const cap = "text-[11px] font-medium uppercase tracking-[0.24em]";
const btnLight = `${cap} inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-[#1C1A19] hover:bg-[#F1ECE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`;
const btnDark = `${cap} inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1C1A19] px-7 text-white hover:bg-[#3A3532] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1A19]`;
const link = `${cap} inline-flex min-h-11 items-center gap-2 border-b border-[#1C1A19]/30 hover:border-[#1C1A19] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1C1A19]`;

export function IrisSite(props: SiteProps) {
  const { t, page } = props;
  const s = site(props);
  const { l } = s;

  const Head = ({ title, lead }: { title: string; lead: string }) => (
    <section className="mx-auto max-w-[1200px] px-5 pb-10 pt-14 sm:px-8 sm:pt-20">
      <p className={`${cap} ${soft}`}>
        {t.name} — {lead}
      </p>
      <h1 className={`${serif} mt-4 text-[3rem] font-light italic leading-[1] tracking-[-0.02em] sm:text-7xl`}>{title}</h1>
      <div className="mt-8 h-px bg-[#E9E4DF]" />
    </section>
  );

  const PriceTable = ({ groups }: { groups: typeof t.services.groups }) => (
    <div className="grid gap-x-16 gap-y-10 md:grid-cols-2">
      {groups.map((g, gi) => (
        <div key={gi}>
          <h3 className={`${cap} text-[#9A7563]`}>{l(g.name)}</h3>
          <ul className="mt-3">
            {g.items.map((it, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#E9E4DF] py-4">
                <span className="min-w-0 flex-1">
                  <span className={`${serif} block text-[1.375rem] leading-tight`}>{l(it.name)}</span>
                  <span className={`text-[13px] ${soft}`}>{s.dur(it.min)}</span>
                </span>
                <span className="whitespace-nowrap text-[15px] font-medium tabular-nums">{s.price(it.price, it.from)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const Branches = () => (
    <div className="grid gap-5 md:grid-cols-2">
      {t.about.values.slice(0, 2).map((v, i) => (
        <article key={i} className="group overflow-hidden rounded-[20px] bg-white">
          <div className="aspect-[16/10] overflow-hidden bg-[#EFE9E4]">{s.art(t.gallery.items[i + 4] ?? t.gallery.items[0], "transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none")}</div>
          <div className="flex items-start gap-3 p-6">
            <MapPin className="mt-1 size-4 shrink-0 text-[#9A7563]" aria-hidden />
            <div>
              <h3 className={`${serif} text-2xl`}>{l(v.title)}</h3>
              <p className={`mt-1 text-[15px] ${soft}`}>{l(v.text)}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  let body: React.ReactNode;
  if (page === "") {
    body = (
      <>
        <section className="relative isolate min-h-[78vh] overflow-hidden bg-[#2B2725] text-white sm:min-h-[640px]">
          <div className="absolute inset-0 -z-10">{s.art(t.home.hero, "", true)}</div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/20 to-black/10" aria-hidden />
          <div className="mx-auto flex min-h-[78vh] max-w-[1200px] flex-col justify-end px-5 pb-12 sm:min-h-[640px] sm:px-8 sm:pb-16">
            <p className={`${cap} text-white/80`}>{l(t.home.kicker)}</p>
            <h1 className={`${serif} mt-4 max-w-3xl text-[3.25rem] font-light leading-[0.98] tracking-[-0.02em] sm:text-[5.5rem]`}>
              {l(t.home.title).split(" ").slice(0, -2).join(" ")} <em className="italic">{l(t.home.title).split(" ").slice(-2).join(" ")}</em>
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href={s.href("dat-lich")} className={btnLight}>
                {l(t.bookLabel)}
              </Link>
              <Link href={s.href("dich-vu")} className={`${cap} inline-flex min-h-11 items-center gap-2 text-white hover:underline`}>
                {l(t.nav["dich-vu"])}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1200px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-28">
          <p className={`${serif} text-[2rem] font-light leading-snug sm:text-[2.5rem] lg:col-span-7`}>{l(t.home.intro.text)}</p>
          <ol className="lg:col-span-4 lg:col-start-9">
            {t.home.highlights.map((h, i) => (
              <li key={i} className="grid grid-cols-[40px_1fr] border-t border-[#E9E4DF] py-5">
                <span className={`${serif} text-lg italic text-[#9A7563]`}>0{i + 1}</span>
                <span>
                  <span className="block font-medium">{l(h.title)}</span>
                  <span className={`text-[15px] ${soft}`}>{l(h.text)}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-[#F3EFEB]">
          <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className={`${serif} text-5xl font-light italic sm:text-6xl`}>{l(t.services.title)}</h2>
              <Link href={s.href("dich-vu")} className={link}>
                {l(UI.allServices)}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <div className="mt-10">
              <PriceTable groups={[{ name: t.services.groups[0].name, items: s.featured.slice(0, 2) }, { name: t.services.groups[1].name, items: s.featured.slice(2) }]} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-24">
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {t.gallery.items.slice(0, 4).map((g, i) => (
              <li key={i} className={i % 2 ? "lg:mt-12" : ""}>
                <div className="aspect-[3/4] overflow-hidden rounded-[20px] bg-[#EFE9E4]">{s.art(g)}</div>
                <p className={`${cap} mt-3 ${soft}`}>{l(g.alt)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-8">
          <h2 className={`${serif} mb-8 text-4xl font-light italic`}>Dvě studia v centru Prahy</h2>
          <Branches />
        </section>
        <Closing {...props} />
      </>
    );
  } else if (page === "dich-vu") {
    body = (
      <>
        <Head title={l(t.services.title)} lead={l(t.services.lead)} />
        <section className="mx-auto max-w-[1200px] px-5 pb-14 sm:px-8">
          <PriceTable groups={t.services.groups} />
          <p className={`mt-8 text-sm ${soft}`}>{l(t.services.note)}</p>
        </section>
        <Closing {...props} />
      </>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <Head title={l(t.about.title)} lead={l(t.about.lead)} />
        <section className="mx-auto max-w-[1200px] px-5 pb-14 sm:px-8">
          <p className={`${serif} max-w-3xl text-[1.75rem] font-light leading-snug`}>{l(t.about.story[0])}</p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {t.about.team.map((m) => (
              <li key={m.name}>
                <div className="aspect-[4/5] overflow-hidden rounded-[20px] bg-[#EFE9E4]">{s.art(m.visual)}</div>
                <h2 className={`${serif} mt-4 text-2xl`}>{m.name}</h2>
                <p className={`${cap} mt-1 text-[#9A7563]`}>{l(m.role)}</p>
                <p className={`mt-1 text-[15px] ${soft}`}>{l(m.bio)}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-[#F3EFEB]">
          <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8">
            <Branches />
          </div>
        </section>
      </>
    );
  } else if (page === "bo-suu-tap") {
    body = (
      <>
        <Head title={l(t.gallery.title)} lead={l(t.gallery.lead)} />
        <section className="mx-auto max-w-[1200px] px-5 pb-16 sm:px-8">
          <DemoLightbox
            motif={t.motif}
            {...s.gallery}
            gridClass="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 [&_p]:text-[11px] [&_p]:uppercase [&_p]:tracking-[0.2em]"
            tileClass="rounded-[20px] bg-[#EFE9E4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1A19]"
            shapes={["aspect-[3/4] pb-8", "aspect-[3/4] pb-8 md:mt-12", "aspect-[3/4] pb-8"]}
          />
        </section>
        <Closing {...props} />
      </>
    );
  } else {
    body = (
      <>
        <Head title={l(t.contact.title)} lead={l(t.contact.lead)} />
        <section className="mx-auto grid max-w-[1200px] gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <DemoBookingForm
              {...s.form}
              staff={t.about.team.map((m) => m.name)}
              c={{
                field: "mt-2 block min-h-12 w-full border-0 border-b border-[#D9D2CB] bg-transparent px-0 py-3 text-[17px] outline-none focus:border-[#1C1A19]",
                label: `${cap} ${soft}`,
                chip: `${cap} min-h-11 rounded-full border border-[#D9D2CB] px-4 hover:border-[#1C1A19] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1C1A19]`,
                chipOn: "!border-[#1C1A19] bg-[#1C1A19] text-white",
                submit: btnDark,
                notice: "rounded-[20px] bg-[#F3EFEB] p-6",
              }}
            />
          </div>
          <aside className="space-y-4 lg:col-span-4 lg:col-start-9">
            {t.about.values.slice(0, 2).map((v, i) => (
              <div key={i} className="border-t border-[#E9E4DF] pt-4">
                <h2 className={`${serif} text-xl`}>{l(v.title)}</h2>
                <p className={`mt-1 text-[15px] ${soft}`}>{l(v.text)}</p>
              </div>
            ))}
            <div className="border-t border-[#E9E4DF] pt-4 text-[15px]">
              {t.contact.hours.map((h, i) => (
                <p key={i}>
                  {l(h.days)} · {h.time}
                </p>
              ))}
              <DemoPhone phone={t.contact.phone} note={l(UI.form.callDemo)} className="mt-2 font-medium" />
            </div>
          </aside>
        </section>
      </>
    );
  }

  return (
    <div className={`bg-[#FBFAF8] text-[#1C1A19] ${sans}`}>
      <DemoNav
        brand={
          <Link href={s.href("")} className={`${serif} flex min-h-11 items-center text-[1.75rem] italic`}>
            Iris
          </Link>
        }
        items={s.nav}
        cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
        menuLabel={l(UI.menu)}
        closeLabel={l(UI.close)}
        c={{
          header: "border-b border-[#E9E4DF] bg-[#FBFAF8]/90 backdrop-blur",
          inner: "h-[68px] max-w-[1200px] px-5 sm:px-8",
          link: `${cap} px-3 py-2 ${soft} hover:text-[#1C1A19] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1C1A19]`,
          active: "!text-[#1C1A19]",
          cta: `${btnDark} !min-h-11 !px-5`,
          burger: "rounded-full border border-[#D9D2CB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1C1A19]",
          panel: "border-t border-[#E9E4DF] bg-[#FBFAF8]",
          panelLink: `${serif} flex min-h-12 items-center px-5 text-2xl italic`,
        }}
      />
      <main>{body}</main>
      <footer className="bg-[#1C1A19] text-[#D9D2CB]">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-14 sm:px-8 md:grid-cols-4">
          <p className={`${serif} text-4xl italic text-white`}>Iris</p>
          {t.about.values.slice(0, 2).map((v, i) => (
            <div key={i} className="text-[15px]">
              <p className={`${cap} text-[#C4A99A]`}>{l(v.title)}</p>
              <p className="mt-1">{l(v.text)}</p>
            </div>
          ))}
          <nav aria-label="Footer" className="flex flex-col items-start">
            {s.nav.map((n) => (
              <Link key={n.href} href={n.href} className={`${cap} inline-flex min-h-10 items-center hover:text-white`}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="border-t border-white/10 px-5 py-5 text-center text-[13px] text-[#A8A09A]">{l(UI.disclaimer)}</p>
      </footer>
    </div>
  );
}

function Closing(props: SiteProps) {
  const s = site(props);
  const { t } = props;
  return (
    <section className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-6 border-t border-[#E9E4DF] pt-10 sm:flex-row sm:items-end">
        <h2 className={`${serif} text-4xl font-light italic sm:text-5xl`}>{s.l(t.home.closing.title)}</h2>
        <Link href={s.href("dat-lich")} className={btnDark}>
          {s.l(t.bookLabel)}
        </Link>
      </div>
    </section>
  );
}
