import type { SiteProps } from "./shared";
import { NailSite } from "./NailSite";
import { HairSite } from "./HairSite";
import { SpaSite } from "./SpaSite";
import { BarberSite } from "./BarberSite";
import { LumenSite } from "./LumenSite";
import { VelvetSite } from "./VelvetSite";
import { ChromaSite } from "./ChromaSite";
import { AurelSite } from "./AurelSite";
import { MarelleSite } from "./MarelleSite";
import { HugoSite } from "./HugoSite";
import { OnyxSite } from "./OnyxSite";
import { IrisSite } from "./IrisSite";
import { KoraSite } from "./KoraSite";
import { NovaSite } from "./NovaSite";
import { KitSite } from "../kit/KitSite";
import { KIT_SPECS } from "../kit/specs";

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
  "marelle-nails": MarelleSite,
  "hugo-hair": HugoSite,
  "onyx-spa": OnyxSite,
  "iris-lash": IrisSite,
  "kora-skin": KoraSite,
  "nova-studio": NovaSite,
  // các mẫu dựng từ khối (kit/specs.ts)
  ...Object.fromEntries(Object.keys(KIT_SPECS).map((slug) => [slug, KitSite])),
};
