import type { ReactNode } from "react";

type Props = {
  kicker?: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  /** "split": tiêu đề bên trái, mô tả bên phải (PC). "stack": xếp dọc, căn trái */
  layout?: "split" | "stack";
  className?: string;
};

// Tiêu đề section dùng chung: căn trái, kiểu biên tập
export function SectionHead({ kicker, title, lead, action, layout = "split", className = "" }: Props) {
  if (layout === "stack") {
    return (
      <div className={`max-w-3xl ${className}`}>
        {kicker && <p className="sg-kicker">{kicker}</p>}
        <h2 className={`sg-h2 ${kicker ? "mt-4" : ""}`}>{title}</h2>
        {lead && <p className="sg-lead mt-4 max-w-2xl">{lead}</p>}
        {action && <div className="mt-7">{action}</div>}
      </div>
    );
  }
  return (
    <div className={`grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10 ${className}`}>
      <div className="lg:col-span-7">
        {kicker && <p className="sg-kicker">{kicker}</p>}
        <h2 className={`sg-h2 ${kicker ? "mt-4" : ""}`}>{title}</h2>
      </div>
      {(lead || action) && (
        <div className="lg:col-span-5 lg:pb-1.5">
          {lead && <p className="sg-lead">{lead}</p>}
          {action && <div className="mt-6">{action}</div>}
        </div>
      )}
    </div>
  );
}
