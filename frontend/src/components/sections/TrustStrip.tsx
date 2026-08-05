import React from 'react';
import { Code2, Smartphone, TrendingUp, Zap, ShieldCheck, Headphones } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    { icon: Code2, label: 'Custom Web Development' },
    { icon: Smartphone, label: 'Mobile-First Architecture' },
    { icon: TrendingUp, label: 'SEO & CRO Optimized' },
    { icon: Zap, label: 'Sub-Second Performance' },
    { icon: ShieldCheck, label: 'Secure & Scalable' },
    { icon: Headphones, label: 'Ongoing Strategic Support' },
  ];

  // Double items for seamless infinite marquee loop
  const marqueeList = [...trustItems, ...trustItems, ...trustItems];

  return (
    <section className="py-6 border-y border-[var(--border-light)] bg-[var(--bg-primary)] relative z-20 overflow-hidden select-none">
      
      {/* Left Gradient Fade Mask */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 md:w-36 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10" />

      {/* Right Gradient Fade Mask */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 md:w-36 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10" />

      {/* Infinite Marquee Track */}
      <div className="animate-marquee flex items-center gap-4 py-1">
        {marqueeList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-5 py-3 rounded-full neo-card border border-[var(--border-light)] text-xs font-bold text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all shrink-0 cursor-default shadow-sm whitespace-nowrap"
            >
              <Icon className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

    </section>
  );
};
