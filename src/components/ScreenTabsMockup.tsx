"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";
import { SHOT, TAB_ICONS, type TabIcon } from "./featuresData";
import { PhoneShot } from "./ui/AppShot";
import { useTranslations } from "next-intl";
import { DeviceToggle, type Device } from "./ui/DeviceSwitch";

type View = { key: string; label: string; src: string; icon: TabIcon; mobile?: string };

// Khung trình duyệt lớn có tab để chuyển giữa các màn hình của app.
// Tự chuyển tab mỗi vài giây cho tới khi người dùng bấm chọn. Bấm vào ảnh để xem phóng to.
// Trên điện thoại, màn nào có ảnh chụp bản mobile thì hiện ảnh đó trong khung máy (đọc được, không phải thu nhỏ bản PC).
export function ScreenTabsMockup({
  views,
  zoomLabel,
  closeLabel,
  className = "",
}: {
  views: View[];
  zoomLabel: string;
  closeLabel: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [zoom, setZoom] = useState(false);
  const hasMobile = views.every((v) => v.mobile);
  const [device, setDevice] = useState<Device>("phone");
  const tDevice = useTranslations("device");
  const showPhone = hasMobile && device === "phone";

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zoom]);

  useEffect(() => {
    if (!auto || views.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % views.length), 6000);
    return () => window.clearInterval(id);
  }, [auto, views.length]);

  return (
    <>
    {hasMobile && <DeviceToggle value={device} onChange={setDevice} className="mb-4" />}
    <div className={`overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sg-lg sm:rounded-3xl ${className}`}>
      <div className="flex items-center gap-3 border-b border-line bg-white px-3 py-2.5 sm:px-5 sm:py-3">
        <div className="hidden gap-1.5 sm:flex" aria-hidden>
          <span className="size-3 rounded-full bg-[#e2d9db]" />
          <span className="size-3 rounded-full bg-[#e2d9db]" />
          <span className="size-3 rounded-full bg-[#e2d9db]" />
        </div>
        {views.length > 1 ? (
          <div
            className="-mx-1 flex min-w-0 gap-1 overflow-x-auto px-1 [scrollbar-width:none] sm:mx-auto sm:rounded-full sm:border sm:border-line sm:bg-sand sm:p-1"
            role="tablist"
          >
            {views.map((v, i) => {
              const Icon = TAB_ICONS[v.icon];
              const on = active === i;
              return (
                <button
                  key={v.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setActive(i);
                    setAuto(false);
                  }}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-200 sm:px-4 sm:text-sm ${
                    on
                      ? "bg-white text-brand-700 ring-1 ring-line"
                      : "text-muted hover:bg-white/70 hover:text-ink"
                  }`}
                >
                  <Icon className="size-4" aria-hidden />
                  {v.label}
                </button>
              );
            })}
          </div>
        ) : (
          <span className="mx-auto truncate text-sm font-semibold text-muted">{views[0]?.label}</span>
        )}
        <button
          type="button"
          onClick={() => {
            setZoom(true);
            setAuto(false);
          }}
          className="ml-auto flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-brand-50 hover:text-brand-700 sm:ml-0"
          aria-label={zoomLabel}
          title={zoomLabel}
        >
          <Maximize2 className="size-4" aria-hidden />
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          setZoom(true);
          setAuto(false);
        }}
        className={`relative block aspect-[1600/1165] w-full cursor-zoom-in overflow-hidden bg-sand ${showPhone ? "max-sm:hidden" : hasMobile ? "sg-swap" : ""}`}
        aria-label={zoomLabel}
      >
        {views.map((v, i) => (
          <img
            key={v.key}
            src={v.src}
            alt={v.label}
            width={SHOT.w}
            height={SHOT.h}
            sizes="(max-width: 1200px) 100vw, 1152px"
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-contain object-top transition-opacity duration-500 ${
              active === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </button>
      {showPhone && (
        <div className="sg-swap bg-sand px-6 py-6 sm:hidden">
          <PhoneShot key={views[active].mobile} src={views[active].mobile!} alt={views[active].label} className="sg-swap mx-auto max-w-[300px]" />
        </div>
      )}
      {zoom &&
        createPortal(
          <div
            className="sg-fade fixed inset-0 z-[60] flex flex-col bg-[#1a0a10]/95 font-sans"
            role="dialog"
            aria-modal="true"
            aria-label={views[active].label}
            onClick={() => setZoom(false)}
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 text-white">
              <span className="truncate text-sm font-semibold">{views[active].label}</span>
              <button
                type="button"
                onClick={() => setZoom(false)}
                className="flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-semibold transition-colors hover:bg-white/25"
              >
                <X className="size-4" aria-hidden />
                {closeLabel}
              </button>
            </div>
            {/* Mobile: ảnh rộng gấp đôi màn hình, vuốt ngang/dọc để xem chi tiết */}
            <div className="min-h-0 flex-1 overflow-auto overscroll-contain px-3 pb-6 sm:flex sm:items-start sm:justify-center sm:px-6">
              <img
                src={views[active].src}
                alt={views[active].label}
                width={SHOT.w}
                height={SHOT.h}
                onClick={(e) => e.stopPropagation()}
                className="sg-pop h-auto w-[220%] max-w-none rounded-xl sm:w-full sm:max-w-[1600px]"
              />
            </div>
          </div>,
          document.getElementById("sg-root") ?? document.body,
        )}
    </div>
    {hasMobile && !showPhone && <p className="sg-fade mt-2 text-center text-xs text-muted sm:hidden">{tDevice("zoomHint")}</p>}
    </>
  );
}
