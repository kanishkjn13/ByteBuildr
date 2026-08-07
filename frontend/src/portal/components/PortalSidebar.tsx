import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  FolderOpen,
  Receipt,
  MessageSquare,
  Calendar,
  HelpCircle,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import type { PortalView } from '../types';

interface PortalSidebarProps {
  currentView: PortalView;
  onSelectView: (view: PortalView) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const PortalSidebar: React.FC<PortalSidebarProps> = ({
  currentView,
  onSelectView,
  isCollapsed,
  onToggleCollapse,
  onLogout,
  isMobileOpen,
  onMobileClose
}) => {
  const menuItems: { view: PortalView; label: string; icon: React.FC<{ className?: string }> }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { view: 'projects', label: 'Projects', icon: FolderKanban },
    { view: 'files', label: 'Files', icon: FolderOpen },
    { view: 'invoices', label: 'Invoices', icon: Receipt },
    { view: 'messages', label: 'Messages', icon: MessageSquare },
    { view: 'meetings', label: 'Meetings', icon: Calendar },
    { view: 'support', label: 'Support', icon: HelpCircle },
    { view: 'profile', label: 'Profile', icon: User },
  ];

  const handleMobileSelect = (view: PortalView) => {
    onSelectView(view);
    if (onMobileClose) onMobileClose();
  };

  return (
    <>
      {/* Desktop Locked Sidebar (hidden on screens < 768px) */}
      <motion.aside
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 bottom-0 z-40 bg-[var(--bg-primary)] border-r border-[var(--border-light)] hidden md:flex flex-col justify-between p-4 shadow-xl select-none"
      >
        {/* Top Section: Brand Emblem & Collapse Toggle */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2 py-1">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  alt="ByteBuilders Logo" 
                  className="w-9 h-9 object-contain"
                />
                <div className="text-left">
                  <span className="font-extrabold text-sm tracking-tight text-[var(--text-primary)] block leading-none">
                    BYTEBUILDERS
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-[var(--accent-primary)] uppercase block mt-0.5">
                    Client Portal
                  </span>
                </div>
              </div>
            )}

            {isCollapsed && (
              <img 
                src="/logo.png" 
                alt="ByteBuilders Logo" 
                className="w-9 h-9 object-contain mx-auto"
              />
            )}

            <button
              onClick={onToggleCollapse}
              className="w-8 h-8 rounded-xl neo-inset hidden lg:flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5 pt-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;

              return (
                <button
                  key={item.view}
                  onClick={() => onSelectView(item.view)}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'neo-inset text-[var(--accent-primary)] font-extrabold border border-[var(--accent-primary)]/20 shadow-inner'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-recessed)]/50'
                  } ${isCollapsed ? 'justify-center px-0' : 'text-left'}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[var(--accent-primary)]' : ''}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Logout Button */}
        <div className="pt-4 border-t border-[var(--border-subtle)]">
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-all ${
              isCollapsed ? 'justify-center px-0' : 'text-left'
            }`}
            title="Logout"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Off-Canvas Drawer (Visible on screens < 768px when toggled) */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex" onClick={onMobileClose}>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-4/5 max-w-xs bg-[var(--bg-primary)] h-full border-r border-[var(--border-light)] p-5 flex flex-col justify-between z-10 shadow-2xl"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src="/logo.png" 
                      alt="ByteBuilders Logo" 
                      className="w-9 h-9 object-contain"
                    />
                    <div className="text-left">
                      <span className="font-extrabold text-sm tracking-tight text-[var(--text-primary)] block leading-none">
                        BYTEBUILDERS
                      </span>
                      <span className="text-[9px] font-mono tracking-widest text-[var(--accent-primary)] uppercase block mt-0.5 font-bold">
                        Client Portal
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={onMobileClose}
                    className="w-8 h-8 rounded-xl neo-inset flex items-center justify-center text-[var(--text-secondary)]"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.view;

                    return (
                      <button
                        key={item.view}
                        onClick={() => handleMobileSelect(item.view)}
                        className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'neo-inset text-[var(--accent-primary)] font-extrabold border border-[var(--accent-primary)]/20 shadow-inner'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        } text-left`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[var(--accent-primary)]' : ''}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <button
                  onClick={() => { if (onMobileClose) onMobileClose(); onLogout(); }}
                  className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-all text-left"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
