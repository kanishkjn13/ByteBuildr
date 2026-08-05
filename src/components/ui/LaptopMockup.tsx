import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserCheck, ShieldCheck, ArrowRight, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../auth/AuthContext';

export const LaptopMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'client' | 'admin'>('client');
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleTabChange = (tab: 'client' | 'admin') => {
    setActiveTab(tab);
    setEmail('');
    setPassword('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'client') return; // Client login button is disabled

    try {
      await login({ email, password, rememberMe: true });
      navigate(ROUTES.ADMIN);
    } catch {
      alert('Invalid admin credentials. Authorized credentials required.');
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto text-left">
      
      {/* Ambient Glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-cyan-500/15 blur-2xl rounded-[32px] pointer-events-none" />

      {/* Laptop Screen Body (Minimal Midnight Chassis) */}
      <div className="relative bg-[#0A0D16] rounded-[22px] p-3 shadow-2xl border border-slate-800/80">
        
        {/* Camera Dot */}
        <div className="w-2 h-2 rounded-full bg-slate-800 mx-auto mb-2 flex items-center justify-center">
          <div className="w-0.5 h-0.5 rounded-full bg-blue-500/50" />
        </div>

        {/* Screen Viewport */}
        <div className="relative bg-[#0D111E] rounded-[14px] overflow-hidden min-h-[300px] sm:min-h-[330px] flex flex-col justify-between border border-slate-800/50 text-left">
          
          {/* Top Browser Bar */}
          <div className="bg-[#121727] px-3.5 py-2 border-b border-slate-800/50 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-rose-500/70" />
              <div className="w-2 h-2 rounded-full bg-amber-500/70" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/70" />
            </div>

            <div className="text-[10px] font-mono text-slate-400 bg-[#0A0D16] px-3 py-0.5 rounded-md border border-slate-800/70 flex items-center gap-1">
              <Lock className="w-2.5 h-2.5 text-blue-400" />
              <span>bytebuild.com/sso</span>
            </div>

            <span className="text-[9px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">● LIVE</span>
          </div>

          {/* Ultra-Minimal Canvas */}
          <div className="p-6 flex-1 flex flex-col justify-center">
            
            {/* Minimal Segmented Tab Control */}
            <div className="grid grid-cols-2 gap-1 mb-5 bg-[#070912] p-1 rounded-xl border border-slate-800/80">
              <button
                type="button"
                onClick={() => handleTabChange('client')}
                className={`py-1.5 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'client'
                    ? 'bg-[#1E2638] text-white shadow-sm font-bold border border-blue-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-white font-bold">Client Login</span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('admin')}
                className={`py-1.5 px-3 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'admin'
                    ? 'bg-[#1E2638] text-white shadow-sm font-bold border border-indigo-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-white font-bold">Admin Login</span>
              </button>
            </div>

            {/* Minimal Form */}
            <AnimatePresence mode="wait">
              <motion.form
                key={activeTab}
                onSubmit={handleLogin}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                {/* Email / Username Field */}
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#070912] text-xs font-mono text-slate-200 py-2.5 pl-9 pr-3 rounded-xl border border-slate-800/90 focus:outline-none focus:border-blue-500/60 transition-colors"
                    placeholder="Email or Username"
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#070912] text-xs font-mono text-slate-200 py-2.5 pl-9 pr-9 rounded-xl border border-slate-800/90 focus:outline-none focus:border-blue-500/60 transition-colors"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Single Minimal Submit Button */}
                <button
                  type="submit"
                  disabled={activeTab === 'client'}
                  className={`w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 pt-2.5 ${
                    activeTab === 'client'
                      ? 'bg-slate-800 text-slate-500 opacity-40 cursor-not-allowed border border-slate-700/50 shadow-none'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-600/30 hover:scale-[1.005] active:scale-[0.995]'
                  }`}
                >
                  <span>{activeTab === 'client' ? 'Sign In (Disabled)' : 'Sign In'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.form>
            </AnimatePresence>

          </div>

          {/* Minimal Screen Footer */}
          <div className="bg-[#121727] px-3.5 py-1.5 border-t border-slate-800/50 flex items-center justify-between text-[9px] text-slate-400 font-mono">
            <span>SSO Gateway v2.4</span>
            <span className="text-emerald-400 font-semibold">256-Bit Encrypted</span>
          </div>

        </div>
      </div>

      {/* Laptop Base Stand */}
      <div className="relative bg-slate-800/90 h-2.5 rounded-b-xl max-w-[80%] mx-auto shadow-sm">
        <div className="w-14 h-0.5 rounded-b bg-slate-600 mx-auto" />
      </div>

    </div>
  );
};
