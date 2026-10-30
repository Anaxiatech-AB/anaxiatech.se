export interface DocSection {
  heading: string;
  paras?: string[];
  items?: string[];
  /** href may contain {lang}, replaced with the page language. */
  links?: { label: string; href: string }[];
}

export interface DocCopy {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lede: string;
  updated: string;
  sections: DocSection[];
}

export interface AppsCopy {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; titleAccent: string; lede: string };
  scoring: {
    eyebrow: string; name: string; status: string; tagline: string; body: string;
    featuresHeading: string; features: string[];
    storesHeading: string; storesPending: string;
    privacyLink: string; supportLink: string;
    screenshots: { src: string; alt: string }[];
  };
  doc: { back: string; draftBanner: string };
  privacy: DocCopy;
  support: DocCopy;
}

/**
 * Store listings for Anaxis Scoring. Adding a listing is a one-line change:
 *   { label: 'App Store', href: 'https://apps.apple.com/...' }
 * Leave empty until the listings exist; the page then shows the "coming soon" note.
 */
export const scoringStores: { label: string; href: string }[] = [];

/**
 * The privacy and support text is a DRAFT pending owner review. While true, the
 * pages show a visible banner. Set to false once the owner has approved the text.
 */
export const DOCS_ARE_DRAFT = true;

const shots = [
  { src: '/assets/apps/anaxis-scoring/calculator.png', alt: '' },
  { src: '/assets/apps/anaxis-scoring/history.png', alt: '' },
  { src: '/assets/apps/anaxis-scoring/optimization.png', alt: '' },
  { src: '/assets/apps/anaxis-scoring/shot-analysis.png', alt: '' },
];

export const strings: Record<'en' | 'sv', AppsCopy> = {
  en: {
    meta: {
      title: 'Apps — Anaxis Scoring | Anaxiatech',
      description: 'Apps from Anaxiatech. Anaxis Scoring is a practical-shooting scoring app for IPSC and USPSA, coming soon in beta.',
    },
    hero: {
      eyebrow: 'Apps',
      title: 'Small tools,',
      titleAccent: 'built to work in the field.',
      lede: 'Mobile apps from Anaxiatech. They are built offline-first, so they keep working where the signal does not.',
    },
    scoring: {
      eyebrow: 'Practical shooting · IPSC / USPSA',
      name: 'Anaxis Scoring',
      status: 'Coming soon / beta',
      tagline: 'Score a stage, understand the run.',
      body: 'Anaxis Scoring is a scoring app for IPSC and USPSA practical shooting. Enter a shot string, get the points and hit factor, and keep a history you can compare over time. It works fully offline. An account is optional, and signing in syncs your data to a backend.',
      featuresHeading: 'What it does',
      features: [
        'Shot-string entry with points and hit factor',
        'History of scored runs',
        'Shooter and weapon profiles',
        'Drills and stage plans',
        'Works offline; optional sign-in and sync',
      ],
      storesHeading: 'Get the app',
      storesPending: 'Store listings (App Store, Google Play, TestFlight) will be linked here when they are available.',
      privacyLink: 'Privacy policy',
      supportLink: 'Support',
      screenshots: [
        { ...shots[0], alt: 'Anaxis Scoring calculator screen' },
        { ...shots[1], alt: 'Anaxis Scoring history screen' },
        { ...shots[2], alt: 'Anaxis Scoring optimization screen' },
        { ...shots[3], alt: 'Anaxis Scoring shot analysis screen' },
      ],
    },
    doc: {
      back: '← Anaxis Scoring',
      draftBanner: 'DRAFT — pending owner review. Items in [square brackets] are placeholders that must be confirmed before this page is final.',
    },
    privacy: {
      meta: {
        title: 'Anaxis Scoring — Privacy Policy | Anaxiatech',
        description: 'How the Anaxis Scoring app handles your data, with and without an account.',
      },
      eyebrow: 'Anaxis Scoring',
      title: 'Privacy Policy',
      lede: 'Anaxis Scoring works offline without an account. If you choose to sign in, your data is also stored on our backend so it can sync. This page explains what is stored and where.',
      updated: 'Last updated: [OWNER TO CONFIRM — date of publication]',
      sections: [
        {
          heading: 'Who is responsible',
          paras: [
            'Anaxis Scoring is provided by Anaxiatech AB (Org.nr 556673-0056), Stockholm, Sweden.',
            '[OWNER TO CONFIRM — data controller details: legal entity, postal address]',
          ],
        },
        {
          heading: 'Without an account',
          paras: [
            'You can use the app without signing in. Your scoring data, shooter and weapon profiles, stage plans, drills and settings are then stored only on your device, in a local SQLite database. Nothing is sent to us.',
          ],
        },
        {
          heading: 'Optional account',
          paras: [
            'Signing in is optional. Sign-in uses a standard OpenID Connect login (Keycloak). Accounts are approved by an administrator before they can be used.',
            'For your account, our server holds your email address, username and display name.',
          ],
        },
        {
          heading: 'What is synced when you are signed in',
          paras: ['Once you are signed in, the app syncs the following to our backend. The phone also keeps a local copy of everything.'],
          items: [
            'Shooters: names and association',
            'Scores and shot strings',
            'Weapons, including optional photos and catalog id',
            'Stage plans',
            'Drills',
            'Settings: theme and language',
            'A device id',
          ],
        },
        {
          heading: 'Where the data is stored',
          paras: [
            'Synced data is stored on a backend operated by Anaxiatech AB (self-hosted).',
            '[OWNER TO CONFIRM — hosting location and provider]',
          ],
        },
        {
          heading: 'Why we process it',
          paras: [
            'We process this data to provide the app and to let you sync between devices.',
            '[OWNER TO CONFIRM — legal basis under GDPR]',
          ],
        },
        {
          heading: 'Sharing with others',
          paras: ['[OWNER TO CONFIRM — whether any data is shared with third parties or analytics/crash-reporting services; the previous policy stated that there is no analytics or tracking in the app]'],
        },
        {
          heading: 'How long we keep it',
          paras: ['[OWNER TO CONFIRM — retention period for synced data and account details]'],
        },
        {
          heading: 'Deleting your data',
          paras: [
            'An administrator can delete an account. Data stored only on your device can be removed by clearing the app data or uninstalling the app.',
            '[OWNER TO CONFIRM — how a user requests deletion of their account and synced data, and what is deleted]',
          ],
        },
        {
          heading: 'Your rights',
          paras: [
            'Under the GDPR you have the right to request access to, correction of, and deletion of your personal data, and to lodge a complaint with the Swedish Authority for Privacy Protection (IMY).',
            '[OWNER TO CONFIRM — how to exercise these rights]',
          ],
        },
        {
          heading: 'App stores',
          paras: ['If you install the app through TestFlight, the App Store or Google Play, that distribution is subject to Apple’s and Google’s own terms and privacy policies.'],
        },
        {
          heading: 'Contact',
          paras: [
            '[OWNER TO CONFIRM — contact address for privacy questions]',
            'For general help, see the support page.',
          ],
        },
        {
          heading: 'Changes',
          paras: ['We will update this page if how the app handles data changes.'],
        },
      ],
    },
    support: {
      meta: {
        title: 'Anaxis Scoring — Support | Anaxiatech',
        description: 'Get help with the Anaxis Scoring app.',
      },
      eyebrow: 'Anaxis Scoring',
      title: 'Support',
      lede: 'Need help with the beta? Start here.',
      updated: '',
      sections: [
        {
          heading: 'Contact',
          paras: ['[OWNER TO CONFIRM — support email address]'],
        },
        {
          heading: 'Report a problem',
          paras: ['Include your device type, OS version, app version, and a short set of steps to reproduce the problem. That makes bugs easier to find and fix.'],
        },
        {
          heading: 'Project links',
          paras: [
            'Bugs can also be reported in the public issue tracker. Do not post personal data there.',
          ],
          links: [
            { label: 'Repository', href: 'https://github.com/theresiasnow/anaxis_scoring_calculator' },
            { label: 'Issue tracker', href: 'https://github.com/theresiasnow/anaxis_scoring_calculator/issues' },
            { label: 'Privacy policy', href: '/{lang}/apps/anaxis-scoring/privacy/' },
          ],
        },
        {
          heading: 'Account and sign-in',
          paras: ['Signing in is optional. New accounts are approved by an administrator, so a new account may not work straight away. If you cannot sign in, contact support using the address above.'],
        },
        {
          heading: 'What to expect in beta',
          paras: ['The app is offline-first. Early releases focus on score entry, history and analysis, with optional sign-in and sync.'],
        },
      ],
    },
  },
  sv: {
    meta: {
      title: 'Appar — Anaxis Scoring | Anaxiatech',
      description: 'Appar från Anaxiatech. Anaxis Scoring är en poängräkningsapp för IPSC och USPSA (dynamiskt skytte), snart tillgänglig i beta.',
    },
    hero: {
      eyebrow: 'Appar',
      title: 'Små verktyg,',
      titleAccent: 'byggda för att fungera i fält.',
      lede: 'Mobilappar från Anaxiatech. De är byggda för att fungera offline, så de funkar även där täckningen saknas.',
    },
    scoring: {
      eyebrow: 'Dynamiskt skytte · IPSC / USPSA',
      name: 'Anaxis Scoring',
      status: 'Kommer snart / beta',
      tagline: 'Räkna poäng på en bana och förstå din körning.',
      body: 'Anaxis Scoring är en poängräkningsapp för dynamiskt skytte enligt IPSC och USPSA. Mata in en skottserie, få poäng och hit factor, och spara en historik som du kan jämföra över tid. Appen fungerar helt offline. Konto är valfritt, och när du loggar in synkas dina data till en server.',
      featuresHeading: 'Vad den gör',
      features: [
        'Inmatning av skottserier med poäng och hit factor',
        'Historik över genomförda körningar',
        'Skytte- och vapenprofiler',
        'Övningar och banplaner',
        'Fungerar offline; valfri inloggning och synkning',
      ],
      storesHeading: 'Hämta appen',
      storesPending: 'Länkar till App Store, Google Play och TestFlight läggs till här när butikssidorna finns.',
      privacyLink: 'Integritetspolicy',
      supportLink: 'Support',
      screenshots: [
        { ...shots[0], alt: 'Anaxis Scoring, kalkylatorvyn' },
        { ...shots[1], alt: 'Anaxis Scoring, historikvyn' },
        { ...shots[2], alt: 'Anaxis Scoring, optimeringsvyn' },
        { ...shots[3], alt: 'Anaxis Scoring, skottanalysvyn' },
      ],
    },
    doc: {
      back: '← Anaxis Scoring',
      draftBanner: 'UTKAST — väntar på granskning av ägaren. Texter i [hakparentes] är platshållare som måste bekräftas innan sidan är klar. Den svenska översättningen behöver granskas av en person med svenska som modersmål.',
    },
    privacy: {
      meta: {
        title: 'Anaxis Scoring — Integritetspolicy | Anaxiatech',
        description: 'Hur appen Anaxis Scoring hanterar dina uppgifter, med och utan konto.',
      },
      eyebrow: 'Anaxis Scoring',
      title: 'Integritetspolicy',
      lede: 'Anaxis Scoring fungerar offline utan konto. Om du väljer att logga in lagras dina data även på vår server så att de kan synkas. Den här sidan förklarar vad som lagras och var.',
      updated: 'Senast uppdaterad: [ÄGAREN BEKRÄFTAR — publiceringsdatum]',
      sections: [
        {
          heading: 'Vem är ansvarig',
          paras: [
            'Anaxis Scoring tillhandahålls av Anaxiatech AB (org.nr 556673-0056), Stockholm.',
            '[ÄGAREN BEKRÄFTAR — uppgifter om personuppgiftsansvarig: juridisk person, postadress]',
          ],
        },
        {
          heading: 'Utan konto',
          paras: [
            'Du kan använda appen utan att logga in. Dina poäng, skytte- och vapenprofiler, banplaner, övningar och inställningar lagras då bara på din enhet, i en lokal SQLite-databas. Inget skickas till oss.',
          ],
        },
        {
          heading: 'Valfritt konto',
          paras: [
            'Inloggning är valfri. Inloggningen använder standardiserad OpenID Connect (Keycloak). Konton godkänns av en administratör innan de kan användas.',
            'För ditt konto lagrar vår server din e-postadress, ditt användarnamn och ditt visningsnamn.',
          ],
        },
        {
          heading: 'Vad som synkas när du är inloggad',
          paras: ['När du är inloggad synkar appen följande till vår server. Telefonen behåller också en lokal kopia av allt.'],
          items: [
            'Skyttar: namn och förening',
            'Poäng och skottserier',
            'Vapen, inklusive valfria foton och katalog-id',
            'Banplaner',
            'Övningar',
            'Inställningar: tema och språk',
            'Ett enhets-id',
          ],
        },
        {
          heading: 'Var data lagras',
          paras: [
            'Synkade data lagras på en server som drivs av Anaxiatech AB (egen drift).',
            '[ÄGAREN BEKRÄFTAR — var servern finns och vem som är leverantör]',
          ],
        },
        {
          heading: 'Varför vi behandlar uppgifterna',
          paras: [
            'Vi behandlar uppgifterna för att tillhandahålla appen och för att du ska kunna synka mellan enheter.',
            '[ÄGAREN BEKRÄFTAR — rättslig grund enligt GDPR]',
          ],
        },
        {
          heading: 'Delning med andra',
          paras: ['[ÄGAREN BEKRÄFTAR — om några uppgifter delas med tredje part eller med analys- eller kraschrapporteringstjänster; den tidigare policyn angav att appen inte har någon analys eller spårning]'],
        },
        {
          heading: 'Hur länge vi sparar uppgifterna',
          paras: ['[ÄGAREN BEKRÄFTAR — lagringstid för synkade data och kontouppgifter]'],
        },
        {
          heading: 'Radera dina uppgifter',
          paras: [
            'En administratör kan radera ett konto. Data som bara finns på din enhet kan du ta bort genom att rensa appens data eller avinstallera appen.',
            '[ÄGAREN BEKRÄFTAR — hur en användare begär radering av konto och synkade data, och vad som raderas]',
          ],
        },
        {
          heading: 'Dina rättigheter',
          paras: [
            'Enligt GDPR har du rätt att begära tillgång till, rättelse av och radering av dina personuppgifter, och att lämna klagomål till Integritetsskyddsmyndigheten (IMY).',
            '[ÄGAREN BEKRÄFTAR — hur du utövar dessa rättigheter]',
          ],
        },
        {
          heading: 'Appbutiker',
          paras: ['Om du installerar appen via TestFlight, App Store eller Google Play gäller även Apples och Googles egna villkor och integritetspolicyer för den distributionen.'],
        },
        {
          heading: 'Kontakt',
          paras: [
            '[ÄGAREN BEKRÄFTAR — kontaktadress för integritetsfrågor]',
            'För allmän hjälp, se supportsidan.',
          ],
        },
        {
          heading: 'Ändringar',
          paras: ['Vi uppdaterar den här sidan om appens hantering av data ändras.'],
        },
      ],
    },
    support: {
      meta: {
        title: 'Anaxis Scoring — Support | Anaxiatech',
        description: 'Få hjälp med appen Anaxis Scoring.',
      },
      eyebrow: 'Anaxis Scoring',
      title: 'Support',
      lede: 'Behöver du hjälp med betan? Börja här.',
      updated: '',
      sections: [
        {
          heading: 'Kontakt',
          paras: ['[ÄGAREN BEKRÄFTAR — e-postadress för support]'],
        },
        {
          heading: 'Rapportera ett problem',
          paras: ['Ange enhetstyp, OS-version, appversion och en kort beskrivning av hur felet återskapas. Det gör det lättare att hitta och rätta felet.'],
        },
        {
          heading: 'Projektlänkar',
          paras: [
            'Fel kan också rapporteras i den öppna ärendehanteringen. Lägg inte upp personuppgifter där.',
          ],
          links: [
            { label: 'Repository', href: 'https://github.com/theresiasnow/anaxis_scoring_calculator' },
            { label: 'Ärendehantering (issues)', href: 'https://github.com/theresiasnow/anaxis_scoring_calculator/issues' },
            { label: 'Integritetspolicy', href: '/{lang}/apps/anaxis-scoring/privacy/' },
          ],
        },
        {
          heading: 'Konto och inloggning',
          paras: ['Inloggning är valfri. Nya konton godkänns av en administratör, så ett nytt konto fungerar kanske inte direkt. Om du inte kan logga in, kontakta supporten på adressen ovan.'],
        },
        {
          heading: 'Att förvänta sig i beta',
          paras: ['Appen är byggd för att fungera offline. Tidiga versioner fokuserar på poänginmatning, historik och analys, med valfri inloggning och synkning.'],
        },
      ],
    },
  },
};
