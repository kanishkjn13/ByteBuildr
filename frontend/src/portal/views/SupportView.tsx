import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LifeBuoy,
  Plus,
  Search,
  MessageSquare,
  Calendar,
  Send,
  X,
  CheckCircle2,
  ChevronDown,
  Paperclip,
  HelpCircle,
  History
} from 'lucide-react';
import type {
  SupportTicketItem,
  TicketCategory,
  TicketPriority,
  TicketStatus,
  ClientProfile,
  PortalView
} from '../types';
import { mockSupportTickets, mockTicketHistory, mockSupportFAQs } from '../portalData';

interface SupportViewProps {
  tickets?: SupportTicketItem[];
  historyTickets?: SupportTicketItem[];
  faqs?: Array<{ question: string; answer: string }>;
  profile: ClientProfile;
  onNavigate?: (view: PortalView) => void;
}

export const SupportView: React.FC<SupportViewProps> = ({
  tickets = mockSupportTickets,
  historyTickets = mockTicketHistory,
  faqs = mockSupportFAQs,
  profile,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketList, setTicketList] = useState<SupportTicketItem[]>(tickets);
  const [historyList] = useState<SupportTicketItem[]>(historyTickets);
  
  // Modals & Active Ticket States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [inspectingTicket, setInspectingTicket] = useState<SupportTicketItem | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  
  // Ticket Reply Input inside Ticket Details Modal
  const [replyText, setReplyText] = useState('');
  
  // Create Ticket Form State
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<TicketCategory>('Technical Issue');
  const [priority, setPriority] = useState<TicketPriority>('High');
  const [description, setDescription] = useState('');
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [ticketToast, setTicketToast] = useState<string | null>(null);

  // Search Filter
  const filteredOpen = useMemo(() => {
    if (!searchQuery.trim()) return ticketList.slice(0, 10);
    const q = searchQuery.toLowerCase().trim();
    return ticketList.filter(
      t => t.ticketId.toLowerCase().includes(q) ||
           t.subject.toLowerCase().includes(q) ||
           t.projectName.toLowerCase().includes(q) ||
           t.status.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [ticketList, searchQuery]);

  const filteredHistory = useMemo(() => {
    if (!searchQuery.trim()) return historyList.slice(0, 20);
    const q = searchQuery.toLowerCase().trim();
    return historyList.filter(
      t => t.ticketId.toLowerCase().includes(q) ||
           t.subject.toLowerCase().includes(q) ||
           t.projectName.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [historyList, searchQuery]);

  // Handle Create Ticket Form Submit
  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    const newTicket: SupportTicketItem = {
      id: `t-${Date.now()}`,
      ticketId: `TICK-2026-0${Math.floor(Math.random() * 90 + 10)}`,
      subject: subject.trim(),
      projectName: 'Aura Health Flagship Platform',
      category,
      priority,
      status: 'Open',
      createdDate: 'Just now',
      lastUpdated: 'Just now',
      assignedTo: {
        name: 'Marcus Vance',
        role: 'Senior Product Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
      },
      description: description.trim(),
      conversation: [
        {
          id: `tm-${Date.now()}`,
          sender: profile.name,
          role: 'Client',
          avatar: profile.photoUrl,
          text: description.trim(),
          timestamp: 'Just now',
          isAgency: false,
          attachment: attachmentName || undefined
        }
      ]
    };

    setTicketList([newTicket, ...ticketList]);
    setIsCreateModalOpen(false);
    setSubject('');
    setDescription('');
    setAttachmentName(null);
    setTicketToast(`Ticket ${newTicket.ticketId} created! Assigned to Marcus Vance (Response SLA <12h).`);
    setTimeout(() => setTicketToast(null), 4500);
  };

  // Handle Send Reply inside Ticket Inspect Modal
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !inspectingTicket) return;

    const newReply = {
      id: `tm-${Date.now()}`,
      sender: profile.name,
      role: 'Client',
      avatar: profile.photoUrl,
      text: replyText.trim(),
      timestamp: 'Just now',
      isAgency: false
    };

    const updated = {
      ...inspectingTicket,
      lastUpdated: 'Just now',
      status: 'In Progress' as TicketStatus,
      conversation: [...inspectingTicket.conversation, newReply]
    };

    setInspectingTicket(updated);
    setTicketList(prev => prev.map(t => t.id === updated.id ? updated : t));
    setReplyText('');
  };

  const getPriorityStyle = (p: TicketPriority) => {
    switch (p) {
      case 'Urgent': return 'text-rose-600 bg-rose-500/10 border-rose-500/30 font-extrabold animate-bounce';
      case 'High': return 'text-amber-600 bg-amber-500/10 border-amber-500/30 font-bold';
      case 'Medium': return 'text-blue-600 bg-blue-500/10 border-blue-500/30';
      case 'Low': return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getStatusStyle = (s: TicketStatus) => {
    switch (s) {
      case 'Open': return 'text-blue-600 bg-blue-500/10 border-blue-500/30';
      case 'In Progress': return 'text-amber-600 bg-amber-500/10 border-amber-500/30 animate-pulse';
      case 'Waiting for Client': return 'text-purple-600 bg-purple-500/10 border-purple-500/30';
      case 'Resolved': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30';
      case 'Closed': return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
      case 'Cancelled': return 'text-rose-600 bg-rose-500/10 border-rose-500/30';
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
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Dedicated Client Support Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
            Support & Help Desk
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            Submit technical tickets, track revision requests, communicate directly with your engineering team, and access instant agency guidance.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold shrink-0 inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Ticket</span>
        </button>
      </div>

      {/* Ticket Success Toast */}
      {ticketToast && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="neo-inset p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 flex items-center gap-3 text-xs text-emerald-600 font-bold"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{ticketToast}</span>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 2. QUICK ACTIONS (4 Large Buttons)                                       */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <motion.button
          whileHover={{ y: -3 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="neo-card p-5 rounded-2xl border border-[var(--border-light)] flex items-center justify-center gap-3 font-bold text-xs hover:border-[var(--accent-primary)] transition-all group"
        >
          <div className="w-9 h-9 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
            <Plus className="w-4 h-4" />
          </div>
          <span className="text-[var(--text-primary)]">Create Ticket</span>
        </motion.button>

        <motion.button
          whileHover={{ y: -3 }}
          onClick={() => {
            const el = document.getElementById('open-tickets-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="neo-card p-5 rounded-2xl border border-[var(--border-light)] flex items-center justify-center gap-3 font-bold text-xs hover:border-[var(--accent-primary)] transition-all group"
        >
          <div className="w-9 h-9 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
            <LifeBuoy className="w-4 h-4" />
          </div>
          <span className="text-[var(--text-primary)]">View Open Tickets</span>
        </motion.button>

        <motion.button
          whileHover={{ y: -3 }}
          onClick={() => onNavigate && onNavigate('messages')}
          className="neo-card p-5 rounded-2xl border border-[var(--border-light)] flex items-center justify-center gap-3 font-bold text-xs hover:border-[var(--accent-primary)] transition-all group"
        >
          <div className="w-9 h-9 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="text-[var(--text-primary)]">Message PM</span>
        </motion.button>

        <motion.button
          whileHover={{ y: -3 }}
          onClick={() => onNavigate && onNavigate('meetings')}
          className="neo-card p-5 rounded-2xl border border-[var(--border-light)] flex items-center justify-center gap-3 font-bold text-xs hover:border-[var(--accent-primary)] transition-all group"
        >
          <div className="w-9 h-9 rounded-xl neo-inset flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-[var(--text-primary)]">Book Support Call</span>
        </motion.button>
      </div>

      {/* ========================================================================= */}
      {/* 3. OPEN TICKETS (Max 10 Tickets)                                          */}
      {/* ========================================================================= */}
      <div id="open-tickets-section" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold">
            Active Support Tickets ({filteredOpen.length})
          </span>

          <div className="neo-card p-2 rounded-2xl border border-[var(--border-light)] flex items-center px-3 text-xs w-full sm:w-72">
            <Search className="w-4 h-4 text-[var(--text-tertiary)] shrink-0 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ticket #, subject, project..."
              className="bg-transparent w-full focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-xs font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOpen.map((ticket) => (
            <motion.div
              key={ticket.id}
              whileHover={{ y: -3 }}
              className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 flex flex-col justify-between hover:border-[var(--accent-primary)] transition-all"
            >
              <div className="space-y-3">
                
                {/* Status & Priority Header Badges */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold border ${getStatusStyle(ticket.status)}`}>
                      {ticket.status}
                    </span>
                    <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getPriorityStyle(ticket.priority)}`}>
                      {ticket.priority} Priority
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[var(--accent-primary)] font-extrabold">
                    {ticket.ticketId}
                  </span>
                </div>

                {/* Subject & Project */}
                <div>
                  <h3 className="text-base font-extrabold text-[var(--text-primary)] leading-snug">{ticket.subject}</h3>
                  <p className="text-[11px] font-mono text-[var(--text-tertiary)] mt-0.5">{ticket.projectName} • {ticket.category}</p>
                </div>

                {/* Assigned & Timestamp Info */}
                <div className="neo-inset p-3 rounded-xl flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-2">
                    <img src={ticket.assignedTo.avatar} alt={ticket.assignedTo.name} className="w-5 h-5 rounded-full object-cover" />
                    <span className="text-[var(--text-primary)] font-bold">{ticket.assignedTo.name}</span>
                  </div>
                  <span className="text-[var(--text-tertiary)]">Updated {ticket.lastUpdated}</span>
                </div>

              </div>

              {/* Action CTA */}
              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                  {ticket.conversation.length} Messages
                </span>

                <button
                  onClick={() => setInspectingTicket(ticket)}
                  className="neo-btn text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>View Conversation</span>
                </button>
              </div>

            </motion.div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. TICKET HISTORY (Max 20 Resolved / Closed Tickets)                      */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold flex items-center gap-2">
            <History className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Resolved Ticket History (Max 20)</span>
          </span>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Closed Support Log</span>
        </div>

        <div className="neo-card rounded-[24px] border border-[var(--border-light)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" aria-label="Ticket History Table">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[10px] font-mono uppercase text-[var(--text-tertiary)] bg-[var(--surface-recessed)]/50">
                  <th className="py-3.5 px-6 font-bold" scope="col">Ticket ID</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Subject</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Category</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Created Date</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Support Agent</th>
                  <th className="py-3.5 px-6 font-bold text-right" scope="col">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
                {filteredHistory.map((t) => (
                  <tr key={t.id} className="hover:bg-[var(--surface-recessed)]/30 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-[var(--text-primary)]">
                      {t.ticketId}
                    </td>
                    <td className="py-4 px-6 font-bold text-[var(--text-primary)]">
                      <span className="block truncate max-w-sm">{t.subject}</span>
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">{t.projectName}</span>
                    </td>
                    <td className="py-4 px-6 font-mono text-[var(--text-secondary)]">
                      {t.category}
                    </td>
                    <td className="py-4 px-6 font-mono text-[var(--text-tertiary)]">
                      {t.createdDate}
                    </td>
                    <td className="py-4 px-6 font-medium text-[var(--text-primary)]">
                      {t.assignedTo.name}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className={`neo-pill px-3 py-1 text-[10px] font-mono uppercase font-bold border ${getStatusStyle(t.status)}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. FAQs (3-5 Short Questions & Answers)                                  */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Frequently Asked Support Questions</span>
          </span>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="neo-card rounded-2xl border border-[var(--border-light)] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs flex items-center justify-between text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-[var(--text-tertiary)] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 text-xs text-[var(--text-secondary)] leading-relaxed neo-inset mx-4 mb-4 p-3.5 rounded-xl border-t border-[var(--border-subtle)]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TICKET DETAILS MODAL WITH DIRECT REPLY                                    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {inspectingTicket && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setInspectingTicket(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[24px] max-w-2xl w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left max-h-[85vh] flex flex-col"
            >
              <button
                onClick={() => setInspectingTicket(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] shrink-0"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1 shrink-0">
                <div className="flex items-center gap-2">
                  <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold border ${getStatusStyle(inspectingTicket.status)}`}>
                    {inspectingTicket.status}
                  </span>
                  <span className="text-xs font-mono text-[var(--accent-primary)] font-extrabold">
                    {inspectingTicket.ticketId}
                  </span>
                </div>
                <h3 className="text-xl font-black text-[var(--text-primary)]">{inspectingTicket.subject}</h3>
                <p className="text-xs font-mono text-[var(--text-tertiary)]">{inspectingTicket.projectName} • Assigned to {inspectingTicket.assignedTo.name}</p>
              </div>

              {/* Ticket Initial Description */}
              <div className="neo-inset p-4 rounded-xl text-xs text-[var(--text-secondary)] leading-relaxed shrink-0">
                <span className="font-bold text-[var(--text-primary)] block mb-1 font-mono">Original Inquiry</span>
                {inspectingTicket.description}
              </div>

              {/* Conversation Feed */}
              <div className="flex-1 overflow-y-auto space-y-3 min-h-[160px] pr-1">
                <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold block">
                  Support Conversation Feed ({inspectingTicket.conversation.length})
                </span>

                {inspectingTicket.conversation.map((msg) => (
                  <div key={msg.id} className={`p-3.5 rounded-xl text-xs space-y-1 ${msg.isAgency ? 'neo-inset text-[var(--text-primary)]' : 'neo-card border border-[var(--border-light)]'}`}>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-tertiary)]">
                      <span className="font-bold text-[var(--text-primary)]">{msg.sender} ({msg.role})</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="text-[var(--text-secondary)] leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Direct Reply Form Box */}
              <form onSubmit={handleSendReply} className="pt-3 border-t border-[var(--border-subtle)] space-y-3 shrink-0">
                <div className="neo-inset p-2.5 rounded-xl flex items-center gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Reply directly to Marcus Vance..."
                    className="bg-transparent w-full text-xs focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
                  />
                  <button
                    type="submit"
                    className="neo-btn neo-btn-accent text-xs py-1.5 px-4 font-bold inline-flex items-center gap-1.5 shrink-0"
                  >
                    <span>Reply</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* CREATE TICKET MODAL                                                       */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setIsCreateModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[24px] max-w-lg w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left"
            >
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="badge-tag">Agency Ticket Intake</span>
                <h3 className="text-xl font-black text-[var(--text-primary)]">Create Support Ticket</h3>
                <p className="text-xs text-[var(--text-secondary)]">Dispatched directly to Senior Product Architect Marcus Vance.</p>
              </div>

              <form onSubmit={handleCreateTicketSubmit} className="space-y-4 text-xs">
                
                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Stripe Payment Delay on Staging..."
                    className="neo-input text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[var(--text-tertiary)] block mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as TicketCategory)}
                      className="neo-input text-xs"
                    >
                      <option>General Question</option>
                      <option>Technical Issue</option>
                      <option>Bug Report</option>
                      <option>Revision Request</option>
                      <option>Billing</option>
                      <option>Meeting Request</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[var(--text-tertiary)] block mb-1">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as TicketPriority)}
                      className="neo-input text-xs font-bold"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Description</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details or steps to replicate..."
                    className="neo-input text-xs"
                  />
                </div>

                {/* Attachment Input */}
                <div>
                  <label className="neo-inset p-3 rounded-xl border border-dashed border-[var(--border-light)] flex items-center justify-between cursor-pointer">
                    <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
                      {attachmentName ? `Attached: ${attachmentName}` : 'Attach screenshot or file (Optional)'}
                    </span>
                    <Paperclip className="w-4 h-4 text-[var(--accent-primary)]" />
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setAttachmentName(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="neo-btn text-xs py-2.5 px-5 font-bold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Submit Ticket</span>
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
