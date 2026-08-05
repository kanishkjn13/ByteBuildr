import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Search,
  CheckCircle2,
  MessageSquare,
  DollarSign,
  FolderKanban,
  UserCheck,
  LifeBuoy,
  ShieldAlert,
  Trash2,
  CheckCheck
} from 'lucide-react';
import type { AdminNotification, AdminView } from '../types';
import { mockAdminNotifications } from '../adminData';

interface AdminNotificationsViewProps {
  onNavigate?: (view: AdminView) => void;
}

export const AdminNotificationsView: React.FC<AdminNotificationsViewProps> = ({ onNavigate: _onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'projects' | 'clients' | 'finance' | 'meetings' | 'support'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<AdminNotification[]>(mockAdminNotifications);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      const matchQuery = !searchQuery.trim() ||
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchTab = activeTab === 'all' ||
        (activeTab === 'unread' && !n.read) ||
        (activeTab === 'projects' && n.category === 'project') ||
        (activeTab === 'clients' && (n.category === 'lead' || n.category === 'message')) ||
        (activeTab === 'finance' && n.category === 'payment') ||
        (activeTab === 'meetings' && n.category === 'project') ||
        (activeTab === 'support' && n.category === 'ticket');

      return matchQuery && matchTab;
    });
  }, [notifications, searchQuery, activeTab]);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    triggerToast('All notifications marked as read!');
  };

  const handleMarkOneRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    triggerToast('Notification marked as read.');
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    triggerToast('Notification removed.');
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'lead': return <UserCheck className="w-4 h-4 text-blue-500" />;
      case 'message': return <MessageSquare className="w-4 h-4 text-indigo-500" />;
      case 'payment': return <DollarSign className="w-4 h-4 text-emerald-500" />;
      case 'project': return <FolderKanban className="w-4 h-4 text-purple-500" />;
      case 'ticket': return <LifeBuoy className="w-4 h-4 text-amber-500" />;
      default: return <ShieldAlert className="w-4 h-4 text-rose-500" />;
    }
  };

  return (
    <div className="space-y-8 text-left pb-12">
      
      {/* Toast Notification */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 right-6 z-50 neo-card p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 flex items-center gap-3 text-xs text-emerald-600 font-bold shadow-2xl"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </motion.div>
      )}

      {/* Header & Sub-Nav Bar */}
      <div className="border-b border-[var(--border-subtle)] pb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 neo-pill px-3 py-1 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold mb-1">
              <Bell className="w-3.5 h-3.5" />
              <span>Agency Communication Hub</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              Notifications & Activity Feed
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllRead}
              className="neo-btn text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5 shrink-0"
            >
              <CheckCheck className="w-4 h-4 text-emerald-600" />
              <span>Mark All Read</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs border-t border-[var(--border-subtle)] pt-3">
          {[
            { id: 'all', label: `All (${notifications.length})` },
            { id: 'unread', label: `Unread (${unreadCount})` },
            { id: 'projects', label: 'Project Updates' },
            { id: 'clients', label: 'Client Activity' },
            { id: 'finance', label: 'Finance' },
            { id: 'meetings', label: 'Meetings' },
            { id: 'support', label: 'Support' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-bold transition-all shrink-0 border ${
                activeTab === tab.id
                  ? 'neo-inset text-[var(--accent-primary)] border-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/5'
                  : 'neo-card border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar Strip */}
      <div className="neo-card p-2 rounded-2xl border border-[var(--border-light)] flex items-center px-3 text-xs w-full sm:w-96">
        <Search className="w-4 h-4 text-[var(--text-tertiary)] shrink-0 mr-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notifications, projects, clients..."
          className="bg-transparent w-full focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-xs font-medium"
        />
      </div>

      {/* Notifications Inventory Feed */}
      <div className="space-y-4">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
          Chronological Event Feed ({filteredNotifications.length})
        </span>

        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <motion.div
              key={notif.id}
              whileHover={{ x: 2 }}
              className={`neo-card p-5 rounded-[22px] border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs ${
                !notif.read ? 'border-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/5' : 'border-[var(--border-light)]'
              }`}
            >
              <div className="flex items-start gap-3 text-left">
                <div className="neo-inset p-2.5 rounded-xl shrink-0 mt-0.5">
                  {getCategoryIcon(notif.category)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[var(--text-primary)]">{notif.title}</span>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                    )}
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed max-w-2xl">{notif.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 font-mono text-[10px]">
                <span className="text-[var(--text-tertiary)]">{notif.timestamp}</span>

                {!notif.read && (
                  <button
                    onClick={() => handleMarkOneRead(notif.id)}
                    className="neo-pill px-3 py-1 font-bold text-emerald-600 bg-emerald-500/10 hover:bg-emerald-500/20"
                  >
                    Mark Read
                  </button>
                )}

                <button
                  onClick={() => handleDeleteNotification(notif.id)}
                  className="neo-pill p-1.5 text-rose-500 hover:bg-rose-500/10"
                  title="Remove Notification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};
