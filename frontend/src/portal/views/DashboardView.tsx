import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Clock,
  ArrowRight,
  Calendar,
  Receipt,
  MessageSquare,
  Activity,
  ExternalLink,
  CheckCircle2,
  FileCheck,
  CreditCard
} from 'lucide-react';
import type {
  ClientProject,
  ActivityItem,
  InvoiceItem,
  MessageItem,
  MeetingItem,
  PortalView
} from '../types';
import { QuickActions } from '../components/QuickActions';

interface DashboardViewProps {
  project: ClientProject;
  activities: ActivityItem[];
  latestInvoice: InvoiceItem;
  latestMessage: MessageItem;
  nextMeeting: MeetingItem;
  onNavigate: (view: PortalView) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  project,
  activities,
  latestInvoice,
  latestMessage,
  nextMeeting,
  onNavigate
}) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'approval': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
      case 'payment': return <CreditCard className="w-3.5 h-3.5 text-blue-500" />;
      case 'file': return <FileCheck className="w-3.5 h-3.5 text-indigo-500" />;
      case 'meeting': return <Calendar className="w-3.5 h-3.5 text-amber-500" />;
      case 'update': return <Activity className="w-3.5 h-3.5 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6 text-left pb-10">
      
      {/* 1. Welcome Message Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Welcome back, Alex 👋
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Here is the live status of your active agency project.
          </p>
        </div>

        <div className="neo-inset px-3.5 py-1.5 rounded-xl text-xs font-mono text-[var(--text-tertiary)] flex items-center gap-2 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Telemetry Active</span>
        </div>
      </div>

      {/* 2. Current Project Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="neo-card p-6 md:p-8 rounded-[24px] border border-[var(--border-light)] relative overflow-hidden space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="badge-tag">{project.status}</span>
            <h2 className="text-xl md:text-2xl font-black text-[var(--text-primary)]">
              {project.name}
            </h2>
          </div>

          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-pill px-3.5 py-2 text-xs font-mono text-[var(--accent-primary)] hover:underline flex items-center gap-1.5 self-start md:self-auto font-bold"
            >
              <span>Preview Live Staging</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Progress Bar & Current Phase */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[var(--text-primary)]">
              {project.currentPhase}
            </span>
            <span className="font-black text-[var(--accent-primary)] font-mono">
              {project.progress}% Complete
            </span>
          </div>

          <div className="h-3 w-full neo-inset rounded-full p-0.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full shadow-md"
            />
          </div>
        </div>

        {/* Project Meta Info Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-subtle)] text-xs">
          <div className="flex items-center gap-3">
            <img
              src={project.projectManager.avatar}
              alt={project.projectManager.name}
              className="w-9 h-9 rounded-xl object-cover border border-[var(--border-light)]"
            />
            <div>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">Project Manager</span>
              <span className="font-bold text-[var(--text-primary)] block">{project.projectManager.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)] shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">Est. Launch Target</span>
              <span className="font-bold text-[var(--text-primary)] block">{project.estimatedCompletion}</span>
            </div>
          </div>

          <div className="flex items-center justify-end sm:col-span-2 lg:col-span-1 pt-2 sm:pt-0">
            <button
              onClick={() => onNavigate('projects')}
              className="w-full sm:w-auto neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold justify-center"
            >
              <span>View Project Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* 3. Quick Actions (Only 4 Buttons) */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block px-1">
          Quick Actions
        </span>
        <QuickActions onAction={onNavigate} />
      </div>

      {/* 4. Single-Screen Overview Grid (Progress, Phase, Milestone, Meeting, Invoice, Message) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Overall Progress & Phase */}
        <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Overall Progress</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <span className="text-2xl font-black text-[var(--text-primary)]">{project.progress}%</span>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-1">{project.currentPhase}</p>
          </div>
        </div>

        {/* Upcoming Meeting */}
        <div 
          onClick={() => onNavigate('meetings')}
          className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-3 cursor-pointer hover:border-[var(--accent-primary)] transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Upcoming Meeting</span>
            <Calendar className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <span className="text-sm font-bold text-[var(--text-primary)] block line-clamp-1">{nextMeeting.title}</span>
            <p className="text-xs text-[var(--accent-primary)] font-semibold mt-0.5">{nextMeeting.date} • {nextMeeting.time}</p>
          </div>
        </div>

        {/* Latest Invoice */}
        <div 
          onClick={() => onNavigate('invoices')}
          className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-3 cursor-pointer hover:border-[var(--accent-primary)] transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Latest Invoice</span>
            <Receipt className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-[var(--text-primary)] block">{latestInvoice.invoiceNumber}</span>
              <p className="text-xs text-[var(--text-secondary)]">{latestInvoice.amount}</p>
            </div>
            <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono font-bold ${
              latestInvoice.status.toLowerCase() === 'paid' ? 'text-emerald-600 bg-emerald-500/10' : 'text-amber-600 bg-amber-500/10'
            }`}>
              {latestInvoice.status.toUpperCase()}
            </span>
          </div>
        </div>

      </div>

      {/* 5. Latest Message & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Latest Direct Message */}
        <div className="lg:col-span-5 neo-card p-6 rounded-2xl border border-[var(--border-light)] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[var(--accent-primary)]" />
                <span className="text-xs font-bold text-[var(--text-primary)]">Latest Message</span>
              </div>
              <button
                onClick={() => onNavigate('messages')}
                className="text-[10px] font-mono text-[var(--accent-primary)] hover:underline font-bold"
              >
                Reply in Chat
              </button>
            </div>

            <div className="neo-inset p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-2">
                <img
                  src={latestMessage.avatar}
                  alt={latestMessage.sender}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs font-bold text-[var(--text-primary)]">{latestMessage.sender}</span>
                <span className="text-[9px] font-mono text-[var(--text-tertiary)] ml-auto">{latestMessage.timestamp}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                "{latestMessage.text}"
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('messages')}
            className="neo-btn text-xs py-2.5 w-full justify-center font-bold"
          >
            <span>Open Direct Messenger</span>
          </button>
        </div>

        {/* Recent Activity (Display only latest 5 activities) */}
        <div className="lg:col-span-7 neo-card p-6 rounded-2xl border border-[var(--border-light)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[var(--accent-primary)]" />
              <span className="text-xs font-bold text-[var(--text-primary)]">Recent Activity</span>
            </div>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Latest 5 Events</span>
          </div>

          <div className="space-y-3">
            {activities.slice(0, 5).map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between neo-inset p-3 rounded-xl text-xs gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg neo-card flex items-center justify-center shrink-0">
                    {getActivityIcon(act.type)}
                  </div>
                  <span className="font-medium text-[var(--text-primary)] line-clamp-1">{act.title}</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--text-tertiary)] shrink-0">{act.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
