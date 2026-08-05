import React from 'react';
import { 
  Zap, 
  Lock, 
  Target, 
  Globe, 
  TrendingUp, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  Layers, 
  Activity,
  Cpu,
  Code2,
  FileCode,
  Palette,
  Database
} from 'lucide-react';
import { techStackList } from '../../data/agencyData';
import { GradientText } from '../effects/GradientText';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Lock,
  Target,
  Globe,
  TrendingUp,
  Clock,
  CreditCard,
  ShieldCheck,
  Layers,
  Activity,
  Cpu,
  Code2,
  FileCode,
  Palette,
  Database
};

interface TechStackMarqueeProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  showHeaders?: boolean;
}

export const TechStackMarquee: React.FC<TechStackMarqueeProps> = ({
  title = "Enterprise Technology Architecture",
  subtitle = "Engineered with modern, battle-tested standards to ensure sub-second rendering, security, and scalability.",
  badgeText = "ENTERPRISE STACK",
  showHeaders = true
}) => {
  // Split into 2 rows for dual opposite scrolling tracks
  const row1 = techStackList.slice(0, 5);
  const row2 = techStackList.slice(5, 10);

  // Triple each array for flawless seamless loop
  const marqueeRow1 = [...row1, ...row1, ...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section className="py-16 relative bg-[var(--bg-primary)] overflow-hidden select-none">
      
      {showHeaders && (
        <div className="container mx-auto text-center max-w-3xl mb-12 space-y-3 px-4">
          <div className="inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
            <Cpu className="w-4 h-4" />
            <span>{badgeText}</span>
          </div>

          <h2 className="text-section-title text-[var(--text-primary)]">
            <GradientText>{title}</GradientText>
          </h2>

          <p className="text-xs text-[var(--text-secondary)] max-w-[65ch] mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
      )}

      {/* Marquee Wrapper with Gradient Side Masks */}
      <div className="relative space-y-5">
        
        {/* Left Ambient Fade Mask */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 md:w-48 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent z-20" />

        {/* Right Ambient Fade Mask */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-28 md:w-48 bg-gradient-to-l from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent z-20" />

        {/* Track 1: Scroll Left */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex items-center gap-4 py-1.5 shrink-0 hover:[animation-play-state:paused]">
            {marqueeRow1.map((item, idx) => {
              const Icon = iconMap[item.iconName] || Cpu;
              return (
                <div
                  key={idx}
                  className="neo-card px-5 py-3 rounded-2xl border border-[var(--border-light)] flex items-center gap-3.5 shrink-0 shadow-sm hover:border-[var(--accent-primary)] hover:scale-105 transition-all cursor-default group"
                >
                  <div className="w-9 h-9 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors whitespace-nowrap">
                        {item.name}
                      </span>
                      <span className="text-[9px] font-mono text-[var(--accent-primary)] font-bold bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 whitespace-nowrap">
                        {item.badge}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Track 2: Scroll Right */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-reverse flex items-center gap-4 py-1.5 shrink-0 hover:[animation-play-state:paused]">
            {marqueeRow2.map((item, idx) => {
              const Icon = iconMap[item.iconName] || Cpu;
              return (
                <div
                  key={idx}
                  className="neo-card px-5 py-3 rounded-2xl border border-[var(--border-light)] flex items-center gap-3.5 shrink-0 shadow-sm hover:border-[var(--accent-primary)] hover:scale-105 transition-all cursor-default group"
                >
                  <div className="w-9 h-9 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors whitespace-nowrap">
                        {item.name}
                      </span>
                      <span className="text-[9px] font-mono text-[var(--accent-primary)] font-bold bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 whitespace-nowrap">
                        {item.badge}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
