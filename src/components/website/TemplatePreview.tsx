import type { Shot } from "@/lib/media";
import { DeviceDesktop, DevicePhone } from "@/components/landing/Shots";
import { KIT_SPECS } from "./kit/specs";

/** Ảnh chụp từ chính demo (nội dung demo luôn tiếng Séc, cách chụp lại: docs/website-templates/README.md): 1200×750 (PC), 780×1520 (điện thoại) */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const previewSrc = (slug: string, kind: "pc" | "m", _locale?: string) => `/images/website/${slug}-${kind}.webp`;

/** Ảnh xem trước của một mẫu dưới dạng Shot (để dùng chung khung máy với trang chủ: DeviceDesktop / DevicePhone) */
export const templateShot = (slug: string, locale?: string): Shot => ({
  desktop: previewSrc(slug, "pc", locale),
  phone: previewSrc(slug, "m", locale),
  dw: 1200,
  dh: 750,
  pw: 390,
  ph: 760,
});

/**
 * Ảnh xem trước một mẫu: cửa sổ máy tính + iPhone đặt cạnh nhau (không đè nhau), đáy thẳng hàng.
 * Điện thoại ≈ 24% bề rộng thì hai khung cao bằng nhau ở mọi cỡ màn hình.
 */
export function TemplatePreview({
  slug,
  name,
  label,
  tint,
  phone = true,
  className = "",
  locale,
}: {
  locale: string;
  slug: string;
  name: string;
  label: { desktop: string; mobile: string };
  tint: string;
  phone?: boolean;
  className?: string;
}) {
  const s = templateShot(slug, locale);
  return (
    <div className={`overflow-hidden rounded-[20px] p-4 sm:p-6 ${className}`} style={{ backgroundColor: tint }}>
      <div className={phone ? "grid grid-cols-[minmax(0,1fr)_24%] items-end gap-3 sm:gap-4" : ""}>
        <DeviceDesktop src={s.desktop} width={s.dw} height={s.dh} alt={`${name} — ${label.desktop}`} className="!rounded-[10px]" />
        {phone && <DevicePhone shot={s} alt={`${name} — ${label.mobile}`} />}
      </div>
    </div>
  );
}

/** Màu nền khung xem trước của từng mẫu */
export const PREVIEW_TINT: Record<string, string> = {
  "ivelle-nail": "#EFE5D9",
  "verra-hair": "#DCCFBE",
  "saluna-spa": "#E3E6D8",
  "brass-barber": "#D9CBB6",
  "lumen-hair": "#E6DED0",
  "velvet-lash": "#EBCFC7",
  "chroma-nails": "#F3E3A1",
  "aurel-beauty": "#DCCDB2",
  "marelle-nails": "#8FB0AD",
  "hugo-hair": "#EBEBEB",
  "onyx-spa": "#2A2622",
  "iris-lash": "#E9E4DF",
  "kora-skin": "#C7CDC9",
  "nova-studio": "#E6DDD3",
  ...Object.fromEntries(Object.entries(KIT_SPECS).map(([slug, k]) => [slug, k.tint])),
};
