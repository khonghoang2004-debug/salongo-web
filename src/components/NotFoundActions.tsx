"use client";

import { ArrowLeft, Home } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function NotFoundActions({ backHome, goBack }: { backHome: string; goBack: string }) {
  return (
    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
      <Link href="/" className="btn-primary px-6 py-3 text-base">
        <Home className="size-[18px]" aria-hidden />
        {backHome}
      </Link>
      <button type="button" onClick={() => window.history.back()} className="btn-secondary px-6 py-3 text-base">
        <ArrowLeft className="size-[18px] text-muted" aria-hidden />
        {goBack}
      </button>
    </div>
  );
}
