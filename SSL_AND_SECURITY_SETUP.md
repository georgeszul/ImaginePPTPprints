# 🔒 SSL Certificate & Security Setup Guide

## Complete Security Implementation

---

## 1. 🔐 SSL Certificate (HTTPS)

### **Option A: Local Development (XAMPP)**

#### Create Self-Signed Certificate:
```bash
# In XAMPP Control Panel
1. Click "Config" next to Apache
2. Select "httpd-ssl.conf"
3. Find these lines and update:
   SSLCertificateFile "conf/ssl.crt/server.crt"
   SSLCertificateKeyFile "conf/ssl.key/server.key"
```

#### Generate Certificate:
```bash
# Open Command Prompt as Administrator
cd C:\xampp\apache

# Generate private key
bin\openssl.exe genrsa -out conf\ssl.key\server.key 2048

# Generate certificate
bin\openssl.exe req -new -x509 -nodes -sha1 -days 365 -key conf\ssl.key\server.key -out conf\ssl.crt\server.crt
```

#### Enable SSL Module:
```bash
# Edit C:\xampp\apache\conf\httpd.conf
# Uncomment this line:
LoadModule ssl_module modules/mod_ssl.so

# Uncomment this line:
Include conf/extra/httpd-ssl.conf
```

#### Restart Apache, then visit:
```
https://localhost/ImaginePPTPprints/
```

### **Option B: Production (Free - Let's Encrypt)**

1. **Install Certbot:**
   ```bash
   # For Windows
   Download from: https://certbot.eff.org/
   
   # For Linux/Server
   sudo apt-get install certbot python3-certbot-apache
   ```

2. **Generate Certificate:**
   ```bash
   sudo certbot --apache -d imaginepptp.com -d www.imaginepptp.com
   ```

3. **Auto-Renewal:**
   ```bash
   # Test renewal
   sudo certbot renew --dry-run
   
   # Cron job for auto-renewal
   0 0 * * * certbot renew --quiet
   ```

### **Option C: Cloudflare (Easiest)**

1. Sign up at: https://www.cloudflare.com/
2. Add your domain
3. Change nameservers (Cloudflare provides instructions)
4. **SSL/TLS** → Set to **"Full (Strict)"**
5. ✅ Done! Free SSL automatically enabled

---

## 2. 🛡️ Google reCAPTCHA v3 Setup

### **Get API Keys:**

1. Go to: https://www.google.com/recaptcha/admin/create
2. Choose **reCAPTCHA v3**
3. Add your domains:
   - `localhost` (for testing)
   - `imaginepptp.com` (production)
4. Copy:
   - **Site Key**
   - **Secret Key**

### **Configure:**

Edit `config/security.php`:
```php
define('RECAPTCHA_SITE_KEY', 'YOUR_SITE_KEY_HERE');
define('RECAPTCHA_SECRET_KEY', 'YOUR_SECRET_KEY_HERE');
```

### **Add to Form:**

Already included in `includes/header.php`:
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>
```

### **Test:**
```
Visit: http://localhost/ImaginePPTPprints/contact.php
Submit form → reCAPTCHA validates automatically in background
```

---

## 3. ⚡ CDN Setup (Cloudflare)

### **Free Cloudflare CDN:**

1. **Sign Up:** https://www.cloudflare.com/
2. **Add Site:** Enter `imaginepptp.com`
3. **Change Nameservers:**
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Replace nameservers with Cloudflare's
   - Wait 24-48 hours for propagation

4. **Optimize Settings:**
   ```
   Speed → Optimization
   ✅ Auto Minify: HTML, CSS, JavaScript
   ✅ Brotli
   ✅ Early Hints
   ✅ Rocket Loader
   ```

5. **Caching:**
   ```
   Caching → Configuration
   - Caching Level: Standard
   - Browser Cache TTL: 1 year
   - Always Online: ON
   ```

6. **Image Optimization:**
   ```
   Speed → Optimization
   ✅ Polish: Lossless
   ✅ Mirage
   ✅ WebP
   ```

### **Configure CDN in Code:**

Edit `config/cdn.php`:
```php
define('CDN_ENABLED', true);
define('CDN_URL', 'https://cdn.imaginepptp.com');
define('USE_CLOUDFLARE', true);
```

---

## 4. 🗜️ Image Optimization

### **Automatic Optimization:**

Already included in `config/image-optimizer.php`!

### **Optimize Existing Images:**

Create file: `optimize-all-images.php`
```php
<?php
require_once 'config/image-optimizer.php';

$imageDirs = ['images/shirts', 'images/hoodies', 'images/business cards'];

foreach ($imageDirs as $dir) {
    $images = glob($dir . '/*.{jpg,jpeg,png}', GLOB_BRACE);
    
    foreach ($images as $image) {
        echo "Optimizing: $image\n";
        optimizeImage($image, null, 85);
        
        // Convert to WebP
        $webp = convertToWebP($image, 85);
        echo "WebP created: $webp\n";
    }
}

echo "Done!";
?>
```

Run:
```bash
php optimize-all-images.php
```

### **Manual Tools:**

- **TinyPNG:** https://tinypng.com/
- **ImageOptim:** https://imageoptim.com/
- **Squoosh:** https://squoosh.app/

---

## 5. 🔒 Additional Security Features

### **✅ Already Implemented:**

1. **CSRF Protection** - Prevents cross-site request forgery
2. **Rate Limiting** - 5 requests per 5 minutes
3. **SQL Injection Protection** - PDO prepared statements
4. **XSS Protection** - Input sanitization
5. **Security Headers** - X-Frame-Options, CSP, etc.
6. **Input Validation** - All form data validated
7. **Secure Sessions** - HTTP-only cookies
8. **Error Logging** - Security events logged

### **Enable in Production:**

Edit `config/security.php`:
```php
// Change from test keys to your real keys
define('RECAPTCHA_SITE_KEY', 'YOUR_REAL_SITE_KEY');
define('RECAPTCHA_SECRET_KEY', 'YOUR_REAL_SECRET_KEY');

// Enable secure cookies (requires HTTPS)
ini_set('session.cookie_secure', 1);
```

---

## 6. 📊 Performance Monitoring

### **Google PageSpeed Insights:**
```
https://pagespeed.web.dev/
Test your site speed and get recommendations
```

### **GTmetrix:**
```
https://gtmetrix.com/
Detailed performance analysis
```

### **Cloudflare Analytics:**
```
Built-in analytics in your Cloudflare dashboard
```

---

## 7. ✅ Security Checklist

### **Before Going Live:**

- [ ] SSL Certificate installed and working
- [ ] HTTPS redirect enabled
- [ ] reCAPTCHA v3 configured with real keys
- [ ] Cloudflare CDN active
- [ ] All images optimized
- [ ] Database password changed
- [ ] Resend API key configured
- [ ] File permissions set correctly (755 for directories, 644 for files)
- [ ] Error reporting disabled in production
- [ ] Regular backups configured
- [ ] `.gitignore` includes sensitive files

### **Production php.ini Settings:**

```ini
display_errors = Off
log_errors = On
error_log = /path/to/error.log
expose_php = Off
session.cookie_httponly = 1
session.cookie_secure = 1
session.use_only_cookies = 1
```

---

## 8. 🚀 Quick Setup Commands

### **Copy Security Files:**

```powershell
Copy-Item -Path "config\security.php" -Destination "C:\xampp\htdocs\ImaginePPTPprints\config\" -Force
Copy-Item -Path "config\cdn.php" -Destination "C:\xampp\htdocs\ImaginePPTPprints\config\" -Force
Copy-Item -Path "config\image-optimizer.php" -Destination "C:\xampp\htdocs\ImaginePPTPprints\config\" -Force
Copy-Item -Path "api\submit-contact.php" -Destination "C:\xampp\htdocs\ImaginePPTPprints\api\" -Force
```

---

## 9. 🐛 Troubleshooting

### **SSL Not Working:**
```
Solution: Check Apache SSL module is loaded
Restart Apache after configuration changes
Trust self-signed certificate in browser
```

### **reCAPTCHA Failing:**
```
Solution: Check site key matches domain
Verify secret key is correct
Check score threshold (default 0.5)
```

### **Images Not Optimizing:**
```
Solution: Check GD library installed (php -m | grep gd)
Verify file permissions
Check disk space
```

### **CDN Not Serving Files:**
```
Solution: Purge Cloudflare cache
Check DNS propagation
Verify CDN_URL in config/cdn.php
```

---

## 📞 Resources

- **SSL/TLS Test:** https://www.ssllabs.com/ssltest/
- **Security Headers Test:** https://securityheaders.com/
- **Let's Encrypt:** https://letsencrypt.org/
- **Cloudflare:** https://www.cloudflare.com/
- **Google reCAPTCHA:** https://www.google.com/recaptcha/
- **OWASP Security Guide:** https://owasp.org/

---

**🎉 You're all set! Your website is now secure and optimized!**




