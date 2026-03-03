# Animation System Documentation

## Overview

The Sentinel Systems website uses a comprehensive animation system built on Framer Motion and GSAP, optimized for 60fps performance and full accessibility support including reduced motion preferences.

## Key Features

- **GPU-Accelerated Animations**: All animations use `transform` and `opacity` properties for optimal performance
- **Reduced Motion Support**: Automatically detects and respects `prefers-reduced-motion` user preference
- **Lazy Loading**: Animation libraries are loaded on-demand to reduce initial bundle size
- **Intersection Observer**: Scroll-triggered animations use Intersection Observer API for performance
- **60fps Target**: All animations are optimized to maintain 60 frames per second

## Architecture

### Core Files

1. **`lib/hooks/useReducedMotion.ts`** - Hook for detecting reduced motion preference
2. **`lib/utils/animations.ts`** - Reusable animation variants and configurations
3. **`lib/utils/lazy-animations.ts`** - Lazy loading utilities for animation libraries
4. **`app/globals.css`** - CSS animations and reduced motion media queries

### Animation Libraries

- **Framer Motion**: Declarative animations for React components
- **GSAP**: Complex timeline-based animations (hero gradient, scroll effects)

## Usage Examples

### Basic Fade In Animation

```tsx
import { motion } from 'framer-motion';
import { fadeInUp, smoothTransition } from '@/lib/utils/animations';

function MyComponent() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={smoothTransition}
    >
      Content
    </motion.div>
  );
}
```

### Scroll-Triggered Animation

```tsx
import { motion } from 'framer-motion';
import { fadeInUp, viewportConfig } from '@/lib/utils/animations';

function MyComponent() {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={viewportConfig}
      variants={fadeInUp}
    >
      Content appears when scrolled into view
    </motion.div>
  );
}
```

### Stagger Animation (Children Animate in Sequence)

```tsx
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/utils/animations';

function MyComponent() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={staggerItem}>
          {item.content}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### With Reduced Motion Support

```tsx
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { fadeInUp, hoverScale } from '@/lib/utils/animations';

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      variants={prefersReducedMotion ? {} : fadeInUp}
      whileHover={prefersReducedMotion ? {} : hoverScale}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
    >
      Click me
    </motion.button>
  );
}
```

### GSAP Timeline Animation

```tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

function MyComponent() {
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!elementRef.current || prefersReducedMotion) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    tl.to(elementRef.current, {
      opacity: 0.5,
      duration: 2,
      ease: 'power1.inOut'
    });

    return () => tl.kill();
  }, [prefersReducedMotion]);

  return <div ref={elementRef}>Animated content</div>;
}
```

## Available Animation Variants

### Fade Animations
- `fadeIn` - Simple fade in/out
- `fadeInUp` - Fade in from bottom
- `fadeInDown` - Fade in from top
- `fadeInLeft` - Fade in from left
- `fadeInRight` - Fade in from right

### Scale Animations
- `scaleIn` - Scale up with fade
- `hoverScale` - Scale up on hover (1.05x)
- `tapScale` - Scale down on tap (0.95x)

### Container Animations
- `staggerContainer` - Container for stagger children
- `staggerItem` - Item that animates in stagger sequence
- `modalVariants` - Modal/dialog open/close animation
- `accordionVariants` - Accordion expand/collapse

### Hover Effects
- `hoverLift` - Lift element up on hover (-8px)
- `hoverScale` - Scale element on hover (1.05x)

## Transitions

- `defaultTransition` - 0.3s ease-out (quick interactions)
- `smoothTransition` - 0.6s ease-out (smooth page elements)
- `springTransition` - Spring physics (bouncy effects)

## Performance Optimization

### GPU Acceleration

All animations use GPU-accelerated CSS properties:
- ✅ `transform` (translate, scale, rotate)
- ✅ `opacity`
- ❌ Avoid: `width`, `height`, `top`, `left`, `margin`, `padding`

### Will-Change Property

For elements that will be animated, apply `will-change` CSS property:

```tsx
import { willChangeTransformOpacity } from '@/lib/utils/animations';

<motion.div style={willChangeTransformOpacity}>
  Animated content
</motion.div>
```

**Important**: Remove `will-change` after animation completes to free up GPU resources.

### Intersection Observer

Scroll-triggered animations use Intersection Observer for better performance:

```tsx
const viewportConfig = {
  once: true,        // Animate only once
  margin: '-50px',   // Trigger 50px before entering viewport
  amount: 0.3,       // Trigger when 30% visible
};
```

### Lazy Loading

Animation libraries are lazy-loaded to reduce initial bundle size:

```tsx
import { loadScrollTrigger } from '@/lib/utils/lazy-animations';

// Load GSAP ScrollTrigger only when needed
const { gsap, ScrollTrigger } = await loadScrollTrigger();
```

## Reduced Motion Support

### Automatic Detection

The system automatically detects the user's motion preference:

```tsx
const prefersReducedMotion = useReducedMotion();
```

### CSS Media Query

CSS animations are automatically disabled:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Guidelines

When reduced motion is enabled:
- ✅ **Keep**: Functional animations (accordion expand, modal open)
- ✅ **Keep**: Instant state changes (no duration)
- ❌ **Disable**: Decorative animations (parallax, gradient shifts)
- ❌ **Disable**: Continuous animations (infinite loops)
- ❌ **Disable**: Typing effects and complex sequences

## Testing

### Test Reduced Motion

**Chrome DevTools:**
1. Open DevTools (F12)
2. Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
3. Type "Emulate CSS prefers-reduced-motion"
4. Select "reduce"

**Firefox:**
1. Type `about:config` in address bar
2. Search for `ui.prefersReducedMotion`
3. Set to `1` (reduce motion)

**macOS System Setting:**
System Preferences → Accessibility → Display → Reduce motion

**Windows System Setting:**
Settings → Ease of Access → Display → Show animations in Windows

### Performance Testing

1. **Chrome DevTools Performance Tab**
   - Record animation
   - Check for 60fps (green bars)
   - Look for layout thrashing (purple bars)

2. **Lighthouse Audit**
   - Run performance audit
   - Check "Avoid non-composited animations"
   - Target: 95+ performance score

3. **Frame Rate Monitor**
   ```tsx
   // Add to component for debugging
   useEffect(() => {
     let frameCount = 0;
     let lastTime = performance.now();
     
     const countFrames = () => {
       frameCount++;
       const currentTime = performance.now();
       
       if (currentTime >= lastTime + 1000) {
         console.log(`FPS: ${frameCount}`);
         frameCount = 0;
         lastTime = currentTime;
       }
       
       requestAnimationFrame(countFrames);
     };
     
     requestAnimationFrame(countFrames);
   }, []);
   ```

## Best Practices

### DO ✅

- Use `transform` and `opacity` for animations
- Apply `will-change` before animation starts
- Remove `will-change` after animation completes
- Use Intersection Observer for scroll animations
- Respect `prefers-reduced-motion` preference
- Keep animations under 0.6s for UI interactions
- Test on low-end devices
- Lazy load animation libraries

### DON'T ❌

- Animate `width`, `height`, `top`, `left`
- Use `will-change` on all elements
- Create infinite animations without reduced motion check
- Animate during page load (blocks rendering)
- Use heavy animations on mobile
- Ignore accessibility preferences
- Load all animation libraries upfront

## Troubleshooting

### Animations Feel Janky

1. Check if using GPU-accelerated properties
2. Verify 60fps in Chrome DevTools
3. Reduce number of simultaneous animations
4. Check for layout thrashing
5. Test on target devices

### Animations Not Working

1. Verify Framer Motion is installed
2. Check component is client-side (`'use client'`)
3. Verify variants are correctly defined
4. Check browser console for errors
5. Test without reduced motion enabled

### Bundle Size Too Large

1. Use lazy loading for GSAP
2. Import only needed Framer Motion features
3. Use dynamic imports for heavy animations
4. Check bundle analyzer for animation library size

## Migration Guide

### From CSS Animations

**Before:**
```css
.element {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**After:**
```tsx
import { motion } from 'framer-motion';
import { fadeIn, smoothTransition } from '@/lib/utils/animations';

<motion.div
  variants={fadeIn}
  initial="initial"
  animate="animate"
  transition={smoothTransition}
/>
```

### From jQuery Animations

**Before:**
```javascript
$('.element').fadeIn(600);
```

**After:**
```tsx
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/utils/animations';

<motion.div variants={fadeIn} initial="initial" animate="animate" />
```

## Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Web Animations Performance](https://web.dev/animations/)
- [Reduced Motion Guide](https://web.dev/prefers-reduced-motion/)
- [CSS Triggers](https://csstriggers.com/) - Check which properties trigger layout/paint

## Support

For questions or issues with the animation system, refer to:
- This documentation
- Component source code examples
- Design system documentation
- Web performance best practices
