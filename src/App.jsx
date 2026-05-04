import { useState, useEffect, useRef } from "react";

const PALETTE = {
  bg: "#0a0a0f",
  bgCard: "#12121a",
  bgGlass: "rgba(255,255,255,0.03)",
  accent: "#e8c547",
  accentDim: "rgba(232,197,71,0.15)",
  text: "#e8e6e1",
  textMuted: "#8a8880",
  border: "rgba(255,255,255,0.06)",
  borderAccent: "rgba(232,197,71,0.25)",
};

const PROFILE = {
  name: "Nicolas Evander Suhandi",
  title: "Lead QA Engineer",
  tagline: "Ensuring software quality across international markets with automation, performance testing, and team leadership.",
  email: "nicolasevander@gmail.com",
  phone: "+62 878-3437-8737",
  location: "Jakarta, Indonesia",
  linkedin: "https://linkedin.com/in/nicolasevander",
  about:
    "Software Quality Assurance Engineer with 5+ years of experience in the information technology and services industry. Skilled in Java, test automation, API testing, and performance testing. Experienced in leading QA teams for international markets across Indonesia, Philippines, and Thailand. Strong engineering professional with a Bachelor's degree in Information Systems from Universitas Kristen Satya Wacana.",
};

const EXPERIENCES = [
  {
    company: "Kredivo Group",
    logo: "https://logo.clearbit.com/kredivo.com",
    role: "Lead QA Engineer",
    period: "Apr 2025 – Present",
    tenure: null,
    bullets: [
      "Led QA for B2B Kredivo International Squad, covering Indonesia, Philippines, and Thailand across backend and frontend.",
      "Managed 6 partner integrations including Oppo, Lazada, TikTok, Vivo, and B2C clients in Philippines & Thailand.",
      "Drove automation using Karate framework, and executed performance tests with Locust and K6.",
      "Standardized QA processes, improved API/client security, and introduced mock server implementation.",
    ],
    skills: ["Karate", "Locust", "K6", "Java", "API Testing"],
    links: [
      { label: "Kredivo Thailand", url: "https://kredivo.co.th/en/" },
      { label: "Kredivo Philippines", url: "https://kredivo.com.ph/" },
    ],
  },
  {
    company: "Kredivo Group",
    logo: "https://logo.clearbit.com/kredivo.com",
    role: "Senior QA Engineer",
    period: "Oct 2023 – May 2025",
    tenure: null,
    bullets: [
      "Led end-to-end testing for key regional and partner launches: Lazada Paylater (Indonesia), TikTok Paylater (Thailand), Kredivo Philippines.",
      "Coordinated backend and frontend testing for international markets, ensuring localization, partner compliance, and system robustness.",
      "Initiated performance testing on critical APIs to improve user experience and system response under load.",
      "Created test strategies and cross-functional collaboration routines that improved release confidence and reduced defect leakage.",
      "Mentored junior QAs and contributed to internal QA learning sessions focused on security and testing best practices.",
    ],
    skills: ["Performance Testing", "Test Strategy", "Cross-functional Collaboration", "Mentoring"],
  },
  {
    company: "Kredivo Group",
    logo: "https://logo.clearbit.com/kredivo.com",
    role: "QA Engineer",
    period: "Dec 2021 – Oct 2023",
    tenure: "Total Kredivo tenure: 4 years 5 months",
    bullets: [
      "Responsible for testing Kredivo Vietnam client apps and conducting back-end testing in the User squad.",
      "Successfully implemented Behavior-Driven Development (BDD) for efficient test case creation.",
      "Led test strategy development and created detailed test plans for B2B feature releases.",
      "Performed performance testing on selected APIs to enhance system performance.",
      "Collaborated across teams to maintain high-quality standards and improve testing processes.",
    ],
    skills: ["BDD", "API Testing", "Test Planning", "Java"],
    links: [
      { label: "Timo Vietnam Pay Later", url: "https://timo.vn/en/pay-later/" },
    ],
  },
  {
    company: "PT. Sumber Alfaria Trijaya (Alfamart)",
    logo: "https://logo.clearbit.com/alfamart.co.id",
    role: "Quality Assurance Analyst",
    period: "Nov 2020 – Dec 2021",
    tenure: null,
    bullets: [
      "Tested Alfamart Android and desktop application (Point of Sales using Kivy Framework) and created related test cases.",
      "Performed manual and automated mobile and desktop application testing.",
      "Coached and mentored QA team members on testing best practices.",
      "Managed application release and development schedules.",
      "Acted as consultant between product and technology teams and managed API integration.",
    ],
    skills: ["Telenium", "Postman", "PyCharm", "Mobile Testing", "Kivy"],
  },
  {
    company: "PT. Sumber Alfaria Trijaya (Alfamart)",
    logo: "https://logo.clearbit.com/alfamart.co.id",
    role: "Quality Assurance Analyst Intern",
    period: "Jan 2020 – Nov 2020",
    tenure: null,
    bullets: [
      "Tested Alfamart web application and created related test cases for Back Office Migration Framework.",
      "Performed manual web application testing and learned automated testing techniques.",
      "Managed application release and development schedules.",
    ],
    skills: ["Telenium", "Postman", "SQL Server", "SQL Developer", "PyCharm"],
  },
];

const SKILLS = [
  { category: "Testing", items: ["Manual Testing", "Automation Testing", "Performance Testing", "API Testing", "BDD", "Test Planning", "Agile/Scrum"] },
  { category: "Automation & Perf", items: ["Karate", "Selenium", "REST Assured", "Telenium", "Locust", "K6", "JMeter"] },
  { category: "Languages", items: ["Java", "Python", "HTML", "CSS"] },
  { category: "Applications", items: ["Postman", "PyCharm", "IntelliJ IDEA", "VS Code", "TestRail", "UIPath", "Katalon Studio"] },
  { category: "Databases", items: ["MySQL", "PostgreSQL", "SQL Server", "Oracle", "SQLite"] },
  { category: "Management", items: ["JIRA", "Git", "Slack", "Spreadsheet"] },
];

const EDUCATION = [
  {
    school: "Universitas Kristen Satya Wacana",
    degree: "Bachelor of Information Systems",
    period: "2016 – 2020",
  },
];

const CERTIFICATIONS = ["Oracle Database 11g Administrator Certified Associate"];

const PUBLICATIONS = [
  "Rancang Bangun Sistem Informasi Geografis Rekomendasi Cagar Budaya Menggunakan Metode Analytic Hierarchy Process",
];

function useInView(threshold = 0.15) {
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

function Badge({ children }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", fontSize: 12,
      fontFamily: "'JetBrains Mono', monospace", background: PALETTE.accentDim,
      color: PALETTE.accent, borderRadius: 4, marginRight: 6, marginBottom: 6, letterSpacing: 0.3,
    }}>{children}</span>
  );
}

function SectionTitle({ children, index }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      marginBottom: 48, opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: "all 0.7s cubic-bezier(.22,1,.36,1)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: PALETTE.accent }}>{index}</span>
        <h2 style={{
          margin: 0, fontSize: 32, fontFamily: "'Playfair Display', serif",
          fontWeight: 700, color: PALETTE.text, letterSpacing: -0.5,
        }}>{children}</h2>
        <div style={{
          flex: 1, height: 1,
          background: `linear-gradient(to right, ${PALETTE.borderAccent}, transparent)`, marginLeft: 16,
        }} />
      </div>
    </div>
  );
}

function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["about", "experience", "skills", "credentials", "contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "12px 0" : "20px 0",
      background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${PALETTE.border}` : "1px solid transparent",
      transition: "all 0.35s ease",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <a href="#hero" style={{
          fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700,
          color: PALETTE.accent, textDecoration: "none", letterSpacing: -0.5,
        }}>Nicolas<span style={{ color: PALETTE.textMuted }}>.</span></a>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="nav-desktop">
          {links.map((l) => (
            <a key={l} href={`#${l}`} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 13, textTransform: "capitalize",
              textDecoration: "none", color: activeSection === l ? PALETTE.accent : PALETTE.textMuted,
              transition: "color 0.25s", letterSpacing: 0.5,
            }}>{l}</a>
          ))}
        </div>
        <button className="nav-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)} style={{
          display: "none", background: "none", border: "none",
          color: PALETTE.text, fontSize: 24, cursor: "pointer",
        }}>{mobileOpen ? "✕" : "☰"}</button>
      </div>
      {mobileOpen && (
        <div className="nav-mobile-menu" style={{
          display: "none", flexDirection: "column", gap: 16, padding: "16px 24px",
          background: "rgba(10,10,15,0.95)", borderTop: `1px solid ${PALETTE.border}`,
        }}>
          {links.map((l) => (
            <a key={l} href={`#${l}`} onClick={() => setMobileOpen(false)} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 14, textTransform: "capitalize",
              textDecoration: "none", color: activeSection === l ? PALETTE.accent : PALETTE.textMuted, letterSpacing: 0.5,
            }}>{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${PALETTE.border} 1px, transparent 1px), linear-gradient(90deg, ${PALETTE.border} 1px, transparent 1px)`,
        backgroundSize: "80px 80px", opacity: 0.35,
        maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)",
      }} />
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,197,71,0.08), transparent 70%)",
        top: "20%", left: "55%", transform: "translate(-50%, -50%)", filter: "blur(60px)",
      }} />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 760, padding: "0 24px" }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: PALETTE.accent,
          letterSpacing: 3, textTransform: "uppercase", marginBottom: 20,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(.22,1,.36,1) 0.2s",
        }}>Hello, I'm</p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 7vw, 68px)",
          fontWeight: 800, color: PALETTE.text, margin: "0 0 16px", lineHeight: 1.05, letterSpacing: -1.5,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s cubic-bezier(.22,1,.36,1) 0.35s",
        }}>Nicolas Evander</h1>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: PALETTE.textMuted,
          letterSpacing: 1, margin: "0 0 28px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(.22,1,.36,1) 0.5s",
        }}>Lead QA Engineer</p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: PALETTE.textMuted,
          lineHeight: 1.7, maxWidth: 560, margin: "0 auto 36px",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(.22,1,.36,1) 0.6s",
        }}>{PROFILE.tagline}</p>
        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(.22,1,.36,1) 0.75s",
        }}>
          <a href="#contact" style={{
            display: "inline-block", padding: "12px 32px", fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13, fontWeight: 600, background: PALETTE.accent, color: PALETTE.bg,
            textDecoration: "none", borderRadius: 6, letterSpacing: 0.5, transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 30px ${PALETTE.accentDim}`; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >Get in Touch</a>
          <a href="#experience" style={{
            display: "inline-block", padding: "12px 32px", fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13, fontWeight: 600, background: "transparent", color: PALETTE.text,
            textDecoration: "none", borderRadius: 6, border: `1px solid ${PALETTE.border}`,
            letterSpacing: 0.5, transition: "border-color 0.25s",
          }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = PALETTE.accent; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = PALETTE.border; }}
          >View Resume</a>
        </div>
      </div>
    </section>
  );
}

function About() {
  const [ref, visible] = useInView();
  return (
    <section id="about" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle index="01">About Me</SectionTitle>
      <div ref={ref} style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48,
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(.22,1,.36,1)",
      }} className="about-grid">
        <div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: PALETTE.textMuted, lineHeight: 1.8, margin: 0,
          }}>{PROFILE.about}</p>
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["5+ Years QA", "International Markets", "Test Automation", "Team Leadership"].map(tag => (
              <span key={tag} style={{
                padding: "6px 14px", fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
                color: PALETTE.accent, border: `1px solid ${PALETTE.borderAccent}`, borderRadius: 20, letterSpacing: 0.3,
              }}>{tag}</span>
            ))}
          </div>
        </div>
        <div style={{
          background: PALETTE.bgCard, borderRadius: 12, border: `1px solid ${PALETTE.border}`, padding: 32,
        }}>
          {[
            ["Name", PROFILE.name],
            ["Email", PROFILE.email],
            ["Phone", PROFILE.phone],
            ["Location", PROFILE.location],
          ].map(([label, val]) => (
            <div key={label} style={{
              display: "flex", justifyContent: "space-between", padding: "12px 0",
              borderBottom: `1px solid ${PALETTE.border}`,
            }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: PALETTE.accent, textTransform: "uppercase", letterSpacing: 1 }}>{label}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: PALETTE.text, textAlign: "right" }}>{val}</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: PALETTE.textMuted,
              textDecoration: "none", padding: "6px 14px", border: `1px solid ${PALETTE.border}`,
              borderRadius: 4, transition: "all 0.25s",
            }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = PALETTE.accent; e.currentTarget.style.color = PALETTE.accent; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = PALETTE.border; e.currentTarget.style.color = PALETTE.textMuted; }}
            >LinkedIn ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp, index }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      display: "grid", gridTemplateColumns: "200px 1fr", gap: 32,
      padding: "40px 0", borderBottom: `1px solid ${PALETTE.border}`,
      opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)",
      transition: `all 0.7s cubic-bezier(.22,1,.36,1) ${index * 0.08}s`,
    }} className="exp-card">
      <div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: PALETTE.textMuted, letterSpacing: 0.5 }}>
          {exp.period}
        </span>
        {exp.tenure && (
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: PALETTE.accent, marginTop: 8, opacity: 0.7 }}>
            {exp.tenure}
          </p>
        )}
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          {exp.logo && (
            <img
              src={exp.logo}
              alt={exp.company}
              width={28}
              height={28}
              style={{ borderRadius: 6, objectFit: "contain", background: "#fff", padding: 2 }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          )}
          <h3 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: PALETTE.text }}>
            {exp.role}
          </h3>
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: PALETTE.accent,
          display: "inline-block", marginBottom: 16,
        }}>{exp.company}</span>
        <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
          {exp.bullets.map((b, i) => (
            <li key={i} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: PALETTE.textMuted,
              lineHeight: 1.7, marginBottom: 8,
            }}>{b}</li>
          ))}
        </ul>
        <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap" }}>
          {exp.skills.map((s) => <Badge key={s}>{s}</Badge>)}
        </div>
        {exp.links && exp.links.length > 0 && (
          <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {exp.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: PALETTE.textMuted,
                textDecoration: "none", padding: "5px 12px",
                border: `1px solid ${PALETTE.border}`, borderRadius: 4,
                transition: "all 0.25s",
              }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = PALETTE.accent; e.currentTarget.style.color = PALETTE.accent; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = PALETTE.border; e.currentTarget.style.color = PALETTE.textMuted; }}
              >{link.label} ↗</a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle index="02">Experience</SectionTitle>
      {EXPERIENCES.map((exp, i) => <ExperienceCard key={i} exp={exp} index={i} />)}
      <div style={{ marginTop: 64 }}>
        <h3 style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: PALETTE.accent,
          textTransform: "uppercase", letterSpacing: 2, marginBottom: 24,
        }}>Education</h3>
        {EDUCATION.map((ed, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
            padding: "12px 0", borderBottom: `1px solid ${PALETTE.border}`,
          }} className="edu-row">
            <div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: PALETTE.text, fontWeight: 600 }}>{ed.school}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: PALETTE.textMuted, marginLeft: 12 }}>{ed.degree}</span>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: PALETTE.textMuted }}>{ed.period}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle index="03">Technical Skills</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }} className="skills-grid">
        {SKILLS.map((group, gi) => {
          const [ref, visible] = useInView();
          return (
            <div key={gi} ref={ref} style={{
              background: PALETTE.bgCard, border: `1px solid ${PALETTE.border}`, borderRadius: 12, padding: 24,
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.6s cubic-bezier(.22,1,.36,1) ${gi * 0.08}s`,
            }}>
              <h4 style={{
                margin: "0 0 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                color: PALETTE.accent, textTransform: "uppercase", letterSpacing: 1.5,
              }}>{group.category}</h4>
              {group.items.map((item) => (
                <div key={item} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: PALETTE.textMuted,
                  padding: "6px 0", borderBottom: `1px solid ${PALETTE.border}`,
                }}>{item}</div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Credentials() {
  const [ref, visible] = useInView();
  return (
    <section id="credentials" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle index="04">Credentials</SectionTitle>
      <div ref={ref} style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32,
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.7s cubic-bezier(.22,1,.36,1)",
      }} className="about-grid">
        <div style={{
          background: PALETTE.bgCard, border: `1px solid ${PALETTE.border}`, borderRadius: 12, padding: 28,
        }}>
          <h4 style={{
            margin: "0 0 20px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
            color: PALETTE.accent, textTransform: "uppercase", letterSpacing: 1.5,
          }}>Certifications</h4>
          {CERTIFICATIONS.map((c, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0",
              borderBottom: `1px solid ${PALETTE.border}`,
            }}>
              <span style={{ color: PALETTE.accent, fontSize: 16, lineHeight: 1 }}>◆</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: PALETTE.text, lineHeight: 1.5 }}>{c}</span>
            </div>
          ))}
        </div>
        <div style={{
          background: PALETTE.bgCard, border: `1px solid ${PALETTE.border}`, borderRadius: 12, padding: 28,
        }}>
          <h4 style={{
            margin: "0 0 20px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
            color: PALETTE.accent, textTransform: "uppercase", letterSpacing: 1.5,
          }}>Publications</h4>
          {PUBLICATIONS.map((p, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0",
              borderBottom: `1px solid ${PALETTE.border}`,
            }}>
              <span style={{ color: PALETTE.accent, fontSize: 16, lineHeight: 1 }}>◆</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: PALETTE.text, lineHeight: 1.5, fontStyle: "italic" }}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, visible] = useInView();
  return (
    <section id="contact" style={{ padding: "100px 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionTitle index="05">Contact</SectionTitle>
      <div ref={ref} style={{
        textAlign: "center", maxWidth: 560, margin: "0 auto",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.8s cubic-bezier(.22,1,.36,1)",
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: PALETTE.textMuted,
          lineHeight: 1.8, marginBottom: 32,
        }}>
          I'm always open to discussing QA strategy, test automation, or new opportunities. Feel free to reach out — let's connect.
        </p>
        <a href={`mailto:${PROFILE.email}`} style={{
          display: "inline-block", padding: "14px 40px", fontFamily: "'JetBrains Mono', monospace",
          fontSize: 14, fontWeight: 600, background: PALETTE.accent, color: PALETTE.bg,
          textDecoration: "none", borderRadius: 6, letterSpacing: 0.5, transition: "transform 0.2s, box-shadow 0.2s",
        }}
          onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 30px ${PALETTE.accentDim}`; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
        >Say Hello</a>
        <div style={{ marginTop: 24, display: "flex", gap: 20, justifyContent: "center" }}>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: PALETTE.textMuted,
            textDecoration: "none", transition: "color 0.25s",
          }}
            onMouseOver={(e) => { e.currentTarget.style.color = PALETTE.accent; }}
            onMouseOut={(e) => { e.currentTarget.style.color = PALETTE.textMuted; }}
          >LinkedIn</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ textAlign: "center", padding: "32px 24px", borderTop: `1px solid ${PALETTE.border}` }}>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: PALETTE.textMuted, margin: 0 }}>
        © {new Date().getFullYear()} Nicolas Evander Suhandi
      </p>
    </footer>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const sections = ["about", "experience", "skills", "credentials", "contact"];
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.25 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:wght@700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; scroll-padding-top: 80px; }
        body { margin: 0; padding: 0; background: ${PALETTE.bg}; color: ${PALETTE.text}; -webkit-font-smoothing: antialiased; }
        ::selection { background: ${PALETTE.accentDim}; color: ${PALETTE.accent}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${PALETTE.bg}; }
        ::-webkit-scrollbar-thumb { background: ${PALETTE.border}; border-radius: 3px; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
          .nav-mobile-menu { display: flex !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .exp-card { grid-template-columns: 1fr !important; }
          .edu-row { flex-direction: column !important; gap: 4px !important; }
        }
      `}</style>
      <Nav activeSection={activeSection} />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Credentials />
      <Contact />
      <Footer />
    </>
  );
}
