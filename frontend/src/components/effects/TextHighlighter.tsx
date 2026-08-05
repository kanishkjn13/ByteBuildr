import React from 'react';
import { motion } from 'framer-motion';

interface TextHighlighterProps {
  children: React.ReactNode;
  className?: string;
  highlightColor?: string;
}

export const TextHighlighter: React.FC<TextHighlighterProps> = ({
  children,
  className = '',
  highlightColor = 'from-cyan-500/30 via-indigo-500/40 to-blue-500/30'
}) => {
  return (
    <span className={`relative inline-block font-extrabold ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute bottom-1 left-0 right-0 h-[35%] bg-gradient-to-r ${highlightColor} rounded-md -z-0 origin-left blur-[1px]`}
      />
    </span>
  );
};
