/**
 * useViewport - Responsive breakpoint detection hook.
 * Returns current breakpoint and boolean flags for common checks.
 */

import { useState, useEffect } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;

function getBreakpoint(width: number): Breakpoint {
  if (width <= BREAKPOINTS.tablet) return 'mobile';
  if (width <= BREAKPOINTS.desktop) return 'tablet';
  if (width <= BREAKPOINTS.wide) return 'desktop';
  return 'wide';
}

export function useViewport() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    typeof window !== 'undefined' ? getBreakpoint(window.innerWidth) : 'desktop'
  );

  useEffect(() => {
    let rafId: number;

    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setBreakpoint(getBreakpoint(window.innerWidth));
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop' || breakpoint === 'wide',
    isWide: breakpoint === 'wide',
    isTouchDevice: breakpoint === 'mobile' || breakpoint === 'tablet',
  };
}
