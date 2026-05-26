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
  visible: { transition: { staggerChildren: 0.15 } },
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

export default function AboutUs() {
  const pillars = [
    {
      title: "Absolute Transparency",
      desc: "We maintain uncorrupted attribution models. Every click stream, traffic source, and conversion touchpoint is monitored with surgical precision to ensure clean, auditable data for every party in the ecosystem.",
      icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
      color: "bg-blue-50 text-blue-600",
      border: "border-blue-100",
    },
    {
      title: "Uncompromising Brand Safety",
      desc: "Scale is empty without protection. We maintain strict compliance standards, actively isolating campaigns from unauthorised promo code sharing, predatory trademark bidding, and low-quality traffic channels.",
      icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      color: "bg-emerald-50 text-emerald-600",
      border: "border-emerald-100",
    },
    {
      title: "Performance Mutualism",
      desc: "We succeed only when our partners succeed. Our entire management framework is optimised to scale profitable volumes for brands while providing consistent infrastructure stability for professional media buyers and publishers.",
      icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      color: "bg-violet-50 text-violet-600",
      border: "border-violet-100",
    },
  ];

  const methodology = [
    {
      number: "01",
      title: "Meticulous Selection",
      desc: "We intentionally screen and align high-intent performance publishers with brands that match their core demographic focus, eliminating chaotic traffic placement and ensuring every promotional channel is pre-qualified.",
      icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    },
    {
      number: "02",
      title: "Active Stewardship & Oversight",
      desc: "Our compliance operations continuously audit promotional tracking links, voucher codes, and marketing ad copy to ensure complete adherence to brand guidelines across every active campaign at all times.",
      icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
      number: "03",
      title: "Structural Optimisation",
      desc: "We leverage data postbacks and margin analytics to scale high-performing traffic nodes and quickly prune non-converting or inefficient sources, ensuring sustained programme performance and return on investment.",
      icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    },
  ];

  return (
    <div className="pt-16">

      {/* ── HERO ── */}
      <section className="py-24 px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.08),transparent)]" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-blue-100">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              About Linktrackify
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Aligning Advertiser Risk<br />
              <span className="text-blue-600">with Absolute Performance</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-10">
              Linktrackify was built to modernise the relationship between brands and digital publishers. We eliminate unoptimised ad spend by replacing traditional marketing liabilities with a pure, outcome-based partnership ecosystem.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/advertisers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-all shadow-md shadow-blue-100 text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200">
                Explore Advertiser Solutions
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link to="/publishers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-gray-700 font-semibold px-7 py-3.5 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm">
                Apply as a Publisher
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CORE THESIS ── */}
      <section className="py-24 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Why We Exist</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Restoring Integrity to Digital Distribution</h2>
          </AnimateOnScroll>

          <div className="grid lg:grid-cols-2 gap-8">
            <AnimateOnScroll variants={slideLeft}>
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-red-100">
                  The Challenge
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">A Fragmented and Inefficient Digital Advertising Landscape</h3>
                <p className="text-gray-500 leading-relaxed">Modern digital advertising has become fragmented and inefficient. Brands routinely deploy massive upfront capital into impressions and clicks that yield zero actual business growth, while high-performing publishers often face delayed capital cycles and broken tracking attribution that erodes their campaign profitability.</p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variants={slideRight}>
              <div className="bg-white rounded-3xl p-10 border border-blue-100 shadow-sm h-full">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-blue-100">
                  The Linktrackify Solution
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">A Direct, Uncorrupted Conduit Between Brands and Publishers</h3>
                <p className="text-gray-500 leading-relaxed">We engineer a direct, uncorrupted conduit between both parties. By removing fixed overhead and operating strictly on verified Cost-Per-Action frameworks, we ensure that advertisers only deploy capital when revenue is definitively realised, while offering publishers a highly reliable tracking and payout ecosystem built for scale.</p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Our Principles</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Built on Institutional Principles</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Every operational decision at Linktrackify is guided by three foundational commitments that shape how we build, manage, and scale performance partnerships.</p>
          </AnimateOnScroll>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <motion.div key={p.title} variants={cardVariant}
                className={`bg-white rounded-2xl p-8 border ${p.border} shadow-sm hover:shadow-md transition-all hover:-translate-y-1`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${p.color}`}>{p.icon}</div>
                <h3 className="font-bold text-gray-900 mb-4 text-xl">{p.title}</h3>
                <p className="text-gray-500 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── METHODOLOGY ── */}
      <section className="py-24 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">How We Operate</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">The Performance-First Architecture</h2>
            <p className="text-gray-500 max-w-xl mx-auto">A continuous, self-correcting operational loop designed to maximise campaign quality, minimise risk exposure, and deliver compounding performance growth for all parties.</p>
          </AnimateOnScroll>

          <div className="max-w-4xl mx-auto">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
              className="space-y-6">
              {methodology.map((m, i) => (
                <motion.div key={m.number} variants={i % 2 === 0 ? slideLeft : slideRight}
                  className="flex gap-6 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-md shadow-blue-100">
                      {m.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{m.number}</span>
                      <div className="h-px flex-1 bg-blue-100" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">{m.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Loop indicator */}
            <AnimateOnScroll>
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  Continuous Performance Loop
                </div>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── COMPANY DETAILS ── */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll variants={slideLeft}>
              <div>
                <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Our Foundation</p>
                <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-6">A Professionally Structured Partnership Infrastructure</h2>
                <p className="text-gray-500 leading-relaxed mb-6">Linktrackify Ltd is a registered UK-based performance affiliate network, operating at the intersection of brand growth and digital publisher monetisation. Our infrastructure is built to support the rigorous compliance and operational standards required by leading affiliate networks including Awin and Impact.</p>
                <p className="text-gray-500 leading-relaxed mb-8">We operate as a strategic layer between advertisers and publishers — providing the management oversight, tracking architecture, and compliance infrastructure that transforms affiliate marketing from an unpredictable cost centre into a reliable, scalable growth channel.</p>
                <div className="space-y-3">
                  {[
                    { label: "Registered Entity", value: "Linktrackify Ltd" },
                    { label: "Location", value: "Covent Garden, London, United Kingdom" },
                    { label: "Network Integrations", value: "Awin & Impact" },
                    { label: "General Enquiries", value: "linktrackify@linktrackify.com" },
                    { label: "Compliance", value: "compliance@linktrackify.com" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                      <span className="text-sm font-semibold text-gray-400 w-40 flex-shrink-0">{item.label}</span>
                      <span className="text-sm text-gray-700">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variants={slideRight}>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-white">
                <div className="mb-8">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Our Operating Standards</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">The following operational commitments govern every programme, publisher relationship, and advertiser partnership we manage.</p>
                </div>
                <div className="space-y-4">
                  {[
                    "CPA-only commercial framework — no retainer or impression-based fees",
                    "Full publisher screening before campaign access is granted",
                    "Real-time tracking architecture with clean attribution models",
                    "Monthly consolidated invoicing and structured publisher payouts",
                    "Active trademark protection and voucher code hygiene protocols",
                    "Continuous fraud monitoring and anti-click manipulation systems",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-blue-600/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#60a5fa" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── DUAL CTA ── */}
      <section className="py-24 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Get Started</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Partner with Linktrackify</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Whether you represent a brand looking to scale performance marketing or a publisher seeking premium campaigns — Linktrackify has a structured pathway designed for your goals.</p>
          </AnimateOnScroll>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimateOnScroll variants={slideLeft}>
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col h-full">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-md shadow-blue-100">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-3">For Brands & Advertisers</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Scale Without Risk</h3>
                <p className="text-gray-500 leading-relaxed mb-8 flex-1">Secure incremental revenue, eliminate ad-spend waste, and protect your brand equity with our pure performance-driven framework. You only invest when verified results are delivered.</p>
                <Link to="/advertisers"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm hover:-translate-y-0.5 shadow-md shadow-blue-100">
                  Explore Advertiser Solutions
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variants={slideRight}>
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col h-full">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-md shadow-emerald-100">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <p className="text-emerald-600 text-xs font-semibold uppercase tracking-widest mb-3">For Professional Publishers</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Monetise with Precision</h3>
                <p className="text-gray-500 leading-relaxed mb-8 flex-1">Monetise your digital channels with uncorrupted tracking mechanics, reliable payout infrastructure, and premium campaigns sourced from leading brands across major consumer verticals.</p>
                <Link to="/publishers"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm hover:-translate-y-0.5 shadow-md shadow-emerald-100">
                  Apply as a Network Publisher
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