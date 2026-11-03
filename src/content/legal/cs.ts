import type { LegalPack } from "./types";

/**
 * Právní dokumenty SalonGo – česká verze. Česká verze je závazná; ostatní jazyky jsou překlady.
 * Proměnné {email}, {phone}, {operator}, {app}, {site}, {price}, {pages} doplní LegalDocumentPage.
 */
export const cs: LegalPack = {
  ui: {
    operator: "Provozovatel",
    operatorName: "Jméno",
    legalForm: "Fyzická osoba podnikající podle živnostenského zákona (OSVČ), zapsaná v živnostenském rejstříku.",
    ico: "IČO",
    address: "Místo podnikání",
    vatId: "DIČ",
    notVatPayer: "Není plátcem DPH",
    email: "E-mail",
    phone: "Telefon",
    effective: "Účinné od",
    otherDocs: "Další dokumenty",
    prevailing: "",
    readCzech: "",
  },
  docs: {
    terms: {
      title: "Obchodní podmínky",
      description:
        "Obchodní podmínky služby SalonGo: pro koho je služba, zkušební doba, ceny, platby, prodloužení, zrušení, odpovědnost a nahlašování obsahu.",
      sections: [
        {
          heading: "1. Úvodní ustanovení",
          body: [
            "Tyto obchodní podmínky (dále „Podmínky“) upravují užívání softwaru SalonGo – webové aplikace {app}, mobilních a desktopových aplikací a webu {site} (dále „Služba“).",
            "Službu provozuje {operator}, uvedený v rámečku Provozovatel výše (dále „Provozovatel“ nebo „SalonGo“).",
            "Součástí smlouvy jsou také Zpracovatelská smlouva (DPA), Zásady ochrany osobních údajů a aktuální ceník zobrazený v aplikaci. Pro objednávku webových stránek platí zvláštní Podmínky tvorby webových stránek.",
            "Kontaktní místo pro uživatele i pro orgány veřejné moci podle čl. 11 a 12 nařízení (EU) 2022/2065 (DSA) je e-mail {email}. Komunikujeme česky, vietnamsky a anglicky.",
          ],
        },
        {
          heading: "2. Pro koho je Služba",
          body: [
            "Služba je určena výhradně podnikatelům – provozovatelům salonů (fyzickým osobám podnikajícím i právnickým osobám), kteří ji používají v rámci své podnikatelské činnosti (dále „Salon“ nebo „Zákazník“).",
            "Registrací Zákazník potvrzuje, že jedná jako podnikatel a že je oprávněn jednat za Salon. Ustanovení na ochranu spotřebitele, včetně práva odstoupit od smlouvy do 14 dnů, se proto na smlouvu se Salonem nepoužijí.",
            "Majitel Salonu může vytvořit přístupy pro své zaměstnance. Za jejich jednání ve Službě odpovídá Salon.",
            "Klienti salonů mohou bezplatně využívat online rezervace a účet pro správu svých rezervací; pro ně platí článek 17.",
          ],
        },
        {
          heading: "3. Uzavření smlouvy",
          body: [
            "Smlouva vzniká dokončením registrace v aplikaci. Smlouva se uzavírá na dobu neurčitou; placené období se sjednává vždy na jeden měsíc nebo jeden rok.",
            "Smlouva se uzavírá v češtině. Překlady Podmínek do jiných jazyků slouží pro informaci; při rozporu má přednost česká verze.",
            "Podmínky ve znění účinném ke dni uzavření smlouvy jsou trvale dostupné na {site}/cs/terms a Zákazník si je může uložit nebo vytisknout.",
          ],
        },
        {
          heading: "4. Služba a její vývoj",
          body: [
            "Služba obsahuje zejména kalendář a online rezervace, evidenci klientů a služeb, pokladnu a doklady, výpočet mezd a spropitného, přehledy tržeb, správu poboček a připomínky klientům. Aktuální rozsah je popsán na webu a v aplikaci.",
            "Služba se poskytuje ve stavu, v jakém je („as is“) a podle aktuální dostupnosti. SalonGo Službu průběžně vyvíjí a může funkce měnit, nahrazovat nebo rušit, pokud tím podstatně nezhorší hlavní funkce, za které Zákazník platí.",
            "Funkce označené jako beta nebo zkušební mohou být kdykoli změněny nebo ukončeny.",
            "Služba je softwarový nástroj. Výpočty mezd, tržeb a dokladů vycházejí z údajů zadaných Salonem; Salon odpovídá za jejich kontrolu a za splnění svých daňových, účetních a pracovněprávních povinností.",
          ],
        },
        {
          heading: "5. Zkušební doba",
          body: [
            "Každý nový Salon a každá nová pobočka získá bezplatnou zkušební dobu v délce uvedené na webu v den registrace (nyní 150 dní) se všemi funkcemi, bez platební karty.",
            "Po skončení zkušební doby je pro další užívání nutné zaplatit tarif. Bez zaplacení může SalonGo přístup k funkcím omezit; data zůstávají uložena podle článku 14.",
            "SalonGo může délku a podmínky zkušební doby pro nové registrace kdykoli změnit. Již běžící zkušební dobu to nezkracuje.",
          ],
        },
        {
          heading: "6. Ceny a platby",
          body: [
            "Ceny tarifů jsou uvedeny v ceníku na webu a v aplikaci. Rozhodující je cena zobrazená v aplikaci v okamžiku platby. Uvedené ceny jsou konečné.",
            "Tarif se platí předem za zvolené období (měsíc nebo rok), kartou přes platební bránu Stripe nebo jiným způsobem, který aplikace Salonu nabídne (např. bankovním převodem).",
            "Údaje o platební kartě zpracovává pouze Stripe; SalonGo je neukládá.",
            "Doklad o platbě je vystaven elektronicky a je dostupný v aplikaci nebo zaslán e-mailem.",
            "Placené období začíná okamžikem připsání platby. Při převodu se platba považuje za uhrazenou připsáním na účet SalonGo.",
          ],
        },
        {
          heading: "7. Automatické prodloužení a změna ceny",
          body: [
            "Pokud Zákazník zaplatil kartou s automatickým prodloužením, tarif se na konci období automaticky prodlouží o stejné období a platba se strhne ze stejné karty. Prodloužení lze kdykoli zrušit v aplikaci; zrušení platí od dalšího období.",
            "SalonGo může ceny tarifů měnit. Změnu oznámí Zákazníkovi e-mailem nebo v aplikaci nejméně 30 dní předem. Nová cena se použije až od nejbližšího dalšího placeného období. Pokud Zákazník se změnou nesouhlasí, může prodloužení zrušit; jinak platí nová cena.",
            "Při prodlení s platbou může SalonGo po předchozím upozornění a uplynutí 7 dní omezit přístup ke Službě, dokud není platba uhrazena. Zároveň má nárok na zákonný úrok z prodlení.",
          ],
        },
        {
          heading: "8. Zrušení a vrácení peněz",
          body: [
            "Zákazník může tarif kdykoli zrušit. Služba zůstává dostupná do konce zaplaceného období.",
            "Zaplacené období se nevrací ani poměrně nekrátí, a to ani při nevyužívání Služby, předčasném zrušení nebo přechodu na nižší tarif.",
            "SalonGo vrátí peníze nebo poskytne odpovídající prodloužení v těchto případech:",
            "- duplicitní platba nebo platba stržená omylem,",
            "- chybně účtovaná částka,",
            "- Služba byla z příčin na straně SalonGo nedostupná déle než 7 po sobě jdoucích dní; vrací se poměrná část za dobu nedostupnosti.",
            "Žádost se posílá na {email} do 30 dní od platby nebo od události, s uvedením Salonu, data a dokladu o platbě. Schválené vrácení se provede stejným platebním způsobem, zpravidla do 14 dní.",
            "Pokud Zákazník zahájí reklamaci platby u banky (chargeback) bez předchozího kontaktu se SalonGo, může SalonGo do vyřešení sporu pozastavit přístup.",
          ],
        },
        {
          heading: "9. Účet a zabezpečení",
          body: [
            "Zákazník uvádí pravdivé údaje, chrání přihlašovací údaje a neprodleně oznámí jejich zneužití.",
            "Majitel Salonu odpovídá za přidělování a odebírání přístupů zaměstnancům.",
            "SalonGo neodpovídá za škodu způsobenou sdílením hesla, nedostatečným zabezpečením zařízení Zákazníka nebo jednáním osob, kterým Zákazník přístup umožnil.",
          ],
        },
        {
          heading: "10. Zakázané užívání",
          body: [
            "Zákazník nesmí Službu používat zejména k:",
            "- porušování právních předpisů nebo práv třetích osob,",
            "- zasílání nevyžádaných obchodních sdělení bez souhlasu příjemců,",
            "- nahrávání nezákonného obsahu nebo obsahu porušujícího autorská práva,",
            "- útokům na Službu, skenování zranitelností, obcházení omezení, automatizovanému hromadnému stahování dat,",
            "- zpětnému inženýrství, kopírování nebo vytváření konkurenčního produktu ze Služby,",
            "- přeprodeji nebo poskytování Služby třetím osobám bez souhlasu SalonGo.",
          ],
        },
        {
          heading: "11. Obsah uživatelů a jeho nahlašování (DSA)",
          body: [
            "SalonGo uchovává obsah, který do Služby vloží Salony (např. názvy, fotografie, popisy služeb, veřejné rezervační stránky). Za tento obsah odpovídá Salon.",
            "SalonGo obsah předem nekontroluje. Může však odstranit nebo znepřístupnit obsah, pozastavit funkci nebo účet, pokud se dozví, že obsah je nezákonný nebo porušuje tyto Podmínky. O tom rozhoduje člověk, nikoli automatický systém.",
            "Kdokoli může nahlásit nezákonný obsah na {email} s předmětem „Nahlášení obsahu“. Oznámení má obsahovat: odkaz (URL) na obsah, vysvětlení, proč je nezákonný, jméno a e-mail oznamovatele a prohlášení, že údaje jsou podle jeho nejlepšího vědomí pravdivé.",
            "SalonGo oznámení vyřídí bez zbytečného odkladu a o výsledku informuje oznamovatele. Pokud obsah omezí, sdělí dotčenému Salonu důvody (čl. 17 DSA). Proti rozhodnutí se lze ohradit na stejném e-mailu; tím není dotčeno právo obrátit se na soud.",
          ],
        },
        {
          heading: "12. Data Salonu",
          body: [
            "Data, která Salon do Služby zadá (klienti, rezervace, služby, zaměstnanci, doklady), patří Salonu. SalonGo je zpracovává jako zpracovatel podle Zpracovatelské smlouvy (DPA), která je součástí této smlouvy.",
            "Salon je správcem osobních údajů svých klientů a zaměstnanců. Odpovídá za to, že má pro jejich zpracování právní titul, že klienty informuje, a že obchodní sdělení (SMS, e-mail) posílá jen s jejich souhlasem nebo za podmínek § 7 zákona č. 480/2004 Sb.",
            "Do poznámek nezadávejte údaje, které nejsou nutné. Údaje o zdraví (např. alergie) zadávejte jen tehdy, když je to pro službu nutné a klient s tím souhlasil.",
            "Salon si může data kdykoli exportovat. SalonGo doporučuje pravidelné zálohy důležitých údajů.",
            "SalonGo smí používat anonymizované a souhrnné údaje, ze kterých nelze identifikovat Salon ani osoby, ke zlepšování Služby a statistikám.",
          ],
        },
        {
          heading: "13. Duševní vlastnictví",
          body: [
            "Software, design, texty, loga, šablony a další součásti Služby jsou chráněny právem duševního vlastnictví a patří SalonGo nebo jeho poskytovatelům.",
            "Zákazník získává po dobu trvání smlouvy nevýhradní, nepřevoditelnou a územně neomezenou licenci užívat Službu pro potřeby svého Salonu.",
            "Náměty a připomínky ke Službě může SalonGo volně využít bez nároku na odměnu.",
            "SalonGo může uvádět název Salonu v seznamu referencí. Zákazník může s tím kdykoli e-mailem nesouhlasit a SalonGo referenci odstraní.",
          ],
        },
        {
          heading: "14. Ukončení smlouvy a data po ukončení",
          body: [
            "Zákazník může smlouvu kdykoli ukončit zrušením tarifu a smazáním účtu v aplikaci nebo e-mailem.",
            "SalonGo může smlouvu vypovědět bez udání důvodu s výpovědní dobou 30 dní. V takovém případě vrátí poměrnou část již zaplaceného období.",
            "SalonGo může smlouvu ukončit nebo přístup pozastavit s okamžitou účinností, pokud Zákazník podstatně poruší Podmínky, zejména článek 10, neplatí ani po upozornění, nebo pokud to vyžaduje právní předpis či orgán veřejné moci.",
            "Po ukončení smlouvy nebo po 90 dnech bez zaplaceného tarifu může Zákazník po dobu 30 dní požádat o export dat. Poté SalonGo data smaže; ze záloh jsou odstraněna nejpozději do 90 dalších dní. Doklady a údaje, které musí SalonGo uchovávat podle zákona, se uchovávají po zákonnou dobu.",
          ],
        },
        {
          heading: "15. Dostupnost a odpovědnost",
          body: [
            "SalonGo usiluje o nepřetržitý provoz, ale nezaručuje, že Služba bude bez přerušení a bez chyb. Plánovanou údržbu oznamuje předem, pokud je to možné.",
            "SalonGo neodpovídá za ušlý zisk, ztrátu tržeb, nepřímé a následné škody, za škody způsobené nesprávnými údaji zadanými Zákazníkem, výpadky internetu, zařízení Zákazníka nebo služeb třetích stran (např. platební brány, operátorů, obchodů s aplikacemi), ani za události mimo jeho kontrolu.",
            "Celková odpovědnost SalonGo za škodu z této smlouvy je omezena na částku, kterou Zákazník zaplatil SalonGo za posledních 12 měsíců před událostí, nejvýše však na 10 000 Kč.",
            "Omezení podle tohoto článku se nepoužijí na škodu způsobenou úmyslně nebo z hrubé nedbalosti, na újmu na přirozených právech člověka ani v jiných případech, kdy zákon omezení nepřipouští (§ 2898 občanského zákoníku).",
            "Zákazník nahradí SalonGo škodu a náklady, které SalonGo vzniknou z nároků třetích osob (např. klientů nebo zaměstnanců Salonu) v důsledku porušení právních předpisů nebo těchto Podmínek Zákazníkem.",
          ],
        },
        {
          heading: "16. Změna Podmínek",
          body: [
            "SalonGo může tyto Podmínky přiměřeně měnit, zejména kvůli změně právních předpisů, rozšíření Služby, bezpečnosti nebo obchodní politiky.",
            "Změnu oznámí Zákazníkovi e-mailem nebo v aplikaci nejméně 30 dní před účinností. Zákazník má právo změnu odmítnout a smlouvu z tohoto důvodu vypovědět s účinností ke dni účinnosti změny; pak mu bude vrácena poměrná část zaplaceného období. Pokud změnu neodmítne, platí, že ji přijal.",
            "Změny, které jsou pouze ve prospěch Zákazníka nebo které vyžaduje zákon, mohou nabýt účinnosti dříve.",
          ],
        },
        {
          heading: "17. Klienti salonů (online rezervace)",
          body: [
            "Klient salonu může zdarma vytvořit rezervaci a účet pro správu rezervací. Smlouvu o službě (např. manikúra, střih) uzavírá klient přímo se Salonem; SalonGo není její stranou a neodpovídá za kvalitu, cenu ani storno podmínky Salonu.",
            "Klient může účet kdykoli zrušit. SalonGo může účet zrušit při zneužití (např. falešné rezervace).",
            "Je-li klient spotřebitelem, má právo na mimosoudní řešení sporu u České obchodní inspekce (www.coi.cz). Tím není dotčeno právo obrátit se na soud.",
          ],
        },
        {
          heading: "18. Závěrečná ustanovení",
          body: [
            "Smlouva se řídí právem České republiky, zejména zákonem č. 89/2012 Sb., občanský zákoník.",
            "Spory mezi SalonGo a Zákazníkem rozhoduje věcně příslušný soud podle místa podnikání Provozovatele.",
            "Strany na sebe přebírají nebezpečí změny okolností (§ 1765 odst. 2 občanského zákoníku). Mezi podnikateli se nepoužijí § 1799 a § 1800 občanského zákoníku o smlouvách uzavíraných adhezním způsobem.",
            "Promlčecí lhůta pro nároky Zákazníka vůči SalonGo činí 1 rok, pokud zákon nestanoví jinak.",
            "Komunikace probíhá elektronicky (e-mail, aplikace). Je-li některé ustanovení neplatné, ostatní ustanovení zůstávají v platnosti.",
          ],
        },
      ],
    },

    privacy: {
      title: "Zásady ochrany osobních údajů",
      description:
        "Jak SalonGo zpracovává osobní údaje návštěvníků webu, salonů, jejich zaměstnanců a klientů: účely, právní základy, doby uložení, příjemci a vaše práva podle GDPR.",
      sections: [
        {
          heading: "1. Kdo je správce",
          body: [
            "Správcem osobních údajů je Provozovatel uvedený v rámečku výše. Ve věcech osobních údajů nás kontaktujte na {email} s předmětem „GDPR“.",
            "Pověřence pro ochranu osobních údajů nemáme jmenovaného, protože to pro nás zákon nevyžaduje.",
          ],
        },
        {
          heading: "2. Kdy jsme správce a kdy zpracovatel",
          body: [
            "Jsme správcem údajů návštěvníků webu, uživatelů účtů salonů (majitelů a zaměstnanců) v rozsahu správy účtu a fakturace, a klientů, kteří si vytvoří účet pro správu rezervací.",
            "Údaje, které salon do aplikace zadává o svých klientech a zaměstnancích (jména, telefony, rezervace, poznámky, mzdy), zpracováváme jako zpracovatel pro salon. Správcem je salon. S dotazy a žádostmi k těmto údajům se obracejte především na svůj salon; jeho žádosti vyřizujeme podle Zpracovatelské smlouvy (DPA).",
          ],
        },
        {
          heading: "3. Jaké údaje, proč a jak dlouho",
          body: [
            "Návštěvníci webu {site}:",
            "- technické záznamy serveru (IP adresa, prohlížeč, čas, navštívená stránka) – zabezpečení a provoz webu – oprávněný zájem – nejvýše 30 dní,",
            "- cookie s volbou jazyka – viz Zásady cookies.",
            "Kontaktujete-li nás (e-mail, telefon, WhatsApp, Facebook, Instagram):",
            "- jméno, kontakt, obsah zprávy – vyřízení dotazu a jednání o smlouvě – oprávněný zájem a kroky před uzavřením smlouvy – 3 roky od poslední komunikace.",
            "Účet salonu (majitel a zaměstnanci):",
            "- jméno, e-mail, telefon, název a adresa salonu, IČO, role a přihlašovací údaje (heslo ukládáme jen zašifrované) – poskytování Služby – plnění smlouvy – po dobu trvání účtu a 30 dní poté,",
            "- tarif, platby, doklady – plnění smlouvy a zákonné povinnosti v účetnictví a daních – 10 let,",
            "- servisní e-maily a oznámení (např. ověření účtu, konec zkušební doby, změna podmínek) – plnění smlouvy,",
            "- novinky o SalonGo a podobných službách na e-mail zákazníků – oprávněný zájem podle § 7 odst. 3 zákona č. 480/2004 Sb. – do odhlášení; odhlásit se můžete v každém e-mailu nebo na {email},",
            "- požadavky na podporu – vyřízení požadavku – oprávněný zájem – 3 roky.",
            "Klienti salonů s účtem pro rezervace:",
            "- jméno, e-mail, telefon, rezervace a členství u salonů – správa účtu a rezervací – plnění smlouvy – do zrušení účtu; rezervace samotné uchovává salon jako správce.",
            "Aplikace a zabezpečení:",
            "- identifikátor zařízení pro oznámení (push), verze aplikace, chybová hlášení, bezpečnostní záznamy – provoz, zabezpečení a oprava chyb – oprávněný zájem a plnění smlouvy – záznamy nejvýše 90 dní, déle jen při řešení incidentu.",
            "Uvedení údajů pro účet a platby je nutné k uzavření smlouvy; bez nich nelze Službu poskytovat. Ostatní údaje jsou dobrovolné.",
          ],
        },
        {
          heading: "4. Komu údaje předáváme",
          body: [
            "Údaje neprodáváme a nepronajímáme. Předáváme je jen v nezbytném rozsahu těmto dodavatelům, kteří je pro nás zpracovávají:",
            "- Vercel Inc. – hosting webu a aplikace (servery v EU, Frankfurt),",
            "- Neon Inc. – databáze (AWS, Frankfurt),",
            "- Stripe Payments Europe Ltd. – platby kartou (Irsko),",
            "- Resend (Plus Five Five Inc.) – odesílání e-mailů,",
            "- Google Ireland Ltd. / Firebase Cloud Messaging – oznámení v mobilní aplikaci,",
            "- Functional Software Inc. (Sentry) – hlášení chyb,",
            "- GitHub Inc. – stahování desktopové aplikace.",
            "Dále účetním a daňovým poradcům, právním zástupcům a orgánům veřejné moci, pokud to ukládá zákon.",
            "Pokud nás kontaktujete přes WhatsApp, Facebook nebo Instagram, je společnost Meta pro tyto služby samostatným správcem podle svých podmínek.",
          ],
        },
        {
          heading: "5. Předání mimo EU",
          body: [
            "Někteří dodavatelé sídlí v USA. Předání probíhá na základě rozhodnutí Evropské komise o odpovídající ochraně (EU-US Data Privacy Framework), pokud je dodavatel certifikován, jinak na základě standardních smluvních doložek EU.",
          ],
        },
        {
          heading: "6. Vaše práva",
          body: [
            "Máte právo na přístup k údajům, opravu, výmaz, omezení zpracování, přenositelnost a právo vznést námitku proti zpracování na základě oprávněného zájmu, včetně námitky proti zasílání novinek (té vždy vyhovíme). Udělený souhlas můžete kdykoli odvolat.",
            "Žádost pošlete na {email}. Odpovíme do 1 měsíce; ve složitých případech můžeme lhůtu prodloužit o další 2 měsíce a dáme vám vědět. Můžeme ověřit vaši totožnost.",
            "Máte právo podat stížnost u Úřadu pro ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7, www.uoou.gov.cz, nebo u úřadu ve státě EU, kde žijete či pracujete.",
          ],
        },
        {
          heading: "7. Zabezpečení",
          body: [
            "Používáme šifrované spojení (HTTPS), šifrované ukládání hesel, oddělení dat jednotlivých salonů, řízení přístupů podle rolí a zálohy. K údajům mají přístup jen osoby, které je potřebují a jsou vázány mlčenlivostí.",
            "Při porušení zabezpečení postupujeme podle čl. 33 a 34 GDPR.",
          ],
        },
        {
          heading: "8. Další informace",
          body: [
            "Nepoužíváme automatizované rozhodování ani profilování s právními účinky.",
            "Služba není určena osobám mladším 15 let.",
            "Tyto zásady můžeme aktualizovat. Aktuální znění je vždy na {site}/cs/privacy; o podstatných změnách informujeme uživatele účtů e-mailem nebo v aplikaci.",
          ],
        },
      ],
    },

    cookies: {
      title: "Zásady cookies",
      description: "Jaké cookies a podobné technologie používá web a aplikace SalonGo. Nepoužíváme reklamní ani analytické cookies.",
      sections: [
        {
          heading: "1. Co jsou cookies",
          body: [
            "Cookies jsou malé soubory, které web ukládá do vašeho prohlížeče. Podobně funguje i místní úložiště prohlížeče (local storage).",
          ],
        },
        {
          heading: "2. Co používáme na webu {site}",
          body: [
            "- NEXT_LOCALE – zapamatuje zvolený jazyk webu – nezbytná – do zavření prohlížeče nebo nejvýše 1 rok.",
            "Web nepoužívá analytické, reklamní ani sledovací cookies a nenačítá obsah třetích stran, který by cookies nastavoval. Proto nežádáme o souhlas: nezbytné cookies lze podle § 89 odst. 3 zákona č. 127/2005 Sb. používat bez souhlasu.",
            "Odkazy na Facebook, Instagram a WhatsApp jsou obyčejné odkazy. Cookies těchto služeb se nastaví až po jejich otevření a řídí se jejich pravidly.",
          ],
        },
        {
          heading: "3. Co používáme v aplikaci {app}",
          body: [
            "- cookies přihlášení a zabezpečení (relace, ochrana proti CSRF) – nezbytné – po dobu přihlášení,",
            "- místní úložiště pro jazyk, vzhled a nastavení zobrazení – nezbytné pro funkci, kterou si vyžádáte.",
          ],
        },
        {
          heading: "4. Změny",
          body: [
            "Pokud v budoucnu zavedeme analytické nebo marketingové cookies, spustíme je jen s vaším předchozím souhlasem přes lištu, kde bude volba „Odmítnout“ stejně snadná jako „Přijmout“, a tyto zásady aktualizujeme.",
            "Cookies můžete kdykoli smazat nebo zablokovat v nastavení prohlížeče. Bez nezbytných cookies nemusí přihlášení fungovat.",
          ],
        },
      ],
    },

    dpa: {
      title: "Zpracovatelská smlouva (DPA)",
      description:
        "Smlouva o zpracování osobních údajů podle čl. 28 GDPR mezi salonem (správcem) a SalonGo (zpracovatelem): rozsah, povinnosti, subdodavatelé, incidenty, výmaz.",
      sections: [
        {
          heading: "1. Strany a uzavření",
          body: [
            "Tato smlouva o zpracování osobních údajů (dále „DPA“) se uzavírá mezi Salonem jako správcem a Provozovatelem SalonGo jako zpracovatelem podle čl. 28 nařízení (EU) 2016/679 (GDPR).",
            "DPA je součástí Obchodních podmínek a je uzavřena registrací Salonu ve Službě. Platí po dobu užívání Služby a do výmazu dat podle článku 10.",
          ],
        },
        {
          heading: "2. Předmět, povaha a účel",
          body: [
            "Zpracovatel uchovává a zpracovává osobní údaje, které Salon do Služby vloží, za účelem poskytování Služby: kalendáře a rezervací, evidence klientů, pokladny a dokladů, výpočtu mezd, přehledů, zasílání připomínek a zpráv klientům na pokyn Salonu, zálohování a podpory.",
          ],
        },
        {
          heading: "3. Kategorie subjektů a údajů",
          body: [
            "Subjekty údajů: klienti Salonu, zaměstnanci a spolupracovníci Salonu.",
            "Údaje: jméno, telefon, e-mail, datum narození, historie rezervací a služeb, platby a doklady, poznámky, fotografie, údaje o věrnostních programech; u zaměstnanců také role, tržby, provize, mzdy a spropitné.",
            "Zvláštní kategorie (např. údaje o zdraví jako alergie) jen tehdy, když je Salon zadá. Salon odpovídá za to, že má pro ně právní titul podle čl. 9 GDPR.",
          ],
        },
        {
          heading: "4. Pokyny správce",
          body: [
            "Zpracovatel zpracovává údaje jen na doložené pokyny Salonu. Pokynem je tato DPA, Obchodní podmínky a nastavení a úkony, které Salon ve Službě provede.",
            "Pokud by pokyn podle názoru Zpracovatele porušoval právní předpisy, Zpracovatel na to Salon upozorní.",
            "Zpracovatel nepoužije údaje pro vlastní účely; může však vytvářet anonymizované souhrnné statistiky, které nejsou osobními údaji.",
          ],
        },
        {
          heading: "5. Mlčenlivost a zabezpečení",
          body: [
            "Osoby oprávněné zpracovávat údaje jsou vázány mlčenlivostí.",
            "Zpracovatel přijímá technická a organizační opatření podle čl. 32 GDPR, zejména: šifrovaný přenos (HTTPS/TLS), šifrovaná hesla, logické oddělení dat salonů, řízení přístupů podle rolí, minimální přístup provozních osob, pravidelné zálohy, záznamy o přístupech a průběžné aktualizace softwaru.",
          ],
        },
        {
          heading: "6. Subdodavatelé (další zpracovatelé)",
          body: [
            "Salon uděluje obecný souhlas se zapojením dalších zpracovatelů. Aktuální seznam:",
            "- Vercel Inc. – hosting (EU, Frankfurt),",
            "- Neon Inc. – databáze (AWS, Frankfurt),",
            "- Resend (Plus Five Five Inc.) – e-mailové zprávy klientům a uživatelům,",
            "- Google Ireland Ltd. / Firebase Cloud Messaging – push oznámení,",
            "- Functional Software Inc. (Sentry) – hlášení chyb,",
            "- Stripe Payments Europe Ltd. – platby (pokud Salon platby přes Službu využívá).",
            "O plánovaném přidání nebo výměně dalšího zpracovatele informuje Zpracovatel Salon e-mailem nebo v aplikaci nejméně 14 dní předem. Salon může z oprávněných důvodů vznést námitku; pokud se strany nedohodnou, může Salon smlouvu vypovědět a obdrží poměrnou část zaplaceného období.",
            "Zpracovatel ukládá dalším zpracovatelům stejné povinnosti ochrany údajů a odpovídá za jejich plnění.",
            "Předání mimo EU probíhá jen na základě rozhodnutí o odpovídající ochraně (např. EU-US Data Privacy Framework) nebo standardních smluvních doložek.",
          ],
        },
        {
          heading: "7. Součinnost při právech subjektů",
          body: [
            "Služba umožňuje Salonu údaje vyhledat, opravit, exportovat a smazat. Pokud Salon nemůže žádost subjektu vyřídit sám, Zpracovatel mu na žádost poskytne přiměřenou součinnost.",
            "Obdrží-li Zpracovatel žádost subjektu přímo, předá ji Salonu a sám ji nevyřizuje, pokud ho k tomu Salon nepověří.",
          ],
        },
        {
          heading: "8. Porušení zabezpečení",
          body: [
            "Zpracovatel oznámí Salonu porušení zabezpečení osobních údajů bez zbytečného odkladu, nejpozději do 48 hodin od zjištění, a poskytne dostupné informace podle čl. 33 odst. 3 GDPR, aby mohl Salon splnit svou ohlašovací povinnost.",
          ],
        },
        {
          heading: "9. Další součinnost a kontrola",
          body: [
            "Zpracovatel poskytne Salonu přiměřenou součinnost při posouzení vlivu (DPIA) a předchozí konzultaci s dozorovým úřadem.",
            "Zpracovatel poskytne informace potřebné k doložení plnění této DPA. Kontrolu (audit) lze provést po písemném oznámení nejméně 30 dní předem, nejvýše jednou ročně, v pracovní době, bez narušení provozu a bez přístupu k datům jiných salonů; náklady nese Salon, pokud kontrola neodhalí podstatné porušení.",
          ],
        },
        {
          heading: "10. Ukončení: vrácení a výmaz",
          body: [
            "Po ukončení smlouvy může Salon do 30 dní exportovat data nebo požádat o jejich předání v běžném strojově čitelném formátu. Poté Zpracovatel údaje smaže; ze záloh budou odstraněny nejpozději do 90 dalších dní, ledaže právní předpis vyžaduje jejich uchování.",
          ],
        },
        {
          heading: "11. Odpovědnost a rozhodné právo",
          body: [
            "Odpovědnost stran se řídí čl. 82 GDPR a Obchodními podmínkami.",
            "Tato DPA se řídí právem České republiky. Při rozporu s Obchodními podmínkami má v otázkách ochrany osobních údajů přednost tato DPA.",
          ],
        },
      ],
    },

    websiteTerms: {
      title: "Podmínky tvorby webových stránek",
      description:
        "Podmínky nabídky webových stránek pro zákazníky SalonGo ({price}, až {pages} stránek): rozsah, platba, termíny, úpravy, převzetí, práva k webu a hosting.",
      sections: [
        {
          heading: "1. O co jde",
          body: [
            "Tyto podmínky upravují smlouvu o dílo, kterou uzavírá Provozovatel SalonGo (zhotovitel) se salonem (objednatel) na vytvoření webových stránek salonu. Doplňkově platí Obchodní podmínky SalonGo.",
            "Nabídka je určena podnikatelům, kteří mají v okamžiku objednávky aktivní účet SalonGo (placený tarif nebo zkušební dobu).",
          ],
        },
        {
          heading: "2. Objednávka a uzavření smlouvy",
          body: [
            "Objednávku lze poslat telefonem, e-mailem, přes Facebook, Instagram nebo WhatsApp.",
            "Smlouva vzniká, když SalonGo písemně (e-mailem nebo zprávou) potvrdí objednávku se zvolenou šablonou, rozsahem a cenou.",
          ],
        },
        {
          heading: "3. Rozsah díla",
          body: [
            "V ceně je:",
            "- web o nejvýše {pages} stránkách (např. úvod, služby a ceník, o nás, galerie, kontakt) podle zvolené šablony nebo vlastního nápadu objednatele,",
            "- přizpůsobení textů, fotografií, barev a údajů salonu dodaných objednatelem,",
            "- zobrazení na počítači i telefonu,",
            "- tlačítko na online rezervaci SalonGo, pokud ji salon má zapnutou,",
            "- dvě kola úprav po předání návrhu.",
            "V ceně není: psaní textů a překlady nad rámec drobných úprav, focení a nákup fotografií, doména, hosting, e-shop, napojení na jiné systémy, garance pozic ve vyhledávačích a pozdější průběžné změny. Tyto práce lze objednat zvlášť podle dohody.",
          ],
        },
        {
          heading: "4. Cena a platba",
          body: [
            "Cena je {price} jednorázově za tvorbu webu. Cena je konečná.",
            "Cena se platí předem, po potvrzení objednávky, způsobem uvedeným v potvrzení. Práce začnou po připsání platby a doručení podkladů.",
            "Doménu a hosting nabízí SalonGo samostatně za cenu uvedenou v individuální nabídce.",
          ],
        },
        {
          heading: "5. Podklady a termín",
          body: [
            "Objednatel dodá název, kontakty, služby a ceny, texty, logo a fotografie. Odpovídá za jejich správnost a za to, že má právo je použít (autorská práva, ochranné známky, souhlas osob na fotografiích).",
            "Návrh webu SalonGo předá zpravidla do 14 pracovních dní od platby a dodání všech podkladů. Termín se prodlužuje o dobu, po kterou objednatel nedodá podklady nebo připomínky.",
            "Pokud objednatel nedodá podklady ani po upozornění do 60 dní od objednávky, může SalonGo smlouvu ukončit; zaplacená cena se vrací po odečtení již provedené práce, nejvýše 50 % ceny.",
            "SalonGo může odmítnout zveřejnit obsah, který je nezákonný nebo porušuje práva třetích osob.",
          ],
        },
        {
          heading: "6. Úpravy a převzetí",
          body: [
            "Objednatel pošle připomínky k návrhu najednou, v každém kole úprav. Další kola nebo změny zadání po schválení se účtují podle dohody.",
            "Dílo je předáno zasláním odkazu na hotový web. Neoznámí-li objednatel do 7 dní písemně konkrétní vady, platí, že dílo převzal bez výhrad. Drobné vady, které nebrání užívání, nejsou důvodem k odmítnutí převzetí; SalonGo je opraví v přiměřené lhůtě.",
          ],
        },
        {
          heading: "7. Záruka a odpovědnost",
          body: [
            "Chyby webu (např. nefunkční odkaz, špatné zobrazení), které objednatel oznámí do 30 dní od předání, SalonGo opraví zdarma.",
            "SalonGo neodpovídá za obsah dodaný objednatelem, za výsledky ve vyhledávačích, za tržby salonu ani za výpadky domény a hostingu třetích stran.",
            "Celková odpovědnost SalonGo z této smlouvy je omezena na zaplacenou cenu díla. Omezení se nepoužije na škodu způsobenou úmyslně nebo z hrubé nedbalosti.",
            "Objednatel nahradí SalonGo škodu z nároků třetích osob kvůli podkladům, které dodal.",
          ],
        },
        {
          heading: "8. Práva k webu",
          body: [
            "Po úplném zaplacení získá objednatel nevýhradní, časově neomezenou licenci užívat hotový web pro propagaci svého salonu, včetně textů a fotografií, které dodal.",
            "Šablony, design, zdrojový kód a obecné prvky zůstávají majetkem SalonGo; objednatel je nesmí dále prodávat ani použít pro jiné weby. Předání zdrojového kódu lze sjednat zvlášť za úplatu.",
            "SalonGo smí web uvádět ve svých referencích a ukázkách. Objednatel s tím může kdykoli e-mailem nesouhlasit.",
          ],
        },
        {
          heading: "9. Odstoupení před dokončením",
          body: [
            "Před zahájením prací může objednatel objednávku zrušit a obdrží celou cenu zpět.",
            "Po zahájení prací se vrací cena snížená o hodnotu již provedené práce. Po předání díla se cena nevrací.",
          ],
        },
        {
          heading: "10. Právní údaje na webu salonu",
          body: [
            "Za právní náležitosti webu salonu odpovídá objednatel jako jeho provozovatel – zejména za údaje o podnikateli (jméno, IČO, sídlo), informace o zpracování osobních údajů a cookies. SalonGo do webu vloží texty a údaje, které objednatel dodá.",
            "Pokud salon ukončí užívání SalonGo, tlačítko online rezervace přestane fungovat. Web zůstává objednateli; pokud jej hostuje SalonGo, řídí se hosting samostatnou dohodou.",
          ],
        },
        {
          heading: "11. Závěr",
          body: [
            "Smlouva se řídí právem České republiky, zejména § 2586 a násl. občanského zákoníku. Ostatní otázky upravují Obchodní podmínky SalonGo.",
          ],
        },
      ],
    },
  },
};
