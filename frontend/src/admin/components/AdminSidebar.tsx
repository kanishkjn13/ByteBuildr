import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Building2,
  FolderKanban,
  UserCheck,
  DollarSign,
  FileText,
  Image as ImageIcon,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  X
} from 'lucide-react';
import type { AdminView } from '../types';

interface AdminSidebarProps {
  currentView: AdminView;
  setCurrentView: (view: AdminView) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onLogout: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentView,
  setCurrentView,
  isCollapsed,
  setIsCollapsed,
  onLogout,
  isMobileOpen,
  onMobileClose
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: Users, badge: '24' },
    { id: 'clients', label: 'Clients', icon: Building2, badge: '12' },
    { id: 'projects', label: 'Projects', icon: FolderKanban, badge: '8' },
    { id: 'team', label: 'Team', icon: UserCheck },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'cms', label: 'CMS', icon: FileText },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleMobileSelect = (view: AdminView) => {
    setCurrentView(view);
    if (onMobileClose) onMobileClose();
  };

  return (
    <>
      {/* Desktop Locked Sidebar (hidden on screens < 768px) */}
      <aside
        className={`h-screen sticky top-0 bg-[var(--bg-primary)] border-r border-[var(--border-subtle)] hidden md:flex flex-col justify-between transition-all duration-300 z-30 shrink-0 select-none ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Sidebar Header & Brand Logo */}
        <div className="p-4 flex items-center justify-between border-b border-[var(--border-subtle)] h-16">
          {!isCollapsed && (
            <div className="flex items-center gap-2.5">
              <img 
                src="/logo.png" 
                alt="ByteBuilders Logo" 
                className="w-8 h-8 object-contain"
              />
              <div>
                <span className="text-sm font-black text-[var(--text-primary)] tracking-tight block leading-none">
                  BYTEBUILDERS
                </span>
                <span className="text-[9px] font-mono text-[var(--accent-primary)] uppercase tracking-wider font-extrabold block mt-0.5">
                  Admin Control Center
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
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-7 h-7 rounded-lg neo-inset flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors hidden md:flex shrink-0"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Menu List */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 scrollbar-none">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as AdminView)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all relative group ${
                  isActive
                    ? 'neo-inset text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 shadow-inner'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-recessed)]/50'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]'}`} />

                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] font-mono font-extrabold neo-pill px-2 py-0.5 ${
                        isActive ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--surface-recessed)] text-[var(--text-tertiary)]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Active Indicator Bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeAdminTab"
                    className="absolute left-0 w-1 h-5 bg-[var(--accent-primary)] rounded-r-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer & Logout */}
        <div className="p-3 border-t border-[var(--border-subtle)] space-y-2">
          {!isCollapsed && (
            <div className="neo-inset p-2.5 rounded-xl flex items-center gap-2.5 text-[11px] font-mono text-[var(--text-tertiary)]">
              <ShieldAlert className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="truncate">Enterprise Admin v1.0</span>
            </div>
          )}

          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title="Logout Admin Session"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

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
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="/logo.png" 
                      alt="Byte Build Logo" 
                      className="w-8 h-8 object-contain"
                    />
                    <div>
                      <span className="text-sm font-black text-[var(--text-primary)] tracking-tight block leading-none">
                        BYTE BUILD
                      </span>
                      <span className="text-[9px] font-mono text-[var(--accent-primary)] uppercase tracking-wider font-extrabold block mt-0.5">
                        Admin Control Center
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={onMobileClose}
                    className="w-8 h-8 rounded-xl neo-inset flex items-center justify-center text-[var(--text-secondary)]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-none">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMobileSelect(item.id as AdminView)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'neo-inset text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 shadow-inner'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[var(--accent-primary)]' : ''}`} />
                          <span>{item.label}</span>
                        </div>

                        {item.badge && (
                          <span className={`text-[10px] font-mono font-extrabold neo-pill px-2 py-0.5 ${
                            isActive ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--surface-recessed)] text-[var(--text-tertiary)]'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
                <button
                  onClick={() => { if (onMobileClose) onMobileClose(); onLogout(); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>Logout Admin Session</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
