import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Download,
  DollarSign,
  Users,
  FolderKanban,
  CheckCircle2,
  Printer
} from 'lucide-react';
import type { AdminView } from '../types';

interface AdminAnalyticsViewProps {
  onNavigate?: (view: AdminView) => void;
}

export const AdminAnalyticsView: React.FC<AdminAnalyticsViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'revenue' | 'sales' | 'projects' | 'clients' | 'team'>('overview');
  const [timeRange, setTimeRange] = useState<'Today' | 'This Week' | 'This Month' | 'This Quarter' | 'This Year'>('This Month');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExportCSV = () => {
    const csvData = "data:text/csv;charset=utf-8," + 
      "Metric,Value,Growth,Period\n" +
      "Monthly Revenue,$148500.00,+18.4%,This Month\n" +
      "Active Projects,3,100% On Schedule,This Month\n" +
      "Lead Conversion Rate,42.5%,+5.2%,This Month\n" +
      "Client Retention,94%,+2.1%,This Month\n" +
      "Annualized Revenue,$1420000.00,+24.8%,Trailing 12M\n";
    const encodedUri = encodeURI(csvData);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Byte Build_Executive_Analytics_${timeRange.replace(/\s+/g, '_')}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast(`Executive analytics exported for ${timeRange}!`);
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
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Executive Business Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              Executive Analytics & Growth
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Time Range Filter Pill */}
            <div className="neo-card p-1 rounded-xl border border-[var(--border-light)] flex items-center text-xs">
              {(['Today', 'This Week', 'This Month', 'This Quarter', 'This Year'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    timeRange === range
                      ? 'neo-inset text-[var(--accent-primary)]'
                      : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportCSV}
              className="neo-btn text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5 shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs border-t border-[var(--border-subtle)] pt-3">
          {[
            { id: 'overview', label: 'Executive Overview' },
            { id: 'revenue', label: 'Revenue Telemetry' },
            { id: 'sales', label: 'Sales Funnel' },
            { id: 'projects', label: 'Project Performance' },
            { id: 'clients', label: 'Client Growth' },
            { id: 'team', label: 'Team Capacity' }
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
      {/* TAB 1: EXECUTIVE OVERVIEW                                                 */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Executive Telemetry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Monthly Revenue</span>
                <span className="neo-pill px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-600 bg-emerald-500/10">+18.4%</span>
              </div>
              <span className="text-3xl font-black text-emerald-600 font-mono block">$148,500.00</span>
              <p className="text-[10px] font-mono text-[var(--text-tertiary)]">MTD Verified Client Billing</p>
            </div>

            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Active Sprint Projects</span>
                <span className="neo-pill px-2 py-0.5 text-[10px] font-mono font-bold text-purple-600 bg-purple-500/10">100% On Time</span>
              </div>
              <span className="text-3xl font-black text-purple-600 font-mono block">3 Projects</span>
              <p className="text-[10px] font-mono text-[var(--text-tertiary)]">Sub-500ms Core Web Vitals Target</p>
            </div>

            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Lead Conversion Rate</span>
                <span className="neo-pill px-2 py-0.5 text-[10px] font-mono font-bold text-blue-600 bg-blue-500/10">+5.2% MTD</span>
              </div>
              <span className="text-3xl font-black text-blue-600 font-mono block">42.5%</span>
              <p className="text-[10px] font-mono text-[var(--text-tertiary)]">Inbound Enterprise Sales Pipeline</p>
            </div>

            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Client Retention Rate</span>
                <span className="neo-pill px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-600 bg-indigo-500/10">94% Retention</span>
              </div>
              <span className="text-3xl font-black text-[var(--accent-primary)] font-mono block">94.0%</span>
              <p className="text-[10px] font-mono text-[var(--text-tertiary)]">Enterprise Retainers & SLA</p>
            </div>

          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button
              onClick={() => onNavigate ? onNavigate('leads') : triggerToast('Opening Sales CRM...')}
              className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2 text-xs font-bold hover:border-[var(--accent-primary)] transition-all"
            >
              <Users className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Open Sales CRM</span>
            </button>

            <button
              onClick={() => onNavigate ? onNavigate('projects') : triggerToast('Opening Projects...')}
              className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2 text-xs font-bold hover:border-[var(--accent-primary)] transition-all"
            >
              <FolderKanban className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Create Project</span>
            </button>

            <button
              onClick={() => onNavigate ? onNavigate('finance') : triggerToast('Opening Billing...')}
              className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2 text-xs font-bold hover:border-[var(--accent-primary)] transition-all"
            >
              <DollarSign className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Generate Invoice</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2 text-xs font-bold hover:border-[var(--accent-primary)] transition-all"
            >
              <Printer className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Download Report</span>
            </button>
          </div>

          {/* Business Insights Bar */}
          <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4 text-left">
            <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-3">
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">30-Second Executive Health Audit</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="neo-inset p-4 rounded-2xl space-y-1">
                <span className="text-[10px] text-[var(--text-tertiary)] block">Revenue Health</span>
                <span className="font-bold text-emerald-600 block">Strong MTD Cashflow ($148.5k)</span>
                <span className="text-[9px] text-[var(--text-tertiary)] block">91% Invoices Paid on Schedule</span>
              </div>

              <div className="neo-inset p-4 rounded-2xl space-y-1">
                <span className="text-[10px] text-[var(--text-tertiary)] block">Engineering Delivery</span>
                <span className="font-bold text-purple-600 block">3 Active Sprints Healthy</span>
                <span className="text-[9px] text-[var(--text-tertiary)] block">0 Delayed Projects in Pipeline</span>
              </div>

              <div className="neo-inset p-4 rounded-2xl space-y-1">
                <span className="text-[10px] text-[var(--text-tertiary)] block">Team Utilization</span>
                <span className="font-bold text-[var(--accent-primary)] block">75% Capacity (Optimal)</span>
                <span className="text-[9px] text-[var(--text-tertiary)] block">2 Team Members Available for Intake</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: REVENUE TELEMETRY                                                  */}
      {/* ========================================================================= */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-2 text-left">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Annualized Trailing Revenue</span>
              <span className="text-3xl font-black text-emerald-600 font-mono block">$1,420,000.00</span>
              <span className="text-xs text-[var(--text-secondary)]">Verified 12-Month Performance</span>
            </div>

            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-2 text-left">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Collected Payments MTD</span>
              <span className="text-3xl font-black text-[var(--accent-primary)] font-mono block">$148,500.00</span>
              <span className="text-xs text-[var(--text-secondary)]">Settled Client Invoices</span>
            </div>

            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-2 text-left">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Average Project Value</span>
              <span className="text-3xl font-black text-purple-600 font-mono block">$38,500.00</span>
              <span className="text-xs text-[var(--text-secondary)]">Enterprise Contract Median</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SALES FUNNEL                                                       */}
      {/* ========================================================================= */}
      {activeTab === 'sales' && (
        <div className="space-y-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Enterprise Sales Conversion Funnel ({timeRange})
          </span>

          <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4">
            {[
              { stage: 'Inbound Enquiries & New Leads', count: 18, pct: '100%', color: 'bg-blue-500' },
              { stage: 'Qualified Sales Opportunities', count: 12, pct: '66.7%', color: 'bg-indigo-500' },
              { stage: 'Consultation Sessions Conducted', count: 8, pct: '44.4%', color: 'bg-purple-500' },
              { stage: 'Won Enterprise Contracts', count: 6, pct: '33.3%', color: 'bg-emerald-500' }
            ].map((f, idx) => (
              <div key={idx} className="space-y-1.5 text-xs font-mono text-left">
                <div className="flex justify-between">
                  <span className="font-bold text-[var(--text-primary)]">{f.stage}</span>
                  <span className="font-black text-[var(--accent-primary)]">{f.count} ({f.pct})</span>
                </div>
                <div className="w-full bg-[var(--surface-recessed)] h-2 rounded-full overflow-hidden">
                  <div className={`${f.color} h-full transition-all`} style={{ width: f.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PROJECT PERFORMANCE                                                */}
      {/* ========================================================================= */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-2 text-left">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Projects In Progress</span>
              <span className="text-3xl font-black text-purple-600 font-mono block">3 Active</span>
              <span className="text-xs text-[var(--text-secondary)]">Aura Health, Horizon Resort, Sterling VC</span>
            </div>

            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-2 text-left">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Completed Projects</span>
              <span className="text-3xl font-black text-emerald-600 font-mono block">14 Total</span>
              <span className="text-xs text-[var(--text-secondary)]">Delivered Sub-500ms Solutions</span>
            </div>

            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-2 text-left">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Average Sprint Duration</span>
              <span className="text-3xl font-black text-[var(--accent-primary)] font-mono block">24 Days</span>
              <span className="text-xs text-[var(--text-secondary)]">Kickoff to Production Launch</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: CLIENT GROWTH                                                      */}
      {/* ========================================================================= */}
      {activeTab === 'clients' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-2 text-left">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Total Clients</span>
              <span className="text-3xl font-black text-[var(--text-primary)] font-mono block">18 Clients</span>
              <span className="text-xs text-[var(--text-secondary)]">Active & Retainer Accounts</span>
            </div>

            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-2 text-left">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">New Clients MTD</span>
              <span className="text-3xl font-black text-emerald-600 font-mono block">4 New</span>
              <span className="text-xs text-[var(--text-secondary)]">+25% Client Account Growth</span>
            </div>

            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-2 text-left">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Client Retention</span>
              <span className="text-3xl font-black text-indigo-600 font-mono block">94.0%</span>
              <span className="text-xs text-[var(--text-secondary)]">Long-term SLA Partnerships</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: TEAM CAPACITY                                                      */}
      {/* ========================================================================= */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-2 text-left">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Active Team Members</span>
              <span className="text-3xl font-black text-[var(--text-primary)] font-mono block">3 Members</span>
              <span className="text-xs text-[var(--text-secondary)]">Senior Product Architects & Engineers</span>
            </div>

            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-2 text-left">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Team Workload Capacity</span>
              <span className="text-3xl font-black text-[var(--accent-primary)] font-mono block">75% Capacity</span>
              <span className="text-xs text-[var(--text-secondary)]">Optimal Engineering Balance</span>
            </div>

            <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-2 text-left">
              <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold">Projects Per Member</span>
              <span className="text-3xl font-black text-purple-600 font-mono block">1.7 Avg</span>
              <span className="text-xs text-[var(--text-secondary)]">Balanced Allocation</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
