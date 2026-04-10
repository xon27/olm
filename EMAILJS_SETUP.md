# EmailJS Setup Instructions

To enable email functionality, you need to set up EmailJS:

## Steps:

1. **Create an EmailJS account** at https://www.emailjs.com/

2. **Create an Email Service**:
   - Go to Email Services in your dashboard
   - Add a new service (Gmail, Outlook, etc.)
   - Note your Service ID

3. **Create Email Templates**:

   ### For Contact Form (template_contact):
   - Subject: New Contact Form Submission
   - Body:
   ```
   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}
   
   Message:
   {{message}}
   ```

   ### For Application Form (template_application):
   - Subject: New Job Application - {{job_title}}
   - Body:
   ```
   Applicant Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}
   
   Job Details:
   Position: {{job_title}}
   Company: {{company}}
   Location: {{location}}
   
   Message:
   {{message}}
   
   Resume: {{resume_file_name}}
   Additional Documents: {{documents_count}} file(s)
   ```

4. **Get your Public Key**:
   - Go to Account > API Keys
   - Copy your Public Key

5. **Configure Environment Variables**:
   
   Create a `.env` file in the root directory of your project with:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```
   
   Replace the placeholder values with your actual EmailJS credentials.
   
   **Note**: The Contact page is now configured to use EmailJS automatically. Just set up your environment variables and you're ready to go!

6. **Restart your development server**:
   After creating the `.env` file, you must restart your Vite dev server for the environment variables to load:
   ```bash
   # Stop the server (Ctrl+C) and restart it
   npm run dev
   ```

7. **Install EmailJS package** (if not already installed):
   ```bash
   npm install @emailjs/browser
   ```
   
   The package is already installed in this project, so you can skip this step.

## Note:
- The recipient email is set to: dixoncarnacete13@gmail.com
- For file attachments, EmailJS has limitations. Large files may need to be handled differently.
- Consider using a backend service for production with large file uploads.


