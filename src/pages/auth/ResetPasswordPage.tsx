import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, CheckCircle2, KeyRound } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';
import { ROUTES } from '../../constants/routes';

export const ResetPasswordPage: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { resetPassword, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await resetPassword('user@company.com', otp, newPassword);
    setIsSuccess(true);
    setTimeout(() => {
      navigate(ROUTES.LOGIN);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center p-4 sm:p-6 text-left font-sans">
      <div className="w-full max-w-md space-y-8">
        
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl neo-inset text-emerald-500 flex items-center justify-center mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-[var(--text-primary)]">Set New Password</h1>
          <p className="text-xs text-[var(--text-secondary)] font-mono">
            Enter the 6-digit OTP code sent to your email and your new password.
          </p>
        </div>

        <div className="neo-card p-6 sm:p-8 rounded-[28px] border border-[var(--border-light)] shadow-2xl space-y-6">
          {isSuccess ? (
            <div className="space-y-4 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Password Successfully Updated</h3>
              <p className="text-xs text-[var(--text-secondary)]">Redirecting to login...</p>
            </div>
          ) : (
            <form onSubmit={handleResetSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[var(--text-tertiary)] block">OTP Verification Code</label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="891204"
                  className="neo-input text-center text-sm font-mono tracking-widest"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[var(--text-tertiary)] block">New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[var(--text-tertiary)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="neo-input pl-10 text-xs font-mono"
                  />
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="neo-btn neo-btn-accent w-full py-3.5 text-xs font-bold justify-center">
                <span>{isLoading ? 'Updating...' : 'Confirm New Password'}</span>
              </button>
            </form>
          )}

          <div className="text-center pt-2 border-t border-[var(--border-subtle)]">
            <Link to={ROUTES.LOGIN} className="text-[11px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] font-mono font-bold">
              ← Back to Login
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
