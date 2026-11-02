import { ArrowRight, Heart } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoNav, DemoPhone } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { fontKora, site, type SiteProps } from "./shared";

// Mẫu Kora (da & mày) — học từ SkinArth: xanh rừng + xám xanh, ô danh mục dạng tile, 4 bước "lần đầu đến salon" có số,
// bảng giá theo nhóm có cột thời gian + giá trong khung viền, câu hỏi thường gặp dạng lưới, nút có icon tim.
const f = fontKora.className;
const green = "#1E352B";
const soft = "text-[#5B6660]";
const btn = "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1E352B] px-6 text-[15px] font-medium text-white hover:bg-[#2C4A3D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352B]";
const tiles = ["#C7CDC9", "#8E9B94", "#566A60", "#1E352B"];

export function KoraSite(props: SiteProps) {
  const { t, page } = props;
  const s = site(props);
  const { l } = s;

  const Steps = () => (
    <ol className="grid gap-4 md:grid-cols-4">
      {t.home.highlights.map((h, i) => (
        <li key={i} className="relative">
          <p className={`text-center text-[13px] font-medium ${soft}`}>Krok {i + 1}</p>
          <span className="mx-auto mt-2 flex size-10 items-center justify-center rounded-full bg-[#1E352B] font-semibold text-white">{i + 1}</span>
          <div className="mt-3 rounded-2xl bg-[#1E352B] p-5 text-center text-white">
            <h3 className="font-semibold">{l(h.title)}</h3>
            <p className="mt-1 text-[15px] text-white/80">{l(h.text)}</p>
          </div>
        </li>
      ))}
    </ol>
  );

  const PriceBox = ({ g }: { g: (typeof t.services.groups)[number] }) => (
    <fieldset className="rounded-2xl border border-[#C7CDC9] px-5 pb-3 pt-1">
      <legend className="mx-auto px-3 text-lg font-semibold uppercase tracking-[0.06em]">{l(g.name)}</legend>
      <ul>
        {g.items.map((it, i) => (
          <li key={i} className="grid grid-cols-[1fr_auto_auto] items-baseline gap-4 border-b border-[#E4E8E5] py-3 text-[15px] last:border-0">
            <span>{l(it.name)}</span>
            <span className={`text-[13px] ${soft}`}>{s.dur(it.min)}</span>
            <span className="whitespace-nowrap font-semibold">{s.price(it.price, it.from)}</span>
          </li>
        ))}
      </ul>
    </fieldset>
  );

  const Faq = () => (
    <div className="grid gap-3 md:grid-cols-3">
      {t.about.values.map((q, i) => (
        <details key={i} className="group rounded-2xl border border-[#C7CDC9] bg-white px-5">
          <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 py-3 text-[15px] font-medium [&::-webkit-details-marker]:hidden">
            <span className="text-xl leading-none text-[#1E352B] transition-transform group-open:rotate-45" aria-hidden>
              +
            </span>
            {l(q.title)}
          </summary>
          <p className={`pb-4 text-[15px] ${soft}`}>{l(q.text)}</p>
        </details>
      ))}
    </div>
  );

  const Wave = ({ flip }: { flip?: boolean }) => (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className={`block h-8 w-full sm:h-12 ${flip ? "rotate-180" : ""}`} aria-hidden>
      <path d="M0 60 C 360 0 1080 0 1440 60 Z" fill={green} />
    </svg>
  );

  let body: React.ReactNode;
  if (page === "") {
    body = (
      <>
        <section className="relative isolate overflow-hidden bg-[#8E9B94]">
          <div className="absolute inset-0 -z-10">{s.art(t.home.hero, "", true)}</div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1E352B]/75 via-[#1E352B]/40 to-transparent" aria-hidden />
          <div className="mx-auto max-w-[1160px] px-5 pb-24 pt-20 text-white sm:px-8 sm:pt-28">
            <p className="text-5xl font-bold leading-[0.9] tracking-[-0.04em] sm:text-7xl">
              {t.name}
              <span className="ml-1 align-top text-xs font-medium tracking-normal">studio</span>
            </p>
            <h1 className="mt-6 max-w-xl text-2xl font-bold leading-snug sm:text-3xl">
              {l(t.home.title)} <span className="font-normal">v Praze</span>
            </h1>
            <Link href={s.href("dat-lich")} className={`${btn} mt-7 !bg-white !text-[#1E352B] hover:!bg-[#E4E8E5]`}>
              <Heart className="size-4" aria-hidden />
              {l(t.bookLabel)}
            </Link>
          </div>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute bottom-0 block h-10 w-full" aria-hidden>
            <path d="M0 60 C 360 0 1080 0 1440 60 Z" fill="#fff" />
          </svg>
        </section>

        <section className="mx-auto max-w-[1000px] px-5 py-14 sm:px-8">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {t.services.groups.map((g, i) => (
              <li key={i}>
                <Link href={s.href("dich-vu")} className="group block text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E352B]">
                  <span className="mx-auto flex aspect-square max-w-[150px] items-center justify-center rounded-2xl text-2xl font-bold leading-[0.9] text-white transition-transform group-hover:-translate-y-1 motion-reduce:transition-none" style={{ backgroundColor: tiles[i % tiles.length] }}>
                    {t.name}
                  </span>
                  <span className="mt-2 block text-[15px] font-medium">{l(g.name)}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href={s.href("dat-lich")} className="group block text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E352B]">
                <span className="mx-auto flex aspect-square max-w-[150px] items-center justify-center rounded-2xl bg-[#1E352B] text-white">
                  <Heart className="size-8" aria-hidden />
                </span>
                <span className="mt-2 block text-[15px] font-medium">{l(t.bookLabel)}</span>
              </Link>
            </li>
          </ul>
        </section>

        <Wave />
        <section className="bg-[#1E352B] text-white">
          <div className="mx-auto max-w-[1100px] px-5 py-12 sm:px-8">
            <h2 className="text-center text-2xl font-semibold sm:text-3xl">{l(t.home.intro.title)}</h2>
            <p className="mt-2 text-center text-white/80">{l(t.home.intro.text)}</p>
            <div className="mt-10 [&_li>div]:!bg-white/10 [&_li>span]:!bg-white [&_li>span]:!text-[#1E352B] [&_p]:!text-white/80">
              <Steps />
            </div>
          </div>
        </section>
        <Wave flip />

        <section className="mx-auto max-w-[1000px] px-5 py-14 sm:px-8">
          <h2 className="text-center text-2xl font-semibold sm:text-3xl">Kolik stojí krása, která vydrží</h2>
          <p className={`mt-2 text-center ${soft}`}>{l(t.services.lead)}</p>
          <div className="mt-8">
            <PriceBox g={{ name: t.services.title, items: s.featured }} />
          </div>
          <div className="mt-6 text-center">
            <Link href={s.href("dich-vu")} className={btn}>
              {l(UI.allServices)}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-5 pb-16 sm:px-8">
          <h2 className="mb-6 text-center text-2xl font-semibold">Vy se ptáte, my odpovídáme</h2>
          <Faq />
        </section>
      </>
    );
  } else if (page === "dich-vu") {
    body = (
      <section className="mx-auto max-w-[900px] px-5 py-14 sm:px-8">
        <h1 className="text-center text-3xl font-semibold sm:text-4xl">Transparentní ceny, férový přístup</h1>
        <p className={`mt-2 text-center ${soft}`}>{l(t.services.lead)}</p>
        <div className="mt-10 space-y-8">
          {t.services.groups.map((g, gi) => (
            <PriceBox key={gi} g={g} />
          ))}
        </div>
        <p className={`mt-6 text-center text-sm ${soft}`}>{l(t.services.note)}</p>
        <div className="mt-6 text-center">
          <Link href={s.href("dat-lich")} className={btn}>
            <Heart className="size-4" aria-hidden />
            {l(t.bookLabel)}
          </Link>
        </div>
      </section>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <section className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8">
          <h1 className="text-center text-3xl font-semibold sm:text-4xl">{l(t.home.intro.title)}</h1>
          <p className={`mt-2 text-center ${soft}`}>{l(t.home.intro.text)}</p>
          <div className="mt-10">
            <Steps />
          </div>
        </section>
        <section className="mx-auto grid max-w-[1000px] gap-6 px-5 pb-14 sm:grid-cols-2 sm:px-8">
          {t.about.team.map((m) => (
            <article key={m.name} className="flex items-center gap-5 rounded-2xl border border-[#C7CDC9] p-5">
              <div className="size-28 shrink-0 overflow-hidden rounded-2xl bg-[#C7CDC9]">{s.art(m.visual)}</div>
              <div>
                <h2 className="text-xl font-semibold">{m.name}</h2>
                <p className="text-sm font-medium text-[#566A60]">{l(m.role)}</p>
                <p className={`mt-1 text-[15px] ${soft}`}>{l(m.bio)}</p>
              </div>
            </article>
          ))}
        </section>
        <section className="mx-auto max-w-[1100px] px-5 pb-16 sm:px-8">
          <h2 className="mb-6 text-center text-2xl font-semibold">Vy se ptáte, my odpovídáme</h2>
          <Faq />
        </section>
      </>
    );
  } else if (page === "bo-suu-tap") {
    body = (
      <section className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8">
        <h1 className="text-center text-3xl font-semibold sm:text-4xl">{l(t.gallery.title)}</h1>
        <p className={`mt-2 text-center ${soft}`}>{l(t.gallery.lead)}</p>
        <div className="mt-10">
          <DemoLightbox
            motif={t.motif}
            {...s.gallery}
            gridClass="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3"
            tileClass="rounded-2xl bg-[#C7CDC9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352B]"
            shapes={["aspect-[4/3] pb-8"]}
          />
        </div>
      </section>
    );
  } else {
    body = (
      <section className="mx-auto grid max-w-[1100px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-12">
        <div className="rounded-2xl border border-[#C7CDC9] p-6 sm:p-8 lg:col-span-8">
          <h1 className="text-2xl font-semibold">{l(t.contact.title)}</h1>
          <p className={`mb-6 mt-1 ${soft}`}>{l(t.contact.lead)}</p>
          <DemoBookingForm
            {...s.form}
            staff={t.about.team.map((m) => m.name)}
            c={{
              field: "mt-2 block min-h-12 w-full rounded-xl border border-[#C7CDC9] bg-white px-4 py-3 text-[16px] outline-none focus:border-[#1E352B] focus:ring-2 focus:ring-[#C7CDC9]",
              label: "text-sm font-medium",
              chip: "min-h-11 rounded-xl border border-[#C7CDC9] bg-white px-4 text-sm hover:border-[#1E352B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1E352B]",
              chipOn: "!border-[#1E352B] !bg-[#1E352B] text-white",
              submit: btn,
              notice: "rounded-2xl bg-[#E4E8E5] p-6",
            }}
          />
        </div>
        <aside className="rounded-2xl bg-[#1E352B] p-6 text-[15px] text-white lg:col-span-4">
          <p className="font-semibold">Naše otevírací doba</p>
          {t.contact.hours.map((h, i) => (
            <p key={i} className="text-white/85">
              {l(h.days)} · {h.time}
            </p>
          ))}
          <p className="mt-5 font-semibold">Zavolejte</p>
          <DemoPhone phone={t.contact.phone} note={l(UI.form.callDemo)} className="font-medium" />
          <p className="mt-5 font-semibold">Zastavte se</p>
          <p className="text-white/85">{t.contact.address}</p>
        </aside>
      </section>
    );
  }

  return (
    <div className={`bg-white text-[#16231D] ${f}`}>
      <DemoNav
        brand={
          <Link href={s.href("")} className="flex min-h-11 items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-[#1E352B] text-sm font-bold text-white">K</span>
            <span className="text-lg font-semibold">{t.name} Studio</span>
          </Link>
        }
        items={s.nav}
        cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
        menuLabel={l(UI.menu)}
        closeLabel={l(UI.close)}
        c={{
          header: "border-b border-[#E4E8E5] bg-white",
          inner: "h-[68px] max-w-[1160px] px-5 sm:px-8",
          link: "rounded-lg px-3 py-2 text-[15px] hover:bg-[#E4E8E5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1E352B]",
          active: "!bg-[#1E352B] !text-white",
          cta: `${btn} !min-h-11 !px-4 !text-sm`,
          burger: "rounded-lg bg-[#1E352B] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E352B]",
          panel: "border-t border-[#E4E8E5] bg-white px-2",
          panelLink: "flex min-h-12 items-center rounded-lg px-4 text-lg",
        }}
      />
      <main>{body}</main>
      <Wave />
      <footer className="bg-[#1E352B] text-white">
        <div className="mx-auto flex max-w-[1160px] flex-col items-center gap-4 px-5 pb-8 pt-4 text-center sm:px-8">
          <p className="text-3xl font-bold leading-none">{t.name}</p>
          <p className="text-sm text-white/80">
            {l(t.tagline)} · {t.contact.address}
          </p>
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-2">
            {s.nav.map((n) => (
              <Link key={n.href} href={n.href} className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm hover:bg-white/10">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="border-t border-white/15 px-5 py-5 text-center text-[13px] text-white/75">{l(UI.disclaimer)}</p>
      </footer>
    </div>
  );
}
