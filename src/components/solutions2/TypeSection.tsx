import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Shot } from "@/lib/media";

export type Pair = { problem: string; answer: string };

/**
 * Một loại tiệm: H2 viết như câu người ta tìm ("phần mềm quản lý tiệm nail"), một câu, rồi danh sách
 * "chuyện quen thuộc / SalonGo làm gì" ngăn bằng đường kẻ mảnh, và một lát cắt ảnh app thật.
 */
export function TypeSection({
  id,
  title,
  lead,
  pairs,
  problemLabel,
  answerLabel,
  link,
  shot,
  alt,
}: {
  id: string;
  title: string;
  lead: string;
  pairs: Pair[];
  problemLabel: string;
  answerLabel: string;
  link: { href: string; label: string };
  shot: Shot;
  alt: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 lg:scroll-mt-24">
      <div className="x-wrap">
        <div className="border-t border-line pt-14 sm:pt-16 lg:pt-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 [&>*]:min-w-0">
            <div className="lg:col-span-5">
              <h2 id={`${id}-title`} className="text-[clamp(1.6rem,1.15rem+1.5vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-ink [text-wrap:balance] [:lang(vi)_&]:leading-[1.24]">
                {title}
              </h2>
              <p className="x-body mt-4 max-w-[30rem] text-[1.0625rem]">{lead}</p>
              <Link href={link.href} className="x-link mt-6 min-h-11">
                {link.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <dl className="lg:col-span-7">
              <div className="hidden grid-cols-2 gap-8 pb-3 text-[14px] text-muted sm:grid" aria-hidden>
                <span>{problemLabel}</span>
                <span>{answerLabel}</span>
              </div>
              {pairs.map((p) => (
                <div key={p.problem} className="grid gap-1 border-t border-line py-4 sm:grid-cols-2 sm:gap-8 sm:py-5">
                  <dt className="text-[15px] leading-relaxed text-muted">{p.problem}</dt>
                  <dd className="text-[15.5px] font-medium leading-relaxed text-ink">{p.answer}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Lát cắt ảnh app: điện thoại nhô lên từ đường kẻ trên điện thoại, cửa sổ máy tính cắt ngang từ md */}
          <div className="mt-12 border-b border-line lg:mt-16">
            <div className="h-[300px] w-[230px] overflow-hidden rounded-t-[2.2rem] border-[7px] border-b-0 border-[#1a0d11] bg-white md:hidden">
              <img src={shot.phone} alt={alt} width={shot.pw} height={shot.ph} loading="lazy" decoding="async" className="block h-auto w-full" />
            </div>
            <div className="hidden aspect-[16/6] overflow-hidden rounded-t-[14px] ring-1 ring-black/[0.07] md:block">
              <img src={shot.desktop} alt={alt} width={shot.dw} height={shot.dh} loading="lazy" decoding="async" className="block h-full w-full object-cover object-left-top" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
