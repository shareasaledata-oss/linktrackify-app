import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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

// ─── THANK YOU SCREEN ─────────────────────────────────────────────────────────
function ThankYou({ type, onReset }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
      className="text-center py-12 px-6">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Request Received</h3>
      <p className="text-gray-500 leading-relaxed max-w-md mx-auto mb-2">
        Thank you for reaching out. A Linktrackify {type === "advertiser" ? "brand partnership" : "publisher network"} manager will review your technical parameters and contact you within 48 business hours.
      </p>
      <p className="text-sm text-gray-400 mb-8">Reference ID: LTF-{Date.now().toString().slice(-8)}</p>
      <button onClick={onReset} className="text-sm font-semibold text-blue-600 hover:underline">Submit another enquiry</button>
    </motion.div>
  );
}

// ─── ADVERTISER FORM ──────────────────────────────────────────────────────────
function AdvertiserForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", website: "", vertical: "", objective: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  if (submitted) return <ThankYou type="advertiser" onReset={() => setSubmitted(false)} />;

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
      <p className="text-sm text-gray-500 leading-relaxed mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
        Submit a request to our brand onboarding team to discuss setting up your CPA programme parameters, margin targets, and tracking integration requirements.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name *</label>
          <input required type="text" value={form.firstName} onChange={(e) => update("firstName", e.target.value)}
            placeholder="First name"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name *</label>
          <input required type="text" value={form.lastName} onChange={(e) => update("lastName", e.target.value)}
            placeholder="Last name"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Corporate Business Email *</label>
        <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
          placeholder="you@company.com"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
        <p className="text-xs text-gray-400 mt-1">Please use a corporate domain email address.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Website URL *</label>
        <input required type="url" value={form.website} onChange={(e) => update("website", e.target.value)}
          placeholder="https://yourcompany.com"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Primary Target Vertical *</label>
        <select required value={form.vertical} onChange={(e) => update("vertical", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white">
          <option value="">Select your vertical</option>
          <option>E-Commerce & Retail</option>
          <option>Technology & Subscriptions</option>
          <option>Health, Beauty & Lifestyle</option>
          <option>Finance & Insurance</option>
          <option>Travel & Hospitality</option>
          <option>Consumer Services</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Primary Growth Objective *</label>
        <textarea required value={form.objective} onChange={(e) => update("objective", e.target.value)}
          placeholder="Describe your key customer acquisition goals, target CPA, and what you're looking to achieve through performance marketing..."
          rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" />
      </div>

      <button type="submit"
        disabled={!form.firstName || !form.lastName || !form.email || !form.website || !form.vertical || !form.objective}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all text-sm hover:-translate-y-0.5 shadow-md shadow-blue-100">
        Submit Brand Onboarding Request →
      </button>
    </form>
  );
}

// ─── PUBLISHER FORM ───────────────────────────────────────────────────────────
function PublisherForm() {
  const [form, setForm] = useState({ name: "", email: "", trafficUrl: "", trafficFormat: "", trackingProtocol: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  if (submitted) return <ThankYou type="publisher" onReset={() => setSubmitted(false)} />;

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
      <p className="text-sm text-gray-500 leading-relaxed mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
        For existing publisher accounts or new network application reviews, submit your optimisation queries directly to our network compliance layer.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name / Entity Name *</label>
        <input required type="text" value={form.name} onChange={(e) => update("name", e.target.value)}
          placeholder="Your name or business entity"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Primary Contact Email *</label>
        <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Traffic Source URL / Social Channel / Media Profile *</label>
        <input required type="text" value={form.trafficUrl} onChange={(e) => update("trafficUrl", e.target.value)}
          placeholder="https://yoursite.com or @yoursocialhandle"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Primary Traffic Format *</label>
        <select required value={form.trafficFormat} onChange={(e) => update("trafficFormat", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white">
          <option value="">Select traffic format</option>
          <option>Content & SEO</option>
          <option>PPC & Paid Media</option>
          <option>Voucher & Loyalty</option>
          <option>Social & Influencer</option>
          <option>Email Marketing</option>
          <option>Comparison / Review</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Tracking Protocol Used</label>
        <select value={form.trackingProtocol} onChange={(e) => update("trackingProtocol", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white">
          <option value="">Select protocol (optional)</option>
          <option>S2S Postback</option>
          <option>Webhook</option>
          <option>API Integration</option>
          <option>Standard Pixel</option>
          <option>Not applicable</option>
        </select>
      </div>

      <button type="submit"
        disabled={!form.name || !form.email || !form.trafficUrl || !form.trafficFormat}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all text-sm hover:-translate-y-0.5 shadow-md shadow-emerald-100">
        Submit Publisher Inquiry →
      </button>
    </form>
  );
}


  // ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function ContactUs() {
  const [activeTab, setActiveTab] = useState("advertiser");

  const departments = [
    {
      title: "Corporate Partnerships",
      subtitle: "General & Strategic Alliances",
      desc: "For master agency relationships, software integrations, and general corporate enquiries.",
      email: "partnerships@linktrackify.com",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      color: "bg-blue-50 text-blue-600",
      border: "border-blue-100",
    },
    {
      title: "Network Compliance",
      subtitle: "Brand Safety & Compliance Control",
      desc: "To report promotional voucher code discrepancies, trademark bidding violations, or traffic authenticity concerns.",
      email: "compliance@linktrackify.com",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      color: "bg-amber-50 text-amber-600",
      border: "border-amber-100",
    },
    {
      title: "Privacy & Security",
      subtitle: "Data Protection & Legal Architecture",
      desc: "For official enquiries relating to secure tracking protocols, data transmission guidelines, and privacy regulations.",
      email: "privacy@linktrackify.com",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
      color: "bg-violet-50 text-violet-600",
      border: "border-violet-100",
    },
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

      {/* ── HERO ── */}
      <section className="py-24 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.08),transparent)]" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-blue-100">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              Partnership Management Team
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Connect with Our<br />
              <span className="text-blue-600">Performance Management Team</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
              Whether you are an advertiser looking to scale risk-free customer acquisition or a professional publisher seeking stable tracking infrastructure, select the appropriate department below for expedited routing.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── TABBED FORMS ── */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          {/* Tab switcher */}
          <div className="flex bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm mb-8">
            <button onClick={() => setActiveTab("advertiser")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === "advertiser" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              Brand & Advertiser Partnerships
            </button>
            <button onClick={() => setActiveTab("publisher")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === "publisher" ? "bg-emerald-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Publisher & Media Buyer Relations
            </button>
          </div>

          {/* Form card */}
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className={`px-8 py-5 border-b border-gray-100 ${activeTab === "advertiser" ? "bg-blue-50" : "bg-emerald-50"}`}>
              <h3 className="font-bold text-gray-900 text-lg">
                {activeTab === "advertiser" ? "Brand & Advertiser Partnerships" : "Publisher & Media Buyer Relations"}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                {activeTab === "advertiser" ? "Complete the form below to begin your advertiser onboarding process." : "Complete the form below to submit your publisher network enquiry."}
              </p>
            </div>
            <div className="p-8">
              {activeTab === "advertiser" ? <AdvertiserForm /> : <PublisherForm />}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DEPARTMENTAL INBOXES ── */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Direct Contact</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Direct Departmental Inboxes</h2>
            <p className="text-gray-500 max-w-xl mx-auto">For direct enquiries, our operational departments maintain dedicated corporate domain inboxes to ensure precise, expedited routing of all incoming communications.</p>
          </AnimateOnScroll>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <motion.div key={dept.title} variants={cardVariant}
                className={`bg-white rounded-2xl p-8 border ${dept.border} shadow-sm hover:shadow-md transition-all hover:-translate-y-1 glow-card`} onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
                <div className="shine-overlay" />
                <div className="shine-border" />
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${dept.color}`}>{dept.icon}</div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">{dept.subtitle}</p>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{dept.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{dept.desc}</p>
                <a href={`mailto:${dept.email}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {dept.email}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SLA MATRIX ── */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll className="text-center mb-12">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Service Levels</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Response Protocols & Support Windows</h2>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden glow-card" onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
              <div className="shine-overlay" />
              <div className="shine-border" />
              {/* Header */}
              <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1">Our Commitment</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">Linktrackify operates on strict data management and communication windows. Our performance management teams monitor incoming data and compliance enquiries continuously.</p>
                  </div>
                </div>
              </div>

              {/* SLA items */}
              <div className="divide-y divide-gray-50">
                {[
                  {
                    type: "Standard Intake Review",
                    desc: "All advertiser and publisher partnership requests are reviewed, parsed, and assigned to a specific account specialist within 24–48 business hours.",
                    time: "24–48 hrs",
                    color: "text-blue-600",
                    bg: "bg-blue-50",
                    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
                  },
                  {
                    type: "Compliance Escalations",
                    desc: "Traffic and brand protection enquiries sent directly to our compliance infrastructure are prioritised and addressed immediately by our technical review team.",
                    time: "Priority",
                    color: "text-amber-600",
                    bg: "bg-amber-50",
                    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                  },
                  {
                    type: "Privacy & Legal Enquiries",
                    desc: "Data protection, GDPR-related, and legal correspondence are handled by our privacy team and addressed within the regulatory required response window.",
                    time: "72 hrs",
                    color: "text-violet-600",
                    bg: "bg-violet-50",
                    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
                  },
                ].map((item) => (
                  <div key={item.type} className="flex items-start gap-5 px-8 py-6">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bg} ${item.color}`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-900">{item.type}</h4>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.bg} ${item.color}`}>{item.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── COMPANY INFO ── */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              {[
                {
                  icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                  label: "Registered Address",
                  value: "Covent Garden, London, United Kingdom",
                },
                {
                  icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                  label: "General Enquiries",
                  value: "linktrackify@linktrackify.com",
                },
                {
                  icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg>,
                  label: "Registered Entity",
                  value: "Linktrackify Ltd",
                },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 glow-card" onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
                  <div className="shine-overlay" />
                  <div className="shine-border" />
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">{item.icon}</div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-gray-700">{item.value}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── FOOTER GATEWAYS ── */}
      <section className="py-16 px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            <AnimateOnScroll>
              <div className="bg-white rounded-2xl p-6 border border-blue-100 flex items-center justify-between gap-4 hover:shadow-md transition-all hover:-translate-y-0.5 glow-card" onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
                <div className="shine-overlay" />
                <div className="shine-border" />
                <div>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">For Advertisers</p>
                  <p className="text-sm text-gray-600">Ready to deploy a risk-free campaign right now?</p>
                </div>
                <Link to="/advertisers"
                  className="shiny-btn">
                  Launch as Advertiser
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <div className="bg-white rounded-2xl p-6 border border-emerald-100 flex items-center justify-between gap-4 hover:shadow-md transition-all hover:-translate-y-0.5 glow-card" onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
                <div className="shine-overlay" />
                <div className="shine-border" />
                <div>
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1">For Publishers</p>
                  <p className="text-sm text-gray-600">Looking to access premium performance offers?</p>
                </div>
                <Link to="/publishers"
                  className="shiny-btn shiny-btn-emerald">
                  Apply as Publisher
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}