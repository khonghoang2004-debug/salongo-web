import { Lock } from "lucide-react";

/** Ảnh chụp từ chính demo (nội dung demo luôn tiếng Séc, cách chụp lại: docs/website-templates/README.md): 1200×750 (PC), 780×1520 (điện thoại) */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const previewSrc = (slug: string, kind: "pc" | "m", _locale?: string) => `/images/website/${slug}-${kind}.webp`;

// Ảnh xem trước một mẫu: khung trình duyệt (PC) + khung điện thoại đè góc phải
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
  return (
    <div className={`relative overflow-hidden rounded-[20px] px-4 pb-0 pt-5 sm:px-7 sm:pt-7 ${className}`} style={{ backgroundColor: tint }}>
      <div className={`${phone ? "mr-[22%] sm:mr-[18%]" : ""} overflow-hidden rounded-t-xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(30,20,15,0.12)]`}>
        <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#FAF8F6] px-3 py-2">
          <span className="size-2 rounded-full bg-[#E2D9D6]" />
          <span className="size-2 rounded-full bg-[#E2D9D6]" />
          <span className="size-2 rounded-full bg-[#E2D9D6]" />
          {/* Không ghi tên miền: tên miền bịa có thể trùng website có thật */}
          <span className="ml-2 hidden min-w-0 items-center gap-1 truncate text-[10px] text-[#8A8082] sm:flex">
            <Lock className="size-2.5 shrink-0" aria-hidden />
            {name}
          </span>
        </div>
        <img
          src={previewSrc(slug, "pc", locale)}
          alt={`${name} — ${label.desktop}`}
          width={1200}
          height={750}
          loading="lazy"
          decoding="async"
          className="block aspect-[16/10] w-full object-cover object-top"
        />
      </div>
      {phone && (
        <div className="absolute bottom-0 right-3 w-[27%] translate-y-[8%] rounded-[18px] bg-[#1F1A1A] p-[5px] shadow-[0_8px_24px_rgba(30,20,15,0.22)] sm:right-6 sm:w-[22%] sm:rounded-[22px] sm:p-1.5">
          <img
            src={previewSrc(slug, "m", locale)}
            alt={`${name} — ${label.mobile}`}
            width={390}
            height={760}
            loading="lazy"
            decoding="async"
            className="block aspect-[390/760] w-full rounded-[13px] object-cover object-top sm:rounded-[16px]"
          />
        </div>
      )}
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
  "chroma-nails": "#C3CFFF",
  "aurel-beauty": "#DCCDB2",
  "tropicana-nails": "#9BE7DE",
  "cherry-hair": "#F2A541",
  "lilac-lash": "#CBB8FF",
  "matcha-spa": "#C6DBA0",
  "azure-barber": "#B9CDE3",
  "rose-bridal": "#F4B6C7",
  "saffron-color": "#FDE3A2",
};
