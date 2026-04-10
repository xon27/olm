# Formspree Setup Instructions

**Much easier than EmailJS!** No email service connection needed. Just create a form endpoint and it works!

## Quick Setup (5 minutes):

1. **Go to https://formspree.io/** and create a free account
   - Sign up with your email
   - Verify your email address

2. **Create a New Form**:
   - Click "New Form" button
   - Name it "Contact Form"
   - Copy the form endpoint (looks like: `https://formspree.io/f/xxxxxxxxxx`)
   - **Important**: Copy the entire URL including `https://formspree.io/f/`

3. **Configure Email Settings**:
   - In Formspree dashboard, go to your form's Settings
   - Set "Send Emails To" to: `dixoncarnacete13@gmail.com`
   - Save the settings

4. **Add Formspree Endpoint** (Choose ONE method):

   **Option A: Using Environment Variable (Recommended)**
   - Create a `.env` file in your project root
   - Add this line (replace with your actual endpoint):
     ```
     VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_actual_form_id
     ```
   - Restart your dev server after creating `.env`

   **Option B: Direct in Code**
   - Open `src/pages/Contact.jsx`
   - Find the line: `const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID'`
   - Replace `YOUR_FORM_ID` with your actual form ID from Formspree

5. **Test**: Submit the contact form and check your email!

## Free Plan Limits:
- 50 submissions per month (free)
- File uploads supported
- No credit card required

## Alternative: EmailJS Setup

If you prefer EmailJS, you can:
1. Set `useEmailJS = true` in Apply.jsx
2. Configure EmailJS credentials
3. See EMAILJS_SETUP.md for details


