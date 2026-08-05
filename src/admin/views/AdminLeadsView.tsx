import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Eye,
  UserCheck,
  X,
  Video
} from 'lucide-react';
import type {
  AdminLead,
  LeadStage,
  LeadPriority,
  AdminConsultation,
  AdminFollowUp,
  AdminView
} from '../types';
import {
  mockAdminLeads,
  mockAdminConsultations,
  mockAdminFollowUps
} from '../adminData';

interface AdminLeadsViewProps {
  onNavigate?: (view: AdminView) => void;
}

export const AdminLeadsView: React.FC<AdminLeadsViewProps> = ({ onNavigate: _onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'all' | 'pipeline' | 'consultations' | 'followups' | 'won' | 'lost'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('All');
  
  // Data States
  const [leads, setLeads] = useState<AdminLead[]>(mockAdminLeads);
  const [consultations] = useState<AdminConsultation[]>(mockAdminConsultations);
  const [followUps, setFollowUps] = useState<AdminFollowUp[]>(mockAdminFollowUps);

  // Modals & Inspect States
  const [inspectingLead, setInspectingLead] = useState<AdminLead | null>(null);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Lead Form State
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadCompany, setNewLeadCompany] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadBudget, setNewLeadBudget] = useState('$50,000.00');
  const [newLeadService, setNewLeadService] = useState('Enterprise Web Platform');
  const [newLeadPriority, setNewLeadPriority] = useState<LeadPriority>('High');
  const [newLeadRequirements, setNewLeadRequirements] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Pipeline Columns (7 Stages)
  const pipelineStages: LeadStage[] = [
    'New Lead',
    'Contacted',
    'Qualified',
    'Proposal Sent',
    'Negotiation',
    'Won',
    'Lost'
  ];

  // Calculated Metrics for Dashboard Tab
  const metrics = useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter(l => l.stage === 'New Lead').length;
    const qualified = leads.filter(l => l.stage === 'Qualified' || l.stage === 'Proposal Sent' || l.stage === 'Negotiation').length;
    const won = leads.filter(l => l.stage === 'Won').length;
    const lost = leads.filter(l => l.stage === 'Lost').length;
    const upcomingConsultations = consultations.filter(c => c.status === 'Upcoming').length;

    return { total, newLeads, qualified, won, lost, upcomingConsultations };
  }, [leads, consultations]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchQuery = !searchQuery.trim() ||
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.phone.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchStage = selectedStageFilter === 'All' || l.stage === selectedStageFilter;
      return matchQuery && matchStage;
    });
  }, [leads, searchQuery, selectedStageFilter]);

  // Stage Move Handler (Kanban Drag / Button Move)
  const handleMoveStage = (leadId: string, newStage: LeadStage) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage, lastActivity: 'Just now' } : l));
    triggerToast(`Lead stage updated to "${newStage}"`);
  };

  // Create Lead Submit
  const handleCreateLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadCompany.trim()) return;

    const newLead: AdminLead = {
      id: `l-${Date.now()}`,
      name: newLeadName.trim(),
      company: newLeadCompany.trim(),
      email: newLeadEmail.trim() || 'inbound@client.com',
      phone: newLeadPhone.trim() || '+1 (555) 019-2831',
      budget: newLeadBudget,
      stage: 'New Lead',
      priority: newLeadPriority,
      service: newLeadService,
      source: 'Admin CRM Intake',
      assignedManager: {
        name: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
      },
      lastActivity: 'Just now',
      timeline: '6 Weeks',
      requirements: newLeadRequirements.trim() || 'Enterprise web platform requirement spec.',
      notes: ['Lead manually added by Admin team.'],
      date: 'Just now'
    };

    setLeads([newLead, ...leads]);
    setIsAddLeadModalOpen(false);
    setNewLeadName('');
    setNewLeadCompany('');
    setNewLeadRequirements('');
    triggerToast(`New Lead "${newLead.company}" added to CRM pipeline!`);
  };

  // Convert Lead to Client Action
  const handleConvertToClient = (lead: AdminLead) => {
    handleMoveStage(lead.id, 'Won');
    triggerToast(`Lead "${lead.company}" successfully converted to Active Client!`);
  };

  // Simulated CSV Export
  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Name,Company,Email,Phone,Budget,Stage,Priority\n" +
      leads.map(l => `${l.id},"${l.name}","${l.company}",${l.email},${l.phone},${l.budget},${l.stage},${l.priority}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Byte Build_CRM_Leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Leads CSV exported successfully!');
  };

  const getPriorityStyle = (p: LeadPriority) => {
    switch (p) {
      case 'Urgent': return 'text-rose-600 bg-rose-500/10 border-rose-500/30 animate-bounce font-extrabold';
      case 'High': return 'text-amber-600 bg-amber-500/10 border-amber-500/30 font-bold';
      case 'Medium': return 'text-blue-600 bg-blue-500/10 border-blue-500/30';
      case 'Low': return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getStageStyle = (s: LeadStage) => {
    switch (s) {
      case 'New Lead': return 'text-blue-600 bg-blue-500/10 border-blue-500/30';
      case 'Contacted': return 'text-purple-600 bg-purple-500/10 border-purple-500/30';
      case 'Qualified': return 'text-indigo-600 bg-indigo-500/10 border-indigo-500/30';
      case 'Proposal Sent': return 'text-amber-600 bg-amber-500/10 border-amber-500/30 animate-pulse';
      case 'Negotiation': return 'text-rose-600 bg-rose-500/10 border-rose-500/30';
      case 'Won': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30';
      case 'Lost': return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
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

      {/* Header & Sub-Navigation Bar */}
      <div className="border-b border-[var(--border-subtle)] pb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 neo-pill px-3 py-1 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>Enterprise CRM & Sales Pipeline</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              Leads & Opportunity Management
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="neo-pill px-3.5 py-2 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1.5 border border-[var(--border-light)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setIsAddLeadModalOpen(true)}
              className="neo-btn neo-btn-accent text-xs py-2 px-5 font-bold inline-flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Lead</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs border-t border-[var(--border-subtle)] pt-3">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'all', label: `All Leads (${leads.length})` },
            { id: 'pipeline', label: 'Pipeline (Kanban)' },
            { id: 'consultations', label: `Consultations (${consultations.length})` },
            { id: 'followups', label: `Follow-ups (${followUps.length})` },
            { id: 'won', label: `Won Deals (${metrics.won})` },
            { id: 'lost', label: `Lost Deals (${metrics.lost})` }
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

      {/* Search & Filter Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="neo-card p-2 rounded-2xl border border-[var(--border-light)] flex items-center px-3 text-xs w-full sm:w-80">
          <Search className="w-4 h-4 text-[var(--text-tertiary)] shrink-0 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lead name, company, email, phone..."
            className="bg-transparent w-full focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-xs font-medium"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-[var(--text-tertiary)]" />
          <span className="font-bold text-[var(--text-secondary)]">Stage Filter:</span>
          <select
            value={selectedStageFilter}
            onChange={(e) => setSelectedStageFilter(e.target.value)}
            className="neo-input text-xs py-1.5 px-3 w-40"
          >
            <option value="All">All Stages</option>
            {pipelineStages.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: LEADS DASHBOARD                                                   */}
      {/* ========================================================================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">New Inbound Leads</span>
              <span className="text-2xl font-black text-blue-600 font-mono block">{metrics.newLeads}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Awaiting initial contact</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Qualified Deals</span>
              <span className="text-2xl font-black text-purple-600 font-mono block">{metrics.qualified}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Active Proposals & Scope</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Consultations</span>
              <span className="text-2xl font-black text-amber-600 font-mono block">{metrics.upcomingConsultations}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Scheduled Google Meet syncs</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Won Deals</span>
              <span className="text-2xl font-black text-emerald-600 font-mono block">{metrics.won}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Converted into Active Clients</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Lost Deals</span>
              <span className="text-2xl font-black text-gray-500 font-mono block">{metrics.lost}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)] font-bold">Archived Inquiries</span>
            </div>
          </div>

          {/* High-Value Inbound Lead Highlights Grid */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
              High Priority Sales Opportunities ({filteredLeads.length})
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredLeads.map((lead) => (
                <motion.div
                  key={lead.id}
                  whileHover={{ y: -3 }}
                  className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 flex flex-col justify-between hover:border-[var(--accent-primary)] transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold border ${getStageStyle(lead.stage)}`}>
                        {lead.stage}
                      </span>
                      <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getPriorityStyle(lead.priority)}`}>
                        {lead.priority} Priority
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-[var(--text-primary)] leading-snug">{lead.company}</h3>
                      <p className="text-[11px] font-mono text-[var(--accent-primary)] mt-0.5">{lead.service}</p>
                    </div>

                    <div className="neo-inset p-3.5 rounded-xl space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-tertiary)]">Estimated Budget</span>
                        <span className="font-extrabold text-[var(--text-primary)]">{lead.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-tertiary)]">Lead Contact</span>
                        <span className="font-bold text-[var(--text-primary)]">{lead.name} ({lead.email})</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={lead.assignedManager.avatar} alt={lead.assignedManager.name} className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-[11px] font-mono text-[var(--text-secondary)] font-bold">{lead.assignedManager.name}</span>
                    </div>

                    <button
                      onClick={() => setInspectingLead(lead)}
                      className="neo-btn text-xs py-1.5 px-4 font-bold inline-flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ALL LEADS TABLE                                                    */}
      {/* ========================================================================= */}
      {activeTab === 'all' && (
        <div className="neo-card rounded-[24px] border border-[var(--border-light)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" aria-label="All Leads Table">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[10px] font-mono uppercase text-[var(--text-tertiary)] bg-[var(--surface-recessed)]/50">
                  <th className="py-3.5 px-6 font-bold" scope="col">Company / Lead</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Service Interested</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Estimated Budget</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Stage</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Priority</th>
                  <th className="py-3.5 px-6 font-bold" scope="col">Assigned Manager</th>
                  <th className="py-3.5 px-6 font-bold text-right" scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
                {filteredLeads.map((l) => (
                  <tr key={l.id} className="hover:bg-[var(--surface-recessed)]/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-[var(--text-primary)]">
                      <span className="block">{l.company}</span>
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">{l.name} ({l.phone})</span>
                    </td>
                    <td className="py-4 px-6 font-mono text-[var(--accent-primary)] font-bold">
                      {l.service}
                    </td>
                    <td className="py-4 px-6 font-mono font-extrabold text-[var(--text-primary)]">
                      {l.budget}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold border ${getStageStyle(l.stage)}`}>
                        {l.stage}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getPriorityStyle(l.priority)}`}>
                        {l.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[var(--text-secondary)] font-medium">
                      {l.assignedManager.name}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setInspectingLead(l)}
                        className="neo-pill px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold inline-flex items-center gap-1"
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
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PIPELINE (7-COLUMN KANBAN BOARD)                                    */}
      {/* ========================================================================= */}
      {activeTab === 'pipeline' && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[1200px]">
            {pipelineStages.map((stage) => {
              const stageLeads = filteredLeads.filter(l => l.stage === stage);
              return (
                <div
                  key={stage}
                  className="w-72 neo-card rounded-[22px] border border-[var(--border-light)] p-4 flex flex-col justify-between shrink-0 space-y-3 bg-[var(--surface-recessed)]/30"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                    <span className="text-xs font-black text-[var(--text-primary)]">{stage}</span>
                    <span className="neo-pill px-2 py-0.5 text-[10px] font-mono font-bold text-[var(--accent-primary)]">
                      {stageLeads.length}
                    </span>
                  </div>

                  {/* Cards Feed */}
                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[550px] pr-1">
                    {stageLeads.map((lead) => (
                      <motion.div
                        key={lead.id}
                        whileHover={{ scale: 1.02 }}
                        className="neo-card p-4 rounded-xl border border-[var(--border-light)] space-y-2.5 hover:border-[var(--accent-primary)] transition-all text-left"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`neo-pill px-2 py-0.5 text-[9px] font-mono uppercase border ${getPriorityStyle(lead.priority)}`}>
                            {lead.priority}
                          </span>
                          <span className="text-[10px] font-mono font-extrabold text-[var(--accent-primary)]">
                            {lead.budget}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs font-black text-[var(--text-primary)]">{lead.company}</h4>
                          <p className="text-[10px] font-mono text-[var(--text-tertiary)]">{lead.service}</p>
                        </div>

                        {/* Quick Stage Shift Dropdown */}
                        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
                          <button
                            onClick={() => setInspectingLead(lead)}
                            className="text-[10px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Details</span>
                          </button>

                          <select
                            value={lead.stage}
                            onChange={(e) => handleMoveStage(lead.id, e.target.value as LeadStage)}
                            className="bg-transparent text-[10px] font-mono font-bold text-[var(--accent-primary)] focus:outline-none cursor-pointer"
                          >
                            {pipelineStages.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: CONSULTATIONS MANAGER                                              */}
      {/* ========================================================================= */}
      {activeTab === 'consultations' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Client Sales Consultations ({consultations.length})
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {consultations.map((c) => (
              <div key={c.id} className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className={`neo-pill px-3 py-1 text-[10px] font-mono uppercase font-bold border ${
                    c.status === 'Upcoming' ? 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30' : 'text-gray-500 bg-gray-500/10'
                  }`}>
                    {c.status}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{c.date}</span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[var(--text-primary)]">{c.company}</h3>
                  <p className="text-xs text-[var(--text-secondary)]">Lead: {c.clientName}</p>
                </div>

                <div className="neo-inset p-3 rounded-xl text-xs font-mono space-y-1">
                  <p className="text-[var(--text-primary)] font-bold">Time: {c.time}</p>
                  <p className="text-[var(--text-tertiary)]">Assigned: {c.assignedMember}</p>
                </div>

                <a
                  href={c.meetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn neo-btn-accent text-xs py-2.5 px-4 font-bold flex-1 justify-center inline-flex items-center gap-1.5 w-full"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Sales Call</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: FOLLOW-UPS MANAGER                                                 */}
      {/* ========================================================================= */}
      {activeTab === 'followups' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Scheduled Follow-ups & Reminders ({followUps.length})
          </span>

          <div className="neo-card rounded-[24px] border border-[var(--border-light)] overflow-hidden">
            <div className="divide-y divide-[var(--border-subtle)] text-xs">
              {followUps.map((f) => (
                <div key={f.id} className="p-4 flex items-center justify-between gap-4 hover:bg-[var(--surface-recessed)]/30 transition-colors text-left">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[var(--text-primary)]">{f.company}</span>
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)]">({f.leadName})</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">{f.reminder}</p>
                  </div>

                  <div className="flex items-center gap-4 text-right shrink-0 font-mono text-[11px]">
                    <div>
                      <span className="text-[var(--accent-primary)] font-bold block">Due: {f.nextDate}</span>
                      <span className="text-[var(--text-tertiary)] block">Assigned: {f.assignedPerson}</span>
                    </div>

                    <button
                      onClick={() => {
                        setFollowUps(prev => prev.map(item => item.id === f.id ? { ...item, status: 'Completed' } : item));
                        triggerToast('Follow-up marked completed!');
                      }}
                      className={`neo-pill px-3 py-1.5 font-bold ${f.status === 'Completed' ? 'text-emerald-600 bg-emerald-500/10' : 'text-amber-600 bg-amber-500/10'}`}
                    >
                      {f.status === 'Completed' ? 'Completed ✓' : 'Mark Done'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TABS 6 & 7: WON & LOST DEALS                                              */}
      {/* ========================================================================= */}
      {(activeTab === 'won' || activeTab === 'lost') && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            {activeTab === 'won' ? 'Won Deals (Converted Clients)' : 'Archived / Lost Deals'}
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leads.filter(l => (activeTab === 'won' ? l.stage === 'Won' : l.stage === 'Lost')).map((l) => (
              <div key={l.id} className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span className={`neo-pill px-3 py-1 text-[10px] font-mono uppercase font-bold border ${getStageStyle(l.stage)}`}>
                    {l.stage}
                  </span>
                  <span className="text-xs font-mono font-extrabold text-[var(--accent-primary)]">{l.budget}</span>
                </div>
                <h3 className="text-base font-extrabold text-[var(--text-primary)]">{l.company}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{l.service} • {l.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LEAD DETAILS INSPECT MODAL                                                */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {inspectingLead && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setInspectingLead(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[24px] max-w-2xl w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left"
            >
              <button
                onClick={() => setInspectingLead(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold border ${getStageStyle(inspectingLead.stage)}`}>
                    {inspectingLead.stage}
                  </span>
                  <span className="text-xs font-mono text-[var(--accent-primary)] font-extrabold">{inspectingLead.budget}</span>
                </div>
                <h3 className="text-xl font-black text-[var(--text-primary)]">{inspectingLead.company}</h3>
                <p className="text-xs font-mono text-[var(--text-tertiary)]">{inspectingLead.service} • Contact: {inspectingLead.name}</p>
              </div>

              <div className="neo-inset p-4 rounded-xl space-y-2 text-xs font-mono">
                <p className="text-[var(--text-primary)] font-bold">Requirements & Scope:</p>
                <p className="text-[var(--text-secondary)] font-sans leading-relaxed">{inspectingLead.requirements}</p>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-bold text-[var(--text-primary)] font-mono block">Sales Activity Notes</span>
                <ul className="neo-inset p-3.5 rounded-xl list-disc list-inside space-y-1 text-[11px] text-[var(--text-secondary)]">
                  {inspectingLead.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>

              {/* Quick Actions for Lead */}
              <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    handleConvertToClient(inspectingLead);
                    setInspectingLead(null);
                  }}
                  className="neo-btn neo-btn-accent text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Convert to Active Client</span>
                </button>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <button
                    onClick={() => {
                      handleMoveStage(inspectingLead.id, 'Lost');
                      setInspectingLead(null);
                    }}
                    className="text-rose-500 hover:underline"
                  >
                    Archive Lead
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* ADD LEAD MODAL                                                            */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isAddLeadModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setIsAddLeadModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[24px] max-w-lg w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left"
            >
              <button
                onClick={() => setIsAddLeadModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="badge-tag">Sales Intake</span>
                <h3 className="text-xl font-black text-[var(--text-primary)]">Add New Inbound Lead</h3>
                <p className="text-xs text-[var(--text-secondary)]">Create a new prospect card inside your CRM sales pipeline.</p>
              </div>

              <form onSubmit={handleCreateLeadSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[var(--text-tertiary)] block mb-1">Company Name</label>
                    <input
                      type="text"
                      required
                      value={newLeadCompany}
                      onChange={(e) => setNewLeadCompany(e.target.value)}
                      placeholder="e.g. Apex Global Group..."
                      className="neo-input text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[var(--text-tertiary)] block mb-1">Contact Name</label>
                    <input
                      type="text"
                      required
                      value={newLeadName}
                      onChange={(e) => setNewLeadName(e.target.value)}
                      placeholder="e.g. Marcus Vance..."
                      className="neo-input text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[var(--text-tertiary)] block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={newLeadEmail}
                      onChange={(e) => setNewLeadEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="neo-input text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[var(--text-tertiary)] block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={newLeadPhone}
                      onChange={(e) => setNewLeadPhone(e.target.value)}
                      placeholder="+1 (555) 019-2831"
                      className="neo-input text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[var(--text-tertiary)] block mb-1">Service Requested</label>
                    <input
                      type="text"
                      value={newLeadService}
                      onChange={(e) => setNewLeadService(e.target.value)}
                      placeholder="e.g. 3D WebGL Showcase..."
                      className="neo-input text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[var(--text-tertiary)] block mb-1">Estimated Budget</label>
                    <input
                      type="text"
                      value={newLeadBudget}
                      onChange={(e) => setNewLeadBudget(e.target.value)}
                      placeholder="$50,000.00"
                      className="neo-input text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Priority Level</label>
                  <select
                    value={newLeadPriority}
                    onChange={(e) => setNewLeadPriority(e.target.value as LeadPriority)}
                    className="neo-input text-xs font-bold"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Project Scope Requirements</label>
                  <textarea
                    rows={3}
                    value={newLeadRequirements}
                    onChange={(e) => setNewLeadRequirements(e.target.value)}
                    placeholder="Describe custom WebGL, HIPAA intake, or mobile requirements..."
                    className="neo-input text-xs"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddLeadModalOpen(false)}
                    className="neo-btn text-xs py-2.5 px-5 font-bold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to CRM</span>
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
