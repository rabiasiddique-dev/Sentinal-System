/**
 * Error Logging Utilities
 * 
 * Provides consistent error logging with timestamps, stack traces, and request context
 * Requirements: 27.3, 27.4, 27.5
 */

import { NextRequest } from 'next/server';

/**
 * Log levels for different types of messages
 */
export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

/**
 * Request context for logging
 */
export interface RequestContext {
  method: string;
  url: string;
  endpoint: string;
  clientId?: string;
  userAgent?: string;
}

/**
 * Get current timestamp in ISO format
 */
function getTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Extract request context from NextRequest
 */
export function extractRequestContext(request: NextRequest): RequestContext {
  const url = new URL(request.url);
  
  return {
    method: request.method,
    url: request.url,
    endpoint: url.pathname,
    clientId: request.headers.get('x-forwarded-for') || 
              request.headers.get('x-real-ip') || 
              'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
  };
}

/**
 * Format log message with timestamp and level
 */
function formatLogMessage(
  level: LogLevel,
  message: string,
  context?: Record<string, any>
): string {
  const timestamp = getTimestamp();
  const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
  return `[${timestamp}] [${level}] ${message}${contextStr}`;
}

/**
 * Log an info message
 */
export function logInfo(message: string, context?: Record<string, any>): void {
  console.log(formatLogMessage(LogLevel.INFO, message, context));
}

/**
 * Log a warning message
 */
export function logWarn(message: string, context?: Record<string, any>): void {
  console.warn(formatLogMessage(LogLevel.WARN, message, context));
}

/**
 * Log an error with stack trace
 */
export function logError(
  message: string,
  error?: any,
  context?: Record<string, any>
): void {
  const timestamp = getTimestamp();
  
  // Log the main error message
  console.error(formatLogMessage(LogLevel.ERROR, message, context));
  
  // Log error details if available
  if (error) {
    if (error instanceof Error) {
      console.error(`[${timestamp}] [ERROR] Error name: ${error.name}`);
      console.error(`[${timestamp}] [ERROR] Error message: ${error.message}`);
      
      // Log stack trace
      if (error.stack) {
        console.error(`[${timestamp}] [ERROR] Stack trace:`);
        console.error(error.stack);
      }
    } else {
      // Log non-Error objects
      console.error(`[${timestamp}] [ERROR] Error details:`, error);
    }
  }
}

/**
 * Log API request
 */
export function logApiRequest(
  request: NextRequest,
  additionalContext?: Record<string, any>
): void {
  const context = extractRequestContext(request);
  logInfo('API request received', { ...context, ...additionalContext });
}

/**
 * Log API response
 */
export function logApiResponse(
  request: NextRequest,
  status: number,
  additionalContext?: Record<string, any>
): void {
  const context = extractRequestContext(request);
  const level = status >= 400 ? LogLevel.WARN : LogLevel.INFO;
  
  const message = `API response sent: ${status}`;
  
  if (level === LogLevel.WARN) {
    logWarn(message, { ...context, status, ...additionalContext });
  } else {
    logInfo(message, { ...context, status, ...additionalContext });
  }
}

/**
 * Log database operation
 */
export function logDatabaseOperation(
  operation: string,
  collection: string,
  success: boolean,
  details?: Record<string, any>
): void {
  const message = `Database ${operation} on ${collection}: ${success ? 'SUCCESS' : 'FAILED'}`;
  
  if (success) {
    logInfo(message, details);
  } else {
    logError(message, undefined, details);
  }
}

/**
 * Log database connection event
 */
export function logDatabaseConnection(
  event: 'connected' | 'disconnected' | 'error',
  error?: any
): void {
  const timestamp = getTimestamp();
  
  switch (event) {
    case 'connected':
      console.log(`[${timestamp}] [INFO] Database connected successfully`);
      break;
    case 'disconnected':
      console.warn(`[${timestamp}] [WARN] Database disconnected`);
      break;
    case 'error':
      logError('Database connection error', error);
      break;
  }
}

/**
 * Log rate limit event
 */
export function logRateLimit(
  clientId: string,
  endpoint: string,
  exceeded: boolean
): void {
  if (exceeded) {
    logWarn('Rate limit exceeded', { clientId, endpoint });
  } else {
    logInfo('Rate limit check passed', { clientId, endpoint });
  }
}

/**
 * Log validation error
 */
export function logValidationError(
  endpoint: string,
  errors: any,
  context?: Record<string, any>
): void {
  logWarn('Validation failed', {
    endpoint,
    errors: JSON.stringify(errors),
    ...context,
  });
}

/**
 * Log email notification event
 */
export function logEmailNotification(
  type: string,
  success: boolean,
  recipient?: string,
  error?: any
): void {
  if (success) {
    logInfo(`Email notification sent: ${type}`, { recipient });
  } else {
    logError(`Email notification failed: ${type}`, error, { recipient });
  }
}
