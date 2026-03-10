"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/contact";

const email = CONTACT_EMAIL;

export function CopyEmailButton() {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={`mailto:${email}`}
        className="text-[15px] font-medium text-neutral-800 hover:text-[#EC4899] hover:underline"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="flex size-8 shrink-0 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-1"
        aria-label={t("copyCopied")}
        title={t("copyCopied")}
      >
        <Copy className="size-4" strokeWidth={2} aria-hidden />
      </button>
      {copied && (
        <span className="text-xs font-medium text-emerald-600" role="status">
          {t("copyCopied")}
        </span>
      )}
    </div>
  );
}
