import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Advertisers from "./pages/Advertisers";
import Publishers from "./pages/Publishers";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import PublisherRegister from "./pages/PublisherRegister";
import AdvertiserRegister from "./pages/AdvertiserRegister";
import Terms from "./pages/Terms";
import RegistrationSuccess from "./pages/RegistrationSuccess";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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

function AnimateOnScroll({ children, variants = fadeUp, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={isInView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Advertisers", href: "/advertisers" },
  { label: "Publishers", href: "/publishers" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

const FAQS = [
  { q: "What is Linktrackify?", a: "Linktrackify is a performance affiliate network that connects publishers with merchant programmes from leading affiliate networks including Awin and Impact. We operate on a pure cost-per-action model — advertisers only pay when a confirmed, validated sale or action is delivered." },
  { q: "How do I join as a publisher?", a: "Submit your application through our publisher registration page. Our team reviews each application for traffic quality, promotional methods, and compliance standards before granting access to our programme directory." },
  { q: "How does the advertiser model work?", a: "Advertisers define their target cost-per-action parameters and integrate via our tracking layer. You only pay for validated conversions that meet your exact compliance and verification standards — no upfront fees, no wasted spend." },
  { q: "How are commissions calculated and paid?", a: "Each programme displays a clear commission rate before you apply. Once a sale is validated by the network, your commission is recorded and included in the next structured payout cycle. All rates are visible and agreed upon in advance." },
  { q: "What affiliate networks are you connected to?", a: "We currently integrate with Awin and Impact — two of the world's leading affiliate networks. This provides access to thousands of vetted merchant programmes across retail, technology, finance, health, and travel sectors." },
  { q: "How do you protect against fraud?", a: "Our platform employs continuous monitoring of all tracking data to detect and eliminate artificial clicks, duplicate actions, and non-compliant promotional methods. Every publisher is screened before gaining access, and all activity is monitored throughout the campaign lifecycle." },
];

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
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

  if (['/login', '/forgot-password', '/register', '/publisher/register', '/advertiser/register', '/terms', '/registration-success'].includes(location.pathname)) return null;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-white/90 backdrop-blur-sm"}`}>
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
            <Link to="https://app.linktrackify.com/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:-translate-y-0.5">Log in</Link>
            <Link to="https://app.linktrackify.com/register" className="text-sm font-semibold text-white bg-blue-600 px-5 py-2.5 rounded-lg transition-all duration-200 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200">
              Get Started
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
              <Link to="https://app.linktrackify.com/login" className="text-center text-sm font-medium text-gray-700 border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 transition-all">Log in</Link>
              <Link to="https://app.linktrackify.com/register" className="text-center text-sm font-semibold text-white bg-blue-600 py-2.5 rounded-lg hover:bg-blue-700 transition-all">Get Started</Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
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
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            Pure Performance · Zero Upfront Risk · Pay Only for Results
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            Performance-First Affiliate<br />
            <span className="text-blue-600">&amp; Partnership Management</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
            Scale your digital distribution with zero upfront risk. Linktrackify connects ambitious brands with a vetted network of performance publishers — you only invest capital when a confirmed sale or action is delivered.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link to="https://app.linktrackify.com/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-all shadow-md shadow-blue-100 text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200">
              Launch as Advertiser
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link to="https://app.linktrackify.com/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-gray-700 font-semibold px-7 py-3.5 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm">
              Apply as Publisher
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "Awin Partner", color: "bg-blue-50 text-blue-700 border-blue-100" },
              { label: "Impact Partner", color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
              { label: "CPA Model", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
              { label: "Real-Time Tracking", color: "bg-amber-50 text-amber-700 border-amber-100" },
              { label: "Fraud Protection", color: "bg-rose-50 text-rose-700 border-rose-100" },
            ].map((badge) => (
              <span key={badge.label} className={`text-xs font-semibold px-4 py-1.5 rounded-full border ${badge.color}`}>{badge.label}</span>
            ))}
          </motion.div>
        </div>

        {/* Dashboard Mockup */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}
          className="max-w-4xl mx-auto bg-gray-50 rounded-3xl border border-gray-200 p-6 shadow-xl shadow-gray-100">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
            <div className="flex gap-1.5">
              {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c) => <div key={c} className={`w-3 h-3 rounded-full ${c}`} />)}
            </div>
            <div className="flex-1 bg-white rounded-lg h-7 flex items-center justify-center border border-gray-100">
              <span className="text-xs text-gray-400">app.linktrackify.com/dashboard</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: "Total Clicks", value: "24,891", change: "+12.4%", color: "text-emerald-600" },
              { label: "Conversions", value: "1,247", change: "+8.2%", color: "text-emerald-600" },
              { label: "Earnings", value: "$3,842", change: "+15.7%", color: "text-emerald-600" },
              { label: "Active Programs", value: "18", change: "+3", color: "text-blue-600" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-3 border border-gray-100">
                <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                <div className={`text-xs font-semibold ${stat.color}`}>{stat.change}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {[
              { name: "NovaTech Electronics", commission: "8%", status: "Active", earnings: "$842.50" },
              { name: "LuxeStyle Fashion", commission: "12%", status: "Active", earnings: "$1,204.80" },
              { name: "GreenLeaf Wellness", commission: "15%", status: "Pending", earnings: "$0.00" },
            ].map((prog, i) => (
              <div key={prog.name} className={`flex items-center justify-between px-4 py-3 ${i < 2 ? "border-b border-gray-50" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-xs font-bold text-blue-600">{prog.name[0]}</div>
                  <div>
                    <div className="text-xs font-medium text-gray-800">{prog.name}</div>
                    <div className="text-xs text-gray-400">Commission: {prog.commission}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${prog.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{prog.status}</span>
                  <span className="text-xs font-bold text-gray-900">{prog.earnings}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Strategic Alignment",
      subtitle: "Onboarding",
      desc: "Brands define their target cost-per-action parameters, and qualified publishers align their traffic channels to match those specific parameters.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    },
    {
      number: "02",
      title: "Verified Traffic Deployment",
      subtitle: "Execution",
      desc: "Our tracking layer monitors every click and conversion source in real-time, matching traffic with optimised consumer touchpoints across all active campaigns.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    },
    {
      number: "03",
      title: "Validated Payouts",
      subtitle: "The Performance Loop",
      desc: "Advertisers only pay for actions that meet their exact compliance and verification standards. Publishers receive consistent, reliable payouts for verified results.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">A Risk-Free Ecosystem Built for Scale</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Simple, structured, and built around a pure performance model — so every party only wins when results are delivered.</p>
        </AnimateOnScroll>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[38%] right-[38%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 z-0" />
          {steps.map((step) => (
            <motion.div key={step.number} variants={cardVariant}
              className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-100">{step.icon}</div>
                <span className="text-4xl font-black text-gray-100">{step.number}</span>
              </div>
              <div className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-2">{step.subtitle}</div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── TRAFFIC CHANNELS ─────────────────────────────────────────────────────────
function Features() {
  const channels = [
    {
      title: "Content Creators & Review Sites",
      desc: "Deep-dive product reviews, contextual lifestyle blogs, and editorial recommendations that build consumer trust and drive intentional sales.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Targeted Promotional & Voucher Spaces",
      desc: "High-intent, deal-focused platforms that capture buyers at the exact point of purchase, accelerating conversion rates and minimising cart abandonment.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Paid Media & Performance PPC",
      desc: "Expertly managed search and display strategies optimised strictly around target margins to capture clear consumer demand safely and efficiently.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg>,
      color: "bg-violet-50 text-violet-600",
    },
    {
      title: "Social Commerce & Influencer Networks",
      desc: "Audience-aligned social amplification across modern networks, turning brand engagement into measurable, trackable acquisitions at scale.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      color: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <section id="features" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Traffic Channels</p>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Diversified Performance Channels</h2>
          <p className="text-gray-500 max-w-xl mx-auto">We work with a broad spectrum of publisher traffic sources — each vetted, monitored, and optimised to deliver compliant, high-quality results for your brand.</p>
        </AnimateOnScroll>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((c) => (
            <motion.div key={c.title} variants={cardVariant}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all bg-white hover:-translate-y-1">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${c.color}`}>{c.icon}</div>
              <h3 className="font-bold text-gray-900 mb-3 text-base leading-tight">{c.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── INDUSTRIES ───────────────────────────────────────────────────────────────
function EarningsFlow() {
  const industries = [
    {
      title: "Retail & E-Commerce",
      desc: "Accelerating product velocity through scalable digital partnerships and high-intent consumer traffic.",
      icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
    },
    {
      title: "Technology & Subscriptions",
      desc: "Driving recurring user acquisition and software trials on a pure outcome-based model.",
      icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    },
    {
      title: "Health, Beauty & Lifestyle",
      desc: "Aligning trend-conscious audiences with trusted wellness and direct-to-consumer brands at scale.",
      icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    },
    {
      title: "Consumer Services",
      desc: "Securing high-intent customer acquisitions and qualified actions across competitive service sectors.",
      icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    },
    {
      title: "Finance & Insurance",
      desc: "Performance-driven lead generation and customer acquisition for regulated financial service providers.",
      icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
      title: "Travel & Hospitality",
      desc: "Connecting travel-intent audiences with airline, hotel, and booking platform partners on a cost-per-booking model.",
      icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>,
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Industries We Serve</p>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Tailored Performance Strategies Across Major Sectors</h2>
          <p className="text-gray-500 max-w-xl mx-auto">We understand that different industries have distinct requirements. Our team structures each programme to align with the compliance, margin, and audience needs of your sector.</p>
        </AnimateOnScroll>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind) => (
            <motion.div key={ind.title} variants={cardVariant}
              className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all hover:-translate-y-0.5">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">{ind.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1.5 text-sm">{ind.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{ind.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── COMPLIANCE ───────────────────────────────────────────────────────────────
function PublishersSection() {
  const complianceFeatures = [
    {
      title: "In-Depth Screening Protocol",
      desc: "Every publisher undergoes a rigorous background review of their traffic methods, promotional histories, and compliance standards before joining.",
      icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    },
    {
      title: "Active Fraud Mitigation",
      desc: "Continuous monitoring of tracking data to eliminate artificial clicks, duplicate actions, and misleading promotional methods.",
      icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    },
    {
      title: "Strict Code & Copy Adherence",
      desc: "Ensuring all promotional voucher codes, deals, and marketing messages remain updated, authorised, and accurate at all times.",
      icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Compliance & Brand Safety</p>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Built-In Brand Safety & Compliance Control</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Growth is meaningless without integrity. Linktrackify protects your brand equity at every step of the campaign life cycle — from publisher onboarding to payout validation.</p>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimateOnScroll variants={slideLeft}>
            <div className="space-y-6">
              {complianceFeatures.map((f) => (
                <div key={f.title} className="flex gap-5 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-200">{f.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1.5">{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variants={slideRight}>
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl shadow-blue-100">
              <div className="mb-6">
                <div className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">Our Commitment</div>
                <h3 className="text-2xl font-bold leading-tight">Every campaign is monitored. Every publisher is verified. Every payout is validated.</h3>
              </div>
              <div className="space-y-4">
                {[
                  "Real-time campaign monitoring dashboard",
                  "Publisher traffic source verification",
                  "Automated fraud detection systems",
                  "Manual compliance review for flagged activity",
                  "Network-level transaction validation",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-sm text-blue-100">{item}</span>
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

// ─── DUAL VALUE PROPOSITION ───────────────────────────────────────────────────
function AdvertisersSection() {
  return (
    <section id="advertisers" className="py-24 px-6 lg:px-8 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Built for Both Sides</p>
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">A Platform Designed Around Your Goals</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Whether you're scaling a brand or monetising an audience, Linktrackify provides the infrastructure, transparency, and support you need to grow.</p>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-2 gap-8">
          <AnimateOnScroll variants={slideLeft}>
            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 h-full flex flex-col">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">For Advertisers</p>
              <h3 className="text-2xl font-bold text-white mb-4">Uncapped Scale. Zero Waste.</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Connect your brand with a growing network of vetted publishers. You only invest capital when a confirmed, validated sale or action is delivered — no wasted ad spend, complete visibility.</p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Eliminate wasted ad spend with a pure pay-for-results framework",
                  "Maintain complete control over your target customer acquisition costs",
                  "Seamlessly integrate performance marketing with your existing channels",
                  "Access real-time dashboards showing every click, conversion, and publisher",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="w-5 h-5 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <Link to="/advertisers" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm hover:-translate-y-0.5 shadow-md shadow-blue-900 w-fit">
                Partner as an Advertiser
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variants={slideRight}>
            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 h-full flex flex-col">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-900">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">For Publishers</p>
              <h3 className="text-2xl font-bold text-white mb-4">Monetise Content with Stability.</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Whether you run a blog, social channel, newsletter, or comparison site — Linktrackify gives you direct access to high-converting performance offers with full transparency on every commission earned.</p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Direct access to high-converting performance offers across major sectors",
                  "Transparent, reliable, and expedited payout cycles for approved sales",
                  "Advanced deep-linking and reporting tools to maximise monetisation",
                  "Dedicated support team to help optimise your promotional strategies",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="w-5 h-5 bg-emerald-600/20 text-emerald-400 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <Link to="https://app.linktrackify.com/register" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm hover:-translate-y-0.5 shadow-md shadow-emerald-900 w-fit">
                Apply as a Publisher
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll className="text-center mb-14">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Common Questions</h2>
          <p className="text-gray-500">Haven't found what you're looking for? <Link to="/contact-us" className="text-blue-600 hover:underline">Contact us.</Link></p>
        </AnimateOnScroll>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div key={i} variants={cardVariant} className="border border-gray-100 rounded-2xl overflow-hidden">
              <button className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors" onClick={() => setOpen(open === i ? null : i)}>
                <span className="text-sm font-semibold text-gray-900 pr-4">{faq.q}</span>
                <motion.svg animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                  className="flex-shrink-0" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </motion.svg>
              </button>
              {open === i && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="px-5 pb-5">
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

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-white">
      <AnimateOnScroll>
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-16 shadow-2xl shadow-blue-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
          <div className="relative">
            <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-4">Get Started Today</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5">Ready to Align Performance with Growth?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">Contact our partnership management team today to review your programme goals, or submit your publisher application to get started immediately.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact-us" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-blue-700 font-bold px-8 py-4 rounded-xl transition-all shadow-md text-sm hover:-translate-y-0.5 hover:shadow-lg">
                Get in Touch
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link to="https://app.linktrackify.com/register" className="w-full sm:w-auto inline-flex items-center justify-center text-blue-100 hover:text-white font-semibold px-8 py-4 rounded-xl border border-blue-400 hover:border-blue-200 transition-all text-sm">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
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
            <p className="text-sm leading-relaxed text-gray-500 mb-4">Performance-first affiliate & partnership management. Connecting ambitious brands with vetted publishers.</p>
            <p className="text-xs text-gray-600">Covent Garden, London, UK</p>
            <p className="text-xs text-gray-600 mt-1">linktrackify@linktrackify.com</p>
          </div>
          {[
            { title: "Platform", links: [{ label: "How It Works", href: "/#how-it-works" }, { label: "Traffic Channels", href: "/#features" }, { label: "Publishers", href: "/publishers" }, { label: "Advertisers", href: "/advertisers" }] },
            { title: "Company", links: [{ label: "About Us", href: "/about-us" }, { label: "Contact Us", href: "/contact-us" }, { label: "Publisher Login", href: "https://app.linktrackify.com/login" }, { label: "Apply Now", href: "https://app.linktrackify.com/register" }] },
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
          <p className="text-xs text-gray-600">© 2026 Linktrackify Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/terms" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Terms</Link>
            <Link to="/privacy" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
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

// ─── APP ──────────────────────────────────────────────────────────────────────
const NO_LAYOUT_PAGES = ['/login', '/forgot-password', '/register', '/publisher/register', '/advertiser/register', '/terms', '/registration-success'];

export default function App() {
  const location = useLocation();
  const hideLayout = NO_LAYOUT_PAGES.includes(location.pathname);
  return (
    <div className="font-sans antialiased">
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/advertisers" element={<Advertisers />} />
        <Route path="/publishers" element={<Publishers />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/publisher/register" element={<PublisherRegister />} />
        <Route path="/advertiser/register" element={<AdvertiserRegister />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  );
}