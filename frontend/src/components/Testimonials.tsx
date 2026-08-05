import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Quote } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';
import { GradientText } from './effects/GradientText';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  metric: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Byte Build transformed our clinic booking process. We saw a 3.8x increase in online appointments and saved 80 hours of monthly administrative overhead.",
    author: "Dr. Anya Sharma",
    role: "Director of Aura Health Clinics",
    metric: "+280% Appointments"
  },
  {
    quote: "The interactive luxury portal is a complete game-changer. High-intent buyer inquiries surged, leading directly to $18.5M in closed Q1 sales.",
    author: "Julian Vance",
    role: "VP of Apex Luxury Estates",
    metric: "$18.5M Q1 Sales"
  },
  {
    quote: "Our reservation flow went from high third-party commissions to 0% direct booking fees. Byte Build's work saved us $65,000 in administrative platform drag.",
    author: "Sophie Dubois",
    role: "GM of L'Éclat Dining & Hospitality",
    metric: "$65k Saved / Yr"
  }
];

export const Testimonials: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeIdx, setActiveIdx] = React.useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollLeft / (container.clientWidth - 40));
    setActiveIdx(Math.min(Math.max(index, 0), testimonials.length - 1));
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 relative bg-[var(--bg-primary)] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="container mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-[720px] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Client Success</span>
          </div>

          <h2 className="text-section-title text-[var(--text-primary)]">
            <GradientText>What Our Partners Say</GradientText>
          </h2>

          <p className="text-body-lg text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto">
            Read stories of how our custom digital platforms accelerate growth and establish market authority.
          </p>
        </div>

        {/* NATIVE MOBILE APP HORIZONTAL SWIPE (<768px) */}
        {isMobile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-6 text-[11px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              <span>Swipe Reviews</span>
              <span className="text-[var(--accent-primary)] font-bold">3 Partners →</span>
            </div>

            <div 
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 px-6 pb-6 select-none -webkit-overflow-scrolling-touch"
            >
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="snap-start shrink-0 w-[88vw] max-w-[340px] neo-card p-8 rounded-[32px] border border-[var(--border-light)] shadow-[0_15px_35px_-12px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.4)] flex flex-col justify-between space-y-6 text-left"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[var(--surface-recessed)] flex items-center justify-center text-[var(--accent-primary)]">
                        <Quote className="w-5 h-5 opacity-40" />
                      </div>
                      <span className="neo-pill px-3 py-1 text-[9px] font-mono text-emerald-500 font-bold border border-emerald-500/20 bg-emerald-500/5">
                        {t.metric}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="border-t border-[var(--border-subtle)] pt-4">
                    <p className="text-sm font-extrabold text-[var(--text-primary)] leading-tight">
                      {t.author}
                    </p>
                    <p className="text-[10px] text-[var(--text-tertiary)] font-semibold mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination dots for touch devices */}
            <div className="flex justify-center gap-2 pt-2">
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIdx === i ? 'w-6 bg-[var(--accent-primary)]' : 'w-1.5 bg-[var(--border-soft)]'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* LOCKED DESKTOP TESTIMONIALS GRID (>=768px) */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 text-left">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="neo-card p-8 rounded-[28px] border border-[var(--border-light)] flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[var(--surface-recessed)] flex items-center justify-center text-[var(--accent-primary)]">
                      <Quote className="w-5 h-5 opacity-40 group-hover:opacity-80 transition-opacity" />
                    </div>
                    <span className="badge-tag">
                      {t.metric}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="border-t border-[var(--border-soft)] pt-4">
                  <p className="font-bold text-sm text-[var(--text-primary)]">
                    {t.author}
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    {t.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
