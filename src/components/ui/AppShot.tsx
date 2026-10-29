import { Info } from "lucide-react";

// Ảnh chụp app trên điện thoại (390 × 844 pt, lưu 780 × 1688 px) trong khung máy
export function PhoneShot({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`sg-phone ${className}`}>
      <img
        src={src}
        alt={alt}
        width={780}
        height={1688}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block h-auto w-full rounded-[22px]"
      />
    </div>
  );
}

// Ghi chú dưới ảnh: ảnh thật từ app nhưng số liệu là dữ liệu minh hoạ
export function DemoNote({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`flex items-center gap-1.5 text-xs text-muted ${className}`}>
      <Info className="size-3.5 shrink-0" aria-hidden />
      {text}
    </p>
  );
}
