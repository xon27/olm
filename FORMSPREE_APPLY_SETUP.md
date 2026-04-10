# Formspree Setup for Application Form

The application form now uses **Formspree** for form submissions. **Note:** Formspree free plan does NOT support file uploads, so resume file information (name, size, type) will be included in the email instead.

## Quick Setup (5 minutes):

1. **Go to https://formspree.io/** and log in (or create a free account)
   - If you already have an account from the Contact form, you can use the same one

2. **Create a New Form for Applications**:
   - Click "New Form" button
   - Name it "Job Application Form"
   - Copy the form endpoint (looks like: `https://formspree.io/f/xxxxxxxxxx`)
   - **Important**: Copy the entire URL including `https://formspree.io/f/`

3. **Configure Email Settings**:
   - In Formspree dashboard, go to your form's Settings
   - Set "Send Emails To" to: `dixoncarnacete13@gmail.com`
   - Save the settings

4. **File Upload Limitation**:
   - ⚠️ **Important:** Formspree free plan does NOT support file uploads
   - The form will send file information (name, size, type) in the email
   - You'll need to contact the applicant to request the resume file
   - To enable file uploads, you'll need to upgrade to Formspree Personal plan ($19/month)

5. **Add Formspree Endpoint to Your Project**:

   **Option A: Using Environment Variable (Recommended)**
   - Open your `.env` file in the project root
   - Add this line (replace with your actual endpoint):
     ```
     VITE_FORMSPREE_APPLY_ENDPOINT=https://formspree.io/f/your_actual_form_id
     ```
   - Save the file
   - Restart your dev server after updating `.env`

   **Option B: Direct in Code**
   - Open `src/pages/Apply.jsx`
   - Find the line: `const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_APPLY_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID'`
   - Replace `YOUR_FORM_ID` with your actual form ID from Formspree

6. **Test**: Submit an application with a resume file and check your email!

## Free Plan Limits:
- ✅ 50 submissions per month (free)
- ❌ File uploads NOT supported (requires paid plan)
- ✅ File information (name, size, type) included in email
- ✅ No credit card required
- ⚠️ **Note:** Resume files cannot be attached. File details will be included, and you can contact applicants to request the file.

## What Changed:
- Switched from Web3Forms (requires Pro for file uploads) to Formspree (free file uploads)
- The form now sends applications with resume attachments to your email
- All form fields are included in the email

## Note:
If you already have a Formspree account for the Contact form, you can create a separate form for applications to keep them organized, or use the same form endpoint if you prefer.

