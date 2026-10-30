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
    featuresHeading: string;
    groups: { title: string; items: string[] }[];
    storesHeading: string; storesPending: string;
    privacyLink: string; supportLink: string;
    screenshots: { src: string; alt: string }[];
  };
  doc: { back: string };
  privacy: DocCopy;
  support: DocCopy;
}

/**
 * Store listings for Anaxis Scoring. Adding a listing is a one-line change:
 *   { label: 'App Store', href: 'https://apps.apple.com/...' }
 * Leave empty until the listings exist; the page then shows the "coming soon" note.
 */
export const scoringStores: { label: string; href: string }[] = [];

/** English only for now. To add Swedish, widen the key to 'en' | 'sv', add an `sv` entry, and add src/pages/sv/apps/**. */
export const strings: Record<'en', AppsCopy> = {
  en: {
    meta: {
      title: 'Apps — Anaxis Scoring | Anaxiatech',
      description: 'Anaxis Scoring is a scoring and training app for IPSC and USPSA practical shooting. Get points, hit factor and accuracy for every run, and track progress drill by drill. Works offline, with optional sync. Coming soon in beta.',
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
      body: 'Anaxis Scoring is a scoring and training app for IPSC and USPSA practical shooting. Enter a run, get the points, hit factor and accuracy at once, connect a Bluetooth shot timer to capture your split times, and track your progress drill by drill. It works fully offline. An account is optional: sign in to sync your data between your phone and the web app.',
      featuresHeading: 'What it does',
      groups: [
        {
          title: 'Scoring',
          items: [
            'Shot-string entry: A, C, D, misses, no-shoots, procedurals and penalties',
            'IPSC and USPSA, with minor and major power factor',
            'Points, hit factor and accuracy for every run',
            'Max points and remaining shots for the stage, with a warning when a run has more shots than the stage allows',
          ],
        },
        {
          title: 'Shot timer (Bluetooth, in the beta builds)',
          items: [
            'Connects to the AMG Lab Commander shot timer',
            'Captures the run time and the individual shot times and splits into the score',
            'The saved run keeps its timer data for analysis',
            'Or type the time in by hand',
            'Support for more timer brands is planned',
          ],
        },
        {
          title: 'Analysis and progress',
          items: [
            'Shot analysis of a run: target distribution, and splits when a timer was used',
            'History grouped by plan and drill',
            'Progress per drill over time',
          ],
        },
        {
          title: 'Drills and training',
          items: [
            'Built-in library of 22 common drills (Bill drill, Blake drill, The dots, The accelerator, Four Aces and more), six of them with pro par times',
            'Scores are kept per drill',
          ],
        },
        {
          title: 'Stage planning',
          items: [
            'Plans with stages, target counts, max score and minimum rounds per stage',
            'For matches and for training',
          ],
        },
        {
          title: 'Weapons',
          items: [
            'Built-in catalog of 40 common firearms, with pictures from the built-in set',
            'Or add your own weapon with your own photo',
            'Per-weapon statistics: rounds fired, level, badges and personal bests',
          ],
        },
        {
          title: 'Shooters',
          items: ['Several shooter profiles in one app, for example family or club members sharing a phone'],
        },
        {
          title: 'Your data',
          items: [
            'Offline-first: everything is stored on the device',
            'Optional account: sign in to sync scores, shooters, weapons, plans and drills with a backend, and use the same data in the web app',
            'Languages: English, Swedish and Spanish',
          ],
        },
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
    },
    privacy: {
      meta: {
        title: 'Anaxis Scoring — Privacy Policy | Anaxiatech',
        description: 'The Anaxis Scoring privacy policy will be published here before the app is released.',
      },
      eyebrow: 'Anaxis Scoring',
      title: 'Privacy Policy',
      lede: 'Anaxis Scoring has not been released yet. Its privacy policy will be published on this page before release. Coming soon.',
      updated: '',
      sections: [],
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
          paras: ['Signing in is optional. New accounts are approved by an administrator, so a new account may not work straight away.'],
        },
        {
          heading: 'What to expect in beta',
          paras: ['The app is offline-first. Early releases focus on score entry, history and analysis, with optional sign-in and sync.'],
        },
      ],
    },
  },
};
