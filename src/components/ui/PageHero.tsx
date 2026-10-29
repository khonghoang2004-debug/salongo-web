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

// Đầu trang con: khối nền lùi vào, có đường dẫn trang; căn giữa khi không có cột phụ
export async function PageHero({ crumb, eyebrow, title, lead, actions, aside, children }: Props) {
  const tNav = await getTranslations("nav");

  return (
    <section className="pt-2 sm:pt-3">
      <div className="sg-panel px-4 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-10 lg:px-12 lg:pb-20 lg:pt-12">
        <div className="sg-container">
          <nav
            aria-label="Breadcrumb"
            className={`sg-in flex items-center gap-1.5 text-sm text-muted ${aside ? "" : "justify-center"}`}
          >
            <Link href="/" className="rounded transition-colors hover:text-ink">
              {tNav("home")}
            </Link>
            <ChevronRight className="size-3.5" aria-hidden />
            <span className="font-medium text-ink" aria-current="page">
              {crumb}
            </span>
          </nav>

          <div className={`mt-8 grid gap-10 sm:mt-10 ${aside ? "lg:grid-cols-12 lg:items-end lg:gap-12" : ""}`}>
            <div className={aside ? "lg:col-span-7" : "mx-auto max-w-4xl text-center [&_.sg-lead]:mx-auto"}>
              {eyebrow && (
                <div className="sg-in mb-6" style={d(60)}>
                  {eyebrow}
                </div>
              )}
              <h1 className="sg-h1 sg-in" style={d(120)}>
                {title}
              </h1>
              {lead && (
                <p className="sg-lead sg-in mt-6 max-w-2xl" style={d(260)}>
                  {lead}
                </p>
              )}
              {actions && (
                <div
                  className={`sg-in mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap ${aside ? "" : "sm:justify-center"}`}
                  style={d(380)}
                >
                  {actions}
                </div>
              )}
            </div>
            {aside && (
              <div className="sg-in lg:col-span-5" style={d(420)}>
                {aside}
              </div>
            )}
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}
