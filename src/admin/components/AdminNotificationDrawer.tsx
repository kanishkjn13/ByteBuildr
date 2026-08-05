import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Users, DollarSign, MessageSquare, FolderKanban, LifeBuoy, ShieldAlert } from 'lucide-react';
import type { AdminNotification } from '../types';

interface AdminNotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AdminNotification[];
  onMarkAllRead: () => void;
}

export const AdminNotificationDrawer: React.FC<AdminNotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead
}) => {
  if (!isOpen) return null;

  const getCategoryIcon = (category: AdminNotification['category']) => {
    switch (category) {
      case 'lead': return <Users className="w-4 h-4 text-blue-500" />;
      case 'payment': return <DollarSign className="w-4 h-4 text-emerald-500" />;
      case 'message': return <MessageSquare className="w-4 h-4 text-indigo-500" />;
      case 'project': return <FolderKanban className="w-4 h-4 text-purple-500" />;
      case 'ticket': return <LifeBuoy className="w-4 h-4 text-amber-500" />;
      default: return <ShieldAlert className="w-4 h-4 text-rose-500" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end" onClick={onClose}>
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-[var(--bg-primary)] border-l border-[var(--border-light)] h-full p-6 space-y-6 flex flex-col justify-between shadow-2xl text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <Bell className="w-5 h-5 text-[var(--accent-primary)]" />
              <h2 className="text-base font-black text-[var(--text-primary)]">Admin Activity Notifications</h2>
            </div>
            <button onClick={onClose} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">
                Real-Time Alerts ({notifications.filter(n => !n.read).length} Unread)
              </span>
              <button
                onClick={onMarkAllRead}
                className="text-[11px] font-mono text-[var(--accent-primary)] hover:underline font-bold inline-flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            </div>

            {notifications.map((n) => (
              <div
                key={n.id}
                className={`neo-card p-4 rounded-2xl border transition-all space-y-1.5 ${
                  n.read
                    ? 'border-[var(--border-light)] opacity-75'
                    : 'border-[var(--accent-primary)]/40 neo-inset bg-[var(--accent-primary)]/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(n.category)}
                    <span className="text-xs font-extrabold text-[var(--text-primary)]">{n.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{n.timestamp}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-6">{n.description}</p>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-tertiary)] text-center">
            Byte Build Enterprise Admin Notification Feed
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
