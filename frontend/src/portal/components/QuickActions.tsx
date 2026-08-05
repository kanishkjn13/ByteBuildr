import React from 'react';
import { motion } from 'framer-motion';
import { Upload, MessageSquare, Calendar, Receipt } from 'lucide-react';
import type { PortalView } from '../types';

interface QuickActionsProps {
  onAction: (action: PortalView) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onAction }) => {
  const actions: { view: PortalView; label: string; icon: React.FC<{ className?: string }> }[] = [
    { view: 'files', label: 'Upload Files', icon: Upload },
    { view: 'messages', label: 'Send Message', icon: MessageSquare },
    { view: 'meetings', label: 'Book Meeting', icon: Calendar },
    { view: 'invoices', label: 'View Invoice', icon: Receipt },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <motion.button
            key={act.view}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onAction(act.view)}
            className="neo-card p-4 rounded-2xl border border-[var(--border-light)] flex items-center justify-center gap-3 group transition-all"
          >
            <div className="w-8 h-8 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-[var(--text-primary)]">
              {act.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};
