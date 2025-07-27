# Gmail Setup for Contact Form

This guide will help you set up Gmail to send emails from your contact form.

## Prerequisites

- A Gmail account with 2-factor authentication enabled
- Access to your Google Account security settings

## Step-by-Step Setup

### 1. Enable 2-Factor Authentication (if not already enabled)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click on "2-Step Verification"
3. Follow the prompts to enable 2FA

### 2. Generate App-Specific Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Search for "App passwords" or go directly to [App Passwords](https://myaccount.google.com/apppasswords)
3. Select "Mail" from the dropdown
4. Select "Other" for device and enter "Portfolio Contact Form"
5. Click "Generate"
6. Copy the 16-character password (ignore the spaces)

### 3. Update Environment Variables

Update your `.env.local` file:

```env
# Email Configuration
EMAIL_FROM=your-gmail@gmail.com
EMAIL_TO=zaehid.hakim78@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop  # Your 16-character app password (without spaces)
```

### 4. Test the Contact Form

1. Restart your development server: `npm run dev`
2. Go to `/contact` page
3. Fill out the form and submit
4. Check both:
   - Your inbox (EMAIL_TO address) for the contact message
   - The sender's email for the confirmation message

## Troubleshooting

### "Invalid login" Error

- Make sure you're using the app-specific password, not your regular Gmail password
- Verify 2FA is enabled on your Google account
- Check that the EMAIL_FROM matches the Gmail account that generated the app password

### Emails Not Sending

- Check your Gmail account for security alerts
- You might need to enable "Less secure app access" (though app passwords should work without this)
- Check spam/junk folders

### Rate Limiting

Gmail has sending limits:
- 500 emails per day for regular Gmail accounts
- 2000 emails per day for Google Workspace accounts

## Alternative Email Services

If you prefer not to use Gmail, consider:

1. **Resend** - Modern email API service
2. **SendGrid** - Popular email service with free tier
3. **Mailgun** - Developer-friendly email service
4. **AWS SES** - Amazon's email service

## Security Notes

- Never commit your `.env.local` file to git
- The `.env.example` file is safe to commit (contains no real credentials)
- Consider using a dedicated email account for sending automated emails
- Regularly rotate your app passwords for security