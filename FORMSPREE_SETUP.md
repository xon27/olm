# Formspree Setup Instructions

To enable automatic email sending, follow these steps:

## Quick Setup (Recommended - Works Immediately):

1. **Go to https://formspree.io/** and create a free account

2. **Create a New Form**:
   - Click "New Form"
   - Name it "Contact Form" or "Application Form"
   - Copy the form endpoint (looks like: `https://formspree.io/f/xxxxxxxxxx`)

3. **Update the Code**:
   
   In `src/pages/Contact.jsx`, replace:
   ```javascript
   const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'
   ```
   with your actual Formspree endpoint

   In `src/pages/Apply.jsx`, replace:
   ```javascript
   const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'
   ```
   with your actual Formspree endpoint (you can use the same one or create separate forms)

4. **Configure Email Settings**:
   - In Formspree dashboard, go to Settings
   - Set "Send Emails To" to: `dixoncarnacete13@gmail.com`
   - Enable file uploads if needed

5. **Test**: Submit a form and check your email!

## Free Plan Limits:
- 50 submissions per month (free)
- File uploads supported
- No credit card required

## Alternative: EmailJS Setup

If you prefer EmailJS, you can:
1. Set `useEmailJS = true` in Apply.jsx
2. Configure EmailJS credentials
3. See EMAILJS_SETUP.md for details


