import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCircle2, MessageSquare, Receipt, Calendar } from 'lucide-react';
import type { NotificationItem } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead
}) => {
  const [filter, setFilter] = useState<'all' | 'update' | 'message' | 'invoice' | 'meeting'>('all');

  if (!isOpen) return null;

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.category === filter);

  const getCategoryIcon = (cat: NotificationItem['category']) => {
    switch (cat) {
      case 'update': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'message': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'invoice': return <Receipt className="w-4 h-4 text-amber-500" />;
      case 'meeting': return <Calendar className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end" onClick={onClose}>
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="w-full max-w-md bg-[var(--bg-primary)] h-full shadow-2xl border-l border-[var(--border-light)] p-6 flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[var(--accent-primary)]" />
                <h3 className="text-base font-extrabold text-[var(--text-primary)]">Notifications</h3>
              </div>
              
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full neo-inset flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-[11px] font-mono">
              {[
                { id: 'all', label: 'All' },
                { id: 'update', label: 'Updates' },
                { id: 'message', label: 'Messages' },
                { id: 'invoice', label: 'Invoices' },
                { id: 'meeting', label: 'Meetings' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`neo-pill px-3 py-1 font-bold whitespace-nowrap transition-all ${
                    filter === tab.id
                      ? 'bg-[var(--accent-primary)] text-white shadow-md'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Notification Items List */}
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pt-2">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`neo-card p-4 rounded-xl border border-[var(--border-light)] text-left flex items-start gap-3.5 ${
                      !n.read ? 'bg-blue-500/5 border-l-4 border-l-[var(--accent-primary)]' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg neo-inset flex items-center justify-center shrink-0 mt-0.5">
                      {getCategoryIcon(n.category)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[var(--text-primary)]">{n.title}</span>
                        <span className="text-[9px] font-mono text-[var(--text-tertiary)]">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{n.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 space-y-2 text-[var(--text-tertiary)]">
                  <Bell className="w-8 h-8 mx-auto opacity-40" />
                  <p className="text-xs font-mono">No notifications found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-4 border-t border-[var(--border-subtle)]">
            <button
              onClick={onMarkAllAsRead}
              className="w-full neo-btn text-xs py-2.5 justify-center font-bold"
            >
              Mark All as Read
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
