"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Copy, Phone, X } from "lucide-react";
import { WEBSITE_CONTACT, WEBSITE_MAX_PAGES, WEBSITE_PRICE_KC, formatKc } from "@/lib/website-offer";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";

type CopyState = "idle" | "ok" | "fail";

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
 * Khối liên hệ làm website: nội dung tư vấn soạn sẵn (sửa được) + nút sao chép + 3 kênh chính thức.
 * Facebook / Instagram không hỗ trợ điền sẵn tin nhắn qua URL → sao chép trước rồi mở.
 * Không gửi dữ liệu đi đâu: không có form, không gọi API.
 */
export function WebsiteContactPanel({ template, compact = false }: { template?: string; compact?: boolean }) {
  const t = useTranslations("webOffer");
  const vars = { price: formatKc(WEBSITE_PRICE_KC), pages: WEBSITE_MAX_PAGES };
  const initial = template ? t("message", { ...vars, template }) : t("messageGeneric", vars);
  const [text, setText] = useState(initial);
  const [state, setState] = useState<CopyState>("idle");
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const fieldId = useId();

  // Đổi mẫu khi hộp thoại đang mở → cập nhật nội dung soạn sẵn
  useEffect(() => {
    setText(initial);
    setState("idle");
  }, [initial]);

  const onCopy = async () => {
    const ok = await copyText(text, areaRef.current);
    setState(ok ? "ok" : "fail");
  };

  const btn =
    "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2";

  return (
    <div>
      {template && (
        <p className="mb-4 text-sm text-muted">
          {t("chosen")}: <strong className="font-semibold text-ink">{template}</strong>
        </p>
      )}
      <label htmlFor={fieldId} className="text-sm font-semibold text-ink">
        {t("messageLabel")}
      </label>
      <textarea
        id={fieldId}
        ref={areaRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setState("idle");
        }}
        rows={compact ? 4 : 3}
        className="mt-2 block w-full resize-y rounded-2xl border border-line bg-white px-4 py-3 text-[15px] leading-relaxed text-ink outline-none transition-colors focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
      />
      <button type="button" onClick={onCopy} className={`${btn} mt-3 border border-ink/15 bg-white text-ink hover:border-ink`}>
        {state === "ok" ? <Check className="size-[18px] text-emerald-700" aria-hidden /> : <Copy className="size-[18px]" aria-hidden />}
        {t("copy")}
      </button>
      <p role="status" aria-live="polite" className={`mt-2 min-h-5 text-sm ${state === "fail" ? "text-red-700" : "text-emerald-800"}`}>
        {state === "ok" ? t("copied") : state === "fail" ? t("copyFailed") : ""}
      </p>

      <div className={`mt-3 grid gap-2.5 ${compact ? "" : "sm:grid-cols-3"}`}>
        <a href={WEBSITE_CONTACT.tel} className={`${btn} btn-primary`}>
          <Phone className="size-[18px]" aria-hidden />
          {t("call", { phone: WEBSITE_CONTACT.phone })}
        </a>
        <a href={WEBSITE_CONTACT.facebook} target="_blank" rel="noopener noreferrer" className={`${btn} bg-[#1877F2] text-white hover:bg-[#0f64d2]`}>
          <FacebookIcon className="size-[18px]" />
          {t("facebook")}
        </a>
        <a href={WEBSITE_CONTACT.instagram} target="_blank" rel="noopener noreferrer" className={`${btn} border border-ink/15 bg-white text-ink hover:border-ink`}>
          <InstagramIcon className="size-[18px]" />
          {t("instagram")}
        </a>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-muted">{t("pasteHint")}</p>
    </div>
  );
}

/** Nút "Chọn mẫu này": mở hộp thoại liên hệ có sẵn tên mẫu */
export function ChooseTemplateButton({
  template,
  className = "",
  children,
}: {
  template?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const t = useTranslations("webOffer");
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const titleId = useId();

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
        className="sg-dialog m-auto w-[min(560px,calc(100vw-24px))] max-h-[calc(100dvh-24px)] overflow-y-auto rounded-[24px] border border-line bg-white p-0 text-left text-ink shadow-sg-xl backdrop:bg-[#1a1416]/50"
      >
        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <h2 id={titleId} className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] sm:text-2xl">
              {t("contactTitle")}
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
          <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{t("hosting")}</p>
          <div className="mt-5">{open && <WebsiteContactPanel template={template} compact />}</div>
        </div>
      </dialog>
    </>
  );
}
