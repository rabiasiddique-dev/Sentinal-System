/**
 * Animation utilities for performance-optimized animations
 * Uses GPU-accelerated properties (transform, opacity) for 60fps animations
 */

import type { Variants, Transition } from 'framer-motion';

/**
 * Common easing functions optimized for performance
 */
export const easings = {
  easeOut: [0.16, 1, 0.3, 1],
  easeIn: [0.7, 0, 0.84, 0],
  easeInOut: [0.87, 0, 0.13, 1],
  spring: { type: 'spring', stiffness: 100, damping: 15 },
  springBouncy: { type: 'spring', stiffness: 300, damping: 20 },
} as const;

/**
 * Fade in animation variants
 * Uses opacity (GPU-accelerated)
 */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Fade in from bottom animation variants
 * Uses opacity and transform (GPU-accelerated)
 */
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

/**
 * Fade in from top animation variants
 * Uses opacity and transform (GPU-accelerated)
 */
export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/**
 * Fade in from left animation variants
 * Uses opacity and transform (GPU-accelerated)
 */
export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

/**
 * Fade in from right animation variants
 * Uses opacity and transform (GPU-accelerated)
 */
export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

/**
 * Scale in animation variants
 * Uses opacity and transform scale (GPU-accelerated)
 */
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

/**
 * Stagger container variants for animating children in sequence
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Stagger item variants (use with staggerContainer)
 */
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

/**
 * Modal/Dialog animation variants
 * Combines fade and scale for smooth modal appearance
 */
export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 10 },
};

/**
 * Accordion content animation variants
 */
export const accordionVariants: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: 'auto', opacity: 1 },
};

/**
 * Default transition for smooth animations
 * Optimized for 60fps performance
 */
export const defaultTransition: Transition = {
  duration: 0.3,
  ease: easings.easeOut,
};

/**
 * Smooth transition for longer animations
 */
export const smoothTransition: Transition = {
  duration: 0.6,
  ease: easings.easeOut,
};

/**
 * Spring transition for bouncy effects
 */
export const springTransition: Transition = easings.spring;

/**
 * Viewport configuration for scroll-triggered animations
 * Uses intersection observer for performance
 */
export const viewportConfig = {
  once: true, // Animate only once when entering viewport
  margin: '-50px', // Trigger 50px before element enters viewport
  amount: 0.3, // Trigger when 30% of element is visible
};

/**
 * Hover animation for cards and interactive elements
 * Uses transform for GPU acceleration
 */
export const hoverLift = {
  y: -8,
  transition: { duration: 0.2, ease: easings.easeOut },
};

/**
 * Hover scale animation for buttons
 */
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2, ease: easings.easeOut },
};

/**
 * Tap animation for buttons (press effect)
 */
export const tapScale = {
  scale: 0.95,
};

/**
 * Create stagger animation config
 * @param staggerDelay - Delay between each child animation (default: 0.1s)
 * @param delayChildren - Initial delay before children start animating (default: 0s)
 */
export function createStaggerConfig(
  staggerDelay: number = 0.1,
  delayChildren: number = 0
): Transition {
  return {
    staggerChildren: staggerDelay,
    delayChildren,
  };
}

/**
 * Create scroll-triggered animation config
 * @param delay - Delay before animation starts (default: 0s)
 */
export function createScrollAnimation(delay: number = 0) {
  return {
    initial: 'initial',
    whileInView: 'animate',
    viewport: viewportConfig,
    transition: { ...smoothTransition, delay },
  };
}

/**
 * Performance optimization: Will-change CSS property
 * Apply to elements that will be animated for better performance
 */
export const willChangeTransform = {
  willChange: 'transform',
};

export const willChangeOpacity = {
  willChange: 'opacity',
};

export const willChangeTransformOpacity = {
  willChange: 'transform, opacity',
};
