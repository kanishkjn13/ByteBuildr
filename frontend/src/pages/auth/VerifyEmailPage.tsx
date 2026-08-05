import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MailCheck, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import { ROUTES } from '../../constants/routes';

export const VerifyEmailPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { verifyEmail, user } = useAuth();
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyEmail(code);
    setToastMessage('Email verified successfully!');
    setTimeout(() => {
      navigate(user?.role === 'Client' ? ROUTES.PORTAL : ROUTES.ADMIN);
    }, 600);
  };

  const handleResend = () => {
    setToastMessage('Verification code resent to your inbox.');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center p-4 sm:p-6 text-left font-sans">
      
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 neo-card p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 flex items-center gap-3 text-xs text-emerald-600 font-bold shadow-2xl">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl neo-inset text-[var(--accent-primary)] flex items-center justify-center mx-auto">
            <MailCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-[var(--text-primary)]">Verify Your Email</h1>
          <p className="text-xs text-[var(--text-secondary)] font-mono">
            Enter the 6-digit confirmation code sent to <span className="text-[var(--text-primary)] font-bold">{user?.email || 'your email'}</span>.
          </p>
        </div>

        <div className="neo-card p-6 sm:p-8 rounded-[28px] border border-[var(--border-light)] shadow-2xl space-y-6">
          <form onSubmit={handleVerify} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[var(--text-tertiary)] block text-center">Confirmation Code</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="491204"
                className="neo-input text-center text-lg font-mono tracking-widest font-bold"
              />
            </div>

            <button type="submit" className="neo-btn neo-btn-accent w-full py-3.5 text-xs font-bold justify-center">
              <span>Verify & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)] text-xs">
            <button onClick={handleResend} className="text-[var(--accent-primary)] font-bold flex items-center gap-1 hover:underline">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Resend Code</span>
            </button>

            <Link to={ROUTES.LOGIN} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] font-mono font-bold">
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
