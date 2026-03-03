/**
 * Error Response Utilities
 * 
 * Helper functions for creating consistent error responses
 * Requirements: 27.1, 27.2, 27.7, 27.8
 */

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { 
  ErrorResponse, 
  SuccessResponse, 
  HttpStatus, 
  ErrorType,
  ValidationErrorDetails 
} from './types';

/**
 * Check if running in production environment
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Create a success response
 */
export function createSuccessResponse<T = any>(
  data?: T,
  message?: string,
  status: number = HttpStatus.OK
): NextResponse<SuccessResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      ...(message && { message }),
      ...(data && { data }),
    },
    { status }
  );
}

/**
 * Create an error response with consistent format
 * Hides sensitive details in production
 */
export function createErrorResponse(
  error: string,
  status: number = HttpStatus.INTERNAL_SERVER_ERROR,
  details?: Record<string, any>
): NextResponse<ErrorResponse> {
  const response: ErrorResponse = {
    success: false,
    error,
  };

  // Only include details in development or for client errors (4xx)
  if (!isProduction() || (status >= 400 && status < 500)) {
    if (details) {
      response.details = details;
    }
  }

  return NextResponse.json(response, { status });
}

/**
 * Create a validation error response from Zod error
 */
export function createValidationErrorResponse(
  zodError: ZodError
): NextResponse<ErrorResponse> {
  const formattedErrors = zodError.format() as ValidationErrorDetails;
  
  return createErrorResponse(
    'Validation failed',
    HttpStatus.BAD_REQUEST,
    formattedErrors
  );
}

/**
 * Create a duplicate resource error response
 */
export function createDuplicateErrorResponse(
  resource: string = 'resource'
): NextResponse<ErrorResponse> {
  return createErrorResponse(
    `A ${resource} with this information already exists`,
    HttpStatus.CONFLICT
  );
}

/**
 * Create a not found error response
 */
export function createNotFoundErrorResponse(
  resource: string = 'resource'
): NextResponse<ErrorResponse> {
  return createErrorResponse(
    `${resource} not found`,
    HttpStatus.NOT_FOUND
  );
}

/**
 * Create a rate limit error response
 */
export function createRateLimitErrorResponse(
  retryAfter?: number
): NextResponse<ErrorResponse> {
  const headers: Record<string, string> = {};
  
  if (retryAfter) {
    headers['Retry-After'] = retryAfter.toString();
  }

  return NextResponse.json(
    {
      success: false,
      error: 'Too many requests. Please try again later.',
    },
    { 
      status: HttpStatus.TOO_MANY_REQUESTS,
      headers,
    }
  );
}

/**
 * Create a database error response
 * Hides sensitive database details in production
 */
export function createDatabaseErrorResponse(
  error: any
): NextResponse<ErrorResponse> {
  // Handle duplicate key error (MongoDB error code 11000)
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || 'field';
    return createDuplicateErrorResponse(field);
  }

  // Generic database error
  const message = isProduction()
    ? 'A database error occurred. Please try again later.'
    : `Database error: ${error.message}`;

  return createErrorResponse(
    message,
    HttpStatus.INTERNAL_SERVER_ERROR,
    isProduction() ? undefined : { type: ErrorType.DATABASE, details: error.message }
  );
}

/**
 * Create a generic internal server error response
 * Protects sensitive information in production
 */
export function createInternalErrorResponse(
  error?: any
): NextResponse<ErrorResponse> {
  const message = isProduction()
    ? 'An error occurred while processing your request. Please try again later.'
    : error?.message || 'Internal server error';

  return createErrorResponse(
    message,
    HttpStatus.INTERNAL_SERVER_ERROR,
    isProduction() ? undefined : { type: ErrorType.INTERNAL, stack: error?.stack }
  );
}

/**
 * Helper to add rate limit headers to any response
 */
export function addRateLimitHeaders(
  response: NextResponse,
  limit: number,
  remaining: number,
  reset: number
): NextResponse {
  response.headers.set('X-RateLimit-Limit', limit.toString());
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  response.headers.set('X-RateLimit-Reset', reset.toString());
  
  return response;
}
