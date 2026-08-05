import React from 'react';
import { motion } from 'framer-motion';
import { LaptopMockup } from './ui/LaptopMockup';
import { TextReveal } from './effects/TextReveal';
import { GradientText } from './effects/GradientText';
import { TextHighlighter } from './effects/TextHighlighter';
import { ArrowRight } from 'lucide-react';
import { TrustStrip } from './sections/TrustStrip';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigateToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onNavigateToCalculator }) => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center pt-20 pb-0 md:pb-12 lg:pt-28 lg:pb-16 overflow-hidden bg-[var(--bg-primary)] text-left">

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
      <div className="block md:hidden w-full relative z-10 min-h-[calc(100vh-60px)] flex flex-col justify-between pt-16 pb-20">
        {/* Main Content Centered */}
        <div className="flex-1 flex flex-col justify-center items-center px-6">
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
            className="space-y-6 w-full text-center"
          >
            {/* Headline */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 }
              }}
              className="space-y-4"
            >
              <h1 className="text-hero-home text-[var(--text-primary)]">
                We Build
                <br />
                Web Engines That
                <br />
                <GradientText>Get You Qualified Leads.</GradientText>
              </h1>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium max-w-xs mx-auto">
                <TextReveal text="Bespoke digital platforms engineered for" />
                <br />
                <TextHighlighter highlightColor="from-cyan-500/40 to-blue-500/40">
                  <span className="font-bold text-[var(--text-primary)]">sub-second speed, trust, and client acquisition.</span>
                </TextHighlighter>
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 }
              }}
              className="flex flex-col gap-3.5 max-w-xs w-full mx-auto"
            >
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={onOpenBooking}
                className="w-full neo-btn neo-btn-accent text-xs min-h-[50px] rounded-full py-3 px-6 justify-center font-extrabold shadow-[0_8px_20px_rgba(37,99,235,0.3)] gap-2"
              >
                <span>Book Free Call</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={onNavigateToCalculator}
                className="w-full neo-btn text-xs min-h-[50px] rounded-full py-3 px-6 justify-center text-[var(--text-primary)] font-extrabold border border-[var(--border-light)] bg-[var(--surface-recessed)]"
              >
                <span>Explore Capabilities</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Inline Trust Strip Marquee - Placed at the absolute bottom, just above the bottom navbar */}
        <div className="w-full mt-auto">
          <TrustStrip />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. LOCKED DESKTOP HERO EXPERIENCE (>=768px)                                */}
      {/* ========================================================================= */}
      <div className="hidden md:block container mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* Left Side (8-Col Grid) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 flex flex-col gap-5 text-left"
          >

            {/* Pill Badge */}
            <div className="hidden md:inline-flex items-center gap-2 neo-pill px-4 py-1.5 text-[11px] uppercase tracking-widest text-[var(--accent-primary)] font-bold self-start">
              <span>DIGITAL GROWTH AGENCY</span>
            </div>

            {/* Headline with TextReveal & GradientText */}
            <h1 className="text-hero-home text-[var(--text-primary)]">
              <TextReveal text="We Build" className="md:justify-start" />
              <br />
              <TextReveal text="Web Engines That" className="md:justify-start" />
              <br />
              <GradientText>Get You Qualified Leads.</GradientText>
            </h1>

            {/* Subheading */}
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium max-w-md">
              <TextReveal text="Bespoke digital platforms engineered for" className="md:justify-start" />
              <br className="hidden sm:inline" />
              <TextHighlighter highlightColor="from-cyan-500/40 to-blue-500/40">
                <span className="font-bold text-[var(--text-primary)]">sub-second speed, trust, and client acquisition.</span>
              </TextHighlighter>
            </p>

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

          {/* Right Side Device Showcase (4-Col Grid) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 relative"
          >
            <LaptopMockup />
          </motion.div>

        </div>
      </div>

    </section>
  );
};
