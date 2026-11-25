"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SIGNUP_URL, appLink } from "@/lib/app-links";

/**
 * Nút "Dùng thử" dính dưới màn hình điện thoại: hiện sau khi cuộn qua màn đầu, ẩn khi đã thấy
 * một nút dùng thử khác (data-cta) hoặc chân trang, để không có hai nút giống nhau cùng lúc.
 */
export function MobileCta() {
  const t = useTranslations("site.nav");
  const locale = useLocale();
  const [past, setPast] = useState(false);
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const seen = new Set<Element>();
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        if (e.isIntersecting) seen.add(e.target);
        else seen.delete(e.target);
      }
      setCovered(seen.size > 0);
    });
    document.querySelectorAll("[data-cta], footer").forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = past && !covered;
  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_-16px_rgba(34,22,26,0.25)] transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <a href={appLink(SIGNUP_URL, locale)} tabIndex={show ? 0 : -1} className="x-btn-primary w-full !min-h-[52px]">
        {t("cta")}
      </a>
    </div>
  );
}
