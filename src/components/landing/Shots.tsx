import { SHOTS, type Shot, type ShotId } from "@/lib/media";

/** Ảnh app máy tính trong khung cửa sổ mảnh (3 chấm), không dùng khung laptop. */
export function DesktopShot({ id, alt, priority = false, className = "" }: { id: ShotId; alt: string; priority?: boolean; className?: string }) {
  const s = SHOTS[id];
  return (
    <figure className={`x-shot ${className}`}>
      <div className="flex h-7 items-center gap-1.5 border-b border-black/[0.06] bg-[#FCFAFA] px-3" aria-hidden>
        <span className="size-2.5 rounded-full bg-[#E9E1E3]" />
        <span className="size-2.5 rounded-full bg-[#E9E1E3]" />
        <span className="size-2.5 rounded-full bg-[#E9E1E3]" />
      </div>
      <img
        src={s.desktop}
        alt={alt}
        width={s.dw}
        height={s.dh}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className="block h-auto w-full"
      />
    </figure>
  );
}

/**
 * Ảnh app điện thoại trong khung máy thật (kiểu iPhone 15/16): viền mảnh, góc đồng tâm (bo trong = bo ngoài − viền),
 * Dynamic Island, thanh trạng thái, nút cạnh. Kích thước theo bề rộng khung (container query) nên đúng ở mọi cỡ.
 * `crop`: chỉ nửa trên của máy (dùng trong thẻ có chiều cao cố định).
 */
export function PhoneShot({ id, ...rest }: { id: ShotId; alt: string; priority?: boolean; className?: string; crop?: boolean }) {
  return <DevicePhone shot={SHOTS[id]} {...rest} />;
}

/** Cùng khung máy, nhận thẳng một Shot (dùng ở trang Tính năng / Giải pháp / Gói Bàn). */
export function DevicePhone({ shot: s, alt, priority = false, className = "", crop = false }: { shot: Shot; alt: string; priority?: boolean; className?: string; crop?: boolean }) {
  return (
    <figure className={`x-phone ${crop ? "x-phone-crop" : ""} ${className}`}>
      <div className="x-phone-body">
        <div className="x-phone-screen">
          <div className="x-phone-status" aria-hidden>
            <span>9:41</span>
            <span className="x-phone-battery" />
          </div>
          <img
            src={s.phone}
            alt={alt}
            width={s.pw}
            height={s.ph}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            className="block h-auto w-full"
          />
          <span className="x-phone-island" aria-hidden />
        </div>
      </div>
    </figure>
  );
}
