import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Building2, Mail, Info } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

export const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center p-4 sm:p-6 text-left font-sans">
      
      <div className="w-full max-w-md space-y-8 my-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <Link to={ROUTES.HOME} className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-white flex items-center justify-center font-black text-2xl shadow-[0_6px_20px_rgba(37,99,235,0.35)] group-hover:scale-105 transition-transform">
              V
            </div>
          </Link>
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[var(--accent-primary)] uppercase font-bold block">
              RESTRICTED ACCOUNT PROVISIONING
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              Admin-Only Client Creation
            </h1>
            <p className="text-xs text-[var(--text-secondary)] font-mono">
              ByteBuilders Enterprise Client Access Protocol
            </p>
          </div>
        </div>

        {/* Restricted Notice Card */}
        <div className="neo-card p-6 sm:p-8 rounded-[28px] border border-[var(--border-light)] shadow-2xl space-y-6 text-center">
          
          <div className="w-16 h-16 rounded-2xl neo-inset border border-amber-500/30 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-extrabold text-[var(--text-primary)]">
              Client Accounts Provisioned by Admin Only
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
              Self-service registration for client accounts is disabled. Organization IDs and initial passwords for clients are created exclusively through the <strong>ByteBuilders Admin Portal</strong>.
            </p>
          </div>

          <div className="neo-inset p-4 rounded-2xl border border-[var(--border-subtle)] text-xs text-left space-y-2 font-mono">
            <div className="flex items-center gap-2 text-[var(--accent-primary)] font-bold">
              <Info className="w-4 h-4 shrink-0" />
              <span>How to access your client portal:</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-[var(--text-secondary)] list-disc pl-4">
              <li>Request your ByteBuilders Project Architect or Admin to provision your organization.</li>
              <li>Your Admin will issue your Organization ID & temporary Password.</li>
              <li>Use your assigned credentials to log into the Client Portal.</li>
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              to={ROUTES.LOGIN}
              className="neo-btn neo-btn-accent w-full py-3.5 text-xs font-bold justify-center shadow-lg hover:shadow-xl transition-all"
            >
              <span>Sign In with Organization Credentials</span>
            </Link>

            <Link
              to={ROUTES.CONTACT}
              className="neo-btn w-full py-3 text-xs font-bold justify-center gap-2 text-[var(--text-secondary)]"
            >
              <Mail className="w-4 h-4" />
              <span>Contact ByteBuilders Admin Team</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-center gap-1.5 text-[11px] text-[var(--text-tertiary)]">
            <Building2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>Existing organization account? </span>
            <Link to={ROUTES.LOGIN} className="text-[var(--accent-primary)] font-bold hover:underline">
              Sign In Here
            </Link>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center text-[10px] font-mono text-[var(--text-tertiary)] flex items-center justify-center gap-2">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>Strict Access Control • Admin Privilege Required</span>
        </div>

      </div>
    </div>
  );
};
