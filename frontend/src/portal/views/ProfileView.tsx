import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  User,
  Shield,
  Bell,
  Info,
  Save,
  Lock,
  Key,
  LogOut,
  CheckCircle2,
  HelpCircle,
  Camera,
  Globe,
  Mail,
  Phone
} from 'lucide-react';
import type { ClientProfile, PortalView } from '../types';

interface ProfileViewProps {
  profile: ClientProfile;
  onLogout: () => void;
  onNavigate?: (view: PortalView) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onLogout,
  onNavigate
}) => {
  // Organization Info Form State
  const [organizationName, setOrganizationName] = useState(profile.organizationName || profile.company || 'Aura Health Medical Group');
  const [industry, setIndustry] = useState(profile.companyInfo?.industry || 'Healthcare & Medical Tech');
  const [orgEmail, setOrgEmail] = useState(profile.orgEmail || profile.email || 'contact@aurahealth.com');
  const [orgPhone, setOrgPhone] = useState(profile.orgPhone || profile.phone || '+1 (415) 890-3400');
  const [website, setWebsite] = useState(profile.companyInfo?.website || 'https://aurahealth.com');
  const [gstNumber, setGstNumber] = useState(profile.companyInfo?.gstNumber || 'TAX-2026-US-8910');
  const [address, setAddress] = useState(profile.companyInfo?.address || '100 Medical Center Blvd, Suite 400');
  const [city, setCity] = useState(profile.companyInfo?.city || 'San Francisco');
  const [state, setState] = useState(profile.companyInfo?.state || 'California');
  const [country, setCountry] = useState(profile.companyInfo?.country || 'United States');

  // Primary Contact Person State (Authorized Representative)
  const [contactName, setContactName] = useState(profile.primaryContact?.name || profile.name || 'Alex Vance');
  const [contactJobTitle, setContactJobTitle] = useState(profile.primaryContact?.jobTitle || profile.jobTitle || 'Chief Executive Officer');
  const [contactEmail, setContactEmail] = useState(profile.primaryContact?.email || 'alex@aurahealth.com');
  const [contactPhone, setContactPhone] = useState(profile.primaryContact?.phone || '+1 (415) 890-3420');

  // Security Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notification Toggles State
  const [notifs, setNotifs] = useState(profile.notificationPreferences);

  // Live Feedback Toast
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleSaveOrganizationInfo = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('Organization profile & billing details updated successfully!');
  };

  const handleSaveContactInfo = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('Primary contact representative updated successfully!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match.');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    triggerToast('Organization password updated securely!');
  };

  const toggleNotif = (key: keyof typeof notifs) => {
    const updated = { ...notifs, [key]: !notifs[key] };
    setNotifs(updated);
    triggerToast('Notification preferences saved!');
  };

  return (
    <div className="space-y-10 text-left pb-16 max-w-5xl mx-auto">

      {/* Save Toast Notification Banner */}
      {saveToast && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 right-6 z-50 neo-card p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 flex items-center gap-3 text-xs text-emerald-600 font-bold shadow-2xl"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{saveToast}</span>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 1. ORGANIZATION HERO CARD                                                 */}
      {/* ========================================================================= */}
      <div className="neo-card p-6 md:p-8 rounded-[32px] border border-[var(--border-light)] relative space-y-6 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-6">

          <div className="relative group shrink-0">
            <img
              src={profile.orgLogoUrl || profile.photoUrl}
              alt={organizationName}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-[var(--accent-primary)] shadow-xl"
            />
            <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer backdrop-blur-xs">
              <Camera className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="badge-tag">{profile.accountStatus || 'Active Organization Account'}</span>
              <span className="text-[10px] font-mono text-[var(--accent-primary)] neo-pill px-2.5 py-0.5 font-bold">
                ID: {profile.clientId}
              </span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)] neo-pill px-2.5 py-0.5 font-bold">
                Client Since {profile.clientSince}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight truncate">
              {organizationName}
            </h1>

            <p className="text-xs font-mono text-[var(--accent-primary)] font-bold truncate">
              {industry} • Registered Client Organization
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs text-[var(--text-secondary)] pt-1 font-mono">
              <span className="inline-flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />{orgEmail}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />{orgPhone}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />{website}</span>
            </div>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('org-details-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold shrink-0 inline-flex items-center gap-2"
          >
            <Building2 className="w-4 h-4" />
            <span>Edit Org Profile</span>
          </button>

        </div>
      </div>

      {/* Quick Action Navigation Buttons (4 Buttons) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <motion.button
          whileHover={{ y: -3 }}
          onClick={() => {
            const el = document.getElementById('org-details-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2 font-bold text-xs hover:border-[var(--accent-primary)] transition-all"
        >
          <Building2 className="w-4 h-4 text-[var(--accent-primary)]" />
          <span>Organization Profile</span>
        </motion.button>

        <motion.button
          whileHover={{ y: -3 }}
          onClick={() => {
            const el = document.getElementById('contact-rep-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2 font-bold text-xs hover:border-[var(--accent-primary)] transition-all"
        >
          <User className="w-4 h-4 text-[var(--accent-primary)]" />
          <span>Primary Contact</span>
        </motion.button>

        <motion.button
          whileHover={{ y: -3 }}
          onClick={() => {
            const el = document.getElementById('security-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2 font-bold text-xs hover:border-[var(--accent-primary)] transition-all"
        >
          <Lock className="w-4 h-4 text-[var(--accent-primary)]" />
          <span>Change Password</span>
        </motion.button>

        <motion.button
          whileHover={{ y: -3 }}
          onClick={() => onNavigate && onNavigate('support')}
          className="neo-card p-4 rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2 font-bold text-xs hover:border-[var(--accent-primary)] transition-all"
        >
          <HelpCircle className="w-4 h-4 text-[var(--accent-primary)]" />
          <span>Contact Support</span>
        </motion.button>
      </div>

      {/* ========================================================================= */}
      {/* 2. ORGANIZATION DETAILS & BILLING ADDRESS                                 */}
      {/* ========================================================================= */}
      <div id="org-details-section" className="neo-card p-6 md:p-8 rounded-[28px] border border-[var(--border-light)] space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-[var(--accent-primary)]" />
            <h2 className="text-lg font-black text-[var(--text-primary)]">Organization Profile & Billing Record</h2>
          </div>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase font-bold">Verified Enterprise Entity</span>
        </div>

        <form onSubmit={handleSaveOrganizationInfo} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[var(--text-tertiary)] block mb-1">Organization Name</label>
              <input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="neo-input text-xs font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-[var(--text-tertiary)] block mb-1">Industry Sector</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="neo-input text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-[var(--text-tertiary)] block mb-1">Official Organization Email</label>
              <input
                type="email"
                value={orgEmail}
                onChange={(e) => setOrgEmail(e.target.value)}
                className="neo-input text-xs font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-[var(--text-tertiary)] block mb-1">Official Contact Phone</label>
              <input
                type="text"
                value={orgPhone}
                onChange={(e) => setOrgPhone(e.target.value)}
                className="neo-input text-xs font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-[var(--text-tertiary)] block mb-1">Company Website</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="neo-input text-xs font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-[var(--text-tertiary)] block mb-1">GST / Tax ID Number</label>
              <input
                type="text"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
                className="neo-input text-xs font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-[var(--text-tertiary)] block mb-1">Headquarters / Billing Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="neo-input text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-[var(--text-tertiary)] block mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="neo-input text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-[var(--text-tertiary)] block mb-1">State / Region</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="neo-input text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-[var(--text-tertiary)] block mb-1">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="neo-input text-xs"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold inline-flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Organization Profile</span>
            </button>
          </div>
        </form>
      </div>

      {/* ========================================================================= */}
      {/* 3. AUTHORIZED REPRESENTATIVE / PRIMARY CONTACT                            */}
      {/* ========================================================================= */}
      <div id="contact-rep-section" className="neo-card p-6 md:p-8 rounded-[28px] border border-[var(--border-light)] space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-2.5">
            <User className="w-5 h-5 text-[var(--accent-primary)]" />
            <h2 className="text-lg font-black text-[var(--text-primary)]">Primary Authorized Representative</h2>
          </div>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase font-bold">Contact Delegate</span>
        </div>

        <form onSubmit={handleSaveContactInfo} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[var(--text-tertiary)] block mb-1">Representative Name</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="neo-input text-xs font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-[var(--text-tertiary)] block mb-1">Role / Job Title</label>
              <input
                type="text"
                value={contactJobTitle}
                onChange={(e) => setContactJobTitle(e.target.value)}
                className="neo-input text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-[var(--text-tertiary)] block mb-1">Direct Representative Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="neo-input text-xs font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-[var(--text-tertiary)] block mb-1">Direct Representative Phone</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="neo-input text-xs font-mono"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold inline-flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Update Representative Info</span>
            </button>
          </div>
        </form>
      </div>

      {/* ========================================================================= */}
      {/* 4. SECURITY & ORGANIZATION PASSWORDS                                      */}
      {/* ========================================================================= */}
      <div id="security-section" className="neo-card p-6 md:p-8 rounded-[28px] border border-[var(--border-light)] space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[var(--accent-primary)]" />
            <h2 className="text-lg font-black text-[var(--text-primary)]">Organization Security & Password</h2>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 bg-emerald-500/10 neo-pill px-3 py-1 font-bold">
            Admin Provisioned Account
          </span>
        </div>

        <p className="text-xs text-[var(--text-secondary)]">
          Initial Organization ID & password credentials are created exclusively via the <strong>Admin Portal</strong>. You may update your organization password below.
        </p>

        <form onSubmit={handleChangePassword} className="space-y-4 text-xs max-w-xl">
          <div className="space-y-3">
            <div>
              <label className="font-bold text-[var(--text-tertiary)] block mb-1">Current Organization Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                className="neo-input text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[var(--text-tertiary)] block mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="neo-input text-xs font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-[var(--text-tertiary)] block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="neo-input text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
              PCI 256-Bit Encrypted Storage
            </span>

            <button
              type="submit"
              className="neo-btn neo-btn-accent text-xs py-2.5 px-6 font-bold inline-flex items-center gap-2"
            >
              <Key className="w-4 h-4" />
              <span>Update Org Password</span>
            </button>
          </div>
        </form>

        <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-[var(--text-primary)] block">Recent Organization Portal Sessions</span>
            <span className="text-[11px] font-mono text-[var(--text-tertiary)] block">
              San Francisco HQ • Chrome MacOS • Active Session
            </span>
          </div>

          <button
            onClick={() => onLogout()}
            className="neo-pill px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-500/10 inline-flex items-center gap-2 border border-rose-500/30 shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Organization Session</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. NOTIFICATION PREFERENCES                                               */}
      {/* ========================================================================= */}
      <div className="neo-card p-6 md:p-8 rounded-[28px] border border-[var(--border-light)] space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-[var(--accent-primary)]" />
            <h2 className="text-lg font-black text-[var(--text-primary)]">Organization Dispatch Preferences</h2>
          </div>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase font-bold">Alert Rules</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'projectUpdates', label: 'Project Milestones & Sprint Progress', desc: 'Notify organization contacts when sprint milestones are completed.' },
            { key: 'messages', label: 'Agency Direct Messaging', desc: 'Get alerts when senior architects or PMs dispatch messages.' },
            { key: 'invoices', label: 'Invoices & Billing Receipts', desc: 'Receive automatic billing invoices and payment receipts.' },
            { key: 'meetingReminders', label: 'Consultation & Meeting Syncs', desc: 'Get meeting reminders 15 minutes before scheduled Google Meet calls.' },
            { key: 'supportTickets', label: 'Support Ticket Resolutions', desc: 'Receive dispatch notifications when technical tickets receive replies.' },
            { key: 'marketingEmails', label: 'Agency Executive Briefings', desc: 'Receive quarterly product feature updates and release notes.' }
          ].map((item) => {
            const isChecked = notifs[item.key as keyof typeof notifs] ?? true;
            return (
              <div
                key={item.key}
                onClick={() => toggleNotif(item.key as keyof typeof notifs)}
                className="neo-inset p-4 rounded-2xl flex items-start justify-between gap-4 cursor-pointer hover:border-[var(--accent-primary)] transition-all border border-transparent"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[var(--text-primary)] block leading-snug">{item.label}</span>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>

                <div className={`w-11 h-6 rounded-full p-1 transition-colors shrink-0 ${isChecked ? 'bg-[var(--accent-primary)]' : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isChecked ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. ACCOUNT INFORMATION (Read-only)                                        */}
      {/* ========================================================================= */}
      <div className="neo-card p-6 md:p-8 rounded-[28px] border border-[var(--border-light)] space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-2.5">
            <Info className="w-5 h-5 text-[var(--accent-primary)]" />
            <h2 className="text-lg font-black text-[var(--text-primary)]">Organization Account Record (Read-Only)</h2>
          </div>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase font-bold">Admin Provisioned</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="neo-inset p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold block">Organization ID</span>
            <span className="font-extrabold text-[var(--text-primary)] font-mono block">{profile.clientId || 'CLT-ORG-2026-8819'}</span>
          </div>

          <div className="neo-inset p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold block">Account Provisioned</span>
            <span className="font-extrabold text-[var(--text-primary)] font-mono block">{profile.clientSince || 'July 2026'}</span>
          </div>

          <div className="neo-inset p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold block">Active Engagements</span>
            <span className="font-extrabold text-[var(--accent-primary)] font-mono block">1 Active</span>
          </div>

          <div className="neo-inset p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold block">Creation Channel</span>
            <span className="font-extrabold text-emerald-600 font-mono block">Byte Build Admin Portal</span>
          </div>
        </div>

        <div className="neo-inset p-4 rounded-xl flex items-center justify-between text-xs font-mono">
          <span className="text-[var(--text-tertiary)]">Account Governance</span>
          <span className="font-bold text-[var(--text-primary)]">Strictly Admin Provisioned Enterprise Account</span>
        </div>
      </div>

    </div>
  );
};
