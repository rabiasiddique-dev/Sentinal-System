# Code Splitting Implementation

## Overview

This document describes the code splitting strategy implemented for the Sentinel Premium Website to optimize initial bundle size and improve page load performance.

## Implementation Strategy

### 1. Dynamic Imports with Next.js

We use Next.js's `dynamic()` function to implement code splitting for heavy components that are not immediately needed on page load.

### 2. Components Split

#### Heavy Components (Dynamically Loaded)

The following components are loaded dynamically with loading states:

1. **AppsSection** (`components/sections/AppsSection.tsx`)
   - Contains modal dialog with detailed app information
   - Uses framer-motion for animations
   - Loaded with skeleton loading state
   - SSR enabled for SEO

2. **FAQSection** (`components/sections/FAQSection.tsx`)
   - Contains Accordion component from Radix UI
   - Uses framer-motion for animations
   - Loaded with skeleton loading state
   - SSR enabled for SEO

3. **LeadCaptureSection** (`components/sections/LeadCaptureSection.tsx`)
   - Complex multi-step form with react-hook-form
   - Zod validation schemas
   - Multiple framer-motion animations
   - Loaded with skeleton loading state
   - SSR enabled for SEO

4. **Dialog Component** (within AppsSection)
   - Radix UI Dialog primitives
   - Only loaded when user clicks on an app card
   - Client-side only (ssr: false)
   - Shows spinner while loading

#### Critical Components (Statically Loaded)

These components remain statically imported for immediate rendering:

- **HeroSection** - Above the fold, critical for first paint
- **TrustSection** - High priority trust indicators
- **ComparisonSection** - Key value proposition
- **FeaturesSection** - Core product features
- **PrivacySection** - Important security information
- **ShieldMDMSection** - Product differentiator
- **UseCasesSection** - Target audience identification

## Loading States

### Skeleton Loaders

Each dynamically loaded component has a custom skeleton loader that:
- Matches the approximate layout of the actual component
- Uses `animate-pulse` for visual feedback
- Maintains consistent spacing to prevent layout shift
- Uses cyber-themed colors (cyber-gray-800)

### Example Loading State

```tsx
loading: () => (
  <div className="relative py-20 bg-cyber-black">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <div className="animate-pulse">
        <div className="h-12 bg-cyber-gray-800 rounded w-64 mx-auto mb-4"></div>
        <div className="h-6 bg-cyber-gray-800 rounded w-96 mx-auto"></div>
      </div>
    </div>
  </div>
)
```

## Performance Benefits

### Bundle Size Reduction

By splitting heavy components:
- Initial JavaScript bundle is smaller
- Faster Time to Interactive (TTI)
- Improved First Contentful Paint (FCP)
- Better Lighthouse performance scores

### Lazy Loading

Components are loaded:
- When they enter the viewport (intersection observer)
- On user interaction (e.g., clicking app card loads Dialog)
- After critical content is rendered

### Network Optimization

- Parallel loading of split chunks
- Browser can prioritize critical resources
- Better caching strategy (split chunks can be cached independently)

## SSR Configuration

### SSR Enabled (ssr: true)

Used for components that need SEO:
- AppsSection
- FAQSection
- LeadCaptureSection

These components are rendered on the server but their JavaScript is loaded separately.

### SSR Disabled (ssr: false)

Used for interactive-only components:
- Dialog components (only needed on user interaction)
- Modal overlays
- Client-side only features

## Best Practices Applied

1. **Progressive Enhancement**
   - Core content loads first
   - Enhanced features load progressively
   - Graceful degradation with loading states

2. **User Experience**
   - Loading states prevent layout shift
   - Smooth transitions between loading and loaded states
   - No jarring content jumps

3. **SEO Optimization**
   - Critical content is SSR
   - Dynamic components still indexed by search engines
   - Proper meta tags and structured data remain intact

4. **Performance Monitoring**
   - Monitor bundle sizes with next/bundle-analyzer
   - Track Core Web Vitals (LCP, FID, CLS)
   - Lighthouse performance audits

## Future Optimizations

### Potential Improvements

1. **Route-based Code Splitting**
   - Split blog pages separately
   - Lazy load admin dashboard (when implemented)

2. **Component-level Optimization**
   - Further split large components into smaller chunks
   - Lazy load third-party libraries (e.g., animation libraries)

3. **Prefetching**
   - Prefetch components on hover
   - Predictive prefetching based on user behavior

4. **Image Optimization**
   - Already implemented with Next.js Image
   - Consider WebP/AVIF formats
   - Responsive images with srcset

## Testing

### Performance Testing

Run these commands to verify code splitting effectiveness:

```bash
# Build and analyze bundle
npm run build
npm run analyze

# Check bundle sizes
ls -lh .next/static/chunks/

# Run Lighthouse audit
npm run lighthouse
```

### Expected Results

- Performance score: 95+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Total Blocking Time: < 200ms

## Maintenance

### Adding New Dynamic Components

When adding new heavy components:

1. Identify if component is critical (above fold) or can be deferred
2. Create appropriate loading state
3. Use `dynamic()` import with configuration:
   ```tsx
   const MyComponent = dynamic(() => import('./MyComponent'), {
     loading: () => <LoadingSkeleton />,
     ssr: true, // or false based on SEO needs
   });
   ```
4. Test loading behavior and performance impact

### Monitoring

Regularly check:
- Bundle size reports
- Lighthouse scores
- Core Web Vitals in production
- User experience metrics (bounce rate, time on page)

## References

- [Next.js Dynamic Imports](https://nextjs.org/docs/advanced-features/dynamic-import)
- [Web.dev Code Splitting](https://web.dev/reduce-javascript-payloads-with-code-splitting/)
- [React.lazy and Suspense](https://react.dev/reference/react/lazy)
