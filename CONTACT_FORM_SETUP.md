# Contact Form Backend Setup

## Overview
The contact form now uses GitHub Actions + Issues API for serverless form processing with spam filtering.

## How It Works
1. **Form Submission**: JavaScript submits form data to GitHub Issues API
2. **GitHub Action**: Automatically triggered when new issue with 'contact-form' label is created
3. **Spam Filter**: Basic keyword filtering on both client and server side
4. **Email Notification**: Sends formatted email to theresia.lundgren@anaxiatech.se
5. **Issue Management**: Automatically closes and labels processed issues

## Setup Required

### 1. GitHub Repository Settings
- Enable Issues in repository settings (Settings > General > Features)
- Allow public issue creation (should be default)

### 2. Email SMTP Secrets
Add these secrets in GitHub repository settings (Settings > Secrets and variables > Actions):

```
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

**For Gmail:**
1. Enable 2FA on your Google account
2. Generate App Password: Google Account > Security > App passwords
3. Use the 16-character app password (not your regular password)

### 3. Alternative SMTP Providers
If not using Gmail, update the workflow file with your provider:
- **Outlook**: smtp-mail.outlook.com, port 587
- **SendGrid**: smtp.sendgrid.net, port 587
- **Mailgun**: smtp.mailgun.org, port 587

## Security Features
✅ Client-side spam detection (keywords, multiple URLs)
✅ Server-side spam filtering in GitHub Action
✅ Email validation and required field checking
✅ Rate limiting via GitHub API limits
✅ No sensitive data stored in code

## Testing
1. Submit a test message via the contact form
2. Check Issues tab for new issue creation
3. Verify email delivery to theresia.lundgren@anaxiatech.se
4. Issue should auto-close with "processed" label

## Spam Protection
Blocked keywords: crypto, bitcoin, loan, casino, viagra, pharmacy
Multiple URLs in message also trigger spam detection

## Backup Plan
If GitHub Actions fail, users can still email directly via the contact info section.