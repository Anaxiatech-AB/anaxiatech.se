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

```bash
SMTP_USERNAME=theresia.lundgren@anaxiatech.se
SMTP_PASSWORD=your-office365-password
```

**For Office 365/Azure:**
1. Use your full email address as username
2. Use your regular Office 365 password
3. Ensure SMTP authentication is enabled in your Office 365 admin panel
4. If using MFA, you may need to create an app password

### 3. Alternative SMTP Providers
The workflow is configured for Office 365. For other providers, update the workflow file:
- **Gmail**: smtp.gmail.com, port 465, SSL
- **SendGrid**: smtp.sendgrid.net, port 587, TLS
- **Mailgun**: smtp.mailgun.org, port 587, TLS

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