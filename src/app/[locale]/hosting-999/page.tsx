import { HostingPayPage, hostingPayMetadata, type HostingPayProps } from "@/components/website/HostingPayPage";

export const generateMetadata = hostingPayMetadata;
export default function Page(props: HostingPayProps) {
  return <HostingPayPage {...props} plan="pro" cycle="m" />;
}
