// Phần "như website thật" cho các mẫu đã nâng cấp (21/11, đợt 1): hodnocení, recenze, jak k nám.
// Nội dung demo luôn tiếng Séc nên chỉ viết tiếng Séc. Recenze là văn mẫu minh hoạ: chỉ tên riêng (không họ),
// không nhắc thương hiệu thật. Số hodnocení cũng chỉ minh hoạ (thanh "Ukázkový web" + ghi chú chân trang nói rõ).

export type Review = { text: string; name: string; service: string };
export type Extras = {
  /** "4,9" */
  rating: string;
  count: number;
  /** một dòng "jak k nám" dưới địa chỉ */
  transit: string;
  /** tên khu phố in trên bản đồ minh hoạ */
  area: string;
  reviews: [Review, Review, Review];
};

export const EXTRAS: Record<string, Extras> = {
  "aurel-beauty": {
    rating: "4,9",
    count: 128,
    transit: "Tramvaj 2 minuty pěšky, parkování v ulici",
    area: "Vinohrady",
    reviews: [
      { text: "Líčení vydrželo celou svatbu i tancování. Na fotkách přirozené, přesně jak jsem chtěla.", name: "Tereza", service: "Svatební líčení" },
      { text: "Thảo mi poradila odstíny, které mi opravdu sedí. Konečně se umím nalíčit sama.", name: "Linh", service: "Kurz líčení" },
      { text: "Klidné studio, káva a žádný spěch. Na ples jsem odcházela jako nová.", name: "Markéta", service: "Večerní líčení" },
    ],
  },
  "marelle-nails": {
    rating: "4,9",
    count: 312,
    transit: "Tramvaj 3 minuty pěšky, kousek od parku",
    area: "Letná",
    reviews: [
      { text: "Gel lak drží přes tři týdny bez odlupování. Thu má neuvěřitelně jemnou ruku.", name: "Kristýna", service: "Manikúra s gel lakem" },
      { text: "Studio, kde se nespěchá. Káva, hezká hudba a nehty přesně podle fotky.", name: "Veronika", service: "Gelová modeláž" },
      { text: "Pedikúra s gel lakem před dovolenou byla perfektní. Objednávka online za minutu.", name: "Jana", service: "Pedikúra" },
    ],
  },
  "onyx-spa": {
    rating: "4,9",
    count: 264,
    transit: "3 minuty pěšky od nábřeží, garáž v okolí",
    area: "Staré Město",
    reviews: [
      { text: "Párová suita s výhledem na řeku byla nejlepší dárek k výročí. Ticho, čaj a vůně olejů.", name: "Martina", service: "Párový rituál" },
      { text: "Masáž lávovými kameny mi po týdnu u počítače zachránila záda. Vrátím se.", name: "Ondřej", service: "Masáž lávovými kameny" },
      { text: "Krásný prostor a profesionální přístup. Nikdo nikam nespěchá.", name: "Eva", service: "Ošetření obličeje" },
    ],
  },
  "hugo-hair": {
    rating: "4,8",
    count: 97,
    transit: "Tramvaj 2 minuty pěšky, parkování v ulici",
    area: "Žižkov",
    reviews: [
      { text: "K Hugovi chodím pět let. Střih drží tvar i po šesti týdnech.", name: "Petra", service: "Dámský střih" },
      { text: "Melír vypadá přirozeně, žádné pruhy. Lenka přesně ví, co dělá.", name: "Andrea", service: "Melír" },
      { text: "Malý salon bez hluku. Objednání přes web je otázka minuty.", name: "Tomáš", service: "Pánský střih" },
    ],
  },
  "iris-lash": {
    rating: "4,9",
    count: 241,
    transit: "Dvě studia v centru, obě kousek od metra",
    area: "Nové Město",
    reviews: [
      { text: "Objem 2D vypadá přirozeně a vydrží do doplnění. Linh je perfekcionistka.", name: "Lucie", service: "Objem 2D" },
      { text: "Laminace řas bez prodloužení. Ráno už nepotřebuji řasenku.", name: "Simona", service: "Laminace řas" },
      { text: "Dvě studia v centru, takže termín po práci najdu vždycky.", name: "Hana", service: "Doplnění řas" },
    ],
  },
  "chroma-nails": {
    rating: "4,8",
    count: 189,
    transit: "Tramvaj 1 minuta pěšky, kolo zaparkujete u vchodu",
    area: "Holešovice",
    reviews: [
      { text: "Linh mi namalovala přesně ten motiv, co jsem si přinesla na fotce. Za 45 minut hotovo.", name: "Bára", service: "Nail art" },
      { text: "BIAB drží skvěle a nehty pod ním konečně rostou. Super parta holek.", name: "Nikola", service: "BIAB" },
      { text: "Volný termín ještě ten den a stovka barev na výběr. Doporučuji.", name: "Anh", service: "Gel express" },
    ],
  },
  "kora-skin": {
    rating: "4,9",
    count: 156,
    transit: "Autobus 2 minuty pěšky, parkování před domem",
    area: "Modřany",
    reviews: [
      { text: "Jana mi vysvětlila, co pleti škodí. Po třech ošetřeních je vidět rozdíl.", name: "Barbora", service: "Hydratační ošetření" },
      { text: "Laminace obočí od My: přirozený tvar, drží šest týdnů.", name: "Klára", service: "Laminace obočí" },
      { text: "Čisté a klidné studio, nikdo mi nic nenutil. Doporučuji.", name: "Ivana", service: "Čištění pleti" },
    ],
  },
  "nova-studio": {
    rating: "4,8",
    count: 203,
    transit: "Dvě minuty od metra, náměstí za rohem",
    area: "Vinohrady",
    reviews: [
      { text: "Vlasy, nehty i obočí za jedno odpoledne a na jednom místě. Ideální.", name: "Dana", service: "Kadeřnictví a manikúra" },
      { text: "Iveta konečně trefila barvu, kterou jsem chtěla. Studio je světlé a útulné.", name: "Monika", service: "Barvení" },
      { text: "Mokrá pedikúra u Yvony je nejlepší v okolí. Objednávám se pravidelně.", name: "Alena", service: "Pedikúra" },
    ],
  },
  "atelier-noir": {
    rating: "4,9",
    count: 188,
    transit: "Vchod ze dvora, 4 minuty pěšky od metra",
    area: "Staré Město",
    reviews: [
      { text: "Střih, který ráno stačí jen vyfoukat. Přesně to jsem chtěla.", name: "Klára", service: "Dámský střih" },
      { text: "Přirozená blond bez žlutých tónů. Konzultace předem byla skvělá.", name: "Nikola", service: "Barva" },
      { text: "Pánský střih v klidu a s kávou. Ateliér má skvělou atmosféru.", name: "Filip", service: "Pánský střih" },
    ],
  },
  "maison-claire": {
    rating: "4,9",
    count: 276,
    transit: "Metro 3 minuty pěšky, parkoviště za rohem",
    area: "Josefov",
    reviews: [
      { text: "Manikúra s kamarádkou a sklenkou prosecca. Nejlepší sobotní dopoledne.", name: "Adéla", service: "Manikúra s gel lakem" },
      { text: "Chromové nehty přesně podle fotky a drží skoro čtyři týdny.", name: "Petra", service: "Chrom" },
      { text: "Vše čisté a sterilní, příjemný tým. Termín online bez čekání.", name: "Thu", service: "Gelová modeláž" },
    ],
  },
  "thermae-wellness": {
    rating: "4,9",
    count: 342,
    transit: "Tramvaj 3 minuty pěšky, parkování v garáži",
    area: "Malá Strana",
    reviews: [
      { text: "Klenuté sklepy, svíčky a teplá voda. Úplně jsme zapomněli na čas.", name: "Lenka", service: "Privátní okruh" },
      { text: "Termální okruh a masáž po náročném týdnu. Přesně to, co jsem potřebovala.", name: "Jitka", service: "Wellness a masáž" },
      { text: "Malé skupiny, nikde tlačenice. Župan a čaj v ceně jsou milý detail.", name: "Roman", service: "Termální okruh" },
    ],
  },
};
