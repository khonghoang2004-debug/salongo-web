import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoPhone } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { PillNav } from "../templates/PillNav";
import { fontMarelle, fontMarelleSans, site, type SiteProps } from "./shared";

// Mẫu Marelle (nail) — học từ Dephaus: ảnh phủ màn đầu với tên thương hiệu khổng lồ tràn đáy, menu dạng viên thuốc
// nổi giữa trên cùng (nút đặt lịch cam đất nổi bật), nền kem, liên hệ thành 4 ô.
const serif = `${fontMarelle.className} font-extrabold tracking-[-0.02em]`;
const sans = fontMarelleSans.className;
const soft = "text-[#5B4F47]";
const orange = "#B8470B";
const pill = "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-[13px] font-bold uppercase tracking-[0.06em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B211C]";
const btn = `${pill} bg-[#B8470B] text-white hover:bg-[#963805]`;

export function MarelleSite(props: SiteProps) {
  const { t, page } = props;
  const s = site(props);
  const { l } = s;

  const Head = ({ title, lead }: { title: string; lead: string }) => (
    <section className="relative overflow-hidden bg-[#8FB0AD]">
      <div className="absolute inset-0 opacity-60">{s.art(t.gallery.items[1])}</div>
      <div className="relative px-5 pb-6 pt-28 text-center text-[#FFF9E8] sm:pt-32">
        <h1 className={`${serif} text-[2.75rem] leading-none drop-shadow-[0_2px_12px_rgba(43,33,28,0.35)] sm:text-7xl`}>{title}</h1>
        <p className={`${sans} mt-3 text-[17px] font-medium`}>{lead}</p>
      </div>
    </section>
  );

  const Row = ({ it }: { it: (typeof s.featured)[number] }) => (
    <li className="flex items-center justify-between gap-4 border-b border-[#E9DFC6] py-4 last:border-0">
      <span className="min-w-0">
        <span className="block text-[17px] font-semibold">{l(it.name)}</span>
        <span className={`block text-sm ${soft}`}>
          {it.desc ? `${l(it.desc)} · ` : ""}
          {s.dur(it.min)}
        </span>
      </span>
      <span className="shrink-0 whitespace-nowrap rounded-full border border-[#E2D3B3] bg-white px-3.5 py-1 text-[15px] font-bold">{s.price(it.price, it.from)}</span>
    </li>
  );

  const Info = () => (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {[
        { Icon: MapPin, title: l(UI.address), body: <>{t.contact.address}</> },
        { Icon: Mail, title: "E-mail", body: <>{t.contact.email}</> },
        { Icon: Phone, title: l(UI.call), body: <DemoPhone phone={t.contact.phone} note={l(UI.form.callDemo)} className="mx-auto font-semibold" /> },
        { Icon: Clock, title: l(UI.hours), body: <>{t.contact.hours.map((h, i) => <span key={i} className="block">{l(h.days)} · {h.time}</span>)}</> },
      ].map(({ Icon, title, body }) => (
        <li key={title} className="flex flex-col items-center rounded-2xl bg-white px-4 py-6 text-center text-[15px] shadow-[0_1px_3px_rgba(43,33,28,0.08)]">
          <Icon className="size-5 text-[#B8470B]" aria-hidden />
          <span className={`${serif} mt-2 text-xl`}>{title}</span>
          <span className={`mt-1 ${soft}`}>{body}</span>
        </li>
      ))}
    </ul>
  );

  let body: React.ReactNode;
  if (page === "") {
    body = (
      <>
        <section className="relative isolate flex min-h-[640px] flex-col justify-end overflow-hidden bg-[#8FB0AD] sm:min-h-[720px]">
          <div className="absolute inset-0 -z-10">{s.art(t.home.hero, "", true)}</div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#2B211C]/10 via-[#2B211C]/30 to-[#2B211C]/40" aria-hidden />
          <div className="px-5 pb-4 text-center text-[#FFF9E8]">
            <p className={`${serif} text-3xl drop-shadow-[0_2px_10px_rgba(43,33,28,0.4)] sm:text-5xl`}>{l(t.home.title)}</p>
            <p className={`${sans} mt-2 text-lg font-medium drop-shadow-[0_1px_6px_rgba(43,33,28,0.5)]`}>{l(t.home.kicker)}</p>
            <div className="mt-6">
              <Link href={s.href("dat-lich")} className={btn}>
                {l(t.bookLabel)}
              </Link>
            </div>
          </div>
          <h1 className={`${serif} select-none whitespace-nowrap text-center text-[25vw] leading-[0.78] text-[#FFF9E8] lg:text-[17rem]`} aria-label={t.name}>
            {t.name.toLowerCase()}
          </h1>
        </section>

        <section className="px-5 py-16 text-center">
          <svg viewBox="0 0 120 40" className="mx-auto h-8 w-24 text-[#2B211C]" aria-hidden>
            <path d="M5 30 C40 30 70 22 115 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
            {[20, 38, 56, 74, 92].map((x, i) => (
              <ellipse key={x} cx={x} cy={28 - i * 4} rx="7" ry="3" transform={`rotate(-35 ${x} ${28 - i * 4})`} fill="none" stroke="currentColor" />
            ))}
          </svg>
          <p className={`mx-auto mt-5 max-w-xl text-lg leading-relaxed ${soft}`}>
            <strong className="text-[#2B211C]">{t.name}</strong> — {l(t.home.lead)}
          </p>
        </section>

        <section className="mx-auto grid max-w-[1100px] gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className={`${serif} text-4xl sm:text-5xl`}>{l(t.services.title)}</h2>
            <p className={`mt-3 ${soft}`}>{l(t.services.lead)}</p>
            <Link href={s.href("dich-vu")} className={`${pill} mt-6 border border-[#2B211C]/25 hover:border-[#2B211C]`}>
              {l(UI.allServices)}
            </Link>
          </div>
          <ul className="rounded-3xl bg-white px-6 py-2 shadow-[0_1px_3px_rgba(43,33,28,0.08)] lg:col-span-7">
            {s.featured.map((it, i) => (
              <Row key={i} it={it} />
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-[1100px] px-5 pb-16 sm:px-8">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {t.gallery.items.slice(0, 3).map((g, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-2xl bg-[#E9DFC6]">
                {s.art(g)}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-5 pb-20 sm:px-8">
          <h2 className={`${serif} mb-6 text-center text-3xl sm:text-4xl`}>Spojte se s námi</h2>
          <Info />
        </section>
      </>
    );
  } else if (page === "dich-vu") {
    body = (
      <>
        <Head title={l(t.services.title)} lead={l(t.services.lead)} />
        <section className="mx-auto grid max-w-[1100px] gap-6 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
          {t.services.groups.map((g, gi) => (
            <div key={gi} className="rounded-3xl bg-white px-6 py-5 shadow-[0_1px_3px_rgba(43,33,28,0.08)]">
              <h2 className={`${serif} text-2xl`}>{l(g.name)}</h2>
              <ul>
                {g.items.map((it, i) => (
                  <Row key={i} it={it} />
                ))}
              </ul>
            </div>
          ))}
        </section>
        <p className={`px-5 pb-16 text-center ${soft}`}>{l(t.services.note)}</p>
      </>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <Head title={l(t.about.title)} lead={l(t.about.lead)} />
        <section className="mx-auto max-w-2xl px-5 py-14 text-center text-xl leading-relaxed">{l(t.about.story[0])}</section>
        <section className="mx-auto grid max-w-[900px] gap-6 px-5 pb-14 sm:grid-cols-2 sm:px-8">
          {t.about.team.map((m) => (
            <article key={m.name} className="overflow-hidden rounded-3xl bg-white shadow-[0_1px_3px_rgba(43,33,28,0.08)]">
              <div className="aspect-[4/3] bg-[#E9DFC6]">{s.art(m.visual)}</div>
              <div className="p-6">
                <h2 className={`${serif} text-3xl`}>{m.name}</h2>
                <p className="mt-1 text-sm font-bold uppercase tracking-[0.06em] text-[#963805]">{l(m.role)}</p>
                <p className={`mt-2 ${soft}`}>{l(m.bio)}</p>
              </div>
            </article>
          ))}
        </section>
        <section className="mx-auto grid max-w-[1100px] gap-3 px-5 pb-20 sm:grid-cols-3 sm:px-8">
          {t.about.values.map((v, i) => (
            <div key={i} className="rounded-2xl border border-[#E2D3B3] px-5 py-6 text-center">
              <h3 className={`${serif} text-2xl`}>{l(v.title)}</h3>
              <p className={`mt-1 ${soft}`}>{l(v.text)}</p>
            </div>
          ))}
        </section>
      </>
    );
  } else if (page === "bo-suu-tap") {
    body = (
      <>
        <Head title={l(t.gallery.title)} lead={l(t.gallery.lead)} />
        <section className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8">
          <DemoLightbox
            motif={t.motif}
            {...s.gallery}
            gridClass="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 md:grid-cols-3"
            tileClass="rounded-2xl bg-[#E9DFC6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B211C]"
            shapes={["aspect-square pb-8"]}
          />
        </section>
      </>
    );
  } else {
    body = (
      <>
        <Head title={l(t.contact.title)} lead={l(t.contact.lead)} />
        <section className="mx-auto max-w-[900px] px-5 py-14 sm:px-8">
          <div className="rounded-3xl bg-white p-6 shadow-[0_1px_3px_rgba(43,33,28,0.08)] sm:p-9">
            <DemoBookingForm
              {...s.form}
              staff={t.about.team.map((m) => m.name)}
              c={{
                field: "mt-2 block min-h-12 w-full rounded-2xl border border-[#E2D3B3] bg-[#FFFDF6] px-4 py-3 text-[16px] outline-none focus:border-[#B8470B] focus:ring-2 focus:ring-[#F3D3BF]",
                label: "text-sm font-bold",
                chip: `${pill} border border-[#E2D3B3] bg-white !text-[13px] hover:border-[#2B211C]`,
                chipOn: "!border-[#B8470B] !bg-[#B8470B] text-white",
                submit: btn,
                notice: "rounded-2xl bg-[#FFF1E3] p-6",
              }}
            />
          </div>
        </section>
        <section className="mx-auto max-w-[1100px] px-5 pb-20 sm:px-8">
          <Info />
        </section>
      </>
    );
  }

  return (
    <div className={`bg-[#FFF9E8] text-[#2B211C] ${sans}`} style={{ ["--accent" as string]: orange }}>
      <PillNav
        brand={t.name.toLowerCase()}
        brandClass={`${serif} text-2xl`}
        items={s.nav}
        cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
        menuLabel={l(UI.menu)}
        closeLabel={l(UI.close)}
        c={{
          bar: "bg-white/85 shadow-[0_2px_10px_rgba(43,33,28,0.12)] backdrop-blur",
          link: `${pill} !px-4 text-[#2B211C] hover:bg-[#FFF1E3]`,
          active: "!bg-[#2B211C] !text-white",
          cta: btn,
          panel: "bg-white",
        }}
      />
      <main>{body}</main>
      <footer className="bg-[#2B211C] text-[#FFF9E8]">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
          <p className={`${serif} text-3xl`}>{t.name.toLowerCase()}</p>
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-4">
            {s.nav.map((n) => (
              <Link key={n.href} href={n.href} className="inline-flex min-h-11 items-center text-sm font-semibold hover:underline">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="border-t border-white/15 px-5 py-5 text-center text-[13px] text-[#E9DFC6]">{l(UI.disclaimer)}</p>
      </footer>
    </div>
  );
}
