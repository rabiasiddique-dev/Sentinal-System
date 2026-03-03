/**
 * Resend email service implementation
 * 
 * Requirements: 24.1, 24.2, 24.3, 24.4, 24.5, 24.6, 24.7, 24.8
 */

import { Resend } from 'resend';
import { EmailService, LeadEmailData } from './types';
import { generateLeadNotificationHTML, generateLeadNotificationText } from './templates';

/**
 * Resend email service implementation
 * Uses Resend API to send transactional emails
 */
export class ResendEmailService implements EmailService {
  private client: Resend;
  private fromEmail: string;
  private adminEmail: string;

  /**
   * Creates a new Resend email service instance
   * 
   * @param apiKey - Resend API key
   * @param fromEmail - Email address to send from (must be verified in Resend)
   * @param adminEmail - Admin email address to receive notifications
   */
  constructor(apiKey: string, fromEmail: string, adminEmail: string) {
    if (!apiKey) {
      throw new Error('Resend API key is required');
    }
    if (!fromEmail) {
      throw new Error('From email address is required');
    }
    if (!adminEmail) {
      throw new Error('Admin email address is required');
    }

    this.client = new Resend(apiKey);
    this.fromEmail = fromEmail;
    this.adminEmail = adminEmail;
  }

  /**
   * Sends a lead notification email to the admin
   * 
   * Requirements: 24.1, 24.2, 24.3, 24.4, 24.5, 24.6, 24.7, 24.8
   * 
   * @param lead - The lead data to include in the notification
   * @throws Error if email sending fails
   */
  async sendLeadNotification(lead: LeadEmailData): Promise<void> {
    try {
      const subject = `New Lead: ${lead.organization} (${lead.deploymentSize})`;
      const html = generateLeadNotificationHTML(lead);
      const text = generateLeadNotificationText(lead);

      const result = await this.client.emails.send({
        from: this.fromEmail,
        to: this.adminEmail,
        subject,
        html,
        text,
        // Add reply-to so admin can easily respond to the lead
        replyTo: lead.email,
        // Add tags for tracking and filtering
        tags: [
          {
            name: 'type',
            value: 'lead-notification',
          },
          {
            name: 'organization-type',
            value: lead.organizationType,
          },
          {
            name: 'deployment-size',
            value: lead.deploymentSize,
          },
        ],
      });

      if (result.error) {
        throw new Error(`Resend API error: ${result.error.message}`);
      }

      console.log(`[Email] Lead notification sent successfully. Email ID: ${result.data?.id}`);
    } catch (error) {
      console.error('[Email] Failed to send lead notification:', error);
      throw new Error(
        `Failed to send lead notification: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
