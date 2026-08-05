import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Database,
  Save,
  Send,
  RefreshCw
} from 'lucide-react';
import type { AdminView } from '../types';

interface AdminSettingsViewProps {
  onNavigate?: (view: AdminView) => void;
}

export const AdminSettingsView: React.FC<AdminSettingsViewProps> = ({ onNavigate: _onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'agency' | 'branding' | 'roles' | 'email' | 'integrations' | 'security' | 'backup'>('general');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Settings State
  const [agencyName, setAgencyName] = useState('Byte Build Agency');
  const [businessEmail, setBusinessEmail] = useState('hello@bytebuild.dev');
  const [phone, setPhone] = useState('+1 (415) 555-0199');
  const [timeZone, setTimeZone] = useState('UTC-05:00 Eastern Time');
  const [currency, setCurrency] = useState('USD ($)');

  // Integrations State
  const [integrations, setIntegrations] = useState([
    { id: 'i-1', name: 'Google Analytics 4', category: 'Analytics', enabled: true },
    { id: 'i-2', name: 'Stripe PCI Billing', category: 'Payments', enabled: true },
    { id: 'i-3', name: 'Google Meet', category: 'Conferencing', enabled: true },
    { id: 'i-4', name: 'Slack Workspace', category: 'Communication', enabled: true },
    { id: 'i-5', name: 'GitHub Enterprise', category: 'Version Control', enabled: true },
    { id: 'i-6', name: 'Razorpay Payment Gateway', category: 'Payments', enabled: false },
    { id: 'i-7', name: 'Brevo SMTP & Transactional Email', category: 'Email', enabled: true }
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleIntegration = (id: string) => {
    setIntegrations(integrations.map(i => {
      if (i.id !== id) return i;
      const nextState = !i.enabled;
      triggerToast(`${i.name} ${nextState ? 'enabled' : 'disabled'}.`);
      return { ...i, enabled: nextState };
    }));
  };

  const handleSaveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('Agency general settings saved successfully!');
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
              <SettingsIcon className="w-3.5 h-3.5" />
              <span>Agency System Configuration</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              Settings & Integrations
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerToast('System changes saved to Byte Build Cloud!')}
              className="neo-btn neo-btn-accent text-xs py-2 px-5 font-bold inline-flex items-center gap-2 shrink-0"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs border-t border-[var(--border-subtle)] pt-3">
          {[
            { id: 'general', label: 'General' },
            { id: 'agency', label: 'Agency Profile' },
            { id: 'branding', label: 'Branding' },
            { id: 'roles', label: 'Users & Roles' },
            { id: 'email', label: 'Email Settings' },
            { id: 'integrations', label: 'Integrations' },
            { id: 'security', label: 'Security' },
            { id: 'backup', label: 'Backup & Recovery' }
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
      {/* TAB 1: GENERAL SETTINGS                                                   */}
      {/* ========================================================================= */}
      {activeTab === 'general' && (
        <form onSubmit={handleSaveGeneralSettings} className="space-y-6 max-w-3xl">
          <div className="neo-card p-6 md:p-8 rounded-[24px] border border-[var(--border-light)] space-y-6">
            <h3 className="text-base font-extrabold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-3">
              General Agency Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-[var(--text-tertiary)] block mb-1">Agency Name</label>
                <input type="text" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} className="neo-input text-xs" />
              </div>

              <div>
                <label className="font-bold text-[var(--text-tertiary)] block mb-1">Business Email</label>
                <input type="email" value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} className="neo-input text-xs font-mono" />
              </div>

              <div>
                <label className="font-bold text-[var(--text-tertiary)] block mb-1">Phone Number</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="neo-input text-xs font-mono" />
              </div>

              <div>
                <label className="font-bold text-[var(--text-tertiary)] block mb-1">Website URL</label>
                <input type="text" defaultValue="https://bytebuild.dev" className="neo-input text-xs font-mono" />
              </div>

              <div>
                <label className="font-bold text-[var(--text-tertiary)] block mb-1">Time Zone</label>
                <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)} className="neo-input text-xs font-bold">
                  <option value="UTC-05:00 Eastern Time">UTC-05:00 Eastern Time (US & Canada)</option>
                  <option value="UTC-08:00 Pacific Time">UTC-08:00 Pacific Time (US & Canada)</option>
                  <option value="UTC+00:00 London">UTC+00:00 London (GMT)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[var(--text-tertiary)] block mb-1">Primary Currency</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="neo-input text-xs font-bold">
                  <option value="USD ($)">USD ($)</option>
                  <option value="EUR (€)">EUR (€)</option>
                  <option value="GBP (£)">GBP (£)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button type="submit" className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold">Save General Settings</button>
            </div>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: AGENCY PROFILE                                                     */}
      {/* ========================================================================= */}
      {activeTab === 'agency' && (
        <div className="neo-card p-6 md:p-8 rounded-[24px] border border-[var(--border-light)] space-y-6 max-w-3xl text-left">
          <h3 className="text-base font-extrabold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-3">
            Agency Identity & Registration
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-[var(--text-tertiary)] block mb-1">Office Headquarters Address</label>
              <textarea defaultValue="100 Pine Street, Suite 2400, San Francisco, CA 94111, United States" className="neo-input text-xs h-20 resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[var(--text-tertiary)] block mb-1">Tax ID / GST Number</label>
                <input type="text" defaultValue="US-9912048-TAX" className="neo-input text-xs font-mono" />
              </div>

              <div>
                <label className="font-bold text-[var(--text-tertiary)] block mb-1">Operating Business Hours</label>
                <input type="text" defaultValue="09:00 AM - 06:00 PM EST" className="neo-input text-xs font-mono" />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button onClick={() => triggerToast('Agency profile updated!')} className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold">Save Profile</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: BRANDING                                                           */}
      {/* ========================================================================= */}
      {activeTab === 'branding' && (
        <div className="neo-card p-6 md:p-8 rounded-[24px] border border-[var(--border-light)] space-y-6 max-w-3xl text-left">
          <h3 className="text-base font-extrabold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-3">
            Theme & Design System Tokens
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="neo-inset p-4 rounded-xl space-y-2">
              <span className="text-[10px] text-[var(--text-tertiary)] block">Primary Accent</span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#00e5ff] border border-white/20" />
                <span className="font-bold text-[var(--text-primary)]">#00E5FF</span>
              </div>
            </div>

            <div className="neo-inset p-4 rounded-xl space-y-2">
              <span className="text-[10px] text-[var(--text-tertiary)] block">Neomorphic Base</span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#0b0f19] border border-white/20" />
                <span className="font-bold text-[var(--text-primary)]">#0B0F19</span>
              </div>
            </div>

            <div className="neo-inset p-4 rounded-xl space-y-2">
              <span className="text-[10px] text-[var(--text-tertiary)] block">Typography Family</span>
              <span className="font-bold text-[var(--accent-primary)] block pt-1">Inter & JetBrains Mono</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: EMAIL SETTINGS                                                     */}
      {/* ========================================================================= */}
      {activeTab === 'email' && (
        <div className="neo-card p-6 md:p-8 rounded-[24px] border border-[var(--border-light)] space-y-6 max-w-3xl text-left">
          <h3 className="text-base font-extrabold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-3">
            Brevo SMTP Transactional Email
          </h3>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[var(--text-tertiary)] block mb-1">Sender Name</label>
                <input type="text" defaultValue="Byte Build Executive Team" className="neo-input text-xs" />
              </div>

              <div>
                <label className="font-bold text-[var(--text-tertiary)] block mb-1">Sender Email</label>
                <input type="email" defaultValue="notifications@bytebuild.dev" className="neo-input text-xs font-mono" />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => triggerToast('Test email dispatched to hello@bytebuild.dev!')}
                className="neo-btn text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Test Email</span>
              </button>

              <button onClick={() => triggerToast('Email settings saved!')} className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold">Save Email Settings</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: INTEGRATIONS                                                       */}
      {/* ========================================================================= */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-bold block">
            Third-Party System Integrations ({integrations.length})
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.map((integ) => (
              <div key={integ.id} className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] flex items-center justify-between gap-4 text-left">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[var(--accent-primary)]" />
                    <h3 className="text-sm font-extrabold text-[var(--text-primary)]">{integ.name}</h3>
                  </div>
                  <span className="badge-tag">{integ.category}</span>
                </div>

                <button
                  onClick={() => handleToggleIntegration(integ.id)}
                  className={`neo-pill px-4 py-1.5 text-xs font-bold transition-all ${
                    integ.enabled
                      ? 'text-emerald-600 bg-emerald-500/10 border border-emerald-500/30'
                      : 'text-gray-500 bg-gray-500/10 border border-gray-500/30'
                  }`}
                >
                  {integ.enabled ? 'Enabled ✓' : 'Disabled'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: SECURITY                                                           */}
      {/* ========================================================================= */}
      {activeTab === 'security' && (
        <div className="neo-card p-6 md:p-8 rounded-[24px] border border-[var(--border-light)] space-y-6 max-w-3xl text-left">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">PCI 256-Bit Security Standards</h3>
            </div>
            <span className="neo-pill px-3 py-1 text-xs font-bold text-emerald-600 bg-emerald-500/10">Active Protection</span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="neo-inset p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-[var(--text-primary)] block">Two-Factor Authentication (2FA)</span>
                <span className="text-[10px] text-[var(--text-tertiary)] block">Enforced for all admin roster logins</span>
              </div>
              <span className="neo-pill px-3 py-1 font-bold text-emerald-600">Enabled</span>
            </div>

            <div className="neo-inset p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-[var(--text-primary)] block">Session Timeout</span>
                <span className="text-[10px] text-[var(--text-tertiary)] block">Auto logout after 30 min inactivity</span>
              </div>
              <span className="font-bold text-[var(--text-primary)]">30 Minutes</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: BACKUP                                                             */}
      {/* ========================================================================= */}
      {activeTab === 'backup' && (
        <div className="neo-card p-6 md:p-8 rounded-[24px] border border-[var(--border-light)] space-y-6 max-w-3xl text-left">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[var(--accent-primary)]" />
              <h3 className="text-base font-extrabold text-[var(--text-primary)]">Automated Cloud Backups</h3>
            </div>
            <span className="text-xs font-mono text-[var(--text-tertiary)]">Last Backup: Today at 04:00 AM</span>
          </div>

          <div className="space-y-4 text-xs">
            <p className="text-[var(--text-secondary)] font-mono">
              Byte Build Cloud automatically creates encrypted snapshots of all Leads, Clients, Invoices, Projects, and CMS assets every 24 hours.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => triggerToast('Creating cloud backup snapshot...')}
                className="neo-btn neo-btn-accent text-xs py-2.5 px-5 font-bold inline-flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Create Instant Backup</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
