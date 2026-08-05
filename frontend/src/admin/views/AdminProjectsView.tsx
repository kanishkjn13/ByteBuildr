import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderKanban,
  Search,
  Filter,
  Plus,
  LayoutGrid,
  List,
  Eye,
  ExternalLink,
  CheckCircle2,
  UserCheck,
  Upload,
  DollarSign,
  X
} from 'lucide-react';
import type {
  AdminProjectItem,
  ProjectStatusStage,
  ProjectHealthStatus,
  AdminView
} from '../types';
import { mockAdminProjects } from '../adminData';

interface AdminProjectsViewProps {
  onNavigate?: (view: AdminView) => void;
}

export const AdminProjectsView: React.FC<AdminProjectsViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'all' | 'active' | 'completed' | 'archived' | 'milestones' | 'deadlines' | 'activity'>('dashboard');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  
  // Data State
  const [projects, setProjects] = useState<AdminProjectItem[]>(mockAdminProjects);
  const [inspectingProject, setInspectingProject] = useState<AdminProjectItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const metrics = useMemo(() => {
    const total = projects.length;
    const active = projects.filter(p => p.status !== 'Completed' && p.status !== 'Archived').length;
    const atRisk = projects.filter(p => p.health === 'Needs Attention' || p.health === 'Delayed' || p.health === 'At Risk').length;
    const completedMonth = projects.filter(p => p.status === 'Completed').length;
    const upcomingDeadlines = 3;
    return { total, active, atRisk, completedMonth, upcomingDeadlines };
  }, [projects]);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchQuery = !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.clientName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchStatus = selectedStatusFilter === 'All' || p.status === selectedStatusFilter;
      const matchTab = activeTab === 'all' || activeTab === 'dashboard' || activeTab === 'milestones' || activeTab === 'deadlines' || activeTab === 'activity' ||
        (activeTab === 'active' && (p.status !== 'Completed' && p.status !== 'Archived')) ||
        (activeTab === 'completed' && p.status === 'Completed') ||
        (activeTab === 'archived' && p.status === 'Archived');

      return matchQuery && matchStatus && matchTab;
    });
  }, [projects, searchQuery, selectedStatusFilter, activeTab]);

  const getHealthBadge = (health: ProjectHealthStatus) => {
    switch (health) {
      case 'Healthy': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30 font-bold';
      case 'Needs Attention': return 'text-amber-600 bg-amber-500/10 border-amber-500/30 font-bold';
      case 'Delayed': return 'text-rose-600 bg-rose-500/10 border-rose-500/30 font-bold';
      case 'Blocked': return 'text-rose-700 bg-rose-600/10 border-rose-600/30 font-extrabold animate-pulse';
      case 'At Risk': return 'text-rose-600 bg-rose-500/10 border-rose-500/30 font-bold';
    }
  };

  const getStatusBadge = (status: ProjectStatusStage) => {
    switch (status) {
      case 'Development': return 'text-purple-600 bg-purple-500/10 border-purple-500/30 font-bold';
      case 'UI/UX Design': return 'text-indigo-600 bg-indigo-500/10 border-indigo-500/30 font-bold';
      case 'Planning': return 'text-blue-600 bg-blue-500/10 border-blue-500/30 font-bold';
      case 'Completed': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30 font-bold';
      default: return 'text-gray-600 bg-gray-500/10 border-gray-500/30 font-bold';
    }
  };

  const handleToggleMilestone = (projectId: string, milestoneId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      const updatedMilestones = p.milestones.map(m => {
        if (m.id !== milestoneId) return m;
        const isComp = m.status === 'Completed';
        const newStatus: 'Completed' | 'In Progress' = isComp ? 'In Progress' : 'Completed';
        return {
          ...m,
          status: newStatus,
          progress: isComp ? 60 : 100,
          completedDate: isComp ? undefined : 'Just now'
        };
      });
      return { ...p, milestones: updatedMilestones };
    }));
    triggerToast('Milestone status updated!');
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
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Operational Project Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              Projects & Engineering Delivery
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                triggerToast('Opening Project Workspace Builder...');
              }}
              className="neo-btn neo-btn-accent text-xs py-2 px-5 font-bold inline-flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Create Project</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs border-t border-[var(--border-subtle)] pt-3">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'all', label: `All Projects (${metrics.total})` },
            { id: 'active', label: `Active (${metrics.active})` },
            { id: 'completed', label: `Completed (${metrics.completedMonth})` },
            { id: 'archived', label: 'Archived' },
            { id: 'milestones', label: 'Milestones Manager' },
            { id: 'deadlines', label: 'Deadlines Tracker' },
            { id: 'activity', label: 'Project Activity Log' }
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

      {/* Search, Filter, and Grid/List Switcher Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="neo-card p-2 rounded-2xl border border-[var(--border-light)] flex items-center px-3 text-xs w-full sm:w-80">
          <Search className="w-4 h-4 text-[var(--text-tertiary)] shrink-0 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search project name, client, company..."
            className="bg-transparent w-full focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-xs font-medium"
          />
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--text-tertiary)]" />
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="neo-input text-xs py-1.5 px-3 w-40"
            >
              <option value="All">All Statuses</option>
              <option value="Development">Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Planning">Planning</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="neo-card p-1 rounded-xl border border-[var(--border-light)] flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'neo-inset text-[var(--accent-primary)]' : 'text-[var(--text-tertiary)]'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'neo-inset text-[var(--accent-primary)]' : 'text-[var(--text-tertiary)]'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PROJECT DASHBOARD                                                  */}
      {/* ========================================================================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          
          {/* Summary Telemetry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Total Projects</span>
              <span className="text-2xl font-black text-[var(--text-primary)] font-mono block">{metrics.total}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Active & Completed Portfolio</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Active Sprint Delivery</span>
              <span className="text-2xl font-black text-purple-600 font-mono block">{metrics.active}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">In Active Engineering</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Projects At Risk</span>
              <span className="text-2xl font-black text-amber-600 font-mono block">{metrics.atRisk}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Needs Attention / Delayed</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Completed This Month</span>
              <span className="text-2xl font-black text-emerald-600 font-mono block">{metrics.completedMonth}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Delivered on Schedule</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Upcoming Deadlines</span>
              <span className="text-2xl font-black text-blue-600 font-mono block">{metrics.upcomingDeadlines}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Next 14 Days</span>
            </div>
          </div>

          {/* Project Roster Grid */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
              Active Project Control Grid ({filteredProjects.length})
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -3 }}
                  className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 flex flex-col justify-between hover:border-[var(--accent-primary)] transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getStatusBadge(project.status)}`}>
                        {project.status}
                      </span>
                      <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getHealthBadge(project.health)}`}>
                        {project.health}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-[var(--text-primary)] leading-snug">{project.name}</h3>
                      <p className="text-[11px] font-mono text-[var(--accent-primary)] font-bold mt-0.5">{project.company}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-[var(--text-tertiary)]">Sprint Progress</span>
                        <span className="font-extrabold text-[var(--text-primary)]">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-[var(--surface-recessed)] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[var(--accent-primary)] h-full transition-all" style={{ width: `${project.progress}%` }} />
                      </div>
                    </div>

                    <div className="neo-inset p-3 rounded-xl space-y-1 text-xs font-mono">
                      <span className="text-[10px] text-[var(--text-tertiary)] block">Current Phase:</span>
                      <span className="font-bold text-[var(--text-primary)] block truncate">{project.currentPhase}</span>
                      <span className="text-[10px] text-[var(--accent-primary)] block pt-1">Deadline: {project.deadline}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={project.projectManager.avatar} alt={project.projectManager.name} className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-[10px] font-mono text-[var(--text-secondary)] font-bold">{project.projectManager.name}</span>
                    </div>

                    <button
                      onClick={() => setInspectingProject(project)}
                      className="neo-btn text-xs py-1.5 px-3.5 font-bold inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2, 3, 4, 5: ALL / ACTIVE / COMPLETED / ARCHIVED PROJECTS             */}
      {/* ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'active' || activeTab === 'completed' || activeTab === 'archived') && (
        <div>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProjects.map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -3 }}
                  className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 flex flex-col justify-between text-left"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getStatusBadge(p.status)}`}>
                        {p.status}
                      </span>
                      <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getHealthBadge(p.health)}`}>
                        {p.health}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-[var(--text-primary)]">{p.name}</h3>
                    <p className="text-xs font-mono text-[var(--accent-primary)]">{p.company} • Budget: {p.budget}</p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Deadline: {p.deadline}</span>
                    <button
                      onClick={() => setInspectingProject(p)}
                      className="neo-btn text-xs py-1.5 px-3.5 font-bold inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="neo-card rounded-[24px] border border-[var(--border-light)] overflow-hidden">
              <table className="w-full text-left border-collapse" aria-label="Projects Table">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] text-[10px] font-mono uppercase text-[var(--text-tertiary)] bg-[var(--surface-recessed)]/50">
                    <th className="py-3.5 px-6 font-bold" scope="col">Project / Client</th>
                    <th className="py-3.5 px-6 font-bold" scope="col">Status</th>
                    <th className="py-3.5 px-6 font-bold" scope="col">Health</th>
                    <th className="py-3.5 px-6 font-bold" scope="col">Progress</th>
                    <th className="py-3.5 px-6 font-bold" scope="col">Deadline</th>
                    <th className="py-3.5 px-6 font-bold text-right" scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
                  {filteredProjects.map((p) => (
                    <tr key={p.id} className="hover:bg-[var(--surface-recessed)]/30 transition-colors">
                      <td className="py-4 px-6 font-bold text-[var(--text-primary)]">
                        <span className="block">{p.name}</span>
                        <span className="text-[10px] font-mono text-[var(--accent-primary)] block">{p.company}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getStatusBadge(p.status)}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getHealthBadge(p.health)}`}>
                          {p.health}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono font-bold text-[var(--text-primary)]">
                        {p.progress}%
                      </td>
                      <td className="py-4 px-6 font-mono text-[var(--text-tertiary)]">
                        {p.deadline}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setInspectingProject(p)}
                          className="neo-pill px-3 py-1.5 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: MILESTONES MANAGER                                                 */}
      {/* ========================================================================= */}
      {activeTab === 'milestones' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Agency Project Milestones Track
          </span>

          <div className="space-y-4">
            {projects.flatMap(p => p.milestones.map(m => ({ ...m, projectName: p.name, company: p.company }))).map((m) => (
              <div key={m.id} className="neo-card p-5 rounded-[22px] border border-[var(--border-light)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[var(--text-primary)]">{m.title}</span>
                    <span className="text-[10px] font-mono text-[var(--accent-primary)] font-bold">({m.company})</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">{m.description}</p>
                </div>

                <div className="flex items-center gap-4 text-mono shrink-0">
                  <span className="text-[10px] text-[var(--text-tertiary)]">Due: {m.dueDate}</span>
                  <button
                    onClick={() => handleToggleMilestone(m.projectId, m.id)}
                    className={`neo-pill px-3 py-1.5 font-bold ${m.status === 'Completed' ? 'text-emerald-600 bg-emerald-500/10' : 'text-purple-600 bg-purple-500/10'}`}
                  >
                    {m.status === 'Completed' ? 'Completed ✓' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: DEADLINES TRACKER                                                  */}
      {/* ========================================================================= */}
      {activeTab === 'deadlines' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Upcoming Delivery Deadlines
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-3 text-left">
                <div className="flex items-center justify-between text-[10px] font-mono text-[var(--accent-primary)] font-bold">
                  <span>Deadline: {p.deadline}</span>
                  <span>{p.progress}% Done</span>
                </div>
                <h3 className="text-base font-extrabold text-[var(--text-primary)]">{p.name}</h3>
                <p className="text-xs text-[var(--text-secondary)]">Client: {p.company}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: PROJECT ACTIVITY LOG                                               */}
      {/* ========================================================================= */}
      {activeTab === 'activity' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Chronological Project Activity Stream
          </span>

          <div className="neo-card rounded-[24px] border border-[var(--border-light)] p-5 space-y-3">
            {[
              { id: 'pa-1', title: 'Phase 4 React Engineering 75% Complete', project: 'Aura Health Flagship Platform', time: '10 min ago' },
              { id: 'pa-2', title: 'UI Component System Figma File Approved', project: 'Horizon Resort Booking Engine', time: 'Yesterday' },
              { id: 'pa-3', title: 'Project Kickoff Deposit Verified', project: 'Sterling VC Portfolio Portal', time: '2 days ago' }
            ].map((act) => (
              <div key={act.id} className="neo-inset p-4 rounded-xl flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="font-bold text-[var(--text-primary)] block">{act.title}</span>
                  <span className="text-[10px] text-[var(--accent-primary)] block">{act.project}</span>
                </div>
                <span className="text-[10px] text-[var(--text-tertiary)]">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PROJECT DETAILS INSPECTION MODAL                                          */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {inspectingProject && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setInspectingProject(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[28px] max-w-3xl w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setInspectingProject(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getStatusBadge(inspectingProject.status)}`}>
                    {inspectingProject.status}
                  </span>
                  <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getHealthBadge(inspectingProject.health)}`}>
                    {inspectingProject.health}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-[var(--text-primary)]">{inspectingProject.name}</h2>
                <p className="text-xs text-[var(--accent-primary)] font-mono font-bold">Client: {inspectingProject.company} ({inspectingProject.clientName})</p>
              </div>

              {/* Progress & Spec */}
              <div className="neo-inset p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--text-tertiary)]">Current Phase: {inspectingProject.currentPhase}</span>
                  <span className="font-black text-[var(--text-primary)]">{inspectingProject.progress}% Completed</span>
                </div>
                <div className="w-full bg-[var(--bg-primary)] h-2 rounded-full overflow-hidden">
                  <div className="bg-[var(--accent-primary)] h-full transition-all" style={{ width: `${inspectingProject.progress}%` }} />
                </div>
              </div>

              {/* Team Roster */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[var(--text-primary)] font-mono block">Assigned Project Team</span>
                <div className="flex flex-wrap gap-3 text-xs">
                  <div className="neo-inset px-3 py-2 rounded-xl flex items-center gap-2">
                    <img src={inspectingProject.projectManager.avatar} alt={inspectingProject.projectManager.name} className="w-6 h-6 rounded-full object-cover" />
                    <div>
                      <span className="font-bold text-[var(--text-primary)] block text-[11px]">{inspectingProject.projectManager.name}</span>
                      <span className="text-[9px] font-mono text-[var(--text-tertiary)] block">Project Manager</span>
                    </div>
                  </div>

                  {inspectingProject.teamMembers.map((tm, idx) => (
                    <div key={idx} className="neo-inset px-3 py-2 rounded-xl flex items-center gap-2">
                      <img src={tm.avatar} alt={tm.name} className="w-6 h-6 rounded-full object-cover" />
                      <div>
                        <span className="font-bold text-[var(--text-primary)] block text-[11px]">{tm.name}</span>
                        <span className="text-[9px] font-mono text-[var(--accent-primary)] block">{tm.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[var(--text-primary)] font-mono block">Project Deliverables</span>
                <ul className="neo-inset p-4 rounded-2xl list-disc list-inside space-y-1 text-xs text-[var(--text-secondary)]">
                  {inspectingProject.deliverables.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              </div>

              {/* Quick Action Bar */}
              <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-2 text-xs">
                <button
                  onClick={() => {
                    setInspectingProject(null);
                    triggerToast(`Team member assigned to ${inspectingProject.name}`);
                  }}
                  className="neo-btn text-xs py-2 px-3 font-bold inline-flex items-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Assign Team</span>
                </button>

                <button
                  onClick={() => {
                    setInspectingProject(null);
                    triggerToast(`Deliverable file uploaded to ${inspectingProject.name}`);
                  }}
                  className="neo-btn text-xs py-2 px-3 font-bold inline-flex items-center gap-1"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Deliverable</span>
                </button>

                <button
                  onClick={() => {
                    setInspectingProject(null);
                    if (onNavigate) onNavigate('finance');
                  }}
                  className="neo-btn text-xs py-2 px-3 font-bold inline-flex items-center gap-1"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Generate Invoice</span>
                </button>

                <button
                  onClick={() => {
                    window.location.href = '/portal';
                  }}
                  className="neo-btn neo-btn-accent text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Client Portal</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
