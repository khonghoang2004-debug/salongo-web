import type { SiteProps } from "./shared";
import { NailSite } from "./NailSite";
import { HairSite } from "./HairSite";
import { SpaSite } from "./SpaSite";
import { BarberSite } from "./BarberSite";

// slug mẫu → component dựng website mẫu đó
export const SITES: Record<string, (p: SiteProps) => React.ReactNode> = {
  "ivelle-nail": NailSite,
  "verra-hair": HairSite,
  "saluna-spa": SpaSite,
  "brass-barber": BarberSite,
};
