import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SHOTS } from "@/lib/media";
import { DevicePhone } from "@/components/landing/Shots";

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
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 pt-10 sm:pt-10 lg:scroll-mt-24 lg:pt-16">
      <div className="x-wrap">
        <div className="x-panel grid overflow-hidden bg-plum text-white lg:grid-cols-12">
          <div className="p-7 sm:p-10 lg:col-span-7 lg:p-14">
            <h2 id={`${id}-title`} className="x-title">
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
            <DevicePhone shot={s} alt={alt} crop className="h-[320px] w-[240px] sm:h-[380px] sm:w-[270px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
