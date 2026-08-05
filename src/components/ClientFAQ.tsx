import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { faqItems } from '../data/agencyData';

interface ClientFAQProps {
  onOpenBooking: () => void;
}

export const ClientFAQ: React.FC<ClientFAQProps> = ({ onOpenBooking }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 relative bg-[var(--bg-primary)]">
      <div className="container mx-auto space-y-16">
        
        {/* Section Header (Max 720px Centered) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-[720px] mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 neo-pill px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
            <HelpCircle className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Addressing Client Objections</span>
          </div>

          <h2 className="text-section-title text-[var(--text-primary)]">
            Frequently Asked Questions
          </h2>

          <p className="text-section-subtitle">
            Clear, transparent answers regarding business understanding, launch timelines, ROI guarantees, and long-term technical support.
          </p>
        </motion.div>

        {/* Single Open Accordion Container */}
        <div className="max-w-3xl mx-auto space-y-4 text-left">
          {faqItems.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className={`neo-card border transition-all duration-300 rounded-2xl overflow-hidden ${
                  isOpen ? 'border-[var(--accent-primary)] shadow-md' : 'border-[var(--border-light)]'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="badge-tag text-[9px] py-0.5">{faq.category}</span>
                    <span className="font-bold text-sm sm:text-base text-[var(--text-primary)]">
                      {faq.question}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-full neo-pill flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[var(--accent-primary)] text-white' : 'text-[var(--text-tertiary)]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Content Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] mt-1">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="neo-card p-8 max-w-xl mx-auto border border-[var(--border-light)] rounded-2xl text-center space-y-4">
          <h4 className="text-base font-bold text-[var(--text-primary)]">Still Have Specific Objections or Questions?</h4>
          <p className="text-xs text-[var(--text-secondary)]">Discuss your project directly with our Senior Product Architect.</p>
          <button
            onClick={onOpenBooking}
            className="neo-btn neo-btn-accent text-xs py-3 px-6 mx-auto"
          >
            <span>Schedule a Free Strategy Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
