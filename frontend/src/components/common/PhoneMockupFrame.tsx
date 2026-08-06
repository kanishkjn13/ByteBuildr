import React from 'react';

interface PhoneMockupFrameProps {
  children: React.ReactNode;
  widthClass?: string;
  heightClass?: string;
  borderClass?: string;
  roundedClass?: string;
  innerRoundedClass?: string;
  showButtons?: boolean;
}

export const PhoneMockupFrame: React.FC<PhoneMockupFrameProps> = ({ 
  children,
  widthClass = 'w-[280px]',
  heightClass = 'h-[500px]',
  borderClass = 'border-[9px]',
  roundedClass = 'rounded-[42px]',
  innerRoundedClass = 'rounded-[32px]',
  showButtons = true
}) => {
  return (
    /* Metallic outer chassis edge (Titanium/Stainless Steel simulation) */
    <div className={`relative mx-auto ${widthClass} ${heightClass} bg-gradient-to-b from-slate-600 via-slate-800 to-slate-950 p-[3px] rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-slate-700/30 select-none pointer-events-auto transition-all`}>
      
      {/* Inner Black Bezel Frame */}
      <div className={`w-full h-full bg-slate-950 ${borderClass} border-slate-900 ${roundedClass} overflow-hidden relative flex flex-col justify-between`}>
        
        {/* Dynamic Island camera cutout */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[34%] h-5 bg-[#08080C] rounded-full z-30 flex items-center justify-center border border-slate-800/40 shadow-inner">
          {/* Subtle camera lens glare */}
          <div className="w-2 h-2 rounded-full bg-[#12121A] absolute left-[15%] flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-blue-900/60" />
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#0E0E12] absolute right-[15%]" />
        </div>

        {/* Side physical buttons details */}
        {showButtons && (
          <>
            {/* Ring/Silent switch */}
            <div className="absolute top-[16%] -left-[12px] w-[3px] h-[5%] bg-gradient-to-r from-slate-600 to-slate-400 rounded-r shadow-sm border-r border-slate-500" />
            {/* Volume Up */}
            <div className="absolute top-[25%] -left-[12px] w-[3px] h-[10%] bg-gradient-to-r from-slate-600 to-slate-400 rounded-r shadow-sm border-r border-slate-500" />
            {/* Volume Down */}
            <div className="absolute top-[37%] -left-[12px] w-[3px] h-[10%] bg-gradient-to-r from-slate-600 to-slate-400 rounded-r shadow-sm border-r border-slate-500" />
            {/* Power Button */}
            <div className="absolute top-[28%] -right-[12px] w-[3px] h-[14%] bg-gradient-to-l from-slate-600 to-slate-400 rounded-l shadow-sm border-l border-slate-500" />
          </>
        )}

        {/* Display Glass screen wrapper */}
        <div className={`w-full h-full relative z-10 bg-slate-950 ${innerRoundedClass} overflow-hidden`}>
          
          {/* Glass reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.04] pointer-events-none z-30" />
          
          {/* Home swipe indicator bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[35%] h-1 bg-white/45 rounded-full z-30" />
          
          {children}
        </div>

      </div>
    </div>
  );
};


