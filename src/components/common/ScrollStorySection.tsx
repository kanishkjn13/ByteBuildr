import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';

interface ScrollStorySectionProps {
  id?: string;
  theme?: 'light' | 'dark' | 'gradient';
  header: React.ReactNode;
  illustration?: React.ReactNode;
  description: React.ReactNode;
  cta?: React.ReactNode;
  className?: string;
}

export const ScrollStorySection: React.FC<ScrollStorySectionProps> = ({
  id,
  theme = 'dark',
  header,
  illustration,
  description,
  cta,
  className = ''
}) => {
  const isMobile = useIsMobile();

  // Desktop render remains standard, unchanged
  if (!isMobile) {
    return (
      <section id={id} className={className}>
        {header}
        {illustration}
        {description}
        {cta}
      </section>
    );
  }

  // Mobile storyteller layout: alternate background morph styling
  const bgStyles = {
    dark: 'bg-[var(--bg-primary)] border-b border-[var(--border-subtle)]',
    light: 'bg-[var(--surface-card)] border-b border-[var(--border-light)] dark:bg-[var(--bg-primary)] dark:border-b dark:border-[var(--border-subtle)]',
    gradient: 'bg-gradient-to-b from-[var(--bg-primary)] via-blue-950/10 to-[var(--bg-primary)] border-b border-[var(--border-soft)]'
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring' as const, damping: 25, stiffness: 180 } 
    }
  };

  const graphicVariants = {
    hidden: { opacity: 0, scale: 0.95, filter: 'blur(4px)' },
    show: { 
      opacity: 1, 
      scale: 1, 
      filter: 'blur(0px)', 
      transition: { type: 'spring' as const, damping: 22, stiffness: 150 } 
    }
  };

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
      className={`py-16 px-6 text-left flex flex-col justify-center space-y-6 overflow-hidden ${bgStyles[theme]} ${className}`}
    >
      {/* 1. Staggered Header */}
      <motion.div variants={itemVariants} className="space-y-3">
        {header}
      </motion.div>

      {/* 2. Graphic / Illustration / Mockup */}
      {illustration && (
        <motion.div variants={graphicVariants} className="w-full py-2 flex justify-center">
          {illustration}
        </motion.div>
      )}

      {/* 3. Description Block */}
      <motion.div variants={itemVariants} className="max-w-md font-sans">
        {description}
      </motion.div>

      {/* 4. Staggered CTA */}
      {cta && (
        <motion.div variants={itemVariants} className="pt-2">
          {cta}
        </motion.div>
      )}
    </motion.section>
  );
};

export default ScrollStorySection;
