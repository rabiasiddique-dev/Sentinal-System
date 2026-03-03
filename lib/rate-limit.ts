/**
 * Rate limiting utility
 * 
 * In-memory rate limiter for development and production
 * Requirements: 18.1, 18.2, 18.3, 18.4, 18.5, 18.6, 18.7
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
// In production, consider using Redis for distributed rate limiting
const rateLimitStore = new Map<string, RateLimitEntry>();

interface RateLimitConfig {
  /**
   * Maximum number of requests allowed in the time window
   */
  maxRequests: number;
  
  /**
   * Time window in milliseconds
   */
  windowMs: number;
  
  /**
   * Optional key prefix for namespacing
   */
  keyPrefix?: string;
}

interface RateLimitResult {
  /**
   * Whether the request is allowed
   */
  allowed: boolean;
  
  /**
   * Maximum requests allowed
   */
  limit: number;
  
  /**
   * Remaining requests in current window
   */
  remaining: number;
  
  /**
   * Timestamp when the rate limit resets (Unix timestamp in seconds)
   */
  reset: number;
  
  /**
   * Seconds until rate limit resets (for Retry-After header)
   */
  retryAfter?: number;
}

/**
 * Rate limiter function
 * 
 * @param identifier - Unique identifier for the client (e.g., IP address, user ID)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const { maxRequests, windowMs, keyPrefix = 'rl' } = config;
  const key = `${keyPrefix}:${identifier}`;
  const now = Date.now();
  
  // Get or create rate limit entry
  let entry = rateLimitStore.get(key);
  
  // If entry doesn't exist or has expired, create new entry
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 0,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(key, entry);
  }
  
  // Increment request count
  entry.count++;
  
  // Calculate remaining requests
  const remaining = Math.max(0, maxRequests - entry.count);
  
  // Calculate reset time in seconds (Unix timestamp)
  const reset = Math.ceil(entry.resetTime / 1000);
  
  // Calculate retry after in seconds
  const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
  
  // Check if rate limit exceeded
  const allowed = entry.count <= maxRequests;
  
  return {
    allowed,
    limit: maxRequests,
    remaining,
    reset,
    retryAfter: allowed ? undefined : retryAfter,
  };
}

/**
 * Cleanup expired entries from the rate limit store
 * Should be called periodically to prevent memory leaks
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Cleanup expired entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}

/**
 * Get client identifier from request
 * Uses IP address or falls back to a default identifier
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare
  
  // Use the first IP from x-forwarded-for if available
  if (forwardedFor) {
    const ips = forwardedFor.split(',');
    return ips[0].trim();
  }
  
  // Use other IP headers
  if (realIp) return realIp;
  if (cfConnectingIp) return cfConnectingIp;
  
  // Fallback to a default identifier
  return 'unknown';
}

/**
 * Predefined rate limit configurations
 */
export const RateLimitPresets = {
  /**
   * For lead submission: 5 requests per 15 minutes
   */
  leads: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    keyPrefix: 'leads',
  },
  
  /**
   * For newsletter subscription: 5 requests per 15 minutes
   */
  newsletter: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    keyPrefix: 'newsletter',
  },
  
  /**
   * For general API requests: 100 requests per 15 minutes
   */
  general: {
    maxRequests: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
    keyPrefix: 'general',
  },
} as const;
