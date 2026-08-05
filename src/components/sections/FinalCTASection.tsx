import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { useBooking } from '../../hooks/useBooking';
import { ROUTES } from '../../constants/routes';
import { GradientText } from '../effects/GradientText';
import { TextHighlighter } from '../effects/TextHighlighter';
import { useIsMobile } from '../../hooks/useIsMobile';

interface FinalCTASectionProps {
  badgeText?: string;
  title?: string;
  subtitlePrefix?: string;
  highlightText?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  badgeText = "GET STARTED",
  title = "Ready to Scale Your Business?",
  subtitlePrefix = "Book a 15-minute consultation with our team to map out your ",
  highlightText = "custom digital strategy & revenue pipeline.",
  primaryBtnText = "Book Call",
  secondaryBtnText = "View Work",
  secondaryBtnLink = ROUTES.PORTFOLIO
}) => {
  const { openBooking } = useBooking();
  const isMobile = useIsMobile();

  return (
    <section className="py-16 relative bg-[var(--bg-primary)] text-left">
      <div className="container mx-auto">
        
        {isMobile ? (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="neo-card p-8 border border-[var(--border-light)] text-center relative overflow-hidden shadow-[0_15px_35px_-12px_rgba(0,0,0,0.06)] rounded-[32px]"
          >
            {/* Background Soft Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

            <div className="relative z-10 space-y-5">
              <div className="inline-flex items-center gap-2 neo-pill px-4 py-1.5 text-[10px] uppercase tracking-widest text-[var(--accent-primary)] font-bold">
                <span>{badgeText}</span>
              </div>

              <h2 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.25]">
                <GradientText>{title}</GradientText>
              </h2>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
                {subtitlePrefix}{' '}
                {highlightText && (
                  <span className="font-extrabold text-[var(--text-primary)]">{highlightText}</span>
                )}
              </p>

              {/* Mobile CTA Buttons: Stacked, Rounded-Full, 52px */}
              <div className="flex flex-col gap-3 pt-2">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => openBooking()}
                  className="w-full neo-btn neo-btn-accent text-xs min-h-[52px] rounded-full justify-center font-extrabold shadow-[0_8px_20px_rgba(37,99,235,0.25)]"
                >
                  <span>{primaryBtnText}</span>
                </motion.button>

                <Link
                  to={secondaryBtnLink}
                  className="w-full neo-btn text-xs min-h-[52px] rounded-full justify-center font-extrabold border border-[var(--border-light)] bg-[var(--surface-recessed)] text-[var(--text-primary)]"
                >
                  <span>{secondaryBtnText}</span>
                </Link>
              </div>

              {/* Trust Chips Grid (2x2) */}
              <div className="grid grid-cols-2 gap-3.5 pt-6 border-t border-[var(--border-subtle)] text-[10px] text-[var(--text-secondary)] font-medium">
                <div className="neo-inset p-3 rounded-2xl flex items-center gap-2 justify-center bg-[var(--surface-recessed)]">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
                  <span>Rapid Response</span>
                </div>

                <div className="neo-inset p-3 rounded-2xl flex items-center gap-2 justify-center bg-[var(--surface-recessed)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Guaranteed Quality</span>
                </div>

                <div className="neo-inset p-3 rounded-2xl flex items-center gap-2 justify-center bg-[var(--surface-recessed)]">
                  <Mail className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
                  <span>Direct Access</span>
                </div>

                <div className="neo-inset p-3 rounded-2xl flex items-center gap-2 justify-center bg-[var(--surface-recessed)]">
                  <Phone className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
                  <span>1-on-1 Support</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="neo-card p-8 md:p-14 border border-[var(--border-light)] text-center relative overflow-hidden section-card shadow-xl rounded-[28px]"
          >
            {/* Background Soft Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
                <span>{badgeText}</span>
              </div>

              <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
                <GradientText>{title}</GradientText>
              </h2>

              <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
                {subtitlePrefix}{' '}
                {highlightText && (
                  <TextHighlighter highlightColor="from-blue-500/40 to-indigo-500/40">
                    <span className="font-bold text-[var(--text-primary)]">{highlightText}</span>
                  </TextHighlighter>
                )}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openBooking()}
                  className="neo-btn neo-btn-accent text-xs md:text-sm py-3.5 px-8 shadow-xl w-full sm:w-auto justify-center font-bold"
                >
                  <span>{primaryBtnText}</span>
                </motion.button>

                <Link
                  to={secondaryBtnLink}
                  className="neo-btn text-xs md:text-sm py-3.5 px-7 text-[var(--text-primary)] w-full sm:w-auto justify-center"
                >
                  <span>{secondaryBtnText}</span>
                </Link>
              </div>

              {/* Trust Chips */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                <div className="neo-inset p-3 rounded-xl flex items-center gap-2 justify-center">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
                  <span className="font-medium text-[11px]">Rapid Response</span>
                </div>

                <div className="neo-inset p-3 rounded-xl flex items-center gap-2 justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="font-medium text-[11px]">Guaranteed Quality</span>
                </div>

                <div className="neo-inset p-3 rounded-xl flex items-center gap-2 justify-center">
                  <Mail className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
                  <span className="font-medium text-[11px]">Direct Access</span>
                </div>

                <div className="neo-inset p-3 rounded-xl flex items-center gap-2 justify-center">
                  <Phone className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
                  <span className="font-medium text-[11px]">1-on-1 Support</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};
