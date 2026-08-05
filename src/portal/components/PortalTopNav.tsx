import { Search, Bell, ChevronDown, Folder, Menu } from 'lucide-react';
import type { ClientProject, ClientProfile, PortalView } from '../types';

interface PortalTopNavProps {
  currentProject: ClientProject;
  profile: ClientProfile;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onSelectView: (view: PortalView) => void;
  onToggleMobileMenu?: () => void;
  theme?: 'light' | 'dark';
  toggleTheme?: () => void;
}

export const PortalTopNav: React.FC<PortalTopNavProps> = ({
  currentProject,
  profile,
  unreadNotificationsCount,
  onOpenNotifications,
  onSelectView,
  onToggleMobileMenu,
  theme,
  toggleTheme
}) => {
  return (
    <header className="h-16 border-b border-[var(--border-light)] bg-[var(--bg-primary)]/80 backdrop-blur-xl px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      
      {/* Left: Mobile Menu Toggle & Current Project Display */}
      <div className="flex items-center gap-2.5">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="p-2 rounded-xl neo-card border border-[var(--border-light)] text-[var(--text-primary)] md:hidden flex items-center justify-center shrink-0"
            aria-label="Toggle Portal Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="w-8 h-8 rounded-lg neo-inset flex items-center justify-center text-[var(--accent-primary)] shrink-0">
          <Folder className="w-4 h-4" />
        </div>
        <div className="text-left">
          <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase block leading-tight font-bold">
            Active Project
          </span>
          <span className="text-xs font-bold text-[var(--text-primary)] block line-clamp-1 max-w-[140px] sm:max-w-xs">
            {currentProject.name}
          </span>
        </div>
      </div>

      {/* Global Search */}
      <div className="hidden md:flex items-center max-w-sm w-full mx-6">
        <div className="neo-inset w-full px-3.5 py-2 rounded-xl flex items-center gap-2 border border-[var(--border-subtle)] text-xs">
          <Search className="w-3.5 h-3.5 text-[var(--text-tertiary)] shrink-0" />
          <input
            type="text"
            placeholder="Search files, invoices, updates..."
            className="bg-transparent w-full focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-xs"
          />
        </div>
      </div>

      {/* Right Controls: Notifications & Profile Menu */}
      <div className="flex items-center gap-3">
        
        {/* Theme Toggle if available */}
        {toggleTheme && (
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl neo-inset flex items-center justify-center text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            title="Toggle Theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        )}

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          className="w-9 h-9 rounded-xl neo-inset flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] relative"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center shadow-md animate-pulse">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Profile Menu Trigger */}
        <button
          onClick={() => onSelectView('profile')}
          className="neo-card px-3 py-1.5 rounded-xl border border-[var(--border-light)] flex items-center gap-2.5 hover:border-[var(--accent-primary)] transition-all"
          title="Organization Profile"
        >
          <img
            src={profile.orgLogoUrl || profile.photoUrl}
            alt={profile.organizationName || profile.company}
            className="w-6 h-6 rounded-lg object-cover border border-[var(--border-light)]"
          />
          <span className="text-xs font-bold text-[var(--text-primary)] hidden sm:inline max-w-[140px] truncate">
            {profile.organizationName || profile.company}
          </span>
          <ChevronDown className="w-3 h-3 text-[var(--text-tertiary)]" />
        </button>

      </div>
    </header>
  );
};
