# ⚡ Quick Start Guide - Imagine PPTP Prints

## 🚀 5-Minute Setup

### **Step 1: Start MySQL** (2 minutes)
```
1. Open XAMPP Control Panel
2. Click "Start" next to MySQL
3. Wait for it to turn green ✅
```

### **Step 2: Run Auto-Installer** (1 minute)
```
1. Visit: http://localhost/ImaginePPTPprints/install.php
2. Click "🚀 Start Installation"
3. Wait for completion message ✅
```

### **Step 3: Test Database** (1 minute)
```
Visit: http://localhost/ImaginePPTPprints/test-db.php
Should show: "✅ Database Connected Successfully!"
```

### **Step 4: Get API Keys** (Optional - 5 minutes)
```
Resend API (Email):
→ https://resend.com/signup
→ Get API key → Paste in config/email.php

Google reCAPTCHA (Security):
→ https://www.google.com/recaptcha/admin/create
→ Get Site Key & Secret Key → Paste in config/security.php
```

### **Step 5: Test Everything** (1 minute)
```
1. Visit: http://localhost/ImaginePPTPprints/
2. Navigate to Contact page
3. Submit test form
4. Should see success message! ✅
```

---

## ✅ What's Already Done:

### **Backend:**
- ✅ MySQL Database structure
- ✅ PHP configuration files
- ✅ AJAX API endpoints
- ✅ Security features (CSRF, rate limiting, XSS protection)
- ✅ Email templates (Resend API)
- ✅ Database connection handler
- ✅ Input validation & sanitization

### **Frontend:**
- ✅ jQuery integrated
- ✅ AJAX form submission
- ✅ reCAPTCHA v3 integrated
- ✅ Floating WhatsApp button
- ✅ Scroll to top button
- ✅ Loading states & animations
- ✅ Form validation
- ✅ Error handling

### **Performance:**
- ✅ Image optimization script
- ✅ GZIP compression (.htaccess)
- ✅ Browser caching headers
- ✅ CDN configuration ready
- ✅ Preconnect headers
- ✅ WebP conversion support
- ✅ Lazy loading images

### **Security:**
- ✅ CSRF protection
- ✅ Rate limiting (5 req/5min)
- ✅ reCAPTCHA v3 bot protection
- ✅ SQL injection protection (PDO)
- ✅ XSS protection (sanitization)
- ✅ Security headers (.htaccess)
- ✅ Secure sessions
- ✅ Error logging
- ✅ File upload security

---

## 📂 File Structure:

```
ImaginePPTPprints/
├── 📁 api/
│   └── submit-contact.php          ← AJAX handler
├── 📁 assets/
│   ├── css/
│   │   └── enhanced.css            ← New features CSS
│   └── js/
│       └── main.js                 ← jQuery + AJAX
├── 📁 config/
│   ├── database.php                ← Database connection
│   ├── email.php                   ← Resend API
│   ├── security.php                ← Security features
│   ├── cdn.php                     ← CDN config
│   └── image-optimizer.php         ← Image tools
├── 📁 database/
│   └── setup.sql                   ← Database schema
├── 📁 includes/
│   ├── header.php                  ← Enhanced with jQuery & reCAPTCHA
│   ├── footer.php                  ← Enhanced with scripts
│   ├── styles.php
│   └── scripts.php
├── .htaccess                       ← Security & performance
├── .gitignore                      ← Protect sensitive files
├── install.php                     ← Auto-installer 🎉
├── test-db.php                     ← Database tester
├── optimize-images.php             ← Image optimizer
├── generate-ssl.bat                ← SSL generator
├── 404.php, 403.php, 500.php      ← Error pages
└── All your page files (.php)
```

---

## 🎯 Common Tasks:

### **View Form Submissions:**
```
http://localhost/phpmyadmin
→ imaginepptp_db → contact_submissions
```

### **Optimize Images:**
```
Visit: http://localhost/ImaginePPTPprints/optimize-images.php
Click: "🚀 Start Optimization"
```

### **Generate SSL Certificate:**
```
Double-click: generate-ssl.bat
Follow prompts
Restart Apache
```

### **View Error Logs:**
```
C:\xampp\apache\logs\error.log
C:\xampp\php\logs\php_error_log
```

---

## 🔧 Configuration Files to Update:

### **1. Email (config/email.php):**
```php
define('RESEND_API_KEY', 'YOUR_KEY_HERE');
```

### **2. reCAPTCHA (config/security.php):**
```php
define('RECAPTCHA_SITE_KEY', 'YOUR_SITE_KEY');
define('RECAPTCHA_SECRET_KEY', 'YOUR_SECRET_KEY');
```

### **3. Database (config/database.php):**
```php
// Usually defaults are fine for XAMPP
define('DB_USER', 'root');
define('DB_PASS', '');
```

---

## 🌐 URLs:

- **Homepage:** http://localhost/ImaginePPTPprints/
- **Contact:** http://localhost/ImaginePPTPprints/contact
- **Install:** http://localhost/ImaginePPTPprints/install
- **DB Test:** http://localhost/ImaginePPTPprints/test-db
- **Image Optimizer:** http://localhost/ImaginePPTPprints/optimize-images
- **phpMyAdmin:** http://localhost/phpmyadmin

---

## ❓ Troubleshooting:

### **MySQL Not Starting:**
```
Solution:
1. Check port 3306 not in use
2. Check firewall
3. Review error logs
4. Reinstall MySQL module
```

### **Contact Form Not Working:**
```
Solution:
1. Check browser console (F12)
2. Verify api/submit-contact.php exists
3. Check MySQL is running
4. Review network tab for AJAX errors
```

### **Images Not Loading:**
```
Solution:
1. Check file permissions
2. Verify paths are correct
3. Check .htaccess configuration
4. Review Apache error logs
```

---

## 🎉 You're Done!

Everything is set up and ready to go!

**Next:** Just start MySQL in XAMPP and run the installer!




