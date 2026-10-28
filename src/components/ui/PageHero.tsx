import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = {
  crumb: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
};

// Đầu trang con: khối nền lùi vào, căn trái, có đường dẫn trang
export async function PageHero({ crumb, eyebrow, title, lead, actions, aside, children }: Props) {
  const tNav = await getTranslations("nav");

  return (
    <section className="pt-2 sm:pt-3">
      <div className="sg-panel px-4 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-10 lg:px-12 lg:pb-20 lg:pt-12">
        <div className="sg-container">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted">
            <Link href="/" className="rounded transition-colors hover:text-ink">
              {tNav("home")}
            </Link>
            <ChevronRight className="size-3.5" aria-hidden />
            <span className="font-medium text-ink" aria-current="page">
              {crumb}
            </span>
          </nav>

          <div className={`mt-8 grid gap-10 sm:mt-10 ${aside ? "lg:grid-cols-12 lg:items-end lg:gap-12" : ""}`}>
            <div className={aside ? "lg:col-span-7" : "max-w-4xl"}>
              {eyebrow && <div className="mb-6">{eyebrow}</div>}
              <h1 className="sg-h1">{title}</h1>
              {lead && <p className="sg-lead mt-6 max-w-2xl">{lead}</p>}
              {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
            </div>
            {aside && <div className="lg:col-span-5">{aside}</div>}
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}
