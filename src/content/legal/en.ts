import type { LegalPack } from "./types";

/** SalonGo legal documents – English translation (the Czech version prevails). */
export const en: LegalPack = {
  ui: {
    operator: "Operator",
    operatorName: "Name",
    legalForm: "Sole trader under the Czech Trade Licensing Act (OSVČ), registered in the Trade Register.",
    ico: "Company ID (IČO)",
    address: "Place of business",
    vatId: "VAT ID",
    notVatPayer: "Not registered for VAT",
    email: "Email",
    phone: "Phone",
    effective: "Effective from",
    otherDocs: "Other documents",
    prevailing: "This is a translation. In case of any difference, the Czech version prevails.",
    readCzech: "Read the Czech version",
  },
  docs: {
    terms: {
      title: "Terms of Service",
      description:
        "SalonGo Terms of Service: who the service is for, free trial, prices, payments, renewal, cancellation, liability and reporting illegal content.",
      sections: [
        {
          heading: "1. General",
          body: [
            "These terms (the \"Terms\") govern the use of the SalonGo software: the web app {app}, the mobile and desktop apps and the website {site} (the \"Service\").",
            "The Service is operated by {operator}, as shown in the Operator box above (the \"Operator\" or \"SalonGo\").",
            "The contract also includes the Data Processing Agreement (DPA), the Privacy Policy and the current price list shown in the app. Website orders are governed by the separate Website Service Terms.",
            "The single point of contact for users and public authorities under Articles 11 and 12 of Regulation (EU) 2022/2065 (DSA) is {email}. We communicate in Czech, Vietnamese and English.",
          ],
        },
        {
          heading: "2. Who the Service is for",
          body: [
            "The Service is intended exclusively for businesses: salon operators (sole traders or companies) using it in the course of their business (the \"Salon\" or \"Customer\").",
            "By registering, the Customer confirms that it acts as a business and is authorised to act for the Salon. Consumer protection rules, including the 14-day right of withdrawal, therefore do not apply to the contract with the Salon.",
            "The salon owner may create accounts for staff. The Salon is responsible for its staff's actions in the Service.",
            "Salon clients may use online booking and a booking account free of charge; section 17 applies to them.",
          ],
        },
        {
          heading: "3. Conclusion of the contract",
          body: [
            "The contract is concluded when registration in the app is completed. It is concluded for an indefinite period; each paid period is one month or one year.",
            "The contract is concluded in Czech. Translations are for information; the Czech version prevails in case of difference.",
            "The Terms in force on the date of conclusion remain available at {site}/cs/terms and can be saved or printed.",
          ],
        },
        {
          heading: "4. The Service and its development",
          body: [
            "The Service includes calendar and online booking, client and service records, checkout and receipts, payroll and tips calculation, revenue reports, branch management and client reminders. The current scope is described on the website and in the app.",
            "The Service is provided \"as is\" and \"as available\". SalonGo continuously develops the Service and may change, replace or remove features, provided this does not materially reduce the main functions the Customer pays for.",
            "Features marked beta or experimental may be changed or discontinued at any time.",
            "The Service is a software tool. Payroll, revenue and receipt calculations rely on data entered by the Salon; the Salon is responsible for checking them and for its own tax, accounting and employment obligations.",
          ],
        },
        {
          heading: "5. Free trial",
          body: [
            "Each new salon and each new branch receives a free trial of the length stated on the website on the date of registration (currently 150 days) with all features and no card required.",
            "After the trial, a paid plan is required for further use. Without payment, SalonGo may restrict access to features; data is kept as described in section 14.",
            "SalonGo may change the length and conditions of the trial for new registrations at any time. This does not shorten a trial already running.",
          ],
        },
        {
          heading: "6. Prices and payment",
          body: [
            "Plan prices are listed on the website and in the app. The price shown in the app at the time of payment applies. Prices shown are final prices.",
            "Plans are paid in advance for the chosen period (month or year), by card via Stripe or by another method the app offers the Salon (e.g. bank transfer).",
            "Card details are processed only by Stripe; SalonGo does not store them.",
            "Payment receipts are issued electronically and are available in the app or sent by email.",
            "The paid period starts when the payment is received. For bank transfers, payment is made when it is credited to SalonGo's account.",
          ],
        },
        {
          heading: "7. Automatic renewal and price changes",
          body: [
            "If the Customer paid by card with automatic renewal, the plan renews for the same period at the end of each period and is charged to the same card. Renewal can be cancelled in the app at any time, effective from the next period.",
            "SalonGo may change prices. It will notify the Customer by email or in the app at least 30 days in advance. The new price applies only from the next paid period. If the Customer disagrees, it may cancel renewal; otherwise the new price applies.",
            "If payment is overdue, SalonGo may, after a reminder and 7 days, restrict access until payment is made, and is entitled to statutory default interest.",
          ],
        },
        {
          heading: "8. Cancellation and refunds",
          body: [
            "The Customer may cancel its plan at any time. The Service remains available until the end of the paid period.",
            "Paid periods are not refunded or prorated, including when the Service is not used, cancelled early or downgraded.",
            "SalonGo will refund or extend the plan accordingly in these cases:",
            "- duplicate or mistaken charge,",
            "- incorrectly charged amount,",
            "- the Service was unavailable for more than 7 consecutive days for reasons attributable to SalonGo; the proportional part for the outage is refunded.",
            "Requests must be sent to {email} within 30 days of the payment or event, stating the Salon, date and proof of payment. Approved refunds are made to the original payment method, usually within 14 days.",
            "If the Customer files a chargeback without contacting SalonGo first, SalonGo may suspend access until the dispute is resolved.",
          ],
        },
        {
          heading: "9. Account and security",
          body: [
            "The Customer provides accurate information, protects its login details and reports misuse without delay.",
            "The salon owner is responsible for granting and revoking staff access.",
            "SalonGo is not liable for damage caused by password sharing, insufficient security of the Customer's devices or acts of persons the Customer gave access to.",
          ],
        },
        {
          heading: "10. Prohibited use",
          body: [
            "The Customer must not use the Service in particular to:",
            "- break the law or infringe the rights of others,",
            "- send marketing messages without the recipients' consent,",
            "- upload illegal or copyright-infringing content,",
            "- attack the Service, scan for vulnerabilities, bypass limits or bulk-download data by automated means,",
            "- reverse engineer, copy or build a competing product from the Service,",
            "- resell or provide the Service to third parties without SalonGo's consent.",
          ],
        },
        {
          heading: "11. User content and notices (DSA)",
          body: [
            "SalonGo stores content that Salons put into the Service (names, photos, service descriptions, public booking pages). The Salon is responsible for that content.",
            "SalonGo does not review content in advance, but may remove or disable content, or suspend a feature or account, once it learns that content is illegal or breaches these Terms. Such decisions are made by a person, not an automated system.",
            "Anyone may report illegal content to {email} with the subject \"Content notice\". The notice should include: the URL of the content, why it is illegal, the reporter's name and email, and a statement that the information is accurate to the best of their knowledge.",
            "SalonGo handles notices without undue delay and informs the reporter of the outcome. If content is restricted, SalonGo gives the Salon a statement of reasons (Article 17 DSA). Decisions can be contested at the same email, without prejudice to the right to go to court.",
          ],
        },
        {
          heading: "12. Salon data",
          body: [
            "Data the Salon enters into the Service (clients, bookings, services, staff, receipts) belongs to the Salon. SalonGo processes it as a processor under the Data Processing Agreement (DPA), which forms part of this contract.",
            "The Salon is the controller of its clients' and staff's personal data. It is responsible for having a legal basis, informing clients, and sending marketing (SMS, email) only with consent or under Section 7 of Act No. 480/2004 Coll.",
            "Do not enter unnecessary data in notes. Enter health data (e.g. allergies) only when necessary for the service and with the client's consent.",
            "The Salon can export its data at any time. SalonGo recommends regular backups of important data.",
            "SalonGo may use anonymised, aggregated data that cannot identify the Salon or any person to improve the Service and for statistics.",
          ],
        },
        {
          heading: "13. Intellectual property",
          body: [
            "The software, design, texts, logos, templates and other parts of the Service are protected by intellectual property law and belong to SalonGo or its licensors.",
            "For the term of the contract, the Customer receives a non-exclusive, non-transferable, worldwide licence to use the Service for its Salon.",
            "SalonGo may freely use feedback about the Service without compensation.",
            "SalonGo may list the Salon's name as a reference. The Customer may object at any time by email and SalonGo will remove it.",
          ],
        },
        {
          heading: "14. Termination and data after termination",
          body: [
            "The Customer may terminate the contract at any time by cancelling the plan and deleting the account in the app, or by email.",
            "SalonGo may terminate the contract without giving reasons with 30 days' notice, in which case it refunds the proportional part of the paid period.",
            "SalonGo may terminate the contract or suspend access with immediate effect if the Customer materially breaches the Terms (especially section 10), fails to pay after a reminder, or if required by law or a public authority.",
            "After termination, or after 90 days without a paid plan, the Customer may request a data export within 30 days. SalonGo then deletes the data; backups are cleared within a further 90 days at the latest. Records that must be kept by law are kept for the statutory period.",
          ],
        },
        {
          heading: "15. Availability and liability",
          body: [
            "SalonGo aims for continuous operation but does not guarantee the Service will be uninterrupted or error-free. Planned maintenance is announced in advance where possible.",
            "SalonGo is not liable for lost profit, lost revenue, indirect or consequential damage, damage caused by incorrect data entered by the Customer, internet outages, the Customer's devices or third-party services (payment gateway, carriers, app stores), or events beyond its control.",
            "SalonGo's total liability under this contract is limited to the amount the Customer paid SalonGo in the 12 months before the event, and in any case to no more than CZK 10,000.",
            "These limitations do not apply to damage caused intentionally or by gross negligence, harm to a person's natural rights, or other cases where the law does not allow limitation (Section 2898 of the Czech Civil Code).",
            "The Customer will indemnify SalonGo for damage and costs arising from third-party claims (e.g. the Salon's clients or staff) resulting from the Customer's breach of law or these Terms.",
          ],
        },
        {
          heading: "16. Changes to the Terms",
          body: [
            "SalonGo may reasonably change these Terms, in particular due to changes in law, extension of the Service, security or business policy.",
            "SalonGo will notify the Customer by email or in the app at least 30 days before the change takes effect. The Customer may reject the change and terminate the contract effective on that date, receiving a refund of the proportional part of the paid period. If the Customer does not reject it, the change is deemed accepted.",
            "Changes solely in the Customer's favour or required by law may take effect earlier.",
          ],
        },
        {
          heading: "17. Salon clients (online booking)",
          body: [
            "Salon clients may book and create a booking account free of charge. The contract for the salon service (e.g. manicure, haircut) is between the client and the Salon; SalonGo is not a party and is not responsible for the Salon's quality, prices or cancellation rules.",
            "Clients may delete their account at any time. SalonGo may delete accounts that are misused (e.g. fake bookings).",
            "Clients who are consumers may use out-of-court dispute resolution at the Czech Trade Inspection Authority (www.coi.cz), without prejudice to the right to go to court.",
          ],
        },
        {
          heading: "18. Final provisions",
          body: [
            "The contract is governed by the law of the Czech Republic, in particular Act No. 89/2012 Coll., the Civil Code.",
            "Disputes between SalonGo and the Customer are decided by the competent court at the Operator's place of business.",
            "The parties assume the risk of a change in circumstances (Section 1765(2) of the Civil Code). Between businesses, Sections 1799 and 1800 of the Civil Code on adhesion contracts do not apply.",
            "The limitation period for the Customer's claims against SalonGo is 1 year, unless the law provides otherwise.",
            "Communication is electronic (email, app). If any provision is invalid, the others remain in force.",
          ],
        },
      ],
    },

    privacy: {
      title: "Privacy Policy",
      description:
        "How SalonGo processes personal data of website visitors, salons, their staff and clients: purposes, legal bases, retention, recipients and your GDPR rights.",
      sections: [
        {
          heading: "1. Who the controller is",
          body: [
            "The controller is the Operator shown in the box above. For personal data matters contact {email} with the subject \"GDPR\".",
            "We have not appointed a data protection officer, as the law does not require it for us.",
          ],
        },
        {
          heading: "2. When we are controller and when processor",
          body: [
            "We are the controller for website visitors, for salon account users (owners and staff) as regards account management and billing, and for clients who create a booking account.",
            "Data that a salon enters about its clients and staff (names, phone numbers, bookings, notes, wages) is processed by us on behalf of the salon. The salon is the controller. Please address questions and requests about this data primarily to your salon; we handle the salon's requests under the Data Processing Agreement (DPA).",
          ],
        },
        {
          heading: "3. What data, why and for how long",
          body: [
            "Visitors of {site}:",
            "- server logs (IP address, browser, time, page visited) – security and operation of the website – legitimate interest – up to 30 days,",
            "- language cookie – see the Cookie Policy.",
            "When you contact us (email, phone, WhatsApp, Facebook, Instagram):",
            "- name, contact details, message – answering and pre-contract discussions – legitimate interest and pre-contractual steps – 3 years from the last contact.",
            "Salon accounts (owners and staff):",
            "- name, email, phone, salon name and address, company ID, role and login details (passwords stored only hashed) – providing the Service – performance of contract – for the life of the account plus 30 days,",
            "- plan, payments, receipts – contract and legal accounting and tax obligations – 10 years,",
            "- service emails and notices (account verification, trial ending, changes to terms) – performance of contract,",
            "- news about SalonGo and similar services to customers' email – legitimate interest under Section 7(3) of Act No. 480/2004 Coll. – until you unsubscribe, via the link in every email or at {email},",
            "- support requests – handling the request – legitimate interest – 3 years.",
            "Salon clients with a booking account:",
            "- name, email, phone, bookings and memberships at salons – account and booking management – performance of contract – until the account is deleted; bookings themselves are kept by the salon as controller.",
            "Apps and security:",
            "- push notification device token, app version, error reports, security logs – operation, security and bug fixing – legitimate interest and performance of contract – logs up to 90 days, longer only while handling an incident.",
            "Account and payment data are required to conclude the contract; without them we cannot provide the Service. Other data is voluntary.",
          ],
        },
        {
          heading: "4. Who we share data with",
          body: [
            "We do not sell or rent data. We share it only as necessary with these providers processing it for us:",
            "- Vercel Inc. – website and app hosting (EU servers, Frankfurt),",
            "- Neon Inc. – database (AWS, Frankfurt),",
            "- Stripe Payments Europe Ltd. – card payments (Ireland),",
            "- Resend (Plus Five Five Inc.) – email delivery,",
            "- Google Ireland Ltd. / Firebase Cloud Messaging – mobile app notifications,",
            "- Functional Software Inc. (Sentry) – error reporting,",
            "- GitHub Inc. – desktop app downloads.",
            "Also accountants, tax advisers, lawyers and public authorities where required by law.",
            "If you contact us via WhatsApp, Facebook or Instagram, Meta is a separate controller under its own terms.",
          ],
        },
        {
          heading: "5. Transfers outside the EU",
          body: [
            "Some providers are based in the USA. Transfers rely on the European Commission's adequacy decision (EU-US Data Privacy Framework) where the provider is certified, otherwise on EU Standard Contractual Clauses.",
          ],
        },
        {
          heading: "6. Your rights",
          body: [
            "You have the right of access, rectification, erasure, restriction, portability and to object to processing based on legitimate interest, including objecting to news emails (which we always honour). You may withdraw consent at any time.",
            "Send requests to {email}. We reply within 1 month; complex cases may be extended by 2 more months and we will tell you. We may verify your identity.",
            "You may lodge a complaint with the Czech Office for Personal Data Protection (ÚOOÚ), Pplk. Sochora 27, 170 00 Prague 7, www.uoou.gov.cz, or with the authority in the EU country where you live or work.",
          ],
        },
        {
          heading: "7. Security",
          body: [
            "We use encrypted connections (HTTPS), hashed passwords, separation of each salon's data, role-based access and backups. Only people who need access and are bound by confidentiality can access data.",
            "Personal data breaches are handled under Articles 33 and 34 GDPR.",
          ],
        },
        {
          heading: "8. Other information",
          body: [
            "We do not use automated decision-making or profiling with legal effects.",
            "The Service is not intended for people under 15.",
            "We may update this policy. The current version is always at {site}/en/privacy; account users are informed of material changes by email or in the app.",
          ],
        },
      ],
    },

    cookies: {
      title: "Cookie Policy",
      description: "Which cookies and similar technologies the SalonGo website and app use. We do not use advertising or analytics cookies.",
      sections: [
        {
          heading: "1. What cookies are",
          body: ["Cookies are small files a website stores in your browser. Browser local storage works similarly."],
        },
        {
          heading: "2. What we use on {site}",
          body: [
            "- NEXT_LOCALE – remembers your chosen language – necessary – until the browser is closed or up to 1 year.",
            "The website uses no analytics, advertising or tracking cookies and loads no third-party content that sets cookies. We therefore do not ask for consent: necessary cookies may be used without consent under Section 89(3) of Act No. 127/2005 Coll.",
            "Facebook, Instagram and WhatsApp links are plain links. Their cookies are set only once you open them, under their own rules.",
          ],
        },
        {
          heading: "3. What we use in the app {app}",
          body: [
            "- login and security cookies (session, CSRF protection) – necessary – while you are logged in,",
            "- local storage for language, appearance and display settings – necessary for the function you request.",
          ],
        },
        {
          heading: "4. Changes",
          body: [
            "If we introduce analytics or marketing cookies, we will activate them only with your prior consent via a banner where \"Reject\" is as easy as \"Accept\", and will update this policy.",
            "You can delete or block cookies in your browser settings. Without necessary cookies, login may not work.",
          ],
        },
      ],
    },

    dpa: {
      title: "Data Processing Agreement (DPA)",
      description:
        "Agreement under Article 28 GDPR between the salon (controller) and SalonGo (processor): scope, obligations, sub-processors, breaches and deletion.",
      sections: [
        {
          heading: "1. Parties and conclusion",
          body: [
            "This data processing agreement (the \"DPA\") is concluded between the Salon as controller and the SalonGo Operator as processor under Article 28 of Regulation (EU) 2016/679 (GDPR).",
            "The DPA forms part of the Terms of Service and is concluded when the Salon registers. It applies for as long as the Service is used and until data is deleted under section 10.",
          ],
        },
        {
          heading: "2. Subject matter, nature and purpose",
          body: [
            "The processor stores and processes personal data the Salon puts into the Service in order to provide it: calendar and bookings, client records, checkout and receipts, payroll, reports, reminders and messages to clients on the Salon's instruction, backups and support.",
          ],
        },
        {
          heading: "3. Categories of data subjects and data",
          body: [
            "Data subjects: the Salon's clients, staff and contractors.",
            "Data: name, phone, email, date of birth, booking and service history, payments and receipts, notes, photos, loyalty data; for staff also role, revenue, commission, wages and tips.",
            "Special categories (e.g. health data such as allergies) only if entered by the Salon. The Salon is responsible for having a legal basis under Article 9 GDPR.",
          ],
        },
        {
          heading: "4. Controller's instructions",
          body: [
            "The processor processes data only on the Salon's documented instructions: this DPA, the Terms of Service and the settings and actions the Salon makes in the Service.",
            "If the processor considers an instruction unlawful, it will inform the Salon.",
            "The processor does not use the data for its own purposes, but may create anonymised aggregate statistics that are not personal data.",
          ],
        },
        {
          heading: "5. Confidentiality and security",
          body: [
            "Persons authorised to process data are bound by confidentiality.",
            "The processor implements technical and organisational measures under Article 32 GDPR, including: encrypted transfer (HTTPS/TLS), hashed passwords, logical separation of salons' data, role-based access, minimal operator access, regular backups, access logging and regular software updates.",
          ],
        },
        {
          heading: "6. Sub-processors",
          body: [
            "The Salon gives general authorisation for sub-processors. Current list:",
            "- Vercel Inc. – hosting (EU, Frankfurt),",
            "- Neon Inc. – database (AWS, Frankfurt),",
            "- Resend (Plus Five Five Inc.) – emails to clients and users,",
            "- Google Ireland Ltd. / Firebase Cloud Messaging – push notifications,",
            "- Functional Software Inc. (Sentry) – error reporting,",
            "- Stripe Payments Europe Ltd. – payments (if the Salon uses payments through the Service).",
            "The processor will inform the Salon by email or in the app at least 14 days before adding or replacing a sub-processor. The Salon may object on reasonable grounds; if no agreement is reached, the Salon may terminate and receive the proportional part of the paid period.",
            "The processor imposes equivalent data protection obligations on sub-processors and remains responsible for their compliance.",
            "Transfers outside the EU rely only on an adequacy decision (e.g. EU-US Data Privacy Framework) or Standard Contractual Clauses.",
          ],
        },
        {
          heading: "7. Assistance with data subject rights",
          body: [
            "The Service lets the Salon find, correct, export and delete data. If the Salon cannot handle a request itself, the processor provides reasonable assistance on request.",
            "If the processor receives a request directly, it forwards it to the Salon and does not handle it unless authorised.",
          ],
        },
        {
          heading: "8. Personal data breaches",
          body: [
            "The processor notifies the Salon of a personal data breach without undue delay and no later than 48 hours after becoming aware of it, with the information available under Article 33(3) GDPR, so the Salon can meet its notification duty.",
          ],
        },
        {
          heading: "9. Further assistance and audits",
          body: [
            "The processor provides reasonable assistance with data protection impact assessments (DPIA) and prior consultation with the supervisory authority.",
            "The processor provides information needed to demonstrate compliance with this DPA. Audits require 30 days' written notice, at most once a year, during business hours, without disrupting operations and without access to other salons' data; the Salon bears the costs unless a material breach is found.",
          ],
        },
        {
          heading: "10. Termination: return and deletion",
          body: [
            "After termination, the Salon may export its data within 30 days or request it in a common machine-readable format. The processor then deletes the data; backups are cleared within a further 90 days at the latest, unless the law requires retention.",
          ],
        },
        {
          heading: "11. Liability and governing law",
          body: [
            "Liability is governed by Article 82 GDPR and the Terms of Service.",
            "This DPA is governed by Czech law. In case of conflict with the Terms of Service on data protection, this DPA prevails.",
          ],
        },
      ],
    },

    websiteTerms: {
      title: "Website Service Terms",
      description:
        "Terms of the website offer for SalonGo customers ({price}, up to {pages} pages): scope, payment, timeline, revisions, acceptance, rights and hosting.",
      sections: [
        {
          heading: "1. Scope",
          body: [
            "These terms govern the contract for work between the SalonGo Operator (contractor) and a salon (client) for building the salon's website. The SalonGo Terms of Service apply additionally.",
            "The offer is for businesses with an active SalonGo account (paid plan or trial) at the time of the order.",
          ],
        },
        {
          heading: "2. Ordering",
          body: [
            "Orders can be placed by phone, email, Facebook, Instagram or WhatsApp.",
            "The contract is concluded when SalonGo confirms the order in writing (email or message) with the chosen template, scope and price.",
          ],
        },
        {
          heading: "3. What is included",
          body: [
            "The price includes:",
            "- a website of up to {pages} pages (e.g. home, services & prices, about, gallery, contact) based on the chosen template or the client's own idea,",
            "- adding the texts, photos, colours and salon details supplied by the client,",
            "- display on desktop and mobile,",
            "- a button to SalonGo online booking, if the salon has it enabled,",
            "- two rounds of revisions after the draft is delivered.",
            "Not included: copywriting and translation beyond minor edits, photography or stock photos, domain, hosting, e-shop, integrations with other systems, guaranteed search rankings and later ongoing changes. These can be ordered separately by agreement.",
          ],
        },
        {
          heading: "4. Price and payment",
          body: [
            "The price is {price}, one-off, for building the website. The price is final.",
            "The price is paid in advance after the order is confirmed, as stated in the confirmation. Work starts once payment and all materials are received.",
            "Domain and hosting are offered separately at the price in an individual quote.",
          ],
        },
        {
          heading: "5. Materials and timeline",
          body: [
            "The client supplies the name, contacts, services and prices, texts, logo and photos, and is responsible for their accuracy and for having the right to use them (copyright, trademarks, consent of people in photos).",
            "SalonGo usually delivers the draft within 14 working days of payment and receipt of all materials. The deadline is extended by any time the client takes to supply materials or feedback.",
            "If the client does not supply materials within 60 days of the order despite a reminder, SalonGo may terminate; the price is refunded less the work done, at most 50% of the price.",
            "SalonGo may refuse to publish content that is illegal or infringes third-party rights.",
          ],
        },
        {
          heading: "6. Revisions and acceptance",
          body: [
            "The client sends all feedback at once in each revision round. Additional rounds or changes to an approved brief are charged by agreement.",
            "The work is delivered when SalonGo sends the link to the finished website. If the client does not report specific defects in writing within 7 days, the work is deemed accepted without reservation. Minor defects that do not prevent use are not a reason to refuse acceptance; SalonGo will fix them within a reasonable time.",
          ],
        },
        {
          heading: "7. Warranty and liability",
          body: [
            "Website bugs (e.g. broken links, display errors) reported within 30 days of delivery are fixed free of charge.",
            "SalonGo is not responsible for content supplied by the client, search rankings, the salon's revenue, or outages of third-party domains and hosting.",
            "SalonGo's total liability under this contract is limited to the price paid. This limitation does not apply to damage caused intentionally or by gross negligence.",
            "The client will indemnify SalonGo against third-party claims relating to materials the client supplied.",
          ],
        },
        {
          heading: "8. Rights to the website",
          body: [
            "After full payment, the client receives a non-exclusive, perpetual licence to use the finished website to promote its salon, including the texts and photos it supplied.",
            "Templates, design, source code and generic elements remain SalonGo's property; the client may not resell them or use them for other websites. Handover of the source code can be agreed separately for a fee.",
            "SalonGo may show the website among its references and examples. The client may object at any time by email.",
          ],
        },
        {
          heading: "9. Cancellation before completion",
          body: [
            "Before work starts, the client may cancel and receive a full refund.",
            "After work has started, the refund is reduced by the value of work done. After delivery, no refund is given.",
          ],
        },
        {
          heading: "10. Legal information on the salon's website",
          body: [
            "As the website's operator, the salon is responsible for its legal content, in particular business details (name, company ID, address), privacy and cookie information. SalonGo adds the texts and details the client supplies.",
            "If the salon stops using SalonGo, the online booking button stops working. The website remains the client's; if SalonGo hosts it, hosting is governed by a separate agreement.",
          ],
        },
        {
          heading: "11. Final provisions",
          body: [
            "The contract is governed by Czech law, in particular Sections 2586 et seq. of the Civil Code. Other matters are governed by the SalonGo Terms of Service.",
          ],
        },
      ],
    },
  },
};
