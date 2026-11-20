import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileCta } from "@/components/site/MobileCta";

/** Khung chung của mọi trang: menu, nội dung (#main cho "bỏ qua menu"), chân trang, nút dùng thử dính dưới trên điện thoại. */
export function PageShell({ children, cta = true }: { children: React.ReactNode; cta?: boolean }) {
  return (
    <>
      <SiteNav />
      <main id="main">{children}</main>
      <SiteFooter />
      {cta && <MobileCta />}
    </>
  );
}
