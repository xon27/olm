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

5. **Update the code**:
   - In `src/pages/Contact.jsx`, replace:
     - `service_your_service_id` with your Service ID
     - `template_contact` with your Contact template ID
     - `your_public_key` with your Public Key
   
   - In `src/pages/Apply.jsx`, replace:
     - `service_your_service_id` with your Service ID
     - `template_application` with your Application template ID
     - `your_public_key` with your Public Key

6. **Install EmailJS package**:
   ```bash
   npm install @emailjs/browser
   ```

## Note:
- The recipient email is set to: dixoncarnacete13@gmail.com
- For file attachments, EmailJS has limitations. Large files may need to be handled differently.
- Consider using a backend service for production with large file uploads.


