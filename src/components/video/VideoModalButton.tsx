"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import type { SalonVideo } from "@/lib/videos";
import { FeatureVideo } from "./FeatureVideo";

// Nút "Xem video" mở video trong cửa sổ nổi; video chỉ tải khi mở, đóng là dừng hẳn
export function VideoModalButton({
  video,
  title,
  label,
  playLabel,
  closeLabel,
  note,
  className = "",
}: {
  video: SalonVideo;
  title: string;
  label: string;
  playLabel: string;
  closeLabel: string;
  note?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex min-h-11 items-center gap-2.5 rounded-full border border-brand-700/20 bg-white py-1.5 pl-1.5 pr-4 text-sm font-semibold text-brand-700 shadow-sm transition-colors hover:border-brand-700/50 ${className}`}
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-brand-700 text-white" aria-hidden>
          <Play className="ml-0.5 size-3.5 fill-current" />
        </span>
        {label} · {video.duration}
      </button>
      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === ref.current && setOpen(false)}
        aria-label={title}
        className="m-auto w-[min(92vw,1100px)] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-[#1a0409]/80 backdrop:backdrop-blur-sm max-md:w-[min(92vw,480px)]"
      >
        {open && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 flex size-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
              aria-label={closeLabel}
            >
              <X className="size-5" aria-hidden />
            </button>
            <FeatureVideo video={video} title={title} playLabel={playLabel} note={note} autoPlay className="max-md:max-h-[78vh]" />
            <p className="mt-3 text-center text-sm font-medium text-white/85">{title}</p>
          </div>
        )}
      </dialog>
    </>
  );
}
