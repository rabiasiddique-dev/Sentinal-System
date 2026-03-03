// Common types for the Sentinel Systems website

export interface Lead {
  _id?: string;
  name: string;
  email: string;
  organization: string;
  organizationType: 'government' | 'defense' | 'corporate' | 'ngo' | 'other';
  deploymentSize: '1-50' | '51-200' | '201-1000' | '1000+';
  message: string;
  createdAt?: Date;
}

export interface Blog {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage?: string | null;
  published: boolean;
  publishedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Newsletter {
  _id?: string;
  email: string;
  subscribedAt?: Date;
  active?: boolean;
}

export interface LeadSubmissionRequest {
  name: string;
  email: string;
  organization: string;
  organizationType: 'government' | 'defense' | 'corporate' | 'ngo' | 'other';
  deploymentSize: '1-50' | '51-200' | '201-1000' | '1000+';
  message: string;
}

export interface LeadSubmissionResponse {
  success: true;
  message: string;
  leadId: string;
}

export interface NewsletterSubscriptionRequest {
  email: string;
}

export interface NewsletterSubscriptionResponse {
  success: true;
  message: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: Record<string, string[]>;
}

export interface BlogListingResponse {
  blogs: Array<{
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string | null;
    publishedAt: string;
    readTime: number;
  }>;
  total: number;
  page?: number;
  pages?: number;
}

export interface BlogPostResponse {
  blog: {
    _id: string;
    title: string;
    slug: string;
    content: string;
    htmlContent: string;
    metaTitle: string;
    metaDescription: string;
    featuredImage: string | null;
    publishedAt: string;
    updatedAt: string;
    readTime: number;
  };
}

export interface EnvironmentVariables {
  MONGODB_URI: string;
  JWT_SECRET: string;
  EMAIL_SERVICE: 'resend' | 'nodemailer';
  RESEND_API_KEY?: string;
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  ADMIN_EMAIL: string;
  NEXT_PUBLIC_SITE_URL: string;
  NODE_ENV: 'development' | 'production' | 'test';
  RATE_LIMIT_ENABLED: string;
}
