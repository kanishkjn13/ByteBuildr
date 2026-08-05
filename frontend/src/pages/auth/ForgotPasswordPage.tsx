import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import { ROUTES } from '../../constants/routes';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center p-4 sm:p-6 text-left font-sans">
      <div className="w-full max-w-md space-y-8">
        
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl neo-inset text-[var(--accent-primary)] flex items-center justify-center mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-[var(--text-primary)]">Reset Password</h1>
          <p className="text-xs text-[var(--text-secondary)] font-mono">
            Enter your account email to receive a password reset link & OTP.
          </p>
        </div>

        <div className="neo-card p-6 sm:p-8 rounded-[28px] border border-[var(--border-light)] shadow-2xl space-y-6">
          {isSubmitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-[var(--text-primary)]">Verification Email Dispatched</h3>
              <p className="text-xs text-[var(--text-secondary)] font-mono">
                We've sent a password reset token to <span className="font-bold text-[var(--text-primary)]">{email}</span>.
              </p>
              <Link to={ROUTES.RESET_PASSWORD} className="neo-btn neo-btn-accent w-full py-3 text-xs font-bold justify-center">
                <span>Enter Reset OTP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[var(--text-tertiary)] block">Registered Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[var(--text-tertiary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="neo-input pl-10 text-xs font-mono"
                  />
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="neo-btn neo-btn-accent w-full py-3.5 text-xs font-bold justify-center">
                <span>{isLoading ? 'Processing...' : 'Send Reset Instructions'}</span>
              </button>
            </form>
          )}

          <div className="text-center pt-2 border-t border-[var(--border-subtle)]">
            <Link to={ROUTES.LOGIN} className="text-[11px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] font-mono font-bold">
              ← Return to Login Page
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
