import { Clock, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoNav, DemoPhone } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { fontVelvet, fontVelvetSans, site, type SiteProps } from "./shared";

// Mẫu 6 — Velvet: lash & brow. Blush / ngà / mận, Playfair nghiêng cỡ lớn + Josefin Sans in hoa,
// khung oval, nút viên thuốc, nền blush xen ngà.
const serif = fontVelvet.className;
const sans = fontVelvetSans.className;
const plum = "text-[#3F1D2E]";
const soft = "text-[#6B4A57]";
const rose = "text-[#8E4459]"; // hồng đậm cho chữ nhỏ (tương phản ≥ 4.5:1 trên blush)
const label = `${sans} text-[12px] font-semibold uppercase tracking-[0.24em]`;
const btn = `${sans} inline-flex min-h-12 items-center justify-center rounded-full bg-[#3F1D2E] px-8 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#FFF8F5] transition-colors hover:bg-[#5B2C43] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3F1D2E]`;
const btnGhost = `${sans} inline-flex min-h-12 items-center justify-center rounded-full border border-[#3F1D2E]/40 px-8 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#3F1D2E] transition-colors hover:border-[#3F1D2E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3F1D2E]`;

export function VelvetSite(props: SiteProps) {
  const { t, page } = props;
  const s = site(props);
  const { l } = s;

  // Tiêu đề: nửa sau in nghiêng (dấu phẩy hoặc nửa số từ)
  const Title = ({ text, size = "lg" }: { text: string; size?: "lg" | "md" }) => {
    const words = text.split(" ");
    const cut = text.includes(",") ? text.indexOf(",") + 1 : words.slice(0, Math.ceil(words.length / 2)).join(" ").length;
    return (
      <h1 className={`${serif} ${size === "lg" ? "text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem]" : "text-[2.75rem] sm:text-6xl"} leading-[1.02] tracking-[-0.02em]`}>
        {text.slice(0, cut)} <em className="italic text-[#8E4459]">{text.slice(cut).trim()}</em>
      </h1>
    );
  };

  const Head = ({ title, lead }: { title: string; lead: string }) => (
    <section className="px-5 pb-12 pt-14 text-center sm:pt-20">
      <p className={`${label} ${rose}`}>{t.name}</p>
      <div className="mt-4">
        <Title text={title} size="md" />
      </div>
      <p className={`mx-auto mt-4 max-w-md text-[17px] ${soft}`}>{lead}</p>
    </section>
  );

  const Menu = ({ items }: { items: typeof s.featured }) => (
    <ul className="divide-y divide-[#E6C9C1]">
      {items.map((it, i) => (
        <li key={i} className="flex items-baseline gap-4 py-5">
          <span className="min-w-0 flex-1">
            <span className={`${serif} block text-[1.375rem] italic leading-snug`}>{l(it.name)}</span>
            <span className={`${sans} mt-1 block text-[13px] uppercase tracking-[0.14em] ${soft}`}>
              {it.desc ? `${l(it.desc)} · ` : ""}
              {s.dur(it.min)}
            </span>
          </span>
          <span className={`${sans} whitespace-nowrap rounded-full bg-[#FFF8F5] px-3.5 py-1.5 text-[15px] font-semibold`}>{s.price(it.price, it.from)}</span>
        </li>
      ))}
    </ul>
  );

  let body: React.ReactNode;
  if (page === "") {
    body = (
      <>
        <section className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-2 lg:pb-24 lg:pt-16">
          <div>
            <p className={`${label} ${rose}`}>{l(t.home.kicker)}</p>
            <div className="mt-6">
              <Title text={l(t.home.title)} />
            </div>
            <p className={`mt-6 max-w-md text-[18px] ${soft}`}>{l(t.home.lead)}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={s.href("dat-lich")} className={btn}>
                {l(t.bookLabel)}
              </Link>
              <Link href={s.href("dich-vu")} className={btnGhost}>
                {l(t.nav["dich-vu"])}
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="aspect-[3/4] overflow-hidden rounded-[999px] bg-[#EBCFC7]">{s.art(t.home.hero, "", true)}</div>
            <div className="absolute -bottom-4 -left-2 size-32 overflow-hidden rounded-full border-[6px] border-[#F7E9E4] bg-[#EBCFC7] sm:size-40">{s.art(t.gallery.items[1])}</div>
            <p className={`${sans} absolute right-0 top-8 rounded-full bg-[#FFF8F5] px-4 py-2 text-[13px] font-semibold shadow-[0_6px_20px_rgba(63,29,46,0.12)]`}>
              {l(s.featured[0].name)} · {s.price(s.featured[0].price)}
            </p>
          </div>
        </section>

        <section className="bg-[#FFF8F5]">
          <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:py-20">
            <h2 className={`${serif} text-center text-[2.25rem] italic sm:text-5xl`}>{l(t.home.intro.title)}</h2>
            <p className={`mx-auto mt-3 max-w-md text-center text-[17px] ${soft}`}>{l(t.home.intro.text)}</p>
            <ul className="mt-12 grid gap-8 sm:grid-cols-3">
              {t.home.highlights.map((h, i) => (
                <li key={i} className="text-center">
                  <span className={`${serif} mx-auto flex size-14 items-center justify-center rounded-full border border-[#D6A1A1] text-2xl italic ${rose}`}>{i + 1}</span>
                  <h3 className={`${label} mt-5`}>{l(h.title)}</h3>
                  <p className={`mt-2 text-[15px] ${soft}`}>{l(h.text)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <h2 className={`${serif} text-[2.5rem] leading-tight sm:text-6xl`}>
              {l(t.nav["dich-vu"])}
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden rounded-[999px] bg-[#EBCFC7]">{s.art(t.gallery.items[2])}</div>
              <div className="mt-10 aspect-[3/4] overflow-hidden rounded-[999px] bg-[#EBCFC7]">{s.art(t.gallery.items[3])}</div>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Menu items={s.featured} />
            <Link href={s.href("dich-vu")} className={`${btnGhost} mt-8`}>
              {l(UI.allServices)}
            </Link>
          </div>
        </section>
        <Closing {...props} />
      </>
    );
  } else if (page === "dich-vu") {
    body = (
      <>
        <Head title={l(t.services.title)} lead={l(t.services.lead)} />
        <section className="mx-auto grid max-w-[1100px] gap-10 px-5 pb-12 sm:px-8 lg:grid-cols-2 lg:gap-16">
          {t.services.groups.map((g, gi) => (
            <div key={gi} className="rounded-[36px] bg-[#FFF8F5] p-6 sm:p-9">
              <h2 className={`${serif} text-4xl italic`}>{l(g.name)}</h2>
              <Menu items={g.items} />
            </div>
          ))}
        </section>
        <p className={`px-5 pb-6 text-center text-[15px] ${soft}`}>{l(t.services.note)}</p>
        <Closing {...props} />
      </>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <Head title={l(t.about.title)} lead={l(t.about.lead)} />
        <section className="mx-auto grid max-w-[1000px] gap-12 px-5 pb-12 sm:grid-cols-2 sm:px-8">
          {t.about.team.map((m) => (
            <article key={m.name} className="text-center">
              <div className="mx-auto aspect-[3/4] max-w-[320px] overflow-hidden rounded-[999px] bg-[#EBCFC7]">{s.art(m.visual)}</div>
              <h2 className={`${serif} mt-6 text-4xl italic`}>{m.name}</h2>
              <p className={`${label} mt-2 ${rose}`}>{l(m.role)}</p>
              <p className={`mt-2 text-[15px] ${soft}`}>{l(m.bio)}</p>
            </article>
          ))}
        </section>
        <section className="bg-[#FFF8F5]">
          <div className="mx-auto max-w-[1000px] px-5 py-14 text-center sm:px-8">
            <p className={`${serif} text-2xl italic sm:text-3xl`}>{l(t.about.story[0])}</p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-3">
              {t.about.values.map((v, i) => (
                <li key={i}>
                  <h3 className={label}>{l(v.title)}</h3>
                  <p className={`mt-2 text-[15px] ${soft}`}>{l(v.text)}</p>
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
        <Head title={l(t.gallery.title)} lead={l(t.gallery.lead)} />
        <section className="mx-auto max-w-[1100px] px-5 pb-16 sm:px-8">
          <DemoLightbox
            motif={t.motif}
            {...s.gallery}
            gridClass={`grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 lg:grid-cols-3 text-center ${plum}`}
            tileClass="bg-[#EBCFC7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3F1D2E]"
            shapes={["aspect-[3/4] pb-8 [&>button]:rounded-[999px]", "aspect-[3/4] pb-8 [&>button]:rounded-[36px] lg:mt-12", "aspect-[3/4] pb-8 [&>button]:rounded-[999px]"]}
          />
        </section>
        <Closing {...props} />
      </>
    );
  } else {
    body = (
      <>
        <Head title={l(t.contact.title)} lead={l(t.contact.lead)} />
        <section className="mx-auto grid max-w-[1100px] gap-8 px-5 pb-20 sm:px-8 lg:grid-cols-12">
          <div className="rounded-[36px] bg-[#FFF8F5] p-6 sm:p-9 lg:col-span-7">
            <DemoBookingForm
              {...s.form}
              staff={t.about.team.map((m) => m.name)}
              c={{
                field: "mt-2 block min-h-12 w-full rounded-full border border-[#E2C2BA] bg-white px-5 py-3 text-[15px] outline-none focus:border-[#3F1D2E] focus:ring-2 focus:ring-[#F3DCD6] [&:is(textarea)]:rounded-[24px]",
                label: `${label} text-[11px]`,
                chip: `${sans} min-h-11 rounded-full border border-[#E2C2BA] bg-white px-4 text-sm font-semibold transition-colors hover:border-[#3F1D2E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3F1D2E]`,
                chipOn: "!border-[#3F1D2E] !bg-[#3F1D2E] text-[#FFF8F5]",
                submit: btn,
                notice: "rounded-[28px] bg-[#F3DCD6] p-6",
              }}
            />
          </div>
          <aside className="flex flex-col gap-6 lg:col-span-5">
            <div className="mx-auto aspect-[3/4] w-full max-w-[300px] overflow-hidden rounded-[999px] bg-[#EBCFC7]">{s.art(t.gallery.items[0])}</div>
            <div className="space-y-3 text-center text-[15px]">
              <p className="flex items-center justify-center gap-2">
                <MapPin className={`size-4 ${rose}`} aria-hidden />
                {t.contact.address}
              </p>
              {t.contact.hours.map((h, i) => (
                <p key={i} className="flex items-center justify-center gap-2">
                  <Clock className={`size-4 ${rose}`} aria-hidden />
                  {l(h.days)} · {h.time}
                </p>
              ))}
              <DemoPhone phone={t.contact.phone} note={l(UI.form.callDemo)} className="mx-auto font-semibold" />
            </div>
          </aside>
        </section>
      </>
    );
  }

  return (
    <div className={`bg-[#F7E9E4] ${plum} ${sans}`}>
      <DemoNav
        brand={
          <Link href={s.href("")} className={`${serif} flex min-h-11 items-center text-[2rem] italic leading-none`}>
            Velvet<span className="text-[#C98A8A]">.</span>
          </Link>
        }
        items={s.nav}
        cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
        menuLabel={l(UI.menu)}
        closeLabel={l(UI.close)}
        c={{
          header: "bg-[#F7E9E4]/95 backdrop-blur",
          inner: "h-[76px] max-w-[1200px] px-5 sm:px-8",
          link: `${sans} rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#6B4A57] hover:text-[#3F1D2E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3F1D2E]`,
          active: "!bg-[#FFF8F5] !text-[#3F1D2E]",
          cta: `${btn} !min-h-11 !px-6 !text-[11px]`,
          burger: "rounded-full bg-[#FFF8F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3F1D2E]",
          panel: "bg-[#F7E9E4] px-2 pb-2",
          panelLink: `${serif} flex min-h-12 items-center rounded-full px-4 text-2xl italic`,
        }}
      />
      <main>{body}</main>
      <footer className="bg-[#3F1D2E] text-[#F3DCD6]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 px-5 py-14 text-center sm:px-8">
          <p className={`${serif} text-5xl italic text-[#FFF8F5]`}>Velvet.</p>
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
        <p className="border-t border-white/15 px-5 py-5 text-center text-[13px] text-[#E2C2BA]">{l(UI.disclaimer)}</p>
      </footer>
    </div>
  );
}

function Closing(props: SiteProps) {
  const s = site(props);
  const { t } = props;
  return (
    <section className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-[1000px] rounded-[48px] bg-[#EBCFC7] px-6 py-14 text-center">
        <h2 className={`${serif} text-[2.25rem] italic leading-tight sm:text-5xl`}>{s.l(t.home.closing.title)}</h2>
        <p className={`mt-3 text-[17px] ${soft}`}>{s.l(t.home.closing.text)}</p>
        <Link href={s.href("dat-lich")} className={`${btn} mt-8`}>
          {s.l(t.bookLabel)}
        </Link>
      </div>
    </section>
  );
}
