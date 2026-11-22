import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Shot } from "@/lib/media";

export type GuideSection = {
  id: string;
  h: string;
  body: string[];
  points?: string[];
  steps?: string[];
  figure?: string;
  link?: { href: string; label: string };
};

/** Mục lục: cột trái dính lại trên máy tính; trên điện thoại / iPad là một khối gập (<details>) trước bài. */
export function Toc({ label, sections }: { label: string; sections: GuideSection[] }) {
  const list = (
    <ol className="border-l border-line">
      {sections.map((s) => (
        <li key={s.id}>
          <a href={`#${s.id}`} className="-ml-px flex min-h-11 items-center border-l border-transparent py-1.5 pl-4 text-[14.5px] leading-snug text-muted transition-colors hover:border-brand-700 hover:text-ink">
            {s.h}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <>
      <details className="group border-b border-line lg:hidden">
        <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between text-[15px] font-medium text-ink [&::-webkit-details-marker]:hidden">
          {label}
          <span className="text-xl leading-none text-ink/50 transition-transform group-open:rotate-45" aria-hidden>
            +
          </span>
        </summary>
        <nav aria-label={label} className="pb-4">
          {list}
        </nav>
      </details>
      <nav aria-label={label} className="sticky top-24 hidden lg:block">
        <p className="mb-3 text-[14px] text-muted">{label}</p>
        {list}
      </nav>
    </>
  );
}

/** Ảnh trong bài: điện thoại dưới md, máy tính từ md, có chú thích. */
function Figure({ shot, caption }: { shot: Shot; caption: string }) {
  return (
    <figure className="mb-2 mt-7">
      <div className="w-[62%] max-w-[260px] md:hidden">
        <img src={shot.phone} alt={caption} width={shot.pw} height={shot.ph} loading="lazy" decoding="async" className="x-phone block h-auto w-full" />
      </div>
      <div className="x-shot hidden md:block">
        <div className="aspect-[16/10] overflow-hidden">
          <img src={shot.desktop} alt={caption} width={shot.dw} height={shot.dh} loading="lazy" decoding="async" className="block h-full w-full object-cover object-left-top" />
        </div>
      </div>
      <figcaption className="mt-4 text-[14px] leading-snug text-muted">{caption}</figcaption>
    </figure>
  );
}

const P = "mt-5 text-[1.0625rem] leading-[1.75] text-ink/80 [text-wrap:pretty] sm:text-[1.125rem]";

/** Thân bài: H2 theo câu người ta tìm, đoạn văn dễ đọc (khoảng 65 ký tự mỗi dòng), danh sách ngăn bằng đường kẻ mảnh. */
export function ArticleBody({ sections, shots }: { sections: GuideSection[]; shots: Partial<Record<string, Shot>> }) {
  return (
    <div className="max-w-[42rem]">
      {sections.map((s, i) => {
        const shot = shots[s.id];
        return (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className={`scroll-mt-24 ${i ? "mt-8 sm:mt-16" : ""}`}>
            <h2 id={`${s.id}-h`} className="text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-ink [text-wrap:balance] [:lang(vi)_&]:leading-[1.3]">
              {s.h}
            </h2>
            {s.body.map((p) => (
              <p key={p} className={P}>
                {p}
              </p>
            ))}
            {s.points && (
              <ul className="mt-6 border-t border-line">
                {s.points.map((pt) => (
                  <li key={pt} className="border-b border-line py-3.5 text-[1.0625rem] leading-relaxed text-ink/85">
                    {pt}
                  </li>
                ))}
              </ul>
            )}
            {s.steps && (
              <ol className="mt-6 border-t border-line">
                {s.steps.map((st, n) => (
                  <li key={st} className="flex gap-5 border-b border-line py-3.5 text-[1.0625rem] leading-relaxed text-ink/85">
                    <span className="w-5 shrink-0 font-semibold tabular-nums text-brand-700">{n + 1}</span>
                    {st}
                  </li>
                ))}
              </ol>
            )}
            {shot && s.figure && <Figure shot={shot} caption={s.figure} />}
            {s.link && (
              <Link href={s.link.href} className="x-link mt-5 min-h-11">
                {s.link.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            )}
          </section>
        );
      })}
    </div>
  );
}
