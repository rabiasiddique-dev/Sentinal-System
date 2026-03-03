import { z } from 'zod';

/**
 * Validation schema for newsletter subscription
 * Validates email format
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
