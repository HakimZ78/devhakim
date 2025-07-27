# Contact Form Testing Guide

## Overview
This guide provides step-by-step testing procedures for the portfolio contact form with Gmail integration.

## Prerequisites
- Development server running (`npm run dev`)
- Gmail app password configured in `.env.local`
- 2FA enabled on Gmail account

## Environment Setup

### 1. Verify Environment Variables
Check that your `.env.local` file contains:
```env
EMAIL_FROM=zaehid.hakim78@gmail.com
EMAIL_TO=zaehid.hakim78@gmail.com
EMAIL_PASS=your_16_character_app_password
```

### 2. Gmail App Password Setup
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Navigate to **2-Step Verification** → **App passwords**
3. Generate new app password for "Mail"
4. Copy the 16-character password (no spaces)
5. Update `EMAIL_PASS` in `.env.local`
6. **Restart development server** after updating

## Testing Commands

### 1. Check Server Status
```bash
# Verify server is running on correct port
lsof -i:3001
```

### 2. Test Environment Variables
```bash
# Check if environment variables are loaded
curl http://localhost:3001/api/contact/test
```

**Expected Response:**
```json
{
  "success": true,
  "env": {
    "EMAIL_FROM": "Set",
    "EMAIL_TO": "Set", 
    "EMAIL_PASS": "Set"
  },
  "message": "Contact API test endpoint"
}
```

### 3. Test Gmail Connection
```bash
# Test Gmail authentication and connection
curl http://localhost:3001/api/contact/debug
```

**Expected Success Response:**
```json
{
  "success": true,
  "message": "Gmail connection successful!",
  "config": {
    "EMAIL_FROM": "zaehid.hakim78@gmail.com",
    "EMAIL_TO": "zaehid.hakim78@gmail.com",
    "EMAIL_PASS_LENGTH": 16
  }
}
```

**Common Error Response:**
```json
{
  "success": false,
  "error": "Gmail verification failed",
  "details": "Invalid login: 535-5.7.8 Username and Password not accepted...",
  "config": {...}
}
```

### 4. Test Contact Form Submission
```bash
# Test full contact form submission
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "subject": "Test Subject",
    "message": "This is a test message from the contact form."
  }'
```

**Expected Success Response:**
```json
{
  "success": true,
  "message": "Email sent successfully!"
}
```

**Common Error Responses:**
```json
{
  "success": false,
  "error": "Email authentication failed. Please check Gmail app password configuration."
}
```

### 5. Test Form Validation
```bash
# Test missing required fields
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "error": "All fields are required"
}
```

```bash
# Test invalid email format
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "invalid-email",
    "subject": "Test Subject", 
    "message": "Test message"
  }'
```

**Expected Response:**
```json
{
  "success": false,
  "error": "Invalid email address"
}
```

## Troubleshooting

### Gmail Authentication Issues

**Error:** `Invalid login: Username and Password not accepted`

**Solutions:**
1. **Regenerate App Password:**
   - Delete existing app password in Google Account
   - Generate new 16-character app password
   - Update `.env.local` with exact password (no spaces)
   - Restart development server

2. **Verify 2FA Status:**
   - Ensure 2-factor authentication is enabled
   - App passwords only work with 2FA enabled

3. **Check Account Security:**
   - Verify no security holds on account
   - Check for recent security notifications

### Server Issues

**Error:** `Failed to connect to localhost`

**Solutions:**
1. Check server is running: `npm run dev`
2. Verify correct port (usually 3001)
3. Check for port conflicts: `lsof -i:3001`

### Environment Variable Issues

**Error:** Environment variables show "Not set"

**Solutions:**
1. Verify `.env.local` file exists in project root
2. Check file format (no quotes around values)
3. Restart development server
4. Ensure `.env.local` is not in `.gitignore`

## Testing Workflow

1. **Start with Environment Test:**
   ```bash
   curl http://localhost:3001/api/contact/test
   ```

2. **Test Gmail Connection:**
   ```bash
   curl http://localhost:3001/api/contact/debug
   ```

3. **If Gmail fails:** Regenerate app password and restart server

4. **Test Full Submission:**
   ```bash
   curl -X POST http://localhost:3001/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test"}'
   ```

5. **Check Email Delivery:** Look for emails in both sent and inbox

## Success Indicators

✅ **Environment variables loaded**  
✅ **Gmail connection successful**  
✅ **Contact form accepts valid submissions**  
✅ **Form validation works for invalid data**  
✅ **Emails delivered to inbox**  
✅ **Confirmation emails sent to submitter**

## API Endpoints

- `GET /api/contact/test` - Check environment variables
- `GET /api/contact/debug` - Test Gmail connection  
- `POST /api/contact` - Submit contact form

## Email Templates

The contact form sends two emails:

1. **Notification Email** (to you):
   - Subject: `Portfolio Contact: [subject]`
   - Contains sender details and message
   - Reply-to set to sender's email

2. **Confirmation Email** (to sender):
   - Subject: `Thank you for contacting me!`
   - Professional acknowledgment
   - Includes copy of their message

## Next Steps

Once all tests pass:
1. Test the contact form UI at `http://localhost:3001/#contact`
2. Deploy to production and test live form
3. Monitor email delivery rates
4. Set up email notifications/forwarding if needed