import React from 'react';

interface PhoneMockupFrameProps {
  children: React.ReactNode;
}

export const PhoneMockupFrame: React.FC<PhoneMockupFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto w-[280px] h-[500px] bg-slate-950 border-[10px] border-slate-900 rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] ring-4 ring-slate-800/60 overflow-hidden select-none pointer-events-auto">
      {/* Speaker notch / Dynamic Island camera cutout */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-center">
        {/* Lenses */}
        <div className="w-1.5 h-1.5 rounded-full bg-slate-950 absolute left-4" />
        <div className="w-2 h-2 rounded-full bg-blue-950/40 absolute right-4 border border-blue-900/10" />
      </div>

      {/* Side physical buttons details */}
      <div className="absolute top-20 -left-[12px] w-[2px] h-10 bg-slate-800 rounded-r-sm" />
      <div className="absolute top-36 -left-[12px] w-[2px] h-14 bg-slate-800 rounded-r-sm" />
      <div className="absolute top-54 -left-[12px] w-[2px] h-14 bg-slate-800 rounded-r-sm" />
      <div className="absolute top-28 -right-[12px] w-[2px] h-16 bg-slate-800 rounded-l-sm" />

      {/* High-fidelity display frame */}
      <div className="w-full h-full relative z-10 bg-slate-950 rounded-[34px] overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default PhoneMockupFrame;
