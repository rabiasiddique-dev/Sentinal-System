# NewsletterForm Component

## Overview

The `NewsletterForm` component is a reusable newsletter subscription form that handles email collection with proper validation, loading states, and user feedback.

## Features

- **Client-side validation**: Uses Zod schema for email validation before submission
- **Loading states**: Shows "Subscribing..." text during API call
- **Success/error messages**: Displays appropriate feedback to users
- **Duplicate handling**: Shows specific message when email is already subscribed
- **Accessibility**: Includes proper labels, ARIA attributes, and keyboard navigation
- **Cyber theme styling**: Consistent with the Sentinel Systems design system

## Usage

```tsx
import NewsletterForm from '@/components/NewsletterForm';

export default function MyComponent() {
  return (
    <div>
      <h3>Subscribe to our newsletter</h3>
      <NewsletterForm />
    </div>
  );
}
```

## Integration

The component is currently integrated into the `Footer` component to collect newsletter subscriptions site-wide.

## API Endpoint

The form submits to `/api/newsletter` with the following request format:

```json
{
  "email": "user@example.com"
}
```

### Success Response (201)
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

### Error Responses

**Validation Error (400)**
```json
{
  "success": false,
  "error": "Invalid email address",
  "details": { ... }
}
```

**Duplicate Email (409)**
```json
{
  "success": false,
  "error": "This email is already subscribed to our newsletter"
}
```

**Server Error (500)**
```json
{
  "success": false,
  "error": "An error occurred while processing your request. Please try again later."
}
```

## Validation

The component uses the `newsletterSchema` from `@/lib/validations/newsletter.ts`:

```typescript
const newsletterSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
});
```

## State Management

The component manages the following states:
- `email`: Current email input value
- `status`: Form submission status ('idle' | 'loading' | 'success' | 'error')
- `message`: User feedback message

## Styling

The component uses Tailwind CSS with the cyber theme:
- Background: `bg-cyber-gray-800`
- Border: `border-cyber-gray-700`
- Focus ring: `focus:ring-cyber-green`
- Button: `bg-cyber-green` with `text-cyber-black`
- Success text: `text-cyber-green`
- Error text: `text-cyber-red`

## Accessibility Features

- Screen reader-only label for email input
- `aria-describedby` linking input to error messages
- `role="alert"` for status messages
- Disabled state during submission
- Keyboard navigation support

## Requirements Satisfied

- **30.1**: Newsletter subscription form in footer
- **30.3**: Email validation
- **30.5**: Success/error message display
