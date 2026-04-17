import { useState, useEffect } from "react";
import { useInView } from "./hooks/useInView";
import { Sparkline } from "./components/Sparkline";
import { Avatar } from "./components/Avatar";
import { 
  STATS, SERVICES, PROJECTS, PROCESS, 
  TESTIMONIALS, FAQS, INDUSTRIES, NAV_LINKS 
} from "./data/constants";

// The extracted styles. Make sure `App.css` is in the same directory, or adjust the path.
import "./App.css";

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeProj, setActiveProj] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hero     = useInView(0.05);
  const stats    = useInView(0.1);
  const about    = useInView(0.1);
  const services = useInView(0.08);
  const work     = useInView(0.05);
  const process  = useInView(0.08);
  const testi    = useInView(0.1);
  const faq      = useInView(0.08);
  const contact  = useInView(0.08);

  const v = (s: { inView: boolean }) => s.inView;

  return (
    <>
      {/* ══ NAVBAR ══ */}
      <nav className={`nav ${scrollY > 40 ? "scrolled" : ""}`}>
        <a href="#" className="nav-logo">
          <img src="/partha_logo.png" alt="Partha Logo" style={{ height: "24px", width: "auto", display: "block" }} />
        </a>
        <ul className="nav-links">
          {NAV_LINKS.map(n => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}
        </ul>
        <a href="#contact" className="nav-cta">Book a Call</a>
        <button className="nav-burger" onClick={() => setNavOpen(!navOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* ══ HERO ══ */}
      <section className="hero" ref={hero.ref}>
        <div className={`hero-left ${v(hero) ? "vis" : ""}`}>
          <div className="hero-tag">Google Ads Specialist</div>
          <h1 className="hero-h1">
            Turning Ad Spend<br />
            Into <em>Real</em> Revenue
          </h1>
          <p className="hero-sub">
            I'm <strong>Partha Devnath</strong> — a performance marketing specialist with <strong>6+ years</strong> managing Google Ads for D2C brands, SaaS companies, and local businesses globally.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Book a Free Audit →</a>
            <a href="#work"    className="btn-ghost">View Case Studies</a>
          </div>
        </div>
        <div className={`hero-right ${v(hero) ? "vis" : ""}`}>
          <div className="hero-float hf-stat">
            <div className="hf-sv">8.4×</div>
            <div className="hf-sl">Avg. ROAS</div>
          </div>
          <div className="hero-float hf-icon">
            <div className="hf-icon-inner">◎</div>
          </div>
          <div className="hero-avatar">
            <Avatar />
          </div>
        </div>
      </section>

      {/* ══ STATS BAND ══ */}
      <div className="sband" ref={stats.ref}>
        <div className="sband-grid">
          {STATS.map((s, i) => (
            <div key={i} className={`sband-cell ${v(stats) ? "vis" : ""}`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="sv">{s.value}</div>
              <div className="sl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ ABOUT ══ */}
      <section className="sec" id="about" ref={about.ref}>
        <div className="sec-inner">
          <div className={`sec-label ${v(about) ? "vis" : ""}`}>About</div>
          <h2 className={`sec-title ${v(about) ? "vis" : ""}`}>The Strategist<br /><em>Behind the Numbers</em></h2>
          <div className="about-grid">
            <div className={`about-left ${v(about) ? "vis" : ""}`}>
              <div className="about-img-wrap">
                <div className="about-img"><Avatar /></div>
                <div className="about-corner-tl" />
                <div className="about-corner-br" />
              </div>
            </div>
            <div className={`about-right ${v(about) ? "vis" : ""}`}>
              <div className="about-badge">Google Ads Certified</div>
              <p className="about-p">I started in paid search when broad match meant something very different. Since then I've managed <strong>$1.5M+ in ad spend</strong> across verticals — from bootstrapped D2C brands to VC-backed SaaS companies.</p>
              <p className="about-p">My philosophy is simple: every dollar in your account should justify its existence. That means <strong>tight structure, rigorous bidding logic, and creative testing</strong> — not set-it-and-forget-it campaigns.</p>
              <p className="about-p">I don't take on more clients than I can give real attention to. When we work together, you're getting focused, strategic oversight — not a junior analyst following a playbook.</p>
              <div className="chips">
                {["Search Campaigns","Shopping / PMax","Conversion Tracking","A/B Creative Testing","Audience Strategy","SKAG Architecture","Offline Conversions","Bid Strategy","Feed Optimisation","GTM / GA4"].map(c => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section className="sec alt" id="services" ref={services.ref}>
        <div className="sec-inner">
          <div className={`sec-label ${v(services) ? "vis" : ""}`}>What I Do</div>
          <h2 className={`sec-title ${v(services) ? "vis" : ""}`}>Services That<br /><em>Move the Needle</em></h2>
          <div className="services-list">
            {SERVICES.map((s, i) => (
              <div key={i} className={`service-row ${v(services) ? "vis" : ""}`} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="svc-icon">{s.icon}</div>
                <div>
                  <div className="svc-title">{s.title}</div>
                  <div className="svc-desc">{s.desc}</div>
                </div>
                <div className="svc-num">{s.num}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WORK ══ */}
      <section className="sec" id="work" ref={work.ref}>
        <div className="sec-inner">
          <div className={`sec-label ${v(work) ? "vis" : ""}`}>Case Studies</div>
          <h2 className={`sec-title ${v(work) ? "vis" : ""}`}>Proof, Not<br /><em>Promises</em></h2>
          <div className="work-grid">
            {PROJECTS.map((p, i) => (
              <div
                key={i}
                className={`proj-card ${v(work) ? "vis" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
                onClick={() => setActiveProj(activeProj === i ? null : i)}
              >
                <div className="proj-color-bar" style={{ background: p.accent }} />
                <div className="proj-head">
                  <div className="proj-brand">{p.brand}</div>
                  <span className="proj-pill" style={{ background: `${p.accent}18`, color: p.accent, border: `1px solid ${p.accent}35` }}>{p.tag}</span>
                </div>
                <div className="proj-meta">
                  <span>◷ {p.period}</span>
                  <span>◈ {p.budget}</span>
                  <span style={{ opacity: 0.6 }}>· {p.industry}</span>
                </div>
                <div className="proj-metrics">
                  {p.results.map((r, j) => (
                    <div key={j} className="proj-met">
                      <div className="proj-met-v" style={{ color: p.accent }}>{r.metric}</div>
                      <div className="proj-met-l">{r.label}</div>
                    </div>
                  ))}
                </div>
                <div className="proj-sparkline"><Sparkline accent={p.accent} /></div>
                <div className={`proj-expand ${activeProj === i ? "open" : ""}`}>
                  <p className="proj-desc">{p.desc}</p>
                  <div className="proj-tags">
                    {p.tags.map(t => (
                      <span key={t} className="proj-tag" style={{ borderColor: `${p.accent}30`, color: p.accent }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="proj-toggle">
                  <span>{activeProj === i ? "▲ Collapse" : "▼ Read case study"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="sec alt" id="process" ref={process.ref}>
        <div className="sec-inner">
          <div className={`sec-label ${v(process) ? "vis" : ""}`}>How It Works</div>
          <h2 className={`sec-title ${v(process) ? "vis" : ""}`}>A Process Built<br /><em>for Results</em></h2>
          <div className="process-steps">
            {PROCESS.map((p, i) => (
              <div key={i} className={`process-step ${v(process) ? "vis" : ""}`} style={{ transitionDelay: `${i * 0.09}s` }}>
                <div className="ps-num">{p.step}</div>
                <div>
                  <div className="ps-title">{p.title}</div>
                  <div className="ps-desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="sec" id="clients" ref={testi.ref}>
        <div className="sec-inner">
          <div className={`sec-label ${v(testi) ? "vis" : ""}`}>Client Voices</div>
          <h2 className={`sec-title ${v(testi) ? "vis" : ""}`}>What Clients<br /><em>Actually Say</em></h2>
          <div className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`testi-card ${v(testi) ? "vis" : ""}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <span className="testi-qm">"</span>
                <p className="testi-text">{t.quote}</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.initials}</div>
                  <div>
                    <div className="testi-name">{t.author}</div>
                    <div className="testi-co">{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INDUSTRIES BAND ══ */}
      <div className="ind-band">
        <div className="ind-inner">
          <div className="ind-label">Industries Served</div>
          <div className="ind-track">
            {INDUSTRIES.map(c => <span key={c} className="ind-item">{c}</span>)}
          </div>
        </div>
      </div>

      {/* ══ FAQ ══ */}
      <section className="sec alt" id="faq" ref={faq.ref}>
        <div className="sec-inner">
          <div className={`sec-label ${v(faq) ? "vis" : ""}`}>Questions</div>
          <h2 className={`sec-title ${v(faq) ? "vis" : ""}`}>Things People<br /><em>Usually Ask</em></h2>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq-item ${v(faq) ? "vis" : ""} ${openFaq === i ? "open" : ""}`} style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="faq-qt">{f.q}</span>
                  <span className="faq-ic">+</span>
                </div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section className="sec" id="contact" ref={contact.ref}>
        <div className="sec-inner">
          <div className={`sec-label ${v(contact) ? "vis" : ""}`}>Get In Touch</div>
          <h2 className={`sec-title ${v(contact) ? "vis" : ""}`}>Ready to Stop<br /><em>Wasting Budget?</em></h2>
          <div className="contact-grid">
            <div className={`contact-left ${v(contact) ? "vis" : ""}`}>
              <p className="contact-lead">Whether you want a full audit, ongoing management, or a second opinion — let's have an honest conversation about what's possible for your business.</p>
              <a href="mailto:partha@parthadevnath.com" className="contact-link">
                <div className="clink-icon">✉</div>
                <div><div className="clink-label">Email</div><div className="clink-val">partha@parthadevnath.com</div></div>
              </a>
              <a href="https://linkedin.com/in/parthadevnath" target="_blank" rel="noreferrer" className="contact-link">
                <div className="clink-icon" style={{ fontFamily: "serif", fontWeight: 700, fontSize: 13 }}>in</div>
                <div><div className="clink-label">LinkedIn</div><div className="clink-val">linkedin.com/in/parthadevnath</div></div>
              </a>
              <a href="tel:+12345678900" className="contact-link">
                <div className="clink-icon">💬</div>
                <div><div className="clink-label">WhatsApp</div><div className="clink-val">+1 234 567 8900</div></div>
              </a>
            </div>
            <div className={`contact-right ${v(contact) ? "vis" : ""}`}>
              <div className="form-group"><label className="form-label">Your Name</label><input type="text" className="form-input" placeholder="John Doe" /></div>
              <div className="form-group"><label className="form-label">Email Address</label><input type="email" className="form-input" placeholder="john@company.com" /></div>
              <div className="form-group"><label className="form-label">Monthly Ad Spend</label><input type="text" className="form-input" placeholder="$10,000 / month" /></div>
              <div className="form-group"><label className="form-label">Your Situation</label><textarea className="form-input" placeholder="Current challenges, goals, what you've tried…" /></div>
              <button className="form-submit">Send Message →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer>
        <div className="footer-logo">
          <img src="/partha_logo.png" alt="Partha Logo" style={{ height: "28px", width: "auto", display: "block" }} />
        </div>
        <div className="footer-copy">© 2024 Partha Devnath · All Rights Reserved</div>
        <div className="footer-links">
          {NAV_LINKS.map(n => <a key={n.href} href={n.href}>{n.label}</a>)}
        </div>
      </footer>

      {/* ══ STICKY CTA ══ */}
      <div className={`sticky-cta ${scrollY > 500 ? "show" : ""}`}>
        <span className="sticky-txt">Scale with Google Ads?</span>
        <a href="#contact" className="sticky-btn">Book Free Call</a>
      </div>
    </>
  );
}