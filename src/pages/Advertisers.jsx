import { useState, useEffect, useCallback } from "react";
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

// ─── MULTI-STEP FORM ──────────────────────────────────────────────────────────
function AdvertiserForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "", businessEmail: "", website: "", goal: "", budget: "", message: "",
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
        <h3 className="text-xl font-bold text-gray-900 mb-2">Application Received</h3>
        <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">Our partnership team will review your application and reach out within 2 business days.</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Email *</label>
            <input required type="email" value={form.businessEmail} onChange={(e) => update("businessEmail", e.target.value)}
              placeholder="you@company.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Website URL *</label>
            <input required type="url" value={form.website} onChange={(e) => update("website", e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
          </div>
          <button type="button" onClick={() => setStep(2)} disabled={!form.fullName || !form.businessEmail || !form.website}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all text-sm">
            Continue →
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Primary Marketing Goal *</label>
            <select required value={form.goal} onChange={(e) => update("goal", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white">
              <option value="">Select your goal</option>
              <option>Increase direct sales & revenue</option>
              <option>Grow brand awareness & reach</option>
              <option>Acquire new customers at scale</option>
              <option>Reduce cost-per-acquisition</option>
              <option>Expand into new markets</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Monthly Digital Budget Scale *</label>
            <select required value={form.budget} onChange={(e) => update("budget", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white">
              <option value="">Select budget range</option>
              <option>Under £5,000 / month</option>
              <option>£5,000 – £20,000 / month</option>
              <option>£20,000 – £50,000 / month</option>
              <option>£50,000 – £100,000 / month</option>
              <option>Over £100,000 / month</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Notes</label>
            <textarea value={form.message} onChange={(e) => update("message", e.target.value)}
              placeholder="Tell us about your brand, products, or any specific requirements..."
              rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)}
              className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-all text-sm">
              ← Back
            </button>
            <button type="submit" disabled={!form.goal || !form.budget}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all text-sm">
              Submit Application
            </button>
          </div>
        </>
      )}
      <div className="flex justify-center gap-2 pt-2">
        {[1, 2].map((s) => (
          <div key={s} className={`w-2 h-2 rounded-full transition-all ${step === s ? "bg-blue-600 w-6" : "bg-gray-200"}`} />
        ))}
      </div>
    </form>
  );
}


  const initParticles = useCallback(() => {
    const oldCanvas = document.querySelector('#particles-bg canvas');
    if (oldCanvas) oldCanvas.remove();
    if (window.pJSDom?.length > 0) {
      window.pJSDom.forEach((p) => p.pJS.fn.vendors.destroypJS());
      window.pJSDom = [];
    }
    window.particlesJS('particles-bg', {
      particles: {
        number: { value: 100, density: { enable: true, value_area: 900 } },
        color: { value: '#2563eb' },
        shape: { type: 'circle', stroke: { width: 0.5, color: '#3b82f6' } },
        opacity: { value: 0.4, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
        size: { value: 2.5, random: true, anim: { enable: true, speed: 2, size_min: 0.5 } },
        line_linked: { enable: true, distance: 160, color: '#2563eb', opacity: 0.15, width: 1 },
        move: { enable: true, speed: 1.5, random: true, out_mode: 'bounce' },
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { grab: { distance: 220, line_linked: { opacity: 0.6 } }, push: { particles_nb: 4 } },
      },
      retina_detect: true,
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const existingScript = document.getElementById('particles-script');
    if (existingScript) {
      if (window.particlesJS) initParticles();
      return;
    }
    const script = document.createElement('script');
    script.id = 'particles-script';
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => initParticles();
    return () => {
      const oldCanvas = document.querySelector('#particles-bg canvas');
      if (oldCanvas) oldCanvas.remove();
      if (window.pJSDom?.length > 0) {
        window.pJSDom.forEach((p) => p.pJS.fn.vendors.destroypJS());
        window.pJSDom = [];
      }
export default function Advertisers() {
  const [showForm, setShowForm] = useState(false);

  const services = [
    {
      title: "Precise Publisher Recruitment",
      desc: "We handle the manual vetting, screening, and alignment of performance publishers who perfectly match your brand's core target demographics and brand guidelines.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Campaign Deployment & Creative Alignment",
      desc: "From distributing your latest promotional voucher codes to updating product data feeds, we ensure your brand message remains synchronised across our entire publisher network.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Real-Time Performance Analytics",
      desc: "Access clean, uncorrupted tracking data. We continuously monitor and cross-reference clicks, conversion paths, and sales to keep attribution perfectly accurate.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
      color: "bg-violet-50 text-violet-600",
    },
    {
      title: "Consistent Payout & Capital Consolidation",
      desc: "Simplify your corporate accounting. Instead of managing payouts to thousands of independent publishers, you make a single monthly payment for validated results.",
      icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  const pillars = [
    {
      title: "Vetted Publisher Entry",
      desc: "We do not allow open, unverified registration. Every traffic source must pass our rigorous quality compliance checklist regarding past promotional histories and digital traffic methods before being assigned an offer link.",
      icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    },
    {
      title: "Active TM+ & PPC Protection",
      desc: "We strictly enforce negative keyword matching and ad-copy rules. Our system actively monitors search engines to ensure publishers do not bid on your trademarked terms or cannibalise your direct paid search campaigns.",
      icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    },
    {
      title: "Clean Promotional Voucher Hygiene",
      desc: "Expired codes, unauthorised coupons, and broken discount links damage your consumer experience and margins. We maintain a zero-tolerance policy for leaked or unapproved coupon distribution.",
      icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>,
    },
    {
      title: "Continuous Anti-Fraud Auditing",
      desc: "Our optimisation managers analyse attribution data daily to check for malicious traffic patterns, cookie-stuffing, or artificial lead generation, ensuring every action paid for is completely genuine.",
      icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Strategic Discovery & Target Definition",
      desc: "We sit down with your growth team to understand your exact customer acquisition cost goals, margin tolerances, and ideal publisher profiles.",
    },
    {
      number: "02",
      title: "Tracking & Pixel Architecture Setup",
      desc: "We integrate our secure, lightweight tracking protocols with your e-commerce platform to ensure frictionless, clean conversion attribution from day one.",
    },
    {
      number: "03",
      title: "Vetted Network Deployment",
      desc: "We present your campaign parameters to our curated pool of trusted performance publishers, kicking off targeted promotional activities immediately.",
    },
    {
      number: "04",
      title: "Continuous Optimisation & Safe Scaling",
      desc: "As data flows in, we optimise performance payouts, scale high-converting traffic channels, and continuously filter out non-performing sources to maximise your returns.",
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

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
            <button onClick={() => setShowForm(false)} className="absolute top-5 right-5 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Launch Your Programme</h3>
              <p className="text-sm text-gray-500">Tell us about your brand and goals. Our team will be in touch within 2 business days.</p>
            </div>
            <AdvertiserForm onClose={() => setShowForm(false)} />
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
              For Advertisers & Brands
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Secure Uncapped Customer<br />
              <span className="text-blue-600">Acquisition with Zero Ad-Spend Waste</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
              Shift your marketing from a budget liability to a guaranteed outcome. Linktrackify connects your brand with an elite ecosystem of vetted publishers, optimising your reach across digital channels on a pure pay-for-performance framework.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={() => setShowForm(true)}
                className="shiny-btn">
                Launch Your Programme
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
              <Link to="/contact-us"
                className="shiny-btn shiny-btn-outline">
                Speak with a Partner Manager
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INCREMENTALITY PROMISE ── */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">The Core Philosophy</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Driving Measurable, Incremental Revenue Growth</h2>
          </AnimateOnScroll>

          <div className="grid lg:grid-cols-2 gap-8">
            <AnimateOnScroll variants={slideLeft}>
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm h-full glow-card" onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
                <div className="shine-overlay" />
                <div className="shine-border" />
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Pure Cost-Per-Action Structure</h3>
                <p className="text-gray-500 leading-relaxed">Traditional advertising forces your brand to inherit all the financial risk of a campaign, paying for impressions and clicks that may never convert. Linktrackify completely flips the risk model. By operating on a pure CPA infrastructure, you establish your acquisition targets upfront, ensuring your capital is only deployed when verified revenue is captured.</p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variants={slideRight}>
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm h-full glow-card" onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
                <div className="shine-overlay" />
                <div className="shine-border" />
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Finding Untapped Audiences</h3>
                <p className="text-gray-500 leading-relaxed">Our network specialises in identifying and building touchpoints outside your current marketing silos. Through tailored content partnerships, hyper-targeted niche blogs, and strategic loyalty platforms, we place your products in front of intentional buyers who are ready to convert, expanding your overall digital footprint safely.</p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">What We Handle For You</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">End-to-End Programme Management & Optimisation</h2>
            <p className="text-gray-500 max-w-xl mx-auto">We act as a full-service infrastructure layer that removes the daily operational headache of running an affiliate programme — so your team can focus on growth.</p>
          </AnimateOnScroll>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <motion.div key={s.title} variants={cardVariant}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all bg-white hover:-translate-y-1 glow-card" onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
                <div className="shine-overlay" />
                <div className="shine-border" />
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${s.color}`}>{s.icon}</div>
                <h3 className="font-bold text-gray-900 mb-3 text-base leading-tight">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BRAND PROTECTION ── */}
      <section className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Brand Safety</p>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Enterprise-Grade Brand Safety and Compliance</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Scale is worthless without absolute control. Linktrackify acts as an uncompromising shield for your brand equity, ensuring every publisher and every conversion meets your standards.</p>
          </AnimateOnScroll>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <motion.div key={p.title} variants={cardVariant}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/30 transition-all hover:-translate-y-1 glow-card" onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
                <div className="shine-overlay" />
                <div className="shine-border" />
                <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center mb-5">{p.icon}</div>
                <h3 className="font-bold text-white mb-3 text-base">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ONBOARDING STEPS ── */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">How Onboarding Works</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Seamless Integration. Rapid Deployment.</h2>
            <p className="text-gray-500 max-w-xl mx-auto">A clear, frictionless path from initial conversation to live programme — structured to get your brand generating performance revenue as quickly as possible.</p>
          </AnimateOnScroll>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 z-0" />
            {steps.map((step) => (
              <motion.div key={step.number} variants={cardVariant}
                className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 z-10 glow-card" onMouseMove={handleTiltMove} onMouseLeave={handleTiltLeave}>
                <div className="shine-overlay" />
                <div className="shine-border" />
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-sm">{step.number}</div>
                  <span className="text-3xl font-black text-gray-100">{step.number}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm leading-tight">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
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
              <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-4">Ready to Scale</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5">Ready to Transition to Risk-Free, Scale-Driven Growth?</h2>
              <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">Let's protect your ad budget and accelerate your sales pipeline together. Get in touch with our partnership management team today to build your customised performance strategy.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={() => setShowForm(true)}
                  className="shiny-btn">
                  Apply as an Advertiser
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
                <Link to="/contact-us"
                  className="shiny-btn shiny-btn-outline">
                  Schedule a Strategic Consultation
                </Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </div>
  );
}