import React, { useState, useRef } from 'react';

interface BeforeAfterSliderProps {
  afterImage: string;
  alt: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ afterImage, alt }) => {
  const [sliderPos, setSliderPos] = useState(50); // initial 50%
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current && e.buttons !== 1) return;
    updatePosition(e.clientX);
  };

  const handleStartDrag = (clientX: number) => {
    isDragging.current = true;
    updatePosition(clientX);
  };

  const handleStopDrag = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={(e) => handleStartDrag(e.touches[0].clientX)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleStopDrag}
      onMouseDown={(e) => handleStartDrag(e.clientX)}
      onMouseMove={handleMouseMove}
      onMouseUp={handleStopDrag}
      onMouseLeave={handleStopDrag}
      className="relative w-full h-full select-none overflow-hidden rounded-[24px] cursor-ew-resize bg-slate-900 border border-[var(--border-soft)]"
    >
      {/* Before Image (Legacy - grayscale, blur, low contrast) */}
      <div className="absolute inset-0 bg-slate-950">
        <img
          src={afterImage}
          alt={`${alt} - Before Legacy`}
          className="w-full h-full object-cover filter grayscale contrast-75 brightness-[0.4] blur-[0.5px]"
          draggable={false}
        />
        <div className="absolute top-3 right-3 bg-rose-500/90 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full shadow-sm z-20">
          Before (Slow Legacy)
        </div>
      </div>

      {/* After Image (Byte Build - Vibrant color) */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden z-10 border-r-2 border-white shadow-xl"
        style={{ width: `${sliderPos}%` }}
      >
        <div className="absolute inset-y-0 left-0 w-[260px] h-full">
          <img
            src={afterImage}
            alt={`${alt} - After Byte Build`}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute top-3 left-3 bg-emerald-500/90 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full shadow-sm">
            After (Byte Build Speed)
          </div>
        </div>
      </div>

      {/* Sliding Drag Handle line */}
      <div
        className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-lg z-20"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="w-7 h-7 rounded-full bg-white text-slate-950 border border-slate-300 shadow-2xl flex items-center justify-center text-xs select-none hover:scale-105 active:scale-95 transition-transform">
          ↔
        </div>
      </div>
    </div>
  );
};
