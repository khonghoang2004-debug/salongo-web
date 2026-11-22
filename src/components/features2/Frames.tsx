import type { Shot } from "@/lib/media";
import { DevicePhone } from "@/components/landing/Shots";

/**
 * Ảnh app theo màn hình: điện thoại dưới md (ảnh app trên điện thoại), từ md trở lên ảnh máy tính trong cửa sổ mảnh.
 * Cùng cách ghép cặp <img> md:hidden / hidden md:block như DayTourClient.
 */
export function ResponsiveShot({ shot, alt, phoneAlt, className = "" }: { shot: Shot; alt: string; phoneAlt?: string; className?: string }) {
  return (
    <div className={className}>
      <div className="w-[64%] max-w-[270px] md:hidden">
        <DevicePhone shot={shot} alt={phoneAlt ?? alt} />
      </div>
      <Window shot={shot} alt={alt} className="hidden md:block" />
    </div>
  );
}

/** Cửa sổ app máy tính (3 chấm), cắt theo tỉ lệ 16:10 để mọi ảnh cùng khung. */
export function Window({ shot, alt, className = "" }: { shot: Shot; alt: string; className?: string }) {
  return (
    <figure className={`x-shot ${className}`}>
      <div className="flex h-7 items-center gap-1.5 border-b border-black/[0.06] bg-[#FCFAFA] px-3" aria-hidden>
        <span className="size-2.5 rounded-full bg-[#E9E1E3]" />
        <span className="size-2.5 rounded-full bg-[#E9E1E3]" />
        <span className="size-2.5 rounded-full bg-[#E9E1E3]" />
      </div>
      <div className="aspect-[16/10] overflow-hidden">
        <img src={shot.desktop} alt={alt} width={shot.dw} height={shot.dh} loading="lazy" decoding="async" className="block h-full w-full object-cover object-left-top" />
      </div>
    </figure>
  );
}

/** Điện thoại đứng một mình (ảnh app điện thoại) — dùng ở mọi cỡ màn hình. */
export function Phone({ shot, alt, className = "" }: { shot: Shot; alt: string; className?: string }) {
  return (
    <DevicePhone shot={shot} alt={alt} className={className} />
  );
}

/**
 * Máy tính + điện thoại chồng góc dưới trái (như đầu trang chủ). Dưới md chỉ còn điện thoại.
 * Dùng khi hai màn liên quan: vd. khách đặt trên điện thoại, tiệm duyệt trên máy tính.
 */
export function PairShot({ desktop, phone, alt, phoneAlt }: { desktop: Shot; phone: Shot; alt: string; phoneAlt: string }) {
  return (
    <div>
      <Phone shot={phone} alt={phoneAlt} className="w-[64%] max-w-[270px] md:hidden" />
      <div className="relative hidden pb-[9%] pl-[15%] md:block">
        <Window shot={desktop} alt={alt} />
        <Phone shot={phone} alt={phoneAlt} className="absolute bottom-0 left-0 w-[20%] max-w-[210px]" />
      </div>
    </div>
  );
}

/** Hai điện thoại lệch nhau (cái sau thấp hơn), có chú thích; dùng cho phần chỉ có trên điện thoại. */
export function TwoPhones({ items }: { items: { shot: Shot; alt: string; caption?: string }[] }) {
  return (
    <div className="flex items-start gap-5 sm:gap-8 lg:justify-center">
      {items.map((it, i) => (
        <figure key={it.shot.phone} className={`w-[46%] max-w-[260px] ${i % 2 ? "mt-8 lg:mt-20" : ""}`}>
          <DevicePhone shot={it.shot} alt={it.alt} />
          {it.caption && <figcaption className="mt-5 text-[14px] leading-snug text-muted">{it.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
