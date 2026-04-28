import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Globe,
  Phone,
  Mail,
  ExternalLink,
  MapPin,
  MessageSquare,
  X,
  Menu,
} from 'lucide-react';

import anh1 from './assets/anh1.jpeg';
import anh2 from './assets/anh2.jpeg';
import anh3 from './assets/anh3.jpeg';
import anh4 from './assets/anh2.jpeg';
import './index.css';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#education', label: 'Education' },
  { href: '#experience', label: 'Experience' },
  { href: '#leadership', label: 'Leadership' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const;

const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.06, duration: 0.4 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const LINKEDIN = 'https://www.linkedin.com/in/phong-tran';
const EMAIL = 'phongtran@nyu.edu';
const PHONE_DISPLAY = '(857) 395-2309';
const PHONE_HREF = 'tel:+18573952309';

const questions = [
  {
    q: 'What kind of investment work do you focus on?',
    a: 'I focus on healthcare-oriented investment analysis: market sizing, benchmarking, valuation work, and due diligence support for early-stage and lower-middle-market opportunities.',
  },
  {
    q: 'What do you do at Golden Gate Ventures?',
    a: 'I screen inbound startups, build research around white-space opportunities, and support diligence on potential $2M-$5M investments with market and competitor analysis.',
  },
  {
    q: 'What are your strongest technical skills?',
    a: 'Financial modeling, DCF/comparable valuation, market research, and clear investment memo writing. I also use Python/SQL and BI tools when analysis needs more structure.',
  },
  {
    q: 'What roles are you pursuing next?',
    a: 'I am actively pursuing internships in credit, private credit, investment banking, and private equity where analytical rigor and disciplined downside thinking matter.',
  },
];

type ChatMessage = { text: string; sender: 'bot' | 'user' };

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: 'Ask a quick question to see how Phong approaches investing and diligence.',
      sender: 'bot',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleApplyQuestion = (qObj: (typeof questions)[number]) => {
    setMessages((prev) => [...prev, { text: qObj.q, sender: 'user' }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: qObj.a, sender: 'bot' }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      <motion.div
        className="chat-bubble"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={22} strokeWidth={2} /> : <MessageSquare size={22} strokeWidth={2} />}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-container"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
          >
            <div className="chat-window">
              <div className="chat-header">
                <h4>Ask Phong</h4>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    background: 'var(--text)',
                    borderRadius: '50%',
                    opacity: 0.85,
                  }}
                />
              </div>
              <div className="chat-body">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    className={`msg msg-${m.sender}`}
                    initial={{ opacity: 0, x: m.sender === 'bot' ? -8 : 8 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {m.text}
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="msg msg-bot" style={{ opacity: 0.65 }}>
                    ...
                  </div>
                )}
              </div>
              <div className="chat-footer">
                {questions.map((q, i) => (
                  <button
                    key={i}
                    type="button"
                    className="suggestion-chip"
                    onClick={() => handleApplyQuestion(q)}
                  >
                    {q.q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 14);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div className="loading-screen" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
      <motion.div
        aria-hidden
        className="loader-aurora"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.08, 1],
          opacity: [0.55, 0.85, 0.55],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="loader-logo"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        PHONG TRAN
      </motion.div>
      <div className="loader-bar-bg">
        <motion.div
          className="loader-bar-fill"
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'linear' }}
        />
      </div>
      <div className="loader-number">{progress}%</div>
    </motion.div>
  );
};

type ExpProps = {
  company: string;
  role: string;
  location: string;
  date: string;
  descs: string[];
};

const ExperienceCard = ({ company, role, location, date, descs }: ExpProps) => (
  <motion.div
    initial={{ opacity: 0, y: 48, filter: 'blur(12px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    }}
    whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] } }}
    viewport={{ once: true, margin: '-60px 0px', amount: 0.25 }}
    className="exp-card"
  >
    <div className="exp-date">
      {date}
      <span className="exp-loc">{location}</span>
    </div>
    <div className="exp-info">
      <h3>{company}</h3>
      <div className="exp-role">{role}</div>
      <div className="exp-desc">
        <ul>
          {descs.map((desc, i) => (
            <li key={i}>{desc}</li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const iconColor = 'var(--text)';

  return (
    <div className="app-main">
      <AnimatePresence>{loading && <LoadingScreen key="loader" />}</AnimatePresence>

      <div className="mesh-gradient" aria-hidden="true">
        <span className="aurora-blob aurora-blob-a" />
        <span className="aurora-blob aurora-blob-b" />
        <span className="aurora-blob aurora-blob-c" />
      </div>
      <motion.div className="scroll-progress" style={{ scaleX, transformOrigin: '0%' }} />

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
          <nav className={`nav-shell${menuOpen ? ' nav-shell--menu-open' : ''}`}>
            <motion.span
              className="nav-brand"
              layout
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              P. TRAN
            </motion.span>
            <button
              type="button"
              className="nav-menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
            </button>
            <ul className="nav-links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
            <div className="nav-actions">
              <a className="nav-icon-btn" href={`mailto:${EMAIL}`} aria-label="Email">
                <Mail size={18} strokeWidth={1.75} />
              </a>
              <a
                className="nav-icon-btn"
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <ExternalLink size={18} strokeWidth={1.75} />
              </a>
            </div>
          </nav>

          <AnimatePresence>
            {menuOpen && (
              <>
                <motion.div
                  key="nav-backdrop"
                  className="nav-mobile-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={closeMenu}
                  aria-hidden
                />
                <motion.div
                  id="mobile-nav-drawer"
                  key="nav-drawer"
                  className="nav-mobile-drawer"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Navigation"
                  initial={{ opacity: 0, x: '102%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '102%' }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.ul
                    className="nav-mobile-links"
                    variants={{
                      hidden: {},
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.08, delayChildren: 0.06 },
                      },
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    {NAV_LINKS.map((link) => (
                      <motion.li
                        key={link.href}
                        variants={{
                          hidden: { opacity: 0, x: 40 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                          },
                        }}
                      >
                        <a href={link.href} onClick={closeMenu}>
                          {link.label}
                        </a>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <main>
            <section className="hero">
              <motion.div
                className="hero-content"
                variants={heroContainer}
                initial="hidden"
                animate="show"
              >
                <motion.span className="hero-eyebrow" variants={heroItem}>
                  NYU Stern · Finance + Data Science
                </motion.span>
                <motion.h1 className="hero-title" variants={heroItem}>
                  Phong
                  <br />
                  <span className="gradient-text">Tran</span>
                </motion.h1>
                <motion.div variants={heroItem}>
                <p className="hero-lede">
                  I am an investment-focused undergraduate with hands-on experience across{' '}
                  <span className="key-pill">venture capital</span>,{' '}
                  <span className="key-pill">healthcare investing</span>, and{' '}
                  <span className="key-pill">private market research</span>. I build clear, decision-ready
                  analysis through <span className="key-pill">valuation</span>,{' '}
                  <span className="key-pill">due diligence</span>, and{' '}
                  <span className="key-pill">market intelligence</span>.
                </p>
                <div className="hero-meta">
                  <span className="hero-meta-row">
                    <MapPin size={15} strokeWidth={1.75} />
                    New York, NY 10003
                  </span>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
                  <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </div>
                <div className="hero-cta-row">
                  <motion.a href={`mailto:${EMAIL}`} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.96 }}>
                    <span className="btn-primary" style={{ display: 'inline-block' }}>
                      Email
                    </span>
                  </motion.a>
                  <motion.a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span className="btn-ghost" style={{ display: 'inline-block' }}>
                      LinkedIn
                    </span>
                  </motion.a>
                </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="hero-visual"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="hero-frame float-loop glow-loop"
                  animate={{
                    y: [0, -14, 0],
                    rotate: [0, -0.5, 0.5, 0],
                  }}
                  transition={{
                    duration: 6.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="photo-badge">GPA 3.9</div>
                  <img src={anh1} alt="Phong Tran portrait" className="main-img" />
                </motion.div>
              </motion.div>
            </section>

            <section id="about" className="section-band section-band-alt">
              <div className="section-shell">
              <div className="section-head">
                <span className="section-label">About</span>
                <h2 className="section-title">Analytical, execution-focused, and investor-minded</h2>
              </div>
              <div className="about-split">
                <div className="about-copy">
                  <p>
                    My work combines <span className="key-pill">financial modeling</span>, strategic research,
                    and practical due diligence. I am especially interested in opportunities where strong{' '}
                    <span className="key-pill">downside analysis</span> and structured judgment can improve
                    investment outcomes.
                  </p>
                  <p>
                    Across internships and case competitions, I have learned to convert raw data into clear
                    investment narratives that help teams make faster and better decisions.
                  </p>
                </div>
                <figure className="about-figure">
                  <img src={anh2} alt="Phong Tran in professional setting" className="editorial-img" />
                  <figcaption className="figure-caption">New York - learning through execution</figcaption>
                </figure>
              </div>
              <div className="stat-grid about-stats-row">
                {[
                  { icon: TrendingUp, label: 'Current role', val: 'VC investment analysis' },
                  { icon: BarChart3, label: 'Core work', val: 'DCF, comps, diligence' },
                  { icon: PieChart, label: 'Sector focus', val: 'Healthcare' },
                  { icon: Globe, label: 'Target path', val: 'Credit and private markets' },
                ].map((item, i) => (
                  <div key={i} className="crystal-panel stat-cell">
                    <item.icon size={22} color={iconColor} strokeWidth={1.75} style={{ marginBottom: 14 }} />
                    <div className="stat-label">{item.label}</div>
                    <div className="stat-value">{item.val}</div>
                  </div>
                ))}
              </div>
              </div>
            </section>

            <section id="education" className="section-band">
              <div className="section-shell">
              <div className="section-head">
                <span className="section-label">Education</span>
                <h2 className="section-title">New York University</h2>
              </div>
              <div className="crystal-panel edu-card">
                <h3>NYU Stern School of Business</h3>
                <p className="edu-sub">
                  New York, NY - B.S. in Finance (Minor in Data Science) - GPA 3.9 - Expected May 2028
                </p>
                <ul className="edu-list">
                  <li>
                    <strong style={{ color: 'var(--text)' }}>Coursework: </strong>
                    Corporate Finance, Accounting, Managing Investment Funds, Foundations of Finance, Debt
                    Instruments
                  </li>
                  <li>
                    <strong style={{ color: 'var(--text)' }}>Awards: </strong>
                    NYU Restructuring Case Competition (Top 10, 2026), FTI Case Challenge (Top 4, 2026), VCG
                    Case Competition (Runner-Up, 2025), International Math Challenge (Gold Medal, 2023)
                  </li>
                </ul>
              </div>
              </div>
            </section>

            <section className="strip-section" aria-label="Editorial photograph">
              <div className="strip-inner">
                <img src={anh3} alt="Learning and investing journey" className="strip-img" />
                <div className="strip-caption">
                  <span>Strong investment decisions come from disciplined analysis.</span>
                  <span>Field note</span>
                </div>
              </div>
            </section>

            <section id="experience" className="section-band section-band-alt">
              <div className="section-shell">
              <div className="section-head">
                <span className="section-label">Experience</span>
                <h2 className="section-title">Professional roles</h2>
              </div>
              <div>
                <ExperienceCard
                  company="Golden Gate Ventures Fund Management"
                  role="Investment Analysis Intern"
                  location="New York, NY"
                  date="Jan 2026 - Present"
                  descs={[
                    'Conduct primary and secondary research across 12+ healthcare subsectors, delivering market analysis, competitive benchmarking, and valuation support for investment decisions.',
                    'Screen inbound pitch decks weekly and identify high-potential startups each month; support preliminary discussions on product-market fit, team quality, and thesis alignment.',
                    'Support diligence on potential $2M-$5M investments, including market sizing and competitor mapping to help draft investment memoranda.',
                  ]}
                />
                <ExperienceCard
                  company="Integro Healthcare Services"
                  role="Investment Summer Analyst"
                  location="Los Angeles, CA"
                  date="May 2025 - Oct 2025"
                  descs={[
                    'Built Excel-based 10-year budget models for a senior healthcare facility project and stress-tested assumptions against a target 15% IRR.',
                    'Analyzed profitability, market trends, and investment risk across 15+ states using 50+ comparable projects to support strategic project recommendations.',
                    'Evaluated 20+ offering memoranda and developed concise investment briefs for REIT, LBO, and roll-up opportunities.',
                  ]}
                />
                <ExperienceCard
                  company="Cedar Oak Capital"
                  role="Investment Research Summer Analyst, Healthcare Team"
                  location="Remote"
                  date="May 2025 - Aug 2025"
                  descs={[
                    'Prepared 9 investment decks on healthcare buyout targets, covering financial snapshots, landscape analysis, strategic rationale, and risk considerations.',
                    'Led weekly strategy meetings for a 5-person team and supported outreach to 300+ healthcare organizations to source opportunities.',
                    'Evaluated ownership structures and potential acquisition synergies while supporting strategic work for portfolio companies.',
                  ]}
                />
                <ExperienceCard
                  company="IDG Capital"
                  role="Investment Analyst Intern"
                  location="Remote"
                  date="Sep 2024 - Dec 2024"
                  descs={[
                    'Conducted healthcare market and competitive research, benchmarking against 10 peers to support a $7M investment memorandum.',
                    'Performed due diligence across 40+ companies and reviewed 100+ financial reports to identify trends and actionable insights.',
                    'Collaborated with investment professionals in weekly strategy sessions focused on return-oriented execution.',
                  ]}
                />
              </div>
              </div>
            </section>

            <section id="leadership" className="section-band">
              <div className="section-shell">
              <div className="section-head">
                <span className="section-label">Leadership</span>
                <h2 className="section-title">Campus involvement</h2>
              </div>
              <div className="lead-grid">
                <motion.div
                  className="crystal-panel lead-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  viewport={{ once: true }}
                >
                  <div className="lead-meta">Apr 2026 - Present</div>
                  <h3>NYU Business and Finance Group</h3>
                  <p className="lead-role" style={{ color: 'var(--text-dim)', fontStyle: 'italic', marginBottom: 12 }}>
                    Head of Outreach &amp; Operations
                  </p>
                  <p>
                    Lead weekly finance sessions and organize networking programs connecting 100+ students with
                    industry professionals.
                  </p>
                </motion.div>
                <motion.div
                  className="crystal-panel lead-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 }}
                >
                  <div className="lead-meta">Sep 2024 - Present</div>
                  <h3>NYU Special Situations Investing Group</h3>
                  <p className="lead-role" style={{ color: 'var(--text-dim)', fontStyle: 'italic', marginBottom: 12 }}>
                    Special Situations Team Member
                  </p>
                  <p>
                    Analyze distressed companies and restructuring cases; led a 5-person team in a special
                    situations case competition.
                  </p>
                </motion.div>
              </div>
              </div>
            </section>

            <section id="skills" className="section-band section-band-alt">
              <div className="section-shell">
              <div className="section-head">
                <span className="section-label">Skills</span>
                <h2 className="section-title">Technical stack</h2>
              </div>
              <div className="skills-container">
                <div className="crystal-panel skill-category">
                  <h4>Investment</h4>
                  <ul className="skill-list">
                    <li>Financial modeling</li>
                    <li>Investment analysis</li>
                    <li>Valuation (DCF, comparables, precedent)</li>
                    <li>Market research</li>
                    <li>Risk analysis</li>
                  </ul>
                </div>
                <div className="crystal-panel skill-category">
                  <h4>Tools</h4>
                  <ul className="skill-list">
                    <li>Excel, PowerPoint, Bloomberg Terminal</li>
                    <li>LSEG, Capital IQ, PitchBook, Morningstar Direct</li>
                    <li>Power BI, Tableau</li>
                  </ul>
                </div>
                <div className="crystal-panel skill-category">
                  <h4>Data</h4>
                  <ul className="skill-list">
                    <li>Python, SQL, JavaScript, Java, R</li>
                    <li>Matplotlib, machine learning</li>
                    <li>Predictive modeling</li>
                  </ul>
                </div>
                <div className="crystal-panel skill-category">
                  <h4>Communication</h4>
                  <ul className="skill-list">
                    <li>Investment memo writing</li>
                    <li>Presentation deck development</li>
                    <li>Cross-functional collaboration</li>
                  </ul>
                </div>
              </div>
              </div>
            </section>

            <section id="contact" className="section-contact" style={{ paddingBottom: 120 }}>
              <div className="contact-layout">
                <div className="contact-photo">
                  <img src={anh4} alt="Phong Tran" />
                </div>
                <div className="contact-inner">
                  <span className="section-label">Contact</span>
                  <h2>Let&apos;s connect</h2>
                  <p className="contact-lede">
                    Open to internships and conversations across credit, private markets, and investment
                    strategy.
                  </p>
                  <div className="contact-info">
                    <a href={`mailto:${EMAIL}`}>
                      <Mail size={18} color={iconColor} strokeWidth={1.75} />
                      {EMAIL}
                    </a>
                    <span className="contact-sep">·</span>
                    <a href={PHONE_HREF}>
                      <Phone size={18} color={iconColor} strokeWidth={1.75} />
                      {PHONE_DISPLAY}
                    </a>
                    <span className="contact-sep">·</span>
                    <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={18} color={iconColor} strokeWidth={1.75} />
                      linkedin.com/in/phong-tran
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <footer className="site-footer">
              © 2026 Phong Tran - investment portfolio
            </footer>
          </main>

          <ChatBot />
        </motion.div>
      )}
    </div>
  );
}

export default App;
