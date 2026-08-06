import React from 'react';

interface MonitorMockupProps {
  children: React.ReactNode;
  url?: string;
  className?: string;
}

export const MonitorMockup: React.FC<MonitorMockupProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative mx-auto w-full max-w-2xl flex flex-col items-center ${className}`}>
      
      {/* Monitor Screen Frame & Bezel */}
      <div className="relative w-full aspect-[16/10] bg-[#0C0F19] rounded-2xl p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-slate-700/30 ring-4 ring-slate-800/10 overflow-hidden flex flex-col z-10">
        
        {/* Specular Glare/Reflection Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.04] pointer-events-none z-20" />

        {/* Display screen area */}
        <div className="w-full flex-1 relative bg-slate-950 overflow-hidden rounded-xl">
          {children}
        </div>
      </div>

      {/* Monitor stand stand-neck (Titanium/Silver gradient) */}
      <div className="w-16 h-9 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-x border-slate-600/30 relative shadow-md z-0 -mt-1" />
      
      {/* Monitor stand base */}
      <div className="w-36 h-2 bg-gradient-to-b from-slate-600 to-slate-800 rounded-t-lg border-t border-slate-500/35 relative shadow-lg z-0" />
    
    </div>
  );
};

export default MonitorMockup;
