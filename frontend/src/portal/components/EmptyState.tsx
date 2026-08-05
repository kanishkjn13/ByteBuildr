import React from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon: React.FC<{ className?: string }>;
  headline: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  headline,
  description,
  actionLabel,
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="neo-card p-12 rounded-[24px] border border-[var(--border-light)] text-center max-w-md mx-auto my-12 space-y-5"
    >
      <div className="w-16 h-16 rounded-2xl neo-inset flex items-center justify-center text-[var(--accent-primary)] mx-auto">
        <Icon className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-black text-[var(--text-primary)]">{headline}</h3>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{description}</p>
      </div>

      <button
        onClick={onAction}
        className="neo-btn neo-btn-accent text-xs py-3 px-6 shadow-lg justify-center font-bold inline-flex items-center gap-2"
      >
        <span>{actionLabel}</span>
      </button>
    </motion.div>
  );
};
