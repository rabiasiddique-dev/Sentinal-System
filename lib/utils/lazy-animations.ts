/**
 * Lazy loading utilities for animation libraries
 * Reduces initial bundle size by loading animations on demand
 */

/**
 * Lazy load GSAP ScrollTrigger plugin
 * Only loads when needed for scroll-based animations
 */
export async function loadScrollTrigger() {
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  const { gsap } = await import('gsap');
  
  gsap.registerPlugin(ScrollTrigger);
  
  return { gsap, ScrollTrigger };
}

/**
 * Lazy load GSAP core
 * For complex animations that don't need scroll triggers
 */
export async function loadGSAP() {
  const { gsap } = await import('gsap');
  return gsap;
}

/**
 * Check if animations should be enabled based on user preference
 * and device capabilities
 */
export function shouldEnableAnimations(): boolean {
  // Check if window is available (client-side only)
  if (typeof window === 'undefined') {
    return true; // Default to enabled on server
  }

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return false;
  }

  // Check if device has sufficient performance
  // Low-end devices may struggle with complex animations
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  if (connection) {
    // Disable heavy animations on slow connections
    if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return false;
    }
  }

  return true;
}

/**
 * Intersection Observer options for scroll-triggered animations
 * Optimized for performance
 */
export const intersectionObserverOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px 0px -100px 0px', // Trigger 100px before element enters viewport
  threshold: 0.1, // Trigger when 10% of element is visible
};

/**
 * Create an intersection observer for lazy animation loading
 * @param callback - Function to call when element enters viewport
 */
export function createAnimationObserver(
  callback: (entry: IntersectionObserverEntry) => void
): IntersectionObserver {
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, intersectionObserverOptions);
}

/**
 * Preload animation libraries on idle
 * Uses requestIdleCallback to load during browser idle time
 */
export function preloadAnimationsOnIdle() {
  if (typeof window === 'undefined') return;

  const preload = () => {
    // Preload GSAP
    import('gsap');
    // Preload ScrollTrigger
    import('gsap/ScrollTrigger');
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(preload);
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(preload, 1000);
  }
}
