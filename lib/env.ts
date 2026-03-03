/**
 * Environment variable validation and configuration
 * 
 * Validates required environment variables at startup
 * Requirements: 25.2, 25.3, 25.4, 25.5, 25.6, 25.7, 25.8
 */

interface EnvConfig {
  // Database
  MONGODB_URI: string;
  
  // Email (optional for now, will be required when email system is implemented)
  EMAIL_SERVICE?: string;
  RESEND_API_KEY?: string;
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  ADMIN_EMAIL?: string;
  
  // Application
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_SITE_URL: string;
  
  // Rate Limiting
  RATE_LIMIT_ENABLED?: string;
}

/**
 * Validates that all required environment variables are present
 * Throws an error if any required variables are missing
 */
function validateEnv(): EnvConfig {
  const requiredVars = [
    'MONGODB_URI',
    'NODE_ENV',
    'NEXT_PUBLIC_SITE_URL',
  ];
  
  const missing: string[] = [];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map(v => `  - ${v}`).join('\n')}\n\n` +
      `Please check your .env.local file and ensure all required variables are set.\n` +
      `See .env.example for reference.`
    );
  }
  
  // Validate NODE_ENV value
  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv !== 'development' && nodeEnv !== 'production' && nodeEnv !== 'test') {
    throw new Error(
      `Invalid NODE_ENV value: "${nodeEnv}"\n` +
      `Must be one of: development, production, test`
    );
  }
  
  // Validate MONGODB_URI format
  const mongoUri = process.env.MONGODB_URI;
  if (mongoUri && !mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
    throw new Error(
      `Invalid MONGODB_URI format: "${mongoUri}"\n` +
      `Must start with "mongodb://" or "mongodb+srv://"`
    );
  }
  
  // Validate NEXT_PUBLIC_SITE_URL format
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl && !siteUrl.startsWith('http://') && !siteUrl.startsWith('https://')) {
    throw new Error(
      `Invalid NEXT_PUBLIC_SITE_URL format: "${siteUrl}"\n` +
      `Must start with "http://" or "https://"`
    );
  }
  
  return {
    MONGODB_URI: process.env.MONGODB_URI!,
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    NODE_ENV: nodeEnv as 'development' | 'production' | 'test',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL!,
    RATE_LIMIT_ENABLED: process.env.RATE_LIMIT_ENABLED,
  };
}

// Validate environment variables on module load
// This will throw an error at startup if any required variables are missing
let env: EnvConfig;

try {
  env = validateEnv();
} catch (error) {
  console.error('❌ Environment validation failed:');
  console.error((error as Error).message);
  
  // In production, fail fast
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
  
  // In development, throw the error to show in the browser
  throw error;
}

export { env };

/**
 * Helper to check if we're in production
 */
export const isProduction = env.NODE_ENV === 'production';

/**
 * Helper to check if we're in development
 */
export const isDevelopment = env.NODE_ENV === 'development';

/**
 * Helper to check if we're in test mode
 */
export const isTest = env.NODE_ENV === 'test';

/**
 * Helper to get the site URL
 */
export const getSiteUrl = () => env.NEXT_PUBLIC_SITE_URL;

/**
 * Helper to check if rate limiting is enabled
 */
export const isRateLimitEnabled = () => env.RATE_LIMIT_ENABLED !== 'false';
