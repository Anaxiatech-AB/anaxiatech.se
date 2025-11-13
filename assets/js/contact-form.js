// Contact form handler for GitHub Issues API
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form form');
        this.submitBtn = this.form?.querySelector('button[type="submit"]');
        this.init();
    }

    init() {
        if (!this.form) return;
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name')?.trim(),
            email: formData.get('email')?.trim(),
            company: formData.get('company')?.trim() || 'Not specified',
            message: formData.get('message')?.trim()
        };

        // Basic client-side validation
        if (!data.name || !data.email || !data.message) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Field length validation
        if (data.name.length > 100) {
            this.showMessage('Name must be less than 100 characters.', 'error');
            return;
        }
        
        if (data.message.length > 2000) {
            this.showMessage('Message must be less than 2000 characters.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Basic spam detection
        const spamPatterns = [
            /crypto|bitcoin|blockchain/i,
            /loan|credit|casino|gambling/i,
            /viagra|pharmacy|pills/i
        ];

        const messageText = `${data.name} ${data.message}`.toLowerCase();
        const hasSpam = spamPatterns.some(pattern => pattern.test(messageText));
        
        // Check for multiple URLs (more than 1 URL indicates potential spam)
        const urlMatches = messageText.match(/http[s]?:\/\/[^\s]+/g);
        const hasMultipleUrls = urlMatches && urlMatches.length > 1;
        
        if (hasSpam || hasMultipleUrls) {
            this.showMessage('Message appears to be spam and was blocked.', 'error');
            return;
        }

        this.setLoading(true);

        try {
            // Use a mailto link as a fallback for now
            // This ensures the form always works even if external services are down
            const subject = encodeURIComponent(`Contact from ${data.name} - ${data.company}`);
            const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\n\nMessage:\n${data.message}`);
            const mailtoLink = `mailto:theresia.lundgren@anaxiatech.se?subject=${subject}&body=${body}`;
            
            // Open the user's email client
            window.location.href = mailtoLink;
            
            this.showMessage('Opening your email client... Please send the message to complete your inquiry.', 'success');
            this.form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            // Always provide the email fallback
            const subject = encodeURIComponent(`Contact from ${data.name} - ${data.company}`);
            const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\n\nMessage:\n${data.message}`);
            const mailtoLink = `mailto:theresia.lundgren@anaxiatech.se?subject=${subject}&body=${body}`;
            
            this.showMessage(`Opening email client as backup... <a href="${mailtoLink}" style="color: #3182ce; text-decoration: underline;">Click here if it doesn't open automatically</a>`, 'error');
            
            // Try to open email client
            try {
                window.location.href = mailtoLink;
            } catch (e) {
                console.error('Could not open email client:', e);
            }
        } finally {
            this.setLoading(false);
        }
    }

    formatIssueBody(data) {
        return `**Contact Form Submission**

**Name:** ${data.name}
**Email:** ${data.email}
**Company:** ${data.company}

**Message:**
${data.message}

---
*Submitted via anaxiatech.se contact form at ${new Date().toISOString()}*`;
    }

    setLoading(loading) {
        if (!this.submitBtn) return;
        
        if (loading) {
            this.submitBtn.disabled = true;
            this.submitBtn.innerHTML = 'Sending...';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = 'Send Message';
        }
    }

    showMessage(message, type = 'info') {
        // Remove existing messages
        const existing = this.form.querySelector('.form-message');
        if (existing) existing.remove();

        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message--${type}`;
        messageEl.textContent = message;
        
        this.form.insertBefore(messageEl, this.submitBtn);
        
        // Auto-remove success messages
        if (type === 'success') {
            setTimeout(() => messageEl.remove(), 5000);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});