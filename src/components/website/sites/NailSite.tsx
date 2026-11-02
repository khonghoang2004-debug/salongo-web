import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DemoBookingForm, DemoLightbox, DemoNav, DemoPhone } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { fontNail, site, type SiteProps } from "./shared";

// Mẫu 1 — Ivelle: nail atelier. Ivory / nude / taupe / champagne, serif mảnh, nhiều khoảng trắng, khung vòm.
const ink = "text-[#3A302A]";
const soft = "text-[#6F5E50]"; // chữ phụ, tương phản ≥ 4.5:1 trên nền ivory
const btn =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#4A3D34] px-7 text-[15px] font-medium tracking-wide text-[#FBF7F1] transition-colors hover:bg-[#2F2621] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3D34]";
const link =
  "inline-flex min-h-11 items-center gap-2 border-b border-[#C9AE82] text-[15px] font-medium text-[#3A302A] transition-colors hover:border-[#3A302A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A3D34]";
const serif = `${fontNail.className} font-normal tracking-[-0.01em]`;

export function NailSite(props: SiteProps) {
  const { t, page } = props;
  const s = site(props);
  const { l } = s;

  const Title = ({ children }: { children: React.ReactNode }) => (
    <h1 className={`${serif} text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[4.5rem]`}>{children}</h1>
  );

  const PageHead = ({ title, lead }: { title: string; lead: string }) => (
    <section className="mx-auto max-w-3xl px-5 pb-10 pt-14 text-center sm:pt-20">
      <p className={`text-xs uppercase tracking-[0.3em] ${soft}`}>{t.name}</p>
      <div className="mt-4">
        <Title>{title}</Title>
      </div>
      <p className={`mx-auto mt-5 max-w-xl text-[17px] leading-relaxed ${soft}`}>{lead}</p>
      <div className="mx-auto mt-8 h-px w-16 bg-[#C9AE82]" />
    </section>
  );

  const PriceRow = ({ name, desc, min, value }: { name: string; desc?: string; min: number; value: string }) => (
    <li className="py-4">
      <div className="flex items-baseline gap-3">
        <span className={`${serif} text-[1.375rem] leading-tight`}>{name}</span>
        <span className="mb-1 flex-1 border-b border-dotted border-[#BFA98F]" aria-hidden />
        <span className="whitespace-nowrap text-[15px] font-medium">{value}</span>
      </div>
      <p className={`mt-1 text-sm ${soft}`}>
        {desc ? `${desc} · ` : ""}
        {s.dur(min)}
      </p>
    </li>
  );

  let body: React.ReactNode;
  if (page === "") {
    body = (
      <>
        <section className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-6">
            <p className={`text-xs uppercase tracking-[0.3em] ${soft}`}>{l(t.home.kicker)}</p>
            <div className="mt-5">
              <Title>{l(t.home.title)}</Title>
            </div>
            <p className={`mt-6 max-w-md text-[17px] leading-relaxed ${soft}`}>{l(t.home.lead)}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href={s.href("dat-lich")} className={btn}>
                {l(t.bookLabel)}
              </Link>
              <Link href={s.href("dich-vu")} className={link}>
                {l(t.nav["dich-vu"])}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-[460px]">
              <div className="aspect-[4/5] overflow-hidden rounded-t-full bg-[#EFE5D9]">{s.art(t.home.hero, "", true)}</div>
              <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-[#E7DCCE] bg-[#FBF8F3] px-5 py-4 sm:block">
                <p className={`${serif} text-2xl`}>{s.price(t.services.groups[0].items[1].price)}</p>
                <p className={`text-sm ${soft}`}>{l(t.services.groups[0].items[1].name)}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#EADFD2] bg-[#F3ECE2]">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:py-20">
            <h2 className={`${serif} text-[2rem] leading-tight sm:text-[2.75rem]`}>{l(t.home.intro.title)}</h2>
            <p className={`mt-5 text-[17px] leading-relaxed ${soft}`}>{l(t.home.intro.text)}</p>
          </div>
          <ul className="mx-auto grid max-w-[1200px] gap-px border-t border-[#EADFD2] bg-[#EADFD2] sm:grid-cols-3">
            {t.home.highlights.map((h, i) => (
              <li key={i} className="bg-[#F3ECE2] px-6 py-9 text-center sm:px-8">
                <p className={`${serif} text-lg italic text-[#8C7357]`}>{["I", "II", "III"][i]}</p>
                <h3 className={`${serif} mt-2 text-2xl`}>{l(h.title)}</h3>
                <p className={`mt-2 text-[15px] leading-relaxed ${soft}`}>{l(h.text)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <h2 className={`${serif} text-[2rem] leading-tight sm:text-[2.75rem]`}>{l(t.nav["dich-vu"])}</h2>
            <p className={`mt-4 max-w-sm text-[17px] leading-relaxed ${soft}`}>{l(t.services.lead)}</p>
            <Link href={s.href("dich-vu")} className={`${link} mt-6`}>
              {l(UI.allServices)}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ul className="divide-y divide-[#EADFD2] lg:col-span-7">
            {s.featured.map((it, i) => (
              <PriceRow key={i} name={l(it.name)} desc={it.desc && l(it.desc)} min={it.min} value={s.price(it.price, it.from)} />
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-[1200px] px-5 pb-16 sm:px-8 lg:pb-24">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
            {t.gallery.items.slice(0, 3).map((g, i) => (
              <div key={i} className={`overflow-hidden bg-[#EFE5D9] ${i === 1 ? "rounded-t-full" : "rounded-2xl"} ${i === 2 ? "hidden sm:block" : ""} aspect-[3/4]`}>
                {s.art(g)}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href={s.href("bo-suu-tap")} className={link}>
              {l(UI.viewGallery)}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>

        <Closing {...props} />
      </>
    );
  } else if (page === "dich-vu") {
    body = (
      <>
        <PageHead title={l(t.services.title)} lead={l(t.services.lead)} />
        <section className="mx-auto grid max-w-[1100px] gap-x-16 gap-y-12 px-5 pb-16 sm:px-8 lg:grid-cols-2">
          {t.services.groups.map((g, gi) => (
            <div key={gi} className={gi === 2 ? "lg:col-span-2 lg:mx-auto lg:w-1/2 lg:pl-8" : ""}>
              <h2 className={`${serif} text-[1.75rem] italic text-[#8C7357]`}>{l(g.name)}</h2>
              <ul className="mt-2 divide-y divide-[#EADFD2] border-t border-[#EADFD2]">
                {g.items.map((it, i) => (
                  <PriceRow key={i} name={l(it.name)} desc={it.desc && l(it.desc)} min={it.min} value={s.price(it.price, it.from)} />
                ))}
              </ul>
            </div>
          ))}
        </section>
        <p className={`mx-auto max-w-xl px-5 pb-16 text-center text-[15px] ${soft}`}>{l(t.services.note)}</p>
        <Closing {...props} />
      </>
    );
  } else if (page === "gioi-thieu") {
    body = (
      <>
        <PageHead title={l(t.about.title)} lead={l(t.about.lead)} />
        <section className="mx-auto grid max-w-[1100px] items-center gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div className="aspect-[4/5] overflow-hidden rounded-t-full bg-[#EFE5D9] lg:order-2">{s.art(t.gallery.items[2])}</div>
          <div className="space-y-5">
            {t.about.story.map((p, i) => (
              <p key={i} className={`${i === 0 ? `${serif} text-[1.75rem] leading-snug` : `text-[17px] leading-relaxed ${soft}`}`}>
                {l(p)}
              </p>
            ))}
          </div>
        </section>
        <section className="border-t border-[#EADFD2] bg-[#F3ECE2]">
          <div className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8">
            <h2 className={`${serif} text-center text-[2rem] sm:text-[2.75rem]`}>{l(UI.team)}</h2>
            <ul className="mt-10 grid gap-10 sm:grid-cols-3">
              {t.about.team.map((m) => (
                <li key={m.name} className="text-center">
                  <div className="mx-auto aspect-[3/4] max-w-[260px] overflow-hidden rounded-t-full bg-[#EFE5D9]">{s.art(m.visual)}</div>
                  <h3 className={`${serif} mt-5 text-2xl`}>{m.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#7A6452]">{l(m.role)}</p>
                  <p className={`mt-2 text-[15px] ${soft}`}>{l(m.bio)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="mx-auto grid max-w-[1100px] gap-8 px-5 py-16 sm:grid-cols-3 sm:px-8">
          {t.about.values.map((v, i) => (
            <div key={i} className="border-t border-[#C9AE82] pt-5">
              <h3 className={`${serif} text-2xl`}>{l(v.title)}</h3>
              <p className={`mt-2 text-[15px] ${soft}`}>{l(v.text)}</p>
            </div>
          ))}
        </section>
        <Closing {...props} />
      </>
    );
  } else if (page === "bo-suu-tap") {
    body = (
      <>
        <PageHead title={l(t.gallery.title)} lead={l(t.gallery.lead)} />
        <section className="mx-auto max-w-[1100px] px-5 pb-16 sm:px-8">
          <DemoLightbox
            motif={t.motif}
            {...s.gallery}
            gridClass={`grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-6 lg:grid-cols-3 ${ink}`}
            tileClass="rounded-2xl bg-[#EFE5D9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A3D34]"
            shapes={["aspect-[3/4] [&>button]:rounded-t-full", "aspect-[3/4]", "aspect-[3/4]"].map((c) => `${c} pb-8`)}
          />
        </section>
        <Closing {...props} />
      </>
    );
  } else {
    body = (
      <>
        <PageHead title={l(t.contact.title)} lead={l(t.contact.lead)} />
        <section className="mx-auto grid max-w-[1100px] gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-12">
          <div className="rounded-3xl border border-[#E7DCCE] bg-[#FBF8F3] p-6 sm:p-9 lg:col-span-7">
            <DemoBookingForm
              {...s.form}
              c={{
                field: "mt-2 block min-h-12 w-full rounded-xl border border-[#D9CCBC] bg-white px-4 py-3 text-[15px] text-[#3A302A] outline-none focus:border-[#4A3D34] focus:ring-2 focus:ring-[#E3D3BF]",
                label: "text-sm font-medium",
                chip: "min-h-11 rounded-full border border-[#D9CCBC] bg-white px-4 text-sm transition-colors hover:border-[#4A3D34] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4A3D34]",
                chipOn: "!border-[#4A3D34] !bg-[#4A3D34] text-[#FBF7F1]",
                submit: btn,
                notice: "rounded-2xl bg-[#F3ECE2] p-6",
              }}
            />
          </div>
          <aside className="space-y-8 lg:col-span-5">
            <Info {...props} />
          </aside>
        </section>
      </>
    );
  }

  return (
    <div className={`bg-[#F8F4EE] ${ink}`}>
      <DemoNav
        brand={
          <Link href={s.href("")} className="flex min-h-11 flex-col justify-center leading-none">
            <span className={`${serif} text-[1.75rem] tracking-[0.18em]`}>IVELLE</span>
            <span className={`mt-1 text-[10px] uppercase tracking-[0.35em] ${soft}`}>nail atelier</span>
          </Link>
        }
        items={s.nav}
        cta={{ href: s.href("dat-lich"), label: l(t.nav["dat-lich"]) }}
        menuLabel={l(UI.menu)}
        closeLabel={l(UI.close)}
        c={{
          header: "border-b border-[#EADFD2] bg-[#F8F4EE]/95 backdrop-blur",
          inner: "h-[72px] max-w-[1200px] px-5 sm:px-8",
          link: "rounded-full px-3.5 py-2 text-[14px] tracking-wide text-[#5E4F43] transition-colors hover:text-[#3A302A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4A3D34]",
          active: "!text-[#3A302A] underline decoration-[#C9AE82] underline-offset-[10px]",
          cta: `${btn} !min-h-11 !px-5 text-sm`,
          burger: "rounded-full border border-[#D9CCBC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4A3D34]",
          panel: "border-t border-[#EADFD2] bg-[#F8F4EE]",
          panelLink: `flex min-h-12 items-center px-5 ${serif} text-[1.375rem]`,
        }}
      />
      <main>{body}</main>
      <footer className="border-t border-[#EADFD2] bg-[#F1E8DD]">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
          <div>
            <p className={`${serif} text-3xl tracking-[0.18em]`}>IVELLE</p>
            <p className={`mt-2 text-sm ${soft}`}>{l(t.tagline)}</p>
          </div>
          <Info {...props} compact />
          <nav aria-label="Footer" className="flex flex-col items-start gap-1">
            {s.nav.map((n) => (
              <Link key={n.href} href={n.href} className="inline-flex min-h-10 items-center text-[15px] hover:underline">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className={`border-t border-[#E3D7C8] px-5 py-5 text-center text-[13px] ${soft}`}>{l(UI.disclaimer)}</p>
      </footer>
    </div>
  );
}

function Closing(props: SiteProps) {
  const { t } = props;
  const s = site(props);
  return (
    <section className="px-5 pb-16 sm:px-8 lg:pb-24">
      <div className="mx-auto max-w-[1200px] rounded-[32px] bg-[#E9DCCB] px-6 py-14 text-center sm:py-16">
        <h2 className={`${serif} text-[2rem] leading-tight sm:text-[2.75rem]`}>{s.l(t.home.closing.title)}</h2>
        <p className={`mx-auto mt-3 max-w-md text-[17px] ${soft}`}>{s.l(t.home.closing.text)}</p>
        <Link href={s.href("dat-lich")} className={`${btn} mt-8`}>
          {s.l(t.bookLabel)}
        </Link>
      </div>
    </section>
  );
}

function Info(props: SiteProps & { compact?: boolean }) {
  const { t, compact } = props;
  const s = site(props);
  return (
    <div className={`space-y-5 text-[15px] ${compact ? "" : "rounded-3xl border border-[#E7DCCE] p-6 sm:p-8"}`}>
      <div className="flex gap-3">
        <MapPin className="mt-0.5 size-4 shrink-0 text-[#8C7357]" aria-hidden />
        <div>
          {!compact && <p className="text-xs uppercase tracking-[0.2em] text-[#7A6452]">{s.l(UI.address)}</p>}
          <p className={compact ? "" : "mt-1"}>{t.contact.address}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Clock className="mt-0.5 size-4 shrink-0 text-[#8C7357]" aria-hidden />
        <div>
          {!compact && <p className="text-xs uppercase tracking-[0.2em] text-[#7A6452]">{s.l(UI.hours)}</p>}
          <dl className={compact ? "" : "mt-1"}>
            {t.contact.hours.map((h, i) => (
              <div key={i} className="flex gap-3">
                <dt className="min-w-[96px]">{s.l(h.days)}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {!compact && (
        <div className="border-t border-[#EADFD2] pt-5">
          <DemoPhone phone={t.contact.phone} note={s.l(UI.form.callDemo)} className="font-medium" />
          <p className={`mt-1 ${soft}`}>{t.contact.email}</p>
        </div>
      )}
    </div>
  );
}
