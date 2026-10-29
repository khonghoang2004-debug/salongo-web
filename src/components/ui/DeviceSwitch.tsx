"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Monitor, Smartphone } from "lucide-react";

export type Device = "phone" | "pc";

// Nút gạt "Điện thoại / Máy tính" (chỉ hiện trên màn hình nhỏ): khách đang xem bằng điện thoại
// có thể đổi sang ảnh app trên máy tính. Nút có nền trượt và ảnh hiện dần khi đổi.
export function DeviceToggle({ value, onChange, className = "" }: { value: Device; onChange: (d: Device) => void; className?: string }) {
  const t = useTranslations("device");
  const options = [
    { d: "phone" as const, label: t("phone"), Icon: Smartphone },
    { d: "pc" as const, label: t("pc"), Icon: Monitor },
  ];
  return (
    <div className={`flex justify-center sm:hidden ${className}`}>
      <div role="radiogroup" aria-label={t("label")} className="relative grid grid-cols-2 rounded-full border border-line bg-white p-1 shadow-[0_8px_24px_-14px_rgba(77,0,20,0.45)]">
        {/* Nền trượt dưới lựa chọn đang bật */}
        <span
          aria-hidden
          className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-brand-700 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ transform: value === "pc" ? "translateX(100%)" : "none" }}
        />
        {options.map(({ d, label, Icon }) => {
          const on = value === d;
          return (
            <button
              key={d}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(d)}
              className={`relative z-10 flex min-h-10 items-center justify-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors duration-300 ${
                on ? "text-white" : "text-ink/70"
              }`}
            >
              <Icon className="size-4" aria-hidden />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Ảnh điện thoại / ảnh PC với nút gạt trên mobile; từ sm trở lên luôn hiện bản PC (desktop).
export function DeviceSwitch({
  phone,
  pc,
  desktop,
  className = "",
}: {
  phone: ReactNode;
  /** Bản PC hiện trên điện thoại khi chọn "Máy tính" */
  pc: ReactNode;
  /** Nội dung cho màn hình lớn (mặc định giống pc) */
  desktop?: ReactNode;
  className?: string;
}) {
  const [device, setDevice] = useState<Device>("phone");
  return (
    <div className={className}>
      <DeviceToggle value={device} onChange={setDevice} className="mb-4" />
      <div className="sm:hidden">
        <div key={device} className="sg-swap">
          {device === "phone" ? phone : pc}
        </div>
      </div>
      <div className="max-sm:hidden">{desktop ?? pc}</div>
    </div>
  );
}
