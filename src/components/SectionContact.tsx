import { getTranslations } from "next-intl/server";
import { CopyEmailButton } from "./CopyEmailButton";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_FACEBOOK, CONTACT_INSTAGRAM, CONTACT_WHATSAPP } from "@/lib/contact";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export async function SectionContact() {
  const t = await getTranslations("contact");

  return (
    <section className="border-t border-neutral-100 bg-neutral-50/50 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-xl">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-base font-semibold tracking-tight text-neutral-900">
            {t("companyInfo")}
          </h2>

          <dl className="mt-5 space-y-4">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                {t("emailLabel")}
              </dt>
              <dd className="mt-1">
                <CopyEmailButton />
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                {t("phoneLabel")}
              </dt>
              <dd className="mt-1">
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                  className="text-[15px] font-medium text-neutral-800 hover:text-[#EC4899] hover:underline"
                >
                  {CONTACT_PHONE}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                {t("socialLabel")}
              </dt>
              <dd className="mt-2">
                <div className="inline-flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50/80 px-4 py-3">
                  <a
                    href={CONTACT_FACEBOOK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1877F2] text-white transition-opacity hover:opacity-90"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="size-4" />
                  </a>
                  <a
                    href={CONTACT_INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full text-white transition-opacity hover:opacity-90"
                    style={{ background: "linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737)" }}
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="size-4" />
                  </a>
                  <a
                    href={CONTACT_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition-opacity hover:opacity-90"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon className="size-4" />
                  </a>
                </div>
              </dd>
            </div>
          </dl>

          <ul className="mt-6 border-t border-neutral-100 pt-5 space-y-2.5">
            <li className="flex items-center gap-2.5 text-sm text-neutral-600">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500" aria-hidden>✓</span>
              {t("supportSetup")}
            </li>
            <li className="flex items-center gap-2.5 text-sm text-neutral-600">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500" aria-hidden>✓</span>
              {t("supportData")}
            </li>
            <li className="flex items-center gap-2.5 text-sm text-neutral-600">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500" aria-hidden>✓</span>
              {t("supportMultilang")}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
