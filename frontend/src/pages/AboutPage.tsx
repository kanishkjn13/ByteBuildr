import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Eye, 
  ArrowRight, 
  Code2, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  Compass, 
  Lock, 
  Headphones 
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useBooking } from '../hooks/useBooking';
import { ROUTES } from '../constants/routes';
import { TextReveal } from '../components/effects/TextReveal';
import { GradientText } from '../components/effects/GradientText';
import { TextHighlighter } from '../components/effects/TextHighlighter';
import { FinalCTASection } from '../components/sections/FinalCTASection';

export const AboutPage: React.FC = () => {
  const { openBooking } = useBooking();

  const coreValues = [
    {
      icon: Target,
      title: 'Conversion-Driven Engineering',
      description: 'Every interface element, call-to-action, and layout hierarchy is designed to convert visitors into booked clients.'
    },
    {
      icon: Code2,
      title: 'Bespoke Clean Code Architecture',
      description: 'Zero bloated page-builders. Lightweight React 18, TypeScript, and Tailwind CSS engineered for longevity.'
    },
    {
      icon: Zap,
      title: 'Sub-Second Speed Performance',
      description: 'Page speed directly affects Google SEO rankings and client trust. We target sub-500ms response times.'
    },
    {
      icon: ShieldCheck,
      title: 'Uncompromising Privacy & Security',
      description: 'HIPAA-compliant intake forms, SSL encryption, and enterprise-grade data security built into every build.'
    },
    {
      icon: TrendingUp,
      title: 'Transparent Pricing & Deliverables',
      description: 'Fixed-price proposals with clear milestones. Zero hidden maintenance fees or surprise charges.'
    },
    {
      icon: Headphones,
      title: 'Long-Term Support',
      description: 'We stay connected post-launch with speed monitoring, security SLAs, and expansion features.'
    }
  ];

  const whyChooseUs = [
    { icon: TrendingUp, title: 'Business-First Approach', text: 'Strategy driven by lead acquisition, client bookings, and revenue uplift.' },
    { icon: Layers, title: 'Custom Minimalist UI', text: 'Tactile design elevation that projects immediate market authority.' },
    { icon: Zap, title: 'Sub-Second Speed Target', text: 'Sub-second page loading architecture for optimal conversion.' },
    { icon: Compass, title: 'SEO-Ready Architecture', text: 'Structured schema markup and semantic HTML for top Google rankings.' },
    { icon: Lock, title: 'Enterprise Security', text: 'HIPAA-compliant intake forms, SSL encryption, and Stripe PCI standards.' },
    { icon: Headphones, title: 'Post-Launch Support', text: 'Ongoing speed audits, security monitoring, and strategic expansion.' }
  ];

  return (
    <>
      <Helmet>
        <title>About ByteBuilders</title>
        <meta
          name="description"
          content="Learn more about ByteBuilders and our mission."
        />
      </Helmet>

      {/* ========================================================================= */}
      {/* 1. STANDALONE HERO SECTION (Fills 100% of Viewport Above-The-Fold)        */}
      {/* ========================================================================= */}
      <section className="min-h-[calc(100vh-60px)] md:min-h-[calc(100vh-80px)] flex flex-col justify-center pt-20 pb-16 md:pt-28 md:pb-16 bg-[var(--bg-primary)] text-left relative overflow-hidden">
        {/* Ambient Radial Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/5 to-indigo-600/10 blur-3xl pointer-events-none rounded-full" />

        <div className="container mx-auto space-y-8 relative z-10 px-4">
          
          <Breadcrumbs />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <div className="hidden md:inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
              <span>AGENCY PHILOSOPHY & VISION</span>
            </div>

            <h1 className="text-hero text-[var(--text-primary)] leading-[1.1]">
              <TextReveal text="We Build More Than" />{' '}
              <GradientText>Digital Platforms.</GradientText>
            </h1>

            <div className="text-sm md:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              <TextReveal text="Creating digital experiences that help businesses establish authority, win client trust, and drive" />{' '}
              <TextHighlighter highlightColor="from-cyan-500/40 to-blue-500/40">
                <span className="font-bold text-[var(--text-primary)]">long-term growth.</span>
              </TextHighlighter>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => openBooking()}
                className="w-full sm:w-auto neo-btn neo-btn-accent text-xs sm:text-sm min-h-[52px] sm:min-h-0 sm:py-3.5 sm:px-8 px-6 rounded-full sm:rounded-xl justify-center font-extrabold sm:font-semibold shadow-[0_10px_30px_-5px_rgba(37,99,235,0.4)] gap-2"
              >
                <span>Book Free Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to={ROUTES.PORTFOLIO}
                className="w-full sm:w-auto neo-btn text-xs sm:text-sm min-h-[52px] sm:min-h-0 sm:py-3.5 sm:px-7 px-6 rounded-full sm:rounded-xl justify-center font-extrabold sm:font-semibold text-[var(--text-primary)]"
              >
                <span>View Our Work</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. BODY CONTENT SECTION (Revealed Strictly AFTER Scrolling Down)         */}
      {/* ========================================================================= */}
      <section className="pt-16 md:pt-24 pb-24 bg-[var(--bg-primary)] text-left relative overflow-hidden">
        <div className="container mx-auto space-y-20 relative z-10">
          
          {/* OUR ORIGIN STORY CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="neo-card p-5 sm:p-10 md:p-14 border border-[var(--border-light)] rounded-3xl relative overflow-hidden section-card shadow-xl space-y-6 md:space-y-8"
          >
            {/* Soft Ambient Radial Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

            <div className="space-y-3 relative z-10 text-left">
              <div className="hidden md:inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
                <span>OUR ORIGIN STORY</span>
              </div>

              <h2 className="text-section-title text-[var(--text-primary)]">
                <GradientText>Founded to Eliminate Clunky Templates & Slow Performance</GradientText>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 text-left">
              {/* Problem Block */}
              <div className="neo-inset p-5 sm:p-8 rounded-2xl border border-rose-500/10 dark:border-rose-500/5 bg-rose-500/[0.01] space-y-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
                {/* Subtle top light glow */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-rose-500/5 blur-xl pointer-events-none rounded-full" />
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold shrink-0">
                      <Target className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-[var(--text-primary)]">The Market Problem</h3>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    We saw too many medical practices, law firms, luxury real estate brokerages, and scale-ups struggling with generic, slow, clunky website templates that looked cheap, loaded slowly, and failed to generate qualified client leads.
                  </p>
                </div>
                <div className="pt-2 relative z-10">
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20 inline-block">
                    ✖ Generic Templates & Customer Drop-Offs
                  </span>
                </div>
              </div>

              {/* Solution Block */}
              <div className="neo-inset p-5 sm:p-8 rounded-2xl border border-emerald-500/10 dark:border-emerald-500/5 bg-emerald-500/[0.01] space-y-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
                {/* Subtle top light glow */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-500/5 blur-xl pointer-events-none rounded-full" />
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                      <Zap className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-[var(--text-primary)]">The ByteBuilders Solution</h3>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    We operate at the intersection of <strong className="text-[var(--text-primary)]">refined minimalist aesthetics</strong> and <strong className="text-[var(--text-primary)]">high-conversion UX engineering</strong>. By combining modern web standards, sub-second code, and clean CSS, we deliver web platforms that project immediate authority.
                  </p>
                </div>
                <div className="pt-2 relative z-10">
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-block">
                    ✓ 100% Bespoke Code & Sub-Second Speeds
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 text-left">
            
            {/* Mission Card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="neo-card p-5 sm:p-7 border border-[var(--border-light)] rounded-2xl relative overflow-hidden space-y-3.5 section-card shadow-md"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500" />
              
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                <Target className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[var(--text-primary)]">
                  <GradientText>Our Core Mission</GradientText>
                </h3>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Deliver high-impact digital flagships that convert passive website visitors into high-trust qualified clients—eliminating acquisition bottlenecks through sub-second speed, refined design, and automated intake funnels.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="neo-card p-5 sm:p-7 border border-[var(--border-light)] rounded-2xl relative overflow-hidden space-y-3.5 section-card shadow-md"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
                <Eye className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[var(--text-primary)]">
                  <GradientText>Our Long-Term Vision</GradientText>
                </h3>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Establish ByteBuilders as the premier long-term technology partner for forward-thinking enterprises seeking sustained digital market leadership, technical excellence, and zero-compromise quality.
              </p>
            </motion.div>

          </div>

          {/* 4. Core Operating Values (6 Value Cards Carousel on Mobile, Grid on Desktop) */}
          <div className="space-y-6 md:space-y-8 text-left">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="hidden md:inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
                <span>CORE OPERATING VALUES</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
                <GradientText>What Drives Every Architectural Decision</GradientText>
              </h3>
              <p className="text-[11px] sm:text-xs text-[var(--text-secondary)]">The principles that guide every line of code, design layout, and client partnership.</p>
            </div>

            {/* Mobile Horizontal Carousel */}
            <div className="md:hidden overflow-x-auto flex gap-4 pb-6 px-1 scroll-smooth snap-x snap-mandatory scrollbar-none">
              {coreValues.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div
                    key={idx}
                    className="min-w-[280px] snap-center neo-card p-5 border border-[var(--border-light)] rounded-2xl section-card space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)]">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h4 className="text-sm font-extrabold text-[var(--text-primary)]">
                      {val.title}
                    </h4>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Desktop Grid */}
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } }
              }}
              className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {coreValues.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 180 } }
                    }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="neo-card p-6 border border-[var(--border-light)] rounded-2xl section-card group space-y-3"
                  >
                    <div className="w-11 h-11 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {val.title}
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {val.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* 5. Legacy vs ByteBuilders Comparison Cards (Carousel on Mobile, Grid on Desktop) */}
          <div className="space-y-6 md:space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="hidden md:inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
                <span>WHY BYTEBUILDERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
                <GradientText>Solving Real Business Frustrations</GradientText>
              </h3>
            </div>
            
            {/* Mobile Horizontal Carousel */}
            <div className="md:hidden overflow-x-auto flex gap-4 pb-6 px-1 scroll-smooth snap-x snap-mandatory scrollbar-none">
              {[
                {
                  oldTitle: "Outdated Website Templates",
                  oldDesc: "Generic layout that looks like every competitor and damages brand authority.",
                  newText: "Custom Minimalist UI Flagship"
                },
                {
                  oldTitle: "12%+ Booking Marketplace Fees",
                  oldDesc: "Paying heavy monthly fees to third-party appointment platforms.",
                  newText: "0% Fee Automated Intake Engine"
                },
                {
                  oldTitle: "3.5s+ Page Loading Lag",
                  oldDesc: "Bloated code causing 50%+ of mobile visitors to bounce before loading.",
                  newText: "Sub-500ms Edge CDN Speed"
                },
                {
                  oldTitle: "Zero Post-Launch SLA Support",
                  oldDesc: "Left stranded with security vulnerabilities and broken plugins.",
                  newText: "24/7 Dedicated Partner SLA"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="min-w-[280px] snap-center neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-3 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-rose-500 font-bold uppercase tracking-wider block">✖ Old Way</span>
                    <h4 className="text-xs font-extrabold text-rose-500">{item.oldTitle}</h4>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{item.oldDesc}</p>
                  </div>
                  <div className="pt-2 border-t border-[var(--border-subtle)] mt-2">
                    <span className="text-[10px] font-bold text-emerald-600 block">✓ ByteBuilders: {item.newText}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5 text-left">
              <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-3 shadow-sm">
                <span className="text-[10px] font-mono text-rose-500 font-bold uppercase tracking-wider block">✖ Old Way</span>
                <h4 className="text-xs font-bold text-rose-500">Outdated Website Templates</h4>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">Generic layout that looks like every competitor and damages brand authority.</p>
                <div className="pt-2 border-t border-rose-500/20">
                  <span className="text-[10px] font-bold text-emerald-600 block">✓ ByteBuilders Upgrade: Custom Minimalist UI Flagship</span>
                </div>
              </div>

              <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-3 shadow-sm">
                <span className="text-[10px] font-mono text-rose-500 font-bold uppercase tracking-wider block">✖ Old Way</span>
                <h4 className="text-xs font-bold text-rose-500">12%+ Booking Marketplace Fees</h4>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">Paying heavy monthly fees to third-party appointment platforms.</p>
                <div className="pt-2 border-t border-rose-500/20">
                  <span className="text-[10px] font-bold text-emerald-600 block">✓ ByteBuilders Upgrade: 0% Fee Automated Intake Engine</span>
                </div>
              </div>

              <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-3 shadow-sm">
                <span className="text-[10px] font-mono text-rose-500 font-bold uppercase tracking-wider block">✖ Old Way</span>
                <h4 className="text-xs font-bold text-rose-500">3.5s+ Slow Page Loading Lag</h4>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">Bloated code causing 50%+ of mobile visitors to bounce before loading.</p>
                <div className="pt-2 border-t border-rose-500/20">
                  <span className="text-[10px] font-bold text-emerald-600 block">✓ ByteBuilders Upgrade: Sub-500ms Edge CDN Speed</span>
                </div>
              </div>

              <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-3 shadow-sm">
                <span className="text-[10px] font-mono text-rose-500 font-bold uppercase tracking-wider block">✖ Old Way</span>
                <h4 className="text-xs font-bold text-rose-500">Zero Post-Launch SLA Support</h4>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">Left stranded with security vulnerabilities and broken plugins.</p>
                <div className="pt-2 border-t border-rose-500/20">
                  <span className="text-[10px] font-bold text-emerald-600 block">✓ ByteBuilders Upgrade: 24/7 Dedicated Partner SLA</span>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Why Choose Us (Compact Layout for Mobile) */}
          <div className="space-y-6 md:space-y-8 text-left">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="hidden md:inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
                <span>WHY CHOOSE US</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
                <GradientText>Why Choose ByteBuilders</GradientText>
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {whyChooseUs.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="neo-card p-3.5 md:p-6 border border-[var(--border-light)] rounded-2xl flex flex-col md:flex-row items-start gap-2.5 md:gap-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[11px] sm:text-xs md:text-sm font-bold text-[var(--text-primary)] leading-tight">{item.title}</h4>
                      <p className="text-[10px] sm:text-xs text-[var(--text-secondary)] leading-normal md:leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 7. Final Call to Action */}
      <FinalCTASection 
        badgeText="START YOUR PROJECT"
        title="Let's Build Your Next Digital Success Story"
        subtitlePrefix="Schedule a free 30-minute consultation directly with our team to review your "
        highlightText="business growth strategy & project goals."
        primaryBtnText="Book Consultation"
        secondaryBtnText="Explore Services"
        secondaryBtnLink={ROUTES.SERVICES}
      />
    </>
  );
};
