# Email Service

This directory contains the email notification system for the Sentinel Systems website.

## Overview

The email service provides an abstraction layer for sending transactional emails, specifically lead notifications to the admin team. The service is designed to be provider-agnostic, allowing for easy switching between different email providers.

## Architecture

```
lib/email/
├── index.ts           # Factory function and exports
├── types.ts           # TypeScript interfaces
├── templates.ts       # Email template generation
├── resend-service.ts  # Resend implementation
└── README.md          # This file
```

## Requirements

**Validates Requirements:** 24.1, 24.2, 24.3, 24.4, 24.5, 24.6, 24.7, 24.8

- 24.1: Send notification email when new lead is submitted
- 24.2: Send notifications to configured admin email address
- 24.3: Include lead name in notification email
- 24.4: Include lead email in notification email
- 24.5: Include organization name in notification email
- 24.6: Include deployment size in notification email
- 24.7: Include message content in notification email
- 24.8: Include submission timestamp in notification email

## Usage

### Basic Usage

```typescript
import { getEmailService } from '@/lib/email';

// Get the email service instance
const emailService = getEmailService();

// Send a lead notification
await emailService.sendLeadNotification({
  name: 'John Doe',
  email: 'john@example.com',
  organization: 'Acme Corp',
  organizationType: 'corporate',
  deploymentSize: '201-1000',
  message: 'Interested in enterprise deployment',
  createdAt: new Date(),
});
```

### Non-Blocking Email Sending

For lead submissions, email sending should be non-blocking to ensure the lead is saved even if email fails:

```typescript
// Save lead first (critical)
const lead = await Lead.create(data);

// Send email notification (non-blocking)
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
} catch (error) {
  console.error('Failed to send email notification:', error);
  // Log to monitoring service but don't fail the request
}
```

## Configuration

### Environment Variables

The email service requires the following environment variables:

```bash
# Email Service Configuration
EMAIL_SERVICE=resend                    # Email provider (currently only 'resend' is supported)
RESEND_API_KEY=re_xxxxxxxxxxxxx        # Resend API key (required)
EMAIL_FROM=notifications@example.com    # From email address (optional, defaults to notifications@sentinelsystems.com)
ADMIN_EMAIL=admin@example.com          # Admin email to receive notifications (required)
```

### Resend Setup

1. Sign up for a [Resend](https://resend.com) account
2. Verify your domain or use the Resend testing domain
3. Generate an API key from the dashboard
4. Add the API key to your `.env.local` file
5. Configure the admin email address

## Email Templates

### Lead Notification Email

The lead notification email includes:

- **Name**: Lead's full name
- **Email**: Lead's email address (with mailto link)
- **Organization**: Organization name
- **Organization Type**: Badge showing type (Government, Defense, Corporate, NGO, Other)
- **Deployment Size**: Number of devices
- **Message**: Full message content
- **Submitted**: Formatted timestamp

The email is sent in both HTML and plain text formats for maximum compatibility.

### Template Features

- **HTML Email**: Styled with inline CSS for email client compatibility
- **Plain Text Fallback**: Clean text version for clients that don't support HTML
- **XSS Protection**: All user input is escaped to prevent injection attacks
- **Reply-To Header**: Set to lead's email for easy responses
- **Tags**: Metadata tags for tracking and filtering in Resend dashboard

## Error Handling

The email service throws errors when sending fails. Callers should handle these errors appropriately:

```typescript
try {
  await emailService.sendLeadNotification(lead);
  console.log('Email sent successfully');
} catch (error) {
  console.error('Email sending failed:', error);
  // Log to monitoring service
  // Don't fail the request if lead was already saved
}
```

## Testing

### Manual Testing

You can test the email service in development:

```typescript
import { getEmailService } from '@/lib/email';

const emailService = getEmailService();

await emailService.sendLeadNotification({
  name: 'Test User',
  email: 'test@example.com',
  organization: 'Test Corp',
  organizationType: 'corporate',
  deploymentSize: '1-50',
  message: 'This is a test message',
  createdAt: new Date(),
});
```

### Unit Testing

Mock the email service in tests:

```typescript
import { EmailService } from '@/lib/email';

const mockEmailService: EmailService = {
  sendLeadNotification: jest.fn().mockResolvedValue(undefined),
};
```

## Future Enhancements

Potential improvements for the email service:

1. **Additional Providers**: Support for SendGrid, Mailgun, AWS SES
2. **Email Queue**: Implement retry logic with a queue system
3. **Email Templates**: Support for more email types (welcome, confirmation, etc.)
4. **Email Tracking**: Track opens, clicks, and bounces
5. **Email Preferences**: Allow users to manage notification preferences
6. **Rate Limiting**: Prevent email spam with rate limiting
7. **Email Validation**: Verify email addresses before sending

## Troubleshooting

### Email Not Sending

1. Check that `RESEND_API_KEY` is set correctly
2. Verify that `ADMIN_EMAIL` is configured
3. Check Resend dashboard for delivery status
4. Review application logs for error messages
5. Ensure the from email domain is verified in Resend

### Email Going to Spam

1. Verify your domain in Resend
2. Set up SPF, DKIM, and DMARC records
3. Use a professional from address
4. Avoid spam trigger words in subject/content
5. Monitor sender reputation in Resend dashboard

### API Key Issues

1. Ensure API key has correct permissions
2. Check that API key hasn't expired
3. Verify API key is for the correct environment (test vs production)
4. Regenerate API key if compromised
