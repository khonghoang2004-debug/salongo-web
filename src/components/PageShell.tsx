import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
