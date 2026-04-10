# Quick Setup Guide for Contact Form

## Step 1: Create EmailJS Account (5 minutes)

1. Go to **https://www.emailjs.com/** and sign up for a free account
2. Verify your email address

## Step 2: Create Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions to connect your email
5. **Copy your Service ID** (looks like: `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Name it: `Contact Form`
4. Set the **Subject** to: `New Contact Form Submission`
5. Set the **Content** to:
   ```
   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}
   
   Message:
   {{message}}
   ```
6. **Copy your Template ID** (looks like: `template_xxxxxxx`)

## Step 4: Get Public Key

1. Go to **Account** → **General** → **API Keys**
2. **Copy your Public Key** (looks like: `xxxxxxxxxxxxx`)

## Step 5: Create .env File

1. In your project root folder (`C:\Users\Dixon.Carnacete\olm`), create a new file named `.env`
2. Add these lines (replace with your actual values):
   ```
   VITE_EMAILJS_SERVICE_ID=your_actual_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
   ```
3. **Important**: Remove the word "your_actual_" and replace with your real values from EmailJS
4. Save the file

## Step 6: Restart Your Server

1. Stop your current dev server (press `Ctrl+C` in the terminal)
2. Start it again:
   ```bash
   npm run dev
   ```

## Step 7: Test the Form

1. Go to your contact page
2. Fill out the form
3. Click "Send"
4. Check your email (dixoncarnacete13@gmail.com) for the message!

## Troubleshooting

- **Still getting error?** Make sure:
  - The `.env` file is in the root folder (same level as `package.json`)
  - You restarted the dev server after creating `.env`
  - No spaces around the `=` sign in `.env` file
  - You're using the correct IDs from EmailJS dashboard

- **Need help?** Check the browser console (F12) for detailed error messages



