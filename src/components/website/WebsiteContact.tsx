"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Copy, Phone, X } from "lucide-react";
import { WEBSITE_CONTACT, WEBSITE_MAX_PAGES, WEBSITE_PRICE_KC, formatKc } from "@/lib/website-offer";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import { fontAtelier } from "./atelier";

type CopyState = "idle" | "ok" | "fail";
/** "atelier": bản trung tính của trang /website (nút gọi màu espresso, Facebook/Instagram viền mảnh) */
export type Tone = "brand" | "atelier";

async function copyText(text: string, fallbackEl: HTMLTextAreaElement | null) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Trình duyệt cũ / không có quyền clipboard: chọn chữ trong ô rồi dùng lệnh copy cũ
    if (!fallbackEl) return false;
    fallbackEl.focus();
    fallbackEl.select();
    try {
      return document.execCommand("copy");
    } catch {
      return false;
    }
  }
}

/**
 * Khối liên hệ làm website: 3 kênh chính thức (gọi, Facebook, Instagram) + nút sao chép tin nhắn mẫu.
 * Facebook / Instagram không điền sẵn tin nhắn qua URL → khách sao chép rồi dán.
 * Không gửi dữ liệu đi đâu: không có form, không gọi API.
 */
export function WebsiteContactPanel({ template, stacked = false, tone = "brand" }: { template?: string; stacked?: boolean; tone?: Tone }) {
  const t = useTranslations("webOffer");
  const vars = { price: formatKc(WEBSITE_PRICE_KC), pages: WEBSITE_MAX_PAGES };
  const text = template ? t("message", { ...vars, template }) : t("messageGeneric", vars);
  const [state, setState] = useState<CopyState>("idle");
  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => setState("idle"), [text]);

  const onCopy = async () => {
    const ok = await copyText(text, areaRef.current);
    setState(ok ? "ok" : "fail");
  };

  const btn =
    "inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full px-5 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2";

  return (
    <div>
      {template && (
        <p className={`mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm ring-1 ${tone === "atelier" ? "bg-[#EFEAE2] text-[#1C1A17] ring-[#DCD5CA]" : "bg-brand-50 text-brand-800 ring-brand-100"}`}>
          {t("chosenShort")}: <strong className="font-semibold">{template}</strong>
        </p>
      )}
      <div className={`grid gap-2.5 ${stacked ? "" : "sm:grid-cols-3"}`}>
        <a href={WEBSITE_CONTACT.tel} className={`${btn} ${tone === "atelier" ? "bg-[#1F1C19] text-[#F4F1EB] hover:bg-black" : "btn-primary"}`}>
          <Phone className="size-5" aria-hidden />
          {t("call", { phone: WEBSITE_CONTACT.phone })}
        </a>
        <a href={WEBSITE_CONTACT.facebook} target="_blank" rel="noopener noreferrer" className={`${btn} ${tone === "atelier" ? "border border-[#1C1A17]/20 bg-[#FBFAF7] text-[#1C1A17] hover:border-[#1C1A17]" : "bg-[#1877F2] text-white hover:bg-[#0f64d2]"}`}>
          <FacebookIcon className="size-5" />
          {t("facebook")}
        </a>
        <a href={WEBSITE_CONTACT.instagram} target="_blank" rel="noopener noreferrer" className={`${btn} border ${tone === "atelier" ? "border-[#1C1A17]/20 bg-[#FBFAF7] text-[#1C1A17] hover:border-[#1C1A17]" : "border-ink/15 bg-white text-ink hover:border-ink"}`}>
          <InstagramIcon className="size-5" />
          {t("instagram")}
        </a>
      </div>
      {/* Ô ẩn chỉ để chép khi trình duyệt không cho dùng clipboard API */}
      <textarea ref={areaRef} value={text} readOnly tabIndex={-1} aria-hidden className="sr-only" />
      <div className={`mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 ${stacked ? "justify-center" : ""}`}>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[15px] font-semibold text-ink/80 transition-colors hover:bg-sand hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
        >
          {state === "ok" ? <Check className="size-[18px] text-emerald-700" aria-hidden /> : <Copy className="size-[18px]" aria-hidden />}
          {t("copy")}
        </button>
        <span role="status" aria-live="polite" className={`text-sm ${state === "fail" ? "text-red-700" : "text-emerald-800"}`}>
          {state === "ok" ? t("copied") : state === "fail" ? t("copyFailed") : ""}
        </span>
      </div>
    </div>
  );
}

/** Nút "Chọn mẫu này": mở hộp thoại liên hệ có sẵn tên mẫu */
export function ChooseTemplateButton({
  template,
  className = "",
  children,
  tone = "brand",
}: {
  template?: string;
  className?: string;
  children: React.ReactNode;
  tone?: Tone;
}) {
  const t = useTranslations("webOffer");
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  // id cố định theo tên mẫu (useId lệch giữa server và client ở trang có nhiều thẻ → cảnh báo hydrate)
  const titleId = `choose-${(template ?? "website").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  const show = () => {
    setOpen(true);
    ref.current?.showModal();
  };
  const hide = () => ref.current?.close();

  return (
    <>
      <button type="button" onClick={show} className={className} aria-haspopup="dialog">
        {children}
      </button>
      <dialog
        ref={ref}
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === ref.current && hide()}
        className={`sg-dialog m-auto w-[min(560px,calc(100vw-24px))] max-h-[calc(100dvh-24px)] overflow-y-auto rounded-[24px] border p-0 ${tone === "atelier" ? "border-[#DCD5CA] bg-[#FBFAF7]" : "border-line bg-white"} text-left text-ink shadow-sg-xl backdrop:bg-[#1a1416]/50`}
      >
        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <h2
              id={titleId}
              className={tone === "atelier" ? `${fontAtelier.className} text-[1.5rem] font-medium leading-tight tracking-[-0.01em] sm:text-[1.75rem]` : "font-display text-[1.375rem] font-semibold leading-snug tracking-[-0.02em] sm:text-2xl"}
            >
              {t("contactNow")}
            </h2>
            <button
              type="button"
              onClick={hide}
              aria-label={t("close")}
              className="-mr-2 -mt-1 flex size-11 shrink-0 items-center justify-center rounded-full text-muted hover:bg-sand hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
          <div className="mt-5">{open && <WebsiteContactPanel template={template} stacked tone={tone} />}</div>
        </div>
      </dialog>
    </>
  );
}
