import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEOHead } from '../seo/SEOHead';
import type { PortalView } from './types';
import {
  mockCurrentProject,
  mockProjectsList,
  mockRecentActivities,
  mockFiles,
  mockVersionHistory,
  mockInvoices,
  mockPaymentTransactions,
  mockMessages,
  mockConversationsList,
  mockMeetings,
  mockPastMeetings,
  mockMeetingNotes,
  mockSupportTickets,
  mockTicketHistory,
  mockSupportFAQs,
  mockNotifications,
  mockClientProfile
} from './portalData';

import { PortalSidebar } from './components/PortalSidebar';
import { PortalTopNav } from './components/PortalTopNav';
import { NotificationDrawer } from './components/NotificationDrawer';

import { DashboardView } from './views/DashboardView';
import { ProjectsView } from './views/ProjectsView';
import { FilesView } from './views/FilesView';
import { InvoicesView } from './views/InvoicesView';
import { MessagesView } from './views/MessagesView';
import { MeetingsView } from './views/MeetingsView';
import { SupportView } from './views/SupportView';
import { ProfileView } from './views/ProfileView';

interface ClientPortalPageProps {
  theme?: 'light' | 'dark';
  toggleTheme?: () => void;
}

export const ClientPortalPage: React.FC<ClientPortalPageProps> = ({ theme, toggleTheme }) => {
  const [currentView, setCurrentView] = useState<PortalView>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

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
    if (confirm('Are you sure you want to log out of the Byte Build Client Portal?')) {
      window.location.href = '/';
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView
            project={mockCurrentProject}
            activities={mockRecentActivities}
            latestInvoice={mockInvoices[0]}
            latestMessage={mockMessages[0]}
            nextMeeting={mockMeetings[0]}
            onNavigate={(view) => setCurrentView(view)}
          />
        );

      case 'projects':
        return (
          <ProjectsView
            projects={mockProjectsList}
            onNavigate={(view) => setCurrentView(view)}
          />
        );

      case 'files':
        return (
          <FilesView
            files={mockFiles}
            deliverables={mockCurrentProject.deliverables}
            versionHistory={mockVersionHistory}
            onNavigate={(view) => setCurrentView(view)}
          />
        );

      case 'invoices':
        return (
          <InvoicesView
            invoices={mockInvoices}
            transactions={mockPaymentTransactions}
            onNavigate={(view) => setCurrentView(view)}
          />
        );

      case 'messages':
        return (
          <MessagesView
            messages={mockMessages}
            conversations={mockConversationsList}
            currentProject={mockCurrentProject}
            profile={mockClientProfile}
            onNavigate={(view) => setCurrentView(view)}
          />
        );

      case 'meetings':
        return (
          <MeetingsView
            meetings={mockMeetings}
            pastMeetings={mockPastMeetings}
            notes={mockMeetingNotes}
            onNavigate={(view) => setCurrentView(view)}
          />
        );

      case 'support':
        return (
          <SupportView
            tickets={mockSupportTickets}
            historyTickets={mockTicketHistory}
            faqs={mockSupportFAQs}
            profile={mockClientProfile}
            onNavigate={(view) => setCurrentView(view)}
          />
        );

      case 'profile':
        return (
          <ProfileView
            profile={mockClientProfile}
            onLogout={handleLogout}
            onNavigate={(view) => setCurrentView(view)}
          />
        );

      default:
        return (
          <DashboardView
            project={mockCurrentProject}
            activities={mockRecentActivities}
            latestInvoice={mockInvoices[0]}
            latestMessage={mockMessages[0]}
            nextMeeting={mockMeetings[0]}
            onNavigate={(view) => setCurrentView(view)}
          />
        );
    }
  };

  return (
    <>
      <SEOHead
        title="Client Portal & Dashboard | Byte Build"
        description="Access your project status, download deliverables, review invoices, send messages, and book meetings in your calm, minimalist client portal."
      />

      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex">
        
        {/* Collapsible 9-Item Sidebar (Desktop + Mobile Drawer) */}
        <PortalSidebar
          currentView={currentView}
          onSelectView={(v) => setCurrentView(v)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onLogout={handleLogout}
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ml-0 ${isSidebarCollapsed ? 'md:ml-[80px]' : 'md:ml-[260px]'}`}>
          {/* Top Navigation */}
          <PortalTopNav
            currentProject={mockCurrentProject}
            profile={mockClientProfile}
            unreadNotificationsCount={unreadCount}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onSelectView={(v) => setCurrentView(v)}
            onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            theme={theme}
            toggleTheme={toggleTheme}
          />

          {/* View Container */}
          <main className="p-6 md:p-10 max-w-7xl w-full mx-auto flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Notification Drawer */}
        <NotificationDrawer
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onMarkAllAsRead={handleMarkAllNotificationsRead}
        />

      </div>
    </>
  );
};
