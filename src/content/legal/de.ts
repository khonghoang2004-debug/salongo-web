import type { LegalPack } from "./types";

/** Rechtstexte SalonGo – deutsche Übersetzung (maßgeblich ist die tschechische Fassung). */
export const de: LegalPack = {
  ui: {
    operator: "Betreiber",
    operatorName: "Name",
    legalForm: "Unternehmer – natürliche Person, eingetragen im tschechischen Gewerberegister (živnostenský rejstřík); Gewerbeamt: Městský úřad Černošice.",
    ico: "Identifikationsnummer (IČO)",
    address: "Sitz",
    vatId: "USt-IdNr.",
    notVatPayer: "Nicht umsatzsteuerpflichtig registriert",
    email: "E-Mail",
    phone: "Telefon",
    effective: "Gültig ab",
    otherDocs: "Weitere Dokumente",
    prevailing: "Dies ist eine Übersetzung. Bei Abweichungen ist die tschechische Fassung maßgeblich.",
    readCzech: "Tschechische Fassung lesen",
  },
  docs: {
    terms: {
      title: "Allgemeine Geschäftsbedingungen",
      description:
        "AGB von SalonGo: für wen der Dienst ist, Testzeitraum, Preise, Zahlung, Verlängerung, Kündigung, Haftung und Meldung rechtswidriger Inhalte.",
      sections: [
        {
          heading: "1. Allgemeines",
          body: [
            "Diese Bedingungen (die „Bedingungen“) regeln die Nutzung der Software SalonGo: Web-App {app}, Mobil- und Desktop-Apps und Website {site} (der „Dienst“).",
            "Der Dienst wird von {operator} betrieben, siehe Kasten Betreiber oben (der „Betreiber“ oder „SalonGo“).",
            "Bestandteil des Vertrags sind auch der Auftragsverarbeitungsvertrag (AVV/DPA), die Datenschutzerklärung und die aktuelle Preisliste in der App. Für Website-Aufträge gelten gesonderte Bedingungen.",
            "Zentrale Kontaktstelle für Nutzer und Behörden nach Art. 11 und 12 der Verordnung (EU) 2022/2065 (DSA) ist {email}. Wir kommunizieren auf Tschechisch, Vietnamesisch und Englisch.",
          ],
        },
        {
          heading: "2. Für wen der Dienst ist",
          body: [
            "Der Dienst richtet sich ausschließlich an Unternehmer: Salonbetreiber (Einzelunternehmer oder Gesellschaften), die ihn im Rahmen ihrer gewerblichen Tätigkeit nutzen (der „Salon“ oder „Kunde“).",
            "Mit der Registrierung bestätigt der Kunde, als Unternehmer zu handeln und für den Salon vertretungsberechtigt zu sein. Verbraucherschutzvorschriften einschließlich des 14-tägigen Widerrufsrechts gelten daher für den Vertrag mit dem Salon nicht.",
            "Der Salonbesitzer kann Zugänge für Mitarbeiter anlegen. Der Salon haftet für deren Handlungen im Dienst.",
            "Kunden der Salons können Online-Buchungen und ein Buchungskonto kostenlos nutzen; für sie gilt Abschnitt 17.",
          ],
        },
        {
          heading: "3. Vertragsschluss",
          body: [
            "Der Vertrag kommt mit Abschluss der Registrierung in der App zustande. Er wird auf unbestimmte Zeit geschlossen; jeder bezahlte Zeitraum umfasst einen Monat oder ein Jahr.",
            "Vertragssprache ist Tschechisch. Übersetzungen dienen der Information; bei Abweichungen ist die tschechische Fassung maßgeblich.",
            "Die bei Vertragsschluss geltenden Bedingungen sind unter {site}/cs/terms abrufbar und können gespeichert oder gedruckt werden.",
          ],
        },
        {
          heading: "4. Der Dienst und seine Weiterentwicklung",
          body: [
            "Der Dienst umfasst Kalender und Online-Buchung, Kunden- und Leistungsverwaltung, Kasse und Belege, Lohn- und Trinkgeldberechnung, Umsatzberichte, Filialverwaltung und Erinnerungen an Kunden. Der aktuelle Umfang ist auf der Website und in der App beschrieben.",
            "Der Dienst wird „wie besehen“ und nach Verfügbarkeit bereitgestellt. SalonGo entwickelt den Dienst laufend weiter und kann Funktionen ändern, ersetzen oder entfernen, sofern die wesentlichen bezahlten Funktionen nicht erheblich eingeschränkt werden.",
            "Als Beta oder experimentell gekennzeichnete Funktionen können jederzeit geändert oder eingestellt werden.",
            "Der Dienst ist ein Software-Werkzeug. Lohn-, Umsatz- und Belegberechnungen beruhen auf den Eingaben des Salons; der Salon prüft sie und ist für seine steuerlichen, buchhalterischen und arbeitsrechtlichen Pflichten selbst verantwortlich.",
          ],
        },
        {
          heading: "5. Testzeitraum",
          body: [
            "Jeder neue Salon und jede neue Filiale erhält einen kostenlosen Testzeitraum in der bei der Registrierung angezeigten Länge (derzeit 150 Tage) mit allen Funktionen und ohne Karte.",
            "Nach Ablauf ist für die weitere Nutzung ein kostenpflichtiger Tarif erforderlich. Ohne Zahlung kann SalonGo den Zugang zu Funktionen einschränken; die Daten bleiben nach Abschnitt 14 gespeichert.",
            "SalonGo kann Länge und Bedingungen des Testzeitraums für neue Registrierungen jederzeit ändern. Ein laufender Testzeitraum wird dadurch nicht verkürzt.",
          ],
        },
        {
          heading: "6. Preise und Zahlung",
          body: [
            "Die Tarifpreise stehen auf der Website und in der App. Maßgeblich ist der in der App zum Zeitpunkt der Zahlung angezeigte Preis. Die angegebenen Preise sind Endpreise.",
            "Tarife werden im Voraus für den gewählten Zeitraum (Monat oder Jahr) bezahlt, per Karte über Stripe oder auf andere in der App angebotene Weise (z. B. Überweisung).",
            "Kartendaten werden nur von Stripe verarbeitet; SalonGo speichert sie nicht.",
            "Zahlungsbelege werden elektronisch ausgestellt und in der App bereitgestellt oder per E-Mail gesendet.",
            "Der bezahlte Zeitraum beginnt mit Zahlungseingang. Bei Überweisung gilt die Zahlung mit Gutschrift auf dem Konto von SalonGo als erfolgt.",
          ],
        },
        {
          heading: "7. Automatische Verlängerung und Preisänderungen",
          body: [
            "Hat der Kunde per Karte mit automatischer Verlängerung bezahlt, verlängert sich der Tarif am Ende jedes Zeitraums um denselben Zeitraum und wird von derselben Karte abgebucht. Die Verlängerung kann jederzeit in der App beendet werden, wirksam ab dem nächsten Zeitraum.",
            "SalonGo kann Preise ändern und teilt dies mindestens 30 Tage vorher per E-Mail oder in der App mit. Der neue Preis gilt erst ab dem nächsten bezahlten Zeitraum. Ist der Kunde nicht einverstanden, kann er die Verlängerung beenden; andernfalls gilt der neue Preis.",
            "Bei Zahlungsverzug kann SalonGo nach Mahnung und Ablauf von 7 Tagen den Zugang bis zur Zahlung einschränken und hat Anspruch auf gesetzliche Verzugszinsen.",
          ],
        },
        {
          heading: "8. Kündigung und Erstattung",
          body: [
            "Der Kunde kann seinen Tarif jederzeit kündigen. Der Dienst bleibt bis zum Ende des bezahlten Zeitraums verfügbar.",
            "Bezahlte Zeiträume werden weder erstattet noch anteilig verrechnet, auch nicht bei Nichtnutzung, vorzeitiger Kündigung oder Wechsel in einen günstigeren Tarif.",
            "SalonGo erstattet oder verlängert entsprechend in folgenden Fällen:",
            "- doppelte oder irrtümliche Abbuchung,",
            "- falsch berechneter Betrag,",
            "- der Dienst war aus Gründen bei SalonGo länger als 7 aufeinanderfolgende Tage nicht verfügbar; erstattet wird der anteilige Betrag für die Ausfallzeit.",
            "Anfragen sind innerhalb von 30 Tagen nach Zahlung oder Ereignis an {email} zu richten, mit Angabe von Salon, Datum und Zahlungsnachweis. Genehmigte Erstattungen erfolgen auf dem ursprünglichen Zahlungsweg, in der Regel innerhalb von 14 Tagen.",
            "Leitet der Kunde ohne vorherige Kontaktaufnahme eine Rückbuchung (Chargeback) ein, kann SalonGo den Zugang bis zur Klärung sperren.",
          ],
        },
        {
          heading: "9. Konto und Sicherheit",
          body: [
            "Der Kunde macht wahrheitsgemäße Angaben, schützt seine Zugangsdaten und meldet Missbrauch unverzüglich.",
            "Der Salonbesitzer ist für die Vergabe und den Entzug von Mitarbeiterzugängen verantwortlich.",
            "SalonGo haftet nicht für Schäden durch Weitergabe von Passwörtern, unzureichend gesicherte Geräte des Kunden oder Handlungen von Personen, denen der Kunde Zugang gewährt hat.",
          ],
        },
        {
          heading: "10. Verbotene Nutzung",
          body: [
            "Der Kunde darf den Dienst insbesondere nicht nutzen, um:",
            "- gegen Gesetze oder Rechte Dritter zu verstoßen,",
            "- Werbung ohne Einwilligung der Empfänger zu versenden,",
            "- rechtswidrige oder urheberrechtsverletzende Inhalte hochzuladen,",
            "- den Dienst anzugreifen, auf Schwachstellen zu scannen, Beschränkungen zu umgehen oder Daten automatisiert massenhaft herunterzuladen,",
            "- den Dienst zurückzuentwickeln, zu kopieren oder daraus ein Konkurrenzprodukt zu erstellen,",
            "- den Dienst ohne Zustimmung von SalonGo weiterzuverkaufen oder Dritten bereitzustellen.",
          ],
        },
        {
          heading: "11. Nutzerinhalte und Meldungen (DSA)",
          body: [
            "SalonGo speichert Inhalte, die Salons in den Dienst einstellen (Namen, Fotos, Leistungsbeschreibungen, öffentliche Buchungsseiten). Der Salon ist für diese Inhalte verantwortlich.",
            "SalonGo prüft Inhalte nicht vorab, kann aber Inhalte entfernen oder sperren bzw. Funktionen oder Konten aussetzen, sobald es von rechtswidrigen oder bedingungswidrigen Inhalten Kenntnis erhält. Entscheidungen trifft ein Mensch, kein automatisiertes System.",
            "Jeder kann rechtswidrige Inhalte an {email} mit dem Betreff „Meldung von Inhalten“ melden. Die Meldung sollte enthalten: URL des Inhalts, Begründung der Rechtswidrigkeit, Name und E-Mail des Meldenden und die Erklärung, dass die Angaben nach bestem Wissen richtig sind.",
            "SalonGo bearbeitet Meldungen unverzüglich und informiert den Meldenden über das Ergebnis. Wird ein Inhalt eingeschränkt, erhält der betroffene Salon eine Begründung (Art. 17 DSA). Entscheidungen können über dieselbe E-Mail angefochten werden; der Rechtsweg bleibt unberührt.",
          ],
        },
        {
          heading: "12. Daten des Salons",
          body: [
            "Die vom Salon eingegebenen Daten (Kunden, Buchungen, Leistungen, Mitarbeiter, Belege) gehören dem Salon. SalonGo verarbeitet sie als Auftragsverarbeiter nach dem Auftragsverarbeitungsvertrag (DPA), der Bestandteil dieses Vertrags ist.",
            "Der Salon ist Verantwortlicher für die personenbezogenen Daten seiner Kunden und Mitarbeiter. Er ist verantwortlich für eine Rechtsgrundlage, die Information der Kunden und dafür, Werbung (SMS, E-Mail) nur mit Einwilligung oder nach § 7 des Gesetzes Nr. 480/2004 Slg. zu versenden.",
            "Geben Sie in Notizen keine unnötigen Daten ein. Gesundheitsdaten (z. B. Allergien) nur, wenn für die Leistung erforderlich und mit Einwilligung des Kunden.",
            "Der Salon kann seine Daten jederzeit exportieren. SalonGo empfiehlt regelmäßige Sicherungen wichtiger Daten.",
            "SalonGo darf anonymisierte, aggregierte Daten, die weder den Salon noch Personen identifizieren, zur Verbesserung des Dienstes und für Statistiken nutzen.",
          ],
        },
        {
          heading: "13. Geistiges Eigentum",
          body: [
            "Software, Design, Texte, Logos, Vorlagen und andere Bestandteile des Dienstes sind urheber- bzw. schutzrechtlich geschützt und gehören SalonGo oder seinen Lizenzgebern.",
            "Für die Vertragsdauer erhält der Kunde eine nicht ausschließliche, nicht übertragbare, räumlich unbeschränkte Lizenz zur Nutzung des Dienstes für seinen Salon.",
            "SalonGo darf Anregungen zum Dienst ohne Vergütung frei nutzen.",
            "SalonGo darf den Namen des Salons als Referenz nennen. Der Kunde kann dem jederzeit per E-Mail widersprechen; SalonGo entfernt die Referenz dann.",
          ],
        },
        {
          heading: "14. Vertragsende und Daten danach",
          body: [
            "Der Kunde kann den Vertrag jederzeit durch Kündigung des Tarifs und Löschen des Kontos in der App oder per E-Mail beenden.",
            "SalonGo kann den Vertrag ohne Angabe von Gründen mit einer Frist von 30 Tagen kündigen und erstattet dann den anteiligen Betrag des bezahlten Zeitraums.",
            "SalonGo kann den Vertrag fristlos beenden oder den Zugang sperren, wenn der Kunde die Bedingungen wesentlich verletzt (insbesondere Abschnitt 10), trotz Mahnung nicht zahlt oder wenn Gesetz oder Behörde dies verlangen.",
            "Nach Vertragsende oder nach 90 Tagen ohne bezahlten Tarif kann der Kunde innerhalb von 30 Tagen einen Datenexport verlangen. Danach löscht SalonGo die Daten; Sicherungen werden spätestens innerhalb weiterer 90 Tage bereinigt. Gesetzlich aufzubewahrende Unterlagen werden für die gesetzliche Frist aufbewahrt.",
          ],
        },
        {
          heading: "15. Verfügbarkeit und Haftung",
          body: [
            "SalonGo strebt einen unterbrechungsfreien Betrieb an, garantiert aber keinen störungs- und fehlerfreien Dienst. Geplante Wartungen werden nach Möglichkeit vorher angekündigt.",
            "SalonGo haftet nicht für entgangenen Gewinn, Umsatzausfall, mittelbare und Folgeschäden, Schäden durch falsche Eingaben des Kunden, Internetausfälle, Geräte des Kunden oder Dienste Dritter (Zahlungsanbieter, Netzbetreiber, App-Stores) oder Ereignisse außerhalb seiner Kontrolle.",
            "Die Gesamthaftung von SalonGo aus diesem Vertrag ist auf den Betrag begrenzt, den der Kunde SalonGo in den 12 Monaten vor dem Ereignis gezahlt hat, höchstens jedoch 10 000 CZK.",
            "Diese Beschränkungen gelten nicht für vorsätzlich oder grob fahrlässig verursachte Schäden, für Verletzungen natürlicher Persönlichkeitsrechte und in anderen Fällen, in denen das Gesetz keine Beschränkung zulässt (§ 2898 tschechisches Bürgerliches Gesetzbuch).",
            "Der Kunde stellt SalonGo von Schäden und Kosten aus Ansprüchen Dritter (z. B. Kunden oder Mitarbeiter des Salons) frei, die aus Rechts- oder Bedingungsverstößen des Kunden entstehen.",
          ],
        },
        {
          heading: "16. Änderung der Bedingungen",
          body: [
            "SalonGo kann diese Bedingungen in angemessenem Umfang ändern, insbesondere wegen Gesetzesänderungen, Erweiterung des Dienstes, Sicherheit oder Geschäftspolitik.",
            "SalonGo teilt Änderungen mindestens 30 Tage vor Inkrafttreten per E-Mail oder in der App mit. Der Kunde kann die Änderung ablehnen und den Vertrag zum Zeitpunkt des Inkrafttretens kündigen; dann wird der anteilige Betrag des bezahlten Zeitraums erstattet. Lehnt er nicht ab, gilt die Änderung als angenommen.",
            "Änderungen ausschließlich zugunsten des Kunden oder aufgrund gesetzlicher Vorgaben können früher wirksam werden.",
          ],
        },
        {
          heading: "17. Kunden der Salons (Online-Buchung)",
          body: [
            "Kunden der Salons können kostenlos buchen und ein Buchungskonto anlegen. Der Vertrag über die Salonleistung (z. B. Maniküre, Haarschnitt) besteht zwischen Kunde und Salon; SalonGo ist nicht Vertragspartei und haftet nicht für Qualität, Preise oder Stornobedingungen des Salons.",
            "Kunden können ihr Konto jederzeit löschen. SalonGo kann missbräuchlich genutzte Konten (z. B. Scheinbuchungen) löschen.",
            "Verbraucher können die außergerichtliche Streitbeilegung bei der Tschechischen Handelsinspektion (www.coi.cz) nutzen; der Rechtsweg bleibt unberührt.",
          ],
        },
        {
          heading: "18. Schlussbestimmungen",
          body: [
            "Es gilt das Recht der Tschechischen Republik, insbesondere das Gesetz Nr. 89/2012 Slg., Bürgerliches Gesetzbuch.",
            "Für Streitigkeiten zwischen SalonGo und dem Kunden ist das zuständige Gericht am Geschäftssitz des Betreibers zuständig.",
            "Die Parteien übernehmen die Gefahr veränderter Umstände (§ 1765 Abs. 2 BGB-CZ). Zwischen Unternehmern finden §§ 1799 und 1800 BGB-CZ über Formularverträge keine Anwendung.",
            "Die Verjährungsfrist für Ansprüche des Kunden gegen SalonGo beträgt 1 Jahr, soweit gesetzlich nichts anderes bestimmt ist.",
            "Die Kommunikation erfolgt elektronisch (E-Mail, App). Ist eine Bestimmung unwirksam, bleiben die übrigen wirksam.",
          ],
        },
      ],
    },

    privacy: {
      title: "Datenschutzerklärung",
      description:
        "Wie SalonGo personenbezogene Daten von Website-Besuchern, Salons, deren Mitarbeitern und Kunden verarbeitet: Zwecke, Rechtsgrundlagen, Speicherdauer, Empfänger und Ihre Rechte nach DSGVO.",
      sections: [
        {
          heading: "1. Verantwortlicher",
          body: [
            "Verantwortlicher ist der im Kasten oben genannte Betreiber. Für Datenschutzanliegen kontaktieren Sie {email} mit dem Betreff „GDPR“.",
            "Ein Datenschutzbeauftragter ist nicht bestellt, da dies für uns gesetzlich nicht vorgeschrieben ist.",
          ],
        },
        {
          heading: "2. Wann wir Verantwortlicher und wann Auftragsverarbeiter sind",
          body: [
            "Wir sind Verantwortlicher für Website-Besucher, für Nutzer von Salonkonten (Inhaber und Mitarbeiter) hinsichtlich Kontoverwaltung und Abrechnung sowie für Kunden, die ein Buchungskonto anlegen.",
            "Daten, die ein Salon über seine Kunden und Mitarbeiter eingibt (Namen, Telefonnummern, Buchungen, Notizen, Löhne), verarbeiten wir im Auftrag des Salons. Verantwortlich ist der Salon. Wenden Sie sich mit Fragen zu diesen Daten bitte zuerst an Ihren Salon; dessen Anfragen bearbeiten wir nach dem Auftragsverarbeitungsvertrag (DPA).",
          ],
        },
        {
          heading: "3. Welche Daten, wozu und wie lange",
          body: [
            "Besucher von {site}:",
            "- Server-Logs (IP-Adresse, Browser, Zeit, aufgerufene Seite) – Sicherheit und Betrieb der Website – berechtigtes Interesse – höchstens 30 Tage,",
            "- Sprach-Cookie – siehe Cookie-Richtlinie.",
            "Wenn Sie uns kontaktieren (E-Mail, Telefon, WhatsApp, Facebook, Instagram):",
            "- Name, Kontaktdaten, Nachricht – Beantwortung und vorvertragliche Gespräche – berechtigtes Interesse und vorvertragliche Maßnahmen – 3 Jahre ab letztem Kontakt.",
            "Salonkonten (Inhaber und Mitarbeiter):",
            "- Name, E-Mail, Telefon, Name und Adresse des Salons, IČO, Rolle und Zugangsdaten (Passwörter nur gehasht) – Bereitstellung des Dienstes – Vertragserfüllung – für die Dauer des Kontos plus 30 Tage,",
            "- Tarif, Zahlungen, Belege – Vertrag und gesetzliche Buchhaltungs- und Steuerpflichten – 10 Jahre,",
            "- Service-E-Mails und Hinweise (Kontobestätigung, Ende des Testzeitraums, Änderungen der Bedingungen) – Vertragserfüllung,",
            "- Neuigkeiten über SalonGo und ähnliche Leistungen an die E-Mail von Kunden – berechtigtes Interesse nach § 7 Abs. 3 Gesetz Nr. 480/2004 Slg. – bis zur Abmeldung über den Link in jeder E-Mail oder an {email},",
            "- Supportanfragen – Bearbeitung – berechtigtes Interesse – 3 Jahre.",
            "Kunden von Salons mit Buchungskonto:",
            "- Name, E-Mail, Telefon, Buchungen und Mitgliedschaften bei Salons – Konto- und Buchungsverwaltung – Vertragserfüllung – bis zur Löschung des Kontos; die Buchungen selbst speichert der Salon als Verantwortlicher.",
            "Apps und Sicherheit:",
            "- Gerätekennung für Push-Mitteilungen, App-Version, Fehlerberichte, Sicherheitsprotokolle – Betrieb, Sicherheit und Fehlerbehebung – berechtigtes Interesse und Vertragserfüllung – Protokolle höchstens 90 Tage, länger nur bei Vorfällen.",
            "Konto- und Zahlungsdaten sind für den Vertragsschluss erforderlich; ohne sie können wir den Dienst nicht erbringen. Alle anderen Angaben sind freiwillig.",
          ],
        },
        {
          heading: "4. Empfänger",
          body: [
            "Wir verkaufen und vermieten keine Daten. Wir geben sie nur soweit nötig an folgende Dienstleister weiter, die sie für uns verarbeiten:",
            "Website {site}:",
            "- Vercel Inc. (USA) – Hosting der Website, Server in der EU (Region Frankfurt),",
            "- GitHub Inc. (USA) – Download der Desktop-App (der Download-Button leitet zu GitHub weiter).",
            "Die Website selbst versendet keine E-Mails, nimmt keine Zahlungen entgegen und hat keine eigene Datenbank.",
            "SalonGo-App ({app}, Mobil- und Desktop-App): Es gilt die Datenschutzerklärung der App unter {app}/legal/privacy mit der aktuellen Liste der Auftragsverarbeiter (z. B. Vercel Inc. – Hosting, Stripe Payments Europe Ltd. – Kartenzahlungen, die nur in der App erfolgen, Resend – E-Mail-Versand).",
            "Außerdem Buchhalter, Steuerberater, Rechtsanwälte und Behörden, soweit gesetzlich vorgeschrieben.",
            "Wenn Sie uns über WhatsApp, Facebook oder Instagram kontaktieren, ist Meta nach eigenen Bedingungen eigenständiger Verantwortlicher.",
          ],
        },
        {
          heading: "5. Übermittlung außerhalb der EU",
          body: [
            "Einige Dienstleister haben ihren Sitz in den USA. Die Übermittlung erfolgt auf Grundlage des Angemessenheitsbeschlusses der EU-Kommission (EU-US Data Privacy Framework), sofern der Dienstleister zertifiziert ist, sonst auf Grundlage der EU-Standardvertragsklauseln.",
          ],
        },
        {
          heading: "6. Ihre Rechte",
          body: [
            "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen, einschließlich Widerspruch gegen Neuigkeiten-E-Mails (dem wir immer folgen). Eine Einwilligung können Sie jederzeit widerrufen.",
            "Anfragen an {email}. Wir antworten innerhalb eines Monats; in komplexen Fällen kann die Frist um 2 Monate verlängert werden, worüber wir Sie informieren. Wir können Ihre Identität prüfen.",
            "Sie können sich beim tschechischen Amt für den Schutz personenbezogener Daten (ÚOOÚ), Pplk. Sochora 27, 170 00 Prag 7, www.uoou.gov.cz, oder bei der Behörde des EU-Staates, in dem Sie leben oder arbeiten, beschweren.",
          ],
        },
        {
          heading: "7. Sicherheit",
          body: [
            "Wir nutzen verschlüsselte Verbindungen (HTTPS), gehashte Passwörter, Trennung der Daten einzelner Salons, rollenbasierte Zugriffe und Sicherungen. Zugriff haben nur Personen, die ihn benötigen und zur Vertraulichkeit verpflichtet sind.",
            "Datenschutzverletzungen behandeln wir nach Art. 33 und 34 DSGVO.",
          ],
        },
        {
          heading: "8. Weitere Informationen",
          body: [
            "Wir nutzen keine automatisierten Entscheidungen oder Profiling mit Rechtswirkung.",
            "Der Dienst ist nicht für Personen unter 15 Jahren bestimmt.",
            "Wir können diese Erklärung aktualisieren. Die aktuelle Fassung steht immer unter {site}/de/privacy; Kontonutzer informieren wir über wesentliche Änderungen per E-Mail oder in der App.",
          ],
        },
      ],
    },

    cookies: {
      title: "Cookie-Richtlinie",
      description: "Welche Cookies und ähnlichen Technologien Website und App von SalonGo verwenden. Wir nutzen keine Werbe- oder Analyse-Cookies.",
      sections: [
        {
          heading: "1. Was Cookies sind",
          body: ["Cookies sind kleine Dateien, die eine Website in Ihrem Browser speichert. Der lokale Speicher des Browsers (Local Storage) funktioniert ähnlich."],
        },
        {
          heading: "2. Was wir auf {site} verwenden",
          body: [
            "- NEXT_LOCALE – merkt sich die gewählte Sprache – notwendig – bis zum Schließen des Browsers oder höchstens 1 Jahr.",
            "Die Website verwendet keine Analyse-, Werbe- oder Tracking-Cookies und lädt keine Inhalte Dritter, die Cookies setzen. Daher fragen wir nicht nach Einwilligung: Notwendige Cookies dürfen nach § 89 Abs. 3 Gesetz Nr. 127/2005 Slg. ohne Einwilligung verwendet werden.",
            "Links zu Facebook, Instagram und WhatsApp sind einfache Links. Deren Cookies werden erst beim Öffnen und nach deren Regeln gesetzt.",
          ],
        },
        {
          heading: "3. Was wir in der App {app} verwenden",
          body: [
            "- Anmelde- und Sicherheits-Cookies (Sitzung, CSRF-Schutz) – notwendig – während der Anmeldung,",
            "- lokaler Speicher für Sprache, Darstellung und Anzeigeeinstellungen – notwendig für die von Ihnen gewünschte Funktion.",
          ],
        },
        {
          heading: "4. Änderungen",
          body: [
            "Führen wir Analyse- oder Marketing-Cookies ein, aktivieren wir sie nur mit Ihrer vorherigen Einwilligung über ein Banner, in dem „Ablehnen“ so einfach ist wie „Akzeptieren“, und aktualisieren diese Richtlinie.",
            "Sie können Cookies in den Browsereinstellungen löschen oder blockieren. Ohne notwendige Cookies funktioniert die Anmeldung möglicherweise nicht.",
          ],
        },
      ],
    },

    dpa: {
      title: "Auftragsverarbeitungsvertrag (DPA)",
      description:
        "Vertrag nach Art. 28 DSGVO zwischen Salon (Verantwortlicher) und SalonGo (Auftragsverarbeiter): Umfang, Pflichten, Unterauftragsverarbeiter, Datenpannen und Löschung.",
      sections: [
        {
          heading: "1. Parteien und Abschluss",
          body: [
            "Dieser Auftragsverarbeitungsvertrag (der „DPA“) wird zwischen dem Salon als Verantwortlichem und dem Betreiber von SalonGo als Auftragsverarbeiter nach Art. 28 Verordnung (EU) 2016/679 (DSGVO) geschlossen.",
            "Der DPA ist Bestandteil der AGB und wird mit der Registrierung des Salons geschlossen. Er gilt für die Dauer der Nutzung und bis zur Löschung der Daten nach Abschnitt 10.",
          ],
        },
        {
          heading: "2. Gegenstand, Art und Zweck",
          body: [
            "Der Auftragsverarbeiter speichert und verarbeitet die vom Salon eingegebenen personenbezogenen Daten zur Erbringung des Dienstes: Kalender und Buchungen, Kundenverwaltung, Kasse und Belege, Lohnberechnung, Berichte, Erinnerungen und Nachrichten an Kunden auf Weisung des Salons, Sicherungen und Support.",
          ],
        },
        {
          heading: "3. Kategorien betroffener Personen und Daten",
          body: [
            "Betroffene: Kunden, Mitarbeiter und freie Mitarbeiter des Salons.",
            "Daten: Name, Telefon, E-Mail, Geburtsdatum, Buchungs- und Leistungshistorie, Zahlungen und Belege, Notizen, Fotos, Treuedaten; bei Mitarbeitern zudem Rolle, Umsatz, Provision, Lohn und Trinkgeld.",
            "Besondere Kategorien (z. B. Gesundheitsdaten wie Allergien) nur, wenn der Salon sie eingibt. Der Salon ist für eine Rechtsgrundlage nach Art. 9 DSGVO verantwortlich.",
          ],
        },
        {
          heading: "4. Weisungen",
          body: [
            "Der Auftragsverarbeiter verarbeitet Daten nur auf dokumentierte Weisung des Salons: dieser DPA, die AGB sowie die Einstellungen und Aktionen des Salons im Dienst.",
            "Hält der Auftragsverarbeiter eine Weisung für rechtswidrig, informiert er den Salon.",
            "Der Auftragsverarbeiter nutzt die Daten nicht für eigene Zwecke, darf aber anonymisierte, aggregierte Statistiken erstellen, die keine personenbezogenen Daten sind.",
          ],
        },
        {
          heading: "5. Vertraulichkeit und Sicherheit",
          body: [
            "Zur Verarbeitung befugte Personen sind zur Vertraulichkeit verpflichtet.",
            "Der Auftragsverarbeiter trifft technische und organisatorische Maßnahmen nach Art. 32 DSGVO, insbesondere: verschlüsselte Übertragung (HTTPS/TLS), gehashte Passwörter, logische Trennung der Salondaten, rollenbasierte Zugriffe, minimaler Betreiberzugriff, regelmäßige Sicherungen, Zugriffsprotokolle und regelmäßige Software-Updates.",
          ],
        },
        {
          heading: "6. Unterauftragsverarbeiter",
          body: [
            "Der Salon erteilt eine allgemeine Genehmigung für Unterauftragsverarbeiter. Aktuelle Liste:",
            "- Vercel Inc. (USA) – Hosting,",
            "- Neon Inc. – Datenbank (AWS, Frankfurt),",
            "- Resend (Plus Five Five Inc.) – E-Mails an Kunden und Nutzer,",
            "- Google Ireland Ltd. / Firebase Cloud Messaging – Push-Mitteilungen,",
            "- Functional Software Inc. (Sentry) – Fehlerberichte,",
            "- Stripe Payments Europe Ltd. – Zahlungen (falls der Salon Zahlungen über den Dienst nutzt).",
            "Die aktuelle Liste der Auftragsverarbeiter der App steht auch in der Datenschutzerklärung der App: {app}/legal/privacy.",
            "Über die Hinzunahme oder den Austausch eines Unterauftragsverarbeiters informiert der Auftragsverarbeiter mindestens 14 Tage vorher per E-Mail oder in der App. Der Salon kann aus berechtigten Gründen widersprechen; kommt keine Einigung zustande, kann der Salon kündigen und erhält den anteiligen Betrag des bezahlten Zeitraums.",
            "Der Auftragsverarbeiter verpflichtet Unterauftragsverarbeiter zu gleichwertigem Datenschutz und haftet für deren Einhaltung.",
            "Übermittlungen außerhalb der EU erfolgen nur auf Grundlage eines Angemessenheitsbeschlusses (z. B. EU-US Data Privacy Framework) oder von Standardvertragsklauseln.",
          ],
        },
        {
          heading: "7. Unterstützung bei Betroffenenrechten",
          body: [
            "Der Dienst ermöglicht dem Salon, Daten zu suchen, zu berichtigen, zu exportieren und zu löschen. Kann der Salon eine Anfrage nicht selbst erledigen, unterstützt der Auftragsverarbeiter auf Anfrage in angemessenem Umfang.",
            "Erhält der Auftragsverarbeiter eine Anfrage direkt, leitet er sie an den Salon weiter und bearbeitet sie nicht selbst, sofern der Salon ihn nicht beauftragt.",
          ],
        },
        {
          heading: "8. Datenschutzverletzungen",
          body: [
            "Der Auftragsverarbeiter meldet dem Salon eine Verletzung des Schutzes personenbezogener Daten unverzüglich, spätestens 48 Stunden nach Kenntnis, mit den verfügbaren Informationen nach Art. 33 Abs. 3 DSGVO, damit der Salon seiner Meldepflicht nachkommen kann.",
          ],
        },
        {
          heading: "9. Weitere Unterstützung und Kontrollen",
          body: [
            "Der Auftragsverarbeiter unterstützt den Salon angemessen bei Datenschutz-Folgenabschätzungen (DSFA) und vorherigen Konsultationen der Aufsichtsbehörde.",
            "Der Auftragsverarbeiter stellt die zum Nachweis der Einhaltung erforderlichen Informationen bereit. Kontrollen (Audits) sind mit 30 Tagen schriftlicher Vorankündigung, höchstens einmal jährlich, zu Geschäftszeiten, ohne Betriebsstörung und ohne Zugriff auf Daten anderer Salons möglich; die Kosten trägt der Salon, sofern keine wesentliche Verletzung festgestellt wird.",
          ],
        },
        {
          heading: "10. Vertragsende: Rückgabe und Löschung",
          body: [
            "Nach Vertragsende kann der Salon seine Daten innerhalb von 30 Tagen exportieren oder in einem gängigen maschinenlesbaren Format anfordern. Danach löscht der Auftragsverarbeiter die Daten; Sicherungen werden spätestens innerhalb weiterer 90 Tage bereinigt, sofern keine gesetzliche Aufbewahrungspflicht besteht.",
          ],
        },
        {
          heading: "11. Haftung und anwendbares Recht",
          body: [
            "Die Haftung richtet sich nach Art. 82 DSGVO und den AGB.",
            "Dieser DPA unterliegt tschechischem Recht. Bei Widersprüchen zu den AGB in Datenschutzfragen hat dieser DPA Vorrang.",
          ],
        },
      ],
    },

    websiteTerms: {
      title: "Bedingungen für die Website-Erstellung",
      description:
        "Bedingungen des Website-Angebots für SalonGo-Kunden ({price}, bis zu {pages} Seiten): Umfang, Zahlung, Fristen, Korrekturen, Abnahme, Rechte und Hosting.",
      sections: [
        {
          heading: "1. Geltungsbereich",
          body: [
            "Diese Bedingungen regeln den Werkvertrag zwischen dem Betreiber von SalonGo (Auftragnehmer) und einem Salon (Auftraggeber) über die Erstellung der Salon-Website. Ergänzend gelten die AGB von SalonGo.",
            "Das Angebot richtet sich an Unternehmer, die bei Bestellung ein aktives SalonGo-Konto (bezahlter Tarif oder Testzeitraum) haben.",
          ],
        },
        {
          heading: "2. Bestellung",
          body: [
            "Bestellungen sind per Telefon, E-Mail, Facebook, Instagram oder WhatsApp möglich.",
            "Der Vertrag kommt zustande, wenn SalonGo die Bestellung mit gewählter Vorlage, Umfang und Preis schriftlich (E-Mail oder Nachricht) bestätigt.",
          ],
        },
        {
          heading: "3. Leistungsumfang",
          body: [
            "Im Preis enthalten:",
            "- eine Website mit bis zu {pages} Seiten (z. B. Start, Leistungen & Preise, Über uns, Galerie, Kontakt) nach gewählter Vorlage oder eigener Idee des Auftraggebers,",
            "- Einbau der vom Auftraggeber gelieferten Texte, Fotos, Farben und Salondaten,",
            "- Darstellung auf Computer und Smartphone,",
            "- ein Button zur SalonGo-Online-Buchung, sofern aktiviert,",
            "- zwei Korrekturrunden nach Lieferung des Entwurfs.",
            "Nicht enthalten: Texterstellung und Übersetzung über kleine Anpassungen hinaus, Fotografie oder Bildkauf, Domain, Hosting, Onlineshop, Anbindung anderer Systeme, garantierte Suchmaschinenplatzierungen und spätere laufende Änderungen. Diese können gesondert vereinbart werden.",
          ],
        },
        {
          heading: "4. Preis und Zahlung",
          body: [
            "Der Preis beträgt einmalig {price} für die Erstellung der Website. Es handelt sich um einen Endpreis.",
            "Der Preis ist nach Bestätigung der Bestellung im Voraus zu zahlen, wie in der Bestätigung angegeben. Die Arbeit beginnt nach Zahlungseingang und Erhalt aller Unterlagen.",
            "Domain und Hosting bietet SalonGo gesondert zum Preis eines individuellen Angebots an.",
          ],
        },
        {
          heading: "5. Unterlagen und Fristen",
          body: [
            "Der Auftraggeber liefert Name, Kontaktdaten, Leistungen und Preise, Texte, Logo und Fotos und ist für deren Richtigkeit und die Nutzungsrechte verantwortlich (Urheberrecht, Marken, Einwilligung abgebildeter Personen).",
            "SalonGo liefert den Entwurf in der Regel innerhalb von 14 Werktagen nach Zahlung und Erhalt aller Unterlagen. Die Frist verlängert sich um die Zeit, in der der Auftraggeber Unterlagen oder Rückmeldungen schuldig bleibt.",
            "Liefert der Auftraggeber trotz Erinnerung binnen 60 Tagen nach Bestellung keine Unterlagen, kann SalonGo den Vertrag beenden; der Preis wird abzüglich geleisteter Arbeit erstattet, höchstens 50 % des Preises werden einbehalten.",
            "SalonGo kann die Veröffentlichung rechtswidriger oder rechtsverletzender Inhalte ablehnen.",
          ],
        },
        {
          heading: "6. Korrekturen und Abnahme",
          body: [
            "Der Auftraggeber sendet seine Anmerkungen je Korrekturrunde gesammelt. Weitere Runden oder Änderungen nach Freigabe werden nach Vereinbarung berechnet.",
            "Das Werk gilt mit Zusendung des Links zur fertigen Website als geliefert. Meldet der Auftraggeber binnen 7 Tagen keine konkreten Mängel schriftlich, gilt das Werk als vorbehaltlos abgenommen. Geringfügige Mängel, die die Nutzung nicht hindern, berechtigen nicht zur Verweigerung der Abnahme; SalonGo behebt sie in angemessener Frist.",
          ],
        },
        {
          heading: "7. Gewährleistung und Haftung",
          body: [
            "Fehler der Website (z. B. defekte Links, Darstellungsfehler), die innerhalb von 30 Tagen nach Lieferung gemeldet werden, behebt SalonGo kostenlos.",
            "SalonGo haftet nicht für vom Auftraggeber gelieferte Inhalte, Suchmaschinenplatzierungen, Umsätze des Salons oder Ausfälle fremder Domains und Hostings.",
            "Die Gesamthaftung von SalonGo aus diesem Vertrag ist auf den gezahlten Preis begrenzt. Dies gilt nicht für vorsätzlich oder grob fahrlässig verursachte Schäden.",
            "Der Auftraggeber stellt SalonGo von Ansprüchen Dritter im Zusammenhang mit den gelieferten Unterlagen frei.",
          ],
        },
        {
          heading: "8. Rechte an der Website",
          body: [
            "Nach vollständiger Zahlung erhält der Auftraggeber eine nicht ausschließliche, zeitlich unbegrenzte Lizenz zur Nutzung der fertigen Website zur Werbung für seinen Salon, einschließlich der von ihm gelieferten Texte und Fotos.",
            "Vorlagen, Design, Quellcode und allgemeine Elemente bleiben Eigentum von SalonGo; der Auftraggeber darf sie nicht weiterverkaufen oder für andere Websites nutzen. Die Übergabe des Quellcodes kann gesondert gegen Entgelt vereinbart werden.",
            "SalonGo darf die Website als Referenz und Beispiel zeigen. Der Auftraggeber kann dem jederzeit per E-Mail widersprechen.",
          ],
        },
        {
          heading: "9. Rücktritt vor Fertigstellung",
          body: [
            "Vor Arbeitsbeginn kann der Auftraggeber stornieren und erhält den vollen Preis zurück.",
            "Nach Arbeitsbeginn wird der Preis abzüglich des Werts der geleisteten Arbeit erstattet. Nach Lieferung erfolgt keine Erstattung.",
          ],
        },
        {
          heading: "10. Rechtliche Angaben auf der Salon-Website",
          body: [
            "Als Betreiber der Website ist der Salon für deren rechtliche Angaben verantwortlich, insbesondere Unternehmensdaten (Name, IČO, Sitz), Datenschutz- und Cookie-Hinweise. SalonGo fügt die vom Auftraggeber gelieferten Texte und Angaben ein.",
            "Beendet der Salon die Nutzung von SalonGo, funktioniert der Online-Buchungsbutton nicht mehr. Die Website verbleibt beim Auftraggeber; hostet SalonGo sie, gilt für das Hosting eine gesonderte Vereinbarung.",
          ],
        },
        {
          heading: "11. Schlussbestimmungen",
          body: [
            "Es gilt tschechisches Recht, insbesondere §§ 2586 ff. des Bürgerlichen Gesetzbuchs. Im Übrigen gelten die AGB von SalonGo.",
          ],
        },
      ],
    },
  },
};
