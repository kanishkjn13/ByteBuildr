import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Video,
  Clock,
  Copy,
  Check,
  Search,
  Plus,
  FileText,
  MessageSquare,
  X,
  CheckCircle2,
  ListOrdered,
  FolderOpen
} from 'lucide-react';
import type {
  MeetingItem,
  MeetingNoteItem,
  MeetingType,
  MeetingStatus,
  PortalView
} from '../types';
import { mockPastMeetings, mockMeetingNotes } from '../portalData';

interface MeetingsViewProps {
  meetings: MeetingItem[];
  pastMeetings?: MeetingItem[];
  notes?: MeetingNoteItem[];
  onBookNewMeeting?: () => void;
  onNavigate?: (view: PortalView) => void;
}

export const MeetingsView: React.FC<MeetingsViewProps> = ({
  meetings,
  pastMeetings = mockPastMeetings,
  notes = mockMeetingNotes,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [upcomingList, setUpcomingList] = useState<MeetingItem[]>(meetings);
  const [pastList] = useState<MeetingItem[]>(pastMeetings);
  const [noteList] = useState<MeetingNoteItem[]>(notes);

  // Active Modals & Selected States
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [inspectingNote, setInspectingNote] = useState<MeetingNoteItem | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  
  // Booking Form State
  const [selectedType, setSelectedType] = useState<MeetingType>('Development Update');
  const [bookingDate, setBookingDate] = useState('2026-11-10');
  const [bookingTime, setBookingTime] = useState('02:00 PM EST');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingToast, setBookingToast] = useState<string | null>(null);

  // Search Filter
  const filteredUpcoming = useMemo(() => {
    if (!searchQuery.trim()) return upcomingList.slice(0, 5);
    const q = searchQuery.toLowerCase().trim();
    return upcomingList.filter(
      m => m.title.toLowerCase().includes(q) ||
           m.projectName.toLowerCase().includes(q) ||
           m.type.toLowerCase().includes(q) ||
           m.date.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [upcomingList, searchQuery]);

  const filteredPast = useMemo(() => {
    if (!searchQuery.trim()) return pastList.slice(0, 10);
    const q = searchQuery.toLowerCase().trim();
    return pastList.filter(
      m => m.title.toLowerCase().includes(q) ||
           m.projectName.toLowerCase().includes(q) ||
           m.type.toLowerCase().includes(q) ||
           m.date.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [pastList, searchQuery]);

  // Handle Reschedule & Cancel
  const handleCancelMeeting = (id: string) => {
    if (confirm('Are you sure you want to cancel this scheduled meeting?')) {
      setUpcomingList(prev => prev.map(m => m.id === id ? { ...m, status: 'Cancelled' } : m));
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(url);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  // Handle Book Meeting Submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMeet: MeetingItem = {
      id: `meet-${Date.now()}`,
      title: `${selectedType}: Client Alignment Sync`,
      projectName: 'Aura Health Flagship Platform',
      date: bookingDate,
      time: bookingTime,
      duration: '30 mins',
      type: selectedType,
      status: 'Scheduled',
      host: {
        name: 'Marcus Vance',
        role: 'Senior Product Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
      },
      meetUrl: 'https://meet.google.com/new-scheduled-sync',
      meetingId: 'meet-new-sync',
      platform: 'Google Meet'
    };

    setUpcomingList([newMeet, ...upcomingList]);
    setIsBookModalOpen(false);
    setBookingToast(`Meeting scheduled for ${bookingDate} at ${bookingTime}. Calendar invite dispatched!`);
    setTimeout(() => setBookingToast(null), 4000);
  };

  const getStatusBadgeStyle = (status: MeetingStatus) => {
    switch (status) {
      case 'Today':
        return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30 animate-pulse';
      case 'Scheduled':
        return 'text-blue-600 bg-blue-500/10 border-blue-500/30';
      case 'Completed':
        return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
      case 'Cancelled':
        return 'text-rose-600 bg-rose-500/10 border-rose-500/30';
      case 'Rescheduled':
        return 'text-amber-600 bg-amber-500/10 border-amber-500/30';
    }
  };

  return (
    <div className="space-y-12 text-left pb-12">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Max 2 lines description)                                 */}
      {/* ========================================================================= */}
      <div className="border-b border-[var(--border-subtle)] pb-6 space-y-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 neo-pill px-3 py-1 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Consultation & Meeting Hub</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
            Meetings & Consultations
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            Schedule strategy syncs, join live video consultations, review past meeting notes, and collaborate directly with your Senior Product Architect.
          </p>
        </div>

        <button
          onClick={() => setIsBookModalOpen(true)}
          className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold shrink-0 inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Book Meeting</span>
        </button>
      </div>

      {/* Booking Toast Banner */}
      {bookingToast && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="neo-inset p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 flex items-center gap-3 text-xs text-emerald-600 font-bold"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{bookingToast}</span>
        </motion.div>
      )}

      {/* Instant Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
          Filter Meeting Schedules
        </span>

        <div className="neo-card p-2 rounded-2xl border border-[var(--border-light)] flex items-center px-3 text-xs w-full sm:w-80">
          <Search className="w-4 h-4 text-[var(--text-tertiary)] shrink-0 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search meeting title, project, type..."
            className="bg-transparent w-full focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-xs font-medium"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. UPCOMING MEETINGS (Max 5 Cards)                                        */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
            Upcoming Scheduled Meetings (Max 5)
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Direct Video Links</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredUpcoming.map((meet) => (
            <motion.div
              key={meet.id}
              whileHover={{ y: -3 }}
              className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-5 flex flex-col justify-between hover:border-[var(--accent-primary)] transition-all"
            >
              <div className="space-y-3">
                
                {/* Meeting Header */}
                <div className="flex items-center justify-between">
                  <span className={`neo-pill px-3 py-1 text-[10px] font-mono uppercase font-bold border ${getStatusBadgeStyle(meet.status)}`}>
                    {meet.status}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--accent-primary)] font-bold">
                    {meet.type}
                  </span>
                </div>

                {/* Title & Project */}
                <div>
                  <h3 className="text-base font-extrabold text-[var(--text-primary)] leading-snug">{meet.title}</h3>
                  <p className="text-[11px] font-mono text-[var(--text-tertiary)] mt-0.5">{meet.projectName}</p>
                </div>

                {/* Time & Host Info */}
                <div className="neo-inset p-3.5 rounded-xl space-y-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <Clock className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                    <span>{meet.date} • {meet.time} ({meet.duration})</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[var(--border-subtle)] text-[11px]">
                    <div className="flex items-center gap-2">
                      <img src={meet.host.avatar} alt={meet.host.name} className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-[var(--text-primary)] font-bold">{meet.host.name}</span>
                    </div>
                    <span className="text-[var(--text-tertiary)] font-bold">{meet.platform}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <a
                    href={meet.meetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn neo-btn-accent text-xs py-2.5 px-4 font-bold flex-1 justify-center inline-flex items-center gap-1.5"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Meeting</span>
                  </a>

                  <button
                    onClick={() => handleCopyLink(meet.meetUrl)}
                    className="neo-pill p-2.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold inline-flex items-center gap-1"
                    title="Copy Video Link"
                  >
                    {copiedLink === meet.meetUrl ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {meet.status !== 'Cancelled' && (
                  <div className="flex items-center justify-between text-[11px] font-bold text-[var(--text-tertiary)] px-1">
                    <button
                      onClick={() => alert(`Reschedule request for "${meet.title}" submitted.`)}
                      className="hover:text-[var(--text-primary)] hover:underline"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => handleCancelMeeting(meet.id)}
                      className="hover:text-rose-500 hover:underline"
                    >
                      Cancel Meeting
                    </button>
                  </div>
                )}
              </div>

            </motion.div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. PAST MEETINGS (Max 10 Meetings)                                        */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
            Past Meetings History (Max 10)
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Completed Consultations</span>
        </div>

        <div className="neo-card rounded-[24px] border border-[var(--border-light)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" aria-label="Past Meetings Table">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[10px] font-mono uppercase text-[var(--text-tertiary)] bg-[var(--surface-recessed)]/50">
                  <th className="py-3.5 px-6 font-bold" scope="col">Meeting Title</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Date & Time</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Duration</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Host</th>
                  <th className="py-3.5 px-6 font-bold text-right" scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
                {filteredPast.map((m) => {
                  const matchingNote = noteList.find(n => n.meetingId === m.id);
                  return (
                    <tr key={m.id} className="hover:bg-[var(--surface-recessed)]/30 transition-colors">
                      <td className="py-4 px-6 font-bold text-[var(--text-primary)]">
                        <span className="block truncate max-w-sm">{m.title}</span>
                        <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">{m.type}</span>
                      </td>
                      <td className="py-4 px-6 font-mono text-[var(--text-tertiary)]">
                        {m.date}
                      </td>
                      <td className="py-4 px-6 font-mono text-[var(--text-secondary)]">
                        {m.duration}
                      </td>
                      <td className="py-4 px-6 font-medium text-[var(--text-primary)]">
                        {m.host.name}
                      </td>
                      <td className="py-4 px-6 text-right">
                        {matchingNote ? (
                          <button
                            onClick={() => setInspectingNote(matchingNote)}
                            className="neo-pill px-3.5 py-1.5 text-xs text-[var(--accent-primary)] hover:underline font-bold inline-flex items-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View Notes</span>
                          </button>
                        ) : (
                          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Archived</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MEETING NOTES & SUMMARIES                                              */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold flex items-center gap-2">
            <FileText className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Meeting Notes & Decision Records</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {noteList.map((note) => (
            <motion.div
              key={note.id}
              whileHover={{ y: -3 }}
              className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 hover:border-[var(--accent-primary)] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="badge-tag">Official Note</span>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{note.date}</span>
                </div>

                <h3 className="text-base font-extrabold text-[var(--text-primary)] leading-snug">{note.meetingTitle}</h3>
                
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed neo-inset p-3.5 rounded-xl">
                  {note.summary}
                </p>

                <div className="space-y-1.5 text-xs">
                  <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold block flex items-center gap-1">
                    <ListOrdered className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>Key Decisions ({note.keyDecisions.length})</span>
                  </span>
                  <ul className="list-disc list-inside text-[11px] text-[var(--text-secondary)] space-y-1">
                    {note.keyDecisions.slice(0, 2).map((kd, idx) => (
                      <li key={idx} className="truncate">{kd}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-end">
                <button
                  onClick={() => setInspectingNote(note)}
                  className="neo-btn text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Read Complete Notes</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. QUICK ACTIONS (4 Buttons)                                              */}
      {/* ========================================================================= */}
      <div className="space-y-3 pt-6 border-t border-[var(--border-subtle)]">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
          Quick Actions
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ y: -3 }}
            onClick={() => setIsBookModalOpen(true)}
            className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2.5 font-bold text-xs hover:border-[var(--accent-primary)] transition-all"
          >
            <Plus className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Book Meeting</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -3 }}
            onClick={() => {
              if (upcomingList[0]) window.open(upcomingList[0].meetUrl, '_blank');
            }}
            className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2.5 font-bold text-xs hover:border-[var(--accent-primary)] transition-all"
          >
            <Video className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Join Meeting</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -3 }}
            onClick={() => {
              if (noteList[0]) setInspectingNote(noteList[0]);
            }}
            className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2.5 font-bold text-xs hover:border-[var(--accent-primary)] transition-all"
          >
            <FileText className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>View Notes</span>
          </motion.button>

          <motion.button
            whileHover={{ y: -3 }}
            onClick={() => onNavigate && onNavigate('messages')}
            className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2.5 font-bold text-xs hover:border-[var(--accent-primary)] transition-all"
          >
            <MessageSquare className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Message PM</span>
          </motion.button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MEETING NOTES DETAIL INSPECT MODAL                                        */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {inspectingNote && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setInspectingNote(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[24px] max-w-2xl w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left"
            >
              <button
                onClick={() => setInspectingNote(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="badge-tag">{inspectingNote.date}</span>
                <h3 className="text-xl font-black text-[var(--text-primary)]">{inspectingNote.meetingTitle}</h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-bold text-[var(--accent-primary)] font-mono block mb-1">Meeting Summary</span>
                  <p className="neo-inset p-4 rounded-xl text-[var(--text-secondary)] leading-relaxed">
                    {inspectingNote.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-[var(--text-primary)] font-mono block mb-1">Key Decisions</span>
                    <ul className="neo-inset p-3 rounded-xl list-disc list-inside space-y-1 text-[11px] text-[var(--text-secondary)]">
                      {inspectingNote.keyDecisions.map((kd, idx) => (
                        <li key={idx}>{kd}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-[var(--text-primary)] font-mono block mb-1">Action Items</span>
                    <ul className="neo-inset p-3 rounded-xl list-disc list-inside space-y-1 text-[11px] text-[var(--text-secondary)]">
                      {inspectingNote.actionItems.map((ai, idx) => (
                        <li key={idx}>{ai}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {inspectingNote.filesDiscussed.length > 0 && (
                  <div>
                    <span className="font-bold text-[var(--text-primary)] font-mono block mb-1">Files Discussed</span>
                    <div className="flex flex-wrap gap-2">
                      {inspectingNote.filesDiscussed.map((f, idx) => (
                        <span key={idx} className="neo-pill px-3 py-1 text-[10px] font-mono font-bold text-[var(--text-secondary)] inline-flex items-center gap-1">
                          <FolderOpen className="w-3 h-3 text-[var(--accent-primary)]" />
                          <span>{f}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="font-bold text-[var(--text-primary)] font-mono block mb-1">Next Steps</span>
                  <p className="text-xs text-[var(--text-primary)] font-bold">{inspectingNote.nextSteps}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* BOOK MEETING MODAL (Simple Booking Flow)                                  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isBookModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setIsBookModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[24px] max-w-lg w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left"
            >
              <button
                onClick={() => setIsBookModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="badge-tag">Direct Agency Sync</span>
                <h3 className="text-xl font-black text-[var(--text-primary)]">Schedule Consultation</h3>
                <p className="text-xs text-[var(--text-secondary)]">Book a 30-min live Google Meet sync with Marcus Vance.</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                
                {/* Meeting Type Selection */}
                <div>
                  <label className="font-bold text-[var(--text-secondary)] block mb-1.5">Meeting Type</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      'Discovery Call',
                      'Project Discussion',
                      'Design Review',
                      'Development Update',
                      'Training Session',
                      'Support Call'
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type as MeetingType)}
                        className={`p-2.5 rounded-xl border text-left font-bold transition-all ${
                          selectedType === type
                            ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]'
                            : 'border-[var(--border-light)] text-[var(--text-secondary)]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[var(--text-tertiary)] block mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="neo-input text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[var(--text-tertiary)] block mb-1">Preferred Time</label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="neo-input text-xs font-mono"
                    >
                      <option>10:00 AM EST</option>
                      <option>11:30 AM EST</option>
                      <option>02:00 PM EST</option>
                      <option>04:30 PM EST</option>
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Additional Agenda Notes (Optional)</label>
                  <textarea
                    rows={3}
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    placeholder="Describe specific features or design files to review..."
                    className="neo-input text-xs"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsBookModalOpen(false)}
                    className="neo-btn text-xs py-2.5 px-5 font-bold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold inline-flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Booking</span>
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
