"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "[data-reveal]:not(.is-in), [data-stagger]:not(.is-in)";

// Theo dõi mọi phần tử có data-reveal / data-stagger và thêm class is-in khi chúng cuộn vào màn hình
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("sg-js");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    const scan = () => document.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
    scan();

    // Nội dung mới (đổi tab, mở menu...) cũng được theo dõi
    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
