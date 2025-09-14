import { useState, useEffect } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpointValues: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Hook to get the current breakpoint based on window width.
 * Returns the current breakpoint and utilities for responsive behavior.
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    function updateBreakpoint() {
      const currentWidth = window.innerWidth;
      setWidth(currentWidth);

      // Find the largest breakpoint that fits
      let currentBreakpoint: Breakpoint = 'xs';
      for (const [bp, value] of Object.entries(breakpointValues)) {
        if (currentWidth >= value) {
          currentBreakpoint = bp as Breakpoint;
        }
      }
      setBreakpoint(currentBreakpoint);
    }

    // Set initial value
    updateBreakpoint();

    // Listen for resize events
    window.addEventListener('resize', updateBreakpoint);

    return () => {
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, []);

  // Utility functions
  const isAbove = (bp: Breakpoint): boolean => width >= breakpointValues[bp];
  const isBelow = (bp: Breakpoint): boolean => width < breakpointValues[bp];
  const isBetween = (min: Breakpoint, max: Breakpoint): boolean => 
    width >= breakpointValues[min] && width < breakpointValues[max];

  return {
    breakpoint,
    width,
    isAbove,
    isBelow,
    isBetween,
  };
}