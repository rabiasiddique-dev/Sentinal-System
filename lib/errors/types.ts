/**
 * Error Types and Interfaces
 * 
 * Defines consistent error response formats for API routes
 * Requirements: 27.1, 27.2
 */

/**
 * Standard error response format
 */
export interface ErrorResponse {
  success: false;
  error: string;
  details?: Record<string, any>;
}

/**
 * Standard success response format
 */
export interface SuccessResponse<T = any> {
  success: true;
  message?: string;
  data?: T;
}

/**
 * API response type (success or error)
 */
export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse;

/**
 * Validation error details from Zod
 */
export interface ValidationErrorDetails {
  [field: string]: {
    _errors: string[];
  };
}

/**
 * HTTP status codes for common error scenarios
 */
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

/**
 * Error types for categorization
 */
export enum ErrorType {
  VALIDATION = 'VALIDATION_ERROR',
  DATABASE = 'DATABASE_ERROR',
  RATE_LIMIT = 'RATE_LIMIT_ERROR',
  NOT_FOUND = 'NOT_FOUND_ERROR',
  DUPLICATE = 'DUPLICATE_ERROR',
  INTERNAL = 'INTERNAL_ERROR',
  NETWORK = 'NETWORK_ERROR',
}
