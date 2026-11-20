"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneShot } from "./Shots";
import { SHOTS, type ShotId } from "@/lib/media";

export type DayStep = { time: string; title: string; desc: string; shot: ShotId; alt: string };

/**
 * "Một ngày ở tiệm": trên máy tính, chữ cuộn bên trái, ảnh app bên phải dính lại và đổi theo bước đang đọc.
 * Trên điện thoại / iPad dọc: mỗi bước một khối, ảnh điện thoại ngay dưới chữ.
 */
export function DayTourClient({ steps }: { steps: DayStep[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 [&>*]:min-w-0">
      <ol className="lg:col-span-5">
        {steps.map((s, i) => (
          <li
            key={s.time}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="relative border-l border-line pb-12 pl-7 last:pb-0 lg:flex lg:min-h-[40vh] lg:flex-col lg:justify-center lg:pb-0"
          >
<p className={`relative text-[15px] font-semibold tabular-nums transition-colors ${active === i ? "text-brand-700" : "text-muted"}`}>
              <span className={`absolute -left-[33px] top-1/2 size-[9px] -translate-y-1/2 rounded-full transition-colors duration-300 ${active === i ? "bg-brand-700" : "bg-line"}`} aria-hidden />
              {s.time}
            </p>
            <h3 className="x-h3 mt-2 text-ink">{s.title}</h3>
            <p className="x-body mt-3 max-w-[30rem]">{s.desc}</p>
            <div className="mt-7 lg:hidden">
              <div className="mx-auto w-[64%] max-w-[280px] md:hidden">
                <PhoneShot id={s.shot} alt={s.alt} />
              </div>
              <img
                src={SHOTS[s.shot].desktop}
                alt={s.alt}
                width={SHOTS[s.shot].dw}
                height={SHOTS[s.shot].dh}
                loading="lazy"
                decoding="async"
                className="x-shot hidden h-auto w-full md:block"
              />
            </div>
          </li>
        ))}
      </ol>
      <div className="hidden lg:col-span-7 lg:block">
        <div className="sticky top-[calc(50vh-min(22vw,300px))]">
          <div className="relative aspect-[1600/1000] overflow-hidden rounded-[14px]">
            {steps.map((s, i) => (
              <img
                key={s.time}
                src={SHOTS[s.shot].desktop}
                alt={active === i ? s.alt : ""}
                aria-hidden={active !== i}
                width={SHOTS[s.shot].dw}
                height={SHOTS[s.shot].dh}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`x-shot absolute inset-0 h-full w-full object-cover object-left-top transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
