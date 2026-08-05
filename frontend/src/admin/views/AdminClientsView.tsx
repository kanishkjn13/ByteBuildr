import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Search,
  Filter,
  Download,
  Plus,
  LayoutGrid,
  List,
  Eye,
  ExternalLink,
  FolderKanban,
  DollarSign,
  Calendar,
  MessageSquare,
  CheckCircle2,
  X,
  Globe,
  MapPin,
  Shield,
  Key,
  Copy,
  RefreshCw
} from 'lucide-react';
import type { AdminClientItem, AdminView } from '../types';
import { mockAdminClients } from '../adminData';

interface AdminClientsViewProps {
  onNavigate?: (view: AdminView) => void;
}

export const AdminClientsView: React.FC<AdminClientsViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'all' | 'active' | 'inactive' | 'companies' | 'activity'>('dashboard');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  
  // Data States
  const [clients, setClients] = useState<AdminClientItem[]>(mockAdminClients);
  const [inspectingClient, setInspectingClient] = useState<AdminClientItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin Account Provisioning Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<{
    clientId: string;
    company: string;
    email: string;
    password: string;
  } | null>(null);

  // Form inputs for new client organization
  const [newCompany, setNewCompany] = useState('');
  const [newClientId, setNewClientId] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newContactName, setNewContactName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newIndustry, setNewIndustry] = useState('Healthcare & Medical Tech');
  const [newAddress, setNewAddress] = useState('');

  const generateRandomId = () => `CLT-ORG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let pass = '';
    for (let i = 0; i < 10; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  };

  const handleOpenCreateModal = () => {
    setNewCompany('');
    setNewClientId(generateRandomId());
    setNewEmail('');
    setNewPassword(generateRandomPassword());
    setNewContactName('');
    setNewPhone('');
    setNewIndustry('Healthcare & Medical Tech');
    setNewAddress('');
    setCreatedCredentials(null);
    setIsCreateModalOpen(true);
  };

  const handleProvisionClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newEmail || !newPassword) return;

    const newClientItem: AdminClientItem = {
      id: newClientId.toLowerCase(),
      name: newContactName || 'Primary Representative',
      company: newCompany,
      email: newEmail,
      phone: newPhone || '+1 (415) 555-0100',
      industry: newIndustry,
      status: 'Onboarding',
      gstNumber: `TAX-${Date.now().toString().slice(-6)}`,
      website: `https://${newCompany.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      address: newAddress || '100 Enterprise Way',
      city: 'San Francisco',
      state: 'CA',
      country: 'United States',
      joinedDate: 'Just Now',
      lastActivity: 'Just now',
      activeProjects: [],
      projectManager: {
        name: 'Alexander Vance',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
      },
      outstandingBalance: '$0.00',
      totalPaid: '$0.00'
    };

    setClients(prev => [newClientItem, ...prev]);
    setCreatedCredentials({
      clientId: newClientId,
      company: newCompany,
      email: newEmail,
      password: newPassword
    });
    triggerToast(`Organization credentials created for ${newCompany}!`);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrics
  const metrics = useMemo(() => {
    const total = clients.length;
    const active = clients.filter(c => c.status === 'Active' || c.status === 'VIP Tier' || c.status === 'Onboarding').length;
    const inactive = clients.filter(c => c.status === 'Inactive').length;
    const projectsInProgress = clients.reduce((acc, c) => acc + c.activeProjects.length, 0);
    const outstandingPayments = '$22,500.00';
    return { total, active, inactive, projectsInProgress, outstandingPayments };
  }, [clients]);

  // Filtered Clients
  const filteredClients = useMemo(() => {
    return clients.filter(c => {
      const matchQuery = !searchQuery.trim() ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchIndustry = selectedIndustry === 'All' || c.industry === selectedIndustry;
      const matchTab = activeTab === 'all' || activeTab === 'dashboard' ||
        (activeTab === 'active' && (c.status === 'Active' || c.status === 'VIP Tier' || c.status === 'Onboarding')) ||
        (activeTab === 'inactive' && c.status === 'Inactive');

      return matchQuery && matchIndustry && matchTab;
    });
  }, [clients, searchQuery, selectedIndustry, activeTab]);

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Name,Company,Email,Phone,Industry,Status,Outstanding,Paid\n" +
      clients.map(c => `${c.id},"${c.name}","${c.company}",${c.email},${c.phone},"${c.industry}",${c.status},${c.outstandingBalance},${c.totalPaid}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Byte Build_Enterprise_Clients_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Client database exported to CSV successfully!');
  };

  const handleJumpToClientPortal = (client: AdminClientItem) => {
    triggerToast(`Launching Client Portal session for "${client.company}"...`);
    setTimeout(() => {
      window.location.href = '/portal';
    }, 1200);
  };

  const getStatusBadge = (status: AdminClientItem['status']) => {
    switch (status) {
      case 'VIP Tier': return 'text-amber-600 bg-amber-500/10 border-amber-500/30 font-extrabold shadow-xs';
      case 'Active': return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30 font-bold';
      case 'Onboarding': return 'text-blue-600 bg-blue-500/10 border-blue-500/30 font-bold';
      case 'Inactive': return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
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

      {/* Header & Sub-Nav Bar */}
      <div className="border-b border-[var(--border-subtle)] pb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 neo-pill px-3 py-1 text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold mb-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>Enterprise Client Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              Clients & Customer Telemetry
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
              onClick={handleOpenCreateModal}
              className="neo-btn neo-btn-accent text-xs py-2 px-5 font-bold inline-flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Create Client Credentials</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs border-t border-[var(--border-subtle)] pt-3">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'all', label: `All Clients (${metrics.total})` },
            { id: 'active', label: `Active Clients (${metrics.active})` },
            { id: 'inactive', label: `Inactive (${metrics.inactive})` },
            { id: 'companies', label: 'Company Index' },
            { id: 'activity', label: 'Client Activity Stream' }
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
            placeholder="Search client name, company, email..."
            className="bg-transparent w-full focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-xs font-medium"
          />
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--text-tertiary)]" />
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="neo-input text-xs py-1.5 px-3 w-44"
            >
              <option value="All">All Industries</option>
              <option value="Healthcare & Medical Tech">Healthcare & Med</option>
              <option value="Hospitality & Travel">Hospitality</option>
              <option value="Financial Services & VC">Finance & VC</option>
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
      {/* TAB 1: CLIENTS DASHBOARD                                                  */}
      {/* ========================================================================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          
          {/* Summary Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Total Clients</span>
              <span className="text-2xl font-black text-[var(--text-primary)] font-mono block">{metrics.total}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Verified Customer Accounts</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Active Clients</span>
              <span className="text-2xl font-black text-emerald-600 font-mono block">{metrics.active}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">VIP & Active Retainers</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Projects In Progress</span>
              <span className="text-2xl font-black text-purple-600 font-mono block">{metrics.projectsInProgress}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Active Sprint Delivery</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Outstanding Payments</span>
              <span className="text-2xl font-black text-amber-600 font-mono block">{metrics.outstandingPayments}</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Pending Milestone Invoices</span>
            </div>

            <div className="neo-card p-5 rounded-2xl border border-[var(--border-light)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Upcoming Syncs</span>
              <span className="text-2xl font-black text-blue-600 font-mono block">2 Calls</span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Scheduled Google Meet Syncs</span>
            </div>
          </div>

          {/* Client Account Cards Grid */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
              Active Enterprise Client Roster ({filteredClients.length})
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredClients.map((client) => (
                <motion.div
                  key={client.id}
                  whileHover={{ y: -3 }}
                  className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 flex flex-col justify-between hover:border-[var(--accent-primary)] transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getStatusBadge(client.status)}`}>
                        {client.status}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)]">Since {client.joinedDate}</span>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-[var(--text-primary)] leading-snug">{client.company}</h3>
                      <p className="text-[11px] font-mono text-[var(--accent-primary)] font-bold mt-0.5">{client.name}</p>
                    </div>

                    <div className="neo-inset p-3.5 rounded-xl space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-tertiary)]">Industry</span>
                        <span className="font-bold text-[var(--text-primary)] truncate max-w-[150px]">{client.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-tertiary)]">Active Sprint</span>
                        <span className="font-bold text-emerald-600 truncate max-w-[150px]">{client.activeProjects[0]?.name || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={client.projectManager.avatar} alt={client.projectManager.name} className="w-5 h-5 rounded-full object-cover shrink-0" />
                      <span className="text-[10px] font-mono text-[var(--text-secondary)] font-bold truncate">{client.projectManager.name}</span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleJumpToClientPortal(client)}
                        className="neo-pill p-2 text-xs text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10"
                        title="Jump to Client Portal View"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setInspectingClient(client)}
                        className="neo-btn text-xs py-1.5 px-3 font-bold inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2 & 3 & 4: ALL / ACTIVE / INACTIVE CLIENTS (GRID OR LIST)              */}
      {/* ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'active' || activeTab === 'inactive') && (
        <div>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredClients.map((c) => (
                <motion.div
                  key={c.id}
                  whileHover={{ y: -3 }}
                  className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 flex flex-col justify-between text-left"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getStatusBadge(c.status)}`}>
                        {c.status}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{c.email}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-[var(--text-primary)]">{c.company}</h3>
                    <p className="text-xs text-[var(--text-secondary)]">Contact: {c.name} ({c.phone})</p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[var(--accent-primary)] font-bold">{c.industry}</span>
                    <button
                      onClick={() => setInspectingClient(c)}
                      className="neo-btn text-xs py-1.5 px-4 font-bold inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Profile</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="neo-card rounded-[24px] border border-[var(--border-light)] overflow-hidden">
              <table className="w-full text-left border-collapse" aria-label="Clients Table">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] text-[10px] font-mono uppercase text-[var(--text-tertiary)] bg-[var(--surface-recessed)]/50">
                    <th className="py-3.5 px-6 font-bold" scope="col">Company / Contact</th>
                    <th className="py-3.5 px-6 font-bold" scope="col">Industry</th>
                    <th className="py-3.5 px-6 font-bold" scope="col">Status</th>
                    <th className="py-3.5 px-6 font-bold" scope="col">Project Manager</th>
                    <th className="py-3.5 px-6 font-bold" scope="col">Outstanding</th>
                    <th className="py-3.5 px-6 font-bold text-right" scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] text-xs">
                  {filteredClients.map((c) => (
                    <tr key={c.id} className="hover:bg-[var(--surface-recessed)]/30 transition-colors">
                      <td className="py-4 px-6 font-bold text-[var(--text-primary)]">
                        <span className="block">{c.company}</span>
                        <span className="text-[10px] font-mono text-[var(--text-tertiary)] block">{c.name} ({c.email})</span>
                      </td>
                      <td className="py-4 px-6 font-mono text-[var(--accent-primary)] font-bold">
                        {c.industry}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getStatusBadge(c.status)}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-[var(--text-secondary)] font-medium">
                        {c.projectManager.name}
                      </td>
                      <td className="py-4 px-6 font-mono font-extrabold text-[var(--text-primary)]">
                        {c.outstandingBalance}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setInspectingClient(c)}
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
      {/* TAB 5: COMPANIES INDEX                                                    */}
      {/* ========================================================================= */}
      {activeTab === 'companies' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Verified Company Directory ({clients.length})
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clients.map((c) => (
              <div key={c.id} className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="badge-tag">{c.industry}</span>
                  <a href={c.website} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[var(--accent-primary)] hover:underline inline-flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    <span>Website</span>
                  </a>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[var(--text-primary)]">{c.company}</h3>
                  <p className="text-xs font-mono text-[var(--text-tertiary)] mt-0.5">{c.gstNumber}</p>
                </div>

                <div className="neo-inset p-3 rounded-xl text-xs font-mono space-y-1">
                  <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
                    <span>{c.address}, {c.city}, {c.state}, {c.country}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: CLIENT ACTIVITY STREAM                                             */}
      {/* ========================================================================= */}
      {activeTab === 'activity' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Recent Client Interaction Log
          </span>

          <div className="neo-card rounded-[24px] border border-[var(--border-light)] p-5 space-y-3">
            {[
              { id: 'a-1', title: 'Payment Received: Aura Health Medical Group ($7,500.00)', time: '10 min ago', user: 'Alex Vance' },
              { id: 'a-2', title: 'Sprint Review Scheduled: Horizon Luxury Resorts', time: 'Yesterday', user: 'Sarah Jenkins' },
              { id: 'a-3', title: 'Project Kickoff Form Completed: Sterling Capital', time: '2 days ago', user: 'Robert Sterling' }
            ].map((act) => (
              <div key={act.id} className="neo-inset p-4 rounded-xl flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="font-bold text-[var(--text-primary)] block">{act.title}</span>
                  <span className="text-[10px] text-[var(--text-tertiary)] block">Client: {act.user}</span>
                </div>
                <span className="text-[10px] text-[var(--text-tertiary)]">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CLIENT 360° PROFILE INSPECTION MODAL                                      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {inspectingClient && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setInspectingClient(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[28px] max-w-3xl w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setInspectingClient(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`neo-pill px-2.5 py-0.5 text-[10px] font-mono uppercase border ${getStatusBadge(inspectingClient.status)}`}>
                      {inspectingClient.status}
                    </span>
                    <span className="text-xs font-mono text-[var(--accent-primary)] font-bold">{inspectingClient.industry}</span>
                  </div>
                  <h2 className="text-2xl font-black text-[var(--text-primary)]">{inspectingClient.company}</h2>
                  <p className="text-xs text-[var(--text-secondary)] font-mono">Primary Contact: {inspectingClient.name} • {inspectingClient.email}</p>
                </div>

                <button
                  onClick={() => handleJumpToClientPortal(inspectingClient)}
                  className="neo-btn neo-btn-accent text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5 shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Client Portal</span>
                </button>
              </div>

              {/* Company Details Spec */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[var(--text-primary)] font-mono block">Company Profile & Billing Spec</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono neo-inset p-4 rounded-2xl">
                  <div>
                    <span className="text-[10px] text-[var(--text-tertiary)] block">GST / Tax ID</span>
                    <span className="font-bold text-[var(--text-primary)] block">{inspectingClient.gstNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--text-tertiary)] block">Website</span>
                    <a href={inspectingClient.website} target="_blank" rel="noopener noreferrer" className="font-bold text-[var(--accent-primary)] hover:underline truncate block">
                      {inspectingClient.website}
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--text-tertiary)] block">Phone</span>
                    <span className="font-bold text-[var(--text-primary)] block">{inspectingClient.phone}</span>
                  </div>
                  <div className="sm:col-span-3 pt-2 border-t border-[var(--border-subtle)]">
                    <span className="text-[10px] text-[var(--text-tertiary)] block">Address</span>
                    <span className="font-bold text-[var(--text-primary)] block">{inspectingClient.address}, {inspectingClient.city}, {inspectingClient.state}, {inspectingClient.country}</span>
                  </div>
                </div>
              </div>

              {/* Active Projects List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[var(--text-primary)] font-mono block">Active Projects ({inspectingClient.activeProjects.length})</span>
                <div className="space-y-3">
                  {inspectingClient.activeProjects.map((p) => (
                    <div key={p.id} className="neo-card p-4 rounded-xl border border-[var(--border-light)] space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-[var(--text-primary)]">{p.name}</span>
                        <span className="text-[10px] font-mono text-[var(--accent-primary)] font-bold">{p.progress}% Complete</span>
                      </div>
                      <div className="w-full bg-[var(--surface-recessed)] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[var(--accent-primary)] h-full transition-all" style={{ width: `${p.progress}%` }} />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-[var(--text-tertiary)]">
                        <span>{p.phase}</span>
                        <span>Deadline: {p.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing Telemetry */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="neo-inset p-4 rounded-xl space-y-1">
                  <span className="text-[10px] text-[var(--text-tertiary)] uppercase font-bold block">Outstanding Balance</span>
                  <span className="text-lg font-black text-amber-600 block">{inspectingClient.outstandingBalance}</span>
                </div>

                <div className="neo-inset p-4 rounded-xl space-y-1">
                  <span className="text-[10px] text-[var(--text-tertiary)] uppercase font-bold block">Total Lifetime Paid</span>
                  <span className="text-lg font-black text-emerald-600 block">{inspectingClient.totalPaid}</span>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-2 text-xs">
                <button
                  onClick={() => {
                    setInspectingClient(null);
                    if (onNavigate) onNavigate('projects');
                  }}
                  className="neo-btn text-xs py-2 px-3 font-bold inline-flex items-center gap-1"
                >
                  <FolderKanban className="w-3.5 h-3.5" />
                  <span>Create Project</span>
                </button>

                <button
                  onClick={() => {
                    setInspectingClient(null);
                    triggerToast(`Meeting scheduled with ${inspectingClient.company}`);
                  }}
                  className="neo-btn text-xs py-2 px-3 font-bold inline-flex items-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule Meeting</span>
                </button>

                <button
                  onClick={() => {
                    setInspectingClient(null);
                    if (onNavigate) onNavigate('finance');
                  }}
                  className="neo-btn text-xs py-2 px-3 font-bold inline-flex items-center gap-1"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Create Invoice</span>
                </button>

                <button
                  onClick={() => {
                    setInspectingClient(null);
                    triggerToast(`Direct message thread opened for ${inspectingClient.name}`);
                  }}
                  className="neo-btn text-xs py-2 px-3 font-bold inline-flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ADMIN CLIENT ACCOUNT PROVISIONING MODAL                                  */}
        {/* ========================================================================= */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setIsCreateModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="neo-card border border-[var(--border-light)] rounded-[28px] max-w-2xl w-full p-6 md:p-8 space-y-6 bg-[var(--bg-primary)] shadow-2xl relative text-left max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full neo-inset flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="space-y-1 border-b border-[var(--border-subtle)] pb-4">
                <div className="inline-flex items-center gap-1.5 neo-pill px-2.5 py-0.5 text-[10px] font-mono text-[var(--accent-primary)] font-bold uppercase mb-1">
                  <Shield className="w-3 h-3 text-emerald-500" />
                  <span>Admin Credentials Generator</span>
                </div>
                <h2 className="text-2xl font-black text-[var(--text-primary)]">
                  Provision Client Organization Account
                </h2>
                <p className="text-xs text-[var(--text-secondary)] font-mono">
                  Only Admins can issue Organization IDs and Passwords for client portal access.
                </p>
              </div>

              {createdCredentials ? (
                /* Created Credentials Success Box */
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>Organization Credentials Provisioned Successfully!</span>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)]">
                      Deliver the following login credentials to <strong>{createdCredentials.company}</strong>:
                    </p>

                    <div className="neo-inset p-4 rounded-xl space-y-2 text-xs font-mono">
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-tertiary)]">Organization Name:</span>
                        <span className="font-extrabold text-[var(--text-primary)]">{createdCredentials.company}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-tertiary)]">Organization ID:</span>
                        <span className="font-extrabold text-[var(--accent-primary)]">{createdCredentials.clientId}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-tertiary)]">Login Email / Username:</span>
                        <span className="font-bold text-[var(--text-primary)]">{createdCredentials.email}</span>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-[var(--border-subtle)]">
                        <span className="text-[var(--text-tertiary)]">Initial Password:</span>
                        <span className="font-black text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded font-mono">{createdCredentials.password}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `Organization: ${createdCredentials.company}\nOrganization ID: ${createdCredentials.clientId}\nEmail: ${createdCredentials.email}\nPassword: ${createdCredentials.password}`
                        );
                        triggerToast('Credentials copied to clipboard!');
                      }}
                      className="neo-btn text-xs py-2.5 px-4 font-bold inline-flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy Credentials</span>
                    </button>

                    <button
                      onClick={() => setIsCreateModalOpen(false)}
                      className="neo-btn neo-btn-accent text-xs py-2.5 px-5 font-bold"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                /* Form to generate credentials */
                <form onSubmit={handleProvisionClientSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-bold text-[var(--text-tertiary)] block">Organization Name *</label>
                      <input
                        type="text"
                        required
                        value={newCompany}
                        onChange={(e) => setNewCompany(e.target.value)}
                        placeholder="Apex Horizon Robotics Inc."
                        className="neo-input text-xs font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-[var(--text-tertiary)] block">Organization ID</label>
                        <button
                          type="button"
                          onClick={() => setNewClientId(generateRandomId())}
                          className="text-[10px] text-[var(--accent-primary)] font-bold hover:underline inline-flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Generate</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        value={newClientId}
                        onChange={(e) => setNewClientId(e.target.value)}
                        className="neo-input text-xs font-mono font-bold text-[var(--accent-primary)]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-[var(--text-tertiary)] block">Industry Sector</label>
                      <select
                        value={newIndustry}
                        onChange={(e) => setNewIndustry(e.target.value)}
                        className="neo-input text-xs"
                      >
                        <option value="Healthcare & Medical Tech">Healthcare & Med Tech</option>
                        <option value="Hospitality & Travel">Hospitality & Travel</option>
                        <option value="Financial Services & VC">Finance & VC</option>
                        <option value="AI & Robotics Engine">AI & Robotics</option>
                        <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-[var(--text-tertiary)] block">Client Login Email *</label>
                      <input
                        type="email"
                        required
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="client@apexhorizon.com"
                        className="neo-input text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-[var(--text-tertiary)] block">Initial Password *</label>
                        <button
                          type="button"
                          onClick={() => setNewPassword(generateRandomPassword())}
                          className="text-[10px] text-[var(--accent-primary)] font-bold hover:underline inline-flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Auto-Generate</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="neo-input text-xs font-mono font-bold text-rose-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-[var(--text-tertiary)] block">Primary Contact Person</label>
                      <input
                        type="text"
                        value={newContactName}
                        onChange={(e) => setNewContactName(e.target.value)}
                        placeholder="Sarah Connor (CEO)"
                        className="neo-input text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-[var(--text-tertiary)] block">Contact Phone Number</label>
                      <input
                        type="text"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        placeholder="+1 (415) 555-0199"
                        className="neo-input text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-bold text-[var(--text-tertiary)] block">Headquarters Address</label>
                      <input
                        type="text"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                        placeholder="500 Innovation Way, Suite 100, San Francisco, CA"
                        className="neo-input text-xs"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsCreateModalOpen(false)}
                      className="neo-pill px-4 py-2 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold inline-flex items-center gap-2 shadow-lg"
                    >
                      <Key className="w-4 h-4" />
                      <span>Issue Organization Credentials</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
