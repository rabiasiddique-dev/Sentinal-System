# Error Handling and Logging System

This directory contains the centralized error handling and logging utilities for the Sentinel Premium Website.

## Overview

The error handling system provides:
- **Consistent error response formats** across all API routes
- **Comprehensive error logging** with timestamps and stack traces
- **Production error protection** that hides sensitive details
- **Database error handling** with specific error type detection
- **Frontend error boundaries** for React component errors
- **Enhanced form error handling** with user-friendly messages

## Requirements

Implements requirements: 27.1, 27.2, 27.3, 27.4, 27.5, 27.6, 27.7, 27.8

## Files

### `types.ts`
Defines TypeScript interfaces and enums for error handling:
- `ErrorResponse` - Standard error response format
- `SuccessResponse` - Standard success response format
- `HttpStatus` - HTTP status code enum
- `ErrorType` - Error categorization enum

### `responses.ts`
Helper functions for creating consistent API responses:
- `createSuccessResponse()` - Create success responses
- `createErrorResponse()` - Create generic error responses
- `createValidationErrorResponse()` - Handle Zod validation errors
- `createDatabaseErrorResponse()` - Handle database errors
- `createRateLimitErrorResponse()` - Handle rate limit errors
- `createInternalErrorResponse()` - Handle internal server errors
- `addRateLimitHeaders()` - Add rate limit headers to responses

### `logger.ts`
Logging utilities with timestamps and context:
- `logInfo()` - Log informational messages
- `logWarn()` - Log warnings
- `logError()` - Log errors with stack traces
- `logApiRequest()` - Log API requests
- `logApiResponse()` - Log API responses
- `logDatabaseOperation()` - Log database operations
- `logDatabaseConnection()` - Log database connection events
- `logRateLimit()` - Log rate limit events
- `logValidationError()` - Log validation errors
- `logEmailNotification()` - Log email notification events

### `index.ts`
Main export file that re-exports all utilities.

## Usage

### In API Routes

```typescript
import {
  createSuccessResponse,
  createValidationErrorResponse,
  createDatabaseErrorResponse,
  createInternalErrorResponse,
  HttpStatus,
  logApiRequest,
  logError,
} from '@/lib/errors';

export async function POST(request: NextRequest) {
  logApiRequest(request);
  
  try {
    // Validate input
    const validationResult = schema.safeParse(body);
    if (!validationResult.success) {
      return createValidationErrorResponse(validationResult.error);
    }
    
    // Database operation
    try {
      const result = await Model.create(data);
      return createSuccessResponse(
        { id: result._id },
        'Created successfully',
        HttpStatus.CREATED
      );
    } catch (dbError) {
      return createDatabaseErrorResponse(dbError);
    }
    
  } catch (error) {
    logError('Unhandled error', error);
    return createInternalErrorResponse(error);
  }
}
```

### In Frontend Components

```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

### Form Error Handling

Forms should handle specific error cases:

```typescript
try {
  const response = await fetch('/api/endpoint', { ... });
  const result = await response.json();
  
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Too many requests. Please wait and try again.');
    } else if (response.status === 409) {
      throw new Error('Resource already exists.');
    } else if (response.status === 400) {
      throw new Error('Invalid input. Please check your data.');
    } else {
      throw new Error(result.error || 'Request failed.');
    }
  }
  
  // Handle success
} catch (error) {
  // Handle network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    setError('Network error. Please check your connection.');
  } else {
    setError(error instanceof Error ? error.message : 'An error occurred.');
  }
}
```

## Error Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": { ... }  // Only in development or for 4xx errors
}
```

## Production vs Development

The system automatically adjusts behavior based on `NODE_ENV`:

**Development:**
- Full error details in responses
- Stack traces in logs
- Component stack in error boundaries

**Production:**
- Generic error messages for 5xx errors
- Sensitive details hidden
- Stack traces only in server logs

## Logging Format

All logs include timestamps in ISO format:

```
[2024-01-15T10:30:45.123Z] [ERROR] Error message | Context: {...}
[2024-01-15T10:30:45.123Z] [ERROR] Stack trace:
...
```

## Database Error Handling

The system automatically detects and handles:
- **Duplicate key errors (11000)** - Returns 409 Conflict
- **Connection errors** - Returns 500 with generic message
- **Query failures** - Returns 500 with appropriate logging

## Rate Limiting

Rate limit responses include:
- `X-RateLimit-Limit` - Maximum requests allowed
- `X-RateLimit-Remaining` - Requests remaining
- `X-RateLimit-Reset` - Timestamp when limit resets
- `Retry-After` - Seconds to wait before retrying

## Best Practices

1. **Always log errors** with context using the logging utilities
2. **Use specific error creators** instead of generic NextResponse.json()
3. **Catch database errors separately** to provide better error messages
4. **Never expose sensitive data** in production error responses
5. **Include request context** in logs for debugging
6. **Handle network errors** in frontend forms
7. **Provide user-friendly messages** for all error scenarios
8. **Use error boundaries** to catch React component errors

## Testing

Error handling should be tested for:
- Correct HTTP status codes
- Consistent response format
- Production error protection
- Proper logging with timestamps
- Database error detection
- Rate limit handling
- Network error handling in forms

## Future Enhancements

Consider adding:
- Integration with error monitoring services (Sentry, LogRocket)
- Structured logging with log levels
- Error aggregation and alerting
- Custom error classes for different error types
- Retry logic for transient errors
- Circuit breaker pattern for external services
