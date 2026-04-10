# Hostinger Deployment Guide

This guide will help you deploy your React + Vite application to Hostinger hosting.

## Prerequisites

- Hostinger hosting account
- FTP access or File Manager access in Hostinger
- Your domain name configured

## Step 1: Build Your Application

1. Open terminal in your project directory
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Build the production version:
   ```bash
   npm run build
   ```

   This creates a `dist` folder with all optimized files.

## Step 2: Prepare for Upload

The `dist` folder contains:
- `index.html` - Main HTML file
- `assets/` - All CSS, JS, and other assets

## Step 3: Upload to Hostinger

### Option A: Using File Manager (Easiest)

1. Log in to your Hostinger hPanel
2. Go to **File Manager**
3. Navigate to `public_html` (or your domain's root folder)
4. Delete any existing files (backup first if needed)
5. Upload all files from the `dist` folder:
   - Select all files in `dist`
   - Upload them to `public_html`

### Option B: Using FTP

1. Get your FTP credentials from Hostinger hPanel
2. Use an FTP client (FileZilla, WinSCP, etc.)
3. Connect to your Hostinger server
4. Navigate to `public_html`
5. Upload all contents from the `dist` folder

## Step 4: Configure Environment Variables

Since Hostinger is static hosting, you need to handle environment variables differently:

### Option 1: Hardcode in Production (Not Recommended for Sensitive Data)

Edit your code to use production values directly.

### Option 2: Use Build-Time Environment Variables

1. Create a `.env.production` file in your project root:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_FORMSPREE_ENDPOINT=your_endpoint
   VITE_WEB3FORMS_ACCESS_KEY=your_access_key
   ```

2. Rebuild:
   ```bash
   npm run build
   ```

3. Upload the new `dist` folder

## Step 5: Test Your Website

1. Visit your domain name
2. Test all pages and forms
3. Verify email functionality works

## Important Notes

- **Static Hosting**: Hostinger's basic hosting is static, so your React app will work fine
- **No Server-Side Code**: Your app is client-side only, which is perfect for this setup
- **Environment Variables**: Vite embeds environment variables at build time, so make sure to rebuild after changing `.env.production`
- **Routing**: If using React Router, you may need to configure a `.htaccess` file for proper routing

## Setting Up .htaccess for React Router

If you're using React Router, create a `.htaccess` file in `public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

This ensures all routes work correctly when users navigate directly or refresh pages.

## Troubleshooting

- **404 Errors on Routes**: Add the `.htaccess` file mentioned above
- **Environment Variables Not Working**: Make sure to rebuild after changing `.env.production`
- **Forms Not Working**: Check that your API keys are correctly set in environment variables

## Alternative: Using Hostinger Email with EmailJS

If you want to use your Hostinger email account with EmailJS:

1. **Get SMTP Settings from Hostinger**:
   - SMTP Server: `smtp.hostinger.com`
   - Port: 465 (SSL) or 587 (TLS)
   - Username: your-email@yourdomain.com
   - Password: Your email password

2. **Configure in EmailJS**:
   - Go to EmailJS dashboard
   - Add new Email Service
   - Select "Other SMTP Server"
   - Enter the SMTP settings above
   - Test the connection

3. **Update Your Environment Variables**:
   - Use the new EmailJS Service ID in your `.env.production`
   - Rebuild and redeploy



