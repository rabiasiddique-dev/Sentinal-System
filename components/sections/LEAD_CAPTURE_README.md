# Lead Capture System

## Overview

The Lead Capture System is a complete multi-step form implementation for collecting qualified leads through a three-step wizard interface.

## Components

### LeadCaptureSection

Location: `components/sections/LeadCaptureSection.tsx`

A fully-featured lead capture form with:
- **Multi-step wizard** (3 steps)
- **Progress indicator** showing completion percentage
- **Form validation** using React Hook Form + Zod
- **Real-time validation feedback**
- **Loading states** during submission
- **Success/error handling**
- **Responsive design** matching the cyber theme

### Validation Schema

Location: `lib/validations/lead.ts`

Zod schema with comprehensive validation:
- Organization type (enum: government, defense, corporate, journalist, ngo, other)
- Deployment size (enum: 1-10, 11-50, 51-200, 201-1000, 1000+)
- Name (2-100 characters)
- Email (valid email format)
- Organization (2-200 characters)
- Message (10-1000 characters)

## Form Steps

### Step 1: Organization Type
- Radio button selection
- Visual feedback for selected option
- Validation before proceeding

### Step 2: Deployment Size
- Radio button selection
- Visual feedback for selected option
- Validation before proceeding

### Step 3: Contact Details
- Name input field
- Email input field
- Organization input field
- Message textarea
- Real-time validation feedback
- Submit button with loading state

## Features

✅ Multi-step wizard with progress indicator
✅ Form state management with React Hook Form
✅ Comprehensive validation with Zod
✅ Navigation between steps (Next, Back buttons)
✅ Real-time validation feedback
✅ Loading state during submission
✅ Success confirmation message
✅ Error handling and display
✅ Form reset after successful submission
✅ Cyber theme styling with animations
✅ Responsive design

## API Integration

The form submits to `/api/leads` endpoint (to be implemented in Task 6).

Expected request format:
```json
{
  "organizationType": "corporate",
  "deploymentSize": "51-200",
  "name": "John Doe",
  "email": "john@example.com",
  "organization": "Acme Corp",
  "message": "Interested in enterprise deployment"
}
```

## Demo

View the component in action at `/lead-demo`

## Requirements Satisfied

- ✅ Requirement 9.1: Multi-step form with three stages
- ✅ Requirement 9.2: Collect organization type in step one
- ✅ Requirement 9.3: Collect deployment size in step two
- ✅ Requirement 9.4: Collect contact details in step three
- ✅ Requirement 9.5: Validate all input fields
- ✅ Requirement 9.8: Display success confirmation message
- ✅ Requirement 9.9: Display progress indicators for form steps
- ✅ Requirement 19.1: Validate all request bodies using Zod schemas
- ✅ Requirement 19.4: Reject requests with invalid email formats
- ✅ Requirement 19.5: Reject requests with missing required fields
- ✅ Requirement 19.6: Limit string field lengths

## Dependencies

- `react-hook-form`: Form state management
- `@hookform/resolvers`: Zod resolver for React Hook Form
- `zod`: Schema validation
- `framer-motion`: Animations
- `lucide-react`: Icons

## Usage

```tsx
import LeadCaptureSection from '@/components/sections/LeadCaptureSection';

export default function Page() {
  return <LeadCaptureSection />;
}
```

## Styling

The component uses the cyber theme with:
- Dark background (`bg-cyber-black`)
- Neon green accents (`text-cyber-green`)
- Glassmorphism effects
- Smooth animations
- Hover effects
- Focus states for accessibility
