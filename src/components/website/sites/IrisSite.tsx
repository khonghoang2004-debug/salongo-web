import { MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoNav, DemoPhone } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { fontIris, fontIrisSans, site, type SiteProps } from "./shared";

// Mẫu Iris (mi) — học từ Lash House (bảng giá là các thẻ menu màu kem đặt trên nền hoạ tiết lá, tên dịch vụ in hoa serif)
// + Řasy Sokolská (hai chi nhánh thành hai thẻ địa chỉ, nút "Chci se objednat" viền). Hoạ tiết vẽ bằng SVG riêng.
const serif = fontIris.className;
const sans = fontIrisSans.className;
const soft = "text-[#5A4B4F]";
const btn = `${sans} inline-flex min-h-12 items-center justify-center bg-[#5A1E33] px-7 text-[13px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#74283F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A1E33]`;
const btnLine = `${sans} inline-flex min-h-12 items-center justify-center border-2 border-[#2B2226]/70 px-7 text-[13px] font-semibold uppercase tracking-[0.2em] hover:border-[#5A1E33] hover:text-[#5A1E33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A1E33]`;

/** Hoạ tiết lá lặp lại (SVG pattern) — tương phản thấp để thẻ menu kem nổi lên */
function LeafPattern({ id }: { id: string }) {
  return (
    <svg className="absolute inset-0 size-full" aria-hidden>
      <defs>
        <pattern id={id} width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
          <rect width="120" height="120" fill="#1F4E4F" />
          {[
            [20, 20, 30, "#2E6B6A"],
            [80, 30, -40, "#C76B7E"],
            [50, 80, 60, "#E7B9A8"],
            [100, 95, 10, "#2E6B6A"],
            [10, 95, -20, "#8E3A55"],
          ].map(([x, y, r, c], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
              <path d="M0 -22 C 12 -12, 12 12, 0 22 C -12 12, -12 -12, 0 -22Z" fill={c as string} opacity="0.85" />
              <path d="M0 -20 V20" stroke="#1F4E4F" strokeWidth="1.2" opacity="0.6" />
            </g>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function IrisSite(props: SiteProps) {
  const { t, page } = props;
  const s = site(props);
  const { l } = s;

  const MenuCard = ({ g }: { g: (typeof t.services.groups)[number] }) => (
    <div className="relative rounded-2xl bg-[#F6EFE7] px-6 py-7 shadow-[0_10px_30px_rgba(16,40,40,0.35)] sm:px-8">
      <h2 className={`${sans} text-center text-3xl font-bold`}>Ceník</h2>
      <p className={`${serif} mt-1 text-center text-[13px] uppercase tracking-[0.24em] ${soft}`}>{l(g.name)}</p>
      <ul className="mt-5">
        {g.items.map((it, i) => (
          <li key={i} className="flex items-baseline justify-between gap-4 border-b border-[#E3D6C8] py-3 last:border-0">
            <span>
              <span className={`${serif} block text-[15px] font-semibold uppercase tracking-[0.04em]`}>{l(it.name)}</span>
              <span className={`text-[13px] ${soft}`}>• {s.dur(it.min)}</span>
            </span>
            <span className={`${serif} whitespace-nowrap text-[15px] italic`}>{s.price(it.price, it.from)}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const Branches = () => (
    <div className="grid gap-5 md:grid-cols-2">
      {t.about.values.slice(0, 2).map((v, i) => (
        <article key={i} className="bg-white p-7 text-center shadow-[0_10px_30px_rgba(43,34,38,0.08)]">
          <MapPin className="mx-auto size-5 text-[#8E3A55]" aria-hidden />
          <h3 className={`${serif} mt-3 text-2xl`}>{l(v.title)}</h3>
          <p className={`mt-2 text-[15px] ${soft}`}>{l(v.text)}</p>
        </article>
      ))}
    </div>
  );

  let body: React.ReactNode;
  if (page === "") {
    body = (
      <>
        <section className="relative isolate overflow-hidden">
          <LeafPattern id="iris-hero" />
          <div className="relative mx-auto grid max-w-[1160px] items-stretch px-5 py-12 sm:px-8 md:grid-cols-2 md:py-20">
            <div className="flex flex-col items-center justify-center bg-[#F6EFE7]/95 px-6 py-12 text-center md:px-10">
              <p className={`${sans} text-[12px] font-bold uppercase tracking-[0.3em] text-[#1F4E4F]`}>{l(t.home.kicker)}</p>
              <h1 className={`${sans} mt-4 text-[2.5rem] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] sm:text-6xl`}>{t.name}</h1>
              <p className={`${serif} mt-4 text-2xl italic`}>{l(t.home.title)}</p>
              <p className={`mt-3 max-w-sm text-[15px] uppercase tracking-[0.08em] ${soft}`}>Řasy · obočí · laminace</p>
              <Link href={s.href("dat-lich")} className={`${btn} mt-7`}>
                {l(t.bookLabel)}
              </Link>
            </div>
            <div className="hidden aspect-[4/5] bg-[#E7B9A8] md:block">{s.art(t.home.hero, "", true)}</div>
          </div>
          <p className={`${sans} relative bg-[#5A1E33] py-2.5 text-center text-sm font-semibold text-white`}>{l(t.home.lead)}</p>
        </section>

        <section className="mx-auto max-w-[900px] px-5 py-16 text-center sm:px-8">
          <h2 className={`${serif} text-3xl sm:text-4xl`}>{l(t.home.intro.title)}</h2>
          <p className={`mt-4 text-[17px] leading-relaxed ${soft}`}>{l(t.home.intro.text)}</p>
          <ul className="mt-10 grid gap-6 text-left sm:grid-cols-3">
            {t.home.highlights.map((h, i) => (
              <li key={i} className="border-t-2 border-[#C76B7E] pt-4">
                <h3 className={`${serif} text-xl`}>{l(h.title)}</h3>
                <p className={`mt-1 text-[15px] ${soft}`}>{l(h.text)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="relative isolate overflow-hidden">
          <LeafPattern id="iris-menu" />
          <div className="relative mx-auto grid max-w-[1000px] gap-6 px-5 py-14 sm:px-8 md:grid-cols-2">
            <MenuCard g={{ name: t.services.groups[0].name, items: s.featured }} />
            <div className="flex flex-col items-center justify-center gap-4 text-center text-white">
              <p className={`${serif} text-3xl italic`}>{l(t.services.lead)}</p>
              <Link href={s.href("dich-vu")} className={`${btnLine} !border-white !text-white hover:!bg-white hover:!text-[#1F4E4F]`}>
                {l(UI.allServices)}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1000px] px-5 py-16 sm:px-8">
          <h2 className={`${serif} mb-8 text-center text-3xl`}>Máme dvě studia v centru Prahy</h2>
          <Branches />
          <div className="mt-8 text-center">
            <Link href={s.href("dat-lich")} className={btnLine}>
              {l(t.bookLabel)}
            </Link>
          </div>
        </section>
      </>
    );
  } else if (page === "dich-vu") {
    body = (
      <section className="relative isolate overflow-hidden">
        <LeafPattern id="iris-cenik" />
        <div className="relative mx-auto grid max-w-[1000px] gap-6 px-5 py-14 sm:px-8 md:grid-cols-2">
          {t.services.groups.map((g, gi) => (
            <MenuCard key={gi} g={g} />
          ))}
          <p className="text-center text-[15px] font-medium text-white md:col-span-2">{l(t.services.note)}</p>
        </div>
      </section>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <section className="mx-auto max-w-[900px] px-5 py-16 text-center sm:px-8">
          <h1 className={`${serif} text-4xl sm:text-5xl`}>{l(t.about.title)}</h1>
          <p className={`mt-2 uppercase tracking-[0.2em] ${soft} text-[13px]`}>{l(t.about.lead)}</p>
          <p className="mt-6 text-lg leading-relaxed">{l(t.about.story[0])}</p>
        </section>
        <section className="mx-auto grid max-w-[1000px] gap-8 px-5 pb-14 sm:grid-cols-3 sm:px-8">
          {t.about.team.map((m) => (
            <article key={m.name} className="text-center">
              <div className="mx-auto aspect-[3/4] max-w-[260px] overflow-hidden bg-[#E7B9A8]">{s.art(m.visual)}</div>
              <h2 className={`${serif} mt-4 text-2xl`}>{m.name}</h2>
              <p className={`${sans} text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8E3A55]`}>{l(m.role)}</p>
              <p className={`mt-1 text-[15px] ${soft}`}>{l(m.bio)}</p>
            </article>
          ))}
        </section>
        <section className="bg-[#F6EFE7]">
          <div className="mx-auto max-w-[1000px] px-5 py-14 sm:px-8">
            <Branches />
          </div>
        </section>
      </>
    );
  } else if (page === "bo-suu-tap") {
    body = (
      <section className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8">
        <h1 className={`${serif} text-center text-4xl sm:text-5xl`}>{l(t.gallery.title)}</h1>
        <p className={`mt-2 text-center ${soft}`}>{l(t.gallery.lead)}</p>
        <div className="mt-10">
          <DemoLightbox
            motif={t.motif}
            {...s.gallery}
            gridClass="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 md:grid-cols-3"
            tileClass="bg-[#E7B9A8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A1E33]"
            shapes={["aspect-[4/5] pb-8"]}
          />
        </div>
      </section>
    );
  } else {
    body = (
      <section className="relative isolate overflow-hidden">
        <LeafPattern id="iris-rez" />
        <div className="relative mx-auto grid max-w-[1100px] gap-6 px-5 py-14 sm:px-8 lg:grid-cols-12">
          <div className="bg-[#F6EFE7] p-6 sm:p-9 lg:col-span-8">
            <h1 className={`${serif} text-3xl`}>{l(t.contact.title)}</h1>
            <p className={`mt-1 mb-6 ${soft}`}>{l(t.contact.lead)}</p>
            <DemoBookingForm
              {...s.form}
              staff={t.about.team.map((m) => m.name)}
              c={{
                field: "mt-2 block min-h-12 w-full border border-[#D9C8B8] bg-white px-4 py-3 text-[16px] outline-none focus:border-[#5A1E33]",
                label: `${sans} text-[12px] font-bold uppercase tracking-[0.14em]`,
                chip: `${sans} min-h-11 border border-[#D9C8B8] bg-white px-4 text-sm font-semibold hover:border-[#5A1E33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5A1E33]`,
                chipOn: "!border-[#5A1E33] !bg-[#5A1E33] text-white",
                submit: btn,
                notice: "bg-white p-6",
              }}
            />
          </div>
          <aside className="space-y-4 lg:col-span-4">
            {t.about.values.slice(0, 2).map((v, i) => (
              <div key={i} className="bg-white p-5">
                <h2 className={`${serif} text-xl`}>{l(v.title)}</h2>
                <p className={`mt-1 text-[15px] ${soft}`}>{l(v.text)}</p>
              </div>
            ))}
            <div className="bg-white p-5 text-[15px]">
              {t.contact.hours.map((h, i) => (
                <p key={i}>
                  {l(h.days)} · {h.time}
                </p>
              ))}
              <DemoPhone phone={t.contact.phone} note={l(UI.form.callDemo)} className="mt-2 font-semibold" />
            </div>
          </aside>
        </div>
      </section>
    );
  }

  return (
    <div className={`bg-white text-[#2B2226] ${sans}`}>
      <DemoNav
        brand={
          <Link href={s.href("")} className="flex min-h-11 flex-col justify-center leading-none">
            <span className={`${sans} text-2xl font-extrabold uppercase tracking-[0.18em]`}>Iris</span>
            <span className={`${serif} text-[11px] italic tracking-[0.1em] ${soft}`}>lash studio</span>
          </Link>
        }
        items={s.nav}
        cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
        menuLabel={l(UI.menu)}
        closeLabel={l(UI.close)}
        c={{
          header: "border-b border-[#EADBD0] bg-white",
          inner: "h-[72px] max-w-[1160px] px-5 sm:px-8",
          link: `${sans} px-3 py-2 text-[14px] font-semibold text-[#2B2226] hover:text-[#8E3A55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5A1E33]`,
          active: "!text-[#8E3A55] underline underline-offset-8",
          cta: `${btn} !min-h-11 !px-4 !text-[12px]`,
          burger: "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5A1E33]",
          panel: "border-t border-[#EADBD0] bg-white",
          panelLink: `${serif} flex min-h-12 items-center px-5 text-xl`,
        }}
      />
      <main>{body}</main>
      <footer className="bg-[#E7CDBF] text-[#2B2226]">
        <div className="mx-auto grid max-w-[1160px] gap-6 px-5 py-10 text-[15px] sm:px-8 md:grid-cols-4">
          <p className={`${sans} text-2xl font-extrabold uppercase tracking-[0.18em]`}>Iris</p>
          {t.about.values.slice(0, 2).map((v, i) => (
            <div key={i}>
              <p className={`${sans} text-[13px] font-bold uppercase tracking-[0.12em] text-[#5A1E33]`}>{l(v.title)}</p>
              <p>{l(v.text)}</p>
            </div>
          ))}
          <nav aria-label="Footer" className="flex flex-col items-start">
            {s.nav.map((n) => (
              <Link key={n.href} href={n.href} className="inline-flex min-h-10 items-center font-semibold hover:underline">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="border-t border-[#2B2226]/15 px-5 py-5 text-center text-[13px]">{l(UI.disclaimer)}</p>
      </footer>
    </div>
  );
}
