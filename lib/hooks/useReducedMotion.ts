'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect user's reduced motion preference
 * Returns true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side only)
    if (typeof window === 'undefined') {
      return;
    }

    // Create media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Create event listener for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add listener
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Get animation variants that respect reduced motion preference
 * @param shouldReduceMotion - Whether to reduce motion
 * @param fullMotionVariants - Full animation variants
 * @param reducedMotionVariants - Reduced motion variants (optional, defaults to no animation)
 */
export function getMotionVariants<T extends Record<string, any>>(
  shouldReduceMotion: boolean,
  fullMotionVariants: T,
  reducedMotionVariants?: Partial<T>
): T {
  if (!shouldReduceMotion) {
    return fullMotionVariants;
  }

  // If reduced motion variants provided, use them
  if (reducedMotionVariants) {
    return { ...fullMotionVariants, ...reducedMotionVariants } as T;
  }

  // Otherwise, return variants with no animation
  const noMotionVariants = Object.keys(fullMotionVariants).reduce((acc, key) => {
    acc[key] = {};
    return acc;
  }, {} as any);

  return noMotionVariants as T;
}

/**
 * Get transition config that respects reduced motion preference
 * @param shouldReduceMotion - Whether to reduce motion
 * @param transition - Full transition config
 */
export function getMotionTransition(
  shouldReduceMotion: boolean,
  transition?: any
): any {
  if (shouldReduceMotion) {
    return { duration: 0 };
  }
  return transition;
}
