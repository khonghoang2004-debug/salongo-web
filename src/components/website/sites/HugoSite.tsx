import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoNav, DemoPhone } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { fontHugo, site, type SiteProps } from "./shared";

// Mẫu hugo hair — học từ James Hair (wordmark chữ thường ở giữa, giá in hoa hai cột trên dải xám, giờ mở cửa dạng bảng,
// form ngắn) + Petra Měchurová (tiêu đề in hoa cạnh một ảnh chân dung, đội ngũ ảnh tròn). Đen trắng, một điểm nhấn vàng.
const f = fontHugo.className;
const soft = "text-[#4A4A4A]";
const cap = "text-[13px] font-medium uppercase tracking-[0.12em]";
const link = `${cap} inline-flex min-h-11 items-center border-b border-black hover:border-[#C9B400] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black`;
const btn = `${cap} inline-flex min-h-12 items-center justify-center bg-black px-7 text-white hover:bg-[#333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`;

export function HugoSite(props: SiteProps) {
  const { t, page } = props;
  const s = site(props);
  const { l } = s;

  const PriceTable = ({ groups }: { groups: typeof t.services.groups }) => (
    <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
      {groups.map((g, gi) => (
        <div key={gi}>
          <h3 className={`${cap} mb-2 font-semibold`}>{l(g.name)}</h3>
          <ul>
            {g.items.map((it, i) => (
              <li key={i} className="flex items-baseline justify-between gap-4 border-b border-black/10 py-2.5 text-[15px] uppercase tracking-[0.04em]">
                <span>{l(it.name)}</span>
                <span className="whitespace-nowrap normal-case tabular-nums">{s.price(it.price, it.from)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const Hours = () => (
    <table className="w-full text-[15px] uppercase tracking-[0.04em]">
      <tbody>
        {t.contact.hours.map((h, i) => (
          <tr key={i} className="border-b border-black/10">
            <th scope="row" className="py-2 text-left font-normal">
              {l(h.days)}
            </th>
            <td className="py-2 text-right tabular-nums">{h.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const Title = ({ children }: { children: React.ReactNode }) => <h1 className={`text-[2.75rem] font-light uppercase leading-[1.02] tracking-[-0.01em] sm:text-7xl`}>{children}</h1>;

  let body: React.ReactNode;
  if (page === "") {
    body = (
      <>
        <section className="mx-auto grid max-w-[1160px] items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:py-20">
          <div className="md:order-2">
            <div className="mx-auto aspect-[4/5] max-w-[440px] overflow-hidden bg-[#DDE4EC] shadow-[0_20px_40px_rgba(0,0,0,0.12)]">{s.art(t.home.hero, "", true)}</div>
          </div>
          <div>
            <Title>{l(t.home.title)}</Title>
            <p className={`mt-5 max-w-sm text-[17px] ${soft}`}>{l(t.home.lead)}</p>
            <Link href={s.href("dat-lich")} className={`${btn} mt-8`}>
              {l(t.bookLabel)}
            </Link>
          </div>
        </section>
        <section className="mx-auto grid max-w-[1160px] gap-10 px-5 pb-16 sm:px-8 md:grid-cols-12">
          <div className="aspect-[4/5] overflow-hidden bg-[#222] md:col-span-4">{s.art(t.about.team[0].visual)}</div>
          <div className="md:col-span-7 md:col-start-6">
            <h2 className="text-3xl font-light uppercase">{l(t.home.intro.title)}</h2>
            <p className={`mt-4 text-lg leading-relaxed ${soft}`}>{l(t.home.intro.text)}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {t.home.highlights.map((h, i) => (
                <li key={i} className="border-t-2 border-[#C9B400] pt-3">
                  <h3 className={cap}>{l(h.title)}</h3>
                  <p className={`mt-1 text-[15px] ${soft}`}>{l(h.text)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="bg-[#EBEBEB]">
          <div className="mx-auto grid max-w-[1160px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12">
            <div className="aspect-[16/10] overflow-hidden bg-[#D9D9D9] lg:col-span-5 lg:aspect-auto">{s.art(t.gallery.items[2])}</div>
            <div className="lg:col-span-7">
              <h2 className={`${cap} mb-4 font-semibold`}>{l(t.nav["dich-vu"])}</h2>
              <PriceTable groups={t.services.groups} />
            </div>
          </div>
        </section>
        <section className="mx-auto grid max-w-[1160px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-2">
          <div>
            <h2 className={`${cap} mb-3 font-semibold`}>{l(UI.hours)}</h2>
            <Hours />
          </div>
          <div>
            <h2 className={`${cap} mb-3 font-semibold`}>{l(t.bookLabel)}</h2>
            <DemoPhone phone={t.contact.phone} note={l(UI.form.callDemo)} className="text-2xl font-light" />
            <p className={`mt-3 ${soft}`}>{l(t.contact.lead)}</p>
            <Link href={s.href("dat-lich")} className={`${link} mt-4`}>
              {l(t.nav["dat-lich"])}
            </Link>
          </div>
        </section>
      </>
    );
  } else if (page === "dich-vu") {
    body = (
      <section className="mx-auto max-w-[1160px] px-5 py-14 sm:px-8">
        <Title>{l(t.services.title)}</Title>
        <p className={`mt-3 ${soft}`}>{l(t.services.lead)}</p>
        <div className="mt-10 bg-[#EBEBEB] p-6 sm:p-10">
          <PriceTable groups={t.services.groups} />
        </div>
        <p className={`mt-6 text-sm ${soft}`}>{l(t.services.note)}</p>
      </section>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <section className="mx-auto grid max-w-[1160px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-2">
          <div>
            <Title>{l(t.about.title)}</Title>
            <p className={`mt-2 ${cap} ${soft}`}>{l(t.about.lead)}</p>
            <p className="mt-6 text-lg leading-relaxed">{l(t.about.story[0])}</p>
          </div>
          <div className="aspect-[4/3] overflow-hidden bg-[#222]">{s.art(t.gallery.items[0])}</div>
        </section>
        <section className="border-t border-black/10">
          <div className="mx-auto max-w-[1160px] px-5 py-14 sm:px-8">
            <h2 className="text-center text-2xl font-light uppercase">Kdo se o vás postará</h2>
            <ul className="mt-10 grid gap-10 sm:grid-cols-3">
              {t.about.team.map((m) => (
                <li key={m.name} className="text-center">
                  <div className="mx-auto size-44 overflow-hidden rounded-full bg-[#222]">{s.art(m.visual)}</div>
                  <h3 className="mt-4 text-lg">{m.name}</h3>
                  <p className={`${cap} ${soft}`}>{l(m.role)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </>
    );
  } else if (page === "bo-suu-tap") {
    body = (
      <section className="mx-auto max-w-[1160px] px-5 py-14 sm:px-8">
        <Title>{l(t.gallery.title)}</Title>
        <div className="mt-10">
          <DemoLightbox
            motif={t.motif}
            {...s.gallery}
            gridClass="grid grid-cols-2 gap-x-2 gap-y-6 md:grid-cols-3 [&_p]:text-[13px] [&_p]:uppercase [&_p]:tracking-[0.1em]"
            tileClass="bg-[#222] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            shapes={["aspect-square pb-8"]}
          />
        </div>
      </section>
    );
  } else {
    body = (
      <section className="mx-auto grid max-w-[1160px] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2">
        <div>
          <Title>{l(t.contact.title)}</Title>
          <div className="mt-8">
            <h2 className={`${cap} mb-3 font-semibold`}>{l(UI.hours)}</h2>
            <Hours />
          </div>
          <div className="mt-8 space-y-1 text-[15px]">
            <p>{t.contact.address}</p>
            <DemoPhone phone={t.contact.phone} note={l(UI.form.callDemo)} className="text-xl font-light" />
            <p className={soft}>{t.contact.email}</p>
            <p className={`pt-3 ${soft}`}>{l(t.services.note)}</p>
          </div>
        </div>
        <div className="border-t border-black/10 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          <DemoBookingForm
            {...s.form}
            staff={t.about.team.slice(0, 2).map((m) => m.name)}
            c={{
              field: "mt-2 block min-h-12 w-full border border-black/20 bg-white px-3 py-3 text-[16px] outline-none focus:border-black",
              label: `${cap} font-semibold`,
              chip: `${cap} min-h-11 border border-black/20 px-4 hover:border-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black`,
              chipOn: "!border-black bg-black text-white",
              submit: btn,
              notice: "border border-black p-6",
            }}
          />
        </div>
      </section>
    );
  }

  return (
    <div className={`bg-white text-black ${f}`}>
      <DemoNav
        brand={
          <Link href={s.href("")} className="flex min-h-11 flex-col items-center text-[1.75rem] font-light leading-[0.9] tracking-[-0.01em]">
            {t.name.split(" ").map((w) => (
              <span key={w}>{w}</span>
            ))}
          </Link>
        }
        items={s.nav}
        cta={{ href: s.href("dat-lich"), label: l(t.bookLabel) }}
        menuLabel={l(UI.menu)}
        closeLabel={l(UI.close)}
        c={{
          header: "border-b border-black/10 bg-white",
          inner: "h-20 max-w-[1160px] px-5 sm:px-8",
          link: `${cap} px-3 py-2 hover:underline underline-offset-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black`,
          active: "underline decoration-[#C9B400] decoration-2",
          cta: link,
          burger: "focus-visible:outline focus-visible:outline-2 focus-visible:outline-black",
          panel: "border-t border-black/10 bg-white",
          panelLink: "flex min-h-12 items-center px-5 text-xl font-light uppercase",
        }}
      />
      <main>{body}</main>
      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto flex max-w-[1160px] flex-col gap-4 px-5 py-10 text-[15px] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-2xl font-light">{t.name}</p>
          <p className={soft}>{t.contact.address}</p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-4">
            {s.nav.map((n) => (
              <Link key={n.href} href={n.href} className={`${cap} inline-flex min-h-11 items-center hover:underline`}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="bg-[#EBEBEB] px-5 py-4 text-center text-[13px] text-[#4A4A4A]">{l(UI.disclaimer)}</p>
      </footer>
    </div>
  );
}
