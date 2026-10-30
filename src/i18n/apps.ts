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

/** English only for now. To add Swedish, widen the key to 'en' | 'sv', add an `sv` entry, and add src/pages/sv/apps/**. */
export const strings: Record<'en', AppsCopy> = {
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
        { src: '/assets/apps/anaxis-scoring/en-01-calculator.png', alt: 'Anaxis Scoring calculator: a three-shot run with hit factor 5.31' },
        { src: '/assets/apps/anaxis-scoring/en-02-history.png', alt: 'Run history grouped by plan and drill, with points and hit factor per run' },
        { src: '/assets/apps/anaxis-scoring/en-03-shot-analysis.png', alt: 'Shot analysis of a run, with the run advisor and what-if answers' },
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
      lede: 'Anaxis Scoring works offline without an account, in the phone app. If you choose to sign in, your data is also stored on our backend so it can sync, and it is available in the web app. This page explains what is stored and where.',
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
            'You can use the phone app without signing in. Your scoring data, shooter and weapon profiles, stage plans, drills and settings are then stored only on your device, in a local SQLite database. Nothing is sent to us.',
          ],
        },
        {
          heading: 'Optional account',
          paras: [
            'Signing in is optional. Sign-in uses a standard OpenID Connect login (Keycloak). Accounts are approved by an administrator before they can be used.',
            'For your account, our server holds your email address, username, display name, role, whether the account is approved, and whether the email address is verified.',
          ],
        },
        {
          heading: 'What is synced when you are signed in',
          paras: ['Once you are signed in, the app syncs the following to our backend. The phone also keeps a local copy of everything.'],
          items: [
            'Shooters: names and association',
            'Scores and shot strings, including split times from a connected shot timer when one is used',
            'Weapons, including optional photos and catalog id',
            'Stage plans',
            'Drills',
            'Settings: theme and language',
            'A device id',
            'Licence kind and licence expiry date (entered by an administrator)',
            'Club or team membership (a label set by an administrator)',
          ],
        },
        {
          heading: 'Administrator records',
          paras: [
            'Administrator actions on an account (approve, role change, licence, group change, delete) are logged with the administrator\u2019s username and the time. When an account is deleted, personal fields are removed from the log events about it.',
          ],
        },
        {
          heading: 'Web app',
          paras: [
            'The same account and data are also available in the browser at scoring.anaxiatech.se, not only in the phone app.',
          ],
        },
        {
          heading: 'Technical logs',
          paras: ['Our servers keep technical logs (for example IP addresses). [OWNER TO CONFIRM — what is logged and for how long]'],
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
};
