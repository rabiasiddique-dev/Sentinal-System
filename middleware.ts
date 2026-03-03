import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Security headers middleware
 * 
 * Adds security headers to all responses
 * Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.7
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Content-Security-Policy (CSP)
  // Requirement 17.1
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js requires unsafe-eval and unsafe-inline
    "style-src 'self' 'unsafe-inline'", // Tailwind requires unsafe-inline
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', cspDirectives);

  // X-Frame-Options: Prevent clickjacking
  // Requirement 17.2
  response.headers.set('X-Frame-Options', 'DENY');

  // X-Content-Type-Options: Prevent MIME type sniffing
  // Requirement 17.3
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Referrer-Policy: Control referrer information
  // Requirement 17.4
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions-Policy: Restrict browser features
  // Requirement 17.5
  const permissionsPolicy = [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'interest-cohort=()', // Disable FLoC
  ].join(', ');
  
  response.headers.set('Permissions-Policy', permissionsPolicy);

  // Strict-Transport-Security (HSTS): Force HTTPS
  // Requirement 17.6
  // Only set in production with HTTPS
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  // X-DNS-Prefetch-Control: Control DNS prefetching
  // Requirement 17.7
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  return response;
}

// Apply middleware to all routes except static files and API routes that need different handling
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
