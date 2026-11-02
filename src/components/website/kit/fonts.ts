import {
  Albert_Sans,
  Anton,
  Bodoni_Moda,
  Cinzel,
  DM_Sans,
  DM_Serif_Display,
  Figtree,
  Forum,
  Gilda_Display,
  Gloock,
  Instrument_Sans,
  Instrument_Serif,
  Marcellus,
  Onest,
  Outfit,
  Petrona,
  Red_Hat_Display,
  Schibsted_Grotesk,
  Sora,
  Syne,
  Urbanist,
  Young_Serif,
} from "next/font/google";
import {
  fontAurel,
  fontAurelSans,
  fontChroma,
  fontChromaNew,
  fontHugo,
  fontIrisSans,
  fontKora,
  fontLumen,
  fontLumenSans,
  fontMarelle,
  fontMarelleSans,
  fontNail,
  fontNova,
  fontOnyx,
  fontOnyxSerif,
  fontSpa,
  fontVelvet,
  fontVelvetSans,
  fontBarber,
  fontHair,
} from "../sites/shared";

// Font cho bộ mẫu dựng từ khối (kit). Demo luôn tiếng Séc → đủ bộ latin-ext. Chỉ font biến thiên hoặc một độ đậm
// (danh sách nhiều độ đậm thỉnh thoảng làm Turbopack build lỗi). preload: false: chỉ tải khi trang dùng.
const o = { subsets: ["latin", "latin-ext"] as ("latin" | "latin-ext")[], display: "swap" as const, preload: false };

const bodoni = Bodoni_Moda({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, style: ["normal", "italic"] });
const dmserif = DM_Serif_Display({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, weight: "400", style: ["normal", "italic"] });
const instrument = Instrument_Serif({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, weight: "400", style: ["normal", "italic"] });
const gloock = Gloock({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, weight: "400" });
const youngserif = Young_Serif({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, weight: "400" });
const marcellus = Marcellus({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, weight: "400" });
const gilda = Gilda_Display({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, weight: "400" });
const forum = Forum({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, weight: "400" });
const anton = Anton({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, weight: "400" });
const cinzel = Cinzel({ subsets: ["latin", "latin-ext"], display: "swap", preload: false });
const petrona = Petrona({ subsets: ["latin", "latin-ext"], display: "swap", preload: false, style: ["normal", "italic"] });
const syne = Syne({ subsets: ["latin", "latin-ext"], display: "swap", preload: false });
const outfit = Outfit({ subsets: ["latin", "latin-ext"], display: "swap", preload: false });
const urbanist = Urbanist({ subsets: ["latin", "latin-ext"], display: "swap", preload: false });
const sora = Sora({ subsets: ["latin", "latin-ext"], display: "swap", preload: false });
const figtree = Figtree({ subsets: ["latin", "latin-ext"], display: "swap", preload: false });
const dmsans = DM_Sans({ subsets: ["latin", "latin-ext"], display: "swap", preload: false });
const onest = Onest({ subsets: ["latin", "latin-ext"], display: "swap", preload: false });
const albert = Albert_Sans({ subsets: ["latin", "latin-ext"], display: "swap", preload: false });
const redhat = Red_Hat_Display({ subsets: ["latin", "latin-ext"], display: "swap", preload: false });
const schibsted = Schibsted_Grotesk({ subsets: ["latin", "latin-ext"], display: "swap", preload: false });
const instrumentSans = Instrument_Sans({ subsets: ["latin", "latin-ext"], display: "swap", preload: false });
void o;

/** Tên font → class (dùng trong specs.ts) */
export const KIT_FONTS = {
  bodoni: bodoni.className,
  dmserif: dmserif.className,
  instrument: instrument.className,
  gloock: gloock.className,
  youngserif: youngserif.className,
  marcellus: marcellus.className,
  gilda: gilda.className,
  forum: forum.className,
  anton: anton.className,
  cinzel: cinzel.className,
  petrona: petrona.className,
  syne: syne.className,
  outfit: outfit.className,
  urbanist: urbanist.className,
  sora: sora.className,
  figtree: figtree.className,
  dmsans: dmsans.className,
  onest: onest.className,
  albert: albert.className,
  redhat: redhat.className,
  schibsted: schibsted.className,
  instrumentSans: instrumentSans.className,
  // dùng lại font đã có của các mẫu khác
  cormorant: fontNail.className,
  spacegrotesk: fontHair.className,
  lora: fontSpa.className,
  oswald: fontBarber.className,
  notoserif: fontLumen.className,
  intertight: fontLumenSans.className,
  playfair: fontVelvet.className,
  josefin: fontVelvetSans.className,
  unbounded: fontChroma.className,
  fraunces: fontAurel.className,
  montserrat: fontAurelSans.className,
  frauncesBold: fontMarelle.className,
  jakarta: fontMarelleSans.className,
  jost: fontHugo.className,
  newsreader: fontNova.className,
  hanken: fontIrisSans.className,
  geologica: fontKora.className,
  tenor: fontOnyx.className,
  garamond: fontOnyxSerif.className,
  bricolage: fontChromaNew.className,
} as const;

export type KitFont = keyof typeof KIT_FONTS;
