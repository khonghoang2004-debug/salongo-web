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
