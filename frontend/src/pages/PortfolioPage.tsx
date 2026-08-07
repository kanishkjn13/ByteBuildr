import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Check, ArrowRight, ChevronDown, RotateCw } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useBooking } from '../hooks/useBooking';
import { useIsMobile } from '../hooks/useIsMobile';
import { portfolioProjects, agencyInfo } from '../data/agencyData';
import { TextReveal } from '../components/effects/TextReveal';
import { GradientText } from '../components/effects/GradientText';
import { TextHighlighter } from '../components/effects/TextHighlighter';
import { FinalCTASection } from '../components/sections/FinalCTASection';
import { PhoneMockupFrame } from '../components/common/PhoneMockupFrame';
import { MonitorMockup } from '../components/common/MonitorMockup';

interface ExtendedProjectDetail {
  url: string;
  category: string;
  tech: string[];
  highlights: string[];
  metrics: { label: string; value: string }[];
  challenge: string;
  solution: string;
}

const projectDetails: Record<string, ExtendedProjectDetail> = {
  'proj-healthcare': {
    url: 'https://aura-health.bytebuild.dev',
    category: 'Healthcare & Medical Tech',
    tech: ['React 18', 'TypeScript', 'Tailwind', 'REST APIs'],
    highlights: ['Sub-500ms Instant Patient Intake', '1-Click Calendar Scheduling Sync', '100% Mobile & Desktop Responsive'],
    metrics: [
      { label: 'Intake Velocity', value: '-85% Lag' },
      { label: 'Booking Volume', value: '+280% Appointments' },
      { label: 'Patient Rating', value: '4.9 Stars' }
    ],
    challenge: 'Patient registration took 7+ minutes on legacy PDF/paper intake systems, resulting in form drop-offs.',
    solution: 'Designed an ultra-responsive, mobile-first patient onboarding web app with auto-save and direct API scheduling.'
  },
  'proj-realestate': {
    url: 'https://apex-estates.bytebuild.dev',
    category: 'Luxury Real Estate',
    tech: ['React 18', 'Framer Motion', 'TypeScript', 'Cloudflare CDN'],
    highlights: ['Interactive 3D Property Previews', 'Instant VIP Inquiry Dispatch', 'High-Resolution Visual Showcase'],
    metrics: [
      { label: 'Qualified Inquiries', value: '+340% Lead Gen' },
      { label: 'Sales Attributed', value: '$18.5M Sales' },
      { label: 'Core Vitals Speed', value: '99/100 Mobile' }
    ],
    challenge: 'High-res image load lag degraded visitor luxury perception. Leads were lost to slow property inquiry response.',
    solution: 'Engineered a cloud-optimized portal utilizing image CDNs, custom pre-fetching, and direct SMS agent integrations.'
  },
  'proj-hospitality': {
    url: 'https://leclat-gourmet.bytebuild.dev',
    category: 'Gourmet Hospitality',
    tech: ['React 18', 'TypeScript', 'Stripe Payments', 'Node.js'],
    highlights: ['Direct 0-Fee Reservation Engine', 'Digital Culinary Menu Preview', 'Automated Guest SMS Confirmations'],
    metrics: [
      { label: 'Stripe Booking Fees', value: '$0 Processing' },
      { label: 'Table Utilization', value: '+45% Capacity' },
      { label: 'Monthly Revenue', value: '+$65k Savings' }
    ],
    challenge: 'Third-party delivery/booking platforms charged 15-30% commissions on reservations and menu checkouts.',
    solution: 'Engineered a direct hospitality ordering engine, utilizing local cookies for guest state, Stripe APIs, and custom SMS alerts.'
  },
  'proj-law': {
    url: 'https://law.bytebuild.dev',
    category: 'Corporate Law Tech',
    tech: ['React 18', 'TypeScript', 'Node.js', 'PostgreSQL'],
    highlights: ['1-Click Secure Doc Processing', 'Automated Retainer Billing Logic', 'Self-Service Intake Matrix'],
    metrics: [
      { label: 'Retainer Volume', value: '+190% Active' },
      { label: 'Admin Onboarding', value: '-70% Cost' },
      { label: 'Client Rating', value: '4.95 Stars' }
    ],
    challenge: 'Managing paper client questionnaires and manually routing retainer contracts created onboarding backlogs.',
    solution: 'Engineered a secure legal client onboarding portal with dynamic logic questionnaires, Stripe integration, and contract generation.'
  },
  'proj-medspa': {
    url: 'https://medspa-app.bytebuild.dev',
    category: 'Wellness & Mobile Web App',
    tech: ['React 18', 'TypeScript', 'Capacitor', 'Framer Motion'],
    highlights: ['Touch-First Mobile Care Scheduling', 'Dynamic Service Visualizer Engine', 'SMS Push Notification Integration'],
    metrics: [
      { label: 'Client Retention', value: '92% Repeat' },
      { label: 'Mobile Bookings', value: '85% Traffic' },
      { label: 'Intake Velocity', value: '<60s Form' }
    ],
    challenge: 'Wellness clients struggled to book recurring spa sessions on mobile screens due to a cramped legacy desktop portal.',
    solution: 'Designed and built a mobile-first web app with oversized custom touch controls, visual calendar scheduling, and automated SMS alerts.'
  },
  'proj-portfolio': {
    url: 'https://studio-horizon.bytebuild.dev',
    category: 'Architecture & Creative Portfolio',
    tech: ['React 18', 'TypeScript', 'Tailwind', 'Cloudflare CDN'],
    highlights: ['Immersive Modular Media Grids', 'Sub-300ms Image Asset Lazy-Loading', 'Integrated Contact & Intake Funnel'],
    metrics: [
      { label: 'Asset Load Time', value: '<250ms Load' },
      { label: 'Visitor Inquiries', value: '+140% Leads' },
      { label: 'Session Duration', value: '+180% Time' }
    ],
    challenge: 'High-res structural engineering and design renders loaded slowly, causing potential high-value clients to leave the site prematurely.',
    solution: 'Designed and built a sleek, media-optimized showcase utilizing next-gen image formats, serverless edge routing, and automated compression pipelines.'
  },
  'proj-portfolio-2': {
    url: 'https://vanguard.bytebuild.dev',
    category: 'Immersive Creative Portfolio',
    tech: ['React 18', 'TypeScript', 'Tailwind', 'Framer Motion'],
    highlights: ['Cinematic Dark-Mode Aesthetics', 'Dynamic Filterable Work Grid', 'Integrated Booking Calendar'],
    metrics: [
      { label: 'Booking Rate', value: '+165% Calls' },
      { label: 'Session Velocity', value: '+120% Engagement' },
      { label: 'Asset Payload', value: '-65% Optim' }
    ],
    challenge: 'A prominent Creative Director was losing high-ticket consulting inquiries because their old portfolio site was static, unoptimized for mobile, and lacked direct scheduling.',
    solution: 'Designed and built a highly interactive dark-mode portfolio web app featuring liquid page transitions, automated media compression, and direct calendar sync.'
  },
  'proj-portfolio-3': {
    url: 'https://aether.bytebuild.dev',
    category: 'Immersive Photography Portfolio',
    tech: ['React 18', 'TypeScript', 'Tailwind', 'Cloudinary API'],
    highlights: ['Zero-Layout Shift Masonry Grid', 'Next-Gen WebP Asset Pipeline', 'Instant Client Inquiry Trigger'],
    metrics: [
      { label: 'Booking Rate', value: '+150% Leads' },
      { label: 'Media Load Velocity', value: '-80% Latency' },
      { label: 'SEO Visibility', value: '+210% Reach' }
    ],
    challenge: 'A commercial photography studio experienced high bounce rates on mobile due to heavy unoptimized JPEG payloads and erratic masonry layout shifts during loading.',
    solution: 'Designed and built a React-based gallery featuring dynamic column resizing, automated Cloudinary compression, and progressive blur hashes for smooth rendering.'
  }
};

export const PortfolioPage: React.FC = () => {
  const { openBooking } = useBooking();
  const isMobile = useIsMobile();
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'web' | 'mobile' | 'portfolio'>('web');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    return portfolioProjects.filter(p => p.projectType === filterType);
  }, [filterType]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
    setActiveProjectIdx(0);
    setExpandedCaseId(null);
  }, [filterType]);

  const handleProjectScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollLeft / (container.clientWidth - 32));
    setActiveProjectIdx(Math.min(Math.max(index, 0), filteredProjects.length - 1));
  };

  return (
    <>
      <Helmet>
        <title>Portfolio | ByteBuilders</title>
        <meta
          name="description"
          content="Explore our latest software and web development projects."
        />
      </Helmet>

      <section className="min-h-[calc(100vh-60px)] flex flex-col justify-center pt-20 pb-24 md:min-h-[calc(100vh-80px)] md:pt-28 md:pb-16 bg-[var(--bg-primary)] relative overflow-hidden text-left">
        {/* Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/5 to-indigo-600/10 blur-3xl pointer-events-none rounded-full" />

        <div className="container mx-auto space-y-6 md:space-y-10 relative z-10 px-4">
          
          <Breadcrumbs />

          {/* 1. Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto space-y-4 md:space-y-6 pt-2 pb-2"
          >
            <div className="hidden md:inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
              <span>SELECTED PORTFOLIO</span>
            </div>

            <h1 className="text-hero text-[var(--text-primary)] leading-[1.1]">
              <TextReveal text="Platforms Engineered to" />{' '}
              <GradientText>Perform.</GradientText>
            </h1>

            <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
              <TextReveal text="Explore our portfolio of custom websites, booking engines, and digital experiences delivered with" />{' '}
              <TextHighlighter highlightColor="from-cyan-500/40 to-blue-500/40">
                <span className="font-bold text-[var(--text-primary)]">measurable results.</span>
              </TextHighlighter>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => openBooking()}
                className="neo-btn neo-btn-accent text-xs md:text-sm py-3.5 px-8 shadow-xl w-full sm:w-auto justify-center font-bold"
              >
                <span>Book Consultation</span>
              </button>
            </div>
          </motion.div>

          {/* 2. Metrics Strip */}
          <div className="neo-card p-5 md:p-10 border border-[var(--border-light)] rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-lg">
            {agencyInfo.stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-2xl md:text-3xl font-extrabold text-[var(--accent-primary)]">{stat.value}</p>
                <p className="text-xs text-[var(--text-tertiary)]">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="py-16 bg-[var(--bg-primary)] text-left relative overflow-hidden">
        <div className="container mx-auto space-y-12 px-4 relative z-10">
          

          
          {/* 3. Portfolio Showcase - Staggered Bento Showcase */}
          <div className="space-y-12 text-left pt-16 md:pt-24">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
              <div className="hidden md:inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
                <span>PROVEN RESULTS</span>
              </div>
              <h2 className="text-section-title text-[var(--text-primary)]">
                <GradientText>Featured Projects</GradientText>
              </h2>
              <div className="text-body-lg text-[var(--text-secondary)]">
                <TextReveal text="Every digital flagship is engineered for sub-second speed, trust, and" />{' '}
                <TextHighlighter highlightColor="from-blue-500/40 to-indigo-500/40">
                  <span className="font-bold text-[var(--text-primary)]">audience growth.</span>
                </TextHighlighter>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-center pb-8 pt-4 w-full">
              <div className="inline-flex rounded-full neo-inset p-1 border border-[var(--border-subtle)] bg-[var(--surface-recessed)]/50 gap-1 w-full max-w-md">
                <button
                  onClick={() => { setFilterType('web'); setActiveProjectIdx(0); }}
                  className={`flex-1 rounded-full px-2.5 py-2 text-[10px] sm:text-xs font-bold transition-all duration-300 whitespace-nowrap text-center ${
                    filterType === 'web'
                      ? 'bg-[var(--surface-card)] text-[var(--accent-primary)] shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[var(--border-light)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="hidden sm:inline">Web Projects (4)</span>
                  <span className="inline sm:hidden">Web (4)</span>
                </button>
                <button
                  onClick={() => { setFilterType('portfolio'); setActiveProjectIdx(0); }}
                  className={`flex-1 rounded-full px-2.5 py-2 text-[10px] sm:text-xs font-bold transition-all duration-300 whitespace-nowrap text-center ${
                    filterType === 'portfolio'
                      ? 'bg-[var(--surface-card)] text-[var(--accent-primary)] shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[var(--border-light)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="hidden sm:inline">Portfolio Websites (3)</span>
                  <span className="inline sm:hidden">Portfolio (3)</span>
                </button>
                <button
                  onClick={() => { setFilterType('mobile'); setActiveProjectIdx(0); }}
                  className={`flex-1 rounded-full px-2.5 py-2 text-[10px] sm:text-xs font-bold transition-all duration-300 whitespace-nowrap text-center ${
                    filterType === 'mobile'
                      ? 'bg-[var(--surface-card)] text-[var(--accent-primary)] shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[var(--border-light)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="hidden sm:inline">Mobile Web Project (1)</span>
                  <span className="inline sm:hidden">Mobile (1)</span>
                </button>
              </div>
            </div>

            {isMobile ? (
              <motion.div
                key={filterType}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between px-4 text-[11px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                  <span>Swipe Projects</span>
                  <span className="text-[var(--accent-primary)] font-bold">{filteredProjects.length} Cases →</span>
                </div>

                <div 
                  ref={scrollContainerRef}
                  onScroll={handleProjectScroll}
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 px-4 pb-6 select-none -webkit-overflow-scrolling-touch"
                >
                  {filteredProjects.map((project) => {
                    const details = projectDetails[project.id];
                    const isCaseExpanded = expandedCaseId === project.id;

                    return (
                      <div
                        key={project.id}
                        className="snap-start shrink-0 w-[88vw] max-w-[340px] neo-card p-6 rounded-[32px] border border-[var(--border-light)] shadow-[0_15px_35px_-12px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.4)] flex flex-col justify-between space-y-6 text-left"
                      >
                        <div className="space-y-5">
                          {/* Mobile-like Phone Mockup or Monitor Mockup based on projectType */}
                          <div className="flex justify-center pb-2 w-full">
                            {project.projectType === 'mobile' ? (
                              <PhoneMockupFrame
                                widthClass="w-[180px]"
                                heightClass="h-[300px]"
                                borderClass="border-[6px]"
                                roundedClass="rounded-[28px]"
                                innerRoundedClass="rounded-[22px]"
                                showButtons={false}
                              >
                                <div className="w-full h-full relative overflow-hidden bg-[#090D1A]">
                                  {/* Simulated Mobile Status Bar (Solid Dark background to hide screenshot tabs) */}
                                  <div className="absolute top-0 inset-x-0 h-5 bg-slate-950 z-20 flex items-center justify-between px-4 text-[7px] font-bold text-white font-sans tracking-tight border-b border-slate-900/30">
                                    <span>9:41</span>
                                    <div className="flex items-center gap-1">
                                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <rect x="3" y="16" width="2" height="4" rx="0.5" />
                                        <rect x="7.5" y="12" width="2" height="8" rx="0.5" />
                                        <rect x="12" y="8" width="2" height="12" rx="0.5" />
                                        <rect x="16.5" y="4" width="2" height="16" rx="0.5" />
                                      </svg>
                                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.444 12.444 0 0 0 8 3 12.44 12.44 0 0 0 .663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049z"/>
                                      </svg>
                                      <div className="w-4 h-2 border border-white/80 rounded-[3px] p-[0.25px] flex items-center relative gap-[0.5px]">
                                        <div className="bg-white h-full w-[80%] rounded-[1px]" />
                                        <div className="w-[1px] h-[35%] bg-white/80 rounded-r-[0.5px] absolute -right-[1.5px] top-[32.5%]" />
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Simulated Address Bar for mobile browser style */}
                                  <div className="absolute bottom-4 inset-x-2.5 bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-xl py-1 px-1.5 flex items-center justify-between z-20 text-[7px] text-slate-300 font-sans shadow-md">
                                    <span className="text-[6px] font-medium text-slate-500 uppercase tracking-wider shrink-0 select-none">aA</span>
                                    <div className="flex items-center justify-center gap-1.5 flex-1 min-w-0 px-1">
                                      <Lock className="w-1.5 h-1.5 text-emerald-400 shrink-0" />
                                      <span className="truncate text-slate-300 text-[6.5px] font-medium leading-none">{details.url.replace('https://', '')}</span>
                                    </div>
                                    <RotateCw className="w-1.5 h-1.5 text-slate-400 shrink-0" />
                                  </div>

                                  <img 
                                    src={project.heroImage} 
                                    alt={project.title}
                                    loading="lazy"
                                    className="w-full h-[112%] object-cover absolute -top-[10%] object-top" 
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                                </div>
                              </PhoneMockupFrame>
                            ) : (
                              <MonitorMockup url={details.url} className="w-full max-w-[260px]">
                                <div className="w-full h-full relative overflow-hidden bg-slate-900 aspect-[16/10]">
                                  <img 
                                    src={project.heroImage} 
                                    alt={project.title}
                                    loading="lazy"
                                    className="w-full h-[112%] object-cover absolute -top-[10%] object-top" 
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                                </div>
                              </MonitorMockup>
                            )}
                          </div>

                          {/* Details Metadata */}
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider bg-blue-500/10 px-2.5 py-0.5 rounded-md inline-block">
                              {details.category}
                            </span>
                            <h3 className="text-lg font-extrabold text-[var(--text-primary)] leading-tight">
                              {project.title.split(' • ')[0]}
                            </h3>
                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
                              {project.summary}
                            </p>
                          </div>

                          {/* Dynamic Case Study Insights Accordion */}
                          <div className="pt-1">
                            <button
                              onClick={() => setExpandedCaseId(isCaseExpanded ? null : project.id)}
                              className={`w-full py-2.5 px-4 rounded-xl border border-[var(--border-soft)] bg-[var(--surface-recessed)] text-xs font-bold text-[var(--text-secondary)] flex items-center justify-between transition-colors hover:text-[var(--accent-primary)]`}
                            >
                              <span>View Case Insights</span>
                              <motion.div
                                animate={{ rotate: isCaseExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </motion.div>
                            </button>

                            <AnimatePresence initial={false}>
                              {isCaseExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                  className="overflow-hidden pt-3.5 space-y-3.5"
                                >
                                  {/* Challenge & Solution */}
                                  <div className="space-y-2">
                                    <div>
                                      <span className="text-[10px] font-mono text-rose-500 uppercase font-extrabold tracking-wider block">Challenge:</span>
                                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">{details.challenge}</p>
                                    </div>
                                    <div>
                                      <span className="text-[10px] font-mono text-emerald-500 uppercase font-extrabold tracking-wider block">Solution:</span>
                                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">{details.solution}</p>
                                    </div>
                                  </div>

                                  {/* Key metrics grid */}
                                  <div className="grid grid-cols-3 gap-2 border-t border-[var(--border-subtle)] pt-3 text-center">
                                    {details.metrics.map((m, mIdx) => (
                                      <div key={mIdx} className="space-y-0.5 bg-[var(--surface-recessed)] p-2 rounded-xl border border-[var(--border-soft)]">
                                        <span className="text-[11px] font-extrabold text-[var(--accent-primary)] block leading-none">{m.value}</span>
                                        <span className="text-[8px] font-mono text-[var(--text-tertiary)] uppercase font-semibold leading-tight block">{m.label}</span>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* CTA button: min-h-[52px], rounded-full, full-width */}
                        <button
                          onClick={() => openBooking({ projectOverview: `Inquiring about ${project.title}` })}
                          className="w-full neo-btn neo-btn-accent text-xs min-h-[52px] rounded-full py-3.5 px-6 font-extrabold justify-center gap-2 shadow-[0_8px_20px_rgba(37,99,235,0.25)]"
                        >
                          <span>Book Case Discovery</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Project Swipe Pagination Dots */}
                <div className="flex justify-center gap-2 pt-2">
                  {filteredProjects.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeProjectIdx === i ? 'w-6 bg-[var(--accent-primary)]' : 'w-1.5 bg-[var(--border-soft)]'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Alternating Feature Cards */
              <motion.div 
                key={filterType}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                {filteredProjects.map((project, idx) => {
                  const details = projectDetails[project.id] || {
                    url: `https://${project.id}.bytebuild.dev`,
                    category: 'Digital Web Solution',
                    tech: ['React 18', 'TypeScript', 'Vite'],
                    highlights: ['Custom Code Architecture', 'Sub-Second Speed', 'Mobile Responsive']
                  };
                  const isEven = idx % 2 === 0;

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="neo-card p-6 md:p-10 border border-[var(--border-light)] rounded-[28px] section-card group relative overflow-hidden shadow-xl"
                    >
                      {/* Soft Background Ambient Glow */}
                      <div className={`absolute top-1/2 ${isEven ? 'right-0' : 'left-0'} -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-3xl pointer-events-none rounded-full`} />

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                        {/* Browser/Phone Mockup Column */}
                        <div className={`lg:col-span-7 ${isEven ? 'order-1' : 'order-1 lg:order-2'} flex justify-center`}>
                          {project.projectType === 'mobile' ? (
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              transition={{ duration: 0.3 }}
                              className="group/phone"
                            >
                              <PhoneMockupFrame>
                                <div className="w-full h-full relative overflow-hidden bg-[#090D1A]">
                                  {/* Simulated Mobile Status Bar (Solid Dark background to hide screenshot tabs) */}
                                  <div className="absolute top-0 inset-x-0 h-6 bg-slate-950 z-20 flex items-center justify-between px-6 text-[10px] font-bold text-white font-sans tracking-tight border-b border-slate-900/30">
                                    <span>9:41</span>
                                    <div className="flex items-center gap-1.5">
                                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <rect x="3" y="16" width="2.5" height="4" rx="0.5" />
                                        <rect x="7.5" y="12" width="2.5" height="8" rx="0.5" />
                                        <rect x="12" y="8" width="2.5" height="12" rx="0.5" />
                                        <rect x="16.5" y="4" width="2.5" height="16" rx="0.5" />
                                      </svg>
                                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.444 12.444 0 0 0 8 3 12.44 12.44 0 0 0 .663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049z"/>
                                      </svg>
                                      <div className="w-5.5 h-3 border border-white/80 rounded-md p-0.5 flex items-center relative gap-[1px]">
                                        <div className="bg-white h-full w-[80%] rounded-[1.5px]" />
                                        <div className="w-[1.5px] h-[35%] bg-white/80 rounded-r-[1px] absolute -right-[2.5px] top-[32.5%]" />
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Mobile Web Address Bar */}
                                  <div className="absolute bottom-5 inset-x-4 bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl py-2 px-3 flex items-center justify-between z-20 text-[10px] text-slate-300 font-sans shadow-lg select-none">
                                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider shrink-0 select-none">aA</span>
                                    <div className="flex items-center justify-center gap-1.5 flex-1 min-w-0 px-2">
                                      <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                                      <span className="truncate text-slate-300 text-[10px] font-medium leading-none">{details.url.replace('https://', '')}</span>
                                    </div>
                                    <RotateCw className="w-2.5 h-2.5 text-slate-400 hover:text-slate-200 cursor-pointer shrink-0 transition-colors" />
                                  </div>

                                  <img 
                                    src={project.heroImage} 
                                    alt={project.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-[112%] object-cover absolute -top-[10%] object-top group-hover/phone:scale-105 transition-transform duration-700" 
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-0 group-hover/phone:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </div>
                              </PhoneMockupFrame>
                            </motion.div>
                          ) : (
                            <motion.div 
                              whileHover={{ scale: 1.01 }}
                              transition={{ duration: 0.3 }}
                              className="w-full group/monitor flex justify-center"
                            >
                              <MonitorMockup url={details.url}>
                                <div className="w-full h-full relative overflow-hidden bg-slate-900 aspect-[16/10]">
                                  <img 
                                    src={project.heroImage} 
                                    alt={project.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-[112%] object-cover absolute -top-[10%] object-top group-hover/monitor:scale-[1.03] transition-transform duration-700" 
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover/monitor:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </div>
                              </MonitorMockup>
                            </motion.div>
                          )}
                        </div>

                        {/* Project Information Column */}
                        <div className={`lg:col-span-5 space-y-6 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                          <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-[11px] font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                              <span>{details.category}</span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent-primary)] transition-colors">
                              {project.title}
                            </h3>

                            <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
                              {project.summary}
                            </p>
                          </div>

                          {/* Core Highlights */}
                          <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
                              Key Deliverables & Architecture:
                            </span>
                            <ul className="space-y-2">
                              {details.highlights.map((feat, fIdx) => (
                                <li key={fIdx} className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
                                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                    <Check className="w-3 h-3" />
                                  </div>
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tech Badges */}
                          <div className="pt-2 flex flex-wrap gap-2">
                            {details.tech.map((t, tIdx) => (
                              <span key={tIdx} className="neo-inset px-2.5 py-1 rounded-lg text-[10px] font-mono text-[var(--text-secondary)] font-medium">
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Action Button */}
                          <div className="pt-3">
                            <button
                              onClick={() => openBooking({ projectOverview: `Inquiring about ${project.title}` })}
                              className="neo-btn neo-btn-accent text-xs py-3 px-6 shadow-md justify-center font-bold gap-2 group/btn"
                            >
                              <span>Book Consultation</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Final CTA Section */}
      <FinalCTASection 
        badgeText="PORTFOLIO INQUIRY"
        title="Want Similar Growth For Your Business?"
        subtitlePrefix="Book a 15-minute consultation to discuss your custom website requirements and "
        highlightText="receive a direct project proposal."
        primaryBtnText="Book Call"
        secondaryBtnText="Explore Services"
        secondaryBtnLink="/services"
      />
    </>
  );
};
