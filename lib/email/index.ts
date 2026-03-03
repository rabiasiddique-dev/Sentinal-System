/**
 * Email service factory and exports
 * 
 * Requirements: 24.1-24.8
 */

import { EmailService } from './types';
import { ResendEmailService } from './resend-service';

// Re-export types
export type { EmailService, LeadEmailData } from './types';

/**
 * Creates an email service instance based on environment configuration
 * 
 * @returns EmailService instance configured for the current environment
 * @throws Error if required environment variables are missing
 */
export function createEmailService(): EmailService {
  const emailService = process.env.EMAIL_SERVICE || 'resend';
  
  if (emailService === 'resend') {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.EMAIL_FROM || 'notifications@sentinelsystems.com';
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!apiKey) {
      throw new Error(
        'RESEND_API_KEY environment variable is required when using Resend email service'
      );
    }

    if (!adminEmail) {
      throw new Error(
        'ADMIN_EMAIL environment variable is required for lead notifications'
      );
    }

    return new ResendEmailService(apiKey, fromEmail, adminEmail);
  }

  throw new Error(
    `Unsupported email service: ${emailService}. Supported services: resend`
  );
}

/**
 * Singleton email service instance
 * Lazily initialized on first use
 */
let emailServiceInstance: EmailService | null = null;

/**
 * Gets the email service instance
 * Creates a new instance if one doesn't exist
 * 
 * @returns EmailService instance
 */
export function getEmailService(): EmailService {
  if (!emailServiceInstance) {
    emailServiceInstance = createEmailService();
  }
  return emailServiceInstance;
}

/**
 * Resets the email service instance
 * Useful for testing or when configuration changes
 */
export function resetEmailService(): void {
  emailServiceInstance = null;
}
