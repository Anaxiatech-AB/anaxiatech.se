/* ── Anaxiatech site · main app ───────────────────────────── */
const { useState, useEffect, useMemo } = React;

/* ── Tweakable defaults ──────────────────────────────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "split",
  "accent": "aqua",
  "density": "spacious",
  "layout": "default",
  "showLogos": true,
  "tone": "enterprise"
}/*EDITMODE-END*/;

/* ── Inline SVG mark for nav brand ──────────────────────── */
const BrandMark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
    <path d="M3 4 L11 12 L7 12 L17 21" />
    <path d="M14 3 L21 10" opacity="0.5" />
  </svg>
);

/* ── Tour data (Crackz GUI screenshots) ─────────────────── */
const TOUR_SHOTS = [
  {
    id: "summary",
    glyph: "▦",
    tab: "Project",
    title: "Project Summary",
    desc: "Single pane for project state — model config, training schedule, detection parameters and data paths. Everything reproducible from one YAML.",
    src: "assets/gui/project_summary_view.png",
    chrome: "demo-project · crackz-gui v0.81.0",
    meta: [
      ["Backbone", "SegFormer-B2"],
      ["Input", "512 × 512 px"],
      ["Threshold", "0.50"],
      ["Loss", "Combo (Dice + BCE)"],
    ],
  },
  {
    id: "mask",
    glyph: "✎",
    tab: "Mask Editor",
    title: "Mask Editor",
    desc: "Brush-driven annotation built for production scale. 50–80% faster than CVAT on dense crack imagery, with mask propagation across image series.",
    src: "assets/gui/mask_editor_view.png",
    chrome: "MASK_EDITOR · garaymc_cracks_train_0.jpg",
    meta: [
      ["Tool", "Brush 20px"],
      ["Category", "Crack"],
      ["Throughput", "~140 imgs/hr"],
      ["Format", "PNG · binary or multi-class"],
    ],
  },
  {
    id: "train",
    glyph: "↗",
    tab: "Training",
    title: "Training Run",
    desc: "Live training with live metrics — Epoch · Loss · Val F1 · IoU · ETA. Built on PyTorch Lightning; checkpoints record their annotation schema so incompatible models are flagged automatically.",
    src: "assets/gui/training_run_view.png",
    chrome: "training · in progress",
    meta: [
      ["Engine", "PyTorch Lightning"],
      ["Encoders", "SegFormer B0–B5"],
      ["Optimizer", "AdamW, lr 1e-3"],
      ["GPU", "CUDA · ROCm · CPU"],
    ],
  },
  {
    id: "detect",
    glyph: "◉",
    tab: "Detection",
    title: "Detection Results",
    desc: "Galleries, summary tabs, severity buckets. Defect-detected cards are tinted in a dark green so flagged findings read at a glance across thousands of images — whether they're harbor pier scans or factory weld inspections.",
    src: "assets/gui/detection_run_view.png",
    chrome: "detection · run preview",
    meta: [
      ["Output", "Annotated PNG · GeoJSON"],
      ["Severity", "High · Med · Low · Clean"],
      ["Tiling", "Auto 512px overlap"],
      ["Confidence", "Per-pixel + per-image"],
    ],
  },
];

/* ── Capabilities (aligned with anaxiatech.se) ───────────── */
const CAPS = [
  {
    title: "AI & Automation",
    body: "Machine-learning pipelines, computer vision, and data analysis for industrial inspection and decision support. From image to insight.",
    tags: ["PyTorch", "Segmentation", "MLOps", "NLP"],
  },
  {
    title: "System & Solution Architecture",
    body: "Hands-on architecture for complex enterprise systems — microservices, domain-driven design, full-stack delivery across Java, Python, Go and modern frontends.",
    tags: ["Microservices", "DDD", "API design"],
  },
  {
    title: "Platform & DevSecOps",
    body: "Cloud-native infrastructure, IaC and CI/CD for scalable, resilient systems. Secure GitOps, observability, hybrid and edge deployments across AWS, Azure and GCP.",
    tags: ["AWS", "Azure", "GCP", "Kubernetes"],
  },
  {
    title: "Simulation & Digital Environments",
    body: "Unreal Engine, photogrammetry and digital-twin pipelines for defense and offshore. Real-time rendering, underwater ROV simulation, interactive visualisation.",
    tags: ["Unreal", "C++", "Photogrammetry"],
  },
  {
    title: "Government & Defense",
    body: "High-security contracting with active Swedish security clearance. Classified-systems development, audits and compliance, CTO and tech-lead consulting.",
    tags: ["Cleared", "Compliance", "CTO"],
  },
  {
    title: "Drones, Autonomous & Mesh",
    body: "UAS / ROV system integration, sensor fusion, edge AI — paired with off-grid comms via Meshtastic / LoRa, APRS and HAM-bridged telemetry pipelines.",
    tags: ["UAS", "LoRa", "APRS", "Edge AI"],
  },
];

/* ── Industries ──────────────────────────────────────────── */
const INDUSTRIES = [
  {
    name: "Harbors & Infrastructure",
    title: "Concrete deterioration across piers, docks, bridges and seawalls.",
    body: "Drone and handheld imagery into measured, ranked defect patterns — without sending divers or rope-access teams in first. The use case Crackz was originally built for.",
    metrics: [["5×", "Faster cycles"], ["90%+", "Validation accuracy"]],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20h18" />
        <path d="M5 20V8h4v12" />
        <path d="M15 20V12h4v8" />
        <path d="M3 14l3-2 3 2" />
        <path d="M13 17l3-2 3 2" />
      </svg>
    ),
  },
  {
    name: "Manufacturing & QA",
    title: "Surface-defect detection on production lines and finished goods.",
    body: "Scratches, voids, weld defects, corrosion, paint failures, casting porosity. Trainable on your taxonomy — multi-class segmentation, not just crack/no-crack. Inline or post-process.",
    metrics: [["Multi-class", "Per-pixel"], ["Sub-second", "Inference"]],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20" />
        <path d="M4 12V8m4 4V6m4 6V4m4 8V6m4 6V8" />
        <path d="M2 18h20" />
      </svg>
    ),
  },
  {
    name: "Industrial & Energy",
    title: "Chemical, refinery, wind, and rail asset integrity.",
    body: "Remote analysis of imagery from maintenance teams, robotic inspectors, or autonomous drones. Predictive maintenance, condition-based renewal — instead of emergency response.",
    metrics: [["~zero", "Confined entries"], ["24/7", "Pipeline ready"]],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20V10l5 3V7l5 4V4l8 16z" />
        <path d="M3 20h18" />
      </svg>
    ),
  },
];

/* ── Other projects (real, from anaxiatech.se) ──────────── */
const PROJECTS = [
  {
    num: "02",
    name: "WreckGame",
    status: "Active",
    statusVariant: "live",
    body: "Unreal Engine ROV training environment for subsea operations. Photogrammetry-captured wreck sites, physics-accurate underwater dynamics, turbidity modelling — mission rehearsal without the boat.",
    bullets: [
      ["Domain", "Defense · Offshore training"],
      ["Stack", "Unreal Engine · C++"],
      ["Status", "In active development"],
    ],
  },
  {
    num: "03",
    name: "Ocean Discovery / SubBaltica",
    status: "Partnership",
    statusVariant: "rnd",
    body: "Long-running partnership with the two sister companies behind the M/S Estonia reinvestigation, the Kraveln (1524) scan, and BBC / Discovery deep-water assignments. We run their IT, camera, networking and 3D-reconstruction pipelines.",
    bullets: [
      ["Domain", "Subsea · Marine archaeology"],
      ["Stack", "Photogrammetry · Sensor fusion"],
      ["Status", "Ongoing"],
    ],
  },
  {
    num: "04",
    name: "meshtop",
    status: "Open source",
    statusVariant: "live",
    body: "Terminal monitor and APRS / GPS bridge for Meshtastic LoRa mesh networks. Off-grid comms tooling for maritime tracking, drone telemetry bridging, and HAM-bridged field operations.",
    bullets: [
      ["Domain", "Mesh radio · Field ops"],
      ["Stack", "Python · LoRa · APRS · BLE"],
      ["Status", "github.com/theresiasnow/meshtop"],
    ],
  },
];

/* ── Components ──────────────────────────────────────────── */

function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav__inner">
        <a href="#top" className="nav__brand">
          <span className="nav__brand-mark"><BrandMark /></span>
          <span>Anaxiatech<span className="nav__brand-tld">.se</span></span>
        </a>
        <div className="nav__links">
          <a href="#crackz">Crackz</a>
          <a href="consulting.html">AI Consulting</a>
          <a href="#capabilities">Services</a>
          <a href="#industries">Industries</a>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
        </div>
        <div className="nav__cta">
          <a href="#contact" className="btn btn--primary">Contact sales</a>
        </div>
      </div>
    </nav>
  );
}

function Hero({ variant }) {
  if (variant === "full") {
    return (
      <header id="top" className="hero hero--full">
        <div className="hero__bg" />
        <div className="hero__copy">
          <span className="eyebrow">Anaxiatech AB · Stockholm</span>
          <h1 className="h1 hero__title">
            Engineering systems<br />
            that work — <span className="accent">above and below the surface.</span>
          </h1>
          <p className="lede hero__lede">
            We build AI-driven defect-detection software for infrastructure and manufacturing.
            Our flagship product, Crackz, is in production across harbors, bridges, factories,
            and energy assets in Northern Europe.
          </p>
          <div className="hero__ctas">
            <a href="#crackz" className="btn btn--primary">Explore Crackz</a>
            <a href="#contact" className="btn btn--ghost">Book a demo</a>
          </div>
          <div className="hero__meta">
            <div className="hero__meta-item">
              <span className="label">Founded</span>
              <span className="value">2022 · Stockholm</span>
            </div>
            <div className="hero__meta-item">
              <span className="label">Domain</span>
              <span className="value">Infrastructure · Manufacturing</span>
            </div>
            <div className="hero__meta-item">
              <span className="label">Delivery</span>
              <span className="value">Source-available</span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (variant === "type") {
    return (
      <header id="top" className="hero hero--type">
        <div className="wrap">
          <div className="hero__grid">
            <div className="hero__copy">
              <span className="eyebrow">Anaxiatech AB · Stockholm</span>
              <h1 className="h1 hero__title">
                Above<br />
                &amp; <span className="accent">below.</span>
              </h1>
              <p className="lede hero__lede">
                AI-driven defect detection for infrastructure and manufacturing. Engineering systems
                that work — built in Stockholm, deployed wherever the asset is.
              </p>
              <div className="hero__ctas">
                <a href="#crackz" className="btn btn--primary">Explore Crackz</a>
                <a href="#contact" className="btn btn--ghost">Book a demo</a>
              </div>
            </div>
            <div className="hero__visual">
              <img src="assets/crackz-logo.png" alt="Crackz brand: cracked stone with electric teal lightning" />
              <div className="hero__visual-overlay">
                <span className="corner"><span className="dot"></span> Detection · live</span>
                <span className="ticks">
                  <span /><span /><span /><span /><span /><span />
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // default: split
  return (
    <header id="top" className="hero">
      <div className="wrap">
        <div className="hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">Anaxiatech AB · Stockholm</span>
            <h1 className="h1 hero__title">
              Engineering systems that work — <span className="accent">above and below the surface.</span>
            </h1>
            <p className="lede hero__lede">
              We build AI-driven defect-detection software for infrastructure and manufacturing.
              Our flagship product, Crackz, is in production across harbors, bridges, factories
              and energy assets — reducing inspection costs by up to 70% while improving safety
              and consistency.
            </p>
            <div className="hero__ctas">
              <a href="#crackz" className="btn btn--primary">Explore Crackz</a>
              <a href="consulting.html" className="btn btn--ghost">AI consulting</a>
            </div>
            <div className="hero__meta">
              <div className="hero__meta-item">
                <span className="label">Founded</span>
                <span className="value">2022 · Stockholm</span>
              </div>
              <div className="hero__meta-item">
                <span className="label">Domain</span>
                <span className="value">Infrastructure · Manufacturing</span>
              </div>
              <div className="hero__meta-item">
                <span className="label">Delivery</span>
                <span className="value">Product · Consulting</span>
              </div>
            </div>
          </div>
          <div className="hero__visual">
            <img src="assets/crackz-logo.png" alt="Crackz brand imagery: cracked stone with electric teal lightning forming an X" />
            <div className="hero__visual-overlay">
              <span className="corner"><span className="dot"></span> Detection · live</span>
              <span className="ticks">
                <span /><span /><span /><span /><span /><span />
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function LogoStrip({ show }) {
  if (!show) return null;
  return (
    <section className="strip">
      <div className="wrap strip__inner">
        <span className="strip__label">Trusted by</span>
        <div className="strip__items">
          <span>SAAB Aurora</span>
          <span className="dot">·</span>
          <span>SAAB Missiles</span>
          <span className="dot">·</span>
          <span>Ericsson</span>
          <span className="dot">·</span>
          <span>Discovery+ / Warner</span>
          <span className="dot">·</span>
          <span>Sony Mobile</span>
          <span className="dot">·</span>
          <span>Telia · Vodafone</span>
        </div>
      </div>
    </section>
  );
}

function Crackz() {
  const [active, setActive] = useState(TOUR_SHOTS[0].id);
  const current = useMemo(() => TOUR_SHOTS.find(s => s.id === active), [active]);

  return (
    <section id="crackz" className="section product">
      <div className="wrap">
        <div className="product__header">
          <div className="product__title">
            <span className="product__title-mark">
              <img src="assets/crackz-logo.png" alt="" />
            </span>
            <div>
              <span className="eyebrow">Flagship product · v0.81</span>
              <h2>Crackz.</h2>
              <p className="product__sub">
                AI-powered defect detection — cracks, corrosion, surface flaws, weld defects.
                Built for harbor and bridge infrastructure; deployed across factories, energy assets
                and manufacturing QA. Desktop, web, and CLI from one source-available codebase.
              </p>
            </div>
          </div>
          <div className="product__copy">
            <p className="lede">
              Process thousands of inspection images in hours instead of weeks. Detect issues before
              they become critical. Document everything for the audit trail.
            </p>
            <div className="hero__ctas">
              <a href="#contact" className="btn btn--primary">Request a demo</a>
              <a href="#tour" className="btn btn--ghost">See the product</a>
            </div>
          </div>
        </div>

        {/* Stats band */}
        <div className="stats">
          <div className="stats__item">
            <div className="stats__value">70<span className="unit">%</span></div>
            <div className="stats__label">Cost reduction</div>
            <div className="stats__caption">vs. traditional manual inspection cycles</div>
          </div>
          <div className="stats__item">
            <div className="stats__value">5<span className="unit">×</span></div>
            <div className="stats__label">Faster cycles</div>
            <div className="stats__caption">on harbor concrete · generalises to other surfaces</div>
          </div>
          <div className="stats__item">
            <div className="stats__value">90<span className="unit">%+</span></div>
            <div className="stats__label">Detection accuracy</div>
            <div className="stats__caption">on validation datasets, binary segmentation</div>
          </div>
          <div className="stats__item">
            <div className="stats__value">$25–75<span className="unit">K</span></div>
            <div className="stats__label">Annual savings</div>
            <div className="stats__caption">typical per inspection program</div>
          </div>
        </div>

        {/* GUI tour */}
        <div id="tour" className="tour">
          <div className="tour__head">
            <div>
              <span className="eyebrow">Product tour</span>
              <h3 className="h2" style={{ marginTop: 10 }}>The desktop app, end to end.</h3>
            </div>
            <div className="tour__tabs" role="tablist">
              {TOUR_SHOTS.map(s => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={active === s.id}
                  className={`tour__tab ${active === s.id ? "active" : ""}`}
                  onClick={() => setActive(s.id)}
                >
                  <span className="glyph">{s.glyph}</span>
                  {s.tab}
                </button>
              ))}
            </div>
          </div>

          <div className="tour__viewport">
            <div className="tour__window-chrome">
              <div className="dots"><span /><span /><span /></div>
              <span className="title mono">{current.chrome}</span>
            </div>
            <img className="tour__shot" src={current.src} alt={current.title} />
            <div className="tour__caption">
              <div>
                <h4>{current.title}</h4>
                <p>{current.desc}</p>
              </div>
              <div className="tour__caption-meta">
                {current.meta.map(([k, v]) => (
                  <div className="row" key={k}>
                    <span className="k">{k}</span>
                    <span className="v">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Workflow */}
        <div className="workflow">
          <div className="workflow__step">
            <h4>Import</h4>
            <p>Drop in infrastructure, manufacturing or facility imagery. Automatic raw/train/val/test split, EXIF preserved end-to-end.</p>
            <div className="cmd"><span className="prompt">$</span>crackz import-images --src ./photos</div>
          </div>
          <div className="workflow__step">
            <h4>Annotate</h4>
            <p>Mask editor with brush, propagation across image series, and category-aware multi-class taxonomies.</p>
            <div className="cmd"><span className="prompt">›</span>Tools → Mask Editor</div>
          </div>
          <div className="workflow__step">
            <h4>Train</h4>
            <p>SegFormer-B2 by default; swap encoders, override hyperparameters at runtime. PyTorch Lightning underneath.</p>
            <div className="cmd"><span className="prompt">$</span>crackz train --epochs 20</div>
          </div>
          <div className="workflow__step">
            <h4>Detect</h4>
            <p>Run across thousands of images. Severity buckets, annotated PNGs, GeoJSON output ready for QGIS or GIS pipelines.</p>
            <div className="cmd"><span className="prompt">$</span>crackz detect run</div>
          </div>
        </div>

        {/* Deployment paths */}
        <div className="paths">
          <article className="path path--featured">
            <span className="path__tag">Fastest path</span>
            <h3 className="h3">Use pre-trained models</h3>
            <p>Quick deployment with ready-made checkpoints. Suited to standard crack-detection scenarios across concrete and steel.</p>
            <ul>
              <li>Production-ready in days, not quarters</li>
              <li>Consistent results across sites and inspectors</li>
              <li>Zero training data required to start</li>
            </ul>
          </article>
          <article className="path">
            <span className="path__tag">Most accurate</span>
            <h3 className="h3">Train custom models</h3>
            <p>Maximum accuracy for your domain — bespoke imagery, unusual defect types, multi-class taxonomies.</p>
            <ul>
              <li>100 images for a pilot; 500+ for production-grade</li>
              <li>Domain-specific defect categories</li>
              <li>Active-learning loop to reduce annotation cost</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

function ConsultingPromo() {
  return (
    <section id="consulting" className="promo">
      <div className="wrap promo__inner">
        <div className="promo__copy">
          <span className="eyebrow">AI Consulting · day job</span>
          <h2 className="promo__title">
            Crackz is our product. <span className="accent">Consulting is what we do every day.</span>
          </h2>
          <p className="promo__lede">
            Anaxiatech is led by a senior systems architect with 30+ years of experience.
            We take on focused AI engagements for organisations that need a serious answer to
            a serious question — defense, infrastructure, manufacturing, R&amp;D.
          </p>
          <p className="promo__lede" style={{ color: "var(--fg-3)" }}>
            Active Swedish security clearance · past clients include SAAB, Ericsson, Discovery+ / Warner.
            Fixed-scope pilots from €18,000 · production sprints from €65,000 · embedded retainers.
          </p>
          <div className="promo__ctas">
            <a href="consulting.html" className="btn btn--primary">See AI consulting</a>
            <a href="mailto:theresia.lundgren@anaxiatech.se?subject=Consulting%20enquiry" className="btn btn--ghost">Email Theresia</a>
          </div>
        </div>

        <ul className="promo__list">
          <li>
            <a href="consulting.html#engagements" style={{ display: "contents", color: "inherit" }}>
              <span className="ix">01</span>
              <span className="body">
                <strong>AI Pilot · 2 weeks</strong>
                <span>Proof on your data. One ML question, answered with numbers.</span>
              </span>
              <span className="arrow">→</span>
            </a>
          </li>
          <li>
            <a href="consulting.html#engagements" style={{ display: "contents", color: "inherit" }}>
              <span className="ix">02</span>
              <span className="body">
                <strong>Production AI Sprint · 8 weeks</strong>
                <span>Ship a vertical slice of production ML — model, infra, UI.</span>
              </span>
              <span className="arrow">→</span>
            </a>
          </li>
          <li>
            <a href="consulting.html#engagements" style={{ display: "contents", color: "inherit" }}>
              <span className="ix">03</span>
              <span className="body">
                <strong>Embedded AI Engineer · monthly</strong>
                <span>Senior ML capacity without hiring a new headcount.</span>
              </span>
              <span className="arrow">→</span>
            </a>
          </li>
          <li>
            <a href="consulting.html#services" style={{ display: "contents", color: "inherit" }}>
              <span className="ix">04</span>
              <span className="body">
                <strong>AI strategy &amp; build/buy · 2 days</strong>
                <span>A defensible second opinion before you spend the budget.</span>
              </span>
              <span className="arrow">→</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="capabilities" className="section">
      <div className="wrap">
        <div className="section-head">
          <div className="section-head__copy">
            <span className="eyebrow">What we build</span>
            <h2 className="h2">Engineering for systems that must not fail.</h2>
            <p className="lede">
              We're a small Stockholm team building production AI for defect detection — across
              infrastructure inspection, manufacturing QA, and energy assets. Crackz is the flagship;
              the capabilities behind it are available for engagement.
            </p>
          </div>
        </div>

        <div className="caps">
          {CAPS.map((c, i) => (
            <div className="cap" key={c.title}>
              <span className="cap__index">{String(i + 1).padStart(2, "0")} / {String(CAPS.length).padStart(2, "0")}</span>
              <div className="cap__title">{c.title}</div>
              <div className="cap__body">{c.body}</div>
              <div className="cap__tags">
                {c.tags.map(t => <span className="cap__tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section id="industries" className="section section--tight" style={{ background: "var(--bg-mantle)", borderTop: "1px solid var(--surface-0)", borderBottom: "1px solid var(--surface-0)" }}>
      <div className="wrap">
        <div className="section-head">
          <div className="section-head__copy">
            <span className="eyebrow">Where Crackz runs</span>
            <h2 className="h2">Built for the field, the line, and the audit.</h2>
          </div>
        </div>
        <div className="industries">
          {INDUSTRIES.map(ind => (
            <article className="industry" key={ind.name}>
              <div className="industry__top">
                <div className="industry__icon">{ind.icon}</div>
                <span className="industry__name">{ind.name}</span>
              </div>
              <h4>{ind.title}</h4>
              <p>{ind.body}</p>
              <div className="industry__metrics">
                {ind.metrics.map(([n, l]) => (
                  <div className="industry__metric" key={l}>
                    <div className="num">{n}</div>
                    <div className="lbl">{l}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section section--tight">
      <div className="wrap">
        <div className="section-head">
          <div className="section-head__copy">
            <span className="eyebrow">Adjacent work</span>
            <h2 className="h2">Other projects from the lab.</h2>
            <p className="lede">
              Crackz is the commercial product. These are the research and tooling efforts
              that feed back into it — marine archaeology, 3D mesh tooling, and other custom systems.
            </p>
          </div>
        </div>
        <div className="projects">
          {/* Crackz pinned first */}
          <article className="proj">
            <div className="proj__head">
              <span className="proj__num">01</span>
              <span className="proj__status proj__status--live">In production</span>
            </div>
            <h3>Crackz</h3>
            <p>Commercial source-available AI defect-detection software — infrastructure and manufacturing. Desktop · web · CLI · Docker.</p>
            <ul className="proj__bullets">
              <li><span className="k">Domain</span> Infrastructure AI</li>
              <li><span className="k">Stack</span> PySide6 · PyTorch · Streamlit</li>
              <li><span className="k">License</span> Commercial source-available</li>
            </ul>
          </article>
          {PROJECTS.map(p => (
            <article className="proj" key={p.name}>
              <div className="proj__head">
                <span className="proj__num">{p.num}</span>
                <span className={`proj__status proj__status--${p.statusVariant}`}>{p.status}</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.body}</p>
              <ul className="proj__bullets">
                {p.bullets.map(([k, v]) => (
                  <li key={k}><span className="k">{k}</span> {v}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="wrap about">
        <div className="section-head__copy" style={{ alignSelf: "start" }}>
          <span className="eyebrow">About Anaxiatech</span>
          <h2 className="h2">A Stockholm engineering studio.</h2>
        </div>
        <div className="about__copy">
          <p>
            Anaxiatech AB is a Swedish technology company — founded and led by Theresia Lundgren, a systems
            architect with 30+ years of experience across AI, DevSecOps and applied R&amp;D. We design and
            ship production software for problems where the wrong answer is expensive: infrastructure
            inspection, manufacturing QA, defense systems, marine archaeology.
          </p>
          <div className="about__signature">
            "Engineering systems that work — above and below the surface."
          </div>
          <p>
            Hands-on work, end to end: we write the model code, ship the desktop app, run the Azure Batch
            jobs, and sit with operators while they review the results. Past and current clients include
            SAAB, Ericsson, Discovery+ / Warner Brothers, and Swedish government agencies. Long-running
            technical partnership with Ocean Discovery AB and SubBaltica AB on subsea expeditions.
          </p>
          <div className="about__meta">
            <div className="about__meta-item">
              <span className="k">Based in</span>
              <span className="v">Stockholm · Västervik</span>
            </div>
            <div className="about__meta-item">
              <span className="k">Org. nr</span>
              <span className="v mono">556673-0056</span>
            </div>
            <div className="about__meta-item">
              <span className="k">Experience </span>
              <span className="v">30+ years</span>
            </div>
            <div className="about__meta-item">
              <span className="k">Lead product</span>
              <span className="v">Crackz</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section id="contact" className="section section--tight">
      <div className="wrap">
        <div className="cta">
          <div className="cta__bg" />
          <div className="cta__inner">
            <div>
              <span className="eyebrow">Talk to us</span>
              <h2 className="h2" style={{ marginTop: 14 }}>Bring Crackz into your inspection or QA program.</h2>
              <p className="cta__lede">
                Pricing, proof-of-concept projects, enterprise support, and on-prem licensing.
                We respond within one business day.
              </p>
            </div>
            <div className="cta__contact">
              <div>
                <div className="cta__contact-label">Email · Theresia Lundgren</div>
                <div className="cta__email">theresia.lundgren@anaxiatech.se</div>
              </div>
              <a href="mailto:theresia.lundgren@anaxiatech.se?subject=Crackz%20enterprise%20enquiry" className="btn btn--primary">
                Open in mail
              </a>
              <div className="cta__rows">
                <div className="cta__row"><span className="k">Based in</span><span>Stockholm · Västervik</span></div>
                <div className="cta__row"><span className="k">Response</span><span>Within 1 business day</span></div>
                <div className="cta__row"><span className="k">Licensing</span><span>Commercial source-available</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div>
            <div className="footer__brand">Anaxiatech AB</div>
            <p className="kicker" style={{ marginTop: 10, maxWidth: "38ch" }}>
              Engineering systems that work — above and below the surface. Stockholm-based.
            </p>
          </div>
          <div className="footer__col">
            <h5>Product</h5>
            <ul>
              <li><a href="#crackz">Crackz</a></li>
              <li><a href="#tour">Product tour</a></li>
              <li><a href="#industries">Industries</a></li>
              <li><a href="#contact">Pricing</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h5>Company</h5>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#capabilities">Capabilities</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h5>Resources</h5>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">GitHub (private)</a></li>
              <li><a href="#">Release notes</a></li>
              <li><a href="#">License</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Anaxiatech AB · Org.nr 556673-0056</span>
          <span>Crackz™ is a trademark of Anaxiatech AB</span>
        </div>
      </div>
    </footer>
  );
}

/* ── Map accent label → swatch ──────────────────────────── */
const ACCENT_OPTIONS = ["#5eead4", "#cba6f7", "#fab387"];
const HEX_TO_LABEL = { "#5eead4": "aqua", "#cba6f7": "mauve", "#fab387": "amber" };
const LABEL_TO_HEX = { aqua: "#5eead4", mauve: "#cba6f7", amber: "#fab387" };

/* ── Root ────────────────────────────────────────────────── */
function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", t.accent);
    document.documentElement.setAttribute("data-density", t.density);
    document.documentElement.setAttribute("data-layout", t.layout);
  }, [t.accent, t.density, t.layout]);

  const accentHex = LABEL_TO_HEX[t.accent] || ACCENT_OPTIONS[0];

  return (
    <>
      <Nav />
      <Hero variant={t.heroVariant} />
      <LogoStrip show={t.showLogos} />
      <Crackz />
      <ConsultingPromo />
      <Capabilities />
      <Industries />
      <Projects />
      <About />
      <ContactCTA />
      <Footer />
      <window.TweaksPanel>
        <window.TweakSection label="Hero" />
        <window.TweakRadio
          label="Variant"
          value={t.heroVariant}
          onChange={(v) => setTweak("heroVariant", v)}
          options={[
            { value: "split", label: "Split" },
            { value: "full", label: "Full" },
            { value: "type", label: "Type" },
          ]}
        />
        <window.TweakSection label="Theme" />
        <window.TweakColor
          label="Accent"
          value={accentHex}
          options={ACCENT_OPTIONS}
          onChange={(hex) => setTweak("accent", HEX_TO_LABEL[hex] || "aqua")}
        />
        <window.TweakRadio
          label="Density"
          value={t.density}
          onChange={(v) => setTweak("density", v)}
          options={[
            { value: "spacious", label: "Spacious" },
            { value: "compact", label: "Compact" },
          ]}
        />
        <window.TweakRadio
          label="Layout"
          value={t.layout}
          onChange={(v) => setTweak("layout", v)}
          options={[
            { value: "default", label: "Default" },
            { value: "visual", label: "Visual" },
            { value: "text-heavy", label: "Text" },
          ]}
        />
        <window.TweakToggle
          label="Tech strip"
          value={t.showLogos}
          onChange={(v) => setTweak("showLogos", v)}
        />
      </window.TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
