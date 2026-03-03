# Design Document: Sentinel Systems Premium Website

## Overview

The Sentinel Systems Premium Website is a high-performance, security-focused marketing website built with Next.js 14 App Router. This design covers the public-facing pages only, excluding admin dashboard and authentication features which will be designed separately.

### Core Objectives

- Present a premium cybersecurity brand with dark cyber aesthetic
- Generate high-quality enterprise leads through multi-step form
- Provide engaging content through blog system
- Deliver exceptional performance (Lighthouse 95+)
- Implement comprehensive security measures
- Optimize for search engines and social sharing

### Technology Stack

**Frontend:**
- Next.js 14 (App Router) with TypeScript
- Tailwind CSS for styling
- Framer Motion for declarative animations
- GSAP for complex scroll-based animations
- ShadCN UI for component primitives
- React Hook Form + Zod for form validation

**Backend:**
- Next.js API Routes
- MongoDB Atlas with Mongoose ODM
- Zod for runtime validation
- Resend or Nodemailer for email notifications

**Security:**
- Security headers (CSP, HSTS, X-Frame-Options)
- Rate limiting per IP address
- Input sanitization and validation
- HTTP-only cookies for sessions

**Performance:**
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Static generation where possible
- Edge caching for static assets

### Design Principles

1. **Security First**: All inputs validated, rate limiting enforced, security headers applied
2. **Performance Optimized**: Target 95+ Lighthouse score, <1.5s FCP, <2.5s LCP
3. **Responsive Design**: Mobile-first approach, 320px to 2560px support
4. **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation, screen reader support
5. **SEO Optimized**: Meta tags, structured data, sitemap, semantic HTML

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────────┐ │
│  │   Pages    │  │ Components │  │  Animation Engine      │ │
│  │            │  │            │  │  (Framer + GSAP)       │ │
│  └────────────┘  └────────────┘  └────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 14 App Router                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Public Pages (SSG/ISR)                    │ │
│  │  / (landing), /blog, /blog/[slug], /faq               │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   API Routes                           │ │
│  │  /api/leads, /api/newsletter, /api/contact            │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Middleware Layer                          │ │
│  │  Rate Limiting, Security Headers, Validation          │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
┌──────────────────────────┐  ┌──────────────────────┐
│    MongoDB Atlas         │  │   Email Service      │
│  ┌────────────────────┐  │  │   (Resend/          │
│  │ leads              │  │  │    Nodemailer)      │
│  │ blogs              │  │  │                     │
│  │ newsletter_subs    │  │  └──────────────────────┘
│  └────────────────────┘  │
└──────────────────────────┘
```

### Routing Structure

```
/                           # Landing page (SSG)
/blog                       # Blog listing (ISR, revalidate: 3600)
/blog/[slug]                # Individual blog post (ISR)
/faq                        # FAQ page (SSG)
/api/leads                  # Lead submission endpoint
/api/newsletter             # Newsletter subscription endpoint
/sitemap.xml                # Dynamic sitemap
/robots.txt                 # Static robots file
```

### Data Flow

**Lead Submission Flow:**
1. User fills multi-step form on landing page
2. Client-side validation with Zod schema
3. POST to /api/leads with rate limiting check
4. Server-side validation and sanitization
5. Save to MongoDB leads collection
6. Trigger email notification (non-blocking)
7. Return success response to client
8. Display confirmation message

**Blog Rendering Flow:**
1. Request to /blog/[slug]
2. Fetch blog post from MongoDB by slug
3. Check published status
4. Parse Markdown to HTML (server-side)
5. Generate meta tags and structured data
6. Return ISR page with 1-hour revalidation
7. Client renders with syntax highlighting

**Newsletter Subscription Flow:**
1. User enters email in footer form
2. Client-side email validation
3. POST to /api/newsletter with rate limiting
4. Check for duplicate subscription
5. Save to newsletter_subscriptions collection
6. Return success response
7. Display confirmation message

## Components and Interfaces

### Page Components

#### Landing Page (`app/page.tsx`)

The main landing page composed of multiple sections rendered in sequence.

**Structure:**
```tsx
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <ComparisonSection />
      <FeaturesSection />
      <PrivacySection />
      <ShieldMDMSection />
      <AppsSection />
      <UseCasesSection />
      <LeadCaptureSection />
      <FAQSection />
      <NewsletterSection />
      <Footer />
    </>
  );
}
```

**Rendering Strategy:** Static Site Generation (SSG)
**Revalidation:** None (fully static)

#### Blog Listing Page (`app/blog/page.tsx`)

Displays all published blog posts in reverse chronological order.

**Props:** None (fetches data server-side)
**Data Fetching:** ISR with 1-hour revalidation
**Features:**
- Grid layout of blog cards
- Excerpt display (first 150 characters)
- Publication date formatting
- Featured image display
- Read time estimation

#### Blog Post Page (`app/blog/[slug]/page.tsx`)

Individual blog post with full content and SEO optimization.

**Props:** `{ params: { slug: string } }`
**Data Fetching:** ISR with 1-hour revalidation
**Features:**
- Markdown to HTML parsing
- Syntax highlighting for code blocks
- Dynamic meta tags
- Structured data (Article schema)
- Social sharing tags
- Table of contents generation

### Section Components

#### HeroSection

**Purpose:** First impression with animated headline and CTA
**Animations:**
- Background gradient animation (GSAP)
- Parallax scrolling on scroll (Framer Motion)
- Typing animation for headline (custom hook)
- Fade-in for CTA buttons

**Props:**
```tsx
interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaPrimary: { text: string; href: string };
  ctaSecondary: { text: string; href: string };
}
```

**Key Elements:**
- Animated gradient background
- Typing text effect
- Two CTA buttons
- Scroll indicator with animation

#### TrustSection

**Purpose:** Display trust badges and compliance indicators
**Layout:** Horizontal flex layout with 4 badges

**Props:**
```tsx
interface TrustBadge {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TrustSectionProps {
  badges: TrustBadge[];
  tagline: string;
}
```

**Badges:**
1. Government-ready compliance
2. Secure Boot technology
3. Pixel Hardware compatibility
4. Privacy-first innovator

#### ComparisonSection

**Purpose:** Side-by-side comparison table
**Layout:** Responsive table with hover effects

**Props:**
```tsx
interface ComparisonRow {
  feature: string;
  normalAndroid: boolean | string;
  sentinel: boolean | string;
}

interface ComparisonSectionProps {
  title: string;
  rows: ComparisonRow[];
}
```

**Features:**
- Visual indicators (✓/✗) for boolean values
- Hover effects on rows
- Responsive stacking on mobile
- Highlight Sentinel advantages

#### FeaturesSection

**Purpose:** 6-card grid showcasing core security features
**Layout:** 3x2 grid (responsive to 2x3 on tablet, 1x6 on mobile)

**Props:**
```tsx
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  title: string;
  features: Feature[];
}
```

**Animations:**
- Stagger animation on scroll-in
- Hover elevation effect
- Glow effect on hover

**Features:**
1. Bootloader Locked
2. Titan M Chip
3. USB Attack Protection
4. Full Encryption
5. De-Googled
6. App Sandboxing

#### PrivacySection

**Purpose:** Expandable accordions for detailed privacy features
**Layout:** Vertical accordion list

**Props:**
```tsx
interface PrivacyFeature {
  id: string;
  title: string;
  description: string;
  details: string[];
}

interface PrivacySectionProps {
  title: string;
  features: PrivacyFeature[];
}
```

**Behavior:**
- Single accordion open at a time
- Smooth expand/collapse animation
- Icon rotation on expand

**Categories:**
1. Network Privacy
2. Sensor Privacy
3. Exploit Mitigation
4. Scoped Storage
5. Sandboxed Play Services

#### ShieldMDMSection

**Purpose:** Interactive dashboard mockup
**Layout:** Dashboard preview with feature highlights

**Props:**
```tsx
interface MDMFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ShieldMDMSectionProps {
  title: string;
  features: MDMFeature[];
}
```

**Interactions:**
- Click feature to highlight in mockup
- Animated transitions between features
- Auto-rotate through features (optional)

**Features:**
1. Remote Wipe
2. Policy Enforcement
3. App Restrictions
4. Device Lockdown

#### AppsSection

**Purpose:** Showcase 5 custom secure apps
**Layout:** Horizontal scrollable cards

**Props:**
```tsx
interface SecureApp {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

interface AppsSectionProps {
  title: string;
  apps: SecureApp[];
}
```

**Interactions:**
- Hover animation on cards
- Click to open modal with details
- Modal displays full feature list

**Apps:**
1. Sentinel Browser
2. OpenMail
3. ProtonMaps
4. OpenApp Market
5. SignalX

#### UseCasesSection

**Purpose:** Display industry-specific use cases
**Layout:** Grid of use case cards

**Props:**
```tsx
interface UseCase {
  id: string;
  industry: string;
  icon: React.ReactNode;
  benefits: string[];
}

interface UseCasesSectionProps {
  title: string;
  useCases: UseCase[];
}
```

**Industries:**
1. Government
2. Defense
3. Journalists
4. Corporate Executives
5. NGOs

### Form Components

#### LeadCaptureForm

**Purpose:** Multi-step form for lead generation
**Steps:** 3 (Organization Type → Deployment Size → Contact Details)

**Props:**
```tsx
interface LeadCaptureFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
}
```

**State Management:**
```tsx
interface FormState {
  step: 1 | 2 | 3;
  data: {
    organizationType: string;
    deploymentSize: string;
    name: string;
    email: string;
    organization: string;
    message: string;
  };
}
```

**Validation Schema (Zod):**
```tsx
const leadSchema = z.object({
  organizationType: z.enum(['government', 'defense', 'corporate', 'ngo', 'other']),
  deploymentSize: z.enum(['1-50', '51-200', '201-1000', '1000+']),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  organization: z.string().min(2).max(200),
  message: z.string().min(10).max(1000),
});
```

**Features:**
- Progress indicator
- Step validation before proceeding
- Back button to previous step
- Loading state during submission
- Success/error message display
- Form reset after success

#### NewsletterForm

**Purpose:** Simple email capture in footer
**Layout:** Inline form with email input and submit button

**Props:**
```tsx
interface NewsletterFormProps {
  onSuccess?: () => void;
}
```

**Validation Schema:**
```tsx
const newsletterSchema = z.object({
  email: z.string().email(),
});
```

### UI Components (ShadCN)

**Used Components:**
- Button (primary, secondary, ghost variants)
- Input (text, email)
- Textarea
- Card
- Accordion
- Dialog/Modal
- Badge
- Select
- Progress

**Custom Styling:**
- Dark theme with cyber aesthetic
- Neon green accents (#00FF88)
- Red alert color (#FF2E2E)
- Glassmorphism effects
- Glow effects on interactive elements

### Layout Components

#### Header/Navigation

**Purpose:** Site navigation (minimal for landing page focus)
**Layout:** Fixed header with logo and CTA

**Features:**
- Logo with link to home
- Primary CTA button
- Hamburger menu on mobile
- Smooth scroll to sections

#### Footer

**Purpose:** Site links, newsletter, legal
**Layout:** Multi-column footer

**Sections:**
- Company info and logo
- Quick links
- Newsletter subscription
- Social media links
- Legal links (Privacy Policy, Terms)
- Copyright notice

## Data Models

### MongoDB Schemas

#### Lead Schema

```typescript
import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  organization: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 200,
  },
  organizationType: {
    type: String,
    required: true,
    enum: ['government', 'defense', 'corporate', 'ngo', 'other'],
  },
  deploymentSize: {
    type: String,
    required: true,
    enum: ['1-50', '51-200', '201-1000', '1000+'],
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

// Indexes for performance
leadSchema.index({ email: 1 });
leadSchema.index({ createdAt: -1 });

export const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
```

#### Blog Schema

```typescript
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 200,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[a-z0-9-]+$/,
  },
  content: {
    type: String,
    required: true,
    minlength: 100,
  },
  excerpt: {
    type: String,
    maxlength: 300,
  },
  metaTitle: {
    type: String,
    required: true,
    maxlength: 60,
  },
  metaDescription: {
    type: String,
    required: true,
    maxlength: 160,
  },
  featuredImage: {
    type: String,
    default: null,
  },
  published: {
    type: Boolean,
    default: false,
    index: true,
  },
  publishedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for performance
blogSchema.index({ slug: 1 });
blogSchema.index({ published: 1, publishedAt: -1 });

// Update publishedAt when published status changes
blogSchema.pre('save', function(next) {
  if (this.isModified('published') && this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  this.updatedAt = new Date();
  next();
});

export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
```

#### Newsletter Subscription Schema

```typescript
import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

// Indexes for performance
newsletterSchema.index({ email: 1 });
newsletterSchema.index({ subscribedAt: -1 });

export const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);
```

### API Request/Response Interfaces

#### Lead Submission

**Request:**
```typescript
interface LeadSubmissionRequest {
  name: string;
  email: string;
  organization: string;
  organizationType: 'government' | 'defense' | 'corporate' | 'ngo' | 'other';
  deploymentSize: '1-50' | '51-200' | '201-1000' | '1000+';
  message: string;
}
```

**Response (Success):**
```typescript
interface LeadSubmissionResponse {
  success: true;
  message: string;
  leadId: string;
}
```

**Response (Error):**
```typescript
interface ErrorResponse {
  success: false;
  error: string;
  details?: Record<string, string[]>; // Validation errors
}
```

#### Newsletter Subscription

**Request:**
```typescript
interface NewsletterSubscriptionRequest {
  email: string;
}
```

**Response (Success):**
```typescript
interface NewsletterSubscriptionResponse {
  success: true;
  message: string;
}
```

#### Blog Listing

**Response:**
```typescript
interface BlogListingResponse {
  blogs: Array<{
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string | null;
    publishedAt: string;
    readTime: number; // minutes
  }>;
  total: number;
}
```

#### Blog Post

**Response:**
```typescript
interface BlogPostResponse {
  blog: {
    _id: string;
    title: string;
    slug: string;
    content: string; // Markdown
    htmlContent: string; // Parsed HTML
    metaTitle: string;
    metaDescription: string;
    featuredImage: string | null;
    publishedAt: string;
    updatedAt: string;
    readTime: number;
  };
}
```

### Environment Variables

```typescript
interface EnvironmentVariables {
  // Database
  MONGODB_URI: string;
  
  // Email Service
  EMAIL_SERVICE: 'resend' | 'nodemailer';
  RESEND_API_KEY?: string;
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  ADMIN_EMAIL: string;
  
  // Application
  NEXT_PUBLIC_SITE_URL: string;
  NODE_ENV: 'development' | 'production' | 'test';
  
  // Rate Limiting
  RATE_LIMIT_ENABLED: string; // 'true' | 'false'
}
```


### API Endpoints

#### POST /api/leads

**Purpose:** Submit a new lead from the multi-step form

**Rate Limit:** 5 requests per 15 minutes per IP

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "organization": "Acme Corp",
  "organizationType": "corporate",
  "deploymentSize": "201-1000",
  "message": "Interested in enterprise deployment"
}
```

**Validation:**
- All fields required
- Email format validation
- String length constraints
- Enum validation for organizationType and deploymentSize

**Success Response (201):**
```json
{
  "success": true,
  "message": "Lead submitted successfully",
  "leadId": "507f1f77bcf86cd799439011"
}
```

**Error Responses:**
- 400: Validation error
- 409: Duplicate email
- 429: Rate limit exceeded
- 500: Server error

**Side Effects:**
- Save lead to database
- Send email notification (non-blocking)
- Log submission

#### POST /api/newsletter

**Purpose:** Subscribe to newsletter

**Rate Limit:** 5 requests per 15 minutes per IP

**Request Body:**
```json
{
  "email": "subscriber@example.com"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

**Error Responses:**
- 400: Invalid email format
- 409: Already subscribed
- 429: Rate limit exceeded
- 500: Server error

#### GET /api/blogs

**Purpose:** Fetch published blog posts

**Rate Limit:** 100 requests per 15 minutes per IP

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 50)

**Success Response (200):**
```json
{
  "blogs": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Understanding Mobile Security",
      "slug": "understanding-mobile-security",
      "excerpt": "A comprehensive guide to...",
      "featuredImage": "/images/blog/security.jpg",
      "publishedAt": "2024-01-15T10:00:00Z",
      "readTime": 8
    }
  ],
  "total": 25,
  "page": 1,
  "pages": 3
}
```

#### GET /api/blogs/[slug]

**Purpose:** Fetch single blog post by slug

**Rate Limit:** 100 requests per 15 minutes per IP

**Success Response (200):**
```json
{
  "blog": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Understanding Mobile Security",
    "slug": "understanding-mobile-security",
    "content": "# Introduction\n\nMobile security...",
    "htmlContent": "<h1>Introduction</h1><p>Mobile security...</p>",
    "metaTitle": "Understanding Mobile Security | Sentinel Systems",
    "metaDescription": "Learn about mobile security best practices...",
    "featuredImage": "/images/blog/security.jpg",
    "publishedAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z",
    "readTime": 8
  }
}
```

**Error Responses:**
- 404: Blog post not found or not published
- 500: Server error

### Middleware and Utilities

#### Rate Limiting Middleware

**Implementation:** In-memory store for development, Redis for production

**Configuration:**
```typescript
const rateLimitConfig = {
  leads: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
  },
  newsletter: {
    windowMs: 15 * 60 * 1000,
    max: 5,
  },
  general: {
    windowMs: 15 * 60 * 1000,
    max: 100,
  },
};
```

**Response Headers:**
```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 4
X-RateLimit-Reset: 1640000000
Retry-After: 900
```

#### Security Headers Middleware

**Applied to all responses:**
```typescript
const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.resend.com;",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};
```

#### Input Sanitization

**HTML Escaping:**
```typescript
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
```

**MongoDB Query Sanitization:**
```typescript
function sanitizeMongoQuery(obj: any): any {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  const sanitized: any = {};
  for (const key in obj) {
    if (key.startsWith('$')) continue; // Remove MongoDB operators
    sanitized[key] = sanitizeMongoQuery(obj[key]);
  }
  return sanitized;
}
```

#### Markdown Parser

**Library:** `marked` with `DOMPurify` for sanitization

**Configuration:**
```typescript
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false,
});

function parseMarkdown(content: string): string {
  const html = marked.parse(content);
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'strong', 'em', 'img'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
  });
}
```

#### Read Time Calculator

```typescript
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
```

### Frontend Implementation Details

#### Animation Strategy

**Scroll-Based Animations (GSAP):**
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Fade in on scroll
gsap.from('.feature-card', {
  scrollTrigger: {
    trigger: '.features-section',
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
  },
  opacity: 0,
  y: 50,
  stagger: 0.2,
  duration: 0.8,
  ease: 'power2.out',
});
```

**Component Animations (Framer Motion):**
```typescript
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

<motion.div {...fadeInUp}>
  <FeatureCard />
</motion.div>
```

**Reduced Motion Support:**
```typescript
import { useReducedMotion } from 'framer-motion';

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
    >
      Content
    </motion.div>
  );
}
```

#### Styling System

**Tailwind Configuration:**
```typescript
// tailwind.config.ts
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#0B0B0F',
          green: '#00FF88',
          red: '#FF2E2E',
          gray: {
            900: '#1A1A1F',
            800: '#25252D',
            700: '#35353F',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(0, 255, 136, 0.3)',
        'glow-red': '0 0 20px rgba(255, 46, 46, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': "url('/images/cyber-grid.svg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

**Glassmorphism Utility:**
```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

#### Responsive Breakpoints

```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
};
```

**Mobile-First Approach:**
- Base styles for mobile (320px+)
- `md:` prefix for tablet (768px+)
- `lg:` prefix for desktop (1024px+)
- `xl:` prefix for large screens (1280px+)

#### Performance Optimizations

**Image Optimization:**
```tsx
import Image from 'next/image';

<Image
  src="/images/hero-bg.jpg"
  alt="Hero background"
  width={1920}
  height={1080}
  priority // For above-the-fold images
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

**Code Splitting:**
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false, // Client-side only if needed
});
```

**Font Optimization:**
```tsx
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});
```

### SEO Implementation

#### Meta Tags Generation

**Utility Function:**
```typescript
interface MetaTagsConfig {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

function generateMetaTags(config: MetaTagsConfig) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  
  return {
    title: config.title,
    description: config.description,
    canonical: config.canonical || siteUrl,
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.canonical || siteUrl,
      siteName: 'Sentinel Systems',
      images: [
        {
          url: config.ogImage || `${siteUrl}/images/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      locale: 'en_US',
      type: config.ogType || 'website',
    },
    twitter: {
      card: config.twitterCard || 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [config.ogImage || `${siteUrl}/images/og-default.jpg`],
    },
  };
}
```

**Page-Level Implementation:**
```tsx
// app/page.tsx
export const metadata = generateMetaTags({
  title: 'Sentinel Systems | Enterprise Mobile Security',
  description: 'Government-grade mobile security for enterprises. Secure Boot, Titan M chip, and complete privacy protection.',
  ogImage: '/images/og-home.jpg',
});
```

#### Structured Data

**Organization Schema:**
```typescript
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sentinel Systems',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  logo: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
  description: 'Enterprise mobile security solutions',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Sales',
    email: 'sales@sentinelsystems.com',
  },
};
```

**Article Schema (Blog Posts):**
```typescript
function generateArticleSchema(blog: Blog) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.metaDescription,
    image: blog.featuredImage,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'Sentinel Systems',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sentinel Systems',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
      },
    },
  };
}
```

**FAQ Schema:**
```typescript
function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
```

#### Sitemap Generation

**Dynamic Sitemap (`app/sitemap.ts`):**
```typescript
import { MetadataRoute } from 'next';
import { Blog } from '@/models/Blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  
  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];
  
  // Dynamic blog pages
  const blogs = await Blog.find({ published: true }).select('slug updatedAt');
  const blogPages = blogs.map(blog => ({
    url: `${siteUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  return [...staticPages, ...blogPages];
}
```

#### Robots.txt

**Static File (`app/robots.ts`):**
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```

### Email Notification System

#### Email Service Abstraction

```typescript
interface EmailService {
  sendLeadNotification(lead: Lead): Promise<void>;
}

class ResendEmailService implements EmailService {
  private client: Resend;
  
  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }
  
  async sendLeadNotification(lead: Lead): Promise<void> {
    await this.client.emails.send({
      from: 'notifications@sentinelsystems.com',
      to: process.env.ADMIN_EMAIL!,
      subject: `New Lead: ${lead.organization}`,
      html: this.generateLeadEmailHTML(lead),
    });
  }
  
  private generateLeadEmailHTML(lead: Lead): string {
    return `
      <h2>New Lead Submission</h2>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Organization:</strong> ${lead.organization}</p>
      <p><strong>Type:</strong> ${lead.organizationType}</p>
      <p><strong>Deployment Size:</strong> ${lead.deploymentSize}</p>
      <p><strong>Message:</strong></p>
      <p>${lead.message}</p>
      <p><strong>Submitted:</strong> ${lead.createdAt.toISOString()}</p>
    `;
  }
}
```

#### Error Handling for Email

```typescript
async function submitLead(data: LeadSubmissionRequest) {
  // Save lead first (critical)
  const lead = await Lead.create(data);
  
  // Send email notification (non-blocking)
  try {
    await emailService.sendLeadNotification(lead);
  } catch (error) {
    console.error('Failed to send email notification:', error);
    // Log to monitoring service but don't fail the request
  }
  
  return lead;
}
```

### Security Implementation

#### Input Validation with Zod

**Lead Validation:**
```typescript
import { z } from 'zod';

export const leadValidationSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),
  email: z.string()
    .email('Invalid email format')
    .toLowerCase()
    .trim(),
  organization: z.string()
    .min(2, 'Organization must be at least 2 characters')
    .max(200, 'Organization must not exceed 200 characters')
    .trim(),
  organizationType: z.enum(['government', 'defense', 'corporate', 'ngo', 'other']),
  deploymentSize: z.enum(['1-50', '51-200', '201-1000', '1000+']),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters')
    .trim(),
});
```

**API Route Validation:**
```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = leadValidationSchema.parse(body);
    
    // Process validated data
    const lead = await submitLead(validatedData);
    
    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      leadId: lead._id,
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: error.flatten().fieldErrors,
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
    }, { status: 500 });
  }
}
```

#### CSRF Protection

**Implementation:** Double-submit cookie pattern for forms

```typescript
// Generate CSRF token
function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Verify CSRF token
function verifyCSRFToken(token: string, cookieToken: string): boolean {
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(cookieToken)
  );
}
```

#### MongoDB Connection Security

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable');
}

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4
};

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, options);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
```

### Accessibility Implementation

#### Keyboard Navigation

**Focus Management:**
```tsx
import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      // Trap focus within modal
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements?.[0] as HTMLElement;
      const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;
      
      firstElement?.focus();
      
      const handleTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };
      
      document.addEventListener('keydown', handleTab);
      return () => document.removeEventListener('keydown', handleTab);
    }
  }, [isOpen]);
  
  return isOpen ? (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {children}
    </div>
  ) : null;
}
```

#### ARIA Labels

```tsx
<button
  aria-label="Open navigation menu"
  aria-expanded={isMenuOpen}
  aria-controls="mobile-menu"
>
  <MenuIcon />
</button>

<nav id="mobile-menu" aria-label="Main navigation">
  {/* Navigation items */}
</nav>
```

#### Skip Links

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyber-green focus:text-cyber-black"
>
  Skip to main content
</a>

<main id="main-content">
  {/* Page content */}
</main>
```

#### Color Contrast

**Ensuring WCAG AA Compliance:**
- Neon green (#00FF88) on black (#0B0B0F): 12.5:1 ratio ✓
- White text on dark gray (#25252D): 14.2:1 ratio ✓
- Red alert (#FF2E2E) on black: 5.8:1 ratio ✓

**Testing Tools:**
- Chrome DevTools Lighthouse
- axe DevTools browser extension
- WAVE accessibility evaluation tool


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Accordion Single-Open Behavior

*For any* privacy accordion section, when one accordion item is expanded, all other accordion items should be collapsed, ensuring only one item is open at a time.

**Validates: Requirements 5.8**

### Property 2: Interactive Feature Highlighting

*For any* ShieldMDM feature in the interactive mockup, when a user clicks on that feature, the mockup should highlight the selected feature and unhighlight any previously selected feature.

**Validates: Requirements 6.6**

### Property 3: Modal Opening on App Card Click

*For any* secure app card, when a user clicks on the card, a modal should open displaying detailed information about that specific app.

**Validates: Requirements 7.8**

### Property 4: Lead Form Validation

*For any* lead submission with invalid data (missing required fields, invalid email format, string lengths outside constraints, or invalid enum values), the validation should fail and prevent submission.

**Validates: Requirements 9.5, 19.1, 19.2, 19.4, 19.5, 19.6**

### Property 5: Lead Data Persistence

*For any* valid lead submission, all lead fields (name, email, organization, organizationType, deploymentSize, message, createdAt) should be persisted to the database with correct values.

**Validates: Requirements 9.6, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6**

### Property 6: Lead Email Notification

*For any* successfully saved lead, an email notification should be sent to the admin email address containing all lead details (name, email, organization, organizationType, deploymentSize, message, timestamp).

**Validates: Requirements 9.7, 24.1, 24.2, 24.3, 24.4, 24.5, 24.6, 24.7, 24.8**

### Property 7: Lead Submission Success Message

*For any* successfully submitted lead, the website should display a success confirmation message to the user.

**Validates: Requirements 9.8**

### Property 8: Unique Email Constraint for Leads

*For any* lead submission with an email address that already exists in the database, the submission should be rejected with an appropriate error indicating a duplicate email.

**Validates: Requirements 10.7**

### Property 9: Markdown to HTML Parsing

*For any* valid Markdown content in a blog post, parsing the Markdown should produce valid HTML output that preserves the content structure and formatting.

**Validates: Requirements 12.1**

### Property 10: Blog Post Meta Tag Generation

*For any* blog post page, the system should generate all required meta tags (title, description, OpenGraph tags, Twitter Card tags) with values derived from the blog post data.

**Validates: Requirements 12.6, 12.7, 12.8, 20.1, 20.2, 20.3, 20.4, 20.5**

### Property 11: FAQ Item Expansion

*For any* FAQ item, when a user clicks on it, the item should expand to show the answer content.

**Validates: Requirements 13.5**

### Property 12: Security Headers Presence

*For any* HTTP response from the website, all required security headers (Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Strict-Transport-Security) should be present with correct values.

**Validates: Requirements 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.7**

### Property 13: Rate Limiting Enforcement

*For any* IP address making requests to a rate-limited endpoint, when the request count exceeds the configured limit within the time window, subsequent requests should return a 429 status code with a Retry-After header.

**Validates: Requirements 18.2, 18.3, 18.4, 18.5, 18.6**

### Property 14: Rate Limit Window Reset

*For any* IP address that has been rate-limited, after the time window expires, the request count should reset and new requests should be allowed.

**Validates: Requirements 18.7**

### Property 15: Input Sanitization

*For any* string input containing HTML special characters (&, <, >, ", '), the system should escape these characters before database operations or rendering to prevent injection attacks.

**Validates: Requirements 19.3, 19.7**

### Property 16: MongoDB ObjectId Validation

*For any* API request requiring a MongoDB ObjectId parameter, when an invalid ObjectId format is provided, the request should be rejected with a validation error.

**Validates: Requirements 19.8**

### Property 17: Structured Data Generation

*For any* page requiring structured data (Organization, WebSite, FAQPage, Article), the system should generate valid Schema.org JSON-LD structured data embedded in the page HTML.

**Validates: Requirements 20.6, 20.7, 20.8, 20.9**

### Property 18: Image Format Optimization

*For any* image served by the website, it should be in a modern format (WebP, AVIF) with appropriate compression to optimize performance.

**Validates: Requirements 21.3**

### Property 19: Static Asset Caching Headers

*For any* static asset (images, CSS, JavaScript), the response should include appropriate browser caching headers (Cache-Control, ETag) to enable client-side caching.

**Validates: Requirements 21.9**

### Property 20: Responsive Rendering

*For any* viewport width between 320px and 2560px, the website should render without horizontal scrolling and with all content accessible and readable.

**Validates: Requirements 22.1**

### Property 21: Touch Target Minimum Size

*For any* interactive element (buttons, links, form inputs) on mobile devices, the touch target should be at least 44x44 pixels to ensure usability.

**Validates: Requirements 22.5**

### Property 22: Reduced Motion Respect

*For any* user with the prefers-reduced-motion preference enabled, the website should disable or significantly reduce decorative animations while maintaining functional animations.

**Validates: Requirements 23.4, 23.5**

### Property 23: Email Failure Non-Blocking

*For any* lead submission where the email notification fails to send, the lead should still be successfully saved to the database and the user should receive a success response.

**Validates: Requirements 24.9**

### Property 24: Environment Variable Validation

*For any* required environment variable (MONGODB_URI, EMAIL_API_KEY, ADMIN_EMAIL), when it is missing at startup, the application should fail to start with a clear error message indicating which variable is missing.

**Validates: Requirements 25.6, 25.7**

### Property 25: Client-Side Environment Variable Protection

*For any* environment variable containing sensitive data, it should never be exposed in client-side JavaScript bundles or browser-accessible code.

**Validates: Requirements 25.8**

### Property 26: Database Schema Enforcement

*For any* attempt to save data to the database that violates the schema constraints (missing required fields, invalid types, constraint violations), the operation should be rejected with a validation error.

**Validates: Requirements 26.1, 26.2, 26.3, 26.4, 26.5, 26.6, 26.7, 26.8, 26.9, 26.10, 26.11, 26.12, 26.13, 26.14, 26.15**

### Property 27: API Error Status Codes

*For any* API error, the response should include an appropriate HTTP status code that correctly categorizes the error (4xx for client errors, 5xx for server errors).

**Validates: Requirements 27.1, 27.8**

### Property 28: API Error Response Format

*For any* API error, the response should be in a consistent JSON format containing at minimum a success flag (false) and an error message.

**Validates: Requirements 27.2**

### Property 29: Error Logging

*For any* error that occurs in the application, the error should be logged with a timestamp and stack trace for debugging purposes.

**Validates: Requirements 27.3, 27.4**

### Property 30: Database Query Error Handling

*For any* database query that fails, the API should return a 500 status code with an appropriate error message.

**Validates: Requirements 27.6**

### Property 31: Production Error Detail Protection

*For any* error in production environment, sensitive error details (stack traces, internal paths, database details) should not be exposed to the client.

**Validates: Requirements 27.7**

### Property 32: Image Alt Text Presence

*For any* image element rendered on the website, it should include an alt attribute with descriptive text for accessibility.

**Validates: Requirements 29.1**

### Property 33: Color Contrast Compliance

*For any* text element on the website, the color contrast ratio between text and background should meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

**Validates: Requirements 29.2, 29.3**

### Property 34: Keyboard Navigation Support

*For any* interactive element (buttons, links, form inputs, modals), it should be fully operable using only keyboard navigation (Tab, Enter, Escape, Arrow keys).

**Validates: Requirements 29.4**

### Property 35: Focus Indicator Visibility

*For any* focusable element, when it receives keyboard focus, a visible focus indicator should be displayed to show the current focus position.

**Validates: Requirements 29.5**

### Property 36: Semantic HTML Usage

*For any* page section or component, appropriate semantic HTML elements (header, nav, main, article, section, footer, etc.) should be used instead of generic div elements where applicable.

**Validates: Requirements 29.6**

### Property 37: Icon Button ARIA Labels

*For any* button that contains only an icon without visible text, it should include an aria-label attribute describing the button's action.

**Validates: Requirements 29.7**

### Property 38: Form Input Label Association

*For any* form input element, it should have an associated label element (via htmlFor/id or wrapping) to ensure screen reader accessibility.

**Validates: Requirements 29.8**

### Property 39: Newsletter Email Validation

*For any* newsletter subscription submission, the email address should be validated for correct format before processing.

**Validates: Requirements 30.3**

### Property 40: Newsletter Subscription Persistence

*For any* valid newsletter subscription, the email address should be saved to the database with a timestamp.

**Validates: Requirements 30.4**

### Property 41: Newsletter Success Message

*For any* successfully saved newsletter subscription, the website should display a success message to the user.

**Validates: Requirements 30.5**

### Property 42: Newsletter Duplicate Prevention

*For any* newsletter subscription attempt with an email address that already exists in the database, the submission should be rejected with an appropriate message indicating the email is already subscribed.

**Validates: Requirements 30.6, 30.7**

## Error Handling

### Error Categories

**Client Errors (4xx):**
- 400 Bad Request: Invalid input, validation failures
- 401 Unauthorized: Missing or invalid authentication (admin routes only)
- 404 Not Found: Resource not found (blog post, page)
- 409 Conflict: Duplicate resource (email already exists)
- 429 Too Many Requests: Rate limit exceeded

**Server Errors (5xx):**
- 500 Internal Server Error: Database failures, unexpected errors
- 503 Service Unavailable: External service failures (email service)

### Error Response Format

All API errors follow a consistent JSON format:

```typescript
interface ErrorResponse {
  success: false;
  error: string; // Human-readable error message
  code?: string; // Machine-readable error code
  details?: Record<string, string[]>; // Validation error details
}
```

**Examples:**

```json
// Validation Error
{
  "success": false,
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": {
    "email": ["Invalid email format"],
    "name": ["Name must be at least 2 characters"]
  }
}

// Rate Limit Error
{
  "success": false,
  "error": "Too many requests. Please try again later.",
  "code": "RATE_LIMIT_EXCEEDED"
}

// Database Error (Production)
{
  "success": false,
  "error": "An error occurred while processing your request",
  "code": "INTERNAL_ERROR"
}
```

### Error Handling Strategy

**Database Errors:**
- Catch all database operation errors
- Log full error details server-side
- Return generic 500 error to client in production
- Return detailed error in development for debugging

**Validation Errors:**
- Use Zod for schema validation
- Return 400 with field-specific error messages
- Include all validation errors in response

**Rate Limiting:**
- Track requests in memory (development) or Redis (production)
- Return 429 with Retry-After header
- Include clear message about rate limit

**Email Service Errors:**
- Catch email sending failures
- Log error but don't block lead submission
- Consider implementing retry queue for failed emails

**External Service Failures:**
- Implement timeout for external API calls
- Provide fallback behavior where possible
- Return 503 if service is critical and unavailable

### Error Logging

**Development:**
```typescript
console.error('[ERROR]', {
  timestamp: new Date().toISOString(),
  error: error.message,
  stack: error.stack,
  context: { userId, requestId, endpoint },
});
```

**Production:**
- Use structured logging (JSON format)
- Integrate with monitoring service (e.g., Sentry, LogRocket)
- Include request context (IP, user agent, endpoint)
- Exclude sensitive data from logs

### Frontend Error Handling

**Form Submission Errors:**
```tsx
try {
  const response = await fetch('/api/leads', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    if (response.status === 400 && data.details) {
      // Show field-specific errors
      setFieldErrors(data.details);
    } else {
      // Show general error message
      setGeneralError(data.error);
    }
    return;
  }
  
  // Success handling
  showSuccessMessage();
} catch (error) {
  // Network error
  setGeneralError('Unable to connect. Please check your internet connection.');
}
```

**Global Error Boundary:**
```tsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to monitoring service
    logErrorToService(error, errorInfo);
    
    // Show user-friendly error page
    this.setState({ hasError: true });
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit testing and property-based testing to ensure comprehensive coverage:

**Unit Tests:**
- Specific examples demonstrating correct behavior
- Edge cases and boundary conditions
- Integration points between components
- Error conditions and failure scenarios
- Component rendering and user interactions

**Property-Based Tests:**
- Universal properties that hold for all inputs
- Comprehensive input coverage through randomization
- Validation of business rules across input space
- Invariant checking across operations

Both approaches are complementary and necessary. Unit tests catch concrete bugs and verify specific scenarios, while property-based tests verify general correctness across a wide range of inputs.

### Property-Based Testing Configuration

**Library Selection:**
- **JavaScript/TypeScript**: `fast-check` (recommended for Next.js projects)
- Mature, well-maintained, excellent TypeScript support
- Rich set of built-in generators
- Good integration with Jest/Vitest

**Test Configuration:**
```typescript
import fc from 'fast-check';

// Minimum 100 iterations per property test
fc.assert(
  fc.property(
    fc.string(), // Arbitrary generator
    (input) => {
      // Property assertion
    }
  ),
  { numRuns: 100 } // Minimum iterations
);
```

**Test Tagging:**
Each property-based test must reference its design document property:

```typescript
describe('Lead Submission', () => {
  it('Feature: sentinel-premium-website, Property 4: Lead Form Validation - should reject invalid lead data', () => {
    fc.assert(
      fc.property(
        invalidLeadArbitrary(),
        (invalidLead) => {
          const result = validateLead(invalidLead);
          expect(result.success).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Test Organization

```
tests/
├── unit/
│   ├── components/
│   │   ├── HeroSection.test.tsx
│   │   ├── LeadCaptureForm.test.tsx
│   │   ├── NewsletterForm.test.tsx
│   │   └── ...
│   ├── api/
│   │   ├── leads.test.ts
│   │   ├── newsletter.test.ts
│   │   └── blogs.test.ts
│   ├── lib/
│   │   ├── validation.test.ts
│   │   ├── markdown.test.ts
│   │   └── sanitization.test.ts
│   └── models/
│       ├── Lead.test.ts
│       ├── Blog.test.ts
│       └── Newsletter.test.ts
├── property/
│   ├── lead-submission.property.test.ts
│   ├── validation.property.test.ts
│   ├── rate-limiting.property.test.ts
│   ├── accessibility.property.test.ts
│   └── ...
├── integration/
│   ├── lead-flow.test.ts
│   ├── blog-rendering.test.ts
│   └── newsletter-flow.test.ts
└── e2e/
    ├── landing-page.spec.ts
    ├── lead-submission.spec.ts
    └── blog-reading.spec.ts
```

### Unit Test Examples

**Component Testing:**
```typescript
describe('LeadCaptureForm', () => {
  it('should display three steps', () => {
    render(<LeadCaptureForm />);
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
  });
  
  it('should validate email format', async () => {
    render(<LeadCaptureForm />);
    const emailInput = screen.getByLabelText('Email');
    
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.click(screen.getByText('Submit'));
    
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });
  
  it('should show success message after submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });
    
    render(<LeadCaptureForm />);
    // Fill form...
    await userEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(screen.getByText(/success/i)).toBeInTheDocument();
    });
  });
});
```

**API Route Testing:**
```typescript
describe('POST /api/leads', () => {
  it('should create a lead with valid data', async () => {
    const validLead = {
      name: 'John Doe',
      email: 'john@example.com',
      organization: 'Acme Corp',
      organizationType: 'corporate',
      deploymentSize: '201-1000',
      message: 'Interested in enterprise deployment',
    };
    
    const response = await POST(new Request('http://localhost/api/leads', {
      method: 'POST',
      body: JSON.stringify(validLead),
    }));
    
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.leadId).toBeDefined();
  });
  
  it('should reject duplicate email', async () => {
    // Create first lead
    await Lead.create({ ...validLead, email: 'duplicate@example.com' });
    
    // Attempt duplicate
    const response = await POST(new Request('http://localhost/api/leads', {
      method: 'POST',
      body: JSON.stringify({ ...validLead, email: 'duplicate@example.com' }),
    }));
    
    expect(response.status).toBe(409);
  });
  
  it('should enforce rate limiting', async () => {
    const requests = Array(6).fill(null).map(() =>
      POST(new Request('http://localhost/api/leads', {
        method: 'POST',
        body: JSON.stringify(validLead),
        headers: { 'x-forwarded-for': '192.168.1.1' },
      }))
    );
    
    const responses = await Promise.all(requests);
    const lastResponse = responses[responses.length - 1];
    
    expect(lastResponse.status).toBe(429);
  });
});
```

### Property-Based Test Examples

**Validation Properties:**
```typescript
import fc from 'fast-check';

// Arbitrary generators
const invalidEmailArbitrary = () => fc.string().filter(s => !s.includes('@'));
const invalidLeadArbitrary = () => fc.record({
  name: fc.oneof(fc.constant(''), fc.string({ maxLength: 1 })),
  email: invalidEmailArbitrary(),
  organization: fc.string(),
  organizationType: fc.string().filter(s => !['government', 'defense', 'corporate', 'ngo', 'other'].includes(s)),
  deploymentSize: fc.string(),
  message: fc.string({ maxLength: 5 }),
});

describe('Property: Lead Form Validation', () => {
  it('Feature: sentinel-premium-website, Property 4: should reject any invalid lead data', () => {
    fc.assert(
      fc.property(
        invalidLeadArbitrary(),
        (invalidLead) => {
          const result = leadValidationSchema.safeParse(invalidLead);
          expect(result.success).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Property: Input Sanitization', () => {
  it('Feature: sentinel-premium-website, Property 15: should escape HTML special characters in any string', () => {
    fc.assert(
      fc.property(
        fc.string(),
        (input) => {
          const sanitized = escapeHtml(input);
          expect(sanitized).not.toContain('<script>');
          expect(sanitized).not.toContain('&<>"\''.split('').some(char => 
            sanitized.includes(char) && input.includes(char)
          ));
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Property: Rate Limiting', () => {
  it('Feature: sentinel-premium-website, Property 13: should enforce rate limits for any IP exceeding threshold', () => {
    fc.assert(
      fc.property(
        fc.ipV4(),
        fc.integer({ min: 6, max: 20 }),
        async (ip, requestCount) => {
          const responses = await Promise.all(
            Array(requestCount).fill(null).map(() =>
              makeRequest('/api/leads', { ip })
            )
          );
          
          const rateLimitedResponses = responses.filter(r => r.status === 429);
          expect(rateLimitedResponses.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 50 } // Fewer runs for async tests
    );
  });
});
```

**Accessibility Properties:**
```typescript
describe('Property: Image Alt Text', () => {
  it('Feature: sentinel-premium-website, Property 32: should have alt text for any image', () => {
    fc.assert(
      fc.property(
        fc.record({
          src: fc.webUrl(),
          alt: fc.string(),
        }),
        (imageProps) => {
          render(<Image {...imageProps} width={100} height={100} />);
          const img = screen.getByRole('img');
          expect(img).toHaveAttribute('alt');
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Property: Keyboard Navigation', () => {
  it('Feature: sentinel-premium-website, Property 34: should support keyboard navigation for any interactive element', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant('button'),
          fc.constant('link'),
          fc.constant('input')
        ),
        fc.string(),
        (elementType, label) => {
          const { container } = render(
            elementType === 'button' ? <button>{label}</button> :
            elementType === 'link' ? <a href="#">{label}</a> :
            <input aria-label={label} />
          );
          
          const element = container.firstChild as HTMLElement;
          element.focus();
          expect(document.activeElement).toBe(element);
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Integration Testing

**Lead Submission Flow:**
```typescript
describe('Lead Submission Integration', () => {
  it('should complete full lead submission flow', async () => {
    const leadData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      organization: 'Tech Corp',
      organizationType: 'corporate',
      deploymentSize: '51-200',
      message: 'Looking for secure mobile solution',
    };
    
    // Submit lead
    const response = await fetch('/api/leads', {
      method: 'POST',
      body: JSON.stringify(leadData),
    });
    
    expect(response.status).toBe(201);
    
    // Verify database storage
    const savedLead = await Lead.findOne({ email: leadData.email });
    expect(savedLead).toBeDefined();
    expect(savedLead.name).toBe(leadData.name);
    
    // Verify email was sent (mock)
    expect(mockEmailService.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: process.env.ADMIN_EMAIL,
        subject: expect.stringContaining('Tech Corp'),
      })
    );
  });
});
```

### End-to-End Testing

**Framework**: Playwright

```typescript
import { test, expect } from '@playwright/test';

test('complete lead submission journey', async ({ page }) => {
  await page.goto('/');
  
  // Navigate to lead form
  await page.click('text=Get Started');
  
  // Step 1: Organization Type
  await page.click('text=Corporate');
  await page.click('text=Next');
  
  // Step 2: Deployment Size
  await page.click('text=201-1000');
  await page.click('text=Next');
  
  // Step 3: Contact Details
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="organization"]', 'Test Corp');
  await page.fill('textarea[name="message"]', 'This is a test message for deployment inquiry');
  
  // Submit
  await page.click('text=Submit');
  
  // Verify success message
  await expect(page.locator('text=/success/i')).toBeVisible();
});

test('blog post reading experience', async ({ page }) => {
  await page.goto('/blog');
  
  // Click first blog post
  await page.click('.blog-card:first-child');
  
  // Verify blog content loaded
  await expect(page.locator('article')).toBeVisible();
  await expect(page.locator('h1')).toBeVisible();
  
  // Verify meta tags
  const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
  expect(metaDescription).toBeTruthy();
});
```

### Performance Testing

**Lighthouse CI Configuration:**
```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/blog"
      ]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.95 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1500 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }]
      }
    }
  }
}
```

### Test Coverage Goals

- **Unit Tests**: 80%+ code coverage
- **Property Tests**: All correctness properties implemented
- **Integration Tests**: All critical user flows covered
- **E2E Tests**: All primary user journeys covered
- **Accessibility Tests**: All WCAG AA criteria verified

### Continuous Integration

**GitHub Actions Workflow:**
```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run property tests
        run: npm run test:property
      
      - name: Run integration tests
        run: npm run test:integration
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Run Lighthouse CI
        run: npm run lighthouse:ci
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

