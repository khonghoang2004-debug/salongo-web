import { Clock, Mail, MapPin, Navigation, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DemoPhone } from "../templates/DemoUI";
import { UI } from "../templates/common";
import { EXTRAS, type Extras } from "../templates/content/extras";
import { tr, type L, type TemplateContent } from "../templates/types";

// Khối "như website thật" dùng chung cho các mẫu đã nâng cấp (đợt 1, 21/11): huy hiệu đánh giá, dải recenze,
// giờ mở cửa + địa chỉ + bản đồ minh hoạ (SVG tự vẽ, không phải bản đồ thật), chân trang nhiều cột, thanh đặt lịch đáy màn hình điện thoại.
// Mỗi mẫu truyền class / màu của mình vào, nên khối giữ đúng phong cách mẫu.

export const extrasOf = (slug: string): Extras => EXTRAS[slug];

const t = (k: keyof typeof UI, locale: string) => tr(UI[k] as L, locale);

export function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="size-[0.95em] fill-current" strokeWidth={0} />
      ))}
    </span>
  );
}

/** "★★★★★ 4,9 · 312 hodnocení · Online rezervace 24/7" (dưới nút ở đầu trang) */
export function RatingBadge({ x, locale, className = "", starClass = "", online = true }: { x: Extras; locale: string; className?: string; starClass?: string; online?: boolean }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 ${className}`}>
      <Stars className={starClass} />
      <span>
        <strong className="font-semibold">{x.rating}</strong> · {x.count} {t("ratings", locale)}
      </span>
      {online && (
        <>
          <span aria-hidden className="hidden opacity-40 sm:inline">
            |
          </span>
          <span className="w-full sm:w-auto">{t("online", locale)}</span>
        </>
      )}
    </p>
  );
}

export type ReviewClasses = {
  /** tiêu đề h2 */
  title: string;
  score: string;
  stars: string;
  card: string;
  quote: string;
  name: string;
  meta: string;
};

/** Dải recenze: điểm trung bình + 3 thẻ (điện thoại: cuộn ngang) */
export function Reviews({ x, locale, c, title }: { x: Extras; locale: string; c: ReviewClasses; title?: React.ReactNode }) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <h2 className={c.title}>{title ?? t("reviews", locale)}</h2>
        <div className="flex items-center gap-4">
          <span className={c.score}>{x.rating}</span>
          <span className="flex flex-col gap-1">
            <Stars className={c.stars} />
            <span className={c.meta}>
              {x.count} {t("ratings", locale)}
            </span>
          </span>
        </div>
      </div>
      <ul className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
        {x.reviews.map((r) => (
          <li key={r.name} className={`flex w-[82%] shrink-0 snap-start flex-col sm:w-[60%] md:w-auto ${c.card}`}>
            <Stars className={c.stars} />
            <blockquote className={`mt-4 flex-1 ${c.quote}`}>„{r.text}“</blockquote>
            <p className={`mt-5 ${c.name}`}>{r.name}</p>
            <p className={c.meta}>{r.service}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export type MapPalette = { land: string; block: string; road: string; water: string; park: string; pin: string; pinInk: string; text: string };

/** Bản đồ minh hoạ (SVG): đường, sông, công viên và ghim tên salon. Không phải bản đồ thật. */
export function MapArt({ name, area, p, label, className = "" }: { name: string; area: string; p: MapPalette; label: string; className?: string }) {
  const w = Math.max(110, name.length * 11 + 40);
  return (
    <svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${label}: ${name}, ${area}`} className={`block size-full ${className}`}>
      <rect width="600" height="420" fill={p.land} />
      {/* bloky domů */}
      {[
        [30, 30, 150, 90],
        [210, 30, 120, 90],
        [360, 30, 110, 60],
        [500, 30, 90, 120],
        [30, 150, 90, 110],
        [150, 150, 130, 50],
        [380, 120, 90, 80],
        [30, 290, 120, 100],
        [400, 300, 80, 90],
        [510, 180, 80, 70],
      ].map(([x, y, bw, bh], i) => (
        <rect key={i} x={x} y={y} width={bw} height={bh} rx="6" fill={p.block} />
      ))}
      <rect x="170" y="230" width="150" height="110" rx="18" fill={p.park} />
      {[
        [205, 265],
        [240, 300],
        [282, 260],
        [215, 318],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="11" fill={p.block} opacity="0.55" />
      ))}
      <path d="M-20 400 C 120 360, 200 410, 330 372 S 520 300, 640 330" fill="none" stroke={p.water} strokeWidth="38" strokeLinecap="round" />
      {/* ulice */}
      <g stroke={p.road} strokeLinecap="round" fill="none">
        <path d="M0 132 H600" strokeWidth="14" />
        <path d="M345 0 V420" strokeWidth="14" />
        <path d="M140 0 C 150 120, 130 220, 160 420" strokeWidth="9" />
        <path d="M0 270 C 120 262, 260 285, 600 262" strokeWidth="9" />
        <path d="M490 0 V420" strokeWidth="6" />
        <path d="M0 212 H345" strokeWidth="6" />
        <path d="M345 290 L600 170" strokeWidth="6" />
      </g>
      <text x="572" y="404" textAnchor="end" fontSize="15" letterSpacing="3" fill={p.text} style={{ textTransform: "uppercase", fontFamily: "inherit" }}>
        {area}
      </text>
      {/* ghim */}
      <ellipse cx="345" cy="182" rx="16" ry="5" fill="#000" opacity="0.18" />
      <path d="M345 182 C 345 182, 318 150, 318 128 a27 27 0 0 1 54 0 c 0 22 -27 54 -27 54 z" fill={p.pin} />
      <circle cx="345" cy="128" r="10" fill={p.pinInk} />
      <g transform={`translate(${345 - w / 2} 62)`}>
        <rect width={w} height="32" rx="16" fill={p.pin} />
        <text x={w / 2} y="21" textAnchor="middle" fontSize="15" fontWeight="600" fill={p.pinInk} style={{ fontFamily: "inherit" }}>
          {name}
        </text>
      </g>
    </svg>
  );
}

export type VisitClasses = {
  /** khung bản đồ */
  map: string;
  title: string;
  label: string;
  text: string;
  muted: string;
  /** dòng giờ mở cửa */
  row: string;
  btn: string;
  icon: string;
};

/** Giờ mở cửa + địa chỉ + liên hệ + bản đồ minh hoạ */
export function Visit({
  tpl,
  locale,
  bookHref,
  c,
  palette,
  title,
  flip = false,
}: {
  tpl: TemplateContent;
  locale: string;
  bookHref: string;
  c: VisitClasses;
  palette: MapPalette;
  title?: React.ReactNode;
  flip?: boolean;
}) {
  const x = extrasOf(tpl.slug);
  return (
    <div className="grid items-stretch gap-8 md:grid-cols-2 md:gap-12">
      <div className={`relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[380px] ${flip ? "md:order-2" : ""} ${c.map}`}>
        <MapArt name={tpl.name} area={x.area} p={palette} label={t("mapNote", locale)} className="absolute inset-0" />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white">{t("mapNote", locale)}</span>
      </div>
      <div className="flex flex-col justify-center">
        <h2 className={c.title}>{title ?? t("findUs", locale)}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          <div>
            <p className={`flex items-center gap-2 ${c.label}`}>
              <MapPin className={`size-4 ${c.icon}`} aria-hidden />
              {t("address", locale)}
            </p>
            <p className={`mt-2 ${c.text}`}>{tpl.contact.address}</p>
            <p className={`mt-1 flex items-start gap-2 text-[15px] ${c.muted}`}>
              <Navigation className={`mt-0.5 size-3.5 shrink-0 ${c.icon}`} aria-hidden />
              {x.transit}
            </p>
            <div className={`mt-3 ${c.text}`}>
              <DemoPhone phone={tpl.contact.phone} note={tr(UI.form.callDemo, locale)} className="font-semibold" />
            </div>
            <p className={`flex items-center gap-2 text-[15px] ${c.muted}`}>
              <Mail className={`size-3.5 ${c.icon}`} aria-hidden />
              {tpl.contact.email}
            </p>
          </div>
          <div>
            <p className={`flex items-center gap-2 ${c.label}`}>
              <Clock className={`size-4 ${c.icon}`} aria-hidden />
              {t("hours", locale)}
            </p>
            <dl className="mt-2">
              {tpl.contact.hours.map((h, i) => (
                <div key={i} className={`flex items-baseline justify-between gap-4 py-2 ${c.row}`}>
                  <dt className={c.text}>{tr(h.days, locale)}</dt>
                  <dd className={`whitespace-nowrap tabular-nums ${c.text}`}>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="mt-8">
          <Link href={bookHref} className={c.btn}>
            {tr(tpl.bookLabel, locale)}
          </Link>
        </div>
      </div>
    </div>
  );
}

export type FooterClasses = { head: string; text: string; link: string };

/** 3 cột thông tin cho chân trang: liên hệ, giờ mở cửa, menu (cột thương hiệu do mẫu tự vẽ) */
export function FooterCols({ tpl, locale, nav, c }: { tpl: TemplateContent; locale: string; nav: { href: string; label: string }[]; c: FooterClasses }) {
  return (
    <>
      <div>
        <p className={c.head}>{t("contact", locale)}</p>
        <p className={`mt-3 ${c.text}`}>{tpl.contact.address}</p>
        <p className={`mt-1 ${c.text}`}>{tpl.contact.phone}</p>
        <p className={`mt-1 ${c.text}`}>{tpl.contact.email}</p>
      </div>
      <div>
        <p className={c.head}>{t("hours", locale)}</p>
        {tpl.contact.hours.map((h, i) => (
          <p key={i} className={`mt-1 first-of-type:mt-3 ${c.text}`}>
            {tr(h.days, locale)} · {h.time}
          </p>
        ))}
      </div>
      <nav aria-label="Footer">
        <p className={c.head}>{t("menu", locale)}</p>
        <ul className="mt-1.5">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className={`inline-flex min-h-11 items-center ${c.link}`}>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

/** Thanh đặt lịch cố định ở đáy màn hình điện thoại (ẩn từ lg). Gồm cả khoảng đệm để chân trang không bị che. */
export function MobileBookBar({ href, label, x, locale, c }: { href: string; label: string; x: Extras; locale: string; c: { bar: string; btn: string; text: string; star: string } }) {
  return (
    <>
      <div className="h-[76px] lg:hidden" aria-hidden />
      <div className={`fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 lg:hidden ${c.bar}`}>
        <p className={`min-w-0 flex-1 text-[13px] leading-tight ${c.text}`}>
          <span className="flex items-center gap-1.5">
            <Stars className={c.star} />
            <strong className="font-semibold">{x.rating}</strong>
          </span>
          <span className="block truncate opacity-80">{t("online", locale)}</span>
        </p>
        <Link href={href} className={`shrink-0 ${c.btn}`}>
          {label}
        </Link>
      </div>
    </>
  );
}
