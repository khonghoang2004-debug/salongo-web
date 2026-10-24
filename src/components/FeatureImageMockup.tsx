"use client";

import { useState, useEffect, useMemo, useRef } from "react";

function getOtherExt(src: string): string | null {
  if (src.endsWith(".jpg") || src.endsWith(".jpeg")) return src.replace(/\.jpe?g$/i, ".png");
  if (src.endsWith(".png")) return src.replace(/\.png$/i, ".jpg");
  return null;
}

function getAllUrls(src: string, altPath?: string | null): string[] {
  if (!src) return [];
  const list: string[] = [src];
  const other = getOtherExt(src);
  if (other && !list.includes(other)) list.push(other);
  if (src.endsWith(".png")) {
    const jpeg = src.replace(/\.png$/i, ".jpeg");
    if (!list.includes(jpeg)) list.push(jpeg);
  }
  if (src.endsWith(".jpg") && !src.endsWith(".jpeg")) {
    const jpeg = src.replace(/\.jpg$/i, ".jpeg");
    if (!list.includes(jpeg)) list.push(jpeg);
  }
  if (altPath) {
    if (!list.includes(altPath)) list.push(altPath);
    const altOther = getOtherExt(altPath);
    if (altOther && !list.includes(altOther)) list.push(altOther);
    if (altPath.endsWith(".png")) {
      const jpeg = altPath.replace(/\.png$/i, ".jpeg");
      if (!list.includes(jpeg)) list.push(jpeg);
    }
    if (altPath.endsWith(".jpg") && !altPath.endsWith(".jpeg")) {
      const jpeg = altPath.replace(/\.jpg$/i, ".jpeg");
      if (!list.includes(jpeg)) list.push(jpeg);
    }
  }
  return list;
}

/**
 * Tries multiple URLs in order: src, src with other extension, altPath, altPath with other extension.
 * So ảnh có thể đặt ở public/images/ hoặc public/images/features/, đuôi .jpg hoặc .png.
 */
export function FeatureImageMockup({
  src,
  altPath,
  alt = "",
  placeholderLabel = "Online Booking Preview",
  className = "",
  imageVariant = "default",
}: {
  src?: string | null;
  /** Thử thêm nếu src lỗi, e.g. /images/features/anh-lich-hen.jpg */
  altPath?: string | null;
  alt?: string;
  placeholderLabel?: string;
  className?: string;
  /** "tall" = tỉ lệ dọc 3:4, object-contain (cho ảnh Lịch của tôi) */
  imageVariant?: "default" | "tall";
}) {
  const urls = useMemo(() => getAllUrls(src ?? "", altPath), [src, altPath]);

  const [tryIndex, setTryIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setTryIndex(0);
    setLoaded(false);
    setImageError(false);
  }, [src, altPath]);

  const currentSrc = urls[tryIndex] ?? null;

  // Ảnh có thể đã tải xong trước khi React gắn onLoad (SSR + cache) → kiểm tra lại sau khi mount
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) {
      if (img.naturalWidth > 0) setLoaded(true);
      else handleError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSrc]);
  const imgSrc = currentSrc ? `${currentSrc}?v=1` : null;

  const handleError = () => {
    if (tryIndex + 1 < urls.length) {
      setTryIndex((i) => i + 1);
      setLoaded(false);
    } else {
      setImageError(true);
    }
  };

  const showPlaceholder = !currentSrc || !loaded || imageError;

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-[0_28px_56px_-28px_rgba(76,29,149,0.35)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-3 sm:px-5 sm:py-3.5">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#f9a8d4]" />
          <span className="size-3 rounded-full bg-[#c4b5fd]" />
          <span className="size-3 rounded-full bg-[#93c5fd]" />
        </div>
        <div className="ml-4 h-2 w-24 rounded bg-neutral-100" />
      </div>
      <div
        className={`relative w-full overflow-hidden bg-neutral-50 ${
          imageVariant === "tall" ? "aspect-[3/4]" : "aspect-[16/10]"
        }`}
      >
        {currentSrc && !imageError && (
          <img
            key={currentSrc}
            ref={imgRef}
            src={imgSrc!}
            alt={alt}
            className={`h-full w-full object-top ${
              imageVariant === "tall" ? "object-contain" : "object-cover"
            }`}
            sizes={imageVariant === "tall" ? "(max-width: 1024px) 100vw, 320px" : "(max-width: 1024px) 100vw, 512px"}
            onLoad={() => setLoaded(true)}
            onError={handleError}
          />
        )}
        {showPlaceholder && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200/80"
            aria-hidden
          >
            <span className="text-sm font-medium text-neutral-400">
              {placeholderLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
