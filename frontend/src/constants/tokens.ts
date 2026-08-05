/**
 * Centralized Design Tokens for Byte Build
 * Version 5.0: Apple Motion Design, Lenis Smooth Scroll & Micro-Interactions
 */

export const DESIGN_TOKENS = {
  colors: {
    accentPrimary: '#2563EB',
    accentHover: '#1D4ED8',
    accentLight: '#EFF6FF',
    
    bgPrimary: '#FAFAFA',
    surfaceSecondary: '#FFFFFF',
    surfaceElevated: '#FCFCFC',
    borderSoft: '#E9ECEF',

    textPrimary: '#111827',
    textSecondary: '#4B5563',
    textMuted: '#9CA3AF',

    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6'
  },
  typography: {
    fontHeadings: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
    fontBody: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    
    heroDisplay: 'clamp(2.75rem, 6vw, 5.25rem)',     // 72px–96px
    pageHeading: 'clamp(2.25rem, 4.5vw, 4rem)',       // 56px–64px
    sectionHeading: 'clamp(2rem, 3.8vw, 3rem)',       // 40px–48px
    subHeading: 'clamp(1.5rem, 2.5vw, 2rem)',         // 28px–32px
    cardHeading: 'clamp(1.25rem, 2vw, 1.5rem)',       // 22px–24px
    bodyText: 'clamp(1.125rem, 1.5vw, 1.25rem)',      // 18px–20px
    captionText: 'clamp(0.875rem, 1.2vw, 1rem)',      // 14px–16px
    labelBadge: 'clamp(0.75rem, 1vw, 0.875rem)'       // 12px–14px
  },
  radii: {
    button: '14px',
    input: '18px',
    card: '28px',
    hero: '36px',
    window: '40px',
    pill: '9999px'
  },
  motion: {
    // Apple-grade cubic-bezier curves
    easeApple: [0.16, 1, 0.3, 1] as const,
    transitionFast: '0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    transitionStandard: '0.35s cubic-bezier(0.16, 1, 0.3, 1)',
    transitionSlow: '0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    hoverLiftY: -6,
    hoverBtnY: -2,
    tapScale: 0.98
  }
} as const;
