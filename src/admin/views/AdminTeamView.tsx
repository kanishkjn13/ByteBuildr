import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck,
  Search,
  Filter,
  LayoutGrid,
  List,
  Eye,
  CheckCircle2,
  Shield,
  X,
  UserPlus,
  Check
} from 'lucide-react';
import type {
  AdminTeamMember,
  AdminRoleItem,
  TeamAvailabilityStatus,
  AdminView
} from '../types';
import { mockAdminTeam, mockAdminRoles } from '../adminData';

interface AdminTeamViewProps {
  onNavigate?: (view: AdminView) => void;
}

export const AdminTeamView: React.FC<AdminTeamViewProps> = ({ onNavigate: _onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'all' | 'assignments' | 'availability' | 'roles' | 'activity'>('dashboard');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('All');

  // Data State
  const [teamMembers, setTeamMembers] = useState<AdminTeamMember[]>(mockAdminTeam);
  const [roles] = useState<AdminRoleItem[]>(mockAdminRoles);
  const [inspectingMember, setInspectingMember] = useState<AdminTeamMember | null>(null);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Frontend Developer');
  const [newMemberEmail, setNewMemberEmail] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const metrics = useMemo(() => {
    const total = teamMembers.length;
    const available = teamMembers.filter(m => m.status === 'Available').length;
    const busy = teamMembers.filter(m => m.status === 'Busy').length;
    const projectsAssigned = teamMembers.reduce((acc, m) => acc + m.assignedProjects.length, 0);
    const upcomingDeadlines = 3;
    return { total, available, busy, projectsAssigned, upcomingDeadlines };
  }, [teamMembers]);

  // Filtered Members
  const filteredMembers = useMemo(() => {
    return teamMembers.filter(m => {
      const matchQuery = !searchQuery.trim() ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchRole = selectedRoleFilter === 'All' || m.role === selectedRoleFilter;
      return matchQuery && matchRole;
    });
  }, [teamMembers, searchQuery, selectedRoleFilter]);

  const getStatusBadge = (status: TeamAvailabilityStatus) => {
    switch (status) {
      case 'Available': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30 font-bold';
      case 'Busy': return 'text-amber-600 bg-amber-500/10 border-amber-500/30 font-bold';
      case 'On Leave': return 'text-blue-600 bg-blue-500/10 border-blue-500/30 font-bold';
      case 'Offline': return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newMember: AdminTeamMember = {
      id: `tm-${Date.now()}`,
      name: newMemberName.trim(),
      role: newMemberRole,
      department: 'Engineering & Delivery',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      email: newMemberEmail.trim() || 'member@bytebuild.dev',
      phone: '+1 (415) 555-0100',
      status: 'Available',
      workloadCapacity: 20,
      workingHours: '09:00 AM - 05:00 PM EST',
      assignedProjects: [],
      completedProjectsCount: 0,
      skills: ['TypeScript', 'Vite', 'React 18'],
      lastActivity: 'Just added'
    };

    setTeamMembers([...teamMembers, newMember]);
    setIsAddMemberModalOpen(false);
    setNewMemberName('');
    setNewMemberEmail('');
    triggerToast(`Team member "${newMember.name}" added to Byte Build roster!`);
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
              <UserCheck className="w-3.5 h-3.5" />
              <span>Enterprise Team Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              Team & Capacity Management
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddMemberModalOpen(true)}
              className="neo-btn neo-btn-accent text-xs py-2 px-5 font-bold inline-flex items-center gap-2 shrink-0"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Team Member</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs border-t border-[var(--border-subtle)] pt-3">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'all', label: `All Members (${metrics.total})` },
            { id: 'assignments', label: 'Project Assignments' },
            { id: 'availability', label: `Availability (${metrics.available} Available)` },
            { id: 'roles', label: 'Roles & Permissions' },
            { id: 'activity', label: 'Team Activity Log' }
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
            placeholder="Search member name, role, email..."
            className="bg-transparent w-full focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-xs font-medium"
          />
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--text-tertiary)]" />
            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
              className="neo-input text-xs py-1.5 px-3 w-44"
            >
              <option value="All">All Roles</option>
              <option value="Senior Product Architect">Senior Product Architect</option>
              <option value="Lead UI/UX Designer">Lead UI/UX Designer</option>
              <option value="Full-Stack React Engineer">Full-Stack React Engineer</option>
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
      {/* TAB 1: TEAM DASHBOARD                                                     */}
      {/* ========================================================================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          
          {/* Summary Telemetry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Total Team</span>
              <span className="text-2xl font-black text-[var(--text-primary)] font-mono block">{metrics.total}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Verified Agency Roster</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Available Today</span>
              <span className="text-2xl font-black text-emerald-600 font-mono block">{metrics.available}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Ready for Sprint Intake</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Busy Members</span>
              <span className="text-2xl font-black text-amber-600 font-mono block">{metrics.busy}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">High Capacity Sprints</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Active Assignments</span>
              <span className="text-2xl font-black text-purple-600 font-mono block">{metrics.projectsAssigned}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Projects Currently Assigned</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Upcoming Deadlines</span>
              <span className="text-2xl font-black text-blue-600 font-mono block">{metrics.upcomingDeadlines}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Next 14 Days</span>
            </div>
          </div>

          {/* Team Member Roster Grid */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
              Agency Team Roster ({filteredMembers.length})
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <motion.div
                  key={member.id}
                  whileHover={{ y: -3 }}
                  className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 flex flex-col justify-between hover:border-[var(--accent-primary)] transition-all text-left"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getStatusBadge(member.status)}`}>
                        {member.status}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{member.email}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-2xl object-cover border border-[var(--border-light)]" />
                      <div>
                        <h3 className="text-base font-extrabold text-[var(--text-primary)]">{member.name}</h3>
                        <p className="text-xs font-mono text-[var(--accent-primary)] font-bold">{member.role}</p>
                      </div>
                    </div>

                    {/* Workload Capacity Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-[var(--text-tertiary)]">Workload Capacity</span>
                        <span className="font-extrabold text-[var(--text-primary)]">{member.workloadCapacity}%</span>
                      </div>
                      <div className="w-full bg-[var(--surface-recessed)] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[var(--accent-primary)] h-full transition-all" style={{ width: `${member.workloadCapacity}%` }} />
                      </div>
                    </div>

                    <div className="neo-inset p-3 rounded-xl space-y-1 text-xs font-mono">
                      <span className="text-[10px] text-[var(--text-tertiary)] block">Active Projects:</span>
                      <span className="font-bold text-[var(--text-primary)] block truncate">
                        {member.assignedProjects.map(p => p.name).join(', ') || 'No active projects'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{member.workingHours}</span>
                    <button
                      onClick={() => setInspectingMember(member)}
                      className="neo-btn text-xs py-1.5 px-4 font-bold inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Profile</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ALL MEMBERS (GRID OR LIST)                                         */}
      {/* ========================================================================= */}
      {activeTab === 'all' && (
        <div>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredMembers.map((m) => (
                <motion.div key={m.id} whileHover={{ y: -3 }} className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-2xl object-cover" />
                    <div>
                      <h3 className="text-base font-extrabold text-[var(--text-primary)]">{m.name}</h3>
                      <p className="text-xs font-mono text-[var(--accent-primary)]">{m.role}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getStatusBadge(m.status)}`}>{m.status}</span>
                    <button onClick={() => setInspectingMember(m)} className="neo-btn text-xs py-1.5 px-4 font-bold">Inspect Profile</button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="neo-card rounded-[24px] border border-[var(--border-light)] overflow-hidden">
              <table className="w-full text-left border-collapse" aria-label="Team Members Table">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] text-[10px] font-mono uppercase text-[var(--text-tertiary)] bg-[var(--surface-recessed)]/50">
                    <th className="py-3.5 px-6 font-bold" scope="col">Member Name</th>
                    <th className="py-3.5 px-6 font-bold" scope="col">Role & Department</th>
                    <th className="py-3.5 px-6 font-bold" scope="col">Status</th>
                    <th className="py-3.5 px-6 font-bold" scope="col">Workload</th>
                    <th className="py-3.5 px-6 font-bold text-right" scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
                  {filteredMembers.map((m) => (
                    <tr key={m.id} className="hover:bg-[var(--surface-recessed)]/30 transition-colors">
                      <td className="py-4 px-6 font-bold text-[var(--text-primary)]">
                        <span className="block">{m.name}</span>
                        <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">{m.email}</span>
                      </td>
                      <td className="py-4 px-6 font-mono text-[var(--accent-primary)] font-bold">
                        {m.role}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getStatusBadge(m.status)}`}>{m.status}</span>
                      </td>
                      <td className="py-4 px-6 font-mono font-extrabold text-[var(--text-primary)]">
                        {m.workloadCapacity}%
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button onClick={() => setInspectingMember(m)} className="neo-pill px-3 py-1.5 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Profile</button>
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
      {/* TAB 3: PROJECT ASSIGNMENTS                                                */}
      {/* ========================================================================= */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Current Project Assignments & Capacity
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((m) => (
              <div key={m.id} className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <h3 className="text-sm font-extrabold text-[var(--text-primary)]">{m.name}</h3>
                      <p className="text-[10px] font-mono text-[var(--accent-primary)]">{m.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold neo-pill px-2.5 py-1">{m.assignedProjects.length} Projects</span>
                </div>

                <div className="space-y-2">
                  {m.assignedProjects.map((p) => (
                    <div key={p.id} className="neo-inset p-3 rounded-xl flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="font-bold text-[var(--text-primary)] block">{p.name}</span>
                        <span className="text-[10px] text-[var(--text-tertiary)] block">Role: {p.role}</span>
                      </div>
                      <span className="text-[10px] text-[var(--accent-primary)] font-bold">Due: {p.deadline}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: AVAILABILITY BOARD                                                 */}
      {/* ========================================================================= */}
      {activeTab === 'availability' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Real-Time Availability & Working Hours
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((m) => (
              <div key={m.id} className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span className={`neo-pill px-3 py-1 text-[10px] font-mono uppercase border ${getStatusBadge(m.status)}`}>{m.status}</span>
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{m.workingHours}</span>
                </div>
                <h3 className="text-base font-extrabold text-[var(--text-primary)]">{m.name}</h3>
                <p className="text-xs text-[var(--text-secondary)] font-mono">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: ROLES & PERMISSIONS                                                */}
      {/* ========================================================================= */}
      {activeTab === 'roles' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Agency Roles & Permission Matrices ({roles.length})
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((r) => (
              <div key={r.id} className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 text-left">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[var(--accent-primary)]" />
                    <h3 className="text-sm font-extrabold text-[var(--text-primary)]">{r.title}</h3>
                  </div>
                  <span className="neo-pill px-2.5 py-0.5 text-[10px] font-mono font-bold">{r.memberCount} Members</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold block">Granted Permissions</span>
                  <ul className="neo-inset p-3.5 rounded-xl space-y-1 text-xs text-[var(--text-secondary)]">
                    {r.permissions.map((p, idx) => (
                      <li key={idx} className="flex items-center gap-2 font-mono text-[11px]">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: TEAM ACTIVITY LOG                                                  */}
      {/* ========================================================================= */}
      {activeTab === 'activity' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Team Operation & Assignment Stream
          </span>

          <div className="neo-card rounded-[24px] border border-[var(--border-light)] p-5 space-y-3">
            {[
              { id: 'ta-1', title: 'Marcus Vance assigned to Sterling VC Portfolio Portal', time: '10 min ago' },
              { id: 'ta-2', title: 'Elena Rostova status changed to Available', time: 'Yesterday' },
              { id: 'ta-3', title: 'David Chen completed 85% React Frontend Sprint', time: '2 days ago' }
            ].map((act) => (
              <div key={act.id} className="neo-inset p-4 rounded-xl flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[var(--text-primary)]">{act.title}</span>
                <span className="text-[10px] text-[var(--text-tertiary)]">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TEAM MEMBER PROFILE INSPECTION MODAL                                      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {inspectingMember && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setInspectingMember(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[28px] max-w-2xl w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left"
            >
              <button
                onClick={() => setInspectingMember(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4">
                <img src={inspectingMember.avatar} alt={inspectingMember.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-[var(--accent-primary)]" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getStatusBadge(inspectingMember.status)}`}>
                      {inspectingMember.status}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-tertiary)]">{inspectingMember.workingHours}</span>
                  </div>
                  <h2 className="text-xl font-black text-[var(--text-primary)]">{inspectingMember.name}</h2>
                  <p className="text-xs font-mono text-[var(--accent-primary)] font-bold">{inspectingMember.role} • {inspectingMember.department}</p>
                </div>
              </div>

              {/* Skills Tag Cloud */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[var(--text-primary)] font-mono block">Technical Skills & Expertise</span>
                <div className="flex flex-wrap gap-2">
                  {inspectingMember.skills.map((s, idx) => (
                    <span key={idx} className="neo-pill px-3 py-1 text-xs font-mono font-bold text-[var(--accent-primary)] border border-[var(--border-light)]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Active Projects */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[var(--text-primary)] font-mono block">Active Project Assignments</span>
                <div className="space-y-2">
                  {inspectingMember.assignedProjects.map((p) => (
                    <div key={p.id} className="neo-inset p-3 rounded-xl flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-[var(--text-primary)]">{p.name}</span>
                      <span className="text-[10px] text-[var(--accent-primary)] font-bold">Role: {p.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{inspectingMember.email}</span>
                <button
                  onClick={() => {
                    setInspectingMember(null);
                    triggerToast(`Assigned new project to ${inspectingMember.name}`);
                  }}
                  className="neo-btn neo-btn-accent text-xs py-2 px-5 font-bold"
                >
                  Assign New Project
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD MEMBER MODAL */}
      <AnimatePresence>
        {isAddMemberModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setIsAddMemberModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[24px] max-w-md w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left"
            >
              <button onClick={() => setIsAddMemberModalOpen(false)} className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="badge-tag">Roster Intake</span>
                <h3 className="text-xl font-black text-[var(--text-primary)]">Add Team Member</h3>
              </div>

              <form onSubmit={handleAddMemberSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Full Name</label>
                  <input type="text" required value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} placeholder="e.g. David Chen..." className="neo-input text-xs" />
                </div>

                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Role</label>
                  <input type="text" required value={newMemberRole} onChange={(e) => setNewMemberRole(e.target.value)} placeholder="e.g. Full-Stack React Engineer..." className="neo-input text-xs" />
                </div>

                <div>
                  <label className="font-bold text-[var(--text-tertiary)] block mb-1">Email</label>
                  <input type="email" value={newMemberEmail} onChange={(e) => setNewMemberEmail(e.target.value)} placeholder="david@bytebuild.dev" className="neo-input text-xs font-mono" />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsAddMemberModalOpen(false)} className="neo-btn text-xs py-2.5 px-5 font-bold">Cancel</button>
                  <button type="submit" className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold">Add to Team</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
