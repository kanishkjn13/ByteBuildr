import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-[75vh] w-full px-6 py-12 space-y-8 bg-[var(--bg-primary)] select-none text-left animate-pulse">
      
      {/* Header Banner Mockup */}
      <div className="space-y-3 max-w-[260px]">
        <div className="h-4 w-28 bg-[var(--border-soft)] rounded-full" />
        <div className="h-7 w-full bg-[var(--border-soft)] rounded-xl" />
        <div className="h-3 w-44 bg-[var(--border-soft)] rounded-full" />
      </div>

      {/* Cards Mockup List */}
      <div className="space-y-6">
        {[1, 2, 3].map((cardIdx) => (
          <div
            key={cardIdx}
            className="p-6 rounded-[28px] border border-[var(--border-light)] bg-[var(--surface-card)] shadow-sm space-y-5"
          >
            {/* Top Row: Icon Circle & Badge Pill */}
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[var(--surface-recessed)] border border-[var(--border-soft)]" />
              <div className="h-5 w-16 bg-[var(--border-soft)] rounded-full" />
            </div>

            {/* Typography lines */}
            <div className="space-y-2.5">
              <div className="h-4 w-3/5 bg-[var(--border-soft)] rounded-lg" />
              <div className="space-y-1.5">
                <div className="h-3 w-full bg-[var(--border-soft)] rounded-md" />
                <div className="h-3 w-[85%] bg-[var(--border-soft)] rounded-md" />
              </div>
            </div>

            {/* Checklist border line & deliverables items */}
            <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[var(--border-soft)]" />
                <div className="h-2.5 w-1/2 bg-[var(--border-soft)] rounded-md" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[var(--border-soft)]" />
                <div className="h-2.5 w-[40%] bg-[var(--border-soft)] rounded-md" />
              </div>
            </div>

            {/* Button Block outline */}
            <div className="h-12 w-full bg-[var(--surface-recessed)] rounded-full border border-[var(--border-soft)]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
