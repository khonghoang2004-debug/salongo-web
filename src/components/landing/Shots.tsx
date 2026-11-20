import { SHOTS, type ShotId } from "@/lib/media";

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

/** Ảnh app điện thoại trong khung máy bo tròn. */
export function PhoneShot({ id, alt, priority = false, className = "" }: { id: ShotId; alt: string; priority?: boolean; className?: string }) {
  const s = SHOTS[id];
  return (
    <figure className={`x-phone ${className}`}>
      <img
        src={s.phone}
        alt={alt}
        width={s.pw}
        height={s.ph}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block h-auto w-full"
      />
    </figure>
  );
}
