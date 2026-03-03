/**
 * Email template generation utilities
 * 
 * Requirements: 24.3, 24.4, 24.5, 24.6, 24.7, 24.8
 */

import { LeadEmailData } from './types';

/**
 * Generates HTML email template for lead notifications
 * Includes all lead details in a formatted layout
 * 
 * @param lead - The lead data to include in the email
 * @returns HTML string for the email body
 */
export function generateLeadNotificationHTML(lead: LeadEmailData): string {
  const formattedDate = lead.createdAt.toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Submission</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #00FF88;
      margin-top: 0;
      font-size: 24px;
      border-bottom: 2px solid #00FF88;
      padding-bottom: 10px;
    }
    .field {
      margin-bottom: 20px;
    }
    .label {
      font-weight: 600;
      color: #555;
      display: block;
      margin-bottom: 5px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .value {
      color: #333;
      font-size: 16px;
      padding: 10px;
      background-color: #f9f9f9;
      border-left: 3px solid #00FF88;
      border-radius: 4px;
    }
    .message-value {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      font-size: 12px;
      color: #888;
      text-align: center;
    }
    .badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .badge-government { background-color: #e3f2fd; color: #1976d2; }
    .badge-defense { background-color: #fce4ec; color: #c2185b; }
    .badge-corporate { background-color: #f3e5f5; color: #7b1fa2; }
    .badge-ngo { background-color: #e8f5e9; color: #388e3c; }
    .badge-other { background-color: #fff3e0; color: #f57c00; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎯 New Lead Submission</h1>
    
    <div class="field">
      <span class="label">Name</span>
      <div class="value">${escapeHtml(lead.name)}</div>
    </div>
    
    <div class="field">
      <span class="label">Email</span>
      <div class="value">
        <a href="mailto:${escapeHtml(lead.email)}" style="color: #00FF88; text-decoration: none;">
          ${escapeHtml(lead.email)}
        </a>
      </div>
    </div>
    
    <div class="field">
      <span class="label">Organization</span>
      <div class="value">${escapeHtml(lead.organization)}</div>
    </div>
    
    <div class="field">
      <span class="label">Organization Type</span>
      <div class="value">
        <span class="badge badge-${lead.organizationType}">
          ${formatOrganizationType(lead.organizationType)}
        </span>
      </div>
    </div>
    
    <div class="field">
      <span class="label">Deployment Size</span>
      <div class="value">${escapeHtml(lead.deploymentSize)} devices</div>
    </div>
    
    <div class="field">
      <span class="label">Message</span>
      <div class="value message-value">${escapeHtml(lead.message)}</div>
    </div>
    
    <div class="field">
      <span class="label">Submitted</span>
      <div class="value">${formattedDate}</div>
    </div>
    
    <div class="footer">
      <p>This is an automated notification from Sentinel Systems Lead Capture System.</p>
      <p>Please respond to the lead within 24 hours for best conversion rates.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generates plain text email template for lead notifications
 * Fallback for email clients that don't support HTML
 * 
 * @param lead - The lead data to include in the email
 * @returns Plain text string for the email body
 */
export function generateLeadNotificationText(lead: LeadEmailData): string {
  const formattedDate = lead.createdAt.toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  });

  return `
NEW LEAD SUBMISSION
===================

Name: ${lead.name}
Email: ${lead.email}
Organization: ${lead.organization}
Organization Type: ${formatOrganizationType(lead.organizationType)}
Deployment Size: ${lead.deploymentSize} devices

Message:
${lead.message}

Submitted: ${formattedDate}

---
This is an automated notification from Sentinel Systems Lead Capture System.
Please respond to the lead within 24 hours for best conversion rates.
  `.trim();
}

/**
 * Escapes HTML special characters to prevent XSS
 * 
 * @param text - The text to escape
 * @returns Escaped text safe for HTML
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Formats organization type for display
 * 
 * @param type - The organization type enum value
 * @returns Formatted display string
 */
function formatOrganizationType(type: string): string {
  const typeMap: Record<string, string> = {
    government: 'Government',
    defense: 'Defense',
    corporate: 'Corporate',
    ngo: 'NGO',
    other: 'Other',
  };
  return typeMap[type] || type;
}
