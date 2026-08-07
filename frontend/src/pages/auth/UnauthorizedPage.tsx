import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import { ROUTES } from '../../constants/routes';

export const UnauthorizedPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center p-4 sm:p-6 text-left font-sans">
      <div className="w-full max-w-md text-center space-y-6">
        
        <div className="w-16 h-16 rounded-3xl neo-inset text-rose-500 flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="neo-pill px-3 py-1 text-[10px] font-mono font-bold text-rose-500 bg-rose-500/10">
            HTTP 403 FORBIDDEN • RBAC ENFORCED
          </span>
          <h1 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
            Access Restricted
          </h1>
          <p className="text-xs text-[var(--text-secondary)] font-mono leading-relaxed max-w-sm mx-auto">
            Your account role <span className="font-bold text-[var(--text-primary)]">({user?.role || 'Guest'})</span> does not have authorization to view this internal administrative module.
          </p>
        </div>

        <div className="neo-card p-6 rounded-[24px] border border-[var(--border-light)] space-y-4">
          <div className="neo-inset p-4 rounded-xl text-xs space-y-1 font-mono text-left">
            <div className="flex justify-between">
              <span className="text-[var(--text-tertiary)]">Current User:</span>
              <span className="font-bold text-[var(--text-primary)]">{user?.fullName || 'Not Logged In'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-tertiary)]">Enforced Policy:</span>
              <span className="font-bold text-rose-500">Client Access Restricted</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
            <Link
              to={user?.role === 'Client' ? ROUTES.PORTAL : ROUTES.HOME}
              className="neo-btn neo-btn-accent py-3 justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go to Client Portal</span>
            </Link>

            <button
              onClick={logout}
              className="neo-btn py-3 justify-center text-rose-500 border-rose-500/30"
            >
              <Lock className="w-4 h-4" />
              <span>Sign Out Account</span>
            </button>
          </div>
        </div>

        <div className="text-[10px] font-mono text-[var(--text-tertiary)]">
          ByteBuilders Enterprise Role-Based Access Control System
        </div>

      </div>
    </div>
  );
};
