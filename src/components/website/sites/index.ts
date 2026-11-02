import type { SiteProps } from "./shared";
import { NailSite } from "./NailSite";
import { HairSite } from "./HairSite";
import { SpaSite } from "./SpaSite";
import { BarberSite } from "./BarberSite";
import { LumenSite } from "./LumenSite";
import { VelvetSite } from "./VelvetSite";
import { ChromaSite } from "./ChromaSite";
import { AurelSite } from "./AurelSite";
import { ThemedSite } from "./ThemedSite";

// slug mẫu → component dựng website mẫu đó
export const SITES: Record<string, (p: SiteProps) => React.ReactNode> = {
  "ivelle-nail": NailSite,
  "verra-hair": HairSite,
  "saluna-spa": SpaSite,
  "brass-barber": BarberSite,
  "lumen-hair": LumenSite,
  "velvet-lash": VelvetSite,
  "chroma-nails": ChromaSite,
  "aurel-beauty": AurelSite,
  "tropicana-nails": ThemedSite,
  "cherry-hair": ThemedSite,
  "lilac-lash": ThemedSite,
  "matcha-spa": ThemedSite,
  "azure-barber": ThemedSite,
  "rose-bridal": ThemedSite,
  "saffron-color": ThemedSite,
};
