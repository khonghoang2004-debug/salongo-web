import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SHOTS } from "@/lib/media";

/** Thợ thuê bàn có IČO riêng: khối mận đậm duy nhất của trang Giải pháp, điện thoại tính tiền nhô lên từ đáy khối. */
export function DeskPanel({
  id,
  title,
  lead,
  price,
  note,
  cta,
  alt,
}: {
  id: string;
  title: string;
  lead: string;
  price: string;
  note: string;
  cta: string;
  alt: string;
}) {
  const s = SHOTS.desk;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 pt-14 sm:pt-16 lg:scroll-mt-24 lg:pt-24">
      <div className="x-wrap">
        <div className="x-panel grid overflow-hidden bg-plum text-white lg:grid-cols-12">
          <div className="p-7 sm:p-10 lg:col-span-7 lg:p-14">
            <h2 id={`${id}-title`} className="text-[clamp(1.6rem,1.15rem+1.5vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.03em] [text-wrap:balance] [:lang(vi)_&]:leading-[1.24]">
              {title}
            </h2>
            <p className="mt-4 max-w-[32rem] text-[1.0625rem] leading-relaxed text-white/75">{lead}</p>
            <p className="mt-8 text-[2.2rem] font-semibold tabular-nums tracking-[-0.03em]">{price}</p>
            <p className="mt-2 max-w-[30rem] text-[15px] leading-relaxed text-white/60">{note}</p>
            <Link href="/goi-ban" className="x-btn-onDark mt-9">
              {cta}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="flex items-end justify-center px-7 pt-2 lg:col-span-5 lg:pt-14">
            <div className="h-[320px] w-[240px] overflow-hidden rounded-t-[2.2rem] border-[7px] border-b-0 border-[#1a0d11] bg-white sm:h-[380px] sm:w-[270px]">
              <img src={s.phone} alt={alt} width={s.pw} height={s.ph} loading="lazy" decoding="async" className="block h-auto w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
