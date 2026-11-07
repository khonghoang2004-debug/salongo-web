import type { CSSProperties, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

type Props = {
  crumb: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
};

// Đầu trang con: dải nền tràn viền, căn trái kiểu biên tập. Không có cột phụ: tiêu đề lớn bên trái,
// mô tả + nút ở cột phải canh đáy; có cột phụ (aside): chữ 7 cột, aside 5 cột
export async function PageHero({ crumb, eyebrow, title, lead, actions, aside, children }: Props) {
  const tNav = await getTranslations("nav");

  return (
    <section>
      <div className="sg-panel relative overflow-hidden px-4 pb-10 pt-3 sm:px-8 sm:pb-14 sm:pt-5 lg:pb-20 lg:pt-6">
        <div className="sg-container">
          <nav aria-label="Breadcrumb" className="sg-in flex items-center gap-1.5 text-sm text-muted">
            <Link href="/" className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
              {tNav("home")}
            </Link>
            <ChevronRight className="size-3.5" aria-hidden />
            <span className="font-medium text-ink" aria-current="page">
              {crumb}
            </span>
          </nav>

          {aside ? (
            <div className="mt-4 grid gap-8 sm:mt-8 lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-7">
                {eyebrow && (
                  <div className="sg-in mb-4 sm:mb-6" style={d(60)}>
                    {eyebrow}
                  </div>
                )}
                <h1 className="sg-h1 sg-in" style={d(120)}>
                  {title}
                </h1>
                {lead && (
                  <p className="sg-lead sg-in mt-4 max-w-2xl sm:mt-6" style={d(260)}>
                    {lead}
                  </p>
                )}
                {actions && (
                  <div className="sg-in mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={d(380)}>
                    {actions}
                  </div>
                )}
              </div>
              <div className="sg-in lg:col-span-5" style={d(420)}>
                {aside}
              </div>
            </div>
          ) : (
            <div className="mt-4 grid gap-6 sm:mt-8 lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-7">
                {eyebrow && (
                  <div className="sg-in mb-4 sm:mb-6" style={d(60)}>
                    {eyebrow}
                  </div>
                )}
                <h1 className="sg-h1 sg-in" style={d(120)}>
                  {title}
                </h1>
              </div>
              {(lead || actions) && (
                <div className="sg-in lg:col-span-5 lg:pb-2 lg:pl-8" style={d(260)}>
                  {lead && <p className="sg-lead">{lead}</p>}
                  {actions && <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
                </div>
              )}
            </div>
          )}

          {children}
        </div>
      </div>
    </section>
  );
}
