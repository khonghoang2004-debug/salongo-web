import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  lead: string;
  points: string[];
  media: ReactNode;
  extra?: ReactNode;
  /** wide: tiêu đề và chữ thành một hàng ở trên, ảnh tràn hết bề ngang bên dưới (cho màn hình nhiều cột như lịch) */
  wide?: boolean;
};

const H2 =
  "text-[clamp(1.6rem,1.15rem+1.5vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-ink [text-wrap:balance] [:lang(vi)_&]:leading-[1.24]";

function Points({ points }: { points: string[] }) {
  return (
    <ul className="mt-7 max-w-[32rem] border-t border-line">
      {points.map((p) => (
        <li key={p} className="border-b border-line py-3 text-[15px] leading-relaxed text-ink/85">
          {p}
        </li>
      ))}
    </ul>
  );
}

/**
 * Một tính năng: tiêu đề (H2, viết như câu người ta tìm), một hai câu, vài dòng ngăn bằng đường kẻ mảnh, ảnh app thật.
 * id giữ nguyên neo cũ (/tinh-nang#dat-lich-online …) mà các trang khác đang trỏ tới.
 */
export function FeatureRow({ id, title, lead, points, media, extra, wide = false }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 lg:scroll-mt-24">
      <div className="x-wrap">
        {wide ? (
          <div className="border-t border-line py-14 sm:py-16 lg:py-24">
            <div className="grid gap-x-12 lg:grid-cols-12 [&>*]:min-w-0">
              <h2 id={`${id}-title`} className={`${H2} lg:col-span-5`}>
                {title}
              </h2>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="x-body mt-4 max-w-[34rem] text-[1.0625rem] lg:mt-1">{lead}</p>
                <Points points={points} />
                {extra}
              </div>
            </div>
            <div className="mt-7 lg:mt-14">{media}</div>
          </div>
        ) : (
          <div className="grid gap-10 border-t border-line py-14 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-24 [&>*]:min-w-0">
            <div className="lg:col-span-5 xl:col-span-4">
              <h2 id={`${id}-title`} className={H2}>
                {title}
              </h2>
              <p className="x-body mt-4 max-w-[32rem] text-[1.0625rem]">{lead}</p>
              <Points points={points} />
              {extra}
            </div>
            <div className="lg:col-span-7 xl:col-span-8">{media}</div>
          </div>
        )}
      </div>
    </section>
  );
}
