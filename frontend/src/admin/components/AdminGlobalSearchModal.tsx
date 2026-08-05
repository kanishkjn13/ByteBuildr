import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import type { AdminView } from '../types';
import { mockAdminSearchItems } from '../adminData';

interface AdminGlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: AdminView) => void;
}

export const AdminGlobalSearchModal: React.FC<AdminGlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return mockAdminSearchItems;
    const q = query.toLowerCase().trim();
    return mockAdminSearchItems.filter(
      item => item.title.toLowerCase().includes(q) ||
              item.subtitle.toLowerCase().includes(q) ||
              item.type.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSelectItem = (view: AdminView) => {
    onNavigate(view);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 p-4" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          onClick={(e) => e.stopPropagation()}
          className="neo-card border border-[var(--border-light)] rounded-[24px] max-w-xl w-full p-6 bg-[var(--bg-primary)] shadow-2xl space-y-4 text-left relative"
        >
          {/* Header Input */}
          <div className="neo-inset p-3 rounded-2xl flex items-center gap-3 text-xs border border-[var(--border-subtle)]">
            <Search className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search leads, clients, projects, invoices, media, team..."
              className="bg-transparent w-full focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] font-medium text-xs"
            />
            <button onClick={onClose} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Instant Search Results */}
          <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold px-2 block">
              Search Results ({filtered.length})
            </span>

            {filtered.length > 0 ? (
              filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item.view)}
                  className="w-full neo-card p-3 rounded-xl border border-[var(--border-light)] flex items-center justify-between hover:border-[var(--accent-primary)] transition-all group text-left"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="neo-pill px-2 py-0.5 text-[9px] font-mono uppercase font-bold text-[var(--accent-primary)] bg-[var(--accent-primary)]/10">
                        {item.type}
                      </span>
                      <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-[var(--text-tertiary)]">{item.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-mono text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)]">
                    <span>Jump</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[var(--text-tertiary)] font-mono">
                No agency records match "{query}"
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-tertiary)] px-2">
            <span>Press <kbd className="neo-pill px-1.5 py-0.5">ESC</kbd> to close</span>
            <span className="flex items-center gap-1">Select <CornerDownLeft className="w-3 h-3" /></span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
