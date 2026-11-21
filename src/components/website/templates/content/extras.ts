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
  // Đợt 2 (kit)
  "rosewater-nails": {
    rating: "4,9",
    count: 228,
    transit: "Tramvaj 2 minuty pěšky, náměstí za rohem",
    area: "Vinohrady",
    reviews: [
      { text: "Jemná French přesně podle mé fotky. Ngọc je trpělivá a pečlivá.", name: "Lucie", service: "Manikúra s gel lakem" },
      { text: "Krásné růžové studio, voní tu a hraje příjemná hudba. Nehty drží tři týdny.", name: "Eliška", service: "Gelová modeláž" },
      { text: "Objednávám se online vždy na další termín rovnou při placení. Pohodlné.", name: "Hana", service: "Doplnění gelu" },
    ],
  },
  "siena-spa": {
    rating: "4,9",
    count: 174,
    transit: "Tramvaj 3 minuty pěšky, centrum na dosah",
    area: "Brno-střed",
    reviews: [
      { text: "Aromaterapeutická masáž po dlouhém týdnu. Odcházela jsem úplně jinak, než jsem přišla.", name: "Kamila", service: "Aromaterapeutická masáž" },
      { text: "Párová masáž jako dárek k výročí. Klid, čaj a teplé ručníky.", name: "Michal", service: "Párová masáž" },
      { text: "Lucie najde každé zatuhlé místo. Záda bez bolesti poprvé po měsících.", name: "Jitka", service: "Masáž zad a šíje" },
    ],
  },
  "north-barber": {
    rating: "4,9",
    count: 311,
    transit: "Metro 2 minuty pěšky, parkování v ulici",
    area: "Karlín",
    reviews: [
      { text: "Skin fade bez chyby a za 50 minut. Lepší barbershop jsem v okolí nenašel.", name: "Jakub", service: "Skin fade" },
      { text: "Holení břitvou s horkým ručníkem. Hodina klidu a kafe zdarma.", name: "Martin", service: "Holení břitvou" },
      { text: "Chodím se synem, oba odcházíme spokojení. Online rezervace funguje skvěle.", name: "Petr", service: "Pánský a dětský střih" },
    ],
  },
  "lune-lash": {
    rating: "4,9",
    count: 196,
    transit: "Tramvaj 2 minuty pěšky, obchodní centrum vedle",
    area: "Smíchov",
    reviews: [
      { text: "Řasy 1:1 vypadají úplně přirozeně. Doplnění jen jednou za tři týdny.", name: "Veronika", service: "Prodlužování řas 1:1" },
      { text: "Lash lifting a laminace obočí najednou. Ráno mám hotovo za dvě minuty.", name: "Linh", service: "Lash & brow balíček" },
      { text: "Klidné studio, pohodlné lehátko, skoro jsem usnula.", name: "Adéla", service: "Objem 2–3D" },
    ],
  },
  "bloom-bar": {
    rating: "4,8",
    count: 152,
    transit: "Tramvaj 1 minuta pěšky, kolo zaparkujete u vchodu",
    area: "Holešovice",
    reviews: [
      { text: "Pastelová růžová přesně jak jsem chtěla a vlasy nejsou zničené.", name: "Sára", service: "Pastelové barvy" },
      { text: "Airtouch bez ostrých přechodů. Bára si dala na konzultaci opravdu záležet.", name: "Tereza", service: "Airtouch" },
      { text: "Barevný a veselý salon, skvělá parta. Gloss mezi barvením je super tip.", name: "Nela", service: "Gloss / tónování" },
    ],
  },
  "studio-grey": {
    rating: "4,9",
    count: 143,
    transit: "Tramvaj 3 minuty pěšky, park za rohem",
    area: "Bubeneč",
    reviews: [
      { text: "Střih drží tvar i po dvou měsících. Veronika přesně ví, co vlasům sedí.", name: "Kateřina", service: "Dámský střih a foukaná" },
      { text: "Balayage vypadá jako po dovolené u moře. Žádné pruhy.", name: "Simona", service: "Balayage" },
      { text: "Minimalistický salon, žádný hluk. Pánský střih za 40 minut.", name: "Vojtěch", service: "Pánský střih" },
    ],
  },
  "kader-co": {
    rating: "4,8",
    count: 219,
    transit: "Tramvaj 2 minuty pěšky, parkování ve dvoře",
    area: "Plzeň-střed",
    reviews: [
      { text: "Rodinný salon, kde se cítím jako doma. Barva vždy přesně podle domluvy.", name: "Jana", service: "Barvení odrostu" },
      { text: "Michaela mi poradila střih, který zvládnu upravit sama. Paráda.", name: "Lenka", service: "Dámský střih" },
      { text: "Společenský účes na svatbu sestry vydržel až do rána.", name: "Klára", service: "Společenský účes" },
    ],
  },
  "olive-skin": {
    rating: "4,9",
    count: 137,
    transit: "Tramvaj 2 minuty pěšky, parkování před domem",
    area: "Olomouc-centrum",
    reviews: [
      { text: "Barbora mi po diagnostice sestavila domácí péči. Pleť je klidnější než kdy dřív.", name: "Martina", service: "Konzultace a diagnostika pleti" },
      { text: "Hloubkové čištění bez bolesti a bez zarudnutí. Vrátím se.", name: "Petra", service: "Hloubkové čištění pleti" },
      { text: "Čisté, světlé studio a žádné vnucování kosmetiky.", name: "Thảo", service: "Hydratační ošetření" },
    ],
  },
  "glow-room": {
    rating: "4,9",
    count: 165,
    transit: "Tramvaj 2 minuty pěšky, kavárna hned vedle",
    area: "Žižkov",
    reviews: [
      { text: "Líčení na focení vypadalo skvěle naživo i na fotkách. Natálie je profík.", name: "Barbora", service: "Líčení na focení" },
      { text: "Kurz líčení mi změnil ranní rutinu. Konečně vím, co dělám.", name: "Anh", service: "Individuální kurz líčení" },
      { text: "Večerní líčení na ples, drželo do čtyř do rána.", name: "Klára", service: "Večerní líčení" },
    ],
  },
  "brow-lab": {
    rating: "4,9",
    count: 204,
    transit: "Tramvaj 3 minuty pěšky, obchodní centrum vedle",
    area: "Moravská Ostrava",
    reviews: [
      { text: "Henna brows vypadají přirozeně a vydržely skoro měsíc.", name: "Denisa", service: "Henna brows" },
      { text: "Laminace obočí a konečně nemusím každé ráno nic upravovat.", name: "Ivana", service: "Laminace obočí" },
      { text: "Rychlé, čisté a přesné. Objednání online za minutu.", name: "My", service: "Úprava a barvení" },
    ],
  },
  // Đợt 3 (kit)
  "velour-nails": {
    rating: "4,9",
    count: 187,
    transit: "Metro 4 minuty pěšky, tramvaj před domem",
    area: "Nové Město",
    reviews: [
      { text: "Trang nakreslila na nehty malé kytičky přesně podle mé předlohy. Umělkyně.", name: "Nikola", service: "Zdobení" },
      { text: "Gelová modeláž drží skvěle, tvar mandle přesně jak jsem chtěla.", name: "Kristýna", service: "Gelová modeláž" },
      { text: "Sametové studio, příjemná hudba a čaj. Termín vždycky do týdne.", name: "Linh", service: "Manikúra s gel lakem" },
    ],
  },
  "copper-barber": {
    rating: "4,9",
    count: 248,
    transit: "Náměstí 3 minuty pěšky, parkování v ulici",
    area: "Budějovice-střed",
    reviews: [
      { text: "Nejlepší fade ve městě. Lukáš si dá záležet na každém detailu.", name: "Adam", service: "Skin fade" },
      { text: "Střih a vousy za hodinu, k tomu dobré kafe. Chodím každé tři týdny.", name: "Radek", service: "Střih a vousy" },
      { text: "Syn se konečně nebojí stříhání. Trpěliví a vtipní barbeři.", name: "Pavel", service: "Dětský střih" },
    ],
  },
  "lotus-thai": {
    rating: "4,9",
    count: 233,
    transit: "Tramvaj 2 minuty pěšky, parkování ve dvoře",
    area: "Liberec-centrum",
    reviews: [
      { text: "Tradiční thajská masáž jako v Bangkoku. Mali má neuvěřitelnou sílu i cit.", name: "Jiří", service: "Tradiční thajská masáž" },
      { text: "Masáž bylinnými měšci voní ještě večer. Úžasný relax.", name: "Lenka", service: "Masáž bylinnými měšci" },
      { text: "Krátká masáž nohou po práci, přesně to, co jsem potřebovala.", name: "Hương", service: "Masáž nohou" },
    ],
  },
  "curl-club": {
    rating: "4,9",
    count: 179,
    transit: "Tramvaj 3 minuty pěšky, centrum na dosah",
    area: "Brno-střed",
    reviews: [
      { text: "Poprvé jsem odcházela s kudrlinami, které mají tvar. Střih na sucho je zázrak.", name: "Zuzana", service: "Curly střih na sucho" },
      { text: "Konzultace mi vysvětlila, co dělám doma špatně. Vlasy jsou úplně jiné.", name: "Gábina", service: "Curly konzultace" },
      { text: "Dcera má konečně ráda své kudrlinky. Děkujeme!", name: "Ivana", service: "Curly střih pro děti" },
    ],
  },
  "bridal-suite": {
    rating: "5,0",
    count: 112,
    transit: "Výjezd na místo po celé Praze, studio v centru",
    area: "Staré Město",
    reviews: [
      { text: "Účes i líčení vydržely od obřadu až do půlnoci. Na fotkách jsem se poznala.", name: "Kateřina", service: "Balíček Nevěsta" },
      { text: "Zkouška předem mi vzala všechny nervy. Ráno svatby proběhlo v klidu.", name: "Lea", service: "Zkouška účesu a líčení" },
      { text: "Přijely až k nám na zámek a nalíčily i všechny družičky. Perfektní tým.", name: "Thu", service: "Líčení pro hosty" },
    ],
  },
  "mono-nails": {
    rating: "4,8",
    count: 164,
    transit: "Náměstí 2 minuty pěšky, parkování za domem",
    area: "Hradec-centrum",
    reviews: [
      { text: "Čistý minimalistický styl a nehty bez chybičky. Hà je perfekcionistka.", name: "Alžběta", service: "Manikúra s gel lakem" },
      { text: "Rychlá a přesná manikúra v pauze na oběd. Super.", name: "Monika", service: "Klasická manikúra" },
      { text: "Pedikúra s gel lakem na celé léto. Moc příjemné studio.", name: "Šárka", service: "Pedikúra s gel lakem" },
    ],
  },
  "gentlemans-club": {
    rating: "4,9",
    count: 286,
    transit: "Metro 3 minuty pěšky, garáž za rohem",
    area: "Staré Město",
    reviews: [
      { text: "Gentleman rituál je hodina a půl čistého luxusu. Ideální dárek.", name: "Richard", service: "Gentleman rituál" },
      { text: "Otec a syn: oba ostříhaní, oba spokojení, a ještě limonáda pro malého.", name: "Daniel", service: "Otec a syn" },
      { text: "Holení břitvou s horkým ručníkem. Pocit jako ve starém filmu.", name: "Vít", service: "Holení břitvou" },
    ],
  },
  "riverside-spa": {
    rating: "4,9",
    count: 301,
    transit: "Kolonáda 5 minut pěšky, parkování u hotelu",
    area: "Karlovy Vary",
    reviews: [
      { text: "Wellness a masáž s výhledem na řeku. Víkend, na který nezapomeneme.", name: "Tereza", service: "Wellness a masáž" },
      { text: "Privátní wellness pro dva bylo naprosto klidné, jen my a pára.", name: "Jan", service: "Privátní wellness pro dva" },
      { text: "Masáž lávovými kameny bolavým zádům moc pomohla. Profesionální přístup.", name: "Věra", service: "Masáž lávovými kameny" },
    ],
  },
  "aqua-pedi": {
    rating: "4,9",
    count: 258,
    transit: "Autobus 2 minuty pěšky, parkování před domem",
    area: "Pardubice",
    reviews: [
      { text: "Přístrojová pedikúra bez bolesti. Mai je velmi šetrná a pečlivá.", name: "Renata", service: "Přístrojová pedikúra" },
      { text: "SPA pedikúra s koupelí a masáží, nohy jako nové.", name: "Dagmar", service: "SPA pedikúra" },
      { text: "Chodím pravidelně každý měsíc. Vždy čisto a na čas.", name: "Olga", service: "Mokrá pedikúra" },
    ],
  },
  "halo-color": {
    rating: "4,8",
    count: 171,
    transit: "Metro 4 minuty pěšky, tramvaj před domem",
    area: "Nusle",
    reviews: [
      { text: "Korekce barvy po domácím experimentu. Jitka mi zachránila vlasy.", name: "Petra", service: "Korekce barvy" },
      { text: "Balayage s plánem na tři návštěvy. Výsledek přirozený a vlasy zdravé.", name: "Markéta", service: "Balayage" },
      { text: "Test na pramenu předem a odbarvení bez lámání. Profesionálové.", name: "Nguyệt", service: "Odbarvení" },
    ],
  },
  "mila-beauty": {
    rating: "4,9",
    count: 149,
    transit: "Náměstí 3 minuty pěšky, parkování ve dvoře",
    area: "Zlín",
    reviews: [
      { text: "Andrea mi doporučila péči na míru. Pleť je po měsíci klidná a zářivá.", name: "Hana", service: "Hydratační ošetření" },
      { text: "Laminace obočí a masáž obličeje v jednom termínu. Skvělá hodinka pro sebe.", name: "Simona", service: "Laminace obočí" },
      { text: "Útulný salon, kde se nikdo nespěchá. Doporučuji všem kamarádkám.", name: "Lan", service: "Masáž obličeje" },
    ],
  },
  // Đợt 4 (6 mẫu riêng)
  "ivelle-nail": {
    rating: "4,9",
    count: 297,
    transit: "Tramvaj 2 minuty pěšky, parkování v ulici",
    area: "Vinohrady",
    reviews: [
      { text: "Linh vytvarovala mandle, které vypadají jako moje vlastní nehty, jen hezčí.", name: "Klára", service: "Gelová modeláž" },
      { text: "Nude odstín vybraný se mnou a vydržel tři týdny bez jediného odštípnutí.", name: "Tereza", service: "Manikúra s gel lakem" },
      { text: "Mai maluje drobné detaily úplně ručně. Nikde jinde jsem to neviděla.", name: "Huyền", service: "Zdobení nehtů" },
    ],
  },
  "verra-hair": {
    rating: "4,8",
    count: 214,
    transit: "Tramvaj 3 minuty pěšky, parkování v ulici",
    area: "Holešovice",
    reviews: [
      { text: "Klára mi ustřihla bob, který drží tvar i bez žehličky.", name: "Barbora", service: "Dámský střih" },
      { text: "Balayage od Adama vypadá přirozeně a odrůstá bez ostré linky.", name: "Martina", service: "Balayage" },
      { text: "Vy mi udělala svatební drdol, který vydržel celý den i tanec.", name: "Lenka", service: "Svatební účes" },
    ],
  },
  "saluna-spa": {
    rating: "4,9",
    count: 188,
    transit: "Tramvaj 2 minuty pěšky, park hned vedle",
    area: "Smíchov",
    reviews: [
      { text: "Thu masíruje pomalu a s teplým olejem. Hodina, kdy svět neexistuje.", name: "Ivana", service: "Relaxační masáž" },
      { text: "Ošetření pleti od Hany a pleť září ještě týden potom.", name: "Kateřina", service: "Ošetření pleti" },
      { text: "Klidné prostředí, čaj a žádný spěch. Dárkový poukaz pro mámu byl trefa.", name: "Ondřej", service: "Dárkový poukaz" },
    ],
  },
  "brass-barber": {
    rating: "4,9",
    count: 342,
    transit: "Metro 3 minuty pěšky, parkování v ulici",
    area: "Staré Město",
    reviews: [
      { text: "Tomáš dělá nejčistší fade, jaký jsem kdy měl. Chodím už druhý rok.", name: "Jakub", service: "Fade" },
      { text: "Holení břitvou u Duca s horkým ručníkem je zážitek. Doporučuji.", name: "Lukáš", service: "Holení břitvou" },
      { text: "Klasický střih nůžkami do práce, přesně podle domluvy.", name: "Ondřej", service: "Střih nůžkami" },
    ],
  },
  "lumen-hair": {
    rating: "4,9",
    count: 233,
    transit: "Metro 2 minuty pěšky, garáž za rohem",
    area: "Staré Město",
    reviews: [
      { text: "Eliška mi navrhla strukturovaný bob a dostávám na něj komplimenty každý den.", name: "Nikola", service: "Střih · art director" },
      { text: "Hoa trefila studenou blond bez jediného žlutého tónu.", name: "Andrea", service: "Balayage" },
      { text: "Styling na firemní večírek od Jana byl přesně to, co jsem chtěl.", name: "Filip", service: "Styling na akce" },
    ],
  },
  "velvet-lash": {
    rating: "4,9",
    count: 205,
    transit: "Tramvaj 2 minuty pěšky, obchody v okolí",
    area: "Žižkov",
    reviews: [
      { text: "Anh udělala lehký objem do kočičích očí. Vypadá to úžasně a přirozeně.", name: "Simona", service: "Objem řas" },
      { text: "Laminace obočí od Kláry: tvar drží a nemusím nic dokreslovat.", name: "Petra", service: "Laminace obočí" },
      { text: "Krásné sametové studio a lehátko, na kterém se dá usnout.", name: "Diệp", service: "Prodlužování řas" },
    ],
  },
};
