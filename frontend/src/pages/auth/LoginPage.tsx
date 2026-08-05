import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import { ROUTES } from '../../constants/routes';
import type { UserRole } from '../../auth/types';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = (location.state as any)?.from?.pathname;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login({ email, password, rememberMe });
      triggerRedirect(user.role);
    } catch (err: any) {
      setToastMessage(err.message || 'Invalid login credentials.');
    }
  };


  const handleGoogleLogin = async () => {
    setToastMessage('Google SSO Login is deactivated. Authorized credentials required.');
  };

  const triggerRedirect = (role: UserRole) => {
    setToastMessage(`Welcome back! Authenticated as ${role}.`);
    setTimeout(() => {
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
      } else if (role === 'Client') {
        navigate(ROUTES.PORTAL, { replace: true });
      } else {
        navigate(ROUTES.ADMIN, { replace: true });
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center p-4 sm:p-6 text-left font-sans">
      
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

      <div className="w-full max-w-md space-y-8">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to={ROUTES.HOME} className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-white flex items-center justify-center font-black text-2xl shadow-[0_6px_20px_rgba(37,99,235,0.35)] group-hover:scale-105 transition-transform">
              V
            </div>
          </Link>
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[var(--accent-primary)] uppercase font-bold block">
              BYTE BUILD ENTERPRISE AUTH
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              Sign In to Your Workspace
            </h1>
            <p className="text-xs text-[var(--text-secondary)] font-mono">
              Unified Single Sign-On for Agency & Client Portal
            </p>
          </div>
        </div>

        {/* Demo Roles Quick Bar */}
        <div className="neo-card p-4 rounded-2xl border border-[var(--border-light)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)] font-bold flex items-center gap-1.5">
              <span>1-Click Demo Login</span>
            </span>
            <span className="text-[9px] font-mono text-emerald-600 font-bold">Auto Detect Role</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              disabled
              className="neo-btn text-[11px] py-2 px-3 justify-center font-bold border-purple-500/10 text-purple-600/40 opacity-40 cursor-not-allowed select-none"
            >
              👑 Admin Demo (Disabled)
            </button>

            <button
              type="button"
              disabled
              className="neo-btn text-[11px] py-2 px-3 justify-center font-bold border-blue-500/10 text-blue-600/40 opacity-40 cursor-not-allowed select-none"
            >
              💼 Client Demo (Disabled)
            </button>

            <button
              type="button"
              disabled
              className="neo-btn text-[11px] py-2 px-3 justify-center font-bold border-indigo-500/10 text-indigo-600/40 opacity-40 cursor-not-allowed select-none"
            >
              📊 PM Demo (Disabled)
            </button>

            <button
              type="button"
              disabled
              className="neo-btn text-[11px] py-2 px-3 justify-center font-bold border-emerald-500/10 text-emerald-600/40 opacity-40 cursor-not-allowed select-none"
            >
              💻 Dev Demo (Disabled)
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="neo-card p-6 sm:p-8 rounded-[28px] border border-[var(--border-light)] shadow-2xl space-y-6">
          
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            
            <div className="space-y-1">
              <label className="font-bold text-[var(--text-tertiary)] block">Business Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[var(--text-tertiary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  aria-label="Business Email Address"
                  className="neo-input pl-10 text-xs font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="font-bold text-[var(--text-tertiary)] block">Password</label>
                <Link to={ROUTES.FORGOT_PASSWORD} className="text-[10px] text-[var(--accent-primary)] font-bold hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[var(--text-tertiary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  aria-label="Account Password"
                  className="neo-input pl-10 pr-10 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[var(--border-light)] text-[var(--accent-primary)] focus:ring-0"
                />
                <span className="text-[11px] text-[var(--text-secondary)] font-medium">Remember me on this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="neo-btn neo-btn-accent w-full py-3.5 text-xs font-bold justify-center shadow-lg hover:shadow-xl transition-all mt-2"
            >
              <span>{isLoading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social SSO Section */}
          <div className="space-y-4 pt-2 border-t border-[var(--border-subtle)]">
            <button
              onClick={handleGoogleLogin}
              className="neo-btn w-full py-3 text-xs font-bold justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2.0 10.05.0 12s.46 3.8 1.27 5.42l4.01-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Continue with Google Workspace</span>
            </button>

            <div className="text-center pt-2">
              <span className="text-[11px] text-[var(--text-tertiary)]">Need client portal access? </span>
              <Link to={ROUTES.REGISTER} className="text-[11px] text-[var(--accent-primary)] font-bold hover:underline">
                Admin Account Provisioning Policy
              </Link>
            </div>
          </div>

        </div>

        {/* Security Footer */}
        <div className="text-center text-[10px] font-mono text-[var(--text-tertiary)] flex items-center justify-center gap-2">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>256-Bit TLS Encrypted Session • PCI DSS Compliant</span>
        </div>

      </div>
    </div>
  );
};
