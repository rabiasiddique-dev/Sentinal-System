# POST /api/leads

Lead submission endpoint for the multi-step lead capture form.

## Requirements

Implements requirements: 9.6, 10.1-10.6, 19.1-19.3, 27.1-27.2

## Request

**Method:** POST  
**Content-Type:** application/json

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "organization": "Acme Corp",
  "organizationType": "corporate",
  "deploymentSize": "201-1000",
  "message": "Interested in enterprise deployment for our organization"
}
```

### Field Validation

- **name**: String, 2-100 characters, required
- **email**: Valid email format, required, unique
- **organization**: String, 2-200 characters, required
- **organizationType**: Enum: `government`, `defense`, `corporate`, `ngo`, `other`, required
- **deploymentSize**: Enum: `1-50`, `51-200`, `201-1000`, `1000+`, required
- **message**: String, 10-1000 characters, required

## Responses

### Success (201 Created)

```json
{
  "success": true,
  "message": "Lead submitted successfully",
  "leadId": "507f1f77bcf86cd799439011"
}
```

### Validation Error (400 Bad Request)

```json
{
  "success": false,
  "error": "Validation failed",
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
  "error": "A lead with this email address already exists"
}
```

### Server Error (500 Internal Server Error)

```json
{
  "success": false,
  "error": "An error occurred while processing your request. Please try again later."
}
```

## Security Features

1. **Input Validation**: All fields validated with Zod schema
2. **Input Sanitization**: HTML special characters escaped to prevent XSS
3. **Email Uniqueness**: Duplicate emails rejected with 409 status
4. **Error Handling**: Comprehensive error handling with appropriate status codes
5. **Logging**: All errors logged with timestamps and stack traces

## Testing

### Manual Testing with curl

```bash
# Valid request
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "organization": "Acme Corp",
    "organizationType": "corporate",
    "deploymentSize": "201-1000",
    "message": "Interested in enterprise deployment"
  }'

# Invalid email
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "invalid-email",
    "organization": "Acme Corp",
    "organizationType": "corporate",
    "deploymentSize": "201-1000",
    "message": "Interested in enterprise deployment"
  }'

# Duplicate email (run twice)
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "john@example.com",
    "organization": "Another Corp",
    "organizationType": "government",
    "deploymentSize": "51-200",
    "message": "Another inquiry"
  }'
```

### Testing with Postman or Thunder Client

1. Create a new POST request to `http://localhost:3000/api/leads`
2. Set Content-Type header to `application/json`
3. Add the request body with valid lead data
4. Send the request and verify the response

## Implementation Details

### Input Sanitization

All string fields are sanitized using the `sanitizeString` utility which:
- Trims whitespace
- Escapes HTML special characters: `&`, `<`, `>`, `"`, `'`

### Database Operations

- Connects to MongoDB using the connection utility
- Creates a new Lead document with sanitized data
- Handles duplicate email errors (MongoDB error code 11000)

### Email Notifications

When a lead is successfully saved, an email notification is sent asynchronously to the admin email address configured in the environment variables. The email includes:
- Lead name
- Lead email
- Organization name
- Organization type
- Deployment size
- Message content
- Submission timestamp

**Non-blocking behavior**: Email sending is intentionally non-blocking. If the email service fails, the lead submission still succeeds and returns a 201 status. Email failures are logged but do not affect the API response.

### Error Logging

All errors are logged with:
- ISO timestamp
- Error message
- Stack trace (for debugging)
- Request context

## Environment Variables Required

- `MONGODB_URI`: MongoDB connection string
- `EMAIL_SERVICE`: Email service provider (default: 'resend')
- `RESEND_API_KEY`: API key for Resend email service
- `EMAIL_FROM`: From email address for notifications (default: 'notifications@sentinelsystems.com')
- `ADMIN_EMAIL`: Admin email address to receive lead notifications

## Next Steps

- Add rate limiting middleware (Task 11.3)
- Add property-based tests (Tasks 6.2-6.4, 7.3-7.4)
