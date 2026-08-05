import React from 'react';
import { motion } from 'framer-motion';
import { LaptopMockup } from './ui/LaptopMockup';
import { TextReveal } from './effects/TextReveal';
import { GradientText } from './effects/GradientText';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigateToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onNavigateToCalculator }) => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center pt-20 pb-12 lg:pt-28 lg:pb-16 overflow-hidden bg-[var(--bg-primary)] text-left">
      
      {/* Dynamic Animated Ambient Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/10 to-cyan-500/20 blur-3xl pointer-events-none rounded-full" 
      />

      {/* ========================================================================= */}
      {/* 1. NATIVE MOBILE APP HERO EXPERIENCE (<768px)                              */}
      {/* ========================================================================= */}
      <div className="block md:hidden container mx-auto relative z-10 w-full px-4 space-y-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05
              }
            }
          }}
          className="neo-card p-8 rounded-[32px] border border-[var(--border-light)] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden space-y-6 text-left"
        >
          {/* Subtle Mobile App Header Pill */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 }
            }}
            className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4"
          >
            <div className="inline-flex items-center gap-1.5 neo-pill px-3.5 py-1.5 text-[10px] uppercase tracking-widest text-[var(--accent-primary)] font-extrabold font-mono">
              <Sparkles className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
              <span>BYTE BUILD STUDIO</span>
            </div>
            <span className="neo-pill px-2.5 py-0.5 text-[9px] font-mono text-emerald-500 font-bold border border-emerald-500/20">
              ● Online SLA &lt; 4h
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 }
            }}
            className="space-y-3"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] leading-[1.15] tracking-tight">
              We Build Web Engines That <GradientText>Get You Qualified Leads.</GradientText>
            </h1>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
              Bespoke digital platforms engineered for sub-second speed, trust, and client acquisition.
            </p>
          </motion.div>

          {/* Native Touch Action Buttons */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 }
            }}
            className="space-y-3 pt-2"
          >
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onOpenBooking}
              className="w-full neo-btn neo-btn-accent text-xs min-h-[52px] rounded-full py-3.5 px-6 justify-center font-extrabold shadow-[0_10px_25px_rgba(37,99,235,0.35)] gap-2"
            >
              <span>Book Free Call</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onNavigateToCalculator}
              className="w-full neo-btn text-xs min-h-[52px] rounded-full py-3.5 px-6 justify-center text-[var(--text-primary)] font-extrabold border border-[var(--border-light)] bg-[var(--surface-recessed)]"
            >
              <span>Explore Capabilities</span>
            </motion.button>
          </motion.div>

          {/* Mobile Telemetry Stat Row */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 }
            }}
            className="pt-4 border-t border-[var(--border-subtle)] grid grid-cols-3 gap-2.5 text-center font-mono"
          >
            <div className="neo-inset p-3 rounded-2xl bg-[var(--surface-recessed)]">
              <span className="text-[11px] text-[var(--accent-primary)] font-black block">&lt;500ms</span>
              <span className="text-[9px] text-[var(--text-tertiary)] block mt-0.5">Speed</span>
            </div>
            <div className="neo-inset p-3 rounded-2xl bg-[var(--surface-recessed)]">
              <span className="text-[11px] text-emerald-500 font-black block">100/100</span>
              <span className="text-[9px] text-[var(--text-tertiary)] block mt-0.5">Lighthouse</span>
            </div>
            <div className="neo-inset p-3 rounded-2xl bg-[var(--surface-recessed)]">
              <span className="text-[11px] text-[var(--text-primary)] font-black block">14 Days</span>
              <span className="text-[9px] text-[var(--text-tertiary)] block mt-0.5">Delivery</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 2. LOCKED DESKTOP HERO EXPERIENCE (>=768px)                                */}
      {/* ========================================================================= */}
      <div className="hidden md:block container mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Side (5-Col Grid) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-5 text-left"
          >

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 neo-pill px-4 py-1.5 text-[11px] uppercase tracking-widest text-[var(--accent-primary)] font-bold self-start">
              <span>DIGITAL GROWTH AGENCY</span>
            </div>

            {/* Headline with TextReveal & GradientText */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] leading-[1.15]">
              <TextReveal text="We Build Web Engines That" />{' '}
              <GradientText>Get You Qualified Leads.</GradientText>
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenBooking}
                className="neo-btn neo-btn-accent text-sm py-3.5 px-8 justify-center shadow-[0_10px_30px_-5px_rgba(37,99,235,0.4)]"
              >
                <span>Book Call</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNavigateToCalculator}
                className="neo-btn text-sm py-3.5 px-6 justify-center text-[var(--text-primary)]"
              >
                <span>View Services</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Side Device Showcase (7-Col Grid) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
          >
            <LaptopMockup />
          </motion.div>

        </div>
      </div>

    </section>
  );
};
