# Lead API Email Integration Test

## Manual Testing Steps

### Prerequisites
1. Ensure MongoDB is running and accessible
2. Set up environment variables:
   ```
   MONGODB_URI=your_mongodb_uri
   EMAIL_SERVICE=resend
   RESEND_API_KEY=your_resend_api_key
   EMAIL_FROM=notifications@sentinelsystems.com
   ADMIN_EMAIL=admin@sentinelsystems.com
   ```

### Test 1: Successful Lead Submission with Email

**Steps:**
1. Start the development server: `npm run dev`
2. Submit a lead via the API:
   ```bash
   curl -X POST http://localhost:3000/api/leads \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "organization": "Test Corp",
       "organizationType": "corporate",
       "deploymentSize": "51-200",
       "message": "This is a test lead submission"
     }'
   ```

**Expected Results:**
- API returns 201 status with success message
- Lead is saved to MongoDB
- Console logs show: "Lead created successfully"
- Console logs show: "Email notification sent successfully for lead: [leadId]"
- Admin email receives notification with all lead details

### Test 2: Email Failure Does Not Block Lead Submission

**Steps:**
1. Temporarily set an invalid RESEND_API_KEY in .env.local
2. Submit a lead via the API (same curl command as above)

**Expected Results:**
- API still returns 201 status with success message
- Lead is still saved to MongoDB
- Console logs show: "Lead created successfully"
- Console logs show error: "Failed to send email notification for lead [leadId]"
- API response is NOT affected by email failure

### Test 3: Email Contains All Required Information

**Steps:**
1. Ensure valid email configuration
2. Submit a lead with all fields populated
3. Check the received email

**Expected Email Content:**
- Lead name
- Lead email
- Organization name
- Organization type
- Deployment size
- Message content
- Submission timestamp

### Verification Checklist

- [ ] Lead submission succeeds (201 status)
- [ ] Lead is saved to database
- [ ] Email is sent asynchronously (non-blocking)
- [ ] Email contains all required fields
- [ ] Email failure does not prevent lead submission
- [ ] Email failure is logged appropriately
- [ ] Console logs show proper timestamps
- [ ] API response is returned before email is sent

## Code Review Checklist

- [x] Email service imported correctly
- [x] `sendLeadNotificationAsync` function defined
- [x] Function uses `setImmediate` for non-blocking execution
- [x] Email service called with correct lead data
- [x] Email errors caught and logged
- [x] Email errors do not propagate to API response
- [x] Success log includes lead ID
- [x] Error log includes lead ID and error details
- [x] Function called after lead is saved
- [x] Function called before API response is returned

## Integration Points Verified

1. **Email Service Factory**: `getEmailService()` correctly instantiates email service
2. **Lead Data Mapping**: All lead fields correctly mapped to `LeadEmailData` interface
3. **Error Handling**: Try-catch block prevents email errors from affecting API
4. **Logging**: Both success and failure cases logged with timestamps
5. **Non-blocking**: `setImmediate` ensures email sending doesn't block response

## Notes

- The email service uses the Resend API by default
- Email templates are defined in `lib/email/templates.ts`
- Email service abstraction allows for easy provider switching
- All email configuration is environment-based
