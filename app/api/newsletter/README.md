# Newsletter Subscription API

## Endpoint

`POST /api/newsletter`

## Description

Handles newsletter subscription from the footer form. Validates email addresses, checks for duplicates, and saves subscriptions to the database.

## Requirements

- **30.3**: Email validation with Zod
- **30.4**: Save subscription to database
- **30.5**: Return appropriate success messages
- **30.6**: Prevent duplicate subscriptions
- **30.7**: Return appropriate error messages for duplicates

## Request

### Headers
```
Content-Type: application/json
```

### Body
```json
{
  "email": "user@example.com"
}
```

### Validation Rules
- Email must be a valid email format
- Email is automatically converted to lowercase
- Email is automatically trimmed

## Response

### Success (201 Created)
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

### Validation Error (400 Bad Request)
```json
{
  "success": false,
  "error": "Invalid email address",
  "details": {
    "email": {
      "_errors": ["Please enter a valid email address"]
    }
  }
}
```

### Duplicate Email (409 Conflict)
```json
{
  "success": false,
  "error": "This email is already subscribed to our newsletter"
}
```

### Server Error (500 Internal Server Error)
```json
{
  "success": false,
  "error": "An error occurred while processing your request. Please try again later."
}
```

## Implementation Details

### Email Validation
- Uses Zod schema validation
- Validates email format using built-in email validator
- Automatically converts to lowercase and trims whitespace

### Duplicate Prevention
- MongoDB unique index on email field prevents duplicates
- Returns 409 status code when duplicate is detected
- Provides user-friendly error message

### Error Logging
- All errors logged with timestamps
- Stack traces included for debugging
- Sensitive details not exposed to client

### Database
- Saves to `Newsletter` collection
- Stores email, subscribedAt timestamp, and active status
- Indexes on email and subscribedAt for performance

## Example Usage

### Using fetch
```javascript
const response = await fetch('/api/newsletter', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
  }),
});

const data = await response.json();

if (data.success) {
  console.log('Subscribed successfully!');
} else {
  console.error('Subscription failed:', data.error);
}
```

### Using curl
```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

## Security Features

1. **Input Validation**: Zod schema validates all inputs
2. **Email Sanitization**: Automatic lowercase and trim
3. **Error Handling**: Generic error messages in production
4. **Logging**: All errors logged with timestamps
5. **Duplicate Prevention**: Database-level unique constraint

## Testing

The endpoint should be tested for:
- Valid email subscription
- Invalid email format rejection
- Duplicate email rejection
- Database connection errors
- Malformed request body handling
