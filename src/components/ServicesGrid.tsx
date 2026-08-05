import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Layers, Zap, ShieldCheck, CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react';
import { TextReveal } from './effects/TextReveal';
import { GradientText } from './effects/GradientText';
import { TextHighlighter } from './effects/TextHighlighter';

interface ServicesGridProps {
  onOpenBookingWithService?: (serviceTitle: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onOpenBookingWithService }) => {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const premiumServices = [
    {
      id: 'service-custom-web-apps',
      title: 'Custom Business Websites',
      icon: Code2,
      shortDesc: 'Bespoke web applications engineered for speed, clean UX, and high conversion.',
      badge: 'Core Service',
      features: ['Sub-500ms Page Speed', 'Responsive Layouts', 'Clean Architecture']
    },
    {
      id: 'service-uiux-design',
      title: 'UI / UX Design Systems',
      icon: Layers,
      shortDesc: 'Bespoke design systems featuring refined minimalist elegance and tactile visual elevation.',
      badge: 'Design Signature',
      features: ['Figma System Tokens', 'WCAG Accessibility', 'Micro-Interactions']
    },
    {
      id: 'service-redesign-optimization',
      title: 'Website Redesigns',
      icon: Zap,
      shortDesc: 'Transforming slow outdated websites into fast modern revenue engines.',
      badge: 'Speed Upgrade',
      features: ['100/100 Lighthouse Target', 'Code Refactoring', 'Mobile Optimization']
    },
    {
      id: 'service-maintenance-support',
      title: 'Maintenance & Support',
      icon: ShieldCheck,
      shortDesc: 'Proactive security updates, cloud backups, and performance monitoring.',
      badge: 'Peace of Mind',
      features: ['24/7 Telemetry', 'Cloud Backups', 'Dedicated SLA']
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 relative bg-[var(--bg-primary)]">
      <div className="container mx-auto space-y-12 md:space-y-16">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-[720px] mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
            <span>Our Capabilities</span>
          </div>

          <h2 className="text-section-title text-[var(--text-primary)]">
            <GradientText>Core Web Solutions</GradientText>
          </h2>

          <div className="text-body-lg text-[var(--text-secondary)] max-w-[65ch] mx-auto">
            <TextReveal text="High-impact web solutions engineered for" />{' '}
            <TextHighlighter highlightColor="from-indigo-500/40 to-blue-500/40">
              <span className="font-bold text-[var(--text-primary)]">speed, trust, and client acquisition.</span>
            </TextHighlighter>
          </div>
        </motion.div>

        {/* NATIVE MOBILE APP STACKED PREMIUM CARDS (<768px) */}
        {/* NATIVE MOBILE APP STACKED PREMIUM CARDS (<768px) */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12
              }
            }
          }}
          className="block md:hidden space-y-6 px-4"
        >
          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
            <span>Core capabilities</span>
            <span className="text-[var(--accent-primary)] font-bold">4 Active Specs</span>
          </div>

          <div className="flex flex-col gap-6">
            {premiumServices.map((service) => {
              const Icon = service.icon;
              const isExpanded = expandedServiceId === service.id;

              return (
                <motion.div
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 24, scale: 0.98 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 180 } }
                  }}
                  onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                  className={`neo-card p-8 rounded-[32px] border transition-all duration-300 flex flex-col justify-between space-y-6 text-left relative overflow-hidden cursor-pointer ${
                    isExpanded ? 'border-[var(--accent-primary)] ring-2 ring-blue-500/10' : 'border-[var(--border-light)]'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon & Pill Badge & Chevron indicator */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl neo-card bg-[var(--surface-recessed)] flex items-center justify-center text-[var(--accent-primary)] shadow-sm">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="neo-pill px-3 py-1 text-[10px] font-mono uppercase text-[var(--accent-primary)] font-bold border border-[var(--accent-primary)]/15 bg-[var(--surface-recessed)]">
                          {service.badge}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase font-semibold">Specs</span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 text-[var(--text-secondary)]" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Typography: Title & Paragraph (max 2 lines) */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-extrabold text-[var(--text-primary)] leading-tight tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Features Checklist inside Accordion */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden pt-3 border-t border-[var(--border-subtle)] space-y-2"
                        >
                          {service.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)] font-medium">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* CTA Button: min-h-[52px], rounded-full, full-width */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBookingWithService?.(service.title);
                    }}
                    className="w-full neo-btn neo-btn-accent text-xs min-h-[52px] rounded-full py-3.5 px-6 font-extrabold justify-center gap-2 shadow-[0_8px_20px_rgba(37,99,235,0.25)]"
                  >
                    <span>Request Callback</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* LOCKED DESKTOP SERVICES GRID (>=768px) */}
        <div className="hidden md:grid grid-cols-2 gap-8 text-left max-w-5xl mx-auto">
          {premiumServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="neo-card p-8 flex flex-col justify-between section-card border border-[var(--border-light)] group"
              >
                <div className="space-y-6">
                  {/* Top Row: Icon & Pill Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl neo-card flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="neo-pill px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[var(--text-tertiary)]">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & 1-Sentence Description */}
                  <div className="space-y-2">
                    <h3 className="text-card-heading text-[var(--text-primary)]">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Max 3 Bullet Features */}
                  <div className="pt-2 border-t border-[var(--border-soft)] space-y-2">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Button */}
                <div className="pt-6">
                  <button
                    onClick={() => onOpenBookingWithService?.(service.title)}
                    className="w-full neo-btn py-2.5 px-4 text-xs font-bold justify-center hover:text-[var(--accent-primary)] transition-colors"
                  >
                    <span>Book Call</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
