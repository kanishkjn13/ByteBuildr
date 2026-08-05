import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Bell,
  ChevronDown,
  User,
  Shield,
  Settings,
  LogOut,
  Building2,
  Users,
  FolderKanban,
  DollarSign,
  ImageIcon,
  FileText,
  Menu
} from 'lucide-react';
import type { AdminView } from '../types';

interface AdminTopNavProps {
  onOpenSearch: () => void;
  onToggleNotifications: () => void;
  unreadCount: number;
  onNavigate: (view: AdminView) => void;
  onLogout: () => void;
  onQuickAction: (action: string) => void;
  onToggleMobileMenu?: () => void;
}

export const AdminTopNav: React.FC<AdminTopNavProps> = ({
  onOpenSearch,
  onToggleNotifications,
  unreadCount,
  onNavigate,
  onLogout,
  onQuickAction,
  onToggleMobileMenu
}) => {
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const quickCreateItems = [
    { label: 'Add Lead', action: 'add-lead', icon: Users },
    { label: 'Create Project', action: 'create-project', icon: FolderKanban },
    { label: 'Create Invoice', action: 'create-invoice', icon: DollarSign },
    { label: 'Upload Media', action: 'upload-media', icon: ImageIcon },
    { label: 'Create Blog', action: 'create-blog', icon: FileText },
    { label: 'Assign Team', action: 'assign-team', icon: User }
  ];

  return (
    <header className="sticky top-0 z-20 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-subtle)] h-16 px-4 md:px-8 flex items-center justify-between gap-3">
      
      {/* Left: Mobile Menu Toggle & Global Search Input */}
      <div className="flex items-center gap-2.5 flex-1 max-w-md">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="p-2 rounded-xl neo-card border border-[var(--border-light)] text-[var(--text-primary)] md:hidden flex items-center justify-center shrink-0"
            aria-label="Toggle Admin Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={onOpenSearch}
          className="w-full neo-card p-2.5 rounded-2xl border border-[var(--border-light)] flex items-center justify-between text-xs text-[var(--text-tertiary)] hover:border-[var(--accent-primary)] transition-all group"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Search className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors shrink-0" />
            <span className="font-medium text-[var(--text-secondary)] truncate text-xs">Search leads, projects, invoices...</span>
          </div>
          <kbd className="neo-pill px-2 py-0.5 text-[10px] font-mono font-bold text-[var(--text-tertiary)] hidden sm:inline shrink-0">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Workspace, Quick Create, Notifications, Profile */}
      <div className="flex items-center gap-3">
        
        {/* Current Workspace Selector */}
        <div className="neo-pill px-3 py-1.5 text-xs font-mono font-bold text-[var(--text-secondary)] hidden lg:flex items-center gap-2 border border-[var(--border-light)]">
          <Building2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
          <span>Byte Build Main Workspace</span>
        </div>

        {/* Quick Create Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsQuickCreateOpen(!isQuickCreateOpen)}
            className="neo-btn neo-btn-accent text-xs py-2 px-3.5 font-bold inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Quick Create</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          <AnimatePresence>
            {isQuickCreateOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 mt-2 w-48 neo-card border border-[var(--border-light)] rounded-2xl p-2 bg-[var(--bg-primary)] shadow-xl z-50 space-y-1 text-left"
              >
                <div className="px-3 py-1 text-[10px] font-mono text-[var(--text-tertiary)] uppercase font-bold border-b border-[var(--border-subtle)] pb-1">
                  Quick Actions
                </div>
                {quickCreateItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.action}
                      onClick={() => {
                        setIsQuickCreateOpen(false);
                        onQuickAction(item.action);
                      }}
                      className="w-full px-3 py-2 rounded-xl text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--surface-recessed)] flex items-center gap-2 transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notification Drawer Trigger */}
        <button
          onClick={onToggleNotifications}
          className="relative neo-card p-2.5 rounded-xl border border-[var(--border-light)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--accent-primary)] text-white font-mono font-bold text-[10px] flex items-center justify-center border-2 border-[var(--bg-primary)] shadow-sm">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile Menu Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2 neo-card p-1.5 pr-3 rounded-2xl border border-[var(--border-light)] hover:border-[var(--accent-primary)] transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
              alt="Marcus Vance"
              loading="lazy"
              decoding="async"
              className="w-7 h-7 rounded-xl object-cover"
            />
            <span className="text-xs font-bold text-[var(--text-primary)] hidden md:inline">Marcus</span>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
          </button>

          <AnimatePresence>
            {isProfileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 mt-2 w-52 neo-card border border-[var(--border-light)] rounded-2xl p-2 bg-[var(--bg-primary)] shadow-xl z-50 space-y-1 text-left"
              >
                <div className="px-3 py-2 border-b border-[var(--border-subtle)] space-y-0.5">
                  <span className="text-xs font-black text-[var(--text-primary)] block">Marcus Vance</span>
                  <span className="text-[10px] font-mono text-[var(--accent-primary)] block">Super Administrator</span>
                </div>

                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onNavigate('settings');
                  }}
                  className="w-full px-3 py-2 rounded-xl text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-recessed)] flex items-center gap-2 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onNavigate('settings');
                  }}
                  className="w-full px-3 py-2 rounded-xl text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-recessed)] flex items-center gap-2 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                  <span>Security</span>
                </button>

                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onNavigate('settings');
                  }}
                  className="w-full px-3 py-2 rounded-xl text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-recessed)] flex items-center gap-2 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                  <span>Settings</span>
                </button>

                <div className="border-t border-[var(--border-subtle)] pt-1">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full px-3 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </header>
  );
};
