import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  gradient = 'from-blue-400 via-indigo-300 via-cyan-400 to-purple-400'
}) => {
  return (
    <span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent animate-gradient-x ${className}`}
    >
      {children}
    </span>
  );
};
