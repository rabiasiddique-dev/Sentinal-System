import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Newsletter } from '@/models/Newsletter';
import { newsletterSchema } from '@/lib/validations/newsletter';
import { rateLimit, getClientIdentifier, RateLimitPresets } from '@/lib/rate-limit';
import {
  createSuccessResponse,
  createValidationErrorResponse,
  createDatabaseErrorResponse,
  createInternalErrorResponse,
  createRateLimitErrorResponse,
  addRateLimitHeaders,
  HttpStatus,
} from '@/lib/errors';
import {
  logApiRequest,
  logApiResponse,
  logError,
  logWarn,
  logValidationError,
  logDatabaseOperation,
} from '@/lib/errors/logger';

/**
 * POST /api/newsletter
 * 
 * Handles newsletter subscription from the footer form
 * 
 * Requirements: 30.3, 30.4, 30.5, 30.6, 30.7
 * 
 * @param request - The incoming request
 * @returns JSON response with success or error
 */
export async function POST(request: NextRequest) {
  // Log incoming request
  logApiRequest(request);
  
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimitResult = rateLimit(clientId, RateLimitPresets.newsletter);
    
    // Check if rate limit exceeded
    if (!rateLimitResult.allowed) {
      logWarn('Rate limit exceeded', { 
        clientId, 
        endpoint: '/api/newsletter',
        retryAfter: rateLimitResult.retryAfter 
      });
      
      const response = createRateLimitErrorResponse(rateLimitResult.retryAfter);
      addRateLimitHeaders(
        response,
        rateLimitResult.limit,
        rateLimitResult.remaining,
        rateLimitResult.reset
      );
      
      return response;
    }
    
    // Parse request body
    const body = await request.json();
    
    // Validate request body with Zod schema
    const validationResult = newsletterSchema.safeParse(body);
    
    if (!validationResult.success) {
      logValidationError('/api/newsletter', validationResult.error.format());
      return createValidationErrorResponse(validationResult.error);
    }
    
    const validatedData = validationResult.data;
    
    // Connect to MongoDB
    try {
      await connectDB();
    } catch (dbError) {
      logError('Database connection failed', dbError, { endpoint: '/api/newsletter' });
      return createDatabaseErrorResponse(dbError);
    }
    
    // Save subscription to database
    try {
      const subscription = await Newsletter.create({
        email: validatedData.email,
      });
      
      logDatabaseOperation('create', 'newsletter', true, { 
        subscriptionId: subscription._id.toString() 
      });
      
      const response = createSuccessResponse(
        { subscriptionId: subscription._id.toString() },
        'Successfully subscribed to newsletter',
        HttpStatus.CREATED
      );
      
      addRateLimitHeaders(
        response,
        rateLimitResult.limit,
        rateLimitResult.remaining,
        rateLimitResult.reset
      );
      
      logApiResponse(request, HttpStatus.CREATED, { 
        subscriptionId: subscription._id.toString() 
      });
      
      return response;
      
    } catch (dbError: any) {
      logDatabaseOperation('create', 'newsletter', false, { error: dbError.message });
      return createDatabaseErrorResponse(dbError);
    }
    
  } catch (error: any) {
    // Log error with stack trace
    logError('Unhandled error in POST /api/newsletter', error, {
      endpoint: '/api/newsletter',
      method: 'POST',
    });
    
    return createInternalErrorResponse(error);
  }
}
