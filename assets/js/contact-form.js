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
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company') || 'Not specified',
            message: formData.get('message')
        };

        // Basic client-side validation
        if (!data.name || !data.email || !data.message) {
            this.showMessage('Please fill in all required fields.', 'error');
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
            /viagra|pharmacy|pills/i,
            /http[s]?:\/\/[^\s]+/g // Multiple URLs
        ];

        const messageText = `${data.name} ${data.message}`.toLowerCase();
        const hasSpam = spamPatterns.some(pattern => pattern.test(messageText));
        
        if (hasSpam) {
            this.showMessage('Message appears to be spam and was blocked.', 'error');
            return;
        }

        this.setLoading(true);

        try {
            const issueBody = this.formatIssueBody(data);
            
            const response = await fetch('https://api.github.com/repos/Anaxiatech-AB/anaxiatech.se/issues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify({
                    title: `Contact Form: ${data.name} - ${data.company}`,
                    body: issueBody,
                    labels: ['contact-form']
                })
            });

            if (response.ok) {
                this.showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
                this.form.reset();
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage('Sorry, there was an error sending your message. Please try emailing us directly.', 'error');
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