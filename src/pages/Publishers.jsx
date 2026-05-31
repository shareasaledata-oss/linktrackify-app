import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

// ─── PUBLISHER APPLICATION FORM ───────────────────────────────────────────────
function PublisherForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "", email: "", website: "",
    trafficSource: "", vertical: "", trackingPlatform: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted</h3>
        <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">Our compliance team will review your application and respond within 2 business days.</p>
        <button onClick={onClose} className="text-sm font-semibold text-blue-600 hover:underline">Close</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {step === 1 && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
            <input required type="text" value={form.fullName} onChange={(e) => update("fullName", e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
            <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
              placeholder="you@domain.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Website / Traffic Source URL *</label>
            <input required type="url" value={form.website} onChange={(e) => update("website", e.target.value)}
              placeholder="https://yoursite.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
          </div>
          <button type="button" onClick={() => setStep(2)} disabled={!form.fullName || !form.email || !form.website}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all text-sm">
            Continue →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Primary Traffic Source *</label>
            <select required value={form.trafficSource} onChange={(e) => update("trafficSource", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white">
              <option value="">Select traffic source</option>
              <option>Content / SEO Blog</option>
              <option>PPC / Paid Search</option>
              <option>Social Media / Influencer</option>
              <option>Email Marketing</option>
              <option>Voucher / Deal Site</option>
              <option>Comparison / Review Site</option>
              <option>Native Advertising</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Vertical Speciality *</label>
            <select required value={form.vertical} onChange={(e) => update("vertical", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white">
              <option value="">Select your vertical</option>
              <option>E-Commerce & Retail</option>
              <option>Technology & Software</option>
              <option>Health, Beauty & Lifestyle</option>
              <option>Finance & Insurance</option>
              <option>Travel & Hospitality</option>
              <option>Consumer Services</option>
              <option>General / Multiple Verticals</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tracking Platform You Use</label>
            <select value={form.trackingPlatform} onChange={(e) => update("trackingPlatform", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white">
              <option value="">Select platform (optional)</option>
              <option>Voluum</option>
              <option>RedTrack</option>
              <option>Binom</option>
              <option>ClickMagick</option>
              <option>Custom / In-House</option>
              <option>None / Not applicable</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Notes</label>
            <textarea value={form.message} onChange={(e) => update("message", e.target.value)}
              placeholder="Describe your promotional methods, audience size, or any specific offers you're interested in..."
              rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)}
              className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-all text-sm">
              ← Back
            </button>
            <button type="submit" disabled={!form.trafficSource || !form.vertical}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all text-sm">
              Submit Application
            </button>
          </div>
        </>
      )}

      <div className="flex justify-center gap-2 pt-2">
        {[1, 2].map((s) => (
          <div key={s} className={`h-2 rounded-full transition-all ${step === s ? "bg-blue-600 w-6" : "bg-gray-200 w-2"}`} />
        ))}
      </div>
    </form>
  );
}

export default function Publishers() {
  const [showForm, setShowForm] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const benefits = [
    {
      title: "Frictionless Attribution & Tracking Hygiene",
      desc: "Never lose a conversion. Our lightweight tracking architecture ensures real-time click and conversion logging, protecting your traffic investments with completely accurate attribution.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Streamlined Capital Cycles",
      desc: "Cash flow is critical for scaling campaigns. Linktrackify provides dependable, predictable, and expedited payout infrastructure for all approved, validated conversions.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Direct Brand Integrations",
      desc: "Skip the noise. We source optimised, direct performance campaigns across major consumer verticals, ensuring competitive payout margins and stable offer caps.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
      color: "bg-violet-50 text-violet-600",
    },
  ];

  const trafficTypes = [
    {
      title: "Content Creators & Digital Media",
      desc: "Deep product reviews, curated niche blogs, and authority editorial platforms looking for contextual, high-converting product matches.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Strategic Voucher & Deal Aggregators",
      desc: "High-intent, deal-focused optimisation platforms driving conversions at the final step of the consumer purchase funnel through authorised promo codes.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Paid Media Buyers & PPC Arbitrage",
      desc: "Professional search, native, and social media buyers looking for stable tracking links, high payout ceilings, and rapid conversion postbacks.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg>,
      color: "bg-violet-50 text-violet-600",
    },
    {
      title: "Social Influencers & Creators",
      desc: "Audience-first creators across modern social channels looking to monetise authentic recommendations with straightforward trackable links.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      color: "bg-rose-50 text-rose-600",
    },
  ];

  const toolsets = [
    {
      title: "Advanced Deep-Linking Mechanics",
      desc: "Instantly generate direct, optimised affiliate tracking links to specific landing pages, categories, or product feeds to shorten the buyer journey and improve conversion rates.",
      icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
    },
    {
      title: "Dynamic Server-to-Server Postbacks",
      desc: "Robust S2S postback capabilities and webhook support to seamlessly relay real-time conversion data straight into your tracking platform or optimisation scripts.",
      icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    },
    {
      title: "Clean Asset Optimisation Hub",
      desc: "Get instant access to approved creative banner packages, up-to-date voucher code data feeds, and compliance-ready landing page copy resources — all in one centralised interface.",
      icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Comprehensive Registration",
      desc: "Submit your application detailing your primary traffic sources, target promotional verticals, and historical performance frameworks.",
    },
    {
      number: "02",
      title: "Verification & Compliance Review",
      desc: "Our compliance management team reviews your traffic channels and promotional assets to ensure a perfect alignment with our brand safety standards.",
    },
    {
      number: "03",
      title: "Live Access & Campaign Deployment",
      desc: "Once approved, access your dashboard, pull optimised campaign tracking links, connect your postbacks, and begin scaling your performance revenue.",
    },
  ];

  const faqs = [
    { q: "When are payouts processed?", a: "Publisher payouts are processed on a structured monthly schedule between the 25th and 30th of each month. Payments are issued via Payoneer once your account balance reaches the minimum payout threshold. All timelines are communicated clearly within your dashboard." },
    { q: "Do you support S2S tracking?", a: "Yes. Linktrackify supports server-to-server (S2S) postback tracking, allowing you to relay real-time conversion data directly into your third-party tracking platform or custom optimisation scripts. Our technical team can assist with setup during onboarding." },
    { q: "Are deep links available for all programmes?", a: "Deep linking is available across the majority of our active programmes. Once approved, you can generate deep links directly from your publisher dashboard, pointing traffic to specific product pages, categories, or promotional landing pages." },
    { q: "What compliance rules must I follow?", a: "All publishers must adhere to our compliance guidelines, which include no trademark bidding (TM+) without explicit written approval, exclusive use of authorised promotional materials, transparent traffic source disclosure, and zero tolerance for incentivised or artificial traffic methods." },
  ];

  const handleTiltMove = (e) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y - height / 2) / (height / 2)) * -6;
    const rotateY = ((x - width / 2) / (width / 2)) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    card.style.transition = 'transform 0.1s ease-out';
  };

  const handleTiltLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    e.currentTarget.style.transition = 'transform 0.4s ease-in-out';
  };

  return (
    <div className="pt-16" style={{ position: 'relative', zIndex: 1 }}>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowForm(false)} className="absolute top-5 right-5 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Apply as a Publisher</h3>
              <p className="text-sm text-gray-500">Tell us about your traffic and promotional methods. Our team will review and respond within 2 business days.</p>
            </div>
            <PublisherForm onClose={() => setShowForm(false)} />
          </motion.div>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="py-24 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.08),transparent)]" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-blue-100">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              For Publishers & Affiliate Marketers
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Monetise Your Traffic with<br />
              <span className="text-blue-600">Ultimate Precision and Stability</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
              Gain access to high-converting performance offers across premium verticals. Partner with Linktrackify to leverage uncorrupted tracking protocols, optimised campaign assets, and a consistent payment architecture built around your performance.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={() => setShowForm(true)}
                className="shiny-btn">
                Apply as a Publisher
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
              <Link to="/contact-us"
                className="shiny-btn shiny-btn-outline">
                Review Compliance Guidelines
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CORE BENEFITS ── */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Why Top Publishers Align With Us</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Engineered to Support Your Performance Mechanics</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Built for professional affiliate marketers, media buyers, and content creators who demand accuracy, reliability, and consistent revenue flow.</p>
          </AnimateOnScroll>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <motion.div key={b.title} variants={cardVariant}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 glow-card" onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
                <div className="shine-overlay" />
                <div className="shine-border" />
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${b.color}`}>{b.icon}</div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{b.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TRAFFIC TYPES ── */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Monetisation Pathways</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Tailored Optimisation Across Every Publisher Type</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Whether you operate a content site, run paid campaigns, or manage a voucher platform — Linktrackify has a structured path for your traffic type.</p>
          </AnimateOnScroll>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trafficTypes.map((t) => (
              <motion.div key={t.title} variants={cardVariant}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all bg-white hover:-translate-y-1 glow-card" onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
                <div className="shine-overlay" />
                <div className="shine-border" />
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${t.color}`}>{t.icon}</div>
                <h3 className="font-bold text-gray-900 mb-3 text-base leading-tight">{t.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TOOLSETS ── */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Platform Capabilities</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Built-In Utilities for Seamless Campaign Scaling</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Essential technological tools to run successful affiliate campaigns — from link generation to real-time conversion data relay.</p>
          </AnimateOnScroll>

          <div className="space-y-6 max-w-4xl mx-auto">
            {toolsets.map((tool, i) => (
              <AnimateOnScroll key={tool.title} variants={i % 2 === 0 ? slideLeft : slideRight}>
                <div className="flex gap-6 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 glow-card" onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
                  <div className="shine-overlay" />
                  <div className="shine-border" />
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-100">
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{tool.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{tool.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE ── */}
      <section className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Network Standards</p>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Transparent Network Standards & Brand Alignment</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Linktrackify operates a vetted, secure marketplace. We maintain strict compliance guidelines to protect the integrity of our publishers and the margins of our brands.</p>
          </AnimateOnScroll>

          <div className="max-w-3xl mx-auto">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
              className="space-y-4">
              {[
                { title: "Verified Traffic Origin", desc: "All traffic methods must be transparently disclosed during onboarding and remain audit-ready at all times. Any undisclosed traffic changes must be reported to our compliance team immediately." },
                { title: "Zero-Tolerance TM+ Policy", desc: "Strictly no bidding on protected advertiser trademarks or brand terms unless explicit written authorisation is granted for specialised search campaigns. Violations result in immediate account suspension." },
                { title: "Authorised Material Use", desc: "Publishers must only deploy promotional codes, banners, and text copy explicitly issued through the Linktrackify interface. The use of unauthorised, expired, or third-party sourced materials is strictly prohibited." },
              ].map((item, i) => (
                <motion.div key={item.title} variants={cardVariant}
                  className="flex gap-5 bg-slate-800 rounded-2xl p-6 border border-slate-700 glow-card" onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
                  <div className="shine-overlay" />
                  <div className="shine-border" />
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1.5">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ONBOARDING STEPS ── */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">How To Join</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Secure Your Publisher Access in 3 Steps</h2>
            <p className="text-gray-500 max-w-xl mx-auto">A structured, professional onboarding process designed to get qualified publishers live and generating revenue as quickly as possible.</p>
          </AnimateOnScroll>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-8 relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 z-0" />
            {steps.map((step) => (
              <motion.div key={step.number} variants={cardVariant}
                className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 z-10 text-center glow-card" onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
                <div className="shine-overlay" />
                <div className="shine-border" />
                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-5 font-bold text-lg shadow-md shadow-blue-100">
                  {step.number}
                </div>
                <h3 className="font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Publisher FAQ</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Common Publisher Questions</h2>
            <p className="text-gray-500">Have more questions? <Link to="/contact-us" className="text-blue-600 hover:underline">Contact our network team.</Link></p>
          </AnimateOnScroll>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={cardVariant} className="border border-gray-100 rounded-2xl overflow-hidden bg-white glow-card" onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
                <div className="shine-overlay" />
                <div className="shine-border" />
                <button className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="text-sm font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <motion.svg animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                    className="flex-shrink-0" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </motion.svg>
                </button>
                {openFaq === i && (
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

      {/* ── BOTTOM CTA ── */}
      <section className="py-24 px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-16 shadow-2xl shadow-blue-100 relative overflow-hidden glow-card" onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
            <div className="shine-overlay" />
            <div className="shine-border" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
            <div className="relative">
              <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-4">Join the Network</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5">Ready to Align with a Performance-First Network?</h2>
              <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">Gain access to premium offers, rely on precise tracking, and scale your digital assets with a network designed around the modern publisher.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={() => setShowForm(true)}
                  className="shiny-btn">
                  Apply to Linktrackify Today
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
                <Link to="/contact-us"
                  className="shiny-btn shiny-btn-outline">
                  Contact Network Compliance
                </Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </div>
  );
}