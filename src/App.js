import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef } from "react";
import Advertisers from "./pages/Advertisers";
import Publishers from "./pages/Publishers";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Scroll animation wrapper
function AnimateOnScroll({ children, variants = fadeUp, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Counter animation
function AnimatedCounter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const increment = numericValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  const isNumeric = /^\d/.test(value);
  return (
    <span ref={ref}>
      {isNumeric ? `${count}${value.replace(/[0-9]/g, "")}` : value}
    </span>
  );
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Advertisers", href: "/advertisers" },
  { label: "Publishers", href: "/publishers" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

const STATS = [
  { value: "500+", label: "Merchant Programs" },
  { value: "98%", label: "Link Uptime" },
  { value: "Real-time", label: "Commission Tracking" },
  { value: "Awin & Impact", label: "Network Integrations" },
];

const STEPS = [
  {
    number: "01",
    title: "Create Your Account",
    desc: "Register in minutes. Complete your profile and get approved to access our curated merchant network.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Browse & Join Programs",
    desc: "Explore 500+ approved merchant programs across fashion, tech, finance, and lifestyle. Apply with one click.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Generate Tracking Links",
    desc: "Instantly create branded, trackable affiliate links for any approved program. Fully monitored from day one.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Track & Earn",
    desc: "Monitor clicks, conversions, and commissions in real time. Get paid on a transparent, reliable schedule.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const FEATURES = [
  {
    title: "Smart Link Generation",
    desc: "Generate branded, redirect-ready affiliate links in seconds. Every link is tracked, timestamped, and tied to your account.",
    icon: (<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>),
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Real-Time Analytics",
    desc: "See clicks, conversions, and revenue as they happen. No delays, no guesswork — just clean, accurate performance data.",
    icon: (<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>),
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Awin & Impact Integration",
    desc: "We're connected to industry-leading affiliate networks so you gain access to premium, pre-approved merchant programs.",
    icon: (<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>),
    color: "bg-violet-50 text-violet-600",
  },
  {
    title: "Commission Transparency",
    desc: "You always see exactly what rate you earn per program. No hidden deductions, no surprise adjustments at payout.",
    icon: (<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>),
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Merchant Program Directory",
    desc: "Browse a curated, categorized list of merchant programs with commission rates, cookie windows, and payout schedules.",
    icon: (<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>),
    color: "bg-rose-50 text-rose-600",
  },
  {
    title: "Reliable Payouts",
    desc: "Commissions are consolidated and paid on a structured schedule. Your earnings are reconciled against network data automatically.",
    icon: (<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
    color: "bg-cyan-50 text-cyan-600",
  },
];

const BENEFITS = [
  { label: "No setup fees" },
  { label: "Pre-approved merchant access" },
  { label: "Transparent commission rates" },
  { label: "Real-time reporting dashboard" },
  { label: "Dedicated publisher support" },
  { label: "Structured payout schedule" },
];

const NETWORKS = ["Awin", "Impact", "Rakuten", "CJ Affiliate", "ShareASale"];

const FAQS = [
  { q: "What is Linktrackify?", a: "Linktrackify is an affiliate marketing platform that connects publishers with merchant programs from top affiliate networks. You generate tracking links, promote products, and earn commissions on validated sales." },
  { q: "How do I join merchant programs?", a: "After creating your account, browse our merchant directory and submit join requests. Since we hold agency accounts with Awin and Impact, approvals are faster than applying directly." },
  { q: "How are commissions calculated?", a: "Each merchant program shows a clear commission rate. When a sale is validated by the network, your commission is recorded in your dashboard and included in the next payout cycle." },
  { q: "When do I get paid?", a: "Payouts are processed on a structured schedule once your balance reaches the minimum threshold. Payment methods and schedules are shown in your account settings." },
  { q: "What affiliate networks are you connected to?", a: "We currently integrate with Awin and Impact, with additional network integrations in progress. This gives you access to thousands of globally recognized merchant programs." },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-white/90 backdrop-blur-sm"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-blue-700 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-blue-200">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">Linktrackify</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => {
              const isActive = location.pathname === l.href;
              return (
                <Link key={l.label} to={l.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}`}>
                  <span className="relative z-10 transition-transform duration-200 inline-block group-hover:-translate-y-0.5">{l.label}</span>
                  <span className="absolute inset-0 rounded-lg bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-blue-600 transition-all duration-200 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`} />
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:-translate-y-0.5">Log in</Link>
            <Link to="/register" className="relative text-sm font-semibold text-white bg-blue-600 px-5 py-2.5 rounded-lg transition-all duration-200 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200 active:translate-y-0 overflow-hidden group">
              <span className="relative z-10">Get Started</span>
            </Link>
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-white border-t border-gray-100 py-4 px-2 space-y-1">
            {NAV_LINKS.map((l) => (
              <Link key={l.label} to={l.href} className={`block px-4 py-2.5 text-sm rounded-lg font-medium transition-all duration-200 ${location.pathname === l.href ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-50"}`}>{l.label}</Link>
            ))}
            <div className="pt-3 flex flex-col gap-2 px-2">
              <Link to="/login" className="text-center text-sm font-medium text-gray-700 border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 transition-all">Log in</Link>
              <Link to="/register" className="text-center text-sm font-semibold text-white bg-blue-600 py-2.5 rounded-lg hover:bg-blue-700 transition-all">Get Started</Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.08),transparent)]" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-blue-100">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
            Now live — Awin & Impact integrations available
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            Earn commissions from<br />
            <span className="text-blue-600">top global brands</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
            Linktrackify connects publishers with pre-approved merchant programs from leading affiliate networks. Generate tracking links, monitor performance, and get paid — all in one platform.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/register" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-all shadow-md shadow-blue-100 text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200">
              Start for free
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-gray-700 font-semibold px-7 py-3.5 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm">
              See how it works
            </a>
          </motion.div>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {STATS.map((s) => (
            <motion.div key={s.label} variants={cardVariant}
              className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                <AnimatedCounter value={s.value} />
              </div>
              <div className="text-xs text-gray-500 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-14 text-center">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">Connected affiliate networks</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {NETWORKS.map((n, i) => (
              <motion.span key={n} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + i * 0.1 }}
                className="text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors">{n}</motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">From signup to earnings in 4 steps</h2>
          <p className="text-gray-500 max-w-xl mx-auto">A straightforward process designed to get you promoting and earning as fast as possible.</p>
        </AnimateOnScroll>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <motion.div key={step.number} variants={cardVariant}
              className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 z-10">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">{step.icon}</div>
                <span className="text-3xl font-black text-gray-100">{step.number}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Platform Features</p>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Everything you need to succeed</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Built for publishers who want a clean, reliable, and transparent affiliate experience.</p>
        </AnimateOnScroll>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <motion.div key={f.title} variants={cardVariant}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all bg-white">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>{f.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function EarningsFlow() {
  const nodes = [
    { label: "Merchant", sub: "Sets commission rate", color: "bg-slate-800 text-white", sub_color: "text-slate-300" },
    { label: "Linktrackify", sub: "Platform margin", color: "bg-blue-600 text-white", sub_color: "text-blue-200" },
    { label: "You (Publisher)", sub: "Your commission", color: "bg-emerald-500 text-white", sub_color: "text-emerald-100" },
  ];

  return (
    <section className="py-24 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Earnings Model</p>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Simple, transparent revenue sharing</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Merchants pay a commission on every validated sale. Linktrackify takes a small margin — the rest goes directly to you.</p>
        </AnimateOnScroll>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {nodes.map((node, i) => (
              <div key={node.label} className="flex flex-col md:flex-row items-center w-full md:w-auto">
                <AnimateOnScroll variants={i === 0 ? slideLeft : i === 2 ? slideRight : fadeUp}>
                  <div className={`${node.color} rounded-2xl px-8 py-6 text-center min-w-[160px] shadow-md`}>
                    <div className="font-bold text-base mb-1">{node.label}</div>
                    <div className={`text-xs ${node.sub_color}`}>{node.sub}</div>
                  </div>
                </AnimateOnScroll>
                {i < nodes.length - 1 && (
                  <div className="flex md:flex-row flex-col items-center my-2 md:my-0 md:mx-2">
                    <div className="w-px h-6 md:w-8 md:h-px bg-gray-300"></div>
                    <svg className="rotate-90 md:rotate-0" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div className="w-px h-6 md:w-8 md:h-px bg-gray-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <AnimateOnScroll>
            <div className="mt-10 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <p className="text-sm font-semibold text-gray-700 mb-4">Example commission breakdown</p>
              <div className="space-y-3">
                {[
                  { label: "Merchant commission rate", value: "20%", color: "text-slate-700" },
                  { label: "Linktrackify platform margin", value: "4%", color: "text-blue-600" },
                  { label: "Your earnings per sale", value: "16%", color: "text-emerald-600" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-500">{row.label}</span>
                    <span className={`text-sm font-bold ${row.color}`}>{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">* Rates vary by merchant program. Always visible before you join.</p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

function PublishersSection() {
  return (
    <section id="publishers" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimateOnScroll variants={slideLeft}>
            <div>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">For Publishers</p>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-5">Monetize your audience with trusted brands</h2>
              <p className="text-gray-500 leading-relaxed mb-8">Whether you run a blog, social media channel, newsletter, or website — Linktrackify gives you direct access to high-converting merchant programs without the hassle of individual network applications.</p>
              <ul className="space-y-3 mb-8">
                {BENEFITS.map((b) => (
                  <li key={b.label} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                    {b.label}
                  </li>
                ))}
              </ul>
              <Link to="/register" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-sm text-sm hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-200">
                Join as a Publisher
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variants={slideRight}>
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-700">Your Dashboard</span>
                  <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-full">Live</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[{ label: "Clicks", value: "1,248" }, { label: "Conversions", value: "84" }, { label: "Earnings", value: "$312.40" }].map((m) => (
                    <div key={m.label} className="bg-gray-50 rounded-xl p-3 text-center">
                      <div className="text-base font-bold text-gray-900">{m.value}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <p className="text-sm font-semibold text-gray-700 mb-3">Active Programs</p>
                {[
                  { name: "Fashion Brand Co.", rate: "14%", status: "Active" },
                  { name: "Tech Accessories Ltd.", rate: "11%", status: "Active" },
                  { name: "Home Decor Store", rate: "9%", status: "Pending" },
                ].map((p) => (
                  <div key={p.name} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{p.name}</div>
                      <div className="text-xs text-gray-400">{p.rate} commission</div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{p.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

function AdvertisersSection() {
  return (
    <section id="advertisers" className="py-24 px-6 lg:px-8 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimateOnScroll variants={slideLeft}>
            <div>
              <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">For Advertisers</p>
              <h2 className="text-4xl font-bold text-white tracking-tight mb-5">Scale your reach through performance-based partnerships</h2>
              <p className="text-slate-400 leading-relaxed mb-8">Connect your brand with a growing network of motivated publishers. Pay only for validated conversions — no wasted spend, full visibility.</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { title: "Performance-only model", desc: "Pay commissions only when a sale is confirmed." },
                  { title: "Quality publisher network", desc: "All publishers are screened before gaining access." },
                  { title: "Full tracking visibility", desc: "See clicks, conversions, and ROI in real time." },
                  { title: "Managed via top networks", desc: "Operated through Awin and Impact infrastructure." },
                ].map((item) => (
                  <div key={item.title} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                    <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                    <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
              <Link to="/contact-us" className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-slate-900 font-semibold px-6 py-3 rounded-xl transition-all text-sm hover:-translate-y-0.5">
                Get in touch
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </AnimateOnScroll>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="space-y-4">
            {[
              { icon: "🎯", title: "Cost-per-sale model", desc: "Only pay when a publisher drives a confirmed, validated sale to your store." },
              { icon: "📊", title: "Campaign performance dashboard", desc: "Full visibility into which publishers, links, and channels are driving results." },
              { icon: "🔗", title: "Network infrastructure", desc: "Your campaigns run on Awin and Impact — enterprise-grade reliability you can trust." },
            ].map((card) => (
              <motion.div key={card.title} variants={cardVariant}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex gap-4">
                <span className="text-2xl mt-0.5">{card.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-white mb-1">{card.title}</div>
                  <div className="text-sm text-slate-400 leading-relaxed">{card.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll className="text-center mb-14">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Common questions</h2>
        </AnimateOnScroll>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div key={i} variants={cardVariant} className="border border-gray-100 rounded-2xl overflow-hidden">
              <button className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors" onClick={() => setOpen(open === i ? null : i)}>
                <span className="text-sm font-semibold text-gray-900">{faq.q}</span>
                <motion.svg animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                  className="flex-shrink-0 ml-4" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </motion.svg>
              </button>
              {open === i && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="px-5 pb-5">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-blue-600">
      <AnimateOnScroll>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5">Ready to start earning?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">Join Linktrackify today and get access to hundreds of merchant programs, real-time tracking, and reliable commission payouts.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-blue-700 font-bold px-8 py-4 rounded-xl transition-all shadow-md text-sm hover:-translate-y-0.5 hover:shadow-lg">
              Create your free account
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link to="/contact-us" className="w-full sm:w-auto inline-flex items-center justify-center text-blue-100 hover:text-white font-semibold px-8 py-4 rounded-xl border border-blue-400 hover:border-blue-200 transition-all text-sm">
              Talk to us first
            </Link>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <span className="font-bold text-white text-base">Linktrackify</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">The affiliate marketing platform built for publishers who want transparency and results.</p>
          </div>
          {[
            { title: "Platform", links: [{ label: "How It Works", href: "/#how-it-works" }, { label: "Features", href: "/#features" }, { label: "Merchant Programs", href: "/publishers" }, { label: "Publisher Dashboard", href: "/login" }] },
            { title: "Company", links: [{ label: "About Us", href: "/about-us" }, { label: "Publishers", href: "/publishers" }, { label: "Advertisers", href: "/advertisers" }, { label: "Contact", href: "/contact-us" }] },
            { title: "Legal", links: [{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms & Conditions", href: "/terms" }, { label: "Cookie Policy", href: "/cookies" }, { label: "Imprint", href: "/imprint" }] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-white text-sm font-semibold mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">© 2026 Linktrackify. All rights reserved.</p>
          <p className="text-xs text-gray-600">support@linktrackify.com</p>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <EarningsFlow />
      <PublishersSection />
      <AdvertisersSection />
      <FAQ />
      <CTA />
    </>
  );
}

export default function App() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/advertisers" element={<Advertisers />} />
        <Route path="/publishers" element={<Publishers />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer />
    </div>
  );
}