"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { MOBILE_QUERY, videoSrc, type SalonVideo } from "@/lib/videos";

// Video tính năng, nhẹ cho trang: trước khi bấm chỉ là ảnh bìa (tải lười), bấm mới tải video.
// Màn hình hẹp lấy bản dọc 4:5, màn hình rộng lấy bản ngang 16:9 — chỉ tải đúng một bản.
export function FeatureVideo({
  video,
  title,
  playLabel,
  note,
  autoPlay = false,
  priority = false,
  className = "",
}: {
  video: SalonVideo;
  title: string;
  playLabel: string;
  note?: string;
  autoPlay?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const s = videoSrc(video);
  const [src, setSrc] = useState<string | null>(() =>
    autoPlay && typeof window !== "undefined" ? (window.matchMedia(MOBILE_QUERY).matches ? s.mobile : s.pc) : null,
  );
  const play = () => setSrc(window.matchMedia(MOBILE_QUERY).matches ? s.mobile : s.pc);

  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-nude-deep shadow-sg-lg ring-1 ring-line md:aspect-video ${className}`}
    >
      {src ? (
        <video
          key={src}
          src={src}
          poster={src === s.mobile ? s.posterMobile : s.posterPc}
          controls
          autoPlay
          playsInline
          preload="auto"
          className="absolute inset-0 size-full bg-nude-deep object-contain"
          aria-label={title}
        />
      ) : (
        <button type="button" onClick={play} className="group absolute inset-0 block size-full text-left" aria-label={`${playLabel}: ${title}`}>
          <picture>
            <source media={MOBILE_QUERY} srcSet={s.posterMobile} width={864} height={1080} />
            <img
              src={s.posterPc}
              alt=""
              width={1280}
              height={720}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.015] motion-reduce:transition-none"
            />
          </picture>
          <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <span className="relative flex size-[72px] items-center justify-center rounded-full bg-brand-700 text-white ring-[5px] ring-white transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none sm:size-20">
              <Play className="ml-1 size-8 fill-current sm:size-9" aria-hidden />
            </span>
          </span>
          <span className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2 sm:bottom-5 sm:left-5">
            <span className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink shadow-sg-sm">
              {playLabel} <span className="ml-1 font-medium text-muted">{video.duration}</span>
            </span>
            {note && <span className="rounded-full bg-ink px-3.5 py-1.5 text-[12px] font-medium text-white">{note}</span>}
          </span>
        </button>
      )}
    </div>
  );
}
