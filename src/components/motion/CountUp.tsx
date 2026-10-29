"use client";

import { useEffect, useRef, useState } from "react";

// Số đếm từ 0 lên khi cuộn tới; SSR và khi tắt chuyển động vẫn hiện số cuối
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const m = value.match(/^(\D*)(\d+)(.*)$/);
  const target = m ? parseInt(m[2], 10) : 0;
  const [shown, setShown] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!m || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 4);
        setShown(Math.round(target * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    setShown(0);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!m) return <span>{value}</span>;
  return (
    <span ref={ref} className="tabular-nums">
      {m[1]}
      {shown === null ? m[2] : shown}
      {m[3]}
    </span>
  );
}
