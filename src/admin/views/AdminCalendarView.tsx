import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Plus,
  Video,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import type {
  AdminMeetingItem,
  AdminDeadlineItem,
  MeetingType,
  AdminView
} from '../types';
import { mockAdminMeetings, mockAdminDeadlines } from '../adminData';

interface AdminCalendarViewProps {
  onNavigate?: (view: AdminView) => void;
}

export const AdminCalendarView: React.FC<AdminCalendarViewProps> = ({ onNavigate: _onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'today' | 'month' | 'week' | 'meetings' | 'deadlines' | 'agenda' | 'integrations'>('dashboard');

  // Data State
  const [meetings, setMeetings] = useState<AdminMeetingItem[]>(mockAdminMeetings);
  const [deadlines] = useState<AdminDeadlineItem[]>(mockAdminDeadlines);
  
  // Modals & Toasts
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newType, setNewType] = useState<MeetingType>('Development Review');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const metrics = useMemo(() => {
    const todayMeetings = meetings.filter(m => m.date === 'Today').length;
    const upcomingMeetings = meetings.length;
    const todayDeadlines = deadlines.filter(d => d.date === 'Today').length;
    const upcomingDeadlines = deadlines.length;
    return { todayMeetings, upcomingMeetings, todayDeadlines, upcomingDeadlines };
  }, [meetings, deadlines]);

  const getMeetingTypeBadge = (t: MeetingType) => {
    switch (t) {
      case 'Development Review': return 'text-purple-600 bg-purple-500/10 border-purple-500/30 font-bold';
      case 'Design Review': return 'text-indigo-600 bg-indigo-500/10 border-indigo-500/30 font-bold';
      case 'Project Kickoff': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30 font-bold';
      case 'Discovery Call': return 'text-blue-600 bg-blue-500/10 border-blue-500/30 font-bold';
      default: return 'text-amber-600 bg-amber-500/10 border-amber-500/30 font-bold';
    }
  };

  const handleJoinMeeting = (link: string, title: string) => {
    window.open(link, '_blank');
    triggerToast(`Joining meeting "${title}"...`);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newMtg: AdminMeetingItem = {
      id: `mtg-${Date.now()}`,
      title: newTitle.trim(),
      clientName: newClient.trim() || 'Client',
      company: newClient.trim() || 'Client Company',
      projectName: 'Active Engineering Sprint',
      date: 'Today',
      time: '03:00 PM EST',
      duration: '45 min',
      type: newType,
      assignedTeam: ['Marcus Vance'],
      link: 'https://meet.google.com/bytebuild-sync',
      status: 'Scheduled'
    };

    setMeetings([newMtg, ...meetings]);
    setIsScheduleModalOpen(false);
    setNewTitle('');
    setNewClient('');
    triggerToast(`Meeting "${newMtg.title}" scheduled!`);
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
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Agency Schedule & Daily Planning Center</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              Calendar & Meetings
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="neo-btn neo-btn-accent text-xs py-2 px-5 font-bold inline-flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Meeting</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs border-t border-[var(--border-subtle)] pt-3">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'today', label: `Today (${metrics.todayMeetings})` },
            { id: 'month', label: 'Month Calendar' },
            { id: 'week', label: 'Week View' },
            { id: 'meetings', label: `Meetings (${meetings.length})` },
            { id: 'deadlines', label: `Deadlines (${deadlines.length})` },
            { id: 'agenda', label: 'Agenda Stream' },
            { id: 'integrations', label: 'Integrations' }
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

      {/* ========================================================================= */}
      {/* TAB 1: DASHBOARD                                                          */}
      {/* ========================================================================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          
          {/* Summary Telemetry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Today's Meetings</span>
              <span className="text-2xl font-black text-purple-600 font-mono block">{metrics.todayMeetings}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Scheduled Sessions</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Upcoming Meetings</span>
              <span className="text-2xl font-black text-blue-600 font-mono block">{metrics.upcomingMeetings}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Next 7 Days</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Today's Deadlines</span>
              <span className="text-2xl font-black text-amber-600 font-mono block">{metrics.todayDeadlines}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Milestone Due</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Upcoming Deadlines</span>
              <span className="text-2xl font-black text-emerald-600 font-mono block">{metrics.upcomingDeadlines}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Sprint Milestones</span>
            </div>
          </div>

          {/* Today's Agenda Stream */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
              Today's Chronological Schedule
            </span>

            <div className="neo-card rounded-[24px] border border-[var(--border-light)] p-6 space-y-4">
              {meetings.map((m) => (
                <div key={m.id} className="neo-inset p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getMeetingTypeBadge(m.type)}`}>
                        {m.type}
                      </span>
                      <span className="text-[10px] font-bold text-[var(--accent-primary)]">{m.time} ({m.duration})</span>
                    </div>
                    <h3 className="text-sm font-extrabold text-[var(--text-primary)]">{m.title}</h3>
                    <p className="text-[10px] text-[var(--text-tertiary)]">Client: {m.company} ({m.clientName})</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleJoinMeeting(m.link, m.title)}
                      className="neo-btn neo-btn-accent text-xs py-1.5 px-4 font-bold inline-flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Meeting</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2, 5: MEETINGS MANAGER                                                */}
      {/* ========================================================================= */}
      {(activeTab === 'today' || activeTab === 'meetings') && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Scheduled Client & Internal Syncs ({meetings.length})
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {meetings.map((m) => (
              <div key={m.id} className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 text-left flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getMeetingTypeBadge(m.type)}`}>
                      {m.type}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--accent-primary)] font-bold">{m.time}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-[var(--text-primary)]">{m.title}</h3>
                    <p className="text-xs font-mono text-[var(--text-secondary)] mt-0.5">{m.company}</p>
                  </div>

                  <div className="neo-inset p-3 rounded-xl space-y-1 text-xs font-mono">
                    <span className="text-[10px] text-[var(--text-tertiary)] block">Assigned Team:</span>
                    <span className="font-bold text-[var(--text-primary)] block">{m.assignedTeam.join(', ')}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{m.duration}</span>
                  <button
                    onClick={() => handleJoinMeeting(m.link, m.title)}
                    className="neo-btn neo-btn-accent text-xs py-1.5 px-4 font-bold inline-flex items-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: MONTH CALENDAR GRID                                                */}
      {/* ========================================================================= */}
      {activeTab === 'month' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-[var(--text-primary)]">November 2026</span>
            <div className="flex items-center gap-2">
              <button className="neo-pill p-1.5"><ChevronLeft className="w-4 h-4" /></button>
              <button className="neo-pill p-1.5"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="neo-card rounded-[24px] border border-[var(--border-light)] p-6">
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono mb-4 text-[var(--text-tertiary)] font-bold">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-xs font-mono">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className={`p-3 rounded-xl neo-inset h-20 text-left flex flex-col justify-between ${i === 14 ? 'border border-[var(--accent-primary)]' : ''}`}>
                  <span className="font-bold text-[var(--text-primary)]">{i + 1}</span>
                  {i === 14 && (
                    <span className="text-[9px] font-bold text-purple-600 bg-purple-500/10 p-1 rounded">2 Syncs</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: DEADLINES MANAGER                                                  */}
      {/* ========================================================================= */}
      {activeTab === 'deadlines' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Upcoming Delivery & Milestone Deadlines ({deadlines.length})
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deadlines.map((d) => (
              <div key={d.id} className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="badge-tag">{d.type}</span>
                  <span className="text-[10px] font-mono font-bold text-rose-600">Priority: {d.priority}</span>
                </div>
                <h3 className="text-sm font-extrabold text-[var(--text-primary)]">{d.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] font-mono">Assigned: {d.assignedPerson} ({d.projectName})</p>
                <div className="neo-inset p-3 rounded-xl flex items-center justify-between text-xs font-mono">
                  <span className="text-[10px] text-[var(--text-tertiary)]">Due Date:</span>
                  <span className="font-bold text-[var(--accent-primary)]">{d.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: INTEGRATIONS                                                       */}
      {/* ========================================================================= */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Calendar Synchronization Status
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Google Calendar Sync', status: 'Connected', desc: 'Sync agency meetings to Google Calendar' },
              { name: 'Microsoft Outlook Sync', status: 'Ready', desc: 'Optional Outlook 365 calendar sync' },
              { name: 'Google Meet Integration', status: 'Active', desc: 'Auto-generate video conference URLs' },
              { name: 'Zoom Enterprise Launcher', status: 'Ready', desc: 'Optional Zoom room integration' }
            ].map((integ, idx) => (
              <div key={idx} className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] flex items-center justify-between text-left">
                <div>
                  <h3 className="text-sm font-extrabold text-[var(--text-primary)]">{integ.name}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{integ.desc}</p>
                </div>
                <span className="neo-pill px-3 py-1 text-xs font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/30">
                  {integ.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SCHEDULE MEETING MODAL */}
      <AnimatePresence>
        {isScheduleModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setIsScheduleModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[24px] max-w-md w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left"
            >
              <button onClick={() => setIsScheduleModalOpen(false)} className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="badge-tag">Meeting Scheduler</span>
                <h3 className="text-xl font-black text-[var(--text-primary)]">Schedule Client Session</h3>
              </div>

              <form onSubmit={handleScheduleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Session Title</label>
                  <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Sprint Demo & Feedback" className="neo-input text-xs" />
                </div>

                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Client / Company</label>
                  <input type="text" value={newClient} onChange={(e) => setNewClient(e.target.value)} placeholder="e.g. Aura Health Medical Group" className="neo-input text-xs" />
                </div>

                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Meeting Type</label>
                  <select value={newType} onChange={(e) => setNewType(e.target.value as MeetingType)} className="neo-input text-xs font-bold">
                    <option value="Discovery Call">Discovery Call</option>
                    <option value="Project Kickoff">Project Kickoff</option>
                    <option value="Design Review">Design Review</option>
                    <option value="Development Review">Development Review</option>
                    <option value="Client Feedback">Client Feedback</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsScheduleModalOpen(false)} className="neo-btn text-xs py-2.5 px-5 font-bold">Cancel</button>
                  <button type="submit" className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold">Schedule Session</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
