"use client";

// Phần tương tác dùng chung của 4 website mẫu: menu (có menu mobile), xem ảnh lớn, form đặt lịch minh hoạ.
// Giao diện riêng từng mẫu truyền vào qua class (mỗi mẫu một bộ màu, chữ, bo góc).
import { useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Info, Menu, Phone, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Art, type ArtPalette } from "./Art";
import type { Motif } from "./types";

export type NavItem = { href: string; label: string; active: boolean };

export function DemoNav({
  brand,
  items,
  cta,
  menuLabel,
  closeLabel,
  c,
}: {
  brand: React.ReactNode;
  items: NavItem[];
  cta: { href: string; label: string };
  menuLabel: string;
  closeLabel: string;
  /** class: header, inner, link, active, cta, burger, panel, panelLink */
  c: Record<"header" | "inner" | "link" | "active" | "cta" | "burger" | "panel" | "panelLink", string>;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={`sticky top-0 z-40 ${c.header}`}>
      <div className={`mx-auto flex items-center justify-between gap-4 ${c.inner}`}>
        {brand}
        <nav aria-label="Menu" className="hidden items-center gap-1 lg:flex">
          {items.map((it) => (
            <Link key={it.href} href={it.href} aria-current={it.active ? "page" : undefined} className={`${c.link} ${it.active ? c.active : ""}`}>
              {it.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href={cta.href} className={`hidden sm:inline-flex ${c.cta}`}>
            {cta.label}
          </Link>
          <button
            ref={burgerRef}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? closeLabel : menuLabel}
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex size-11 items-center justify-center lg:hidden ${c.burger}`}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>
      <div id={panelId} hidden={!open} className={`lg:hidden ${c.panel}`}>
        <nav aria-label="Menu" className="flex flex-col py-2">
          {items.map((it) => (
            <Link key={it.href} href={it.href} aria-current={it.active ? "page" : undefined} className={`${c.panelLink} ${it.active ? c.active : ""}`}>
              {it.label}
            </Link>
          ))}
          <Link href={cta.href} className={`mx-4 mb-3 mt-2 justify-center sm:hidden ${c.cta} !inline-flex`}>
            {cta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}

/** Lưới ảnh bấm được: mở hộp thoại xem ảnh lớn, chuyển ảnh bằng nút hoặc phím ← → */
export function DemoLightbox({
  items,
  motif,
  palettes,
  labels,
  gridClass,
  tileClass,
  shapes,
}: {
  items: { v: number; alt: string; photo?: string }[];
  motif: Motif;
  palettes: ArtPalette[];
  labels: { open: string; close: string; prev: string; next: string };
  gridClass: string;
  tileClass: string;
  /** class khung theo vị trí (tạo bố cục so le) */
  shapes: string[];
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [idx, setIdx] = useState<number | null>(null);
  const n = items.length;

  const openAt = (i: number) => {
    setIdx(i);
    ref.current?.showModal();
  };
  const go = (d: number) => setIdx((i) => (i === null ? i : (i + d + n) % n));

  return (
    <>
      <ul className={gridClass}>
        {items.map((it, i) => (
          <li key={i} className={shapes[i % shapes.length]}>
            <button type="button" onClick={() => openAt(i)} className={`group relative block size-full overflow-hidden ${tileClass}`}>
              <Art motif={motif} v={it.v} palette={palettes[i % palettes.length]} photo={it.photo} alt={it.alt} className="transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none" />
              <span className="sr-only">
                {labels.open}: {it.alt}
              </span>
            </button>
            <p className="mt-2 text-sm opacity-75">{it.alt}</p>
          </li>
        ))}
      </ul>
      <dialog
        ref={ref}
        onClose={() => setIdx(null)}
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        aria-label={idx !== null ? items[idx].alt : labels.open}
        className="m-auto w-[min(920px,calc(100vw-24px))] overflow-hidden rounded-2xl bg-[#1d1a18] p-0 text-white backdrop:bg-black/70"
      >
        {idx !== null && (
          <figure>
            <div className="aspect-[4/3] max-h-[calc(100dvh-140px)] w-full">
              <Art motif={motif} v={items[idx].v} palette={palettes[idx % palettes.length]} photo={items[idx].photo} alt={items[idx].alt} />
            </div>
            <figcaption className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4">
              <button type="button" onClick={() => go(-1)} className="inline-flex size-11 items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                <ChevronLeft className="size-5" aria-hidden />
                <span className="sr-only">{labels.prev}</span>
              </button>
              <span className="text-center text-sm">
                {items[idx].alt} <span className="opacity-60">· {idx + 1}/{n}</span>
              </span>
              <span className="flex">
                <button type="button" onClick={() => go(1)} className="inline-flex size-11 items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                  <ChevronRight className="size-5" aria-hidden />
                  <span className="sr-only">{labels.next}</span>
                </button>
                <button type="button" onClick={() => ref.current?.close()} className="inline-flex size-11 items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                  <X className="size-5" aria-hidden />
                  <span className="sr-only">{labels.close}</span>
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}

type FormLabels = Record<
  "service" | "choose" | "date" | "time" | "name" | "phone" | "note" | "staff" | "anyone" | "submit" | "hint" | "done" | "doneText" | "again",
  string
>;

/**
 * Form đặt lịch minh hoạ: không có action, không gọi mạng, không lưu gì.
 * Bấm gửi chỉ hiện thông báo "Đây là bản demo, thông tin chưa được gửi".
 */
export function DemoBookingForm({
  services,
  staff,
  labels,
  c,
}: {
  services: { group: string; items: string[] }[];
  staff?: string[];
  labels: FormLabels;
  /** class: field, label, chip, chipOn, submit, notice */
  c: Record<"field" | "label" | "chip" | "chipOn" | "submit" | "notice", string>;
}) {
  const [sent, setSent] = useState(false);
  const [time, setTime] = useState("10:00");
  const [who, setWho] = useState(labels.anyone);
  const formRef = useRef<HTMLFormElement>(null);
  const noticeRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const times = ["9:00", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

  useEffect(() => {
    if (sent) noticeRef.current?.focus();
  }, [sent]);

  if (sent) {
    return (
      <div ref={noticeRef} tabIndex={-1} role="status" className={`outline-none ${c.notice}`}>
        <p className="flex items-start gap-2.5 text-lg font-semibold">
          <Info className="mt-1 size-5 shrink-0" aria-hidden />
          {labels.done}
        </p>
        <p className="mt-2 opacity-80">{labels.doneText}</p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            formRef.current?.reset();
          }}
          className={`mt-5 ${c.submit}`}
        >
          {labels.again}
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate={false}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-5"
    >
      <p className="flex items-start gap-2 text-sm opacity-80">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
        {labels.hint}
      </p>
      <div>
        <label htmlFor={`${id}-s`} className={c.label}>
          {labels.service}
        </label>
        <select id={`${id}-s`} required defaultValue="" className={c.field}>
          <option value="" disabled>
            {labels.choose}
          </option>
          {services.map((g) => (
            <optgroup key={g.group} label={g.group}>
              {g.items.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      {staff && (
        <fieldset>
          <legend className={c.label}>{labels.staff}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {[labels.anyone, ...staff].map((s) => (
              <button key={s} type="button" aria-pressed={who === s} onClick={() => setWho(s)} className={`${c.chip} ${who === s ? c.chipOn : ""}`}>
                {s}
              </button>
            ))}
          </div>
        </fieldset>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-d`} className={c.label}>
            {labels.date}
          </label>
          <input id={`${id}-d`} type="date" required className={c.field} />
        </div>
        <fieldset>
          <legend className={c.label}>{labels.time}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {times.map((tm) => (
              <button key={tm} type="button" aria-pressed={time === tm} onClick={() => setTime(tm)} className={`${c.chip} ${time === tm ? c.chipOn : ""}`}>
                {tm}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-n`} className={c.label}>
            {labels.name}
          </label>
          <input id={`${id}-n`} type="text" required autoComplete="off" className={c.field} />
        </div>
        <div>
          <label htmlFor={`${id}-p`} className={c.label}>
            {labels.phone}
          </label>
          <input id={`${id}-p`} type="tel" required autoComplete="off" className={c.field} />
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-o`} className={c.label}>
          {labels.note}
        </label>
        <textarea id={`${id}-o`} rows={3} className={c.field} />
      </div>
      <div>
        <button type="submit" className={c.submit}>
          {labels.submit}
        </button>
      </div>
    </form>
  );
}

/** Số điện thoại mẫu: bấm không gọi (số không có thật), chỉ hiện ghi chú */
export function DemoPhone({ phone, note, className = "" }: { phone: string; note: string; className?: string }) {
  const [shown, setShown] = useState(false);
  return (
    <span className="inline-flex flex-col items-start">
      <button type="button" onClick={() => setShown(true)} className={`inline-flex min-h-11 items-center gap-2 ${className}`}>
        <Phone className="size-4" aria-hidden />
        {phone}
      </button>
      <span role="status" className="text-xs opacity-70">
        {shown ? note : ""}
      </span>
    </span>
  );
}
