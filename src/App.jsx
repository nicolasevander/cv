import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0b0f1a",
  bgCard: "#111827",
  bgHighlight: "#162032",
  blue: "#3b82f6",
  blueDim: "rgba(59,130,246,0.12)",
  cyan: "#22d3ee",
  cyanDim: "rgba(34,211,238,0.12)",
  text: "#f1f5f9",
  muted: "#64748b",
  border: "rgba(255,255,255,0.07)",
  borderBlue: "rgba(59,130,246,0.3)",
};

const PROFILE = {
  name: "Nicolas Evander Suhandi",
  title: "Lead QA Engineer",
  tagline: "5+ years building quality at scale across Indonesia, Philippines, Vietnam & Thailand.",
  email: "nicolasevander@gmail.com",
  phone: "+62 878-3437-8737",
  location: "Jakarta, Indonesia",
  linkedin: "https://linkedin.com/in/nicolasevander",
  github: "https://github.com/nicolasevander",
  about: "Software Quality Assurance Engineer with 5+ years of experience delivering reliability across international fintech markets. Expert in test automation, performance testing, and shift-left quality practices. Led QA teams for Kredivo's expansion into Philippines, Thailand, and Vietnam — embedding quality from design to production.",
};

const STATS = [
  { value: "5+", label: "Years Experience" },
  { value: "6+", label: "Partner Integrations" },
  { value: "3", label: "International Markets" },
  { value: "4+", label: "Junior QAs Mentored" },
];

const EXPERIENCES = [
  {
    company: "Kredivo Group",
    logo: "https://i0.wp.com/kredivo.id/wp-content/uploads/2023/02/Kredivo-logo.png?fit=1538%2C524&ssl=1",
    role: "Lead QA Engineer",
    period: "Apr 2025 – Present",
    tenure: null,
    bullets: [
      "Led QA for B2B Kredivo International Squad covering Indonesia, Philippines, Vietnam & Thailand.",
      "Managed 6+ partner integrations (Oppo, Lazada, TikTok, Vivo) across backend and frontend.",
      "Drove automation using Karate and performance testing with Locust and K6.",
      "Standardized QA processes, improved API/client security, introduced mock server implementation.",
    ],
    skills: ["Karate", "Locust", "K6", "Java", "API Testing"],
    links: [
      { label: "Kredivo Thailand", url: "https://kredivo.co.th/en/" },
      { label: "Kredivo Philippines", url: "https://kredivo.com.ph/" },
      { label: "Timo Vietnam", url: "https://timo.vn/en/pay-later/" },
    ],
  },
  {
    company: "Kredivo Group",
    logo: "https://i0.wp.com/kredivo.id/wp-content/uploads/2023/02/Kredivo-logo.png?fit=1538%2C524&ssl=1",
    role: "Senior QA Engineer",
    period: "Oct 2023 – May 2025",
    tenure: null,
    bullets: [
      "Led E2E testing for: Lazada Paylater (Indonesia), TikTok Paylater (Thailand), Kredivo Philippines.",
      "Coordinated cross-market backend/frontend testing with localization and partner compliance.",
      "Initiated performance testing on critical APIs to strengthen system resilience under load.",
      "Mentored junior QAs and ran internal security & testing best-practice sessions.",
    ],
    skills: ["Performance Testing", "Test Strategy", "Mentoring", "Cross-functional"],
  },
  {
    company: "Kredivo Group",
    logo: "https://i0.wp.com/kredivo.id/wp-content/uploads/2023/02/Kredivo-logo.png?fit=1538%2C524&ssl=1",
    role: "QA Engineer",
    period: "Dec 2021 – Oct 2023",
    tenure: "Total Kredivo: 4 yrs 5 mos",
    bullets: [
      "Tested Kredivo Vietnam client apps (Timo Vietnam) and back-end User squad services.",
      "Implemented BDD with Karate for scalable, readable test suites.",
      "Built test strategies and detailed test plans for B2B feature releases.",
      "Drove performance testing on selected APIs to enhance system throughput.",
    ],
    skills: ["BDD", "Karate", "API Testing", "Test Planning"],
    links: [
      { label: "Timo Vietnam Pay Later", url: "https://timo.vn/en/pay-later/" },
    ],
  },
  {
    company: "PT. Sumber Alfaria Trijaya (Alfamart)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/ALFAMART_LOGO_BARU.png",
    role: "QA Analyst",
    period: "Nov 2020 – Dec 2021",
    tenure: null,
    bullets: [
      "Tested Alfamart Android & desktop POS app (Kivy framework) — manual and automated.",
      "Coached QA team members and managed release schedules.",
      "Acted as tech-product consultant and managed API integrations.",
    ],
    skills: ["Telenium", "Postman", "Mobile Testing", "Kivy"],
  },
  {
    company: "PT. Sumber Alfaria Trijaya (Alfamart)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/ALFAMART_LOGO_BARU.png",
    role: "QA Analyst Intern",
    period: "Jan 2020 – Nov 2020",
    tenure: null,
    bullets: [
      "Tested Alfamart web Back Office Migration Framework with manual and automated methods.",
      "Managed release and development schedules.",
    ],
    skills: ["Telenium", "Postman", "SQL Server"],
  },
];

const TOOLGROUPS = [
  {
    icon: "🧪",
    name: "Testing",
    items: ["Manual Testing", "API Testing", "Mobile Testing", "Performance Testing", "BDD", "Shift Left Testing", "Basic Security Testing"],
  },
  {
    icon: "⚙️",
    name: "Frameworks",
    items: ["Karate", "Appium", "Selenium", "Telenium", "REST Assured", "Locust", "K6", "JMeter"],
  },
  {
    icon: "💻",
    name: "Languages",
    items: ["Java", "Python"],
  },
  {
    icon: "🗄️",
    name: "Databases",
    items: ["SQL (PostgreSQL, MySQL)", "NoSQL"],
  },
  {
    icon: "🛠️",
    name: "Tools",
    items: ["Postman", "IntelliJ IDEA", "VS Code", "TestRail", "PyCharm", "UIPath", "Katalon Studio"],
  },
  {
    icon: "📋",
    name: "Management",
    items: ["JIRA", "Git", "Agile/Scrum", "Test Planning", "Team Leadership"],
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Tag({ children }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 10px", fontSize: 11,
      fontFamily: "monospace", background: C.blueDim, color: C.blue,
      borderRadius: 20, marginRight: 6, marginBottom: 5, letterSpacing: 0.3,
      border: `1px solid ${C.borderBlue}`,
    }}>{children}</span>
  );
}

function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["about", "experience", "skills", "contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(11,15,26,0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "monospace", fontSize: 15, fontWeight: 700, color: C.cyan, letterSpacing: 1 }}>
          NE<span style={{ color: C.muted }}>.qa</span>
        </span>
        <div style={{ display: "flex", gap: 28 }} className="nav-links">
          {links.map(l => (
            <a key={l} href={`#${l}`} style={{
              fontFamily: "monospace", fontSize: 13, textDecoration: "none",
              color: active === l ? C.cyan : C.muted,
              textTransform: "capitalize", transition: "color 0.2s", letterSpacing: 0.5,
            }}>{l}</a>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} className="nav-burger" style={{
          display: "none", background: "none", border: "none", color: C.text, fontSize: 22, cursor: "pointer",
        }}>{open ? "✕" : "☰"}</button>
      </div>
      {open && (
        <div className="nav-mobile" style={{
          display: "none", flexDirection: "column", padding: "12px 24px 20px",
          background: "rgba(11,15,26,0.97)", borderTop: `1px solid ${C.border}`, gap: 16,
        }}>
          {links.map(l => (
            <a key={l} href={`#${l}`} onClick={() => setOpen(false)} style={{
              fontFamily: "monospace", fontSize: 14, textDecoration: "none",
              color: active === l ? C.cyan : C.muted, textTransform: "capitalize",
            }}>{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 80); return () => clearTimeout(t); }, []);
  const fade = (delay) => ({
    opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.4,
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59,130,246,0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(34,211,238,0.1) 0%, transparent 40%)`,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
        backgroundSize: "60px 60px", opacity: 0.25,
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
      }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, padding: "0 24px", textAlign: "center" }}>
        <div style={{ ...fade(0.1), display: "inline-block", padding: "5px 16px", borderRadius: 20, border: `1px solid ${C.borderBlue}`, background: C.blueDim, marginBottom: 24 }}>
          <span style={{ fontFamily: "monospace", fontSize: 12, color: C.blue, letterSpacing: 2, textTransform: "uppercase" }}>QA Engineer · Jakarta, Indonesia</span>
        </div>
        <h1 style={{ ...fade(0.25), fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: "clamp(38px, 7vw, 70px)", fontWeight: 800, color: C.text, margin: "0 0 16px", lineHeight: 1.08, letterSpacing: -1.5 }}>
          Nicolas<br /><span style={{ color: C.cyan }}>Evander</span>
        </h1>
        <p style={{ ...fade(0.4), fontFamily: "monospace", fontSize: 15, color: C.blue, margin: "0 0 20px", letterSpacing: 1 }}>
          Lead QA Engineer
        </p>
        <p style={{ ...fade(0.5), fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 18, color: C.muted, lineHeight: 1.75, maxWidth: 580, margin: "0 auto 40px" }}>
          {PROFILE.tagline}
        </p>
        <div style={{ ...fade(0.65), display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#experience" style={{
            padding: "12px 28px", fontFamily: "monospace", fontSize: 13, fontWeight: 700,
            background: C.blue, color: "#fff", textDecoration: "none", borderRadius: 8,
            letterSpacing: 0.5, transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(59,130,246,0.35)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >View Experience</a>
          <a href="#contact" style={{
            padding: "12px 28px", fontFamily: "monospace", fontSize: 13, fontWeight: 700,
            background: "transparent", color: C.text, textDecoration: "none", borderRadius: 8,
            border: `1px solid ${C.border}`, letterSpacing: 0.5, transition: "border-color 0.2s",
          }}
            onMouseOver={e => { e.currentTarget.style.borderColor = C.cyan; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = C.border; }}
          >Get in Touch</a>
        </div>
      </div>
    </section>
  );
}

function About() {
  const [ref, vis] = useInView();
  return (
    <section id="about" style={{ padding: "100px 24px", maxWidth: 1080, margin: "0 auto" }}>
      <div style={{ marginBottom: 56 }}>
        <span style={{ fontFamily: "monospace", fontSize: 12, color: C.blue, letterSpacing: 3, textTransform: "uppercase" }}>01 — About</span>
        <h2 style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 36, fontWeight: 800, color: C.text, margin: "8px 0 0", letterSpacing: -0.5 }}>Who I Am</h2>
      </div>
      <div ref={ref} style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: "all 0.7s ease",
      }} className="two-col">
        <div>
          <p style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 17, color: C.muted, lineHeight: 1.85, margin: "0 0 28px" }}>
            {PROFILE.about}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["Shift Left QA", "Test Automation", "Performance Testing", "International Markets", "Team Leadership", "API Security"].map(t => (
              <span key={t} style={{
                padding: "6px 14px", fontFamily: "monospace", fontSize: 11, color: C.cyan,
                border: `1px solid rgba(34,211,238,0.25)`, borderRadius: 20, letterSpacing: 0.3,
              }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {STATS.map(({ value, label }) => (
            <div key={label} style={{
              background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12,
              padding: "24px 20px", textAlign: "center",
            }}>
              <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 36, fontWeight: 800, color: C.cyan, lineHeight: 1 }}>{value}</div>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: C.muted, marginTop: 8, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
            </div>
          ))}
          <div style={{ gridColumn: "1/-1", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
            {[["Email", PROFILE.email], ["Phone", PROFILE.phone], ["Location", PROFILE.location]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: C.blue, textTransform: "uppercase", letterSpacing: 1 }}>{k}</span>
                <span style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 13, color: C.text }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExpCard({ exp, i }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      display: "grid", gridTemplateColumns: "180px 1fr", gap: 32,
      padding: "36px 0", borderBottom: `1px solid ${C.border}`,
      opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-24px)",
      transition: `all 0.6s ease ${i * 0.07}s`,
    }} className="exp-row">
      <div style={{ paddingTop: 4 }}>
        {exp.logo && (
          <img src={exp.logo} alt={exp.company}
            style={{ height: 24, width: "auto", maxWidth: 80, objectFit: "contain", background: "#fff", borderRadius: 5, padding: "2px 6px", marginBottom: 10, display: "block" }}
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
        )}
        <div style={{ fontFamily: "monospace", fontSize: 11, color: C.muted, letterSpacing: 0.3 }}>{exp.period}</div>
        {exp.tenure && <div style={{ fontFamily: "monospace", fontSize: 10, color: C.blue, marginTop: 6, opacity: 0.8 }}>{exp.tenure}</div>}
      </div>
      <div>
        <h3 style={{ margin: "0 0 4px", fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 19, fontWeight: 700, color: C.text }}>{exp.role}</h3>
        <div style={{ fontFamily: "monospace", fontSize: 12, color: C.cyan, marginBottom: 14 }}>{exp.company}</div>
        <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
          {exp.bullets.map((b, bi) => (
            <li key={bi} style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.75, marginBottom: 6 }}>{b}</li>
          ))}
        </ul>
        <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap" }}>
          {exp.skills.map(s => <Tag key={s}>{s}</Tag>)}
        </div>
        {exp.links?.length > 0 && (
          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {exp.links.map(l => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "monospace", fontSize: 11, color: C.muted, textDecoration: "none",
                padding: "4px 12px", border: `1px solid ${C.border}`, borderRadius: 4, transition: "all 0.2s",
              }}
                onMouseOver={e => { e.currentTarget.style.borderColor = C.cyan; e.currentTarget.style.color = C.cyan; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
              >{l.label} ↗</a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" style={{ padding: "100px 24px", maxWidth: 1080, margin: "0 auto" }}>
      <div style={{ marginBottom: 56 }}>
        <span style={{ fontFamily: "monospace", fontSize: 12, color: C.blue, letterSpacing: 3, textTransform: "uppercase" }}>02 — Experience</span>
        <h2 style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 36, fontWeight: 800, color: C.text, margin: "8px 0 0", letterSpacing: -0.5 }}>Work History</h2>
      </div>
      {EXPERIENCES.map((exp, i) => <ExpCard key={i} exp={exp} i={i} />)}
      <div style={{ marginTop: 56 }}>
        <h3 style={{ fontFamily: "monospace", fontSize: 11, color: C.blue, textTransform: "uppercase", letterSpacing: 2, marginBottom: 20 }}>Education</h3>
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
            <img src="https://upload.wikimedia.org/wikipedia/id/thumb/0/05/UKSW.svg/330px-UKSW.svg.png"
              alt="UKSW" style={{ height: 32, width: "auto", maxWidth: 80, objectFit: "contain", background: "#fff", borderRadius: 6, padding: "3px 6px" }}
              onError={e => { e.currentTarget.style.display = "none"; }}
            />
            <div>
              <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 16, fontWeight: 700, color: C.text }}>Universitas Kristen Satya Wacana</div>
              <div style={{ fontFamily: "monospace", fontSize: 12, color: C.muted, marginTop: 2 }}>Bachelor's Degree, Information Systems · 2016 – 2020</div>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <div style={{ fontFamily: "monospace", fontSize: 13, color: C.cyan, fontWeight: 700 }}>GPA 3.93</div>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: C.muted, marginTop: 2 }}>University Student Senate</div>
            </div>
          </div>
          <p style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.75, margin: 0 }}>
            Developed a strong foundation bridging business and technology — translating organizational needs into technical systems, redesigning business workflows for operational efficiency, and evaluating IT management practices to deliver actionable improvements.
          </p>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "100px 24px", maxWidth: 1080, margin: "0 auto" }}>
      <div style={{ marginBottom: 56 }}>
        <span style={{ fontFamily: "monospace", fontSize: 12, color: C.blue, letterSpacing: 3, textTransform: "uppercase" }}>03 — Skills</span>
        <h2 style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 36, fontWeight: 800, color: C.text, margin: "8px 0 0", letterSpacing: -0.5 }}>Technical Toolkit</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
        {TOOLGROUPS.map((g, gi) => {
          const [ref, vis] = useInView();
          return (
            <div key={gi} ref={ref} style={{
              background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24,
              opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(18px)",
              transition: `all 0.5s ease ${gi * 0.07}s`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: 18 }}>{g.icon}</span>
                <h4 style={{ margin: 0, fontFamily: "monospace", fontSize: 11, color: C.cyan, textTransform: "uppercase", letterSpacing: 1.5 }}>{g.name}</h4>
              </div>
              {g.items.map(item => (
                <div key={item} style={{
                  fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 13, color: C.muted,
                  padding: "6px 0", borderBottom: `1px solid ${C.border}`,
                }}>{item}</div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Contact() {
  const [ref, vis] = useInView();
  return (
    <section id="contact" style={{ padding: "100px 24px 80px", maxWidth: 1080, margin: "0 auto" }}>
      <div style={{ marginBottom: 56 }}>
        <span style={{ fontFamily: "monospace", fontSize: 12, color: C.blue, letterSpacing: 3, textTransform: "uppercase" }}>04 — Contact</span>
        <h2 style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 36, fontWeight: 800, color: C.text, margin: "8px 0 0", letterSpacing: -0.5 }}>Let's Talk</h2>
      </div>
      <div ref={ref} style={{
        maxWidth: 560, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.7s ease",
      }}>
        <p style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: 17, color: C.muted, lineHeight: 1.8, marginBottom: 36 }}>
          Open to discussing QA strategy, automation architecture, performance engineering, or new opportunities across Southeast Asia and beyond.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a href={`mailto:${PROFILE.email}`} style={{
            padding: "13px 32px", fontFamily: "monospace", fontSize: 13, fontWeight: 700,
            background: C.cyan, color: C.bg, textDecoration: "none", borderRadius: 8,
            letterSpacing: 0.5, transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(34,211,238,0.3)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >Send Email</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" style={{
            padding: "13px 28px", fontFamily: "monospace", fontSize: 13,
            background: "transparent", color: C.text, textDecoration: "none", borderRadius: 8,
            border: `1px solid ${C.border}`, letterSpacing: 0.5, transition: "border-color 0.2s",
          }}
            onMouseOver={e => { e.currentTarget.style.borderColor = C.blue; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = C.border; }}
          >LinkedIn ↗</a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" style={{
            padding: "13px 28px", fontFamily: "monospace", fontSize: 13,
            background: "transparent", color: C.text, textDecoration: "none", borderRadius: 8,
            border: `1px solid ${C.border}`, letterSpacing: 0.5, transition: "border-color 0.2s",
          }}
            onMouseOver={e => { e.currentTarget.style.borderColor = C.blue; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = C.border; }}
          >GitHub ↗</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, padding: "28px 24px", textAlign: "center" }}>
      <span style={{ fontFamily: "monospace", fontSize: 12, color: C.muted }}>
        © {new Date().getFullYear()} Nicolas Evander Suhandi · Lead QA Engineer
      </span>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = ["about", "experience", "skills", "contact"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.2 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; scroll-padding-top: 72px; }
        body { margin: 0; background: ${C.bg}; color: ${C.text}; -webkit-font-smoothing: antialiased; }
        ::selection { background: ${C.blueDim}; color: ${C.cyan}; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-burger { display: block !important; }
          .nav-mobile { display: flex !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .exp-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Nav active={active} />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
