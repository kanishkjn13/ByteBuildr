import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderKanban,
  CheckCircle2,
  ExternalLink,
  Download,
  Upload,
  MessageSquare,
  Calendar,
  FileCheck,
  Activity
} from 'lucide-react';
import type { ClientProject, ProjectStatus, PortalView } from '../types';

interface ProjectsViewProps {
  projects: ClientProject[];
  onNavigate?: (view: PortalView) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ projects, onNavigate }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const getStatusBadgeStyle = (status: ProjectStatus) => {
    switch (status) {
      case 'Planning':
        return 'text-indigo-600 bg-indigo-500/10 border-indigo-500/30';
      case 'Design':
        return 'text-purple-600 bg-purple-500/10 border-purple-500/30';
      case 'Development':
        return 'text-blue-600 bg-blue-500/10 border-blue-500/30 animate-pulse';
      case 'Testing':
        return 'text-amber-600 bg-amber-500/10 border-amber-500/30';
      case 'Review':
        return 'text-cyan-600 bg-cyan-500/10 border-cyan-500/30';
      case 'Completed':
        return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30';
      default:
        return 'text-gray-600 bg-gray-500/10 border-gray-500/30';
    }
  };

  const completedMilestonesCount = selectedProject.milestones.filter(m => m.status === 'completed').length;
  const upcomingMilestone = selectedProject.milestones.find(m => m.status === 'in-progress' || m.status === 'upcoming');

  return (
    <div className="space-y-12 text-left pb-12">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 neo-pill px-3 py-1 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold mb-2">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Simple Client Project Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
            Active Project Status & Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-2xl">
            Clear visibility into what is happening, what is completed, what is next, and when your project will launch.
          </p>
        </div>

        <div className="neo-inset px-4 py-2 rounded-xl text-xs font-mono text-[var(--text-tertiary)] flex items-center gap-2 self-start sm:self-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-Time Status: Active</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. PROJECT CARDS SECTION (Max 2 cards per row)                           */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
            All Assigned Projects ({projects.length})
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Select card to inspect details</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => {
            const isSelected = proj.id === selectedProjectId;
            return (
              <motion.div
                key={proj.id}
                whileHover={{ y: -3 }}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`neo-card p-6 md:p-8 rounded-[24px] border cursor-pointer transition-all flex flex-col justify-between space-y-6 ${
                  isSelected
                    ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20 shadow-xl'
                    : 'border-[var(--border-light)] hover:border-[var(--accent-primary)]/50'
                }`}
              >
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">
                      {proj.projectType}
                    </span>
                    <span className={`neo-pill px-3 py-1 text-[10px] font-mono uppercase font-bold border ${getStatusBadgeStyle(proj.status)}`}>
                      {proj.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[var(--text-primary)] leading-snug">
                    {proj.name}
                  </h3>
                </div>

                {/* Progress Bar & Current Phase */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--text-secondary)] line-clamp-1">
                      {proj.currentPhase}
                    </span>
                    <span className="font-black text-[var(--accent-primary)] font-mono shrink-0 ml-2">
                      {proj.progress}%
                    </span>
                  </div>

                  <div className="h-2.5 w-full neo-inset rounded-full p-0.5 overflow-hidden">
                    <div
                      style={{ width: `${proj.progress}%` }}
                      className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Footer Info & CTA Button */}
                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={proj.projectManager.avatar}
                      alt={proj.projectManager.name}
                      className="w-7 h-7 rounded-full object-cover border border-[var(--border-light)]"
                    />
                    <div className="text-left">
                      <span className="text-[9px] font-mono text-[var(--text-tertiary)] block">Manager</span>
                      <span className="font-bold text-[var(--text-primary)] block text-[11px]">{proj.projectManager.name}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProjectId(proj.id);
                    }}
                    className={`neo-btn text-xs py-2 px-4 font-bold ${
                      isSelected ? 'neo-btn-accent' : ''
                    }`}
                  >
                    <span>{isSelected ? 'Viewing Details' : 'View Details'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SELECTED PROJECT DETAILS SECTION                                        */}
      {/* ========================================================================= */}
      {selectedProject && (
        <motion.div
          key={selectedProject.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="neo-card p-6 md:p-10 rounded-[28px] border border-[var(--border-light)] space-y-10"
        >
          {/* A. Project Header & Primary Metadata */}
          <div className="space-y-4 border-b border-[var(--border-subtle)] pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className={`neo-pill px-3 py-1 text-xs font-mono uppercase font-bold border ${getStatusBadgeStyle(selectedProject.status)}`}>
                    Status: {selectedProject.status}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-tertiary)]">
                    ID: {selectedProject.id}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] mt-1">
                  {selectedProject.name}
                </h2>
              </div>

              {selectedProject.liveDemoUrl && (
                <a
                  href={selectedProject.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold justify-center inline-flex items-center gap-2 self-start md:self-auto"
                >
                  <span>Launch Live Staging Preview</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              {selectedProject.description}
            </p>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
              <div className="neo-inset p-3.5 rounded-xl">
                <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase block font-bold">Start Date</span>
                <span className="font-extrabold text-[var(--text-primary)] mt-0.5 block">{selectedProject.startDate}</span>
              </div>
              <div className="neo-inset p-3.5 rounded-xl">
                <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase block font-bold">Estimated Delivery</span>
                <span className="font-extrabold text-[var(--accent-primary)] mt-0.5 block">{selectedProject.estimatedCompletion}</span>
              </div>
              <div className="neo-inset p-3.5 rounded-xl">
                <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase block font-bold">Project Manager</span>
                <span className="font-extrabold text-[var(--text-primary)] mt-0.5 block">{selectedProject.projectManager.name}</span>
              </div>
              <div className="neo-inset p-3.5 rounded-xl">
                <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase block font-bold">Client Contact</span>
                <span className="font-extrabold text-[var(--text-primary)] mt-0.5 block">{selectedProject.clientContact.name}</span>
              </div>
            </div>
          </div>

          {/* B. Project Progress Breakdown */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
              Overall Project Progress
            </span>

            <div className="neo-inset p-6 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                <div>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)] block uppercase font-bold">Current Phase</span>
                  <span className="font-bold text-[var(--text-primary)] text-sm">{selectedProject.currentPhase}</span>
                </div>
                <div className="text-left sm:text-right font-mono">
                  <span className="text-[10px] text-[var(--text-tertiary)] block uppercase font-bold">Progress Rate</span>
                  <span className="text-lg font-black text-[var(--accent-primary)]">{selectedProject.progress}%</span>
                </div>
              </div>

              <div className="h-3 w-full neo-card rounded-full p-0.5 overflow-hidden">
                <div
                  style={{ width: `${selectedProject.progress}%` }}
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full transition-all duration-700 shadow-md"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-[var(--text-secondary)] font-mono pt-1 gap-2">
                <span>Completed Milestones: <strong>{completedMilestonesCount} / {selectedProject.milestones.length}</strong></span>
                {upcomingMilestone && (
                  <span>Upcoming Target: <strong className="text-[var(--accent-primary)]">{upcomingMilestone.name} ({upcomingMilestone.dueDate})</strong></span>
                )}
              </div>
            </div>
          </div>

          {/* C. Milestones (Max 5 visible) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
                Project Milestones (Max 5)
              </span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Target Delivery Schedule</span>
            </div>

            <div className="space-y-3">
              {selectedProject.milestones.slice(0, 5).map((m, idx) => (
                <div
                  key={m.id}
                  className={`neo-card p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                    m.status === 'completed'
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : m.status === 'in-progress'
                      ? 'border-[var(--accent-primary)] bg-blue-500/5'
                      : 'border-[var(--border-subtle)] opacity-75'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      m.status === 'completed' ? 'bg-emerald-500 text-white' :
                      m.status === 'in-progress' ? 'bg-[var(--accent-primary)] text-white' :
                      'neo-inset text-[var(--text-tertiary)]'
                    }`}>
                      {m.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <span className="font-bold text-[var(--text-primary)]">{m.name}</span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 font-mono text-[11px]">
                    <span className="text-[var(--text-tertiary)]">
                      {m.completedDate ? `Done ${m.completedDate}` : `Due ${m.dueDate}`}
                    </span>
                    <span className={`neo-pill px-2.5 py-0.5 text-[10px] uppercase font-bold ${
                      m.status === 'completed' ? 'text-emerald-600 bg-emerald-500/10' :
                      m.status === 'in-progress' ? 'text-blue-600 bg-blue-500/10 animate-pulse' :
                      'text-[var(--text-tertiary)]'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* D. Recent Updates & Deliverables Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Recent Updates (Max 5) */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
                Recent Activity Updates (Max 5)
              </span>

              <div className="space-y-2.5">
                {selectedProject.recentUpdates.slice(0, 5).map((upd) => (
                  <div key={upd.id} className="neo-inset p-3.5 rounded-xl flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-2.5">
                      <Activity className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
                      <span className="font-bold text-[var(--text-primary)] line-clamp-1">{upd.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)] shrink-0">{upd.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables Preview */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
                Deliverables Preview & Download
              </span>

              <div className="space-y-2.5">
                {selectedProject.deliverables.map((del) => (
                  <div key={del.id} className="neo-card p-3.5 rounded-xl border border-[var(--border-light)] flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg neo-inset flex items-center justify-center text-[var(--accent-primary)] shrink-0">
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-[var(--text-primary)] block truncate">{del.title}</span>
                        <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{del.version} • {del.date}</span>
                      </div>
                    </div>

                    <a
                      href={del.downloadUrl}
                      download
                      className="neo-btn text-xs py-1.5 px-3 font-bold shrink-0 inline-flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* E. Quick Actions (Only 4 Buttons) */}
          <div className="space-y-3 pt-6 border-t border-[var(--border-subtle)]">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
              Quick Actions
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button
                onClick={() => onNavigate && onNavigate('files')}
                className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2.5 font-bold text-xs hover:border-[var(--accent-primary)] transition-all"
              >
                <Upload className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Upload Files</span>
              </button>

              <button
                onClick={() => onNavigate && onNavigate('messages')}
                className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2.5 font-bold text-xs hover:border-[var(--accent-primary)] transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Send Message</span>
              </button>

              <button
                onClick={() => onNavigate && onNavigate('meetings')}
                className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2.5 font-bold text-xs hover:border-[var(--accent-primary)] transition-all"
              >
                <Calendar className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Book Meeting</span>
              </button>

              <button
                onClick={() => onNavigate && onNavigate('files')}
                className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2.5 font-bold text-xs hover:border-[var(--accent-primary)] transition-all"
              >
                <Download className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Download Assets</span>
              </button>
            </div>
          </div>

        </motion.div>
      )}

    </div>
  );
};
