"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { Clip, ClipId } from "@/lib/clips";

export type ClipItem = Clip & { title: string; desc: string };

/**
 * Xem app chạy thật: chọn đoạn phim (chip), phim tự chạy không tiếng khi cuộn tới (trừ khi người xem tắt chuyển động),
 * có nút tạm dừng. Điện thoại dùng bản dọc 4:5.
 */
export function ClipReel({ items, playLabel, pauseLabel }: { items: ClipItem[]; playLabel: string; pauseLabel: string }) {
  const [active, setActive] = useState<ClipId>(items[0].id);
  const [playing, setPlaying] = useState(false);
  const [mobile, setMobile] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const cur = items.find((i) => i.id === active)!;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => {
      const v = video.current;
      if (!v) return;
      if (e.isIntersecting && !reduce && !userPaused.current) v.play().catch(() => {});
      if (!e.isIntersecting) v.pause();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.load();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && !userPaused.current) v.play().catch(() => {});
  }, [active, mobile]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 [&>*]:min-w-0">
      <div className="lg:col-span-4">
        <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:overflow-visible lg:px-0" role="tablist" aria-label="Video">
          <div className="flex w-max gap-2 lg:w-auto lg:flex-col lg:gap-0 lg:border-t lg:border-line">
            {items.map((it) => {
              const on = it.id === active;
              return (
                <button
                  key={it.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(it.id)}
                  className={`min-h-11 whitespace-nowrap rounded-full border px-4 text-left text-[15px] font-medium transition-colors lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-4 ${
                    on ? "border-ink bg-ink text-white lg:bg-transparent lg:text-ink" : "border-line bg-white text-ink/70 hover:text-ink lg:bg-transparent"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`hidden size-1.5 shrink-0 rounded-full lg:block ${on ? "bg-brand-700" : "bg-transparent"}`} aria-hidden />
                    {it.title}
                  </span>
                  {on && <span className="mt-1.5 hidden pl-[1.125rem] text-[14.5px] font-normal leading-relaxed text-muted lg:block">{it.desc}</span>}
                </button>
              );
            })}
          </div>
        </div>
        <p className="mt-5 text-[15px] leading-relaxed text-muted lg:hidden">{cur.desc}</p>
      </div>
      <div ref={box} className="relative lg:col-span-8">
        <div className={`relative mx-auto overflow-hidden rounded-[18px] bg-porcelain ring-1 ring-black/[0.06] ${mobile ? "aspect-[4/5] max-w-[440px]" : "aspect-[16/10]"}`}>
          <video
            ref={video}
            key={`${active}-${mobile}`}
            muted
            loop
            playsInline
            preload="metadata"
            poster={mobile ? cur.posterMobile : cur.posterPc}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="absolute inset-0 h-full w-full object-cover"
            aria-label={cur.title}
          >
            <source src={mobile ? cur.mobile : cur.pc} type="video/mp4" />
          </video>
          <button
            type="button"
            onClick={toggle}
            className="absolute bottom-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur transition-colors hover:bg-white"
          >
            {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4 translate-x-px" aria-hidden />}
            <span className="sr-only">{playing ? pauseLabel : playLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
