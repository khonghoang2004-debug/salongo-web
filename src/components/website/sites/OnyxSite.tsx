import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoNav, DemoPhone } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { fontOnyx, fontOnyxSerif, site, type SiteProps } from "./shared";

// Mẫu Onyx (spa cao cấp) — học từ AVA Spa Four Seasons (dải than chì với tiêu đề in hoa giãn rộng, chữ thân serif lớn,
// ảnh rộng, thanh "đặt lịch" dính đáy màn hình trên mobile) + SPA SPA (lưới khu/phòng có ảnh và tên).
// Thanh đáy chỉ hiện < 768 px; trang có khoảng đệm đáy bằng chiều cao thanh nên không che nội dung / nút.
const caps = `${fontOnyx.className} uppercase tracking-[0.28em]`;
const serif = fontOnyxSerif.className;
const soft = "text-[#5E5750]";
const btnLight = `${caps} inline-flex min-h-12 items-center justify-center border border-[#E8DCC8] px-7 text-[12px] text-[#F4EEE6] hover:bg-[#E8DCC8] hover:text-[#141312] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8DCC8]`;
const btnDark = `${caps} inline-flex min-h-12 items-center justify-center bg-[#141312] px-7 text-[12px] text-[#F4EEE6] hover:bg-[#3A342E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141312]`;

export function OnyxSite(props: SiteProps) {
  const { t, page } = props;
  const s = site(props);
  const { l } = s;

  const Band = ({ title, sub }: { title: string; sub?: string }) => (
    <section className="bg-[#141312] px-5 py-14 text-center text-[#F4EEE6] sm:py-20">
      {sub && <p className={`${serif} text-lg italic text-[#C9B99E]`}>{sub}</p>}
      <h1 className={`${caps} mt-2 text-[1.75rem] leading-snug sm:text-4xl`}>{title}</h1>
      <span className="mx-auto mt-5 block h-px w-12 bg-[#C9B99E]" aria-hidden />
    </section>
  );

  const Menu = ({ items }: { items: typeof s.featured }) => (
    <ul className="divide-y divide-[#D8CEC0]">
      {items.map((it, i) => (
        <li key={i} className="grid grid-cols-[1fr_auto] gap-x-6 py-5">
          <span className={`${serif} text-2xl`}>{l(it.name)}</span>
          <span className={`${serif} self-end text-xl`}>{s.price(it.price, it.from)}</span>
          <span className={`${caps} mt-1 text-[11px] ${soft}`}>
            {s.dur(it.min)}
            {it.desc ? ` · ${l(it.desc)}` : ""}
          </span>
        </li>
      ))}
    </ul>
  );

  const Spaces = () => (
    <ul className="grid gap-4 sm:grid-cols-3">
      {t.about.team.map((m) => (
        <li key={m.name}>
          <Link href={s.href("dat-lich")} className="group relative block aspect-[4/5] overflow-hidden bg-[#2A2622] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141312]">
            {s.art(m.visual, "transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none")}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#141312]/85 to-transparent p-5 text-[#F4EEE6]">
              <span className={`${caps} block text-sm`}>{m.name}</span>
              <span className={`${serif} block text-lg italic`}>{l(m.role)}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );

  let body: React.ReactNode;
  if (page === "") {
    body = (
      <>
        <section className="bg-[#141312] text-[#F4EEE6]">
          <div className="px-5 pb-10 pt-14 text-center sm:pt-20">
            <p className={`${serif} text-lg italic text-[#C9B99E]`}>{l(t.home.kicker)}</p>
            <h1 className={`${caps} mx-auto mt-3 max-w-3xl text-[2rem] leading-snug sm:text-5xl`}>{l(t.home.title)}</h1>
            <nav aria-label={l(t.services.title)} className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-2">
              {t.services.groups.map((g) => (
                <Link key={l(g.name)} href={s.href("dich-vu")} className={`${caps} inline-flex min-h-11 items-center text-[11px] text-[#E8DCC8] hover:text-white`}>
                  {l(g.name)}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mx-auto aspect-[4/3] max-w-[1280px] overflow-hidden bg-[#2A2622] sm:aspect-[21/9]">{s.art(t.home.hero, "", true)}</div>
        </section>

        <section className="mx-auto max-w-[760px] px-5 py-16 text-center sm:py-24">
          <h2 className={`${caps} text-xl`}>{l(t.home.intro.title)}</h2>
          <span className="mx-auto mt-4 block h-px w-12 bg-[#8C7A5E]" aria-hidden />
          <p className={`${serif} mt-6 text-2xl leading-relaxed sm:text-[1.75rem]`}>{l(t.home.intro.text)}</p>
          <p className={`${serif} mt-4 text-xl ${soft}`}>{l(t.home.lead)}</p>
        </section>

        <section className="bg-[#EFE8DE]">
          <div className="mx-auto grid max-w-[1160px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className={`${caps} text-xl`}>{l(t.services.title)}</h2>
              <p className={`${serif} mt-3 text-xl ${soft}`}>{l(t.services.lead)}</p>
              <Link href={s.href("dich-vu")} className={`${btnDark} mt-8`}>
                {l(UI.allServices)}
              </Link>
            </div>
            <div className="lg:col-span-7">
              <Menu items={s.featured} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1160px] px-5 py-16 sm:px-8">
          <h2 className={`${caps} mb-8 text-center text-xl`}>{l(t.about.title)}</h2>
          <Spaces />
        </section>

        <section className="bg-[#141312] px-5 py-16 text-center text-[#F4EEE6]">
          <h2 className={`${caps} text-2xl`}>{l(t.home.closing.title)}</h2>
          <p className={`${serif} mt-3 text-xl italic text-[#C9B99E]`}>{l(t.home.closing.text)}</p>
          <Link href={s.href("dat-lich")} className={`${btnLight} mt-8`}>
            {l(t.bookLabel)}
          </Link>
        </section>
      </>
    );
  } else if (page === "dich-vu") {
    body = (
      <>
        <Band title={l(t.services.title)} sub={l(t.services.lead)} />
        <section className="mx-auto max-w-[860px] px-5 py-14 sm:px-8">
          {t.services.groups.map((g, gi) => (
            <div key={gi} className="mb-12">
              <h2 className={`${caps} text-center text-lg`}>{l(g.name)}</h2>
              <Menu items={g.items} />
            </div>
          ))}
          <p className={`${serif} text-center text-lg italic ${soft}`}>{l(t.services.note)}</p>
        </section>
      </>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <Band title={l(t.about.title)} sub={l(t.about.lead)} />
        <section className="mx-auto max-w-[760px] px-5 py-14 text-center">
          <p className={`${serif} text-2xl leading-relaxed`}>{l(t.about.story[0])}</p>
        </section>
        <section className="mx-auto max-w-[1160px] px-5 pb-14 sm:px-8">
          <Spaces />
        </section>
        <section className="bg-[#EFE8DE]">
          <ul className="mx-auto grid max-w-[1000px] gap-8 px-5 py-14 text-center sm:grid-cols-3 sm:px-8">
            {t.about.values.map((v, i) => (
              <li key={i}>
                <h3 className={`${caps} text-sm`}>{l(v.title)}</h3>
                <p className={`${serif} mt-2 text-lg ${soft}`}>{l(v.text)}</p>
              </li>
            ))}
          </ul>
        </section>
      </>
    );
  } else if (page === "bo-suu-tap") {
    body = (
      <>
        <Band title={l(t.gallery.title)} sub={l(t.gallery.lead)} />
        <section className="mx-auto max-w-[1160px] px-5 py-14 sm:px-8">
          <DemoLightbox
            motif={t.motif}
            {...s.gallery}
            gridClass="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 [&_p]:italic"
            tileClass="bg-[#2A2622] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141312]"
            shapes={["aspect-[3/4] pb-8", "aspect-[3/4] pb-8 md:mt-12", "aspect-[3/4] pb-8"]}
          />
        </section>
      </>
    );
  } else {
    body = (
      <>
        <Band title={l(t.contact.title)} sub={l(t.contact.lead)} />
        <section className="mx-auto grid max-w-[1100px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <DemoBookingForm
              {...s.form}
              c={{
                field: "mt-2 block min-h-12 w-full border-0 border-b border-[#8C7A5E] bg-transparent px-0 py-3 text-[17px] outline-none focus:border-b-2 focus:border-[#141312]",
                label: `${caps} text-[11px]`,
                chip: `${caps} min-h-11 border border-[#C9B99E] px-4 text-[11px] hover:border-[#141312] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#141312]`,
                chipOn: "!border-[#141312] bg-[#141312] text-[#F4EEE6]",
                submit: btnDark,
                notice: "bg-[#EFE8DE] p-6",
              }}
            />
          </div>
          <aside className="space-y-6 text-center lg:col-span-4">
            <div>
              <p className={`${caps} text-[11px]`}>{l(UI.address)}</p>
              <p className={`${serif} mt-2 text-xl`}>{t.contact.address}</p>
            </div>
            <div>
              <p className={`${caps} text-[11px]`}>{l(UI.hours)}</p>
              {t.contact.hours.map((h, i) => (
                <p key={i} className={`${serif} mt-2 text-xl`}>
                  {l(h.days)} · {h.time}
                </p>
              ))}
            </div>
            <div className="flex flex-col items-center">
              <DemoPhone phone={t.contact.phone} note={l(UI.form.callDemo)} className={`${serif} text-xl`} />
            </div>
          </aside>
        </section>
      </>
    );
  }

  return (
    <div className={`bg-[#F4EEE6] pb-[76px] text-[#141312] md:pb-0 ${serif}`}>
      <DemoNav
        brand={
          <Link href={s.href("")} className="flex min-h-11 flex-col items-center leading-none">
            <span className={`${caps} text-lg !tracking-[0.5em]`}>Onyx</span>
            <span className={`${serif} mt-1 text-xs italic text-[#C9B99E]`}>spa & wellness</span>
          </Link>
        }
        items={s.nav}
        cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
        menuLabel={l(UI.menu)}
        closeLabel={l(UI.close)}
        c={{
          header: "border-b border-white/10 bg-[#141312] text-[#F4EEE6]",
          inner: "h-[72px] max-w-[1280px] px-5 sm:px-8",
          link: `${caps} px-3 py-2 text-[11px] text-[#E8DCC8] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E8DCC8]`,
          active: "!text-white underline decoration-[#C9B99E] underline-offset-8",
          cta: `${btnLight} !min-h-11 !px-5 !text-[11px]`,
          burger: "text-[#F4EEE6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E8DCC8]",
          panel: "border-t border-white/10 bg-[#141312]",
          panelLink: `${caps} flex min-h-12 items-center justify-center text-sm text-[#F4EEE6]`,
        }}
      />
      <main>{body}</main>
      <footer className="bg-[#141312] text-[#E8DCC8]">
        <div className="mx-auto flex max-w-[1160px] flex-col items-center gap-4 px-5 py-12 text-center sm:px-8">
          <p className={`${caps} text-xl !tracking-[0.5em] text-[#F4EEE6]`}>Onyx</p>
          <p className={`${serif} text-lg italic`}>{t.contact.address}</p>
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5">
            {s.nav.map((n) => (
              <Link key={n.href} href={n.href} className={`${caps} inline-flex min-h-11 items-center text-[11px] hover:text-white`}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="border-t border-white/10 px-5 py-5 text-center text-[13px] text-[#C9B99E]">{l(UI.disclaimer)}</p>
      </footer>
      {/* Thanh đặt lịch dính đáy (chỉ điện thoại), học từ AVA Spa */}
      {page !== "dat-lich" && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#141312]/95 p-3 backdrop-blur md:hidden">
          <Link href={s.href("dat-lich")} className={`${btnLight} w-full !bg-[#E8DCC8] !text-[#141312]`}>
            {l(t.bookLabel)}
          </Link>
        </div>
      )}
    </div>
  );
}
