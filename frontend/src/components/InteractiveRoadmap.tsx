import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  PhoneCall,
  Compass,
  Layers,
  Code2,
  CheckCircle2,
  Rocket,
  TrendingUp,
  ChevronDown,
  Check,
  X
} from 'lucide-react';
import { TextReveal } from './effects/TextReveal';
import { GradientText } from './effects/GradientText';
import { TextHighlighter } from './effects/TextHighlighter';

const milestoneDeliverables: Record<string, string[]> = {
  'm-1': ['Brand & Business Alignment Audit', 'Competitor Architecture Analysis', 'Revenue Blueprint & Goal Mapping'],
  'm-2': ['Technical System Specification', 'UX Navigation Flow Diagrams', 'Fixed Scope Cost & Schedule Blueprint'],
  'm-3': ['Minimalist Interface Prototypes', 'Responsive Layout System Drafts', 'Interactive High-Fidelity Previews'],
  'm-4': ['TypeScript Framework Configuration', 'High-Performance Tailwind Layouts', 'SEO & Speed Optimization Setup'],
  'm-5': ['Multi-Device Cross-Testing Audits', '50+ Checklist Quality Controls', 'Lighthouse 100/100 handover reports'],
  'm-6': ['Production Edge Deployments', 'Custom DNS configuration reviews', 'SSL Cert handoff validation tests'],
  'm-7': ['Continuous Telemetry Logs', 'Speed Audits & Platform Maintenance', 'Future Feature Scaling blueprints']
};

interface MilestoneNode {
  id: string;
  step: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  position: 'left' | 'right' | 'center';
  targetXPercent: number; // Final bent X position
  yPx: number;           // Y position
}

export const InteractiveRoadmap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>(null);
  const [longPressedMilestoneId, setLongPressedMilestoneId] = useState<string | null>(null);
  const touchTimerRef = useRef<any>(null);

  const handleTouchStart = (id: string) => {
    // Start timer for 550ms for Long Press trigger
    touchTimerRef.current = setTimeout(() => {
      if (navigator.vibrate) {
        navigator.vibrate(60);
      }
      setLongPressedMilestoneId(id);
    }, 550);
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
    }
  };

  // Smooth scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 90%']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.001
  });

  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Initial Straight Path (Vertical center line down M 500 60)
  const straightPathD = `
    M 500 60
    C 500 180, 500 180, 500 300
    C 500 400, 500 380, 500 480
    C 500 580, 500 560, 500 660
    C 500 760, 500 740, 500 840
    C 500 940, 500 920, 500 1020
    C 500 1120, 500 1120, 500 1200
  `;

  // Final Bent Path (Curves outwards dynamically as scroll progresses)
  const curvedPathD = `
    M 500 60
    C 500 180, 800 180, 800 300
    C 800 400, 200 380, 200 480
    C 200 580, 800 560, 800 660
    C 800 760, 200 740, 200 840
    C 200 940, 800 920, 800 1020
    C 800 1120, 500 1120, 500 1200
  `;

  // Morph SVG path from straight vertical line into bent curves upon scrolling
  const animatedPathD = useTransform(smoothProgress, [0, 0.9], [straightPathD, curvedPathD]);

  const milestones: MilestoneNode[] = [
    {
      id: 'm-1',
      step: '01',
      title: 'Discovery Call',
      desc: 'We understand your business goals, target audience, and revenue bottlenecks.',
      icon: PhoneCall,
      position: 'left',
      targetXPercent: 20,
      yPx: 120
    },
    {
      id: 'm-2',
      step: '02',
      title: 'Research & Strategy',
      desc: 'We define the technical blueprint, UX funnels, and fixed scope roadmap.',
      icon: Compass,
      position: 'right',
      targetXPercent: 80,
      yPx: 300
    },
    {
      id: 'm-3',
      step: '03',
      title: 'UI/UX Design',
      desc: 'Interactive Figma prototypes created with refined minimalism and tactile UI components.',
      icon: Layers,
      position: 'left',
      targetXPercent: 20,
      yPx: 480
    },
    {
      id: 'm-4',
      step: '04',
      title: 'Development',
      desc: 'Your custom platform is engineered with clean, modular code and ultra-fast performance.',
      icon: Code2,
      position: 'right',
      targetXPercent: 80,
      yPx: 660
    },
    {
      id: 'm-5',
      step: '05',
      title: 'Testing & QA',
      desc: '50+ checklist quality audits covering sub-500ms speed, security, and mobile CRO.',
      icon: CheckCircle2,
      position: 'left',
      targetXPercent: 20,
      yPx: 840
    },
    {
      id: 'm-6',
      step: '06',
      title: 'Global Launch',
      desc: 'Production edge deployment, SSL certification, and 100/100 Lighthouse handover.',
      icon: Rocket,
      position: 'right',
      targetXPercent: 80,
      yPx: 1020
    },
    {
      id: 'm-7',
      step: '07',
      title: 'Support & Growth',
      desc: 'Continuous post-launch telemetry, speed optimization, and ongoing feature scaling.',
      icon: TrendingUp,
      position: 'center',
      targetXPercent: 50,
      yPx: 1200
    }
  ];

  return (
    <section ref={containerRef} id="process" className="py-24 relative bg-[var(--bg-primary)] overflow-hidden text-left">
      
      {/* Background Soft Lighting & Grid */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-500/10 via-cyan-500/5 to-purple-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-[720px] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
            <span>WORKFLOW ROADMAP</span>
          </div>

          <h2 className="text-section-title text-[var(--text-primary)]">
            <GradientText>Our 7-Stage Growth Roadmap</GradientText>
          </h2>

          <div className="text-body-lg text-[var(--text-secondary)] max-w-[65ch] mx-auto">
            <TextReveal text="A transparent, milestone-driven process engineered for" />{' '}
            <TextHighlighter highlightColor="from-blue-500/40 to-cyan-500/40">
              <span className="font-bold text-[var(--text-primary)]">predictable velocity, quality, and results.</span>
            </TextHighlighter>
          </div>
        </div>

        {/* Desktop / Tablet S-Curve Roadmap Container */}
        <div className="relative min-h-[1350px] hidden md:block">
          
          {/* Background SVG Canvas (1000 x 1300 viewBox) */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible"
            viewBox="0 0 1000 1300"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="roadmapGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>

              <filter id="cyanGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Initial Straight Guide Line (Upcoming Path) */}
            <motion.path
              d={animatedPathD}
              fill="none"
              stroke="var(--border-light)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="8 8"
              className="opacity-40"
            />

            {/* Glowing Accent Path (Draws & Bends on Scroll) */}
            <motion.path
              d={animatedPathD}
              fill="none"
              stroke="url(#roadmapGlowGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#cyanGlowFilter)"
              style={{ pathLength }}
            />
          </svg>

          {/* Milestones & Interactive Floating Cards */}
          {milestones.map((m, index) => {
            const IconComponent = m.icon;
            
            // Dynamically calculate node X position: starts at center (50%) and bends out to target position upon scroll
            const threshold = index / (milestones.length - 1);
            const animatedXPercent = useTransform(smoothProgress, [0, threshold], [50, m.targetXPercent]);
            const nodeProgress = useTransform(smoothProgress, (val) => (val >= threshold ? 1 : 0));

            return (
              <motion.div
                key={m.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: useTransform(animatedXPercent, (val) => `${val}%`), top: `${m.yPx}px` }}
              >
                {/* Milestone Node Badge */}
                <div className="relative group cursor-pointer flex items-center justify-center">
                  
                  {/* Pulse Ring when Active */}
                  <motion.div
                    style={{ opacity: nodeProgress }}
                    className="absolute -inset-4 rounded-full bg-[var(--accent-primary)]/20 animate-ping pointer-events-none"
                  />

                  {/* Outer Glowing Circle */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className={`w-14 h-14 rounded-full neo-card border flex items-center justify-center transition-all duration-500 shadow-xl ${
                      m.position === 'center' ? 'w-16 h-16 border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]' : 'border-[var(--border-light)]'
                    }`}
                  >
                    <IconComponent className="w-6 h-6 text-[var(--accent-primary)]" />
                  </motion.div>

                  {/* Step Badge Pill */}
                  <span className="absolute -top-3 neo-pill px-2 py-0.5 text-[9px] font-mono font-bold text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 bg-[var(--bg-primary)]">
                    {m.step}
                  </span>
                </div>

                {/* Floating Neomorphic Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute w-80 neo-card p-6 rounded-[24px] border border-[var(--border-light)] shadow-2xl backdrop-blur-xl bg-[var(--bg-primary)]/90 space-y-2 text-left ${
                    m.position === 'left'
                      ? 'top-1/2 -translate-y-1/2 left-20'
                      : m.position === 'right'
                      ? 'top-1/2 -translate-y-1/2 right-20'
                      : 'top-20 left-1/2 -translate-x-1/2'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                      Phase {m.step}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
                  </div>

                  <h3 className="text-base font-extrabold text-[var(--text-primary)]">
                    {m.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    {m.desc}
                  </p>
                </motion.div>

              </motion.div>
            );
          })}

        </div>

        {/* Mobile Vertical Animated Journey Roadmap (<768px) */}
        <div className="block md:hidden relative space-y-10 pl-7 text-left my-4">
          
          {/* Mobile Vertical Scroll Line Track */}
          <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-[var(--border-soft)] rounded-full" />
          <motion.div
            style={{ scaleY: smoothProgress }}
            className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-cyan-400 rounded-full origin-top"
          />

          {milestones.map((m, index) => {
            const IconComponent = m.icon;
            const isExpanded = expandedMilestoneId === m.id;

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -16, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative space-y-2 select-none"
              >
                {/* Node Icon Badge on Mobile Vertical Line */}
                <div className="absolute -left-[41px] top-1 w-10 h-10 rounded-full neo-card border-2 border-[var(--accent-primary)] flex items-center justify-center bg-[var(--bg-primary)] shadow-md z-10">
                  <IconComponent className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                </div>

                {/* Mobile Milestone Card */}
                <div 
                  onTouchStart={() => handleTouchStart(m.id)}
                  onTouchEnd={handleTouchEnd}
                  onTouchCancel={handleTouchEnd}
                  onClick={() => setExpandedMilestoneId(isExpanded ? null : m.id)}
                  className={`neo-card p-5 rounded-2xl border shadow-lg bg-[var(--surface-card)] space-y-2 transition-all cursor-pointer ${
                    isExpanded ? 'border-[var(--accent-primary)] ring-2 ring-blue-500/10' : 'border-[var(--border-light)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="neo-pill px-2.5 py-0.5 text-[10px] font-mono font-bold text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                      PHASE {m.step}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-[var(--text-tertiary)] font-mono">Hold to Preview</span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                      </motion.div>
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold text-[var(--text-primary)] leading-tight">
                    {m.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
                    {m.desc}
                  </p>

                  {/* Accordion Expand with checklist deliverables */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden pt-3 border-t border-[var(--border-subtle)] space-y-2"
                      >
                        <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider block font-bold">
                          Stage Deliverables:
                        </span>
                        <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] font-medium">
                          {(milestoneDeliverables[m.id] || []).map((del, dIdx) => (
                            <li key={dIdx} className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                <Check className="w-2.5 h-2.5" />
                              </div>
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tactile Bottom Sheet preview on Long Press */}
        <AnimatePresence>
          {longPressedMilestoneId && (() => {
            const milestone = milestones.find(m => m.id === longPressedMilestoneId);
            if (!milestone) return null;
            const Icon = milestone.icon;
            
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-end justify-center select-none"
                onClick={() => setLongPressedMilestoneId(null)}
              >
                {/* Bottom Sheet Container */}
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                  className="w-full max-w-md bg-[var(--surface-card)] border-t border-[var(--border-light)] rounded-t-[32px] p-8 space-y-6 text-left shadow-2xl relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-12 h-1 bg-[var(--border-soft)] rounded-full mx-auto" />

                  <div className="flex items-start justify-between">
                    <div className="space-y-1.5">
                      <span className="neo-pill px-2.5 py-0.5 text-[10px] font-mono font-bold text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                        PHASE {milestone.step} SPECIFICATION
                      </span>
                      <h3 className="text-xl font-extrabold text-[var(--text-primary)]">
                        {milestone.title}
                      </h3>
                    </div>
                    <button 
                      onClick={() => setLongPressedMilestoneId(null)}
                      className="w-8 h-8 rounded-full bg-[var(--surface-recessed)] flex items-center justify-center text-[var(--text-secondary)]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="neo-inset p-4 rounded-xl bg-[var(--surface-recessed)] flex gap-3 items-start border border-[var(--border-soft)]">
                    <div className="w-10 h-10 rounded-xl bg-[var(--surface-card)] border border-[var(--border-soft)] flex items-center justify-center text-[var(--accent-primary)] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
                      {milestone.desc}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider block font-bold">
                      Handover Specs Checklist:
                    </span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {(milestoneDeliverables[milestone.id] || []).map((item, index) => (
                        <div key={index} className="flex items-center gap-3 text-xs text-[var(--text-secondary)] font-medium p-2.5 rounded-xl border border-[var(--border-soft)] bg-[var(--surface-card)] shadow-sm">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setLongPressedMilestoneId(null)}
                    className="w-full neo-btn neo-btn-accent text-xs min-h-[52px] rounded-full justify-center font-extrabold"
                  >
                    Close Phase Preview
                  </button>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

      </div>
    </section>
  );
};
