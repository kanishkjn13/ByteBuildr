import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEOHead } from '../seo/SEOHead';
import type { AdminView } from './types';
import {
  mockAdminMetrics,
  mockAdminActivities,
  mockAdminNotifications
} from './adminData';

import { AdminSidebar } from './components/AdminSidebar';
import { AdminTopNav } from './components/AdminTopNav';
import { AdminNotificationDrawer } from './components/AdminNotificationDrawer';
import { AdminGlobalSearchModal } from './components/AdminGlobalSearchModal';
import { AdminOverviewView } from './views/AdminOverviewView';
import { AdminLeadsView } from './views/AdminLeadsView';
import { AdminClientsView } from './views/AdminClientsView';
import { AdminProjectsView } from './views/AdminProjectsView';
import { AdminTeamView } from './views/AdminTeamView';
import { AdminFinanceView } from './views/AdminFinanceView';
import { AdminCMSView } from './views/AdminCMSView';
import { AdminCalendarView } from './views/AdminCalendarView';
import { AdminAnalyticsView } from './views/AdminAnalyticsView';
import { AdminNotificationsView } from './views/AdminNotificationsView';
import { AdminSettingsView } from './views/AdminSettingsView';

export const AdminDashboardPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockAdminNotifications);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-collapse sidebar on tablet viewports (768px to 1024px) for optimal workspace space
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth <= 1024) {
      setIsSidebarCollapsed(true);
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out of the Byte Build Enterprise Admin Dashboard?')) {
      window.location.href = '/';
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-lead':
        setCurrentView('leads');
        setToastMessage('Redirected to Lead Management Intake');
        break;
      case 'create-project':
        setCurrentView('projects');
        setToastMessage('Redirected to Project Workspace Builder');
        break;
      case 'create-invoice':
        setCurrentView('finance');
        setToastMessage('Redirected to Financial Billing Center');
        break;
      case 'upload-media':
        setCurrentView('media');
        setToastMessage('Redirected to Media Library Uploader');
        break;
      case 'create-blog':
        setCurrentView('cms');
        setToastMessage('Redirected to Content Management System');
        break;
      case 'assign-team':
        setCurrentView('team');
        setToastMessage('Redirected to Agency Team Roster');
        break;
      default:
        setToastMessage(`Action "${action}" triggered`);
    }
    setTimeout(() => setToastMessage(null), 3000);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <AdminOverviewView
            metrics={mockAdminMetrics}
            activities={mockAdminActivities}
            onNavigate={(view) => setCurrentView(view)}
            onQuickAction={handleQuickAction}
          />
        );

      case 'leads':
        return <AdminLeadsView onNavigate={(view) => setCurrentView(view)} />;

      case 'clients':
        return <AdminClientsView onNavigate={(view) => setCurrentView(view)} />;

      case 'projects':
        return <AdminProjectsView onNavigate={(view) => setCurrentView(view)} />;

      case 'team':
        return <AdminTeamView onNavigate={(view) => setCurrentView(view)} />;

      case 'finance':
        return <AdminFinanceView onNavigate={(view) => setCurrentView(view)} />;

      case 'cms':
        return <AdminCMSView onNavigate={(view) => setCurrentView(view)} />;

      case 'calendar':
        return <AdminCalendarView onNavigate={(view) => setCurrentView(view)} />;

      case 'analytics':
        return <AdminAnalyticsView onNavigate={(view) => setCurrentView(view)} />;

      case 'notifications':
        return <AdminNotificationsView onNavigate={(view) => setCurrentView(view)} />;

      case 'settings':
        return <AdminSettingsView onNavigate={(view) => setCurrentView(view)} />;

      default:
        return (
          <div className="neo-card p-12 rounded-[32px] border border-[var(--border-light)] text-center space-y-4 my-8">
            <div className="w-16 h-16 rounded-2xl neo-inset mx-auto flex items-center justify-center text-[var(--accent-primary)] font-mono font-black text-xl">
              {currentView.toUpperCase().substring(0, 3)}
            </div>
            <h2 className="text-2xl font-black text-[var(--text-primary)] capitalize">
              {currentView} Control Center
            </h2>
            <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed font-mono">
              Enterprise management interface for {currentView}. Fully integrated with Byte Build Admin telemetry.
            </p>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold"
            >
              Return to Overview Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex font-sans antialiased">
      <SEOHead
        title="Admin Control Center | Byte Build Studio"
        description="Internal enterprise administration workspace for managing agency leads, clients, projects, team, content, finance, and system telemetry."
      />

      {/* Admin Sidebar Navigation */}
      <AdminSidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        onLogout={handleLogout}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Sticky Top Navigation Bar */}
        <AdminTopNav
          onOpenSearch={() => setIsSearchOpen(true)}
          onToggleNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
          unreadCount={unreadCount}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
          onQuickAction={handleQuickAction}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Action Toast Banner */}
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="neo-inset mx-8 mt-4 p-3.5 rounded-xl border border-[var(--accent-primary)]/30 text-xs font-mono font-bold text-[var(--accent-primary)] text-center"
          >
            {toastMessage}
          </motion.div>
        )}

        {/* View Content Container */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Global Search Overlay Modal */}
      <AdminGlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={setCurrentView}
      />

      {/* Notification Drawer */}
      <AdminNotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
      />

    </div>
  );
};
