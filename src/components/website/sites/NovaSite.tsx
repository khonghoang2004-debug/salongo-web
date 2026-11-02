import { ArrowRight, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoPhone } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { PillNav } from "../templates/PillNav";
import { fontLumenSans, fontNova, site, type SiteProps } from "./shared";

// Mẫu Studio Nova (salon nhiều dịch vụ) — học từ Studio Itta: menu viên thuốc màu mận + nút vàng, tiêu đề sans mảnh
// xen chữ nghiêng serif, thẻ từng mảng có nhãn + "od X Kč" + số điện thoại riêng, hàng số liệu, dải chữ (tĩnh, không chạy).
const sans = fontLumenSans.className; // Inter Tight
const it = `${fontNova.className} italic`;
const plum = "#33243A";
const soft = "text-[#5E5560]";
const label = "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7B4A7C]";
const btnDark = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#33243A] px-6 text-[15px] font-medium text-white hover:bg-[#4A3654] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#33243A]";
const btnGold = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#D2AE62] px-5 text-[14px] font-semibold text-[#231A14] hover:bg-[#E0BF77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#231A14]";
const btnLine = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#33243A]/25 px-6 text-[15px] font-medium hover:border-[#33243A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#33243A]";

export function NovaSite(props: SiteProps) {
  const { t, page } = props;
  const s = site(props);
  const { l } = s;

  // Tiêu đề: 2 từ cuối in nghiêng serif
  const Title = ({ text, size = "text-[2.75rem] sm:text-7xl" }: { text: string; size?: string }) => {
    const w = text.split(" ");
    return (
      <h1 className={`${size} font-light leading-[1.05] tracking-[-0.03em]`}>
        {w.slice(0, -2).join(" ")} <span className={it}>{w.slice(-2).join(" ")}</span>
      </h1>
    );
  };

  const Card = ({ g, gi }: { g: (typeof t.services.groups)[number]; gi: number }) => (
    <li className="flex flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_1px_2px_rgba(51,36,58,0.06),0_8px_24px_rgba(51,36,58,0.06)]">
      <div className="relative aspect-[4/3] bg-[#E6DDD3]">
        {s.art(t.gallery.items[gi % t.gallery.items.length])}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">{l(g.name)}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-medium">{l(g.name)}</h3>
        <ul className={`mt-2 space-y-1 text-[15px] ${soft}`}>
          {g.items.map((x, i) => (
            <li key={i} className="flex justify-between gap-3">
              <span>{l(x.name)}</span>
              <span className="whitespace-nowrap font-medium text-[#231A14]">{s.price(x.price, x.from)}</span>
            </li>
          ))}
        </ul>
        {g.note && (
          <p className="mt-auto flex items-center gap-2 border-t border-[#EEE7DF] pt-4 text-sm font-medium">
            <Phone className="size-4 text-[#7B4A7C]" aria-hidden />
            {l(g.note)}
          </p>
        )}
      </div>
    </li>
  );

  const Strip = () => (
    <div className="overflow-hidden bg-[#33243A] py-3 text-[13px] text-white/85" aria-hidden>
      <p className="mx-auto flex max-w-[1160px] flex-wrap justify-center gap-x-6 gap-y-1 px-5">
        {t.services.groups.map((g) => (
          <span key={l(g.name)}>
            <span className="mr-2 text-[#D2AE62]">•</span>
            {l(g.name)}
          </span>
        ))}
        <span>
          <span className="mr-2 text-[#D2AE62]">•</span>
          {t.contact.address}
        </span>
      </p>
    </div>
  );

  let body: React.ReactNode;
  if (page === "") {
    body = (
      <>
        <section className="relative overflow-hidden px-5 pb-10 pt-28 text-center sm:pt-36">
          <svg className="absolute left-1/2 top-10 -z-0 h-[900px] w-[900px] -translate-x-1/2 text-[#33243A]/[0.07]" viewBox="0 0 900 900" aria-hidden>
            {[150, 250, 350, 450].map((r) => (
              <circle key={r} cx="450" cy="450" r={r} fill="none" stroke="currentColor" />
            ))}
          </svg>
          <div className="relative">
            <p className={label}>{l(t.home.kicker)}</p>
            <div className="mx-auto mt-5 max-w-4xl">
              <Title text={l(t.home.title)} />
            </div>
            <p className={`mx-auto mt-5 max-w-lg text-[17px] ${soft}`}>{l(t.home.lead)}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={s.href("dat-lich")} className={btnDark}>
                {l(t.bookLabel)}: {t.contact.phone.slice(5)}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href={s.href("dich-vu")} className={btnLine}>
                {l(UI.allServices)}
              </Link>
            </div>
          </div>
          <figure className="relative mx-auto mt-12 max-w-[1040px]">
            <div className="aspect-[16/9] overflow-hidden rounded-[22px] bg-[#E6DDD3]">{s.art(t.home.hero, "", true)}</div>
            <figcaption className="mt-3 text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5E5560]">
              {t.name} · {t.contact.address}
            </figcaption>
          </figure>
        </section>
        <Strip />
        <section className="mx-auto max-w-[1160px] px-5 py-16 sm:px-8">
          <div className="grid gap-4 md:grid-cols-2 md:items-end">
            <div>
              <p className={label}>{l(t.nav["dich-vu"])}</p>
              <h2 className="mt-3 text-4xl font-light leading-tight sm:text-5xl">
                Vše pro vaši krásu <span className={`block ${it}`}>pod jednou střechou</span>
              </h2>
            </div>
            <p className={`text-[15px] md:max-w-sm md:justify-self-end ${soft}`}>{l(t.home.intro.text)}</p>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.groups.map((g, gi) => (
              <Card key={gi} g={g} gi={gi} />
            ))}
          </ul>
        </section>
        <section className="bg-[#E9E2D8]">
          <div className="mx-auto max-w-[1160px] px-5 py-14 sm:px-8">
            <ul className="grid grid-cols-3 gap-4 border-y border-[#33243A]/15 py-8">
              {t.home.highlights.map((h, i) => (
                <li key={i}>
                  <p className="text-3xl font-light sm:text-5xl">
                    {l(h.title).split(" ")[0]} <span className={`${it} text-[#7B4A7C]`}>{l(h.title).split(" ").slice(1).join(" ")}</span>
                  </p>
                  <p className={`mt-1 text-sm ${soft}`}>{l(h.text)}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10 grid overflow-hidden rounded-[22px] bg-[#33243A] text-white md:grid-cols-2">
              <div className="p-8 sm:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">{l(t.about.title)}</p>
                <h2 className={`mt-3 text-3xl ${it}`}>{l(t.about.lead)}</h2>
                <p className="mt-3 text-white/85">{l(t.about.story[0])}</p>
                <Link href={s.href("dat-lich")} className={`${btnGold} mt-6`}>
                  {l(t.bookLabel)}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
              <div className="min-h-[220px] bg-[#4A3654]">{s.art(t.gallery.items[2])}</div>
            </div>
          </div>
        </section>
      </>
    );
  } else if (page === "dich-vu") {
    body = (
      <section className="mx-auto max-w-[1160px] px-5 pb-16 pt-28 sm:px-8 sm:pt-36">
        <p className={label}>{t.name}</p>
        <div className="mt-3">
          <Title text={l(t.services.title) + " a ceny od"} size="text-[2.5rem] sm:text-6xl" />
        </div>
        <p className={`mt-3 ${soft}`}>{l(t.services.lead)}</p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.groups.map((g, gi) => (
            <Card key={gi} g={g} gi={gi} />
          ))}
        </ul>
        <p className={`mt-8 text-[15px] ${soft}`}>{l(t.services.note)}</p>
      </section>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <section className="mx-auto grid max-w-[1160px] items-center gap-10 px-5 pb-14 pt-28 sm:px-8 sm:pt-36 md:grid-cols-2">
          <div>
            <p className={label}>{l(t.about.title)}</p>
            <div className="mt-3">
              <Title text={l(t.about.lead)} size="text-4xl sm:text-5xl" />
            </div>
            <p className={`mt-5 text-[17px] ${soft}`}>{l(t.about.story[0])}</p>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-[22px] bg-[#E6DDD3]">{s.art(t.gallery.items[5])}</div>
        </section>
        <section className="mx-auto max-w-[1160px] px-5 pb-16 sm:px-8">
          <ul className="grid gap-5 sm:grid-cols-3">
            {t.about.team.map((m, i) => (
              <li key={m.name} className="rounded-[22px] bg-white p-5 shadow-[0_8px_24px_rgba(51,36,58,0.06)]">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#E6DDD3]">{s.art(m.visual)}</div>
                <h2 className="mt-4 text-xl font-medium">{m.name}</h2>
                <p className={label}>{l(m.role)}</p>
                <p className={`mt-2 text-[15px] ${soft}`}>{l(m.bio)}</p>
                <p className="mt-3 flex items-center gap-2 text-sm font-medium">
                  <Phone className="size-4 text-[#7B4A7C]" aria-hidden />
                  {(() => {
                    const n = t.services.groups[Math.min(i * 2, t.services.groups.length - 1)].note;
                    return n ? l(n) : t.contact.phone;
                  })()}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </>
    );
  } else if (page === "bo-suu-tap") {
    body = (
      <section className="mx-auto max-w-[1160px] px-5 pb-16 pt-28 sm:px-8 sm:pt-36">
        <Title text={l(t.gallery.title) + " našeho studia"} size="text-[2.5rem] sm:text-6xl" />
        <div className="mt-10">
          <DemoLightbox
            motif={t.motif}
            {...s.gallery}
            gridClass="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3"
            tileClass="rounded-[18px] bg-[#E6DDD3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#33243A]"
            shapes={["aspect-[4/5] pb-8", "aspect-[4/5] pb-8 md:mt-10", "aspect-[4/5] pb-8"]}
          />
        </div>
      </section>
    );
  } else {
    body = (
      <section className="mx-auto grid max-w-[1160px] gap-8 px-5 pb-16 pt-28 sm:px-8 sm:pt-36 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Title text={l(t.contact.title) + " a rezervace"} size="text-[2.5rem] sm:text-6xl" />
          <p className={`mt-4 ${soft}`}>{l(t.contact.lead)}</p>
          <ul className="mt-6 space-y-3">
            {t.services.groups.map((g) => (
              <li key={l(g.name)} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-[15px]">
                <span>{l(g.name)}</span>
                <span className="font-medium">{g.note ? l(g.note) : t.contact.phone}</span>
              </li>
            ))}
          </ul>
          <p className={`mt-4 text-sm ${soft}`}>({l(UI.form.callDemo)})</p>
          <div className="mt-6 space-y-1 text-[15px]">
            <p>{t.contact.address}</p>
            {t.contact.hours.map((h, i) => (
              <p key={i}>
                {l(h.days)} · {h.time}
              </p>
            ))}
            <DemoPhone phone={t.contact.phone} note={l(UI.form.callDemo)} className="font-medium" />
          </div>
        </div>
        <div className="rounded-[22px] bg-white p-6 shadow-[0_8px_24px_rgba(51,36,58,0.06)] sm:p-8 lg:col-span-7">
          <DemoBookingForm
            {...s.form}
            staff={t.about.team.map((m) => m.name)}
            c={{
              field: "mt-2 block min-h-12 w-full rounded-2xl border border-[#E3D9CE] bg-[#FBF9F6] px-4 py-3 text-[16px] outline-none focus:border-[#33243A]",
              label: "text-sm font-medium",
              chip: "min-h-11 rounded-full border border-[#E3D9CE] bg-white px-4 text-sm hover:border-[#33243A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#33243A]",
              chipOn: "!border-[#33243A] !bg-[#33243A] text-white",
              submit: btnDark,
              notice: "rounded-2xl bg-[#F1E9F1] p-6",
            }}
          />
        </div>
      </section>
    );
  }

  return (
    <div className={`bg-[#F2EFEA] text-[#231A14] ${sans}`} style={{ ["--plum" as string]: plum }}>
      <PillNav
        brand={t.name.toLowerCase()}
        brandClass="text-lg font-normal tracking-[-0.01em] text-white"
        items={s.nav}
        cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
        menuLabel={l(UI.menu)}
        closeLabel={l(UI.close)}
        c={{
          bar: "bg-[#33243A] text-white shadow-[0_8px_24px_rgba(51,36,58,0.25)]",
          link: "inline-flex min-h-11 items-center rounded-full px-4 text-[14px] text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white",
          active: "!bg-white/10 !text-white",
          cta: btnGold,
          panel: "bg-[#33243A]",
        }}
      />
      <main>{body}</main>
      <footer className="bg-[#33243A] text-white">
        <div className="mx-auto grid max-w-[1160px] gap-6 px-5 py-12 sm:px-8 md:grid-cols-3">
          <p className="text-2xl">
            {t.name.toLowerCase()} <span className={`${it} text-[#D2AE62]`}>Praha 2</span>
          </p>
          <div className="text-[15px] text-white/80">
            <p>{t.contact.address}</p>
            {t.contact.hours.map((h, i) => (
              <p key={i}>
                {l(h.days)} · {h.time}
              </p>
            ))}
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-4">
            {s.nav.map((n) => (
              <Link key={n.href} href={n.href} className="inline-flex min-h-11 items-center text-sm hover:underline">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="border-t border-white/15 px-5 py-5 text-center text-[13px] text-white/70">{l(UI.disclaimer)}</p>
      </footer>
    </div>
  );
}
