import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const STATS = [
  { value: "$1.5M+", label: "Ad Spend Managed" },
  { value: "8.4×",   label: "Average ROAS" },
  { value: "200+",   label: "Campaigns Launched" },
  { value: "6+",     label: "Years of Expertise" },
];

const SERVICES = [
  { num: "01", title: "Search Campaign Strategy",     desc: "Precision keyword architecture, match-type logic, and bid strategies that capture buyers at peak intent — not tire-kickers.", icon: "◎" },
  { num: "02", title: "Performance Max & Shopping",   desc: "Full-funnel asset optimisation across Google's AI-driven inventory. Your products shown at the right moment, every time.",  icon: "◈" },
  { num: "03", title: "Conversion Rate Optimisation", desc: "Clicks mean nothing without conversions. I audit landing pages, ad copy, and flows to squeeze every dollar of value.",        icon: "▲" },
  { num: "04", title: "Display & YouTube Ads",        desc: "Brand-awareness campaigns with audience layering, custom intent, and creative testing for measurable top-of-funnel impact.", icon: "◰" },
  { num: "05", title: "Account Audit & Rescue",       desc: "Bleeding money on underperforming campaigns? I dissect your account, identify waste, and rebuild with surgical precision.",   icon: "⊕" },
  { num: "06", title: "Monthly Retainer Management",  desc: "Ongoing optimisation, weekly reporting, and strategy calls — so your campaigns compound in performance, not complexity.",     icon: "◷" },
];

const PROJECTS = [
  {
    brand: "Zara-Style Fashion Brand",
    industry: "D2C Fashion",
    period: "Jan 2023 – Dec 2023",
    budget: "$5K/mo",
    tag: "Shopping + Search",
    accent: "#c8a96e",
    results: [
      { metric: "9.2×", label: "ROAS" },
      { metric: "+340%", label: "Revenue" },
      { metric: "−28%", label: "CPC" },
    ],
    desc: "Rebuilt entire Shopping feed structure from scratch. Implemented custom labels by margin tier, layered RLSA audiences on Search, and ran creative A/B tests across 12 ad variations. Scaled from $1K to $5K monthly spend while maintaining profitable returns.",
    tags: ["Shopping", "RLSA", "Smart Bidding", "Feed Optimisation"],
  },
  {
    brand: "HealthFirst Supplements",
    industry: "Health & Wellness D2C",
    period: "Mar 2022 – Feb 2023",
    budget: "$3.5K/mo",
    tag: "Performance Max",
    accent: "#7eb89a",
    results: [
      { metric: "4.1×", label: "ROAS" },
      { metric: "$250K+", label: "Annual Rev" },
      { metric: "18%", label: "Conv Rate" },
    ],
    desc: "Launched brand's first Google Ads presence. Built Performance Max campaigns with full asset suite — 15+ headlines, 4 descriptions, video assets, and product feeds. Implemented enhanced conversions for accurate tracking. Grew from zero to $250K+ annual revenue attributed to paid search.",
    tags: ["Performance Max", "Enhanced Conv", "Video Assets", "GTM"],
  },
  {
    brand: "CloudDesk SaaS",
    industry: "B2B Project Management",
    period: "Jun 2022 – Ongoing",
    budget: "$2K/mo",
    tag: "Search Ads",
    accent: "#7a9fd4",
    results: [
      { metric: "−62%", label: "Cost/Lead" },
      { metric: "3.8×", label: "Lead Volume" },
      { metric: "41%", label: "Trial Rate" },
    ],
    desc: "Audited a bloated account with 400+ irrelevant keywords and near-zero negative keyword lists. Restructured into tightly themed ad groups by ICP job role and pain point. Introduced SKAG methodology for top-intent terms and dayparting for business hours. CPL dropped from $28 to $10.",
    tags: ["Search", "Negative Keywords", "SKAG", "Dayparting", "B2B"],
  },
  {
    brand: "LegalEase Consulting",
    industry: "Professional Services",
    period: "Sep 2023 – Ongoing",
    budget: "$1K/mo",
    tag: "Local + Search",
    accent: "#c49a6c",
    results: [
      { metric: "5.6×", label: "Leads/$" },
      { metric: "+190%", label: "Call Volume" },
      { metric: "$5", label: "CPL" },
    ],
    desc: "Local service business with zero digital presence. Built geo-targeted Search campaigns for 6 city clusters, implemented call extensions, location assets, and call-only ads. Set up offline conversion tracking via CRM webhook. Average CPL reduced from $25 to $5 over 90 days.",
    tags: ["Local Ads", "Call Extensions", "Geo-Targeting", "Offline Conv"],
  },
];

const PROCESS = [
  { step: "01", title: "Discovery Call",     desc: "We discuss your business, current setup, goals, and budget reality. No fluff — just clarity." },
  { step: "02", title: "Account Audit",      desc: "I review campaigns with a fine-tooth comb, finding leaks and opportunities others miss." },
  { step: "03", title: "Strategy Blueprint", desc: "A tailored roadmap: campaign structure, targeting, bidding logic, and creative direction." },
  { step: "04", title: "Launch & Iterate",   desc: "Campaigns go live with close monitoring. Weekly A/B tests and data-driven pivots, always." },
  { step: "05", title: "Scale & Report",     desc: "Transparent monthly reports with key insights. We scale what works, cut what doesn't." },
];

const TESTIMONIALS = [
  { quote: "Partha didn't just run our ads — he rebuilt our entire Google Ads thinking. Revenue up 3× in 4 months.", author: "Rohan M.", company: "Founder, D2C Brand",    initials: "RM" },
  { quote: "The audit alone saved us $500 a month in wasted spend. Worth every dollar of the retainer.",          author: "Sneha K.", company: "Marketing Head, SaaS", initials: "SK" },
  { quote: "Most PPC guys talk numbers. Partha explains the 'why' behind every decision. That's genuinely rare.",   author: "Amit P.",  company: "CEO, E-commerce",       initials: "AP" },
];

const FAQS = [
  { q: "What budget do I need to work with you?",   a: "I typically work with clients spending $1,000/month or more. Below that, the optimisation opportunities are limited and ROI on management fees is harder to justify." },
  { q: "Do you guarantee specific results?",         a: "No ethical advertiser guarantees specific ROAS — too many variables exist outside our control. What I guarantee: rigorous strategy, transparent reporting, and relentless optimisation." },
  { q: "How soon will I see results?",               a: "Search campaigns often show directional data within 2–3 weeks. Meaningful optimisation typically takes 60–90 days as the algorithm learns and we iterate." },
  { q: "Do you work with new accounts?",             a: "Both new and existing. New accounts are built on best-practice structure from day one. Existing accounts get audited and rebuilt or refined depending on current health." },
  { q: "What industries do you specialise in?",      a: "E-commerce, D2C, SaaS, and local service businesses. I've run campaigns across fashion, health, software, education, and professional services." },
];

const INDUSTRIES = ["Fashion", "SaaS", "Health & Wellness", "Education", "Real Estate", "Finance", "Food & Bev", "Professional Services"];

/* ═══════════════════════════════════════════════════
   HOOK
═══════════════════════════════════════════════════ */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ═══════════════════════════════════════════════════
   MINI SPARKLINE
═══════════════════════════════════════════════════ */
const Sparkline = ({ accent }: { accent: string }) => {
  const pts = [20, 32, 24, 44, 38, 56, 48, 72, 65, 88, 80, 100];
  const w = 120, h = 44;
  const coords = pts.map((v, i) => `${(i / (pts.length - 1)) * w},${h - (v / 100) * h}`);
  const path = `M${coords.join(" L")}`;
  const fill = `M0,${h} L${coords.join(" L")} L${w},${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 40 }}>
      <defs>
        <linearGradient id={`sg-${accent.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#sg-${accent.replace("#","")})`} />
      <path d={path} fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/* ═══════════════════════════════════════════════════
   PROFILE AVATAR
═══════════════════════════════════════════════════ */
const Avatar = () => (
  <img 
    src="/partha_photo.png" 
    alt="Partha Devnath" 
    style={{ 
      width: "100%", 
      height: "100%", 
      objectFit: "cover", 
      display: "block",
      objectPosition: "center"
    }} 
  />
);

/* ═══════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════ */
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

  const NAV_LINKS = [
    { href: "#about",    label: "About"   },
    { href: "#services", label: "Services" },
    { href: "#work",     label: "Work"     },
    { href: "#process",  label: "Process"  },
    { href: "#contact",  label: "Contact"  },
  ];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:    #f5f3ef;
      --bg2:   #eceae4;
      --ink:   #1a1614;
      --ink2:  #3a3632;
      --muted: #7a7570;
      --dim:   #a09890;
      --gold:  #b8912a;
      --gold2: #c8a96e;
      --line:  rgba(26,22,20,0.1);
      --card:  #ffffff;
      --card2: #f9f7f3;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--bg);
      color: var(--ink);
      line-height: 1.6;
      overflow-x: hidden;
    }

    /* ── SCROLLBAR ── */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg2); }
    ::-webkit-scrollbar-thumb { background: var(--gold2); border-radius: 2px; }

    /* ── NAVBAR ── */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 48px; height: 68px;
      background: rgba(245,243,239,0.88);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid transparent;
      transition: border-color 0.3s;
    }
    .nav.scrolled { border-bottom-color: var(--line); }
    .nav-logo {
      display: flex;
      align-items: center;
      text-decoration: none;
    }
    .nav-links {
      display: flex; align-items: center; gap: 36px;
      list-style: none;
    }
    .nav-links a {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--muted);
      text-decoration: none;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--ink); }
    .nav-cta {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      background: var(--ink);
      color: var(--bg);
      border: none;
      padding: 10px 22px;
      cursor: pointer;
      transition: background 0.2s;
      text-decoration: none;
    }
    .nav-cta:hover { background: var(--gold); }
    .nav-burger { display: none; background: none; border: none; cursor: pointer; padding: 4px; }
    .nav-burger span {
      display: block; width: 22px; height: 1.5px;
      background: var(--ink); margin: 5px 0; transition: all 0.25s;
    }

    /* ── HERO ── */
    .hero {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 420px;
      gap: 0;
      padding-top: 68px;
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse 60% 70% at 80% 50%, rgba(184,145,42,0.06) 0%, transparent 70%);
      pointer-events: none;
    }
    .hero-left {
      display: flex; flex-direction: column; justify-content: center;
      padding: 80px 64px 80px 72px;
      opacity: 0; transform: translateY(28px);
      transition: opacity 0.9s, transform 0.9s;
    }
    .hero-left.vis { opacity: 1; transform: none; }
    .hero-tag {
      display: inline-flex; align-items: center; gap: 10px;
      font-family: 'DM Mono', monospace;
      font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
      color: var(--gold); margin-bottom: 28px;
    }
    .hero-tag::before { content:''; width: 28px; height: 1px; background: var(--gold); }
    .hero-h1 {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(44px, 6vw, 82px);
      font-weight: 400;
      line-height: 1.0;
      letter-spacing: -2px;
      color: var(--ink);
      margin-bottom: 28px;
    }
    .hero-h1 em { font-style: italic; color: var(--gold); }
    .hero-sub {
      font-size: 17px;
      font-weight: 300;
      color: var(--muted);
      line-height: 1.75;
      max-width: 480px;
      margin-bottom: 44px;
    }
    .hero-sub strong { color: var(--ink); font-weight: 500; }
    .hero-actions { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
    .btn-primary {
      font-family: 'DM Mono', monospace;
      font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;
      background: var(--ink); color: var(--bg);
      padding: 14px 30px; border: 1.5px solid var(--ink);
      text-decoration: none; transition: all 0.22s; display: inline-block;
    }
    .btn-primary:hover { background: var(--gold); border-color: var(--gold); }
    .btn-ghost {
      font-family: 'DM Mono', monospace;
      font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;
      background: transparent; color: var(--ink);
      padding: 14px 30px; border: 1.5px solid var(--line);
      text-decoration: none; transition: all 0.22s; display: inline-block;
    }
    .btn-ghost:hover { border-color: var(--ink); }
    .hero-right {
      background: var(--ink);
      position: relative; overflow: hidden;
      opacity: 0; transform: translateX(20px);
      transition: opacity 0.9s 0.15s, transform 0.9s 0.15s;
    }
    .hero-right.vis { opacity: 1; transform: none; }
    .hero-right::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse 80% 60% at 50% 110%, rgba(200,169,110,0.15) 0%, transparent 70%);
    }
    .hero-avatar { position: relative; z-index: 2; height: 100%; display: flex; align-items: flex-end; }
    .hero-float {
      position: absolute; z-index: 10;
      background: rgba(245,243,239,0.08);
      border: 1px solid rgba(200,169,110,0.2);
      backdrop-filter: blur(10px);
      border-radius: 4px;
    }
    .hf-stat { top: 40px; left: -60px; padding: 18px 22px; animation: floatA 5s ease-in-out infinite 0.8s; }
    .hf-icon { bottom: 60px; left: -36px; padding: 12px 16px; animation: floatB 4s ease-in-out infinite 0.3s; }
    .hf-sv { font-family: 'DM Serif Display', serif; font-size: 34px; color: #c8a96e; line-height: 1; }
    .hf-sl { font-family: 'DM Mono', monospace; font-size: 9px; color: rgba(200,169,110,0.7); letter-spacing: 1.5px; text-transform: uppercase; margin-top: 4px; }
    .hf-icon-inner { font-size: 18px; }
    @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

    /* ── STATS BAND ── */
    .sband { background: var(--ink); }
    .sband-grid {
      display: grid; grid-template-columns: repeat(4,1fr);
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    .sband-cell {
      padding: 52px 44px;
      border-right: 1px solid rgba(255,255,255,0.06);
      position: relative; overflow: hidden;
      opacity: 0; transform: translateY(14px);
      transition: opacity 0.5s, transform 0.5s;
    }
    .sband-cell:last-child { border-right: none; }
    .sband-cell.vis { opacity: 1; transform: none; }
    .sband-cell::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0;
      height: 2px; background: var(--gold);
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.4s;
    }
    .sband-cell:hover::after { transform: scaleX(1); }
    .sv { font-family: 'DM Serif Display', serif; font-size: clamp(40px,4vw,60px); color: var(--gold2); letter-spacing: -2px; line-height: 1; }
    .sl { font-family: 'DM Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.35); letter-spacing: 1.5px; text-transform: uppercase; margin-top: 10px; }

    /* ── SECTIONS ── */
    .sec { padding: 112px 72px; background: var(--bg); }
    .sec.alt { background: var(--bg2); }
    .sec-inner { max-width: 1160px; margin: 0 auto; }
    .sec-label {
      display: flex; align-items: center; gap: 14px;
      font-family: 'DM Mono', monospace; font-size: 10px; color: var(--gold);
      letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 18px;
      opacity: 0; transform: translateX(-12px);
      transition: opacity 0.5s, transform 0.5s;
    }
    .sec-label.vis { opacity: 1; transform: none; }
    .sec-label::before { content:''; width: 24px; height: 1px; background: var(--gold); flex-shrink: 0; }
    .sec-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(34px, 5vw, 64px);
      font-weight: 400; line-height: 1.04; letter-spacing: -1.5px;
      color: var(--ink);
      opacity: 0; transform: translateY(22px);
      transition: opacity 0.7s 0.1s, transform 0.7s 0.1s;
    }
    .sec-title.vis { opacity: 1; transform: none; }
    .sec-title em { font-style: italic; color: var(--gold); }

    /* ── ABOUT ── */
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; margin-top: 64px; align-items: center; }
    .about-left { opacity: 0; transform: translateX(-28px); transition: opacity 0.8s 0.15s, transform 0.8s 0.15s; }
    .about-left.vis { opacity: 1; transform: none; }
    .about-right { opacity: 0; transform: translateX(28px); transition: opacity 0.8s 0.25s, transform 0.8s 0.25s; }
    .about-right.vis { opacity: 1; transform: none; }
    .about-img-wrap { position: relative; }
    .about-img { aspect-ratio: 3/4; background: var(--ink); border-radius: 4px; overflow: hidden; }
    .about-corner-tl {
      position: absolute; top: -14px; right: -14px;
      width: 56px; height: 56px;
      border-top: 2px solid var(--line);
      border-right: 2px solid var(--line);
    }
    .about-corner-br {
      position: absolute; bottom: -14px; left: -14px;
      width: 56px; height: 56px;
      border-bottom: 2px solid var(--gold);
      border-left: 2px solid var(--gold);
    }
    .about-badge {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1.5px;
      text-transform: uppercase; color: var(--gold);
      border: 1px solid rgba(184,145,42,0.3);
      padding: 8px 16px; border-radius: 100px; margin-bottom: 24px;
      background: rgba(184,145,42,0.06);
    }
    .about-badge::before { content:'●'; font-size: 7px; animation: pulse 2s ease-in-out infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
    .about-p { color: var(--muted); font-size: 16px; font-weight: 300; line-height: 1.85; margin-bottom: 18px; }
    .about-p strong { color: var(--ink); font-weight: 500; }
    .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; }
    .chip {
      font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1px;
      color: var(--dim); border: 1px solid var(--line); padding: 6px 14px;
      text-transform: uppercase; transition: all 0.2s; cursor: default;
    }
    .chip:hover { border-color: var(--gold); color: var(--gold); }

    /* ── SERVICES ── */
    .services-list { margin-top: 64px; }
    .service-row {
      display: grid; grid-template-columns: 56px 1fr auto;
      gap: 24px; align-items: start;
      padding: 36px 0; border-bottom: 1px solid var(--line);
      opacity: 0; transform: translateY(12px);
      transition: opacity 0.5s, transform 0.5s;
      cursor: default;
    }
    .service-row.vis { opacity: 1; transform: none; }
    .service-row:hover .svc-title { color: var(--gold); }
    .svc-icon {
      width: 48px; height: 48px;
      border: 1px solid var(--line); display: flex;
      align-items: center; justify-content: center;
      font-size: 18px; color: var(--gold);
      transition: all 0.3s; flex-shrink: 0; margin-top: 2px;
      font-family: monospace;
    }
    .service-row:hover .svc-icon { background: rgba(184,145,42,0.08); border-color: rgba(184,145,42,0.35); }
    .svc-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(18px, 2vw, 26px); letter-spacing: -0.3px;
      margin-bottom: 8px; transition: color 0.2s;
    }
    .svc-desc { color: var(--muted); font-size: 14px; font-weight: 300; line-height: 1.78; max-width: 520px; }
    .svc-num {
      font-family: 'DM Mono', monospace; font-size: 11px;
      color: var(--dim); letter-spacing: 1px; text-transform: uppercase;
      padding-top: 6px; white-space: nowrap;
      transition: color 0.2s;
    }
    .service-row:hover .svc-num { color: var(--gold); }

    /* ── WORK / PROJECTS ── */
    .work-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; margin-top: 64px; }
    .proj-card {
      background: var(--card); border: 1px solid var(--line);
      padding: 36px; position: relative; overflow: hidden; cursor: pointer;
      opacity: 0; transform: translateY(20px);
      transition: opacity 0.6s, transform 0.6s, box-shadow 0.25s, border-color 0.25s;
    }
    .proj-card.vis { opacity: 1; transform: none; }
    .proj-card:hover { box-shadow: 0 12px 44px rgba(0,0,0,0.09); border-color: rgba(184,145,42,0.25); }
    .proj-color-bar {
      position: absolute; top: 0; left: 0; right: 0; height: 2px;
      transform: scaleX(0); transform-origin: left; transition: transform 0.4s;
    }
    .proj-card:hover .proj-color-bar { transform: scaleX(1); }
    .proj-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 14px; }
    .proj-brand { font-family: 'DM Serif Display', serif; font-size: 21px; letter-spacing: -0.4px; line-height: 1.2; }
    .proj-pill {
      font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 1.5px;
      text-transform: uppercase; padding: 4px 12px; border-radius: 100px;
      white-space: nowrap; flex-shrink: 0; margin-top: 4px;
    }
    .proj-meta {
      display: flex; gap: 18px; margin-bottom: 20px;
      font-family: 'DM Mono', monospace; font-size: 10px; color: var(--dim);
      letter-spacing: 0.5px; flex-wrap: wrap;
    }
    .proj-meta span { display: flex; align-items: center; gap: 6px; }
    .proj-metrics {
      display: grid; grid-template-columns: repeat(3,1fr);
      gap: 1px; background: var(--line); margin-bottom: 20px; border-radius: 2px; overflow: hidden;
    }
    .proj-met { background: var(--card2); padding: 16px 12px; text-align: center; }
    .proj-met-v { font-family: 'DM Serif Display', serif; font-size: 26px; letter-spacing: -0.8px; line-height: 1; }
    .proj-met-l { font-family: 'DM Mono', monospace; font-size: 9px; color: var(--dim); letter-spacing: 1px; text-transform: uppercase; margin-top: 4px; }
    .proj-sparkline { margin-bottom: 0; }
    .proj-expand {
      max-height: 0; overflow: hidden;
      transition: max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .proj-expand.open { max-height: 300px; }
    .proj-desc { color: var(--muted); font-size: 14px; font-weight: 300; line-height: 1.78; margin-top: 20px; margin-bottom: 16px; }
    .proj-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .proj-tag {
      font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 1px;
      text-transform: uppercase; padding: 4px 10px; border: 1px solid var(--line); border-radius: 2px;
    }
    .proj-toggle {
      margin-top: 18px; display: flex; align-items: center; gap: 6px;
      font-family: 'DM Mono', monospace; font-size: 9px; color: var(--dim);
      letter-spacing: 1.5px; text-transform: uppercase;
    }

    /* ── PROCESS ── */
    .process-steps { display: flex; flex-direction: column; gap: 0; margin-top: 64px; }
    .process-step {
      display: grid; grid-template-columns: 80px 1fr;
      gap: 28px; align-items: start;
      padding: 36px 0; border-bottom: 1px solid var(--line);
      opacity: 0; transform: translateX(-16px);
      transition: opacity 0.5s, transform 0.5s;
    }
    .process-step.vis { opacity: 1; transform: none; }
    .ps-num {
      font-family: 'DM Serif Display', serif; font-style: italic;
      font-size: 48px; color: var(--line); line-height: 1;
      user-select: none;
    }
    .ps-title {
      font-family: 'DM Serif Display', serif;
      font-size: 22px; letter-spacing: -0.3px; margin-bottom: 8px;
    }
    .ps-desc { color: var(--muted); font-size: 14px; font-weight: 300; line-height: 1.78; }

    /* ── TESTIMONIALS ── */
    .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 64px; }
    .testi-card {
      background: var(--card); border: 1px solid var(--line);
      padding: 36px; position: relative;
      opacity: 0; transform: translateY(20px);
      transition: opacity 0.6s, transform 0.6s;
    }
    .testi-card.vis { opacity: 1; transform: none; }
    .testi-qm {
      font-family: 'DM Serif Display', serif; font-style: italic;
      font-size: 64px; color: var(--gold2); line-height: 0.8;
      margin-bottom: 16px; display: block; opacity: 0.5;
    }
    .testi-text { font-size: 15px; font-weight: 300; line-height: 1.78; color: var(--ink2); margin-bottom: 24px; }
    .testi-author { display: flex; align-items: center; gap: 14px; }
    .testi-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: var(--ink); display: flex; align-items: center; justify-content: center;
      font-family: 'DM Mono', monospace; font-size: 11px; color: var(--gold2); flex-shrink: 0;
    }
    .testi-name { font-size: 14px; font-weight: 500; }
    .testi-co { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--dim); letter-spacing: 0.5px; }

    /* ── INDUSTRIES BAND ── */
    .ind-band { background: var(--ink); padding: 28px 72px; overflow: hidden; }
    .ind-inner { display: flex; align-items: center; gap: 16px; }
    .ind-label { font-family: 'DM Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.3); letter-spacing: 2px; text-transform: uppercase; white-space: nowrap; margin-right: 8px; }
    .ind-track { display: flex; gap: 12px; flex-wrap: wrap; }
    .ind-item {
      font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1.5px;
      text-transform: uppercase; color: rgba(255,255,255,0.4);
      border: 1px solid rgba(255,255,255,0.1); padding: 7px 16px;
      transition: all 0.2s;
    }
    .ind-item:hover { border-color: var(--gold2); color: var(--gold2); }

    /* ── FAQ ── */
    .faq-list { margin-top: 64px; max-width: 760px; }
    .faq-item {
      border-bottom: 1px solid var(--line);
      opacity: 0; transform: translateY(10px);
      transition: opacity 0.5s, transform 0.5s;
    }
    .faq-item.vis { opacity: 1; transform: none; }
    .faq-q {
      display: flex; justify-content: space-between; align-items: center;
      gap: 16px; padding: 24px 0; cursor: pointer;
    }
    .faq-qt { font-family: 'DM Serif Display', serif; font-size: 18px; letter-spacing: -0.2px; }
    .faq-ic {
      font-family: 'DM Mono', monospace; font-size: 22px; color: var(--gold);
      line-height: 1; flex-shrink: 0; transition: transform 0.25s;
      font-weight: 300;
    }
    .faq-item.open .faq-ic { transform: rotate(45deg); }
    .faq-a {
      max-height: 0; overflow: hidden;
      font-size: 15px; font-weight: 300; line-height: 1.8; color: var(--muted);
      transition: max-height 0.4s cubic-bezier(0.16,1,0.3,1), padding 0.3s;
    }
    .faq-item.open .faq-a { max-height: 200px; padding-bottom: 24px; }

    /* ── CONTACT ── */
    .contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; margin-top: 64px; align-items: start; }
    .contact-left { opacity: 0; transform: translateX(-28px); transition: opacity 0.8s 0.15s, transform 0.8s 0.15s; }
    .contact-left.vis { opacity: 1; transform: none; }
    .contact-right { opacity: 0; transform: translateX(28px); transition: opacity 0.8s 0.25s, transform 0.8s 0.25s; }
    .contact-right.vis { opacity: 1; transform: none; }
    .contact-lead { font-size: 16px; font-weight: 300; color: var(--muted); line-height: 1.82; margin-bottom: 36px; }
    .contact-link {
      display: flex; align-items: center; gap: 18px;
      text-decoration: none; padding: 20px 0; border-bottom: 1px solid var(--line);
      transition: all 0.2s;
    }
    .contact-link:first-of-type { border-top: 1px solid var(--line); }
    .contact-link:hover .clink-label { color: var(--gold); }
    .clink-icon {
      width: 44px; height: 44px; border: 1px solid var(--line);
      display: flex; align-items: center; justify-content: center;
      font-size: 15px; flex-shrink: 0; transition: all 0.2s;
    }
    .contact-link:hover .clink-icon { background: var(--ink); color: var(--bg); border-color: var(--ink); }
    .clink-label { font-family: 'DM Mono', monospace; font-size: 9px; color: var(--dim); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 2px; }
    .clink-val { font-size: 14px; font-weight: 300; color: var(--ink); }
    .form-group { margin-bottom: 22px; }
    .form-label { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--dim); display: block; margin-bottom: 8px; }
    .form-input {
      width: 100%; padding: 14px 16px;
      background: var(--card); border: 1px solid var(--line);
      font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--ink);
      outline: none; transition: border-color 0.2s;
    }
    .form-input:focus { border-color: var(--ink); }
    .form-input::placeholder { color: var(--dim); }
    textarea.form-input { resize: vertical; min-height: 110px; }
    .form-submit {
      font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;
      background: var(--ink); color: var(--bg); border: none;
      padding: 16px 32px; cursor: pointer; transition: background 0.2s; width: 100%;
    }
    .form-submit:hover { background: var(--gold); }

    /* ── FOOTER ── */
    footer {
      background: var(--ink); padding: 52px 72px;
      display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 24px;
    }
    .footer-logo { 
      display: flex; 
      align-items: center;
    }
    .footer-copy { font-family: 'DM Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.3); letter-spacing: 1px; }
    .footer-links { display: flex; gap: 28px; }
    .footer-links a {
      font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
      color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s;
    }
    .footer-links a:hover { color: var(--gold2); }

    /* ── STICKY CTA ── */
    .sticky-cta {
      position: fixed; bottom: 28px; right: 28px; z-index: 90;
      display: flex; align-items: center; gap: 14px;
      background: var(--ink); border: 1px solid rgba(200,169,110,0.25);
      padding: 14px 22px;
      transform: translateY(24px); opacity: 0;
      transition: opacity 0.35s, transform 0.35s;
      box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    }
    .sticky-cta.show { opacity: 1; transform: none; }
    .sticky-txt { font-family: 'DM Mono', monospace; font-size: 10px; color: rgba(255,255,255,0.5); letter-spacing: 1.5px; text-transform: uppercase; }
    .sticky-btn {
      font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
      background: var(--gold); color: #fff; border: none; padding: 9px 18px; cursor: pointer; text-decoration: none;
      transition: background 0.2s;
    }
    .sticky-btn:hover { background: var(--gold2); }

    /* ── RESPONSIVE ── */
    @media (max-width: 900px) {
      .nav { padding: 0 24px; }
      .nav-links, .nav-cta { display: none; }
      .nav-burger { display: block; }
      .hero { grid-template-columns: 1fr; min-height: auto; }
      .hero-left { padding: 80px 28px 56px; }
      .hero-right { height: 360px; }
      .sband-grid { grid-template-columns: repeat(2,1fr); }
      .sec { padding: 80px 28px; }
      .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 48px; }
      .work-grid { grid-template-columns: 1fr; }
      .testi-grid { grid-template-columns: 1fr; }
      .service-row { grid-template-columns: 48px 1fr; }
      .svc-num { display: none; }
      .process-step { grid-template-columns: 56px 1fr; gap: 18px; }
      .ps-num { font-size: 36px; }
      footer { flex-direction: column; gap: 20px; padding: 40px 28px; }
      .footer-links { flex-wrap: wrap; }
      .ind-band { padding: 24px 28px; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

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