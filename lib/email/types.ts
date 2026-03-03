/**
 * Email service types and interfaces
 * 
 * Requirements: 24.1-24.8
 */

/**
 * Lead data structure for email notifications
 */
export interface LeadEmailData {
  name: string;
  email: string;
  organization: string;
  organizationType: string;
  deploymentSize: string;
  message: string;
  createdAt: Date;
}

/**
 * Email service interface
 * Provides abstraction for different email providers
 */
export interface EmailService {
  /**
   * Send a lead notification email to the admin
   * 
   * @param lead - The lead data to include in the notification
   * @throws Error if email sending fails
   */
  sendLeadNotification(lead: LeadEmailData): Promise<void>;
}
