import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Palette, 
  Zap, 
  ArrowRight, 
  Check, 
  Compass,
  Layout,
  Rocket
} from 'lucide-react';
import { SEOHead } from '../seo/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useBooking } from '../hooks/useBooking';
import { ROUTES } from '../constants/routes';
import { GradientText } from '../components/effects/GradientText';
import { TextReveal } from '../components/effects/TextReveal';
import { TextHighlighter } from '../components/effects/TextHighlighter';
import { TechStackMarquee } from '../components/common/TechStackMarquee';
import { FinalCTASection } from '../components/sections/FinalCTASection';

export const ServicesPage: React.FC = () => {
  const { openBooking } = useBooking();

  // Minimal 4 Core Services for a Fresher / Modern Agency
  const coreServices = [
    {
      id: 'service-custom-web-dev',
      title: 'Custom Website Development',
      icon: Code2,
      summary: 'Hand-crafted, fast, and responsive websites built from scratch to showcase your brand and win customer trust.',
      features: [
        '100% Mobile & Desktop Responsive',
        'Sub-second Loading Performance',
        'SEO-optimized Structure & Meta Tags',
        'Clean, Maintainable Code architecture'
      ]
    },
    {
      id: 'service-uiux-design',
      title: 'UI / UX Web Design',
      icon: Palette,
      summary: 'Clean, minimalist website designs and interactive Figma prototypes that make your agency stand out.',
      features: [
        'Custom Figma Wireframes & Mocks',
        'Minimalist Typography & Color Systems',
        'User-Centric Layout & Navigation',
        'Interactive Prototype Previews'
      ]
    },
    {
      id: 'service-redesign-optimization',
      title: 'Redesign & Speed Optimization',
      icon: Zap,
      summary: 'Transform slow, outdated websites into sleek, modern digital assets with 90+ Lighthouse speed scores.',
      features: [
        'Modern UI Makeover & Layout Refactoring',
        'Image Compression & Lazy Loading',
        'Code Splitting & Performance Tuning',
        'Responsive Mobile Optimization'
      ]
    },
    {
      id: 'service-care-support',
      title: 'Website Care & Support',
      icon: Rocket,
      summary: 'Ongoing maintenance, security checks, and content updates so your site stays fast and secure without any stress.',
      features: [
        'Regular Security Audits & Updates',
        'Fast Content & Design Edits',
        'Uptime & Performance Monitoring',
        'Dedicated Communication Line'
      ]
    }
  ];

  // Minimal Process Steps
  const simpleProcess = [
    {
      step: '01',
      title: 'Discovery & Plan',
      icon: Compass,
      timeframe: 'Phase 1',
      desc: 'We discuss your project goals, content, and design preferences over a short call or chat.',
      highlight: 'Requirement Alignment'
    },
    {
      step: '02',
      title: 'Design & Prototype',
      icon: Layout,
      timeframe: 'Phase 2',
      desc: 'We create clean wireframes and visual designs for your review before writing code.',
      highlight: 'Custom Figma Mockup'
    },
    {
      step: '03',
      title: 'Development',
      icon: Code2,
      timeframe: 'Phase 3',
      desc: 'We code your website using modern, fast technologies with responsive mobile layouts.',
      highlight: 'Clean Code Build'
    },
    {
      step: '04',
      title: 'Launch & Deliver',
      icon: Rocket,
      timeframe: 'Phase 4',
      desc: 'We test performance, deploy your site live, and hand over complete access with ongoing care.',
      highlight: 'Live Launch & Care'
    }
  ];

  return (
    <>
      <SEOHead 
        title="Services | Clean & Modern Web Development Agency"
        description="Simple, affordable, and high-impact web development, UI/UX design, and website redesign services for growing businesses."
      />

      {/* ========================================================================= */}
      {/* 1. STANDALONE HERO SECTION (Fills 100% of Viewport Above-The-Fold)        */}
      {/* ========================================================================= */}
      <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center pt-28 pb-16 bg-[var(--bg-primary)] text-left relative overflow-hidden">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-3xl pointer-events-none rounded-full" />

        <div className="container mx-auto space-y-8 relative z-10 px-4 max-w-6xl">
          
          <Breadcrumbs />

          {/* Minimal Hero Header */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 neo-pill px-4 py-1.5 text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider"
            >
              <span>FRESH & FOCUSED WEB AGENCY</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight"
            >
              Simple, High-Impact Services for <GradientText>Your Online Presence</GradientText>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto"
            >
              <TextReveal text="We craft clean, fast, and modern websites that help your business look professional and" />
              <br className="hidden sm:inline" />
              <TextHighlighter highlightColor="from-cyan-500/40 to-blue-500/40">
                <span className="font-bold text-[var(--text-primary)]">turn visitors into real clients. No complex jargon—just great work.</span>
              </TextHighlighter>
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            >
              <button
                onClick={() => openBooking()}
                className="w-full sm:w-auto neo-btn neo-btn-accent text-xs sm:text-sm min-h-[52px] sm:min-h-0 sm:py-3.5 sm:px-8 px-6 rounded-full sm:rounded-xl justify-center font-extrabold sm:font-semibold shadow-md gap-2"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to={ROUTES.PORTFOLIO}
                className="w-full sm:w-auto neo-btn text-xs sm:text-sm min-h-[52px] sm:min-h-0 sm:py-3.5 sm:px-7 px-6 rounded-full sm:rounded-xl text-[var(--text-primary)] justify-center font-extrabold sm:font-semibold"
              >
                <span>View Our Work</span>
              </Link>
            </motion.div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. BODY SERVICES SECTION (Revealed Strictly AFTER Scrolling Down)          */}
      {/* ========================================================================= */}
      <section className="pt-16 md:pt-24 pb-24 bg-[var(--bg-primary)] text-left relative overflow-hidden">
        <div className="container mx-auto space-y-20 relative z-10 px-4 max-w-6xl">

          {/* 2. Minimal 4 Core Services Grid */}
          <div id="services-grid" className="space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
                <span>OUR SERVICES</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
                <GradientText>What We Do Best</GradientText>
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">Focused web solutions designed to get your business online quickly and effectively.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreServices.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    whileHover={{ y: -4 }}
                    className="neo-card p-6 md:p-8 border border-[var(--border-light)] rounded-2xl flex flex-col justify-between space-y-6 section-card group"
                  >
                    <div className="space-y-4">
                      <div className="w-11 h-11 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Title & Summary */}
                      <div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                          {service.summary}
                        </p>
                      </div>

                      {/* Features Checklist */}
                      <div className="pt-2 space-y-2 border-t border-[var(--border-subtle)]">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
                          What's Included:
                        </span>
                        <ul className="space-y-1.5">
                          {service.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="pt-4">
                      <button
                        onClick={() => openBooking()}
                        className="w-full neo-btn text-xs min-h-[52px] rounded-full py-3.5 px-6 justify-between group-hover:border-[var(--accent-primary)] transition-all text-[var(--text-primary)] font-extrabold"
                      >
                        <span>Request This Service</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 3. Simple Process Timeline */}
          <div className="space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
                <span>OUR PROCESS</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
                <GradientText>How We Work Together</GradientText>
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">A clear 4-step workflow to turn your ideas into a finished website.</p>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {simpleProcess.map((proc) => {
                const Icon = proc.icon;
                return (
                  <motion.div
                    key={proc.step}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 180 } }
                    }}
                    className="neo-card p-5 border border-[var(--border-light)] rounded-2xl space-y-3 relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono font-bold text-[var(--text-tertiary)]">
                        {proc.step}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[var(--accent-primary)] block font-semibold">
                        {proc.timeframe}
                      </span>
                      <h3 className="text-sm font-bold text-[var(--text-primary)] mt-0.5">
                        {proc.title}
                      </h3>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {proc.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* 4. Tech Stack Marquee */}
          <div className="space-y-6 text-center pt-4 border-t border-[var(--border-subtle)]">
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider font-semibold block">
              Modern Tech Built For Speed & Security
            </span>
            <TechStackMarquee />
          </div>

          {/* 5. Final CTA Banner */}
          <FinalCTASection 
            badgeText="READY TO BUILD?"
            title="Let's Build Something Great Together"
            subtitlePrefix="Get in touch today for a free consultation or quick estimate for your "
            highlightText="custom web development project."
            primaryBtnText="Discuss Your Project"
            secondaryBtnText="Explore Portfolio"
            secondaryBtnLink={ROUTES.PORTFOLIO}
          />

        </div>
      </section>
    </>
  );
};
