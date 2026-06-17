export interface ProductsCopy {
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; titleAccent: string; lede: string; ctaContact: string; ctaCrackz: string };
  products: {
    eyebrow: string; heading: string; lede: string;
    surveyEyebrow: string; surveyHeading: string; surveyBody: string;
    surveyFeature1: string; surveyFeature2: string; surveyFeature3: string;
    surveyFeature4: string; surveyFeature5: string; surveyFeature6: string;
    surveyImgAlt: string;
    crackzEyebrow: string; crackzHeading: string; crackzBody: string;
    crackzFeature1: string; crackzFeature2: string; crackzFeature3: string;
    crackzFeature4: string; crackzFeature5: string; crackzFeature6: string;
    crackzImgAlt: string;
  };
  flow: {
    eyebrow: string; heading: string; lede: string;
    node0: string; node1: string; node2: string; node3: string; node4: string; node5: string;
    step0Title: string; step0Body: string;
    step1Title: string; step1Body: string;
    step2Title: string; step2Body: string;
    step3Title: string; step3Body: string;
    step4Title: string; step4Body: string;
    step5Title: string; step5Body: string;
  };
  together: { eyebrow: string; heading: string; caption: string; surveyAlt: string; crackzAlt: string; surveyCaption: string; crackzCaption: string };
  vision: { eyebrow: string; heading: string; body: string; pill: string; cta: string; ctaSecondary: string };
}

export const strings: Record<'en' | 'sv', ProductsCopy> = {
  en: {
    meta: {
      title: "AI Slam — Survey Platform | Anaxiatech",
      description:
        "AI Slam is Anaxiatech's marine survey intelligence platform — Survey Ops catalogs and geolocates every capture; Crackz detects defects at pixel level.",
    },
    hero: {
      eyebrow: "The vision · AI Slam",
      title: "Every survey, searchable.",
      titleAccent: "Every defect, detected.",
      lede: "AI Slam is the platform that closes the loop on marine survey intelligence. Survey Ops ingests and catalogs every capture from field to archive. Crackz runs pixel-level defect detection on that catalog. Together they turn raw survey data into actionable knowledge.",
      ctaContact: "Talk to us",
      ctaCrackz: "Explore Crackz",
    },
    products: {
      eyebrow: "The two halves",
      heading: "One platform. Two engines.",
      lede: "Each product ships independently today and is designed to interoperate as part of the AI Slam platform.",
      surveyEyebrow: "Data foundation · Survey Ops",
      surveyHeading: "Ingest. Catalog. Retrieve.",
      surveyBody:
        "Survey Ops is a local-first data catalog and ingest platform for marine survey data. Every capture from field device or vessel travels through inbox staging, operator approval, and canonical project storage — fully catalogued, geotagged, searchable, and ready for downstream analysis.",
      surveyFeature1: "Resumable field upload over Starlink (tus protocol)",
      surveyFeature2: "Inbox + operator approval workflow",
      surveyFeature3: "USBL geotagging — writes real GPS positions onto images",
      surveyFeature4: "Geospatial map view (PostGIS + Leaflet)",
      surveyFeature5: "Natural-language RAG search with source citations",
      surveyFeature6: "Offline-first — runs on operator hardware, no cloud dependency",
      surveyImgAlt: "Survey Ops Portal — capture catalog and project map view",
      crackzEyebrow: "Detection engine · Crackz",
      crackzHeading: "Detect. Segment. Report.",
      crackzBody:
        "Crackz applies deep-learning semantic segmentation to find cracks, corrosion, spalling, and weld defects at the pixel level — across concrete harbor piers, bridges, factory surfaces, and energy assets. Pre-trained models deploy in days; custom models reach 90%+ accuracy on your domain data.",
      crackzFeature1: "Pixel-level defect segmentation (cracks, corrosion, spalling)",
      crackzFeature2: "Pre-trained checkpoints or custom-trained models",
      crackzFeature3: "GeoJSON output ready for GIS pipelines",
      crackzFeature4: "Severity scoring — High · Med · Low · Clean",
      crackzFeature5: "Audit-grade Word/PDF reports",
      crackzFeature6: "90%+ detection accuracy on validation datasets",
      crackzImgAlt:
        "Crackz detection results — per-image severity grid with defect overlays",
    },
    flow: {
      eyebrow: "The integration",
      heading: "From field to finding — one continuous flow.",
      lede: "This is the architecture we're building toward. Today each product ships independently. The designed seam between them is how AI Slam becomes the operational system for marine survey intelligence.",
      node0: "Field capture",
      node1: "Ingest & catalog",
      node2: "Geotagged frames",
      node3: "Crackz detection",
      node4: "Annotations back",
      node5: "Searchable knowledge",
      step0Title: "Field capture",
      step0Body:
        "The survey vessel or ROV captures images and video. Survey Ops accepts resumable uploads — over Starlink or on-site — so no capture is lost to a bad connection.",
      step1Title: "Ingest & catalog",
      step1Body:
        "Packages stage in an inbox. An operator approves and the AI pre-fills the metadata. Captures move into canonical storage: customer / project / site / date, immutable.",
      step2Title: "Geotagged frames",
      step2Body:
        "USBL track data writes real GPS positions onto images. PostGIS stores the geospatial record; Leaflet shows every capture on a map. Embeddings make the whole archive semantically searchable.",
      step3Title: "Crackz detection",
      step3Body:
        "Survey Ops hands geotagged frames and their catalog context to Crackz. The detection engine runs pixel-level segmentation — cracks, corrosion, spalling — on every image.",
      step4Title: "Annotations back",
      step4Body:
        "Detection results, GeoJSON boundaries, and severity scores flow back as structured catalog annotations, linked to the original captures and their map positions.",
      step5Title: "Searchable knowledge",
      step5Body:
        "The entire survey — raw captures, geolocated positions, detection findings, and reports — is queryable in natural language. 'Show all high-severity pier scans from 2024' becomes a real query.",
    },
    together: {
      eyebrow: "Seeing it together",
      heading: "Catalog on the left. Detection on the right.",
      caption:
        "Survey Ops shows every capture on a geospatial map, with natural-language search over the archive. Crackz surfaces per-image defect findings with severity scoring. AI Slam is the bridge.",
      surveyAlt: "Survey Ops Portal full-page map view — capture clusters by project",
      crackzAlt:
        "Crackz detection run — severity grid with annotated defect images",
      surveyCaption: "Survey Ops · catalog & geospatial map",
      crackzCaption: "Crackz · defect detection results",
    },
    vision: {
      eyebrow: "Platform status",
      heading: "An open architecture built to interoperate.",
      body: "Both products ship today as independent systems. Survey Ops is in active production use for marine survey data management. Crackz is in production across harbor infrastructure, bridge inspection, and manufacturing QA. The platform integration — automatic handoff from catalog to detection engine and annotations back — is the designed next phase of AI Slam.",
      pill: "Vision · in progress",
      cta: "Talk to us about the roadmap",
      ctaSecondary: "Explore Crackz",
    },
  },

  sv: {
    meta: {
      title: "AI Slam — Surveyplattform | Anaxiatech",
      description:
        "AI Slam är Anaxiatechs plattform för marin surveyintelligens — Survey Ops katalogiserar och geolokaliserar varje inspelning; Crackz detekterar defekter på pixelnivå.",
    },
    hero: {
      eyebrow: "Visionen · AI Slam",
      title: "Varje survey, sökbar.",
      titleAccent: "Varje defekt, detekterad.",
      lede: "AI Slam är plattformen som sluter loopen för marin surveyintelligens. Survey Ops tar emot och katalogiserar varje inspelning från fält till arkiv. Crackz kör defektdetektering på pixelnivå mot det katalogen. Tillsammans omvandlar de rådata från survey till handlingsbar kunskap.",
      ctaContact: "Kontakta oss",
      ctaCrackz: "Utforska Crackz",
    },
    products: {
      eyebrow: "De två halvorna",
      heading: "En plattform. Två motorer.",
      lede: "Varje produkt levereras idag som ett fristående system och är designad för att samverka som en del av AI Slam-plattformen.",
      surveyEyebrow: "Datafundament · Survey Ops",
      surveyHeading: "Ingest. Katalog. Hämtning.",
      surveyBody:
        "Survey Ops är en lokal-först datakatalog och ingestplattform för marin surveydata. Varje inspelning från fältenhet eller fartyg passerar inkorgsstaging, operatörsgodkännande och kanonisk projektlagring — fullständigt katalogiserad, geotaggad, sökbar och redo för vidare analys.",
      surveyFeature1: "Återupptagbar fältuppladdning över Starlink (tus-protokoll)",
      surveyFeature2: "Inkorg med operatörsgodkännandeflöde",
      surveyFeature3: "USBL-geotaggning — skriver riktiga GPS-positioner på bilder",
      surveyFeature4: "Geospatial kartvy (PostGIS + Leaflet)",
      surveyFeature5: "RAG-sökning på naturligt språk med källcitat",
      surveyFeature6: "Offline-först — körs på operatörshårdvara, utan molnberoende",
      surveyImgAlt: "Survey Ops Portal — inspelningskatalog och projektkartvy",
      crackzEyebrow: "Detekteringsmotor · Crackz",
      crackzHeading: "Detektera. Segmentera. Rapportera.",
      crackzBody:
        "Crackz tillämpar djupinlärningsbaserad semantisk segmentering för att hitta sprickor, korrosion, avflagning och svetsskarvsdefekter på pixelnivå — i betongkajpelare, broar, fabriksytor och energiinfrastruktur. Förtränade modeller driftsätts på några dagar; kundanpassade modeller når 90%+ träffsäkerhet på domänspecifik data.",
      crackzFeature1: "Defektsegmentering på pixelnivå (sprickor, korrosion, avflagning)",
      crackzFeature2: "Förtränade checkpoints eller kundanpassade modeller",
      crackzFeature3: "GeoJSON-utdata redo för GIS-pipelines",
      crackzFeature4: "Allvarlighetsbedömning — Hög · Medel · Låg · Ren",
      crackzFeature5: "Revisionsklara Word/PDF-rapporter",
      crackzFeature6: "90%+ detekteringsnoggrannhet på valideringsdataset",
      crackzImgAlt:
        "Crackz detekteringsresultat — allvarlighetsgrid per bild med defektöverlagringar",
    },
    flow: {
      eyebrow: "Integrationen",
      heading: "Från fält till fynd — ett sammanhängande flöde.",
      lede: "Det här är arkitekturen vi bygger mot. Idag levereras varje produkt fristående. Den designade sömsnittet mellan dem är hur AI Slam blir det operativa systemet för marin surveyintelligens.",
      node0: "Fältinspelning",
      node1: "Ingest & katalog",
      node2: "Geotaggade bilder",
      node3: "Crackz-detektering",
      node4: "Annoteringar tillbaka",
      node5: "Sökbar kunskap",
      step0Title: "Fältinspelning",
      step0Body:
        "Surveyfartyget eller ROV:en fångar bilder och video. Survey Ops tar emot återupptagbara uppladdningar — över Starlink eller på plats — så att ingen inspelning går förlorad vid dålig uppkoppling.",
      step1Title: "Ingest & katalog",
      step1Body:
        "Paket mellanlagras i en inkorg. En operatör godkänner och AI:n förfyller metadata. Inspelningarna flyttas till kanonisk lagring: kund / projekt / plats / datum, oföränderlig.",
      step2Title: "Geotaggade bilder",
      step2Body:
        "USBL-spårdata skriver riktiga GPS-positioner på bilderna. PostGIS lagrar det geospatiala underlaget; Leaflet visar varje inspelning på en karta. Embeddings gör hela arkivet semantiskt sökbart.",
      step3Title: "Crackz-detektering",
      step3Body:
        "Survey Ops lämnar över geotaggade bilder och deras katalogkontext till Crackz. Detekteringsmotorn kör segmentering på pixelnivå — sprickor, korrosion, avflagning — på varje bild.",
      step4Title: "Annoteringar tillbaka",
      step4Body:
        "Detekteringsresultat, GeoJSON-gränser och allvarlighetsbedömningar flödar tillbaka som strukturerade katalogannoteringar, länkade till ursprungliga inspelningar och deras kartpositioner.",
      step5Title: "Sökbar kunskap",
      step5Body:
        "Hela surveyn — råinspelningar, geolokaliserade positioner, detekteringsfynd och rapporter — är sökbar på naturligt språk. 'Visa alla kajpelarscanningar med hög allvarlighetsgrad från 2024' blir en verklig sökning.",
    },
    together: {
      eyebrow: "Sett tillsammans",
      heading: "Katalogen till vänster. Detekteringen till höger.",
      caption:
        "Survey Ops visar varje inspelning på en geospatial karta, med naturspråkssökning över arkivet. Crackz lyfter fram defektfynd per bild med allvarlighetsbedömning. AI Slam är bryggan.",
      surveyAlt: "Survey Ops Portal helsideskartvvy — inspelningskluster per projekt",
      crackzAlt:
        "Crackz detekteringskörning — allvarlighetsgrid med annoterade defektbilder",
      surveyCaption: "Survey Ops · katalog & geospatial karta",
      crackzCaption: "Crackz · defekteringsresultat",
    },
    vision: {
      eyebrow: "Plattformsstatus",
      heading: "En öppen arkitektur byggd för samverkan.",
      body: "Båda produkterna levereras idag som fristående system. Survey Ops används aktivt i produktion för hantering av marin surveydata. Crackz är i produktion inom hamninfrastruktur, broinspektion och tillverknings-QA. Plattformsintegrationen — automatisk överlämning från katalog till detekteringsmotor och annoteringar tillbaka — är den designade nästa fasen av AI Slam.",
      pill: "Vision · pågår",
      cta: "Prata med oss om färdplanen",
      ctaSecondary: "Utforska Crackz",
    },
  },
};
