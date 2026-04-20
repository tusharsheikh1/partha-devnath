import { useState, useEffect } from "react";
import { useInView } from "./hooks/useInView";
import { Sparkline } from "./components/Sparkline";
import { Avatar } from "./components/Avatar";
import {
  STATS, SERVICES, PROJECTS, PROCESS,
  TESTIMONIALS, FAQS, INDUSTRIES, NAV_LINKS
} from "./data/constants";
import "./App.css";

/* ── MAIN APP ── */
export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeProj, setActiveProj] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    spend: "",
    situation: ""
  });
  
  // Theme State
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navOpen]);

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

  const closeNav = () => setNavOpen(false);
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  // WhatsApp Submit Handler
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*New Lead from Portfolio*
    
*Name:* ${formData.name}
*Email:* ${formData.email}
*Monthly Ad Spend:* ${formData.spend}
*Situation:* ${formData.situation}`;

    // Target Number: 8801770206859
    const whatsappUrl = `https://wa.me/8801770206859?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* ══ MOBILE MENU ══ */}
      <div className={`nav-mobile ${navOpen ? "open" : ""}`}>
        {NAV_LINKS.map(n => (
          <a key={n.href} href={n.href} onClick={closeNav}>{n.label}</a>
        ))}
        <a href="#contact" className="nav-cta-mobile" onClick={closeNav}>Book a Call →</a>
      </div>

      {/* ══ NAVBAR ══ */}
      <nav className={`nav ${scrollY > 40 ? "scrolled" : ""}`}>
        <a href="#" className="nav-logo">
          <img src="/partha_logo.png" alt="Partha Debnath" />
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map(n => (
            <li key={n.href}><a href={n.href}>{n.label}</a></li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            <span className="theme-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span className="theme-text">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          
          <a href="#contact" className="nav-cta">
            <span>Book a Call</span>
          </a>
          
          <button
            className={`nav-burger ${navOpen ? "open" : ""}`}
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="hero" ref={hero.ref}>
        <div className="hero-bg" />
        <div className="hero-bg-grid" />

        <div className={`hero-left ${v(hero) ? "vis" : ""}`}>
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            <span className="eyebrow-text">Google Ads Specialist</span>
            <span className="eyebrow-line" />
          </div>
          
          <h1 className="hero-h1">
            <span className="line"><span>Turning Ad Spend</span></span>
            <span className="line"><span>Into <em>Real</em> Revenue.</span></span>
          </h1>
          
          <p className="hero-sub">
            I'm <strong>Partha Debnath</strong> — a performance marketing specialist with <strong>6+ years</strong> managing Google Ads for D2C brands, SaaS companies, and local businesses globally.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              <span>Book a Free Audit →</span>
            </a>
            <a href="#work" className="btn-ghost">View Case Studies</a>
          </div>
        </div>

        <div className={`hero-right ${v(hero) ? "vis" : ""}`}>
          <div className="hero-right-glow" />
          <div className="hero-float hf-stat">
            <div className="hf-sv">8.4×</div>
            <div className="hf-sl">Avg. ROAS</div>
          </div>
          <div className="hero-float hf-badge">
            <div className="hf-icon">✦</div>
            <div className="hf-sl">Certified Expert</div>
          </div>
          <div className="hero-float hf-tag">
            <div className="hf-tag-text">6+ Years</div>
          </div>
          <div className="hero-avatar-wrap">
            <Avatar />
          </div>
        </div>

        <div className="hero-scroll-hint">
          <div className="scroll-mouse"><div className="scroll-wheel" /></div>
          <span className="scroll-text">Scroll to explore</span>
        </div>
      </section>

      {/* ══ STATS BAND ══ */}
      <div className="sband" ref={stats.ref}>
        <div className="sband-grid">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`sband-cell ${v(stats) ? "vis" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
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
              <div
                key={i}
                className={`service-row ${v(services) ? "vis" : ""}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
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
                
                <div style={{ marginBottom: '20px', borderRadius: '4px', overflow: 'hidden' }}>
                   <img src={`/recent_work_${(i % 9) + 1}.png`} alt={`${p.brand} campaign results`} style={{ width: '100%', display: 'block', border: '1px solid var(--line)' }} />
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
          <div className="ind-label">Industries</div>
          <div className="ind-divider" />
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
              <div
                key={i}
                className={`faq-item ${v(faq) ? "vis" : ""} ${openFaq === i ? "open" : ""}`}
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
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
              <a href="mailto:uvpartha143@gmail.com" className="contact-link">
                <div className="clink-icon">✉</div>
                <div><div className="clink-label">Email</div><div className="clink-val">uvpartha143@gmail.com</div></div>
              </a>
              <a href="https://www.linkedin.com/in/partha-debnath-531a8722a?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="contact-link">
                <div className="clink-icon" style={{ fontFamily: "serif", fontWeight: 700, fontSize: 14 }}>in</div>
                <div><div className="clink-label">LinkedIn</div><div className="clink-val">linkedin.com/in/partha-debnath</div></div>
              </a>
              <a href="https://wa.me/8801770206859" target="_blank" rel="noreferrer" className="contact-link">
                <div className="clink-icon">💬</div>
                <div><div className="clink-label">WhatsApp</div><div className="clink-val">+880 1770-206859</div></div>
              </a>
            </div>
            
            <form className={`contact-right ${v(contact) ? "vis" : ""}`} onSubmit={handleWhatsAppSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="John Doe" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="john@company.com" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Monthly Ad Spend</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="$10,000 / month" 
                  required
                  value={formData.spend}
                  onChange={(e) => setFormData({ ...formData, spend: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Your Situation</label>
                <textarea 
                  className="form-input" 
                  placeholder="Current challenges, goals, what you've tried…" 
                  required
                  value={formData.situation}
                  onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
                />
              </div>
              <button type="submit" className="form-submit">
                <span>Send Message →</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/partha_logo.png" alt="Partha Debnath" />
            </div>
            <div className="footer-tagline">Performance Marketing · Google Ads Specialist · 6+ Years</div>
          </div>

          <div className="footer-nav-group">
            <div className="footer-nav-label">Navigation</div>
            {NAV_LINKS.map(n => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </div>

          <div className="footer-contact-group">
            <div className="footer-nav-label">Contact</div>
            <a href="mailto:uvpartha143@gmail.com" className="footer-contact-item">uvpartha143@gmail.com</a>
            <a href="https://www.linkedin.com/in/partha-debnath-531a8722a?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="footer-contact-item" target="_blank" rel="noreferrer">linkedin.com/in/partha-debnath</a>
            <a href="#contact" className="footer-contact-item">Book a Free Audit →</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© 2024 Partha Debnath · All Rights Reserved</div>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/in/partha-debnath-531a8722a?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="footer-social" aria-label="LinkedIn">
              <span style={{ fontFamily: "serif", fontWeight: 700 }}>in</span>
            </a>
            <a href="https://www.facebook.com/share/1XjyWBCYY1/" target="_blank" rel="noreferrer" className="footer-social" aria-label="Facebook">
              <span style={{ fontFamily: "serif", fontWeight: 700 }}>f</span>
            </a>
            <a href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=to2579n" target="_blank" rel="noreferrer" className="footer-social" aria-label="Instagram">
              <span style={{ fontFamily: "serif", fontWeight: 700 }}>ig</span>
            </a>
            <a href="mailto:uvpartha143@gmail.com" className="footer-social" aria-label="Email">✉</a>
            <a href="https://wa.me/8801770206859" target="_blank" rel="noreferrer" className="footer-social" aria-label="WhatsApp">💬</a>
          </div>
        </div>
      </footer>

      {/* ══ STICKY CTA ══ */}
      <div className={`sticky-cta ${scrollY > 500 ? "show" : ""}`}>
        <span className="sticky-dot" />
        <span className="sticky-txt">Scale with Google Ads?</span>
        <a href="#contact" className="sticky-btn">Book Free Call</a>
      </div>
    </>
  );
}
