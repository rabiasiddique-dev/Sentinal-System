import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Lead } from '@/models/Lead';
import { leadSchema } from '@/lib/validations/lead';
import { sanitizeString } from '@/lib/utils/sanitize';
import { rateLimit, getClientIdentifier, RateLimitPresets } from '@/lib/rate-limit';
import { getEmailService } from '@/lib/email';
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
  logInfo,
  logWarn,
  logValidationError,
  logDatabaseOperation,
  logEmailNotification,
  extractRequestContext,
} from '@/lib/errors/logger';

/**
 * POST /api/leads
 * 
 * Handles lead submission from the multi-step form
 * 
 * Requirements: 9.6, 10.1-10.6, 19.1-19.3, 27.1-27.2
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
    const rateLimitResult = rateLimit(clientId, RateLimitPresets.leads);
    
    // Check if rate limit exceeded
    if (!rateLimitResult.allowed) {
      logWarn('Rate limit exceeded', { 
        clientId, 
        endpoint: '/api/leads',
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
    const validationResult = leadSchema.safeParse(body);
    
    if (!validationResult.success) {
      logValidationError('/api/leads', validationResult.error.format());
      return createValidationErrorResponse(validationResult.error);
    }
    
    const validatedData = validationResult.data;
    
    // Sanitize all string inputs to prevent XSS and injection attacks
    const sanitizedData = {
      name: sanitizeString(validatedData.name),
      email: validatedData.email.toLowerCase().trim(), // Email already validated by Zod
      organization: sanitizeString(validatedData.organization),
      organizationType: validatedData.organizationType,
      deploymentSize: validatedData.deploymentSize,
      message: sanitizeString(validatedData.message),
    };
    
    // Connect to MongoDB
    try {
      await connectDB();
    } catch (dbError) {
      logError('Database connection failed', dbError, { endpoint: '/api/leads' });
      return createDatabaseErrorResponse(dbError);
    }
    
    // Save lead to database
    try {
      const lead = await Lead.create(sanitizedData);
      
      logDatabaseOperation('create', 'leads', true, { leadId: lead._id.toString() });
      
      // Send email notification (non-blocking)
      // Email failures should not prevent lead submission from succeeding
      sendLeadNotificationAsync(lead);
      
      const response = createSuccessResponse(
        { leadId: lead._id.toString() },
        'Lead submitted successfully',
        HttpStatus.CREATED
      );
      
      addRateLimitHeaders(
        response,
        rateLimitResult.limit,
        rateLimitResult.remaining,
        rateLimitResult.reset
      );
      
      logApiResponse(request, HttpStatus.CREATED, { leadId: lead._id.toString() });
      
      return response;
      
    } catch (dbError: any) {
      logDatabaseOperation('create', 'leads', false, { error: dbError.message });
      return createDatabaseErrorResponse(dbError);
    }
    
  } catch (error: any) {
    // Log error with stack trace
    logError('Unhandled error in POST /api/leads', error, {
      endpoint: '/api/leads',
      method: 'POST',
    });
    
    return createInternalErrorResponse(error);
  }
}

/**
 * Sends lead notification email asynchronously (non-blocking)
 * 
 * This function is intentionally fire-and-forget to ensure email failures
 * do not block lead submission. Errors are logged but not propagated.
 * 
 * Requirements: 24.9
 * 
 * @param lead - The lead document from MongoDB
 */
function sendLeadNotificationAsync(lead: any): void {
  // Use setImmediate to ensure this runs after the response is sent
  setImmediate(async () => {
    try {
      const emailService = getEmailService();
      
      await emailService.sendLeadNotification({
        name: lead.name,
        email: lead.email,
        organization: lead.organization,
        organizationType: lead.organizationType,
        deploymentSize: lead.deploymentSize,
        message: lead.message,
        createdAt: lead.createdAt,
      });
      
      logEmailNotification('lead', true, lead.email);
    } catch (error: any) {
      // Log email failure but don't throw - this is non-blocking
      logEmailNotification('lead', false, lead.email, error);
    }
  });
}
