import { useState, useEffect } from "react";
import { Shield, Zap, BarChart2, Link2, CheckCircle, DollarSign, Star, Target, Lock, Users, Globe, TrendingUp, Search, Code, Package } from "lucide-react";
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

// ─── ANNOUNCEMENT BAR ─────────────────────────────────────────────────────────
function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div style={{ background: "#f0fdf4", borderBottom: "1px solid #bbf7d0" }}
      className="relative z-[60] w-full py-2.5 px-4 flex items-center justify-center gap-3">
      <div className="flex items-center gap-2 text-center">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
        <p className="text-xs font-medium text-gray-700">
          Drive measurable results with the Linktrackify performance network.{" "}
          <a href="https://app.linktrackify.com/register"
            className="font-bold text-blue-600 hover:underline underline-offset-2">
            Register for free →
          </a>
        </p>
      </div>
      <button onClick={() => setVisible(false)}
        className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// ─── APP SHOWCASE ─────────────────────────────────────────────────────────────
const APP_SCREENS = [
  {
    id: 0,
    title: "Publisher Dashboard",
    url: "app.linktrackify.com/dashboard",
    content: (
      <div className="p-4">
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { label: "Total Clicks", value: "24,891", change: "+12.4%", color: "text-emerald-600" },
            { label: "Conversions", value: "1,247", change: "+8.2%", color: "text-emerald-600" },
            { label: "Earnings", value: "$3,842", change: "+15.7%", color: "text-emerald-600" },
            { label: "Active Programs", value: "18", change: "+3", color: "text-blue-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-2.5 border border-gray-100 shadow-sm">
              <div className="text-[10px] text-gray-400 mb-0.5">{s.label}</div>
              <div className="text-base font-bold text-gray-900">{s.value}</div>
              <div className={`text-[10px] font-semibold ${s.color}`}>{s.change}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="px-3 py-2 border-b border-gray-50 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-700">Active Programs</span>
            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">Live</span>
          </div>
          {[
            { name: "NovaTech Electronics", commission: "8%", status: "Active", earnings: "$842.50" },
            { name: "LuxeStyle Fashion", commission: "12%", status: "Active", earnings: "$1,204.80" },
            { name: "GreenLeaf Wellness", commission: "15%", status: "Pending", earnings: "$0.00" },
          ].map((p, i) => (
            <div key={p.name} className={`flex items-center justify-between px-3 py-2 ${i < 2 ? "border-b border-gray-50" : ""}`}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-blue-600">{p.name[0]}</div>
                <div>
                  <div className="text-[11px] font-medium text-gray-800">{p.name}</div>
                  <div className="text-[10px] text-gray-400">Commission: {p.commission}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${p.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{p.status}</span>
                <span className="text-[11px] font-bold text-gray-900">{p.earnings}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 1,
    title: "Programs Directory",
    url: "app.linktrackify.com/programs",
    content: (
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 flex items-center gap-2">
            <Search size={12} className="text-gray-400" />
            <span className="text-[11px] text-gray-400">Search programs...</span>
          </div>
          <div className="bg-blue-600 text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg">Filter</div>
        </div>
        <div className="space-y-2">
          {[
            { name: "Fashion Brand Co.", cat: "Retail", comm: "14%", cookie: "30 days", status: "Open" },
            { name: "Tech Accessories Ltd", cat: "Technology", comm: "11%", cookie: "45 days", status: "Open" },
            { name: "Health & Wellness Co.", cat: "Health", comm: "18%", cookie: "60 days", status: "Open" },
            { name: "Travel Essentials", cat: "Travel", comm: "9%", cookie: "30 days", status: "Limited" },
          ].map((p) => (
            <div key={p.name} className="bg-white rounded-xl border border-gray-100 px-3 py-2.5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center text-[11px] font-bold text-blue-700">{p.name[0]}</div>
                <div>
                  <div className="text-[11px] font-semibold text-gray-800">{p.name}</div>
                  <div className="text-[10px] text-gray-400">{p.cat} · Cookie: {p.cookie}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-blue-600">{p.comm}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${p.status === "Open" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Tracking Links",
    url: "app.linktrackify.com/links",
    content: (
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-700">My Tracking Links</span>
          <div className="bg-blue-600 text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
            <Link2 size={10} />
            Generate Link
          </div>
        </div>
        <div className="space-y-2">
          {[
            { program: "NovaTech Electronics", clicks: "1,204", conv: "84", link: "lnktrk.io/nt-x8k2" },
            { program: "LuxeStyle Fashion", clicks: "892", conv: "61", link: "lnktrk.io/ls-m4p1" },
            { program: "GreenLeaf Wellness", clicks: "445", conv: "29", link: "lnktrk.io/gl-r7q3" },
          ].map((l) => (
            <div key={l.program} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-gray-800">{l.program}</span>
                <span className="text-[10px] text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">{l.link}</span>
              </div>
              <div className="flex gap-3">
                <div className="text-center">
                  <div className="text-xs font-bold text-gray-900">{l.clicks}</div>
                  <div className="text-[10px] text-gray-400">Clicks</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-emerald-600">{l.conv}</div>
                  <div className="text-[10px] text-gray-400">Conversions</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Reports & Analytics",
    url: "app.linktrackify.com/reports",
    content: (
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-700">Performance Overview</span>
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Last 30 days</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { label: "Revenue Generated", value: "$12,480", trend: "↑ 18.2%" },
            { label: "Avg. EPC", value: "$0.84", trend: "↑ 6.4%" },
            { label: "Conversion Rate", value: "4.2%", trend: "↑ 1.1%" },
            { label: "Total Commissions", value: "$3,842", trend: "↑ 15.7%" },
          ].map((m) => (
            <div key={m.label} className="bg-white rounded-xl border border-gray-100 p-2.5 shadow-sm">
              <div className="text-[10px] text-gray-400 mb-0.5">{m.label}</div>
              <div className="text-sm font-bold text-gray-900">{m.value}</div>
              <div className="text-[10px] text-emerald-600 font-semibold">{m.trend}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
          <div className="text-[10px] font-semibold text-gray-600 mb-2">Weekly Earnings</div>
          <div className="flex items-end gap-1 h-12">
            {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-100 rounded-sm hover:bg-blue-400 transition-colors" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i} className="text-[9px] text-gray-400 flex-1 text-center">{d}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Payments",
    url: "app.linktrackify.com/payments",
    content: (
      <div className="p-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 mb-3 text-white">
          <div className="text-[10px] font-semibold text-blue-200 mb-1">Available Balance</div>
          <div className="text-2xl font-bold mb-0.5">$3,842.50</div>
          <div className="text-[10px] text-blue-200">Next payout: 30th Jan 2026</div>
        </div>
        <div className="space-y-2">
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Recent Transactions</div>
          {[
            { program: "NovaTech Electronics", amount: "+$842.50", date: "Jan 15", status: "Validated" },
            { program: "LuxeStyle Fashion", amount: "+$1,204.80", date: "Jan 12", status: "Validated" },
            { program: "GreenLeaf Wellness", amount: "+$380.00", date: "Jan 10", status: "Pending" },
          ].map((t) => (
            <div key={t.program} className="bg-white rounded-xl border border-gray-100 px-3 py-2 flex items-center justify-between shadow-sm">
              <div>
                <div className="text-[11px] font-semibold text-gray-800">{t.program}</div>
                <div className="text-[10px] text-gray-400">{t.date}</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-bold text-emerald-600">{t.amount}</div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${t.status === "Validated" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

function AppShowcase() {
  const [active, setActive] = useState(2);

  const total = APP_SCREENS.length;

  const getRelativeIndex = (index) => {
    let diff = index - active;
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;
    return diff;
  };

  const getStyle = (index) => {
    const diff = getRelativeIndex(index);
    if (diff === 0) return { zIndex: 50, x: "0%", scale: 1, opacity: 1, blur: 0 };
    if (diff === -1) return { zIndex: 30, x: "-62%", scale: 0.82, opacity: 0.85, blur: 0 };
    if (diff === 1) return { zIndex: 30, x: "62%", scale: 0.82, opacity: 0.85, blur: 0 };
    if (diff === -2) return { zIndex: 10, x: "-112%", scale: 0.65, opacity: 0.5, blur: 2 };
    if (diff === 2) return { zIndex: 10, x: "112%", scale: 0.65, opacity: 0.5, blur: 2 };
    return { zIndex: 0, x: diff < 0 ? "-150%" : "150%", scale: 0.5, opacity: 0, blur: 4 };
  };

  return (
    <div className="relative w-full" style={{ height: "420px" }}>
      <div className="relative w-full h-full flex items-center justify-center">
        {APP_SCREENS.map((screen, i) => {
          const style = getStyle(i);
          const isActive = i === active;
          return (
            <motion.div
              key={screen.id}
              animate={{
                x: style.x, scale: style.scale, opacity: style.opacity,
                filter: `blur(${style.blur}px)`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ zIndex: style.zIndex, position: "absolute", width: "520px" }}
              onClick={() => {
                if (!isActive) {
                  const diff = getRelativeIndex(i);
                  if (diff > 0) setActive((active + 1) % total);
                  else setActive((active - 1 + total) % total);
                }
              }}
              className={`${!isActive ? "cursor-pointer" : ""}`}
              whileHover={!isActive ? { scale: style.scale * 1.04 } : {}}
            >
              <div className={`bg-gray-50 rounded-2xl border overflow-hidden shadow-xl transition-all duration-300 ${isActive ? "border-gray-200 shadow-2xl shadow-gray-200" : "border-gray-100"}`}>
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-white">
                  <div className="flex gap-1.5">
                    {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c) => (
                      <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                    ))}
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-md h-6 flex items-center justify-center">
                    <span className="text-[10px] text-gray-400">{screen.url}</span>
                  </div>
                </div>
                {/* Screen content */}
                <div style={{ height: "340px", overflowY: "hidden" }}>
                  {screen.content}
                </div>
              </div>
              {/* Tab label */}
              {isActive && (
                <div className="flex justify-center mt-3">
                  <span className="text-xs font-semibold text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
                    {screen.title}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
        {APP_SCREENS.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`transition-all duration-300 rounded-full ${active === i ? "w-6 h-2 bg-blue-600" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
}

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
      className="fixed top-[38px] left-0 right-0 z-50 pt-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className={`flex items-center justify-between h-16 px-6 rounded-full transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white/90 backdrop-blur-sm shadow-md"}`}>
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
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-white rounded-2xl mt-2 shadow-lg py-4 px-2 space-y-1">
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
    <section className="pt-40 pb-20 px-6 lg:px-8 relative">
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
            className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6">
            <span className="shimmer-text">Performance-First Affiliate</span><br />
            <span style={{
              background: "linear-gradient(90deg, #111827 0%, #111827 30%, #6b7280 50%, #111827 70%, #111827 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 8s linear infinite",
            }}>&</span><br />
            <span style={{
              background: "linear-gradient(90deg, #059669 0%, #10b981 20%, #6ee7b7 40%, #a7f3d0 50%, #6ee7b7 60%, #10b981 80%, #059669 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 8s linear infinite",
            }}>Partnership Management</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
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

          

          {/* Network marquee ticker */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5 text-center">Why Performance Marketers Choose Linktrackify</p>
            <div className="overflow-hidden w-full relative border-y border-gray-200 py-5 bg-gray-50">
              
              <div className="marquee-track">
                {[
                "Pure CPA Model", "Zero Upfront Risk", "Real-Time Tracking",
                "Verified Publishers Only", "Fraud Protection", "Transparent Payouts",
                "Brand Safety Guaranteed", "Performance First", "Compliance First",
                "Pure CPA Model", "Zero Upfront Risk", "Real-Time Tracking",
                "Verified Publishers Only", "Fraud Protection", "Transparent Payouts",
                "Brand Safety Guaranteed", "Performance First", "Compliance First",
              ].map((text, i) => (
                <div key={i} className="flex items-center shrink-0">
                  <span className="text-xs font-bold text-gray-700 whitespace-nowrap tracking-widest uppercase px-8">{text}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                </div>
              ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive App Showcase */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}
          className="relative w-full mt-8">
          <AppShowcase />
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
      icon: <Users size={22} />,
    },
    {
      number: "02",
      title: "Verified Traffic Deployment",
      subtitle: "Execution",
      desc: "Our tracking layer monitors every click and conversion source in real-time, matching traffic with optimised consumer touchpoints across all active campaigns.",
      icon: <BarChart2 size={22} />,
    },
    {
      number: "03",
      title: "Validated Payouts",
      subtitle: "The Performance Loop",
      desc: "Advertisers only pay for actions that meet their exact compliance and verification standards. Publishers receive consistent, reliable payouts for verified results.",
      icon: <DollarSign size={22} />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="inline-block text-blue-600 text-xs font-bold uppercase tracking-widest mb-4 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">How It Works</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">A Risk-Free Ecosystem Built for Scale</h2>
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
      icon: <Star size={22} />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Targeted Promotional & Voucher Spaces",
      desc: "High-intent, deal-focused platforms that capture buyers at the exact point of purchase, accelerating conversion rates and minimising cart abandonment.",
      icon: <Target size={22} />,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Paid Media & Performance PPC",
      desc: "Expertly managed search and display strategies optimised strictly around target margins to capture clear consumer demand safely and efficiently.",
      icon: <Search size={22} />,
      color: "bg-violet-50 text-violet-600",
    },
    {
      title: "Social Commerce & Influencer Networks",
      desc: "Audience-aligned social amplification across modern networks, turning brand engagement into measurable, trackable acquisitions at scale.",
      icon: <Globe size={22} />,
      color: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <section id="features" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="inline-block text-blue-600 text-xs font-bold uppercase tracking-widest mb-4 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">Traffic Channels</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">Diversified Performance Channels</h2>
          <p className="text-gray-500 max-w-xl mx-auto">We work with a broad spectrum of publisher traffic sources — each vetted, monitored, and optimised to deliver compliant, high-quality results for your brand.</p>
        </AnimateOnScroll>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((c) => (
            <motion.div key={c.title} variants={cardVariant}
              className="group p-7 rounded-[28px] border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all bg-white hover:-translate-y-1">
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
      icon: <Package size={20} />,
    },
    {
      title: "Technology & Subscriptions",
      desc: "Driving recurring user acquisition and software trials on a pure outcome-based model.",
      icon: <Code size={20} />,
    },
    {
      title: "Health, Beauty & Lifestyle",
      desc: "Aligning trend-conscious audiences with trusted wellness and direct-to-consumer brands at scale.",
      icon: <Star size={20} />,
    },
    {
      title: "Consumer Services",
      desc: "Securing high-intent customer acquisitions and qualified actions across competitive service sectors.",
      icon: <Users size={20} />,
    },
    {
      title: "Finance & Insurance",
      desc: "Performance-driven lead generation and customer acquisition for regulated financial service providers.",
      icon: <DollarSign size={20} />,
    },
    {
      title: "Travel & Hospitality",
      desc: "Connecting travel-intent audiences with airline, hotel, and booking platform partners on a cost-per-booking model.",
      icon: <Globe size={20} />,
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="inline-block text-blue-600 text-xs font-bold uppercase tracking-widest mb-4 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">Industries We Serve</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">Tailored Performance Strategies Across Major Sectors</h2>
          <p className="text-gray-500 max-w-xl mx-auto">We understand that different industries have distinct requirements. Our team structures each programme to align with the compliance, margin, and audience needs of your sector.</p>
        </AnimateOnScroll>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind) => (
            <motion.div key={ind.title} variants={cardVariant}
              className="flex gap-4 p-6 bg-white rounded-[24px] border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all hover:-translate-y-0.5">
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
      icon: <Shield size={18} />,
    },
    {
      title: "Active Fraud Mitigation",
      desc: "Continuous monitoring of tracking data to eliminate artificial clicks, duplicate actions, and misleading promotional methods.",
      icon: <Lock size={18} />,
    },
    {
      title: "Strict Code & Copy Adherence",
      desc: "Ensuring all promotional voucher codes, deals, and marketing messages remain updated, authorised, and accurate at all times.",
      icon: <Code size={18} />,
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="inline-block text-blue-600 text-xs font-bold uppercase tracking-widest mb-4 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">Compliance & Brand Safety</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">Built-In Brand Safety & Compliance Control</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Growth is meaningless without integrity. Linktrackify protects your brand equity at every step of the campaign life cycle — from publisher onboarding to payout validation.</p>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimateOnScroll variants={slideLeft}>
            <div className="space-y-6">
              {complianceFeatures.map((f) => (
                <div key={f.title} className="flex gap-5 p-7 bg-gray-50 rounded-[28px] border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all">
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
          <p className="inline-block text-blue-400 text-xs font-bold uppercase tracking-widest mb-4 bg-blue-900/30 border border-blue-700/30 px-4 py-1.5 rounded-full">Built for Both Sides</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">A Platform Designed Around Your Goals</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Whether you're scaling a brand or monetising an audience, Linktrackify provides the infrastructure, transparency, and support you need to grow.</p>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-2 gap-8">
          <AnimateOnScroll variants={slideLeft}>
            <div className="bg-slate-800 rounded-[32px] p-8 border border-slate-700 h-full flex flex-col">
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
            <div className="bg-slate-800 rounded-[32px] p-8 border border-slate-700 h-full flex flex-col">
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
          <p className="inline-block text-blue-600 text-xs font-bold uppercase tracking-widest mb-4 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">FAQ</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">Common Questions</h2>
          <p className="text-gray-500">Haven't found what you're looking for? <Link to="/contact-us" className="text-blue-600 hover:underline">Contact us.</Link></p>
        </AnimateOnScroll>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div key={i} variants={cardVariant} className="border border-gray-100 rounded-[24px] overflow-hidden">
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
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-[40px] p-16 shadow-2xl shadow-blue-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
          <div className="relative">
            <p className="inline-block text-blue-200 text-xs font-bold uppercase tracking-widest mb-4 bg-blue-500/20 border border-blue-400/30 px-4 py-1.5 rounded-full">Get Started Today</p>
            <h2 className="text-5xl lg:text-6xl font-bold text-white tracking-tight mb-5">Ready to Align Performance with Growth?</h2>
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
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8 px-6 lg:px-8 relative overflow-hidden">
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
          <p className="text-xs text-gray-600">Linktrackify Ltd</p>
          <div className="flex gap-4">
            <Link to="/terms" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Terms</Link>
            <Link to="/privacy" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Privacy</Link>
            <p className="text-xs text-gray-700">© 2026 All rights reserved.</p>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="pointer-events-none select-none mt-6 -mb-4 px-2">
          <p style={{
            fontSize: "clamp(40px, 9vw, 130px)",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.15)",
            lineHeight: 1.1,
            textAlign: "center",
            fontFamily: "sans-serif",
            wordBreak: "break-word",
          }}>
            LINKTRACKIFY
          </p>
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
      {!hideLayout && <AnnouncementBar />}
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