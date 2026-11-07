import type { CSSProperties, ReactNode } from "react";

type Props = {
  /** đường kẻ mảnh trên đầu section (mặc định có) */
  rule?: boolean;
  kicker?: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  /** "split": tiêu đề bên trái, mô tả bên phải (PC). "stack": xếp dọc, căn trái */
  layout?: "split" | "stack";
  /** split: "wide-title" (7/5, mặc định) hoặc "content" (5/7, khớp lưới danh sách + ảnh bên dưới) */
  cols?: "wide-title" | "content";
  className?: string;
};

// Tiêu đề section dùng chung: căn trái, kiểu biên tập; đường kẻ mảnh phía trên ngăn các phần (rule=false để bỏ)
export function SectionHead({ kicker, title, lead, action, layout = "split", cols = "wide-title", rule = false, className: extra = "" }: Props) {
  const className = `${rule ? "border-t border-line pt-6 sm:pt-8" : ""} ${extra}`;
  if (layout === "stack") {
    return (
      <div data-reveal className={`max-w-3xl ${className}`}>
        {kicker && <p className="sg-kicker">{kicker}</p>}
        <h2 className={`sg-h2 ${kicker ? "mt-4" : ""}`}>{title}</h2>
        {lead && <p className="sg-lead mt-4 max-w-2xl">{lead}</p>}
        {action && <div className="mt-5">{action}</div>}
      </div>
    );
  }
  if (cols === "content") {
    // Mô tả + nút nằm cùng cột với ảnh bên dưới, đáy thẳng hàng với tiêu đề
    return (
      <div className={`grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-12 ${className}`}>
        <div data-reveal className="lg:col-span-5">
          {kicker && <p className="sg-kicker">{kicker}</p>}
          <h2 className={`sg-h2 ${kicker ? "mt-4" : ""}`}>{title}</h2>
        </div>
        {(lead || action) && (
          <div
            data-reveal
            className="lg:col-span-7 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:pb-1.5"
            style={{ "--d": "140ms" } as CSSProperties}
          >
            {lead && <p className="sg-lead lg:max-w-md">{lead}</p>}
            {action && <div className="mt-5 shrink-0 lg:mt-0">{action}</div>}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={`grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10 ${className}`}>
      <div data-reveal className="lg:col-span-7">
        {kicker && <p className="sg-kicker">{kicker}</p>}
        <h2 className={`sg-h2 ${kicker ? "mt-4" : ""}`}>{title}</h2>
      </div>
      {(lead || action) && (
        <div data-reveal className="lg:col-span-5 lg:pb-1.5" style={{ "--d": "140ms" } as CSSProperties}>
          {lead && <p className="sg-lead">{lead}</p>}
          {action && <div className="mt-6">{action}</div>}
        </div>
      )}
    </div>
  );
}
