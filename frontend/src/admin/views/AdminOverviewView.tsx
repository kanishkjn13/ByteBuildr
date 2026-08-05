import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Building2,
  FolderKanban,
  CheckSquare,
  DollarSign,
  ArrowUpRight,
  Activity,
  Calendar,
  UserPlus,
  FilePlus,
  Upload,
  UserCheck
} from 'lucide-react';
import type { AdminMetric, AdminActivityItem, AdminView } from '../types';

interface AdminOverviewViewProps {
  metrics: AdminMetric[];
  activities: AdminActivityItem[];
  onNavigate: (view: AdminView) => void;
  onQuickAction: (action: string) => void;
}

export const AdminOverviewView: React.FC<AdminOverviewViewProps> = ({
  metrics,
  activities,
  onNavigate,
  onQuickAction
}) => {

  const getMetricIcon = (id: string) => {
    switch (id) {
      case 'm-1': return <Users className="w-5 h-5 text-blue-500" />;
      case 'm-2': return <Building2 className="w-5 h-5 text-emerald-500" />;
      case 'm-3': return <FolderKanban className="w-5 h-5 text-purple-500" />;
      case 'm-4': return <CheckSquare className="w-5 h-5 text-amber-500" />;
      case 'm-5': return <DollarSign className="w-5 h-5 text-indigo-500" />;
      default: return <Activity className="w-5 h-5 text-[var(--accent-primary)]" />;
    }
  };

  return (
    <div className="space-y-10 text-left pb-12">
      
      {/* ========================================================================= */}
      {/* HERO HEADER                                                               */}
      {/* ========================================================================= */}
      <div className="border-b border-[var(--border-subtle)] pb-6 space-y-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 neo-pill px-3 py-1 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span>Internal Agency Operations</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
            Enterprise Control Center
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            Real-time agency telemetry monitoring leads, active client projects, team capacity, and month-to-date financial performance.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-tertiary)] neo-pill px-3.5 py-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Agency Operations Live</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUMMARY CARDS (Total Leads, Active Clients, Projects, Tasks, Revenue)     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((m) => (
          <motion.div
            key={m.id}
            whileHover={{ y: -3 }}
            className="neo-card p-5 rounded-[22px] border border-[var(--border-light)] space-y-3 hover:border-[var(--accent-primary)] transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold truncate">
                {m.title}
              </span>
              <div className="w-8 h-8 rounded-xl neo-inset flex items-center justify-center">
                {getMetricIcon(m.id)}
              </div>
            </div>

            <div>
              <span className="text-2xl font-black text-[var(--text-primary)] font-mono block">
                {m.value}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-mono mt-1">
                <span className="text-emerald-600 font-extrabold flex items-center">
                  <ArrowUpRight className="w-3 h-3" />
                  {m.change}
                </span>
                <span className="text-[var(--text-tertiary)] font-medium truncate">{m.subtext}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* QUICK ACTIONS GRID (6 Large Buttons)                                      */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
          Agency Quick Actions
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          
          <motion.button
            whileHover={{ y: -3 }}
            onClick={() => onQuickAction('add-lead')}
            className="neo-card p-4 rounded-2xl border border-[var(--border-light)] flex flex-col items-center justify-center text-center gap-2 hover:border-[var(--accent-primary)] transition-all group"
          >
            <div className="w-10 h-10 rounded-xl neo-inset flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <UserPlus className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[var(--text-primary)]">Add Lead</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -3 }}
            onClick={() => onQuickAction('create-project')}
            className="neo-card p-4 rounded-2xl border border-[var(--border-light)] flex flex-col items-center justify-center text-center gap-2 hover:border-[var(--accent-primary)] transition-all group"
          >
            <div className="w-10 h-10 rounded-xl neo-inset flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
              <FolderKanban className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[var(--text-primary)]">Create Project</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -3 }}
            onClick={() => onQuickAction('create-invoice')}
            className="neo-card p-4 rounded-2xl border border-[var(--border-light)] flex flex-col items-center justify-center text-center gap-2 hover:border-[var(--accent-primary)] transition-all group"
          >
            <div className="w-10 h-10 rounded-xl neo-inset flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[var(--text-primary)]">Create Invoice</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -3 }}
            onClick={() => onQuickAction('upload-media')}
            className="neo-card p-4 rounded-2xl border border-[var(--border-light)] flex flex-col items-center justify-center text-center gap-2 hover:border-[var(--accent-primary)] transition-all group"
          >
            <div className="w-10 h-10 rounded-xl neo-inset flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[var(--text-primary)]">Upload Media</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -3 }}
            onClick={() => onQuickAction('create-blog')}
            className="neo-card p-4 rounded-2xl border border-[var(--border-light)] flex flex-col items-center justify-center text-center gap-2 hover:border-[var(--accent-primary)] transition-all group"
          >
            <div className="w-10 h-10 rounded-xl neo-inset flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
              <FilePlus className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[var(--text-primary)]">Create Blog</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -3 }}
            onClick={() => onQuickAction('assign-team')}
            className="neo-card p-4 rounded-2xl border border-[var(--border-light)] flex flex-col items-center justify-center text-center gap-2 hover:border-[var(--accent-primary)] transition-all group"
          >
            <div className="w-10 h-10 rounded-xl neo-inset flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[var(--text-primary)]">Assign Team</span>
          </motion.button>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* RECENT ACTIVITY STREAM (Max 10 Activities)                                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Recent Activity Stream (Max 10)</span>
            </span>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Live System Audit</span>
          </div>

          <div className="neo-card rounded-[24px] border border-[var(--border-light)] p-5 space-y-3">
            {activities.slice(0, 10).map((act) => (
              <div
                key={act.id}
                className="neo-inset p-3.5 rounded-xl flex items-center justify-between gap-4 text-xs transition-colors hover:bg-[var(--surface-recessed)]/50"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl neo-card flex items-center justify-center shrink-0 border border-[var(--border-light)]">
                    <Activity className="w-4 h-4 text-[var(--accent-primary)]" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-[var(--text-primary)] block truncate">{act.title}</span>
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">
                      Triggered by: {act.user || 'System'}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-[var(--text-tertiary)] shrink-0">{act.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Agency Syncs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Upcoming Syncs</span>
            </span>
          </div>

          <div className="neo-card rounded-[24px] border border-[var(--border-light)] p-5 space-y-4">
            <div className="neo-inset p-4 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between text-[10px] font-mono text-[var(--accent-primary)] font-bold">
                <span>Tomorrow, 02:00 PM EST</span>
                <span>Google Meet</span>
              </div>
              <h3 className="font-bold text-[var(--text-primary)]">Phase 4 Sprint Review & Staging Walkthrough</h3>
              <p className="text-[11px] text-[var(--text-secondary)]">Client: Alex Vance (Aura Health)</p>
            </div>

            <div className="neo-inset p-4 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between text-[10px] font-mono text-purple-500 font-bold">
                <span>Friday, 11:00 AM EST</span>
                <span>Zoom</span>
              </div>
              <h3 className="font-bold text-[var(--text-primary)]">Pre-Launch Security & Core Web Vitals Audit</h3>
              <p className="text-[11px] text-[var(--text-secondary)]">Client: Alex Vance (Aura Health)</p>
            </div>

            <button
              onClick={() => onNavigate('projects')}
              className="w-full neo-btn text-xs py-2.5 font-bold justify-center"
            >
              View Full Sprint Schedule
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
