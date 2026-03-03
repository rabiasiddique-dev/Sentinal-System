import { z } from 'zod';

/**
 * Validation schema for lead capture form
 * Validates all fields with appropriate constraints
 */
export const leadSchema = z.object({
  organizationType: z.enum(['government', 'defense', 'corporate', 'ngo', 'other'], {
    message: 'Please select an organization type',
  }),
  deploymentSize: z.enum(['1-50', '51-200', '201-1000', '1000+'], {
    message: 'Please select a deployment size',
  }),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  organization: z
    .string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(200, 'Organization name must not exceed 200 characters')
    .trim(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters')
    .trim(),
});

export type LeadFormData = z.infer<typeof leadSchema>;
