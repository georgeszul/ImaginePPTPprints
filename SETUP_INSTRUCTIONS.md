# 🚀 Setup Instructions - Imagine PPTP Prints Enhanced Features

## Prerequisites
- ✅ XAMPP installed with MySQL running
- ✅ PHP 8.2+ 
- ✅ MySQL/MariaDB
- ✅ Resend API account (free tier available)

---

## 📋 Step-by-Step Installation

### **Step 1: Database Setup**

1. **Open phpMyAdmin**
   - Go to: `http://localhost/phpmyadmin`
   - Username: `root`
   - Password: (leave empty for default XAMPP)

2. **Import Database**
   - Click on "SQL" tab
   - Copy and paste the contents of `database/setup.sql`
   - Click "Go" to execute
   - ✅ Database `imaginepptp_db` will be created with all tables

3. **Verify Tables Created**
   You should see these tables:
   - `contact_submissions`
   - `quote_requests`
   - `newsletter_subscribers`
   - `testimonials`
   - `admin_users`

---

### **Step 2: Configure Database Connection**

1. **Edit `config/database.php`**
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'imaginepptp_db');
   define('DB_USER', 'root');          // Your MySQL username
   define('DB_PASS', '');              // Your MySQL password
   ```

2. **Test Connection**
   - Visit: `http://localhost/ImaginePPTPprints/test-db.php`
   - You should see "Database connected successfully!"

---

### **Step 3: Set Up Resend API for Emails**

1. **Create Resend Account**
   - Go to: https://resend.com/signup
   - Sign up for free (100 emails/day)
   - Verify your email

2. **Get API Key**
   - Go to: https://resend.com/api-keys
   - Click "Create API Key"
   - Give it a name: "Imagine PPTP Prints"
   - Copy the key (starts with `re_`)

3. **Configure Email Settings**
   Edit `config/email.php`:
   ```php
   define('RESEND_API_KEY', 're_YOUR_API_KEY_HERE');
   define('EMAIL_FROM', 'contact@imaginepptp.com');
   define('EMAIL_TO', 'imaginepttp@gmail.com');
   ```

4. **Verify Domain (Optional but Recommended)**
   - In Resend dashboard, go to "Domains"
   - Add your domain
   - Follow DNS setup instructions
   - OR use `onboarding@resend.dev` for testing (limited to your email only)

---

### **Step 4: Install jQuery**

jQuery is already included via CDN in the updated `includes/header.php`.
No action needed!

---

### **Step 5: Copy Files to XAMPP**

Run these PowerShell commands:
```powershell
# Copy all new files
Copy-Item -Path "config\" -Destination "C:\xampp\htdocs\ImaginePPTPprints\config\" -Recurse -Force
Copy-Item -Path "api\" -Destination "C:\xampp\htdocs\ImaginePPTPprints\api\" -Recurse -Force
Copy-Item -Path "assets\" -Destination "C:\xampp\htdocs\ImaginePPTPprints\assets\" -Recurse -Force
Copy-Item -Path "*.php" -Destination "C:\xampp\htdocs\ImaginePPTPprints\" -Force
```

---

### **Step 6: Update Contact Page**

The contact form is now AJAX-enabled. Test it:
1. Go to: `http://localhost/ImaginePPTPprints/contact.php`
2. Fill out the form
3. Submit
4. You should see a success message WITHOUT page reload!

---

## 🧪 Testing

### **Test Contact Form:**
1. Fill out form with test data
2. Submit form
3. Check:
   - ✅ Success message appears
   - ✅ Form clears
   - ✅ Check `contact_submissions` table in phpMyAdmin
   - ✅ Email sent to your inbox (if Resend configured)

### **Test WhatsApp Button:**
- Look for green floating button in bottom-right corner
- Click it → should open WhatsApp

### **Test Database:**
```sql
-- Run in phpMyAdmin SQL tab
SELECT * FROM contact_submissions ORDER BY submitted_at DESC LIMIT 10;
```

---

## 🎨 New Features Added

### ✅ **MySQL Database**
- Contact form submissions stored
- Quote requests tracked
- Newsletter subscribers managed
- Testimonials database

### ✅ **jQuery Enhanced**
- AJAX form submissions
- Smooth animations
- Form validation
- Lazy loading images

### ✅ **AJAX Technology**
- No page reloads
- Real-time feedback
- Better user experience

### ✅ **Resend Email API**
- Professional emails
- Customer confirmations
- Admin notifications
- Spanish/English support

### ✅ **Bonus Features**
- Floating WhatsApp button
- Scroll to top button
- Form validation
- Loading states
- Error handling

---

## 🐛 Troubleshooting

### Database Connection Error:
```
Solution: Check config/database.php credentials
Verify MySQL is running in XAMPP Control Panel
```

### Email Not Sending:
```
Solution: Check Resend API key in config/email.php
Verify you're using onboarding@resend.dev for testing
Check error_log in XAMPP logs folder
```

### Form Not Submitting:
```
Solution: Check browser console for JavaScript errors
Verify api/submit-contact.php file exists
Check file permissions
```

### AJAX 404 Error:
```
Solution: Verify api folder is in correct location
Check URL path in browser network tab
Ensure Apache is running
```

---

## 📊 View Submissions

### **Via phpMyAdmin:**
```
http://localhost/phpmyadmin
→ imaginepptp_db
→ contact_submissions
```

### **Query Examples:**
```sql
-- View all submissions
SELECT * FROM contact_submissions ORDER BY submitted_at DESC;

-- Count submissions by service
SELECT service, COUNT(*) as count 
FROM contact_submissions 
GROUP BY service;

-- Today's submissions
SELECT * FROM contact_submissions 
WHERE DATE(submitted_at) = CURDATE();
```

---

## 🔒 Security Notes

1. **Change Database Password:**
   ```sql
   CREATE USER 'imaginepptp_user'@'localhost' IDENTIFIED BY 'YOUR_SECURE_PASSWORD';
   GRANT ALL PRIVILEGES ON imaginepptp_db.* TO 'imaginepptp_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

2. **Protect API Key:**
   - Never commit `config/email.php` to GitHub
   - Add to `.gitignore`

3. **Enable HTTPS:**
   - Required before going live
   - Protects form data

---

## 📞 Need Help?

If you encounter any issues:
1. Check XAMPP error logs: `C:\xampp\apache\logs\error.log`
2. Check PHP error log: `C:\xampp\php\logs\php_error_log`
3. Check browser console (F12 → Console tab)
4. Review this document again

---

## ✨ Next Steps

After everything works:
1. Test all forms thoroughly
2. Configure Resend with your domain
3. Customize email templates
4. Add more testimonials
5. Set up SSL certificate
6. Deploy to production server

**You're all set! 🎉**




