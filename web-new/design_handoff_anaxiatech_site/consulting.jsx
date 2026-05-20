/* ── Anaxiatech · Consulting page ─────────────────────────── */
const { useState, useEffect } = React;

const CONS_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "aqua",
  "density": "spacious",
  "showFaq": true,
  "showStack": true
}/*EDITMODE-END*/;

const CONS_ACCENT_OPTIONS = ["#5eead4", "#cba6f7", "#fab387"];
const CONS_HEX_TO_LABEL = { "#5eead4": "aqua", "#cba6f7": "mauve", "#fab387": "amber" };
const CONS_LABEL_TO_HEX = { aqua: "#5eead4", mauve: "#cba6f7", amber: "#fab387" };

const ConsBrandMark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
    <path d="M3 4 L11 12 L7 12 L17 21" />
    <path d="M14 3 L21 10" opacity="0.5" />
  </svg>
);

/* ── Data ────────────────────────────────────────────────── */

const SERVICES = [
  {
    title: "Production segmentation & detection",
    one: "From research notebook to model that runs every Tuesday at 03:00.",
    body: "We've shipped real-world segmentation pipelines processing thousands of inspection and QA images per run. We know where the failure modes are: dataset shift, label noise, overconfident models on rare classes, ONNX export gotchas, why your A100 is sitting idle.",
    deliver: ["Model architecture", "Training loops", "Eval harness", "Active learning", "ONNX / CUDA / ROCm", "Production inference"],
  },
  {
    title: "AI for inspection & QA",
    one: "Computer vision for the things that matter when they break.",
    body: "Defect detection, crack and corrosion segmentation, weld and casting inspection, surface-finish QA. The vertical we know cold — Crackz is the public version. We can build the private version for your domain in 8–12 weeks.",
    deliver: ["Crack · corrosion · spalling", "Multi-class taxonomies", "GPS / EXIF traceability", "Severity scoring", "Audit-grade reports", "On-prem or cloud"],
  },
  {
    title: "LLM & agent integration",
    one: "Practical RAG and tool-use, not demoware.",
    body: "Where LLMs actually earn their keep: structured extraction from technical reports, RAG over engineering knowledge bases, agentic workflows for code review and triage. We pick the model that fits, not the one in the press release.",
    deliver: ["RAG pipelines", "Tool use · MCP", "Prompt caching", "Eval harnesses", "pgvector / Chroma", "Anthropic · OpenAI · Ollama"],
  },
  {
    title: "MLOps & model lifecycle",
    one: "The boring infrastructure that decides if it ships.",
    body: "Training pipelines that retrain on schedule, evaluation that catches regressions before users do, deployment that survives the model getting bigger every six months. Azure Batch, Lightning Studios, self-hosted runners for sensitive data.",
    deliver: ["Azure Batch training", "Model registry", "Eval gating", "Continuous retraining", "TensorBoard · W&B", "On-prem GPU clusters"],
  },
  {
    title: "AI strategy & build/buy",
    one: "A senior second opinion before you spend the budget.",
    body: "Should you fine-tune, RAG, prompt, or just buy the API? Two-day discovery engagements for technical leaders who need a defensible answer for the board. We map the option space, cost each path, and write up the recommendation.",
    deliver: ["Use-case discovery", "Build vs. buy analysis", "Cost modelling", "Vendor evaluation", "Roadmap", "Hiring plan"],
  },
  {
    title: "Simulation & synthetic data",
    one: "Unreal-based environments where real data is scarce.",
    body: "For domains where you can't easily collect a thousand labelled images — underwater, defense, hazardous, pre-production manufacturing — we generate it. Photogrammetry-driven training data, ROV simulation, reinforcement-learning environments.",
    deliver: ["Unreal Engine", "Photogrammetry", "Domain randomisation", "Synthetic datasets", "Sim-to-real transfer", "RL environments"],
  },
];

const ENGAGEMENTS = [
  {
    num: "Model 01",
    title: "AI Pilot",
    sub: "A focused two-week proof on your data. We pick one ML question, we answer it with numbers.",
    priceFrom: "From",
    priceValue: "€18,000",
    priceNote: "Fixed scope · 2 weeks",
    items: [
      "Discovery + use-case scoping",
      "Working prototype on your data",
      "Quantified results: precision, recall, F1, latency, cost",
      "Recommendation: ship / iterate / abandon",
      "Source code and trained weights, yours to keep",
    ],
  },
  {
    num: "Model 02",
    title: "Production AI Sprint",
    sub: "An eight-week engagement to ship a vertical slice of production ML — model, infra, and a UI to drive it.",
    priceFrom: "From",
    priceValue: "€65,000",
    priceNote: "8 weeks · deliverable",
    items: [
      "Everything in AI Pilot",
      "Production inference (cloud or on-prem)",
      "Retraining pipeline + eval gating",
      "Operator-facing UI or API",
      "Documentation + handover",
      "Two weeks of post-launch support",
    ],
    featured: true,
  },
  {
    num: "Model 03",
    title: "Embedded AI Engineer",
    sub: "Ongoing senior ML capacity for teams that need depth without hiring a new headcount.",
    priceFrom: "From",
    priceValue: "€12,000",
    priceNote: "Monthly retainer",
    items: [
      "Dedicated senior ML engineer",
      "Sprint planning + model reviews",
      "Architecture office hours",
      "On-call for production incidents",
      "Roadmap input",
      "Quarterly review and renewal",
    ],
  },
];

const PHASES = [
  { num: "01", name: "Discover", title: "Frame the question", body: "One call to find the actual ML question hiding inside the business question. We say no if it shouldn't be an ML problem.", time: "Week 0" },
  { num: "02", name: "Prototype", title: "Train & evaluate", body: "Working model on your data with honest numbers — precision, recall, F1, calibration, where it fails and why.", time: "Weeks 1–2" },
  { num: "03", name: "Productionise", title: "Ship & integrate", body: "Inference pipeline, retraining, eval gating, monitoring. The boring half that decides if the model survives a quarter in production.", time: "Weeks 3–7" },
  { num: "04", name: "Handover", title: "Embed & document", body: "Documentation, runbooks, two weeks of warranty support, and an optional retainer for the first retraining cycle.", time: "Week 8+" },
];

const STACK = [
  {
    title: "Models & training",
    items: [
      ["PyTorch Lightning", "core"],
      ["SegFormer (B0–B5)", "core"],
      ["U-Net (20+ encoders)", "core"],
      ["Hugging Face", "core"],
      ["scikit-learn", "support"],
      ["OpenCV · Polars", "support"],
    ],
  },
  {
    title: "LLMs & agents",
    items: [
      ["Claude (Anthropic)", "core"],
      ["OpenAI APIs", "core"],
      ["MCP · tool use", "core"],
      ["pgvector · Chroma", "core"],
      ["LangChain · LlamaIndex", "support"],
      ["Ollama (local)", "support"],
    ],
  },
  {
    title: "Inference & infra",
    items: [
      ["ONNX Runtime", "core"],
      ["Azure Batch", "core"],
      ["Docker (CPU + GPU)", "core"],
      ["Self-hosted runners", "core"],
      ["TensorBoard · W&B", "support"],
      ["Kubernetes", "support"],
    ],
  },
  {
    title: "Languages",
    items: [
      ["Python 3.13", "core"],
      ["TypeScript", "core"],
      ["C++ (Unreal, Qt)", "core"],
      ["YAML / Pydantic", "support"],
      ["SQL", "support"],
      ["Go · Java", "support"],
    ],
  },
];

const FAQS = [
  {
    q: "Is my problem actually an ML problem?",
    a: "Often no. The two-week AI Pilot exists partly to answer this honestly. Plenty of \"AI projects\" are better solved by a rules engine, a different sensor, or fixing the upstream data quality. If that's the answer, we'll say so — it's cheaper for you and saves a quarter of disappointment.",
  },
  {
    q: "How much data do we need?",
    a: "For segmentation / detection: 100 labelled images for a viable pilot, 200–300 for decent accuracy, 500+ for production-grade on a single class. Multi-class taxonomies need more. We can also generate synthetic data via Unreal-based simulation when real data is scarce or hazardous to collect.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. We default to a mutual NDA before any data or model weights are shared. Discovery calls don't require one — we don't need your IP to tell you if we're a fit.",
  },
  {
    q: "Can you work on classified or air-gapped systems?",
    a: "Yes — the lead has active Swedish security clearance and we run engagements behind firewalls and on customer hardware regularly. We're set up for it: source-available delivery, self-hosted runners, on-prem deployment patterns we use day-to-day.",
  },
  {
    q: "Who owns the trained model?",
    a: "You do. Trained weights, training data, fine-tunes, prompts, agents, evals — yours. We retain rights to general patterns, internal tooling, and any pre-existing components we bring in. Specifics in the engagement contract.",
  },
  {
    q: "Will you teach our team while you build?",
    a: "Yes — knowledge transfer is part of every engagement. We pair with your engineers, code in the open, write the docs while we work, and leave behind a model your team can retrain six months later without us.",
  },
];

/* ── Components ──────────────────────────────────────────── */

function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav__inner">
        <a href="index.html" className="nav__brand">
          <span className="nav__brand-mark"><ConsBrandMark /></span>
          <span>Anaxiatech<span className="nav__brand-tld">.se</span></span>
        </a>
        <div className="nav__links">
          <a href="index.html#crackz">Crackz</a>
          <a href="consulting.html" className="is-current">AI Consulting</a>
          <a href="index.html#capabilities">Services</a>
          <a href="index.html#industries">Industries</a>
          <a href="index.html#projects">Projects</a>
          <a href="index.html#about">About</a>
        </div>
        <div className="nav__cta">
          <a href="#contact" className="btn btn--primary">Contact sales</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header id="top" className="cons-hero">
      <div className="wrap">
        <div className="cons-hero__grid">
          <div className="cons-hero__copy">
            <span className="eyebrow">Anaxiatech AI consulting</span>
            <h1 className="h1 cons-hero__title">
              Senior AI engineering, <span className="accent">for the problems where the wrong answer is expensive.</span>
            </h1>
            <p className="lede">
              We're the team that built Crackz. We take on AI consulting engagements in computer vision,
              LLM integration, and production ML — for organisations that need a serious answer to a
              serious question. No staff augmentation. No PowerPoint. Working models, shipped.
            </p>
            <div className="hero__ctas">
              <a href="#engagements" className="btn btn--primary">See engagement models</a>
              <a href="#contact" className="btn btn--ghost">Talk to us</a>
            </div>
            <div className="cons-hero__meta">
              <div className="cons-hero__meta-item">
                <span className="label">Focus</span>
                <span className="value">Applied AI / ML</span>
              </div>
              <div className="cons-hero__meta-item">
                <span className="label">Team</span>
                <span className="value">Stockholm · EU remote</span>
              </div>
              <div className="cons-hero__meta-item">
                <span className="label">Clearance</span>
                <span className="value">Swedish gov, active</span>
              </div>
            </div>
          </div>

          <div className="cons-hero__visual">
            <div className="cons-hero__visual-head">
              <span><span className="dot"></span>Available · Q3 2026</span>
              <span>04 / 04 lanes</span>
            </div>
            <div className="cons-hero__visual-body">
              <div className="cons-pill is-active">
                <span className="num">CV-01</span>
                <span className="label">Computer vision pilots</span>
                <span className="tail">2 wks</span>
              </div>
              <div className="cons-pill">
                <span className="num">LLM-02</span>
                <span className="label">LLM &amp; agent integration</span>
                <span className="tail">2–6 wks</span>
              </div>
              <div className="cons-pill">
                <span className="num">PRD-03</span>
                <span className="label">Production ML sprints</span>
                <span className="tail">8 wks</span>
              </div>
              <div className="cons-pill">
                <span className="num">EMB-04</span>
                <span className="label">Embedded AI engineer</span>
                <span className="tail">Monthly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Services() {
  return (
    <section id="services" className="section">
      <div className="wrap">
        <div className="section-head">
          <div className="section-head__copy">
            <span className="eyebrow">What we do</span>
            <h2 className="h2">Six AI engagements, done at production depth.</h2>
            <p className="lede">
              Every service below has shipped to a paying customer. We don't list capabilities we haven't
              taken all the way through to deployment, retraining, and the next-quarter review.
            </p>
          </div>
        </div>

        <div className="services">
          {SERVICES.map((s, i) => (
            <article className="service" key={s.title}>
              <div className="service__head">
                <span className="service__num">{String(i + 1).padStart(2, "0")}</span>
                <div className="service__title-block">
                  <h3 className="service__title">{s.title}</h3>
                  <div className="service__one">{s.one}</div>
                </div>
              </div>
              <p className="service__body">{s.body}</p>
              <div className="service__deliver">
                <span className="service__deliver-label">What you walk away with</span>
                <ul>
                  {s.deliver.map(d => <li key={d}>{d}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Engagements() {
  return (
    <section id="engagements" className="section section--tight" style={{ background: "var(--bg-mantle)", borderTop: "1px solid var(--surface-0)", borderBottom: "1px solid var(--surface-0)" }}>
      <div className="wrap">
        <div className="section-head">
          <div className="section-head__copy">
            <span className="eyebrow">How we engage</span>
            <h2 className="h2">Three ways to bring AI in.</h2>
            <p className="lede">
              Fixed-scope, fixed-price for the first phase. Continue on a retainer if it's working. We don't
              do staff augmentation, hourly billing, or open-ended scopes.
            </p>
          </div>
        </div>
        <div className="engagements">
          {ENGAGEMENTS.map(e => (
            <article className={`eng ${e.featured ? "eng--feat" : ""}`} key={e.title}>
              <span className="eng__num">{e.num}</span>
              <h3 className="eng__title">{e.title}</h3>
              <p className="eng__sub">{e.sub}</p>
              <div className="eng__price">
                <div className="eng__price-value"><span className="from">{e.priceFrom}</span>{e.priceValue}</div>
                <div className="eng__price-note">{e.priceNote}</div>
              </div>
              <ul className="eng__list">
                {e.items.map(it => <li key={it}>{it}</li>)}
              </ul>
              <a href="#contact" className={`btn ${e.featured ? "btn--primary" : "btn--ghost"}`}>Discuss this</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section section--tight">
      <div className="wrap">
        <div className="section-head">
          <div className="section-head__copy">
            <span className="eyebrow">How we work</span>
            <h2 className="h2">Four phases, no surprises.</h2>
            <p className="lede">
              Every AI engagement runs through the same shape, whether it's a two-week Pilot or a twelve-month
              embedded relationship. Predictable rhythm is part of the deliverable.
            </p>
          </div>
        </div>
        <div className="process">
          {PHASES.map(p => (
            <div className="phase" key={p.num}>
              <div className="phase__marker">{p.num}</div>
              <span className="phase__name">{p.name}</span>
              <h4 className="phase__title">{p.title}</h4>
              <p className="phase__body">{p.body}</p>
              <span className="phase__time">{p.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  return (
    <section className="section section--tight" style={{ background: "var(--bg-mantle)", borderTop: "1px solid var(--surface-0)", borderBottom: "1px solid var(--surface-0)" }}>
      <div className="wrap">
        <div className="section-head">
          <div className="section-head__copy">
            <span className="eyebrow">Proof of work</span>
            <h2 className="h2">The same team built Crackz.</h2>
            <p className="lede">
              Our flagship product is also our biggest case study. Three years of decisions about model
              architecture, desktop UI, deployment, licensing, and support — most of which we'd make again.
            </p>
          </div>
        </div>
        <div className="case">
          <div className="case__media">
            <span className="case__media-tag">Case study · 2022 – present</span>
          </div>
          <div className="case__body">
            <h3>Crackz — AI defect detection for infrastructure &amp; manufacturing</h3>
            <p>
              From research notebook to commercial source-available product. SegFormer-based segmentation
              pipeline, PySide6 desktop application with mask editor, Streamlit web dashboard, CLI, Docker
              images, Azure Batch deployment, and a documentation site that asset owners and line
              operators actually read.
            </p>
            <p>
              Crackz is in production with infrastructure managers and manufacturing teams across Northern
              Europe, reducing inspection cost by up to 70% and producing audit-grade documentation that
              wasn't possible with manual workflows.
            </p>
            <div className="case__meta">
              <div className="case__meta-item">
                <span className="v">3 yrs</span>
                <span className="k">From spike to ship</span>
              </div>
              <div className="case__meta-item">
                <span className="v">4 surfaces</span>
                <span className="k">Desktop · web · CLI · Docker</span>
              </div>
              <div className="case__meta-item">
                <span className="v">90%+</span>
                <span className="k">Detection accuracy</span>
              </div>
            </div>
            <div style={{ marginTop: "auto", paddingTop: 16 }}>
              <a href="index.html#crackz" className="btn btn--ghost">Read more about Crackz</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stack({ show }) {
  if (!show) return null;
  return (
    <section className="section section--tight">
      <div className="wrap">
        <div className="section-head">
          <div className="section-head__copy">
            <span className="eyebrow">Tools of the trade</span>
            <h2 className="h2">The stack we know cold.</h2>
            <p className="lede">
              These are the technologies we've shipped to production with paying customers. We don't gate
              engagements on stack — but if you're already here, we can skip the warm-up phase.
            </p>
          </div>
        </div>
        <div className="stack">
          {STACK.map(s => (
            <div className="stack__col" key={s.title}>
              <div className="stack__title">{s.title}</div>
              <ul className="stack__list">
                {s.items.map(([name, level]) => (
                  <li key={name}>
                    <span>{name}</span>
                    <span className="pri" style={level === "support" ? { color: "var(--fg-3)" } : null}>{level}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq({ show }) {
  if (!show) return null;
  return (
    <section className="section section--tight">
      <div className="wrap">
        <div className="section-head">
          <div className="section-head__copy">
            <span className="eyebrow">Frequently asked</span>
            <h2 className="h2">The questions that come up early.</h2>
          </div>
        </div>
        <div className="faq">
          {FAQS.map(f => (
            <div className="faq__item" key={f.q}>
              <h4>{f.q}</h4>
              <p>{f.a}</p>
            </div>
          ))}
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
              <span className="eyebrow">Start the conversation</span>
              <h2 className="h2" style={{ marginTop: 14 }}>One discovery call, no NDA required.</h2>
              <p className="cta__lede">
                Tell us about the problem in 2–3 sentences. If it's a fit, we'll schedule a 30-minute
                discovery call within the week. If it isn't, we'll usually know someone who is.
              </p>
            </div>
            <div className="cta__contact">
              <div>
                <div className="cta__contact-label">Email · Theresia Lundgren</div>
                <div className="cta__email">theresia.lundgren@anaxiatech.se</div>
              </div>
              <a href="mailto:theresia.lundgren@anaxiatech.se?subject=Consulting%20enquiry" className="btn btn--primary">
                Open in mail
              </a>
              <div className="cta__rows">
                <div className="cta__row"><span className="k">Engagements</span><span>2 wks – 12+ months</span></div>
                <div className="cta__row"><span className="k">Response</span><span>Within 1 business day</span></div>
                <div className="cta__row"><span className="k">Based in</span><span>Stockholm · Västervik</span></div>
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
              <li><a href="index.html#crackz">Crackz</a></li>
              <li><a href="index.html#tour">Product tour</a></li>
              <li><a href="index.html#industries">Industries</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h5>Consulting</h5>
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#engagements">Engagement models</a></li>
              <li><a href="#contact">Get in touch</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h5>Company</h5>
            <ul>
              <li><a href="index.html#about">About</a></li>
              <li><a href="index.html#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Anaxiatech AB · Org.nr 556673-0056</span>
          <span>Stockholm · Sverige</span>
        </div>
      </div>
    </footer>
  );
}

/* ── Root ────────────────────────────────────────────────── */
function App() {
  const [t, setTweak] = window.useTweaks(CONS_TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", t.accent);
    document.documentElement.setAttribute("data-density", t.density);
  }, [t.accent, t.density]);

  const accentHex = CONS_LABEL_TO_HEX[t.accent] || CONS_ACCENT_OPTIONS[0];

  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Engagements />
      <Process />
      <CaseStudy />
      <Stack show={t.showStack} />
      <Faq show={t.showFaq} />
      <ContactCTA />
      <Footer />
      <window.TweaksPanel>
        <window.TweakSection label="Theme" />
        <window.TweakColor
          label="Accent"
          value={accentHex}
          options={CONS_ACCENT_OPTIONS}
          onChange={(hex) => setTweak("accent", CONS_HEX_TO_LABEL[hex] || "aqua")}
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
        <window.TweakSection label="Sections" />
        <window.TweakToggle
          label="Stack matrix"
          value={t.showStack}
          onChange={(v) => setTweak("showStack", v)}
        />
        <window.TweakToggle
          label="FAQ"
          value={t.showFaq}
          onChange={(v) => setTweak("showFaq", v)}
        />
      </window.TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
